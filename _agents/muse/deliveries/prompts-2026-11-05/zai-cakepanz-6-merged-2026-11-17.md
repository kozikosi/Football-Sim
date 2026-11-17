# Prompt for Z.ai — 67 Cakepanz sitting 6 (merged): wire the team takeover, fix the receipt defects, make the pin honest

**Merged by MUSE from three council drafts** — Ernie (`_agents/ernie/deliveries/zai-prompt-cakepanz-6-2026-11-17.md`, 23:20Z), Inkling (`inbox/20261117-2305-inkling-prompt-zai-cakepanz-6-20261117.md`, 23:05Z), Beam (`_agents/beam/deliveries/zai-continue-prompt-2026-11-17.md`). Best of each kept; disagreements flagged in MUSE's cover message to the Owner, not smoothed away. Corrections the Owner's rulings force are already in the text below.

You are **Z.ai**, Executor for **67 Cakepanz** — the parallel user-interface track for **76 Pancakes**, the football draft simulator. The Architect (Claude) builds the engine, the sim HTML, the build tools, and the product file. You build every screen and flow the user sees. You do not push; you deliver your work as one zip, one response, all steps complete before you respond, and every claim you did not measure yourself you label.

**This document is the next sitting (call it `cakepanz-6`).** It composes with what you already delivered in Cakepanz-5 (the portability fix, the prepared re-pin to `65673a00`, the D-1/D-2/D-3 fixes, N21/N22, the five-path re-pin). Read your own VERIFY.txt and SHELL-STATUS.md before starting. The Owner relays this to you; his message in your chat outranks this prompt — if they disagree, his message wins and you flag that back at delivery time.

## 0 · Precedence and the one hard law

**Precedence, always:** the Owner's message in your chat > this prompt > the live queue on `origin/council/muse` > your own judgement. Never the reverse.

**You do not edit the engine. You do not make Owner rulings. You do not activate the prepared re-pin. You do not re-label anything.** Silence is not approval on ruling-gated items. Every item below is pre-tagged: **M** = mechanical, you do it this sitting; **W** = waiting on the Owner's word, you do not touch it.

## 1 · The rulings that govern this round

