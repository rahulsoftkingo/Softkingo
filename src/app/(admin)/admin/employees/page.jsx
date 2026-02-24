// src/app/admin/employeees/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { Search, Plus, Edit2, Trash2, } from 'lucide-react';
import EmployeeDrawer from './EmployeeDrawer';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  async function fetchEmployees(query = '') {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    const res = await fetch(`/api/admin/employees?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setEmployees(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchEmployees(q), 300);
    return () => clearTimeout(t);
  }, [q]);

  const openCreate = () => {
    setEditing(null);
    setDrawerOpen(true);
  };

  const openEdit = (emp) => {
    setEditing(emp);
    setDrawerOpen(true);
  };

  const onSaved = () => {
    setDrawerOpen(false);
    fetchEmployees(q);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this employee?')) return;
    const res = await fetch(`/api/admin/employees/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) fetchEmployees(q);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900">
            Employees directory
          </h1>
          <p className="text-sm text-slate-500">
            Internal list of all employees with basic contact information.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500"
        >
          <Plus className="h-4 w-4" />
          <span>Add employee</span>
        </button>
      </section>

      {/* Search */}
      <section className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.06)] px-4 py-4 sm:px-5 sm:py-5">
        <label className="block text-xs font-medium text-slate-600 mb-1.5">
          Search employees
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, title, department or email"
            className="w-full rounded-full bg-slate-50 px-9 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </section>

      {/* Table – responsive with card view on mobile */}
      <section className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-[0_10px_30px_rgba(15,23,42,0.06)] overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <th className="px-4 py-2.5 sm:px-5">Employee</th>
                <th className="px-4 py-2.5 sm:px-5">Department</th>
                <th className="px-4 py-2.5 sm:px-5">Contact</th>
                <th className="px-4 py-2.5 sm:px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    Loading employees…
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No employees yet.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-t border-slate-100/60 hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-4 py-3 sm:px-5">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                          {emp.photo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={
                                emp.photo.startsWith('http')
                                  ? emp.photo
                                  : emp.photo.startsWith('/')
                                    ? emp.photo
                                    : `/${emp.photo}`
                              }
                              alt={emp.name}
                              className="h-9 w-9 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-xs font-semibold text-slate-700">
                              {emp.name?.[0]?.toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">
                            {emp.name}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            {emp.title || 'No title'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <p className="text-sm text-slate-800">
                        {emp.department || '—'}
                      </p>
                    </td>
                    <td className="px-4 py-3 sm:px-5 text-xs text-slate-600">
                      <p className="truncate">{emp.email || 'No email'}</p>
                      <p className="truncate">{emp.phone || 'No phone'}</p>
                    </td>
                    <td className="px-4 py-3 sm:px-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(emp)}
                          className="inline-flex items-center justify-center rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-100"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(emp.id)}
                          className="inline-flex items-center justify-center rounded-full bg-rose-50 px-2.5 py-1 text-xs text-rose-700 hover:bg-rose-100"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden">
          {loading ? (
            <p className="px-4 py-5 text-sm text-slate-500 text-center">
              Loading employees…
            </p>
          ) : employees.length === 0 ? (
            <p className="px-4 py-5 text-sm text-slate-500 text-center">
              No employees yet.
            </p>
          ) : (
            <div className="divide-y divide-slate-100">
              {employees.map((emp) => (
                <div key={emp.id} className="px-4 py-4 flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {emp.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={
                          emp.photo.startsWith('http')
                            ? emp.photo
                            : emp.photo.startsWith('/')
                              ? emp.photo
                              : `/${emp.photo}`
                        }
                        alt={emp.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-slate-700">
                        {emp.name?.[0]?.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {emp.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {emp.title || 'No title'}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          {emp.department || 'No department'}
                        </p>
                      </div>
                      <button
                        onClick={() => openEdit(emp)}
                        className="inline-flex items-center justify-center rounded-full bg-slate-50 px-2 py-1 text-[11px] text-slate-700"
                      >
                        <Edit2 className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-600 space-y-0.5">
                      <p className="truncate">{emp.email || 'No email'}</p>
                      <p className="truncate">{emp.phone || 'No phone'}</p>
                    </div>
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="inline-flex items-center justify-center rounded-full bg-rose-50 px-2 py-1 text-[11px] text-rose-700"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {drawerOpen && (
        <EmployeeDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onSaved={onSaved}
          editing={editing}
        />
      )}
    </div>
  );
}
