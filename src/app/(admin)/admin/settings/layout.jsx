// app/admin/settings/layout.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, Image, Lock, Share2, FileText, Globe, HardDrive } from "lucide-react";

const tabs = [
  { href: '/admin/settings', label: 'General', icon: Settings },
  { href: '/admin/settings/media', label: 'Media Library', icon: Image },
  { href: '/admin/settings/seo', label: 'SEO Settings', icon: Globe },
  { href: "/admin/settings/storage", label: "Cloud Storage", icon: HardDrive },
];

export default function SettingsLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">

          <div>
            <h1 className="text-4xl font-bold  text-sky-800">
              Site Settings
            </h1>
            <p className="text-lg text-sky-800 mt-1 font-medium">Configure your entire website</p>
          </div>
        </div>

        <div className="bg-white border-b border-slate-200 sticky top-0 z-20 rounded-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex -mb-px space-x-8 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const active = pathname === tab.href;
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={`group relative min-w-0 flex-1 py-4 px-1 text-center text-sm font-medium hover:text-slate-700 transition-all duration-200 border-b-2 ${active
                      ? 'border-sky-600 text-sky-600'
                      : 'border-transparent text-slate-500 hover:border-slate-300'
                      }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <tab.icon className={`w-4 h-4 ${active ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-500'}`} />
                      <span className="whitespace-nowrap">{tab.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="py-8">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
