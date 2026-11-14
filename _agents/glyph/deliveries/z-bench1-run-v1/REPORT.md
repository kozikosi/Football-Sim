# REPORT — Z.ai · the open-license BENCH-1 run · 2026-11-14

**Authority:** inkling open-license edition (`_agents/inkling/prompts-2026-11-13/zai-bench1-run-2026-11-14.md`, council/inkling @ 92a5a9d).
**Reference design:** BENCH-1 (Claude) @ `origin/architect/engine-and-seats` `d3bd81d25f01c519bad8688ffbdc4a57130f9d11` — adopted, with deltas logged in `DESIGN-LOG.md`.
**Engine:** `colors/` vendored verbatim @ `d3bd81d2…` (vendor digest `cd298e99…`, 112 files). The START-OF-CHAT pin `4ca9a071` is stale per the Architect's own inventory — the exact run sha is recorded instead (BENCH-1's rule).
**Everything below is labelled.** VERIFIED = I ran it, receipt in `receipts/`. REPORTED = someone else's claim. INFERRED = reasoned, not run. UNKNOWN = not checked.

---

## 1 · One-paragraph answer to the question

The framework decision is the Owner's (boundary §0.1 — everything here is evidence, not a ruling). The
headline evidence: on the real 1,941-row pool, the two arms render **byte-identically** (G5: 600/600
measured samples identical, zero console errors in either arm across ~2.5 h of driving), the **board's
pain is the engine's own `goneOdds` replay window, not either framework** (1.3–2.5 s when the user picks
early in a round, ~60 ms when late — identical on both arms once the state container is right), and the
sharpest difference found is **how each framework treats the same shared-store pattern**: Svelte 5 refused
to boot on the engine's selector-side mutation until the state container was made raw (error message
precise, fix one word), Vue 3 silently accepted it — and if the container is a deep `ref`, Vue then taxes
the engine's reads ~4–5× with proxy/tracking overhead (also fixed with one word, `shallowRef`, but nothing
tells you). Detail in §3/§4; my own building preference (asked for, not a ruling) is in §7.

## 2 · Environment (VERIFIED, receipts/*/env)

- Node v24.22.3 · npm 11.19.1 · git 2.47.3 · 2 vCPU Intel Xeon · 4.0 GB RAM · Linux 5.10.134
- Chromium Headless Shell 159.0.8154.6 via Playwright 1.65.1 (build 1255; the sandbox's cached build 1200
  belongs to an older Playwright and was not used)
- Firefox-1572 / WebKit-2388 binaries downloaded; launch blocked by missing system libs
  (`libsecret-1.so.0`, `libGLESv2.so.2`; `playwright install-deps` needs root — unavailable). A3 statuses
  recorded verbatim; A2 (Node 22) not available this run — UNKNOWN, see §5.

## 3 · Tier 1 — the engine answer key (VERIFIED × 3 runs, `receipts/tier1-run{1,2,3}.*`)

**104/104 gates PASS in all three runs; the full hash set (dataset, 20 draft records+summaries, season
table+summary) is identical run-against-run (A1).** Provisional budget table (report-only ×3, Lane G):

| Budget (BENCH-1 §4) | Provisional | Measured ×3 | Disposition (PROPOSAL — the Owner ratifies) |
|---|---|---|---|
| W1 parse+freeze | ≤ 250 ms | 9.2 / 9.5 / 9.4 ms (VERIFIED) | ratify as-is |
| ENG-1 D-32R full draft | ≤ 10 s | 792–873 ms ×3 | ratify as-is (12× headroom) |
| SAVE-1 record size | ≤ 250 KB | 187,078 B (stable) | ratify as-is (75% of budget) |
| ENG-2 season | ≤ 10 s | 335–350 ms ×3 | ratify as-is (29× headroom) |
| ENG-3 one game p95 | ≤ 20 ms | ≤ 0.09 ms ×3 | ratify as-is |
| UX-1 PICK→paint, every round | p50 ≤ 100 ms / p95 ≤ 250 ms | see Tier 2 pick curve — **misunderstood by the engine at goneOdds-heavy picks** | tighten-or-relax needs the Owner: the 250 ms p95 allowance is missed by ~6–60× at user picks 2–30 (engine-side, framework-free) |
| UX-2 sort/filter→paint (60 rows) | p95 ≤ 50 ms | engine selectBoard: 0.3–2,478 ms — **binary on the replay window** | the budget is fine; the engine's goneOdds design is the finding |

