// src/components/AttendanceTimer.jsx - COMPLETE VERSION
'use client';

import { useState, useEffect } from 'react';
import { Clock, Zap, Coffee } from 'lucide-react';

export default function AttendanceTimer({ 
  isClockedIn, 
  clockInTime, 
  todayStats = {},
  userId,
  onAutoLogout 
}) {
  const [liveTime, setLiveTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [todayTotal, setTodayTotal] = useState(todayStats);

  // ✅ LIVE TIMER CALCULATION
  useEffect(() => {
    if (!isClockedIn || !clockInTime) return;

    const updateTimer = () => {
      const startTime = new Date(clockInTime);
      const now = new Date();
      const diffMs = now - startTime;

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setLiveTime({ hours, minutes, seconds });

      // ✅ AUTO LOGOUT AFTER 10 HOURS
      if (hours >= 10) {
        if (onAutoLogout) {
          onAutoLogout();
        } else {
          const form = document.querySelector('form[action*="toggleClockInOut"]');
          if (form) form.requestSubmit();
        }
      }
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(interval);
  }, [isClockedIn, clockInTime, onAutoLogout]);

  // ✅ CALCULATE CATEGORIES
  const currentSessionHours = liveTime.hours + (liveTime.minutes / 60);
  const totalWorkedToday = (todayTotal.regularHours || 0) + currentSessionHours;
  
  const regularHours = Math.min(totalWorkedToday, 8);
  const overtimeHours = Math.max(0, totalWorkedToday - 8);
  const restHours = Math.max(0, 8 - totalWorkedToday);

  if (!isClockedIn) {
    return (
      <div className="space-y-2">
        <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
          <Coffee className="h-3 w-3" />
          Not Active - On Break
        </div>
        
        {/* TODAY'S SUMMARY */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-emerald-50/50 px-2 py-1 rounded-lg border border-emerald-200/30">
            <div className="text-emerald-800 font-bold">{todayTotal.regularHours?.toFixed(1) || '0.0'}h</div>
            <div className="text-emerald-600 text-[10px]">Regular</div>
          </div>
          <div className="bg-amber-50/50 px-2 py-1 rounded-lg border border-amber-200/30">
            <div className="text-amber-800 font-bold">{todayTotal.overtimeHours?.toFixed(1) || '0.0'}h</div>
            <div className="text-amber-600 text-[10px]">Overtime</div>
          </div>
          <div className="bg-slate-50/50 px-2 py-1 rounded-lg border border-slate-200/30">
            <div className="text-slate-800 font-bold">{todayTotal.restHours?.toFixed(1) || '8.0'}h</div>
            <div className="text-slate-600 text-[10px]">Rest</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* ✅ LIVE SESSION TIMER */}
      <div className="flex items-center gap-2 text-xs font-mono bg-emerald-50/80 px-3 py-1.5 rounded-full border border-emerald-200/50">
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
        <Clock className="h-3 w-3 text-emerald-600" />
        <span className="font-bold text-emerald-800">
          {liveTime.hours.toString().padStart(2, '0')}:
          {liveTime.minutes.toString().padStart(2, '0')}:
          {liveTime.seconds.toString().padStart(2, '0')}
        </span>
      </div>
      
      {/* ✅ TODAY'S BREAKDOWN */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        {/* Regular Hours (0-8h) */}
        <div className="bg-emerald-50/80 px-2 py-1 rounded-lg border border-emerald-200/50">
          <div className="text-emerald-900 font-bold">{regularHours.toFixed(1)}h</div>
          <div className="text-emerald-600 text-[10px]">Regular</div>
        </div>
        
        {/* Overtime (8+h) */}
        <div className={`px-2 py-1 rounded-lg border ${
          overtimeHours > 0 
            ? 'bg-amber-50/80 border-amber-200/50' 
            : 'bg-slate-50/50 border-slate-200/30'
        }`}>
          <div className={`font-bold ${
            overtimeHours > 0 ? 'text-amber-900' : 'text-slate-600'
          }`}>
            {overtimeHours > 0 ? (
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                {overtimeHours.toFixed(1)}h
              </span>
            ) : '0.0h'}
          </div>
          <div className={overtimeHours > 0 ? 'text-amber-600 text-[10px]' : 'text-slate-500 text-[10px]'}>
            Overtime
          </div>
        </div>
        
        {/* Rest Hours */}
        <div className="bg-slate-50/50 px-2 py-1 rounded-lg border border-slate-200/30">
          <div className="text-slate-800 font-bold">{Math.max(0, restHours).toFixed(1)}h</div>
          <div className="text-slate-600 text-[10px]">Rest</div>
        </div>
      </div>

      {/* ✅ OVERTIME ALERT */}
      {overtimeHours > 0 && (
        <div className="text-[10px] text-amber-700 font-semibold flex items-center gap-1 bg-amber-50/50 px-2 py-1 rounded-lg">
          <Zap className="h-3 w-3 animate-pulse" />
          Extra work time! {overtimeHours.toFixed(1)}h overtime
        </div>
      )}
      
      {/* ✅ AUTO LOGOUT WARNING */}
      {liveTime.hours >= 9 && (
        <div className="text-[10px] text-red-700 font-semibold flex items-center gap-1 bg-red-50/50 px-2 py-1 rounded-lg animate-pulse">
          ⚠️ Auto logout in {10 - liveTime.hours} hour
        </div>
      )}
    </div>
  );
}
