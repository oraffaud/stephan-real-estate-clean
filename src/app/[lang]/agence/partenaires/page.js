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

const items = {
  fr: [
    'Notaires et conseils juridiques',
    'Architectes et décorateurs',
    'Experts techniques et diagnostics',
    'Photographes et valorisation des biens',
    'Artisans et entreprises de confiance'
  ],
  en: [
    'Notaries and legal advisors',
    'Architects and interior designers',
    'Technical experts and diagnostics',
    'Property photographers and marketing support',
    'Trusted contractors and craftsmen'
  ]
};

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
            <div key={item} className="rounded-2xl border border-zinc-200 bg-white p-5 text-zinc-800">
              {item}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
