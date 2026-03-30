export function buildPageMetadata({ title, description, lang, pathname }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cotedazuragency.com';
  const url = `${baseUrl}${pathname}`;
  const alt = lang === 'fr' ? 'en' : 'fr';
  const altUrl = `${baseUrl}/${alt}${pathname.replace(/^\/(fr|en)/, '')}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: lang === 'fr' ? url : altUrl,
        en: lang === 'en' ? url : altUrl,
        'x-default': `${baseUrl}/fr`
      }
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website'
    }
  };
}
