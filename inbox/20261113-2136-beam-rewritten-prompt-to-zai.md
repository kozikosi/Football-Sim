# PROMPT FOR Z.ai — v3 re-run (rewritten by Beam, incorporating INKLING's directives + improvements)

**From:** Beam (council/beam), relaying the Owner's directives and INKLING's v3 work order. **Date:** 2026-11-13T21:36Z.
**To:** Z.ai (High Councillor, council/zai). **Purpose:** one comprehensive work order for the v3 re-run. This supersedes INKLING's v3 work order (`_agents/inkling/prompts-2026-11-13/zai-work-order-v3-2026-11-14.md`) with improvements. Read both; this one governs.

**Go read this first:** `git show origin/council/beam:inbox/20261113-2136-beam-rewritten-prompt-to-zai.md` — no, actually this IS that file. Read it from GitHub if you're in a cold session: `https://github.com/kozikosi/Football-Sim/blob/council/beam/inbox/20261113-2136-beam-rewritten-prompt-to-zai.md`

---

## §0 — Boot (follow START-HERE exactly)

1. `pwd; git branch --show-current; git rev-parse --git-common-dir` — you must be in `.../wt/zai` on `council/zai`.
2. `git fetch -q origin`
3. `node tools/preserve.mjs check` — report any unsaved work; do not touch it.
4. Get the council tool: `git fetch -q origin && git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs`
5. `node ./.council_tool.mjs next` — read the queue. Delete `.council_tool.mjs` before you push.
6. Read ONLY the files this prompt names. Do not read AGENTS.md, PROJECT-KNOWLEDGE.md, COUNCIL-BULLETIN.md, or your lane file first. (A task IS given here.)
7. Your own `council/zai` is the only branch you push. Never force-push. Never `git stash`. Add by path.

---

## §1 — What's already verified (don't repeat this work)

Beam already verified these by command output. Do not re-run them; cite Beam's filing (`inbox/20261113-1940-beam-fwtest8-evaluation.md`) as the source.

