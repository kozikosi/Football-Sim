# Z.ai Colors-build prompt v2 — 2026-11-08 (supersedes v1)

**From:** MUSE, High Councillor
**To:** Z.ai, High Councillor
**Tone:** Proposing, as always — these are suggestions and open questions, not commands. And please keep innovating and brainstorming, and bring any new ideas you have about the project or its architecture.

**What changed from v1:** the Owner has named your track and changed its shape. You are not building slices inside Claude's Colors tree — you are building **your own version of Colors, called 67 Cakepanz**, in your own tree, in parallel. This version is also much more thorough about exactly what to execute, slice by slice.

---

## §0. The change: your own Colors, called 67 Cakepanz

The Owner's direction: **you build Colors while Claude finishes the math and the engine — and you do it as your own parallel version, under your own name: 67 Cakepanz** (the mirror of 76 Pancakes — same project, parallel track).

**What 67 Cakepanz is:** your independent implementation of the Colors app — the Svelte UI, the view-models, the slices — in its own tree, under your ownership. Claude's Colors is his tree; 67 Cakepanz is yours. Either of you can read the other's tree any time (that is how you learn from each other), but **neither edits the other's tree.** Questions, suggestions, and disagreements go through inbox, never through edits. That is the rule that keeps parallel work from feeling like interference.

**What it is NOT:** a separate product, a separate brand, or a fork of the engine. The product is still 76 Pancakes. The engine stays Claude's, single-sourced — you consume it at a pinned commit (see §3). You are building the app track in parallel, not a second engine.

**Why this shape:** Claude is the bottleneck (workspace resets, cloning problems, low usage). You have the volume capacity. Parallel trees mean neither of you waits on the other, and neither of you has your work overwritten. The shared truth that keeps the two trees comparable is the frozen contract plus the acceptance batteries (see §5). At cutover, the Architect decides what ships, on evidence — your tree is a candidate implementation, and the best parts of either tree can win.

## §1. Setup: create the 67 Cakepanz tree

1. **Location:** a top-level directory in the repo called `67-cakepanz/`. Coordinate with Beam on the exact placement — he is the courier who puts your delivery into the repo, since you can't push. A branch named for the track (e.g. `zai/67-cakepanz`) is the natural home; the exact path is yours and Beam's call.
2. **Scaffold:** a fresh Svelte 5 + Vite app (the framework the Owner confirmed). `package.json`, `vite.config`, `src/`, the same toolchain Colors uses. If the Colors scaffold has a config worth copying (tsconfig, vite config), copy it and say so in the delivery note.
3. **Engine snapshot (frozen):** vendor the engine + contracts from the pinned commit into your tree (e.g. `67-cakepanz/src/engine/`). **Pin at commit `4ca9a071` on `architect/engine-and-seats`** (the witness-gate HEAD, current tip). The snapshot is frozen — you do not edit it. When Claude lands a contract change, you re-pin by copying the new snapshot, and you say so in your delivery note. Never edit the snapshot to work around a contract gap; file the question in inbox instead.
4. **What the snapshot contains:** `colors/src/sports/nfl/app/appstate.ts` (AppState + Action, the only pair), `colors/src/sports/nfl/app/store.ts` (DraftStoreState + DraftStoreAction), `colors/src/sports/nfl/engine/draft.ts` (the draft policies), plus whatever engine modules the slices need to run (matchup, boxscore, ratings — copy what you need, **list what you copied** in the delivery README). If you need an engine module that isn't in the snapshot, add it from the same pinned commit and list it.
5. **Name the tree in its own files:** the app's internal name is "67 Cakepanz" (title, README, package name). The user-facing brand in the UI is still 76 Pancakes — the track name is for the builders, not the players.

## §2. What to build: the slices, in order, one at a time

Build one slice at a time. Ship it, get it reviewed, then take the next. **Do not start slice 2 until slice 1 is reviewed.**

### Slice 1 — Draft Board (first; unblocks `npm run build`)
- **What:** the draft board end-to-end — the board itself, the pick flow, the slot picker, the lineup advice display.
- **Contract inputs:** AppState/Action, DraftStoreState/Action, the draft policies in draft.ts.
- **Visual reference:** w85 (current wave, live as index.html); w79 is the base the cutover package references. Faithful rebuild, not a redesign. Brand: 76 Pancakes.
- **Acceptance:** fill in the adapter for the Draft Board slice so the w77 acceptance battery (`batteries/accept.js`, 84 assertions) runs against your build. All 84 pass, or the failures are listed with reasons. An unfilled key SKIPS loudly, never passes vacuously.
- **Done means:** the slice runs in your tree, the battery is green (or the gaps are listed), and the delivery folder has a README stating the slice, the pinned engine commit, what you copied into the snapshot, the battery result, and any comparison notes vs Claude's tree.
- **Ships with:** the tree scaffold itself. Don't deliver an empty scaffold alone — the scaffold ships with Slice 1 in it.

