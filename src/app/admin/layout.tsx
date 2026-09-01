'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated, logout } from '@/lib/auth';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/hero', label: 'Hero Section', icon: '🎬' },
  { href: '/admin/about', label: 'About', icon: '👤' },
  { href: '/admin/services', label: 'Services', icon: '🛠️' },
  { href: '/admin/projects', label: 'Projects', icon: '📁' },
  { href: '/admin/contact', label: 'Contact', icon: '📬' },
  { href: '/admin/data', label: 'Data Import/Export', icon: '💾' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setReady(true);
      return;
    }
    if (!isAuthenticated()) {
      router.push('/admin/login');
    } else {
      setReady(true);
    }
  }, [pathname, router]);

  if (!ready) return null;

  // Login page — no admin shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      {/* Grain */}
      <div className="grain fixed inset-0 pointer-events-none opacity-20 z-0" />

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 w-[260px] bg-[var(--surface)] border-r border-white/6 flex flex-col z-50 transition-transform duration-300 max-md:${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/6">
          <Link href="/" className="text-xl font-bold text-[var(--cream)] block">
            Dal<span className="text-[var(--terracotta)]">cove</span>
          </Link>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[0.65rem] font-semibold tracking-widest uppercase bg-[var(--terracotta)] text-[var(--white)] px-2.5 py-0.5 rounded-full">Admin</span>
            <span className="text-[0.65rem] text-[var(--cream-dim)]">v1.0</span>
          </div>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition mb-0.5 ${
                pathname === item.href
                  ? 'text-[var(--cream)] bg-[var(--terracotta)]/10 font-semibold'
                  : 'text-[var(--cream-dim)] hover:text-[var(--cream)] hover:bg-white/5'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-white/6">
          <Link href="/" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[var(--cream-dim)] rounded-lg hover:bg-white/5 transition mb-1">
            <span className="text-lg">🌐</span> View Portfolio
          </Link>
          <button
            onClick={() => { logout(); router.push('/admin/login'); }}
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-400 rounded-lg hover:bg-red-500/10 transition w-full text-left"
          >
            <span className="text-lg">🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-[60px] bg-[var(--surface)] border-b border-white/6 px-4 flex items-center justify-between z-[200]">
        <button className="flex flex-col gap-1 p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <span className="block w-5 h-0.5 bg-[var(--cream)] rounded" />
          <span className="block w-5 h-0.5 bg-[var(--cream)] rounded" />
          <span className="block w-5 h-0.5 bg-[var(--cream)] rounded" />
        </button>
        <span className="text-sm font-semibold text-[var(--cream-dim)]">Admin Portal</span>
        <Link href="/" className="text-lg p-2">🌐</Link>
      </div>

      {/* Main */}
      <main className="flex-1 md:ml-[260px] p-8 max-md:mt-[60px] max-md:p-5 relative z-10">
        {children}
      </main>
    </div>
  );
}
