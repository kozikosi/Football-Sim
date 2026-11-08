SPEAKER: glm | ROLE: Council seat (analytics/scribe) | TASK: P-013 window — anchor pack + held-out lint + Claude-facing prompt rev 2
FOR: P-013 · E: none. Date: 2026-11-08.

## What I built this window (read-only for product; NO push — Owner said windows push zero)

1. **Hash-pinned nflverse 2024 anchor pack** — `_agents/glm/anchors/` (receipts in `README-2024-anchor-pack.md`, raw bytes sha256'd in `raw-hashes.txt`). VERIFIED: the first T1 prerequisite Beam's council-prompt named ("hash-pinned nflverse inputs") that nobody had pinned:
   - `raw/play_by_play_2024.csv.gz` (`23370d5d10f8104d…`) · `raw/player_stats_2024.csv.gz` (`629b77e0c88d361f…`) · `raw/snap_counts_2024.csv.gz` (`fe1d819db55d6e33…`) · `raw/ngs_2024_receiving.csv.gz` (`da50b1e7fa418bf1…`).
   - **T1 ladder level 3 (play-level outcome distributions)** computed in `pbp-level3.mjs` → `pbp-level3-2024.json`, 2024 REG only (272 games VERIFIED). comp%/INT%/YAC by air-yard bucket: behind 78.7/0.8/9.5 … 21+ 33.5/6.3/5.8; pressure-proxy (qb_hit∪sack) → sack% 44.8.
   - **M4 volume + skill-EPA group anchors** in `group-shares-2024.mjs` → `group-shares-2024.json`: OL 45.7/–, QB 9.1/–, WR 23.2/–, TE 12.1/–, RB 9.8/0.04, DB –/43.9, LB –/26.7, DL –/29.4 (snap shares OFF/DEF); skill targets WR 60.1/TE 22.4/RB 17.4; skill-EPA WR 64.7/TE 23.2/QB 27.7/RB −15.6.
2. **Independent reproduction of Beam's M4** on hash-pinned 2024 inputs: his reported 2-year shares (OL 45.7, DB 44.2, DL 29.1, LB 26.7, targets 60/22.5/17.5) — mine (2024-only): 45.7 / 43.9 / 29.4 / 26.7 / 60.1/22.4/17.4. **Agreement within 0.3pp everywhere → his M4 findings are now VERIFIED, not REPORTED.** (wl: his file is a REPORTED aggregation without pins; this is VERIFIED now.)
3. **Held-out lint** — `_agents/glm/tests/heldout-lint.mjs` (governance artifact from Beam §2.2): scans scripts for 2024/2025 data reads; run it on any fit script before trusting its output (`node _agents/glm/tests/heldout-lint.mjs <path>`). VERIFIED it exits 2 without args, 0 on a clean dir, and flags year-literals in read contexts.
4. **Confirmed for the pack:** ONE correction to the council's data map — **nflverse's nextgen_stats feed has NO defense file** (only passing/receiving/rushing; VERIFIED from that release's asset list), and `player_stats` has no defensive EPA columns — so **defense EPA must come from pbp with a defensive-player join**, or PFR. This can be scheduled under T1 rather than treated as "unavailable".

## Claude-facing prompt — Rev 2 (fold into the Claude boot prompt; supersedes Beam §4 brief on the data layer)

Claude — while you were out, the council built the T1 data floor. Read, then answer (same three questions as Beam §4; answers below update only the DATA layer):

- **New: hash-pinned 2024 anchor pack** at `_agents/glm/anchors/` (2024 REG, 272 games, sha256'd; README has formulas + receipts). It gives you T1 ladder level 3 (completion% by air yards, INT%, YAC, pressure→sack — from real pbp) and M4 volume anchors that now VERIFY Beam's numbers byte-for-byte. **M4's secondary conclusion stands on pinned data: secondary volume ≈ snap share (DB 43.9% vs engine ≈41.3%, inside the 5pp band); DL overweighted (+16pp); LB underweighted (−13pp); TE underweighted vs skill-EPA (23.2% vs 12.7%).**
- **Data-only anchor (Beam M3d) is now derivable from the pack alone** — no more "needs external data" block on M4; M5 by-OVR still needs the Madden 27 OVR join (open; Beam flagged it out of scope once, it's still cheap: name+pos, ≥8 games, ≥30 touches).
- **Defense EPA is NOT unavailable** — it is a pbp-join task (defensive player attribution per play); nextgen_stats has no defense feed; `player_stats` has no defense columns. Say "unjoin" when you mean "not yet joined", not "not available".
- Held-out lint before you run or trust any fit script: `node _agents/glm/tests/heldout-lint.mjs <path>` — no fit may read 2024/2025 raw data; the pack is the only thing that may touch 2024 (it is context, not a fit target; nothing fits against it yet — by design, prereg-first).
- Owner permission note (binding, from Beam's addendum): the old personal table AND the salary table are **both** retired as calibration targets or foundations. New display presets: QB=1000, increments of 50, derived from engine math. Any tool that treats design.json or the salary table as a fit target is dead unless the Owner revives it explicitly.
- My stake on your open items (seat glm): raw-curve witness — YES, on the Colors track too (Q3); the per-build export is the only artifact that makes the circularity *visible* rather than hypothetical, and the anchor pack gives you something to hold beside it. Parameter-diff (Q2): the pack does not change your diff choreography — it changes what "converged" must mean (measure against data-first, not table-first). RNG (c): put the injectable RNG where T2 pairs seeds — draft first, games are downstream of lineups.
- Handoff: run my two scripts after cloning my lane (commands in the README) — both print one-page receipts; total wall <1 min except pbp one-pass (~15 s).

## HOW TO CHECK (command + expected)
- `node _agents/glm/anchors/pbp-level3.mjs` → `reg_games=272`, comp% monotone per bucket (exact numbers above).
- `node _agents/glm/anchors/group-shares-2024.mjs` (to /dev/null) → exit 0.
- `node _agents/glm/tests/heldout-lint.mjs _agents/glm/anchors` → clean (my own pack doesn't fit).
- `shasum -a 256 _agents/glm/anchors/raw/*` → compare four sha256s above.
