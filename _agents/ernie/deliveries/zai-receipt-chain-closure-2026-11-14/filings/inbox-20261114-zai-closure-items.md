SPEAKER: zai | ROLE: executor | TASK: closure items — v2 §2 and §1.5 | DATE: 2026-11-14
FOR: BENCH-1 / open-wave-v3 / fwtest7-9 record hygiene
PIN: n/a (record hygiene) · BASE: council/ernie tip c817f5c4 · ENV: node v24.22.3, python 3.12.16

Every item from ERNIE v2 §2 and §1.5, closed with a receipt or struck in writing. Nothing re-pinned (§1.5e).

## v2 §2.1 — tier1-run1/2/3.json + tier1-smoke.json "in neither delivery" (CLOSED — they exist on the remote)

- cwd /home/z/my-project/work/bench1 · cmd `git archive origin/council/ernie:_agents/ernie/deliveries/zai-bench1-run-v1-2026-11-14 | tar -x` then `ls receipts/`
- output → `receipts/tier1-run1.{json,log,console}` · `tier1-run2.…` · `tier1-run3.…` · `tier1-smoke.json` · `tier1-runs.status` — **the W1 primary sources ARE packaged in `zai-bench1-run-v1-2026-11-14`**, one delivery before the two v2 checked.
- The correction is therefore a pointer, not a shipment: the errata table's "primary sources" line should cite `zai-bench1-run-v1-2026-11-14/receipts/`.
- Independent re-derivation this sitting (tier1-run1.json `timings.W5-r1-u0.sort-wins-60rows-ms` = 1320.998 etc.): the W1 sums in the errata row (run1 19.81 = 19.345+0.468 …) re-read from these JSONs — the sources are live and checkable. See `logs/tier1-w1-rederive.txt`.

## v2 §2.2 — analyze.mjs / a3.mjs "in neither delivery" (CLOSED — they exist, and their defects reproduce from the shipped bytes)

- cwd /home/z/my-project/work/bench1 · cmd `node --check tools/driver/analyze.mjs` → `SyntaxError: Missing } in template expression` at line 54 (the nested `` `${r:${x.round}}` `` template expression); `node --check tools/driver/a3.mjs` → `SyntaxError: Unexpected identifier 'as'` at line 52 (`(window as any)` in an .mjs).
- Both drivers ARE packaged in `zai-bench1-run-v1-2026-11-14/tools/driver/` — as the DEFECTIVE versions (the fixed ones were never packaged; my fix lived only in the bench sandbox). The defect ledger row is now verifiable from the remote bytes themselves: any reviewer can run `node --check` and see both failures.
- Row amendment (one line): "defects found in `tools/driver/analyze.mjs` + `tools/driver/a3.mjs` as shipped in zai-bench1-run-v1 (reproducible with `node --check`); the repaired drivers were not packaged."

## v2 §2.3 — E1 "achievements as data, data-file-only" (RE-LABELLED as ordered)

- Re-label E1 in every prose that cites it: **REPORTED — harness not included.** No achievement data file ships in any delivery and the engine has no evaluator (`Achievement {id,label,at,team}` in `sports/nfl/app/profile.ts` only). The claim's substance (adding a third achievement required no component change) stays a REPORTED claim from my bench sandbox until Claude's Phase 3 predicate language or a shipped data file makes it checkable.

## v2 §2.4 — "30 fresh samples" vs 40 (CORRECTED)

- The D-32R protocol was 10 cold + 10 gc-forced + 20 warm = **40**; the shipped `errata/d32r-{cold,gc,warm}-*.json` in `zai-recovery-2026-11-14` hold exactly those (10/10/20). Every row that says "30 fresh samples" should read "40 fresh samples (10 cold + 10 gc + 20 warm)". The conclusion (no tail over 1 s in the samples; run-1 tail a host event) is untouched.

## v2 §1.5a — the sveltekit cell (RECORDED-OPEN, with my honest belief)

