# VL — UI Beauty / Interactivity Proposals
**Status:** PROPOSED — open for any seat or Architect to implement  
**Date:** 2026-10-24  
**Reference:** Bulletin entry M-VL-20261024-04  
**Build target:** `NFL Draft Simulator merged.html` (single-file HTML, no build steps)  
**Constraints:** No paid APIs, no CDN dependencies, no build steps, no product file split, protected constants untouched

---

## Overview

Make the app more beautiful and interactive through CSS + vanilla JS only. Six work areas, ordered by visual impact:

1. **Header** — team-branded live header (P1)
2. **Footer** — team-colored season summary + nav pills (P1)
3. **Dynamic panels** — accordion/expanding panels (P2)
4. **Micro-interactions** — hover lift, confetti (P2)
5. **Conference championship rewards** — trophy case + win overlay (P2)
6. **Typography & color polish** — accents, transitions, empty states (P3)

---

## 1. Header — Team-Branded Live Header

**Location:** Top of page, replacing or enhancing existing header

**CSS:**
- CSS custom properties for each team: `--team-primary`, `--team-secondary`, `--team-accent`
- Header background: `linear-gradient(180deg, var(--team-primary), rgba(0,0,0,0))` over `--panel`
- Team disc: 56px circle, `linear-gradient(140deg, var(--team-primary), var(--team-secondary))`, `animation: heroBounce 3.4s ease-in-out infinite`
- H1 text: `background: linear-gradient(90deg, var(--team-primary), var(--team-secondary) 78%); -webkit-background-clip: text; color: transparent`

**JS:**
- When user selects a team: update CSS custom property on `:root`, header re-colors instantly
- Season progress pill: `Week X of 17 · Record W-L · Playoff %% · PF:PA` — text content updates via `textContent`, no re-render
- Game clock ticker during sim weeks: `setInterval` counting down ticks, stops on final score
- Click team disc → quick depth chart popover (absolute positioned, team-colored border, closes on outside click)
- Click record → toggle preseason/regular season view
- Click playoff % → playoff bracket preview (mini tree, 4 rounds)

**Not blocking:** works without JS (static colors), JS adds live updates only

---

## 2. Footer — Team-Colored Season Summary

**Location:** Bottom of page, full width

**CSS:**
- Background: `var(--team-primary)` with `color: #fff` text
- Season summary: `Week X · W-L · Playoff: clinched/not clinched · Next: Opponent`
- Quick-stats row: pass yards, rush yards, turnovers, sacks — each with small trend indicator (▲ green / ▼ red)
- Nav pills: `border: 2px solid var(--team-primary)`, active pill `background: var(--team-primary); color: #fff`

**JS:**
- Update season summary text each week via `textContent`
- Quick-stats: read from current season stats, update with `classList.add('trend-up'/'trend-down')`
- Nav pills: click swaps active class, no page reload (tab switch via existing tab logic)
- Expandable quick-stats: click header → `max-height` animates from 0 to auto

**Not blocking:** static footer works without JS; live updates need JS

---

## 3. Dynamic Panels

### 3a. Draft board rows expand on hover
- CSS: `tr.teamrow:hover { transform: translateY(-2px); box-shadow: 0 8px 22px color-mix(in srgb, var(--team-primary) 35%, transparent); transition: all 0.2s ease; }`
- Click player row → panel slides from right: full player card (40-yard, injuries, awards, flex penalties)
- Panel close: X button or click outside

### 3b. Depth chart slot click → sliding panel
- Click any roster slot → panel slides from right showing all eligible players at that position
- Each player row shows: name, OVR, flex penalty for this slot, "Draft" button
- Click "Draft" → confetti burst + row slides to user's team side

### 3c. Game preview unit click → matchup slide-out
- Click QB, RB, WR, OL, etc. → panel shows matchup advantage bars (pass rush vs protection, etc.)
- Visual bar: `width: X%; background: linear-gradient(90deg, green, red)` based on advantage %

**Not blocking:** static panels work without JS; slide animation needs JS

---

