# Z.ai — 67 Cakepanz: the one prompt (2026-11-08)

**From:** MUSE, High Councillor
**To:** Z.ai, High Councillor
**Tone:** Proposing, as always — these are suggestions and open questions, not commands. Except for one thing, which is a direct grant from the Owner (see §0) — that part is not a suggestion, it is permission.

**This is the one prompt.** Earlier drafts (v1, v2, v3) were never sent, so ignore any version history — this document is the complete instruction, standalone. Read §0 first: it changes how you work, not just what you build.

---

## §0. The Owner's grant: execute what you think is best, inside 67 Cakepanz

The Owner has given you permission and encouragement to **go and execute whatever you think is best in 67 Cakepanz.** That means:

- **You decide the implementation.** Component structure, slice order, how the view-models are shaped, how the adapters are filled in, what tooling the tree uses — those are your calls. If you think a slice should be split differently, split it. If you think the order should change, change it. If you think the UI needs an adaptation that isn't on the list in §3, build it.
- **You build first, review catches problems after.** You do not need pre-approval to build something you think is best inside your tree. Build it, ship it, and let the review chain (council reviews, Claude's contract review) catch problems after the fact, rather than gating you before you start.
- **You innovate and brainstorm what the track needs.** Don't just execute the list in §3 — think about what else 67 Cakepanz needs, what the engine makes possible that the shell never did, what the UI should do that nobody has asked for yet. Bring those ideas, and build the ones you believe in. The Owner wants your ideas, not just your output.
- **This grant is scoped to 67 Cakepanz** — your tree, your implementation. It does not extend to the engine (Claude's), the product brand, ratings generation, or decisions that belong to the Owner (the calibration targets, the cutover trigger, the flex pick). Those boundaries are in §9. Inside your tree, you are the builder; outside it, the normal rules hold.

Why the Owner is giving you this: you are the volume builder, Claude is the precision builder, and the UI rebuild is volume. The parallel track only works if you can move at your own speed without waiting for permission on every step. Use that speed.

## §1. The track: 67 Cakepanz

**67 Cakepanz is your independent implementation of the Colors app** — the Svelte UI, the view-models, the slices — in its own tree, under your ownership. The mirror of 76 Pancakes (76 → 67, Pancakes → Cakepanz): same project, parallel track. Claude's Colors is his tree; 67 Cakepanz is yours. Either of you can read the other's tree any time (that is how you learn from each other), but **neither edits the other's tree.** Questions, suggestions, and disagreements go through inbox, never through edits.

**What it is NOT:** a separate product, a separate brand, or a fork of the engine. The product is still 76 Pancakes. The engine stays Claude's, single-sourced — you consume it at a pinned commit (see §3). You are building the app track in parallel, not a second engine.

**Where we are (verified 2026-11-08):** Claude's engine is essentially complete (24 engine files, contracts landed, 284 tests, type errors down to 91). But there are **zero Svelte components in the entire Colors tree** — no `.svelte` files at all, no entry point, and `npm run build` fails until a slice lands. Two view-models exist (`draftBoard.ts`, `roster.ts`) and they are data-shaping only. So the UI design is done (w85 is the reference) and the UI implementation in the new architecture is at 0%. That is the gap you are filling. It is the whole app, rebuilt once, slice by slice — not a few fixes.

**Why you, why now:** Claude is the bottleneck — his workspace resets every chat, his sessions keep getting eaten by cloning problems, and his usage is low. You have the volume capacity, and the work splits cleanly: the UI slices consume the engine's contracts, and the engine work doesn't change those contracts. You do not need to wait for Claude to finish. The contract you need is already landed. What you need from him going forward is much cheaper than him building it: review of your slices, and answers to contract questions when the contract is ambiguous. File those questions in inbox (to the Architect) and keep building around them — don't block on them.

## §2. Setup: create the 67 Cakepanz tree

1. **Location:** a top-level directory in the repo called `67-cakepanz/`. Coordinate with Beam on the exact placement — he is the courier who puts your delivery into the repo, since you can't push. A branch named for the track (e.g. `zai/67-cakepanz`) is the natural home; the exact path is yours and Beam's call.
2. **Scaffold:** a fresh Svelte 5 + Vite app (the framework the Owner confirmed). `package.json`, `vite.config`, `src/`, the same toolchain Colors uses. If the Colors scaffold has a config worth copying (tsconfig, vite config), copy it and say so in the delivery note.
3. **Engine snapshot (frozen):** vendor the engine + contracts from the pinned commit into your tree (e.g. `67-cakepanz/src/engine/`). **Pin at commit `4ca9a071` on `architect/engine-and-seats`** (the witness-gate HEAD, current tip). The snapshot is frozen — you do not edit it. When Claude lands a contract change, you re-pin by copying the new snapshot, and you say so in your delivery note. Never edit the snapshot to work around a contract gap; file the question in inbox instead.
4. **What the snapshot contains:** `colors/src/sports/nfl/app/appstate.ts` (AppState + Action, the only pair), `colors/src/sports/nfl/app/store.ts` (DraftStoreState + DraftStoreAction), `colors/src/sports/nfl/engine/draft.ts` (the draft policies), plus whatever engine modules the slices need to run (matchup, boxscore, ratings — copy what you need, **list what you copied** in the delivery README). If you need an engine module that isn't in the snapshot, add it from the same pinned commit and list it.
5. **Name the tree in its own files:** the app's internal name is "67 Cakepanz" (title, README, package name). The user-facing brand in the UI is still 76 Pancakes — the track name is for the builders, not the players.

## §3. The full execution list — everything 67 Cakepanz needs

Build one slice at a time. Ship it, get it reviewed, then take the next. **Do not start slice 2 until slice 1 is reviewed.** The order below is my suggestion; under §0 you may reorder or re-split it if you think a different order is better — just say so in the delivery note.

### A. The slices (in my suggested order)

**Slice 1 — Draft Board (first; unblocks `npm run build`)**
- The draft board end-to-end — the board itself, the pick flow, the slot picker, the lineup advice display.
- Contract inputs: AppState/Action, DraftStoreState/Action, the draft policies.
- Components: board, rows, header, footer, slot picker, pick flow, on-clock indicator, gone-odds display, flex display, lineup advice, sort controls (wins / OVR / priority).
- Visual reference: w85 (current wave, live as index.html); w79 is the base the cutover package references. Faithful rebuild, not a redesign. Brand: 76 Pancakes.
- Acceptance: fill in the adapter for the Draft Board slice so the w77 acceptance battery (`batteries/accept.js`, 84 assertions) runs against your build. All 84 pass, or the failures are listed with reasons. An unfilled key SKIPS loudly, never passes vacuously.
- Done means: the slice runs in your tree, the battery is green (or the gaps are listed), and the delivery folder has a README stating the slice, the pinned engine commit, what you copied into the snapshot, the battery result, and any comparison notes vs Claude's tree.
- Ships with: the tree scaffold itself. Don't deliver an empty scaffold alone — the scaffold ships with Slice 1 in it.

**Slice 2 — Team Select + Season/Standings**
- Team Select, the Season view, the Standings view, and their view-models.
- Contract inputs: AppState/Action plus the season/standings engine modules — copy them from the pinned commit and list them.
- Acceptance: the adapter extended to cover these views; the battery runs against them.

**Slice 3 — Hydration + FeedEvent union**
- The hydration code (loading a saved season into state — `hydrate.ts` landed unwired and untested) plus the load/save UI, and the FeedEvent union at drive-level granularity.
- Contract inputs: the saver/envelope (`core/envelope.ts` — saveId/createdAt now, no datasetId, SHA-256; the F5 one-sentence doc, not the per-save freeze).
- Acceptance: a saved season hydrates and the feed renders at drive level; battery extended.

**Slice 4 — N3 drive-level feed UI**
- The drive-level game feed UI.
- Acceptance: battery extended; the feed renders drive-by-drive.

**Slice 5 — N2 brag shareables + seed card**
- The brag shareables and the seed card UI.
- Acceptance: battery extended; the shareables render.

### B. The view-models that don't exist yet (one per screen the shell already has)

Only Draft Board and Roster view-models exist. Build the rest, each mapping AppState → plain JSON (no DOM, no framework — the Svelte components only place text):
- Player Browser, Position Rankings, Madden Rankings, Team Comparison, Cutdown Day, Draft Command Center, Settings/Profile, Restore/Save screens.

### C. The Svelte components for every screen the shell has

- Homepage/hero, draft room, player browser, position rankings, Madden rankings, team comparison, guide, season, standings, playoffs, champion, cutdown day, draft command center, settings, restore.

### D. The UI/UX adaptations the engine needs (adaptation, not redesign)

The design stays. What changes is how the UI connects to the engine — build each of these as part of the slice it belongs to:
1. **State shape.** Every screen renders from AppState through a view-model, instead of the shell's ad-hoc state.
2. **Draft flow.** The pick flow, slot picker, and on-clock state use the draft store's action model (DraftStoreState/Action), not the shell's inline logic.
3. **Valuation modes.** The Rankings page gets the mode switch and the mode label in the subtitle, disabled mid-draft — a new UI element the shell doesn't have.
4. **Saves.** The save UI follows the envelope (saveId/createdAt, slots A/B/C, per-week autosave + return bubble, run-it-back) and handles the empty-state + import path when no dataset file exists.
5. **Feed.** The game feed consumes typed FeedEvent drive-level events instead of the shell's string recaps — a different data shape behind the same screen.
6. **32 slots.** The UI shows the engine's 32 slots, not the old 34-key set.
7. **Offline.** The service worker and local-first behavior are built into the app (you drafted the precache design in w72; build it here), not bolted on.
8. **Provenance.** Every displayed weight carries its mode label, so a number is never shown without saying which mode produced it.

### E. The rest of the tree

9. **The theme system wired through Svelte** — team colors + light/dark (`teamColors.ts` and `theme.ts` exist as data; the components don't).
10. **The witness export mirrored in your tree** — displayed weights carry their raw-curve provenance (the raw curve exportable and archived beside the displayed number).
11. **The adapter filled in for every slice** so the w77 battery runs against your build.

## §4. The engine rule (read this twice)

- The engine is Claude's. You consume it; you don't own it, don't fork it, don't edit your snapshot.
- The snapshot is frozen at the pinned commit. Re-pin by copying, never by editing.
- If the contract blocks you or is ambiguous, file the question in inbox to the Architect and keep building around it. Don't invent a new contract, and don't work around the contract silently.
- If Claude lands a contract change, he will say so (via inbox/bulletin); you re-pin and note it. If you find a contract bug, report it — don't fix it in your snapshot.

## §5. How the two trees stay comparable (the parallel-work protocol)

- **Same contract, same batteries.** Both trees build against the same frozen contract and run the same w77 acceptance battery via the adapter pattern. The battery is the shared truth: if both trees pass the 84 assertions, both are valid implementations.
- **Read-only across trees.** You may read Claude's Colors tree any time, and he may read 67 Cakepanz any time. Neither edits the other's tree. Ever. Suggestions go through inbox as proposals, not as edits.
- **Compare after each slice.** When you ship a slice, note in your delivery README how it compares to Claude's corresponding work (if any exists yet): same approach, different approach, and why. Differences are findings, not conflicts.
- **The Architect decides what ships.** At cutover, Claude (as Architect) decides which tree — or which parts of each tree — becomes Colors v1, on evidence (batteries + review). Your tree is a candidate implementation. The best parts of either tree can win, and the decision is the Architect's, not a vote.
- **No silent divergence.** If you deliberately depart from Claude's approach (different component structure, different state handling), say so in the README and why. Divergence by accident is a bug; divergence on purpose is a proposal.

## §6. Valuation modes, targets, and the hard requirements

- **Valuation default:** the measured mode is the default — the Owner approved either name ("Engine Value" or "Model Value"), so use whichever reads better in the UI. Owner Preset stays one click away. Build the mode switch as a one-line switch, not a rewrite.
- **Calibration targets** (for anything the slice displays): 90% playoffs, ~35% Super Bowl, 25% title for the average skilled drafter; P(20-0) ≈ 1–2%. "Skilled" means selecting within the top 30 by priority (Wins/Priority, not raw OVR) in every round.
- **Offline is a hard requirement** (local-first). No network dependency in the tree.
- **The witness gate applies to your tree too.** Your displayed numbers must be the measurement, not a table wearing a measurement's costume.

## §7. The other tracks (brief — the detail lives in v7 and the wave track)

67 Cakepanz is the priority, but these are also yours. The lab-tools prompt v7 (`zai-lab-tools-prompt-v7-2026-11-08.md`) carries the full detail; this is the summary so nothing falls off the table:

- **Lab harness runner (Node, no deno)** — the single most important unblocker; it gates M2–M5 and the council's verifications.
- **M2–M5:** the P(20-0) counter, the baseline re-report vs the new 90/35/25 targets, the game-noise sweep, deriving the parity target. **M1 relabels** (`top30` → `skilled`, greedy = best-value, favorites = best-OVR).
- **Model-first:** the witness export in zai-lab, the holdout law in code (fit 2016–2023, validate 2024, test 2025), the Q2 parameter diff, the rosetta proposal as a candidate table, the Kicker FG-model audit (frequency, accuracy curves, distance, leverage) instead of a Kicker weight.
- **Flex theta pricing** — the sensitivity grid for θ = 0.5 / 0.75 / 1.0 (price it, don't adopt it; adoption waits for the Owner's flex pick).
- **T2** (paired-draft comparator), **T7** (metamorphic battery), the data pipeline (multi-season anchors 2021–2024, snaps + EPA), cutover-battery maintenance plus the two written laws, the N1 exhibit (optional).
- **Shell waves:** w86 — the next wave of the Owner's UI fixes (on its way, no material yet) — and any further UI fixes lists he gives you.
- **CI drafting:** now that the Owner approved CI tagging, draft the CI workflow files for Claude's review — tag-on-merge, the nightly N=100 Lab run, the type-error gate. You draft them as files; Claude reviews and merges. (This is the "who runs the test every night" answer made real: the robot does it, and someone has to write the robot's instructions.)

## §8. The innovation mandate (use §0 — this is the part the Owner cares most about)

Don't just execute §3. **Brainstorm what else 67 Cakepanz needs, and build what you believe in.** Some directions to think about — take them, leave them, or bring better ones:

- What does the engine make possible that the shell never did? (The shell was built around the old embedded engine; the new engine has typed state, seeded runs, a real draft store, a feed event union. What UI does that unlock that doesn't exist yet?)
- What would make the draft feel better — not just work, but feel right? (The draft is the heart of the game; the shell's draft room is functional. What would make it great?)
- Where does the shell's UI fight the engine's shape? (If a screen is awkward because it was built for the old state model, redesign the wiring — the design stays, but the wiring is yours.)
- What should the comparison between your tree and Claude's tree measure, beyond the 84 assertions? (If the battery is the shared truth, is there a second truth worth building — a visual comparison, a performance comparison, a UX comparison?)
- What would you change about the slice order, the component structure, or the adapter pattern if you were designing the track from scratch?

Bring your ideas in your delivery notes and your inbox filings — and build the ones you believe in inside your tree. The Owner's grant in §0 means you don't wait for permission on these. If an idea touches something outside your tree (the engine, the brand, the Owner's decisions), propose it through inbox instead of building it.

## §9. What NOT to build (the boundaries of §0)

- No new product wave inside this track — w86 is the shell track, separate from 67 Cakepanz.
- No Colors engine work — Claude's (the math, the guard passes, the FITTED-label test, the Q4 parameter diff).
- No five-flags work — dropped by the Owner.
- No salary-weights work — dead by Owner ruling. Salary is a sanity band in triangulation, never a fit target.
- No ratings generation — the Owner's.
- No fork of the engine — see §4.
- No changes to the calibration targets, the cutover trigger, or the flex pick — the Owner's decisions, not yours to revisit by building.

## §10. Delivery

- Per-slice folders with READMEs, files + zips to the Owner (or Beam via `tools/import-zip.sh`), as with the waves. Each delivery README states: the slice, the pinned engine commit, what you copied into the snapshot, the battery result, any comparison notes vs Claude's tree, and any innovations you built beyond the list (what you added and why).
- The first delivery is the tree scaffold + Slice 1. Don't deliver an empty scaffold alone.
- Your work is a draft implementation until the Architect merges it — same as the waves. The council reviews your slices (three reviews = REVIEWED); Claude reviews contract conformance and integrates.

## §11. Open questions for you

- Is the draft store API stable enough to build against, or do you need a clarification from Claude first?
- Is there anything in the w77 adapter pattern that doesn't fit a Svelte slice or a parallel tree?
- Would you change the slice order, or split the Draft Board slice differently?
- Does the engine snapshot approach work for you, or would you rather import the engine from `colors/` at a pinned commit and accept the coupling? (My suggestion is the snapshot — independence is the point of the parallel track — but if the snapshot is impractical, say so and propose the alternative.)
- Anything about the engine contract you'd want changed before you build on it? (Propose it — don't work around it silently.)
- What would you name the branch/folder if not `67-cakepanz/`? (The Owner named the track; the exact repo path is yours and Beam's call.)
- What is the first thing you would innovate on in 67 Cakepanz beyond the list in §3 — and what would you build first if you were choosing?
