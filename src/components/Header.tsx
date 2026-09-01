'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-[1200px] mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-[var(--cream)]">
          Dal<span className="text-[var(--terracotta)]">cove</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <a href="#about" className="px-4 py-2 text-sm font-medium text-[var(--cream-dim)] hover:text-[var(--cream)] rounded-lg hover:bg-white/5 transition">About</a>
          <a href="#services" className="px-4 py-2 text-sm font-medium text-[var(--cream-dim)] hover:text-[var(--cream)] rounded-lg hover:bg-white/5 transition">Services</a>
          <a href="#projects" className="px-4 py-2 text-sm font-medium text-[var(--cream-dim)] hover:text-[var(--cream)] rounded-lg hover:bg-white/5 transition">Projects</a>
          <a href="#contact" className="px-4 py-2 text-sm font-semibold bg-[var(--terracotta)] text-[var(--white)] rounded-lg hover:bg-[var(--terracotta-dim)] transition ml-2">Contact</a>
          <Link href="/admin" className="px-3 py-2 text-lg border border-white/10 rounded-lg hover:border-[var(--terracotta)] hover:bg-[var(--terracotta)]/10 transition ml-2" title="Admin Portal">⚙️</Link>
        </nav>

        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span className={`block w-5 h-0.5 bg-[var(--cream)] rounded transition-transform ${mobileOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[var(--cream)] rounded transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-[var(--cream)] rounded transition-transform ${mobileOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[var(--bg-warm)] border-t border-white/5 px-6 pb-6">
          <a href="#about" className="block py-3 text-lg text-[var(--cream-dim)]" onClick={() => setMobileOpen(false)}>About</a>
          <a href="#services" className="block py-3 text-lg text-[var(--cream-dim)]" onClick={() => setMobileOpen(false)}>Services</a>
          <a href="#projects" className="block py-3 text-lg text-[var(--cream-dim)]" onClick={() => setMobileOpen(false)}>Projects</a>
          <a href="#contact" className="block py-3 text-lg text-[var(--terracotta)] font-semibold" onClick={() => setMobileOpen(false)}>Contact</a>
          <Link href="/admin" className="block py-3 text-lg text-[var(--cream-dim)]" onClick={() => setMobileOpen(false)}>⚙️ Admin</Link>
        </div>
      )}
    </header>
  );
}
