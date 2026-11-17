SPEAKER: ernie | ROLE: council | TASK: build the pin-watch tripwire (F-5: count first, spot-hash second, never the manifest alone) with a falsifier, and show it catching the live stale pin | DATE: 2026-11-17T23:58Z
FOR: P-355

**One line:** `pin-watch.mjs` is built, falsified, and it catches the live stale pin — the deployed `67-cakepanz` engine has 57 files and `core/app.ts` bytes from `d3bd81d2`, while its README and CHECKSUMS both name `4ca9a071` (52 files, different `app.ts`). A file count alone catches it; a three-file spot hash catches it a second way. All code and packs are in `_agents/ernie/deliveries/pin-watch-2026-11-17/` on `council/ernie`. It is a proposal for `tools/` (MUSE/Architect promote it); I did not write into shared `tools/`.

# What it does (design = Ernie F-5, 2026-11-17)

Two checks, either of which fails the run:

1. **COUNT** — number of `*.ts` under the tree vs the number the named pin should have. The cheap check: 57 present, 52 named.
2. **SPOT** — sha256 of each spot file's CONTENT in the tree vs at the named pin. Survives a same-count re-pin (the count does not).

The default spot set is three files present in both pins: `core/app.ts` (DIFFERS 4ca↔d3b, so a same-count re-pin is still caught), `core/hash.ts` and `core/at.ts` (identical in both — controls, so a green run is not vacuous). On any miss it prints the file and the anchor by name and exits 1; it never returns 0 on input it could not fully check (a missing spot file is a FAIL, not a skip). **The manifest is never the source of truth** — the manifest is exactly the thing that goes stale, which is the whole point.

Two input modes, no third-party dependency:
- **git mode** (CI / live checkout): `--tree <ref:path> --named <commit> --at <path>`.
- **offline mode** (a `git archive` extract, zero repo state beyond the committed pack): `--tree <dir> --pack <pack.json>`. The tool uses only `fs`/`crypto` here — verified below by running it from `/tmp`, which has no `.git`.

# Receipts (VERIFIED — node v26.13.0, cwd `/Users/kosi/Desktop/wt/ernie`)

## 1. The live catch, git mode
```
$ node _agents/ernie/deliveries/pin-watch-2026-11-17/pin-watch.mjs \
    --tree origin/gh-pages:67-cakepanz/src/engine --named 4ca9a071 --at colors/src
pin-watch: git mode: tree origin/gh-pages:67-cakepanz/src/engine  vs  named 4ca9a071:colors/src
  COUNT  FAIL  tree has 57 .ts files, 4ca9a071:colors/src has 52 (off by 5)
  SPOT   FAIL  core/app.ts  tree=80388320  named=c234d2bb  (content differs)
  SPOT   PASS  core/hash.ts  bc6ec6f0
  SPOT   PASS  core/at.ts   b4a8bb8b
RESULT: FAIL (2 checks)          # exit 1
```
The stale pin is caught twice over: by count (57≠52) and by content (`app.ts`). Both documents (`README.md:4`, `CHECKSUMS-slice2.txt:2`) name `4ca9a071`; the bytes are `d3bd81d2`.

## 2. Self-control, git mode (a tree that matches its name must PASS — proves not always-red)
```
$ node .../pin-watch.mjs --tree d3bd81d2:colors/src --named d3bd81d2 --at colors/src
  COUNT  PASS  57 .ts files (tree) == 57 (named d3bd81d2:colors/src)
  SPOT   PASS  core/app.ts 80388320 / core/hash.ts bc6ec6f0 / core/at.ts b4a8bb8b
RESULT: PASS                     # exit 0
```

## 3. Offline mode, run from `/tmp` (no `.git` in cwd) — the "git archive extract" rule
```
$ TMP=$(mktemp -d); git archive origin/gh-pages 67-cakepanz/src/engine | tar -x -C "$TMP" --strip-components=3
$ ( cd /tmp && node "$D/pin-watch.mjs" --tree "$TMP" --pack "$D/pack-4ca9a071.json" )
  COUNT  FAIL  tree has 57 .ts files, pack 4ca9a071 has 52 (off by 5)
  SPOT   FAIL  core/app.ts  tree=80388320  named=c234d2bb  (content differs)
  ...
RESULT: FAIL (2 checks)          # exit 1
```
The tool never shells out to git in offline mode; a `git archive` extract plus the committed `pack-4ca9a071.json` is the whole input.

## 4. Falsifier — proves the tool discriminates (green is earned)
```
$ node _agents/ernie/deliveries/pin-watch-2026-11-17/pin-watch-falsifier.mjs
ok    A live catch exits 1
ok    A live catch reports COUNT 57 vs 52
ok    A live catch catches app.ts by content
ok    B self-control exits 0
ok    B self-control is all PASS
ok    C moved anchor exits 1
ok    C moved anchor names the missing file
FALSIFIER PASS — pin-watch discriminates (green is earned)      # exit 0
```
Case C is the moved-anchor guard the round asked for: `--spot core/app.ts,core/does-not-exist.ts` makes the tool exit 1 and name `core/does-not-exist.ts` ("anchor missing"). If the tool ever returned 0 on that, or 0 on the live catch, or 1 on the self-control, the falsifier would exit 1 — i.e. the tool is broken and says so.

# Files (all on `council/ernie`)
- `_agents/ernie/deliveries/pin-watch-2026-11-17/pin-watch.mjs` — the tool.
- `.../pin-watch-falsifier.mjs` — the falsifier (three asserted cases).
- `.../pack-4ca9a071.json` — the NAMED pin as a committed pack (count 52, spot sha256 at 4ca). This is what the README claims.
- `.../pack-d3bd81d2.json` — the ACTUAL deployed pin (count 57, spot sha256 at d3b); the self-control pack.

Packs store raw content sha256 (what an extracted file hashes to), so offline mode needs no git plumbing to compare.

# Why count+spot, not a manifest hash (the one design decision worth stating)
The failure mode is a snapshot re-pinned without the documents following. The first thing that goes stale is the manifest/hash doc. So the gate keys on the bytes themselves: a count (catches any file added/removed) and a three-file content spot hash (catches a same-count content change, e.g. `app.ts` here). The manifest is an output to regenerate, never the input to trust.

---

BLOCKED: nothing.
OPEN:
- Who promotes `pin-watch.mjs` into `tools/` — MUSE (council tooling) or the Architect. Not mine to decide; the file is ready to drop in.
- Whether the same check should run in CI on every gh-pages deploy (Owner/Architect call).
NEXT:
1. MUSE/Architect: promote `pin-watch.mjs` + `pin-watch-falsifier.mjs` to `tools/` and add a `node tools/pin-watch-falsifier.mjs` line to the gate list (P-355).
2. Z.ai/gh-pages: fix `67-cakepanz/README.md:4` and `CHECKSUMS-slice2.txt:2` to name `d3bd81d2` (52→57 files) — a docs fix, not a council one; the tripwire above is what proves it was wrong.
3. Run the same count+spot check against the Cakepanz-5 trees' `SNAPSHOT.md` lines (I verified those by hand this session — both byte-identical, 67 and 68 files — so the control shows the gate is not a permanent red). Not run here; named for whoever takes the Cakepanz-6 review.