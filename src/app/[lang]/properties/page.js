import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { PROPERTIES } from '@/lib/properties';
import { PropertyCard } from '@/components/PropertyCard';

function buildHref(lang, next) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(next)) {
    if (v && v !== 'all') q.set(k, v);
  }
  const qs = q.toString();
  return `/${lang}/properties${qs ? `?${qs}` : ''}`;
}

export default async function PropertiesPage({ params, searchParams }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  const area = (searchParams?.area || 'all').toString();
  const type = (searchParams?.type || 'all').toString();
  const life = (searchParams?.life || 'all').toString();

  const filtered = PROPERTIES.filter((p) => {
    const okArea = area === 'all' || (p.areaKey || '').toLowerCase() === area.toLowerCase();
    const okType = type === 'all' || (p.typeKey || '').toLowerCase() === type.toLowerCase();
    const okLife = life === 'all' || (Array.isArray(p.lifestyleKey) && p.lifestyleKey.map(String).map(s=>s.toLowerCase()).includes(life.toLowerCase()));
    return okArea && okType && okLife;
  });

  // Chips sets (labels are bilingual)
  const AREAS = [
    { key: 'all', label: t.properties.all },
    { key: 'valbonne', label: 'Valbonne' },
    { key: 'mougins', label: 'Mougins' },
    { key: 'cannes', label: 'Cannes' },
    { key: 'antibes', label: 'Antibes' },
    { key: 'grasse', label: 'Grasse' }
  ];

  const TYPES = [
    { key: 'all', label: t.properties.all },
    { key: 'villa', label: lang === 'fr' ? 'Villa' : 'Villa' },
    { key: 'apartment', label: lang === 'fr' ? 'Appartement' : 'Apartment' },
    { key: 'penthouse', label: lang === 'fr' ? 'Penthouse' : 'Penthouse' },
    { key: 'mas', label: lang === 'fr' ? 'Mas' : 'Mas' }
  ];

  const LIFESTYLES = [
    { key: 'all', label: t.properties.all },
    { key: 'sea-view', label: lang === 'fr' ? 'Vue mer' : 'Sea view' },
    { key: 'pool', label: lang === 'fr' ? 'Piscine' : 'Pool' },
    { key: 'investment', label: lang === 'fr' ? 'Investissement' : 'Investment' },
    { key: 'family', label: lang === 'fr' ? 'Famille' : 'Family' }
  ];

  const Chip = ({ active, href, children }) => (
    <Link
      href={href}
      className={[
        'inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ring-1 transition',
        active
          ? 'bg-zinc-900 text-white ring-zinc-900'
          : 'bg-white text-zinc-900 ring-zinc-200 hover:ring-zinc-400',
      ].join(' ')}
    >
      {children}
    </Link>
  );

  return (
    <main>
      {/* Photo banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/cannes-aerial.jpg"
            alt="French Riviera"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-white/95" />
        </div>

        <div className="relative">
          <div className="container py-14 md:py-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white ring-1 ring-white/20 backdrop-blur">
                Valbonne · French Riviera · EN/FR
              </div>
              <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {t.properties.pageTitle}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-white/85">
                {t.properties.pageLead}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container -mt-10 pb-6">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft">
          <div className="text-sm font-semibold text-zinc-900">{t.properties.filtersTitle}</div>

          <div className="mt-4 grid gap-5 md:grid-cols-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-zinc-600">{t.properties.filterArea}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {AREAS.map((c) => (
                  <Chip
                    key={c.key}
                    active={area === c.key}
                    href={buildHref(lang, { area: c.key, type, life })}
                  >
                    {c.label}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-zinc-600">{t.properties.filterType}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {TYPES.map((c) => (
                  <Chip
                    key={c.key}
                    active={type === c.key}
                    href={buildHref(lang, { area, type: c.key, life })}
                  >
                    {c.label}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-zinc-600">{t.properties.filterLifestyle}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {LIFESTYLES.map((c) => (
                  <Chip
                    key={c.key}
                    active={life === c.key}
                    href={buildHref(lang, { area, type, life: c.key })}
                  >
                    {c.label}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container py-10">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-sm text-zinc-700 shadow-soft">
            {t.properties.noResults}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {filtered.map((p) => (
              <PropertyCard key={p.id} lang={lang} property={p} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
