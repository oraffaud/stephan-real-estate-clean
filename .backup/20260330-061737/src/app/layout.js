import { Playfair_Display } from "next/font/google";

const luxe = Playfair_Display({ subsets: ["latin"], variable: "--font-luxe", display: "swap" });

import './globals.css';

export const metadata = {
  title: {
    default: 'Stephan Real Estate',
    template: '%s · Stephan Real Estate',
  },
  description: 'Independent real estate agent — Valbonne & exceptional properties in the Alpes-Maritimes.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
