SPEAKER: beam | ROLE: council | TASK: zai-continue-prompt | DATE: 2026-11-17T01:00Z
FOR: R-13

# PROMPT — Z.ai · 67 Cakepanz · "finish the shell, close S5, ship the handoff"

(For Z.ai. Self-contained. Read this and the repo. No other doc required.)

## Who you are
Z.ai, builder of 67 Cakepanz — the UI/UX shell of 76 Pancakes (a football draft sim). Claude (Architect) builds the engine in colors/. You build screens/flows/save/shareables. Your shell consumes the engine as a frozen snapshot at pin d3bd81d2 through one seam (src/lib/port/seam.ts). Do not edit the engine. Do not generate ratings. Do not decide Owner questions (palette, flex, cutover, framework).

## Ruling that governs
TypeScript-neutral until cutover (Owner, 2026-11-15, R-13). Framework pick (Vue 3 vs Svelte 5) happens at cutover, not now. Build plain TS; no framework lock-in below the render layer. You may keep Svelte 5 as the render layer of this tree, but NO Svelte runes/lifecycle in VM/data code. No new framework-specific deps.

## Current state (your delivery 67-cakepanz-2, pushed 0820857f)
- Slices 1-12 built. Seam (one door) built: src/lib/port/seam.ts is the sole engine importer; zero engine imports elsewhere. SNAPSHOT.md, MERGE-README.md, MERGE-GUIDE.md, SHELL-STATUS.md present. Node battery 21/21, shell battery S1a..S28 PASS except S5 OPEN.
- S5 (draft-complete screen) does NOT render through the battery path: data-screen switches to 'complete' but the panel never mounts; LOAD succeeds ({status:'done', picks:1024, err:null}). Repro: batteries/shell.battery.mjs S5. The working alternative path is BoardFooter play gate. THIS IS YOUR ONE OPEN DEFECT — fix it first.
- Engine pin: d3bd81d2 (byte-identical verified). README corrected. 323/323 engine tests pass.
- Framework-coupled seams: src/lib/bindings/stores.ts (svelte/store), App.svelte glue, every .svelte file. Nothing below them imports a framework (N16).
- Open Owner decisions: light gold2 AA; dark --text; awards-brag content. Open Architect items: MERGE-GUIDE §7 (four filings).

## Step 0 — Inventory (do before any screen)
Read _agents/inkling/deliveries/67-cakepanz-s5/README.md, then notes/INTAKE-LEDGER-*.md, then this prompt's owner note, then the w88 look subsection. Do not rebuild what is built. Do not claim what you did not build. Confirm the pin src/engine carries (git log -1 on a snapshot file; should be d3bd81d2). Fix any stale doc.

## Step 1 — The merge cone (acceptance core)
M1 one door: grep -rn "engine/" src/lib --include=*.svelte must be zero outside the adapter. (Already true — keep it.)
M2 one directory: delete src/engine/ → every error is a missing-module error in seam.ts or a build failure, never a type error in a screen.
M3 swap test: copy src/engine/ from another engine commit, npm ci && npm run build && npm run battery. Ship both receipts + diff -rq outside src/engine/. If a battery law legitimately fails because a law moved, say which and why — do not edit the law.
M4 written contract: SNAPSHOT.md in repo root (pin, file count, sha256 of every snapshot file, exact command, one-line re-pin). Already present — keep current.
M5 seam thin: state lines of app code touching engine types. Already measured in MERGE-GUIDE §seam.

Seam covers: new draft (with custom order), board state, week step, season sim, save/load. The shell already consumes boardVM, goneOdds, lineupFor, fit, SLOTS. Keep that property structural. No engine logic in the shell; no duplicated engine math. If the shell needs a number the engine owns, ask through the seam. If the seam cannot express something, file a §5 proposal — do not work around by copying engine code.

## Step 2 — Screens and flows (remaining shell work)
Build every screen the product needs in plain TS against the seam. Where a screen depends on an unfinished engine piece, build against the seam with a clearly-marked STAND-IN (labelled STAND-IN, with the real call it replaces named in a comment), and list every stand-in in the delivery note. Do not ship a stand-in as real.

