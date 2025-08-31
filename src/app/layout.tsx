import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EngageMate - Reddit Auto-Commenting Tool",
  description: "AI-powered Reddit auto-commenting tool for marketing campaigns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
