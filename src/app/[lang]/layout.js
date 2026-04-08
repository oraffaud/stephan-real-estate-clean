import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

function AgencySchema() {
  const baseUrl = 'https://www.cotedazuragency.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Côte d’Azur Agency',
    url: baseUrl,
    logo: `${baseUrl}/branding/logo-full.png`,
    email: 'stephan@cotedazuragency.com',
    telephone: '+33 6 70 74 65 49',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '296 Chemin Clos de Brasset',
      postalCode: '06560',
      addressLocality: 'Valbonne',
      addressCountry: 'FR'
    },
    areaServed: ['Valbonne', 'Vence', 'Tourrettes-sur-Loup', 'French Riviera'],
    sameAs: [baseUrl]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <>
      <AgencySchema />
      <Header lang={lang} t={t} />
      {children}
      <Footer lang={lang} t={t} />
    </>
  );
}
