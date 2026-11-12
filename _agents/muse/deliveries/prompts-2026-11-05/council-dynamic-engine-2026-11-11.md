# Council — the dynamic engine: what else is static, and what should fluctuate

**From:** MUSE, High Councillor. **Date:** 2026-11-11. **FOR:** P-345 / the dynamic engine.

## §0 — Who this is for, and what "done" is

This is a **brainstorm / innovation round**, not queue work. It is for any seat
that wants to think about it — no named assignees, per house rules; an
invitation, not an order. Done = **one inbox filing per seat** with your
positions and proposals, labelled (VERIFIED / REPORTED / INFERRED / UNKNOWN),
pushed to your branch. No deadline; the custodian sorts. Disagreement is the
point. Do not review each other's filings in this round; do not take queue
items in it.

**The Owner's verdicts — read these first, they bound everything below.**
MUSE listed 12 things in the engine that assume a static situation
(a fixed constant, a fixed table, a fixed ranking). The Owner ruled on each,
in his own words (verbatim at
`_agents/owner-notes/2026-11-11-dynamic-engine-verdicts-verbatim.txt`):

1. **Slot values — APPROVED to broadcast.** Static truth must remain on the
   draft board (Wins are wins; a QB generally still needs to be the most
   important player), but matchup-aware value is wanted: a top QB with a weak
   offensive line against a top defensive line should face a steep drop in
   value if he has no time to throw.
2. **Flex prices — REJECTED / OPPOSED.** Flex values stay **CONSISTENT
   throughout the year**. The user's decisions must follow slightly more
   static pathways — the user takes an action and knows exactly what he is
   trying to manipulate; wildly changing values round to round would confuse
   the user. **Do not propose fluctuating flex prices.**
3. **Drive/play parameters — APPROVED to broadcast.**
4. **Home-field advantage — APPROVED.** Find data on whether it is more or
   less significant in the playoffs. **Standing directive: everyone should
   look for more data to support a more dynamic engine for any metric.**
5. **Player ratings / form — APPROVED with constraints.** A player's OVR
   should fluctuate based on form (**~5–6 during the season**); form should be
   tracked. **NO INJURIES in any sport** (players must not draft 3rd string
   QBs). 32 rounds is already excessive but the Owner likes the positions
   available to draft. **The Owner will NOT define per-player clutch metrics.**
   OVR could fluctuate by offensive focus (WR3/TE more valuable in west coast;
   RB2 more valuable in ground & pound). Matchup/big-game OVR fluctuation is
   unresolved (the Owner is unsure how it would work).
6. **Group synergies — APPROVED, definitely. Broadcast to everyone.**
7. **Gravity / double-teams — APPROVED, especially double teams.**
   Double-teams drawn should be **user-visible in the ADVANCED STATS section**.
8. **Calibration targets — STATIC.** The fixed targets (90% playoffs, ~35%
   Super Bowl, 25% title) stay as a static overall measure to test by.
   **Not a dynamic item.**
9. **Game state / clutch — APPROVED, definitely. Broadcast to everyone.**
   Everyone should work on a **better VISUAL experience to represent clutch
   time**, especially Z.ai.
10. **Noise / variance — COULD fluctuate IF good reasons are found.** Open
    question: are upsets more likely in rivalry games? (Needs data.) Stars are
    never out (no injuries).
11. **Draft slot value — MOOT.** The draft class is the same every time
    (fixed pool), so draft slot value does not fluctuate by the pool.
12. **Flex legality — APPROVED in theory.** Top stars could come on the field
    on the opposite side (defensive players on offense and vice versa).

**The big new feature — offensive focus (the Owner's idea, broadcast as such):**
the user picks a **focus for the game** — "west coast, deep passing, RPOs,
ground & pound, etc." — so that a player who notices his QB will have no time
to throw in this game can choose west coast or RPOs or ground & pound instead
of deep passing, and the QB benefits from that choice. This is a **big new
potential feature**. Propose it; do not assume it ships — the Owner decides.

**The standing principle behind all of this (the Owner, 2026-11-11):** the
0.20-vs-0.40 λ binary was false because it assumed a static λ. The dial may
fluctuate by personnel, situations, rivalry, playoffs, opponent structure, key
players, aggressiveness, dominant groups, etc. — and **every engine structure
could/should fluctuate by those concepts or more**. The third objective is:
"testing should be done creatively for the best value and the long-term
structure should be as stable as possible with maximum flexibility for this
dial." The user sees **only Wins, Priority, OVR, with consistency** — the
fluctuating machinery stays behind the screen.

## §1 — Where things stand

- MUSE's 12-item list (the 22:56 HST reply) is the starting inventory of
  static assumptions: slot values, flex prices, drive/play parameters,
  home-field advantage, player ratings/form, group synergies, gravity,
  calibration, game state/clutch, noise/variance, draft slot value, flex
  legality. The Owner's verdicts above settle 12 of them (2 rejected/moot,
  10 approved or open). **Do not re-litigate the verdicts** — the work is to
  design inside them.
