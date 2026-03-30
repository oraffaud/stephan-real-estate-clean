import Link from 'next/link';

export function Header({ lang, t }) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="container flex h-20 items-center justify-between">
        <Link href={`/${lang}`} className="font-luxe text-2xl text-zinc-900">
          Côte d’Azur Agency
        </Link>
        <nav className="hidden gap-6 md:flex text-sm text-zinc-800">
          <Link href={`/${lang}`}>{t.nav.home}</Link>
          <Link href={`/${lang}/vente`}>{t.nav.sale}</Link>
          <Link href={`/${lang}/services`}>{t.nav.services}</Link>
          <Link href={`/${lang}/agence`}>{t.nav.agency}</Link>
          <Link href={`/${lang}/contact`}>{t.nav.contact}</Link>
        </nav>
        <div className="flex gap-2 text-sm">
          <Link href="/fr" className="rounded-full border px-3 py-1.5">FR</Link>
          <Link href="/en" className="rounded-full border px-3 py-1.5">EN</Link>
        </div>
      </div>
    </header>
  );
}
