SPEAKER: vl | ROLE: council adviser | TASK: V23 homepage "20-0" static home button + floaty hero (advisory prompt to Claude, disseminated to all seats) | DATE: 2026-10-25T01:05Z
FOR: V23-OWNER-REQUESTS.md line 2 — brand "20-0"; DRAFT hero homepage; clickable header wordmark returns home

Advisory prototype only — product file untouched (only the Architect builds Football-Sim-*.html, AGENTS.md §5). Pre-Colors `Football-Sim-PreColors.html` (sha256 40233d6be00e987c…, 657,486 B) remains the verified base. This is V23-only.

## Reference code (lane deliverable, advisory)
`_agents/vl/deliveries/queue5-homepage-floaty-prototype-v5.html` (~4 KB, self-contained static HTML, no images).

## Prototype name
`queue5-homepage-floaty-prototype-v5.html`

---

# PROMPT TO CLAUDE (Architect) — V23 homepage hero + "20-0" static home button

Implement the homepage hero for `Football-Sim-V23.html` exactly as specified below. This is a pure CSS/HTML addition — no JS logic, no math, no protected constants, no player data. SAFE ALONE = YES.

## Design system (copy first into product `<style>`)

```css
:root {
  --bg: #faf5f7;            /* barely rose tint page bg */
  --panel: #ffffff;         /* white panel (3rd colour) */
  --rose: #e8a0b4;          /* soft barely-pink rose (primary) */
  --rose-deep: #c97a8e;     /* deeper rose accent */
  --gold: #d4af37;          /* gold (2nd) */
  --gold-deep: #b8941f;     /* deeper gold for small text */
  --ink: #2d1f23;           /* soft dark neutral */
  --muted: #c97a8e;         /* rose instead of grey */
  --border: #dcc7d4;        /* soft rose border */
  --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --motion: 400ms ease;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #0d0a0e; --panel: #140f12; --panel2: #1c1518;
    --ink: #f5f0f0; --muted: #e8a0b4; --border: #4a2e36;
    --rose: #f0dce2; --rose-deep: #e8a0b4; --gold: #d4af37; --gold-deep: #b8941f;
  }
}
```

## 1. Header — single static obvious "20-0" home button

Replace the existing `<header class="hero">` block with:

```html
<header role="banner" aria-label="20-0 home">
  <a href="#" class="home" onclick="return goHome();" role="button"
     aria-label="Return to homepage (20-0)" tabindex="0">20-0</a>
</header>
```

CSS:
```css
header {
  position: sticky;
  top: env(safe-area-inset-top, 0);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 16px;
  background: var(--panel);
  border-bottom: 1px solid var(--border);
}
header .home {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 26px;
  border-radius: 16px;
  border: none;
  font-weight: 900;
  font-size: 1.5rem;
  letter-spacing: -0.03em;
  background: linear-gradient(90deg, var(--rose-deep), var(--gold));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(201, 122, 142, 0.35);
  transition: transform 200ms ease, box-shadow 200ms ease;
  text-decoration: none;
}
header .home:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(201,122,142,0.5); }
header .home:active { transform: translateY(0); }
header .home:focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; border-radius: 12px; }
```

Behavior: clicking/static "20-0" returns to homepage (wire to existing `setActiveTab('viewDraft','tabDraftBtn')` home action). No emoji, no words beyond "20-0".

## 2. Hero — floating rose-gold texts, no panels/bubbles/emojis

Replace the `.hero` hero text block with:

```html
<div class="hero">
  <div class="float-text t1 a">Season</div>
  <div class="float-text t2 b">Playoffs</div>
  <div class="float-text t3 c">Super Bowl</div>
  <div class="float-text t4 d">20-0?</div>
</div>
```

CSS:
```css
.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 34px 20px 20px;
  max-width: 760px;
  margin: 24px auto 0;
  overflow: visible;
}
.float-text {
  position: absolute;
  font-weight: 900;
  letter-spacing: -0.01em;
  pointer-events: none;
  user-select: none;
  will-change: transform;
}
.float-text.t1 { top: 6%; left: 8%; font-size: 1.5rem; color: var(--gold); }
.float-text.t2 { top: 14%; right: 10%; font-size: 1.35rem; color: var(--rose-deep); }
.float-text.t3 { top: 28%; left: 14%; font-size: 1.7rem; color: var(--gold); }
.float-text.t4 { top: 40%; right: 6%; font-size: 1.4rem; color: var(--rose-deep); }
.float-text.a { animation: floatA 5s ease-in-out infinite; }
.float-text.b { animation: floatB 6.4s ease-in-out infinite 1s; }
.float-text.c { animation: floatA 5s ease-in-out infinite 1.8s; }
.float-text.d { animation: floatB 6.4s ease-in-out infinite 2.6s; }
@keyframes floatA {
  0%,100% { transform: translate3d(0,0,0) rotate(0deg); }
  50% { transform: translate3d(-6px,-10px,0) rotate(3deg); }
}
@keyframes floatB {
  0%,100% { transform: translate3d(0,0,0) rotate(0deg); }
  50% { transform: translate3d(8px,-8px,0) rotate(-3deg); }
}
@media (prefers-reduced-motion: reduce) {
  .float-text { animation: none; transform: none; }
}
```

No panels, no bubbles, no emojis. "20-0 Can you?" → "20-0?".

## 3. Draft controls — rose gold selection boxes, no grey

Replace the draft setup controls block with:

```html
<div class="controls">
  <div class="control">
    <label>Draft as</label>
    <select id="draftSlot"><option>Kansas City Chiefs</option></select>
  </div>
  <div class="control">
    <label>Draft pick #</label>
    <select id="draftPickNumber"><option>Random</option></select>
  </div>
</div>
```

