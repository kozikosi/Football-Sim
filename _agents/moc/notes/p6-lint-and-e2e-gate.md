# P6 · The council's tooling: the lint gate and the e2e gate, measured

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: P6 chore — lint sweep + the e2e gate | DATE: 2026-10-22T08:40:00Z**

**What this is.** A standing chore (§3.5 item 3): sweep the lint, and check the things the council's own verification depends on. Everything below is measured with a pasteable command, against the tree as it stands at `ffa21767`.

## 1 · The headline

**The council's lint gate is RED, and its e2e suite cannot pass against the current tree.** Both are small, both are fixable, and **neither is the Architect's fault** — but the Architect will hit both when they run the council's verification before shipping V22.

| check | command | result |
|---|---|---|
| lint | `~/node_modules/.bin/biome check` | **5 errors, 2 infos** across 29 files — exit non-zero |
| e2e hash gate | `shasum -a 256 "NFL Draft Simulator merged.html"` | pinned `40233d6b…`, actual `044d1759…` → **the spec throws** |

## 2 · The lint: what is actually broken

`~/node_modules/.bin/biome check --reporter=summary`:

```
lint/correctness/usePlaywrightValidDescribeCallback               3 (3 errors)
lint/style/useTemplate                                            2 (2 infos)
Checked 29 files. Found 5 errors. Found 2 infos.
```

**The 3 errors are one mistake, three times.** `tests/openchamber-e2e-v2.spec.js` defines a **local helper named `describe`** at l.97:

```js
const describe = (el) => …          // l.97 — shadows Playwright's global describe
…
const heading = describe(headingEl);   // l.140
const nav = describe(navEl);           // l.141
const primaryAction = describe(primaryActionEl);  // l.142
```

Biome's `usePlaywrightValidDescribeCallback` sees `describe(element)` and says *"Describe requires a callback function."* It is a false positive **about Playwright** and a true positive **about naming**: a helper called `describe` that is not Playwright's `describe` is a trap for the next reader.

**WHAT (old → new, exactly)** — four lines, no behaviour change:

```js
// OLD
const describe = (el) =>
// NEW
const describeEl = (el) =>
```
```js
// OLD
const heading = describe(headingEl);      const nav = describe(navEl);      const primaryAction = describe(primaryActionEl);
// NEW
const heading = describeEl(headingEl);    const nav = describeEl(navEl);    const primaryAction = describeEl(primaryActionEl);
```

**WHY** — the lint gate is red because of it, and the name is a trap.
**SAFE ALONE?** Yes — a local rename inside one file; no other file references the helper (verified: `describe(` appears only at l.97, 140, 141, 142).
**HOW TO CHECK** — `~/node_modules/.bin/biome check` → the three `usePlaywrightValidDescribeCallback` errors are gone; the spec still runs.

**The 2 infos** — `_agents/minimax/tools/build-owner-brief2-variant.mjs:169` and `:175`, `lint/style/useTemplate` (fixable). **Not my lane** — MiniMax owns that file; the fix is `biome check --write` on it.

**The 2 formatter errors** — `_agents/minimax/tools/build-owner-brief2-variant.mjs` and `_agents/minimax/tools/build-team-colours.mjs` are not formatted to the house style. Measured drift: **250 → 262 lines** and **176 → 177 lines** under `biome format`. **Not my lane** — MiniMax's.

**So: 3 of the 5 errors are the rename above; the other 2 are a `biome format --write` in MiniMax's lane.** That is the whole red.

## 3 · The e2e gate: a stale pin that fails before the browser starts

**Both** specs pin the artifact hash of `NFL Draft Simulator merged.html`:

- `tests/openchamber-e2e.spec.js:8-9`
- `tests/openchamber-e2e-v2.spec.js:9-10`

```js
const EXPECTED_SHA256 =
  "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd";
```

**Actual today:**

```
$ shasum -a 256 "NFL Draft Simulator merged.html"
044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48
```

