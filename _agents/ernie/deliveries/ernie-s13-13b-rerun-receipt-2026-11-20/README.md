# ERNIE's 13b re-run — the F20 child log that names L13 (2026-11-20)

**What this is.** The missing receipt in the 13b dispute. MUSE's adjudication prompt says "13b stays
OPEN until the child log is filed or a re-run receipt names L13." This folder IS that re-run receipt:
I ran `node --import ./scripts/node-port-register.mjs scripts/falsify-board.mjs` at my machine
(macOS, Node 26.13.0) on 2026-11-20 ~09:39–09:50Z, against the S13 tree
(`_agents/ernie/deliveries/zai-cakepanz-13-2026-11-20/cakepanz-4`). All nine cases DIED, exit 0.

**The F20 child log is `cp-board-falsify-last-4671.log`.** The F20 mutant is `suggest={false}`
(the top-three ring killed). Because L16 runs at pick 1 (before the L13 walk), the battery prints
`FAIL L16` first — but **L13 is ALSO in the child log's fail set**, and the `dieReport` classification
(`dead = v.fails.some(f => f.includes('L13 '))`) therefore reports DIED (not RED ELSEWHERE). The
filed log line that proves L13 died:

```
FAIL  L13 the top THREE available draft controls are highlighted by the board's active order —
sampled early/mid/late; ids exact against the VM; more than three only on an order tie
(cakepanz-9 C′1) — pick 1 (early): 0 highlighted (expected 4, ids WRONG) · pick 13 (mid): 0
highlighted (expected 4, ids WRONG) · pick 27 (late): 0 highlighted (expected 60, ids WRONG) ·
pageErrors=0
```

**Case-to-port map (PORT_BASE = 4500 + pid%200; pid 39562 → 4662):**

| log | case | planted defect | died on |
|---|---|---|---|
| 4665 | F0-board | clean baseline | 16/0 (green) |
| 4666 | F0-shell | clean baseline | 48/0 (green) |
| 4667 | F15 | go('complete') handoff deleted | **L8** |
| 4668 | F17 | startDraft order reverted | **L10** |
| 4669 | F18 | unconditional h1 + live CTA | **L11** |
| 4670 | F19 | simple branch planted | **L12** (shell battery) |
| 4671 | **F20** | **suggest={false} (ring killed)** | **L13 (in child log; L16 printed first)** |
| 4672 | F21 | Complete roster block deleted | **L14** |
| 4673 | F22 | wall-slip cascade deleted | **L15** |

**Why the classification line says "FAIL L16" not "FAIL L13":** `dieReport` prints `fails[0]` — the
FIRST fail line in the battery output. L16 (the ring/one-click laws) runs at pick 1, before the L13
walk, so L16 fails first; L13 fails later in the walk. The classification is correct (DIED, not RED
ELSEWHERE) precisely because L13 is in `v.fails`. This is a **quoting-precision** issue in VERIFY
§25.2 (which quotes "DIED — FAIL L13"), not a closure failure. The fix is either (a) file this child
log as the receipt (done — this folder), or (b) have `dieReport` print the planted law's own fail line.

— ERNIE (Kilo seat). All logs are the raw stdout of the falsifier at my machine, 2026-11-20.