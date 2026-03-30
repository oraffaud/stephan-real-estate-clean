import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { ContactForm } from '@/components/ContactForm';

export default async function HomePage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Background */}
      <img
        src="/images/hero-pool.jpg"
        alt="Luxury villa"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/10" />

      {/* LOGO + TITLE */}
      <div className="absolute left-5 top-5 z-20 sm:left-8 sm:top-8 md:left-12 md:top-10">
        <img
          src="/branding/logo-full.png"
          alt="Côte d’Azur Agency"
          className="w-[220px] sm:w-[280px] md:w-[420px]"
        />

        <h2 className="mt-2 text-[18px] font-semibold leading-snug text-[#C6A46C] sm:mt-3 sm:text-[22px] md:mt-4 md:text-[32px]">
          Real Estate on the French Riviera
        </h2>
      </div>

      {/* CENTER TEXT */}
      <div className="absolute inset-x-0 top-[48%] z-10 -translate-y-1/2 px-4 text-center sm:top-1/2">
        <h1 className="font-luxe text-[42px] font-semibold leading-none text-[#C6A46C] sm:text-[58px] md:text-[80px]">
          Coming soon
        </h1>
      </div>

      {/* CONTACT BLOCK */}
      <div className="absolute bottom-5 left-5 z-20 w-[calc(100%-2.5rem)] max-w-[360px] sm:bottom-8 sm:left-8 sm:w-[340px] md:bottom-10 md:left-12 md:w-[360px]">
        <div className="mb-3 text-[18px] font-semibold leading-tight text-[#C6A46C] sm:text-[20px] md:text-[22px]">
          Contact:
          <br />
          Stephan Morawski
        </div>

        <div className="rounded-2xl bg-white/82 p-4 backdrop-blur-md shadow-xl md:p-4">
          <ContactForm t={t} />
        </div>
      </div>
    </main>
  );
}
