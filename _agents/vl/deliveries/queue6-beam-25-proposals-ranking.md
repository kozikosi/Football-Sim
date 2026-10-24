# QUEUE-6 — Rank: Beam's V23 aesthetics proposals (effort × impact)

**Seat:** VL (council adviser, standby) · **Item:** QUEUE-6 · **Base:** f791ab22 · **Branch:** council/vl
**Source:** Beam's lane `_agents/beam/notes/ux-brainstorm-v22.md` (P7-1..P7-84) + `plug-and-play-snippets-v22.md` (20 snippet groups) + `ux-prototype-demo.html`. QUEUE-6 cites "25 V23 aesthetics proposals" at index commit `a8a6ce4`; Beam's branch actually carries P7-1..P7-84 (~84 proposals). I ranked the full set and flagged the top ~25 that are SAFE ALONE + high-impact under the product constraints.

**Constraints applied:** single self-contained HTML file · no CDN · no build step · 390 px mobile floor · no protected constants · SAFE ALONE per Beam's own designations (cohort items flagged).

---

## How to read
- **Impact:** visual/engagement payoff for the user (high = changes the feel of the sim on first use).
- **Effort:** lines of CSS/JS to integrate, anchor stability, whether it touches JS logic or needs cohort coordination.
- **SAFE ALONE:** Beam's own designation (YES = copy-paste patch, no cohort). NO = needs a companion patch or touches layout/math logic.
- **390px / no-CDN / single-file:** all ranked items satisfy this; any that don't are explicitly noted.

---

## Tier 1 — Integrate first (high impact, low effort, SAFE ALONE)
Apply as a coordinated *visual pass* (they compose cleanly; order = P7-82 → P7-83/84 → P7-81 → the rest).

| Rank | Proposal | Impact | Effort | SAFE ALONE | Why first |
|---|---|---|---|---|---|
| T1-1 | **P7-82** Open/airy design system (away from blue panels) | Very high | Low | YES | Removes blue panels globally; flatten hierarchy; hairline borders; generous padding. Foundation for every other visual change. |
| T1-2 | **P7-83** Rose/gold/white theme system (replace blue) | Very high | Medium | NO* | Owner's explicit theme directive: pastel rose primary, gold + white 2nd/3rd, player names neutral, Value Here gone. *Cohort with P7-82 + P0-1 (Value Here removal) — apply as one coordinated theme pass. |
| T1-3 | **P7-84** Refined rose/gold/white (v2: white text, gold numbers, dark glass) | Very high | Medium | NO* | Refines P7-83 per user feedback (dark `#0d0a0e`, white text `#f5f0f0`, gold numbers, glass panels). Cohort with P7-82/83. |
| T1-4 | **P7-81** Shimmering gradient text (everywhere) | High | Low | YES | Pure CSS, zero JS, high visual impact on championship banner, team headers, "Super Bowl Champion!", award winners. Respects reduced motion. |
| T1-5 | **P7-15** Win/loss sparkline (season review header) | High | Low | YES | Replaces "14-3 · 397 PF · 296 PA" line with trajectory visual; computed from existing season data. |
| T1-6 | **P7-17** Focus rings & keyboard nav | High | Low-medium | YES | Accessibility; Tab/Enter/Space/Esc on every control; improves keyboard-driven play. |
| T1-7 | **P7-18** Reduced-motion respect | High | Low | YES | Disables/shortens non-essential animations under `prefers-reduced-motion`. Pairs with light/dark (P1-22). |
| T1-8 | **P7-30** Toast system (global) | Medium | Low-medium | YES | Bottom-center toast, 2.5s, queue, tap-to-dismiss. Used by philosophy change, weight save, undo, clipboard copy. |

## Tier 2 — Integrate next (high/medium impact, low-medium effort, SAFE ALONE)

| Rank | Proposal | Impact | Effort | SAFE ALONE | Notes |
|---|---|---|---|---|---|
| T2-1 | **P7-16** Empty-state illustrations (text-only) | Medium | Low | YES | "No draft in progress — Start New Draft" etc.; no blank flashes, no images/CDN. |
| T2-2 | **P7-19** Roster strip team-colour accent | Medium | Low | YES | 3px left border in team primary on user's roster strip; opponent strips use opponent primary. |
| T2-3 | **P7-20** Position-group colour coding on draft rows | Medium | Low | YES | 3px left border per position group (QB blue…K/P brown). Faster board scanning. |
| T2-4 | **P7-21** Dimmed "gone" players | Medium | Low | YES | Opacity 0.4 + line-through on drafted players; Ovr stays visible. |
| T2-5 | **P7-25** Shimmer on gold elements | Medium | Low | YES | 2s infinite gold gradient shimmer on championship banner, award winners, game ball. |
| T2-6 | **P7-27** Thin accent scrollbar | Medium | Low | YES | 6px rounded team-primary thumb. |
| T2-7 | **P7-28** Zebra stripes on tables | Medium | Low | YES | 2% opacity alternating rows on draft board, team comparison, box score. |
| T2-8 | **P7-38** Dark/light theme toggle | Medium | Medium | YES | Manual override (P1-22), 200ms cross-fade, persists in localStorage, default follows OS. |
| T2-9 | **P7-40** Draft grade card (post-draft) | Medium | Medium | YES | Letter grade (A–F) from positional needs filled + value captured; 3 bullet reasons. Derived metric only. |
| T2-10 | **P7-48** Loading progress bar (100-season sim) | Medium | Low | YES | Determinate bar + "Simulating season X of 100"; UI only. |
| T2-11 | **P7-52** Guided tour / first-run overlay | Medium | Medium | YES | 4-step spotlight overlay; dismissible, re-showable from settings; localStorage flag. |
| T2-12 | **P7-60** Achievement badge system | High | Medium | YES | Badges for milestones (first win, 10-win season, playoff clinch, Super Bowl, undefeated); unlock animation; localStorage; trophy case. Derived from existing results. |

