import Image from 'next/image';
import Link from 'next/link';
import { formatEUR } from '@/lib/i18n';

export function PropertyCard({ lang, property }) {
  return (
    <Link
      href={`/${lang}/properties/${property.id}`}
      className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-soft hover:border-zinc-300"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={property.images[0]}
          alt={property.title[lang]}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm text-zinc-600">{property.area}</div>
            <h3 className="mt-1 text-base font-semibold tracking-tight text-zinc-900">
              {property.title[lang]}
            </h3>
          </div>
          <div className="shrink-0 text-sm font-semibold text-zinc-900">
            {formatEUR(property.priceEUR, lang)}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-700">
          <span className="rounded-full bg-zinc-100 px-3 py-1">{property.type}</span>
          <span className="rounded-full bg-zinc-100 px-3 py-1">{property.beds} bd</span>
          <span className="rounded-full bg-zinc-100 px-3 py-1">{property.baths} ba</span>
          <span className="rounded-full bg-zinc-100 px-3 py-1">{property.sqm} m²</span>
        </div>
      </div>
    </Link>
  );
}
