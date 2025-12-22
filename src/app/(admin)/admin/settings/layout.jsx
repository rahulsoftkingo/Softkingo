// app/admin/settings/layout.jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, Image, Lock, Share2, FileText, Globe } from 'lucide-react';

const tabs = [
  { href: '/admin/settings', label: 'General', icon: Settings },
  { href: '/admin/settings/media', label: 'Media', icon: Image },
  { href: '/admin/settings/password', label: 'Password', icon: Lock },
  { href: '/admin/settings/social', label: 'Social', icon: Share2 },
  { href: '/admin/settings/seo', label: 'SEO', icon: Globe },
  { href: '/admin/settings/footer', label: 'Footer', icon: FileText },
];

export default function SettingsLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-sky-500/30">
            <Settings className="w-7 h-7 text-white drop-shadow-lg" />
          </div>
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-sky-700 via-cyan-700 to-blue-800 bg-clip-text text-transparent tracking-tight">
              Site Settings
            </h1>
            <p className="text-lg text-slate-600 mt-1 font-medium">Configure your entire website</p>
          </div>
        </div>

        {/* Top Tabs */}
        <div className="bg-white/80 backdrop-blur-xl border border-sky-200/50 shadow-2xl shadow-sky-500/10 rounded-3xl overflow-hidden mb-8">
          <div className="border-b border-sky-100 px-6 py-4">
            <nav className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const active = pathname === tab.href;
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={`group flex items-center gap-2.5 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border-2 ${
                      active
                        ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white border-transparent shadow-xl shadow-sky-500/25 transform scale-105'
                        : 'text-slate-700 border-sky-200 hover:border-sky-300 hover:bg-sky-50 hover:shadow-md hover:scale-[1.02]'
                    }`}
                  >
                    <tab.icon className={`w-5 h-5 ${active ? 'drop-shadow-lg' : 'group-hover:scale-110 transition-transform'}`} />
                    <span>{tab.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content (Full Width) */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl border border-sky-200/50 shadow-2xl shadow-sky-500/10 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
