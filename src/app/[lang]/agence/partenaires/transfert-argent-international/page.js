import { notFound } from 'next/navigation';
import { isLang } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return buildPageMetadata({
    title: lang === 'fr'
      ? 'Transfert d’argent international | Côte d’Azur Agency'
      : 'International Money Transfer | Côte d’Azur Agency',
    description: lang === 'fr'
      ? 'Une solution de transfert d’argent international sécurisée et adaptée aux projets immobiliers.'
      : 'A secure international money transfer solution tailored to real estate projects.',
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
          {lang === 'fr' ? 'Transfert d’argent international' : 'International money transfer'}
        </h1>

        <div className="mt-10 card-luxe p-8 md:p-10">
          {lang === 'fr' ? (
            <div className="space-y-6 text-lg leading-relaxed text-zinc-700">
              <p>
                Dans le cadre d’un projet immobilier international, la sécurisation et la fluidité des transferts
                financiers constituent un enjeu essentiel.
              </p>
              <p>
                Côte d’Azur Agency peut orienter ses clients vers des partenaires spécialisés capables
                d’accompagner les opérations de transfert d’argent international avec méthode, confidentialité
                et réactivité.
              </p>
              <p>
                Cette mise en relation vise à faciliter certaines étapes sensibles d’un projet transfrontalier,
                en particulier lorsqu’une coordination rapide et rigoureuse est requise.
              </p>
            </div>
          ) : (
            <div className="space-y-6 text-lg leading-relaxed text-zinc-700">
              <p>
                Within an international real estate project, secure and efficient fund transfers are a key issue.
              </p>
              <p>
                Côte d’Azur Agency can direct its clients to specialised partners able to support international
                money transfers with method, confidentiality and responsiveness.
              </p>
              <p>
                This introduction is intended to facilitate sensitive steps within cross-border projects,
                especially when fast and rigorous coordination is required.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
