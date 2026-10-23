# V22-STRUCTURE.md — Execution Plan for Claude (Architect)

**Build under test:** `NFL Draft Simulator merged.html` sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (656,746 B) @ `merge/v20-donor` `ff8c05ae`  
**Reference build:** `NFL Draft Simulator v20 Claude.html` sha256 `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` (649,032 B) — **this is V20, never call it V21**  
**Date:** 2026-10-22 | **Author:** DS (Draft Simulator) | **Lane:** `_agents/nemotron-3-ultra-free/notes/`

---

## STOP LIST — Things Claude Must Not Do

1. **No protected constant changes beyond Owner's explicit flex ruling** — `FLEX`, `NATURAL_SLOT_MAP`, `DEFAULT_WEIGHTS`, `MC` coefficients, `PLAN_K`, `RATING_SPECS` are locked. The Owner's 21 Oct feedback approves the flex rule changes (P0-17/P10-1) — that is the **only** protected-constant exception.
2. **No V20 build described as V21** — The reference build is V20 (Claude's lineage, Owner ruling R2). The candidate `merged.html` is a V21 *candidate*. V22 is the deliverable after verification.
3. **No number moved without a seeded comparison** — The build has 58 unseeded `Math.random()` sites. Every comparison must use the seeded A/B method (install seeded `Math.random` via `Page.addScriptToEvaluateOnNewDocument` before page scripts run, then drive identical clicks in both builds).
4. **No batch-apply without intermediate verification** — Run `node --check` on extracted script after each edit. Verify with 390px gate (`tests/e2e-smoke.mjs`) and 100-season smoke (rebuild `pw4.js` first, target r > 0.6).
5. **No hand-edit evidence files** — `result.json` etc. are read-only.
6. **No split of the single HTML file** — unless explicitly requested by Owner.
7. **No git commits/branches/PRs** — unless asked.
8. **No CDN dependencies, paid APIs, or build steps** — single-file HTML only.

---

## ROUND GROUPING

| Round | Date | Theme | Source | P0 Items | P1 Items | P2 Items |
|-------|------|-------|--------|----------|----------|----------|
| **R1** | 2026-10-20 | Ten-item directive | BOC/Downer | P0-1 through P0-14 | P1-1 through P1-19 | P2-1 through P2-5 |
| **R2** | 2026-10-21 (23:00) | Flex rules + text overhaul | MiniMax (Owner feedback wave 1) | P0-15, P0-16, P0-17 | P10-1 through P10-3 | P4 items 1-4 |
| **R3** | 2026-10-21 (late) | Graphics + motion | Owner feedback wave 2 + MOC | P0-18 through P0-25 | P10-4 through P10-8, P1-27 through P1-40 (dupes) | — |

### Items Not Assigned to Any Round
- P7-1 through P7-7 (Beam aesthetics) — conceptual, no Figma yet
- P8-1 through P8-8 (Council-only notes) — not for implementation
- P9-1 through P9-3 (Mermaid diagrams) — design artifacts
- P1-14 through P1-19 (All-time pool, architecture, NBA/Soccer) — future work, not V22
- P1-32 through P1-33 (Invented ratings, archived sessions) — cleanup, not V22 blocker
- P2-2 through P2-5 (Architecture, pool rules, cleanup, Week 1 E2E) — Owner decisions, not implementation

---

## HOUSE FORM — One Per Change (WHERE · WHAT · WHY · SAFE ALONE? · HOW TO CHECK)

### R1 — Ten-Item Directive (20 Oct)

| # | Item | WHERE | WHAT | WHY | SAFE ALONE? | HOW TO CHECK |
|---|------|-------|------|-----|-------------|--------------|
| 1 | Remove "Value Here" column | `merged.html` CSS l.268, l.269; HTML l.418, l.426, l.1766, l.1768; Guide l.4991, l.5056 | Delete CSS rule, widen priority column, remove sort option, header, cell, colspan 10→9, Guide bullet, section title | Owner: "Value Here" confuses; priority bar is the signal | Yes | MOC verified: headers 10→9, cells 1,148→0, console 0, `node --check` PASS |
| 2 | Remove "MORE" from tab footer | `merged.html` l.439 | Delete `<span class="footlabel">More</span>` | Cleaner nav | Yes | Visual: footer tabs render without "More" |
| 3 | Move badges under weights | `merged.html` l.548, l.624-627, l.631 | Remove badges from team row; add `<div id="badgeStrip">` below weights buttons | Badges distract in rankings table | Yes | Visual: badges appear only in strip under buttons |
| 4 | "Use model weights" → "Default" | `merged.html` l.548 | Rename button text | Clearer label | Yes | Visual: button reads "Default" |
| 5 | "Back to my weights" → "Save My Weights" (conditional) | `merged.html` l.548 | Rename; opacity 0.45 + pointer-events:none until weight changed; then blue + "My Weights" | Prevents accidental saves | Needs P0-6 (dirty flag) | Visual: button disabled until weight changed; `weightsDirty` state works |
| 6 | Weights table label correction | `merged.html` l.~540 | Replace long explanation with "Default is how the draft simulator sees the game." | Simpler | Yes | Visual: label updated |
| 7 | Delete user weights record | `merged.html` (localStorage key `nfl-draft-sim.draft.v1` or in-memory) | Remove any saved user weights; only use `DEFAULT_WEIGHTS` | Fresh start | Yes | Console: no user weights loaded on refresh |
| 8 | Player browser: ~15 players desktop | `merged.html` l.791 `renderPlayers` | Cap at 15 desktop / 10 mobile; "Show more" incremental; reset `_pageSize` on filter; footer tabs sticky bottom (CSS l.239) | Performance + UX | Yes | Visual: 15 rows, "Show more" works, footer tabs stuck at 390px |
| 9 | Position Rankings: complete combos | `merged.html` Position Rankings dropdown | All offense combos (QB → QB+WR1+OT1+OT2...→WR3); all defense (CB1 → CB1+DE1+CB2+DE2...→DT2); combined start QB+CB1; plural "s"; "WR1-3"→"WR1+WR2+WR3"; "CB1-4"→"CB1+CB2+CB3+CB4" | Completeness | Yes | Visual: dropdown has all combos, no dupes, correct labels |
| 10 | Team Comparison fixes | `merged.html` l.823, l.3364, l.3420, Unit Comparison table | Remove "real" from "Put any two real rosters"; remove disclaimer from TC only; remove parentheses from labels; reorder: Offense (QB, OL, RB, WR, TE, Run, Pass) then Defense (DL, LB, Sec, Run D, Pass D); default Chiefs vs Raiders | Cleaner comparison | Yes | Visual: TC page matches spec |
| 11 | Guide page changes | `merged.html` Guide section | Remove "Value Here" bullet; remove "(never below 76...)"; "Flexing players, explained"→"Flexing"; never "tackle" alone; combine "Position Values" + "Drafting" → "Drafting & Position Values"; "WR1-3"→"WR1+WR2+WR3"; remove "Wins 70→90" column; remove "x wins from 70→90 upgrade"; remove Guide box header; rewrite "Play the season..." | Consistency with P0-1 | Yes | Visual: Guide box gone, flex table QB-first, merged section |
| 12 | Draft board V22 changes | `merged.html` l.1488, l.405, l.403, l.405, l.187, l.1778, l.1731, l.1764, l.432 | Remove "(Round 1)", right-align round; "Undo my last pick"→"Undo"; "You're on clock" bigger (1.15rem); max-height 640→704px; "1 of 26 starters..." to bottom; static wins display; "also fits: CB1 +1.37"→"also CB1 (−2 flex)"; mobile collapse; "Pick order / Depth chart"→"Your Roster / Depth Chart. Pick Order" | Draft UX | Yes | Visual: board renders per spec |
| 13 | Week 1 display | `merged.html` l.3891 | Build renders "Week 1 of 17" — E2E check not implemented | Verification gate | Needs P1-27/P1-28 | E2E: `tests/e2e-smoke.mjs` detects "Week 1 of 17" |
| 14 | 390px P0: `#startSeasonBtn` below fold | `merged.html` preseason `#startSeasonBtn` at top=963 in 844px viewport | Move button above fold OR change gate to check vertical axis | Release blocker | Yes | `tests/e2e-smoke.mjs` PASS (A/B/C/D true, 0 overflow) |

---

### R2 — Flex Rules + Text Overhaul (21 Oct 23:00)

| # | Item | WHERE | WHAT | WHY | SAFE ALONE? | HOW TO CHECK |
|---|------|-------|------|-----|-------------|--------------|
| 15 | Coaching philosophy unlocked all season | `merged.html` l.3544, l.3556 `seasonState.scriptLocked` | Remove lock for USER team (CPU keeps); re-render controls in season view; update description | Owner: "should be available all season" | **Needs P0-17** (flex rules touch same area) | Functional: philosophy/aggressiveness editable in regular season |
| 16 | Base defense selection (3-4 vs 4-3) | `merged.html` Draft setup + Preseason page | Add 3-4/4-3 selector; 3-4 order: DE1, DT1 (Nose), DE2, OLB1, ILB1, ILB2, OLB2; OLB=WILL value, ILB=MIKE value; explain CB3/Nickel on → LB3/SAM off | Owner request | **Needs Owner decision OD-F1** (alias vs new slots) | Visual: selector present; depth chart labels switch; math uses correct values |
| 17 | Flex rules overhaul (PROTECTED) | `merged.html` l.939-952 `LB_FLEX` + `FLEX` tables | **Owner-approved protected constant change:** Replace `LB_FLEX` with `LB_FLEX_WILL` + `LB_FLEX_MIKE`; update `FLEX` per Owner's table (Edges no penalty at OLB/WILL/SAM; OLB/WILL/SAM→FS−6, SS−4, Edge−2, CB3−2; MIKE→DT−4, SS−2; SS→CB3 free, FS/OLB/WILL/SAM−2; CB→OLB/WILL/SAM−4, MIKE−6; TE→WR−2, RB−4); chart in draft-roster order QB-first; "Third corner"→"CB3 / Nickel"; remove RB −6/−8 fallback from preseason | Owner feedback | **Needs Owner decision OD-F1** (alias vs new slots) | `node --check`; seeded A/B: draft board flex display correct; CPU draft unaffected |
| 18 | Preseason menu copy | `merged.html` preseason controls | Philosophy: "Your coaching philosophy is how your team likes to play by default. It names your team's style, and Opponents scout it..." (remove ", on offense and on defense. It names your team's style all season, and"); model: "The model tries..." (not "tried"); remove one "label stays same" sentence; dropdown text larger; Cautious: "fewer field goals"; Balanced: "Balanced Approach: ...4th & short when in opponent's territory" (verify math); Aggressive: "More 2-Pt Conversions..." + smaller follow-on; "2-Pt Conv"→"2-Pt Conversion"; remove RB fallback; beautify descriptions | Owner feedback | Yes (except Balanced 4th-down math) | Visual: text matches; **Balanced 4th-down must be verified against model** |
| 19 | Game preview text | `merged.html` `generateGameSummary` / preview rendering | Add "(Chiefs)"/"(Vikings)" after units; "Under center for Chiefs is Stafford..."; delete "All eyes on Gonzalez"; remove all "+x pts/game" for single units; overall margin "+3.3"; em-dashes→periods; defensive labels: "Nickel · Pass Protection" / "Nickel · Run Defense" / "Nickel" (no subtitles); lineups under game plan | Owner feedback | Yes | Visual: preview matches spec |
| 20 | Game review text | `merged.html` `generateGameSummary` / recap rendering | Start with "1st Quarter"; remove opening narrative; "1st/2nd/3rd/4th"; fix blocked XP in 0-0 Q→FG; box-score lines "Rushing TD · Swift (Chiefs 7-0)"; turnovers: "Chiefs 1 - 0 Vikings" + "Johnson INT (4th Q)"; Stars: ✨ heading, ≥60 yds offensive, 90+ rating internal; remove single-unit "+x pts"; overall "+3.3"; pass rush: 1-2=mid, 3+=exceptional; "Chiefs move to 1-0" own para; game plans hidden dropdown; game ball in Key Players | Owner feedback | **Needs P0-17** (flex affects ratings) | Visual: recap matches spec; no console errors |
| 21 | Season review + 100-season | `merged.html` `renderSeasonTab`, `render100` | Win banner: larger, centered, 3s, shimmer; conference charts 1-16; March Madness bracket; awards gold for user; recap graphical (stat cards, player lines); remove "Early picks...", "What separated..." hidden click-to-reveal; "59 Sacked"; "Advanced Stats" rename; condensed click-to-expand; bye week shows likely matchup; "Lineup and flexes" not at top in playoffs; season review button blue top near 100-season; 100-season graphical | Owner feedback | **Needs OD-M1** (bracket design) | Visual: season review matches spec; bracket renders |
| 22 | Stars, hype, typography | `merged.html` Stars section, champion text | Stars table beautiful; offensive ≥60 yds, 90+ rating slots; "Stars of the game:"→✨; "Chiefs are Super Bowl champions!" beautiful + !; typography fade into page | Owner feedback | Yes | Visual: matches spec |

---

### R3 — Graphics + Motion (21 Oct Late) — Canonical: P0-25

| # | Item | WHERE | WHAT | WHY | SAFE ALONE? | HOW TO CHECK |
|---|------|-------|------|-----|-------------|--------------|
| 23 | Motion vocabulary (17 tokens) | `merged.html` `<style>` block | Add keyframes + CSS classes: `--motion-slide-up/down/right`, `--motion-scale-in/out`, `--motion-fade-in/out`, `--motion-draw`, `--motion-text-reveal`, `--motion-stagger`, `--motion-pulse/shimmer/glow/bounce`, `--motion-count`, `--motion-typewriter` | Foundation | Yes | DevTools: all keyframes present |
| 24 | Application map (48 hooks) | `merged.html` render functions | Attach motion tokens to: Draft Board (stagger, bounce, draw), Week Page (slide-up, draw), Game Recap (text-reveal, slide-right, bounce, glow), Season Review (bounce+shimmer, draw, slide-up), 100-Season (draw, slide-up), Banners (fxpop, fxshine, glow) | Per-screen motion | Yes | DevTools Animation inspector: each hook fires |
| 25 | Gold champion theme | `merged.html` `<style>` block | CSS variables `--gold-100`...`--gold-900`, `--gold-gradient`, `--gold-gradient-radial`, `--gold-glow`; `.champion-banner--gold` (radial + shimmer + glow); `.superbowl-champion-text` (gradient text + pop-in); `.divider--gold`, `.badge--gold` | Visual identity | Yes | Visual: champion banner shimmers, glows, gold text on SB win |
| 26 | Reusable components (8) | `merged.html` `<style>` + render fns | Stat Card, Bar Row, Two-Column, Star Card, Quarter Card, Turnover Line, Bracket Node, Award Row — each with motion tokens + data props | DRY graphics | Yes | Visual: components render consistently across screens |
| 27 | Reduced-motion degradation | `merged.html` `<style>` block | `@media (prefers-reduced-motion: reduce)`: disable ALL animations, transitions, confetti canvas | Accessibility | Yes | OS reduced-motion: all instant, confetti hidden, content readable |
| 28 | New celebrations (6 kinds) | `merged.html` `FX` namespace | Extend `FX.play()`: `div` (division), `playoffs` (berth), `gameball` (star burst), `record` (shatter), `steal` (draft), `upset` (win) — each with banner + confetti config | Delight | **Needs OD-M6** (which subset) | Functional: each trigger works |
| 29 | Exact hooks (22 CSS, 11 keyframes, 9 JS) | `merged.html` `<style>` + `<script>` | Add all classes, keyframes, functions: `FX.play` extensions, `animateNumber`, `typewriterText`, `revealWords`, `observeAndReveal`, `drawSVGPath`, `morphTabIndicator`; call sites in `renderDraftBoard2`, `generateGameSummary`, `renderSeasonTab`, `render100`, `setActiveTab` | Implementation | Yes | `node --check`; no console errors |
| 30 | Performance budgets | Runtime | ≤12 concurrent, ≤400 particles, 60fps, 0 layout thrash, ≤8 GPU layers | 60fps guarantee | Yes | Chrome Performance: frame times < 16.67ms at max confetti |

---

## READING ORDER FOR CLAUDE (20 Minutes)

### 1. FIRST (5 min) — The Contract & Stop List
- Read **STOP LIST** above (this document)
- Read **V22-Suggestions.md** "Five-minute header" (lines 1-21) — build hash, prohibitions, patch protocol
- Read **Priority labels** (lines 23-28) — P0/P1/P2 meaning

### 2. SECOND (10 min) — The Three Rounds (R1→R2→R3)
- **R1 (P0-1 through P0-14):** Draft board fixes, weights, player browser, position rankings, team comparison, guide, draft board V22, Week 1, 390px
- **R2 (P0-15 through P0-17 + P10-1 through P10-4):** Flex rules (protected), 3-4 base, coaching philosophy unlock, preseason copy, game preview/review text, season review text
- **R3 (P0-25 canonical):** Motion vocabulary, application map, gold theme, components, reduced-motion, celebrations, hooks, performance

### 3. THIRD (5 min) — Owner Decisions Blocking Implementation
- **OD-F1 (R2):** 3-4/4-3 implementation — alias mapping vs new slots (P0-16, P0-17, P4#2)
- **OD-M1 (R3):** Bracket design — March Madness vs alternative (P0-25 §9 Phase 5 blocker)
- **Balanced 4th-down math (R2):** Verify model behavior before committing copy (P10-4, P4#1)

### SKIP (Reference Only)
- P7 (Beam aesthetics) — no Figma yet
- P8 (Council notes) — not for implementation
- P9 (Mermaid) — design artifacts
- P1-14 through P1-19, P1-32 through P1-33 — future work
- P2-2 through P2-5 — Owner decisions, not code
- Appendices A-E, F-J — evidence, not instructions
- P1-20 through P1-26 duplicated as P1-34 through P1-40 — ignore second run
- P0-18 through P0-22 duplicated in P10-5 through P10-7 and Owner's brief P2/P3 — use canonical P0-21/P0-22/P0-25

---

## CONTRADICTIONS IN V22-SUGGESTIONS.MD (with Line Numbers)

| # | Contradiction | Lines | Resolution |
|---|---------------|-------|------------|
| 1 | **V21 label on candidate build** — "NFL Draft Simulator merged.html (V21 candidate)" but AGENTS.md says V20 is reference, V22 is deliverable | ~388, ~534, ~2373, ~28663, ~29159, ~37722, ~52598, ~52741, ~148250 | **Call candidate "V21 candidate" but reference is V20. Deliverable is V22. Never call V20 "V21".** |
| 2 | **P1-20 through P1-26 duplicated as P1-34 through P1-40** — identical items | ~2373-2430 and ~2430-2500 | **Ignore second run (P1-34...P1-40). They are exact duplicates.** |
| 3 | **P0-18 through P0-22 appear 3× each** — in P0 section, in P10 section, in Owner's brief P2/P3 | P0: ~13000-14000; P10: ~53000-55000; Owner brief: ~75000-76000 | **Use canonical P0-21/P0-22 for text; P0-25 for motion. Ignore duplicates.** |
| 4 | **Protected constant approval** — P0-17 says "Owner approval was granted via this feedback" but AGENTS.md requires explicit approval artifact | ~13449, ~13517, ~13655, ~40631, ~72205 | **Owner's 21 Oct feedback IS the approval for flex rules only. No other protected constants.** |
| 5 | **Two different build hashes cited** — `044d1759...` (current HEAD) vs `40233d6b...` (original pin) | ~388, ~33420, ~33456, ~33489 | **Current build is `044d1759...` @ `ff8c05ae`. Original pin `40233d6b...` no longer matches any file.** |
| 6 | **P1-28 labeled as P1 but is a P0 (390px gate)** — "390px P0" in P1 section | ~2430 | **Treat as P0. It's the same as P0-14.** |
| 7 | **Week 1 display** — P0-13 says "check not implemented"; P1-27/P1-28 say "protocol change or check implementation" | ~13000, ~2400, ~2430 | **Implement the check against "Week 1 of 17" H3 text + #simWeekBtn. Do not change requirement.** |
| 8 | **DEFAULT_WEIGHTS values** — Appendix D lists Owner's values but says "protected-constant changes requiring explicit approval" | ~48000 | **Owner's Appendix D values are input for discussion, not approved. Current `DEFAULT_WEIGHTS` in build is derived from `modelWeights()` (34/34 match).** |
| 9 | **SAM scarcity** — P1-11 says "5 records for 32 teams (27-player deficit)" but P0-17 flex rules don't address SAM | ~23000 | **SAM scarcity is a P1 (Architect) decision, not fixed in V22 flex overhaul.** |
| 10 | **FB/Punter slots** — P1-12 says "Owner confirmed 28 rounds, no flex cost" but ROSTER_SLOTS=26 | ~23000 | **28 rounds = 26 starters + FB + P. FB/P are dead slots (no consumers in teamRatings).** |

---

## VERIFICATION CHECKLIST (Per P0 Edit)

| # | Check | Command | Expected |
|---|-------|---------|----------|
| 1 | Script syntax | `node --check` on extracted `<script>` | exit 0 |
| 2 | 390px gate | `node tests/e2e-smoke.mjs "<build>" --port 9222` | exit 0, A/B/C/D true, 0 overflow, 0 page errors |
| 3 | 100-season smoke | Rebuild `pw4.js` first, then run | r > 0.6, report renders |
| 4 | Candidate lint | `node _agents/minimax/tools/candidate-lint.mjs "<build>"` | exit 0, 44/44 pins |
| 5 | Visual: Draft board | Open in browser | No "Value here" column; priority bars; no console errors |
| 6 | Visual: Guide | Open in browser | Guide box gone; flex table QB-first; "Drafting & Position Values" present |

---

## FILES TO MODIFY

| File | Purpose |
|------|---------|
| `merged.html` (→ `Football-Sim-V22.html`) | All UI/Guide/motion changes |
| `tests/e2e-smoke.mjs` | Gate fixes: add `inViewport` to `E_viewportUsable`, preseason probe, fix exit codes |
| `_agents/minimax/tools/post-merge-smoke.mjs` | Shared gate sync |
| (rebuild) `pw4.js` | 100-season regression (not in tree — AGENTS.md target) |
| (rebuild) `validate.js` | Real 2025 wins validation (not in tree — AGENTS.md target) |

---

## REFERENCE ONLY (DO NOT MODIFY)

- `NFL Draft Simulator v20 Claude.html` — V20 reference build (sha256 `31b7d61f...`)
- `NFL Draft Simulator.html` — Donor build (Season-first + DS patches)
- `backup-before-reorg/NFL Draft Simulator (GLM verified build).html` — Rollback

---

**END OF STRUCTURE PLAN** — Claude reads this first, then V22-Suggestions.md R1→R2→R3 sections only.