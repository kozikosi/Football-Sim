**PROMPT — Z.ai · 67 Cakepanz · "build the complete shell, neutral, ready for the engine"**

## Who this is for

The **Z.ai** seat: the 67 Cakepanz track — the UI/UX shell of the football draft simulator ("76 Pancakes"). You build the shell. The Architect (Claude) builds the engine. When he is done with the engine, he merges it into your shell. Your job is to make that merge easy: a complete, beautiful shell that the engine drops into through a clean seam.

## The ruling that governs this round

The Owner has ruled: **TypeScript-neutral until the last second.** The framework pick (Vue 3 vs Svelte 5) happens at cutover, not now. Build the shell in **plain TypeScript** — no framework lock-in, no framework-specific features that would make the shell hard to port. The measurement is settled: for you, Vue and Svelte build at the same pace (the evidence is a wash — every measured proxy is a tie), so the framework is not the bottleneck and it does not choose itself. Do not let the project files choose it for you either: the fresh-start repos' house rules say "Svelte 5 project" and prescribe a `.svelte.ts` class bridge, but nothing in the actual product is Svelte — Colors has zero `.svelte` files and no buildable product. That wording is framing, not evidence. Build neutral. The shell you deliver must be portable to either framework at cutover, or to plain TypeScript as-is.

## What you may touch

- Your own Cakepanz tree and deliveries (`_agents/zai/deliveries/…`, the 67 Cakepanz gh-pages deployment).
- The shared layer (`seasonVM`, `weekVM`, `tokens`) and the design tokens (`tokens-w89.ts/css`, `zpb-team-colors.json`) — these are framework-neutral by design and already byte-identical across both fresh-start arms.
- New files in **your** lane: `_agents/zai/inbox/…`, `_agents/zai/deliveries/…`.
- **§5 patch proposals** to the Architect for anything that lives in `colors/` or the engine.

## What you may not touch

