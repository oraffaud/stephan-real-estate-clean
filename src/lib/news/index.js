import fs from 'node:fs';
import path from 'node:path';

const NEWS_DIR = path.join(process.cwd(), 'content/news');

function readNewsFiles() {
  if (!fs.existsSync(NEWS_DIR)) return [];

  return fs
    .readdirSync(NEWS_DIR)
    .filter((file) => file.endsWith('.json'))
    .sort()
    .map((file) => {
      const raw = fs.readFileSync(path.join(NEWS_DIR, file), 'utf8');
      return JSON.parse(raw);
    });
}

function normalizePost(post, lang = 'fr') {
  const localized = post[lang] || post.fr || {};

  return {
    slug: post.slug,
    publishedAt: post.publishedAt || '',
    source: post.source || 'LinkedIn',
    linkedinUrl: post.linkedinUrl || null,
    image: post.image || '/images/hero-pool.jpg',
    title: localized.title || '',
    excerpt: localized.excerpt || '',
    content: Array.isArray(localized.content) ? localized.content : []
  };
}

export async function getAllNews(lang = 'fr') {
  return readNewsFiles()
    .map((post) => normalizePost(post, lang))
    .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));
}

export async function getNewsBySlug(slug, lang = 'fr') {
  const post = readNewsFiles().find((item) => item.slug === slug);
  if (!post) return null;
  return normalizePost(post, lang);
}

export async function getAllNewsSlugs() {
  return readNewsFiles().map((post) => post.slug);
}
