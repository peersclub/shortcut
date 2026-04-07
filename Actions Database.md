# Actions Database

Maps human-readable action keys to `WFWorkflowActionIdentifiers` and their parameters.

## Structure

```typescript
interface ActionParam {
  key: string;
  type: "string" | "number" | "boolean" | "enum" | "variable";
  description: string;
  required?: boolean;
  enumValues?: string[];
  default?: string | number | boolean;
}

interface ActionDefinition {
  id: string;           // WFWorkflowActionIdentifier
  name: string;
  description: string;
  category: string;
  outputName?: string;
  params?: ActionParam[];
}
```

## Categories

### Weather
| Action | ID | Output |
|--------|-----|--------|
| `get_current_weather` | `is.workflow.actions.weather.currentconditions` | Weather Conditions |
| `get_weather_forecast` | `is.workflow.actions.weather.forecast` | Weather Conditions |

### Device
| Action | ID | Params | Output |
|--------|-----|--------|--------|
| `get_battery_level` | `is.workflow.actions.getbatterylevel` | - | Battery Level |
| `set_brightness` | `is.workflow.actions.setbrightness` | `WFBrightness` (number, 0-1) | - |
| `set_volume` | `is.workflow.actions.setvolume` | `WFVolume` (number, 0-1) | - |
| `get_device_details` | `is.workflow.actions.getdevicedetails` | `WFDeviceDetail` (enum) | Device Details |
| `set_do_not_disturb` | `is.workflow.actions.dnd.set` | `Enabled` (boolean) | - |
| `set_flashlight` | `is.workflow.actions.flashlight` | `WFFlashlightSetting` (On/Off) | - |
| `vibrate_device` | `is.workflow.actions.vibrate` | - | - |

### Calendar
| Action | ID | Params |
|--------|-----|--------|
| `find_calendar_events` | `is.workflow.actions.filter.calendarevents` | - |
| `add_calendar_event` | `is.workflow.actions.addnewcalendar` | `WFCalendarEventTitle`, `WFCalendarEventStartDate`, `WFCalendarEventEndDate` |

### Health
| Action | ID | Params |
|--------|-----|--------|
| `log_health_sample` | `is.workflow.actions.health.quantity.log` | `WFQuantitySampleType`, `WFQuantitySampleQuantity` |
| `find_health_samples` | `is.workflow.actions.health.quantity.get` | `WFQuantitySampleType` |

### Scripting
| Action | ID | Params | Notes |
|--------|-----|--------|-------|
| `text` | `is.workflow.actions.gettext` | `WFTextActionText` | Creates text with `{{variable}}` support |
| `conditional` | `is.workflow.actions.conditional` | `WFCondition`, `WFConditionalActionString`, `WFNumberValue` | Requires `compare_with` and `group_id` |
| `otherwise` | `is.workflow.actions.conditional` | - | Must share `group_id` with conditional |
| `end_if` | `is.workflow.actions.conditional` | - | Must share `group_id` with conditional |
| `choose_from_menu` | `is.workflow.actions.choosefrommenu` | `WFMenuPrompt`, `WFMenuItems` | Comma-separated items |
| `set_variable` | `is.workflow.actions.setvariable` | `WFVariableName` | Stores previous output |
| `get_variable` | `is.workflow.actions.getvariable` | `WFVariable` | Retrieves named variable |
| `ask_for_input` | `is.workflow.actions.ask` | `WFAskActionPrompt`, `WFAskActionDefaultAnswer`, `WFInputType` | - |
| `comment` | `is.workflow.actions.comment` | `WFCommentActionText` | Does nothing at runtime |

### Alerts & Notifications
| Action | ID | Params |
|--------|-----|--------|
| `show_alert` | `is.workflow.actions.alert` | `WFAlertActionTitle`, `WFAlertActionMessage` |
| `show_notification` | `is.workflow.actions.notification` | `WFNotificationActionTitle`, `WFNotificationActionBody` |
| `show_result` | `is.workflow.actions.showresult` | `Text` |

### Media
| Action | ID | Params |
|--------|-----|--------|
| `speak_text` | `is.workflow.actions.speaktext` | `WFText`, `WFSpeakTextRate` |
| `play_sound` | `is.workflow.actions.playsound` | - |
| `set_playback_destination` | `is.workflow.actions.setplaybackdestination` | `WFMediaRoute` |
| `play_music` | `is.workflow.actions.playmusic` | - |

### Web
| Action | ID | Params |
|--------|-----|--------|
| `open_url` | `is.workflow.actions.openurl` | `WFInput` (URL) |
| `get_contents_of_url` | `is.workflow.actions.downloadurl` | `WFURL`, `WFHTTPMethod`, `WFHTTPBodyType` |

### Apps
| Action | ID | Params |
|--------|-----|--------|
| `open_app` | `is.workflow.actions.openapp` | `WFAppIdentifier`, `WFAppName` |
| `create_note` | `com.apple.mobilenotes.SharingExtension` | `WFNoteBody` |
| `add_reminder` | `is.workflow.actions.addnewreminder` | `WFReminderTitle`, `WFReminderDueDate` |
| `start_timer` | `is.workflow.actions.timer.start` | `WFTimerDuration` |

### Date/Time
| Action | ID | Params | Output |
|--------|-----|--------|--------|
| `get_current_date` | `is.workflow.actions.date` | - | Current Date |
| `format_date` | `is.workflow.actions.format.date` | `WFDateFormatStyle`, `WFDateFormat` | Formatted Date |
| `wait` | `is.workflow.actions.delay` | `WFDelayTime` (seconds) | - |

### Math
| Action | ID | Params | Output |
|--------|-----|--------|--------|
| `calculate` | `is.workflow.actions.math` | `WFMathOperation`, `WFMathOperand` | Calculation Result |
| `get_statistics` | `is.workflow.actions.statistics` | `WFStatisticsOperation` | Statistics |

### Messaging
| Action | ID | Params |
|--------|-----|--------|
| `send_message` | `is.workflow.actions.sendmessage` | `WFSendMessageContent`, `WFSendMessageActionRecipients` |

### Photos
| Action | ID | Output |
|--------|-----|--------|
| `take_photo` | `is.workflow.actions.takephoto` | Photo |
| `save_to_photo_album` | `is.workflow.actions.savetocameraroll` | - |

### Clipboard
| Action | ID | Output |
|--------|-----|--------|
| `copy_to_clipboard` | `is.workflow.actions.setclipboard` | - |
| `get_clipboard` | `is.workflow.actions.getclipboard` | Clipboard |

## Conditionals

Conditions map to numeric codes:
```javascript
Equals: 4
"Is Greater Than": 2
"Is Less Than": 3
Contains: 99
"Begins With": 8
"Ends With": 9
```

## App Bundle IDs

Common Apple app bundle identifiers are defined in `APP_IDS`:
- Safari: `com.apple.mobilesafari`
- Maps: `com.apple.Maps`
- Calendar: `com.apple.mobilecal`
- Health: `com.apple.Health`
- Music: `com.apple.Music`
- Notes: `com.apple.mobilenotes`
- etc.
