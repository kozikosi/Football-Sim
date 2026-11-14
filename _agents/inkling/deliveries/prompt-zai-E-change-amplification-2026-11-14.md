# PROMPT — for Z.ai: ONE framework measurement or an honest stop (the Owner's call)
**From:** INKLING (council seat) · **Date:** 2026-11-14 · **For:** Z.ai (Executor)
**Delivery:** folder + MANIFEST; courier protocol. **Gate: this prompt runs only if the Owner relays it; the default is "stop running framework tests until cutover".**

## 0 · Context you need (do not re-derive)
Nine arms, five measured columns, no separator; offline is a build step, not a framework axis; the Owner has not ruled. P-356/357/358/359 (maintainability column, agent-defect-rate harness, conceptual-surface probe, Owner-comprehensibility protocol) are the open instruments; P-356 is the only one with a bounded, low-cost run. The framework candidates in the running are Svelte (`football-sim-svelte`) and Vue (`football-sim-vue`). CLAUDE.md is a symlink to AGENTS.md in both repos (identical blob `47dc3e3d…`); Vue declares `engines ^22.18 || >=24.12`, Svelte uses `.npmrc` `engine-strict=true` with no `engines`; Vue `.gitignore` has no `.env*`, Svelte's has `.env`/`.env.*` (DS's byte-check — receipts there).

## 1 · What to do (ONE deliverable)
Run **one** change-amplification task on both scaffolds, same base bytes, same timebox, and produce two receipts (one per repo): the named change is `titleOdds` — a display-only field in the draft-board view model that shows a placeholder "—" for season win odds (no engine, no probability math in this task — the number is supplied by a stubbed constant and wired through the existing view-model layer so the comparison is *wiring cost*, not modeling). Measure for each: (a) files touched, (b) lines changed, (c) time from clean checkout to green `npm run build` + preview renders with the field present, (d) console errors at preview, (e) any type/lint friction, quoted. Report as a side-by-side table with the commands run. **No verdict. No preference. No winner.** If the timebox expires on either arm, stop and record `TIMEBOX-EXPIRED` — that is a result.

## 2 · What NOT to do
- Do not build Cakepanz, do not port anything; benchmark boxes, not product.
- Do not score "maintainability"; report (a)–(e) only. A score is a ranking and the ruling is not yours.
- Do not touch the engine, the product file, or any seat's branch; work inside each scaffold repo on a scratch branch.
- Do not merge scaffolds; do not open PRs; push nothing to the public repos (local branches only).

## 3 · How to verify (the receipt)
Reviewer re-runs from fresh clones of both repos at the cited SHAs (`6b4de5c…`, `86ba632…`): apply the same change spec, count files/lines via `git diff --stat`, confirm `npm run build` exits 0, preview renders `titleOdds` present in the DOM, zero console errors. Passing = both receipts self-consistent and re-runnable.

## 4 · How to deliver
Two files — `vue-titleOdds.log`, `svelte-titleOdds.log` — plus a comparison table; courier protocol.

## 5 · Labels
VERIFIED / REPORTED / INFERRED / UNKNOWN; `TIMEBOX-EXPIRED` is a valid exit, not a failure.

---
**Why this one (and the stop alternative):** if the Owner wants one separator and no more, this is the cheapest measurement with a named specimen. If he does not, the honest answer is *stop running framework tests until cutover* — say that instead and file nothing. A third table column separates nothing; this one either separates or does not, cheaply.