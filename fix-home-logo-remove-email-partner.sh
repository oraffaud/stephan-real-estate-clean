set -euo pipefail

HOMEFILE="${HOMEFILE:-src/app/[lang]/page.js}"
URL="${URL:-https://stephan-real-estate-hcoz.vercel.app/fr}"
COMMIT_MSG="${COMMIT_MSG:-Home: remove logo from email card (keep single brand logo)}"

node <<'NODE'
const fs = require("fs");

const homeFile = process.env.HOMEFILE;
if (!homeFile) { console.error("ERR: HOMEFILE missing"); process.exit(2); }

let s = fs.readFileSync(homeFile, "utf8");

if (!s.includes('mailto:stephan@stephanwsk.com')) {
  console.error("ERR: mailto missing");
  process.exit(3);
}

const before = s;

s = s.replaceAll("En partenariat avec", "");
s = s.replaceAll("In partnership with", "");

const blockRe = /<div className="mt-5 flex justify-end">[\s\S]*?(En partenariat avec|In partnership with)[\s\S]*?(?=\s*<a className="mt-1 block text-sm font-semibold text-white hover:underline" href="mailto:stephan@stephanwsk\.com">)/m;
s = s.replace(blockRe, "");

const labelRe = /(En partenariat avec|In partnership with)/;
if (labelRe.test(s)) {
  console.error("ERR: label still present after patch");
  process.exit(4);
}

const logoCount = (s.match(/cote-dazur-agency\.png/g) || []).length;
if (logoCount !== 1) {
  console.error(`ERR: expected exactly 1 logo occurrence, got ${logoCount}`);
  process.exit(5);
}

if (before === s) {
  console.error("ERR: no change applied (nothing matched)");
  process.exit(6);
}

fs.writeFileSync(homeFile, s, "utf8");
console.log("OK:", homeFile);
NODE

npm run build

git add -- "$HOMEFILE"
git commit -m "$COMMIT_MSG" || true
git push

curl -sH "cache-control: no-cache" "${URL}?ts=$(date +%s)" \
| tr -d '\n' | grep -o 'cote-dazur-agency\.png' | wc -l | awk '{print "HTML logo occurrences:", $1}'

curl -sH "cache-control: no-cache" "${URL}?ts=$(date +%s)" \
| grep -nE 'En partenariat avec|In partnership with|mailto:stephan@stephanwsk.com|cote-dazur-agency' \
| head -n 80 || true
