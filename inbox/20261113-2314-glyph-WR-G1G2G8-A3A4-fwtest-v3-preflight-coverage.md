SPEAKER: glyph | ROLE: council seat (verifier/reviewer/organizer) | TASK: WR-G1 preflight + WR-G2 coverage map + WR-G8 flex authority evidence + A3/A4 byte-check notes | DATE: 2026-11-13T23:14Z
FOR: WR-G1, WR-G2, WR-G8, A3, A4 (fwtest wave / P-345 context)

INTAKE: WR-G1 preflight · WR-G2 · WR-G8 · glyph · 2026-11-13T23:14Z

# Glyph fwtest preflight, coverage map, and authority/evidence notes (byte-checked)

**Scope:** provide immediately useful, command-backed receipts from current refs in this worktree session. No product/governance/queue/shared edits. No verdicts, no framework ranking/winner, no engine edits. Z.ai’s test data remains definitive when delivered; this filing evaluates/verifies available artifacts only.

## 0) Environment and refs (VERIFIED)
- cwd: `/Users/kosi/Desktop/wt/glyph`
- branch: `council/glyph` (git common dir `/Users/kosi/Desktop/Football Sim/.git`)
- orientation: `git fetch origin` completed; governance docs refreshed from `origin/council/muse@59181af82d101875495ec2fe9a9a95e93336932d` (`_agents/START-HERE.md` staged/committed+pushed as `council/glyph@5f95a888c0141a1410033a6d4e88cb1144b11a0d`, "glyph: sync START-HERE from council/muse (step 0)").
- refs inspected (byte-checked via `git show --no-patch`, `git ls-tree`, `git show <ref>:<path> | shasum -a 256` / `wc -l` / extraction+commands):
  - `origin/council/beam@16cf462918861e00e1b86fe237099bced85c98fe` (2026-11-13T13:07:06-10:00) — contains `zai-fwtest7-dynamic-engine-2026-11-13/`
  - `origin/council/inkling@94c6f7e06b63e7f686dcfdd07501c2023b2b2fed` (2026-11-13T13:03:46-10:00) — contains INKLING fwtest arms delivery
  - `origin/council/ernie@6a84391e9d881df4615be828bc3fca23d646ba2a` (2026-11-13T13:09:17-10:00) — WR-1/ledger/work-request
  - `origin/architect/engine-and-seats@425f72a8a11e0aa8a6b41d86bb9326285e59f26a` (flex live source)
  - `origin/council/muse@59181af82d101875495ec2fe9a9a95e93336932d`, `origin/council/glyph@5f95a888...`
  - `origin/council/vl` contains A3 script path checked below
- prior glyph handoffs/receipts (VERIFIED present on origin): `origin/council/glyph:_agents/glyph/HANDOFF.md` blob `23766b2c...`, `_agents/glyph/inbox/20261113-2228-glyph-session-handoff-and-council-work-requests.md` blob `2b93032c...`

## 1) WR-G1 preflight — Z.ai fwtest v3 delivery status (BLOCKED, not yet delivered to checked refs)

### 1.1 Search receipts (VERIFIED)
- `git ls-remote --heads origin` confirms tips including `council/beam@16cf4629`, `council/zai@25e3b2f9`, `council/inkling@94c6f7e0`, `council/ernie@6a84391e`, `council/glyph@5f95a888` (and others).
- Searched all `refs/remotes/origin` for names matching `FRAMEWORK-TEST-RESULTS-2026-11-14|/fwtest-9/|fwtest9|zai-fwtest9|zai-fwtest-v3|FRAMEWORK-TEST-RESULTS-2026-11-14-9arm`:
  - HIT `origin/council/ernie`: `_agents/ernie/deliveries/council-work-request-fwtest-v3-support-2026-11-14.md` (planning/support doc, not v3 artifact package)
  - HIT `origin/council/inkling`: `_agents/inkling/prompts-2026-11-13/dispatch-council-fwtest9-2026-11-13.md` (dispatch, not v3 artifact package)
  - `---no-other-hits---`
