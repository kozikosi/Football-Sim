SPEAKER: vl | ROLE: council advisor | TASK: λ objective — 0.20 or 0.40 | DATE: 2026-11-12T06:00:00Z
FOR: P-345

Position: **0.40 as the default for football; 0.20 reported alongside** — the default is 0.40 because mis-ordering the draft board is the more visible user error, and the Owner should see the tradeoff explicitly rather than have the formula silently choose for him.

---

## Q1 — Which error costs the user more?

**My position: ordering errors cost more than gap errors, on the current product.**

The user stares at the draft board (slot ranking) continuously during the draft; he glances at trade gaps occasionally during trades. A mis-ordered slot — WR1 priced below WR2, CB1 below DE1 — reads as "the game does not know football." A mis-measured trade gap — "give up RB1, get TE1+WR2" off by ~1.3 wins — reads as a minor disagreement in valuation. Visible errors erode trust faster than silent ones.

**Receipts:**
- VERIFIED: C1-ERA-E-TABLE §3 — λ=0.40 gives 96/97 exact (V2), 97/97 (V3 static-E), mae 1.311; λ=0.20 gives 86/97 exact, mae 1.076. So 0.20 mis-orders ~11 slots by one tier; 0.40 mis-measures gaps by ~1.3 wins mean error. (REPORTED source: Z.ai's C1 table, byte-identical on MUSE's re-run.)
- VERIFIED: LOO (MUSE, REVIEWED, 6 reviews) — λ=0.40 drops to 85/97 exact out of sample (from 96/97 in-sample). So 0.40's exactness is partly in-sample fit; its out-of-sample ordering is not perfect either.
- INFERRED: I have not run VL's receipt (both objectives through the draft board on a held-out season, counting inversions vs gap error). I do not know which specific slots mis-order at 0.20 — are they WR1/CB1/RB1 (user stares at them) or DIME/TE3/WR4 (user rarely sees)? I do not know which trades 0.40 misprices — are they constant user trades or edge cases? **Needed to upgrade Q1 from INFERRED to VERIFIED:** run the held-out draft-board comparison.

**Counter-consideration (honest):** MUSE leans 0.20 precisely because 0.40's out-of-sample ordering degrades (96→85/97) and its gap error (~1.3 wins) is real on trades. If the 11 mis-ordered slots at 0.20 are all high-visibility slots, my position weakens. I do not yet know that.

## Q2 — Does portability favour one?

**My position: honestly, 0.20 is more portable — and that is a real cost of my 0.40 default, not a point to gloss over.**

OR's Q5 filing (REPORTED): the formula does not port cleanly to basketball — three structural breaks (positions→roles, duties overlap, exposure→minutes share). 0.40's advantage comes from leaning hard on the measured football slot table (the guard layer tuned to 97/97 football tiers). When there is no measured basketball table to lean on, 0.40's guard becomes an unsupported precision claim — false precision ported to a sport where the table does not exist yet. 0.20's ability layer (duty matrix + M+λ·S) is the more portable skeleton because it does not pretend to know exact tiers before the data exists.

**So portability cuts against my 0.40 default.** The Owner has said the formula must work for basketball later with no Owner-provided weights, and that the most portable formula wins. If basketball is a real second sport (not deferred forever), 0.40's football-table fit is a liability. I still lean 0.40 *for football's draft board*, but I should say: if the Owner's priority is a single formula that ports cleanly to basketball without a rebuild, 0.20 is the better choice, and my 0.40 default should be re-examined. The two objectives may need to diverge by sport — 0.40 for football (draft-board visibility), 0.20 for basketball (portability skeleton). That is a third option worth naming explicitly.

## Q3 — Is there a third way?

**Yes, and it is under-explored: show rank from one objective and gaps from the other, on different screens.**

The formula does not have to choose one λ for both the draft board and the trade screen. The draft board needs ordering → use 0.40's exact tiers. The trade screen needs gap accuracy → use 0.20's mean error. The product displays both; the formula computes both (dual-reported already by Z.ai). The user never has to know which objective produced which number — he just sees a board that orders right and trade values that measure right.

**Candidates I considered and set aside:**
- (a) V3's per-slot min-collapse — already buys the C>OG row; I do not know if it buys anything at 0.20 (UNKNOWN, needs the per-slot table at both objectives).
- (b) A blend or sum-with-cap instead of max — the merged form is `max(M+λ·S, E·G)`. A sum would weaken the guard's zero-under-priced structure; I have not tested it. UNVERIFIED.
- (c) A λ that varies by role family — the ability layer already varies by role; λ per family adds complexity without a receipt. UNVERIFIED.

My third-way recommendation: **dual-display** — rank from 0.40, gaps from 0.20 — is the cleanest resolution because it uses machinery already shipped (dual reporting) and respects that ordering and gaps are different user needs. It does not require a new formula, just a screen-selection rule.

## Q4 — Does the ANOVA bridge settle anything?

**No — it makes β more precise while leaving the objective untouched.**

DS's ANOVA estimator `λ̂² = (Var(team means) − mean within-game var / n̄) / Var(g)` is the analytic form of the same two-gap estimator. It estimates β = λ·θ more precisely, with no simulator. But λ and θ remain observationally equivalent (my Q3 proof, VERIFIED). So λ̂_40 ≈ 0.40 and λ̂_20 ≈ 0.20 would both be true statements about different β targets — the bridge does not pick between them. It would settle *whether the two-gap Lab's β is trustworthy*, not *which λ objective the product should use*.

**OR's proposal** (REPORTED): run ANOVA on P-344 and report λ̂ for both objectives. I agree it should be run as a receipt alongside the Lab — but its output changes the precision of β, not the objective choice. If λ̂ comes out nearer 0.20, that argues for 0.20 as the "true" β scale; if nearer 0.40, for 0.40. Either way, the Owner's product decision (ordering vs gaps) is unchanged.

## What would change my mind

One paragraph: If VL's held-out draft-board receipt shows that (a) the 11 mis-ordered slots at 0.20 are all high-visibility slots (WR1, CB1, RB1, OT1 — slots the user stares at) AND (b) the slots 0.40 mis-measures are all low-visibility depth slots, then 0.20's cost is invisible and 0.40's benefit is pure product value — I would flip to 0.20 as the default. Conversely, if the held-out board shows 0.40's out-of-sample ordering collapses (the LOO 96→85 drop continues) while 0.20's 11 mis-ordered slots are all depth slots nobody sees, I would keep 0.40 but stop claiming out-of-sample exactness for it. Either receipt flips or sharpens the position.

## Evidence label

VERIFIED (lambda-ident.mjs non-identifiability proof this session; C1 static-E mae/exactness numbers from Z.ai's byte-identical JSONs; LOO 96→85/97 from MUSE's REVIEWED 6-review filing) · REPORTED (MUSE's 0.20 lean and portability argument; OR's Q5 basketball portability filing; Z.ai's dual-report 0.40/0.20) · INFERRED (ordering-vs-gap visibility framing; dual-display third-way recommendation; portability cost of 0.40 for basketball) · UNKNOWN (which specific slots mis-order at 0.20; which trades 0.40 misprices; per-slot min-collapse effect at 0.20)
