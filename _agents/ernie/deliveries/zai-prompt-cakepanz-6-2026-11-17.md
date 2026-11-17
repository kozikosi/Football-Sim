PROMPT — Z.ai · 67 Cakepanz · "wire the team takeover, fix the four receipt defects, and make the pin honest"

**From:** ernie (council) · **Date:** 2026-11-17T23:20Z · **Supersedes:** nothing — this is a new sitting brief
**For:** the next 67 Cakepanz sitting (call it `cakepanz-6`)
**Read time:** ~20 minutes. **Do §4 first; everything else is smaller.**

---

## 0 · How to read this

Self-contained: every term is defined where it first appears, every claim is labelled with how it was produced, every check has a command. **VERIFIED** = the council ran it and the receipt is in this prompt or the council's lane. **REPORTED** = someone else ran it and is named. **INFERRED** = reasoning, not a measurement. **UNKNOWN** = not known.

**67 Cakepanz** is the UI/UX shell of **76 Pancakes**, a football draft simulator. **The shell** is what the user sees. **The engine** is the code in `colors/`. Claude is the **Architect**; you own the shell.

**Your last delivery — `cakepanz-5-2026-11-17` — is good, and this round is not a rebuild.** The council reviewed it on 2026-11-17 (filing: `_agents/ernie/inbox/20261117-2241-ernie-CAKEPANZ-5-review.md`, hosted at `_agents/ernie/deliveries/cakepanz-5-2026-11-17/`). Both snapshots are byte-exact: shipped == `5c808472` (67 files), prepared == `65673a00` (68 files). The flex table is identical across both pins. The engine suite is 394/394 and 406/406 on Node 26. The node battery is 26/26. **Default-off is proved, not asserted** — two trees, two 60-game logs, byte-identical, plus a live control. The receipt falsifier kills all eight laws and its own moved-anchor guard fires. The browser batteries are 29/0/10/3 and 46/0, the 390 px walk is 14/14, the single-file build boots from `file://`.

**What is wrong is not the plumbing. It is one missing wire and five stale documents.** The missing wire is the biggest thing in this brief.

---

## 1 · The rulings that govern this round

**1. TypeScript-neutral until the last second.** The framework pick happens at cutover. Plain TypeScript below the render layer; no framework idiom in `src/lib/**`. Do not re-open the framework question.

**2. The engine is not yours.** You never edit `colors/src`, `src/engine/**`, `flex.json`, `design.json`, the product HTML, ratings, or protected constants. What you need and cannot express → **§5 filing** to the Architect (file, exact old→new, how to check).

**3. The palette is the Owner's.** Light `#fdf2f6`, dark `#1e1119`, Cinzel inlined as base64, `ZPB_TEAM_COLORS`, `[data-zpbteam]`, `--zcream` never tinted, no `--tc`, the user's team in `.ub`. The light gold2 AA failure (1.51:1 / 1.65:1) and the dark `--text` fix (3.17:1) are the Owner's; you measured them and correctly did not touch them. **Keep that posture — but see §4, which is about the *wiring*, not the values.**

**4. No injuries, ever. No ratings, ever.** Basketball deferred.

**5. The pass-class GLM node is NOT the default, and you must not enable it.** It landed at `65673a00`, off by default (`runGame` needs `opts.passClass`/`passGap`). Its sacks shift is **settled** (a per-state rate effect, ~97%, Camp A); its drives shift is an open **4th-down cell-selection artifact** that the Architect is fixing. **Do not set `passClass`, do not set `passGap`, do not make it the default.** The shell's job is to keep working bit-for-bit on the pools node.

**6. Do not decide labels.** Three terms are in play — w89 says **"Value"**, your shell says **"Model Value"**, the Owner's stated preference is **"Engine Value"**. None is ruled. §9 tells you what to report, not what to choose.

**7. The re-pin is prepared, not activated.** `cakepanz-4-prepared/` is correct and the council verified it. **Activation is the Owner's word.** Do not flip the shipped tree to `65673a00` in this sitting.

---

## 2 · Ground truth — what the council verified in `cakepanz-5`

Every row below is the council's own run on the hosted copy, Node v26.13.0, macOS arm64.

