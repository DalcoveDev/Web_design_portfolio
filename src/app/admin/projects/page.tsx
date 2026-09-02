'use client';

import { useEffect, useState } from 'react';
import { loadData, saveData, generateId } from '@/lib/store';
import { PortfolioData, Project, defaultData } from '@/lib/data';
import FileUpload from '@/components/FileUpload';

export default function AdminProjects() {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { loadData().then(d => { setData(d); setLoaded(true); }); }, []);

  async function save() { await saveData(data); setToast('Saved!'); setTimeout(() => setToast(''), 2500); }

  function handleSave(p: Project) {
    if (editing) {
      const updated = { ...data, projects: data.projects.map(x => x.id === p.id ? p : x) };
      setData(updated); saveData(updated);
    } else {
      const updated = { ...data, projects: [...data.projects, { ...p, id: generateId() }] };
      setData(updated); saveData(updated);
    }
    setShowForm(false); setEditing(null);
    setToast('Saved!'); setTimeout(() => setToast(''), 2500);
  }

  function handleDelete() {
    if (!deleteId) return;
    const updated = { ...data, projects: data.projects.filter(p => p.id !== deleteId) };
    setData(updated); saveData(updated);
    setDeleteId(null);
    setToast('Deleted!'); setTimeout(() => setToast(''), 2500);
  }

  function moveProject(idx: number, dir: -1 | 1) {
    const projects = [...data.projects];
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= projects.length) return;
    [projects[idx], projects[newIdx]] = [projects[newIdx], projects[idx]];
    const updated = { ...data, projects };
    setData(updated); saveData(updated);
  }

  if (!loaded) return <div className="text-[var(--cream-dim)]">Loading...</div>;
  if (showForm) return <ProjectForm project={editing} onSave={handleSave} onCancel={() => { setShowForm(false); setEditing(null); }} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold tracking-tight">Projects</h1><p className="text-sm text-[var(--cream-dim)] mt-1">{data.projects.length} projects</p></div>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="px-5 py-2.5 bg-[var(--terracotta)] text-white font-semibold rounded-lg hover:bg-[var(--terracotta-dim)] transition">+ Add Project</button>
      </div>
      <div className="flex flex-col gap-3">
        {data.projects.map((p, i) => (
          <div key={p.id} className="bg-[var(--surface)] border border-white/6 rounded-xl p-5 flex items-center gap-4 hover:border-white/12 transition">
            <img src={p.image} alt={p.title} className="w-16 h-12 object-cover rounded-lg shrink-0" onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60"><rect fill="%231c1a18" width="100" height="60"/><text x="50" y="35" text-anchor="middle" fill="%23b8b0a4" font-size="20">' + p.icon + '</text></svg>'; }} />
            <div className="flex-1 min-w-0">
              <div className="text-base font-semibold truncate">{p.title} {p.featured && <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 font-semibold">Featured</span>}</div>
              <div className="text-xs text-[var(--cream-dim)] mt-0.5">{p.tag} • {p.tech.slice(0, 3).join(', ')}</div>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button onClick={() => moveProject(i, -1)} disabled={i === 0} className="w-8 h-8 flex items-center justify-center bg-white/[0.04] border border-white/6 rounded-lg text-sm hover:bg-white/10 transition disabled:opacity-30">↑</button>
              <button onClick={() => moveProject(i, 1)} disabled={i === data.projects.length - 1} className="w-8 h-8 flex items-center justify-center bg-white/[0.04] border border-white/6 rounded-lg text-sm hover:bg-white/10 transition disabled:opacity-30">↓</button>
              <button onClick={() => { setEditing(p); setShowForm(true); }} className="w-8 h-8 flex items-center justify-center bg-white/[0.04] border border-white/6 rounded-lg text-sm hover:bg-white/10 transition">✏️</button>
              <button onClick={() => setDeleteId(p.id)} className="w-8 h-8 flex items-center justify-center bg-white/[0.04] border border-white/6 rounded-lg text-sm hover:bg-red-500/15 transition">🗑️</button>
            </div>
          </div>
        ))}
      </div>
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[10001]" onClick={() => setDeleteId(null)}>
          <div className="bg-[var(--surface)] border border-white/10 rounded-2xl p-8 max-w-[400px] w-[90%] text-center" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-semibold mb-2">Delete Project?</h3>
            <p className="text-[var(--cream-dim)] text-sm mb-6">This cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="px-5 py-2.5 border border-white/15 rounded-lg text-sm font-semibold hover:bg-white/5 transition">Cancel</button>
              <button onClick={handleDelete} className="px-5 py-2.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition">Delete</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div className="fixed bottom-8 right-8 bg-[var(--surface)] border border-green-500/30 rounded-xl px-5 py-3.5 flex items-center gap-2.5 text-sm font-medium shadow-[0_10px_40px_rgba(0,0,0,0.4)] z-[10000]"><span>✅</span> {toast}</div>}
    </div>
  );
}

function ProjectForm({ project, onSave, onCancel }: { project: Project | null; onSave: (p: Project) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Project>(project || { id: '', featured: false, icon: '📁', label: 'New Project', tag: '', title: '', description: '', tech: [], github: '', demo: '', image: '', status: 'In Development' });
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">{project ? 'Edit' : 'New'} Project</h1>
        <button onClick={onCancel} className="px-5 py-2.5 border border-white/15 rounded-lg text-sm font-semibold hover:bg-white/5 transition">← Back</button>
      </div>
      <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="max-w-[700px]">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div><label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Title *</label><input className="input" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
          <div><label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Tag</label><input className="input" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} /></div>
        </div>
        <div className="mb-4"><label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Description *</label><textarea className="input min-h-[80px]" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
        <div className="mb-4">
          <FileUpload value={form.image} onChange={url => setForm({ ...form, image: url })} label="Project Image" />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div><label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Emoji</label><input className="input" value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} maxLength={4} /></div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div><label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">GitHub</label><input className="input" value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} /></div>
          <div><label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Demo</label><input className="input" value={form.demo} onChange={e => setForm({ ...form, demo: e.target.value })} /></div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div><label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Tech (comma sep)</label><input className="input" value={form.tech.join(', ')} onChange={e => setForm({ ...form, tech: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })} /></div>
          <div><label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Status</label>
            <select className="input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Project['status'] })}>
              <option>In Development</option><option>Complete</option><option>Production Ready</option>
            </select>
          </div>
        </div>
        <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium mb-6">
          <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="w-[18px] h-[18px] accent-[var(--terracotta)]" />
          Featured (spans full width)
        </label>
        <div className="flex gap-3 pt-6 border-t border-white/6">
          <button type="submit" className="px-5 py-2.5 bg-[var(--terracotta)] text-white font-semibold rounded-lg hover:bg-[var(--terracotta-dim)] transition">Save</button>
          <button type="button" onClick={onCancel} className="px-5 py-2.5 border border-white/15 rounded-lg text-sm font-semibold hover:bg-white/5 transition">Cancel</button>
        </div>
      </form>
    </div>
  );
}
