# tests/CONTRACT.md — shared interface contract for the Round-1 harness

> Adopted from GPT's S-501 finding: _a spec that assumes an interface it hasn't verified produces integration surprises_ — first live example was S-502's own script-location assumption. One place where the settled conventions live, so nobody guesses again. Normative for every script in `tests/` and for the implementer building them (the COLLECTIVE-PROMPT.md workflow applies — tooling changes go through submissions and verification like everything else).

**Version 2 · 2026-10-19 · amended by the implementer's Round-1 pre-dispatch rulings (B1–B4 of `rulings_r1_predispatch.md`, applied to the files by GLM at the user's instruction). Version 1 + C8 was the pre-flight state. Applies to build `77bb9ed5…`.**

## C1 — File locations

- All harness scripts live in **`tests/`**: `tests/pw4.js` (S-102), `tests/validate.js` (S-502), `tests/phone.js` (S-401), `tests/run_all.sh` (S-301), `tests/funcdiff.js` (S-103), plus the data and state files `tests/2025_standings.js` (S-203), `tests/baseline.json` (S-102/S-202 procedure), `tests/manifest.txt` (S-202). No scripts at the project root.
- Every path inside a `tests/` script resolves **`__dirname`-relative** — never process.cwd(). The product file defaults to the path that assumes the standard layout (`../NFL Draft Simulator.html`), overridable by `argv[2]`; a missing file is a hard error (exit 4), not a fallback walk.
- Node core modules only (`fs`, `path`, `vm`); `run_all.sh` uses only `sh` + `node`. No installs, no network — $0 budget stands. The pre-existing `tests/madden-sim.spec.js` is untouched by Round 1.

## C2 — Product extraction (SIM-CORE boundary — ruled B1)

- The product file bounds its shared core with the marker comments from S-202: `/*SIM-CORE-START*/` and `/*SIM-CORE-END*/`. Each appears **exactly once**.
- Inside the markers: all shared data (`PLAYERS`, `TEAM_DATA`, `DEFAULT_WEIGHTS`, `ROSTER_SLOTS`, `FLEX`, `NATURAL_SLOT_MAP`, `SLOT_GROUP`, `POS_SLOT_MAP`, `SEASON_RECORD_CAPS`, `PER_GAME_CAP`, `POINTS_PER_WIN`), module-level state and caches (`seasonState`, `draftSim`, weight caches), the pure math, and the three **DOM-free entry points** — `buildDraftState()`, `simulateDraftHeadless()`, `buildLeagueFromDraft()` — moved verbatim per S-102.
- **Boundary proof is at run time, not by text count.** A static "zero `document.` in the slice" assertion is unsatisfiable on this build (math and UI interleaved). Ruled semantics:
  1. Markers appear exactly once; the slice must parse (`node --check` equivalent via `new vm.Script`). Failure → **exit 3**, naming the problem.
  2. The slice is evaluated in a `vm` context in which `document`, `window`, `localStorage`, `sessionStorage`, `location`, `navigator` are accessors that throw `DOMAccessError(name)`. `Math.random` is replaced by the seeded generator inside that context (no product change).
  3. Each required entry point must exist as a function after evaluation, then be executed under the guard (`buildDraftState`, `simulateDraftHeadless`, `buildLeagueFromDraft`, plus a full seeded season / 100-season run in `pw4`). Missing symbol, `ReferenceError` for an out-of-slice helper, or any `DOMAccessError` → **exit 3**, naming the symbol/accessor. Fix for a missing helper = a behavior-preserving move of that helper inside the markers — never a UI refactor.
  4. The static count of `document.`/`window.` text in the slice is printed as `INFO dom_text_refs=N` and recorded in the manifest; growth versus the manifest is a warning, not a gate.
- The extraction definition is shared wherever it is used; scripts that never evaluate the core (`phone.js` static lint, `funcdiff.js` code-only differ) skip the extraction entirely. A missing marker or a missing entry point is an **extraction failure: exit code 3** — never guess a fallback; a boundary failure must look like a boundary failure, not like a weird number.

## C3 — Ground-truth dataset

- `tests/2025_standings.js` (S-203) exports an array: rows of `[teamName, wins, losses, ties, pointDiff]`, names exactly matching `TEAM_DATA` keys. Sources and integrity checks are logged in S-203; verified signatures for judging the sim's claims live with `validate.js` (S-502), which also runs its own 10 integrity checks with **exit 2** on violation — the dataset itself carries no self-checks.
- If the data is ever revised (correction, new source), the file is replaced and S-203's Status line is updated; consumers don't change.
- Comparison basis (S-502): per-team **wins projected by the sim vs the real 2025 wins** — the engine generates its own schedule, so real matchups are not replayed (S-502 §B stands).

## C4 — Per-script norms and exit codes (ruled B2)

