import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }];
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <div className="min-h-screen">
      <Header lang={lang} t={t} />
      {children}
      <Footer t={t} />
    </div>
  );
}
