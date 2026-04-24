"use client";
import { useEffect, useMemo, useState } from "react";
import {
  RefreshCcw, Database, Folder, AlertTriangle, ChevronDown, ChevronRight,
  Copy, ImageOff, Server, HardDrive, Search, CheckCircle2, Info
} from "lucide-react";
import { bytesToSize } from "@/lib/admin/bytes";

function TreeNode({ node, level = 0 }) {
  const [open, setOpen] = useState(level < 1);
  const hasChildren = (node.children || []).length > 0;

  return (
    <div className="border-l border-slate-200 ml-2">
      <button
        type="button"
        onClick={() => hasChildren && setOpen((v) => !v)}
        className={`w-full flex items-start justify-between gap-3 text-left py-2 px-3 rounded-lg transition-colors ${hasChildren ? 'hover:bg-slate-50' : ''
          }`}
      >
        <div className="flex items-start gap-2 min-w-0">
          <div className="mt-0.5 flex-shrink-0">
            {hasChildren ? (
              open ? (
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              )
            ) : (
              <div className="w-3.5 h-3.5 flex items-center justify-center">
                <div className="w-1 h-1 bg-slate-300 rounded-full" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className={`text-sm font-medium ${hasChildren ? 'text-slate-900' : 'text-slate-600'}`}>
              {node.path}
            </div>
          </div>
        </div>

        <div className="text-right flex-shrink-0 flex items-center gap-4">
          <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
            {node.imageCount} imgs • {bytesToSize(node.imageBytes)}
          </div>
          <div className="text-xs font-bold font-mono text-sky-700">
            {bytesToSize(node.bytes)}
          </div>
        </div>
      </button>

      {hasChildren && open && (
        <div className="space-y-0.5 ml-2">
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
  const [projectTree, setProjectTree] = useState(null);
  const [treeBase, setTreeBase] = useState(".");
  const [treeDepth, setTreeDepth] = useState(4);
  const [missing, setMissing] = useState(null);
  const [missingLoading, setMissingLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [success, setSuccess] = useState(false);

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      setToast("Copied to clipboard");
      setSuccess(true);
    } catch {
      setToast("Copy failed");
      setSuccess(false);
    } finally {
      setTimeout(() => {
        setToast("");
        setSuccess(false);
      }, 2500);
    }
  }

  async function loadFolderStats(p) {
    const res = await fetch(`/api/admin/storage/folder?path=${encodeURIComponent(p)}`, { cache: "no-store" });
    const json = await res.json();
    if (!res.ok || !json.ok) throw new Error(json.error || "Folder stats failed");
    setFolderStats(json);
  }

  async function loadProjectTree(base = treeBase, depth = treeDepth) {
    const res = await fetch(`/api/admin/storage/project-tree?base=${encodeURIComponent(base)}&depth=${depth}`, { cache: "no-store" });
    const json = await res.json();
    if (!res.ok || !json.ok) throw new Error(json.error || "Tree load failed");
    setProjectTree(json.tree);
  }

  async function loadMissingImages() {
    setMissingLoading(true);
    try {
      const res = await fetch("/api/admin/storage/missing-images", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Missing scan failed");
      setMissing(json);
      setToast("Integrity scan complete");
      setSuccess(true);
    } catch (e) {
      setToast(e?.message || "Scan failed");
      setSuccess(false);
    } finally {
      setMissingLoading(false);
      setTimeout(() => {
        setToast("");
        setSuccess(false);
      }, 3000);
    }
  }

  async function loadAll({ folder = folderPath, base = treeBase, depth = treeDepth } = {}) {
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
    } catch (e) {
      setToast(e?.message || "Failed to sync data");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const topTables = useMemo(() => (db?.tables ? db.tables.slice(0, 10) : []), [db]);

  return (
    <div className="p-6 lg:p-10">
      {/* Header Style Match */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-sky-900 tracking-tight">Storage & Integrity</h2>
          <p className="text-slate-500 text-sm mt-1">Audit database table sizes, project directories, and image references.</p>
        </div>
        <button
          onClick={() => loadAll()}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition-all disabled:opacity-50 shadow-sm"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? 'Syncing...' : 'Refresh Audit'}
        </button>
      </div>

      <div className="max-w-6xl space-y-12">
        {/* Section: Database Usage */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-bold text-sky-900 uppercase tracking-wider flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-400" /> Database Metrics
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Analysis of database table sizes and index overhead.
              Total DB Size: <span className="font-bold text-sky-700">{db ? bytesToSize(db.totalBytes) : "..."}</span>
            </p>
          </div>
          <div className="xl:col-span-2">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Table</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Rows</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Data</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Index</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {topTables.map((t) => (
                    <tr key={t.tableName} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-slate-900">{t.tableName}</td>
                      <td className="px-4 py-3 text-xs font-mono text-slate-500">{t.tableRows ?? "-"}</td>
                      <td className="px-4 py-3 text-xs font-mono text-slate-500">{bytesToSize(t.dataBytes)}</td>
                      <td className="px-4 py-3 text-xs font-mono text-slate-500">{bytesToSize(t.indexBytes)}</td>
                      <td className="px-4 py-3 text-xs font-bold font-mono text-sky-700">{bytesToSize(t.totalBytes)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="h-px bg-slate-100" />

        {/* Section: File Integrity */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-bold text-sky-900 uppercase tracking-wider flex items-center gap-2">
              <ImageOff className="w-4 h-4 text-rose-400" /> Integrity Check
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Detect broken image references (database URLs without physical files).
            </p>
            <button
              type="button"
              onClick={loadMissingImages}
              disabled={missingLoading}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-50"
            >
              <Search className={`h-3.5 w-3.5 ${missingLoading ? "animate-spin" : ""}`} />
              Run Integrity Scan
            </button>
          </div>
          <div className="xl:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Checked References</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{missing ? missing.stats?.checked : "—"}</p>
              </div>
              <div className={`p-4 border rounded-xl ${missing?.stats?.missingCount > 0 ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'}`}>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Missing Assets</p>
                <p className={`text-2xl font-black mt-1 ${missing?.stats?.missingCount > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {missing ? missing.stats?.missingCount : "—"}
                </p>
              </div>
            </div>

            {missing?.missing?.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="max-h-60 overflow-y-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 sticky top-0">
                        <th className="px-4 py-2 text-[10px] font-bold text-slate-500">Broken URL</th>
                        <th className="px-4 py-2 text-[10px] font-bold text-slate-500">Source</th>
                        <th className="px-4 py-2 text-[10px] font-bold text-slate-500">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {missing.missing.slice(0, 20).map((m, idx) => (
                        <tr key={idx} className="text-xs">
                          <td className="px-4 py-2 font-mono text-slate-600 break-all">{m.url}</td>
                          <td className="px-4 py-2 text-slate-400">{m.table}</td>
                          <td className="px-4 py-2">
                            <button onClick={() => copyText(m.url)} className="p-1.5 hover:bg-sky-50 rounded-lg text-sky-600 transition-colors">
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="h-px bg-slate-100" />

        {/* Section: Project Structure */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-bold text-sky-900 uppercase tracking-wider flex items-center gap-2">
              <Server className="w-4 h-4 text-slate-400" /> Project Structure
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Visualize directory sizes and resource distribution across the codebase.
            </p>
            <div className="mt-4 flex gap-2">
              <select
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 outline-none focus:ring-1 focus:ring-sky-500"
                value={treeBase}
                onChange={(e) => { setTreeBase(e.target.value); loadProjectTree(e.target.value, treeDepth); }}
              >
                <option value=".">Root (.)</option>
                <option value="src">src/</option>
                <option value="public">public/</option>
              </select>
              <select
                className="w-20 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 outline-none focus:ring-1 focus:ring-sky-500"
                value={treeDepth}
                onChange={(e) => { setTreeDepth(Number(e.target.value)); loadProjectTree(treeBase, Number(e.target.value)); }}
              >
                <option value={2}>D2</option>
                <option value={3}>D3</option>
                <option value={4}>D4</option>
              </select>
            </div>
          </div>
          <div className="xl:col-span-2">
            <div className="bg-white border border-slate-200 rounded-xl p-2 max-h-[500px] overflow-y-auto">
              {!projectTree ? (
                <div className="py-20 text-center text-xs text-slate-400">Analyzing structure...</div>
              ) : (
                <TreeNode node={projectTree} />
              )}
            </div>
          </div>
        </section>
      </div>

      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-2xl transition-all duration-500 flex items-center gap-3 border ${success ? 'bg-sky-900 border-sky-800 text-white' : 'bg-red-50 border-red-100 text-red-600'
          }`}>
          {success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Info className="w-4 h-4" />}
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}
    </div>
  );
}
