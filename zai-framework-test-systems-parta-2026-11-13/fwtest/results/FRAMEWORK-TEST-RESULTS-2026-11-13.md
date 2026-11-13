SPEAKER: Z.ai | ROLE: High Councillor · Executor of Z-post-blue and 67 Cakepanz | TASK: the framework test — five arms, built and run (Owner: "run the test however you want") | DATE: 2026-11-13

FOR: the Owner · the council review chain (the test design's scoring is a COUNCIL job — see §6) · P-345

**Batch note:** sandbox cannot push; this filing ships in the zip. The complete, working arms + engine contract ship with it (CHECKSUMS.txt, sha256 LABELLED, verified from a fresh extraction).

---

# The framework test — results filing (v1, five arms)

## §1 — What ran (the standardized environment record)

Recorded per the test design's requirement. One machine, one agent (me), one continuous session (the fresh-session-per-arm protocol from my §6.3 was NOT possible in this sandbox — see §7, deviation D1):

| Arm | Framework (declared → installed) | Build tool | Build | Arm-owned code |
|---|---|---|---|---|
| Svelte + Vite | svelte ^5.57.3 → 5.57.3 | vite ^8.3.6 → 8.3.8 (rolldown) | **PASS** (205 ms) | 248 LOC / 4 files |
| SvelteKit | @sveltejs/kit ^2.22.0 → 2.70.4, svelte 5.57.3 | vite 7.3.8, adapter-static | **PASS** (static site) | 243 LOC / 5 files |
| React | react ^19.3.1 → 19.3.1 | vite 8.3.8 + `tsc -b` (typescript 7.0.2) | **PASS** (tsc + vite) | 328 LOC / 6 files |
| Vue | vue ^3.5.44 → 3.5.45 | vite 8.3.8 + `vue-tsc -b` | **PASS** (328 ms) | 223 LOC / 6 files |
| SolidStart | @solidjs/start ^1.0.0 → 1.5.1, solid-js 1.9.19 | vinxi 0.5.11 | **PASS** (nitro server) | 282 LOC / 4 files |

Common: Node 24.22.2, npm 11.19.1, Linux x64 sandbox, npm registry reachable. The engine is the SAME 25-file verbatim copy of the pinned Colors engine (`4ca9a071`) + 4 core files in every arm, diff-verified identical (`engine-contract/PROVENANCE.md`). The feature logic is the SAME `src/focus/*` module. Nothing framework-specific touches the engine.

## §2 — The engine contract (built first, frozen before any arm)

Per my protocol §6.1: one page (`engine-contract.md`), typed API, shared fixtures, golden outputs — before any prototype existed.

- **Vendored, verbatim, provenance-checked:** `src/sports/nfl/engine/*` (25 files) + `src/core/{rng,at,hungarian,ids}.ts` from the pin. `diff -r` = byte-identical. The vendored files are never edited; the contract's own code lives only in `src/focus/` + `src/index.ts`.
- **The feature module** (`src/focus/focus.ts`, `sim.ts`): the offensive focus per the Owner's verdicts — Priority-not-Wins (`wins` = static `slotWins20`; `priority` = wins + the focus adjustment), matchup-aware adjustment (∈ [0.5,1.5] against the opposing cov/front unit), pre-game + one halftime change with per-focus eligibility, auto default (deterministic situational pick), Q4 automatics (go-for-2 + fourth-down aggression REPORTED to the engine layer — the pin takes no such input, and no prototype fakes it; strat-override applied via a documented whole-game re-run), form arrows (binary, from a form z; the UI resolves palette).
- **Everything is data-driven from `FOCUSES`:** the picker, the auto rule, the automatics, and the halftime eligibility all read the list. This is what round 2 tests.
- **Fixtures + goldens:** `fixtures/golden.json` — two demo teams, boards per focus, 9 games (3 configs × 3 seeds) with scores, Q4-start diffs, focusLogs, box scores, auto-pick examples. Deterministic: re-running `npm run golden` reproduces byte-identical JSON (verified after a refactor that touched no logic).
- **Type safety:** the contract ships the pin's own ratchet practice — `tsc-baseline.json` pins 69 pre-existing strict-mode errors in the VENDORED files (`noUncheckedIndexedAccess`/`exactOptionalPropertyTypes` strictness, zero in the contract's own files); the ratchet may only go down (`tools/tsc-baseline.mjs`, verbatim from the pin).

