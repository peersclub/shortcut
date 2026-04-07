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

  const isIOS = request.headers.get("user-agent")?.includes("iPhone") ||
                request.headers.get("user-agent")?.includes("iPad");

  if (isIOS) {
    return new NextResponse(bytes, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.apple.shortcut",
        "Content-Disposition": `inline; filename="${encodeURIComponent(name)}.shortcut"`,
        "Content-Length": bytes.length.toString(),
        "Transfer-Encoding": "chunked",
      },
    });
  }

  return new NextResponse(bytes, {
    status: 200,
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(name)}.shortcut"`,
      "Content-Length": bytes.length.toString(),
    },
  });
}
