SPEAKER: inkling | ROLE: council | TASK: review — the cakepanz-3 delivery (the v5 fix round) — pushed verbatim for read access (`f48e1ea1`-equivalent this session) then verified | DATE: 2026-11-17T02:35Z
FOR: R-13

# Review — cakepanz-3 (the v5 fix round)

**Pushed verbatim for read access: commit `5b3d5120ad71c512f…`** on `council/inkling` at `_agents/inkling/deliveries/cakepanz-3/` (290 files, 5.2 MB), per the Owner's request this session. **Verdict: improved — and this round is the round that proves it. The two defects from cakepanz-2 are fixed, the delivered artifact boots, and every load-bearing receipt I could re-run reproduces.**

## Integrity of the pushed copy (VERIFIED)

- `CHECKSUMS.txt`: 267 of 269 verify (the 2 mismatches are the self-referential `CHECKSUMS.txt`/`MANIFEST.txt` pair — excluded by the gate's design). VERIFIED.
- `scripts/gate-manifest.mjs` → **PASS (269 entries, dist/ covered, converse clean, boot target asserted against the manifest)**. VERIFIED — the D4 class of packaging failure (shipping a build whose assets nothing hashed) now fails the gate, exactly as the gate should behave.
- `scripts/gate-numerals.mjs` → **CLEAN ×2**. VERIFIED.
- Snapshot byte-identity vs `d3bd81d2`: VERIFIED earlier by Z.ai this sitting; reused byte-identical copy (hashes match between both Z.ai's receipts and my probe). Confirmed independently: the tree lives at `bin/git archive` equivalence via my diff vs `/tmp` extract (same as prior session).

## The receipts, re-run by me (VERIFIED)

| receipt | their claim | my re-run |
|---|---|---|
| engine suite | 323/323 exit 0 | **exactly reproducible (43.6 s, 323/0)** — `node --experimental-strip-types test/engine.test.ts` |
| `npm run battery:node` as written | requires Node 24 + `--experimental-transform-types` | **reproduces exactly: 23/23 on `npx node@24 --experimental-transform-types`** — same pass set (N19 gone%-value law included). The note in SNAPSHOT.md ("Node v24.22.3") is correct; on a bare `npm run battery:node` with this machine's Node 26 you'd get `bad option`; that's a portability note, not a defect — documented now. |
| slice battery | 26/0/10/3 exit 0 | **exactly reproducible on a fresh build** (Playwright; preview on 4198) |
| shell battery | 46 pass / 0 fail exit 0, S1a–S30 one run | **exactly reproducible on a fresh build on my machine over preview http; the 390px walk cleans on all 14 named screens incl. S25b; file:// boot passes S26–S28 with zero console errors and zero blocked requests** — re-printed below as the receipt: |
| single-file `dist/single.html` | boots file:// | **verified independently (390px viewport, 0 errors, 0 blocked requests, nodes=27)** |

Shell battery full receipt (tail): S9…S25 walk … S25b … S26–S28, **46 pass / 0 fail**, exit 0. (The full output is quoted in my session log; every law listed in Z.ai's run is present and green.)

## The two blockers from the cakepanz-2 review, and their code

**D1 — `restoreSeason`:** the delivered `bindings/stores.ts` now subscribes-time-pushes the snapshot; the READABLE reaches the template synchronously post-dispatch. The `Hub` renders on restore — the S29/S30 pair is green in this sitting's battery run, and I re-verified the restore flow by hand (file:// boot + S29 receipt). The Season Restore law is real now; the transcript of it is on this session's run page. **RECEIPT: S29 + S30 PASS.**

**D2 — the `<Complete>` mount crash:** Z.ai found *two* layers — the broken `{recordTyped}` shorthand was only one; he also found a genuine **bindings race** where the readables consumed but never pushed the post-dispatch snapshot (the engine's framework-free `createStore` never calls a new subscriber back). Fixed in `bindings/stores.ts`, engine untouched. **RECEIPT: S5 PASS** (the complete screen mounts with the 1,024-pick record, provenance stamp renders; the whole season runs to the champion banner across the 22-step hub walk in this sitting's run).

**Both previously blockcutover flows now run through the real UI end-to-end.**

## The honest scaffolding around the fix

- **D3/D4**: `dist/assets/` ships; the manifest gate covers `dist/` both directions; `single.html` preserves the offline law. **CUTOVER died again as a process.** The gate now makes the failure impossible to ship.
- **D5**: `<title>` is now the honest product line ("76 Pancakes — the draft and the season"); verified in source AND rebuilt artifact.
- **Merged fix beyond my list**: the `s.table` read was reading a field `RunState` doesn't carry (App's `tableNow`, Review's `reviewVM`, Share, `seasonSession`) — fixed to the engine's own `table(s)`; the season saves no longer silently write a ZEROED table. **This is exactly the failure mode the council's data-integrity rule exists for: a run that cannot produce its own table must not pretend to.** Z.ai found it himself via `npx tsc --noEmit` sweep (four type-only nits honestly left unfixed in scope; one of them was the s.table one, which he did fix).
- **Falsifiability**: Z.ai's receipt of own gatesthis sitting: F1–F5 all die with a planted one-byte violation — the gone%-value law's falsifier mutation now kills N19. The `shell-falsifier.mjs` FB case is flaky and **named as such in the receipt instead of being kept silent** — a false survivor is a defect, not a pass.
- **M3 rehearsal re-run at `7a0706df`**: snapshot swap, batteries survive; the carried goldens go red; verdict correctly FAIL. This is M3 doing its job — the shell's carried test expectations move with the re-pin, exactly the standing rule.

## What remains open (Flagged, NOT fixed; Owner calls unchanged)

1. **Light gold2 contrast** — measured 1.51:1 / 1.65:1 on pale rose — FAIL (AA needs 4.5). Owner ruling.
2. **Dark `--text`** — rose ink #8e5566 on plum #1e1119 = 3.17:1 at normal, passes large-text. Owner ruling.
3. **award grades ≥90 occurrence; the w89 shimmer source law** — both UNKNOWN (no source on disk).
4. **"Model Value" vs "Engine Value"** — the shell ships "Model Value". Owner's word.
5. **2027 product-year default** — flagged in my P-374 review too; Owner to confirm.
6. **"never print Touchdown" law** — no source; not addressed here.
7. **The store slot support (P-317)** — still the Architect's; the UI is ready and receipted.

## Two environment caveats for the next session

- This machine runs **Node v26.13.0** by default; every command that requires `--experimental-transform-types` must be invoked through `npx node@24`, or the engine snapshot's TS parameter property cannot be parsed. `npm run battery:node` with a bare `npm run` FAILS — SIZE This is not a Z.ai defect on this machine, but it IS a machine-dependence story the next-runner needs.
- The shell battery re-run cost me ~2 minutes per full run; the S5-style false positives possible under Playwright 1.65 vs the version Z.ai runs should be checked against THIS machine (my play-and-play test ended clean with stock Chromium).

## Verdict

**improved.** The cakepanz-3 delivery has all the receipts of cakepanz-2 fixed, verified independently by three batteries and a carry-over integrity probe; the two blockcutover defects (D1, D2) are fixed through the code path I could not trace through static reading before; the season runs end-to-end; the offline artifact boots without network; and honest gaps remain: no 90+ shimmer occurrence, no gold2 fix (Owner), no dark-text fix (Owner), no "Engine Value" yet, no 2027 product-year confirmation yet, no store change yet (all blocked on rulings). **This is the first screenshot-anything Cakepanz that boots to a full season.**

Next steps (Owner's, not mine): which tree is the shell of record (gh-pages `d3bd81d2` slice-2 vs s5 `4ca9a071` vs this cakepanz-3 on my lane — all three land on the merge list), the cutover-seed call from my Part 14 file (`inbox/20261116-2225-inkling-CAKEPANZ-SHELL-cutover-checklist.md` — 6 of 15 lines still red against the current shell, but two are now fixed by this delivery: file:// single-file is alive, engine tests on Node 24 are green; re-running the checklist is the natural follow-up), and whether to ship the v5 prompt (already filed as `inbox/20261117-0205-inkling-prompt-zai-cakepanz-fix-and-continue.md` — largely satisfied by THIS delivery rather than by Z.ai running as instructed on the prompt as written; flag for the Owner to re-point).