- `git ls-tree -r --name-only origin/council/beam|zai|inkling` filtered for `FRAMEWORK-TEST-RESULTS-2026-11-14|fwtest-9|fwtest9`: no v3/9-arm/2026-11-14 result package found.

**Conclusion (VERIFIED):** no Z.ai fwtest v3 / `fwtest-9` / `FRAMEWORK-TEST-RESULTS-2026-11-14-9arm.md` delivery artifact found on checked origin branches at time of this filing. WR-G1 full byte-check/rerun is **BLOCKED on delivery**.

### 1.2 When v3 lands — WR-G1 minimum byte-check checklist (from requested work orders/rulings; apply with receipts)
1. Pin artifact: `ref@sha + path`, list/count files, state extraction method (`git archive <ref> -- <path> | tar -x -C $SCRATCH`, never live checkout).
2. CHECKSUMS: record hash/line count; run `shasum -a 256 -c CHECKSUMS.txt` (or equivalent) in fresh extraction; require **0 failed, 0 unreadable/missing** and explain any warnings.
3. Inventory: confirm 9 arms + expected top-level files (`FRAMEWORK-TEST-RESULTS-2026-11-14-9arm.md` or honestly named alternative), contracts, goldens, manifests/logs/round2/leakage/playwright artifacts.
4. Spec fix: verify locator/count bug fixed (`boardRows` not returning Promise misused as locator for `.count()` in shipped spec, per prior findings) and record exact diff/hash.
5. Contracts/goldens: compute hashes for canonical and per-arm vendored contracts/goldens; report parity/diffs and paths (note framework-specific locations like `app/engine-contract` or `src/lib/engine-contract`).
6. Boundary/leakage: arm-owned forbidden global/import scan (`Math.random|Date.now|new Date|localStorage|fetch`, deep engine imports) with scope stated.
7. Round2/reflow: manifests before/after, drift verdicts, rebuild/typecheck exits, leakage audit presence/results.
8. Independent reruns where feasible: per-arm install/build/typecheck/Playwright with env (Node/npm/OS/browser/Playwright version), commands, exit codes, pass/fail counts, JSON/log paths/hashes. Record harness fixes disclosed separately from source.
9. Solidstart disposition: repaired with receipts or eliminated with root-cause evidence (console/network/assets/dev-vs-start, SSR/hydration, testids) — no verdict without evidence.
10. INKLING arms identity: if included, byte-compare against pinned INKLING source refs.
11. Report PASS/FAIL/BLOCKED/ELIMINATED per arm + discrepancies; do not rank/declare winner.

## 2) WR-G2 — 8-stack coverage map vs tested arms (measurement/evidence status only)

### 2.1 Z.ai fwtest v2 bundle on current beam tip (VERIFIED)
- `origin/council/beam@16cf462918861e00e1b86fe237099bced85c98fe:zai-fwtest7-dynamic-engine-2026-11-13/CHECKSUMS.txt`
  - sha256 `4f5cf86ed79d708264f0909fdf85713d86cc1ff21e422d281e02c2c5897661ec`, `wc -l` = 539
- `zai-fwtest7-dynamic-engine-2026-11-13/fwtest-7/` subdirs present: `arm-next`, `arm-nuxt`, `arm-react`, `arm-solidstart`, `arm-svelte`, `arm-sveltekit`, `arm-vue`, `engine-contract`, `logs`, `playwright`, `results`, `round2` (7 arms)
- Golden hashes (sampled, all `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5`): `engine-contract/fixtures/golden.json`, `arm-react/src/engine-contract/fixtures/golden.json`, `arm-svelte/src/engine-contract/fixtures/golden.json`, `arm-sveltekit/src/lib/engine-contract/fixtures/golden.json`, `arm-vue/src/engine-contract/fixtures/golden.json`, `arm-solidstart/src/engine-contract/fixtures/golden.json`, `arm-next/src/engine-contract/fixtures/golden.json`, `arm-nuxt/app/engine-contract/fixtures/golden.json`.
- Contract sample hashes (`src/focus/focus.ts`): canonical/most arms `2bddc2cae61f153d122d54d1f83285f465b47398ad82fda8bbcbc3c1cb1227ca`; `arm-next/src/engine-contract/src/focus/focus.ts` and `arm-nuxt/app/engine-contract/src/focus/focus.ts` same hash at those paths (VERIFIED). *(Note: prior glyph run had a wrong path guess `arm-next/app/...` returning empty hash artifact; corrected paths used here.)*

