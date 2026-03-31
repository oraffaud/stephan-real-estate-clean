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

function pickCommentByLang(item: any, lang: string) {
  const comments = asArray(item?.comments || item?.Comments);
  const exact = comments.find((c: any) => String(c?.language || '').toLowerCase() === lang.toLowerCase());
  if (exact) return exact;
  const fr = comments.find((c: any) => String(c?.language || '').toLowerCase() === 'fr');
  if (fr) return fr;
  const en = comments.find((c: any) => String(c?.language || '').toLowerCase() === 'en');
  if (en) return en;
  return comments[0] || null;
}

function buildLocationLabel(city: string, district: string, addressName: string, postalCode: string, lang: string): string {
  const safeCity = cleanText(city);
  const safeDistrict = cleanText(district);
  const safeAddress = cleanText(addressName);

  if (safeCity && safeDistrict && safeDistrict.toLowerCase() !== safeCity.toLowerCase()) {
    return `${safeCity} — ${safeDistrict}`;
  }
  if (safeCity) return safeCity;
  if (safeDistrict) return safeDistrict;
  if (safeAddress) return safeAddress;
  return lang === 'fr' ? 'Localisation sur demande' : 'Location on request';
}

function normalizeMandat(item: any, lang = 'fr'): Mandat {
  const id = String(item?.id || item?.Id || item?.property_id || item?.PropertyId || '');
  const ref = String(item?.reference || item?.Reference || '');

  const cityObj = item?.city || item?.City || null;
  const city =
    cleanText(cityObj?.name) ||
    '';

  const postalCode =
    cleanText(cityObj?.zipcode) ||
    cleanText(item?.postal_code) ||
    cleanText(item?.PostalCode) ||
    cleanText(item?.zip_code) ||
    cleanText(item?.ZipCode) ||
    '';

  const district =
    cleanText(item?.district?.name) ||
    cleanText(item?.District?.name) ||
    cleanText(item?.district) ||
    cleanText(item?.District) ||
    '';

  const addressName =
    cleanText(item?.address_name) ||
    cleanText(item?.AddressName) ||
    cleanText(item?.address_label) ||
    cleanText(item?.AddressLabel) ||
    '';

  const localizedComment = pickCommentByLang(item, lang);

  const locationLabel = buildLocationLabel(city, district, addressName, postalCode, lang);

  const title =
    cleanText(localizedComment?.title) ||
    cleanText(ref) ||
    locationLabel;

  const description =
    cleanText(localizedComment?.comment) ||
    cleanText(localizedComment?.comment_full) ||
    '';

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
    locationLabel,
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
