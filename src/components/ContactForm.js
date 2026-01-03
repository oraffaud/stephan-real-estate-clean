'use client';

import { useState } from 'react';

export function ContactForm({ t, context }) {
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, context }),
      });
      if (!res.ok) throw new Error('bad_status');
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-soft">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-zinc-900">{t.contact.name}</span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:border-zinc-400"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-zinc-900">{t.contact.email}</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:border-zinc-400"
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2">
        <span className="text-sm font-medium text-zinc-900">{t.contact.message}</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
          className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:border-zinc-400"
        />
      </label>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
        >
          {status === 'sending' ? t.contact.sending : t.contact.send}
        </button>

        {status === 'sent' && <p className="text-sm text-emerald-700">{t.contact.sent}</p>}
        {status === 'error' && <p className="text-sm text-red-600">{t.contact.error}</p>}
      </div>

      <p className="mt-4 text-xs text-zinc-500">
        {context ? `Context: ${context}` : ''}
      </p>
    </form>
  );
}
