#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="${HOME}/Downloads/stephan-real-estate-next/stephan-real-estate-clean"
cd "$PROJECT_DIR"

echo "== Backup =="
STAMP="$(date +%Y%m%d-%H%M%S)"
mkdir -p ".backup/$STAMP"
cp -R src ".backup/$STAMP/src" 2>/dev/null || true
cp -R public ".backup/$STAMP/public" 2>/dev/null || true
cp middleware.js ".backup/$STAMP/" 2>/dev/null || true

echo "== Clean target pages =="
rm -rf "src/app/[lang]/services" \
       "src/app/[lang]/agence" \
       "src/app/[lang]/contact" \
       "src/app/[lang]/vente" \
       "src/app/[lang]/mentions-legales"

mkdir -p "src/app/[lang]/services"
mkdir -p "src/app/[lang]/agence"
mkdir -p "src/app/[lang]/contact"
mkdir -p "src/app/[lang]/vente/[slug]"
mkdir -p "src/app/[lang]/mentions-legales"
mkdir -p "src/app/api/contact"
mkdir -p "src/lib/dictionaries"
mkdir -p "src/components"

echo "== Dictionaries =="
cat > src/lib/dictionaries/fr.json <<'EOF'
{
  "siteName": "Côte d’Azur Agency",
  "nav": {
    "home": "Accueil",
    "sale": "Vente",
    "services": "Services",
    "agency": "L’agence",
    "contact": "Contact",
    "legal": "Mentions légales"
  },
  "home": {
    "heroTitle": "Démarrer votre projet d’exception",
    "heroLead": "Real Estate on the French Riviera",
    "ctaPrimary": "Prendre contact",
    "ctaSecondary": "Voir les mandats",
    "introTitle": "L’excellence commence par une rencontre",
    "introText": "Sur la Côte d’Azur, chaque propriété raconte une histoire. La vôtre mérite une attention unique."
  },
  "sale": {
    "title": "Vente",
    "lead": "Une sélection de mandats d’exception sur la Côte d’Azur.",
    "empty": "Aucun mandat disponible pour le moment."
  },
  "services": {
    "title": "Services",
    "lead": "Un accompagnement premium, discret et bilingue.",
    "items": [
      "Vente",
      "Accompagnement achat villa",
      "Chasseur immobilier Côte d’Azur",
      "Estimation"
    ]
  },
  "agency": {
    "title": "L’agence",
    "lead": "Founder · Expertise · Honoraires",
    "body": "Chez Côte d’Azur Agency, nous ne nous contentons pas d’accompagner des transactions, nous créons des expériences immobilières d’exception, où confiance, discrétion et excellence se rencontrent."
  },
  "contact": {
    "title": "Contact",
    "lead": "Parlez-nous de votre projet.",
    "name": "Nom",
    "email": "Email",
    "phone": "Téléphone",
    "message": "Message",
    "submit": "Envoyer",
    "sending": "Envoi...",
    "success": "Merci. Votre message a bien été envoyé.",
    "error": "Une erreur est survenue. Veuillez réessayer."
  },
  "legal": {
    "title": "Mentions légales"
  }
}
EOF

cat > src/lib/dictionaries/en.json <<'EOF'
{
  "siteName": "Côte d’Azur Agency",
  "nav": {
    "home": "Home",
    "sale": "Sale",
    "services": "Services",
    "agency": "Agency",
    "contact": "Contact",
    "legal": "Legal notice"
  },
  "home": {
    "heroTitle": "Start your exceptional property journey",
    "heroLead": "Real Estate on the French Riviera",
    "ctaPrimary": "Get in touch",
    "ctaSecondary": "View listings",
    "introTitle": "Excellence starts with a meeting",
    "introText": "On the French Riviera, every property tells a story. Yours deserves singular attention."
  },
  "sale": {
    "title": "Sale",
    "lead": "A curated selection of exceptional listings on the French Riviera.",
    "empty": "No listings available at the moment."
  },
  "services": {
    "title": "Services",
    "lead": "Premium, discreet and bilingual advisory.",
    "items": [
      "Sales advisory",
      "Villa buying support",
      "French Riviera property finder",
      "Valuation"
    ]
  },
  "agency": {
    "title": "The Agency",
    "lead": "Founder · Expertise · Fees",
    "body": "At Côte d’Azur Agency, we do more than support transactions. We craft exceptional real estate experiences where trust, discretion and excellence meet."
  },
  "contact": {
    "title": "Contact",
    "lead": "Tell us about your project.",
    "name": "Name",
    "email": "Email",
    "phone": "Phone",
    "message": "Message",
    "submit": "Send",
    "sending": "Sending...",
    "success": "Thank you. Your message has been sent.",
    "error": "An error occurred. Please try again."
  },
  "legal": {
    "title": "Legal notice"
  }
}
EOF

