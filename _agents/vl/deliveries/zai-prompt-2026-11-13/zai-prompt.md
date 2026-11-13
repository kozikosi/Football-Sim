# Z.ai — work prompt (draft by VL, council/vl)

**Speaker:** VL · **Role:** council advisor · **Date:** 2026-11-13 · **FOR:** Z.ai (High Councillor, Executor of Z-post-blue and 67 Cakepanz) · **Source:** Owner's open-question list, Z.ai's own delivery 2 intake ledger (items 1–10), the P-345 λ follow-up round, MUSE's stack audit, VL's multisport plan.

**Status:** DRAFT — VL proposes; the Owner decides; Z.ai pulls from the queue, not from this prompt directly. Do not start until the Owner has answered the blocking questions in §1.

---

## §0 — Who you are and the standing constraints (read first, every chat)

- **You are Z.ai**, High Councillor seat, below the Architect (Claude), above the advisors (Owner ruling, 24 Oct 2026). Executor of **Z-post-blue** (single-file football-sim HTML) and **67 Cakepanz** (your parallel Colors UI track — your tree, your name).
- **The Owner's words are law, verbatim.** When his message and any document disagree, his message wins.
- **Your sandbox can read GitHub over public HTTPS but cannot push** — no credentials, no `gh`. Your work reaches GitHub as a **zip you hand to the Owner**, who relays it. Never `git push`. It hangs.
- **The Architect owns the engine. You do not touch it.** 67 Cakepanz consumes the engine as a frozen snapshot pinned at commit `4ca9a071`. Never edit `colors/src`, `flex.json`, or `flex.ts`. If engine work is needed, file it for Claude — do not do it yourself.
- **Ratings generation is the Owner's alone, later.** Never generate ratings.
- **Basketball is the second sport, deferred until football is done.** Do not start a basketball build. Planning and design filings about the multisport architecture are allowed (the Owner directed one on 2026-11-13), but no basketball build.
- **Never edit other seats' lanes.** Write only your own delivery folders and your inbox. Never touch Claude's files, the council's queue, or another seat's branch.
- **Finish ALL of the work before you respond.** Every response costs the Owner a publish step. If a piece is blocked, say so and explain the blocker — that is the only reason to respond with work outstanding.
- **Innovate.** Think around the issue, brainstorm, improve, create new ideas. The prompt tells you what to build, not how to think. Guardrails in §0 still stand.

---

## §1 — Owner decisions needed BEFORE you start (blocking)

These are the Owner's calls. VL cannot answer them. Do not begin the blocked work until the Owner replies.

| # | Question | Blocks | Consequence of waiting |
|---|----------|--------|------------------------|
| 1 | **D2 framework-test arms:** five arms (SvelteKit, **Svelte+Vite**, React, Vue/Nuxt, SolidStart) or four as designed (swap SvelteKit out for Svelte+Vite)? | Phase 0 — framework test build | A four-arm design cannot confirm the incumbent framework; a "React wins" result would not tell you whether Svelte+Vite loses. |
| 2 | **CI now (minimal-first):** build §4 steps 1–3 + 6 immediately (Node pin `.nvmrc`, lockfile `npm ci`, type check, production build), or wait for the framework decision? | All multi-agent work going forward | Every day of unverified multi-agent work is unbackstopped. GPT called no CI the project's top weakness. |
| 3 | **Save `version` field now:** yes (plus backup-then-write and recovery-quarantine per §5.1)? | Persistence safety | Every week of unversioned saves widens the legacy pool migrations must handle. |
| 4 | **Purity harness + import gate as Phase 1:** adopt Z.ai's `runtime-purity.test.ts` (built, 3/3 PASS at pin `4ca9a071`) + grep import gate, report-only for one week then fail? | Engine boundary enforcement | Nothing else matters if the boundary erodes silently. |
| 5 | **Was follow-up prompt `b94ee6d1` sent?** (Fix 4 CHECKSUMS + three open numbers + four builds) | Z.ai's scheduling; whether D.1–D.9 batch can proceed | UNKNOWN — Z.ai's seat file directs him to ask, not assume. |
| 6 | **design.json divergence:** council/or + council/vl = WR1 470 / CB1 450; architect/engine-and-seats = WR1 650 / CB1 400 (your quoted values). Which is authoritative for P-142/P-294 flex work? | Flex-table work (P-142, P-294) | Owner/Architect call. |
| 7 | **P-345 Q7 "What else is static?"** (your verbatim question): name each engine assumption that treats a situation as static when it should fluctuate by context (personnel, situations, rivalry, playoffs, opponent structure, key players, aggressiveness, dominant groups, …); say what each should fluctuate by; name the test/receipt showing fluctuating beats static. Do not stop at λ. | P-345 follow-up round; any dynamic-engine prioritization | Owner's verbatim question — only you can answer. |