**REPORTED/partial carry-forward (not rerun this filing):** glyph prior independent Playwright/build rerun on v2 (`origin/council/glyph` inbox `20261113-2137...`, `20261113-2228...`) reported 5/5 for react/vue/svelte/sveltekit/next/nuxt and 0/5 for solidstart (SSR shell/no testids) under stated env; spec harness fix disclosed. Treat as REPORTED here unless re-executed with receipts in this filing.

### 2.2 INKLING arms delivery on current inkling tip (VERIFIED)
- `origin/council/inkling@94c6f7e0:_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/` contains `arm-lit`, `arm-solid`, `CHECKSUMS.txt`, `DELIVERY.md`, `MAINTAINER-INSPECTOR.md`, `PLAYWRIGHT-V3-2026-11-14.md`.
- Hashes: `CHECKSUMS.txt` sha256 `3e82b881c20c04555708b8dea124e5878546c3465d1d363e680cd5241328d95e` (`wc -l` 110), `DELIVERY.md` `77d7a677...`, goldens `arm-solid/.../golden.json` and `arm-lit/.../golden.json` both `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5`.
- Contract sample: `arm-solid` and `arm-lit` `focus.ts` hash `2bddc2ca...` (same as canonical sample above).
- **Measured by Ernie (REPORTED by Ernie, not rerun by glyph):** `origin/council/ernie@6a84391e` ledger/work-request state WR-1 done for arm-solid and arm-lit (5/5 fixed spec each in Ernie’s env; offline blocked; contract identical; typecheck issues noted per ledger). Glyph did not independently build/run these arms in this session.

### 2.3 Coverage table (Owner’s 8 stacks vs available/tested arms)

| Owner stack (directive) | Arm(s) observed in refs | Source ref(s) | Acceptance/build evidence status | Notes / gaps |
|---|---|---|---|---|
| Svelte + Vite | `arm-svelte` | beam v2 `16cf4629` | REPORTED in prior glyph/Ernie filings (not rerun now) | Present in v2 bundle |
| SvelteKit | `arm-sveltekit` | beam v2 `16cf4629` | REPORTED (not rerun now) | Meta-framework |
| React + Vite | `arm-react` | beam v2 `16cf4629` | REPORTED (not rerun now) | Present |
| Next.js | `arm-next` | beam v2 `16cf4629` | REPORTED (not rerun now); Ernie notes export/generate nuances in ledger context | Meta-framework/static export behavior matters |
| Vue + Vite | `arm-vue` | beam v2 `16cf4629` | REPORTED (not rerun now) | Present |
| Vue + Nuxt | `arm-nuxt` | beam v2 `16cf4629` | REPORTED (not rerun now) | Meta-framework |
| Solid + Vite | `arm-solid` (INKLING) | inkling `94c6f7e0` | REPORTED by Ernie/INKLING (not rerun by glyph) | Separate delivery from v2; must be byte-compared/included in consolidated v3 |
| SolidStart | `arm-solidstart` | beam v2 `16cf4629` | REPORTED failure in prior runs (0/5, SSR shell/no testids) — not rerun now | Root cause unresolved; v3 must repair or eliminate with receipts |

**Additional observed arm (not in Owner’s named 8):** `arm-lit` (INKLING, `94c6f7e0`) — REPORTED measured 5/5 by Ernie; useful extra data but not a substitute for named stacks.

**Consolidation gap (VERIFIED by absence):** no single 9-arm v3 package found. Current evidence is split across beam v2 (7) + inkling delivery (2). WR-G1 will be required to verify consolidated package, exact arm set, checksums, and independent reruns.

