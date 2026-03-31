import Link from 'next/link';

export function Header({ lang, t }) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="container">
        <div className="flex min-h-[96px] items-center justify-between gap-4 py-4">
          <Link href={`/${lang}`} className="flex flex-col items-start">
            <img
              src="/branding/logo-full.png"
              alt="Côte d’Azur Agency"
              className="h-20 w-auto sm:h-24 md:h-28"
            />
            <span className="mt-2 text-[14px] font-semibold tracking-tight text-[#C6A46C] sm:text-[16px]">
              Real Estate on the French Riviera
            </span>
          </Link>

          <div className="flex shrink-0 gap-2 text-sm">
            <Link href="/fr" className="rounded-full border px-3 py-1.5">FR</Link>
            <Link href="/en" className="rounded-full border px-3 py-1.5">EN</Link>
          </div>
        </div>

        <nav className="flex gap-4 overflow-x-auto pb-3 text-sm text-zinc-800 md:hidden">
          <Link href={`/${lang}`} className="whitespace-nowrap">{t.nav.home}</Link>
          <Link href={`/${lang}/vente`} className="whitespace-nowrap">{t.nav.sale}</Link>
          <Link href={`/${lang}/services`} className="whitespace-nowrap">{t.nav.services}</Link>
          <Link href={`/${lang}/agence`} className="whitespace-nowrap">{t.nav.agency}</Link>
          <Link href={`/${lang}/contact`} className="whitespace-nowrap">{t.nav.contact}</Link>
        </nav>

        <nav className="hidden items-center justify-center gap-8 pb-4 text-sm text-zinc-800 md:flex">
          <Link href={`/${lang}`}>{t.nav.home}</Link>
          <Link href={`/${lang}/vente`}>{t.nav.sale}</Link>
          <Link href={`/${lang}/services`}>{t.nav.services}</Link>
          <Link href={`/${lang}/agence`}>{t.nav.agency}</Link>
          <Link href={`/${lang}/contact`}>{t.nav.contact}</Link>
        </nav>
      </div>
    </header>
  );
}
