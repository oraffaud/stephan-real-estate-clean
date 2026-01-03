import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { ContactForm } from '@/components/ContactForm';

export default async function HomePage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <main>
      {/* HERO with photo background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-pool.jpg"
            alt="Luxury villa French Riviera"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/10" />
        </div>

        <div className="relative">
          <div className="container py-16 md:py-24">
            <div className="grid gap-10 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white ring-1 ring-white/20 backdrop-blur">
                  Valbonne · Alpes-Maritimes · EN/FR · International clients
                </div>

                <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
                  {t.home.heroTitle}
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85">
                  {t.home.heroLead}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/${lang}/services`}
                    className="rounded-full bg-white px-6 py-2 text-sm font-medium text-zinc-900 hover:bg-white/90"
                  >
                    {t.home.ctaPrimary}
                  </Link>

                  <Link
                    href={`/${lang}/contact`}
                    className="rounded-full border border-white/30 bg-white/10 px-6 py-2 text-sm font-medium text-white hover:bg-white/20 backdrop-blur"
                  >
                    {t.home.ctaSecondary}
                  </Link>
                </div>
              </div>

              <div className="md:col-span-4">
                <div className="rounded-3xl bg-white/10 p-6 text-white ring-1 ring-white/20 shadow-soft backdrop-blur">
                  <div className="text-xs font-semibold uppercase tracking-wide text-white/80">
                    Valbonne · French Riviera
                  </div>
                  <div className="mt-2 text-lg font-semibold">
                    {t.brand.tagline}
                  </div>
                  <p className="mt-3 text-sm text-white/85">
                    Boutique service · Discretion · International
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick routes */}
      <section className="container py-14">
        <div className="grid gap-4 md:grid-cols-3">
          <Link href={`/${lang}/services`} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft hover:shadow-md transition">
            <div className="text-sm font-semibold text-zinc-900">{t.nav.services}</div>
            <p className="mt-2 text-sm text-zinc-700">
              {lang === 'fr' ? "Vente, estimation, accompagnement acheteur, international." : "Sales strategy, valuation, buyer advisory, international support."}
            </p>
          </Link>

          <Link href={`/${lang}/about`} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft hover:shadow-md transition">
            <div className="text-sm font-semibold text-zinc-900">{t.nav.about}</div>
            <p className="mt-2 text-sm text-zinc-700">
              {lang === 'fr' ? "Approche, zones, méthode et standards de service." : "Approach, areas, method and service standards."}
            </p>
          </Link>

          <Link href={`/${lang}/contact`} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft hover:shadow-md transition">
            <div className="text-sm font-semibold text-zinc-900">{t.nav.contact}</div>
            <p className="mt-2 text-sm text-zinc-700">
              {lang === 'fr' ? "Décrivez votre projet — réponse rapide." : "Share your project — fast reply."}
            </p>
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="container py-14">
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{t.contact.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">{t.contact.lead}</p>

            <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft">
              <div className="text-sm font-semibold text-zinc-900">
                {lang === 'fr' ? "Coordonnées" : "Details"}
              </div>
              <div className="mt-3 text-sm text-zinc-700">
                {lang === 'fr'
                  ? "Email : contact@stephan-real-estate.com (à personnaliser)"
                  : "Email: contact@stephan-real-estate.com (customize)"}
              </div>
              <div className="mt-2 text-sm text-zinc-700">
                {lang === 'fr'
                  ? "Zone : Valbonne · Alpes-Maritimes"
                  : "Area: Valbonne · Alpes-Maritimes"}
              </div>
            </div>
          </div>

          <ContactForm t={t} />
        </div>
      </section>
    </main>
  );
}
