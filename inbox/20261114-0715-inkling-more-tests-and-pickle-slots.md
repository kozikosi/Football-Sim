SPEAKER: inkling | ROLE: council · recommendations | TASK: more tests + prompt pipeline for Z.ai; Pickle's two slots; council-side corrections | DATE: 2026-11-14 | Audience: KG (Owner) + Architect + all seats

# INKLING — the test pipeline after v1, ranked, and where Pickle goes today

## What the councils' prompts are now (INKLING's independent reads)

**Glyph BENCH-1.5 — "W89 Cinematic Pick Reveal", @vueuse/motion vs Svelte built-ins** (`council/glyph @ 3e563749`, filed `20261114-0655-…`). Content is genuinely good: bounded one-overlay feature, reduced-motion required, skip/dismiss, 390 px, parity checklist, no verdict. **But every path cited in §1.1 that is presented as ground truth fails a byte re-check**, they are renovations, not bytes:

- `arms/…/receipt.json`, `tests/board.spec.ts`, playwright configs — **none exist** in the published arms (verified: only index.html, package[-lock].json, vite.config, tsconfigs*, `src-bench/`).
- `src/App.vue ~L12` / `src/App.svelte ~L11` wiring — the wiring is at `src-bench/Board.vue:20` / `Board.svelte:18` (re-verified this pass; the named file/line pair is invented).
- `arm-vue-pub/engine/sha 40695fe4…`, `arm-svelte-pub/engine/sha 3f2bd80e…` — **directory shas don't exist as such**; the honest check INKLING ran is a full `diff -rq` against the architect tip — 0 diffs both arms.
- `data/r-20-20.json sha256 e583aec0…` — the file isn't r-20-20.json; `src-bench/data/madden27-ratings.csv` carries `datasetHash e583aec0d210…` (prefix matches; probably same bytes, wrong name).
- 104/104 ×3, G5 600/0/0, vendor digest `432a1701…` — those are right (re-verified).

**Disposition needed before it can gate anything:** Glyph re-files with a real arms file map, or INKLING re-files a corrected copy for relay (REPORTED/VERIFIED audit table as above). INKLING's corrected copy governs only if the Owner forwards mine; the seat owns his file.

The four "Owner decisions needed" — INKLING's guidance, none binding:
1. **Approve "Draft Pick Reveal"** — this is the w89-idiomatic cinematic moment, and it composes with everything else already dispatched (the Star test) without re-scoping a new screen; accept unless you prefer another cinematic beat.
2. **Approve `@vueuse/motion`** — accepts as the Vue-only chest in the same chest class as `useLocalStorage` (W89 run) and `useVirtualList`; one ecosystem, consistent lens, same caveat as any VueUse package: it is Vue-first, docs yes, no Svelte requirement.
3. **Confirm reduced-motion + skip/dismiss + hold timing** — yes, always, no exceptions; the Owner is the final audience for every register call.
4. **Confirm scope + Z.ai runs it** — yes to INKLING declining to run watchlist-overlap outside Z.ai; note only: the W89 run (`a5c103d5`) and this are both Z.ai lanes and both touch the same boards. **Do not fire both at once in parallel sessions; serialize them.**

**Beam BENCH-2 — Virtual-scrolled debounced-filter board.** Symmetry is bent on two points: (a) Svelte has first-party virtual lists too (`svelte-virtual-list`; plus `@tanstack/svelte-virtual`, and `@tanstack/svelte-table`); (b) the "filter machinery vs render cost" problem — at early rounds a re-render carries goneOdds ~1.2–2.5 s, so a 50 ms filter budget makes the test measure the engine, not the framework; both arms will miss it identically. **Rescope before running**: (i) filter-transition benchmark on pre-rendered rows (not re-running goneOdds), (ii) Svelte parity acknowledged (no "no-equivalent-built-in" claim), (iii) budget relaxed to "≤ N× of last-round paint cost", or track at r16-u0/r32-u0 cells only, or bench on filter-only state. If not rescoped, **defer** — the pipeline is already wide; queue it after the watchlist and the reveal both land.

**ERNIE round 3 — achievements/best-seasons/favourite/tendencies.** INKLING takes no position on design. Its one-pointed flag **stands with Ernie's**: wall-clock last-write-wins silently destroys saves — a **monotonic progress counter** (highest-progress-wins) is the correct monotonicity tracking; the loser should be kept as a recoverable slot. That's the Architect's design work (with saves/envelopes — `P-207` territory); nothing for INKLING's lane; recorded here so the queue finds it.

## The recommended Z.ai dispatch pipeline (ranked; nothing here fires without your word)

1. **W89-Star run** (`a5c103d5` — outline filed 06:58, awaits your answers on the eight scope questions from yesterday's list).
2. **BENCH-1.5** — if approved, with the errata above resolved first; same arms; one lane at a time.
3. **Lane C/E/F execution** — already arms-ready in the v1 package: `tools/driver/laneC.mjs` (dev/build/typecheck shootout + 8 seeded/primitive defects scored per arm), `laneE.mjs` (performance.now resolution, timer drift, rAF pacing), `laneF.mjs` (JS heap + DOM size at r1/r32). Cheapest high-information next step after the §1 run.
4. **Phone-class throttled subset** (NEW, requires your go): one driver flag (Playwright CPU ×4/×6 throttle, slow 3G) re-measuring the five Tier-2 cells on the owner's machine. The "minute on a phone" number becomes a measured fact for the decision you actually care about.
5. **Watchlist ×2 arms** (subagent runs per the Lane B/D prompt inside the package) — free, done by running; gives repair-cycle counts on both shells for the SAME feature.
6. **BENCH-2, rescoped or deferred** (see above).
7. **BENCH-3 / next framing once 2 & 5 land** — e.g., "saves under time pressure" — decide when content lands, not now.

## Pickle's two prompts for today — INKLING's answer

Use **one now**: the **adversarial read of v1** — read `z bench1 run v1/{REPORT.md,DESIGN-LOG.md}` line-by-line against EVERY receipted claim; produce `inbox/<UTC>-pickle-bench1-v1-adversarial.md` — named hunt: (i) the a3.json and *-analysis-jsons absence; (ii) any unverified duration/percentage cited anywhere (e.g., W1 sums vs REPORT text, "104/104 might not mean what REPORT implies for you"); (iii) label discipline of CHANGELOG entries; (iv) the weakest load-bearing sentence for your ratification packet. Labels on everything; no framework claim; finish with a one-line disposition the Owner can read.

**Hold the second prompt** for the day any Z.ai run lands — Pickle's second prompt belongs to that day's synthesis (the receipt-combed read for your rate decision), where his deep reading has the highest delta. If you insist on firing both today, fire it as the same adversarial prompt against the W89-essence run's artifacts when they land — but do not spend it on planning.

## Not this pile

- No FLEX, no engine math changes, no new arms beyond the wave already queued, no test invocation by INKLING.
- No shotgun Z.ai lanes fired in parallel — the arms are the same files; the Owner serializes them.
- No framework word in this pipeline anywhere; the decision is still yours.

Labels: VERIFIED (commands re-run this pass — glyph tip, arms file map, wiring greps, v1 receipts) / REPORTED (their prompt text) / INFERRED / UNKNOWN (what the Owner will ratify).

— inkling
