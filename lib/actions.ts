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

  // ─── Network & Connectivity ─────────────────
  set_airplane_mode: {
    id: "is.workflow.actions.airplanemode.set",
    name: "Set Airplane Mode",
    description: "Turns Airplane Mode on or off",
    category: "Device",
    params: [
      { key: "Enabled", type: "boolean", description: "On or off", required: true },
    ],
  },
  set_wifi: {
    id: "is.workflow.actions.wifi.set",
    name: "Set Wi-Fi",
    description: "Turns Wi-Fi on or off",
    category: "Device",
    params: [
      { key: "Enabled", type: "boolean", description: "On or off", required: true },
    ],
  },
  set_bluetooth: {
    id: "is.workflow.actions.bluetooth.set",
    name: "Set Bluetooth",
    description: "Turns Bluetooth on or off",
    category: "Device",
    params: [
      { key: "Enabled", type: "boolean", description: "On or off", required: true },
    ],
  },
  get_wifi_status: {
    id: "is.workflow.actions.wifi.getstatus",
    name: "Get Wi-Fi Status",
    description: "Gets the current Wi-Fi connection status",
    category: "Device",
    outputName: "Wi-Fi Status",
  },
  get_bluetooth_status: {
    id: "is.workflow.actions.bluetooth.getstatus",
    name: "Get Bluetooth Status",
    description: "Gets the current Bluetooth status",
    category: "Device",
    outputName: "Bluetooth Status",
  },
  set_low_power_mode: {
    id: "is.workflow.actions.lowpowermode.set",
    name: "Set Low Power Mode",
    description: "Turns Low Power Mode on or off",
    category: "Device",
    params: [
      { key: "Enabled", type: "boolean", description: "On or off", required: true },
    ],
  },

  // ─── Contacts ────────────────────────────────
  find_contacts: {
    id: "is.workflow.actions.filter.contacts",
    name: "Find Contacts",
    description: "Finds contacts matching criteria",
    category: "Contacts",
    outputName: "Contacts",
  },
  get_contact: {
    id: "is.workflow.actions.contact.get",
    name: "Get Contact Details",
    description: "Gets details from a contact",
    category: "Contacts",
    outputName: "Contact Details",
    params: [
      {
        key: "WFContactProperty",
        type: "enum",
        description: "Property to get",
        enumValues: ["Name", "Phone", "Email", "Address", "Organization", "Birthday"],
      },
    ],
  },
  choose_contact: {
    id: "is.workflow.actions.choosecontact",
    name: "Choose Contact",
    description: "Lets user pick a contact",
    category: "Contacts",
    outputName: "Contact",
  },

  // ─── Email ──────────────────────────────────
  send_email: {
    id: "is.workflow.actions.sendemail",
    name: "Send Email",
    description: "Sends an email",
    category: "Messaging",
    params: [
      { key: "WFEmailContent", type: "string", description: "Email body", required: true },
      { key: "WFEmailSubject", type: "string", description: "Subject line" },
      { key: "WFEmailAddress", type: "string", description: "Recipient email" },
    ],
  },

  // ─── Files ──────────────────────────────────
  get_file: {
    id: "is.workflow.actions.documentpicker",
    name: "Get File",
    description: "Gets a file from Files app",
    category: "Files",
    outputName: "File",
  },
  get_files: {
    id: "is.workflow.actions.file.pick",
    name: "Get Multiple Files",
    description: "Gets multiple files from Files app",
    category: "Files",
    outputName: "Files",
  },
  save_file: {
    id: "is.workflow.actions.savefile",
    name: "Save File",
    description: "Saves a file to Files app",
    category: "Files",
  },
  get_folder: {
    id: "is.workflow.actions.folderpicker",
    name: "Get Folder",
    description: "Gets a folder from Files app",
    category: "Files",
    outputName: "Folder",
  },
  rename_file: {
    id: "is.workflow.actions.renamefile",
    name: "Rename File",
    description: "Renames a file",
    category: "Files",
    params: [
      { key: "WFRenameFileName", type: "string", description: "New filename", required: true },
    ],
  },
  duplicate_file: {
    id: "is.workflow.actions.duplicatefile",
    name: "Duplicate File",
    description: "Creates a copy of a file",
    category: "Files",
  },
  delete_file: {
    id: "is.workflow.actions.deletefile",
    name: "Delete File",
    description: "Deletes a file",
    category: "Files",
  },

  // ─── Text Manipulation ───────────────────────
  uppercase_text: {
    id: "is.workflow.actions.text.changecase",
    name: "Change Case",
    description: "Changes text to uppercase, lowercase, or title case",
    category: "Text",
    outputName: "Text",
    params: [
      {
        key: "WFChangeCaseType",
        type: "enum",
        description: "Case type",
        enumValues: ["UPPERCASE", "lowercase", "Title Case", "Sentence case"],
        required: true,
      },
    ],
  },
  trim_text: {
    id: "is.workflow.actions.text.trim",
    name: "Trim Text",
    description: "Removes leading/trailing whitespace",
    category: "Text",
    outputName: "Text",
  },
  get_text_length: {
    id: "is.workflow.actions.lengthex",
    name: "Get Text Length",
    description: "Gets the number of characters in text",
    category: "Text",
    outputName: "Length",
  },
  combine_text: {
    id: "is.workflow.actions.text.join",
    name: "Combine Text",
    description: "Joins multiple text items together",
    category: "Text",
    outputName: "Combined Text",
    params: [
      { key: "WFTextJoinSeparator", type: "string", description: "Separator between items" },
    ],
  },
  split_text: {
    id: "is.workflow.actions.text.split",
    name: "Split Text",
    description: "Splits text by a delimiter",
    category: "Text",
    outputName: "Text Items",
    params: [
      { key: "WFTextSplitSeparator", type: "string", description: "Separator to split by" },
    ],
  },
  get_subtext: {
    id: "is.workflow.actions.text.substring",
    name: "Get Subtext",
    description: "Gets a portion of text",
    category: "Text",
    outputName: "Subtext",
    params: [
      { key: "WFTextRangeStart", type: "number", description: "Start position" },
      { key: "WFTextRangeEnd", type: "number", description: "End position" },
    ],
  },
  replace_text: {
    id: "is.workflow.actions.text.replace",
    name: "Replace Text",
    description: "Replaces occurrences of text",
    category: "Text",
    outputName: "Text",
    params: [
      { key: "WFReplaceTextTarget", type: "string", description: "Text to find" },
      { key: "WFReplaceTextReplacement", type: "string", description: "Replacement text" },
    ],
  },

  // ─── URL Actions ────────────────────────────
  url_encode: {
    id: "is.workflow.actions.urlencode",
    name: "URL Encode",
    description: "Encodes text for use in URLs",
    category: "Web",
    outputName: "Encoded Text",
  },
  url_decode: {
    id: "is.workflow.actions.urldecode",
    name: "URL Decode",
    description: "Decodes URL-encoded text",
    category: "Web",
    outputName: "Decoded Text",
  },
  get_url_components: {
    id: "is.workflow.actions.urlcomponents",
    name: "Get URL Components",
    description: "Gets parts of a URL (scheme, host, path, etc.)",
    category: "Web",
    outputName: "URL Components",
  },

  // ─── Data Formatting ─────────────────────────
  base64_encode: {
    id: "is.workflow.actions.base64encode",
    name: "Base64 Encode",
    description: "Encodes text to Base64",
    category: "Text",
    outputName: "Encoded Text",
  },
  base64_decode: {
    id: "is.workflow.actions.base64decode",
    name: "Base64 Decode",
    description: "Decodes Base64 to text",
    category: "Text",
    outputName: "Decoded Text",
  },

  // ─── Dictionary ──────────────────────────────
  get_definition: {
    id: "is.workflow.actions.dictionary",
    name: "Get Definition",
    description: "Looks up a word in the dictionary",
    category: "Text",
    outputName: "Definition",
    params: [
      { key: "WFDictionaryInput", type: "string", description: "Word to look up", required: true },
    ],
  },

  // ─── Hash ──────────────────────────────────
  generate_hash: {
    id: "is.workflow.actions.hash",
    name: "Generate Hash",
    description: "Generates MD5, SHA1, SHA256, or SHA512 hash",
    category: "Text",
    outputName: "Hash",
    params: [
      {
        key: "WFHashType",
        type: "enum",
        description: "Hash algorithm",
        enumValues: ["MD5", "SHA1", "SHA256", "SHA512"],
        required: true,
      },
    ],
  },

  // ─── JSON/XML ───────────────────────────────
  get_value_from_json: {
    id: "is.workflow.actions.getvalueforkey",
    name: "Get Value from Dictionary",
    description: "Gets a value from JSON/dictionary using key path",
    category: "Scripting",
    outputName: "Value",
    params: [
      { key: "WFDictionaryKey", type: "string", description: "Key path (e.g., data.name)", required: true },
    ],
  },
  create_dictionary: {
    id: "is.workflow.actions.createdictionary",
    name: "Create Dictionary",
    description: "Creates a dictionary from text",
    category: "Scripting",
    outputName: "Dictionary",
  },

  // ─── Repeat / Loop ─────────────────────────
  repeat: {
    id: "is.workflow.actions.repeat.count",
    name: "Repeat",
    description: "Repeats actions a specified number of times",
    category: "Scripting",
    params: [
      { key: "WFRepeatCount", type: "number", description: "Number of repetitions", required: true },
    ],
  },
  end_repeat: {
    id: "is.workflow.actions.repeat.end",
    name: "End Repeat",
    description: "Ends a repeat block",
    category: "Scripting",
  },
  for_each: {
    id: "is.workflow.actions.foreach",
    name: "For Each",
    description: "Iterates over a list of items",
    category: "Scripting",
    params: [
      { key: "WFItems", type: "string", description: "List of items (comma-separated)" },
    ],
  },

  // ─── Shortcuts ──────────────────────────────
  run_shortcut: {
    id: "is.workflow.actions.run.shortcut",
    name: "Run Shortcut",
    description: "Runs another Shortcut",
    category: "Scripting",
    params: [
      { key: "WFShortcutName", type: "string", description: "Name of shortcut to run", required: true },
    ],
    outputName: "Shortcut Result",
  },
  stop_shortcut: {
    id: "is.workflow.actions.stop",
    name: "Stop",
    description: "Stops the current shortcut",
    category: "Scripting",
  },

  // ─── Location ───────────────────────────────
  get_current_location: {
    id: "is.workflow.actions.location",
    name: "Get Current Location",
    description: "Gets the current GPS location",
    category: "Location",
    outputName: "Location",
  },
  get_distance: {
    id: "is.workflow.actions.distance",
    name: "Calculate Distance",
    description: "Calculates distance between two locations",
    category: "Location",
    outputName: "Distance",
    params: [
      {
        key: "WFDistanceUnit",
        type: "enum",
        description: "Distance unit",
        enumValues: ["Miles", "Kilometers"],
        required: true,
      },
    ],
  },
  get_address: {
    id: "is.workflow.actions.getaddress",
    name: "Get Address from Map",
    description: "Gets address from location or vice versa",
    category: "Location",
    outputName: "Address",
  },
  show_in_maps: {
    id: "is.workflow.actions.showinmaps",
    name: "Show in Maps",
    description: "Shows a location or direction in Maps",
    category: "Location",
    params: [
      {
        key: "WFMapActionType",
        type: "enum",
        description: "Map action",
        enumValues: ["Show", "Directions", "Search"],
      },
    ],
  },

  // ─── Calendar (Expanded) ────────────────────
  find_calendar: {
    id: "is.workflow.actions.filter.calendars",
    name: "Find Calendars",
    description: "Finds calendars matching criteria",
    category: "Calendar",
    outputName: "Calendars",
  },
  delete_calendar_event: {
    id: "is.workflow.actions.deletecalendar",
    name: "Delete Calendar Event",
    description: "Deletes a calendar event",
    category: "Calendar",
  },

  // ─── Reminders (Expanded) ───────────────────
  find_reminders: {
    id: "is.workflow.actions.filter.reminders",
    name: "Find Reminders",
    description: "Finds reminders matching criteria",
    category: "Apps",
    outputName: "Reminders",
  },
  complete_reminder: {
    id: "is.workflow.actions.complete.reminder",
    name: "Complete Reminder",
    description: "Marks a reminder as complete",
    category: "Apps",
  },

  // ─── Notes (Expanded) ───────────────────────
  find_notes: {
    id: "is.workflow.actions.filter.notes",
    name: "Find Notes",
    description: "Finds notes matching criteria",
    category: "Apps",
    outputName: "Notes",
  },
  append_note: {
    id: "is.workflow.actions.appendnote",
    name: "Append to Note",
    description: "Adds text to an existing note",
    category: "Apps",
    params: [
      { key: "WFNoteBody", type: "string", description: "Text to append", required: true },
    ],
  },

  // ─── Health (Expanded) ──────────────────────
  get_health_data: {
    id: "is.workflow.actions.health.statistics",
    name: "Get Health Stats",
    description: "Gets health statistics over a date range",
    category: "Health",
    outputName: "Health Stats",
    params: [
      {
        key: "WFHealthStatsType",
        type: "enum",
        description: "Statistic type",
        enumValues: ["Step Count", "Distance Walking", "Flights Climbed", "Active Energy Burned", "Heart Rate"],
      },
      {
        key: "WFHealthStatsDuration",
        type: "enum",
        description: "Time period",
        enumValues: ["Today", "Week", "Month", "Year"],
      },
    ],
  },
  log_health_sample_type: {
    id: "is.workflow.actions.health.category.log",
    name: "Log Health Sample (Category)",
    description: "Logs a category-based health sample",
    category: "Health",
    params: [
      {
        key: "WFHealthCategorySampleType",
        type: "enum",
        description: "Category type",
        enumValues: ["Sleep", "Mindful Session", "Apple Exercise Time", "Stand Hours"],
        required: true,
      },
    ],
  },

  // ─── Sleep ──────────────────────────────────
  get_sleep_data: {
    id: "is.workflow.actions.health.sleep",
    name: "Get Sleep Analysis",
    description: "Gets sleep analysis data",
    category: "Health",
    outputName: "Sleep Data",
  },
  log_sleep: {
    id: "is.workflow.actions.sleep.log",
    name: "Log Sleep",
    description: "Logs sleep data",
    category: "Health",
    params: [
      { key: "WFSleepDuration", type: "number", description: "Sleep duration in hours" },
    ],
  },

  // ─── Workout ─────────────────────────────────
  start_workout: {
    id: "is.workflow.actions.workout.start",
    name: "Start Workout",
    description: "Starts a workout in Fitness",
    category: "Health",
    params: [
      {
        key: "WFWorkoutActivityType",
        type: "enum",
        description: "Workout type",
        enumValues: ["Walking", "Running", "Cycling", "Swimming", "HIIT", "Yoga", "Strength Training", "Custom"],
        required: true,
      },
    ],
  },
  end_workout: {
    id: "is.workflow.actions.workout.end",
    name: "End Workout",
    description: "Ends the current workout",
    category: "Health",
  },
  get_workout_data: {
    id: "is.workflow.actions.workout.get",
    name: "Get Workout",
    description: "Gets recent workout data",
    category: "Health",
    outputName: "Workout",
  },

  // ─── Media (Expanded) ────────────────────────
  pause: {
    id: "is.workflow.actions.pause",
    name: "Pause",
    description: "Pauses current media playback",
    category: "Media",
  },
  resume: {
    id: "is.workflow.actions.resume",
    name: "Resume",
    description: "Resumes media playback",
    category: "Media",
  },
  skip_forward: {
    id: "is.workflow.actions.skipforward",
    name: "Skip Forward",
    description: "Skips forward in current media",
    category: "Media",
    params: [
      { key: "WFSkipForwardTime", type: "number", description: "Seconds to skip" },
    ],
  },
  skip_backward: {
    id: "is.workflow.actions.skipbackward",
    name: "Skip Backward",
    description: "Skips backward in current media",
    category: "Media",
    params: [
      { key: "WFSkipBackwardTime", type: "number", description: "Seconds to skip" },
    ],
  },
  seek_media: {
    id: "is.workflow.actions.seek",
    name: "Seek to Time",
    description: "Seeks to a specific time in media",
    category: "Media",
    params: [
      { key: "WFSeekTime", type: "number", description: "Time in seconds" },
    ],
  },
  get_current_track: {
    id: "is.workflow.actions.getcurrenttrack",
    name: "Get Current Track",
    description: "Gets information about the currently playing track",
    category: "Media",
    outputName: "Track Info",
  },
  search_itunes: {
    id: "is.workflow.actions.itunes.search",
    name: "Search iTunes Store",
    description: "Searches the iTunes Store",
    category: "Media",
    outputName: "iTunes Results",
    params: [
      { key: "WFSearchQuery", type: "string", description: "Search query", required: true },
    ],
  },

  // ─── Photos (Expanded) ───────────────────────
  select_photo: {
    id: "is.workflow.actions.selectphoto",
    name: "Select Photo",
    description: "Lets user select photos from library",
    category: "Photos",
    outputName: "Selected Photos",
  },
  get_photos_from_library: {
    id: "is.workflow.actions.photolibrary",
    name: "Get Latest Photos",
    description: "Gets photos from the library",
    category: "Photos",
    outputName: "Photos",
    params: [
      { key: "WFGetLatestPhotosCount", type: "number", description: "Number of photos" },
    ],
  },
  get_photo_details: {
    id: "is.workflow.actions.photodetail",
    name: "Get Photo Details",
    description: "Gets metadata from a photo",
    category: "Photos",
    outputName: "Photo Details",
  },

  // ─── Scanning ────────────────────────────────
  scan_barcode: {
    id: "is.workflow.actions.barcode.scan",
    name: "Scan Barcode",
    description: "Scans a barcode or QR code",
    category: "Photos",
    outputName: "Scanned Code",
  },
  generate_qr_code: {
    id: "is.workflow.actions.qrcode",
    name: "Generate QR Code",
    description: "Generates a QR code from text",
    category: "Text",
    outputName: "QR Code Image",
    params: [
      { key: "WFQRCodeText", type: "string", description: "Text to encode", required: true },
    ],
  },

  // ─── Siri & Voice ────────────────────────────
  dictation: {
    id: "is.workflow.actions.speech",
    name: "Dictate Text",
    description: "Transcribes speech to text",
    category: "Media",
    outputName: "Transcribed Text",
  },
  listen_for: {
    id: "is.workflow.actions.listen",
    name: "Listen for Speech",
    description: "Listens for specific phrase",
    category: "Media",
    outputName: "Heard Phrase",
    params: [
      { key: "WFListenForPhrase", type: "string", description: "Phrase to listen for" },
    ],
  },

  // ─── Home ────────────────────────────────────
  control_home: {
    id: "is.workflow.actions.home",
    name: "Control Home",
    description: "Controls a HomeKit device",
    category: "Home",
    params: [
      { key: "WFHomeControlDevice", type: "string", description: "Device name" },
      {
        key: "WFHomeControlAction",
        type: "enum",
        description: "Action",
        enumValues: ["Lock", "Unlock", "Play", "Pause", "Toggle"],
      },
    ],
  },
  set_home_scene: {
    id: "is.workflow.actions.homescene",
    name: "Set Home Scene",
    description: "Activates a Home scene",
    category: "Home",
    params: [
      { key: "WFHomeSceneName", type: "string", description: "Scene name", required: true },
    ],
  },

  // ─── Magic Variables ─────────────────────────
  count: {
    id: "is.workflow.actions.count",
    name: "Count",
    description: "Counts items in a list",
    category: "Scripting",
    outputName: "Count",
  },
  anything: {
    id: "is.workflow.actions.anything",
    name: "Get Any Value",
    description: "Passes through any value",
    category: "Scripting",
  },

  // ─── Type ──────────────────────────────────
  number: {
    id: "is.workflow.actions.number",
    name: "Number",
    description: "Creates a number value",
    category: "Scripting",
    outputName: "Number",
    params: [
      { key: "WFNumberActionNumber", type: "number", description: "The number", required: true },
    ],
  },

  // ─── Date Calculations ───────────────────────
  adjust_date: {
    id: "is.workflow.actions.dateadjust",
    name: "Adjust Date",
    description: "Adds or subtracts time from a date",
    category: "Date",
    outputName: "Adjusted Date",
    params: [
      { key: "WFDateAdjustType", type: "enum", description: "Time unit", enumValues: ["Add", "Subtract"] },
      { key: "WFDateAdjustValue", type: "number", description: "Amount to adjust" },
      { key: "WFDateAdjustUnit", type: "enum", description: "Unit", enumValues: ["Seconds", "Minutes", "Hours", "Days", "Weeks", "Months", "Years"] },
    ],
  },

  // ─── Document ────────────────────────────────
  make_pdf: {
    id: "is.workflow.actions.make.pdf",
    name: "Make PDF",
    description: "Creates a PDF from images or text",
    category: "Files",
    outputName: "PDF",
  },
  extract_text_from_image: {
    id: "is.workflow.actions.getimageocr",
    name: "Get Text from Image",
    description: "Extracts text using OCR",
    category: "Photos",
    outputName: "Extracted Text",
  },

  // ─── Sharing ────────────────────────────────
  share: {
    id: "is.workflow.actions.share",
    name: "Share",
    description: "Shares content using the share sheet",
    category: "Scripting",
  },
  quick_look: {
    id: "is.workflow.actions.quicklook",
    name: "Quick Look",
    description: "Previews a file",
    category: "Files",
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
// Includes Apple apps, popular social media, streaming, productivity, and more
export const APP_IDS: Record<string, string> = {
  // Apple Apps
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
  Calculator: "com.apple.calculator",
  Compass: "com.apple.compass",
  Stocks: "com.apple.stocks",
  News: "com.apple.news",
  Books: "com.apple.iBooks",
  Contacts: "com.apple.MobileAddressBook",
  Tips: "com.apple.tips",
  Feedback: "com.apple.Feedback",

  // Social Media
  Instagram: "com.burbn.instagram",
  Facebook: "com.facebook.Facebook",
  Twitter: "com.atebits.tweetie2",
  X: "com.apple.Freeform",
  TikTok: "com.zhiliaoapp.musically",
  Snapchat: "com.toyopagroup.picaboo",
  WhatsApp: "net.whatsapp.WhatsApp",
  Telegram: "ru.onecash.Telegram",
  LinkedIn: "com.linkedin.LinkedIn",
  Reddit: "com.reddit.Reddit",
  Pinterest: "com.pinterest",
  Threads: "com.threads.threads",
  Mastodon: "app.thebrowser.mastodon",
  Bluesky: "blueskyweb.ios",

  // Messaging
  "iMessage": "com.apple.MobileSMS",
  Signal: "org.whispersystems.signal",
  Viber: "com.viber",
  WeChat: "com.apple.MobileSMS",
  LINE: "jp.naver.line",
  Skype: "com.skype.skype",
  Discord: "com.hammerandchisel.discord",
  Slack: "com.tinyspeck.slackmacgap",
  MicrosoftTeams: "com.microsoft.teams",
  Zoom: "us.zoom.xos",

  // Streaming & Video
  YouTube: "com.google.ios.youtube",
  "YouTube Music": "com.google.ios.youtubemusic",
  Netflix: "com.netflix.Netflix",
  AmazonPrime: "com.amazon.aiv.AIVApp",
  Disney: "com.disney.disneyplus",
  "Disney+": "com.disney.disneyplus",
  "Max": "com.warner.max",
  Hulu: "com.hulu.plus",
  Peacock: "com.att.tv",
  Paramount: "com.cbs.app",
  AppleTV: "com.apple.TTV客厅",
  Twitch: "tv.twitch",
  "Mubi": "com.mubi.Mubi",

  // Music & Audio
  Spotify: "com.spotify.client",
  "Spotify Lite": "com.spotify.SpotifyLite",
  SoundCloud: "com.soundcloud.TouchApp",
  Pandora: "com.pandora",
  "Tidal": "com.aspiro.tidal",
  Deezer: "deezer.Deezer",
  "Apple Music": "com.apple.Music",
  Shazam: "com.shazam.Shazam",
  "Amazon Music": "com.amazon.AmazonMusicNG",

  // Productivity
  "Microsoft Office": "com.microsoft.Office",
  Word: "com.microsoft.Word",
  Excel: "com.microsoft.Excel",
  PowerPoint: "com.microsoft.PowerPoint",
  "Google Docs": "com.google.Documents",
  "Google Sheets": "com.google.Sheets",
  "Google Slides": "com.google.Slides",
  Notion: "notion.id",
  Obsidian: "md.obsidian",
  Bear: "net.shinyfrog.Bear",
  "Apple Notes": "com.apple.mobilenotes",
  Evernote: "com.evernote.iPhone",
  "OneNote": "com.microsoft.Office.OneNote",
  Todoist: "com.todoist.Todoist",
  Things: "com.culturedcode.things",
  "TickTick": "com.ticktick.task",
  Asana: "com.asana.mobile",
  "Monday.com": "com.monday.monday",
  Linear: "linear.ios",
  "Apple Reminders": "com.apple.reminders",
  Fantastical: "com.flexibits.fantastical2",

  // File Management & Cloud
  "Google Drive": "com.google.GoogleDrive",
  Dropbox: "com.getdropbox.Dropbox",
  "OneDrive": "com.microsoft.skype4life",
  iCloud: "com.apple.mobileslideshow",
  Box: "com.box.Box",
  "Adobe Acrobat": "com.adobe.AdobeReader",

  // Photography & Design
  Canva: "com.canva.Canva",
  "Adobe Photoshop": "com.adobe.PhotoshopExpress",
  Lightroom: "com.adobe.Lightroom",
  "VSCO": "com.vsco.VSCO",
  Procreate: "com.procreate.procreate",
  Figma: "com.figma.Figma",
  Sketch: "com.bohemiancoding.sketch3",
  "Affinity Designer": "com.serif.affinitydesigner",
  "Affinity Photo": "com.serif.affinityphoto",
  LumaFusion: "com.luma-touch.LumaFusion",
  CapCut: "com.lemon.Clip",
  InShot: "com.camerasideas.instashot",

  // Development
  GitHub: "com.github.mobile",
  GitLab: "com.gitlab.GitLab",
  "VS Code": "com.microsoft.VSCode",
  Xcode: "com.apple.dt.Xcode",
  Pythonista: "com.omz-software.Pythonista3",
  "a-Shell": "com.abyte.a-Shell",
  WorkingCopy: "com.workingcopy.workingcopy",
  Buffer: "com.buffer.ios",
  "GitHub Mobile": "com.github.mobile",

  // Utilities
  "1Password": "com.1password.1password",
  Bitwarden: "com.bitwarden.desktop",
  "LastPass": "com.lastpass.LastPass",
  NordPass: "com.nordpass.NordPass",
  "Google Authenticator": "com.google.authenticator2",
  Authy: "com.authy.authy",
  "Microsoft Authenticator": "com.azure.authenticator",
  "2Do": "com.abitofkylie.2Do",
  Cardhop: "com.flexibits.Cardhop",
  "Apple Maps": "com.apple.Maps",
  "Google Maps": "com.google.Maps",
  Waze: "com.waze.ios",
  "Citymapper": "com.citymapper.citymapper",
  "Transit": "com.thetransitapp.ios",
  "Moovit": "com.moovit",
  SpeedTest: "org.speedtest.SpeedTest",
  "NordVPN": "com.nordvpn.NordVPN",
  "ExpressVPN": "com.expressvpn.ExpressVPN",
  "1Blocker": "com.1blocker.1Blocker",

  // News & Reading
  Feedly: "com.devhd.feedly",
  "Apple News": "com.apple.news",
  "Google News": "com.google.Newsstand",
  "Microsoft News": "com.microsoft.newskit",
  Pocket: "com.ideashower.ReadItLater",
  Instapaper: "com.instapaper.Instapaper",
  Libby: "com.overdrive.mobile.digitallibrary",
  "Amazon Kindle": "com.amazon.Kindle",
  "Audible": "com.audible.audible",

  // Finance & Crypto
  PayPal: "com.paypal.pw悅",
  Venmo: "com.venmo",
  CashApp: "com.squareup.cash",
  "Robinhood": "com.robinhood.overview",
  Coinbase: "com.coinbase.Coinbase",
  Binance: "com.binance.app",
  "CoinGecko": "com.coingecko.coingecko",
  "Revolut": "com.revolut.revolut",
  N26: "com.n26.N26",
  "Splitwise": "com.splitwise.Splitwise",

  // Food & Delivery
  UberEats: "com.ubercab.eats",
  DoorDash: "com.doordash.DeliveryDriver",
  Grubhub: "com.grubhub.driver",
  Postmates: "com.postmates",
  "Deliveroo": "com.deliveroo",
  "Uber": "com.ubercab.Uber",
  Lyft: "com.zercab.lyft",
  "Bolt": "com.apple.TVApp",

  // Health & Fitness
  MyFitnessPal: "com.myfitnesspal.iOS",
  LoseIt: "com.fitnow.loseit",
  Noom: "com.noom.android",
  "Weight Watchers": "com.weightwatchers.wwmobile",
  Strava: "com.strava",
  NikeRunClub: "com.nike.nikeplus-gps",
  "Couch to 5K": "com.active.com.c25k",
  SleepCycle: "com.sleepcycle.tipscoaches",
  Headspace: "com.getsomeheadspace",
  Calm: "com.calm.calm",
  BetterHelp: "com.betterhelp.BetterHelp",

  // Travel
  Airbnb: "com.airbnb",
  Booking: "com.booking.iphoneapp",
  Expedia: "com.expedia.Booking",
  Hotels: "com.hotels.Expedia",
  TripAdvisor: "com.tripadvisor.TripAdvisor",
  Kayak: "com.kayak.kayak",
  "Google Flights": "com.google.FlightInsights",
  FlixBus: "com.flixbus.iphone",

  // Gaming
  "Steam": "com.valvesoftware.Steam",
  Xbox: "com.microsoft.XboxApp",
  "PlayStation": "com.scee.PlayStationApp",
  GeForceNow: "com.nvidia.geforcenow",

  // Entertainment
  IMDb: "com.imdb.imdb",
  Letterboxd: "com.letterboxd.iphone",
  Goodreads: "com.goodreads",
  Metacritic: "com.metacritic",
  "GameSpot": "com.gamespot.app",

  // Other
  Duolingo: "com.duolingo.Duolingo",
  "Babbel": "com.babbel.mobileandroid",
  "ChatGPT": "com.openai.chatgpt",
  "Claude": "com.anthropic.claude",
  Gemini: "com.google.Gemini",
  Perplexity: "com.perplexity.ai",
  "Microsoft Copilot": "com.microsoft.Office",
  Pi: "com.apple.TVApp",
  CharacterAI: "com.characterai.ios",
  "Lego AR": "com.lego.mindstorms",
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
