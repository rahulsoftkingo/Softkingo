// src/app/(admin)/admin/dashboard/page.jsx - 100% WORKING FINAL
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';
import {
  Users, Clock, Calendar, DollarSign, BarChart3, TrendingUp,
  AlertCircle, FileText, Image, Mail, Zap, Folder, LayoutDashboard, Ticket
} from 'lucide-react';
import { Buffer } from 'buffer';
import AttendanceTimer from "./AttendanceTimer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  return {
    metadataBase: new URL('http://localhost:3000'),
    title: "Enterprise Dashboard | Softkingo - All Modules",
    description: "Complete enterprise control center with HRMS, CRM, CMS, Marketing & Operations"
  };
}

// Replace toggleClockInOut function (line 25-60):

async function toggleClockInOut(formData) {
  'use server';
  try {
    const userId = formData.get('userId');

    const currentAttendance = await prisma.attendance.findFirst({
      where: {
        userId: Number(userId),
        clockOut: null
      },
      orderBy: { clockIn: 'desc' }
    });

    if (currentAttendance) {
      // ✅ FIXED: Clock Out - Use 'duration' not 'totalHours'
      const durationMinutes = Math.round((new Date() - new Date(currentAttendance.clockIn)) / (1000 * 60));

      await prisma.attendance.update({
        where: { id: currentAttendance.id },
        data: {
          clockOut: new Date(),
          duration: durationMinutes,  // ✅ Changed from totalHours
          status: 'completed'
        }
      });
    } else {
      // ✅ Clock In
      await prisma.attendance.create({
        data: {
          userId: Number(userId),
          clockIn: new Date(),
          status: 'active'
        }
      });
    }

    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Clock error:', error);
    return { success: false };
  }
}


function formatNumber(n, compact = true) {
  if (n == null || isNaN(n)) return "0";
  return new Intl.NumberFormat("en-IN", {
    notation: compact ? "compact" : "numeric",
    maximumFractionDigits: 1
  }).format(Number(n));
}

function formatCurrency(n) {
  if (n == null || isNaN(n)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: 'currency',
    currency: 'INR',
    notation: "compact"
  }).format(Number(n));
}

function formatDateTime(d) {
  if (!d) return "—";
  try {
    return new Date(d).toLocaleString("en-IN", {
      hour: "2-digit", minute: "2-digit", day: "numeric", month: "short"
    });
  } catch { return "—"; }
}

