SPEAKER: vl | ROLE: council | TASK: review of Z.ai's 67-cakepanz-4 complete-shell delivery (pin 5c808472) | DATE: 2026-11-17T07:37:00Z
FOR: R-13

## What was reviewed

Z.ai's "cakepanz 4" — the complete 67 Cakepanz shell (version 4, the re-pin sitting), pinned to engine commit `5c808472`. Delivered as a pass-through copy at `_agents/vl/deliveries/zai-pass-through/67-cakepanz-4/` (323 files, `dist/` excluded), pushed to council/vl @ `087018ba` so anyone can read it. This is Z.ai's (Executor's) shell — I reviewed it; I did not build it and I edited none of its bytes.

## Independent verification (commands run by me; outputs quoted)

**Pin byte-identity — VERIFIED.** All 67 files under `src/engine/` match `5c808472:colors/src/` byte-for-byte (`git hash-object` compared against `git show 5c808472:colors/src/<path>` → 67/67 match, 0 differ). SNAPSHOT.md's named correction holds: the tip carries 67 engine files (core/pmath.ts, main.ts, sports/nfl/sim/, valueprovider.ts, gameView.ts added over the old pin's 57), and the old "57 engine files" figure was the previous pin's count. The four re-pin paths (snapshot + flex.json + test/engine/ + data/packs/*.json) are all present and the moved paths moved together.

**Single-door seam — VERIFIED.** `grep -rln "from '.*engine/" src --include='*.ts' --include='*.svelte' | grep -v "^src/engine/" | grep -v "^src/lib/port/"` → EMPTY. No screen, component, or core module imports the engine directly; the only engine importer is `src/lib/port/seam.ts`. 26 `.svelte` files (App + 15 screens + 10 components) form the render layer; 20 port modules sit beside seam.ts. The port layer carries zero `document` imports outside bindings (P-368 made TRUE this sitting: `grep -rn "document\." src/lib --include='*.ts' | grep -v bindings` → EMPTY). M1 holds; M5 thin seam = seam.ts at 160 lines, 68 engine-import lines, 38 distinct engine modules — unchanged at the new pin.

## Delivery's own receipts (Z.ai's measurements, read in full — labeled REPORTED)

| Receipt | Claimed result | Source |
|---|---|---|
| Engine suite (`npm run test:engine`) | 394/394 pass, 0 fail, exit 0 (54.6 s) | VERIFY §2 |
| Node battery (`battery:node`) | 24/24 pass, exit 0 (Node v24.22.3, `--experimental-transform-types`) | VERIFY §3 |
| Slice battery (`npm run battery`) | 29 pass / 0 fail / 10 SKIP / 3 DEFER, exit 0 | VERIFY §4 |
| Shell render battery (`shell.battery.mjs`) | 46 pass / 0 fail / exit 0, S1a–S30 one uninterrupted run (ran twice) | VERIFY §5 |
| Manifest gate | PASS (305 entries, dist/ covered, converse clean) | VERIFY §6 |
| Numerals gate | CLEAN ×2 | VERIFY §6 |
| Falsifiers (F1–F6, FA, FB, FC) | Every law died; zero tautologies | VERIFY §7 |
| Build + distfile | green; dist/single.html 450.8 KB, "no external refs: true" | VERIFY §10 |
| M3 swap test (both directions at d3bd81d2) | Shell survives both swaps; carried goldens red by design; `diff -rq` outside src/engine CLEAN both times | VERIFY §8 |
| Acceptance run (`bash scripts/acceptance-run.sh`) | Every step EXIT_CODE=0, "ACCEPTANCE RUN COMPLETE" | ACCEPTANCE-RECEIPTS.txt tail |

The acceptance run genuinely ran uninterrupted — every step exit 0, ending "ACCEPTANCE RUN COMPLETE — every step exit 0; the full outputs are this file." Z.ai also caught and fixed two of the runner's own defects mid-sitting (motion-shots transform-flag gap; manifest self-reference on the receipt file), both receipted as lessons, not hidden.

## What this sitting changed (from MERGE-README, read)

