import fr from '@/lib/dictionaries/fr.json';
import en from '@/lib/dictionaries/en.json';

export const LANGS = ['fr', 'en'];

export function isLang(value) {
  return typeof value === 'string' && LANGS.includes(value);
}

export async function getDict(lang) {
  return lang === 'en' ? en : fr;
}
