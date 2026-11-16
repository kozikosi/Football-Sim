SPEAKER: inkling | ROLE: council | TASK: CAKEPANZ assist, Pt 2 rehearsal artifact — the merge-day seam gate (Part 15-class, drop-in) | DATE: 2026-11-16T22:30Z
FOR: R-13

# Cakepanz — the merge-day seam gate, built, falsified, and dropped into the lane (Part 2 rehearsal / Part 15 asset)

**Unblocks:** Claude's merge-day sequence (run one command, get a PASS/FAIL table) and the Owner's "is it mergeable?" ruling on merge day. **No engine edit; an audit, not an editor.** Plain node ESM (`node:fs`, `node:crypto` only) — framework-free by construction; no TypeScript needed at this size; runs anywhere node ≥ 18 runs.

## The artifact (in my lane, pushed)

`_agents/inkling/deliveries/cakepanz-merge-gate-2026-11-16/seam-check.mjs`
`_agents/inkling/deliveries/cakepanz-merge-gate-2026-11-16/seam-inventory.example.json` (10 VMs pinned at `d3bd81d2`, hashes from `git archive`)

Contract: reads a seam inventory (`{entries: [{vm, file, sha256}]}`), resolves each `file` against a `--engine <colors/src root>`, and prints PASS/FAIL per VM with the sha256; **exit 0 iff all match, 1 on any mismatch/missing, 2 on usage error.** It does not edit, does not know git, does not know frameworks.

## The three receipts (VERIFIED 2026-11-16)

**A. Against the live gh-pages tree (the post-re-pin state):** `10 VM(s) checked · 10 pass · 0 FAIL` → **exit 0** — the live deployment IS at `d3bd81d2` byte-wise.

**B. Against the s5 delivery (the stale pin):** `7 pass · 3 FAIL` → **exit 1** — `draft.ts`, `flex.ts`, `slots.ts` mismatch; the other seven (boardVM, goneOdds, selectors, league, store, saves, seasonrun) are UNCHANGED between the pins, which is also the machine-verified explanation for why the battery survived the swap.

**C. Falsifier (1 byte flipped in `goneodds.ts` in a throwaway copy):** → `FAIL goneOdds … e4a20fd6… != 90c8f44c… · 9 pass · 1 FAIL` → **exit 1**, naming exactly the VM whose guard broke. A green exit is therefore meaningful, not structural.

## What it is NOT (scope honesty)

- Not a build of Z.ai's seam: there is no seam in the shell to check against yet — the inventory example is MINE (from the pin), and it maps VMs→files by the snapshot's layout (`boardVM` → `sports/nfl/view/draftBoard.ts` — corrected after I initially mis-guessed `goneOdds`'s home; it lives in `sports/nfl/engine/goneodds.ts` with the call site in `app/selectors.ts`). **Z.ai's handoff must ship the real inventory; then this file runs unchanged on it.**
- Not a full merge rehearsal: it verifies bytes at the pin, not semantics. Semantics are the battery's job (see my Part 7 filing).
- Tested on macOS/node 26 only; node ≥ 18 assumed by the API used.

## How to apply on merge day

```
git archive <pin> colors/src | tar -x -C /tmp/pincheck
node seam-check.mjs --inventory seam-inventory.json --engine /tmp/pincheck/colors/src   # expect exit 0
diff -rq <shell>/src/engine /tmp/pincheck/colors/src                                     # expect empty
```

Integrity note: `seam-inventory.example.json` hashes are recomputed by the checker itself on each run — the inventory is input data, not an assertion.