`colors/` (the Architect's), the engine, `flex.json`, `design.json`, the product HTML, another seat's bytes, `AGENTS.md` / `PROJECT-KNOWLEDGE.md` / the queue. You do not edit the engine to make a test pass; you file the change. You do not work on ratings (the Owner generates them himself, later). You do not decide Owner questions (targets, cutover trigger, flex pick, the framework pick).

## What you may not claim

- A gate passed without its **output pasted in full** (stdout **and** exit code).
- A number you did not measure yourself. If it is someone else's, label it `REPORTED` and name them.
- A screen that works without a receipt showing it working (a screenshot hash, a battery run, or a probe — not prose).
- A shell that is "ready for the engine" without the seam document (Step 3) that says exactly how the engine drops in.

## The goal

A **complete UI/UX shell** for 67 Cakepanz: every screen and flow the product needs, built in plain TypeScript, beautiful in both light and dark modes like w89, offline-first, booting from vanilla file://, consuming the engine as a frozen snapshot through a single documented seam — so that when the Architect is done with the engine, he merges it into your shell without rebuilding the UI.

---

## Step 0 — Inventory what exists, then build what is missing

Find the latest Cakepanz state (the `67-cakepanz-s5` delivery on council/inkling, the `67-cakepanz-s3-s4-rev2` delivery on council/ernie, the gh-pages deployment) and list, in the delivery note, what is built and what is missing. Re-pin the shell to the current engine pin (`d3bd81d2`) if it is behind — the shell consumes the engine as a frozen snapshot, and a stale snapshot is a stale shell. Do not rebuild what is already built and working; do not claim what you did not build.

## Step 1 — The engine seam (do this FIRST, before the screens)

Define the interface the shell uses to call the engine — the **consumption layer**. One module, one documented interface, that the whole shell goes through. It must cover everything the shell needs from the engine: starting a new draft (with a custom order), reading the board state, stepping the week, simulating the season, saving and loading. The shell consumes the engine as a frozen snapshot at the current pin (`d3bd81d2`). The shell must NOT contain engine logic and must NOT duplicate engine math (no re-implemented flex, no re-implemented slot values, no re-implemented draft order). If the shell needs a number the engine owns, it asks the engine through the seam. If the seam cannot express something the shell needs, that is a §5 proposal to the Architect — file it, do not work around it by copying engine code into the shell. The seam must be documented well enough that the Architect can swap the real engine in without touching a screen.

## Step 2 — The screens and flows (the remaining shell work)

Build every screen the product needs, in plain TypeScript, against the seam. Where a screen depends on an engine piece that is not finished yet, build the screen against the seam with a clearly-marked stand-in (labelled `STAND-IN`, with the real call it replaces named in a comment), and list every stand-in in the delivery note. Do not ship a stand-in as if it were real.

- **Team Select** — the user picks a team AND a draft position (slot 1–32), on the same screen, with the same look. This is a standing Owner requirement and the slice is not accepted until it does. Note the seam: the engine's `newDraft` already takes an `order` parameter (`colors/src/sports/nfl/engine/draft.ts`), so the engine supports a custom order. The app store's slot support is the Architect's piece (he has not built it yet). Build the picker against the engine's `order` parameter, define the save format for the chosen slot (the save must store it), and flag the store piece clearly in the delivery note as the Architect's.
- **The draft board** — the board, the lineup, and the user-facing values. The user sees ONLY Wins, Priority, and OVR. Display integers everywhere except Wins and Priority, which get one decimal. The board re-ranks by Priority when the offensive focus changes (focus is chosen pre-game and once at halftime; auto is the default); focus must NOT change any static value, including Wins.
- **The week stepper** — advance the season week by week. The facade idiom (one module-level slot + one facade object with getters) is the pattern from the fresh-start track; use it or its plain-TypeScript equivalent.
- **The season book** — the champion roster, the replayable playoff games, the standings. (The Rev 9 prototype is 43.8 KB gz — build it for real.)
- **The player cards** — you propose the format (the Owner left this to you). One card per player, beautiful, showing what matters (Wins, Priority, OVR, form arrow).
- **The live feed** — the play-by-play. Clutch (the final 5 minutes of the 4th quarter plus overtime) gets more narration. BIG penalties are shown (40+ yard pass interference, roughing the passer, facemask, unsportsmanlike conduct, roughing the kicker, intentional grounding, game-changing holding, any 15+ yard penalty). Routine penalties (holding, false start, offsides) are NOT modeled and NOT shown.
- **The stats table** — the advanced stats. Gravity and double-teams are formally measured and shown here (double-teams drawn, visible). Form is shown as a simple GREEN arrow (hot) or RED arrow (cold) — no emojis, no "HOT"/"cold" labels. OVR fluctuates by form (~5–6).
- **The settings form** — persistence across reload, verified.
- **The "my needs" sticky row** — which of your 32 slots are still open, clickable to filter, updating as you draft.
- **The gone-odds tooltip** — "between now and my next pick", hover explains the method in plain words.
- **Hydration and save** — load a saved season and restore the board state (team, picks, draft order, filters). Save = one blob + a version check; a version mismatch is reported, never silently accepted.
- **The palette, both modes** — light AND dark, beautiful in both, like w89. The team IS the palette: every team's color changes almost every aspect of the color palette in both modes (not a fixed skin with a team badge). The light gold2 AA failure (gold Cinzel on pale rose) and the w89 one-line dark `--text` fix are Owner questions — do NOT fix them yourself; flag them in the delivery note as awaiting the Owner's ruling.
- **Offline** — local-first, sync-on-reconnect. The fonts are bundled in the repo (Cinzel inlined as base64, ~54 KB — the brag-card pattern); the product must NOT load fonts from Google's servers.
- **File://** — the single-file discipline (strip-crossorigin + singlefile postbuild, the w89 pattern). The app boots from vanilla file:// with zero console errors and zero blocked requests.

## Step 3 — The handoff to the Architect (MERGE-README.md)

Write a document that tells the Architect exactly what to do to merge the engine into your shell: the seam module and its interface, the pinned engine snapshot, the save format (including the draft-position slot), what is a stand-in and what is real (with the real call each stand-in replaces), the order to merge in, and what you need from him (the store's slot support, anything else the seam cannot express). If the merge has a step that can fail, say how to tell it failed.

## Step 4 — Prove it

For every screen: a receipt showing it works (a battery run, a probe, or a screenshot hash — not prose). The battery must pass on vanilla file:// (single-file dist, zero console errors, zero blocked requests). The gates must pass (checksums, manifest, numerals). Every receipt carries a one-byte falsifier where a receipt can be faked (mutate one input byte in a throwaway copy and show the receipt's command fails). If a screen cannot be proven yet (because it waits on an engine piece), say so plainly and name the blocker — do not claim it.

## Delivery

You cannot push. **Complete ALL work before responding, and batch every completed piece into a single response (a single zip).** Do not respond with work outstanding — the only reason to respond with work outstanding is a blocker, and then you say what the blocker is. Push after every finished file does NOT apply to you (you cannot push); the one-zip rule governs. Include a feel journal: what was easy, what fought you, what you would change, and — since the framework question is now about you — which parts of the shell felt fastest to build in plain TypeScript and which parts made you miss a framework (name them specifically). Include the inventory from Step 0, the seam document, MERGE-README.md, and the delivery note.

## Innovation

You are the builder, and you decide the implementation inside 67 Cakepanz. If a screen can be better than the spec above, build it better and say why. If the seam can be cleaner, design it cleaner. If a flow is awkward, redesign it. If a piece of the shell is missing from Step 2, add it and say so. If a screen the product needs is not listed here, propose it and build it. Brainstorm, improve, create new ideas — the prompt tells you what to build, not how to think. The best idea wins, not the first one.
