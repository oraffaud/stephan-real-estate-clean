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

        <h2 className="pt-4 text-lg font-semibold">{fr ? "Honoraires" : "Fees"}</h2>
        <p className="text-sm opacity-80">
          {fr
            ? "Barème d’honoraires TTC (à la charge du vendeur sauf mention contraire)."
            : "Schedule of fees incl. VAT (paid by the seller unless stated otherwise)."}
        </p>

        <div className="mt-4 overflow-x-auto rounded border">
          <div className="px-4 py-3 text-3xl font-luxe text-[#b7a46d]">{fr ? "Nos commissions" : "Our fees"}</div>
          <table className="w-full text-sm">
            <thead className="bg-[#b7a46d] text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">{fr ? "Type de transaction" : "Transaction type"}</th>
                <th className="px-4 py-3 text-left font-semibold">{fr ? "Prix" : "Price"}</th>
                <th className="px-4 py-3 text-left font-semibold">{fr ? "Honoraires TTC" : "Fees incl. VAT"}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="px-4 py-3">{fr ? "Vente" : "Sale"}</td>
                <td className="px-4 py-3">&gt;0€</td>
                <td className="px-4 py-3">6.00% ({fr ? "Honoraires à la charge du vendeur" : "Fees paid by the seller"})</td>
              </tr>
            </tbody>
          </table>
          <div className="px-4 py-3 text-xs opacity-70">
            {fr ? "Les honoraires sont exprimés toutes taxes comprises (TTC)." : "Fees are expressed including VAT."}
          </div>
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
    
      <section className="mt-10 rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft">
        <h2 className="text-lg font-semibold tracking-tight">Assurance Responsabilité Civile Professionnelle (RC Pro)</h2>
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700">
          <p><span className="font-medium text-zinc-900">Assureur :</span> Allianz</p>
          <p><span className="font-medium text-zinc-900">Contrat :</span> Allianz Actif Pro — n° 64366011</p>
          <p><span className="font-medium text-zinc-900">Activité couverte :</span> Agence immobilière — transaction sur immeubles et fonds de commerce</p>
          <p><span className="font-medium text-zinc-900">Garanties :</span> Responsabilité Civile Exploitation ; Responsabilité Civile Professionnelle ; Défense Pénale et Recours suite à accident</p>
          <p><span className="font-medium text-zinc-900">Période de validité :</span> du 17/03/2025 au 17/03/2026 (sous réserve du paiement des cotisations)</p>
        </div>

        <div className="mt-8 border-t border-zinc-200 pt-6">
          <h2 className="text-lg font-semibold tracking-tight">Professional liability insurance</h2>
          <div className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700">
            <p><span className="font-medium text-zinc-900">Insurer:</span> Allianz</p>
            <p><span className="font-medium text-zinc-900">Policy:</span> Allianz Actif Pro — No. 64366011</p>
            <p><span className="font-medium text-zinc-900">Covered activity:</span> Real estate agency — property and business sale transactions</p>
            <p><span className="font-medium text-zinc-900">Cover:</span> Public liability; Professional liability; Legal defense and recovery following accident</p>
            <p><span className="font-medium text-zinc-900">Validity:</span> 17/03/2025 to 17/03/2026 (subject to premium payment)</p>
          </div>
        </div>
      </section>

    </main>
  );
}
