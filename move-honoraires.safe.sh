set -euo pipefail

HEADER_FILE="$(git ls-files | grep -E '^src/components/Header\.(js|jsx|ts|tsx)$' | head -n 1 || true)"
LEGAL_FILE="$(git ls-files | grep -E '^src/app/\[lang\]/legal/page\.(js|jsx|ts|tsx)$' | head -n 1 || true)"

[ -n "$HEADER_FILE" ] || { echo "ERR: Header file not found"; exit 1; }
[ -n "$LEGAL_FILE" ] || { echo "ERR: Legal page not found"; exit 1; }

HONO_DIR="src/app/[lang]/honoraires"
HONO_FILE="$HONO_DIR/page.js"
mkdir -p "$HONO_DIR"

if [ ! -f "$HONO_FILE" ]; then
cat > "$HONO_FILE" <<'PAGE'
export default function HonorairesPage({ params }) {
  const lang = params?.lang === 'en' ? 'en' : 'fr';

  const t = {
    fr: {
      title: 'Honoraires',
      lead: "Honoraires transparents, annoncés avant engagement. Barème communiqué sur demande et lors de la signature du mandat.",
      noteTitle: 'Informations',
      note: "Les honoraires et conditions applicables peuvent varier selon la nature de la mission (vente, recherche, accompagnement). Un document détaillé vous est remis avant tout engagement.",
      ctaTitle: 'Recevoir le barème',
      ctaLead: 'Demandez le détail des honoraires et un exemple de calcul.',
      ctaEmail: 'Demander par email',
    },
    en: {
      title: 'Fees',
      lead: 'Transparent fees, disclosed before any commitment. Detailed schedule shared on request and when signing the mandate.',
      noteTitle: 'Information',
      note: 'Fees and terms may vary depending on the mission (sale, search, buyer support). A detailed document is provided before any commitment.',
      ctaTitle: 'Get the fee schedule',
      ctaLead: 'Request the detailed fee schedule and a sample calculation.',
      ctaEmail: 'Request by email',
    },
  }[lang];

  return (
    <main className="min-h-screen bg-white">
      <section className="container py-14">
        <h1 className="text-3xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-700">{t.lead}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft">
            <div className="text-sm font-semibold text-zinc-900">{t.noteTitle}</div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">{t.note}</p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft">
            <div className="text-sm font-semibold text-zinc-900">{t.ctaTitle}</div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700">{t.ctaLead}</p>
            <a
              className="mt-5 inline-flex rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800"
              href="mailto:stephan@stephanwsk.com?subject=Honoraires%20-%20Demande%20de%20bar%C3%A8me"
            >
              {t.ctaEmail}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
PAGE
fi

HEADER_FILE="$HEADER_FILE" node <<'NODE'
const fs = require('fs');

const headerFile = process.env.HEADER_FILE;
let s = fs.readFileSync(headerFile, 'utf8');
const before = s;

// replace both "/legal#honoraires" and "legal#honoraires"
s = s
  .replace(/\/legal#honoraires/g, '/honoraires')
  .replace(/legal#honoraires/g, 'honoraires');

if (s === before) {
  console.error("ERR: no change applied to Header (didn't find legal#honoraires)");
  process.exit(2);
}

fs.writeFileSync(headerFile, s, 'utf8');
console.log("OK: updated", headerFile);
NODE

LEGAL_FILE="$LEGAL_FILE" node <<'NODE'
const fs = require('fs');

const file = process.env.LEGAL_FILE;
let s = fs.readFileSync(file, 'utf8');
const original = s;

function removeBlockById(tag) {
  const idRe = new RegExp(`<${tag}[^>]*\\bid=["']honoraires["'][^>]*>`, 'i');
  const m = s.match(idRe);
  if (!m) return false;

  const start = s.indexOf(m[0]);
  const openTag = `<${tag}`;
  const closeTag = `</${tag}>`;

  let i = start;
  let depth = 0;

  while (i < s.length) {
    const nextOpen = s.indexOf(openTag, i);
    const nextClose = s.indexOf(closeTag, i);
    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      i = nextOpen + openTag.length;
    } else {
      depth--;
      i = nextClose + closeTag.length;
      if (depth <= 0) {
        s = s.slice(0, start) + s.slice(i);
        return true;
      }
    }
  }
  return false;
}

let changed = removeBlockById('section') || removeBlockById('div');

if (!changed) {
  console.error("ERR: couldn't find an honoraires block to remove in legal page (id='honoraires')");
  process.exit(3);
}

if (s === original) {
  console.error("ERR: legal page unchanged");
  process.exit(4);
}

fs.writeFileSync(file, s, 'utf8');
console.log("OK: removed honoraires block from", file);
NODE

npm run build

git add -- "$HEADER_FILE" "$LEGAL_FILE" "$HONO_FILE"
git commit -m "Move Honoraires to dedicated page and remove from legal notice" || true
git push

echo "DONE"
