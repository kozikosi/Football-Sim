SPEAKER: ernie | ROLE: council | TASK: review of all council work since my last filing (2026-11-14T07:30Z) · DATE: 2026-11-14T07:35Z
FOR: the Owner · the digest

Four seats filed since my audit. **The important result: glyph independently reproduced my W1 and D32R findings to three decimal places, and INKLING's second-seat re-run confirms 104/104 on a different machine. The vendor-digest accounting, however, is now a three-way inconsistency.**

---

## 1 · What landed

| Seat | File | What it is |
|---|---|---|
| **glyph** | `20261114-0725-glyph-prompt-inkling-bench1-run-v1-audit-findings.md` | Full receipt-level audit of BENCH-1 |
| **beam** | `20261114-0645-beam-bench1-verification.md` | Verification of JSON internals + arithmetic |
| **inkling** | `20261114-0724-inkling-tier1-second-seat-rerun.md` | **Independent Tier-1 re-run on a second machine** |
| **inkling** | `20261114-0715-inkling-more-tests-and-pickle-slots.md` | Test pipeline, Pickle slots, errata routing |
| **glyph** | `20261114-0655-glyph-prompt-zai-bench1_5-w89-pick-reveal.md` | A BENCH-1.5 proposal (not work) |

## 2 · My audit is confirmed, not contradicted (VERIFIED)

**glyph independently reproduced both of my numbers, more precisely:**

| Claim | My audit (07:30Z) | glyph (07:25Z) | Agreement |
|---|---|---|---|
| W1 parse+freeze ×3 | 19.81 / 40.13 / 10.38 ms | **19.812 / 40.131 / 10.377 ms** (with parse/freeze split) | **exact** |
| D32R range | 772.4 – 1583.1 ms | **772.36 – 1583.09 ms**, full array `[802.22, 873.69, 807.84, 816.15, 796.18, 1583.09, 1101.23, 826.06, 772.36, 777.76]` | **exact** |
| recordBytes | 187,078 / 187,079 | same | **exact** |

**Two independent seats, same numbers, different methods.** That is the strongest confirmation available in this protocol.

**glyph also found a second D32R outlier I had missed: 1101.23 ms** (I had only flagged 1583.09). So run 1 has **two** tail values, and the "792–873" band omits both.

**And beam does not contradict me** — I checked, because its commit message says "all numbers match JSON receipts". Reading its file: beam verified the **JSON's internal structure and arithmetic** (104/104 gates, G5 600/600, pick-curve p95), and states plainly *"I did not re-run the benchmarks."* **Different scope, no conflict.** Its "all numbers match" means the JSON is self-consistent, not that the report table matches it. Worth recording so nobody reads beam as rebutting the audit.

## 3 · The new finding: the vendor digest is a three-way inconsistency (VERIFIED, three seats)

```
command: grep -rn 'cd298e99\|432a1701' across the delivery
output:  432a1701…  → in ALL FOUR tier1 receipt JSONs (key "digest", files=112)
         cd298e99…  → ONLY in REPORT.md prose (and the START-OF-CHAT update)
         (no receipt contains cd298e99)

inkling's independent re-run (different machine):
         digest 753997bac4…  files=57
```

**Three digests, two file counts (112 vs 57), and the one quoted in the report appears in no receipt at all.**

- **glyph** flagged the doc-vs-receipt contradiction (`cd298e99` vs `432a1701`) and marked it VERIFIED.
- **inkling** reproduced a third value (`753997bac4`, **57 files**) and explicitly declined to litigate it: *"unexplained; not litigated."*
- **My contribution:** `cd298e99` exists **only in prose** — no receipt carries it. So the report's headline engine identity is the one figure in the delivery with no machine-readable source.

**This does not undermine the engine.** inkling notes the *shared workload hashes cross-machine match*, and I verified the two arms' vendored engines are byte-identical (`diff` 0, 57 files). What is inconsistent is the **accounting** of what "vendored" includes — 112 files vs 57 — which is exactly the 57-vs-43 discrepancy I filed earlier as WR-7 in another form.

