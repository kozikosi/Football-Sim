PROMPT — Z.ai · 67 Cakepanz · "close the merge cone, prove the shell, hand it over"

---

## 0 · How to read this

This is the next work order for the 67 Cakepanz shell. It is written to be self-contained: every term is defined where it first appears, every claim is labelled with how it was produced, and every check has a command. If a sentence says "VERIFIED", the council ran it and the receipt is in this prompt or in the council's lane. If it says "REPORTED", someone else ran it and is named. If it says "INFERRED", it is reasoning, not a measurement.

**67 Cakepanz** is the UI/UX shell of **76 Pancakes**, a football draft simulator: a user drafts a team of real NFL players, then plays a season against the other 31 teams. **The shell** is what the user sees — screens, flows, save system, shareables. **The engine** is the code in `colors/` that simulates drafts, games and seasons. Claude is the **Architect**: he owns the engine and the product file. You own the shell. When the engine is done, he merges it into your shell, and your job is to make that merge a **wiring task**, not a port.

Your last delivery — **version `0.6.0-shell`**, 236 files, engine pinned at **`d3bd81d2`** — is the best state the shell has ever been in. This round is about the last mile: making the handoff *provable*, not making it *bigger*.

---

## 1 · The rulings that govern this round

**1. TypeScript-neutral until the last second.** The Owner has ruled that the framework pick — Vue 3 vs Svelte 5 — happens at cutover, not now. Build in plain TypeScript below the render layer; Svelte 5 is the render layer of this tree and that is allowed, but no framework idiom may leak into `src/lib/**`. Do not re-open the framework question, do not write a comparison, do not port anything from the fresh-start arms. The one thing you may record is the feel journal in §14.

**2. The engine is not yours.** You never edit `colors/src`, `src/engine/**` (the vendored snapshot), `flex.json`, `flex.ts`, `slots.ts`, ratings, or protected constants. If the shell needs something the engine does not express, that is a **§5 filing** — a patch proposal with the file, the exact old→new, and how to check it — for the Architect. You never re-pin on your own initiative, never push a gh-pages wave, never generate ratings.

**3. The gap is closed by Owner ruling — do not touch it.** The Owner has ruled: *"let's leave the gap for now. 4-3 is more popular. I just want 3-4 to be better in scenarios where a bad dt2 is left on the draft board and there are many good linebackers. As long as this is true then I'm fine with the current gap."* The council verified that this is **already true** (VERIFIED, 2026-11-17): on the real 32-team pool, capping the DT class at 70 moves the league mean from +1145 to **−95** (17 of 32 clubs better in 3-4); raising the linebacker class to 85 makes **all 32 clubs** better in 3-4. So: **do not re-price the flex table, do not re-rate ILB2, do not "fix" the gap.** You may *surface* it in the UI (see §10).

**4. The palette is the Owner's.** The light `#fdf2f6`, the dark `#1e1119`, Cinzel inlined as base64, `ZPB_TEAM_COLORS`, the `[data-zpbteam]` remap, `--zcream` never tinted, no `--tc` in the final look, the user's team in `.ub`. You implemented these and the council verified them (see §3). Two palette questions are the Owner's and you must not decide them: the light gold2 AA failure, and the dark `--text` fix. Flag them; do not fix them.

**5. The pin is `d3bd81d2`.** This is settled. The council verified your snapshot is byte-identical to it (57 files, `diff -rq` → 0). The old `4ca9a071` is retired. Do not re-litigate the pin.

**6. No injuries, ever. No ratings, ever.** Basketball is deferred. No new palette, no new brand.

---

## 2 · Ground truth — what the council verified in your last delivery

All of this was re-run by the council on 2026-11-17 from the hosted copy at `_agents/ernie/deliveries/zai-67-cakepanz-2-2026-11-17/` (236 files, committed `7274b174`). Your own receipts are in `VERIFY.txt`; these are independent.

