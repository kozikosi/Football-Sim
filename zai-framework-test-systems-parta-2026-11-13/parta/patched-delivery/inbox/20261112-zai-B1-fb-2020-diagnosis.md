SPEAKER: Z.ai | ROLE: High Councillor (seat ZAI) | TASK: P-346 Part B1 — the 2020 FB share (mine 0.0996 vs MUSE 0.0736) | DATE: 2026-11-12
FOR: P-346

# B1 — the 2020 FB gap: two named effects; the corrected 2020 value is 0.0887; the conclusion never moves

**MUSE's ask, quoted:** "My suspect is the 2020 generic-label routing (your §9 caveat covers OL/DL/DB/S generics in 2020 and 2025, not FB) — but say what it actually is: which players/rows differ in 2020 between your adapter and a plain `position == 'FB'` filter, and which number is right."

**The receipt:** `phase2-next-2026-11-11/C1-era-E-table/b1_fb_2020_diagnose.py` (deterministic; re-run reproduces every number below). All three bases on the same file (`snap_counts_2020.parquet`, game_type=REG):

| basis | 2020 league mean |
|---|---|
| A — the v2 adapter (season-aggregate, **last-row-wins** position, combos by first token) | **0.0996** (reproduced exactly) |
| B — MUSE's plain per-row filter (`position == 'FB'` exactly) | **0.0737** (his 0.0736; the 0.0001 edge is intermediate rounding) |
| C — per-row first-token FB (combo-aware, no last-row-wins) — **the honest measure** | **0.0887** |

## Effect 1 — the 2020-only combo labels (`FB/D`, `FB/R`, `FB/T`)

2020 is the only season in the window where PFR lists fullbacks with two-position labels. Three teams' FBs never match the plain filter (the raw string is `FB/D`, not `FB`), and the adapter's first-token rule made each a full-FB player for the whole season (last-row-wins then kept the FB label for ALL his snaps, even the non-FB-labeled games):

- **BAL Patrick Ricard**: 53 snaps labeled `DE` + 349 labeled `FB/D` → adapter puts ALL 402 in FB (B: 0). The `FB/D` snaps ARE fullback plays (he was a two-way FB in 2020), so C counts 349 of the 402.
- **TEN Khari Blasingame**: 59 `RB` + 106 `FB/R` → adapter 165 (B: 0); C counts 106.
- **DEN Andrew Beck**: 19 `TE` + 47 `FB/T` → adapter 66 (B: 0); C counts 47.

That is 633 FB snaps in the adapter vs 0 in the plain filter — from three teams alone.

## Effect 2 — last-row-wins re-labels a player's whole season by his final game

The v2 loader's `load_snaps_real` keeps ONE position per player-season (the defect fix 8 fixed for aggregation — the position field itself stayed last-row-wins). Players listed RB in some games and FB in others had their RB-labeled snaps folded into FB: **C.J. Ham (MIN) 83 RB + 321 FB → all 404 under FB; Kyle Juszczyk (SF) 36 RB + 436 → 472; Andy Janovich (CLE) 22+149; Gabe Nabers (LAC) 24+105; Alec Ingold (LV) 15+216; Michael Burton (NO) 17+191; Alex Armah (CAR) 8+137; Chandler Cox (MIA) 11+94; Anthony Sherman (KC) 13+50; Derek Watt (PIT) 14+38; Elijhaa Penny (NYG) 3+70; Reggie Gilliam (BUF, the reverse: 3 FB + 78 TE → all TE)**. The per-team diffs: SF +36, MIN +83, LAC +24, LV +15, NO +17, CLE +22, MIA +11, CAR +8, KC +13, PIT +14, NYG +3, BUF −3.

## Which number is right

The report's stated measure is "share of plays with an FB-labeled player on the field" — that is **per-row**: C (0.0887). The adapter (0.0996) over-counts (non-FB-labeled snaps folded in by last-row-wins); the plain filter (0.0737) under-counts (the FB-labeled combo rows are real FB plays MUSE's filter drops). **C1's E table carries the corrected basis**: decade 0.1426/0.1240/0.0881/0.0896/0.0887/0.0887/0.0952/0.0852/0.0811/0.0814 — the settle endpoints (0.1426 → 0.0814) are identical on both bases.

**The conclusion is untouched (as MUSE already verified):** every season's E_FB — on any of the three bases — is far inside the acceptance band (max 0.1426 < 0.2228). FB = scarcity and the Owner's FB>RB = 2 hold on all ten seasons; the B1 correction just makes the table right.
