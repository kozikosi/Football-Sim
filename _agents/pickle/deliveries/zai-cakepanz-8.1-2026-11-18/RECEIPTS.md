# ERNIE · cakepanz-7 review receipts · 2026-11-18

## A · PINS (diff -rq vs a worktree checkout of each pin)
$ git worktree add --detach --no-checkout /tmp/wt-5c8 5c808472 && (cd /tmp/wt-5c8 && git checkout HEAD -- colors/src ...)
$ diff -rq /tmp/wt-5c8/colors/src cakepanz-4/src/engine
exit=0  (67 files each)
$ diff -rq /tmp/wt-656/colors/src cakepanz-4-prepared/src/engine
exit=0  (68 files each)
$ cmp /tmp/wt-5c8/tools/mathlab/flex.json cakepanz-4/tools/mathlab/flex.json && cmp /tmp/wt-656/tools/mathlab/flex.json cakepanz-4-prepared/tools/mathlab/flex.json && cmp /tmp/wt-5c8/tools/mathlab/flex.json /tmp/wt-656/tools/mathlab/flex.json
all exit=0
$ node -e 'flex rule census'
total 99 {"0":17,"2":17,"6":42,"12":23}
at 0: RB>FB TE>FB OT>FB OG>FB C>FB DT>FB EDGE>FB ILB>ILB ILB>FB OLB>OLB OLB>FB SS>NICKEL SS>DIME FS>NICKEL FS>DIME CB>NICKEL CB>DIME
at 2: FB>RB FB>TE OT>OG OT>C OG>OT OG>C EDGE>DT EDGE>OLB ILB>OLB ILB>SS SS>FS SS>OLB FS>SS CB>FS CB>SS K>P P>K

## B · SUITES (node v26.13.0, this machine)
$ cd cakepanz-4 && node --test --experimental-strip-types test/engine.test.ts | tail -6
tests 394 / pass 394 / fail 0
$ cd ../cakepanz-4-prepared && node --test --experimental-strip-types test/engine.test.ts | tail -6
tests 406 / pass 406 / fail 0
$ node scripts/precompile-engine.mjs && node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs | tail -8
shipped: tests 31 / pass 31 / fail 0 (N25,N26,N27 green)
prepared: tests 31 / pass 31 / fail 0

## C · GATES (at the final state)
$ cd cakepanz-4 && node scripts/gate-manifest.mjs
gate-manifest: PASS (311 entries verified, dist/ covered, converse clean)  exit=0
$ cd ../cakepanz-4-prepared && node scripts/gate-manifest.mjs
gate-manifest: PASS (316 entries verified, dist/ covered, converse clean)  exit=0

## D · DIST REPRODUCES BYTE-FOR-BYTE
$ npm ci   (41 packages, exit 0)
$ cp -R tree /tmp/rebuild && cd /tmp/rebuild && npm run distfile
dist/assets/index-CHpq41uS.css · dist/assets/index-DsG2PtP2.js · single.html 511.1 KB
$ diff -rq /tmp/rebuild/dist cakepanz-4/dist
exit=0
$ shasum -a 256 /tmp/rebuild/dist/single.html cakepanz-4/dist/single.html
15b4410469577365d42b13d3a5db8a149aed40bbd52e956ae57a6dd8df785b08  (both)
$ diff -rq /tmp/rebuild2/dist cakepanz-4-prepared/dist
exit=0  (the prepared tree rebuilds to the SAME bytes — the passclass node is tree-shaken)

## E · BROWSER BATTERIES (playwright 1.57.0, chromium 1200, vite preview)
$ node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs
== SHELL BATTERY · 46 pass · 0 fail ==
$ node --import ./scripts/node-port-register.mjs batteries/slice1.battery.mjs
== SLICE 1 BATTERY · 29 pass · 0 fail · 10 skip · 3 deferred ==

