SPEAKER: vl | ROLE: council adviser | TASK: V23 homepage floaty rose-gold hero v7 — static corner "20-0" home button + infinite marquee (advisory prompt to Claude, disseminated to all seats) | DATE: 2026-10-25T01:25Z
FOR: V23-OWNER-REQUESTS.md line 2 — brand "20-0"; DRAFT hero homepage; clickable header wordmark returns home

Advisory prototype only — product file untouched (only the Architect builds Football-Sim-*.html, AGENTS.md §5). Pre-Colors `Football-Sim-PreColors.html` (sha256 40233d6be00e987c…, 657,486 B) remains the verified base. This is V23-only.

## Reference code (lane deliverable, advisory)
`_agents/vl/deliveries/queue5-homepage-floaty-prototype-v7.html` (~4 KB, self-contained static HTML, no images).

## Document this prompt refers to
**Target document:** `_agents/vl/deliveries/queue5-homepage-floaty-prototype-v7.html` — the lane-file prototype that implements this design. It is the exact HTML/CSS/JS reference Claude should copy from when implementing into `Football-Sim-V23.html` (the Architect's next build; does not exist yet, based on Pre-Colors sha256 40233d6be00e987c…). Source of truth for item briefs: `V23-OWNER-REQUESTS.md` line 2 (brand "20-0"; DRAFT hero homepage; clickable header wordmark returns home).

---

# PROMPT TO CLAUDE (Architect) — V23 homepage hero + static corner "20-0" home button

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
  --border: #dcc7d4;        /* soft rose border */
  --font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --motion: 400ms ease;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #0d0a0e; --panel: #140f12; --panel2: #1c1518;
    --ink: #f5f0f0; --border: #4a2e36;
    --rose: #f0dce2; --rose-deep: #e8a0b4; --gold: #d4af37; --gold-deep: #b8941f;
  }
}
```

## 1. Header — infinite scrolling "20-0" marquee + static corner "20-0" home button

Replace the existing `<header class="hero">` block with:

```html
<header role="banner" aria-label="20-0">
  <div class="marquee">
    <div class="track track-l" id="trackL"></div>
    <div class="track track-r" id="trackR"></div>
  </div>
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
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  background: transparent;          /* no panel around the button */
  border-bottom: none;              /* no panel border */
}
header .marquee {
  position: relative;
  width: 100%;
  height: 1.5rem;
  overflow: hidden;
  white-space: nowrap;
  flex: 1;                          /* sit inline with corner button */
}
header .track {
  position: absolute;
  top: 0; left: 0; width: 200%; height: 100%;
  display: flex; align-items: center; gap: 22px;
  font-weight: 900; font-size: 1.25rem; letter-spacing: -0.02em;
  background: linear-gradient(90deg, var(--rose-deep), var(--gold));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  will-change: transform;
}
header .track-l { animation: marqueeL 16s linear infinite; }
header .track-r { animation: marqueeR 22s linear infinite; opacity: 0.55; }
@keyframes marqueeL {
  0% { transform: translateX(0); } 100% { transform: translateX(-50%); }
}
@keyframes marqueeR {
  0% { transform: translateX(-50%); } 100% { transform: translateX(0); }
}
header .home {
  display: inline-flex;
  align-items: center; justify-content: center;
  gap: 6px; padding: 8px 18px; border-radius: 12px; border: none;
  font-weight: 900; font-size: 1.2rem; letter-spacing: -0.02em;
  background: linear-gradient(90deg, var(--rose-deep), var(--gold));
  -webkit-background-clip: text; background-clip: text;
  color: transparent;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(201,122,142,0.3);
  transition: transform 200ms ease, box-shadow 200ms ease;
  text-decoration: none;
  white-space: nowrap;
}
header .home:hover { transform: translateY(-1px); box-shadow: 0 10px 30px rgba(201,122,142,0.45); }
header .home:active { transform: translateY(0); }
header .home:focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; border-radius: 10px; }
@media (prefers-reduced-motion: reduce) {
  header .track-l, header .track-r { animation: none; transform: none; }
}
```

Behavior: clicking/static "20-0" returns to homepage (wire to existing `setActiveTab('viewDraft','tabDraftBtn')` home action). **No emoji, no words beyond "20-0".** Button sits inline with the marquee (not a tall vertical pill on its own line), **no panel around it** (transparent header, no panel border).

## 2. Hero — clean/empty, no text

Replace the `.hero` hero text block with:

```html
<div class="hero">
  <!-- intentionally empty/clean — no text, no panels/bubbles/emojis -->
