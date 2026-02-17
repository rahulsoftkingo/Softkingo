'use client';

import { useEffect, useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import TeamDrawer from './TeamDrawer';

export default function TeamPage() {
  const [members, setMembers] = useState([]);
  const [q, setQ] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('active');
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  async function fetchMembers(query = '', category = 'all', status = 'active') {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (category !== 'all') params.set('category', category);
    if (status !== 'all') params.set('status', status);
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
    const t = setTimeout(() => fetchMembers(q, categoryFilter, statusFilter), 300);
    return () => clearTimeout(t);
  }, [q, categoryFilter, statusFilter]);

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

      {/* Search & Filters */}
      <section className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.06)] px-4 py-4 sm:px-5 sm:py-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
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
          </div>
          
          {/* Category Filter */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-lg bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All Categories</option>
              <option value="management">Management</option>
              <option value="tech-lead">Tech Leads</option>
              <option value="employee">Employees</option>
              <option value="intern">Interns</option>
            </select>
          </div>
          
          {/* Status Filter */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-lg bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>
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
                className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Header with Image */}
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                    {m.photo ? (
                      <img
                        src={
                          m.photo.startsWith('http')
                            ? m.photo
                            : m.photo.startsWith('/')
                            ? m.photo
                            : `/uploads/${m.photo}`
                        }
                        alt={m.name}
                        className="h-16 w-16 object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className="w-full h-full flex items-center justify-center bg-slate-100"
                      style={{ display: m.photo ? 'none' : 'flex' }}
                    >
                      <span className="text-lg font-bold text-slate-600">
                        {m.name?.[0]?.toUpperCase() || '?'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Info Section */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-slate-900 truncate mb-1">
                          {m.name}
                        </h3>
                        <p className="text-sm text-slate-600 truncate mb-2">
                          {m.title || 'No title'}
                        </p>
                        {m.department && (
                          <p className="text-xs text-slate-500 truncate">
                            {m.department}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => openEdit(m)}
                        className="inline-flex items-center justify-center rounded-lg bg-slate-100 p-2 text-slate-700 hover:bg-slate-200 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Category & Status Badges */}
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${
                    m.category === 'management' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                    m.category === 'tech-lead' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    m.category === 'intern' ? 'bg-green-50 text-green-700 border-green-200' :
                    'bg-slate-50 text-slate-700 border-slate-200'
                  }`}>
                    {m.category || 'employee'}
                  </span>
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${
                    m.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    m.status === 'inactive' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-slate-50 text-slate-700 border-slate-200'
                  }`}>
                    {m.status || 'active'}
                  </span>
                  {m.featured && (
                    <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 border-amber-200 px-3 py-1 text-xs font-medium">
                      ⭐ Featured
                    </span>
                  )}
                </div>
                
                {/* Bio */}
                {m.bio && (
                  <p className="mt-3 text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {m.bio}
                  </p>
                )}
                
                {/* Footer Actions */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  {m.linkedinUrl ? (
                    <a
                      href={m.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700 font-medium"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">
                      No LinkedIn
                    </span>
                  )}
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                    Remove
                  </button>
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
