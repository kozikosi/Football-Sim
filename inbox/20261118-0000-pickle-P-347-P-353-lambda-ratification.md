SPEAKER: pickle | ROLE: council | TASK: Part 8 — ratify the λ/dial and P-347–P-353 (recommend, do not decide) | DATE: 2026-11-18T00:00Z
FOR: P-347, P-348, P-349, P-350, P-351, P-352, P-353

# λ ratification: RATIFY WITH CHANGES — the round's stated band is stale, and the empty set is the finding

**Verdict first.** The dial **as designed** is ratifiable — the Owner accepted its shape, and nothing here reopens
that. What is *not* ratifiable as written is the round's premise "the admissible band is [0.3902, 0.4032),
midpoint 0.3967 — ship an in-band value as convention". That band was measured against a **stale table**. Against
the **current live table at the Architect's tip** the feasible set is **EMPTY** and the minimum dial count is **2**.
The convention value 0.40 is still the best single address (89/97 exact, maximin floor 87 at ±0.025), but it is
now a *specification choice about which rows to miss*, not a measurement that fits the table. Recommend: ship
0.40 as a **labelled convention**, change the ratification text to say the set is empty, and re-scope P-347 from
"estimate λ in-band" to the discrete count the Owner's own doctrine actually needs.

I authored none of P-347–P-353 (Inkling's triage, `origin/council/inkling:inbox/20261111-1746-…`); this is a
recommendation, not a review of my own work. I *did* author the band, on 14 Nov — so I am the one obliged to report
its decay. Every number below is re-run this session against a named ref.

---

## 1 · VERIFIED — the band decayed; here is the receipt

The band [0.3902, 0.4032) was printed by my `axis-bounds.py` on 14 Nov against
`flex-99-live.json` sha256 **`0a26d7c225cb7ec8…`**; at that time it was byte-identical to the Architect's
`tools/mathlab/flex.json`. It is **no longer**. Current ref: `origin/architect/engine-and-seats` tip
**`65673a009b29…`**, `tools/mathlab/flex.json` sha256 **`76c02c659880e218…`**. Both tables have 99 rows;
**7 values differ**:

```
$ python3 - <<'PY'     # structural diff, cached vs tip (full command in §5)
value diffs: 7
('EDGE', 'OLB', 0, 2)   ('EDGE', 'DT', 0, 2)   ('OT', 'OG', 0, 2)
('ILB', 'OLB', 0, 2)   ('CB', 'SS', 0, 2)     ('CB', 'FS', 0, 2)
('FB', 'TE',   6, 2)
PY
```

`FB>TE 6 → 2` is the load-bearing change: 2 is the Owner's scarcity ruling (Juszczyk-to-TE accepted), so the
**current table is the correct one and my cached 6 was the stale value**. I am correcting my own earlier filing,
not the table.

Re-running both of my existing read-only scripts against the **tip** table, with the same shipped V2 prototype
`raw = max(m + λ·s, E·guard)`, cuts 1/4/9:

```
$ python3 _agents/pickle/deliveries/p345-axis-comparison-2026-11-14/axis-bounds.py \
    _agents/pickle/deliveries/p345-axis-comparison-2026-11-14/inputs/merge_prototype.py \
    $TMP/flex-live-tip.json
   window [lo, hi) = [0.3902, 0.2195)   width -0.1707   <-- lo > hi: EMPTY
   lower edge  WR>NICKEL  m 2.400 s 4.100 -> lambda >= 0.3902 keeps raw >= 4
   upper edge  FB>TE      owner 2 m 3.100 s 4.100 -> lambda < 0.2195 keeps raw < 4

$ python3 _agents/pickle/deliveries/p345-lambda-followup-2026-11-13/dial-feasibility.py <same two inputs>
   rows no lambda in [0,1] can satisfy: 7
      OT>OG, EDGE>DT, EDGE>OLB, ILB>OLB, CB>FS, CB>SS   (m=0 s=0 cap=0 -> raw 0 -> tier 0, table says 2)
      C>OG                                              (guard-overshoots: cap 12.50 vs tier 6)
   intersection over the other 90 rows: [0.3902, 0.2195)   EMPTY
   minimum dial count: 2      addresses: 0.220, 1.000
   exact/97 at lambda 0.40: 89   (stale table gave 96)
   maximin over +/-0.025: lambda 0.40, floor 87
```

**What this means.** Six of the seven new tier-2 rows carry *zero* ability and zero guard in the V2 prototype —
the formula cannot derive them at all, at any λ. That is a **formula-coverage gap**, not an estimator problem,
and it belongs to the "99 is a guide, one beautiful portable formula" work — explicitly the Architect's design
brief, not a council build. The other contradiction (WR>NICKEL vs FB>TE) is a genuine single-dial conflict:
one λ cannot satisfy both. The honest record is: **0.40 remains the best single convention, but it misses 8
rows, and the misses are spec choices.**

## 2 · The three questions, answered

**(a) Is the dial as designed ratifiable as-is? — RATIFY THE SHAPE, AMEND THE CLAIM.**
The operator (`ability + blend of guard`, one constant) is the Owner's accepted design; nothing measured here
falsifies it. Amend two sentences in the ratification text: (i) replace "admissible band [0.3902, 0.4032)" with
"**on tip 65673a00 the feasible set is empty (7 structurally underivable rows; WR>NICKEL and FB>TE incompatible);
0.40 is a convention scoring 89/97, not a fit**"; (ii) bind any future band claim to a **table sha256 in the same
sentence** — a band is a measurement of a table, not a property of the design. This is the D-3 discipline
("a document may not name a number the tool does not print") applied to a number that silently changed under us.

**(b) If the estimator cannot measure λ in-band, what estimator can — and is one worth a round? — NO.**
VERIFIED from my re-run (§1, script §C): the acceptance test needs d_λ = 0.0032 = **0.81 % relative**; the only
receipted route (P-347 between-team dispersion) has SE(SD) = 0.438 = 12.7 % relative → **15.7× short**, i.e.
≈ **248 seasons** of 32 independent team-units; separating 0.39 from 0.40 at 2σ needs 1.25 % relative and is
still 10.2× beyond it. The player-identity join (Claude's L1) is **NOT RUN**, SE **UNKNOWN** — it is the only
route that could reach 0.81 %, and "could" is not a receipt. Building an estimator is **not worth a round** for
the flex λ, because the question is discrete, not statistical: 0.39 misses WR>NICKEL by **0.001 raw point**
(3.999 vs 4.000) — no CI moves that. The re-scoped question is the one my 15 Nov filing already asked and the
Owner's "99 is a guide" direction already implies: **does a context cell change *which row is unsatisfiable*?**
That is a count over cells, fold-free, and cheap.

**(c) What does "maximum flexibility for the dial" mean concretely? — NOT λ float; the INPUTS float.**
VERIFIED visibility test (script §E): the tier-vector digest is **identical** at λ = 0.3902, 0.3967 and 0.4032
(`3d8c54`). A λ-only dial whose admissible motion is inside the band is **invisible** — the 99-rule quantisation
(every price snapped to 0/2/6/12) erases it. It therefore cannot deliver the Owner's personnel/situation/rivalry/
playoffs/opponent/key-player/aggressiveness/dominant-group flexibility. Concretely, the flexibility belongs in
the **inputs to the operator** — `m`, `s` and `E` computed per context cell from the roster and situation — while
the **operator shape and its single convention constant stay frozen** for stability. That satisfies both halves
of the Owner's sentence: long-term structure stable, dial maximally flexible. If the Owner wants flexibility in
the *displayed* number too, the surface must expose the **raw price** (continuous), not the snapped tier. Recommend
that as a one-line design note to the Architect, not a build.

## 3 · P-347–P-353, one line each

| ID | Recommendation | Reason (label) |
|---|---|---|
| **P-347** estimator protocol | **RATIFY WITH CHANGE** | Two-gap β=λθ fit + R-first + held-out conditional-moment check is sound (VERIFIED 15 Nov re-run). Add a stopping rule (pre-register `λ_c=λ₀`; publish one λ if δ_c/SE_c<1) and **require the table sha256 in the protocol** — §1 shows the protocol otherwise fits a stale table. Re-scope the flex-λ question to the unsatisfiable-row count (§2b). |
| **P-348** drive-budgeted staging | **RATIFY** | Conservation-by-construction (0 % totals drift) is a structural bar, not an estimate; chain-length gap is diagnosed in-tree (Glyph, MUSE reviews). |
| **P-349** two-view spec paragraph | **RATIFY** | Doc amendment only; resolves which view owns macro allocation vs micro realisation before codegen. |
| **P-350** gravity in event log | **RATIFY** | P-335 requires gravity "measured and shown"; assignment vectors + `gravity_index` in the pack is the mechanism. |
| **P-351** dual positions | **RATIFY** | Schema-only (`roles[]`, `fitDual`), no solver/board change; unblocks deferred basketball and Hunter-type cases. |
| **P-352** gate panel | **RATIFY WITH CHANGE** | Panel is evidence-backed, but it **carries an Owner decision** (tighter Phase 2 panel vs the standing ~10 % interpretation). Do not present it as settled. |
| **P-353** folds as product surface | **DEFER TO OWNER** | A feature proposal, not a defect (Inkling's own flag). My Part 9 filing argues it is the best platform payoff, so I lean ratify-as-design — but the Owner locks it. |

## 4 · Honest limits / what I did not re-run

- **REPORTED, not re-run:** the Owner's verbatim ruling (`_agents/owner-notes/2026-11-11-fluctuating-dial-and-dynamic-engine-verbatim.txt` — I read it, I did not generate it); Inkling's seven P-item descriptions (I read `origin/council/inkling:inbox/20261111-1746-…`).
- **INFERRED:** that the six zero-ability tier-2 rows should be derived by a future formula rather than written by hand — that is the Owner's "one beautiful portable formula / 99 as guide" direction applied, not a measured outcome.
- **UNKNOWN:** L1 join SE; whether any context cell actually changes the unsatisfiable-row set (the cheap count in §2b has not been run by me this session).
- The V2 prototype in my inputs is the shipped 12 Nov formula; I did **not** re-derive `m`, `s`, `E` from the 12 Nov Z.ai delivery this session. The comparison is table-old vs table-new with the formula held fixed — which is exactly the decay being reported.

## 5 · Receipts — commands

```
$ git rev-parse origin/architect/engine-and-seats
65673a009b29035e8dc993279be656f12aa40a13
$ git show origin/architect/engine-and-seats:tools/mathlab/flex.json | shasum -a 256 | cut -c1-16
76c02c659880e218
$ sha256sum _agents/pickle/deliveries/p345-axis-comparison-2026-11-14/inputs/flex-99-live.json | cut -c1-16
0a26d7c225cb7ec8
$ python3 - <<'PY'   # structural diff
a=json.load(open('.../inputs/flex-99-live.json'))['flex']
b=json.load(open('$TMP/flex-live-tip.json'))['flex']
print('cached rows:',sum(map(len,a.values())),'tip rows:',sum(map(len,b.values())))
diffs=[(s,d,a.get(s,{}).get(d),b.get(s,{}).get(d)) for s in set(a)|set(b) for d in set(a.get(s,{}))|set(b.get(s,{})) if a.get(s,{}).get(d)!=b.get(s,{}).get(d)]
print('value diffs:',len(diffs)); [print(x) for x in diffs]
PY
cached rows: 99 tip rows: 99 / value diffs: 7  (see §1)
$ python3 _agents/pickle/deliveries/p345-axis-comparison-2026-11-14/axis-bounds.py <proto> $TMP/flex-live-tip.json
$ python3 _agents/pickle/deliveries/p345-lambda-followup-2026-11-13/dial-feasibility.py <proto> $TMP/flex-live-tip.json
```

**BLOCKED** — nothing. The formula-coverage gap (6 underivable rows) is the Architect's design brief; I can only file it.
**OPEN (Owner)** — the λ value (recommend 0.40 as labelled convention), P-352's panel vs ~10 %, P-353 as a feature.
**OPEN (Architect)** — whether to derive the six zero-ability rows or leave them as hand-priced guide exceptions.
**NEXT** — (1) hand this stale-band finding to the Architect before he wires any λ default; (2) add a table-sha256
line to every band claim (council can adopt this itself); (3) run the unsatisfiable-row count per context cell.
