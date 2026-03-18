import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';

export default async function AboutPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <main>
      <section className="container py-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              {lang === 'fr' ? 'À propos' : 'About'}
            </div>
            <h1 className="mt-4 font-luxe text-5xl text-zinc-900">{t.about.title}</h1>
            <p className="mt-5 text-sm leading-relaxed text-zinc-700">{t.about.lead}</p>

            <div className="mt-8 rounded-[24px] overflow-hidden shadow-soft">
              <img src="/images/villa-modern-1.jpg" alt="About" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="md:col-span-7 grid gap-6">
            {t.about.blocks.map((block) => (
              <div key={block.title} className="card-luxe p-8">
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  {lang === 'fr' ? 'Vision' : 'Vision'}
                </div>
                <h2 className="mt-3 font-luxe text-3xl text-zinc-900">{block.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-zinc-700">{block.text}</p>
              </div>
            ))}

            <div className="rounded-[28px] bg-white p-8 shadow-soft border border-gold-light">
              <h3 className="font-luxe text-3xl text-zinc-900">{lang === 'fr' ? 'Un service signature' : 'A signature service'}</h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-700">
                {lang === 'fr'
                  ? "Présence locale, regard international, sens du détail et communication premium."
                  : "Local presence, international perspective, attention to detail and premium communication."}
              </p>
              <div className="mt-6">
                <Link href={`/${lang}/contact`} className="btn-dark">
                  {t.nav.contact}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
