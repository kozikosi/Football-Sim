SPEAKER: beam | ROLE: Council seat | TASK: Long prompt for absent council members — review, brainstorm, innovate (especially for Z.ai) | DATE: 2026-11-14T18:10Z
FOR: Absent council members (pickle, and any seat not currently active)

# Prompt for absent council members — review, brainstorm, innovate

You have been away. The project moved. This note catches you up and puts you to work. Work comes from one ranked list (`_agents/QUEUE.md` on `origin/council/muse`); run `node tools/council.mjs next` to find your next action. Nothing is assigned to a named seat. A review you can do beats new work in the same tier. Three confirmations by three different seats = REVIEWED ✓✓✓.

## 1. Where the project is (2026-11-14)

Product: **76 Pancakes** (NFL Draft Simulator). Framework: Svelte 5 + Vite (NOT a lock — Owner ruled 2026-11-12; four prototypes under test: SvelteKit, React, Vue/Nuxt, SolidStart). Colors v1 (`colors/` on architect/engine-and-seats) is the Architect's tree; cutover ships when fully functioning. Engine pin: `4ca9a071` (frozen snapshot all tracks consume). License MIT. Offline hard requirement.

Z.ai (Executor) shipped two deliveries today: `z open wave v3` (BENCH-2 product round + BENCH-1 errata, 256 files) and `zai-recovery-2026-11-14` (a3.json + 13 scripts + errata, 22 files). I reviewed both (verdicts: improved, then ok). Ernie reviewed both (improved, ok). Inkling reviewed the recovery (ok). The Owner relayed Ernie's six approvals for the Colors engine: TS port hold lifted, league-scale dial approved as direction, Title Odds approved post-cutover, chunked envelope approved, version-honesty check approved (not a weight pin), @types/node approved as dev dep, Node pin 24. No new gates. CI workflow files may be pushed (precedent in-repo).

Claude (Architect) produced plan v3: one dial (league scale) instead of twelve; portable math for cross-device identical replay; frozen snapshot per period with P-318 as swappable seam; recorded entries for all fluctuating ideas (including dead ones) plus eight candidate axes; science before port; safer (chunked) save shape now; Title Odds display metric (post-cutover); goneOdds engine cost ~1.2s/~8.9s at 6× (engine, not UI); pool 1,941+12=1,953 (1,921 on board unexplained); Ernie's playoff home-advantage 5.57 vs 1.78 may be a seeding artefact (hands off until strength-controlled).

## 2. Open queue items that need reviews (your contribution)

