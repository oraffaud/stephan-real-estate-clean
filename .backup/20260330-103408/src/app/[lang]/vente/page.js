import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

async function getMandatsFallback(lang) {
  return lang === 'fr'
    ? [
        { slug: 'vence-vue-mer', title: 'Vence : Élégante propriété avec vue mer panoramique' },
        { slug: 'tourrettes-bergerie', title: 'Tourrettes-sur-Loup : Bergerie rénovée avec vue mer panoramique' }
      ]
    : [
        { slug: 'vence-vue-mer', title: 'Vence: Elegant property with panoramic sea views' },
        { slug: 'tourrettes-bergerie', title: 'Tourrettes-sur-Loup: Renovated former sheepfold with panoramic sea view' }
      ];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const title = lang === 'en' ? 'Sale | Côte d’Azur Agency' : 'Vente | Côte d’Azur Agency';
  const description = lang === 'en'
    ? 'Listings and mandates on the French Riviera.'
    : 'Mandats et biens sur la Côte d’Azur.';
  return buildPageMetadata({ title, description, lang, pathname: `/${lang}/vente` });
}

export default async function VentePage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);
  const mandats = await getMandatsFallback(lang);

  return (
    <main className="container py-16">
      <h1 className="font-luxe text-4xl">{t.sale.title}</h1>
      <p className="mt-3 text-zinc-700">{t.sale.lead}</p>

      <div className="mt-8 grid gap-4">
        {mandats.length === 0 ? (
          <div className="card-luxe p-6">{t.sale.empty}</div>
        ) : mandats.map((m) => (
          <Link key={m.slug} href={`/${lang}/vente/${m.slug}`} className="card-luxe p-6 hover:bg-zinc-50">
            {m.title}
          </Link>
        ))}
      </div>
    </main>
  );
}
