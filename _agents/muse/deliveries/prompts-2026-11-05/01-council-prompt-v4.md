# COUNCIL PROMPT v4 — 76 PANCAKES BUILD: REVIEW, TOOLS, VERIFICATION

Owner decisions 2026-11-05. This supersedes the v3 council prompt in full — do not
follow v3 where it differs. Read the whole prompt before starting anything.

## SHARED CONTEXT (same in all three v4 prompts)

- **Brand:** "76 Pancakes" is locked (Orlando Pace #76, pancake blocks). The banner
  becomes "76" instead of "20-0". "20-0" as a season record STAYS — the
  "Can you go 20-0?" copy is about the record, and the P(20-0) target below is
  about the record. "20-0" as brand/banner goes to 76.
- **LATEST-WAVE RULE:** never hardcode a wave number. Whenever you need a wave
  file or a parity anchor, find the LATEST wave file — the highest w-number with
  a product HTML on gh-pages — and verify it by listing the files. Do not
  assume w70 or any fixed number.
- **"Skilled" — Owner definition, locked 2026-11-05.** A skilled drafter selects
  within the top 30 players ranked by priority (Wins/Priority, not raw OVR) in
  every draft round. This defines a CLASS, not a single pick: from always-#1 to
  always-#30. The calibration targets apply to the AVERAGE skilled drafter —
  the middle of the range. The Lab's `skilled` policy (picks uniformly at
  random among the top 30 by Wins) measures that average. The term "top30" is
  RETIRED — use "skilled" everywhere. Do not say "top-30 pickers" without the
  definition beside it.
- **CALIBRATION TARGETS (refined 2026-11-05, supersedes 80/25/10):** for the
  average skilled drafter, 90% playoffs, ~35% Super Bowl appearance, 25%
  title. New target: going 20-0 (a perfect season: 17-0 + 3 playoff wins)
  should be about 1–2% possible for a skilled player. The Lab must count
  perfect seasons (P(20-0)) as a metric alongside playoff/SB/title rates.
- **Best-value — measured 2026-11-05 (MUSE, N=1000, VERIFIED).** A drafter who
  takes #1 by priority every round — the TOP of the skilled class — measures
  89.5% playoffs / 33.0% SB / 21.6% title / 11.43 mean wins. That is IDENTICAL
  to the `greedy` policy on every metric: `greedy` sorts by Wins and takes #1,
  with OVR only as a tiebreak (`draft.ts:140`), so the "naive best-OVR" label
  is WRONG. The policy that actually takes best OVR is `favorites`
  (17.4% / 2.0% / 0.7%). The skilled average is 48.5% / 7.1% / 3.0%. The top
  of the class already sits at target — the 41-point spread INSIDE "skilled"
  (average 48.5% vs top 89.5%) is the story. Report: `_agents/muse/deliveries/best-value-n1000/`
  on council/muse.
- **P-263 cluster question — REOPENED, do not tune against either cluster.**
  The N=100 sanity check reproduces VL exactly (skilled 38/3, greedy 90/20),
  NOT the OR/VLOC/Beam cluster (53/11). The evidence now splits 2 (VL + MUSE,
  38/3) vs 3 (OR/VLOC/Beam, 53/11). The harness is deterministic within each
  cluster and the dataset PIN verifies, so the difference is NOT explained.
  The N=300 anchor (47%/6%) comes from the OR/VLOC/Beam cluster and needs
  re-examination. No tuning against either cluster until the council pins down
  WHY they differ (prime suspects: user-slot handling, the exact command, which
  policies were run together, data/engine stamps). Task 2 below is that job.
- **PARITY — Owner ruling 2026-11-05 (Q7).** He does NOT want a flat league.
  The engine's win-SD target (win-SD = standard deviation of team wins across
  the league in a season) is HIGHER than real NFL: clear losers for the user
  to beat up on and at least 3 other top teams for skilled users to compete
  against, whatever best fits the skilled-success percentages (90/35/25 +
  P(20-0) 1–2%). The DS band (3.07 ± 0.35) is the real-NFL REFERENCE, not the
  engine target. The Lab DERIVES the engine's win-SD target from the
  skilled-success percentages, then finds a lever that moves win-SD toward it.
  The CPU-draft lever (midFloor) is FLAT — do not re-propose it. Difficulty
  tiers (Easy/Normal/Hard per sport) are a SEPARATE P3 future item (P-274):
  they change how hard the game is for the user, not the league's spread.
  Do NOT build them now.
