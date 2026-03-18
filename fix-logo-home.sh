#!/usr/bin/env bash
set -euo pipefail

HOMEFILE="${HOMEFILE:-src/app/[lang]/page.js}"
COMMIT_MSG="${COMMIT_MSG:-Home: detach brand logo from email and enlarge}"
URL="${URL:-https://stephan-real-estate-hcoz.vercel.app/fr}"

[[ -f "$HOMEFILE" ]] || { echo "ERR: file not found: $HOMEFILE" >&2; exit 1; }
grep -q 'mailto:stephan@stephanwsk.com' "$HOMEFILE" || { echo "ERR: mailto missing in $HOMEFILE" >&2; exit 1; }

node <<'NODE'
const fs = require("fs");
const homeFile = process.env.HOMEFILE || "src/app/[lang]/page.js";
let s = fs.readFileSync(homeFile, "utf8");
const before = s;

const partnerTightRe =
  /\n\s*<div className="mt-5 flex justify-end">\s*\n\s*<div className="rounded-2xl bg-white\/10 p-3 ring-1 ring-white\/15 backdrop-blur">[\s\S]*?cote-dazur-agency\.png[\s\S]*?<\/div>\s*\n\s*<\/div>\s*\n/m;

if (partnerTightRe.test(s)) s = s.replace(partnerTightRe, "\n");

s = s.replace(/\{lang === "fr" \? "En partenariat avec" : "In partnership with"\}\s*/g, "");
s = s.replace(/En partenariat avec|In partnership with/g, "");

const emailContainerRe = /<div className="mt-5 rounded-2xl bg-black\/20 p-4 ring-1 ring-white\/10">/;
if (!emailContainerRe.test(s)) {
  console.error('ERR: Email container not found');
  process.exit(2);
}
if (s.includes('data-brand-logo="cda"')) {
  console.error("ERR: brand logo marker already present");
  process.exit(3);
}

const brandBlock = `
                  <div className="mt-6 flex justify-end" data-brand-logo="cda">
                    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur">
                      <img
                        src="/images/logos/cote-dazur-agency.png"
                        alt="Côte d’Azur Agency"
                        className="h-20 w-auto md:h-24 lg:h-28 opacity-95"
                      />
                    </div>
                  </div>
                  <div className="mt-4 h-px bg-white/10" />
`;

s = s.replace(emailContainerRe, `${brandBlock}\n                  <div className="mt-5 rounded-2xl bg-black/20 p-4 ring-1 ring-white/10">`);

if (!s.includes('data-brand-logo="cda"')) {
  console.error("ERR: insertion failed");
  process.exit(4);
}
if (s.includes("En partenariat avec") || s.includes("In partnership with")) {
  console.error("ERR: label still present");
  process.exit(5);
}
if (!s.includes("mailto:stephan@stephanwsk.com")) {
  console.error("ERR: mailto disappeared");
  process.exit(6);
}
if (before === s) {
  console.error("ERR: no change applied");
  process.exit(7);
}

fs.writeFileSync(homeFile, s, "utf8");
console.log("OK: patched", homeFile);
NODE

grep -q 'data-brand-logo="cda"' "$HOMEFILE" || { echo "ERR: brand marker missing" >&2; exit 1; }
grep -q 'mailto:stephan@stephanwsk.com' "$HOMEFILE" || { echo "ERR: mailto missing" >&2; exit 1; }
if grep -qE 'En partenariat avec|In partnership with' "$HOMEFILE"; then echo "ERR: label still present" >&2; exit 1; fi

npm run build

git add -- "$HOMEFILE"
git commit -m "$COMMIT_MSG" || true
git push

curl -sH "cache-control: no-cache" "${URL}?ts=$(date +%s)" \
| grep -nE 'En partenariat avec|In partnership with|data-brand-logo="cda"|mailto:stephan@stephanwsk.com|cote-dazur-agency' \
| head -n 120
