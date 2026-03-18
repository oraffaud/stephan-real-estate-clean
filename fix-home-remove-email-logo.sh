set -euo pipefail

HOMEFILE="${HOMEFILE:-src/app/[lang]/page.js}"
URL="${URL:-https://stephan-real-estate-hcoz.vercel.app/fr}"
COMMIT_MSG="${COMMIT_MSG:-Home: remove duplicate logo from email card}"

node <<'NODE'
const fs = require("fs");

const homeFile = process.env.HOMEFILE;
let s = fs.readFileSync(homeFile, "utf8");

const logoRe = /cote-dazur-agency\.png/g;
const count = (txt) => (txt.match(logoRe) || []).length;

const before = count(s);
if (before !== 2) {
  console.error(`ERR: expected exactly 2 logo occurrences in ${homeFile} before patch, got ${before}`);
  process.exit(2);
}

const mailNeedle = 'href="mailto:stephan@cotedazuragency.com"';
const mailIdx = s.indexOf(mailNeedle);
if (mailIdx < 0) {
  console.error("ERR: mailto anchor not found (email block changed?)");
  process.exit(3);
}

const emailBoxNeedle = '<div className="mt-5 rounded-2xl bg-black/20 p-4 ring-1 ring-white/10">';
const emailBoxIdx = s.lastIndexOf(emailBoxNeedle, mailIdx);
if (emailBoxIdx < 0) {
  console.error("ERR: email container not found (class string changed?)");
  process.exit(4);
}

const head = s.slice(0, emailBoxIdx);
let mid = s.slice(emailBoxIdx, mailIdx);
const tail = s.slice(mailIdx);

const midBefore = count(mid);
if (midBefore !== 1) {
  console.error(`ERR: expected email container slice to contain 1 logo, got ${midBefore}`);
  process.exit(5);
}

const removeRe = /<div className="mt-5 flex justify-end">[\s\S]*?cote-dazur-agency\.png[\s\S]*?<\/div>\s*/m;
if (!removeRe.test(mid)) {
  console.error("ERR: could not find the email-side logo block (mt-5 flex justify-end ... logo)");
  process.exit(6);
}

mid = mid.replace(removeRe, "");

const after = count(head + mid + tail);
if (after !== 1) {
  console.error(`ERR: expected exactly 1 logo occurrence after patch, got ${after}`);
  process.exit(7);
}

s = head + mid + tail;
fs.writeFileSync(homeFile, s, "utf8");
console.log("OK:", homeFile);
NODE

npm run build

git add -- "$HOMEFILE"
git commit -m "$COMMIT_MSG" || true
git push

curl -sH "cache-control: no-cache" "${URL}?ts=$(date +%s)" \
| tr -d '\n' | grep -o 'cote-dazur-agency\.png' | wc -l | awk '{print "HTML logo occurrences:", $1}'
