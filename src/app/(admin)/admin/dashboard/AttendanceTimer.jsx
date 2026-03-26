'use client';

import { useState, useEffect } from 'react';
import { Clock, Zap, TrendingUp, HelpCircle } from 'lucide-react';

export default function AttendanceTimer({ isClockedIn, clockInTime, todayStats, userId }) {
  const [elapsed, setElapsed] = useState('00:00:00');

  useEffect(() => {
    let interval;
    if (isClockedIn && clockInTime) {
      interval = setInterval(() => {
        const diff = new Date() - new Date(clockInTime);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setElapsed(
          `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);
    } else {
      setElapsed('00:00:00');
    }
    return () => clearInterval(interval);
  }, [isClockedIn, clockInTime]);

  const { regularHours = 0, overtimeHours = 0, restHours = 0, totalHours = 0 } = todayStats;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isClockedIn ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Current Session</div>
            <div className={`text-xl font-black font-mono ${isClockedIn ? 'text-emerald-600' : 'text-slate-400'}`}>
              {elapsed}
            </div>
          </div>
        </div>
        
        <div className="text-right hidden xs:block">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Today's Total</div>
          <div className="text-lg font-bold text-slate-900">{totalHours.toFixed(1)} hrs</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <StatBox label="Regular" value={`${regularHours.toFixed(1)}h`} color="sky" />
        <StatBox label="Overtime" value={`${overtimeHours.toFixed(1)}h`} color="indigo" />
        <StatBox label="Balance" value={`${restHours.toFixed(1)}h`} color="emerald" />
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <span>Worker Mode</span>
        <div className="flex items-center gap-1 text-emerald-500">
          <Zap className="w-3 h-3" />
          <span>Active</span>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color }) {
  const colors = {
    sky: 'bg-sky-50 text-sky-700 border-sky-100',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100'
  };

  return (
    <div className={`p-2 rounded-lg border ${colors[color]} text-center`}>
      <div className="text-[9px] uppercase font-black opacity-60 mb-1">{label}</div>
      <div className="text-xs font-bold leading-none">{value}</div>
    </div>
  );
}
