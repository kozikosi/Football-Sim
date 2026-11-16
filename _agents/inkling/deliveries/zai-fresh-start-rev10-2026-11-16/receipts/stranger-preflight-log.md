# Stranger preflight log — cold run of SECOND-AGENT-HANDOFF.md "Rev 9 turnkey patch" PREFLIGHT

Date: 2026-11-16. Runner: a fresh agent that had never seen this tree before.
Scope: ONLY the PREFLIGHT section's 5 numbered steps. No authoring, no bench run, no store/component
code written, no verdict/receipt/part-A documents opened (RECEIPT.md, DELIVERY-NOTE.md,
PART-A-CLASS-BRIDGE.md, VERDICT-*.md all untouched).
Working dir: /tmp/stranger-tree/ (nothing outside it modified).

Score: steps 2, 3, 4, 5 pass. Step 1 FAILS at its own exit condition (`gate-manifest` → FAIL, exit 1),
which the handoff treats as "STOP and report". I continued in record-only mode per my tasking, and
verified by hand that the actual ground-truth files are intact — the FAIL comes from stale doc and
receipt checksums, not tampered ground truth.

---

## Preflight step 1 — extract zip; engine diff clean; gate-manifest PASS

**What the handoff asked:** "Extract this zip; the two repos are `football-sim-vue/` and
`football-sim-svelte/` at the zip root. No clone needed — the engine (pin d3bd81d2, 57 files) is
vendored in both; verify `diff -rq football-sim-vue/src/engine football-sim-svelte/src/lib/engine`
→ clean, and `node scripts/gate-manifest.mjs .` → PASS (the repo CHECKSUMS.txt pins
probes/truth.json, probes/season-seed-2027.json, fixture.json, the shared layer and the CSVs — a
mismatch means a tampered ground truth: STOP and report)."

**What I ran and what happened:**