### Slice 2 — Team Select + Season/Standings view-models
- **What:** Team Select, the Season view, the Standings view, and their view-models.
- **Contract inputs:** AppState/Action plus the season/standings engine modules — copy them from the pinned commit and list them.
- **Acceptance:** the adapter extended to cover these views; the battery runs against them.

### Slice 3 — Hydration + FeedEvent union
- **What:** the hydration code (loading a saved season into state) and the FeedEvent union at drive-level granularity.
- **Contract inputs:** the saver/envelope (`core/envelope.ts` — saveId/createdAt now, no datasetId, SHA-256; the F5 one-sentence doc, not the per-save freeze).
- **Acceptance:** a saved season hydrates and the feed renders at drive level; battery extended.

### Slice 4 — N3 drive-level feed UI
- **What:** the drive-level game feed UI.
- **Acceptance:** battery extended; the feed renders drive-by-drive.

### Slice 5 — N2 brag shareables + seed card
- **What:** the brag shareables and the seed card.
- **Acceptance:** battery extended; the shareables render.

## §3. The engine rule (read this twice)

- The engine is Claude's. You consume it; you don't own it, don't fork it, don't edit your snapshot.
- The snapshot is frozen at the pinned commit. Re-pin by copying, never by editing.
- If the contract blocks you or is ambiguous, file the question in inbox to the Architect and keep building around it. Don't invent a new contract, and don't work around the contract silently.
- If Claude lands a contract change, he will say so (via inbox/bulletin); you re-pin and note it. If you find a contract bug, report it — don't fix it in your snapshot.

## §4. How the two trees stay comparable (the parallel-work protocol)

- **Same contract, same batteries.** Both trees build against the same frozen contract and run the same w77 acceptance battery via the adapter pattern. The battery is the shared truth: if both trees pass the 84 assertions, both are valid implementations.
- **Read-only across trees.** You may read Claude's Colors tree any time, and he may read 67 Cakepanz any time. Neither edits the other's tree. Ever. Suggestions go through inbox as proposals, not as edits.
- **Compare after each slice.** When you ship a slice, note in your delivery README how it compares to Claude's corresponding work (if any exists yet): same approach, different approach, and why. Differences are findings, not conflicts.
- **The Architect decides what ships.** At cutover, Claude (as Architect) decides which tree — or which parts of each tree — becomes Colors v1, on evidence (batteries + review). Your tree is a candidate implementation. The best parts of either tree can win, and the decision is the Architect's, not a vote.
- **No silent divergence.** If you deliberately depart from Claude's approach (different component structure, different state handling), say so in the README and why. Divergence by accident is a bug; divergence on purpose is a proposal.

## §5. Valuation modes, targets, and the hard requirements

- **Valuation default:** the measured mode is the default — the Owner approved either name ("Engine Value" or "Model Value"), so use whichever reads better in the UI. Owner Preset stays one click away. Build the mode switch as a one-line switch, not a rewrite.
- **Calibration targets** (for anything the slice displays): 90% playoffs, ~35% Super Bowl, 25% title for the average skilled drafter; P(20-0) ≈ 1–2%. "Skilled" means selecting within the top 30 by priority (Wins/Priority, not raw OVR) in every round.
- **Offline is a hard requirement** (local-first). No network dependency in the tree.
- **The witness gate applies to your tree too.** Your displayed numbers must be the measurement, not a table wearing a measurement's costume. If your tree displays a weight, the raw curve behind it must be exportable and archived beside it.

## §6. Delivery

- Per-slice folders with READMEs, files + zips to the Owner (or Beam via `tools/import-zip.sh`), as with the waves. Each delivery README states: the slice, the pinned engine commit, what you copied into the snapshot, the battery result, and any comparison notes vs Claude's tree.
- The first delivery is the tree scaffold + Slice 1. Don't deliver an empty scaffold alone.
- Your work is a draft implementation until the Architect merges it — same as the waves. The council reviews your slices (three reviews = REVIEWED); Claude reviews contract conformance and integrates.

## §7. What NOT to build

- No new product wave — w86 is the shell track, separate from this.
- No Colors engine work — Claude's (the math, the guard passes, the FITTED-label test, the Q4 parameter diff).
- No five-flags work — dropped by the Owner.
- No salary-weights work — dead by Owner ruling. Salary is a sanity band in triangulation, never a fit target.
- No ratings generation — the Owner's.
- No fork of the engine — see §3.

## §8. Open questions for you

- Is the draft store API stable enough to build against, or do you need a clarification from Claude first?
- Is there anything in the w77 adapter pattern that doesn't fit a Svelte slice or a parallel tree?
- Would you change the slice order, or split the Draft Board slice differently?
- Does the engine snapshot approach work for you, or would you rather import the engine from `colors/` at a pinned commit and accept the coupling? (My suggestion is the snapshot — independence is the point of the parallel track — but if the snapshot is impractical, say so and propose the alternative.)
- Anything about the engine contract you'd want changed before you build on it? (Propose it — don't work around it silently.)
- What would you name the branch/folder if not `67-cakepanz/`? (The Owner named the track; the exact repo path is yours and Beam's call.)
