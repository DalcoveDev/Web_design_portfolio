'use client';

import { useState } from 'react';

export default function TestimonialForm() {
  const [form, setForm] = useState({ name: '', role: '', company: '', quote: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.quote.trim()) errs.quote = 'Message is required';
    else if (form.quote.trim().length < 10) errs.quote = 'Message must be at least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', role: '', company: '', quote: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="bg-[var(--surface)] border border-green-500/20 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
        <p className="text-[var(--cream-dim)] text-sm mb-4">Your testimonial has been submitted. It will appear after review.</p>
        <button onClick={() => setStatus('idle')} className="text-sm text-[var(--terracotta)] hover:underline">
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[var(--surface)] border border-white/6 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">💬</span>
        <div>
          <h3 className="text-lg font-semibold">Leave a Testimonial</h3>
          <p className="text-xs text-[var(--cream-dim)]">Share your experience working with me</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
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
          <label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Role</label>
          <input
            className="input"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
            placeholder="e.g. Tech Lead"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Company</label>
          <input
            className="input"
            value={form.company}
            onChange={e => setForm({ ...form, company: e.target.value })}
            placeholder="e.g. Startup XYZ"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Your Message *</label>
        <textarea
          className={`input min-h-[120px] ${errors.quote ? 'border-red-500/50' : ''}`}
          value={form.quote}
          onChange={e => setForm({ ...form, quote: e.target.value })}
          placeholder="Tell me about your experience working together..."
        />
        {errors.quote && <p className="text-xs text-red-400 mt-1">{errors.quote}</p>}
        <p className="text-xs text-[var(--cream-dim)]/50 mt-1 text-right">{form.quote.length}/500</p>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-3.5 bg-[var(--terracotta)] text-[var(--white)] font-semibold rounded-lg hover:bg-[var(--terracotta-dim)] transition-all shadow-[0_4px_20px_rgba(196,93,62,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
            Submitting...
          </span>
        ) : 'Submit Testimonial'}
      </button>

      {status === 'error' && (
        <p className="text-sm text-red-400 mt-3 text-center">Failed to submit. Please try again.</p>
      )}
    </form>
  );
}
