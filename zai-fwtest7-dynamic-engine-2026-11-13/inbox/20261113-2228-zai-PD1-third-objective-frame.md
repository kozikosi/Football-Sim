SPEAKER: zai | ROLE: High Councillor · Executor | TASK: PD.1 (comprehensive Part D.1) — work the third objective: the frame | DATE: 2026-11-13T22:28Z
FOR: P-345 · the Owner · the Architect

**Position in one sentence (INFERRED → shipped as a file):** the third objective's frame is **"a stable structure with one parameterized dial: the dial is a function `λ(snapshot, mechanics)` over a frozen context snapshot, anchored at the flat prior, admitted only through a held-out acceptance gate"** — and that frame is shipped as a working TypeScript module sketch, not prose (see `deliveries/partb-emerge-spec/lambda_context_draft.ts` in this delivery).

## The frame, named precisely

1. **The structure stays stable:** the merged form (ability + exposure guard + V3 per-slot min-collapse) and the display law are frozen; nothing inside them moves when context moves.
2. **The dial is a parameter, not a constant and not a choice:** `λ(g) = λ0 · (1 + X_g′β)` — λ0 the flat prior (0.40 as the anchor the model returns to), β penalized toward zero, fitted on 2016–22, validated on the frozen 2023–25 holdout. INKLING's flat-prior form (REPORTED, `20261113-0300`, §Q6) and Beam's function-signature candidate (REPORTED, `20261113-1932`) converge on this shape; I take the combination and add the third piece both lack: **the snapshot is the input** — the dial reads `week, save → contextSnapshot`, never the screen, never the engine's live state. GLM's consistency design (§2.4, REPORTED) is the same law from the display side; the three seats agree without having coordinated, which is itself evidence the frame is the natural one.
3. **The acceptance gate is the owner of truth:** λ(context) wins iff held-out wrong-strict-pairs improve (the 23-vs-305 discriminant, quoted by name) with exact tiers preserved, mae quoted with its units caveat, and bootstrap CIs excluding zero improvement. If the axes' differences sit inside the bands, fixed wins on parsimony and the axis is recorded dead — an outcome, not a defeat (D.8's cut 2 is the worked example).

## What the Owner's "every structure could fluctuate" ruling means under this frame

Every structure CAN fluctuate **through the snapshot**, and the D.9 inventory is the queue of candidates — but the frame does not promise every structure WILL: each candidate pays the same held-out toll, and the two-regime frame (D.9 extension 5) is the cap that keeps the surface two-calibrated-sets wide instead of n-wide. The Owner's ruling honored honestly is: the *mechanism* exists everywhere; the *motion* only where measurement earns it. (The Owner's 2026-11-13 ruling "static binary is not open for discussion. dial must fluctuate" — REPORTED via Beam's filing — is answered by exactly this: the dial DOES fluctuate, in the fit layer, wherever a held-out receipt admits it; where no receipt admits it yet, the flat prior is the current measured truth, and the Lab keeps running.)

## Receipt

- The module sketch is a file (Part B's settle criterion): typed `ContextSnapshot`, `lambdaFor(snapshot, mechanics)`, the axes enum, the gate hook, the two-regime selector, the snapshot-hash round-trip, and the 11-row premium-destination monitor hook — server-ready (no browser APIs, no Math.random/Date.now), never wired to the product (Part B's bounds).
- The three-axis testing programme ships beside it (`three-axis-testing-programme.md`): playoffs vs regular, divisional vs non-divisional, key-player presence — the first three earn or fail the method before any new axis is authored (GLM's discipline, adopted).
- B.4's LOO direction analysis ran this wave (under-/over-pricing per form × rule, with rows) — the receipt that tells the Owner what his current operating point does out of sample: under the mae rule, misses concentrate UNDER-priced (the exploit direction, 20 of 22 misses); under the exact rule, essentially no misses (2, or 0 under V3min). VERIFIED, in `results/b4-loo-direction.json`.

## Failure mode

- **The dial that never moves:** if every axis dies at the gate, β ≡ 0 forever and the fluctuating machinery is dead weight. Guard: that outcome is still the objective served (the flat prior IS the measured answer); the module degrades to `λ = λ0` with the axes' corpses on file — the honest state, and cheaper than six fitted constants the data refused.
- **The dial that moves everywhere:** β overfits 2016–22 if the penalty relaxes. Guard: the penalty + holdout are in the module; CI-excluding-zero is the ship gate, not a suggestion.

## The Owner-question it carries

Where does the dial live first — **fit layer only** (my default; INKLING's §Q5.3 default too: the display never shows it, Wins stays flat-prior-derived) or also the display/artifact layer? The cost is visible BEFORE the ruling via the module sketch — that is why the file ships first. Consequence of the other choice: the user-visible Wins stop being one scale, and the consistency ruling needs a snapshot-consistency proof on every screen.

Cross-references: D.9 (the candidate queue), Part B §1–§5 (the mechanical upgrades), INKLING 0300 §Q6 + Beam 1932 (the two origins — combined, per Ruling 14's "take either, combine, or write your own").
