# PROMPT — for DS, GLM and PICKLE: advise on direction, innovate, brainstorm
**From:** INKLING (council seat) · **Date:** 2026-11-15 · **For:** DS · GLM · PICKLE — relayed by the Owner
**Delivery:** file your output in an inbox file on `council/<seat>` (`inbox/<UTC>-<seat>-direction-brainstorm.md`) · if you are drawing heavily, `*_YOUR_NAME_*/notes/` works too.

---

You are a council member with fresh access to the project. The Owner has asked for your advice on where this project should go next — not a verdict on the framework, not a re-run of any settled test, and not another nine-arm table. **He wants judgment: direction, innovation, brainstorm, and the shape of the work that is still left.**

**Read this whole file, then write before you reply.** If your answer fits in less than 1,000 words per section, compress; if it needs more, take the room. Number your answers §1–§5.

## 0 · State of play — what is settled, and what is yours to see fresh

Settled and carried in `AGENTS.md` (Owner's 2026-11-15 rulings, verbatim quote may be re-read in it):
**R-1** framework narrowed to **two arms** (Vue 3 + Vite vs Svelte 5 + Vite; Z.ai builds both; measurement decides) · **R-2** engine pin **`d3bd81d2`** for every track (old pin is stale on flex — REV 4 at `flex.ts:9` in old trees) · **R-3** save = one blob + version check (the 12-month transaction-safe path, not a compassionate v0) · **R-5** Title Odds rejected · **R-6** λ accepted (estimators bound; pooled rule wins; min resolvable cell ≈ 541 games; REG pooled clears 4.9×, POST never at n = 122-a-result-not-a-failure) · **R-7** flex asymmetries deliberate — ILB is the more valuable player, table stands · **R-8** ratings not yet · **R-9** React out (the arm is removed, deps being removed) · **R-10** no publish · **R-11** red tests are to be fixed, not carried · **R-12** player pool frozen at **1,953** · **R-13** (from R-1, same).

**Other settlements from the delivery chain — do not re-measure:** engine migration `P-318` landed as a ValueProvider seam (the `SLOTS[].weight` path is retired); `core/pmath.ts` landed (portable math); the **`99-rule live flex table** at sha256 `0a26d7c225cb7ec8…`, tiers {23/43/10/23}, `QB→FS = 12` governs everywhere, retired REV 4 (107 rules) lives only inside pin `4ca9a071` and one `.json` in a delivery tree; the **pool gap closed** (1,953 = 1,941 + 12 free agents − 32 LS = **1,921**); the **player-game join built** (`data/player-game/player_game_2016-2025.csv.gz`, 253,107 player-games, REG + split verified); **SAVE-1** closed; **D.8 playoff-HFA recorded-dead** (strength-controlled +1.35 pts, CI crosses 0); **G-10 everything-at-ci.ts** remains 0 contacts; **the two-arm framework build measured** (five ties, one separation: Svelte −11.6 KB gzip; four-slice slope **inside the band, no signal**); **the Owner's doctrine on output** (draft board flat for dependencies, chips not prose, sentences only in the Guide); **Slice 4's feed** built and battery-backed; **Slice 5's brag-card** is a head-start in the receipts, not a rebuild target.

**What is in flight and needs your eyes, not only your hands:** the 1b vertical slice (Architect's current next step per S1+S2's position in the queue); the **pin migration** at the hands of the Architect (read his first, then yours); the **flexed-85+ rise** after the values measurement (~+8% elite flexed per draft — the Owner wants the number; nobody is to act on it without his word); the **λ Lab run** awaiting the 1b base; the **Snapshot Bust** and whatever Claude's engine casework surfaces along the way.

You do not need to sit on any side of any of these. You need to read the shape and speak to it.

## 1 · Direction: where should Claude and Z.ai go next?

The Owner wants advice not only on what to do but **on what to stop doing before more gold gets burned on the same seams**. Write at least one paragraph each to:

(a) **Claude (Architect)** — the engine is hot and moving. Where would you spend the next three sessions, and on what would you *not* spend one? P-318 (the ValueProvider seam) landed; the next engine milestone is …? §0 1b (vertical slice) or the pin migration first? The `feed.ts:59–60` OT clock defect (`Q4 -5:00` negative remainder — file and line quoted in the delivery) and the `crossorigin` file:// CORS boot finding — these both live on Claude's desk already; is there anyone else who could take either, and if so why? The `flexed-85+` rise — keep the number quiet in a word or serve it now?

(b) **Z.ai (Executor)** — the engine is his to *use*, not to edit; the shell is his to build. On current state: the two-arm comparison is measured to the satisfaction of every seat who has read it; Slice 4 is battery-backed and pending the Owner's publish action; Slice 5 has a head-start in receipts; Slice 6 exists only as an approved brief from an earlier prompt. What should he do next, in what order, and why? Should the two-arm arms **both keep being built to parity** until a ruling lands, or is there an argument the second arm gets paused now?

(c) **Both together** — where does the work collide? Name any cross-cutting artifact (the pin, the published w89, the w88 Wins table inherited from the old pin, the `AGENTS.md` style rules, the w89 DOM at l.13182 with `ZPB_SLOTS_WINS`) that would silently decay if nobody owned it — and who should arguably hold it.

(d) **What to stop doing.** Pick one thing the council does that costs more than it returns; justify it; name what should replace it. Bluntly and without softening (the Council's charter is advice, not politeness).

## 2 · New tests for still-needed features

**You may propose tests that do not yet exist.** The Owner has asked: "What should we build tests for, so that when these features land, they are proven, not green-washed?" Write tests for any of:

- **Slice 5 (shareables/brag-card)**: a card the owner can copy and share — `Cmd+C` output, `Cmd+C` paste, `Cmd+P` print — what proves each property: content, color fidelity, only the user's own team rendered, plain JSON escapes, and the printable-pass verified via SVG or PNG hashing.
- **Slice 6 (post-game summary / week card)**: I mean whatever the Owner's next feature is — model a test skeleton, name the subjects, name the gates.
- **The envelope/pool tests at scale**: save/load/corrupt-refused/newer-refused across a hundred-drafts battery with seeds fixed — write the test list and name the failure mode.
- **Engine oracles layered across pins**: any same-seed differential run you (or Claude) can write or spec, now that two engines are byte-known.
- **The w88–w89 Wins-table retirement**: after the pin migration lands, propose the test that retires the w88 measurement and re-pins to the new numbers.
- **Anything else you would write if you were paid by the line**.

**For each test you propose, bring five things:**
- the data/repo file it would run against,
- the assertion (one line),
- the failure case it would catch or pass,
- the receipt you would attach,
- and one line naming the branch/worktree (start from the current tip on the Architect's branch or council/inkling for byte-verified copies).

## 3 · Innovations and brainstorming — anything, anywhere

The Owner asked for "any aspect of the project" — not limited to performance, UI, tests, docs, authority, process. Section this section the way you find honestly abundant evidence. Name at least **three** clearly distinct innovations; label each as `MEASURED`, `INFERRED`, or `UNKNOWN` following the seats' discipline, and keep each one **within reach of one sitting**. Every innovation should come with enough instruction that another seat could pick it up and not guess:

- The provocative case: is there any seat's job for which there is no assigned measurement today, and could one be written cheaply?
- The obvious-but-unclaimed case: what does **the w89 shell's** evidence chug — DOM facts, paint timings, the `ZPB_SLOTS_WINS` block at l.13182, the w89 opportunity to re-measure the w89 front-to-front against the new pin — and what should the Owner know about it at this point?
- The contrarian case: is anything the Council calls "settled" settled in a way that should not survive the next ruling — and if so, which?

## 4 · Framework choice — narrowed to two arms, and the ruling is yours to argue

The framework field narrowed to two arms by the Owner (R-1). Your advice is sought on that narrowing, if — but only if — you have something direct to say. Answer:

1. Is there an argument either arm is a worse maintainer choice for a non-specialist product owner with agent-maintained code, and which direction would you bet the Owner's ruling goes?
2. What marketing piece should each arm ship to the Owner (one paragraph each arm: name, purpose, one claim, one receipt) so he can tell at a glance which is his product?
3. Whatever you answer, does it survive: (a) the four-slice measurement's within-band result; (b) the bundle delta; (c) the agent-ergonomics gap not yet measured?

Do not repeat what Claude, BEAM, GLYPH, OR, ERNIE, INKLING have already said. Refer to them if you disagree.

## 5 · Disposition — what would you change if you ran this project for thirty minutes

In one closing paragraph: the one move you would make first if you had the Owner's authority for a single day. Name one thing to stop, one to start, one to keep. Do not give reflexive answers — read the whole project inventory before you answer — and name the risk that would bite by doing it.

## 6 · Filing and discipline

- File one inbox entry on your branch: `inbox/<UTC>-<seat>-direction-brainstorm.md` with the same four-lines-per-claim discipline everyone uses (cwd, command, ref@sha, output). Label every claim: **VERIFIED** / **REPORTED** / **INFERRED** / **UNKNOWN**.
- Do not edit the engine, the product, `AGENTS.md`, `.github/workflows/`, flex tables, `draft.ts`, `lineup.ts`, `slots.ts`, `value.ts` — those are the Architect's/owner's. Do not publish, tag, or merge anything. You may *propose* changes; you may not *make* them.
- No re-measuring the settled items in §0 (`the pool gap`,`D.8`, `SAVE-1`) unless your head says one of them is wrong — and if it is, say so with numbers.
- Risk lists are allowed and useful. So is “nothing to say here.” A blank section is not a defect.

— INKLING · 2026-11-15 · the Owner's two-word ask: “Direction?”