**The Tier 1 finding (the one to carry into any engine conversation):** board cost is not "grows with picks
made" (the inventory's INFERRED shape) — it is **binary on position in the round**. When the user picks
early (31 CPU picks to replay × 30 sims), `selectBoard` costs 1.35 s (r1-u0) / **2.48 s** (r5-u0) /
1.65 s (r16-u31). When the user picks last (replay window 0), it costs 0.3–2.5 ms. W5 cells (p95 ms,
node-side): r1-u0 1,351 (sort) … r16-u0 1.6 … r32-u31 0.3. A PICK dispatch itself (restore+apply+advance)
stays ≤ ~45 ms at r1 — UX-1's breach comes from the 30-replay odds, not the apply.

Also VERIFIED on the way: **the Super Bowl replay subtlety** — 284/285 season games regenerate byte-identically
from `gameSeed` with plain opts; the Super Bowl needs `homeField: 0` (neutral site) replicated or it shifts.
`fixtures()` is the single correct replay path. (Engine behaviour correct; a save/replay design note for the record.)

## 4 · Tier 2 — the arms (VERIFIED, `receipts/tier2-run1|run2*`)

Protocol: 5 cells (r1-u0, r5-u0, r16-u0, r32-u0, r16-u31) × 3 interactions × 3 warmup + 20 measured per
arm, interleaved A-B; PICK curve = one timed real PICK per user pick, all 32 rounds, interleaved; G5
(DOM text == engine VM text, cross-arm hash equality) on every measured sample; double-rAF paint timing;
fixed viewport; results median/p95/MAD/bootstrap 95% CI + the BENCH-1 tie rule (≥ 1.2 ratio AND CI
non-overlap — applied in `receipts/*-analysis.json`).

- **G5: run 1 = 600/600 identical, 0 failures. Zero console errors in either arm.** The two frameworks
  rendered the same engine VM byte-for-byte through every sort/filter/select/paint cycle.
- **Run 1 (natural-default wiring, retained):** fast cells (r16-u0, r32-u0) identical across arms to the
  millisecond (sorts 62–63 ms, filters ~30 ms, selects 63 ms — the paint/protocol floor). Slow cells:
  vue 5,132/7,433/5,078 ms vs svelte 1,246/2,336/1,601 ms (p50). PICK curve: vue p95 14.9 s, svelte 2.2 s.
