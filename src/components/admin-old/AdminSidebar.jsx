// src/components/admin/AdminSidebar.jsx
"use client";
import Image from 'next/image';

import {
  Home,
  FileText,
  Folder,
  Users,
  Briefcase,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  LayoutGrid,
  Phone,
  UserCog,
  FilePlus,
  FileMinus,
  File,
  Tag,
  UserPlus,
  Shield,
  List,
  PlusCircle,
  Trash2,
  BriefcaseBusiness,
  Factory,
  Handshake,
} from 'lucide-react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
// import { cn } from "@/auth/utils";
import { cn } from "@/lib/utils"; // Corrected path
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton"; // For loading state


export default function AdminSidebar({ role }) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState({});

  // Get session data on the client
  const { data: session, status } = useSession();

  // Initialize open states based on current path
  useEffect(() => {
    const newOpenItems = {};

    // Function to check if item or its children should be open
    const checkItem = (items) => {
      let found = false;

      for (const item of items) {
        if (item.href && pathname.startsWith(item.href)) {
          newOpenItems[item.name] = true;
          if (item.parent) newOpenItems[item.parent] = true;
          found = true;

        }
        if (item.children) {
          const hasActiveChild = checkItem(item.children);
          if (hasActiveChild) {
            newOpenItems[item.name] = true;
            if (item.parent) newOpenItems[item.parent] = true;
            found = true;
          }
        }
      }
      return found;

      // return false;
    };

    checkItem(navigation);
    setOpenItems(newOpenItems);
  }, [pathname]);

  const toggleItem = (name) => {
    setOpenItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: Home,
      roles: ['admin', 'manager', 'hr', 'blogger']
    },
    {
      name: 'Blog',
      href: '/admin/blog',
      icon: FileText,
      roles: ['admin', 'manager', 'hr', 'blogger'],
      children: [
        {
          name: 'Posts',
          href: '/admin/blog/posts',
          icon: File,
          children: [
            { name: 'All Posts', href: '/admin/blog/post-lists', icon: List },
            { name: 'Add Post', href: '/admin/blog/add-blog', icon: FilePlus },
            // ...(role === 'admin' ? [
            {
              name: 'Deleted Posts', href: '/admin/blog/deleted', icon: Trash2
              , roles: ['admin'],
            }
            // ] : [])
          ]
        },
        {
          name: 'Categories',
          href: '/admin/categories',
          icon: LayoutGrid,
          // children: [
          //   { name: 'All Categories', href: '/admin/blog/categories/categories-list', icon: List },
          //   { name: 'Add Category', href: '/admin/blog/categories/add-categories', icon: PlusCircle }
          // ]
        },
        // {
        //   name: 'Tags',
        //   icon: Tag,
        //   children: [
        //     { name: 'All Tags', href: '/admin/blog/tags', icon: List },
        //     { name: 'Add Tag', href: '/admin/blog/tags/new', icon: PlusCircle }
        //   ]
        // },
        ...(role === 'admin' ? [{
          name: 'Configuration',
          icon: Settings,
          children: [
            { name: 'Post Settings', href: '/admin/blog/settings', icon: Settings },
            { name: 'Deleted Posts', href: '/admin/blog/deleted', icon: Trash2 }
          ]
        }] : [])
      ]
    },
    {
      name: 'Pages',
      icon: Folder,
      roles: ['admin'],
      children: [
        {
          name: 'Services',
          icon: BriefcaseBusiness,
          children: [
            { name: 'All Services', href: '/admin/pages/services', icon: List },
            { name: 'Add Service', href: '/admin/pages/services/new', icon: PlusCircle },
            { name: 'Deleted Services', href: '/admin/pages/services/deleted', icon: Trash2 }
          ]
        },
        {
          name: 'Industry',
          icon: Factory,
          children: [
            { name: 'All Industries', href: '/admin/pages/industry', icon: List },
            { name: 'Add Industry', href: '/admin/pages/industry/new', icon: PlusCircle },
            { name: 'Deleted Industries', href: '/admin/pages/industry/deleted', icon: Trash2 }
          ]
        },
        {
          name: 'Contact Us',
          icon: Phone,
          children: [
            { name: 'Contact Settings', href: '/admin/pages/contact', icon: Settings },
            { name: 'Call Logs', href: '/admin/pages/contact/calls', icon: List }
          ]
        },
        {
          name: 'Hire',
          icon: Handshake,
          children: [
            { name: 'All Applications', href: '/admin/pages/hire/applications', icon: List },
            { name: 'Job Positions', href: '/admin/pages/hire/positions', icon: BriefcaseBusiness },
            { name: 'Hiring Settings', href: '/admin/pages/hire/settings', icon: Settings }
          ]
        }
      ]
    },
    {
      name: 'Portfolio',
      icon: Briefcase,
      roles: ['admin'],
      children: [
        {
          name: 'Projects',
          icon: BriefcaseBusiness,
          children: [
            { name: 'All Projects', href: '/admin/portfolio/projects', icon: List },
            { name: 'Add Project', href: '/admin/portfolio/projects/new', icon: PlusCircle },
            { name: 'Deleted Projects', href: '/admin/portfolio/projects/deleted', icon: Trash2 }
          ]
        },
        {
          name: 'Categories',
          icon: LayoutGrid,
          children: [
            { name: 'App Development', href: '/admin/portfolio/categories/app', icon: List },
            { name: 'Web Development', href: '/admin/portfolio/categories/web', icon: List },
            { name: 'Digital Marketing', href: '/admin/portfolio/categories/marketing', icon: List },
            { name: 'Add Category', href: '/admin/portfolio/categories/new', icon: PlusCircle }
          ]
        }
      ]
    },
    {
      name: 'Team',
      icon: Users,
      roles: ['admin'],
      children: [
        {
          name: 'Members',
          icon: UserCog,
          children: [
            { name: 'All Members', href: '/admin/team/members', icon: List },
            { name: 'Add Member', href: '/admin/team/members/new', icon: UserPlus },
            { name: 'Roles', href: '/admin/team/roles', icon: Shield }
          ]
        },
        {
          name: 'Permissions',
          icon: Shield,
          children: [
            { name: 'Role Management', href: '/admin/team/permissions/roles', icon: Shield },
            { name: 'User Permissions', href: '/admin/team/permissions/users', icon: UserCog },
            { name: 'Blogger Access', href: '/admin/team/permissions/bloggers', icon: FileText },
            { name: 'HR Access', href: '/admin/team/permissions/hr', icon: Users }
          ]
        }
      ]
    },
    {
      name: 'Settings',
      icon: Settings,
      roles: ['admin'],
      children: [
        {
          name: 'General',
          icon: Settings,
          children: [
            { name: 'Site Settings', href: '/admin/settings/general/site', icon: Settings },
            { name: 'Appearance', href: '/admin/settings/general/appearance', icon: LayoutGrid }
          ]
        },
        {
          name: 'Permissions',
          icon: Shield,
          children: [
            { name: 'Role Settings', href: '/admin/settings/permissions/roles', icon: Shield },
            { name: 'Access Control', href: '/admin/settings/permissions/access', icon: UserCog }
          ]
        },
        {
          name: 'Page Settings',
          icon: Folder,
          children: [
            { name: 'Home Page', href: '/admin/settings/pages/home', icon: Home },
            { name: 'Service Pages', href: '/admin/settings/pages/services', icon: BriefcaseBusiness },
            { name: 'Portfolio Pages', href: '/admin/settings/pages/portfolio', icon: Briefcase }
          ]
        }
      ]
    },
  ];

  const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

  // Add parent references for proper highlighting
  const addParentRefs = (items, parent = null) => {
    return items.map(item => {
      const newItem = { ...item, parent };
      if (newItem.children) {
        newItem.children = addParentRefs(newItem.children, newItem.name);
      }
      return newItem;
    });
  };


  // Show a loading skeleton while session is being fetched
  // if (status === "loading") {
  //   return (
  //     <div className="flex flex-col w-64 p-4">
  //       <Skeleton className="h-10 w-32 mb-8" />
  //       <Skeleton className="h-8 w-full mb-2" />
  //       <Skeleton className="h-8 w-full mb-2" />
  //       <Skeleton className="h-8 w-full mb-2" />
  //       <div className="mt-auto">
  //           <Skeleton className="h-12 w-full" />
  //       </div>
  //     </div>
  //   );
  // }


  const user = session?.user;
  // Filter navigation based on the user's role from the session
  const filteredNavigation = navigation.filter(item =>
    item.roles && user?.role && item.roles.includes(user.role)
  );
  const navigationWithParents = addParentRefs(navigation);

  // const fackrole = "admin";
  // const filteredNavigation = navigationWithParents.filter(item => 
  //   item.roles.includes(fackrole)
  // );

  const profileSrc = user?.profile
    ? user.profile.startsWith('/')
      ? user.profile
      : `/${user.profile}`
    : null;

  const renderNavigation = (items, level = 0) => {
    return items.map((item) => {
      const isActive = item.href && pathname.startsWith(item.href);
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = openItems[item.name];

      return (
        <div key={item.name} className="space-y-1">
          <div className={cn(
            "flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md group cursor-pointer transition-colors",
            isActive
              ? "bg-sky-600 text-white"
              : "text-gray-700 hover:bg-gray-200",
            level > 0 ? `ml-${level * 4}` : ""
          )}>
            {item.href ? (
              <Link href={item.href} className="flex items-center flex-1">
                {item.icon && <item.icon className="mr-3 h-4 w-5" />}
                <span>{item.name}</span>
              </Link>
            ) : (
              <div
                className="flex items-center flex-1"
                onClick={() => hasChildren && toggleItem(item.name)}
              >
                {item.icon && <item.icon className="mr-3 h-4 w-5" />}
                <span>{item.name}</span>
              </div>
            )}

            {hasChildren && (
              <button
                onClick={() => toggleItem(item.name)}
                className={cn(
                  "ml-2 transition-transform",
                  isActive ? "text-white" : "text-gray-500"
                )}
              >
                {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
            )}
          </div>

          {hasChildren && isOpen && (
            <div className={`ml-${(level + 1) * 4} space-y-1 border-l border-gray-200 pl-2`}>
              {renderNavigation(item.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col w-64 h-[92vh] md:h-[100vh]">
      <div className="flex flex-col h-0 flex-1 bg-gray-50 border-r border-gray-200">
        <div className="flex items-center h-14 pb-1 flex-shrink-0 px-4 bg-gray-100 border-b border-gray-200">
          {/* <div className="bg-sky-00 rounded-lg p-">
            <img src='/images/Media-bg1.png' className="h-8 w-8" alt="Logo" />
          </div> */}
          {/* <span className="ml-3 text-xl font-bold text-sky-400">AdminPanel</span> */}
          <a href='/'>
            <img src='/images/softkingo-logo.png' className="h-10 w-" alt="Logo" />
          </a>

        </div>
        <div className="flex-1 flex flex-col overflow-y-auto py-4">
          <nav className="flex-1 px-2 space-y-1">
            {renderNavigation(filteredNavigation)}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-100">
          <div className="flex items-center">
            <div className="bg-sky-600 border-2 border-white shadow-sm rounded-full w-10 h-10 flex items-center justify-center">
              {/* {user?.profile ? ( */}
              {/* <img src={user.profile} alt="Profile" className="rounded-full w-full h-full object-cover" /> */}
              {profileSrc ? (
                <Image
                  src={profileSrc}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full h-9 w-9"
                />

              ) : (
                <span className="font-medium text-white text-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              )}
              
            </div>
            {/* <div className="bg-white border-2 border-gray-300 rounded-xl w-10 h-10 flex items-center justify-center">
              <span className="font-medium text-gray-700">
              
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div> */}

            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">
                {/* {role === 'SUPER_ADMIN' ? 'Super Admin' : 'Blog Admin'} */}
                {capitalize(user?.role)}
              </p>
            </div>
          </div>
          <Button
            // onClick={() => signOut()}
            onClick={() => signOut({ callbackUrl: '/login' })}
            variant="ghost"
            className="flex items-center mt-4 w-full justify-start text-gray-700 hover:bg-gray-200"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}

