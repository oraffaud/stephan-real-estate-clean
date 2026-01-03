import Link from 'next/link';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function Header({ lang, t }) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href={`/${lang}`} className="font-semibold tracking-tight text-zinc-900">
          Stephan
          <span className="ml-2 text-sm font-medium text-zinc-500">Real Estate</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link className="text-zinc-700 hover:text-zinc-900" href={`/${lang}`}>{t.nav.home}</Link>
          <Link className="text-zinc-700 hover:text-zinc-900" href={`/${lang}/services`}>{t.nav.services}</Link>
          <Link className="text-zinc-700 hover:text-zinc-900" href={`/${lang}/about`}>{t.nav.about}</Link>
          <Link className="text-zinc-700 hover:text-zinc-900" href={`/${lang}/contact`}>{t.nav.contact}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={`/${lang}/contact`}
            className="hidden rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 md:inline-flex"
          >
            {t.nav.contact}
          </Link>
          <LanguageSwitcher lang={lang} />
        </div>
      </div>
    </header>
  );
}
