# WORK ORDER v2 — 67 Cakepanz, round 8 (Z.ai) — issued 2026-11-18T18:30Z, improved 19:05Z

**From:** Inkling (MUSE delegation), folding Ernie's work order (`council/ernie @ a40a5133`,
`_agents/ernie/deliveries/prompts-2026-11-18/zai-cakepanz-8.md`) into the state-of-the-world brief.
**For:** Z.ai, the 67 Cakepanz / Colors-UI track. **Read first, in this order:**
1. `_agents/ernie/deliveries/cakepanz-7-2026-11-18/` — the hosted cakepanz-7 delivery (`ee8f39c9`, 796 files, `diff -rq` byte-identical to the Desktop folder; a copy also rides `council/inkling @ 0fcbc2c0`).
2. `_agents/ernie/deliveries/cakepanz-7-2026-11-18/RECEIPTS.md` — every baseline number below, with the command that produced it.
3. `inbox/20261118-0745-inkling-cakepanz7-review.md` (ok-with-notes) and `inbox/20261118-0758-ernie-P-316-cakepanz-7-review.md` (VERDICT **improved**) on their branches.

**One-line brief:** cakepanz-7 is a good delivery — every headline number reproduces and the `dist/` is byte-reproducible on both trees — but it ships one product defect, one law that cannot fail, six receipt/doc drifts, and one duplicated sentence; close those, then take the next product step. Do not re-open the pin, the flex table, or the engine.

---

## 1 · The baseline I verified (so you do not re-derive it)

VERIFIED on Ernie's machine (node v26.13.0, playwright 1.57.0, chromium 1200) and cross-checked by Inkling (node v26.13.0). If your numbers differ, yours win — with the command attached.

| Claim in the cakepanz-7 README | Result |
|---|---|
| shipped `src/engine` byte-identical to `5c808472` | `diff -rq` exit 0, **67 files** each |
| prepared `src/engine` byte-identical to `65673a00` | `diff -rq` exit 0, **68 files** each |
| flex table identical across both pins | `cmp` exit 0 ×3; census **99 rules {0:17, 2:17, 6:42, 12:23}**; `SS>NICKEL` at 0; the six 0→2 landings at 2; `FB>TE` at 2 |
| engine suite | **394/394** shipped · **406/406** prepared |
| node battery | **31/31** both trees (N25/N26/N27 green) |
| manifest gate | **PASS 311** shipped · **PASS 316** prepared, at the final state |
| `dist/` | `npm ci` → `npm run distfile` → `diff -rq` exit 0 against the delivered `dist/`; `single.html` sha256 `15b44104…5b08` on **both** trees (passclass node is tree-shaken in both) |
| shell battery | **46 pass · 0 fail** · **slice battery: 29 pass · 0 fail · 10 skip · 3 deferred** |
| engine tip (context, not to act on) | `architect/engine-and-seats @ 57fb83c` — the pools-node down-preserving fix; delta vs `65673a00` = two src files (`sim/pools.ts`, `sim/game.ts`) plus test files; GLM stays OFF; CI green at `1aa7fb3` (run `44262444359`, 57s, job `colors`) |
| live site | stays **wave 89** (`origin/gh-pages` tip `66096fb`); deployed tree still names `4ca9a071`/52 files; the staged two-file fix is **NOT placed**; placement is the Owner's click |

Two things Ernie could not verify, named: the **prepared** tree's browser legs (byte-identical `dist/` to shipped; he ran the batteries once); and `bash scripts/acceptance-run.sh` end-to-end (he ran every component individually). Nothing above is an instruction to re-verify; dispute only with receipts.

---

## 2 · BLOCK A — close the cakepanz-7 review (the P-316 verification blocker)

Nine items. A1–A2 are product/law; A3–A9 are receipts and docs. All line numbers are from the delivered tree — **re-derive the anchor if a line moved**, and say so if it did.

### A1 — PRODUCT DEFECT (must close): a mid-season refresh lands on a blank draft board

**What the user sees.** Draft normally, start the season, play a week, refresh. The season **has** resumed — but the screen is the draft board with nothing on it: topbar and nav only, no error.

