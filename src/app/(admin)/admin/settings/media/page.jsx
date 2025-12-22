"use client";

import { useEffect, useMemo, useState } from "react";
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
} from "lucide-react";

function bytesToSize(bytes = 0) {
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
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

  async function loadTree() {
    const res = await fetch("/api/media/tree");
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
    await fetch("/api/media/mkdir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        folder: currentFolder ? `${currentFolder}/${newFolderName.trim()}` : newFolderName.trim(),
      }),
    });
    setNewFolderName("");
    await loadTree();
    setLoading(false);
    setToast("Folder created");
  }

  async function upload() {
    if (!uploadFile) return;
    setLoading(true);

    const fd = new FormData();
    fd.append("file", uploadFile);
    fd.append("folder", currentFolder);
    fd.append("overwrite", overwrite ? "true" : "false");
    if (customName.trim()) fd.append("name", customName.trim());

    const res = await fetch("/api/media/upload", { method: "POST", body: fd });
    const data = await res.json();

    setLoading(false);
    if (!res.ok) {
      setToast(data.error || "Upload failed");
      return;
    }

    setUploadFile(null);
    setCustomName("");
    await loadTree();
    setToast("Uploaded");
  }

  async function rename() {
    if (!selected || !renameTo.trim()) return;
    setLoading(true);

    const newPath = currentFolder ? `${currentFolder}/${renameTo.trim()}` : renameTo.trim();

    const res = await fetch("/api/media/rename", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oldPath: selected.path,
        newPath,
      }),
    });

    setLoading(false);
    if (!res.ok) {
      setToast("Rename failed");
      return;
    }

    setSelected(null);
    setRenameTo("");
    await loadTree();
    setToast("Renamed");
  }

  async function removeSelected() {
    if (!selected) return;
    setLoading(true);

    const res = await fetch("/api/media/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetPath: selected.path, type: "file" }),
    });

    setLoading(false);
    if (!res.ok) {
      setToast("Delete failed");
      return;
    }

    setSelected(null);
    await loadTree();
    setToast("Deleted");
  }

  async function deleteFolder(folderPath) {
    if (!confirm(`Delete folder "${folderPath}"? (recursive)`)) return;
    setLoading(true);
    await fetch("/api/media/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetPath: folderPath, type: "folder" }),
    });
    await loadTree();
    setLoading(false);
    setToast("Folder deleted");
    if (currentFolder.startsWith(folderPath)) setCurrentFolder("");
  }

  async function copyUrl(url) {
    try {
      await navigator.clipboard.writeText(url);
      setToast("Copied URL");
    } catch {
      setToast("Copy failed");
    }
  }

  function FolderTree({ node }) {
    const isActive = (node.path || "") === (currentFolder || "");
    const isCollapsed = collapsed[node.path];
    const hasSubfolders = node.folders && node.folders.length > 0;

    return (
      <div className="space-y-1">
        <button
          onClick={() => setCurrentFolder(node.path || "")}
          className={`w-full flex items-center justify-between rounded-xl px-3 py-2 transition ${
            isActive ? "bg-sky-500 text-white" : "hover:bg-sky-50 text-slate-800"
          }`}
        >
          <span className="flex items-center gap-2 flex-1 min-w-0">
            <Folder className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-white" : "text-amber-500"}`} />
            <span className="text-sm font-medium truncate">{node.path ? node.name : "public"}</span>
          </span>

          <span className="flex items-center gap-1 flex-shrink-0 ml-2">
            {node.path && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFolder(node.path);
                }}
                className={`p-1 rounded-lg ${isActive ? "hover:bg-white/20" : "hover:bg-sky-100"}`}
                title="Delete folder"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
            {hasSubfolders && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCollapsed(prev => ({ ...prev, [node.path]: !prev[node.path] }));
                }}
                className={`p-1 rounded-lg ${isActive ? "hover:bg-white/20" : "hover:bg-sky-100"}`}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            )}
          </span>
        </button>

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

      {/* Top header */}
      <div className="rounded-3xl p-4 sm:p-6 bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-2xl shadow-sky-500/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0" />
              <h2 className="text-xl sm:text-2xl font-bold truncate">Media Manager</h2>
            </div>
            <p className="text-white/90 mt-1 text-xs sm:text-sm">
              Upload, rename, delete, and manage folders inside <span className="font-semibold">public/</span>
            </p>
          </div>

          <button
            onClick={loadTree}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 border border-white/30 transition flex-shrink-0 text-sm"
          >
            <RefreshCcw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Breadcrumb - scrollable */}
        <div className="mt-4 flex items-center gap-2 text-sm overflow-x-auto scrollbar-hide pb-2">
          {breadcrumb.map((c) => (
            <button
              key={c.path}
              onClick={() => setCurrentFolder(c.path)}
              className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 transition flex-shrink-0 whitespace-nowrap"
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left: folder tree */}
        <div className="lg:col-span-3">
          <div className="bg-white/70 backdrop-blur rounded-3xl border border-sky-200 shadow-xl p-4 max-h-[500px] lg:max-h-[100vh] flex flex-col">
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Folders</h3>
            </div>

            <div className="space-y-2 flex-1 overflow-y-auto scrollbar-hide pr-2">
              {tree ? <FolderTree node={tree} /> : <p className="text-sm text-slate-500">Loading…</p>}
            </div>

            {/* Create folder - FIXED */}
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
                    className="w-full px-3 py-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition inline-flex items-center justify-center gap-2 disabled:opacity-50 text-sm font-medium"
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
          {/* uploader - FIXED */}
          <div className="bg-white/70 backdrop-blur rounded-3xl border border-sky-200 shadow-xl p-4">
            <p className="text-sm font-semibold text-slate-900 mb-1">Upload to: /{currentFolder || ""}</p>
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
                  className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-sky-500/25 transition inline-flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
                >
                  <Upload className="h-4 w-4" />
                  {loading ? "Uploading…" : "Upload File"}
                </button>
              </div>
            </div>
          </div>

          {/* grid */}
          <div className="bg-white/70 backdrop-blur rounded-3xl border border-sky-200 shadow-xl p-4 max-h-[500px] lg:max-h-[600px] overflow-y-auto scrollbar-hide">
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
                    }}
                    className="group rounded-2xl border-2 border-sky-200 bg-white hover:shadow-xl hover:border-sky-400 hover:scale-[1.02] transition-all duration-200 overflow-hidden"
                  >
                    {/* FIXED IMAGE SIZE */}
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
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 line-clamp-1 group-hover:text-sky-600 transition-colors">{f.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{bytesToSize(f.size)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right drawer - FIXED IMAGE */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="relative w-full max-w-lg bg-white shadow-2xl rounded-3xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-4 sm:p-6 border-b border-sky-100 flex-shrink-0 bg-white">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base sm:text-lg truncate flex-1">File Details</h3>
                <button 
                  onClick={() => setSelected(null)} 
                  className="p-2 rounded-xl hover:bg-sky-50 transition-colors flex-shrink-0 ml-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-6">
              {/* FIXED SIZE IMAGE - aspect-video with object-contain */}
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
                  <div className="text-xs font-semibold uppercase text-slate-500 mb-2 tracking-wide">URL</div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-sky-50 px-3 py-2 rounded-xl flex-1 break-all border border-sky-200 font-mono">
                      {selected.url}
                    </code>
                    <button
                      onClick={() => copyUrl(selected.url)}
                      className="p-2.5 rounded-xl hover:bg-sky-50 border border-sky-200 transition-colors flex-shrink-0"
                      title="Copy URL"
                    >
                      <Copy className="h-4 w-4 text-sky-600" />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase text-slate-500 mb-2 tracking-wide">Size</div>
                  <div className="font-mono text-sm font-semibold text-slate-900">{bytesToSize(selected.size)}</div>
                </div>

                <div className="pt-4 border-t border-sky-100 space-y-3">
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
                      >
                        <Edit3 className="h-4 w-4" />
                        <span className="hidden sm:inline">Save</span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={removeSelected}
                    disabled={loading}
                    className="w-full px-4 sm:px-6 py-3 rounded-2xl bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm font-medium"
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

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 border border-white/20 max-w-[90vw]">
          <span className="text-xs sm:text-sm font-medium truncate">{toast}</span>
          <button 
            onClick={() => setToast("")} 
            className="p-1 rounded-lg hover:bg-white/20 opacity-80 hover:opacity-100 transition-all flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
