SPEAKER: ernie | ROLE: council advisor · review | TASK: review VL's pool-gap reconciliation against the engine source | DATE: 2026-11-14T16:48Z
REVIEW-OF: `council/vl:inbox/20261114-1730-vl-zai-byte-review-pool-gap.md`
VERDICT: improved

**The reconciliation is correct and I reproduce every number. Two things need saying that the filing does not, and one of them corrects my own v3 review.**

---

## 1 · The arithmetic and the position table reproduce exactly

```
cwd: /Users/kosi/Desktop/wt/ernie
cmd: for f in madden27-ratings player-ids free-agents-old-ratings; do git show d3bd81d2:data/nfl/$f.csv | wc -l; done
out: 1942 · 1954 · 13        → 1,941 · 1,953 · 12 data rows
cmd: git show d3bd81d2:data/nfl/player-ids.csv | tail -n +2 | awk -F, '{print $3}' | sort | uniq -c | sort -rn
out: WR 212 · CB 201 · DT 199 · TE 139 · HB 126 · LEDG 97 · QB 92 · REDG 89 · FS 84 · SS 83
     MIKE 79 · WILL 78 · RG 71 · LT 71 · LG 69 · C 68 · RT 63 · K 35 · P 33 · LS 32 · SAM 16 · FB 16
     total 1953
cmd: git show d3bd81d2:data/nfl/madden27-ratings.csv | tail -n +2 | awk -F, '$2=="LS"' | wc -l
out: 32
```

1,941 + 12 = 1,953 = `poolCount`. 1,953 − 32 LS = 1,921 = the board. **VL's table matches mine cell for cell, all 22 rows.** The 32-row gap is closed, and it is not a bug.

## 2 · The mechanism is right, and it is in both load paths — not one

VL cites `dataset.ts`: `pool.filter((p) => p.role !== 'LS')`. That line appears **twice**, and both matter:

```
cmd: git show d3bd81d2:colors/src/sports/nfl/app/dataset.ts | grep -n "role !== 'LS'"
out: 46:  const rows: DatasetRow[] = pool.filter((p) => p.role !== 'LS')…   (validateUserCsv — the import path)
     89:  const rows: DatasetRow[] = pool.filter((p) => p.role !== 'LS')…   (createDatasetLoader — the bundled path)
```

**Consequence the filing does not draw:** this is not a display filter. The rows it produces *are* the engine's player pool, so the draft board, the pick analysis and the library all operate on 1,921. The draft's 1,024 picks are drawn from 1,921, not 1,953. Anyone reconciling draft-pick counts against "1,953 players" will be out by the same 32.

## 3 · One precision the filing needs — the filter is on the flex-guide **role**, not the position

`p.role` is `ROLE[pos]`, not `pos`:

```
cmd: git show d3bd81d2:colors/src/sports/nfl/engine/players.ts | sed -n '12,16p'
out: QB:'QB', HB:'RB', FB:'FB', WR:'WR', TE:'TE', LT:'OT', RT:'OT', LG:'OG', RG:'OG', C:'C',
     DT:'DT', LEDG:'EDGE', REDG:'EDGE', MIKE:'ILB', WILL:'OLB', SAM:'OLB', CB:'CB', SS:'SS', FS:'FS',
     K:'K', P:'P', LS:'LS'
```

The filter works only because `ROLE` carries an `LS` entry. That has a sharp edge worth recording: `parseCsv` **throws** on an unmapped position (`unknown position ${pos}`), so if anyone deletes the 32 LS rows from `madden27-ratings.csv` without also removing `LS` from `ROLE`, the pool does not shrink to 1,921 — **the build fails**. The exclusion is load-time and role-keyed; it is not a property of the data.

## 4 · Correction to my own v3 review — the pool is one row per player

My v3 review (`inbox/20261114-0946-ernie-REVIEW-zai-open-wave-v3.md` §6) recommended the wording *"rows, not players; the pool is one row per player per eligible slot."* **That is wrong and I withdraw it.** `buildPool` enforces uniqueness on both the identity key and the pid:

```
cmd: git show d3bd81d2:colors/src/sports/nfl/engine/players.ts | sed -n '28,40p'
out: if (keys.has(p.id)) throw new Error('duplicate player ' + p.id);      // id = name|pos|team
     …
     if (pids.has(pid)) throw new Error('duplicate pid ' + pid);
```

There is no per-slot expansion anywhere in the pool: **each row is one player, so 1,921 rows = 1,921 distinct players** (long snappers excluded). The correct one-liner for the report is: *"the pool is 1,953 players including 32 long snappers; the draftable board is the 1,921 that remain."* VL's "rows, not players" was the right instinct and I muddied it.

## 5 · The stale number this exposes

`AGENTS.md` §7 still records the dataset as "the 1,200-player set" replaced by "the new Madden ratings (28 Oct)". The live files are 1,941 + 12 = 1,953. The doc is stale by 753 rows, and the pool ledger Claude has to write will inherit whichever number it reads first. Worth a line to MUSE; I am not editing governance docs.

---

Labels: **VERIFIED** — every line count, the 22-row position table, the 32 LS count, both `filter` sites, the `ROLE` map, the duplicate guards, the `AGENTS.md` §7 text. **REPORTED** — that the engine's draft consumes `DatasetRow[]` (I read the type and both load paths, not the draft call site). **INFERRED** — that a missing `LS` entry in `ROLE` throws rather than silently passing (the `throw` is explicit in `parseCsv`). **UNKNOWN** — nothing material to the pool question.

— ernie (advisor) · 2026-11-14T16:48Z · read-only.