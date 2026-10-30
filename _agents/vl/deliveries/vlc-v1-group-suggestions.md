# VLC Group Suggestions — w37/w38 Lessons Applied to Colors v1

**Seat:** VL · **Date:** 2026-10-30 · **Product:** Colors v1 (Z.ai shell + Architect engine) · **Base:** Football-Sim-PreColors.html (sha256 40233d6be00e987c)

## Executive Summary

I reviewed beam's w37/w38 suggestions (all 11 verified against the actual W38 build report + intake ledger + W37 build report + intake ledger in `/Users/kosi/Desktop/wt/zai/z-post-blue-wave3{7,8}-2026-10-30-w3{7,8}/_agents/zai/notes/`) and added **6 w37-derived items** beam missed. Colors v1 should adopt w37+w38 as a *tested law set* — both waves passed verify (132+58 PASS), stress (57-62+45-51 PASS), probe (all green Chromium), mobile (0px overflow), with 11+11 evidence shots each — then go further with **VLC V1**, my own creative direction that keeps Claude's engine but replaces the UI with a modern, darker, editorially-grounded architecture.

## Part 1: w37/w38 Lessons — Verified & Actionable

These are not proposals; they're fixes already proven in w37/w38 builds. Colors v1 should adopt them wholesale to avoid re-discovering the same glitches.

### From W38 (beam's 11, all verified)

