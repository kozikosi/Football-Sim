SPEAKER: orcatide | ROLE: council advisor | TASK: A1 — pin-watch self-test (H1, track A, sitting v3) | DATE: 2026-11-20T04:01Z

A1 executed: the pin-watch self-test at the Architect's pin (origin/architect/engine-and-seats @ 408410477). The Architect asked for exit codes + sha lines; both are in WHAT I RAN.

## WHAT I RAN (receipts — every read/run, nothing assumed)

- `git rev-parse --verify 408410477^{commit}` — VERIFIED (exit 0): `40841047756db6bc688fd5b637df05ce674bfee4` — the pin resolves in this repo's object store.
- `git show origin/architect/engine-and-seats:tools/pin-watch.mjs` — VERIFIED: 285 lines, the architect tree tip's tool (v9-era tool, P-355).
- `node <pin-watch.mjs> --self-test --pin 408410477` — run from the council worktree `/Users/kosi/Desktop/wt/orcatide` (branch `council/orcatide`; the tool needs only a repo object store + `node`/`git`/`tar`) — VERIFIED, exit 0:
  ```
  self-test ok   clean tree at the pin passes: exit 0 (wanted 0)
  self-test ok   one tampered engine file is caught (exit 3): exit 3 (wanted 3)
  self-test ok   extras do not mask drift (exit 3): exit 3 (wanted 3)
  self-test ok   extras alone are exit 2 (content clean): exit 2 (wanted 2)
  self-test ok   a deleted engine file is caught (exit 2): exit 2 (wanted 2)
  self-test ok   missing tree-dir exits 1: exit 1 (wanted 1)
  self-test ok   unresolvable pin exits 1: exit 1 (wanted 1)
  self-test ok   missing engine-subdir exits 1: exit 1 (wanted 1)
  self-test: ALL FIXTURES BEHAVE
  exit: 0
  ```
- `node --version; npm --version` — VERIFIED: node v26.13.0, npm 11.20.0.

## WHAT I FOUND (labelled)

- The exit-code contract in the tool's header holds at the pin: the falsifier (`--self-test`) builds fixtures — a clean extract of `colors/src` at the pin (expect 0), one tampered engine file (expect 3), tampered + extra (expect 3), extras only (expect 2), a deleted engine file (expect 2), and three precondition failures (missing tree-dir, unresolvable pin, missing engine-subdir, each expect 1) — and all eight behaved as expected ("ALL FIXTURES BEHAVE", exit 0).
- Deviations from the sitting text, with reasons: no clone was made — the sitting's "clone at 408410477" describes where the Architect runs it; the pin resolves in the council worktree, so the falsifier ran there and the tool's fixtures do the `git archive` of the pin internally. `npm ci` was not run — the self-test invokes the tool directly with `node` (fixtures use `git archive`/`tar`/`mv`); the architect tree has no root `package.json`, so `npm run pin-watch` has no script to run (`colors/package.json` scripts: test, build, dev, preview, tsc:check, tsc:ratchet) — the tool's `--self-test` mode is the falsifier. A live check-mode run (`node tools/pin-watch.mjs <tree-dir> --pin 408410477`) is the Architect's next step, not a council item.

## WHAT I DID NOT CHECK (UNKNOWNs)

- The real check mode against a live tree (the Author's tree) — left to him; the self-test is the falsifier the tool itself ships.
- `npm ci` in a clone at 408410477 — not run (see deviations).

## VERDICT

A1 done: self-test ALL FIXTURES BEHAVE, exit 0, pin line `408410477 -> 40841047756db6bc688fd5b637df05ce674bfee4` (the sha line is receipt 1 above). Receipt for the Architect.
