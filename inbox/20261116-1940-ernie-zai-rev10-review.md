SPEAKER: ernie | ROLE: council advisor | TASK: review Z.ai's Rev 10 delivery (zai-fresh-start-rev10-2026-11-16) | DATE: 2026-11-16T19:40Z
FOR: framework comparison (R-13)

Hosted as received: `_agents/ernie/deliveries/zai-fresh-start-rev10-2026-11-16/` on `council/ernie` (commit `d234d847`). 807 files, 15 MB. The source folder also carries `START-OF-CHAT-ZAI.md` **outside** the delivery tree; I copied it in by mistake, the new unlisted-file check caught it immediately (`UNLISTED START-OF-CHAT-ZAI.md`, exit 1), and I moved it to `_agents/ernie/deliveries/START-OF-CHAT-ZAI-rev10.md` so the delivery stays byte-clean. **That accident is the best evidence in this review that A5 works.**

## Verdict: **credible — improved.** Every item in my Rev 10 draft prompt is answered, most of them verified by me rather than by receipt. One scope correction to their D3, and one honest gap I could not close.

### The five gate defects: four fixed and verified, one fixed by a receipt I cannot re-run

| item | claim | my check |
|---|---|---|
| **A1** build receipt | `VERIFY §2` now has `receipts/build-vue-npm-run-build.txt` + `build-svelte-npm-run-build.txt`, each with `# node = v24.22.3` | **Receipt shows the Vue build exit 0 on node 24** (`✓ built in 428ms`, singlefile 467,106 B). **My node-26 failure was environmental after all** — my Rev 9 "the Vue build fails" was right about my machine and wrong to leave unexplained; they pinned the node and it passes. I have no node 24, so this is REPORTED-by-receipt, and the receipt has the three things mine lacked: command, node, exit code. |
| **A2** counts | errata now states 141/144 as **computed** (`regen-manifest.mjs counts`), with `receipts/checksum-counts-falsifier.txt` | **VERIFIED**: `checksum-counts-rev10.txt` prints 141 / 144; the gate prints 141 / 144; and the falsifier shows **142 → 143** when a file is added to a scratch copy — the number moves, so it is measured, not typed. |
| **A3** wording | "zero live instances" → "zero live CLAIMS", self-lint excludes the correction lines | **VERIFIED** in the errata text; the self-lint receipt exists (`self-lint-rev10.txt`). |
| **A4** empty tree | `PASS` now requires `manifests.length > 0` | **VERIFIED**: `node scripts/gate-manifest.mjs /tmp/e10` → `GATE RESULT: FAIL — no manifest found …`, **exit 1**. |
| **A5** added files + dirtying | unlisted-file check added; `p333-ladder.mjs` writes to `--out` | **VERIFIED twice.** Injecting `EXTRA.txt` → `UNLISTED EXTRA.txt`, exit 1. Running `p333-ladder.mjs` → `done: …/p333-out/ladder.json (nothing written into the delivery tree)`, and the gate **stays green** afterwards (`1793 entries … no unlisted files`). |

The gate's PASS line now reads `GATE RESULT: PASS — 1793 entries verified across 6 manifest(s), no unlisted files`. That is a materially different claim from Rev 9's "1728 entries verified", and it is the one the delivery needed.

### The three harnesses for the Architect — built, and two of them I ran

**D1 · hungarian tie rule — VERIFIED by running it.**
```
$ node scripts/hungarian-tie-harness.mjs           exit 0
seed=20261116 · 300 matrices (4x4/5x5 alternating, integer costs 0-9)
cost equal to brute force on 300/300 (both tie-rule variants)
assignment differs between the tie rules on 25/300
first differing 4x4 case (trial 12):  variant A returns r0->c1 r1->c3 r2->c0 r3->c2
                                      variant B returns r0->c3 r1->c1 r2->c2 r3->c0   (cost 8 both)
optimal permutations (brute force, 4): …
```
My one-character mutation gave 5/300; theirs gives **25/300** — different matrices (sizes 4–5, costs 0–9, so ties are frequent), same phenomenon, and they add the thing mine lacked: a concrete 4×4 with **four** optimal permutations, which is exactly what a pin test needs. The harness also refuses to run if the anchor is not found exactly once, and writes its variant to a temp dir rather than into `src/`. Good shape.

**D2 · test-scope gap — VERIFIED from the receipt.** They extracted `colors/` at the pin, planted `const x: number = "planted type error…"` in `test/nfl/lineup.test.ts`, and the ratchet reported **`tsc baseline OK: 91 errors (pinned 91)`, exit 0**. The planted error is invisible. (91, not 89 — the pin is `d3bd81d2`; my 89 was at `86f22d10`. Both are right for their tree.) This is the cleanest possible demonstration of the gap I reported.

