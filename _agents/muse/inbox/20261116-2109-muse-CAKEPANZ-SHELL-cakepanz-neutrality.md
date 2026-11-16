SPEAKER: muse | ROLE: council | TASK: Cakepanz shell assist, Part 3 — verify the neutrality | DATE: 20261116-2109
FOR: R-13

LABELED DRAFT: This is MUSE's draft answer to the council prompt v4, written at the Owner's explicit request. It is NOT a formal council filing and NOT independent verification. The review chain (three different seats → REVIEWED) cannot be satisfied by MUSE alone — two other seats must still confirm.

# Part 3 — Verify the neutrality of the 67 Cakepanz shell

## Verdict in one paragraph

**The shell as delivered is not framework-neutral. It is a Svelte 5 application.** Every screen is a `.svelte` component, the entry point mounts with Svelte's `mount`, all reactive state uses Svelte 5 runes (`$state`, `$derived`) or `svelte/store`, the build runs through `@sveltejs/vite-plugin-svelte`, and the only dependency is `svelte ^5.57.3`. The plain-TypeScript view-model layer (`feedVM.ts`, `shareVM.ts`, `bragCard.ts`, `valuation.ts`, `ink.ts`, `savesApp.ts`, `abbr.ts`, `draftStore.ts` minus its Svelte adapter) **is** portable — that layer is genuinely framework-free and is the part that would survive a cutover to Vue, to plain TypeScript, or to a new Svelte build. But the screens themselves, the composition root, and the build are Svelte-locked, and porting them is a rewrite of every `.svelte` file, not a swap. The prompt's description of the shell as "built in plain TypeScript, framework-neutral" does not describe this delivery. The delivery's own README says so plainly ("Svelte 5 + Vite — confirmed", goals-check §1).

## 1. Evidence — the framework lock, file by file (all VERIFIED by grep/read)

### 1a. The dependency and the build — locked at the foundation

| Location | Finding |
|---|---|
| `package.json` | `"dependencies": { "svelte": "^5.57.3" }`; `"devDependencies": { "@sveltejs/vite-plugin-svelte": "^6.2.1", "typescript": "^5.9.3", "vite": "^7.3.6" }`. Svelte is the **only** runtime dependency. |
| `vite.config.js` (whole file) | `import { svelte } from '@sveltejs/vite-plugin-svelte'; export default defineConfig({ plugins: [svelte()], base: './', server: { port: 5179 } })`. The build step only works as a Svelte build. |
| `package.json` version field | `"version": "0.4.0-slice4"` — stale (the delivery is slices 1–5; README says slices 1–5). A version-string bookkeeping slip, not a neutrality issue, but it means the manifest disagrees with the delivery about what it is. |
| `src/main.ts` (whole file, 6 lines) | `import { mount } from 'svelte'; import App from './App.svelte'; const app = mount(App, { target: document.getElementById('app')! });` — the entry point is a Svelte mount call. |

### 1b. Every screen is a Svelte component (14 `.svelte` files)

```
src/App.svelte
src/lib/components/BoardFooter.svelte  BoardHeader.svelte  BoardRow.svelte
  DraftBoard.svelte  LineupAdvice.svelte  ModeSwitch.svelte  NeedsRow.svelte
  Saves.svelte  SlotPicker.svelte  SortControls.svelte
src/lib/screens/Feed.svelte  Share.svelte  TeamSelect.svelte
```

No `.vue` file, no plain-TS render function, no framework-free screen exists in the delivery. Vue-ism grep (`vue|v-if|v-for|@click|reactive\(|computed\(` in shell files) returns only false positives from the vendored engine (`boxscore.ts` uses `ref(` as a local variable name — engine code, not shell code). There is no Vue lock-in either; the lock-in is Svelte-only.

### 1c. Svelte idioms, by file and line (grep-verified)

