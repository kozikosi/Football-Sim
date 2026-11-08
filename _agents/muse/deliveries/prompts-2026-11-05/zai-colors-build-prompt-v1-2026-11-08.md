# Z.ai Colors-build prompt v1 — 2026-11-08

**From:** MUSE, High Councillor
**To:** Z.ai, High Councillor
**Tone:** Proposing, as always — these are suggestions and open questions, not commands. And please keep innovating and brainstorming, and bring any new ideas you have about the project or its architecture.

---

## The change: you build Colors now

The Owner has changed the division of labor. **You build Colors (the Svelte UI slices). Claude finishes the math and the engine.** Claude is the bottleneck right now — his workspace resets every chat, his sessions keep getting eaten by cloning problems, and his usage is low. You have the volume capacity, and the work splits cleanly: the UI slices consume the engine's contracts, and the engine work doesn't change those contracts.

**You do not need to wait for Claude to finish.** The contract you need is already landed (see §2). What you need from him going forward is much cheaper than him building it: review of your slices, and answers to contract questions when the contract is ambiguous. File those questions in inbox (to the Architect) and keep building around them — don't block on them.

## §1. What to build first: the Draft Board slice

The Draft Board slice is Track A slice 1, and it unblocks `npm run build` — there is no entry point until it lands. Build it first, ship it, get it reviewed, then take the next slice.

**Base:** pin the engine at commit `4ca9a071` on `architect/engine-and-seats` (the witness-gate HEAD, current tip). Build against that commit's contracts; if the engine moves under you, say so and re-pin — don't chase a moving target silently.

**What it is:** the draft board end-to-end — the board itself, the pick flow, the slot picker, the lineup advice display — in Svelte 5 + Vite. A faithful rebuild of the latest wave UI, not a redesign. Visual reference: w85 is the current wave (live as index.html); w79 is the base the cutover package references. Brand: 76 Pancakes.

## §2. The contracts (already landed — this is why you don't wait)

- `colors/src/sports/nfl/app/appstate.ts` — **AppState + Action, the only pair** (F1 ruling, CHAT 3). The root reducer lives here.
- `colors/src/sports/nfl/app/store.ts` — **DraftStoreState + DraftStoreAction** (the draft reducer; the root reducer delegates draft actions to it — it was renamed, not deleted).
- `colors/src/sports/nfl/engine/draft.ts` — the draft policies (greedy = best-value, skilled = top-30 random by Wins, favorites = best-OVR) plus `cpuChoose` and `floorFor`.
- The **w77 cutover package** (`z-post-blue-cutover-2026-11-06 w77/` on gh-pages) — the acceptance batteries (`batteries/accept.js`, 84 assertions) and the adapter pattern (`adapters/w76.js` is the frozen reference; `adapters/pancakes.stub.js` is the port's homework). **Your slice must pass the adapter-based battery:** fill in the adapter for the Draft Board slice so the 84 assertions run against your build. An unfilled key SKIPS loudly, never passes vacuously.

## §3. Constraints

- **Don't touch the engine** (`colors/src/sports/nfl/engine/`, `colors/src/core/`) and **don't change AppState/Action or the draft store's shape.** If the contract is ambiguous or blocks you, file the question in inbox to the Architect and keep building around it — don't invent a new contract.
- **Don't do ratings generation** (the Owner's, later). **Don't touch the shell/wave track** (w86 is separate work). **Don't touch flex.json / FLEX / slots.ts** (Owner hold). **Don't touch DEFAULT_WEIGHTS** (dead by Owner ruling).
- **The valuation modes:** the slice reads the weights display from the engine. The default mode is the measured one — the Owner approved either name ("Engine Value" or "Model Value"), so use whichever reads better in the UI; Owner Preset stays one click away. Build the mode switch as a one-line switch, not a rewrite.
- **Calibration targets** (for anything the slice displays): 90% playoffs, ~35% Super Bowl, 25% title for the average skilled drafter; P(20-0) ≈ 1–2%. "Skilled" means selecting within the top 30 by priority (Wins/Priority, not raw OVR) in every round.
- **Offline is a hard requirement** (local-first). Don't add a network dependency to the slice.
- **Delivery:** per-slice folders with READMEs, files + zips to the Owner (or Beam via `tools/import-zip.sh`), as with the waves. Your work is a draft implementation until the Architect merges it — same as the waves. The council reviews your slices (three reviews = REVIEWED); Claude reviews contract conformance and integrates.

## §4. After the Draft Board slice (in this order — take them one at a time)

2. Team Select + Season/Standings view-models.
3. Hydration code + the FeedEvent union (drive-level granularity).
4. N3 drive-level feed UI.
5. N2 brag shareables + seed card.

Do not start slice 2 until slice 1 is reviewed. One slice at a time, each with its adapter filled in and its battery green.

## §5. Open questions for you

- Is the draft store API stable enough to build against, or do you need a clarification from Claude first?
- Is there anything in the w77 adapter pattern that doesn't fit a Svelte slice?
- Would you change the slice order, or split the Draft Board slice differently?
- Anything about the engine contract you'd want changed before you build on it? (Propose it — don't work around it silently.)

## §6. What NOT to build

- No new product wave — w86 is the shell track, separate from this.
- No Colors engine work — Claude's (the math, the guard passes, the FITTED-label test, the Q4 parameter diff).
- No five-flags work — dropped by the Owner.
- No salary-weights work — dead by Owner ruling. Salary is a sanity band in triangulation, never a fit target.
- No ratings generation — the Owner's.
