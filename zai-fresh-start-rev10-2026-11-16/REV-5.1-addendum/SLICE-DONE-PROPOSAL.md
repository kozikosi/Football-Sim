# SLICE-DONE-PROPOSAL.md — what "done" should mean for a slice (item 12, owed)

Proposed by Z.ai, 2026-11-15, from the evidence of four measured slices (the four-slice sitting, this
sitting's slice 5 + season, and the arc). A slice is DONE when ALL of the following hold — proposed as
the checklist the next sittings attach to every delivery:

## The seven gates of "done"

1. **The probe is written before the code is measured, and it re-derives the truth node-side.** A slice's
   probe must assert against the ENGINE's own view-model (string-equal to boardVM/feedVM/SeasonResult),
   never against constants or fixtures alone. Evidence of the difference: the slice-5 probe's team-index
   bug was caught by comparing the DOM to a node-side re-derivation (receipts/slice5-timing.txt).
2. **The fidelity is NUMERIC, cross-arm.** Same DOM node count, same rows, same states, same chrome bytes
   (cmp), same engine-true fields — or the two arms are not comparable (receipts/slice5-probe.json:
   566/583 both arms; receipts/season-probe.json: whitespace-stripped table equality).
3. **Zero console errors on file:// (flagged), zero blocked requests, the whole session.** The w89 bar (D4: wave number corrected — live is w89, gh-pages tip 3e69567c; the bar itself is unchanged).
4. **390 px clean on the slice's own screens** (scrollWidth == viewport, every screen the slice touches).
5. **Both typecheckers clean AND the production build green** (0 errors; warnings listed verbatim, no
   suppression lines anywhere). **BUILD-GREEN CLAUSE (Rev 8, Part C1):** `npm run build` must also
   exit 0 — on the shipped tree, after the last edit, under the strictest tsconfig in either arm
   (named: the Svelte arm's `tsconfig.json` — `strict` + `isolatedModules` + `verbatimModuleSyntax` —
   vs the Vue arm's `tsconfig.app.json` (`@vue/tsconfig` strict base + `verbatimModuleSyntax`;
   `noUncheckedIndexedAccess` relieved with written disclosure); neither arm sets `noUnusedLocals`,
   so the two are equally strict on every flag that matters). Why the build clause: `state_invalid_export`
   ("Cannot export state from a module if it is reassigned") is raised by the bundler at BUILD time
   (vite-plugin-svelte/rolldown) while svelte-check reports 0 errors on the same file — a slice can
   pass gate 5's typecheck reading completely and still fail the build (receipted on
   weekStore-wrappers.svelte.ts, Rev 8 erratum 0.7). **Any gate-5 receipt predating the final change
   is void.**
6. **canon purity + workaround audit:** `grep .weight|WEIGHT` clean in every new file; workaround_lines
   = 0 or each one justified in the journal (slice5-timing.txt).
7. **The receipts exist before the reply:** timing metrics per arm (arm= prefixed lines), the probe JSON,
   and the journal entries that were written DURING the build — a slice whose receipts are reconstructed
   after the fact is not done (PROTOCOL-FOR-A-SECOND-AGENT.md §3).

## What "done" does NOT require

- No dist shipping (the rebuild hashes are the receipt — backlog/reproducibility-cmp.txt).
- No bundle number in the verdict (measured, filed, and weighted NOISE — CATEGORY-WINNERS.md row 1).
- No second agent's number (secondary, never averaged — the sitting's own rule).

## Applying it retroactively

Slice 5 (player cards): satisfies all seven (the one miss — DOM counts diverging by the assigned panel
after the arc — is DOCUMENTED as the panel's own cost, receipts/arc-w89.txt (c)). The season screen:
satisfies all seven. The arc items: 1, 3, 4, 6, 7 (they are panels, not slices — no cross-arm pin by
design). Proposed as the standing bar from slice 6 onward.
