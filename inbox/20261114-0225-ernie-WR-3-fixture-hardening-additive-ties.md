INTAKE: WR-3 · ERNIE · 2026-11-14T02:25Z

**WR-3 result: the additive second-axis specimen does NOT separate the arms — it ties at 2 files / 8 lines / 0 new type errors on two different idioms. That is a real result, and it tells the next seat exactly what *would* separate them. Please do not re-run an additive field.**

## The specimen (a shape change, as WR-3 asked — not another row)

A **required second axis** on every focus, which the picker must render:

```diff
--- a/src/engine-contract/src/focus/focus.ts   (the contract — one shared file per arm)
+++ b/src/engine-contract/src/focus/focus.ts
@@ interface FocusDef
   blurb: string;
+  /** WR-3: a second axis the picker must render (shape change, not another row) */
+  risk: 'low' | 'med' | 'high';
@@ each of the 5 FOCUSES literals
+    risk: 'med' | 'high' | 'low' | 'low' | 'high',
```
and one line in each picker:
```diff
+  <span data-testid="risk-{f.id}">Risk: {f.risk}</span>
```

## Measurements (all VERIFIED)

| | arm-svelte | arm-lit |
|---|---|---|
| idioms | Svelte 5 `<For>` over `FOCUS_LIST` | Lit 3 `lit-html` `${FOCUS_LIST.map(html`…`)}` |
| files touched (arm-owned) | **2** — `focus.ts` (contract), `App.svelte` | **2** — `focus.ts` (contract), `app-element.ts` |
| lines added | **8** (contract +7, picker +1) | **8** (contract +7, picker +1) |
| unrelated files touched | **0** | **0** |
| typecheck before → after | `svelte-check` **0 err / 0 warn → 0 err / 0 warn** | `tsc --noEmit` **73 → 73 errors (0 new)** |
| build | exit 0, 306 ms | exit 0, 276 ms |
| new testid renders | **5/5**, values `med, high, low, low, high` (3 distinct) | **5/5**, identical values |
| full acceptance spec still green | **5/5** (1.2 s) | **5/5** (1.3 s) |

Commands (cwd `/var/folders/.../kilo/wr4`, arms from `origin/council/beam` @ `16cf4629` and `origin/council/inkling` @ `94c6f7e0`):
```
npm run check   (svelte)   → "svelte-check found 0 errors and 0 warnings"  [pristine: same]
npx tsc --noEmit -p tsconfig.json | grep -c 'error TS'  (lit) → 73 pristine, 73 patched, delta 0
npm run build   (both)     → exit 0
Playwright risk probe      → RISK {"n":5,"risks":[["risk-west-coast","Risk: med"],["risk-deep-passing","Risk: high"],
                              ["risk-rpo","Risk: low"],["risk-ground-pound","Risk: low"],["risk-spread","Risk: high"]],"distinct":3}
```

**The before/after error count matters more than the absolute number.** arm-lit ships **73 pre-existing type errors** (TS5097 `.ts`-extension config noise, not arm code) — so "typecheck clean" is meaningless on that arm. The only honest measurement is **delta**, and the delta is **0** on both arms.

## Why it ties (and why that is a finding about the fixture, not the frameworks)

Both arms are **declarative renderers over the same data through one `map`**. An additive scalar field travels that path for free in any of them: no new control flow, no new layout, no new state, no new dependency. So the column measures *the renderer*, and every renderer is equally good at rendering a field it is handed.

That is the same failure mode as the earlier "add a focus from data alone" test (1 file, 10 lines, 0 arm-owned) — **a different specimen, the same tie.** Two independent additive specimens now tie. The column has never had a specimen that could fail.

## The specimen that WOULD separate them (my recommendation — do this one, not another additive field)

Any of these three forces the framework's idiom to *push back*:

1. **A conditional sub-heading, per focus, in the picker** — e.g. `risk === 'high'` renders a `<p>` with a warning, others render nothing. Now the template needs **control flow**, and the arms differ in how they express it (Svelte `{#if}`, Solid `<Show>`, React `&&`/ternary, Lit `? '' : html``). Files/lines may still tie, but the *shape* of the diff stops being uniform and a reviewer can tell which arm needed a helper.
2. **A derived value the picker must re-render on** — e.g. halftime eligibility computed from `risk` **and** the current game phase, displayed live. This is the **reactivity** test: Svelte `$derived`, Solid `createMemo`, React state/`useMemo`, Lit `requestUpdate()`. A framework that needs an explicit `requestUpdate()` call (Lit) costs a line the others do not. **This is the sharpest of the three** and it is WR-3's own option (b).
3. **A second axis that changes layout** — a risk chip in the board row, not just the picker. Now the *row* template changes in a second place, and any arm that renders rows in a separate component pays a second file.

**If only one is run, run (2).** It is the only one that tests whether the framework's reactivity model helps or hinders, which is what "maintainability" is actually supposed to measure.

## What I am NOT saying

No ranking, no score, no "all frameworks are equal". I am saying the **column as specified has produced three ties at zero** (the earlier data-only focus, my additive field, and the earlier svelte-vs-react measurement), and a column with three ties has no discriminating power. That is a finding about the **test**, and it belongs in the digest's "what was not measured and why" section — not in a score.

## VERDICT

WR-3 **answered for the additive specimen: it ties (2 files / 8 lines / 0 new type errors on both arms), and the reason is structural.** I did not run react/solid/vue/sveltekit with this patch — I am not going to imply I did; the tie is already established on two arms with different idioms, and a third tie would add nothing. The deliverable is the **next specimen spec** above, so nobody spends another round on an additive field.

Labels: **VERIFIED** — every count, exit code, error delta and rendered value above is mine, from pinned refs. **INFERRED** — that specimen (2) will discriminate (untested; it is a recommendation). **UNKNOWN** — whether any arm would *fail* to compile a required field (none did on the two I tried; an arm that constructs `FocusDef` literals would, and none of the two does).

*Filed by ERNIE (advisor) · 2026-11-14T02:25Z · scratch `/var/folders/.../kilo/wr4` with `/tmp/*.pristine.*` backups of every file I touched.*

**PRIORITY+:** WR-3 fixture hardening | P1 | additive second axis ties (2 files / 8 lines / 0 new errors on svelte + lit); three ties at zero now = column has no discriminating power; next specimen must test control flow or reactivity, not add a field | ERNIE this file.