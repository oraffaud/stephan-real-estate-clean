import Link from 'next/link';
import { formatEUR } from '@/lib/i18n';

export function PropertyCard({ lang, property }) {
  const href = `/${lang}/properties/${property.id}`;
  const cover = (property.images && property.images[0]) ? property.images[0] : '/images/hero-pool.jpg';

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={cover}
          alt={property.title?.[lang] ?? property.title?.en ?? 'Property'}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Overlay for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/45" />

        {/* Top chips */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {property.featured ? (
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-zinc-900 backdrop-blur ring-1 ring-black/5">
              Featured
            </span>
          ) : null}
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur ring-1 ring-white/15">
            {property.type}
          </span>
        </div>

        {/* Bottom caption */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white">
                {property.title?.[lang] ?? property.title?.en ?? 'Property'}
              </div>
              <div className="truncate text-xs text-white/80">{property.area}</div>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-sm font-semibold text-white">
                {formatEUR(property.priceEUR, lang)}
              </div>
              <div className="mt-1 flex items-center justify-end gap-2 text-[11px] text-white/80">
                <span>{property.beds} bd</span>
                <span className="opacity-60">•</span>
                <span>{property.baths} ba</span>
                <span className="opacity-60">•</span>
                <span>{property.sqm} m²</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div className="text-xs text-zinc-600">
          {property.lifestyle?.length ? property.lifestyle.join(' · ') : 'Côte d’Azur'}
        </div>
        <div className="text-xs font-medium text-zinc-900">
          View →
        </div>
      </div>
    </Link>
  );
}
