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

function LocationLine({ label }) {
  return (
    <div className="mt-4 flex items-center gap-3 text-[15px] font-medium uppercase tracking-[0.18em] text-[#C6A46C]">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 shrink-0 fill-current"
      >
        <path d="M12 22s7-7.33 7-12a7 7 0 1 0-14 0c0 4.67 7 12 7 12Zm0-9.5A2.5 2.5 0 1 1 12 7a2.5 2.5 0 0 1 0 5.5Z" />
      </svg>
      <span>{label}</span>
    </div>
  );
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
    mandats = (await getMandats(lang)).reverse();

    mandats.sort((a, b) => {
      const aLabel = `${a.title || a.name || ''} ${a.locationLabel || ''}`.toLowerCase();
      const bLabel = `${b.title || b.name || ''} ${b.locationLabel || ''}`.toLowerCase();

      const aIsBergerie =
        aLabel.includes('bergerie') &&
        aLabel.includes('tourrettes');

      const bIsBergerie =
        bLabel.includes('bergerie') &&
        bLabel.includes('tourrettes');

      if (aIsBergerie && !bIsBergerie) return 1;
      if (!aIsBergerie && bIsBergerie) return -1;
      return 0;
    });
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
        ) : mandats.map((m) => {
          const href = `/${lang}/vente/${m.slug}`;

          return (
            <article
              key={m.slug}
              className="grid gap-6 lg:grid-cols-[1.15fr_.85fr] lg:items-stretch"
            >
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="overflow-hidden rounded-[28px] bg-zinc-100"
              >
                <div className="aspect-[16/10]">
                  {m.pictures?.[0] ? (
                    <img src={m.pictures[0]} alt={m.title} className="h-full w-full object-cover" />
                  ) : null}
                </div>
              </Link>

              <div className="flex flex-col justify-center rounded-[28px] bg-white p-8 shadow-soft ring-1 ring-[var(--gold-light)] md:p-12">
                <h2 className="text-4xl font-light leading-[1.05] text-zinc-900 md:text-6xl">
                  {m.title}
                </h2>

                <LocationLine label={m.locationLabel} />

                {m.price ? (
                  <div className="mt-4 text-2xl text-zinc-900 md:text-3xl">
                    {formatPrice(m.price, lang)}
                  </div>
                ) : null}

                {m.description ? (
                  <p className="mt-8 line-clamp-6 text-lg leading-relaxed text-zinc-700">
                    {m.description}
                  </p>
                ) : null}

                <div className="mt-10">
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-zinc-900 px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] text-zinc-900"
                  >
                    {lang === 'fr' ? 'Découvrir ce bien' : 'Discover this property'}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
