import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';

export default async function ServicesPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <main>
      <section className="container py-14">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight">{t.services.title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-700">{t.services.lead}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {t.services.items.map((x) => (
            <div key={x.title} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft">
              <div className="text-sm font-semibold text-zinc-900">{x.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700">{x.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft">
          <div className="text-sm font-semibold text-zinc-900">
            {lang === 'fr' ? "Prêt à démarrer ?" : "Ready to start?"}
          </div>
          <p className="mt-2 text-sm text-zinc-700">
            {lang === 'fr'
              ? "Décrivez votre projet (vente, estimation, achat, international)."
              : "Share your project (selling, valuation, buying, international)."}
          </p>
          <div className="mt-4">
            <Link href={`/${lang}/contact`} className="inline-flex rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800">
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
