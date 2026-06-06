import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LandingForge — many landings, one project",
  description:
    "A config-driven platform for hosting many independent, premium landing pages.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
