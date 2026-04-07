"use client";

import { useRef, useEffect } from "react";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  remixTemplate?: {
    name: string;
    onClear: () => void;
  };
}

export default function PromptInput({ value, onChange, onSubmit, loading, remixTemplate }: PromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="w-full max-w-xl">
      {remixTemplate && (
        <div className="mb-3 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="text-sm text-purple-300">Remixing: <span className="font-semibold">{remixTemplate.name}</span></span>
          </div>
          <button
            onClick={remixTemplate.onClear}
            className="text-xs text-purple-400 hover:text-purple-300 underline"
          >
            Clear
          </button>
        </div>
      )}
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl focus-within:border-blue-500 transition-colors shadow-lg">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. When I leave home, tell me the weather and remind me to grab my keys..."
          rows={2}
          className="w-full bg-transparent text-white placeholder-gray-500 px-5 pt-4 pb-14 rounded-2xl focus:outline-none resize-none text-base"
        />
        <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between">
          <span className="text-xs text-gray-600">Shift+Enter for new line</span>
          <button
            onClick={onSubmit}
            disabled={loading || !value.trim()}
            className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
              loading
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : value.trim()
                ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25 pulse-ring"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M12 2v4m0 12v4m-7-7H3m18 0h-4m-1.5-8.5L17 5m-10 0l1.5 1.5M17 19l-1.5-1.5M7 19l1.5-1.5" strokeLinecap="round" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
