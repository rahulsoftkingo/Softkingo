'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Calendar, 
  Users, 
  Clock, 
  FileText, 
  User, 
  BarChart3,
  Timer,
  ExternalLink,
  Search,
  Download,
  ChevronDown,
  ChevronUp,
  Ticket
} from 'lucide-react';
import Link from 'next/link';

export default function DailyReportsPage() {
  const { data: session } = useSession();
  const roles = session?.user?.roles || [];
  const isAdminOrManager = roles.some((r) => ['admin', 'manager'].includes(r));

  // Date Range Logic
  const today = new Date().toISOString().split('T')[0];
  const [range, setRange] = useState({
    startDate: today,
    endDate: today,
    label: 'Today'
  });
  const [showRangePicker, setShowRangePicker] = useState(false);

  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('all');
  const [loading, setLoading] = useState(true);

  const presets = [
    { label: 'Today', getValue: () => ({ start: today, end: today }) },
    { label: 'Yesterday', getValue: () => {
      const d = new Date(); d.setDate(d.getDate() - 1);
      const s = d.toISOString().split('T')[0];
      return { start: s, end: s };
    }},
    { label: 'This Week', getValue: () => {
      const d = new Date();
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
      const start = new Date(d.setDate(diff)).toISOString().split('T')[0];
      return { start, end: today };
    }},
    { label: 'This Month', getValue: () => {
      const d = new Date();
      const start = new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split('T')[0];
      return { start, end: today };
    }}
  ];

  const fetchUsers = async () => {
    if (!isAdminOrManager) return;
    const res = await fetch('/api/admin/users?status=active&role=all');
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
    }
  };

  const fetchLogs = async () => {
    setLoading(true);
    const params = new URLSearchParams({ 
      startDate: range.startDate,
      endDate: range.endDate
    });
    if (isAdminOrManager && selectedUserId !== 'all') {
      params.append('userId', selectedUserId);
    }
    const res = await fetch(`/api/admin/work-logs?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setLogs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [range, selectedUserId]);

  const analytics = useMemo(() => {
    const totalMins = logs.reduce((acc, l) => acc + (l.duration || 0), 0);
    const uniqueUsers = new Set(logs.map(l => l.userId)).size;
    const uniqueTickets = new Set(logs.filter(l => l.ticketId).map(l => l.ticketId)).size;
    
    // Employee Breakdown
    const empMap = {};
    logs.forEach(l => {
      const name = l.user?.name || l.user?.username || 'Unknown';
      empMap[name] = (empMap[name] || 0) + (l.duration || 0);
    });
    const employeeBreakdown = Object.entries(empMap)
      .map(([name, mins]) => ({ name, mins, percent: (mins / totalMins) * 100 }))
      .sort((a, b) => b.mins - a.mins);

    // Ticket Breakdown
    const ticketMap = {};
    logs.forEach(l => {
      const title = l.ticket?.title || 'No Ticket/Internal';
      ticketMap[title] = (ticketMap[title] || 0) + (l.duration || 0);
    });
    const ticketBreakdown = Object.entries(ticketMap)
      .map(([title, mins]) => ({ title, mins, percent: (mins / totalMins) * 100 }))
      .sort((a, b) => b.mins - a.mins);

    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    
    return {
      totalTime: `${h}h ${m}m`,
      userCount: uniqueUsers,
      ticketCount: uniqueTickets,
      logCount: logs.length,
      employeeBreakdown,
      ticketBreakdown
    };
  }, [logs]);

  const exportCSV = () => {
    const headers = ['Date', 'Employee', 'Ticket ID', 'Ticket Title', 'Description', 'Start Time', 'End Time', 'Duration (mins)'];
    const rows = logs.map(l => [
      new Date(l.date).toLocaleDateString(),
      l.user?.name || l.user?.username,
      l.ticketId || 'N/A',
      l.ticket?.title || 'N/A',
      `"${l.description.replace(/"/g, '""')}"`,
      l.startTime || '',
      l.endTime || '',
      l.duration
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `work_report_${range.startDate}_to_${range.endDate}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-sky-600" />
            Work Analytics Dashboard
          </h1>
          <p className="text-sm text-slate-500 font-medium">Enterprise insights into team work distribution.</p>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="relative">
              <button 
                onClick={() => setShowRangePicker(!showRangePicker)}
                className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-sm text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
              >
                <Calendar className="h-4 w-4 text-sky-500" />
                {range.label}: {new Date(range.startDate).toLocaleDateString()} - {new Date(range.endDate).toLocaleDateString()}
                {showRangePicker ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>

              {showRangePicker && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in duration-200">
                  <div className="space-y-2 mb-4 pb-4 border-b border-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Presets</p>
                    <div className="grid grid-cols-2 gap-2">
                       {presets.map(p => (
                         <button 
                           key={p.label}
                           onClick={() => {
                             const v = p.getValue();
                             setRange({ startDate: v.start, endDate: v.end, label: p.label });
                             setShowRangePicker(false);
                           }}
                           className="text-xs font-bold px-3 py-2 rounded-md bg-slate-50 hover:bg-sky-50 hover:text-sky-600 text-slate-600 transition-all border border-transparent hover:border-sky-100"
                         >
                           {p.label}
                         </button>
                       ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Custom Range</p>
                     <div className="space-y-2">
                        <div className="flex flex-col gap-1">
                           <span className="text-[10px] font-bold text-slate-500">Starts</span>
                           <input type="date" value={range.startDate} onChange={(e) => setRange({...range, startDate: e.target.value, label: 'Custom'})} className="text-xs border border-slate-200 rounded p-1.5 outline-none focus:border-sky-500" />
                        </div>
                        <div className="flex flex-col gap-1">
                           <span className="text-[10px] font-bold text-slate-500">Ends</span>
                           <input type="date" value={range.endDate} onChange={(e) => setRange({...range, endDate: e.target.value, label: 'Custom'})} className="text-xs border border-slate-200 rounded p-1.5 outline-none focus:border-sky-500" />
                        </div>
                     </div>
                  </div>
                </div>
              )}
           </div>
           
           <button 
             onClick={exportCSV}
             className="inline-flex items-center gap-2 bg-slate-800 text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-700 active:scale-95 transition-all"
           >
             <Download className="h-4 w-4" />
             Export
           </button>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Hours', value: analytics.totalTime, icon: Timer, color: 'text-sky-600', bg: 'bg-sky-50' },
          { label: 'Active Tickets', value: analytics.ticketCount, icon: Ticket, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Active Staff', value: analytics.userCount, icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Report Entries', value: analytics.logCount, icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 group hover:border-sky-300 transition-all">
            <div className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-black text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Visual Analytics Row */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Employee Breakdown */}
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
               <h2 className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2">
                  <User className="h-4 w-4 text-sky-500" />
                  Effort per Employee
               </h2>
            </div>
            <div className="p-6 space-y-6 flex-1 max-h-[400px] overflow-y-auto custom-scrollbar">
               {analytics.employeeBreakdown.length === 0 && <p className="text-center py-10 text-xs text-slate-400 italic">No data available for range</p>}
               {analytics.employeeBreakdown.map((emp, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-700">{emp.name}</span>
                        <span className="font-medium text-slate-500">{Math.floor(emp.mins / 60)}h {emp.mins % 60}m</span>
                     </div>
                     <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-sky-500 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${emp.percent}%` }}
                        />
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Ticket Breakdown */}
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
               <h2 className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-emerald-500" />
                  Time per Ticket / Project
               </h2>
            </div>
            <div className="p-6 space-y-6 flex-1 max-h-[400px] overflow-y-auto custom-scrollbar">
               {analytics.ticketBreakdown.length === 0 && <p className="text-center py-10 text-xs text-slate-400 italic">No data available for range</p>}
               {analytics.ticketBreakdown.map((t, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-700 truncate max-w-[200px]">{t.title}</span>
                        <span className="font-medium text-slate-500 shrink-0">{Math.floor(t.mins / 60)}h {t.mins % 60}m</span>
                     </div>
                     <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${t.percent}%` }}
                        />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Filters (Admin Only) */}
      {isAdminOrManager && (
        <section className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest min-w-fit pl-2">
            <Search className="h-3.5 w-3.5" />
            Selection Mode:
          </div>
          <select 
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
          >
            <option value="all">Comprehensive View (All Team Members)</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.name || u.username}</option>
            ))}
          </select>
        </section>
      )}

      {/* Detailed Logs List */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-10">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Chronological Work Grain
          </h2>
          <span className="text-[10px] font-bold bg-white border border-slate-200 px-3 py-1 rounded-full text-slate-500 shadow-sm">
            {logs.length} granular entries
          </span>
        </div>

        {loading ? (
          <div className="p-24 text-center space-y-3 animate-pulse">
            <div className="h-12 w-12 bg-sky-100 rounded-full mx-auto flex items-center justify-center">
               <Timer className="h-6 w-6 text-sky-500" />
            </div>
            <p className="text-sm font-bold text-slate-400 italic tracking-wide">Syncing workforce data...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="p-24 text-center border-t border-slate-50">
            <div className="bg-slate-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100">
              <Calendar className="h-10 w-10 text-slate-200" />
            </div>
            <h3 className="text-slate-800 font-bold text-lg mb-2">Workspace Quiet</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Zero activity recorded for this criteria.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 overflow-x-auto">
             <table className="min-w-full">
                <thead className="hidden sm:table-header-group">
                   <tr className="text-left text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] bg-white">
                      <th className="px-6 py-4">Date / Resource</th>
                      <th className="px-6 py-4">Activity Description</th>
                      <th className="px-6 py-4 text-right">Magnitude</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {logs.map((log) => (
                    <tr key={log.id} className="group hover:bg-slate-50/80 transition-all">
                       <td className="px-6 py-5 align-top whitespace-nowrap">
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-slate-400">{new Date(log.date).toLocaleDateString()}</p>
                             <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                                <span className="text-sm font-black text-slate-800 tracking-tight">{log.user?.name || log.user?.username}</span>
                             </div>
                             {log.ticket && (
                                <Link 
                                  href={`/admin/tickets?q=${log.ticket.id}`} 
                                  className="text-[9px] font-black text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100 uppercase tracking-tighter inline-flex items-center gap-1 mt-1"
                                >
                                  ID: {log.ticket.id}
                                </Link>
                             )}
                          </div>
                       </td>
                       <td className="px-6 py-5 align-top max-w-[400px]">
                          {log.ticket && <p className="text-[10px] font-bold text-slate-400 truncate mb-1">{log.ticket.title}</p>}
                          <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-2 group-hover:line-clamp-none transition-all">{log.description}</p>
                       </td>
                       <td className="px-6 py-5 align-top text-right shrink-0">
                          <div className="inline-flex flex-col items-end gap-1.5">
                            <div className="flex items-center gap-2 text-xs font-black text-slate-800 bg-white shadow-sm border border-slate-100 px-3 py-1.5 rounded-lg group-hover:border-sky-200 transition-colors">
                              <Timer className="h-3.5 w-3.5 text-sky-500" />
                              {Math.floor(log.duration / 60)}h {log.duration % 60}m
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 font-mono tracking-tighter">
                               {log.startTime && log.endTime ? `${log.startTime} - ${log.endTime}` : 'INTERVAL RECORD'}
                            </span>
                          </div>
                       </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}
      </section>
    </div>
  );
}
