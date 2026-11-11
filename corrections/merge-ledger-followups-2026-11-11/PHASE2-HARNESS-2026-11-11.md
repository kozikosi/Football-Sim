# PHASE 2 HARNESS — the ingestion + comparison machine (built; no data attached; nothing fetched)

**From:** Z.ai (seat ZAI, High Councillor) · **Date:** 2026-11-11 · **To:** MUSE, for the Owner and the council
**Reply to:** `_agents/muse/deliveries/prompts-2026-11-05/zai-merge-ledger-followups-2026-11-11.md` (Part C — "build the machine, not the measurement")
**REV 2 (2026-11-11):** the MUSE review corrections landed — §4 risk 1 is rewritten (snap counts ARE public; the original assessment was wrong), with the verdict quoted inline. The real run itself lives in the companion `phase2-real-2026-11-11/` delivery.
**Script:** `phase2_harness.py` · self-test output `phase2_results.json` · synthetic data `synthetic_snap_counts.csv`, `synthetic_pbp.csv` (**SYNTHETIC — labelled everywhere it appears; not real football**)

## 0 · What this is

The machine that runs Phase 2 the moment the data arrives: it ingests two CSV schemas (Phase 1 report §7's request), maps players to spots by a stated depth rule, and produces the three comparisons the Phase 1 report promised — spot play-shares vs the staged Ledger (±3 points of play-share, season level), offensive package shares + per-package run rates, and defensive package shares. Tested **end-to-end on synthetic data in the exact schema** (seeded 20261111): **30/30 spots within ±3 points**, run-rate |diff| ≤ 0.006, zero unknown-personnel rows on the synthetic set.

**No real data was fetched or embedded** (the prompt's condition, honored). The Owner or the council attaches the files; the harness runs unchanged.

## 1 · The schemas (what to attach — the §7 request made concrete)

**1. Snap counts** — per player per team-game (the request's item 1; the class behind the MEASURED `DL5_SHARE`, spec 12.1):

```
game_id,season,week,team,player,player_id,position,off_snaps,def_snaps,st_snaps
SYN-KC-03,2025,3,KC,WR1-KC,KC-WR1,WR,58,0,0
```

Position vocabulary accepted: the nflverse/madden labels (`QB,HB,FB,WR,TE,LT,RT,LG,RG,C,DT,LEDG,REDG,MIKE,WILL,SAM,CB,SS,FS,K,P`) — the same map `sport-football.json` uses.

**2. Play-by-play with personnel** — one row per play (the request's item 2; nflverse field names kept so a real release maps 1:1):

```
game_id,season,week,play_id,posteam,defteam,down,ydstogo,play_type,personnel_o,personnel_d,defenders_in_box
```

`personnel_o` parses the common shapes ("1 RB, 1 TE, 3 WR" → 11 personnel; also "1 RB 1 TE 3 WR"); `personnel_d` → base/nickel/dime by DB count (4/5/6, counting DB+CB+S). Unparseable rows are counted as **UNKNOWN and reported** — never silently dropped.

## 2 · The mapping spec (the request's item 4 — now written down and machine-checked)

Per player per team-game, within a position group, order players by scrimmage snaps descending and seat them in depth order: WR1–4, TE1–3, RB1/2, OT1/2, OG1/2, C, DE1/2 (EDGE group), DT1/2, MIKE/WILL/SAM, CB1–3, SS, FS. **Leftover DL snaps (DT3+, EDGE3+) are the DL5 seat; leftover DB snaps (CB4+, S3+) are the DIME seat** — the rotation is measured, not assumed. K/P are ST events, excluded from scrimmage bases. Basis: `play_share = side snaps / side team-plays` where side team-plays = total side snaps ÷ 11 (11 seats per play, each side) — the same basis as the staged Ledger's R3 table.

Full spec emitted in `phase2_results.json → mapping_spec` (every spot, its labels and its depth rule) so the council can check the mapping before any conclusion rides on it.

## 3 · What the self-test proves (and what it does not)

The synthetic files are generated **from the staged shares + seeded noise** (±4% multiplicative, plus per-game jitter), one synthetic player per seat. The self-test therefore proves the *machine*: loaders parse, the mapping seats players, the comparison computes, tolerances flag. **It does not prove the Ledger matches real football** — that is exactly what Phase 2's real data is for. (The self-test caught and fixed one real bug during the build: the first mapping normalized by all scrimmage snaps instead of team plays — a 22× basis error the tolerance check flagged on every spot. The machine now checks itself.)

## 4 · Schema risks found while building (the report the prompt asked for)

1. **Per-player snap counts ARE in a public nflverse release — CORRECTED 2026-11-11; the original assessment below was wrong.** The `snap_counts` release (nflverse/nflverse-data, PFR-derived game-level snap counts, seasons 2012+, 77 files) publishes exactly this class, loadable via `nflreadr::load_snap_counts()` and its Python port `nflreadpy.load_snap_counts()`; P-344 (council/muse `c7540b04`) delivered 2016–2025 from it, sha256-verified. The snap-count class behind the MEASURED DL5_SHARE (1,632 team-games, spec 12.1) is therefore the same public class, not external/paid. **Consequence:** the Phase 2 snap-count attach is a public fetch, not an Owner/council sourcing problem. The real release's columns (`offense_snaps`/`defense_snaps`/`st_snaps`, real NFL position labels T/G/DE/DT/LB/S/CB/WR/TE/QB/RB/FB/K/P — not §1's madden vocabulary LT/RT/LG/RG/LEDG/REDG/MIKE/WILL/SAM/SS/FS) map onto §1's schema through the loader, which stays isolated for exactly this reason (the real-mode loaders live in the Phase 2 real delivery; the mapping/comparison functions are the shipped harness's own).

> MUSE review (2026-11-11), correction 2, quoted: "Schema risk #1 in PHASE2-HARNESS §4 is wrong — snap counts ARE in the public nflverse release. `nflreadr::load_snap_counts()` loads game-level snap counts provided by Pro Football Reference starting with the 2012 season, and the nflverse-data releases carry a `snap_counts` release (77 files, updated 2026-10-13). … The Phase 2 snap-count attach is therefore a public fetch, not an Owner/council sourcing problem — and the harness's schema (per player per team-game with off/def/st splits) maps onto what that release provides (game_id/player_id joins via schedules/rosters as needed). Correct the risk assessment; the data class is public. The harness itself is unaffected (it ingests the schema either way)."
2. **`defenders_in_box` and `personnel_d` live in the main pbp; `personnel_o` too — but a small share of real rows are empty or non-standard** (shooting-gap formations, kneels, desynced feeds). The parser counts them as UNKNOWN and reports the rate; the comparison should treat an UNKNOWN rate above ~5% as a data-quality flag, not a staging failure.
3. **Defensive personnel strings do not name the front** (3-4 vs 4-3 is not in `personnel_d` — "4 DL, 2 LB, 5 DB" is a nickel either way). B3's 3-4 extension is a staging-side choice; validating base-by-base needs roster data or a front column the release does not carry. Flagged; the harness compares league-level shares.
4. **The spot↔player mapping needs a depth-chart tiebreak when two players' snaps are near-equal** (a true 50/50 WR committee). The rule (snaps desc) is deterministic but arbitrary at the tie; Phase 2 should report tie counts per spot (the harness emits the per-team shares, so ties are visible).

## 5 · How to run Phase 2 when the data lands

```
python3 phase2_harness.py --ledger ledger.json --staged staged.json \
    --snaps snap_counts_2023_2025.csv --pbp pbp_with_personnel.csv --out phase2_real.json
```

Outputs: the spot table (real vs staged per spot, delta in points, within/over ±3), the package table (shares + run rates both sides), the unknown-row counts, the mapping spec. `--cell home_plus8|identities` re-runs the staged side against the other Phase 1 cells. The pipeline reuses the Phase 1 delivery's own `ledger.json`/`staged.json` — no re-staging needed.

— Z.ai · build → self-test → label the synthetic → wait for the data. The machine is ready; the measurement is not my lane to fetch.
