# V22 Visual & Aesthetic Specification — Draft Board, Awards, Playoffs, Box Score

**SPEAKER: VLOC | ROLE: Council reviewer (S-2500–2599) | TASK: V22 visual spec — measurable spec lines for Claude | DATE: 2026-10-21T13:00:00Z**

Build under test: `NFL Draft Simulator merged.html` sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (656,746 B).

**Constraint:** read-only on the product. Write only in `_agents/vloc/`. Do not edit `NFL Draft Simulator merged.html`, any other seat's files, or shared documents.

**House rule already in force:** the user's team is shown in blue via `.ub` (l.100: `color:var(--accent);font-weight:700;`) and a MutationObserver (l.6446, l.6547). **Colour alone is never sufficient** — every surface that marks the user's team must carry a second marker (text badge, emoji, rank arrow, W/L letter, or filled dot). This spec names the second marker for each surface.

**Mobile breakpoint:** `@media (max-width:760px)` (existing). **Reduced-motion:** `prefers-reduced-motion: reduce` already handled at l.110 for `.fxbanner,.fxtoast,.champion-banner.fxwon`; extended below to all new V22 animations.

---

## 1. Stars of the Game table — redesigned

**WHERE:** `renderRegularAwardsHTML` (l.5851–5870), individual award rows (l.5853–5855), `computeRegularSeasonAwards` (l.5770–5824), `honorLineHTML` (l.5850).

**WHAT:** Replace the current single `details > table` awards block with a dedicated "Stars of the Game" section: a headed card listing the user's top 3 performers first (gold), then league statistical champions in a secondary card. User's players are highlighted gold and marked with a ★ badge so the highlight never relies on colour alone.

**WHY:** Owner wants the awards panel more beautiful, with gold for the user's players.

