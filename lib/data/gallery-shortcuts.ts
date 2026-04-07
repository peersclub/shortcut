import { ShortcutAction } from "@/lib/types";

export type GalleryCategory =
  | "Morning"
  | "Productivity"
  | "Health"
  | "Device"
  | "Social"
  | "Finance"
  | "Utilities";

export interface GalleryShortcut {
  id: string;
  name: string;
  description: string;
  category: GalleryCategory;
  icon: string;
  actions: ShortcutAction[];
  popularity: number;
  featured?: boolean;
}

export const GALLERY_SHORTCUTS: GalleryShortcut[] = [
  {
    id: "morning-briefing",
    name: "Morning Briefing",
    description: "Get weather, calendar events, and battery status to start your day informed.",
    category: "Morning",
    icon: "🌅",
    featured: true,
    popularity: 980,
    actions: [
      { action: "get_current_weather", output_name: "weather" },
      { action: "get_battery_level", output_name: "battery" },
      { action: "find_calendar_events", output_name: "events" },
      { action: "show_result", params: { Text: "Good morning! Weather: {{weather}}, Battery: {{battery}}%, Events today: {{events}}" } },
    ],
  },
  {
    id: "focus-mode",
    name: "Focus Mode",
    description: "Enable Do Not Disturb, set brightness to 50%, and close social apps for deep work.",
    category: "Device",
    icon: "🎯",
    featured: true,
    popularity: 920,
    actions: [
      { action: "set_do_not_disturb", params: { Enabled: true } },
      { action: "set_brightness", params: { WFBrightness: 0.5 } },
      { action: "show_notification", params: { WFNotificationActionTitle: "Focus Mode", WFNotificationActionBody: "Do Not Disturb enabled. Time to focus!" } },
    ],
  },
  {
    id: "expense-logger",
    name: "Quick Expense",
    description: "Ask for an amount and description, then save it to your notes instantly.",
    category: "Finance",
    icon: "💰",
    featured: false,
    popularity: 850,
    actions: [
      { action: "ask_for_input", params: { WFAskActionPrompt: "What did you spend on?", WFInputType: "Text" }, output_name: "item" },
      { action: "ask_for_input", params: { WFAskActionPrompt: "How much did it cost?", WFInputType: "Number" }, output_name: "amount" },
      { action: "get_current_date", output_name: "date" },
      { action: "format_date", params: { WFDateFormatStyle: "Long" }, output_name: "date_str" },
      { action: "create_note", params: { WFNoteBody: "Expense: {{item}} - ${{amount}}\nDate: {{date_str}}" } },
      { action: "show_result", params: { Text: "Logged: {{item}} - ${{amount}}" } },
    ],
  },
  {
    id: "call-summary",
    name: "Call Note",
    description: "Quickly log a phone call summary with caller name, duration, and notes.",
    category: "Productivity",
    icon: "📞",
    featured: false,
    popularity: 780,
    actions: [
      { action: "ask_for_input", params: { WFAskActionPrompt: "Who did you call?", WFInputType: "Text" }, output_name: "caller" },
      { action: "ask_for_input", params: { WFAskActionPrompt: "Call duration in minutes?", WFInputType: "Number" }, output_name: "duration" },
      { action: "ask_for_input", params: { WFAskActionPrompt: "Notes about the call?", WFInputType: "Text" }, output_name: "notes" },
      { action: "get_current_date", output_name: "date" },
      { action: "format_date", params: { WFDateFormatStyle: "Medium" }, output_name: "date_str" },
      { action: "create_note", params: { WFNoteBody: "Call with {{caller}}\nDuration: {{duration}} min\nDate: {{date_str}}\nNotes: {{notes}}" } },
      { action: "show_result", params: { Text: "Call note saved for {{caller}}" } },
    ],
  },
  {
    id: "text-to-speech",
    name: "Read Article",
    description: "Paste a URL and have it read aloud using text-to-speech.",
    category: "Utilities",
    icon: "🔊",
    featured: false,
    popularity: 720,
    actions: [
      { action: "ask_for_input", params: { WFAskActionPrompt: "Enter the URL to read", WFInputType: "URL" }, output_name: "url" },
      { action: "get_contents_of_url", params: { WFURL: "{{url}}", WFHTTPMethod: "GET" }, output_name: "content" },
      { action: "speak_text", params: { WFText: "Here's the article content: {{content}}" } },
    ],
  },
  {
    id: "meeting-prep",
    name: "Meeting Prep",
    description: "Find today's calendar events and prepare a quick summary.",
    category: "Productivity",
    icon: "📅",
    featured: false,
    popularity: 700,
    actions: [
      { action: "get_current_date", output_name: "now" },
      { action: "find_calendar_events", output_name: "meetings" },
      { action: "choose_from_list", params: { WFChooseFromListActionPrompt: "Select a meeting to prepare for" }, output_name: "selected" },
      { action: "show_result", params: { Text: "Preparing for: {{selected}}" } },
    ],
  },
  {
    id: "daily-health",
    name: "Daily Health Check",
    description: "Log your water intake, steps, and get a quick health summary.",
    category: "Health",
    icon: "🏃",
    featured: false,
    popularity: 680,
    actions: [
      { action: "find_health_samples", params: { WFQuantitySampleType: "Steps" }, output_name: "steps" },
      { action: "find_health_samples", params: { WFQuantitySampleType: "Water" }, output_name: "water" },
      { action: "find_health_samples", params: { WFQuantitySampleType: "Active Energy" }, output_name: "energy" },
      { action: "show_result", params: { Text: "Today's Health:\nSteps: {{steps}}\nWater: {{water}}\nActive Energy: {{energy}}" } },
    ],
  },
  {
    id: "quick-timer",
    name: "Quick Timer",
    description: "Set a simple timer with a custom label. Great for cooking or breaks.",
    category: "Utilities",
    icon: "⏱️",
    featured: false,
    popularity: 650,
    actions: [
      { action: "ask_for_input", params: { WFAskActionPrompt: "Timer label?", WFInputType: "Text" }, output_name: "label" },
      { action: "ask_for_input", params: { WFAskActionPrompt: "Duration in minutes?", WFInputType: "Number" }, output_name: "minutes" },
      { action: "calculate", params: { WFMathOperation: "×", WFMathOperand: 60 }, output_name: "seconds" },
      { action: "start_timer", params: { WFTimerDuration: "{{seconds}}" } },
      { action: "show_notification", params: { WFNotificationActionTitle: "{{label}}", WFNotificationActionBody: "Timer complete!" } },
    ],
  },
  {
    id: "clipboard-history",
    name: "Clipboard Plus",
    description: "Copy multiple things to clipboard and paste them one by one.",
    category: "Utilities",
    icon: "📋",
    featured: false,
    popularity: 620,
    actions: [
      { action: "get_clipboard", output_name: "clip1" },
      { action: "ask_for_input", params: { WFAskActionPrompt: "Add another item?", WFInputType: "Text" }, output_name: "clip2" },
      { action: "set_variable", params: { WFVariableName: "clipboard_items" } },
      { action: "show_result", params: { Text: "Saved: {{clip1}} and {{clip2}}" } },
    ],
  },
  {
    id: "music-discovery",
    name: "Music Search",
    description: "Search Apple Music for a song and play it.",
    category: "Social",
    icon: "🎵",
    featured: false,
    popularity: 590,
    actions: [
      { action: "ask_for_input", params: { WFAskActionPrompt: "What song do you want to play?", WFInputType: "Text" }, output_name: "song" },
      { action: "show_result", params: { Text: "Searching Apple Music for: {{song}}" } },
      { action: "play_music" },
    ],
  },
  {
    id: "day-summary",
    name: "End of Day",
    description: "Get a summary of your calendar, health data, and remind you to prepare for tomorrow.",
    category: "Morning",
    icon: "🌙",
    featured: false,
    popularity: 560,
    actions: [
      { action: "get_current_date", output_name: "now" },
      { action: "find_calendar_events", output_name: "events" },
      { action: "find_health_samples", params: { WFQuantitySampleType: "Steps" }, output_name: "steps" },
      { action: "show_result", params: { Text: "Day Summary:\nCalendar: {{events}}\nSteps: {{steps}}\n\nPrepare for tomorrow!" } },
    ],
  },
  {
    id: "url-shortener",
    name: "Quick Link",
    description: "Ask for a URL and open it in Safari.",
    category: "Utilities",
    icon: "🔗",
    featured: false,
    popularity: 530,
    actions: [
      { action: "ask_for_input", params: { WFAskActionPrompt: "Enter the URL to open", WFInputType: "URL" }, output_name: "url" },
      { action: "open_url", params: { WFInput: "{{url}}" } },
    ],
  },
  {
    id: "brightness-toggle",
    name: "Brightness Toggle",
    description: "Quickly set screen brightness to max or min with one tap.",
    category: "Device",
    icon: "☀️",
    featured: false,
    popularity: 510,
    actions: [
      { action: "choose_from_menu", params: { WFMenuPrompt: "Set brightness to:", WFMenuItems: "Maximum,Medium,Minimum" }, output_name: "choice" },
      { action: "conditional", params: { WFConditionalActionString: "{{choice}}", WFCondition: "Contains" }, group_id: "brightness" },
      { action: "set_brightness", params: { WFBrightness: 1.0 } },
      { action: "otherwise", group_id: "brightness" },
      { action: "conditional", params: { WFConditionalActionString: "{{choice}}", WFCondition: "Contains" }, group_id: "brightness2" },
      { action: "set_brightness", params: { WFBrightness: 0.5 } },
      { action: "otherwise", group_id: "brightness2" },
      { action: "set_brightness", params: { WFBrightness: 0.2 } },
      { action: "end_if", group_id: "brightness2" },
      { action: "end_if", group_id: "brightness" },
    ],
  },
  {
    id: "daily-affirmation",
    name: "Daily Motivation",
    description: "Start your day with a positive quote and weather info.",
    category: "Morning",
    icon: "✨",
    featured: false,
    popularity: 480,
    actions: [
      { action: "get_current_weather", output_name: "weather" },
      { action: "speak_text", params: { WFText: "Good morning! Today's weather is {{weather}}. You've got this! Remember: progress, not perfection." } },
    ],
  },
  {
    id: "reminder-creator",
    name: "Quick Reminder",
    description: "Create a reminder with title and due date in seconds.",
    category: "Productivity",
    icon: "🔔",
    featured: false,
    popularity: 450,
    actions: [
      { action: "ask_for_input", params: { WFAskActionPrompt: "What should I remind you about?", WFInputType: "Text" }, output_name: "title" },
      { action: "ask_for_input", params: { WFAskActionPrompt: "When should I remind you? (Enter date)", WFInputType: "Date" }, output_name: "date" },
      { action: "add_reminder", params: { WFReminderTitle: "{{title}}", WFReminderDueDate: "{{date}}" } },
      { action: "show_result", params: { Text: "Reminder set: {{title}}" } },
    ],
  },
  {
    id: "translate-text",
    name: "Quick Translate",
    description: "Enter text and have it spoken in a different voice for translation practice.",
    category: "Utilities",
    icon: "🌐",
    featured: false,
    popularity: 420,
    actions: [
      { action: "ask_for_input", params: { WFAskActionPrompt: "Enter text to translate", WFInputType: "Text" }, output_name: "text" },
      { action: "speak_text", params: { WFText: "{{text}}" } },
    ],
  },
  {
    id: "flashlight-toggle",
    name: "Flashlight Quick",
    description: "Turn flashlight on or off with a simple toggle.",
    category: "Device",
    icon: "🔦",
    featured: false,
    popularity: 400,
    actions: [
      { action: "choose_from_menu", params: { WFMenuPrompt: "Flashlight:", WFMenuItems: "On,Off" }, output_name: "state" },
      { action: "set_flashlight", params: { WFFlashlightSetting: "{{state}}" } },
    ],
  },
  {
    id: "note-to-self",
    name: "Note to Self",
    description: "Quickly save a thought or idea to your notes.",
    category: "Productivity",
    icon: "📝",
    featured: false,
    popularity: 380,
    actions: [
      { action: "ask_for_input", params: { WFAskActionPrompt: "What's on your mind?", WFInputType: "Text" }, output_name: "thought" },
      { action: "get_current_date", output_name: "date" },
      { action: "format_date", params: { WFDateFormatStyle: "Medium" }, output_name: "date_str" },
      { action: "create_note", params: { WFNoteBody: "{{date_str}}\n{{thought}}" } },
      { action: "show_result", params: { Text: "Note saved!" } },
    ],
  },
  {
    id: "battery-report",
    name: "Battery Status",
    description: "Check battery level and get tips to save power if low.",
    category: "Device",
    icon: "🔋",
    featured: false,
    popularity: 350,
    actions: [
      { action: "get_battery_level", output_name: "battery" },
      { action: "conditional", params: { WFCondition: "Is Less Than", WFNumberValue: 20 }, group_id: "battery_check" },
      { action: "show_notification", params: { WFNotificationActionTitle: "Low Battery!", WFNotificationActionBody: "Battery is at {{battery}}%. Consider charging." } },
      { action: "set_low_power_mode", params: { Enabled: true } },
      { action: "otherwise", group_id: "battery_check" },
      { action: "show_result", params: { Text: "Battery level: {{battery}}%" } },
      { action: "end_if", group_id: "battery_check" },
    ],
  },
  {
    id: "countdown",
    name: "Countdown Timer",
    description: "Enter an event name and date to see how long until it happens.",
    category: "Utilities",
    icon: "⏰",
    featured: false,
    popularity: 320,
    actions: [
      { action: "ask_for_input", params: { WFAskActionPrompt: "What's the event?", WFInputType: "Text" }, output_name: "event" },
      { action: "ask_for_input", params: { WFAskActionPrompt: "When is it? (Enter date)", WFInputType: "Date" }, output_name: "event_date" },
      { action: "get_current_date", output_name: "now" },
      { action: "show_result", params: { Text: "{{event}} is on {{event_date}}" } },
    ],
  },
];

export function getFeaturedShortcuts(): GalleryShortcut[] {
  return GALLERY_SHORTCUTS.filter((s) => s.featured);
}

export function getShortcutsByCategory(category: GalleryCategory): GalleryShortcut[] {
  return GALLERY_SHORTCUTS.filter((s) => s.category === category);
}

export function getAllCategories(): GalleryCategory[] {
  return [...new Set(GALLERY_SHORTCUTS.map((s) => s.category))];
}

export function getShortcutById(id: string): GalleryShortcut | undefined {
  return GALLERY_SHORTCUTS.find((s) => s.id === id);
}