## F · S29 IS A TAUTOLOGY (the finding)
$ # delete the boot rehydration, rebuild, re-run the shell battery
$ grep -c 'void hydrateBoot();' src/App.svelte   # 1 -> replaced by a comment
$ npm run distfile   # exit 0
$ CP_PORT=4180 node --import ./scripts/node-port-register.mjs batteries/shell.battery.mjs
PASS  S29 a saved week comes back through the real UI ... — hub re-mounted from the week save
== SHELL BATTERY · 46 pass · 0 fail ==

## G · MID-SEASON REFRESH LANDS ON A BLANK BOARD (the finding)
$ node --import ./scripts/node-port-register.mjs /tmp/gen-midseason-envelopes.mjs /tmp/rebuild2 /tmp/midseason-envelopes.json
draft env bytes 187341 | week env bytes 51040 | nextWeek 2 | stepped true
$ node midseason-boot-probe2.mjs 'http://localhost:4179/?dev=1' /tmp/midseason-envelopes.json
{ "screen": "board", "hub": 0, "rows": 0, "err": null, "storeStatus": "done", "picks": 1024, "userTeam": 5 }
$ node probe-then-season-nav.mjs 'http://localhost:4179/?dev=1' /tmp/midseason-envelopes.json
{ "atBoot": { "screen": "board", "rows": 0, "hub": 0 }, "afterSeasonNav": { "screen": "hub", "hub": 1, "phase": "running", "text": "THE SEASON · CHICAGO BEARS · WEEK 2 ..." } }

## H · CONTROL: MID-DRAFT HYDRATION WORKS
$ node midseason-boot-probe2.mjs 'http://localhost:4179/?dev=1' /tmp/middraft-envelopes.json
{ "screen": "board", "rows": 60, "err": null, "storeStatus": "drafting", "picks": 121, "userTeam": 6 }

## I · ROOT CAUSE
$ node /tmp/goneodds-check.mjs /tmp/rebuild2
mid-draft goneOdds OK, picksBetween 50
status now done picks 1024
done-draft goneOdds THREW: goneOdds: it is not the user's pick

## J · SLICE-3 LAWS ARE FALSIFIABLE (my probe, both trees)
```
$ node ../cakepanz-7-review-2026-11-18/falsify-slice3.mjs cakepanz-4
F0 clean baseline · unmutated node battery exit 0 · baseline OK
F11 HYDRATE law      · mutation: the boot stops calling hydrateBoot · DIED — ✖ N25 (HYDRATE, Slice 3)
F12 gone-tooltip law · mutation: the gone cell hardcodes 50% · DIED — ✖ N26 (Slice 3)
F13 my-needs law     · mutation: the sticky row reads an empty set · DIED — ✖ N27 (Slice 3)
F14 gone-tooltip method · mutation: the tooltip hardcodes "50% of the time" · DIED — ✖ N26 (Slice 3)
all three new laws DIED — N25/N26/N27 are falsifiable
# identical output on cakepanz-4-prepared
```

## K · STALE COUNTS IN THE DELIVERED TEXT (grep, this tree)
```
$ grep -rn "24/24" . | grep -v "^./test/"
./ACCEPTANCE-RECEIPTS.txt:67        (history file — expected)
./scripts/acceptance-run.sh:20:step "3. ... (expect 24/24: 23 carried + N20 the F8 law; ...)"
./_agents/zai/inbox/20261117-0905-zai-cakepanz-repin.md:10   (Z.ai's own inbox, history)

$ grep -n "F0" scripts/acceptance-run.sh
46:step "12. the receipt falsifiers F0–F8 (every law must DIE ...)"

$ grep -rn "284 tests\|284/284" README.md batteries/slice1.battery.mjs
README.md:29        "the pinned commit's 284 tests"      (actual: 394)
batteries/slice1.battery.mjs:12  "the Architect's own 284 tests, re-run in this tree (284/284)"

$ grep -n "npm run battery\|shell.battery.mjs" README.md
README.md:1  "`node batteries/shell.battery.mjs` (render, needs the preview server)"   (needs the Part-D register, else ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX)
```

