INTAKE: WR-BENCH2 · ERNIE · 2026-11-14T06:45Z

**WR-BENCH2 — "the library test": does Vue's ecosystem make a real product feature materially easier, and does the result still look like w89?**

Proposed by the Owner. Not assigned; any seat may take it. Z.ai is the natural builder (he has the harness and the two arms), but a second seat's independent run is the confirmation.

---

## 0 · The honest framing — read this before you build

I checked the package landscape before designing this, and **the naive version of this test would mislead the Owner.**

```
command: npm view @tanstack/svelte-virtual version ; npm view @tanstack/{svelte,vue,react}-table version
         node -e "require('@vueuse/core')" → 304 exports, useVirtualList/useStorage/useDebounceFn/useIntersectionObserver all functions
output:  @tanstack/svelte-table 9.3.1 · @tanstack/svelte-virtual 3.13.52
         @tanstack/vue-table   9.3.1 · @vueuse/core 15.0.0
```

**So TanStack Table and TanStack Virtual are NOT Vue-only — Svelte has official adapters for both.** If we test "virtualize a long list" and Svelte uses `@tanstack/svelte-virtual`, the result will be a tie, and that is the *correct* result. Anyone who expected a Vue blowout would be reading a tie as a win.

**What is genuinely Vue-only** (no single Svelte counterpart): **VueUse** (304 composables — storage, debounce, observers, media queries, and more, in one dependency), **Pinia** (the official store), and **the Vue DevTools agent** (programmatic inspection).

**So this test measures the breadth of one library, not the capability of one framework.** Say that in the report, or the Owner will over-read it.

---

## 1 · The feature (same on both sides)

**"The Board" — a virtualized, sortable, filterable draft board over the full pool, with the board state persisted locally.**

Requirements, identical for both arms:

1. Render the **full 1,941-player pool** from the vendored engine (no truncation, no "load more").
2. **Virtualize** it — only visible rows in the DOM. Assert it: `document.querySelectorAll('[data-testid^="row-"]').length` must be far below 1,941 while all 1,941 are reachable by scrolling.
3. **Sortable** by position / OVR / round / fit — the same four the product has.
4. **Filterable** by position (the 18 codes) and by team.
5. **Persist** the board state (sort, filter, scroll position) across a reload, from local storage.
6. **Debounced** search if a search box is present.
7. **Visual fidelity to w89** — this is the half that actually matters and the half nobody has tested.

## 2 · The w89 style requirements (the point of the exercise)

The Owner's instruction is to "capture the essence of my style with w89". From the live product (`origin/gh-pages:index.html`, 1,922,769 B), the board's visual language is:

- **Position bubbles with the rating inside** — `QB1000`, `RB375`, `TE450`, `OT800`, `OG650`, `C150`, `EDGE1100`, `DT800`, `LB560`, `CB800`, `SS310`, `FS310`, `K100` (the 18 codes, rating concatenated with no space).
- **Two-tone bubbles** driven by the selected team's palette, with the 22 Oct 32-team colour table as the source.
- **Cinzel Decorative** for names, positions and footer; team name beside the logo in team colours.
- **Three colour bubbles only under OVR, and only for 85+.**
- **Shimmer at 90+**; `R1.31` style round.pick labels; no parentheses around scores.
- **Table / Cards toggle**, both options clickable; a "Drafting as" control; sort menu words.
- **No horizontal scrollbar on desktop** (mobile only if needed).
- The user's team in **blue** (`.ub`).

**Acceptance for style is a human judgement against screenshots, not a string match.** That is deliberate: the G5 string-identity test in BENCH-1 proved the *data* matched, not that the *product looks like itself*. This test has to close that gap.

## 3 · What to measure (four columns, never summed)

| Column | Metric | Receipt |
|---|---|---|
| **Integration cost** | dependencies added · files touched · lines of arm-owned code · minutes to green | `package.json` diff + `diff -rq` vs pristine + a timer |
| **Behavioural correctness** | all 1,941 reachable · sort/filter correct · persistence survives reload · debounce works | Playwright assertions, printed |
| **Render performance** | DOM node count at rest · scroll p95 · long tasks · heap after a full scroll | tracing + `performance` marks |
| **Style fidelity** | does it read as w89? which w89 elements are missing or wrong? | screenshots at 1280 px and 390 px + a named gap list |

**The control that makes it fair:** Svelte may use `@tanstack/svelte-virtual` (or any equivalent) with no handicap. If the Owner wants a *pure* "what does the framework give you for free" test, that is a **different** test and must be labelled as such — I would not run it, because it measures packaging rather than capability.

## 4 · What this test cannot tell you

1. **It cannot tell you which framework is more maintainable.** It measures one feature's integration cost.
2. **It cannot tell you which is faster at 1,941 rows.** BENCH-1 already showed the board's cost is the engine's `goneOdds` window, identical on both sides. Re-measuring render speed will re-find that.
3. **A Vue win here would be a VueUse win** — one mature library vs several smaller ones — and that is a real but narrow advantage.
4. **A Svelte win here is also possible** and would be equally informative: if `@tanstack/svelte-virtual` plus hand-rolled persistence lands in fewer files, the "Vue has more libraries" story weakens.

## 5 · Definition of done

- Both arms run the same feature from the same vendored engine.
- Four columns reported separately, with commands and output.
- **Screenshots at 1280 px and 390 px**, plus a named list of w89 elements present / missing.
- Failures reported verbatim; no number invented.
- One paragraph on whether the *style* survived, and one on whether the *library* mattered.

Labels: **INFERRED** — that VueUse's breadth is the real differentiator. **VERIFIED** — the package landscape above. **UNKNOWN** — the outcome; that is what the run is for.

*Filed by ERNIE (advisor) · 2026-11-14T06:45Z.*

**PRIORITY+:** WR-BENCH2 library test | P2 | VueUse (304 composables, verified) vs Svelte's per-library assembly; w89 style fidelity is the untested half; controls defined so a tie is a valid result | ERNIE this file.