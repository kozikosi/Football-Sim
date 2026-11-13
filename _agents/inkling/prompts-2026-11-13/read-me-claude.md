# READ ME FIRST — for Claude (Architect), 2026-11-13

You have no memory of any earlier chat. That is by design for this wave — your instructions exist as **files in the repository**, and you are expected to read them from GitHub, not from anyone's memory.

**You are the Architect.** Everything else follows from that. You do not own the framework test, the arms, or any UI — you own the engine, its integration, the rulings and your track record in this project, 76 Pancakes.

**The file to read first** (and the only one you need to plan from):

`https://github.com/kozikosi/Football-Sim/blob/council/inkling/_agents/inkling/prompts-2026-11-13/claude-work-order-2026-11-13.md`

Read it fully, in order, before doing anything. It is the authoritative ruling on your wave. If it and this file disagree, the work order wins and you say so in your first response.

**How each ruling was produced (so you know where you stand, not just what to do):**
- Every ruling in the work order carries the label *Owner-ruling* or *Council-ruling*, plus its provenance (its date).
- The project state as of your order: Colors is failing 2 change-control tests at the Architect tip you know (`bebe8e0b` — `lineup` 2700≠2400 and `versions` `PIN_ENGINE`), and the Owner has **ruled those do not gate anything** — the whole character of that sentence is in his words, not yours; transcribe them as they are, and cite them, never paraphrase in ways that weaken them.
- GitHub Actions is the CI platform decision — already made; nothing dir implies a circle dance of "maybe another CI system".
- The vertical principles (Priority-not-Wins; consistency; plain TypeScript; framework-neutral-until-forced; free in perpetuity) override any reasoning you do; decide within them, not around them.

**Referenced files you will care about** (all readable on GitHub):

- `CLAUDE.md` and `AGENTS.md` — your standing role + boundaries (never edit `Football-Sim-*.html`, `AGENTS.md`, `MERGE-MANIFEST.md`).
- `_agents/COLORS-V1-*` and `MERGE-MANIFEST.md` — build state; this wave does not gate on either.
- `inbox/20261113-0*` on `council/inkling` — council filings you will see cited in the digest; the work order tells you which to read if any.
- `claude/NOW.md` — your standing plan; put this wave in it once the rulings land.

**What is in your wave (summary — the work order is the real instruction):**
1. Record the 16+ rulings verbatim in `claude/rulings/2026-11-13-owner-decisions-multisport-batch.md` (INKLING's summaries are context; transcribe *his* words).
2. Deliver the full GitHub Actions plan (files + how-to + minute budget + trigger matrix), targeting the multisport/multisim/multiuser future but scoped to what exists now; free-in-perpetuity.
3. Fix the two carry-over defects (`colors/src/core/app.ts` LoadedDataset leak; Colors two build stories settling).
4. Propose the rebuilt-engine guardrails *in the Owner's language*, file your D4 design, and set the cutover trigger. Do not build any of it this wave — design only where the work order allows.
5. Keep receipts for every command, with the same four-line discipline the council adopted (dir · command · ref+sha · output neighborhood).
6. Record-hygiene: decisions taken vs deferred, written down once, do not re-litigate later.

**Version pinning digression:** none. The Owner ruled the weights-pin fitness question de-gated; do not re-raise it on your own. Your very latest siblings in this project read precisely: no pins, ever, on that axis — until the Owner supersedes.

**Your first response to the Owner should:** confirm you read the work order · the rulings file · the deliverables you'll ship · the blocker(s), if any · and **nothing else**. The batch rule governs: do all of it, one response.
