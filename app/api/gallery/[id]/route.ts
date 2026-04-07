import { NextRequest, NextResponse } from "next/server";
import { compileShortcut } from "@/lib/compiler";
import { getShortcutById } from "@/lib/data/gallery-shortcuts";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const shortcut = getShortcutById(id);

  if (!shortcut) {
    return NextResponse.json({ error: "Shortcut not found" }, { status: 404 });
  }

  try {
    const plistBuffer = compileShortcut({
      name: shortcut.name,
      actions: shortcut.actions,
    });

    const base64 = plistBuffer.toString("base64");

    return NextResponse.json({
      name: shortcut.name,
      file: base64,
    });
  } catch (error) {
    console.error("[Gallery Download Error]", error);
    return NextResponse.json(
      { error: "Failed to compile shortcut" },
      { status: 500 }
    );
  }
}
