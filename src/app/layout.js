import { Analytics } from '@vercel/analytics/next';
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
      <body>{children}        <Analytics />
      </body>
    </html>
  );
}
