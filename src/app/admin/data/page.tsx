'use client';

import { useState } from 'react';
import { exportData, importData, resetData } from '@/lib/store';

export default function AdminData() {
  const [importJson, setImportJson] = useState('');
  const [toast, setToast] = useState('');
  const [showReset, setShowReset] = useState(false);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2500); }

  function handleExport() {
    const json = exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dalcove-portfolio-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported!');
  }

  function handleImport() {
    if (importData(importJson)) {
      showToast('Data imported! Refresh to see changes.');
      setImportJson('');
    } else {
      showToast('Invalid JSON data');
    }
  }

  function handleReset() {
    resetData();
    setShowReset(false);
    showToast('Data reset to defaults! Refresh to see changes.');
  }

  function handleCopyJson() {
    navigator.clipboard.writeText(exportData());
    showToast('JSON copied to clipboard!');
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Data Management</h1>
        <p className="text-sm text-[var(--cream-dim)] mt-1">Import, export, or reset your portfolio data</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-[900px]">
        {/* Export */}
        <div className="bg-[var(--surface)] border border-white/6 rounded-xl p-6">
          <div className="text-2xl mb-3">📤</div>
          <h3 className="text-base font-semibold mb-2">Export Data</h3>
          <p className="text-xs text-[var(--cream-dim)] mb-4">Download your portfolio data as a JSON file</p>
          <div className="flex gap-2">
            <button onClick={handleExport} className="px-4 py-2 bg-[var(--terracotta)] text-[var(--white)] text-sm font-semibold rounded-lg hover:bg-[var(--terracotta-dim)] transition">Download JSON</button>
            <button onClick={handleCopyJson} className="px-4 py-2 border border-white/15 text-sm font-semibold rounded-lg hover:bg-white/5 transition">Copy to Clipboard</button>
          </div>
        </div>

        {/* Import */}
        <div className="bg-[var(--surface)] border border-white/6 rounded-xl p-6">
          <div className="text-2xl mb-3">📥</div>
          <h3 className="text-base font-semibold mb-2">Import Data</h3>
          <p className="text-xs text-[var(--cream-dim)] mb-4">Paste JSON data to restore or update your portfolio</p>
          <textarea
            className="input min-h-[120px] font-mono text-xs mb-3"
            value={importJson}
            onChange={e => setImportJson(e.target.value)}
            placeholder='{"hero": {...}, "projects": [...]}'
          />
          <button onClick={handleImport} disabled={!importJson.trim()} className="px-4 py-2 bg-green-600 text-[var(--white)] text-sm font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-40 disabled:cursor-not-allowed">Import Data</button>
        </div>

        {/* Reset */}
        <div className="bg-[var(--surface)] border border-red-500/20 rounded-xl p-6">
          <div className="text-2xl mb-3">🔄</div>
          <h3 className="text-base font-semibold mb-2">Reset to Defaults</h3>
          <p className="text-xs text-[var(--cream-dim)] mb-4">Reset all data back to the original default values. This cannot be undone.</p>
          {showReset ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-red-400">Are you sure?</span>
              <button onClick={handleReset} className="px-4 py-2 bg-red-600 text-[var(--white)] text-sm font-semibold rounded-lg hover:bg-red-700 transition">Yes, Reset</button>
              <button onClick={() => setShowReset(false)} className="px-4 py-2 border border-white/15 text-sm font-semibold rounded-lg hover:bg-white/5 transition">Cancel</button>
            </div>
          ) : (
            <button onClick={() => setShowReset(true)} className="px-4 py-2 border border-red-500/30 text-red-400 text-sm font-semibold rounded-lg hover:bg-red-500/10 transition">Reset All Data</button>
          )}
        </div>

        {/* Info */}
        <div className="bg-[var(--surface)] border border-white/6 rounded-xl p-6">
          <div className="text-2xl mb-3">ℹ️</div>
          <h3 className="text-base font-semibold mb-2">How It Works</h3>
          <ul className="text-xs text-[var(--cream-dim)] space-y-2">
            <li>• Data is stored in your browser&apos;s localStorage</li>
            <li>• Export before clearing browser data</li>
            <li>• Import to restore on a different browser</li>
            <li>• Changes appear on the portfolio immediately</li>
            <li>• Default password: <code className="bg-white/5 px-1.5 py-0.5 rounded">dalcove2024</code></li>
          </ul>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-8 right-8 bg-[var(--surface)] border border-green-500/30 rounded-xl px-5 py-3.5 flex items-center gap-2.5 text-sm font-medium shadow-[0_10px_40px_rgba(0,0,0,0.4)] z-[10000]">
          <span>✅</span> {toast}
        </div>
      )}
    </div>
  );
}