Highest value for an absent seat:
- P-322 (NEEDS-REVIEW, 0 done): per-role skill profile design (super's submission). I reviewed it (improved — 2 ILB↔OLB anchor misses). Needs 2 more reviews to reach REVIEWED.
- P-291 (NEEDS-REVIEW, 0 done): tree-comparison harness (Colors vs 67 Cakepanz).
- P-345 (NEEDS-REVIEW, 0 done): council innovation round on play-level engine.
- P-333 (NEEDS-REVIEW, 0 done): discuss the 3-4/4-3 gap and Option B — propose a different solution.
- P-339 (NEEDS-REVIEW, 0 done): center flex-out diagnostic.
- P-325 (NEEDS-REVIEW, 0 done): WR3 question + Colors/PreColors fidelity.
- P-204/205/206 (NEEDS-REVIEW, 2 done): Colors v1 real NFL FG accuracy, drive stats, OT rules.
- P-224 (NEEDS-REVIEW, 0 done): STANDING — invent new engine tests.
- P-287 (NEEDS-REVIEW, 5 done): review 67 Cakepanz slices 2–5 (already REVIEWED, further reviews welcome).
- P-310 (NEEDS-REVIEW, 1): flexeval rerun with cache fix.
- P-312 (NEEDS-REVIEW, 1): flex edge-case playtest.
- P-332 (NEEDS-REVIEW, 1): Option B cross-formation gap.
- P-344 (REVIEWED ✓✓✓): nflverse Phase 1 data — verify or use for Phase 1.

## 3. Brainstorm / innovate (especially for Z.ai)

The Owner wants ideas, exact code snippets, mock-ups, measurements — not product edits. File as inbox/<UTC>-<seat>-<ID>-<slug>.md per inbox/README.md. Label every claim VERIFIED/REPORTED/INFERRED/UNKNOWN.

Areas where fresh eyes help:
- **Dynamic engine.** The Owner's doctrine: weights illusory; dynamic formula; approximate realism; static binary not open for discussion; dial must fluctuate. Beam's 12 fluctuating items (slot values, flex prices, drive model params, home-field advantage, player ratings/form with form drifts ±5, group synergies, gravity/double-teams, calibration targets, game state/clutch, noise/variance, draft slot value, flex legality). Claude's one-dial (league scale) subsumes them as recorded entries. Cross-side stars (penalty -6, clutch/OT, "2-WAY"). Play-level engine (P-341). Contribute your own axes.
- **Framework.** Not locked. Z.ai's evidence: Svelte 5 vs Vue 3 tie on measured columns; Svelte runes fail loudly on engine-mutating wiring; Vue accepted silently at 4–5× tax. Your own prototype or measurement is welcome. Report evidence, don't rank.
- **67 Cakepanz.** Slices 2–5. Slice 2 needs a draft-position picker (P-317, blocked on Architect store change). Slice 3 hydration + board chrome. Your review of slices as they land is valuable.
- **Offline / tent-test.** Single-file build recipe exists (60 lines, Vite closeBundle hook). w89 has one external fetch (Google fonts @40528). Embed type to make offline work.
- **Neutrality holes A–C.** Planted .vue/.svelte/require()/ui/-exemption all pass the current gate. Can you find more? Canary plants.
- **goneOdds cost.** ≈9 s at ×6, both arms identical → engine, not UI. Bounded memoization? Replay-from-pick-1 cost at 1,941 rows?
- **Dataset.** 1,941 rows / 1,938 distinct / poolCount 1,953 / board 1,921. Reconcile.
- **Save schema.** Awards + user-pin are the two gaps. Chunked envelope approved. Contribute a schema proposal.
- **Cross-side stars.** Top WR defending a hail mary, getting an interception. Visual "2-WAY". Uses existing flex pricing.
- **Play-level engine.** Generate its own snap counts, stats, player value. Does it? (P-341.)
- **Title Odds.** Post-cutover display metric, header+recap only, derived from Wins, must agree with full simulation. Design input welcome.
- **Anything else.** The Owner wants innovation. File it.

## 4. How to contribute

1. `git fetch origin && git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md` (governance docs are stale in your worktree).
2. `node tools/preserve.mjs check` (report unsaved work).
3. Get the tool: `git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs && node ./.council_tool.mjs next`.
4. Take the top line you can do well. Work in `inbox/<UTC>-<seat>-<ID>-<slug>.md`.
5. Commit and push to `council/<seat>`. Verify with `git ls-remote`.
6. Delete `.council_tool.mjs` before push.
7. Run `_agents/END-OF-CHAT.md` when done.

## 5. Boundaries

- No assignment to named seats. Work from the queue.
- No product file or protected-constant edits (Architect only).
- Label every claim. No invented data.
- No force-push, no stash, no git add -A.
- Messages are files; one entry per session in bulletin/<UTC>-<seat>.md.

## 6. Suggested asks (one line each, for Claude)

1. P-318 status and order.
2. λ-axis Lab run (does the one dial reproduce the Owner's doctrine)?
3. Beam-vs-VL on λ's shape.
4. Display metric: Title Odds post-cutover?
5. Awards + user-pin in save schema before or after Phase 1?
6. Ratchet: ship vendorSha runner in the contract?
7. CI: report-only on Colors + @types/node + Node 24, or hold?

Innovate. Brainstorm. Review. The queue is long and the seats are few. Pick something and push it.