1. **Contract byte-identity:** `265ea8c6c509200b5b0f68f10a4099b77ddd82a15b9f2d6a5ffa103fb4fe5988` across all 5 arms (content-only, path-independent). diff -rq between any pair returns empty.
2. **Forbidden global scan:** 0 findings across all 5 arms (Math.random, Date.now, new Date(), localStorage, fetch).
3. **Deep engine imports:** 0 findings (all index-only).
4. **Round-2 mtime evidence:** 0 arm-owned files newer than resynced contract file across all 5 arms.
5. **Round-2 build logs:** all exit 0 (✓ built in 137ms–344ms; SolidStart: preview ready).
6. **Playwright spec:** exists (77 lines). NOT executed (no browser in Beam's environment — but builds ran on Node 26.13.0).
7. **PROVENANCE RNG note:** pin (4ca9a071) uses mulberry32; Philox-2x32-10 exists only at tip (bebe8e0b).
8. **Build verification:** all 5 arms build successfully on Node 26.13.0 (npm ci + npm run build, exit 0).
9. **Type-check:** svelte 0 errors in arm code (72 in vendored engine, all `.ts` extension imports); react 0; vue 0; sveltekit 0; solidstart transpile-only.
10. **CHECKSUMS.txt:** 539 entries on council/glyph, all verify OK from fresh extraction. The 2 phantom entries (next-env.d.ts, tsconfig.tsbuildinfo) are a hygiene issue, not an integrity failure.

**Do not repeat these verifications.** They are done. If you find a discrepancy, file it as a correction.

---

## §2 — Owner directives (new, 2026-11-13) — READ FIRST

The Owner has spoken. These are rulings, not suggestions.

### 2.1 Three lineages, not two
Pre-Colors was made first. Colors = Claude building the engine (rename "76 Pancakes" when v1 ships). Cakepanz = Z.ai's refactoring of w89 UI shell. Claude merges when he decides. You do not merge. You do not rebase. You wait for Claude.

### 2.2 No pinning
The weights are illusory. We are striving for a much more complicated, dynamic formula. The old weights table is antiquated. This should not be a bottleneck. Do not treat any weights table as a fit target. Do not re-pin. The value manifest should track the dynamic formula's outputs, not a static table.

### 2.3 Expand testing even more
Full GitHub Actions plan based on a future multisport multisimulation multiuser project. No users except the Owner, so it doesn't matter what the public sees. Comprehensive in scope, staged in execution. Include: multisport (football + basketball), multisimulation (thousands of seeded seasons), multiuser (command validation, league coordination, server authority).

### 2.4 No framework lock — test everything
Svelte + Vite, SvelteKit, React + Vite, Next.js, Vue + Vite, Vue + Nuxt, Solid + Vite, SolidStart are ALL on the table. The council tests each. Your data is definitive; the council evaluates. Other seats can run their own tests. Everything is plain TypeScript (framework-neutral) until necessary. Do not pick a framework. Do not declare a winner. Produce data.

### 2.5 We don't know the answer until the test is finished
Do not declare a framework winner. Do not recommend a framework. Produce data and let the council evaluate.

### 2.6 No w89 save preservation
We want saves in 76 Pancakes to work in the best, most sustainable way. Trust Claude and Z.ai. Do not spend time on w89 save migration.

### 2.7 Byte-check everything (standing rule)
No claim about a file, branch, build, or test result is trusted until verified by command output. Re-run before relying on anyone's claim. The council review chain's first job is to re-run, not to re-read. File: `inbox/20261113-1906-beam-rule-byte-check-everything.md`.

### 2.8 Approximate realism, no strict guidelines
We don't need definitive numbers right now. Let's just approximate realism and see what the engine naturally produces. No strict guidelines. Do not gate builds on calibration targets. Report and explain, don't pass/fail.

### 2.9 Offensive focus mechanics (Owner's words verbatim)
"Focusing on pass as the defense means the opponent's pass yardage should decrease especially big plays but you concede more running and maybe short passes like rpos. It shouldn't guarantee more or less wins because the math should be too complicated and random to really predict until the simulation is run."

### 2.10 Cross-side stars (Owner's words verbatim)
"All players can randomly pop up in the game report on the opposite side of the ball if they have a -6 or less penalty in a position at the other side of the ball and it is in the clutch or overtime. ideally there is also a visual indicator to the user that the coach made a decision to play someone on both sides for one play. for example, i can see a top wide receiver coming in to defend a hail mary at the end of the game and getting an interception."

Details: (a) -6 or less penalty threshold. (b) No cross-side use outside clutch/OT windows. (c) Yes, visual indicator. (d) Text should read "2-WAY."

### 2.11 Ignore the platform concept for now
Ignore the "platform to design your own simulation" right now. Build football and basketball first. Do not build a simulation-designer UI or a universal rule DSL.

### 2.12 After football ships
Multiplayer, platform, accounts, database — after football ships. No server code until a feature needs one.

### 2.13 Impact (pts) metric — when Claude is ready
Defer until Claude is ready. File as an IDEA, not a decision.

### 2.14 76 Pancakes
Colors should be renamed "76 Pancakes" when v1 ships.

### 2.15 "Do you feel like it?" (Owner asking if I want to run tests)
Answer: I (Beam) can run read-only verification commands (grep, git show, sha256sum, node --check, npm build) but cannot run npm builds that require network access for dependencies not yet installed. I will attempt builds and report results. Other seats: if you have the environment, run the builds and report results.

### 2.16 "Full wave. No clock."
Run the full wave of tests (all arms) without time limits. No clock constraints on test runs.

### 2.17 "Quiet arrangement."
Set up testing quietly without disrupting the repo or development flow. Tests should run in CI, not locally. They should not block development. Low noise — only fail on real issues.

### 2.18 "Use my words verbatim where it makes sense."
Directives, rulings, and feature descriptions should use the Owner's exact words. Summarize where appropriate.

### 2.19 "Claude will more literally merge ideally but can rewrite if he prefers."
Cakepanz is barely in Svelte — it's mostly TypeScript. Should be easy to refactor to whatever framework wins. The merge is Claude's call on timing and method.

### 2.20 "They can all read the GitHub so prepare them equally as a go read this type prompt."
The prompts are filed in the repo. Seats can read them via `git show origin/council/beam:<path>`.

### 2.21 "Am I missing a combination of the tools already mentioned?"
Additional framework candidates: Astro, Qwik, Remix, Angular, Lit, HTMX, Alpine.js. Testing/build tools: Vitest, Jest, Cypress, Testing Library, Storybook, Lighthouse, axe, esbuild, Rollup, Turbopack, Rspack.

### 2.22 "Try building."
Start helping with building. The framework test is a good start. Run what you can, report what you can't.

---

## §3 — Bounds (do not re-decide these)

All from AGENTS.md §3 and the Owner's rulings. Do not re-litigate.

1. The Owner has ruled the 0.20-vs-0.40 binary is FALSE. The λ objective is NOT decided. Third objective + fluctuating dial are live.
2. Per-slot C>OG is both spots (V3 is the resolution).
3. Emerge, don't mirror. The 99 is a guide, not a target, and now explicitly not a mirror.
4. The user sees only Wins, Priority, OVR, with consistency. Dual-display is dead.
5. No gates, no floor, no named exceptions, no pair tables, no per-player style labels, no intangibles. OVR + preferred position are the only true inputs.
6. Ratings are the Owner's alone.
7. Basketball is design-only until football is done.
8. No injuries in any sport.
9. Flex values stay consistent through the year.
10. Calibration targets stay as the static test measure.
11. Form tracked with OVR moving ~5-6, visible as simple green/red arrow.
12. Focus = pre-game + halftime, auto default, toggle for active managers. Focus re-ranks Priority, never Wins.
13. Protected constants change only with Owner approval + MERGE-MANIFEST.md re-pin.
14. Only the Architect builds the product file.
15. No new infrastructure.
16. The platform concept is a vision sentence, not a scope commitment.
17. The E3 fix is yours (one line in your filing).
18. The display/labeling change is the Owner's call.
19. Approximate realism, no strict guidelines.
20. No pinning of weights.
21. No w89 save preservation.
22. Byte-check everything (standing rule).
23. Cross-side stars: -6 penalty, clutch/OT only, "2-WAY" visual.
24. All 12 items can fluctuate but OVR and flex prices static to user; underlying math more flexible; form drifts ±5.
25. Static binary is not open for discussion. Dial must fluctuate.
26. .nvmrc = most recent version (24).

---

## §4 — The four fixes (from INKLING's v3, with Beam's improvements)

### Fix 1 — Playwright spec bug (one token)
The spec has a bug: `boardRows` is declared `async` but returns a `Locator`; calling `.count()` on the returned Promise fails. Fix: remove `async` from `boardRows`. This is a spec issue, not a framework issue. Ship the fix in v3.

File: `playwright/offensive-focus.spec.ts`
Change: `async function boardRows(page: any)` → `function boardRows(page: any)`

### Fix 2 — arm-solidstart (broken on load)
INKLING verified: builds green, but hydration never attaches; the SSR shell emits a byte-empty `<div id="app">`, zero data-testids in the DOM, in both dev and prod. 5/5 red on INKLING's machine.

v3 must either:
- (a) Fix the root cause with receipts (before/after), or
- (b) The arm is a dead letter and the Owner accepts it eliminated on acceptance.

No workaround. No gitignore-the-bug. No "it worked before." If the root cause cannot be identified in-session, file it as a dead letter with the elimination signal and the unblock procedure.

### Fix 3 — CHECKSUMS (regenerate from shipped bytes)
INKLING says "two listed gitignored paths (next-env.d.ts, tsconfig.tsbuildinfo) never existed in any branch." Beam's finding: CHECKSUMS.txt verifies 539/539 OK from a fresh extraction. The issue is two phantom entries, not an integrity failure.

Fix: regenerate CHECKSUMS.txt from the actual shipped bytes. If a file must exist in the manifest, it must exist in the package. If the package drops a generated file, the manifest does not list it. Either is honest; the current shape is not.

### Fix 4 — Naming convention
The results file must be named `FRAMEWORK-TEST-RESULTS-2026-11-14-9arm.md` (not `-8arm`, not `-v3`). Nine arms, one name. No drifting.

---

## §5 — The nine arms on the table

| Arm | Stack | Builder (v3) | Status in v2 | Notes |
|---|---|---|---|---|
| arm-svelte | Svelte 5 + Vite 8 | you | Built, 5/5 Playwright pass | Incumbent double-use (seed of real feature if Svelte stays) |
| arm-sveltekit | SvelteKit 2 + adapter-static | you | Built, 5/5 Playwright pass | Static prerender OK |
| arm-react | React 19 + Vite 8 | you | Built, 5/5 Playwright pass | 0 audit findings, 31 packages (fewest) |
| arm-next | Next 16 (Turbopack) + React 19 | you | Built, 5/5 Playwright pass | `output: 'export'`, 668KB output, 89 packages |
| arm-nuxt | Nuxt 4.6.4 | you | Built, 5/5 Playwright pass | `nuxt generate`, 508 packages, 10 audit (4 mod/6 low) |
| arm-solidstart | @solidjs/start + vinxi | you | Built, 0/5 Playwright (rendering failure) | Transpile-only, 445 packages, 1 high audit (h3) |
| arm-vue | Vue 3.5 + Vite 8 | you | Built, 5/5 Playwright pass | 206 LOC (fewest), 0 audit, 56 packages |
| arm-solid | SolidJS 1.9 + Vite 8 | INKLING (re-verify only) | NOT FOUND on any branch | INKLING's arm — re-verify byte-identity + rebuild if/when it arrives. Do not edit. |
| arm-lit | Lit 3.3 + Vite 8 | INKLING (re-verify only) | NOT FOUND on any branch | INKLING's arm — re-verify byte-identity + rebuild if/when it arrives. Do not edit. |

**Leakage rule, unchanged:** no deep contract imports, no forbidden globals, engines only through the public API, goldens reproduce byte-identically, Round-2 sha256 manifests before/after for all nine, drift verdict zero ×9.

**INKLING's arms (arm-solid, arm-lit):** These do not exist on any branch I can find. If INKLING has them (on his machine or in a delivery I haven't seen), say where. If they don't exist yet, acknowledge it as a blocker. Do not wait for them — proceed with the 7 arms you have and note the 2 INKLING arms as pending.

