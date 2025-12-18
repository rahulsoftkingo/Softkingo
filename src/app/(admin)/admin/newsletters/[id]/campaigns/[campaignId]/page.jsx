import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function CampaignDetailPage({ params }) {
  const { id, campaignId } = await params;
  const listId = Number(id);
  const cId = Number(campaignId);

  const campaign = await prisma.emailCampaign.findUnique({
    where: { id: cId },
    include: {
      list: true,
      logs: {
        orderBy: { createdAt: "desc" },
        take: 50,
      },
    },
  });

  if (!campaign || campaign.listId !== listId) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-600">Campaign not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-slate-500 uppercase tracking-wide">
            Campaign
          </p>
          <h1 className="text-lg font-semibold text-slate-900">
            {campaign.name}
          </h1>
          <p className="text-xs text-slate-500">
            List: {campaign.list.name} · Status: {campaign.status}
          </p>
        </div>
        <Link
          href={`/admin/newsletters/${campaign.listId}`}
          className="text-xs text-slate-500 hover:text-sky-600"
        >
          ← Back to list
        </Link>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,260px)] gap-6">
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
          <div>
            <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
              Subject
            </p>
            <p className="text-sm text-slate-900">{campaign.subject}</p>
          </div>
          {campaign.preheader && (
            <div>
              <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
                Preheader
              </p>
              <p className="text-sm text-slate-800">
                {campaign.preheader}
              </p>
            </div>
          )}
          <div>
            <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
              HTML content (preview)
            </p>
            <div className="mt-2 rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-800 max-h-[380px] overflow-auto">
              <div
                dangerouslySetInnerHTML={{
                  __html: campaign.contentHtml || "<p>No content.</p>",
                }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 text-xs">
            <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
              Status
            </p>
            <p className="text-slate-800">{campaign.status}</p>
            <p className="text-[11px] text-slate-500">
              Created:{" "}
              {new Date(campaign.createdAt).toLocaleString("en-US")}
            </p>
            <p className="text-[11px] text-slate-500">
              Updated:{" "}
              {new Date(campaign.updatedAt).toLocaleString("en-US")}
            </p>
            <p className="text-[11px] text-slate-500">
              Scheduled:{" "}
              {campaign.scheduledFor
                ? new Date(
                    campaign.scheduledFor
                  ).toLocaleString("en-US")
                : "—"}
            </p>
            <p className="text-[11px] text-slate-500">
              Sent:{" "}
              {campaign.sentAt
                ? new Date(campaign.sentAt).toLocaleString("en-US")
                : "—"}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
            <p className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
              Activity log
            </p>
            <div className="max-h-[260px] overflow-auto divide-y divide-slate-100">
              {campaign.logs.map((log) => (
                <div
                  key={log.id}
                  className="py-1.5 flex items-center justify-between text-[11px]"
                >
                  <div>
                    <p className="font-medium text-slate-800">
                      {log.event}
                    </p>
                    {log.metaJson && (
                      <p className="text-slate-500">{log.metaJson}</p>
                    )}
                  </div>
                  <p className="text-slate-500">
                    {new Date(log.createdAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
              {!campaign.logs.length && (
                <p className="py-2 text-[11px] text-slate-500">
                  No logs yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
