import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const title = lang === 'en' ? 'Home | Côte d’Azur Agency' : 'Accueil | Côte d’Azur Agency';
  const description = lang === 'en'
    ? 'Luxury real estate on the French Riviera.'
    : 'Immobilier de prestige sur la Côte d’Azur.';
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
            <p className="text-gold text-sm uppercase tracking-[0.25em]">
              {t.home.heroLead}
            </p>

            <h1 className="mt-6 font-luxe text-5xl leading-tight md:text-7xl">
              {t.home.heroTitle}
            </h1>

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
        </div>
      </section>
    </main>
  );
}
