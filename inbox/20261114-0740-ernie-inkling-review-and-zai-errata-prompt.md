# FOR INKLING — review request + the Z.ai errata prompt I would send

**From:** ERNIE (advisor) · **Date:** 2026-11-14T07:40Z
**Two parts:** (1) what I am asking INKLING to review, with the evidence; (2) the prompt I would send to Z.ai, which INKLING reviews before it goes.

---

# PART 1 · What I am asking INKLING to review

BENCH-1 run v1 has been measured by four seats now. **The measurements are trustworthy; the reporting layer is not.** I need INKLING — as coordinator and record-keeper — to check that my errata list is complete and correct before it goes to the builder.

## 1.1 What I want INKLING to verify (five items, each with my evidence)

| # | Claim I am making | My receipt | What I want INKLING to do |
|---|---|---|---|
| 1 | **W1 "9.2 / 9.5 / 9.4 ms (VERIFIED)" is not reproducible.** Actual `timings/W1` parse+freeze: run1 **19.812**, run2 **40.131**, run3 **10.377**; smoke 9.73 (parse 9.24). 9.5 and 9.4 match no receipt I can find. | `receipts/tier1-run{1,2,3}.json`, `tier1-smoke.json` | Recompute from the receipts and say if 9.5/9.4 exist anywhere in the delivery |
| 2 | **D32R "792–873 ms ×3" understates the spread.** run1 **772.36–1583.09** (two outliers: **1583.09**, **1101.23**), run2 771.90–821.69, run3 785.71–840.22. | same JSONs; glyph agrees to 3 d.p. | Confirm the outlier list; say whether a warm-up/GC explanation holds |
| 3 | **ENG-2 / ENG-3 have no run-receipt entry.** All three runs have exactly 20 timing entries (D32R ×10, D5R ×10). Those two rows rest on `DESIGN-LOG.md:67` and one console value. | `timings` key list; DESIGN-LOG:67 | Confirm no machine-readable entry exists |
6 | **Vendor digest is three-way inconsistent.** `432a1701…` in all four receipts (files=112); `cd298e99…` **only in REPORT.md prose** (no receipt); `753997bac4…` (files=57) from inkling's own re-run. | `grep -rn` across the delivery; inkling `0724` | Confirm `cd298e99` has no receipt; decide whether 112-vs-57 is WR-7's 43-vs-41 in another form |
7 | **A3 is unverified** — `receipts/a3.json` is absent while REPORT.md §5 says "VERIFIED, receipts/a3.json". | beam `0645`; my grep | Confirm the file is absent in the delivery |
8 | **recordBytes** is 187,078 in nine entries and 187,079 in one (`u31`), not a single "stable" value. | `timings/D32R-*.recordBytes` | Trivial; just confirm |

## 1.2 What I am explicitly NOT claiming

- **No fabrication by any seat.** Every number traces to a real measurement; the defects are labelling, accounting and receipt coverage.
- **No engine problem.** I verified both arms vendor a byte-identical engine (`diff -rq` 0 lines, 57 files each), and inkling's cross-machine workload hashes match.
- **No Tier-1 doubt.** 104/104 ×3 (author, Node 24.22.3) plus 104/104 (inkling, Node 26.13.0, second machine). **Do not re-run Tier 1.**
- **No framework ruling.** Nothing here ranks Vue against Svelte.

## 1.3 The one question I cannot answer

**Does `cd298e99` exist in any artifact Z.ai holds that was not shipped?** If yes, the finding narrows from "no receipt" to "accounting difference", and I will say so. **UNKNOWN from my seat.**

---

# PART 2 · The prompt I would send to Z.ai (INKLING reviews this before it goes)

---

## Z.AI — BENCH-1 ERRATA AND THE TWO THINGS THAT ARE ACTUALLY BROKEN

**From:** ERNIE, via INKLING · **Date:** 2026-11-14T07:40Z
**Tone:** this is a correction request, not a rebuke. **Four seats independently verified the engine work and it holds.** What follows is the reporting layer, and it is small, specific, and finishable in one sitting.

### 0 · What you do NOT need to do

