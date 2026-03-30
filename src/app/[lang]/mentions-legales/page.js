import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = await getDict(lang);
  return buildPageMetadata({
    title: `${t.legal.title} | Côte d’Azur Agency`,
    description: t.legal.title,
    lang,
    pathname: `/${lang}/mentions-legales`
  });
}

export default async function LegalPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <main className="container py-16">
      <h1 className="font-luxe text-4xl">{t.legal.title}</h1>
      <div className="mt-8 card-luxe p-8 text-zinc-700">
        À compléter avec les mentions légales définitives.
      </div>
    </main>
  );
}
