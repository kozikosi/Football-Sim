# Inkling — review of _agents/basketball/README.md (multisport generalization)

SPEAKER: Inkling | ROLE: council seat | TASK: Design review — is the multisport generalization well defined? Is the basketball duty sketch sensible? What's missing? | DATE: 2026-11-10

REVIEW-OF: _agents/basketball/README.md (council/muse, read via `git show origin/council/muse:_agents/basketball/README.md`; Owner verbatim at `_agents/owner-notes/2026-11-10-zai-model-multisport-generalization-verbatim.txt`)
VERDICT: improved

Design review only — basketball is not to be built until 76 Pancakes ships; nothing here authorizes build work.

## 1. Is the formula truly sport-agnostic? No — three football-shaped residues live in the "formula" layer, not the inputs

The math (worst gap + λ·rest through fixed cuts) is clean. The machinery around it is not:

**(a) The SCOPE table is a football artifact, redundant with NEED dicts, and it already sabotaged the one situational job.** `SCOPE = {THR:[QB], KCK:[K], PNT:[P], EREP:[EDGE]}` names football destinations. Every scoped duty appears only in its scope-target's NEED dict among the base jobs (VERIFIED by enumerating NEED: THR→QB, KCK→K, PNT→P only; EREP→EDGE and DL5). **Deleting SCOPE entirely changes nothing on the live 99-rule table** — VERIFIED: baseline stays 95/3/1 te5 and EDGE4+C6+TE4 stays 98/1/0 te1, identical raws. But **it silently drops the DL5 job's EREP 5 demand** — the DL5 NEED dict Z.ai authored for the Owner's blitzer reframing is half-dead as computed: `raw_of` skips EREP for dst=DL5 because EREP is scoped to `["EDGE"]`. VERIFIED by repricing (my re-implementation, attached to the P-322 verification): with scopes deleted, **OLB→DL5 goes 2 → 6** (raw 4.44, EREP deficit 3) and **ILB→DL5 goes 2 → 6** (raw 6.24, EREP deficit 4); every other DL5 price is unchanged. The §5.3 table in FLEX-DERIVATION-ZAI-D1 (OLB→DL5 = 2, ILB→DL5 = 2) is the scope bug's output, not what the NEED dict means. Lesson for basketball, verbatim: **a per-job NEED dict is sufficient — a scope layer is a footgun that can neuter part of a job without any visible error.** The "one NEED dict per situational job" claim in the README is right; it just isn't sufficient as the code stands.

**(b) The floor's SIDE map is hard-coded football.** Z.ai's `price()` computes cross-side as `SIDE[src] != SIDE[dst]` with `SIDE = O/D/S` and exempts `dst == "FB"`. The README gestures at the fix ("the cross-side floor becomes a cross-role floor") but doesn't say the SIDE map itself must become a parameter (position groups + exemptions as inputs), not a hard-coded dict. As written, porting means editing the formula, not just the inputs.

**(c) λ = 0.4, cuts 1/4/9 and tiers 0/2/6/12 are FITTED constants, not universal ones.** λ = 0.4 was selected *because the live football table's geometry selected it* (λ=0 → 81 exact; 0.2 → 86; 0.3 → 90; 0.4 → 95; 0.5 → 88; 0.7 → 76; 1.0 → 68 — the write-up's own ablation, REPORTED by MUSE, consistent with his re-run). The cuts were *kept* for comparability, not derived ("best 95 at 1.0/3.5/9.0 — the live 1/4/9 sits on the same plateau"). Neither is a property of basketball; both are hypotheses to re-derive against the basketball oracle (§3). The README lists λ and the cuts as if they were fixed parts of the port — they should be re-fit or explicitly re-justified.

What IS genuinely sport-agnostic: the deficit decomposition, the max-gap + discounted-sum shape, the NEED/HAVE split (the real design insight), the visual-triangle audit (any hand-set premium above its cheapest chain is a deliberate premium — works for any 99-row directed table), and the self-doable invariant (need ≤ have per job — see §4).

## 2. Is the basketball duty sketch a sensible starting point? Yes — with named gaps

The 12-duty sketch covers the *factory* positions better than the *identity* positions:

