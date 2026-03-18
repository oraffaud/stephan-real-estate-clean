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

      {/* Overlay léger */}
      <div className="absolute inset-0 bg-black/10" />

      {/* LOGO + TITRE */}
      <div className="absolute top-10 left-10 z-20 max-w-[600px]">
        <img
          src="/branding/logo-full.png"
          alt="Côte d’Azur Agency"
          className="w-[380px]"
        />

        <h2 className="mt-4 text-[34px] font-semibold text-[#C6A46C]">
          Real Estate on the French Riviera
        </h2>
      </div>

      {/* COMING SOON CENTRE */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center">
          <h1 className="text-[80px] font-semibold text-[#C6A46C]">
            Coming soon
          </h1>
          <div className="mx-auto mt-4 h-[3px] w-[260px] bg-red-500" />
        </div>
      </div>

      {/* FORMULAIRE BAS GAUCHE */}
      <div className="absolute bottom-10 left-10 z-20 w-[420px]">

        <div className="mb-4 text-[26px] font-semibold text-[#C6A46C]">
          Contact:
          <br />
          Stephan Morawski
        </div>

        <div className="rounded-2xl bg-white/90 p-5 backdrop-blur shadow-xl">
          <ContactForm t={t} />
        </div>

      </div>

    </main>
  );
}
