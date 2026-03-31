import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;

  return buildPageMetadata({
    title: lang === 'fr'
      ? 'Agence immobilière à Valbonne | Côte d’Azur Agency'
      : 'Real Estate Agency in Valbonne | Côte d’Azur Agency',
    description: lang === 'fr'
      ? 'Découvrez Côte d’Azur Agency, une approche indépendante et premium de l’immobilier sur la Côte d’Azur.'
      : 'Discover Côte d’Azur Agency, an independent and premium approach to real estate on the French Riviera.',
    lang,
    pathname: `/${lang}/agence`
  });
}

export default async function AgencePage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <main className="container py-16">
      <h1 className="font-luxe text-4xl">{t.agency.title}</h1>
      <p className="mt-3 text-zinc-700">{t.agency.lead}</p>
      <div className="mt-8 card-luxe p-8">
        <p className="text-zinc-700">{t.agency.body}</p>
      </div>
    </main>
  );
}
