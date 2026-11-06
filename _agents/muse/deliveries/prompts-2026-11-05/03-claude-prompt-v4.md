# CLAUDE PROMPT v4 — 76 PANCAKES BUILD (TWO CHATS: ONE SMALL SEND-NOW, ONE HELD ROADMAP)

Owner decisions 2026-11-05. This supersedes the v3 Claude prompt in full — do
not follow v3 where it differs. The v3 Claude prompt was too elaborate for one
chat: your last two sessions burned on bootstrap and timed out before doing
anything. So this rewrite is split into TWO chats. Send CHAT 1 now. Hold
CHAT 2 until CHAT 1 lands. One work package per chat; report the hash after
each item.

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
  RETIRED — use "skilled" everywhere.
- **CALIBRATION TARGETS (refined 2026-11-05, supersedes 80/25/10):** for the
  average skilled drafter, 90% playoffs, ~35% Super Bowl appearance, 25%
  title. New target: going 20-0 (a perfect season: 17-0 + 3 playoff wins)
  should be about 1–2% possible for a skilled player. This answers your
  calibration-defaults question (551af1b §8): the defaults are now 90/35/25 +
  P(20-0) 1–2%. Current measured state: N=300 anchor skilled = 47% playoffs /
  6% title — but see the cluster note below; do not tune against it yet.
- **Best-value — measured 2026-11-05 (MUSE, N=1000, VERIFIED).** A drafter who
  takes #1 by priority every round — the TOP of the skilled class — measures
  89.5% playoffs / 33.0% SB / 21.6% title / 11.43 mean wins. That is IDENTICAL
  to the `greedy` policy on every metric: `greedy` sorts by Wins and takes #1,
  with OVR only as a tiebreak (`draft.ts:140`), so the "naive best-OVR" label
  is WRONG. The policy that actually takes best OVR is `favorites`
  (17.4% / 2.0% / 0.7%). The skilled average is 48.5% / 7.1% / 3.0%. The top
  of the class already sits at target — the 41-point spread INSIDE "skilled"
  (average 48.5% vs top 89.5%) is the story.
- **P-263 cluster question — REOPENED, do not tune against either cluster.**
  The N=100 sanity check reproduces VL exactly (skilled 38/3, greedy 90/20),
  NOT the OR/VLOC/Beam cluster (53/11). The evidence now splits 2 (VL + MUSE,
  38/3) vs 3 (OR/VLOC/Beam, 53/11). The harness is deterministic within each
  cluster and the dataset PIN verifies, so the difference is NOT explained.
  The N=300 anchor (47%/6%) comes from the OR/VLOC/Beam cluster and needs
  re-examination. The council is pinning down why the clusters differ (Q10).
- **PARITY — Owner ruling 2026-11-05 (Q7).** He does NOT want a flat league.
  The engine's win-SD target (win-SD = standard deviation of team wins across
  the league in a season) is HIGHER than real NFL: clear losers for the user
  to beat up on and at least 3 other top teams for skilled users to compete
  against — at least 2 in the opposite conference and at least 1 in the user's
  conference (Owner refinement 2026-11-05) — whatever best fits the
  skilled-success percentages (90/35/25 + P(20-0) 1–2%). The DS band (3.07 ± 0.35) is the real-NFL REFERENCE, not the
  engine target. The Lab DERIVES the engine's win-SD target from the
  skilled-success percentages. Difficulty tiers (Easy/Normal/Hard per sport)
  are a SEPARATE P3 future item (P-274) — do NOT build them now.
- **P-254 sync-conflict — Owner APPROVED 2026-11-05 (Q4).** Per-slot
  last-write-wins on the WHOLE save, never a field merge; the losing lineage is
  kept on disk as a rung-back; a fork is resolved as "keep both" at the slot
  level; additive `deviceId` field now so v1.1 never unfreezes the envelope.
  You implement the mechanics (field name, mint location, rung-back storage).
- **OLD-SHELL DELETION — Owner APPROVED 2026-11-05 (Q9), with the safety net.**
  Anchor = the LATEST wave before 76 Pancakes is finished — NOT w70. The
  anchor (bytes + md5) stays on gh-pages, BASELINES.md keeps the record, an
  archive tag holds the deleted files in git history. Deletion itself is timed
  at cutover and Architect-led — NOT in any current prompt. Naming: convert
  Colors naming to 76 / Pancakes / both where it makes sense (you own the code
  naming; Z.ai uses it in new work; not a blanket rename of existing code).
- **OWNER-HANDLED — do not route, do not re-file.** The Fix-It Board (Q3) and
  the cinematic intents (Q6: post-draft cinematic P-155, playoff cinematics
  P-164, floating key-player cards P-109) are being handled by the Owner
  himself.
