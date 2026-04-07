# Compiler

Compiles a structured `ShortcutDefinition` into an XML plist (`.shortcut` file format).

## Entry Point

```typescript
function compileShortcut(definition: ShortcutDefinition): Buffer
```

## Input Schema

```typescript
interface ShortcutDefinition {
  name: string;
  actions: ShortcutAction[];
}

interface ShortcutAction {
  action: string;           // Action key from ACTIONS database
  params?: Record<string, string | number | boolean>;
  output_name?: string;      // Name to reference via {{}}
  compare_with?: string;    // For conditionals: variable to compare
  group_id?: string;        // For conditionals: links if/otherwise/end_if
}
```

## Output

Returns a `Buffer` containing UTF-8 encoded XML plist.

## Compilation Process

### 1. State Reset
- Clears `outputUUIDs` and `groupUUIDs` maps
- These track UUIDs for variable references and conditional groups

### 2. Action Compilation

Each action is compiled based on its type:

#### Generic Actions
- Copies params directly
- Handles `{{variable}}` interpolation in text fields
- Assigns UUID for `output_name`
- Wraps variable references in `WFTextTokenAttachment`

#### Conditional (`if`)
```typescript
{
  action: "conditional",
  params: { WFCondition: "Contains", WFConditionalActionString: "rain" },
  compare_with: "Weather",
  group_id: "unique_id"
}
```
Compiles to:
```json
{
  "WFWorkflowActionIdentifier": "is.workflow.actions.conditional",
  "WFWorkflowActionParameters": {
    "GroupingIdentifier": "<uuid>",
    "WFControlFlowMode": 0,
    "WFCondition": 99,
    "WFInput": { "Type": "Variable", "Variable": { variable attachment } }
  }
}
```

#### Otherwise
- Sets `WFControlFlowMode: 1`

#### End If
- Sets `WFControlFlowMode: 2`

### 3. Variable References

Text with `{{variable}}` is parsed into `WFTextTokenString`:
```typescript
parseTextWithVariables("Hello {{Name}}!")
// → {
//    Value: {
//      attachmentsByRange: { "{5, 1}": { Variable attachment for "Name" } },
//      string: "Hello \ufffc!"
//    },
//    WFSerializationType: "WFTextTokenString"
//  }
```

### 4. Plist Structure

```typescript
{
  WFWorkflowMinimumClientVersionString: "900",
  WFWorkflowMinimumClientVersion: 900,
  WFWorkflowIcon: {
    WFWorkflowIconStartColor: 4282601983,
    WFWorkflowIconGlyphNumber: 59511
  },
  WFWorkflowClientVersion: "2302.0.4",
  WFWorkflowOutputContentItemClasses: [],
  WFWorkflowHasOutputFallback: false,
  WFWorkflowActions: [ /* compiled actions */ ],
  WFWorkflowInputContentItemClasses: [ /* many content classes */ ],
  WFWorkflowTypes: ["NCWidget", "WatchKit"],
  WFWorkflowHasShortcutInputVariables: false,
  WFWorkflowName: "<name>"
}
```

## Validation

```typescript
function validateShortcutJSON(json: unknown): {
  valid: boolean;
  error?: string;
  data?: ShortcutDefinition
}
```

Checks:
- `json` is an object
- `name` exists and is a string
- `actions` exists, is an array, and is non-empty
- Each action has an `action` key that is a string
