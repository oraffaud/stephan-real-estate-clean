import Link from 'next/link';

export default function SeoLandingPage({ page, lang }) {
  const contactHref = `/${lang}/contact`;
  const saleHref = `/${lang}/vente`;

  return (
    <main className="bg-[#f7f3ed]">
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C6A46C]">
            {page.kicker}
          </p>
          <h1 className="font-luxe text-4xl leading-tight text-zinc-950 md:text-6xl">
            {page.h1}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-zinc-700">
            {page.lead}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={contactHref} className="rounded-full bg-zinc-950 px-7 py-3 text-sm font-medium uppercase tracking-[0.14em] text-white">
              {page.cta}
            </Link>
            <Link href={saleHref} className="rounded-full border border-zinc-950 px-7 py-3 text-sm font-medium uppercase tracking-[0.14em] text-zinc-950">
              {lang === 'fr' ? 'Voir les biens' : 'View properties'}
            </Link>
          </div>
        </div>
      </section>

      <section className="container pb-16 md:pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {page.sections.map((section) => (
            <article key={section.heading} className="rounded-[28px] bg-white p-7 shadow-soft ring-1 ring-[var(--gold-light)]">
              <h2 className="text-xl font-semibold leading-tight text-zinc-950">
                {section.heading}
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-700">
                {section.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-5xl rounded-[28px] bg-white p-7 shadow-soft ring-1 ring-[var(--gold-light)]">
          <h2 className="text-lg font-semibold text-zinc-950">
            {lang === 'fr' ? 'Recherches associées' : 'Related searches'}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {page.keywords.map((keyword) => (
              <li key={keyword} className="rounded-full bg-[#f7f3ed] px-4 py-2 text-sm text-zinc-700">
                {keyword}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
