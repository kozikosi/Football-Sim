PROMPT — Z.ai · 67 Cakepanz · "re-pin to the Architect's engine, and close the last verification gaps"

---

## 0 · How to read this

Self-contained: every term is defined where it first appears, every claim is labelled with how it was produced, every check has a command. **VERIFIED** = the council ran it and the receipt is in this prompt or in the council's lane. **REPORTED** = someone else ran it and is named. **INFERRED** = reasoning, not a measurement. **UNKNOWN** = not known.

**67 Cakepanz** is the UI/UX shell of **76 Pancakes**, a football draft simulator: a user drafts a team of real NFL players, then plays a season against the other 31 teams. **The shell** is what the user sees — screens, flows, save system, shareables. **The engine** is the code in `colors/` that simulates drafts, games and seasons. Claude is the **Architect**: he owns the engine and the product file. You own the shell. When the engine is done, he merges it into your shell, and your job is to make that merge a **wiring task**, not a port.

Your last delivery — **`cakepanz 3`**, 290 files, engine pinned at **`d3bd81d2`** — was reviewed by the council on 2026-11-17 and is the best state the shell has been in. This round has **one central task** (re-pin to the Architect's current engine, which has moved a long way) and **a short list of verification gaps** that only you can close.

---

## 1 · The rulings that govern this round

**1. TypeScript-neutral until the last second.** The framework pick — Vue 3 vs Svelte 5 — happens at cutover. Build in plain TypeScript below the render layer; Svelte 5 is the render layer of this tree and that is allowed, but no framework idiom may leak into `src/lib/**`. Do not re-open the framework question and do not port from the fresh-start arms.

**2. The engine is not yours.** You never edit `colors/src`, `src/engine/**` (the vendored snapshot), `flex.json`, `flex.ts`, `slots.ts`, ratings, or protected constants. If the shell needs something the engine does not express, that is a **§5 filing** — the file, the exact old→new, and how to check it — for the Architect. You never re-pin *on your own initiative*… **except that this prompt is the initiative**: the Owner has asked for this re-pin, so it is authorised, and it is the one re-pin you may make this round. You never push a gh-pages wave, never generate ratings.

**3. The gap is closed by Owner ruling — do not touch it.** *"Let's leave the gap for now. 4-3 is more popular. I just want 3-4 to be better in scenarios where a bad dt2 is left on the draft board and there are many good linebackers."* The council verified this is already true (VERIFIED): with a weak DT class the 3-4's case improves (league mean +1145 → −95), and with a strong linebacker class **all 32 clubs** are better in a 3-4. Do not re-price the flex table, do not re-rate ILB2, do not "fix" the gap.

**4. The palette is the Owner's.** Light `#fdf2f6`, dark `#1e1119`, Cinzel inlined as base64, `ZPB_TEAM_COLORS`, `[data-zpbteam]`, `--zcream` never tinted, no `--tc`, the user's team in `.ub`. Two questions are the Owner's and you must not decide them: the light gold2 AA failure and the dark `--text` fix. Flag them.

**5. No injuries, ever. No ratings, ever.** Basketball deferred.

---

## 2 · Ground truth — what the council verified in `cakepanz 3`

Re-run by the council on 2026-11-17 from the hosted copy at `_agents/ernie/deliveries/zai-cakepanz-3-2026-11-17/` (290 files, commit `1283f076`).

| claim | council re-run | verdict |
|---|---|---|
| engine tests 323/323 | `npm run test:engine` → **323 · pass 323 · fail 0** | **VERIFIED** |
| battery 26/0/10/3 | `CP_PORT=4191 node batteries/slice1.battery.mjs` → **exit 0, 26 pass · 0 fail · 10 skip · 3 defer** | **VERIFIED** |
| builds | `npm run build` → exit 0, 221 modules, 808 ms | **VERIFIED** |
| bundle | JS 377.12 kB (gz **128.13**), CSS 83.32 kB (gz **47.96**) | measured |
| `distfile` → one file | `dist/single.html` **450.0 KB**, "no external refs: true" | **VERIFIED** |
| **`file://` boots** | Playwright over `file://`: rendered "76 Pancakes · 67 CAKEPANZ", **0 page errors, 0 console errors, 0 network requests** | **VERIFIED** |
| M1 one door | `grep -rln "engine/" src --exclude-dir=engine --exclude-dir=port` → **0 files** | **VERIFIED** |
| M5 thin seam | **27** lines touch engine types (was 37, was 76) | **VERIFIED** |
| pin `d3bd81d2` | 57 files under `src/engine/` | **VERIFIED** |

**Three of the four defects from the previous review are fixed** — `App.svelte:63` is now `$state(0)` and the `non_reactive_update` warning is gone; `savesApp.ts` no longer contains the hard-coded `22`; `Settings.svelte` uses `<label for=…>` and the a11y label warning is gone.

**The fourth was my error, and I retracted it.** The `$app/tsconfig` warning comes from **`/Users/kosi/tsconfig.json`** — the Owner's own home file, which has `"extends": "$app/tsconfig"` at line 2. Vite walks up and finds it. **Your `tsconfig.json` is clean. Do not change it for this.** If the warning bothers the build log, it is the Owner's file, not your tree.

**The node batteries.** The council confirmed the root cause you documented (a TypeScript **parameter property** at `src/engine/platform/localstorage.ts:31`, which strip-only mode cannot parse) and accepted the resolution: `SNAPSHOT.md:44-57` states it, **pins Node v24.22.3**, names the three routes, and says a §5 was filed. That is the right answer. **Both** `battery:node` and `shell.battery.mjs` fail on node 26 with the identical error, so on a current node the runnable checks are the slice-1 browser battery and `test:engine`.

---

## 3 · What has changed in the engine — and why it matters to you

The shell is pinned at **`d3bd81d2`**. The Architect's branch `architect/engine-and-seats` is now at **`5c808472`**. That is a large delta, and four of the changes land directly on surfaces the shell renders.

| commit | what landed | why the shell cares |
|---|---|---|
| `7a0706df` | the **value layer** (P-318): a `ValueProvider` with *measured* slot values | changes what every `wins` / priority number means on the board |
| `9c3a7701` | **six flex rules 0 → 2** (EDGE→DT, ILB→OLB, CB→FS, EDGE→OLB, OT→OG, CB→SS; SS→NICKEL stays 0) | changes the flex chips and the "fits" marks on every row |
| `a062597f` | **derived priorities** (ILLEGAL / PLAYS / EMERGENCY computed per call, not literals) | changes emergency/fill behaviour at the margins |
| `fe611cbd` | **OT clock fix** + FB→TE 6→2 + lineup-test rewrite | changes the OT block's clock string and the FB→TE chip |
| `39a91a43` | **the product pack** baked to JSON (`data/packs/nfl-pools-fit2023-2025.json`, 2,990,032 B) | the sim reads a pack from `data/`, **outside** `colors/src` — see §4 |
| `db33bfa0` | **the portable cosine** (`pcos2pi`/`psin2pi` in `core/pmath.ts`) | removes the platform drift that made the shell's node tests non-reproducible |
| `5c808472` | **pooled-node conformance** (the lab's own `Pack` as oracle) | the sim's play-pool path now has vectors; a change here can move outcomes |

**The landmine, measured by the council (VERIFIED on the previous tree, same value layer).** When the engine moved to `7a0706df`, the board's **flex surface collapsed**: rows with flex options went from **50 of 60 to 12 of 60**, and total flex chips from **347 to 18** — and the battery's flex-chip law failed with *"14 pickers probed · 0 flex chips"*. That is the engine's behaviour under the value layer, not a shell bug. **Expect the same class of failure on this re-pin**, compounded by the six rules at 2. See §5.3 for the protocol.

---

## 4 · Step 0 — inventory and the pin (do this before anything else)

1. **State the tree you are working in.** There are now four Cakepanz trees across four branches. List, in your delivery note, what *this* tree builds and what it does not, screen by screen.
2. **Verify the current pin before you move it:**

```
diff -rq src/engine <(git archive d3bd81d2 colors/src | tar -x -C /tmp/x)
```

It must be silent. If it is not, stop and say so.
3. **Enumerate what the new pin needs beyond `src/engine/`.** This is the part that bites. The council's earlier re-pin measurement found that a re-pin is **three directories**, not one — `src/engine/`, `tools/mathlab/`, `test/` — and this engine adds a **fourth**:

| path | why |
|---|---|
| `src/engine/` | the snapshot itself |
| `tools/mathlab/` | `flex.json` (now the 99-rule table), `design.json` — the engine tests read them |
| `test/` | the Architect's suite, re-pointed at the snapshot |
| **`data/packs/*.json`** | **new** — `nfl-pools-fit2023-2025.json` (2,990,032 B) and `nfl-pools-fit2016-2022.json` (4,620,150 B). `colors/src/main.ts` loads the current-era pack, so the sim needs it at runtime |

**Do not guess the fourth path.** Check whether `colors/src/main.ts` (or whatever the shell's entry calls) resolves the pack by fetch, by import, or by an injected loader, and make the shell ship the file the way the engine expects. If the pack is required and you do not ship it, the sim will run with an empty or missing pool and the season surfaces will be wrong in a way no battery law catches.

---

## 5 · Step 1 — the re-pin (the central task)

### 5.1 The mechanics

```
git fetch --depth 50 origin architect/engine-and-seats
git archive 5c808472 colors/src   | tar -x --strip-components=1 -C src/engine
git archive 5c808472 colors/test  | tar -x --strip-components=2 -C /tmp/ct
python3 scripts/sync_engine_tests.py            # re-points imports
git archive 5c808472 tools/mathlab | tar -x --strip-components=1 -C tools/mathlab
# plus: the pack files from 5c808472:data/packs/
npm run test:engine && npm run distfile && npm run battery
```

(If your tree already has a different re-pin script, use it — but say which, and make sure it moves **all four** paths, not three.)

### 5.2 What "done" looks like

- `diff -rq src/engine <colors/src@5c808472>` → **0 differences**.
- `npm run test:engine` → green (the Architect's suite, re-pointed).
- `npm run build` → exit 0.
- `npm run battery` → green, **or** a named law failure you have diagnosed (§5.3).
- `npm run distfile` → single file, no external refs.
- `diff -rq` against the pre-re-pin tree outside the four paths → **nothing**.

### 5.3 The protocol when a law fails (this is the important part)

A red law on a re-pin is **information**, not an obstacle. The council's rule, and yours:

1. **Name the law and the pin.** Paste the failure verbatim.
2. **Diagnose, do not edit.** Is it (a) the engine's behaviour changed, (b) the shell's expectation is now wrong, or (c) a genuine regression? The council's earlier example: the flex-chip law failed because the *engine's* flex surface collapsed under the value layer — (a), not (c).
3. **Measure the mechanism**, the way the council did: count the rows with flex options and the total chips before and after, node-side, on the same draft and seed. If the count collapses, say so with the numbers — that turns a red law into a product finding.
4. **File it.** A §5 to the Architect for (a), a shell fix for (b), a bug report for (c). **Never edit the law to make it pass, and never edit the snapshot.**
5. **Then decide whether to ship.** A re-pin that leaves one law red for a diagnosed engine-behaviour reason is shippable *if the note says so in plain words*. A re-pin that leaves a law red without a diagnosis is not.

### 5.4 The specific things to check after the re-pin

| check | why |
|---|---|
| the board's flex chips render and are *fewer* than before | the value layer + six rules at 2 will move them; a *collapse* is the finding |
| `wins` / priority numbers are on the new measured scale | `lineup.ts` now uses a `ValueProvider`; the shell must not re-derive them |
| the OT block prints `OT mm:ss` | `gameView.ts:18` — `` `OT ${mmss(t-3600)}` `` |
| FB→TE shows as a 2-cost chip | `fit('FB','TE') === 2` |
| the sim boots with a real pack, not an empty pool | the new `data/packs/` dependency |
| `npm run battery` law count is unchanged or explained | a law that silently disappears is a scope cut |

---

## 6 · Step 2 — close the verification gaps only you can close

These are small, and they are the difference between "the author says it works" and "anyone can check it".

### 6.1 390 px across **all twelve** screens

The council verified the **entry screen** is clean (`scrollWidth 390 == clientWidth 390`, zero page errors). It has **not** walked the other eleven. Produce a table, one row per screen:

```
screen · scrollWidth · clientWidth · page errors
```

Any overflow is a defect. The previous tree had a 54 px overflow on the board caused by a seven-column grid with no `@media` rule (`BoardRow.svelte`), so check the board, the season hub, the week view, standings, the bracket, awards, review, the guide, the feed, saves, and settings.

### 6.2 Run both node batteries on Node 24 and paste the receipts

You documented Node **v24.22.3** as the supported version. The council could not verify that (no node 24 on the reviewing machine). Paste:

```
node --experimental-transform-types batteries/node.battery.mjs
node --experimental-transform-types batteries/shell.battery.mjs
```

with the exact versions (`node --version`) and the pass counts. If either has a law that cannot run, say which and why.

### 6.3 The new a11y warning

`npm run build` now prints `a11y_no_noninteractive_tabindex`. One attribute on a non-interactive element. Fix it or justify it in one line.

### 6.4 The states, receipted

For every screen: loading · empty · no-save · corrupt-save · newer-build refusal · reduced-motion · offline · `file://`. The council verified `file://` boots clean on the **empty** state; the other states are yours to receipt. Corrupt-save must be **refused, never repaired**.

---

## 7 · Step 3 — the handoff, verified rather than written

You already have `MERGE-README.md`, `MERGE-GUIDE.md`, `SHELL-STATUS.md`, `SNAPSHOT.md`, `VERIFY.txt`. The remaining work is to make them *walkable by someone else*:

1. **Update `SNAPSHOT.md` for the new pin** — the four paths, the pack files, the new file count and hashes, and the one-line re-pin.
2. **Walk `MERGE-GUIDE.md` yourself as a stranger.** Follow its "swap fixture adapter → real engine" section literally, on a clean extract. If you get stuck, the guide is wrong, not you.
3. **`SHELL-STATUS.md` must have no "DONE" without a receipt that runs.** The node laws are the known gap (§6.2); if any other line is in that position, say so.
4. **Re-measure M5** (lines of app code touching engine types) and publish the new number. It was 27 at `d3bd81d2`.

---

## 8 · Step 4 — prove it

A receipt per screen: a battery run, a probe, or a screenshot hash — not prose. The battery must pass on vanilla `file://`. The gates must pass (`CHECKSUMS.txt`, `MANIFEST.txt`, the numerals gate).

**Every receipt carries a one-byte falsifier** where a receipt can be faked: mutate one input byte in a throwaway copy and show the command fails.

**Every law must be able to fail.** For each new law, break what it guards and show it dies. Report survivors — a law that stays green when its guard is broken is a tautology and must be named.

If a screen cannot be proven yet, say so plainly and name the blocker. Do not claim it.

---

## 9 · The 3-4 surface — propose, do not ship

The Owner's condition is met by the engine (VERIFIED). The shell does not say it. A user who wants a 3-4 has no way to know that it is a **linebacker-conversion base** — that it turns linebacker depth into a 300-weight spot and does not need a premium second tackle.

One line on Team Select when a 3-4 is chosen, in the Owner's plain-informative style:

> *A 3-4 turns linebacker depth into a starting spot and does not need a premium second tackle.*

**Propose it in the delivery note; do not ship it as settled copy.** Do not print a number to justify it, and do not re-price anything.

---

## 10 · What you may touch, and what you may not

**May:** your tree and deliveries · new files in your lane (`_agents/zai/inbox/…`) · the shared framework-neutral layer · §5 filings for anything in `colors/` or the engine · **this authorised re-pin**.

**May not:** `colors/` · the engine · `flex.json` · `design.json` · the product HTML · another seat's bytes · `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, the queue · ratings. You do not edit the snapshot to make a screen easier. You do not decide Owner questions (the framework pick, the palette, the gap, the cutover trigger). No new specification decided by you alone.

---

## 11 · Delivery

You cannot push. Complete all work before responding and batch it into a single zip. Do not respond with work outstanding — the only reason is a blocker, and then you say what it is.

Deliver with `CHECKSUMS.txt`, `MANIFEST.txt`, `gate-manifest.mjs PASS`, numerals gate `CLEAN` ×2, batteries green (or diagnosed red), and `VERIFY.txt` — every number labelled VERIFIED / REPORTED / INFERRED / UNKNOWN.

One file per slice: `_agents/zai/inbox/<UTC>-zai-cakepanz-slice<N>.md`, first line `SPEAKER: zai | ROLE: … | TASK: … | DATE: <UTC>`, then `FOR: R-13`.

---

## 12 · Innovation

Two places where an idea is worth more than compliance:

1. **Make the re-pin repeatable.** A one-command script that takes an engine commit, re-vendors **all four paths**, runs `test:engine` + `distfile` + `battery`, and prints PASS/FAIL with `diff -rq` outside the vendored paths — committed in `scripts/`, documented in `SNAPSHOT.md`. The council measured that a re-pin is four directories, not one; a script that knows that is worth more than any single screen. If you build it, falsify it (break one byte, show it fails).
2. **A law for the pack.** The pack is now a runtime dependency outside `colors/src`, and nothing in the battery proves the shell ships a pack that loads. A law that asserts "the sim boots with a non-empty pool and the current-era pack's hash is <expected>" would catch the failure mode where the season runs on an empty pool and every law still passes.

---

## 13 · Feel journal

Update `feel-journal.md`: what was easy, what fought you, what you would change. Since the framework question is now about you, say specifically **which parts of the shell felt fastest in plain TypeScript and which made you miss a framework** — name them. Do not turn it into a comparison.

---

## 14 · If you get stuck

- **The engine lacks something the shell needs:** §5 to the Architect. Do not copy engine code into the shell.
- **A law fails on the new pin:** name it, diagnose it (§5.3), file it. Do not edit it.
- **The pack does not resolve:** say which path the entry point expects, what you shipped, and what the failure looked like.
- **An Owner question blocks you:** choose a safe reversible default, implement behind the contract, flag it.
- **A check needs a tool you lack:** say so, name what was not checked, label the claim UNKNOWN.

**Never** edit the snapshot. **Never** ship a stand-in as if it were real — label it `STAND-IN`, name the real call it replaces, list it in the delivery note. **Never** edit a law to make it pass.