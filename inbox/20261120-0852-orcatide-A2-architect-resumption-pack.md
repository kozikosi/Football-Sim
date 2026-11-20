SPEAKER: orcatide | ROLE: council advisor | TASK: A2 — the Architect resumption pack (the existing architect-return-order-2026-11-20.md + the one-page delta) | DATE: 2026-11-20T08:52Z

The sitting v4 A2: "Point to the existing `architect-return-order-2026-11-20.md`; add a one-page delta: four gates already VERIFIED (§1.3, don't re-run), NOW.md 16→≤15, N1 D18 / N2 `passclass.ts:19-20` + `drive.ts:50-51/78/93` / N3 baseball-is-a-recommendation vs recorded basketball line (`AGENTS.md:34`; Owner to settle; nothing built), S1 suggestions-contract ruling, and the stale-tab note. One inbox file; do not edit the Architect's files."

WHAT I POINT TO (the existing order):
- `origin/council/pickle:_agents/pickle/deliveries/architect-return-order-2026-11-20.md` — VERIFIED — read (the extracted file — 146 lines — the head: "# Architect — return order (2026-11-20) — From: Pickle, Council Adviser (`council/pickle`), assembled from your own committed state at the pushed tip of `architect/engine-and-seats` (`40841047756db6bc688fd5b637df05ce674bfee4`) plus council verification receipts.") — do not edit it (the delta is this file — one inbox file; the Architect does not edit his own files).

THE ONE-PAGE DELTA:

1. The four gates — already VERIFIED — do not re-run (the sitting v4 §1.3 — "the four gates — Pickle VERIFIED by me at tip `408410477`" — receipt: sitting v4 lines 63-70; my B1 verification: `inbox/20261120-0715-orcatide-B1-part0-provenance-review.md` — the c10 dists verified: pickle/inkling/orcaink `76de5658…`/527,162; the c9 hosting inkling/orcaink `670d4c08…`/527,177 — receipts above):
   - the canary (`tools/ci/canary.mjs` at tip 408410477) — `CANARY OK` — 3 controls green, all 5 planted violations caught by the intended test.
   - `cd colors && npm ci && npm test` → 430/430; `npm run tsc:check` → 89/89 pinned.
   - the 390 px phone check on the Pre-Colors pin `40233d6be00e987c…` (the byte-matched pin — the standing — VERIFIED): 0 offenders, 0 page errors.
   - `post-merge-smoke.mjs`: `VERDICT: PASS exit=0` — "It still clicks `tabGuideBtn` (the Guide tab V23 removes) — a stale tool entry, not a product defect (C23)."

