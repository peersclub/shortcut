import type { ShortcutAction } from "@/lib/types";

const SUMMARY_KEYS = [
  "WFText", "WFTextActionText", "WFAlertActionMessage", "WFNotificationActionBody",
  "WFCommentActionText", "WFAskActionPrompt", "WFConditionalActionString",
  "WFSendMessageContent", "WFAppName", "WFInput", "WFURL", "WFNoteBody",
  "WFReminderTitle", "WFCalendarEventTitle", "WFVariableName", "WFMenuPrompt",
  "WFDelayTime", "WFTimerDuration", "WFNumberValue", "WFQuantitySampleType",
  "WFQuantitySampleQuantity", "WFBrightness", "WFFlashlightSetting",
];

export function getIndentLevel(actions: ShortcutAction[], index: number): number {
  let level = 0;
  for (let i = 0; i < index; i++) {
    if (actions[i].action === "conditional") level++;
    if (actions[i].action === "end_if") level--;
  }
  const action = actions[index];
  if (action.action === "end_if") {
    level = Math.max(0, level - 1);
  }
  return level;
}

export function getActionSummary(action: ShortcutAction): string {
  if (!action.params) {
    if (action.output_name) return `→ ${action.output_name}`;
    return "";
  }

  for (const key of SUMMARY_KEYS) {
    if (action.params[key] !== undefined) {
      const val = String(action.params[key]);
      return val.length > 55 ? val.slice(0, 55) + "..." : val;
    }
  }

  if (action.compare_with) return `comparing ${action.compare_with}`;
  if (action.output_name) return `→ ${action.output_name}`;
  return "";
}

export function isControlFlowAction(action: string): boolean {
  return ["conditional", "otherwise", "end_if"].includes(action);
}

export function downloadShortcutFile(name: string, base64File: string) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    const url = `/api/download?data=${encodeURIComponent(base64File)}&name=${encodeURIComponent(name)}`;
    window.location.href = `shortcuts://import-shortcut?url=${encodeURIComponent(window.location.origin + url)}`;
  } else {
    const url = `/api/download?data=${encodeURIComponent(base64File)}&name=${encodeURIComponent(name)}`;
    window.location.href = url;
  }
}
