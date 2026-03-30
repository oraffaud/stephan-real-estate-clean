import { notFound } from 'next/navigation';
import { isLang } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { getMandatBySlug } from '@/lib/apimo';

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

  let mandat = null;
  try {
    mandat = await getMandatBySlug(slug, lang);
  } catch (e) {
    console.error('VENTE_DETAIL_APIMO_ERROR', e);
  }

  if (!mandat) notFound();

  return (
    <main className="container py-16">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-start">
        <div className="overflow-hidden rounded-[28px] bg-zinc-100">
          <div className="aspect-[16/10]">
            {mandat.pictures?.[0] ? (
              <img src={mandat.pictures[0]} alt={mandat.title} className="h-full w-full object-cover" />
            ) : null}
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-8 shadow-soft ring-1 ring-[var(--gold-light)]">
          <h1 className="font-luxe text-4xl leading-tight text-zinc-900 md:text-6xl">
            {mandat.title}
          </h1>

          <p className="mt-4 text-sm font-medium uppercase tracking-[0.22em] text-gold">
            {mandat.locationLabel}
          </p>

          {mandat.price ? (
            <div className="mt-3 text-3xl text-zinc-900">
              {formatPrice(mandat.price, lang)}
            </div>
          ) : null}

          {mandat.description ? (
            <div className="mt-8 whitespace-pre-line text-lg leading-relaxed text-zinc-700">
              {mandat.description}
            </div>
          ) : null}

          <div className="mt-10 flex flex-wrap gap-6 text-sm uppercase tracking-[0.16em] text-zinc-700">
            {mandat.area ? <span>{mandat.area} m²</span> : null}
            {mandat.rooms ? <span>{mandat.rooms} {lang === 'fr' ? 'pièces' : 'rooms'}</span> : null}
            {mandat.bedrooms ? <span>{mandat.bedrooms} {lang === 'fr' ? 'chambres' : 'bedrooms'}</span> : null}
          </div>
        </div>
      </div>
    </main>
  );
}
