import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { headers } from 'next/headers';

async function AgencySchema() {
  const nonce = (await headers()).get('x-nonce') || undefined;
  const baseUrl = 'https://www.cotedazuragency.com';

  const realEstateAgentJsonLd = {
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
    areaServed: [
      'French Riviera',
      'Côte d’Azur',
      'Valbonne',
      'Mougins',
      'Biot',
      'Cannes',
      'Antibes',
      'Théoule-sur-Mer',
      'Vence',
      'Tourrettes-sur-Loup'
    ],
    sameAs: [
      'https://fr.linkedin.com/company/c%C3%B4tedazuragency'
    ]
  };

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: `${baseUrl}/`,
    name: "Côte d'Azur Agency",
    alternateName: ["Cote d'Azur Agency", 'Côte d’Azur Agency']
  };

  return (
    <>
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentJsonLd) }}
      />
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
    </>
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