cat > src/lib/i18n.js <<'EOF'
import fr from '@/lib/dictionaries/fr.json';
import en from '@/lib/dictionaries/en.json';

export const LANGS = ['fr', 'en'];

export function isLang(value) {
  return typeof value === 'string' && LANGS.includes(value);
}

export async function getDict(lang) {
  return lang === 'en' ? en : fr;
}
EOF

echo "== Basic SEO helper =="
cat > src/lib/seo.js <<'EOF'
export function buildPageMetadata({ title, description, lang, pathname }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cotedazuragency.com';
  const url = `${baseUrl}${pathname}`;
  const alt = lang === 'fr' ? 'en' : 'fr';
  const altUrl = `${baseUrl}/${alt}${pathname.replace(/^\/(fr|en)/, '')}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: lang === 'fr' ? url : altUrl,
        en: lang === 'en' ? url : altUrl,
        'x-default': `${baseUrl}/fr`
      }
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website'
    }
  };
}
EOF

echo "== Styles =="
cat > src/app/globals.css <<'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --gold: #C6A46C;
  --gold-light: #E8D9C5;
  --sand: #F5F2ED;
  --dark: #111111;
}

html { scroll-behavior: smooth; }
body { background: var(--sand); color: var(--dark); }

.container { @apply mx-auto max-w-7xl px-5 sm:px-6 lg:px-8; }
.font-luxe { font-family: var(--font-luxe), Georgia, "Times New Roman", serif; }
.text-gold { color: var(--gold); }
.shadow-soft { box-shadow: 0 12px 40px rgba(0,0,0,.08); }
.card-luxe { @apply rounded-[24px] border bg-white shadow-soft; border-color: var(--gold-light); }
.btn-dark { @apply inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white bg-black transition hover:bg-zinc-800; }
.btn-gold { @apply inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white transition; background: var(--gold); }
.btn-gold:hover { background: #b79257; }
input, textarea { @apply w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm; }
EOF

echo "== Components =="
cat > src/components/Header.js <<'EOF'
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
EOF

cat > src/components/Footer.js <<'EOF'
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
EOF

cat > src/components/ContactForm.js <<'EOF'
'use client';

import { useState } from 'react';

export function ContactForm({ t }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function onSubmit() {
    if (!form.name || !form.email || !form.message) {
      setFeedback(t.contact.error);
      return;
    }

    setLoading(true);
    setFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Request failed');
      setFeedback(t.contact.success);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setFeedback(t.contact.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-4">
      <div>
        <label className="mb-2 block text-sm font-medium">{t.contact.name}</label>
        <input name="name" value={form.name} onChange={onChange} />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">{t.contact.email}</label>
        <input type="email" name="email" value={form.email} onChange={onChange} />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">{t.contact.phone}</label>
        <input name="phone" value={form.phone} onChange={onChange} />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">{t.contact.message}</label>
        <textarea rows="5" name="message" value={form.message} onChange={onChange} />
      </div>
      <button type="button" onClick={onSubmit} disabled={loading} className="btn-dark">
        {loading ? t.contact.sending : t.contact.submit}
      </button>
      {feedback ? <p className="text-sm">{feedback}</p> : null}
    </div>
  );
}
EOF

echo "== Layouts =="
cat > src/app/layout.js <<'EOF'
import './globals.css';
import { Playfair_Display } from 'next/font/google';

const luxe = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-luxe',
  display: 'swap'
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cotedazuragency.com'),
  title: 'Côte d’Azur Agency',
  description: 'Real Estate on the French Riviera'
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={luxe.variable}>
      <body>{children}</body>
    </html>
  );
}
EOF

cat > "src/app/[lang]/layout.js" <<'EOF'
import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <>
      <Header lang={lang} t={t} />
      {children}
      <Footer lang={lang} t={t} />
    </>
  );
}
EOF

echo "== Pages =="
cat > "src/app/[lang]/page.js" <<'EOF'
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const title = lang === 'en' ? 'Home | Côte d’Azur Agency' : 'Accueil | Côte d’Azur Agency';
  const description = lang === 'en'
    ? 'Luxury real estate on the French Riviera.'
    : 'Immobilier de prestige sur la Côte d’Azur.';
  return buildPageMetadata({ title, description, lang, pathname: `/${lang}` });
}

export default async function HomePage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <main>
      <section className="relative overflow-hidden bg-black text-white">
        <img src="/images/hero-pool.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative container py-24 md:py-36">
          <div className="max-w-3xl">
            <p className="text-gold text-sm uppercase tracking-[0.25em]">{t.home.heroLead}</p>
            <h1 className="mt-6 font-luxe text-5xl md:text-7xl">{t.home.heroTitle}</h1>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={`/${lang}/contact`} className="btn-gold">{t.home.ctaPrimary}</Link>
              <Link href={`/${lang}/vente`} className="btn-dark">{t.home.ctaSecondary}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="card-luxe p-8">
          <h2 className="font-luxe text-3xl">{t.home.introTitle}</h2>
          <p className="mt-4 text-zinc-700">{t.home.introText}</p>
        </div>
      </section>
    </main>
  );
}
EOF

cat > "src/app/[lang]/vente/page.js" <<'EOF'
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

async function getMandatsFallback(lang) {
  return lang === 'fr'
    ? [
        { slug: 'vence-vue-mer', title: 'Vence : Élégante propriété avec vue mer panoramique' },
        { slug: 'tourrettes-bergerie', title: 'Tourrettes-sur-Loup : Bergerie rénovée avec vue mer panoramique' }
      ]
    : [
        { slug: 'vence-vue-mer', title: 'Vence: Elegant property with panoramic sea views' },
        { slug: 'tourrettes-bergerie', title: 'Tourrettes-sur-Loup: Renovated former sheepfold with panoramic sea view' }
      ];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const title = lang === 'en' ? 'Sale | Côte d’Azur Agency' : 'Vente | Côte d’Azur Agency';
  const description = lang === 'en'
    ? 'Listings and mandates on the French Riviera.'
    : 'Mandats et biens sur la Côte d’Azur.';
  return buildPageMetadata({ title, description, lang, pathname: `/${lang}/vente` });
}

export default async function VentePage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);
  const mandats = await getMandatsFallback(lang);

  return (
    <main className="container py-16">
      <h1 className="font-luxe text-4xl">{t.sale.title}</h1>
      <p className="mt-3 text-zinc-700">{t.sale.lead}</p>

      <div className="mt-8 grid gap-4">
        {mandats.length === 0 ? (
          <div className="card-luxe p-6">{t.sale.empty}</div>
        ) : mandats.map((m) => (
          <Link key={m.slug} href={`/${lang}/vente/${m.slug}`} className="card-luxe p-6 hover:bg-zinc-50">
            {m.title}
          </Link>
        ))}
      </div>
    </main>
  );
}
EOF

cat > "src/app/[lang]/vente/[slug]/page.js" <<'EOF'
import { notFound } from 'next/navigation';
import { isLang } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  return buildPageMetadata({
    title: `${slug} | Côte d’Azur Agency`,
    description: slug,
    lang,
    pathname: `/${lang}/vente/${slug}`
  });
}

export default async function VenteDetailPage({ params }) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();

  return (
    <main className="container py-16">
      <div className="card-luxe p-8">
        <h1 className="font-luxe text-4xl">{slug}</h1>
        <p className="mt-4 text-zinc-700">Données APIMO à raccorder ici.</p>
      </div>
    </main>
  );
}
EOF

cat > "src/app/[lang]/services/page.js" <<'EOF'
import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const title = 'Services | Côte d’Azur Agency';
  const description = lang === 'en'
    ? 'Sales advisory, villa buying support, property finder and valuation.'
    : 'Vente, accompagnement achat villa, chasseur immobilier et estimation.';
  return buildPageMetadata({ title, description, lang, pathname: `/${lang}/services` });
}

export default async function ServicesPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <main className="container py-16">
      <h1 className="font-luxe text-4xl">{t.services.title}</h1>
      <p className="mt-3 text-zinc-700">{t.services.lead}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {t.services.items.map((item) => (
          <div key={item} className="card-luxe p-6">{item}</div>
        ))}
      </div>
    </main>
  );
}
EOF

cat > "src/app/[lang]/agence/page.js" <<'EOF'
import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const title = lang === 'en' ? 'Agency | Côte d’Azur Agency' : 'L’agence | Côte d’Azur Agency';
  const description = lang === 'en' ? 'Founder, expertise and fees.' : 'Founder, expertise, honoraires.';
  return buildPageMetadata({ title, description, lang, pathname: `/${lang}/agence` });
}

export default async function AgencePage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <main className="container py-16">
      <h1 className="font-luxe text-4xl">{t.agency.title}</h1>
      <p className="mt-3 text-zinc-700">{t.agency.lead}</p>
      <div className="mt-8 card-luxe p-8">
        <p className="text-zinc-700">{t.agency.body}</p>
      </div>
    </main>
  );
}
EOF

cat > "src/app/[lang]/contact/page.js" <<'EOF'
import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import { ContactForm } from '@/components/ContactForm';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const title = 'Contact | Côte d’Azur Agency';
  const description = lang === 'en' ? 'Contact Côte d’Azur Agency.' : 'Contactez Côte d’Azur Agency.';
  return buildPageMetadata({ title, description, lang, pathname: `/${lang}/contact` });
}

export default async function ContactPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <main className="container py-16">
      <h1 className="font-luxe text-4xl">{t.contact.title}</h1>
      <p className="mt-3 text-zinc-700">{t.contact.lead}</p>
      <div className="mt-8 max-w-2xl card-luxe p-8">
        <ContactForm t={t} />
      </div>
    </main>
  );
}
EOF

cat > "src/app/[lang]/mentions-legales/page.js" <<'EOF'
import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = await getDict(lang);
  return buildPageMetadata({
    title: `${t.legal.title} | Côte d’Azur Agency`,
    description: t.legal.title,
    lang,
    pathname: `/${lang}/mentions-legales`
  });
}

export default async function LegalPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <main className="container py-16">
      <h1 className="font-luxe text-4xl">{t.legal.title}</h1>
      <div className="mt-8 card-luxe p-8 text-zinc-700">
        À compléter avec les mentions légales définitives.
      </div>
    </main>
  );
}
EOF

echo "== API and middleware =="
cat > "src/app/api/contact/route.js" <<'EOF'
export async function POST(req) {
  try {
    const body = await req.json();
    const name = String(body?.name || '').trim();
    const email = String(body?.email || '').trim();
    const message = String(body?.message || '').trim();

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log('CONTACT_FORM', { ...body, at: new Date().toISOString() });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
EOF

cat > middleware.js <<'EOF'
import { NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === '/fr' || pathname.startsWith('/fr/')) return NextResponse.next();
  if (pathname === '/en' || pathname.startsWith('/en/')) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/fr${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api).*)']
};
EOF

cat > .env.local.example <<'EOF'
NEXT_PUBLIC_SITE_URL=https://www.cotedazuragency.com
APIMO_PROVIDER_CODE=4618
APIMO_API_KEY=replace_me
APIMO_AGENCY_CODE=25799
APIMO_BASE_URL=replace_me
EOF

echo "== Done =="
printf '\n✅ Phase 1 scaffold written.\n'
