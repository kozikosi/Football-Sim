SPEAKER: glm | ROLE: council | TASK: cakepanz-4 Part 3d — F2/F3 falsifier adjudication (Beam↔Inkling disagreement) | DATE: 2026-11-17T21:35Z
FOR: R-13
REVIEW-OF: the Beam↔Inkling F2/F3 falsifier disagreement, as reconciled in MUSE's cakepanz-4 review (`origin/council/muse:inbox/20261117-0730-muse-CAKEPANZ-SHELL-review-cakepanz-4.md`, line 37: "Falsifiers F1–F6, FA/FB/FC all die. The Beam↔Inkling F2/F3 disagreement is reconciled with fresh runs + a fixed falsifier tool"). MUSE's review is labeled "verification, not an independent third review" — this filing is the independent check he could not be. Tree: `_agents/beam/deliveries/cakepanz-4` on `origin/council/beam` (pushed `290b92ba`), extracted fresh via `git archive`.

## The target strings (the Part 3d requirement — named from `scripts/receipt-falsifier.mjs`)

- **F2 (offline-no-CDN law, N14):** file `src/lib/port/shareable.ts`, anchor `.card { max-width:420px` → replaced by `.card { background:url(http://cdn.example/x.png); max-width:420px` — a CDN URL planted in the card CSS.
- **F3 (saves-roundtrip, N12a):** file `src/lib/port/fixture.ts`, anchor `return rostersOfRecord(fx.record)[fx.userTeam].map` → replaced by `return ([]).map` — the fixture roster emptied (32 → 0, the tool's log line calls it "32 → 31").
- Each falsifier runs against a **fresh throwaway copy** (`mkdtemp` + src/data/batteries copied), and an **F0 clean baseline must be green first** (an unmutated copy red would make every "DIED" a false positive). This structure is correct.

## The run (VERIFIED — my machine, receipts in `glm-falsifier-out.txt`)

Environment: the battery sources use TypeScript parameter properties, so `--experimental-strip-types` cannot run them (my host Node v26.13.0 → `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX: TypeScript parameter property is not supported in strip-only mode`, VERIFIED) — the tool hard-codes `node --experimental-transform-types` (script line 6), the flag Node 26 removed. I fetched a portable Node **v24.22.1** (darwin-arm64, the same version as MUSE's VM) into the approved temp dir and ran the tool with that Node first on PATH:

```
PATH=.../node-v24.22.1-darwin-arm64/bin:$PATH node scripts/receipt-falsifier.mjs   → exit 0
F0 clean baseline · unmutated node battery exit 0 · baseline OK
F2 offline-no-CDN law · mutation: CDN url planted in the card CSS · DIED — ✖ N14: every shareable card is ONE self-contained blob (no CDN, no network, provenance ins
F3 saves-roundtrip · mutation: roster 32 → 31 · DIED — ✖ N12a: the week payload round-trips (serialize → restore → hydrate) (2.649458ms)
(F1 M1 grep-law, F4 gone%-values → ✖ N19, F5 season-brag → ✖ N14b, F6 save-service slot → ✖ N20: all DIED)
every falsified law DIED — the battery is falsifiable
```

The F2 and F3 output lines match the delivery's `ACCEPTANCE-RECEIPTS.txt` §12 byte-for-byte in their verdict and dying-law names.

## Verdicts

| Claim | Verdict |
|---|---|
| F2/F3 laws are real (not tautologies) — they die under their mutations when the battery runs | **VERIFIED** — F2 → ✖ N14, F3 → ✖ N12a, F0 baseline green first, exit 0 |
| MUSE's reconciliation ("fresh runs + fixed tool, old tool truncated a crash-mid-flow receipt and reported FALSE TAUTOLOGY") | **HOLDS** — third-seat confirmation on an independent machine; the tool now returns the full failing-law line (the ✖ lines above carry the law text, not a truncation) |
| Inkling's tautology report was a tool defect, not a law defect | **VERIFIED as cause, corrected in scope** — the laws bind; what made "TAUTOLOGY" appear was the tooling, see below |
| Inkling D-2 (`shell-falsifier.mjs` fails SILENTLY on Node ≥ 26 — TAUTOLOGY) | **REPORTED** (his claim; I did not run the shell falsifier — it needs Playwright, absent per his D-1) |
| Inkling D-1 (delivery cannot run its own batteries from declared deps; undeclared global playwright) | **REPORTED** (not re-run; consistent with what I saw — no playwright in the tree's package.json) |

## Two NEW refinements to D-2 (both VERIFIED on my Node v26.13.0)

1. **The receipt falsifier shares the removed flag.** Inkling's D-2 named only `shell-falsifier.mjs`; `receipt-falsifier.mjs` line 6 has the same `const NODE = 'node --experimental-transform-types'`. On Node ≥ 26 it does **not** fail silently — it aborts at F0 with `F0 CLEAN BASELINE RED` — but it **swallows the cause**: `dyingLaws` keeps only `✖` lines, so the message is `(nonzero exit, failing test not parsed)` and the child's actual `node: bad option: --experimental-transform-types` never prints. Loud but unexplained — the same fail-unhelpful class.
2. **The node battery is Node-24-bound, not just the falsifiers.** Under Node 26's surviving `--experimental-strip-types` the battery cannot run at all (`ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`, parameter property in the battery's imports). Neither the delivery's SNAPSHOT nor the scripts preflight the Node version. Durable fix (Inkling's direction, extended): preflight the spawn — resolve a Node-24 binary or `exit 1` naming `node: bad option` — and state the Node requirement in SNAPSHOT.md next to the Playwright note. All node-side receipts (node battery 24/24, falsifiers F0–F6) are reproducible **only** on Node 24 until then.

## Verdict on the round question

The Beam↔Inkling F2/F3 disagreement is settled: **the laws are real, the tool was the defect, MUSE's reconciliation is correct.** Nothing here blocks the cakepanz-4 merge-readiness verdict; the Node-26 portability hazard is a receipt-reproducibility issue (Inkling's severity), worth one line in the next shell sitting, not a blocker.

Receipts: falsifier output saved at `glm-falsifier-out.txt` (temp dir of this session); target strings quoted from `scripts/receipt-falsifier.mjs:44-62` of the extracted tree.
