import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang, getDict, formatEUR } from '@/lib/i18n';
import { getProperty, PROPERTIES } from '@/lib/properties';
import { ContactForm } from '@/components/ContactForm';

export function generateStaticParams() {
  return PROPERTIES.flatMap((p) => [
    { lang: 'en', id: p.id },
    { lang: 'fr', id: p.id },
  ]);
}

export default async function PropertyPage({ params }) {
  const { lang, id } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  const p = getProperty(id);
  if (!p) notFound();

  const context = `${p.title[lang]} (${p.area}) — ${formatEUR(p.priceEUR, lang)}`;

  return (
    <main className="container py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href={`/${lang}/properties`} className="text-sm text-zinc-700 hover:text-zinc-900">
            ← {t.properties.back}
          </Link>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">{p.title[lang]}</h1>
          <p className="mt-2 text-sm text-zinc-700">{p.area}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold">{formatEUR(p.priceEUR, lang)}</div>
          <div className="mt-2 flex flex-wrap justify-end gap-2 text-xs text-zinc-700">
            <span className="rounded-full bg-white px-3 py-1 border border-zinc-200">{p.type}</span>
            <span className="rounded-full bg-white px-3 py-1 border border-zinc-200">{p.beds} bd</span>
            <span className="rounded-full bg-white px-3 py-1 border border-zinc-200">{p.baths} ba</span>
            <span className="rounded-full bg-white px-3 py-1 border border-zinc-200">{p.sqm} m²</span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="grid gap-4 md:grid-cols-2">
            {p.images.slice(0, 4).map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-soft">
                <Image
                  src={src}
                  alt={p.title[lang]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold">{t.property.overview}</h2>
            <p className="mt-3 whitespace-pre-line text-sm text-zinc-700">{p.description[lang]}</p>

            <h3 className="mt-6 text-sm font-semibold text-zinc-900">{t.property.highlights}</h3>
            <ul className="mt-3 grid gap-2 text-sm text-zinc-700 md:grid-cols-2">
              {p.highlights[lang].map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-zinc-900" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft">
            <div className="text-sm font-semibold">{t.property.keyFacts}</div>
            <dl className="mt-3 grid gap-2 text-sm text-zinc-700">
              <div className="flex items-center justify-between"><dt>Type</dt><dd className="font-medium text-zinc-900">{p.type}</dd></div>
              <div className="flex items-center justify-between"><dt>Area</dt><dd className="font-medium text-zinc-900">{p.area}</dd></div>
              <div className="flex items-center justify-between"><dt>Bedrooms</dt><dd className="font-medium text-zinc-900">{p.beds}</dd></div>
              <div className="flex items-center justify-between"><dt>Bathrooms</dt><dd className="font-medium text-zinc-900">{p.baths}</dd></div>
              <div className="flex items-center justify-between"><dt>Surface</dt><dd className="font-medium text-zinc-900">{p.sqm} m²</dd></div>
            </dl>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft">
            <div className="text-sm font-semibold">{t.property.ctaTitle}</div>
            <p className="mt-2 text-sm text-zinc-700">{t.property.ctaText}</p>
            <div className="mt-4">
              <Link
                href={`/${lang}#contact`}
                className="inline-flex rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800"
              >
                {t.property.ctaButton}
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <section id="contact" className="mt-14">
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{t.contact.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">{t.contact.lead}</p>
          </div>
          <ContactForm t={t} context={context} />
        </div>
      </section>
    </main>
  );
}