- **ENGINE STATE:** HEAD 425f72a. Test count SETTLED: 284 pass, 0 fail (clean
  re-run at 425f72a, exact `npm test` — your 284 is verified). Outcome Lab
  landed. Vite verified.
- **STANDING RULES:** you are the sole implementer of product code. No ratings
  generation (Kosi does that himself, later). Labels on every claim: VERIFIED
  / REPORTED / INFERRED / UNKNOWN.

## COLD START — READ THIS FIRST (applies to both chats)

Your workspace resets every chat — confirmed: the clone did not exist at
/home/claude/football-sim in the starter chat, and you stopped as instructed.
The continuity fix has landed (acc6a44, VERIFIED by the MUSE seat): the
Project 00-READ-FIRST is now a 40-line boot doc; NOW.md + HANDOFF.md are
merged into one `claude/NOW.md` (15 lines). Every chat starts from a FRESH
CLONE: clone, read the 40-line boot doc, pull, work. Do NOT re-run the old
bootstrap (no digest by default, no re-reading governance docs for a small
package). If the clone is gone, re-clone — the authorization is granted — and
say so in one line. Push after every item and report the hash; that is what
protects the work if the machine wipes again. One chat = one work package;
before ending a chat, rewrite `claude/NOW.md` with the current state and next
action, keep it under 60 lines.

================================================================================
CHAT 1 — SEND NOW. Small package, three items. Work them in order, report the
hash after each. Do NOT load this chat with build work.
================================================================================

1. LAND P-262 (reviewed, ready). The proposal is at
   `inbox/20261105-2113-muse-P-262-sweep-bands-patch.md` with the patched file
   at `_agents/muse/deliveries/P-262-sweep.ts` — both on origin/council/muse,
   fetch them. Beam reviewed it ok (`inbox/20261105-2137-beam-P-262-review.md`
   on origin/council/beam, commit 87815213): exactly the 7 hunks, no stray
   changes. It applies DS's re-derived bands to sweep.ts (home 54.0% ± 2.5pp,
   parity 3.07 ± 0.35 as the real-NFL REFERENCE, ≤4 wins 4.6) and withdraws
   the Finding 1 FAIL. Replace colors/tools/outcomelab/sweep.ts with the
   patched file, run a small-N smoke check to confirm it runs, push, report
   the hash. Do not decide the two flagged decision points (≤4-wins centre 4.6
   vs 4.5; home-win kept report-only) — leave them as the proposal states.
   NOTE: the parity band you land here is the reference band. The engine's own
   win-SD target is a separate Lab derivation (Owner ruling Q7) — landing this
   patch does not set it.

2. ADD colors/tsconfig.json AND RUN tsc. Review Z.ai's w74/04 draft — do not
   write the config from scratch. Land the config, run the check, report the
   result: pass, or the errors if it fails. If it fails, report the errors
   only — do not fix them in this chat.

3. CLEANUPS (one line each, all approved — do them, do not re-litigate).
   (a) Move the repo-root V22-Suggestions.md (324K, frozen history, zero
   PRIORITIES.md rows cite it) INTACT to _archive/v22-suggestions.md. Do not
   split it, do not rewrite it — its value is as evidence.
   (b) Fix the Figma line: Figma is NOT available (Owner — paywall). AGENTS.md
   saying it is available is wrong — correct it.
   (c) Fix the boot-doc line: "Only Claude builds Football-Sim-*.html" is
   incorrect — reword to "Only the Architect builds the product."
   Push, report the hash. The AGENTS.md split (28KB) waits until after P-262
   + tsconfig land — not this chat.

Context you need (do not go re-read docs for the rest): brand is 76 Pancakes,
banner "76", "20-0" as a season record stays. The full build order (Chat 2
below) is held for the next chats — this chat is two small landings plus
cleanups only. P-263 (calibration protocol) lands in a later chat, not this
one.

================================================================================
CHAT 2 — HELD. Do NOT send until CHAT 1 lands. The roadmap for the following
chats, a few items at a time — do not paste this whole chat at once.
================================================================================

TRACK A — SLICES (build order; the slices do NOT depend on the contract gaps,
so do not sequence them against Track B)

Slice 1 — Draft Board slice, end-to-end, FIRST: it is the entry point; `npm
run build` fails on clean checkout until it lands (expected, by design).
boardVM exists; add the Svelte screen + Playwright check. Check the slice
against the LATEST wave file (follow the rule above), not a fixed wave number.
If pattern ambiguity is too deep, stop and list the blocking ambiguities
instead of guessing.
Slice 2 — Team Select + Season/Standings view models. Draft, flag pattern
guesses, do not invent engine facts in the view layer.
Slice 3 — Hydration code + FeedEvent union (granularity: 'drive'). Your stated
hydration rule (trust stored ratings, scores, schedule, plan, prevRank,
homeField, userTeam, seed/year/run, nextWeek; re-derive table, seeding,
bracket, champion, fixtures, gameSeed check; scores not fitting
schedule/nextWeek = corrupt, never repair) — now write the code.
Slice 4 — N3 drive-level feed UI. Drive-level feed freezes now; play-by-play
deferred. Do not reference w69's game-feed implementation as a model.
Slice 5 — N2 brag shareables renderer + seed card + seed-share URL (?w=…),
all in 76 Pancakes branding, banner 76. Seed-share UX per the Owner's Q2
answer: seeds stored in the user's profile; clicking a seed pops it up; NOT
shareable at end of season like the brag share.

