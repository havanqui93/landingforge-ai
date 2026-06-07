'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

function TpLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect width="28" height="28" rx="7" fill="var(--tp-primary)" />
      <path d="M14 6L16.5 12.5H21L17.5 16L19 22L14 18.5L9 22L10.5 16L7 12.5H11.5L14 6Z" fill="#fff" />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.9 33.1 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.2-2.7-.4-3.9z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.5 18.8 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.2 26.7 36 24 36c-5.3 0-9.8-3-11.3-7.2l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.2 5.2C37 39.1 44 34 44 24c0-1.3-.2-2.7-.4-3.9z"/>
    </svg>
  )
}

export function LoginScreen() {
  const router = useRouter()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push('/trendpage/generate')
    }, 800)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: 24,
    }}>
      <div
        className="tp-card tp-fade-in"
        style={{ width: '100%', maxWidth: 400, padding: 32 }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 28 }}>
          <TpLogo />
          <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--tp-text)' }}>TrendPage AI</span>
        </div>

        {/* Tabs */}
        <div className="tp-tabs" style={{ marginBottom: 24 }}>
          <button
            className={`tp-tab${mode === 'signin' ? ' active' : ''}`}
            onClick={() => setMode('signin')}
          >
            Sign In
          </button>
          <button
            className={`tp-tab${mode === 'signup' ? ' active' : ''}`}
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {mode === 'signup' && (
            <div className="tp-fade-in">
              <label className="tp-label">Name</label>
              <input
                className="tp-input"
                placeholder="Your full name"
                value={form.name}
                onChange={set('name')}
                autoComplete="name"
              />
            </div>
          )}

          <div>
            <label className="tp-label">Email</label>
            <input
              className="tp-input"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set('email')}
              autoComplete="email"
            />
          </div>

          <div>
            <label className="tp-label">Password</label>
            <input
              className="tp-input"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={set('password')}
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            />
            {mode === 'signin' && (
              <a
                href="#"
                onClick={e => e.preventDefault()}
                style={{ display: 'inline-block', marginTop: 6, fontSize: 12, color: 'var(--tp-primary)', textDecoration: 'none' }}
              >
                Forgot password?
              </a>
            )}
          </div>

          <button
            className="tp-btn tp-btn-primary tp-btn-block tp-btn-lg"
            type="submit"
            disabled={loading}
            style={{ marginTop: 4, position: 'relative', height: 44 }}
          >
            {loading ? (
              <span
                className="tp-spinner"
                style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }}
              />
            ) : (
              mode === 'signin' ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        <div className="tp-divider">or continue with</div>

        <button className="tp-btn tp-btn-outline tp-btn-block" type="button" style={{ gap: 8 }}>
          <GoogleIcon />
          Continue with Google
        </button>

        <p style={{ marginTop: 20, fontSize: 11, color: 'var(--tp-text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
          By signing up you agree to our{' '}
          <a href="#" onClick={e => e.preventDefault()} style={{ color: 'var(--tp-primary)', textDecoration: 'none' }}>Terms</a>
          {' '}&amp;{' '}
          <a href="#" onClick={e => e.preventDefault()} style={{ color: 'var(--tp-primary)', textDecoration: 'none' }}>Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}
