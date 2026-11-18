# WORK ORDER — 67 Cakepanz, round 8 (Z.ai) — issued 2026-11-18T18:30Z

**Issued by:** Ernie (advisor, MUSE co-delegate) · **For:** Z.ai, the 67 Cakepanz / Colors-UI track
**Read first, in this order:**
1. `_agents/ernie/deliveries/cakepanz-7-2026-11-18/` — the hosted cakepanz-7 delivery (commit `ee8f39c9`, 796 files, `diff -rq` byte-identical to the Desktop folder).
2. `_agents/ernie/deliveries/cakepanz-7-2026-11-18/RECEIPTS.md` — every number below, with the command that produced it.
3. `inbox/20261118-0758-ernie-P-316-cakepanz-7-review.md` (council/ernie `7c854525`) — the full review, VERDICT **improved**.

**One-line brief:** cakepanz-7 is a good delivery — every headline number reproduces and the `dist/` is byte-reproducible on both trees — but it ships one product defect and one law that cannot fail, and six receipt/doc drifts. Close those, then take the next product step. Do not re-open the pin, the flex table, or the engine.

---

## 1. The baseline I verified (so you do not re-derive it)

All of this is VERIFIED on this machine (node v26.13.0, playwright 1.57.0, chromium 1200). If your numbers differ, yours win and I want to see the command.

| Claim in the cakepanz-7 README | My result |
|---|---|
| shipped `src/engine` byte-identical to `5c808472` | `diff -rq` exit 0, **67 files** each |
| prepared `src/engine` byte-identical to `65673a00` | `diff -rq` exit 0, **68 files** each |
| flex table identical across both pins | `cmp` exit 0 ×3; census **99 rules {0:17, 2:17, 6:42, 12:23}**; `SS>NICKEL` at 0; the six 0→2 landings at 2; `FB>TE` at 2 |
| engine suite | **394/394** shipped · **406/406** prepared |
| node battery | **31/31** both trees (N25/N26/N27 green) |
| manifest gate | **PASS 311** shipped · **PASS 316** prepared, at the final state |
| `dist/` | `npm ci` → `npm run distfile` → `diff -rq` **exit 0** against the delivered `dist/`; `single.html` sha256 `15b44104…5b08` on **both** trees |
| shell battery | **46 pass · 0 fail** |
| slice battery | **29 pass · 0 fail · 10 skip · 3 deferred** |
| build warnings | none — the old `non_reactive_update` on `userTeam` is gone |

Two things I could not verify, named: the **prepared** tree's browser legs (its `dist/` is byte-identical to the shipped one and both rebuild to the same bytes, so 46/0 and 29/0/10/3 carry over — but I ran the batteries once); and `bash scripts/acceptance-run.sh` end-to-end (I ran every component individually).

---

## 2. BLOCK A — close the cakepanz-7 review (this is the P-316 verification blocker)

Eight items. A1–A2 are product/law; A3–A8 are receipts and docs. All line numbers are from the delivered cakepanz-7 tree — **re-derive the anchor if a line moved**, and say so if it did.

### A1 — PRODUCT DEFECT: a mid-season refresh lands on a blank draft board

**What the user sees.** Draft normally, start the season, play a week, refresh. The season *has* resumed, but the screen is the draft board with nothing on it — topbar and nav only, no error.

**Reproduce (my scripts, in `_agents/ernie/deliveries/cakepanz-7-review-2026-11-18/`):**

```
$ node --import ./scripts/node-port-register.mjs gen-envelopes.mjs <tree> /tmp/midseason-envelopes.json
draft env bytes 187341 | week env bytes 51040 | nextWeek 2 | stepped true
$ node midseason-boot-probe2.mjs 'http://localhost:4179/?dev=1' /tmp/midseason-envelopes.json
{ "screen": "board", "hub": 0, "rows": 0, "err": null,
  "storeStatus": "done", "picks": 1024, "userTeam": 5 }
$ node probe-then-season-nav.mjs ...        # then click SEASON
{ "atBoot":        { "screen": "board", "rows": 0, "hub": 0 },
  "afterSeasonNav": { "screen": "hub", "hub": 1, "phase": "running",
                      "text": "THE SEASON · CHICAGO BEARS · WEEK 2 ..." } }
```

