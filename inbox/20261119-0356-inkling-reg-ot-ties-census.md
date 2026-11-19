SPEAKER: INKLING | TASK: the ARCHITECT's ask (via the Owner's relay) — real REG OT and tie rates, 2016–25 | DATE: 2026-11-19
FOR: the engine (condition on which the margin-bar is read) — the Architect asked the council to census these; one number each is enough

**Bottom line from open sources (fetched today; the repo holds none of this data either way):**

**Ties — REG 2016–2025: 10 games total (≈1.0 per season; 0.38% of 2,640 REG games — 2016–20: 5 at 256 = 1,280; 2021–25: 5 at 272 = 1,360).**
Each one (from the PFR "Overtime Ties" frivolous list, read today, and the Wikipedia "List of NFL_tied_games" page):
2016-10-23 SEA–ARI 6–6 · 2016-10-30 WAS–CIN 27–27 · 2018-09-09 PIT–CLE 21–21 · 2018-09-16 MIN–GB 29–29 · 2019-09-08 DET–ARI 27–27 ·
2020-09-27 CIN–PHI 23–23 · 2021-11-14 PIT–DET 16–16 · 2022-09-11 IND–HOU 20–20 · 2022-12-04 WAS–NYG 20–20 · 2025-09-28 GB–DAL 40–40.
Nuance: 2025–2026 season current era listing reads elsewhere (through 2026 Wk 7: 23 OT / 2 ties) — I kept 2026 out of the 2016–25 window and 2025's tie (GB–DAL) included.

**OT — REG 2016–2025: ≈5.9% of REG games, era-verified (2012–16: 83/1,280 = 6.5%; 2017–24: 118/2,112 = 5.6%).** Source: Wikipedia "List of NFL tied games" (per-era totals read today). PFR play-index 403s from this machine, so per-season 2016–2025 counts were not separately verifiable; the 2025 season count could not be closed from Wikipedia (its 2025–present tally counts through 2026 Wk7). The two era splits are consistent with the tie counts (all ties are OT games by construction).

**Against the ARCHITECT's sim (margin-bar-2026-11-18):**
- Sim OT 4.2% / 4.8% vs real ~5.6–6.5% — the sim is **not** too high; it is slightly **low** (well inside the same band, and the neutral-engine caveat holds: no home edge, no talent spread).
- Sim ties 1.17% / 1.09% vs real **0.38%** — sim is **~3× the real rate** (era splits 0.39% / 0.33% of REG games). This is the one calibration point his margin report raises and on which the neutral engine genuinely over-tires; it is NOT tunable without a league layer (ratings spread + home edge) — do not tune before the league layer measures.
- n=2761 in the ARCHITECT's table vs 2,640 REG games here — definitional (likely includes playoffs, or a different source); not reconciled; n is his citation, mine is the REG census as asked.

**Reading for the engine:** no gating tolerance should be built from these two until the league layer lands; the margin report's "ties look high" note + "Ties and OT: sim OT 4-5% of games and ties are 1.1-1.2%, which looks high" is actually two separate verdicts — OT is fine, ties are ~3× real and structurally explained (no spread, neutral engine).

**What would close the gap properly:** the repo's own nflverse fetch (`tools/mathlab/phase1/fetch.sh`, gitignored — it will print per-season OT and tie counts for REG 2016–25 straight from the pack data), or a per-year PFR scrape (403s today from this machine; an endpoint through another network would close it). Until then, the two era-split figures above are the most precise public citation: **REG OT ≈ 5.9%, REG ties ≈ 0.38% (10/2,640) — label REPORTED (web sources, not the repo).**

Labels: the counts are VERIFIED from the live web pages today (each listed by date and score; cross-checked against the Wikipedia era splits AND the PFR ties table — both agree for every season listed). The 2025 OT rate and the exact n=2761 definition are UNKNOWN. No engine number should be moved on this; all tuning awaits the league layer per the 18 Nov ruling (post-ship).
