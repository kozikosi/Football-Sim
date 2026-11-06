# Z.AI PROMPT v4 — w75: 76 PANCAKES BUILD (NEW TARGETS, OWNER ANSWERS, NOISE SWEEP)

Owner decisions 2026-11-05. This supersedes the v3 Z.ai prompt in full — do
not follow v3 where it differs. Read the whole prompt before starting
anything. Define every project-specific term where you use it; do not assume
the reader knows a term from another seat's work.

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
  in your w74 FINDINGS doc is WRONG — correct it. The policy that actually
  takes best OVR is `favorites` (17.4% / 2.0% / 0.7%). The skilled average is
  48.5% / 7.1% / 3.0%. The top of the class already sits at target — the
  41-point spread INSIDE "skilled" (average 48.5% vs top 89.5%) is the story.
  Report: `_agents/muse/deliveries/best-value-n1000/` on council/muse.
- **P-263 cluster question — REOPENED, do not tune against either cluster.**
  The N=100 sanity check reproduces VL exactly (skilled 38/3, greedy 90/20),
  NOT the OR/VLOC/Beam cluster (53/11). The evidence now splits 2 (VL + MUSE,
  38/3) vs 3 (OR/VLOC/Beam, 53/11). The harness is deterministic within each
  cluster and the dataset PIN verifies, so the difference is NOT explained.
  The N=300 anchor (47%/6%) comes from the OR/VLOC/Beam cluster and needs
  re-examination. Measure and report; do NOT tune the engine against a
  disputed anchor. The council is pinning down why the clusters differ (Q10).
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
  Incorporate this behavior into the envelope freeze. The Architect implements
  the mechanics (field name, mint location, rung-back storage).
- **OLD-SHELL DELETION — Owner APPROVED 2026-11-05 (Q9), with the safety net.**
  Anchor = the LATEST wave before 76 Pancakes is finished — NOT w70. The
  anchor (bytes + md5) stays on gh-pages, BASELINES.md keeps the record, an
  archive tag holds the deleted files in git history. Deletion itself is timed
  at cutover and Architect-led. Naming: convert Colors naming to 76 /
  Pancakes / both where it makes sense in new work; not a blanket rename of
  existing code.
- **OWNER-HANDLED — do not route, do not re-file.** The Fix-It Board (Q3) and
  the cinematic intents (Q6: post-draft cinematic P-155, playoff cinematics
  P-164, floating key-player cards P-109) are being handled by the Owner
  himself.
- **ENGINE STATE:** origin/architect/engine-and-seats, HEAD 425f72a. Test count
  SETTLED: 284 pass, 0 fail (clean re-run at 425f72a, exact `npm test`).
  Contracts shipped at 551af1b (envelope, saver, AppState/Action). Outcome Lab
  landed at colors/tools/outcomelab/. Vite verified.
- **STANDING RULES:** no ratings generation (Kosi does that himself, later).
  Only the Architect builds product code; you deliver drafts. Labels on every
  claim: VERIFIED / REPORTED / INFERRED / UNKNOWN.

## YOU ARE ALREADY IN FLIGHT — CONTINUE, DO NOT RESTART

Your package (w74 review, N1 drafts, Lab + calibration, code drafts)
continues. Check your latest delivery first — if any item below has already
landed in a file/zip you sent, do not redo it. The items below are the deltas
and the open work.

## 1. LAB — RENAME, RE-REPORT, PERFECT-SEASON COUNTER

Rename the `top30` policy to `skilled` in the Lab code, docs, and reports;
document that the policy measures the average of the class and the targets
apply to that average. Re-report the baseline curve against the NEW targets
(90/35/25 + P(20-0) 1–2%) using the pinned definition. Add a perfect-season
counter to the sweep (count seasons with 20 wins, 0 losses per policy;
regular-season 17-0 plus all three playoff wins — Beam's condition,
council/beam 87815213) so P(20-0) is measured, not asserted. Fix the
best-value/greedy label in the FINDINGS doc: `greedy` IS best-value (always #1
by priority); `favorites` is the best-OVR policy. Run the second pre-registered
follow-up from w74 (non-semantics). P-262's bands (DS: home 54.0% ± 2.5pp,
parity 3.07 ± 0.35 as the real-NFL reference, ≤4 wins 4.6) are the Lab's
reference bands — the engine parity target is derived separately (item 3).

## 2. LAB — NOISE SWEEP (Owner approved, Q1 — pre-registered)

Run the game-noise sweep: noiseMax 0.75 / 1.5, skilled policy only, N=500 per
rung. Pre-register before running: the change (noiseMax rung), the metric
(skilled-average playoff / SB / title / P(20-0) rates), the success threshold,
and the seeds. This is the only pre-registered path to lifting the average
toward 90% — but note the reframe from the best-value measurement: the
question is no longer "can the engine hit 90%?" (the top of the class already
does). It is "can the average be lifted there, or is the 41-point spread
inside 'skilled' just what skill looks like?" Report the response curve, not
just one point.

## 3. LAB — PARITY: DERIVE THE TARGET, FIND A LEVER (Owner ruling, Q7)

