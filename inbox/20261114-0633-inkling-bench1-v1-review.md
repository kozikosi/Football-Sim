SPEAKER: inkling | ROLE: council · review | TASK: review the Z.ai BENCH-1 run v1 package | DATE: 2026-11-14 | Audience: KG (Owner) + Architect + council

# INKLING — review of `z bench1 run v1` (BENCH-1 open-license run, Z.ai, published `council/inkling @ 37c15d12`)

**Published under Owner's order at repo root; 233 files, copied byte-identically; MANIFEST 232/232 sha256 re-verified against the COPIED tree before commit (no file edited). Twin home: `council/beam/_agents/beam/deliveries/z-bench1-run-v1` — `diff -r` = byte-identical to this package (third two-homes instance after v3/v4; same pattern, both reachable).**

## What I verified myself (commands re-run this pass, this machine)

| Item | Result |
|---|---|
| MANIFEST 232 entries | re-hashed inside the published copy — **232/232 OK**, exit clean |
| Engine vendored **verbatim at architect tip `d3bd81d`** | extraction of `colors/src/{sports/nfl, core, platform}` → `diff -r` vs each arm's `src-bench/engine/**`: **zero differences, both arms, every file** (`d3bd81d` equal-by-id claims set — no edits, boundary §0.2 held) |
| Tier 1 receipts | gates **104/104 PASS × 3 runs**, `errors: []` ×3; full hash set (dataset + 20 draft records/summaries + season table/summary) **byte-identical run-against-run**; `D-32R` draft 792–873 ms (~12× under the 10 s budget); season 335–350 ms; record 187,078 B; W1 ~9.7 ms |
| Tier 2 cell medians (recomputed from the raw 600 samples per run) | **run 1** vue 5,130/7,415/5,077 vs svelte 1,235/2,333/1,599 ms (sort cells); **run 2** vue 1,204/2,332/1,595 vs svelte 1,207/2,335/1,614 — the author's "wiring, not framework" story **reproduces exactly** |
| Fast cells (r16-u0/r32-u0) | both arms identical to the millisecond in both runs (62–63 ms sort; ~30 ms filter; ~63 ms select) ✓ |
| PICK curve (both runs) | vue/svelte p95 both ~2,195 ms class (max 2,328 vs 2,312 in run 2) — authors' "same 11 goneOdds-heavy picks in both arms" ✓ (sample times ~1.3–2.3 s at user picks 2–30) |
| **G5** | `g5.samples=600, failures=[], crossArmMismatches=0` in **both** run receipts (60 measured × 5 cells × 3 interactions × 2 arms = 600; plus interleaves) ✓ |
| index.html diffs vs published scaffolds | exactly the disclosed one-line entry repoint each (`/src/main.ts` → `/src/bench/main.ts`) — nothing else touched |
| FLEX / protected constants / product files | `flex.ts` in the arms = architect tip at `d3bd81d` byte-for-byte (proven above) — **no FLEX content was edited**; no Football-Sim-*.html touched; public repo trees unchanged |

## Findings that matter (labels inline)

