#!/usr/bin/env bash
set -euo pipefail

LIB_DIR="src/lib"
API_DIR="src/app/api/mandats"

mkdir -p "$LIB_DIR" "$API_DIR"

# ---- Apimo client (server-side) ----
cat > "$LIB_DIR/apimo.ts" <<'TS'
const BASE = process.env.APIMO_BASE_URL ?? "https://api.apimo.pro";

function authHeader() {
  const provider = process.env.APIMO_PROVIDER;
  const token = process.env.APIMO_TOKEN;

  if (!provider || !token) {
    throw new Error("Missing APIMO_PROVIDER or APIMO_TOKEN env var");
  }

  const basic = Buffer.from(`${provider}:${token}`).toString("base64");
  return { Authorization: `Basic ${basic}` };
}

export async function apimoGet<T>(
  path: string,
  qs?: Record<string, string | number | boolean | undefined | null>,
  revalidateSeconds: number = 300
): Promise<T> {
  const url = new URL(`${BASE}${path}`);
  if (qs) {
    for (const [k, v] of Object.entries(qs)) {
      if (v === undefined || v === null) continue;
      url.searchParams.set(k, String(v));
    }
  }

  const res = await fetch(url, {
    headers: { ...authHeader(), Accept: "application/json" },
    next: { revalidate: revalidateSeconds },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Apimo ${res.status} ${res.statusText} :: ${body}`);
  }

  return (await res.json()) as T;
}
TS

# ---- Route Handler: /api/mandats ----
cat > "$API_DIR/route.ts" <<'TS'
import { apimoGet } from "@/lib/apimo";

export const runtime = "nodejs";

type ApimoPropertiesResp = {
  total_items?: number;
  timestamp?: number;
  properties?: Array<{
    id: number;
    reference: string;
    name?: string;
    city?: { name?: string; zipcode?: string };
    price?: { value?: number; currency?: string };
    pictures?: Array<{ url: string; rank?: number }>;
    agreement?: { type?: number; reference?: string; start_at?: string; end_at?: string };
    step?: number | string;
    status?: number | string;
  }>;
};

export async function GET(req: Request) {
  const agencyId = process.env.APIMO_AGENCY_ID;
  if (!agencyId) {
    return Response.json({ error: "Missing APIMO_AGENCY_ID env var" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);

  const limit = Math.min(Number(searchParams.get("limit") ?? 50), 1000);
  const offset = Math.max(Number(searchParams.get("offset") ?? 0), 0);

  const timestamp = searchParams.get("timestamp") ?? undefined;
  const revalidate = Math.max(Number(searchParams.get("revalidate") ?? 300), 0);

  const data = await apimoGet<ApimoPropertiesResp>(
    `/agencies/${agencyId}/properties`,
    { limit, offset, timestamp },
    revalidate
  );

  const items = (data.properties ?? []).map((p) => ({
    id: p.id,
    reference: p.reference,
    title: p.name ?? p.reference,
    city: p.city?.name ?? null,
    zipcode: p.city?.zipcode ?? null,
    price: p.price?.value ?? null,
    currency: p.price?.currency ?? null,
    cover:
      [...(p.pictures ?? [])]
        .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))[0]?.url ?? null,
    agreement: p.agreement
      ? {
          type: p.agreement.type ?? null,
          reference: p.agreement.reference ?? null,
          start_at: p.agreement.start_at ?? null,
          end_at: p.agreement.end_at ?? null,
        }
      : null,
  }));

  return Response.json({
    total: data.total_items ?? 0,
    timestamp: data.timestamp ?? null,
    count: items.length,
    items,
  });
}
TS

echo "✅ Added /api/mandats (Apimo server-side) + apimo client"
