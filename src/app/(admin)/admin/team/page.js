'use client';

import { useEffect, useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import TeamDrawer from './TeamDrawer';

export default function TeamPage() {
  const [members, setMembers] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  async function fetchMembers(query = '') {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    const res = await fetch(`/api/admin/team?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setMembers(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchMembers(q), 300);
    return () => clearTimeout(t);
  }, [q]);

  const openCreate = () => {
    setEditing(null);
    setDrawerOpen(true);
  };

  const openEdit = (m) => {
    setEditing(m);
    setDrawerOpen(true);
  };

  const onSaved = () => {
    setDrawerOpen(false);
    fetchMembers(q);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this team member?')) return;
    const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' });
    if (res.ok) fetchMembers(q);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Team members
          </h1>
          <p className="text-sm text-slate-500">
            Manage key people shown on the website team section.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500"
        >
          <Plus className="h-4 w-4" />
          <span>Add member</span>
        </button>
      </section>

      {/* Search */}
      <section className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.06)] px-4 py-4 sm:px-5 sm:py-5">
        <label className="block text-xs font-medium text-slate-600 mb-1.5">
          Search team
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, title or department"
            className="w-full rounded-full bg-slate-50 px-9 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </section>

      {/* Grid list – responsive cards */}
      <section className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.06)] px-4 py-4 sm:px-5 sm:py-5">
        {loading ? (
          <p className="text-sm text-slate-500 text-center py-6">
            Loading team members…
          </p>
        ) : members.length === 0 ? (
          <p className="text-sm text-slate-500 text-center py-6">
            No team members yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {members.map((m) => (
              <article
                key={m.id}
                className="rounded-2xl bg-slate-50 p-4 flex gap-3 items-start"
              >
                <div className="h-14 w-14 rounded-2xl bg-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={
                        m.photo.startsWith('http')
                          ? m.photo
                          : m.photo.startsWith('/')
                          ? m.photo
                          : `/${m.photo}`
                      }
                      alt={m.name}
                      className="h-14 w-14 object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-slate-700">
                      {m.name?.[0]?.toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {m.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {m.title || 'No title'} · {m.department || '—'}
                      </p>
                    </div>
                    <button
                      onClick={() => openEdit(m)}
                      className="inline-flex items-center justify-center rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-200"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  {m.featured && (
                    <p className="mt-1 inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                      Featured
                    </p>
                  )}
                  {m.bio && (
                    <p className="mt-2 text-xs text-slate-600 line-clamp-2">
                      {m.bio}
                    </p>
                  )}
                  <div className="mt-3 flex items-center justify-between gap-2">
                    {m.linkedinUrl ? (
                      <a
                        href={m.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-sky-600 hover:text-sky-700 underline"
                      >
                        View LinkedIn
                      </a>
                    ) : (
                      <span className="text-[11px] text-slate-400">
                        No LinkedIn
                      </span>
                    )}
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="inline-flex items-center justify-center rounded-full bg-rose-50 px-2 py-1 text-[11px] text-rose-700 hover:bg-rose-100"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {drawerOpen && (
        <TeamDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onSaved={onSaved}
          editing={editing}
        />
      )}
    </div>
  );
}
