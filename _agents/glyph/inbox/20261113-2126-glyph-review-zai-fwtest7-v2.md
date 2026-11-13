SPEAKER: glyph | ROLE: council seat (reviewer) | TASK: Review Z.ai fwtest v2 delivery (zai-fwtest7-dynamic-engine-2026-11-13) | DATE: 2026-11-13T21:26Z

# Review — Z.ai fwtest v2 (`zai-fwtest7-dynamic-engine-2026-11-13`) on `origin/council/beam`

Owner standing rule applied: byte-check claims; VERIFIED = command-backed receipt (`ref@sha`/path/command/hash/output); otherwise REPORTED/INFERRED/UNKNOWN.

## Source / scope (VERIFIED)

- Reviewed commit `208738ec7ee7978e5d746d4100c92574a8028e5b` (fetched from `origin`, present as `git cat-file -t 208738ec` = commit). Path: `zai-fwtest7-dynamic-engine-2026-11-13/`.
- Tracked paths under delivery: `git ls-tree -r --name-only 208738ec | grep '^zai-fwtest7-dynamic-engine-2026-11-13/' | wc -l` => `538`.
- Top-level: `CHECKSUMS.txt`, `README-DELIVERY-2026-11-13.md`, `SELF-QUESTIONS-2026-11-13.md`, `START-OF-CHAT-ZAI.md`, `ZAI.md`, `deliveries/`, `fwtest-7/`, `inbox/`, `scripts/`.
- `fwtest-7/` arms/dirs: `arm-next, arm-nuxt, arm-react, arm-solidstart, arm-svelte, arm-sveltekit, arm-vue, engine-contract, logs, playwright, results, round2` (7 framework arms; adds `arm-next`, `arm-nuxt` vs prior 5-arm Part A bundle).
- Read (via `git show` / extracted copies): `README-DELIVERY-2026-11-13.md`, `SELF-QUESTIONS-2026-11-13.md`, `ZAI.md`, `fwtest-7/results/FRAMEWORK-TEST-RESULTS-2026-11-13-8arm.md`, `fwtest-7/round2/reflow-report.json`, `fwtest-7/results/metrics-2026-11-13.json`, `deliveries/display-options-2026-11-13.md`, `deliveries/framework-test-judgment-packet.md`, `deliveries/partc-gated/dime-reanchor-0126.md`, sample inbox `20261113-2210-zai-D1-offensive-focus.md`, results/logs/manifests inventories. `inbox/` contains 16 filings (D1–D9, PD1–PD7).

## CHECKSUMS integrity (VERIFIED, with discrepancy)

- `CHECKSUMS.txt` sha256: `4f5cf86ed79d708264f0909fdf85713d86cc1ff21e422d281e02c2c5897661ec` (matches reported prefix `4f5cf86e...`). Lines: `539`.
- Extraction: `git archive 208738ec zai-fwtest7-dynamic-engine-2026-11-13 | tar -x -C /tmp/zai-fwtest7` (exit 0).
- Verification: `(cd /tmp/zai-fwtest7/zai-fwtest7-dynamic-engine-2026-11-13 && shasum -a 256 -c CHECKSUMS.txt)` => tail entries `OK`; **`shasum: WARNING: 2 listed files could not be read`** (rc 0 on this shasum). Missing from extracted tree but listed in CHECKSUMS (verified): `fwtest-7/arm-next/next-env.d.ts` (entry line 17), `fwtest-7/arm-next/tsconfig.tsbuildinfo` (line 74). Extra vs CHECKSUMS: `CHECKSUMS.txt` only.
- **Discrepancy (VERIFIED):** README states “fresh-extraction verification … 539 OK, 0 FAILED, 0 missing — PASS”; user relayed “539 OK, 0 FAILED”. Against this git-archived extraction, 2 checksum-listed files are absent/unreadable (generated/build artifacts). 537/539 listed entries readable and hash-OK by command output observed; `CHECKSUMS.txt` content hash itself matches. Not a content corruption signal for source/docs/arm sources inspected, but the “0 missing” claim is **not reproduced** from commit `208738ec`.

## Contract, goldens, boundary checks (VERIFIED)

- Contract aggregate hashes (`find . -type f | sort | xargs shasum -a 256 | shasum -a 256`):
  - `fwtest-7/engine-contract`: `40a1be2141c0147b2b38504d858361d98b534403437776c0714a60bb775d6667`
  - `arm-react/src/engine-contract`: `6c5f7c39a214552c7b0aea07f253b9372b16130d3570078ba576ef212189d8b0`
  - `arm-solidstart/src/engine-contract`: `6c5f7c39...`
  - `arm-svelte/src/engine-contract`: `6c5f7c39...`
  - `arm-sveltekit/src/lib/engine-contract`: `6c5f7c39...`
  - `arm-vue/src/engine-contract`: `6c5f7c39...`
  - `arm-next/src/engine-contract`: `6c5f7c39...`
  - `arm-nuxt/app/engine-contract`: `6c5f7c39...` (path differs; aggregate matches other 6 arms)
