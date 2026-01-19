// src/app/admin/hrms/reports/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { FileBarChart, RefreshCcw } from 'lucide-react';

export default function ReportsPage() {
  const [stats, setStats] = useState({ attendance: 0, leaves: 0, employees: 0 });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const load = async () => {
    setLoading(true);
    setErr('');
    try {
      // optional endpoint: /api/admin/hrms/reports
      const res = await fetch('/api/admin/hrms/reports');
      if (res.status === 404) {
        // fallback minimal view (no API)
        setStats((s) => s);
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Failed to load reports');
      setStats({
        attendance: Number(data?.attendance || 0),
        leaves: Number(data?.leaves || 0),
        employees: Number(data?.employees || 0),
      });
    } catch (e) {
      setErr(e?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 flex items-center gap-2">
            <FileBarChart className="h-5 w-5 text-sky-600" /> Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">High-level HRMS insights (extendable).</p>
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

      {err ? (
        <div className="rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">{err}</div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
          <div className="text-xs text-slate-500">Attendance records</div>
          <div className="text-2xl font-semibold text-slate-900">{stats.attendance}</div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
          <div className="text-xs text-slate-500">Leave requests</div>
          <div className="text-2xl font-semibold text-slate-900">{stats.leaves}</div>
        </div>
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
          <div className="text-xs text-slate-500">Employees</div>
          <div className="text-2xl font-semibold text-slate-900">{stats.employees}</div>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 text-sm text-slate-600">
        Reports page is ready; next step can be exports (CSV), department-wise analytics, payroll totals, and monthly charts.
      </div>
    </div>
  );
}