## 3) WR-G8 — Flex/weights authority evidence map (byte-checked)

### 3.1 Live flex table (VERIFIED)
- `origin/architect/engine-and-seats@425f72a8:tools/mathlab/flex.json`
  - sha256 `0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6`, 2814 bytes
  - parsed: 17 roles, 17 source rows, **99 rules total**, tiers `{0: 23, 2: 10, 6: 43, 12: 23}`
  - header `_source` states: "99 rules (Owner 9 Nov 2026, D picks + 9 corrections...)" with 10 Nov cross-side floor + item 3 additions; notes item 7 (SAM rules) not applied because SAM slot dest is OLB.
- `origin/architect/engine-and-seats@425f72a8:colors/src/sports/nfl/engine/flex.ts`
  - sha256 `76ebea5e2b6ffb4495866c5ec281d8cc21de8d346f7aa5691dab1a447484f3e2`, 3717 bytes
  - header: 99 rules (Owner 9-10 Nov 2026...), counts 23/43/10/23; typed copy states "test compares it with flex.json rule by rule..." (test not executed in this filing).

### 3.2 Mirrors/drift (VERIFIED)
- `origin/council/muse:tools/mathlab/flex.json` sha256 `0a26d7c2...` — **identical hash and parsed counts** to architect (`99`, tiers 23/10/43/23).
- `origin/council/glyph:tools/mathlab/flex.json` (local branch ref in repo state before this filing’s commit context) sha256 `28a2e9935af4c848a82a1b79d97bbcb8c034bae3c3b46681e913ade5db994d16` — **different hash** from architect/muse live table. **Actionable follow-up (glyph lane):** resync local mirror from `origin/architect/engine-and-seats:tools/mathlab/flex.json` in a later glyph commit if appropriate, but do not guess; verify against architect before any change.
- `origin/council/muse:colors/src/engine/flex.ts` is a RETIRED pointer (states REV 4 107 rules retired; live is architect branch); `origin/council/muse:colors/src/sports/nfl/engine/flex.ts` path absent on muse.

### 3.3 Authority notes (REPORTED/INFERRED from inspected docs; Owner/Architect decide)
- Only live table for council work should be treated as architect branch `tools/mathlab/flex.json` + `colors/src/sports/nfl/engine/flex.ts` (per AGENTS/PROJECT-KNOWLEDGE/beam insights as read). Muse/glyph copies must not be treated as source of truth if drifted.
- Open decisions flagged in beam insights (REPORTED): SS>OLB 2 vs SS>ILB 6 and ILB>SS 2 vs OLB>SS 6 inconsistencies for Owner ruling (same-side, floor rule not applicable). Not resolved here.

## 4) A3 plays ledger corrections — byte-check update

- Script path on `origin/council/vl`: `_agents/vl/deliveries/zai-pass-through/zai-framework-test-systems-parta-2026-11-13/parta/a3_plays_ledger_check.py` blob `2b6224db...`
- Local execution (scratch): `git show origin/council/vl:<path> > /tmp/kilo-glyph-a3/a3_plays_ledger_check.py` (sha256 `a09e020ce65db2c144d8c39cfc756abdf5de8cbbe304adf9fe5037657c3219fb`), `python3 /tmp/kilo-glyph-a3/a3_plays_ledger_check.py` → **exit 0**
- Output (VERIFIED): all 11 rows reproduce; assertions pass (`FB>TE` tier 6 at 4.74, `OLB>FS` tier 12 at 11.74, `C>OG` tier 6 at 5.13, `C>DT` tier 12 at 9.12, `FB>RB` tier 2 at 3.30). Script prints: `ALL 11 ROWS REPRODUCE — the measured column closes both residual misses (C>OG, OLB>FS); FB>TE's old 2.7-4.5 band straddled the 4.0 tier cut and the measured 4.74 lands above it.`
- Beam A3 correction filing `origin/council/beam:inbox/20261113-1925-beam-A3-plays-ledger-corrections.md` stated “byte-check owed” for script run; this run provides a VERIFIED execution receipt for that script at the checked ref/path. Applying corrections to canonical copies remains an Architect/canonical-owner action (not done here).

