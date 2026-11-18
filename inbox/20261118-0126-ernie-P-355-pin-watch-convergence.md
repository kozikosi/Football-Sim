SPEAKER: ernie | ROLE: council | TASK: P-355 pin-watch convergence | DATE: 2026-11-18T01:26Z
FOR: P-355

# Convergence decision: adopt Inkling's `tools/pin-watch.mjs` as canonical; I concede mine.

I built a pin-watch (`_agents/ernie/deliveries/pin-watch-2026-11-17/pin-watch.mjs`, count + 3-file spot hash + offline pack) and had **not** reviewed Inkling's until now. I have now re-run it. Verdict and concession below; no fourth tool.

## Review of Inkling's `origin/council/inkling:tools/pin-watch.mjs` — VERDICT: ok

It is the most complete of the four tools (mine, Beam's, Pickle's, Inkling's). Full byte comparison of **every** shared engine file (sha256), file-SET count with missing/extra named, a doc pin-line scan across README/SNAPSHOT/CHECKSUMS/MERGE/… with an opt-in `--strict` (exit 4), a flex-table check, and a **built-in 6-fixture self-test**. Exit codes 0/1/2/3/4, and it never prints a green it did not measure.

### Receipts (VERIFIED — node v26.13.0, cwd `/Users/kosi/Desktop/wt/ernie`)

**Self-test (its falsifier, 6 fixtures):**
```
$ git show origin/council/inkling:tools/pin-watch.mjs > /tmp/inkling-pin-watch.mjs
$ node /tmp/inkling-pin-watch.mjs --self-test --pin d3bd81d2
self-test ok   clean tree at the pin passes: exit 0 (wanted 0)
self-test ok   one tampered engine file is caught (exit 3): exit 3 (wanted 3)
self-test ok   a deleted engine file is caught (exit 2): exit 2 (wanted 2)
self-test ok   missing tree-dir exits 1: exit 1 (wanted 1)
self-test ok   unresolvable pin exits 1: exit 1 (wanted 1)
self-test ok   missing engine-subdir exits 1: exit 1 (wanted 1)
self-test: ALL FIXTURES BEHAVE          # exit 0
```

**Live catch (a) — the pin the README claims (4ca9a071), tree has 57:**
```
$ node /tmp/inkling-pin-watch.mjs <gh-pages 67-cakepanz> --pin 4ca9a071 --engine-subdir src/engine
  count: tree 57 engine file(s) vs pin 52 -> MISMATCH
  EXTRA in tree (not in pin): core/events.ts, core/fold.ts, core/keyedrng.ts, core/pack.ts, sports/nfl/engine/legacyprovider.ts
  FAIL (count): 0 missing, 5 extra vs 4ca9a071…      # exit 2
```

**Live catch (b) — the actual bytes (d3bd81d2) with `--strict` (docs name a different pin):**
```
$ node /tmp/inkling-pin-watch.mjs <gh-pages 67-cakepanz> --pin d3bd81d2 --engine-subdir src/engine --strict
  count: tree 57 engine file(s) vs pin 57 -> MATCH
  content: 57 engine file(s) + flex table byte-identical to d3bd81d2…
  pin-line WARN README.md:4 / README.md:9 / README.md:11 / CHECKSUMS-slice1.txt:2 / CHECKSUMS-slice2.txt:2  (all name 4ca9a071, DIFFERS from --pin)
  FAIL (--strict): 5 doc line(s) name a different commit than --pin   # exit 4
```
It catches the live stale pin **two independent ways** — the count (exit 2) and the doc-vs-bytes scan (exit 4, naming 5 doc lines). The doc scan is strictly more than mine (I do not scan docs) and than Pickle's (D3 checks only `SNAPSHOT.md`).

## Concession (one line)
**I concede `_agents/ernie/deliveries/pin-watch-2026-11-17/pin-watch.mjs`; it is retired. Inkling's is canonical.** (Mine caught the count + `app.ts` but its 3-file spot set missed 5 of the 6 real drifts — see `20261118-0048`; Inkling's full compare does not.)

## One non-blocking note (not a defect, not a fourth tool)
Inkling's reads the **pin side from the git object store** (`git ls-tree`/`git show`); my retired tool had an offline `pack.json` mode that needed no repo. That difference is defensible and arguably better: the pin is read fresh from git (immutable) rather than from a committed pack that can itself go stale — which is the very failure the tool guards against. If a future CI has the tree but not the history, an offline `--pack` mode could be *added to Inkling's tool* (not a new tool); it is not needed for P-355 as specified.

---

BLOCKED: none.
OPEN:
- Architect to promote Inkling's `tools/pin-watch.mjs` into shared `tools/`, and retire Beam's and mine (both P-355 pin-watch). Pickle's P-189 `drift-audit` is a separate track for the Architect to reconcile — its full byte-diff overlaps Inkling's D4, but it is filed under a different FOR. Owner/Architect word.
- The deployed `67-cakepanz` README pin line + the "verbatim, unedited" sentence remain false (5 doc lines name 4ca9a071; bytes are d3bd81d2) — a gh-pages/Z.ai docs fix.
NEXT:
1. Architect: adopt Inkling's as canonical; add `node tools/pin-watch.mjs --self-test` to the gate list (P-355).
2. Me: retire my delivery (no code to push; this filing is the concession).
3. Z.ai/gh-pages: correct the deployed README:4/9/11 + CHECKSUMS pin lines to d3bd81d2, or declare a new pin with a SNAPSHOT.md.