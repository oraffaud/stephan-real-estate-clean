import { notFound } from 'next/navigation';
import { isLang } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  const isFr = lang === 'fr';

  return buildPageMetadata({
    title: isFr
      ? "Agence immobilière Côte d’Azur | Côte d’Azur Agency"
      : "French Riviera Real Estate Agency | Côte d’Azur Agency",
    description: isFr
      ? "Agence immobilière sur la Côte d’Azur, spécialisée dans l’immobilier de prestige avec un accompagnement sur mesure à Valbonne, Vence, Tourrettes-sur-Loup et sur la French Riviera."
      : "Real estate agency on the French Riviera, specialized in luxury property with a tailored approach in Valbonne, Vence, Tourrettes-sur-Loup and across the Côte d’Azur.",
    lang,
    pathname: isFr ? '/fr/agence-immobiliere-cote-d-azur' : '/en/agence-immobiliere-cote-d-azur',
    image: '/images/hero-pool.jpg'
  });
}

export default async function Page({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const isFr = lang === 'fr';

  return (
    <main>
      <section className="relative overflow-hidden bg-black text-white">
        <img src="/images/hero-pool.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="relative container py-16 md:py-24">
          <div className="max-w-4xl">
            <h1 className="font-luxe text-4xl leading-tight md:text-6xl lg:text-[64px]">
              {isFr ? "Agence immobilière sur la Côte d’Azur" : "Real estate agency on the French Riviera"}
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-white/90">
              {isFr
                ? "Côte d’Azur Agency accompagne les projets immobiliers haut de gamme sur la Côte d’Azur, avec une approche confidentielle, exigeante et sur mesure."
                : "Côte d’Azur Agency supports high-end real estate projects on the French Riviera with a confidential, selective and tailored approach."}
            </p>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="card-luxe p-8">
          <h2 className="font-luxe text-3xl">
            {isFr ? "Un accompagnement premium, ancré localement" : "A premium service with genuine local roots"}
          </h2>
          <p className="mt-4 text-zinc-700">
            {isFr
              ? "Notre agence immobilière intervient sur la Côte d’Azur avec un positionnement orienté qualité, discrétion et personnalisation. Nous accompagnons les projets d’achat, de vente et de recherche ciblée dans les secteurs résidentiels et de prestige."
              : "Our agency operates across the French Riviera with a quality-driven, discreet and highly personalized approach. We support acquisitions, sales and targeted searches in prime residential locations."}
          </p>
          <p className="mt-4 text-zinc-700">
            {isFr
              ? "Nos zones de prédilection incluent notamment Valbonne, Vence, Tourrettes-sur-Loup et plus largement les marchés recherchés de la Côte d’Azur."
              : "Our preferred areas include Valbonne, Vence, Tourrettes-sur-Loup and, more broadly, sought-after markets across the Côte d’Azur."}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a className="btn-gold" href={isFr ? "/fr/contact" : "/en/contact"}>
              {isFr ? "Contacter l’agence" : "Contact the agency"}
            </a>
            <a className="btn-dark" href={isFr ? "/fr/vente" : "/en/vente"}>
              {isFr ? "Voir les biens à la vente" : "View properties for sale"}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
