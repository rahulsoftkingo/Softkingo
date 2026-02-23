'use client';

import { useEffect, useState } from 'react';
import { Search, Plus, Edit2, Trash2, Users, Briefcase, Star } from 'lucide-react';
import TeamModal from './TeamModal';

export default function TeamPage() {
  const [members, setMembers] = useState([]);
  const [q, setQ] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('active');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
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
    setModalOpen(true);
  };

  const openEdit = (m) => {
    setEditing(m);
    setModalOpen(true);
  };

  const onSaved = () => {
    setModalOpen(false);
    fetchMembers(q, categoryFilter, statusFilter); // Passing all filters for better UX
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this team member?')) return;
    const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' });
    if (res.ok) fetchMembers(q, categoryFilter, statusFilter);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Team Intelligence
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Control the key personnel visible across the platform.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-2xl bg-sky-600 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-sky-100 hover:bg-sky-500 transition-all active:scale-95"
        >
          <Plus size={18} />
          <span>New Associate</span>
        </button>
      </section>

      {/* Search & Filters */}
      <section className="rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.04)] px-6 py-6 sm:px-8 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Search Personnel
            </label>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, title or department"
                className="w-full rounded-2xl bg-slate-50/50 border border-slate-100 px-11 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-2xl bg-slate-50/50 border border-slate-100 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all outline-none"
            >
              <option value="all">All Rankings</option>
              <option value="management">Management</option>
              <option value="tech-lead">Tech Leads</option>
              <option value="employee">Employees</option>
              <option value="intern">Interns</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Employment Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-2xl bg-slate-50/50 border border-slate-100 px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all outline-none"
            >
              <option value="all">Every Status</option>
              <option value="active">Active Members</option>
              <option value="inactive">Currently Inactive</option>
              <option value="alumni">Former Members (Alumni)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid list – responsive cards */}
      <section className="rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.04)] px-6 py-6 sm:px-8 sm:py-8 min-h-[400px]">
        {loading ? (
          <div className="h-40 flex flex-col items-center justify-center gap-3">
            <div className="h-8 w-8 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Compiling Database...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="h-60 flex flex-col items-center justify-center text-center">
            <div className="p-6 bg-slate-50 rounded-full mb-4">
              <Users className="h-12 w-12 text-slate-200" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">No Personnel Found</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-xs">Adjust your search parameters or register a new team member to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {members.map((m) => (
              <article
                key={m.id}
                className="group relative rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Header with Image */}
                <div className="flex items-center gap-5">
                  <div className="h-20 w-20 rounded-[1.5rem] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0 border-4 border-white shadow-xl shadow-slate-100 group-hover:scale-110 transition-transform duration-500">
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
                        className="h-20 w-20 object-cover"
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
                      <span className="text-2xl font-black text-slate-400">
                        {m.name?.[0]?.toUpperCase() || '?'}
                      </span>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-black text-slate-900 truncate tracking-tight leading-none mb-1.5">
                      {m.name}
                    </h3>
                    <p className="text-sm font-bold text-sky-600 truncate mb-1">
                      {m.title || 'Executive Member'}
                    </p>
                    {m.department && (
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-lg">
                        <Briefcase size={10} />
                        {m.department}
                      </div>
                    )}
                  </div>
                </div>

                {/* Category & Status Badges */}
                <div className="flex flex-wrap items-center gap-2 mt-6">
                  <span className={`inline-flex items-center rounded-xl px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border ${m.category === 'management' ? 'bg-purple-50 text-purple-700 border-purple-200 shadow-sm shadow-purple-50' :
                    m.category === 'tech-lead' ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm shadow-blue-50' :
                      m.category === 'intern' ? 'bg-green-50 text-green-700 border-green-200 shadow-sm shadow-green-50' :
                        'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>
                    {m.category || 'employee'}
                  </span>
                  <span className={`inline-flex items-center rounded-xl px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border ${m.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm shadow-emerald-50' :
                    m.status === 'inactive' ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm shadow-amber-50' :
                      'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>
                    {m.status || 'active'}
                  </span>
                  {m.featured && (
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 text-amber-700 border-amber-200 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm shadow-amber-50">
                      <Star size={10} fill="currentColor" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Bio */}
                {m.bio && (
                  <p className="mt-5 text-sm font-medium text-slate-500 line-clamp-2 leading-relaxed italic">
                    "{m.bio}"
                  </p>
                )}

                {/* Footer Actions */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openEdit(m)}
                      className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-sky-600 hover:text-white transition-all shadow-sm"
                      title="Edit Profile"
                    >
                      <Edit2 size={16} />
                    </button>
                    {m.linkedinUrl && (
                      <a
                        href={m.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-all shadow-sm"
                        title="LinkedIn Profile"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-rose-700 hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {modalOpen && (
        <TeamModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSaved={onSaved}
          editing={editing}
        />
      )}
    </div>
  );
}
