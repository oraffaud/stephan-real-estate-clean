import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { ContactForm } from '@/components/ContactForm';

export default async function ContactPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <main>
      <section className="container py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              {lang === 'fr' ? 'Contact' : 'Contact'}
            </div>
            <h1 className="mt-4 font-luxe text-5xl text-zinc-900">{t.contact.title}</h1>
            <p className="mt-5 text-sm leading-relaxed text-zinc-700">{t.contact.lead}</p>

            <div className="mt-8 card-luxe p-8">
              <div className="text-sm font-semibold text-zinc-900">
                {lang === 'fr' ? 'Coordonnées' : 'Details'}
              </div>
              <div className="mt-4 text-sm text-zinc-700">
                Email : <a className="font-medium hover:underline" href="mailto:stephan@cotedazuragency.com">stephan@cotedazuragency.com</a>
              </div>
              <div className="mt-2 text-sm text-zinc-700">
                {lang === 'fr' ? 'Zone : Valbonne · Alpes-Maritimes' : 'Area: Valbonne · Alpes-Maritimes'}
              </div>
            </div>
          </div>

          <div className="md:col-span-7 card-luxe p-8">
            <ContactForm t={t} />
          </div>
        </div>
      </section>
    </main>
  );
}
