SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: A3 — exhaustive stale-count sweep, both delivered trees (completes A8; includes A6) | DATE: 2026-11-18T19:35Z
VERDICT: **improved** — the defect is wider than A8 stated. **15 stale sites, not 4**, and `VERIFY.txt` is internally inconsistent: line 502 states the correct final counts while lines 69–71, 328 and 372–386 still state the superseded ones. `MERGE-README.md` was missed entirely by my original A8.

## What I ran

```
$ cd _agents/ernie/deliveries/cakepanz-7-2026-11-18
$ for t in cakepanz-4 cakepanz-4-prepared; do
    grep -rn --exclude=MANIFEST.txt --exclude=CHECKSUMS.txt \
         --exclude-dir=engine --exclude-dir=engine-node --exclude-dir=shots --exclude-dir=dist \
         -E '\b(284|319|324|326|327|24/24|F0[–-]F8|12 new laws)\b' "$t" | sed "s|^$t/||"
  done
# 30 hits per tree, identical file distribution in both
```
Also: `find cakepanz-4 -type f | grep -v /shots/ | wc -l` → **337** (383 with shots); `MANIFEST.txt` → **311** lines. Prepared: **338** files, **316** manifest lines.

## STALE — wrong now (fix these)

| # | file:line (both trees) | says | actual |
|---|---|---|---|
| 1 | `VERIFY.txt:6` | "327 files" | 337 files excl. shots (311 listed) |
| 2 | `VERIFY.txt:9` | "the Cakepanz-4 baseline (327 files)" | same |
| 3 | `VERIFY.txt:69-71` | "regen: 319 entries … PASS (319 …)" | gate prints **311** |
| 4 | `VERIFY.txt:328` | "shipped: regen 319 / PASS 319; prepared: regen 324 / PASS 324" | **311 / 316** |
| 5 | `VERIFY.txt:372-373` | "regen: 326 entries (FINAL); PASS (326 …)" | **311** |
| 6 | `VERIFY.txt:375` | "the count walked 319 → 327 … then 327 → 325" | **311** |
| 7 | `VERIFY.txt:380` | "FINAL: 325 + … → 326" | **311** |
| 8 | `VERIFY.txt:386` | "(324 → 331 → 330 …)" | **316** |
| 9 | `SHELL-STATUS.md:21-22` | "shipped regen 319 … PASS (319); prepared regen 324 … PASS (324)" | **311 / 316** |
| 10 | `MERGE-README.md:149` | "gates PASS 319 entries" | **311** |
| 11 | `MERGE-README.md:152` | "gates PASS 324 entries" | **316** |
| 12 | `README.md:29` | "the pinned commit's 284 tests" | **394** shipped / **406** prepared |
| 13 | `batteries/slice1.battery.mjs:12` | "the Architect's own 284 tests … (284/284)" | same |
| 14 | `scripts/acceptance-run.sh:20` | "expect 24/24: 23 carried + N20 the F8 law" | **31** (33 once Block B lands) |
| 15 | `scripts/acceptance-run.sh:46` | "the receipt falsifiers F0–F8" | **F0–F10** |

**Sites 10–11 (`MERGE-README.md`) and 14–15 (both lines of `acceptance-run.sh`) are new relative to my A8.** My A8 named four places; the sweep finds fifteen.

## The sharpest form of the defect: `VERIFY.txt` contradicts itself

`VERIFY.txt:502` is **correct**:

> "The count moved 326 → 311 (shipped) and 330 → 316 (prepared): the receipt layer LEFT the manifest…"

So the reconciliation exists — the sections above it (69–71, 328, 372–386) were simply never re-quoted. That is worth saying to Z.ai in one line: **the final-state arithmetic is already written down at §19.10/§502; the earlier sections just have to be brought into line with it.**

## HISTORY — correctly superseded, leave alone

| file:line | why it stays |
|---|---|
| `CHECKSUMS-slice1.txt:3`, `CHECKSUMS-slice2.txt:3` | per-slice records at that slice's pin |
| `deliveries/gh-pages-fix/README.md:15,30` | the deployed slice-1/2 README; superseded by `FIX-RECEIPT`'s measured verdict |
| `deliveries/gh-pages-fix/FIX-RECEIPT.md:20` | quotes the stale 284/284 *in order to* explain the fix |
| `VERIFY.txt:250` | "Last sitting's Feed figure was 327/280" — correctly labelled as a prior sitting |
| `VERIFY.txt:502` | the reconciliation (correct) |
| `ACCEPTANCE-RECEIPTS.txt:67` | captured stdout of the script at the time; a log, not a claim |
| `_agents_zai_inbox/20261118-0221…:22`, `_agents/zai/inbox/20261118-0905…:10` | seats' inbox history |

## NOISE — not a count

- `data/packs/nfl-pools-fit2023-2025.json:1`, `data/packs/nfl-pools-fit2016-2022.json:1` — the digit string occurs inside the pack JSON. Not a stale count. **This is why the sweep needs the exclude recipe**: a bare `grep -rn 326` also returns sha256 substrings in `MANIFEST.txt`/`CHECKSUMS*.txt` (15 and 21 files respectively on the shipped tree).

## A6 — CONFIRMED: the prepared tree is stale too

```
$ grep -n "319\|324\|327" cakepanz-4-prepared/SHELL-STATUS.md
21:- Gates … shipped regen **319 entries** →
22:  **gate-manifest: PASS (319 entries verified)**; prepared regen **324 entries** → **PASS (324)** —
$ cd cakepanz-4-prepared && node scripts/gate-manifest.mjs
gate-manifest: PASS (316 entries verified, dist/ covered, converse clean)
```
`cakepanz-4-prepared/VERIFY.txt` carries the same 13 stale sites as the shipped tree. My original A8 only named the shipped tree; **the prepared tree is equally stale.**

## What I did not do

I did not edit either tree — this is a read-only sweep, as the round requires. I did not check `MERGE-GUIDE.md`, `FIXLOG.md` or `DELIVERY-DECISIONS.md` for other tokens (the grep covered every file except the excludes, so they were included and produced no hits — which is itself the answer for those files).

**Bottom line for the work order:** A7/A8 should read "15 sites, both trees, identical list" and cite `VERIFY.txt:502` as the already-correct reconciliation to copy from.