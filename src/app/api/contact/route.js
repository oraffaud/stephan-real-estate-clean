export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body?.name || '').trim();
    const email = String(body?.email || '').trim();
    const message = String(body?.message || '').trim();
    const context = String(body?.context || '').trim();

    if (!name || !email || !message) {
      return Response.json({ ok: false, error: 'missing_fields' }, { status: 400 });
    }

    // In production, replace this with an email provider (Resend, SendGrid, etc.)
    // For now, we log to serverless function logs.
    console.log('[contact]', {
      name,
      email,
      message,
      context,
      at: new Date().toISOString(),
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    return Response.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}