Derive the engine's win-SD target from the skilled-success percentages
(90/35/25 + P(20-0) 1–2%), then find a lever that moves win-SD toward it.
The CPU-draft lever (midFloor) is FLAT (10→48.5%, 14→46.7%, 18→44.2%, within
noise) — do not re-propose it; propose a different lever and show its response
curve. State the derived target explicitly and show how it was derived; the
3.07 ± 0.35 band is the real-NFL reference, not the target.

## 4. SEED-SHARE UX + SYNTHETIC POOL + TELEMETRY (Owner answers Q2, Q5, Q8)

- **Seed-share (Q2):** keep the seedshare.ts mechanism, change the UX. Seeds
  are stored in the user's profile; clicking a specific seed pops the feature
  up. It is NOT shareable at end of season like the brag share. Rework the
  share surface accordingly.
- **Synthetic dev pool (Q5):** it is NOT a dev/test fixture — do NOT test with
  it. Its role is as a fake in the repo so a public-repo reader sees fake
  ratings. The slice boots via the DatasetLoader's no-dataset state (manual
  import) for actual dev/testing. Repurpose devPool accordingly.
- **Telemetry (Q8):** the N1 telemetry headline carries its context inline:
  "100% median unique-catch on first reviews", so it cannot be quoted without
  the caveat.

## 5. BRAND DELTA + STALE REFERENCES + TEST COUNTS

- N1 drafts: apply 76 Pancakes (title, headers, brand story — built as 20-0,
  renamed to 76 Pancakes on Owner decision 2026-11-05; the rename is part of
  the narrative). The banner in every mock-up and draft becomes "76". N2 brag
  shareables renderer: 76 Pancakes branding, banner 76. Logo/wordmark concept:
  #76 + pancake motif, rose/gold/white, static, no NFL trademarks.
  "Can you go 20-0?" copy is about the season record and STAYS. N1 stays
  draft until the council reviews it.
- Fix every stale target reference (80/25/10 → 90/35/25 + P(20-0) 1–2%) in
  the live docs.
- Reconcile the test counts: your message said 288, TSC-REPORT/Beam says 286,
  the repo suite is 284. State which is right and why they differed.

## 6. w74 SECOND ARCHITECTURE REVIEW

Review Claude's 551af1b contracts against the LATEST wave file (follow the
latest-wave rule — list gh-pages and use the highest w-number with a product
HTML, do not assume w70): hydration rule completeness, F11 fallback
(fictional vs real-names ruling — now settled: real names, no fictional
fallback; the slice boots via the DatasetLoader no-dataset state), missing
tsconfig, FeedEvent/SW/scope-risk, debt split (Claude 31/7/5 vs your 36/2/5),
test-runner call, delete-old-shell position (now: deletion APPROVED in
principle with the latest-wave anchor; the P-273 analysis anchors on the
latest wave). Twelve findings format as before; flag decision points for
Claude, do not rule them yourself.

## 7. BUILD-1+2 PATCH REVIEW

Review the filed patch itself: `inbox/20261104-0430-muse-BUILD-1-2-patch.md` +
`_agents/muse/deliveries/council-discussion-reasons.patch` (67 lines) on
council/muse. Two corrections to the record: commit c385cb12 IS empty (MUSE
independently verified: no file changes) — the citation was wrong and is
withdrawn; but `tools/council.mjs` DOES exist on the architect branch. Status:
filed as a proposal, never implemented, still open awaiting the Architect.
Say whether the patch is correct as written.

## 8. CODE DRAFTS (unchanged from your package, plus the approved items)

tsconfig + run `tsc` (your w74/04 draft — Claude lands it, review the draft,
do not rewrite from scratch); F5–F10 applied as patched files; F1/F3 draft
implementations with decision points flagged (F1 unblocks the pattern freeze —
your G-VM1…11 flags wait on Claude's F1 ruling; do not guess the pattern);
FeedEvent union (granularity: 'drive'); hydration code draft; DatasetLoader
no-dataset state (empty state + import path, not a silent fictional league);
storage dump harness; envelope freeze mechanics incorporating the APPROVED
P-254 behavior (item above); P-251 patched files; P-257 wording; DATASET.md
provenance draft. View models + screens: Team Select + Season/Standings VMs
(draft, flag pattern guesses), Draft Board slice end-to-end with Playwright
check (stop and list blocking ambiguities if pattern ambiguity is too deep —
and check the slice against the LATEST wave file, per the rule above), N3
drive-level feed UI, seed card, seed-share URL (?w=…), read-only save sharing,
accessibility boot-time state read. Offline/SW drafts: service worker per your
w72 §3, airplane-mode Playwright test, cache-coherence version-floor refusal.
Tooling/CI: bundle budget 150 KB gzip check, runes lint enforcement,
evidence-pack script, contract:check script, CONTRACT-CONFLICT append-only
channel, seven Playwright acceptance criteria ported from shell batteries,
determinism bug-report harness.

## DO-NOT-START

Ratings generation. F1–F4 rulings themselves (draft implementations allowed,
rulings are Claude's). Old-shell deletion itself (the P-273 analysis is the
work; deletion is timed at cutover). Difficulty tiers P-274. The Fix-It Board
(Owner handling). Cinematic re-file (Owner handling). Do NOT test with the
synthetic pool.

## DELIVERY

You cannot push — files/zips, one folder per item named e.g. `01-w74-review/`,
each with changed files at repo paths + README stating what it is, which
branch/paths it applies to, and decisions needing ruling. If an item blocks,
say so in one line and move on.
