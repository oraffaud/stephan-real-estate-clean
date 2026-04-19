import { notFound } from 'next/navigation';
import { isLang } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  const isFr = lang === 'fr';

  return buildPageMetadata({
    title: isFr
      ? "Immobilier Côte d’Azur | Côte d’Azur Agency"
      : "Côte d’Azur Real Estate | Côte d’Azur Agency",
    description: isFr
      ? "Immobilier sur la Côte d’Azur : une sélection de biens et un accompagnement premium sur la French Riviera."
      : "Côte d’Azur real estate: curated properties and premium advisory across the French Riviera.",
    lang,
    pathname: isFr ? '/fr/cote-d-azur-real-estate' : '/en/cote-d-azur-real-estate',
    image: '/images/hero-pool.jpg'
  });
}

export default async function Page({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const isFr = lang === 'fr';

  return (
    <main>
      <section className="container py-16 md:py-24">
        <div className="card-luxe p-8 md:p-12">
          <h1 className="font-luxe text-4xl leading-tight md:text-6xl">
            {isFr ? "Immobilier sur la Côte d’Azur" : "Côte d’Azur real estate"}
          </h1>
          <p className="mt-6 max-w-3xl text-zinc-700">
            {isFr
              ? "Côte d’Azur Agency développe une approche sélective de l’immobilier sur la Côte d’Azur, avec une attention particulière portée à la qualité des biens, à leur environnement et à la cohérence du projet client."
              : "Côte d’Azur Agency offers a selective approach to real estate on the French Riviera, with particular attention to property quality, setting and client alignment."}
          </p>
          <p className="mt-4 max-w-3xl text-zinc-700">
            {isFr
              ? "Notre univers couvre des biens de caractère, des villas, des propriétés avec vue ou jardin, ainsi qu’un accompagnement sur mesure dans les secteurs recherchés de la French Riviera."
              : "Our scope includes character properties, villas, homes with views or gardens, and tailored advisory across sought-after areas of the Côte d’Azur."}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a className="btn-gold" href={isFr ? "/fr/vente" : "/en/vente"}>
              {isFr ? "Voir la sélection" : "View the selection"}
            </a>
            <a className="btn-dark" href={isFr ? "/fr/contact" : "/en/contact"}>
              {isFr ? "Prendre contact" : "Contact us"}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
