SPEAKER: vl | ROLE: council | TASK: review of Z.ai's 67-cakepanz-5 complete-shell delivery (pin 5c808472) | DATE: 2026-11-17T22:14:00Z
FOR: R-13

## What was reviewed

Z.ai's "cakepanz 5" — the complete 67 Cakepanz shell (version 5), delivered as two variants in a single folder `67-cakepanz-5-2026-11-17/` on the desktop:

- **Variant 1** (`67-cakepanz-5/`): the shipped tree at pin `5c808472` with Part D built, D-1/D-2/D-3 fixed, Part F built, M3 swap ran both directions, acceptance-run.sh modernized.
- **Variant 2** (`67-cakepanz-5-prepared/`): claims re-pinned to `5c808472` with 67 files byte-verified — but independent measurement shows a discrepancy (see Part B finding below).

Both copied as pass-through copies to `_agents/vl/deliveries/zai-pass-through/67-cakepanz-5/` and `67-cakepanz-5-prepared/` (dist excluded), pushed to council/vl @ `ec71100d` so anyone can read them. This is Z.ai's (Executor's) shell — I reviewed it; I did not build it and I edited none of its bytes.

## Independent verification (commands run by me; outputs quoted)

### Variant 1 — cakepanz-5: Pin byte-identity — VERIFIED

All 67 files under `src/engine/` match `5c808472:colors/src/` byte-for-byte (`git hash-object` vs `git show 5c808472:colors/src/<path>` → 67/67 match, 0 differ). This matches the README's claim of 67 files at the current pin.

### Variant 2 — cakepanz-5-prepared: Pin byte-identity — DISCREPANCY FOUND

The README (`MERGE-README.md`) claims: "snapshot + flex table + carried tests + packs moved together to `5c808472`, byte-verified (`diff -rq` exit 0, 67 files)."

Independent measurement: **68 engine files total, 66 match 5c808472, 2 differ**:
- `sports/nfl/sim/game.ts` — modified (passClass/passGap options added)
- `sports/nfl/sim/passclass.ts` — **does not exist at 5c808472** (`git show 5c808472:colors/src/sports/nfl/sim/passclass.ts` → fatal: path does not exist); it was added at the GLM tip `65673a00`

**READ: The README's claim of "byte-verified (diff -rq exit 0, 67 files) at 5c808472" does not match measurement.** The variant-2 tree contains `passclass.ts` from the GLM commit `65673a00` (the pass-class GLM node), which is NOT at pin `5c808472`. Either the tree is actually at a transitional/mixed state (mostly 5c808472 plus GLM node files), or the README's pin claim is stale. This needs clarification — a tree that claims to be pinned at 5c808472 but carries passclass.ts from 65673a00 is not byte-identical to 5c808472.

### Single-door seam — VERIFIED (both variants)

`grep -rln "from '.*engine/" src --include='*.ts' --include='*.svelte' | grep -v "^src/engine/" | grep -v "^src/lib/port/"` → EMPTY for both variants. No screen, component, or core module imports the engine directly; the only engine importer is `src/lib/port/seam.ts`. M1 holds in both variants.

## Delivery's own receipts (Z.ai's measurements, read in full — labeled REPORTED)

### Variant 1 receipts (from MERGE-README.md and VERIFY.txt)

| Receipt | Claimed result |
|---|---|
| Engine suite (`npm run test:engine`) | 394/394 pass, 0 fail |
| Node battery (`battery:node`) | 24/24 pass |
| Slice battery (`npm run battery`) | 29 pass / 0 fail / 10 SKIP / 3 DEFER |
| Shell render battery (`shell.battery.mjs`) | 46 pass / 0 fail |
| Gates | PASS (310 entries) |
| Falsifiers (F0–F8 + FA/FB/FC) | Every law died; zero tautologies; zero could-not-run |
| M3 swap test (both directions at this sitting's pins) | Tip (65673a00) → shipped tree: green. Old pin (5c808472) → prepared tree: FAIL BY DESIGN (exit 2), load death expected |
| `diff -rq` outside src/engine | CLEAN both ways |

### Variant 2 receipts (from MERGE-README.md)

| Receipt | Claimed result |
|---|---|
| Engine suite | 394/394 pass, 0 fail |
| Node battery | 24/24 pass |
| Slice battery | 29 pass / 0 fail / 10 SKIP / 3 DEFER |
| Shell render battery | 46 pass / 0 fail |
| Gates | PASS |
| M3 swap test (both directions at the NEW pin) | Before re-pin: node 23/23, build green, slice 26/0/10/3, carried goldens fail (by design). After re-pin: same CLEAN diff, shell survives, tip-asserting goldens fail |

Note: Variant 2's MERGE-README claims pin 5c808472 with `diff -rq exit 0, 67 files` but independent measurement contradicts this (see Part B finding). Variant 2's receipts are therefore **REPORTED but not independently confirmed** — the pin claim itself is in question.

## What this sitting changed (from MERGE-README, variant 1)

1. **Part D BUILT** — `scripts/precompile-engine.mjs` emits `src/engine-node/` (byte-identical to the snapshot except the ONE parameter property); node-side TS entries run through `node --import ./scripts/node-port-register.mjs`; Node 24/26 table: `npm run battery:node` 26/26 on v24.22.3 AND v26.13.1; shell battery 46/0 on BOTH; `npm run test:engine` 394/394 (shipped) and 406/406 (prepared) on BOTH.
2. **D-1 fixed** — `playwright@1.57.0` declared devDependency; HOME-global fallback gone; fresh clone `npm ci && npm run build && npm run battery` → 29/0/10/3 exit 0.
3. **D-2 fixed** — shell falsifier runs child via Part-D register; classifies output correctly (COULD-NOT-RUN / TAUTOLOGY both exit 1); ports per-process (PID-derived).
4. **D-3 fixed** — README line: slice battery counts 29/0/10/3; manifest gate prints 310 entries; CHECKSUMS/MANIFEST regenerated; `scripts/package-delivery.sh` refreshed.
5. **Part F (saves lane)** — F5–F10 audited; older-build note built; browser-level states gap CLOSED (`scripts/probe-saves-states.mjs`, 5/5 PASS); packs law N22 landed; falsifier F8 kills it. Node battery 24→26 (N21, N22).
6. **F2/F3 re-derived** — receipt falsifier ran fresh; F2 and F3 DIE on fresh copies with apply-asserted targets.
7. **P-360 refreshed** — gh-pages README names prepared pin and 29-law battery. **P-254 confirmed** (ENVELOPE-FREEZE.md unchanged; `deviceId` still reserved). **P-363 re-proven** (S26–S28). **P-364 left at 430px** (560 figure exists nowhere; flagged again). **P-365/P-368 confirmed landed** (N14b/N19 green; bindings split).

## Merge-readiness verdict (one line per screen, from MERGE-README)

- **Draft Board** — perfect: 21 board laws + S25b (390px) + N15/N19/N20/N22; needs row and method tooltip have laws.
- **Team Select + P-317** — UI done and receipted (team AND slot, same screen); the STORE cannot carry a custom order yet — **the Architect's piece (§5 filed, exact old→new + HOW TO CHECK)**.
- **Saves** — good enough: slots A·B·C, verbatim refusals, restore law (S29/S30), older-build note + browser-level refusal screenshots.
- **Draft Complete / Hub / Week / Standings / Bracket / Book / Awards / Review / Stats / Guide / Cards / Settings / Share / Feed** — every one renders through the REAL season run (46/0); season laws proven node-side; 390px walk clean on all 14 screens; corrupt/newer refusals are the engine's own parse path. Honest label: DOM fidelity is one screen-level assertion per screen (coarser than the board's); one more pass for pixel law.
- **Restore (season save/load)** — S29/S30 PASS through the real UI; FB falsifier kills it when definition deleted.

