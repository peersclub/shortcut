// Apple Shortcuts Action Schema Database
// Maps human-readable action names to WFWorkflowActionIdentifiers and their parameters

export interface ActionParam {
  key: string;
  type: "string" | "number" | "boolean" | "enum" | "variable";
  description: string;
  required?: boolean;
  enumValues?: string[];
  default?: string | number | boolean;
}

export interface ActionDefinition {
  id: string; // WFWorkflowActionIdentifier
  name: string;
  description: string;
  category: string;
  outputName?: string;
  params?: ActionParam[];
}

export const ACTIONS: Record<string, ActionDefinition> = {
  // ─── Weather ─────────────────────────────────
  get_current_weather: {
    id: "is.workflow.actions.weather.currentconditions",
    name: "Get Current Weather",
    description: "Gets the current weather conditions at your location",
    category: "Weather",
    outputName: "Weather Conditions",
  },
  get_weather_forecast: {
    id: "is.workflow.actions.weather.forecast",
    name: "Get Weather Forecast",
    description: "Gets the weather forecast for your location",
    category: "Weather",
    outputName: "Weather Conditions",
  },

  // ─── Device ──────────────────────────────────
  get_battery_level: {
    id: "is.workflow.actions.getbatterylevel",
    name: "Get Battery Level",
    description: "Gets the current battery level of the device",
    category: "Device",
    outputName: "Battery Level",
  },
  set_brightness: {
    id: "is.workflow.actions.setbrightness",
    name: "Set Brightness",
    description: "Sets the screen brightness",
    category: "Device",
    params: [
      { key: "WFBrightness", type: "number", description: "Brightness 0-1", required: true },
    ],
  },
  set_volume: {
    id: "is.workflow.actions.setvolume",
    name: "Set Volume",
    description: "Sets the device volume",
    category: "Device",
    params: [
      { key: "WFVolume", type: "number", description: "Volume 0-1", required: true },
    ],
  },
  get_device_details: {
    id: "is.workflow.actions.getdevicedetails",
    name: "Get Device Details",
    description: "Gets details about the device (name, model, battery, etc.)",
    category: "Device",
    outputName: "Device Details",
    params: [
      {
        key: "WFDeviceDetail",
        type: "enum",
        description: "Detail to get",
        enumValues: ["Device Name", "Device Model", "System Version", "Screen Width", "Screen Height", "Current Volume", "Current Brightness"],
      },
    ],
  },
  set_do_not_disturb: {
    id: "is.workflow.actions.dnd.set",
    name: "Set Focus / Do Not Disturb",
    description: "Turns Do Not Disturb on or off",
    category: "Device",
    params: [
      { key: "Enabled", type: "boolean", description: "On or off", required: true },
    ],
  },

  // ─── Calendar ────────────────────────────────
  find_calendar_events: {
    id: "is.workflow.actions.filter.calendarevents",
    name: "Find Calendar Events",
    description: "Finds calendar events matching criteria",
    category: "Calendar",
    outputName: "Calendar Events",
  },
  add_calendar_event: {
    id: "is.workflow.actions.addnewcalendar",
    name: "Add New Event",
    description: "Creates a new calendar event",
    category: "Calendar",
    params: [
      { key: "WFCalendarEventTitle", type: "string", description: "Event title", required: true },
      { key: "WFCalendarEventStartDate", type: "string", description: "Start date" },
      { key: "WFCalendarEventEndDate", type: "string", description: "End date" },
    ],
  },

  // ─── Health ──────────────────────────────────
  log_health_sample: {
    id: "is.workflow.actions.health.quantity.log",
    name: "Log Health Sample",
    description: "Logs a data point to Apple Health",
    category: "Health",
    params: [
      {
        key: "WFQuantitySampleType",
        type: "enum",
        description: "Type of health data",
        enumValues: ["Water", "Caffeine", "Body Mass", "Height", "Steps", "Active Energy"],
        required: true,
      },
      { key: "WFQuantitySampleQuantity", type: "number", description: "Value to log", required: true },
    ],
  },
  find_health_samples: {
    id: "is.workflow.actions.health.quantity.get",
    name: "Find Health Samples",
    description: "Gets health data from Apple Health",
    category: "Health",
    outputName: "Health Samples",
    params: [
      {
        key: "WFQuantitySampleType",
        type: "enum",
        description: "Type of health data",
        enumValues: ["Water", "Caffeine", "Body Mass", "Height", "Steps", "Active Energy"],
        required: true,
      },
    ],
  },

  // ─── Text & Speech ──────────────────────────
  text: {
    id: "is.workflow.actions.gettext",
    name: "Text",
    description: "Creates a text value, optionally with variable interpolation",
    category: "Scripting",
    outputName: "Text",
    params: [
      { key: "WFTextActionText", type: "string", description: "The text content", required: true },
    ],
  },
  speak_text: {
    id: "is.workflow.actions.speaktext",
    name: "Speak Text",
    description: "Speaks text aloud using text-to-speech",
    category: "Media",
    params: [
      { key: "WFText", type: "string", description: "Text to speak" },
      { key: "WFSpeakTextRate", type: "number", description: "Speech rate 0-1" },
    ],
  },

  // ─── Alerts & Notifications ─────────────────
  show_alert: {
    id: "is.workflow.actions.alert",
    name: "Show Alert",
    description: "Shows an alert dialog with a message",
    category: "Scripting",
    params: [
      { key: "WFAlertActionTitle", type: "string", description: "Alert title", required: true },
      { key: "WFAlertActionMessage", type: "string", description: "Alert message", required: true },
    ],
  },
  show_notification: {
    id: "is.workflow.actions.notification",
    name: "Show Notification",
    description: "Shows a local notification",
    category: "Scripting",
    params: [
      { key: "WFNotificationActionTitle", type: "string", description: "Notification title" },
      { key: "WFNotificationActionBody", type: "string", description: "Notification body", required: true },
    ],
  },
  show_result: {
    id: "is.workflow.actions.showresult",
    name: "Show Result",
    description: "Shows a result/output to the user",
    category: "Scripting",
    params: [
      { key: "Text", type: "string", description: "Text to show", required: true },
    ],
  },

  // ─── Control Flow ───────────────────────────
  conditional: {
    id: "is.workflow.actions.conditional",
    name: "If",
    description: "Starts a conditional block. Use with otherwise and end_if.",
    category: "Scripting",
    params: [
      {
        key: "WFCondition",
        type: "enum",
        description: "Comparison type",
        enumValues: ["Equals", "Contains", "Is Greater Than", "Is Less Than", "Begins With", "Ends With"],
        required: true,
      },
      { key: "WFConditionalActionString", type: "string", description: "Value to compare against" },
      { key: "WFNumberValue", type: "number", description: "Number to compare against" },
    ],
  },
  otherwise: {
    id: "is.workflow.actions.conditional",
    name: "Otherwise",
    description: "The else branch of an if block",
    category: "Scripting",
  },
  end_if: {
    id: "is.workflow.actions.conditional",
    name: "End If",
    description: "Ends a conditional block",
    category: "Scripting",
  },
  choose_from_menu: {
    id: "is.workflow.actions.choosefrommenu",
    name: "Choose from Menu",
    description: "Presents a menu of options to the user",
    category: "Scripting",
    params: [
      { key: "WFMenuPrompt", type: "string", description: "Menu prompt/title" },
      { key: "WFMenuItems", type: "string", description: "Comma-separated menu items", required: true },
    ],
  },

  // ─── Variables ──────────────────────────────
  set_variable: {
    id: "is.workflow.actions.setvariable",
    name: "Set Variable",
    description: "Stores a value in a named variable",
    category: "Scripting",
    params: [
      { key: "WFVariableName", type: "string", description: "Variable name", required: true },
    ],
  },
  get_variable: {
    id: "is.workflow.actions.getvariable",
    name: "Get Variable",
    description: "Retrieves a named variable",
    category: "Scripting",
    outputName: "Variable",
    params: [
      { key: "WFVariable", type: "variable", description: "Variable name", required: true },
    ],
  },

  // ─── Apps ───────────────────────────────────
  open_app: {
    id: "is.workflow.actions.openapp",
    name: "Open App",
    description: "Opens a specified app",
    category: "Apps",
    params: [
      { key: "WFAppIdentifier", type: "string", description: "App bundle ID", required: true },
      { key: "WFAppName", type: "string", description: "App name for display" },
    ],
  },
  open_url: {
    id: "is.workflow.actions.openurl",
    name: "Open URL",
    description: "Opens a URL in Safari or the appropriate app",
    category: "Web",
    params: [
      { key: "WFInput", type: "string", description: "URL to open", required: true },
    ],
  },

  // ─── Date & Time ────────────────────────────
  get_current_date: {
    id: "is.workflow.actions.date",
    name: "Get Current Date",
    description: "Gets the current date and time",
    category: "Date",
    outputName: "Current Date",
  },
  format_date: {
    id: "is.workflow.actions.format.date",
    name: "Format Date",
    description: "Formats a date into text",
    category: "Date",
    outputName: "Formatted Date",
    params: [
      { key: "WFDateFormatStyle", type: "enum", description: "Format style", enumValues: ["Short", "Medium", "Long", "Relative", "Custom"] },
      { key: "WFDateFormat", type: "string", description: "Custom format string (if Custom)" },
    ],
  },
  wait: {
    id: "is.workflow.actions.delay",
    name: "Wait",
    description: "Waits for a specified number of seconds",
    category: "Scripting",
    params: [
      { key: "WFDelayTime", type: "number", description: "Seconds to wait", required: true },
    ],
  },

  // ─── Timers ─────────────────────────────────
  start_timer: {
    id: "is.workflow.actions.timer.start",
    name: "Start Timer",
    description: "Starts a timer in the Clock app",
    category: "Apps",
    params: [
      { key: "WFTimerDuration", type: "number", description: "Duration in seconds", required: true },
    ],
  },

  // ─── Media & Playback ──────────────────────
  play_sound: {
    id: "is.workflow.actions.playsound",
    name: "Play Sound",
    description: "Plays a sound",
    category: "Media",
  },
  set_playback_destination: {
    id: "is.workflow.actions.setplaybackdestination",
    name: "Set Playback Destination",
    description: "Changes audio output device (e.g., AirPods)",
    category: "Media",
    params: [
      { key: "WFMediaRoute", type: "string", description: "Playback destination name" },
    ],
  },
  play_music: {
    id: "is.workflow.actions.playmusic",
    name: "Play Music",
    description: "Plays music from Apple Music library",
    category: "Media",
  },

  // ─── Messaging ──────────────────────────────
  send_message: {
    id: "is.workflow.actions.sendmessage",
    name: "Send Message",
    description: "Sends an iMessage or SMS",
    category: "Messaging",
    params: [
      { key: "WFSendMessageContent", type: "string", description: "Message content", required: true },
      { key: "WFSendMessageActionRecipients", type: "string", description: "Recipient phone/email" },
    ],
  },

  // ─── Web / Network ─────────────────────────
  get_contents_of_url: {
    id: "is.workflow.actions.downloadurl",
    name: "Get Contents of URL",
    description: "Makes an HTTP request to a URL",
    category: "Web",
    outputName: "Contents of URL",
    params: [
      { key: "WFURL", type: "string", description: "URL to fetch", required: true },
      { key: "WFHTTPMethod", type: "enum", description: "HTTP method", enumValues: ["GET", "POST", "PUT", "DELETE", "PATCH"] },
      { key: "WFHTTPBodyType", type: "enum", description: "Body type", enumValues: ["JSON", "Form", "File"] },
    ],
  },

  // ─── Input ──────────────────────────────────
  ask_for_input: {
    id: "is.workflow.actions.ask",
    name: "Ask for Input",
    description: "Prompts the user for text input",
    category: "Scripting",
    outputName: "Provided Input",
    params: [
      { key: "WFAskActionPrompt", type: "string", description: "Prompt message", required: true },
      { key: "WFAskActionDefaultAnswer", type: "string", description: "Default answer" },
      {
        key: "WFInputType",
        type: "enum",
        description: "Input type",
        enumValues: ["Text", "Number", "URL", "Date"],
      },
    ],
  },

  // ─── Math ───────────────────────────────────
  calculate: {
    id: "is.workflow.actions.math",
    name: "Calculate",
    description: "Performs a math operation",
    category: "Math",
    outputName: "Calculation Result",
    params: [
      {
        key: "WFMathOperation",
        type: "enum",
        description: "Operation",
        enumValues: ["+", "-", "×", "÷"],
        required: true,
      },
      { key: "WFMathOperand", type: "number", description: "Number to operate with", required: true },
    ],
  },
  get_statistics: {
    id: "is.workflow.actions.statistics",
    name: "Calculate Statistics",
    description: "Calculates statistics (sum, average, etc.) on a list",
    category: "Math",
    outputName: "Statistics",
    params: [
      {
        key: "WFStatisticsOperation",
        type: "enum",
        description: "Operation",
        enumValues: ["Average", "Minimum", "Maximum", "Sum", "Count"],
        required: true,
      },
    ],
  },

  // ─── Lists ──────────────────────────────────
  list: {
    id: "is.workflow.actions.list",
    name: "List",
    description: "Creates a list of items",
    category: "Scripting",
    outputName: "List",
    params: [
      { key: "WFItems", type: "string", description: "Comma-separated list items", required: true },
    ],
  },
  choose_from_list: {
    id: "is.workflow.actions.choosefromlist",
    name: "Choose from List",
    description: "Prompts user to pick an item from a list",
    category: "Scripting",
    outputName: "Chosen Item",
    params: [
      { key: "WFChooseFromListActionPrompt", type: "string", description: "Prompt" },
    ],
  },

  // ─── Photos & Camera ───────────────────────
  take_photo: {
    id: "is.workflow.actions.takephoto",
    name: "Take Photo",
    description: "Opens camera and takes a photo",
    category: "Photos",
    outputName: "Photo",
  },
  save_to_photo_album: {
    id: "is.workflow.actions.savetocameraroll",
    name: "Save to Photo Album",
    description: "Saves an image to the photo library",
    category: "Photos",
  },

  // ─── Clipboard ──────────────────────────────
  copy_to_clipboard: {
    id: "is.workflow.actions.setclipboard",
    name: "Copy to Clipboard",
    description: "Copies input to the clipboard",
    category: "Scripting",
  },
  get_clipboard: {
    id: "is.workflow.actions.getclipboard",
    name: "Get Clipboard",
    description: "Gets the current clipboard contents",
    category: "Scripting",
    outputName: "Clipboard",
  },

  // ─── Notes ──────────────────────────────────
  create_note: {
    id: "com.apple.mobilenotes.SharingExtension",
    name: "Create Note",
    description: "Creates a new note in the Notes app",
    category: "Apps",
    params: [
      { key: "WFNoteBody", type: "string", description: "Note content", required: true },
    ],
  },

  // ─── Reminders ──────────────────────────────
  add_reminder: {
    id: "is.workflow.actions.addnewreminder",
    name: "Add New Reminder",
    description: "Creates a new reminder",
    category: "Apps",
    params: [
      { key: "WFReminderTitle", type: "string", description: "Reminder title", required: true },
      { key: "WFReminderDueDate", type: "string", description: "Due date" },
    ],
  },

  // ─── Flashlight ─────────────────────────────
  set_flashlight: {
    id: "is.workflow.actions.flashlight",
    name: "Set Flashlight",
    description: "Turns the flashlight on or off",
    category: "Device",
    params: [
      { key: "WFFlashlightSetting", type: "enum", description: "On or Off", enumValues: ["On", "Off"], required: true },
    ],
  },

  // ─── Haptics ────────────────────────────────
  vibrate_device: {
    id: "is.workflow.actions.vibrate",
    name: "Vibrate Device",
    description: "Vibrates the device",
    category: "Device",
  },

  // ─── Nothing (Comment) ─────────────────────
  comment: {
    id: "is.workflow.actions.comment",
    name: "Comment",
    description: "A comment/note in the shortcut (does nothing at runtime)",
    category: "Scripting",
    params: [
      { key: "WFCommentActionText", type: "string", description: "Comment text", required: true },
    ],
  },
};

