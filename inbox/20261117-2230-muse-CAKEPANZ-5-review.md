SPEAKER: muse | ROLE: High Councillor | TASK: cakepanz-5 verification + w89 comparison | DATE: 2026-11-17T22:30Z
FOR: R-13
REVIEW-OF: 67-cakepanz-5-2026-11-17 (Z.ai; hosted byte-identically on council/beam `d25b54c2`, council/inkling `d425703b`, council/glyph `be977836`; two trees: cakepanz-4 shipped at pin 5c808472, cakepanz-4-prepared at pin 65673a00, NOT activated)

This is VERIFICATION, not an independent review: MUSE authored the Cakepanz-5 v2 prompt this delivery executes. Every claim below is labelled. All re-runs are MUSE's own, from clean extracts of the pushed branches, Node v24.22.1, unless marked REPORTED (Z.ai's receipts, not re-run).

## 1. The delivery is the delivery (VERIFIED)

- The three hosted copies are byte-identical: 684 files each, `diff -rq` clean between glyph/beam/inkling copies.
- Shipped `src/engine` is byte-identical to the Architect's `5c808472` `colors/src` (67 files, `diff -rq` clean). Prepared `src/engine` is byte-identical to `65673a00` `colors/src` (68 files, `diff -rq` clean; the +1 is `passclass.ts`).
- Flex table: 99 rules, counts {0:17, 2:17, 6:42, 12:23} — the verified counts. Pool packs byte-identical to the tip (2023–2025 md5 `d80c312b93a93c87249eab1e31196a55`). Prepared tree adds the two GLM packs at 1,957 B and 1,942 B, exactly as claimed.
- The zip SHA-256 in Z.ai's handback (`9a213e66…`) is UNKNOWN — the zip lives on Z.ai's machine, not in the repo. The trees are the verified artifact.

## 2. The batteries, re-run by MUSE (VERIFIED)

- Engine suite, shipped: **394/394, 0 fail** (`node --test --experimental-strip-types test/engine.test.ts`, ~84 s).
- Engine suite, prepared: **406/406, 0 fail** (same command; the +12 are the pass-class tests).
- Node battery, shipped, via the Part D register hook: **26/26, 0 fail** — including N21 (older-build note) and N22 (packs law).
- Receipt falsifier, shipped: **F0 baseline OK, F1–F8 all DIED** ("every falsified law DIED — the battery is falsifiable"). Re-run took ~115 s.
- Slice battery, fresh copy (`npm ci` then build + distfile + preview): **29/0/10/3** (29 pass, 0 fail, 10 loud SKIPs, 3 DEFER).
- Shell battery, fresh copy: **46/0** — one uninterrupted run; the 390px walk is clean on all 14 screens (390/390 each); file:// boots at Team Select (32 teams, 32 slots); zero page errors across the walk and the restore flow.
- Gates on the extract: manifest PASS (316 entries verified, dist/ covered, converse clean); numerals CLEAN ×2.
- README line 15 now reads "29 pass · 0 fail · 10 SKIP" — the D-3 nit is fixed (VERIFIED).

## 3. D-1, D-2, Part D (VERIFIED)

- **D-1 (playwright undeclared):** FIXED and proven from a fresh copy — `npm ci` (41 packages) then `require.resolve('playwright')` → the tree's own `node_modules/playwright/index.js`. No HOME-global fallback remains in batteries/scripts/tools/test (grep clean). The browser binary for 1.57.0 was NOT in this VM's cache (only 1254/1255); `npx playwright install chromium` fetched chromium_headless_shell-1200 and the batteries then ran. That install step is a machine setup step, not a tree defect — but a fresh machine needs it, and the delivery does not say so anywhere. One line for the next prompt.
- **D-2 (falsifier green lie on Node 26):** FIXED. The transform flag survives only in comments; the live spawns go through `scripts/node-port-register.mjs`. The shell falsifier adds per-process port isolation (PID-derived port base) and a stale-server guard (served asset hash vs the copy's build), and COULD-NOT-RUN is a named red failure, exit 1. The receipt falsifier was re-run green above; the shell falsifier was NOT re-run by MUSE (REPORTED from Z.ai's receipts — the sequential isolated-port run, all three DIED).
- **Part D (precompile):** the register hook auto-generated `src/engine-node/` on first use: 68 files (67 engine + `.stamp.json`), and the ONLY file differing from the snapshot is `platform/localstorage.ts` — exactly the one parameter-property transform. The generator guards: it expects exactly one parameter property at the known anchor and throws (telling the seat to file to the Architect) if the count differs. The snapshot is untouched (`diff -rq` clean against the pin).

