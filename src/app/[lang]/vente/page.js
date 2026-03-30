import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getMandats } from '@/lib/apimo';

function formatPrice(value, lang) {
  if (!value) return '';
  try {
    return new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  } catch {
    return `${value} €`;
  }
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

  let mandats = [];
  try {
    mandats = await getMandats(lang);
  } catch (e) {
    console.error('VENTE_APIMO_ERROR', e);
  }

  return (
    <main className="container py-16">
      <h1 className="font-luxe text-4xl">{t.sale.title}</h1>
      <p className="mt-3 text-zinc-700">{t.sale.lead}</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mandats.length === 0 ? (
          <div className="card-luxe p-6">{t.sale.empty}</div>
        ) : mandats.map((m) => (
          <Link key={m.slug} href={`/${lang}/vente/${m.slug}`} className="card-luxe overflow-hidden hover:bg-zinc-50">
            <div className="aspect-[4/3] bg-zinc-100">
              {m.pictures?.[0] ? <img src={m.pictures[0]} alt={m.title} className="h-full w-full object-cover" /> : null}
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">{m.city || 'French Riviera'}</p>
              <h2 className="mt-3 font-luxe text-2xl text-zinc-900">{m.title}</h2>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-700">
                {m.price ? <span>{formatPrice(m.price, lang)}</span> : null}
                {m.area ? <span>{m.area} m²</span> : null}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