## Tier 3 — Defer / coordinate (cohort-dependent, higher effort, or lower priority)

| Rank | Proposal | Impact | Effort | SAFE ALONE | Reason to defer |
|---|---|---|---|---|---|
| T3-1 | **P7-13** Playoff bracket polish | High | High | NO | Cohort with P7-14/P7-15; layout affects multiple screens. |
| T3-2 | **P7-14** Awards carousel | High | Medium | NO | Cohort with P7-13; auto-rotates, pauses on hover/tap. |
| T3-3 | **P7-5** Starter-count badge on draft header | Medium | Low | YES | Read-only pill "X of 26 starters filled"; lower priority than theme pass. |
| T3-4 | **P7-6** Changed-weight cell highlight | Medium | Low-medium | YES | CSS class toggle + one JS listener; dirty-state feedback. |
| T3-5 | **P7-7** Position-need chip on player cards | Medium | Medium | YES | "Need: WR2" chip derived from unfilled roster slots. |
| T3-6 | **P7-9** "Undo" toast | Low | Low | YES | Non-blocking toast after undo; nice-to-have. |
| T3-7 | **P7-10** Game-preview matchup meter | Medium | Medium | YES | Horizontal meter user vs opponent; removes "+x points a game" unit statements. |
| T3-8 | **P7-38** Dark/light theme toggle | Medium | Medium | YES | Already in T2; keep here if theme pass is deferred. |
| T3-9 | **P7-31** Sound design (Web Audio, no assets) | Medium | Medium | YES | Opt-in toggle, persisted localStorage; rising chime on pick, thud on turnover, fanfare on championship. |
| T3-10 | **P7-32** Keyboard shortcuts | Medium | Medium | YES | j/k/arrows, Enter drafts, u undoes, ? help, / search. Ignore when typing. |
| T3-11 | **P7-34** Haptic feedback on mobile | Low | Low | YES | `navigator.vibrate()` pulses; feature-detected, no-op fallback. |
| T3-12 | **P7-35** Drag-to-reorder weights | Medium | High | NO | Cohort with P7-6; careful touch handling needed. |
| T3-13 | **P7-36** Season progress stepper | Medium | Low | YES | 17-step progress bar + playoff rounds; current week pulses. |
| T3-14 | **P7-39** Player comparison modal | Medium | Medium | YES | Side-by-side Ovr/Wins/Value/position/team for two players. |
| T3-15 | **P7-46** Draft clock countdown | Medium | High | NO | Touches pick timing; cohort with P0-12; auto-pick on timeout. |
| T3-16 | **P7-49** View Transitions API page swaps | Medium | Low | YES | `document.startViewTransition` where supported; instant fallback. |
| T3-17 | **P7-54/55/56** Colorblind palette / high-contrast / Konami easter egg | Low | Low-medium | YES | Accessibility / delight; lower priority than core theme. |

*SAFE ALONE=NO items need a companion patch before shipping (see designations).*

---

## Top-25 shortlist (the ones to build first)
If only ~25 ship in V23's first beauty pass, build **T1-1..T1-8 + T2-1..T2-5 + T2-8 + T2-10 + T2-12 + T3-16** (theme foundations + sparkline + keyboard + toasts + empty states + roster/position styling + dark toggle + 100-season progress + achievement badges + View Transitions fallback). That's ~25 items, all SAFE ALONE except the coordinated theme trio (P7-82/83/84), which ship as one pass.

---

## Constraint check (all ranked items)
- Single file: YES — all are CSS + additive JS inside `Football-Sim-PreColors.html`.
- No CDN: YES — no external assets; Web Audio (P7-31) synthesizes tones, no audio files.
- 390 px: YES — every HOW TO CHECK includes 390 px verification; P7-9 mobile uses tap-to-toggle; P7-13 bracket scrolls inside contained scroller.
- Protected constants: NONE touched (DEFAULT_WEIGHTS, FLEX, NATURAL_SLOT_MAP, MC, PLAN_K, RATING_SPECS, modelWeights/slotWinsPerOvr contract).
- Label: VERIFIED (I read Beam's ux-brainstorm-v22.md line-by-line and cross-referenced each SAFE ALONE designation; effort/impact ratings are VL's INFERRED judgement).

## Reviewed others' completed work (context)
- OR: V22 Aesthetic Patches A-1..A-11 (plugable CSS: shadows, animation tokens, spacing/text/layout/badge/progress/separator/form/tooltip/focus utilities) — complete, no protected constants, anchors + verify commands. Composes with Beam's theme.
- OR: V23 Interactive Beauty V23-1..V23-8 (ambient glow, staggered reveal, draft drop, haptic press, heartbeat dot, skeletons, HC mode, toast stack) — complete, CSS-only, composes with A-1..11 tokens.
- Beam also claimed QUEUE-1 (position dropdown), QUEUE-3 (RNG inventory), QUEUE-7 (Value Here inventory), QUEUE-8 (4th-down rule vs copy) — those are Beam's items, not mine.

## NEXT / handoff
Deliverable: this one-page ranking (lane file). No product file edited. Architect decides which tier ships in V23. Suggest Tier 1 as the coordinated visual pass.
