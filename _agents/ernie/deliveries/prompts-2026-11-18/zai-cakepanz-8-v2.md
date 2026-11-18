# WORK ORDER v2 — 67 Cakepanz, the cakepanz-8 sitting (Z.ai) — 2026-11-18T18:40Z

**Supersedes** `zai-cakepanz-8.md` (v1) in the same directory. v1 had the delivery model wrong and the scope too wide; v2 adopts Inkling's brief (`council/inkling 9c2d6c67` → `deliveries/zai-cakepanz-8-2026-11-18.md`) as the frame and adds the P-316 findings v1 had that his brief does not.

**Read first, in this order:**
1. Inkling's brief — `deliveries/zai-cakepanz-8-2026-11-18.md` on `council/inkling` (the scope, the ground rules, the blocked list).
2. `_agents/ernie/deliveries/cakepanz-7-2026-11-18/` — the hosted cakepanz-7 delivery (`ee8f39c9`), and `RECEIPTS.md` for every number below.
3. `inbox/20261118-0758-ernie-P-316-cakepanz-7-review.md` (`7c854525`) and `inbox/20261118-0745-inkling-cakepanz7-review.md` — the two reviews this sitting closes.

**One-line brief:** cakepanz-7 is a strong delivery — every headline number reproduces and `dist/` is byte-reproducible on both trees — but it carries one user-visible defect and one law that cannot fail, plus six receipt/doc drifts. **Block A is hygiene only (no code). Block B is the P-316 fix (code).** Do A first; A alone is a valid delivery, B alone is not.

---

## 1 · Where things stand (2026-11-18)

Everything labelled VERIFIED was checked by a seat against the ref named. Rerun only if you dispute it, and then with receipts.

- **You deliver one zip; the Owner places it; you never push.** `START-OF-CHAT-ZAI.md:49` already says so. The c7 folder being pushed to `council/inkling` was a one-time Owner override for readability, not a licence. Nothing you produce mutates a branch or goes live.
- **The live site stays wave 89** (`origin/gh-pages` tip `66096fb`). The staged gh-pages fix (README + CHECKSUMS-slice2 naming `d3bd81d2` / 57 files) is **NOT placed**; the deployed tree still names `4ca9a071` / 52 files. Placement is the Owner's click. Never place it yourself.
- **The engine is at `57fb83c`** ("Pools node: down-preserving record hierarchy"). The default pools node changed: 4th-down tries that go on without a first down went 17.4% (pass) / 9.8% (run) → 0.24% / 0.13% (real 2023–25: 0.2% / 0.0%); conversion rates untouched; points −0.28/game; the GLM pass-class node stays OFF (lambda 0); the sacks shift is a different problem, untouched; the engine's own suite is **414/414** (VERIFIED by me and by Inkling, independently). A CI gate at `1aa7fb3` ran the pin-watch falsifier green (Actions run `44262444359`, 57 s). The engine is the Architect's; you never edit it.
- **`65673a00` is superseded by `57fb83c`.** The prepared package remains valid *as a package*, but the pin it was built for is no longer the tip. **Do not re-activate, do not re-prep, do not touch it without the Owner's word.** The shipped tree stays at `5c808472` until he says re-pin/activate.
- **Cakepanz-7 state (VERIFIED by me on node v26.13.0; Inkling independently on the same major):**

| Claim | Result |
|---|---|
| shipped `src/engine` vs `5c808472` | `diff -rq` exit 0, **67 files** each |
| prepared `src/engine` vs `65673a00` | `diff -rq` exit 0, **68 files** each |
| flex table across both pins | `cmp` exit 0 ×3; **99 rules {0:17, 2:17, 6:42, 12:23}**; `SS>NICKEL` at 0; six 0→2 at 2; `FB>TE` at 2 |
| engine suite | **394/394** shipped · **406/406** prepared |
| node battery | **31/31** both trees |
| manifest gate | **PASS 311** shipped · **PASS 316** prepared, at the final state |
| `dist/` | `npm ci && npm run distfile && diff -rq` **exit 0**; `single.html` `15b44104…5b08` on **both** trees |
| shell / slice battery | **46/0** · **29/0/10/3** |
| build warnings | none |
| CI gate | Actions `44262444359` passed on `1aa7fb3`; cap fix `3363eb0` adds "… and N more (use --full)" |

  Not verified by me: the prepared tree's browser legs (its `dist/` is byte-identical, so 46/0 and 29/0/10/3 carry over — but I ran once); `bash scripts/acceptance-run.sh` end-to-end; the M3 swap tests; the deployed-suite 277/9.