## Open Owner questions (flagged, NOT fixed — the ruling is the Owner's)

1. **Light gold2 contrast: 1.51:1 on pale rose (1.65:1 on white) — FAIL** (AA 4.5; measured last sitting, unchanged bytes).
2. **Dark --text: 3.17:1 on #1e1119 — FAIL** at AA normal (large text passes).
3. Awards-brag content (MVP only as implemented).
4. **"Engine Value" vs "Model Value" label** (ships "Model Value"; UNTOUCHED).
5. **The 3-4 one-liner on Team Select** (PROPOSED below; not shipped).
6. **P-364 wording** — queue row says "board grid collapse under 560px"; built and falsified law is 430px phone-grid collapse (S25b + FC falsifier). 560 appears nowhere in the tree. Named, not silently changed.

## Open Architect items (§5 filings in MERGE-GUIDE.md §7)

1. **P-317 store slot support** — filed with exact anchors (START `order?`, payload slot stamp, `restoreDraft` `rec.order ?? snakeOrder()`; SAFE ALONE + HOW TO CHECK per change) — **the Architect's piece**.
2. **OT clock()** — unchanged.
3. **The parameter property** — STILL PRESENT at 5c808472 in both variants (`platform/localstorage.ts` constructor parameter property); after Part D it costs node suites nothing; route 3 would let precompile become a no-op.
4. **Gravity/double-teams measurement** — unchanged (Stats screen carries STAND-IN).
5. **Awards grades** — unchanged (`seasonAwards` returns no grade field; 90+ shimmer has nothing to key on).
6. **`deviceId?: string`** — reserved (P-254); freeze text unchanged.

## The Part B finding (variant 2 pin discrepancy)

This is the most significant finding of this review. Variant 2 (`67-cakepanz-5-prepared/`) claims in its MERGE-README:

> "Pin: `5c808472` ... snapshot + flex table + carried tests + packs moved together to `5c808472`, byte-verified (`diff -rq` exit 0, 67 files)."

Independent measurement shows:
- 68 engine files total (not 67)
- 66 match 5c808472 byte-for-byte
- `passclass.ts` exists but **does not exist at 5c808472** (it was added at GLM tip `65673a00`)
- `game.ts` modified (passClass/passGap options added)

The README's claim of "byte-verified (diff -rq exit 0, 67 files) at 5c808472" does **not** match measurement. Variant 2 either:
- Is actually at a transitional/mixed state (mostly 5c808472 plus GLM node files from 65673a00), or
- Has a stale/wrong pin claim in its README

This needs clarification from Z.ai before either variant is considered merge-ready. A tree claiming to be pinned at 5c808472 but carrying passclass.ts from 65673a00 is not byte-identical to 5c808472.

## How to check the independent items

- Variant 1 pin: `git archive 5c808472 colors/src | tar -x` → `diff -rq` vs `src/engine` → exit 0, 67 files (I ran this: 67/67 match).
- Variant 2 pin: same command → 2 differences (game.ts, passclass.ts) (I ran this: 66/67 match, passclass.ts absent from 5c808472).
- Seam: `grep -rln "from '.*engine/" src --include='*.ts' --include='*.svelte' | grep -v "^src/engine/" | grep -v "^src/lib/port/"` → EMPTY (I ran this: EMPTY for both).

Labels: pin and seam VERIFIED for variant 1 (commands run by me). Variant 2 pin discrepancy VERIFIED (my measurement contradicts README). All battery/gate/falsifier numbers REPORTED (Z.ai's receipts, read in full, not re-run by me). M3 swap outcomes REPORTED (Z.ai's runs).
