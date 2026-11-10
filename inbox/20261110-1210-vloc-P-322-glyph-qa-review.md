SPEAKER: VLOC | ROLE: Council seat | TASK: Review Glyph's P-322 Q&A derivation (G-QA-D1) | DATE: 20261110-1210Z

REVIEW-OF: council/glyph:inbox/20261110-1143-glyph-P-322-qa-derivation.md
VERDICT: ok

## Basis of review

Glyph's G-QA-D1 is a **design document** (P-322 is design-only; no product files edited). Evidence labels per Glyph: VERIFIED (ran/read here), REPORTED (council filings/prompt), INFERRED (design reasoning, not fitted to a build). So I review for **Q&A consistency** and **internal coherence**, not numerical reproduction. No product file touched, no constants re-pinned — correct.

## Q&A alignment (G-QA-D1 → Owner answer)

| Q&A point | Owner answer | Glyph treatment | Verdict |
|---|---|---|---|
| Q1 fun tax, stings, nothing unrealistic | Ability + anti-cheat, creativity untouched | ✓ |
| Q2 don't care about 99-fit; OVR only true data | Report disagreements in OVR points; OVR + preferred-position inputs | ✓ |
| Q3 beautiful and portable | Single sport-pack mechanism; portability central | ✓ |
| Q4 integers, no labels, 0/2/6/12 not necessary, scale deferred | Continuous R internal; integer display; cap/steps deferred | ✓ |
| Q5 portable; basketball positionless | Sport pack per sport; small-λ for positionless sports | ✓ |
| Q6 two ingredients; late-round seamless | Ability + value guard; adjustable β/α; one-number late-round guidance | ✓ |
| Q7 adjustable ratio, most malleable | β (ability vs value ratio) + optional α blend; explicit config | ✓ |
| Q8 gravity NOW, might be part of formula | GRV duties + value amplification + advanced stats; engine hooks reserved | ✓ |
| Q9 no named exceptions; one unified model | None; prohibitions via CORE/cap | ✓ |
| Q10 delete floor; ugly appendage | Dropped; cross-side emerges from A/Gv | ✓ |
| Q11 C>OT via value ladder (a) | Gv(C,OT) dominant → large penalty ≈ cap; INFERRED until measured | ✓ |
| Q12 no pairs | Self-consistency need(job) ≤ have(native role); no pair tracking | ✓ |
| Q14 no intangibles | Role-level duty profiles, not per-player stats | ✓ |
| Q15 b+c fluidity+prohibition; dual positions free | CORE/cap prohibition; dual-position = 0; otherwise formula-priced | ✓ |
| Q16 basketball not now | Deferred (agree with Owner) | ✓ |
| Follow-up 1 OVR + preferred position | Duty profiles from positional concepts; role-level | ✓ |
| Follow-up 2 scale/cap deferred | Deferred to engine natural output | ✓ |
| Follow-up 3 gravity now | Described as formula part; engine instrumentation TBD | ✓ |
| Follow-up 4 dual positions free; Owner assigns | Eligibility overlay; Owner/agent assigns | ✓ |
| Round-2 Q2 DL5 emerges | DL5 as NEED profile; prices emerge, no neighbor rule | ✓ |

## Internal-coherence notes

1. **Duty weights w_d source.** G-QA-D1 defines `Vjob[j] = Σ w_d · NEED[j,d]` (+ gravity) and says "derived, not hand-tuned by Owner," but doesn't specify where w_d come from. This is a real dependency: the guard's ratios depend on w_d, and for new sports the Owner won't provide them. Glyph resolves the *slot-weight* tension (Vjob derived from duty load), but the duty weights themselves still need sourcing — a small open item for the Architect, not a design flaw.

2. **C>OT = cap is INFERRED, not measured.** Glyph is honest here: "INFERRED until measured against a calibrated football pack." The Owner endorsed C>OT = 12 via the value ladder (Q11a); Glyph's structure produces a large penalty but doesn't yet land exactly 12. That's acceptable for a design doc — measurement comes at build time.

3. **Gravity in three layers (measure/display/hook).** Matches Inkling's approach and the Owner's Q8/follow-up 3 ("now… might be part of the formula"). γ_g default 0 costs nothing if never switched on. Good.

4. **Derived prohibition via CORE/cap.** Matches Q15 (b+c) and Inkling's P-338 treatment. Glyph's SS2 example (one NEED row, no hand rules) demonstrates it concretely — consistent with Inkling's SS2 pricing.

5. **Late-round UX.** Rounds 1–10 show OVR_eff for experimentation; rounds 11+ one-number guidance. Aligns with Q6 (first ten rounds fun, second half simple decisions). Presentation-only, no model change — good separation.

6. **No fit claim to the 99.** Correct given Q2/Q3 — Glyph explicitly treats the 99 as guide not target and proposes mean-error/rank-correlation reporting instead.

## Comparison note vs Inkling-Q1 (which I verified numerically)

Glyph's combination (`max(A, β·Gv)`) is the same family as Inkling's `max(A,G) + c·min(A,G)` with c=0 default — both converge on "take the worse constraint." Glyph adds an optional α-blend mode for tuning, which is a reasonable superset of Inkling's single c knob. Glyph's duty-weight sourcing is the one open item Inkling sidesteps by using engine-measured slotWins20 directly.

## Bottom line

G-QA-D1 is a coherent, Q&A-consistent derivation: single sport-pack (duty/NEED/HAVE/value model), ability + portable value guard, adjustable β/α blend, derived prohibitions, dual-position free, gravity as duties+value+advanced-stats, continuous internal/integer display, no floor/pins/pairs/intangibles, OVR + preferred-position inputs. One open dependency (duty-weight sourcing for w_d). No numbers to reproduce (design only, INFERRED). P-322 needs two more reviews from seats other than glyph/vloc to reach REVIEWED.

Labels: INFERRED (design reasoning, not numerically run) · VERIFIED (Q&A mapping check against the prompt Q&A text, done by reading the filing).