**SAFE ALONE?** Yes. Purely presentational; touches no math, no `slotWins`, no `cpuPick`, no protected constants (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`).

**HOW TO CHECK:** Open Season Review → Awards. User's players render with gold text/background + ★ badge; league champions in a separate card below. `node --check` clean; 0 console errors on that page.

**Measurable:**
- Section heading: font-size ≥ 1.25rem, font-weight 700, margin-bottom ≥ 10px.
- User's player rows: background `rgba(255,215,0,0.15)` (gold tint), border-left 4px solid var(--accent), ★ badge (≈16px, inline, margin-right 4px).
- Non-user rows: default panel text, no gold.
- At 1280px: two-column layout (user's stars left, champions right), gap ≥ 14px. At 390px: single stacked column, full width.
- Contrast: gold text on panel background ≥ 3:1; var(--accent) border on panel background ≥ 3:1.
- Light/dark: gold tint lightens in dark theme via `rgba(255,215,0,0.10)`; var(--accent) unchanged.

**Reduced-motion:** Static table; no animation. `prefers-reduced-motion` has no effect (nothing animates).

**Colour rule:** User's players use `.ub` (var(--accent), font-weight:700, l.100) **PLUS** a ★ text badge immediately after the name as the second marker. Never colour alone.

**Capture protocol:** Season Review page at 390×844 and 1280×900, light and dark themes (4 captures). Verify gold appears only on user's players, ★ badge present, table stacks correctly at 390px.

---

## 2. Three distinct panels for top-three personnel recommendations

**WHERE:** `scriptWhyHTML` (l.4781–4795), top-three list at l.4790–4791, strongest/weakest units at l.4788.

**WHAT:** Replace the single sentence ("Your strongest units are X (#n) and Y (#n); the weakest is Z (#n). The top three: …") with three distinct panels — one per top-three unit — each showing the unit name, rank, and a one-line strength/weakness note. Panels are side by side at desktop, stacked at mobile.

**WHY:** Owner wants three panels instead of one compressed sentence.

**SAFE ALONE?** Yes. Presentational only; reads `rk` (unit ranks) and `shortUnit` which already exist.

**HOW TO CHECK:** Preseason or Game Plan panel shows three panels, each with a number badge (1/2/3), unit name, rank, and short note. No console errors.

**Measurable:**
- Each panel: min-width 200px at 1280px, full width at 390px, gap ≥ 10px, border-radius ≥ 8px, padding ≥ 12px, border 1px solid var(--border).
- Number badge: ≥ 1.5rem font-size, font-weight 700, centred in a ≈24px circle or square.
- Unit name: ≥ 1rem, bold. Rank: `#n` monospace or bold, ≥ 0.875rem.
- At 1280px: `display:flex; gap:10px; flex-wrap:wrap`. At 390px: `flex-direction:column`.

**Reduced-motion:** Static panels; no animation.

**Colour rule:** If a user-player unit appears, its name uses `.ub` (var(--accent), font-weight:700) **PLUS** the number badge (1/2/3) as the second marker. Never colour alone.

**Capture protocol:** Game Plan panel (preseason/weekly) at 390×844 and 1280×900, light and dark (4 captures). Verify three panels, number badges, correct stacking at 390px.

---

## 3. Strongest / weakest units — side by side and indented

**WHERE:** `scriptWhyHTML` (l.4788–4791 computes `best` and `worst`), `identityParagraphs` (l.5154–5155 `best`/`worst` used in prose).

**WHAT:** Present strongest and weakest units as two side-by-side indented cards (strongest left, weakest right), each with a unit name, rank number, and a one-line strength/weakness note drawn from `STRENGTH_NOTE`/`WEAK_NOTE` (l.5135–5144).

**WHY:** Visual clarity — currently buried inside a prose sentence; Owner wants them visually separated.

**SAFE ALONE?** Yes. Presentational; reads existing `rk`, `shortUnit`, `STRENGTH_NOTE`, `WEAK_NOTE`.

**HOW TO CHECK:** Game Plan panel or Team Identity section shows two cards, strongest with green-leaning border, weakest with red/amber-leaning border, indented from the page edge.

**Measurable:**
- Cards: width ≈ 45% each at 1280px (total ≤ 95% with gap), full width at 390px. Gap ≥ 12px.
- Indentation: `margin-left: 16px` on the card container relative to page content edge.
- Strongest card: border-left 4px solid var(--good), ▲ "strong" marker text.
- Weakest card: border-left 4px solid var(--bad) (or var(--accent2) if var(--bad) undefined), ▼ "weak" marker text.
- Font-size: unit name ≥ 1rem bold; note ≥ 0.85rem.

**Reduced-motion:** Static cards; no animation.

**Colour rule:** Strongest card border var(--good) **PLUS** ▲ text marker. Weakest card border var(--bad)/var(--accent2) **PLUS** ▼ text marker. Never colour alone.

**Capture protocol:** Game Plan panel at 390×844 and 1280×900, light and dark (4 captures). Verify side-by-side at 1280px, stacked at 390px, ▲/▼ markers present.

---

## 4. Bigger, centred win banner — stays ≥ 3 seconds, then lands and keeps shimmering

**WHERE:** `renderSeasonCompleteView` (l.5885–5891 renders champion banner), `.champion-banner` CSS (l.149–150), `.champion-banner.fxwon` (l.109), existing shimmer animation `fxglow` (l.104).

**WHAT:** Make the championship win banner bigger and centred; it must remain visible for at least 3 seconds, then "land" (settle into a fixed position on the page, not fly away) and keep shimmering. Currently it is a modest panel (l.149: padding 24px, border-radius 14px, font-size 1.6rem).

**WHY:** Owner wants a bigger, centred win banner that persists and keeps shimmering.

**SAFE ALONE?** Yes. Presentational; no math, no `seasonState` writes, no protected constants.

**HOW TO Check:** Complete a season → champion banner is larger, centred, remains on screen ≥ 3000ms, then settles in place with `fxglow` shimmer continuing indefinitely.

**Measurable:**
- Font-size: team name ≥ 2rem (current 1.6rem at l.150).
- Padding: ≥ 32px (current 24px at l.149).
- Border-width: ≥ 3px (current 2px at l.149).
- Border-radius: ≥ 16px.
- Minimum display time: 3000ms before any auto-dismiss or navigation.
- Shimmer: `fxglow` animation continues indefinitely (not just 2.2s); `animation-iteration-count: infinite`.
- At 1280px: centred horizontally, max-width 720px. At 390px: full width minus safe-area, font-size ≥ 1.75rem.

**Reduced-motion:** `prefers-reduced-motion: reduce` → `animation: none; opacity: 1;` (extend the existing l.110 rule to include the win banner selector). Banner still shows at full opacity; shimmer becomes a static glow.

**Colour rule:** Champion team name uses `.ub` (var(--accent), font-weight:700) **PLUS** 🏆 trophy emoji immediately before the name as the second marker. Border color var(--accent) is supplementary, never sole indicator.

**Capture protocol:** Season Complete page at 390×844 and 1280×900, light and dark (4 captures). Verify banner centred, larger, visible ≥ 3s, shimmer persists, 🏆 marker present.

---

## 5. Two conference charts ranking 1–16

**WHERE:** `renderStandingsHTML` (l.3806–3824), `computeStandings` referenced at l.3807, `CONFERENCES` object.

**WHAT:** Replace the current "14-3 · 397 PF · 296 PA" summary line with two conference charts (AFC and NFC), each ranking all 16 teams 1–16 with a horizontal bar per team. User's team row is highlighted.

**WHY:** Owner wants graphical conference ranking instead of a single text line.

**SAFE ALONE?** Yes. Presentational; reads existing standings data.

**HOW TO Check:** Standings page shows two side-by-side charts (AFC left, NFC right), each listing all 16 teams in order 1–16 with a bar. User's team highlighted in both charts if applicable (user has one team, so one chart).

**Measurable:**
- Each chart: width ≈ 48% at 1280px (side by side, gap ≥ 14px), full width stacked at 390px.
- Team row: height ≥ 24px, bar height ≥ 14px, rank number font-size ≥ 1rem bold, team name ≥ 0.875rem.
- Wins/losses text: ≥ 0.8rem.
- Contrast: rank text on panel background ≥ 4.5:1; bar fill vs background ≥ 3:1.
- At 390px: charts stack vertically, each full width.
- Light/dark: bar fill uses var(--accent) with opacity (0.25 light, 0.35 dark); rank text uses var(--text).

**Reduced-motion:** Static bars; no animation.

**Colour rule:** User's team row uses `.ub` (var(--accent), font-weight:700, l.100) **PLUS** a rank-change marker ▲/▼ (or a filled dot ● if no change) as the second marker. Never colour alone.

**Capture protocol:** Standings page at 390×844 and 1280×900, light and dark (4 captures). Verify two charts, 1–16 ranking, user's row highlighted + ▲/▼ marker.

---

## 6. March Madness-style playoff bracket with byes

**WHERE:** `renderBracketHTML` (l.3830–3849), `ROUND_LABELS`, `bg3` class (l.3841–3844), seed tags (l.3838).

**WHAT:** Redesign the playoff bracket into a March Madness-style layout: bye teams clearly marked ("BYE" badge), both conferences converging toward the centre (Super Bowl), team names with seed badges, connecting lines between rounds.

**WHY:** Owner wants a more beautiful, more exciting playoff preview/bracket.

**SAFE ALONE?** Yes. Presentational; reads existing `seasonState.playoffRounds` data.

**HOW TO Check:** Playoffs page shows bracket with byes indicated, conference structure visible, team names readable, connecting lines between rounds.

**Measurable:**
- Connector lines: ≥ 2px solid var(--border).
- Team name font-size: ≥ 0.875rem; seed badge: ≥ 0.7rem bold, background var(--panel2), border-radius 4px.
- "BYE" indicator: ≥ 0.75rem, font-weight 700, colour var(--sub), background rgba(0,0,0,0.05).
- Round labels: ≥ 1rem bold, margin-bottom ≥ 8px.
- At 1280px: horizontal flow with conferences on left/right, Super Bowl centre. At 390px: vertical stack, rounds as collapsible sections or full-width rows.
- Contrast: team name on panel background ≥ 4.5:1.

**Reduced-motion:** Static bracket; no animation.

**Colour rule:** User's team uses `.ub` (var(--accent), font-weight:700) **PLUS** a seed badge (e.g., "#1", "#6") or a ● filled dot as the second marker. Never colour alone.

**Capture protocol:** Playoffs page at 390×844 and 1280×900, light and dark (4 captures). Verify byes marked, conferences converge, user's team highlighted + seed badge.

---

## 7. More beautiful regular-season awards panel with gold for user's players

**WHERE:** `renderRegularAwardsHTML` (l.5851–5870), `computeRegularSeasonAwards` (l.5770–5824), `honorLineHTML` (l.5850), `out.userSummary` (l.5822).

**WHAT:** Restyle the awards panel: larger award titles, gold background chip for user's players (All-Pro / Pro Bowl / award winners), clearer separation between individual awards, statistical champions, and All-Pro/Pro Bowl grids.

**WHY:** Owner wants a more beautiful awards panel with gold for user's players.

**SAFE ALONE?** Yes. Presentational; reads existing `A.individual`, `A.stat`, `A.allPro`, `A.proBowl`, `A.userSummary`.

**HOW TO Check:** Season Review → Awards shows larger titles, gold chips on user's players, clean section separation. 0 console errors.

**Measurable:**
- Award title (MVP, OPOY, DPOY, Coach): font-size ≥ 1rem bold, margin-top ≥ 10px.
- User's player name: gold background chip (`rgba(255,215,0,0.20)`), padding ≥ 4px 8px, border-radius ≥ 4px, ★ marker after name.
- Section gaps: ≥ 14px between awards table, statistical champions, and All-Pro grids.
- At 1280px: All-Pro/Pro Bowl grids side by side (2 columns). At 390px: stacked single column.
- Contrast: gold chip text ≥ 3:1; award title ≥ 4.5:1.

**Reduced-motion:** Static panel; no animation.

**Colour rule:** User's players use `.ub` (var(--accent), font-weight:700) **PLUS** a gold background chip + ★ marker as the second indicator. Never colour alone.

**Capture protocol:** Season Review / Awards at 390×844 and 1280×900, light and dark (4 captures). Verify gold chips, ★ markers, clean separation.

---

## 8. Game-plan dropdown text much larger

**WHERE:** `renderGamePlanPanel` (l.4796–4816), `sel()` helper (l.4798: `font-size:0.72rem`), radio labels (l.4799), defensive package dropdown (l.4811).

**WHAT:** Increase game-plan dropdown and radio label text size so it is clearly readable at a glance. Current `sel()` uses font-size 0.72rem (l.4798).

**WHY:** Owner wants game-plan dropdown text much larger.

**SAFE ALONE?** Yes. Pure CSS/text sizing; no logic change.

**HOW TO Check:** Open Game Plan panel; dropdowns and radio labels are clearly larger than before. `node --check` clean.

**Measurable:**
- `sel()` dropdown font-size: ≥ 0.9rem (was 0.72rem at l.4798).
- Radio label (`<b>`): ≥ 0.85rem bold; hint text ≥ 0.75rem.
- Select padding: ≥ 6px 10px; min-height ≥ 36px.
- At 390px: dropdowns full width, flex-wrap wrap. At 1280px: flex row with gap ≥ 16px.
- Contrast: selected text vs select background ≥ 4.5:1.

**Reduced-motion:** Static text; no animation.

**Colour rule:** The user's selected philosophy/package uses `.ub` (var(--accent)) **PLUS** a "✓ selected" text suffix or ● filled dot as the second marker. Never colour alone.

**Capture protocol:** Game Plan panel at 390×844 and 1280×900, light and dark (4 captures). Verify larger text, selected marker present.

---

## 9. Defensive package names without subtitles

**WHERE:** `DEF_PKG` (l.2036: `{ base:{label:'Base'}, nickel:{label:'Nickel'} }`), `DEF_SPECS` (l.2044–48), dropdown options (l.4811), `dfit` descriptions (l.4668–4669), `DEF_FOCUS` (l.2037).

**WHAT:** Defensive package names render as clean single labels: "Nickel · Pass Protection", "Nickel · Run Defense", or just "Nickel" — no subtitle parentheticals, no explanatory subtitles in the dropdown label. (Descriptions can remain in the hint/why text, but not in the option label itself.)

**WHY:** Owner wants cleaner package names without subtitles cluttering the dropdown.

**SAFE ALONE?** Yes. Text/label change only; no math, no `DEF_SPECS` weights, no protected constants.

**HOW TO Check:** Game Plan defensive package dropdown shows "Nickel · Pass Protection", "Nickel · Run Defense", or "Nickel" as option text — no subtitle text after the name. 0 console errors.

**Measurable:**
- Option text length: ≤ 40 chars.
- No middle-dot followed by subtitle words in the `<option>` label itself (subtitle may live in the `<span class="narr">` hint below).
- Font-size: ≥ 0.85rem.
- At 390px: dropdown full width. At 1280px: width ≤ 260px.

**Reduced-motion:** Static text; no animation.

**Colour rule:** User's selected package uses `.ub` (var(--accent)) **PLUS** a ● filled dot or "✓" marker as the second indicator. Never colour alone.

**Capture protocol:** Game Plan panel at 390×844 and 1280×900, light and dark (4 captures). Verify clean names, no subtitles in labels.

---

## 10. Box score and quarter summaries larger and more graphical

**WHERE:** `renderGameResultHTML` (l.3780–3801), `renderLineScoreHTML` referenced at l.3794, `quarterTotals` (l.2154), standings PF/G/PA/G table (l.3814–3818), `renderUserScheduleHTML` (l.3857–3872).

**WHAT:** Make box score and quarter summaries larger and more graphical: score numbers prominent, quarter cells distinct, win/loss outcome colour-coded with a letter marker.

**WHY:** Owner wants box scores and quarter summaries larger and more graphical.

**SAFE ALONE?** Yes. Presentational; reads existing `game.result`, `quarterTotals`, standings data.

**HOW TO Check:** Open a game recap; score line shows large numbers, quarter breakdown is graphical with distinct cells, outcome (W/L) has a letter marker. 0 console errors.

**Measurable:**
- Score numbers: font-size ≥ 1.5rem, font-weight 800.
- Quarter cells: width ≥ 60px, height ≥ 40px, border-radius ≥ 6px, background var(--panel2), border 1px solid var(--border).
- Quarter label: ≥ 0.8rem, text-transform uppercase, letter-spacing 0.05em.
- Outcome: "W" in var(--good), "L" in var(--bad), "T" in var(--sub), each ≥ 1rem bold, plus the existing colour.
- At 1280px: quarters in a horizontal row. At 390px: quarters stack vertically or wrap in pairs.
- Contrast: score vs background ≥ 4.5:1; outcome letter vs background ≥ 4.5:1.

**Reduced-motion:** Static; no animation.

**Colour rule:** Winning team score uses var(--good) **PLUS** a "W" letter marker. Losing team uses var(--bad) **PLUS** "L". User's team row uses `.ub` **PLUS** team abbreviation badge (e.g., "KC"). Never colour alone.

**Capture protocol:** Game recap / box score at 390×844 and 1280×900, light and dark (4 captures). Verify large scores, quarter cells, W/L markers.

---

## 11. Reduced-motion respect (cross-cutting)

**WHERE:** l.110 `@media (prefers-reduced-motion: reduce){.fxbanner,.fxtoast,.champion-banner.fxwon{animation:none;opacity:1;}}`, l.6452 `const reduce = ()=> window.matchMedia?.('(prefers-reduced-motion: reduce)').matches`, l.104 `fxglow` keyframes.

**WHAT:** Every new V22 animation (win banner shimmer, any panel entrance, any chart bar draw) must respect `prefers-reduced-motion: reduce`. When enabled: `animation: none; opacity: 1;` — content fully visible, no information conveyed only by motion.

**WHY:** Accessibility requirement; motion can trigger vestibular disorders.

**SAFE ALONE?** Yes. CSS/media-query only.

**HOW TO Check:** Open DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`. Navigate through all V22 surfaces. Nothing animates; all text, bars, banners, and markers remain fully visible and readable.

**Measurable:**
- All animated elements: `animation: none !important` under the media query.
- Opacity fallback: `opacity: 1` under the media query.
- No CSS `transition` that conveys state-only information (e.g., a slide-in that hides content).

**Reduced-motion:** This IS the reduced-motion spec.

**Colour rule:** N/A (motion, not colour).

**Capture protocol:** Screenshot each V22 surface with `prefers-reduced-motion: reduce` enabled at 1280×900, light theme (2 captures minimum: champion banner + playoff bracket). Verify nothing animates, all content visible.

---

## Colour rule — consolidated (applies to every surface above)

The user's team is identified by `.ub` (l.100) and tracked by MutationObserver (l.6446, l.6547). Per the house rule, **colour alone never identifies the user's team**. For each new or restyled surface:

| Surface | Primary (colour) | Second marker (never colour alone) |
|---------|-----------------|-----------------------------------|
| Stars of the Game table | `.ub` var(--accent) on user's player name | ★ badge after name |
| Top-three panels | `.ub` if user's unit present | Number badge (1/2/3) |
| Strongest/weakest cards | var(--good)/var(--bad) border | ▲ / ▼ text marker |
| Win banner | `.ub` on champion name | 🏆 trophy emoji before name |
| Conference charts | `.ub` on user's row | ▲/▼ rank-change or ● dot |
| Awards panel | `.ub` on user's player name | Gold chip + ★ badge |
| Game-plan dropdown | `.ub` on user's selection | ✓ selected or ● dot |
| Defensive packages | `.ub` on user's package | ● dot or "✓" marker |
| Box score / quarters | var(--good)/var(--bad) score | W / L letter |
| Win banner / champion | `.ub` on champion name | 🏆 trophy emoji |

**Capture protocol — before/after:** For each of the 11 surfaces above, capture at **390×844** and **1280×900**, in **light and dark themes**, **before** (current build `044d1759…`) and **after** (spec implemented). That is 8 captures per surface. Verify: no horizontal overflow at 390px, all text readable, second markers present, animations respect reduced-motion.

---

## Self-audit (rule 11 / rule 14 / rule 2)

Files written: `_agents/vloc/v21-visual/V22-VISUAL-SPEC.md` (this file). Read-only on `NFL Draft Simulator merged.html` (build `044d1759…`, 656,746 B) — no product edit. Line numbers verified by `grep` and direct read against the current build. No other lanes touched, no shared-doc edits, no git operations. Measurements (font-sizes, paddings, contrast ratios) are specification targets derived from the existing CSS at l.100, l.109, l.110, l.149–150, l.2036, l.239–242, l.3806, l.3830, l.4781–4816, l.5770–5870, l.5885–5891; actual rendered values to be confirmed by Claude at implementation.

**Not checked (stated plainly):** live rendered pixel measurements at 390px/1280px (requires browser rendering, not yet performed); contrast ratios computed by tool (not yet measured); reduced-motion behaviour in the user's browser (not yet tested).
