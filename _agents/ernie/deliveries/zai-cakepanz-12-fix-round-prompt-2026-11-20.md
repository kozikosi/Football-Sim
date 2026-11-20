COUNCIL PROMPT — to Z.ai: cakepanz-12 fix round (no ring build)
SPEAKER: ERNIE (Kilo seat) | ROLE: advisor | TASK: fix the cakepanz-11 findings, in the order below | DATE: 2026-11-20
BASE: cakepanz-11 (the `zip-root-cakepanz-10` sitting) at engine pin `408410477`, hosted read-only on nine branches (mine: `council/ernie:_agents/ernie/deliveries/zai-cakepanz-11-2026-11-20/`).

## What this sitting is
Cakepanz-11 is reviewed and the engineering is sound — the draft-position picker (P-317) works end to end, the slot battery is 27/0/0, and the falsifier dies when `pickSlot` is dropped. This sitting fixes what the reviews found. It is a FIX round only.

**Do NOT build the ring fix.** The Architect has not ruled the C′1 ring contract (A vs B vs hybrid); the ring keeps ringing up to 60 rows as-is until he rules. Do not pre-empt it.
**Do NOT re-cut the c10 zip, do NOT re-run passGap, do NOT re-measure the ring a fourth time.** The c10 repair is a separate landing action on four hosts — not your task here.

Work the items TOP TO BOTTOM. Each is one commit per item, pushed separately. Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN. A receipt is the command and its raw output at the final bytes.

---

## ITEM 1 (P0 — functional defect, do first) — Seed-code round-trip (PORCA S1)
**The bug:** a displayed draft code can replay a DIFFERENT seed. The code is base-36 (`seed.toString(36)`), but `parseSeed()` in `src/App.svelte` tries the DECIMAL branch first (`/^\d{1,10}$/`) before the base-36 branch (`/^[0-9a-z]{1,6}$/i`). Any all-digit base-36 code is read as decimal. PORCA: ~700 of 9000 seeds fail the round-trip (seed 1296 → code "100" → replays seed 100). ~7.8% of the random-draw range silently loads a different draft — a data-integrity defect now that seeds are shareable.
**Fix (pick one, say why):** (a) prefix the code `?seed=b36:100`, parsed by an explicit `b36:` branch BEFORE decimal; or (b) publish the plain DECIMAL string as the code. Update `src/App.svelte` (parseSeed, seedCode), `BoardFooter.svelte`, `Complete.svelte`, `shareable.ts`, and the `?seed=` share text.
**HOW TO CHECK:** re-run the 1000–9999 round-trip (`parseSeed(seed.toString(<base>)) === seed` for every seed) → show 0 failures (before: 700). Add it as a law in `visual.battery.mjs`.

## ITEM 2 (P0 — the open gate) — F20 guard
Stage 13b stopped on an F20 TAUTOLOGY (suggestion-wiring mutation killed, L13 stayed green). Cause: `scripts/falsify-board.mjs` lacks the D-2 stale-server guard that `shell-falsifier.mjs` and `falsify-slot.mjs` carry — a mutant can be served a stale build and read green. Carry the guard + PID-port isolation into `falsify-board.mjs`. Close 13b (all cases DIED) or say why it cannot.
**HOW TO CHECK:** paste the full 13b block; F20 must be `DIED — FAIL L13 …`, never `TAUTOLOGY`.

