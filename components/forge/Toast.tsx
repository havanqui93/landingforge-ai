"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { X, Check, AlertCircle } from "lucide-react";

type ToastVariant = "success" | "error";

interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastCtx {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastCtx>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      const id = Math.random().toString(36).slice(2);
      setItems((prev) => [...prev, { id, message, variant }]);
      setTimeout(() => remove(id), 3500);
    },
    [remove],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast stack */}
      <div
        className="pointer-events-none fixed right-5 top-5 z-[300] flex flex-col gap-2"
        aria-live="polite"
      >
        {items.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex min-w-[300px] max-w-[380px] items-start gap-2.5 rounded-xl border border-border bg-surface px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,.5)] animate-toast-in ${
              t.variant === "success"
                ? "border-l-[3px] border-l-success"
                : "border-l-[3px] border-l-danger"
            }`}
          >
            <span
              className={`mt-0.5 flex-shrink-0 ${t.variant === "success" ? "text-success" : "text-danger"}`}
            >
              {t.variant === "success" ? (
                <Check size={14} />
              ) : (
                <AlertCircle size={14} />
              )}
            </span>
            <span className="flex-1 text-[13px] leading-relaxed text-fg">
              {t.message}
            </span>
            <button
              onClick={() => remove(t.id)}
              className="flex-shrink-0 text-muted transition hover:text-fg"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
