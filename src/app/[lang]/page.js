import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const title = lang === 'en'
    ? 'Côte d’Azur Agency | Luxury Real Estate on the French Riviera'
    : 'Côte d’Azur Agency | Immobilier de prestige sur la Côte d’Azur';
  const description = lang === 'en'
    ? 'Côte d’Azur Agency advises French and international clients on luxury property sales and acquisitions across the French Riviera.'
    : 'Côte d’Azur Agency accompagne vendeurs et acquéreurs dans leurs projets immobiliers de prestige à Valbonne, Cannes, Mougins, Biot, Antibes et sur la Côte d’Azur.';
  return buildPageMetadata({ title, description, lang, pathname: `/${lang}` });
}

export default async function HomePage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <main>
      <section className="relative overflow-hidden bg-black text-white">
        <img src="/images/hero-pool.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative container py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="font-luxe text-4xl leading-tight md:text-6xl lg:text-[64px]">
              {t.home.heroTitle}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90 md:text-xl">
              {t.home.heroLead}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={`/${lang}/contact`} className="btn-gold">{t.home.ctaPrimary}</Link>
              <Link href={`/${lang}/vente`} className="btn-dark">{t.home.ctaSecondary}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="card-luxe p-8">
          <h2 className="font-luxe text-3xl">{t.home.introTitle}</h2>
          <p className="mt-4 text-zinc-700">{t.home.introText}</p>
          <p className="mt-4 text-zinc-700">{t.home.introText2}</p>
        </div>
      </section>
    </main>
  );
}
