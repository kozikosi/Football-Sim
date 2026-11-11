SPEAKER: PICKLE | ROLE: council | TASK: Review Z.ai's play-level answer (the Plays Ledger) for P-341 | DATE: 2026-11-11T00:24:40Z
FOR: P-341
REVIEW-OF: ZAI-PLAY-LEVEL-ANSWER-2026-11-11.md (in `_agents/vl/deliveries/z-play-by-play-analysis/_agents/zai/deliveries/` on `origin/council/vl`, commit `9ede94bf`)

VERDICT: improved

# Review: Z.ai's play-level answer (Plays Ledger)

The design is right and the direction is right. As **filed**, the flagship demonstration (Appendix A) still does not reproduce — MUSE found that, and my independent re-run confirms every correction — and I found three further defects in the numbers, none of which changes a conclusion, all of which should be corrected before anyone cites the table. Corrected, the design looks *better* than filed: 13 of 15 rows I checked land exactly on the Owner's tier, including every row the Owner personally anchored.

## What I ran (receipts)

1. **Independent ability re-run.** Glyph's re-implementation `_agents/glyph/deliveries/zai-d1-kg-verify-2026-11-10.py` (`origin/council/glyph`) — a chain independent of MUSE's script (Glyph states he re-implemented from Z.ai's write-up, not MUSE's code) — with the Owner's three score changes (EDGE CARRY 4, C PBLK 6, TE PBLK 4), cross-side floor off. All of MUSE's recomputed ability raws reproduce exactly: FB>RB 3.30, FB>TE 4.74, C>OT 6.68, C>DT 9.12, C>OG 5.13, OLB>ILB 6.84, OLB>SS 8.12, OLB>FS 11.74, TE>FS 13.64, RB>FB 0.00, TE>FB 0.00. VERIFIED.
2. **Extended row set.** Added the Owner's personal anchors from the live 99-rule table (`origin/architect/engine-and-seats:tools/mathlab/flex.json`): QB>FS (ability 17.08), WR>TE (6.41, binding duty PBLK), TE>DIME (12.60), ILB>OLB (0.00). All land exactly on the Owner's tier. VERIFIED.
3. **The guard's value source.** `tools/mathlab/flexunify.mjs` line 16: `const v = cfg.weight` with `cfg = sport-football.json` — and that table carries the WILL/C bumps: **C 200, OLB 200** (log line 43 states "slots.ts a722681 + WILL/C bumps"). Z.ai's Appendix A guard stand-ins used **C 150, OLB 150** (slots.ts tip values). VERIFIED.
4. **Delivery contents.** `git ls-tree origin/council/vl _agents/vl/deliveries/z-play-by-play-analysis/` → 6 files; the "10-line arithmetic check" the answer cites is **not** among them. VERIFIED (confirms MUSE).
5. **Engine facts I leaned on, spot-checked at architect tip `f079d35`:** drives.ts (~11.5 drives; `allocate()` largest-remainder, "parts add up exactly"), boxscore.ts (SPD/STR credit), flex.ts (EMERGENCY_PENALTY 8, QB never emergency, DL5 min-of), matchup.ts (OFF_OPTS = 11/12/13/21/22 × run/neutral/pass, rbHeavy, te2-blend, DIME_W). VERIFIED.

## Findings

