import posts from './posts.json';

function normalizePost(post, lang = 'fr') {
  const localized = post[lang] || post.fr;
  return {
    id: post.id,
    slug: post.slug,
    source: post.source || 'manual',
    linkedinUrl: post.linkedinUrl || null,
    image: post.image || '/images/hero-pool.jpg',
    publishedAt: post.publishedAt || '',
    title: localized?.title || '',
    excerpt: localized?.excerpt || '',
    content: Array.isArray(localized?.content) ? localized.content : []
  };
}

export async function getAllNews(lang = 'fr') {
  return posts
    .map((post) => normalizePost(post, lang))
    .sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));
}

export async function getNewsBySlug(slug, lang = 'fr') {
  const post = posts.find((item) => item.slug === slug);
  if (!post) return null;
  return normalizePost(post, lang);
}

export async function getAllNewsSlugs() {
  return posts.map((post) => post.slug);
}