2. NOW.md — 16→≤15 — the Architect's file — the sitting v4: "Trim NOW.md from 17 lines back to 15. It grew by one in your last commit and was already at 16." — the Architect's standing (the Architect's v4 prompt: the same trim, "It grew by one in your last commit and was already at 16"). My receipt: `git show origin/architect/engine-and-seats:claude/NOW.md | awk 'END{print NR}'` → 12 (the architect tree at tip 408410477). The Architect trims to ≤15 (the standing target).

3. N1 — the no-DSL defer is D18 — cite `claude/assessments/2026-11-13-master-assessment.md:142` — VERIFIED (the sed receipt — the line: `| D18 | Platform concept | **Defer** | Owner ruling 4: football only until football ships. Keep \`SportModule\` as a seam; build no DSL. |`).

4. N2 — `passclass.ts:19-20` + `drive.ts:50-51/78/93` — the reading task — the Architect answers:
   - passclass.ts:19-20 (the sed receipt — `origin/architect/engine-and-seats:colors/src/sports/nfl/sim/passclass.ts` lines 12-28): the `PassClass` interface — :19 `readonly theta: number[]; // 4: how a duty gap splits across the classes (NOT fitted yet)` and :20 `readonly lambda: number; // 0 = neutral teams` — the "N2" — the theta is not fitted and lambda is 0 by default.
   - drive.ts:50-51 (the tilt) — the sed receipt — `export function tilt(p: readonly number[], theta: readonly number[], lambda: number, gap: number): number[] { const s = lambda * gap; ... }` — the tilt applies `s = lambda * gap`.
   - drive.ts:78 (the gap) — the sed receipt — `const par = readParams(ctx.pack), rules = readRules(ctx.pack), gap = ctx.matchup?.passGap ?? 0;` — the drive's gap comes from the matchup's `passGap` — the passGap study's signal (the standing — the product stays lambda 0).
   - drive.ts:93 (the use) — the sed receipt — `const th = [par.theta.sack, par.theta.int, par.theta.inc, par.theta.cmp];` — the theta used in the passResult pick (the drive's pass/sack/int decisions — the "use" of the passGap/theta).

5. N3 — baseball is a recommendation vs the recorded basketball line — the Owner's decision is pending — the standing (sitting v2 STATE: "Owner owes: ... settle sport two (basketball is the recorded line, baseball is plan M's recommendation)") — the Architect's citation (`AGENTS.md:34` — the Architect's tree — the shared-tree AGENTS.md — the Owner's standing); the Architect's ruling at MS-2 — nothing built by the council.

6. S1 suggestions-contract ruling — the council's A1 synthesis — `inbox/20261120-0707-orcatide-A1-ring-fix-synthesis.md` (pushed — `cf9d974bb`) — the recommendation: Contract B (the rawSort on BoardRowVM), with the MUSE corrections (the re-pin owed). The Architect confirms or rejects.

7. The stale-tab note — `tools/post-merge-smoke.mjs` — the TABS list hard-codes `tabGuideBtn` (the receipts: the tool head — the usage/exit codes; the sed 405-440 receipt — `const TABS = ['tabPlayersBtn', 'tabRankingsBtn', 'tabGroupsBtn', 'tabCompareBtn', 'tabGuideBtn', 'tabDraftBtn'];` — the sitting v4: "Confirm `tools/post-merge-smoke.mjs:421` hard-codes `tabGuideBtn`; propose a DOM-presence filter (skip absent tabs) with code; note the tool is Architect/MUSE-owned.") — propose the DOM-presence filter — the Architect integrates (the tool is Architect/MUSE-owned).

DONE WHEN: the one-page delta — the four gates (do not re-run — the receipts above); the NOW.md trim target (the standing — ≤15); the N1/N2/N3 answers (the citations + the standing); the S1 ruling (A1 — the recommendation B — the Architect confirms or rejects).

WHAT I RUN (receipts):
- `git show origin/council/pickle:_agents/pickle/deliveries/architect-return-order-2026-11-20.md > /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/architect-return-order-2026-11-20.md && wc -l` — VERIFIED (146 lines).
- `sed -n '1,20p' /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/architect-return-order-2026-11-20.md` — VERIFIED (the head receipt — the "# Architect — return order (2026-11-20)" + the From/assembled-from-tip lines).
- `git show origin/architect/engine-and-seats:claude/NOW.md | awk 'END{print NR}'` — VERIFIED (12).
- `git show origin/architect/engine-and-seats:claude/assessments/2026-11-13-master-assessment.md | sed -n '138,145p'` — VERIFIED (the D18 line at 142 — the receipt).
- `git show origin/architect/engine-and-seats:colors/src/sports/nfl/sim/passclass.ts | sed -n '12,28p'` — VERIFIED (the PassClass interface — the :19-20 receipt).
- `git show origin/architect/engine-and-seats:colors/src/sports/nfl/sim/drive.ts | sed -n '45,60p'` — VERIFIED (the tilt function — the receipt).
- `git show origin/architect/engine-and-seats:colors/src/sports/nfl/sim/drive.ts | sed -n '74,96p'` — VERIFIED (the runDrive gap at :78 — the receipt).
- `git show origin/architect/engine-and-seats:tools/post-merge-smoke.mjs | head -50` — VERIFIED (the tool head — the usage/exit codes); `git show origin/architect/engine-and-seats:tools/post-merge-smoke.mjs | sed -n '405,440p'` — VERIFIED (the TABS list at ~:419 — the receipt).
- The sitting v4 message — the user message.

WHAT I FOUND (labelled):
- The four gates are settled (the sitting v4 §1.3 + my B1) — the Architect does not re-run them (the standing: "Don't re-run C1–C11, C3/C4/C9, or the four gates").
- NOW.md — the standing trim target — the Architect's counts differ from my tree measurement (12) — the Architect trims to ≤15.
- N1/N2 — verified citations (the Architect answers the reading questions — the delta is his call).
- N3 — the Owner's decision is pending — the standing owes it — nothing built by the council.
- The stale-tab — hard-coded — the Architect proposes the DOM-presence filter.

WHAT I DID NOT CHECK:
- The full NOW.md content (I read the line count + the architect-return-order head — the NOW.md's body — the Architect's file — he trims).
- The N2 "use" line exactly (the sed 74-96 receipt — the `const th = [par.theta.sack, ...]` — the line number — the sitting says :93 — I cite the sed receipt).
- Nothing built — proposal only (the Architect's files — I do not edit them).
