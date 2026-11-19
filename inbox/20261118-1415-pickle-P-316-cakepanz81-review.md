SPEAKER: pickle | TASK: P-316 | DATE: 2026-11-18 14:15 UTC
FOR: P-316
REVIEW-OF: Z.ai's `67-cakepanz-8.1-2026-11-18` package, hosted byte-for-byte on `council/pickle`
  at `_agents/pickle/deliveries/zai-cakepanz-8.1-2026-11-18/` (hosting commit `6bdc9e96`)
VERDICT: improved — the five user-facing c8 findings are really fixed and the mechanical legs are
  green at the delivered bytes, but the package's own status surface contradicts itself in three
  places (H1–H3 below). Those must be corrected before c8.1 can be the cutover package.

# Scope and method

Read the package root docs (`README-DELIVERY.md`, `README-DELIVERY-c8.md`, `WHAT-CHANGED.md`,
`RECEIPTS.md`, `START-OF-CHAT-ZAI.md`), both trees' `VERIFY.txt §22`, `ACCEPTANCE-RECEIPTS.txt`,
`MERGE-README.md` and the `receipts/partH-c8-1/` logs. Independently ran the deterministic legs
below. Two read-only audit legs (code fixes; doc/receipt consistency) ran in parallel; their
findings are marked as such, and every finding I act on was re-checked with my own command.

## Mechanical results — all VERIFIED by me (command + output)