- **SF has no identity duty.** Football needed a DEEP (the FS's post craft; it is why CB→FS = 0 and ILB→FS = 12). SF's modern identity is the two-way wing — **defensive versatility / switching** is the missing duty (and it is the basketball form of the flex question itself). "Perimeter defense" half-covers it; versatility is a distinct skill (guarding 2–4, surviving a series).
- **PF is under-covered too.** PF identity is the stretch/pick-pop four — **mid-range shooting** is there, but there is no **screen setting** (the big's job, the SNP of basketball — and a large part of why big-to-small flexes are not free) and no **pick-and-pop / dribble-handoff chemistry** worth the name. Screen setting is the highest-leverage missing duty in the sketch.
- **The stance/repertoire split is missing.** Football found the OLB↔EDGE asymmetry lived entirely in EREP (stand-up vs hand-in-dirt). Basketball's equivalent split is **on-ball perimeter defense vs weak-side help/rotation craft** — the sketch lists "help defense" as a duty but no on/off split; without it, every perimeter defender prices the same for the scheme that matters most. Second split: **face-up vs post play** for bigs (the sketch has "post scoring" but no face-up counterpart).
- **Pick-and-roll defense** is missing entirely (switch vs drop — the largest scheme variable in NBA defense). It can fold into the on-ball/help split or stand alone; it cannot be absent.
- **Overlaps to resolve:** "post scoring" vs "finishing at the rim" (define the split or fold one); "help defense" vs "perimeter defense" (define the split — see above).
- **The machinery duty is good**: free-throw shooting is the CARRY of basketball (everyone has it at different levels, load-bearing in close games) — keep it.
- **Fine to omit, but say so:** conditioning/motor, durability/health, box-out positioning (fold into rebounding craft), turnover avoidance (fold into ball handling/playmaking). Name the omissions so the next seat doesn't "fix" them silently.
- **Transversal craft will carry the asymmetries again** (CB RTE 7, OL RUSH/EREP 6 were the calibrated cells that made trench and CB↔WR rows work). Basketball equivalents to expect: bigs' rebounding HAVE 8–9 (they box out daily), guards' rim-protection HAVE ~2–3 (they contest in passing lanes, not at the rim), bigs' playmaking HAVE 3–4 (hub fours), wings' ball-handling HAVE 5–6. These cells are where calibration will live.

## 3. What's missing — the biggest gap: there is no oracle and no validation protocol for basketball

Football ZAI-D1 was calibrated against the Owner's hand-priced 99-rule table; the λ ablation and the quasi-metric scan are *validation*, not fit. Basketball has **no hand-priced flex table at all**. As written, "the same formula runs" produces 25 prices (5 positions × 5 flexes) with nothing to check them against, and "calibrated the same way" is not possible — there is no table to calibrate to. Before any calibration round, this folder needs:

1. **The oracle's definition**: who authors the ground truth for basketball flex prices (Owner-priced hypothetical slot moves? sim runs? film?), and in what form (a 25-row directed table is presumably enough — or 5×5+situational-5).
2. **The calibration protocol**: Z.ai's two-pass logging (hand-set from football reasoning, then table-pattern-driven named fixes) is fine — keep it; require the same log.
3. **The validation protocol**: λ ablation, cut refit, and the triangle-inequality/quasi-metric scan all transfer for free; a held-out validation set (rows the author never tuned) does not and must be designed.
4. **The self-doable invariant, enforced at authoring time**: my P-322 verification found the Owner's accepted C PBLK 6/7/4 silently breaks ZAI-D1's `need ≤ have` for the C job (NEED 8 > HAVE 6/7/4) because the override path never re-runs `check_self()`. Basketball's matrices should enforce it at authoring (and pair body/job edits), not as a post-hoc print.
5. **The SIDE-map parameterization** (§1b) and **the scope deletion** (§1a) — both before the first basketball calibration, so the port is actually an input swap.
6. **Situational jobs authored as plain NEED dicts** (small-ball 5, defensive stopper, sixth-man scorer) — under the corrected DL5 lesson, with no scope layer.
7. **Semantics of the output tiers**: are 0/2/6/12 the same penalty units and UI semantics as football's flex table? Say so, or the basketball table is not actually interchangeable in the UI.

## Weakest point / honest limits of this review

The duty-set critique is inferred from the football design's history (DEEP, EREP/RUSH, transversal craft) and from basketball common knowledge, not from any basketball film or analytics source; treat duty picks as **INFERRED** until a calibration round and an Owner ruling exist. I did not run any basketball simulation (none exists). The football-side findings (scopes inert on 99 rules; scope bug in DL5; self-doable violation) are **VERIFIED** by running my re-implementation both ways against the live flex.json. The DL5 finding does not change any live rule — it changes the DL5 pricing table and the port's design.

## Labels
VERIFIED: scope-deletion fit identity (95/3/1 → 98/1/0 unchanged); DL5 repricing OLB→DL5 2→6, ILB→DL5 2→6; NEED scope-map enumeration. REPORTED: ZAI-D1 write-up (§2 scopes, §5.3 DL5 table, λ ablation), MUSE's runs, Owner verbatim. INFERRED: all basketball duty/calibration claims; that SF/PF need identity duties; that λ/cuts/tiers are fitted-not-universal. UNKNOWN: who authors the basketball oracle; tier semantics for basketball; whether the Owner wants a cross-role floor at all.
