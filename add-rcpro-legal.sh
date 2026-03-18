set -euo pipefail

COMMIT_MSG=${COMMIT_MSG:-"Legal: add RC Pro (Allianz Actif Pro) to legal notice"}
DO_GIT=${DO_GIT:-1}

LEGAL_FILE="$(git ls-files | grep -E '^src/app/\[lang\]/legal/page\.(js|jsx|ts|tsx)$' | head -n 1 || true)"
if [ -z "${LEGAL_FILE}" ]; then
  echo "ERR: cannot find legal page file (expected src/app/[lang]/legal/page.(js|jsx|ts|tsx))" >&2
  exit 1
fi

if grep -q "64366011" "$LEGAL_FILE" || grep -q "Allianz Actif Pro" "$LEGAL_FILE"; then
  echo "ERR: RC Pro block seems already present in $LEGAL_FILE" >&2
  exit 2
fi

node <<'NODE'
const fs = require("fs");

const file = process.env.LEGAL_FILE;
if (!file) { console.error("ERR: LEGAL_FILE env missing"); process.exit(1); }

let s = fs.readFileSync(file, "utf8");
const before = s;

const block = `
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
`;

if (s.includes("</main>")) {
  s = s.replace(/<\/main>/, `${block}\n    </main>`);
} else {
  console.error("ERR: cannot find </main> in legal page to insert block safely.");
  process.exit(3);
}

if (s === before) {
  console.error("ERR: no change applied.");
  process.exit(4);
}

fs.writeFileSync(file, s, "utf8");
console.log("OK: updated", file);
NODE

npm run build

if [ "$DO_GIT" = "1" ]; then
  git add -- "$LEGAL_FILE"
  git commit -m "$COMMIT_MSG" || true
  git push
fi

echo "DONE: $LEGAL_FILE"
