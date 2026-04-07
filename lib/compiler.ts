import * as plist from "plist";
import { v4 as uuidv4 } from "uuid";
import { ACTIONS, CONDITION_MAP } from "./actions";
import zlib from "zlib";

// ─── Types ─────────────────────────────────────

interface ShortcutAction {
  action: string;
  params?: Record<string, string | number | boolean>;
  output_name?: string;
  compare_with?: string;
  group_id?: string;
}

interface ShortcutDefinition {
  name: string;
  actions: ShortcutAction[];
}

interface WFAction {
  WFWorkflowActionIdentifier: string;
  WFWorkflowActionParameters: Record<string, unknown>;
}

// ─── Variable Reference Helpers ────────────────

// Track action outputs: output_name → UUID
const outputUUIDs = new Map<string, string>();
// Track group IDs for conditional blocks: group_id → UUID
const groupUUIDs = new Map<string, string>();

function getOutputUUID(name: string): string {
  if (!outputUUIDs.has(name)) {
    outputUUIDs.set(name, uuidv4());
  }
  return outputUUIDs.get(name)!;
}

function getGroupUUID(groupId: string): string {
  if (!groupUUIDs.has(groupId)) {
    groupUUIDs.set(groupId, uuidv4());
  }
  return groupUUIDs.get(groupId)!;
}

// Build a variable reference attachment
function makeVariableAttachment(outputName: string) {
  return {
    Value: {
      OutputName: outputName,
      OutputUUID: getOutputUUID(outputName),
      Type: "ActionOutput",
    },
    WFSerializationType: "WFTextTokenAttachment",
  };
}

// Parse text with {{variable}} references into WFTextTokenString
function parseTextWithVariables(text: string): unknown {
  const regex = /\{\{(.+?)\}\}/g;
  const matches = [...text.matchAll(regex)];

  if (matches.length === 0) {
    return text;
  }

  // Build the serialized text with attachments
  const attachmentsByRange: Record<string, unknown> = {};
  let processedText = "";
  let lastIndex = 0;

  for (const match of matches) {
    const varName = match[1];
    const startPos = processedText.length + (match.index! - lastIndex);

    // Add text before this variable
    processedText += text.slice(lastIndex, match.index);

    // Add attachment placeholder (Unicode Object Replacement Character)
    const attachmentPos = processedText.length;
    processedText += "\ufffc";

    attachmentsByRange[`{${attachmentPos}, 1}`] = {
      Value: {
        OutputName: varName,
        OutputUUID: getOutputUUID(varName),
        Type: "ActionOutput",
      },
      WFSerializationType: "WFTextTokenAttachment",
    };

    lastIndex = match.index! + match[0].length;
  }

  // Add remaining text
  processedText += text.slice(lastIndex);

  return {
    Value: {
      attachmentsByRange,
      string: processedText,
    },
    WFSerializationType: "WFTextTokenString",
  };
}

// ─── Action Compilers ──────────────────────────

function compileConditional(action: ShortcutAction, _actionDef: typeof ACTIONS[string]): WFAction {
  const groupId = action.group_id || uuidv4();
  const groupingIdentifier = getGroupUUID(groupId);
  const params: Record<string, unknown> = {
    GroupingIdentifier: groupingIdentifier,
    WFControlFlowMode: 0, // 0 = if, 1 = otherwise, 2 = end if
  };

  if (action.params?.WFCondition) {
    const condStr = action.params.WFCondition as string;
    params.WFCondition = CONDITION_MAP[condStr] ?? 4;
  }

  if (action.params?.WFConditionalActionString !== undefined) {
    params.WFConditionalActionString = action.params.WFConditionalActionString;
  }

  if (action.params?.WFNumberValue !== undefined) {
    params.WFNumberValue = action.params.WFNumberValue;
  }

  // Set the input variable to compare with
  if (action.compare_with) {
    params.WFInput = {
      Type: "Variable",
      Variable: makeVariableAttachment(action.compare_with),
    };
  }

  return {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: params,
  };
}

function compileOtherwise(action: ShortcutAction): WFAction {
  const groupId = action.group_id || "";
  return {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      GroupingIdentifier: getGroupUUID(groupId),
      WFControlFlowMode: 1,
    },
  };
}

function compileEndIf(action: ShortcutAction): WFAction {
  const groupId = action.group_id || "";
  return {
    WFWorkflowActionIdentifier: "is.workflow.actions.conditional",
    WFWorkflowActionParameters: {
      GroupingIdentifier: getGroupUUID(groupId),
      WFControlFlowMode: 2,
    },
  };
}

