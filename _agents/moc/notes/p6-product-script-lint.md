# P6 · The product script, linted for the first time — 1 dead function, 55 diagnostics, and two corrections to my own note

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: P6 chore — lint the product's `<script>` block | DATE: 2026-10-22T09:10:00Z**

**Why this is worth a session.** No lint configuration in the council covers the **product's script** — the root `biome.json` scopes itself to `tests/**`, `_agents/**/tools/**` and `tools/**` (rightly: the product is the Architect's). So the 6,105-line script that is about to receive the largest merge of the project has **never been linted by anyone**. It has been read, probed and diffed; it has not been swept.

**Method (pasteable).**

```
node -e '
const fs=require("fs");
const html=fs.readFileSync("NFL Draft Simulator merged.html","utf8");
const blocks=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
fs.writeFileSync("/tmp/product-script.js",blocks.sort((a,b)=>b.length-a.length)[0]);
'
node --check /tmp/product-script.js          # → OK
```

The build has **one** script block (621,283 chars, 6,105 lines; the file itself is 6,554 lines). `node --check` passes.

**The config used** is the council's house rules — `noAssignInExpressions: off`, `useIterableCallbackReturn: off`, `noTemplateCurlyInString: error`, `noUnusedVariables: error`, `noUndeclaredVariables: error`, `noDuplicateObjectKeys: error`, `noSelfCompare: error` — plus `javascript.globals` listing the browser globals (`window`, `document`, `localStorage`, …) so the browser API is not mistaken for a typo.

## 1 · The results

| rule | diagnostics | reading |
|---|---|---|
| `correctness/noUndeclaredVariables` | **0** | **the best news in this note** — with the browser globals declared, **no identifier in the build is undefined**. There is no typo'd variable anywhere in the 6,105 lines. |
| `suspicious/noTemplateCurlyInString` (house rule ON) | **0** | no string in the build accidentally looks like a template literal |
| `suspicious/noDuplicateObjectKeys` | 0 | no duplicated object key |
| `suspicious/noSelfCompare` | 0 | no `x === x` |
| `correctness/noUnusedVariables` | **39 errors** | dead variables — **one of which is a whole dead function** (§2) |
| `correctness/noUnusedFunctionParameters` | 16 warnings | unused parameters (signatures kept for API shape) |

