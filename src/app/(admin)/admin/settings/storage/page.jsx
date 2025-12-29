"use client";

import { useEffect, useMemo, useState } from "react";
import {
  RefreshCcw,
  Database,
  Folder,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Copy,
  ImageOff,
} from "lucide-react";
import { bytesToSize } from "@/lib/admin/bytes";

function TreeNode({ node, level = 0 }) {
  const [open, setOpen] = useState(level < 1);
  const hasChildren = (node.children || []).length > 0;

  return (
    <div className="rounded-2xl border border-sky-100 bg-white p-3">
      <button
        type="button"
        onClick={() => hasChildren && setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-3 text-left"
      >
        <div className="flex items-start gap-2 min-w-0">
          <div className="mt-0.5 flex-shrink-0">
            {hasChildren ? (
              open ? (
                <ChevronDown className="h-4 w-4 text-slate-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-slate-500" />
              )
            ) : (
              <div className="h-4 w-4" />
            )}
          </div>

          <div className="min-w-0">
            <div className="text-sm font-semibold text-slate-900 truncate">
              {node.path}
            </div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              Images: {node.imageCount} • Img size: {bytesToSize(node.imageBytes)}
            </div>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <div className="text-sm font-bold font-mono text-slate-900">
            {bytesToSize(node.bytes)}
          </div>
          {node.truncated ? (
            <div className="text-xs text-red-600 mt-0.5">Truncated</div>
          ) : (
            <div className="text-xs text-slate-400 mt-0.5">
              {hasChildren ? (open ? "Hide" : "Show") : ""}
            </div>
          )}
        </div>
      </button>

      {hasChildren && open && (
        <div className="mt-3 space-y-2 pl-3 border-l-2 border-sky-200">
          {node.children.map((c) => (
            <TreeNode key={c.path} node={c} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function StorageSettingsPage() {
  const [db, setDb] = useState(null);

  const [folderPath, setFolderPath] = useState("public");
  const [folderStats, setFolderStats] = useState(null);

  // Project tree states
  const [projectTree, setProjectTree] = useState(null);
  const [treeBase, setTreeBase] = useState(".");
  const [treeDepth, setTreeDepth] = useState(4);

  // Missing images (DB -> public exists check)
  const [missing, setMissing] = useState(null);
  const [missingLoading, setMissingLoading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      setToast("Copied");
    } catch {
      setToast("Copy failed");
    } finally {
      setTimeout(() => setToast(""), 1500);
    }
  }

  async function loadFolderStats(p) {
    const res = await fetch(
      `/api/admin/storage/folder?path=${encodeURIComponent(p)}`,
      { cache: "no-store" }
    );
    const json = await res.json();
    if (!res.ok || !json.ok) throw new Error(json.error || "Folder stats failed");
    setFolderStats(json);
  }

  async function loadProjectTree(base = treeBase, depth = treeDepth) {
    const res = await fetch(
      `/api/admin/storage/project-tree?base=${encodeURIComponent(base)}&depth=${depth}`,
      { cache: "no-store" }
    );
    const json = await res.json();
    if (!res.ok || !json.ok) throw new Error(json.error || "Tree load failed");
    setProjectTree(json.tree);
  }

  async function loadMissingImages() {
    setMissingLoading(true);
    try {
      const res = await fetch("/api/admin/storage/missing-images", {
        cache: "no-store",
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Missing scan failed");
      setMissing(json);
      setToast("Missing scan done");
    } catch (e) {
      setToast(e?.message || "Missing scan failed");
    } finally {
      setMissingLoading(false);
      setTimeout(() => setToast(""), 2500);
    }
  }

  async function loadAll({
    folder = folderPath,
    base = treeBase,
    depth = treeDepth,
  } = {}) {
    setLoading(true);
    try {
      const [dbRes] = await Promise.all([
        fetch("/api/admin/storage/db", { cache: "no-store" }),
        loadFolderStats(folder),
        loadProjectTree(base, depth),
      ]);

      const dbJson = await dbRes.json();
      if (!dbRes.ok || !dbJson.ok) throw new Error(dbJson.error || "DB load failed");
      setDb(dbJson);

      setToast("Updated");
    } catch (e) {
      setToast(e?.message || "Failed");
    } finally {
      setLoading(false);
      setTimeout(() => setToast(""), 2500);
    }
  }

  useEffect(() => {
    loadAll({ folder: "public", base: ".", depth: 4 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const topTables = useMemo(() => (db?.tables ? db.tables.slice(0, 12) : []), [db]);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="rounded-3xl p-4 sm:p-6 bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-2xl shadow-sky-500/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Database className="h-7 w-7" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Storage & Usage</h2>
              <p className="text-white/90 text-sm mt-1">
                DB table size + project subfolders size + images usage.
              </p>
            </div>
          </div>

          <button
            onClick={() => loadAll()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 border border-white/30 transition text-sm"
            disabled={loading}
            type="button"
          >
            <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        <div className="mt-4 flex items-start gap-2 text-xs text-white/90">
          <AlertTriangle className="h-4 w-4 mt-0.5" />
          <p>
            Cloud Run production me folder scan container filesystem ke hisaab se hoga
            (ephemeral). Local/VM me accurate.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* DB */}
        <div className="bg-white/70 backdrop-blur rounded-3xl border border-sky-200 shadow-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Database className="h-5 w-5 text-sky-600" /> Database usage
            </h3>
            <div className="text-xs text-slate-600 font-mono">{db?.dbName || "—"}</div>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-sky-50 border border-sky-200 p-4 mb-4">
            <div className="text-sm font-semibold text-slate-800">Total DB size</div>
            <div className="text-sm font-bold text-slate-900 font-mono">
              {db ? bytesToSize(db.totalBytes) : "Loading..."}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-600 border-b">
                  <th className="py-2 pr-2">Table</th>
                  <th className="py-2 pr-2">Rows</th>
                  <th className="py-2 pr-2">Data</th>
                  <th className="py-2 pr-2">Index</th>
                  <th className="py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {topTables.map((t) => (
                  <tr key={t.tableName} className="border-b last:border-b-0">
                    <td className="py-2 pr-2 font-semibold text-slate-900">{t.tableName}</td>
                    <td className="py-2 pr-2 text-slate-700 font-mono">{t.tableRows ?? "-"}</td>
                    <td className="py-2 pr-2 text-slate-700 font-mono">{bytesToSize(t.dataBytes)}</td>
                    <td className="py-2 pr-2 text-slate-700 font-mono">{bytesToSize(t.indexBytes)}</td>
                    <td className="py-2 text-slate-900 font-mono font-semibold">
                      {bytesToSize(t.totalBytes)}
                    </td>
                  </tr>
                ))}

                {!topTables.length && (
                  <tr>
                    <td className="py-4 text-slate-500" colSpan={5}>
                      Loading...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Project tree */}
        <div className="bg-white/70 backdrop-blur rounded-3xl border border-sky-200 shadow-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 gap-3">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Folder className="h-5 w-5 text-sky-600" /> Project folders
            </h3>

            <div className="flex gap-2">
              <select
                className="px-3 py-2 rounded-xl border border-sky-200 bg-white text-sm"
                value={treeBase}
                onChange={(e) => {
                  const v = e.target.value;
                  setTreeBase(v);
                  loadProjectTree(v, treeDepth);
                }}
              >
                <option value=".">Project (.)</option>
                <option value="src">src</option>
                <option value="public">public</option>
                <option value="app">app</option>
                <option value="prisma">prisma</option>
              </select>

              <select
                className="px-3 py-2 rounded-xl border border-sky-200 bg-white text-sm"
                value={treeDepth}
                onChange={(e) => {
                  const d = Number(e.target.value);
                  setTreeDepth(d);
                  loadProjectTree(treeBase, d);
                }}
              >
                <option value={2}>D2</option>
                <option value={3}>D3</option>
                <option value={4}>D4</option>
                <option value={5}>D5</option>
              </select>
            </div>
          </div>

          {!projectTree ? (
            <div className="text-sm text-slate-500">Loading tree...</div>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              <TreeNode node={projectTree} />
            </div>
          )}
        </div>

        {/* Folder usage */}
        <div className="bg-white/70 backdrop-blur rounded-3xl border border-sky-200 shadow-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Folder className="h-5 w-5 text-sky-600" /> Folder image usage
            </h3>

            <select
              className="px-3 py-2 rounded-xl border border-sky-200 bg-white text-sm"
              value={folderPath}
              onChange={(e) => {
                const p = e.target.value;
                setFolderPath(p);
                loadFolderStats(p).catch((err) => setToast(err?.message || "Folder stats failed"));
              }}
            >
              <option value="public">public</option>
              <option value="public/images">public/images</option>
              <option value="public/uploads">public/uploads</option>
              <option value="src">src</option>
              <option value="src/assets">src/assets</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-2xl bg-sky-50 border border-sky-200 p-4">
              <div className="text-xs text-slate-600 font-semibold">Folder size</div>
              <div className="text-lg font-bold font-mono text-slate-900">
                {folderStats ? bytesToSize(folderStats.totalBytes) : "Loading..."}
              </div>
            </div>

            <div className="rounded-2xl bg-sky-50 border border-sky-200 p-4">
              <div className="text-xs text-slate-600 font-semibold">Images count</div>
              <div className="text-lg font-bold font-mono text-slate-900">
                {folderStats ? folderStats.imageCount : "Loading..."}
              </div>
            </div>

            <div className="rounded-2xl bg-sky-50 border border-sky-200 p-4">
              <div className="text-xs text-slate-600 font-semibold">Images size</div>
              <div className="text-lg font-bold font-mono text-slate-900">
                {folderStats ? bytesToSize(folderStats.imageBytes) : "Loading..."}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-mono">
                Avg: {folderStats ? bytesToSize(folderStats.avgImageBytes) : "—"}
              </div>
            </div>
          </div>

          {folderStats?.largestImage && (
            <div className="mt-4 rounded-2xl border border-sky-100 bg-white p-4">
              <div className="text-xs font-semibold text-slate-600 mb-1">Largest image</div>
              <div className="text-sm font-semibold text-slate-900 break-all">
                {folderStats.largestImage.path}
              </div>
              <div className="text-xs text-slate-600 font-mono mt-1">
                {bytesToSize(folderStats.largestImage.bytes)}
              </div>
            </div>
          )}
        </div>

        {/* NEW: Missing images (DB) */}
        <div className="bg-white/70 backdrop-blur rounded-3xl border border-sky-200 shadow-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 gap-3">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <ImageOff className="h-5 w-5 text-rose-600" /> Missing images (DB → 404)
            </h3>

            <button
              type="button"
              onClick={loadMissingImages}
              disabled={missingLoading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition text-sm disabled:opacity-50"
            >
              <RefreshCcw className={`h-4 w-4 ${missingLoading ? "animate-spin" : ""}`} />
              Scan Missing (DB)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4">
              <div className="text-xs text-slate-700 font-semibold">Checked</div>
              <div className="text-lg font-bold font-mono text-slate-900">
                {missing ? missing.stats?.checked : "—"}
              </div>
            </div>

            <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4">
              <div className="text-xs text-slate-700 font-semibold">Missing</div>
              <div className="text-lg font-bold font-mono text-rose-700">
                {missing ? missing.stats?.missingCount : "—"}
              </div>
            </div>

            <div className="rounded-2xl bg-sky-50 border border-sky-200 p-4">
              <div className="text-xs text-slate-700 font-semibold">Tip</div>
              <div className="text-xs text-slate-600 mt-1">
                Missing means DB url exists but file not found in /public.
              </div>
            </div>
          </div>

          {!missing ? (
            <div className="text-sm text-slate-500">
              Click “Scan Missing (DB)” to detect broken image references.
            </div>
          ) : !missing.missing?.length ? (
            <div className="text-sm text-green-700 font-semibold">
              No missing images found ✅
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-600 border-b">
                    <th className="py-2 pr-2">URL</th>
                    <th className="py-2 pr-2">DB ref</th>
                    <th className="py-2">Copy</th>
                  </tr>
                </thead>
                <tbody>
                  {missing.missing.slice(0, 50).map((m, idx) => (
                    <tr key={`${m.table}-${m.rowId}-${m.field}-${idx}`} className="border-b last:border-b-0">
                      <td className="py-2 pr-2 font-mono text-slate-900 break-all">
                        {m.url}
                      </td>
                      <td className="py-2 pr-2 text-slate-700 font-mono break-all">
                        {m.table}#{m.rowId}.{m.field}
                      </td>
                      <td className="py-2">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => copyText(m.url)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition text-xs"
                          >
                            <Copy className="h-3.5 w-3.5" />
                            URL
                          </button>
                          <button
                            type="button"
                            onClick={() => copyText(`${m.table}#${m.rowId}.${m.field}`)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition text-xs"
                          >
                            <Copy className="h-3.5 w-3.5" />
                            Ref
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {missing.missing.length > 50 && (
                    <tr>
                      <td colSpan={3} className="py-3 text-xs text-slate-500">
                        Showing first 50 results. Total missing: {missing.missing.length}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 text-sm">
          {toast}
        </div>
      )}
    </div>
  );
}
