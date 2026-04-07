"use client";

import type { GenerationStage } from "@/lib/hooks/use-generate";
import type { ShortcutAction } from "@/lib/types";
import ActionRow from "./action-row";

interface LoadingSkeletonProps {
  stage: GenerationStage;
  message: string;
  partialActions: ShortcutAction[];
  tokenCount: number;
  onStop: () => void;
}

const STAGE_ORDER: GenerationStage[] = ["thinking", "generating", "compiling"];

function StageIndicator({ current }: { current: GenerationStage }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      {STAGE_ORDER.map((s, i) => {
        const currentIdx = STAGE_ORDER.indexOf(current);
        const isDone = i < currentIdx;
        const isActive = s === current;

        return (
          <div key={s} className="flex items-center gap-2">
            {i > 0 && (
              <div className={`w-8 h-0.5 ${isDone ? "bg-blue-500" : "bg-gray-700"}`} />
            )}
            <div className="flex items-center gap-1.5">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all ${
                  isDone
                    ? "bg-blue-500 text-white"
                    : isActive
                    ? "bg-blue-500/20 text-blue-400 ring-2 ring-blue-500/50"
                    : "bg-gray-800 text-gray-600"
                }`}
              >
                {isDone ? (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              <span className={`text-xs ${isActive ? "text-blue-400" : isDone ? "text-gray-400" : "text-gray-600"}`}>
                {s === "thinking" ? "Think" : s === "generating" ? "Generate" : "Compile"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function LoadingSkeleton({ stage, message, partialActions, tokenCount, onStop }: LoadingSkeletonProps) {
  const hasPartialActions = partialActions.length > 0;

  return (
    <div className="w-full max-w-lg mx-auto fade-in-up">
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        {/* Header with progress */}
        <div className="p-5 border-b border-gray-800">
          <StageIndicator current={stage} />
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full spinner" />
            </div>
            <p className="text-sm text-gray-300">{message}</p>
            {tokenCount > 0 && (
              <span className="text-xs text-gray-600 ml-auto">{tokenCount} tokens</span>
            )}
          </div>
        </div>

        {/* Partial actions appearing live */}
        {hasPartialActions ? (
          <div className="p-3 space-y-1 stagger-in">
            {partialActions.map((action, i) => (
              <ActionRow key={i} action={action} indent={0} />
            ))}
            {/* Shimmer placeholder for next action */}
            <div className="flex items-center gap-3 px-3 py-2.5">
              <div className="w-8 h-8 rounded-lg shimmer flex-shrink-0" />
              <div className="space-y-1.5 flex-1">
                <div className="w-28 h-4 rounded shimmer" />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5">
                <div className="w-8 h-8 rounded-lg shimmer flex-shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 rounded shimmer" style={{ width: `${100 - i * 15}px` }} />
                  <div className="h-3 rounded shimmer" style={{ width: `${160 - i * 20}px` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stop button */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={onStop}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-medium py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="1" />
            </svg>
            Stop generating
          </button>
        </div>
      </div>
    </div>
  );
}