// Condition type mapping
export const CONDITION_MAP: Record<string, number> = {
  Equals: 4,
  "Is Greater Than": 2,
  "Is Less Than": 3,
  Contains: 99,
  "Begins With": 8,
  "Ends With": 9,
};

// Common app bundle IDs
export const APP_IDS: Record<string, string> = {
  Safari: "com.apple.mobilesafari",
  Maps: "com.apple.Maps",
  "Find My": "com.apple.findmy",
  Camera: "com.apple.camera",
  Notes: "com.apple.mobilenotes",
  Reminders: "com.apple.reminders",
  Calendar: "com.apple.mobilecal",
  Clock: "com.apple.mobiletimer",
  Health: "com.apple.Health",
  Music: "com.apple.Music",
  Podcasts: "com.apple.podcasts",
  Settings: "com.apple.Preferences",
  Messages: "com.apple.MobileSMS",
  Phone: "com.apple.mobilephone",
  Mail: "com.apple.mobilemail",
  Photos: "com.apple.mobileslideshow",
  Wallet: "com.apple.Passbook",
  Weather: "com.apple.weather",
  "App Store": "com.apple.AppStore",
  FaceTime: "com.apple.facetime",
  Fitness: "com.apple.Fitness",
  Home: "com.apple.Home",
  Shortcuts: "is.workflow.my.app",
  Files: "com.apple.DocumentsApp",
  Translate: "com.apple.Translate",
  "Voice Memos": "com.apple.VoiceMemos",
};

export function getActionList(): string {
  const categories = new Map<string, string[]>();
  for (const [key, action] of Object.entries(ACTIONS)) {
    const list = categories.get(action.category) || [];
    list.push(`  - ${key}: ${action.description}`);
    categories.set(action.category, list);
  }

  let result = "";
  for (const [category, actions] of categories) {
    result += `\n${category}:\n${actions.join("\n")}`;
  }
  return result;
}
