PROMPT — Z.ai · 67 Cakepanz · "make the node suites portable, re-pin when the Owner says, and close the handoff"

---

## 0 · How to read this

Self-contained: every term is defined where it first appears, every claim is labelled with how it was produced, every check has a command. **VERIFIED** = the council ran it and the receipt is in this prompt or the council's lane. **REPORTED** = someone else ran it and is named. **INFERRED** = reasoning, not a measurement. **UNKNOWN** = not known.

**67 Cakepanz** is the UI/UX shell of **76 Pancakes**, a football draft simulator. **The shell** is what the user sees. **The engine** is the code in `colors/`. Claude is the **Architect**; you own the shell; your job is to make his merge a **wiring task**, not a port.

Your last delivery — **`cakepanz-4`**, 327 files, engine pinned at **`5c808472`** — was reviewed by the council on 2026-11-17. **It is the strongest delivery the shell has had**: the re-pin is byte-exact, all four vendored paths moved, the Architect's suite is 394/394, the browser battery is 29/0/10/3, the single-file build boots from `file://` with zero errors and zero requests, and the 390 px walk is receipted across screens. This round is not a rebuild. It is **one portability fix, one re-pin prepared but not shipped, and the remaining handoff receipts**.

---

## 1 · The rulings that govern this round

**1. TypeScript-neutral until the last second.** The framework pick happens at cutover. Plain TypeScript below the render layer; no framework idiom in `src/lib/**`. Do not re-open the framework question.

**2. The engine is not yours.** You never edit `colors/src`, `src/engine/**`, `flex.json`, `design.json`, the product HTML, ratings, or protected constants. What you need and cannot express → **§5 filing** to the Architect (file, exact old→new, how to check).

**3. The gap is closed by Owner ruling — do not touch it.** *"Let's leave the gap for now. 4-3 is more popular. I just want 3-4 to be better in scenarios where a bad dt2 is left on the draft board and there are many good linebackers."* The council verified it is already true (VERIFIED). Do not re-price, do not re-rate ILB2.

**4. The palette is the Owner's.** Light `#fdf2f6`, dark `#1e1119`, Cinzel inlined as base64, `ZPB_TEAM_COLORS`, `[data-zpbteam]`, `--zcream` never tinted, no `--tc`, the user's team in `.ub`. The light gold2 AA failure and the dark `--text` fix are the Owner's; you measured them (1.51:1 / 1.65:1 and 3.17:1) and correctly did not touch them. Keep that posture.

**5. No injuries, ever. No ratings, ever.** Basketball deferred.

**6. The pass-class GLM node is NOT the default, and you must not enable it.** The Architect landed it at `65673a00`, off by default (`runGame` needs `opts.passClass`/`passGap`). It is under council verification right now (the sacks/drives shift, −1.7% sacks at z −3.0 and −1.1% drives at z −6.4, is unexplained). **Do not set `passClass`, do not set `passGap`, do not make it the default.** The shell's job is to keep working bit-for-bit on the pools node until the Owner rules.

---

## 2 · Ground truth — what the council verified in `cakepanz-4`

Re-run on 2026-11-17 from `_agents/ernie/deliveries/zai-cakepanz-4-2026-11-17/` (327 files, commit `8fa12ce8`).

| claim | council re-run | verdict |
|---|---|---|
| pin `5c808472`, 67 files | `diff -rq src/engine <colors/src@5c808472>` → **0 differences** | **VERIFIED** |
| four paths moved | `src/engine/` · `test/` · `tools/mathlab/` · **`data/packs/*.json`** | **VERIFIED** |
| flex table travelled | 99 rules, **17/17/42/23** at 0/2/6/12 | **VERIFIED** |
| `npm run test:engine` | **394 · pass 394 · fail 0** | **VERIFIED** |
| `npm run build` | exit 0, 671 ms, no `non_reactive_update`, no a11y warnings | **VERIFIED** |
| `npm run battery` | **exit 0, 29 pass · 0 fail · 10 skip · 3 defer** | **VERIFIED** |
| `npm run distfile` | `dist/single.html` **450.8 KB**, "no external refs: true" | **VERIFIED** |
| **`file://` boot** | **0 page errors, 0 console errors, 0 network requests** | **VERIFIED** |
| M1 one door | **0** real importers outside `src/lib/port/` | **VERIFIED** |
| 390 px across screens | `S25 390px clean on <screen> — 390/390` for team, cards, hub, week, standings, bracket, awards | **VERIFIED as a receipt** |

