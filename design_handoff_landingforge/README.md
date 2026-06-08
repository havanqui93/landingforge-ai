# Handoff: LandingForge — Full UI

## Overview

LandingForge is an AI-powered landing page generator platform. Users can generate premium, config-driven landing pages from a keyword or trending topic. The product has a public-facing marketing/gallery surface and a protected admin panel for managing pages, scheduling automated generation, and configuring permissions.

**Tagline:** "Many landings. One project."

---

## About the Design Files

The HTML files bundled in this package are **high-fidelity design prototypes** — not production code to copy directly. They are interactive references showing intended look, layout, and behavior.

**Your task:** Recreate these designs in your target codebase (React + Next.js App Router is recommended, using Tailwind CSS for styling and Lucide React for icons). If a codebase already exists, follow its established patterns and component library. Do not ship the prototype HTML directly.

---

## Fidelity

**High-fidelity.** Every screen is pixel-perfect with final colors, typography, spacing, border radius, shadows, hover/focus states, loading states, error states, and interaction animations. Implement exactly as shown.

---

## Design System

### Font Families
```
Primary:   'Inter', system-ui, sans-serif   (weights: 400, 500, 600, 700)
Monospace: 'JetBrains Mono', monospace      (slugs, cron strings, tokens)
Rendering: -webkit-font-smoothing: antialiased
```

### Color Tokens
```
--bg:       #080814   Background (page)
--surface:  #161626   Surface (cards, inputs, sidebar)
--primary:  #6366F1   Indigo accent — buttons, glows, active states
--fg:       #EDEDE5   Foreground text
--muted:    #9494AA   Secondary text, labels, placeholders
--border:   #2A2A40   Hairline borders
--success:  #059669   Published badge, success toast
--warning:  #D97706   Draft badge
--danger:   #DC2626   Delete, error states
```

### Semantic / Alpha Colors
```
Primary/10%: rgba(99,102,241,.10)   — badge bg, nav active bg
Primary/18%: rgba(99,102,241,.18)   — hero glow layer
Primary/25%: rgba(99,102,241,.25)   — button shadow
Primary/35%: rgba(99,102,241,.35)   — button hover shadow
Surface/60%: rgba(22,22,38,.60)     — glass card bg
BG/85%:      rgba(8,8,20,.85)       — nav, topbar
```

### Border Radius
```
4px    — micro (table rows hover)
8px    — dropdown items, nav items
12px   — cards, inputs, buttons (default)
16px   — landing cards, large cards
20px   — modal, auth card
9999px — pills, badges, toggles
```

### Shadows
```
card:      0 0 0 1px #2A2A40, 0 4px 24px rgba(0,0,0,.40)
glow:      0 0 40px rgba(99,102,241,.18)
elevated:  0 8px 32px rgba(0,0,0,.50)
btn:       0 4px 12px rgba(99,102,241,.25)
btn-hover: 0 6px 20px rgba(99,102,241,.35)
```

### Typography Rules
```
Headings:  font-weight: 700, letter-spacing: -0.02em, line-height: 1.1–1.2
Body:      font-weight: 400, line-height: 1.6
Labels:    font-size: 12px, font-weight: 500, color: --muted
Monospace: font-family: 'JetBrains Mono'
```

### Type Scale
| Role          | Size  | Weight | Notes                        |
|---------------|-------|--------|------------------------------|
| Display       | 60px  | 700    | Hero headline                |
| Heading XL    | 42px  | 700    | Page title                   |
| Heading LG    | 28px  | 700    | Auth card heading            |
| Heading MD    | 24px  | 700    | Admin page heading           |
| Body Large    | 18px  | 400    | Hero subtitle                |
| Card Title    | 16px  | 600    | Landing card title           |
| Body Default  | 14px  | 400    | General UI copy              |
| Body Small    | 13px  | 400    | Table rows, buttons          |
| Label         | 12px  | 500    | Form labels, captions        |
| Mono Small    | 11px  | 500    | Slugs, cron strings          |
| Eyebrow       | 10px  | 700    | Uppercase, +0.1em tracking   |