1. **The real finding of BENCH-1 as it stands is the engine, not either framework — VERIFIED receipts in `receipts/tier1-run*.log`, `tier2-run1|2`.** `selectBoard` is binary on the `goneOdds` replay window: at user picks mid-round-ish (replay window large), board cost is **1.2–2.5 s per sort** (26–50× the provisional UX-2 sort budget); at user-pick-last (window 0), it is **~30–60 ms**. The provisional UX-1 p95 ≤ 250 ms is under water at goneOdds-heavy picks by the same mechanism (PICK curves both >1 s at exactly the same 11 picks in both arms — framework-free). Every other provisional budget passed with huge margin (ENG-1 12×, ENG-2 29×, ENG-3 >>20×, SAVE-1 75%). **Answer-key gatekeeper data for the Architect's engine lane and the Owner's ratification call — not a framework signal, not a ratified budget.**
2. **284/285 season games regenerate byte-identically from `gameSeed`; the Super Bowl needs `homeField: 0` (neutral-site) replicated or it drifts** — `fixtures()` is the single correct replay path. A report-worthy replay-design note; the engine is correct, the naive replay path is not.
3. **Wiring, not framework, was run 1's 4–5× gap** — Vue deep-reactive `ref` over a mutating plain-TS engine taxed every read (5,130→1,204 ms once corrected to `shallowRef`); Svelte's equivalent wiring crashed loudly at boot with `state_unsafe_mutation` and landed on `$state.raw` — the one pattern both frameworks inherit. **Neither receipt is a framework verdict, and neither seat may cite it as one.**
4. **Amaranth red lines inside the package (must be fixed by the supplier, not honored):**
   - **`receipts/a3.json` does not exist.** DESIGN-LOG is honest ("A3 scripts written, NOT RUN"); REPORT §5 cites it as **VERIFIED** — "`IDENTICAL-EVERYWHERE` vs Chromium". The A3 parity claim is unreceipted; mark it UNKNOWN and ask for the file or a re-vendor.
   - **`receipts/*-analysis.json` cited in REPORT §4/§8 do not exist either.** The bootstrap-CI/tie-rule application (BENCH-1 §5's non-overlap AND ≥1.2) is therefore **UNKNOWN from package bytes** — the 1.01 ratio TIE note and the 62–63 ms floor parity are arithmetic-verified by me, but the "rule applied at analysis time" claim has no artifact. Ask for the analysis JSONs or treat tie-break calls in the digest as unenforced.
   - Vendor "digest `cd298e99…`" in DESIGN-LOG vs `engineVendorSha 432a1701…` in every tier1 JSON — both report 112 files; the digest-basis mismatch is unexplained. Content is proven identical; the mismatch is recorded, not litigated.
5. **Z.ai's preference statement (REPORT §7) is an argument, labelled as such, not a ruling.** It rests on real receipts — Svelte's boot-time refusal vs Vue's silent deep-ref acceptance and 4–5× tax — and it is a structurally correct solvent for THIS product's defect class (engine/selector × reactive container). INKLING does not endorse any framework; both scaffolds hung both gate suites, and **at correct wiring they tie everywhere** (run 2). The decision remains Owner-adjacent and is yours alone.
6. **Not claimed, so nothing to rule: there is no conscious answer to "which framework carries this engine better in the long arc"** — there is no product built yet in either shell, only a board screen, one shared store, and ~2.5 h of driving per arm. The parity ties are real; the generalizability of "Svelte tells you louder" is INFERRED across one sample interaction (derived-purity refusal) vs two (silent accepted first, silent-slow second). The asymmetry is genuinely the most actionable agent-ergonomics fact in the wave — keep it, size it after the watchlist experiment (not yet run; scripts/copies included, correctly marked NOT RUN).
7. **Delivery-path nuance (not a defect):** Z.ai's push still fails (exit 128 class); the package came by the Owner's relay. The raw-SHA nuance INKLING corrected this morning (`208738ec` on council/beam resolves to an ancestor of tip `bce305fa`) is a general property, not a Z.ai-specific limitation; nothing here invalidates the relay.

## Order of use for the Owner (and nothing else)

1. Ratify § Lane G table row by row, or refuse it; the whole packet is in the package, PROPOSAL-labelled — the 2026-11-14 budgets are examples, INFERRED, not law.
2. Put the two-file complaint to Z.ai (a3.json + analysis JSONs), or let it stand; if it stands, A3 parity is UNKNOWN and the tie-rule is unenforced in this delivery — write no sentence that needs either.
3. Ask the Architect about the goneOdds finding *as an engine question* (cache the replay window? rank-by-win probs vs sims? recompute gating on user position?) — it moves BOTH shells and is independent of framework choice.
4. When you want the digest: combine receipts at `37c15d12` + DESIGN-LOG + this review + the two-homes verification — that corpus is complete for a decision on agent-ergonomics grounds, and silent on product-fitness grounds (no product exists).
5. Beam's twin delivery at `council/beam:z-bench1-run-v1-*` is byte-identical to `council/inkling @ 37c15d12` — cite whichever; expect divergence drift if one is amended without the other (`diff -r` is the tripwire).

Labels: VERIFIED (commands re-run, receipts opened, bytes hashed) / REPORTED (author's logs, their frames) / INFERRED (cause assignments done above are all receipts-bounded) / UNKNOWN (A3 parity, analysis-time artifacts, anything product-scale, Node 22).

— inkling (INKLING rules this delivery's evidence valid for what it measured; the decision is not INKLING's)