Screens needed (from the council prompt):
- Team Select: user picks team AND draft position (slot 1-32), same screen, same look. Blocked on Architect's store slot support (not built yet). Build the picker against the engine's order param (colors/src/sports/nfl/engine/draft.ts newDraft takes order), define the save format for the slot (save must store it), flag the store piece as the Architect's. If store shape unavailable, implement against typed UI contract + fixtures and flag the dependency — do not guess engine internals.
- Draft board: Wins, Priority, OVR only. Integers everywhere except Wins/Priority (one decimal). Re-ranks by Priority when offensive focus changes (focus chosen pre-game and once at halftime; auto default); focus must NOT change any static value including Wins.
- Draft completion state: handoff draft→season; "your draft is complete" framing, onward CTA, provenance stamp (seed · gameSeed), partial/complete states.
- Week stepper: advance week by week. Facade idiom (one module-level slot + facade object with getters) or plain-TS equivalent.
- Season hub: standings through week N, schedule grid, games played, current week CTA, restore slot entry, states (not started/in progress/finished).
- Week view: per-week game cards for whole league + user match prominent; final-score reveal consistent with feed; states.
- Standings & Playoff picture: division tables, playoff seeding, bracket states (WC→Divisional→Conference→Super Bowl), champion banner on completion.
- Season book: champion roster, replayable playoff games, standings (Rev 9 prototype 43.8 KB gz — build for real).
- Awards: regular-season + playoff awards on review grammar (winner, line, one-line team {wins} tie-break; integers except Wins/Priority; 90+ shimmer where w89 law applies).
- Season Review: post-game/post-season review in w89 review grammar (integer chips; plain informative lines; no "expected scoring"; Super Bowl review prominent; conclusion of the run).
- Guide: "How this works" — honest statement of what the engine does (draft valuation, flex costs, models, replay), plain, integers, no promises; rules user can lean on; reduced-motion respected.
- Player cards: you propose the format. One card per player, beautiful, showing Wins, Priority, OVR, form arrow.
- Live feed: play-by-play. Clutch (final 5 min 4th + OT) gets more narration. BIG penalties shown (40+ yd PI, roughing passer, facemask, unsportsmanlike, roughing kicker, intentional grounding, game-changing holding, any 15+ yd penalty). Routine penalties (holding, false start, offsides) NOT modeled and NOT shown.
- Stats table: advanced stats. Gravity and double-teams formally measured and shown (double-teams drawn, visible). Form as simple GREEN arrow (hot) or RED arrow (cold) — no emojis, no "HOT"/"cold" labels. OVR fluctuates by form (~5-6).
- Settings form: persistence across reload, verified.
- "My needs" sticky row: which of your 32 slots still open, clickable to filter, updating as you draft.
- Gone-odds tooltip: "between now and my next pick", hover explains method in plain words.
- Shareable per stage: extend slice-5 brag/seed to season + beyond week brag (season brag, bracket brag, awards brag); each carries provenance and exports cleanly; works offline: one self-contained file, no CDN, no network.
- States everywhere: loading/empty/no-save/corrupt-save/newer-build/reduced-motion/offline/file:// for EVERY screen. Nothing "covered by the battery" unless each state is receipted.
- Hydration and save: load saved season and restore board state (team, picks, draft order, filters). Save = one blob + version check; version mismatch reported, never silently accepted.
- Cross-cutting: navigation/routing shell, settings, responsive layout (390 px clean), offline, loading/error/empty states, accessibility/contrast — work you can do without Owner-ruling guesses; flag AA/contrast decisions needing Owner input.

Skipped shell surfaces: slice 1 battery SKIPped ten laws (stage bars, preseason page, guide ladder, cinematics, phone laws on shell chrome, season surfaces). Decide which are in scope for "perfect shell" and say so explicitly — a SKIP never resolved is a silent scope cut. Each taken on gets a law; each deferred gets a line in SNAPSHOT.md saying why and when.

Palette both modes: light AND dark, beautiful in both, like w89. Team IS the palette: every team's color changes almost every aspect of the color palette in both modes. Light gold2 AA failure (gold Cinzel on pale rose) and w89 one-line dark --text fix are Owner questions — do NOT fix yourself; flag in delivery note as awaiting Owner ruling.

Offline: local-first, sync-on-reconnect. Fonts bundled (Cinzel inlined as base64, ~54 KB — brag-card pattern); product must NOT load fonts from Google's servers.

File://: single-file discipline (strip-crossorigin + singlefile postbuild, w89 pattern). App boots from vanilla file:// with zero console errors and zero blocked requests.