- The λ work continues separately (the third objective + fluctuating dial; the
  council follow-up prompt is the channel for that). This round is about
  **everything else that is static**.
- The play-level engine (Claude's design, Phase 1 baseline landed) addresses
  game state; the gravity fold (P-335) addresses double-teams. The new work is
  the rest: matchup-aware slot values, the offensive focus, form, group
  synergies, the clutch visual, cross-side stars, and the data to support a
  more dynamic engine.

## §2 — The questions

**Q1 — The offensive focus.** This is the biggest new feature in the round.
**The Owner has answered the first two questions (2026-11-11 23:46 HST,
verbatim at `_agents/owner-notes/2026-11-11-focus-and-form-answers-verbatim.txt`):**
the user gets focus choices **at halftime** (no more than that for now); the
**4th quarter** should have a lot of **automatic adjustments by the engine
based on situation** — going for 2 down 14, going for difficult 4th downs,
going for longer passes down big late in the game should be **automatic
regardless of what the user selected**; and the focus may change **Priority
values but NONE of the static values, including Wins** (or whatever replaces
Wins). So: Wins = static truth, Priority = contextual / focus-aware, and the
4th quarter is engine-driven by situation, overriding the user's focus.
Propose the design inside those answers: what are the focuses (west coast,
deep passing, RPOs, ground & pound, and what else — is there a defensive
focus too?); **open question — pre-game + halftime, or halftime only?** Does
the user pick a focus before the game and then get one change at halftime, or
is the focus only chosen at halftime (first half on default)?; **open question
— does the focus affect the DRAFT BOARD** (a player's Priority under the
current focus, re-ranking the board) **or only the GAME** (the lineup / which
player to start under this focus)? Is the focus a team identity (set once,
affects the board) or a per-game choice (affects only the game) — or both?;
how does a focus interact with **form** (a WR3's OVR in a west coast
environment, a RB2's in ground & pound) and with **matchup** (a top QB with a
weak OL vs a top DL — how steep is the drop, and how much does the right
focus recover?); what does the user see when he picks a focus (what the screen
says, in one sentence a normal fan understands); and what is the **receipt** —
how would you test whether the focus makes the game better (more interesting
decisions, not just more wins)? Name the failure mode: when does a focus
choice become a no-brainer, or a trap?

**Q2 — Matchup-aware slot values, with static truth on the board.** The Owner
wants both: the draft board shows static truth (Wins are wins; QB generally
most important) AND a top QB with a weak OL vs a top DL faces a steep drop.
How do you hold both? Propose the shape: is the matchup adjustment a
**game-time** effect (the value drops in that game, the board stays static) or
a **board-time** effect (the board shows the matchup-adjusted value)? What is
the mechanism (OL vs DL as a unit? the worst matchup on the line? the QB's
time to throw as a measured stat?); what data would you use to set the size of
the drop; and what is the receipt (which real games / which nflverse cuts
would show the drop is real)?

**Q3 — Form.** **The Owner has answered the display question (2026-11-11
23:46 HST): form is definitely VISIBLE — a simple GREEN arrow** (green as
Z.ai has defined "green" or "good" within each team's color palette) **for
hot and a simple RED arrow for cold, or something simple like this. NO
emojis. NO 'HOT' or 'cold' text labels.** Propose the mechanism inside that
answer: what is form (a rolling window of recent performance? a hidden state?
a streak?); how does it move a player's OVR by ~5–6 during the season
(linear? a step? a curve?); does form **reset each season or carry over**;
is the arrow **binary** (hot / cold / neutral) or **graded** (the arrow's
size or intensity shows how hot); and what is the receipt — how would you
test that form makes the season more interesting without making the draft
board a lottery? (Constraint: no injuries, no per-player clutch metrics from
the Owner — form must be built from what the engine already measures.)

**Q4 — Group synergies.** The engine is additive (slot values sum). A dominant
*group* (an elite OL, a strong secondary) has synergistic value the engine
doesn't model. Propose the shape: what is a group (a unit? a pair? a
combination the user built?); how is its value measured (the whole minus the
sum of the parts?); what does it fluctuate by (its composition, the opponent);
and what is the receipt (which real units would show the synergy — which
nflverse cuts, which seasons)? This is the Owner's "dominant groups" concept —
it has no notion in the engine at all, so the design is genuinely open.

**Q5 — Gravity, double-teams, and the advanced-stats surface.** Double-teams
drawn must be user-visible in the advanced-stats section. Propose: what
exactly is shown (double-teams drawn per game? per season? by whom?); how is
a double-team defined (the GravityFold's definition, or a better one?); how
does gravity fluctuate by situation (close game, weak CB1, rivalry, key WR1);
and what is the receipt (which real double-team rates would the engine need to
reproduce — the nflverse cuts exist, name them)?

**Q6 — The clutch visual.** Everyone should work on a better visual
experience to represent clutch time, especially Z.ai. Propose: what does the
user *see* in clutch time (final 5 minutes of the 4th quarter + overtime)
that he doesn't see the rest of the game; how does the visual change (not just
more text — what is the *experience*); and how does it interact with the
P-354 big-penalty narration (the big penalties shown in the clutch)? This is a
design question, not a measurement question — sketch it, don't just describe
it.

**Q7 — Cross-side stars.** Top stars could come on the field on the opposite
side (defensive players on offense and vice versa). Propose: which stars, in
which situations (Hail Mary? goal-line? a two-minute drill?); what does it
cost (a flex price? a snap? a roster spot?); and what keeps it from being a
gimmick (when is it a real decision, and when is it just fun)? Note the
constraint: flex values stay consistent through the year — so if a cross-side
move has a price, it is a *fixed* price, not a fluctuating one.

**Q8 — The data.** The standing directive is: everyone should look for more
data to support a more dynamic engine for any metric. Name the data: for each
approved item above, what real data would you use (nflverse cuts, and which
ones — be specific: which tables, which seasons, which filters); and for the
two open questions — **is home-field advantage more or less significant in
the playoffs?** and **are upsets more likely in rivalry games?** — what is
the cut that would answer it, and what would you expect to find? A data
proposal with no named cut is not a proposal.

**Q9 — What else is static?** MUSE's 12 items were a first pass, not a
complete inventory. Name anything else in the engine that assumes a static
situation and should fluctuate — a fixed constant, a fixed table, a fixed
ranking — and say what it should fluctuate by and how you would test it. The
Owner's question, verbatim: "think of what else would make the engine
dynamic."

## §3 — How to file

One inbox filing per seat: `inbox/<UTC yyyymmdd-hhmm>-<seat>-dynamic-engine-<slug>.md`,
first line `SPEAKER: … | ROLE: … | TASK: … | DATE: …`, then
`FOR: P-345`. Label every claim (VERIFIED / REPORTED / INFERRED / UNKNOWN).
Push often — commit and push after every finished file, not just at session
end. No reviews of each other's filings in this round. Do not take queue items
in this round; the custodian sorts.

## §4 — Bounds (do not re-decide these)

- **The server-ready engine principle (the Owner, standing, 2026-11-12):**
  "design the simulation engine as if it will eventually run on a centralized
  server, even though it currently runs locally. That means keeping the engine
  independent of browser APIs, UI state, local storage, and framework-specific
  code. It should accept defined inputs and produce defined outputs. Later,
  you can run that same engine on a server and have multiple users interact
  with it." Every proposal in this round must keep the engine server-ready —
  a fluctuating dial, a focus, a form mechanism, or a group synergy that
  depends on browser APIs, UI state, local storage, or framework-specific
  code is not a proposal. The engine takes defined inputs and produces defined
  outputs; the UI and the platform layer sit outside it.
- **Flex values stay CONSISTENT throughout the year** — do not propose
  fluctuating flex prices. The user's decisions must follow slightly more
  static pathways.
- **NO INJURIES in any sport, ever.** Players must not draft 3rd string QBs.
- **The Owner will NOT define per-player clutch metrics.** Form must be built
  from what the engine already measures.
- **Calibration targets stay static** (90% playoffs, ~35% Super Bowl, 25%
  title) — the overall measure to test by, not a dynamic item.
- **The draft class is the same every time** (fixed pool) — draft slot value
  does not fluctuate by the pool.
- **The user sees only Wins, Priority, OVR, with consistency.** The
  fluctuating machinery stays behind the screen. Anyone may pitch a
  replacement for Wins or an additional metric a normal fan can understand —
  that pitch is welcome here too.
- **The offensive focus, form, group synergies, the clutch visual, and
  cross-side stars are PROPOSALS, not builds.** The Owner decides what ships;
  the Architect decides what enters the product. Do not write product code;
  propose.
- No gates, no floor, no named exceptions, no pair tables, no style labels, no
  intangibles. OVR + preferred position are the only true inputs. The 99 is a
  guide, not a target — and now explicitly not a mirror: the model should
  emerge as much as possible rather than mirror the Owner's evaluation of the
  salary data. Ratings are the Owner's alone. Basketball is design-only until
  football is done. The wasted-capability term is not to be promoted.
- The λ objective is NOT decided (the binary is false); the third objective +
  fluctuating dial are the live questions — that work runs through the council
  λ follow-up prompt, not this round.

## §5 — Innovate

This is an innovation round — the job *is* to think. If a question as written
is the wrong question, say so and say what the right question is. If a feature
as proposed is the wrong feature, propose the right one. If you think the
offensive focus should be something else entirely (a game plan? a scheme? a
tempo?), say so. The most useful filing is not the one that answers every
question — it is the one that names the design nobody else saw, or the receipt
nobody else thought to run, or the data cut nobody else named. Think around
the issue. Create new ideas. The Owner is fine with new features — make them
good ones.
