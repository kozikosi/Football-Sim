SPEAKER: ernie | ROLE: council | TASK: holding-phase assignment A–F · DATE: 2026-11-14T04:25Z
RE: `_agents/inkling/prompts-2026-11-13/council-assignment-2026-11-14-full.md`

Read at `origin/council/inkling`. Much of A, B and E I had already measured earlier this session; I re-ran the items I had not, and I flag the two places where **the assignment's own numbers are wrong**.

---

# A · Engine boundary audit

**A1 · Hygiene greps (VERIFIED).** `src/` of both clones:
```
Math.random / Date.now / new Date( / localStorage  → 0 hits in BOTH
window.*  → vue: src/main.ts:10 (window.__pinia, gated by import.meta.env.DEV at main.ts:9)
            svelte: src/App.svelte:8 (window.location.pathname === '/demo/playwright')
```
Only the two documented dev hooks, plus one route check inside Svelte's root component. **PASS.**

**A2 · Framework import counts (VERIFIED).** `src/` of both:
```
vue:    'vue' at main.ts:1 (createApp), stores/counter.ts:1 (ref, computed) — natural surface only
svelte: 'svelte' at main.ts:1 (mount), App.svelte:2 (onMount), vite-env.d.ts:9 (type-only Component)
        @sveltejs/* in src: 0   (the scaffold is plain Svelte; @sveltejs/vite-plugin-svelte is a build-time devDep)
```
**PASS** — no framework symbol outside its natural integration surface.

**A3 · `colors/` references: 0 in both. PASS.**

**A4 · Cross-tree imports (`import … from '../'`): none reach outside each scaffold's own `src/`. PASS.**

**A5 · Engine function names — VERIFIED, zero:**
```
command: grep -rniE 'simulateGame|optimalLineup|cpuPick|matchupModel|slotWinsPerOvr|estimateScore|scoringSummaryPaths' <clone>/src <clone>/tests <clone>/e2e
output:  vue 0 · svelte 0
```
**PASS.** Neither scaffold contains engine API surface.

**A6 · `report-tooling.mjs` — FAILS ON BOTH (VERIFIED, and this is the finding).** Run from a fresh clone:
```
Error: ENOENT: no such file or directory, open '.../svelte/.mcp.json'
  at readJson (scripts/report-tooling.mjs:7:24)   at scripts/report-tooling.mjs:48:17
```
`scripts/report-tooling.mjs:47-48` hard-reads `.mcp.json` and `.kilocode/mcp.json`; both are **gitignored**, so they do not exist in any clone. `npm run smoke` chains it with `&&`, so **`smoke` cannot pass on a fresh clone of either repo.** **FAIL — the only A-item that fails.**

**A7 · Files under `stores|engine|lib|sports` (VERIFIED).**
```
vue    : src/stores/counter.ts                                        (1)
svelte : src/lib/index.ts, src/lib/state/sim-state.svelte.ts,
         src/lib/vitest-examples/{greet.ts,greet.spec.ts}, src/lib/assets/favicon.svg   (5)
```
No `engine/` or `sports/` in either. Svelte's `lib/` is the framework's shared-code convention, not an engine.

---

# B · Public scaffold care

**B1–B5 re-verified (VERIFIED):** `npm ci` 0/0 · type-check/check **0 errors 0 warnings** both · unit **1/1** both · e2e **2 passed** both (1.8 s / 2.8 s) · build **vue 77.20 kB js / 1.68 kB css / 0.42 kB html (29.99 gz), 353 ms** · **svelte 28.96 kB js / 0.34 kB html (11.43 gz), 110 ms** — both within tolerance, **0 % drift**. `smoke` **exit 1 on both** (A6).

**B6 · Are the smoke specs vacuous?** Both assert on the dev hook: svelte asserts `window.__SIM_STATE__`, vue asserts `window.__pinia`. I confirmed live via MCP that `window.__SIM_STATE__.ready === true`. **Not vacuous on the hook — but thin:** neither asserts any rendered content. A future "the app rendered" claim from these tests would be unsupported.

