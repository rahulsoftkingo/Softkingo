
// src/components/admin/AdminHeaderClient.jsx (Client Component)
'use client';

import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AdminSidebar from '@/components/admin/AdminSidebar';
// import { ModeToggle } from '@/components/mode-toggle';
import { FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminHeaderClient({ session, users }) {

  // normalize the Image path 
  const profileSrc = session?.user?.profile
    ? session.user.profile.startsWith("/")
      ? session.user.profile
      : `/${session.user.profile}`
    : null;

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger className="md:hidden">
              <Menu className="h-6 w-6 text-gray-500 dark:text-gray-400" />

            </SheetTrigger>
            <SheetContent side="left" className="w[280px] p-0 flex h-[100vh]">

              <AdminSidebar role={session.user.role} />
            </SheetContent>
          </Sheet>
          <div className="ml-4 md:ml-0 md:hidden">
            <img src='/images/softkingo-logo.png' className='max-w-[8rem]' alt="Logo" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ModeToggle />
          <button className="p-2 text-gray-500 hover:text-sky-600 relative">
            <FaBell className="text-xl" />
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">3</span>
          </button>

          <div className="relative group">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="h-9 w-9 rounded-full bg-sky-100 flex items-center justify-center">
                {/* {session.user.profile ? (
                  <img src={session.user.profile} className="h-9 w-9 rounded-full" alt="Profile" /> */}
                {profileSrc ? (
                  <Image
                    src={profileSrc}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full h-9 w-9"
                  />
                ) : (
                  <span className="font-semibold text-sky-700">
                    {session.user.name?.charAt(0) || 'A'}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-sm font-medium text-gray-700">{session.user.name}</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>

            <div className="absolute right-0 mt-1 w-56 origin-top-right bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 hidden group-hover:block z-10">
              <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <div className="flex items-center">
                  <FaCog className="mr-2" /> Settings
                </div>
              </Link>
              <form action="/api/auth/signout" method="POST">
                <button type="submit" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <div className="flex items-center">
                    <FaSignOutAlt className="mr-2" /> Sign out
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
