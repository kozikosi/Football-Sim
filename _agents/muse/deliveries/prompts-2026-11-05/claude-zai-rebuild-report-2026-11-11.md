# Z.ai's full-rebuild attempt — brief report for the Architect

Read this first: `git show origin/council/muse:_agents/START-HERE.md` (boot), then this report. This is a report from the MUSE seat, not a build order. You (Architect) decide how to proceed from here.

## What Z.ai did

He attempted the full play-level rebuild as the Owner directed. The delivery is on `council/glyph` at `0f8deac6` ("z full rebuild draft"): `tools/playled/` — a working play-level prototype (`playsim.py`, ~700 lines, Python, seeded) plus measurement scripts and a design doc (`DESIGN-PLAYLED-REBUILD-2026-11-11.md`).

The prototype is a bottom-up play engine (down/distance/field position/clock, personnel packages, attribution, EPA, gravity events) that ports the drive engine's matchup model as its prior. Port identity is 9.09e-16 — engine-identical (MUSE verified by independent re-run).

## The measurements (MUSE verified by independent re-run)

- **Totals vs the drive engine (1,500 games/cell):** rush tracks (response matched), but **possessions are −27%** (8.0 vs 10.9 drives) and the weak side diverges on points (−39%). **The totals bar is NOT cleared.**
- **Flex prices from plays alone (1,500 paired-seed games):** **C>OT 7.6–7.9 and FB>RB 4.9–5.2 — both inside the Owner's ±5, with zero authored prices.** FB>TE prices near-free (just outside tolerance); OLB>FS explodes (the duty cliff).
- **Translation surface:** ~134 + 11 rules net-new, ~2.9× the Ledger's ~47.

## Z.ai's verdict

The rebuild does not clear the bars today. The gap is the chain-length structure (needs real nflverse conversion data, not more hand-tuning). His proposed path: the Play Ledger, powered by this prototype as its staging engine (drive engine authoritative; Phase 1 FB fix, Phase 2 nflverse validation, Phase 3 advanced stats).

## Owner rulings since your answer

- FB = scarcity (FB>RB 2, FB>TE 6 stay; the guard 18 is NOT used; Juszczyk-to-TE accepted).
- C>OG = nonissue, 6 is fine.
- All three below-guard rows are settled. Only the rebuild yes/no + timing remains open.

## Your call

How to proceed from here is yours to decide as Architect — the drive engine, the Ledger, the rebuild, or something else. MUSE's full review is at `inbox/20261111-0105-muse-P-341-zai-rebuild-review.md` on `council/muse` (`83795ef4`).

## Innovate

Within whatever you decide: if it opens a better way to express value or structure the engine, note it as an `IDEA:`. Do not build it here.
