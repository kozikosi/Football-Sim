# Claude — the dynamic engine: what else is static, and what should fluctuate (one job: think, then file a design note)

**From:** MUSE, High Councillor. **Date:** 2026-11-11. **FOR:** P-345 / the dynamic engine.

## The question

The 0.20-vs-0.40 λ binary was false because it assumed a static λ. The Owner
has now ruled on a wider question — MUSE listed 12 things in the engine that
assume a static situation, and the Owner's verdicts are below. Your job is to
think about them and file a design note. One job, small.

**The Owner's verdicts (in brief — the verbatim record is at
`_agents/owner-notes/2026-11-11-dynamic-engine-verdicts-verbatim.txt`):**

- **Slot values — approved.** Static truth must remain on the draft board
  (Wins are wins; QB generally still most important), but a top QB with a weak
  OL vs a top DL should face a steep drop in value if he has no time to throw.
- **Flex prices — REJECTED.** Flex values stay **consistent throughout the
  year**. The user's decisions must follow slightly more static pathways.
- **Drive/play parameters — approved.**
- **Home-field advantage — approved.** Find data on whether it is more or less
  significant in the playoffs. Standing directive: everyone should look for
  more data to support a more dynamic engine for any metric.
- **Form — approved, with constraints.** A player's OVR fluctuates by form
  (**~5–6 during the season**); form should be tracked. **NO INJURIES in any
  sport.** The Owner will NOT define per-player clutch metrics. OVR could
  fluctuate by offensive focus (WR3/TE more valuable in west coast; RB2 more
  valuable in ground & pound).
- **Group synergies — approved, definitely.**
- **Gravity / double-teams — approved, especially double teams;**
  double-teams drawn must be user-visible in the advanced-stats section.
- **Calibration targets — static** (90% playoffs, ~35% SB, 25% title), the
  overall measure to test by.
- **Game state / clutch — approved, definitely.** Everyone should work on a
  better visual experience to represent clutch time, especially Z.ai.
- **Noise / variance — could fluctuate IF good reasons are found.** Open
  question: are upsets more likely in rivalry games? (Needs data.)
- **Draft slot value — moot.** The draft class is the same every time.
- **Flex legality — approved in theory.** Top stars could come on the field on
  the opposite side (defensive players on offense and vice versa).

**The big new feature — offensive focus (the Owner's idea):** the user picks a
**focus for the game** — "west coast, deep passing, RPOs, ground & pound,
etc." — so that a player who notices his QB will have no time to throw can
choose west coast or RPOs or ground & pound instead of deep passing, and the
QB benefits from that choice. A big new potential feature. Propose it; do not
assume it ships. **The Owner has answered the first questions (2026-11-11
23:46 HST, verbatim at
`_agents/owner-notes/2026-11-11-focus-and-form-answers-verbatim.txt`):** the
user gets focus choices **at halftime** (no more than that for now); the **4th
quarter** should have a lot of **automatic adjustments by the engine based on
situation** — going for 2 down 14, going for difficult 4th downs, going for
longer passes down big late in the game should be **automatic regardless of
what the user selected**; and the focus may change **Priority values but NONE
of the static values, including Wins** (or whatever replaces Wins). **Form is
definitely VISIBLE** — a simple **GREEN arrow** (green as Z.ai has defined
"green" or "good" within each team's color palette) for hot and a simple **RED
arrow** for cold. **NO emojis. NO 'HOT' or 'cold' text labels.**

## Your job (one job, small)

From the Architect's chair — the formula and the engine have to live in the
product, be beautiful, and port to basketball later with no Owner-provided
weights — file a design note on your branch and push it. One short filing, no
tests, no code, no build. The note should answer, in your own shape:

1. **The offensive focus.** What is it, as an engine object — given the
   Owner's answers (choices at halftime, no more than that for now; 4th
   quarter automatic by situation, overriding the focus; focus changes
   Priority, never Wins)? Two open questions: **pre-game + halftime, or
   halftime only?** (Does the user pick a focus before the game and then get
   one change at halftime, or is the focus only chosen at halftime?) And
   **does the focus affect the DRAFT BOARD** (a player's Priority under the
   current focus) **or only the GAME** (the lineup)? Is it a team identity or
   a per-game choice — or both? How does it interact with form and with
   matchup (the QB-with-no-time case)? What is the cleanest shape that keeps
   the engine beautiful?
2. **What else is static?** The Owner's question, verbatim: "think of what
   else would make the engine dynamic." Name the static assumptions in your
   engine (beyond the 12 above) that should fluctuate — and say what each
   should fluctuate by, and how you would test whether the fluctuating version
   beats the static one.
3. **Form and group synergies.** The two mechanisms with no notion in the
   engine at all. What is form (built from what the engine already measures —
   no per-player clutch metrics from the Owner)? What is a group (a unit? a
   pair?), and how is its value measured? How do both stay beautiful and
   portable to basketball?
4. **The tension.** The Owner wants both: static truth on the draft board
   (Wins are wins) AND matchup-aware value (the QB drop). Flex values stay
   consistent through the year AND the engine gets more dynamic. Where is the
   line — what fluctuates, and what must stay still so the user always knows
   what he is manipulating?

Proposing tone, as always — suggestions and open questions, not commands.
Innovate: if a question as written is the wrong question, say so and say what
the right one is. If the offensive focus should be something else entirely,
say so.

## Bounds

Design brief, not a build or cutover go. No tests, no code, no re-pin. The
offensive focus, form, group synergies, the clutch visual, and cross-side
stars are **proposals** — the Owner decides what ships. No injuries in any
sport. No per-player clutch metrics. Flex values stay consistent through the
year. Calibration targets stay static. The user sees only Wins, Priority, OVR,
with consistency. The λ objective is NOT decided (the binary is false) — do
not decide it here; the third objective + fluctuating dial are the live
questions. One job, one push.
