# Prompt Engineering

System prompt that instructs Claude on how to generate Apple Shortcuts.

## Prompt Design

### Core Instructions
1. Role definition: "Apple Shortcuts generator"
2. Input: natural language description
3. Output: structured JSON only (no markdown, no explanation)

### Available Actions
The prompt includes the full action list from `lib/actions.ts`, formatted as:
```
Category:
  - action_key: description
```

### Output Format
Strict JSON schema:
```json
{
  "name": "Shortcut Name",
  "actions": [
    {
      "action": "action_key",
      "params": { "param_key": "value" },
      "output_name": "Optional output name"
    }
  ]
}
```

### Key Rules

1. **Action Keys**: Must use keys exactly as defined (e.g., `get_current_weather`, not `getWeather`)

2. **Variable Interpolation**: Use `{{output_name}}` syntax for referencing previous action outputs
   - Example: `"The weather is {{Weather}}"`

3. **Conditionals**: If/else blocks require:
   - `conditional` action with `compare_with` and `group_id`
   - `otherwise` with same `group_id`
   - `end_if` with same `group_id`

4. **Text Composition**: Use the `text` action to build strings with multiple variables, then pass to `speak_text` or `show_alert`

5. **Voice Output**: Prefer `speak_text` over `show_alert` for user-facing output

6. **Descriptive Names**: Always name outputs descriptively for later reference

## Example Conversations

### Simple Request
**User**: "Tell me the weather and my battery level"

**Claude outputs**:
```json
{
  "name": "Weather & Battery",
  "actions": [
    { "action": "get_current_weather", "output_name": "Weather" },
    { "action": "get_battery_level", "output_name": "Battery" },
    { "action": "text", "params": { "WFTextActionText": "Currently {{Weather}} with battery at {{Battery}}%" }, "output_name": "Message" },
    { "action": "speak_text" }
  ]
}
```

### Conditional
**User**: "Check weather and warn me if it's raining"

**Claude outputs**:
```json
{
  "name": "Rain Check",
  "actions": [
    { "action": "get_current_weather", "output_name": "Weather" },
    { "action": "conditional", "params": { "WFCondition": "Contains", "WFConditionalActionString": "rain" }, "compare_with": "Weather", "group_id": "rain_check" },
    { "action": "speak_text", "params": { "WFText": "It's raining! Grab your umbrella." } },
    { "action": "otherwise", "group_id": "rain_check" },
    { "action": "speak_text", "params": { "WFText": "No rain today, you're good!" } },
    { "action": "end_if", "group_id": "rain_check" }
  ]
}
```

## Model Selection

Models are tried in order with fallback:
1. `claude-sonnet-4-20250514` - Primary, better reasoning
2. `claude-haiku-4-5-20251001` - Faster fallback

The prompt is optimized for Sonnet which has better instruction following for structured JSON output.
