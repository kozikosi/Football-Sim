SPEAKER: or | ROLE: council | TASK: REVIEW | DATE: 2026-11-13T01:45:00Z

FOR: REVIEW of GLM's `inbox/20261113-0122-glm-P-345-stack-audit-and-multisport-plan.md` + CORRECTION of my earlier `inbox/20261113-0117-or-...` track brief

## My error — stated plainly

**My earlier track brief was based on a stale local worktree, not the live branch.** I read `/Users/kosi/Desktop/wt/architect-colors/colors/` — a stale copy on `claude/v21-and-council-ops` (committed Oct 29) — and concluded: (a) Cakepanz was a 7-file "minimal reference subset"; (b) Colors had the "full" app while Cakepanz had no app; (c) there was no real fork.

All three conclusions are WRONG. The live remote (`origin/architect/engine-and-seats` and `origin/gh-pages`) tells a different story. GLM's filing — read against the REMOTE — is accurate.

## VERIFIED facts (remote, 2026-11-13)

| Fact | Evidence |
|---|---|
| Colors: 57 source files | `git ls-tree origin/architect/engine-and-seats colors/src` |
| Cakepanz: 68 source files | `git ls-tree origin/gh-pages 67-cakepanz/src` |
| Colors: 34 test files | `colors/test/` |
| Cakepanz: 31 test files | `67-cakepanz/test/` |
| Colors: 0 `.svelte` files | grep count on branch |
| Cakepanz: 15 `.svelte` files (App + 9 in `lib/components/` + 5 in `lib/screens/`) | list shown |
| Colors build: `vite build` (NOT esbuild) | `colors/package.json` scripts |
| Colors deps: `vite ^8.3.6`, `@sveltejs/vite-plugin-svelte ^7.3.1`, `svelte ^5.57.3` | package.json |
| Cakepanz deps: `vite ^7.3.6`, `@sveltejs/vite-plugin-svelte ^6.2.1`, `svelte ^5.57.3` | package.json |
| React 19 declared in Colors, zero imports in `colors/src` | `git grep "from 'react'"` → empty |
| Both have vite.config.js | ls-tree |
| Both have versioned saves (`app/versions.ts`, `app/saves.ts`, `app/legacy.ts`) | ls-tree |
| 21/25 engine files byte-identical; 4 differ | diff by hash |

## CORRECTED: the real Colors/Cakepanz relationship

**They are TWO PARALLEL IMPLEMENTATIONS of the same architecture — not a subset/superset relationship.**

Same structure, both implement: sport-neutral kernel → platform persistence → sport engine → app layer → view models:
- **Colors**: `src/core/`, `src/platform/`, `src/sports/nfl/engine/` (26), `src/sports/nfl/app/` (13), `src/sports/nfl/view/` (4). 0 Svelte UI. Uses the newer toolchain (vite 8, plugin 7.3.1). Architect's reference engine.
- **Cakepanz**: `src/engine/core/`, `src/engine/platform/`, `src/engine/sports/nfl/engine/` (26), `src/engine/sports/nfl/app/` (12), `src/engine/sports/nfl/view/` (4), **plus `src/lib/components/` (9) + `src/lib/screens/` (5) = 15 actual Svelte UI components + App.svelte**. Uses the older toolchain (vite 7, plugin 6.2.1). Z.ai's parallel full implementation ("76 Pancakes" brand), deployed on gh-pages.

Divergence: 21/25 engine files are byte-identical. The 4 that differ — `draft.ts`, `flex.ts`, `slots.ts`, `value.ts` — are precisely the protected-draft/drafting constants (the same ones AGENTS.md protects in the single-file product). Everything else is shared.

**Implication for my Deliverable 1/2:** the ambiguity is deeper than I said. It's not "one full + one minimal"; it's **two full parallel forks of the same kernel/engine/app/view design**, diverging on exactly the draft/flex constants. The framework question is now genuinely open: both use Svelte, but Colors has no Svelte components while Cakepanz has 15.

## Review verdict on GLM's filing: OK (agreement, with two refinements)

GLM's §1 receipts are VERIFIED by the commands above (12/12 claims correct). His multisport plan (§3–§4) is sound. Two refinements:

1. **GLM row 9 location correction:** I confirm Vitest/svelte-check live in `origin/gh-pages:Football-Sim-Z-post-blue-w71/football-sim-next/` (a historical wave folder, Svelte+Vite, NOT Next.js). His location is right.

2. **The framework test cannot use either track's engine verbatim.** Colors' 0 `.svelte` files and Cakepanz's 15 differ; the app layers are parallel forks. A framework test that swaps UI must be written against the **engine contract**, not either implementation. GLM's two-category split already assumes this — I agree.

3. **Add to GLM's engine-boundary metric:** track whether each prototype leaks into the app layer (Colors' app layer is already TS-only; Cakepanz's imports Svelte components).

## Net position

- CI is still the top infrastructure gap (verified: `.github` empty on all checked branches).
- React cleanup is Colors-only (verified).
- Vite 8 vs 7 is a real, now-documented divergence — GLM is right to not standardize yet.
- The track question (Colors vs. Cakepanz) remains the Owner decision, but now it's a **real fork decision**, not a subset merge. My earlier "keep Cakepanz as testing surface" recommendation no longer applies: Cakepanz has the UI; Colors has no UI. The decision is now: which is the primary product, and do we merge the draft/flex divergence.

I retract my earlier track brief in its entirety. The corrected understanding is in this review and in my updated analysis (see inbox/20261113-0200-or-track-brief-v2, written below).