BRAND APPLICATION (inside the slices, not a standalone pass)
Inventory every "20-0" in product-facing surfaces first (title, headers,
banners, shareables text, seed-share copy, save-key prefix — store.ts SAVE_KEY
'20-0:draft' and siblings), then rename inside the slice that owns each
screen, so each rename is reviewed with its slice. Historical docs are NOT in
scope. Save keys: you pick the new prefix (proposed '76pancakes:'); old
'20-0:' keys are orphaned by design — no migration, no repair path, never
imply a cleared-data recovery path. The banner becomes "76". "Can you go
20-0?" copy stays — it is about the season record.

TRACK B — GAPS TO CLOSE

- Answer the three envelope discrepancy questions (why saveId/createdAt now vs
  Z.ai deferring to v1.1; why no datasetId vs Z.ai adding it now; why SHA-256
  vs dataVersion + canonicalization spec) + the P-254 sync-conflict MECHANICS
  (Owner approved the behavior in Q4: per-slot last-write-wins on the whole
  save, rung-back, keep-both on fork, additive deviceId now — you decide the
  field name, where the deviceId is minted, and how the rung-back is stored).
- F1–F10 rulings (Z.ai w73, P-259/P-260): dual AppState/Action pairs (store.ts
  vs appstate.ts — the file is at colors/src/sports/nfl/app/appstate.ts),
  season-review payload home, enumeration, dataset-changed notice, and the
  five small fixes F5–F10 (which may be applied as drafted; the F5 ruling —
  document vs freeze role tables per save — is yours). F1 unblocks the pattern
  freeze: rule it first.
- StorageModule enumeration (keys/entries); 'dataset-changed' notice needs a
  producing action or removal; WeekPayload/SeasonPayload stat-book gap (no
  player stat book, no awards, no unit grades — seasonAwards exists but has no
  caller).
- DatasetLoader: real loader for data/madden27-ratings.csv (1,941 players,
  tracked, unmodified). No fictional fallback — the slice boots via the
  no-dataset state (manual import) instead (Owner answer Q5). The synthetic
  pool is a fake in the repo for public readers; do NOT test with it.
- P-263: a protocol draft is filed for you
  (inbox/20261105-2113-muse-P-263-calibration-protocol.md) — NOTE: it states
  the OLD 80/25/10 targets, the OLD "top30" term, and the OLD cluster picture;
  apply the corrections when you land it (new targets 90/35/25 + P(20-0)
  1–2%, "skilled" definition, 2-vs-3 cluster now REOPENED — the protocol must
  state the cluster question is unresolved and that nothing tunes against
  either cluster until the council resolves it). Beam's corrected §5 text is
  in his P-263 review (inbox/20261105-2137-beam-P-263-review.md on
  origin/council/beam, commit 87815213).
- BUILD-1+2 patch: review and apply-or-reject the filed patch
  (inbox/20261104-0430-muse-BUILD-1-2-patch.md +
  _agents/muse/deliveries/council-discussion-reasons.patch, 67 lines, on
  council/muse). Note: the cited commit c385cb12 IS empty (verified) — the
  citation was wrong and is withdrawn; the patch itself is reviewable and
  still open.
- Pick one CI-gate design from the four answers (OR N=100, Beam PR N=40 +
  nightly N=100, VL N=100 + sweep, VLOC N=300) and state the pick against the
  NEW targets (90/35/25 + P(20-0) 1–2%). OR's rationale (N=100 is the smallest
  N where the three policies separate) and GLM/DS's N=1000 (needed for tight
  bands) are different jobs — separation vs precision — and can coexist.
- Small fixes from VL's review: draftBoard.ts still emits `alsoFits` and
  offers a 'Value here' sort (both ruled out by the Owner); drives.ts:249
  still has a "sudden death" comment.
- Record the Owner's skilled definition in the repo and rename the policy
  identifier in code when landing the Lab work ("top30" → "skilled").

DELIVERABLES. Push to architect/engine-and-seats; report the commit hash.
Each slice: build → tests pass → Playwright check → review (contracts 2+, UI
1) → integrate. If a slice blocks, say so in one line and move to the next
track.
