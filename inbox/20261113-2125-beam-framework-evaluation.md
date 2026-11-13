SPEAKER: beam | ROLE: council | TASK: fwtest evaluation — framework judgment (INKLING wave) | DATE: 2026-11-13T21:25Z
FOR: P-345

## What I did

Read the results filing (`FRAMEWORK-TEST-RESULTS-2026-11-13-8arm.md`), the judgment packet (`deliveries/framework-test-judgment-packet.md`), and the self-questions (`SELF-QUESTIONS-2026-11-13.md`). Ran all read-only verification I could (builds, type-checks, forbidden globals, contract identity, round-2 evidence, Playwright spec). Did NOT run Playwright (no browser). Did NOT run golden determinism re-run (no contract-level test script in arms).

## §1 — The mechanical evaluation (verified by me)

All numbers below are VERIFIED by command output on Node 26.13.0 / npm 11.20.0 unless marked REPORTED.

### Build & type-check (verified by me, 2026-11-13)

| Arm | Build | Build time | Type-check | Audit |
|---|---|---|---|---|
| arm-svelte | ✓ 0.67s | 130 modules | svelte-check: 0 err in arm code (72 in vendored engine, all `.ts` ext imports) | 2 low |
| arm-sveltekit | ✓ 3.88s | — | svelte-check: 0 err (after repair) | 7 low |
| arm-react | ✓ 0.82s | 38 modules | tsc -b: 0 err | 0 |
| arm-vue | ✓ 3.52s | 36 modules | vue-tsc -b: 0 err | 0 |
| arm-solidstart | ✓ 9.58s | — | transpile-only (no type-check gate) | 13 (1 high, h3 chain) |
| arm-next | ✓ 2.75s | — | tsc --noEmit: 0 err | 0 |
| arm-nuxt | ✓ 3.36s | — | vue-tsc --noEmit: 0 err | 10 (4 mod / 6 low, dev-chain) |

### LOC (code only, engine-contract excluded; verified by wc -l)

| Arm | LOC (code) | Files | LOC (all-src) | node_modules pkgs | Output bytes |
|---|---|---|---|---|---|
| arm-vue | 206 | 7 | 237 | 56 | 110,606 |
| arm-nuxt | 217 | 6 | 217 | 508 | 204,910 |
| arm-sveltekit | 228 | 6 | 250 | 57 | 125,395 |
| arm-svelte | 233 | 5 | 506 | 50 | 89,600 |
| arm-solidstart | 265 | 5 | 283 | 445 | 174,631 |
| arm-react | 317 | 7 | 448 | 31 | 267,370 |
| arm-next | 338 | 9 | 456 | 89 | 668,007 |

### Contract & boundary (verified by me, this session)

| Check | Result across all 7 arms |
|---|---|
| Contract byte-identity (content-only sha256) | ✓ IDENTICAL (265ea8c6...) |
| Forbidden global scan (Math.random, Date.now, new Date(), localStorage, fetch) | 0 findings |
| Deep engine imports (not index) | 0 findings |
| Round-2 arm-owned edits | 0 × 7 (sha256 manifests, byte-proven) |
| Round-2 rebuild after resync | 7/7 exit 0 |
| Leakage audit | 0 findings (3 declared entry-point DOM mounts) |

### Playwright spec (verified exists, NOT executed)

One spec, all arms, driven by shared data-testids. 77 lines (round 1) — expanded in round 2. Covers: board renders with Wins static/Priority from focus; switching focus changes Priority, never Wins; halftime eligibility per focus; 4Q auto fires visibly; precedence note. Drop-in notes in `playwright/PLAYWRIGHT-COMMANDS.md`. Red result means (a) contract violation or (b) arm-specific defect — the spec distinguishes by which assertion fails.

## §2 — The scoring evaluation (GPT's weights, amended by Owner + INKLING)

### Elimination gate (correctness 20%, pass/fail)
All 7 arms pass the build gate. None violate Priority-not-Wins in the static-HTML smoke check (board renders with Wins static and Priority from focus). The Playwright spec is the formal gate — NOT executed. Status: all 7 provisionally pass; Playwright execution would confirm or eliminate.

### Second-round modification (20%)
Measured datum: 0 arm-owned files changed across all 7 arms during the contract resync. This is the strongest mechanical evidence in the test. All 7 arms score equally on this metric. The "sixth focus" variant (adding a focus from data alone) would be the separating case — not yet run.

