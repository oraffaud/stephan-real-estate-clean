import Link from "next/link";
import { notFound } from "next/navigation";
import { isLang, getDict } from "@/lib/i18n";

export default async function LegalPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = await getDict(lang);

  const fr = lang === "fr";

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-semibold font-luxe">
        {fr ? "Mentions légales" : "Legal notice"}
      </h1>

      <section className="mt-8 space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold">{fr ? "Éditeur du site" : "Website publisher"}</h2>

        <p><strong>{fr ? "Nom" : "Name"} :</strong> MORAWSKI Stephan Nadia Danitza</p>
        <p><strong>{fr ? "Activité" : "Activity"} :</strong> {fr ? "Agence immobilière" : "Real estate agency"}</p>
        <p><strong>{fr ? "Adresse" : "Address"} :</strong> 296 Chemin Clos De Brasset, Domaine du Bois Doré, 06560 Valbonne, France</p>
        <p><strong>RCS :</strong> 819 389 552 R.C.S. Grasse</p>

        <h2 className="pt-4 text-lg font-semibold">{fr ? "Carte professionnelle" : "Professional card"}</h2>
        <p><strong>{fr ? "N° de carte" : "Card number"} :</strong> CPI 0605 2025 000 000 063</p>
        <p><strong>{fr ? "Autorité de délivrance" : "Issued by"} :</strong> CCI Nice Côte d’Azur</p>
        <p><strong>{fr ? "Date de délivrance" : "Issue date"} :</strong> 11/04/2025</p>
        <p><strong>{fr ? "Validité" : "Valid until"} :</strong> 10/04/2028</p>
        <p><strong>{fr ? "Activité couverte" : "Scope"} :</strong> {fr ? "Transactions sur immeubles et fonds de commerce" : "Real estate and business assets transactions"}</p>

        <div className="mt-4 flex flex-col gap-2">
          <a className="underline" href="/docs/carte-professionnelle.pdf" target="_blank" rel="noreferrer">
            {fr ? "Voir / télécharger la carte professionnelle (PDF)" : "View / download professional card (PDF)"}
          </a>
          <a className="underline" href="/docs/kbis.pdf" target="_blank" rel="noreferrer">
            {fr ? "Voir / télécharger l’extrait Kbis (PDF)" : "View / download Kbis extract (PDF)"}
          </a>
        </div>

        <h2 className="pt-4 text-lg font-semibold">{fr ? "Hébergeur" : "Hosting"}</h2>
        <p>{fr ? "Le site est hébergé par Vercel." : "This website is hosted by Vercel."}</p>

        <h2 className="pt-4 text-lg font-semibold">{fr ? "Contact" : "Contact"}</h2>
        <p>
          {fr ? "Pour toute demande, merci d’utiliser la page " : "For any request, please use the "}
          <Link className="underline" href={`/${lang}/contact`}>{fr ? "Contact" : "Contact"}</Link>.
        </p>

        <h2 className="pt-4 text-lg font-semibold">{fr ? "Données personnelles" : "Personal data"}</h2>
        <p>
          {fr
            ? "Les données transmises via le formulaire de contact sont utilisées uniquement pour répondre à votre demande."
            : "Data submitted through the contact form is used only to reply to your request."}
        </p>

        <h2 className="pt-4 text-lg font-semibold">{fr ? "Propriété intellectuelle" : "Intellectual property"}</h2>
        <p>
          {fr
            ? "Les contenus du site (textes, images, éléments graphiques) sont protégés. Toute reproduction non autorisée est interdite."
            : "Website content (texts, images, graphics) is protected. Any unauthorized reproduction is prohibited."}
        </p>
      </section>
    </main>
  );
}
