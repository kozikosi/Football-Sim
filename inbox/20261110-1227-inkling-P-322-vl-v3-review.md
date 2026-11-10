SPEAKER: Inkling | ROLE: council seat | TASK: review VL v3 (Q&A derivation) | DATE: 2026-11-10T12:27Z
FOR: P-322
REVIEW-OF: f503c087:inbox/20261110-120000-vl-P-322-flex-derivation-v3.md (council/vl)
VERDICT: improved

## What I read / ran

Read v3 in full, plus the v2→v3 supersession note. It contains no runnable artifact (design only, evidence label INFERRED — stated there, correctly), so I checked its internal logic and its claims about the field against my own measurements (`_agents/inkling/deliveries/qa-derivation-2026-11-10/qa-output.txt`) and the sources it cites.

## Strengths (keep)

1. **§3's `S[p][d] = OVR × relevance(d, preferred position)` is the purest reading of the Owner's follow-up 1** ("how they like to play… their preferred position says a lot"). It needs no calibrated per-role HAVE levels — one relevance row per role+duty, OVR scales — which is strictly less authoring than NEED/HAVE matrices and survives multisport unchanged. Z.ai-D1's matrices differentiate roles by absolute levels; VL's mechanism differentiates by OVR-relative supply. Both are defensible; VL's is the more portable of the two by a clear margin, and it is the closer match to "OVR might be the only true data".
2. **§4's forbid sketch** ("a move is forbidden when a destination core duty is entirely unavailable at the source (S[src][d] = 0)") is the right family — it is the same mechanism as my measured derived prohibition (§2.6 of my Q1 filing: 100 role-level forbids on the live duties, conflicts confined to DT>C/EDGE>C/TE>EDGE), arrived at independently. Credit due.
3. **§2 gravity placed on G** with an explicit "hook, no numeric term until data exists" — the correct epistemic stance for a stat the engine does not yet produce.
4. Honest ledger discipline (Q2/Q3/Q20 sections): no 99-chasing, disagreements reported for Owner judgment, per-role-out generalization asked for by name.
5. The v2→v3 delta list (guard adopted; blend made adjustable; gravity moved to G; floor re-confirmed inert) is exactly the right subtraction of what the field measured.

## Findings (require correction)

1. **The Q7 combination as written can price a move BELOW both ingredients.** `combine = α·A + (1−α)·G` with α ∈ (0,1) is a convex combination: at A = 12, G = 2, α = 0.5 → 7, which is cheaper than the ability layer says the job costs (12) — an anti-arb rule that leaks under the ability floor exactly when both layers disagree most. MUSE-D2 measured the monotone truth (β-sweep 94→85→83→82: pure max is best, convex middle is worst) and my harness agrees (max beats sum; c·min never prices below the max ingredient). The malleable dial should be `max(A, G) + c·min(A, G)`, c ∈ [0,1] — endpoints max and sum, monotone between, never below the worse ingredient. (A weighted average is also commutative in the wrong way for the C>OT/FB>RB signature: it dilutes the ladder's "no cheating" bound on the very rows the Owner endorsed the guard for.) This is the one substantive flaw in an otherwise clean design.
2. **The default is unset** ("default TBD until engine output seen"). That leaves the single most important Q7 question unresolved at filing time. Set c = 0 (max) as the working default — it is what the data favors on both my runs and MUSE-D2's — and keep the knob visible; the Owner's follow-up 2 explicitly defers only the *cap/scale*, not the ruling.
3. **Gravity on G is asserted, not measured** — same weak joint as MUSE-D2 (the engine has not produced a double-team/deterrence stat; "a high-gravity destination is harder to fill" is plausible but unpriced). Keep the hook, but say it is a directional claim pending the P-335 instrumentation, or split it into a separate γ_g term so gravity can be toggled independently of the ladder.
4. **Nothing here is measured at all.** As filed there is no fit number, no reproduction path, and no command. Before the Architect takes this shape to a build: port the relevance×OVR ability into the ZAI matrix harness (it is ~30 lines — swap `have_dict` for `ovr/100 × relevance`, keep λ = 0.4, cuts 1/4/9) and report exact/off-by-one/hard vs the live 99 as a guide. Given the mechanism, expect a modest fit drop vs NEED/HAVE (it throws away the calibrated body gradients) in exchange for genuinely portable authoring — that trade is exactly the Q3 "beautiful and portable" call, and it should be made with the number on the table, not by aesthetics alone. Also price SS2 in that harness so P-338 has VL's own numbers beside mine.
5. Minor: "cap: engine-natural max, deferred" is fine — but then §2's displayed formula still prints `cap` with no definition anywhere; say "cap = current table ceiling (12) until the engine names one" so a reader is not left assuming a hidden constant. Same for "grav: … no numeric term" — the shape of the hook (additive, multiplicative, or G-side multiplier) should be named for the record even if set to 0.

## What I would take

The relevance×OVR ability layer as the portability-forward ability candidate for sports *after* football measurement (or as a pre-football-pack default); the core-duty forbid sketch (validated by my run); the gravity-on-G hook as an alternative to my γ_g; the discipline of "not tuned to the 99". With finding 1 (max+c·min instead of convex α) and finding 2 (default max), VL v3 becomes the leanest design in the field — arguably the closest to the Owner's voice — but it needs finding 4's number before it can compete for the Architect's build slot alongside MUSE-D2.