### Spacing (8pt grid)
`4 8 12 16 20 24 32 40 48 64 80 96px`

---

## Button Variants

All buttons: `font-size: 13px, font-weight: 500, padding: 9px 16px, border-radius: 12px, transition: all 0.2s cubic-bezier(.22,1,.36,1)`

| Variant   | Background | Border     | Text   | Hover                                    |
|-----------|------------|------------|--------|------------------------------------------|
| Primary   | #6366F1    | transparent| #fff   | translateY(-2px) + box-shadow btn-hover  |
| Secondary | #161626    | #2A2A40    | #EDEDE5| border-color rgba(99,102,241,.6) + lift  |
| Ghost     | transparent| transparent| #EDEDE5/80% | bg rgba(22,22,38,.6)              |
| Danger    | #DC2626    | transparent| #fff   | brightness(0.9) + translateY(-1px)       |

Sizes: `sm (12px, 6/12px pad)` · `default` · `lg (15px, 11/24px pad, 44px tall)` · `xl (15px, 13/28px pad, 48px tall)`

---

## Input / Form Fields

```
background:    #161626
border:        1px solid #2A2A40
border-radius: 12px
padding:       9px 12px
font-size:     14px
color:         #EDEDE5
placeholder:   #9494AA

Focus:   border-color #6366F1, box-shadow 0 0 0 3px rgba(99,102,241,.15)
Error:   border-color #DC2626, box-shadow 0 0 0 3px rgba(220,38,38,.15)
Success: border-color #059669, box-shadow 0 0 0 3px rgba(5,150,105,.12)
Label:   font-size 12px, font-weight 500, color #9494AA, margin-bottom 6px
```

---

## Screens / Views

---

### 1. Home (`/`)

**Purpose:** Marketing landing page showing the hero, generate form, and a gallery of generated pages.

**Layout:**
- Sticky top nav, 64px tall, `rgba(8,8,20,.85)` + `backdrop-filter: blur(16px)`, `border-bottom: 1px solid #2A2A40`
- Max content width: 1152px, centered, 24px side padding
- Hero section: `padding-top: 112px, padding-bottom: 80px`
- Radial glow layer behind hero: `radial-gradient(ellipse at 50% 0%, rgba(99,102,241,.18) 0%, transparent 65%)`