| claim | council run | verdict |
|---|---|---|
| shipped snapshot == `5c808472` | `diff -rq` → **0 differences**, 67 files | **VERIFIED** |
| prepared snapshot == `65673a00` | `diff -rq` → **0 differences**, 68 files | **VERIFIED** |
| flex table identical across both pins | `cmp` → exit 0, all four comparisons | **VERIFIED** |
| four packs in prepared, byte-identical to tip | `cmp` × 4 → exit 0 | **VERIFIED** |
| engine suite, shipped, Node 26 | **394 · pass 394 · fail 0** | **VERIFIED** |
| engine suite, prepared, Node 26 | **406 · pass 406 · fail 0** | **VERIFIED** |
| node battery, shipped, Node 26 | **26/26**, N21 + N22 green | **VERIFIED** |
| default-off | 60-game logs **byte-identical** across trees; lambda-0 no-op 60/60; control 60/60 differ | **VERIFIED** |
| `precompile-engine.mjs` | 67 files, **1 transformed** (`platform/localstorage.ts`), snapshot untouched | **VERIFIED** |
| receipt falsifier | F0 green, **F1–F8 all DIED**, exit 0 | **VERIFIED** |
| the falsifier's own guard | moved F2 anchor → **exit 1**, `FALSIFIER TARGET MOVED … anchor not found` | **VERIFIED** |
| slice battery (real Chromium) | **29 pass · 0 fail · 10 SKIP · 3 DEFER** | **VERIFIED** |
| shell battery (real Chromium) | **46 pass · 0 fail**, 390 px walk 14/14, board 390/390, `file://` boot S26–S28 | **VERIFIED** |
| manifest gate | **PASS, 316 entries** | **VERIFIED** |
| `npm ci` from clean | 43 packages; **playwright 1.57.0 resolves from the clone's own `node_modules`** | **VERIFIED** |
| prepared `test/engine/` vs the pin's `colors/test` | 48 files differ, **all import re-points only** | **VERIFIED** |
| `passClass`/`passGap` in the shell | **0 hits** in `src/lib`, `src/App.svelte`, `batteries` | **VERIFIED** |

**The council could NOT verify** (only Node 26 is installed here): the Node 24 rows of your table. Those stay **REPORTED by you**. We also did not run the M3 swap test, `probe-saves-states.mjs`, or the prepared copy's shell batteries — all **REPORTED by you**.

---

## 3 · The findings, in the order they matter

### F-1 · The team takeover is not wired — **the headline**

**VERIFIED, and independently confirmed by a second seat.** `--zpb-t1`, `--zpb-t2` and `--zpb-t3` are **written and never read**.

```
$ grep -rn "zpb-t1" src/
src/lib/port/tokens.ts:43:  return { attr: teamName, vars: { '--zpb-t1': c1, '--zpb-t2': c2, '--zpb-t3': c3 } };

$ grep -rn "var(--zpb" src/
(no output)
```

And the three `[data-zpbteam]` blocks in `src/lib/assets/tokens-w89.css:104-112` are **empty rule bodies with comments**:

```css
:root[data-zpbteam] {
  /* light-mode team remap — see zpb-team-colors.json + the JS hook */
}
:root:not([data-theme="light"])[data-zpbteam] {
  /* system-dark team remap */
}
:root[data-theme="dark"][data-zpbteam] {
  /* dark team remap */
}
```

**The end-to-end trace:**

| stage | exists? | where |
|---|---|---|
| the 32-team × 3-stop table | yes | `src/lib/assets/zpb-team-colors.json` |
| the pure remap | yes | `tokens.ts:41-44` `teamRemap()` |
| the DOM half (attribute + properties) | yes | `bindings/tokensApply.ts:10-15` |
| **a CSS rule that reads the attribute or the properties** | **no** | `tokens-w89.css:104-112` — three empty blocks |

**A user who picks a team sees the attribute change and no pixel change.** The Owner's ruling is *"every team's color changes almost every aspect of the color palette"* (2026-11-15). On this evidence **the team-takeover half of that ruling is 0% delivered**, however complete the plumbing beneath it looks. The token sheet's own sentence — *"Variant L (live-w89) … the team colour via zpb-team-colors.json beside the sheet, applied by setting data-zpbteam plus three custom properties"* — describes the mechanism accurately and overstates the result. **Fix both.**

### F-2 · Four stale documents and one dead import

