# REGEN-MANIFEST.md — re-cutting the four pass-through branches (for KG/MUSE; Rev 9 Part E)

**This file is for the fold. Z.ai never pushes a branch (no credentials; the sandbox cannot push) —
KG/MUSE re-cut the branch NAMES on GitHub from the zip, exactly as in Rev 8.**

## The four numbered steps (rev9-pass-a…d folds to one tree per branch)

1. **Extract the zip** to a scratch dir; the delivery root IS the tree (it contains DELIVERY-NOTE.md,
   MANIFEST.txt, CHECKSUMS.txt, VERIFY.txt, RECEIPT.md, verified-as-of.json, REV-9-ERRATA.md,
   scripts/, receipts/, flip-bench/, football-sim-vue/, football-sim-svelte/, REV-5.1-addendum/, …).
2. **Init and commit ONE tree**: `git init && git add -A && git commit -m "zai fresh-start rev9 (2026-11-16)"`.
   The EXCLUSION RULES before `git add` are exactly: `node_modules/` (never shipped), `.git/` (the
   scratch repo's own metadata — nothing from the zip), `dist/` (build state), and the root
   `CHECKSUMS.txt` is EXCLUDED from MANIFEST.txt's coverage but SHIPS in the tree (it pins
   MANIFEST.txt — a manifest cannot pin its own pin). Do not add anything else to the exclusions.
3. **Cut the four branches from that ONE commit**: `git branch rev9-pass-a`, then `rev9-pass-b`,
   `rev9-pass-c`, `rev9-pass-d` — each carries THE SAME tree byte-identical by construction
   (`git rev-parse rev9-pass-a^{tree} …` → four IDENTICAL tree hashes; that check is the fold's gate).
4. **Run the gate that must go green after the fold**: `node scripts/gate-manifest.mjs .` →
   **PASS** (exit 0). It verifies EVERY CHECKSUMS.txt/MANIFEST.txt in the tree, including the
   regenerated nested `REV-5.1-addendum/CHECKSUMS.txt` (360/360, re-verified by
   `shasum -a 256 -c CHECKSUMS.txt` run from inside `REV-5.1-addendum/`, exit 0) and the two repos'
   own `CHECKSUMS.txt` (the bench-critical pins added in Rev 9 Part 0).

## The regenerated-number claim this fold must carry

The root `MANIFEST.txt` in this zip was regenerated over the FINAL Rev 9 tree — **N entries, all OK**
(VERIFY.txt §1 states the exact count; the gate's PASS line is the authority: "GATE RESULT: PASS — N
entries verified across M manifest(s)"). The Rev 8 claim lineage it supersedes: 658 (stale, pre-recount)
→ 659 (the actual Rev 8 manifest's sha-row count) → **N = the final Rev 9 count** (this zip's
MANIFEST.txt line count; re-verify with `grep -cE '^[0-9a-f]{64} ' MANIFEST.txt` — the count must
match BOTH the file and the gate's output line).
