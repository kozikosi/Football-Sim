# Five decisions for the Owner — 21 Oct 2026

Each has a recommended default and the cost of being wrong. Answer with a word or a number.

---

## O1. What is this build called?

`AGENTS.md` says the V20 merge candidate must never be described as V21. Your later direction says "build now V21, next edition V22". Those cannot both hold.

- **Default:** the **next build you receive** is V21. Today's file stays "the V20 merge candidate".
- **Cost if wrong:** every note, the board and Claude's prompt mislabel the build — and a V20 build described as V21 is the exact error `AGENTS.md` was written to prevent.

---

## O2. Is the 3-4 a real front or a label?

Your list gives the 3-4 one defensive tackle and four linebackers; the current 4-3 has two tackles and three linebackers. Same seven bodies, distributed differently.

- **Default:** **a real front** — because your list describes one.
- **Cost if wrong:** a display-only relabel gives you a 3-4 on the screen and a 4-3 on the field. A real front changes `ROSTER_SLOTS`, `teamRatings`, the pool's legal positions and the CPU's valuation, and is several times the work.

---

## O3. In a 3-4, who comes off for CB3/Nickel?

You ruled "when the CB3/Nickel comes on the field, the LB3/SAM comes off". There is no SAM in the 3-4 front.

- **Default:** **OLB2** — the closest analogue to SAM.
- **Cost if wrong:** the Guide teaches a rule that half the league cannot follow, and the lineup optimiser removes the wrong body.

---

## O4. The Stars of the Game threshold for quarterbacks

You ruled offensive players need at least 60 yards. A quarterback with 250 passing yards passes trivially; one with 180 yards and 2 touchdowns fails.

- **Default:** **RB/WR/TE at 60 yards; QB at 200 passing yards or 2+ touchdowns.**
- **Cost if wrong:** good quarterback games vanish from the stars while a 61-yard receiver stays in.

---

## O5. The draft gets thinner

896 picks from 1,188 draftable is 1.33 players per pick, against 1.38 today (1,148 / 832). The pool still never binds, but the last rounds reach further down.

- **Default:** **accept 1.33 for this build**; target ~1,500 in the all-time intake.
- **Cost if wrong:** the closing rounds fill with players who would have gone undrafted, and the draft reads as padded.

---

## Deferrable — decided, no action needed from you now

| Item | State |
|---|---|
| Architecture (#8) | You delegated it; DS + Pickle decided; only Claude's ratification remains |
| Week 1 display | Implemented and passing — closed |
| Archived agents (Liquid, Glyph, Omni, Cohere) | Deleted what was safe; cited entries preserved |
| `core/` stub | Deleted — it claimed a provenance that never existed and did not parse |
| FB/P slots (#12) | Ruled by you: 28 rounds, 896 picks, no flex cost for either |
