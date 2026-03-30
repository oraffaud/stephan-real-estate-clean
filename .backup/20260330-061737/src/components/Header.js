import Link from 'next/link';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function Header({ lang, t }) {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="container flex h-20 items-center justify-between">
        <Link href={`/${lang || 'fr'}`} className="text-white">
          <div className="font-luxe text-3xl leading-none">Stephan</div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.35em] text-white/80">
            Real Estate
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link className="text-sm text-white/90 hover:text-white" href={`/${lang || 'fr'}`}>{t.nav.home}</Link>
          <Link className="text-sm text-white/90 hover:text-white" href={`/${lang || 'fr'}/services`}>{t.nav.services}</Link>
          <Link className="text-sm text-white/90 hover:text-white" href={`/${lang || 'fr'}/about`}>{t.nav.about}</Link>
          <Link className="text-sm text-white/90 hover:text-white" href={`/${lang || 'fr'}/contact`}>{t.nav.contact}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href={`/${lang || 'fr'}/contact`} className="hidden rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur md:inline-flex">
            {t.nav.contact}
          </Link>
          <LanguageSwitcher lang={lang} />
        </div>
      </div>
    </header>
  );
}
