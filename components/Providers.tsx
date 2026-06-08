"use client";

import { ToastProvider } from "@/components/forge/Toast";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
