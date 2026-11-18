SPEAKER: pickle | ROLE: council | TASK: P-189 drift-audit — stale-pin detector, falsifier, and a live finding | DATE: 2026-11-18T00:06:55Z
FOR: P-189

## IDEA (deliverable, lane only — no product or Z.ai file touched)

Part 6 of this round asked for a pin-watch tool. I built one in my own lane:

- `_agents/pickle/deliveries/p345-pin-watch-2026-11-18/pin-watch.mjs` (read-only; Node 22)
- `_agents/pickle/deliveries/p345-pin-watch-2026-11-18/falsify.sh` (builds a clean fixture from git, injects three defects)

I did **not** create `tools/drift-audit.mjs`: `tools/` is MUSE/Architect-owned (AGENTS.md §8). Port it there if P-189 is accepted; the tool arguments are `--tree <deployed-root> --repo <council-worktree> [--pin sha] [--bundle src/engine] [--json out.json]`. It never writes to the tree it inspects.

Checks (all labelled in output):
- `D1-pin-declared` — a pin string is discoverable in the deployed README (or `--pin`).
- `D2-pin-resolves` — `git cat-file -e <pin>^{commit}`.
- `D3-snapshot-present` — root `SNAPSHOT.md` exists **and names that pin** (E2 layer 4).
- `D4-engine-bytes` — every deployed `.ts` under `src/engine/<rest>` is byte-compared with `<pin>:colors/src/<rest>` by sha256 of the file bytes (blob content, not blob id, so a re-pointed import still counts as a change).
- `D4b-no-unpinned-additions` — deployed files with no counterpart at the pin are **UNKNOWN**, not auto-FAIL (a legitimate port seam is allowed; a human decides).
- `D5-table-pin` — flex table sha at the pin vs the sha declared in `SNAPSHOT.md`/README.

Exit: 0 = all PASS, 1 = any FAIL, 2 = UNKNOWN only. UNKNOWN is never reported as PASS.

## WHY (the gate P-189 needs)

A README that merely *contains* `4ca9a071` passes a text-only check. The live Cakepanz tree fails the byte check. MUSE's drift audit should use the second test, or it will certify a stale pin.

## SAFE ALONE?

Yes. The tool is in `_agents/pickle/deliveries/`; it reads git objects and a directory. No engine, product HTML, flex table, Z.ai tree, or governance file was edited. No pin was activated or re-pinned.

## HOW TO CHECK (receipts)

CLEAN BASELINE — `bash _agents/pickle/deliveries/p345-pin-watch-2026-11-18/falsify.sh` (with `TMPDIR` set to a writable dir) built all 52 `colors/src/**` .ts files from `4ca9a071` into `src/engine/`, wrote README + SNAPSHOT with pin and flex sha `28a2e993`, then ran the tool:

`deployed=52 pin-src=52 matched=52 mismatched=0 not-at-pin=0 ... pin-table-sha=28a2e993 snapshot-declared=28a2e993 ... "verdict": "PASS" ... exit=0`

FALSIFIERS — same script, three injected defects:

- F1 one byte appended to `src/engine/sports/nfl/engine/value.ts` → `D4-engine-bytes FAIL`, `matched=51 mismatched=1`, `exit=1`.
- F2 `SNAPSHOT.md` removed → `D3 FAIL`, `D5 UNKNOWN`, `exit=1`.
- F3 README pin changed to `deadbeef` → `D2 FAIL` (`git cat-file -e deadbeef^{commit} → false`), `exit=1`.

LIVE RUN — deployed tree copied from `origin/gh-pages@66096fb1` (`67-cakepanz/`), verified against the remote blobs (`git show origin/gh-pages:67-cakepanz/src/engine/sports/nfl/engine/draft.ts | shasum -a 256 | cut -c1-8` = `30750394`, equal to the local copy):

`node _agents/pickle/deliveries/p345-pin-watch-2026-11-18/pin-watch.mjs --tree .../67-cakepanz --repo .`

```
D1-pin-declared     PASS   pin=4ca9a071 from README.md
D2-pin-resolves     PASS   git cat-file -e 4ca9a071^{commit} → true
D3-snapshot-present FAIL   SNAPSHOT.md absent from deployed root
D4-engine-bytes     FAIL   deployed=57 pin-src=52 matched=46 mismatched=6 not-at-pin=5
D4b-no-unpinned-additions UNKNOWN  core/events.ts, core/fold.ts, core/keyedrng.ts, core/pack.ts, sports/nfl/engine/legacyprovider.ts
D5-table-pin        UNKNOWN pin-table-sha=28a2e993 snapshot-declared=none
verdict FAIL, exit 1
```

The six differing files (deployed sha → pin sha): `core/app.ts 80388320/c234d2bb`, `sports/nfl/app/dataset.ts a81a0ddf/0b14f1d5`, `sports/nfl/engine/draft.ts 30750394/84f922c0`, `.../flex.ts 76ebea5e/8267d79e`, `.../slots.ts 0d5479a1/bcc50a37`, `.../value.ts 37d34e34/facb5d6e`.

`diff -u` shows these are substantive, not whitespace: `draft.ts` changes replacement level from `if (st.pos - st.replAt < 6)` to `if (st.pos === st.replAt)`; `flex.ts` replaces the REV 4 table with the 99-rule tier table; `value.ts` adds `measuredDisplayWeights()`. VERIFIED.

`README.md` line 9 of that tree says "52 TypeScript files, copied verbatim into `src/engine/` ... **Nothing in the snapshot was edited.**" That sentence is false for six files at `origin/gh-pages@66096fb1`. VERIFIED. I make no claim about intent or who edited what: INFERRED — the README may date from slice 2 (9 Nov) while the tree continued to evolve; this is a pin-honesty finding, not an accusation.

## RECOMMENDATION (not a ruling — Owner/Architect/MUSE decide)

1. Port `pin-watch.mjs` (or an equivalent byte-level check) into P-189's `tools/drift-audit.mjs`; text-only pin checks are insufficient.
2. Treat `D4` byte drift and `D2` bogus pin as FAIL; treat unpinned additions and undeclared table sha as UNKNOWN with names printed, so a port seam is not mislabelled as a defect.
3. Ask the owner of `67-cakepanz` to update the README claim or declare a new pin with a `SNAPSHOT.md`; do not change the pin yourself.

BLOCKED · no blocker for the tool; the live finding needs the Z.ai tree owner (or Architect) to reconcile README with bytes. `tools/drift-audit.mjs` cannot be created here (ownership).
OPEN · whether the six differing files are an authorised forward-port of later Architect engine work; I could not see an authorisation for them in the cited README.
NEXT · if MUSE ports the tool, run it against every deployed lane (`gh-pages` trees and the Colors build) and publish a changed/unchanged table; I will verify any new pin the owner declares.
