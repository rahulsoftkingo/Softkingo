// src/app/(admin)/admin/hrms/attendance/page.jsx
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Clock, RefreshCcw, Search, Download, Calendar, BarChart3, Users, Award, Zap, AlertTriangle, TrendingUp } from 'lucide-react';

function formatDT(v) {
  if (!v) return '-';
  try { return new Date(v).toLocaleString('en-IN'); } catch { return String(v); }
}

function formatDuration(minutes) {
  if (!minutes) return '0 min';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m`;
}

function StatusBadge({ status, value }) {
  const statusMap = {
    present: { label: 'P', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    absent: { label: 'A', color: 'bg-red-100 text-red-800 border-red-200' },
    leave: { label: 'L', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    halfday: { label: 'H', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    holiday: { label: 'HD', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    late: { label: 'LT', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    overtime: { label: 'OT', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    active: { label: 'A', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    completed: { label: 'C', color: 'bg-blue-100 text-blue-800 border-blue-200' }
  };

  const config = statusMap[status] || { label: status?.toUpperCase().slice(0,2), color: 'bg-gray-100 text-gray-800 border-gray-200' };
  
  return (
    <span className={`px-2.5 py-1.5 rounded-full text-xs font-bold border ${config.color}`}>
      {value || config.label}
    </span>
  );
}

export default function AttendancePage() {
  const [rows, setRows] = useState([]);
  const [stats, setStats] = useState({});
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [q, setQ] = useState('');
  const [period, setPeriod] = useState('month');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const query = useMemo(() => {
    const p = new URLSearchParams();
    p.set('page', String(page));
    p.set('limit', String(limit));
    p.set('period', period);
    if (q.trim()) p.set('q', q.trim());
    return p.toString();
  }, [page, limit, q, period]);

  const load = async () => {
    setLoading(true);
    setErr('');
    try {
      const res = await fetch(`/api/admin/hrms/attendance?${query}`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Failed to load');
      
      setRows(Array.isArray(data?.attendances) ? data.attendances : []);
      setStats(data?.stats || {});
      setTotal(Number(data?.total || 0));
    } catch (e) {
      setErr(e?.message || 'Something went wrong');
      setRows([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    setPage(1);
    load(); 
  }, [query]);

  const pages = Math.max(1, Math.ceil(total / limit));

  const exportData = async () => {
    const res = await fetch(`/api/admin/hrms/attendance/export?period=${period}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance-${period}-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <Clock className="h-8 w-8 text-emerald-600" />
            HR Attendance System
          </h1>
          <p className="text-slate-600 mt-1">Complete analytics: Present, Absent, Overtime, Late, Rest & Salary</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={load} disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold hover:bg-slate-50 shadow-sm"
          >
            <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button onClick={exportData}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-4 py-2.5 text-sm font-bold hover:bg-emerald-700 shadow-sm"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input value={q} onChange={(e) => { setPage(1); setQ(e.target.value); }}
            placeholder="Search by name, email, department..."
            className="w-full rounded-xl border border-slate-200 pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <select value={period} onChange={(e) => { setPage(1); setPeriod(e.target.value); }}
          className="rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500"
        >
          <option value="today">📅 Today</option>
          <option value="week">📊 This Week</option>
          <option value="month">📈 This Month</option>
          <option value="year">📉 This Year</option>
        </select>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Present Days */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-2xl border border-emerald-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-emerald-600" />
            <div className="text-2xl font-black text-emerald-900">{stats.presentDays || 0}</div>
          </div>
          <div className="text-xs font-bold text-emerald-700">Present Days</div>
          <div className="text-xs bg-emerald-200 px-2 py-0.5 rounded-full font-bold text-emerald-900 inline-block mt-1">
            {stats.attendancePercentage?.toFixed(1) || 0}%
          </div>
        </div>

        {/* Absent Days */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-slate-600" />
            <div className="text-2xl font-black text-slate-900">{stats.absentDays || 0}</div>
          </div>
          <div className="text-xs font-bold text-slate-700">Absent Days</div>
          <div className="text-xs text-slate-600 mt-1">{((stats.absentDays / (stats.totalDays || 1)) * 100).toFixed(1)}%</div>
        </div>

        {/* Regular Hours */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-2xl border border-blue-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <div className="text-2xl font-black text-blue-900">{stats.regularHours?.toFixed(1) || 0}h</div>
          </div>
          <div className="text-xs font-bold text-blue-700">Regular Hours</div>
          <div className="text-xs text-blue-600 mt-1">0-8h daily</div>
        </div>

        {/* Overtime */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-2xl border border-amber-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-amber-600" />
            <div className="text-2xl font-black text-amber-900">{stats.overtimeHours?.toFixed(1) || 0}h</div>
          </div>
          <div className="text-xs font-bold text-amber-700">Overtime</div>
          <div className="text-xs text-amber-600 mt-1">8+ hours</div>
        </div>

        {/* Late Days */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-2xl border border-red-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div className="text-2xl font-black text-red-900">{stats.lateDays || 0}</div>
          </div>
          <div className="text-xs font-bold text-red-700">Late Days</div>
          <div className="text-xs text-red-600 mt-1">After 10 AM</div>
        </div>

        {/* Salary Preview */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-2xl border border-purple-200 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-5 w-5 text-purple-600" />
            <div className="text-2xl font-black text-purple-900">₹{(stats.salaryPreview || 0).toFixed(0)}</div>
          </div>
          <div className="text-xs font-bold text-purple-700">Salary Preview</div>
          <div className="text-xs text-purple-600 mt-1">Reg + OT</div>
        </div>
      </div>

      {err && <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{err}</div>}

      {/* TABLE */}
      <div className="rounded-2xl bg-white shadow-xl border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b flex justify-between">
          <div className="text-sm">Records: <span className="font-bold">{total}</span></div>
          <div className="text-sm text-slate-500">Page {page}/{pages} | {period.toUpperCase()}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full w-full">
            <thead className="bg-slate-50 text-xs uppercase text-slate-600">
              <tr>
                <th className="px-6 py-4 text-left font-bold">Employee</th>
                <th className="px-6 py-4 text-left font-bold">Present</th>
                <th className="px-6 py-4 text-left font-bold">Absent</th>
                <th className="px-6 py-4 text-left font-bold">Regular</th>
                <th className="px-6 py-4 text-left font-bold">Overtime</th>
                <th className="px-6 py-4 text-left font-bold">Late</th>
                <th className="px-6 py-4 text-left font-bold">Salary</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y">
              {rows.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                  {loading ? <><RefreshCcw className="h-6 w-6 animate-spin mx-auto mb-2" /> Loading...</> : 'No records'}
                </td></tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.userId} className="hover:bg-emerald-50/30">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{r.userName}</div>
                      <div className="text-xs text-slate-500">{r.department}</div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status="present" value={`P ${r.presentDays}/${stats.totalDays || 0}`} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status="absent" value={`A ${r.absentDays}`} />
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-blue-700">{r.regularHours?.toFixed(1)}h</td>
                    <td className="px-6 py-4 font-mono font-bold text-amber-700">{r.overtimeHours?.toFixed(1)}h</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={r.lateDays > 0 ? 'late' : 'present'} value={r.lateDays > 0 ? `LT ${r.lateDays}` : 'P 0'} />
                    </td>
                    <td className="px-6 py-4 font-bold text-purple-900">₹{r.salaryPreview?.toFixed(0) || 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="px-6 py-4 bg-slate-50 border-t flex justify-between">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1 || loading}
            className="rounded-xl border bg-white px-4 py-2 text-sm font-bold disabled:opacity-50">Previous</button>
          <span className="text-sm py-2">Page {page} of {pages}</span>
          <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page >= pages || loading}
            className="rounded-xl border bg-white px-4 py-2 text-sm font-bold disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  );
}
