import Link from 'next/link';

export function Footer({ lang, t }) {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="container py-10 text-sm text-zinc-700">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>Côte d’Azur Agency</div>
          <div className="flex gap-4">
            <Link href={`/${lang}/mentions-legales`}>{t.nav.legal}</Link>
            <Link href={`/${lang}/contact`}>{t.nav.contact}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
