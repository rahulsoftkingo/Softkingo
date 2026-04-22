// components/admin/AdminHeaderClient.jsx
'use client';

import { useState, useEffect } from 'react';
import { Menu, Bell, User, Settings, LogOut } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AdminSidebar from '@/components/admin/AdminSidebar';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

export default function AdminHeaderClient({ session }) {
  const [mounted, setMounted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const primaryRole =
    session?.user?.id === 'super-admin' ? 'Super Admin' : (session?.user?.roles?.[0] || session?.user?.role || 'Admin');

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  const profileImage = session?.user?.profileImage ?? session?.user?.image ?? null;

  // Robust path handling for images
  const profileSrc = 
    typeof profileImage === 'string' && profileImage.trim().length > 0
      ? (profileImage.startsWith('/') || profileImage.startsWith('http') || profileImage.startsWith('data:'))
        ? profileImage
        : `/${profileImage}`
      : null;

  return (
    <header className="h-16 bg-white border-b border-sky-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger className="md:hidden inline-flex items-center justify-center p-2 border border-sky-200 rounded-lg bg-white hover:bg-sky-50 transition-colors">
            <Menu className="h-5 w-5 text-sky-700" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 flex h-screen">
            <AdminSidebar userRoles={session?.user?.roles || []} />
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-3">
          <span className="text-lg font-bold bg-gradient-to-r from-sky-600 to-sky-500 bg-clip-text text-transparent">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2.5 text-sky-600 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors duration-200">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-medium shadow-sm">
            3
          </span>
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-sky-50 transition-colors duration-200 border border-transparent hover:border-sky-200"
          >
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center overflow-hidden shadow-sm">
              {profileSrc ? (
                <Image
                  src={profileSrc}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />
              ) : (
                <User className="h-5 w-5 text-white" />
              )}
            </div>

            <div className="hidden sm:flex flex-col items-start text-sm">
              <span className="font-semibold text-slate-900">
                {mounted && (session?.user?.name || session?.user?.username || 'User')}
              </span>
              <span className="text-sky-600 capitalize font-medium">
                {mounted && primaryRole}
              </span>
            </div>
            <svg
              className={`w-4 h-4 text-sky-600 hidden sm:block transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-64 origin-top-right bg-white rounded-xl shadow-xl py-2 z-50">
              <div className='flex justify-start pl-2 items-center'>
                {profileSrc ? (
                  <Image
                    src={profileSrc}
                    alt="Profile"
                    width={36}
                    height={36}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5 text-white" />
                )}
                <div className="px-4 py-3 border-b border-sky-100">
                  <p className="text-sm font-semibold text-sky-950">
                    {session?.user?.name || session?.user?.username}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(session?.user?.roles || []).length > 0 ? (
                      session.user.roles.map((r) => (
                        <span key={r} className="text-[10px] px-1.5 py-0.5 bg-sky-50 text-sky-600 rounded-md capitalize font-bold border border-sky-100">
                          {r}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-sky-600 capitalize font-medium">
                        {primaryRole}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="py-2">
                <a
                  href="/admin/profile"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-sky-50 transition-colors"
                >
                  <User className="h-4 w-4 text-sky-600" />
                  <span>My Profile</span>
                </a>
                <a
                  href="/admin/settings"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-sky-50 transition-colors"
                >
                  <Settings className="h-4 w-4 text-sky-600" />
                  <span>Account Settings</span>
                </a>
              </div>

              <div className="border-t border-sky-100 pt-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
