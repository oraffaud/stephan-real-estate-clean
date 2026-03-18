set -euo pipefail

HOMEFILE="${HOMEFILE:-src/app/[lang]/page.js}"
URL="${URL:-https://stephan-real-estate-hcoz.vercel.app/fr}"
COMMIT_MSG="${COMMIT_MSG:-Home: remove duplicate logo from email card}"

node <<'NODE'
const fs = require("fs");

const homeFile = process.env.HOMEFILE;
if (!homeFile) { console.error("ERR: HOMEFILE missing"); process.exit(2); }

let s = fs.readFileSync(homeFile, "utf8");

const mailtoNeedle = "mailto:stephan@stephanwsk.com";
const brandNeedle  = 'data-brand-logo="cda"';
const logoNeedle   = "/images/logos/cote-dazur-agency.png";

if (!s.includes(mailtoNeedle)) { console.error("ERR: mailto missing"); process.exit(3); }
if (!s.includes(brandNeedle))  { console.error("ERR: brand marker missing (data-brand-logo=\"cda\")"); process.exit(4); }
if (!s.includes(logoNeedle))   { console.error("ERR: logo path missing"); process.exit(5); }

const mailtoIdx = s.indexOf(mailtoNeedle);
let before = s.slice(0, mailtoIdx);
const after = s.slice(mailtoIdx);

before = before.replaceAll("En partenariat avec", "");
before = before.replaceAll("In partnership with", "");

const logoIdx = before.indexOf(logoNeedle);
if (logoIdx !== -1) {
  const start = before.lastIndexOf('<div className="mt-5 flex justify-end"', logoIdx);
  if (start !== -1) {
    before = before.slice(0, start);
  } else {
    before = before.replace(new RegExp(`<img[^>]*src=["']${logoNeedle.replaceAll("/", "\\/")}["'][^>]*\\/?>`, "g"), "");
  }
}

let out = before + after;

const logoCount = (out.match(/cote-dazur-agency\.png/g) || []).length;
if (logoCount !== 1) {
  console.error(`ERR: expected exactly 1 logo occurrence after patch, got ${logoCount}`);
  process.exit(6);
}

if (/En partenariat avec|In partnership with/.test(out)) {
  console.error("ERR: label still present after patch");
  process.exit(7);
}

fs.writeFileSync(homeFile, out, "utf8");
console.log("OK:", homeFile);
NODE

npm run build

git add -- "$HOMEFILE"
git commit -m "$COMMIT_MSG" || true
git push

curl -sH "cache-control: no-cache" "${URL}?ts=$(date +%s)" \
| tr -d '\n' | grep -o 'cote-dazur-agency\.png' | wc -l | awk '{print "HTML logo occurrences:", $1}'

curl -sH "cache-control: no-cache" "${URL}?ts=$(date +%s)" \
| grep -nE 'En partenariat avec|In partnership with|data-brand-logo="cda"|mailto:stephan@stephanwsk.com|cote-dazur-agency' \
| head -n 120 || true
