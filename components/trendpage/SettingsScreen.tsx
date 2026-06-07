'use client'
import { useState } from 'react'
import { Settings, Eye, EyeOff, Info, Check, Trash2 } from 'lucide-react'

type SavedSection = 'schedule' | 'api' | 'guardrails' | null

export function SettingsScreen() {
  const [schedule, setSchedule] = useState({ enabled: true, time: '07:00', tz: 'UTC' })
  const [api, setApi]           = useState({ key: '', model: 'gpt-4o-mini', showKey: false })
  const [guardrails, setGuardrails] = useState({ violence: true, politics: true, medical: true, financial: true })
  const [saved, setSaved]       = useState<SavedSection>(null)

  const flash = (section: NonNullable<SavedSection>) => {
    setSaved(section)
    setTimeout(() => setSaved(null), 1800)
  }

  const SaveBtn = ({ section, label }: { section: NonNullable<SavedSection>; label: string }) => (
    <button
      className="tp-btn tp-btn-primary"
      onClick={() => flash(section)}
      style={{ marginTop: 16, minWidth: 140 }}
    >
      {saved === section ? (
        <><Check size={14} /> Saved</>
      ) : label}
    </button>
  )

  const CheckItem = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
      <span
        onClick={onChange}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 18, height: 18, borderRadius: 4,
          border: `1.5px solid ${checked ? 'var(--tp-primary)' : 'var(--tp-border)'}`,
          background: checked ? 'var(--tp-primary)' : 'var(--tp-surface)',
          transition: 'all 0.15s var(--tp-ease)', flexShrink: 0, cursor: 'pointer',
        }}
      >
        {checked && <Check size={10} color="#fff" />}
      </span>
      <span style={{ fontSize: 13, color: 'var(--tp-text)' }}>{label}</span>
    </label>
  )

  const sectionStyle: React.CSSProperties = { marginBottom: 20, padding: 24 }
  const sectionTitleStyle: React.CSSProperties = { fontSize: 15, fontWeight: 600, marginBottom: 16, color: 'var(--tp-text)' }

  return (
    <div className="tp-fade-in" style={{ padding: '28px 24px', maxWidth: 640, margin: '0 auto' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 20, fontWeight: 700, marginBottom: 24, color: 'var(--tp-text)' }}>
        <Settings size={20} color="var(--tp-text-muted)" />
        Settings
      </h1>

      {/* ── Section 1: Schedule ── */}
      <div className="tp-card" style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Daily Auto-Generate Schedule</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--tp-text)' }}>
              Enable automatic daily generation
            </span>
            <p style={{ fontSize: 11, color: 'var(--tp-text-muted)', marginTop: 2 }}>
              Pages auto-generated from trending topics
            </p>
          </div>
          <button
            className={`tp-toggle${schedule.enabled ? ' active' : ''}`}
            onClick={() => setSchedule(s => ({ ...s, enabled: !s.enabled }))}
            aria-label={schedule.enabled ? 'Disable auto-generation' : 'Enable auto-generation'}
          />
        </div>

        {schedule.enabled && (
          <div className="tp-fade-in" style={{ marginTop: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label className="tp-label">Generate at</label>
                <input
                  className="tp-input"
                  type="time"
                  value={schedule.time}
                  onChange={e => setSchedule(s => ({ ...s, time: e.target.value }))}
                />
              </div>
              <div>
                <label className="tp-label">Timezone</label>
                <select
                  className="tp-select"
                  value={schedule.tz}
                  onChange={e => setSchedule(s => ({ ...s, tz: e.target.value }))}
                >
                  <option>UTC</option>
                  <option>US/Eastern</option>
                  <option>US/Pacific</option>
                  <option>Europe/London</option>
                  <option>Asia/Tokyo</option>
                </select>
              </div>
            </div>
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 14,
              padding: '10px 14px', background: 'var(--tp-primary-light)',
              borderRadius: 8, fontSize: 12, color: 'var(--tp-text-secondary)', lineHeight: 1.5,
            }}>
              <Info size={14} color="var(--tp-primary)" style={{ flexShrink: 0, marginTop: 1 }} />
              <span>
                Pages will be auto-generated daily at the selected time using trending topics.
                They are saved as drafts for your review.
              </span>
            </div>
          </div>
        )}

        <SaveBtn section="schedule" label="Save Schedule" />
      </div>

      {/* ── Section 2: AI Provider ── */}
      <div className="tp-card" style={sectionStyle}>
        <h2 style={sectionTitleStyle}>AI Provider</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label className="tp-label">OpenAI API Key</label>
            <div style={{ position: 'relative' }}>
              <input
                className="tp-input"
                type={api.showKey ? 'text' : 'password'}
                placeholder="sk-••••••••••••••••"
                value={api.key}
                onChange={e => setApi(a => ({ ...a, key: e.target.value }))}
                style={{ paddingRight: 44 }}
              />
              <button
                onClick={() => setApi(a => ({ ...a, showKey: !a.showKey }))}
                title={api.showKey ? 'Hide key' : 'Show key'}
                style={{
                  position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                  color: 'var(--tp-text-muted)', display: 'flex', alignItems: 'center',
                }}
              >
                {api.showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="tp-label">Model</label>
            <select
              className="tp-select"
              value={api.model}
              onChange={e => setApi(a => ({ ...a, model: e.target.value }))}
            >
              <option>gpt-4o-mini</option>
              <option>gpt-4o</option>
              <option>gpt-4-turbo</option>
            </select>
          </div>
        </div>
        <SaveBtn section="api" label="Save API Settings" />
      </div>

      {/* ── Section 3: Guardrails ── */}
      <div className="tp-card" style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Content Guardrails</h2>
        <p style={{ fontSize: 12, color: 'var(--tp-text-muted)', marginBottom: 14 }}>
          Block content in the following categories:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <CheckItem label="Violence & graphic content"    checked={guardrails.violence}  onChange={() => setGuardrails(g => ({ ...g, violence:  !g.violence  }))} />
          <CheckItem label="Political content & opinions"  checked={guardrails.politics}  onChange={() => setGuardrails(g => ({ ...g, politics:  !g.politics  }))} />
          <CheckItem label="Medical claims & health advice" checked={guardrails.medical}  onChange={() => setGuardrails(g => ({ ...g, medical:   !g.medical   }))} />
          <CheckItem label="Financial advice & predictions" checked={guardrails.financial} onChange={() => setGuardrails(g => ({ ...g, financial: !g.financial }))} />
        </div>
        <SaveBtn section="guardrails" label="Save Guardrails" />
      </div>

      {/* ── Section 4: Danger Zone ── */}
      <div className="tp-card" style={{ ...sectionStyle, borderColor: 'var(--tp-danger)', marginBottom: 0 }}>
        <h2 style={{ ...sectionTitleStyle, color: 'var(--tp-danger)' }}>Danger Zone</h2>
        <p style={{ fontSize: 12, color: 'var(--tp-text-muted)', marginBottom: 14 }}>
          Destructive actions that cannot be undone.
        </p>
        <button className="tp-btn tp-btn-danger-outline">
          <Trash2 size={14} />
          Delete All Draft Pages
        </button>
      </div>
    </div>
  )
}
