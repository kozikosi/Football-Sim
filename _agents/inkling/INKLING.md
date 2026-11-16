# INKLING — lane file (rewrite in place when seat state changes; never append; ≤60 lines)

**Seat:** INKLING · Inkling 2 Small Free (opencode/inkling-2-small-free) via OpenChamber · admitted 2026-11-09 · **transient, not permanent** — deputized by the Owner while MUSE was out; answers to the Owner alone; holds no standing rank over any seat. If a task contradicts `AGENTS.md` (on `origin/council/muse`) or the Owner, the muse file and the Owner win.

## Boot protocol
1. `git fetch -q origin; git log --oneline -1; git status --short` — worktree clean, branch `council/inkling`.
2. Read this file. Then the task's named files only.
3. **The live rules live on `origin/council/muse`**. Refresh first; treat stale copies as REPORTED.
4. `node tools/preserve.mjs check` — my worktree must be clean; unsaved work elsewhere is not mine to touch.

## Permanent seat rules
- Byte-check everything: every VERIFIED needs directory · exact command · ref/sha · output neighbourhood. Independent re-run is the only confirmation.
- Never edit governance, never touch `colors/src/**`, flex, the product file, or any other seat's bytes. INKLING reviews, measures, advises; does not build the engine/product/shell.
- No new P-IDs without the Owner; dissent in writing, inside the filing.

## Current state (2026-11-16, v4-2 Cakepanz-assist round filed; branch pushed)

- **The v4 prompts** (Kosi, 7b0cfdb4 on `origin/council/muse`, `_agents/muse/deliveries/prompts-2026-11-05/`): v4-1 = the Z.ai build prompt (build-first, TS-neutral; my propose-first gate deliberately absent — fine by me; "you can rule on it separately" → my ruling was: keep it absent); v4-2 = the council-assist prompt, executed this round.
- **Filings (all pushed):** Part 10 pin (s5=`4ca9a071` VERIFIED; live gh-pages=`d3bd81d2` VERIFIED; **gh-pages README.md stale — names 4ca9a071**, the one stale doc) · Part 9 data integrity (clean bill + provenance flags madden27) · Part 11 style laws (**`.ub`/Cinzel/pale-rose absent — shell is dark-gold/Georgia; flagged to Owner, not fixed**) · Part 2 seam (**no seam: 66 engine-reaching lines/15 files; swap tests: `4ca9a071→d3bd81d2` build ✓ battery 75/0/10/3 ✓ zero source edits; `→86f22d10` build ✓ battery 74/1** — the 1 FAIL = the battery's own dead TOKEN casing, four non-champion branches all unreachable-green, reported not fixed) · Part 3 neutrality (Svelte-shaped below render layer; only `draftStore.ts` imports `svelte/store`; 730/750 non-engine TS lines framework-free) · Part 12 (board 832 nodes vs arm 871; **390 board scrollWidth 444 — overflow**; Team Select 78; arms' numbers quoted with 247-vs-221 flag) · Part 8 (**file:// broken as shipped: CORS/crossorigin, 4 failed requests, app never mounts; zero console errors over http; singlefile not built**) · Part 13 (contrast table 36/36 recomputed exact; 14 AA cells stand; Owner holds) · Part 4 P-317 (**engine takes `order[]` param — VERIFIED; save payload has NO order/slot field; store restores default snake — VERIFIED; Architect: 3 files, <40 lines; Z.ai: picker + shell-side bridge labelled UI-ONLY**) · Part 6 open question (**box.ts ABSENT at d3bd81d2 — pin scope correctly excludes it; at 86f22d10, puntYards/touchdowns/firstDowns survive (reproduced) + 3 more probes (sacksTaken/rushYards/passYards) — all survive; structural reason: no independent source; interception-spot NOT mutated — UNKNOWN**) · Part 7 (battery 88 laws: 75/10/3; full gap-find with proposed laws for the new surfaces; dead TOKEN law named) · Part 14 (**cutover checklist: would NOT sign today — 6/15 red**) · Part 15-class asset `cakepanz-merge-gate-2026-11-16/seam-check.mjs` (merge-day gate; 10-VM inventory at d3bd81d2; falsified: 1-byte goneodds flip → exit 1 naming the VM) · Part 17 (mislabel record: my 8 stand, Ernie's = **2 not 4**; s5 CHECKSUMS recomputed — **34/53 ok, 19 mismatch, 0 missing; slices 1–4 manifests stale, slice 5 exact**).
- **Bulletin `20261116-2122-inkling.md`** — the round's ledger. Commits: `d0c7153f` (Part 10) + the round commit (this session's filings + lane + bulletin).
- **Undone (say so if asked):** Parts 1 (full screen-by-screen re-verification + review-chain verdicts), 5 (ideas/UX invention), 6 (full all-law mutation sweep), 12/8 were measured only for team/board screens, **Part 15 proper (VM snippets beyond the gate), Part 16 (P-316 spec)**. Nothing here re-litigates the pin, palette, framework or the 1b/ratchet/sealed-bench rulings — settled items untouched.
- **Pending judgment (Architect/Owner/MUSE/KG's):** the dead TOKEN law amendment; s5 checksum regeneration; 390 + file:// fixes; the palette ruling (gold2/dark-`--text`/Cinzel/.ub); the cutover checklist's six reds; the merge-day gate's use at cutover; whether the v4 prompts get sent as written (Owner's step).

## What the next session needs
1. `git fetch -q origin; git log --oneline -3; git status --short` — then read the v4-2 prompt (in `7b0cfdb4`) + `bulletin/20261116-2122-inkling.md` + the Part 2/Part 4 filings first.
2. Queue: `node .council_tool.mjs next` (v9 from `origin/council/muse`). A review you can do beats new work in the same tier.
3. If the Owner sends v4-1/v4-2 as-is: the council round's filings above are the evidence base; Z.ai's first Step-0 read should be my Part 10/Part 4 filings.
4. Never re-measure without a re-pin: pin is contested-to-date (s5=4ca9a071 → live=d3bd81d2); whole-lineup scale 854,226.66; 1,953 pool; live site = w89.

## Where this worktree is
Path: `/Users/kosi/Desktop/wt/inkling` · branch `council/inkling` · HEAD = the round commit (verify with `git rev-parse HEAD`) · merge-base with base `1b91f50e`.

## Transition discipline
Wave state lives in wave directories and is expected to die with the wave. Rewrite this file wholesale on seat-state change; never grow it.
