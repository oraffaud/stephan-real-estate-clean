import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

const partnerUrl = 'https://www.currenciesdirect.com/partner/0201110000931505';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return buildPageMetadata({
    title: lang === 'fr'
      ? 'Transfert d’argent international | Côte d’Azur Agency'
      : 'International Money Transfer | Côte d’Azur Agency',
    description: lang === 'fr'
      ? 'Découvrez notre partenaire Currencies Direct pour les transferts d’argent internationaux liés à votre projet immobilier.'
      : 'Discover our partner Currencies Direct for international money transfers related to your property project.',
    lang,
    pathname: `/${lang}/agence/partenaires/transfert-argent-international`
  });
}

export default async function InternationalMoneyTransferPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <main className="container py-16">
      <div className="max-w-4xl">
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C6A46C]">
          {lang === 'fr' ? 'Partenaire' : 'Partner'}
        </div>

        <h1 className="mt-4 font-luxe text-4xl leading-tight text-zinc-900 md:text-6xl">
          Currencies Direct
        </h1>

        <div className="mt-10 card-luxe p-8 md:p-10">
          <p className="text-xl text-zinc-900">
            {lang === 'fr'
              ? 'Transfert d’argent international.'
              : 'International money transfer.'}
          </p>

          <div className="mt-8">
            <Link
              href={partnerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-lg text-sky-700 underline underline-offset-4"
            >
              {partnerUrl}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
