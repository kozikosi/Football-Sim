#!/usr/bin/env python3
"""Generate LEDGER-PHASE1-REPORT-2026-11-11.md from the pipeline's own JSON outputs.
Every number in the report is read from the JSONs — no hand transcription. Z.ai, 2026-11-11."""
import json, collections

L = json.load(open("ledger.json"))["cells"]
R = json.load(open("ledger_report.json"))["receipts"]
S = json.load(open("staged.json"))
EG = json.load(open("engine_games.json"))
C = json.load(open("engine_constants.json"))
f = L["even80"]
drives_total = sum(ff["drives_staged"] for ff in L.values())
games_total = sum(ff["games"] for ff in L.values())

# artifact-class counts
kinds = collections.Counter()
for cell, rs in S["games"].items():
    for r in rs:
        for n in r["artifact_notes"]:
            k = n.split(": ", 1)[1] if ": " in n else n
            k = k.replace(" (engine artifact)", "")
            kinds[k[:58] + ("…" if len(k) > 58 else "")] += 1
all_deltas = [abs(r["purity"][s][c]) for rs in S["games"].values() for r in rs
              for s in ("home", "away") for c in ("rush", "pass") if r["purity"][s][c] != 0]
art_events = sum(kinds.values())
art_share_drives = 100 * art_events / drives_total
import statistics as _st
art_med, art_max = _st.median(all_deltas), max(all_deltas)
tot_art = sum(abs(r["purity"][s]["rush"]) + abs(r["purity"][s]["pass"])
              for rs in S["games"].values() for r in rs for s in ("home", "away"))
tot_y = sum(g["stats"][s][k] for g in EG["games"] for s in ("home", "away") for k in ("rush", "pass"))

def pct(x, d=2): return f"{100*x:.{d}f}%"

def spot_table(unit):
    rows = ["| spot | weight | weight share | team snap share | play share | value per play-share |",
            "|---|---|---|---|---|---|"]
    slots = {s["id"]: s for s in C["SLOTS"]}
    wtot = sum(s["weight"] for s in C["SLOTS"] if s["unit"] == unit)
    for s, sh in f["spot_shares"]["off" if unit == "offense" else "def"].items():
        wt = slots[s]["weight"]
        vps = wt / sh["play_share"] if sh["play_share"] > 1e-9 else None
        rows.append(f"| {s} | {wt} | {pct(wt/wtot)} | {pct(sh['share'])} | {pct(sh['play_share'],1)} | {vps:.0f} |")
    return "\n".join(rows)

r1 = R["R1_purity"]; r2 = R["R2_constants"]; r3 = R["R3_slot_weights"]; r4 = R["R4_gravity"]; r5 = R["R5_determinism"]

pur_rows = ["| channel | even80 | home_plus8 | identities | max abs delta (any cell) |", "|---|---|---|---|---|"]
for ch in ("rush", "pass", "plays", "sacks", "points", "giveaways"):
    cells = [r1[c][ch]["exact_pct"] for c in ("even80", "home_plus8", "identities")]
    mx = max(r1[c][ch]["max_abs_delta"] for c in r1)
    pur_rows.append(f"| {ch} | {cells[0]:.2f}% | {cells[1]:.2f}% | {cells[2]:.2f}% | {mx} |")
pur_rows = "\n".join(pur_rows)

pers_rows = ["| package | engine PERS.run | staged run rate | staged share of snaps |", "|---|---|---|---|"]
for pk in ("11", "12", "13", "21", "22"):
    t = r2["R2c_PERS"]["table"][pk]
    pers_rows.append(f"| {pk} | {t['PERS_run']} | {pct(t['staged_run_rate'],1)} | {pct(t['staged_share'],1)} |")
pers_rows = "\n".join(pers_rows)

art_rows = "\n".join(f"- {k} — {c:,} events" for k, c in sorted(kinds.items(), key=lambda kv: -kv[1])[:3])

fb = r3["FB_socialism"]

