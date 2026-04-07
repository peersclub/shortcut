# Frontend Components

React components built with Tailwind CSS and "use client" directives.

## Components

### Header
`components/header.tsx`
- Logo and branding
- Compact mode for result view

### PromptInput
`components/prompt-input.tsx`
- Text input for natural language prompt
- Submit handler
- Loading state (disabled input)

### ExamplePrompts
`components/example-prompts.tsx`
- Clickable example prompts
- Seeds the input field on click

### ShortcutPreview
`components/shortcut-preview.tsx`
- Displays generated shortcut name
- Lists all actions with icons
- Download button
- Regenerate/Reset buttons

### LoadingSkeleton
`components/loading-skeleton.tsx`
- Animated loading states
- Shows current stage (thinking, generating, compiling)
- Displays partial actions as they stream in
- Token count
- Stop button

### ActionRow
`components/action-row.tsx`
- Single action display
- Icon based on category
- Parameters listed
- Output name badge

### DownloadButton
`components/download-button.tsx`
- Triggers .shortcut file download
- Base64 decodes the plist
- Creates blob with `application/octet-stream`

### ErrorMessage
`components/error-message.tsx`
- Displays error message
- Retry button

## Hooks

### useGenerate
`lib/hooks/use-generate.ts`

Manages the generation state and API communication:

```typescript
interface UseGenerateReturn {
  shortcut: GeneratedShortcut | null;
  loading: boolean;
  error: string | null;
  stage: string | null;
  stageMessage: string | null;
  partialActions: ShortcutAction[];
  tokenCount: number;
  generate: (prompt: string) => void;
  stop: () => void;
  reset: () => void;
}
```

#### State Flow

```
idle → loading → complete
            ↓
          error
```

#### SSE Events Handled

| Event | Updates |
|-------|---------|
| `stage` | `stage`, `stageMessage` |
| `progress` | `tokenCount` |
| `partial_actions` | `partialActions` |
| `complete` | `shortcut`, `loading = false` |
| `error` | `error`, `loading = false` |

#### Stop Mechanism

Sets `AbortController.signal` on the fetch request, then calls `controller.close()` to terminate the stream.

## Constants

### action-meta.ts
Metadata for rendering actions:
- Icons per action/category
- Color coding

### examples.ts
Example prompts for quick testing:
- "Tell me the weather and battery level"
- "Remind me to drink water every hour"
- etc.
