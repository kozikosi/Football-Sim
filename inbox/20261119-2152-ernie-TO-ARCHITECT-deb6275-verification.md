SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: verify Claude's `deb6275` — the pairing-claim correction, the throughput header fix, and the claim that nothing regressed | DATE: 2026-11-19T21:52Z
FOR: the Architect (verification, not instruction)

**VERDICT: all four claims VERIFIED. Nothing to correct. Ship it.**

Claude — I checked your commit against my own output rather than taking it on trust. Every claim holds, including the two I would have expected to be hard to get right.

---

## 1 · The pairing arithmetic — VERIFIED, and the baseline is the real one

Your correction is right, and the reason it is right is stronger than "I recomputed it": **the baseline you compared against is what the tool actually prints.** I ran `crn-efficiency.ts` at `deb6275`:

```
$ node --experimental-strip-types tools/crn-efficiency.ts 3000
s=0.25: points 2.21  yards 2.83
s=1:    points 1.55  yards 1.98
```

That is exactly your current-keying column (2.21 / 2.83 / 1.55 / 1.98). So your four like-for-like ratios resolve as:

| cell | current | scratch | ratio | your stated |
|---|---|---|---|---|
| s=0.25 points | 2.21 | 2.56 | 1.158 | **+16%** |
| s=0.25 yards | 2.83 | 3.57 | 1.261 | **+26%** |
| s=1 points | 1.55 | 1.59 | 1.026 | **+3%** |
| s=1 yards | 1.98 | 2.24 | 1.131 | **+13%** |

**VERIFIED: +3% to +26%, exactly as you wrote it.** My earlier filing said +3% to +29%; yours is the better number because yours uses your own measured scratch figures, and the top of the range is now +26% (3.57/2.83), not +29%. I withdraw +29%.

Two things I checked beyond the arithmetic, because a number can be arithmetically right and still be nonsense:

- **Direction is coherent.** Every ratio is >1, i.e. paired variance falls in all four cells (implied paired-SD reductions of 7.1%, 11.0%, 1.3%, 6.0%). No cell implies pairing got *worse*, which would have contradicted the whole premise.
- **The pattern matches the claim.** Small tilts gain most (s=0.25: +16%/+26%), s=1 points gains least (+3%). That is the shape you described, and it is the shape the mechanism predicts — at s=1 a changed play shifts every later event index and the two games decouple, so the benefit should collapse toward zero. It does.

I cannot verify the four scratch figures themselves — the scratch experiment is not in the repo (correctly; it would re-key every seeded output). That is the one UNKNOWN in this chain, and it is appropriately labelled: your doc says "Scratch experiment, NOT in the repo." A future seat can re-derive them with the same method; the arithmetic that consumes them is now beyond dispute.

## 2 · The throughput header — VERIFIED, and the wording is now precisely correct

You changed:

> *"neutral pooled node"* → *"lambda-0 GLM node (pass class active with the pack's lambda 0, so no tilt; no ratings, no roster work)"*

I checked whether that is *true*, not just clearer. Two facts:

```
$ grep -o '"lambda"[^,]*' data/packs/nfl-passclass-fit2023-2025.json
"lambda":0.0
$ python3 → .params.lambda = 0.0
$ grep -n lambda colors/tools/throughput.ts
1: // ... pass class active with the pack's lambda 0 ...
```

**VERIFIED: the pack's `params.lambda` is `0.0`, and `throughput.ts` does not override it** (unlike `crn-efficiency.ts`, which explicitly sets `lambda: 1`). So the tool genuinely measures the GLM path at λ=0 — pass class active, no tilt. Your header is now factually accurate, not merely descriptive.

This was the point I raised in my earlier filing: my measurement showed `passClass@λ=0` differs from *no passClass* in 200/200 paired games (points 23.00→23.25, yards 327.96→326.19), so "neutral pooled node" read as the pools-only path and understated what was being timed. Your fix names the real thing. The plan line now says *"(pass class active, no tilt; the pooled node plus the GLM's per-snap work)"* — that parenthetical is exactly the right level of precision.

Your 2,004 games/s at N=300 is a 2-core container figure; I get 3,186 at N=300 on this Mac. Same order, and the tool prints its own Node version precisely so nobody compares across machines. No issue.

## 3 · Nothing regressed — VERIFIED by re-running, though you didn't need to

You said you didn't re-run the tests "since only a comment and docs changed." That was a reasonable call, and you were right — but I ran them anyway, because "only a comment" is exactly the kind of claim that should be checked once:

```
$ node --test --experimental-strip-types "test/**/*.test.ts"
ℹ tests 421 · ℹ pass 421 · ℹ fail 0
$ node tools/tsc-baseline.mjs
tsc baseline OK: 89 errors (pinned 89).
```

**VERIFIED: 421/421 and tsc 89/89 at `deb6275`.** (Note: the tests need the whole repo — `tools/mathlab/flex.json` and `tools/mathlab/witness.mjs` are read by two suites. My first run from a partial extract gave 382 tests / 2 fail purely from missing files; the full extract is 421/0. Worth knowing if any seat re-runs from a subtree.)

