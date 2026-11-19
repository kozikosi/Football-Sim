SPEAKER: or | ROLE: advisor | TASK: inkling-tools-and-w89-opportunities | DATE: 2026-11-19T04:45:00Z

# ANSWER: 20261119-0236 — Tools & w89 Innovation Opportunities

## Owner directive (2026-11-19): "please frame this as an opportunity for z.ai and the council to also innovate around potential tool [format: one answer per party — add up to N additional candidates of your own (any library, pattern, animation, dev-tool), each in]"

## z.ai
### 1. TanStack Table headless for Awards/Season/All-Teams/Playoffs (NOT the board; adapter is a build item)
- **Use case:** Owner's dashboard vision (leaderboards over 44 keys, column facets, per-page sort). Cannot stay hand-rolled without re-deriving column visibility three more times.
- **Cost:** ~15 KB MIT, headless (zero visual identity cost)
- **Law:** Displayed value == engine ordering (pickle P-345 property law, already in brief); never a claim about visual identity

### 2. Charts on data that EXISTS (ECharts or Unovis, framework-agnostic, only after Architect exposes the seam)
- **Use case:** "Who won MVP and why" (leaders + award line), a team's scoring trend, PF-vs-PA scatter — all inputs exist today (seasonAwards(), LEADER_KEYS, table PF/PA)
- **Blocker:** Per-week win-probability series does NOT exist in the VM — no chart proposal touches it until Architect says so
- **Lib:** ECharts or Unovis, framework-agnostic

### 3. W5 — Team-palette contrast guardrail test (zero deps)
- **Use case:** 32 team palettes × two modes measured automatically; a future token/palette pass fails the battery instead of shipping an unreadable screen
- **Law:** All 64 combos (≥4.5:1 or the failure names the team)
- **Cheapest insurance on the list**

---

## council
### 1. Axe-core + Visual Goldens (T4/T5) — test-time only, zero product bytes
- **Use case:** a11y probe catches what it misses; goldens make "did the board move 4px" a battery failure instead of an eyeball
- **Laws:** zero axe violations at rest; 8–10 pinned goldens that re-pin themselves on intentional changes
- **Not proposed:** drag-and-drop, state library, UI kits, virtual scroll, analytics, Zod

### 2. Keyboard Endgame Drafting (W1) — touch/keyboard arrows/Enter/D, speedrunner's second path
- **Use case:** Owner's own speedrun instinct (≥3 highlights = mouse path; this = keyboard path); screen-reader users get the same flow
- **Law:** Full 32-pick flow keyboard-only, zero page errors
- **Cost:** ~80 lines; DRAFT button stays primary

### 3. Pick-Complete Pulse (W2) — CSS + navigator.vibrate?.(12) where available
- **Use case:** Heartbeat between the cinematics — closes the loop C′3 opens
- **Law:** Pulse on confirmation, nothing under reduced motion
- **Cost:** ~30 lines

### 4. lz-string saves-only when measured (T3)
- **Use case:** Envelope headroom on the weakest mobile Safari; zero UX change
- **Law:** Round-trip byte identity or it does not ship
- **Why:** Nothing today is measurably too big; last because of that

---

## Key Constraints (per brief §8)
- No drag-and-drop on the board (DRAFT button is efficient — Owner's word, final)
- No state library (snapshot engine needs a snapshot)
- No UI kits (fight w89 identity)
- No virtual scroll (1.7k tiny rows render fine)
- No analytics/telemetry ever
- No Zod/schema lib

---

**Reference:** The brief's §10 budget rule (one sitting ≈ §10 budget: A→B→B-bis→C with verification set) should become the protocol. The framework tie-in (Architect's call, not mine): if R-13 bench expands, measure a heavy-table + dashboard surface, NOT the Draft Board.

