type Mandat = {
  id: string;
  ref: string;
  slug: string;
  title: string;
  description: string;
  city: string;
  district: string;
  addressName: string;
  postalCode: string;
  locationLabel: string;
  price: number | null;
  area: number | null;
  rooms: number | null;
  bedrooms: number | null;
  pictures: string[];
};

function required(name: string, value?: string): string {
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

function cfg() {
  return {
    baseUrl: required('APIMO_BASE_URL', process.env.APIMO_BASE_URL),
    provider: required('APIMO_PROVIDER_CODE', process.env.APIMO_PROVIDER_CODE),
    token: required('APIMO_API_KEY', process.env.APIMO_API_KEY),
    agency: required('APIMO_AGENCY_CODE', process.env.APIMO_AGENCY_CODE)
  };
}

function basicAuth(provider: string, token: string): string {
  return Buffer.from(`${provider}:${token}`).toString('base64');
}

async function apimoGet(path: string, revalidate = 300): Promise<any> {
  const c = cfg();
  const url = `${c.baseUrl.replace(/\/+$/, '')}${path}`;

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${basicAuth(c.provider, c.token)}`
    },
    next: { revalidate }
  });

  const text = await res.text();
  let data: any = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const err: any = new Error(`APIMO HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

function asArray<T = any>(v: any): T[] {
  return Array.isArray(v) ? v : [];
}

function pick(v: any, lang: string): string {
  if (!v) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'object') {
    return String(v[lang] || v.fr || v.en || Object.values(v)[0] || '');
  }
  return '';
}

function cleanText(v: any): string {
  const s = String(v || '').trim();
  if (!s) return '';
  if (/^\d+$/.test(s)) return '';
  if (s.toLowerCase() === 'null' || s.toLowerCase() === 'undefined') return '';
  return s;
}

function slugify(s: string): string {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function normalizePictures(item: any): string[] {
  const pics = asArray(item?.pictures || item?.Pictures || item?.medias || item?.Medias);
  return pics
    .map((p: any) => p?.url || p?.Url || p?.large || p?.Large || p?.medium || p?.Medium || '')
    .filter(Boolean);
}

function scalarNumber(v: any): number | null {
  if (v == null) return null;
  if (typeof v === 'number') return Number.isFinite(v) ? v : null;
  if (typeof v === 'string') {
    const n = Number(v.replace(',', '.'));
    return Number.isFinite(n) ? n : null;
  }
  if (typeof v === 'object') {
    const candidates = [v.value, v.total, v.weighted, v.amount, v.Price, v.Area];
    for (const c of candidates) {
      const n = scalarNumber(c);
      if (n != null) return n;
    }
  }
  return null;
}

function pickFirstText(lang: string, ...values: any[]): string {
  for (const v of values) {
    const s = cleanText(pick(v, lang) || v);
    if (s) return s;
  }
  return '';
}

function buildLocationLabel(city: string, district: string, addressName: string, postalCode: string, lang: string): string {
  const safeCity = cleanText(city);
  const safeDistrict = cleanText(district);
  const safeAddress = cleanText(addressName);
  const safePostal = cleanText(postalCode);

  if (safeCity && safeDistrict && safeDistrict.toLowerCase() !== safeCity.toLowerCase()) {
    return `${safeCity} — ${safeDistrict}`;
  }

  if (safeCity && safePostal) {
    return `${safeCity}`;
  }

  if (safeCity) return safeCity;
  if (safeDistrict) return safeDistrict;
  if (safeAddress) return safeAddress;

  return lang === 'fr' ? 'Localisation sur demande' : 'Location on request';
}

function normalizeMandat(item: any, lang = 'fr'): Mandat {
  const id = String(item?.id || item?.Id || item?.property_id || item?.PropertyId || '');
  const ref = String(item?.reference || item?.Reference || '');

  // APIMO location extraction priority
  const city = pickFirstText(
    lang,
    item?.publication_place,
    item?.PublicationPlace,
    item?.city,
    item?.City,
    item?.city_name,
    item?.CityName,
    item?.address?.city,
    item?.Address?.city,
    item?.location?.city,
    item?.Location?.city
  );

  const district = pickFirstText(
    lang,
    item?.district,
    item?.District,
    item?.sub_locality,
    item?.SubLocality,
    item?.subLocality,
    item?.location?.district,
    item?.Address?.district
  );

  const addressName = pickFirstText(
    lang,
    item?.address,
    item?.Address,
    item?.address_name,
    item?.AddressName,
    item?.address_label,
    item?.AddressLabel,
    item?.location?.address
  );

  const postalCode = pickFirstText(
    lang,
    item?.postal_code,
    item?.PostalCode,
    item?.zip_code,
    item?.ZipCode,
    item?.address?.postal_code,
    item?.Address?.postal_code
  );

  const title =
    cleanText(pick(item?.title || item?.Title, lang)) ||
    cleanText(pick(item?.name || item?.Name, lang)) ||
    cleanText(ref) ||
    buildLocationLabel(city, district, addressName, postalCode, lang);

  const description =
    pick(item?.comment || item?.Comment || item?.description || item?.Description, lang) || '';

  return {
    id,
    ref,
    slug: slugify(`${city || district || addressName || 'property'}-${title}-${id || ref}`),
    title,
    description,
    city,
    district,
    addressName,
    postalCode,
    locationLabel: buildLocationLabel(city, district, addressName, postalCode, lang),
    price: scalarNumber(item?.price || item?.Price),
    area: scalarNumber(item?.area || item?.Area),
    rooms: scalarNumber(item?.rooms || item?.Rooms),
    bedrooms: scalarNumber(item?.bedrooms || item?.Bedrooms),
    pictures: normalizePictures(item)
  };
}

export async function getMandats(lang = 'fr'): Promise<Mandat[]> {
  const c = cfg();
  const data = await apimoGet(`/agencies/${c.agency}/properties`);
  const list =
    asArray(data?.items).length ? asArray(data?.items) :
    asArray(data?.Items).length ? asArray(data?.Items) :
    asArray(data?.properties).length ? asArray(data?.properties) :
    asArray(data?.Properties).length ? asArray(data?.Properties) :
    asArray(data);

  return list.map((x: any) => normalizeMandat(x, lang));
}

export async function getMandatBySlug(slug: string, lang = 'fr'): Promise<Mandat | null> {
  const items = await getMandats(lang);
  return items.find((x) => x.slug === slug) || null;
}