| claim in your delivery | council re-run | verdict |
|---|---|---|
| engine pin `d3bd81d2`, 57 files | `diff -rq src/engine <colors/src@d3bd81d2>` → **0 differences** | **VERIFIED** |
| battery 26/0/10/3 green | `CP_PORT=4190 node batteries/slice1.battery.mjs` → **exit 0, 26 pass · 0 fail · 10 skip · 3 defer** | **VERIFIED** |
| engine tests 323/323 | `npm run test:engine` → **tests 323 · pass 323 · fail 0** | **VERIFIED** |
| builds | `npm run build` → exit 0, 221 modules, 665 ms | **VERIFIED** |
| 390 px, zero console errors | `scrollWidth 390 == clientWidth 390`, `pageErrors []` | **VERIFIED** |
| the Owner's visual law | `font-family: Cinzel, Georgia, serif`; `color-scheme: light dark`; `body` bg `rgb(253,242,246)` = `#fdf2f6` | **VERIFIED** |
| M1 one door | `grep -rln "engine/" src --exclude-dir=engine --exclude-dir=port` → **0 files** | **VERIFIED** |
| M5 thin seam | 37 lines touch engine types, across 11 files (was 76 / 13) | **VERIFIED** |
| feed no longer prints "touchdown" | `grep -rn touchdown src/lib/port/*.ts` → **0** | **VERIFIED** |
| `SNAPSHOT.md` (M4) | pin, 57 hashes, exact `git archive` command, one-line re-pin, what lives outside the snapshot | **VERIFIED** |

**Bundle measured:** JS 375.57 kB (gzip 127.75), CSS 83.14 kB (gzip 47.91). Total gz ≈ 1.4 MB budget, comfortably inside.

**So the merge cone now holds M1, M2 and M4, and M5 is thin.** The remaining work is in three places: the parts of M3 nobody has run, the node-side battery that nobody on a current node *can* run, and the handoff documents that exist but have not been verified end to end.

---

## 3 · What is still open — the council's list, with the exact checks

### 3.1 · `npm run battery:node` cannot run on node 26 (highest priority)

`package.json` calls:

```
node --experimental-transform-types batteries/node.battery.mjs
```

On **node 26.13.0** that flag is rejected (`node: bad option: --experimental-transform-types`). Without it, the run dies on:

```
src/engine/platform/localstorage.ts:31
export class LocalStorageModule implements StorageModule {
  constructor(private readonly ls: Storage | null, ...) {}
SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript parameter property is not supported in strip-only mode
```

That file is **inside the snapshot**, so you may not edit it. Three legal ways out — pick one, say which, and record it in `SNAPSHOT.md`:

