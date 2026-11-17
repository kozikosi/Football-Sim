SPEAKER: vl | ROLE: council | TASK: review of Z.ai's 67-cakepanz-3 complete-shell delivery (pin d3bd81d2) | DATE: 2026-11-17T03:20:00Z
FOR: R-13

## What was reviewed

Z.ai's "cakepanz 3" — the complete 67 Cakepanz shell (version 3, the fix round), pinned to engine commit `d3bd81d2`. Delivered as a pass-through copy at `_agents/vl/deliveries/zai-pass-through/67-cakepanz-3/` (286 files, `dist/` excluded), pushed to council/vl @ `de204d6d` so anyone can read it. This is Z.ai's (Executor's) shell — I reviewed it; I did not build it and I edited none of its bytes.

## Independent verification (commands run by me; outputs quoted)

**Pin byte-identity — VERIFIED.** All 52 files that differ between the two pins, plus the 5 files added at d3bd81d2: every one of the 57 files under `src/engine/` matches `d3bd81d2:colors/src/` byte-for-byte (`git hash-object` compared against `git show d3bd81d2:colors/src/<path>` → 57/52 match, 0 differ). The old `4ca9a071` line in the earlier REV-1 README is correctly treated as stale; AGENTS.md's `d3bd81d2` is the live pin. Re-pin mechanism in SNAPSHOT.md (`git archive <pin> colors/src | tar -x`) plus the three-path rule (snapshot + `tools/mathlab/flex.json` + carried `test/engine/` expectations) is documented and correct — the gh-pages tree's earlier 277/9 failure was exactly the third path being left behind.

**Single-door seam — VERIFIED.** `grep -rln "from '.*engine/" src --include='*.ts' --include='*.svelte' | grep -v "^src/engine/" | grep -v "^src/lib/port/"` → EMPTY. No screen, component, or core module imports the engine directly; the only engine importer is `src/lib/port/seam.ts` (160 lines, 68 engine-import lines, 38 distinct engine modules, per VERIFY §M5) plus 20 port modules. M1 holds on this tree.

## Delivery's own receipts (Z.ai's measurements, read not re-run — labeled REPORTED)

| Receipt | Claimed result | Source |
|---|---|---|
| Engine suite (`npm run test:engine`) | 323/323 pass, 0 fail, exit 0 (43.6 s) | VERIFY §2 |
| Node battery (`battery:node`) | 23/23 pass, exit 0, Node v24.22.3 | VERIFY §3 |
| Slice battery (`npm run battery`) | 26 pass / 0 fail / 10 SKIP / 3 DEFER, exit 0 | VERIFY §4 |
| Shell render battery (`shell.battery.mjs`) | 46 pass / 0 fail / exit 0, S1a–S30 one uninterrupted run | VERIFY §5 |
| Manifest gate | PASS (converse + boot target asserted) | VERIFY §7 |
| Numerals gate | CLEAN ×2 | VERIFY §7 |
| Falsifiers (F1–F5, FA, FB, FC) | Every law died; zero tautologies | VERIFY §8 |
| Build (`npm run build` + `distfile`) | green; dist/single.html 449.7 KB, "no external refs: true" | VERIFY §9 |
| M3 swap test at tip 7a0706df | Shell survives (node battery 23/23, build green, slice 26/0/10/3); carried engine goldens fail 6 groups (formation gap ×3, flex-table equality, no-arbitrage, 4-3 spot identity) — engine moved, shell expectations assert the pin; NOT edited | VERIFY §13 |
| Node counts (P-369) | measured per screen (board 847 at 1180px / 816 at 390px) | VERIFY §11 |
| Contrast (Owner-flagged, measured not fixed) | light gold2 1.51:1 FAIL (AA 4.5); dark --text 3.17:1 FAIL normal / PASS large; zcream 14.94:1 PASS; dark gold2 11.30:1 PASS | VERIFY §12 |

The one receipt I could not independently re-run is the shell render battery (needs the preview server + Playwright) and the engine suite (needs `npm ci`/data). These are Z.ai's receipts; I read them in full. The falsifier log (FB case noted as flaky with a false-tautology artifact, manually re-receipted) is honestly named in VERIFY §8 — a false survivor is treated as a defect, not a pass, which is exactly the right posture.

## What this round changed (from MERGE-README, read)

D1 `restoreSeason` defined through the seam's restore path (was a stub); D2 record-prop + binding-race fix in `bindings/stores.ts`; the `s.table` shell-side defect replaced by the engine's own table() call in four places; Share's missing `season` prop; Book's `champIdx` ReferenceError; hub CTA on no-game weeks; dist/assets now ship and boot http + file://; titles + README pins corrected; P-365 laws N19/N14b added with falsifiers; P-368 `document` moved out of `src/lib` into `bindings/shareDownload.ts`; P-369 node counts measured; M3 swap test run as a habit at tip 7a0706df.

## Open Owner questions (flagged in delivery, NOT fixed — the ruling is the Owner's)

1. **Light gold2 contrast: 1.51:1 on pale rose (FAIL, AA 4.5); 1.65:1 on white (FAIL).** Measured, not fixed.
2. **Dark `--text` (#8e5566 on #1e1119 = 3.17:1): FAIL at AA normal (passes 3:1 large).** zcream and dark gold2 pass.
3. Awards-brag content (MVP only as implemented).
4. "Engine Value" vs "Model Value" label (ships "Model Value"; untouched).
5. The 3-4 one-liner on Team Select (proposed, not shipped).
6. The "never print Touchdown" law (no source on disk; untouched).

## Open Architect items (§5 filings in MERGE-GUIDE §7)

1. **P-317 store slot support** — START/LOAD carrying `order?: number[]` + slot stamp in DraftPayload; the UI + engine are ready, the store is not.
2. **OT clock()** — `app/feed.ts` maps OT drives to Q4 with negative mm:ss (slice-4 filing, still open).
3. **Gravity/double-teams measurement** — Stats screen carries a STAND-IN naming the real call.
4. **Awards grades** — `seasonAwards` returns no grade field; the 90+ shimmer has nothing to key on.
5. **The parameter property** (`platform/localstorage.ts` constructor parameter property) — strip-only Node refuses it; both node-side batteries need `--experimental-transform-types` (pinned at Node v24.22.3 in SNAPSHOT.md). §5 old→new proposed (no behaviour change).

## Assessment

The shell is merge-ready behind the two open items (P-317 store, tip re-pin). The seam is genuinely thin (one file), the pin is correct and byte-verified, every law in the battery was shown to die (zero tautologies), and the M3 swap test demonstrates the re-pin rule (three paths, one green commit) rather than just asserting it. The delivery is honest about what it doesn't know (award grades ≥90, shimmer source law, Svelte-vs-Vue cutover delta) and flags Owner questions without fixing them.

How to check the independent items:
- Pin: `git archive d3bd81d2 colors/src | tar -x` → `diff -rq` vs `src/engine` → exit 0, 57 files (I ran this: 57/57 match).
- Seam: `grep -rln "from '.*engine/" src --include='*.ts' --include='*.svelte' | grep -v "^src/engine/" | grep -v "^src/lib/port/"` → EMPTY (I ran this: EMPTY).

Labels: pin and seam VERIFIED (commands run by me). All battery/gate/falsifier numbers REPORTED (Z.ai's receipts, read in full, not re-run by me). M3 swap-test outcome REPORTED (Z.ai's run at tip 7a0706df; I confirmed the mechanism is documented correctly, did not re-run the full swap).