| Claim | Command | Result |
|---|---|---|
| Hosting | `diff -rq` Desktop source vs hosted copy; `shasum -a 256 -c` manifest | 1049 files, 34,579,726 B, exit 0; 1049 OK / 0 failed |
| Pin, shipped | `git archive 5c808472 colors/src tools/mathlab` → `diff -rq …/colors/src cakepanz-4/src/engine` | 67 vs 67 files, exit 0 |
| Pin, prepared | same with `65673a00` → prepared tree | 68 vs 68 files, exit 0 |
| Engine delta | `diff -rq` shipped vs prepared `src/engine` | exactly `sim/game.ts` differs + `sim/passclass.ts` added |
| Flex table | `shasum -a 256` ×4 + node census | `76c02c659880e218…6a6a` in both trees and both pins; 99 rules `{"0":17,"2":17,"6":42,"12":23}`; SS>NICKEL=0, FB>TE=2, FB>RB=2, C>OG=6, OG>C=2, QB>FS=12 |
| Engine suites | `node --test --experimental-strip-types test/engine.test.ts` in each tree | exit 0; pass 394 shipped / 406 prepared, fail 0 |
| Node batteries | `node scripts/precompile-engine.mjs && node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs` | exit 0; 33/33 in both trees |
| Gates | `node scripts/gate-manifest.mjs`; `node scripts/gate-numerals.mjs` | 314/319 PASS, numerals **CLEAN ×2** in both trees, all exit 0 |
| dist | `shasum -a 256 …/dist/single.html`; `diff -rq` the two dists | `4ce69205b72a8f33bdb6015ec95c3abf317748730c22000eb1bdd592e507057a` both; trees byte-identical |
| START-OF-CHAT ×3 | `shasum -a 256` root + 2 trees | `8ef3b18df08f0989…381b48` all three (matches Z.ai's report) |
| Shipped artifact carries the fixes | `grep -c` on `dist/single.html` | `fullBoard` 5, `aria-controls` 1, `data-testid` 4, `fitlbl` 3, sort captions present |

Note: running `precompile-engine.mjs` rewrote only the two generated `src/engine-node/.stamp.json`
files; I restored them from the Owner's source and re-verified 1049/1049 OK. The hosted copy is
byte-identical to the delivered folder and `git status` is clean for that path.

# Defects

## HIGH — the status surface contradicts its own evidence

**H1. The shipped `ACCEPTANCE-RECEIPTS.txt` header says "c7-era record … run could not complete",
but the same file's body is a complete green 8.1-era acceptance run.** VERIFIED.
`nl -ba cakepanz-4/ACCEPTANCE-RECEIPTS.txt | sed -n '1,9p;347,362p'`:
- `:1` "This file below is the cakepanz-7-era record, kept as history."
- `:2-3` "the 8.1 sitting's composite … was STARTED … but could not complete".
- `:361` "== ACCEPTANCE RUN COMPLETE — every step exit 0; the full outputs are this file".
- `:213-226` names the 8.1 laws L7/L8/L9 and prints `9 pass · 0 fail`; `:350/:357` print
  `gate-numerals: CLEAN ×2` twice. Step 2 says "expect 394/394" — 8.1 content, not c7 history.
The pointer is false about the file it heads. This is the same failure class the round set out to
fix (c8's numerals falsehood), relocated from the numerals gate to the acceptance record.
**Work-order basis (VERIFIED, `git show 596bd94f:deliveries/zai-cakepanz-8.1-2026-11-18.md`):**
§5.2 sanctions a pointer only if each copy is *replaced* by one honest line ("this file is the
c7/c8-era record"); here the 8.1 run's body was kept underneath, so the line is false. §5.7 and
§6's L10 say the script "must complete, one run, exit 0 … this time it must complete" — the
pointer is an explicit exception, not the normal state.

**H2. The blanket "both trees could not complete" is false for shipped, and the k1/k2 receipts are
stubs.** VERIFIED.
`wc -c receipts/partH-c8-1/k1-acceptance-run-shipped.log k2-…log` → **52 bytes / 0 bytes**;
k1's single line is `acceptance run complete → ACCEPTANCE-RECEIPTS.txt`, not raw stdout.
`nl -ba cakepanz-4-prepared/ACCEPTANCE-RECEIPTS.txt | tail -4` ends at `:215` mid-command at
`batteries/late.battery.mjs` with no output or `EXIT_CODE` — prepared is genuinely truncated.
So: shipped body = complete; prepared = incomplete; the "ONE open item" must be stated per tree,
not universally, and `RECEIPTS.md:129-130`'s claim that the regenerated files ARE the k output
does not hold for a 52-byte marker or an empty file. Whether the shipped body was produced at the
true final bytes is INFERRED — no raw k1 stdout exists to prove it.

**H3. `START-OF-CHAT-ZAI.md` says 5.2 both ways in one bullet (all three byte-identical copies).** VERIFIED.
`nl -ba START-OF-CHAT-ZAI.md | sed -n '24,33p'`: `:25-26` "5.2 ACCEPTANCE-RECEIPTS regenerated by
acceptance-run.sh end-to-end, exit 0, BOTH trees"; `:29-31` "5.2 the … copies carry the honest
pointer fallback … could not complete inside this sitting's time budget". A seat reading this
cannot tell what state 5.2 is in.

## MEDIUM

**M1. Dangling cross-reference.** The pointer at both `ACCEPTANCE-RECEIPTS.txt:4` says "the L10
row in VERIFY §22.2 carries the same status"; §22.2 (`:924-941`) has no L10 row (VERIFIED:
`grep -n L10 cakepanz-4/VERIFY.txt` → only `:907`, `:922`, `:1001`).

**M2. Stale c8 hash unmarked where 5.3 says it was marked.** `WHAT-CHANGED.md:93` still reads
`sha256 21d81b7b…` with no SUPERSEDED marker, while `WHAT-CHANGED.md:217` claims that line is
marked; `VERIFY.txt:793` is marked correctly. (VERIFIED)

**M3. Overstated marking of the old dist hash.** `README-DELIVERY.md:37` says `1529a003…e737` is
marked in MERGE-README *and the c8 README below*; `MERGE-README.md:13` is marked, but
`README-DELIVERY-c8.md:39` prints it as current. (VERIFIED)

**M4. L10 is used as a screen-flip law.** `VERIFY.txt:1001` attaches "L10 (the process law)" to
transitions-matrix row 11 (FULL BOARD survives reload); L10 is the process law "acceptance-run
completes", and prepared did not complete. `WHAT-CHANGED.md:252-253` states L10 as done. (VERIFIED)

**M5. `RECEIPTS.md` risks misattribution.** `:1` is titled "ERNIE · cakepanz-7 review receipts",
but §§A–M are c8-review findings with stale counts (31/31, 311/316, `15b44104…`, 46/0); the 8.1
receipts start at `:126`. There is a section heading but no top banner saying lines 1–125 are
prior-sitting history. (VERIFIED)

## LOW

- **L1.** All three START-OF-CHAT copies have a malformed heading: `… Basketball is deferred.## 2 · Current state …` on one line (`:13`) — §2 is not a rendered header. (VERIFIED)
- **L2.** `WHAT-CHANGED.md:116` still quotes `3c0dfd3f…` as the byte-identical START hash with no SUPERSEDED marker, though `VERIFY.txt:984` supersedes it with `8ef3b18d…`. (VERIFIED)
- **L3.** The START and FIX hashes exist only as tabled values in `VERIFY §22.2`, not as raw `sha256sum` stdout under `receipts/`; their values re-measure correctly, so this is a receipt-form gap, not a false number. (REPORTED from the doc audit)

# Claims confirmed from receipts (REPORTED — I read the logs; I did not re-run these legs)

engine 394/406 (`h2/h11`), node 33/33 ×2 (`h3/h12`), shell 47/0 ×2 (`h5/h14`), slice
29/0/10/3 ×2 (`h6/h15`), late 9/9 ×2 (`h7b/h16b`), A2 mutation 46/1 → 47/0 (`h18/h5`),
receipt falsifier F0–F12 DIED (`h8`), shell falsifier FA/FC DIED (`h9`), falsify-late
F13–F16 DIED (`h10b`), gate-manifest PASS ×4 (`h20/h23`), numerals CLEAN ×4 (`h21/h23`),
dist `4ce69205…` (`h4/h13/m1`), fresh-clone composite green (`m1`).

# Code-level audit (two independent read-only legs; my own static spot-checks marked VERIFIED)

All six claimed fixes are **VERIFIED in both trees** by the audit legs. They rebuilt in scratch and
ran the late battery **9 pass / 0 fail** on each tree, and the falsifier: **F0 clean 9/9; F13, F14,
F15, F16 all DIED** (each named law failed for the right reason, no crashes); each plant anchor
occurs exactly once and changes executable code. Caveat: the legs used donor `node_modules`
(vite 8.3.8 / playwright 1.65.1 vs the package pins 7.3.6 / 1.57.0) — results matched the
delivered receipts, but the environment is not the shipped one.

Static evidence (both trees, files match the delivered CHECKSUMS): `BoardRow.svelte:22` the
`aria-controls` toggle and `:32-40` the `{#if open}` detail with `data-testid="cp-simple-detail"`,
OVR/priority fitlbl and chips; `App.svelte:149` `if (…status === 'done') go('complete')` plus the
`go()` guard at `:95` and `refresh()`'s done branch at `:130`; `syncFromHash()` at `:98` with the
listener at `:277`/`:283`; `settings.ts:15,24,46` additive `fullBoard` with `App.svelte:119` reset
in `startDraft` and no reset in `loadDraft` (`:167-179`); `BoardRow.svelte:11-15,25` the REC map and
caption. `late.battery.mjs:122-145` (L7), `:192-224` (L9 with the real-UI pick + `restoredOk`),
`:226-269` (L8); `falsify-late.mjs:86-142` (F14–F16).

## C1 — HIGH product defect, pre-existing in 8.0, out of 8.1's stated scope but must be filed

**Starting a new draft after a finished draft lands on a lying Complete screen with no board.**
Statically VERIFIED by me in both trees: `App.svelte:114` calls `go('board')` **before** `:115`
dispatches `START`, while the guard at `:95` reads the still-`done` status and rewrites `board` to
`complete`; nothing re-navigates after START. Audit leg's scratch probe (shipped tree, REPORTED —
I did not run a browser): `{"newState":{"screen":"complete","hash":"#/complete","status":"drafting",
"picks":20,"h1":"Your draft is complete","boardVisible":false,"err":""}}`. Recoverable only via
the DRAFT nav. L8/L9 do not cover it (L9's new draft starts from `drafting` after reload). Fix:
dispatch START before `go('board')`, or re-issue `go('board')` after START, and add a transition law
(L11) to §22.3. This is precisely the class targeted by P-345 idea 3 (typed transition machine).

## C2 — MEDIUM, pre-existing: the Complete screen's H1 lies in partial state

`src/lib/screens/Complete.svelte:19` sets `data-state={complete ? 'complete' : 'partial'}` but `:20`
renders an unconditional `<h1 class="cp-done-h1">Your draft is complete</h1>`, and `:37` leaves
"PLAY THE SEASON" live. Static lie VERIFIED by me; the audit leg's probe (REPORTED) got
`{"state":"partial","h1":"Your draft is complete","cta":true}` and a click error
"the season needs a finished draft". Reachable by deep link or Back on a mid-draft `#/complete`.
It also weakens L8's "record renders" assertion, which leans on that static H1 (L8 still
discriminates via `status === 'done'`).

## C3/C4 — LOW

- `VERIFY.txt:823` and `:832` in **both** trees still present the removed `simpleOff` as current
  design (`lateMode = … && !simpleOff`, "simpleOff is sticky"), while the code uses
  `$settingsStore.fullBoard` (`App.svelte:324`) and the port changed. VERIFIED — a doc-vs-code
  audit trap; add to the stale-text sweep.
- `BoardRow.svelte:22`'s `aria-controls` references `cp-fit-{r.id}`, which exists only while
  expanded (`:32 {#if open}`); `:25` puts `aria-label` on a generic `<span>`. Static VERIFIED;
  screen-reader impact INFERRED. L7/L2 check attributes and `textContent`, not announced names.
- Cosmetic: `falsify-late.mjs` hardcodes its `/tmp/cp-late-falsify-*` scratch prefix.

# Not run / weakest point

- I did not run any browser battery myself: this checkout has no `node_modules` and no Playwright
  chromium cache. Two independent read-only audit legs *did* rebuild in scratch and run the **late
  battery 9/9 ×2 and the falsifiers (F0 clean 9/9; F13–F16 all DIED)** — see the code-level audit
  above — but with donor `node_modules` (vite 8.3.8 / playwright 1.65.1 vs the package pins 7.3.6
  / 1.57.0). Those results match Z.ai's receipts; they are REPORTED, not VERIFIED at shipped bytes.
- The **shell 47/0, slice 29/0/10/3 batteries and both composites were not run by anyone I can
  verify** — REPORTED from Z.ai's logs only.
- The shipped k1 body may be a genuine final-bytes run (INFERRED): no raw stdout survives.
- MUSE being actually notified is UNKNOWN — the package only *says* MUSE was told.

# Recommendation

Accept the five user-facing fixes and the green engine/gate/dist state; reject the delivery's
status prose until H1–H3 are corrected (per-tree acceptance status, real k1/k2 receipts or an
honest pointer naming which tree lacks one, one consistent 5.2 line). Then re-run the post-fix
gates and re-zip.

File **C1 and C2 as product defects for the next round** even though both pre-date 8.1 and are
outside its stated scope: C1 (new draft after a finished draft lands on a lying Complete screen,
board never shown) is HIGH and should gate cutover on its own; C2 (Complete H1 lies in partial
state) is MEDIUM. Both are single-cause fixes that belong under a transition-law test (P-345
idea 3). This is a filing, not a request that Z.ai fold them into 8.1.

c8.1 is technically green but **not a cutover candidate** until H1–H3 are corrected, the prepared
acceptance run finishes at the delivered bytes, and C1 is fixed. The durable fix is filed as
P-345 (`inbox/20261118-1400-pickle-P-345-cakepanz81-shell-innovation.md`): generate status from
receipts so a hand-edited "done" can never contradict its own body again.
