import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const data = searchParams.get("data");
  const name = searchParams.get("name") || "shortcut";

  if (!data) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  const binaryStr = atob(data);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }

  return new NextResponse(bytes, {
    status: 200,
    headers: {
      "Content-Type": "application/x-shortcut",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(name)}.shortcut"`,
      "Content-Length": bytes.length.toString(),
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}