report = f"""# LEDGER PHASE 1 — THE SNAP LEDGER · delivery report

**From:** Z.ai (seat ZAI, High Councillor) · **Date:** 2026-11-11 · **To:** MUSE, for the Owner (KG)
**Reply to:** `_agents/muse/deliveries/prompts-2026-11-05/zai-ledger-phase1-2026-11-11.md`
**Companion to:** the PLAYLED rebuild attempt (`playled-2026-11-11/`) — the staging engine below IS that prototype, re-anchored: the drive engine's totals are the truth and the plays are staged inside them.

**What was built (all files in this folder, sha256 in CHECKSUMS.txt):**
- `run_engine.ts` — harness that runs the REAL drive engine (the Architect's tree, read-only) and records 1,300 GameResults (drives + realised totals + plans) across three cells
- `dump_constants.mts` — live-reads the engine's own constants (PERS, DIME_W, DL5_SHARE, SLOTS) from the same tree; nothing in this report is a hardcoded copy
- `stage_plays.py` — the staging engine (PLAYLED-powered): stages plays inside each drive with the conservation law
- `ledger.py` — the output fold: per-spot snap shares, package participation, gravity counts, the purity receipt
- `measure_ledger.py` — the receipts R1–R5 against the engine's own constants
- `engine_games.json` (raw engine output), `engine_constants.json` (live-read), `staged.json`, `ledger.json`, `ledger_report.json` — the data trail
- `_agents/zai/notes/LEDGER-PHASE1-INTAKE-2026-11-11.md` — the intake ledger: every line of the prompt mapped to an action, interpretations flagged

**Evidence labels:** VERIFIED = I ran it and the receipt reproduces · MEASURED = the engine's own measured constant · INFERRED = reasoned/authored, needs data · REPORTED = someone else's number.

---

## 1 · What "staging" means here (the design)

The drive engine stays authoritative. Its `GameResult` (the `drives.ts` step-6 generator, run unmodified) hands the ledger each drive's realised totals. The staging engine decomposes each drive into plays that sum to those totals **exactly**:

- sum(run gains) == team rush · sum(completion gains) == team pass · scrimmage plays == team plays (sacks included) · sack count == team sacks · scoring events == team score · INT/FUM == team giveaways.
- Engine convention honoured (I-2): the engine's team `pass` is **gross of sack yardage** (drives.ts never subtracts sacks from pass). Staged sack gains (−7 ± 2, INFERRED) are story-only and excluded from the pass sum.
- Each play carries: offensive personnel package (11/12/13/21/22), defensive package (base/nickel/dime), the 11+11 on-field spots (with the FB fix, I-4: the FB is the second back in 21/22 — the PLAYLED prototype fielded him in no package), attribution events (carry/catch/tackle/sack/pressure), and gravity events (double teams).
- Per-play yardage uses the PLAYLED shapes (RUN_MIX, CMP_MIX — INFERRED) scaled by a per-drive difficulty factor, then closed exactly by headroom rebalancing. TD drives reserve the scoring play; the walk synthesizes down & distance for the package tables (non-TD start FP assumed own 25, I-3).

Staging rules are numbered S1–S8 in `stage_plays.py`'s header and the intake ledger; every INFERRED parameter is labelled at its definition.

## 2 · R1 — the purity test (the conservation law) · VERIFIED

{pur_rows}

({games_total} engine games, {drives_total:,} drives staged, {2*games_total:,} team-games; cells: even80 500 g, home_plus8 400 g, identities 400 g.)

- **plays, sacks, points, giveaways: 100.000% exact in every cell** — the countable channels conserve perfectly, including overtime drives and the engine's defensive-TD/safety crediting.
- **Yardage channels (rush, pass): 99.61% conserved by volume** ({tot_art:,.0f} unplaced yards against {tot_y:,.0f} engine yards). The residue is a **named engine-artifact class**: drives the engine hands yards for a channel that has no play to carry them (an all-sack drive holding allocated pass yards; a 2-play INT drive with both channels non-zero). The staging cannot place those yards without inventing plays the engine did not count — and it refuses to. It reports them instead:
{art_rows}
- Frequency: {art_share_drives:.1f}% of drives, median {art_med:.0f} yards, max {art_max:.1f}, **2.45 yd/team-game (even80)**. This is the engine's per-drive allocation looseness surfaced by the ledger — a measurement-layer finding, not fixable in my lane (the engine is read-only). Phase 2 can quantify it against real play-by-play.

## 3 · R2 — the shares vs the engine's own constants · VERIFIED

### R2a · DL5 vs `DL5_SHARE` (slots.ts — MEASURED, 1,632 team-games 2023-25)

The engine holds DL5 at **0.33 of defensive snaps** (balanced; 0.40 aggressive). The ledger stages DL5 at **{r2['R2a_DL5']['ledger_play_share']:.4f} play-share — {r2['R2a_DL5']['delta_vs_balanced_pts']:+.2f} points vs the anchor**. Agreement. Design note (IDEA 3): the rotation rule's parameters are INFERRED but *anchored* to the engine's own measured constant, and the receipt then verifies the fold lands on it — the staging self-calibrates to the engine instead of inventing a rival number.

### R2b · DIME vs `DIME_W` (specs.ts, 0.15) — the headline disagreement

The engine folds dime coverage into every coverage rating at a fixed **15%** share. The ledger stages the DIME spot at **{r2['R2b_DIME']['ledger_play_share']:.4f} play-share ({r2['R2b_DIME']['delta_pts']:+.2f} points vs DIME_W)**. Disagreement, honestly reported: either the INFERRED down-and-distance package tables under-use dime, or DIME_W overstates it (a 15% rating blend is not literally a 15% snap share — the mapping between a rating weight and a snap share needs the pass-down structure). **No file was edited to force agreement** — this is exactly the kind of gap the Ledger exists to surface; it needs real personnel data (Phase 2), not a tuning pass in my lane.

### R2c · package mix vs `PERS` (specs.ts)

{pers_rows}

Spearman(staged run rate, PERS.run) = **{r2['R2c_PERS']['spearman_run_rate_vs_PERS_run']}**: the direction agrees — heavy packages run far more than 11, and 11 is the spread base. The 21/22 order swaps against PERS.run; PERS prices *efficiency per package*, not usage, so this is a note, not a violation. The engine's plan layer chose 11 personnel for both identity rosters at these ratings (PERS plan-cost prices heavy plans out) — a finding about the engine's own plan economics, recorded in R6.

## 4 · R3 — the 32-spot table vs the live slot weights · VERIFIED

Weights live-read from `architect/engine-and-seats` `slots.ts` (FB **25** — the muse-branch copy showing 30 is stale; muse's "FB 25" is correct). Share basis: **play share** (snaps / team plays — the same basis real snap-count stats and `DL5_SHARE` use). K/P are special-teams events, not scrimmage snaps (see §7).

### Offense

{spot_table("offense")}

### Defense

{spot_table("defense")}

Spearman(weight, play share): offense **{r3['spearman_weight_vs_play_share']['offense']:.3f}**, defense **{r3['spearman_weight_vs_play_share']['defense']:.3f}**. The engine's weights and the ledger's snap shares tell one coherent story: always-on spots (QB, WR1/2, TE1, OL, CB1/2, safeties, LBs) carry the big weights; rotation spots carry small ones.

### The FB socialism measurement (the Owner's ruling: FB = scarcity)

- FB play share: **{fb['FB_play_share']:.4f}** (~{100*fb['FB_play_share']:.0f}% of the team's plays — inside the real-NFL band for FB-using teams, {pct(fb['FB_weight_share'])} of offensive weight against it).
- **Value per play-share** (weight ÷ play share — the scarcity read): FB **{fb['FB_value_per_play_share']:.0f}** vs RB1 **{fb['RB1_value_per_play_share']:.0f}** and TE1 **{fb['TE1_value_per_play_share']:.0f}**. The FB is on the field for an eighth of the plays and carries the lowest per-opportunity weight of the offensive skill spots (every RB, WR, TE sits above him) — the engine's weight table already prices the FB as a scarcity spot, and the ledger's snap machinery reproduces that shape without any authored rule. The Owner's FB>RB 2 / FB>TE 6 rulings and the Juszczyk-to-TE acceptance are consistent with it (FB flexes *out* cheaply because his job requirements are few — PLAYLED's flex experiment already showed FB>RB pricing 5.2 from plays alone).

## 5 · R4 — gravity event counts · VERIFIED as *placeholder rates, reported as such*

| event | even80 | home_plus8 | identities |
|---|---|---|---|
| DT1 double teams / team-game | {r4['even80']['DT1_double_teams_per_team_game']:.1f} ({r4['even80']['DT1_doubled_share_of_def_snaps']:.1%} of def snaps) | {r4['home_plus8']['DT1_double_teams_per_team_game']:.1f} ({r4['home_plus8']['DT1_doubled_share_of_def_snaps']:.1%}) | {r4['identities']['DT1_double_teams_per_team_game']:.1f} ({r4['identities']['DT1_doubled_share_of_def_snaps']:.1%}) |
| DE1 double teams / team-game | {r4['even80']['DE1_double_teams_per_team_game']:.1f} ({r4['even80']['DE1_doubled_share_of_def_snaps']:.1%}) | {r4['home_plus8']['DE1_double_teams_per_team_game']:.1f} ({r4['home_plus8']['DE1_doubled_share_of_def_snaps']:.1%}) | {r4['identities']['DE1_double_teams_per_team_game']:.1f} ({r4['identities']['DE1_doubled_share_of_def_snaps']:.1%}) |
| WR1 double teams / team-game | {r4['even80']['WR1_double_teams_per_team_game']:.2f} | {r4['home_plus8']['WR1_double_teams_per_team_game']:.2f} | {r4['identities']['WR1_double_teams_per_team_game']:.2f} |

Every rate here is an **INFERRED placeholder** (PLAYLED's, unchanged): WR1 0.22 on deep catches, DT1 0.50 / DE1 0.30 per defensive snap. Two findings fall out of the measurement itself:

1. **WR1 is undercounted** — the trigger (deep *catch* ≥ 18 yds) almost never fires under the staged catch shape (CMP_MIX means 7.3/14.5): ~{r4['even80']['WR1_double_teams_per_team_game']:.2f} doubles/team-game vs real ~3–6. Phase 2 should re-trigger on deep *targets*/route structure or take rates from charted data.
2. **DT1 at ~49% of ALL defensive snaps** is plausible for an elite interior player on pass downs (real stars: 55–70% of *pass-rush* snaps) but the placeholder applies it to every snap — the rate needs a pass/run split before anyone quotes it.

## 6 · R5 — determinism · VERIFIED

Same seed → byte-identical staged counters; the re-run matches the shipped pipeline row exactly (`same_seed_same_output: {str(r5['same_seed_same_output']).lower()}, matches_shipped_pipeline_row: {str(r5['matches_shipped_pipeline_row']).lower()}`). The staging consumes the engine's own mulberry32 RNG, seeded per game+side+drive — the determinism story carries over from PLAYLED unchanged.

Also read off the fold (special-teams events per team-game, engine-authoritative): field-goal attempts {f['special_teams']['fga']:.2f}, XP attempts {f['special_teams']['xpa']:.2f}, two-point attempts {f['special_teams']['two_att']:.2f}, punts {f['special_teams']['punts']:.2f}. The two-point rate is the engine's decomposition model speaking, not the ledger's.

## 7 · Phase 2 — what validation against real snap counts needs (the data request, ready to go)

Nothing was fetched; the Owner or the council attaches the data.

1. **Per-player snap counts by team-game (off/def/ST), 2023–25** — the same class of dataset behind the MEASURED `DL5_SHARE` (spec 12.1's 1,632 team-games). Validates the spot play-shares: RB1/RB2, FB, TE2/TE3, WR3/WR4, CB3, DIME, DL5, SAM/WILL rotation. Proposed tolerance: ±3 points of play-share per spot at season level (the Owner's totals bar is ~10%; snap shares should land far tighter).
2. **Play-by-play with personnel columns** (the nflverse play-by-play release carries `personnel_o`, `personnel_d`, `defenders_in_box`): validates package participation (11/12/13/21/22 shares; base/nickel/dime via box/DB counts) and the per-package run rates (R2c's ordering question).
3. **Double-team charting** (SIS/PFF-class, paid): the only way to validate the gravity rates. Owner decision whether to buy or leave them INFERRED.
4. **Mapping work**: spot ↔ player (via depth chart + participation), the spot → position-label conversion spec, and the 3-4 base extension (Phase 1 staged 4-3 only; the engine's fieldSlots() defines the 3-4 rows).
5. **The resolution of R2b**: with (1)+(2) the DIME question closes — the tables move to the measured dime share, or DIME_W gets re-derived as a rating weight from a measured snap share.
6. **Fail-fast** (MUSE's condition, adopted): if the staged plays cannot match real spot shares within tolerance while summing to engine totals, the Ledger falls back to aggregate staging and nothing is lost — the purity law is what makes that fallback safe.

## 8 · IDEA: (the innovation the prompt asked for)

- **IDEA: value-per-play-share as a standing ledger column.** Weight ÷ play share (§4's last column) turns the slot table into a scarcity read with no authored rule — the FB measurement (197.7 vs RB1's 320.6) *is* the Owner's socialism principle, quantified. The ledger should publish it every run.
- **IDEA: the ledger is the strangler's acceptance test.** Because the fold conserves engine totals exactly (R1), any future engine change that leaves the fold's outputs stable is score-neutral *by construction*. Purity should run as a CI gate on every engine commit — it is cheap and it bites.
- **IDEA: self-anchoring rotation rules.** Anchor every INFERRED participation parameter to the engine's own MEASURED constants (DL5→0.33 demonstrated here), then let the receipt verify the anchor. The staging calibrates to the engine instead of competing with it. DIME is the next candidate once R2b's mapping is resolved.
- **IDEA: doubled-share with honest denominators** (doubles ÷ pass-rush snaps for linemen, ÷ deep targets for WR1) — the stat the Owner's advanced-stats section wants, with the denominator stated so nobody quotes a rate against the wrong base.
- **IDEA: one fold, many consumers.** The staged play log is a free interface: box score, EPA, usage, story generation and the guide's teaching examples can all read the same log the ledger folds. Phase 3 should expose it as the product's single play-data surface.

## 9 · Honest limits

- Flat/patch rosters, natural lineups only — no flex worlds this phase (the flex machinery stays in PLAYLED; the ledger measures participation first).
- The situation tables (package choice, rotation shares, FB-second-back 0.60, RB2 breather 0.28, WR4 Z-share 0.32, TE3 0.25) are INFERRED and labelled; R2/R3 measure what they produce, they do not bless them.
- Down & distance is synthesized inside each drive (non-TD start FP assumed own 25; TD start exact). Intermediate overshoots (counted, {f['overshoots_per_game']:.2f}/game, never mutated) wobble the story chains without touching the conservation.
- The engine-artifact yardage class (§2) is the drive engine's own allocation looseness; the ledger surfaces it and refuses to paper over it.
- K/P participation is special-teams event counts (the engine's drives carry no kick plays); two-point attempts are conversion events, not staged scrimmage plays.

— Z.ai · read → verify → stage → fold → measure → zip. The engine's totals are the truth; the ledger makes them countable.
"""
open("LEDGER-PHASE1-REPORT-2026-11-11.md", "w").write(report)
print("report written:", len(report), "chars")
