SPEAKER: beam | ROLE: council | TASK: zai-continue-prompt | DATE: 2026-11-17T19:50Z
FOR: R-13

# PROMPT — Z.ai · 67 Cakepanz · "ship the handoff" (v3)

(For Z.ai. Self-contained. Read this and the repo. No other doc required.)

## Who you are
Z.ai, builder of 67 Cakepanz — the UI/UX shell of 76 Pancakes. Claude (Architect) builds the engine in colors/. You build screens/flows/save/shareables. Your shell consumes the engine as a frozen snapshot. Do not edit the engine. Do not generate ratings. Do not decide Owner questions (palette, flex, cutover, framework).

## Ruling that governs
TypeScript-neutral until cutover (Owner, R-13). Framework pick (Vue 3 vs Svelte 5) at cutover, not now. Build plain TS; no framework lock-in below the render layer. You may keep Svelte 5 as the render layer, but NO Svelte runes/lifecycle in VM/data code. No new framework-specific deps.

## Current state (your delivery cakepanz-4, pushed 290b92ba)
- Slices 1-12 built. Seam (one door) built: src/lib/port/seam.ts is the sole engine importer; zero engine imports elsewhere. SNAPSHOT.md, MERGE-README.md, MERGE-GUIDE.md, SHELL-STATUS.md present. Node battery 24/24 on Node v24.22.3, shell battery 46/0 (S5 FIXED this sitting). Engine tests 394/394. Swap test receipts present (M3, FAIL BY DESIGN on carried engine goldens — needs re-pin).
- S5 (draft-complete screen) FIXED: mounts with full 1024 picks + provenance stamp. VERIFY.txt §6. The merge blocker is closed.
- Engine pin: 5c808472 (re-pinned from d3bd81d2 this sitting, byte-identical verified). 394/394 engine tests pass. Engine tip now 65673a00 (pass-class GLM node, portable cosine, CI gate, six flex rules, product pack, derived priorities, OT clock fix, pooled-node conformance).
- Framework-coupled seams: src/lib/bindings/stores.ts (svelte/store), App.svelte glue, every .svelte file. Nothing below them imports a framework (N16).
- Open Owner decisions: light gold2 AA (1.51:1 FAIL); dark --text (3.17:1 FAIL at AA normal); awards-brag content.
- Open council items: F2/F3 falsifiers (N14 no-CDN, N12a roundtrip) still UNFALSIFIED-THIS-SITTING (mutation targets moved) — carried from cakepanz-3. Re-derive with corrected target strings. AA contrast (light gold2, dark --text) awaiting Owner ruling.
- Open Architect items: MERGE-GUIDE §7 (four filings); store slot support (P-317).
- The Owner's gap ruling (2026-11-17): leave the 4-3/3-4 gap as-is. 4-3 is more popular. 3-4 should be better when a bad DT2 is on the board with many good LBs. Six flex rules landed (EDGE→DT 2, ILB→OLB 2, CB→FS 2, EDGE→OLB 2, OT→OG 2, CB→SS 2). SS→NICKEL stays 0 (never approved). Flex table is a guideline; real values come from the engine.
- The Architect has landed a pass-class GLM node (65673a00) on top of the pin. The shell's pin (5c808472) is now one commit behind the Architect tip. Re-pin decision is the Owner's; flag it.

## Step 0 — Inventory (do before any screen)
Read _agents/inkling/deliveries/67-cakepanz-s5/README.md, then notes/INTAKE-LEDGER-*.md, then this prompt's owner note, then the w88 look subsection. Also read your own cakepanz-4 delivery's SNAPSHOT.md, SHELL-STATUS.md, VERIFY.txt, MERGE-GUIDE.md, ACCEPTANCE-RECEIPTS.txt, DELIVERY-DECISIONS.md — they are the baseline. Do not rebuild what is built. Do not claim what you did not build. Confirm the pin src/engine carries (should be 5c808472; if the Architect has moved it further, re-pin per SNAPSHOT.md). Fix any stale doc.

## Step 1 — Re-pin to the current engine tip (65673a00) IF the Owner approves
The Architect has landed the pass-class GLM node on top of 5c808472. The shell's pin is one commit behind. The Owner must decide whether to re-pin. If he approves: follow SNAPSHOT.md's one-line re-pin procedure. Re-run engine tests (should be 406/406 now). Re-run the full battery (node + shell). Ship receipts. If any step fails: FILE it to the Architect — do not route around it, do not edit the snapshot.

