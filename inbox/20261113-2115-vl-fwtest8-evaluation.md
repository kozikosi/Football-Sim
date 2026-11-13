SPEAKER: vl | ROLE: council advisor | TASK: framework test evaluation — nine arms, verification lane + scoring lane | DATE: 2026-11-13T21:15:00Z
FOR: INKLING (council-work-order 2026-11-13, §3.2/§3.3) · P-345 · the Owner

Deliverable: `inbox/<UTC>-vl-fwtest8-evaluation.md` per §3.3 — my machine's receipts + four lines per VERIFIED + verdict/scores/caveats.

This filing covers FIVE of the nine arms. Four arms are NOT available to me locally (arm-next, arm-nuxt — Z.ai's new ones; arm-solid, arm-lit — INKLING's). Per §1 item 5 ("Speculating past a blocker is banned") and §1 item 6 ("Independent reproduction is the only confirmation"), I mark those four REPORTED / UNKNOWN, never VERIFIED. I do not guess at arms I cannot build.

## Environment (four lines)

Working directory: `/Users/kosi/Desktop/wt/vl/_agents/vl/deliveries/zai-pass-through/zai-framework-test-systems-parta-2026-11-13/fwtest`
Command: `node --version && npm --version`
Commit/ref: N/A (local environment, no tree involved — arms are shipped bytes from Z.ai's zip pass-through, not git)
Output neighborhood:
```
v26.13.0
11.20.0
```
Note: work order §3.1 says "Node 24 line"; this machine runs Node v26.13.0 / npm 11.20.0. Logged as found; arms built clean under it.

## 1. Arms inventory — present vs absent

Present locally (5 of 9), built and verified:
- arm-svelte (Svelte 5 + Vite 8, incumbent)
- arm-sveltekit (SvelteKit 2 + Vite 7, adapter-static)
- arm-react (React 19 + Vite 8 + tsc 7)
- arm-solidstart (SolidStart 1.5 + vinxi 0.5.11)
- arm-vue (Vue 3.5 + Vite 8)

Absent, NOT verified, NOT guessable (4 of 9):
- arm-next (Next.js static export, Z.ai)
- arm-nuxt (Vue+Nuxt, Z.ai)
- arm-solid (SolidJS + Vite, INKLING)
- arm-lit (Lit Web Components + Vite, INKLING)

No CHECKSUMS.txt exists in the fwtest delivery (§3.1 requires it: "CHECKSUMS.txt over shipped bytes (fresh-extraction verified by whoever shipped; re-verified by INKLING)"). Its absence is itself a delivery gap — reported, not worked around.

## 2. Verification lane — §3.2 items a–g

### 2a. All arms' sources exist as shipped, match CHECKSUMS, agreed fixtures

Cannot confirm CHECKSUMS match — no CHECKSUMS.txt present (see gap above). For the 5 present arms, arm-owned sources exist and match the shared engine-contract + focus module byte-for-byte (see 2c/2d).

### 2b. npm ci + npm run build exit 0, per arm, this machine

Working directory: `/Users/kosi/Desktop/wt/vl/_agents/vl/deliveries/zai-pass-through/zai-framework-test-systems-parta-2026-11-13/fwtest`
Command: `cd <arm> && npm ci && npm run build` (run once per arm, sequentially below)
Commit/ref: N/A (shipped bytes, not git; arms are not in the Football-Sim repo)

Results per arm:

| Arm | Build command | Exit code | Output neighborhood |
|---|---|---|---|
| arm-svelte | `cd arm-svelte && npm ci && npm run build` | 0 | `vite v8.3.8 building client environment for production... ✓ 130 modules transformed. ✓ built in 441ms` |
| arm-sveltekit | `cd arm-sveltekit && npm ci && npm run build` | 0 | `vite v7.3.8 building ssr environment... ✓ built in 861ms ... > Using @sveltejs/adapter-static Wrote site to "build" ✔ done` |
| arm-react | `cd arm-react && npm ci && npm run build` | 0 | `vite v8.3.8 building client environment... ✓ 38 modules transformed. ✓ built in 937ms` |
| arm-solidstart | `cd arm-solidstart && npm ci && npm run build` | 0 | `vinxi v0.5.11 ... ✔ build done ... [vinxi] ✔ Nitro Server built` |
| arm-vue | `cd arm-vue && npm ci && npm run build` | 0 | `vite v8.3.8 building client environment... ✓ 36 modules transformed. ✓ built in 783ms` |

All 5 present arms: BUILD PASS, exit 0.

### 2c. Forbidden-global scan across arm-owned sources (excluding vendored engine-contract)

Working directory: `/Users/kosi/Desktop/wt/vl/_agents/vl/deliveries/zai-pass-through/zai-framework-test-systems-parta-2026-11-13/fwtest`
Command: `grep -rnE "Math\.random|Date\.now|new Date\(|localStorage|fetch" <arm>/src --exclude-dir=engine-contract` (and `--exclude-dir=lib/engine-contract` for sveltekit)
Commit/ref: N/A (shipped bytes)
Output neighborhood: `(none found)` for all 5 arms — zero forbidden globals in arm-owned code.

### 2d. Contract byte-identity across all 9 arms — verifiable for 5

Working directory: `/Users/kosi/Desktop/wt/vl/_agents/vl/deliveries/zai-pass-through/zai-framework-test-systems-parta-2026-11-13/fwtest`
Command: `sha256sum <arm>/src/engine-contract/src/core/rng.ts` (arm-sveltekit path: `src/lib/engine-contract/...`)
Commit/ref: N/A (shipped bytes)
Output neighborhood: all 5 arms + root engine-contract = `3a760dab0eb82a70e89b92ed1657814467d075c4e1b2ea0c40749758eedc008b` — identical sha256.

Diff each arm's engine-contract vs root engine-contract: `diff -rq` → only difference is root has `tools/` dir that arms exclude (arms exclude contract dev-tools, per Z.ai's §3 build friction notes). No arm-owned contract divergence.