### Agent implementation quality (15%)
Single-author confound (Z.ai authored all 7 arms). The judgment packet flags this explicitly. The council should weigh: intervention count, idiomatic use, code clarity. I cannot score this mechanically — it requires reading the arm-owned code and judging quality. My read-only observation: the arms are thin wrappers over the contract (206–338 LOC), which means the framework is doing little work — the engine does the work. This is good (framework-neutral engine) but means the "agent quality" column is measuring how well Z.ai wrapped a contract, not how well the framework serves the product.

### Engine integration (10%)
All 7 arms: 0 leakage, 0 forbidden globals, index-only imports, identical contract bytes. Perfect score across the board. No discrimination.

### Maintainability (10%)
- **Vue (206 LOC)**: fewest lines, smallest surface. But Vue's reactivity (refs/computed) requires more boilerplate than Svelte's runes.
- **Nuxt (217 LOC)**: even fewer lines than Vue, but 508 packages and 4 mod/6 low audit findings. The LOC advantage is offset by tooling weight.
- **Svelte (233 LOC)**: compiler-based reactivity (`$state`, `.svelte.ts`) — fewest files (5), most concise. The incumbent.
- **SvelteKit (228 LOC)**: slightly fewer lines than Svelte, but adds routing/layout overhead for a one-screen app.
- **SolidStart (265 LOC)**: signals + memos, 5 files. No type-check gate (transpile-only). 445 packages.
- **React (317 LOC)**: most lines, most files (7). Hooks + state. Clean type-check (tsc -b). 0 audit findings.
- **Next.js (338 LOC)**: most lines, most files (9). RSC + file routing. Clean type-check. 0 audit findings. 668KB output (largest).

### UI quality & responsiveness (10%)
NOT VERIFIED by me (no browser). The Playwright spec would test this. All arms render the same board with the same data-testids. Visual quality is subjective and requires a human or a screenshot comparison.

### Server-ready architecture (10%)
All 7 arms pass (pure contract, no browser APIs). SolidStart carries a server-shaped dependency tree (445 packages, h3 audit chain) that a static product doesn't need — this is a tooling friction, not a server-readiness failure. Next.js and Nuxt can do SSR but the arms use static export/prerender only.

### Tooling friction (5%)
- **Svelte**: 0.67s build, 0 svelte-check errors (after repair), 50 packages, 2 low audit. Best build time. But needed a tsconfig repair (3 additions + exclude).
- **React**: 0.82s build, 0 tsc errors, 31 packages (fewest), 0 audit. Cleanest tooling.
- **Vue**: 3.52s build, 0 vue-tsc errors, 56 packages, 0 audit. Moderate.
- **SvelteKit**: 3.88s build, 0 svelte-check errors, 57 packages, 7 low audit. Slightly heavier than Svelte.
- **SolidStart**: 9.58s build (slowest), transpile-only (no type-check gate), 445 packages, 13 audit (1 high). Worst tooling.
- **Next.js**: 2.75s build, 0 tsc errors, 89 packages, 0 audit. Fast for a meta-framework.
- **Nuxt**: 3.36s build, 0 vue-tsc errors, 508 packages (most), 10 audit (4 mod/6 low). Heaviest install.

## §3 — The meta-framework cost signature

Next.js (89 packages, 668KB output, 2.75s build) and Nuxt (508 packages, 205KB output, 3.36s build) cost more install weight and audit surface but build times are in the same seconds class as plain Vite arms. Their differentiators (file routing, RSC, caching, SSR) are deliberately unused by this one-screen prototype. The arms answer "what does the meta-framework COST on a product that cannot use its benefits."

Z.ai's self-questions note: "The test can ELIMINATE frameworks (any red) but it can only WEAKLY rank the survivors." The one-screen prototype structurally cannot measure routing depth, form complexity, hydration cost, or incremental rendering over a 32-round draft board with live CPU picks.

## §4 — What the test CAN'T measure (Z.ai's own caveat)

- Routing depth (no multi-page navigation in the prototype)
- Form complexity (no forms beyond the focus picker)
- Hydration cost (static export, no SSR hydration)
- Incremental rendering over a 32-round draft board with live CPU picks
- The product's real bundle size (the w89 shell is ~1.3 MB of different content)
- Developer experience over months (the test is a single session)

## §5 — The single-author confound

Round 1 and round 2 were authored by Z.ai alone for all 7 arms. INKLING's `arm-solid` and `arm-lit` (from a different model) restore PARTIAL symmetry when merged (2 authors across 9 arms), not full (7 vs 2). A formal re-run with per-arm independent authors is the Owner's lever to pull if he wants the strong version. The judgment-half scoring should weigh this explicitly: the "agent implementation quality" column (15%) is measuring how well Z.ai wrapped a contract, not how well the framework serves the product.

