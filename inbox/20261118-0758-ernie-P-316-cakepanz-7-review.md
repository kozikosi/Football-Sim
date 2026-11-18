SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: review the cakepanz-7 delivery | DATE: 2026-11-18T07:58Z
REVIEW-OF: `_agents/ernie/deliveries/cakepanz-7-2026-11-18/` — Z.ai's cakepanz-7 delivery (shipped pin 5c808472 + prepared pin 65673a00 + receipts), hosted by me at commit `ee8f39c9` (796 files, 33 MB, `diff -rq` byte-identical to the Owner's Desktop folder).
FOR: P-316 (Slice 3 — hydration + board chrome)
VERDICT: **improved** — the build is sound and every headline number reproduces; one **product defect** and one **law tautology** are new, plus five receipt/doc hygiene defects (one of them the same class the council already ruled on at cakepanz-6).

---

## 1. What reproduced exactly (VERIFIED, my runs, node v26.13.0)

| Claim | Result |
|---|---|
| shipped `src/engine` byte-identical to `5c808472` | `diff -rq` exit 0, **67 files** each |
| prepared `src/engine` byte-identical to `65673a00` | `diff -rq` exit 0, **68 files** each |
| flex table identical across both pins | `cmp` exit 0 ×3; census **99 rules {0:17, 2:17, 6:42, 12:23}**; `SS>NICKEL` at 0; the six 0→2 landings all at 2; `FB>TE` at 2 |
| engine suite | **394/394** shipped · **406/406** prepared |
| node battery | **31/31** both trees (N25/N26/N27 green) |
| manifest gate | **PASS 311** shipped · **PASS 316** prepared, both at the final state |
| dist | `npm ci` → `npm run distfile` → **`diff -rq` exit 0** against the delivered `dist/`; `single.html` sha256 `15b44104…5b08` in both |
| shell battery | **46 pass · 0 fail** (my run, chromium 1200) |
| slice battery | **29 pass · 0 fail · 10 skip · 3 deferred** (my run) |
| build warnings | none (the old `non_reactive_update` on `userTeam` is gone) |
| Slice 3 laws falsifiable | **yes** — my `falsify-slice3.mjs`: F11 (no `hydrateBoot`) kills N25, F12 (hardcoded `50%`) kills N26, F13 (empty open set) kills N27, F14 (hardcoded tooltip) kills N26. Both trees. |

**The dist reproducibility is the strongest receipt in the package** — the delivered `dist/` is byte-for-byte what the delivered `src/` builds to, on both trees (and the two dists are identical to each other, which is correct: the passclass node is tree-shaken).

## 2. THE PRODUCT DEFECT (new, high value)

**A user who drafts normally and then plays a season lands, on refresh, on a BLANK DRAFT BOARD — not the season hub.** The season has resumed correctly; only the landing screen is wrong.

Reproduction (my scripts, in `_agents/ernie/deliveries/cakepanz-7-review-2026-11-18/`):

```
$ node --import ./scripts/node-port-register.mjs gen-envelopes.mjs <tree> /tmp/midseason-envelopes.json
draft env bytes 187341 | week env bytes 51040 | nextWeek 2 | stepped true
$ node midseason-boot-probe2.mjs 'http://localhost:4179/?dev=1' /tmp/midseason-envelopes.json
{ "screen": "board", "hub": 0, "rows": 0, "err": null,
  "storeStatus": "done", "picks": 1024, "userTeam": 5 }
$ node probe-then-season-nav.mjs ...        # then click SEASON
{ "atBoot":       { "screen": "board", "rows": 0, "hub": 0 },
  "afterSeasonNav": { "screen": "hub", "hub": 1, "phase": "running",
                      "text": "THE SEASON · CHICAGO BEARS · WEEK 2 ..." } }
```

Control — mid-draft (draft autosave only) works: `{ "screen": "board", "rows": 60, "status": "drafting", "picks": 121 }`.

