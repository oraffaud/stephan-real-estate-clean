import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return buildPageMetadata({
    title: lang === 'fr' ? 'Partenaires | Côte d’Azur Agency' : 'Partners | Côte d’Azur Agency',
    description: lang === 'fr'
      ? 'Un réseau de partenaires de confiance pour accompagner chaque projet immobilier.'
      : 'A trusted network of partners to support each real estate project.',
    lang,
    pathname: `/${lang}/agence/partenaires`
  });
}

export default async function PartnersPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <main className="container py-16">
      <h1 className="font-luxe text-4xl">
        {lang === 'fr' ? 'Partenaires' : 'Partners'}
      </h1>

      <p className="mt-3 max-w-3xl text-zinc-700">
        {lang === 'fr'
          ? 'Une sélection de partenaires de confiance pour accompagner les projets immobiliers internationaux avec efficacité, discrétion et précision.'
          : 'A curated selection of trusted partners to support international real estate projects with efficiency, discretion and precision.'}
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Link
          href={`/${lang}/agence/partenaires/transfert-argent-international`}
          className="card-luxe block p-8 transition hover:border-zinc-900"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C6A46C]">
            {lang === 'fr' ? 'Partenaire' : 'Partner'}
          </div>

          <h2 className="mt-4 font-luxe text-3xl text-zinc-900">
            Currencies Direct
          </h2>

          <p className="mt-4 text-zinc-700">
            {lang === 'fr'
              ? 'Transfert d’argent international.'
              : 'International money transfer.'}
          </p>
        </Link>
      </div>
    </main>
  );
}
