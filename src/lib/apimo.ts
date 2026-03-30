type Mandat = {
  id: string;
  ref: string;
  slug: string;
  title: string;
  description: string;
  city: string;
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
  if (typeof v === 'object') return v[lang] || v.fr || v.en || Object.values(v)[0] || '';
  return '';
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

function normalizeMandat(item: any, lang = 'fr'): Mandat {
  const id = String(item?.id || item?.Id || item?.property_id || item?.PropertyId || '');
  const ref = String(item?.reference || item?.Reference || '');
  const city = pick(item?.city || item?.City, lang) || item?.city || item?.City || '';
  const district = pick(item?.district || item?.District, lang);
  const title =
    pick(item?.title || item?.Title, lang) ||
    [city, district].filter(Boolean).join(' — ') ||
    ref ||
    'Mandat';

  const description =
    pick(item?.comment || item?.Comment || item?.description || item?.Description, lang) || '';

  return {
    id,
    ref,
    slug: slugify(`${city}-${title}-${id || ref}`),
    title,
    description,
    city,
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