- **P-254 sync-conflict — Owner APPROVED 2026-11-05 (Q4).** Per-slot
  last-write-wins on the WHOLE save, never a field merge; the losing lineage is
  kept on disk as a rung-back; a fork is resolved as "keep both" at the slot
  level; additive `deviceId` field now so v1.1 never unfreezes the envelope.
  The Architect implements the mechanics; Z.ai incorporates the behavior into
  the envelope freeze.
- **OLD-SHELL DELETION — Owner APPROVED 2026-11-05 (Q9), with the safety net.**
  Anchor = the LATEST wave before 76 Pancakes is finished — NOT w70. The
  anchor (bytes + md5) stays on gh-pages, BASELINES.md keeps the record, an
  archive tag holds the deleted files in git history. Deletion itself is timed
  at cutover and Architect-led — NOT in any current prompt. Naming: convert
  Colors naming to 76 / Pancakes / both where it makes sense.
- **OWNER-HANDLED — do not route, do not re-file.** The Fix-It Board (Q3) and
  the cinematic intents (Q6: post-draft cinematic P-155, playoff cinematics
  P-164, floating key-player cards P-109) are being handled by the Owner
  himself. They die with the retirements unless he says otherwise.
- **TELEMETRY (Q8) — Owner deferred; MUSE decision.** The N1 telemetry
  headline carries its context inline: "100% median unique-catch on first
  reviews", so it cannot be quoted without the caveat.
- **ENGINE STATE:** origin/architect/engine-and-seats, HEAD 425f72a. Test count
  SETTLED: 284 pass, 0 fail (clean re-run at 425f72a, exact `npm test`).
  Contracts shipped at 551af1b (envelope, saver, AppState/Action). Outcome Lab
  landed at colors/tools/outcomelab/. Vite verified.
- **ROLES ARE HATS, not titles (Owner directive 2026-11-05):** tooling
  maintainer, calibration lead, exhibit editor — any seat may wear one for a
  task, none is permanent, and no chain of action may include a mandatory step
  depending on a specific person doing it. If your design only works when a
  named person does a step, it is not a design yet — say what happens if
  nobody does.
- **STANDING RULES:** no ratings generation (Kosi does that himself, later).
  Only the Architect builds product code. Work is never assigned to a named
  agent — it comes from _agents/PRIORITIES.md. Labels on every claim:
  VERIFIED / REPORTED / INFERRED / UNKNOWN. Only VERIFIED hides items.

## IN FLIGHT — DO NOT DUPLICATE

Before taking any item, read the latest MUSE bulletin entry. Already filed and
in progress: P-262 sweep-bands patch proposal (inbox + `_agents/muse/deliveries/P-262-sweep.ts`
on council/muse, full 440-season verification run — home win PASS in all modes,
Finding 1 withdrawn on evidence; parity FAIL stands; Beam reviewed it ok on
council/beam, commit 87815213). P-263 calibration-protocol draft (inbox) —
NOTE: the draft states the OLD 80/25/10 targets, the OLD "top30" term, and the
OLD cluster picture (4-seat cluster vs ASK); the P-263 row now carries the
corrections (90/35/25 + P(20-0) 1–2%, "skilled", 2-vs-3 cluster), to be
applied when it lands. Review these when they land; do not start parallel
copies. Beam already built D1 (ratings validator, 1,941 rows PASS) and E3
(council telemetry, 571 reviews / 19 seats) — their P-rows (P-264, P-266) are
review-and-integrate, not build. Check his bulletins before touching them.

## 1. REVIEW

Work the queue via `node tools/next.mjs` (or `tools/council.mjs` v8 derived
queue; if the docs disagree, say so in your bulletin entry, do not guess).
Risk-tiered depth: contracts/engine ≥ 2 reviews with a command receipt; UI 1
review; docs 0 (trivial tier). A review you can do beats new work in the same
tier. No seat reviews the same item twice. P-262/P-263 proposals are ready for
review. Open items needing takers: P-254 through P-261, P-265, P-267 through
P-273.

## 2. VERIFICATION — Q10: REPRODUCE Z.AI'S LAB NUMBERS (new, headline task)

The council is directed to run all the same tests and confirm Z.ai's numbers —
independent verification, separate from the MUSE seat's best-value run (which
measured a NEW policy, not a reproduction). Same base (425f72a), same seed
scheme (seeds 1000+i, paired policies), same dataset/engine stamps
(PIN_DATA / PIN_ENGINE — recompute them; if either differs, the numbers are
from different worlds, say so, do not compare directly).

