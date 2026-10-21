# Pinned Navigation Specification — #7

**SPEAKER: VLOC | ROLE: Council reviewer (S-2500–2599) | TASK: Pinned-nav spec (#7) | DATE: 2026-10-21T03:10:00Z**

Build under test: `NFL Draft Simulator merged.html`, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B — **the V20 merge candidate, not V21**. Read-only; write only in `_agents/vloc/`.

Evidence labels: VERIFIED / REPORTED / INFERRED / UNKNOWN. Every measured number cites a line number, selector, or screenshot.

---

## Source of truth (measured on the pinned candidate)

This spec is derived from the desktop audit (DESKTOP-AUDIT.md) that first measured the tab bar at `y:1939` on a 900px viewport, plus direct inspection of `NFL Draft Simulator merged.html`.

### Current tab bar (VERIFIED)
- Markup: lines 439–446, `<nav class="footnav" aria-label="More tools">` with 6 `.footlink` buttons: `tabDraftBtn`, `tabRankingsBtn`, `tabPlayersBtn`, `tabGroupsBtn`, `tabCompareBtn`, `tabGuideBtn`.
- CSS: line 239, `.footnav{display:flex;justify-content:center;align-items:center;gap:4px;flex-wrap:wrap;margin:34px auto 0;padding:8px 10px;max-width:max-content;border:1px solid var(--border);border-radius:999px;background:rgba(20,25,34,.55);backdrop-filter:blur(6px);}`.
- Position: **not pinned** — in normal flow inside `#viewDraft` (line 438), after all draft content. Measured at `y:1939` on 1440×900 desktop (VERIFIED, desktop audit screenshot `08-draft-board.jpg`).
- Relocated by IIFE at line 874: appends `.footnav` to `.wrap`.

### Phase primary actions (VERIFIED from merged.html)
| Phase | Selector(s) | Line(s) | Label |
|-------|------------|---------|-------|
| Draft start | `#startDraftBtn` | ~6158 | "Start Season" |
| Preseason | `#beginSeasonBtn`, `#beginSeasonBtn2` | ~5095, ~5113 | "Begin the season →" |
| Season week view | `#simWeekBtn`, `#simSeasonBtn` | ~3891, ~3905 | "Simulate Week N", "Sim Rest of Season ▸ Review" |
| Playoffs | `#simPlayoffsBtn` | referenced in CSS line 249 | (rendered in playoffs view) |
| Super Bowl | champion banner | `.champion-banner.fxwon` line 109/149 | (banner, not a button) |

### Existing floating layer — four `position:fixed` + one `position:sticky` (VERIFIED)
| # | Selector | Line | z-index | Geometry | Purpose |
|---|----------|-----|---------|----------|---------|
| 1 | `#fxCanvas` | 105 | 9998 | `left:0;top:0;width:100%;height:100%` | full-screen FX canvas (pointer-events:none) |
| 2 | `.fxbanner` | 106 | 9999 | `left:50%;top:38%;max-width:90vw` | ephemeral celebration banner |
| 3 | `.fxtoast` | 108 | 9999 | `left:50%;bottom:26px;max-width:92vw` | toast notification (3.7s auto-dismiss) |
| 4 | `.confirm-ov` | 210 | 50 | `inset:0` (full screen) | confirm overlay modal |
| 5 | `.tablewrap thead th` | 188 | 1 | `sticky;top:0` | table header row (scrolls within tablewrap) |

### Safe-area handling (VERIFIED)
- Line 3: `:root{...padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}html{scroll-padding-top:env(safe-area-inset-top,0px)}`
- Line 26: `body{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);}`
- Safe-area insets are applied as **body padding**. A pinned bar at the bottom collides with bottom safe-area padding unless it accounts for it.

### `.ub` user-team highlight (VERIFIED)
- Line 100: `.ub{color:var(--accent);font-weight:700;}` — applied to user-team names in draft board, standings, etc.

---

## (a) What is pinned and where

**Decision: pin BOTH the tab bar (`.footnav`) and the phase primary action.**

Rationale (VERIFIED from desktop audit): the tab bar at `y:1939` is ~1,000px below the viewport on desktop, so a first-time viewer must scroll ~1,000px just to reach primary site navigation. The phase primary action (e.g. `#beginSeasonBtn`) is similarly far down inside long views. Pinning both gives the user one persistent navigation row and one persistent progress action.

### Layout at each viewport

**390×844 (mobile):**
- Tab bar: pinned **bottom**, full width, height ~56px (6 pills + label, wraps to 2 rows if needed). Above bottom safe-area padding (line 26).
- Phase primary action: pinned **top**, full width, height ~48px, directly below the hero heading. Above the top safe-area padding (line 3).
- Who wins screen space: they occupy opposite edges, so no overlap. Tab bar bottom, primary action top.

**768×1024 (tablet):**
- Tab bar: pinned **bottom**, full width or max-width 720px centered, height ~56px.
- Phase primary action: pinned **top**, full width, height ~48px.
- Who wins screen space: opposite edges, no overlap.

**1280×900 (desktop):**
- Tab bar: pinned **bottom-right**, pill-shaped (`max-width:max-content` preserved), height ~44px, right edge with 24px margin.
- Phase primary action: pinned **top-right**, height ~44px, right edge with 24px margin.
- Who wins screen space: opposite edges (top vs bottom), no overlap.

### z-index (VERIFIED from existing layer table)
Pinned bar: z-index **60** (above `.confirm-ov` at 50, below `.fxbanner`/`.fxtoast` at 9999). This means toasts and banners float *over* the pinned bar — acceptable since both are transient. The pinned bar sits above the sticky table headers (z-index 1).

---

## (b) Scroll behaviour

**Recommendation: always pinned** (position:fixed at top/bottom edge).

Why: The phase primary action is the user's progress contract — "Begin the season", "Simulate Week N", etc. It must be reachable without scrolling back up after reading a long view. The tab bar is the site's only top-level navigation; hiding it after scroll forces the user to scroll home to switch sections. "Pinned after scroll" (position:sticky) is rejected because the primary action lives inside long scrollable panels (`#viewDraft`, preseason, season review) where sticky would pin it relative to its scrolling container, not the viewport — inconsistent behavior across phases.

The one exception: when `.confirm-ov` (line 210, full-screen inset:0) is open, the pinned bar is visually covered by the overlay (z-index 50 < 60, but confirm-ov is full-screen with backdrop). This is correct modal behavior — the bar is present but inert behind the dimmer.

---

## (c) Collision check against existing floating elements (VERIFIED line numbers)

| Existing fixed/sticky | Line | z-index | Collision with pinned bar? | Resolution |
|----------------------|-----|---------|---------------------------|------------|
| `#fxCanvas` | 105 | 9998 | None — pointer-events:none, full-screen passive canvas | No change needed |
| `.fxbanner` | 106 | 9999 | **Possible** — banner is `top:38%`; pinned primary action is top edge. Banner renders over the bar while active. | Acceptable: banner is ephemeral (4.2s auto-dismiss), centered at 38%, does not block the top-edge button meaningfully |
| `.fxtoast` | 108 | 9999 | **Possible** — toast is `bottom:26px`; pinned tab bar is bottom edge. Toast renders over the bar while active. | Acceptable: toast is ephemeral (3.7s auto-dismiss), centered at bottom, max-width 92vw |
| `.confirm-ov` | 210 | 50 | **Intentional full cover** — confirm overlay dims the whole screen | Correct modal behavior; bar inert behind overlay |
| `.tablewrap thead th` | 188 | 1 | None — sticky table header, z-index 1 << 60 | No change needed |

**No existing fixed element sits at the top edge or bottom edge** — `.fxbanner` is at `top:38%` (center-upper), `.fxtoast` is at `bottom:26px` (center-bottom with max-width 92vw). The pinned bar occupies the extreme edges, which are currently empty. Zero collision with permanent UI.

---

## (d) What the pinned bar must never cover

1. **Safe-area insets on iPhone** (VERIFIED lines 3 & 26): body already applies `env(safe-area-inset-top/bottom)` as padding. The pinned bar must **not** extend into the safe-area padding. On bottom: `bottom: env(safe-area-inset-bottom, 0px)` instead of `bottom: 0`. On top: `top: env(safe-area-inset-top, 0px)` instead of `top: 0`. Do not assume 0px insets.

2. **The `.ub` user-team highlight** (VERIFIED line 100): `.ub{color:var(--accent);font-weight:700;}` is applied inline to user-team names in draft board, standings, playoffs. It is text-level, not a layout blocker. The pinned bar must not overlap any `.ub` text. Since `.ub` appears inside content panels (not at extreme edges), pinning at top/bottom edges avoids it. **Spec must state:** verify no `.ub` occurrence is within 48px of the top edge or 56px of the bottom edge in any view.

3. **Toasts** (`.fxtoast`, line 108, `bottom:26px`): pinned tab bar at bottom must not collide with the toast zone. On mobile (390×844), bottom bar at `bottom: env(safe-area-inset-bottom)` + toast at `bottom:26px` — if safe-area inset is 0, bar bottom edge and toast center could overlap vertically. Resolution: toast has `max-width:92vw` and is centered; bar is full-width pills. The toast's `bottom:26px` places it ~26px above the absolute bottom; the bar occupies the bottom-most ~56px. Overlap possible on small screens. **Spec: bar bottom edge must sit below the toast's typical vertical extent, OR toast shifts up when bar is present.** Simplest robust rule: pinned bar at bottom uses `bottom: max(env(safe-area-inset-bottom), 8px)` and toast keeps `bottom:26px`; on 390px height the bar (~56px) + toast (~48px) = 104px of bottom edge, leaving 740px of content — acceptable.

4. **Confirm overlay** (`.confirm-ov`, line 210, `inset:0`, full screen): covers everything. Pinned bar is behind it. Correct — no action needed.

---

## (e) Accessibility minimum

1. **Target size:** 44×44px minimum touch target (WCAG 2.5.5). The `.footlink` pills currently have `padding:5px 10px` at font-size 0.74rem — roughly 26×26px, **below** the 44×44px minimum. The pinned tab bar must increase `.footlink` padding to achieve ≥44px height. Phase primary action buttons already use `padding:13px 30px` (line 249) — ~46px height, compliant.

2. **Focus order:** Tab bar buttons must remain in DOM order (`tabDraftBtn` → `tabRankingsBtn` → `tabPlayersBtn` → `tabGroupsBtn` → `tabCompareBtn` → `tabGuideBtn`). Pinning via `position:fixed` does not change DOM order, so tab-key navigation is preserved. The phase primary action must be focusable and reachable in natural tab order (it already is, as a `<button>`).

3. **Keyboard escape from a pinned element:** A pinned bottom bar with 6 buttons + the phase primary action creates a long tab sequence. The spec requires: Escape key must close any pinned-bar overlay state (none exists today — bars are static, so no change needed), and Tab must cycle through all bar buttons then continue to page content. Since both pinned elements are static buttons (not traps), no JavaScript focus management is required.

4. **Occlusion of focused content:** When a user focuses a form field (e.g. draft pick selector `#draftSlotSelect` line 1401), the pinned bottom tab bar must not cover it. On mobile (390×844), the virtual keyboard may also appear. **Spec: pinned bar must not reduce the viewport available to focused inputs below 60% of screen height.** This is a browser behavior (keyboard pushes viewport), not a CSS change — but the bar must not be `position:fixed` over the keyboard area on iOS Safari. The bottom bar at `bottom: env(safe-area-inset-bottom)` is the standard safe pattern; iOS handles fixed-position bars with keyboard by resizing the viewport.

---

## (f) Measured before/after

### Current position of the primary action per phase (VERIFIED from merged.html line numbers + desktop audit)

| Phase | Selector | Current position | Measured (desktop 1440×900) |
|-------|----------|-----------------|------------------------------|
| Draft start | `#startDraftBtn` | in-flow, inside `#viewDraft` | ~y:1530 (VERIFIED from screenshot `08-draft-board.jpg`, "Start Draft" button visible mid-page) |
| Preseason | `#beginSeasonBtn` | in-flow, inside preseason panel line ~5095 | ~y:1200–1400 (INFERRED from line position, not directly measured) |
| Season week | `#simWeekBtn` | in-flow, inside week panel line ~3891 | ~y:900–1100 (INFERRED) |
| Playoffs | `#simPlayoffsBtn` | in-flow, inside playoffs panel | UNKNOWN (not measured) |
| Super Bowl | champion banner | `.champion-banner.fxwon` | UNKNOWN (not measured) |

### Where it lands once pinned (specified, not yet measured)

| Phase | Selector | Pinned position | Offset from edge |
|-------|----------|-----------------|------------------|
| Draft start | `#startDraftBtn` | top edge, right-aligned | `top: env(safe-area-inset-top, 0px)`, `right: 24px` |
| Preseason | `#beginSeasonBtn` | top edge, right-aligned | `top: env(safe-area-inset-top, 0px)`, `right: 24px` |
| Season week | `#simWeekBtn` / `#simSeasonBtn` | top edge, right-aligned | `top: env(safe-area-inset-top, 0px)`, `right: 24px` |
| Playoffs | `#simPlayoffsBtn` | top edge, right-aligned | `top: env(safe-area-inset-top, 0px)`, `right: 24px` |
| Tab bar (all phases) | `.footnav` | bottom edge | `bottom: env(safe-area-inset-bottom, 0px)`, centered / right-aligned |

**Not measured (stated plainly):** the exact pixel Y of each primary action on mobile (390×844) and tablet (768×1024). The desktop measurement (tab bar at y:1939) is VERIFIED; all other phase-action positions are INFERRED from line numbers in merged.html, not directly measured. The pinned positions above are the specification target, not measured outcomes.

---

## Implementation note (one shell change)

This spec requires exactly one CSS addition: pin `.footnav` (bottom) and add a `.phase-action` class (or reuse existing button classes) pinned at top. The phase primary action buttons already exist with distinct IDs; the spec wraps them in a pinned container or adds `position:fixed` to a wrapper. No visual redesign — same buttons, same colors, same text, just pinned to the viewport edges. No JS changes required (pinning is CSS-only; focus order preserved by DOM order).

---

## Self-audit (rule 11 / rule 14 / rule 2)

Files written: `_agents/vloc/v21-visual/PINNED-NAV-SPEC.md` (this file). Read-only on `NFL Draft Simulator merged.html` — no product edit. Line numbers verified by `grep` and direct read. Desktop tab-bar position (y:1939) VERIFIED from the earlier desktop audit screenshot `08-draft-board.jpg`. All other phase-action positions INFERRED from merged.html line positions, not directly measured. Safe-area handling VERIFIED at lines 3 & 26. Fixed/sticky layer table VERIFIED at lines 105, 106, 108, 188, 210. `.ub` class VERIFIED at line 100. No other lanes touched, no shared-doc edits, no git operations.

**Not checked:** mobile/tablet pixel positions of primary actions; whether any `.ub` text occurs within 48px of top or 56px of bottom edge in any view; toast/bar vertical overlap on 390×844 height.