# Shortcut Generator

An AI-powered web app that generates Apple Shortcuts from natural language descriptions.

## Overview

This Next.js application uses Claude AI to understand user requests and compile them into `.shortcut` files that can be downloaded and imported into the Shortcuts app on iOS/macOS.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **AI**: Anthropic Claude API
- **Styling**: Tailwind CSS
- **Serialization**: plist (for .shortcut files)
- **Language**: TypeScript

## Project Structure

```
lib/
├── actions.ts        # Apple Shortcuts action definitions database
├── compiler.ts       # Compiles JSON → .shortcut plist
├── prompt.ts         # System prompt for Claude
├── hooks/
│   └── use-generate.ts  # React hook for generation logic
├── types.ts          # TypeScript interfaces
└── utils/
    └── shortcut-helpers.ts

app/
├── api/generate/route.ts  # SSE API endpoint
├── page.tsx              # Main UI
└── layout.tsx

components/
├── header.tsx
├── prompt-input.tsx
├── example-prompts.tsx
├── shortcut-preview.tsx
├── loading-skeleton.tsx
├── action-row.tsx
├── download-button.tsx
└── error-message.tsx
```

## Key Components

### lib/actions.ts
Database of 40+ Apple Shortcuts actions across categories:
- Weather, Device, Calendar, Health
- Text & Speech, Alerts, Notifications
- Control Flow (conditionals, menus)
- Variables, Apps, Web, Date/Time
- Media, Messaging, Math, Lists
- Photos, Clipboard, Notes, Reminders

### lib/compiler.ts
Compiles a structured shortcut definition into XML plist format:
- Handles variable references (`{{output_name}}`)
- Manages conditional blocks (if/otherwise/end_if)
- Generates UUIDs for actions and groups

### lib/prompt.ts
System prompt that instructs Claude on:
- Available actions and their parameters
- JSON output format
- How to use conditionals
- Variable interpolation syntax

## Workflow

1. User enters natural language prompt (e.g., "Tell me the weather and battery level")
2. API streams request to Claude with system prompt
3. Claude returns structured JSON with actions
4. `compiler.ts` validates and compiles to plist
5. Browser downloads `.shortcut` file
6. User imports into Shortcuts app

## Available Actions

| Category | Actions |
|----------|---------|
| Weather | get_current_weather, get_weather_forecast |
| Device | get_battery_level, set_brightness, set_volume, get_device_details, set_do_not_disturb, set_flashlight, vibrate_device |
| Calendar | find_calendar_events, add_calendar_event |
| Health | log_health_sample, find_health_samples |
| Scripting | text, conditional, otherwise, end_if, choose_from_menu, set_variable, get_variable, ask_for_input, copy_to_clipboard, get_clipboard, comment |
| Media | speak_text, play_sound, set_playback_destination, play_music |
| Web | open_url, get_contents_of_url |
| Apps | open_app, create_note, add_reminder |
| Date | get_current_date, format_date, wait, start_timer |
| Math | calculate, get_statistics |
| Messaging | send_message |
| Photos | take_photo, save_to_photo_album |
