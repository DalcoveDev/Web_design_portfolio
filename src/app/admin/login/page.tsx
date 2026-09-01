'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, isAuthenticated } from '@/lib/auth';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/admin');
    }
    setLoading(false);
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (login(password)) {
      router.push('/admin');
    } else {
      setError('Invalid password. Try again.');
      setPassword('');
    }
  }

  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <div className="grain fixed inset-0 pointer-events-none opacity-30 z-0" />

      <div className="relative z-10 w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--cream)] mb-2">
            Dal<span className="text-[var(--terracotta)]">cove</span>
          </h1>
          <p className="text-sm text-[var(--cream-dim)]">Admin Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-[var(--surface)] border border-white/6 rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-[var(--terracotta)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[var(--cream)]">Welcome back</h2>
            <p className="text-sm text-[var(--cream-dim)] mt-1">Enter your password to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--bg-warm)] border border-white/10 rounded-lg text-[var(--cream)] text-base focus:outline-none focus:border-[var(--terracotta)] transition"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>

            {error && (
              <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[var(--terracotta)] text-[var(--white)] font-semibold rounded-lg hover:bg-[var(--terracotta-dim)] transition-all shadow-[0_4px_20px_rgba(196,93,62,0.3)] hover:shadow-[0_8px_30px_rgba(196,93,62,0.4)]"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/6 text-center">
            <a href="/" className="text-xs text-[var(--cream-dim)] hover:text-[var(--terracotta)] transition">
              ← Back to Portfolio
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[var(--cream-dim)]/50 mt-6">
          Session expires in 24 hours
        </p>
      </div>
    </div>
  );
}
