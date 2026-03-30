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
    ? 'Properties for sale on the French Riviera.'
    : 'Biens à la vente sur la Côte d’Azur.';
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

      <div className="mt-10 grid gap-10">
        {mandats.length === 0 ? (
          <div className="card-luxe p-6">{t.sale.empty}</div>
        ) : mandats.map((m) => (
          <Link
            key={m.slug}
            href={`/${lang}/vente/${m.slug}`}
            className="grid gap-6 lg:grid-cols-[1.15fr_.85fr] lg:items-stretch"
          >
            <div className="overflow-hidden rounded-[28px] bg-zinc-100">
              <div className="aspect-[16/10]">
                {m.pictures?.[0] ? (
                  <img src={m.pictures[0]} alt={m.title} className="h-full w-full object-cover" />
                ) : null}
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-[28px] bg-white p-8 shadow-soft ring-1 ring-[var(--gold-light)]">
              <h2 className="font-luxe text-3xl leading-tight text-zinc-900 md:text-5xl">
                {m.title}
              </h2>

              <p className="mt-4 text-sm font-medium uppercase tracking-[0.22em] text-gold">
                {m.locationLabel}
              </p>

              {m.price ? (
                <div className="mt-3 text-2xl text-zinc-900">
                  {formatPrice(m.price, lang)}
                </div>
              ) : null}

              <div className="mt-8">
                <span className="inline-flex rounded-full border border-zinc-900 px-6 py-3 text-sm font-medium text-zinc-900">
                  {lang === 'fr' ? 'Découvrir ce bien' : 'Discover this property'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