And the spec **throws** on a mismatch, before any browser work (l.454-462 in v2, l.212-219 in the other):

```js
if (actualSha256 !== EXPECTED_SHA256) {
  result.status = "BLOCKED";
  …
  throw new Error(`Artifact hash mismatch: expected ${EXPECTED_SHA256}, got ${actualSha256}`);
}
```

**So the council's e2e suite is red today, and it is red for a reason that is not a defect in the build** — the pin is a contract that was written for an older file and never re-issued.

**WHAT (old → new, exactly)** — make the pin overridable rather than re-issued, so it cannot rot the same way twice:

```js
// OLD
const EXPECTED_SHA256 =
  "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd";
// NEW
const EXPECTED_SHA256 =
  process.env.ARTIFACT_SHA256 ??
  "40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd";
```

**WHY** — the pin protects against testing the wrong artifact; an environment override keeps that protection (the default is still a pin) while letting the Architect re-issue it once, at merge time, with `ARTIFACT_SHA256=<sha of the merged build>`.

**SAFE ALONE?** Yes — it adds an override and keeps the existing pin as the default. **But:** re-pinning the *default* to today's `044d1759…` would be wrong, because `044d1759…` is the **V21 baseline**, not a V22 build (see §4) — it would make the suite green against a file that has no V22 work in it.

**HOW TO CHECK** — `ARTIFACT_SHA256=$(shasum -a 256 "NFL Draft Simulator merged.html" | cut -d' ' -f1) npx playwright test tests/openchamber-e2e-v2.spec.js` → the hash gate passes and the suite proceeds to the browser stage; and `npx playwright test` **without** the variable still fails loudly on the mismatch, which is the behaviour the pin exists for.

## 4 · The finding behind both: the working file is still the V21 baseline

```
$ cmp -s "NFL Draft Simulator merged.html" "Football-Sim-V21.html" && echo IDENTICAL
IDENTICAL
```

**The file the Architect is editing is byte-identical to `Football-Sim-V21.html`** (`044d1759…`, 656,746 B). It differs from both built candidates.

**What that means, stated plainly:**
- **no V22 work is in the working file yet** — not the P0 briefs, not the 32-team palette, not the "Value here" removal, nothing. All of it lives in `_agents/minimax/prototypes/` (the candidates) and in the proposals.
- the two e2e specs were last pinned against an even older artifact (`40233d6b…`), so **the tree's verification chain was written against a build that no longer exists in any form** — that hash is not the working file, not V21, and not either candidate.

**This is expected** (the Architect merges at the end) and it is not a criticism of anyone. It is, however, the **first thing the Architect should know**, because it explains the red lint and the red e2e gate in one sentence: **the council's verification was pinned to a build that has been replaced twice.**

## 5 · `biome.json`: a proposal, and it is free

The root config already scopes itself to the council's tooling and **not** the product — `files.includes: ["tests/**", "_agents/**/tools/**", "tools/**", "!node_modules"]`. That is the right boundary and it is the "one config cannot serve both tooling and product" rule satisfied by construction. **I did not edit it** (it is not my file).

**Coverage is complete for the configured paths:** 20 tool files + 8 test files + `tools/build-merged.js` = **29 files checked**. The other JS in the tree lives in `_agents-payload/`, `.kilo/worktrees/` and a nested `Football Sim/` copy — all outside the config, correctly.

**Per-rule measurement on the council's tooling** (`biome check --only=<rule> --formatter-enabled=false --reporter=summary`):

| house rule | diagnostics today | verdict |
|---|---|---|
| `lint/style/useConst` | 0 | **free to add** |
| `lint/style/noParameterAssign` | 0 | **free to add** |
| `lint/suspicious/noDuplicateObjectKeys` | 0 | **free to add** |
| `lint/suspicious/noAssignInExpressions` | 0 | already `error`; the house rule says OFF — either way, silent today |
| `lint/suspicious/useIterableCallbackReturn` | 0 | already `error`; the house rule says OFF — either way, silent today |
| `lint/correctness/noUnusedVariables` | 0 | **free to add** |
| `lint/correctness/noUnusedImports` | 0 | already on |
| `lint/correctness/noUndeclaredVariables` | **16** | see below |

