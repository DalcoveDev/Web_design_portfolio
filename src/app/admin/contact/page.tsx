'use client';

import { useEffect, useState } from 'react';
import { loadData, saveData } from '@/lib/store';
import { PortfolioData, defaultData } from '@/lib/data';

export default function AdminContact() {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [toast, setToast] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { loadData().then(d => { setData(d); setLoaded(true); }); }, []);

  async function save() { await saveData(data); setToast('Saved!'); setTimeout(() => setToast(''), 2500); }

  if (!loaded) return <div className="text-[var(--cream-dim)]">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold tracking-tight">Contact</h1><p className="text-sm text-[var(--cream-dim)] mt-1">Edit contact information</p></div>
        <button onClick={save} className="px-5 py-2.5 bg-[var(--terracotta)] text-white font-semibold rounded-lg hover:bg-[var(--terracotta-dim)] transition">Save</button>
      </div>
      <div className="max-w-[700px]">
        <div className="mb-4"><label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Email</label><input className="input" type="email" value={data.contact.email} onChange={e => setData({ ...data, contact: { ...data.contact, email: e.target.value } })} /></div>
        <div className="mb-4"><label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">GitHub URL</label><input className="input" value={data.contact.github} onChange={e => setData({ ...data, contact: { ...data.contact, github: e.target.value } })} /></div>
        <div className="mb-4"><label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Instagram URL</label><input className="input" value={data.contact.instagram} onChange={e => setData({ ...data, contact: { ...data.contact, instagram: e.target.value } })} /></div>
      </div>
      {toast && <div className="fixed bottom-8 right-8 bg-[var(--surface)] border border-green-500/30 rounded-xl px-5 py-3.5 flex items-center gap-2.5 text-sm font-medium shadow-[0_10px_40px_rgba(0,0,0,0.4)] z-[10000]"><span>✅</span> {toast}</div>}
    </div>
  );
}
