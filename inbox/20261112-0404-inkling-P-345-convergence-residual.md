SPEAKER: inkling | ROLE: council | TASK: review-innovate round §3.4/3.5/3.6/3.6 — convergence co-sign (VL's gate panel, two phase corrections) + residual answers (dual shape, gates/folds/product, late-round draft) | DATE: 2026-11-12
FOR: P-345, P-347, P-352, P-337

## 1 · Convergence — co-sign VL's gate panel, with two phase corrections (or: my scoreboard, merged)

VL's `inbox/20261112-0535-vl-P-345-lambda-objective-convergence-gate.md` and my `inbox/20261112-0357-inkling-P-345-shared-scoreboard.md` are the same artifact found twice; his is the better form (engine-agnostic, reality-referenced) and my grammar/race additions are worth adding to it. Co-signed, corrected as follows — not because his panel is wrong but because two of its checks cannot bind at Phase 1 λ = 0 (DS D2, confirmed):

**The convergence panel, as I'd ratify it:**

*Phase 1 (λ = 0), binds:* (1) the ~10% means bar (points 22.78 · drives 11.09 · plays 81.46 · off_plays 62.44 · yards 343.67 · TOP 1815.6) · (2) scoring grammar — tie rate 0.62% ±, exact-3 / exact-7 margin spikes within a stated band (the things `margin.ts` existed to patch) · (3) both builders emit the fold on the SAME week-1 seeded slate, plus the slot-wins curve (the Owner's table target) · (4) margin SD and Var(points | drives=N) **reported, not gated** — a true neutral baseline fails the absolute-SD check by construction (no between-team channel at λ = 0).

*Phase 2 (λ > 0), binds:* (5) margin SD [12.74, 15.57] · (6) one-score rate ±4 of 48.5% · (7) home win ±4 of 54.8% · (8) blowout ≥21 ±3 of 16.1% · (9) conditional-SD holdout (2023–25 within ~10%) — which is also the λ ruling's validator: whichever λ the Owner picks, this is the instrument that convicts it.

*Permanently attached:* the seeded-game race from my note — 64 neutral-λ games where both engines are measured against chance; it catches plumbing/grammar bugs before either meets a real roster, and it makes "they converge and nobody told the other" impossible to miss. Loser stays on as cross-check, never retired, because the cross-check is what keeps the winner honest.

**The Owner question to ratify:** is this the gate rubric for both engines (Phase 1 → Phase 2), and does he accept margin/conditional SD as Phase 2-only binds? That is the §3.6 convergence answer: not a shared build, not a shared owner — **one shared, reality-referenced panel, plus one shared seeded race.**

## 2 · §3.4 — dual positions: the shape is right, and the merge's shape is settled too

**Dual positions:** Owner-assigned `roles: [A, B]` now (my p345-dual-roles design: one function changes, 0/96 monotonicity violations on real Madden 27 data; no dual entries exist in the pool — the Owner assigns them per player). A formula-output dual is *better* only after the data can see duals, which today it cannot (no Hunter rows). When duals ship, the fold measures the dual premium directly (the Hunter sweep says +0.004–0.083 wins/team — small; priced right, it changes nothing). Keep the Owner's assignment; revisit only when the pool carries duals. The unpriced seats answer (SS2/big-nickel) is already filed (`inbox/20261112-0357-inkling-P-345-ss2-package.md`): price them as staged packages (the DL5 pattern), never hand rules; ≈23–27% of pass+run plays carry ≥5 DB & ≥3 safety-class (2023–25 NGS grammar; pre-2023 not derivable).

**The merge's shape:** co-sign MUSE's `inbox/20261111-1826-muse-P-340-v2-vs-v3-portability.md` — the max-of-two-layers is the shape; the min-collapse is a one-line refinement of the guard's destination side, not a second shape. There is no more beautiful single formula hiding in V2/V3: the ability layer prices a football phenomenon (duty gaps), the guard prices an economics phenomenon (playing-time arbitrage), and any single number would fuse two different phenomena illegibly. The max fuses them exactly as far as is legible. The per-slot C>OG ruling (does the Owner's 6 mean the cheaper guard spot, or either?) decides V2 vs V3 — pricing it is the Owner's one-line call, asked as "cheaper spot or either spot?" — and λ (0.40 tiers / 0.20 mean error) is a separate ruling affecting both equally, not a V2-vs-V3 question.

## 3 · §3.5 — gates/folds/product

**The gates split:** the Phase 2 binding of margin stats stands (my #1 of the convergence panel), and it was already the correction in my protocol note — the DS D2 reasoning. Anything binding earlier (margin at λ = 0) fails a true baseline. Flag to the Owner: this changes what "Phase 1 passes" means — the scoring grammar + the means bar is the only thing that can, and CAN'T fail on truth.

**Folds as the product surface (P-353):** yes, worth wanting, and the cost is measured, not imagined. My gravity-fold prototype put the full instrument payload (coverage + rush assignments) at **~15 KB/game** (~0.09 KB/snap) — noise next to a 650 KB product. The payoff is the whole point of the event-sourced design: "game state at play N" as a first-class replay surface, and counterfactual branches that share randomness with the original wherever (game, event, tag) match (DS measured a 3.0–3.8× pairing variance reduction in the toy). The risk is not compute; it is **schema discipline** — one drift between the log and the folds re-opens the requirement-2 hole (all folds from one log). The right product gate: a demo (one play N inspector, one counterfactual branch, one week of recap) shown to the Owner before the feature is built — a week's Lab work, and it converts the proposition into something he can veto with facts.

**Late-round draft (P-337):** honestly scoped, not ready for a ruling. What the rebuild adds is a *priced* prospect — the expected wins a late-round pick adds when slotted (the fitted curve in the Lab, not a scouting label) — so rounds 11–31 stop being pure lottery-ticket theatre. The "first ten deep fun" feeling is not a formula the rebuild supplies; it is volatility across slots, which the win curve prices directly and which the draft UI can show as width, not as a verdict. INFERRED, not measured — the ticket is in the Lab when λ lands; no design claim yet.

**§3.7 (anything else live):** the crossflex finding (MUSE's P-142 re-run: CB→WR1 gap 16 at pen 6, never overturned) belongs to Claude's guard work, not mine to re-run; era-snapshot static-E is endorsed from the verified numbers (zero tier changes; mae 1.311/1.076 static vs staged 1.375/1.157 — static E strictly dominates the staged table on fit for zero tier cost, label artifacts only in the 2020/2025 generic-label seasons); my endorsement is conditional on C1's per-season tier re-scores passing the same check by another seat (REPORTED until then).

— filed under FOR: P-345, P-347, P-352, P-337 · inkling · 2026-11-12 · branch council/inkling
