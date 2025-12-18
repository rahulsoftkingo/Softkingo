// // src/components/admin/AdminHeader.jsx
// import { Menu } from 'lucide-react';
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import AdminSidebar from "@/components/admin/AdminSidebar";
// import { auth } from "@/auth";
// import { ModeToggle } from "@/components/mode-toggle";

// import { FaSearch, FaUserPlus, FaFilter, FaSort, FaChartBar, FaCog, FaBell, FaSignOutAlt } from "react-icons/fa";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import pool from "@/lib/db";
// import { redirect } from "next/navigation";
// import Link from "next/link";


// export default async function AdminHeader() {
// //   const session = await auth();
// //   const role = session?.user?.role || 'BLOG_ADMIN';
// // const fackrole ="SUPER_ADMIN";
//   const session = await getServerSession(authOptions);
//   if (!session || session.user.role !== "admin") {
//     redirect("/login");
//   }

//    const [users] = await pool.query(
//     `SELECT id, empid, username, fullname, profile, role, status 
//      FROM users 
//      ORDER BY id DESC`
//   );

//   return (
//     <header className="bg-white dark:bg-gray-800 shadow">
//       <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
//         <div className="flex items-center">
//           <Sheet>
//             <SheetTrigger className="md:hidden">
//               <Menu className="h-6 w-6 text-gray-500 dark:text-gray-400" />
//             </SheetTrigger>
//             <SheetContent side="left" className="w-[280px] p-0">
//               <AdminSidebar role={session.user.role} />
//             </SheetContent>
//           </Sheet>
//           <div className="ml-4 md:ml-0 md:hidden">
//             <h1 className="text-xl font-bold text-gray-900 dark:text-white">
//               {/* Admin Dashboard */}
//               <img src='/images/softkingo-logo.png' className='max-w-[8rem]'/>
//             </h1>
//           </div>
//         </div>
//         <div className="flex items-center space-x-4">
//           <ModeToggle />
//           <div className="flex items-center">
//             {/* <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" /> */}
//             <div className="ml3 hidden md:block">
//               {/* <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p> */}
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 {/* {role === 'SUPER_ADMIN' ? 'Super Admin' : 'Blog Admin'} */}
//               </p>
//             </div>
//                <div className="flex items-center space-x-4">
//             <button className="p-2 text-gray-500 hover:text-sky-600 relative">
//               <FaBell className="text-xl" />
//               <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">3</span>
//             </button>
            
//             <div className="relative group">
//               <div className="flex items-center space-x-2 cursor-pointer">
//                 <div className="h-9 w-9 rounded-full bg-sky-100 flex items-center justify-center">
//                   {session.user.profile ? (
//                     <img src={session.user.profile} className="h-9 w-9 rounded-full" alt="Profile" />
//                   ) : (
//                     <span className="font-semibold text-sky-700">
//                       {session.user.name?.charAt(0) || 'A'}
//                     </span>
//                   )}
//                 </div>
//                 <span className="hidden md:inline text-sm font-medium text-gray-700">{session.user.name}</span>
//                 <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                 </svg>
//               </div>
              
//               <div className="absolute right-0 mt-1 w-56 origin-top-right bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 hidden group-hover:block z-10">
//                 <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                   <div className="flex items-center">
//                     <FaCog className="mr-2" /> Settings
//                   </div>
//                 </Link>
//                 <form action="/api/auth/signout" method="POST">
//                   <button type="submit" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                     <div className="flex items-center">
//                       <FaSignOutAlt className="mr-2" /> Sign out
//                     </div>
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//           </div>
//         </div>
     
//       </div>
//     </header>
//   );
// }


// src/components/admin/AdminHeader.jsx (Server Component)
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import pool from "@/lib/db";
import { redirect } from "next/navigation";
import AdminHeaderClient from "./AdminHeaderClient";

export default async function AdminHeader() {
  const session = await getServerSession(authOptions);
  // if (!session || session.user.role !== "admin") {
  //   redirect("/login");
  // }
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'manager' && session.user.role !== 'hr' && session.user.role !== 'blogger')) {
        redirect("/login");
    }
//     const allowedRoles = ['admin', 'manager', 'hr', 'blogger'];

// if (!session || !allowedRoles.includes(session.user.role)) {
//   redirect("/login");
// }

  const [users] = await pool.query(
    `SELECT id, empid, username, fullname, profile, role, status
     FROM users
     ORDER BY id DESC`
  );

  return <AdminHeaderClient session={session} users={users} />;
}


