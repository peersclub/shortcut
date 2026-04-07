"use client";

import type { GeneratedShortcut } from "@/lib/types";
import { getIndentLevel } from "@/lib/utils/shortcut-helpers";
import ActionRow from "./action-row";
import DownloadButton from "./download-button";

interface ShortcutPreviewProps {
  shortcut: GeneratedShortcut;
  onReset: () => void;
  onRegenerate: () => void;
}

export default function ShortcutPreview({ shortcut, onReset, onRegenerate }: ShortcutPreviewProps) {
  const actionCount = shortcut.actions.filter((a) => a.action !== "comment").length;

  return (
    <div className="w-full max-w-lg mx-auto fade-in-up">
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl shadow-blue-500/5">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white text-lg">{shortcut.name}</h3>
              <p className="text-white/60 text-sm">{actionCount} actions</p>
            </div>
          </div>
        </div>

        {/* Actions List */}
        <div className="p-3 space-y-1 max-h-96 overflow-y-auto stagger-in">
          {shortcut.actions.map((action, i) => (
            <ActionRow
              key={i}
              action={action}
              indent={getIndentLevel(shortcut.actions, i)}
            />
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-800 space-y-2">
          <DownloadButton name={shortcut.name} file={shortcut.file} />
          <div className="flex gap-2">
            <button
              onClick={onRegenerate}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-medium py-2.5 px-4 rounded-xl transition-colors text-sm flex items-center justify-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Regenerate
            </button>
            <button
              onClick={onReset}
              className="flex-1 text-gray-400 hover:text-white font-medium py-2.5 px-4 rounded-xl transition-colors text-sm"
            >
              New shortcut
            </button>
          </div>
        </div>
      </div>

      {/* Install Instructions */}
      <div className="mt-4 bg-gray-900/50 rounded-xl border border-gray-800/50 p-4">
        <p className="text-xs text-gray-400 font-medium mb-2">How to install:</p>
        <ol className="text-xs text-gray-500 space-y-1 list-decimal list-inside">
          <li>Download the .shortcut file</li>
          <li>AirDrop it to your iPhone, or open it in Safari on iOS</li>
          <li>Tap &quot;Add Shortcut&quot; when prompted</li>
          <li>To link to NFC: Shortcuts app &rarr; Automation &rarr; NFC &rarr; Run this shortcut</li>
        </ol>
      </div>
    </div>
  );
}