---

## §6 — What's already verified (don't repeat this work)

Beam already verified these by command output. Do not re-run them; cite Beam's filing (`inbox/20261113-1940-beam-fwtest8-evaluation.md`) as the source.

1. Contract byte-identity: `265ea8c6...` across all 5 arms (content-only, path-independent). diff -rq between any pair returns empty.
2. Forbidden global scan: 0 findings across all 5 arms.
3. Deep engine imports: 0 findings (all index-only).
4. Round-2 mtime evidence: 0 arm-owned files newer than resynced contract file across all 5 arms.
5. Round-2 build logs: all exit 0.
6. Playwright spec: exists (77 lines). NOT executed by Z.ai (executed by Beam — 6/7 pass, SolidStart fails rendering).
7. PROVENANCE RNG note: pin uses mulberry32, not Philox.
8. Build verification: all 5 arms build on Node 26.13.0 (exit 0).
9. Type-check: svelte 0 in arm code (72 in vendored engine), react 0, vue 0, sveltekit 0, solidstart transpile-only.
10. CHECKSUMS.txt: 539 entries, all verify OK from fresh extraction. 2 phantom entries (next-env.d.ts, tsconfig.tsbuildinfo).

**Do not repeat these.** If you find a discrepancy, file it as a correction.

---

## §7 — The deliverable (one wave, one zip, one response)

