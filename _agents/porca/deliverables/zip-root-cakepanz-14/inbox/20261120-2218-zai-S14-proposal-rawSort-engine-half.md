SPEAKER: Z.ai | TASK: S14 §5 patch proposal — Contract B's engine half (`rawSort` on `BoardRowVM`) plus the PAIRED shell diff (the L13 oracle and the tie extension move together), filed as TEXT only — no engine file, no pin, no colors/ tree is touched by this proposal
FOR: the Architect (Claude) — the engine is his alone (the lane split); filed from the S14 sitting, the work order §3.4.2–§3.4.3

**STATE: `proposed` — and the ENGINE HALF is `BLOCKED (engine half)` from Z.ai's side by law (the 69-file pin fence).** A proposal is not an accepted change; an accepted change is not implemented; implemented is not verified; verified is not Owner-accepted. Nothing here is integrated. Z.ai cannot land any part of this in `colors/` or `src/engine/**` — filing it is the whole action.

## 0 · Why this proposal exists (one paragraph)

The S14 work order resolved the five-seat dispute in favour of the pin: `BoardRowVM` is an ENGINE type (declared at `colors/src/sports/nfl/view/draftBoard.ts:19`, re-exported — not owned — by the shell at `src/lib/port/seam.ts:16,87`), so the shell cannot add `rawSort`. Z.ai has landed the pin-safe SHELL half this sitting (the primary top three are the first three ARRAY POSITIONS of the engine-sorted rows — board battery law L24, falsified by name under F24; the tie extension and the L13 oracle stay PAIRED and are labelled `INTERIM — display-rounded, awaiting rawSort`). Only the tie extension still derives order from the display-rounded string; the raw key the engine ranks by (`key()` at `:53`) is stripped at `:61`. This proposal gives the Architect the exact engine half AND the exact paired shell diff so that when he lands `rawSort`, Z.ai applies both halves TOGETHER and re-falsifies — never a raw-valued oracle against a display-valued component (measured risk: the display-rounded oracle expects the tie-broadened ring — the F20 child log's `expected 60` at pick 27 — while a raw-equality extension rings 3).

## 1 · TARGET (file + sha256)

- Tree: `colors/` on `architect/engine-and-seats`, engine pin `408410477`.
- File: `colors/src/sports/nfl/view/draftBoard.ts` — sha256 at the pin and in the delivered cakepanz mirror (`src/engine/sports/nfl/view/draftBoard.ts`):
  `e9e6e01a31d7024e6eb2bd9ece7034dadb93aa75316ca2826f96eb26a63f4251`
  (byte-identical both sides: VERIFIED this sitting — `git show 408410477:colors/src/sports/nfl/view/draftBoard.ts | sha256sum` === the mirror file's sha256; `git diff 408410477 ee3b6e1 -- colors/src` is 0 bytes).
- The cakepanz-4 tree root is the S14 package (`67-cakepanz-14-2026-11-20.zip`); its `src/engine/**` is byte-identical to the pin (69/69 re-verified this sitting).

## 2 · ENGINE HALF — `rawSort: number` on `BoardRowVM`

**WHERE (anchor, not a line):** `export interface BoardRowVM {` in `colors/src/sports/nfl/view/draftBoard.ts`, and the strip inside `boardVM()`'s return (anchor `rows.slice(0, limit).map(({ _w, _p, ...r }) => r)`).

**old → new (interface):**
```ts
// OLD
export interface BoardRowVM { ...existing fields... }
// NEW
export interface BoardRowVM { ...existing fields...; rawSort: number }   // Contract B: the raw numeric key() the view ranks by, kept on the VM
```

**old → new (boardVM body):** compute the raw key per row and carry it THROUGH the strip:
```ts
// OLD (the shape at :54 and :61, anchors)
const rows = ...rows.sort((a, b) => key(b) - key(a) ...);
rows.slice(0, limit).map(({ _w, _p, ...r }) => r)
// NEW
const rows = ...rows.sort((a, b) => key(b) - key(a) ...);
rows.slice(0, limit).map(({ _w, _p, ...r }) => ({ ...r, rawSort: /* the SAME raw key() value this row was sorted by */ 0 as number }))
```
Concretely: keep each row's raw `key()` value alongside `_w`/`_p` (the same private-field pattern — e.g. carry `_k: number` set when the row is built/sorted, then `map(({ _w, _p, _k, ...r }) => ({ ...r, rawSort: _k }))`). The Architect owns the exact mechanical form; the CONTRACT is: **`rawSort` is the exact raw numeric value `key()` returned for that row, and the array order equals `rawSort` descending (with the engine's existing tie order preserved).**

**WHY:** the shell's tie extension needs the raw order key to walk real ties exactly (the wins/priority keys sit on the engine's 1e-9 grid so real ties compare exactly); the display string destroys that precision. The primary top three no longer need it (array position — landed, law L24), so `rawSort` is needed ONLY by the tie path and its paired oracle. Zero behaviour change to the engine's own sorting: the sort is untouched; only the already-computed key is retained instead of discarded.