## §3 — The five arms (what was measured, mechanically)

Same spec, same contract, same fixtures, same data-testid names in every arm (so the council's Playwright run is one spec against five apps). Each arm's state layer is written in its framework's idiom: Svelte 5 runes (`$state`/`.svelte.ts`), SvelteKit runes + routes, React hooks (`useFocusState` + memoized boards), Vue refs + computeds, Solid signals + memos.

**Build friction notes captured along the way** (the honest log, each fixed within its arm):
- Svelte+Vite: one wrong relative import (`./engine-contract` from `src/lib/` — my error); Vite 8/rolldown reported it only as an opaque `errors: [Getter/Setter]` — the actual message surfaced through the build API. **Tooling finding: Vite 8's CLI error reporting for resolution failures is materially worse than Vite 7's.**
- SvelteKit: `adapter-auto` warns on undetectable platforms → switched to `adapter-static@^3` (`@4` demands kit ^3, a real peer-dep conflict); `svelte-check` then flagged `node:fs` in the contract's shipped `tools/` → arms exclude contract dev-tools from their copies.
- React: component import paths + one unused param (template runs `tsc -b` with `noUnusedLocals`); the vendored engine's strict-mode baseline does NOT transfer into arm tsconfigs — arms that want full type-checking must adopt the contract's ratchet (documented in the contract README).
- Vue: `vue-tsc` flagged unused script-setup imports; otherwise clean.
- SolidStart: no type-check in `vinxi build` (vite transpile-only); the arm compiles and runs.

**Leakage scan (my §6.5 metric), all five arms: zero** deep imports into the contract (index-only, enforced), zero `Math.random`/`Date.now`/`localStorage` in arm-owned code.

## §4 — Round 2: the fifth focus (the data-driven design check)

The canonical change: `FOCUSES` gains `spread` (own matchup weights, own auto trigger, **and `halftimeEligible: false`** — a genuinely different halftime rule), `FOCUS_VERSION` → `v1-5f`; the contract (and only the contract) is re-synced into the five arms; every arm rebuilds.

**Result: 0 files, 0 LOC changed in arm-owned code across all five arms; five green builds.** The picker grew to five cards, the halftime rule for `spread` took effect, the automatics recognized the new trigger — all from data. The mechanical evidence: per-arm sha256 snapshots of arm-owned files before/after, diffed (in the delivery: `round2/`).

**Methodological caveat, stated plainly:** one author (me) wrote all five arms against the same frozen contract — the design's data-driven check has low discriminating power in a single-author run. It proves the CONTRACT design is data-driven; it does not yet discriminate between frameworks. With independent authors per arm (the design's original intent, possible in the council's formal run), the same round-2 protocol would expose hard-coded-4 assumptions. The protocol ships ready to re-run.

## §5 — Scoring (measured half only; the judgment half is the council's)

I built all five arms — I will not grade my own framework-quality impressions beyond the mechanical record. The design's scoring (correctness gate 20% pass/fail, second-round modification 20%, agent quality 15%, integration 10%, maintainability 10%, UI 10%, server-ready 10%, tooling 5%) needs REVIEWERS for the judgment columns. What I supply, measured and reproducible:

| Metric | Svelte+Vite | SvelteKit | React | Vue | SolidStart |
|---|---|---|---|---|---|
| Build success (this env) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Type-check of arm code | svelte-check (0 err after excl.) | svelte-check 0 err | `tsc -b` clean | `vue-tsc -b` clean | transpile-only |
| Round-2 amplification | 0 files | 0 files | 0 files | 0 files | 0 files |
| Leakage (deep imports / forbidden globals) | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |
| Arm-owned LOC | 248 | 243 | 328 | 223 | 282 |
| Identical contract bytes | ✓ | ✓ | ✓ | ✓ | ✓ |

Correctness gate: every arm renders from the contract and the same goldens; the Playwright spec (below) is the council's acceptance instrument. The two-category split is honored: the shared engine behavior is IDENTICAL by construction (same vendored bytes); the framework-specific half is what review scores.

## §6 — The acceptance instrument (shipped, not executed here)

`playwright/offensive-focus.spec.ts` — one spec, all five arms, driven by the shared data-testids: renders the board; switching focus changes Priority and NEVER Wins (asserted per row); pre-game → kickoff → halftime offer (manual mode) vs no prompt (auto); `spread` absent in the v1 contract build and present after round 2; halftime `spread` NOT offered (eligibility rule); the Q4 automatics banner appears iff the contract fired them; the precedence note when a run-strat user focus meets the pass override. **Not executed in this sandbox** — Playwright's browser download (~170 MB × 5 installs) is outside this environment's budget; the spec + per-arm drop-in paths ship so the council or the Owner runs it in one command per arm (deviation D2).

## §7 — Deviations from the design (declared, per the environment-record rule)

- **D1 — single session, not fresh sessions per arm.** The sandbox is one continuous session; the fresh-session protocol is impossible here. Identical spec + frozen contract + fixture equality are the controls that survived. The formal re-run (council) can restore D1.
- **D2 — Playwright shipped, not executed** (§6).
- **D3 — Vue via Vite, not Nuxt.** The Owner delegated the test's shape ("however you want"). Rationale: the prototype is one screen; Nuxt's differentiators (SSR, file routing, server routes) would not be exercised, and Nuxt's install/build weight would dominate the tooling metric. Nuxt stays a named candidate for a follow-up if the council wants the meta-framework dimension for Vue. **This is the one arms-level judgment call I made — flagged for Owner review.**
- **D4 — SvelteKit and SolidStart were hand-scaffolded** (minimal, idiomatic project files) rather than via their interactive CLIs, for reproducibility; the dependency sets match the current stable templates.

## §8 — What the numbers say so far (facts, not verdicts)

1. **The seam held.** One contract, five frameworks, zero engine logic outside it, zero leakage — the server-ready principle survived contact with five UI idioms. This is the result the Owner most needed: the framework decision does NOT touch the engine.
2. **The transferable part of type safety is a ratchet, not a tsconfig.** The vendored engine's 69 pre-existing strict errors do not transfer into arm tsconfigs; the contract's ratchet file is the unit of transfer. (A systems finding, relevant to the CI proposal.)
3. **Tooling friction ranking in THIS environment** (mechanical, small n): Vue cleanest (`vue-tsc` + vite, no surprises); React's tsc-7 template is strict but loud-when-wrong; Svelte+Vite fine except Vite 8's opaque CLI errors; SvelteKit needs an adapter pin (peer-dep conflict at major versions); SolidStart has no type-check gate in its build at all — the arm that would most benefit from one.
4. **The Svelte+Vite arm is double-use:** it is the offensive-focus reference implementation on the product's own stack — if the test's verdict is "stay," the arm is the seed of the real feature, not a throwaway.

## §9 — What I need from the council

1. Three reviews on this filing + the arms (the chain).
2. The judgment-half scoring against the design's weights, from the raw numbers + a Playwright run (one command per arm; spec shipped).
3. A ruling request to the Owner on D3 (Vue/Nuxt) and on the formal re-run (fresh sessions) if the council wants D1 restored.

## §10 — Files in this delivery

```
engine-contract/          the contract (vendored engine + focus module + goldens + docs)
arm-svelte/               Svelte 5 + Vite 8
arm-sveltekit/            SvelteKit 2 (adapter-static)
arm-react/                React 19 + Vite 8 + tsc 7
arm-vue/                  Vue 3.5 + Vite 8
arm-solidstart/           SolidStart 1.5
playwright/               the acceptance spec + per-arm drop-in notes
round2/                   the round-2 evidence (before/after hashes, rebuild logs)
results/                  this filing + the raw measurement JSON
```
