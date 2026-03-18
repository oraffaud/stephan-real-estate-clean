'use client';

import { useState } from 'react';

export function ContactForm({ t }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  async function sendForm() {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    alert('Message sent');
  }

  return (
    <div className="grid gap-2 text-sm">

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="rounded-xl border px-3 py-2"
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="rounded-xl border px-3 py-2"
      />

      <input
        placeholder="Phone"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        className="rounded-xl border px-3 py-2"
      />

      <textarea
        placeholder="Message"
        rows={3}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="rounded-xl border px-3 py-2"
      />

      <button
        onClick={sendForm}
        className="mt-2 rounded-full bg-black text-white py-2"
      >
        Send
      </button>

    </div>
  );
}
