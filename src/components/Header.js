import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header({ lang, t }) {
  return (
    <header className="border-b border-zinc-200/70 bg-white/70 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <Link href={`/${lang}`} className="group flex items-baseline gap-2">
          <span className="text-base font-semibold tracking-tight">{t.brand.name}</span>
          <span className="hidden text-xs text-zinc-500 md:inline">{t.brand.tagline}</span>
        </Link>

        <nav className="flex items-center gap-5">
          <Link className="text-sm text-zinc-700 hover:text-zinc-900" href={`/${lang}`}>{t.nav.home}</Link>
          <Link className="text-sm text-zinc-700 hover:text-zinc-900" href={`/${lang}/properties`}>{t.nav.properties}</Link>
          <Link className="text-sm text-zinc-700 hover:text-zinc-900" href={`/${lang}#contact`}>{t.nav.contact}</Link>
          <LanguageSwitcher currentLang={lang} />
        </nav>
      </div>
    </header>
  );
}
