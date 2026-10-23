# P3 · The game review, rebuilt as graphics — the block-by-block spec

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: P3 item 2 — the game review screen | DATE: 2026-10-22T06:00:00Z**

**A proposal, in the §6 sense.** It uses the seven components from `_agents/moc/notes/p3-shared-visual-system.md` (M-20261022-b) — one vocabulary, not a second design language. The Architect owns the product file; this is a change set.

**Why this screen first.** It is the largest text wall in the product, and the Owner's own criterion is measurable here: *"most of this data can be represented by graphics instead of sentences… only the clutch narration, the star praise and the next-round hype need sentences."* The review is where that test bites hardest.

## 1 · The screen, in order, with the shape each block takes

| # | the block today | becomes | the data it needs | the one line it says |
|---|---|---|---|---|
| 1 | the recap paragraph — *"The Chiefs finished it off, 28–14. The Chiefs had ripped off 21 unanswered points in the third quarter along the way."* | **gone** | – | – |
| 2 | the quarter lines — *"First quarter: … Second quarter: … It was tied 7–7 at the half. Third quarter: … Fourth quarter: …"* | **`.box-row`s, 1st / 2nd / 3rd / 4th** — a fixed label column, the score, and the per-quarter text; the half-time and the running score become a small `.bar-row` of the four quarter scores | the quarter list and each quarter's score | nothing |
| 3 | the scoring lines — *"D'Andre Swift ran it in for a touchdown (Chiefs 7–0)."* | **box-score lines**: *"Rushing TD · D'Andre Swift (Chiefs 7–0)"* — the verb becomes a label, not a sentence | the scoring event list | nothing |
| 4 | *"Turnovers: The Chiefs came out one turnover ahead: Geno Smith was intercepted by Jaylon Johnson in the fourth quarter."* | **a score line** — *"Turnovers: Chiefs 1 - 0 Vikings"* — then one line per turnover with its quarter: *"Jaylon Johnson interception (4th Q)"* | the turnover list and the count | nothing |
| 5 | *"Stars of the game: Evan Engram (Chiefs) had a strong day, hauling in 3 of 4 targets for 26 yards and 1 touchdown. …"* | **a `.star` glyph** where the words were, then **one `.stat-card` per star** — the name, the one line of facts, and the grade **never shown** | the star list | the praise, and only for a 90+ performance |
| 6 | *"The game ball goes to Evan Engram of the Chiefs (3/4 rec, 26 yds, 1 TD)!"* | **the ball holder's `.stat-card`, in gold**, and **the ⭐ must have a card to sit on** — the holder is unioned into the Key Players list | the mvp and its line | the one hype line, and the **"!"** |
| 7 | *"How it was decided: The ratings gave the Chiefs an edge of about 3.3 points, and they won by 14. Matthew Stafford backed up a 99.0, #2 of 32 quarterback grade with 207 yards, 2 touchdowns and no turnovers, worth about +2.3 points to the Chiefs. The Vikings' coverage (84.4, #2 of 32) kept in check the passing game: … about +2.2 points on the scoreboard. The Chiefs' pass rush (88.0, #4 of 32) only got home to Geno Smith once and hurried 9 more dropbacks, a swing of roughly +1.3 points for the Chiefs."* | **the overall number stays — "+3.3 points"** — and the rest becomes **three `.bar-row`s**: the passer, the coverage, the pass rush, each with its value and its rank. **Every "+x points to the Chiefs" phrase goes** | the unit values and ranks | nothing |
| 8 | *"The Chiefs move to 1-0; the Vikings slip to 0-1."* | **its own `.section-head` paragraph** | the records | one line |
| 9 | the **"Game plans:"** block | **hidden behind an arrow**, like the other dropdowns | the plan text | nothing |
| 10 | the **Key Players** chart | keeps the ⭐, and now always contains the ball holder | the key players plus the mvp | nothing |

## 2 · The rules that make the change correct rather than merely pretty

- **The star gate** (from `_agents/moc/notes/game-ball-and-stars-spec.md`): the current filter is `p.impact >= 1.0` (l.3031), which in grade terms is **65.5**; it must become **90+ for a star, 80+ for a mention**, and the praise word must be **earned by the grade** — the current fixed pool (l.3035) can attach "was the difference" to a one-catch, eight-yard touchdown.
- **A defender's ball eligibility**: `impact` is a z-score against the role's base (l.2371), so six tackles and nothing else can beat the game's best offensive player. He qualifies only if he **is the highest grade in the game** or has a **notable event** — multiple turnovers, a blocked kick, a defensive touchdown, a sack with a fumble, a forced fumble.
- **Sacks are graded, not counted as failure**: 1–2 is "mid", 3+ is "exceptional"; no sacks must never read as poor.
- **The ball holder is always in the Key Players chart** (l.3743): the list is built by `notablePlayers` (l.2687–2693), so a holder outside that set has no card and the ⭐ has nothing to mark. Union the mvp in.

## 3 · The typography (the Owner's *"this whole font is terrible"*)

- **One type scale** for the whole product, with the review's blocks stepping down: a 1.35rem figure, a 0.95rem label, a 0.78rem sub-line. No block sets its own size.
- **"Fade into the page"** means the *block* recedes, not the text: a soft gradient behind the block and a slightly quieter label, **never** a translucent body text — the recap has to stay readable at arm's length on a phone.
- **One idea per block**: each of the ten blocks above is separated by a `.section-head` and space, not by a rule and a heading in two styles.

## 4 · The motion (for this screen only)

The four quarter rows **arrive in order**, 60 ms apart, and **stay**; the star cards arrive after the quarters, and the ball holder's card arrives last, in gold, with the shimmer. **One thing moves at a time** — the quarters are one group, not four separate animations. Under `prefers-reduced-motion: reduce` there is **no stagger and no shimmer**: the block simply appears.

## 5 · Where it attaches

**VERIFIED lines (I read them this session):** the star filter and the praise pool at **l.3031** and **l.3035**; the star and ball lines in the recap assembly at **l.3184–3195**; `notablePlayers` at **l.2687–2693**; the Key Players chart and its ⭐ at **l.3743**; the grade function `perfGrade` at **l.2679**; the ball pool at **l.2680**; the z-score `gameZ` at **l.2371**; the stat impact at **l.2358**.

**Not verified — the implementing seat supplies the line:** the **box-score/quarters table** builder (the rows the Owner calls "the table Box score of the quarters"), the **turnover line**, the **typography block** (the CSS the recap text inherits), and the **"how it was decided"** paragraph's builder. I have not opened those in this session, and a line number is a hint, not an address.

**What I did not do:** I did not build a prototype of this screen, take a screenshot, or run the gate — the Architect applies it, and the gate runs on the built candidate.
