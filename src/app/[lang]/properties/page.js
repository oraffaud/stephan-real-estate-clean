import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isLang, getDict, formatEUR } from '@/lib/i18n';
import { filterProperties, TYPES } from '@/lib/properties';
import { PropertyCard } from '@/components/PropertyCard';

export default async function PropertiesPage({ params, searchParams }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  const q = searchParams?.q || '';
  const type = searchParams?.type || '';
  const bedsMin = Number(searchParams?.bedsMin || 0);
  const priceMax = Number(searchParams?.priceMax || 0);
  const sort = searchParams?.sort || 'featured';

  let results = filterProperties({ q, type, bedsMin, priceMax });

  if (sort === 'priceAsc') results = [...results].sort((a, b) => a.priceEUR - b.priceEUR);
  if (sort === 'priceDesc') results = [...results].sort((a, b) => b.priceEUR - a.priceEUR);
  if (sort === 'featured') results = [...results].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <main className="container py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{t.properties.title}</h1>
          <p className="mt-2 text-sm text-zinc-700">{results.length} results</p>
        </div>
        <Link href={`/${lang}#contact`} className="text-sm text-zinc-700 hover:text-zinc-900">
          {t.nav.contact} →
        </Link>
      </div>

      <form method="GET" className="mt-8 grid gap-3 rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft md:grid-cols-12">
        <div className="md:col-span-4">
          <label className="block text-xs font-semibold uppercase tracking-wide text-zinc-600">{t.properties.search}</label>
          <input
            name="q"
            defaultValue={q}
            placeholder={t.properties.searchPlaceholder}
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:border-zinc-400"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wide text-zinc-600">{t.properties.type}</label>
          <select
            name="type"
            defaultValue={type}
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:border-zinc-400"
          >
            <option value="">All</option>
            {TYPES.map((x) => (
              <option key={x} value={x}>{x}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wide text-zinc-600">{t.properties.bedsMin}</label>
          <input
            name="bedsMin"
            type="number"
            min="0"
            defaultValue={bedsMin || ''}
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:border-zinc-400"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wide text-zinc-600">{t.properties.priceMax}</label>
          <input
            name="priceMax"
            type="number"
            min="0"
            step="10000"
            defaultValue={priceMax || ''}
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:border-zinc-400"
          />
          <div className="mt-1 text-xs text-zinc-500">
            {priceMax ? formatEUR(priceMax, lang) : ''}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wide text-zinc-600">{t.properties.sort}</label>
          <select
            name="sort"
            defaultValue={sort}
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:border-zinc-400"
          >
            <option value="featured">{t.properties.sortFeatured}</option>
            <option value="priceAsc">{t.properties.sortPriceAsc}</option>
            <option value="priceDesc">{t.properties.sortPriceDesc}</option>
          </select>
        </div>

        <div className="md:col-span-12">
          <button className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800">
            Apply
          </button>
          <Link className="ml-4 text-sm text-zinc-700 hover:text-zinc-900" href={`/${lang}/properties`}>
            Reset
          </Link>
        </div>
      </form>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {results.length === 0 ? (
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-sm text-zinc-700 shadow-soft">
            {t.properties.empty}
          </div>
        ) : (
          results.map((p) => <PropertyCard key={p.id} lang={lang} property={p} />)
        )}
      </div>
    </main>
  );
}
