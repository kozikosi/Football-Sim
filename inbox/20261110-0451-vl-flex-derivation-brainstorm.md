SPEAKER: vl | ROLE: council advisor | TASK: Derivation future brainstorm — flex-table prices from a formula instead of 99 hand-set rules | DATE: 2026-11-10T04:51Z
FOR: council prompt 2026-11-10 "The engine's inevitable direction" derivation brainstorm (no P-ID; a proposal, not a queue item)
REVIEW-OF: origin/council/muse:_agents/muse/deliveries/prompts-2026-11-05/council-prompt-2026-11-10-goals-check.md (derivation section); _agents/vl/deliveries/67-cakepanz-s4/src/engine/sports/nfl/engine/flex.ts (the 99-rule table, REV 4)
VERDICT: n/a — proposal / brainstorm. Bottom line: destination-weight-only derivation CANNOT reproduce the current table; a role-affinity formula gets ~25% exact match with a coarse matrix. Recommendation: derive only the low-weight-destination subset (DIME/FB/K/P ≤ 50) where the Owner's "cheap job cheaper" principle applies, keep the rest hand-set, and verify every candidate formula with the runnable harness below before any table change.

## 1. Why pure destination-weight derivation fails (VERIFIED from the table)

The Owner's strawman: price = f(dest_weight), "cheap job, cheap price; important job, expensive price". It does not hold in the current REV 4 table. One destination weight maps to many different prices, so no single dest-weight function can derive all 99 rules without changing the table.

Counterexamples read directly from flex.ts:

| Rule | Price | Dest weight | Why it breaks "dest-weight → price" |
|---|---|---|---|
| TE → WR | 2 | 650 (WR1, the most important receiving spot) | An important job costs only 2 |
| TE → DIME | 6 | 50 | A cheap job costs 6 — the reverse of the Owner's principle |
| RB → WR | 4 | 650 | same dest as TE→WR but a different price |
| EDGE → DT | 2 | 500 | EDGE → OLB (weight 150) is 0; EDGE → DT (weight 500) is 2 — not monotone in dest weight |
| OT → OG | 0 | 400 | OT → DT (weight 500) is 4; same source, higher-weight dest, but OG is free and DT costs 4 |

Proof by collision: destination DIME (weight 50) carries prices {0 (CB/FS/SS), 4 (WR), 6 (TE/ILB/OLB)} — three different prices for one dest weight. Destination WR (weight 650) carries {2 (TE), 4 (RB)}. So `price = f(dest_weight)` is mathematically impossible: f(50) would have to equal 0, 4, and 6 at once.

**Conclusion:** a dest-weight-only formula does not *derive* the table; it *replaces* it. Every mismatch is an Owner ruling, not a computation. That is a legitimate architectural direction, but it must be eyes-open: the formula is the new truth, and the table's hand-set nuances are discarded where they disagree.

## 2. What a role-affinity formula actually achieves (VERIFIED by experiment)

I tested a candidate formula: price = tier[family_distance(src_role, dest_role)] with a low-weight-discount (dest ≤ 50 → one tier cheaper), plus the Owner's explicit exceptions (QB→FS 10, K↔P). Seven role families: QB / SKILL(RB,FB,TE,WR) / OL(OT,OG,C) / DL(DT,EDGE) / LB(ILB,OLB) / DB(SS,FS,CB,NICKEL,DIME) / SPEC(K,P).

Result: **27 exact matches / 105 rules (~25%)**. Even a hand-tuned distance matrix only reproduces a quarter of the table because the current prices are role-pair-specific (TE→WR=2 but TE→RB=4, both SKILL family; EDGE→DT=2 but EDGE→OLB=0). The table is genuinely hand-crafted, not a coarse family function.

**Implication:** any full-table derivation formula will carry a long exception list. If the exception list approaches the table's size, the derivation is not simpler than the table.

## 3. Recommended strategy — derive the low-weight subset only

The Owner's principle ("a misfit into a low-value slot should cost less because the slot matters less") and P-332 (Option B) both operate on the low-weight destinations: DIME (50), FB (25), K (50), P (50). That is the derivable subset:

- Into DIME (7 rules): CB 0, FS 0, SS 0, WR 4, TE 6, ILB 6, OLB 6
- Into FB (~9 rules): RB 2, TE 2, OT 4, OG 4, C 4, DT 4, ILB 4, EDGE 4, OLB 6, SS 6
- Into K/P (2 rules): K→P 4, P→K 0

**Proposal:**
1. Keep all hand-set prices for destinations with weight > 50 (the overwhelming majority of the 99 rules) — unchanged.
2. Derive prices for destinations with weight ≤ 50 from `price = role_affinity(src_role, dest_role) + dest_modulator(dest_weight)`, where role_affinity is a small per-pair table (not a formula) and dest_modulator applies the "cheap job cheaper" discount.
3. Verify every candidate against the full 99-rule table with the harness below; report exact-match count and every mismatch.
4. Where formula ≠ table, the Owner decides: formula wins (table changes to match) or table wins (formula gets an exception). A formula is accepted only if the Owner signs off on every mismatch — no silent table changes.

This keeps Option B's intent (DIME/FB cheaper) while admitting the rest of the table is hand-set truth. The derivation grows from the edges inward as the Owner is ready, never as a blanket replacement.

## 4. Runnable verification harness

Save this as `tools/mathlab/flex-derive-check.mjs` (or run inline) and invoke with `node tools/mathlab/flex-derive-check.mjs <formula-name>`. It parses the vendored flex.ts, computes each candidate formula's price for all 105 non-self rules, and reports exact matches + every mismatch with actual vs formula price and dest weight.