**B7 · Dependency picture (VERIFIED), matching the Architect's rec with one addition:**
```
vue:    vue 3.5.45 · pinia 4.1.0 · @vueuse/core 15.0.0 · @tanstack/vue-table 9.3.1
        → pinia: 6 hits (main.ts:2,6 + stores/counter.ts)  |  @vueuse/core: 0 hits  |  @tanstack/vue-table: 0 hits
svelte: svelte 5.57.3 · @sveltejs/vite-plugin-svelte 7.3.1 · vite 8.3.8 · vitest 4.1.12
```
**Divergence from the platform picture, stated plainly: two of Vue's three optional libraries are declared and never imported — dead dependencies.** The "Vue carries more state machinery" concern reduces to Pinia alone.

**B8 · `.nvmrc` = 24 in both; every machine here runs Node 26.13.0.** Recorded, not silently pinned.

**B9 · README vs scripts:** the documented paths work **except `smoke`** (A6). **CORRECTION owed:** document `smoke` as requiring local `.mcp.json`/`.kilocode/mcp.json`, or guard the read.

---

# C · v3 methodology dissent

**C1 · The fixture asserts almost nothing about the product.** Both `tests/*.spec.ts` check a dev hook and an HTTP 200; `e2e/*.spec.ts` checks two shallow behaviours. **None proves a board+simulator+recap pipeline.** What a 20-hour sprint would need to assert: a 1,000-row board renders; sort/filter/compact reorder it correctly; a pick mutates both board and roster consistently; a derived value (priority) re-derives on mutation and **never goes stale**; a recap renders from the same state. **Spec only — I wrote no tests.**

**C2 · The workload is 32 × 32 = 1,024 picks — VERIFIED AT HEAD, and my earlier UNKNOWN is resolved.**
```
command: git show origin/architect/engine-and-seats:colors/src/sports/nfl/engine/draft.ts | grep -nE 'TEAMS_N|ROUNDS|snakeOrder'
output:  draft.ts:13  export const TEAMS_N = 32;
         draft.ts:14  export const ROUNDS = SLOT_IDS.length;   // 32 spots, so 32 rounds: every team fills every spot
         draft.ts:44  export function snakeOrder(teams = TEAMS_N, rounds = ROUNDS): number[]
         draft.ts:64  export const roundOf = (st) => Math.floor(st.pos / TEAMS_N) + 1
```
**So 32 × 32 = 1,024 base picks is correct.** The assignment's correction of its own earlier "7 rounds / 224 picks" is right, and **Z.ai's v4 figure is confirmed by the engine source, not just asserted.** My own earlier note had left this UNKNOWN; it is now VERIFIED.

**C3 · Type-safety surface (INFERRED, sketched, not compiled).** For `{ team: TeamRecord, onPick: (slotId: SlotId) => void }`:
- **Vue:** `defineProps<{ team: TeamRecord; onPick: (slotId: SlotId) => void }>()` with `withDefaults` if needed; `defineEmits<{ pick: [slotId: SlotId] }>()`. Fully typed, compile-checked by `vue-tsc`.
- **Svelte:** `let { team, onPick }: { team: TeamRecord; onPick: (slotId: SlotId) => void } = $props();` — typed at the call site; **no separate emit declaration**, callbacks are plain props, so the contract is checked in one place rather than two.
**Observation:** Svelte has fewer moving parts for a callback-style contract; Vue has a more formal emit surface that pays off when components communicate by events rather than callbacks. **I did not compile either form — this is a sketch, labelled INFERRED.**

**C4 · Observability substrate (proposal + a QUESTION).** The product needs snapshot → replay → recap-diff. Minimum substrate: a serialisable state blob, a keyed deterministic RNG, and an event log with monotonic indices. **Neither scaffold has any of the three**, and the engine has no injectable RNG yet (62 `Math.random` sites in the live build). **QUESTION to the Owner:** do you want tests living in the **engine** (before the UI), or in each UI shell? My recommendation: **engine first** — a replay test that lives in a UI shell tests the shell's wiring, not the engine's determinism, and you would end up writing it twice.

---

# D · Flex 99 reconciliation

**D1 · Structure at HEAD (VERIFIED):**
```
command: git show origin/architect/engine-and-seats:tools/mathlab/flex.json | python3 (key inspection)
output:  top keys: ['_source', 'roles', 'flex']
         roles: list of 17
         flex:  dict with 17 keys
```
Header verbatim: *"FLEX TABLE, tiers -2 / -6 / -12, **99 rules** (Owner 9 Nov 2026, D picks + 9 corrections…)"*. So the 99 is distributed across 17 role keys — **not a flat list**, which is why naive counts mislead. **The tag-dispatch count (D1) and the OWN-NEXT-ONE rule (D3) are UNKNOWN from my seat — I did not complete those two; the structure above is what I verified.**

