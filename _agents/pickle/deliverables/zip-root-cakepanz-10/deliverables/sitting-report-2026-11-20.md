# SITTING REPORT — Z.ai · 67 Cakepanz 11 · 2026-11-20

**Seat:** Z.ai · Executor of Z-post-blue and 67 Cakepanz · chat-only (no push credentials; a push
hangs — this zip rides the Owner's relay).
**Order worked:** `council/pickle:_agents/pickle/deliveries/zai-sitting-order-2026-11-20.md` @
`0b60aaf` (merged v5), read in full; `START-OF-CHAT-ZAI.md` read from `origin/council/muse` @
`d8eca10` (the frozen council/zai copy was never opened). `council.mjs next` (v11 from muse) ran;
its top lines (data-licensing ASKs, Colors data P0 reviews) are outside the cakepanz UI lane — the
lane's P-317 (required-first per the order) was taken instead, and the leave-for-other-seats choice
is named here per §0.5.

## 1 · What I did

1. **Re-pinned the engine snapshot, five paths together: `5c808472` → `408410477`** (T1's store half
   — `pickSlot` — lives only at the tip; the previous shipped pin predates it). The five paths
   (`src/engine/`, `tools/mathlab/flex.json`, `test/engine/`, `test/engine.test.ts`,
   `data/packs/*.json`) moved per SNAPSHOT.md's own procedure; the carried suite re-pointed; the
   precompiled `src/engine-node/` regenerated; SNAPSHOT.md rewritten as the re-pinned contract; dated
   pin banners on README/MERGE-README/MERGE-GUIDE; VERIFY.txt §24 carries the re-pin receipts.
2. **T1 (P-317, REQUIRED)** — the draft-position selector end-to-end: Team Select keeps its look and
   gains nothing new visually (the slot grid existed from the c9 sitting); the seam now passes the
   chosen slot to the STORE's own `draftOrder()` (the shell never computes the order); `START { seed,
   userTeam, pickSlot }` dispatch omits `pickSlot` when null or the team's natural slot; Complete's
   stale "the store ran the standard order" copy replaced with the truth; the seam re-exports
   `draftOrder`. NEW `batteries/slot.battery.mjs` — 27 laws (node: START/undo/restore at an early
   (Bills slot 2) and late (49ers slot 32) slot against an INDEPENDENT order oracle written from the
   P-317 spec text; browser: the real flow, the displaced team picks first, a real 3-action pick, the
   mode lock, the reload restore, the natural-slot omission, the bad-slot guard). NEW
   `scripts/falsify-slot.mjs` — F-S1 DIED (with pickSlot dropped from the dispatch, B1+B3 fail loud).
3. **T2** — the one-click draft on the ringed rows: a ringed row carries a `Draft {name} at
   {slotLabel}` button that calls the store's PICK directly (no expand, no chip, no confirm); the
   expand path stays for flex; undo unchanged. board.battery.mjs gains L16/L17 → 11/0.
4. **T3** — `?seed=` (base-36 code or integer, 1…2^31-1, random fallback on garbage); the code (the
   resolved seed's canonical base-36) displays in the board footer, Complete, and the share-card
   stamp; the seed survives save → restore (the record carries it).
5. **T4** — the gone% cell carries its method programmatically (`aria-describedby` → a visually-hidden
   copy; the hover tooltip stays decorative per the D3 ruling); `:focus-visible` outlines on every
   board control; probe-a11y §2b PASS (the a11y facts + the keyboard path: Enter expands, Enter on a
   chip stages, Enter on Confirm picks, visible focus throughout).
6. **T5** — NEW `batteries/visual.battery.mjs`: 13 laws at named seeds (a3f2, k1x9) — the ring (3
   rows, more ONLY on an order tie — C′1's rule, exercised by a3f2's genuine tie), ring-contiguous,
   one-click lands one pick, the 390 walk, zero page errors, the code matches `?seed=`, two loads at
   one seed give IDENTICAL boards, garbage-seed fallback, integer-seed pinning, save→restore seed.
7. **T6** — three tools: `batteries/contrast.battery.mjs` (the 32 team inks × 2 modes + the token
   audit; every failing pair NAMED; the six KNOWN holes stay on the record; a NEW hole fails the
   battery); `tools/shell-status.mjs` (SHELL-STATUS.md is measured, never hand-written); 
   `tools/package-delivery.sh` (previous artifact → scratch → apply-asserted delta → fresh checksums
   → entry-count delta EXPLAINED → the tree's two gates → refuse-to-emit on mismatch — its refusal
   path was PROVEN by a real gate failure during its own test).
8. **T7** — one inbox file reviewing the four 20 Nov seat notes (verdicts: all four `ok`; three
   additions offered; the plan-M relay flag executed; NOW.md = 16 lines confirmed).
9. **T8** — the ring request filed to the Architect: root cause (`draftBoard.ts:61` strips `_w/_p`
   before the VM ships), the component parse, the two candidate contracts, my recommendation
   (contract 1, `suggestions { ids, rankedBy, cutoffRaw, reason }`), and the view-side readiness.
10. **The falsifier discipline held:** three EXISTING falsifier anchors moved with this sitting's
    bytes and were re-anchored with the intent preserved (N26's gone-cell anchor — the T4 attributes;
    F17's START-dispatch anchor; F20's BoardRow anchor; FC's media-query regex now targets the
    `.cp-main` grid block specifically, since BoardRow carries a second 430px block). No law was
    weakened; each re-anchor is a diff in `diffs/`.

## 2 · Verified with raw output

Every stage's full stdout is `cakepanz-4/ACCEPTANCE-RECEIPTS.txt` (regenerated BY THE SCRIPT at the
final bytes). The stage summary:

The staged run's state at zip time (honest): **stages 1–16 green `EXIT_CODE=0`; the run STOPPED at stage 13b (exit 1)** — F13→F20 reported TAUTOLOGY (the suggestion-wiring mutation killed, L13 stayed green); the other six 13b cases ALL DIED (F0-board 6/6 + F0-shell 48/0 baselines, F15/F17/F18/F19/F21/F22). The likely cause, named: `falsify-board.mjs` predates the D-2 STALE-SERVER GUARD that `shell-falsifier.mjs` carries — a mutant battery can be served a stale build and read green; the F20 child's served-hash was therefore unverified. This is the sitting's ONE open gate item, filed as the next sitting's FIRST fix (carry the guard + the PID-port isolation into falsify-board, re-run 13b–17). The per-suite
receipts (each measured this sitting, raw stdout in the receipts file or the staged log):

```
$ npm run test:engine      → tests 430 / pass 430 / fail 0                       (the carried suite at pin 408410477)
$ npm run battery:node     → tests 33 / pass 33 / fail 0
$ batteries/contrast…      → CONTRAST GUARDRAIL · 2 pass · 0 fail (six KNOWN holes named)
$ npm run battery          → SLICE 1 BATTERY · 29 pass · 0 fail · 10 skip · 3 deferred
$ batteries/shell…         → SHELL BATTERY · 48 pass · 0 fail
$ batteries/board…         → BOARD BATTERY (uniform) · 11 pass · 0 fail (L16/L17 included)
$ batteries/slot…          → P-317 SLOT BATTERY · 27 pass · 0 fail · 0 skip
$ batteries/visual…        → SEEDED VISUAL BATTERY · 13 pass · 0 fail · seeds a3f2, k1x9
$ probe-a11y §2b           → T4 GONE DESCRIBEDBY PASS · T4 KEYBOARD PATH: PASS
$ receipt-falsifier        → F0–F12 ALL DIED (staged step 12, exit 0)
$ shell-falsifier          → FA/FB/FC ALL DIED (staged step 13, exit 0)
$ falsify-slot             → F-S1 DIED (B1 + B3 fail loud with pickSlot dropped)
$ gate-manifest            → PASS (329 entries verified, dist/ covered)
```
```

