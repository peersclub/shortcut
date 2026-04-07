export interface ShortcutAction {
  action: string;
  params?: Record<string, string | number | boolean>;
  output_name?: string;
  compare_with?: string;
  group_id?: string;
}

export interface GeneratedShortcut {
  name: string;
  actions: ShortcutAction[];
  file: string; // base64 encoded .shortcut plist
}
