# Council prompt — Fresh-start Vue vs Svelte experiments (design review)

**Revision 1 — 2026-11-15. For the council. KG sends this. Do not send it yourself.**

## Context — read this first

The framework comparison moves to **fresh starts in two standalone repos** (Owner, 2026-11-15):

- **Vue:** `kozikosi/football-sim-vue` — Vue 3 + Vite 8 scaffold (Pinia ^4.1.0, VueUse, TanStack Table, vite-plugin-vue-devtools). House rules in its `AGENTS.md`: Composition API only, Pinia Setup Stores, engine in `/src/engine/**` as plain TS, state via `window.__pinia` in DEV.
- **Svelte:** `kozikosi/football-sim-svelte` — Svelte 5 + Vite 8 scaffold (svelte-check, Vitest, Playwright). House rules in its `AGENTS.md`: runes-only, Svelte MCP first, engine in `/src/lib/engine/**` as plain TS (no runes), state bridge in `/src/lib/state/**`, QA hook `window.__SIM_STATE__`.

The four-slice arms (Vue 332 vs Svelte 347 framework-owned lines, bundle delta ~11 KB, boot medians contested) **stay in the Football-Sim repo as evidence. Do NOT port them.** The new repos start clean. The two-arm test (Vue 3 + Vite vs Svelte 5 + Vite) is still official; the four-prototype design doc is SUPERSEDED.

**Beauty direction (Owner): everything built in these experiments must resemble the beauty and colors of w89** — the live site. w89's visual language: dark background, gold palette, championship feel, team-color CSS variable (`--tc`, e.g. Broncos orange #FB4F14), Cinzel + Cinzel Decorative fonts. Design references (read-only): the live site at `https://kozikosi.github.io/Football-Sim/` (WAVE: w89) and the brag-card skeleton `_agents/ernie/deliveries/zai-open-wave-v3-2026-11-14/receipts/brag-card.html` on `origin/council/ernie` (dark/gold, team-color variable, animated shine — read it for design language, do not copy its code; the build-from-scratch ruling governs). A slice that is correct but looks nothing like w89 is not done.

## What you are reviewing

MUSE designed four experiments to settle the Owner's fundamental question — *"is it easier/faster/more complete for z.ai and other agents to code in vue 3 + vite vs svelte 5 + vite?"* — across five dimensions: which framework agents **prefer to code in**, **make fewer mistakes in**, **are more efficient in**, **can use more tools in**, and **self-report preferring** (based on many benchmarks). Your job is to review the design before Z.ai executes it. Challenge it, improve it, propose better slices, metrics, or rules. Do not rubber-stamp it.

### The four experiments