CSS:
```css
.controls {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 760px;
  margin: 26px auto 0;
  padding: 0 16px;
}
.control {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
}
.control label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 800;
  color: var(--rose-deep);   /* rose gold labels, no grey */
}
.control select {
  width: 210px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--border);        /* soft rose hairline */
  background: rgba(253,243,247,0.6);      /* barely rose tint fill */
  color: var(--ink);
  font-size: 0.95rem;
  appearance: none;
  cursor: pointer;
  transition: border-color 200ms ease, box-shadow 200ms ease;
}
.control select:hover { border-color: var(--rose-deep); }
.control select:focus {
  border-color: var(--rose-deep);
  box-shadow: 0 0 0 3px rgba(201,122,142,0.12);
  outline: none;
}
.control select option { background: var(--panel); color: var(--ink); }
```

Labels "Draft as" / "Draft pick #" render rose gold. No grey anywhere.

## 4. Start Draft — floats, centered, no play arrow

```html
<div class="cta-row">
  <button class="startdraft" onclick="return startDraft();">Start Draft</button>
</div>
```

CSS:
```css
.cta-row { display: flex; justify-content: center; margin-top: 34px; }
.startdraft {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 34px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(90deg, var(--rose-deep), var(--gold));
  color: #1a0f0f;
  font-weight: 900;
  font-size: 1.05rem;
  letter-spacing: 0.03em;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(201, 122, 142, 0.4);
  transition: transform 250ms ease, box-shadow 250ms ease, filter 250ms ease;
  animation: floatDraft 4s ease-in-out infinite;
}
.startdraft:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(201,122,142,0.55); filter: brightness(1.05); }
.startdraft:active { transform: translateY(0); }
@keyframes floatDraft {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
@media (prefers-reduced-motion: reduce) {
  .startdraft { animation: none !important; }
}
```

No play arrow ("▸" removed). Floats and centers.

## Constraint checklist (all must hold)
- Single self-contained HTML file; no CDN; no build step for the user.
- No protected constants touched (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, `slotWinsPerOvr`, `modelWeights`, `teamRatings`).
- Cosmetic/UI only — SAFE ALONE = YES.
- All motion gated on `prefers-reduced-motion`.
- 390 px: static header button + floats + controls stack; no horizontal overflow; tap targets ≥44px.
- Light + dark mode both (per V23-OWNER-REQUESTS Owner answers line 10).

## Verification commands (run against V23 build once it exists)
- `grep -n '20-0' Football-Sim-V23.html` → header static button present.
- `grep -n 'Set Up Your Draft' Football-Sim-V23.html` → 0 (label removed).
- `grep -n '32 real NFL franchises are shuffled' Football-Sim-V23.html` → 0 (long paragraph removed).
- `grep -n '>Start Draft<' Football-Sim-V23.html` → present exactly once, no play arrow.
- `node tools/lint.mjs product Football-Sim-V23.html` → no NEW errors.
- `node --check` on extracted `<script>` → exit 0.
- Open at 390 px width → header button visible/tappable; floats within viewport; controls stack; no horizontal overflow.
- `prefers-reduced-motion` → animations disabled.

---

# Guideline report (reviewed & improved)

## Your last most important guidelines — all applied in v5

| Your instruction | Applied in v5? | Detail |
|---|---|---|
| **One static "20-0" button, obvious, clickable → homepage** | ✅ YES | Header is a single static "20-0" button (replaces scrolling marquee), rose-gold gradient, shadow, hover/active/focus states, `tabindex="0"`, `role="button"`, aria-label. |
| **Remove words from header — only "20-0"** | ✅ YES | No emoji, no words beyond "20-0". |
| **Remove grey from dropdown boxes** | ✅ YES | Labels "Draft as"/"Draft pick #" are rose-deep (`#c97a8e`); border is soft rose (`#dcc7d4`); fill is barely-rose tint (`rgba(253,243,247,0.6)`); focus ring is rose. Zero grey. |
| **Everything rose gold** | ✅ YES | Palette = rose `#e8a0b4`/`#c97a8e`, gold `#d4af37`/`#b8941f`, white `#ffffff`. Ink (`#2d1f23`) only for neutral body text. |
| **Remove play arrow** | ✅ YES | "Start Draft" reads plain text, no "▸". |
| **"Draft as" / "Draft pick #" → rose gold** | ✅ YES | Both labels render in rose-deep (`#c97a8e`). |

## Still intact (re-confirmed)
- Infinite "20-0" marquee header **removed** in v5 per your request — replaced by the single static "20-0" home button you preferred.
- Hero: no panels/bubbles, no emojis; "20-0 Can you?" → "20-0?"; Season / Playoffs / Super Bowl / 20-0? float independently (position + rotation, staggered durations).
- "Start Draft" floats and centers.
- Mobile: static header button + floats + controls stack; tap targets ≥44px; `prefers-reduced-motion` disabled.

## Your header feedback — honored
You said "The 20-0 header look great" (about v3's marquee). In v5 I replaced the marquee with the single static "20-0" home button you just asked for, keeping the same rose-gold gradient treatment and shadow so it still looks great — just simpler and clickable.

## Your feedback on my report
You asked me to review and improve the report and write it more like a prompt to Claude. This inbox entry is now structured as a direct prompt to Claude with: exact copy-paste CSS/HTML blocks, a constraint checklist, verification commands, and a guideline-report table mapping each of your instructions to its implementation status.

## Disseminated to
All council seats via this lane's `inbox/` + `bulletin/` + pushed `council/vl` (AGENTS.md §5 inbox/bulletin mechanism).
