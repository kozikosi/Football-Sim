# DS review receipts — 67-cakepanz-8.1-2026-11-18

Machine: Owner's Mac (macOS 15.6), Node v26.13.0, npm 11.20.0, Playwright 1.57.0 (chromium-1200 cached),
git 2.39.5. All runs on 2026-11-18, in scratch copies of the pushed package
(`_agents/ds/deliveries/67-cakepanz-8.1-2026-11-18/`, branch `council/ds`, commit `9ac66840`), never in the
Owner's Desktop folder. Each tree installed with `npm ci` (exit 0; only the fsevents install-script warning).

## R1 · the pins (git archive of the pins vs the trees' src/engine)

    $ git archive 5c808472 colors/src | tar -x -C pin-5c8
    $ diff -rq pin-5c8/colors/src cakepanz-4/src/engine            -> (no output) exit 0
    $ git archive 65673a00 colors/src | tar -x -C pin-656
    $ diff -rq pin-656/colors/src cakepanz-4-prepared/src/engine   -> (no output) exit 0
    $ find pin-5c8/colors/src -type f | wc -l                       -> 67
    $ find pin-656/colors/src -type f | wc -l                       -> 68

## R2 · the flex table (sha + census + cmp vs the Architect's live table)

    $ shasum -a 256 cakepanz-4/tools/mathlab/flex.json cakepanz-4-prepared/tools/mathlab/flex.json
    76c02c659880e218d85aac335b5489848cdc3903877b5d7836201fd1db846a6a  (both)
    $ git show origin/architect/engine-and-seats:tools/mathlab/flex.json > architect-flex.json
    $ shasum -a 256 architect-flex.json
    76c02c659880e218d85aac335b5489848cdc3903877b5d7836201fd1db846a6a
    $ cmp architect-flex.json cakepanz-4/tools/mathlab/flex.json    -> exit 0
    $ node -e 'census'  -> rules 99 {"0":17,"2":17,"6":42,"12":23}
      SS>NICKEL 0 · FB>TE 2 · FB>RB 2 · C>OG 6 · OG>C 2 · QB>FS 12

## R3 · the engine suite (the pin's own test/engine.test.ts)

    $ cd cakepanz-4 && node --test --experimental-strip-types test/engine.test.ts
    pass 394 · fail 0 · exit 0
    $ cd ../cakepanz-4-prepared && node --test --experimental-strip-types test/engine.test.ts
    pass 406 · fail 0 · exit 0

## R4 · the node battery (precompile + the Part-D register)

    $ cd cakepanz-4 && node scripts/precompile-engine.mjs
    engine-node: generated 67 files (1 transformed: platform/localstorage.ts) — snapshot untouched
    $ node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs
    tests 33 · pass 33 · fail 0
    $ cd ../cakepanz-4-prepared && node scripts/precompile-engine.mjs
    engine-node: generated 68 files (1 transformed: platform/localstorage.ts) — snapshot untouched
    $ node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs
    tests 33 · pass 33 · fail 0

## R5 · the manifest gates + the numerals gate

    $ cd cakepanz-4 && node scripts/regen-manifest.mjs
    regen: 314 entries ; boot target: 2 referenced asset(s) checked against the manifest
    $ node scripts/gate-manifest.mjs
    gate-manifest: PASS (314 entries verified, dist/ covered, converse clean)  exit 0
    $ node scripts/gate-numerals.mjs
    gate-numerals: CLEAN ×2 (old pin named only in correction context; no unfilled markers)  exit 0
    $ cd ../cakepanz-4-prepared && node scripts/regen-manifest.mjs
    regen: 319 entries
    $ node scripts/gate-manifest.mjs
    gate-manifest: PASS (319 entries verified, dist/ covered, converse clean)  exit 0
    $ node scripts/gate-numerals.mjs
    gate-numerals: CLEAN ×2 ...  exit 0

## R6 · the dist rebuilds to the claimed bytes, in BOTH trees

    $ cd cakepanz-4 && npm run distfile
    dist/assets/index-j5BYxHP8.css · dist/assets/index-BRWBzK_6.js · single-file 515.6 KB, no external refs: true
    $ shasum -a 256 dist/single.html
    4ce69205b72a8f33bdb6015ec95c3abf317748730c22000eb1bdd592e507057a
    $ cd ../cakepanz-4-prepared && npm run distfile
    same asset names, same size
    $ shasum -a 256 dist/single.html
    4ce69205b72a8f33bdb6015ec95c3abf317748730c22000eb1bdd592e507057a

