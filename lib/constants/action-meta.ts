// Display names for each action key
export const ACTION_NAMES: Record<string, string> = {
  get_current_weather: "Get Current Weather",
  get_weather_forecast: "Get Forecast",
  get_battery_level: "Get Battery Level",
  set_brightness: "Set Brightness",
  set_volume: "Set Volume",
  get_device_details: "Get Device Details",
  set_do_not_disturb: "Set Focus",
  find_calendar_events: "Find Calendar Events",
  add_calendar_event: "Add Calendar Event",
  log_health_sample: "Log Health Sample",
  find_health_samples: "Find Health Samples",
  text: "Text",
  speak_text: "Speak Text",
  show_alert: "Show Alert",
  show_notification: "Show Notification",
  show_result: "Show Result",
  conditional: "If",
  otherwise: "Otherwise",
  end_if: "End If",
  choose_from_menu: "Choose from Menu",
  set_variable: "Set Variable",
  get_variable: "Get Variable",
  open_app: "Open App",
  open_url: "Open URL",
  get_current_date: "Current Date",
  format_date: "Format Date",
  wait: "Wait",
  start_timer: "Start Timer",
  play_sound: "Play Sound",
  set_playback_destination: "Playback Destination",
  play_music: "Play Music",
  send_message: "Send Message",
  get_contents_of_url: "Get URL Contents",
  ask_for_input: "Ask for Input",
  calculate: "Calculate",
  get_statistics: "Statistics",
  list: "List",
  choose_from_list: "Choose from List",
  take_photo: "Take Photo",
  save_to_photo_album: "Save to Photos",
  copy_to_clipboard: "Copy to Clipboard",
  get_clipboard: "Get Clipboard",
  create_note: "Create Note",
  add_reminder: "Add Reminder",
  set_flashlight: "Flashlight",
  vibrate_device: "Vibrate",
  comment: "Comment",
};

// Gradient color classes per action
export const ACTION_COLORS: Record<string, string> = {
  get_current_weather: "from-sky-500 to-blue-600",
  get_weather_forecast: "from-sky-500 to-blue-600",
  get_battery_level: "from-green-500 to-emerald-600",
  set_brightness: "from-yellow-400 to-orange-500",
  set_volume: "from-purple-500 to-violet-600",
  get_device_details: "from-gray-500 to-gray-600",
  set_do_not_disturb: "from-indigo-500 to-purple-600",
  find_calendar_events: "from-red-500 to-rose-600",
  add_calendar_event: "from-red-500 to-rose-600",
  log_health_sample: "from-pink-500 to-rose-600",
  find_health_samples: "from-pink-500 to-rose-600",
  text: "from-gray-500 to-gray-600",
  speak_text: "from-violet-500 to-purple-600",
  show_alert: "from-amber-500 to-yellow-600",
  show_notification: "from-amber-500 to-yellow-600",
  show_result: "from-amber-500 to-yellow-600",
  conditional: "from-slate-500 to-slate-600",
  otherwise: "from-slate-500 to-slate-600",
  end_if: "from-slate-500 to-slate-600",
  choose_from_menu: "from-teal-500 to-cyan-600",
  set_variable: "from-orange-500 to-amber-600",
  get_variable: "from-orange-500 to-amber-600",
  open_app: "from-blue-500 to-indigo-600",
  open_url: "from-blue-500 to-indigo-600",
  get_current_date: "from-orange-400 to-red-500",
  format_date: "from-orange-400 to-red-500",
  wait: "from-gray-400 to-gray-500",
  start_timer: "from-orange-500 to-red-500",
  play_sound: "from-orange-500 to-amber-600",
  set_playback_destination: "from-blue-400 to-cyan-500",
  play_music: "from-pink-500 to-red-500",
  send_message: "from-green-500 to-emerald-600",
  get_contents_of_url: "from-blue-500 to-cyan-600",
  ask_for_input: "from-blue-400 to-indigo-500",
  calculate: "from-orange-500 to-red-500",
  comment: "from-gray-600 to-gray-700",
  copy_to_clipboard: "from-gray-500 to-gray-600",
  add_reminder: "from-orange-500 to-amber-500",
  vibrate_device: "from-gray-500 to-gray-600",
  take_photo: "from-gray-500 to-gray-600",
  create_note: "from-yellow-500 to-amber-500",
};

// SVG path data for each action's icon
export const ACTION_ICONS: Record<string, string> = {
  get_current_weather: "M3 15h.01M7 21h10M12 3v1m0 16v1m-8-9H3m18 0h-1M5.6 5.6l.7.7m12.1-.7l-.7.7M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  get_battery_level: "M17 6H3a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2v-1h1a1 1 0 001-1v-4a1 1 0 00-1-1h-1V8a2 2 0 00-2-2z",
  speak_text: "M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 12l-4 4m0-8l4 4m-4-4v8",
  conditional: "M8 7l4-4m0 0l4 4m-4-4v18",
  otherwise: "M19 9l-7 7-7-7",
  end_if: "M5 12h14",
  text: "M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z",
  open_app: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14",
  comment: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
  send_message: "M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  find_calendar_events: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  show_alert: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
  wait: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  log_health_sample: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  play_sound: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z",
  ask_for_input: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};

const DEFAULT_ICON = "M13 10V3L4 14h7v7l9-11h-7z";
const DEFAULT_COLOR = "from-gray-500 to-gray-600";

export function getActionName(action: string): string {
  return ACTION_NAMES[action] || action;
}

export function getActionColor(action: string): string {
  return ACTION_COLORS[action] || DEFAULT_COLOR;
}

export function getActionIcon(action: string): string {
  return ACTION_ICONS[action] || DEFAULT_ICON;
}
