'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LanguageSwitcher({ currentLang }) {
  const pathname = usePathname() || `/${currentLang}`;
  const target = currentLang === 'en' ? 'fr' : 'en';

  // Replace first path segment with target lang.
  const parts = pathname.split('/');
  if (parts.length > 1) parts[1] = target;
  const href = parts.join('/') || `/${target}`;

  return (
    <Link
      href={href}
      className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-800 hover:border-zinc-400"
      aria-label="Switch language"
    >
      {target.toUpperCase()}
    </Link>
  );
}