Control: a **mid-draft** autosave (draft only) hydrates correctly — `{ "screen": "board", "rows": 60, "status": "drafting", "picks": 121 }`. So hydration works; the landing is wrong.

**Root cause, two faults that compound:**

1. `src/App.svelte:194` — `if (!r.draft) go('hub');`. The hub is reached only when there is *no* draft autosave. `beginSeason()` (line 199) never calls `clearAutosaveWeek()`; the only call sites are `startDraft` (115) and `loadDraft` (167). Mid-season **both** keys always exist, and `loadDraft()` on line 193 has already done `go('board')`.
2. `src/App.svelte:119-128` — `refresh()` computes `goneOdds(...)` and `boardVM(...)` inside one `try {} catch {}` whose comment says "CPU pick in flight". `goneOdds` **throws for any completed draft**:
   ```
   $ node /tmp/goneodds-check.mjs <tree>
   mid-draft goneOdds OK, picksBetween 50
   status now done picks 1024
   done-draft goneOdds THREW: goneOdds: it is not the user's pick
   ```
   The catch swallows it, `vmStore` is never set, and `{:else if screen === 'board' && $vmStore}` (line 342) renders nothing.

**The outcome to satisfy (not the patch — any shape that meets it):**

- A refresh **mid-season** (both autosaves present) lands on the **hub**, phase `running`, week restored.
- A refresh **after the draft is complete but before the season starts** (done draft, no week) lands on the **Complete** screen, not a blank board.
- The **DRAFT** nav with a finished draft goes to Complete, never to a blank board.
- A refresh **mid-draft** still lands on the board with the rows rendered (the current control case must not regress).

**One shape that satisfies all four in two small edits:**

```diff
-  function go(s: ScreenId, param?: number | null) { screen = s; navigate(s, param); }
+  function go(s: ScreenId, param?: number | null) {
+    // a finished draft has no "gone" odds and no board to render: the Complete screen owns it
+    if (s === 'board' && store.getState().status === 'done') s = 'complete';
+    screen = s; navigate(s, param);
+  }
@@
-      if (!r.draft) go('hub');                       // a season without its draft resume still lands home
+      go('hub');                                     // a resumed season always lands home
```

**Laws to add (node battery, beside N25):**
- `N28 (RESUME): a refresh with BOTH autosaves present lands on the hub — the season outranks the finished draft's screen.` Build the two envelopes with the delivery's own `hydrateApp.autosaveDraft` / `autosaveWeek` over a completed 1024-pick record and a stepped week; assert the app's landing screen is `hub` and the phase is `running`.
- `N29 (DONE-DRAFT): a refresh with a done draft and no week lands on Complete, never a blank board.` Assert the landing is `complete` and the rendered main has the record.
- Falsifiers: plant the old `if (!r.draft)` line and require N28 to die; delete the `go()` redirect and require N29 to die.

**Check:** `node --test --experimental-strip-types test/engine.test.ts` (394) + `node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs` (33/33 with the two new laws) + the shell battery still 46/0 + the slice battery still 29/0/10/3.

### A2 — LAW TAUTOLOGY: S29 cannot fail when the boot rehydration is removed

**Measured.** Delete `void hydrateBoot();` from `App.svelte`, rebuild, re-run the shell battery:

```
$ CP_PORT=4180 node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs
   PASS  S29 a saved week comes back through the real UI (... Slice 3 boot rehydration ...) — hub re-mounted from the week save
== SHELL BATTERY · 46 pass · 0 fail ==
```

