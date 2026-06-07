'use client'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { type LucideIcon, Sparkles, FileText, Settings, Sun, Moon, LogOut, User, Menu, X, Lock } from 'lucide-react'
import { useTpTheme } from './TpProvider'

interface NavItem {
  href: string
  Icon: LucideIcon
  label: string
  admin?: true
}

const NAV_ITEMS: NavItem[] = [
  { href: '/trendpage/generate', Icon: Sparkles, label: 'Generate' },
  { href: '/trendpage/pages',    Icon: FileText,  label: 'My Pages' },
  { href: '/trendpage/settings', Icon: Settings,  label: 'Settings', admin: true },
]

function TpLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect width="28" height="28" rx="7" fill="var(--tp-primary)" />
      <path d="M14 6L16.5 12.5H21L17.5 16L19 22L14 18.5L9 22L10.5 16L7 12.5H11.5L14 6Z" fill="#fff" />
    </svg>
  )
}

export function TpShell({ children }: { children: React.ReactNode }) {
  const { dark, toggleDark } = useTpTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    setDropdownOpen(false)
    router.push('/trendpage/login')
  }

  return (
    <>
      {/* ── Navbar ── */}
      <header className="tp-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            className="tp-btn tp-btn-ghost tp-hamburger"
            onClick={() => setMobileOpen(o => !o)}
            style={{ padding: 6 }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link href="/trendpage/generate" className="tp-logo">
            <TpLogo />
            <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--tp-text)' }}>TrendPage AI</span>
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            className="tp-btn tp-btn-ghost"
            onClick={toggleDark}
            style={{ padding: 6, borderRadius: 8 }}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <div style={{ position: 'relative' }}>
            <button
              className="tp-avatar"
              onClick={() => setDropdownOpen(o => !o)}
              title="Account menu"
            >
              <span style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>JD</span>
            </button>

            {dropdownOpen && (
              <>
                <div
                  style={{ position: 'fixed', inset: 0, zIndex: 200 }}
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="tp-card tp-dropdown tp-fade-in">
                  <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--tp-border)' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--tp-text)' }}>John Doe</p>
                    <p style={{ fontSize: 11, color: 'var(--tp-text-muted)', marginTop: 1 }}>john@example.com</p>
                  </div>
                  <button className="tp-dropdown-item" onClick={() => setDropdownOpen(false)}>
                    <User size={14} />
                    Profile
                  </button>
                  <button
                    className="tp-dropdown-item"
                    style={{ color: 'var(--tp-danger)' }}
                    onClick={handleLogout}
                  >
                    <LogOut size={14} />
                    Log out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="tp-layout">
        {/* Desktop sidebar */}
        <nav className="tp-sidebar" aria-label="Main navigation">
          <div className="tp-sidebar-inner">
            {NAV_ITEMS.map(({ href, Icon, label, admin }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className="tp-sidebar-btn"
                  title={label}
                  style={{
                    color: active ? 'var(--tp-primary)' : 'var(--tp-text-muted)',
                    background: active ? 'var(--tp-primary-light)' : 'transparent',
                    textDecoration: 'none',
                  }}
                >
                  <Icon size={18} />
                  {admin && (
                    <span style={{ position: 'absolute', bottom: 4, right: 4, lineHeight: 1 }}>
                      <Lock size={10} color="var(--tp-text-muted)" opacity={0.5} />
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div className="tp-mobile-overlay" onClick={() => setMobileOpen(false)} />
        )}

        {/* Mobile sidebar */}
        <div
          className="tp-mobile-sidebar"
          style={{ transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)' }}
        >
          {NAV_ITEMS.map(({ href, Icon, label, admin }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className="tp-mobile-nav-btn"
                style={{
                  color: active ? 'var(--tp-primary)' : 'var(--tp-text)',
                  background: active ? 'var(--tp-primary-light)' : 'transparent',
                  textDecoration: 'none',
                }}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={18} />
                <span>{label}</span>
                {admin && <Lock size={10} color="var(--tp-text-muted)" opacity={0.5} />}
              </Link>
            )
          })}
        </div>

        <main className="tp-main">{children}</main>
      </div>
    </>
  )
}
