# QUEUE.md — open items, in priority order (suggestions, never assignments)

Writer: Architect. Take the top item nobody has claimed. **Claim** = push a one-line file `bulletin/<UTC>-<seat>-claim.md` (`CLAIM: <item number> | base <sha> | branch council/<seat>`) before you start, after running `node tools/council-sync.mjs --days 3` to see others' claims. A claim is a statement, not a lock (`AGENTS.md` §5 takeover rules). Evidence labels and receipts as always. None of these edits the product file; results go in your lane as exact proposals (`WHERE · old → new · WHY · SAFE ALONE? · HOW TO CHECK`) or measurements.

| # | Item (source) | What done looks like |
|---|---|---|
| 1 | **Position dropdown** on the player browser looks misaligned vs the draft board (Owner, 23 Oct). | In `Football-Sim-PreColors.html` find both controls; report selectors, the CSS rules that differ, computed box sizes at 390 px and 1280 px (Playwright), and an exact CSS change that makes them match. |
| 2 | **Lint selftest** (open since 22 Oct; needs a machine with Biome). | `node tools/lint.mjs selftest` output posted verbatim, plus `node tools/lint.mjs product Football-Sim-PreColors.html`. |
| 3 | **RNG inventory** for task `T-20261022-claude-2`. | Every `Math.random()` site: line, enclosing function, category (draft/CPU, game sim, UI, awards). Count with its unit ("N occurrences on M lines"). |
| 4 | **Review the saved shared-tree snapshot** `origin/preserve/shared-tree-2026-10-23-v2` (487 files). | Per group (openchamber tests, `sports/`, `figma/tokens.json`, `docs/`, `SIM-PLATFORM/`): keep / archive / drop, with the reason. `sports/` data provenance per `AGENTS.md` §7 (UNVERIFIED unless a source is named). Check `figma/tokens.json` against the Owner's 22 Oct 32-team colour table: equal or not, row by row. |
| 5 | **Header and DRAFT hero**: measure the current 390 px homepage (is Start Draft visible without scrolling?) and propose two header options as static HTML in your lane (no images). | Measurements plus two small HTML files, each ≤ 10 KB, clickable wordmark returning to the homepage. |
| 6 | **Beam's 25 V23 aesthetics proposals** (branch `council/beam` or `beam/local-preserve-2026-10-23`, index commit `a8a6ce4`). | A seat other than Beam ranks them by effort and impact under the product's constraints (single file, no CDN, 390 px); one page. |
| 7 | **"Value here" inventory** (V22 list). | Every occurrence in the product (labels, sort options, help text) with line numbers and the exact string. |
| 8 | **4th-down rule vs on-screen copy** (`T-20261022-claude-4`). | The code that decides, the copy that describes it, a mismatch (if any) with both quoted. |
| 9 | **Ultra: re-measure the preserved math-core hash gate and seeds** (`_archive/preserved-2026-10-23/retired-lanes/nemotron-3-ultra-free/` on `beam/preserve-uncommitted-2026-10-23`). | Which items reproduce against the current build, with the commands. |
| 10 | **DS: trim your lane to ≤ 300 KB** (`RETIREMENT.md` §4). | The list of what you removed; build copies and images go. |

Standing chores (when the queue is empty): `node tools/preserve.mjs check --fetch` and post any `UNSAVED` line; `node tools/check-tasks.mjs`; verify the five `retired/*` tags still resolve.

## V23 Owner requests (24 Oct) — brief detail in `_agents/V23-OWNER-REQUESTS.md`
Q-V23-1 locate "also fits" (draft board) and the stray line behind the first letter of player names, remove both · Q-V23-2 contrast audit of gold text on rose/near-white (WCAG; antique gold for small text) · Q-V23-3 proposal: rose/gold/white palette tokens, team-tint backgrounds · Q-V23-4 lineup comparison cue without blue own names.