**Nav:**
- Left: Lightning bolt icon (Lucide `Zap`, #6366F1, 18px) + wordmark ("Landing" in #EDEDE5, "Forge" in #6366F1, 16px bold)
- Center: "Gallery" "Docs" "Pricing" links — 14px, #9494AA, hover #EDEDE5, 6px/12px padding, border-radius 8px
- Right (logged out): Ghost "Sign in" + Primary "Get started" → link to `/register`
- Right (logged in): Primary "New page" button → `/admin/generate` + 32px avatar circle (initials, indigo bg) + chevron dropdown
- Dropdown items: My Pages | Admin | Settings | Sign out
- Mobile: hamburger collapses nav into full-screen drawer

**Hero:**
- Eyebrow pill: indigo bg/10, indigo border/25, `font-size: 10px, uppercase, letter-spacing: 0.1em, padding: 6px 16px, border-radius: 9999px`
  - Text: "AI-Powered · Daily Updates"
- Headline (clamp 40–60px, weight 700, letter-spacing -0.02em):
  - Line 1: gradient text (`linear-gradient(120deg, #EDEDE5, #6366F1)`, `-webkit-background-clip: text`)  — "Many landings."
  - Line 2: plain white — "One project."
- Subtitle: 18px, #9494AA, max-width 560px, margin-top 24px
  - "Generate premium, config-driven landing pages in seconds. Each page gets its own theme, sections, and animations — automatically."
- CTA row (margin-top 40px, gap 12px):
  - Primary LG: "Generate a page" → `/admin/generate`
  - Secondary LG: "Browse gallery" → `#gallery` anchor
- Note below CTAs (12px, #9494AA): "✦  New page generated daily from trending news"

**Generate Form (below hero, max-width 520px):**
- Glass card: `rgba(22,22,38,.6)`, backdrop-blur(12px), border #2A2A40, border-radius 12px, padding 20px
- Large input (48px tall): placeholder "e.g. AI code editor, crypto wallet, fitness tracker"
- Trending row: "Trending:" label (11px, #9494AA) + 3 pill buttons → clicking prefills input
  - Pills: "Rust async", "edge computing", "sleep tracker"
- "Generate →" Primary Full-width button (height 48px)
- **Logged-out state:** semi-transparent overlay on card + lock icon + "Sign in to generate pages" + Sign in link

**Filter Bar (id="gallery", margin-top 64px):**
- Left: "All landings · {count}" — 11px, uppercase, letter-spacing .08em, #9494AA
- Right: pill group — All | SaaS | Developer | Community | Product | News
- Active pill: #6366F1 bg + white text + `box-shadow: 0 0 14px rgba(99,102,241,.3)`

**Landing Grid (3-col desktop, 2-col tablet ≤900px, 1-col mobile ≤600px, gap 24px):**

Each card:
- `background: rgba(22,22,38,.6)`, backdrop-blur(12px), border `#2A2A40`, border-radius 16px
- Hover: `translateY(-4px)`, border-color `rgba(99,102,241,.5)`, glow shadow
- **Swatch area** (height 180px): gradient background, category badge (top-left, colored pill), "Open ↗" button (top-right, appears on hover, `rgba(0,0,0,.5)` bg)
- **Body (padding 16px):**
  - Slug: JetBrains Mono, 11px, #primary
  - Title: 16px, 600 weight, 2-line clamp
  - Description: 13px, #9494AA, 2-line clamp, margin-top 6px
  - Footer (border-top #2A2A40, padding-top 12px, flex space-between):
    - Left: section tags (10px, #9494AA, subtle bg pills)
    - Right: Trash icon button (admin only) — #9494AA default, #DC2626 hover

**Footer:**
- Border-top #2A2A40, padding 48px 24px
- Wordmark (left) + tagline + "Auto-generates daily from trending headlines."
- Links (right): GitHub · Docs · Status — 13px, #9494AA, hover #EDEDE5

**Toast Notifications (position: fixed, top 20px, right 20px):**
- Success: `border-left: 3px solid #059669`
- Error: `border-left: 3px solid #DC2626`
- Auto-dismiss 3s + manual X close
- Animation: `translateX(20px) → 0, opacity 0 → 1, duration 300ms`

---

### 2. Login (`/login`)

**Purpose:** Email + password authentication.

**Layout:**
- Full-viewport-height flex center
- Background: #080814 with dot grid (`radial-gradient(rgba(42,42,64,.8) 1px, transparent 1px), 28px 28px`) + central indigo glow/6%
- Card: max-width 480px, `rgba(22,22,38,.7)`, backdrop-blur(16px), border #2A2A40, border-radius 20px, padding 40px
- Card entrance: `opacity 0 + translateY(12px) + scale(.98) → 1 + 0 + 1, 300ms cubic-bezier(.22,1,.36,1)`

**Card content (top → bottom):**
1. LandingForge logo (zap icon + wordmark, centered, font-size 18px)
2. Heading: "Welcome back" — 28px, 700, centered, margin-top 28px
3. Sub: "Sign in to generate and manage landing pages." — 14px, #9494AA, centered
4. Form (margin-top 32px, gap 16px):
   - Email field (label "Email address", type=email, autocomplete=email)
   - Password field (label "Password", type=password, show/hide eye icon button right-aligned inside input)
   - "Forgot password?" — right-aligned, 12px, #6366F1
   - "Sign in" Primary Full-width button (height 44px, font-size 14px)
5. Divider: `── or continue with ──`
6. Google OAuth button: Secondary Full-width (height 42px), Google SVG logo + "Continue with Google"
7. Footer: "Don't have an account? Sign up →" (link → `/register`)

**States:**
- **Error:** Red border + ring on field + error message below (12px, #DC2626, with circle-i icon)
- **Loading:** Button shows spinner + "Signing in…", all fields disabled

---

### 3. Register (`/register`)

**Purpose:** New account creation.

**Layout:** Same glass card layout as Login.

**Card content:**
1. Logo + "Create your account" heading + "Start generating premium landing pages." sub
2. Form (gap 14px):
   - Full name (inline check ✓ / ✗ icon appears in input on right once user types)
   - Email (same inline validation)
   - Password + show/hide toggle + **4-segment strength meter bar** below:
     - 1 filled = Weak (#DC2626)
     - 2 filled = Fair (#D97706)
     - 3 filled = Good (#6366F1)
     - 4 filled = Strong (#059669)
     - Segments: height 3px, gap 4px, border-radius 2px
   - Confirm password (inline match validation)
   - Checkbox: "I agree to the Terms of Service and Privacy Policy"
   - "Create account" Primary Full-width button (44px)
3. Divider + Google button
4. Footer: "Already have an account? Sign in →"

**Inline validation rules:**
- Name: ≥2 characters
- Email: must contain @ and TLD
- Password: ≥8 chars (strength updates live)
- Confirm: must match password
- ToS: must be checked on submit

---

### 4. Admin Layout (shared shell)

**Purpose:** Shell wrapping all `/admin/*` pages.

**Layout:** `display: flex`, 100vh min-height.

**Sidebar (position: fixed, width: 220px, height: 100vh):**
- `background: #161626`, `border-right: 1px solid #2A2A40`
- Header (padding 20px 16px 16px, border-bottom): wordmark (small) + "Admin" indigo pill badge
- Nav items (height 40px, border-radius 12px, font-size 13px, padding 0 12px):
  - Icon (15px, Lucide) + label
  - Default: color #9494AA
  - Hover: `background: rgba(99,102,241,.06)`, color #EDEDE5
  - Active: `background: rgba(99,102,241,.10)`, color #6366F1, icon color #6366F1
  - Items: Dashboard (`LayoutGrid`) | Generate (`Layers`) | All Pages (`FileText`) | Schedule (`Calendar`) | Settings (`Settings`)
- Footer (border-top, padding 12px 16px): 32px avatar + name (13px) + "admin" badge + sign-out icon button

**Topbar (height 64px, sticky, `rgba(8,8,20,.85)` + blur):**
- Left: breadcrumb "Admin / {Page Name}" (13px, #9494AA / #EDEDE5)
- Right: contextual action buttons + notification bell icon

**Main content area:**
- `margin-left: 220px` (removed on mobile)
- Content padding: 32px

**Mobile (≤768px):**
- Sidebar: `position: fixed, transform: translateX(-100%)`, slides in on hamburger tap
- Dark overlay behind open sidebar: `rgba(0,0,0,.6)`, closes on tap
- Main: `margin-left: 0`

---

### 5. Admin — Generate (`/admin/generate`)

**Purpose:** Generate a new landing page from a keyword.

**Layout:** Two-column grid (60fr / 40fr, gap 24px). Collapses to single column ≤1000px.

**Left card — Form:**
- Heading: "Generate Landing Page" (16px, 600)
- Keyword input (LG, full width): label "Keyword or topic", placeholder "e.g. quantum computing…"
- Trending row: "Trending now:" label + 4 pill buttons (prefill on click): "quantum computing" | "AI agents" | "WASM edge" | "LLM fine-tuning"
- **Advanced options collapsible** (chevron rotates 180° open):
  - Template style select: Auto-detect | SaaS | Developer | Community | Product
  - Color mode select: Auto | Dark | Light
  - Toggle row: "Use AI generation" (ON = Claude, OFF = deterministic)
- "Generate →" Primary Full-width button (height 48px, font-size 15px, margin-top 24px)
- **3-step progress list** (visible during generation):
  1. "Fetching trending topics" — starts pre-done
  2. "Generating with Claude…" — active (spinner) then done
  3. "Saving to store" — pending then active then done
  - Done step: green dot `rgba(5,150,105,.12)` bg + check icon
  - Active step: indigo dot `rgba(99,102,241,.10)` bg + spinner
  - Pending step: dark `rgba(42,42,64,.8)` + dim circle

**Right card — Preview (sticky top 96px):**
- Header: "Preview" (14px, 600) + "Open page ↗" ghost button (right, shown post-generation)
- **Placeholder state:** gradient bg + Sparkles/Layers icon (40px, #2A2A40) + "Your page will preview here" (13px, #9494AA)
- **Loading state:** skeleton shimmer — gradient `rgba(22,22,38,1) → rgba(40,40,70,.5) → rgba(22,22,38,1)`, animated 1.4s
- **Success state:**
  - 440px tall mock preview of the generated page
  - Footer below: slug in JetBrains Mono (11px, #6366F1) + "Copy" button + "Visit page" primary button

---

### 6. Admin — All Pages (`/admin/pages`)

**Purpose:** View, filter, search, and manage all generated pages.

**Layout:** Full-width admin content area.

**Heading row (flex, space-between):**
- "All Pages" h1 + grey pill badge with count
- Search input (width 240px, font-size 13px)

**Filter row:**
- Status pills: All | Published | Draft
- Separator line (1px, #2A2A40)
- Source pills: All | AI Generated | Manual | Daily Cron
- "Bulk delete" Danger Ghost button (far right, enabled only when rows selected)

**Bulk action bar** (shown when ≥1 rows selected, animates slide-down):
- `background: rgba(220,38,38,.08)`, `border: 1px solid rgba(220,38,38,.2)`, border-radius 12px
- "{N} rows selected" + "Delete selected" danger button

**Table:**
- Container: border #2A2A40, border-radius 12px, overflow hidden, shadow-card
- `<thead>`: `rgba(8,8,20,.5)` bg, 11px uppercase headers, border-bottom #2A2A40
- Columns: ☐ | Slug (JetBrains Mono, 11px, #6366F1) | Title (500, max-width 260px, truncate) | Source | Status | Created | Actions
- Row hover: `rgba(26,26,48,.8)`
- Selected row: `rgba(99,102,241,.06)`
- Status badge: "published" = green pill, "draft" = yellow pill
- Source badge: "cron" = indigo, "ai" = purple, "manual" = muted grey
- Actions: Eye icon (preview) + Trash icon (delete, red on hover)

**Empty state (full-card, centered):**
- Layers icon (48px, #2A2A40)
- "No pages yet" (15px, 600)
- "Generate your first landing page →" (#6366F1 link)

**Pagination:**
- `← Previous  Page 1 of 4  Next →`
- Buttons: border #2A2A40, 12px, border-radius 8px, hover border rgba(99,102,241,.5)

**Mobile (≤768px):** Hide Source and Created columns; table rows become stacked cards.

---

### 7. Admin — Schedule (`/admin/schedule`)

**Purpose:** Configure cron schedule, trigger manual generation, manage permissions.

**Layout:** Single column, max-width 680px, 3 stacked cards.

**Card 1 — Cron Configuration:**
- Title: "Cron Expression" (14px, 600)
- Input: JetBrains Mono, LG size, value e.g. "0 0 * * *"
- Help row (13px, #9494AA): Clock icon + human-readable description of cron
- "Show presets ▾" toggle button (13px, #6366F1, chevron rotates on open)
- Presets panel (animated expand, `rgba(99,102,241,.04)` bg, `border: 1px solid rgba(99,102,241,.1)`, border-radius 10px):
  - Pills: "Daily midnight" | "Every 6h" | "Every hour" | "Weekdays 9am"
  - Clicking prefills input
- Footer: "Reset to default" ghost + "Save changes" primary (right-aligned)

**Card 2 — Manual Trigger:**
- `padding: 0; overflow: hidden`
- Inner row: [Play circle icon] "Run generation now" (14px, 600) left + "Run now →" primary button right
- Sub text: "Pulls the top Hacker News story and generates a fresh landing page immediately."
- Last run info (13px, #9494AA): "Last run: {date} · Generated: {slug}"
- **3-step progress list** (same design as Generate page, shown while running)
- **Running state:** 3px indigo progress bar animating at card bottom (borderless, flush with card)

**Card 3 — Permissions:**
- Title: "Who can generate pages?"
- Toggle rows (border-bottom #2A2A40 between, none on last):
  - "Require login to generate" — ON default — sub: "When enabled, only authenticated users can use the generate form."
  - "Require email verification" — OFF default — sub: "New accounts must verify their email before generating."
- "Save" Primary button (right-aligned)

---

## Interactions & Behavior

### Transitions
- **Page load:** `opacity 0 → 1 + translateY(6px → 0), 250ms ease-out`
- **Card hover:** `translateY(-4px), box-shadow intensifies, 200ms ease`
- **Button hover:** `translateY(-2px), 200ms cubic-bezier(.22,1,.36,1)`
- **Filter pill switch:** 150ms crossfade between active states
- **Dropdown open:** `opacity 0 + scale(.96) + translateY(-4px) → in, 150ms ease`
- **Form field focus ring:** `box-shadow 0 → 3px, 150ms`
- **Sidebar drawer (mobile):** `translateX(-100%) → 0, 250ms ease`
- **Bulk bar:** `opacity 0 + translateY(-6px) → in, 200ms ease`

### Generate Flow (Home + Admin/Generate)
1. User types keyword, clicks "Generate →"
2. Button: `spinner + "Generating…"`, input disabled
3. Show step list (3 steps)
4. Step 1 pre-done → step 2 active (spinner) → step 2 done → step 3 active → step 3 done
5. Show success preview, re-enable button + input
6. Fire success toast: "✓ Page generated: /l/{slug} ↗"
- Total duration: ~3.5 seconds

### Cron Run Now Flow
1. Button: spinner + "Generating…" (topbar button mirrors state)
2. Progress steps animate as above
3. 3px animated indigo progress bar appears at bottom of card
4. On complete: update last-run text, hide progress, fire success toast

### Form Validation (Login)
- On submit: check email format + password not empty
- Show red border + ring + error message below each invalid field
- Loading state: spinner in button, all fields disabled
- On success: navigate to Home

### Form Validation (Register)
- Real-time as user types (oninput):
  - Name: show ✓ (green) if ≥2 chars, ✗ (red) if typed but invalid
  - Email: ✓ if valid format
  - Password: update strength meter live
  - Confirm: ✓ if matches password
- On submit: validate all, show error messages for any failures
- ToS must be checked; if not: show error message below checkbox

### Password Strength Meter
4 segments, each 1px tall, gap 4px, border-radius 2px:
- 1 segment = weak = #DC2626
- 2 segments = fair = #D97706
- 3 segments = good = #6366F1
- 4 segments = strong = #059669
Score logic: +1 for ≥8 chars, +1 for uppercase, +1 for digit, +1 for special char

### Toast System
- Stack position: `fixed, top 20px, right 20px, flex-direction: column, gap 8px, z-index: 300`
- Enter animation: `translateX(20px) + opacity 0 → 0 + opacity 1, 300ms cubic-bezier(.22,1,.36,1)`
- Auto-dismiss: 3500ms
- Manual dismiss: X button
- Success variant: `border-left: 3px solid #059669`
- Error variant: `border-left: 3px solid #DC2626`
- Min-width: 300px, max-width: 380px

### Table Interactions (Admin/Pages)
- Checkbox per row + select-all header checkbox
- Selecting rows: row gets `rgba(99,102,241,.06)` bg, bulk bar slides in
- Row delete: row fades to 0.3 opacity then removes
- Bulk delete: all selected rows remove, success toast fires
- Search: live filter by slug + title
- Filter pills: update displayed rows by status / source

---

## State Management

### Auth State (Home page)
```
loggedIn: boolean
- true:  show "New page" button + avatar dropdown
- false: show "Sign in" + "Get started"
- true:  generate form active
- false: generate form locked (overlay + "Sign in" CTA)
```

### Admin Generate
```
generating: boolean
keyword: string
currentStep: 0 | 1 | 2
previewState: 'empty' | 'loading' | 'success'
generatedSlug: string | null
advancedOpen: boolean
```

### Admin Pages Table
```
pages: Page[]
selectedIds: Set<string>
searchQuery: string
statusFilter: 'all' | 'published' | 'draft'
sourceFilter: 'all' | 'ai' | 'manual' | 'cron'
currentPage: number
```

### Admin Schedule
```
cronValue: string        // e.g. "0 0 * * *"
presetsOpen: boolean
running: boolean
currentStep: 0 | 1 | 2
requireLogin: boolean    // default: true
requireEmailVerification: boolean  // default: false
```

---

## Data Models

```typescript
type Page = {
  slug: string          // e.g. "/l/2026-06-08-quantum-edge-labs"
  title: string
  description: string
  source: 'cron' | 'ai' | 'manual'
  status: 'published' | 'draft'
  category: 'saas' | 'developer' | 'community' | 'product' | 'news'
  swatchGradient: string  // CSS gradient for card swatch
  sections: string[]      // e.g. ["hero", "features", "stats"]
  createdAt: string
}
```

---

## API / Data Fetching Notes

The prototype uses mock data. In production:
- `GET /api/pages` — paginated list of generated pages
- `POST /api/generate` — trigger AI page generation (streams progress)
- `GET /api/schedule` — get current cron config
- `PUT /api/schedule` — update cron expression
- `POST /api/schedule/run` — trigger manual generation run
- `DELETE /api/pages/:slug` — delete a page
- `GET /api/trending` — fetch HN top stories for pill suggestions

---

## Assets & Icons

**Icons:** All icons are inline SVG from Lucide icon set. Use `lucide-react` in your implementation.

Key icons used:
| Name | Lucide component | Usage |
|---|---|---|
| Zap | `<Zap>` | Wordmark lightning bolt |
| Layers / Sparkles | `<Layers>` | Generate nav item, empty state |
| FileText | `<FileText>` | All Pages nav item |
| Calendar | `<Calendar>` | Schedule nav item |
| Settings | `<Settings>` | Settings nav item |
| LayoutGrid | `<LayoutGrid>` | Dashboard nav item |
| Trash2 | `<Trash2>` | Delete row action |
| Eye | `<Eye>` / `<EyeOff>` | Preview action + password toggle |
| Play | `<Play>` | Run now button |
| Bell | `<Bell>` | Notification icon in topbar |
| Check | `<Check>` | Step done, inline validation |
| X | `<X>` | Inline validation error, toast dismiss |
| LogOut | `<LogOut>` | Sign out |
| ChevronDown | `<ChevronDown>` | Dropdown, collapsibles |
| Copy | `<Copy>` | Slug copy button |
| Clock | `<Clock>` | Cron help row |
| ExternalLink | `<ExternalLink>` | Open page link |

---

## Files in This Package

| File | Description |
|---|---|
| `index.html` | Design index hub — overview of all screens |
| `Home.html` | Home page prototype |
| `Login.html` | Login page prototype |
| `Register.html` | Register page prototype |
| `Admin - Generate.html` | Admin generate page prototype |
| `Admin - Pages.html` | Admin all pages prototype |
| `Admin - Schedule.html` | Admin schedule prototype |
| `Component Sheet.html` | All components in all states |
| `Token Sheet.html` | Color, type, spacing, shadow reference |
| `forge.css` | Shared CSS design tokens and component styles |

Open `index.html` in a browser to navigate all screens.

---

## Implementation Notes

1. **Start with `forge.css`** — all token values are defined there. Map them to Tailwind config or CSS variables in your project.
2. **Shared admin shell** — build `AdminLayout` as a wrapper component first; all 3 admin screens share it.
3. **Glass effects** — `backdrop-filter: blur(12px)` needs a non-transparent parent to show correctly.
4. **Glow layer** — place as `position: absolute, top: 0, pointer-events: none, z-index: 0` behind hero content.
5. **Sticky nav** — use `position: sticky, top: 0, z-index: 100` with the glass treatment.
6. **Mobile sidebar** — sidebar should slide in as a drawer with an overlay on mobile; remove `margin-left` from main content.
7. **Monospace font** — `JetBrains Mono` must be loaded for slugs and cron inputs; fall back to `monospace`.