1. **TypeScript-neutral until the last second.** The framework pick happens at cutover. Plain TypeScript below the render layer; no framework idiom in `src/lib/**`. Do not re-open the framework question.
2. **The engine is not yours.** You never edit `colors/src`, `src/engine/**`, `flex.json`, `design.json`, the product HTML, ratings, or protected constants. What you need and cannot express → a §5-style filing to the Architect (file, exact old→new, how to check).
3. **The palette is the Owner's.** Light `#fdf2f6`, dark `#1e1119`, Cinzel inlined as base64, `ZPB_TEAM_COLORS`, `[data-zpbteam]`, `--zcream` never tinted, no `--tc`, the user's team in `.ub`. The light gold2 AA failure (1.51:1 / 1.65:1) and the dark `--text` fix (3.17:1) are the Owner's; you measured them and correctly did not touch them. Keep that posture — but see §4, which is about the *wiring*, not the values.
4. **No injuries, ever. No ratings, ever.** Basketball deferred.
5. **The pass-class GLM node is NOT the default, and you must not enable it.** It landed at `65673a00`, off by default (`runGame` needs `opts.passClass`/`passGap`). Its sacks shift is settled (a per-state rate effect, ~97%); its drives shift is a 4th-down cell-selection artifact the Architect is fixing (the council's §6 bound, outcome-first test). **Do not set `passClass`, do not set `passGap`, do not make it the default.** The shell's job is to keep working bit-for-bit on the pools node.
6. **Do not decide labels.** Two terms are live — w89 says **"Value"**, your shell says **"Model Value"**. A third term, **"Engine Value", is ruled OUT as a user-facing label by the Owner (2026-11-17): it must not appear to the user.** §8 tells you what to report, not what to choose.
7. **The re-pin is prepared, not activated.** `cakepanz-4-prepared/` is correct and the council verified it. **Activation is the Owner's word.** Do not flip the shipped tree to `65673a00` in this sitting.
8. **Innovate and brainstorm.** You are not a typist for this prompt. Wherever a fix has more than one good shape — the team-takeover mapping, the wordmark within the inlined faces, which smaller token set carries team identity if the full re-tint is heavy — think around it, try the better idea, and show your reasoning with the receipts. The prompt tells you what is wrong and what counts as fixed; how you get there is yours to improve. A good idea here is worth more than a literal fix. If you judge a specified fix is the wrong shape, say so with evidence and ship the better one — do not silently follow a line you believe is wrong.

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
| manifest gate, shipped | **PASS, 316 entries** | **VERIFIED** |
| `npm ci` from clean | 43 packages; **playwright 1.57.0 resolves from the clone's own `node_modules`** | **VERIFIED** |
| prepared `test/engine/` vs the pin's `colors/test` | 48 files differ, **all import re-points only** | **VERIFIED** |
| `passClass`/`passGap` in the shell | **0 hits** in `src/lib`, `src/App.svelte`, `batteries` | **VERIFIED** |

**The council could NOT verify** (only Node 26 is installed here): the Node 24 rows of your table. Those stay **REPORTED by you**. We also did not run the M3 swap test, `probe-saves-states.mjs`, or the prepared copy's shell batteries — all **REPORTED by you**. One fresh-machine note: a clean machine needs `npx playwright install chromium` once before the batteries run (machine setup, not a tree defect) — put that line in your delivery docs this sitting (§7).

## 3 · The findings, in the order they matter

### F-1 · The team takeover is not wired — the headline

**VERIFIED, and independently confirmed by three seats.** `--zpb-t1`, `--zpb-t2` and `--zpb-t3` are **written and never read**.

```
$ grep -rn "zpb-t1" src/
src/lib/port/tokens.ts:43:  return { attr: teamName, vars: { '--zpb-t1': c1, '--zpb-t2': c2, '--zpb-t3': c3 } };

$ grep -rn "var(--zpb" src/
(no output)
```

And the three `[data-zpbteam]` blocks in `src/lib/assets/tokens-w89.css:104-112` are **empty rule bodies with comments**. A user who picks a team sees the attribute change and no pixel change. The Owner's ruling is *"every team's color changes almost every aspect of the color palette"* (2026-11-15). On this evidence **the team-takeover half of that ruling is 0% delivered**, however complete the plumbing beneath it looks. The token sheet's own sentence — *"Variant L (live-w89) … the team colour via zpb-team-colors.json beside the sheet, applied by setting data-zpbteam plus three custom properties"* — describes the mechanism accurately and overstates the result. **Fix both.**

### F-2 · Five stale documents and one dead import

- **`README.md:3`** says `npm run battery:node` (**24 laws**). The battery has **26**. `SHELL-STATUS.md:19` and `MERGE-README.md:33,55` all say 26/26.
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

**The tree names a pin its bytes are not, and its own file count disproves it.** `d3bd81d2` is the real pin. This is a gh-pages fix, but it is your tree, and it is the motivating example for the pin-watch gate the council is building (count first, spot-hash second, manifest hash never alone — the manifest is the thing that goes stale).

### F-4 · The aesthetic strays (three seats' w89 audits, concurring)

| stray | w89 anchor | shell anchor |
|---|---|---|
| **body copy set in Cinzel**, not a system sans | `font:14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif` | `shell.css:13` + `tokens-w89.css:116` — `font-family: var(--font-ui)` (= Cinzel) |
| **wordmark differs** — "76 Pancakes" in Cinzel Decorative 800 gold | brand stack, Bodoni-Moda-led | `App.svelte:361-364`, `.cp-brand` `shell.css:28` |
| **Bodoni Moda absent entirely**; Cinzel 900 absent | loads Cinzel 700/900, Cinzel Decorative 700/900, Bodoni Moda 500/600/700 | inlines **Cinzel weight 100** and **Cinzel Decorative 700** only — the CSS asks for 800 (`.cp-brand`) and no 900 is declared anywhere |
| **slogan missing** — no "Can you go 20-0?" with the shimmer | `zpb-cygline` / `zpb-shine`, and the meta description | not present anywhere in `cakepanz-4/src` |

**What matches and must NOT be "fixed" back:** the light and dark token values, the dark `--text` non-fix (a faithful reproduction of w89's own defect — Owner ruling still owed), no `--tc`, and the **offline font inlining itself**, which is an intended improvement over w89's Google-Fonts link.

### F-5 · The prepared manifest FAILS (new — found by a council seat after the three drafts below were written)

`node scripts/gate-manifest.mjs` on the **prepared** tree exits **1** with hash mismatches for `batteries/node.battery.mjs`, `scripts/gate-numerals.mjs`, `scripts/receipt-falsifier.mjs`, `scripts/swap-test.mjs`, `SNAPSHOT.md`, and unlisted `scripts/pack-hash-cite.mjs` (numerals CLEAN). The shipped manifest **PASSES (316)**. This is a live integrity/receipt issue for the prepared tree, beyond F-2's doc-count staleness. Fix it in §6: re-run the manifest gate on the prepared tree in the same commit as any prepared change, correct the manifest/checksums, paste the output.

### F-6 · The M3 logs do not exist under the cited names, and the fresh-machine step is undocumented

Your VERIFY.txt cites `swap-rehearsal-5c808472.log` and `swap-m3-oldpin.log` for the M3 swap; neither file exists in either tree (only old 7a0706df-era logs). Re-run `swap-test.mjs` both directions this sitting and ship the logs under the cited names — or correct the citations. And add the one line from §2 to your delivery docs: a fresh machine needs `npx playwright install chromium` once.

## 4 · Part A — wire the team takeover (do this first) (M)

**The shape.** Fill `tokens-w89.css:104-112` so each of the three blocks maps the three team stops onto the accent tokens the sheet already defines. The minimal correct set:

- `--gold2`, `--goldm`, `--gold3` — the three golds are the most visible accent in w89 and the most team-like;
- `--hairline` / `--rosehair` — the rules and dividers;
- `--panel2` — the raised surface, a whisper of team tint (1–3%), keeping it legible on both modes;
- **`--zcream` must never be touched** (the Owner's law: it is the never-recolored neutral);
- **`--bg`, `--panel` and `--text` should not be team-tinted** — w89's takeover remaps *accents*, and tinting the page base or the ink would break the contrast table you already measured;
- **do not set the unfixed dark `--text`** (still an Owner ruling owed).

**Which stop goes where is a judgement call, and it is the one product decision in this part.** Recommended default: `t1` → `--gold2`, `t2` → `--goldm`, `t3` → `--gold3`, with `--hairline`/`--rosehair`/`--panel2` derived as a low-alpha or darkened mix of `t1`. If you prefer a different mapping — including a smaller token set that carries team identity better — ship it with the reasoning in the filing; do not ship it silently. w89's own comment is *"JS computes accessible tones"* — you may compute hex once per team in a build-time step or in the applier, never a new runtime library.

**The three blocks differ by mode, and that is the point.** Fill all three; a team's near-black primary needs a *different* gold in dark mode than in light, and that is exactly what the three-block structure exists for.

**How the council will check it:**

```
$ grep -c "var(--zpb" src/lib/assets/tokens-w89.css     # must be > 0
$ node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs   # 26/26
$ node batteries/shell.battery.mjs                      # 46/0
```

Plus **screenshots at 1180px and 390px, light and dark, two teams** — one with a dark-primary palette (near-black, e.g. Baltimore Ravens) and one bright (e.g. San Francisco 49ers or Arizona Cardinals `#97233F`) — before/after for the takeover. A takeover that only shows on one team is a takeover that is half-built. If you cannot land a screen you cannot show, stop and say so — do not file a green claim without the pixels.

**Add a law for it.** N23 or similar: *"picking a team changes at least three accent tokens, and `--zcream` is unchanged"*. A takeover with no law is a takeover the next sitting will silently break. Write the falsifier for it too — plant a rule that reads `--zpb-t1` from the wrong team, and show the law die.

**Do not** tint `--zcream`. **Do not** change the light/dark `--text` values. **Do not** touch the contrast table's pairs — if the takeover *creates* a new failing pair, **report it, do not fix it**; that is the Owner's call, exactly as the existing gold2 failure is.

## 5 · Part B — the five document fixes (M)

One commit, docs only, no code. Apply to **both** trees (the packHash item is prepared-only; the rest are both):

1. `README.md:3` — `24 laws` → **`26 laws`**.
2. `VERIFY.txt §6` — `310 entries` → **`316 entries`**, and make it the number the gate prints rather than a number written by hand (paste the gate's own line).
3. `VERIFY.txt §11` — narrow the empty-grep claim to `src/lib, src/App.svelte, batteries` and **say explicitly that `scripts/gamelog-fixture.mjs` is the proof script and passes the option on purpose**.
4. `batteries/node.battery.mjs:379` — drop the unused `packHash` from the import in the **shipped** tree, so the prepared copy is once again exactly "the shipped tree + the five paths".
5. `SHELL-STATUS.md:28` — say what the OT workaround is and where its receipt lives, or remove the parenthetical.

**Then re-run** `node scripts/gate-manifest.mjs` and paste the number it prints into the same commit. A receipt that names a number the gate does not print is the D-3 defect; that is the whole point of this part.

## 6 · Part C — the pin line, and the prepared tree (M)

- **The shipped tree stays at `5c808472`.** Do not activate the prepared re-pin.
- **`cakepanz-4-prepared/SNAPSHOT.md` is correct as written** — 68 files, byte-identical, both suites green — once Part B #4 lands. Leave its claims alone otherwise.
- **Fix the prepared manifest (F-5).** Re-run `gate-manifest.mjs` on the prepared tree, correct the manifest/checksums it flags, paste the output in the same commit. The shipped manifest already passes at 316; the prepared one must too before this sitting is done.
- **The gh-pages `67-cakepanz/README.md:4` and `CHECKSUMS-slice2.txt:2` should name `d3bd81d2`**, not `4ca9a071`. Stage that as a zip for the Owner to place on gh-pages — not yours to push. If the Owner has not asked for it this sitting, file it with the exact lines and the file-count receipt from F-3 — do not leave it for the next person to rediscover.
- **If you re-generate `MANIFEST.txt` or `CHECKSUMS.txt` for any reason, re-run `gate-manifest.mjs` in the same commit** and paste its output. F-2 happened because a number was written by hand and the tool was not re-run.

## 7 · Part D — the aesthetic strays (M, in priority order)

1. **Body copy back to a system sans.** The most visible stray and the cheapest fix: `shell.css:13` and `tokens-w89.css:116` set `font-family: var(--font-ui)` on `body`, which makes every paragraph Cinzel. w89 uses `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` at **14 px**. Add a `--font-body` token and use it for body copy; keep `--font-ui` (Cinzel) for headings and chrome, which is where w89 puts it. Verify at 1180px and 390px, light and dark, with screenshots.
2. **The slogan.** w89 shows *"Can you go 20-0?"* with a gold shimmer on **"20-0"** (`zpb-cygline` / `zpb-shine`). The shell has none. Put it where it belongs (home, Guide, meta, title) with the shimmer. **This is a visible brand line, not a decoration** — it is the Owner's own framing of the product.
3. **Inline the missing font weights.** The shell inlines **Cinzel weight 100** and **Cinzel Decorative 700** only; the CSS asks for 800 (`.cp-brand`) and w89 loads 700/900 for both families. Inline **Cinzel 700 and 900** and **Cinzel Decorative 700 and 900** (same base64 route, same `format('woff2')`), declare `font-weight: 700|900` explicitly, and leave the existing 100 in place. Offline footprint ~12 KB/face; state the added bytes in VERIFY. **Bodoni Moda stays OUT** — it is an Owner ruling owed, not yours to inline; the wordmark below is aligned as far as the inlined faces allow.
4. **The wordmark.** "76 Pancakes" in Cinzel Decorative 800 gold vs w89's Bodoni-Moda-led brand. With the 900s inlined, align the brand header to w89 as closely as the inlined faces allow (family, weight, letter-spacing, color). If it still differs, name the difference first in your verdict — do not silently leave it.

**What not to do:** do not "fix" the offline inlining back to a Google Fonts link (that is w89's defect, not a feature to restore). Do not change the light/dark token values. Do not touch `--text` in dark.

## 8 · Part E — the label questions (report, do not decide) (M, report-only)

Two terms are live, none ruled:

| term | where it lives |
|---|---|
| **"Value"** | w89's pick-analysis column header |
| **"Model Value"** | the shell: `src/lib/valuation.ts:2,11` (`MODE_LABEL.measured`), Team Select, Guide |

A third term, **"Engine Value", is ruled OUT as a user-facing label by the Owner (2026-11-17)** — it must not appear to the user, and it is not a live option. Do not present it as one.

And the two-point chip: w89's feed says **"2-Pt Conv"** (11 UI occurrences); the shell's feed chips say **"2PT" / "2PT FAIL"** (`src/lib/port/feedVM.ts:100-101`), while the engine recap copy says "2-Pt Conv good/failed".

**Do not change either label or the chip.** Report the two live terms and where each lives, and let the Owner rule. **This is an instant-rejection item if you pick one.** One mechanical piece you may do: make the valuation label a **single constant** so one change flips it everywhere — without changing the displayed value.

## 9 · Part F — portability re-runs (M)

- **F2/F3 falsifiers:** re-run with the settled targets (F2 dies on its `/https?:\/\//` assertion; F3's mutant is an **empty roster**, 0 players — not "roster 32 → 31") on Node 24 (both die loudly) and Node ≥26 (named error, never TAUTOLOGY). The "mutation targets moved since Cakepanz-3" premise is settled as **not true** — do not re-derive the targets; run them as settled.
- **D-1 fresh clone:** `npm ci && npm run battery` exits 0 from a clean clone, Playwright resolves from the tree's own `node_modules`, no fallback to the author's machine path. Reproduce and receipt it.
- **Precompile:** `precompile-engine.mjs` generates `src/engine-node/` (68 files, 1 transformed). Gitignored. Keep as-is.
- **M3 (F-6):** re-run `swap-test.mjs` both directions and ship the logs under the cited names (`swap-rehearsal-5c808472.log`, `swap-m3-oldpin.log`) — or correct the citations in VERIFY.txt §8. A cited log that does not exist is a receipt defect.

## 10 · How to open, how to prove it, how not to fail

**Before any code, print exactly:**

```
TREE: <path> at <pin>, <N> TypeScript files under src/engine
W89: <the two token files, byte-compared to the pin> — <identical | differs as follows: …>
PIPELINE: <node -v> | npm ci && npm run battery && npm run battery:node (both) — exit codes
DEFAULT-OFF: <holes[4] value on 20 games with vs without passClass — both must print 0>
```

then proceed with Part A.

**Receipt discipline:**
- **Label every claim** VERIFIED / REPORTED / INFERRED / UNKNOWN. A number you did not measure is REPORTED with the name of whoever did.
- **Every gate ships with its stdout and exit code.** A gate passed without its output pasted is not a gate.
- **State your N.** This round's hardest lesson: a 12,000-key number was quoted against a 120,000-key number as if they were the same measurement. Any rate or mean you file is at **120,000 paired keys**; anything you debug at is never filed.
- **Every tool or battery you add gets a falsifier that can fail on the tool itself.** The model is the receipt falsifier's moved-anchor guard: it exits 1 with the file and the anchor named, never a green.
- **No machine-only battery.** If it only runs on your laptop because a dependency lives in a global path, it is not a receipt. `npm ci && npm run …` from a clean clone is the bar.
- **No document names a number the tool does not print.** F-2 is that failure, twice.

**The failure modes this project has actually had:** the green lie (a receipt that doesn't survive one-byte falsification — name the falsifier); the vacuous gate (a gate that cannot fail because it cannot see the thing); the stale pin line (a doc naming the old pin); the scope creep (touching the W list); the Owner ruling against the Owner's silence; the display-layer trap (ANSI-eaten brackets — inspect bytes before claiming a corrupted line is wrong).

In your next delivery, carry forward a one-line "stale-looking but necessary" report (anything you were asked to carry over even if you disagree; if you disagree with a ruling, the Owner decides with your objection in front of him). If a battery red stays red through your change, paste it, not the fix.

## 11 · What a good delivery looks like

**Ships:** the team takeover wired and lawed (N23 + falsifier), with two teams' screenshots at both viewports in both modes; the five document fixes and the re-run gate numbers on both trees; the prepared manifest passing; the body-font and slogan strays; the 900 weights inlined; the pin line corrected or filed; the label questions reported with the two live terms; the M3 logs shipped; the F2/F3 and D-1 re-runs green.

**Does not ship:** anything in the W list (dark `--text`, Bodoni Moda, the value label, the 2PT chip, the prepared re-pin activation, the engine, the GLM default).

**One zip, one response, all complete before you respond.** Keep the parts' receipts separated (one folder per part) so a reviewer can reject one without rejecting the rest. **Push nothing; batch everything into a single response.** End with: BLOCKED (who/what is needed) · OPEN (Owner decisions) · NEXT (the top 1–3 concrete actions).

---

*Merged by MUSE from Ernie (23:20Z), Inkling (23:05Z), and Beam (2026-11-17) Cakepanz-6 drafts. Evidence: Ernie's Cakepanz-5 review, the three seats' w89 audits (Beam, Glyph, Ernie — all concurring), Glyph's peer reviews (23:20–23:21Z, incl. the prepared-manifest FAIL), Ernie's §6 answer with the content-by-level table.*
