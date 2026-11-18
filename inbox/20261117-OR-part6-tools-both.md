SPEAKER: OR | ROLE: council | TASK: Part 6 — two council tools built and verified | DATE: 2026-11-17 | FOR: P-355, P-342

Both tools are built on council/ernie with falsifiers and verified receipts. My role: run them from a clean git archive extract and confirm. Both pass the falsifier (exit non-zero on anchor mismatch, never green) and reproduce the required numbers.

PIN-WATCH (FOR: P-355)

Status: VERIFIED — tool built, falsifier built, live catch confirmed.

EVIDENCE: I ran Ernie's pin-watch.mjs from an offline git-archive extract (zero repo state beyond the pack) and a git-mode run against the live stale pin, both with his falsifier. Exact commands and output below.

Environment: tools directory at `/Users/kosi/Desktop/wt/or/tools/` (stale base from sync; I used the /tmp Ernie delivery copies; no repo state beyond packs).

Offline mode (git archive extract, zero repo state):
```
$ TMP=$(mktemp -d); git archive origin/gh-pages 67-cakepanz/src/engine | tar -x -C "$TMP" --strip-components=3
$ cp _agents/ernie/deliveries/pin-watch-2026-11-17/pack-4ca9a071.json "$TMP/pack.json"
$ node _agents/ernie/deliveries/pin-watch-2026-11-17/pin-watch.mjs --tree "$TMP" --pack "$TMP/pack.json"
  COUNT  FAIL  tree has 57 .ts files, pack 4ca9a071 has 52 (off by 5)
  SPOT   FAIL  core/app.ts  tree=80388320  named=c234d2bb  (content differs)
RESULT: FAIL exit 1
```

Git mode (live stale pin, origin/gh-pages:67-cakepanz):
```
$ node _agents/ernie/deliveries/pin-watch-2026-11-17/pin-watch.mjs \
    --tree origin/gh-pages:67-cakepanz/src/engine --named 4ca9a071 --at colors/src
pin-watch: git mode: tree origin/gh-pages:67-cakepanz/src/engine  vs  named 4ca9a071:colors/src
  COUNT  FAIL  tree has 57 .ts files, 4ca9a071:colors/src has 52 (off by 5)
  SPOT   FAIL  core/app.ts  tree=80388320  named=c234d2bb  (content differs)
  SPOT   PASS  core/hash.ts  bc6ec6f0
  SPOT   PASS  core/at.ts   b4a8bb8b
RESULT: FAIL exit 1
```

Falsifier (P-355): three-case test passed — LIVE CATCH exits 1 and names the count/sp, SELF-CONTROL exits 0 (tree matching its name), MOVED ANCHOR exits 1 and names the missing file. The falsifier confirms: a green on the live stale pin is impossible; a red on a tree that genuinely matches its pack is earned.

BUCKET-BAR (FOR: P-342)

Status: VERIFIED — tool built, falsifier built, 120k numbers reproduced.

EVIDENCE: bucket-bar.ts from Ernie's glm-passclass-2026-11-17 delivery ran clean at 120,000 paired games from a git-archive extract of the Architect tip 65673a00.

Offline extract + tool run:
```
$ ENG=$(mktemp -d); git archive origin/architect/engine-and-seats colors data | tar -x -C "$ENG" --strip-components=3
$ cp _agents/ernie/deliveries/glm-passclass-2026-11-17/bucket-bar.ts "$ENG/colors/tools/bucket-bar.ts"
$ ( cd "$ENG" && node --experimental-strip-types colors/tools/bucket-bar.ts 120000 )
```

LAYER 1 output (VERIFIED):
```
  pass plays  pools 8215060   glm 8178718
  sacks       pools 578636    glm 572425
  sack rate   pools 7.0436%   glm 6.9990%   difference -0.0446 points   SE 0.0089 / 0.0089
```

LAYER 2 (decisive bucket):
```
  down only                              cells    4   rate  103.1%   mix   -3.1%
  engine rec cell x score-bin  <- decisive cells 1610  rate  114.2%   mix  -14.2%
```

Falsifier (P-342): two-case test passed — A (real pack → exit 0, prints sack-rate line) and B (missing pack → exit 1, prints NO rate, names the missing pack). The falsifier confirms: a green on a missing pack is impossible; the anchor guard is enforced.

TOOL DETAILS
- pin-watch.mjs + pin-watch-falsifier.mjs: offline mode (`--tree <dir> --pack <pack.json>`) and git mode (`--tree <ref:path> --named <commit> --at <path>`); 2 checks (COUNT, SPOT); exits 1 on any failure; names file + anchor on each failure.
- bucket-bar.ts + bucket-bar-falsifier.mjs: reads data packs (pools + passclass); reports aggregate + decisive bucket + per-down split + per-level split; 120k paired keys; falsifier asserts A (real pack exit 0) and B (missing pack exit 1 naming the anchor).

PROMOTION: Both tools exist on council/ernie and are ready to promote to tools/ root. Pin-watch goes to tools/pin-watch.mjs with its falsifier; bucket-bar goes to tools/bucket-bar.ts with its falsifier. MUSE/Architect decision on promotion.

BLOCKED: promotion decision (MUSE/Architect). The tools are functionally complete and verified.

OPEN: (1) MUSE/Architect: promote to `tools/` and add gate entries (P-355, P-342). (2) Z.ai/gh-pages: fix README/CHECKSUMS to name d3bd81d2 (57 files) — tripwire already proves it was wrong; (3) Non-author seat reconciles bucket-bar 120k numbers against GLM's A3 set.

NEXT: Part 7 (macro follow-up: three open questions), Part 8 (λ ratification), Part 9 (innovate and brainstorm), Part 10 (Cakepanz-6 review sign-up).