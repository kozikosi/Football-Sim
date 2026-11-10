SPEAKER: Inkling | ROLE: council seat | TASK: review Glyph G-QA-D1 (Q&A derivation) | DATE: 2026-11-10T12:33Z
FOR: P-322
REVIEW-OF: dd08b449:inbox/20261110-1143-glyph-P-322-qa-derivation.md (council/glyph)
VERDICT: improved

## What I ran

Read G-QA-D1 in full. No runnable artifact ships with it (INFERRED labels, stated — correct for this scope). I independently computed its centerpiece mechanism (`Vjob[j] = Σ_d w_d · NEED[j,d]`, "Vjob derived from duty-load", §2.3) on the ZAI-D1 duty weights over the 20 destinations, to test its own §6 claim that "OT's job yields higher Vjob than C's job … structurally aligned with the Owner's answer (a)".

## Strengths (keep)

1. **The most complete design document in this round** — every hard point of the Q&A is answered by name, the self-consistency constraint (`need(job) ⪯ have(native role)`) is the right replacement for pair-tracking, `CORE[j]` prohibition is the right family (matches my measured derived-forbid, §2.6 of my Q1 filing, arrived at independently — and arrived at as "mostly b, some c" per Q15, which neither VL nor Super nor MUSE-D2 fully addresses).
2. **Dual-position as an eligibility overlay, not a formula exception** — correct form of round-2 Q1 (price 0 by membership), and stated cleanly.
3. **The P-337 presentation proposal** (rounds 1–10 deep, rounds 11+ one-number one-click) is concrete and correctly scoped as presentation, not pricing.
4. Labels are honest to a fault; the 107-rule stale-snapshot caveat is disclosed in-line rather than hidden.
5. The gravity treatment (GRV O/D as duties participating in A *and* amplifying Vjob) is the most complete gravity design in the field — and also the riskiest (see finding 3).

## Findings

1. **VERIFIED, decisive: G-QA-D1's value layer breaks the one anchor it cites as proof.** `Vjob = Σ w_d·NEED[j,d]` ranks (football, ZAI weights): CB 54.9 > ILB 41.4 > DIME 40.5 > FS 40.2 > SS 39.8 > EDGE 36.6 > … > C 27.6 > OLB 26.8 > **OT 26.4** > OG 24.9 > **QB 20.8 (last of 20 roles)** > FB 8.8. Consequences, all scale-free in V0:
   - `Gv(C → OT) = V0·max(0, 1 − 27.6/26.4) = 0` — the model prices C>OT by ability alone (A ≈ 2) → **tier 2, the opposite of the Owner's endorsed answer (Q11a, "a is the best answer")**. For every choice of V0; it is an ordering inversion, not a calibration miss.
   - QB is the cheapest job in the league by this measure, and CB the most expensive — it cannot be the value ladder, and it cannot produce "so nobody profits by moving up the ladder" for the ladder's actual purpose.
   - My earlier measured rejection of demand×scarcity (`v₀ = Σ W·need·σ`, ρ = **+0.41** vs the football ladder) covers the shrunk sub-family; this run shows the *unscaled* demand family fails outright — no scarcity factor needed, no hiding behind it.
   The §6 tension table's claim "structurally aligned with Owner's answer (a)" is therefore **not true as written**. The owner-visible fix: **derive Vjob from the engine measurement where it exists (football: slotWins/localWins), else const (ability-only, labeled pre-measurement), else — if the sport author insists on demand-only — value ints per job supplied by the author** (one number per job, ~25 ints, same class of authoring as a NEED table; zero Owner data). Nothing else in G-QA-D1 needs to change.
2. **`max(A, β·Gv)` with β = 1 default** is fine, but note the blend operator was left unintegrated: the "configurable `R = (1−α)A + α·β·Gv`" alternate mode has the convex-undershoot defect (at A = 12, G = 2, α = 0.5 → 7 < 12). Ship max as the only default; expose β, not α.
3. **Gravity in two places at once.** Putting GRV into NEED (so A rises) *and* into Vjob (so Gv rises) double-counts one unmeasured quantity. Q8's gravity exists to describe *attention/punishment economics*; if it enters the formula at all, one channel is enough — either as a NEED duty ("can this body provide gravity at that job?") or as a measured exit term (my γ_g hook, default 0). Until the engine instruments double-teams/deterrence (NOW, per follow-up 3), the whole gravity apparatus is sketch, not mechanism — that's fine as design, but the two-channel form will silently double-tax a skill we haven't measured once we do measure it. Recommend GRV-in-A only, or GRV-in-exit only, never both.
4. **CORE forbid: right rule, uncalibrated blast radius.** "HAVE == 0 on a core duty ⇒ forbidden" is correct direction; on the live matrices it yields **100 role-level forbids** (cut NEED ≥ 9, cutoff-invariant signature {DT>C, EDGE>C, TE>EDGE}) — of which exactly three collide with the priced table. Glyph should either (a) publish its own measured forbid set from a football pack, or (b) scope CORE duties explicitly per job (it hints this with 'GOAL for goalie', 'size/reach for center-in-basketball') so the rule doesn't sweep beyond its intent. What it must not do is forbid silently — every forbid needs the SS2-test treatment.
5. Minor: the rostered example numbering (SS = "above DIME in box value") is sensible, but "Vjob[SS2] derived from this load" inherits finding 1 — once Vjob is measured/int-based, re-state which "sits between" SS2 actually holds. And §2.6's claim about overriding "cheaper of DT/EDGE" behavior for DL5 assumes the DL5 NEED blitzer profile selects edges over DTs — plausible (EREP EREP EREP), but it's INFERRED, mark it as such next to the claim, matching the rest of the doc's discipline.

## What I would take

The **sport-pack** framing (NEED/HAVE/CORE/Vjob per sport, authored once, shared by sim + lineup + flex — Q5's "one list for everything" in concrete form), the self-consistency constraint replacing pairs, the CORE prohibition (with calibration), the dual-position overlay, and the P-337 seamlessness proposal. With the value layer corrected per finding 1, G-QA-D1 is the most complete portability story on the table — and it would make a strong companion to VL v3 as the multisport candidate, with MUSE-D2 as the football default and my Q1 as the calibration target.

Verdict rationale: not rejected — the architecture survives review; but its current central mechanism (finding 1) is measurably wrong on the Owner's one named anchor, so it cannot be adopted as filed.
