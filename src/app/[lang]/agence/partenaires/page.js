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
      ? 'Une sélection de partenaires utiles et complémentaires.'
      : 'A selection of useful and complementary partners.',
    lang,
    pathname: `/${lang}/agence/partenaires`
  });
}

export default async function PartnersPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const isFr = lang === 'fr';

  return (
    <main className="container py-10 md:py-16">
      <section className="rounded-[28px] bg-[#e9e4dc] px-8 py-10 md:px-12 md:py-14">
        <h1 className="font-luxe text-5xl leading-none text-zinc-900 md:text-7xl">
          {isFr ? 'Partenaires' : 'Partners'}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-700 md:text-xl">
          {isFr
            ? 'Une sélection de partenaires utiles et complémentaires.'
            : 'A selection of useful and complementary partners.'}
        </p>
      </section>

      <section className="mt-10">
        <div className="rounded-[36px] bg-white px-8 py-10 shadow-soft ring-1 ring-[var(--gold-light)] md:px-14 md:py-14">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C6A46C]">
            {isFr ? 'Partenaire' : 'Partner'}
          </div>

          {/* Zone logo réservée */}
          <div className="mt-8 flex h-[120px] items-center">
            <Image
              src="/partners/currencies-direct-logo.png"
              alt="Currencies Direct"
              width={320}
              height={90}
              className="h-auto max-h-[82px] w-auto object-contain"
              priority
            />
          </div>

          <h2 className="mt-2 font-luxe text-4xl leading-tight text-zinc-900 md:text-6xl">
            Currencies Direct
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-zinc-700 md:text-xl">
            {isFr ? 'Transfert d’argent international' : 'International money transfer'}
          </p>

          <div className="mt-10">
            <Link
              href={partnerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[68px] items-center justify-center rounded-full border-2 border-zinc-900 px-10 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
            >
              {isFr ? 'Visiter le partenaire' : 'Visit partner'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
