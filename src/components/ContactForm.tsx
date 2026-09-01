'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="bg-[var(--surface)] border border-green-500/20 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
        <p className="text-[var(--cream-dim)] text-sm mb-4">Thanks for reaching out. I&apos;ll get back to you soon.</p>
        <button onClick={() => setStatus('idle')} className="text-sm text-[var(--terracotta)] hover:underline">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[var(--surface)] border border-white/6 rounded-xl p-6 md:p-8">
      <h3 className="text-lg font-semibold mb-6">Send a Message</h3>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Name *</label>
          <input
            className={`input ${errors.name ? 'border-red-500/50' : ''}`}
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
          />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Email *</label>
          <input
            className={`input ${errors.email ? 'border-red-500/50' : ''}`}
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Subject</label>
        <input
          className="input"
          value={form.subject}
          onChange={e => setForm({ ...form, subject: e.target.value })}
          placeholder="What's this about?"
        />
      </div>

      <div className="mb-6">
        <label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Message *</label>
        <textarea
          className={`input min-h-[120px] ${errors.message ? 'border-red-500/50' : ''}`}
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          placeholder="Tell me about your project..."
        />
        {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-3.5 bg-[var(--terracotta)] text-[var(--white)] font-semibold rounded-lg hover:bg-[var(--terracotta-dim)] transition-all shadow-[0_4px_20px_rgba(196,93,62,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
            Sending...
          </span>
        ) : 'Send Message'}
      </button>

      {status === 'error' && (
        <p className="text-sm text-red-400 mt-3 text-center">Failed to send. Please try again or email me directly.</p>
      )}
    </form>
  );
}
