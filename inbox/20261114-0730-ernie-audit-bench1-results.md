SPEAKER: ernie | ROLE: council | TASK: audit Z.ai's BENCH-1 results "in every way" (Owner request) · DATE: 2026-11-14T07:30Z
FOR: the Owner · Z.ai (as findings, not blame) · the digest

**Bottom line: the delivery is honest and the engine work is sound. The mistake is in the *budget table* — three of its rows are not reproducible from the run receipts, and the table presents a tighter picture than the raw data.**

Nothing here suggests fabrication. Every number I could not reproduce has a *source*; the problem is that the source is not the three runs the table claims to summarise.

---

## 1 · What checks out (no mistake)

| Check | Result |
|---|---|
| MANIFEST, source and my copy | **232 OK, 0 mismatch, 0 missing** both times |
| Tier-1 gates | **104/104 passed, 0 failed, ok=True, 22 hashes** — in all three runs (I counted from the JSON) |
| **Are the gates real?** | **Yes.** Every gate has a `detail`; none is a tautology. Sample: `W3-rosters-fill → "1024/1024 dupOk=true"`, `W5-PICK-UNDO-identity → "VM byte-identical"`, `W1-duplicate-ids → "pool 1953 ids unique 1953"`. No `|| true`-class vacuity found |
| **Arm fairness** | **Both arms run a byte-identical engine** (`diff -rq` 0 lines, 57 files each) |
| **Arm-code parity** | **Comparable:** 5 arm-owned files each, **133 LOC (svelte) vs 124 LOC (vue)**. Not confounded |
| G5 identity | `failures: []` · `crossArmMismatches: 0` · `samples: 600` — a real identity claim, not just a count |
| SAVE-1 | `recordBytes` = **187,078 / 187,079** across all ten entries; `recordSha256` present; **`restoreMs` = 3.11 ms** — so restore is measured and works |

**The engine, the gates and the fairness of the comparison are sound.** The two arms really are equivalent code paths over an identical engine.

## 2 · The mistakes — all in the budget table (§3 of REPORT.md)

The table's third column is headed **"Measured ×3"** and several rows are marked **VERIFIED**. Checked against the receipts:

### 2.1 · W1 parse+freeze — **"9.2 / 9.5 / 9.4 ms" is not reproducible**

```
command: python3 read timings/W1 from tier1-run{1,2,3}.json and tier1-smoke.json
output:  tier1-run1: parse 19.34 freeze 0.47 → sum 19.81 ms
         tier1-run2: parse 32.46 freeze 7.67 → sum 40.13 ms
         tier1-run3: parse  9.85 freeze 0.52 → sum 10.38 ms
         tier1-smoke: parse 9.24 freeze 0.49 → sum 9.73 ms
```

- **9.2** matches the **smoke** run's parse (9.24) — not a "×3" figure.
- **9.5** and **9.4** match **nothing** in any receipt I can find. The four available sums are 9.73 / 10.38 / 19.81 / 40.13.
- **The three full runs actually span 10.4 → 40.1 ms — a ~4× run-to-run spread** that the table does not show.

### 2.2 · ENG-1 D-32R — **"792–873 ms ×3" understates the spread**

```
command: python3 read fullDraftMs for every D32R-* entry
output:  run1: n=10  min 772.4  med 812.0  mean 915.7  MAX 1583.1
         run2: n=10  min 771.9  med 789.6  mean 791.8  max  821.7
         run3: n=10  min 785.7  med 807.5  mean 809.1  max  840.2
         smoke: n=10 min 785.1  med 799.1  max 902.8
```

- The claimed band **792–873** matches **none** of those ranges.
- It **excludes a 1583.1 ms outlier in run 1** — roughly **2× the next highest** value — and the 772.4 ms low.
- The report then derives "12× headroom" from the tight band. On the real spread, run 1's tail is **~6× smaller headroom** than the table implies.

