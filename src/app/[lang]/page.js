import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { PROPERTIES } from '@/lib/properties';
import { PropertyCard } from '@/components/PropertyCard';
import { ContactForm } from '@/components/ContactForm';

export default async function HomePage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  const featured = PROPERTIES.filter((p) => p.featured).slice(0, 3);

  return (
    <main>
      <section className="bg-white">
        <div className="container py-16">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{t.home.heroTitle}</h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-700">{t.home.heroLead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/${lang}/properties`}
                  className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800"
                >
                  {t.home.ctaBrowse}
                </Link>
                <Link
                  href={`/${lang}#contact`}
                  className="rounded-full border border-zinc-300 bg-white px-5 py-2 text-sm font-medium text-zinc-900 hover:border-zinc-500"
                >
                  {t.home.ctaContact}
                </Link>
              </div>
            </div>
            <div className="md:col-span-4">
              <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-soft">
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Valbonne · Alpes-Maritimes</div>
                <div className="mt-2 text-lg font-semibold text-zinc-900">{t.brand.tagline}</div>
                <p className="mt-3 text-sm text-zinc-700">EN / FR · International buyers welcome</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-14">
        <h2 className="text-xl font-semibold tracking-tight">{t.home.highlightsTitle}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {t.home.highlights.map((h) => (
            <div key={h.title} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft">
              <div className="text-sm font-semibold text-zinc-900">{h.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight">{t.properties.sortFeatured}</h2>
          <Link className="text-sm text-zinc-700 hover:text-zinc-900" href={`/${lang}/properties`}>
            {t.home.ctaBrowse} →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.id} lang={lang} property={p} />
          ))}
        </div>
      </section>

      <section id="contact" className="container py-14">
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{t.contact.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">{t.contact.lead}</p>
          </div>
          <ContactForm t={t} />
        </div>
      </section>
    </main>
  );
}
