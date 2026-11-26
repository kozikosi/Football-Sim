SPEAKER: orcads | ROLE: council advisor | TASK: review the relayed S17 continuation package at the delivered bytes | DATE: 2026-11-26T01:56Z

REVIEW-OF: `deliveries/zai-s17-continuation-2026-11-25/` (relayed verbatim at commit `210672361`; source `/Users/kosi/Desktop/Football Sim/zai-s17-continuation-2026-11-25`; author: Z.ai, the S17 continuation sitting)
VERDICT: **improved** — Wave A (the evidence layer) holds under re-run and closes the three findings I filed on 2026-11-23. Wave B does not: at the delivered bytes its own battery dies on a syntax error, and once that one line is fixed, **6 of its 12 laws fail**, the node battery is **35/37**, the board battery **23/24**, and the offline tent **cannot pass as written**. The package's boot documents carry a green state block generated at 06:54Z over a tree that changed at ~21:19Z. The fixes are small and exact (§5); nothing here needs a redesign, and the engine is untouched.
EVIDENCE: every line below is VERIFIED unless labelled REPORTED / INFERRED / UNKNOWN. Commands and raw output are in §2.

> **The weakest point of the work:** the evidence layer is now strong enough to *prove* the tree is red, and it proves it — but the wave that made it red was shipped under the same covers, so the package reads green while `check-claims` exits 1. The tools are right; the sitting stopped after landing code and before running them.

---

## 1. What I ran (all in a scratch copy, `data/packs/` restored from `408410477`)

| # | Command | Result |
|---|---|---|
| 1 | `node tools/verify-package.mjs .` | `401 OK / 0 FAILED / 0 missing` · **`EXTRA: SHA256SUMS-2026-11-25.txt` → exit 1** |
| 2 | `node scripts/check-claims.mjs` (phase **full**) | **25 OK · 8 RED** · exit 1 |
| 3 | `node scripts/check-claims.mjs --phase packaging` | **18 OK · 3 RED** · exit 1 — this *is* composite step 17c |
| 4 | `node --test --experimental-strip-types test/engine.test.ts` | `tests 430 · pass 430 · fail 0` (87 s) |
| 5 | `node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs` | **35 pass · 2 fail** (`N26`, `N27`) |
| 6 | `node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs` (vite preview 4173) | **53 pass · 0 fail** |
| 7 | `node --import ./scripts/node-port-register.mjs batteries/board.battery.mjs` | **23 pass · 1 fail** (`L20`) |
| 8 | `node --import ./scripts/node-port-register.mjs batteries/waveB.node.battery.mjs` | **SyntaxError** (as shipped) · after the one-line fix: **6 pass · 6 fail** (`W1a`, `W1b`, `W3`, `W4`, `W6`, `W8`) |
| 9 | `node --import ./scripts/node-port-register.mjs batteries/offline.battery.mjs` | **FAIL** — production `dist/single.html` boots to the *import* empty state (`.cp-ts-team` never appears); with `?dev=1` it boots but times out on `button:has-text("START")` |
| 10 | `npx vite build` + `node scripts/distfile.mjs` | exit 0; **rebuild is byte-identical to the shipped dist** (`index-BTZyEL9n.js` `c0565e36…`, `index-CpxM29ri.css` `d493f22a…`, `single.html` `83e970d7…`) — source ↔ dist is sound |
| 11 | `shasum -a 256 ACCEPTANCE-RECEIPTS.txt` | `d536d63f0cf5a0c8…` = `receipt-attestation.json.log_sha256`; terminal marker `ACCEPTANCE RUN COMPLETE` present, every step `exitCode 0` |

**Not run** (labelled, not omitted silently): `bash scripts/acceptance-run.sh` end-to-end (≈50 min, and step 17c is already reproduced verbatim in row 3); the visual and slot batteries at the Wave B bytes (their receipts still describe the Wave A dist); a real 390 px phone; `npm ci` on a cold cache.

---

## 2. What holds — Wave A closes my 2026-11-23 findings