(a) Baseline N=1000: greedy / skilled / favorites playoff, SB, title rates
and mean wins. Z.ai's published numbers: greedy 89.5/33.0/21.6, skilled
48.5/7.1/3.0, favorites 17.4/2.0/0.7. Confirm or reject, with the exact
command and the paired differences.
(b) MidFloor ladder: re-run the lever sweep (midFloor 10 / 14 / 18). Z.ai
found it FLAT (48.5% / 46.7% / 44.2%, within noise). Confirm or reject.
(c) The P-263 cluster question: reproduce BOTH clusters (VL+MUSE 38/3 and
OR/VLOC/Beam 53/11 at N=100) and pin down WHY they differ. Check, in order:
the exact command and argv each cluster used; which policies were run
together in one invocation; user-slot handling (slot is randomized per draft
— name whether each run fixed it, seeded it, or averaged it); dataset and
engine stamps at the time of each run. The clusters are internally exact, so
this is a configuration difference, not noise. Do NOT tune against either
cluster until this is resolved. Record the resolution in the P-263 protocol
draft when it lands (with the target + "skilled" corrections above).
(d) P-259/P-260 (Z.ai w73 findings F1–F10) and P-261 (DATA-LICENSE.md) still
need reviewers.
(e) Corrections from the last review round, filed as inbox notes: VL —
appstate.ts DOES exist at colors/src/sports/nfl/app/appstate.ts (you checked
colors/src/app/, the wrong path); the dual-pair finding stands. OR + Beam —
the retire batch was 84 items, not 12; check numbers before writing VERIFIED.
(f) When you cite a wave file as the anchor, follow the latest-wave rule
above and show the listing command + output.

## 3. TOOLS

In your own lane, filed as inbox items for Architect integration into tools/
(do not edit tools/ directly). Priorities: Dev2 determinism replay harness
({seed, action log} → regression test); T1 cutover verification script (prove
the queue survived the move intact); contract:check (VL's spec: 700 scale,
nearest 5, floor 5, error ≤ 2.5 per slot); bands.json + sweep reader;
evidence-pack generator; decision-ledger generator; save-envelope conformance
tester + storage dump harness; shell-deletion analysis (T2 — anchor on the
LATEST wave, per the Q9 ruling above). New from the target change: the sweep
needs a perfect-season counter (P(20-0)) — propose it as a snippet (count
seasons with 20 wins, 0 losses per policy; Beam's condition, council/beam
87815213: regular-season 17-0 plus all three playoff wins) or fold it into
the bands.json work.

## 4. N1 EXHIBIT — REVIEW THE DRAFTS

Z.ai's w74/02 N1 drafts (six-file exhibit, decision ledger, council telemetry,
calibration chart) are drafts until the council reviews them. Review against:
role names (Architect, Executor, Councillor — not seat names); the 20-0 story
as color (the product was built as 20-0, renamed to 76 Pancakes on Owner
decision 2026-11-05 — the rename is part of the narrative); the telemetry
headline carries its context inline per the Q8 decision above ("100% median
unique-catch on first reviews"). File the review in your inbox.

## 5. COUNCIL-HOME DISCUSSION — RE-READ ROUND (still open)

It is open (bulletin 20261105-1804-muse.md). Every seat that answered must
fetch the current council/muse branch, read the actual bulletin, and confirm
or revise its answer in its inbox, stating the fetch was done. Status: Beam
did the re-read properly and confirmed Option A (move whole into the fresh
repo). OR and VL have NOT done their re-reads. Note the label collision: OR's
"Option A" (stay on council/base) is the bulletin's Option C, while Beam's
"Option A" (move whole) is the bulletin's Option A. New answers: file in your
inbox, note in your bulletin entry. The cutover cannot be executed until this
is answered: which option, what moves vs freezes, timing vs cutover, in-flight
work, seat branches, N1 preservation, who does the move, and what proves the
queue survived intact.

## DELIVERABLES

Inbox: one file per item, inbox/<UTC>-<seat>-<slug>.md on your own branch,
first line SPEAKER: … | TASK: …, FOR: <P-ID> where applicable. Bulletin: one
entry per session with RESULT: lines (command + key output) for every test you
ran. Receipts: every change ships with the command and its output. The MUSE
seat is monitoring and encouraging council work (Owner directive 2026-11-05)
— a nudge from MUSE is an invitation to open queue work, never an assignment.
