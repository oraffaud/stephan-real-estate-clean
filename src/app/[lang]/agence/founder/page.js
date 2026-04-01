import { notFound } from 'next/navigation';
import { isLang } from '@/lib/i18n';
import { buildPageMetadata } from '@/lib/seo';
import fs from 'node:fs';
import path from 'node:path';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return buildPageMetadata({
    title: 'Founder | Côte d’Azur Agency',
    description: lang === 'fr'
      ? 'Le parcours et la vision de la fondatrice de Côte d’Azur Agency.'
      : 'The founder’s background and vision behind Côte d’Azur Agency.',
    lang,
    pathname: `/${lang}/agence/founder`
  });
}

function FRText() {
  return (
    <>
      <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C6A46C]">
        Founder
      </div>

      <h1 className="mt-4 font-luxe text-4xl leading-tight text-zinc-900 md:text-6xl">
        Une vision exigeante de l’immobilier sur la Côte d’Azur
      </h1>

      <div className="mt-8 rounded-[24px] border border-[var(--gold-light)] bg-white p-6 md:p-8">
        <p className="font-luxe text-2xl leading-relaxed text-zinc-900 md:text-3xl">
          « L’excellence ne se revendique pas, elle se démontre. »
        </p>
      </div>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-zinc-700">
        <p>
          Depuis plus de dix ans, j’évolue dans l’immobilier sur la Côte d’Azur avec une conviction forte :
          l’excellence ne se revendique pas, elle se démontre.
        </p>

        <p>
          Avant de me consacrer pleinement à l’immobilier de prestige, j’ai occupé pendant dix ans le poste de
          directrice administrative et financière. Cette expérience m’a apporté une maîtrise exigeante du
          management, de la négociation, de la gestion de projet et de la relation client.
        </p>

        <p>
          Mon parcours dans l’hôtellerie de luxe a également renforcé mon sens du service, du détail et des attentes
          d’une clientèle haut de gamme.
        </p>

        <p>
          Après dix années au sein de grandes enseignes de l’immobilier de prestige, j’ai choisi de créer une
          structure à mon image : <span className="font-semibold text-zinc-900">CÔTE D’AZUR AGENCY</span>.
        </p>

        <p>
          Une agence pensée pour une clientèle exigeante, en quête de discrétion, de précision et d’un accompagnement
          irréprochable.
        </p>
      </div>
    </>
  );
}

function ENText() {
  return (
    <>
      <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C6A46C]">
        Founder
      </div>

      <h1 className="mt-4 font-luxe text-4xl leading-tight text-zinc-900 md:text-6xl">
        A demanding vision of real estate on the French Riviera
      </h1>

      <div className="mt-8 rounded-[24px] border border-[var(--gold-light)] bg-white p-6 md:p-8">
        <p className="font-luxe text-2xl leading-relaxed text-zinc-900 md:text-3xl">
          “Excellence is not claimed, it is demonstrated.”
        </p>
      </div>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-zinc-700">
        <p>
          For more than ten years, I have evolved in real estate on the French Riviera with one strong conviction:
          excellence is not claimed, it is demonstrated.
        </p>

        <p>
          Before fully dedicating myself to luxury real estate, I spent ten years as an administrative and finance
          director. This experience gave me a demanding command of management, negotiation, project leadership and
          client relations.
        </p>

        <p>
          My background in luxury hospitality also strengthened my sense of service, detail and the expectations of a
          premium clientele.
        </p>

        <p>
          After ten years within major luxury real estate brands, I chose to create a structure that reflects my own
          standards: <span className="font-semibold text-zinc-900">CÔTE D’AZUR AGENCY</span>.
        </p>

        <p>
          An agency designed for a demanding clientele seeking discretion, precision and impeccable support.
        </p>
      </div>
    </>
  );
}

export default async function FounderPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const hasImage = fs.existsSync(path.join(process.cwd(), 'public/images/founder.jpg'));

  return (
    <main className="container py-16">
      <div className="grid gap-10 lg:grid-cols-[480px_minmax(0,1fr)] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-[32px] bg-zinc-100 shadow-soft ring-1 ring-[var(--gold-light)]">
            {hasImage ? (
              <img
                src="/images/founder.jpg"
                alt="Founder"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center bg-zinc-100 text-zinc-500">
                Founder photo
              </div>
            )}
          </div>
        </div>

        <div className="rounded-[32px] bg-white p-8 shadow-soft ring-1 ring-[var(--gold-light)] md:p-12">
          {lang === 'fr' ? <FRText /> : <ENText />}
        </div>
      </div>
    </main>
  );
}
