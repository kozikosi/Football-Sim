# COLLECTIVE BRIEF — 21 Oct 2026 (merged from all seats)

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: Merge of the parallel Owner→Claude deliverables | DATE: 2026-10-21T08:05:00Z**

**Inputs merged (all seats, all written independently today):**
`_agents/moc/notes/CLAUDE-PROMPT-2026-10-21.md` (10 questions) · `_agents/moc/notes/OWNER-QUESTIONS-2026-10-21.md` (5) ·
`SIM-PLATFORM/PROMPT-TO-CLAUDE-2026-10-21.md` + `SIM-PLATFORM/OWNER-QUESTIONS-2026-10-21.md` (MiniMax, 5 + 5) ·
`_agents/ds/notes/CLAUDE-HANDOFF-2026-10-21.md` + `OWNER-DECISIONS-2026-10-21.md` (DS) ·
`_agents/pickle/notes/owner-brief-batch-compiled.md` (Pickle) · `_agents/boc/notes/section5-evidence-repo-truth.md` (BOC) ·
`_agents/longcat/evidence/` (LongCat's matching, P0 re-measure, six real drafts) · `_agents/ultra/notes/` (A8 inventory) ·
`_agents/lightning/notes/` (protocol) · `_agents/mimo/notes/` (arithmetic) · `_agents/vloc/notes/` (NBA).

## The Owner's rulings of 21 Oct, applied to the question lists

| ruling | effect on the open questions |
|---|---|
| **#7 pinned nav — APPROVED** | becomes a **Claude** question (is it pinned in his build?), not an Owner one |
| **#8 architecture — DS decides provisionally, Claude reviews** | leaves the Owner's list; becomes Claude's Q1 |
| **#12 FB/P — ruled** (FB and P are slots, 28 rounds, RB/FB/TE→FB free, K/P→punter free, no position-description change, Claude builds the maths) | leaves the Owner's list; becomes Claude's Q2. **The pool scarcity is also ruled "expected, not a defect" — so my earlier "intake minimums" recommendation is withdrawn.** |
| **#15 decision record — DS decides and executes** | leaves the Owner's list |
| **#16 what is in the repository — DS decides** | leaves the Owner's list, except the *publication* half, which is still an Owner choice |

## The five questions that remain for the Owner

1. **The twelve long snappers** — the only records the pool swap still drops.
2. **The NBA identity roster** — is the 2K-supplied material also the list of *who* the players are, or a
   separate canonical all-time roster? (Blocks priorities 3 and 4.)
3. **The soccer league list** — approve the ranking source and the cutoff (Ultra and MiMo converged).
4. **V21's definition of done** — what "beautiful and sophisticated" means as a gate, plus the
   display-only sliders and the 390 px clause set.
5. **Publication and who chases** — who publishes the platform tree and the candidate, whether the
   published evidence release stays public, and who owns the council's open questions.

## The five questions for Claude (the collective determination)

**Q1 `[BLOCKING]` The promotion sequence.** `origin/main` holds 29 files, exactly one of them ours; the
candidate, the E2E suites and the platform tree are on **no branch at all**. What goes onto which branch, and
in what order? *Default:* commit the candidate, the suites and the tree onto a working branch now, promote
`main` afterwards. *Cost:* another loss event, or a repo no fresh clone can reproduce from.

**Q2 `[BLOCKING]` Implement #12 — the FB/P slots — with the rule set as ruled, and with the unassignable
invariant.** 28 rounds (896 picks); `RB`, `FB` and `TE` fill `FB1` free; `K` and `P` fill `P1` free; no
position-description changes; no flex-penalty changes; Claude builds the maths. The invariant to respect: **a
record can be pool-visible and still unassignable** (1,188 visible → 1,148 assignable), and a draft would
read "896/896 complete" with 40 players nobody could field. The slots and their flex rules must land
together. *Default:* implement as ruled, with the 12 LS still dropped. *Cost:* the "visible ≠ assignable"
failure is the one that would make the board lie.

**Q3 `[BLOCKING]` The canonical E2E suite and an honest evidence record.** The v2 spec canonical, the driver
as the executable, GPT's schema as the evidence format, and the **hand-edited record superseded by a new
version rather than edited** (`result.v2.proposed.json`, `ccddff0d…`, schema-valid, cites the original
`d64a5f9b…`). Plus the three harness fixes: a vertical term in the gate's viewport test, a non-blocking
decorative clip counter, and JSON-clean receipts. *Cost:* without the vertical term, a green gate keeps
meaning something weaker than it appears to.

**Q4 `[NOW]` #7 — is the navigation pinned in your build, and do you accept the measurement?** The preseason
primary action sits at `top: 963, bottom: 1007` in a 390×844 viewport — **119 px below the fold** — and at
**y=1939 on a 1280×900 desktop**. Two independent re-measurements agree on the position (LongCat 963, DS
963.03). *Default:* fix the product. *Cost:* the Owner meets this on the first click of the season flow.

**Q5 `[NOW]` Two code-health questions.** `POSITION_TIER`/`TIER_BONUS` are **never read** — the "+14 QB tier
bonus" several council notes cite is not live, so those notes need correcting or the constants need wiring.
And the build has **58 unseeded `Math.random()` sites**, so a champion differs every run and no receipt can be
cited for realism. *Default:* delete the dead constants and correct the notes; treat the RNG as a V21
decision.

## Conflicts the merge resolved

- **The 390 px P0's position *does* reproduce.** MiniMax's Q4 says "the page height reproduces, the button
  position does not"; LongCat's re-measure (963) and DS's independent rerun (963.03) agree, so the collective
  position is that the position reproduces. **New fact from DS's notes, previously in nobody's summary: the
  same defect appears at y=1939 on a 1280×900 desktop — it is not only a phone problem.**
- **"The backfield is 10 short" is not the collective finding.** The backfield is **+1** (HB 89 + FB 8 = 97
  for 96 slots); the −10 is tight ends (TE 53 for 64). Under the Owner's "scarcity is expected" ruling this
  changes nothing about the decision and everything about the explanation.
- **My "expand the intake" recommendation is withdrawn** — the Owner ruled that scarcity is expected and the
  pool should not be expanded to close the gap and no flex penalty should be loosened.

---

## Addendum — the Owner's long-snapper rule, measured (21 Oct)

```
D - FB/P slots + the long-snapper rule (LS->punter -4, LS->kicker -6):
  flow 896/896 · penalty 54 · histogram {0: 880, 2: 5, 4: 11}
  P1 {'P': 32} · K {'K': 32} · FB1 {'HB': 25, 'FB': 7} · long snappers fielded: 0
```

**VERIFIED**: with `LS` visible and `FLEX.LS = {P1: 4, K: 6}`, the draft still fills 896/896 at the same
penalty 54, and the twelve long snappers are **never fielded** — the Owner's expectation confirmed. The rule
is free insurance, not a cost. Receipt: `_agents/moc/evidence/long-snapper-rule-matching.txt`.