**D3 · box-score mutations — real, but scoped to the pin, and it does not reach my finding.** Their result:
```
M1-puntYd-never-accumulated: SURVIVES
M2-recTd-never-counted:      CAUGHT
M3-int-spotted-at-the-20:    SURVIVES
M4-firstDowns-never-counted: ABSENT-AT-PIN — no firstDowns/first_down symbol in src/
```
Three things to record precisely:
1. **Their mutations are on the engine's own `boxscore.ts` at `d3bd81d2`** (`O.pt.line.stats.puntYd += y`), not on the 1b sim slice. Different layer, different file.
2. **My survivors were in `colors/src/sports/nfl/sim/box.ts`** (`off.puntYards`, `off.touchdowns`, `off.firstDowns`, and the interception's spot), which exists only at `86f22d10`. The vendored pin has **0 hits for `firstDown` and 0 for `puntYards`** (I grepped: `grep -rl` over `football-sim-vue/src/engine/` → 0 and 0), so **their harness cannot see my finding at all** — not because it is wrong, but because the pin predates the file.
3. Their note — *"Ernie's survivor list cannot be replicated verbatim on this engine"* — is true as written and **over-general in the write-up**: it reads as a correction of my finding when it is a statement about their scope. **My three sim-layer survivors stand unrefuted and unaddressed.** I would ask for one more mutation set against `86f22d10` (they can extract it with `git archive`, exactly as they did for D2) before either of us calls the box score covered.

### C and E — both done, and C answers my own falsifier
- `STORE-COST-2x2.md`: wrapper tax **36 L (Vue) vs 32 L (Svelte)**; reactive modules 45 L / 52 L → **7 L framework delta inside noise** (their own ±11 L cross-seat noise). My falsifier condition was "if the Svelte reactive module is also ~36 L lighter, the framework claim dies" — it is 32 L lighter, so the Rev 9 sentence ("Vue costs 36 lines more") is dead and they say so. **This is a real correction of their own earlier verdict, correctly reasoned.**
- `SETTLE-RULE-PREREGISTERED.md`: registered before any blind runner, with an explicit applicability clause that bars the author-run data point from voting. **I verified the hash pin**: `shasum -a 256` → `afbf249f4c05fc7c93a1b069db11e676d22e6f8a0b67eff0bfe84a1ddb432268`, which is the value `VERIFY.txt:24` says it must equal. **VERIFIED** — the pre-registration is real and tamper-evident.

### The one gap I could not close
`r51_patch.py --reproduce` needed `council/inkling`'s pre-patch tree and the Rev 6 addendum. They shipped `scripts/fetch-r51-inputs.mjs` for it — but **I did not run it**: it fetches from another seat's branch, and pulling a *pre-patch* tree into my worktree to run a patch script against it is exactly the kind of cross-seat write I should not do unasked. **UNKNOWN**, and I would rather leave it UNKNOWN than report a green I did not earn.

### What I like most
Not the green gates. Two things:
1. **`receipt-falsifier.mjs` and `checksum-counts-falsifier.txt`** — the delivery now ships a script whose job is to *break its own receipts* and show they notice. That is the habit the last two rounds were trying to install, and it is now load-bearing rather than a claim in an errata.
2. **The A5 accident, caught by their own gate.** I put one stray file in the root and the gate said `UNLISTED` and exited 1. A gate that catches the reviewer's mistake is worth more than one that catches the author's.

### Verdict on the verdict
`VERDICT-REV-10-ADDENDUM.md` still lands on **WASH, narrow Svelte lean, no number, no cutover** — and with the settle rule now pre-registered and the author-run data point formally barred from voting, that is the correct place to stand. The next move is not another revision: it is a **blind runner** following `SECOND-AGENT-HANDOFF.md` against the hashed rule.

## Ledger
- VERIFIED (I ran it): manifest gate 1793/1793 + "no unlisted files" exit 0 · empty tree exit 1 · injected file `UNLISTED` exit 1 · `p333-ladder.mjs` leaves the tree clean and the gate green · `hungarian-tie-harness.mjs` 300/300 cost-equal, 25/300 assignment-differs · settle-rule sha256 matches `VERIFY.txt:24` · `checksum-counts-rev10.txt` = 141/144 = the gate's own count.
- VERIFIED (read): A2/A3 wording, D2's planted-error receipt (91/91 exit 0), STORE-COST-2x2 numbers.
- REPORTED-by-receipt (cannot re-run): the Vue build on node 24 (no node 24 here); the four `REV-5.1-addendum/framework-two-arm` builds.
- **Correction to Z.ai's D3 note:** `firstDowns`/`puntYards` are absent at the pin `d3bd81d2` (0 grep hits) but present in `colors/src/sports/nfl/sim/box.ts` at `86f22d10`; my survivors are sim-layer and remain unrefuted.
- UNKNOWN: `r51_patch.py --reproduce` (cross-seat pre-patch tree, deliberately not fetched); all browser/dev-server probes (`probe-battery`, `probe-sealed-week`, `e3-*`, `screenshots-*`); the four framework-two-arm builds.