SPEAKER: MIMO | ROLE: Council reviewer (assignee of DS, #12 follow-up) | TASK: FB-P-28ROUND-IMPACT — kicking-slot arithmetic under the 28-round rules | DATE: 2026-10-21 (UTC)

DS's question: with FB and P now draft slots (28 rounds, 896 picks), K and P playing P at no flex cost, HB/FB/TE playing FB at no flex cost, no existing flex penalty changed — **if the pool swap still drops the 32 punter records, can free K→P flex cover all 64 kicking slots?** A player occupies exactly one lineup slot at a time; every team carries both a K and a P slot.

## Command (executed this session; verbatim output)

```
python3 league-accounting   (two worlds: BUGGY = swap drops P32+FB8+LS12; FIXED = keeps FB+P, drops LS only)

=== BUGGY SWAP (P and FB dropped) (draftable 1148) ===
KICKING  demand=64 (K32+P32)  eligible=32(K)+0(P)=32  unfillable=32  (each player fills ONE slot; K->P free does not multiply Ks)
BACKFIELD demand=160 (RB64+TE64+FB32)  strict supply HB89+FB0+TE53=142  strict-unfillable=18
  SAM-precedent outside spares: {'WR': 55, 'CB': 45, 'SS': 22, 'FS': 21, 'DT': 61, 'REDG+LEDG': 65, 'LB(MIKE/WILL/SAM)': -5}  total=264  -> covered=18  unfillable=0
  own-family short: C supply 31 < demand 32 -> gap 1 filled by cross/penalty flex
  own-family short: LB(M+W+S) supply 91 < demand 96 -> gap 5 filled by cross/penalty flex

=== FIXED (FB+P kept, LS dropped) (draftable 1188) ===
KICKING  demand=64 (K32+P32)  eligible=32(K)+32(P)=64  unfillable=0  (each player fills ONE slot; K->P free does not multiply Ks)
BACKFIELD demand=160 (RB64+TE64+FB32)  strict supply HB89+FB8+TE53=150  strict-unfillable=10
  SAM-precedent outside spares: {'WR': 55, 'CB': 45, 'SS': 22, 'FS': 21, 'DT': 61, 'REDG+LEDG': 65, 'LB(MIKE/WILL/SAM)': -5}  total=264  -> covered=10  unfillable=0
  own-family short: C supply 31 < demand 32 -> gap 1 filled by cross/penalty flex
  own-family short: LB(M+W+S) supply 91 < demand 96 -> gap 5 filled by cross/penalty flex

HEADLINES: kicking unfillable — buggy 32, fixed 0 (zero slack: K32+P32 = 64 slots exactly).
           backfield unfillable — strict: buggy 18, fixed 10; under SAM precedent (existing-penalty outsider flex): 0 both.
```

## The three answers DS asked for

1. **Kicking slots unfillable league-wide with 32 kickers and no punters: 32.** Demand = 64 (32 K + 32 P). Eligible = 32 (K only). Free K→P flex does **not** rescue this: a player occupies one slot at a time, and K supply (32) exactly equals K-slot demand (32) on its own. Every team that fills its K slot with its one kicker has nobody for its P slot — 32 P slots unfillable by a real kicker/punter, league-wide. (`FLEX.K = {}`, l.940–952, means a kicker can flex nowhere else and nothing flexes into K except this new free rule; the only fallback for the 32 empty P slots is `EMERGENCY_PENALTY 8` — a non-kicker playing punter, which is a defect, not a rescue.)

2. **With the fix applied (FB and P kept, LS dropped, 1,188 draftable): 0 unfillable — but zero slack.** K 32 + P 32 = 64 eligible for exactly 64 slots. The kicking group balances to the player; a single duplicate, absence or injury leaves a team with no legal punter or kicker. This is the exact-parity knife-edge flagged in FB-P-POOL-IMPACT (d).

3. **Backfield under the SAM precedent (positions outside HB/FB/TE flex in at the existing penalty): 0 unfillable in both worlds.** Strict supply is short — 18 without FBs (buggy), 10 with them (fixed) — but the existing `FLEX` table lets outsiders into TE and RB-family slots at a penalty (WR→TE −4, WR/DB/DL→RB −6, LB→TE/RB −6; spares: WR 55, CB 45, DT 61, REDG+LEDG 65, SS 22, FS 21 = 264 candidates). The 10–18 gap is fully absorbed by penalised out-of-position flex — which is precisely how it **undercuts the Owner's "no flex cost"**: the FB slot fills, but ~10–18 of the 160 backfield slots league-wide are occupied by players taking a penalty, not by free HB/FB/TE moves.

## Bottom line for DS's decision (tooling bug → shipping defect?)
- The **free K→P flex does not rescue a punter-less pool.** Only keeping the 32 P records does (0 unfillable). Dropping P turns 32 P slots into either empty slots or emergency-penalty non-kickers — a visible shipping defect in every one of the 32 teams' special teams.
- The **backfield is rescued by penalties, not by the free rule** — so the "no flex cost" promise is only honoured for the 8 natural FBs and the HB/TE moves the free rule explicitly covers; the residual is penalised, same as today's TE/SAM shortfalls.
- **Recommendation (Claude's lane to build):** the swap must keep FB and P (drop only LS 12). That single change takes kicking from 32 unfillable to 0 and restores the 8 natural fullbacks.

---
Compliance: read-only on the product (line refs to the pinned `NFL Draft Simulator merged.html`); integer arithmetic only; no ratings invented; counts VERIFIED against the pinned pool in FB-P-POOL-IMPACT (a). Swap-tool behaviour (what it drops) is REPORTED from MOC's re-run + Pickle M-113 + Beam M-89, not re-run by me here. Not checked: `optimalLineup`/`cpuPick` behaviour for the new rounds (engine lane), and whether the emergency-penalty path is reachable at draft time vs only in the lineup editor.
