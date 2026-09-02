'use client';

import { useState, useRef } from 'react';

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  label?: string;
}

export default function FileUpload({ value, onChange, accept = 'image/*', label = 'Upload Image' }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.url) {
        onChange(data.url);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }

  return (
    <div>
      <label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">{label}</label>

      {/* Current preview */}
      {value && (
        <div className="relative mb-3 group">
          <img src={value} alt="Preview" className="w-full h-40 object-cover rounded-lg border border-white/10" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition"
          >
            ✕
          </button>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-[var(--terracotta)] bg-[var(--terracotta)]/5'
            : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
        }`}
      >
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--cream-dim)]">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
            Uploading...
          </div>
        ) : (
          <div>
            <div className="text-2xl mb-2">📁</div>
            <p className="text-sm text-[var(--cream-dim)]">Drag & drop or <span className="text-[var(--terracotta)] font-medium">click to browse</span></p>
            <p className="text-xs text-[var(--cream-dim)]/50 mt-1">JPG, PNG, GIF, WebP, SVG — max 10MB</p>
          </div>
        )}
      </div>

      {/* URL input (manual) */}
      <div className="mt-2">
        <input
          className="input text-xs"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Or paste image URL..."
        />
      </div>

      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}