The envelopes were produced by the delivery's **own** `hydrateApp.autosaveDraft` / `autosaveWeek` over a real completed 1024-pick draft and a real stepped week — i.e. the bytes the shell itself writes.

**Root cause, two independent faults that compound:**

1. **`src/App.svelte:194`** — `if (!r.draft) go('hub');`. The season resumes, but the landing is the hub only when there is **no** draft autosave. `beginSeason()` (line 199) never calls `clearAutosaveWeek()`; the only call sites are `startDraft` (line 115) and `loadDraft` (line 167). So mid-season **both** keys always exist, and `loadDraft()` on line 193 has already done `go('board')`.
2. **`src/App.svelte:119-128`** — `refresh()` computes `goneOdds(...)` and `boardVM(...)` inside one `try {} catch {}` whose comment says "CPU pick in flight". `goneOdds` **throws for any completed draft**:
   ```
   $ node /tmp/goneodds-check.mjs <tree>
   mid-draft goneOdds OK, picksBetween 50
   status now done picks 1024
   done-draft goneOdds THREW: goneOdds: it is not the user's pick
   ```
   The catch swallows it, `vmStore` is never set, and the template's `{:else if screen === 'board' && $vmStore}` (line 342) renders **nothing**. The user sees topbar + nav + empty page, no error (`err: null`).

This is a cakepanz-7 regression: `hydrateBoot` is new this sitting. It contradicts `README-DELIVERY.md` ("a refresh mid-draft lands back on the same board … a saved season resumes to the hub") and VERIFY §20.4 ("a saved season resumes … and lands on `hub`").

**Smallest correct fix (two lines, no engine touch, no new law needed):**
```diff
--- a/src/App.svelte
+++ b/src/App.svelte
@@ hydrateBoot()
-    if (r.draft) loadDraft(r.draft.record, r.draft.lineage);                   // the board + header + next pick return
+    if (r.draft) loadDraft(r.draft.record, r.draft.lineage);                   // the board + header + next pick return
+    if (r.draft && r.week) { /* a resumed season outranks the finished draft's screen */ }
@@
-      if (!r.draft) go('hub');                                                 // a season without its draft resume still lands home
+      go('hub');                                                               // a resumed season always lands home (the draft's board is only for a mid-draft refresh)
```
and, so the board can never be blank for a finished draft:
```diff
@@ refresh()
-    try {
-      const odds = goneOdds(st.draft, userTeam, makeRng(seed * 7 + 13), 30);
+    if (st.status === 'done') { vmStore.set(null); oddsMeta.set(null); openNow.set([]); return; }  // a finished draft has no "gone" odds — the Complete screen owns it
+    try {
+      const odds = goneOdds(st.draft, userTeam, makeRng(seed * 7 + 13), 30);
```
**Test that would have caught it:** extend N25's season half to reload with BOTH autosaves present and assert `screen === 'hub'`. S29 cannot catch it (see §3).

## 3. THE LAW TAUTOLOGY (new)

**S29 is the only browser law for Slice 3's hydration and it cannot fail when the hydration is removed.** Its locator is phase-blind: it passes if EITHER the autosave resumed the hub OR the manual `RESTORE A SAVED WEEK` click works. Measured:

```
$ # delete the boot rehydration from App.svelte, rebuild, re-run the shell battery
$ CP_PORT=4180 node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs
   PASS  S29 a saved week comes back through the real UI (... Slice 3 boot rehydration ...) — hub re-mounted from the week save
== SHELL BATTERY · 46 pass · 0 fail ==
```

The build with `void hydrateBoot();` **deleted** is still 46/0. The detail string even says "hub re-mounted from the week save" — i.e. it passed via the fallback. The law's *name* claims the boot rehydration; its *assertion* does not test it. Fix: make the first branch mandatory when `sim:nfl:autosave:*` exists, and keep the manual path as a separate law.