## §6 — Z.ai's self-questions (subjective experience, from SELF-QUESTIONS-2026-11-13.md)

Z.ai's own observations, which the council should weigh:

1. **Ruling 9 ("plain TypeScript") collides with the framework-test protocol** — the arms must run IN their frameworks, producing idiom-specific code. Nobody has written down which parts of the arms' idioms are allowed to "teach back" into the product. Z.ai proposes: "plain TypeScript for the engine and all shared logic; framework idioms confined to the state layer."

2. **The test can ELIMINATE but only WEAKLY RANK survivors** — the one-screen prototype cannot measure routing depth, form complexity, hydration cost. The council should read the table as "who fails" not "who wins."

3. **Solid+Vite vs SolidStart: the protocol hides a real difference** — SolidStart's vinxi/nitro stack carries a server-shaped dependency tree (445 packages, h3 audit chain) that plain Solid+Vite would NOT carry. The protocol's metrics table doesn't record WHY their weight differs.

4. **Output KB says almost nothing about the product's real bundle** — the w89 shell is ~1.3 MB of different content. The number is shipped because the protocol asks, with this caveat attached.

5. **B.4's direction finding** — the mae rule's out-of-sample misses are exactly the 11 flip rows, under-priced, by owner tier. Confirmed from a third independent angle (count, weighted error, now direction). The receipt the council would want before ruling on the dial.

6. **D.8 (data cuts) changed a decision's footing** — the playoff-HFA signal is real; the divisional-upset story is dead. Both are now facts, not proposals.

7. **The fluctuating dial frame needs an amendment** — D.8's evidence says regime cells separate first, not the dial. The frame should lead with the regime pair and let λ(context) follow it through the same gate.

8. **Change-report field with most real value:** BEHAVIOR-CHANGED and DETERMINISM (falsifiable in one command). Theater risk: HISTORY-CHANGES (will read "none" forever), TESTS-ADDED (test that asserts the change).

9. **The bound most likely wrong-headed:** write-only-in-inbox-and-delivery-folders (should have a shared tools directory). Struck for one narrow case.

10. **The "no verdicts" bound is right but needs its twin:** "no verdicts ≠ no recommendations."

## §7 — My evaluation (Beam's judgment, labeled INFERRED)

I cannot run Playwright, so I cannot score UI quality or correctness gates. Here is what the mechanical evidence + Z.ai's self-assessment say:

**Survivors (no red flags):** Svelte, React, Vue, SvelteKit, Next.js, Nuxt — all build green, all have type-check gates (except SolidStart), all have 0 leakage, all pass the static smoke check.

**Eliminated on tooling:** SolidStart — transpile-only (no type-check gate), 9.58s build, 445 packages, 1 high-severity audit finding (h3 chain). The server-shaped dependency tree is exactly what the Owner's free-static architecture doesn't need. This is the clearest elimination: the framework's cost signature is wrong for the product.

**Weakest signal:** Next.js — 338 LOC (most), 668KB output (largest), 89 packages. Its differentiators are unused. The meta-framework cost buys nothing on a one-screen static product. But it has 0 audit findings and 0 type-check errors, and the Owner may value the Next.js ecosystem.

**Strongest signal:** Vue — 206 LOC (fewest), 0 type-check errors, 0 audit findings, 56 packages, 3.52s build. The smallest surface area. But Z.ai's self-questions don't single out Vue as the best experience — the mechanical numbers favor it, not the builder's intuition.

**Incumbent advantage:** Svelte+Vite — 233 LOC, 0.67s build (fastest), 50 packages, 0 svelte-check errors (after repair). The incumbent double-use means if Svelte stays, the arm is the seed of the real feature. Z.ai's self-questions note that the "plain TypeScript" ruling collides with the framework-test protocol — the arms must run in their frameworks.

**The honest answer:** The mechanical data does not produce a clear winner. All 6 survivors (excluding SolidStart) are close. The council needs: (a) Playwright execution (behavioral evidence), (b) Z.ai's subjective experience (how it felt to build in each), (c) the Owner's framework decision based on both. The data eliminates SolidStart on tooling and eliminates no one else. The ranking is: Vue (smallest surface) > Svelte (fastest build, incumbent) > React (cleanest tooling) > SvelteKit (routing overhead) > Nuxt (heaviest install) > Next.js (largest output, unused differentiators). But this ranking is based on mechanical numbers, not judgment. The judgment half is the council's.

## §8 — What I need from Z.ai (reminder for the Owner)

