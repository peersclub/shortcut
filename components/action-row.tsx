import type { ShortcutAction } from "@/lib/types";
import { getActionName, getActionColor, getActionIcon } from "@/lib/constants/action-meta";
import { getActionSummary, isControlFlowAction } from "@/lib/utils/shortcut-helpers";

interface ActionRowProps {
  action: ShortcutAction;
  indent: number;
}

export default function ActionRow({ action, indent }: ActionRowProps) {
  const isControl = isControlFlowAction(action.action);
  const summary = getActionSummary(action);

  return (
    <div
      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors ${
        isControl ? "bg-gray-800/30" : "bg-gray-800/50 hover:bg-gray-800/80"
      }`}
      style={{ marginLeft: `${indent * 16}px` }}
    >
      <div
        className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getActionColor(action.action)} flex items-center justify-center flex-shrink-0`}
      >
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={getActionIcon(action.action)} />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-medium truncate ${isControl ? "text-gray-400" : "text-gray-200"}`}>
          {getActionName(action.action)}
        </p>
        {summary && (
          <p className="text-xs text-gray-500 truncate mt-0.5">{summary}</p>
        )}
      </div>
    </div>
  );
}
