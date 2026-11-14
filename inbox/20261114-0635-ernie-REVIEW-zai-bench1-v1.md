SPEAKER: ernie | ROLE: council | TASK: review Z.ai's BENCH-1 run v1 · DATE: 2026-11-14T06:35Z
FOR: the Owner · the digest

Vendored to `council/ernie` at `_agents/ernie/deliveries/zai-bench1-run-v1-2026-11-14/` (commit `5f970a7a`) so any seat can read it. **This is the first BENCH-1 run and the first benchmark in the wave with a real workload.**

---

## 1 · Delivery verified (VERIFIED)

```
command: python3 recompute of every sha256 in MANIFEST.txt, on the source folder and again on my copy
output:  source: 232 OK, 0 MISMATCH, 0 MISSING
         copy:   232 OK, 0 MISMATCH, 0 MISSING
         233 files total · 9.3 MB · no node_modules vendored
```

**Clean, and it survives the copy byte-for-byte.**

## 2 · Tier 1 — I counted the gates myself (VERIFIED)

```
command: python3 json parse of receipts/tier1-run{1,2,3}.json
output:  run1: gates=104 passed=104 failed=0 ok=True hashes=22
         run2: gates=104 passed=104 failed=0 ok=True hashes=22
         run3: gates=104 passed=104 failed=0 ok=True hashes=22
         tier1-runs.status = "ALLDONE"
```

**104/104 in all three runs, zero failures, 22 hashes each.** The claim is exact, not rounded up.

## 3 · The fairness check nobody else had done — and it passes (VERIFIED)

This is the one I would have run first, because every prior comparison in this wave was confounded by arms that were *not* running the same code.

```
command: diff -rq <arm-svelte-pub>/src-bench/engine <arm-vue-pub>/src-bench/engine
output:  (no output) — diff lines: 0
         file counts: 57 and 57
```

**The two arms vendor a byte-identical engine.** So the Tier-1 answer key and the Tier-2 numbers are measuring the *same* computation on both sides, and any difference in the results is attributable to the framework rather than to the engine. **That is the first genuinely controlled comparison in this wave**, and it is the delivery's most important single fact.

## 4 · The headline finding is not a framework finding (VERIFIED, and this is the valuable part)

```
receipts/tier2-run1.console:
  PICKCURVE: n=32  p50=161.8  p95=14912.2  max=15828.5      (ms)
  second:    n=32  p50=145.3  p95=2195.5   max=2344.6
  CELL r16-u31 select  vue p50=45.7 p95=54.9 / svelte p50=45.7 p95=58.0
```

**The board's pain is the engine's `goneOdds` replay window, not either framework.** p95 of **14.9 seconds** against a 250 ms budget is ~60× over — and the cell measurements show Vue and Svelte within a few ms of each other once the state container is right.

**This reframes the whole wave.** The nine-arm study asked "which framework renders the board faster" and found a tie, because at 32 rows nothing hurt. At 1,941 rows the answer is: **neither framework is the bottleneck; a single engine data structure is.** That is a product finding worth more than any framework verdict, and it is the kind of thing only a real-workload run produces.

**It also vindicates the decision not to rank.** Anyone who had scored "board performance" on the nine-arm fixture would have been measuring noise.

## 5 · The one real framework difference — and it cuts both ways (VERIFIED)

> "Svelte 5 refused to boot on the engine's selector-side mutation until the state container was made raw (error message precise, fix one word), Vue 3 silently accepted it — and if the container is a deep `ref`, Vue then taxes the engine's reads ~4–5× with proxy/tracking overhead (also fixed with one word, `shallowRef`, but nothing tells you)."

**This is the first measured framework difference in the wave, and it is a genuine trade rather than a win:**

- **Svelte fails loudly.** It refuses to boot, with a precise error. Costly in the moment; safe over a year.
- **Vue fails silently.** It accepts the mutation and then quietly makes the engine ~4–5× slower, and *nothing warns you*. Cheap in the moment; expensive over a year — and for an owner maintaining with AI assistance, a silent 4–5× tax on the engine is exactly the failure that survives a demo.

**I would put this in the digest as the single most decision-relevant sentence in the delivery**, with the caveat that it is a *developer-experience* difference, not a *correctness* difference — both arms ultimately produced identical output (600/600 G5 samples).

## 6 · Environment and honesty (VERIFIED)

- **Node v24.22.3** — the Owner's pin, unlike every other run this week (26.13.0). **This is the best-based measurement in the wave.**
- Firefox/WebKit **not run**: missing `libsecret-1.so.0` / `libGLESv2.so.2`, `install-deps` needs root. Recorded verbatim as A3 statuses with A2 UNKNOWN. **That is the right way to report a gap.**
- Engine vendored at `d3bd81d2` with the START-OF-CHAT pin `4ca9a071` explicitly marked stale — **matches my own verification exactly.**

## 7 · What I would flag, and one caution

1. **"Byte-identical" is evidence about the wiring, not about maintainability.** 600/600 identical samples prove the two shells drove the same engine to the same result. They do **not** prove the two shells are equally maintainable — which is the column the decision actually turns on, and which this run did not touch. The digest must not let "byte-identical" drift into "equivalent".
2. **The UX-1 budget breach needs a decision, not a framework score.** The report correctly says it needs the Owner: is 250 ms p95 the right budget, or is the `goneOdds` replay window the thing to fix? My read: **fix the window.** A 14.9 s p95 is a product defect that no framework choice repairs, and it is the same on both sides.
3. **§7's "my own building preference"** is properly labelled "asked for, not a ruling" — fine, and I am not treating it as evidence.

## Verdict

**Accepted as verified evidence, and it changes the shape of the question.** Three checks I ran myself all hold: 232/232 manifest, 104/104 gates ×3, and — the one that matters — **the two arms run a byte-identical engine**, so this is the wave's first controlled comparison. The most useful output is not a framework score: it is that **the board's pain is a single engine data structure, identical on both sides**, and that the one real framework difference found (Svelte fails loudly, Vue fails silently and taxes the engine ~4–5×) is a maintainability trade the Owner should weigh.

Labels: **VERIFIED** — the manifest on both copies, the 104/104 ×3 gate counts, the zero-line engine diff, the pick-curve numbers, Node 24.22.3, the stale-pin handling. **REPORTED** — the ~4–5× proxy overhead figure (I read it in the report and the console; I did not re-run the isolated micro-benchmark). **INFERRED** — that fixing the `goneOdds` window is the right call over relaxing the budget. **UNKNOWN** — Firefox/WebKit (blocked, by his own receipt); whether the same engine bottleneck exists in the product's live build (the product is drive-level, this run is on the Colors engine).

*Filed by ERNIE (advisor) · 2026-11-14T06:35Z · read-only on Z.ai's delivery; I modified none of it.*

**PRIORITY+:** review of Z.ai's BENCH-1 run v1 | P1 | 232/232 manifest; 104/104 gates ×3 verified; **arms run a byte-identical engine (diff 0 lines, 57 files)** = first controlled comparison; board pain is engine-side `goneOdds` (p95 14.9 s vs 250 ms budget, ~60× over), not framework; one real framework difference (Svelte fails loudly / Vue silently taxes engine ~4-5×) | ERNIE this file.