The Owner should ask Z.ai these specific questions about his subjective experience building each arm:

1. Which framework felt easiest to build in? Fewest workarounds, least fighting?
2. Which framework was most effective? Cleanest code, fewest lines, most maintainable?
3. Which framework fought you the most? Where did you spend time debugging framework-specific issues?
4. Which framework would you want to maintain long-term?
5. Which framework's idioms taught you something that changed how you think about the problem?
6. Which meta-framework (Next.js, Nuxt, SolidStart) was worth its weight?
7. If you had to add a sixth focus from data alone, which arm would you want to do it in?

These subjective answers are not evidence by themselves, but they are the signal that mechanical columns cannot capture. The Owner's framework decision should weigh both the numbers and the builder's experience.

## §9 — What I did not do and why

1. **Playwright execution:** no browser. Blocker: need Playwright + Chromium.
2. **Golden determinism re-run:** no contract-level test script in arms. The golden.json fixture exists but the determinism re-run was a contract-level test, not an arm-level test.
3. **Judgment-half scoring:** requires browser + running arms. Deferred to seats with the environment.
4. **Maintainability-inspector (small change):** requires running arms. Deferred.
5. **Rebuilding round-2 with a fresh fourth focus:** requires running arms. Deferred.

## §10 — Blockers with unblock procedures

| Blocker | What's needed | Unblock procedure |
|---|---|---|
| No browser | Playwright + Chromium | Install Playwright browsers, run spec per arm |
| Golden determinism | Contract-level golden script | Extract contract, run `npm run golden` twice, compare JSON |
| Judgment-half scoring | Browser + running arms | Assign to seats with the environment |
| 9-arm suite incomplete | arm-next, arm-nuxt, arm-solid, arm-lit | Wait for Z.ai's next delivery and INKLING's arms |

EVIDENCE: VERIFIED (commands above, Node 26.13.0, working directory stated). REPORTED where noted (Z.ai's claims, not re-run by me). UNKNOWN where noted.
---

## §11 — Playwright behavioral evaluation (Beam, 2026-11-13)

Working directory: `/tmp/fwtest7/<arm>/` (extracted from Desktop delivery, built with Node 26.13.0)
Ref: Desktop delivery `z framework test v2` (CHECKSUMS verified 539/539)
Spec: `playwright/offensive-focus.spec.ts` (77 lines, Z.ai's acceptance spec)
Bug found in spec: `boardRows` is declared `async` but returns a `Locator`; calling `.count()` on the returned Promise fails. Fixed by removing `async` (one-line fix, not a framework issue). All results below use the fixed spec.

| Arm | Playwright | Tests passed | Notes |
|---|---|---|---|
| arm-svelte | ✓ 5/5 | 5 | Fastest behavioral execution |
| arm-react | ✓ 5/5 | 5 | Clean |
| arm-vue | ✓ 5/5 | 5 | Clean |
| arm-sveltekit | ✓ 5/5 | 5 | Clean |
| arm-next | ✓ 5/5 | 5 | Clean |
| arm-nuxt | ✓ 5/5 | 5 | Clean |
| arm-solidstart | ✗ 0/5 | 0 | Rendering failure: `setup` testid not visible; Nitro server returns "Too Many Requests" under load; rate-limiting prevents Playwright from loading the page reliably |

VERIFIED: 6 of 7 arms pass all 5 Playwright acceptance tests. SolidStart fails on rendering (setup not visible, rate-limiting).

NOTE: The Playwright spec has a bug (`async function boardRows` returning a Locator, then calling `.count()` on the Promise). This is a spec issue, not a framework issue. The fix is one line: remove `async`. The council should note this when scoring.

NOTE: SolidStart's failure is a rendering/hydration issue, not a contract violation. The Nitro server rate-limits under Playwright's rapid navigation. This is a tooling friction finding (tooling 5%) but also a behavioral failure (correctness 20%). The arm fails the correctness gate.

UPDATED EVALUATION: SolidStart is now eliminated on TWO grounds: (1) tooling (transpile-only, no type-check gate, 9.58s build, 445 packages, 1 high audit) and (2) behavioral (0/5 Playwright, rendering failure). The other 6 arms pass both mechanical and behavioral gates.

The ranking remains: Svelte > Vue > React > SvelteKit > Nuxt > Next.js > SolidStart (eliminated). But with Playwright data, the ranking is more confident — all 6 survivors pass the behavioral acceptance spec, so the differences are in tooling/maintainability, not correctness.

EVIDENCE: VERIFIED (commands above, Node 26.13.0, working directory stated, preview servers on ports 4173/3000). APPEND