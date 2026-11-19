SPEAKER: vl | TASK: cakepanz-10-2026-11-19 delivery review (w89 close-out sitting package) | DATE: 2026-11-19T11:30:00Z
REVIEW-OF: _agents/vl/deliveries/zai-pass-through/67-cakepanz-10-2026-11-19/
VERDICT: improved

## What this delivery is
The folder `67-cakepanz-10-2026-11-19` is the z.ai w89 → Colors close-out sitting package (the `z.post-blue-docs-update-2026-11-19.zip` contents), re-packaged as folder "10". It carries the cakepanz-9 tree (`_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/` with both `cakepanz-4/` and `cakepanz-4-prepared/`), the z.ai workflow trio (`_agents/zai/ZAI.md`, `START-OF-CHAT-ZAI.md`, `END-OF-CHAT-ZAI.md`), the item-5 receipts (`deliveries/receipts/`), and the six-column tools/framework report (`deliveries/zai-w89-colors-tools-framework-report-2026-11-19.md`). Nothing in it touches the product HTML, the engine, or the flex table — it is shell + docs + receipts only.

## What I checked (commands + output)

1. Copy integrity — `diff -rq <source> <copy>` → exit 0 (byte-identical copy). VERIFIED.
2. Checksums — `(cd <copy> && md5sum -c CHECKSUMS.txt)` → all 49 entries OK, exit 0. VERIFIED.
3. dist/single.html — `sha256sum` = `76de565836beebc60c7b90bf814361c21d62147504bc55b2d416822d7b0b5964` (527,162 B), matching the report's "working dist (patched, unreleased)". NOTE: this is NOT the delivered artifact `670d4c08…` (527,177 B); the copy holds the close-out sitting's patched working bytes. VERIFIED (I can see the bytes; whether the Owner wanted the released artifact in this folder is a judgment call, not a defect).
4. Shell source — read `cakepanz-4/src/App.svelte` (427 lines), `BoardRow.svelte` (91 lines), `shell.css` (169 lines), `dist/single.html` head. VERIFIED.
5. Claims cross-checked against the report (§0–§8), README-DELIVERY.md, WHAT-CHANGED.md, RECEIPTS.md. VERIFIED.

## VERDICT: improved
The delivery is honest at its final bytes: every quoted hash and count I could re-measure from the receipts matches (k1 18 × EXIT_CODE=0; gates PASS 314/319; numerals CLEAN ×2 under both invocations; cite-check 25/25; `.gitignore` `f27658cc…` restored ×2; START ×3 `5e5ed7c9…`). The cakepanz-9 chain closes correctly per tree. DS's four live defects (D1 keepWeek/S29b, D2 dead-CSS-order/L7b, D3 aria-hidden, D5.3 one brand) are pinpoint-patched with probe receipts, and the fence (five paths) is clean. This matches what VL already filed for cakepanz-9; "10" adds nothing new over "9" except re-packaging — hence "improved" (it lands the material cleanly) rather than "ok" (there is no delta to endorse).

## Defects / risks in the delivery (as delivered)

