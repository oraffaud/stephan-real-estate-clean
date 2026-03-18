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
      <div className="absolute top-10 left-12 z-20">
        <img
          src="/branding/logo-full.png"
          alt="Côte d’Azur Agency"
          className="w-[420px]"
        />

        <h2 className="mt-4 text-[32px] font-semibold text-[#C6A46C]">
          Real Estate on the French Riviera
        </h2>
      </div>

      {/* CENTER TEXT */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center">
          <h1 className="text-[80px] font-semibold text-[#C6A46C]">
            Coming soon
          </h1>
          <div className="mx-auto mt-4 h-[3px] w-[260px] bg-red-500" />
        </div>
      </div>

      {/* CONTACT BLOCK */}
      <div className="absolute bottom-10 left-12 z-20 w-[360px]">

        <div className="mb-3 text-[22px] font-semibold text-[#C6A46C]">
          Contact:
          <br />
          Stephan Morawski
        </div>

        <div className="rounded-2xl bg-white/80 p-4 backdrop-blur-md shadow-xl">
          <ContactForm t={t} />
        </div>

      </div>

    </main>
  );
}
