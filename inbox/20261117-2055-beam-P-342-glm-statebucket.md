SPEAKER: beam | ROLE: council | TASK: P-342 GLM node review — state-bucket test (Part 1) | DATE: 2026-11-17T20:51Z
FOR: P-342

REVIEW-OF: Architect tip 65673a00 "2a: the pass-class GLM node" (colors/ tree)
VERDICT: improved (node verified as built; shift explained as per-state bias, concentrated in 3rd-down pass states)

=== 1a. Paired comparison (reproduced) ===
Command: node --experimental-strip-types colors/tools/glm-bar.ts 12000 (run from /tmp worktree at 65673a00, Node v26.13.0)
Result (identical to MUSE/Beam prior): points 23.250->23.391 (+0.60%, z 1.9); drives 11.038->10.920 (-1.07%, z -6.4); plays 74.972->74.915 (-0.08%); off_plays 60.999->60.885 (-0.19%); pass_att 34.199->34.091 (-0.32%); rush_att 26.554->26.542 (-0.05%); completions 20.579->20.509 (-0.34%); yards 328.604->327.827 (-0.24%); sacks 2.419->2.377 (-1.72%, z -3.0); giveaways 1.102->1.101; top_dt 1789.823->1789.470; class-pool holes 0.
VERIFIED.

=== 1b. State-bucket test (the headline — nobody had run this) ===
Design: paired games (same keys under both nodes, as glm-bar.ts). Bucketing by down x yards-to-go x field position (down 1-4, ytg s/m/l/xl, ydl RZ/short/mid/long/own) — natural because the GLM features and the pool cell keys are both keyed on down/ytg/ydl. For each pass snap, record state bucket + outcome class (OC: comp/inc/sack/int). Aggregate per-bucket class rates for both nodes, plus a counterfactual controlling for state mix: GLM's state mix * pool's per-bucket sack rate. N=2000 games (136k+ pass snaps each side).

Results:
- Total pass snaps: pools 136774, GLM 136006 (GLM -0.56%).
- Overall sack rate: pools 7.164%, GLM 6.977% (diff -0.187pp).
- Counterfactual (GLM state mix x pool per-bucket sack rate): 7.158%.
- Residual (actual GLM - counterfactual): -0.181pp.

Interpretation: the state-mix contribution is ~0.006pp (negligible). The residual (per-state bias) is -0.18pp — the GLM under-predicts sacks at the same states. So the shift is a per-state BIAS, not a state-mix artifact.

Concentration: the bias is concentrated in 3rd-down pass states. Per-bucket (n>=200): 3|l|RZ pool 12.10% vs GLM 8.98% (-3.12pp); 3|m|long 13.78% vs 11.10% (-2.68pp); 3|l|long 13.16% vs 12.60% (-0.56pp); 3|xl|long 11.80% vs 10.89%. 2nd-down medium/short buckets also negative (-0.6 to -3.0pp). A few 4th-down and 3rd-short buckets go the other way (+2 to +4.5pp) but on small n (200-600) and noisy.

Mechanism: the GLM (multinomial logit on 15 features) smooths extreme cell sack rates toward the mean; the pool preserves per-cell extremes. In high-sack states (3rd down, especially 3rd & long), the pool's empirical sack rate (~12-14%) is above the GLM's smoothed prediction (~9-11%), so the GLM under-predicts sacks there, producing more 3rd-down conversions, longer drives, fewer drives. This explains both the sack shift (-1.72%) and the drive shift (-1.07%) as consequences of the same smoothing.

Drift (6.4% training vs 7.0% 2023-25 real sack rate) is a separate concern: both models are fit to the same data and evaluated on simulated games, so drift cannot explain the difference between nodes. The bucket test cannot distinguish drift from bias at the model level; drift would need a real-data comparison (not in scope here).

Verdict on mechanism: BIAS (per-state, concentrated in 3rd-down pass states), not artifact, not drift. The shift is now explained. The hypothesis (Claude's and Beam's lean) is confirmed and refined: it is smoothing, and it is concentrated where the pool's sack rate is highest.

=== 1c. Default question ===
The bias is explained: it is GLM smoothing in high-sack 3rd-down states, a known property of multinomial logits, concentrated and modest (-0.18pp per-state, -1.72% aggregate sacks, -1.07% drives, both far inside the ~10% totals bar). In my view this no longer blocks the GLM becoming the default LATER, provided (a) the smoothing is documented as a model property not a bug, and (b) the yards-given-class node (Part 2) is checked against the same per-state bias so it does not compound. But the default decision itself is the Owner's, after the Architect's call. I would not make it default until the yards node's per-state bias is also measured.

=== 1d. Remaining checks (subset) ===
- Default-off: structural (game.ts else branch preserves the old pools path verbatim: `j = sample(pick(P.rec, recKeys(...)), draw(...,'rec'))`) and by suite test. VERIFIED by prior (MUSE/Beam).
- Theta/lambda: pack reports theta [0.3,-0.2,-1.0,-0.6] toy, lambda 0.0. REPORTED (Claude); I read the pack header and confirm theta/lambda fields present with those values. VERIFIED on read.
- tsc ratchet: VERIFIED 89/89 (ran tsc.js directly, colors-patched node_modules; baseline 89). MUSE REPORTED 89/89; Beam could not run (cached node_modules). Now run by me.
- Held-out log loss: raw nflverse data not in repo (phase1/data git-ignored); cannot re-run. REPORTED (Claude): GLM 0.92389 vs pool 0.92786, paired 0.00397 +/- 0.00061 (6.6 SE). To verify: python3 -I tools/mathlab/phase1/passclass.py report with the data present.
- Six planted faults: REPORTED (Claude); I did not plant independently this round. The shared-tag fault is the most valuable (first slipped through: mean completion yards 5.8 vs 11.3 when draws share a uniform).
- Sampler partition / 4th-and-40 goal line: REPORTED; not re-run by me.
- Loader refusals: REPORTED; not re-run by me.

BLOCKED: none for this filing (Owner decision on default; Architect on yards node).
OPEN: whether the GLM should become default (Owner, after Architect's call); whether smoothing should be documented as a model property.
NEXT: (1) file yards-node acceptance battery (Part 2); (2) Architect runs state-bucket test on yards node when it lands; (3) Owner decides default after yards node measured.
EVIDENCE: VERIFIED (paired comparison reproduced; state-bucket test run by me, N=2000, numbers above).
