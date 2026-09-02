'use client';

import { useState, useEffect } from 'react';
import { loadData, saveData } from '@/lib/store';
import type { PortfolioData, BlogPost } from '@/lib/data';
import FileUpload from '@/components/FileUpload';

function BlogForm({ post, onSave, onCancel }: { post?: BlogPost; onSave: (p: BlogPost) => void; onCancel: () => void }) {
  const [form, setForm] = useState<BlogPost>(post || {
    id: 'b' + Date.now().toString(36),
    title: '',
    excerpt: '',
    category: 'Fintech',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    readTime: '5 min read',
    image: '/images/4N0A9359.JPG',
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');

  function addTag() {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput('');
    }
  }

  return (
    <div className="bg-[var(--surface)] border border-white/6 rounded-xl p-6 md:p-8">
      <h2 className="text-xl font-semibold mb-6">{post ? 'Edit Post' : 'New Post'}</h2>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Title *</label>
          <input className="input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Post title" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Category</label>
          <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            <option>Fintech</option>
            <option>AI</option>
            <option>Automation</option>
            <option>Backend</option>
            <option>Frontend</option>
            <option>Blockchain</option>
            <option>Education</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Read Time</label>
          <input className="input" value={form.readTime} onChange={e => setForm({ ...form, readTime: e.target.value })} placeholder="e.g. 5 min read" />
        </div>
        <div className="md:col-span-2">
          <FileUpload value={form.image} onChange={url => setForm({ ...form, image: url })} label="Post Image" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Date</label>
          <input className="input" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Excerpt *</label>
        <textarea className="input min-h-[100px]" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} placeholder="Brief summary of the post..." />
      </div>

      <div className="mb-6">
        <label className="block text-xs font-semibold text-[var(--cream-dim)] uppercase tracking-widest mb-1.5">Tags</label>
        <div className="flex gap-2 mb-2">
          <input className="input flex-1" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Add tag..." />
          <button onClick={addTag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition">+ Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-1 bg-white/5 rounded-md flex items-center gap-1">
              {tag}
              <button onClick={() => setForm({ ...form, tags: form.tags.filter(t => t !== tag) })} className="text-red-400 hover:text-red-300">×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={() => onSave(form)} className="px-5 py-2.5 bg-[var(--terracotta)] text-white font-semibold rounded-lg hover:bg-[var(--terracotta-dim)] transition">Save Post</button>
        <button onClick={onCancel} className="px-5 py-2.5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/5 transition">Cancel</button>
      </div>
    </div>
  );
}

export default function AdminBlog() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BlogPost | undefined>();

  useEffect(() => { loadData().then(setData); }, []);
  if (!data) return <div className="text-[var(--cream-dim)]">Loading...</div>;

  function handleSave(post: BlogPost) {
    const updated: PortfolioData = editing
      ? { ...data!, blog: data!.blog.map(p => p.id === post.id ? post : p) }
      : { ...data!, blog: [...data!.blog, post] };
    setData(updated);
    saveData(updated);
    setShowForm(false);
    setEditing(undefined);
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this post?')) return;
    const updated: PortfolioData = { ...data!, blog: data!.blog.filter(p => p.id !== id) };
    setData(updated);
    saveData(updated);
  }

  if (showForm) return <BlogForm post={editing} onSave={handleSave} onCancel={() => { setShowForm(false); setEditing(undefined); }} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-sm text-[var(--cream-dim)] mt-1">{data.blog.length} posts</p>
        </div>
        <button onClick={() => { setEditing(undefined); setShowForm(true); }} className="px-5 py-2.5 bg-[var(--terracotta)] text-white font-semibold rounded-lg hover:bg-[var(--terracotta-dim)] transition">+ New Post</button>
      </div>

      <div className="space-y-3">
        {data.blog.map((post) => (
          <div key={post.id} className="bg-[var(--surface)] border border-white/6 rounded-xl p-4 flex items-center gap-4 hover:border-white/10 transition">
            <img src={post.image} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 bg-[var(--terracotta)]/10 text-[var(--terracotta)] rounded-full">{post.category}</span>
                <span className="text-xs text-[var(--cream-dim)]">{post.date}</span>
                <span className="text-xs text-[var(--cream-dim)]">· {post.readTime}</span>
              </div>
              <h3 className="font-semibold truncate">{post.title}</h3>
              <p className="text-xs text-[var(--cream-dim)] truncate">{post.excerpt}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => { setEditing(post); setShowForm(true); }} className="w-8 h-8 flex items-center justify-center bg-white/[0.04] border border-white/6 rounded-lg text-sm hover:bg-white/10 transition">✏️</button>
              <button onClick={() => handleDelete(post.id)} className="w-8 h-8 flex items-center justify-center bg-white/[0.04] border border-white/6 rounded-lg text-sm hover:bg-red-500/10 hover:border-red-500/30 transition">🗑️</button>
            </div>
          </div>
        ))}
        {data.blog.length === 0 && (
          <div className="text-center py-12 text-[var(--cream-dim)]">
            <p className="text-lg mb-2">No blog posts yet</p>
            <p className="text-sm">Click &quot;+ New Post&quot; to create your first post</p>
          </div>
        )}
      </div>
    </div>
  );
}
