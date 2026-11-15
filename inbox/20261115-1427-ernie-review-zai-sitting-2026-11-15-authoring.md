SPEAKER: ERNIE | ROLE: advisor (seat ernie) | TASK: review — Z.ai sitting `zai-sitting-2026-11-15-authoring` (hosted verbatim on `council/ernie` at Owner request) | DATE: 2026-11-15T14:27Z
FOR: no queue row — Owner-directed review. The delivery itself is at `_agents/ernie/deliveries/zai-sitting-2026-11-15-authoring/` on `council/ernie` (commit `731e4e3c`, 359 files, 9.3 MB, `CHECKSUMS.txt` 358/358 sha256 OK — I verified the checksums before reviewing).

# Review: Z.ai's authoring sitting, 2026-11-15

## Verdict

**A strong, unusually honest piece of work whose central measurement survives independent re-measurement — and it does not pass its own "done" bar on the tree it ships.** Three things need fixing before this delivery is signed, none of them about Vue or Svelte: the delivered tree fails type-check in **both** arms (its own gate 5), the one DECIDES row's evidence cites line counts that are not in the shipped files, and the arms' visual language is **w88/Cakepanz-derived, not w89's** — no Cinzel, dark-only, and every w89-derived hex comes from the palette layer w89 itself overrides.

The authoring answer is credible: I reproduced the bundle delta (10,588 B vs their 10,969 B), the four tests, the pool ledger, the engine pin, and — on a different machine — byte-identical builds.

---

## What I confirmed as stated (receipts)

| claim | how I checked | result |
|---|---|---|
| engine consumed as a frozen snapshot at pin `d3bd81d2`, 57 files | `git archive d3bd81d2 colors/src` → `diff -rq` against `arm-vue/src/engine` | **byte-identical, 57 files**; identical across all three arms (`diff -rq` clean) |
| ratings never generated | sha256 of the three CSVs vs `d3bd81d2:data/nfl/*` and vs Cakepanz | **identical in all three** (`madden27-ratings.csv` `607183a2…`, 1,941 rows) |
| pool ledger: 1,941+12=1,953, 32 LS, board 1,921 | `node tests/pool-ledger/pool-ledger.test.mjs` | **PASS**, every line reproduces; `draft.ts:53` is the correct line |
| turnovers named 16/16 | `node tests/turnovers-named/turnovers-named.test.mjs` | **PASS** (6 games, 16 turnovers, 16 named) |
| banned phrasings 0 hits + 2 engine findings | `node tests/banned-phrasings/banned-phrasings.test.mjs` | **PASS**, 0 hits; the two engine findings are named with file:line and are real |
| OT clock defect (expected FAIL) | `node tests/ot-clock/ot-clock.test.mjs` | **FAILs as designed** — the defect receipt is genuine (`p5:Q4 00:00`, `p5:Q4 -3:-4`) |
| bundle delta ≈11 KB toward Svelte | `npm ci && npm run build` both arms, `gzip -9` per their documented method | **10,588 B** JS-only concat gz (vue 121,037 / svelte 110,449); their 10,969 B; four-slice 10,946 B. Direction and magnitude hold |
| CSS byte-identical in both arms | `cmp`, sha256 | **identical** (`98049350…`) |
| dists rebuild byte-identically | my build vs their published hashes | **all four hashes match on a different machine** (Mac, node v26 vs their Linux v24) — `c54cdf68…` vue js, `e62cd694…` svelte js, `98049350…` css |
| `svelte-check` is the stronger checker on a11y | I ran it on the delivered arm | **confirmed** — 3 a11y warnings with file:line + rule URLs (`Cards.svelte:57` ×2, `FeedPanel.svelte:49`) |
| the getter-wrapper idiom is real and compiler-forced | compiled a candidate in their own project | **real, but see F5** — the compiler forces *an* indirection, not one wrapper per export |

## Findings

### F1 — the delivered tree fails type-check in BOTH arms. `defect` · VERIFIED

`npm ci && npm run build` then the checker, in clean copies of both arms:

```
$ npx vue-tsc --build ; echo $?
src/lib/savesService.ts(58,16): error TS2352: Conversion of type 'WeekEnvelope' to type
  '{ payload: Record<string, unknown>; }' may be a mistake …
1

$ npx svelte-check --tsconfig ./tsconfig.json --output human ; echo $?
svelte-check found 1 error and 3 warnings in 3 files
1
```

