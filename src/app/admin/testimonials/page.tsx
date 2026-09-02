'use client';

import { useState, useEffect } from 'react';

interface TestimonialEntry {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  approved: boolean;
  created_at: string;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(r => r.json())
      .then(data => { setTestimonials(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function toggleApproval(id: number, current: boolean) {
    // In a real app, this would call an API to update
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, approved: !current } : t));
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this testimonial?')) return;
    setTestimonials(prev => prev.filter(t => t.id !== id));
  }

  if (loading) return <div className="text-[var(--cream-dim)]">Loading testimonials...</div>;

  const pending = testimonials.filter(t => !t.approved);
  const approved = testimonials.filter(t => t.approved);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-sm text-[var(--cream-dim)] mt-1">{testimonials.length} total · {pending.length} pending</p>
        </div>
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-[var(--cream-dim)] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Pending Review ({pending.length})
          </h2>
          <div className="space-y-3">
            {pending.map((t) => (
              <div key={t.id} className="bg-[var(--surface)] border border-amber-500/20 rounded-xl p-5 hover:border-amber-500/30 transition">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{t.name}</span>
                      {t.role && <span className="text-xs text-[var(--cream-dim)]">· {t.role}</span>}
                      {t.company && <span className="text-xs text-[var(--cream-dim)]">at {t.company}</span>}
                    </div>
                    <p className="text-sm text-[var(--cream-dim)] leading-relaxed italic">"{t.quote}"</p>
                    <p className="text-xs text-[var(--cream-dim)]/50 mt-2">{new Date(t.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => toggleApproval(t.id, false)} className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold rounded-lg hover:bg-green-500/20 transition">✓ Approve</button>
                    <button onClick={() => handleDelete(t.id)} className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold rounded-lg hover:bg-red-500/20 transition">✕ Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved */}
      <div>
        <h2 className="text-sm font-semibold tracking-widest uppercase text-[var(--cream-dim)] mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400" /> Approved ({approved.length})
        </h2>
        <div className="space-y-3">
          {approved.map((t) => (
            <div key={t.id} className="bg-[var(--surface)] border border-white/6 rounded-xl p-5 hover:border-white/10 transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{t.name}</span>
                    {t.role && <span className="text-xs text-[var(--cream-dim)]">· {t.role}</span>}
                    {t.company && <span className="text-xs text-[var(--cream-dim)]">at {t.company}</span>}
                  </div>
                  <p className="text-sm text-[var(--cream-dim)] leading-relaxed italic">"{t.quote}"</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => toggleApproval(t.id, true)} className="px-3 py-1.5 bg-white/5 border border-white/10 text-[var(--cream-dim)] text-xs font-semibold rounded-lg hover:bg-white/10 transition">Unapprove</button>
                  <button onClick={() => handleDelete(t.id)} className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold rounded-lg hover:bg-red-500/20 transition">✕ Delete</button>
                </div>
              </div>
            </div>
          ))}
          {approved.length === 0 && (
            <div className="text-center py-12 text-[var(--cream-dim)]">
              <p className="text-lg mb-2">No approved testimonials</p>
              <p className="text-sm">Approve pending submissions to display them on your portfolio</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
