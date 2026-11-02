# W59 BUILD REPORT — Z.ai seat · 2026-11-02/03 (HST)

## Product
- `Football-Sim-Z-post-blue-w59.html` · md5 `889e531b9418fa7a2604d3e8ab4d23b4` · 1,679,013 chars (1,680,808 bytes)
- Delta vs baseline: **+19,316 chars**
- Baseline: the Owner's **w58** `Football-Sim-Z-post-blue-w58.html` md5 `7d1e07ddb8b23ef6f03968a8fe26d6cc` (1,661,434 B) — verified by the generator's assert on every run.
- The w58 line already carried the round-57 ten + the storage Phase 0 (the Owner renamed my w57 build to w58; w57 on gh-pages is the earlier unpushed round, md5 `765ee5cf…`, 1,611,548 B).

## Generator
- `tools/zpb_w59.py` — **19 asserted exact replacements** (R1 the DIME label · R2 the whole w57 draft-board round merged verbatim from `w57_merge_block.html` · R3 the phone ranking-card laws · R4 the unit comparison leaves the mstack cliff · R4b the browser's system-light melt · R5 the four w59 payload insertions) **+ 12 post-checks** (label gone/present, the four block ids present, the cinelock law, the clip fix counted twice, the syMap literal, the click shield, the two-line draft-card selector).
- Re-runs clean from the pristine w58 baseline every iteration. **Re-verified at close: a fresh run reproduced md5 `889e531b…` exactly** — the shipped bytes are the script output, no hand edits.
- Payload files: `payload_w59_css.txt` (the ranking-card laws, the unit-comparison steps, the cinematic lock), `payload_w59_js.txt` (the lock/shield runtime), `w57_merge_block.html` (w57's draft-round CSS extracted verbatim from the Owner-pushed w57 on gh-pages).

## The nine items → what shipped
1. **DIME** — `LABELS["CB4"]` → `"DIME"`, GROUP_DEFS → `"Dime"`. The hover title still resolves. The site-wide surfaces (depth chart, lineup editor, station map) already read DIME; one straggler harmonized.
2. **Position Rankings phone cards** — the four labelled flex lines retire. The card reads `#N · crest · Team ······ score` on ONE line (score right, bold), the player names flowing left-aligned beneath. No label column, nothing pushed to the far edge.
3. **Madden Rankings phone cards** — the draft-card treatment: `#N · Team (badges) ······ score` one line, ANCHOR/LEAK pills under it, the bar last. Word labels retire; `#` renders itself. Fewer lines, smaller format.
4. **Player Browser phone cards** — six labelled lines → **two lines**: `name · pos chip · OVR` / `Team · SPD · STR` compact. Fonts step down. The reverse-growth bug (cards taller as the window shrinks) is dead — measured at 320: row height 46px, no sideways overflow.
   - **R4b, found by the probe:** the browser's SPD/STR/OVR cells rendered near-invisible on system-light pages — a malformed merge had left `:root:not([data-theme="light"]) #playerBody td.score` variants OUTSIDE any dark-media query, painting the dark pale ink (#f6d3c1) on light pages. The bare variants are removed; the properly-scoped pair (which already existed) now governs. The one-ink law holds: the cells ride `--nu` in both themes.
5. **Unit Comparison gradual** — the table leaves the mstack machinery (`data-nostack`) and wears its own graduated law: a full-width table at EVERY width, padding/font steps at 1024 · 760 · 480. No cliff. Both instances (home compare + draft-vs-draft) share the builder — one change covers both.
6. **The cinematic lock** — while ANY cinematic overlay is up (replay, pregame marquee, SB storm, playoff-run cine, rest/books stage, caution, storage shell, confirm), the page behind is locked twice: `pointer-events:none` on the body wrappers AND the `inert` attribute (keyboard too). The overlays stay live — the fast-forward click the Owner likes is untouched. When the last cinematic closes, a 300ms invisible click shield swallows the one accidental click that used to land on a sim button. Root cause measured: the pregame marquee mounts with `pointer-events:none` (it is a 3.4s text card), so every click passed through onto the live page.
7. **The best of w57 merged** — w58 was built from w56 without w57 (the bytes proved it). The whole w57 draft-board round now rides in the w59 line: the **two-line labeled phone draft card** (name · Draft on top, the six labeled stats on row two, FILLS right under the button — the w56 three-line law is revoked by the Owner's ruling), the priority number in the gone/wins ink, the contrast pass (unit-report title/grade, pick-grade slot chip, DRAFT button ink, dark card values, FILLS link, honor title, the anchor's muted line), the pregame marquee pinned to the top of the phone stage, the badge cascade 0.25s faster (composing with the ×0.6s beat: `calc(var(--beat,0)*.6s - .25s)`, the veil follows: total·0.6s + 0.8s), the 1.17rem large-text badges, the deepened muted inks.
8. **The gold shimmer fixed** — root cause: w57's light-sweep override used the `background` SHORTHAND with `!important`, which resets `background-clip` to `border-box` — the bronze gradient painted the whole box behind transparent-filled text: a solid gold block. **Fix, not revert:** the override ships with `-webkit-background-clip:text !important;background-clip:text !important` re-declared inside it. The burnished sweep survives; the names read. Probed in both themes (`clip: "text"`).
9. **The full sweep** — every view (Simulator · Madden Rankings · Player Browser · Position Rankings · Team Comparison · Guide · the storage showcase) at 1920/1280/1024/768/600/390/320: zero sideways overflow, zero page errors.

## Batteries (re-run at close against the shipped bytes — 80/80)
- `w59_nodecheck.js` **15/15** — every script in the page parses.
- `w59_mobile.js` **32/32** — the ranking-card laws, the two-line draft card (grid rows/columns measured), FILLS placement, the unit-comparison steps, the lock laws, no overflow at 320/390/430.
- `w59_desktop.js` **12/12** — desktop regressions at 1280/1920 (the draft card keeps its desktop law, the unit table full-width, D6 zero errors).
- `w59_cine.js` **10/10** — the Owner's exact accident, replayed: season started → Play clicked → the lock ON (`inert:true`) → a stray click on the SIM SEASON position did NOTHING (`Your Roster -> Your Roster`, week unchanged) → fast-forward still closes → page live again after (`lock:false`, shield gone). Plus the dark-theme shimmer clip check.
- `w59_sweep.js` **11/11** — 6 views × 7 widths clean, the storage showcase opens at 390, the shell locks the page behind it while its own buttons stay live, zero page errors.

## Evidence (`shots/`, taken against the final bytes)
`w59-posrank-390/1280` (the one-line card, DIME in the spots) · `w59-madden-390/1280` + `w59-madden-dark-390` (the condensed card, the shimmer alive and readable) · `w59-browser-390/320` (the two-line card, the inks crisp after R4b) · `w59-draftcard-390/320` + `w59-draft-1280` (the w57 two-line law) · `w59-unitcmp-1280/390` + `w59-unitcmp-390-table` (the graduated table) · `w59-cine-lock-390` (the lock up, the page dead behind).

## Session note (honesty)
The build session finished the build, the fixes and the batteries, then lost its reply to a context overflow before the close: no report, no zip, no lane rewrite. This session found the work intact in the sandbox (`worktrees/zai/`), re-verified everything from the bytes (the generator reproduces the product md5; all five batteries re-run green; the evidence shots re-inspected), and performed the close.