- **My F2 (a RED verifier verdict overruled in prose) is closed by construction.** `claims.json` + `scripts/check-claims.mjs` exist, and they are not vacuous: **I got 8 RED out of 25** on the delivered tree. A checker that can only pass is not a checker; this one fails.
- **My F3 (SHELL-STATUS shipped `STALE` from a clock rule) is closed.** `SHELL-STATUS.md` now prints `content FRESH (the receipt's dist fingerprint matches the shipped dist/)` and carries the `acceptanceSha`. At these bytes it correctly says STALE, because the dist was rebuilt — the signal now tracks bytes, not minutes.
- **My F4 (41 captures = 20 pairs + 1 orphan) is closed.** `shots/side-by-side/` holds 20 pairs + `new-only-s5-panel-settings-1180x950-light.png`. The receipt's `nonVacuity` array joins 41:1 to `captures` on `(side,scene,w,h,theme)` with `met===true`; `sbs-nonvacuity` is a real structured join, not a string count.
- **A1 is the strongest work in the package.** `acceptance-run.sh` generates its own terminal marker, `--resume` reuses only blocks whose sha still matches, an interrupted run archives rather than truncates, and `receipt-attestation.json` seals `log_sha256`. I recomputed the sha: it matches. This is the right shape for a receipt.
- Engine fence: 430/430 at the delivered bytes, unchanged; `dist` rebuilds byte-identically (row 10). The shell's own 53 laws pass, including the 390 px fit and `file://` boot with the P-317 picker.
- **A5/A6** (identity re-pin, R-13 rename to a migration plan, zip/SHA claim retracted, hash-pinned w89 fixture) are present as described.

---

## 3. Findings (defects shown, with the command that shows them)

### R1 · defect — two trees in one package: the state of record describes the Wave A bytes, not the shipped bytes
`README.md` and `ZAI.md` carry `State of record (GENERATED 2026-11-25T06:54:35Z … 30 OK · 0 RED)`. The tree was still moving at 21:15–21:19Z (`claims.json` 21:15, `SHA256SUMS` 21:19, `dist` rebuilt). At the shipped bytes:

- full phase **25 OK / 8 RED** (row 2), packaging **18 OK / 3 RED** (row 3);
- `freshness-map` names the drift itself: `SHELL-STATUS.md: input src/App.svelte CHANGED (recorded 0a323591…, now de570380…)`, `input deliveries/receipts/visual-battery-latest.json CHANGED`, `claims.json CHANGED` (×3 documents);
- `state-blocks-fresh`: `README.md: block drifts at line 2` (same for `ZAI.md`, the hand-over).

The bulletin *does* say Wave B is PARTIAL — that is honest. The defect is that the **generated blocks**, which are the first thing any reader trusts, still assert 0 RED. It is the exact "green prose over red bytes" class the T2 protocol was built to kill, reintroduced by landing a wave after the seal.

**Fix (mechanical):** run the close-out chain at the final bytes — the bulletin's own `NEXT:` line already lists it — and add the structural guard in §5.7 so it cannot recur.

### R2 · defect — the Wave B battery dies before any law runs, and that hid six failures
`deliveries/receipts/waveb-battery.log` ends at:

```
file:///…/batteries/waveB.node.battery.mjs:57
  for (const field of ['ovr', 'wins', 'priority', 'gone'] as const) {
                                                            ^^
SyntaxError: Unexpected identifier 'as'
```

A `.mjs` file cannot carry `as const`. With that one token removed, the battery runs and **6 of its 12 laws fail**:

| Law | Failure |
|---|---|
| `W1a` | `the card seal count is not the live seal — 385 !== 401` |
| `W1b` | `claims.json has no seam-card-agrees row — the gate does not read the card` |
| `W3` | `the board battery does not drive through the registry` |
| `W4` | `dist/single.html carries remote refs: https://svelte.dev, …` |
| `W6` | `the golden holds no boardVM shape` |
| `W8` | `the tint pair degraded contrast for Arizona Cardinals` |

That is the whole story of Wave B in one table: each theme landed as a module, and each module's own law was never run. (Note `W2a/W2b/W5/W7/W9/W10` **do** pass — the provenance, no-display-parse, decision-VM, pace, dev-gate and brag laws are real.)

### R3 · defect — the manifest's converse check fails on a file the package itself ships
`verify-package` (row 1): `401 OK / 0 FAILED / 0 missing` then `EXTRA (not in CHECKSUMS.txt): SHA256SUMS-2026-11-25.txt` → **exit 1**. `seal-verifies` and `seal-count` are RED in every phase because of it. Either list the file or keep session-level artifacts out of the package root; the converse gate is right to refuse.