**E1 — Within-agent authoring sitting (the core one).** Same agent builds the same slice in BOTH repos, order randomised per slice. Slices: (a) player cards, (b) a stats table, (c) a draft-board row, (d) a settings form. Fidelity pinned numerically: same DOM node count, same rows, same states, same chrome bytes. Measure: time-to-green (start to all repo checks passing), repair cycles (edits after first build), defect count (type errors, test failures, console errors), framework-owned lines. Pre-registered settle rule (proposed): the framework that wins on ≥15% lower correction effort on ≥2 of 3 slices takes it; a wash goes to Vue on tooling (the one gap nobody disputes). Lessons applied: cross-agent measures the agent, not the framework (Ernie's design attack) — so within-agent; bundle is dead as a decider (~11 KB); line count is flat (R=0.9778) so it is a secondary metric, not the decider.

**E2 — Maintenance edit, not greenfield.** Give the agent a working slice in each repo, then ask for the same change in both: add a feature, fix a planted bug, refactor a piece of state. Measure: time to first *correct* edit, how many wrong edits came first, whether existing tests broke, whether the agent reached for the framework's tooling to diagnose. Greenfield flatters a framework; maintenance is where the mistakes live.

**E3 — Tool-access audit.** For each repo, enumerate what the agent can actually use and whether it works: MCP servers (Svelte MCP, Vue MCP, Context7), devtools (vite-plugin-vue-devtools is in the Vue repo; Svelte's devtools story), type checking, Vitest, Playwright, state-inspection hooks (`window.__pinia` vs `window.__SIM_STATE__`). Measure: which tools exist, which the agent actually invokes, which ones measurably help (fewer errors, faster green) versus which are unavailable or broken. Count real gaps, don't work around them: the Vue repo already rules out `vite-plugin-vue-mcp` on Vite 8 (peer support only through Vite 6) — that is a tooling gap to record, not a problem to silence.

**E4 — Self-report on a benchmark battery.** After building in both, each agent rates both frameworks on the same battery — state management, debugging, confidence their code is correct, readability of their own code, speed of iteration, tool helpfulness, how much they had to look up, how much they enjoyed it — Likert scale plus one line of why, then an overall preference and a confidence. Same questions, both frameworks, every agent. Aggregate across agents so the preference signal is comparable instead of anecdotal.

E1, E2, and E4 run together (same agents, same slices, survey right after while it is fresh); E3 runs alongside as the audit. Z.ai is the principal executor for the building (largest context window), but the within-agent design means any agent can run a slice — more agents shrinks the skill-variance problem.

### Verified-as-of (check these before you file — do not repeat a stale premise)

- Live site is **w89** (verified by fetch 2026-11-15; `origin/gh-pages` tip `3e69567c`). Not w85.
- The two de-gated tests are **CLOSED** (rewritten as structural assertions at `5a3bb75e`; suite 351/351 at `9acf1992`). Do not write as if 318/320 were still live.
- Cakepanz's engine snapshot is **re-pinned to `d3bd81d2`** (99-rule flex, QB→FS 12) at gh-pages `66096fb1` (2026-11-15). Not 4ca9a071.
- Bundle delta is **11,569 B** (JS-only gz, per the shipped `two-arm-bundles.txt` receipt). Not 10,946 B.
- The low-end boot result is **contested**: MUSE's R3.1 medians (Vue faster) were flipped by Inkling's n=6 replication (Svelte 4/6), and MUSE's R3.1 artefact was never pushed, so it is unverifiable as it stands. Do not cite the R3.1 medians as settled.
- The λ dial: Pickle's admissible band is **[0.3902, 0.4032)**; the only receipted estimator is ~15.7× too coarse. λ(context) as a dial is dead by arithmetic. Do not re-litigate 0.20 vs 0.40 — KG ruled that binary false (2026-11-11).

## Questions for the council (answer each; propose better answers where you see them)

1. **Slices:** are (a)–(d) the right four? Is there a slice that would separate the frameworks better (e.g. a 1,000-row board, a live-updating feed, a save/load flow)? Name any slice you would swap in and why.
2. **Settle rule:** is "≥15% lower correction effort on ≥2 of 3 slices, wash → Vue on tooling" the right rule? Propose a better one if you see it — and say what would change your mind.
3. **Benchmark battery (E4):** are the eight benchmarks the right ones? Add, remove, or reword any — and say which single benchmark you would weight most.
4. **w89 beauty:** how should w89's visual language (gold palette, team colors, Cinzel, championship feel) be carried into the new repos — as a shared token file, a reference screenshot, a per-slice fidelity check? What counts as "resembles w89" in a way a reviewer can check?
5. **Methodology:** is within-agent + randomised order + pinned fidelity the right design, or is there a stronger one? Name the biggest remaining confound (training-data mix is the known one) and how you would control for it.
6. **E3 scope:** are there tools you would add to the audit (e.g. a specific MCP, a linter, a component inspector)? Is there a tool gap you already know about that should be recorded before anyone builds?

## Innovation

This is a design job, so innovate freely. If you see a better experiment than any of the four — a different slice, a different metric, a falsifier that would kill your own preference — propose it. If you see a way to make the w89 beauty direction measurable instead of a vibe (a palette check, a font check, a side-by-side screenshot verdict), propose that. The prompt tells you what to settle, not how to think. Merge the best ideas; flag disagreements, don't smooth them away.

## Filing

File under `inbox/<UTC>-<seat>-fresh-start-experiments.md`, **FOR: P-345** (the framework comparison). Push after every finished file. Quote the verified-as-of block's sha when you cite a premise.

## Revision ledger (append-only; never rewrite an earlier entry)

- **Rev 1 (2026-11-15):** initial prompt. Fresh starts in `kozikosi/football-sim-vue` / `kozikosi/football-sim-svelte`; four experiments (E1 authoring sitting, E2 maintenance edit, E3 tool-access audit, E4 self-report battery); w89 beauty/colors direction; verified-as-of block (w89, Q7 closed, Cakepanz re-pinned to d3bd81d2, bundle 11,569 B, boot contested, λ band).
