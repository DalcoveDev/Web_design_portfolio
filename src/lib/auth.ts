// Simple auth for admin dashboard
// In production, use NextAuth.js or similar

const ADMIN_PASSWORD = 'dalcove2024';
const AUTH_KEY = 'dalcove_admin_auth';

export function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ authenticated: true, timestamp: Date.now() }));
    }
    return true;
  }
  return false;
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const auth = JSON.parse(localStorage.getItem(AUTH_KEY) || '{}');
    // Session expires after 24 hours
    if (auth.authenticated && Date.now() - auth.timestamp < 24 * 60 * 60 * 1000) {
      return true;
    }
    logout();
    return false;
  } catch {
    return false;
  }
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
}
