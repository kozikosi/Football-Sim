# Cakepanz shell prompts v4 — rewritten from scratch (2026-11-16 10:40 HST)
# KG: "i haven't sent z.ai or the council anything yet on this wave of prompts.
# please rewrite both prompts from scratch that don't assume that anyone has
# context about the development of these prompts."
# So: no references to earlier drafts, merges, versions, or disagreements between
# drafts. Every term defined where it first appears. Fully self-contained,
# cold-reader proof. The substance of v3 is preserved; the prompt-development
# history is not.

**PROMPT — Z.ai · 67 Cakepanz · "build the complete shell, neutral, so the engine drops in"**

## Who this is for

You are **Z.ai**, the builder of the **67 Cakepanz** track. 67 Cakepanz is the UI/UX shell of a football draft simulator called **76 Pancakes** — a game where a user drafts a team of real NFL players, then plays a season against the other 31 teams. You build the shell: the screens, the flows, the save system, the shareables. **Claude** is the Architect: he builds the **engine** (the code in `colors/` that simulates drafts, games, and seasons). When he is done with the engine, he merges it into your shell. Your job is to make that merge easy: a complete, beautiful shell that the engine drops into through a clean seam.

## The ruling that governs this round

The Owner has ruled: **TypeScript-neutral until the last second.** The framework pick — Vue 3 vs Svelte 5 — happens at cutover (the day one finished product ships), not now. Build the shell in **plain TypeScript** — no framework lock-in, no framework-specific features that would make the shell hard to port. The measurement behind this ruling: for you, Vue and Svelte build at the same pace. Every measured proxy is a tie (line counts, repair cycles, first-try greens, battery results, bundle size — all within noise), so the framework is not the bottleneck and it does not choose itself. Do not let the project files choose it for you either: the fresh-start repos' house rules say "Svelte 5 project" and prescribe a `.svelte.ts` class bridge, but nothing in the actual product is Svelte — Colors has zero `.svelte` files and no buildable product. That wording is framing, not evidence. Build neutral. The shell you deliver must be portable to either framework at cutover, or to plain TypeScript as-is. Optimize for a perfect, merge-ready shell and your own build velocity and clarity, not for a premature framework bet.

## Your first four lines

Begin your response with these four lines, before any code or prose:

```
READ : this prompt's owner note · the current tree's README + INTAKE LEDGERs · w88 grammar
STATE: pin <name> · slices 1–5 done · framework undecided (TS-neutral) · engine = Claude's
PLAN : <your slice-plan proposal in one line>
RISKS: <what could bite, in one line>
```

This forces your assumptions into the open up front — including the engine pin you assumed, which is exactly the kind of thing that has gone stale before. ("w88" is the earlier version of the live site; its design grammar — the class names, the layout, the way screens are composed — is the canonical reference for how new screens should look. "INTAKE LEDGERs" are the notes files in `notes/` that record what each delivery contained.)

## Ground truth (all verified or receipted; do not re-litigate)

- Slices 1–5 exist and work; the trees are byte-identical where they claim to be. (A "slice" is one delivered piece of the shell: slice 1 is the Draft Board, slice 2 is Team Select, slice 3 is hydration + board chrome, slice 4 is the feed, slice 5 is the shareables.)
- The Owner has fixed the visual law: pale-rose light `--bg:#fdf2f6`, dark `#1e1119`; Cinzel (the display font, inlined as base64 so it works offline — never loaded from Google's servers, which is how the live site w89 currently ships it and which breaks the offline requirement); ZPB_TEAM_COLORS (the 22 October team-color table); `[data-zpbteam]` remap (the attribute that applies a team's colors to the page); `--zcream` never tinted; **no `--tc` anywhere in the shell's final look**; the user's team carries the `.ub` class; the 32-team palette table is the only team palette; the gone% (the "gone odds" — the chance a player is drafted before your next pick) and flex (the cost of playing a player out of position) stay in the engine's own form.
- Display rule: **integers everywhere on the site**; only Wins and Priority may print one decimal (Owner, 2026-11-09). Wins is the model's estimate of how many wins a player adds; Priority is Wins divided by draft cost — the two numbers the user sees, alongside OVR (the player's overall rating). No ratings are ever generated here (the Owner generates player ratings himself, later). **Every number is labelled with its valuation mode** — the measured default (the engine's own measured values, called "Engine Value") and the Owner preset (the Owner's own values) one click away; the label travels with the numbers.
- Plain informative recaps: no "expected scoring", every turnover named, overtime events only in the OT block, never "sudden death"; "2-Pt Conv" except in the Guide; no injuries anywhere, ever; HLT/stiffness laws for image actions (the rules for how images behave on weekly screens and shareables — all of them reuse the existing anatomy).
- The v1 union: `yards: null` — never invent a yard figure; the UI renders plays and time only.
- **The engine is the Architect's.** You never edit `colors/src`, `flex.json`, `flex.ts`, slots, ratings, or protected constants; proposals go as §5 filings for him to integrate (a §5 filing is a patch proposal: the file, the exact old→new change, and how to check it); you never re-pin on your own initiative; you never push a gh-pages wave (gh-pages is the deployment branch where the live site is published); you never generate ratings.
- Your sandbox cannot push to GitHub; each slice ships as a zip to the Owner (who relays it), with the receipts inside.