**The 16 are one false-positive class.** Every one is a `typeof` check on a **page** global read from Node test code, e.g. `tests/openchamber-e2e-v2.spec.js:664`:

```js
if (typeof seasonState !== "object" || !seasonState) return null;
```

`seasonState` lives in the browser page, not in the test process, so the check is deliberate and correct. Biome's rule has an option for exactly this: **`{"options": {"typeofs": true}}` exempts `typeof` checks**. With that option the rule reports **0**.

**WHAT (old → new, exactly)** — in `biome.json`, `linter.rules`:

```json
"correctness": {
  "noUnusedImports": "error",
  "noUnusedVariables": "error",
  "noUndeclaredVariables": { "level": "error", "options": { "typeofs": true } }
},
"style": {
  "useConst": "error",
  "noParameterAssign": "error"
},
"suspicious": {
  "noVar": "error",
  "noDoubleEquals": "error",
  "noAssignInExpressions": "error",
  "noTemplateCurlyInString": "error",
  "useIterableCallbackReturn": "error",
  "noDuplicateObjectKeys": "error",
  "noSelfAssign": "error"
}
```

**WHY** — these are the house rules the council already adopted (`69cae1bb`, "the council's operating manual in AGENTS.md, and biome house rules adopted"); the config enforces only part of them. Adding them costs **zero new debt** (measured above), so it locks in the house style for free. `noSelfAssign` I could not measure under a correct rule path (`lint/suspicious/noSelfAssign` is not a valid path in Biome 2.6.2) — **UNKNOWN**, so it should be added and then the lint re-run.

**SAFE ALONE?** Yes, and the evidence is the table: no rule in the list reports a diagnostic on the council's tooling today, except `noUndeclaredVariables`, whose 16 are cured by the `typeofs` option. **One caveat:** adding `noDuplicateObjectKeys` and `noSelfAssign` is the only part I could not fully verify (see above) — add them first and re-run `biome check`; if they fire, they fire on the council's tools, not on the product.

**HOW TO CHECK** — `~/node_modules/.bin/biome check` → the rule table lists the new rules, each at 0 except `usePlaywrightValidDescribeCallback` (3, until the rename in §2) and the 2 formatter errors in MiniMax's lane.

**One thing I could not settle (UNKNOWN).** The config has `"preset": "recommended"` **inside** `linter.rules`, beside the rule groups. Biome emitted no complaint about it, but **Biome 2.x documents the recommended set as `linter.rules.recommended: true`** — a sibling of the groups, not a member of one. I tried to A/B it by moving the config (Biome then resolved **0 files**, so the test was invalid) and I did not confirm which form Biome 2.6.2 honours. **I am not claiming it is broken** — the recommended set is on by default in Biome 2.x, so behaviour probably does not change. The honest recommendation is to **make it explicit** (`"recommended": true` as a sibling of the groups) so the intent is readable and the key is not doing nothing.

## 6 · What I did not check

- **I did not run the e2e suite** beyond reading its hash gate — I did not install/launch Playwright's test runner, so the browser stage of those specs is unverified by me.
- **I did not run `biome format --write`** anywhere: the two unformatted files are MiniMax's, and reformatting a file you did not author is not a lane-safe act.
- **I did not edit `biome.json`, the e2e specs, or any tool** — all proposals above; every file involved belongs to another seat or to the shared tree.
- **I did not verify `noSelfAssign`'s diagnostic count** (invalid rule path) — flagged as UNKNOWN rather than guessed.
- **I did not look at the nested `Football Sim/` copy** in the tree; I only noted that it is outside the lint scope.

**Receipts:** this note; `_agents/moc/receipts/gate-teamcolours-a70369f3.txt` and the two anchor receipts from the same session.
