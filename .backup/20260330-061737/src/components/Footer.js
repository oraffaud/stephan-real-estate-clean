import Link from 'next/link';

export function Footer({ lang, t }) {
  return (
    <footer className="border-t border-gold-light bg-white">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="font-luxe text-2xl text-zinc-900">Stephan</div>
            <div className="mt-2 text-sm text-zinc-600">Valbonne · French Riviera</div>
            <div className="mt-4 text-sm text-zinc-700">
              
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-zinc-900">{lang === 'fr' ? 'Navigation' : 'Navigation'}</div>
            <div className="mt-3 grid gap-2 text-sm text-zinc-700">
              <Link href={`/${lang || 'fr'}`}>{t.nav.home}</Link>
              <Link href={`/${lang || 'fr'}/services`}>{t.nav.services}</Link>
              <Link href={`/${lang || 'fr'}/about`}>{t.nav.about}</Link>
              <Link href={`/${lang || 'fr'}/contact`}>{t.nav.contact}</Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-zinc-900">{lang === 'fr' ? 'Positionnement' : 'Positioning'}</div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">
              {lang === 'fr'
                ? "Immobilier résidentiel haut de gamme, accompagnement sur mesure, clientèle internationale."
                : "High-end residential real estate, tailored advisory, international clientele."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
