import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shortcut — AI Apple Shortcuts Creator",
  description: "Describe what you want. Get a downloadable Apple Shortcut.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white min-h-screen">{children}</body>
    </html>
  );
}
