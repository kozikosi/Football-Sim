SPEAKER: PORCA | ROLE: advisor | TASK: C11 | DATE: 2026-11-20T03:33Z

# C11 — standing review protocol for the next CAKEPANZ zip

Use this on every Z.ai drop. Two outcomes only: **ACCEPT** (a)––(g) pass and the blockers are empty, or
**IMPROVE** (one named failure with the exact command output). No third state; no vague "looks good".

## (a) Engine is exactly the pin — VERIFIED-first, fail loudly

```
# extract the zip into scratch; compare each engine file to the pin on the Architect's branch
git archive origin/architect/engine-and-seats colors/src/sports/nfl/engine tools/mathlab/flex.json | tar -x -C <pin-dir>
diff -rq <zip>/colors/src/sports/nfl/engine <pin-dir>/colors/src/sports/nfl/engine
```
Expected: no output. Pin is `d3bd81d2` (99-rule flex, 23/42/17/17 after the 16 Nov ruling).
Also check `tools/mathlab/flex.json` `_source` and `colors/src/sports/nfl/engine/flex.ts` agree byte-wise.
Any mismatch = IMPROVE, even if the UI is prettier. Never edit the engine to match a UI.

## (b) Build is clean

```
cd <zip>/cakepanz-4 && npm ci && npm run build 2>&1 | tee <receipt>/build.log
```
Expected: exit 0, no TS errors, no unresolved imports. Repeat for any `cakepanz-4-prepared/` shipped.

## (c) Batteries pass with the expected counts

```
cd <zip>/cakepanz-4-prepared/batteries
node node.battery.mjs      # k1: expect 18 × EXIT_CODE=0
node shell.battery.mjs     # expect clean k1 shell receipts
node slice1.battery.mjs    # expect 49 OK / 0 FAILED / 52 files (with the repair file present)
node board.battery.mjs     # expect ring ids == raw-key oracle (C5), not rounded-string ties
```
Compare against `slice1-battery.json` md5 `0a2869538a706e7e6ea864664b7e5c9f` (6,418 B). A host with
48 OK / 51 files is the *broken* state; the repair rehearsal is `inbox/20261120-0328-porca-C3-…`.

## (d) 390 px — no horizontal scroll

Serve the built app (`npm run preview -- --port 4173 --strictPort`), then
`agent-browser open http://127.0.0.1:4173/` → `agent-browser viewport 390 320` →
`agent-browser eval "document.documentElement.scrollWidth <= document.documentElement.clientWidth"`
Expected `true` at every pick 1–32; full probe in `inbox/20261120-0333-porca-C10-board-measurement-protocol.md`.

## (e) Zero console errors

Playwright `page.on('console', m => m.type()==='error')` and `page.on('pageerror', …)` across the same
1–32 sweep; expected `errors: []`. A console error is an IMPROVE even if the visual pass is clean.

## (f) Can it die? (the anti-tautology gate)

For each new law in the drop, revert the implementation in **scratch** and confirm the test fails:
- Q7 seam law → remove the snapshot guard; `valueprovider.test.ts` must fail at the QB row.
- dispatchAsync → make a subscriber throw; the queue must stop poisoning (Architect's test dies without it).
- C′1 ring → reintroduce the rounded-string parse; the raw-key oracle must report >3 rings.
- Any new battery assertion → remove the production fix, not the assertion.
A test that stays green with the fix removed is not a test; return IMPROVE with both outputs.

## (g) Report matches artifacts

Cross-check the drop's README/report against what is on disk: every quoted sha256/md5, byte count,
file count and "OK n/n" must match the receipts from (a)–(f). Check that the report names the build
file and the commit/branch it was cut from. Any quote that cannot be re-measured is REPORTED and must
be labelled; a silent mismatch is IMPROVE. Also confirm the two GitHub folders are the artifact paths
(A8) and that no v2 re-zip was made.

## REJECT vs IMPROVE (one line each)

- **REJECT** (stop, do not review further): (a) fails — wrong engine bytes or wrong pin; or the drop
  edits the product HTML / engine / protected constants / another seat's branch. This is a fence, not
  a style call.
- **IMPROVE** (name the item and paste the command output): anything in (b)–(g) fails, or a receipt is
  missing. The builder fixes and re-drops; no seat patches the product.
- **ACCEPT**: all pass. Post `RESULT: <check> | PASS | <command> | <key output>` lines in the bulletin
  with the build hash. Three different seats = REVIEWED ✓✓✓ (AGENTS.md §5); this protocol is one seat's
  contribution, not the third confirmation by itself.

## NOTE

These commands are prescribed, not run in this sitting. Tool paths were verified with `command -v`;
test results cited above are PORCA/Architect/Pickle receipts, labelled as such.
