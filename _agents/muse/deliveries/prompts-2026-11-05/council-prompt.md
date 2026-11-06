# Council prompt (rewritten from scratch, 2026-11-05)

Same text for every seat. Send via the standard council channel.

```
Shared context (read first — this is the current state, not a suggestion):
- Brand: "76 Pancakes" (Orlando Pace #76, pancake blocks). The banner is "76". "20-0" as a season record STAYS ("Can you go 20-0?" is about the record; the P(20-0) 1–2% target is about the record). "20-0" as brand/banner is GONE. Slogan: "Can you go x?" per sport. Fresh-repo name at cutover: proposed `76-pancakes` (Owner confirms at cutover; do not rename now). Naming: convert Colors naming to 76 / Pancakes / both where it makes sense (Claude owns the code naming; Z.ai uses it in new work).
- Framework: Svelte 5 + Vite, at base 425f72a. Data: real player names and real teams with non-EA ratings. Ratings generation is the Owner's alone, later — the council does not work on it.
- Calibration targets for skilled drafters: 90% playoffs, ~35% Super Bowl appearance, 25% title; going 20-0 about 1–2% possible. SKILLED (Owner definition, locked): a drafter who selects within the top 30 players ranked by priority (Wins/Priority, not raw OVR) in every draft round. It defines a class (always-#1 to always-#30); the targets apply to the AVERAGE skilled drafter. The term "top30" is retired — use "skilled" everywhere.
- Best-value (top of the skilled class), measured N=1000 VERIFIED: 89.5% playoffs / 33.0% SB / 21.6% title / 11.43 mean wins — IDENTICAL to greedy on every metric. Reason (draft.ts:140): greedy sorts by Wins and takes #1, OVR only as a tiebreak. The "naive best-OVR" label is WRONG; the policy that takes best OVR is `favorites`. The three Lab policies are best-value/greedy, skilled-average, favorites.
- Parity: the engine's win-SD target is HIGHER than real NFL (Owner ruling) — clear losers for the user to beat up on and at least 3 other top teams for skilled users to compete against, whatever best fits the skilled-success percentages. The DS band (3.07 ± 0.35) is the real-NFL REFERENCE, not the target. The Lab derives the target (Z.ai w75). Do not re-derive it here.
- Repo suite: 284 tests @ 425f72a (VERIFIED by clean re-run). Z.ai's 286/288 are worktree numbers. Figma is NOT available (paywall).
- P-254 sync-conflict is APPROVED (Owner): per-slot last-write-wins on the WHOLE save, never a field merge; losing lineage kept as a rung-back; fork resolved as "keep both" at the slot level; additive deviceId field now. Claude implements the mechanics.
- Old-shell deletion is APPROVED (Owner), timed at cutover, anchored on the LATEST wave before 76 Pancakes is finished (NOT w70), with an archive tag. Do not delete anything in this prompt.
- Kosi is handling the Fix-It Board and the cinematic intents (P-155/P-164/P-109) himself. Do not route or re-file either.
- Standing rules: never assign work to a named agent — work comes from `_agents/PRIORITIES.md` (run `node tools/council.mjs next` / `board`); continuous-trust reviews (no minimum/maximum checkmarks; no agent reviews the same item twice); file reviews with FOUND:/NEW: lines and a verdict (ok / improved / rejected); label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN; only the Architect builds the product and owns tools/council.mjs, AGENTS.md, CLAUDE.md, and PRIORITIES.md re-ranking; corrections: the cited commit c385cb12 is EMPTY (BUILD-1+2 was filed as a patch, never implemented); the council-home discussion is open (OR and VL still owe their re-reads).

Task 1 — Review w74 + reproduce the numbers.
- Review w74 (gh-pages 5a24fc3b, folder w74/, 105 files; read via `git show origin/gh-pages:w74/<path>` or the Pages URLs; the 10 zips are NOT on gh-pages — review from the tree). The README's rulings list is Claude's — review the work underneath, not the list. File one verdict per folder in inbox (SPEAKER/TASK header, FOR: w74/<folder>), ordered by consequence: (a) 03 Lab flat lever + skilled implementation, (b) 01 review F13–F16/F17, (c) 05 Draft Board slice draft + G-VM flags, (d) 04 tsconfig/contracts (drafts only — Claude lands), (e) 06 offline test + Vary diagnosis, (f) 02 N1 exhibit accuracy, (g) 08 proposals + 09 verification (P-254, P-258, DATASET.md, licensing).
- Reproduce Z.ai's numbers (Owner order, Q10): run the Lab baseline (N=1000, greedy/skilled/favorites) + the midFloor ladder, same base 425f72a, same seed scheme makeRng(1000+i), same commands. Confirm or reject each number; file the results in inbox.
- The P-263 cluster question: reproduce the N=100 skilled numbers and pin down WHY the clusters differ (2 vs 3 — VL + a MUSE run: 38/3; OR/VLOC/Beam: 53/11). Slot handling is the prime suspect (MIMO's point); also the exact argv and which policies were run together. File the finding in inbox. Do not tune against either cluster until the difference is pinned.

Task 2 — Tools / transition / infrastructure (from PRIORITIES.md).
- P-264–P-273: Dev2 determinism replay harness, T1 cutover verification, contract:check quantisation verifier, bands.json + sweep reader, evidence-pack generator, decision-ledger generator, envelope conformance tester + storage dump harness, shell-deletion analysis T2. P-264/P-266 are review+integrate of Beam's built D1 ratings validator + E3 council telemetry — review, don't rebuild. P-273's analysis anchors on the LATEST wave (not w70).
- Council-home re-read (OR and VL still owe it): the discussion is in bulletin 20261105-1804-muse.md — options A move whole into fresh repo, B separate council-meta repo, C carve-out in old repo, D rebuild fresh, E other. Re-read the bulletin, then answer in inbox.
- Queue hygiene: regularly sweep PRIORITIES.md for dead items → SUPERSEDED. Never retire multisport items (P-070).
- AGENTS.md split proposal: the Architect owns AGENTS.md — propose the split in a bulletin, don't edit it.
- Verify P-008's board state: GLM claims P-008 is REVIEWED via the 8-review soft cap. Check the board and confirm or correct it in inbox.
- The parity-target derivation is Z.ai's (w75) — do not re-derive it here; review his derivation when it lands.

Task 3 — Innovate.
- Propose new P2/P3 tools or measurements with one-line specs (file them as P-rows or inbox proposals). The three roles (tooling maintainer, calibration lead, exhibit editor) are hats any seat may wear for a task — no permanent titles, and no chain of action may include a mandatory step depending on a specific person performing it.
- File your work in inbox + one bulletin entry; commit and push your branch; review another seat's w74 verdicts where you can add a catch.
```
