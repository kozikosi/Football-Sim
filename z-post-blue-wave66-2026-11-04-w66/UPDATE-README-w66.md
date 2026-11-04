# UPDATE README — wave 66 · the Owner's two UI/UX rounds + P-232 closed for real + P-174 shipped

**File:** `Football-Sim-Z-post-blue-w66.html` · md5 `41d2cb10ab3608fcc879816e61e20002` · 1,780,103 bytes
**Baseline:** the w65 bytes (`948f789d…`), asserted on every generator run. **New standing convention
(Claude's, followed from this wave on):** the file opens with a `WAVE: w66 / CLAIMS:` packing list
before `<!DOCTYPE html>` — one line per P-item, mechanism named, and nothing counts as done until QA
verifies it. Your two rounds landed through a **21-step asserted chain** (`zpb_w66.py` → `zpb_w66u.py`),
rebuildable from the pristine w65 bytes and byte-stable across re-runs.

## Part 1 · Your first round — every item

1. **The Draft board at the mid window size** — the squeeze that clipped every Draft button ~9px past
   the panel's right edge (reproduced at W=761–1080) is dead: the collapse law works again at the
   middle widths, and 761–1120px reads the two-line card you approved at the small/full sizes.
2. **Every Draft button pulses** — the on-the-clock pulse is now the whole board's.
3. **The top players' Draft buttons are colored and shimmering** — the top-3 priority rows wear the
   filled team-gradient sheen (the same family as PLAY X TEAM / SEASON REVIEW), in that team's colors.
4. **The field map follows the team theme** — offense no longer sits on fixed yellow with black text;
   every unit chip wears the team's colors at 0.5-strength team ink, light and dark. Measured all
   32 teams × both modes × O/D: every light pair ≥4.0:1, every dark pair ≥4.5:1, zero pure black.
5. **RETURN TO AUTO LINEUP** — renamed from MODEL, and it is hidden until you have actually changed
   something (it can never offer to "return" from a lineup you never touched).
6. **WEAKEST** — "Shakiest" is gone from WHY THIS STYLE.
7. **The logos no longer cover the upper horizontal line** — the pregame marquee block moved clear
   (title + logos ride below the line at every tested size: 800×640, 761×780, 900×700, 1000×820,
   1280×860, 390×844); the key players were already correct and stayed.
8. **SEASON REVIEW without simming the playoffs** — miss the postseason and the regular-season review
   page carries the same standalone centered glowing SEASON REVIEW panel the Super Bowl review has.
9. **TRY AGAIN TO GO 20-0** — filled, shimmering, centered, its own panel, matching the SEASON REVIEW
   treatment one page earlier.

## Part 2 · P-232 CLOSED — the auto lineup is natural-first, for real

- **Stage one:** the model lineup builder assigns every player to a slot his real NFL position plays
  (Hungarian assignment over natural slots only).
- **Stage two:** a slot that would otherwise sit empty is filled with the best IN-UNIT flex only
  (OL→OL, HB/FB, WR-only, TE-only, DL internal, LB→LB, secondary internal, K↔P). No OT→RB1, no P→K,
  no LB→DE, no WR→TE. The FLEX table itself is untouched (REV 4 still governs YOUR manual flexing).
- **The draft brain obeys the same law:** CPU GMs value in-unit placements only; your auto-picks land
  natural-first; nobody drafts a second specialist or a third TE early; an unfilled real slot pays a
  growing premium in the late rounds.
- **The audit caught the last two paths and killed them:** the "anyone-anywhere" escape put a DT at
  TE2/TE3 on your own board (whose lineup is never re-optimized). The escape is retired entirely — a
  pick with no legal landing passes, and the slot sits honestly empty. The model leaves surplus TE
  slots empty (70-OVR default in the math) rather than flexing receivers into them — the embedded
  pool carries only 53 tight ends for 96 TE slots, so honesty beats absurdity.
- **Proof:** all 32 teams audited live — ZERO cross-unit placements in the model lineups.

## Part 3 · P-174 SHIPPED — the Player Browser is an infinite scroll

The pager is gone (no PREV/NEXT, no PAGE X OF Y): the first 60 players render, and a sentinel
appends the next 60 as you near the bottom (60 → 180+ verified live; a filter change rebuilds from
the first chunk). Madden Rankings untouched.

## Part 4 · The transient OG1 glance

Checked: the early render never drops OG1 from the O-line — the depth-list check passes 30/30 across
the draft. The artifact you saw did not reproduce in the instrumented run.

## Part 5 · Your second round (N1–N10) — every item

1. **N1 · "FS (-10 FLEX)"** — the double-speak "FS Flex FS (-10)" is gone. The fills cell reads ONE
   label inside a custom dropdown (Cinzel, the homepage team-picker's principles, your team's 0.5
   ink) listing every open spot with honest flex costs — pick where to draft him.
2. **N2 · Two badges** — "2 of 32 starters · +5 wins above a replacement-level lineup" is now two
   team-tinted Cinzel badges: **1 OF 32 STARTERS** and **+4 WINS ABOVE A REPLACEMENT-LEVEL LINEUP**.
3. **N3 · The cards are the master clock** — strictly one card at a time at zero gap (0.3s per beat,
   the card fade's own length); the map and the depth area key off the card timeline on mobile and
   desktop alike. All four clocks read 0.3s in the battery.
4. **N4 · "(change who plays where at any time)"** — deleted everywhere; the live DOM asserts none.
5. **N5 · The purple wave is gone** — the comparison dropdowns enhance into the same custom family
   as the homepage (Cinzel closed box, grouped menu, team ink on every option, re-render on choose).
6. **N6 · The upper line** — SIM GAME · SIM SEASON · BACK TO SEASON ride the top panel's upper row
   next to NEW DRAFT / 100 SEASONS; Back to Season is brightened to the Sim Season tab's level; its
   standalone panel and the bottom bar are gone.
7. **N7 · One SIM PLAYOFFS door** — the button next to "Play the X" is retired; the upper-line door
   is the only entrance.
8. **N8 · SIM PLAYOFFS branches like the Super Bowl page** — the run plays silently (the
   during-the-game cinematic never fires from a sim-playoffs run). Make the Super Bowl → the Super
   Bowl screen directly. Miss it → a solemn cinematic in the Super Bowl screen's structure, no
   confetti, no celebration: the round you lost in, to whom, the score, the Super Bowl final, the
   champion, the MVP.
9. **N9 · COTY "YOU" shimmers gold** like the other honors — and the profile-name foundation is in:
   every player's profile name is editable from the Browser and persists (localStorage), rendering
   as a 0.5-ink suffix wherever the name shows.
10. **N10 · RUN IT BACK** — the button reads just that; the caution now says exactly what happens:
    back to the preseason, same roster, the current season's results erased.

## Verification

- **Batteries, all green on the shipped bytes:** round-2 37/0 (34/0 on its other branch) · round-1
  owner 48/0 · all-teams 15/0 (contrast × 64 pairs, the P-232 audit × 32 teams, the clearance sweep
  × 6 sizes) · ink probe · comparison probe · geometry probe · 23 script blocks SYNTAX OK.
- The round-2 battery caught three real regressions during the build (the review page's `${user}`
  scope, a DT→TE3 escape, the review-door end screen) — all fixed in the chain, re-run clean.
- Evidence in `shots/`: the N1 dropdown popup, the N2 badges live mid-draft, the N6 upper line, the
  N5 comparison dropdowns, the N8 solemn screen from both doors, the TRY AGAIN panel, the browser
  mid-scroll, the pregame clearance.