- **defect (confirmed — MUSE's, reproduced by me):** Appendix A's ability column does not reproduce from the tables the answer is built on. FB>TE is 4.74, not "~1–2" (and is an **exact** match with the Owner at tier 6, not "one tier low"); OLB>FS is 11.74, not "~8–9" (and is an **exact** match at tier 12, not a miss). The check script is not in the delivery, so the numbers cannot be checked from the delivery itself.
- **defect (new, mine): the guard column is not computed on the live value table either.** flexunify's `v` is `sport-football.json`'s weights with the WILL/C bumps: C 200, OLB 200 — not the C 150 / OLB 150 the Appendix uses as stand-ins. On the live table the C-family guards are 12.0 / 12.0 / 10.0 (not 14.0 / 14.0 / 12.5) and the OLB guard is 6.67 (not 10.0). Every tier is unchanged — the design is robust to the bump — but the filed guard numbers are neither the raw slot weights they claim to be nor the live design's values.
- **defect (new, mine): the C>OG footnote overstates what measured v does.** "flexunify's measured values shrink the C→OG gap … pulling the guard toward 6" is true only under an OG2-level anchor. Under flexunify's actual role-level v (OG 400, C 200) the guard is 10.0 → tier 12; under slotWins20 measured values it is 12.0 with an OG1 anchor (1.0 vs C 0.4) and 6.67 with OG2 (0.6 vs 0.4). The row swings between tier 2 and tier 12 on which destination value the guard anchors to — an anchoring **decision** the answer does not state it is making. Also note: ability alone prices C>OG exactly (5.13 → tier 6 = Owner 6); the entire miss is the guard's destination choice.
- **risk (confirmed and sharpened): the FB>RB tier is unstable inside the answer's own exposure band.** The boundary is exact: tier 2 requires max(3.30, 18·E) < 4.0, i.e. **E < 0.222**. At E = 0.15 the row prices 2 (Owner's value); at E = 0.25 it prices 6. This should be carried forward as a Step-1 acceptance test, not left as an unstated instability: the Owner's FB>RB = 2 is itself a falsifiable prediction of the fullback's snap share.
- **calibration question (new, mine): what is exposure actually for, on today's numbers?** With corrected ability and the live v table, the exposure weighting changes the outcome on exactly one family among the rows checked: **FB>RB**. The OLB family no longer needs it (the WILL/C bump already brought the plain guard to 6.67 → tier 6, matching the Owner on OLB>ILB and OLB>SS; OLB>FS is carried by ability), and the C family keeps the full guard at E ≈ 1 (exposure agreeing with the plain guard, not adding anything). Since E ≤ 1 can only pull guard-dominated prices down toward ability, and ability-only is 98/99, the direction of error is safe by construction — but the honest statement is: *exposure is load-bearing for the low-participation family and insurance elsewhere*. That makes Step 1's purpose precise: it exists to measure E for low-exposure roles (FB first), not to rescue the OLB rows.
- **intentional simplification (labelled as such in the answer, correctly):** role-level slot weights as stand-ins for measured values; exposure bands from general NFL knowledge (INFERRED bands, to be replaced by the ledger at Step 1).

