# API Reference

## POST /api/generate

Generates an Apple Shortcut from a natural language prompt using streaming SSE.

### Request

```json
{
  "prompt": "Tell me the weather and battery level"
}
```

### Response (SSE Stream)

Each event has the format: `data: {type, ...payload}`

#### Stages

| Event | Description |
|-------|-------------|
| `stage` | Progress update (thinking, generating, compiling) |
| `progress` | Token count during generation |
| `partial_actions` | Live preview of parsed actions |
| `complete` | Final result with downloadable file |
| `error` | Error message |

#### Complete Response

```json
{
  "type": "complete",
  "name": "Weather & Battery",
  "actions": [
    {"action": "get_current_weather", "output_name": "Weather"},
    {"action": "get_battery_level", "output_name": "Battery"},
    {"action": "text", "params": {"WFTextActionText": "..."}, "output_name": "Message"},
    {"action": "speak_text"}
  ],
  "file": "base64_encoded_plist..."
}
```

## Shortcut JSON Schema

```typescript
interface ShortcutAction {
  action: string;           // Action key (e.g., "get_current_weather")
  params?: Record<string, string | number | boolean>;
  output_name?: string;      // Name to reference in subsequent actions
  compare_with?: string;    // For conditionals: output to compare
  group_id?: string;        // For conditionals: links if/otherwise/end_if
}

interface GeneratedShortcut {
  name: string;
  actions: ShortcutAction[];
  file: string;             // Base64 encoded .shortcut plist
}
```

## Models

The API tries models in order with fallback:
1. `claude-sonnet-4-20250514` (primary)
2. `claude-haiku-4-5-20251001` (fallback)

Retry logic: 2 retries per model with 2s delay on overload/rate limit.