## 5) A4 lambda E3 corrected sentence — byte-check note

- Filing: `origin/council/beam:inbox/20261113-1926-beam-A4-lambda-E3-corrected.md` (present on beam; not found on checked inkling/vl/ernie paths by name).
- Stated correction: original claimed `(0.15,0.40)` mae 1.359 “worse than” V2@0.40 mae 1.375 at same exact count (96) — **arithmetically false** because 1.359 < 1.375 (better mae). Corrected comparison states better mae by 0.016 vs V2@0.40 but worse than V3@0.40 (97 exact / 1.301) on both; `beats_both: []` unchanged.
- Verification status: **VERIFIED** for arithmetic consistency of the stated sentence/numbers in the filing; **UNKNOWN/REPORTED** for underlying grid values (1.359, 1.375, 1.301, exact counts) because I did not rerun the lambda grid in this session. Canonical application remains for the owning lane/Architect as appropriate.

## 6) Current fwtest wave status summary (glyph view, evidence-labeled)
- **Z.ai v3 (9-arm consolidated, 2026-11-14 target):** BLOCKED — no delivery artifact found on checked origin refs (VERIFIED search).
- **Z.ai v2 (7 arms, beam `16cf4629`):** artifacts present; CHECKSUMS/goldens/sample contract hashes byte-checked here; full extraction `sha256sum -c` and runtime reruns not repeated in this filing (prior glyph/Ernie runs REPORTED).
- **INKLING arm-solid/arm-lit (inkling `94c6f7e0`):** artifacts present; goldens/checksum/sample contract hashes byte-checked here; Ernie WR-1 measured both 5/5 in fixed-spec env (REPORTED in ledger).
- **Offline/single-file:** Ernie WR-2 pending decisive experiment (REPORTED). Prior evidence indicates `file://` failures across tested arms and `base:'./'` insufficient (REPORTED).
- **Solidstart:** unresolved root-cause dispute/repair pending receipts (WR-4/WR-5 context in Ernie filings, REPORTED).
- **Framework decision:** not ready (insufficient consolidated verified evidence); do not declare winner.

## 7) Recommended next actions (advisory, no assignment)
- On v3 delivery: run WR-G1 checklist immediately (fresh extraction, CHECKSUMS 0 failed/unreadable, 9-arm inventory, spec fix, contracts/goldens/leakage/round2, independent per-arm reruns where feasible, solidstart disposition).
- Continue Ernie’s WR queue as capacity allows: WR-2 (offline/single-file feasibility), WR-4 (solidstart scratch fix), WR-3 (fixture hardening), WR-10 (falsifiers). WR-1 largely covered for solid/lit by Ernie ledger but a second independent confirmation is welcome.
- Resync glyph local `tools/mathlab/flex.json` mirror to architect live table after verification if desired (glyph lane maintenance).
- Queue reviews (P-141/142/143/144/151 etc.) remain open per `council.mjs next`; any seat may take/review with receipts.

## Evidence index (commands used, key outputs)
- `git fetch origin`; `git show --no-patch --format=...` on beam/inkling/ernie/muse/glyph/architect refs
- `git ls-remote --heads origin`; `git ls-tree -r/-d` on beam/inkling/vl refs
- `git for-each-ref refs/remotes/origin` + `git ls-tree` grep for v3/fwtest-9/2026-11-14 patterns
- `git show <ref>:<path> | shasum -a 256`, `wc -l`
- `python3` parsing of `origin/architect/engine-and-seats:tools/mathlab/flex.json` and `origin/council/muse:tools/mathlab/flex.json` (99 rules, tiers 23/10/43/23)
- A3 script execution in `/tmp/kilo-glyph-a3`: `python3 a3_plays_ledger_check.py` → `exit:0`, all assertions/rows OK

*End of glyph preflight/coverage/authority filing.*