Same file, same line, same TS2352 — `savesService.ts` is **byte-identical in both arms**, so this is one shared-file defect, not a framework difference. It was introduced by the week-save-hydration work (the file's own comment dates it "owed, 2026-11-15"), i.e. **after** the type-check receipts were taken, and no gate was re-run.

This matters beyond the error: `SLICE-DONE-PROPOSAL.md` gate 5 is "**Both typecheckers clean** (0 errors)", and the same file's "Applying it retroactively" says slice 5 and the season screen "satisfy all seven". `AUTHORING-COST.md` records "typecheck errors 0 / 0". **The delivery does not pass the bar it proposes**, and the miss is in the delivery, not in a framework. Fix is one line — `as unknown as { payload: Record<string, unknown> }` — then re-run both checkers and re-issue the row.

### F2 — the DECIDES row cites line counts that are not in the shipped tree. `defect` · VERIFIED

`AGENTIC-ERGONOMICS-VERDICT.txt` (1): "appStore.ts **61 L** … vs appStore.svelte.ts **68 L**". The delivered files:

```
83  arm-vue/src/lib/appStore.ts
98  arm-svelte/src/lib/appStore.svelte.ts
61  arm-vue-vapor/src/lib/appStore.ts
```

61 is the **vapor** arm's store; 68 matches no file. The pair comes from `receipts/two-arm-fourslice.txt`, where the four-slice store was 61/68 — both files have since grown (+22/+30) with slice 5, the arc, and the season. The *delta* also changed: **7 lines at four slices → 15 lines as shipped**.

Direction of the error favours their conclusion, so it is not a motivated number — but the single row that decides the verdict is evidenced on a tree that is not the delivered one.

### F3 — the line-count answer at the delivered surface is an exact tie, and the delivery does not say so. `finding, strengthens the verdict's honesty` · VERIFIED

```
arm-vue     1,249 lines  (framework-owned: ts/vue/svelte/css, excl. engine, data, fixture.json)
arm-svelte  1,249 lines
```

Identical. File-for-file the arms are a mirror: `abbr.ts` 20/20, `bootData.ts` 74/74, `cardDraw.ts` 57/57, `cardVM.ts` 35/35, `feedVM.ts` 160/160, `ink.ts` 35/35, `savesService.ts` 101/101, `seasonVM.ts` 69/69, `cards.css` 36/36, `feed.css` 125/125.

The store delta (+15 for Svelte) is exactly cancelled by Vue's larger arc panel (`Ticker.vue` 43 vs `LineupPanel.svelte` 20) and small screen differences. Two consequences:

- Row 17 "lines: tie" is **more true than the four-slice receipt's "FLAT — Vue 2–4% ahead"** (R = 0.9778). The 2–4% is a scope artefact: it is measured on entry+root+screen+store only, excluding the randomly-assigned arc panel, which is where the 23-line swing lives.
- Row 9's tax, as a share of the delivered surface, is **15 / 1,249 = 1.2%**. The structural claim survives; the magnitude is small, and the Owner should see it stated that way.

### F4 — several receipts are stale against the tree they ship with. `defect` · VERIFIED

| receipt | says | shipped tree |
|---|---|---|
| `two-arm-lines.txt` | "engine (52 files, diff clean)" / "identical 52/52" | **57 files** |
| `two-arm-fourslice.txt` | "The engine stays the vendored pin 4ca9a071" | pin is **d3bd81d2** |
| `bundles-pin-d3bd81d2.txt` | css 6,598 B raw | **11,473 B** (chrome grew with the arc/season work) |
| same | JS delta 10,969 B | my rebuild: **10,588 B** |

None of these is false *as of when it was taken* — but a reader who takes the delivery at face value gets a 52-file engine and a 6.6 KB chrome that do not exist in the zip. Each needs a "measured at <tree/pin>" line, which the files' own §1.1 method note already models for gzip.

### F5 — the idiom is real, but "one wrapper per export" is a choice, not a compiler requirement. `correction` · VERIFIED

The verdict says the idiom "is real, permanent, and was re-paid during the arc work", taxing "every module-level reactive export forever". The compiler's own message (quoted in `two-arm-fourslice.txt`) is: *"Either export a function returning the state value **or only mutate the state value's properties**"*.

I compiled the cheaper form in their project, same runes, same reassignment:

```ts
let a = $state.raw<{ n: number }>({ n: 0 });
let b = $state.raw<number>(0);
export const store = { get a() { return a; }, get b() { return b; }, set(v: { n: number }) { a = v; } };
```

`svelte-check` reports **0 diagnostics** for that file in the delivered project. So the boundary forces **one** indirection, not N; the arm paid N because it exported N bindings.

What survives: Svelte's module boundary is genuinely more awkward than Vue's (`shallowRef` needs no ceremony), and the facade has a real migration cost — every call site changes from `draftSnap()` to `store.a`. What does not survive: "every future module-level reactive export pays it". In the cheaper idiom it is one facade, paid once.

### F6 — the arms do not carry w89's visual language, and the gap is symmetric and one file wide. `defect` · VERIFIED

Measured on the two stylesheets (21 distinct hexes), plus the fonts and mode:

| w89's live language | the arms |
|---|---|
| Cinzel / Cinzel Decorative headings (158 Cinzel refs in w88/w89; loaded from `fonts.googleapis.com`) | **no Cinzel, no `@font-face`, no woff** anywhere — `font-family: Georgia, 'Times New Roman', serif` (`feed.css:19`) |
| two-mode: light default `--bg:#fdf2f6` (13616–13622), dark `--bg:#1e1119` (13624–13629) | **`color-scheme: dark` only**, no `prefers-color-scheme`, no `data-theme` (`feed.css:7`) |
| live palette `--text:#f2e7d5`, `--sub:#c99cae`, `--bg:#1e1119` | **none of these values appears**; the arms use `#181114` / `#f5e9dd` / `#c8a48f` — the **superseded** cream/dark block at 486–545 |
| `[data-zpbteam]` remaps ~20 accent tokens to JS-computed accessible tones (`ZPB_TEAM_COLORS`, 32×3) | no `--t*` variables, no takeover |

The arithmetic: **10 of the arms' 21 hexes match a w89 token value — and all 10 belong to the layer w89 overrides; 0 belong to the live layer.** The remaining 11 are hand-tuned or lifted from the brag card (`#0b0703`, `#1c1307`, `#fff2c4`).

This is exactly the trap I filed this morning (`inbox/20261115-1332-ernie-vue-svelte-design-contract.md`, F6): w89's CSS carries a superseded palette at line 486 that reads as authoritative, and the live values are 200 lines further down at 13616. The arms read the wrong layer.

Two qualifications, both in the delivery's favour:
- **It is not a framework difference.** `feed.css` and `cards.css` are byte-identical in both arms, so this does not confound the authoring comparison — the arms are visually equivalent to each other.
- **The chrome is deliberately w88/Cakepanz-derived**, per its own header comment ("the w88 anatomy from the Cakepanz slice-4 feed"), and the sitting's question was authoring speed, not beauty. It is the *current Owner bar* that has moved, not a promise this sitting broke.

Team colour is partly there and I nearly got this wrong: `ink.ts` does import `TEAM_COLORS` (the Owner's 22 Oct table) and gives each feed line its own team ink, with a contrast check against `PANEL_HEX = '#181114'`. What is missing is w89's whole-page takeover, not per-line team colour.

**The cheap fix:** because the chrome is byte-identical across arms, the entire beauty gap closes in **one file, once** (plus one `@font-face` block), and the framework comparison is untouched by it.

### F7 — two smaller items. `defect` · VERIFIED

- `README.md`: "Live site per the Owner: **w85** (gh-pages' newest publish is w89 — verify per START-OF-CHAT §3)". The parenthetical is right and the headline is stale: I verified `WAVE: w89` in `origin/gh-pages:index.html` today. The delivery's own §2-update note says the same thing; only the README line lags.
- `ot-clock.test.mjs` output: `p5:Q4 **-3:-4**` — the OT defect renders a *negative* clock, not just the wrong period. Worth naming in `filings/OT-clock-fix-PENDING.txt`, because a fix that corrects the period label and leaves `-3:-4` has not fixed the defect.

---

## What I would change, in order

1. **Fix the one type error** (`savesService.ts:58`, cast via `unknown`), re-run `vue-tsc --build` and `svelte-check` on both arms, and re-issue `AUTHORING-COST.md`'s typecheck row and `CATEGORY-WINNERS.md` rows 16/18/23 from the shipped tree. This is the delivery's own gate 5.
2. **Correct row 9's numbers** to 83/98, and add the surface fact the delivery does not have: 1,249 = 1,249, tax = 1.2%. It makes the verdict *stronger*, because it shows the call was made on structure, not on volume.
3. **Date-stamp every receipt** with the tree/pin it measured (F4). The §1.1 gzip method note is the right model.
4. **Restate the idiom's cost as "one facade, paid once"** unless a future sitting measures the facade's migration cost and finds it worse (F5).
5. **Treat w89 resemblance as its own work item**, not as a defect of this sitting — and do it in the shared chrome file, once, for both arms (F6). The font fix is the same ~54 KB inline-`woff2` pattern the brag card already uses, because w89's own CDN link violates the offline requirement.

## What I did not do

- Did not re-run the HMR/dev-server/keyboard timings (single-run, NOISE-weighted, no decision weight).
- Did not run the vapor arm's build (needs vue 3.6.0-rc); the vapor receipt is internally consistent with the vdom arm's numbers.
- Did not verify the ergonomics questionnaires — they are self-report by construction, and the delivery labels them so.
- Could not inspect the screenshots: this model has no image input. Every visual claim above is measured from CSS, tokens and file counts instead, which is checkable; a human eyeball pass on `shots/` is still worth doing before the Owner signs.

PRIORITY+: P1 · Re-issue Z.ai's authoring sitting with a green type-check on the shipped tree, row-9's real numbers, and the 1,249=1,249 surface fact · owner: the Vue-vs-Svelte call should not rest on a delivery that fails its own gate 5 · deliverable: one-line cast fix + re-run both checkers + corrected rows in `AUTHORING-COST.md`/`CATEGORY-WINNERS.md` · evidence: `inbox/20261115-1427-ernie-review-zai-sitting-2026-11-15-authoring.md`