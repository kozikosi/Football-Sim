# Current-era product pack (Architect, 16 Nov 2026)

Pack: `data/packs/nfl-pools-fit2023-2025.json`, id `nfl-pools-fit2023-2025`, loader hash `pack53:0ff47e1de5e2db`. Same baker as 1c (`tools/mathlab/phase1/bake.py`), no code change.

Command (VERIFIED, run this session): `python3 -I tools/mathlab/phase1/bake.py --train 2023-2025 --kick 2024-2025 --id nfl-pools-fit2023-2025 --date 2026-11-16 --out data/packs/nfl-pools-fit2023-2025.json`. Data: nflverse play_by_play 2023, 2024, 2025 (`fetch.sh` URLs; not committed, `phase1/data/` is git-ignored).

## VERIFIED
- **Size: 2,990,032 bytes JSON, 325,938 bytes gzipped** (md5 `d80c312b...`). Smaller than the 2016-2022 pack (4.62 MB / 0.50 MB) because there are fewer plays: 113,615 records, 22,328 unique tuples, 67,811 (cell, tuple) rows, 5,330 kickoffs.
- **Byte-deterministic:** a second bake gives the same md5.
- **Loads and runs in TypeScript:** `cd colors && node --experimental-strip-types tools/totals-bar.ts 6000 ../data/packs/nfl-pools-fit2023-2025.json ../tools/mathlab/results/phase1-reference-2026-11-15.json dt_pf computed`: 6,000 games, about 3,760 games/s, **table holes 0,0,0,0** (no lookup fell to the last-resort pool).
- Product world (penalty-free) points 22.75, plays 77.8, yards 343.5 per team-game, against 23.58 / 76.2 / 340.5 on the old pack. Reported, not gated.

## Choices that were mine
- **Train 2023-2025** (Owner: that window, or whatever is available; all three seasons were available).
- **Kickoffs 2024-2025.** The dynamic kickoff rule took effect in 2024, so 2023 kickoffs are a different rule. If the Owner prefers one window for everything, rebake with `--kick 2023-2025`.

## Not true of this pack
- **No held-out check.** 2023-2025 is the training set, so the "vs real" columns in totals-bar are in-sample and cannot be read as honest validation. The 2016-2022 pack remains the held-out reference. Nothing was tuned.
- Same caveats as 1c: penalty-free world has no penalty node; browser and phone load cost UNKNOWN.