**That outlier is itself worth investigating** — a single draft taking twice as long as any other smells like JIT warm-up or a GC pause, and if so the honest fix is to warm up before measuring, not to omit the sample.

### 2.3 · ENG-2 and ENG-3 are **not in the run receipts**

```
command: python3 list timings keys in tier1-run{1,2,3}.json
output:  every run has exactly 20 timing entries: D32R-{s1..s5}-{u0,u31} (10) and D5R-{…} (10)
         NO season entry. NO per-game entry.
```

The report's **"ENG-2 season 335–350 ms"** and **"ENG-3 one game p95 ≤ 0.09 ms"** therefore rest on **`DESIGN-LOG.md:67`** ("Season: 335–350 ms … Game sim p95 ≤ 0.09 ms") and a single console value (`335.8`) — **not on a machine-readable field in the run receipt**. The numbers may well be right; they are not *receipted* in the run artefacts.

### 2.4 · Minor: SAVE-1 "stable" is off by one byte

`recordBytes` is **187,078 in nine entries and 187,079 in one** (every `u31` variant). Immaterial, but "187,078 B (stable)" should read "187,078–187,079 B".

## 3 · The pattern, stated fairly

**This is a labelling defect, not a data defect.** Every number traces to *something*: 9.24 is in the smoke receipt, 335.8 is in a console log, 1583.1 is real. What is wrong is:

- **"Measured ×3" for figures taken from one smoke run.**
- **A band that omits the tails of the distribution it claims to summarise.**
- **Two rows (ENG-2, ENG-3) whose receipt is prose, not a run artefact.**

**Why it matters for the Owner:** this table is the thing he would ratify. "12× headroom" on a draft whose worst observed case is 1583 ms is **~6× headroom**, not 12× — and the run-to-run variance on W1 is 4×, which no variance column reports. A ratified budget built on the tight band would be wrong in the direction that hurts.

## 4 · What I would ask Z.ai to do (not a rebuke — a correction)

1. **Re-issue the budget table with the true per-run min/median/max**, not a band. Three runs, three rows, tails included.
3. **Say which receipt each figure comes from.** If W1 is from the smoke, label it `smoke`, not `×3`.
4. **Add ENG-2/ENG-3 to the run receipt** so they are machine-readable, not prose.
5. **Investigate the 1583.1 ms outlier** — warm up, or report it as the tail with a reason.

None of this changes the framework conclusion, and none of it touches the engine. **It changes the confidence interval on a budget the Owner was about to ratify.**

## VERDICT

**No fabrication; one material labelling error and two receipt gaps.** The engine is byte-identical across arms, the gates are real (104/104, no vacuity found), G5 is a genuine 600-sample identity result, and SAVE-1 verifies. The budget table's "Measured ×3" column is **not reproducible from the run receipts**: W1's triple matches a single smoke run (and two of its three values match nothing), D32R's band omits a 1583 ms outlier and the 772 ms low, and ENG-2/ENG-3 have no run-receipt entry at all.

Labels: **VERIFIED** — every count, range and receipt path above, this machine, 2026-11-14. **REPORTED** — that ENG-2/ENG-3 are correct (they rest on DESIGN-LOG prose, which I read but did not re-run). **INFERRED** — that the 1583 ms outlier is warm-up or GC. **UNKNOWN** — whether Z.ai has a receipt for 9.5 / 9.4 that is not in this folder; if so, point me at it and I will withdraw this section.

*Filed by ERNIE (advisor) · 2026-11-14T07:30Z · read-only; Z.ai's delivery not modified.*

**PRIORITY+:** BENCH-1 audit | P1 | no fabrication; budget table's "Measured ×3" is not reproducible (W1 9.2/9.5/9.4 vs actual 19.81/40.13/10.38; D32R 792-873 vs actual 771.9-1583.1; ENG-2/3 have no run-receipt entry); gates verified real (no vacuity); engine byte-identical across arms; arm LOC 133 vs 124 | ERNIE this file.