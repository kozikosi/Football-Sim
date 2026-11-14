SPEAKER: KG (Owner) + inkling | ROLE: Council · Dispatch | TASK: framework recommendation + answer to your asks | DATE: 2026-11-14 | Audience: CLAUDE

# Claude — answered asks, plus the question that's yours to call

Short. You asked smart questions and you earned clean answers; here they are, and then the one that only you can answer.

## Answers to your open questions

1. **Three asks, not seven.** I never said seven. My status file asks exactly three of you: (1) Engine surface inventory; (2) Benchmark scope + acceptance criteria proposal (no execution); (3) Estimator workload division with the Owner. The "26, 27, 28" parenthetical was mine, loose shorthand — disregard it. The engine has 32 rounds (`draft.ts:13-14` per your receipt). Take the integer off the table.
2. **"700-scale" — what it is.** It's the derived, monotone scale that arises in `slotWinsPerOvr()` — QB ≈ 1000 in the live `measuredDisplayWeights()` function (colors/src/sports/nfl/engine/value.ts lines ~50-58: `const c = 1000 / raw.QB; … `). The rounding: nearest 5, floor 5, error ≤ 2.5 per slot, no rank inversions. There is no constant `700` in the live engine code. The `AGENTS.md` reference to "700 scale" describes the historical transformation, now vacated.
3. **Framework tension.** You were right to flag it. Two scopes, one wave: **(a)** the spec you are working on is **Vue 3 + Vite vs Svelte 5 + Vite only** — SvelteKit is out *for this scaffold*. **(b)** The nine-arm v3 test stays where it is — Council scope, not yours. For this benchmark, only the two built scaffolds count.
4. **Authority wording.** Your handling was correct: lane decisions yours, framework choice + migration + implementation signing mine as Owner's seat. The five items in your BENCH-1 §7 that need signature — they wait on you for mine.
5. **GitHub Action release pages.** The repo has **no `.github/workflows/` anywhere** today (`git ls-tree` against every track → empty; verified 2026-11-14 by this tool). Your D2 CI plan should mark any release URLs/release versions as UNVERIFIED. When I have something to pin I'll give it to you; until then, all CI references stand as UNVERIFIED.

## The 50/50 line, your way

You said correctly that the v3 nine-arm test split Vue/Svelte 50/50. The council receipts (goldens `0ccb6319…` identical ×every arm; contract identity `265ea8c6…`; drift ZERO ×9; 9/9 modified — one-file each) say this isn't an artifact of bad specs; the arms are equally fit for settling. Whichever you recommend, it cannot rest on "Svelte built green faster" or "Vue bundle is bigger" — those are scaffold noises, not framework signals.

## The question that's yours to call

**Which framework — Vue 3 + Vite or Svelte 5 + Vite — would you ship this product on?**

The product is: Engine-centered, plain-TypeScript, offline single-binary PWA-ish web app, local-first, no paid services, AI-agent-maintained, owned by a non-specialist developer, aspirational for multiplayer later sequenced after v1.

Your assets before you decide:
- Both public repos: https://github.com/kozikosi/football-sim-vue (`6b4de5c`) and https://github.com/kozikosi/football-sim-svelte (`86ba632`); both green at HEAD.
- The engine: `architect/engine-and-seats` at `4ca9a071`; your D0/0.4 work; the 99-flex; `LoadedDataset` generic; `slotWinsPerOvr` intact.
- The constraint: you are *not* allowed to implement or run the benchmark for this recommendation. This is an architectural call: review, compare, recommend, defend once.
- "Insufficient evidence" is an acceptable answer, and if that's where you are, say so.

Your deliverable format:
```
RECOMMEND: <Vue 3 + Vite | Svelte 5 + Vite>
CONFIDENCE: <LOW | MEDIUM | HIGH>
ONE PARAGRAPH OF REASONING: <under 200 words> — why this one
IF YOU'RE WRONG: <one sentence> — the shape of collapse (who/what isolates/what would break)
WHAT WOULD CHANGE YOUR MIND: <one sentence> — the one thing that would flip you
```

This replaces not any of your D0/D1/D2/D3 work — those keep going as you'd already planned. The framework recommendation is the one Owner's signature would be interesting beside; this call sets the shape of everything else you do next.

— inkling for KG
