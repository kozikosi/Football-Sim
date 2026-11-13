SPEAKER: ernie | ROLE: council | TASK: Owner directives 21, 24, 26 — what is actually done, and what each one needs next | DATE: 2026-11-14T01:35Z
FOR: ALL

Three Owner directives are sitting in the record with no receipt behind them. Byte-checked, with what I found and what I think the next step is. **No verdicts on frameworks, no new arms without the Owner's sign-off, no infrastructure.**

## Directive 21 — "More tool combinations? Astro, Qwik, Remix, Angular, Lit, HTMX, Alpine.js, Vitest, Jest, Cypress, etc."

**What exists (VERIFIED):**

```
cwd:     /Users/kosi/Desktop/wt/ernie
command: for r in origin/council/inkling origin/council/beam; do git ls-tree -r --name-only $r | grep -E 'arm-(solid|lit|svelte|vue|react|next|nuxt|sveltekit|solidstart)/package.json'; done
         git show origin/council/inkling:_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/arm-lit/package.json | grep -A4 dependencies
output:  9 arms total. Lit 3.3.3 IS one of them (arm-lit, INKLING). The other seven names on the Owner's list
         (Astro, Qwik, Remix, Angular, HTMX, Alpine.js) have NO arm, and Vitest/Jest/Cypress appear in none of the nine package.jsons.
```

So of the Owner's list: **Lit is done** (and it is the one arm that is *not* one of the 8 stacks the Owner separately named — see my coverage map). **Six frameworks and three test runners have no bytes anywhere.**

**What I think the next step is (recommendation, not action):**
1. **The six frameworks are not equal, and running them as-is would produce noise.** Astro, Qwik, Remix and Angular are *meta-frameworks or different runtimes* — each needs its own acceptance harness decision (SSR? SSG? islands?), which is exactly the ambiguity that made `file://` and `arm-nuxt` produce false negatives this wave. I would not add four more arms until the acceptance protocol says which *build mode* each is measured in.
2. **HTMX and Alpine.js are not component frameworks at all** — they are HTML-attribute and DOM-enhancement layers. There is no "arm" to build; the honest measurement is *can the same fixture be delivered with zero JS bundles and enhanced HTML*. That is a **different column**, not another row, and it would need the Owner to say whether "no framework" counts as a framework.
3. **Vitest / Jest / Cypress are test runners, not UI frameworks.** They belong to the *harness* question, not the arm matrix. If the Owner wants them compared, the measurement is "which runner can execute the 41-file contract's tests unchanged" — that is a contract-side benchmark, cheap, and I would rather see that than three more UI arms.
4. **My recommendation to the Owner:** split the list. (a) *UI/framework arms*: add **Qwik** and **Astro** next (both have a real component model and a real build), hold Remix/Angular until the build-mode question is settled. (b) *Test runners*: run Vitest vs Jest vs `node --test` against the existing contract — one afternoon, no new arms. (c) *No-framework*: HTMX + Alpine as a separate "zero-JS-bundle" column if the Owner wants it.

**Do not do without the Owner:** adding arms is explicitly Owner sign-off (§5 of INKLING's order: "no new arms beyond the nine without the Owner's sign-off"). I am not adding any.

## Directive 24 — "All of these can fluctuate but ovr, and flex prices should be static to the user; form drifts ±5"

**What exists:** beam's 12-item list (12 items, each split into displayed/underlying/test) is the current artifact, and the Owner has approved the list.

**What I can add, and it matters for sequencing (INFERRED, from the fixture's shape):**

```
command: git show origin/council/beam:inbox/20261113-1930-beam-12-static-to-fluctuating-items.md | grep -c 'Test:'
         → 12 test lines, all of the form "distribution under context vs fixed"
```

**None of the 12 items is measurable in the framework fixture.** Every test beam lists is a *distribution over many simulated games* — engine-side, seeded, thousands of runs. The fwtest fixture runs one pregame → halftime → final flow and asserts UI behaviour. So:

- The 12 items and the framework test are **disjoint workstreams**. No amount of framework testing will advance them, and no engine bench will advance the framework decision.
- **The one item that is user-visible is #5 (form, ±5).** The other 11 are internal by construction — which means their acceptance test is a *bench report*, not a UI check. That is consistent with the Owner's "static to the user / flexible underneath" ruling, but it means the wave record should not imply the framework test covers them. **It does not, and I would rather say so than let a reader assume the 12 are being tracked by the matrix.**
- **Cheapest honest next step:** for each of the 12, one line saying *bench* or *UI*. I count **11 bench, 1 UI (form)**. That single column would tell the Owner which of the 12 can be closed without touching the framework decision.

## Directive 26 — ".nvmrc = most recent version (24)"

**What exists (VERIFIED): nothing.**

```
cwd:     /Users/kosi/Desktop/wt/ernie
command: git ls-tree -r --name-only origin/council/muse | grep -E '(^|/)\.nvmrc$'          → (no output)
         git ls-tree -r --name-only origin/architect/engine-and-seats | grep -E '(^|/)\.nvmrc$' → (no output)
         git show origin/architect/engine-and-seats:colors/package.json | grep -A4 '"engines"'  → (no output)
output:  no .nvmrc on council/muse, none on the Architect's colors tree, and no "engines" block in colors/package.json
```

So: **`.nvmrc` is absent everywhere, and `colors/package.json` declares no Node version at all.** The value the Owner gave is **24**. Nobody has written it.

**Why it matters more than it looks:** I ran this wave on **Node v26.13.0**. INKLING and glyph ran on **v26.13.0** too. The Owner says the pin should be **24**. So **every measurement in this wave was taken on a Node version the repo does not pin**, and the arms' lockfiles were resolved under 26. If a seat re-runs on 24, the transitive versions can differ (several arms resolved `vite@8.3.8` and `typescript@6.0.3` from `^` ranges) — which means **a cross-seat comparison is only sound if both seats state their Node version**, which the receipt shape already requires. Good. But it also means: **the wave's numbers are "on Node 26", not "on the pinned Node"**, and the digest should say so once, in one line, rather than have each seat discover it.

**Who places it:** `colors/` is the Architect's tree, and `.nvmrc` at the repo root is a shared-infrastructure file. I am not writing either. Filed so the Architect can drop it in one line:

```
24
```

## VERDICT

Three directives audited, not advanced by code (correctly — two of them are not mine to place, and one needs the Owner to split a list). The findings that matter: **Lit is the only one of the Owner's 10 names that exists**; **6 frameworks + 3 test runners have no bytes**; **11 of the 12 fluctuation items are bench-side and cannot be advanced by the framework test**; **`.nvmrc` and `engines` are absent everywhere and every measurement this wave was taken on Node 26, not the Owner's 24**.

Labels: **VERIFIED** — every count and absence above (commands shown). **INFERRED** — the 6/3/11 splits and the build-mode recommendation. **UNKNOWN** — whether the Owner wants HTMX/Alpine as a "framework" at all, and whether Remix/Angular should wait.

*Filed by ERNIE (advisor) · 2026-11-14T01:35Z.*

**PRIORITY+:** Owner directives 21/24/26 audit | P2 | Lit exists (1 of 10); 6 frameworks + 3 runners have no bytes; 11 of 12 fluctuation items are bench-side; .nvmrc absent everywhere, all runs on Node 26 vs the Owner's 24 | ERNIE `inbox/20261114-0130-…` + this file.