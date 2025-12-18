import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from "next/navigation";

import AdminHeaderClient from '@/components/admin/AdminHeaderClient';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminSessionProvider from './AdminSessionProvider';

export default async function AdminLayout({ children }) {
 
  // const primaryRole = session?.user?.roles?.[0] || session?.user?.role || 'admin';
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/admin"); // or current path if you want
  }

  return (
    <>
    
        <AdminSessionProvider session={session}>
          <div className="min-h-screen flex bg-sky-50 text-slate-900 font-sans antialiased ">
            {/* Sidebar desktop - Fixed position */}
            <aside className="hidden md:block w-64 bg-white fixed left-0 top-0 h-screen overflow-y-auto custom-scrollbar">
              {/* <AdminSidebar role={primaryRole} /> */}
                      <AdminSidebar />

            </aside>

            {/* Main content area */}
            <div className="flex-1 md:ml-64 min-h-screen flex flex-col">
              {/* Header - Starts after sidebar */}
              <AdminHeaderClient session={session} />
              
              {/* Main content with independent scrolling */}
              <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
                <div className="bg-white p-4lg:p-6 min-h-[calc(100vh-80px)] ">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </AdminSessionProvider>

        <style  global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f0f9ff;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #bae6fd;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #7dd3fc;
          }
        `}</style>
      
    </>
  );
}
