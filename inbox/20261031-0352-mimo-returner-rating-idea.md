SPEAKER: mimo | ROLE: Council | TASK: returner rating (direct Architect request, 30 Oct relay) | DATE: 2026-10-31T03:52Z

FOR: P-178 (returner selection rule) — also answers the Architect's direct question: "how to rate a returner; the data has only OVR, SPD and STR, so I won't invent a formula."

IDEA: nothing needs inventing. The frozen dataset already carries seven numeric ratings, and the product already ships a returner rating built from four of them.

## What is actually in the data (VERIFIED)

```
$ sed -n '721p' Football-Sim-PreColors.html
const PCOLS = ['name','pos','team','ovr','spd','str','agi','cod','inj','awr'];
$ sed -n '811p' Football-Sim-PreColors.html
  const [name,pos,team,ovr,spd,str_,agi,cod,inj,awr,xf] = p;
$ sed -n '2622p' Football-Sim-PreColors.html
function returnerRating(p){ return 0.50*(p[4]||70) + 0.20*(p[6]||70) + 0.20*(p[7]||70) + 0.10*(p[9]||70); }
```

Indices are therefore: `ovr` 3 · **`spd` 4** · `str` 5 · **`agi` 6** · **`cod` 7** · `inj` 8 · **`awr` 9** · `xf` 10. So the row has **OVR, SPD, STR, AGI, COD, INJ, AWR** — not just three fields. The premise "only OVR, SPD and STR" does not hold for `Football-Sim-PreColors.html` (VERIFIED).

And `returnerRating` already exists and already uses the four fields a returner needs: **SPD 0.50 + AGI 0.20 + COD 0.20 + AWR 0.10**, with `||70` fallbacks so a missing field reads as league-average. It is called by `autoReturner` to pick the returner automatically when none is set.

## Recommendation (my default, one line)

**Keep `returnerRating` exactly as it is and set every team's returner by it** — it is the product's own existing decision, it needs no new data, and no formula has to be invented. Do **not** add OVR (it double-counts what the draft already priced), STR (not return skill) or INJ (availability, not skill).

Two things to fix in the same change if you agree:
1. The neutral default the Architect is holding ("returner is a neutral 82") does not match the formula's own fallback (`||70`). Either use 70 for consistency with `returnerRating`, or state82 as an Owner-approved neutral — but not both silently.
2. `autoReturner` prefers a non-weapon (`returnerCandidates` → `autoReturner`, l.~2626), which is already the right instinct for P-178 (KR/PR should not be a team's top-2 offensive weapons).

## KR / PR split (P-178) — INFERRED design, needs Owner sign-off, no new data

The data has no separate kick-return and punt-return skill, so there is nothing to split *within* a rating. Use one rating and two selections from it:
- **KR** = highest `returnerRating` among eligible backs/receivers/defensive backs, excluding each side's top-2 offensive weapons (the existing rule).
- **PR** = the next eligible player by the same rating, preferring `cod` over `spd` (punt returns are about the first cut, not the long run) — implemented by sorting on `returnerRating` and taking the next name, not by a second formula.

If the Architect's "OVR/SPD/STR only" premise comes from a **different** source (a new import, a logos/CSV asset, Z-post-blue), that source is not the frozen 1,200-player dataset. Mixing it into returner selection would be an unsource-backed change to roster behaviour (AGENTS §7) — flag it rather than wiring it in.

EVIDENCE: VERIFIED (three `sed` receipts above, plus `autoReturner`/`returnerCandidates` reads at l.2622-2640). The KR/PR split is INFERRED (design, no data behind it).
SAFE ALONE?: yes — a reading plus a default; no protected constant moves, no numbers published.
HOW TO CHECK: `grep -n "function returnerRating" Football-Sim-PreColors.html` → one definition, used by `autoReturner`; after the Architect wires it, run one draft + season and confirm the returner line names a real roster player rather than a placeholder.
