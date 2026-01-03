import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';

export default async function AboutPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <main>
      <section className="container py-14">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight">{t.about.title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-700">{t.about.lead}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {t.about.blocks.map((b) => (
            <div key={b.title} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft">
              <div className="text-sm font-semibold text-zinc-900">{b.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700">{b.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft">
          <div className="text-sm font-semibold text-zinc-900">
            {lang === 'fr' ? "Méthode de travail" : "How we work"}
          </div>
          <ul className="mt-3 grid gap-2 text-sm text-zinc-700 md:grid-cols-2">
            <li>• {lang === 'fr' ? "Écoute & cadrage" : "Listening & briefing"}</li>
            <li>• {lang === 'fr' ? "Conseil & stratégie" : "Advice & strategy"}</li>
            <li>• {lang === 'fr' ? "Sélection & coordination" : "Curation & coordination"}</li>
            <li>• {lang === 'fr' ? "Transparence & suivi" : "Clarity & follow-up"}</li>
          </ul>

          <div className="mt-5">
            <Link href={`/${lang}/contact`} className="inline-flex rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800">
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
