import type { MetadataRoute } from 'next'

const LANGS = ['fr', 'en'] as const

async function getSaleUrls(baseUrl: string) {
  try {
    const { getMandats } = await import('@/lib/apimo')
    const entries = []

    for (const lang of LANGS) {
      const items = await getMandats(lang)
      for (const item of items) {
        entries.push({
          url: `${baseUrl}/${lang}/vente/${item.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.8,
        })
      }
    }

    return entries
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.cotedazuragency.com'

  const staticUrls = [
    '',
    '/vente',
    '/services',
    '/agence',
    '/agence-cote-dazur',
    '/agence-immobiliere-cote-d-azur',
    '/agent-immobilier-cote-d-azur',
    '/cote-d-azur-real-estate',
    '/contact',
    '/mentions-legales',
  ]

  const entries: MetadataRoute.Sitemap = []

  for (const lang of LANGS) {
    for (const path of staticUrls) {
      entries.push({
        url: `${baseUrl}/${lang}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority:
          path === ''
            ? 1.0
            : (
                path === '/agence-cote-dazur' ||
                path === '/agence-immobiliere-cote-d-azur' ||
                path === '/agent-immobilier-cote-d-azur' ||
                path === '/cote-d-azur-real-estate'
              )
            ? 0.9
            : 0.7,
      })
    }
  }

  const saleUrls = await getSaleUrls(baseUrl)
  return [...entries, ...saleUrls]
}
