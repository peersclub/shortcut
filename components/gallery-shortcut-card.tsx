"use client";

import { useState } from "react";
import type { GalleryShortcut } from "@/lib/data/gallery-shortcuts";
import { downloadShortcutFile } from "@/lib/utils/shortcut-helpers";

interface GalleryShortcutCardProps {
  shortcut: GalleryShortcut;
  onRemix: (shortcut: GalleryShortcut) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Morning: "bg-orange-500/20 text-orange-400",
  Productivity: "bg-blue-500/20 text-blue-400",
  Health: "bg-green-500/20 text-green-400",
  Device: "bg-purple-500/20 text-purple-400",
  Social: "bg-pink-500/20 text-pink-400",
  Finance: "bg-emerald-500/20 text-emerald-400",
  Utilities: "bg-gray-500/20 text-gray-400",
};

export default function GalleryShortcutCard({ shortcut, onRemix }: GalleryShortcutCardProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await fetch(`/api/gallery/${shortcut.id}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      downloadShortcutFile(data.name, data.file);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-200 hover:shadow-lg hover:shadow-black/20 group">
      {/* Header */}
      <div className="p-4 flex items-start gap-3">
        <div className="text-3xl">{shortcut.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-white truncate">{shortcut.name}</h3>
            {shortcut.featured && (
              <span className="px-1.5 py-0.5 text-[10px] bg-yellow-500/20 text-yellow-400 rounded font-medium">
                Featured
              </span>
            )}
          </div>
          <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${CATEGORY_COLORS[shortcut.category] || CATEGORY_COLORS.Utilities}`}>
            {shortcut.category}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 pb-3">
        <p className="text-gray-400 text-sm line-clamp-2">{shortcut.description}</p>
      </div>

      {/* Action count */}
      <div className="px-4 pb-3 flex items-center gap-1 text-xs text-gray-500">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <span>{shortcut.actions.length} actions</span>
        <span className="mx-1">·</span>
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span>{shortcut.popularity}</span>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex gap-2">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          {downloading ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          )}
          {downloading ? "Downloading..." : "Download"}
        </button>
        <button
          onClick={() => onRemix(shortcut)}
          className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Remix
        </button>
      </div>
    </div>
  );
}
