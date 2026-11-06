# AGENTS ref §9–§10 — Verification, tools, delivery checks (loaded on demand)

**Status note (6 Nov 2026).** For the product (`colors/`) the receipt commands are: `cd colors && npm test` (VERIFIED 284 pass @ 425f72a), `npx tsc --noEmit` (305 errors, pinned baseline pending; see NOW.md), `npm run build`, a 390 px and desktop check. Everything below that names `Football-Sim-PreColors.html`, the extracted inline script, `post-merge-smoke.mjs` or the Guide tab applies only to the frozen HTML reference and is kept as history. The Biome product lint wrapper is HTML-only.

## 9. Verification and tools

Every change ships with a **receipt**: the command and its output. "I believe it works" is not one. Tiers: *trivial* (docs, wording) → `git diff` review; *product change* → `node --check` on the extracted script, the gate (`tools/post-merge-smoke.mjs`; its tab list still names the Guide tab, which V23 removes: update it in the same change), 390 px check, a seeded before/after for any number; *protected constant* → also the Owner's approval and the re-pin. The Architect does not certify his own build; a Verifier does. Never claim to have run a script that does not exist in the tree (`pw4.js`, `validate.js`, `phone.js`, `tests/run_all.sh` are targets, not tools).

**Lint (Biome).** `tools/lint.mjs` is the one entry point; it only reads.
- `node tools/lint.mjs product Football-Sim-PreColors.html` extracts the inline script to `tools/biome-product/scratch/` (gitignored), lints that copy with `tools/biome-product/biome.json` (bug-class rules `error`, style rules `warn`, formatter off), maps findings back to **original line numbers**, and fails (exit 5) if the HTML's sha256 changed during the run. It refuses `--write/--fix/--unsafe` and never calls `biome format`.
- Findings already in `tools/lint-baseline.json` are *known*; only **new** errors fail (exit 1; `--strict` also fails on new warnings). Create or refresh the baseline with `--update-baseline` once the real findings have been reviewed. Exit 3 = Biome missing or its report unreadable: **UNVERIFIED, not a pass**.
- `node tools/lint.mjs selftest` runs the real Biome on a fixture with known defects. Run it once on any machine that has Biome before trusting the product lint. (Biome 2.6.2 is REPORTED working as a native binary for the Kilo seats; the Architect's sandbox installed 2.6.2 on 1 Nov and `selftest` PASSES there (VERIFIED: nested-root config clash fixed by running from `tools/biome-product`; the JSON diagnostic is `location: {path, start:{line,column}, end}`, no byte span). `tools/lint-baseline.json` does not exist yet, so every finding on Pre-Colors reports as NEW.)
- Why a wrapper exists at all: the root `biome.json` excludes HTML and Biome's CLI will not read-only-lint a script inside the product with original line numbers. If a seat shows that `biome lint Football-Sim-PreColors.html` does the same with 2.6.2, delete `tools/lint.mjs` and use that.
- Verified on the real 2.6.2 binary by the council (REPORTED to me): `--reporter=json` emits `{summary, diagnostics, command}`; exit 0 clean, 1 on errors; root `biome.json` loads. Still unverified: the span/location fields inside each diagnostic and the rule names in `tools/biome-product/biome.json`. `selftest` settles both in one run.
- `node tools/lint.mjs files <paths>` / `npx biome check` use the root `biome.json` for council tooling only (`tests/`, `tools/`, `_agents/**/tools/`); it excludes every `.html`.
- Do not "fix" a product finding to quiet the linter, and do not add `biome-ignore` to hide one; a genuine problem is a work-order entry.

Mermaid renders in the repository (diagrams in the work order). Figma is NOT available for this project (Owner ruling: paywall); design in code and check at 390 px and desktop.

**Finding code:** `boardEntries`, `renderDraftBoard2` (draft board) · `cpuPick`, `cpuBias` (CPU) · `simulateGame`, `playGame`, `simulateCurrentWeek` (season) · `matchupModel`, `applyOffPlan`, `applyDefPlan` · `optimalLineup`, `effOvr`, `flexPenaltyFor` · `ensureGamePlans`, `teamIdentity`, `planWhy` · `generateGameSummary`, `playByPlay` · `computeRegularSeasonAwards` · `modelWeights`, `slotWinsPerOvr`, `teamRatings`.

## 10. Before delivering a build

Draft completes (32 teams × all rounds) · season runs to the Super Bowl · no horizontal scroll at 390 px · no console errors · weights change Team Rankings instantly · recaps show chronological scoring, turnovers and the game ball · protected-constant hashes re-pinned · receipts attached to the work order.

