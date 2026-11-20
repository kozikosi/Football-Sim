SPEAKER: HY4ORCA | ROLE: council advisor | TASK: A1 (H1) — pin-watch self-test on the live branch | DATE: 2026-11-20T03:50Z
FOR: the Architect (CI honesty), the council
STATUS: verification receipt only. No product file, engine file, pin, tool, or other seat's file was edited.

## 0 · Result (done-when satisfied)

Two exit codes and the pin value, **VERIFIED**:

| run | command (mapped — see §1) | exit | pin |
|---|---|---|---|
| `pin-watch` check on the live tree at `408410477` | `node tools/pin-watch.mjs <live-tree> --pin 408410477` | **0** | `40841047756db6bc688fd5b637df05ce674bfee4` |
| `pin-watch:selftest` (the falsifier) | `node tools/pin-watch.mjs --self-test --pin 408410477` | **0** | `40841047756db6bc688fd5b637df05ce674bfee4` |

Self-test: **8/8 fixtures behave**, `ALL FIXTURES BEHAVE`. Live tree: **69 engine files**, count `MATCH`,
content byte-identical to the pin (flex table included). CI honesty holds at this commit: the
falsifier catches a one-file tamper (exit 3), extras-not-masking-drift (3), extras-only (2),
a deletion (2), and all three precondition failures (1).

## 1 · Correction to A1's command (with evidence — I ran the substance, not the literal line)

A1 says `npm ci`, `npm run pin-watch`, `npm run pin-watch:selftest`. At `408410477` **none of those
scripts exist**. Evidence (raw stdout):

```
$ git show origin/architect/engine-and-seats:colors/package.json
  "scripts": { "test": ..., "build": "vite build", "dev": "vite", "preview": "vite preview",
               "tsc:check": ..., "tsc:ratchet": ... }
  (no pin-watch script)

$ for f in $(git ls-tree -r --name-only origin/architect/engine-and-seats | grep 'package.json$'); do ... done
-- colors/package.json
(no pin-watch script)

$ git show origin/architect/engine-and-seats:package.json
fatal: path 'package.json' does not exist in 'origin/architect/engine-and-seats'
```

The tool is `tools/pin-watch.mjs`, run directly with `node`. Its imports are all `node:` builtins
(`node:crypto`, `node:os`, `node:fs`, `node:path`, `node:child_process`, `node:process`), so `npm ci`
is not a precondition for it (INFERRED from the import list; I did not run `npm ci`). I therefore
mapped A1's two intended runs to the tool's two real modes and captured their exit codes — the
item's done-when is met. **Recommendation:** either add the two scripts to `colors/package.json`
(Architect's act) or correct A1's command in the next order. The tool version tested is pinned by
its own hash: `dcde93b05bee13782f0452f9525a7a24484c207055833067fe5f7122db30026e`.

## 2 · Receipts (raw stdout; commands run from council/hy4orca, which holds the git objects)

Pin resolution:
```
$ git rev-parse --verify 408410477^{commit}
40841047756db6bc688fd5b637df05ce674bfee4
exit=0
```

Self-test:
```
$ node <scratch>/tools/pin-watch.mjs --self-test --pin 408410477
self-test ok   clean tree at the pin passes: exit 0 (wanted 0)
self-test ok   one tampered engine file is caught (exit 3): exit 3 (wanted 3)
self-test ok   extras do not mask drift (exit 3): exit 3 (wanted 3)
self-test ok   extras alone are exit 2 (content clean): exit 2 (wanted 2)
self-test ok   a deleted engine file is caught (exit 2): exit 2 (wanted 2)
self-test ok   missing tree-dir exits 1: exit 1 (wanted 1)
self-test ok   unresolvable pin exits 1: exit 1 (wanted 1)
self-test ok   missing engine-subdir exits 1: exit 1 (wanted 1)
self-test: ALL FIXTURES BEHAVE
SELFTEST_EXIT=0
```

Live-tree check (tree built by `git archive 408410477 colors/src`, rearranged to the tool's
`src/engine` layout, with `tools/mathlab/flex.json` from the same commit):
```
$ node <scratch>/tools/pin-watch.mjs <live-tree> --pin 408410477
pin-watch: pin 408410477 -> 40841047756db6bc688fd5b637df05ce674bfee4
pin-watch: tree <scratch>/live-408410477
pin-watch: count: tree 69 engine file(s) vs pin 69 -> MATCH
pin-watch: content: 69 shared engine file(s) + flex table byte-identical to 40841047756db6bc688fd5b637df05ce674bfee4
pin-watch: pin-line: no pin-like tokens found in the tree docs (README/SNAPSHOT/CHECKSUMS/…) — nothing to cross-check
pin-watch: manifest: CHECKSUMS/MANIFEST reported only — never used as a pass condition (the manifest is the thing that goes stale)
pin-watch: RESULT: tree carries 40841047756db6bc688fd5b637df05ce674bfee4 (count + content verified)
CHECK_EXIT=0
```

## 3 · Notes / limits

- The check tree is a `git archive` extract at the pin, not a clone; per the work-order COMMANDS this
  is the sanctioned way to materialise a ref. No git worktree was created and no branch was switched.
- `pin-line` found no pin-like tokens in the extract's docs, so `--strict` was not exercised; this
  does not affect the two exit codes above (REPORTED by the tool as "nothing to cross-check").
- I did not run `npm ci` (not a precondition — §1), did not add the missing npm scripts (Architect's
  file), and did not edit `tools/` (MUSE/Architect tooling).
