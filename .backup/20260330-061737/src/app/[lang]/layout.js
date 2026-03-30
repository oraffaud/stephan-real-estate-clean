import { notFound } from 'next/navigation';
import { isLang } from '@/lib/i18n';

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return children;
}