**The named subset of the 39 unused variables** (extracted from Biome's messages): `goSeason` (a function), `T`, `r`, `other`, `sc`, `open`, `e` ×2, `N` ×2, `gp`, `all`. **Unused parameters:** `hostId`, `list`, `g`, `rnd`, `idx`, `gcls`, `s`, `final`.

## 2 · The finding worth acting on: `goSeason()` is dead code

**VERIFIED, three ways.**

1. Biome: `This function goSeason is unused.` — at the product script's line 399, which is **line 846 of `NFL Draft Simulator merged.html`**.
2. `grep -o 'goSeason' "NFL Draft Simulator merged.html" | wc -l` → **2**. The two occurrences are the definition (l.846) and one call (l.857).
3. That call is **inside the function's own body**:

```js
function goSeason(){                                   // l.846
 const host = document.getElementById('seasonHost'); if(!host) return;
 if(seasonState){ renderSeasonTab(host); return; }
 if(draftSim && draftSim.pos >= 32*26){
  host.innerHTML = `<div class="panel hero-panel">
   <h2 style="margin-top:0;">Play a Season</h2>
   <p style="font-size:1.18rem;line-height:1.55;">Your 26 starters are done. Run your team through a full 17-game regular season…</p>
   <ol class="gl"><li>Starting the season builds the schedule…</li>…</ol>
   <button class="resetbtn" id="startSeasonHeroBtn" …>Start Season</button>
   <p class="narr" style="margin-top:10px;">Want to review your roster first? <button class="tabbtn" id="backToResultsBtn"…>
  </div>`;
  document.getElementById('startSeasonHeroBtn').addEventListener('click', ()=>{ startSeason(); goSeason(); });   // l.857 — the only call
  document.getElementById('backToResultsBtn').addEventListener('click', ()=>{ setActiveTab('viewDraft','tabDraftBtn'); … });  // l.858
  return;                                              // l.860
 }
 …
}
```

**So: the "Play a Season" hero — the panel with the "Start Season" button and the three-step explainer — is rendered by a function that nothing ever calls. It never reaches the DOM.** The season is started from three *other* call sites: `startSeason()` at l.3450, l.3940 and l.6160.

**Why it matters (three ways, in order of weight).**
- **The Owner may be asking for this screen.** §4.6 of the Owner's brief is about the *preseason* screen and §4.5 about the draft; but if "Play a Season" was meant to be the handoff between the draft and the season, the handoff the Owner sees is whatever the other three call sites render — **not** the panel that was written for it. This is exactly the kind of drift the §7 rule (`two conference charts`, `the season review button`) is meant to catch, and it is worth one question to the Owner before the merge.
- **It is 16 lines of dead template plus two dead event handlers** in a file that is about to receive the largest merge of the project.
- **The `return;` at l.860** — a function that builds a panel and then returns `undefined` — is a smell that the function was refactored away from a caller and never cleaned up.

**WHAT (old → new, exactly)** — **this is a decision for the Architect, not a patch.** Two options, both cheap:
- **(a) wire it** — call `goSeason()` from the place that is supposed to show the season entry (the same place that calls the other `startSeason()` sites), so the "Play a Season" hero becomes the real handoff; or
- **(b) delete it** — remove l.846-861 (the function) so the dead panel and its handlers go with it.

**I am not proposing (b) as the default**, because deleting the screen the Owner may have been shown in a screenshot is the more expensive mistake. **Ask, then act.**

**SAFE ALONE?** Yes, either way — it touches nothing else, and `goSeason` has no callers to update. **HOW TO CHECK:** after the change, `grep -c 'goSeason' "NFL Draft Simulator merged.html"` is `1` (deleted) or `≥3` (wired, with a real call site), and the "Start Season" button is clicked in a browser and the season starts. The lint line `This function goSeason is unused` disappears in either case.

## 3 · Two corrections to my own M-20261022-g note (public, because both were wrong)

**Correction 1 — `"preset": "recommended"` is CORRECT for Biome 2.6.2, and my suggestion was wrong.** M-20261022-g said the config's `preset` key "should be made explicit as `recommended: true`". **Biome's own diagnostic says the reverse:**

```
deserialize  DEPRECATED  ━━━━━━━━━━
  i The use of the recommended field has been deprecated, and will removed in the
    next major version of Biome. Use preset instead.
```

**The repo's `biome.json` is right and my note was wrong.** Following my note would have introduced a deprecation warning into the council's config. The fix: **change nothing** — keep `"preset": "recommended"`.

**Correction 2 — `noSelfAssign` does not exist in Biome 2.6.2.** My note proposed adding it. Biome rejects it:

```
× Found an unknown key `noSelfAssign`.
  i Known keys: - recommended - preset - noAlert - …
```

The nearest rule is **`noSelfCompare`** (`lint/suspicious/noSelfCompare`), which **does** exist. So the proposal becomes `noSelfCompare`, not `noSelfAssign`. **Correction 3 — `noUndeclaredVariables` has no `typeofs` option in 2.6.2** (its only option is `checkTypes`), so my "cure the 16 false positives with `{"options":{"typeofs":true}}`" is invalid as written. **The correct cure for the council's e2e specs is to declare the two page globals they check** — measured: the specs touch exactly **`draftSim`** and **`seasonState`** — i.e. add to `biome.json`:

```json
"javascript": { "globals": ["draftSim", "seasonState"] }
```

Those two names are the only page globals the specs read via `typeof`; declaring them makes all 16 diagnostics disappear, with the rule left on.

## 4 · What I did not check

- **I did not change the product file**, and I did not apply any of the three options in §2 — that is the Architect's call, and the Owner's answer on which handoff screen is intended.
- **I did not run the build in a browser** — every statement here is from the source text or a scripted check.
- **I did not lint the CSS or the HTML** in the build (Biome does not cover them), so this says nothing about the markup's validity.
- **I did not verify the remaining 27 of the 39 unused variables by name** — Biome's message format differs for some of them and my extraction captured 12. The count is exact; the list is partial, and it is partial in the *safe* direction: every named one I did capture is genuine.
- **I did not check whether the other 38 dead variables are also load-bearing** — an unused variable can be a leftover, or it can be a value that *should* have been displayed (a computed stat that never reaches the screen, which would be the Owner's "more advanced stats" complaint in code form). **That is worth one pass by whoever owns the build.**
- The extracted script lives in the session's temp directory; **I did not commit a copy of the product's script** to the repo.

**Config used (for anyone repeating this):** in `/tmp` — `biome.json` with `linter.rules.preset: "recommended"`, `noAssignInExpressions: off`, `useIterableCallbackReturn: off`, `noTemplateCurlyInString: error`, `noUnusedVariables: error`, `noUndeclaredVariables: error`, `noDuplicateObjectKeys: error`, `noSelfCompare: error`, `noUnusedFunctionParameters: warn`, and `javascript.globals` listing the browser globals.
