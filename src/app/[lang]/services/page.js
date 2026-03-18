import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';

export default async function ServicesPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/cannes-aerial.jpg" alt="Services" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/35" />
        </div>
        <div className="relative">
          <div className="container py-28">
            <div className="max-w-2xl">
              <div className="kicker">{lang === 'fr' ? 'Services' : 'Services'}</div>
              <h1 className="mt-6 font-luxe text-5xl text-white md:text-6xl">{t.services.title}</h1>
              <p className="mt-4 text-lg text-white/85">{t.services.lead}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {t.services.items.map((item) => (
            <div key={item.title} className="card-luxe p-8">
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                {lang === 'fr' ? 'Expertise' : 'Expertise'}
              </div>
              <h2 className="mt-3 font-luxe text-3xl text-zinc-900">{item.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-700">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[28px] bg-[var(--dark)] p-8 text-white shadow-soft">
          <div className="max-w-2xl">
            <h3 className="font-luxe text-3xl">{lang === 'fr' ? 'Échangeons sur votre projet' : 'Let’s discuss your project'}</h3>
            <p className="mt-3 text-sm text-white/80">
              {lang === 'fr'
                ? "Une approche qualitative, directe et adaptée à vos objectifs."
                : "A direct, qualitative approach aligned with your objectives."}
            </p>
            <div className="mt-6">
              <Link href={`/${lang || 'fr'}/contact`} className="btn-primary">
                {t.nav.contact}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
