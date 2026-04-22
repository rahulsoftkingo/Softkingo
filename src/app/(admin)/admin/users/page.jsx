'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Search, Plus, Filter, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import UserDrawer from './UserDrawer';

function getStatusBadge(status) {
  const base =
    'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium';
  if (status === 'active') {
    return (
      <span className={`${base} bg-emerald-50 text-emerald-700`}>
        Active
      </span>
    );
  }
  if (status === 'suspended') {
    return (
      <span className={`${base} bg-rose-50 text-rose-700`}>
        Suspended
      </span>
    );
  }
  return <span className={`${base} bg-slate-50 text-slate-600`}>{status}</span>;
}

export default function UsersPage() {
  const { data: session } = useSession();
  const roles = session?.user?.roles || [];
  const isAdmin = roles.includes('admin');
  const isManager = roles.includes('manager');

  const [users, setUsers] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [role, setRole] = useState('all');
  const [loading, setLoading] = useState(true);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // simple pagination (client-side)
  const [page, setPage] = useState(1);
  const pageSize = 10;

  async function fetchRoles() {
    const res = await fetch('/api/admin/roles');
    if (res.ok) {
      const data = await res.json();
      setAllRoles(data);
    }
  }

  async function fetchUsers(params = {}) {
    setLoading(true);
    const search = new URLSearchParams({
      q: params.q ?? q,
      status: params.status ?? status,
      role: params.role ?? role,
    });
    const res = await fetch(`/api/admin/users?${search.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
      setPage(1); // reset page on new search/filter
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchRoles();
    fetchUsers();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUsers({ q, status, role });
    }, 300);
    return () => clearTimeout(timeout);
  }, [q, status, role]);

  const openCreate = () => {
    setEditingUser(null);
    setDrawerOpen(true);
  };

  const openEdit = (user) => {
    if (!isAdmin) return;
    setEditingUser(user);
    setDrawerOpen(true);
  };

  const onSaved = () => {
    setDrawerOpen(false);
    fetchUsers();
  };

  const handleDelete = async (userId) => {
    if (!isAdmin) return;
    if (!confirm('Delete this user?')) return;
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: 'DELETE',
    });
    if (res.ok) fetchUsers();
  };

  // pagination slice
  const total = users.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleUsers = users.slice(startIndex, startIndex + pageSize);

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
            User management
          </h1>
          <p className="text-sm text-slate-500">
            Manage admin, managers, writers and agents in one place.
          </p>
        </div>
        {(isAdmin || isManager) && (
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500"
          >
            <Plus className="h-4 w-4" />
            <span>Add user</span>
          </button>
        )}
      </section>

      {/* Filters */}
      <section className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.06)] px-4 py-4 sm:px-5 sm:py-5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          <Filter className="h-3.5 w-3.5" />
          <span>Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-5">
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, email or username"
                className="w-full rounded-full bg-slate-50 px-9 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-full bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <div className="md:col-span-4">
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-full bg-slate-50 px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All</option>
              {allRoles.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.displayName || r.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.06)] overflow-hidden">
        <div className="px-4 py-3 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-sm text-slate-600">
            Showing{' '}
            <span className="font-semibold">
              {visibleUsers.length}
            </span>{' '}
            of <span className="font-semibold">{total}</span> users
          </p>
          {totalPages > 1 && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <button
                onClick={() => canPrev && setPage((p) => p - 1)}
                disabled={!canPrev}
                className="inline-flex items-center justify-center rounded-full bg-slate-50 px-2 py-1 disabled:opacity-40"
              >
                <ChevronLeft className="h-3 w-3" />
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => canNext && setPage((p) => p + 1)}
                disabled={!canNext}
                className="inline-flex items-center justify-center rounded-full bg-slate-50 px-2 py-1 disabled:opacity-40"
              >
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <th className="px-4 py-2.5 sm:px-5">User</th>
                <th className="px-4 py-2.5 sm:px-5">Roles</th>
                <th className="px-4 py-2.5 sm:px-5">Status</th>
                <th className="px-4 py-2.5 sm:px-5">Created</th>
                <th className="px-4 py-2.5 sm:px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    Loading users…
                  </td>
                </tr>
              ) : visibleUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No users match the current filters.
                  </td>
                </tr>
              ) : (
                visibleUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-slate-100/60 hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-4 py-3 sm:px-5">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                          {user.profileImage ? (
                            <Image
                              src={
                                user.profileImage.startsWith('http') || user.profileImage.startsWith('data:')
                                  ? user.profileImage
                                  : user.profileImage.startsWith('/')
                                  ? user.profileImage
                                  : `/${user.profileImage}`
                              }
                              alt={user.name || user.username}
                              width={36}
                              height={36}
                              className="h-9 w-9 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-xs font-semibold text-slate-700">
                              {user.name?.[0]?.toUpperCase() ||
                                user.username?.[0]?.toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">
                            {user.name || user.username}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            {user.email || 'No email set'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <div className="flex flex-wrap gap-1">
                        {user.roles?.length ? (
                          user.roles.map((ur) => (
                            <span
                              key={ur.id}
                              className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[11px] text-slate-700"
                            >
                              {ur.role.displayName || ur.role.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400">
                            No role
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-4 py-3 sm:px-5 text-xs text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <div className="flex items-center justify-end gap-2">
                        {isAdmin && (
                          <>
                            <button
                              onClick={() => openEdit(user)}
                              className="inline-flex items-center justify-center rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-100"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="inline-flex items-center justify-center rounded-full bg-rose-50 px-2.5 py-1 text-xs text-rose-700 hover:bg-rose-100"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden border-t border-slate-100/80">
          {loading ? (
            <p className="px-4 py-5 text-sm text-slate-500 text-center">
              Loading users…
            </p>
          ) : visibleUsers.length === 0 ? (
            <p className="px-4 py-5 text-sm text-slate-500 text-center">
              No users match the current filters.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {visibleUsers.map((user) => (
                <div key={user.id} className="px-4 py-4 flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {user.profileImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={
                          user.profileImage.startsWith('http') || user.profileImage.startsWith('data:')
                            ? user.profileImage
                            : user.profileImage.startsWith('/')
                            ? user.profileImage
                            : `/${user.profileImage}`
                        }
                        alt={user.name || user.username}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-slate-700">
                        {user.name?.[0]?.toUpperCase() ||
                          user.username?.[0]?.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {user.name || user.username}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {user.email || 'No email set'}
                        </p>
                      </div>
                      <div className="ml-2">{getStatusBadge(user.status)}</div>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {user.roles?.length ? (
                          user.roles.map((ur) => (
                            <span
                              key={ur.id}
                              className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[11px] text-slate-700"
                            >
                              {ur.role.displayName || ur.role.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400">
                            No role
                          </span>
                        )}
                      </div>
                      {isAdmin && (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => openEdit(user)}
                            className="inline-flex items-center justify-center rounded-full bg-slate-50 px-2 py-1 text-[11px] text-slate-700"
                          >
                            <Edit2 className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="inline-flex items-center justify-center rounded-full bg-rose-50 px-2 py-1 text-[11px] text-rose-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {drawerOpen && (
        <UserDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onSaved={onSaved}
          roles={allRoles}
          editingUser={editingUser}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
}
