# V23 Integration Guide — Beam's UX/Beauty Deliverables (advisory)

How Claude (Architect) can plug Beam's deliverables into V23. No product file edits here; all paths are in `_agents/beam/notes/`.

## 1. Files delivered
| File | Purpose |
|---|---|
| `ux-brainstorm-v22.md` | P7-1..P7-42 proposals (WHERE/WHAT/WHY/SAFE ALONE/HOW TO CHECK) |
| `plug-and-play-snippets-v22.md` | 915 lines, 24 snippet groups (CSS/JS, copy-paste) |
| `ux-prototype-demo.html` | Self-contained no-CDN demo of snippets (merged OR/VL improvements) |
| `graphics-round-demo.html` | P8 shared components + screens demo |
| `team-color-theming.md` / `team-color-theming-v2.md` | 32-team colour palette + theming flow |
| `p0-20-draft-complete-gate-proposal.md` | P0-20 re-anchored proposal |

## 2. Recommended integration order
1. **Base utility layer (OR A-1..A-11)** — shadows, animation tokens, spacing/text/layout utilities, badges, progress, separators, forms, tooltips, focus-visible. CSS-only, distinct regions, no conflicts.
2. **Semantic colour system (OR §1 / snippets §18)** — `:root` with 15 colours, radius, shadow, transition tokens; light-mode toggle via `data-theme`.
3. **Team colours (Beam + VL)** — `setTeamColors(name)` with `--team-primary/secondary/accent` + `--team-primary-rgb`; `setOppColors(name)` for matchups. Layer on top of the semantic system (team colours override `--accent` when a team is selected).
4. **Motion unification** — adopt `--duration-*` + `--ease-*` (OR) as canonical; alias `--motion-*` (VL) and `--transition-*` (Beam) for compat. Single token family.
5. **Position-group colours + dimmed gone + zebra stripes** (snippets §6, §7, OR A-3).
6. **Glass-morphism modals, accent scrollbar, gradient header** (snippets §8, §9, P7-4).
7. **Toast system, skeleton loading, bottom sheet** (snippets §2, §3, §17).
8. **Graphics round components** (snippets §21, §24) — stat card, bar row, two-col, gold banner, qtr bars, turnover grid, star card, game ball, record banner, sparkline, awards, team tags, matchup meter, champion banner, bracket, conference charts, score boxes, player cards, combo chips, team comparison.
9. **Creative interactions** (snippets §23) — Web Audio synth, keyboard shortcuts, haptics, hover what-if, season stepper, theme toggle, player comparison, draft grade, aria-live, print recap.
10. **VL creative extensions** (snippets §24.8–24.10) — what-if slider, week timeline, game ball ceremony.

## 3. Anchors (Pre-Colors, sha256 40233d6be00e987c)
- `:root{}` block l.14-22 (colour system)
- `.panel` l.32, `.poslist` l.66, `.fxtoast` l.108, `.matchup-card` l.121, `.bracket-game` l.143
- `@keyframes` block l.102-110
- draft board row render ~l.1766
- weights table ~l.540-560
- Guide section ~l.4980-5060
- game preview/recap/season review regions (re-anchor before applying; line numbers are from Pre-Colors but verify)

## 4. What NOT to change
- No protected constants (`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS`).
- No product file edits by anyone but the Architect.
- `modelWeights()` must remain the monotone quantisation of `slotWinsPerOvr()`.
- No CDN, no build step, no split files.

## 5. Verification after integration
- `node --check` on extracted script (`tools/lint.mjs extract`)
- `node tools/lint.mjs product Football-Sim-V23.html` (exit 0 / no new errors)
- `node tests/e2e-smoke.mjs "<build>" --port 9222` (exit 0, 0 overflow, 0 console errors)
- 390 px check: no horizontal scroll, primary actions above fold
- Seeded before/after (`Math.random` seed 135792468) for any change touching simulation math (none of these do — all cosmetic/UI)

## 6. Open questions for the Architect (≤5)
1. Default tab: Owner's "DRAFT hero" implies Draft-first, but P1-20 recommends Season-first. Which wins?
2. Base-defense recommendation chip: auto-suggest or manual-only? (R-7 leaves both open.)
3. Game recap "Share" format: plain text only (no images, no CDN) — confirm.
4. Light/dark override: persist in localStorage — confirm scope.
5. Motion token unification: adopt `--duration-*` + `--ease-*` (OR) as canonical and alias the others?

## 7. What I will not do
No edits to `Football-Sim-*.html`, protected constants, or shared governance files. Proposals and plug-and-play code only, per AGENTS.md §5.
