'use client'
import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

interface GeneratedResult {
  title: string
  slug: string
  meta: string
}

export function GenerateScreen() {
  const [keyword, setKeyword]       = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory]     = useState('')
  const [country, setCountry]       = useState('')
  const [loading, setLoading]       = useState(false)
  const [result, setResult]         = useState<GeneratedResult | null>(null)
  const [published, setPublished]   = useState(false)

  const handleGenerate = () => {
    if (!keyword.trim()) return
    setLoading(true)
    setResult(null)
    setPublished(false)
    setTimeout(() => {
      const slug = keyword.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
      setLoading(false)
      setResult({
        title: keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
          + ': Complete Guide ' + new Date().getFullYear(),
        slug: `/trends/${slug}`,
        meta: `Discover the best ${keyword.trim().toLowerCase()} tools and strategies. Our comprehensive guide covers everything you need to know in ${new Date().getFullYear()}.`,
      })
    }, 1400)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 24px', minHeight: 'calc(100vh - var(--tp-navbar-h))' }}>
      <div
        className="tp-card tp-fade-in"
        style={{ width: '100%', maxWidth: 600, padding: 32, alignSelf: 'flex-start' }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--tp-text)' }}>
          Generate a Landing Page
        </h1>
        <p style={{ fontSize: 14, color: 'var(--tp-text-muted)', marginTop: 4 }}>
          Enter a keyword and let AI write your SEO page in seconds.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
          {/* Keyword */}
          <div>
            <label className="tp-label">Target Keyword</label>
            <input
              className="tp-input tp-input-lg"
              placeholder="e.g. AI video generator for TikTok"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="tp-label">
              Short Description{' '}
              <span style={{ fontWeight: 400, color: 'var(--tp-text-placeholder)' }}>(optional)</span>
            </label>
            <textarea
              className="tp-textarea"
              placeholder="Brief context to guide the AI..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Category + Country */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label className="tp-label">Category</label>
              <select className="tp-select" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">Select category</option>
                <option>Technology</option>
                <option>Marketing</option>
                <option>Finance</option>
                <option>Health</option>
                <option>Education</option>
              </select>
            </div>
            <div>
              <label className="tp-label">Country</label>
              <select className="tp-select" value={country} onChange={e => setCountry(e.target.value)}>
                <option value="">Select country</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Germany</option>
                <option>France</option>
                <option>Japan</option>
              </select>
            </div>
          </div>

          {/* Generate button */}
          <button
            className="tp-btn tp-btn-primary tp-btn-block tp-btn-lg"
            onClick={handleGenerate}
            disabled={loading || !keyword.trim()}
            style={{ marginTop: 4, position: 'relative', overflow: 'hidden', height: 46 }}
          >
            {loading ? (
              <>
                <span
                  className="tp-spinner"
                  style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }}
                />
                Generating…
              </>
            ) : (
              <>
                <span style={{ fontSize: 16 }}>✦</span> Generate Page
              </>
            )}
          </button>

          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--tp-text-muted)' }}>
            Your page will be saved as a draft for review
          </p>
        </div>

        {/* Result */}
        {result && (
          <div
            className="tp-fade-in"
            style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--tp-border)' }}
          >
            {/* Success banner */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
              background: 'var(--tp-success-light)', borderRadius: 8,
              fontSize: 13, fontWeight: 600, color: 'var(--tp-success)',
            }}>
              <CheckCircle size={16} />
              Page generated successfully!
            </div>

            {/* Preview fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
              <div>
                <span className="tp-label" style={{ marginBottom: 2 }}>Title</span>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--tp-text)' }}>{result.title}</p>
              </div>
              <div>
                <span className="tp-label" style={{ marginBottom: 2 }}>Slug</span>
                <p style={{ fontSize: 13 }}>
                  <code style={{
                    padding: '2px 8px', background: 'var(--tp-primary-badge)', borderRadius: 4,
                    fontSize: 12, fontFamily: "'SF Mono', 'Fira Code', monospace", color: 'var(--tp-primary)',
                  }}>
                    {result.slug}
                  </code>
                </p>
              </div>
              <div>
                <span className="tp-label" style={{ marginBottom: 2 }}>Meta Description</span>
                <p style={{ fontSize: 13, color: 'var(--tp-text-secondary)' }}>{result.meta}</p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button className="tp-btn tp-btn-outline" style={{ flex: 1 }}>Save Draft</button>
              <button
                className="tp-btn tp-btn-success"
                style={{ flex: 1 }}
                onClick={() => setPublished(true)}
                disabled={published}
              >
                {published ? '✓ Published' : 'Publish Now'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