function compileGenericAction(action: ShortcutAction, actionDef: typeof ACTIONS[string]): WFAction {
  const wfParams: Record<string, unknown> = {};

  if (action.params) {
    for (const [key, value] of Object.entries(action.params)) {
      // Check if the value contains variable references
      if (typeof value === "string" && value.includes("{{")) {
        wfParams[key] = parseTextWithVariables(value);
      } else {
        wfParams[key] = value;
      }
    }
  }

  // Handle output UUID assignment
  if (action.output_name) {
    wfParams.UUID = getOutputUUID(action.output_name);
    if (actionDef.outputName) {
      wfParams.CustomOutputName = action.output_name;
    }
  }

  // Special handling for open_app
  if (action.action === "open_app" && action.params?.WFAppIdentifier) {
    wfParams.WFAppIdentifier = action.params.WFAppIdentifier;
    if (action.params.WFAppName) {
      wfParams.WFAppName = action.params.WFAppName;
    }
  }

  // Special handling for set_variable — input comes from previous action
  if (action.action === "set_variable") {
    // The input is implicitly the output of the previous action
  }

  // Special handling for get_variable
  if (action.action === "get_variable" && action.params?.WFVariable) {
    const varName = action.params.WFVariable as string;
    wfParams.WFVariable = makeVariableAttachment(varName);
    delete wfParams.WFVariable;
    wfParams.WFVariable = {
      Value: {
        Type: "Variable",
        VariableName: varName,
      },
      WFSerializationType: "WFTextTokenAttachment",
    };
  }

  // Handle speak_text input - if no explicit text param, it uses previous output
  if (action.action === "speak_text" && action.params?.WFText) {
    wfParams.WFText = parseTextWithVariables(action.params.WFText as string);
  }

  return {
    WFWorkflowActionIdentifier: actionDef.id,
    WFWorkflowActionParameters: wfParams,
  };
}

// ─── Main Compiler ─────────────────────────────

export function compileShortcut(definition: ShortcutDefinition): Buffer {
  // Reset state
  outputUUIDs.clear();
  groupUUIDs.clear();

  const wfActions: WFAction[] = [];

  for (const action of definition.actions) {
    const actionDef = ACTIONS[action.action];

    if (!actionDef) {
      // Unknown action — add as comment
      wfActions.push({
        WFWorkflowActionIdentifier: "is.workflow.actions.comment",
        WFWorkflowActionParameters: {
          WFCommentActionText: `Unknown action: ${action.action}`,
        },
      });
      continue;
    }

    let wfAction: WFAction;

    if (action.action === "conditional") {
      wfAction = compileConditional(action, actionDef);
    } else if (action.action === "otherwise") {
      wfAction = compileOtherwise(action);
    } else if (action.action === "end_if") {
      wfAction = compileEndIf(action);
    } else {
      wfAction = compileGenericAction(action, actionDef);
    }

    wfActions.push(wfAction);
  }

  // Build the full shortcut plist structure
  const shortcutPlist = {
    WFWorkflowMinimumClientVersionString: "900",
    WFWorkflowMinimumClientVersion: 900,
    WFWorkflowIcon: {
      WFWorkflowIconStartColor: 4282601983, // Blue
      WFWorkflowIconGlyphNumber: 59511, // Magic wand icon
    },
    WFWorkflowClientVersion: "2302.0.4",
    WFWorkflowOutputContentItemClasses: [],
    WFWorkflowHasOutputFallback: false,
    WFWorkflowActions: wfActions,
    WFWorkflowInputContentItemClasses: [
      "WFAppStoreAppContentItem",
      "WFArticleContentItem",
      "WFContactContentItem",
      "WFDateContentItem",
      "WFEmailAddressContentItem",
      "WFGenericFileContentItem",
      "WFImageContentItem",
      "WFiTunesProductContentItem",
      "WFLocationContentItem",
      "WFDCMapsLinkContentItem",
      "WFAVAssetContentItem",
      "WFPDFContentItem",
      "WFPhoneNumberContentItem",
      "WFRichTextContentItem",
      "WFSafariWebPageContentItem",
      "WFStringContentItem",
      "WFURLContentItem",
    ],
    WFWorkflowTypes: ["NCWidget", "WatchKit"],
    WFWorkflowHasShortcutInputVariables: false,
    WFWorkflowName: definition.name,
  };

  // Generate XML plist (shortcut files are gzip-compressed plist)
  const xmlPlist = plist.build(shortcutPlist as unknown as plist.PlistObject);
  
  // Compress with gzip
  const gzipped = zlib.createGzip();
  gzipped.write(xmlPlist, "utf-8");
  gzipped.end();
  
  return zlib.gzipSync(Buffer.from(xmlPlist, "utf-8"));
}

// ─── Validation ────────────────────────────────

export function validateShortcutJSON(json: unknown): { valid: boolean; error?: string; data?: ShortcutDefinition } {
  if (!json || typeof json !== "object") {
    return { valid: false, error: "Response is not an object" };
  }

  const obj = json as Record<string, unknown>;

  if (!obj.name || typeof obj.name !== "string") {
    return { valid: false, error: "Missing or invalid 'name'" };
  }

  if (!Array.isArray(obj.actions) || obj.actions.length === 0) {
    return { valid: false, error: "Missing or empty 'actions' array" };
  }

  for (let i = 0; i < obj.actions.length; i++) {
    const action = obj.actions[i] as Record<string, unknown>;
    if (!action.action || typeof action.action !== "string") {
      return { valid: false, error: `Action ${i} missing 'action' key` };
    }
  }

  return { valid: true, data: obj as unknown as ShortcutDefinition };
}
