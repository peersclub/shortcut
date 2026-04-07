"use client";

import { useState, useRef, useEffect } from "react";
import { useGenerate } from "@/lib/hooks/use-generate";
import Header from "@/components/header";
import PromptInput from "@/components/prompt-input";
import ExamplePrompts from "@/components/example-prompts";
import ShortcutPreview from "@/components/shortcut-preview";
import LoadingSkeleton from "@/components/loading-skeleton";
import ErrorMessage from "@/components/error-message";

export default function Home() {
  const [prompt, setPrompt] = useState("");
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

  // Scroll to result
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
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero / Input Section */}
      <div className={`flex flex-col items-center justify-center px-6 transition-all duration-500 ${hasResult ? "pt-10 pb-8" : "pt-24 pb-16"}`}>
        <div className="mb-8">
          <Header compact={!!hasResult} />
        </div>

        {!hasResult && (
          <div className="text-center mb-10 fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Describe it. Download it.
            </h2>
            <p className="text-gray-400 text-lg">
              Tell me what you want — I&apos;ll build the Apple Shortcut for you.
            </p>
          </div>
        )}

        <PromptInput
          value={prompt}
          onChange={setPrompt}
          onSubmit={() => handleGenerate()}
          loading={loading}
        />

        {!hasResult && <ExamplePrompts onSelect={(p) => handleGenerate(p)} />}
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