- Pointers: `pw4.js` → S-102 · `validate.js` → S-502 · `phone.js` → S-401 · `run_all.sh` → S-301 · `funcdiff.js` → S-103.
- Shared behaviors all scripts adopt: `--help` prints a one-screen usage summary; stdout stays parseable, final line `PASS <name>` or `FAIL <name> <reason>`.
- **League-wide exit codes**, for every script in `tests/`: `0` pass · `1` validation/lint finding (numbers, drift, overflow) · `2` data-integrity violation (dataset checks, manifest mismatch, **missing or invalid baseline**) · `3` extraction/boundary failure (C2) · `4` usage error, missing input file, unparsable input.
- **The entry-wins precedence rule is repealed for exit codes and status-line grammar.** If a filed entry disagrees, the contract wins and the conflict is reported at assembly — a script may not silently redefine a code. Consequence (ruled): S-301's phone.js `exit 2 = usage/parse` amendment is **superseded** — `phone.js` uses `1` for findings and `4` for usage/parse. Output-line _text format_ remains per-entry. Any future exception requires a numbered amendment here.

## C5 — Run order + aggregation (`run_all.sh`, S-301 — ruled B3)

0. **Environment/identity**: print the product file's sha256 and compare with `STATUS.md` (mismatch → **exit 4**, "wrong build").
1. `node --check` on the extracted core
2. `manifest.txt` presence + function-name check (S-202 item 6)
3. `pw4` — runs its drift gate only when `tests/baseline.json` exists; when absent it exits **2**, and `run_all.sh` reports `PW4: BASELINE-ABSENT (exit 2)` — never a pass.
4. `validate` (external 2025 gate, S-502)
5. `phone` (static 390px lint, S-401)

Steps for scripts not yet delivered print `<NAME>: SKIPPED (not delivered this round)` and make the overall line `RUN_ALL: PARTIAL` — never `PASS`. The run order is locked; additions go to the end of the list and require a version bump here. `run_all.sh` no longer prints the `FUNCDIFF:` line — funcdiff is verifier-invoked only (C6/B4).

## C6 — Ownership, baseline and funcdiff procedure (ruled B4)

- `tests/` scripts are tooling, not product, but they follow the same submission workflow: changes go through each author's own section in `SUBMISSIONS.md`, get verified before shipped, and the verifier's function-diff covers them (AGENTS.md gate).
- **Reference build**: the certified build whose sha256 is recorded in `STATUS.md`.
- **Bootstrap (verifier session only)**: `node tests/pw4.js --write-baseline` against that build. The command **refuses to overwrite** an existing baseline (exit 2) except with `--replace-baseline <ruling-ID>`, which logs the ID inside the file.
- **Validate**: the file records build sha256, seed, Node version, sample sizes (drafts × seasons) and tolerance bands; an immediate second run with the same seed must reproduce the same numbers exactly (else the harness is non-deterministic → fix before freezing).
- **Freeze**: the user records `baseline.json`'s sha256 in `STATUS.md`. Regeneration is an explicit ruling, and mandatory re-measurement follows any accepted change to weights/MC/PLAN_K (C8.2). Until frozen, `run_all` reports pw4 as **UNGATED**; Round 1A may not claim any statistical regression gate.
- **funcdiff belongs to the independent verification procedure, not routine `run_all.sh`** (the runner cannot know the predecessor). Reference = the previous certified build named in `STATUS.md`, identified by sha256 in the report; the script asserts reference ≠ candidate hash (else **exit 4**) and prints both hashes. Expected-changed set must equal the union of the accepted entries' touched functions; for Round 1A (markers + moves) it is the functions physically moved/wrapped, listed in the implementer's manifest.
- This contract is maintained by the queue-maintainer (currently GLM); unsettled interface questions go back to the implementer (Claude) for arbitration.

## C7 — Entry-point signature check (carried into the Round-1 build)

- Before `validate.js`'s numbers are trusted, the implementer confirms the three C2 entry points exist with the S-102-quoted signatures in the extracted build (GPT's "verify actual headless signatures" recommendation) — part of the verifier's five-line report, not a separate gate.

## C8 — Preflight findings (19 Oct; disposition after the rulings)

1. ~~Exit-code-2 collision (Nemo Super, preflight).~~ **RESOLVED by B2**: league codes stand; `phone.js` uses `1` for findings and `4` for usage/parse; the S-301 exit-2 amendment is superseded and recorded here.
2. **U-13 / S-502 coupling (Nemo Super, preflight).** If the U-13 weights audit changes `DEFAULT_WEIGHTS` (protected — user's conditional approval already on record), `validate.js`'s published targets (r ≈ 0.66, ρ ≈ 0.69, RMSE ≈ 2.6) shift with it: those numbers describe the _current_ weights. After any accepted weights change, the validate targets/baseline must be **re-measured, never carried over** (B4.4 makes this rule for the baseline too).
3. **S-301 threshold (iii) ↔ U-17 watch item.** phone.js's `white-space: nowrap` threshold and the U-17 League-Leaders overflow fix may complement or collide; reconcile before U-17 ships — the 1B acceptance list carries this.