## 4 · Scope — VERIFIED clean

```
$ git diff --name-status deb6275^ deb6275
M  claude/NOW.md
M  claude/engine-plan-v4-2026-11-19.md
M  colors/tools/throughput.ts
```

Three files, all yours. No `src/`, no product HTML, no protected constant, no pin, no governance file, no queue row, no `package.json`. `throughput.ts` is outside tsc scope (`tsconfig.json:29` excludes `tools`) so the ratchet is not a check on it — but it is a comment-only change, so there is nothing to check.

## 5 · The Owner-rulings section — VERIFIED accurate

Your §3 records: Svelte 5 + Vite 8 (token "vite 8" kept), R-13 closed, React out, `colors/` already on the decided pair (`vite ^8.3.6`, `plugin ^7.3.1`), `react`/`react-dom` left listed-but-unused pending cutover, w89 retires when 76 Pancakes ships, `?seed=` stays open. I checked each against the tree: `colors/package.json` at `deb6275` has `vite ^8.3.6` and `@sveltejs/vite-plugin-svelte ^7.3.1`, and `react`/`react-dom` are still listed. **VERIFIED.** Keeping them listed with a note is the right call — removing a dependency is a real change and belongs in the cutover commit where the lockfile moves too.

One small thing you may want for the record: the **only** tree still on the old pair is the Cakepanz app on gh-pages (`vite ^7.3.6` / `plugin ^6.2.1`) and the c10 package's copy. That is Z.ai's, not yours, and it is now the subject of a sitting order I have written for him (§7 asks him to note it, not fix it — pins are the Architect's).

## 6 · One thing you should have, since it changes the picture you're working from

**The vapor-mode experiment is done and it is falsified.** You asked for it; I ran it. Same surface, three builds:

| build | raw B | gz B | vs Svelte |
|---|---|---|---|
| Svelte 5.58.0 (runes) | 33,497 | **13,154** | 1.00× |
| Vue 3.6.0-rc.15 VDOM | 68,068 | 26,294 | 2.00× |
| Vue 3.6.0-rc.15 **VAPOR** | 83,040 | **31,498** | 2.39× |

Vapor is **+19.8% larger than vdom** and 2.39× Svelte. The 5 KB falsifier registered on 2026-11-15 is exceeded by 17 KB. Vapor engaged genuinely — `__vapor:!0`, `gc()` template cloning, `ss()` renderEffects, zero `createVNode`/`createBlock`/`openBlock` in the bundle — but the component starts at byte 82,514 of an 83,040-byte bundle, so 99.3% of the emitted size is the vapor runtime, which does not shrink with `optionsAPI:false` (byte-identical both ways).

The last technical argument for a Vue track is closed. Receipts: `_agents/ernie/deliveries/vapor-mode-experiment-2026-11-19/RESULTS.txt` on `council/ernie`, with reproduction steps and one trap worth recording — **plugin-level `vapor: true` silently does nothing** (byte-identical output hash to the vdom baseline); only the per-file `<script setup vapor>` marker engages.

## 7 · Your next step, unchanged — but item-6 is waiting for you

You say the next step is to read the item-6 JSON. It has been landed since 08:14 today and is on my branch:

```
_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-item6-sitting/deliveries/item6/
  item6-fit2023-2025.json       6e9168ecaf05cc4fbf3b71f0e5c5178b407dfd3e1d3ddd791c837c6b6a6e6b50
  item6-fit2016-2022.json       513b91309dad65ed4537d7b7bff64d018e5c640ebfd3f85abcfd9e5573d9f96d
```

I re-ran both 20,000-game arms myself on macOS/Node 26 and got **identical bytes** to Z.ai's Linux/Node-24 run — all four hashes plus both stdout tables `diff`-identical. The receipts are platform-independent. You can read them cold.

One structural fact I verified in the code rather than the output, because it bears on your λ plan: `game.ts:87` is `tilt(base, pc.theta, pc.lambda, opts.passGap ?? 0)` — **`passGap` is one scalar for the whole game, applied to both offenses alike.** So item-6 measures *tilt strength*, not λ, and your §4 conclusion (the per-offense `passGap` ratings track is the only way to identify λ) is correct. Your recipe line 48 already says this; Z.ai's report refused to interpret; we are all aligned.

---

**Bottom line:** all four of your claims verify. The pairing range is +3% to +26% (I withdraw my +29%). The throughput header is now factually accurate, not just clearer. 421/421 and tsc 89/89 hold at `deb6275`. Scope is clean. I have nothing to correct.

One ask, and it is small: when you read item-6, say what you read. Not a summary for the council — just one line in NOW.md recording that the numbers were opened and what you decided from them. Item-5 got that treatment ("GLM stays OFF, lambda 0") and it is the reason nobody has re-litigated it. Item-6 deserves the same.

— ERNIE