**Not run by me:** the delivery's checksums (MUSE verified them — REPORTED); flexunify itself (I read its source, lines 13–16, 43, and the model definitions, but did not execute it); MUSE's own re-implementation script (my chain runs Glyph's instead); any engine code (design-only review; the engine facts above are grep receipts, not executions).

**Weakest point:** the answer's central quantitative claim — that `max(ability, E·guard)` fits the Owner without gates — currently rests on a demonstration whose ability column, guard column, and script are all either wrong as filed, computed on non-live stand-ins, or absent. The claim survives my re-run (13/15 exact on live v), but as filed it cannot be cited.

## Improved text — Appendix A, corrected and extended (run it yourself)

Owner column = live 99-rule `flex.json` (architect tip). Ability = ZAI-D1 with the Owner's three score changes, floor off. Guard `G = 20·(1 − v_src/v_dst)` when uphill, **v = flexunify's live table** (sport-football.json, WILL/C bumps). E bands INFERRED (FB 0.15–0.25, OLB 0.6–0.7, others ≈ 1).

| Row | Owner | Ability | G (live v) | E | E·G | max | Tier | Verdict |
|---|---|---|---|---|---|---|---|---|
| C>OT | 12 | 6.68 | 12.0 | ≈1 | 12.0 | 12.0 | **12** | ✓ |
| C>DT | 12 | 9.12 | 12.0 | ≈1 | 12.0 | 12.0 | **12** | ✓ |
| C>OG | 6 | 5.13 | 10.0 | ≈1 | 10.0 | 10.0 | **12** | ✗ destination-anchor decision (ability alone: 6 = exact) |
| FB>RB | 2 | 3.30 | 18.0 | 0.15–0.25 | 2.7–4.5 | 3.30–4.50 | **2–6** | straddle — tier 2 iff E < 0.222 |
| FB>TE | 6 | 4.74 | 18.0 | 0.15–0.25 | 2.7–4.5 | 4.74 | **6** | ✓ exact |
| RB>FB | 0 | 0.00 | 0 | — | 0 | 0 | **0** | ✓ |
| TE>FB | 0 | 0.00 | 0 | — | 0 | 0 | **0** | ✓ |
| OLB>ILB | 6 | 6.84 | 6.7 | 0.6–0.7 | 4.0–4.7 | 6.84 | **6** | ✓ (plain guard already 6 on live v) |
| OLB>SS | 6 | 8.12 | 6.7 | 0.6–0.7 | 4.0–4.7 | 8.12 | **6** | ✓ |
| OLB>FS | 12 | 11.74 | 6.7 | 0.6–0.7 | 4.0–4.7 | 11.74 | **12** | ✓ exact |
| TE>FS | 12 | 13.64 | 3.3 | ≈1 | 3.3 | 13.64 | **12** | ✓ |
| QB>FS | 12 | 17.08 | 0 | — | 0 | 17.08 | **12** | ✓ (guard correctly silent; row absent from the filed table) |
| WR>TE | 6 | 6.41 | 0 | — | 0 | 6.41 | **6** | ✓ binding duty PBLK = the Owner's stated reason |
| TE>DIME | 12 | 12.60 | 0 | — | 0 | 12.60 | **12** | ✓ |
| ILB>OLB | 0 | 0.00 | 0 | — | 0 | 0 | **0** | ✓ (MIKE>WILL free) |

**13 exact, 1 straddle, 1 miss — and every row the Owner personally anchored lands exactly, for the mechanistically right reason (WR>TE binds on PBLK).**

### Reproduction script (this is the check the delivery was missing)

Save the two inputs next to the script, then run. Commands (from any worktree with the remotes fetched):

```
git show origin/council/glyph:_agents/glyph/deliveries/zai-d1-kg-verify-2026-11-10.py > zai-d1.py
git show origin/architect/engine-and-seats:tools/mathlab/flex.json > flex.json
python3 pickle-p341-check.py    # script below, in the same directory
```

```python
#!/usr/bin/env python3
# pickle-p341-check.py — Pickle's independent P-341 check (2026-11-11).
# Ability: ZAI-D1 (Glyph's re-implementation) + Owner score changes (EDGE CARRY 4,
# C PBLK 6, TE PBLK 4), floor off. Guard: 20*(1 - v_src/v_dst) uphill, v = flexunify's
# live role table (sport-football.json, WILL/C bumps). Owner: live 99-rule flex.json.
import importlib.util, copy, json

spec = importlib.util.spec_from_file_location("zaid1", "zai-d1.py")
z = importlib.util.module_from_spec(spec)
spec.loader.exec_module(z)  # safe: side effects live under __main__

have = copy.deepcopy(z.HAVE_BASE)
have["EDGE"]["CARRY"] = 4; have["C"]["PBLK"] = 6; have["TE"]["PBLK"] = 4

V = {"QB":1000,"WR":650,"OT":500,"OG":400,"C":200,"TE":250,"RB":250,"FB":25,
     "EDGE":650,"DT":500,"ILB":300,"OLB":200,"CB":400,"NICKEL":100,"DIME":50,
     "FS":300,"SS":300,"K":50,"P":50}
E_BAND = {"FB": (0.15, 0.25), "OLB": (0.6, 0.7)}
live = json.load(open("flex.json"))["flex"]

ROWS = ["C>OT","C>DT","C>OG","FB>RB","FB>TE","RB>FB","TE>FB","OLB>ILB","OLB>SS",
        "OLB>FS","TE>FS","QB>FS","WR>TE","TE>DIME","ILB>OLB"]
guard = lambda s, d: 20 * (1 - V[s] / V[d]) if V[d] > V[s] else 0.0

for k in ROWS:
    s, d = k.split(">")
    res = z.compute(s, d, have, z.W_BASE, floor_on=False)
    raw = res["raw"]; g = guard(s, d)
    elo, ehi = E_BAND.get(s, (1.0, 1.0))
    lo, hi = max(raw, elo * g), max(raw, ehi * g)
    tlo, thi = z.tier_of(lo), z.tier_of(hi)
    own = live.get(s, {}).get(d)
    v = "exact" if tlo == thi == own else ("STRADDLE" if tlo != thi else f"miss ({thi} vs {own})")
    print(f"{k:9} owner {own:>2} | ability {raw:6.2f} G {g:5.1f} | E {elo:.2f}-{ehi:.2f} "
          f"| max {lo:5.2f}-{hi:5.2f} | tier {tlo}-{thi} | {v} | binding {res['top']}")

print("FB>RB: tier 2 iff max(3.30, 18*E) < 4.0  =>  E < 0.222 (Owner's 2 predicts the snap share)")
for name, vs, vd in (("live v C200/OG400", 200, 400), ("raw OG2 C150/OG2-250", 150, 250),
                     ("slotWins20 C.4/OG1 1.0", 0.4, 1.0), ("slotWins20 C.4/OG2 0.6", 0.4, 0.6)):
    g = 20 * (1 - vs / vd)
    print(f"C>OG anchor {name:24} guard {g:5.2f} -> tier {z.tier_of(g)} (owner 6)")
```

Output of my run (the script above, verbatim, in a scratch directory with the two fetched files):

```
C>OT      owner 12 | ability   6.68 G  12.0 | E 1.00-1.00 | max 12.00-12.00 | tier 12-12 | exact | binding PBLK
C>DT      owner 12 | ability   9.12 G  12.0 | E 1.00-1.00 | max 12.00-12.00 | tier 12-12 | exact | binding RDEF
C>OG      owner  6 | ability   5.13 G  10.0 | E 1.00-1.00 | max 10.00-10.00 | tier 12-12 | miss (12 vs 6) | binding PBLK
FB>RB     owner  2 | ability   3.30 G  18.0 | E 0.15-0.25 | max  3.30- 4.50 | tier 2-6 | STRADDLE | binding CTH
FB>TE     owner  6 | ability   4.74 G  18.0 | E 0.15-0.25 | max  4.74- 4.74 | tier 6-6 | exact | binding PBLK
RB>FB     owner  0 | ability   0.00 G   0.0 | E 1.00-1.00 | max  0.00- 0.00 | tier 0-0 | exact | binding None
TE>FB     owner  0 | ability   0.00 G   0.0 | E 1.00-1.00 | max  0.00- 0.00 | tier 0-0 | exact | binding None
OLB>ILB   owner  6 | ability   6.84 G   6.7 | E 0.60-0.70 | max  6.84- 6.84 | tier 6-6 | exact | binding ZCOV
OLB>SS    owner  6 | ability   8.12 G   6.7 | E 0.60-0.70 | max  8.12- 8.12 | tier 6-6 | exact | binding ZCOV
OLB>FS    owner 12 | ability  11.74 G   6.7 | E 0.60-0.70 | max 11.74-11.74 | tier 12-12 | exact | binding DEEP
TE>FS     owner 12 | ability  13.64 G   3.3 | E 1.00-1.00 | max 13.64-13.64 | tier 12-12 | exact | binding DEEP
QB>FS     owner 12 | ability  17.08 G   0.0 | E 1.00-1.00 | max 17.08-17.08 | tier 12-12 | exact | binding DEEP
WR>TE     owner  6 | ability   6.41 G   0.0 | E 1.00-1.00 | max   6.41- 6.41 | tier 6-6 | exact | binding PBLK
TE>DIME   owner 12 | ability  12.60 G   0.0 | E 1.00-1.00 | max  12.60-12.60 | tier 12-12 | exact | binding DEEP
ILB>OLB   owner  0 | ability   0.00 G   0.0 | E 1.00-1.00 | max  0.00- 0.00 | tier 0-0 | exact | binding None
FB>RB: tier 2 iff max(3.30, 18*E) < 4.0  =>  E < 0.222 (Owner's 2 predicts the snap share)
C>OG anchor live v C200/OG400        guard 10.00 -> tier 12 (owner 6)
C>OG anchor raw OG2 C150/OG2-250     guard  8.00 -> tier 6 (owner 6)
C>OG anchor slotWins20 C.4/OG1 1.0   guard 12.00 -> tier 12 (owner 6)
C>OG anchor slotWins20 C.4/OG2 0.6   guard  6.67 -> tier 6 (owner 6)
```

13 exact, 1 straddle, 1 miss, of 15 rows.

## Required corrections to the delivery (beyond MUSE's list)

1. Replace Appendix A's ability column with the recomputed values (or state them as ZAI-D1-shape with the score changes and cite the script).
2. State which `v` the guard is computed on, and compute it on the live table (C 200, OLB 200) — or label the stand-in column as pre-bump explicitly.
3. Correct the C>OG footnote: measured v pulls the guard toward 6 only under an OG2-level anchor; on flexunify's role-level v it is 10.0 → 12. Name the destination-anchoring choice as an open decision (it decides the row between tier 2 and tier 12).
4. Add the reproduction script to the delivery (mine above is offered for that purpose, or re-derive from Z.ai's own write-up tables).
5. Add the Owner-anchor rows (QB>FS, WR>TE, TE>DIME, ILB>OLB) — they strengthen the thesis: the design agrees with the Owner mechanistically, not accidentally.

With those corrections the demonstration becomes the strongest quantitative support in the delivery, and the conclusion stands: the exposure-weighted guard fits without gates, is load-bearing exactly where the Owner's socialism principle says it should be, and its one residual (C>OG) is a named anchoring decision rather than a fused error.

— PICKLE, council seat. Design-only review; no product or engine file touched.
