# UPDATE-README — wave 44 (the Owner's round-44 directives)

Delivered 2026-10-31 · the product: `Football-Sim-Z-post-blue-w44.html` ·
md5 `da3fc202237d7dddba37a7429ea6266d` · 1,514,199 B · base: the w43 bytes (md5 `53ce9def…`).

## The halfway ink — the balance he asked for (O1/O2)

The light-mode name ink `txM` is rebuilt as the **halfway point between the two tones he
named**: the natural-but-tinted team ink of dark mode and the too-vivid crayola of light mode.
Each franchise's crayola anchor is mixed 50/50 with the page's own warm ink (`#53382b`), then
clamped — lightness stays in 0.30–0.52 (readable, never washed) and a small chroma floor keeps
pale brands from going gray. The player browser was the test bed exactly as he asked: the tone
study measured all 32 franchises at ratios 0.42/0.50/0.58 (chroma against the geometric mean of
the dark tint and the crayola) and the screenshots picked 0.50. What light mode reads now:
Kansas City a deep brick `#9e2d36`, Green Bay a forest `#4f7b67`, Detroit a steel `#2f7195`,
San Francisco a scarlet `#a9211b`, Dallas a navy `#2f4d95` — clearly each team's color, none of
them cartoonish. **Dark mode keeps `txd` untouched.** The gold shimmer is untouched — his words.

## The All-Pro first team is gold everywhere (O3)

A first-team gold register (`ap1Names`) now feeds every honors surface: the awards page's award
cards and statistical champions, the **Pro Bowl placements** (his explicit ask), the playoff
awards cards and the All-Playoff chips, the season story's honor cards, and the rest-day
HONORS EARNED overlay. The shimmer is the same constant gold he praised — nothing else moved.
A build subtlety: the file carries TWO generations of awards renderers (the w33-era table
builders and the w37 card builders that override them) — the register is wired into the ACTIVE
card copies, and the live suite counts every listed AP1 name shimmering (58/58 this run).

## No result reveal before the whistle (O5)

The "confetti when the second key player's name appears" was the w37 celebration safety timer:
it drained the queued playoff-win reward at 15 s blind — mid-wildcard-intro, right as the
second star pair lands. The safety now re-arms while any cinematic overlay is on screen and
drains only when the stage is clear; the final whistle and the Continue buttons still release
everything, exactly as before. Live drill: a queued reward survives 16.5 s under a replay with
nothing on screen, then drains at the whistle.

## The wildcard pregame picks up the pace (O4)

36 s → 22 s (−39%): the star pairs breathe ≈5.1 s apart and the first play lands ≈23.5 s after
the overlay opens (was ~36 s). The Super Bowl keeps its 60 s.

## The during-game header scores wear their teams — in light too (O10)

Found live: the replay's old `color:inherit` law (`.zpb-replay span`, specificity 0,1,1)
out-ranked the w43 single-class score rules (0,1,0) — dark only won because its rules ride the
`:root[data-theme]` lift. The new `zpb-w44-css` block's two-class rules (0,2,1) beat the
inherit law in both themes: the away score reads the away team, the home score the home team.

## The small ones

- The review's leaked w43 comment text is gone — it had been written inside a template literal
  and printed on the page; the note lives as a real comment outside the string now (O6).
- "RUSH/PASS" reads **"Rush / Pass"** on the Team Stats table (O7).
- "WHERE YOUR PLAYERS LINE UP?" lands players at **half a second per player** (the w42 0.15 s
  compression retires; O9).
- The Super Bowl champions cinematic: **unchanged** — the suite re-asserts opaque-at-mount and
  the champion's own-color shimmer (O8/guard).

## Verify

`w44_live.js` 32/32 (both themes; ink, scores, intro timing, FX gate, map pace, gold register,
SB cinematic guards, clean drive) · `w43_regress_stress.js` 43/43 · `w42regress_stress.js`
48/50 with the same 2 superseded-ink audits failing on the w43 baseline too · zero console
errors through every drive. Screenshots in `_agents/zai/notes/evidence/`.

§veto candidates live in `notes/W44-INTAKE-LEDGER.md` (the halfway constant, the "gold
everywhere" surface set, the 22 s pacing).