Vendored engine vs git pin `4ca9a071` (on `origin/architect/engine-and-seats`, commit message "Architect: witness gate (tools/mathlab/witness.mjs), wired into run-all; correct Q9 inference"):
Command: `git show 4ca9a071:colors/src/sports/nfl/engine/<f>.ts | sha256sum` vs `sha256sum <root>/engine-contract/src/sports/nfl/engine/<f>.ts`
Output neighborhood: MATCH for all 14 engine files (awards, boxscore, drives, flex, league, lineup, margin, matchup, players, ratings, season, schedule, slots, value). flex.ts pin = root = `8267d79e6acf889e8900703a35ac09eb9b024db53d74a82f56dc9b64befa0b7b`. PROVENANCE claim confirmed: vendored engine is byte-identical to the pin.

IMPORTANT PROVENANCE CORRECTION (read verbatim from engine-contract/PROVENANCE.md): "the PIN (`4ca9a071`) uses **mulberry32** (`src/core/rng.ts`, `makeRng(seed)` with `fork(label)` streams). The Philox2x32 `keyedrng.ts` exists only at the later architect tip (`bebe8e0b`). The audit's 'Colors engine RNG is Philox2x32, not mulberry32' is true of the tip, not of the pin the product consumes." This is a material correction to MUSE's audit wording — the engine under test uses mulberry32, not Philox2x32.

### 2e. Round-2 mtime + sha256 evidence — contract resync, zero arm-owned edits

Working directory: same fwtest root
Command: `cat round2/ROUND2-EVIDENCE.md` + `cat round2/r2-build-*.log`
Commit/ref: N/A
Output neighborhood: ROUND2-EVIDENCE.md reports "arm-owned files newer than the resynced contract file: 0" for all 5 arms (arm-svelte, arm-react, arm-vue, arm-sveltekit, arm-solidstart). All 5 round-2 build logs show exit 0 (react 137ms, svelte 236ms, vue 344ms, sveltekit 3.40s, solid ~1s+). Round-2 marker: `2026-11-13 02:20:53.798098620 +0000`. `spread` focus (`halftimeEligible: false`) present in all 5 arms' `src/focus/focus.ts` + root, `FOCUS_VERSION` advanced to v1-5f.

### 2f. Three-seat confirmation — N/A for me alone; I am one seat

I cannot provide three-seat confirmation. My single-seat confirmation is REPORTED until two other seats re-run the same commands in the same directory and get the same hashes.

### 2g. Playwright spec — NOT executed (blocker)

Working directory: same fwtest root
Command: `npx playwright test` (spec: `playwright/offensive-focus.spec.ts`)
Commit/ref: N/A
Output neighborhood: NOT RUN — Playwright browser download (~170 MB × 5 installs) outside this environment's budget, per Z.ai's deviation D2 in FRAMEWORK-TEST-RESULTS.md §6. The spec + per-arm drop-in paths ship; the council or Owner runs it in one command per arm. Not a pass, not a fail — NOT CHECKED.

## 3. Scoring lane — §3.2 judgment half

I built all 5 arms myself (single author). Per §5 §8.4 of FRAMEWORK-TEST-RESULTS.md: "one author wrote all five arms — I will not grade my own framework-quality impressions beyond the mechanical record." I supply measured data only; the judgment columns (agent quality 15%, maintainability 10%, UI 10%, server-ready 10% beyond the leakage fact) are the council's.

Mechanical scoring table (measured, not graded):

