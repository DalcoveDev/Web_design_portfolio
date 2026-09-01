'use client';

import { useEffect, useState } from 'react';
import { loadData, saveData } from '@/lib/store';
import { PortfolioData, defaultData, Stat } from '@/lib/data';

export default function AdminAbout() {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [toast, setToast] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { loadData().then(d => { setData(d); setLoaded(true); }); }, []);

  async function save() { await saveData(data); setToast('Saved!'); setTimeout(() => setToast(''), 2500); }
  function updateStat(idx: number, field: keyof Stat, value: string) {
    const stats = [...data.about.stats]; stats[idx] = { ...stats[idx], [field]: value };
    setData({ ...data, about: { ...data.about, stats } });
  }
  function removeStat(idx: number) { setData({ ...data, about: { ...data.about, stats: data.about.stats.filter((_, i) => i !== idx) } }); }
  function addStat() { setData({ ...data, about: { ...data.about, stats: [...data.about.stats, { number: '', label: '' }] } }); }

  if (!loaded) return <div className="text-[var(--cream-dim)]">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold tracking-tight">About</h1><p className="text-sm text-[var(--cream-dim)] mt-1">Edit your about section</p></div>
        <button onClick={save} className="px-5 py-2.5 bg-[var(--terracotta)] text-white font-semibold rounded-lg hover:bg-[var(--terracotta-dim)] transition">Save</button>
      </div>
      <div className="max-w-[700px]">
        <div className="mb-4"><label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Heading</label><input className="input" value={data.about.heading} onChange={e => setData({ ...data, about: { ...data.about, heading: e.target.value } })} /></div>
        <div className="mb-4"><label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Description</label><textarea className="input min-h-[100px]" value={data.about.text} onChange={e => setData({ ...data, about: { ...data.about, text: e.target.value } })} /></div>
        <div className="mb-6">
          <label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-2">Stats</label>
          <div className="flex flex-col gap-2 mb-3">
            {data.about.stats.map((s, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input className="input flex-1" value={s.number} onChange={e => updateStat(i, 'number', e.target.value)} placeholder="Number" />
                <input className="input flex-1" value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} placeholder="Label" />
                <button onClick={() => removeStat(i)} className="w-[30px] h-[30px] flex items-center justify-center border border-white/10 rounded-md text-[var(--cream-dim)] hover:border-red-500 hover:text-red-400 transition shrink-0">✕</button>
              </div>
            ))}
          </div>
          <button onClick={addStat} className="px-4 py-2 border border-white/15 text-sm font-semibold rounded-lg hover:bg-white/5 transition">+ Add Stat</button>
        </div>
      </div>
      {toast && <div className="fixed bottom-8 right-8 bg-[var(--surface)] border border-green-500/30 rounded-xl px-5 py-3.5 flex items-center gap-2.5 text-sm font-medium shadow-[0_10px_40px_rgba(0,0,0,0.4)] z-[10000]"><span>✅</span> {toast}</div>}
    </div>
  );
}