## 4. The prepared re-pin (VERIFIED, NOT activated)

- **Default-off proof, re-run by MUSE:** `scripts/gamelog-fixture.mjs` on both trees (60 games each) → the `defaultOff` sections are EQUAL (Python deep-compare True), `games` equal, `pack` equal. The prepared file carries two extra sections (`absentVsPresent`, `gapReplay`) the shipped file does not — expected, they are tip-only fixture sections. The empty grep holds: `passClass`/`passGap` appear nowhere in the prepared copy's shell code. The prepared tree stays NOT activated, per the prompt — activation is one step on the Owner's word.
- **M3 swap test: REPORTED, not VERIFIED.** The shipped `VERIFY.txt` §12 describes both directions in prose (tip → shipped: suite 394/394, slice 29/0/10/3, PASS; old pin → prepared: FAILS AT LOAD, passclass.ts missing). But the tree carries NO log file for the current M3: the only swap logs present are `deliveries/receipts/swap-test.log` and `swap-test-7a0706df.log`, both the OLD 7a0706df-era receipt (formation-gap and no-arbitrage laws failing — the flex-formula sitting). The prepared tree's `VERIFY.txt` §8 cites `swap-rehearsal-5c808472.log` and `swap-m3-oldpin.log` — neither file exists in either tree. And §8 itself is stale-carried: it describes the d3bd81d2-era rehearsal (node battery 23/23, slice 26/0/10/3), not the current tip. The M3 prose is detailed and its mechanism (LOAD failure on the missing module) is checkable, but the receipt logs are absent. The next sitting should re-run `swap-test.mjs` both directions and ship the logs under the cited names.
- **Stale labels (minor, file them):** `scripts/acceptance-run.sh` step 3 still says "expect 24/24" — the node battery is 26/26 (the script only checks exit 0, so the run still passes; the label is wrong). `batteries/shell.battery.mjs`'s header comment still prescribes `node --experimental-transform-types batteries/shell.battery.mjs` and calls the flag "REQUIRED on any Node" — Node 26 removed it; the register hook is the real invocation (acceptance-run.sh step 8 has it right).

## 5. Part F (VERIFIED where re-run)

- N21 (older-build note) and N22 (packs law) pass in the node battery (see §2). F7/F8 died in the receipt falsifier (see §2). The P-317 §5 filing is in the tree (`_agents_zai_inbox/20261117-2100-zai-cakepanz-shell-p317-s5-filing.md`); its anchors were already verified against the tip by Inkling's checklist, not re-checked here. The saves-states probe (5/5) and the older-build note are REPORTED from Z.ai's receipts with screenshots in the tree (not re-run by MUSE).

## 6. The w89 comparison (MUSE's own work — FOR: P-366, P-367)

Method: w89 read from `origin/gh-pages` (`Football-Sim-Z-post-blue-w89.html`, 1,920,191 B); the shell read from the shipped tree + its built `dist/single.html`. All anchors below are VERIFIED from the files, not from memory.

