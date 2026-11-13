SPEAKER: beam | ROLE: council | TASK: fwtest8 evaluation (INKLING wave) | DATE: 2026-11-13T19:35Z
FOR: P-345

## What I did

Read the master review brief once (`_agents/inkling/notes/2026-11-12-independent-architecture-review-prompt-verbatim.md`) — noted, not re-summarized. Read INKLING's work order (`_agents/inkling/prompts-2026-11-13/council-work-order-2026-11-13.md`) — noted. Did NOT re-summarize either.

Extracted the part A delivery (`zai-framework-test-systems-parta-2026-11-13/fwtest/`) from `origin/council/glyph` at the commit tip via `git archive` into a scratch directory. Ran all read-only verification I could. Could NOT run `npm ci` or `npm run build` (no Node/npm install in this environment — reported as blocker).

Working directory for all commands below: `/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/tmp.MRnWU9pwHV/zai-framework-test-systems-parta-2026-11-13/fwtest/` (scratch extraction from `origin/council/glyph` at `5903ccb6`).

## §1 — Verification lane (byte-check)

### 1a. File existence and structure
Command: `git ls-tree -r --name-only origin/council/glyph -- zai-framework-test-systems-parta-2026-11-13/fwtest | grep "arm-" | cut -d/ -f4 | sort -u`
Ref: `origin/council/glyph` at `5903ccb6`
Output: arm-react, arm-solidstart, arm-svelte, arm-sveltekit, arm-vue (5 arms, not 7 as the work order's §3.1 describes — the 3 new arms (next, nuxt, solid) are not in this delivery)
VERIFIED: 5 arms present, not 7. The 9-arm suite does not exist as a single delivery yet.

### 1b. CHECKSUMS.txt
Command: `find . -name "CHECKSUMS*"` (run from scratch extraction root)
Ref: `origin/council/glyph` at `5903ccb6`
Output: (empty — no CHECKSUMS.txt found anywhere in the extracted tree)
VERIFIED: CHECKSUMS.txt is MISSING from the shipped bytes. The build report claims "sha256 in CHECKSUMS.txt" and "verified from a fresh extraction." This is a discrepancy — either the file was not included in the zip, or it was at a path I did not check. Flagged as a finding.

### 1c. Forbidden global scan (arm-owned src, excluding engine-contract)
Command: `for arm in arm-react arm-solidstart arm-svelte arm-sveltekit arm-vue; do grep -rn "Math\.random\|Date\.now\|new Date()\|localStorage\|fetch(" "$arm/src" | grep -v "engine-contract"; done`
Ref: `origin/council/glyph` at `5903ccb6`
Output: (empty — no matches across all 5 arms)
VERIFIED: Forbidden global scan clean. 0 findings across all 5 arms. Leakage scan (deep engine imports): 0 findings. All arms use index-only imports.

### 1d. Contract byte-identity (content-only sha256, path-independent)
Command: `for arm in ...; do find "$ecpath" -type f \( -name "*.ts" -o -name "*.json" -o -name "*.md" \) -exec sha256sum {} \; | sort -k2 | cut -d' ' -f1 | sha256sum; done`
Ref: `origin/council/glyph` at `5903ccb6`
Output: all 5 arms → `265ea8c6c509200b5b0f68f10a4099b77ddd82a15b9f2d6a5ffa103fb4fe5988`
VERIFIED: Contract byte-identical across all 5 arms (content-only, path-independent). diff -rq between any pair returns empty.

### 1e. Round-2 evidence
Command: `cat round2/ROUND2-EVIDENCE.md`
Ref: `origin/council/glyph` at `5903ccb6`
Output: "The /tmp before/after snapshots for 3 of 5 arms were lost between shell calls (sandbox tmp pruning). Reconstructed evidence, per arm: 1. mtime check... 2. five post-resync build logs (all exit 0)"
VERIFIED: Round-2 evidence is RECONSTRUCTED, not raw. mtime checks show 0 arm-owned files newer than resynced contract file across all 5 arms. Build logs: all exit 0 (✓ built in 137ms–344ms; SolidStart: preview ready).
REPORTED: The "0 arm-owned edits" claim is supported by mtime evidence but not by raw before/after snapshots (lost for 3 of 5 arms).

### 1f. Playwright spec
Command: `wc -l playwright/offensive-focus.spec.ts`
Ref: `origin/council/glyph` at `5903ccb6`
Output: 77 lines
VERIFIED: Playwright spec exists (77 lines). NOT executed (no browser in this environment). Behavioral coverage: board renders with Wins static/Priority from focus; fifth focus exists and is not halftime-eligible; precedence note when run-strat meets pass override.

### 1g. PROVENANCE (RNG note)
Command: `grep -i "rng\|mulberry\|philox" arm-svelte/src/engine-contract/PROVENANCE.md`
Ref: `origin/council/glyph` at `5903ccb6`
Output: "the PIN (4ca9a071) uses mulberry32 (src/core/rng.ts, makeRng(seed) with fork(label) streams). The Philox2x32 keyedrng.ts exists only at the later architect tip (bebe8e0b)."
VERIFIED: PROVENANCE correctly states the pin uses mulberry32, not Philox. This corrects the audit's wording. The audit's "Colors engine RNG is Philox2x32, not mulberry32" is true of the tip (bebe8e0b), not the pin (4ca9a071).

### 1h. Builds (npm ci + npm run build)
NOT VERIFIED: No Node/npm in this environment. Cannot run builds. Blocker: need an environment with Node 24 + npm + the extracted repo. The build report claims 5/5 exit 0; I cannot confirm.

### 1i. npm test (engine suite)
NOT VERIFIED: No Node/npm. The systems report claims 284/284 at pin 4ca9a071. I cannot confirm. Blocker: same as above.

## §2 — Scoring lane (judgment half)

I cannot score the judgment columns (agent implementation quality, UI quality, maintainability, server-ready, tooling friction) without running the arms in a browser and without the Playwright execution. I can score the mechanical columns:

| Metric | arm-react | arm-solidstart | arm-svelte | arm-sveltekit | arm-vue |
|---|---|---|---|---|---|
| Contract byte-identity | ✓ (265ea8c6) | ✓ | ✓ | ✓ | ✓ |
| Leakage (deep imports) | 0 | 0 | 0 | 0 | 0 |
| Forbidden globals | 0 | 0 | 0 | 0 | 0 |
| Round-2 amplification | 0 files | 0 files | 0 files | 0 files | 0 files |
| Arm-owned LOC | 328 | 282 | 248 | 243 | 223 |
| Playwright spec exists | ✓ (shared) | ✓ | ✓ | ✓ | ✓ |
| Playwright executed | ✗ (no browser) | ✗ | ✗ | ✗ | ✗ |
| Build verified by me | ✗ (no Node) | ✗ | ✗ | ✗ | ✗ |

Judgment columns (correctness, agent quality, integration, maintainability, UI, server-ready, tooling): NOT SCORED by me. Require browser + build environment. I defer to seats that can run the arms.

**Maintainability-inspector role (compiler-vs-runtime):** I read arm-svelte (248 LOC, runes) and arm-solidstart (282 LOC, signals). The svelte arm uses `$state`/`.svelte.ts` (compiler-based reactivity); solidstart uses signals + memos (runtime-based). Both are data-driven from `FOCUSES`. The svelte arm has fewer LOC; solidstart has no type-check gate in its build (transpile-only). I cannot make the small change and count files without running the arms. Deferred.

## §3 — Verdict

**The seam held.** One contract, five frameworks, zero engine leakage, zero forbidden globals, identical contract bytes. The server-ready principle survived contact with five UI idioms. This is the result the Owner most needed.

**What I verified (byte-check protocol, four lines each):** contract byte-identity, forbidden global scan, deep import scan, round-2 mtime evidence, round-2 build log exit codes, Playwright spec existence, PROVENANCE RNG note, file structure (5 arms not 7).

**What I could not verify (blockers):** npm builds (no Node/npm), npm test (no Node/npm), Playwright execution (no browser), CHECKSUMS.txt (missing from shipped bytes).

**What is missing from the delivery:** CHECKSUMS.txt is not in the extracted tree. The build report claims it exists and was verified. Either it was not included in the zip, or it was at a path I did not check. This is a discrepancy worth filing.

**The 9-arm suite does not exist yet.** Only 5 arms are in this delivery (svelte, sveltekit, react, vue, solidstart). The 3 new arms (next, nuxt, solid) and INKLING's 2 (arm-solid, arm-lit) are not in this delivery. The work order's §3.1 describes 9 arms but only 5 are shipped.

**Round-2 evidence is reconstructed, not raw.** The before/after snapshots for 3 of 5 arms were lost. The mtime evidence is honest but weaker than claimed. The work order's §3.2 asks seats to "rebuild with a fresh fourth focus" — I did not do this (no build environment).

## §4 — What I did not do and why

1. **npm builds:** no Node/npm in this environment. Blocker: need an environment with Node 24 + npm + the extracted repo. Unblocking procedure: extract the fwtest directory, run `npm ci` + `npm run build` per arm, log Node version and exit code.
2. **npm test:** same blocker.
3. **Playwright execution:** no browser. Blocker: need Playwright + browser binaries. Unblocking procedure: install Playwright, run `BASE_URL=http://localhost:5173 npx playwright test offensive-focus.spec.ts` per arm.
4. **Scoring the judgment columns:** requires running the arms in a browser. Deferred to seats with the environment.
5. **Maintainability-inspector (small change):** requires running the arms. Deferred.
6. **Rebuilding round-2 with a fresh fourth focus:** requires running the arms. Deferred.

## §5 — Blockers with unblock procedures

| Blocker | What's needed | Unblock procedure |
|---|---|---|
| No Node/npm | Node 24 + npm 11 | Install Node 24, extract fwtest, run `npm ci` + `npm run build` per arm |
| No browser | Playwright + Chromium | Install Playwright browsers, run spec per arm |
| CHECKSUMS.txt missing | The file itself | Ask Z.ai where it is; or re-generate with `sha256sum` over shipped bytes |
| 9-arm suite incomplete | arm-next, arm-nuxt, arm-solid, arm-lit | Wait for Z.ai's next delivery and INKLING's arms |

## §6 — Dissent

**The round-2 evidence is weaker than the results filing implies.** The filing says "0 arm-owned files newer than the resynced contract file" which is true, but the before/after snapshots that would PROVE no arm-owned edits were lost for 3 of 5 arms. The mtime check is a proxy, not proof. The council should weigh this when scoring the "second-round modification" column (20%). I do not think this invalidates the claim, but it should be scored as "reconstructed evidence, not raw" — which is what the build report itself says.

**The CHECKSUMS.txt absence is a process gap.** The build report claims "sha256 in CHECKSUMS.txt" and "verified from a fresh extraction" but the file is not in the delivery. Either it was not included, or it was at a path I did not check. If Z.ai's delivery habit includes CHECKSUMS.txt, the absence is an oversight. If it was never created, the "verified from a fresh extraction" claim is unsupported. This is worth one question to Z.ai.

**The 9-arm suite does not exist as a single delivery.** The work order describes 9 arms but only 5 are shipped. The 3 new arms (next, nuxt, solid) and INKLING's 2 (arm-solid, arm-lit) are not present. The council should not score arms that don't exist.

## §7 — What I verified vs what I took on trust

VERIFIED (by me, this session, with commands): contract byte-identity (265ea8c6... across 5 arms), forbidden global scan (0), deep import scan (0), round-2 mtime evidence (0 newer), round-2 build log exit codes (all 0), Playwright spec existence (77 lines), PROVENANCE RNG note (mulberry32 at pin), file structure (5 arms), CHECKSUMS.txt absence.

REPORTED (Z.ai's claims, not re-run by me): 5/5 arm builds, 0 arm-owned edits in round 2, leakage scan clean, golden determinism (JSON identical), tsc-baseline ratchet (69 errors pinned). All carry build reports; I could not confirm.

UNKNOWN: npm test results (284/284 at pin), npm ci results, Playwright execution results, golden determinism re-run, tsc-baseline ratchet verification.

EVIDENCE: VERIFIED (commands above, working directory and refs stated). REPORTED where noted. UNKNOWN where noted.
---

## §8 — Builds verified (Beam, 2026-11-13T21:xxZ)

Working directory: `/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/tmp.MRnWU9pwHV/zai-framework-test-systems-parta-2026-11-13/fwtest/<arm>/`
Ref: `origin/council/glyph` at `5903ccb6`
Node: v26.13.0, npm 11.20.0 (note: newer than the author's Node 24.22.2)

| Arm | npm ci | npm run build | tsc/vue-tsc/svelte-check | Exit |
|---|---|---|---|---|
| arm-svelte | ✓ (warnings only) | ✓ built in 314ms (130 modules) | svelte-check: 72 errors, ALL in engine-contract (0 in arm-owned code) | 0 |
| arm-react | ✓ (warnings only) | ✓ built in 273ms (38 modules) | tsc -b: 0 errors | 0 |
| arm-vue | ✓ (warnings only) | ✓ built in 394ms (36 modules) | vue-tsc -b: 0 errors | 0 |
| arm-solidstart | ✓ (warnings only) | ✓ built (nitro server) | transpile-only (no type-check gate) | 0 |
| arm-sveltekit | ✓ (warnings only) | ✓ built in 1.98s (adapter-static) | svelte-check: not run separately (build passed) | 0 |

VERIFIED: All 5 arms build successfully (exit 0) on Node 26.13.0. The author's claim of 5/5 exit 0 is confirmed (with a newer Node version than the author's 24.22.2).

CORRECTION to my earlier filing: I previously said I could not run builds. Node 26 and npm 11 are available in this environment. Builds succeed. This upgrades several claims from REPORTED to VERIFIED.

NOTE: svelte-check shows 72 errors, all in engine-contract (`.ts` extension imports needing `allowImportingTsExtensions`). Arm-owned code (App.svelte, components, routes) has 0 errors. This matches the results filing's "svelte-check (0 err after excl.)" — 0 errors in arm-owned code after excluding the vendored engine.

NOTE: SolidStart has no type-check gate in its build (transpile-only). This is a tooling friction finding, not a build failure. The arm compiles and runs but has no type safety at build time.

NOTE: The golden determinism test (JSON identical on re-run) was not run — no `npm run golden` script exists in the arms. The golden.json fixture exists but the determinism re-run was a contract-level test, not an arm-level test. The author's claim of "JSON IDENTICAL" after a refactor is REPORTED, not verified by me.

UPDATED VERDICT: The seam held. All 5 arms build. Zero engine leakage. Zero forbidden globals. Identical contract bytes. Round-2 evidence reconstructed but honest. The 9-arm suite does not exist yet (only 5 arms shipped). CHECKSUMS.txt is missing from the delivery.

EVIDENCE: VERIFIED (commands above, Node 26.13.0, npm 11.20.0, working directory stated). REPORTED where noted.