- **`README.md:3`** says `npm run battery:node` (**24 laws**). The battery has **26**. `SHELL-STATUS.md:19` and `MERGE-README.md:33,55` all say 26/26. This is the same class as the D-3 defect you fixed in this sitting, in the same sentence.
- **`VERIFY.txt §6`** says the manifest gate prints **310** entries. It prints **316**. `MANIFEST.txt` is 316 lines.
- **`VERIFY.txt §11`** says the empty grep covers *"(src/lib, src/App.svelte, batteries, scripts) — exit 1"*. It does not: `scripts/gamelog-fixture.mjs` has **5 hits** (it is the proof script and passes the option deliberately). The substantive claim is true — the shell itself is **0 hits** — so the sentence needs narrowing, not deleting.
- **`batteries/node.battery.mjs:379`** in the shipped tree imports `packHash` and **never uses it**; the prepared copy drops it. Harmless, but `SNAPSHOT.md` says the prepared copy is the shipped tree plus the five paths, and this is an undeclared sixth difference.
- **`SHELL-STATUS.md:28`** reads `s4 feed | DONE (OT workaround stands)` — the only row that is not a plain DONE, and it does not say what the workaround is or where its receipt lives.

### F-3 · The pin line is stale, and the tree proves it

**VERIFIED.** The deployed `67-cakepanz/` on `origin/gh-pages`:

```
README.md:4              → "Pinned engine commit: `4ca9a071`"
CHECKSUMS-slice2.txt:2   → "engine snapshot: 4ca9a071 … 52 files"

$ git ls-tree -r origin/gh-pages 67-cakepanz/src/engine --name-only | grep -c '\.ts$'
57
$ git archive 4ca9a071 colors/src | tar -t | grep -c '\.ts$'
52
$ git archive d3bd81d2 colors/src | tar -t | grep -c '\.ts$'
57
$ diff -rq <d3bd81d2 colors/src> <origin/gh-pages 67-cakepanz/src/engine>
differences: 0
```

**The tree names a pin its bytes are not, and its own file count disproves it.** `d3bd81d2` is the real pin. This is a gh-pages fix, but it is your tree, and it is the motivating example for F-5.

### F-4 · The aesthetic strays (Glyph's static audit, corroborated by the council)

Glyph filed the full comparison (`_agents/glyph/inbox/20261117-2315-glyph-cakepanz-vs-w89-aesthetic.md`, **REPORTED** — static inspection, no screenshots). The rows the council considers real:

| stray | w89 anchor | shell anchor |
|---|---|---|
| **body copy set in Cinzel**, not a system sans | `w89:113` — `font:14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif` | `shell.css:13` + `tokens-w89.css:116` — `font-family: var(--font-ui)` (= Cinzel) |
| **wordmark differs** — "76 Pancakes" in Cinzel Decorative 800 gold | `w89:645` brand stack, Bodoni-Moda-led | `App.svelte:361-364`, `.cp-brand` `shell.css:28` |
| **Bodoni Moda absent entirely**; Cinzel 900 absent | `w89:476-478` loads Cinzel 700/900, Cinzel Decorative 700/900, Bodoni Moda 500/600/700 | `tokens-w89.css:1-34` inlines **Cinzel 700** and **Cinzel Decorative 700** only |
| **slogan missing** — no "Can you go 20-0?" with the shimmer | `w89:2932` (`zpb-cygline` / `zpb-shine`), meta `w89:2225` | not present anywhere in `cakepanz-4/src` |

