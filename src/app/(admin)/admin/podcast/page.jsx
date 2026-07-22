// src/app/(admin)/podcasts/page.jsx
import Link from "next/link";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function deleteEpisode(formData) {
  "use server";
  const id = formData.get("id");
  if (!id) return;
  await prisma.podcast.delete({ where: { id } });
  revalidatePath("/admin/podcasts");
}

export default async function AdminPodcastsListPage() {
  const episodes = await prisma.podcast.findMany({
    orderBy: { createdAt: "desc" },
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "draft":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "published":
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case "draft":
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      default:
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Podcast Management</h1>
                <p className="text-slate-600 mt-1">
                  Manage all podcast episodes and track their performance
                </p>
              </div>
            </div>
            <Link
              href="/admin/podcasts/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-violet-500/25"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Episode
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Episodes</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{episodes.length}</p>
                </div>
                <div className="w-10 h-10 bg-violet-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Published</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {episodes.filter(e => e.status === 'published').length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Drafts</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {episodes.filter(e => e.status === 'draft').length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Plays</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {episodes.reduce((sum, ep) => sum + (ep.playCount || 0), 0)}
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {episodes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {episodes.map((episode) => (
              <div
                key={episode.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
              >
                {/* Cover Image */}
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                  {episode.coverImage ? (
                    <Image
                      src={episode.coverImage}
                      alt={episode.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        episode.status
                      )}`}
                    >
                      {getStatusIcon(episode.status)}
                      {episode.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black/70 text-white">
                      {episode.playCount || 0} plays
                    </span>
                  </div>
                  {episode.episodeNumber && (
                    <div className="absolute bottom-4 right-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-slate-700">
                        Ep. {episode.episodeNumber}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-semibold text-slate-900 line-clamp-2 flex-1 group-hover:text-violet-600 transition-colors duration-200">
                      {episode.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
                    {episode.description || episode.summary || "No description provided"}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      {episode.category && (
                        <span className="inline-flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          {episode.category}
                        </span>
                      )}
                      {episode.durationText && (
                        <span className="inline-flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {episode.durationText}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                    <div className="text-sm text-slate-500">
                      {episode.hostName && (
                        <span>Hosted by {episode.hostName}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/podcasts/${episode.slug}`}
                        target="_blank"
                        className="p-2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                        title="Preview"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <Link
                        href={`/admin/podcasts/${episode.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Link>
                      <form action={deleteEpisode}>
                        <input type="hidden" name="id" value={episode.id} />
                        <button
                          type="submit"
                          title="Delete"
                          className="p-2 text-slate-400 hover:text-rose-600 transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Episodes Yet</h3>
            <p className="text-slate-600 mb-6 max-w-sm mx-auto">
              Get started by publishing your first podcast episode to share with your audience.
            </p>
            <Link
              href="/admin/podcasts/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold rounded-xl transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Episode
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}