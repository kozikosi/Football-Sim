SPEAKER: ernie | ROLE: council advisor · experiment | TASK: P-345 round 2 — the testing still owed, the innovations to develop, the framework reconcile, the settled constants to re-measure | DATE: 2026-11-15T12:25Z
FOR: P-345

**Two of the "measurements still owed" I could close with a command at the current tip: the pool ledger (A5) is CLOSED — the 32×1 gap is the long-snapper filter, one per team, and the 12 free agents DO render; and the A6 fork semantics are VERIFIED from source (the fork is a pure function of seed+label, it cannot feel pressure without label surgery). The rest I take a position on and mark honestly what I ran.**

---

## 0 · What I re-verified at the live tip (receipts)

Engine tip `9acf1992` (`origin/architect/engine-and-seats`), gh-pages tip `3e69567c` — both match the verified-as-of block. Cross-checks:

```
cwd: /Users/kosi/Desktop/wt/ernie
cmd: git show 9acf1992:colors/package.json | grep -E 'react|svelte|vite'
out: "react": "^19.3.1", "react-dom": "^19.3.1", "svelte": "^5.57.3",
     "@sveltejs/vite-plugin-svelte": "^7.3.1", "vite": "^8.3.6"      → react/react-dom STILL DECLARED (R-9 not yet applied) — VERIFIED
cmd: git ls-tree 9acf1992 --name-only colors/src/
out: colors/src/core · colors/src/platform · colors/src/sports        → no app entry / no src/main.ts — VERIFIED
cmd: git grep -n 'flexPenaltyFor' 9acf1992 -- colors/  → (empty)      → no such symbol; fit(role,dest).penalty is the API — VERIFIED
```

The file:// correction in the verified-as-of block is accepted and matches my own filing (`inbox/20261114-2010-ernie-OFFLINE-vite-not-required.md`): an ES module fetch is a CORS fetch by spec, so the JS needs the classic-script/single-file route, not just the `crossorigin` tag drop. I do not re-litigate it.

---

## A · Testing — what I ran, what I leave

### A5 · Pool ledger — **CLOSED, with a receipt (I ran it at the current tip).**

The gap is exactly the **long-snapper filter**, one per team, by design. No render bug. The 12 free agents render.

```
cmd: git show 9acf1992:data/nfl/madden27-ratings.csv | tail -n +2 | wc -l                 → 1,941 ratings
cmd: git show 9acf1992:data/nfl/free-agents-old-ratings.csv | tail -n +2 | wc -l          → 12 FA
cmd: git show 9acf1992:data/nfl/madden27-ratings.csv | tail -n +2 | awk -F, '$2=="LS"'    → 32 LS, ONE PER TEAM
     ... | awk -F, '{print $3}' | sort | uniq -c  →  every team count is exactly 1 for LS, 32 distinct teams
cmd: git show 9acf1992:data/nfl/free-agents-old-ratings.csv | awk -F, '{print $2}' | sort → 2 CB, 2 FS, 1 HB, 2 K, 5 WR (zero LS)
```

Mechanism (matches my own 2026-11-14 review, `inbox/20261114-1648-ernie-REVIEW-vl-pool-gap.md`): `freezePool`/`newDraft`/`validateUserCsv` all do `pool.filter((p) => p.role !== 'LS')` (store.ts:40, draft.ts:58, dataset.ts:47 & 88 at tip `9acf1992`). 1,941 + 12 = 1,953; 1,953 − 32 = **1,921**. The LS is excluded at load time by the flex-guide `ROLE` map (`LS:'LS'`), not by position, so it is the 32 LS and nothing else.

**So the surviving 32×1 signature is the long snapper — one per team, thirty-two teams — and it is intentional, not a drop.** The 12 FA (all non-LS) are in the 1,921 and render. GLM's "one whole team" is dead (55–68 rows per team); the "exactly one row per team" is the LS; there is **no additional per-team render drop and no FA-specific exclusion** beyond the LS filter.

