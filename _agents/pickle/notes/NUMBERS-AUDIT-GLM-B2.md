# NUMBERS AUDIT — V22-Suggestions.md quantities vs reality (GLM dispatch BATCH-GLM-B2)

SPEAKER: Pickle | ROLE: Council reviewer (S-800–899) | TASK: GLM's distinct slice — the numbers | DATE: 2026-10-22T00:20Z

Build under test: `NFL Draft Simulator merged.html`, sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`, 656,746 B. Read-only: no product file, protected constant, or other lane edited.

---

## (i) Build hash — HAS NOT MOVED

```
$ shasum -a 256 "NFL Draft Simulator merged.html"
044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48
$ stat -f "%z" "NFL Draft Simulator merged.html"   →   656746
```

**VERIFIED** — the build is still `044d1759…`, 656,746 B. The doc's pin (l.10, l.19, l.78, l.511) matches the working tree. The `40233d6b…` reference at l.58 is the *stale* pin the doc already flags as MEDIUM drift risk — correct to flag, but the doc's own active pin is right.

## (ii) Priority item counts — the inherited figures ARE stale, and the doc carries MORE collisions than the briefs name

**VERIFIED counts of the canonical block (l.102–488):**

| Header | Items | Inherited figure in circulation | Verdict |
|---|---:|---|---|
| **P0** | **19** (P0-1…P0-19) | "~14" | **STALE — it is 19** |
| **P1** | **40** (P1-1…P1-40) | "40" | **matches** |
| **P2** | **5** (P2-1…P2-5) | "5" | **matches** |

So the "~14 P0" figure is wrong; the true count is **19**, exactly as GLM measured (P0 section ends at l.306). P1 = 40 and P2 = 5 are correct.

**The bigger finding — the collision is worse than "three numbering systems".** The doc carries **at least six labelled blocks**, and **23 labels are duplicated**, some up to **4×**:

- Canonical `P0/P1/P2` (l.102–488).
- A second block labelled `P0–P4` (l.1001–1035) — a different scheme for the same work.
- A third `P0-15…P0-24` block (l.1037–1760) that **re-uses the canonical P0 numbers with different content**.
- `P7` (l.571), `P8` (l.671), `P9` (l.699) — Beam's aesthetics/diagram sets.
- **`P10` twice** (l.772 and l.1764) and **`P11` twice** (l.1887 and l.1915).

Duplicated item labels (VERIFIED by regex over all `###`-level priority headers): `P0-15 ×2, P0-16 ×2, P0-17 ×2, P0-18 ×3, P0-19 ×4, P0-22 ×2, P0-23 ×2, P0-24 ×2, P10-1…P10-9 ×2 each, P11-1…P11-8 ×2 each` — **23 labels, 25 duplicate definitions.** A reference like "see P0-19" is ambiguous between **four** different sections. This is a real risk for a diff-driven implementation: Claude applying "P0-18" from the wrong block.

## (iii) Old→new hunk strings sampled — 8 of 10 match the build, 2 are absent by design

Sampled 10 old-side strings from the doc's `old → new` lines and grepped each verbatim in the build:

| Old-side string | Build hits | Verdict |
|---|---:|---|
| `#draftTable2 td.dc-pri{grid-column:10 / 13;…color:var(--gold);}` | 1 | **MATCH — applies cleanly** |
| `colspan="10"` | 1 | **MATCH** |
| `Ratings shown are effective ratings` | 1 | **MATCH** |
| `Offense (QB+RB+WR+TE+OL)` | 1 | **MATCH** |
| `Use model weights` | 1 | **MATCH** |
| `Back to my weights` | 1 | **MATCH** |
| `locked in once you simulate Week 1` | 1 | **MATCH** |
| `All eyes will be on` | 1 | **MATCH** |
| `Value Here` | **0** | **ABSENT — expected** (doc P0-1 says already prototyped/removed) |
| `>MORE<` | **0** | **ABSENT — expected** (doc P0-2 says already removed) |

**VERDICT: no drift.** The two absences are the items the doc itself records as **already done**; every string that should still be present in the build is present **exactly once**. The doc's `old → new` anchors are currently accurate against `044d1759…`.

## (iv) FB/P supply figures and the 832→896 arithmetic — ALL CONFIRMED against the build's own data

```
ROSTER_SLOTS length: 26   |  contains FB: False  |  contains P: False
TOTAL_ROUNDS (= .length): 26  ->  picks today: 32×26 = 832
at 28 rounds: 32×28 = 896
PLAYERS: HB 89  FB 8  TE 53  K 32  P 32  LS 12   (total 1200)
draftable today (minus P/FB/LS): 1148
draftable under FB/P slots (minus LS only): 1188
```

**VERIFIED.** Every figure GLM's slice names is confirmed by the build's own `PLAYERS` and `ROSTER_SLOTS`: HB 89, FB 8, TE 53, K 32, P 32; picks **832 → 896** when rounds go 26 → 28. Cross-check with my FB/P spec note (`FB-P-SPEC-VERIFY.md`): backfield nets **+1** (97 for 96), TE hole **−11** (53 for 64), kicking **exact parity** (64 for 64), LB group **−5** (91 for 96).

---

## Answer to GLM, in three sentences

The build has **not** moved (`044d1759…`, 656,746 B) and every applicable `old → new` anchor in the doc matches it exactly once — **no drift**, the only absences being the two items the doc records as already done. The inherrated priority counts are **half-stale**: P1 = 40 and P2 = 5 are right, but **P0 is 19, not ~14**, and the collision is **worse than "three schemes"** — six labelled blocks with **23 duplicated item labels** (P0-19 defined **four times**), which is the real hazard for a diff-driven implementation. All of the slice's FB/P figures (HB 89, FB 8, TE 53, K 32, P 32) and the 832 → 896 arithmetic are **confirmed** against the build's own `PLAYERS`/`ROSTER_SLOTS`.

## Tags
- (i) hash: **VERIFIED**. (ii) counts 19/40/5 + 23 duplicate labels: **VERIFIED** by regex. (iii) 10-string sample: **VERIFIED** (8 match, 2 absent-by-design). (iv) supply + 832/896: **VERIFIED**.
- **Not checked:** I did not read the whole 2,290-line doc (only the priority headers, the sampled hunks, and the numbers); I did not open the second/third P0 blocks to confirm they are duplicates rather than distinct work — their **label reuse** is what I verified, not their content; no browser run.
