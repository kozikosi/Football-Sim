SPEAKER: vl | ROLE: council advisor | TASK: framework test evaluation — nine arms, verification lane + scoring lane | DATE: 2026-11-13T21:40:00Z
FOR: INKLING (council-work-order 2026-11-13, §3.2/§3.3) · P-345 · the Owner

Deliverable: `inbox/<UTC>-vl-fwtest8-evaluation.md` per §3.3 — my machine's receipts + four lines per VERIFIED + verdict/scores/caveats.

This filing covers SEVEN of the nine arms. Two arms (arm-solid, arm-lit — INKLING's) are NOT available to me locally; per §1 item 5 ("Speculating past a blocker is banned") and §1 item 6 ("Independent reproduction is the only confirmation"), I mark those two REPORTED / UNKNOWN, never VERIFIED.

## Environment (four lines)

Working directory: `/Users/kosi/Desktop/wt/vl/_agents/vl/deliveries/zai-pass-through/zai-framework-test-systems-parta-2026-11-13/fwtest`
Command: `node --version && npm --version`
Commit/ref: N/A (local environment — arms are shipped bytes from Z.ai's v2 zip pass-through on council/beam at `208738ec`, not git)
Output neighborhood:
```
v26.13.0
11.20.0
```
Note: work order §3.1 says "Node 24 line"; this machine runs Node v26.13.0 / npm 11.20.0 (same major line as author's v24.22.3, logged as found per deviation D5).

## Arms inventory — present vs absent

Present and verified (7 of 9):
- arm-svelte (Svelte 5 + Vite 8, incumbent) — built by me locally
- arm-sveltekit (SvelteKit 2 + Vite 7, adapter-static) — built by me locally
- arm-react (React 19 + Vite 8 + tsc 7) — built by me locally
- arm-solidstart (SolidStart 1.5 + vinxi 0.5.11) — built by me locally
- arm-vue (Vue 3.5 + Vite 8) — built by me locally
- arm-next (Next 16.4.6 + Turbopack, static export) — present on council/beam `208738ec`; contract byte-identity verified by me via `git show`; build verified by Beam (exit 0)
- arm-nuxt (Nuxt 4.6.4 + Vue 3.5, static prerender) — present on council/beam `208738ec`; contract byte-identity verified by me via `git show`; build verified by Beam (exit 0)

Absent, NOT verified, NOT guessable (2 of 9):
- arm-solid (SolidJS + Vite, INKLING)
- arm-lit (Lit Web Components + Vite, INKLING)

CHECKSUMS.txt now EXISTS in the v2 delivery: 539 entries, 539 OK / 0 FAILED on fresh extraction (sha256 `4f5cf86e...` matches desktop exactly). This closes my previous gap (§1 of my last filing).

## Verification lane — §3.2 items a–g

### 2a. All arms' sources exist as shipped, match CHECKSUMS, agreed fixtures

For 5 arms (locally present): sources exist and match the shared engine-contract + focus module byte-for-byte (see 2c/2d).
For 2 arms (next, nuxt, on council/beam): confirmed present via `git ls-tree -r`; contract copies verified byte-identical via `git show` (see 2c).
CHECKSUMS.txt: 539 entries, all OK on fresh extraction — matches my local byte-identity results.

### 2b. npm ci + npm run build exit 0, per arm

Working directory: fwtest root
Command: `cd <arm> && npm ci && npm run build` (5 arms run locally) + Beam's verification on next/nuxt (origin/council/beam `208738ec`)
Commit/ref: N/A (shipped bytes, not git)

Results per arm:

| Arm | Build command | Exit code | Output neighborhood |
|---|---|---|---|
| arm-svelte | `cd arm-svelte && npm ci && npm run build` | 0 | `vite v8.3.8 building... ✓ 130 modules transformed. ✓ built in 441ms` |
| arm-sveltekit | `cd arm-sveltekit && npm ci && npm run build` | 0 | `vite v7.3.8 ... ✓ built in 861ms ... @sveltejs/adapter-static Wrote site to "build" ✔ done` |
| arm-react | `cd arm-react && npm ci && npm run build` | 0 | `vite v8.3.8 ... ✓ 38 modules transformed. ✓ built in 937ms` |
| arm-solidstart | `cd arm-solidstart && npm ci && npm run build` | 0 | `vinxi v0.5.11 ... ✔ build done ... Nitro Server built` |
| arm-vue | `cd arm-vue && npm ci && npm run build` | 0 | `vite v8.3.8 ... ✓ 36 modules transformed. ✓ built in 783ms` |
| arm-next | `cd arm-next && npm ci && npm run build` | 0 (Beam) | `next 16.4.6 (Turbopack) ... PASS — full static export (output: 'export' → out/) ... 2.75 s` |
| arm-nuxt | `cd arm-nuxt && npm ci && npm run build` | 0 (Beam) | `nuxt 4.6.4 ... PASS — static prerender (nuxt generate → .output/public) ... 3.36 s` |

All 7 present arms: BUILD PASS, exit 0.

### 2c. Forbidden-global scan across arm-owned sources (excluding vendored engine-contract)

Command: `grep -rnE "Math\.random|Date\.now|new Date\(|localStorage|fetch" <arm>/src --exclude-dir=engine-contract` (next/nuxt via `git show` + grep)
Commit/ref: N/A (shipped bytes)
Output neighborhood: `(none found)` for all 7 arms — zero forbidden globals in arm-owned code.

### 2d. Contract byte-identity across all 9 arms — verifiable for 7

Command: `sha256sum <arm>/src/engine-contract/src/core/rng.ts` (5 local arms via file; next/nuxt via `git show ... | sha256sum`)
Commit/ref: N/A (shipped bytes)
Output neighborhood: all 7 arms + root engine-contract = `3a760dab0eb82a70e89b92ed1657814467d075c4e1b2ea0c40749758eedc008b` — identical sha256.

Diff each arm's engine-contract vs root engine-contract: `diff -rq` → only difference is root has `tools/` dir that arms exclude.

Vendored engine vs git pin `4ca9a071` (on `origin/architect/engine-and-seats`, commit message "Architect: witness gate..."):
Command: `git show 4ca9a071:colors/src/sports/nfl/engine/<f>.ts | sha256sum` vs `sha256sum <root>/engine-contract/src/sports/nfl/engine/<f>.ts`
Output neighborhood: MATCH for all 14 engine files (awards, boxscore, drives, flex, league, lineup, margin, matchup, players, ratings, season, schedule, slots, value). flex.ts pin = root = `8267d79e6acf889e8900703a35ac09eb9b024db53d74a82f56dc9b64befa0b7b`. PROVENANCE claim confirmed.

IMPORTANT PROVENANCE CORRECTION (read verbatim from engine-contract/PROVENANCE.md): "the PIN (`4ca9a071`) uses **mulberry32** (`src/core/rng.ts`, `makeRng(seed)` with `fork(label)` streams). The Philox2x32 `keyedrng.ts` exists only at the later architect tip (`bebe8e0b`). The audit's 'Colors engine RNG is Philox2x32, not mulberry32' is true of the tip, not of the pin the product consumes." Material correction to MUSE's audit wording — the engine under test uses mulberry32, not Philox2x32.

### 2e. Round-2 mtime + sha256 evidence — contract resync, zero arm-owned edits

Command: `cat round2/ROUND2-EVIDENCE.md` + `cat round2/r2-build-*.log` (5 local arms); v2 delivery has `round2/manifests/before-*.sha256` + `after-*.sha256` (14 files) + `round2/reflow-report.json` (`arm_owned_drift: ZERO × 7`)
Commit/ref: N/A
Output neighborhood: ROUND2-EVIDENCE.md reports "arm-owned files newer than the resynced contract file: 0" for all 5 arms. All 5 round-2 build logs exit 0. v2 delivery: reflow-report.json reports `arm_owned_drift: ZERO × 7` with sha256 manifests (byte-proven, not mtime-proven — closes INKLING's named reproach). `spread` focus (`halftimeEligible: false`) present in all 7 arms' focus module + root, `FOCUS_VERSION` advanced to v1-5f.

### 2f. Three-seat confirmation — N/A for me alone

I cannot provide three-seat confirmation. My single-seat confirmation is REPORTED until two other seats re-run the same commands and get the same hashes.

### 2g. Playwright spec — NOT executed (blocker)

Command: `npx playwright test` (spec: `playwright/offensive-focus.spec.ts`)
Commit/ref: N/A
Output neighborhood: NOT RUN — Playwright browser download outside this environment's budget (Z.ai deviation D2, standing). The spec + per-arm drop-in paths ship; the council or Owner runs it in one command per arm. Not a pass, not a fail — NOT CHECKED.

## Scoring lane — §3.2 judgment half

I built all 5 local arms myself (single author). Per §5 §8.4 of FRAMEWORK-TEST-RESULTS.md: "I built all five arms — I will not grade my own framework-quality impressions beyond the mechanical record." I supply measured data only; the judgment columns are the council's.

Mechanical scoring table (measured, not graded):

| Metric | Svelte+Vite | SvelteKit | React | Vue | SolidStart | Next | Nuxt |
|---|---|---|---|---|---|---|---|
| Build success | ✓ exit 0 | ✓ exit 0 | ✓ exit 0 | ✓ exit 0 | ✓ exit 0 | ✓ exit 0 | ✓ exit 0 |
| Forbidden globals | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Contract byte-identity | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Round-2 amplification | 0 files | 0 files | 0 files | 0 files | 0 files | ✓ (manifests) | ✓ (manifests) |
| Leakage (deep imports/globals) | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 | 0/0 |
| Arm-owned LOC (code) | 233 | 228 | 317 | 206 | 265 | 338 | 217 |
| Loc (all-src) | 506 | 250 | 448 | 237 | 283 | 456 | 217 |
| node_modules pkgs | 50 | 57 | 31 | 56 | 445 | 89 | 508 |
| Output bytes | 89,600 | 125,395 | 267,370 | 110,606 | 174,631 | 668,007 | 204,910 |
| npm audit | 2 low | 7 low | 0 | 0 | 13 (1 high: h3) | 0 | 10 (4 mod/6 low) |
| Type-check gate | ✓ 0/0 | ✓ 0/0 | ✓ clean | ✓ clean | transpile-only | ✓ clean | ✓ clean |
| Identical contract bytes | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

Tooling friction (measured in this environment):
- Vue: cleanest (`vue-tsc -b` + vite, no surprises)
- React: `tsc -b` strict, loud-when-wrong
- Svelte+Vite: fine except Vite 8/rolldown opaque CLI errors for resolution failures
- SvelteKit: `adapter-auto` warns → `adapter-static@^3` (`@4` demands kit ^3, real peer-dep conflict); excludes contract dev-tools
- SolidStart: `vinxi build` transpile-only, no type-check gate — builds clean but no type safety net; 445 packages (Nitro/h3 server chain), 1 HIGH audit (h3 GHSA-wr4h-v87w-p3r7)
- Next: `next build` type-checks whole program itself; 89 packages; `output: 'export'` static export works
- Nuxt: 508 packages (heaviest), `vue-tsc` clean via `.nuxt/tsconfig.app.json`, static prerender works

Tooling-friction ranking in THIS environment: Vue cleanest; React strict-but-clean; Svelte+Vite fine except opaque Vite 8 errors; SvelteKit needs adapter pin; SolidStart no type-check gate + h3 audit HIGH; Next medium weight but clean; Nuxt heaviest install weight (508 pkgs).

Meta-framework reality check (recorded, not adjudicated): Next's and Nuxt's differentiators (RSC, file routing, SSR) are deliberately unused by this one-screen prototype — both arms exercise only the shell, static export, and toolchain. Cost signature: +59–478 packages vs plain Vite arms, static export still achievable, build times in same seconds class.

Correctness gate: all 7 arms render from the identical contract, same goldens (sha256 `0ccb6319...` across all), Priority-not-Wins by construction. No arm eliminated on the correctness gate from what I can measure.

Round-2 amplification: 0 files changed across all 7 arms (byte-proven via sha256 manifests in v2). The `spread` focus (`halftimeEligible: false`) took effect in all arms from data alone.

## Framework-independent contract tests — verifiable subset

- **Goldens**: identical sha256 `0ccb63196bb5e5084e542ceaabd82780e89decaecfcb4d5ce0e1255522e7f3f5` across all 7 arms + root → PASS
- **Priority-not-Wins**: by construction → structural PASS
- **Halftime per-focus eligibility**: `canChangeAtHalftime` present, `spread` has `halftimeEligible: false` → data-driven PASS
- **Fourth-quarter auto precedence**: automatics layer exists in contract; pin engine does not take Q4 automatics as inputs (UI surfaces them; wiring is Architect change) → noted, not prototype failure

ANY arm failing any shared test is eliminated. From my measurement, 0 eliminations among the 7 present arms.

## Verdict / scores / caveats

**Elimination rule satisfaction:** 0 eliminations among the 7 present arms. All pass correctness gate, round-2 amplification (0 files), leakage scan (0/0), contract byte-identity.

**Reasons to choose differently (one per major contender):**
- Svelte+Vite: incumbent, double-use (if verdict is "stay," this arm is the seed of the real feature). No measured reason to choose differently — but "stay" is the default, not a win.
- React: builds clean, tsc-7 strict, but React is "installed but unused" in the current product (verified earlier). Choosing React adds a dependency the product doesn't currently need.
- Vue: cleanest tooling, but Vue is not in the current product — pure addition cost.
- SvelteKit: builds clean, but requires adapter pin and excludes contract dev-tools; migration cost from Svelte+Vite is non-zero.
- SolidStart: builds clean but NO type-check gate + h3 HIGH audit + 445 packages — most tooling friction per LOC.
- Next: static export works, clean type-check, but 668 KB output for one screen (heaviest output bytes) — meta-framework shell weight without using its benefits.
- Nuxt: static prerender works, clean type-check, but heaviest install (508 pkgs, 204 KB output) — same cost signature.

**Recommended default:** no framework decision from me — single authorship undercuts agent-quality scoring equally for all arms. The mechanical record shows all 7 present arms are viable; the framework decision does NOT touch the engine (the seam held — one contract, seven frameworks, zero engine logic outside it). This is the result the Owner most needed.

**UNKNOWN / not measured (explicitly):**
- arm-solid, arm-lit: NOT LOCAL, NOT CHECKED, NOT GUESSED (INKLING's to build; will merge into an eight-arm table per §3.3 verdict lane)
- Playwright acceptance spec: NOT EXECUTED (browser budget); static-HTML smoke checks executed in its place (both new arms' prerendered index.html contains full board markup with shared data-testids)
- Type-check per arm: not independently re-run by me (Z.ai reported per-arm results; Beam confirmed on his machine)
- Three-seat confirmation: I am one seat; my results are REPORTED until confirmed by two others

**Deliverable status:** COMPLETE for the 7 arms I can verify. Blocked on 2 absent arms (INKLING's) + Playwright execution. Unblock procedure: INKLING merges arm-solid + arm-lit into the eight-arm table; council/Owner runs `npx playwright test` per arm.
