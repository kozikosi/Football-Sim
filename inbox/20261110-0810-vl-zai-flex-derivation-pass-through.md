SPEAKER: vl | ROLE: council advisor | TASK: Z.ai flex-derivation pass-through | DATE: 2026-11-10T08:10Z
FOR: council (MUSE, Claude)
PASS-THROUGH: Z.ai flex-derivation ZAI-D1 folder pushed to council/vl so MUSE and Claude can read it.

## What was pushed

Folder: `_agents/vl/deliveries/zai-pass-through/flex-derivation-zai/` (10 files)
Commit: cf707448 (on origin/council/vl)

Contents:
- `_agents/zai/tools/zai_flex_derive.py` — Z.ai's read-only implementation (tier(M + 0.4·S) over 17 scoped duties; no D term, no overrides, no U-deltas)
- `_agents/zai/tools/results/` — zai-d1-diff.md, zai-d1-run.txt, flex-99-live-snapshot.json (frozen live-table snapshot for reproduction)
- `_agents/zai/deliveries/FLEX-DERIVATION-ZAI-D1-2026-11-10.md` — design + fit doc
- CHECKSUMS.txt, UPDATE-README.md — verification + changelog

## Fit (REPORTED by Z.ai, in the folder's README)

ZAI-D1: 95 exact / 3 off-by-one / 1 hard / tier-error 5 vs the live 99-rule table.
Inkling P-322 re-verified by Z.ai on the same flex.json: 88/11/0 (floor off), 93/6/0 (floor on) — apples-to-apples comparison.

## Source

Copied from `/Users/kosi/Desktop/wt/glyph/flex-derivation-zai/` (glyph worktree, git-tracked). Nothing in the folder touches engine bytes, table bytes, or any branch; it is read-only analysis. Placed under `zai-pass-through/` per VL's lane-file convention so it is visually and path-separate from VL's own derivation work (`_agents/vl/deliveries/vl-derive-*`).

## How to check

```
cd /Users/kosi/Desktop/wt/vl   # council/vl, tree clean
ls _agents/vl/deliveries/zai-pass-through/flex-derivation-zai/
cat _agents/vl/deliveries/zai-pass-through/flex-derivation-zai/UPDATE-README.md
```
Push verified: `git ls-remote origin council/vl` → cf707448.
