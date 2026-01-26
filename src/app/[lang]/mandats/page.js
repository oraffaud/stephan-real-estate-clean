import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n";

function headerValue(h, name) {
  const key = String(name).toLowerCase();

  // Next can return a real Headers OR a plain object depending on runtime/bundler
  if (h && typeof h.get === "function") return h.get(name) || h.get(key);
  if (h && typeof h === "object") {
    // try exact, lowercase, and common Node shapes
    return h[name] || h[key] || (h.get && h.get(name)) || null;
  }
  return null;
}

function getBaseUrl() {
  const h = headers();
  const host =
    headerValue(h, "x-forwarded-host") ||
    headerValue(h, "host") ||
    process.env.VERCEL_URL ||
    "localhost:3000";

  const proto =
    headerValue(h, "x-forwarded-proto") ||
    (process.env.VERCEL ? "https" : "http");

  const normalizedHost = host.startsWith("http") ? host.replace(/^https?:\/\//, "") : host;
  return `${proto}://${normalizedHost}`;
}

export default async function MandatsPage({ params }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/mandats?limit=50`;

  const res = await fetch(url, { cache: "no-store" });
  const data = res.ok ? await res.json() : { count: 0, items: [] };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold font-luxe">Mandats</h1>
      <p className="mt-2 text-sm opacity-80">{data.count ?? 0} annonces</p>

      {!data.items?.length ? (
        <div className="mt-10 rounded border p-6">Aucune annonce disponible pour le moment.</div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((it) => (
            <article key={it.id} className="rounded-lg border overflow-hidden">
              {it.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.cover} alt="" className="h-48 w-full object-cover" />
              ) : (
                <div className="h-48 w-full bg-black/5" />
              )}
              <div className="p-4">
                <div className="text-sm opacity-70">{it.city ?? ""} {it.zipcode ?? ""}</div>
                <div className="mt-1 font-medium">{it.title}</div>
                <div className="mt-2 text-sm">
                  {it.price ? `${it.price.toLocaleString?.() ?? it.price} ${it.currency ?? ""}` : "Prix sur demande"}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
