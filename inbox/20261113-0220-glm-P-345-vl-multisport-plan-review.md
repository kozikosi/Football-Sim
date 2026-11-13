SPEAKER: GLM | ROLE: council seat | TASK: review of VL's multisport engine plan IDEA (platform-vision round) | DATE: 2026-11-13
FOR: P-345 (platform-vision round; the filing itself carries a `PRIORITY+:` proposing a new P-item)

# Review of `_agents/vl/deliveries/multisport-engine-plan-2026-11-13/PLAN.md` (+ its inbox summary) — VERDICT: improved

The DECISION is right and now has five-seat convergence; the ANCHORING is stale. The plan was written against the stack audit's snapshot, not the current tree — so its §4 proposes a directory structure that largely already exists under different names. Every claim below VERIFIED unless labelled.

## What verifies

- Ground-truth table rows match my independent receipts: no CI anywhere (4 branches); Philox constant `0xd256d193` at `keyedrng.ts:17` (present at tip); lint unenforced (no lint script in either package.json, `tools/lint-baseline.json` absent); Pre-Colors hash; Svelte+Vite not SvelteKit; nothing pinned except lockfiles.
- Pin `4ca9a071` exists (`git cat-file -t` → commit). But it is a PRE-RESTRUCTURE commit — see the main correction below.
- The §3 core decision (sport-independent shell + independent domain engines, GPT §10C + MUSE D18 deferral, one enforceable contract) is correct and matches DS's built reality, Pickle's "share the ledger, never the physics", and my "share the verbs, keep the nouns". The §5 mechanical boundary list is the same check my filing's step 2 and Pickle's §5 propose — three seats, one check, no new dependency.

## Main correction: anchor to tip `bebe8e0b`, and write DELTAS not a new tree

His §4 proposes `engine/{core,shared,sports/nfl,sports/nba,contract.ts,version.ts}`. What exists at tip (my ls-tree + DS's identical count): `colors/src/core/` (14 files — envelope, keys, saver, profile, rng, hash, app, dataset…), `colors/src/platform/` (localstorage), `colors/src/sports/nfl/{engine 26, app 12, view 4}`. So:

- his `engine/core` **exists** as `colors/src/core` (his `clock.ts`/`invariants.ts`/`collections.ts` are the deltas to name, not a new home);
- his `sports/nfl` **exists** (26-file engine + app + view);
- the genuinely NEW pieces are: `core/` additions for schedule/standings/draft shared algorithms (his `shared/`), the `contract.ts` port (merge with DS's SportModule + Pickle's manifest stamps — three proposals, one port), and version stamps (partially exist: `engineVersion`/`dataVersion` in SaveMeta);
- `sports/nba/` is correctly deferred (post-v1.1, Owner's call).

Writing the plan as a delta on the existing layout turns it from a proposal into a spec the Architect can integrate in one pass — and avoids the drift-with-copies problem Pickle documented (a second invented layout is exactly how a third copy is born).

## Stale data points (re-dated)

- "Cakepanz 10 `.svelte` files" → **15** at current `origin/gh-pages` (my count; MUSE's audit had 10 at an earlier date — the count moves, datestamp every citation).
- "318/320 at ce7c9210" → a dated count; at tip UNKNOWN (Pickle's probe measured 284 at his pins; suite contents moved with the restructure). Never cite a test count without its commit.
- "no `.svelte` files, pin `4ca9a071`" — true AT that pin; tip differs (0 `.svelte` still true; layout and kernel are new).

## Keeps (unique value worth preserving in the merge)

- **Golden-file seed test (§7):** 5 seeds × 1 season, hash the box scores, commit as a golden file, one CI step — the cheapest determinism gate, and it composes with the purity/layout tests DS documented.
- **svelte-check for Cakepanz (§8):** nothing live has it (my receipt: vitest+svelte-check exist only in the historical `football-sim-next` wave folder) — worth adding when Cakepanz gets a type-check script at all (it has none today).
- **CI smallest-first + nightly invariants (§8):** install → typecheck → engine tests → build → lint, then nightly batch with the invariant list (roster caps, one-team-per-player, valid final scores, snake order, no double awards) — matches GPT's pipeline and Pickle's §6 order.
- **"Do not equate test count with quality" (§8)** — right, and worth keeping in whatever doc absorbs this.

## Verdict

**improved.** The decision is right and converged; the plan must be re-anchored to tip `bebe8e0b` and rewritten as deltas on the existing `colors/src/{core,platform,sports/nfl}` layout, with the contract merged with DS's SportModule and Pickle's manifest rather than proposed as a third port.

## Round synthesis (for the Architect's digest)

Five filings (OR, Pickle, VL, DS, my P-345 filing) now independently agree on: **shared franchise kernel (save envelope/event log/keys/profile/RNG) + independent per-sport engines behind one port + a mechanical boundary check + save-safety before any online step + no premature generalization (rule of two)**. The open Owner calls the round surfaces: (1) the track relationship — sharpened by the fact that Colors cannot build an app today while the fork is the runnable UI; (2) which value table is Owner-approved (the SPEC §2 table matches neither copy); (3) the v0-saves policy (recover legacy or close it); (4) the fourth framework prototype (SolidStart); (5) when basketball starts. CI is the single cheapest step that makes every "mechanically enforced" claim in this round actually enforced.
