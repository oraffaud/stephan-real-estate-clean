# Stephan Real Estate (Clean)

Bilingual (EN/FR) luxury real estate website template for **Valbonne** & exceptional properties in the **Alpes-Maritimes**.

- ✅ **JavaScript-only** (no TypeScript) → avoids typing/build cascades
- ✅ **Next.js App Router**
- ✅ **EN/FR** dictionaries stored as JSON
- ✅ Property list + property detail pages
- ✅ Contact form + minimal API route (`/api/contact`)
- ✅ Ready for **Vercel**

## Quick start

```bash
npm install
npm run dev
```

## Production build (local)

```bash
npm run build
npm start
```

## Deploy to Vercel

- Import the repo in Vercel
- Node version: **20.x** (already pinned in `package.json`)
- Build command: `npm run build`
- Output: Next.js default

## Content editing

### 1) Text / translations

Edit:
- `src/lib/dictionaries/en.json`
- `src/lib/dictionaries/fr.json`

### 2) Properties catalog

Edit:
- `src/lib/properties.js`

Images are referenced from:
- `public/properties/*.svg`

Replace placeholder SVGs with real photos (JPG/PNG/WebP) using the same paths.

### 3) Contact form

The API route currently logs messages:
- `src/app/api/contact/route.js`

To send real emails, swap the `console.log` section for an email provider (Resend, SendGrid, Mailgun, etc.) and store secrets in Vercel Environment Variables.

## Push to GitHub (example)

```bash
git init
git add -A
git commit -m "Initial commit"

git branch -M main
git remote add origin https://github.com/<USER>/<REPO>.git
git push -u origin main
```

## License

You can use/modify this template freely. Before going live, add your legal mentions (RGPD/Privacy policy, cookie policy if needed, and any required real estate disclosures).
