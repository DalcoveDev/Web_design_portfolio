'use client';

import { PortfolioData, defaultData } from './data';

const API_BASE = '/api';
const STORAGE_KEY = 'dalcove_portfolio_data';

// Try database first, fall back to localStorage
export async function loadData(): Promise<PortfolioData> {
  try {
    const res = await fetch(`${API_BASE}/portfolio`);
    if (res.ok) {
      const data = await res.json();
      return { ...defaultData, ...data };
    }
  } catch {}
  
  // Fallback to localStorage
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return { ...defaultData, ...JSON.parse(stored) };
    } catch {}
  }
  
  return JSON.parse(JSON.stringify(defaultData));
}

export async function saveData(data: PortfolioData): Promise<boolean> {
  // Save to database
  try {
    const res = await fetch(`${API_BASE}/portfolio`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      // Also save to localStorage as backup
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
      return true;
    }
  } catch {}
  
  // Fallback to localStorage only
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  }
  return false;
}

export async function resetData(): Promise<PortfolioData> {
  const fresh = JSON.parse(JSON.stringify(defaultData));
  await saveData(fresh);
  return fresh;
}

export function exportData(): string {
  if (typeof window === 'undefined') return '{}';
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored || JSON.stringify(defaultData, null, 2);
}

export function importData(json: string): boolean {
  try {
    const data = JSON.parse(json) as PortfolioData;
    if (data.hero && data.projects && data.services) {
      saveData(data);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function generateId(): string {
  return 'p' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Initialize database (call once)
export async function initDatabase(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/setup`, { method: 'POST' });
    return res.ok;
  } catch {
    return false;
  }
}
