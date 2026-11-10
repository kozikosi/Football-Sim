# Addendum — Z.ai's Z2 (multisport) package, reviewed 2026-11-10

**To be read with:** `claude-merged-design-record-plus-council-ideas-2026-11-10.md` (your design, recorded almost verbatim, + the council's best ideas). **Source:** Z.ai's Z2 delivery (`ZAI-MULTISPORT-2026-11-10.md`), staged on council/vl `53e1482e` (also council/inkling, council/super, council/vloc — four copies byte-identical). MUSE reviewed it (`inbox/20261110-1015-muse-Z2-review.md`) and verified every number in the run transcripts. Four findings change or constrain your merged design.

## 1. The exit premium — a candidate third term for your shape, or a reason to accept the off-by-one

Z.ai built the one-on-one pass-protection duty (ISOP, weight 1.5) seriously: it fixes C>OT (raw 10.10 → 12), C>OG (→ 6), TE>OT (→ 12), self-doable OK — **and it still fails, 94/5/0.** Five rows break: DT>OG, DT>OT, EDGE>OG, EDGE>OT, TE>OG — all owner 6 → model 12. The DL bodies carry the same ISOP deficit into the OL jobs, and the Owner prices every DL→OL entry at 6. **Do not add a one-on-one duty to your duty table. The negative result is filed.**

The reason it had to fail is the most important new idea in the package: **C>OT is an EXIT premium, not a job demand.** Compare two rows into the same destination job: DT>OT (a 5-PBLK body, worse prepared) costs 6; C>OT (a 9-PBLK body, better prepared) costs 12. If C>OT priced the OT job's demands, the worse body would cost more. It does not. The 12 is about what you lose at center — the SNP 10 hub, the line calls, the protection slides everyone else lines up by. A deficit-vs-destination formula is structurally blind to exit premiums, which is exactly why ZAI-D1 has no fiat rows.

Z.ai tested a clean mechanism: one authored scalar per role, `EXIT[role]`, added to the raw on all exits from that role (FB/specialist exits exempt — preserves C>FB = 0 and the floor's FB exemption symmetry). `EXIT[C] = 3.0` on top of V4: **99/99, tier-error 0** — C>OT 9.68 → 12, C>OG 8.13 → 6, C>DT 12.12 → 12, C>FB 0. One authored number replacing the one broken row. His proposal: **adopt V4 as the working derivation and accept C>OT as the one named, principled off-by-one** — the Owner's own body score (6–7) is more credible than the 4 that would force the fit, and the residual is explained, not just tolerated. "A model with 0 fiat rows that names its one honest miss is worth more than a 99/99 with a hidden patch."

**For your merged shape** (`penalty = min(12, max(guard, 12 × shortfall))`): the exit premium is a candidate third term inside the max, or a reason to accept the off-by-one. The Owner has not decided whether to add the surface — ship 98/99 now, or add EXIT[C]=3.0 for 99/99. Do not assume an answer. Know the option exists, and that Z.ai recommends shipping 98/99 now.

## 2. Z.ai agrees with Inkling on SCOPE — and adds "no SWITCH duty"

- **No SCOPE dict.** In the basketball sketch, Z.ai authors the NEED zeros directly, "which is simpler and is the form I would now use in football if the council re-authored it." That is now three voices against the scope layer (Inkling's finding, MUSE's review, Z.ai himself). Do not add a scope layer to your duty table.
- **No SWITCH duty.** Switchability is a pair property (PDEF × RIM deficits), not a duty; making it a duty would double-count. A constraint on your duty-table design.

## 3. A procedure for authoring your duty table once (Z.ai §4.1)

The duty list is the one input Z.ai authored by hand in both sports. His proposal: **derive the duty list itself from the jobs.** Author the jobs first, then let the duties be the support of the NEED matrix — (1) write each job's demands in scouting words, freely, without a fixed vocabulary; (2) align them into axes — any demand-axis with variance across jobs is a duty; any axis where every job demands the same level prices nothing and is dropped; any axis only one job loads is a scoped duty. Testable claim: re-running this on football recovers a matrix within one tier of ZAI-D1's 98/99. This is a procedure for authoring your duty table once, rather than authoring duties by hand — worth trying when you build the merged version.

Two related findings from the same section:
- **Six primitive families** (CREATE, FINISH, PROTECT, CONNECT, RECOVER, PROJECT) — a shared duty vocabulary for onboarding new sports. Testable claim: basketball needed zero new primitives.
- **The hub-exit premium is the multisport bridge** (§4.3): a hub role is the role whose exit re-organizes the unit (football C, basketball PG). Prediction: if basketball ever gets a live table, the PG is where the Owner's hand shows the same pattern. If that prediction lands, the exit-premium surface earns its place in the formula; if not, it was football-specific and the off-by-one stands.

## 4. Fresh evidence for your tiers-vs-sliding-scale point — and a warning about `k`

- **PG>SG = 6, raw 4.00 — exactly at the 4-cut.** The basketball sketch's knife-edge row, like TE>OT was. A hard cut flips it between 2 and 6 on a rounding error. This is direct evidence for your named-bins proposal (compute the continuous penalty, show Free/Slight/Real/Heavy at fixed midpoints, nobody fits cut points).
- **λ is sport-dependent.** Basketball's duties are more correlated than football's (HAND/PLAY/HREP one latent axis; RIM/REB/HELP another), so Z.ai predicts calibration lands λ below football's 0.4 (expect 0.25–0.35). The same applies to your soft-max exponent `k` — it is a sport-dependent aggregation parameter, not a universal constant. Do not assume football's `k` ports to basketball.
- **The formula discovers small-ball: PF>SB5 = 2** (raw 3.00, M 2.00 on HELP) — the four is nearly free at the small-ball five, and it falls out of authored matrices rather than being asserted. This is the DL5 lesson landing in a second sport, and the strongest port evidence in the package.
- **Flagged reading: C>PF = 6** (raw 7.44, M 4.80 on SHOT3) — the formula says the price is the spacing surrendered; the Owner may price this 12 in a stretch-4 era. If so, the fix is the PF job's SHOT3 need, one cell. A residual in a design sketch is a feature: it is the next calibration question, named.

## 5. The pair fix is now confirmed by Z.ai himself

Z.ai's §1.3 independently confirms Inkling's C PBLK pair finding from his own script: C PBLK 6 alone — fit identical but self-doable **VIOLATED**; C PBLK 6 with NEED C PBLK 6 — fit **identical to the digit**, self-doable OK. Two independent confirmations (Inkling + Z.ai). The council adopts the pair, not the bare cell. Z.ai adds a football refinement: the 9 was conflating two protections — (a) scheme protection (communication, slides, doubles — the center is the best on the line at this) and (b) isolated one-on-one vs a 3-tech or a stunt's free rusher (shorter arms, higher center of gravity, no tackle's recovery tools). A single 0–10 number forces the honest value down to 6–7 because (b) is what gets the team scored on.

## What has not changed

Your two questions to the Owner — whether to go ahead building the merged version, and whether the engine should use the smooth value or the snapped tier — are still the Owner's calls. The Z2 package adds one more open Owner decision (the exit-premium surface, §2.3). Do not assume an answer to any of them; build only what he authorizes.
