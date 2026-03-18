import { notFound } from 'next/navigation';
import { isLang } from '@/lib/i18n';

export default async function HomePage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <main className="min-h-screen bg-black">
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-pool.jpg"
            alt="French Riviera luxury"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/12" />
        </div>

        <div className="relative min-h-screen">
          <div className="px-6 pt-6 md:px-10 md:pt-8 bg-gradient-to-b from-black/40 to-transparent inline-block p-4 rounded-xl">
            <img
              src="/branding/logo-cotedazur.svg"
              alt="Côte d’Azur Agency"
              className="w-[260px] md:w-[340px]"
            />

            <p className="mt-3 text-[26px] font-semibold text-[#C6A46C] md:text-[34px]">
              Real Estate on the French Riviera
            </p>
          </div>

          <div className="absolute inset-x-0 top-[58%] text-center">
            <h1 className="font-luxe text-[54px] font-semibold leading-none text-[#C6A46C] md:text-[74px]">
              Coming soon
            </h1>
            <div className="mx-auto mt-2 h-[3px] w-[220px] bg-red-500 md:w-[300px]" />
          </div>

          <div className="absolute bottom-8 left-8 md:bottom-10 md:left-12">
            <div className="text-[22px] font-semibold leading-tight text-[#C6A46C] md:text-[28px]">
              <div>Contact:</div>
              <div>Stephan Morawski</div>
            </div>
            <a
              href="mailto:stephan@stephanwsk.com"
              className="mt-3 block text-base text-white/90 underline underline-offset-4"
            >
              stephan@stephanwsk.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
