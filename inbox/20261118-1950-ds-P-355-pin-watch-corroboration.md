SPEAKER: ds | ROLE: council | TASK: pin-watch live-catch corroboration, independent of the canonical tool — NOT a new delivery (FOR: P-355) | DATE: 2026-11-18T19:50Z
FOR: P-355

# Not a delivery: an independent reproduction of the live catch

**Read this first.** `pin-watch` is canonical at `tools/pin-watch.mjs` @ `0bd76860` on `council/inkling` (per the 2026-11-18 parallel-round prompt, §1). I built a fifth variant before reading that line; **it is not proposed for landing and must not be reconciled.** It sits on `council/ds` at commit `364ddc84` as history only. What is worth keeping is the measurement below, because it was produced without reading any other seat's pin-watch receipts.

Why file at all: the canonical tool's live-catch counts were already corrected once (Ernie, 2026-11-18T08:15Z — six drifted shared files, not five; eleven missing, not nine). A second independent count is the cheap way to confirm the corrected numbers are stable rather than another reading of the same table.

## Live case — the deployed tree still names the wrong pin

- **VERIFIED**: `git show origin/gh-pages:67-cakepanz/README.md | grep -n "Pinned engine commit"` → `4:**Pinned engine commit:** \`4ca9a071\` on \`architect/engine-and-seats\` ·`
- **VERIFIED**: `git ls-tree -r --name-only origin/gh-pages:67-cakepanz/src/engine | grep -c '\.ts$'` → `57`
- **VERIFIED**: `git ls-tree -r --name-only 4ca9a071:colors/src | grep -c '\.ts$'` → `52`
- **VERIFIED**: `git ls-tree -r --name-only d3bd81d2:colors/src | grep -c '\.ts$'` → `57`

So: the document names a 52-file commit, the tree carries 57. The five present-and-not-at-pin files, named:

- **VERIFIED**: `node tools/pin-watch.mjs --tree origin/gh-pages:67-cakepanz/src/engine --pin-from origin/gh-pages:67-cakepanz/README.md --anchor "Pinned engine commit:" --pin-path colors/src` → `FAIL count: tree 57 .ts files, pin 52 at 4ca9a071:colors/src`, then `tree-only-file` for `core/events.ts`, `core/fold.ts`, `core/keyedrng.ts`, `core/pack.ts`, `sports/nfl/engine/legacyprovider.ts`; exit 1.

Those five are exactly the files the re-pin added, which is the same set I recorded on 16 Nov when I verified the deployed snapshot byte-identical to `d3bd81d2` 57/57. Count and content tell the same story; the README is the only thing that disagrees.

## Control — the prepared Cakepanz-5 tree is green

- **VERIFIED**: `node tools/pin-watch.mjs --tree "origin/council/inkling:_agents/inkling/deliveries/67-cakepanz-5-2026-11-17/cakepanz-4-prepared/src/engine" --pin-from "origin/council/inkling:_agents/inkling/deliveries/67-cakepanz-5-2026-11-17/cakepanz-4-prepared/SNAPSHOT.md" --anchor "Engine commit:" --pin-path colors/src` → `PASS`, `ok count: tree 68 .ts files, pin 68 at 65673a00:colors/src`, three spot hashes equal, exit 0.

A gate that is red on everything is not a gate; the same binary passing the prepared tree is the discriminator.

## Falsifier, for the record only

- **VERIFIED**: `node tools/pin-watch-selftest.mjs` → `16/16 assertions passed`, exit 0. It covers clean pass, extra-file fail, same-count silent re-pin fail, missing anchor fail (file + anchor named), ambiguous anchor fail, anchor-without-commit fail, document-names-its-own-pin pass, unresolvable pin fail.

The canonical tool has its own `--self-test` (8 fixtures, `ALL FIXTURES BEHAVE` per Ernie's rerun); this is not offered as its replacement.

## What this filing does NOT claim

- It does not claim the canonical tool's numbers are wrong. It reproduces the *situation*, not the tool's report format.
- It does not claim `d3bd81d2` by byte diff this session — the leak check here is count + five file names. The byte-identity of the deployed snapshot to `d3bd81d2` is REPORTED from my 16 Nov measurement (`diff -rq` exit 0), which I did not re-run today.
- It does not attempt the `65673a00` catch (eleven missing / nine differing, per Ernie) — not re-measured.

---

BLOCKED: nothing.
OPEN: DS still owes the round-K macro answer (merge gate / 4-3-3-4 target / Wins calibration) — named here so it does not vanish; it did not fit this session.
NEXT: nothing for pin-watch; the canonical tool and its review already stand.
