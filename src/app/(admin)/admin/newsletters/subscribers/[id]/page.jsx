import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function SubscriberDetailPage({ params }) {
  const { id } = await params;
  const subId = Number(id);

  const subscriber = await prisma.newsletterSubscription.findUnique({
    where: { id: subId },
    include: {
      list: true,
      events: {
        orderBy: { createdAt: "desc" },
        take: 30,
      },
    },
  });

  if (!subscriber) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-600">Subscriber not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-slate-500 uppercase tracking-wide">
            Subscriber
          </p>
          <h1 className="text-lg font-semibold text-slate-900">
            {subscriber.email}
          </h1>
          <p className="text-xs text-slate-500">
            List: {subscriber.list.name} · Status: {subscriber.status}
          </p>
        </div>
        <Link
          href={`/admin/newsletters/${subscriber.listId}`}
          className="text-xs text-slate-500 hover:text-sky-600"
        >
          ← Back to list
        </Link>
      </div>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold text-slate-800">
          Activity
        </h2>
        <div className="rounded-lg border border-slate-200 bg-white divide-y divide-slate-100">
          {subscriber.events.map((e) => (
            <div
              key={e.id}
              className="px-3 py-2 text-xs flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-slate-800">
                  {e.type}
                </p>
                {e.metaJson && (
                  <p className="text-[11px] text-slate-500">
                    {e.metaJson}
                  </p>
                )}
              </div>
              <p className="text-[11px] text-slate-500">
                {new Date(e.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}
          {!subscriber.events.length && (
            <p className="px-3 py-4 text-[11px] text-slate-500">
              No events recorded yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
