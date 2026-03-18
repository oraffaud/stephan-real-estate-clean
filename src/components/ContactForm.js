'use client';

import { useState } from 'react';

export function ContactForm({ t }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function sendForm() {
    if (!form.name || !form.email || !form.message) {
      setFeedback(t?.contact?.error || 'Please complete the required fields.');
      return;
    }

    setLoading(true);
    setFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Request failed');
      }

      setFeedback(t?.contact?.success || 'Message sent successfully.');
      setForm({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (err) {
      setFeedback(t?.contact?.error || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-900">
          {t?.contact?.name || 'Name'}
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-900">
          {t?.contact?.email || 'Email'}
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-900">
          {t?.contact?.phone || 'Phone'}
        </label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-900">
          {t?.contact?.message || 'Message'}
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={6}
          required
          className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm"
        />
      </div>

      <div>
        <button
          type="button"
          onClick={sendForm}
          disabled={loading}
          className="btn-dark disabled:opacity-60"
        >
          {loading
            ? (t?.contact?.sending || 'Sending...')
            : (t?.contact?.submit || 'Send')}
        </button>
      </div>

      {feedback ? (
        <p className="text-sm text-zinc-700">{feedback}</p>
      ) : null}
    </div>
  );
}