## Step 2 — Close the remaining gaps
1. F2/F3 falsifiers: re-derive with corrected target strings. scripts/receipt-falsifier.mjs exists; fix the target strings so the mutation actually edits something. Run and receipt. NO TAUTOLOGY CLAIMED until falsified.
2. S5 is fixed — verify it still passes on the re-pinned tree (regression check).
3. Re-run the swap test (M3) on the new pin. Ship receipts + diff -rq.
4. Re-run gates: regen-manifest, gate-manifest (PASS), gate-numerals (CLEAN ×2).

## Step 3 — The merge cone (acceptance core) — already met, keep current
M1 one door: grep -rn "engine/" src/lib --include=*.svelte returns zero hits outside the adapter. Keep it.
M2 one directory: delete src/engine/ → every error roots in seam.ts.
M3 swap test: receipts shipped (cakepanz-4). Re-run on new pin.
M4 written contract: SNAPSHOT.md (pin, file count, sha256s, command, re-pin). Keep current, update pin.
M5 seam thin: lines of app code touching engine types — measured in MERGE-GUIDE §seam. Keep current.

## Step 4 — Handoff (MERGE-README.md + MERGE-GUIDE.md + SHELL-STATUS.md + handoff note)
Update all four for the new pin and the new state. The handoff note must contain at minimum:
- seam inventory: every screen, every store/VM it reads, engine file + sha256 it binds to
- state coverage matrix: every screen × every state, with battery receipt
- fixture suite: node-side renders of every screen without a browser
- battery: green end-to-end on this pin, including each acceptance screen in reduced-motion
- cutover runbook: exact steps the Architect follows on merge day (re-vendor colors/src at new pin, re-run battery, re-pin, ship); plus what to do if any step fails (file it, don't route around it)
- merge-readiness verdict: one line per screen — perfect / good enough / needs one more pass — plus honest list of what you don't know. No euphemisms.
Also: MERGE-GUIDE.md (integration points, engine adapter interface & expected shapes, hydration/save schema, screen→data deps, event/command flows, file map TS core vs bindings vs assets, exact steps to swap fixture adapter→real engine); SHELL-STATUS.md (slice-by-slice done/partial/blocked, framework-coupled seams list, open Owner decisions, assumptions labeled UNKNOWN/INFERRED); seam module + interface, pinned snapshot, save format (incl. draft-position slot), what is stand-in vs real (with real call each replaces), merge order, what you need from the Architect (store slot support, anything else seam cannot express). If a merge step can fail, say how to tell.

## Step 5 — Prove it
For every screen: a receipt showing it works (battery run, probe, or screenshot hash — not prose). Battery must pass on vanilla file:// (single-file dist, zero console errors, zero blocked requests). Gates must pass (checksums, manifest, numerals). Every receipt carries a one-byte falsifier where a receipt can be faked. If a screen cannot be proven yet, say so plainly and name the blocker.

Every law must be able to fail. For each new law, break the thing it guards and show the law dies. A battery that has never been seen red is not a battery. Report survivors too.

High-fidelity drop-in UI/UX for all in-scope screens at 390 px and desktop; no console errors in delivered build/demo paths; node-side truth/probes for critical VM/state behavior; DOM/fidelity receipts where feasible; manifest/checksums for delivered tree; reproducible verify steps.

## What you may touch
Your own Cakepanz tree and deliveries (_agents/zai/deliveries/…, the 67 Cakepanz gh-pages deployment). The shared layer (seasonVM, weekVM, tokens) and design tokens (tokens-w89.ts/css, zpb-team-colors.json) — framework-neutral by design, byte-identical across both fresh-start arms. New files in your lane: _agents/zai/inbox/…, _agents/zai/deliveries/…. §5 patch proposals to the Architect for anything in colors/ or the engine.

## What you may NOT touch or claim
colors/ (Architect's), the engine, flex.json, design.json, product HTML, another seat's bytes, AGENTS.md / PROJECT-KNOWLEDGE.md / the queue. Do not edit the engine snapshot to make a screen easier. If the engine is missing something the shell needs, file it (file + what + why the shell cannot work around it) — §5 proposal, not a local patch. Do not generate or "correct" ratings. Do not change brand or palette. Palette ruling is the Owner's. No injuries in any sport, ever. Basketball deferred (football first). No merging with fresh-start arms without a ruling. No test deletions to make a gate green — report instead. No new specs decided by you alone — propose, Owner rules.

A gate passed without its output pasted in full (stdout + exit code) is not a gate. A number you did not measure yourself — label REPORTED and name them. A screen that works without a receipt (screenshot hash, battery run, or probe — not prose) is not done. A shell "ready for the engine" without the seam document saying exactly how the engine drops in is not done. Every material claim carries a command/receipt or is labeled REPORTED/UNKNOWN.

## Delivery
You cannot push. Complete ALL work before responding, batch every completed piece into a single response (single zip). Do not respond with work outstanding — the only reason to respond with work outstanding is a blocker, and then say what the blocker is. "Push after every finished file" does NOT apply to you (you cannot push); the one-zip rule governs. Deliver the shell as a pass-through copy in your lane with CHECKSUMS.txt, MANIFEST.txt, gate-manifest.mjs PASS, gate-numerals CLEAN ×2, the battery green, and VERIFY.txt — every number labelled VERIFIED/REPORTED/INFERRED/UNKNOWN.

One file per slice: _agents/zai/inbox/<UTC>-zai-cakepanz-slice<N>.md, first line SPEAKER: zai | ROLE: … | TASK: … | DATE: <UTC>, then FOR: framework comparison (R-13). A law's receipt: the command, the output, and the mutation that killed it. Include a feel journal: what was easy, what fought you, what you would change, and — since the framework question is now about you — which parts of the shell felt fastest to build in plain TypeScript and which parts made you miss a framework (name them specifically). Include the inventory from Step 0, the seam document, MERGE-README.md, MERGE-GUIDE.md, SHELL-STATUS.md, and the delivery note. State what you read and changed, verify before shipping, and finish all in-scope work before responding.

Warm-up before any code: read _agents/inkling/deliveries/67-cakepanz-s5/README.md (current state), then notes/INTAKE-LEDGER-*.md, then this prompt's owner note, and the w88 look subsection. (Also read your own cakepanz-4 delivery's SNAPSHOT.md, SHELL-STATUS.md, VERIFY.txt, MERGE-GUIDE.md, ACCEPTANCE-RECEIPTS.txt, DELIVERY-DECISIONS.md, ENVELOPE-FREEZE.md — they are the baseline, plus the council's reviews of your deliveries in _agents/beam/inbox/.)

## Your first four lines (begin your response with these)
READ : this prompt's owner note · the current tree's README + INTAKE LEDGERs · w88 grammar
STATE: pin <name> · slices 1–5 done · framework undecided (TS-neutral) · engine = Claude's
PLAN : <your slice-plan proposal in one line>
RISKS: <what could bite, in one line>

## Open Owner decisions (do not decide; flag in delivery note)
- light gold2 AA (1.51:1 FAIL)
- dark --text (3.17:1 FAIL at AA normal)
- awards-brag content

## Open Architect items (file §5 if needed)
- MERGE-GUIDE §7 (four filings)
- store slot support (P-317) — Team Select picker is built against the engine's order param + typed contract; the store piece is the Architect's.
- The six flex rules are landed (EDGE→DT 2, ILB→OLB 2, CB→FS 2, EDGE→OLB 2, OT→OG 2, CB→SS 2). SS→NICKEL stays at 0 (never approved). The flex table is a guideline; real values come from the engine.

## The gap (Owner ruling 2026-11-17)
Leave the 4-3/3-4 gap as-is. 4-3 is more popular. 3-4 should be better when a bad DT2 is on the board with many good LBs. Do not re-litigate the gap. Do not cap DT2. Do not re-price to close the gap. If a screen or flow depends on the gap being closed, redesign it to work with the current state.

## Innovation
You are the builder, and you decide the implementation inside 67 Cakepanz. If a screen can be better than the spec above, build it better and say why. If the seam can be cleaner, design it cleaner. If a flow is awkward, redesign it. If a piece of the shell is missing from Step 2, add it and say so. If a screen the product needs is not listed here, propose it and build it. Brainstorm, improve, create new ideas — the prompt tells you what to build, not how to think. The best idea wins, not the first one.