| command | exit | result |
|---|---|---|
| `ls /tmp/stranger-tree/` | 0 | No zip present — the tree is ALREADY extracted; both repos sit at the root as promised. "Extract this zip" has no object to act on. |
| `node --version` | 0 | v24.22.3 (≥ 22 ✓) |
| `find football-sim-vue/src/engine -type f \| wc -l` (and svelte twin) | 0 | 57 files in each — matches the handoff's claim |
| `diff -rq football-sim-vue/src/engine football-sim-svelte/src/lib/engine` | 0 | CLEAN, as promised |
| `timeout 90 node scripts/gate-manifest.mjs .` | **1** | **FAIL — 71 problems.** Root CHECKSUMS.txt: 3 MISMATCH (RECEIPT.md, DELIVERY-NOTE.md, verified-as-of.json). Root MANIFEST.txt: 20 MISMATCH (DELIVERY-NOTE.md, RECEIPT.md, REV-9-ERRATA.md, VERDICT-REV-9.md, VERIFY.txt, probes/battery-*.json, receipts/screens-rev9/*.png …). Repo CHECKSUMS.txt (each arm): 1 MISMATCH (probes/battery-vue.json / probes/battery-svelte.json). Plus "46 file(s) named by NO manifest" (unlisted), incl. the sealed-reactive store files and proposal patches. |
| `sha256sum probes/truth.json probes/season-seed-2027.json src/fixture.json src/shared/{seasonVM,weekVM}.ts` (vue) + grep against CHECKSUMS.txt (both arms) | 0 | truth.json = e7c4512f…, season-seed-2027.json = 61e55e8f…, fixture.json = 52ede1d1… — all MATCH the repo CHECKSUMS.txt pins and are IDENTICAL across arms. Ground truth is intact. |

**Verdict: STALL/AMBUSHT at the letter of the handoff.** The gate exits 1, and the handoff's
instruction is binary: "a mismatch means a tampered ground truth: STOP and report." A literal stranger
must stop here — yet the mismatches are all docs, battery receipts and screen PNGs (files edited in
Rev 9 without re-cutting MANIFEST.txt / CHECKSUMS.txt), NOT any of the ground-truth files the
handoff says the checksums pin. The handoff conflates "gate FAIL" with "ground truth tampered",
and the two diverge on a fresh tree. I continued only because my tasking ordered me to record and
move on; per the handoff itself this is a STOP.

**How the handoff could have prevented it:** either (a) re-cut MANIFEST.txt/CHECKSUMS.txt after the
Rev 9 doc edits, or (b) scope the STOP rule to the ground-truth pins only ("STOP iff any MISMATCH
names probes/truth.json, season-seed-2027.json, fixture.json, src/shared/** or the CSVs; a doc/receipt
mismatch is expected staleness — note it and continue"), or (c) ship a `--ground-truth-only` flag in
gate-manifest.mjs that the preflight invokes.

**Ambiguity:** "Extract this zip" — there is no zip in the tree I received. Harmless here (repos
already at root), but a stranger handed only the .md plus a zip gets no instruction on where to
extract it; a stranger handed a pre-extracted tree gets a step that cannot be performed.

---

## Preflight step 2 — node ≥ 22; npm install ×2; playwright chromium; vitest ×2 green

**What the handoff asked:** "node ≥ 22 · `npm install --no-audit --no-fund` in BOTH repos from the
committed lockfiles · `npx playwright install chromium` (the battery needs the repo's own browser
build) · `npx vitest run` green in both BEFORE you author (a red pre-existing test is a bench defect,
not yours)."

| command | exit | result |
|---|---|---|
| `node --version` | 0 | v24.22.3 — ≥ 22 ✓ |
| `cd football-sim-vue && timeout 240 npm install --no-audit --no-fund` | 0 | "added 221 packages in 3s" — finished fast, lockfile honored |
| `cd football-sim-svelte && timeout 240 npm install --no-audit --no-fund` | 0 | "added 83 packages in 1s" |
| `timeout 240 npx playwright install chromium` (run from vue repo) | 0 | No output, exit 0 — chromium already cached; both repos pin @playwright/test 1.65.1 |
| `timeout 240 npx vitest run` (vue) | 0 | 6 files, **12/12 passed**, 7.5s |
| `timeout 240 npx vitest run` (svelte) | 0 | 6 files, **16/16 passed**, 6.4s |

**Verdict: PASS, no stalls.** Nothing hung; the STALL LIST's npm-hang procedure was never needed.

**Ambiguities (minor):** (a) `npx playwright install chromium` doesn't say which repo to run it from;
a stranger doesn't know the browser cache is shared and both arms pin the same playwright version —
I ran it once from the vue arm. (b) The handoff never says node ≥ 22 is checked how (I used
`node --version`); trivial. (c) Svelte vitest shows 16 tests vs Vue 12 — pre-existing asymmetry; the
handoff only demands green, so no action, but a stranger may wonder whether that asymmetry is
expected (it is not explained in the preflight).

---

## Preflight step 3 — record the recipe sha FIRST

**What the handoff asked:** "`shasum -a 256 SEALED-RECIPE.md` → it must equal
7fcc3fc0432e29fae4c0d0d384f813da67cd05a0f591f5bb6746f85458e14f07; put it in the receipt's first line
(`recipe_sha256=…`)."

| command | exit | result |
|---|---|---|
| `shasum -a 256 SEALED-RECIPE.md` | 0 | `7fcc3fc0432e29fae4c0d0d384f813da67cd05a0f591f5bb6746f85458e14f07` — EXACT match with the pinned value |

**Verdict: PASS.** Note the handoff puts this step AFTER the npm installs in numbering but says
"before any code" — as pure verification there was no code to write yet, so no conflict, but a
stranger running the steps in order 1→5 records the sha after installing dependencies. Harmless.

---

## Preflight step 4 — read SEALED-RECIPE.md §1–§6 and nothing else from verdict/receipt/part-A files

**What the handoff asked:** "Read SEALED-RECIPE.md §1–§6 and NOTHING else from the delivery's
verdict/receipt/part-A files."

**What I did:** `grep -n "^## "` showed SEALED-RECIPE.md is 125 lines and its last section is §6
(there is no §7) — the entire file is §0–§6, so I read it whole. §1–§6 are present and coherent:
inputs (§1), store contract (§2), component contract (§3), probe contract with the four gates (§4),
receipt format (§5), blindness rules (§6). I did NOT open RECEIPT.md, DELIVERY-NOTE.md,
PART-A-CLASS-BRIDGE.md, VERDICT-REV-8/9/10-ADDENDUM.md, JOURNAL.md, VERIFY.txt or any other
verdict/receipt document. (I did read CHECKSUMS.txt contents while diagnosing the step-1 gate
failure — it is a hash list, not a verdict document; disclosed here for honesty.)

**Verdict: PASS.** Minor wrinkle: the recipe's §0 (the one-paragraph "what you build") sits before
§1 and the handoff says "§1–§6"; I read §0 as part of the same file — it contains no author numbers,
so the seal is not affected, but the handoff's range literally starts at §1.

---

## Preflight step 5 — league construction via the SHARED helper (verification only, nothing authored)

**What the handoff asked:** "build the league of record with the SHARED helper
`runSeason(pool, picks, 2027, 2027)` from `src/shared/seasonVM.ts` … and derive the views through
the shared `weekVM` helpers (`weekView`, `standingsThrough`, `totalWeekSlots`). Do NOT hand-roll the
league build."

**What I ran (existence/signature check only — no league built, no code written, bench not run):**

| command | exit | result |
|---|---|---|
| `grep -n "function runSeason" football-sim-vue/src/shared/seasonVM.ts` | 0 | line 42: `export function runSeason(pool: readonly Player[], picks: readonly PickRow[], seed: number, year: number): SeasonResult` |
| same grep in `football-sim-svelte/src/lib/shared/seasonVM.ts` | 0 | line 42, byte-identical signature |
| `grep -n "export function weekView\|standingsThrough\|totalWeekSlots" …/weekVM.ts` (both arms) | 0 | weekView :55, totalWeekSlots :75, standingsThrough :87 — all present in BOTH arms |
| `ls football-sim-svelte/src/shared` | 2 | **No such directory** — the svelte arm's shared layer is at `src/lib/shared/` |
| `ls football-sim-{vue,svelte}/scripts/ football-sim-{vue,svelte}/probes/` | 0 | `e3-devtools-session.mjs` (the STALL LIST's shipped hang-fix) exists in both repos; `probes/probe-battery.mjs`, `probe-truth.mjs`, truth.json, season-seed-2027.json all present in both |

**Verdict: PASS as a preflight check.** The helpers exist with the claimed names and signatures in
both arms; the "ONE missing step" resolution is real, not vaporware. I stopped short of calling
runSeason — building the league is authoring-adjacent and my tasking forbids it.

**Ambiguity:** step 5 names only `src/shared/seasonVM.ts`. In the svelte arm that path does not
exist (it is `src/lib/shared/seasonVM.ts`). The path duality IS documented in the handoff's
Do-NOT-touch list ("`src/shared/**` / `src/lib/shared/**`"), but a stranger executing step 5 alone
in the svelte arm hits "No such file or directory" first. One clause in step 5 ("both arms: vue
`src/shared/`, svelte `src/lib/shared/`") would fix it.

---

## STALL SUMMARY (most severe first)

1. **[BLOCKER at the letter of the handoff] Preflight step 1's own gate fails on a fresh tree.**
   `node scripts/gate-manifest.mjs .` exits 1 with 71 problems (3 root-CHECKSUMS mismatches on
   RECEIPT.md/DELIVERY-NOTE.md/verified-as-of.json; 20 MANIFEST.txt mismatches on Rev 9 docs, battery
   JSONs and screens-rev9 PNGs; 46 unlisted files incl. the sealed-reactive store). The handoff maps
   any FAIL to "tampered ground truth: STOP and report", so a literal stranger stops before doing
   anything. In fact NONE of the ground-truth pins are violated — truth.json, season-seed-2027.json,
   fixture.json, shared layer and CSVs all hash-verified intact and byte-identical across arms. Root
   cause: Rev 9 edited docs/receipts/screens without re-cutting the manifests. Prevention: re-cut the
   manifests on each rev, or scope the STOP rule to ground-truth pins only.
2. **[Confusion, medium] "Extract this zip" — there is no zip.** The tree arrives pre-extracted with
   the repos already at its root. The step is unperformable as written; a stranger may waste time
   hunting for the archive. Prevention: "if the repos are already at the root, skip extraction".
3. **[Confusion, small] Step 5's path is vue-only.** `src/shared/seasonVM.ts` does not exist in the
   svelte arm (`src/lib/shared/seasonVM.ts`). Documented only indirectly via the Do-NOT-touch list.
   Prevention: name both paths in step 5.
4. **[Confusion, small] `npx playwright install chromium` lacks a location.** Browser cache is
   shared and both arms pin @playwright/test 1.65.1, so one run suffices — but the handoff doesn't
   say so; a stranger may install twice or wonder. Prevention: one clause ("once, from either repo").
5. **[Cosmetic] Step ordering vs "record the sha FIRST".** The sha step is numbered 3, after the
   installs; "FIRST, before any code" still holds trivially in a preflight, but the numbering and the
   prose pull in slightly different directions.
6. **[Unexplained, note only] Vitest totals differ across arms** (vue 12 tests, svelte 16) — both
   green, handoff satisfied, but nothing in the preflight prepares a stranger for the asymmetry.

**What worked flawlessly:** engine diff (0 differences, 57 files each), both npm installs from
lockfiles, playwright chromium, vitest green in both arms, the recipe sha pin (exact match), the
§1–§6 recipe read, and the shared runSeason/weekVM helper surface in both arms. No command hung; the
STALL LIST's procedures were never needed.

**Honest bottom line:** 4 of 5 preflight steps pass clean for a cold stranger. The single real
failure is the handoff's own tamper gate — it fires a false "STOP" on a freshly delivered Rev 9 tree
because manifest checksums were not re-cut after Rev 9 edits. Nothing stalled, nothing hung, no
ambush beyond that gate; every file and helper the handoff promises actually exists where the
document (or its path-duality note) says it does.

## Post-run hygiene note

`ps` at the end found vite dev servers running (`npm run dev --port 5211/5212`) — but they started at
08:15, BEFORE this stranger session began, and their cwd is `/tmp/work/rev10/football-sim-vue`
(outside /tmp/stranger-tree). They are not mine and I left them untouched (killing another seat's
processes would violate the work-only-in-scope rule). No process I started is left running.