---

## 2 · Ground rules (Inkling's, restated — these are why the c6/c7 packages look the way they do)

1. **You cannot push. One zip, one response. The Owner places it.**
2. **The Architect owns the engine — never touch it, not even to "fix" something.** Cakepanz consumes it as a **frozen snapshot**: byte-identical `colors/src/**` at the named pin into `src/engine/`, plus the five paths (`src/engine/` · `tools/mathlab/flex.json` · `test/engine/` · `test/engine.test.ts` · `data/packs/*.json`). A re-prep copies the five paths byte-identical, regenerates via `scripts/sync_engine_tests.py` + `scripts/precompile-engine.mjs`, and re-runs the checks — the procedure in the newest `SNAPSHOT.md`.
3. **THE RECEIPT LAW.** A receipt is the raw stdout of the tool **at the final state**; if the state changes, the receipt is rewritten. Never ship a FAIL print while claiming PASS. If something is unverifiable it is REPORTED/UNKNOWN and named — never a green you wish you had.
4. **The gate is the gate.** `scripts/gate-manifest.mjs` and `regen-manifest.mjs` self-exclude the receipt layer (`deliveries/receipts/` and `(^|/)gate-manifest-[^/]*\.log$`, in the manifest loop AND the converse walk, both trees, identical bytes). Do not weaken it, re-add exclusions, or bypass it. **Two consecutive gate runs PASS must be pasted.**
5. **Verify against bytes and commands, never memory or prints.** Count files, then hash a sample; `cmp` the flex table. If a number disagrees with what you expect, measure again; if it still disagrees, **STOP and file it — do not fix it.** (The Architect's `clockLate`/`kick_digest` anomaly is the model: he spliced only `rec` and filed the rest.)
6. **Two trees, never confused.** Shipped (`cakepanz-4/`) vs prepared (`cakepanz-4-prepared/`). Door signs name THIS tree's pin, plus the PREPARED-NOT-ACTIVATED banner if prepared. The shipped tree never moves off `5c808472` without the Owner's word.
7. **Both majors.** The engine suite + the node battery run on Node **v24 AND v26**; the VERIFY table lists both. If one major is unavailable, the table says which, and that is reported.
8. **D-1 fresh clone is mandatory when any code moved.** `npm ci` → build → `npm run distfile` → batteries. Fresh `git archive`-style copy; nothing inherited. Even for trivial changes — it is the only cheap D-1 you get every sitting.
9. **Falsifiers F0–F10, every law dies.** Falsifier logs pasted in full. A falsifier that cannot run counts as FAILURE, never as a green light.
10. **English-only; VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim.** Do not re-litigate the Part-E label questions — they are REPORTED and the Owner rules on them.
11. **Zip, one response.** One zip with everything; one response naming what changed, what was NOT re-run and why, and the blocked list verbatim.

---

## 3 · What c7 proved (so you do not redo or break it)

- The gate is robust to its own receipts (PART A); partB rewritten at final state: shipped **311 PASS ×2**, prepared **316 PASS ×2**.
- Prepared door sign names **65673a00 / 68 files / PREPARED, NOT ACTIVATED**; `cakepanz-4-prepared/test/engine/nfl/lineup.test.ts:111` reads `assert.ok(bad.length <= 18, …)` — untouched, keep it that way.
- Engine **394/394** (shipped @ 5c808472) / **406/406** (prepared @ 65673a00); battery:node **31/31** both trees; slice **29/0/10/3**; shell **46/0**; falsifiers **F0–F10 DIED** (Node 24 shipped, Node 26 shipped, Node 24 prepared); D-1 green; M3 logs unchanged.
- Slice 3 complete: the boot rehydration (`src/lib/port/hydrateApp.ts`, corrupt-never-repair, autosave over the engine's own serialize/restore, `sim:nfl:autosave:*` keys) + N25/N26/N27.
- The flex table is the **99-rule** table (17/17/42/23 at 0/2/6/12) in BOTH trees; `SS→NICKEL` stays 0. Do not count rules, never "simplify" it. **If the flex table bytes differ across the two trees, STOP.**

---

## 4 · Scope of this sitting

### Block A — hygiene and receipts (no code; this is the default scope)

**A1 · The doubled RECEIPT LAW sentence.** `START-OF-CHAT-ZAI.md` line 47, in the **package root and the shipped tree** (the two are byte-identical, sha `4f7e16ec…`), carries the sentence **twice on the same line**:

> `**THE RECEIPT LAW (cakepanz-7): a receipt is the raw stdout of the tool at the final state; if the state changes, the receipt is rewritten.** **THE RECEIPT LAW (cakepanz-7): …rewritten.**`

The **prepared** copy carries it once (67 lines, sha `a5f99ae5…`). Make all three byte-identical — **prepared wins** — and note it.

**A2 · `receipts/partC/gh-pages-fix/FIX-RECEIPT.md`** says "the zip carries ONLY those two files". It carries **three** (`README.md`, `CHECKSUMS-slice2.txt`, `FIX-RECEIPT.md` itself). Correct the line to what the zip actually carries, or drop the sentence. **Do not re-cut the zip.**

**A3 · The D-1 headline oversells the log — fix the claim, not the log.** `c7-d1-fresh-clone.log` ends with `exit=1` from the first-attempt browser leg (no preview server; then the strip-only TypeScript attempt). `c7-d1-fresh-clone-browser.log` carries the green re-run. **Leave the failure in place** — Inkling is right that the PROVENANCE NOTE is what makes it honest, and rewriting history is worse than an ugly log. What must change is the **claim**: `README-DELIVERY.md` "D-1 fresh clone green end-to-end" and `START-OF-CHAT-ZAI.md:22` "D-1 fresh clone green end-to-end" should read as **"node side green at final state; browser legs green after a post-clone battery edit"** — or your equivalent, as long as it is true of the log that ships.

**A4 · `scripts/acceptance-run.sh` prints stale expectations.**
- Line 20: `"expect 24/24: 23 carried + N20 the F8 law"` → the battery is **31** laws (33 after Block B).
- Line 46: `"the receipt falsifiers F0–F8"` → **F0–F10**.
Two lines. `README.md` advertises the script as "the whole receipt set in one staged run".

**A5 · `284 tests` survives in two live files.** `README.md:29` and `batteries/slice1.battery.mjs:12` → **394** shipped / **406** prepared. Leave the `CHECKSUMS-slice1/2.txt` and `deliveries/gh-pages-fix/README.md` copies — they are per-slice history, superseded by `FIX-RECEIPT`.

**A6 · The README's shell-battery run line omits the register.** `node batteries/shell.battery.mjs` dies with `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`. It must read `node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs`.

**A7 · The gate count in the docs is not the gate's output.** `SHELL-STATUS.md:21-22` and `VERIFY.txt:69-71`, `:328`, `:375` say **PASS 319** shipped / **PASS 324** prepared. The delivered artifacts print **311** and **316**; `MANIFEST.txt` is 311 and 316 lines. (The 8-file delta is the receipt layer leaving the manifest — correct and expected; the *docs* were not re-quoted at the final state.) `README-DELIVERY.md` is right. Re-quote the numbers the gate prints at the final state, in all four places.

**A8 · The "×2 majors" phrase is loose.** `README-DELIVERY.md` says "falsifiers F0–F10 all DIED ×2 majors"; the logs are Node 24 shipped, Node 26 shipped, **Node 24 prepared** — there is no prepared × Node 26 falsifier log. Either run it or say which three ran (VERIFY §20.7 already does).

**A9 · Re-run the c7 receipts fresh, on this machine, on both majors** — OR state, per item, what is REPORTED-carried-forward and why. Either is accepted; the deliverable is a dual-major table in the shape of VERIFY §20.5, rewritten at this sitting's final state.

**A10 · DELIVER-only verification of §1 against the live refs** — the gh-pages tip, the deployed pin lines, Actions run `44262444359`'s existence and conclusion, `57fb83c`'s existence. Name anything that moved since this brief was written; if a number in §1 is wrong, fix the successor brief, say so, and move on.

**A11 · `START-OF-CHAT-ZAI.md` §2 rewrite** for this sitting — short: hygiene sitting, no engine move, c7 state carried, nothing re-pinned.

**A12 · D-1 fresh clone** mandatory for the doc fixes. Trivial changes — cut the clone anyway. Falsifiers re-run only if code moved; state which it is.

### Block B — the P-316 verification blocker (code; do it in the same sitting if the Owner's delivery instructions include it)

These are **not** in Inkling's hygiene scope. They are here because they are what actually blocks P-316 acceptance, and because the c7 review that closes P-316 cannot close with them open.

**B1 — PRODUCT: a mid-season refresh lands on a blank draft board.**

Draft normally, start the season, play a week, refresh. The season *has* resumed, but the screen is the draft board with nothing on it — topbar and nav only, no error.

```
$ node --import ./scripts/node-port-register.mjs gen-envelopes.mjs <tree> /tmp/midseason-envelopes.json
draft env bytes 187341 | week env bytes 51040 | nextWeek 2 | stepped true
$ node midseason-boot-probe2.mjs 'http://localhost:4179/?dev=1' /tmp/midseason-envelopes.json
{ "screen": "board", "hub": 0, "rows": 0, "err": null,
  "storeStatus": "done", "picks": 1024, "userTeam": 5 }
$ node probe-then-season-nav.mjs ...     # then click SEASON
{ "atBoot": { "screen": "board", "rows": 0, "hub": 0 },
  "afterSeasonNav": { "screen": "hub", "hub": 1, "phase": "running" } }
```

Control: a mid-draft autosave (draft only) hydrates correctly — `{"screen":"board","rows":60,"status":"drafting","picks":121}`. So hydration works; the landing is wrong. (Scripts: `_agents/ernie/deliveries/cakepanz-7-review-2026-11-18/`.)

**Root cause, two compounding faults:**
1. `src/App.svelte:194` — `if (!r.draft) go('hub');`. The hub is reached only when there is *no* draft autosave. `beginSeason()` (199) never calls `clearAutosaveWeek()`; the only call sites are `startDraft` (115) and `loadDraft` (167). Mid-season **both** keys always exist, and `loadDraft()` (193) already did `go('board')`.
2. `src/App.svelte:119-128` — `refresh()` computes `goneOdds(...)` and `boardVM(...)` inside one `try {} catch {}` commented "CPU pick in flight". `goneOdds` **throws for any completed draft** (`done-draft goneOdds THREW: goneOdds: it is not the user's pick`). The catch swallows it, `vmStore` is never set, and `{:else if screen === 'board' && $vmStore}` (342) renders nothing.

**Outcome to satisfy (any shape):**
- refresh mid-season (both autosaves) → **hub**, phase `running`, week restored
- refresh with a done draft and no week → **Complete**, never a blank board
- DRAFT nav with a finished draft → Complete
- refresh mid-draft → board with rows (the control must not regress)

**One shape, two edits:**
```diff
-  function go(s: ScreenId, param?: number | null) { screen = s; navigate(s, param); }
+  function go(s: ScreenId, param?: number | null) {
+    // a finished draft has no "gone" odds and no board to render: the Complete screen owns it
+    if (s === 'board' && store.getState().status === 'done') s = 'complete';
+    screen = s; navigate(s, param);
+  }
@@
-      if (!r.draft) go('hub');
+      go('hub');                                     // a resumed season always lands home
```

**Laws to add (node battery, beside N25):**
- `N28 (RESUME)` — both autosaves present → landing is `hub`, phase `running`. Build the envelopes with your own `hydrateApp.autosaveDraft`/`autosaveWeek` over a completed 1024-pick record + a stepped week.
- `N29 (DONE-DRAFT)` — done draft, no week → landing is `complete`, record rendered.
- Falsifiers: plant the old `if (!r.draft)` → N28 must die; delete the `go()` redirect → N29 must die.

**B2 — LAW TAUTOLOGY: S29 cannot fail.**

`START-OF-CHAT-ZAI.md:19` says S29 was "made phase-blind — the hub may resume from the autosave before the click". That is exactly the problem: with `void hydrateBoot();` deleted, the battery is still **46/0**:

```
$ # delete void hydrateBoot(); from App.svelte, rebuild, re-run the shell battery
   PASS  S29 a saved week comes back through the real UI (...) — hub re-mounted from the week save
== SHELL BATTERY · 46 pass · 0 fail ==
```

The detail string says "hub re-mounted from the week save" — it passed via the manual `RESTORE A SAVED WEEK` fallback. The law's name claims the boot rehydration; its assertion does not test it.

**Fix:** split it.
- `S29` mandatory when an autosave exists: read `localStorage.getItem('sim:nfl:autosave:week') || …draft` before the reload; if either exists, require `resumedHub`.
- `S31` for the manual path only: clear both keys, then require `RESTORE A SAVED WEEK` to bring the hub back.
- Keep `S30` (zero page errors) attached to both.

**Check:** with `void hydrateBoot();` deleted the battery must now **fail**; restored, 47/0 or 48/0. Paste both runs.

**B3 · Both blocks' checks.** Engine suite + `node.battery` (33/33 with N28/N29) on **Node 24 AND Node 26**; shell 46/0 (47/0 or 48/0 after B2) both trees; slice 29/0/10/3; two consecutive gate PASS; a fresh D-1; the falsifier logs in full.

### Block C — re-prep to `57fb83c` — LOCKED, not this sitting

The Owner has **not** said "re-prep". Do not re-activate, do not re-prep, do not touch the prepared tree. If he says so, the target is `57fb83c` (supersedes `65673a00`): five paths byte-identical, `tools/mathlab/flex.json` must be the 99-rule table, regenerate via `sync_engine_tests.py` + `precompile`, full D-1, both majors, door sign with `57fb83c` + PREPARED banner, M3 both directions. The shipped tree stays `5c808472`. **Activation is never this sitting's scope.**

### Block D — carry-forward blockers, NOT YOURS (state verbatim in "blocked, not yours")

1. **gh-pages placement** — the corrected files over `67-cakepanz/` on `gh-pages`, one commit, the Owner's click (VERIFY §20.3 has it verbatim; the zip carries README + CHECKSUMS-slice2 + FIX-RECEIPT).
2. **The deployed suite's 9 red flex expectations** (277/9 measured) — the staged fix deliberately does not touch them; the re-point is the Owner/Architect's decision.
3. **Prepared re-pin ACTIVATION** (any pin) — the Owner's word only.
4. **Part-E label questions** — "Model Value" (shell) vs "Value" (w89); "Engine Value" is OUT by the Owner's 2026-11-17 ruling; the 2PT chip ("2PT / 2PT FAIL" in `feedVM.ts` vs "2-Pt Conv" in w89); dark `--text` 3.17:1; light gold2 1.65:1; Bodoni Moda. All untouched.
5. **The CI gate itself** — you never modify, weaken, or "fix" workflow files.
6. **The Architect's tree, engine, flex table, lambda default (0), yards-node decision.**

### Block E — what not to do, ever

- No activation, no placement, no re-pin without the Owner's word — silence is never approval.
- No edits to the Architect's tree to match an expectation of yours; any seam in his numbers is filed, not fixed.
- No merging, rebasing, force-pushing, branch creation; read GitHub over HTTPS only.
- No weakening the gate, the falsifiers, or the receipts' honesty to make a count come out.
- No re-opening settled questions (measured / label / flex / 2PT / default-off).

---

## 5 · Deliverable

One zip: the two trees (or shipped-only if only Block A ran — say which), `receipts/`, the rewritten `START-OF-CHAT-ZAI.md`, VERIFY additions (or a short VERIFY addendum if c7's stands untouched), MANIFEST/CHECKSUMS, and the gh-pages-fix zip unchanged under `deliveries/gh-pages-fix/`.

One response, English, listing: what you ran and got; what you did not run and why; what is REPORTED vs VERIFIED vs UNKNOWN; the Block A fixes; explicitly that nothing was placed, activated, or pushed and no gate was weakened; and the Block D list verbatim.

## 6 · What I will do when it lands

Re-run the §1 table; re-run the B1 reproduction against your fixed build; re-run the B2 mutation; and check A1–A12 against the shipped bytes. Green on those → P-316 verified, the cakepanz-7 review closes as `ok`, and the only remaining c7 red is Owner/Architect-gated.

## 7 · If you disagree, file it — do not silently do something else

Three places I expect legitimate disagreement:

- **B1's shape.** Fixing `refresh()` so a done draft renders a real VM is also correct — but the mid-season landing still has to be the hub, and the law has to say so.
- **A3.** I would leave the log and fix the README's claim; Inkling agrees. If you would rather re-cut the D-1 log, say why in the response — but do not do both.
- **Whether Block B is in this sitting at all.** Inkling's brief is hygiene-only by design. If the Owner's delivery instructions say hygiene only, do Block A and file B1/B2 as the next sitting's brief. What must not happen is B1 shipping unrecorded: it is a user-visible defect in the build the Owner is about to play.