**What matches and must NOT be "fixed" back:** the light and dark token values, the dark `--text` non-fix (a faithful reproduction of w89's own defect — Owner ruling still owed), no `--tc`, and the **offline font inlining itself**, which is an intended improvement over w89's Google-Fonts link.

### F-5 · The pin-watch gate (a council tool, not a product feature)

Inkling proposed `tools/pin-watch.mjs` — a tripwire that fails when a packaged tree's pin line disagrees with its own bytes. **The council measured the case and it is live, not hypothetical** (F-3). The design that would actually catch it:

1. **count** — `src/engine/**/*.ts` in the tree vs at the named commit (`git archive | tar -t | grep -c`);
2. **spot-hash** — three engine files, tree vs named commit;
3. optionally deep-hash.

**Count first, spot-hash second, manifest hash never alone** — the manifest is the thing that goes stale. This is a **council tool**; you do not build it. But your packaging script is where it belongs, and F-3 is the line it would have caught.

---

## 4 · Part A — wire the team takeover (do this first)

**The shape.** Fill `tokens-w89.css:104-112` so each of the three blocks maps the three team stops onto the accent tokens the sheet already defines. The minimal correct set:

- `--gold2`, `--goldm`, `--gold3` — the three golds are the most visible accent in w89 and the most team-like;
- `--hairline` / `--rosehair` — the rules and dividers;
- `--panel2` — the raised surface;
- **`--zcream` must never be touched** (the Owner's law: it is the never-recolored neutral);
- **`--bg`, `--panel` and `--text` should not be team-tinted** — w89's takeover remaps *accents*, and tinting the page base or the ink would break the contrast table you already measured.

**Which stop goes where is a judgement call, and it is the one product decision in this part.** Recommended default: `t1` → `--gold2`, `t2` → `--goldm`, `t3` → `--gold3`, with `--hairline`/`--rosehair`/`--panel2` derived as a low-alpha or darkened mix of `t1`. If you prefer a different mapping, ship it with the reasoning in the filing — do not ship it silently.

**The three blocks differ by mode, and that is the point.** w89's own structure has separate light / system-dark / explicit-dark remaps. Fill all three; a team's near-black primary needs a *different* gold in dark mode than in light, and that is exactly what the three-block structure exists for.

**How the council will check it:**

```
$ grep -c "var(--zpb" src/lib/assets/tokens-w89.css     # must be > 0
$ node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs   # 26/26
$ node batteries/shell.battery.mjs                      # 46/0
```

Plus **two screenshots at 1180 px in light mode, same team, one before and one after** — and the same pair for a **dark-palette team** (near-black) and a **bright-palette team** (e.g. Cardinals `#97233F`). A takeover that only shows on one team is a takeover that is half-built.

**Add a law for it.** N23 or similar: *"picking a team changes at least three accent tokens, and `--zcream` is unchanged"*. A takeover with no law is a takeover the next sitting will silently break. Write the falsifier for it too — plant a rule that reads `--zpb-t1` from the wrong team, and show the law die.

**Do not** tint `--zcream`. **Do not** change the light/dark `--text` values. **Do not** touch the contrast table's pairs — if the takeover *creates* a new failing pair, **report it, do not fix it**; that is the Owner's call, exactly as the existing gold2 failure is.

---

## 5 · Part B — the four document fixes

One commit, docs only, no code:

1. `README.md:3` — `24 laws` → **`26 laws`**.
2. `VERIFY.txt §6` — `310 entries` → **`316 entries`**, and make it the number the gate prints rather than a number written by hand (paste the gate's own line).
3. `VERIFY.txt §11` — narrow the empty-grep claim to `src/lib, src/App.svelte, batteries` and **say so explicitly that `scripts/gamelog-fixture.mjs` is the proof script and passes the option on purpose**.
4. `batteries/node.battery.mjs:379` — drop the unused `packHash` from the import in the **shipped** tree, so the prepared copy is once again exactly "the shipped tree + the five paths".
5. `SHELL-STATUS.md:28` — say what the OT workaround is and where its receipt lives, or remove the parenthetical.

**Then re-run** `node scripts/gate-manifest.mjs` and paste the number it prints into the same commit. A receipt that names a number the gate does not print is the D-3 defect; that is the whole point of this part.

---

## 6 · Part C — the pin line, and the prepared tree

- **The shipped tree stays at `5c808472`.** Do not activate the prepared re-pin.
- **`cakepanz-4-prepared/SNAPSHOT.md` is correct as written** — 68 files, byte-identical, both suites green. Leave it.
- **The gh-pages `67-cakepanz/README.md:4` and `CHECKSUMS-slice2.txt:2` should name `d3bd81d2`**, not `4ca9a071`. If gh-pages is not yours to write this sitting, file it as a §5 with the exact lines and the file-count receipt above — do not leave it for the next person to rediscover.
- **If you re-generate `MANIFEST.txt` or `CHECKSUMS.txt` for any reason, re-run `gate-manifest.mjs` in the same commit** and paste its output. F-2 happened because a number was written by hand and the tool was not re-run.

---

## 7 · Part D — the aesthetic strays

Read F-4's table. Then, in priority order:

1. **Body copy back to a system sans.** This is the most visible stray and the cheapest fix: `shell.css:13` and `tokens-w89.css:116` set `font-family: var(--font-ui)` on `body`, which makes every paragraph Cinzel. w89 uses `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` at **14 px**. Add a `--font-body` token and use it for body copy; keep `--font-ui` (Cinzel) for headings and chrome, which is where w89 puts it.
2. **The slogan.** w89 shows *"Can you go 20-0?"* with a gold shimmer on **"20-0"** (`w89:2932`, `zpb-cygline` / `zpb-shine`). The shell has none. Decide where it belongs (home/Guide/meta/title) and put it there with the shimmer. **This is a visible brand line, not a decoration** — it is the Owner's own framing of the product.
3. **Bodoni Moda and the 900 weights.** w89 loads Cinzel 700/900, Cinzel Decorative 700/900 and Bodoni Moda 500/600/700; the shell inlines Cinzel 700 and Cinzel Decorative 700 only. **Inlining more faces costs bytes** (~54 KB today for two), so this is a trade: if you add them, say what the payload becomes. **Bodoni Moda being absent is the single biggest type difference** between the wordmark and w89's. If you judge it not worth the bytes, say so with the number — a stated decision beats a silent omission.
4. **The wordmark.** "76 Pancakes" in Cinzel Decorative 800 gold vs w89's Bodoni-Moda-led brand. Fixing this follows from (3); if you do not add Bodoni Moda, at least say what the shell's wordmark *is* and why.

**What not to do:** do not "fix" the offline inlining back to a Google Fonts link (that is w89's defect, not a feature to restore). Do not change the light/dark token values. Do not touch `--text` in dark.

---

## 8 · Part E — the label questions (report, do not decide)

Three terms, none ruled:

| term | where it lives |
|---|---|
| **"Value"** | w89's pick-analysis column header (`w89:4498`) |
| **"Model Value"** | the shell: `src/lib/valuation.ts:2,11` (`MODE_LABEL.measured`), Team Select, Guide |
| **"Engine Value"** | the Owner's stated preference — **absent from the shell** |

And the two-point chip: w89's feed says **"2-Pt Conv"** (11 UI occurrences; `2PT` appears twice, once inside a base64 blob and once as a stat abbreviation). The shell's feed chips say **"2PT" / "2PT FAIL"** (`src/lib/port/feedVM.ts:100-101`), while the engine recap copy says "2-Pt Conv good/failed".

**Do not change either.** Report the three terms and where each lives, and let the Owner rule. **This is an instant-rejection item if you pick one.**

---

## 9 · What NOT to do

1. **Do not enable the pass-class node.** No `passClass`, no `passGap`, not as a default, not behind a flag, not in a test fixture that ships.
2. **Do not activate the prepared re-pin.** The shipped tree stays at `5c808472` until the Owner says otherwise.
3. **Do not edit the engine.** `src/engine/**` is the Architect's frozen snapshot. A §5 filing is the only route.
4. **Do not refit slot values.** Owner ruling, 8 Nov: slot values are outputs, never refitted.
5. **Do not decide a label.** §8.
6. **Do not decide the dark `--text` fix or the Bodoni Moda question.** Both are the Owner's; report and move on.
7. **Do not re-review Cakepanz-5.** It is reviewed.
8. **Do not let a document name a number the tool does not print.** F-2 is that failure, twice.

---

## 10 · Receipt discipline

- **Label every claim** VERIFIED / REPORTED / INFERRED / UNKNOWN. A number you did not measure is REPORTED with the name of whoever did.
- **Every gate ships with its stdout and exit code.** A gate passed without its output pasted is not a gate.
- **State your N.** This round's hardest lesson: a 12,000-key number was quoted against a 120,000-key number as if they were the same measurement. Any rate or mean you file is at **120,000 paired keys**; anything you debug at is never filed.
- **Every tool or battery you add gets a falsifier that can fail on the tool itself.** The model is the receipt falsifier's moved-anchor guard: it exits 1 with the file and the anchor named, never a green.
- **No machine-only battery.** If it only runs on your laptop because a dependency lives in a global path, it is not a receipt. `npm ci && npm run …` from a clean clone is the bar.

---

## 11 · What a good delivery looks like

**Ships:** the team takeover wired and lawwed, with two teams' screenshots; the four document fixes and the re-run gate number; the body-font and slogan strays; the pin line corrected or filed; the label questions reported with the three terms.

**Does not ship:** anything in §9.

**One commit per part**, each with its own receipt, so a reviewer can reject one without rejecting the rest. **Push after every finished part**, on your own branch only, and verify with `git ls-remote`.

**End with:** BLOCKED (who/what is needed) · OPEN (Owner decisions) · NEXT (the top 1–3 concrete actions).

---

*Filed by ernie (council) at `_agents/ernie/deliveries/zai-prompt-cakepanz-6-2026-11-17.md` on `council/ernie`. Evidence: `_agents/ernie/inbox/20261117-2241-ernie-CAKEPANZ-5-review.md`, `…-2255-ernie-w89-team-takeover-unwired.md`, `…-2257-ernie-pin-watch-deployed-tree-measurement.md`; raw receipts in `_agents/ernie/deliveries/cakepanz-5-2026-11-17/receipts-ernie/`.*