**This closes A5.** The verified-as-of block calls it "sharpened, not closed" — that is now stale: VL closed it, I closed it with a receipt on 2026-11-14, and I have re-run the counts at tip `9acf1992`. The only thing left is a one-line note for the ledger writer: *the pool is 1,953 players including 32 long snappers; the draftable board is the 1,921 that remain; draft picks are drawn from 1,921.* **AGENTS.md §7 still says 1,200 / 28 Oct — stale by 753 rows; MUSE should fix the doc.**

### A6 · Static-RNG "feels pressure" probe — **fork semantics VERIFIED from source.**

```
cmd: git show 9acf1992:colors/src/core/rng.ts | grep -n 'fork'
out: fork: (label) => makeRng((seed ^ hashString(label)) >>> 0)
     export function forkSeed(seed, label) { return ((seed>>>0) ^ hashString(label)) >>> 0 }
cmd: git grep -n "fork('p'" 9acf1992 -- colors/
out: colors/src/sports/nfl/app/store.ts:84: cpuChoose(st, team, cpu.fork('p' + st.pos))
```

The fork is a **pure function of (seed, label)** — it does not read the board, the score, or the round. `cpu.fork('p'+pos)` is therefore identical for a trailing and a leading board at the same (seed, pos). **The premise "the RNG does not know the board" is VERIFIED, not INFERRED.** The 30-byte label surgery (`fork('p' + pos + '-' + band)`) is the only way to make the fork conditional, and it is a real change with real risk: it changes every existing seed's pick stream, so it cannot ship without re-pinning every replay that depends on `p<pos>`.

**The probe I would run (I did not execute the 100× board-trial loop — it needs the full `cpuChoose`/`newDraft` harness, which is a seat-with-a-harness run, not a one-file node check; label: INFERRED-design, not run by me):** fix one seed; for each of N paired board snapshots that differ only in score differential (e.g. user team trailing 10 / even / leading 14 at the same pick), call `cpuChoose` off `fork('p'+pos)` and `fork('p'+pos+'-'+band)`; log the top-3 by OVR and their OVR deltas; 100×. Pass = the static-fork pick distribution and the band-fork distribution are statistically indistinguishable (the idea dies); fail = the band fork measurably shifts picks toward need when trailing (the idea earns a build). **The cheap pre-check is already done: static `fork('p'+pos)` *cannot* respond to the board — so any difference the band fork produces is 100% the label surgery, not the RNG. That is the whole point of the test.**

### A1 · Boot replication — I leave it (Z.ai principal executor; any seat may run).
The R3.1 receipt defects are accepted and corrected in the verified-as-of block (push the artefact to `council/muse`; mounted marker = `.cp-teambtn`; FCP 10 trials, mounted 5; "Vue's median is lower in both runs on both metrics", not "Svelte never faster"). **One thing I can add from my own offline run:** the boot difference between arms at card scale was 124 ms (IIFE) vs 133 ms (single-file) on the *same* arm — i.e. the packaging route moves mount time ~9 ms, an order below the between-arm gap the replication is trying to resolve. Whatever the paired trial finds, it will not be a packaging artefact. I did not re-run the paired cold-load; that is Z.ai's to author and I encourage him to take it.

### A2 · file:// fix verification — **left to the build-config owner (Owner question F1–F3).** My design is filed; I will not re-run it here. The open sub-question stands and is the right one: **Route C at four-slice scale is INFERRED** — card-scale is 15.94 kB gz in one 40,545 B HTML; the four-slice JS alone is ~103 kB gz, so a single-file HTML would inline ~103 kB gz and the "one file" comfort may break. That must be measured before F2 is answered. I flag one thing my card-scale run already shows: single-file mount was 9 ms slower than IIFE (133 vs 124) — negligible, but it means single-file is not free at scale.

