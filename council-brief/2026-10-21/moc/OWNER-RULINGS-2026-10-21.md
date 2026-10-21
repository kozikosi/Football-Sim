# The Owner's answers of 21 Oct — translated into exact changes, and the questions that remain

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: Owner's five items (21 Oct) | DATE: 2026-10-21T08:50:00Z**

**Status of each item:** 1 long snappers — **answered** · 2 player lists and names — **answered, with one
question left** · 3 league order — **answered and recorded** · 4 mobile — **answered, deliverable below** ·
5 git as the channel — **acted on**.

---

## 1 · Long snappers — answered, and it costs nothing

**The Owner's rule.** "The twelve long snappers can flex to punter for −4 or to kicker for −6 but you really
shouldn't even see them unless there aren't 32 punters."

**What that means as tables (for Claude's maths):**

| table | change |
|---|---|
| `NATURAL_SLOT_MAP` | add an `LS` key so the twelve records are **pool-visible** (today `POS_SLOT_MAP` has no `LS` entry, which is why the swap drops them) |
| `FLEX` | add `LS: { P1: 4, K: 6 }` — a long snapper fills the punter slot at **−4** or the kicker slot at **−6** |
| the pool taxonomy | map the pool's `LS` code to `LS` (identity) instead of dropping it, so the swap's report stops saying "dropped" for a position that now has a home |
| the swap tool | the drop count goes **12 → 0**; the draftable pool becomes the full 1,200, and the twelve sit in it as insurance |

**Why you will never see them (INFERRED from the matching's structure, and being verified):** there are
exactly **32 punters for 32 punter slots**, so a punter is always free at zero cost, while a long snapper
costs −4 to fill the same slot. A minimum-cost assignment therefore never uses a long snapper unless a
punter is missing — exactly the "unless there aren't 32 punters" case you described. The matching with
this rule added is running; the receipt will be at
`_agents/moc/evidence/long-snapper-rule-matching.txt` and I will append the number when it lands.

**What it does not change:** the 896-pick draft still fills at the same total flex penalty (54), because
the 32 punters cover the 32 punter slots. The rule adds insurance, not cost.

## 2 · The player lists and the names — answered, with one question left

**The Owner's rule.** "The lists I sent were not assembled to serve as a true player base, but I would like
all of those players to appear in the sim. All of my bespoke names should be converted to conventional names
for the purposes of the website."

**What that settles.**
- **Membership is the Owner's list, not a filtered pool.** Every player you listed appears in the
  simulation — the lists are not a candidate set to be trimmed by the council; the council's job is to
  *resolve* them (identify the person, get the rating), not to decide who is eligible.
- **Two names per record.** The source form (your bespoke label) and the **conventional display name**
  ("'77 Kareem" → "Kareem Abdul-Jabbar") are different fields. The conventional name is what the website
  shows; the source label stays in the provenance layer so the resolution is auditable.
- This also settles the earlier "1,148 draftable" framing: the pool is not "whatever the swap keeps", it
  is "everyone on the list, resolved and rated".

**The one question left (it blocks priorities 3 and 4, so it is worth answering now).** The all-time NBA
material is a first-name-and-peak-year list: **377 of 494 candidate rows are a single token**, and **193
carry a numeric prefix that also names somebody else** — the prefix is a peak-season hint, not an
identifier. So the list can only be read as *people* against something external. **Do you want a separate
canonical all-time roster (an NBA 75 / all-time teams list) to resolve the names against, with the 2K
ratings attached afterwards — or do you want the names resolved by a different route?** *Default: a separate
canonical roster for identity, the 2K file for ratings only.* *Cost of being wrong: the current-NBA and
all-time-NBA pools would both have to be re-resolved — this is the cheapest moment to settle it, before
any NBA work starts.*

## 3 · The league order — answered and recorded

Recorded verbatim as the canonical roadmap in **`LEAGUE-ROADMAP-2026-10-21.md`**: the top 21 in your order
(NFL 2027 → NFL all-time → NBA 2027 → NBA all-time → WNBA 2027 → EPL 2027 → EPL all-time → Champions
League 2027 → Champions League all-time → MLB 2027 → MLB all-time → NHL 2027 → NHL all-time → La Liga 2027
→ La Liga all-time → Bundesliga 2027 → Bundesliga all-time → Serie A 2027 → Serie A all-time → Ligue 1 2027 →
Ligue 1 all-time), then your 78 low-priority single-season items, with your instruction that **no files are
created and no work starts toward them until the top 21 are built**.

**What this closes:** the "at least eight simulations" goal, the baseball/soccer/hockey hypotheses, and the
soccer eligibility question — the leagues are named, and your order is the order. A ranking source is now
only needed to *seed* the leagues, not to choose them.

## 4 · Mobile — answered, deliverable written

**The deliverable: `_agents/moc/notes/MOBILE-TOP-TEN.md`** — ten items in impact order, each with the
measurement, a critique, and an idea, plus a short "obvious bugs" list. Measured on the candidate at
390×844: the layout genuinely does not overflow (0 elements past the viewport, 0 overflowing scrollers,
0 clipped or covered, across the landing view and three tabs), so the problems are **reachability, not
overflow**. The biggest ones: the six footer navigation buttons are **24 px tall**; the Team Rankings view
has **52 interactive elements under 44 px**; the preseason primary action is **119 px below the fold** (and
y=1939 on desktop); the Team Rankings sliders are **display-only**; the hero clips 40 px of its own
decoration; and the gate's viewport test is horizontal-only, so a green phone run is not evidence of phone
usability.

## 5 · Git as the channel — acted on

Published on a new branch so Claude and Codex can read it online: the collective brief, this note, the
league roadmap, the mobile top-ten, the Claude prompt and the Owner question list, plus the other seats'
parallel documents (MiniMax's Claude prompt and Owner questions, DS's handoff and Owner decisions, Pickle's
compiled brief, BOC's evidence/repo-truth section). Material that only concerns the OpenChamber or Kilo
sessions stays local. `main` is untouched; the evidence artefacts (26 captures, the 65.9 MB trace, the
result JSON) stay on the release rather than in git history.

## The questions that remain for the Owner (four, not ten)

1. **The NBA identity roster** (§2) — the only one that blocks work. Default: a separate canonical roster
   for identity, 2K for ratings. Cost of being wrong: both NBA pools re-resolved.
2. **V21's definition of done** — what "beautiful and sophisticated" means as a gate, plus the display-only
   sliders (wire them, or label them) and the 390 px clause set. Default: no new features until all-time NFL
   starts, the #7 pinning is in, and the sliders are labelled.
3. **Publication and ownership** — who pushes the platform tree and the candidate (they are on no branch),
   whether the published evidence release stays public, and who chases the council's open questions
   (six asked, none answered). Default: commit to a working branch this week, keep the release published,
   one coordinator owns the queue.
4. **The long-snapper insurance** — confirm that keeping the twelve in the pool as −4 insurance, rather
   than dropping them, is what you want in the shipped rule.

**Architect decisions (for Claude, unchanged and still blocking):** the promotion sequence · implement
#12 with the rule set as ruled and the visible-vs-assignable invariant respected · the canonical E2E suite
and an honest evidence record (supersede, do not edit) · #7 pinning and the measurement behind it · the two
code-health items (`POSITION_TIER`/`TIER_BONUS` are dead; 58 unseeded `Math.random()` sites).

---

## Measured: the long-snapper rule is free, and the twelve never appear

The matching was re-run with the Owner's rule added (`LS` visible in `NATURAL_SLOT_MAP`, `FLEX.LS = {P1: 4,
K: 6}`):

```
D - FB/P slots + the long-snapper rule:  flow 896/896 · penalty 54 · histogram {0: 880, 2: 5, 4: 11}
     P1  {'P': 32}          (all 32 punters at their own slot, zero cost)
     K   {'K': 32}
     FB1 {'HB': 25, 'FB': 7}
     long snappers fielded: 0
```

**VERIFIED.** The rule changes nothing: the same 896/896 at the same penalty 54, and the twelve long snappers
are **never fielded** — exactly as the Owner predicted ("you really shouldn't even see them unless there
aren't 32 punters"). They cost nothing and cover the case where a punter is missing.
Receipt: `_agents/moc/evidence/long-snapper-rule-matching.txt`.