**Bundle:** JS 377.95 kB (gz 128.64), CSS 83.31 kB (gz 47.96).

**The four previous defects are all closed:** `$state(0)`, no hard-coded `22`, `<label for=…>`, and the `a11y_no_noninteractive_tabindex` warning is gone. The `$app/tsconfig` warning is **not yours** — it comes from `/Users/kosi/tsconfig.json`, the Owner's home file. Do not touch your `tsconfig.json` for it.

**One correction the council made to itself, on the record:** last round the council warned that a re-pin would break the flex-chip law, because on the *previous* tree at the *intermediate* commit `7a0706df` the board's flex surface collapsed (rows with flex options 50/60 → 12/60). On this re-pin the law **passes** 29/29. The warning was measured on a different tree at an earlier commit and **does not reproduce here**. Do not design around it.

---

## 3 · The one real engineering gap: the node suites are not portable

This is the highest-value item in the round, because it is the only thing standing between "the author says the season surfaces work" and "anyone can check them".

**The situation.** Two of your four suites import the port node-side, and the engine snapshot carries a TypeScript **parameter property** at `src/engine/platform/localstorage.ts:31`:

```ts
export class LocalStorageModule implements StorageModule {
  constructor(private readonly ls: Storage | null, private readonly o: LocalStorageOptions = {}) {}
```

Strip-only mode (Node 22.6+ / 23+ / 24 / 26 without the transform flag) **cannot parse it**: `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`. `--experimental-transform-types` existed in Node 22.7–24 and is **gone in Node 26**. So:

| suite | Node 24 | Node 26 |
|---|---|---|
| `npm run battery` (browser, slice-1) | runs | **runs** |
| `npm run test:engine` | runs | **runs** |
| `npm run battery:node` (24 laws) | runs (documented) | **fails** |
| `node batteries/shell.battery.mjs` (46 laws) | runs (documented) | **fails** |

You documented this in `SNAPSHOT.md:44-57`, pinned Node v24.22.3, named the three routes, and filed the §5. That was the right call and the council accepted it. **But it leaves the season surfaces verifiable only by someone who happens to have Node 24 installed** — and Node 26 is what a reviewer has.

**What I am asking for now: route 2, done properly.** Precompile the snapshot's parameter property into a **generated copy outside `src/engine/`**, so both node suites run on any Node:

1. Add a build step (e.g. `scripts/precompile-engine.mjs`) that reads `src/engine/platform/localstorage.ts` and emits a transformed copy into a generated directory (e.g. `src/engine-node/`), replacing the one parameter property with explicit fields:
   ```ts
   export class LocalStorageModule implements StorageModule {
     private readonly ls: Storage | null;
     private readonly o: LocalStorageOptions;
     constructor(ls: Storage | null, o: LocalStorageOptions = {}) { this.ls = ls; this.o = o; }
   ```
2. The node suites import from the generated copy, not from `src/engine/`. **The snapshot itself is never edited** — `diff -rq` against the pin must stay 0.
3. Both suites must run on **Node 26** and on **Node 24** with the same result.
4. The generated directory is a **build artifact**: gitignored, produced by `npm run build`/a pretest hook, never committed.

**Why this is the right fix and not route 3.** A §5 to the Architect (replace the parameter property with explicit fields) is cleaner but it is *his* file and it is *his* call; route 2 needs no engine change, cannot drift from the pin, and is reversible. If the Architect later takes route 3, the precompile step becomes a no-op and can be deleted.

**The acceptance test:** on Node 26, from a clean extract,
```
node --experimental-strip-types batteries/node.battery.mjs     -> exit 0, 24 pass
node --experimental-strip-types batteries/shell.battery.mjs    -> exit 0, 46 pass
```
and `git status` shows no change under `src/engine/`.

---

## 4 · Step 0 — inventory and the pin

1. **State the tree you are working in.** There are now four Cakepanz trees across four branches (gh-pages slices 1–2, the s5 delivery, cakepanz-3, and this one). List what *this* tree builds, screen by screen, in the delivery note.
2. **Verify the current pin before you touch anything:**
   ```
   diff -rq src/engine <(git archive 5c808472 colors/src | tar -x -C /tmp/x)
   ```
   Must be silent.