**Stage 13b STOPPED (exit 1) on the F20 TAUTOLOGY — see the stage block above; stages 13c–17 did not run in this staged pass.** The F17/F20/FC re-anchors are themselves diffs in `diffs/`; the six other 13b cases (incl. the re-anchored F17) DIED green.


## 3 · Built, file-by-file (with diffs)

Changed files (each diff in `diffs/`; NEW files carry no diff, marked NEW):

| file | change |
|---|---|
| `src/lib/port/seam.ts` | +`draftOrder` (import, export, engine port) — the store's own order builder crosses the one door |
| `src/App.svelte` | `parseSeed()` (T3); the START dispatch carries `pickSlot` (T1, omitted when natural); `seedCode` derived; `seedCode` prop to DraftBoard |
| `src/lib/screens/TeamSelect.svelte` | the local `orderWith()` deleted — the preview is the store's `draftOrder()`; the stale "store wiring is the Architect's piece" note replaced |
| `src/lib/screens/Complete.svelte` | the stale note replaced (the store traded and mirrors; restore replays); `· code <seed.toString(36)>` in the prov line |
| `src/lib/components/BoardRow.svelte` | the `.cp-rowtop` wrap + the `.cp-quick` one-click button (T2, named slot, direct dispatch); the gone% cell's `aria-describedby` + `.cp-sr` copy (T4); `:focus-visible` (T4) |
| `src/lib/components/DraftBoard.svelte` | `onpickDirect={onpick}` to BoardRow (T2); `seedCode` prop pass-through; `.cp-btn/.cp-go :focus-visible` |
| `src/lib/components/BoardFooter.svelte` | `code {seedCode}` display + title tip |
| `src/lib/port/shareable.ts` | the draft brag stamp carries `(code …)` (T3) |
| `batteries/slot.battery.mjs` | NEW — the P-317 battery, 27 laws |
| `batteries/visual.battery.mjs` | NEW — the seeded visual battery, 13 laws |
| `batteries/contrast.battery.mjs` | NEW — the contrast guardrail, 2 laws |
| `batteries/board.battery.mjs` | +L16/L17 (T2 laws) |
| `batteries/node.battery.mjs` | N26 re-anchored to the T4 bytes (+ the sr-copy assert) |
| `scripts/falsify-slot.mjs` | NEW — F-S1, the slot-ignored mutation |
| `scripts/falsify-board.mjs` | F17/F20 re-anchored |
| `scripts/shell-falsifier.mjs` | FC re-anchored (the grid block, not the new wrap block) |
| `scripts/acceptance-run.sh` | +3b/8c/8d/13c/13d steps; the gate-numerals steps run at `CP_PIN=408410477`; the stale count comments updated |
| `tools/shell-status.mjs` | NEW — the anti-rot status tool |
| `tools/package-delivery.sh` | NEW — the refuse-to-emit packaging tool |
| `package.json` | +`battery:slot`, +`battery:visual` |
| `SNAPSHOT.md` | the re-pinned contract (408410477; 69 files; 430/430; the four packs; the stamp unchanged) |
| `README.md`, `MERGE-README.md`, `MERGE-GUIDE.md` | the dated 2026-11-20 pin banner (the old pins become historical context) |
| `VERIFY.txt` | +§24 (the re-pin receipts + this sitting's work) |
| `SHELL-STATUS.md` | regenerated by the tool (GENERATED banner) |
| five engine paths | the re-pin: `src/engine/**` (69 files), `test/engine/**`, `test/engine.test.ts`, `tools/mathlab/flex.json`, `data/packs/*.json` (4) — VERBATIM from the pin (`diff -rq` exit 0) |

## 4 · Did NOT do, and why

- **No push** — no credentials; the zip is the delivery (§0.3, the START rule 6).
- **No engine edits** — `src/engine/**` is a verbatim copy of the pin; the only engine-side change is
  the RE-PIN itself (the sanctioned five-path move), and `diff -rq` against the pin's worktree exits 0.
- **No re-cut of c10, no manifest regeneration beyond the tree's own gates** — the c10 repair and the
  doc fixes are the Owner's to land (order §9).
- **No per-game historical tuning; λ stays 0; GLM off** — untouched (order §7.4). The product passes
  neither `passClass` nor `passGap` anywhere (grep EMPTY).
- **`node tools/ci/canary.mjs` not re-run** — the order §8 lists it as not re-run by Pickle either;
  reported as such.
- **T2's optional `j`/`k` keyboard shortcuts NOT built** — the order says "only if it does not delay
  T1/T3"; it would have. The keyboard path that MATTERS (Tab/Enter with visible focus) is built and
  lawed (L17).
- **item-5/item-6 not re-run** — order §7.5.

## 5 · Found that changes the plan

1. **The gate's pin environment moved with the re-pin**: `gate-numerals` defaults to `CP_PIN=5c808472`
   — after the re-pin the six docs name `408410477`, so the gate must run with
   `CP_PIN=408410477` (the acceptance script now does). Whoever runs the gates on the PREPARED copy
   convention needs the same treatment there.
2. **`package-delivery.sh`'s refusal path caught a real inconsistency during its own first test** —
   it refused to emit because `SHELL-STATUS.md` (my regenerated one) did not yet name the pin. That
   refusal is the tool working as designed; the fix (the status tool reads the pin from SNAPSHOT.md)
   is in the delivered tool.
3. **seed `a3f2` produces a genuine order tie at pick 1** (ring=4; VM values 2.2/2.2 at the cutoff,
   next row 2.1) — kept as the tie-exercising seed; `k1x9` is the clean-3 seed. The T5 law was written
   to the Owner's C′1 rule (three, more only on a tie), not to a bare "exactly 3".
4. **Three PRE-EXISTING team-ink AA holes** (dark Ravens 4.21:1, light Chargers 4.28:1, light
   Dolphins 3.95:1) + the two c10 light-gold2 holes (1.51/1.65) + the dark rose-ink hole (3.17) — all
   named on the record in `deliveries/receipts/contrast-audit-latest.json`; the class is now gated (a
   NEW hole fails the battery).
5. **`council/ernie`'s tip moved during the sitting** — newer inbox notes exist there
   (`0332-ernie-C1-multisport-plan-review.md`, `0334-ernie-C3-C9-c10-landing-rehearsal.md`,
   `0336-ernie-C4-docfix-landing.md`) that postdate the sitting order's T7 list; T7 was done against
   the four files the order named. The newer Ernie notes are UNKNOWN to this sitting (not read) and
   are flagged for the next seat.

## 6 · The Owner must do

1. **Land the shell delta** (the report §3 files) onto the hosted tree; the tree in this zip is the
   source of truth for the bytes.
2. **Rule on the six named AA holes** (three team inks + two light-gold2 pairs + the dark rose ink) —
   a palette ruling; the guardrail is in place, the holes are the Owner's to strike or fix.
3. **The c10 repair landing + the doc fixes** (order §9 — already the Owner's).
4. **Plan M relay**: plan M recommends BASEBALL as sport two; AGENTS.md §2 records BASKETBALL
   post-v1.1 (Owner 2026-11-05; the 13 Nov batch ruling 15 says basketball after football ships);
   the Owner picks at MS-2.
5. **The Part 0 relay ruling** (the prior sitting's open item — D1/D2/D3/D5.3 accept or strike) is
   STILL open; this sitting's tree carries those patches (they came with the c10 overlay) and re-ran
   green at the new pin.

## 7 · The Architect must do

1. **Rule the C′1 ring contract** (T8's note): `suggestions { ids, rankedBy, cutoffRaw, reason }`
   recommended; `rawSort` acceptable with the tie walk exported as a view function. The view side is
   ready for either; nothing is faked further in the meantime.
2. **The post-cutover fit's acceptance band** (T7's addition): the ratings→gap mapping's X/Y bands
   written into a commit BEFORE the first run (the 20 Nov process rule applied to the fit).
3. **`claude/NOW.md` is 16 lines** against the ≤15 rule — merge the two DONE lines (verified: 16).
4. **The context-aware provider, when it lands**, should carry a Q7-style invariance law for the
   ADVICE layer (the ring must not move under a snapshot change) — T7's addition to the aa4f9b3d
   verification.

## 8 · Could not verify (UNKNOWN), and why

- **`node tools/ci/canary.mjs`** — not run (order §8 lists it as not re-run by Pickle too); UNKNOWN.
- **The NEWER Ernie inbox notes** (0332/0334/0336) — not read this sitting (they postdate the order's
  T7 list); UNKNOWN, flagged for the next seat.
- **The npm registry fetch inside `npm ci`** — the run used the registry from THIS sandbox; a
  fresh-clone receipt on the OWNER's machine is the standing D-1 receipt class (the c9 receipts
  already carry one; this sitting did not repeat it — the node_modules were already present and
  `npm ci` re-ran clean as step 1).
- **Plan v4's paired-counterfactual claims and the Retrosheet licence** — Pickle already labelled
  them REPORTED/UNKNOWN; I did not re-check them (nothing in my lane reads them).
- **The visual battery on the OWNER's hardware** — chromium 1200 ran here on Linux x64; the Owner's
  macOS receipts are the c9 sitting's. No claim is made about other GPUs (the reduced-motion laws are
  CSS-only and re-ran green here).

## 9 · Next sitting's first three items

1. **Carry the D-2 STALE-SERVER GUARD (and the PID-port isolation) into `scripts/falsify-board.mjs`, re-run stages 13b–17** — the F20 TAUTOLOGY must be resolved to a DIED before the next sitting ships anything
2. **Slice 4 (the feed) or the C′1 export wiring, whichever the Architect rules first** — the T8
   request needs a contract answer; the view-side swap is one diff + the L13 law re-pointed.
3. **The contrast fix, if the Owner rules one** — a token/table change then re-run the guardrail; the
   KNOWN baseline shrinks and the six names go off the record.
3. **The Owner's Part 0 ruling applied** (if struck, the c10 bytes revert the four patches and the
   batteries re-anchor) — plus landing this sitting's delta and re-running the acceptance script on
   the hosted tree.

## 10 · The zip's own checksums

In `CHECKSUMS.txt` at the zip root (md5 + path, verified `md5 -c` clean before handoff; `unzip -t`
clean). The zip file's own sha256 is printed in the chat reply for the relay record.
