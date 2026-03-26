import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import AdminHeaderClient from "@/components/admin/AdminHeaderClient";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminSessionProvider from "./AdminSessionProvider";

export const metadata = {
  title: "Admin Dashboard | Softkingo",
  description: "Internal admin panel",
  robots: { index: false, follow: false, noarchive: true },
  alternates: { canonical: "https://softkingo.com/admin" }
};


export default async function AdminLayout({ children }) {
  // const session = await getServerSession(authOptions);
  // if (!session) redirect("/login?callbackUrl=/admin");
  const session = { user: { name: 'Admin', email: 'admin@softkingo.com' } };

  return (
    <AdminSessionProvider session={session}>
      <div className="min-h-screen flex bg-sky-50 text-slate-900 font-sans antialiased overflow-x-hidden">
        <aside className="hidden md:block w-64 bg-white fixed left-0 top-0 h-screen overflow-y-auto custom-scrollbar">
          <AdminSidebar />
        </aside>

        <div className="flex-1 md:ml-64 min-h-screen flex flex-col">
          <AdminHeaderClient session={session} />
          <main className="flex-1 p-3 md:p-6 overflow-y-auto">{children}</main>
        </div>
      </div>

      <style >{`
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
    </AdminSessionProvider>
  );
}