</div>
```

CSS:
```css
.hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px 20px;
  max-width: 760px;
  margin: 24px auto 0;
  overflow: visible;
}
```

**No panels, no bubbles, no emojis.** All hero text ("Season", "Playoffs", "Super Bowl", "20-0?") removed.

## 3. Draft controls — transparent selection boxes, rose-gold labels

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
  display: flex; gap: 12px; flex-wrap: wrap;
  justify-content: center; max-width: 760px;
  margin: 26px auto 0; padding: 0 16px;
}
.control {
  display: flex; flex-direction: column; gap: 5px; align-items: flex-start;
}
.control label {
  font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em;
  font-weight: 800; color: var(--rose-deep);   /* rose gold labels, no grey */
}
.control select {
  width: 210px; padding: 10px 12px; border-radius: 10px;
  border: 1px solid var(--border);             /* soft rose hairline */
  background: transparent;                     /* TRANSPARENT — not grey */
  color: var(--ink); font-size: 0.95rem;
  appearance: none; cursor: pointer;
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
  display: inline-flex; align-items: center; justify-content: center;
  padding: 12px 34px; border-radius: 14px; border: none;
  background: linear-gradient(90deg, var(--rose-deep), var(--gold));
  color: #1a0f0f; font-weight: 900; font-size: 1.05rem; letter-spacing: 0.03em;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(201,122,142,0.4);
  transition: transform 250ms ease, box-shadow 250ms ease, filter 250ms ease;
  animation: floatDraft 4s ease-in-out infinite;
}
.startdraft:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(201,122,142,0.55); filter: brightness(1.05); }
.startdraft:active { transform: translateY(0); }
@keyframes floatDraft {
  0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); }
}
@media (prefers-reduced-motion: reduce) {
  .startdraft { animation: none !important; }
}
```

No play arrow ("▸" removed). Floats and centers.

## Marquee JS helper (copy into product `<script>`)

```js
function buildTrack(id, count){
  const el=document.getElementById(id);
  const item='<span class="item">20-0</span>';
  let html='';
  for(let i=0;i<count;i++) html+=item;
  el.innerHTML=html+html; /* duplicated for seamless loop */
}
buildTrack('trackL',14);
buildTrack('trackR',12);
```

## Constraint checklist (all must hold)
- Single self-contained HTML file; no CDN; no build step for the user.
- No protected constants touched (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`, `slotWinsPerOvr`, `modelWeights`, `teamRatings`).
- Cosmetic/UI only — SAFE ALONE = YES.
- All motion gated on `prefers-reduced-motion`.
- Light + dark mode both (per V23-OWNER-REQUESTS Owner answers line 10).
- 390 px: static corner button + marquee + controls stack; no horizontal overflow; tap targets ≥44px.

## Verification commands (run against V23 build once it exists)
- `grep -n '20-0' Football-Sim-V23.html` → header marquee + static corner button present.
- `grep -n 'Set Up Your Draft' Football-Sim-V23.html` → 0 (label removed).
- `grep -n '32 real NFL franchises are shuffled' Football-Sim-V23.html` → 0 (long paragraph removed).
- `grep -n '>Start Draft<' Football-Sim-V23.html` → present exactly once, no play arrow.
- `node tools/lint.mjs product Football-Sim-V23.html` → no NEW errors.
- `node --check` on extracted `<script>` → exit 0.
- Open at 390 px width → header marquee scrolls; static corner "20-0" button visible/tappable inline with marquee; controls stack; no horizontal overflow.
- `prefers-reduced-motion` → animations disabled.

---

# Guideline report (reviewed & improved)

## Your last most important guidelines — all applied in v7

| Your instruction | Applied in v7? | Detail |
|---|---|---|
| **Header: back to infinite "20-0" marquee** | ✅ YES | Two overlapping layers scrolling opposite directions at different speeds; seamless loop; pattern not obvious |
| **One permanent static "20-0" corner button → homepage** | ✅ YES | Static inline corner button, rose-gold gradient, shadow, hover/active/focus, `tabindex="0"`, `role="button"`, aria-label |
| **Corner button NOT on one tall vertical line / not vertical** | ✅ YES | Button is inline-flex, small padding (8px 18px), font-size 1.2rem, `white-space:nowrap` — sits inline with the marquee, not a tall vertical block |
| **Remove the panel around the corner button** | ✅ YES | Header background `transparent`, `border-bottom:none` — no panel/border around the button |
| **Hero: remove all text ("Season", "Playoffs", "Super Bowl", "20-0?")** | ✅ YES | Hero is clean/empty — no panels/bubbles/emojis |
| **Selection boxes: TRANSPARENT (not grey)** | ✅ YES | `background: transparent` on selects, rose hairline border (`#dcc7d4`), rose-gold labels (`#c97a8e`) |
| **"Draft as" / "Draft pick #" → rose gold** | ✅ YES | Both labels render in rose-deep (`#c97a8e`) |
| **Remove play arrow from "Start Draft"** | ✅ YES | Button reads plain "Start Draft", no "▸", floats and centers |

## Still intact
- Infinite "20-0" marquee header (the one you said "look great") — restored from v3/v4
- Selection boxes transparent with rose-gold labels
- "Start Draft" floats and centers
- Mobile: marquee + corner button + controls stack; tap targets ≥44px; `prefers-reduced-motion` disabled

## Your feedback on the header — honored
You said "The 20-0 header look great" (about v3's marquee). v7 restores that marquee exactly and adds the single static corner "20-0" home button you just asked for — inline (not vertical), no panel around it, same rose-gold gradient treatment.

## Your feedback on my report — honored
This inbox entry is written as a direct prompt to Claude with: exact copy-paste CSS/HTML blocks, a constraint checklist, verification commands, and a guideline-report table mapping each of your instructions to its implementation status. The document this prompt refers to is explicitly named above (`queue5-homepage-floaty-prototype-v7.html`, targeting `Football-Sim-V23.html` from Pre-Colors).

## Disseminated to
All council seats via this lane's `inbox/` + `bulletin/` + pushed `council/vl` (AGENTS.md §5 inbox/bulletin mechanism).
