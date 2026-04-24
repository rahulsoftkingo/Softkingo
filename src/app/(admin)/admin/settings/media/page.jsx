"use client";

import React, { useEffect, useMemo, useState, Fragment } from "react";
import Image from "next/image";
import {
  Folder,
  Image as ImageIcon,
  Upload,
  Trash2,
  Edit3,
  Plus,
  X,
  RefreshCcw,
  ChevronRight,
  ChevronDown,
  Copy,
  Search,
  Link as LinkIcon,
} from "lucide-react";

function bytesToSize(bytes = 0) {
  if (!bytes || bytes <= 0) return "0 B";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(2)} GB`;
}

export default function MediaManagerPage() {
  const [tree, setTree] = useState(null);
  const [currentFolder, setCurrentFolder] = useState("");
  const [selected, setSelected] = useState(null);

  const [uploadFile, setUploadFile] = useState(null);
  const [overwrite, setOverwrite] = useState(false);
  const [customName, setCustomName] = useState("");

  const [newFolderName, setNewFolderName] = useState("");
  const [renameTo, setRenameTo] = useState("");

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [collapsed, setCollapsed] = useState({});

  // Delete confirm modal state
  const [confirmDelete, setConfirmDelete] = useState(null); // { type:"folder"|"file", path:"..." }

  // Usage modal state (for selected image)
  const [usageOpen, setUsageOpen] = useState(false);
  const [usageLoading, setUsageLoading] = useState(false);
  const [usageData, setUsageData] = useState(null);

  async function loadTree() {
    const res = await fetch("/api/media/tree", { cache: "no-store" });
    const data = await res.json();
    setTree(data.root);
  }

  useEffect(() => {
    loadTree();
  }, []);

  const currentNode = useMemo(() => {
    if (!tree) return null;

    const find = (node, targetPath) => {
      if ((node.path || "") === (targetPath || "")) return node;
      for (const f of node.folders || []) {
        const got = find(f, targetPath);
        if (got) return got;
      }
      return null;
    };

    return find(tree, currentFolder);
  }, [tree, currentFolder]);

  const breadcrumb = useMemo(() => {
    const parts = (currentFolder || "").split("/").filter(Boolean);
    const crumbs = [{ label: "public", path: "" }];
    let acc = "";
    for (const p of parts) {
      acc = acc ? `${acc}/${p}` : p;
      crumbs.push({ label: p, path: acc });
    }
    return crumbs;
  }, [currentFolder]);

  async function createFolder() {
    if (!newFolderName.trim()) return;
    setLoading(true);
    try {
      await fetch("/api/media/mkdir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          folder: currentFolder
            ? `${currentFolder}/${newFolderName.trim()}`
            : newFolderName.trim(),
        }),
      });
      setNewFolderName("");
      await loadTree();
      setToast("Folder created");
    } catch {
      setToast("Folder create failed");
    } finally {
      setLoading(false);
    }
  }

  async function upload() {
    if (!uploadFile) return;
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("file", uploadFile);
      fd.append("folder", currentFolder);
      fd.append("overwrite", overwrite ? "true" : "false");
      if (customName.trim()) fd.append("name", customName.trim());

      const res = await fetch("/api/media/upload", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        setToast(data.error || "Upload failed");
        return;
      }

      setUploadFile(null);
      setCustomName("");
      await loadTree();
      setToast("Uploaded");
    } catch (e) {
      setToast(e?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  async function rename() {
    if (!selected || !renameTo.trim()) return;
    setLoading(true);

    try {
      const newPath = currentFolder ? `${currentFolder}/${renameTo.trim()}` : renameTo.trim();

      const res = await fetch("/api/media/rename", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPath: selected.path,
          newPath,
        }),
      });

      if (!res.ok) {
        setToast("Rename failed");
        return;
      }

      setSelected(null);
      setRenameTo("");
      await loadTree();
      setToast("Renamed");
    } catch {
      setToast("Rename failed");
    } finally {
      setLoading(false);
    }
  }

  // Confirm delete flow
  function askDelete(type, targetPath) {
    setConfirmDelete({ type, path: targetPath });
  }

  async function confirmDeleteNow() {
    if (!confirmDelete) return;
    setLoading(true);
    try {
      const res = await fetch("/api/media/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetPath: confirmDelete.path, type: confirmDelete.type }),
      });

      if (!res.ok) {
        setToast("Delete failed");
        return;
      }

      // if deleting selected file, close drawer
      if (confirmDelete.type === "file" && selected?.path === confirmDelete.path) {
        setSelected(null);
      }

      await loadTree();
      setToast(confirmDelete.type === "folder" ? "Folder deleted" : "File deleted");

      if (confirmDelete.type === "folder" && (currentFolder || "").startsWith(confirmDelete.path)) {
        setCurrentFolder("");
      }
    } catch {
      setToast("Delete failed");
    } finally {
      setLoading(false);
      setConfirmDelete(null);
    }
  }

  async function copyUrl(url) {
    try {
      await navigator.clipboard.writeText(url);
      setToast("Copied URL");
    } catch {
      setToast("Copy failed");
    }
  }

  async function checkUsageForSelected() {
    if (!selected?.url) return;
    setUsageOpen(true);
    setUsageLoading(true);
    setUsageData(null);

    try {
      const res = await fetch(
        `/api/media/usage?url=${encodeURIComponent(selected.url)}`,
        { cache: "no-store" }
      );
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Usage fetch failed");
      setUsageData(json);
    } catch (e) {
      setUsageData({ ok: false, error: e?.message || "Usage fetch failed" });
    } finally {
      setUsageLoading(false);
    }
  }

  function FolderTree({ node }) {
    const isActive = (node.path || "") === (currentFolder || "");
    const isCollapsed = collapsed[node.path];
    const hasSubfolders = node.folders && node.folders.length > 0;

    return (
      <div className="space-y-1">
        <div
          onClick={() => setCurrentFolder(node.path || "")}
          className={`w-full flex items-center justify-between rounded-xl px-3 py-2 transition cursor-pointer ${isActive ? "bg-sky-600 text-white shadow-sm" : "hover:bg-sky-50 text-slate-800"
            }`}
        >
          <span className="flex items-center gap-2 flex-1 min-w-0">
            <Folder
              className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-white" : "text-amber-500"
                }`}
            />
            <span className="text-sm font-medium truncate">
              {node.path ? node.name : "public"}
            </span>
          </span>

          <span className="flex items-center gap-1 flex-shrink-0 ml-2">
            {node.path && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  askDelete("folder", node.path);
                }}
                className={`p-1 rounded-lg ${isActive ? "hover:bg-white/20" : "hover:bg-sky-100"}`}
                title="Delete folder"
                type="button"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}

            {hasSubfolders && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCollapsed((prev) => ({ ...prev, [node.path]: !prev[node.path] }));
                }}
                className={`p-1 rounded-lg ${isActive ? "hover:bg-white/20" : "hover:bg-sky-100"}`}
                type="button"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            )}
          </span>
        </div>

        {hasSubfolders && !isCollapsed && (
          <div className="pl-4 border-l-2 border-sky-200 space-y-1 ml-2">
            {node.folders.map((c) => (
              <FolderTree key={c.path} node={c} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-sky-900 tracking-tight flex items-center gap-2">
            <ImageIcon className="h-6 w-6 text-sky-600" /> Media Manager
          </h2>
          <p className="text-slate-500 text-sm mt-1">Organize and manage your assets within the public directory.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadTree}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition-all disabled:opacity-50 shadow-sm text-sm"
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Breadcrumb - Slightly refined */}
      <div className="flex items-center gap-2 text-sm overflow-x-auto scrollbar-hide mb-6 p-1">
        {breadcrumb.map((c, i) => (
          <React.Fragment key={c.path}>
            {i > 0 && <span className="text-slate-300">/</span>}
            <button
              onClick={() => setCurrentFolder(c.path)}
              className={`px-3 py-1 rounded-lg transition-colors text-xs font-semibold ${currentFolder === c.path
                  ? 'bg-sky-100 text-sky-700'
                  : 'text-slate-500 hover:bg-slate-100'
                }`}
              type="button"
            >
              {c.label || 'root'}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left: folder tree */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-sky-200 shadow-sm p-4 max-h-[500px] lg:max-h-[100vh] flex flex-col">
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Folders</h3>
            </div>

            <div className="space-y-2 flex-1 overflow-y-auto scrollbar-hide pr-2">
              {tree ? <FolderTree node={tree} /> : <p className="text-sm text-slate-500">Loading…</p>}
            </div>

            {/* Create folder */}
            <div className="mt-4 pt-4 border-t border-sky-100 flex-shrink-0">
              <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200">
                <p className="text-xs text-slate-600 mb-2">Create new folder</p>
                <div className="space-y-2">
                  <input
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="e.g. banners"
                    className="w-full px-3 py-2 rounded-xl border border-sky-200 bg-white outline-none focus:ring-2 focus:ring-sky-500/30 text-sm"
                  />
                  <button
                    onClick={createFolder}
                    disabled={loading || !newFolderName.trim()}
                    className="w-full px-3 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-700 transition inline-flex items-center justify-center gap-2 disabled:opacity-50 text-sm font-medium"
                    type="button"
                  >
                    <Plus className="h-4 w-4" />
                    Create Folder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: uploader + grid */}
        <div className="lg:col-span-9 space-y-4 sm:space-y-6">
          {/* uploader */}
          <div className="bg-white rounded-xl border border-sky-200 shadow-sm p-4">
            <p className="text-sm font-semibold text-slate-900 mb-1">
              Upload to: /{currentFolder || ""}
            </p>
            <p className="text-xs text-slate-500 mb-3">Files are accessible directly from URL</p>

            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="file"
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="flex-1 text-sm file:mr-2 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-sky-500 file:text-white hover:file:bg-sky-600 file:text-sm file:font-medium"
                  accept="image/*"
                />
                <input
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Optional: hero.png"
                  className="flex-1 px-3 py-2 rounded-xl border border-sky-200 bg-white outline-none focus:ring-2 focus:ring-sky-500/30 text-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={overwrite}
                    onChange={(e) => setOverwrite(e.target.checked)}
                    className="rounded border-sky-300 text-sky-500 focus:ring-sky-500 w-4 h-4"
                  />
                  Overwrite if exists
                </label>

                <button
                  onClick={upload}
                  disabled={!uploadFile || loading}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50 text-sm shadow-sm"
                  type="button"
                >
                  <Upload className="h-4 w-4" />
                  {loading ? "Uploading…" : "Upload File"}
                </button>
              </div>
            </div>
          </div>

          {/* grid */}
          <div className="bg-white/70 backdrop-blur rounded-xl border border-sky-200 shadow-sm p-4 max-h-[500px] lg:max-h-[600px] overflow-y-auto scrollbar-hide">
            <div className="flex items-center justify-between mb-4 sticky top-0 bg-white/70 backdrop-blur pb-3 border-b border-sky-100">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base truncate">
                {currentNode ? `/${currentNode.path}` : "/"} assets
              </h3>
              <span className="text-xs text-slate-500 flex-shrink-0 ml-2">
                {currentNode ? `${currentNode.files.length} files` : ""}
              </span>
            </div>

            {!currentNode ? (
              <div className="h-64 flex items-center justify-center">
                <p className="text-sm text-slate-500">Select a folder to view files.</p>
              </div>
            ) : currentNode.files.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center text-slate-500">
                <ImageIcon className="w-16 h-16 text-slate-400 mb-4 opacity-50" />
                <p className="text-base font-medium">No files here</p>
                <p className="text-sm mt-1">Upload your first image above</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {currentNode.files.map((f) => (
                  <button
                    key={f.path}
                    onClick={() => {
                      setSelected(f);
                      setRenameTo(f.name);
                      setUsageData(null);
                      setUsageOpen(false);
                    }}
                    className="group rounded-2xl border-2 border-sky-200 bg-white hover:shadow-xl hover:border-sky-400 hover:scale-[1.02] transition-all duration-200 overflow-hidden"
                    type="button"
                  >
                    <div className="relative w-full aspect-square bg-sky-50">
                      <Image
                        src={f.url}
                        alt={f.name}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                    <div className="p-2 sm:p-3 border-t border-sky-100">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 line-clamp-1 group-hover:text-sky-600 transition-colors">
                        {f.name}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{bytesToSize(f.size)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-lg bg-white shadow-2xl rounded-3xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 sm:p-6 border-b border-sky-100 flex-shrink-0 bg-white">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base sm:text-lg truncate flex-1">
                  File Details
                </h3>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-xl hover:bg-sky-50 transition-colors flex-shrink-0 ml-2"
                  type="button"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-6">
              <div className="w-full mb-6">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-sky-50 to-cyan-50 border-2 border-sky-200 shadow-xl">
                  <Image
                    src={selected.url}
                    alt={selected.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 640px) 100vw, 500px"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase text-slate-500 mb-2 tracking-wide">
                    URL
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-sky-50 px-3 py-2 rounded-xl flex-1 break-all border border-sky-200 font-mono">
                      {selected.url}
                    </code>
                    <button
                      onClick={() => copyUrl(selected.url)}
                      className="p-2.5 rounded-xl hover:bg-sky-50 border border-sky-200 transition-colors flex-shrink-0"
                      title="Copy URL"
                      type="button"
                    >
                      <Copy className="h-4 w-4 text-sky-600" />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase text-slate-500 mb-2 tracking-wide">
                    Size
                  </div>
                  <div className="font-mono text-sm font-semibold text-slate-900">
                    {bytesToSize(selected.size)}
                  </div>
                </div>

                {/* Usage */}
                <div className="pt-4 border-t border-sky-100 space-y-3">
                  <button
                    onClick={checkUsageForSelected}
                    disabled={usageLoading}
                    className="w-full px-4 sm:px-6 py-3 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2 text-sm font-medium"
                    type="button"
                  >
                    <Search className="h-4 w-4" />
                    {usageLoading ? "Checking usage..." : "Check Usage"}
                  </button>

                  <div>
                    <div className="text-sm font-semibold text-slate-700 mb-3">Rename File</div>
                    <div className="flex gap-2">
                      <input
                        value={renameTo}
                        onChange={(e) => setRenameTo(e.target.value)}
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-sky-200 outline-none focus:ring-2 focus:ring-sky-500/30 bg-white text-sm"
                        placeholder="New filename"
                      />
                      <button
                        onClick={rename}
                        disabled={loading || !renameTo.trim()}
                        className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-sky-500 text-white hover:bg-sky-600 disabled:opacity-50 transition-all flex items-center gap-2 flex-shrink-0 text-sm font-medium"
                        type="button"
                      >
                        <Edit3 className="h-4 w-4" />
                        <span className="hidden sm:inline">Save</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => askDelete("file", selected.path)}
                    disabled={loading}
                    className="w-full px-4 sm:px-6 py-3 rounded-2xl bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm font-medium"
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete File
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Usage modal */}
      {usageOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setUsageOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b flex items-center justify-between">
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-slate-900 truncate">Image Usage</h3>
                <p className="text-xs text-slate-600 font-mono truncate mt-1">
                  {selected?.url}
                </p>
              </div>
              <button
                className="p-2 rounded-xl hover:bg-sky-50"
                onClick={() => setUsageOpen(false)}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5">
              {usageLoading ? (
                <div className="text-sm text-slate-500">Scanning project files...</div>
              ) : !usageData?.ok ? (
                <div className="text-sm text-red-600">
                  {usageData?.error || "Usage failed"}
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2 text-xs mb-4">
                    <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-slate-700">
                      Total uses: <span className="font-semibold">{usageData.totalCount}</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-slate-700">
                      Matched files: <span className="font-semibold">{usageData.files?.length || 0}</span>
                    </span>
                  </div>

                  {usageData.files?.length ? (
                    <div className="max-h-[55vh] overflow-y-auto scrollbar-hide space-y-2">
                      {usageData.files.map((f) => (
                        <div
                          key={f.file}
                          className="rounded-2xl border border-sky-100 bg-white p-3 flex items-start justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-slate-900 break-all">
                              {f.file}
                            </div>
                            <div className="text-xs text-slate-500 font-mono mt-1">
                              Count: {f.count}
                            </div>
                          </div>

                          <button
                            onClick={() => copyUrl(f.file)}
                            className="p-2 rounded-xl border border-sky-200 hover:bg-sky-50 flex-shrink-0"
                            title="Copy file path"
                            type="button"
                          >
                            <LinkIcon className="h-4 w-4 text-sky-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-slate-500">No references found in scanned files.</div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setConfirmDelete(null)}
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b">
              <h3 className="text-lg font-bold text-slate-900">Confirm delete</h3>
              <p className="text-sm text-slate-600 mt-1 break-all">
                Delete <span className="font-semibold">{confirmDelete.path}</span>{" "}
                {confirmDelete.type === "folder" ? "recursively" : ""}?
              </p>
            </div>

            <div className="p-5 text-sm text-slate-700">
              This action cannot be undone.
            </div>

            <div className="p-5 pt-0 flex gap-2 justify-end">
              <button
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm"
                onClick={() => setConfirmDelete(null)}
                disabled={loading}
                type="button"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 text-sm font-semibold disabled:opacity-50"
                onClick={confirmDeleteNow}
                disabled={loading}
                type="button"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 border border-white/20 max-w-[90vw]">
          <span className="text-xs sm:text-sm font-medium truncate">{toast}</span>
          <button
            onClick={() => setToast("")}
            className="p-1 rounded-lg hover:bg-white/20 opacity-80 hover:opacity-100 transition-all flex-shrink-0"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