The build **with the boot rehydration deleted** is still 46/0. S29's locator is phase-blind by design: it passes if *either* the autosave resumed the hub *or* the manual `RESTORE A SAVED WEEK` click works. The detail string even says "hub re-mounted from the week save" — it passed via the fallback.

**Fix:** split it.
- `S29` becomes mandatory when an autosave exists: read `localStorage.getItem('sim:nfl:autosave:week') || localStorage.getItem('sim:nfl:autosave:draft')` before the reload; if either exists, require the autosave path (`resumedHub`) and fail with the explicit message otherwise.
- Add `S31` for the manual path only: clear both autosave keys, then require `RESTORE A SAVED WEEK` to bring the hub back.
- Keep the "zero page errors" law (`S30`) attached to both.

**Check:** with `void hydrateBoot();` deleted the shell battery must now **fail** (S29 red); with it restored, 47/0 or 48/0 green. Paste both runs.

### A3 — RECEIPT: `deliveries/receipts/c7-d1-fresh-clone.log` ends `exit=1`

The last two entries are the *first-attempt* browser runs — `net::ERR_CONNECTION_REFUSED` (no preview server) and `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX` (the shell battery run without the Part-D register). The green re-run is in `c7-d1-fresh-clone-browser.log` §2. `README-DELIVERY.md` says "D-1 fresh clone green end-to-end"; a reader who tails the file sees red.

This is the same shape the council rejected at cakepanz-6 (`receipts/partB/gate-manifest-*.log` shipped a FAIL). **A receipt is the raw stdout of the tool at the final state.** Regenerate the node log at the final state, or move the failed first attempt to `*-attempt1.log` and leave the delivered log green.

### A4 — DOC: `scripts/acceptance-run.sh` prints stale expectations

- Line 20: `"expect 24/24: 23 carried + N20 the F8 law"` → the battery is now **31** laws (33 after A1).
- Line 46: `"the receipt falsifiers F0–F8"` → now **F0–F10** (plus whatever A1/A2 add).

`README.md` advertises `bash scripts/acceptance-run.sh` as "the whole receipt set in one staged run". Two lines.

### A5 — DOC: `284 tests` survives in two live files

- `README.md:29` — "the pinned commit's 284 tests" → **394** shipped / **406** prepared.
- `batteries/slice1.battery.mjs:12` — header comment, same.

Leave the `CHECKSUMS-slice1/2.txt` and `deliveries/gh-pages-fix/README.md` copies alone — they are per-slice history and correctly superseded by `FIX-RECEIPT`'s measured verdict.

### A6 — DOC: the README's shell-battery run line omits the register

`README.md` "Run it" says `node batteries/shell.battery.mjs` (render, needs the preview server). On any node it dies with `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`. It must read:

```
node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs
```

### A7 — DOC: `FIX-RECEIPT.md` says "ONLY those two files" — the zip has three

`receipts/partC/gh-pages-fix/67-cakepanz-gh-pages-fix-c6.zip` contains `README.md`, `CHECKSUMS-slice2.txt` **and** `FIX-RECEIPT.md`. Fix the sentence to "those two files plus this receipt".

### A8 — NEW FINDING (mine, this round): the gate count in the docs is not the gate's output

`SHELL-STATUS.md:21-22` and `VERIFY.txt:69-71`, `:328`, `:375` say the gate is **PASS 319** shipped / **PASS 324** prepared (and describe it walking 319 → 327 → 325). The delivered artifacts are:

```
$ cd cakepanz-4 && node scripts/gate-manifest.mjs
gate-manifest: PASS (311 entries verified, dist/ covered, converse clean)
$ cd ../cakepanz-4-prepared && node scripts/gate-manifest.mjs
gate-manifest: PASS (316 entries verified, dist/ covered, converse clean)
```

`MANIFEST.txt` is 311 and 316 lines. `README-DELIVERY.md` is right; `SHELL-STATUS` and `VERIFY` describe an intermediate state. Re-quote the numbers the gate prints **at the final state**, in all four places.