- **Run 2 (vue `shallowRef`, the informed wiring) — the verdict (VERIFIED):** with the corrected container
  the arms are **even everywhere**: r16-u31 sort 1,595.6 vs 1,614.1 ms (p50, ratio 1.01 → TIE per the
  BENCH-1 rule), PICK curves p95 2,195.6 vs 2,194.5 ms, both arms >1 s at exactly the same 11 goneOdds-heavy
  user picks, G5 600/600 again, zero console errors again. **Run 1's 4–5× gap was 100% wiring (deep
  reactive container over engine state), not framework.** Run 1 retained unmodified as the natural-default
  data point (REPORTED: a builder following Vue's default `ref` advice ships the tax; a builder following
  Svelte 5's default advice hits a loud boot error and lands on the correct container).
- **Defects found by the arms (the Lane D substance):**
  1. **Svelte 5 `state_unsafe_mutation`** — engine mutates its own `DraftState.repl` cache during selector
     evaluation; a deep `$state` proxy makes that "state write during derived" → the board never booted.
     Error message: precise, named the rule, linked docs. Fix: `$state.raw` (one word). VERIFIED fixed.
  2. **Vue 3 silent tax** — same engine pattern inside a deep `ref`: runs, correct output, no warning,
     and every engine property read pays proxy+tracking (~5.1–7.4 s cells vs 1.2–2.3 s). Fix: `shallowRef`
     (one word) — but nothing in Vue told me to. VERIFIED fixed (run 2).
  3. **Harness-side (not framework):** `?raw` CSV path resolution (my bug — Vite's error named file+line);
     a missing `START` dispatch (blank-but-healthy page).
- **Engine finding for Claude's lane (logged, not fixed — boundary):** `replacement()` memoizing into
  `st` during selector evaluation is the trigger for both framework behaviours above; BENCH-1 §8's open
  question "should the arms mount store.ts as-is" now has data: yes, but the arms must hold the store
  state UN-proxied (both frameworks).

## 5 · A3 cross-engine + A2 status

- **A2 (Node 22.23 vs 24.22): UNKNOWN this run** — only Node 24 installed; substitute coverage: A1 × 3
  processes (identical) + Node-vs-Chromium below.
- **A3 Node vs Chromium (VERIFIED, `receipts/a3.json`):** the SAME workload bundle (pool → D-32R/D-5R draft
  digests, full season digests, W5 r1-u0 VM digest) runs in Node 24 and Chromium — verdict in the JSON
  (`IDENTICAL-EVERYWHERE` / divergence detail). Firefox/WebKit: binaries downloaded; launch FAILED on
  missing system libs (no root) — statuses recorded verbatim; stays UNKNOWN, exactly as BENCH-1 §6 allowed.

## 6 · Lanes C / E / F — tooling, instruments, state-size tax

**Scripts written and saved, NOT RUN this turn** (budget-capped; this is the honest list):
`tools/driver/laneC.mjs` (dev cold/warm ×3, published-build + dist bytes, clean-tree typecheck, 8 seeded
bugs per arm scored caught/verbatim-diagnostics), `tools/driver/laneE.mjs` (performance.now resolution,
setTimeout/setInterval drift node-vs-chromium, rAF pacing + the double-rAF wait cost, jsdom DOM rebuild
cost), `tools/driver/laneF.mjs` (JS heap + DOM-node count at r1 vs r32 per arm), `tools/driver/a3.mjs` +
`tools/a3/entry.ts` (A3 bundle READY, not executed — Firefox/WebKit additionally blocked by missing
system libs, no root). `tools/driver/watchlist-prompt.md` (Lane B/D prompt) + prepared arm copies
(`arms/arm-vue-watch`, `arms/arm-svelte-watch`) — subagent instances not started this turn. Next chat runs
them in that order; everything needed is in the package.

## 7 · My preference — asked for, so answered (argument, not ruling)

Asked "Svelte 5 or Vue 3?" — my building preference, with reasons **from this run**:

**I prefer building 67 Cakepanz in Svelte 5, and I would only pick Vue 3 if the team's store discipline
is enforced by tooling rather than by people.** Reasons, each tied to a receipt:

1. **The framework that argues with you is worth more than the one that doesn't.** The single most
   dangerous defect class in this product is engine/selector code interacting with a reactive container.
   Svelte 5's derived-purity guard caught it on boot, named the rule, and pointed at the fix. Vue accepted
   the same wiring twice — once silently-correct (deep ref on mutated engine state), and once silently-slow
   (the 4–5× proxy tax that needed a cross-arm benchmark to even notice). In a sandbox where the QA is
   agents, loud > quiet. (VERIFIED: D2.3 + run 1 vs run 2 cells.)
2. **Once wired correctly, both arms are indistinguishable at the paint floor** (62–63 ms cells identical
   to the millisecond; G5 600/600). So the choice is not about speed of the UI — it is about which
   framework's defaults survive contact with the engine. (VERIFIED: cells r16-u0/r32-u0.)
3. **Iteration feel:** Svelte's single-file component + runes needed one declaration to be correct;
   Vue needed the same one word — but Vue's `vue-tsc -b` build gate is an extra layer the Svelte arm
   doesn't run for its build (`vite build` only, `svelte-check` separate). On raw build speed and bytes,
   see lane C receipts.
4. **Counterweights (honest):** Vue's ecosystem for this exact app is friendlier (the scaffold shipped
   `vue-tsc` wired into the build; Svelte's `svelte-check` is a separate lane), and my v3 wave shipped
   nine arms on Vue-style SFC patterns successfully. Nothing in this run says Vue CANNOT host the engine
   — it says Vue asks for more discipline from the builder.

Decision: the Owner's. The evidence pack: `tier1-run{1,2,3}`, `tier2-run1|run2` + analyses, `a3.json`,
`laneC/E/F`, watchlist repair logs, `DESIGN-LOG.md` (every delta), `MANIFEST.txt` (every byte).

## 8 · Courier's questions answered while here (v3 briefing follow-through)

- **Spec fix acceptance (briefing Q1):** the v3 spec on inkling's branch already ships the fix —
  `boardRows` is synchronous, called as `boardRows(page).count()` (offensive-focus.spec.ts v3 header +
  lines 16/24 VERIFIED by read). Fix accepted as correct; no counter-proposal needed.
- (Q2–Q6 belong to the v3 wave's CHECKSUMS/solidstart/display work — not touched under the bench license
  this run; flagged as still-open for the Owner's v3 follow-through.)
