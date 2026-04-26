import Image from 'next/image';

export const metadata = {
  title: 'Partenaires | Côte d’Azur Agency',
  description: 'Partenaires de Côte d’Azur Agency',
};

export default async function PartenairesPage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'fr';
  const isFr = lang === 'fr';

  const title = isFr ? 'Partenaires' : 'Partners';
  const intro = isFr
    ? 'Une sélection de partenaires utiles et complémentaires.'
    : 'A curated selection of useful and complementary partners.';

  const sectionLabel = isFr ? 'Partenaire' : 'Partner';
  const partnerTitle = 'Currencies Direct';
  const partnerText = isFr
    ? 'Transfert d’argent international'
    : 'International money transfer';
  const partnerButton = isFr ? 'Visiter le partenaire' : 'Visit partner';

  return (
    <main style={{ background: '#f3f0eb', minHeight: '100vh' }}>
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 24px 32px' }}>
        <div style={{ background: '#ebe6df', borderRadius: '24px', padding: '40px 32px' }}>
          <h1
            style={{
              margin: 0,
              fontFamily: 'Georgia, serif',
              fontSize: '56px',
              lineHeight: 1.05,
              color: '#111',
            }}
          >
            {title}
          </h1>

          <p
            style={{
              marginTop: '18px',
              marginBottom: 0,
              fontSize: '20px',
              lineHeight: 1.6,
              color: '#4b4b4b',
            }}
          >
            {intro}
          </p>
        </div>
      </section>

      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 72px' }}>
        <div
          style={{
            background: '#ffffff',
            borderRadius: '32px',
            padding: '44px 48px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#c2a56a',
              marginBottom: '28px',
              fontWeight: 600,
            }}
          >
            {sectionLabel}
          </div>

          <div style={{ marginBottom: '28px' }}>
            <Image
              src="/partners/currencies-direct-logo.png"
              alt="Currencies Direct"
              width={320}
              height={120}
              style={{
                width: 'auto',
                height: '70px',
                objectFit: 'contain',
              }}
              priority
            />
          </div>

          <h2
            style={{
              margin: '0 0 18px 0',
              fontFamily: 'Georgia, serif',
              fontSize: '34px',
              lineHeight: 1.15,
              color: '#111',
            }}
          >
            {partnerTitle}
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: '20px',
              lineHeight: 1.6,
              color: '#4b4b4b',
              maxWidth: '760px',
            }}
          >
            {partnerText}
          </p>

          <div style={{ marginTop: '34px' }}>
            <a
              href="https://www.currenciesdirect.com/partner/0201110000931505"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '64px',
                padding: '0 42px',
                border: '2px solid #202020',
                borderRadius: '999px',
                textDecoration: 'none',
                color: '#111',
                fontSize: '17px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              {partnerButton}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
