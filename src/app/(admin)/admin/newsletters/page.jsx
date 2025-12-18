import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminNewslettersPage() {
  const lists = await prisma.newsletterList.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { subscribers: true, campaigns: true },
      },
    },
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            Newsletters
          </h1>
          <p className="text-xs text-slate-500">
            Manage newsletter lists, subscribers and campaigns.
          </p>
        </div>
        <Link
          href="/admin/newsletters/new"
          className="px-3 py-2 rounded-md bg-sky-600 text-white text-sm font-semibold hover:bg-sky-500"
        >
          New list
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                Name
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-500">
                Slug
              </th>
              <th className="px-3 py-2 text-right text-xs font-semibold text-slate-500">
                Subscribers
              </th>
              <th className="px-3 py-2 text-right text-xs font-semibold text-slate-500">
                Campaigns
              </th>
              <th className="px-3 py-2 text-right text-xs font-semibold text-slate-500">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list) => (
              <tr
                key={list.id}
                className="border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="px-3 py-2">
                  <Link
                    href={`/admin/newsletters/${list.id}`}
                    className="text-sm font-medium text-slate-900 hover:text-sky-700"
                  >
                    {list.name}
                  </Link>
                  {list.description && (
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {list.description}
                    </p>
                  )}
                </td>
                <td className="px-3 py-2 text-xs text-slate-500">
                  {list.slug}
                </td>
                <td className="px-3 py-2 text-right text-xs text-slate-700">
                  {list._count.subscribers}
                </td>
                <td className="px-3 py-2 text-right text-xs text-slate-700">
                  {list._count.campaigns}
                </td>
                <td className="px-3 py-2 text-right text-[11px] text-slate-500">
                  {new Date(list.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
            {!lists.length && (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-6 text-center text-xs text-slate-500"
                >
                  No newsletter lists yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
