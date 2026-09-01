'use client';

import { useEffect, useState } from 'react';
import { loadData, saveData } from '@/lib/store';
import { PortfolioData, defaultData } from '@/lib/data';

export default function AdminHero() {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [toast, setToast] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { loadData().then(d => { setData(d); setLoaded(true); }); }, []);

  async function save() { await saveData(data); setToast('Hero updated!'); setTimeout(() => setToast(''), 2500); }

  if (!loaded) return <div className="text-[var(--cream-dim)]">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold tracking-tight">Hero Section</h1><p className="text-sm text-[var(--cream-dim)] mt-1">Edit the main hero area</p></div>
        <button onClick={save} className="px-5 py-2.5 bg-[var(--terracotta)] text-white font-semibold rounded-lg hover:bg-[var(--terracotta-dim)] transition">Save Changes</button>
      </div>
      <div className="max-w-[700px]">
        <div className="mb-4"><label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Tag / Badge</label><input className="input" value={data.hero.tag} onChange={e => setData({ ...data, hero: { ...data.hero, tag: e.target.value } })} /></div>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div><label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Line 1</label><input className="input" value={data.hero.titleLine1} onChange={e => setData({ ...data, hero: { ...data.hero, titleLine1: e.target.value } })} /></div>
          <div><label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Line 2 (Italic)</label><input className="input" value={data.hero.titleLine2} onChange={e => setData({ ...data, hero: { ...data.hero, titleLine2: e.target.value } })} /></div>
          <div><label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Line 3</label><input className="input" value={data.hero.titleLine3} onChange={e => setData({ ...data, hero: { ...data.hero, titleLine3: e.target.value } })} /></div>
        </div>
        <div className="mb-4"><label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Description</label><textarea className="input min-h-[80px]" value={data.hero.description} onChange={e => setData({ ...data, hero: { ...data.hero, description: e.target.value } })} /></div>
        <div className="mt-8 p-6 bg-[var(--surface)] border border-white/6 rounded-xl">
          <h3 className="text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-4">Preview</h3>
          <span className="inline-block text-xs font-medium tracking-[0.15em] uppercase text-[var(--terracotta)] px-4 py-1.5 border border-[var(--terracotta)]/30 rounded-full w-fit mb-4">{data.hero.tag}</span>
          <h2 className="text-3xl font-bold leading-tight mb-3">{data.hero.titleLine1} <em className="serif-accent">{data.hero.titleLine2}</em> {data.hero.titleLine3}</h2>
          <p className="text-[var(--cream-dim)]">{data.hero.description}</p>
        </div>
      </div>
      {toast && <div className="fixed bottom-8 right-8 bg-[var(--surface)] border border-green-500/30 rounded-xl px-5 py-3.5 flex items-center gap-2.5 text-sm font-medium shadow-[0_10px_40px_rgba(0,0,0,0.4)] z-[10000]"><span>✅</span> {toast}</div>}
    </div>
  );
}