### R4 · defect — `dist-in-seal-and-status`: SHELL-STATUS prints asset names that no longer exist
`SHELL-STATUS.md` → `dist/assets/index-BHOhZuA_.css`, `index-Cb5sVPrX.js`. Shipped dist → `index-CpxM29ri.css`, `index-BTZyEL9n.js`. The seal lists the **new** names, so the manifest is post-Wave-B and the status is pre-Wave-B: two of the four "shipped bytes" fingerprints a reader would verify are wrong. (The rebuild in row 10 reproduces the new hashes exactly, so the dist itself is fine.)

### R5 · defect — Wave B broke three pinned laws by editing the strings they pin, without re-pointing them
This is the AGENTS §9 rule ("a change re-pins its law in the same change") failing silently:

- **N26** pins `<span class="cp-num cp-gone" …>{r.gone}</span>`; `BoardRow.svelte:58` now carries `title={provGone()}` inside the tag. `N26` also pins `aria-label="{r.ovr} overall"`, `"{r.wins} wins"`, `"{r.priority} priority"`; the source now appends `— provenance in the tooltip` to all three.
- **N27** pins `openNow.set(openSlots(st.draft.rosters[userTeam]))`; `App.svelte` now does `const opens = openSlots(...)` … `openNow.set(opens)`. Same behaviour, different shape.
- **L20** (board) selects `.cp-num[aria-label$=" wins"]` / `$=" priority"`; the new labels end in `in the tooltip`, so the selector matches nothing: `wins="undefined" prio="undefined"`. The DOM is fine — the law's selector rotted.

**Fix:** re-point the three pins to the new source, and change L20 to select on a stable hook, not on label text (§5.3). The deeper lesson is the one the package itself states in `domHooks.ts`: batteries must not inline selectors or source strings that a UI wave will edit.

### R6 · defect — the offline tent cannot pass as written, and has never run
Three separate faults, in order:

1. The shipped `dist/single.html` boots to `No player dataset yet … Import a dataset CSV to begin`, so `.cp-ts-team` never renders and the tent times out. The production default is the *import* empty state (F11 (A)); the battery assumes a dataset.
2. With `?dev=1` the app boots clean from `file://` with **1 request, 0 external** — offline works — but the battery then waits for `button:has-text("START"), .cp-startbtn, .cp-start`, which does not exist. The real control is `.cp-ts-go` ("DRAFT AS … · SLOT n") after `.cp-ts-team` / `.cp-ts-slot`.
3. Warp: this is the `domHooks` failure mode exactly — the same stale inlined selector, in the one battery written to prove the Owner's hard offline requirement.

Until this runs, "offline is a hard requirement" has **no green receipt at the Wave B bytes** — and the static complement (W4) is red too.

### R7 · calibration question — "remote ref" means two different things in two tools
`node scripts/distfile.mjs` prints `no external refs: true`; `W4` finds `https://svelte.dev` ×4 in the same file. Both are "right" under different definitions: the four strings are Svelte's **error-message** URLs (`https://svelte.dev/e/effect_orphan`, …) — inert text, never fetched. Recommendation: define the law on *fetching* references (`src=`, `href=` on link/script/img, `@import`, `url()`), allowlist `svelte.dev/e/` **with a comment saying it is inert**, and keep the runtime tent as the authoritative proof. Otherwise the law will stay red forever and teach people to ignore it.

### R8 · defect — the takeover tint fails WCAG AA in light mode for **all 32 teams**, and measures the wrong panel
`tintReceipt()` at these bytes:

- light-mode gold `#8a5f18` on the tinted panel: **min 3.51, max 4.39** (AA needs 4.5) — every team fails (AZ `#e7cfc3` → 3.78);
- the receipt measures `before` against `PANEL_HEX_DARK #291a24` / `PANEL_HEX_LIGHT #ffffff`, but `tintOf` mixes into the hardcoded `#1a1220` / `#f2e7d5` — **the receipt certifies a surface the tint is not drawn on**;
- `GOLD_TEXT` is a copied literal, not the token: dark `#e8c87e` vs `tokens.ts` `DARK.gold2 #e6c67d` (already drifted), light uses `gold3 #8a5f18` while the comment says `gold2`. The file's own header says "never an invented colour … the same table ink.ts reads".