## 4 · The second-seat re-run that beam asked for — done, and it passes

**inkling rebuilt the vendor layout from a published arm and ran `tier1.mjs` verbatim on Node v26.13.0:**

```
result: exit 0 · "GATE PASS" on every line · gates 104/104 · ok: True · errors: []
```

**That is the independent witness BENCH-1 needed.** Combined with mine and beam's, Tier 1 is now:
- 104/104 ×3 (author, Node 24.22.3)
- **104/104 ×1 (inkling, Node 26.13.0, different machine)**
- JSON structure + G5 verified by beam and me

**Verdict on the Tier-1 claim: verified by two machines.** Any remaining doubt about the arms' inputs, the engine, or the determinism gates is answerable from bytes both lanes carry.

## 5 · beam's one new finding: A3 is unverified

beam found that **`receipts/a3.json` is not in the delivery**, while REPORT.md §5 claims "A3 Node vs Chromium (VERIFIED, receipts/a3.json)". beam correctly downgrades that to **REPORTED**, not VERIFIED. I agree, and I would add: that is the same class of error as the vendor digest — **a claim labelled VERIFIED whose receipt is absent.**

## 6 · Consolidated verdict on BENCH-1 (updated)

| Element | Status |
|---|---|
| Tier 1 gates 104/104 ×3 | **VERIFIED** by author + beam + me; **reproduced by inkling on a second machine** |
| G5 600/0/0 identity | **VERIFIED** by beam and me |
| Engine byte-identical across arms | **VERIFIED** by me (`diff` 0, 57 files) |
| Arm-code parity | **VERIFIED** by me (133 vs 124 LOC) |
| W1 / D32R budget figures | **INCORRECT as published** — glyph and I agree to 3 d.p. |
| ENG-2 / ENG-3 | **no run-receipt entry** (me) — prose only |
| Vendor digest | **three-way inconsistent** (glyph, inkling, me) |
| A3 | **receipt absent** — REPORTED, not VERIFIED (beam) |
| recordBytes | **187,078–187,079**, not a single stable value (glyph, me) |
| Fabrication | **none found by any seat** |

**The delivery's engine work is sound and now doubly witnessed. Its *reporting* layer is where every defect sits: a budget table that understates variance, a vendor digest with three values and no receipt for the one quoted, and one VERIFIED label on a missing receipt.**

## 7 · What I would tell the Owner in one sentence

**BENCH-1's measurements are trustworthy — two machines now agree on 104/104 — but its *summary table* is not: the headroom it reports is overstated, and the engine's own identity is quoted from a number no receipt contains.** Fix the table, name the receipt for every figure, and the delivery is done.

## VERDICT

**Three seats' work reviewed. glyph confirms my audit exactly and adds a second D32R outlier. beam's apparent contradiction is a scope difference, not a disagreement. inkling's second-seat re-run is the witness the wave needed, and it passes. The vendor-digest accounting is the one item that got worse, not better, with more eyes on it.**

Labels: **VERIFIED** — every number, digest and file path above, this machine, 2026-11-14. **REPORTED** — inkling's re-run (their machine, their receipt). **INFERRED** — that "112 vs 57 files" is the same class as the earlier 43-vs-41 tooling gap. **UNKNOWN** — whether Z.ai has a receipt for `cd298e99` outside this delivery; if so, the finding narrows to an accounting difference and I will say so.

*Filed by ERNIE (advisor) · 2026-11-14T07:35Z · no other seat's file modified.*

**PRIORITY+:** review of 4 new filings | P1 | glyph confirms my W1/D32R audit to 3 d.p. + 2nd outlier; beam's "all match" is scope, not rebuttal; inkling's 2nd-machine re-run = 104/104; vendor digest is 3-way inconsistent with no receipt for the quoted value; A3 receipt absent | ERNIE this file.