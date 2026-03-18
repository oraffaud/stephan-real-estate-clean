import { notFound } from 'next/navigation';
import { isLang, getDict } from '@/lib/i18n';
import { ContactForm } from '@/components/ContactForm';

export default async function HomePage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  return (
    <main className="min-h-screen bg-black">
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-pool.jpg"
            alt="French Riviera luxury"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="relative min-h-screen">
          <div className="absolute left-6 top-6 z-20 md:left-8 md:top-8">
            <img
              src="/branding/logo-full.png"
              alt="Côte d’Azur Agency"
              className="w-[300px] md:w-[420px]"
            />
            <p className="mt-3 text-[24px] font-semibold leading-tight text-[#C6A46C] md:text-[34px]">
              Real Estate on the French Riviera
            </p>
          </div>

          <div className="absolute inset-x-0 top-[64%] z-20 -translate-y-1/2 text-center">
            <h1 className="font-luxe text-[56px] font-semibold leading-none text-[#C6A46C] md:text-[82px]">
              Coming soon
            </h1>
            <div className="mx-auto mt-3 h-[3px] w-[220px] bg-red-500 md:w-[320px]" />
          </div>

          <div className="absolute bottom-8 left-8 z-20 w-[min(520px,calc(100%-4rem))] md:bottom-10 md:left-12">
            <div className="mb-5 text-[24px] font-semibold leading-tight text-[#C6A46C] md:text-[32px]">
              <div>Contact:</div>
              <div>Stephan Morawski</div>
            </div>

            <div className="rounded-3xl bg-white/88 p-6 shadow-soft backdrop-blur">
              <ContactForm t={t} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