3. **Know the five paths a re-pin touches.** The council measured this: a re-pin is **not** one directory. At `5c808472` it is four:
   | path | why |
   |---|---|
   | `src/engine/` | the snapshot |
   | `test/` | the Architect's suite, re-pointed |
   | `tools/mathlab/` | `flex.json`, `design.json` — the lineup tests read them |
   | `data/packs/*.json` | the sim's runtime packs |
   At the **next** tip (`65673a00`) it becomes **five**, because the pass-class node ships two small test packs:
   - `data/packs/nfl-passclass-fit2016-2022.json` (1,957 B)
   - `data/packs/nfl-passclass-fit2023-2025.json` (1,942 B)
   **These are test-time only** — nothing in `colors/src` reads them at runtime (verified by grep) — but a full `data/packs/` copy carries them, and the Architect's suite will fail without them.

---

## 5 · The re-pin: prepare it, do not ship it

The Architect's tip has moved to **`65673a00`** (the pass-class GLM node). The Owner has **not** ruled that the shell should follow. The council is verifying that node right now, and the open question — a −1.7% sacks and −1.1% drives shift on the paired 12,000-key comparison — may bear on it.

**So: prepare the re-pin, prove it, and hold the switch.**

1. **Do the re-pin on a branch or in a scratch copy.** Move all five paths to `65673a00`.
2. **Run everything:** `npm run test:engine` (the Architect's suite is now 406/406 at that commit), `npm run build`, `npm run battery`, `npm run distfile`, and both node suites.
3. **Prove the default-off guarantee yourself** — this is the one that matters most:
   - `runGame` **without** `passClass` must be **bit-for-bit** the pools node. The Architect reports 60 games identical; verify it on your tree with your own fixture and paste the comparison.
   - `lambda 0` or `gap 0` must replay the neutral GLM log bit for bit.
   - Nothing in the shell may set `passClass`/`passGap` — grep for it and paste the empty result.
4. **Report, do not switch.** Deliver the re-pin as a *prepared, verified, not-activated* state: a branch or a clearly-marked note in `DELIVERY-DECISIONS.md`, with the exact commands and their output. **The Owner decides whether the shell moves.**

**If the re-pin is clean and the Owner says go, the switch is one step:** replace `src/engine/` (and the four other paths), re-run the five checks, re-pin `SNAPSHOT.md`, ship.

---

## 6 · Step 2 — the remaining handoff receipts

### 6.1 `SHELL-STATUS.md` — no DONE without a receipt that runs

Every "DONE" needs a receipt that a stranger can execute. The known gap is the node-24 pair (§3); if any other line is in that position, say so in the file rather than in a chat.

### 6.2 `MERGE-GUIDE.md` — walk it as a stranger

Follow its "swap fixture adapter → real engine" section **literally**, on a clean extract, with no prior knowledge. If you get stuck, the guide is wrong, not you. Record what you had to guess.

### 6.3 Re-measure M5

Lines of app code touching engine types. It was **76** at the old pin, **37** at `d3bd81d2`, **27** at `d3bd81d2`-plus. Publish the number at `5c808472` and say what moved.

### 6.4 The states, receipted

For every screen: loading · empty · no-save · **corrupt-save (refused, never repaired)** · **newer-build refusal** · reduced-motion · offline · `file://`. The council verified `file://` on the **empty** state only; the rest are yours.

### 6.5 A law for the packs

The sim now depends on `data/packs/*.json` at runtime, outside `colors/src`. Nothing in the battery proves the shell ships a pack that loads. Add one law:

> the sim boots with a **non-empty** pool, and the current-era pack's hash equals `<the value at this pin>`.

That catches the failure mode where the season runs on an empty pool and every other law still passes. **Falsify it**: ship a tree with the packs removed and show the law dies.

### 6.6 `scripts/acceptance-run.sh`

You added it and the README advertises it. Run it end to end from a clean extract and paste the full output. If it needs Node 24, that is exactly the portability problem in §3 — say so.

---

## 7 · Step 3 — prove it

A receipt per screen: a battery run, a probe, or a screenshot hash — not prose. The battery must pass on vanilla `file://`. The gates must pass (`CHECKSUMS.txt`, `MANIFEST.txt`, the numerals gate).

**Every receipt carries a one-byte falsifier** where it can be faked: mutate one input byte in a throwaway copy and show the command fails.

**Every law must be able to fail.** Break what it guards, show it dies, and **name the survivors** — a law that stays green when its guard is broken is a tautology.

If a screen cannot be proven yet, say so plainly and name the blocker.

---

## 8 · A tooling hazard you should know about (it cost a review)

Your toolchain's display layer **eats the ANSI-shaped `[m`**, so it renders the source text `DEST[main.slot]` as `DESTain.slot]`. A previous review quoted that and filed a **"corrupted line, no build can compile"** defect — which was **false**; the bytes were always correct, the file parses, the tests pass. It fooled the same seat twice.

**The mitigation is mechanical:** for any claim about a specific line of code, quote it with `git cat-file -p <rev>:<path> | sed -n '<n>p'` or `od -c`, not through the display layer. Worth a line in your own review notes so the next seat inherits it.

---

## 9 · The 3-4 surface — propose, do not ship

The Owner's condition is met by the engine (VERIFIED). The shell does not say it. One line on Team Select when a 3-4 is chosen:

> *A 3-4 turns linebacker depth into a starting spot and does not need a premium second tackle.*

**Propose it in the delivery note; do not ship it as settled copy.** No number, no re-pricing.

---

## 10 · What you may touch, and what you may not

**May:** your tree and deliveries · new files in your lane (`_agents/zai/inbox/…`) · the shared framework-neutral layer · §5 filings · the generated `src/engine-node/` build artifact (§3) · a **prepared, not activated** re-pin (§5).

**May not:** `colors/` · the engine · `flex.json` · `design.json` · the product HTML · another seat's bytes · `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, the queue · ratings · **enabling the pass-class node**.

---

## 11 · Delivery

You cannot push. Complete all work, batch into a single zip, do not respond with work outstanding — the only reason is a blocker, and then you say what it is.

Deliver with `CHECKSUMS.txt`, `MANIFEST.txt`, `gate-manifest.mjs PASS`, numerals gate `CLEAN` ×2, batteries green (or diagnosed), and `VERIFY.txt` — every number labelled VERIFIED / REPORTED / INFERRED / UNKNOWN.

One file per slice: `_agents/zai/inbox/<UTC>-zai-cakepanz-slice<N>.md`, first line `SPEAKER: zai | ROLE: … | TASK: … | DATE: <UTC>`, then `FOR: R-13`.

---

## 12 · Innovation

Two places where an idea beats compliance:

1. **Make the node suites portable *and* prove it.** §3 is the engineering; the proof is a one-line table in `VERIFY.txt`: suite · node 24 result · node 26 result. That table is the difference between a handoff the Architect can verify on his machine and one he has to take on trust.
2. **A `pretest` guard that refuses a stale snapshot.** Before any suite runs, assert `diff -rq src/engine <the pinned commit>` is empty, and fail loudly with the pin and the commit if not. It costs one command and it converts "is this the right engine?" from a question into a gate.

---

## 13 · Feel journal

Update `feel-journal.md`: what was easy, what fought you, what you would change. Name which parts of the shell felt fastest in plain TypeScript and which made you miss a framework. Do not turn it into a comparison.

---

## 14 · If you get stuck

- **The engine lacks something the shell needs** → §5 to the Architect. Do not copy engine code into the shell.
- **A law fails on a prepared re-pin** → name it, diagnose it (engine behaviour vs shell expectation vs regression), file it. Never edit the law, never edit the snapshot.
- **The precompile step fights you** → the transformation is one constructor; if it is harder than that, the parameter property has spread and that is a §5 to the Architect, not a reason to edit the snapshot.
- **The packs do not resolve** → say which path the entry expects, what you shipped, and what the failure looked like.
- **An Owner question blocks you** → safe reversible default, implement behind the contract, flag it.
- **A check needs a tool you lack** → say so, name what was not checked, label it UNKNOWN.

**Never** edit the snapshot. **Never** enable the pass-class node. **Never** edit a law to make it pass. **Never** ship a stand-in as if it were real.