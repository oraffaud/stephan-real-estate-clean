import Link from 'next/link';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function Header({ lang, t }) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-transparent/80 backdrop-blur absolute inset-x-0 top-0 z-50">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href={`/${lang}`} className="font-semibold tracking-tight text-white">
          Stephan
          <span className="ml-2 text-sm font-medium text-zinc-500">Real Estate</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link className="text-zinc-700 hover:text-white" href={`/${lang}`}>{t.nav.home}</Link>
          <Link className="text-zinc-700 hover:text-white" href={`/${lang}/services`}>{t.nav.services}</Link>
          <Link className="text-zinc-700 hover:text-white" href={`/${lang}/about`}>{t.nav.about}</Link>
          <Link className="text-zinc-700 hover:text-white" href={`/${lang}/contact`}>{t.nav.contact}</Link>
        <a className="text-zinc-700 hover:text-white" href={`/${lang}/legal#honoraires`}>{lang === "fr" ? "Honoraires" : "Fees"}</a>
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
