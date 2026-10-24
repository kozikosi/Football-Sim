# Merge.html Changes Specification — BOC — Owner directive 2026-10-21

Read-only specification for Claude (Architect). No product edits by BOC. No protected constants changed by BOC. Owner has final authority; Claude decides what enters the build.

Build reference: `NFL Draft Simulator merged.html`, 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (V22 candidate).

## 1. Remove "Value Here" from visual draft board (already prototyped)

See `_agents/boc/notes/value-here-prototype.md` (M-353/M-355). 7 locations: CSS l.268 (two changes), sort option l.418, header l.426, row cell l.1766, colspan 10→9 l.1768, guide bullet DELETE l.4991, section title + Priority header title l.426/l.5056. `r.v` preserved in all background math. MOC verified: headers 10→9, cells 1,148→0, console 0, node --check PASS.

## 2. Remove "MORE" from tab footer

Find the footer tab element containing "MORE" and remove it. Search for "MORE" in merged.html. Ensure footer tabs remain visible at bottom (see #8).

## 3. Move badges to bottom of page under "Back to my weights"

Badges (e.g., "Can't Run penalty") currently appear somewhere in the UI. Move them to the bottom of the page, under the weights section ("Back to my weights" / "Save My Weights" button). Exact source location needs Claude to find (grep for badge-related classes).

## 4. "Use model weights" → "Default"

Rename the button/label "Use model weights" to "Default" wherever it appears.

## 5. "Back to my weights" → "Save My Weights" with conditional visibility

- Rename "Back to my weights" to "Save My Weights".
- Only clickable after a change is made to the default weights.
- Default state: transparent (like "Sim to End" button styling) until a default weight is changed.
- After a change: appears blue (like "Default" button) and text changes to "My Weights".
- This implies a dirty-flag tracking whether weights have been modified from defaults.

## 6. Weights table correction

The user-provided table (STARTING SPOT, WINS FROM 70→90 UPGRADE, WINS PER +1 RATING, WHERE THE WINS COME FROM, SHARE OF EACH TEAM RATING) is the DEFAULT_WEIGHTS (model weights), not user weights. The label "The default is the model weights: what each spot is really worth in wins, scaled so the biggest spot (QB) is 700 and rounded to the nearest 5" should read: "Default is how the draft simulator sees the game." The button functions are visually obvious; no explanation needed.

Owner-provided DEFAULT_WEIGHTS (for Claude's reference — these are the Owner's stated defaults, requiring Architect approval since DEFAULT_WEIGHTS is a protected constant):
- QB 700
- RB1 185, RB2 60
- WR1 305, WR2 165, WR3 105, WR4 5
- TE1 220, TE2 40
- OT1 285, OT2 285, OG1 235, OG2 235, C 235
- DE1 360, DE2 305, DT1 260, DT2 210, DL5 5
- MIKE 240, WILL 220, SAM 20, LB4 5
- CB1 395, CB2 325, CB3 260, CB4 5, SS 245, SS2 5, FS 235, FS2 5
- K 200, P 1, FB 1

Note: Protected constant change. Owner is the final authority; Claude decides whether to apply. BOC presents as proposal.

## 7. Delete user weights record

Remove any saved user weights (localStorage or state). Only use the model weights above. Forget user weights entirely.

## 8. Player browser: ~15 players visible on desktop

On the player browser, desktop should show ~15 players at a time (not the full list). Footer tabs always visible at bottom.

## 9. Position Rankings dropdown: complete combinations

Ensure every combination of top x players is available. Use default model weights to determine value. Patterns:
- Offense: QB, QB+WR1, QB+WR1+OT1, QB+WR1+OT1+OT2, ... continue to WR3
- Defense: CB1, CB1+DE1, CB1+DE1+CB2, CB1+DE1+CB2+DE2, ... continue to DT2
- Combined Units: start with first combination not already present (QB+CB1), continue to WR3

Rules:
- Only one copy of each set of units in the dropdown.
- Plural "s" for multiples of positions (e.g., "Defensive Line (Edges + DTs)").
- Remove "(WR1-3)" → "(WR1+WR2+WR3)". Same pattern for all similar instances.
- Remove "(CB1-4)" → "(CB1+CB2+CB3+CB4)".

## 10. Team Comparison

- Remove the description: "On your current weights, Los Angeles Rams grades 1.88 points ahead of Baltimore Ravens. Los Angeles Rams holds the edge at 15 starting spots to Baltimore Ravens's 9, and wins 11 of 14 unit comparisons to Baltimore Ravens's 3."
- Default matchup: Chiefs as Team A, Raiders as Team B.

## Protected constants note

Items 6 and 7 involve DEFAULT_WEIGHTS (protected constant). Owner is final authority; Claude decides whether to apply. BOC presents as proposal per AGENTS.md rules.