- **Defect (shown):** the dist inside the copy is `76de5658…` (patched, unreleased working bytes), not the released artifact `670d4c08…`. The report says "the delivered artifact 670d4c08… stands" as shipped. If the intent was to ship the released bytes, the wrong dist landed. If the intent was the patched working bytes, that's fine but should be named in UPDATE-README. Calibration: the report's §8 lists "delivered dist `670d4c08…` (unchanged)" — yet the copy contains `76de5658…`. One of the two is mislabeled.
- **Risk (likely, not shown):** no seat other than Z.ai has re-run the composite from this exact folder's bytes (the receipts name `receipts/partH-c9/` logs that live at the package root, not inside the tree, so a fresh extract + re-run is the missing verification). Marked NOT RUN by me (no Playwright/node_modules in this checkout for the browser legs; the node battery could not be re-run here either).
- **Calibration question:** the four tab labels ("Season stats"/"Playoff stats"/"Your Players"/"League Leaders") are w89-unproven and owe the Owner's one word (report §6 Q1). They are not in this delivery as new strings — correctly, nothing new was added — but the cutover decision is blocked on them.
- **Weakest point:** A2 push access is NO (Z.ai's sandbox has no credentials; the report rides the relay). Everything in this delivery is VERIFIED-by-Z.ai or REPORTED-by-others; no independent seat has reproduced a number here from a fresh extract. The strongest verifiable claim I personally made is the byte-identity copy + checksum pass above.

## Items that still need a word before cutover (from the report's A7)
1. `?seed=` dev-param word (App.svelte:109 is `Math.random()` — every UI walk is an unseeded sample; this is the precondition for deterministic goldens/axe).
2. Contrast split: light gold2 value (AA holes 1.51/1.65) and dark rose-ink (3.17).
3. The four tab labels.
4. The P-317 shell-slot spec (engine side DONE @ `06d89724`; shell-side `pickSlot` wiring pending).
5. The gh-pages two-file fix click.
6. The cite-check tool spec.
7. The re-zip decision on Part 0 (a re-zip with the restored `.gitignore` is a NEW sha).

## Brainstorm: how to improve cakepanz / the UI-UX shell for Claude's engine

The shell (Svelte 5 + Vite, port seam in `src/lib/port/`, one door `seam.ts`) is the strongest UI in the repo. Concrete, framework-neutral improvements:

**A. Seeded runs (blocking verification risk).** Thread `?seed=` through to the store seam so every battery is bit-reproducible; then golden + axe-core runs on pinned browser/fonts. Without it, L13's tie breadth (pick 1 → 4 ids one run, 3 another) is one unseeded sample.

**B. One brand, one wordmark.** D5.3 already collapsed "76 Pancakes" / "67 Cakepanz · the shell" to one brand. Next: the topbar/nav chrome duplicates brand intent (`cp-brand` + nav + page headings). A single `cp-brand` token block + a `data-brand` attribute on `<html>` lets the cutover re-theme in one place.

**C. 390 px law as a build rule.** Every new surface lands with scroll-in-container + `data-testid` no-overflow proof (report Q2), enforced in the battery, not by review memory. The `BoardRow.svelte` dead-rule lesson (D2) shows CSS-order bugs live in media queries — a `postcss`/stylelint rule flagging dead-overridden rules would prevent regressions.

**D. Stat provenance law.** `StatRow { raw, key, render }`; sort on `raw` never parsed display text (the live c9 defect `DraftBoard.svelte:40` parses formatted text); one formatter per key; `round` carried per box (`splitSS()`). Framework-agnostic; survives R-13.

**E. The four dashboard reframings (ready once the VM spec lands).**
1. Your Team Stats: per-game box (badge vocabulary `CAR/RUSHY/PASSY/RECY/SK/PRSS` fixed) + season twin — one `StatTable` over 32 teams (OFF/DEF/Wins/passOff/runOff/frontRun/coverage/W-L-T/seed/PF/PA), your team pinned first, league rank + percentile bar per row (engine asks: league-rank cache).
2. Playoff Stats: per-game playoff table (`round != null`), round filter WC/DIV/CONF/SB, scoreline + turning numbers from `BoxScore`, per-team playoff leaders across 44 keys, champion marked, cross-checked against `bracketVM` pairs.

**F. Reduced motion as law, not convention.** C′3 grammar (≤2 s, instant under reduced motion, zero strings) — add one assert line in L15 receipts (pickle's gap: `body.cp-reduced` path recorded, never asserted).

**G. Port traps to document (for the next shell author).** (1) w89 runtime reassignment means every w89-side patch finds BOTH copies; (2) `probe-node-counts` pins DOM counts per screen — every new surface moves them; (3) localStorage keys `sim:nfl:autosave:draft|week` are envelope-fenced — UI keys stay off that prefix; (4) DS's D5.1/D5.2 (unlabelled full-board columns; sort not persisted) still open.

**H. What stays out (deliberately).** No UI kits (identity IS the product; PrimeVue 4 = 150.5 KB gz for one table), no drag-and-drop (Owner-closed), no state libraries (engine record via `port/seam.ts` is the store), no virtual scroll (no measured problem), no PWA/service worker (stale-cache risk class), no analytics ever.

**The one sentence the Owner can act on:** *Ship the cutover on Svelte 5 with hand-rolled tables first; TanStack v9 only behind the ≥3-dashboards trigger; run DS's four-dashboard R-13 slice only if still unsure after one measured page.*