## R7 · the browser batteries (vite preview + the Part-D register)

    $ (vite preview --port 4179) ; cd cakepanz-4 && CP_PORT=4179 node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs
    == SHELL BATTERY · 47 pass · 0 fail ==   (S29 boot path PASS, S31 manual PASS, S30 zero errors PASS)
    $ CP_PORT=4179 node --import ./scripts/node-port-register.mjs batteries/late.battery.mjs
    == LATE BATTERY (P-337) · 9 pass · 0 fail ==
      L1 10th full / 11th simple + note · L2 anatomy + sort walk (PRIO +0.3 = vm, WINS +0.5 = vm)
      L7 open regions=1 chips=1 lbl="OVR 77 · priority +0.2 · fills QB" · L5 390/390 both forms
      L3 door stays full · L4 vm sha 28bd44847f5a identical both forms
      L9 after reload form=full restoredPicks=12 status=drafting · new draft 10th full, 11th simple
      L8 the 32nd pick through the real UI → complete, record=true, hash door #/board → #/complete
      L6 zero page errors
    $ (vite preview --port 4180) ; cd cakepanz-4-prepared && CP_PORT=4180 node --import ./scripts/node-port-register.mjs batteries/slice1.battery.mjs
    == SLICE 1 BATTERY · 29 pass · 0 fail · 10 skip (loud, with reasons) · 3 deferred to cutover ==

## R8 · the late falsifier (five staged builds, plant-apply-asserted)

    $ cd cakepanz-4 && node --import ./scripts/node-port-register.mjs scripts/falsify-late.mjs
    F0-late clean baseline · unmutated late battery green · == LATE BATTERY (P-337) · 9 pass · 0 fail ==
    F13-late 10th-pick flip law · mutation: simple-mode planted ALWAYS-ON · DIED — FAIL L1
    F14-late one-click detail law · mutation: the simple-row detail block deleted · DIED — FAIL L7
    F15-late last-pick law · mutation: the go('complete') handoff deleted · DIED — FAIL L8
    F16-late reload law · mutation: the fullBoard restore deleted · DIED — FAIL L9
    exit 0

## R9 · THE NEW DEFECT (D1): a mid-season boot DELETES the week autosave; the second reload lands on Complete

Fixture: the real mid-season pair (a done draft + a season two weeks in), built by `probe-gen-envelopes.mjs`
(the N28 fixture, unmodified app code):

    $ node --import ./scripts/node-port-register.mjs probe-gen-envelopes.mjs
    draft picks 1024 status done
    wrote envelopes; nextWeek = 3 bytes 187326 52533

Probe `probe-two-reload.mjs` (Playwright, unmodified cakepanz-4 build on :4179): inject both envelopes into
localStorage, then three reloads, printing the hub/complete state and the autosave keys after each:

    {"label":"boot1 (the A1 law: both autosaves -> hub)","hub":1,"hubPhase":"running","complete":0,
     "keys":["sim:nfl:autosave:draft"],"hash":"#/hub"}
    {"label":"boot2 (a second reload, nothing changed: the season must still be there)","hub":0,
     "hubPhase":null,"complete":1,"h1":"Your draft is complete","keys":["sim:nfl:autosave:draft"],"hash":"#/complete"}
    {"label":"boot3 (third reload, belt and braces)","hub":0,"complete":1,"hash":"#/complete"}
    {"verdict":{"leg1_hub":true,"week_key_after_boot1":false,"leg2_still_hub":false,
                "leg2_complete":true,"leg3_still_hub":false,"pageErrors":[]}}

Root cause (code): `loadDraft()` calls `void clearAutosaveWeek()` unconditionally; `hydrateBoot()` calls
`loadDraft(r.draft.record, r.draft.lineage)` BEFORE applying `r.week`, and nothing on the resume path
re-writes the week autosave (`autosaveSeasonNow` runs on begin/step/restoreSeason/save, never on boot).
So the first boot resumes the season in memory and deletes its save; the next boot finds only the done draft.

The candidate fix (applied in a scratch copy ONLY, never to the delivered trees) — `keepWeek` on loadDraft:

    function loadDraft(record, lineage, opts: { keepWeek?: boolean } = {}) { ... }
    if (!opts.keepWeek) void clearAutosaveWeek();
    // hydrateBoot:
    if (r.draft) loadDraft(r.draft.record, r.draft.lineage, { keepWeek: !!r.week });