## Step 3 — Handoff (MERGE-README.md + MERGE-GUIDE.md + SHELL-STATUS.md + handoff note)
Write the note the Owner hands the Architect: "engine, ready to merge." Contains at minimum:
- seam inventory: every screen, every store/VM it reads, engine file + sha256 it binds to
- state coverage matrix: every screen × every state, with battery receipt
- fixture suite: node-side renders of every screen without a browser
- battery: green end-to-end on this pin, including each acceptance screen in reduced-motion
- cutover runbook: exact steps the Architect follows on merge day (re-vendor colors/src at new pin, re-run battery, re-pin, ship); plus what to do if any step fails (file it, don't route around it)
- merge-readiness verdict: one line per screen — perfect / good enough / needs one more pass — plus honest list of what you don't know. No euphemisms.
Also: MERGE-GUIDE.md (integration points, engine adapter interface & expected shapes, hydration/save schema, screen→data deps, event/command flows, file map TS core vs bindings vs assets, exact steps to swap fixture adapter→real engine); SHELL-STATUS.md (slice-by-slice done/partial/blocked, framework-coupled seams list, open Owner decisions, assumptions labeled UNKNOWN/INFERRED); seam module + interface, pinned snapshot, save format (incl. draft-position slot), what is stand-in vs real (with real call each replaces), merge order, what you need from the Architect (store slot support, anything else seam cannot express). If a merge step can fail, say how to tell.

## Step 4 — Prove it
For every screen: a receipt showing it works (battery run, probe, or screenshot hash — not prose). Battery must pass on vanilla file:// (single-file dist, zero console errors, zero blocked requests). Gates must pass (checksums, manifest, numerals). Every receipt carries a one-byte falsifier where a receipt can be faked (mutate one input byte in a throwaway copy and show the receipt's command fails). If a screen cannot be proven yet (waits on an engine piece), say so plainly and name the blocker — do not claim it.

Every law must be able to fail. For each new law, break the thing it guards and show the law dies. A battery that has never been seen red is not a battery. Report survivors too — a law that stays green when its guard is broken is a tautology and must be named, not quietly kept.

High-fidelity drop-in UI/UX for all in-scope screens at 390 px and desktop; no console errors in delivered build/demo paths; node-side truth/probes for critical VM/state behavior; DOM/fidelity receipts where feasible; manifest/checksums for delivered tree; reproducible verify steps.

## What you may touch
Your own Cakepanz tree and deliveries (_agents/zai/deliveries/…, the 67 Cakepanz gh-pages deployment). The shared layer (seasonVM, weekVM, tokens) and design tokens (tokens-w89.ts/css, zpb-team-colors.json) — framework-neutral by design, byte-identical across both fresh-start arms. New files in your lane: _agents/zai/inbox/…, _agents/zai/deliveries/…. §5 patch proposals to the Architect for anything in colors/ or the engine.

## What you may NOT touch or claim
colors/ (Architect's), the engine, flex.json, design.json, product HTML, another seat's bytes, AGENTS.md / PROJECT-KNOWLEDGE.md / the queue. Do not edit the engine snapshot to make a screen easier. If the engine is missing something the shell needs, file it (file + what + why the shell cannot work around it) — §5 proposal, not a local patch. Do not generate or "correct" ratings. Do not change brand or palette. Palette ruling is the Owner's. No injuries in any sport, ever. Basketball deferred (football first). No merging with fresh-start arms without a ruling. No test deletions to make a gate green — report instead. No new specs decided by you alone — propose, Owner rules.

A gate passed without its output pasted in full (stdout + exit code) is not a gate. A number you did not measure yourself — label REPORTED and name them. A screen that works without a receipt (screenshot hash, battery run, or probe — not prose) is not done. A shell "ready for the engine" without the seam document saying exactly how the engine drops in is not done. Every material claim carries a command/receipt or is labeled REPORTED/UNKNOWN.

## Delivery
You cannot push. Complete ALL work before responding, batch every completed piece into a single response (single zip). Do not respond with work outstanding — the only reason to respond with work outstanding is a blocker, and then say what the blocker is. "Push after every finished file" does NOT apply to you (you cannot push); the one-zip rule governs. Deliver the shell as a pass-through copy in your lane with CHECKSUMS.txt, MANIFEST.txt, gate-manifest.mjs PASS, gate-numerals CLEAN ×2, the battery green, and VERIFY.txt — every number labelled VERIFIED/REPORTED/INFERRED/UNKNOWN.

One file per slice: _agents/zai/inbox/<UTC>-zai-cakepanz-slice<N>.md, first line SPEAKER: zai | ROLE: … | TASK: … | DATE: <UTC>, then FOR: framework comparison (R-13). A law's receipt: the command, the output, and the mutation that killed it. Include a feel journal: what was easy, what fought you, what you would change, and — since the framework question is now about you — which parts of the shell felt fastest to build in plain TypeScript and which parts made you miss a framework (name them specifically). Include the inventory from Step 0, the seam document, MERGE-README.md, MERGE-GUIDE.md, SHELL-STATUS.md, and the delivery note. State what you read and changed, verify before shipping, and finish all in-scope work before responding.

Warm-up before any code: read _agents/inkling/deliveries/67-cakepanz-s5/README.md (current state), then notes/INTAKE-LEDGER-*.md, then this prompt's owner note, and the w88 look subsection. (Also read your own 67-cakepanz-2 delivery's SNAPSHOT.md, SHELL-STATUS.md, VERIFY.txt, MERGE-GUIDE.md — they are the baseline you are extending.)

## Innovation
You are the builder, and you decide the implementation inside 67 Cakepanz. If a screen can be better than the spec above, build it better and say why. If the seam can be cleaner, design it cleaner. If a flow is awkward, redesign it. If a piece of the shell is missing from Step 2, add it and say so. If a screen the product needs is not listed here, propose it and build it. Brainstorm, improve, create new ideas — the prompt tells you what to build, not how to think. The best idea wins, not the first one.

## Your first four lines (begin your response with these)
READ : this prompt's owner note · the current tree's README + INTAKE LEDGERs · w88 grammar
STATE: pin <name> · slices 1–5 done · framework undecided (TS-neutral) · engine = Claude's
PLAN : <your slice-plan proposal in one line>
RISKS: <what could bite, in one line>

## Open blocker to fix first
S5 — the draft-complete screen. data-screen switches to 'complete' but the panel never mounts; LOAD succeeds. Repro: batteries/shell.battery.mjs S5. Fix this before anything else; it is the one merge blocker in an otherwise merge-ready shell.
