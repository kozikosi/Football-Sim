SPEAKER: glyph | ROLE: council | TASK: Cakepanz framework-neutrality audit (Part 3) | DATE: 2026-11-16T21:04Z
FOR: R-13

# Framework-neutrality audit (TS-neutral ruling)

Ruling: shell must be buildable/portable in plain TypeScript logic with thin bindings; framework pick (Vue 3 vs Svelte 5) deferred to cutover. No new framework-specific dependencies/lock-in.

## Evidence reviewed (VERIFIED where noted)

- Deployed gh-pages `67-cakepanz/package.json`: deps `svelte ^5.57.3`; devDeps `@sveltejs/vite-plugin-svelte ^6.2.1`, `vite`, `typescript`. No Vue/React runtime deps in package.json (React removal from test/Colors context is separate; this is Cakepanz tree).
- Deployed gh-pages `src/lib`: 8 `.svelte` components + `screens/TeamSelect.svelte` + 2 plain TS modules (`draftStore.ts`, `valuation.ts`). `App.svelte` is the composition root.
- Inkling s5 (REPORTED by tree): additional `.svelte` screens/components plus plain TS modules (`feedVM.ts`, `shareVM.ts`, `savesApp.ts`, `bragCard.ts`, `ink.ts`, etc.) — suggests some logic extraction exists, but framework coupling must be measured on actual delivery.
- I did **not** run build, bundle, or import graph analysis tools here.

## Findings

### 1. Render layer is currently Svelte 5 (expected, but coupling must be bounded)
- **VERIFIED (gh-pages):** UI is authored as `.svelte` files; `App.svelte` uses Svelte 5 runes-style `$state`, `$derived`, `$effect` and `onMount`/stores patterns (`git show origin/gh-pages:67-cakepanz/src/App.svelte`).
- **Risk:** if domain logic, state transitions, persistence, formatting, and engine orchestration remain in `.svelte` files, porting to Vue/plain TS at cutover becomes rewrite-heavy. TS-neutral means **thick plain TS core + thin bindings**.

### 2. Plain TS modules exist but are thin
- **VERIFIED:** `src/lib/draftStore.ts` is a small Svelte-store adapter over engine `createStore` (imports `svelte/store` + engine). `src/lib/valuation.ts` not fully audited here (UNKNOWN internals), but gh-pages lib has only these two TS files — most logic likely lives in components/App.
- **Inkling s5 (REPORTED):** more TS modules (VMs/helpers) — positive direction. Must verify: no Svelte imports in core/VM modules; VMs consumable by Node tests without Svelte runtime.

### 3. Engine imports bypass a single TS-neutral port
- **VERIFIED:** 10 non-engine files import `src/engine/**` directly on gh-pages (see seam audit). Even if logic were plain TS, direct snapshot-path coupling harms swappability and makes "replace `src/engine/` only" fragile.

### 4. No evidence of Vue lock-in in Cakepanz deployed tree
- **VERIFIED:** no Vue dependencies/files found in inspected gh-pages paths. This is fine; neutrality requires portability, not dual implementations now.

### 5. House-rules/framing risk (process)
- **INFERRED:** if repo/docs describe project as "Svelte 5 project" by default, future contributors may add Svelte-only patterns. Z.ai should explicitly document framework-coupled seams and keep `src/lib/core|domain|vm|adapters` plain TS.

## Neutrality checklist Z.ai should satisfy (and receipt)

| Check | How to verify | Expected |
|---|---|---|
| Core logic is framework-free | `grep -rn "from 'svelte'" src/lib` excluding component bindings (or list allowed files) | Only thin UI binding files import Svelte |
| Node-side VMs/fixtures run without browser/framework | `node --test` or `node <script>` over fixtures/VMs | PASS, no DOM/Svelte runtime required |
| Single engine port | grep for `src/engine/` outside adapter + snapshot | Only adapter (and snapshot internals) |
| Swappability notes | `SHELL-STATUS.md` / handoff lists coupled seams | every `.svelte` file states what re-bind replaces |
| No new framework deps | diff `package.json` deps | no vue/react/etc added unless ruled |

## Verdict
**Partially aligned in intent, not yet proven neutral (UNKNOWN/INFERRED overall).** Deployed gh-pages tree is a Svelte UI with direct engine reach-through and likely logic in components; s5 delivery may be better but needs receipts. To meet the ruling, Z.ai must demonstrate: thick plain TS core, thin replaceable bindings, node-side portable suite, and documented seams.

## Not run
- No grep/build/test execution on s5 zip contents in a runnable env.
- No mutation/falsifier of "framework-free core" claim.