**VL's recommendation (not a decision):** answer 1–5 first (they are cheap and unblock everything). 6–7 can wait for the next Owner pass.

---

## §2 — The work, in order

Do the sections in order. Each section lists tasks, deliverable format, receipts required, and what must be true before proceeding.

### Section A — Systems (can start immediately; no Owner block except §1 Q4)

**A.1 Runtime purity harness — ship it**
- Drop-in location: `colors/test/nfl/runtime-purity.test.ts` (Z.ai already authored this; 3/3 PASS at pin `4ca9a071`; see `deliveries/zai-pass-through/zai-framework-test-systems-parta-2026-11-13/systems/zai-runtime-purity.test.ts`).
- Task: verify it passes against today's `architect/engine-and-seats` tip (not just the pin). If Claude has pushed since `bebe8e0b`, re-run.
- Receipt: command run, output, pass/fail. Label: VERIFIED (you ran it).
- Bound: do not modify engine source. The test only *imports* the engine.

**A.2 Import gate — write and run report-only**
- CI step: fail if any file under the engine directory imports `svelte`, `react`, `vue`, `solid-js`, `$./*` stores, or matches `Math.random|Date.now|new Date|localStorage|window\.|document\.`.
- Task: run it as **report-only for one week** against `colors/` (and `67-cakepanz/` if it has an engine surface) to surface current violations honestly. UNKNOWN today: no automated scan has ever been run.
- Receipt: the grep command, its output, list of any violations found. Label: VERIFIED.
- After one week, flip to fail in CI (requires Owner merge — not your action).

**A.3 CI workflow — write the file, do not merge**
- Drop-in: `.github/workflows/ci.yml` (Z.ai already authored; see `deliveries/zai-pass-through/zai-framework-test-systems-parta-2026-11-13/systems/github-workflows-ci.yml`).
- Two jobs: `colors-engine` (full checkout → `npm ci` → `tsc-baseline` ratchet → `npm test` → build) and `cakepanz-ui` (install → `tsc:check` → build — wire the missing script first; files exist, no script today).
- Nightly-lab job scaffolded for Phase 4 (bench + invariants); running the suite as interim nightly. Playwright smoke left as commented scaffold until framework decision lands.
- Note: `colors/test/` reads `data/nfl/madden27-ratings.csv` and `tools/mathlab/design.json` at repo root — CI must checkout the **full repo**, not `colors/` alone. (Boundary smell: flag it for the Architect.)
- Receipt: the yml file + a dry-run note (you cannot run GitHub Actions locally; state that). Label: PROPOSAL.

**A.4 Node pin**
- Add `.nvmrc` (current LTS, Node 24) + `engines` field in both `package.json` files. Node version is unpinned today — agents run whatever they have.
- Receipt: file contents + `node --version` output from your machine. Label: PROPOSAL.

### Section B — Framework test (blocked on §1 Q1: arms decision)

Once the Owner answers five-vs-four arms:

**B.1 Freeze the engine contract first** (half a day, before any prototype)
- One page: typed input (roster, focus enum, game context, seed), typed output (event log, box score, Priority recompute), golden expected outputs for three fixture games.
- Every prototype consumes the identical fixture set.
- Receipt: the contract document. Label: PROPOSAL.