## 4. Micro-Interactions

**CSS:**
- `.teamrow:hover { transform: translateY(-2px); }` (already in 3a)
- `.btn:active { transform: scale(0.95); }`
- `.confetti { position: fixed; top: 50%; left: 50%; animation: confettiBurst 1s ease-out; }`

**JS:**
- Draft click: create 20 confetti divs, random colors, random positions, `animation: confettiBurst`, remove after 1s
- Season clinch: full-screen overlay, typewriter "CONFERENCE CHAMPIONS", trophy pop-up, auto-dismiss after 3s or click

**Not blocking:** works without JS (static), JS adds delight

---

## 5. Conference Championship Rewards

### 5a. Trophy Case Panel
- Location: new section on season review screen or dedicated panel
- Grid: one slot per conference championship won
- Each slot: trophy icon, `filter: grayscale(100%)` if not won, `filter: grayscale(0%)` + `animation: goldShimmer 2s ease-in-out infinite` if won
- Below: chip row showing season years won

### 5b. In-Game Win Overlay
- Trigger: conference championship won
- Overlay: full screen, `rgba(0,0,0,0.85)` backdrop
- Content: team logo large (200px), "CONFERENCE CHAMPIONS" typewriter text (one char at a time), trophy icon `animation: trophyPop 0.6s ease-out`, confetti (same as draft confetti)
- Dismiss: 3s auto or click anywhere

**Not blocking:** overlay works without JS (static HTML/CSS), typewriter needs JS

---

## 6. Typography & Color Polish

**CSS:**
- Accent color: `var(--team-primary)` on primary buttons, link underlines, active tab borders, badge backgrounds
- Panels: `background: linear-gradient(135deg, #1a1a2e, #16213e)` (dark gradient, not flat gray)
- Fonts: monospace for stats (`font-variant-numeric: tabular-nums`), sans-serif for labels, serif for recap text
- Tab switches: `opacity: 0; transform: translateX(10px);` → `opacity: 1; transform: translateX(0);` (0.2s cross-fade + slide)
- Panels slide from right: `transform: translateX(100%)` → `translateX(0)` (0.3s)

**Empty states:**
- "No players drafted yet" → inviting text + "Start Draft" CTA button (team-colored)
- Playoffs not reached → "Keep winning to qualify" + progress bar (width = % of wins needed)

---

## Implementation Notes for Implementer

**File to edit:** `NFL Draft Simulator merged.html` (single file, inline CSS in `<style>`, inline JS in `<script>`)

**CSS injection point:** Add new CSS rules at end of existing `<style>` block, before `</style>`

**JS injection point:** Add new JS at end of existing `<script>` block, before `</script>`; wrap in `DOMContentLoaded` listener

**Team color mapping:** Already exists in build (P10-5 / P0-29 team variables). Read existing `--team-primary` variables and reuse.

**No new files needed:** Everything inline in the single HTML file.

**What to avoid:**
- Do not edit `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC` coefficients, `PLAN_K`, `RATING_SPECS`
- Do not add paid APIs, CDN dependencies, or build steps
- Do not split the single HTML file
- Do not change `modelWeights()` / `slotWinsPerOvr()` math

**Success criteria:**
- Header re-colors when team changes (CSS custom property update)
- Footer shows live season stats
- Draft row hover has lift animation
- Conference championship overlay shows on win (or static mockup for testing)
- Tab switches have cross-fade transition
- Empty states show inviting copy + CTA

---

## Optional Enhancements (if implementer has bandwidth)

- Team color picker in header (user can override auto-detected colors)
- Sound effects on draft pick / championship win (Web Audio API, optional toggle)
- Season progress pie chart (SVG, no library)
- "Game of the week" highlight panel

---

## Files to Reference

- `_agents/vl/notes/vl.md` — lane file (this session's context)
- `COUNCIL-BULLETIN.md` — bulletin entry M-VL-20261024-04
- `AGENTS.md` — protected constants rules, ownership protocol
- `NFL Draft Simulator merged.html` — the single product file to edit
