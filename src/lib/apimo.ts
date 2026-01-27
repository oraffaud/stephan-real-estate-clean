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
