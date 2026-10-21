# Handoff to Claude — Owner instructions of 2026-10-21

**From:** DS (advisory) · **Via:** the Owner, who relays · **Applies to:** `NFL Draft Simulator merged.html`
@ sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B.

**Read this first:** the Owner gave these instructions directly to DS on 2026-10-21 and asked
specifically that Claude be told what was instructed and what work has been done. This document is
that notice. It contains no product edit — DS does not edit the product file.

---

## 1. #7 — Pinned navigation and pinned primary action — **Owner approved**

The Owner's decision: *"Pinned navigation and a pinned primary action."*

**The defect being fixed**, measured on the pinned build:

| Viewport | Element | Position | Verdict |
|---|---|---|---|
| 1280×900 desktop | `#tabRankingsBtn` | y=1939, `maxScrollY` 962 | 1039 px below the fold |
| 390×844 phone | `#startSeasonBtn` | spans 963–1007 | 163 px below the fold |
| preseason | `#beginSeasonBtn` | foot of a 7,483 px page | ~6,600 px of scrolling |

**Root cause, verified in the CSS:** `.tabs{display:flex; gap:8px; margin-bottom:16px; flex-wrap:wrap}`
— ordinary document flow. The build has four `position:fixed` rules (`.fxbanner`, `.fxtoast`,
`.confirm-ov`, plus one) and one `sticky`; none is the navigation. Navigation and primary actions sit
wherever the page ends.

**Why no existing test caught it:** `tests/e2e-smoke.mjs:410` computes `primaryAction.inViewport` and
`headingVisible.inViewport` (probe at lines 125–138) but the gate only asserts `clippedCount`,
`coveredCount` and `unscrollable`. A programmatic `getElementById().click()` works perfectly on an
element nobody can see. `tests/openchamber-e2e-v2.spec.js:193` is the only assertion that asks, and it
is the one reporting `preseason heading=true nav=true action=false`.

**Specification in flight:** VLOC, `_agents/vloc/v21-visual/PINNED-NAV-SPEC.md` — what is pinned at
390/768/1280, scroll behaviour, collision rules against the five existing floating rules, safe-area
insets, and the accessibility minimum. Mobile measurements: Super, `_agents/super/notes/MOBILE-AUDIT-390.md`.

**Please confirm or overrule** the shape before it is built.

---

## 2. #12 — FB and Punter slots — **Owner's explicit instruction**

The Owner's words, unedited:

> "FB and Punter need to be created as slots on the draft board. Do not alter any player position
> descriptions. Any Running back (RB) or full back (FB) or Tight End (TE) are available to play FB at
> no flex cost. Kickers (K) and Punters (P) are available to be punters at no draft cost. The
> underlying math for how they work will be created by Claude, but maybe other agents can help set the
> foundations for him."

### The confirmed rules — Owner rulings of 21 Oct

The Owner resolved every open point. Verbatim:

> "Sorry I mean to say no flex cost for the punter as well. Same logic as the fullback. **28 rounds.**"

> "Running back and Half back can be used interchangeably amongst the agents but try to preserve how
> they're labelled on the site. **HBs can become FBs at no flex cost.**"

> "**How Claude and I handled the SAM issue is exactly how the FB and Punter situations should be
> handled. Other positions can flex into the role. Don't change any flex penalties. Just add the new
> rules for FB and P.**"

1. FB and P become **slots on the draft board**. Both are **drafted**.
2. **28 rounds, 896 picks** (32 teams × 28). Reading B is withdrawn — there is no such thing as a
   slot that costs no pick.
3. **No player position description changes.** A player's listed position is never rewritten.
4. HB, FB, TE may play the FB slot at **no flex cost** — zero penalty.
5. K and P may play the P slot at **no flex cost** — zero penalty. The Owner's earlier phrase "no
   draft cost" meant this, not "free of a pick".
6. **Do not change any existing flex penalty.** Add rules for FB and P only. Nothing in `FLEX` that
   already exists is edited.
7. **SAM is the precedent, not a defect.** A position can be scarce in the pool and be filled by
   other positions flexing in. `SAM` has 5 records for 32 slots and works. FB and P follow the same
   pattern. Scarcity is not a reason to expand the pool or to loosen a penalty.
8. **Claude writes the underlying math.** Foundations only from everyone else.

### Foundations already laid — BOC, verified by reading

`_agents/boc/notes/FB-P-SLOT-FOUNDATIONS.md`. Line numbers against the pinned build:

| Structure | Line | Current state |
|---|---|---|
| `ROSTER_SLOTS` | 924 | 26 entries, no FB, no P |
| `TOTAL_ROUNDS` | 925 | derives 832 picks at 32×26 |
| `SLOT_FAMILY` | 931 | needs `FB:'FB'`, `P:'P'` |
| `NATURAL_SLOT_MAP` | 932–938 | no FB or P entries |
| `FLEX` | 940–952 | no FB or P keys |
| `POS_SLOT_MAP` | 962–970 | returns `[]` for FB and P, so both are invisible to the pool |
| `effOvr` | 978 | where "no flex cost" becomes zero penalty |
| `optimalLineup` | 1206 | Hungarian assignment, iterates `ROSTER_SLOTS` |
| `teamRatings` | 1988 | nine unit ratings |
| `replacementLevels` | 1352 | iterates `ROSTER_SLOTS` |

Arithmetic support: MiMo, `_agents/mimo/notes/FB-P-POOL-IMPACT.md` (in flight).

### The trap that must be fixed in the same change

The pool swap that produces `b2e097f2879a8928` drops exactly **52 records: 32 P, 12 LS, 8 FB** — it
drops them precisely because no slot code matches them. **Under either reading, 40 of those 52 become
draftable.** The swap therefore stops being behaviourally inert: it would silently drop players the
draft now needs. Any test asserting 1,148 draftable records breaks at the same moment.

Verified count: 32 P + 8 FB + 12 LS = 52.

### Pool supply — scarcity is expected, and that is the ruling

Measured from the pinned build's own `PLAYERS` array (1,200 records):

| Group | Count | Demand | Net |
|---|---|---|---|
| HB 89 · FB 8 · TE 53 | **150** | 32 teams × 5 backfield slots = 160 | **−10** |
| K 32 · P 32 | **64** | 32 teams × 2 kicking slots = 64 | **0 — exact parity** |

**The Owner has ruled on this: it is expected, not a defect.** `SAM` is the precedent — 5 records for
32 slots, 27 teams flex someone in, and it works. FB and P follow the same pattern. **Do not expand the
pool to close the gap. Do not loosen a flex penalty.** The −10 backfield gap is absorbed exactly the
way SAM's 27-player gap is.

**Trap 1 — vocabulary, and the Owner has ruled here too.** "Running back and Half back can be used
interchangeably amongst the agents but try to preserve how they're labelled on the site." So: prose may
say RB or HB. **The site keeps its labels** — players are coded `HB` (89 records), slots are named
`RB1`/`RB2`, and `NATURAL_SLOT_MAP` bridges them. Do not rename either. Do not invent an `RB` player
code; it would match nothing.

**Trap 2 — the one that is still live: the pool swap deletes the new slots' supply.** See the section
above. This is not about scarcity — it is about a tool that throws away the players the new slots need,
silently, with no error. The SAM pattern cannot rescue it: one K cannot occupy the K slot and the P
slot at the same time, so 32 kickers cannot cover 64 kicking slots. Keep `FB` and `P`; drop only `LS`.

**And the swap fix, stated precisely:** keep FB and P, drop only LS 12. Draftable goes 1,148 → **1,188**.

### Ground truth so nothing is invented

`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K` and `RATING_SPECS` are protected under
AGENTS.md. BOC proposed and did not apply. Nothing in this handoff changes a constant.

---

## 3. #8 — Architecture: **your call, and the record must say so**

The Owner's instruction: DS decides provisionally, but *"in every document let Claude know what you
did and that Claude needs to review your changes and decide on the final architecture."*

So: the provisional layout (folder-per-sim, five directories declared non-authoritative, the NFL file
not moving this round, a written trigger for extracting `shared/`) is recorded in
`_agents/ds/notes/OWNER-DECISIONS-2026-10-21.md` §8 and co-signed by Pickle in
`_agents/pickle/notes/ARCHITECTURE-RATIFICATION.md`.

**Claude reviews it and may reverse any part of it without further Owner approval.** Every document
produced under it carries that clause verbatim.

---

## 4. What DS has not done

- No edit to `NFL Draft Simulator.html`.
- No change to any protected constant.
- No commit, push, branch, tag or PR.
- No edit to the bulletin while ten sessions are appending to it.

The product work in §1 and §2 is Claude's; this is the instruction, the measurements and the
foundations, which is what the Owner asked be passed on.