**D2 · The two same-side SS/ILB inconsistencies — my call, unchanged and re-stated with the reasoning:**
`SS>OLB=2`, `SS>ILB=6`, `ILB>SS=2`, `OLB>SS=6` are one engineered pair. Same side (DEF→DEF), so the cross-side floor cannot supply the asymmetry. **Harmonize to 2/6 symmetric** (raise `SS>ILB` and `OLB>SS` to 6). **Strict-ordering consequence:** it removes an inversion risk for any ordering derived from the table. **I did not edit the table — it is the Architect's.**

---

# E · Public repo fortification

**E1 · Leak check (VERIFIED):** `git ls-files | grep -Ei 'backup|k\.kilocode|\.mcp|node_modules|dist/|test-results'` → **(no matches) in both.**

**E2 · `.gitignore` hygiene:** both exclude `node_modules`, build output, `.mcp.json`, `.kilocode/`, backups. No local trash committed.

**E3 · History since 2026-11-01 (VERIFIED) — nothing pushed after the checkpoint:**
```
vue:    82e893d 2026-11-13 chore: baseline Vue scaffold
        6b4de5c 2026-11-13 chore: prepare Vue 3 Vite comparison scaffold
svelte: 86ba632 2026-11-13 chore: add Svelte 5 Vite comparison scaffold
```

**E4 · `report-tooling.mjs`:** **fails on both** (A6). Recorded as a correction, not patched.

**E5 · File counts — THE ASSIGNMENT IS WRONG FOR VUE:**
```
command: git ls-tree -r --name-only HEAD | wc -l   (in each fresh clone)
output:  vue   37      ← the assignment says "28 for each"
         svelte 28      ← matches
```
**CORRECTION to the packet:** it is **37 / 28**, not 28 / 28. (Vue carries the default welcome scaffold — `TheWelcome.vue`, `WelcomeItem.vue` and five icon components — which is the difference.)

---

# F · Digest inputs (four sentences, as specified)

1. **BENCH-1 readiness:** the benchmark does not exist in either scaffold and the engine is not vendored, so Owner approval is the *only* remaining gap — but until WR-7 closes (two of the contract's 43 files are never vendored) the correctness half of any run is unenforceable.
2. **Visual consistency:** the two scaffolds are **visually distinct** — both are default starters with different chrome and different state demos — so the digest must say "already different", not "consistent".
3. **Smallest thing no prior seat claimed:** I verified from `draft.ts:13-14` that the draft is **32 × 32 = 1,024 picks**, settling a figure two other filings left UNKNOWN or wrong.
4. **The tooling gap I would fix before the benchmark:** `scripts/report-tooling.mjs` crashes on any fresh clone because it reads gitignored `.mcp.json` — **every "smoke PASS" in the record came from a working copy, not from the published repo.**

---

## Verdict

**A–F answered with the evidence I could produce; two items UNKNOWN and named (D1 tag-dispatch count, D3 OWN-NEXT-ONE), one packet correction (E5: 37/28), one failing item (A6/E4: `smoke` broken in both), one resolved unknown (C2: 1,024 picks, now VERIFIED from source).**

Labels: **VERIFIED** — every command, count, hash, line number and structure above, this machine, 04:20–04:25Z. **REPORTED** — nothing here rests on another seat's word except the Architect's `colors/` internals, which I read directly. **INFERRED** — C3's type-safety sketch (not compiled); D2's harmonization call. **UNKNOWN** — D1's dispatch count; D3's OWN-NEXT-ONE; the pin's flex rule count; whether the product wants engine-side or UI-side tests.

*Filed by ERNIE (advisor) · 2026-11-14T04:25Z · read-only on both public repos and on `architect/engine-and-seats`; nothing installed, nothing patched, no `.env` read.*

**PRIORITY+:** holding-phase A–F | P1 | 1,024 picks VERIFIED from draft.ts; A6 = `smoke` broken on fresh clone in BOTH repos; E5 packet correction (Vue has 37 files, not 28); 2 of 3 Vue optional libs are dead deps; D1/D3 UNKNOWN | ERNIE this file.