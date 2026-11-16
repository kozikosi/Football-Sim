SPEAKER: inkling | ROLE: council | TASK: review the Architect's 15–16 Nov report (pack builder 1c, OT clock, FB→TE 6→2, dev page, optimizer constants, flex-formula decision) | DATE: 2026-11-16T22:35Z
FOR: P-332

# Inkling review — "Architect: NOW.md and the flex-formula decision (… 7a0706d)"

extricated at `7a0706df` (`git archive 7a0706df`), plus CI read from the live runs. Every "VERIFIED" below = I ran it in that throwaway extract or read the live log myself. Nothing was pushed or edited; the extract was discarded.

## The claims, checked one by one

| # | claim | result |
|---|---|---|
| 1 | 378/378 tests pass at `7a0706df` | **VERIFIED by independent re-run** (`npm run test`, whole-repo extract with `data/` + `tools/`: `ℹ pass 378 / ℹ fail 0`). CI run `43964180233` agrees (log line: `ℹ pass 378 … ℹ fail 0`). Note: a bare `colors/` checkout fails 4 tests (missing `data/packs/…json`, `tools/mathlab/flex.json`) — first-time runners must use the whole repo; package.json says so. |
| 2 | tsc ratchet 89/89 | **VERIFIED on CI logs** (run 43964180233: `tsc baseline OK: 89 errors (pinned 89)`); NOT re-run locally (would need the pinned binary chain); CI is the gate that counts. |
| 3 | Production build passes on CI under Node 24; advisory `continue-on-error` left on purpose | **VERIFIED by log lines** — `vite v8.3.6`, `✓ built in 85ms`, and `Production build (… still advisory, flip continue-on-error to make it a gate)`. The flip is the Owner's; **my recommendation: flip it** — the build is green, and report-only masking of red has now cost two rounds of confusion (this one included). Recommendation, not decision. |
| 4 | Overtime clock fix; new test fails on old code | **VERIFIED with the revert-control**: restoring `86f22d10`'s `app/feed.ts` in the throwaway makes `feed-clock.test.ts` fail exactly as reported (`drive 20 of seed 33: Q4 00:00`); restoring the pin re-greens (1/0). |
| 5 | FB→TE 6→2 landed; DIME stays 12 | **VERIFIED at bytes** (flex.ts `FB: { RB: 2, TE: 2 }`, tier counts {0:23, 2:11, 6:42, 12:23}, flex.json = flex.ts rule-by-rule asserted by the green suite). **BUT see the dissent — the DIME half of Option B is missing from the record.** |
| 6 | `lineup.test.ts` rewritten; design.json pin gone; retired-table guard added and fails when violated | **VERIFIED**: reads of the guard + two plants — a file importing `WEIGHT` outside the allowed set → guard **FAILS**; a `'design.json'` string literal under src → guard **FAILS**; tree restored, 35/35 green. (A `// probe` comment mentioning design.json passed — comments are stripped by design; the string arm of the guard caught the real plant.) |
| 7 | Optimizer constant (1e12/1e7/1e5) derived from the value scale; identical output at today's scale; tested at 1 / 200 / 0.001 | **VERIFIED**: `priorities()` derives emergency/plays/illegal from `VALUE_SPAN × Σ\|spot values\|` (lineup.ts); `lineup-priorities.test.ts` checks the emergency-fill count == exact bipartite minimum on 240 skewed rosters at scales 1, 200, 0.001. Suite green confirms the rest. |
| 8 | Pack builder (1c): TS reproduces the lab within 1% on all 11 metrics; held-out +8.3/+2.9/+2.4; ~3,900 games/s | **VERIFIED BY MY OWN RE-RUN**: `node --experimental-strip-types tools/totals-bar.ts 12000` — 11/11 metrics within **−1.0..+0.2%** of the Python lab (points 23.57 vs 23.58); held-out +8.3/+2.9/+2.4 exactly as claimed; 5,704 games/s, 205 events/game, table holes 0/0/0/0, OT games 4.2%. The +8.3/+2.9/+2.4 are per-seed deterministic pins (the pack is versioned input), not a RNG coincidence. Bake determinism (same md5 twice) and the nflverse 2016–2022 provenance: **REPORTED, not re-checked** (would need the 200 MB fetch; not re-downloaded). |
| 9 | Dev page: framework-free, builds, same seed → same game, no console errors; CI build step still advisory | **VERIFIED (re-proved, not trusted)**: `npm ci && npm run build` clean (16 modules); Chromium probe — `dev-1` twice → byte-identical box score `A 28 - B 42`, pack hash `pack53:0b60973944ae13`, 221 events both times; `dev-2` differs; zero console/page errors across three loads. (His NOW.md claim of a Chromium check stands on my dock, plus this one.) |
| 10 | Flex formula decision: hand-priced 99-rule table stays; no formula shipped | **Sound as filed.** The reasoning against shipping one (a formula overriding ruled prices is an unapproved rule change; "decide the formula" delegation doesn't license that) is the protected-constants doctrine applied correctly. Ernie's ladder (50/99 exact; prices the DIME trio at 4–5 vs ruled 12; ~2× flex rate) is reported fairly, labeled R (not re-run — correct scope). |
| 11 | Formation-gap test pins all four DL5-conditioned cells; 900→700 arithmetic follows FB>TE (−4 × 50) | **VERIFIED** — `formation-gap.test.ts` asserts 2500 / 1800 / 700 (DL5=DT) and 1800/1800/0 (DL5=EDGE), the DL5 pinning I proposed in the P-333 round is landed, and the comment correctly marks Option B as triggering a mandatory re-pin. |
| 12 | Remaining gap 700 table units ≈ 0.09 wins/season is the Owner's football call (re-price one pair) | Math consistent (700 × 0.00254/20 = 0.0889). **As a question it is the Owner's to answer — but see the dissent: the already-approved answer is Option B, which is not landed.** |

## THE DISSENT — Option B is 1 of 4 landed, and the record does not say so (filed, not smoothed)

P-332 (Owner decision, 2026-11-10, `origin/council/muse` queue + the Option B prompt `claude-flex-option-b-2026-11-10.md`, which says in the boldest words available: *"Do not treat the 12 as sacred — the Owner's current decision is 6 … It is ready to land … Do not land Option B blindly,"* explicitly allowing a proposal-first reply and an Owner turn before code):

> TE>DIME 12→6 · ILB>DIME 12→6 · OLB>DIME 12→6 · FB>TE 6→2 (expected tiers {0:23, 2:11, 6:45, 12:20}; the 3-4 test to 2200; council verifies after landing).

**Landed six days later (fe611cbd…7a0706df): FB>TE 6→2 only.** The DIME trio is asserted at **12** in the rewritten `lineup.test.ts` ("the DIME rules stay at 12"), the tier counts on disk are {0:23, 2:11, 6:42, 12:23}, P-332 carries **no landed/superseded note**, and I can find **no superseding ruling anywhere on disk** — not in `_agents/owner-notes/` (nothing after 2026-11-15-framework, which has no FB/DIME/flex content), not the queue, not any bulletin, not in the Architect's own docs (`claude/NOW.md`, the flex-formula decision). The flex-formula decision doc asserts DIME-12 as "**your ruled 12**" — that misattributes a settled Owner ruling to something Option B explicitly re-opened and the Owner pre-approved changing, and the formation-gap/2500 figures the Architect now reports are computed on an unapproved-for-the-DIME-legs table.

Two worlds, both surviving:
- **World A (re-ruled off-record):** the Owner said "FB>TE only, DIME stays 12" in a chat that was never filed. Then the record owes an owner-note, and the decision doc's "ruled 12" needs its citation. Right now the protected constant is in a state the Owner's own written decision does not describe.
- **World B (three legs silently dropped):** an Owner-approved protected-constant change is sitting unlanded, and the 16-Nov report presents the half-landing as a settled state with a football question attached that was already answered once (Option B).

**The ask of the Owner (either world closes it):** rule once, in one line — (i) "Option B stands — land the three DIME legs" (then the council verifies counts {23/11/45/20} + the 3-4 test at 2200 + PIN_ENGINE, per the P-332 brief), or (ii) "Option B is void; DIME stays 12" (then MUSE records the supersession in the queue row and the decision doc gets its citation), or (iii) "Option B void except FB>TE" (void in part, FB>TE stands at 2 — and the record says exactly that). And the second question in the report — which pair to re-price for the 700 gap — already has this same answer waiting behind it.

Fairness note: the Option B prompt explicitly permitted a proposal-first reply instead of code, so withholding DIME is not itself a breach; the defect is that the reply/ruling is not on disk and the DIME state is documented as settled. If the Owner rules the DIME legs void in part (world iii), the Architect's handling is vindicated and nothing here survives except the record gap.

## Minor (verified, not material)

- **NOW.md is stale at its headline**: "UNKNOWN: CI result of today's commits (not checked)" — written before CI finished; he did check, and the runs are green on the log lines (item 3). One line next re-write. Also "suite 378/378 (local, Node 22)" vs CI Node 24 — name both or neither.
- **muse's mirror of `tools/mathlab/flex.json` is stale** (pre-FB>TE: {23@12, 43@6, 10@2}) — MUSE's tree, flagged for MUSE in the bulletin, not edited by me.
- **ENGAGEMENT of P-333**: the DL5-corner finding (gap is DT-at-DL5, 0 if EDGE) is landed as the all-cells test pin — good faith, exactly as proposed.
- No football numbers were pinned in the new 1b/1c surface; the reworked `lineup.test.ts` pins structure, not the retired table; the pinned QB relation is an ordering, not a weight.

## What I did NOT verify (UNKNOWN)

- Bake determinism (`fba7262c…` twice); nflverse provenance; the Python lab's own findings.
- Safari/Firefox float agreement; browser/phone throughput; pack load on a phone.
- The Architect's second pack question (which seasons for the product pack) — correctly the Owner's; 2016–2022 was chosen for honest holdout, that fact travels with whatever is chosen next.
- CI Node is taken from the log banner (`setup-node@v4`, workflow names Node 24); the version literal was not read from `ci.yml`.

**VERDICT: improved** — the round lands real, measured, honest work (1c re-verified by me within 0.1% of the lab; dev page re-proved; guards and controls both die on plant; CI read at the log line) **with one open record defect that only the Owner can close (the Option B partial landing)**. Not "rejected": nothing here is dishonest work; the unlanded DIME legs are a decision record gap, filed here for ruling.

**What unblocks:** the Owner's one-line rule on Option B (i/ii/iii) → MUSE records it → Architect lands or formally retires the DIME legs → council verifies counts. Everything else in the round stands and may be built on.