**SAFE ALONE?** NO — this half is NOT safe alone. Landed without the paired shell diff it changes nothing visible (good), but the moment Z.ai's L13 oracle goes raw against the display-valued tie path, the law and the product disagree on tie-broadened boards. **Land it, then Z.ai applies §3's paired diff in the same sitting and re-falsifies.** `suggestions` stays deferred (Contract B as settled; A-vs-B not re-litigated).

**HOW TO CHECK (command + expected output):**
```
cd colors/
node --test --experimental-strip-types test/engine.test.ts        # 430/430 — the carried suite must stay green (no engine behaviour change)
grep -n "rawSort" src/sports/nfl/view/draftBoard.ts               # the interface field + the strip carry-through
```
And the seam golden (`batteries/seam-golden.json`, sha `e8fed8ab…`) must still MATCH — `rawSort` ADDS a field to the VM, which the golden's canonical JSON may or may not serialise; if the golden's map picks explicit fields (it does — `scripts/golden-seam.mjs` maps named fields), the golden is unaffected; if the golden ever serialises whole rows, regenerate it with `--write` and receipt the diff (the deliberate re-pin path, N34's design).

## 3 · THE PAIRED SHELL DIFF (Z.ai applies BOTH together, in the sitting after the engine lands)

### 3a · The component's tie extension consumes `rawSort`

**Target:** `src/lib/components/DraftBoard.svelte` (via `src/lib/port/suggestWhy.ts`, where the derivation now lives — ONE source for the component, the autosave and the battery).

**WHERE (anchor):** the INTERIM line in `suggestIdsOf` — anchor `for (let i = 3; i < rows.length && val(rows[i]) === third; i++) ids.push(rows[i].id);   // INTERIM — display-rounded, awaiting rawSort`.

**old → new:**
```ts
// OLD (the display-rounded extension, INTERIM)
const val = (x: RingRow) => Number(String(x[sort]).replace(/[^0-9.\-]/g, '')) || 0;
...
if (base === 3) {
  const third = val(rows[2]);
  for (let i = 3; i < rows.length && val(rows[i]) === third; i++) ids.push(rows[i].id);
}
// NEW (the raw extension — rawSort from the engine, exact ties only)
if (base === 3) {
  const third = rows[2].rawSort;
  for (let i = 3; i < rows.length && rows[i].rawSort === third; i++) ids.push(rows[i].id);
}
```
(The `val` helper dies with the extension; the primary stays array-position — L24 unchanged.)

### 3b · The L13 oracle derives its expectation from the raw value independently

**Target:** `batteries/board.battery.mjs`, `l13Checkpoint`.

**WHERE (anchor):** `const expected = vm.ids.slice(0, 3);` + the `for (let i = 3; ...vals[i] === third...) expected.push(...)` walk and the `vmVals()` helper (anchor `Number(String(r[v.sort]).replace(/[^0-9.\-]/g, '')) || 0`).

**old → new:** the oracle reads `rawSort` from the VM (the battery's `vmRead()` gains `rawSort` per row — one source, the engine field) and extends on RAW equality:
```ts
// OLD (the display-rounded oracle, INTERIM — paired with the display-valued component)
const vals = await vmVals();
const third = vals[2];
const expected = vm.ids.slice(0, 3);
for (let i = 3; i < vm.ids.length && vals[i] === third; i++) expected.push(vm.ids[i]);
// NEW (the raw oracle — paired with the raw-valued component; landed in the SAME sitting)
const raws = await vmRaws();               // the rows' rawSort values, array order
const third = raws[2];
const expected = vm.ids.slice(0, 3);
for (let i = 3; i < vm.ids.length && raws[i] === third; i++) expected.push(vm.ids[i]);
```
Both `INTERIM — display-rounded, awaiting rawSort` labels (the component comment, the battery's `vmVals` comment, the L13 law text, the §3 paper trail) are replaced by a dated `rawSort landed (<build sha>)` note in the same edit.

### 3c · The re-falsification that closes Contract B

When — and only when — the engine lands `rawSort` and §3a+§3b are applied together:
- **Falsify the corrected L13 by name:** a mutant restoring the display parse into the tie path must make **L13 DIE** (a display-valued tie path rings the tie-broadened set — e.g. the F20 child log's `expected 60` at pick 27 — while the raw oracle expects the exact-tie set), child log filed.
- **Widen L24** to the blanket wording: "no ring code may derive ordering from rendered text or `.cp-suggest` DOM nodes" — the interim exception (the tie path) is gone. Re-falsify by name (the F24 localeCompare mutant still dies; a mutant re-parsing display text in the TIE path now dies too).
- Counts of record move: board battery stays at its then-current count (no law added or removed — L13's TEXT changes, its number does not); the falsifier gains the widened-F24 stage. `INTERIM` disappears from every receipt.

## 4 · What Z.ai did NOT decide here (the Owner/Architect's calls)

- Whether Contract B lands at all before the cutover (the Owner's "revive the ring" named the glow; the correctness work is filed either way — the S14 sitting's one open scope question).
- The exact mechanical form of the `rawSort` carry-through in `boardVM()` (the Architect's file; §2 states the CONTRACT, not his code).
- The merge sequencing (the §3 pair applies in Z.ai's sitting AFTER his build lands, so the falsifier's mutants run against both halves together).
