"use client";

import { useState, useRef, useCallback } from "react";
import type { GeneratedShortcut, ShortcutAction } from "@/lib/types";

export type GenerationStage = "idle" | "thinking" | "generating" | "compiling" | "complete" | "error";

interface UseGenerateReturn {
  shortcut: GeneratedShortcut | null;
  loading: boolean;
  error: string | null;
  stage: GenerationStage;
  stageMessage: string;
  partialActions: ShortcutAction[];
  tokenCount: number;
  generate: (prompt: string) => Promise<void>;
  stop: () => void;
  reset: () => void;
}

export function useGenerate(): UseGenerateReturn {
  const [shortcut, setShortcut] = useState<GeneratedShortcut | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState<GenerationStage>("idle");
  const [stageMessage, setStageMessage] = useState("");
  const [partialActions, setPartialActions] = useState<ShortcutAction[]>([]);
  const [tokenCount, setTokenCount] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  const stop = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
      setLoading(false);
      setStage("idle");
      setStageMessage("Generation cancelled");
    }
  }, []);

  const generate = useCallback(async (prompt: string) => {
    if (!prompt.trim() || loading) return;

    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setShortcut(null);
    setError(null);
    setStage("thinking");
    setStageMessage("Understanding your request...");
    setPartialActions([]);
    setTokenCount(0);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error("Failed to connect to server");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process complete SSE events
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6);

          try {
            const event = JSON.parse(jsonStr);

            switch (event.type) {
              case "stage":
                setStage(event.stage);
                setStageMessage(event.message);
                break;

              case "progress":
                setTokenCount(event.tokens);
                break;

              case "partial_actions":
                setPartialActions(event.actions);
                break;

              case "complete":
                setShortcut({
                  name: event.name,
                  actions: event.actions,
                  file: event.file,
                });
                setStage("complete");
                setStageMessage("");
                setPartialActions([]);
                break;

              case "error":
                setError(event.message);
                setStage("error");
                break;
            }
          } catch {
            // Ignore malformed events
          }
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        // User cancelled — don't set error
        return;
      }
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStage("error");
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }, [loading]);

  const reset = useCallback(() => {
    stop();
    setShortcut(null);
    setError(null);
    setStage("idle");
    setStageMessage("");
    setPartialActions([]);
    setTokenCount(0);
  }, [stop]);

  return {
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
  };
}