**What matches (so the next round does not re-check it):** the light/dark token values are w89's values verbatim (light bg `#fdf2f6`, panel `#ffffff`, panel2 `#f9e9f0`, text `#8e5566`, sub `#885261`; dark bg `#1e1119`, panel `#291a24`, panel2 `#35202d`, sub `#c99cae`; golds light `#e6c67d/#ad7f2e/#9a6b1f`, dark `#e8c87e/#c39a4a/#8a5f18`); the 32-team palette JSON is verbatim w89's map; the feed's `zrl-*` classes are w89's (90 occurrences in w89, same classes in the shell); the "me" glow is present in both; the brand reads "76 Pancakes" in the shell header; Cinzel IS inlined as base64 (an improvement on w89's Google-Fonts link — deliberate, per the ruling).

**The strays, most visible first (VERIFIED):**

1. **The team takeover is a visual no-op.** The shell's `teamRemap` (`src/lib/port/tokens.ts`) sets exactly three custom properties, `--zpb-t1/2/3`, and `tokensApply.ts` writes them to the document root — but NOTHING consumes them: zero occurrences of `var(--zpb-t1)` (or t2/t3) in any stylesheet or component, and exactly one occurrence of each string in the built `dist/single.html` — the setter itself. The `[data-zpbteam]` blocks in `tokens-w89.css` are empty. Pick a team in the shell and the palette does not change. w89 remaps "every accent token to the user's franchise (JS computes accessible tones)". This is the deepest stray in the round and it is the one the Owner's palette ruling ("every team's color changes almost every aspect of the color palette") turns on.
2. **The body copy is set in Cinzel; w89's is a system sans.** The shell's `--font-ui` is `'Cinzel', Georgia, serif` (`tokens-w89.css:65`), applied to `body.cp-body` (`shell.css`). w89's body is `14px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif`. Every paragraph, button, and table cell in the shell renders in a display serif where w89 renders a readable sans.
3. **The wordmark is the wrong face, in the wrong weight file.** w89's brand header (`.zpb-home h1`) and view headings use Bodoni Moda first (`'Bodoni Moda',Didot,…`). The shell has ZERO Bodoni Moda anywhere; its `.cp-brand` uses `--font-display` (`'Cinzel Decorative','Cinzel',Georgia,serif`) at weight 800. And the shell inlines only TWO `@font-face` blocks: Cinzel weight **100** and Cinzel Decorative 700 — w89 loads Cinzel 700/900 and Cinzel Decorative 700/900. The shell's heavy display text is drawn from a weight-100 file (faux-bolded) where w89 has real 700/900 faces.
4. **The slogan line is missing.** w89 shows "Can you go 20-0?" as a visible line (`zpb-cygline`, shimmer on "20-0") and in its meta description. The shell has zero occurrences of "Can you go" anywhere (src, Guide, title, meta). The locked slogan is absent from the product.
5. **The value label is the shell's own invention, and the Owner's preferred term is a third one.** w89's column header reads "Value". The shell labels it "Model Value" (`src/lib/valuation.ts:11`, Guide legend). The Owner's preferred term is "Engine Value" — which appears in neither tree. Three terms, none of them agreed; the label needs the Owner's word (P-367).
6. **The two-point chip says "2PT"/"2PT FAIL" where w89 says "2-Pt Conv".** (`src/lib/port/feedVM.ts:100-101`.) w89's UI-facing text is "2-Pt Conv" (11×); its two "2PT" hits are a base64 blob and a terse stat abbreviation (`${s.tpc} 2PT`, alongside `FR`/`TD`). One of the 11 Owner rulings still owed (P-366).

**Faithful shared defects (NOT strays — the shell reproduces w89, defect included):** the dark `--text` failure (3.17:1) — w89's dark block never sets `--text`, so the light plum ink carries over, and the shell's token sheet reproduces that with a comment saying so; the light gold2 failure (1.51:1 on pale rose, 1.65:1 on white). Both are on the record as measured, both need the Owner's word to change, and neither is the shell straying from w89. The "never print Touchdown" law has no source in either tree (w89 prints "touchdown" 58×, the shell's engine strings 48×) — report that, don't invent one.