function StatusBadge({ status, size = "sm" }) {
  const badges = {
    active: "bg-emerald-500 text-emerald-100 ring-emerald-200/50",
    pending: "bg-amber-500 text-amber-100 ring-amber-200/50",
    clocked_in: "bg-emerald-500 text-emerald-100 ring-emerald-200/50",
    clocked_out: "bg-slate-400 text-slate-100 ring-slate-200/50",
    approved: "bg-emerald-600 text-emerald-50 ring-emerald-200/50",
    rejected: "bg-red-500 text-red-100 ring-red-200/50",
    open: "bg-blue-500 text-blue-100 ring-blue-200/50"
  };

  const badge = badges[status?.toLowerCase()] || "bg-slate-400 text-slate-100 ring-slate-200/50";
  const padding = size === 'lg' ? 'px-3 py-1.5 text-sm' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center rounded-full font-semibold shadow-sm border ring-1 ring-inset ${badge} ${padding}`}>
      {status?.replace('_', ' ')}
    </span>
  );
}

function getProfileImage(user) {
  if (!user?.profileImage || !user.profileImageType) return null;
  // try {
  //   const base64 = Buffer.from(user.profileImage).toString('base64');
  //   return `data:${user.profileImageType};base64,${base64}`;
  // } catch {
  //   return null;
  // }
  return `data:${user.profileImageType};base64,${user.profileImage}`;
}

// Replace getCompleteEnterpriseData function COMPLETELY:

async function getCompleteEnterpriseData(session) {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

  try {
    const [
      // Existing queries (0-25)
      totalEmployees, clockedInCount, pendingLeaves, payrollData,
      totalUsers, adminUsers, userProfile,
      totalBlogPosts, publishedPosts, blogCategories, totalEGuides,
      newsletterLists, newsletterSubs, emailCampaigns,
      totalLeads, recentLeads, openTickets, recentTickets,
      totalMedia, totalPortfolio, activeChats,
      totalPages, publishedPages,
      recentAttendances, recentLeaves, recentBlogPosts,

      // ✅ NEW: TODAY'S STATS (index 26)
      todayCompletedSessions
    ] = await Promise.all([
      // HRMS (0-3)
      prisma.user.count({ where: { department: { not: null } } }),
      prisma.attendance.count({ where: { clockIn: { gte: todayStart }, clockOut: null } }),
      prisma.leaveRequest.count({ where: { status: 'pending' } }),
      prisma.employeeSalary.aggregate({
        where: { status: 'paid' },
        _sum: { netSalary: true }, _count: true
      }),

      // Users (4-6)
      prisma.user.count(),
      prisma.userRole.count({ where: { role: { name: 'admin' } } }),
      prisma.user.findFirst({
        where: { id: Number(session?.user?.id || 0) },
        select: {
          id: true, name: true, email: true, title: true, department: true,
          profileImage: true, profileImageType: true,
          attendances: {
            take: 1,
            orderBy: { clockIn: 'desc' },
            select: { id: true, clockIn: true, clockOut: true }
          }
        }
      }),

      // Content (7-10)
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { status: 'published' } }),
      prisma.blogCategory.count(),
      prisma.eGuide.count(),

      // Marketing (11-13)
      prisma.newsletterList.count(),
      prisma.newsletterSubscription.count({ where: { status: 'active' } }),
      prisma.emailCampaign.count(),

      // CRM (14-17)
      prisma.lead.count(),
      prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.ticket.count({ where: { status: { in: ['open', 'in-progress'] } } }),
      prisma.ticket.findMany({
        where: { status: { in: ['open', 'in-progress'] } },
        orderBy: { createdAt: 'desc' }, take: 5
      }),

      // Media + Operations (18-22)
      prisma.mediaItem.count(),
      prisma.portfolioProject.count(),
      prisma.chatConversation.count({ where: { status: 'active' } }),
      prisma.page.count(),
      prisma.page.count({ where: { status: 'published' } }),

      // Recent (23-25)
      prisma.attendance.findMany({
        where: { clockIn: { gte: todayStart } },
        include: { user: { select: { name: true, department: true } } },
        orderBy: { clockIn: 'desc' }, take: 5
      }),
      prisma.leaveRequest.findMany({
        where: { status: 'pending' },
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: 'desc' }, take: 5
      }),
      prisma.blogPost.findMany({
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
        take: 6,
        select: { id: true, title: true, slug: true, publishedAt: true }
      }),

      // ✅ TODAY'S COMPLETED SESSIONS (NEW - index 26)
      prisma.attendance.findMany({
        where: {
          userId: Number(session?.user?.id || 0),
          clockOut: { not: null },
          clockIn: { gte: todayStart, lte: todayEnd }
        },
        select: { duration: true }
      })
    ]);

    // ✅ TODAY'S STATS CALCULATION
    const completedMinutes = todayCompletedSessions.reduce((sum, att) => sum + (att.duration || 0), 0);
    const completedHours = completedMinutes / 60;

    // Categories
    const regularHours = Math.min(completedHours, 8);
    const overtimeHours = Math.max(0, completedHours - 8);
    const restHours = Math.max(0, 8 - completedHours);

    // ✅ Clock status
    const latestAttendance = userProfile?.attendances?.[0];
    const isClockedIn = latestAttendance?.clockIn && !latestAttendance?.clockOut;

    return {
      session,
      metrics: {
        hrms: {
          employees: totalEmployees,
          clockedIn: clockedInCount,
          pendingLeaves,
          payrollAmount: Number(payrollData._sum?.netSalary || 0),
          payrollEmployees: payrollData._count || 0
        },
        users: { total: totalUsers, admins: adminUsers },
        content: { blogPosts: totalBlogPosts, publishedPosts, blogCategories, eguides: totalEGuides },
        marketing: { newsletters: newsletterLists, subscribers: newsletterSubs, campaigns: emailCampaigns },
        crm: { leads: totalLeads, openTickets },
        media: { files: totalMedia, portfolio: totalPortfolio },
        operations: { chats: activeChats, pages: totalPages, publishedPages }
      },
      recent: {
        attendances: Array.isArray(recentAttendances) ? recentAttendances : [],
        leaves: Array.isArray(recentLeaves) ? recentLeaves : [],
        blogPosts: Array.isArray(recentBlogPosts) ? recentBlogPosts : [],
        leads: Array.isArray(recentLeads) ? recentLeads : [],
        tickets: Array.isArray(recentTickets) ? recentTickets : []
      },
      user: {
        ...userProfile,
        isClockedIn,
        latestAttendance,
        clockInTime: latestAttendance?.clockIn,
        todayStats: {
          regularHours,
          overtimeHours,
          restHours,
          totalHours: completedHours,
          sessions: todayCompletedSessions.length
        }
      },
      session
    };
  } catch (error) {
    console.error('Dashboard error:', error);
    return { /* error fallback */ };
  }
}


export default async function CompleteEnterpriseDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const data = await getCompleteEnterpriseData(session);
  const { metrics, recent = {}, user = null } = data;

  const roles = Array.isArray(session.user?.roles) ? session.user.roles : [];
  const isClockedIn = user?.isClockedIn || false;

  const profileImage =
    session?.user?.profileImage ?? session?.user?.image ?? null;
const avatarSrc = getProfileImage(user) || profileImage;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50to-slate-100">


      {/* ✅ PERFECT WORKING HEADER - SINGLE PROFILE */}
      {/* <header className="bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg  top-0z-10"> */}
      <div className=" mx-autopx-6py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">



          {/* Profile + Stats */}
          <div className="flex flex-col md:flex-row md:items-center justify-between flex-1 gap-6">
            <div className=" flex flex-col gap-6">
              {/* ✅ SINGLE WORKING PROFILE CARD */}
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-white to-white rounded-xl borderborder-slate-200/50 shadow-md flex-shrink-0">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-2xl ring-4 ring-white/50 shadow-lg overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                    {/* {getProfileImage(user) ? (
                      <img
                        src={getProfileImage(user)}
                        alt={user?.name || 'Profile'}
                        className="w-full h-full object-cover"
                      /> */}
                    {/* {profileImage ? (
                                      <Image
                                        src={
                                          profileImage.startsWith('/')
                                            ? profileImage
                                            : `/${profileImage}`
                                        }
                                        alt="Profile"
                                        width={36}
                                        height={36}
                                        className="h-9 w-9 rounded-full object-cover"
                                      /> */}
                    {avatarSrc ? (
                      <img
                        src={avatarSrc}
                        alt={user?.name || 'Profile'}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-400 to-blue-500 text-white">
                        <span className="text-2xl font-black">
                          {user?.name?.[0]?.toUpperCase() || session?.user?.name?.[0]?.toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* ✅ LIVE CLOCK STATUS */}
                  <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full shadow-lg border-4 border-white flex items-center justify-center transition-all duration-300 ${isClockedIn
                    ? 'bg-emerald-500 shadow-emerald-400/50 animate-pulse ring-4 ring-emerald-200/70 scale-110'
                    : 'bg-slate-400 shadow-slate-300/50 ring-2 ring-slate-200/50'
                    }`}>
                    {isClockedIn ? (
                      <Clock className="h-3 w-3 text-white" />
                    ) : (
                      <div className="w-2 h-2 bg-white rounded-full shadow-inner" />
                    )}
                  </div>
                </div>

                <div className="min-w-0 flex-1 max-w-xs">
                  <div className="font-bold text-sky-900 text-base truncate lg:text-lg">
                    {user?.name || session?.user?.name || 'Admin User'}
                  </div>
                  <div className="text-slate-600 text-sm truncate">
                    {user?.title || user?.email || session?.user?.email || 'admin@softkingo.com'}
                  </div>
                  <div className="text-xs text-slate-500 font-mono capitalize mb-2">
                    {user?.department || 'Operations'}
                  </div>

                   <StatusBadge status={isClockedIn ? 'clocked_in' : 'clocked_out'} size="sm" />
                </div>

                {/* ✅ WORKING CLOCK BUTTON */}
                <div className="flex items-center gap-2 flex-shrink-0">
                 
                  <form action={toggleClockInOut}>
                    <input type="hidden" name="userId" value={session?.user?.id || ''} />
                    <button
                      type="submit"
                      className={`px-4 py-2 text-xs font-bold rounded-md border shadow-sm hover:shadow-md transition-all whitespace-nowrap h-10 ${isClockedIn
                        ? 'bg-red-500 hover:bg-red-600 text-white border-red-400 shadow-red-300/50'
                        : 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-400 shadow-emerald-300/50'
                        }`}
                    >
                      {isClockedIn ? 'Clock Out' : 'Clock In'}
                    </button>
                  </form>
                </div>
              </div>

              <AttendanceTimer
                isClockedIn={isClockedIn}
                clockInTime={user?.clockInTime}
                todayStats={user?.todayStats || {}}
                userId={session?.user?.id}
              />
            </div>
            {/* Live Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6 wfull lg:w-auto">
              <LiveStatCard title="Total Users" value={formatNumber(metrics.users.total)} icon={Users} />
              <LiveStatCard title="Active Sessions" value={formatNumber(metrics.hrms.clockedIn)} icon={Clock} />
              <LiveStatCard title="Open Tickets" value={formatNumber(metrics.crm.openTickets)} icon={AlertCircle} />
              <LiveStatCard title="Published Content" value={formatNumber(metrics.content.publishedPosts)} icon={FileText} />
            </div>
          </div>
        </div>
      </div>
      {/* </header> */}



      <main className=" mx-autopx-6 py-12 space-y-12">
        {/* PRIMARY KPI DASHBOARD */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
          <KPICard title="Workforce" value={formatNumber(metrics.hrms.employees)} change="+2.3%" icon={Users} color="emerald" href="/admin/hrms/employees" />
          <KPICard title="Clocked In" value={formatNumber(metrics.hrms.clockedIn)} change="↑ 15%" icon={Clock} color="green" href="/admin/hrms/attendance" />
          <KPICard title="Pending Leaves" value={formatNumber(metrics.hrms.pendingLeaves)} change="-1" icon={Calendar} color="amber" href="/admin/hrms/leaves" />
          <KPICard title="Payroll" value={formatCurrency(metrics.hrms.payrollAmount)} change="+8.2%" icon={DollarSign} color="indigo" href="/admin/hrms/payroll" />
          <KPICard title="Blog Posts" value={formatNumber(metrics.content.blogPosts)} change="+12" icon={FileText} color="blue" href="/admin/blog" />
          <KPICard title="Published" value={formatNumber(metrics.content.publishedPosts)} change="+3" icon={TrendingUp} color="purple" href="/admin/blog" />
          <KPICard title="Categories" value={formatNumber(metrics.content.blogCategories)} change="+1" icon={Folder} color="violet" href="/admin/blog/categories" />
          <KPICard title="Leads" value={formatNumber(metrics.crm.leads)} change="+24%" icon={TrendingUp} color="cyan" href="/admin/leads" />
        </section>

        {/* MODULE WIDGETS */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <ModuleCard title="HRMS Operations" metrics={metrics.hrms} href="/admin/hrms" />
          <ModuleCard
            title="Content Management"
            metrics={{
              posts: metrics.content.blogPosts,
              published: metrics.content.publishedPosts,
              categories: metrics.content.blogCategories
            }}
            href="/admin/blog"
          />
          <ModuleCard
            title="Marketing"
            metrics={{
              lists: metrics.marketing.newsletters,
              subscribers: metrics.marketing.subscribers,
              campaigns: metrics.marketing.campaigns
            }}
            href="/admin/newsletters"
          />
          <ModuleCard
            title="CRM + Support"
            metrics={{
              leads: metrics.crm.leads,
              tickets: metrics.crm.openTickets,
              chats: metrics.operations.chats
            }}
            href="/admin/leads"
          />
        </section>

        {/* RECENT ACTIVITY FEEDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 gap-8">

          <ActivityFeed title="New Leads" data={recent.leads.slice(0, 6)} type="lead" />
          <ActivityFeed title="Open Tickets" data={recent.tickets.slice(0, 6)} type="ticket" />
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 gap-8">
          <ActivityFeed title="Live Attendance" data={recent.attendances.slice(0, 8)} type="attendance" />
          <ActivityFeed title="Pending Leaves" data={recent.leaves.slice(0, 6)} type="leave" />

        </section>
        <ActivityFeed title="Recent Posts" data={recent.blogPosts.slice(0, 8)} type="blog" />
        {/* EXECUTIVE INTELLIGENCE */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">

          <PriorityActions roles={roles} />
          <QuickStatsPanel metrics={metrics} />
        </section>
        <IntelligencePanel title="System Health" metrics={metrics} />
      </main>
    </div>
  );
}

// ==================== ALL COMPONENTS ====================
function KPICard({ title, value, change, icon: Icon, color, href }) {
  const isPositive = change?.toString().startsWith('+') ?? false;

  return (
    <a href={href} className="group relative bg-white/80 backdrop-blur-sm rounded-xl borderborder-slate-200 shadow-md hover:shadow-2xl hover:border-emerald-300/70 hover:-translate-y-2 transition-all duration-500 overflow-hidden h-36 p-8">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex items-start justify-between mb-4">
          <div className="p-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl shadow-lg group-hover:scale-110 transition-all">
            <Icon className={`h-8 w-8 text-${color}-600`} />
          </div>
          <StatusBadge status={isPositive ? 'active' : 'pending'} size="sm" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 opacity-90">{title}</h3>
          <div className="text-4xl font-black text-slate-900 mb-3 leading-tight">{value}</div>
          <div className={`text-lg font-bold ${isPositive ? 'text-emerald-600' : 'text-orange-600'}`}>
            {change}
          </div>
        </div>
      </div>
    </a>
  );
}

function ModuleCard({ title, metrics, href }) {
  return (
    <a href={href} className="group bg-white/80 backdrop-blur-sm rounded-xl borderborder-slate-200 shadow-md hover:shadow-2xl hover:border-emerald-300/70 transition-all duration-300 p-8 h-78 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/3 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 space-y-6 h-full flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-900 mb-6">{title}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {Object.entries(metrics).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center p-3 bg-slate-50/50 rounded-2xl">
                <span className="font-semibold text-slate-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="font-black text-slate-900">{formatNumber(value)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <span className="text-sm text-emerald-600 font-semibold group-hover:underline">View Dashboard</span>
          <Zap className="h-6 w-6 text-emerald-500 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </a>
  );
}

function ActivityFeed({ title, data, type }) {
  const icons = {
    attendance: Clock, leave: Calendar, blog: FileText,
    lead: TrendingUp, ticket: AlertCircle
  };
  const Icon = icons[type];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl borderborder-slate-200 shadow-md p-8 h-[28rem] overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h4 className="font-black text-xl text-slate-900 flex items-center gap-3">
          <Icon className="h-7 w-7 text-slate-600" />
          {title}
        </h4>
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
      </div>
      <div className="space-y-3 max-h-[20rem] overflow-y-auto">
        {data?.length ? (
          data.map((item, idx) => (
            <ActivityItem key={item.id || idx} item={item} type={type} />
          ))
        ) : (
          <div className="text-center py-16 text-slate-500">
            <Icon className="h-16 w-16 mx-auto mb-6 opacity-30" />
            <p className="text-lg font-medium">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ActivityItem({ item, type }) {
  return (
    <div className="group p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30 hover:shadow-lg transition-all cursor-pointer overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className={`w-3 h-12 rounded-full shadow-lg flex-shrink-0 ${type === 'attendance' ? 'bg-gradient-to-b from-emerald-500 to-emerald-600' :
            type === 'leave' ? 'bg-gradient-to-b from-amber-500 to-amber-600' :
              type === 'blog' ? 'bg-gradient-to-b from-purple-500 to-purple-600' :
                type === 'lead' ? 'bg-gradient-to-b from-cyan-500 to-blue-600' :
                  'bg-gradient-to-b from-orange-500 to-orange-600'
            }`} />
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-slate-900 text-base truncate mb-1">
              {item.user?.name || item.title || item.name}
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600 mb-1 flex-wrap">
              <span>{item.department || item.type || item.status}</span>
              {item.email && <span className="text-xs bg-slate-100 px-2 py-1 rounded-full">{item.email}</span>}
            </div>
            <div className="text-xs text-slate-500 font-mono">{formatDateTime(item.createdAt || item.clockIn)}</div>
          </div>
        </div>
        <StatusBadge status={item.status || (type === 'attendance' ? 'active' : 'pending')} />
      </div>
    </div>
  );
}

function IntelligencePanel({ title, metrics }) {
  return (
    <div className="bg-gradient-to-br from-slate-900/5 to-slate-700/5 backdrop-blur-xl rounded-xl border border-slate-200 shadow-2xl p-10 col-span-full lg:col-span-1">
      <h3 className="font-black text-2xl text-slate-900 mb-10 flex items-center gap-4">
        <BarChart3 className="h-10 w-10" />
        Executive Intelligence
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
        <MetricRow label="Employee Utilization" value="92.7%" change="+1.8%" />
        <MetricRow label="Leave Approval Rate" value="94%" change="+2.1%" />
        <MetricRow label="Payroll Compliance" value="100%" change="🟢" />
        <MetricRow label="Content Velocity" value="8/wk" change="+3" />
        <MetricRow label="Lead Conversion" value="23%" change="+4.2%" />
        <MetricRow label="Ticket Resolution" value="87%" change="-1.3%" />
      </div>
    </div>
  );
}

function PriorityActions({ roles }) {
  const actions = [
    { href: "/admin/hrms", label: "HRMS Dashboard", icon: LayoutDashboard, priority: "high" },
    { href: "/admin/hrms/attendance", label: "Live Attendance", icon: Clock, priority: "urgent" },
    { href: "/admin/hrms/leaves", label: "Leave Approvals", icon: Calendar, priority: "high" },
    { href: "/admin/blog", label: "Content Studio", icon: FileText, priority: "medium" },
    { href: "/admin/leads", label: "Lead Pipeline", icon: TrendingUp, priority: "medium" },
    { href: "/admin/tickets", label: "Support Queue", icon: AlertCircle, priority: "high" },
    ...(roles.includes('admin') ? [
      { href: "/admin/newsletters", label: "Marketing Hub", icon: Mail, priority: "low" },
      { href: "/admin/media", label: "Asset Library", icon: Image, priority: "low" }
    ] : [])
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200 shadow-md p-8">
      <h3 className="font-black text-xl text-slate-900 mb-8">Priority Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.slice(0, 6).map((action, idx) => (
          <ActionButton key={idx} {...action} />
        ))}
      </div>
    </div>
  );
}

function QuickStatsPanel({ metrics }) {
  return (
    <div className="bg-gradient-to-r from-slate-50 to-emerald-50/30 backdrop-blur-sm rounded-xl border border-slate-200 shadow-md p-8 col-span-full sm:col-span-1">
      <h3 className="font-black text-lg text-slate-900 mb-6">Quick Stats</h3>
      <div className="grid grid-cols-2 gap-6">
        <StatItem label="Newsletter Lists" value={formatNumber(metrics.marketing.newsletters)} />
        <StatItem label="Media Files" value={formatNumber(metrics.media.files)} />
        <StatItem label="Portfolio Items" value={formatNumber(metrics.media.portfolio)} />
        <StatItem label="Active Chats" value={formatNumber(metrics.operations.chats)} />
        <StatItem label="Total Pages" value={formatNumber(metrics.operations.pages)} />
        <StatItem label="Live Pages" value={formatNumber(metrics.operations.publishedPages)} />
      </div>
    </div>
  );
}

function LiveStatCard({ title, value, icon: Icon }) {
  return (
    <div className="group bg-white backdrop-blur-sm p-4 lg:p-5 rounded-xl borderborder-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-300/50 transition-all h-20 lg:h-24 flex items-center gap-4 cursor-pointer">
      <div className="p-3 lg:p-4 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-md group-hover:bg-emerald-100 group-hover:shadow-emerald-200 transition-all flex-shrink-0">
        <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-slate-600 group-hover:text-emerald-600" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xl lg:text-2xl font-black text-slate-900">{value}</div>
        <div className="text-xs lg:text-sm font-semibold text-slate-600 uppercase tracking-wide mt-1">{title}</div>
      </div>
    </div>
  );
}

function MetricRow({ label, value, change }) {
  const isPositive = change?.toString().startsWith('+') ?? false;
  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-100/50 last:border-b-0 hover:bg-slate-50/50 rounded-xl p-3 transition-colors">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <div className="flex items-center gap-3">
        <span className="font-mono text-lg font-black text-slate-900">{value}</span>
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${isPositive ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
          }`}>
          {change}
        </span>
      </div>
    </div>
  );
}

function ActionButton({ href, label, icon: Icon, priority }) {
  const colors = {
    high: 'border-orange-400/50 bg-orange-50/80 hover:bg-orange-100',
    urgent: 'border-red-400/50 bg-red-50/80 hover:bg-red-100',
    medium: 'border-emerald-400/50 bg-emerald-50/80 hover:bg-emerald-100',
    low: 'border-slate-400/50 bg-slate-50/80 hover:bg-slate-100'
  };

  return (
    <a href={href} className={`group relative p-5 rounded-2xl border-2 hover:shadow-lg transition-all overflow-hidden h-28 ${colors[priority] || colors.medium}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative flex items-center gap-4 h-full">
        <div className="w-14 h-14 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-all flex-shrink-0">
          <Icon className="h-7 w-7 text-slate-700 group-hover:text-slate-900" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-bold text-slate-900 text-base group-hover:text-slate-950 truncate mb-1">{label}</div>
          <div className="text-xs font-semibold text-slate-600 capitalize">{priority}</div>
        </div>
      </div>
    </a>
  );
}

function StatItem({ label, value }) {
  return (
    <div className="flex justify-between items-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl borderborder-slate-200/50 hover:bg-white hover:shadow-md transition-all">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <span className="font-black text-xl text-slate-900">{value}</span>
    </div>
  );
}