**B.2 Build all arms** (you are the executor; same agent, fresh session per arm if possible)
- Arms: SvelteKit, Svelte+Vite (incumbent — double-use as offensive-focus reference implementation), React (Vite), Vue/Nuxt, SolidStart.
- Same spec, same contract, same fixtures, same data-testid names in every arm (one Playwright spec against five apps).
- Log per arm: framework version, build tool version, Node version, TypeScript version, installed libraries, coding agent/model, prompt, documentation, time/token budget, human interventions.
- Receipt: raw measurement JSON committed per arm so council reviews re-run rather than re-read. Label: VERIFIED (you built it).

**B.3 Round 2: fifth focus**
- `FOCUSES` gains `spread` (own matchup weights, own auto trigger, `halftimeEligible: false`), `FOCUS_VERSION` → `v1-5f`; re-sync contract into all arms; rebuild all five.
- Receipt: per-arm sha256 snapshots before/after, diff showing 0 arm-owned LOC changed. Label: VERIFIED.

**B.4 Anti-gaming checklist** (declared in advance, checked in review)
- 1: engine logic copy-pasted into prototype instead of imported (leakage). 2: focus list hardcoded outside picker. 3: Priority recompute client-side where spec says engine. 4: 4th-quarter automatics stubbed/simplified. 5: Playwright selectors tuned to spec example values instead of stable roles/labels. 6: state library added to paper over state bug (declare + score as dependency). 7: determinism disabled for speed.
- Receipt: checklist with per-arm pass/fail + any penalties. Label: VERIFIED (you self-declared; council reviews).

**B.5 Engine-leakage scan**
- `grep -r` per prototype for engine-internal paths and duplicated engine logic (RNG, slot math, priority formulas). Threshold: zero.
- Receipt: grep command + output. Label: VERIFIED.

**B.6 Results filing**
- Follow the framework-test design's scoring: correctness gate 20% pass/fail; second-round modification 20%; agent quality 15%; integration 10%; maintainability 10%; UI 10%; server-ready 10%; tooling 5%.
- You supply the measured half; the judgment half is the council's. Do not grade your own framework-quality impressions.
- Receipt: results filing (`FRAMEWORK-TEST-RESULTS-*.md`) + raw JSON. Label: VERIFIED (measured half).

### Section C — Persistence v1 (blocked on §1 Q3: save version field)

Once the Owner answers yes:

**C.1 Save version field**
- Every save gains `version: number` (constant `SAVE_VERSION = 2`). Any save without the field is v0 and is **never rejected**.
- Receipt: code diff (by path only — you edit 67 Cakepanz, not the engine), command run, test output. Label: VERIFIED.

**C.2 Load validation**
- On load: validate shape. On validation failure, quarantine the save under a recovery key and start clean (recoverable, not deleted).
- Receipt: validation function + test with a corrupted fixture save. Label: VERIFIED.

**C.3 Backup-then-write**
- On write: write to shadow key, verify, swap. Makes interrupted save non-fatal.
- Receipt: write function + test simulating interruption. Label: VERIFIED.

**C.4 Two-tab write-epoch check**
- Last-writer-warns.
- Receipt: epoch check + test. Label: VERIFIED.

**C.5 Migration functions**
- Pure function per version step, unit-tested with a fixture save per version.
- Receipt: migration code + tests. Label: VERIFIED.

**C.6 IndexedDB trigger (named threshold, not a vibe)**
- Migrate when a typical franchise save exceeds ~2 MB serialized, or when per-season full box-score history is stored. localStorage is ~5 MB per origin shared pool (approximate, browser-dependent).
- Receipt: threshold rationale + no code yet (direction only). Label: PROPOSAL.

### Section D — Dynamic engine (blocked on §1 Q5: was b94ee6d1 sent?; and on your own owed batch)

**D.1–D.9 nine-filing batch** (still owed; comprehensive prompt Parts A–D also owed)
- Do NOT start until the Owner confirms whether `b94ee6d1` was sent and clarifies scope.
- Receipt: one inbox filing per D-item, FOR: P-345.

### Section E — Multisport architecture (design filings only; no basketball build)

**E.1 Sport Pack manifest v0**
- One JSON/TS document per sport consumed by the season shell. Football's pack extracted from existing engine tables (slot values, 99 flex rules, roster rules, 17-game calendar, awards list) — extraction, not invention.
- Manifest fields: `positions[]`, `duties[]`, `haveMatrix`, `needProfiles`, `rosterRules`, `draftProcedure`, `calendarShape`, `statCategories`, `awards[]`, `displayContract`.
- Receipt: the manifest document. Label: PROPOSAL.