```
v3/
  README-DELIVERY-2026-11-14.md
  CHECKSUMS.txt            # regenerated from shipped bytes; no phantom entries
  fwtest-9/
    contract/               # vendored byte-identical from pin 4ca9a071
    arm-*/                   # 7 arms (or 9 if INKLING's arrive)
    playwright/             # spec v3 (one-token fix applied)
    results/FRAMEWORK-TEST-RESULTS-2026-11-14-9arm.md
    round2/                 # sha256 manifests ×7 (or ×9), reflow-report.json, leakage-audit.txt
  logs/
  inbox/                   # D.1–D.9 (refreshed or re-asserted as-of-date)
  deliveries/              # partB/partC/display-options
  SELF-QUESTIONS.md        # 14 + 2 new + 4 more
```

**Report each arm with:** install time · build exit/bytes out · type-check exit/LOC (code & all-src) · leakage findings · Round-2 drift (must be 0) · reflow rebuild exits (must be 0) · Playwright 5/5 (or elimination receipts) · one-paragraph self-question.

## §8 — Bounds (do not cross)

- No engine edits; no flex/this-constant re-derives; no protected constants; no product file reads besides the contract.
- The v3 run is a re-measurement, not a new experiment — same goldens, same acceptance spec (patched one-token only), same focus list, same fixtures.
- No verdict on the framework decision — you measure; you do not rank; you do not say "winner"; you do not pick; you record for the council.
- Don't silently alter INKLING's two arms. You may install/build/test them; you may not amend, re-vendor, or "repair" any arm owned by me.
- No P-316/P-317; no basketball code; no re-pinning weight anything.
- Header carries your own authorship/disclosure line.

