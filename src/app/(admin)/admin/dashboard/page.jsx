// src/app/(admin)/admin/dashboard/page.jsx
import prisma from '@/lib/prisma';
export const dynamic = "force-dynamic";

async function getDashboardData() {
  const [users, leads, tickets, blogPosts] = await Promise.all([
    prisma.user.count(),
    prisma.lead.count(),
    prisma.ticket.count({ where: { status: { in: ['open', 'in-progress'] } } }),
    prisma.blogPost.count({ where: { status: 'published' } }),
  ]);

  const recentLeads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const recentTickets = await prisma.ticket.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const latestPosts = await prisma.blogPost.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  return { users, leads, tickets, blogPosts, recentLeads, recentTickets, latestPosts };
}

export default async function AdminDashboardPage() {
  const { users, leads, tickets, blogPosts, recentLeads, recentTickets, latestPosts } =
    await getDashboardData();

  return (
    <div className="space-y-6">
      {/* Hero strip with gradient + key numbers */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-400 px-5 py-5 sm:px-7 sm:py-6 text-white shadow-[0_18px_45px_rgba(15,23,42,0.28)]">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-sky-100/90">
              Softkingo admin
            </p>
            <h1 className="mt-1 text-xl sm:text-2xl lg:text-3xl font-semibold">
              Control center overview
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-sky-100/90 max-w-xl">
              See how your content, leads and support are performing at a glance.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs">
            <HeroPill label="Users" value={users} />
            <HeroPill label="Leads" value={leads} />
            <HeroPill label="Open tickets" value={tickets} />
            <HeroPill label="Published posts" value={blogPosts} />
          </div>
        </div>
      </section>

      {/* Metrics row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="CRM"
          title="Leads pipeline"
          value={leads}
          trend="+12 new this week"
        />
        <MetricCard
          label="Support"
          title="Active tickets"
          value={tickets}
          trend="Keep SLA under control"
        />
        <MetricCard
          label="Content"
          title="Live articles"
          value={blogPosts}
          trend="Stay consistent with publishing"
        />
        <MetricCard
          label="Security"
          title="Admin users"
          value={users}
          trend="Review roles & access"
        />
      </section>

      {/* Activity + content */}
      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] gap-4 xl:gap-6">
        <GlassPanel title="Recent leads & tickets">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <SubPanel title="Recent leads">
              {recentLeads.length === 0 ? (
                <EmptyState message="No leads yet." />
              ) : (
                <ul className="space-y-2.5">
                  {recentLeads.map((lead) => (
                    <li
                      key={lead.id}
                      className="rounded-2xl bg-slate-50 px-3 py-2.5 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {lead.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {lead.email}
                          {lead.source ? ` · ${lead.source}` : ''}
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </SubPanel>

            <SubPanel title="Recent tickets">
              {recentTickets.length === 0 ? (
                <EmptyState message="No tickets yet." />
              ) : (
                <ul className="space-y-2.5">
                  {recentTickets.map((t) => (
                    <li
                      key={t.id}
                      className="rounded-2xl bg-slate-50 px-3 py-2.5 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {t.subject}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {t.email} · {t.status}
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {new Date(t.createdAt).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </SubPanel>
          </div>
        </GlassPanel>

        <GlassPanel title="Latest content & quick actions">
          <div className="space-y-4">
            <SubPanel title="Latest published posts">
              {latestPosts.length === 0 ? (
                <EmptyState message="No published posts yet." />
              ) : (
                <ul className="space-y-2.5">
                  {latestPosts.map((post) => (
                    <li
                      key={post.id}
                      className="rounded-2xl bg-slate-50 px-3 py-2.5 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {post.title}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {post.type || 'Blog'}
                          {post.readTimeMinutes
                            ? ` · ${post.readTimeMinutes} min read`
                            : ''}
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString()
                          : '—'}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </SubPanel>

            <SubPanel title="What to do next">
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="rounded-xl bg-slate-50 px-3 py-2">
                  • Assign new leads to the correct owner.
                </li>
                <li className="rounded-xl bg-slate-50 px-3 py-2">
                  • Check pending tickets and update their status.
                </li>
                <li className="rounded-xl bg-slate-50 px-3 py-2">
                  • Publish at least one new blog or insight this week.
                </li>
                <li className="rounded-xl bg-slate-50 px-3 py-2">
                  • Refresh hero events for upcoming campaigns or festivals.
                </li>
              </ul>
            </SubPanel>
          </div>
        </GlassPanel>
      </section>
    </div>
  );
}

function HeroPill({ label, value }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
      <span className="uppercase tracking-[0.18em]">{label}</span>
      <span className="text-xs font-semibold ml-1">{value}</span>
    </span>
  );
}

function MetricCard({ label, title, value, trend }) {
  return (
    <div className="rounded-2xl bg-white/80 backdrop-blur-sm shadow-[0_14px_35px_rgba(15,23,42,0.08)] px-4 py-4 sm:px-5 sm:py-5 flex flex-col gap-1.5">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
      <p className="text-xs text-slate-500">{trend}</p>
    </div>
  );
}

function GlassPanel({ title, children }) {
  return (
    <div className="rounded-3xl bg-white/80 backdrop-blur-sm shadow-[0_18px_45px_rgba(15,23,42,0.10)] px-4 py-4 sm:px-5 sm:py-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function SubPanel({ title, children }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-[0.16em]">
        {title}
      </h3>
      {children}
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-3 py-4 text-sm text-slate-500">
      {message}
    </div>
  );
}
