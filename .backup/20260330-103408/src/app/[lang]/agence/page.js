import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const title = lang === 'en' ? 'Agency | Côte d’Azur Agency' : 'L’agence | Côte d’Azur Agency';
  const description = lang === 'en' ? 'Founder, expertise and fees.' : 'Founder, expertise, honoraires.';
  return buildPageMetadata({ title, description, lang, pathname: `/${lang}/agence` });
}

export default async function AgencePage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <main className="container py-16">
      <h1 className="font-luxe text-4xl">{t.agency.title}</h1>
      <p className="mt-3 text-zinc-700">{t.agency.lead}</p>
      <div className="mt-8 card-luxe p-8">
        <p className="text-zinc-700">{t.agency.body}</p>
      </div>
    </main>
  );
}
