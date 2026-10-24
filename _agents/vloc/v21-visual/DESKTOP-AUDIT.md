# Desktop Visual Defect Audit — V20 Merge Candidate (1280×900)

**SPEAKER: VLOC | ROLE: Council reviewer (S-2500–2599) | TASK: Desktop visual defect inventory | DATE: 2026-10-21T02:45:00Z**

State pin verified before opening: `NFL Draft Simulator merged.html` → sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B — matches the V20 merge candidate exactly. This is **not V21**.

Serving via local http at `http://127.0.0.1:8765/NFL%20Draft%20Simulator%20merged.html`, viewport 1440×900 (desktop). Screenshots saved to `_agents/vloc/v21-visual/shots/`.

---

## Views captured (7 of 11)

| #   | View                            | Screenshot                   | Status      |
| --- | ------------------------------- | ---------------------------- | ----------- |
| 1   | Initial draft setup             | `01-initial-draft-setup.jpg` | ✅ Captured |
| 2   | Team Rankings                   | `02-team-rankings.jpg`       | ✅ Captured |
| 3   | Player Browser                  | `03-player-browser.jpg`      | ✅ Captured |
| 4   | Position Rankings               | `04-position-rankings.jpg`   | ✅ Captured |
| 5   | Team Comparison                 | `05-team-comparison.jpg`     | ✅ Captured |
| 6   | Guide                           | `06-guide.jpg`               | ✅ Captured |
| 7   | Draft board (after Start Draft) | `08-draft-board.jpg`         | ✅ Captured |

**Not captured (out of scope per DS assignment):** preseason, season week view, playoffs, Super Bowl. These require playing through the draft→season flow (interaction audit), which Ultra owns. Marked **NOT CHECKED**, not "no defect found."

---

## Confirmed defects (VERIFIED via DOM inspection + screenshot)

### D1 — Tab navigation bar sits below the viewport on first load

**Evidence:** `#tabRankingsBtn` bounds `x:462, y:1939, w:153, h:28` — y=1939px, well below the 900px viewport. Initial snapshot reports `maxScrollY: 962`, so the user must scroll ~1,000px down before reaching the tab bar. All six tabs (Simulator, Madden Rankings, Player Browser, Position Rankings, Team Comparison, Guide) are below the fold.

**Impact:** First-time viewer lands on the draft setup and cannot see the primary site navigation without scrolling. This is discoverable but not obvious.

**VERIFIED** via `browser.inspect` bounds + snapshot `maxScrollY`.

---

### D2 — Hero heading uses transparent-text gradient (fragile rendering)

**Evidence:** `<h1>` computed styles: `color: rgba(0, 0, 0, 0)` (fully transparent text), `background-image: linear-gradient(90deg, rgb(232, 236, 243), rgb(156, 194, 255) 70%)`, font-size 44.1px, weight 900. The visible "NFL Draft Simulator" text is produced entirely by the gradient mask — the text color itself is transparent.

**Impact:** This is an unconventional text-rendering technique. If the gradient mask fails to apply in any browser/OS combination, the heading becomes invisible (transparent text on transparent background). The lighter end of the gradient (rgb(232,236,243) ≈ #e8ecf3) may also fall below WCAG contrast thresholds against light backgrounds or certain OS themes.

**VERIFIED** via `browser.inspect` on `h1`.

---

### D3 — Draft setup hero emoji "🏈" may not render consistently

**Evidence:** Snapshot text begins with `🏈\nNFL Draft Simulator` — an emoji precedes the H1. Font stack for body text is `-apple-system, system-ui, Segoe UI, Roboto, sans-serif` (from H1 inspection). No emoji font fallback is declared.

**Impact:** On systems without a color emoji font, this may render as a missing-glyph box (□) or not at all. Minor cosmetic issue but visible on first load.

**VERIFIED** via snapshot text + font-stack inspection. Rendering consistency across OSes: **INFERRED** (not tested cross-platform).

---

## Preferences (design opinions, not defects)

### P1 — Bottom tab bar uses pill-shaped buttons with gray inactive state

Tab buttons show `color: rgb(159,176,192)` (muted gray), `border-color: rgb(159,176,192)`, `border-radius: 999px` (pill shape), font-weight 600. Active state styling not visible from this inspection. This is a consistent design language — no defect, just a style choice.

### P2 — Start Draft button uses blue gradient with box-shadow

`background-image: linear-gradient(90deg, rgb(79,140,255), rgb(106,166,255))`, white text, `box-shadow: rgba(79,140,255,0.28) 0px 6px 18px 0px`. Clear primary-CTA styling — no defect.

### P3 — Draft slot/pick dropdowns use dark theme

`background-color: rgb(27,34,48)`, `color: rgb(232,236,243)`, `border-color: rgb(42,49,66)`. Consistent dark theme — no defect.

---

## Ranking by visual impact on first-time viewer

| Rank | Defect                                     | Why it ranks here                                                                                                |
| ---- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| 1    | **D1 — Tabs below fold**                   | Breaks discoverability of the app's primary navigation on first load                                             |
| 2    | **D2 — Transparent-text gradient heading** | Renders correctly now, but fragile — invisible if gradient mask fails; contrast risk in lighter gradient regions |
| 3    | **D3 — Emoji may not render**              | Cosmetic only; minor glyph fallback issue                                                                        |

---

## Not checked (and why)

| View             | Reason                                                      | Label                                          |
| ---------------- | ----------------------------------------------------------- | ---------------------------------------------- |
| Preseason        | Requires completing draft + season setup (interaction flow) | **NOT CHECKED** — Ultra owns interaction audit |
| Season week view | Requires playing through season (interaction flow)          | **NOT CHECKED** — Ultra owns interaction audit |
| Playoffs         | Requires season progression (interaction flow)              | **NOT CHECKED** — Ultra owns interaction audit |
| Super Bowl       | Requires season progression (interaction flow)              | **NOT CHECKED** — Ultra owns interaction audit |
| 390px / mobile   | Out of scope per DS assignment                              | **NOT CHECKED** — Super owns 390px viewport    |

---

## Screenshot inventory

All 7 screenshots at 1440×900 desktop, saved as JPG:
- `_agents/vloc/v21-visual/shots/01-initial-draft-setup.jpg`
- `_agents/vloc/v21-visual/shots/02-team-rankings.jpg`
- `_agents/vloc/v21-visual/shots/03-player-browser.jpg`
- `_agents/vloc/v21-visual/shots/04-position-rankings.jpg`
- `_agents/vloc/v21-visual/shots/05-team-comparison.jpg`
- `_agents/vloc/v21-visual/shots/06-guide.jpg`
- `_agents/vloc/v21-visual/shots/08-draft-board.jpg`

---

## Self-audit

Files written: `_agents/vloc/v21-visual/DESKTOP-AUDIT.md` (this file), screenshots in `_agents/vloc/v21-visual/shots/`. Read-only on product file (`40233d6b…` unchanged). No git operations, no other lanes touched, no shared-doc edits. Defects D1–D3 verified via `browser.inspect` bounds and computed styles; visual rendering consistency across OS/browser combinations not tested (INFERRED only).