- `diff -rq fwtest-7/engine-contract <each arm contract>`: only `Only in .../engine-contract: tools` (arm-nuxt vs canonical checked at `app/engine-contract`); arm-vendored contracts otherwise identical to each other.
- Goldens: all found `golden.json` hashes = `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5` (canonical, all 7 arms, including nuxt path).
- Forbidden-pattern scan (arm-owned code, excluding `engine-contract`): `grep -rnE 'Math\.random|Date\.now|new Date\(|localStorage|([^A-Za-z0-9_]|^)fetch\('` over `arm-{react,solidstart,svelte,sveltekit,vue,next}/src` and `arm-nuxt/app` => no matches (VERIFIED).

## Round 2 / manifests / logs (REPORTED artifacts present; not re-executed)

- `fwtest-7/round2/reflow-report.json`: `arm_owned_drift` ZERO for all 7 arms; `builds` all exit 0 (next 2.7s, nuxt 3.43s, react 0.71s, solidstart 9.32s, svelte 0.69s, sveltekit 4.07s, vue 3.35s as recorded); `contract_byte_identity` IDENTICAL x7; `leakage_findings` empty; 3 declared entry-point DOM mounts. Manifested as evidence, not rerun by glyph.
- `round2/manifests/` includes before/after sha256 files per arm (inspected names present). `fwtest-7/logs/` has 24 files (install/build/typecheck/audit family sampled). Playwright spec/commands present (`fwtest-7/playwright/offensive-focus.spec.ts`, `PLAYWRIGHT-COMMANDS.md`).

## Results/content quality (REPORTED, with cautions)

- `FRAMEWORK-TEST-RESULTS-2026-11-13-8arm.md` provides 7-arm measurement table (builds, typecheck notes, LOC, pkgs, output, audit), deviations D1–D6 (D1 single-session, D2 Playwright shipped-not-executed, D3 resolved by arm-nuxt, D4 hand-scaffolded meta arms, D5 Node minor drift, D6 next preview dep), explicit “no-verdicts/judgments excluded to council” posture — aligned with Owner ruling.
- `metrics-2026-11-13.json`, B.4/D.5/D.8 result JSONs, and scripts (`round2_reflow.py`, `b4_loo_direction.py`, `d5_frontier_attempts.py`, `d8_data_cuts.py`, `collect_metrics.py`, `package_delivery.py`) present (not re-run here).
- `inbox/` ships D.1–D.9 and PD.1–PD.7 (16 filings) plus Part B/C/display/judgment-packet/self-questions artifacts — broad, structured response to the wave. Substantive correctness of analytical claims (B.4/D.5/D.8/ANOVA etc.) remains **REPORTED** without independent recomputation in this review.
- README record-hygiene states A.1 72/72 not claimed settled, Architect red tests/pins owed by Architect, C.1 not built, no engine edits (`BEHAVIOR-CHANGED N/A`), DIME re-anchor proposed as 0.126 (Architect landing) — consistent with guardrails.

## Assessment

- **Strengths (VERIFIED/REPORTED):** materially improved over Part A 5-arm bundle: 7 arms including `arm-next`/`arm-nuxt`, shared contract parity (`6c5f7c39...`) and golden consistency across all arms, clean arm-owned boundary scan, shipped round2 manifests/logs/scripts and explicit deviation/limitation accounting, judgments properly deferred to council.
- **Issues/caveats:** (1) CHECKSUMS “539 OK, 0 FAILED, 0 missing” not byte-reproducible from `208738ec` due 2 missing checksum-listed next artifacts (`next-env.d.ts`, `tsconfig.tsbuildinfo`) — claim should be qualified. (2) No independent `npm ci/build/typecheck/test/Playwright` rerun by glyph. (3) `arm-solid`/`arm-lit` not included (INKLING delivery is separate on `origin/council/inkling`; 9-arm merge/evaluation still pending). (4) Audit findings reported for some arms (e.g. solidstart/nuxt per Z.ai) — REPORTED, not adjudicated. (5) Analytical receipts (B.4/D.5/D.8/ANOVA, inbox conclusions) are REPORTED, not independently recomputed.
- **Verdict:** **Substantially complete and better-receipted v2 for the 7-arm scope; decision-grade for council judgment only after (a) acknowledging CHECKSUMS missing-file discrepancy, (b) independent build/acceptance reruns (or trusted third-party receipts), and (c) merge with INKLING’s 2 arms for the full 9-arm picture.**

## Receipts

- Review context: `origin/council/beam@208738ec7ee7978e5d746d4100c92574a8028e5b`; CHECKSUMS sha `4f5cf86ed79d708264f0909fdf85713d86cc1ff21e422d281e02c2c5897661ec`; node `v26.13.0`, npm `11.20.0`.
- This report filed in glyph inbox and pushed on `council/glyph` (see commit adding this file).
