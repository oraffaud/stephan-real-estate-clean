import { getMandats } from '@/lib/apimo';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get('lang') || 'fr';
    const items = await getMandats(lang);
    return Response.json({ ok: true, items });
  } catch (error) {
    console.error('API_APIMO_MANDATS_ERROR', error);
    return Response.json(
      { ok: false, error: error?.message || 'APIMO error', details: error?.data || null },
      { status: 500 }
    );
  }
}
