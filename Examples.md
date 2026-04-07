# Examples

## Simple Actions

### Weather + Battery
**Prompt**: "Tell me the weather and my battery level"

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

### Timer
**Prompt**: "Set a 5 minute timer and tell me when it's done"

```json
{
  "name": "Quick Timer",
  "actions": [
    { "action": "start_timer", "params": { "WFTimerDuration": 300 } },
    { "action": "speak_text", "params": { "WFText": "Timer is done!" } }
  ]
}
```

### Reminder
**Prompt**: "Create a reminder to call mom tonight"

```json
{
  "name": "Call Mom",
  "actions": [
    { "action": "add_reminder", "params": { "WFReminderTitle": "Call mom", "WFReminderDueDate": "tonight" } }
  ]
}
```

## Conditionals

### Rain Check
**Prompt**: "Check weather and warn me if it's raining"

```json
{
  "name": "Rain Check",
  "actions": [
    { "action": "get_current_weather", "output_name": "Weather" },
    { "action": "conditional", "params": { "WFCondition": "Contains", "WFConditionalActionString": "rain" }, "compare_with": "Weather", "group_id": "rain_warning" },
    { "action": "speak_text", "params": { "WFText": "It's raining! Grab your umbrella." } },
    { "action": "otherwise", "group_id": "rain_warning" },
    { "action": "speak_text", "params": { "WFText": "No rain today, you're good!" } },
    { "action": "end_if", "group_id": "rain_warning" }
  ]
}
```

### Low Battery Warning
**Prompt**: "Check my battery and tell me to charge if it's below 20%"

```json
{
  "name": "Battery Check",
  "actions": [
    { "action": "get_battery_level", "output_name": "Battery" },
    { "action": "conditional", "params": { "WFCondition": "Is Less Than", "WFNumberValue": 20 }, "compare_with": "Battery", "group_id": "battery_check" },
    { "action": "speak_text", "params": { "WFText": "Battery is low! Please charge your device." } },
    { "action": "otherwise", "group_id": "battery_check" },
    { "action": "speak_text", "params": { "WFText": "Battery level is good." } },
    { "action": "end_if", "group_id": "battery_check" }
  ]
}
```

## Interactive

### Menu Selection
**Prompt**: "Ask me what I want for breakfast, then open the weather"

```json
{
  "name": "Morning Routine",
  "actions": [
    { "action": "choose_from_menu", "params": { "WFMenuPrompt": "What do you want?", "WFMenuItems": "Weather, News, Music" }, "output_name": "Choice" },
    { "action": "get_current_weather", "output_name": "Weather" },
    { "action": "speak_text", "params": { "WFText": "Today's weather: {{Weather}}" } }
  ]
}
```

### User Input
**Prompt**: "Ask for a city name and tell me the weather there"

```json
{
  "name": "Weather by City",
  "actions": [
    { "action": "ask_for_input", "params": { "WFAskActionPrompt": "Enter a city name", "WFInputType": "Text" }, "output_name": "City" },
    { "action": "get_weather_forecast", "output_name": "Weather" },
    { "action": "speak_text", "params": { "WFText": "Weather in {{City}}: {{Weather}}" } }
  ]
}
```

## Advanced

### Morning Briefing
**Prompt**: "Give me a morning briefing with the weather, battery, and current time"

```json
{
  "name": "Morning Briefing",
  "actions": [
    { "action": "get_current_date", "output_name": "Date" },
    { "action": "format_date", "params": { "WFDateFormatStyle": "Long" }, "output_name": "Time" },
    { "action": "get_current_weather", "output_name": "Weather" },
    { "action": "get_battery_level", "output_name": "Battery" },
    { "action": "text", "params": { "WFTextActionText": "Good morning! It's {{Time}}. The weather is {{Weather}}. Battery is at {{Battery}}%." }, "output_name": "Briefing" },
    { "action": "speak_text" }
  ]
}
```

### Water Reminder Loop
**Prompt**: "Remind me to drink water every hour from 9am to 5pm"

*(Note: This would require repeat actions - Apple Shortcuts has native "Repeat" actions that could be used)*

```json
{
  "name": "Water Reminder",
  "actions": [
    { "action": "comment", "params": { "WFCommentActionText": "Set up hourly water reminders" } },
    { "action": "show_notification", "params": { "WFNotificationActionTitle": "Hydration", "WFNotificationActionBody": "Time to drink water!" } },
    { "action": "wait", "params": { "WFDelayTime": 3600 } }
  ]
}
```