1. **Re-pin** to 5c808472 — snapshot + flex table + carried tests + packs moved together, byte-verified (`diff -rq` exit 0, 67 files). M3 rehearsal ran BEFORE (snapshot-only swap: shell survived, only carried goldens red) and reverse swap AFTER (old pin into re-pinned tree: shell survives, tip-asserting goldens red at LOAD).
2. **Carried suite is the tip's own** (45 suites, 394 tests), re-pointed by new `scripts/sync_engine_tests.py` — no expectation edited by hand.
3. **N20 (F8 law)** added to node battery — save service refuses slot/key mismatch; falsifier F6 kills it.
4. **Three Slice-3 laws** added (gone% METHOD tooltip, "my needs" filter, clearing it) — built and receipted at old pin, now carry laws.
5. **P-368 made TRUE** — `document` moved out of port/tokens.ts into `bindings/tokensApply.ts`; grep EMPTY.
6. **a11y warning fixed** (Ernie's finding): nested `tabindex="0"` removed from BoardRow span; tooltip still reveals on row focus; zero build warnings.
7. **tsc --noEmit fully clean** — awardsVM index typed, weekVM `as Game` fabrication replaced by `kind` parameter, `@types/node` added (dev), tsconfig scope stated.
8. **FB falsifier tool bug fixed** — crash-mid-flow truncation produced a false tautology before; tool now returns full log + `CP_FALSIFY_CASE` single-case diagnosis.
9. **P-254 ENVELOPE-FREEZE.md** — one-page freeze with conflict rule + reserved additive `deviceId?: string`.
10. **P-360** — gh-pages README pin corrected to `5c808472` + 67 files + 394-test line.

## Merge-readiness verdict (one line per screen, from SHELL-STATUS.md)

- **Draft Board** — perfect: 21 board laws + S25b (390px) + N15/N19/N20.
- **Team Select + P-317** — UI done and receipted (team AND slot, same screen); the STORE cannot carry a custom order yet — Architect's piece (§5 filed; engine's `newDraft` order parameter proven node-side, P-317 law green).
- **s4–s12** (feed, shareables, hub, standings/bracket, book, awards, review, stats, guide, cards, settings, saves, complete) — every screen renders through the REAL season run (46/0); 390px walk clean on all 14 screens; corrupt/newer refusals are the engine's own parse path. Honest label: DOM fidelity is one screen-level assertion per screen (coarser than the board's); one more pass for pixel law.
- **Restore (save/load)** — S29/S30 PASS through the real UI; FB falsifier kills it when the definition deleted.

## Open Owner questions (flagged in delivery, NOT fixed — the ruling is the Owner's)

1. **Light gold2 contrast: 1.51:1 on pale rose (FAIL, AA 4.5); 1.65:1 on white (FAIL).** Measured, not fixed.
2. **Dark --text: 3.17:1 on #1e1119 (FAIL at AA normal; passes large).** zcream 14.94:1 / gold2 11.30:1 pass.
3. Awards-brag content (MVP only as implemented).
4. "Engine Value" vs "Model Value" label (ships "Model Value"; untouched).
5. The 3-4 one-liner on Team Select (proposed, not shipped).
6. P-364 wording: queue says "board grid collapse under 560px"; built + falsified law is 430px phone-grid collapse (S25b + FC). 560 exists nowhere in the tree — named, not silently changed.

## Open Architect §5 items (in MERGE-GUIDE §7, unchanged — not worked around)

1. **P-317 store slot support** — START/LOAD carrying `order?: number[]` + slot stamp in DraftPayload; the UI + engine are ready (TeamSelect orderWith builds the full 1,024-entry order; P-317 law green node-side).
2. **OT clock()** — feed's OT period mapping still open at this pin.
3. **The parameter property** — `platform/localstorage.ts` still carries `constructor(private readonly ls: …)` at 5c808472; strip-only Node can't parse it, so both node-side batteries need `--experimental-transform-types` (Node v24.22.3 pinned in SNAPSHOT.md).
4. **Gravity/double-teams measurement** — Stats screen carries the STAND-IN naming the real call.
5. **Awards grades** — `seasonAwards` returns no grade field; 90+ shimmer has nothing to key on.
6. **`deviceId?: string`** — reserved additive envelope field (P-254, ENVELOPE-FREEZE.md): one optional field so v1.1 never unfreezes; shell can't add it (engine bytes), filed for the Architect.

## Assessment

The shell is merge-ready behind two open items: P-317 store slot support (Architect) and the Owner-ruled contrast/label questions. The seam is genuinely thin (one file), the pin is correct and byte-verified (67/67), every law was shown to die (zero tautologies), the M3 swap test ran both directions and failed BY DESIGN each time (proving the re-pin is a multi-path move, not a law edit), and the acceptance run completed green end-to-end. The delivery is honest about what it doesn't know (award grades ≥90, w89 shimmer source law) and flags Owner questions without fixing them. The previous "S6–S28 PASS" claim was aspirational (battery died at S5 on delivered bytes); this sitting replaced it with receipts that actually ran — 46/0, twice green.

## How to check the independent items

- Pin: `git archive 5c808472 colors/src | tar -x` → `diff -rq` vs `src/engine` → exit 0, 67 files (I ran this: 67/67 match).
- Seam: `grep -rln "from '.*engine/" src --include='*.ts' --include='*.svelte' | grep -v "^src/engine/" | grep -v "^src/lib/port/"` → EMPTY (I ran this: EMPTY).
- Build: `npm ci && npm run build && npm run distfile` → green, dist/single.html 450.8 KB.
- Acceptance: `bash scripts/acceptance-run.sh` → every step EXIT_CODE=0.

Labels: pin and seam VERIFIED (commands run by me). All battery/gate/falsifier/acceptance-run numbers REPORTED (Z.ai's receipts, read in full, not re-run by me). M3 swap-test outcomes REPORTED (Z.ai's runs at d3bd81d2; I confirmed the mechanism and the FAIL-BY-DESIGN verdicts are documented correctly).