## ITEM 3 (P0 — packaging) — md5 quick-verify + CHECKSUMS self-line
(1) `md5 -c CHECKSUMS.txt` is a NO-OP on macOS (BSD md5 can't parse the md5sum format; exits 0 on a tampered tree). Replace with a macOS+Linux-safe command everywhere. (2) `CHECKSUMS.txt` lists itself with the empty-string hash → even `md5sum -c` reports `CHECKSUMS.txt: FAILED`. Fix the generator (correct self-hash or omit). `tools/package-delivery.sh` uses Linux-only `md5sum`; make its verify portable, keep refuse-to-emit.
**HOW TO CHECK:** tamper a byte in a scratch copy → NEW command FAILS (non-zero, names the file); pristine → PASSES. Paste both.

## ITEM 4 (P1 — docs) — reconcile 13b + publish stdout
Three docs contradict the 13b status; `SHELL-STATUS.md` is stale (regenerate, never hand-write). Make them agree; publish the 13b stdout (currently missing from `ACCEPTANCE-RECEIPTS.txt`).
**HOW TO CHECK:** three docs agree; receipts carry the 13b block; `node tools/shell-status.mjs` regenerates clean.

## ITEM 5 (P1 — a11y) — D2 + S3
D2: value cells use `aria-label="OVR"/"WINS"/"PRIO"/"GONE%"`, which REPLACES the value for screen readers — they hear the column name, not the number. Fix so the value is announced (`aria-label="{r.ovr} overall"`, or drop the per-cell label, or real table semantics). S3: the gone% `.cp-sr` description must sit on a FOCUSABLE element.
**HOW TO CHECK:** probe reads a value cell's accessible name and asserts it contains the value; keyboard reaches the gone% description.

## ITEM 6 (P1 — one-click safety) — R1 + S2
R1: `.cp-quick` dispatches PICK on click with no confirm/debounce — a double-click or Enter auto-repeat can draft twice. Add a confirm/"Drafted X · Undo" or ~300–400 ms guard. S2: the `.cp-confirm` banner stays armed after the pick lands → disarm it (a second PICK must not be possible).
**HOW TO CHECK:** double-click / held-Enter law → exactly ONE pick; `.cp-confirm` gone after the pick.

## ITEM 7 (P1 — restore copy) — S4
The restore-replay copy in `Complete.svelte` (`record.pickSlot !== undefined` branch) is gated off on the RESTORE path, so a reloaded slotted draft never shows it. Make it show on restore.
**HOW TO CHECK:** save a slotted draft, reload (boot rehydration), assert the reassurance renders.

## ITEM 8 (P1 — seeds) — R2 + S5
R2: auto-draw is `1000 + random*9000` (only 8,000 drafts). PROPOSE a wider range (don't blind-change; touches variety) and write the resolved seed back to the URL (`?seed=…`). S5: the one-click wrap band 431–1179px is untested — add a law at ~768px (no horizontal scroll, quick button usable).
**HOW TO CHECK:** the Item-1 round-trip covers the new range; the 768px law passes.

## Corrections to use (verified — do not repeat the stale versions)
- c10 host = **51 files, 49 CHECKSUMS entries, 48 OK / 1 failed** (→ 49/49 after repair). NOT 52. Fix any "52" assertion to 51.
- P-317's `pickSlot` was introduced at **`06d89724`** (24 mentions in the diff, zero in its parent). `560b8364f` carries the lines via cherry-pick; `408410477` is the docs-only plan-M commit and did NOT introduce `pickSlot`. T1 is unblocked either way.
- `408410477` is the live pin (69 engine files); `d3bd81d2` is byte-identical (57/57). The published c10 slice's engine suite is RED 277/286 — six flex tests on REV 4 vs a `PIN_ENGINE` mismatch; that is a test/pin re-point (the Architect's `claude/patches/cakepanz-test-repoint-2026-11-20.patch`, commit `17e79b1`), NOT a product defect, NOT your task.

## Deliverable & push discipline
One commit per item, `git add -- <paths>` (never `-A`), commit, `git push origin council/zai`, verify with `git ls-remote`. Never force-push; never `git stash` (WIP commit instead). Every item ships its receipt. State what you did NOT do. Chat-only: if push hangs, package the sitting as a zip per §6 and hand it to the Owner's relay — never claim a delivery without a pushed commit or a download link.

## One-line summary
Top to bottom: (1) seed round-trip bug (7.8% mis-replay, P0); (2) F20 guard so 13b closes; (3) macOS-safe verify + CHECKSUMS self-line; (4) doc reconciliation + 13b stdout; (5) a11y D2+S3; (6) one-click confirm/debounce/disarm; (7) S4 restore copy; (8) seed range + URL write-back + 768px wrap. No ring build, no c10 re-cut, no passGap re-run, no fourth ring measurement.