1. **Run the node battery on a node that supports `--experimental-transform-types`** and pin the supported version in `SNAPSHOT.md` and `VERIFY.txt` (the author's node evidently does). Cheapest, and it is honest about what the suite is.
2. **Precompile the engine for the node battery** — a build step that strips the parameter property into a generated copy *outside* `src/engine/`, leaving the snapshot untouched. More work, but it makes the suite runnable anywhere.
3. **File a §5 to the Architect** to remove the parameter property in `engine/platform/localstorage.ts:31` (one line, no behaviour change), so strip-only mode can parse the engine.

**Why this is first:** `SHELL-STATUS.md` cites the N1–N16 node laws as the receipts for slices 6–11. On a current node those laws are unrunnable, which means the seven season screens have **no verifiable receipt** for anyone but you. Do not leave it there.

**The check:** `node --experimental-strip-types batteries/node.battery.mjs` (or whatever your chosen route produces) must exit 0 on a clean extract, and the exact command must be in `SNAPSHOT.md`.

### 3.2 · M3 on the Architect's newest commit, not the pin

The council ran the swap test on the *previous* tree and it produced the single most useful finding of that round: with `src/engine` replaced by the Architect's tip **`7a0706df`** (11 commits ahead of the pin, 17 files, +1,222/−53 — the P-318 value layer), **the build passed but the battery went 60 pass / 1 fail**, and the failing law was the flex-chip law:

```
FAIL  the flex chips read the flex cost (the "-N" form, no "flex tax" wording)
      — OBSERVED open — 14 pickers probed · 0 flex chips
```

The council then found *why*: on the tip, the board's flex surface collapses — rows with flex options go from **50 of 60 to 12 of 60**, and total chips from **347 to 18** (node-side, same draft, same seed). That is an engine-behaviour change under the new value layer, not a shell bug, and it is exactly the kind of thing a re-pin must catch before merge day.

**Do this:** copy your tree, replace `src/engine/` with `colors/src` at **`7a0706df`**, run `npm install && npm run build && npm run battery`. Paste both receipts and `diff -rq` proving nothing outside `src/engine/` changed. If a law fails, name it and say whether it is the engine's behaviour or the shell's expectation — do not edit the law to make it pass, and do not edit the snapshot.

### 3.3 · Three small defects the council filed

| where | what | fix |
|---|---|---|
| `src/App.svelte:63` | `let userTeam = 0;` — the build prints `non_reactive_update` on every build | `let userTeam = $state(0);` (one word) |
| `src/lib/port/savesApp.ts:65` | `lw.state.nextWeek <= 22` — the shell duplicates the engine's season length | ask the engine through the seam; if the engine does not export it, §5 to the Architect (do not keep the literal) |
| `tsconfig.json` | `Cannot find base config file "$app/tsconfig"` warning | remove the stale SvelteKit-ism |
| a component | `a11y_label_has_associated_control` (a `<label>` with no associated control) | give it a `for`/`id`, or make it a `<span>` if it is a caption |

None of these is a feature. All four are an hour.

### 3.4 · The handoff documents exist — now verify them end to end

You wrote `MERGE-README.md`, `MERGE-GUIDE.md`, `SHELL-STATUS.md`, `SNAPSHOT.md`, `VERIFY.txt`. The council read `SNAPSHOT.md` and `SHELL-STATUS.md` and found them accurate. **The ones nobody has executed are `MERGE-README.md` and `MERGE-GUIDE.md`, and the `distfile`/file:// path.**

- **`npm run distfile`** has not been run by the council. Run it on a clean extract and paste the receipt: the single-file output must boot from vanilla `file://` with **zero console errors and zero blocked requests**. This is a hard requirement (offline is a hard requirement).
- **`MERGE-GUIDE.md`** must be walkable by someone who is not you. Give it to a reader who has never seen the tree and ask them to follow §"swap fixture adapter → real engine" literally. If they get stuck, the guide is wrong, not them.
- **`SHELL-STATUS.md`** must have no "DONE" without a receipt that runs. The council could not run the node laws (§3.1); if any other line is in that position, say so.

---

## 4 · Your first four lines

Begin your response with these four lines, before any prose or code:

```
READ : this prompt · the tree's README + SNAPSHOT.md + SHELL-STATUS.md + VERIFY.txt · the w88 grammar
STATE: pin d3bd81d2 · slices 1–12 built · framework undecided (TS-neutral) · engine = Claude's
PLAN : <your slice-plan proposal in one line>
RISKS: <what could bite, in one line>
```

This forces your assumptions into the open — especially the pin, which has gone stale before.

---

## 5 · Step 0 — inventory, then work (do this before any screen)

The council records still disagree about what is built, because there are now four Cakepanz trees on four branches (the `67-cakepanz-s5` delivery on `council/inkling`, the `s3-s4-rev2` on `council/ernie`, the gh-pages copy at slices 1–2, and this one). **Do not trust any of them.** List, in your delivery note, what this tree builds and what it does not, screen by screen, and name the tree you are working in.

Then verify the pin from the snapshot's own files:

```
diff -rq src/engine <(git archive d3bd81d2 colors/src | tar -x -C /tmp/x)
```

It must be silent. If it is not, stop and say so — a shell whose snapshot is not byte-identical is not mergeable.

---

## 6 · Step 1 — close the merge cone

The cone is: *the only operation required to move to a new engine is replacing `src/engine/` with the new snapshot.* Five requirements, each testable.

**M1 · One door.** Every engine read goes through one module. *Now true* (0 importers outside `src/lib/port/`). **Keep it true:** every new screen must import the port, never `src/engine/**`. Add a law that fails if the count leaves 0.

**M2 · One directory.** Nothing outside `src/engine/` knows the snapshot's layout. *Now true.* The swap in §3.2 is the test.

**M3 · The swap test.** Done on `d3bd81d2`, and it passed for the app (the council's failure was on the *next* engine, §3.2). Do it again on `7a0706df` and paste both receipts.

**M4 · A written contract.** `SNAPSHOT.md` exists and is accurate. Keep it accurate: pin, file count, per-file sha256, the exact command, the one-line re-pin, and the three paths that move on a re-pin (`src/engine/`, `tools/mathlab/`, `test/`) — the council measured that a re-pin is **three directories, not one**, and `SNAPSHOT.md` should say so in one line.

**M5 · The seam is thin.** 37 lines across 11 files. Publish the number in the handoff note and re-measure it after this round; if it grows, say why.

**The seam itself** — `src/lib/port/seam.ts` plus the VMs beside it — must cover everything the shell needs: starting a draft (with a custom order), reading the board, stepping the week, simulating the season, saving and loading. If the seam cannot express something, that is a §5, not a workaround. **Never re-implement engine math in the shell** — no flex table, no slot values, no draft order. If you find a duplicated number, delete yours and ask the engine.

**The slot (P-317).** Team Select must let the user pick a team **and** a draft position (slot 1–32) on the same screen, with the same look. The council measured why this is hard: `newDraft(players, rng, cfg, order = snakeOrder())` already takes an order (`draft.ts:52`), but the store's `START` is `{seed, userTeam}` (`store.ts:30`), `restoreDraft` passes no order (`store.ts:66`), and `DraftPayload` is `{seed, userTeam, picks, pool}` (`saves.ts:27-31`) — so a custom slot **cannot survive a save**, and `store.ts:69` throws `save: pick N is out of order`. That is the Architect's change. Build the picker against a typed UI contract plus a fixture, and flag the store piece in the delivery note. **Do not dispatch a `slot` the store will silently drop** — the picker would claim a position the draft did not use.

---

## 7 · Step 2 — the screens and the states

The twelve slices are built. What is left is not new screens; it is **the states, receipted**, and the screens nobody has walked at 390 px.

**The states, everywhere.** For *every* screen in the finished shell: loading · empty · no-save · corrupt-save · newer-build refusal · reduced-motion · offline · `file://`. Nothing is "covered by the battery" unless each state is receipted. Corrupt-save must be **refused, never repaired** (your slice-3 law already proves this for the draft and week slots; extend it to every screen).

**390 px on every screen, not the entry screen.** The council verified the entry screen is clean (390 == 390, zero page errors). Walk all twelve screens at 390 and paste a table: screen · `scrollWidth` · `clientWidth` · page errors. Any overflow is a defect, not a note.

**Reduced motion.** Every animation you added must have a `prefers-reduced-motion` variant that actually lands (the council verified the feed's beat-in is off under reduced motion — keep that property and extend it).

**Accessibility.** Tab order on the picker, the gone% tooltip's focus behaviour, the needs-row filter, screen-reader basics. The two AA questions (light gold2, dark `--text`) are the Owner's — audit them, report the measured ratios, do not fix them.

**Offline.** Local-first, sync on reconnect; fonts bundled (Cinzel as base64, never Google's servers); one self-contained file; no CDN, no network.

---

## 8 · Step 3 — the handoff, verified rather than written

The note the Owner hands the Architect must contain, at minimum:

1. **The seam inventory** — every screen, every store/VM it reads, the engine file + sha256 it binds to. You have this in `seam.ts`; make the table and keep it true.
2. **The state coverage matrix** — every screen × every state, with its battery receipt.
3. **The fixture suite** — node-side renders of every screen without a browser. This is what makes the node battery worth running (§3.1).
4. **The battery** — green end to end **on the pin and on the tip** (§3.2), including each acceptance screen in reduced-motion mode.
5. **The cutover runbook** — the exact steps the Architect follows on merge day: re-vendor `colors/src` at the new pin, move `tools/mathlab/` and `test/` with it, re-run the node battery and the browser battery, re-pin, ship. Plus what to do if any one step fails: **file it, do not route around it.**
6. **The merge-readiness verdict** — one line per screen: perfect, good enough, or needs one more pass — and the honest list of what you do not know. No euphemisms. The Owner has to rule on it.

`MERGE-GUIDE.md` (for Claude): integration points, the adapter interface and expected shapes, hydration/save schema, screen→data dependencies, event/command flows, the file map (TS core vs bindings vs assets), and the exact steps to swap fixture adapter → real engine. `SHELL-STATUS.md`: slice-by-slice done/partial/blocked, framework-coupled seams, open Owner decisions, assumptions labelled UNKNOWN/INFERRED. `SNAPSHOT.md`: the pin, the three paths, the re-pin.

**If the merge has a step that can fail, say how to tell it failed.**

---

## 9 · Step 4 — prove it

For every screen: a receipt showing it works — a battery run, a probe, or a screenshot hash, not prose. The battery must pass on vanilla `file://` (single-file dist, zero console errors, zero blocked requests). The gates must pass: `CHECKSUMS.txt` verifies every file's hash, `MANIFEST.txt` lists every file that should be there, the numerals gate checks that no stale number survives in the prose.

**Every receipt carries a one-byte falsifier where a receipt can be faked:** mutate one input byte in a throwaway copy and show the receipt's command fails. A gate that has never been seen red is not a gate.

**Every law must be able to fail.** For each new law you write, break the thing it guards and show the law dies. Report the survivors too — a law that stays green when its guard is broken is a tautology and must be named, not quietly kept.

**If a screen cannot be proven yet** (because it waits on an engine piece), say so plainly and name the blocker. Do not claim it.

---

## 10 · The 3-4 note — what the shell may say (and what it may not)

The Owner's requirement is met by the engine (VERIFIED, §1.3). The shell does not say it. A user who wants to run a 3-4 has no way to know that the 3-4 is a **linebacker-conversion base** — that it turns linebacker depth into a 300-weight spot and does not need a premium second tackle.

The smallest honest surface is one line on Team Select when a 3-4 is chosen, in the Owner's plain-informative style:

> *A 3-4 turns linebacker depth into a starting spot and does not need a premium second tackle.*

**Propose it in the delivery note; do not ship it as settled copy.** The Owner has not ruled on the wording, and product copy is his. Do not print a number to justify it, and do not re-price anything to make it true — it is already true.

---

## 11 · What you may touch, and what you may not

**May:** your own Cakepanz tree and deliveries (`_agents/zai/deliveries/…`, the 67-cakepanz gh-pages deployment) · new files in your lane (`_agents/zai/inbox/…`) · the shared framework-neutral layer (seasonVM, weekVM, tokens) · §5 patch proposals to the Architect for anything in `colors/` or the engine.

**May not:** `colors/` · the engine · `flex.json` · `design.json` · the product HTML · another seat's bytes · `AGENTS.md`, `PROJECT-KNOWLEDGE.md`, the queue · ratings. You do not edit the engine to make a test pass; you file the change. You do not decide Owner questions (the framework pick, the palette, the gap, the cutover trigger). No new specification decided by you alone — propose, the Owner rules.

---

## 12 · Delivery

You cannot push. Complete all work before responding and batch it into a single zip. Do not respond with work outstanding — the only reason to respond with work outstanding is a blocker, and then you say what the blocker is.

Deliver the shell as a pass-through copy in your lane with `CHECKSUMS.txt`, `MANIFEST.txt`, `gate-manifest.mjs PASS`, the numerals gate `CLEAN` ×2, the batteries green, and `VERIFY.txt` — every number labelled VERIFIED / REPORTED / INFERRED / UNKNOWN.

One file per slice: `_agents/zai/inbox/<UTC>-zai-cakepanz-slice<N>.md`, first line `SPEAKER: zai | ROLE: … | TASK: … | DATE: <UTC>`, then `FOR: R-13` (the framework-comparison item in the queue).

A law's receipt is the command, the output, and the mutation that killed it. Include the inventory from Step 0, the seam document, the four handoff documents, and the delivery note. State what you read and changed, verify before shipping, and finish all in-scope work before responding.

---

## 13 · Innovation

You are the builder, and you decide the implementation inside 67 Cakepanz. If a screen can be better than this spec, build it better and say why. If the seam can be cleaner, design it cleaner. If a flow is awkward, redesign it. If a piece of the shell is missing from §7, add it and say so. The best idea wins, not the first one.

Two places where an idea would be worth more than compliance:

1. **The node battery.** If you can make the N1–N16 laws run on a stock modern node without touching the snapshot, that is worth more than any single screen — it is the difference between a handoff the Architect can verify and one he has to take on trust.
2. **The swap test as a habit.** A one-command script that swaps `src/engine/` to a named commit, runs build + both batteries, and prints PASS/FAIL with the diff outside `src/engine/` — committed in `scripts/`, documented in `SNAPSHOT.md` — turns the merge cone from a claim into a gate anyone can run. If you build it, falsify it (break one byte, show it fails).

---

## 14 · Feel journal

Include one: what was easy, what fought you, what you would change. Since the framework question is now about you, say specifically **which parts of the shell felt fastest to build in plain TypeScript and which parts made you miss a framework** — name them. This is the only framework-adjacent thing in the prompt; do not turn it into a comparison.

---

## 15 · If you get stuck

- **The engine lacks something the shell needs:** §5 to the Architect. Do not copy engine code into the shell.
- **A law fails on a new pin:** name the law and the pin, and say whether it is the engine's behaviour or the shell's expectation. Do not edit the law.
- **An Owner question blocks you:** choose a safe reversible default, implement behind the contract, and flag it clearly. Do not guess a ruling.
- **A check needs a tool you do not have:** say so, name what was not checked, and label the claim UNKNOWN.

**Never** edit the snapshot to make a screen easier. **Never** re-pin on your own initiative. **Never** ship a stand-in as if it were real — label it `STAND-IN`, name the real call it replaces, and list it in the delivery note.