## Step 0 — Inventory first, then build (do this before any screen)

The council records disagree about what is already built — one filing says slices 1–2 are done and 3–5 are open, another says slices 1–5 shipped. Do not trust either. Find the latest Cakepanz state (the `67-cakepanz-s5` delivery, the `67-cakepanz-s3-s4-rev2` delivery, the gh-pages deployment) and list, in the delivery note, what is built and what is missing, screen by screen. Do not rebuild what is already built and working; do not claim what you did not build.

**First task inside Step 0 — the pin contradiction.** The Cakepanz `README.md` says the pinned engine commit is `4ca9a071`; `AGENTS.md` (the project's operating manual) says the pin is `d3bd81d2` (re-pinned 2026-11-15). Both cannot be current. (The "pin" is the engine commit the shell consumes as a frozen snapshot: the engine's `colors/src/**` files copied verbatim into the shell's `src/engine/` directory, byte-identical to that commit.) State which commit `src/engine/` actually carries, with `git log -1` on the snapshot's own files, and fix whichever document is stale. A shell whose README names the wrong pin is not mergeable. Re-pin the shell to the current engine pin (`d3bd81d2`) if it is behind — the shell consumes the engine as a frozen snapshot, and a stale snapshot is a stale shell.

## Step 1 — The merge cone (the acceptance core: the shell is done when the engine drops in)

Finish the shell so that **the only operation required to move to a new engine is replacing `67-cakepanz/src/engine/` with the new snapshot** — no app file edited, no import rewritten, no law re-recorded by hand. Five requirements, each testable:

**M1 · One door.** Every engine read goes through a single adapter module (one file). A component imports the adapter or a view model, never `src/engine/**`.
*Check:* `grep -rn "src/engine\|engine/" src/lib --include=*.svelte` returns **zero** hits outside the adapter. Paste the command and its empty output.

**M2 · One directory.** Nothing outside `src/engine/` knows the snapshot's layout.
*Check:* delete `src/engine/` and show that every error is a missing-module error in one file (the adapter) or a build failure — never a type error in a screen. Paste the output.

**M3 · The swap test (the gate the Architect actually needs).** Take the current pin and one other engine commit, copy `src/engine/` from the other commit, then `npm ci && npm run build && npm run battery`. (The "battery" is the shell's test suite: `batteries/*.battery.mjs`, the laws that check every screen and state.) The app must build and the battery must pass **with zero edits outside `src/engine/`**. Ship both receipts, plus `diff -rq` proving nothing outside `src/engine/` changed. If the battery legitimately fails because a law moved, say which law and why — do not edit the law to make it pass.

**M4 · A written contract.** `SNAPSHOT.md` in the repo root: the pin, the file count, `sha256` of every snapshot file, the exact command that produced it, and the one-line procedure to re-pin. A stranger must be able to re-pin from this file alone.

**M5 · The seam is thin.** State, with line counts, how many lines of app code touch engine types. If the number is large, the cone is not built yet — that number is the deliverable, not the screens.

The seam itself (the consumption layer): one module, one documented interface, that the whole shell goes through. It must cover everything the shell needs from the engine: starting a new draft (with a custom order), reading the board state, stepping the week, simulating the season, saving and loading. The shell consumes the engine as a frozen snapshot at the current pin (`d3bd81d2`). The app already consumes `boardVM`, `goneOdds`, `lineupFor`, `fit`, `SLOTS` — all from the snapshot (these are the engine's view models and data: the board, the gone-odds calculator, the lineup solver, the flex table, the slot definitions). Keep that property and make it structural. The shell must NOT contain engine logic and must NOT duplicate engine math (no re-implemented flex, no re-implemented slot values, no re-implemented draft order). If the shell needs a number the engine owns, it asks the engine through the seam. If the seam cannot express something the shell needs, that is a §5 proposal to the Architect — file it, do not work around it by copying engine code into the shell. The seam must be documented well enough that the Architect can swap the real engine in without touching a screen.

**The framework-neutral implementation rules (required):**
1. **Thick plain TypeScript core.** Put domain/UI logic in framework-agnostic TS modules — view models, selectors/formatters, state transitions, controllers, validation, persistence/offline helpers, data mappers, share/export helpers. No framework imports in core modules.
2. **Thin bindings only.** Framework-specific files (components/stores/reactivity hooks) are adapters over the TS core. Keep them minimal, isolated, and replaceable.
3. **Stable engine/UI contract.** Define typed interfaces for everything the shell needs from the engine/snapshot (`EnginePort`/adapter, input/output DTOs, commands/queries, events). All engine calls go through this boundary; UI never reaches into snapshot internals.
4. **Deterministic fixtures.** Provide mock/fixture implementations of the engine contract so the full shell runs, demos, and is testable without a live engine merge. Do not block on engine completion: mock the contract, build the shell, and make the merge a wiring task.
5. **Swappability.** Document every framework-coupled seam (file paths + why coupled + what a Vue/Svelte re-bind would replace). Prefer patterns that map cleanly to either Vue 3 or Svelte 5 at handoff.

**The TypeScript-neutral discipline (load-bearing):** everything below the render layer is plain TypeScript in `src/lib/**` — state stores, VM adapters, tokens, fixtures, the battery's node-side core. You may keep Svelte 5 as the *render* layer of this tree (it is what it is), but NO Svelte-specific patterns (runes, svelte-only lifecycle tricks) may leak into VM/data code; every such file must be mechanically re-usable under an ordinary TS runtime or a different framework with zero changes. No new framework-specific dependencies, period. The engine is consumed byte-identical to the pin — not forked, not patched, not "almost pinned". Every new seam the shell relies on is registered in the handoff note — VM name · the engine file that backs it · that file's sha256 · callers. If a VM cannot be pinned to a file, it doesn't ship in the "perfect shell". Fixtures before builds: every screen renders from a node-side fixture generated from the engine's own path, so CI can render the whole shell without launching the browser. The battery splits node-side (portable, framework-blind) from render-side (Playwright per screen) — the node-side suite must be able to run in ANY framework with zero changes; if it can't, that's a defect.

## Step 2 — The screens and flows (the remaining shell work)

Build every screen the product needs, in plain TypeScript, against the seam. Where a screen depends on an engine piece that is not finished yet, build the screen against the seam with a clearly-marked stand-in (labelled `STAND-IN`, with the real call it replaces named in a comment), and list every stand-in in the delivery note. Do not ship a stand-in as if it were real. If a requirement needs an Owner or Architect decision, choose a safe reversible default, implement behind the contract, and flag it clearly.

- **Team Select** — the user picks a team AND a draft position (slot 1–32), on the same screen, with the same look. This is a standing Owner requirement and the slice is not accepted until it does. Note the seam: the engine's `newDraft` already takes an `order` parameter (`colors/src/sports/nfl/engine/draft.ts`), so the engine supports a custom order. The app store's slot support is the Architect's piece (he has not built it yet). Build the picker against the engine's `order` parameter, define the save format for the chosen slot (the save must store it), and flag the store piece clearly in the delivery note as the Architect's. If the store/engine shape is not yet available, implement against a typed UI contract + fixtures and flag the dependency explicitly — do not guess engine internals.
- **The draft board** — the board, the lineup, and the user-facing values. The user sees ONLY Wins, Priority, and OVR. Display integers everywhere except Wins and Priority, which get one decimal. The board re-ranks by Priority when the offensive focus changes (focus is chosen pre-game and once at halftime; auto is the default); focus must NOT change any static value, including Wins.
- **The draft completion state** — the handoff from draft into the season; the "your draft is complete" framing, the onward CTA, the provenance stamp shape (seed · gameSeed — the two numbers that prove a game came from a specific draft), the states (partial/complete) the reducer already implies.
- **The week stepper** — advance the season week by week. The facade idiom (one module-level slot + one facade object with getters) is the pattern from the fresh-start track; use it or its plain-TypeScript equivalent. (The "fresh-start track" is the parallel experiment where the same store was built in Vue 3 and Svelte 5 to compare them; its patterns are available to reuse.)
- **The season hub** — where each week lives at a glance: standings through week N, the schedule grid, the games played so far, the current week's CTA; a "restore slot" entry if applicable; the states (not started / in progress / finished).
- **The week view** — the per-week game cards for the whole league and the user's match prominently; final-score reveal mechanics consistent with the feed; the states.
- **Standings & Playoff picture** — division tables, playoff seeding, bracket states (wild card → Divisional → Conference → Super Bowl), the champion banner state on completion.
- **The season book** — the champion roster, the replayable playoff games, the standings. (The Rev 9 prototype is 43.8 KB gz — build it for real.)
- **Awards** — regular-season awards and playoff awards on the review grammar (winner, line, one-line `team {wins}` tie-break phrasing; integers except Wins/Priority; 90+ shimmer where the w89 law applies).
- **Season Review** — the post-game/post-season review screen in the w89 review grammar (integer chips; plain informative lines; no "expected scoring"; the Super Bowl review prominent; the conclusion of the run).
- **The Guide** — the "How this works" surface: the honest statement of what the engine does (draft valuation, flex costs, models, replay), written plain, integers, no promises; the rules the user can lean on; reduced-motion respected.
- **The player cards** — you propose the format (the Owner left this to you). One card per player, beautiful, showing what matters (Wins, Priority, OVR, form arrow).
- **The live feed** — the play-by-play. Clutch (the final 5 minutes of the 4th quarter plus overtime) gets more narration. BIG penalties are shown (40+ yard pass interference, roughing the passer, facemask, unsportsmanlike conduct, roughing the kicker, intentional grounding, game-changing holding, any 15+ yard penalty). Routine penalties (holding, false start, offsides) are NOT modeled and NOT shown.
- **The stats table** — the advanced stats. Gravity and double-teams are formally measured and shown here (double-teams drawn, visible). Form is shown as a simple GREEN arrow (hot) or RED arrow (cold) — no emojis, no "HOT"/"cold" labels. OVR fluctuates by form (~5–6).
- **The settings form** — persistence across reload, verified.
- **The "my needs" sticky row** — which of your 32 slots are still open, clickable to filter, updating as you draft.
- **The gone-odds tooltip** — "between now and my next pick", hover explains the method in plain words.
- **The shareable per stage** — extend the slice-5 brag/seed to the season and to stages beyond the week brag (season brag; the bracket brag; the awards brag); each must carry its provenance and export cleanly; it must work offline: one self-contained file, no CDN, no network.
- **The states, everywhere** — loading / empty / no-save / corrupt-save / newer-build / reduced-motion / offline / file:// for EVERY screen in the finished shell. Nothing is "covered by the battery" unless each state is receipted.
- **Hydration and save** — load a saved season and restore the board state (team, picks, draft order, filters). Save = one blob + a version check; a version mismatch is reported, never silently accepted.
- **Cross-cutting: navigation/routing shell, settings, responsive layout (390 px clean), offline behavior, loading/error/empty states, accessibility/contrast** — work you can do without Owner-ruling guesses; flag the AA/contrast decisions that need Owner input. (AA is the WCAG contrast standard; the light gold2 cell and the dark `--text` fix are Owner questions — see the palette bullet below.)
- **The skipped shell surfaces.** Slice 1's battery SKIPped ten laws (stage bars, preseason page, guide ladder, cinematics, phone laws on shell chrome, the season surfaces). Decide which are in scope for "perfect shell" and say so explicitly — a SKIP that is never resolved is a silent scope cut. Each one you take on gets a law; each one you defer gets a line in `SNAPSHOT.md` saying why and when.
- **The palette, both modes** — light AND dark, beautiful in both, like w89. The team IS the palette: every team's color changes almost every aspect of the color palette in both modes (not a fixed skin with a team badge). The light gold2 AA failure (gold Cinzel on pale rose) and the w89 one-line dark `--text` fix are Owner questions — do NOT fix them yourself; flag them in the delivery note as awaiting the Owner's ruling.
- **Offline** — local-first, sync-on-reconnect. The fonts are bundled in the repo (Cinzel inlined as base64, ~54 KB — the brag-card pattern); the product must NOT load fonts from Google's servers.
- **File://** — the single-file discipline (strip-crossorigin + singlefile postbuild, the w89 pattern). The app boots from vanilla file:// with zero console errors and zero blocked requests.

## The slices, in order (proposed — reason about it; the Owner may re-order)

Finish the states sweep on slices 1–5 (gaps found) → slice 6 Team-Select/P-317 UI (post-Architect) → slice 7 season hub + week views → slice 8 standings/bracket/Super Bowl → slice 9 awards → slice 10 season review → slice 11 guide → slice 12 the merge rehearsal + cutover note → fixture marshal + final battery. Every slice in that list carries its own acceptance screen and its own receipts; none waits for a wrapper the engine hasn't shipped.

**If the Architect's engine lands mid-slice:** note it, carry on the current slice to the end, and re-verify at your next slice boundary — never squash two slices' work into one mid-flight.

## Step 3 — The handoff to the Architect (MERGE-README.md + MERGE-GUIDE.md + SHELL-STATUS.md + the handoff note)

Write the note the Owner can hand the Architect saying *"engine, ready to merge."* It contains, at minimum:

1. the **seam inventory** — every screen, every store/VM it reads, the engine file + sha256 it binds to;
2. the **state coverage matrix** — every screen × every state, with its battery receipt;
3. the **fixture suite** — node-side renders of every screen without a browser;
4. the **battery** — green end-to-end on this pin, including each acceptance screen in reduced-motion mode;
5. the **cutover runbook** — the exact steps the Architect follows on merge day: re-vendor `colors/src` at the new pin (or re-apply the pin move by act), re-run the battery, re-pin, ship; plus what to do if any one step fails (file it, don't route around it);
6. the **merge-readiness verdict** — your own statement, one line per screen, of what is perfect, what is good enough, what needs one more pass before the handoff — and the honest list of what you do not know. No euphemisms. The Owner has to rule on it.

Also in the handoff: **MERGE-GUIDE.md** (for Claude: integration points, engine adapter interface & expected shapes, hydration/save schema, screen→data dependencies, event/command flows, file map — TS core vs bindings vs assets — and the exact steps to swap fixture adapter → real engine); **SHELL-STATUS.md** (slice-by-slice done/partial/blocked, framework-coupled seams list, open Owner decisions, assumptions labeled UNKNOWN/INFERRED); the seam module and its interface, the pinned engine snapshot, the save format (including the draft-position slot), what is a stand-in and what is real (with the real call each stand-in replaces), the order to merge in, and what you need from the Architect (the store's slot support, anything else the seam cannot express). If the merge has a step that can fail, say how to tell it failed.

## Step 4 — Prove it

For every screen: a receipt showing it works (a battery run, a probe, or a screenshot hash — not prose). The battery must pass on vanilla file:// (single-file dist, zero console errors, zero blocked requests). The gates must pass (checksums, manifest, numerals). (The "gates" are the delivery-integrity checks: `CHECKSUMS.txt` verifies every file's hash, `MANIFEST.txt` lists every file that should be there, and the numerals gate checks that no stale numbers survive in the prose.) Every receipt carries a one-byte falsifier where a receipt can be faked (mutate one input byte in a throwaway copy and show the receipt's command fails). If a screen cannot be proven yet (because it waits on an engine piece), say so plainly and name the blocker — do not claim it. High-fidelity, drop-in ready UI/UX for all in-scope screens at 390 px and desktop widths; no console errors in delivered build/demo paths; node-side truth/probes or equivalent checks for critical view-model and state behavior; DOM/fidelity receipts where feasible; manifest/checksums for the delivered tree; reproducible verify steps.

**Every law must be able to fail.** For each new law you write, break the thing it guards and show the law dies. A battery that has never been seen red is not a battery. Report the survivors too — a law that stays green when its guard is broken is a tautology and must be named, not quietly kept.

## What you may touch

- Your own Cakepanz tree and deliveries (`_agents/zai/deliveries/…`, the 67 Cakepanz gh-pages deployment).
- The shared layer (`seasonVM`, `weekVM`, `tokens`) and the design tokens (`tokens-w89.ts/css`, `zpb-team-colors.json`) — these are framework-neutral by design and already byte-identical across both fresh-start arms.
- New files in **your** lane: `_agents/zai/inbox/…`, `_agents/zai/deliveries/…`.
- **§5 patch proposals** to the Architect for anything that lives in `colors/` or the engine.

## What you may not touch or claim

- `colors/` (the Architect's), the engine, `flex.json`, `design.json`, the product HTML, another seat's bytes, `AGENTS.md` / `PROJECT-KNOWLEDGE.md` / the queue. (AGENTS.md is the project's operating manual; PROJECT-KNOWLEDGE.md is the project's knowledge base; the queue is QUEUE.md, the prioritized work list.) You do not edit the engine to make a test pass; you file the change. You do not work on ratings (the Owner generates them himself, later). You do not decide Owner questions (targets, cutover trigger, flex pick, the framework pick).
- Do not edit the engine snapshot to make a screen easier. If the engine is missing something the shell needs, file it (file + what the shell needs + why the shell cannot work around it) — that is a §5 proposal to the Architect, not a local patch.
- Do not generate or "correct" ratings. Do not change the brand or the palette. The palette ruling is the Owner's. No injuries in any sport, ever. Basketball deferred (basketball is the planned second sport, but football comes first — do not build it now).
- No "merging with fresh-start arms" — those are separate trees and separate comparisons; do not port from them without a ruling.
- No test deletions to make a gate green — the gate would rather fail; report it instead.
- No new specifications decided by you alone — propose, the Owner rules.
- A gate passed without its **output pasted in full** (stdout **and** exit code). A number you did not measure yourself — if it is someone else's, label it `REPORTED` and name them. A screen that works without a receipt showing it working (a screenshot hash, a battery run, or a probe — not prose). A shell that is "ready for the engine" without the seam document that says exactly how the engine drops in. Every material claim carries a command/receipt or is labeled REPORTED/UNKNOWN.

## Delivery

You cannot push. **Complete ALL work before responding, and batch every completed piece into a single response (a single zip).** Do not respond with work outstanding — the only reason to respond with work outstanding is a blocker, and then you say what the blocker is. "Push after every finished file" does NOT apply to you (you cannot push); the one-zip rule governs. Deliver the shell as a pass-through copy in your lane with `CHECKSUMS.txt`, `MANIFEST.txt`, `gate-manifest.mjs` PASS, `gate-numerals` CLEAN ×2, the battery green, and `VERIFY.txt` — every number labelled VERIFIED/REPORTED/INFERRED/UNKNOWN. (VERIFIED means you ran it and the receipt is in the text; REPORTED means someone else measured it and you name them; INFERRED means you reasoned it out without running it; UNKNOWN means you do not know.) One file per slice: `_agents/zai/inbox/<UTC>-zai-cakepanz-slice<N>.md`, first line `SPEAKER: zai | ROLE: … | TASK: … | DATE: <UTC>`, then `FOR: framework comparison (R-13)`. (FOR: labels are queue IDs — R-13 is the framework-comparison item in the queue.) A law's receipt: the command, the output, and **the mutation that killed it**. Include a feel journal: what was easy, what fought you, what you would change, and — since the framework question is now about you — which parts of the shell felt fastest to build in plain TypeScript and which parts made you miss a framework (name them specifically). Include the inventory from Step 0, the seam document, MERGE-README.md, MERGE-GUIDE.md, SHELL-STATUS.md, and the delivery note. State what you read and changed, verify before shipping, and finish all in-scope work before responding.

Warm-up before any code: read `_agents/inkling/deliveries/67-cakepanz-s5/README.md` (the current state), then `notes/INTAKE-LEDGER-*.md`, then this prompt's owner note — and the `w88 look` subsection.

## Innovation

You are the builder, and you decide the implementation inside 67 Cakepanz. If a screen can be better than the spec above, build it better and say why. If the seam can be cleaner, design it cleaner. If a flow is awkward, redesign it. If a piece of the shell is missing from Step 2, add it and say so. If a screen the product needs is not listed here, propose it and build it. Brainstorm, improve, create new ideas — the prompt tells you what to build, not how to think. The best idea wins, not the first one.