- **Runes state:** `App.svelte:50` `let screen = $state<Screen>('team')`; `:52` `let error = $state('')`; `:53` `let feed = $state<FeedVM | null>(null)`; `:54` `let share = $state<ShareVM | null>(null)`; `:55` `let shareReturn = $state<Screen>('board')`; `:56` `let dataVersion = $state('sha256:pending')`; `:57-58` `draftSaveId`/`draftCreatedAt` `$state`. `TeamSelect.svelte:11-13` three `$derived`; `Share.svelte:21` `$derived`; `Feed.svelte:9-10` `$state` ×2, `:11-12` `$derived` ×2; `DraftBoard.svelte:24` `$derived`, `:22` `$state`; `BoardRow.svelte:9` `$state`; `Saves.svelte:21-23` `$state` ×3.
- **Svelte 5 props:** `$props()` in every component (e.g. `TeamSelect.svelte:10`, `BoardRow.svelte:8`, `DraftBoard.svelte:11`, `Feed.svelte:8`, `Share.svelte:9`, `Saves.svelte:8`, `NeedsRow.svelte:9`, `SlotPicker.svelte:10`).
- **Svelte template syntax:** `{#each …}…{/each}` and `{#if …}` in every screen (e.g. `TeamSelect.svelte:25,28,31,40`; `Share.svelte:61,65,75,80,95,100,108`; `Feed.svelte:39,47,48,57,60,72`); `{@const idx = …}` in `TeamSelect.svelte:32`; `bind:this={row}` in `DraftBoard.svelte:41`; `class:cp-on={…}` directives throughout; `onclick={…}` handlers throughout (Svelte 5 event attributes, not `addEventListener`).
- **Svelte lifecycle:** `App.svelte:4` `import { onMount } from 'svelte'`; `:177` `$effect(() => { void draftState; });` (an effect that exists only to subscribe — see §4).
- **Svelte stores:** `App.svelte:5` `import { writable } from 'svelte/store'`; `:39,43-47` six `writable(...)` stores (`boot`, `vmStore`, `advice`, `oddsMeta`, `openNow`, `needsSel`); `src/lib/draftStore.ts:3` `import { readable, writable } from 'svelte/store'`, `:19` `writable(init)`.

### 1d. The portable layer — what is genuinely framework-free (VERIFIED)

These modules import nothing from `svelte` and contain no framework idiom. They are plain TypeScript and would move unchanged into a Vue shell, a plain-TS shell, or a fresh Svelte shell:

