SPEAKER: ds | ROLE: council | TASK: CAKEPANZ-SHELL Part 3 — verify the neutrality | DATE: 2026-11-16T21:02Z

FOR: R-13

# Part 3 — the shell is Svelte 5 with a mostly-plain-TS core, not "plain TypeScript"

**Verdict (VERIFIED).** The *engine* claim is true: Colors at d3bd81d2 has **zero** `.svelte` files and **no app entry** — its own `package.json` says `src/main.ts` does not exist and `npm run build` fails until the UI shell is merged. The *shell* claim is false: the delivered 67 Cakepanz tree is a Svelte 5 app. `package.json` depends on `svelte ^5.57.3` and `@sveltejs/vite-plugin-svelte`, `src/main.ts` mounts `App.svelte` with `mount` from `svelte`, and the tree contains **14 `.svelte` files** (gh-pages: 10). The fresh-start "Svelte 5 / `.svelte.ts` bridge" house rules are not merely framing — they match the shell that was actually built. The prompt's own later paragraph concedes this ("You may keep Svelte 5 as the render layer of this tree (it is what it is)"), but the opening sentence "Build the shell in plain TypeScript" and the council prompt's "The shell is built in plain TypeScript" state the opposite. A cold reader will conclude the shell is already neutral; it is not.

## Evidence (VERIFIED; paths in the s5 delivery, `origin/council/inkling`)

```sh
# s5 tree
find src -name '*.svelte' | wc -l                     # 14
sed -n '1,3p' src/main.ts
# import { mount } from 'svelte';
# import App from './App.svelte';
grep -n "from 'svelte" src/lib/draftStore.ts
# 3: import { readable, writable } from 'svelte/store';
grep -n "from 'svelte" src/App.svelte
# 4: import { onMount } from 'svelte';
# 5: import { writable } from 'svelte/store';
```

`package.json` (s5): `"dependencies": { "svelte": "^5.57.3" }`; `"devDependencies": { "@sveltejs/vite-plugin-svelte": "^6.2.1", "typescript": "^5.9.3", "vite": "^7.3.6" }`. No Vue. `src/main.ts` line 3 imports `./App.svelte`.

Colors (d3bd81d2), VERIFIED:

```sh
git ls-tree -r --name-only d3bd81d2 colors | grep -c '\.svelte$'   # 0
git show d3bd81d2:colors/package.json | grep -A1 'There is no app entry'
# "There is no app entry yet: dev/build/preview run Vite against index.html,
#  which points at src/main.ts, which does not exist, so npm run build fails
#  until the UI shell is merged."
```

Fresh-start house rules (REPORTED from the delivery code comments; not re-run as a build): `origin/council/inkling:_agents/inkling/deliveries/zai-fresh-start-2026-11-15/football-sim-svelte/src/lib/state/appStore.svelte.ts:1` says "the fresh-start UI state bridge (Svelte 5, runes-only, per the house rules"; `.../football-sim-svelte/src/toy/store.svelte.ts:2` says "Runes in a .svelte.ts bridge per the house rules"; the Vue arm's `.../football-sim-vue/src/stores/appStore.ts:3` says "House rules: Pinia Setup Store". So the house rules are real, arm-specific, and consistent with the delivered shell.

## The one core leak the new rule already forbids

`src/lib/draftStore.ts:3` imports `svelte/store` (`readable`, `writable`) — a Svelte primitive inside `src/lib`, which is exactly what the Z.ai prompt's TS-neutral discipline forbids ("NO Svelte-specific patterns (runes, svelte-only lifecycle tricks) may leak into VM/data code"). It is the only `svelte` import under `src/lib` besides the render files; the other `src/lib` TS modules (`feedVM`, `shareVM`, `savesApp`, `abbr`, `ink`, `valuation`, `bragCard`) import no framework. So the core is close to the rule; the store is the one visible exception.

## Is the shell portable "to either framework at cutover, or to plain TypeScript as-is"?

**Not as-is.** The render layer (14 `.svelte` files + `src/main.ts` + `App.svelte`) is Svelte-bound; a Vue cutover replaces it. The keepable part is the plain-TS core: the six engine-facing VMs plus the two pure helpers. To make the prompt's claim true, the minimum work is:

1. Move `svelte/store` out of `src/lib/draftStore.ts` into a binding (or a plain TS store with a thin Svelte adapter).
2. Keep every `src/lib/*.ts` file framework-free (already true except the store); the VMs are the seam candidates.
3. Treat the 14 `.svelte` files as the thin binding — the port cost at cutover — and say so in the handoff note (M4/SNAPSHOT.md does not exist yet; Part 10's tree has no SNAPSHOT.md).

This is an answer to the Owner's portability question, not a re-opening of the framework pick.

**What it unblocks.** A precise neutrality checklist for Z.ai (fix the store leak; declare the render layer as the bound part) and an honest inventory for the Architect (what survives a Vue cutover: the plain-TS core, not the components). It also corrects the council prompt's premise so reviewers do not certify "neutrality" by reading a sentence instead of the tree.

**How to check.** The commands above; `git ls-tree` for Colors; `git grep "from 'svelte"` over the s5 tree. I did not run a Vue port or a build; the portability statement is structural (files and imports), not a build receipt.
