# W29 BUILD REPORT — Z.ai · session 21 · 2026-10-28

**Product:** `Football-Sim-Z-post-blue-w29.html` · md5 `7286495bce6eb3ec1af77dd50fba43cf` · 1,360,583 B
**Baseline:** w28 (`84e1f8a8…`, byte-verified against the repo push before building)
**Chain:** `w29_patch.py` (6) → `w29_patch2.py` (20) → `w29_patch3.py` (6) = **32 asserted edits**, one post-evidence hotfix. View layer only; the one engine-touching change is the draft's undo law (below). Scoreboard math untouched.

## What landed (by directive group)

- **A · Where they line up (both maps)** — one shared field: offense on top, LINE OF SCRIMMAGE, defense mirrored below. Every station sits at its own `--x` (7.7% per bubble). WRs stand at ±5 (a full extra bubble of air), CBs directly across them at ±5, NICKEL + DIME in the slot gap at +3 between the tackle and the slot receiver. LBs SAM(−2)/MIKE(0)/WILL(+2) — SAM on the tight end's (strong) side per the Guide's own Mike/Will/Sam law. Applies to the Guide's static map and the belong map (starters' initials at their stations).
- **B · Coaching cards** — `window.zpbDefFrontKit()` is now the single builder; the Coaching section draws the SAME 4-3 / 3-4 / NICKEL fronts as the Defense section (same dots, colors, chips), with DT2 always a square and ILB2/SAM always triangles. A FOCUS card in the same style keeps the P+/R+/balanced badges.
- **C · Removals** — "Squares are the defensive line…" paragraph gone; the Coaching-Philosophy Auto sentence gone, the two remaining sentences centered, one on top of the other.
- **D · Reading the Draft Board** — [WINS] boxed like [PRIORITY]/[GONE]; the verbatim rewrites for Wins ("How many more games…/WINS are static."), Priority, Gone and the linebacker callout, every line centered with the Owner's line breaks preserved.
- **E · Panels + Undo law** — CPU DRAFT STRATEGY and UNDO live in their own centered panels. **Undo is available every round, once per round**: `draftSim.undoUsedRound` records the round where it was spent; the button hides for the rest of that round and re-arms the next; before the first pick there is nothing to undo. Guide wording and the button title updated.
- **F/G · Game-plan math** — subtitles OFFENSE / DEFENSE; balanced first inside every 11/12/13 (and base/nickel) section; the lean reads as the R+ / P+ badge — the words run-heavy/pass-heavy no longer appear in the panel (strategy column, Spread prose, 22-run cell). Five verbatim text rewrites landed ("The default", the 11-run, 12-balanced, 13-balanced lines, and "Personnel and strategy are paradoxical. Rarely selected.").
- **H · Comparison dropdowns** — Team A left, Team B's dropdown right-aligned to the panel edge; the bar reads the team NAME ("Your Team (Chiefs)", "Raiders (sim)") and steps up to the full name at maximum width (≥1100 px), repainting on resize with the selection preserved. No partial words on either tier.
- **I · Player panels** — every player on a comparison lineup row sits on a backing panel painted by a `::before` (so the 90+ shimmer keeps its gradient), and the highlighted border is reserved for the 85+ tier. The old ring that followed the win/lose axis is retired; the win edge stays color-only per the w27 law.

## Interpretations awaiting veto (full detail in the intake ledger §Open)

1. Field-map station choices (SAM strong-left, safeties two-deep ±2, DEs across the TE / in the slot gap).
2. Undo "once per round" scoped by round number; re-picking does not re-arm the same round.
3. Nickname↔full-name threshold at 1100 px.
4. R+/P+ badges replace run-heavy/pass-heavy inside the math panel only; the defense table's run-defense/pass-defense words stay.
5. 13-pass keeps its "One receiver on the field." clause after the paradox line; the defensive "…plays coverage; rarely right." sentence untouched.

## Verification

- `w29_verify.js` — **78/78 PASS** (jsdom; every directive asserted, live draft undo-law drive, zero console errors).
- `w29_reg28.js` (the w28 suite against the w29 bytes) — **55/55 PASS** (no regression).
- `w29_stress.js` (instant 272-game season) — **13/13 PASS** (replay TO lines still all named, FF&FR combos, kickers, C/RUSHY, FG x/y, leaders law).
- agent-browser evidence: 9 screenshots (field map desktop + 390 px mobile with no horizontal overflow, belong map, coaching cards, board section, plan math, comparison panels, dropdown bar wide + narrow).
- Hotfix during evidence: `.zpb-fm-row i` → `.zpb-fm-row > i` (the absolute-position rule was also catching the label `<i>` inside the initials cells, clipping the names).

## Zip contents

`z-post-blue-wave29-2026-10-28-w29.zip` — product, README, intake ledger, this report, the three patch scripts + verify/stress suites, the refreshed `START-OF-CHAT-ZAI.md` (§3 → session 21) and `ZAI.md`, and the evidence screenshots. Zip and file names end with **w29** per the naming law.
