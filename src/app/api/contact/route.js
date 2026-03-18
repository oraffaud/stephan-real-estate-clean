export async function POST(req) {
  try {
    const body = await req.json();

    const name = String(body?.name || '').trim();
    const email = String(body?.email || '').trim();
    const phone = String(body?.phone || '').trim();
    const message = String(body?.message || '').trim();

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('CONTACT_FORM', {
      name,
      email,
      phone,
      message,
      at: new Date().toISOString(),
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error('CONTACT_ROUTE_ERROR', e);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
