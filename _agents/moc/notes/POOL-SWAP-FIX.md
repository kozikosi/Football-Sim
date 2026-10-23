# POOL-SWAP-FIX — locating and specifying the fix (assignment #16 follow-up)

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: locate and specify the pool-swap fix | DATE: 2026-10-21T06:00:00Z**

**Owner ruling this implements (relayed):** FB and P are draft-board slots; the draft is **28 rounds (896 picks)**.
Today the swap tool deletes **52** records (32 P, 12 LS, 8 FB); after the ruling **40 of them are draftable**
and must survive, leaving **12 LS** dropped.

**Ground rules honoured:** the product was **read-only**; the swap was **never run against the real pool** — every
run below used a **copy** of the pool and a **copy** of the build in
`/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/moc-proof/`. The real pool
(`2960b08887a0346f…`) and the real candidate (`40233d6b…`) are byte-unchanged.

---

## 1. The swap tool — exact path

```
SIM-PLATFORM/tools/build-pool-variant.mjs      6,030 B   108 lines
```

Invocation (from its own header, l.7):

```
node build-pool-variant.mjs "<build.html>" --pool "<pool.json>" --out "<variant.html>" [--no-taxonomy]
```

Two neighbours, for orientation only (neither performs the swap): `SIM-PLATFORM/tools/export-current-pool.mjs`
(4,312 B — pool **export**) and `SIM-PLATFORM/tools/validate-dataset.mjs` (15,556 B — the pool **gate**).

## 2. The drop predicate — exact function and line range, quoted verbatim

The drop is inside the **record loop of the module's top-level script body** (not a function): the loop
`for (const r of records) {` opens at **line 68** and the drop block is **lines 74–83**:

```js
 74:  if (!legalCodes.has(pos)) {
 75:    const cands = TAXONOMY[pos] || [];
 76:    if (!flags['no-taxonomy'] && cands.length) {
 77:      pos = cands[0];
 78:      translated.push({ name, from: posRaw, to: pos, alternatives: cands });
 79:    } else {
 80:      dropped.push({ name, pos: posRaw, reason: flags['no-taxonomy'] ? 'translation disabled' : 'no mapping in the taxonomy' });
 81:      continue;
 82:    }
 83:  }
```

A second, independent drop exists at **line 84** (`no numeric ovr`) and is not involved in the 52.

The two tables the predicate consults:

```js
 31: const TAXONOMY = {
 32:   QB: ['QB'], K: ['K'], C: ['C'], T: ['LT', 'RT'], G: ['LG', 'RG'], OL: ['OT1', 'OT2', 'OG1', 'OG2', 'C'],
 33:   HB: ['HB'], FL: ['WR', 'CB'], REC: ['WR'], TE: ['TE'], E: ['REDG', 'LEDG'], DE: ['REDG', 'LEDG'],
 34:   EDGE: ['REDG', 'LEDG'], DT: ['DT', 'REDG'], NG: ['DT'], LB: ['MIKE', 'WILL', 'SAM'], S: ['SS', 'FS'],
 35:   DB: ['CB', 'SS', 'FS'], CB: ['CB'], SS: ['SS'], FS: ['FS']
 36: };
```

```js
 59: const natBlock = (buildText.match(/const NATURAL_SLOT_MAP = \{[\s\S]*?\n\};/) || [''])[0];
 60: const legalCodes = new Set([...natBlock.matchAll(/([A-Z][A-Z0-9_]*)\s*:\s*\[/g)].map(m => m[1]));
```

**`TAXONOMY` has no `FB`, `P` or `LS` key** — that is the whole reason those 52 are dropped: their pool code
is not a legal build code (l.74 true) and the taxonomy has no entry (l.75 → `[]` → l.80).

## 3. The replacement predicate — keep FB and P, drop only LS 12

**Short answer: the predicate itself does not need to change. The build's slot map does — and that is Claude's
part of the Owner's ruling.** Once `NATURAL_SLOT_MAP` carries the new codes, `legalCodes.has('FB')` and
`legalCodes.has('P')` are **true**, the `if` at l.74 is never entered for those 40 records, they are written
with no translation, and the only records that still drop are the **12 LS** (no slot, no taxonomy entry — and
correctly so: a long snapper is not a draft-board position).

**The build change (Claude — "builds the math"):** add the two positions to the build's slot map, e.g.

```js
// NFL Draft Simulator merged.html — const NATURAL_SLOT_MAP (currently 19 keys)
  … CB:['CB1','CB2','CB3'], SS:['SS'], FS:['FS'],
  FB:['FB1'], P:['P1'],                    // ← new, per the Owner's ruling
  K:['K']
```

…and the matching **roster slots** `FB1`/`P1` in `ROSTER_SLOTS` (26 → **28**, matching the 28-round draft),
with the flex rules and the rating specs for them. The slot _names_ and the maths are the Architect's to
choose; the tool only needs the **keys** to be legal.

**The one tool change I do recommend — a guard, not a rule change** (it closes a latent bug, see §5):

```js
 76:    if (!flags['no-taxonomy'] && cands.length && legalCodes.has(cands[0])) {
```
and the drop reason becomes explicit:

```js
 80:      dropped.push({ name, pos: posRaw, reason: flags['no-taxonomy'] ? 'translation disabled'
 81:            : (cands.length ? 'mapping target is not a legal slot code in this build' : 'no mapping in the taxonomy') });
```