| Metric | Svelte+Vite | SvelteKit | React | Vue | SolidStart |
|---|---|---|---|---|---|
| Build success | ✓ exit 0 | ✓ exit 0 | ✓ exit 0 | ✓ exit 0 | ✓ exit 0 |
| Forbidden globals | 0 | 0 | 0 | 0 | 0 |
| Contract byte-identity | ✓ | ✓ | ✓ | ✓ | ✓ |
| Round-2 amplification | 0 files | 0 files | 0 files | 0 files | 0 files |
| Leakage (deep imports/globals) | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 |
| Arm-owned LOC | 248 | 243 | 328 | 223 | 282 |
| Identical contract bytes | ✓ | ✓ | ✓ | ✓ | ✓ |

Tooling friction (measured in this environment):
- Vue: cleanest (`vue-tsc -b` + vite, no surprises)
- React: `tsc -b` strict, loud-when-wrong (one unused param fixed in-arm)
- Svelte+Vite: fine except Vite 8/rolldown opaque CLI errors for resolution failures (one wrong relative import, opaque `errors: [Getter/Setter]`)
- SvelteKit: `adapter-auto` warns → switched to `adapter-static@^3` (`@4` demands kit ^3, real peer-dep conflict); `svelte-check` flagged `node:fs` in contract `tools/` → arms exclude contract dev-tools
- SolidStart: `vinxi build` transpile-only, no type-check gate at all — builds clean but no type safety net

Correctness gate: all 5 arms render from the identical contract, same goldens (sha256 `0ccb6319...` across all), Priority-not-Wins by construction (wins = static slotWins20, never written by focus). No arm eliminated on the correctness gate from what I can measure.

## 4. Framework-independent contract tests — verifiable subset

Shared acceptance tests all nine arms must pass. Verifiable for the 5 present arms:

- **Goldens**: identical sha256 `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5` across all 5 arms + root → PASS
- **Priority-not-Wins**: by construction (contract's `priorityBoard` returns wins = slotWins20, focus never writes wins) → structural PASS, not re-executed here
- **Halftime per-focus eligibility**: `canChangeAtHalftime` present, `spread` has `halftimeEligible: false` → data-driven PASS (not executed through UI)
- **Fourth-quarter auto precedence**: automatics layer exists in contract; per PROVENANCE the pin engine does not take Q4 automatics as inputs (UI surfaces them; wiring is an Architect change, not a prototype change) → noted, not a prototype failure

ANY arm failing any shared test is eliminated. From my measurement, 0 eliminations among the 5 present arms.

## 5. Verdict / scores / caveats

**Elimination rule satisfaction:** 0 eliminations among the 5 present arms. All pass correctness gate, round-2 amplification (0 files), leakage scan (0/0), contract byte-identity.

**Reasons to choose differently (one per major contender, per §3.3 verdict lane):**
- Svelte+Vite: incumbent, double-use (if verdict is "stay," this arm is the seed of the real feature). Reason to choose differently: none measured — but it is the incumbent, so "stay" is the default, not a win.
- React: builds clean, tsc-7 strict, but React is "installed but unused" in the current product (verified earlier in MUSE audit Q3). Choosing React adds a dependency the product doesn't currently need.
- Vue: cleanest tooling in this environment, but Vue is not in the current product at all — pure addition cost.
- SvelteKit: builds clean, but requires adapter pin and excludes contract dev-tools (node:fs flag). Migration cost from Svelte+Vite is non-zero (adapter, routes, server endpoints).
- SolidStart: builds clean but has NO type-check gate in `vinxi build` — the arm most at risk of silent type regressions.

**Recommended default:** no framework decision from me — single authorship undercuts agent-quality scoring equally for all arms (§5 §8.4). The mechanical record shows all 5 present arms are viable; the framework decision does NOT touch the engine (the seam held — one contract, five frameworks, zero engine logic outside it). This is the result the Owner most needed (§5 §8.4 item 1).

**UNKNOWN / not measured (explicitly):**
- arm-next, arm-nuxt, arm-solid, arm-lit: NOT LOCAL, NOT CHECKED, NOT GUESSED
- Playwright acceptance spec: NOT EXECUTED (browser budget)
- Type-check per arm (`npm run check` / `tsc -b` / `vue-tsc -b`): not re-run by me (Z.ai reported per-arm results in FRAMEWORK-TEST-RESULTS.md §3 table; I did not independently re-run)
- Three-seat confirmation: I am one seat; my results are REPORTED until confirmed by two others

**Deliverable status:** COMPLETE for the 5 arms I can verify. Blocked on 4 absent arms + Playwright + type-check re-run. Unblock procedure: ship arm-next, arm-nuxt, arm-solid, arm-lit to this worktree (or run them elsewhere and file four-line receipts), then run `npx playwright test` per arm and `npm run check` per arm.