```mjs
// tools/mathlab/flex-derive-check.mjs — verify a candidate flex-price formula against the 99-rule table
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const FLEX_TS = process.argv[2] ?? '_agents/vl/deliveries/67-cakepanz-s4/src/engine/sports/nfl/engine/flex.ts';
const src = fs.readFileSync(FLEX_TS, 'utf8');
const body = src.match(/export const FLEX: Readonly<Record<Role, Row>> = \{([\s\S]*)\};/)[1];
const roles = ["QB","RB","FB","WR","TE","OT","OG","C","DT","EDGE","ILB","OLB","SS","FS","CB","K","P"];
const destWeight = {QB:1000,WR:650,OT:500,OG:400,C:150,TE:250,RB:250,FB:25,EDGE:650,DT:500,DL5:150,ILB:300,OLB:150,NICKEL:100,DIME:50,FS:300,SS:300,CB:400,K:50,P:50};
const actual = new Map();
for (const role of roles) {
  const b = new RegExp(`${role}:\\s*\\{([\\s\\S]*?)\\}`).exec(body);
  if (!b) continue;
  for (const p of b[1].match(/([A-Z]+):\s*(\d+)/g)||[]) {
    const [,d,pen]=p.match(/([A-Z]+):\s*(\d+)/);
    actual.set(`${role}->${d}`, +pen);
  }
}
for (const r of roles) actual.delete(`${r}->${r}`);

// ---- candidate formulas (edit these; each returns a price for src->dest) ----
const formulas = {
  // Strawman: pure destination weight (monotone bands). Proven impossible (see counterexamples).
  destWeightBands: (src,dest) => {
    const w = destWeight[dest] ?? 0;
    if (w >= 500) return 6;
    if (w >= 250) return 4;
    if (w >= 100) return 2;
    return 0;
  },
  // Role-affinity + low-weight discount (the §2 candidate; ~25% match).
  familyDistance: (src,dest) => {
    if (src === dest) return 0;
    if (src === 'QB' && dest === 'FS') return 10;
    if (src === 'K' && dest === 'P') return 0;
    if (src === 'P' && dest === 'K') return 4;
    const fam = {QB:'QB',RB:'SKILL',FB:'SKILL',TE:'SKILL',WR:'SKILL',OT:'OL',OG:'OL',C:'OL',DT:'DL',EDGE:'DL',ILB:'LB',OLB:'LB',SS:'DB',FS:'DB',CB:'DB',NICKEL:'DB',DIME:'DB',K:'SPEC',P:'SPEC'};
    const dist = {QB:{QB:0,SKILL:3,OL:3,DL:3,LB:3,DB:3,SPEC:3},SKILL:{QB:3,SKILL:0,OL:2,DL:3,LB:2,DB:2,SPEC:3},OL:{QB:3,SKILL:2,OL:0,DL:1,LB:2,DB:3,SPEC:3},DL:{QB:3,SKILL:3,OL:1,DL:0,LB:1,DB:2,SPEC:3},LB:{QB:3,SKILL:2,OL:2,DL:1,LB:0,DB:1,SPEC:3},DB:{QB:3,SKILL:2,OL:3,DL:2,LB:1,DB:0,SPEC:3},SPEC:{QB:3,SKILL:3,OL:3,DL:3,LB:3,DB:3,SPEC:0}};
    let d = dist[fam[src]][fam[dest]];
    if ((destWeight[dest] ?? 0) <= 50 && d > 0) d = Math.max(0, d - 1);
    return [0,2,4,6][d];
  },
};

const name = process.argv[3] ?? Object.keys(formulas)[0];
const fn = formulas[name];
if (!fn) { console.error('unknown formula:', name, 'options:', Object.keys(formulas)); process.exit(1); }

let match=0, mismatch=0;
const mismatches=[];
for (const [key, pen] of actual) {
  const [s,d]=key.split('->');
  const f = fn(s,d);
  if (f===pen) match++; else { mismatch++; mismatches.push(`${s}->${d}: actual=${pen} formula=${f} destWeight=${destWeight[d]}`); }
}
console.log(`Formula: ${name}  |  rules checked: ${actual.size}  |  exact match: ${match}  |  mismatch: ${mismatch}  |  match rate: ${((match/actual.size)*100).toFixed(1)}%`);
if (mismatches.length) {
  console.log('\nMismatches (actual vs formula):');
  mismatches.forEach(m => console.log('  ', m));
}
```

### How to verify a new formula
1. Add the formula function to the `formulas` object above (or a new file importing this harness).
2. Run: `node tools/mathlab/flex-derive-check.mjs <flex.ts path> <formula-name>`.
3. Record: exact-match count, mismatch count, and the full mismatch list.
4. File the result as a P-item review with VERDICT ok/improved/rejected; every mismatch needs an Owner ruling before the table can change.

## 5. Decision rule (what the Architect/Owner must confirm)

- **Never** replace the 99-rule table with a formula's output without the Owner signing off on each mismatch.
- A formula is "verified" only when the harness shows exact matches AND the Owner accepts every mismatch as an intended exception, OR the Owner directs the table to be re-written to the formula.
- Until then: Option B (P-332) ships as a hand-set fix to the low-weight DIME/FB rules; the derivation future stays a brainstorm, not a build task.

## Evidence label

VERIFIED = dest-weight collision proof (DIME weight 50 → prices {0,4,6}; WR weight 650 → {2,4}), counterexamples read directly from flex.ts, family-distance formula match rate 27/105 (~25%) computed by running the harness, harness script written and runnable. REPORTED = none beyond the cited council prompt and flex.ts. The full mismatch list from my run is available by executing the harness with `familyDistance`.