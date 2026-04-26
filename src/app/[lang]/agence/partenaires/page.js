import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { isLang } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

const partnerUrl = 'https://www.currenciesdirect.com/partner/0201110000931505';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return buildPageMetadata({
    title: lang === 'fr' ? 'Partenaires | Côte d’Azur Agency' : 'Partners | Côte d’Azur Agency',
    description: lang === 'fr'
      ? 'Un réseau de partenaires utiles et complémentaires.'
      : 'A network of useful and complementary partners.',
    lang,
    pathname: `/${lang}/agence/partenaires`
  });
}

function StandardCard({ title }) {
  return (
    <div className="rounded-[28px] bg-white p-8 shadow-soft ring-1 ring-[var(--gold-light)]">
      <div className="text-xl leading-relaxed text-zinc-800 md:text-2xl">
        {title}
      </div>
    </div>
  );
}

function CurrenciesCard({ lang }) {
  const fr = lang === 'fr';

  return (
    <div className="rounded-[28px] bg-white p-8 shadow-soft ring-1 ring-[var(--gold-light)] md:p-10">
      <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C6A46C]">
        {fr ? 'Partenaire' : 'Partner'}
      </div>

      <div className="mt-6 flex h-[110px] items-center">
        <div className="relative h-[86px] w-[320px] max-w-full">
          <Image
            src="/partners/currencies-direct-logo.png"
            alt="Currencies Direct"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      </div>

      <h2 className="mt-4 font-luxe text-4xl leading-tight text-zinc-900 md:text-5xl">
        Currencies Direct
      </h2>

      <p className="mt-5 text-lg leading-relaxed text-zinc-700 md:text-xl">
        {fr ? "Transfert d'argent international" : 'International money transfer'}
      </p>

      <div className="mt-8">
        <Link
          href={partnerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[64px] items-center justify-center rounded-full border-2 border-zinc-900 px-8 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
        >
          {fr ? 'Visiter le partenaire' : 'Visit partner'}
        </Link>
      </div>
    </div>
  );
}

export default async function PartnersPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const fr = lang === 'fr';

  const partnerItems = fr
    ? [
        'Notaires et conseils juridiques',
        'Architectes et décorateurs',
        'Experts techniques et diagnostics',
        'Photographes et valorisation des biens',
        'Artisans et entreprises de confiance'
      ]
    : [
        'Notaries and legal advisors',
        'Architects and interior designers',
        'Technical experts and diagnostics',
        'Property photographers and marketing support',
        'Trusted contractors and craftsmen'
      ];

  return (
    <main className="container py-8 md:py-10">
      <section className="rounded-[32px] bg-[#e9e4dc] px-10 py-10 md:px-14 md:py-14">
        <h1 className="font-luxe text-5xl leading-none text-zinc-900 md:text-7xl">
          {fr ? 'Partenaires' : 'Partners'}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-700 md:text-[20px]">
          {fr
            ? 'Une sélection de partenaires utiles et complémentaires.'
            : 'A selection of useful and complementary partners.'}
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {partnerItems.map((item) => (
          <StandardCard key={item} title={item} />
        ))}

        <CurrenciesCard lang={lang} />
      </section>
    </main>
  );
}
