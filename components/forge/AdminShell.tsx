"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap,
  LayoutGrid,
  Layers,
  FileText,
  Calendar,
  Settings,
  LogOut,
  Bell,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutGrid, exact: true },
  { href: "/admin/generate", label: "Generate", icon: Layers },
  { href: "/admin/pages", label: "All Pages", icon: FileText },
  { href: "/admin/schedule", label: "Schedule", icon: Calendar },
  { href: "/admin/settings", label: "Settings", icon: Settings },
] as const;

function useActiveNav(href: string, exact = false) {
  const pathname = usePathname();
  if (exact) return pathname === href;
  return pathname.startsWith(href);
}

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  exact?: boolean;
  onClick?: () => void;
}

function NavItem({ href, label, icon: Icon, exact = false, onClick }: NavItemProps) {
  const active = useActiveNav(href, exact);
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-[13px] font-medium transition-all duration-150 ${
        active
          ? "forge-nav-active"
          : "text-muted hover:bg-primary/[0.06] hover:text-fg"
      }`}
    >
      <Icon size={15} />
      {label}
    </Link>
  );
}

const breadcrumbMap: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/generate": "Generate",
  "/admin/pages": "All Pages",
  "/admin/schedule": "Schedule",
  "/admin/settings": "Settings",
};

export function AdminShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const breadcrumb = breadcrumbMap[pathname] ?? breadcrumbMap[
    Object.keys(breadcrumbMap).find(k => k !== "/admin" && pathname.startsWith(k)) ?? ""
  ];

  return (
    <div className="flex min-h-screen" style={{ background: "#080814" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[49] bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 flex w-[220px] flex-col border-r border-border bg-surface transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-5">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[15px] font-bold tracking-tight"
            onClick={() => setSidebarOpen(false)}
          >
            <Zap size={16} className="text-primary" fill="currentColor" />
            <span className="text-fg">Landing</span>
            <span className="text-primary">Forge</span>
          </Link>
          <span className="forge-badge forge-badge-primary text-[9px]">Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              onClick={() => setSidebarOpen(false)}
            />
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="flex items-center gap-2.5 border-t border-border px-4 py-3">
          <div
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-primary"
            style={{
              background: "rgba(99,102,241,.18)",
              border: "1px solid rgba(99,102,241,.3)",
            }}
          >
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-[13px] font-medium text-fg">Admin</p>
            <span className="forge-badge forge-badge-primary text-[9px]">admin</span>
          </div>
          <button
            className="flex-shrink-0 rounded-lg p-1.5 text-muted transition hover:text-fg"
            title="Sign out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </aside>

      {/* Body */}
      <div className="flex min-h-screen flex-1 flex-col md:ml-[220px]">
        {/* Topbar */}
        <header
          className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border px-8"
          style={{ background: "rgba(8,8,20,.85)", backdropFilter: "blur(16px)" }}
        >
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:text-fg md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={18} />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[13px]">
              <span className="text-muted">Admin</span>
              {breadcrumb && (
                <>
                  <ChevronRight size={12} className="text-muted" />
                  <span className="text-fg">{breadcrumb}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:text-fg">
              <Bell size={16} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
