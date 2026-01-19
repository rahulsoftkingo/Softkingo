// src/app/admin/hrms/employees/page.jsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { Users2, RefreshCcw, Search } from 'lucide-react';

export default function EmployeesPage() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState('');
  const [dept, setDept] = useState('all');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const query = useMemo(() => {
    const p = new URLSearchParams();
    if (q.trim()) p.set('q', q.trim());
    if (dept !== 'all') p.set('department', dept);
    return p.toString();
  }, [q, dept]);

  const load = async () => {
    setLoading(true);
    setErr('');
    try {
      const res = await fetch(`/api/admin/hrms/employees?${query}`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Failed to load employees');
      setRows(Array.isArray(data?.employees) ? data.employees : []);
    } catch (e) {
      setErr(e?.message || 'Something went wrong');
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const departments = useMemo(() => {
    const set = new Set(rows.map(r => r.department).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [rows]);

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2">
            <Users2 className="h-5 w-5 text-sky-600" /> Employees
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">Employee directory + salary status snapshot.</p>
        </div>

        <button
          type="button"
          onClick={load}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search employees..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <select
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          {departments.map((d) => (
            <option key={d} value={d}>{d === 'all' ? 'All departments' : d}</option>
          ))}
        </select>
      </div>

      {err ? (
        <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">{err}</div>
      ) : null}

      <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full">
            <thead className="bg-slate-50 text-xs text-slate-600">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Email</th>
                <th className="text-left px-4 py-3">Department</th>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3">Payroll</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {rows.length === 0 ? (
                <tr><td className="px-4 py-8 text-slate-500" colSpan={5}>{loading ? 'Loading…' : 'No employees found.'}</td></tr>
              ) : rows.map((r) => (
                <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{r.name || '—'}</td>
                  <td className="px-4 py-3 text-slate-700">{r.email || '—'}</td>
                  <td className="px-4 py-3">{r.department || '—'}</td>
                  <td className="px-4 py-3">{r.title || '—'}</td>
                  <td className="px-4 py-3">
                    {r.employeeSalary ? (
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        {r.employeeSalary.status || 'configured'}
                      </span>
                    ) : (
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                        Not set
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