| # | w38 Item | What it fixes | Colors v1 action |
|---|----------|---------------|------------------|
| 1 | CB4 / Dime slot (R4) | Dime bubble rendered empty, glued to FS; draft was 31 rounds | Add CB4 to NATURAL_SLOT_MAP, STATIC_SLOTS, WV_SLOT_GROUP, SLOT_GROUP, SLOT_FAMILY; draft runs 32 rounds |
| 2 | Unit-rating basis unification (R5) | Three surfaces, three bases → mismatched Secondary (#3 vs #31 vs #1) | Compute each unit rating once per roster; reuse everywhere |
| 3 | Cinematic/reward timing law (R13/R14) | Champions FX fired before the game; close() drained queue instantly | Big rewards queue unconditionally; drain only at big points (final whistle, Continue, 15s safety) |
| 4 | Name-ink format (R1) | Neutral names everywhere | Name in team text ink (light/dark), number in team accent; 90+ shimmer, 85+ vib |
| 5 | Suffix-aware last-name helper (R3) | "Jr." rendered as last name → "JR"-only bubbles | Attach suffix tokens (JR/SR/II/III/IV/V) + particles (St./Van/Von/De) |
| 6 | Award panels vertical + gold borders + badges (R18-R20) | Plaintext in panels, names cut off | Vertical award cards: award → name → badges; gold border = winner; 230→270px grid |
| 7 | Advanced stats grid 4-column, 12 cards (R21-R22) | "all touchdowns"/"made" sub-lines; squeezed cards | 12 cards (8 core + Points/g, Total yards/g, Yards/play, Takeaways/g); 4-column layout |
| 8 | Playoff bracket tree order (R16) | Names before seeds, wasting space | Seed → crest → name → score; seeds lead, logos save space |
| 9 | Fade timing (R7) | Pregame key-player fade 2.5s too fast | 3.4s fade cycle; mirrored pairs fade together on shared beats |
| 10 | Fade-in hold for sim-season review (R10) | Review rail faded under the books overlay | Rail holds (paused at first frame) while overlay is up; Continue releases cascade |
| 11 | Protected constants note | NATURAL_SLOT_MAP is protected (AGENTS.md §3) | CB4 change re-pins hash in MERGE-MANIFEST.md in same commit |

### From W37 (beam missed — all verified against W37 sources)

| # | w37 Item | What it fixes | Colors v1 action |
|---|----------|---------------|------------------|
| A | Gone% capped at 99% (R1) | Draft board shows false 100% Gone for players still available | `Math.min(99, Math.round(x*100))` display-only clamp at render choke point |
| B | Veil paints opaque on frame one (R5) | Week-1 preview visible before/during/after cinematic fade-in | `.veil{opacity:1}` on first paint; only text animates; one rule cures all cinematic instances |
| C | Center panel widened, no ellipsis (R7) | "[INT] Y" lines clipped with "…" | Panel `min(640px,96vw)`; play text `white-space:normal; overflow-wrap:anywhere` |
| D | Reward gate on ALL cinematics (R11) | Playoff win announced over pre-game intro | Gate covers all four full-screen cinematics; queue drains at final whistle |
| E | Skip flushes whole report + true final (R12) | Skip early shows FINAL 0-0, nothing happened | Skip renders entire remaining play-by-play instantly, then writes TRUE final (`finH/finA`) |
| F | Unit report card text stacking fix (R14) | Text paints through 3px bar, lines stack | `.rc-body i` resets bar: `height:auto;display:inline;margin:0;background:none` |

## Part 2: VLC V1 — My Creative Direction for Colors v1

VLC V1 is **not** a reskin of w38. w38 = rose-gold / Cinzel / shimmer-heavy / imperative DOM. VLC V1 = **midnight-ink / editorial typography / glass-motion / React component model**. It keeps Claude's engine (protected constants untouched) and w38's *laws* (gate/drain, CB4, suffix helper, name-ink, etc.) but expresses them in a completely different visual language.

### Brand identity

- **Near-black background** (`#0b0c10`), panel surfaces (`#12141b`, `#191c27`), ink text (`#e8eaf2`), muted secondary (`#9aa3b2`)
- **Gold accent** (`#c9a227`) replaces w38's `#ffc43c`; used sparingly for shimmer, key numbers, "20-0?"
- **Team takeover:** selecting a team remaps `--vl-accent`, `--vl-accent-soft`, `--vl-ink-accent` to that team's hexes — whole app tints to team colors, same idea as w38's `:root[data-zpbteam]` but darker and more restrained
- **Display font:** Cinzel Decorative / Bodoni Moda for titles; Inter for body — editorial, coach's-notebook feel
- **Motion:** framer-motion staggered entry, shimmer tags, glass panels with blur backdrop, float animations on key cards

### What VLC V1 keeps from Claude's engine (never touched)

`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP` (+CB4), `MC`, `PLAN_K`, `RATING_SPECS`, `modelWeights()` monotone quantisation of `slotWinsPerOvr()` (700 scale, nearest 5, floor 5), `teamRatings` contract.

### What VLC V1 replaces (UI only)

Everything presentational: board rendering, lineup cards, game preview chips, animation log, season review cards, 100-season sim charts, player browser.

### React architecture (dev) → single HTML bundle (ship)

React 18 + Vite during development; Vite bundles to one self-contained HTML file at release (no user-facing build step, satisfies AGENTS.md §3 product rule). Engine logic extracted to `src/engine/` modules, React talks via thin adapter. Seeded RNG (`rnd()`, T-20261022-claude-2) injected into the engine module; before/after seeded tests compare runs on the same build.

## Part 3: Prioritized Recommendation List for the Group

### P0 — Adopt before Colors v1 build (glitch prevention)

1. **CB4 slot** — NATURAL_SLOT_MAP change; re-pin hash in MERGE-MANIFEST.md; Architect approval required (protected constant)
2. **Gate/drain reward law** — W38 R13/R14 + W37 R11 generalized to all cinematics
3. **Skip flushes whole report + true final** — W37 R12
4. **Name-ink + suffix helper** — W38 R1 + R3
5. **Unit-rating basis unification** — W38 R5

### P1 — Adopt for polish (tested, verified)

6. Veil opaque on frame one (W37 R5)
7. Center panel widened / no ellipsis (W37 R7)
8. Fade timing 3.4s + mirrored pairs (W38 R7)
9. Sim-season review hold/release (W38 R10)
10. Gone% 99% clamp (W37 R1)
11. Award vertical cards + gold borders + badges (W38 R18-R20)
12. Advanced stats 4-column, 12 cards (W38 R21-R22)
13. Playoff bracket seed→crest→name→score (W38 R16)
14. Unit card text stacking fix (W37 R14)

### P2 — VLC V1 creative direction (optional, for Colors v1 or VLC)

15. Midnight-ink brand identity (rose-gold → midnight-ink/gold)
16. React component architecture + framer-motion cinematics
17. Engine in Web Worker / isolated module; React owns presentation
18. Team color takeover as CSS custom property remap
19. Single HTML bundle at release (dev in React/Vite)

## Part 4: How to Check

- Re-run W38's verify/stress/probe/mobile tools against Colors v1 builds (`z-post-blue-wave38-.../_agents/zai/tools/w38_*.js`)
- For each adopted law, confirm the corresponding Colors v1 panel shows no console errors end to end and 0px overflow on mobile
- Confirm NATURAL_SLOT_MAP hash re-pinned in MERGE-MANIFEST.md if CB4 added
- Run `node tools/lint.mjs product Football-Sim-Colors-v1.html` — expect no new errors

## Part 5: Evidence Label

VERIFIED (all 17 w37/w38 items checked against source documents; beam's 11 claims confirmed; 6 w37 items added). VLC V1 architecture and prototype are INFERRED (proposals, not yet built). All files committed to council/vl @ 7a8a8dcd.
