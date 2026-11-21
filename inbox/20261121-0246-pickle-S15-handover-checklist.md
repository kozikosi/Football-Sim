SPEAKER: pickle | ROLE: council seat | TASK: exact hand-over verification checklist for the S15 "slices done" gate | DATE: 2026-11-21T02:46Z
FOR: S15 (supplementary work order item 2)

IDEA: a runnable checklist, not an opinion. Run it when Z.ai reports "slices done", before the Architect merges. Every line has a command (or a byte check) and an expected result. A failed line blocks the merge; it does not get waived by a green total.

Assume Z.ai's tree is at `$Z` (his pushed `council/zai` tip checkout, or the unpacked zip). Engine pin `408410477`. Source of truth for floors: the S14 hosted tree, which I re-read this sitting.

## 0 · Provenance of the artifact
```
git -C "$Z" rev-parse HEAD                       # a pushed commit hash, not a sandbox path
git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 ls-remote origin refs/heads/council/zai
```
EXPECT: local HEAD == remote tip. If no push credentials, EXPECT a zip in `deliveries/` plus a `sha256sum` receipt and a named path — a bare "it's on my disk" is NOT delivered (§1 delivery gate).

## 1 · Package integrity (final bytes, not a mid-sitting snapshot)
```
cd "$Z" && node tools/verify-package.mjs .
```
EXPECT: every entry OK, converse clean, exit 0, run at the FINAL bytes; `CHECKSUMS.txt` regenerated after the last edit. Any stale checksum = FAIL.

## 2 · Engine frozen — byte-identical, zero drift
```
cd "$Z" && git diff --name-only 408410477 HEAD -- colors/src
cd "$Z" && for f in $(git ls-tree -r --name-only 408410477 -- colors/src); do
  git show 408410477:"$f" | shasum -a 256 | cut -d' ' -f1
  shasum -a 256 "$f" | cut -d' ' -f1
done | awk 'NR%2==1{a=$0} NR%2==2 && a!=$0{print "DRIFT", a, $0}'
```
EXPECT: empty diff, zero DRIFT lines, 69 engine files (S14's own `HANDOFF-SNAPSHOT-2026-11-20.md:16` "zero" claim is the model). A single changed engine byte blocks the merge regardless of any green gate.

## 3 · Battery floors — S14 receipts, re-run on the S15 tree
From `scripts/acceptance-run.sh` and the S14 receipt set (REPORTED — a later seat must re-run; do not inherit the numbers):
engine 430/430 · node 35/35 · board **19/0** · visual **18/0** · slot 28/0 · shell 48/0 · slice 29/0/10/3 · contrast 2/0 · viewport 45/45 · golden **MATCH**.

**S15 exception (NEW — see `inbox/20261121-0244-pickle-S15-fact-verification.md`):** board/visual totals are only meaningful if the law list is re-quoted. L23 ("the ringed rows' one-click button carries the ported w89 pulse") has no subject once the ring is removed; F26 mutates a `.cp-suggest`-dependent rule. EXPECT the receipt to name the NEW laws (top-three still in the button, why-copy persisted, no-display-parse preserved) and each mutant DIED by its new law. An S15 board line that still says "L23 … ringed rows …" is INVALID. v8's 16/0 and 17/0 are S13 numbers — reject them.

## 4 · Named-law falsifiers
```
cd "$Z" && node --import ./scripts/node-port-register.mjs scripts/falsify-board.mjs
```
EXPECT: exit 0; every staged mutant prints `DIED — FAIL <L…>` for its own named law; child logs under `deliveries/receipts/partH-<next>/`; zero `TAUTOLOGY` lines. The carried set is F15 (L8), F17 (L10), F18 (L11), F19 (L12), F20 (L13), F21 (L14), F22 (L15), F24 (L24), F25 (L25 as re-scoped), F26 (L23 as re-scoped or replaced). F13/F14/F16 are SUPERSEDED. Failure action: block merge; the Architect decides law wording, not Z.ai.

## 5 · Composite complete
```
cd "$Z" && bash scripts/acceptance-run.sh
```
EXPECT: prints `ACCEPTANCE RUN COMPLETE`; steps 13b-17 each recorded in `ACCEPTANCE-RECEIPTS.txt` with `EXIT_CODE=0`; no `PARTIAL` in the status file. S14 was PARTIAL at 13b (`VERIFY-§26-append.txt:38-48`) — that is the exact gap to close. Failure action: if a step legitimately cannot run, name it and the missing tool; do not mark the composite complete.

## 6 · Seam golden and dist artifacts
```
cd "$Z" && node scripts/golden-seam.mjs            # EXPECT MATCH
cd "$Z" && sha256sum batteries/seam-golden.json    # EXPECT e8fed8ab7ca1493b7dd20298fa2e85947188bed7ecc1d6f865b187ead1e024e8 unless a deliberate, receipted re-pin
cd "$Z" && sha256sum dist/index.html dist/single.html  # two forms, each recorded
cd "$Z" && (cd dist && zip -r ../<name>.zip .) && sha256sum <name>.zip
```
EXPECT: all three artifacts exist with recorded sha256; `dist/single.html` is the self-contained offline form (hard requirement); no CDN, no paid API, no split build. Failure action: block make-live.

## 7 · Wiring, undo, and errors
EXPECT receipts for: W14 both directions (the leg-A selector moved off `.cp-quick` to the refactored button — `visual.battery.mjs:292`); L-ERR both halves; no console errors across START → 3 picks → UNDO → reload/LOAD → finish; six `__cp` keys and both LOAD calls still present per the dispatchAsync contract; the single visible Draft button dispatches immediately while the expander remains a separate control (`BoardRow.svelte:25` vs `:47`); all six battery selector sites re-pointed (`:98,:175,:199,:206,:230,:292`).

## 8 · Stale text to fix in Z.ai's tree (do not edit from this seat)
`scripts/acceptance-run.sh:41` "expect 16/0", `:43` "expect 17/0", `:52` "F0-board clean baseline 16/0" are S13 numbers. Relay to Z.ai with this file; he owns his tree.

## 9 · Then, in order
Verifier files the result → Architect merges and runs gates 1-10 → Owner views the filed side-by-side (see `inbox/20261121-0248-pickle-S15-side-by-side-spec.md`) → Owner alone decides make-live. A failed checklist line stops this chain at that line.

EVIDENCE: VERIFIED for refs, byte sites, floor sources, stale lines, seam hash and the S14 PARTIAL state; the gate results themselves are REPORTED until a later seat re-runs them on Z.ai's final tree.
