export interface Example {
  label: string;
  prompt: string;
}

export const EXAMPLES: Example[] = [
  {
    label: "Leaving Home",
    prompt: "When I'm leaving home: announce the weather, my battery level, check if I have any meetings in the next 4 hours, and if it's raining remind me to take an umbrella. Then open Find My app.",
  },
  {
    label: "Morning Briefing",
    prompt: "Morning routine shortcut: tell me today's weather, read my upcoming calendar events, and wish me good morning with a motivational message.",
  },
  {
    label: "Focus Mode",
    prompt: "Start a focus session: turn on Do Not Disturb, set brightness to 50%, start a 25 minute timer, and show a notification saying 'Focus mode started. You got this!'",
  },
  {
    label: "Water Tracker",
    prompt: "Log 500ml of water to Apple Health and show me a notification with how much I've logged today.",
  },
  {
    label: "Quick Note",
    prompt: "Ask me what's on my mind, then save it as a new note with today's date as the title.",
  },
  {
    label: "Send ETA",
    prompt: "Send a message to my partner saying 'On my way home!' then open Maps app.",
  },
];
