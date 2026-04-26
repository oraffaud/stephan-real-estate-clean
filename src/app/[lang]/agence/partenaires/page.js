import Image from "next/image";
import styles from "./partners.module.css";

const partnerUrl = "https://www.currenciesdirect.com/partner/0201110000931505";
const logoSrc = "/partners/currencies-direct-logo-clean.png";

const content = {
  fr: {
    eyebrow: "Partenaires",
    title: "Nos partenaires",
    intro:
      "Des partenaires sélectionnés pour accompagner les projets immobiliers internationaux sur la Côte d’Azur.",
    partnerLabel: "Partenaire sélectionné",
    partnerTitle: "Currencies Direct",
    partnerDescription:
      "Une solution de transfert d’argent international pour accompagner les acquisitions immobilières transfrontalières.",
    note:
      "Service externe opéré directement par le partenaire. Côte d’Azur Agency facilite l’accès au partenaire sans intervenir dans les opérations de change.",
    cta: "Visiter le partenaire",
    logoAlt: "Logo Currencies Direct",
  },
  en: {
    eyebrow: "Partners",
    title: "Our partners",
    intro:
      "Selected partners supporting international real estate projects on the French Riviera.",
    partnerLabel: "Selected partner",
    partnerTitle: "Currencies Direct",
    partnerDescription:
      "An international money transfer solution supporting cross-border real estate acquisitions.",
    note:
      "External service operated directly by the partner. Côte d’Azur Agency facilitates access to the partner without taking part in foreign exchange transactions.",
    cta: "Visit partner",
    logoAlt: "Currencies Direct logo",
  },
};

export const metadata = {
  title: "Partenaires | Côte d’Azur Agency",
  description:
    "Partenaires sélectionnés par Côte d’Azur Agency pour accompagner les projets immobiliers internationaux.",
};

export default async function PartnersPage({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang === "en" ? "en" : "fr";
  const t = content[lang];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </section>

      <section className={styles.partnerSection} aria-label={t.title}>
        <article className={styles.partnerCard}>
          <div className={styles.cardHeader}>
            <span className={styles.partnerLabel}>{t.partnerLabel}</span>

            <Image
              src={logoSrc}
              alt={t.logoAlt}
              width={300}
              height={95}
              className={styles.partnerLogo}
              priority
            />
          </div>

          <div className={styles.cardBody}>
            <div className={styles.copy}>
              <h2>{t.partnerTitle}</h2>
              <p className={styles.description}>{t.partnerDescription}</p>
              <p className={styles.note}>{t.note}</p>
            </div>

            <a
              href={partnerUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className={styles.partnerButton}
              aria-label={t.cta + " - " + t.partnerTitle}
            >
              {t.cta}
            </a>
          </div>
        </article>
      </section>
    </main>
  );
}
