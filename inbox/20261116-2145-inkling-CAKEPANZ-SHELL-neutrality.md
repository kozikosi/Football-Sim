SPEAKER: inkling | ROLE: council | TASK: CAKEPANZ assist, Part 3 — neutrality | DATE: 2026-11-16T21:45Z
FOR: R-13

# Cakepanz — framework neutrality, census (Part 3)

**Unblocks:** Z.ai's "framework-neutral implementation rules" (v4-1 ground truth); the Owner's cutover decision (this file says what a re-bind costs). Two trees measured: the s5 delivery (slices 1–5, `4ca9a071`) and live gh-pages (slice 1–2 + re-pin, `d3bd81d2`). No Vue anywhere in either (it is Svelte 5 throughout) — Part 3's question is therefore "how locked into Svelte, and what must change at handoff."

## Census (both trees)

| item | s5 delivery | gh-pages live |
|---|---|---|
| `.svelte` files (render layer) | 14 (1,039 lines) | 10 (425 lines) |
| non-engine `.ts` modules under `src/` | 9 (750 lines) | 3 (52 lines) — only slice-1/2 surface |
| `.svelte.ts` / `.svelte.js` rune modules | **0** | **0** |
| framework imports in `.ts` modules | exactly one: `src/lib/draftStore.ts` → `{ readable, writable } from 'svelte/store'` (20-line adapter; its own comment: "The store is framework-free; this file only adapts it to Svelte's readable contract") | same file, same shape; plus `App.svelte` (`writable`, `onMount`) and `main.ts` (`mount`) |
| `.svelte` runes below the render layer (VM/data code) | **none found** (`grep \$state/\$props/\$effect/\$derived` over `src/lib/*.ts` → empty) | same |
| framework-specific deps added | `svelte ^5.57.3`, `@sveltejs/vite-plugin-svelte ^6.2.1`, `vite ^7.3.6` | same |
| new framework deps beyond the baseline | none | none |
| node-side battery (`batteries/*.battery.mjs`) | framework-blind (imports engine + playwright only; one prose mention of "a Svelte component tree cannot run them verbatim") | same |
| Vite config | `svelte()` plugin + `base: './'` — render-toolchain only | same |

## What is locked in, file by file (fix cost at handoff)

1. **`src/lib/draftStore.ts`** (20 lines) — the whole `svelte/store` contract: `readable(init, subscribe)` + `writable`. A Vue re-bind replaces it with a ~15-line `ref`/`customRef` adapter; a plain-TS runtime replaces it with a 10-line observable. **Mechanically isolated exactly as the v4 rules ask** — it is the thin binding. It lives in `src/lib/` (the otherwise framework-free core) rather than in a bindings directory; cosmetic, flag not defect.
2. **`main.ts`** — `mount(App, { target })`. Re-bind entry point; Vue: `createApp(App).mount('#app')`. Trivial.
3. **`App.svelte` + 9–13 components** — props runes (`$props`), local `$state`, `on:click`, class directives, `<style>` blocks. Standard Svelte 5; a Vue port rewrites these files (973 lines delivery-total) with same props/data-flow — the v4 prompt's "Vue and Svelte build at the same pace" premise says this is the refresh, not a rewrite of logic. INFERRED (no proof run in this filing).
4. **`valuation.ts` / `feedVM.ts` / `bragCard.ts` / `shareVM.ts` / `savesApp.ts` / `abbr.ts` / `ink.ts`** (730 of 750 non-engine TS lines) — **framework-free, no imports beyond types and the snapshot**; these ride into either framework untouched. VERIFIED by the greps above.
5. **`batteries/*.mjs`** (node-side) — framework-blind; a Vue tree can run them as-is. VERIFIED by reading imports.
6. **No `.svelte.ts` bridge, no Svelte-specific lifecycle tricks in VM/data code, no stores defined with `$state` in `.ts` files.** VERIFIED (`find` + `grep`).
7. **CSS is component-scoped and plain** (no Svelte-only at-rules besides scoping semantics; no nesting beyond native CSS). INFERRED from component `<style>` blocks read (`TeamSelect`, `Feed`, `Share`); not exhaustively audited.

## The one framing finding (offered to the Owner, not ruled on)

Everything above is "portable at retry cost": the shell is **Svelte-shaped, not Svelte-locked below the render layer** — which is precisely what the TS-neutral ruling permits ("you may keep Svelte 5 as the render layer … NO Svelte-specific patterns may leak into VM/data code"). The ruling does NOT make the shell Vue-ready for free: the 14 `.svelte` files + the `draftStore.ts` adapter are a genuine port cost (≈1,060 lines), identical in kind to the reverse port. If the cutover picks Vue, the Builder re-writes those files and re-verifies the battery — nothing in the ruling promises otherwise; the measured claim is that the 750-line TS core, the engine snapshot contract, and the battery ride across unchanged.

**Zero new framework-specific dependencies were added.** VERIFIED (`package.json` history vs baseline; `git log -p -- package.json` — no added dep beyond svelte/plugin-svelte/vite/typescript). INFERRED for pre-slice-1 baseline (not inspected).

## How to verify

```
find src -name '*.svelte.ts' -o -name '*.svelte.js'        # empty
grep -rn -E '\$state|\$props|\$effect|\$derived' src --include='*.ts' | grep -v engine/   # empty
grep -rn -E "from '(svelte|vue)" src --include='*.ts' | grep -v engine/   # draftStore.ts, main.ts only
```

## Not done

- No Vue arm exists for this shell to diff; port-cost is estimated, not measured.
- Fresh-start arm comparisons (Vue vs Svelte interchange) are out of scope here — see my sealed-bench filings (20261116-1655, 20261116-0520).
- The `vite.config.js` carries zero neutrality hazards for the pick itself (either framework has an equivalent one-file config); the single-file/file:// defect is tracked in my seam filing §2 and is framework-orthogonal.