### A3 · λ estimator validation — I take the **placebo calibration** as the design I would run first (it is the cheapest and it can kill the estimator in one run), and I add a fifth check none of the four names:
- **Placebo (Inkling):** shuffle game outcomes within seasons, re-run the estimator, count how many placebo contexts land inside the λ window `[0.3902, 0.4032)`. If the placebo hit-rate exceeds the false-discovery rate the estimator's own SE implies, it is fitting noise. **This is the single most decisive cheap run** because it needs no simulation of known λ — only a permutation of data that already exists.
- **Injection + pre-registered τ (GLM):** accept; the τ must be frozen from the resolvable contexts before any fitting, and the ~541-game cell is the right target. 
- **Kappa preseason-vs-regular (GLM):** accept; the two-shape constraint (SD, blowout share, one-score share, home-win rate) with relative_c fixed is a real identification test.
- **Hard-zero sub-floor + posterior interval (Inkling):** accept — δ_c ≡ 0 below ~541 games, never a point.
- **My fifth (new): estimator *identifiability under the exact estimator*, not the model.** VL already filed the four-(λ,θ) non-identifiability receipt; the missing run is to take the estimator's own objective and show the λ̂ it returns is invariant across those four (λ,θ) pairs on *real* (not simulated) contexts — if it is, the estimator cannot separate λ from θ and the window is an artefact of the prior, not a measurement. This is the falsifier that would retire the whole dial, and it is cheaper than the injection.

I did not run A3; it is the Lab's ( GLM/Inkling) and I have no estimator harness in this worktree. **I leave it with the placebo as the recommended first run.**

### A4 · Replay-determinism conformance sweep — I leave it (Inkling's; Lab-held). One cheap thing I can say from source: `rng.ts` has `forkSeed(seed, label)` exported specifically so a game seed is storable and replayable — the determinism contract is in the type (`Rng` is passed in, never `Math.random`). Whether the pmath bit-for-bit check runs on every build in the release path is a CI-config question, not an engine question; I did not run it.

---

## B · Innovations — the four platform surfaces, compared on one axis

Axis: **what the user does · engine work needed · what falsifies it.** I do not smooth the disagreements.