**Fix (measured, not suggested):** on the light tint, use the paper ink — `DARK.zcream #53382b` on AZ's `#e7cfc3` = **7.17:1** — or tint only the chip/border and leave the text on the panel. Mix against the imported `PANEL_HEX_*` and import the gold from `tokens.ts`.

### R9 · risk — the SeamCard canary is computed once, and the card has a dead selector
`vite build` warnings at these bytes (the author's build shows them too):

```
SeamCard.svelte:17:26 This reference only captures the initial value of `runningStamp`.
SeamCard.svelte:18:4  … same
BoardFooter.svelte:23:2 Unused CSS selector ".cp-sorttoggle"
```

`const canaryOk = …` and `const stampShown = …` are snapshots; if the prop ever changes (a restored session, a second boot) the card keeps the first verdict. `$derived` is the one-word fix. The card also prints `card.engineVersionRunning` (the JSON's frozen field) next to "running engineVersion" — that is not the running value; pass the live `engineVersion()` in the same prop you already pass. The dead `.cp-sorttoggle` rule is a leftover from the retired sort toggle.

### R10 · defect — the "non-vacuity" contract still passes a screenshot of the wrong scene
`left-s2-board-top3-390x844-dark.png` and `…-light.png` are **the w89 WELCOME cinematic** with the board blurred behind it, while the receipt says `"met": true, "detail": "rows=150 top3rows=3"`. The marker tests DOM *existence*, not visibility or occlusion — so a 2-second overlay satisfies it. Two of the 41 "41/41 markers met" cells are therefore vacuous, by the same class I reported on 2026-11-23, one layer deeper.

Also: `s4-finished` and `s5-panel` at 1180×950 dark are **the same screen** (the season hub), pixel-identical in the two PNGs I opened. The 40-cell matrix is complete in count and not in distinctness.

**Fix:** marker = `visible` ∧ `elementFromPoint(center) ∈ target` ∧ stable for ~1 s, plus a cross-scene fingerprint (`sha256` of the row-ids text) asserted pairwise-distinct across the 5 left scenes and across the 5 right scenes.

### R11 · risk — a missing receipt throws instead of naming itself
`offline-tent` → `checker threw: Error: ENOENT: no such file or directory, open '/…/deliveries/receipts/offline-tent.json'`. The verdict is RED, which is correct, but the message is an uncaught throw (`check-claims.mjs:213` reads the file unguarded). Wrap the read: `receipt missing: deliveries/receipts/offline-tent.json (run npm run battery:offline)`. A gate is read by humans under time pressure.

### R12 · calibration question — `seal-count` hardcodes 385
The claim's `expect: 385` is a literal. The seal legitimately moved to 401 when Wave B added 16 files; a literal count is the same drift class as the pins in R5. Make it a relation: `verify-package OK count == CHECKSUMS.txt lines == the count in the last attested run`, and record the delta in the attestation comment when it changes.

---

## 4. UI/UX review of the shell (what the screenshots actually show)

I opened the package's own captures: `right-s1-teamselect`, `right-s2-board-top3`, `right-s4-finished`, `right-s5-panel` at 1180×950 dark and 390×844 dark; and `left-s2` for comparison. Findings, all visible in those files:

1. **390 px board row is broken (defect).** Names split mid-word — `DeVon ta Smith`, `Trent Willia ms`, `Will Ander son Jr`, `Davan te Adam s` — and the team column collides with OVR (`Philadelphia82`). Cause: the mobile grid's `1fr` name column has no `min-width: 0`, so `overflow-wrap` breaks words instead of ellipsising. Each row then takes **two** lines because the `Draft at …` button wraps to its own centred line.
2. **MY NEEDS eats the first screen (defect).** `MY NEEDS · 32 OPEN` renders 28 chips in a ~300 px box on an 844 px-tall phone: the user scrolls a wall of chips before seeing one player. The same row is the most valuable filter in the app — it should be one line + the top 3 + "all".
3. **No column headers.** `92 · +2.4 · +0.2 · 7%` have no visible caption on the board (the field names live only in `title`/`aria-label`). The Owner's own REC texts name the cells; the board hides them.
4. **Team column wraps to three lines on desktop** (`San Francisco 49ers`, `Los Angeles Rams`), making rows uneven and stealing ~10% of the list. Abbr + `title` (or a wider fixed column) fixes it.
5. **Team Select has no logos and no team colour** — 32 identical text pills. The brand's strongest recognition cue is missing, and the shell's own `tokens.ts` already holds the 32 three-hex table.
6. **Duplicated copy**: `Every number … reads Model Value` appears in the topbar subtitle *and* inside the Team Select panel; `Round 1 · Pick 21 overall 21 of 1024` appears twice on the board header.
7. **Half-empty hub**: `THE SEASON` screen content ends at ~450 px of a 950 px viewport; the 22-button week strip is a row of identical pills with no results on them.
8. **Nav is 14 tabs on two lines** before any football content; three of them are the actual flow.
9. **`SWEEK 1` renders** as the hub's big week label in `right-s4` and `right-s5` (REPORTED from the PNGs; I could not find the literal in `src/` — it is constructed or styled, so it needs a DOM check, not a grep).
10. **Provenance is desktop-only** (defect for the primary device): `title=` has no touch path, and the numeric spans are not focusable. The module header says "on focus (and long-press on touch)" — neither is implemented.
11. **a11y regression from R5's cause**: every value cell's accessible name now ends `— provenance in the tooltip`, so a 60-row board reads that phrase **240 times**. Screen-reader users get noise, not provenance.

---

## 5. Improved text — the exact fixes (drop-in, in the order that makes each gate green)

**5.1 `batteries/waveB.node.battery.mjs:57`**
```diff
- for (const field of ['ovr', 'wins', 'priority', 'gone'] as const) {
+ for (const field of ['ovr', 'wins', 'priority', 'gone']) {
```

**5.2 `batteries/node.battery.mjs` N26/N27 pins** — re-point to the shipped source (or, better, stop pinning whole tags):
```diff
- assert.ok(rowSrc.includes('<span class="cp-num cp-gone" aria-label="{r.gone} gone odds" aria-describedby="cp-gone-desc-{r.id}">{r.gone}</span>'), …
+ assert.ok(/<span class="cp-num cp-gone"[^>]*aria-label="\{r\.gone\} gone odds"[^>]*aria-describedby="cp-gone-desc-\{r\.id\}"[^>]*>\{r\.gone\}<\/span>/.test(rowSrc), …
- assert.ok(rowSrc.includes('aria-label="{r.ovr} overall"'), …)   // ×3 fields
+ assert.ok(/aria-label="\{r\.ovr\} overall[^"]*"/.test(rowSrc), …) // ×3 fields
- assert.ok(appSrc.includes('openNow.set(openSlots(st.draft.rosters[userTeam]))'), …)
+ assert.ok(appSrc.includes('openSlots(st.draft.rosters[userTeam])') && /openNow\.set\(\s*opens\s*\)/.test(appSrc), …)
```

**5.3 `batteries/board.battery.mjs` L20** — select on a hook, not on label prose. Add `data-field` to the cells and assert the label contains the value:
```diff
- return { ovr: get('.cp-ovr'), wins: get('.cp-num[aria-label$=" wins"]'), prio: get('.cp-num[aria-label$=" priority"]'), gone: get('.cp-gone') };
+ return { ovr: get('[data-field="ovr"]'), wins: get('[data-field="wins"]'), prio: get('[data-field="priority"]'), gone: get('[data-field="gone"]') };
```
```diff
- <span class="cp-num cp-ovr" title={provOvr()} aria-label="{r.ovr} overall — provenance in the tooltip">{r.ovr}</span>
+ <span class="cp-num cp-ovr" data-field="ovr" title={provOvr()} aria-label="{r.ovr} overall">{r.ovr}</span>
```
(and the same `data-field` on wins/priority/gone; drop the tooltip phrase from **all four** aria-labels — that alone fixes R11 and keeps L20 honest.)

**5.4 Offline tent** — drive the app that exists:
```diff
- await page.goto('file://' + P('dist/single.html'), { waitUntil: 'load' });
+ await page.goto('file://' + P('dist/single.html') + '?dev=1', { waitUntil: 'load' });   // or import a CSV through the file input; the production default is the import gate
- result.booted = (await page.locator('.cp-ts-team').count()) === 32;
+ result.booted = (await page.locator(HOOKS.teamRow).count()) === 32;
- await page.locator('button:has-text("START"), .cp-startbtn, .cp-start').first().click();
+ await page.locator(HOOKS.teamRow).first().click();
+ await page.locator('.cp-ts-slot').first().click();          // P-317 pick slot
+ await page.locator('.cp-ts-go').click();                    // "DRAFT AS … · SLOT n"
```
and add both controls to `domHooks.ts` (`teamSlot: '.cp-ts-slot'`, `startDraft: '.cp-ts-go'`, scene `teamSelect: ['teamRow','teamSlot','startDraft']`), then make the shell battery resolve the same scene (that is what `W3` fails on).

**5.5 `src/lib/port/takeover.ts`** — import the tokens, measure the surface you draw on, and fix the light text:
```diff
- const GOLD_TEXT = { dark: '#e8c87e', light: '#8a5f18' } as const;
- const GOLD_OF: Record<'dark' | 'light', string> = { dark: GOLD_TEXT.dark, light: GOLD_TEXT.light };
+ import { DARK, LIGHT } from './tokens.ts';
+ // light: the tint is a PAPER surface — gold on it cannot reach AA (measured 3.51–4.39); the paper ink does (7.17)
+ const GOLD_OF: Record<'dark' | 'light', string> = { dark: DARK.gold2, light: DARK.zcream };
```
```diff
- const base = mode === 'dark' ? '#1a1220' : '#f2e7d5';
+ const base = mode === 'dark' ? PANEL_HEX_DARK : PANEL_HEX_LIGHT;
```
…and re-run `tintReceipt()`: every row must satisfy `contrastAfter >= contrastBefore` **and** `contrastAfter >= 4.5`.

**5.6 `src/lib/components/SeamCard.svelte`**
```diff
- const canaryOk = typeof runningStamp === 'string' && …
- const stampShown = canaryOk ? card.stampSnapshot : 'UNKNOWN';
+ const canaryOk = $derived(typeof runningStamp === 'string' && …);
+ const stampShown = $derived(canaryOk ? card.stampSnapshot : 'UNKNOWN');
```
and in `BoardFooter.svelte` delete the unused `.cp-sorttoggle` rule.

**5.7 the structural guard for R1** — one claim, one line of code, and the class is dead:
```json
{ "id": "attestation-covers-tree", "kind": "attestationTree", "phases": ["full"],
  "desc": "the last attested run describes THESE bytes — tree_sha_end recomputed now equals the seal (meta-layer excluded), so a wave landed after the seal cannot keep a green receipt" }
```
Implement it as `attestedTreeSha(records[last].tree_sha_end) === liveTreeSha()` using the *same* walk `scripts/attest.mjs` already uses. A tree that changed after the run then reads **`STALE — the receipt describes earlier bytes`** instead of COMPLETE.

**5.8 the rest, one line each**
- `node scripts/gen-seam-card.mjs` then `node scripts/gen-contract-golden.mjs` (W1a, W6) — and add the `seam-card-agrees` row `W1b` expects (the chip and the gate must read the same file, or the claim is fiction).
- `check-claims.mjs`: wrap the receipt reads — a missing file is a named RED (R11).
- `verify-package`: either list `SHA256SUMS-2026-11-25.txt` or move it out of the package root (R3).
- `seal-count`: relation, not literal (R12).
- Then the bulletin's own `NEXT:` chain: regen → status → freshness → state blocks → regen-manifest → gates → `check-claims` → one composite → the Verifier.

---

## 6. What the next sitting should not redo
The A1 resume/attestation machinery, the content freshness, the structured non-vacuity join, the w89 fixture recipe, the `dist` (it rebuilds byte-identically), the shell's 53 laws, or the engine fence. All of that is sound and re-verified here. The remaining work is pins and receipts at the final bytes — a sitting of an hour, not a redesign.

**Owner-facing one-line summary:** Wave A is trustworthy and closes the last review's findings; Wave B shipped code whose own tests were never run, so the package currently certifies bytes it no longer contains. The eleven defects above are named with drop-in fixes; none touches the engine, and the offline proof needs one selector fix and one decision (does the public build ship a dataset, or is import the first run?).
