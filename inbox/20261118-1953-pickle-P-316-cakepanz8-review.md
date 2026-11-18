SPEAKER: PICKLE | ROLE: council adviser, independent reviewer | TASK: review Z.ai's 67-cakepanz-8 delivery (work order `deliveries/zai-cakepanz-8-2026-11-18.md` @ `origin/council/inkling` `ae303ded`, blob `58a82690`) | DATE: 2026-11-18T19:53Z

REVIEW-OF: `67-cakepanz-8-2026-11-18/` — hosted byte-for-byte on `council/pickle` @ `01595abf` under `_agents/pickle/deliveries/`, canonical SHA-256 manifest `9a013582…d598f6d0d7b` (1006 rows). `diff -rq` source (Owner's Desktop) vs hosted copy: identical. This is my first review of this item; I wrote none of the delivery.

FOR: P-316 (the cakepanz-7 review closure the work order closes); Block B is P-337, reported on below.

VERDICT: **improved** — every headline number I re-ran reproduces and A1–A9 are genuinely closed in both trees. Block B (P-337) is built and its laws are real, but I found three concrete render-layer UX defects and one law-scope gap that should be fixed before P-337 is accepted. None of them move an engine number.

---

## 1. What I ran myself (VERIFIED — node v26.13.0, this worktree, 18 Nov 2026)

| Check | Command | Result |
|---|---|---|
| Hosting integrity | `diff -rq <Desktop folder> <hosted copy>` | exit 0, 1006 files, 35 MB |
| Key hashes | `shasum -a 256 …` | `START-OF-CHAT-ZAI.md` `3c0dfd3f…` (×3 byte-identical); `dist/single.html` `1529a003…e737` (both trees) — matches Z.ai's report |
| Pin — shipped | `git archive 5c808472 colors/src \| tar -x …` then `diff -rq` vs `cakepanz-4/src/engine` | 67 files, exit 0 |
| Pin — prepared | same with `65673a00` vs `cakepanz-4-prepared/src/engine` | 68 files, exit 0 |
| Flex | `cmp` both trees vs both pins; census over `flex.json` | exit 0 ×2; **99 rules {0:17, 2:17, 6:42, 12:23}**, `SS>NICKEL=0`, `FB>TE=2` |
| Engine suites | `node --test --experimental-strip-types test/engine.test.ts` | shipped **394/394**, prepared **406/406**, fail 0 |
| Node batteries | `node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs` | **33/33** both trees; N28 RESUME + N29 DONE-DRAFT present and green |
| Gates | `node scripts/gate-manifest.mjs` in each tree | shipped **PASS (314)**, prepared **PASS (319)**, exit 0 |
| Cross-tree parity | `diff -rq -x engine -x engine-node …/src` ; `diff -rq …/dist` | both exit 0 — shell source identical outside the engine; dists byte-identical |
| A1 anchors | `grep` `src/App.svelte` both trees | `go()` redirect at :95; `go('hub')` inside `if (r.week)` at :200 — the c7 gate is gone |
| A2 anchors | `grep` `batteries/shell.battery.mjs` both trees | S29 now demands `resumedHub` with autosaves present; S31 is the cleared-keys manual path |
| A3 | read `deliveries/receipts/c8-d1-fresh-clone.log` | every leg `exit=0`, ends green; old log renamed `c7-d1-fresh-clone-attempt1.log` |
| A4–A7 | `grep` both trees | 33/33 + F0–F12 + S1a–S31 in `acceptance-run.sh`; no stale `284 tests` as a live claim (the one survivor is the dated A5 correction); register in README; "two files plus this receipt" in all three FIX-RECEIPT copies |
| A8 | `grep` `VERIFY.txt` | §21 present; 314/319 quoted with dated SUPERSEDED markers on old prose |
| A9 | `shasum` ×3 | all three `3c0dfd3f…` |
| Falsifiers | re-ran `node scripts/receipt-falsifier.mjs` (shipped); read `receipts/partH-c8/f11-*.log`, `f8-a2-{red,green}-*.log` | my run: F0 baseline OK, **F1–F12 ALL DIED**; receipt: F13-late DIED with L1 red; A2 red **46/1** → green **47/0** |

I also re-ran the full `node scripts/receipt-falsifier.mjs` on the shipped tree independently: F0 clean baseline OK, **F1–F12 ALL DIED** (each with the named law red — F11 → N28, F12 → N29), final line "every falsified law DIED — the battery is falsifiable". This is my own run, not the receipt.

## 2. A1–A9 (VERIFIED closed)

- **A1** — the two-line shape is in both trees. Note one precision point: the delivery's WHAT-CHANGED calls `go('hub')` "unconditional", but the call sits **inside** `if (r.week)` (App.svelte :200). That is the correct scope — a mid-draft refresh (draft autosave only) still reaches `loadDraft()` → `go('board')` and is not sent home — and it matches the work order's own diff. The prose, not the code, is loose.
- **A2** — the split is real: S29 asserts the boot path when an autosave exists; S31 owns the manual path. The red run fails S29 for the right reason. This closes the tautology.
- **A3–A9** — all locatable and fixed in both trees; the counts now match the tools. The A8 rule ("any count a doc states is the one the tool prints at the final state") is honoured, with dated corrections where history is kept.

**Consequence:** the §1 baseline and the A-block are in good enough shape that Ernie's third check (re-run §1, the A1 reproduction, the A2 mutation) should go green; I have independently reproduced every part of it that does not need a browser.

## 3. Block B — findings (all render layer; none move the engine)

The headline claims hold: the flip is at the user's 10th pick (`src/App.svelte:319-320`), the board is `data-form="simple|full"` (`:33`), the honest line and FULL BOARD door exist, `late.battery.mjs` has L1–L6 and `falsify-late.mjs` kills L1. The VM-sha law L4 is the right idea and the engine is byte-identical to its pin.

**[defect — shown, medium] B1: taking FULL BOARD does not survive a mid-draft refresh.**
`simpleOff` is a plain `$state(false)` (App.svelte:67), set true by the door (`:371`), reset only by `startDraft` (`:119`). It is not written into the draft autosave or any local-storage key. A user who chooses FULL BOARD at pick 12, refreshes mid-draft (the flow Slice 3 explicitly supports), comes back in **simple** form because `myPicks >= 10 && !simpleOff` is recomputed with `simpleOff = false`. That contradicts the brief's "returns to full and **stays for the rest of the draft**".
The law overstates its proof too: L3's detail string says "STAYS full for the rest of the draft" but its body only makes **one further in-page pick** (`await pickUser()`) — there is no reload in the late battery at all (`grep -n reload` in `batteries/late.battery.mjs` → none). This is the same class as the c7 S29 tautology, milder: L3 proves something real, just less than its name claims.
**Fix:** persist `simpleOff` with the save lineage (the draft autosave already carries a `saveId`; one boolean in its meta is enough) and restore it in `hydrateBoot()`. Add **L7**: take FULL BOARD at pick 11, reload with the draft autosave, assert `data-form === 'full'`. Falsifier: delete the restore → L7 must die.

**[defect — shown, low] B2: the simple row's expand button is a dead affordance.**
`BoardRow.svelte:14` (simple branch) renders `<button … onclick={() => (open = !open)} aria-expanded={open}>` but the simple branch has **no** `{#if open}` detail block — the flex chips/detail exist only in the full branch (`:34-45`). Clicking a simple row changes `aria-expanded` and nothing visible. The delivery claims "flex chips and the advice panel … one click away (the FULL BOARD door **or the row detail**)" — the row-detail half does not exist in simple mode.
**Fix:** either render the same `{#if open}` detail inside the simple branch (preferred — it keeps the "one click away" promise without forcing the global door) or remove the toggle/aria-expanded from the simple row. Add an assertion to L2 that clicking a simple row reveals the chip detail.

**[defect — shown, low] B3: sort and the single number can disagree.**
`BoardFooter.svelte:12-14` exposes the SORT controls in simple mode behind the toggle; changing `sort` reorders `vm.rows`. But `BoardRow.svelte:18` always displays `r.wins` as the one recommendation number and never labels it. A user who selects priority (or gone%) sees rows ordered by that key with wins numbers next to them — the single number no longer explains the order. The brief says "sort defaults to the single recommendation; other sorts behind a toggle", which implies the shown number should track the active sort (or the sort should reset to wins when the toggle closes).
**Fix:** pass `sort` into the row and show the matching field with a 3-letter label (`WINS` / `PRIO` / `GONE%`), or reset `sort = 'wins'` on entering simple mode and say "other sorts are in FULL BOARD". Extend L2 to assert the displayed number matches the active sort after a sort change.

**[calibration question — Owner, not a defect] B4: the 10th-pick threshold.**
Arithmetic that supports Z.ai's choice: with 32 teams the user's 10th pick is overall `288 + slot` → **289 at slot 1, 320 at slot 32**. The alternative "overall 320" would give a slot-1 user 31 extra deep picks after round 10, which does not match Q6's "first ten rounds" experience. The user-experience reading is the right default; the Owner still owns the call, as the work order says.

## 4. Further implications of this round (INFERRED unless labelled)

1. **Block C's gate is now arguably open.** The work order opens R-13 only "after Blocks A and B are pushed" while §5.3 says "push nothing; the Owner relays the zip". The Owner has now had the folder pushed to `council/pickle` (`01595abf`), so "pushed" is true in at least one sense. Whether that satisfies the gate is MUSE/Owner's ruling, not a seat's — I am flagging the ambiguity, not opening R-13 myself.
2. **The deployed product is still untouched.** `origin/gh-pages` still names `4ca9a071` / 52 files and carries 277/9 against its own suite (REPORTED by prior reviews; I did not re-measure). The gh-pages two-file fix remains unplaced (Owner's click). So none of c8's fixes — including A1 — reach a user until placement + cutover. The value of this sitting is entirely in the hosted tree until then.
3. **"Mode is presentation only" is now a load-bearing claim.** L4's frozen-state VM-sha law is the best guard in the package, but it only covers two states at one seed. If a later slice mutates boardVM on mode change, L4 catches it; a golden 1024-pick replay would catch a wider class. That is an improvement, not a defect in c8.
4. **The lane/hosting rule was overridden again.** Inkling flagged the same at c7: the Owner's explicit instruction to push the folder beats "lanes hold no build copies or images". Fine as an Owner call; MUSE may want one standing note so it is not re-litigated each round.

## 5. What I did NOT run (named, per inbox/README.md)

- Browser legs (shell 47/0, slice 29/0/10/3, late 6/6): **REPORTED** from the delivered receipts and prior reviews; no playwright/chromium driven here. A1's four post-fix UI outcomes likewise **REPORTED** (`f4-a1-postfix-probes.log`).
- `falsify-late.mjs` itself: **REPORTED** (it symlinks `node_modules`, which is absent in the hosted copy); its delivered log shows F13 DIED and I read it.
- `bash scripts/acceptance-run.sh` end-to-end: **not run** (same posture as c7 — every component ran and is receipted individually).
- `npm ci` / `vite build` rebuild of `dist/`: **not run**; I verified the shipped bytes and their sha only. The byte-reproducibility claim remains REPORTED from the fresh-clone receipt I read.
- M3 swap receipts, takeover 16/16 sha set, deployed 286/277/9 measurement: **REPORTED**, unchanged.

**Weakest point of the work:** the c8 receipts are strong on engine/gate/node facts, but every claim about what the *user sees* after the P-337 flip rests on browser logs I could not re-drive, and the three findings above are exactly in that layer. B1 is the one to fix first: it is a real regression of the brief's own "stays full" sentence and the current L3 law would not catch it.

**Suggested (not ordered):** fix B1+B2+B3 with an L7 law and a re-cut zip; get the Owner to rule on B4 and on whether the `council/pickle` push opens Block C; keep the shipped pin at `5c808472` and the prepared one unactivated until the Owner says otherwise.
