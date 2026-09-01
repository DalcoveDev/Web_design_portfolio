'use client';

import { useEffect, useState } from 'react';
import { loadData, saveData } from '@/lib/store';
import { PortfolioData, defaultData } from '@/lib/data';

export default function AdminServices() {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [toast, setToast] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { loadData().then(d => { setData(d); setLoaded(true); }); }, []);

  async function save() { await saveData(data); setToast('Saved!'); setTimeout(() => setToast(''), 2500); }

  function addService() {
    const updated = { ...data, services: [...data.services, { title: 'New Service', description: 'Description...' }] };
    setData(updated); saveData(updated);
    setEditIdx(data.services.length);
  }

  function deleteService(idx: number) {
    if (data.services.length <= 1) return;
    const updated = { ...data, services: data.services.filter((_, i) => i !== idx) };
    setData(updated); saveData(updated);
  }

  function updateService(idx: number, title: string, description: string) {
    const services = [...data.services]; services[idx] = { title, description };
    const updated = { ...data, services };
    setData(updated); saveData(updated);
    setEditIdx(null); setToast('Saved!'); setTimeout(() => setToast(''), 2500);
  }

  if (!loaded) return <div className="text-[var(--cream-dim)]">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold tracking-tight">Services</h1><p className="text-sm text-[var(--cream-dim)] mt-1">{data.services.length} services</p></div>
        <div className="flex gap-2">
          <button onClick={async () => { const d = await loadData(); setData(d); setToast('Refreshed!'); setTimeout(() => setToast(''), 2500); }} className="px-4 py-2.5 border border-white/15 text-sm font-semibold rounded-lg hover:bg-white/5 transition">🔄 Refresh</button>
          <button onClick={addService} className="px-5 py-2.5 bg-[var(--terracotta)] text-white font-semibold rounded-lg hover:bg-[var(--terracotta-dim)] transition">+ Add</button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {data.services.map((s, i) => (
          <div key={i} className="bg-[var(--surface)] border border-white/6 rounded-xl p-5 hover:border-white/12 transition">
            {editIdx === i ? (
              <div className="flex flex-col gap-3">
                <input className="input" value={s.title} onChange={e => { const services = [...data.services]; services[i] = { ...services[i], title: e.target.value }; setData({ ...data, services }); }} />
                <input className="input" value={s.description} onChange={e => { const services = [...data.services]; services[i] = { ...services[i], description: e.target.value }; setData({ ...data, services }); }} />
                <div className="flex gap-2">
                  <button onClick={() => { save(); setEditIdx(null); }} className="px-4 py-2 bg-[var(--terracotta)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--terracotta-dim)] transition">Save</button>
                  <button onClick={() => setEditIdx(null)} className="px-4 py-2 border border-white/15 text-sm font-semibold rounded-lg hover:bg-white/5 transition">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <span className="font-serif italic text-2xl text-[var(--terracotta)] w-9 shrink-0">0{i + 1}</span>
                  <div><h4 className="text-base font-semibold">{s.title}</h4><p className="text-xs text-[var(--cream-dim)] mt-0.5">{s.description}</p></div>
                </div>
                <div className="flex gap-2 shrink-0 ml-4">
                  <button onClick={() => setEditIdx(i)} className="w-8 h-8 flex items-center justify-center bg-white/[0.04] border border-white/6 rounded-lg hover:bg-white/10 transition">✏️</button>
                  <button onClick={() => deleteService(i)} className="w-8 h-8 flex items-center justify-center bg-white/[0.04] border border-white/6 rounded-lg hover:bg-red-500/15 transition">🗑️</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {toast && <div className="fixed bottom-8 right-8 bg-[var(--surface)] border border-green-500/30 rounded-xl px-5 py-3.5 flex items-center gap-2.5 text-sm font-medium shadow-[0_10px_40px_rgba(0,0,0,0.4)] z-[10000]"><span>✅</span> {toast}</div>}
    </div>
  );
}
