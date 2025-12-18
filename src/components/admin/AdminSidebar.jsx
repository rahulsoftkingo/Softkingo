'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Layers3,
  Mail,
  Lightbulb,
  BookOpenText,
  FolderKanban,
  Briefcase,
  Rocket,
  Inbox,
  MessageCircle,
  Image as ImageIcon,
  CalendarDays,
  Users,
  UserCog,
  Users2,
  Settings,
  ChevronDown,
  LogOut,
    MessageSquare,
  Send,
  Megaphone,
  MailOpen,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

// Adjusted paths to match future pages
const sections = [
  {
    title: 'Dashboard',
    key: 'dashboard',
    items: [
      { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Content Management',
    key: 'content',
    items: [
      { label: 'Blog Posts', href: '/admin/blog', icon: FileText },
      { label: 'Categories', href: '/admin/categories', icon: Layers3 },
      { label: 'E‑Guides', href: '/admin/e-guides', icon: BookOpenText },
      // { label: 'Newsletters', href: '/admin/newsletters', icon: Mail },
      { label: 'Blog Analytics', href: '/admin/blog-analytics', icon: Lightbulb },
    
    ],
  },
  {
    title: 'Portfolio',
    key: 'portfolio',
    items: [
      { label: 'Case Studies', href: '/admin/case-studies', icon: FileText },
      { label: 'Portfolio Items', href: '/admin/portfolio', icon: FolderKanban },
    ],
  },
  {
    title: 'Pages',
    key: 'pages',
    items: [
      { label: 'Services', href: '/admin/services', icon: Briefcase },
      { label: 'Hire Pages', href: '/admin/hire', icon: Users2 },
      { label: 'Solutions', href: '/admin/solutions', icon: Rocket },
    ],
  },
    {
    title: 'Communication',
    key: 'communication',
    items: [
      { label: 'Live Chat', href: '/admin/chat', icon: MessageSquare, badge: 'new' },
      { label: 'WhatsApp', href: '/admin/whatsapp', icon: MessageCircle, badge: 'new' },
      { label: 'Newsletters', href: '/admin/newsletters', icon: Mail },
      { label: 'Email Campaigns', href: '/admin/email-campaigns', icon: MailOpen, badge: 'new' },
      { label: 'WhatsApp Campaigns', href: '/admin/whatsapp', icon: Send, badge: 'new' },
    ],
  },
  {
    title: 'Operations',
    key: 'operations',
    items: [
      { label: 'Leads', href: '/admin/leads', icon: Inbox },
      { label: 'Support Tickets', href: '/admin/tickets', icon: MessageCircle },
    ],
  },
  {
    title: 'People & Media',
    key: 'people',
    items: [
      { label: 'User Management', href: '/admin/users', icon: UserCog },
      { label: 'Team Members', href: '/admin/team', icon: Users },
      { label: 'Employees', href: '/admin/employees', icon: Users2 },
      { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
      // new: events for hero popups / festival cards
      { label: 'Events & Popups', href: '/admin/events', icon: CalendarDays },
    ],
  },
  {
    title: 'Account & Settings',
    key: 'account',
    items: [
      { label: 'My Profile', href: '/admin/profile', icon: Users },
      { label: 'Admin Settings', href: '/admin/settings', icon: Settings },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(() => ({
    dashboard: true,
    content: true,
    portfolio: true,
    pages: true,
    operations: true,
    people: true,
    account: true,
  }));

  const toggle = (key) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <nav className="h-full flex flex-col bg-white font-sans">
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-center px-6 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <Image
            src="/images/softkingo-logo.png"
            alt="Softkingo Logo"
            width={140}
            height={32}
            className="h-12 w-auto"
          />
        </div>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-2 custom-scrollbar">
        {sections.map((section) => (
          <div key={section.key} className="mb-2">
            <button
              type="button"
              onClick={() => toggle(section.key)}
              className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold text-sky-700 uppercase tracking-wider hover:bg-sky-50 rounded-lg transition-colors duration-200"
            >
              <span className="font-medium">{section.title}</span>
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-300 text-sky-500',
                  open[section.key] ? 'rotate-180' : ''
                )}
              />
            </button>

            {open[section.key] && (
              <div className="space-y-1 ml-1">
                {section.items.map((item) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(item.href + '/');
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer rounded-lg transition-all duration-200 border-l-2 font-medium',
                        active
                          ? 'bg-sky-50 text-sky-700 border-l-sky-600 shadow-sm'
                          : 'text-slate-700 hover:bg-sky-50 border-l-transparent hover:border-l-sky-300 hover:text-sky-800'
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-4 w-4 transition-colors',
                          active ? 'text-sky-600' : 'text-slate-500'
                        )}
                      />
                      <span className="font-normal">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom logout */}
      <div className="border-t border-slate-200 p-4 bg-sky-white">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-white hover:text-red-600 rounded-lg border border-transparent hover:border-red-200 transition-all duration-200 font-medium"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #bae6fd;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7dd3fc;
        }
      `}</style>
    </nav>
  );
}
