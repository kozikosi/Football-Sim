SPEAKER: hy4 | ROLE: advisor | TASK: implications and improvements for cakepanz / the UI-UX shell around Claude's engine | DATE: 2026-11-18T20:05Z
IDEA: a ranked set of shell-side improvements, all with the engine left untouched
FOR: cakepanz-8 follow-up (Block B / P-337). There is no PRIORITIES ID for this delivery — MUSE: file one if these are to enter the queue.

## Playback — what I think this is, and what I am guessing

The delivery is a **shell**, not a product: Z.ai's Svelte app consumes Claude's frozen engine through a narrow port (`seam.ts` + `src/lib/port/*`) and never edits `src/engine`. Its job is to make the engine's numbers legible and pleasant, offline, in one self-contained `single.html`, in rose/gold/white with light and dark modes and team take-over. cakepanz-8 closed a real product defect (a mid-season refresh landed on a blank board), split a tautological law, and added Block B: a simpler late-draft board after the user's 10th pick, because the Owner wants the first ten rounds to be enjoyable and the second half to need no complex math.

My **guess** at the real problem underneath the last item: the shell shows many correct numbers, but it does not tell a first-time player *what to do with them* — and the late-draft simplification hides information instead of translating it. That is a presentation problem, so it can be solved without touching the engine. If that guess is wrong, the priorities below should be re-ranked.

## Constraints I will not cross

Engine pin is truth (`5c808472` shipped / `65673a00` prepared, both re-verified by me); no shell change may edit `src/engine`, the protected constants, or the flex table. Offline and single-file are hard. No invented factual data — every number shown must be derived from an existing VM field or engine result and labelled as presentation. The seven Owner decisions and five Architect items stay open. Only Claude writes `Football-Sim-*.html` and only Z.ai writes this tree; I supply ideas and receipts.

## Goals / non-goals / anti-goals

- **Goal:** make a correct number immediately actionable, especially in the second half of the draft, without adding engine work.
- **Non-goal:** rebalancing the game, changing the flip threshold without the Owner, choosing a label or a colour.
- **Anti-goal (would make this a failure even if it worked):** a prettier board that quietly lies about where a number came from, or that makes the user click twice to see something the old board showed once.

## Tier 1 — now, render-only, falsifiable (my recommendation)

1. **Make "one click away" literally true.** Fix the dead simple-row toggle I found in the review (render the detail region under `.cp-mainsimple`, add `aria-controls`), and add law **L7** to `late.battery.mjs` so the affordance cannot silently die again. Smallest change, closes a shown defect.
2. **"Why this number?" microcopy on the recommendation.** The simple row shows one wins number. Add a one-line, plain-language reason drawn *only* from existing `BoardRowVM` fields (e.g. the slot it fills, whether it is a flex, the gone%) — "best available at ILB — fills a need" — with a tooltip that names the mode ("Engine Value"). This directly serves the Owner's 12-year-old comprehension ruling and needs no new engine data. **My call:** present it as a translation of existing fields, never as a new engine claim.
3. **Persistent provenance chip in the topbar.** The board/team screens already carry a `cp-prov` sentence; make it a small always-on chip that opens a panel explaining Engine Value vs Owner Preset and where the numbers come from (`modelWeights()` is the monotone quantisation of `slotWinsPerOvr()`). This answers the live "Model Value" label question *without* picking a word — the chip can carry whichever label the Owner chooses.

## Tier 2 — next, shell/port only

4. **Keyboard-first board.** Arrow keys move between rows, Enter expands the detail, `D` drafts, visible focus rings, and an `aria-live` region announcing "Drafted <name> at <slot>" on confirmation. The gone% tooltip is hover-and-focus today; extend focus to the wrap so keyboard users can read the method. Falsifiable in the shell battery, no engine change.
5. **Visible offline / save status.** Offline is a hard requirement, but there is no at-a-glance "saved locally · 2 min ago" indicator and no conflict screen when two saves collide. A topbar status plus the existing `Saves` panel would make the tent-in-the-woods promise observable. This is the largest *product-level* gap I can see in the shell as delivered.
6. **Game pace control in Settings.** The Owner wants 30–60 s animated games with Skip. Add Slow / Normal / Instant as a user preference (honouring `prefers-reduced-motion`), leaving Skip's end behaviour exactly as specified. A shell-level setting, not an engine timer.
7. **Theme contract battery + measured contrast receipt.** Assert that every screen's accent tokens come from the selected team's three hexes and that neutral stays white, then publish measured light-gold2 and dark `--text` ratios. This turns the two open colour decisions into a data question for the Owner instead of a matter of taste.

## Tier 3 — needs the Owner or the Architect first

8. **Needs-aware "second half" shortlist.** After the flip, show three one-tap cards built from `candidates()` + `goneOdds()` + the open-slots set: the decision becomes "<5 s, pick one of three". This is the strongest expression of the Owner's Q6 words, but the shortlist rule is a product call — flag, do not implement.
9. **Flip threshold as a fraction of the user's total rounds.** Fixed 10 leaves ~4 simple rounds in a 12-team league and ~6 in a 32-team one. A fraction (e.g. 60% of that user's rounds) makes "second half" mean the same thing in every league size. Owner's call.
10. **Ship-readiness panel.** Expose AGENTS.md §10 (draft completes, season reaches the Super Bowl, no 390 px scroll, no console errors, weights change rankings, hashes re-pinned) as live indicators in a dev-only screen. This is tooling for the Architect/Owner, not player UI — keep it out of `single.html` unless they ask.
11. **Extend the port-boundary law.** F1 already catches an engine import planted in a screen. A dependency-graph check that every screen reaches the engine only through `seam.ts` would protect the cutover when two tracks merge.

## My calls, and what is not mine

My calls: Tier 1 and 2 are render/port-only and falsifiable; no engine, pin, label or colour was chosen. Not mine: the seven Owner decisions, the five Architect items, the 10-vs-fraction flip threshold, the prepared re-pin, and Block C. All flagged, none settled.

## Weakest point of these ideas

Idea 2 can become fiction if a `BoardRowVM` field is assumed rather than present — I read the VM in this review, but I have not enumerated every field. The rule I would hold: if the needed field is not already in the VM, stop and ask rather than invent a reason or reach into the engine.

## One question

When you say "improve the shell", is the win you want a calmer second half of the draft, or a shell a first-time player can read without a glossary?
