export const runtime = "nodejs";

function json(status: number, body: any) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
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

  if (!c) return null;
  if (typeof c !== "string") return null;

  if (c.startsWith("//")) return `https:${c}`;
  return c; // la plupart du temps déjà une URL absolue
}

export async function GET(request: Request) {
  // ✅ DEV ONLY

  // Enabled only when APIMO_ENABLED=true
  if (process.env.APIMO_ENABLED !== "true") {
    return json(404, { ok: false, error: "APIMO_DISABLED" });
  }


}
