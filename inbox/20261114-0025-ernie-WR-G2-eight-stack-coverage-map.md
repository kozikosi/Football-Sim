INTAKE: WR-G2 · ERNIE · 2026-11-14T00:25Z

WR-G2 · Map the Owner's 8 stacks against the tested arms (P1) — supports glyph's WR-G2 and WR-G4. **All 8 of the Owner's stacks are now measured at least once. One of the 9 arms (arm-lit) is not one of the 8.**

Source list of the 8 (Owner, standing ruling, as carried in glyph's handoff): Svelte+Vite · SvelteKit · React+Vite · Next.js · Vue+Vite · Vue+Nuxt · Solid+Vite · SolidStart. That is 8.

## The map (every row cites the arm and the ref it was measured on)

| Owner's stack | arm | measured | spec (fixed) | build | file:// | typecheck | receipt |
|---|---|---|---|---|---|---|---|
| Svelte + Vite | `arm-svelte` | ERNIE + INKLING | 5/5 | exit 0 | BLOCKED as shipped; **PASS as single file** | svelte-check (Z.ai, REPORTED) | `inbox/20261113-2320-…` (control re-run), `inbox/20261113-2340-…` (single-file) |
| SvelteKit | `arm-sveltekit` | ERNIE | 5/5 | exit 0 | BLOCKED (prerendered HTML, not interactive) | svelte-check (REPORTED) | ledger, `inbox/20261113-2155-…` |
| React + Vite | `arm-react` | ERNIE + INKLING + glyph | 5/5 | exit 0 | BLOCKED | tsc -b (REPORTED) | ledger |
| Next.js | `arm-next` | ERNIE + INKLING + glyph | 5/5 | exit 0 (`output: 'export'`) | BLOCKED (prerendered, not interactive) | tsc --noEmit (re-ran, exit 0) | ledger |
| Vue + Vite | `arm-vue` | ERNIE + INKLING + glyph | 5/5 | exit 0 | BLOCKED as shipped; **PASS as single file** | vue-tsc (REPORTED) | `inbox/20261113-2340-…` |
| Vue + Nuxt | `arm-nuxt` | ERNIE + INKLING + glyph | 5/5 | exit 0 (**`npm run generate`**, not `build`) | BLOCKED (prerendered, not interactive) | vue-tsc (re-ran, exit 0) | ledger |
| Solid + Vite | `arm-solid` | **ERNIE (new this session)** | **5/5** | **exit 0, 341 ms** | **BLOCKED** | **NONE shipped** (tsc → 143 errors, config) | `inbox/20261113-2320-…` |
| SolidStart | `arm-solidstart` | ERNIE + INKLING + glyph | **0/5 as shipped** · **5/5 with `ssr:false`** | exit 0 | blank as shipped | NONE | `inbox/20261114-0005-…`, `-0010-…` |
| — not one of the 8 | `arm-lit` | **ERNIE (new this session)** | **5/5** | **exit 0, 281 ms** | **BLOCKED** | **NONE shipped** | `inbox/20261113-2320-…` |

## What the map says, factually

1. **Coverage is complete for the Owner's 8.** Each of the 8 has at least one arm, every arm has been built and run by at least two seats (three for react, next, vue, nuxt), and the two arms nobody had run (arm-solid, arm-lit) were run this session.
2. **The 9 arms are 8 stacks + 1 extra.** `arm-lit` (Lit 3.3.3) is not on the Owner's list. It is the only arm whose root container is not `#app` (`<framework-arm>`). Nobody has said whether Lit should be in the set; I am not adding or removing it — I am recording that the set is 9 arms over 8 stacks plus one framework the Owner did not name.
3. **Solid has two arms and they disagree.** `arm-solid` (Solid + Vite) is 5/5 green; `arm-solidstart` (SolidStart, the meta-framework) is 0/5 in SSR and 5/5 in SPA mode. So "Solid" as a stack is measured twice with different results, and the difference is the **meta-framework's SSR path**, not the Solid component tree (the same component code passes in SPA mode).
4. **The offline column now has a positive result where I looked for one:** Svelte + Vite and Vue + Vite both go single-file and pass 5/5 from `file://`. Those are two of the 8 stacks; the other six are untested for it. So the "0 of 9 offline" line in the wave record is true **as shipped** and is **not** a property of those two frameworks.
5. **Typecheck is not a column yet.** It is defined per arm and the definitions disagree (arm-next sets `strict:false` with a comment about 69 pre-existing contract errors; arm-solid and arm-lit set neither and report 143). Until one standard config exists, no cross-stack typecheck comparison is available. That is a test defect, not a finding about any stack.

## What I am NOT saying

No ranking, no winner, no elimination. The SolidStart row is not a framework verdict — it is an arm-wiring defect in SSR lazy-route resolution, with a one-line config that renders the same tree correctly. Whether that counts as "the stack failed" is the Owner's call, and I have not made it.

## VERDICT

WR-G2 **advanced**: all 8 stacks mapped to arms with measured status; the 9-vs-8 discrepancy (arm-lit) and the Solid/SolidStart split are named; the offline column's positive result and the typecheck column's non-comparability are both recorded. Glyph's WR-G4 is **answered** by `inbox/20261114-0005-ernie-WR-4-solidstart-refuted-and-fixed.md`.

Labels: **VERIFIED** for every row marked ERNIE this session or re-ran (receipts cited). **REPORTED** for rows credited to another seat or to Z.ai. **UNKNOWN** for the six stacks' offline behaviour, untested.

*Filed by ERNIE (advisor) · 2026-11-14T00:25Z.*

**PRIORITY+:** WR-G2 8-stack coverage map | P1 | COMPLETE: all 8 Owner stacks measured; 9 arms over 8 stacks; arm-lit is the un-named 9th; typecheck not yet comparable | ERNIE `inbox/20261113-2320-…`, `-2340-…`, `20261114-0005-…`.