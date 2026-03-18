set -euo pipefail

HOMEFILE="${HOMEFILE:-src/app/[lang]/page.js}"
URL="${URL:-https://stephan-real-estate-hcoz.vercel.app/fr}"
COMMIT_MSG="${COMMIT_MSG:-Home: single brand logo (remove email duplicate)}"

node <<'NODE'
const fs = require("fs");

const homeFile = process.env.HOMEFILE || "src/app/[lang]/page.js";
let s = fs.readFileSync(homeFile, "utf8");

const mailtoLine = `<a className="mt-1 block text-sm font-semibold text-white hover:underline" href="mailto:stephan@cotedazuragency.com">`;
const emailContainer = `<div className="mt-5 rounded-2xl bg-black/20 p-4 ring-1 ring-white/10">`;

function removeBrandBlocks(str) {
  const re = /<div className="mt-6 flex justify-(?:center|end)" data-brand-logo="cda">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*/g;
  return str.replace(re, "");
}

function removeEmailPartnerBlock(str) {
  const start = str.indexOf(`<div className="mt-5 flex justify-end">`);
  const aidx = str.indexOf(mailtoLine);
  if (start !== -1 && aidx !== -1 && start < aidx) {
    return str.slice(0, start) + str.slice(aidx);
  }
  return str;
}

s = removeBrandBlocks(s);
s = removeEmailPartnerBlock(s);
s = s.replace(/En partenariat avec|In partnership with/g, "");

if (!s.includes(emailContainer)) {
  console.error("ERR: email container not found");
  process.exit(3);
}

const brandBlock =
`                  <div className="mt-6 flex justify-end" data-brand-logo="cda">
                    <div className="rounded-3xl bg-white/10 p-4 ring-1 ring-white/15 shadow-soft backdrop-blur">
                      <div className="rounded-3xl bg-white/85 p-6 ring-1 ring-white/20">
                        <img src="/images/logos/cote-dazur-agency.png" alt="Côte d’Azur Agency" className="h-20 w-auto md:h-24" />
                      </div>
                    </div>
                  </div>
`;

s = s.replace(emailContainer, `${brandBlock}${emailContainer}`);

const logoCount = (s.match(/cote-dazur-agency\.png/g) || []).length;
if (logoCount !== 1) {
  console.error(`ERR: expected 1 logo occurrence in source, got ${logoCount}`);
  process.exit(4);
}

if (!s.includes('mailto:stephan@cotedazuragency.com')) {
  console.error("ERR: mailto missing");
  process.exit(5);
}

fs.writeFileSync(homeFile, s, "utf8");
console.log("OK: patched", homeFile);
NODE

npm run build

git add -- "$HOMEFILE"
git commit -m "$COMMIT_MSG" || true
git push

curl -sH "cache-control: no-cache" "${URL}?ts=$(date +%s)" | tr -d '\n' \
| grep -o 'cote-dazur-agency\.png' | wc -l | awk '{print "HTML logo occurrences:", $1}'

curl -sH "cache-control: no-cache" "${URL}?ts=$(date +%s)" \
| grep -nE 'En partenariat avec|In partnership with|data-brand-logo="cda"|mailto:stephan@cotedazuragency.com|cote-dazur-agency' \
| head -n 80 || true