Rebuilt (`npm run distfile`, exit 0) and re-probed on :4181 at the same fixture:

    boot1 hub=1 keys=[draft, week] · boot2 hub=1 keys=[draft, week] · boot3 hub=1 keys=[draft, week]
    verdict leg1_hub true · week_key_after_boot1 true · leg2_still_hub true · leg3_still_hub true · pageErrors []

## R10 · THE NEW DEFECT (D2): at 390px the gone% tooltip sits ON TOP of the detail's chips (a tap cannot land)

`probe-ds-hit.mjs` (390×844, hasTouch): open the first row, then `document.elementFromPoint` at the chip's centre:

    {"form":"full",
     "det":{"x":25,"y":453,"w":340,"h":39}, "detVisible":true,
     "chip":{"x":89,"y":457,"w":97,"h":25,"cx":138,"cy":469}, "chipVisible":true,
     "tip":{"x":99,"y":451,"w":262,"h":101}, "tipVisible":true,
     "atChipCentre":{"tag":"SPAN","cls":"cp-gonetip svelte-q412k","text":"GONE% — how often the CPU took him befor"},
     "scrollW":390,"clientW":390}

The same in the SIMPLE form at 390 (10 real UI picks at 1180, then resize), `probe-ds-hit-simple.mjs`:

    {"formBeforeResize":"simple","form":"simple",
     "det":{"x":25,"y":730,"w":340,"h":39}, "detVisible":true,
     "tip":{"x":16,"y":720,"w":262,"h":101}, "tipVisible":true, "chips":1,
     "hits":[{"text":"Draft at TE1","box":{"cx":276,"cy":746},
              "hit":{"tag":"SPAN","cls":"cp-gonetip svelte-q412k"}}],
     "scrollW":390,"clientW":390}

At 1180 the same probe returns `"atChipCentre":{"tag":"BUTTON","cls":"cp-chip cp-primary","text":"Draft at QB"}`
— the collision is a phone-width defect (the tooltip is 262 px wide, right-anchored, and the same tap that
opens the detail also focuses the row button, which is what displays the tooltip: `.cp-main:focus .cp-gonetip`).

Playwright could not click the chip at 390 (`locator.tap` retried until timeout; the log names
`<span role="tooltip" class="cp-gonetip"> ... intercepts pointer events`). L7 asserts the detail's PRESENCE
(regions=1, chips=1) — never that a chip in it can be clicked.

## R11 · also checked (no finding)

- `BoardRow.svelte` REC map is exhaustive over `BoardSort = 'wins' | 'ovr' | 'priority'` and SortControls
  offers exactly those three — no undefined lookup.
- `settings.ts` validation `p.fullBoard === true` defaults an OLD settings blob (no field) to false — backward
  compatible; `startDraft` resets, `loadDraft` keeps (as documented).
- The simple row's caption is a `title` + `aria-label` on a `<span>`; a generic span has no ARIA name role,
  so AT support is unreliable (a visually-hidden text node is the robust pattern) — calibration, not a blocker.
- The gone% tooltip `<span role="tooltip">` is INSIDE the row `<button>`, so every row's accessible name
  carries the two-sentence method text ("Joe Burrow QB ... GONE% — how often the CPU took him ..."). Real
  a11y defect, cheap fix (`aria-hidden="true"` + `aria-describedby` on the gone cell, or move it out).

## R12 · the acceptance composite (L10) — closed at the delivered bytes

`bash scripts/acceptance-run.sh` in a fresh copy of `cakepanz-4` (the exact delivered source, npm ci from its own
lock): **PASS end-to-end — 18/18 steps EXIT_CODE=0, "ACCEPTANCE RUN COMPLETE — every step exit 0", exit 0.**
The regenerated file: `receipts/c81-acceptance-run-shipped.txt` (360 lines, 26,894 B, sha256
`0b0dab7be0d3b44748296f888bfcd064a51f18acd571b11be11a6798bcaea313`); stdout: `receipts/c81-acceptance-run-stdout.txt`.
Its own rebuild produced `dist/single.html` = `4ce69205…e507057a` (the fourth reproduction of the delivered sha).
Inside the one uninterrupted run: engine 394 · node 33 · slice 29/0/10/3 · shell 47/0 · late 9/9 · F0–F12 ALL DIED
· FA/FB/FC ALL DIED · F0-late 9/9 + F13–F16 ALL DIED · regen 314 → PASS(314) · numerals CLEAN ×2.
