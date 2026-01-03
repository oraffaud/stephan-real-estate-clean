import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { ContactForm } from '@/components/ContactForm';

export default async function ContactPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <main>
      <section className="container py-14">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{t.contact.title}</h1>
            <p className="mt-4 text-sm leading-relaxed text-zinc-700">{t.contact.lead}</p>

            <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft">
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