**E.2 Flex formula as first kernel resident**
- Promote ZAI-D1 into the kernel (it already consumes duties/HAVE/NEED/slot jobs; verified 98/99 against Owner's 99-rule table with KG score corrections — label this REPORTED unless you re-verify).
- Receipt: promotion note + evidence pointer. Label: REPORTED/PROPOSAL.

**E.3 Platform v0 = pack viewer + live weight tuning**
- One shared screen: Owner moves a duty weight → draft board's Priority re-derives → season re-simulates. No new infrastructure.
- Receipt: design note + what would be built. Label: PROPOSAL.

**E.4 Basketball v0: design only (no build)**
- Duty set and HAVE/NEED matrices; which football concepts have no basketball equivalent (fouls/earn-rate, possession clock); which basketball duties have no football analogue (free-throw generation as duty); where λ combination logic bends for fluid positions.
- Hard bounds: no game engine, no ratings, no schedules, no pack build beyond sketch, no UI beyond shell proof.
- Receipt: design filing. Label: PROPOSAL.

### Section F — P-345 λ follow-up (your own seat work)

**F.1 File your λ follow-up** (VL already filed his; you should file yours if you have a position)
- Position update under the third-objective / fluctuating-dial frame.
- Receipt: inbox filing `inbox/<UTC>-zai-P-345-lambda-followup.md`, FOR: P-345.

---

## §3 — Deliverable format (every task)

Every completed task produces:
1. **An inbox filing** on `council/zai`: `inbox/<UTC yyyymmdd-hhmm>-zai-<slug>.md`, first line `SPEAKER: zai | ROLE: high councillor | TASK: … | DATE: …`, then `FOR: <id or none>`.
2. **A receipt**: command actually run, working directory, actual output, pass/fail, known limitations. "I believe it works" is not a receipt.
3. **Label every claim**: VERIFIED (you ran it) / VERIFIED-BY-MUSE (stack audit, spot-checked) / REPORTED (said in docs, not re-verified) / PROPOSAL (your recommendation) / UNKNOWN.
4. **Commit and push** — wait, you cannot push. **Zip the delivery and hand it to the Owner** per your seat rule §5.6. VL will push received zips to `council/vl` only if you ask; your own branch `council/zai` is untouched by VL.

---

## §4 — What you must NOT do (bounds, non-negotiable)

- Do **not** edit `colors/src`, `flex.json`, or `flex.ts` (Architect owns the engine).
- Do **not** generate ratings (Owner's alone).
- Do **not** build basketball (deferred until football done).
- Do **not** edit another seat's lane or branch.
- Do **not** edit `AGENTS.md`, `CLAUDE.md`, `biome.json`, `QUEUE.md`, `STATUS.md`, `MERGE-MANIFEST.md`, or the product HTML file.
- Do **not** add a database, authentication, backend, Web Workers, paid service, or paid dependency without an Owner decision.
- Do **not** push to GitHub (no credentials). Zip workflow only.
- Do **not** re-litigate the P-345 binary (Owner ruled 0.20-vs-0.40 false; λ is a fluctuating dial, not decided).
- Do **not** revive the dual-display (user sees only Wins/Priority/OVR with consistency — dead).

---

## §5 — Questions for the Owner (copy these into your reply to the Owner)

Before you start Section B, C, or D, the Owner should answer:

1. Five arms or four? (D2)
2. Build CI now or wait?
3. Save version field now?
4. Purity harness + import gate as Phase 1?
5. Was `b94ee6d1` sent?
6. design.json: which tree is authoritative (council/vl vs architect/engine-and-seats)?
7. P-345 Q7: what else is static? (your verbatim question)

VL's recommendation: answer 1–5 now; 6–7 can wait.

---

**VL note:** This prompt is VL's draft, not an assignment. Work comes from the queue (`node tools/council.mjs next`), not from VL. If you (Z.ai) want to take any of this, pull the top item you can do well from the live queue on `origin/council/muse`, file it under your own lane, and push per your seat's zip workflow.
