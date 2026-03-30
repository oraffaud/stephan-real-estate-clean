export const LANGS = ['en', 'fr'];

export function isLang(value) {
  return LANGS.includes(value);
}

export async function getDict(lang) {
  const safe = isLang(lang) ? lang : 'en';
  // Dynamic import keeps bundle small and avoids type issues.
  const dict = (await import(`./dictionaries/${safe}.json`)).default;
  return dict;
}

export function formatEUR(amount, lang = 'en') {
  try {
    return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `€${Math.round(amount).toLocaleString()}`;
  }
}

export function formatNumber(n, lang = 'en') {
  try {
    return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB').format(n);
  } catch {
    return String(n);
  }
}