**Reproduce (Ernie's scripts, in `_agents/ernie/deliveries/cakepanz-7-review-2026-11-18/`):**

```
$ node --import ./scripts/node-port-register.mjs gen-envelopes.mjs <tree> /tmp/midseason-envelopes.json
draft env bytes 187341 | week env bytes 51040 | nextWeek 2 | stepped true
$ node midseason-boot-probe2.mjs 'http://localhost:4179/?dev=1' /tmp/midseason-envelopes.json
{ "screen": "board", "hub": 0, "rows": 0, "err": null, "storeStatus": "done", "picks": 1024, "userTeam": 5 }
```
Control: a mid-draft autosave (draft only) hydrates correctly (`{"screen":"board","rows":60,"status":"drafting","picks":121}`).

**Root cause — two faults that compound (verified by Inkling against the delivered source this sitting):**

1. `src/App.svelte` `hydrateBoot()` — `if (!r.draft) go('hub');`: the hub is reached only when there is *no* draft autosave. Mid-season both keys always exist, so `loadDraft()` does `go('board')` and `go('hub')` never fires.
2. `src/App.svelte` `refresh()` wraps `goneOdds(...)` + `boardVM(...)` in a `try {} catch {}` whose comment says "CPU pick in flight". `goneOdds` **throws for any completed draft** (`goneOdds: it is not the user's pick`) — the catch swallows it, `vmStore` is never set, and `{:else if screen === 'board' && $vmStore}` renders nothing.

**The outcome to satisfy (any shape that meets it):**
- A refresh **mid-season** (both autosaves) lands on the **hub**, phase `running`, week restored.
- A refresh **after the draft is complete, before the season starts** lands on **Complete**, not a blank board.
- The **DRAFT** nav on a finished draft goes to Complete, never blank.
- A refresh **mid-draft** still lands on the board with rows (the control case must not regress).

**One two-line shape that satisfies all four:**

```diff
-  function go(s: ScreenId, param?: number | null) { screen = s; navigate(s, param); }
+  function go(s: ScreenId, param?: number | null) {
+    // a finished draft has no board: the Complete screen owns it
+    if (s === 'board' && store.getState().status === 'done') s = 'complete';
+    screen = s; navigate(s, param);
+  }
@@
-      if (!r.draft) go('hub');                       // a season without its draft resume still lands home
+      go('hub');                                     // a resumed season always lands home
```

**Laws to add (node battery beside N25):**
- `N28 (RESUME): a refresh with BOTH autosaves lands on the hub — the season outranks the finished draft's screen.` Build the two envelopes with the delivery's own `hydrateApp.autosaveDraft`/`autosaveWeek`; assert landing screen = `hub` and phase `running`.
- `N29 (DONE-DRAFT): a refresh with a done draft, no week, lands on Complete, never a blank board.` Assert landing = `complete`, record rendered.
- Falsifiers: plant the old `if (!r.draft) go('hub');` line → N28 must die; delete the `go()` redirect → N29 must die.

**Check:** `test:engine` (394/406) + `node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs` (33/33 with the two new laws) + shell battery still **46/0** + slice battery still **29/0/10/3**.

### A2 — LAW TAUTOLOGY: S29 cannot fail when the boot rehydration is removed

**Measured by Ernie.** Delete `void hydrateBoot();`, rebuild, re-run the shell battery → still **46/0**. S29's phase-blind locator passes via the manual `RESTORE A SAVED WEEK` fallback even with the boot path deleted. The law cannot fail.

**Fix — split it:**
- `S29` becomes mandatory when an autosave exists: read `localStorage.getItem('sim:nfl:autosave:week') || localStorage.getItem('sim:nfl:autosave:draft')` before the reload; if either exists, require the resume-by-boot path (`resumedHub`) and fail loudly otherwise.
- Add `S31` for the manual path only: clear both autosave keys, then require the manual restore to bring the hub back.
- Keep `S30` (zero page errors) attached to both.

**Check:** with `void hydrateBoot();` deleted the battery must now **fail** (S29 red); with it restored, green. Paste both runs.

### A3 — RECEIPT: `deliveries/receipts/c7-d1-fresh-clone.log` ends `exit=1`

The last entries are the *first-attempt* browser legs (`ERR_CONNECTION_REFUSED`, `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX` before the Part-D register). The green re-run lives in `c7-d1-fresh-clone-browser.log` — `README-DELIVERY.md` says "green end-to-end"; a reader who tails the file sees red. **Same shape the council rejected at cakepanz-6** (partB FAIL logs). Regenerate the node log at the final state, or rename the first attempt `*-attempt1.log` and leave the delivered log green.

### A4 — DOC: `scripts/acceptance-run.sh` prints stale expectations

- Line 20: `"expect 24/24: 23 carried + N20 the F8 law"` → the battery is now **31** (33 after A1).
- Line 46: `"the receipt falsifiers F0–F8"` → now **F0–F10** (plus any A1/A2 additions).

Two lines; `README.md` advertises this script as the whole receipt set in one staged run.

### A5 — DOC: `284 tests` survives in two live files

- `README.md:29` ("the pinned commit's 284 tests") → **394 shipped / 406 prepared**.
- `batteries/slice1.battery.mjs:12` (header comment) — same.

Leave `CHECKSUMS-slice*.txt` and `deliveries/gh-pages-fix/README.md` alone — per-slice history, superseded by FIX-RECEIPT's verdict.

### A6 — DOC: the README's shell-battery line omits the register

`README.md` "Run it" says `node batteries/shell.battery.mjs`; on any node that dies with `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`. It must read:

```
node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs
```

### A7 — DOC: `FIX-RECEIPT.md` says "ONLY those two files" — the zip has three

`receipts/partC/gh-pages-fix/67-cakepanz-gh-pages-fix-c6.zip` contains `README.md`, `CHECKSUMS-slice2.txt` **and** `FIX-RECEIPT.md`. Fix the sentence to "those two files plus this receipt" (or equivalent). Do not re-cut the zip.

### A8 — FULL SWEEP of the gate-count prose (superseding Ernie's four places)

`SHELL-STATUS.md` §"The battery verdict" (~lines 20–23) and `VERIFY.txt` (§19.4 at :69–71, §19.10 at :328-ish, §20.2 and the "326 entries" prose at :373–377) quote **319/324/326** — all intermediates of the cakepanz-6 receipt rewrite (and unrelated to the delivered **311** shipped / **316** prepared). Delivered reality (Ernie + Inkling re-ran it):

```
$ cd cakepanz-4 && node scripts/gate-manifest.mjs           → gate-manifest: PASS (311 entries verified, dist/ covered, converse clean)  exit=0
$ cd ../cakepanz-4-prepared && node scripts/gate-manifest.mjs → gate-manifest: PASS (316 entries verified, dist/ covered, converse clean)  exit=0
```

**The rule is not "fix those four lines" — it is: after this round any document that states a count states the one the tool prints at the final state.** Sweep every count-bearing doc in the package; re-quote anything stale.

### A9 — DOC: the RECEIPT LAW sentence is duplicated, verbatim, in two files

Package root `START-OF-CHAT-ZAI.md` (== the shipped-tree copy; the one MUSE re-files on `council/muse`) carries the sentence **twice** in §5 rule 3; the prepared-tree copy carries it once. Make all three byte-identical (the single-sentence form). This is a two-file doc edit and belongs in this round, not a round of its own.

---

## 3 · BLOCK B — P-337: the late draft should be simple (next product step)

**The Owner's words (questionnaire Q6, verbatim):** *"We want the user to really enjoy the first ten rounds of the draft and be able to make simple decisions in the second half, not have to do complex math or planning to make a decent roster."*

**Why yours.** The shell is complete (s1–s12), the merge cone M1–M5 is green, and the two open Owner decisions that touch the board are untouched by it. P-337 needs no engine change.

**The arithmetic.** 32 teams × 32 rounds = **1024 picks**; round 10 ends at overall pick **320** — but the mode flips on **the user's own 10th pick**, not the overall number (a user picking at 1.32 still gets ten deep rounds).

**The design brief:**
- **User's picks 1–10:** the board as it is today — wins, priority, gone%, flex cost, lineup advice, sort controls, needs filter.
- **Picks 11+:** the simple form. One recommendation per row, ranked by a single number; the pick button; nothing else:
  - flex-cost chip and lineup-advice panel collapse to a single line ("Best available"), one click from the full detail;
  - the needs row stays (it is already one click);
  - the gone% column stays — the one number telling a user whether to reach;
  - wins/priority no longer shown side by side; sort defaults to the single recommendation; other sorts behind a toggle.
- **The switch is honest.** One line at pick 11: what changed and why ("the board simplified — every number is still one click away"). No new jargon.
- **Never trapped.** Full board reachable in one click at any time; mode is presentation only and moves **no engine number**; if the user turns simple mode off, the board returns to full and stays for the rest of the draft.

**Acceptance laws (write as laws, slice battery or a new `late.battery.mjs`):**
1. At the user's 10th pick: the **full** form; at the 11th: the **simple** form. Assert from the real UI, not from a flag.
2. Simple form row: exactly one recommendation number + the pick control; no flex chip, no advice panel in the row.
3. Full board reachable in one click; returns.
4. **No engine number moves** — same seed, same picks, same board values across the toggle; compare the board VM by sha (the N25 pattern).
5. 390 px stays clean in both forms (extend S25b's law).
6. Zero page errors across the flip, both directions.
7. Falsifier: plant simple-mode as always-on → law 1 must fail.

**Do not touch:** the flex table, the slots, `minClassPool`, the mode weights, any engine file, engine semantics anywhere. Render layer only.

---

## 4 · BLOCK C — R-13, the framework round (**only after Blocks A and B are pushed**)

**The ruling (Owner, 2026-11-15):** Vue 3 + Vite vs Svelte 5 + Vite, **measurement decides**; React is out and is to be removed (R-9). You build both arms.

**Scope discipline.** Do NOT port the 12-slice shell. Port **one sealed slice**: the Draft Board (the 60-row table, sort, slot picker, pick confirm, needs row) against the **same TS core, unchanged** (`src/lib/port/**` — 21 modules — plus `src/lib/valuation.ts`; zero framework, zero `document`). The measurement is about the render layer, not the port.

**Counterbalance it.** A first-arm 2:1 advantage is a learning artefact, not a framework effect. Run the same builder on the **same slice twice, in reverse order** (Svelte→Vue, then Vue→Svelte); report both runs. A framework effect that only appears in run 1 is a builder effect.

**Report exactly these, side by side, with commands:** render-layer lines (`.svelte` vs `.vue`); production bundle bytes and gzip bytes; boot-to-first-paint, median of 5 runs, both arms, both orders; the acceptance battery's pass count on each arm (same battery, same assertions); the TS core diff between arms — must be **empty**; if not, say what moved and why.

**No verdict beyond the numbers.** The Owner decides. The queue says the pick is 50/50 and not to be re-litigated in this round.

---

## 5 · Standing rules for this round

1. **Your tree only.** `67-cakepanz` (the Svelte app) and the waves you publish to `origin/gh-pages`. Do not edit `colors/` — the Architect's.
2. **Do not re-pin the engine on your own.** The pin of record is `d3bd81d2`; your prepared tree is `65673a00`; the Architect's tip is now `57fb83c`. The delta `65673a00 → 57fb83c` is **two source files** (`colors/src/sports/nfl/sim/pools.ts`, `colors/src/sports/nfl/sim/game.ts`) — the down-preserving record hierarchy — plus tests. When the Architect orders a re-pin: the five paths, byte-identical, verify in the same commit. Do not bundle it into Block A.
3. **Delivery: one zip; the Owner places it.** Ernie's draft of this order carried a "push after every finished item, on your own branch" rule — it is NOT applicable: you cannot push; work reaches GitHub as a zip the Owner relays. If the Owner has since granted you push access he will say so in this brief's successor — until then, zip → sha256 → Owner. (If you do have push access and it is meant to apply, `git ls-remote origin refs/heads/<your-branch>` must equal `git rev-parse HEAD` after every push; never force-push.)
4. **Every claim carries a receipt** — command + output. A receipt is the raw stdout **at the final state**; anything else is REPORTED and named.
5. **The Owner's open decisions are not yours to settle** (the seven live ones): the light-gold2 contrast, the dark `--text` contrast, the award line content, the `Model Value` label (both live labels currently; pick one is the Owner's), the 3-4 note, the "never print Touchdown" law, and the prepared re-pin. Flag, do not fix.
6. **The Architect's five open items are not yours either:** the P-317 store, the OT `clock()`, the `localStorage.ts:31` parameter property, `deviceId`, gravity/double-teams.
7. **The engine is the truth.** If a UI number looks wrong, the engine is right and the UI is wrong — never the reverse.

## 6 · What the delivery must contain

Name it `67-cakepanz-8-<date>/`, same layout as cakepanz-7:

- `README-DELIVERY.md` — one-paragraph verdict, the pin(s), the gates, the suites, the new laws, **the numbers as the tools print them at the final state**.
- `SHELL-STATUS.md`, `SNAPSHOT.md`, `VERIFY.txt`, `FIXLOG.md`, `MERGE-*.md` — updated, every count re-quoted from the final run.
- `receipts/` — raw logs, one per command, each ending green (or explicitly named as a first attempt).
- The new laws in the batteries, with their falsifier cases.
- `WHAT-CHANGED.md` — for each of A1–A9, the anchor, the before/after, the receipt.

**What "done" looks like for Block A:** a reviewer can run the seven commands in §1, get the same numbers, plus the two new node laws (33/33) and the split S29/S31 (green at final state, red under the planted boot gate). That is what three seats' ok/improved will check.

**What Ernie will do when it lands:** re-run the §1 table, re-run the A1 reproduction against your fixed build, re-run the A2 mutation. Green on all three → P-316 is verified and the cakepanz-7 review closes `ok`.

## 7 · If you disagree with any of this

File it. Do not silently do something else. The two places I expect legitimate disagreement:

- **A1's shape.** The two-line `go()` redirect is one option; fixing `refresh()` so a done draft renders a real VM is also correct — but then the mid-season landing still has to be the hub, and the law has to say so.
- **Block B's threshold.** If you think the flip should happen on the *overall* pick (320) rather than the user's 10th, say why in the delivery — the Owner's words are "the first ten rounds" (about the user's experience, not the overall count), but it is his call, not the layout's.
- **A9's disposition.** If the three-copy normalization breaks a tooling assumption, keep the prepared copy canonical and note it — do not re-cut the doubled sentence in a way you cannot verify byte-identical.

Anything else, ask the Owner first. One sitting, one zip, nothing else rides.
