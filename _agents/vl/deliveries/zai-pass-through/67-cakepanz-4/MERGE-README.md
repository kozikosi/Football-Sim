# MERGE-README.md — engine, ready to merge (the handoff cover)

**Seat:** Z.ai · 67 Cakepanz · 2026-11-17 (the re-pin sitting) · **Pin:** `5c808472` · **Verdict:**
the shell is RE-PINNED to the Architect tip and every battery is green at it — engine 394/394,
node 24/24, slice 29/0/10/3, shell 46/0 (the whole season played through the UI), gates PASS,
every falsifier shown to die — merge-ready behind one open store item (P-317, the Architect's).

## The one-line merge
Replace `67-cakepanz/src/engine/` with the pin's `colors/src/**` snapshot — and move the other
THREE paths WITH it (`tools/mathlab/flex.json`, `test/engine/`, the `data/packs/*.json` fixtures
the carried suite reads): one green commit (SNAPSHOT.md is the contract; the re-pin procedure is
printed there, including the blob:none-worktree equivalent of `git archive`). Then re-run the
receipts — one command: `bash scripts/acceptance-run.sh` (staged, exit-coded, falsifiers included).
`node scripts/swap-test.mjs <sha>` rehearses any future re-pin as one command.

## What this sitting changed (truthfully)
1. **The re-pin** — snapshot + flex table + carried tests + packs moved together to `5c808472`,
   byte-verified (`diff -rq` exit 0, 67 files). The M3 rehearsal ran BEFORE it (snapshot-only swap:
   the shell SURVIVED — node 23/23, build green, slice 26/0/10/3 — and only the carried goldens
   went red: formation gap ×4, flex-table equality, Owner D pins) and the reverse swap ran AFTER
   (old pin into the re-pinned tree: the shell survives, the tip-asserting goldens red). Both
   receipts in VERIFY.txt §M3.
2. **The carried suite is the tip's own suite** (45 suites, 394 tests), re-pointed by
   `scripts/sync_engine_tests.py` — which is NEW (SNAPSHOT.md and MERGE-GUIDE referenced it but
   the tree never carried it; the re-pointing is now a script, not a memory). The suite's engine
   references (imports AND `new URL('…/src/…')` calls) are re-pointed; no expectation edited.
3. **N20 (the F8 law)** added to the node battery — the save service refuses a slot/key mismatch
   (`savesApp` composes `slotCheck: assertSlotMatchesKey`); its falsifier F6 kills it. Node battery
   23→24.
4. **Three Slice-3 laws** added to the slice battery (26→29) — the gone% METHOD tooltip on hover,
   the "my needs" filter, and clearing it — for features that were already built and receipted at
   the old pin but carried no laws of their own. Falsifier-ready (the FC pattern applies: mutate
   the component, the law dies).
5. **P-368 made TRUE** — `document` appeared in `src/lib/port/tokens.ts` (the delivered §10 receipt
   was inaccurate; the delivered bytes carried it). The DOM half moved to
   `src/lib/bindings/tokensApply.ts` (behaviour byte-for-byte identical; the port is pure); the
   grep is EMPTY now, receipted.
6. **The a11y warning fixed** (Ernie's finding): the `tabindex="0"` nested inside the row button
   removed; the tooltip still reveals on row focus (`.cp-main:focus .cp-gonetip`). Build log: zero
   warnings, receipted.
7. **tsc --noEmit fully clean** — the four named type-only nits are GONE: the awardsVM index typed,
   the weekVM `as Game` fabrication replaced by a kind parameter, `@types/node` added (dev), the
   tsconfig scope stated (the shell; the carried suite runs on node --test, not shell tsc).
8. **The FB falsifier tool bug fixed** — a crash-mid-flow truncated the receipt before the
   ReferenceError line, producing a false TAUTOLOGY; the tool now returns the full log (FB DIES
   honestly: S6/S7/S9/S10/S13/S15+S25c FAIL, `ReferenceError: restoreSeason is not defined`), and
   takes `CP_FALSIFY_CASE=FA|FB|FC` for single-case diagnosis.
9. **P-254 ENVELOPE-FREEZE.md** — the one-page freeze (frozen field list + the conflict rule in the
   same list: per-slot last-write-wins on the WHOLE save, rung-back, keep-both, the reserved
   additive `deviceId?: string`). **P-360** — the gh-pages README pin line corrected to
   `5c808472` + 67 + 394 (`deliveries/gh-pages-fix/README.md`; the Owner places it).
10. **acceptance-run.sh modernized** — the one-command staged acceptance run at the new counts,
    falsifiers included, `CP_SWAP_SHA` hook for the M3 habit.

## The merge-readiness verdict (one line per screen, no euphemisms — receipts TRUE this sitting)
- **Draft Board** — perfect: 21 board laws (18 carried + the 3 new Slice-3 laws) + S25b (390px) +
  N15/N19/N20; the needs row and the method tooltip have laws now.
- **Team Select + P-317** — the UI is done and receipted (team AND slot, same screen); the STORE
  cannot carry a custom order yet — the Architect's piece (§5 filed; the engine's `newDraft` order
  parameter is proven node-side, P-317 law green).
- **Draft Complete / Hub / Week / Standings / Bracket / Book / Awards / Review / Stats / Guide /
  Cards / Settings / Saves / Share / Feed** — every one renders through the REAL season run (46/0),
  the season laws are proven node-side, the 390px walk is clean on all 14 screens, and the
  corrupt/newer refusals are the engine's own parse path. Honest label: the DOM fidelity is one
  screen-level assertion per screen (coarser than the board's); one more pass for pixel law.
- **Restore (the season's save/load)** — S29/S30 PASS through the real UI; the FB falsifier kills
  it when the definition is deleted (fresh receipt this sitting).

## The M3 swap test at the NEW pin — ran BOTH directions this sitting
Before the re-pin (snapshot-only swap to 5c808472): `diff -rq` outside src/engine CLEAN, node
battery 23/23, build green, slice 26/0/10/3 — and the carried ENGINE goldens fail (formation gap
×4, flex-table equality, Owner D pins). After the re-pin (swap d3bd81d2 back in): the same CLEAN
diff, the shell survives, and the tip-asserting goldens fail (the carried suite now imports
tip-only modules — `valueprovider.ts` et al. — so the reverse swap fails the suite's LOAD, exactly
what a red carried expectation looks like from the other side). VERDICT each time: FAIL BY DESIGN —
the re-pin is the four-path move, one green commit. Do not edit the law; do not edit the snapshot.

## What I do not know (UNKNOWN)
- Whether award grades ≥90 occur in a receipted season (the shimmer is wired; none observed).
- The w89 "90+ shimmer" source law (no source on disk).
- The Svelte-vs-Vue cutover cost delta (the Owner's measurement says tie — REPORTED, Owner).
- The old pin's override-variant pack hashes are not re-measured here (their invocations lived in
  the prior sitting's receipts; the baked-pack hash at THIS pin is cited WITH its invocation above).

## Open Owner questions (flagged, NOT fixed — the ruling is the Owner's)
1. **Light gold2 contrast — MEASURED this sitting: 1.51:1 on pale rose (1.65:1 on white) — FAIL** (AA 4.5).
2. **Dark --text — MEASURED this sitting: the rose ink on plum = 3.17:1 — FAIL** at AA normal (large text passes).
3. Awards-brag content (MVP only as implemented).
4. The "Engine Value" vs "Model Value" label (ships "Model Value"; UNTOUCHED).
5. The 3-4 one-liner on Team Select (PROPOSED in the delivery note; not shipped).
6. **P-364 wording** — the queue row says "board grid collapse under 560px"; the built (and
   falsified) law is the board's phone-grid collapse at **430px** (S25b + the FC falsifier). The
   560 figure appears nowhere in the tree. Named, not silently changed — moving a visual threshold
   without a ruling would be scope growth.

## Open Architect items (§5 filings in MERGE-GUIDE.md §7)
1. **P-317 store** (unchanged) · 2. **OT clock()** (unchanged) · 3. **The parameter property** in
   `platform/localstorage.ts` — STILL PRESENT at 5c808472 (checked this sitting); both node-side
   batteries need `--experimental-transform-types` until it lands; Node version pinned in
   SNAPSHOT.md · 4. **The gravity/double-teams measurement** (unchanged) · 5. **The awards grades**
   (unchanged) · 6. **`deviceId?: string`** — the reserved additive envelope field (P-254; one
   optional field so v1.1 never unfreezes; the freeze text is ENVELOPE-FREEZE.md).
