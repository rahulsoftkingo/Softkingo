// src/app/admin/hrms/payroll/page.jsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { DollarSign, RefreshCcw } from 'lucide-react';

export default function PayrollPage() {
  const [period, setPeriod] = useState(() => {
    const d = new Date();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `${d.getFullYear()}-${mm}`;
  });

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const query = useMemo(() => {
    const p = new URLSearchParams();
    if (period) p.set('period', period);
    return p.toString();
  }, [period]);

  const load = async () => {
    setLoading(true);
    setErr('');
    try {
      const res = await fetch(`/api/admin/hrms/payroll?${query}`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Failed to load payroll');
      setRows(Array.isArray(data?.salaries) ? data.salaries : []);
    } catch (e) {
      setErr(e?.message || 'Something went wrong');
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalNet = rows.reduce((sum, r) => sum + Number(r.netSalary || 0), 0);

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-sky-600" /> Payroll
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">Period-based payroll overview.</p>
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
        <input
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          placeholder="YYYY-MM"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
          <div className="text-xs text-slate-500">Total net salary (selected period)</div>
          <div className="text-xl font-semibold text-slate-900">{totalNet.toLocaleString()}</div>
        </div>
      </div>

      {err ? (
        <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">{err}</div>
      ) : null}

      <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full">
            <thead className="bg-slate-50 text-xs text-slate-600">
              <tr>
                <th className="text-left px-4 py-3">Employee</th>
                <th className="text-left px-4 py-3">Department</th>
                <th className="text-left px-4 py-3">Base</th>
                <th className="text-left px-4 py-3">Net</th>
                <th className="text-left px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {rows.length === 0 ? (
                <tr><td className="px-4 py-8 text-slate-500" colSpan={5}>{loading ? 'Loading…' : 'No payroll records found.'}</td></tr>
              ) : rows.map((r) => (
                <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{r.user?.name || '—'}</td>
                  <td className="px-4 py-3">{r.user?.department || '—'}</td>
                  <td className="px-4 py-3">{Number(r.baseSalary || 0).toLocaleString()}</td>
                  <td className="px-4 py-3">{Number(r.netSalary || 0).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {r.status || 'paid'}
                    </span>
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
