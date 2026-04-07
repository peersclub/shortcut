"use client";

import { downloadShortcutFile } from "@/lib/utils/shortcut-helpers";

interface DownloadButtonProps {
  name: string;
  file: string;
}

export default function DownloadButton({ name, file }: DownloadButtonProps) {
  return (
    <button
      onClick={() => downloadShortcutFile(name, file)}
      className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Download .shortcut
    </button>
  );
}
