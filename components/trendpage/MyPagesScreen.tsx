'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, Pencil, Check, X, Trash2, Plus } from 'lucide-react'

interface Page {
  id: number
  title: string
  keyword: string
  slug: string
  status: 'published' | 'draft'
  date: string
}

const MOCK_PAGES: Page[] = [
  { id: 1, title: 'AI Video Generator for TikTok: Complete Guide 2026', keyword: 'AI video generator TikTok', slug: '/trends/ai-video-generator-tiktok', status: 'published', date: '2026-06-05' },
  { id: 2, title: 'Best Free Logo Makers Compared',                     keyword: 'free logo maker',            slug: '/trends/free-logo-maker',             status: 'published', date: '2026-06-04' },
  { id: 3, title: 'How to Start Dropshipping in 2026',                  keyword: 'dropshipping guide',         slug: '/trends/dropshipping-guide',          status: 'draft',     date: '2026-06-04' },
  { id: 4, title: 'Top 10 Project Management Tools',                    keyword: 'project management tools',   slug: '/trends/project-management-tools',    status: 'published', date: '2026-06-03' },
  { id: 5, title: 'Email Marketing Automation Strategy',                keyword: 'email marketing automation', slug: '/trends/email-marketing-automation',  status: 'draft',     date: '2026-06-02' },
  { id: 6, title: 'Remote Work Productivity Tips',                      keyword: 'remote work productivity',   slug: '/trends/remote-work-productivity',    status: 'draft',     date: '2026-06-01' },
]

type Filter = 'all' | 'published' | 'draft'

export function MyPagesScreen() {
  const router = useRouter()
  const [filter, setFilter]           = useState<Filter>('all')
  const [pages, setPages]             = useState<Page[]>(MOCK_PAGES)
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 5

  const filtered    = pages.filter(p => filter === 'all' || p.status === filter)
  const totalPages  = Math.ceil(filtered.length / perPage)
  const visible     = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)
  const counts      = {
    all:       pages.length,
    published: pages.filter(p => p.status === 'published').length,
    draft:     pages.filter(p => p.status === 'draft').length,
  }

  const toggleStatus = (id: number) =>
    setPages(prev => prev.map(p =>
      p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p
    ))

  const deletePage = (id: number) =>
    setPages(prev => prev.filter(p => p.id !== id))

  const actionBtnStyle: React.CSSProperties = { padding: '6px 8px', minWidth: 0, fontSize: 12 }

  return (
    <div className="tp-fade-in" style={{ padding: '28px 24px', maxWidth: 960, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--tp-text)' }}>My Pages</h1>
        <button
          className="tp-btn tp-btn-primary"
          onClick={() => router.push('/trendpage/generate')}
        >
          <Plus size={14} />
          Generate New
        </button>
      </div>

      {/* Filter tabs */}
      <div className="tp-tabs" style={{ marginBottom: 0 }}>
        {(['all', 'published', 'draft'] as Filter[]).map(f => (
          <button
            key={f}
            className={`tp-tab${filter === f ? ' active' : ''}`}
            onClick={() => { setFilter(f); setCurrentPage(1) }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span style={{ marginLeft: 6, fontSize: 11, color: 'var(--tp-text-muted)', fontWeight: 400 }}>
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <>
          {/* Desktop table */}
          <div
            className="tp-table-desktop"
            style={{
              background: 'var(--tp-surface)', border: '1px solid var(--tp-border)',
              borderRadius: 12, overflow: 'hidden', marginTop: 0,
            }}
          >
            <table className="tp-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Keyword</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 500, maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p.title}
                    </td>
                    <td style={{ color: 'var(--tp-text-muted)' }}>{p.keyword}</td>
                    <td>
                      <span className={`tp-badge tp-badge-${p.status === 'published' ? 'success' : 'warning'}`}>
                        {p.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ color: 'var(--tp-text-muted)', whiteSpace: 'nowrap' }}>{p.date}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                        <button className="tp-btn tp-btn-ghost" style={actionBtnStyle} title="View">
                          <ChevronRight size={14} />
                        </button>
                        <button className="tp-btn tp-btn-ghost" style={actionBtnStyle} title="Edit">
                          <Pencil size={14} />
                        </button>
                        <button
                          className="tp-btn tp-btn-ghost"
                          style={actionBtnStyle}
                          title={p.status === 'published' ? 'Unpublish' : 'Publish'}
                          onClick={() => toggleStatus(p.id)}
                        >
                          {p.status === 'published' ? <X size={14} /> : <Check size={14} />}
                        </button>
                        <button
                          className="tp-btn tp-btn-ghost"
                          style={{ ...actionBtnStyle, color: 'var(--tp-danger)' }}
                          title="Delete"
                          onClick={() => deletePage(p.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div
            className="tp-mobile-cards"
            style={{ display: 'none', flexDirection: 'column', gap: 10, marginTop: 16 }}
          >
            {visible.map(p => (
              <div key={p.id} className="tp-card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p.title}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--tp-text-muted)', marginTop: 2 }}>{p.keyword}</p>
                  </div>
                  <span className={`tp-badge tp-badge-${p.status === 'published' ? 'success' : 'warning'}`}>
                    {p.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                  <span style={{ fontSize: 11, color: 'var(--tp-text-muted)' }}>{p.date}</span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="tp-btn tp-btn-ghost" style={actionBtnStyle} onClick={() => toggleStatus(p.id)}>
                      {p.status === 'published' ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      className="tp-btn tp-btn-ghost"
                      style={{ ...actionBtnStyle, color: 'var(--tp-danger)' }}
                      onClick={() => deletePage(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 20 }}>
              <button
                className="tp-btn tp-btn-ghost"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                ← Prev
              </button>
              <span style={{ fontSize: 12, color: 'var(--tp-text-muted)' }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="tp-btn tp-btn-ghost"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </>
      ) : (
        /* Empty state */
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '64px 24px', textAlign: 'center' }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
            <rect x="8" y="6" width="32" height="36" rx="4" stroke="var(--tp-border)" strokeWidth="2" fill="var(--tp-primary-light)" />
            <line x1="14" y1="16" x2="34" y2="16" stroke="var(--tp-border)" strokeWidth="2" strokeLinecap="round" />
            <line x1="14" y1="22" x2="28" y2="22" stroke="var(--tp-border)" strokeWidth="2" strokeLinecap="round" />
            <line x1="14" y1="28" x2="32" y2="28" stroke="var(--tp-border)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p style={{ marginTop: 12, fontWeight: 600, fontSize: 14, color: 'var(--tp-text)' }}>No pages yet</p>
          <p style={{ fontSize: 12, color: 'var(--tp-text-muted)', marginTop: 4 }}>Generate your first one to get started.</p>
          <button
            className="tp-btn tp-btn-primary"
            style={{ marginTop: 16 }}
            onClick={() => router.push('/trendpage/generate')}
          >
            <span>✦</span> Generate First Page
          </button>
        </div>
      )}
    </div>
  )
}
