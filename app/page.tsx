"use client";

import { useState, useRef, useEffect } from "react";
import { useGenerate } from "@/lib/hooks/use-generate";
import Header from "@/components/header";
import PromptInput from "@/components/prompt-input";
import ExamplePrompts from "@/components/example-prompts";
import ShortcutPreview from "@/components/shortcut-preview";
import LoadingSkeleton from "@/components/loading-skeleton";
import ErrorMessage from "@/components/error-message";
import GalleryGrid from "@/components/gallery-grid";
import type { GalleryShortcut } from "@/lib/data/gallery-shortcuts";

type Tab = "gallery" | "create";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("gallery");
  const [prompt, setPrompt] = useState("");
  const [remixShortcut, setRemixShortcut] = useState<GalleryShortcut | null>(null);
  const {
    shortcut,
    loading,
    error,
    stage,
    stageMessage,
    partialActions,
    tokenCount,
    generate,
    stop,
    reset,
  } = useGenerate();
  const resultRef = useRef<HTMLDivElement>(null);

  const hasResult = shortcut || error || loading;

  useEffect(() => {
    if (hasResult && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [hasResult]);

  const handleGenerate = (text?: string) => {
    const finalPrompt = text || prompt;
    if (!finalPrompt.trim()) return;
    setPrompt(finalPrompt);
    setActiveTab("create");
    generate(finalPrompt);
  };

  const handleRegenerate = () => {
    if (prompt.trim()) {
      generate(prompt);
    }
  };

  const handleReset = () => {
    reset();
    setPrompt("");
    setRemixShortcut(null);
  };

  const handleRemix = (shortcut: GalleryShortcut) => {
    const remixPrompt = `Modify this shortcut "${shortcut.name}": ${shortcut.description}. Update it so that `;
    setPrompt(remixPrompt);
    setRemixShortcut(shortcut);
    setActiveTab("create");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearRemix = () => {
    setRemixShortcut(null);
    setPrompt("");
  };

  const showGallery = activeTab === "gallery" && !hasResult;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero / Input Section */}
      <div className={`flex flex-col items-center justify-center px-6 transition-all duration-500 ${hasResult ? "pt-10 pb-8" : "pt-16 pb-12"}`}>
        <div className="mb-6">
          <Header compact={!!hasResult} />
        </div>

        {/* Tab Switcher */}
        {!hasResult && (
          <div className="mb-8">
            <div className="flex bg-gray-900/80 rounded-xl p-1 border border-gray-800">
              <button
                onClick={() => setActiveTab("gallery")}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "gallery"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Gallery
                </span>
              </button>
              <button
                onClick={() => setActiveTab("create")}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "create"
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Create
                </span>
              </button>
            </div>
          </div>
        )}

        {showGallery ? (
          <div className="w-full max-w-5xl mx-auto">
            <GalleryGrid onRemix={handleRemix} />
          </div>
        ) : (
          <>
            {activeTab === "create" && !hasResult && (
              <div className="text-center mb-6">
                <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {remixShortcut ? "Remix this shortcut" : "Describe it. Download it."}
                </h2>
                <p className="text-gray-400 text-lg">
                  {remixShortcut
                    ? "Modify the shortcut to your needs"
                    : "Tell me what you want — I'll build the Apple Shortcut for you."}
                </p>
              </div>
            )}

            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onSubmit={() => handleGenerate()}
              loading={loading}
              remixTemplate={remixShortcut ? { name: remixShortcut.name, onClear: handleClearRemix } : undefined}
            />

            {!hasResult && activeTab === "create" && <ExamplePrompts onSelect={(p) => handleGenerate(p)} />}
          </>
        )}
      </div>

      {/* Result Section */}
      {hasResult && (
        <div ref={resultRef} className="flex-1 px-6 pb-12">
          {loading && (
            <LoadingSkeleton
              stage={stage}
              message={stageMessage}
              partialActions={partialActions}
              tokenCount={tokenCount}
              onStop={stop}
            />
          )}
          {error && !loading && (
            <ErrorMessage error={error} onRetry={() => handleGenerate()} />
          )}
          {shortcut && !loading && (
            <ShortcutPreview
              shortcut={shortcut}
              onReset={handleReset}
              onRegenerate={handleRegenerate}
            />
          )}
        </div>
      )}

      {/* Footer */}
      {!hasResult && (
        <div className="mt-auto py-6 text-center">
          <p className="text-xs text-gray-700">
            Generates downloadable .shortcut files for iOS/macOS. Powered by Claude AI.
          </p>
        </div>
      )}
    </div>
  );
}
