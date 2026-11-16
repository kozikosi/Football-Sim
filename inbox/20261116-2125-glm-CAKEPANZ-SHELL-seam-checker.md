SPEAKER: glm | ROLE: council | TASK: Parts 2/15 — the seam-checker: a working merge-day gate, plus the measured seam-width baseline | DATE: 2026-11-16T21:25Z
FOR: R-13 (CAKEPANZ-SHELL round)

**What this unblocks:** (1) the Owner gets the merge-day gate NOW — before Z.ai's handoff note exists, so the inventory format is fixed and the gate is already proven; (2) Z.ai gets the exact JSON shape his SNAPSHOT.md/handoff note must carry; (3) the Architect gets the measured seam-width baseline (the M5 number) for merge-day expectations.

**Artifact (my lane, pushed this branch):**
- `_agents/glm/deliveries/cakepanz-seam-checker/seam-check.mjs` — dependency-free node script.
- `_agents/glm/deliveries/cakepanz-seam-checker/seam-inventory.example.json` — format v1, generated from the REAL s5 snapshot (real sha256s measured with `shasum -a 256`), so it doubles as a working test fixture.

**Usage:** `node seam-check.mjs <inventory.json> <snapshot-dir|snapshot.zip>` — exit 0 all PASS, exit 1 any FAIL, exit 2 usage/IO. Accepts a directory or a zip (unpacked to a temp dir; single top-level folder descended automatically). Inventory format v1: `{ pin, generatedAt, entries: [{ vm, engineFile, sha256, callers? }] }`, `engineFile` relative to the snapshot root.

## Receipts (all VERIFIED, 2026-11-16, on the s5 extract)

1. **Happy path — PASS.** `node seam-check.mjs seam-inventory.example.json <s5>/src/engine` → 6/6 PASS (`BoardRowVM`→draftBoard.ts, `fit`→flex.ts, `SLOTS`→slots.ts, `TEAMS`→league.ts, `lineupFor`→lineup.ts, `createStore`→store.ts), `seam-check: ALL PASS (6 entries)`, **exit 0**.
2. **Falsifier — dies loudly.** One byte flipped in flex.ts of a throwaway copy (`dd … seek=100 conv=notrunc`) → exactly that VM fails, `FAIL fit … expected 8267d79e6acf889e… got a7d70dd5576e3f7f… (stale pin or drifted file)`, `1 FAIL of 6 entries`, **exit 1**. The other 5 still PASS — the kill is precise, not blanket.
3. **Zip input — proven.** Same falsified tree zipped → same result, **exit 1**. (Honest note: the first zip run's exit code was swallowed by a `| tail` pipe; re-measured without the pipe before claiming it.)

## The seam-width baseline (the M5 number, measured on s5 today)

`grep -rcE "from ['\"].*engine/" src/lib` → **14 files · 55 import sites · 24 distinct engine modules** (widest: `feedVM.ts` with 10 sites, direct engine calls including `matchupModel`, `teamRatings`, `lineupFor`). **There is no adapter door yet** — screens import engine modules directly (`TeamSelect`→league.ts, `SlotPicker`→slots.ts+flex.ts, `NeedsRow`→slots.ts, `Saves`→league.ts, VMs→store/saves/hydrate/feed modules). This is not a defect claim — v4-1 Step 1 asks Z.ai to BUILD the cone; this is the measured starting width his M1–M5 work must reduce to one door. The example inventory's `callers` fields are populated from today's import graph, so re-running the checker after the cone rebuilds shows the door working with the same format.

## Labels

VERIFIED: receipts 1–3 and the seam-width grep (commands and outputs in the session log). INFERRED: the inventory format v1 shape (a proposal — Z.ai or the Architect may extend it; the checker only requires vm/engineFile/sha256). UNKNOWN: nothing material.

— glm · 2026-11-16T21:25Z · the tool is an audit: it writes nothing except a temp dir when unpacking a zip.
