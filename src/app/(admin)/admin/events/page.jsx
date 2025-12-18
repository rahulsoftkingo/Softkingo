'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch('/api/admin/events', { cache: 'no-store' });
        const data = await res.json();
        if (!cancelled) {
          setEvents(data.events || []);
        }
      } catch (e) {
        console.error('Failed to load events', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Site events / banners
            </h1>
            <p className="text-xs text-slate-500">
              Configure Black Friday, Christmas, and other promo popups.
            </p>
          </div>
          <Link
            href="/admin/events/new"
            className="inline-flex items-center gap-1.5 rounded-md bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-sky-500"
          >
            + New event
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        {loading ? (
          <p className="text-xs text-slate-500">Loading...</p>
        ) : !events.length ? (
          <p className="text-xs text-slate-500">
            No events yet. Create your first promo.
          </p>
        ) : (
          <div className="space-y-2">
            {events.map((ev) => (
              <Link
                key={ev.id}
                href={`/admin/events/${ev.id}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs hover:border-sky-300"
              >
                <div>
                  <p className="font-semibold text-slate-900">{ev.title}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {ev.message}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span
                    className={
                      ev.status === 'active'
                        ? 'rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-600 border border-emerald-200'
                        : 'rounded-full bg-slate-50 px-2 py-0.5 text-slate-600 border border-slate-200'
                    }
                  >
                    {ev.status}
                  </span>
                  <span className="text-slate-400">ID {ev.id}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
