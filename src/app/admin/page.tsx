'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadData, initDatabase } from '@/lib/store';
import { PortfolioData, defaultData } from '@/lib/data';

export default function AdminDashboard() {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [dbStatus, setDbStatus] = useState<'loading' | 'connected' | 'offline'>('loading');

  async function init() {
    setDbStatus('loading');
    const connected = await initDatabase();
    setDbStatus(connected ? 'connected' : 'offline');
    const d = await loadData();
    setData(d);
  }

  useEffect(() => { init(); }, []);

  const projects = data.projects;
  const services = data.services;
  const stats = [
    { icon: '📁', number: projects.length, label: 'Projects', color: 'bg-blue-500/10 text-blue-400' },
    { icon: '🛠️', number: services.length, label: 'Services', color: 'bg-purple-500/10 text-purple-400' },
    { icon: '⭐', number: projects.filter(p => p.featured).length, label: 'Featured', color: 'bg-yellow-500/10 text-yellow-400' },
    { icon: '✅', number: projects.filter(p => p.status === 'Production Ready').length, label: 'Live', color: 'bg-green-500/10 text-green-400' },
  ];

  const sections = [
    { href: '/admin/hero', label: 'Hero Section', desc: 'Edit title, tagline, and description', icon: '🎬' },
    { href: '/admin/about', label: 'About', desc: 'Edit heading, bio, and stats', icon: '👤' },
    { href: '/admin/services', label: 'Services', desc: 'Manage service offerings', icon: '🛠️' },
    { href: '/admin/projects', label: 'Projects', desc: 'Add, edit, delete, reorder projects', icon: '📁' },
    { href: '/admin/contact', label: 'Contact', desc: 'Edit email and social links', icon: '📬' },
    { href: '/admin/data', label: 'Data', desc: 'Import/export portfolio data', icon: '💾' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-[var(--cream-dim)] mt-1">Manage your portfolio content</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={init} className="px-3 py-1.5 text-xs font-medium border border-white/10 rounded-lg hover:bg-white/5 transition">🔄 Refresh</button>
          <span className={`w-2 h-2 rounded-full ${dbStatus === 'connected' ? 'bg-green-500' : dbStatus === 'offline' ? 'bg-yellow-500' : 'bg-gray-500'}`} />
          <span className="text-xs text-[var(--cream-dim)]">{dbStatus === 'connected' ? 'Database connected' : dbStatus === 'offline' ? 'Using localStorage' : 'Connecting...'}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-[var(--surface)] border border-white/6 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg text-xl ${s.color}`}>{s.icon}</div>
            </div>
            <span className="text-2xl font-bold block">{s.number}</span>
            <span className="text-xs text-[var(--cream-dim)] uppercase tracking-widest">{s.label}</span>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-semibold tracking-widest uppercase text-[var(--cream-dim)] mb-4">Manage Sections</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {sections.map((s) => (
          <Link key={s.href} href={s.href} className="bg-[var(--surface)] border border-white/6 rounded-xl p-5 hover:border-[var(--terracotta)]/30 hover:bg-[var(--terracotta)]/5 transition group">
            <div className="text-2xl mb-3">{s.icon}</div>
            <h3 className="text-base font-semibold mb-1 group-hover:text-[var(--terracotta)] transition">{s.label}</h3>
            <p className="text-xs text-[var(--cream-dim)]">{s.desc}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-sm font-semibold tracking-widest uppercase text-[var(--cream-dim)] mb-4">Recent Projects</h2>
      <div className="bg-[var(--surface)] border border-white/6 rounded-xl overflow-hidden">
        {projects.slice(0, 5).map((p) => (
          <div key={p.id} className="flex items-center justify-between px-5 py-3.5 border-b border-white/6 last:border-0 hover:bg-white/[0.02] transition">
            <div className="flex items-center gap-3">
              <img src={p.image} alt="" className="w-10 h-7 object-cover rounded" />
              <span className="text-sm font-medium">{p.title}</span>
              {p.featured && <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 font-semibold">Featured</span>}
            </div>
            <span className={`text-[0.65rem] font-semibold px-2.5 py-0.5 rounded-full ${
              p.status === 'Production Ready' ? 'bg-green-500/15 text-green-400' :
              p.status === 'In Development' ? 'bg-yellow-500/15 text-yellow-400' :
              'bg-white/10 text-[var(--cream-dim)]'
            }`}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