| Surface | What the user does | Engine work | Falsifier |
|---|---|---|---|
| **Glyph — Spec-first Sim Lab** | edits a JSON spec (kappa/seed/fixture), hits Run, reads a diff vs baseline | thin: a spec schema + a pinned-ref runner + diff view; **no new engine math** | specs not reused; spec drifts from engine contract → second source of truth |
| **GLM — DIALS panel** | sees kappa + per-context λ + flex table as one validated JSON, 100-season re-sim | **none** — the dial set exists; it is a form over existing state | the λ is not identifiable (VL's receipt) → the panel displays a prior, not a measurement |
| **Inkling — OFFENCE dial wall** | grades priorities in one form, live-previewed | **none** — absorbs the existing dial set behind a mode flag, never a second app | the wall becomes a second app (the fork Inkling warns against) |
| **VL — knob panel + Folds** | saves a "fold" = one blob + provenance (pin, θ, λ, receipts), reloadable in a fresh browser | a save schema + version check; the save design is the Owner's one-blob ruling | a fold that does not reload in a fresh browser is not a fold |

**Disagreements to keep legible, not merge:** GLM's DIALS and Inkling's OFFENCE wall are **the same surface described twice** — GLM says "the dial set already exists, no engine work," Inkling says "absorb it as one wall behind a mode flag." They agree on *no new engine math* and disagree on *shell* (GLM: a JSON panel + re-sim; Inkling: a form with live preview, explicitly not a fork). That is a real product disagreement (panel-vs-form) the Owner should see; I do not reconcile it. Glyph's spec-first is the **only one that adds a durable artefact** (the spec file) and the only one whose falsifier is *maintenance* (spec drift) rather than *display* (λ not identifiable). VL's Folds is orthogonal — it is a save/portability layer that any of the other three could sit on top of.

**Which I would build first: GLM's DIALS panel — but only because its falsifier is already half-settled and it needs zero engine work.** If VL's λ non-identifiability receipt is right, the DIALS panel's honest first job is to *display that λ is not separately identifiable*, not to sell a dial — which makes it the cheapest surface that also produces a real scientific result. **The risk I flag:** if the λ estimator is later shown to be fitting noise (A3 placebo), the DIALS panel becomes a very polished display of a prior. Build it as a *diagnostic*, not a *control*, and the falsifier is built into the first screen. I would **not** build Glyph's spec-first first — its falsifier (spec drift) is the slowest to detect and the most expensive to unwind.

**A fourth smallest version none of the three names:** a **receipt diff viewer** — no spec, no dials, no save; just "pin these two engine refs + this seed + this fixture, show me the byte-level record diff and the gate results side by side." It is smaller than Glyph's spec (no schema, no editor — two refs and a Run), it is the substrate all three need (Glyph diffs specs, GLM re-sims against a baseline, Inkling previews against a control, VL's fold carries its receipts), and its falsifier is immediate (if two refs on the same seed do not produce a byte-identical record, determinism is broken — which is exactly A4's weekly arm). **It is A4 wearing a UI.** I would build that before any of the three.

---

## C · Framework measurement — reconcile, one rule each

**C1. Commission or passenger — I side with Inkling: passenger only, never commissioned.** My reason is not cost, it is *what a commissioned measurement can prove*. A commissioned authoring bake-off measures "which framework I, this agent, author faster in a two-hour window" — that is a measurement of my own warmed-up tool-use, not of the framework. GLM's honest job for it ("protect against a Vue mistake, not discover a Svelte win") is the correct frame, and a frame whose whole purpose is to confirm a prior is not worth commissioning. **If passenger, the ride is: the Slice 5 card, built once per arm against the *same* pinned fixture, with the framework-owned mechanism named per GLM's anti-gaming clause.** Trigger: the moment Slice 5 is scheduled anyway, the arm that wins the *first build* of the card (GLM's "first build is the primary, second is the replication") is the measurement. No separate bake-off. **The disagreement I will not smooth:** Glyph/GLM say commission; Inkling says passenger. I break the tie for passenger because a commissioned measurement I run on myself is exactly the confound I flagged in session 2 (training-data mix), and no amount of pre-registration fixes "I am measuring my own warm tool-use."

**C2. One settle rule — I propose a fourth that subsumes all three, because they do not agree and the disagreement is real:**

> **The arm that, on the first build of each of ≥3 slices of varied shape (one read-heavy, one write-heavy, one state-heavy), reaches pinned fidelity in fewer *framework-owned repair cycles* — with fidelity judged by a reviewer who sees both arms with arm-title labels swapped per screenshot and a key held by a seat that builds neither — wins. A slice counts only if the framework-owned mechanism is named (GLM's anti-gaming clause); shared-layer code is not a framework difference. First build is the primary measurement, second build is the structure replication. Within ±1 repair cycle across all slices = tie → tooling/ecosystem tiebreak → Vue.**

Why this subsumes the three:
- **vs Glyph (≥2/3 slices, ≥20% lower correction effort):** I keep "≥3 slices, first-build-primary, separate first from maintenance, no critical fidelity regression," but I **drop the 20% threshold** — a 20% effort threshold on a repair-cycle count with N=3 is noise (GLM's own ±330–430 ms point, applied to cycle counts: three slices cannot resolve 20%). I keep the *shape* (varied slices, first-build primary) and replace the *magnitude* with a sign test (≥2/3 slices) plus a tie band.
- **vs Inkling (≥15% on both wall-clock AND repair cycles):** I keep "repair cycles, not wall-clock alone" (wall-clock at N=3 is noise; repair cycles are countable and named) and I keep **the swapped-blind reviewer + the key-holder who builds neither** — that is the strongest single clause any of the three proposed and I adopt it whole. I drop the 15%-on-both because two metrics at 15% each is two chances to fail a threshold that N=3 cannot support.
- **vs GLM (≥15% time-to-green OR ≥10% fewer lines; ±5% both = tie):** I keep "fewer framework-owned lines" as a *secondary* readout (it is the least gameable number) and the "±band = tie → Vue" (I widen ±5% to ±1 repair cycle, because lines and cycles disagree at small N and the honest tie is "no arm is distinguishable"). I keep GLM's pre-registration and per-slice pairwise-delta-with-order.

**The one rule: fewer framework-owned repair cycles to pinned fidelity, sign-consistent across ≥2/3 varied slices, first build primary, swapped-blind reviewer, named-mechanism-only, tie → Vue.** That is my fourth; it is not a list of the three.

---

## D · Settled constants — design the measurement, do not re-argue

**D1 · POINTS_PER_WIN = 32.5.** I accept it is the least-measured settled constant and I accept the Lab should measure it (protected constant, Owner alone). **The measurement I would design, and the one I would trust:** regress wins on point differential across **real team-seasons** (NFL, nflverse, ~since 1999 — the same public CSV GLM already uses for kappa) to get the *real* wins-per-point slope, **and independently** re-derive it from **engine replays** (the engine's own season sim: total points vs total wins across many seeds). Ratify only if the two agree within a stated band; open the ruling with the delta shown if they disagree. **The falsifier that would actually move the constant:** if the real-NFL slope and the engine slope differ by more than the re-pin's own quantisation step (2.5 per slot), the constant is not tracking either reality and the next re-pin is a *choice*, not a ratification. **A cheaper measurement I would run first:** the engine is deterministic per seed — take 200 seeds, regress the engine's own wins on its own points; if *that* slope is not 32.5, the constant is already inconsistent with the engine that consumes it, and no real-NFL regression is needed to show it. **I did not run this** (no season-replay harness in this worktree); it is the Lab's.

**D2 · flex single price per rule (GLM's static candidate).** I accept the design and sharpen the measurement. **Trigger:** seeded draft, rounds 15+, count picks where `plain best-available` (max OVR) and `flex-adjusted best-available` (max `ovr − fit(role, openDest).penalty`) disagree; the win cost of following the plain advice is the effect size. **What would prove GLM wrong (I adopt his falsifier):** the disagreement rate rounds to zero across fresh seeds. **My addition — the measurement has a confound GLM does not name:** "open slots" is itself a function of the user's own picks, so the disagreement is partly *the user's draft*, not the flex price. To isolate the flex price, hold the user's picks fixed (replay the same user log) and vary only the *display* (plain vs flex-adjusted); the disagreement that survives is the flex price's true effect. **Second addition:** the effect should be measured **at the moment of the pick, against the actual remaining pool depth**, not the pre-draft pool — the "depth at that position" in GLM's own statement is a *state*, and the static price is only wrong if the state changes the answer. That is the whole test: does `ovr − penalty` ever disagree with `ovr` *given the live pool*? I did not run it (needs the draft harness); design filed.

---

## E · Process — adopt / reject, one line each

- **Verified-as-of block (Inkling):** **ADOPT, with the bound the prompt already has.** Five lines per claim, only the answering seat re-checks, optional where no seat acts. The prompt's own top block is the model. Reject the unbounded form (provenance bureaucracy) — the bound is the whole value.
- **Numbered revision ledger (GLM):** **ADOPT.** Append-only, one dated row per revision with the delta. The prompt's single-file-with-ledger is the right shape; no short version to drift.
- **Countersign rule (OR):** **ADOPT with a narrowing.** "No delta, countersigned" + four-line receipt is a lawful ✓ for *verification* items; I would **not** extend it to product changes or pin moves — those keep the three-seat chain. OR's rule is right for the queue's verification tier, wrong if it leaks into pins.
- **Review-chain economy (Inkling):** **ADOPT.** "What breaks if this stays in" as a required line, and "no failure mode found" as a lawful pass, is the single best anti-theatre rule in the round. The queue re-ranking on the Architect's last integrated build, not review-count, is correct.
- **Three-state done + re-pin expiry (Inkling):** **ADOPT the three states; ADOPT the re-pin expiry; ADOPT the four-line receipt.** GREEN/OWNER-PENDING/RED is honest. The re-pin-expiry clause (gates re-run against the pin or the slice reverts to REVIEW-NEEDED) is the one that prevents a stale pin from silently certifying a slice. **Reject the "OWNER-USED" fourth state as a *state* — it is an event, not a state; fold it into OWNER-PENDING's exit condition.** And **finding-closed-with-owner** (a finding filed "for the Architect" closes only when the Architect acts or the Owner declines) — adopt; it is the same anti-orphan rule as the queue's re-rank.
- **Anti-gaming clause for "improvable" (GLM):** **ADOPT in full.** Name the framework-owned mechanism or it is not a framework difference. This is the clause that makes C2 measurable at all; without it every "Svelte is nicer" claim is unfalsifiable.
- **The "improvable" strike (OR vs the other four):** **I side with the split, not the strike — and I say where.** Strike "improvable" as a *uniform gate of DONE* (OR's three-clause bar: parity battery + one new named probe + zero regressions on the w89 worst cases is the right gate); **keep "improvable" as a per-view verdict**, because GLM's and Glyph's versions are right that *beauty is a separate Owner/design judgment* and the thirty-second user test (Inkling) is the only thing that can judge it. **The split I will not smooth:** OR wants it gone from DONE; GLM/Inkling want beauty as a separate track. Both are right about different things — OR is right that "improvable" cannot be a *gate*, GLM is right that it cannot be *deleted*. The legible split for the Owner: **"improvable" is struck as a gate, retained as a per-view Owner verdict with a screenshot pair per slice.** That is where I stand.

---

## F · Owner questions — carried, not answered

I do not rule on these. Where my answer depends on one, I say which and what I do under each branch:

1. **Vanilla file:// for Cakepanz?** If **yes**: Route C at four-slice scale must be measured before committing (A2 sub-question), and the ~103 kB gz inline is the number to beat. If **no**: Route A (dev default) is fine and only the *shipped* artefact needs B/C. **Either way the fix is framework-neutral and cheap** — my filing stands.
2. **One HTML or multi-file?** Route C vs B. I lean C (one file, no post-build regex to drift), but **only after the four-slice inline size is measured** — my card-scale 15.94 kB gz does not predict 103 kB gz behaviour. Under branch "multi-file OK," B is the lower-risk default.
3. **Who owns the build-config fix, which tree, when?** I have no standing to answer; I note Z.ai's `vite.file.config.mjs` is cited-and-absent (the fix's effect is verified, the config is not in the repo) — that gap should close before the fix is called "done."
4. **The framework pick** — after the Slice 5 within-agent arm (C). My C2 rule is the settle rule I would hand the Owner.
5. **The "improvable" strike** — see E; my position is "struck as a gate, retained as a per-view Owner verdict."

---

Labels: **VERIFIED** — every command and output in §0 and A5/A6 (counts, LS-per-team, FA positions, `fork` source, `fit` API, `react` still declared, no app entry). **REPORTED** — the A1 receipt defects and the 11,569 B bundle figure (I did not re-measure; I cite the corrected values from the verified-as-of block). **INFERRED** — the A6 100× probe (designed, not run); the A3 placebo/injection designs (not run — no harness here); D1/D2 measurements (designed, not run). **UNKNOWN** — nothing material to what I filed; the A1/A2/A3/A4 runs are left to the seats named for them, honestly.

— ernie (advisor) · 2026-11-15T12:25Z · read-only on every other seat's branch.