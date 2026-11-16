# PROTOCOL FOR A SECOND AGENT — the within-agent slice-5 authoring bench

A cold agent should be able to run this without prior context. Two sittings maximum.
Seat: Z.ai · written 2026-11-15, BEFORE any slice-5 code exists (the sitting's order) · pin: `d3bd81d2`.

## 0. What this measures (and the confound, stated up front)

Is it easier/faster/more complete for ONE agent to author the SAME new slice in Vue 3 + Vite vs
Svelte 5 + Vite? The measurement is **within-agent**: the same agent builds BOTH arms, so agent skill
variance is held constant. The training-data mix (which framework the agent's pretraining saw more of)
is an UNSEPARABLE confound — until a second agent runs this same protocol and the numbers are compared
across agents, every answer here is subjective-but-measured, not universal. Say so in your filing.

## 1. Orientation (budget: minutes, not hours)

1. `git clone --depth 1 https://github.com/kozikosi/Football-Sim` and fetch the branches you need:
   `git fetch --depth 1 origin council/glyph:council-glyph` — the four-slice two-arm bench lives at
   `_agents/glyph/deliveries/zai-framework-slice4-2026-11-15/` (arms `framework-two-arm/arm-vue` and
   `arm-svelte`; shared files `bootData.ts`, `savesService.ts`, `feed.css`, `feedVM/abbr/ink.ts` must be
   byte-identical across arms; the probe is `scripts/two-arm-fourslice.mjs`).
2. Read `_agents/zai/START-OF-CHAT-ZAI.md` on `origin/council/muse` (NOT council/zai — frozen at w55).
3. The engine: vendor `colors/src` from pin `d3bd81d2` into both arms as `src/engine`
   (`git fetch --depth 30 origin architect/engine-and-seats`, then `git archive d3bd81d colors/src`).
   NEVER edit `colors/src`, `flex.json`, `flex.ts`. Verify: `diff -rq` across arms + the vendor digest.
4. The Owner's sitting prompt (the relayed message) is law; this protocol only operationalizes it.

## 2. The bench steps (verbatim — same order, same record)

**Order rule:** the arm ORDER is randomized per slice and recorded FIRST. Slice 5 = **Vue first**
(cancel the standing bias: the same agent built Svelte first in every prior pair). Write the order in
your filing's first line.

**Frozen check (one line):** before writing any code, `cmp` every shared file across arms
(`bootData.ts savesService.ts feed.css feedVM.ts abbr.ts ink.ts fixture.json` + `src/engine` diff -rq).
Anything not byte-identical: STOP, fix the tree, re-check.

**Data rules:** the card renders name/team/position/OVR/Wins/Priority — the only fields the user sees
(Owner's law). Source the numbers from the engine's own `boardVM` rows (never re-derive, never invent);
the cards are a re-render of engine data, not a new model. Players = 1,953 raw / 1,921 draftable.

**Format rule:** propose ONE format (HTML interactive cards + PNG share export was chosen for slice 5:
cards are the board row's face; PNG is the slice's shareable purpose; canvas draw needs zero
dependencies in a measured build) — say why in one line, then build the SAME format in both arms.

**From scratch:** the card frame is written from blank. A vendor's existing card may be READ as a
design reference (palette, layout) — never copy/adapt/reproduce its code (Owner ruling 2026-11-15).

**Interaction rule:** at least one alive interaction (hover highlight, open animation, skip-to-share)
that makes a user want to keep the card on screen. Keyboard reachable; reduced-motion respected
(style law: no emojis, no HOT/cold labels, green/red arrows only).

For each arm, in the chosen order, log one line per metric into `receipts/slice5-timing.txt`
(every line prefixed `arm=vue` / `arm=svelte`):

| metric | definition |
|---|---|
| frozen | the §cmp line across arms — one line |
| install | exit code + elapsed of `npm install` for any NEW dependency (0 expected — the slice needs none) |
| first_build | wall-clock time + exit + one-line output of the FIRST `npm run build` after writing the slice |
| typecheck | time + exit + error COUNT + the two worst messages VERBATIM (one line each), each framework's own checker |
| first_working_iterations | number of build→fix cycles from first build to first GREEN probe; one-line note per failed build |
| time_to_first_green | wall-clock from the first line of slice-5 code to the first all-laws-pass probe run |
| agent_context_scratch_checks_count | a running count of EVERYTHING looked up mid-build (file reads, greps, npm views, doc checks, engine type re-reads) — one number per arm; keep the tally in your journal as you go |
| workaround_lines | lines added ONLY to satisfy the framework, split: ts-ignore / any / getter wrappers / else |
| framework_owned_lines | entry + root + card screen + store glue, the §two-arm-lines convention (blank-line and brace-only rules as in receipts/two-arm-lines.txt) |
| full_build | the final build's launch→green time (build + probe) |
| re_build_after_one_word | change ONE visible word on the screen; rebuild; wall-clock |
| index_bytes | dist/ total raw bytes + gzip-9 of the concatenated dist js (label the method) |
| canon_purity | `grep -nE "\.weight|WEIGHT" <new files under src/>` — must be clean (no engine-field reach-through) |
| w85 check | probe asserts 0 console errors on file:// (the app-tree probe convention) — quote the verdict line |

**The probe (same for both arms, one process):** boot each dist from `file://`
(`--allow-file-access-from-files`), network blocked; assert:
1. the cards screen renders N cards (N = the engine's own boardVM row count for the state, not a constant);
2. one sampled card shows EXACTLY the engine's own name/nflTeam/pos/ovr/wins/priority for that row (string-equal to the VM, not to a fixture);
3. the dynamic element changes (open the featured card: the expanded state class appears; the featured clock line shows the current overall);
4. the interaction works (click opens, Esc/Close returns; hover/focus state class toggles);
5. the export works (SHARE PNG → a canvas-drawn PNG download fires; assert the download event + a non-empty dataURL);
6. 390 px: no horizontal scroll on the cards screen;
7. DOM node counts recorded for BOTH arms — the fidelity is pinned NUMERICALLY: same node count,
   same rows, same states, same chrome bytes, or the two arms are not comparable;
8. 0 console errors / 0 blocked requests across the whole session.

**Screenshots:** one full-page shot per arm of the cards screen + the featured card, into `shots/`.

**Filing:** `receipts/slice5-timing.txt` — FIRST LINE: arm order + the exact view + the fidelity claim.
Then the per-arm metric lines (`arm=vue` / `arm=svelte`), then the cross-arm comparison and the
within-agent verdict ("was this task harder in Svelte or Vue, holding all else equal, and by how much?").
ERNEST-style second-agent results are reported as "a second agent found X", NEVER averaged in.

## 3. Honesty rules

- Record failed builds and their causes verbatim; a bench with no failures is suspicious, not impressive.
- The context-scratch tally is recorded DURING the build, not reconstructed after.
- If a number is estimated (e.g. you forgot to timestamp a step), label it `est.` — never silently.
- Do not tune either arm after its green probe (no post-hoc beautification of one arm only).

## 8. The sealed-recipe handicap (Rev 8, Part B4 — applies to E1's slices from now on)

Every slice in this protocol now runs under the SEALED-RECIPE handicap: before the first line of a
slice's code, the surface is frozen in a recipe file (API surface, render contract, probe assertions
— no code, no idiom hints), its SHA-256 is written into the sitting's receipt FIRST, and both arms
author against THE RECIPE ONLY. The second arm may not read the first arm's slice code until its own
probe is green and its receipt line is written. Why: Rev 6's Flip Bench finding — the instrument
handicap was paid before both arms, but API-knowledge transfer still rode with the second arm
(slice b: Svelte mapped TanStack v9 in 6 cycles, Vue reproduced it in 2). Repair-cycle pairs are only
comparable ACROSS AGENTS when both arms learned the surface from the same sealed document. The
standing recipe for the store-heavy bench ships at the delivery root (SEALED-RECIPE.md, sha
7fcc3fc0432e29fae4c0d0d384f813da67cd05a0f591f5bb6746f85458e14f07); the Flip Bench checks the seal
(`flip-bench/flip-bench-sealed.mjs`). A slice run without a sealed recipe is recorded as
`handicap=OPEN` and its repair pairs are within-agent evidence only — never cross-agent.
