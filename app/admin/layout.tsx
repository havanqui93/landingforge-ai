import type { Metadata } from "next";
import { AdminShell } from "@/components/forge/AdminShell";

export const metadata: Metadata = {
  title: "LandingForge — Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
