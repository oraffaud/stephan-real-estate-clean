import Link from 'next/link';

export function Header({ lang, t }) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="container py-5">
        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-[280px_1fr_auto] md:items-center md:gap-8">
          <Link href={`/${lang}`} className="block justify-self-start">
            <div className="flex flex-col items-center text-center">
              <img
                src="/branding/logo-full.png"
                alt="Côte d’Azur Agency"
                className="w-[170px] h-auto"
              />
              <span className="mt-3 text-[13px] font-semibold leading-none text-[#C6A46C]">
                Real Estate on the French Riviera
              </span>
            </div>
          </Link>

          <nav className="flex items-center justify-center gap-8 text-sm text-zinc-800">
            <Link href={`/${lang}`}>{t.nav.home}</Link>
            <Link href={`/${lang}/vente`}>{t.nav.sale}</Link>
            <Link href={`/${lang}/services`}>{t.nav.services}</Link>
            <Link href={`/${lang}/agence`}>{t.nav.agency}</Link>
            <Link href={`/${lang}/contact`}>{t.nav.contact}</Link>
          </nav>

          <div className="flex shrink-0 gap-2 text-sm">
            <Link href="/fr" className="rounded-full border px-3 py-1.5">FR</Link>
            <Link href="/en" className="rounded-full border px-3 py-1.5">EN</Link>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="flex items-start justify-between gap-4">
            <Link href={`/${lang}`} className="block">
              <div className="flex flex-col items-center text-center">
                <img
                  src="/branding/logo-full.png"
                  alt="Côte d’Azur Agency"
                  className="w-[150px] h-auto"
                />
                <span className="mt-2 text-[12px] font-semibold leading-none text-[#C6A46C]">
                  Real Estate on the French Riviera
                </span>
              </div>
            </Link>

            <div className="flex shrink-0 gap-2 text-sm">
              <Link href="/fr" className="rounded-full border px-3 py-1.5">FR</Link>
              <Link href="/en" className="rounded-full border px-3 py-1.5">EN</Link>
            </div>
          </div>

          <nav className="mt-4 flex gap-4 overflow-x-auto pb-1 text-sm text-zinc-800">
            <Link href={`/${lang}`} className="whitespace-nowrap">{t.nav.home}</Link>
            <Link href={`/${lang}/vente`} className="whitespace-nowrap">{t.nav.sale}</Link>
            <Link href={`/${lang}/services`} className="whitespace-nowrap">{t.nav.services}</Link>
            <Link href={`/${lang}/agence`} className="whitespace-nowrap">{t.nav.agency}</Link>
            <Link href={`/${lang}/contact`} className="whitespace-nowrap">{t.nav.contact}</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