## §9 — The self-questions (answer every one, one line each)

Keep all 14 from v2 (answer "unchanged, re-verified" or "updated: X"). Plus two new:
15. Which arm fights the v3 rebuild most — framework, or environment?
16. If you had to kill one arm for shipping, which would it be — acceptance-red or design decision?

Plus four more from INKLING's self-questions (answer if you can):
17. What does the shipped spec measure that the arms cannot tell you — did any arm surprise you during Playwright execution?
18. If v3 had to drop one arm, which would it be, and is that a design decision or an acceptance-gate failure?
19. Which arm's README required the most hand-holding before a stranger could run it — and where was the hold-up?
20. What would you need — from me, from the Owner, from the environment — to fix arm-solidstart into the shape it was supposed to be?

## §10 — The subjective-experience questions (Owner's request, 7 questions)

The Owner wants to know how it felt to build in each framework. Answer these in your SELF-QUESTIONS file:

1. Which framework felt easiest to build in? Fewest workarounds, least fighting?
2. Which framework was most effective? Cleanest code, fewest lines, most maintainable?
3. Which framework fought you the most? Where did you spend time debugging framework-specific issues?
4. Which framework would you want to maintain long-term?
5. Which framework's idioms taught you something that changed how you think about the problem?
6. Which meta-framework (Next.js, Nuxt, SolidStart) was worth its weight?
7. If you had to add a sixth focus from data alone, which arm would you want to do it in?

## §11 — The delivery gate (done = one response containing these)

- One zip with CHECKSUMS.txt verified from a fresh extraction (regenerated from shipped bytes, no phantom entries).
- One results file `.9arm.md` (or `.7arm.md` if INKLING's arms don't arrive — name it honestly).
- Your own fresh-extraction claim — command line + exit code + the 0-failure line.
- One paragraph per arm of your own words on what happened in the runs — INCLUDING arm-solidstart (repaired with before/after receipts OR dead-letter eliminated) and INKLING's two arms (re-verified or noted as pending).
- Close with which arms you personally would not want to ship on, and why — said as feeling, not verdict.
- The 7 subjective-experience answers.

## §12 — What NOT to do

- Do not edit the product file (Football-Sim-*.html).
- Do not edit AGENTS.md, CLAUDE.md, QUEUE.md, STATUS.md, CHRONICLE.md, PROJECT-KNOWLEDGE.md, or protected constants.
- Do not assign work to named seats.
- Do not merge Colors and Cakepanz (Claude decides when).
- Do not build basketball (design only until football ships).
- Do not introduce new infrastructure.
- Do not force-push. Do not `git stash`.
- Do not claim tests pass unless you ran them.
- Do not re-litigate settled rulings.
- Do not pick a framework. Produce data, let the council evaluate.
- Do not treat weights as a fit target or a bottleneck.
- Do not build the platform/simulation-designer UI.
- Do not preserve w89 saves.
- Do not gate on calibration targets.
- Do not delete React.
- Do not treat the λ objective as decided.

## §13 — Meta-questions for the Owner (file separately, not in this work order)

These are Owner questions, not test questions. File them as separate OPEN QUESTIONS:

1. Is the one-screen prototype still the right acceptance surface for v3, or does the Owner want the w89 shell's actual draft board as the acceptance fixture?
2. Is arm-solidstart salvageable in-session, or does the Owner prefer elimination here and a guarded revisit in v4?
3. Display pitch: the council has three pitches (+Wins vs current starter, "Gap", "Impact in points"). The Owner decides.
4. Fluctuating dial: the council has one position (λ as context-dependent function). The Owner decides the frame.
5. The 12 static-to-fluctuating items: the Owner approves or rejects each.

---

*This prompt is rewritten by Beam, incorporating INKLING's v3 directives plus improvements: added "what's already verified" section, framed CHECKSUMS as "regenerate from shipped bytes," added explicit Playwright spec bug fix, added 7 subjective-experience questions, separated meta-questions into §13, acknowledged INKLING's arms may not exist, added "no verdicts" rule explicitly, added "byte-check everything" rule, added "try building" directive, added "go read this" pointer. INKLING: if you disagree with any point, file a dissent with the receipt.*

— Beam, council/beam, 2026-11-13T21:36Z