import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

const partnerUrl = 'https://www.currenciesdirect.com/partner/0201110000931505';

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

const items = {
  fr: [
    { label: 'Notaires et conseils juridiques' },
    { label: 'Architectes et décorateurs' },
    { label: 'Experts techniques et diagnostics' },
    { label: 'Photographes et valorisation des biens' },
    { label: 'Artisans et entreprises de confiance' },
    {
      label: 'Currencies Direct',
      subtitle: 'Transfert d’argent international',
      href: partnerUrl,
      external: true
    }
  ],
  en: [
    { label: 'Notaries and legal advisors' },
    { label: 'Architects and interior designers' },
    { label: 'Technical experts and diagnostics' },
    { label: 'Property photographers and marketing support' },
    { label: 'Trusted contractors and craftsmen' },
    {
      label: 'Currencies Direct',
      subtitle: 'International money transfer',
      href: partnerUrl,
      external: true
    }
  ]
};

function PartnerCard({ item, lang }) {
  const content = (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-zinc-800 transition hover:border-zinc-900 hover:shadow-sm">
      <div className="font-medium text-zinc-900">{item.label}</div>
      {item.subtitle ? (
        <div className="mt-2 text-sm text-zinc-600">{item.subtitle}</div>
      ) : null}
      {item.external ? (
        <div className="mt-4 inline-flex rounded-full border border-zinc-900 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-900">
          {lang === 'fr' ? 'Visiter le partenaire' : 'Visit partner'}
        </div>
      ) : null}
    </div>
  );

  if (item.external) {
    return (
      <Link
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export default async function PartnersPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const list = items[lang] || items.fr;

  return (
    <main className="container py-16">
      <h1 className="font-luxe text-4xl">{lang === 'fr' ? 'Partenaires' : 'Partners'}</h1>

      <div className="mt-10 card-luxe p-8">
        <p className="text-lg leading-relaxed text-zinc-700">
          {lang === 'fr'
            ? 'Chaque projet immobilier d’exception repose aussi sur un réseau fiable, réactif et exigeant. Côte d’Azur Agency s’appuie sur des partenaires sélectionnés avec soin pour offrir un accompagnement cohérent et qualitatif à chaque étape.'
            : 'Every exceptional real estate project also relies on a trusted, responsive and demanding network. Côte d’Azur Agency works with carefully selected partners to provide consistent, high-quality support at every stage.'}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {list.map((item) => (
            <PartnerCard key={item.label} item={item} lang={lang} />
          ))}
        </div>
      </div>
    </main>
  );
}