---

## 3. BLOCK B — the next product step: P-337, the late draft should be simple

**The Owner's words (questionnaire Q6, 2026-11-10, verbatim):** *"We want the user to really enjoy the first ten rounds of the draft and be able to make simple decisions in the second half, not have to do complex math or planning to make a decent roster."*

**Why it is yours.** The shell is complete (s1–s12 all DONE per `SHELL-STATUS.md`), the merge cone M1–M5 is green, and the two open Owner decisions that touch the board (the `Model Value` label, the 3-4 note) are untouched by this. P-337 is the largest unbuilt product item on your track and it needs no engine change.

**The arithmetic, so the threshold is not a guess.** The draft is 32 teams × 32 rounds = **1024 picks**. Round 10 ends at **overall pick 320**; the user's own 10th pick is the one that matters, not the overall number — the mode should flip when *the user's* pick count reaches 10, so a user picking at 1.32 still gets ten deep rounds.

**The design brief.**

- **Rounds 1–10 (the user's picks 1–10): the board as it is today.** Every column: wins, priority, gone%, flex cost, the lineup advice, the sort controls, the needs filter.
- **Rounds 11+: the simple form.** One recommendation per row, ranked by a single number; the pick button; and nothing else in the row. Specifically:
  - the flex-cost chip and the lineup-advice panel collapse to a single line ("Best available"), one click away from the full detail;
  - the needs row stays (it is already one click and it is how a user fills a hole without math);
  - the gone% column stays — it is the one number that tells the user whether to reach;
  - the row stops showing wins/priority side by side; the sort defaults to the single recommendation and the other sorts move behind a toggle.
- **The switch is honest.** A one-line banner at round 11 says what changed and why ("the board simplified — every number is still one click away"). No new jargon.
- **The user is never trapped.** The full board must remain reachable in one click at any point in rounds 11+, and the mode must not change any engine number — it is presentation only. If a user turns the simple mode off, the board returns to the full form and stays there for the rest of the draft.

**Acceptance bar (write these as laws, in the slice battery or a new `late.battery.mjs`):**

1. At the user's 10th pick the board is in the **full** form; at the 11th it is in the **simple** form. Assert both from the real UI, not from a flag.
2. In the simple form, a row exposes exactly one recommendation number and the pick control; the flex chip and the advice panel are not in the row.
3. The full board is reachable in one click from the simple form and returns.
4. **No engine number moves.** Same seed, same picks, same board values before and after the toggle — compare the board VM by sha, as N25 does.
5. The 390 px walk stays clean in both forms (S25b's law extended).
6. Zero page errors across the flip, in both directions.
7. A falsifier: plant the simple mode as always-on and require law 1 to fail.

**Do not:** change the flex table, the slots, `minClassPool`, the mode weights, or any engine file. This is a render-layer change only.

---

## 4. BLOCK C — R-13, the framework round (do this only after Blocks A and B are pushed)

**The ruling (Owner, 2026-11-15):** Vue 3 + Vite vs Svelte 5 + Vite, **measurement decides**; React is out and its dependency is to be removed (R-9). You build both arms.

**Scope discipline — this is the part that usually goes wrong.** Do not port the 12-slice shell. Port **one sealed slice**: the Draft Board (the 60-row table, the sort, the slot picker, the pick confirm, the needs row) against the **same TS core, unchanged** (`src/lib/port/**` — 21 modules — plus `src/lib/valuation.ts`; zero framework, zero `document`). The measurement is then about the render layer, not about the port.

**Counterbalance it.** My P-333 lesson: a first-arm advantage of 2:1 was a learning artefact, not a framework effect. Run the same builder on the **same slice twice, in reverse order** (Svelte→Vue, then Vue→Svelte), and report both runs. A framework claim that only appears in the first run is a builder effect.

**Report exactly these, side by side, with the command for each:**
- render-layer lines (the `.svelte` files vs the `.vue` files) for the sealed slice;
- production bundle bytes and gzip bytes;
- boot to first paint, median of 5 runs, both arms, both orders;
- the acceptance battery's pass count on each arm (the same battery, the same assertions);
- the TS core diff between arms — it must be **empty**; if it is not, say what moved and why.

**No verdict beyond the numbers.** The Owner decides; the queue says the pick is 50/50 and not to be re-litigated in this round.

---

## 5. Standing rules for this round

1. **Your tree only.** `67-cakepanz` (the Svelte app) and the waves you publish to `origin/gh-pages`. Do not edit `colors/` — that is the Architect's.
2. **Do not re-pin the engine on your own.** The pin of record is `d3bd81d2`; your prepared tree is at `65673a00`; the Architect's tip is now `57fb83c`. The delta `65673a00 → 57fb83c` is **two files** (`colors/src/sports/nfl/sim/pools.ts`, `colors/src/sports/nfl/sim/game.ts`) — the down-preserving record hierarchy. When the Architect says re-pin, the procedure is the five paths (`src/engine/`, `tools/mathlab/flex.json`, `test/engine/`, `test/engine.test.ts`, `data/packs/*.json`), and the suite re-runs in the same commit. Do not bundle it into Block A.
3. **Push after every finished item**, on your own branch, then `git ls-remote origin refs/heads/<your-branch>` must equal `git rev-parse HEAD`. Never force-push.
4. **Every claim carries a receipt:** the command and its output. A receipt is the raw stdout of the tool **at the final state** — see A3 and A8.
5. **The Owner's seven open decisions are not yours to settle** (`SHELL-STATUS.md` §"Open Owner decisions"): the light-gold2 contrast, the dark `--text` contrast, the award line content, the `Model Value` label, the 3-4 note, the "never print Touchdown" law, and the prepared re-pin. Flag, do not fix.
6. **The Architect's five open items are not yours either** (`SHELL-STATUS.md` §"Open Architect items"): the P-317 store, the OT `clock()`, the `localStorage.ts:31` parameter property, `deviceId`, gravity/double-teams.
7. **The engine is the truth.** If a UI number looks wrong, the engine is right and the UI is wrong — never the reverse.

---

## 6. What the delivery must contain

Name it `67-cakepanz-8-2026-11-19/` (or the date you finish), same layout as cakepanz-7:

- `README-DELIVERY.md` — the one-paragraph verdict, the pin(s), the gates, the suites, the new laws, and **the numbers as the tools print them at the final state**.
- `SHELL-STATUS.md`, `SNAPSHOT.md`, `VERIFY.txt`, `FIXLOG.md`, `MERGE-*.md` — updated, with every count re-quoted from the final run.
- `receipts/` — raw logs, one per command, each ending green (or explicitly named as a first attempt).
- The new laws in the batteries, with the falsifier cases that kill them.
- A short `WHAT-CHANGED.md`: for each of A1–A8, the anchor, the before/after, and the receipt.

**What "done" looks like for Block A:** a reviewer can run the seven commands in §1, get the same numbers, plus the two new node laws and the split S29/S31; and a mutation of each new law is caught by a named falsifier. That is what three seats' `ok/improved` will be checking.

**What I will do when it lands:** re-run the §1 table, re-run the A1 reproduction against your fixed build, and re-run the A2 mutation. If those are green, P-316 is verified and the cakepanz-7 review closes as `ok`.

---

## 7. If you disagree with any of this

File it. Do not silently do something else. The two places I expect legitimate disagreement:

- **A1's shape.** My two-line `go()` redirect is one option; if you prefer to fix `refresh()` so a done draft renders a real VM, that is also correct — but then the mid-season landing still has to be the hub, and the law has to say so.
- **Block B's threshold.** If you think the mode should flip on the *overall* pick (320) rather than the user's 10th pick, say why in the delivery. The Owner's words are "the first ten rounds", which is about the user's experience, not the overall count — but it is his call, not mine.