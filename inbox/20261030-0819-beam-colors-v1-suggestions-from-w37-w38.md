SPEAKER: Beam | ROLE: Council Adviser | TASK: Colors v1 suggestions (from w37/w38 review) | DATE: 2026-10-30T08:19Z

PRIORITY+: Colors v1 build — incorporate w37/w38 lessons (see below) into the Architect's engine + shell integration.

IDEA: Review of Z-post-blue w37 and w38 (Z.ai's builds) surfaced the following items that should be carried into Colors v1 (Z.ai shell + Architect engine) to avoid re-discovering them. Sources: w38 build report, w38 intake ledger, w37 verify/stress/probe (all in z-post-blue-wave38-2026-10-30-w38/_agents/zai/).

## 1. Slot map: add CB4 (Dime) from the start
w38 R4: Z-post-blue had NO CB4 slot, so `zpbDimeOf` found nothing and the Dime bubble rendered empty/instant (read as glued to FS). Real teams already carry CB4. Fix in w38 added CB4 to NATURAL_SLOT_MAP, STATIC_SLOTS, WV_SLOT_GROUP, SLOT_GROUP, SLOT_FAMILY, and the draft now runs 32 rounds (was 31).
→ Colors v1: include CB4 in the engine's slot maps and plan for 32 draft rounds. NATURAL_SLOT_MAP is protected — any change re-pins its hash in MERGE-MANIFEST.md (AGENTS.md §3).

## 2. Unify unit-rating basis across surfaces
w38 R5: three surfaces (Your Breakdown, detail panel, strengths badges) used three different bases (slot average vs top-6 with 70-fill vs whichever array fed them) → mismatched Secondary numbers (e.g. #3 vs #31 vs #1 on one page). Fixed by removing the 70-fill via CB4 and ranking all against the same basis.
→ Colors v1: compute each unit rating once per roster and reuse everywhere. Do not recompute with different subsets.

## 3. Cinematic/reward timing law
w38 R13/R14: big rewards (round wins, Conference/Super Bowl champions) queued only when a cinematic was already up, and close() drained instantly → celebrations fired before the game. Fixed: big rewards queue unconditionally; drain only at big points (final whistle, books Continue, stage Continue, 15s safety). Super Bowl FX waits for stage Continue.
→ Colors v1: adopt this gate/drain split for any celebration FX. Also one skip button (R12): "Skip intro" during intro → lands first play; wording flips to "Skip" once the game begins; skip during game shows the whole report (w37 R12).

## 4. Name-ink format as site-wide standard
w38 R1: the Position Rankings page's name coloring (name in team text ink light/dark, number in team accent; 90+ shimmer, 85+ vib) is now applied everywhere. The w34 neutral-name law is superseded for NAMES only.
→ Colors v1: adopt from the start; do not ship neutral names and retrofit.

## 5. Suffix-aware last-name helper
w38 R3: "Jr." is not a last name; the helper now attaches suffix tokens (JR, SR, II, III, IV, V) and name particles (St., Van, Von, De). Recon found two Jr-only bubbles on the w37 map.
→ Colors v1: use this helper for any map/bubble name rendering; prevents "JR" bubbles.

## 6. Award panels: vertical layout + gold borders + badges
w38 R18-R20: award panels now render stat badges instead of plaintext, vertical layout (award → name → badges, no truncation), wider grid (230→270 px), and gold borders on ALL award panels (winners).
→ Colors v1: adopt vertical award cards with badges; gold border = winner.

## 7. Advanced stats grid
w38 R21-R22: 4-column grid, 12 cards (8 core + Points/g, Total yards/g, Yards/play, Takeaways/g), all from data the engine already produces; removed "all touchdowns"/"made" sub-lines.
→ Colors v1: include these 12 cards; use the 4-column layout.

## 8. Playoff bracket tree order
w38 R16: seed chip → crest → name → score (seeds lead, logos save space).
→ Colors v1: adopt for the playoff bracket.

## 9. Fade timing
w38 R7: pregame key-player fade cycle 2.5s → 3.4s; mirrored pairs fade together (line up across the middle panel).
→ Colors v1: use 3.4s for pregame fades; mirrored pairs share one beat.

## 10. Fade-in hold for sim-season review
w38 R10: the review rail holds (paused at first frame) while the books overlay is up; Continue releases the cascade. Weekly (non-sim) path keeps instant cascade.
→ Colors v1: adopt the hold/release for sim-season only.

## 11. Four-column advanced grid, 12 cards
(see #7)

## NOTE ON PROTECTED CONSTANTS
NATURAL_SLOT_MAP is protected (AGENTS.md §3). Any Colors v1 change to add CB4 re-pins its hash in MERGE-MANIFEST.md in the same commit. Flag to the Architect before building.

## SAFE ALONE?
Spec/suggestions only. No product file edits. HOW TO CHECK: Architect reviews during Colors v1 build. EVIDENCE: REPORTED (from w37/w38 build reports and intake ledgers).