Note the node law N25 **does** catch it (my F11), so the feature is not unprotected overall — but the shell battery's 46/0 is not evidence for Slice 3.

## 4. Receipt and doc hygiene (five, all small and exactly locatable)

1. **`deliveries/receipts/c7-d1-fresh-clone.log` ends `exit=1`.** The last two entries are the two *first-attempt* browser runs: `net::ERR_CONNECTION_REFUSED` (no preview server) and `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX` (shell battery run without the Part-D register). The green re-run is in `c7-d1-fresh-clone-browser.log` §2. This is the same shape the council rejected at cakepanz-6 (`receipts/partB/gate-manifest-*.log` shipped a FAIL). `README-DELIVERY.md` says "D-1 fresh clone green end-to-end"; a reader who tails the file sees red. **Fix:** regenerate the node log at the final state (drop the first-attempt browser tail, or move it to `*-attempt1.log`).
2. **`scripts/acceptance-run.sh` still prints stale expectations** — line 20 `"expect 24/24: 23 carried + N20 the F8 law"` (now **31**) and line 46 `"the receipt falsifiers F0–F8"` (now **F0–F10**). Identical in both trees. `README.md` advertises `bash scripts/acceptance-run.sh` as "the whole receipt set in one staged run", and VERIFY §20.9 admits it was not re-staged. **Fix:** two lines.
3. **`284 tests` survives in two live files** — `README.md:29` ("the pinned commit's 284 tests", now **394**) and `batteries/slice1.battery.mjs:12` (header comment, **394**). The `CHECKSUMS-slice1/2.txt` and `deliveries/gh-pages-fix/README.md` copies are per-slice history and correctly superseded by FIX-RECEIPT's measured verdict — leave those.
4. **`README.md` "Run it" for the shell battery omits the register**: "`node batteries/shell.battery.mjs` (render, needs the preview server)" → on any node it dies with `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`. Should read `node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs`.
5. **`FIX-RECEIPT.md` says "the zip carries ONLY those two files"** — the zip has **three** (`README.md`, `CHECKSUMS-slice2.txt`, `FIX-RECEIPT.md`). Fix the sentence to "those two files plus this receipt".

Also worth a line, not a defect: the falsifier suite is **F0–F10, none of which targets N25/N26/N27**. VERIFY §20.7 is honest ("the new laws ride the same F0 baseline"), and §4 above proves the laws *are* falsifiable — but the delivery should carry the three cases. My probe is the drop-in: `_agents/ernie/deliveries/cakepanz-7-review-2026-11-18/falsify-slice3.mjs` (same discipline as `receipt-falsifier.mjs`: fresh copy per mutation, clean baseline first, node-level error is COULD-NOT-RUN).

## 5. What I did NOT verify (named)
- The **prepared** tree's browser legs: its `dist/` is byte-identical to the shipped one (`diff -rq` exit 0) and both rebuild to the same bytes, so 46/0 and 29/0/10/3 carry over — but I ran the batteries once, on the shipped build.
- `bash scripts/acceptance-run.sh` end-to-end (I ran every component individually; the composite needs a 4179 listener and a long runtime).
- The M3 swap receipts, the takeover 16/16 sha set, and the cakepanz-6 numbers §19 cites — REPORTED, not re-run.
- The 9 red flex expectations on the deployed `67-cakepanz` — the Owner/Architect call, unchanged by this review.

## 6. One-line verdict for the queue
Ship it as a **hosted delivery, not an accepted build**: every number in the README reproduces (engine 394/406, node 31/31, gates 311/316, dist byte-reproducible, shell 46/0, slice 29/0/10/3), the pins are byte-exact, and Slice 3 is real and falsifiable — but the mid-season refresh lands on a blank board (§2) and S29 cannot fail (§3), so P-316 is **not** verified until §2 is fixed and N25's season half reloads with both autosaves present.