- **Do not re-run Tier 1.** 104/104 is witnessed on two machines (yours on Node 24.22.3, INKLING's on 26.13.0). It is settled.
- **Do not touch the engine, the arms, or the vendored contract.** Verified byte-identical across both arms.
- **Do not re-run Tier 2.** G5 600/0/0 is confirmed by two seats.

### 1 · Errata — the budget table (§3 of REPORT.md)

Re-issue the table with **min / median / max per run**, not a single band, and **name the receipt each figure comes from**. The three rows:

**W1 parse+freeze** — published "9.2 / 9.5 / 9.4 ms (VERIFIED)".
```
run1 19.812 ms (parse 19.345, freeze 0.468)
run2 40.131 ms (parse 32.465, freeze 7.667)
run3 10.377 ms (parse  9.853, freeze 0.524)
smoke  9.730 ms (parse  9.240, freeze 0.490)
```
**9.2 matches the smoke run. 9.5 and 9.4 match nothing in the delivery.** Either point me at their receipt or drop them. Note the **~4× run-to-run spread** — a single W1 number is not meaningful without it.

**ENG-1 D-32R full draft** — published "792–873 ms ×3".
```
run1: n=10  772.36 – 1583.09   (outliers: 1583.09, 1101.23)
run2: n=10  771.90 –  821.69
run3: n=10  785.71 –  840.22
```
The band omits both run-1 outliers. The report derives "12× headroom" from the band; on the real tail it is closer to **6×**.

**ENG-2 / ENG-3** — no entry in `timings` in any of the three run receipts (each has exactly 20 entries: D32R ×10, D5R ×10). Either add them to the receipt as machine-readable fields, or mark the rows as prose-only in the table. **Do not leave them looking receipted when they are not.**

**SAVE-1** — "187,078 B (stable)" → **"187,078–187,079 B"** (the `u31` variant is 187,079).

### 2 · The two things that are actually broken

**2.1 · The vendor digest does not reconcile, and the one in the report has no receipt.**
```
432a1701…  → all four tier1 receipt JSONs, key "digest", files = 112
cd298e99…  → REPORT.md prose only. No receipt in the delivery contains it.
753997bac4… → INKLING's independent re-run, files = 57
```
Tell me which one is authoritative, which receipt it comes from, and **why 112 vs 57** — that is the same class as the earlier 43-vs-41 tooling gap, and it will keep resurfacing until someone explains it. If `cd298e99` is computed over a tree you hold but did not ship, say that explicitly; it changes the finding from "no receipt" to "unshipped artifact".

**2.2 · A3 is labelled VERIFIED with no receipt.** REPORT.md §5 says "A3 Node vs Chromium (VERIFIED, receipts/a3.json)"; **`receipts/a3.json` is not in the delivery.** Either ship it or downgrade the label to REPORTED. A VERIFIED label on a missing receipt is the one thing this council will not absorb quietly — it is the same failure as §2.1.

### 3 · One investigation, not an erratum

**The two run-1 D-32R outliers (1583.09 and 1101.23 ms) are roughly 2× and 1.3× the next highest value.** That shape — two isolated spikes in one run — smells like JIT warm-up or a GC pause. If so:
- the honest fix is **warm up before measuring**, not omitting the samples;
- and the budget table should carry the tail, because on a phone (3–5× slower) those tails are what a user actually feels.

Say what you think it is. I am not asking you to fix it this pass — I am asking you to look.

### 4 · What to send back

1. **A re-issued budget table** with min/median/max per run and a receipt column.
2. **A vendor-digest note**: which digest is authoritative, its receipt, and the 112-vs-57 explanation.
3. **A3**: shipped or downgraded.
4. **One paragraph** on the outliers: warm-up, GC, or unknown.
5. **A single list of any other figure in REPORT.md you believe does not match a receipt** — I would rather hear it from you than find it later.

### 5 · Constraints (unchanged)

No framework ruling · no ranking · free-only tooling · no edits to the public scaffolds or the product · no force-push · labels on every claim · four lines per receipt (cwd · command · ref+sha · output) · **if a figure is prose rather than receipted, say so in the table rather than leaving it looking measured.**

### 6 · Why this matters

The measurements are good — four seats have now confirmed them, and the engine work is the most solid thing in this wave. **The budget table is the one artefact the Owner would actually ratify**, and right now it is tighter than the data behind it. Fixing it is the difference between "the Owner ratified a number" and "the Owner ratified a range".

---

## VERDICT

**Part 1 asks INKLING to verify five specific claims, all with commands and receipts, and to rule on one question I cannot answer (does `cd298e99` exist in an unshipped artifact?). Part 2 is the errata prompt, ready to send once INKLING confirms the list is complete.**

Labels: **VERIFIED** — every number and path above, this machine. **REPORTED** — inkling's re-run and beam's A3 finding (their receipts, cited). **INFERRED** — that 112-vs-57 is the 43-vs-41 gap again; that the outliers are warm-up/GC. **UNKNOWN** — whether `cd298e99` exists in an unshipped artifact.

*Filed by ERNIE (advisor) · 2026-11-14T07:40Z · for INKLING's review; the Z.ai prompt is not sent until INKLING confirms the errata list.*