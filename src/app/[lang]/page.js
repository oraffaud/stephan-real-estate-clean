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
      {/* HERO */}
      <section className="relative min-h-[82vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-pool.jpg"
            alt="French Riviera luxury"
            className="h-full w-full object-cover"
          />
          {/* Premium overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),rgba(0,0,0,0)_55%)]" />
        </div>

        <div className="relative">
          <div className="container py-16 md:py-24">
            <div className="grid gap-10 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white ring-1 ring-white/20 backdrop-blur">
                  {lang === 'fr'
                    ? 'Valbonne · Alpes-Maritimes · Service bilingue (FR/EN)'
                    : 'Valbonne · Alpes-Maritimes · Bilingual service (EN/FR)'}
                </div>

                <h1 className="fade-up" className="mt-6 text-4xl font-semibold font-luxe tracking-tight text-white md:text-6xl">
                  {t.home.heroTitle}
                </h1>

                <p className="mt-5 fade-up max-w-2xl text-base leading-relaxed text-white/85">
                  {t.home.heroLead}
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    href={`/${lang}/services`}
                    className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-zinc-900 hover:bg-white/90"
                  >
                    {t.home.ctaPrimary}
                  </Link>

                  <Link
                    href={`/${lang}/contact`}
                    className="rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-medium text-white hover:bg-white/20 backdrop-blur"
                  >
                    {t.home.ctaSecondary}
                  </Link>
                </div>

                {/* Small trust line */}
                <div className="mt-10 grid gap-3 text-xs text-white/80 md:grid-cols-3">
                  <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
                    <div className="font-semibold text-white">
                      {lang === 'fr' ? 'Discrétion' : 'Discretion'}
                    </div>
                    <div className="mt-1">
                      {lang === 'fr' ? 'Un accompagnement boutique.' : 'A boutique-level experience.'}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
                    <div className="font-semibold text-white">
                      {lang === 'fr' ? 'Clarté' : 'Clarity'}
                    </div>
                    <div className="mt-1">
                      {lang === 'fr' ? 'Méthode & suivi transparents.' : 'Method and clear follow-up.'}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
                    <div className="font-semibold text-white">
                      {lang === 'fr' ? 'International' : 'International'}
                    </div>
                    <div className="mt-1">
                      {lang === 'fr' ? 'FR/EN — clients internationaux.' : 'EN/FR — global clients.'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Glass card */}
              <div className="md:col-span-4">
                <div className="rounded-3xl bg-white/10 p-6 text-white ring-1 ring-white/20 shadow-soft backdrop-blur">
                  <div className="text-xs font-semibold uppercase tracking-wide text-white/80">
                    {lang === 'fr' ? 'Valbonne · Côte d’Azur' : 'Valbonne · French Riviera'}
                  </div>
                  <div className="mt-2 text-lg font-semibold">{t.brand.tagline}</div>
                  <p className="mt-3 text-sm text-white/85">
                    {lang === 'fr'
                      ? 'Un service premium, discret et international.'
                      : 'A premium, discreet, international service.'}
                  </p>

                  <div className="mt-5 rounded-2xl bg-black/20 p-4 ring-1 ring-white/10">
                    <div className="text-xs text-white/75">
                      {lang === 'fr' ? 'Email' : 'Email'}
                    </div>
                    <a className="mt-1 block text-sm font-semibold text-white hover:underline" href="mailto:stephan@stephanwsk.com">
                      stephan@stephanwsk.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* subtle bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white" />
        </div>
      </section>

      {/* Social proof */}
      <section className="container py-14">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
              {lang === 'fr' ? 'Clients internationaux' : 'International clients'}
            </div>
            <div className="mt-2 text-sm text-zinc-800">
              {lang === 'fr'
                ? 'Bilingue FR/EN · coordination à distance · process fluide.'
                : 'Bilingual EN/FR · remote coordination · smooth process.'}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
              {lang === 'fr' ? 'Réseau' : 'Network'}
            </div>
            <div className="mt-2 text-sm text-zinc-800">
              {lang === 'fr'
                ? 'Notaires · architectes · diagnostiqueurs · partenaires locaux.'
                : 'Notaries · architects · surveyors · trusted local partners.'}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft">
            <div className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
              {lang === 'fr' ? 'Exigence' : 'Standards'}
            </div>
            <div className="mt-2 text-sm text-zinc-800">
              {lang === 'fr'
                ? 'Communication claire · rythme maîtrisé · discrétion.'
                : 'Clear communication · controlled pace · discretion.'}
            </div>
          </div>
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
                {lang === 'fr' ? 'Coordonnées' : 'Details'}
              </div>
              <div className="mt-3 text-sm text-zinc-700">
                Email : <a className="font-medium hover:underline" href="mailto:stephan@stephanwsk.com">stephan@stephanwsk.com</a>
              </div>
              <div className="mt-2 text-sm text-zinc-700">
                {lang === 'fr' ? 'Zone : Valbonne · Alpes-Maritimes' : 'Area: Valbonne · Alpes-Maritimes'}
              </div>
            </div>
          </div>

          <ContactForm t={t} />
        </div>
      </section>
    </main>
  );
}