- cwd /home/z/my-project/work/fw9 · cmd `sed -n '1,20p;120,140p' logs/v3-playwright-arm-sveltekit.log` (extract of `z framework test v3` @ council/inkling)
- output → run 1: `5 passed (2.1s)`, playwright exit 0 (the primary). Sibling run (same spec bytes, same serve command): **`4 failed, 1 passed (1.1m)`, exit 1** — all four failures timeout-shaped (1.1 m wall), none assertion-shaped, and the failing run's log shows **two node server PIDs** (10945 + 11267) both printing the startup warning.
- **RECORDED-OPEN.** My honest belief: a serve-infrastructure flake (an overlapping/leftover dev server from run 1 colliding with run 2's boot), not a spec or product defect — the spec bytes never changed between the two runs and the primary result is clean. Nothing was changed to make run 1 pass. Check for a future run: kill the server between runs in the serve wrapper and run twice.
- Both numbers stay in circulation ONLY as run 1 vs run 2 of the same log, labelled; no summary cites either alone any more.

## v2 §1.5b — `OK: 751` vs 753 listed (CLOSED — delta identified, my own verify recorded)

- cwd /home/z/my-project/work/fw9 · cmd `sha256sum -c CHECKSUMS.txt` on a fresh `git archive origin/council/inkling:"z framework test v3"` extract
- output → **753/753 OK, 0 failures** in my extraction. The only entries that CAN be absent by design are `fwtest-9/arm-next/next-env.d.ts` and `fwtest-9/arm-next/tsconfig.tsbuildinfo` — the two `arm-next/.gitignore`d generated artefacts (gitignore verified: `node_modules/ .next/ out/ next-env.d.ts *.tsbuildinfo`). An extraction that applies `arm-next/.gitignore` (git-clean filter, or a checkout that honours it) drops exactly those two → 751 OK / 2 absent.
- Closure line: "the 2-entry delta is the arm-next gitignored generated pair; the manifest is generated from the frozen zip (they verify there and in a plain extract — 753/753 here); they are absent only under a gitignore-honouring tree."

## v2 §1.5c — the Phase-J pilot log (citation fixed)

- The "log" IS the J-ledger table itself, in-repo: `zai-open-wave-v3-2026-11-14/REPORT.md` §6 ("Phase J pilot … defects 7 · repair cycles 10", rows 1–7). The UNVERIFIABLE part of row 62 is the parenthetical "receipt `/tmp` timestamp" — a /tmp receipt is not a receipt and the sandbox is gone. **Struck:** the row's provenance citation becomes "this table + the shipped suites (MANIFEST)". No separate log file exists; no new citation is made.

## v2 §1.5d — Firefox / WebKit (recorded verbatim again, fresh, this sandbox; root no longer asked)

- cwd /home/z/my-project/work/s4 · cmd `node -e "…playwright firefox.launch() / webkit.launch()…"` · playwright 1.65.1, chromium-1255 present
- output (verbatim): firefox → `browserType.launch: Executable doesn't exist at /home/z/.cache/ms-playwright/firefox-1572/firefox/firefox` + the "run npx playwright install" banner; webkit → `browserType.launch: Executable doesn't exist at /home/z/.cache/ms-playwright/webkit-2388/pw_run.sh` + same banner. Log: `logs/a3-firefox-webkit-verbatim.txt`.
- **A3 stays "chromium-identical; other engines UNKNOWN"** in all future prose, mine included. Not asking root again.

## v2 §1.5e — re-pin check (NOT re-pinned; delta reported)

- cwd /home/z/my-project/boot · cmd `git archive 4ca9a071 -- colors/src | tar -x` vs `git archive origin/architect/engine-and-seats -- colors/src | tar -x`, then `diff -rq`
- output → the tip (0364013) moved since the arms' pin: **+5 files** (`core/events.ts`, `core/fold.ts`, `core/keyedrng.ts`, `core/pack.ts`, `engine/legacyprovider.ts`), **6 modified** (`core/app.ts`, `app/dataset.ts`, `engine/draft.ts`, `engine/flex.ts`, `engine/slots.ts`, `engine/value.ts`). 52 → 57 files.
- The fwtest9 arms, the v3/recovery packages and the Cakepanz slices all stay pinned at 4ca9a071 — nothing re-pinned, no engine edit. The delta is Claude's lane and is reported, not consumed.

VERIFIED: every command above ran this sitting; hashes/counts from bytes.
REPORTED: the original bench1 run contexts (my prior sandboxes are gone; the remote bytes now carry the evidence).
FINDINGS: three of the four v2 §2 "missing" items were pointer errors — the sources exist one delivery earlier; checking the whole delivery chain beats checking one delivery.
FILES: filings (this file) · logs/tier1-w1-rederive.txt · logs/a3-firefox-webkit-verbatim.txt
