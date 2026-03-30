import { notFound } from 'next/navigation';
import { isLang } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  return buildPageMetadata({
    title: `${slug} | Côte d’Azur Agency`,
    description: slug,
    lang,
    pathname: `/${lang}/vente/${slug}`
  });
}

export default async function VenteDetailPage({ params }) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();

  return (
    <main className="container py-16">
      <div className="card-luxe p-8">
        <h1 className="font-luxe text-4xl">{slug}</h1>
        <p className="mt-4 text-zinc-700">Données APIMO à raccorder ici.</p>
      </div>
    </main>
  );
}
