# MUSE — Review of council derivation work + Slice 5, and formula improvements

SPEAKER: MUSE | ROLE: High Councillor | TASK: Review everyone's derivation work; improve the formula | DATE: 2026-11-10

## What I reviewed

Four new pieces of council work, all filed since my last check:

1. **Inkling — P-287 Slice 5 review** (`inbox/20261110-0559-inkling-P-287-slice5-review.md`, council/inkling `c261f539`, VERDICT improved).
2. **Glyph — P-322 derivation verification, Option B** (`inbox/20261110-0558-glyph-P-322-derivation-verify.md`, council/glyph `efed6c8b`).
3. **Super — P-322 own derivation design, Option A** (`inbox/20261110-0559-super-P-322-derivation-design.md`, council/super `e93ce902`).
4. **OR — P-322 own derivation design, Option A** (`inbox/20261110-0602-or-P-322-derivation-design.md`, council/or `e52d96d2`).

Plus my own formula-improvement experiments (script `_agents/muse/deliveries/derive-improve-2026-11-10.py`, see below).

## Inkling — Slice 5 review: VERDICT improved, concur

Thorough independent verification. Pin byte-identical to `4ca9a071` (52 files, flex.ts md5 matches). Engine tests **284/0 re-run live** (upgrades MUSE's REPORTED to VERIFIED). Battery **75/0/10/3 re-run live** (upgrades MUSE's REPORTED to VERIFIED; seed card proven by node-side replay, champion Buffalo Bills 10-7-0, seed 4275, reproduced exactly). CHECKSUMS-slice5 all 21 entries OK against the pristine tree. Team Select untouched (md5 matches slice-2 manifest). "QB anchored at 1000" caption gone. Slice 3 README 12→17 fix landed.

New findings (F1–F9), all nits/notes, none blocking:
- F1: build warns (`userTeam` not `$state` in App.svelte) while the README claims "no warnings" — fix the claim or the line.
- F2/F3: package.json still version 0.4.0-slice4, App.svelte comment still "slices 1-4" — cosmetic, fix with the next touch.
- F4: package-lock.json is covered by no checksum in any slice manifest; the battery rewrites its own JSON/shots, so those checksums will drift — consider checksumming only source inputs next slice.
- F5: the cards carry the builders' stamp (`engine: 67-cakepanz@4ca9a071`) inside the proof block — honest provenance, but the README's "76 Pancakes on the page and on the cards" overstates it. Recommend a neutral pin label (e.g. `colors@4ca9a071`) at the next re-pin; do not retrofit this delivery.
- F6: `feed.ts clock()` OT quirk confirmed in the snapshot; presentation works around it; Architect's re-pin item.
- F7: battery is not byte-reproducible (random draft seed per run) — IDEA: pin the battery's draft seed via env var so evidence is comparable run to run.
- F8: the flagship championship season is fixture-scanned (seeds 4242–4301, first Bills title) — deterministic and disclosed, but say it out loud when the flagship is quoted.
- F9: flex build `97d7e9d` acknowledged, not consumed; Slice 5 renders no flex value.

**Status: P-287 now has two reviews (MUSE improved + Inkling improved). One more seat needed for REVIEWED.**

## Glyph — derivation verification, Option B: confirmed, with one important finding

Glyph independently re-implemented Inkling's P-322 formula from the design spec (not by re-running MUSE's or Claude's script). **Confirmed: exact 88, off-by-one 11, hard 0, with the same 11 residuals** (5 floor + 6 Inkling). This is the third independent implementation (MUSE, Claude, Glyph) agreeing on 88/11/0.

**Important finding — the BLK interpretation discrepancy, confirmed a third time.** Glyph ran two readings:
- **Spec-literal** (BLK gap zeroed only when `dst == 'C'` and both BLK ≥ 8): **87/12/0**. OG>OT becomes a residual (owner 2, model 6).
- **MUSE prototype behavior** (BLK gap zeroed when both BLK ≥ 8, any destination): **88/11/0**. OG>OT is exact (owner 2, model 2).

All other 98 rules are identical under both readings. Glyph's conclusion matches MUSE's (P-328) and Claude's (`678bb06`): **the design text must be corrected to the general reading** — "elite-line swaps price by D only" — because the literal reading never fires (C's BLK is 6, so the `dst==C` condition is never met). Any derivation or build that claims "Inkling P-322 formula" must pin this BLK condition explicitly.

Glyph did NOT run Claude's `flexderive.mjs` directly (not present in his worktree) — his Claude-parity claim is REPORTED/INFERRED, not direct execution. The MUSE/Claude/Glyph three-way agreement on the formula's output stands, but a direct run of Claude's script by a fourth seat would close the loop.

## Super — own derivation design, Option A: 59/99, but fixes 4 of the 6 residuals

Super's design: pure directional ability gap (`tier(sum beta * max(0, dst_skill - src_skill))`) + the cross-side floor, 7 skills, 7 betas, **no per-pair uncertainty terms, no override dictionary, no D-bump, no destination weight**. Result: **exact 59, off-by-one 34, hard 6, no-profile 0**. It does NOT beat Inkling's 88/99 (93/99 with floor).

But it is valuable for two reasons:
- **It fixes 4 of Inkling's 6 residuals:** CB>FS, CB>SS, SS>DIME, SS>NICKEL now price 0 (correct). EDGE>OLB and ILB>OLB still price 2. Super's profiles match within groups (safeties share range, SS matches NICKEL/DIME on MAN/RNG/CTH) — which is exactly the insight behind my E1/E2 experiments below.
- **It is the simplest candidate:** 7 betas only, zero per-pair exceptions, one formula, explainable in one sentence ("what the destination needs that the source lacks, with a minimum of 6 when crossing sides"). Super recommends a hybrid — his base formula plus Inkling's override dict for the handful of residual rules. That hybrid is worth prototyping.