- `src/lib/feedVM.ts` (160 lines) — engine in, plain JSON out. Imports only the snapshot engine + `./abbr.ts` + `./ink.ts`.
- `src/lib/shareVM.ts` (204 lines) — same discipline; imports `feedVM.ts` + snapshot types + `./abbr.ts` + `./ink.ts`.
- `src/lib/bragCard.ts` (164 lines) — canvas painter; platform canvas API only, no framework import.
- `src/lib/valuation.ts` (26 lines) — a tiny subscribable with `get/set/lock/subscribe`; no framework import.
- `src/lib/ink.ts` (35 lines) — relative-luminance team-ink picker; imports only snapshot `teamColors.ts`.
- `src/lib/abbr.ts` (20 lines) — pure functions.
- `src/lib/savesApp.ts` (115 lines) — envelope read/write through the engine's `serialize`/`restore` + `StorageModule`; no framework import.
- `src/engine/**` (52 files) — the vendored engine snapshot; framework-free by design (it is Claude's engine, consumed as source).

Line counts: the portable `.ts` shell layer is ~724 lines (the seven files above, excluding the engine); the Svelte-locked layer is `App.svelte` (259 lines) + 13 components/screens (~1,100 lines incl. CSS) + `main.ts` + `draftStore.ts`'s Svelte adapter. Roughly **two-thirds of the shell's own code is Svelte-shaped**; one-third is portable.

## 2. Is the shell portable to either framework at cutover, or to plain TypeScript as-is?

**No — not as-is.** What ports, and what it costs:

| Piece | Portable as-is? | What would have to change |
|---|---|---|
| View models (`feedVM`, `shareVM`, `bragCard`, `valuation`, `ink`, `abbr`, `savesApp`) | **Yes.** Copy the files; they import only the engine + each other. | Nothing, except the engine import paths if the new tree lays out `src/engine/` differently. |
| Engine snapshot (`src/engine/`) | **Yes.** It is the same code in every tree. | Nothing (re-pin discipline aside). |
| `src/lib/draftStore.ts` | **No — thin Svelte adapter.** Lines 3, 19 use `svelte/store` (`readable`, `writable`, `makeWritable`). | The file's own comment says "this file only adapts it to Svelte's readable contract". A Vue port replaces `readable/writable` with `ref`/`reactive` (or a plain subscribe function); a plain-TS port drops the file entirely and calls `store.subscribe` directly. ~20 lines, mechanical. |
| `src/App.svelte` (composition root, 259 lines) | **No.** Svelte component: `writable` stores, `$state`, `$effect`, `onMount`, `{#if}` screen switching, `<style>` block. | Rewrite as a Vue root component or a plain-TS router: screen state machine (`team | board | saves | feed | share`), boot phases, `refresh()` wiring, save/share handlers. The logic is all in the `<script>` — the rewrite is mechanical but it is a rewrite (~260 lines + CSS). |
| All 13 components/screens | **No.** `.svelte` files with `$props`, `$state`/`$derived`, `{#each}`/`{#if}`, `class:` directives, `onclick`, scoped `<style>`. | Rewrite each in the target framework (Vue SFC / plain-TS DOM builders). The CSS is portable as text (scoped `<style>` blocks would need re-scoping in plain TS, e.g. a shared stylesheet with the same class names). |
| `src/main.ts` | **No.** `mount` from `svelte`. | Replace with `createApp` (Vue) or a manual `render` + event wiring (plain TS). 6 lines. |
| Build (`vite.config.js`, `package.json`) | **No.** `@sveltejs/vite-plugin-svelte` plugin + `svelte` dependency. | Swap the plugin for `@vitejs/plugin-vue` (Vue) or drop it (plain TS + Vite). Config is 8 lines; the dependency swap is the real change. |
| Battery + probes | **No.** `slice1.battery.mjs` drives the app through Playwright selectors (`.cp-*` classes) — those survive a port — but it assumes `vite preview` serving the Svelte build and `window.__cp.store` (set in `App.svelte`'s dev boot). A ported shell must re-expose the same `__cp` dev handle and the same class names, or the battery must be re-pointed. | Re-expose `__cp` + keep `.cp-*` class names (cheap if done deliberately; expensive if forgotten). |

**Bottom line:** the *brains* of the shell port for free; the *face* of the shell does not. A cutover to Vue means rewriting ~1,350 lines of Svelte component code (with the view models and CSS carried over). A cutover to plain TypeScript means the same rewrite plus a hand-rolled reactivity/render layer to replace what Svelte's compiler currently provides (the `$state`/`$derived` updates, the `{#each}` list rendering, the store subscriptions). The neutral surface the Owner's ruling asks for exists — but it is the VM layer, not the shell.

## 3. The "Svelte 5 project" wording vs the actual product

- The repo's house rules (`~/workspace/football-sim-muse/AGENTS.md` §2, VERIFIED by grep) say: "Framework: **Svelte 5 + Vite** (current implementation — **NOT a lock**; the Owner, 2026-11-12, ruled Svelte is not a lock. The framework is open and under test — two arms: Vue 3 + Vite vs Svelte 5 + Vite (Owner, 2026-11-15, R-13…)". The wording in the rules is careful and correct: it names Svelte as the *current implementation* and explicitly denies it is a lock.
- The **delivery** is where the framing bites: the s5 README's goals-check §1 is titled "Svelte 5 + Vite — confirmed" and treats the Svelte build as the thing to confirm; `deliveries/slice5/README.md` repeats it; `src/lib/draftStore.ts:1` says "wrapped for Svelte 5". Nothing in the delivery's docs frames the shell as neutral or lists the portable layer as the cutover asset. A reader of the delivery alone would conclude the framework question is settled in favour of Svelte — which is exactly the framing effect the Owner warned about.
- The **actual product** contradicts the framing in the other direction too: the thing that would make a Vue cutover cheap — the plain-TS VM layer — is undocumented as such. There is no "how the shell consumes the engine" one-pager, no screen-by-screen VM table, no inventory of which files are portable and which are Svelte-locked (see Part 13, docs layer). The neutrality-relevant documentation does not exist; the Svelte framing does.

## 4. Smaller neutrality-relevant observations (VERIFIED)

- **N1 — `userTeam`/`seed` are not reactive (build warning).** `App.svelte:48-49` declares `let userTeam = 0; let seed = 777;` as plain `let` while `screen` is `$state`. The build warns `non_reactive_update` for `userTeam` (see Part 1 §6 for the verbatim warning). This is a Svelte-5-reactivity defect in the composition root, and it is the kind of bug that exists *because* the shell is Svelte-shaped: in a plain-TS shell the same variables would be ordinary locals read by an explicit `refresh()`, and no compiler warning would be needed to catch the staleness. The shell works today only because `refresh()` writes `writable` stores. A port must preserve that `refresh()`-drives-stores discipline explicitly.
- **N2 — `$effect(() => { void draftState; })` (`App.svelte:177`).** An effect whose body does nothing but reference `draftState` — presumably to keep the `asReadable` subscription alive. This is Svelte-idiom glue with no plain-TS equivalent; a port would replace it with an explicit `store.subscribe(...)` call.
- **N3 — `window.__cp` dev handle (`App.svelte:76`).** `(window as any).__cp = { store, refresh, valuation }` is set in the dev boot. It is framework-free in itself, but it is the battery's only programmatic handle into the app (the probes drive 32 picks through it). Any port must re-expose an equivalent handle or the battery/probes stop working. This is a port requirement, not a lock-in — but it is undocumented in the delivery (found by reading `App.svelte` and `batteries/probe-share.mjs`).
- **N4 — No framework-specific *build* step beyond the Svelte plugin.** There is no SvelteKit, no Svelte routing, no SSR, no Svelte-specific asset pipeline. The Vite config is 8 lines. The lock-in is at the component level, not the toolchain level — which is why the VM layer stayed portable.
- **N5 — The prompt's premise needs correcting, not the shell.** The council prompt v4 describes Cakepanz as "built in plain TypeScript, framework-neutral". That description is stale or aspirational: slices 1–5 were built in Svelte 5 from the start (the slice-1 README already describes a Svelte app; the fresh-start two-arm test is a *separate* track). The council should not keep asserting neutrality the delivery does not have. The honest statement is: *the view-model layer is neutral; the screens are Svelte 5.*

## 5. What this unblocks / how to verify

- For Z.ai's next round: if the Owner wants the shell neutral *in fact*, the next slices should (a) keep all new logic in the plain-TS VM layer, (b) ship the missing neutrality docs (portable-vs-locked file inventory, VM table — see Part 13), and (c) stop describing the shell as framework-neutral until the screens are. If the Owner instead accepts Svelte as the shell's implementation (with the framework pick still open only for the *product*), the delivery docs should say that plainly instead of claiming neutrality.
- For Claude's merge: the merge target is the VM layer + the engine snapshot; the Svelte screens are Z.ai's to port or keep. The Architect should not assume he can lift the screens into a Vue tree.
- How to verify this filing: `grep -rn "from 'svelte'\|from \"svelte\"\|\\$state\|\\$derived\|\\$props\|{#each\|{#if" src/ --include="*.svelte" --include="*.ts"` in the s5 extract; `cat package.json vite.config.js src/main.ts`; `grep -rln "svelte" src/lib/*.ts` (should return only `draftStore.ts` and the `ink.ts` comment mentioning App.svelte's background).