**Optional, only for pools that spell the codes differently:** add identity entries `FB: ['FB'], P: ['P']` to
`TAXONOMY` (l.35) so a legacy `FULLBACK`/`PTR` spelling still lands. Not needed for the current pool, whose
codes are already `FB` and `P`.

## 4. The command that proves 1,188 draftable records, and the expected output

Against a **copy** of the build that carries the FB/P keys and a **copy** of the pool:

```console
$ cp SIM-PLATFORM/data/nfl/current.json            $W/pool.json
$ cp "NFL Draft Simulator merged.html"              $W/build-fb-p.html      # + FB/P keys in the COPY only
$ node $W/tool.mjs $W/build-fb-p.html --pool $W/pool.json --out $W/variant-fbp.html
variant written: …/variant-fbp.html (649611 bytes)
  sha256 0c3b6658522940a27b2b226baaf81d9c804eca0b11ad1aba0569e6076309ba93
  records in pool: 1200 · written: 1188 · translated: 0 · dropped: 12
  DROPPED (not guessed, not rated):
    Josh Harris (LS): no mapping in the taxonomy
    Andrew DePaola (LS): no mapping in the taxonomy
    Zach Wood (LS): no mapping in the taxonomy
    Hogan Hatten (LS): no mapping in the taxonomy
    … and 8 more
```

**Expected output:** `records in pool: 1200 · written: 1188 · translated: 0 · dropped: 12`, and **all twelve
dropped records are LS**. Baseline for comparison (current build copy, current tool, unchanged):
`written: 1148 · translated: 0 · dropped: 52`, variant 647,101 B, sha256 `b2e097f2879a8928…` — DS's figures
reproduced exactly.

**The one caveat that must travel with "1,188 draftable":** 1,188 is **written and pool-visible**. In the
proof build, `ROSTER_SLOTS` still has 26 entries and no `FB1`/`P1`, so the 40 FB/P records are **assignable to
zero slots** — measured: _pool-visible 1,188 · assignable 1,148_. They become draftable only when the build
gains the slots and flex rules. Without that, the draft would read "896/896 picks complete" while 40 FB/P
players sit undraftable — the M-81 failure mode (a draft that reports complete with slots empty).

**Arithmetic for the ruling:** 28 rounds × 32 teams = **896 picks**; 1,188 draftable → **1.33 players per
pick**, against the football sim's 1.38 (1,148 / 832). The pool stays in the same shape.

## 5. Is the drop position-based, slot-map-based, or a hardcoded list? — **slot-map-based, through two tables**

- **Not a hardcoded list.** There is no list of 52 names anywhere; the 52 are an _emergent_ property of two
  tables. (Consequence: the fix is small, and a future pool can change the count without any code edit.)
- **Not position-based either.** The predicate never asks "is this a punter?"; it asks two questions:
  (a) _is this code a legal build code?_ — `legalCodes`, parsed from the build's **`NATURAL_SLOT_MAP`** (the
  slot map), l.59–60; (b) _is there a taxonomy entry mapping this code onto a build code?_ — `TAXONOMY`,
  l.31–36, which is the historical→modern bridge.
- **So: slot-map-based, with a two-table lookup.** The Owner-facing consequence: **the build's slot map is the
  switch.** Adding 'FB' and 'P' to `NATURAL_SLOT_MAP` is what turns 40 records from dropped into kept; the
  tool's taxonomy is a fallback for codes the build does not know.

**The latent bug the guard closes (demonstrated, not asserted).** Line 77 writes `pos = cands[0]` **without
checking that `cands[0]` is a legal build code** — so a taxonomy entry can write a position the build cannot
hold. Proof on copies: a taxonomy entry `LS: ['LS']` (LS is not a legal build code) makes the **unguarded** tool
write **1,200 records, 12 of them with the illegal code 'LS'** — pool-invisible, silently lost to the draft,
with **no warning** (the tool reports them under "translation report" as a _success_). The **guarded** tool
writes **1,188** and reports them as dropped with the reason _"mapping target is not a legal slot code in this
build"_. The guard is behaviour-neutral in the correct case: with FB/P legal, guarded and unguarded produce the
**same** variant (sha256 `0c3b6658522940a2…`).

## 6. What I did NOT check

- **I did not modify the product, the pool, or the tool.** Every patched file was a copy under
  `/private/var/folders/…/opencode/moc-proof/`; the real pool and the real candidate are byte-unchanged.
- **I did not run the swap against the real pool** (as instructed) and I did not build a variant from the real
  pool; the baseline numbers quoted in §4 are from the _copy_.
- **I did not design the FB/P slots or the maths** — slot names, flex rules, `RATING_SPECS`/`DEF_SPECS` entries,
  the 28-round `ROSTER_SLOTS` edit and the CPU's valuation of a FB/P pick are the Architect's.
- **I did not verify the _pool_'s content** (that the 8 FB and 32 P records are correctly rated or correctly
  positioned) — only their codes and counts. `validate-dataset.mjs` owns pool content.
- **I did not check the `--no-taxonomy` path** beyond the baseline run; and I did not test what happens when a
  build has _no_ `NATURAL_SLOT_MAP` (the tool's l.59–60 fallback yields an empty `legalCodes`, which would drop
  everything — untested and worth a guard later).
- **I did not re-derive the 28-round ruling's consequences for the football sim's own slot tables** (flex rules,
  position counts, the lineup optimiser) — that is the Architect's blast radius, not mine.