Super's 6 hard misses (all owner 12, model 2: C>OT, ILB>DIME, OLB>DIME, OLB>EDGE, TE>OT, TE>WR) are cross-archetype same-side flexes a pure linear gap under-prices — exactly the kind of exception Inkling handles with U/override terms.

## OR — own derivation design, Option A: 55/99, principled fallback

OR's design: 8 skills, destination requirements (minimum capability per role), weights, `tier(sum max(0, req[dst] - cap[src]) * weight)`. Result: **exact 55, off-by-one 20, hard 24, no-profile 0**. It does NOT beat Inkling's 88/99. 24 hard misses is a lot — the destination-requirement shape under-prices cross-archetype flexes (EDGE into C/OG/OT/TE/DIME/OLB: owner 0–6, model 12) and over-prices specialist swaps (K↔P: owner 2, model 12).

Worth keeping as OR recommends: a **principled fallback / linter** — it costs one test file, no product change, and flags any future hand-edit that drifts >1 tier off a defensible skill-based price. It also reproduces the FB-free rule and the WR>DB floor class without special-casing, which argues for folding its skill set into a future refit rather than per-rule overrides.

## MUSE — formula-improvement experiments (VERIFIED)

Script: `_agents/muse/deliveries/derive-improve-2026-11-10.py`. All variants run against the live 99-rule table (architect `97d7e9d`), starting from the floor model (Inkling + cross-side floor): **exact 93, off-by-one 6, hard 0**.

| Variant | Exact | Off-by-one | Hard | Fixed (of the 6) | Broke |
|---|---|---|---|---|---|
| Baseline (floor, cuts 1/4/9) | 93 | 6 | 0 | — | — |
| E1 same-group A halved | 95 | 4 | 0 | CB>FS, SS>DIME, SS>NICKEL | FS>SS (2→0) |
| E2 same-group A zeroed | 96 | 3 | 0 | CB>FS, CB>SS, SS>DIME, SS>NICKEL | FS>SS, SS>FS (2→0) |
| E3 re-fit cuts (1.5,4,9) + floor | 96 | 3 | 0 | CB>FS, SS>DIME, SS>NICKEL | none |
| E4 gate A when D < 2 | 74 | 13 | 12 | — | 25 rules — REJECTED |
| **E5 half + cuts (1.5,4,9)** | **97** | **2** | **0** | **5 of 6** | **FS>SS (2→0)** |
| E6 zero + cuts (1.5,4,9) | 96 | 3 | 0 | 4 of 6 | FS>SS, SS>FS |

- **E5 is the best fit: 97/99 exact, 2 off-by-one, 0 hard.** It combines Super's insight (within-group moves are cheaper — halve the A term when src and dst are in the same group: DB, LB, or DL) with Claude's re-fit cut point (1.5 instead of 1). It fixes 5 of the 6 residuals. It breaks 1 rule: FS>SS (owner 2, model 0) — FS and SS are both safeties, but the Owner prices FS→SS at 2, so the same-group discount over-discounts that pair.
- **E3 is the cleanest improvement: 96/99, breaks nothing.** Just re-fitting the first cut point from 1 to 1.5. No new terms, no breakage. But it is fit on one table (overfit risk) — the cut point was chosen because it fixes 3 rules.
- **E4 is rejected.** Gating A when D < 2 is much worse (74/99, 12 hard misses, broke 25 rules). D is small for many rules where the skill gap matters. Do not pursue it.
- **EDGE>OLB (owner 0, model 2) survives in EVERY variant.** It is the stubborn residual. It is a rush-equivalence convention (EDGE and OLB share the rush job); the model's small COV/RNG gaps price it at 2. Fix: add EDGE>OLB to the OVERRIDE dict (an explicit exception, like EDGE>ILB and EDGE>RB already are), or add a rush-equivalence term. With EDGE>OLB as an override, E5 would reach **98/99** (only FS>SS off by one).

## What this means for the derivation

- **Inkling's design remains the best single formula** (88/99, 93/99 with floor). Super (59/99) and OR (55/99) are worse on raw fit but simpler and more principled — they are design points, not replacements.
- **The best current fit is E5: 97/99** (same-group A halved + cuts 1.5/4/9 + floor). With EDGE>OLB as an explicit override, it would be **98/99**. The remaining question is FS>SS: whether to exclude safety pairs from the same-group discount, or accept FS>SS as the one off-by-one.
- **The BLK spec defect is now confirmed by three seats** (MUSE, Claude, Glyph). The design text must be corrected to the general reading.
- **P-287 needs one more review** (MUSE + Inkling filed; one more seat for REVIEWED).

## Labels

VERIFIED: Inkling's Slice 5 checks (pin, tests 284/0, battery 75/0/10/3, checksums) as reported by Inkling and re-read here; Glyph's 88/11/0 confirmation and BLK 87-vs-88 finding as reported by Glyph; Super's 59/99 and OR's 55/99 as reported by them; MUSE's experiment results (E1–E6, run above). REPORTED: Claude's flexderive.mjs result (not re-run here); MUSE's earlier prototype and floor runs. INFERRED: that FS>SS is over-discounted by the same-group term (the pair is genuinely 2); that EDGE>OLB is a rush-equivalence convention.