## L · THE D-1 NODE LOG ENDS RED
```
$ tail -6 cakepanz-4/deliveries/receipts/c7-d1-fresh-clone.log
Node.js v24.22.3
exit=1
== END D-1 fresh clone ==
-- PROVENANCE NOTE (appended): the node-side sections above ... ran with the code final ...
$ grep -c "ERR_CONNECTION_REFUSED\|ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX" cakepanz-4/deliveries/receipts/c7-d1-fresh-clone.log
2
```

## M · PARTC ZIP CONTENTS vs ITS OWN RECEIPT
```
$ unzip -l receipts/partC/gh-pages-fix/67-cakepanz-gh-pages-fix-c6.zip
     11346  67-cakepanz/README.md
      1560  67-cakepanz/CHECKSUMS-slice2.txt
      2608  67-cakepanz/FIX-RECEIPT.md      <-- a third file
$ grep -n "carries ONLY those two files" receipts/partC/gh-pages-fix/FIX-RECEIPT.md
"How to place it": "the zip carries ONLY those two files"
```


## partH-c8-1/ — the cakepanz-8.1 sitting (2026-11-18): raw stdout at the final bytes, ends green

The review-closure round's receipts (the order: zai-cakepanz-8.1-2026-11-18.md @ 596bd94f). h* = the
§8.5–6 final-state set; k* = the §8.8 acceptance-run composites (the regenerated ACCEPTANCE-RECEIPTS.txt
in each tree IS the k run's output); m1 = the §8.7 fresh-clone composite; b0* = the §8.2 baseline at the
delivered bytes (pre-patch — the numerals FAIL ×2 is the defect the round fixes).

```
b0-baseline-8.2-pre-patch.log
b0-engine-suite-baseline-shipped.log
b0-gate-numerals-baseline-FAIL-prepared.log
b0-gate-numerals-baseline-FAIL-shipped.log
h1-order.txt
h10-falsify-late-final-shipped.sh.log
h10b-falsify-late-final-shipped-8.1bytes.sh.log
h11-engine-suite-final-prepared.sh.log
h12-node-battery-final-prepared.sh.log
h13-distfile-final-prepared.sh.log
h14-shell-battery-final-prepared.sh.log
h15-slice-battery-final-prepared.sh.log
h16-late-battery-final-prepared.sh.log
h16b-late-battery-final-prepared-8.1bytes.sh.log
h17-dist-diff.log
h18-a2-mutation-red-shipped.log
h19-regen-cakepanz-4-prepared.sh.log
h19-regen-cakepanz-4.sh.log
h2-engine-suite-final-shipped.sh.log
h20-gate-manifest-cakepanz-4-pass1.sh.log
h20-gate-manifest-cakepanz-4-pass2.sh.log
h20-gate-manifest-cakepanz-4-prepared-pass1.sh.log
h20-gate-manifest-cakepanz-4-prepared-pass2.sh.log
h21-gate-numerals-cakepanz-4-pass1.sh.log
h21-gate-numerals-cakepanz-4-pass2.sh.log
h21-gate-numerals-cakepanz-4-prepared-pass1.sh.log
h21-gate-numerals-cakepanz-4-prepared-pass2.sh.log
h22-pins-flex-final.log
h23-gates-after-doc-sweep.log
h3-node-battery-final-shipped.sh.log
h4-distfile-final-shipped.sh.log
h5-shell-battery-final-shipped.sh.log
h6-slice-battery-final-shipped.sh.log
h7-late-battery-final-shipped.sh.log
h7b-late-battery-final-shipped-8.1bytes.sh.log
h8-receipt-falsifier-final-shipped.sh.log
h9-shell-falsifier-final-shipped.sh.log
```
