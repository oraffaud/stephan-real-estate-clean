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
      <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
        <div className="card-luxe overflow-hidden">
          <div className="aspect-[16/10] bg-zinc-100">
            {mandat.pictures?.[0] ? <img src={mandat.pictures[0]} alt={mandat.title} className="h-full w-full object-cover" /> : null}
          </div>
        </div>

        <div className="card-luxe p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">{mandat.city || 'French Riviera'}</p>
          <h1 className="mt-3 font-luxe text-4xl">{mandat.title}</h1>

          <div className="mt-6 grid gap-3 text-sm text-zinc-700">
            {mandat.ref ? <div>Réf. {mandat.ref}</div> : null}
            {mandat.price ? <div>{formatPrice(mandat.price, lang)}</div> : null}
            {mandat.area ? <div>{mandat.area} m²</div> : null}
            {mandat.rooms ? <div>{mandat.rooms} pièces</div> : null}
            {mandat.bedrooms ? <div>{mandat.bedrooms} chambres</div> : null}
          </div>

          {mandat.description ? (
            <div className="mt-8 text-sm leading-relaxed text-zinc-700">{mandat.description}</div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
