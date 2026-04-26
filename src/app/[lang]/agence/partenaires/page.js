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
    description:
      lang === 'fr'
        ? 'Une sélection de partenaires utiles et complémentaires.'
        : 'A selection of useful and complementary partners.',
    lang,
    pathname: `/${lang}/agence/partenaires`,
  });
}

function PartnerCard({ title, description, children }) {
  return (
    <div className="rounded-[28px] bg-white p-8 md:p-10 shadow-soft ring-1 ring-[var(--gold-light)] flex flex-col">
      <div className="flex-1">
        <h2 className="font-luxe text-[34px] leading-tight text-zinc-900 md:text-[42px]">
          {title}
        </h2>
        {description ? (
          <p className="mt-5 text-lg leading-relaxed text-zinc-700 md:text-[20px]">
            {description}
          </p>
        ) : null}
      </div>

      {children ? <div className="mt-8">{children}</div> : null}
    </div>
  );
}

function CurrenciesDirectCard({ lang }) {
  const isFr = lang === 'fr';

  return (
    <PartnerCard
      title="Currencies Direct"
      description={isFr ? "Transfert d'argent international" : 'International money transfer'}
    >
      <div className="mb-8">
        <div className="relative h-[120px] w-[360px] max-w-full md:h-[150px] md:w-[460px]">
          <Image
            src="/partners/currencies-direct-logo.png"
            alt="Currencies Direct"
            fill
            priority
            className="object-contain object-left"
          />
        </div>
      </div>

      <Link
        href={partnerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[64px] items-center justify-center rounded-full border-2 border-zinc-900 px-8 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
      >
        {isFr ? 'Visiter le partenaire' : 'Visit partner'}
      </Link>
    </PartnerCard>
  );
}

export default async function PartnersPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const cards = lang === 'fr'
    ? [
        {
          title: 'Notaires et conseils juridiques',
          description: 'Sécurisation juridique et accompagnement des transactions.',
        },
        {
          title: 'Architectes et décorateurs',
          description: 'Conception, rénovation et valorisation des espaces.',
        },
        {
          title: 'Experts techniques et diagnostics',
          description: 'Évaluation, contrôle et expertise technique des biens.',
        },
        {
          title: 'Photographes et valorisation des biens',
          description: 'Mise en image premium et présentation soignée des propriétés.',
        },
        {
          title: 'Artisans et entreprises de confiance',
          description: 'Intervenants sélectionnés pour des réalisations de qualité.',
        },
      ]
    : [
        {
          title: 'Notaries and legal advisors',
          description: 'Legal structuring and secure support for property transactions.',
        },
        {
          title: 'Architects and interior designers',
          description: 'Design, renovation and enhancement of living spaces.',
        },
        {
          title: 'Technical experts and diagnostics',
          description: 'Property assessment, inspections and technical expertise.',
        },
        {
          title: 'Photographers and property presentation',
          description: 'Premium imagery and refined property presentation.',
        },
        {
          title: 'Trusted craftsmen and contractors',
          description: 'Selected professionals for high-quality work and follow-up.',
        },
      ];

  return (
    <main className="container py-8 md:py-10">
      <section className="rounded-[32px] bg-[#e9e4dc] px-10 py-10 md:px-14 md:py-14">
        <h1 className="font-luxe text-5xl leading-none text-zinc-900 md:text-7xl">
          {lang === 'fr' ? 'Partenaires' : 'Partners'}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-700 md:text-[20px]">
          {lang === 'fr'
            ? 'Une sélection de partenaires utiles et complémentaires.'
            : 'A selection of useful and complementary partners.'}
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2 md:items-start">
        {cards.map((card) => (
          <PartnerCard
            key={card.title}
            title={card.title}
            description={card.description}
          />
        ))}

        <CurrenciesDirectCard lang={lang} />
      </section>
    </main>
  );
}
