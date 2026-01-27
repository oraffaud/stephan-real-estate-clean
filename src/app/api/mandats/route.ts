export const runtime = "nodejs";

function json(status: number, body: any) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function toBase64(s: string): string {
  // Works on Node + Edge-ish runtimes
  // @ts-ignore
  if (typeof Buffer !== "undefined") return Buffer.from(s).toString("base64");
  // @ts-ignore
  if (typeof btoa !== "undefined") return btoa(s);

  // Fallback: manual base64 (rare)
  const bytes = new TextEncoder().encode(s);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let out = "";
  let i = 0;
  while (i < bytes.length) {
    const b1 = bytes[i++] ?? 0;
    const b2 = bytes[i++] ?? 0;
    const b3 = bytes[i++] ?? 0;

    const trip = (b1 << 16) | (b2 << 8) | b3;

    out += chars[(trip >> 18) & 63];
    out += chars[(trip >> 12) & 63];
    out += i - 2 <= bytes.length ? chars[(trip >> 6) & 63] : "=";
    out += i - 1 <= bytes.length ? chars[trip & 63] : "=";
  }
  return out;
}

function pickText(v: any): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (typeof v === "object") {
    return (
      v.name ??
      v.code ??
      v.zipcode ??
      v.value ??
      v.label ??
      v.title ??
      (v.id != null ? String(v.id) : "")
    );
  }
  return String(v);
}

function pickCover(p: any): string | null {
  const c =
    p?.cover ||
    p?.photo?.url ||
    p?.main_photo?.url ||
    p?.mainPicture?.url ||
    p?.main_picture?.url ||
    p?.photos?.[0]?.url ||
    p?.photos?.[0]?.src ||
    p?.pictures?.[0]?.url ||
    p?.pictures?.[0]?.src ||
    p?.images?.[0]?.url ||
    p?.images?.[0]?.src ||
    null;

  if (!c || typeof c !== "string") return null;
  if (c.startsWith("//")) return `https:${c}`;
  return c;
}

export async function GET(request: Request) {
  try {
    // Enabled only when APIMO_ENABLED=true (prod-safe)
    if (process.env.APIMO_ENABLED !== "true") {
      return json(404, { ok: false, error: "APIMO_DISABLED" });
    }

    const url = new URL(request.url);
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "20", 10) || 20, 100);

    const provider = process.env.APIMO_PROVIDER;
    const token = process.env.APIMO_TOKEN;
    const agencyId = process.env.APIMO_AGENCY_ID;
    const baseUrl = (process.env.APIMO_BASE_URL || "https://api.apimo.pro").replace(/\/$/, "");

    if (!provider || !token || !agencyId) {
      return json(500, {
        ok: false,
        error: "MISSING_ENV",
        debug: {
          hasProvider: !!provider,
          hasToken: !!token,
          hasAgencyId: !!agencyId,
          baseUrl,
        },
      });
    }

    const endpoint = `${baseUrl}/agencies/${encodeURIComponent(agencyId)}/properties?limit=${limit}`;
    const auth = toBase64(`${provider}:${token}`);

    const r = await fetch(endpoint, {
      headers: {
        accept: "application/json",
        authorization: `Basic ${auth}`,
      },
      cache: "no-store",
    });

    const text = await r.text();
    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      return json(502, { ok: false, error: "APIMO_BAD_JSON", raw: text.slice(0, 500) });
    }

    if (!r.ok) {
      return json(502, {
        ok: false,
        error: "APIMO_REQUEST_FAILED",
        status: r.status,
        body: data,
        debug: { baseUrl, agencyId },
      });
    }

    const properties = Array.isArray(data?.properties) ? data.properties : [];

    const items = properties.map((p: any) => {
      const cityObj = p?.city;
      const city = pickText(cityObj);

      const zipcodeObj =
        p?.zipcode ??
        p?.zip_code ??
        p?.postal_code ??
        p?.postcode ??
        cityObj?.zipcode ??
        cityObj?.postal_code;

      const zipcode = pickText(zipcodeObj);
      const cover = pickCover(p);
      const title = pickText(p?.title ?? p?.name ?? p?.reference ?? p?.id ?? "Mandat");

      const price =
        p?.price ??
        p?.selling_price ??
        p?.sellingPrice ??
        p?.rent ??
        p?.rent_price ??
        null;

      const currency = pickText(p?.currency ?? p?.price_currency ?? "EUR") || "EUR";

      return {
        id: p?.id ?? p?.property_id ?? p?.reference ?? title,
        title,
        city,
        zipcode,
        cover,
        price,
        currency,
      };
    });

    return json(200, {
      ok: true,
      generated_at: new Date().toISOString(),
      count: items.length,
      total_items: data?.total_items ?? null,
      timestamp: data?.timestamp ?? null,
      items,
    });
  } catch (e: any) {
    return json(500, {
      ok: false,
      error: "MANDATS_ROUTE_CRASH",
      message: e?.message ?? String(e),
    });
  }
}
