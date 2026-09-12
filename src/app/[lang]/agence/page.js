import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return buildPageMetadata({
    title: lang === 'fr'
      ? 'Côte d’Azur Agency | Agence immobilière de prestige'
      : 'Côte d’Azur Agency | Luxury Real Estate Agency',
    description: lang === 'fr'
      ? 'Découvrez Côte d’Azur Agency, agence immobilière indépendante spécialisée dans l’immobilier de prestige sur la Côte d’Azur.'
      : 'Discover Côte d’Azur Agency, an independent luxury real estate agency specialising in the French Riviera.',
    lang,
    pathname: `/${lang}/agence`
  });
}

const cards = {
  fr: [
    {
      title: 'Founder',
      text: 'Un parcours exigeant, une culture du service et une approche premium de l’immobilier sur la Côte d’Azur.',
      href: '/agence/founder',
      cta: 'Découvrir'
    },
    {
      title: 'Expertises',
      text: 'Une lecture moderne du marché, enrichie par l’expertise terrain et les nouveaux outils de recherche.',
      href: '/agence/expertises',
      cta: 'Explorer'
    },
    {
      title: 'Partenaires',
      text: 'Un réseau de partenaires de confiance pour accompagner chaque projet avec précision.',
      href: '/agence/partenaires',
      cta: 'Voir plus'
    }
  ],
  en: [
    {
      title: 'Founder',
      text: 'A demanding background, a service-driven culture and a premium real estate approach on the French Riviera.',
      href: '/agence/founder',
      cta: 'Discover'
    },
    {
      title: 'Expertises',
      text: 'A modern reading of the market, combining local expertise with intelligent research tools.',
      href: '/agence/expertises',
      cta: 'Explore'
    },
    {
      title: 'Partners',
      text: 'A trusted network of partners to support each project with precision.',
      href: '/agence/partenaires',
      cta: 'Learn more'
    }
  ]
};

export default async function AgencePage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const list = cards[lang] || cards.fr;

  return (
    <main className="container py-16">
      <h1 className="font-luxe text-4xl">
        Côte d’Azur Agency
      </h1>
      <p className="mt-3 max-w-3xl text-zinc-700">
        {lang === 'fr'
          ? 'Agence immobilière indépendante spécialisée dans l’immobilier de prestige sur la Côte d’Azur, nous accompagnons vendeurs et acquéreurs avec une approche personnalisée, discrète et exigeante.'
          : 'An independent agency specialising in luxury real estate on the French Riviera, we support sellers and buyers through a personalised, discreet and exacting approach.'}
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {list.map((item) => (
          <div key={item.title} className="card-luxe flex flex-col p-8">
            <h2 className="font-luxe text-3xl text-zinc-900">{item.title}</h2>
            <p className="mt-4 flex-1 text-zinc-700">{item.text}</p>
            <div className="mt-8">
              <Link
                href={`/${lang}${item.href}`}
                className="inline-flex rounded-full border border-zinc-900 px-6 py-3 text-sm font-medium text-zinc-900"
              >
                {item.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
