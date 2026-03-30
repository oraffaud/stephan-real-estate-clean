function required(name, value) {
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

function basicAuth(provider, token) {
  return Buffer.from(`${provider}:${token}`).toString('base64');
}

async function apimoFetch(path, { revalidate = 300 } = {}) {
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
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const err = new Error(`APIMO HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

function asArray(v) {
  return Array.isArray(v) ? v : [];
}

function pick(v, lang) {
  if (!v) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'object') return v[lang] || v.fr || v.en || Object.values(v)[0] || '';
  return '';
}

function slugify(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function normalizePictures(item) {
  const pics = asArray(item?.pictures || item?.Pictures || item?.medias || item?.Medias);
  return pics
    .map((p) => p?.url || p?.Url || p?.large || p?.Large || p?.medium || p?.Medium || '')
    .filter(Boolean);
}

function normalizeMandat(item, lang = 'fr') {
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
    price: item?.price || item?.Price || null,
    area: item?.area || item?.Area || null,
    rooms: item?.rooms || item?.Rooms || null,
    bedrooms: item?.bedrooms || item?.Bedrooms || null,
    pictures: normalizePictures(item)
  };
}

export async function getMandats(lang = 'fr') {
  const c = cfg();
  const data = await apimoFetch(`/agencies/${c.agency}/properties`);
  const list =
    asArray(data?.items) ||
    asArray(data?.Items) ||
    asArray(data?.properties) ||
    asArray(data?.Properties) ||
    asArray(data);
  return list.map((x) => normalizeMandat(x, lang));
}

export async function getMandatBySlug(slug, lang = 'fr') {
  const items = await getMandats(lang);
  return items.find((x) => x.slug === slug) || null;
}
