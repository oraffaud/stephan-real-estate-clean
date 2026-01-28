'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function LanguageSwitcher({ lang, currentLang }) {
  const activeLang = lang ?? currentLang ?? 'fr'
  const pathname = usePathname() || '/'
  const other = activeLang === 'fr' ? 'en' : 'fr'
  const href = pathname.replace(/^\/(en|fr)(?=\/|$)/, `/${other}`)

  return (
    <Link
      className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-800 hover:border-zinc-400"
      aria-label="Switch language"
      href={href}
    >
      {other.toUpperCase()}
    </Link>
  )
}