## 7. Addendum — VL's Part B finding, resolved (2026-11-17, after this filing was written)

VL (22:14Z) found the prepared tree's README claims pin `5c808472`, 67 files, byte-verified — while the tree carries `passclass.ts` (added at `65673a00`). **Resolved by measuring both ways, MUSE:** prepared vs `5c808472` = 66/68 match (game.ts modified, passclass.ts added) — VL's numbers exactly; prepared vs `65673a00` = `diff -rq` CLEAN, 68 files — the tree is purely the GLM tip, NOT a mixed/transitional state. The defect is documentary: prepared `README.md` lines 1/3/8/14 and `MERGE-README.md` still claim `5c808472`/67 files/394 tests (copied from the shipped tree); `SNAPSHOT.md` correctly says `65673a00` with the diff exit 0. Fix: one doc edit by Z.ai. It does not affect variant 1 (shipped) merge-readiness, and VL's "before either variant is considered merge-ready" is over-broad as written — the shipped variant is unaffected.

The pattern behind it: the prepared tree's prose docs were copied from the shipped tree and only partially updated. The same staleness shows in `VERIFY.txt` §8 (d3bd81d2-era rehearsal, 23/23, 26/0/10/3), `VERIFY.txt` §3's "24/24" node battery, `acceptance-run.sh` step 3's "expect 24/24", and the MERGE-README's "310 entries" (measured 316 shipped). The bytes and SNAPSHOT.md are right; the prose docs understate the prepared counts (394 not 406; 24 not 26; 310 not 316). The actual counts, re-run: prepared engine 406/406, node battery 26/26, manifest 316 (shipped).

Beam's Cakepanz-5 review (22:30Z, Node 26, verdict ok) agrees with this verification on the re-run numbers (406/406, 26/26, precompile). Three of his lines are stale, none of which touches his verdict: he took the pin claim from VERIFY.txt without re-measuring (so he missed the README discrepancy); he quotes the stale "24/24" node battery; and his F2/F3 note repeats the "mutation targets moved since Cakepanz-3" premise the 11:43 round settled as NOT true (both anchors present verbatim; the portability, not the targets, moved).

**Ok — merge-ready behind the P-317 store change and the Owner's rulings** (the same bar as Cakepanz-4). The engine work is verified end to end (pins, suites, default-off, Part D, D-1, D-2); the batteries re-run green on a fresh copy; the prepared re-pin is proved and correctly NOT activated. The w89 comparison's headline finding — the team takeover is a no-op — is a shell defect the next sitting should fix, not a blocker on the re-pin: it is UI work, and it is exactly what the council prompt filed alongside this verification asks the council to check independently.

## BLOCKED / OPEN / NEXT

- BLOCKED: nothing in this delivery. The P-317 store change (Architect) and the Owner's rulings (shell of record; the 19-row DELIVERY-DECISIONS table; P-364's 430-vs-560; the dark `--text` fix; Bodoni Moda; the value label; the 2PT chip) are the open decisions, not this delivery's defects.
- OPEN: the current M3 has no log file in the tree (see §4); the shell falsifier (FA/FB/FC) was not re-run by MUSE this round; the zip SHA is unverifiable from the repo.
- NEXT: council w89-comparison round (prompt filed alongside this verification, FOR: P-366/P-367); Z.ai's next sitting fixes the team takeover and the stale labels (acceptance-run.sh step 3, shell.battery.mjs header) and ships the M3 logs under the cited names.

## Addendum 2026-11-17 (Owner ruling, after filing)

**"Engine Value" must not appear to the user (KG ruling, 12:38 HST).** This filing's value-label line ("The Owner's preferred term is 'Engine Value'") is superseded: the user-facing label is NOT "Engine Value". The P-367 label question is now w89's "Value" vs the shell's "Model Value". The council w89-comparison prompt filed alongside this verification was corrected to say so before pushing.
