'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Plus, Tag, Search } from 'lucide-react';

export default function BlogCategoriesPage() {
  const { data: session } = useSession();
  const roles = session?.user?.roles || [];
  const canManage = roles.some((r) =>
    ['admin', 'manager', 'writer'].includes(r),
  );

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [q, setQ] = useState('');

  const filtered = items.filter((c) => {
    const s = q.toLowerCase();
    if (!s) return true;
    return (
      c.name.toLowerCase().includes(s) ||
      c.slug.toLowerCase().includes(s)
    );
  });

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/blog-categories');
    if (res.ok) {
      setItems(await res.json());
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!canManage) return;
    if (!name.trim() || !slug.trim()) {
      setError('Name and slug required.');
      return;
    }
    setSaving(true);
    setError('');
    const res = await fetch('/api/admin/blog-categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), slug: slug.trim() }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.message || 'Failed to create category.');
      setSaving(false);
      return;
    }
    setName('');
    setSlug('');
    setSaving(false);
    load();
  };

  return (
    <div className="space-y-5">
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-sky-600" />
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
              Blog categories
            </h1>
            <p className="text-sm text-slate-500">
              Manage categories used for blog, featured, media, etc.
            </p>
          </div>
        </div>
      </section>

      {/* Create form */}
      {canManage && (
        <section className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-4 sm:p-5 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            New category
          </h2>
          <form
            onSubmit={handleCreate}
            className="grid grid-cols-1 sm:grid-cols-[2fr_2fr_auto] gap-3 items-end"
          >
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="Blog"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Slug
              </label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                placeholder="blog"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-500 disabled:bg-sky-300"
            >
              <Plus className="h-4 w-4" />
              <span>{saving ? 'Saving…' : 'Add'}</span>
            </button>
          </form>
          {error && (
            <p className="text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </section>
      )}

      {/* List + search */}
      <section className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Categories
          </h2>
          <div className="relative w-48">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              className="w-full rounded-full bg-slate-50 pl-7 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500 py-4">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-slate-500 py-4">No categories yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {filtered.map((cat) => (
              <li
                key={cat.id}
                className="flex items-center justify-between py-2.5"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {cat.name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {cat.slug}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
