# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, IM chat; the sandbox has no git credentials — this session ATTEMPTED the Owner-ordered push to `council/zai` and the zip is the fallback. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** built the Z-post-blue prototype through wave 57; headless verify suites v8..v11 + the per-wave live batteries (w46..w57); style guide; the halfway-ink law; the runtime dot-law sweep; the look-gate one-clock sync; the Claude handoff chain; the w55/w56 forensics; **the w57 forensics: the min-content collapse (overflow-wrap:anywhere → one letter per line), the play-column squeeze found only by live measurement at 280px, the box score's double-OT cell (slice(0,5) + otOf), and the porun→storm handoff race — every root cause measured, not guessed**. **Storage Phase 0: the envelope-only module, the fault taxonomy, the 25-check rig, and the whole storage UI designed to the Owner's brief.**

## Current work
- **Wave 57 SHIPPED (session 29, 2026-11-02) — the Owner's ten + the storage Phase 0:**
  1. the player cards read clean to their left edge (three paints retired: the phone card's 4px accent `border-left`, the name cell's 3px inset `box-shadow`, the cards-view row's 3px bar; the washes and the 1px frame stay; the depth-chart bar stays — it leads a slot label, never a name);
  2. the preview key players face off TWO ACROSS at every width (`repeat(2,minmax(0,1fr))` overrides the w55 one-per-line law on the preview; the cards compress — ellipsis names, smaller chip/numeral, chips wrapping under, gone under 360px; the review's Key Players keep their law);
  3. the plan cards lost the "+X.X pts vs. auto" line;
  4. the cinematics learned the compressed windows (≤480/≤360/max-height:620 — smaller header, log lines, intro, storm, porun; the replay panel capped `min(96svh,860px)`, the log flexes on short windows);
  5. names never break letter-by-letter (`break-word` replaces `anywhere` on `.zpb-gname`, `.zrl-play`, `.zpb-lu-cell`) AND the replay's play text takes its own full row ≤480px (the column had collapsed to ~60px — found by measurement, "BARINGE / R" reproduced, then fixed);
  6. the box score's repeat-OT glitch fixed (`cells` sliced 4 always; the OT cell belongs to `otOf` alone; regulation markup byte-identical to w56, asserted across two builds);
  7. BEGIN PLAYOFFS wears the SIM PLAYOFFS size + gold (joined the two w51 laws; the inline padding retired);
  8. the review/unit-report badges pace ×0.6s per beat (the field map keeps ×1s — the w44/w46 laws untouched, provable: the w57 CSS block never mentions `.zpb-dfc2`);
  9. the sim-playoffs run cine flows INTO the champion storm (`zpbPostSuperBowlCine` mounts while the porun overlay is still up; the porun fades to reveal the storm, never the page; verified live — both overlays present during the handoff);
  10. **the storage Phase 0** (the Owner's design mandate): the module in `zpb-storage-css`/`zpb-storage-js` payload blocks (the async facade, the KV seam, write safety, the typed load result, the multi-tab event, the global stores, the stats trigger + ledger, the brag share, the 25-check rig) + the whole UI kit designed and mounted on `?storage=1` + the Phase 0 plan with the five answers at `inbox/20261101-2323-zai-storage-phase0.md`.

## What the next session needs
- **Read first:** `_agents/zai/START-OF-CHAT-ZAI.md` REV 17 (§3 carries the wave-57 + storage state), then this session's INTAKE LEDGER + BUILD REPORT, and — if storage comes up — the Architect's contract (`architect/engine-and-seats:inbox/20261101-2100-…`) and my Phase 0 plan (`inbox/20261101-2323-zai-storage-phase0.md` on `council/zai`).
- **The wiring commit waits for the Architect's E2 envelope types.** Do not wire Continue/profile/settings/brag into the real screens before the payload types land; the showcase on `?storage=1` is a design surface, NOT a wiring. When wiring: the screen call sites go in a SEPARATE commit from any module change (the contract's law).
- **If the Owner vetoes an interpretation:** the ledger's §veto holds all five (the depth-chart bar's scope, the pairs' two-across law + the 360px chip cutoff, the ×0.6s beat scope, the cinematics pack's extent, the showcase's design-surface status). Each is one small patch to `tools/zpb_w57.py` (+ its payload files) + a rebuild from the w56 baseline.
- **Do not redo:** the one-clock release law; the clock law; the SB order law; the awards badge law; the bar track law; the dot law; the w50–w56 laws (grep + battery sweep in the build report); the desktop linescore pixel law (regulation markup byte-identical to w56 — pinned by `w57_live` D3); **the w57 laws: the clean card edges, the two-across pairs, break-word names + the play row, the otOf-only OT cell, the porun→storm mount order, the ×0.6s badge beats.**
- **Watch for:** the w57 CSS block is ONE contiguous region at the end of the styles (`zpb-w57-css`), the storage blocks sit between the w56 CSS and the w51 JS (`zpb-storage-css`, `zpb-storage-js`) — keep them contiguous in future merges. The storage module's `save()` retries ONLY on quota (a plain interrupted write must stay REPORTED — the rig depends on seeing it). `betterResult(null)` means "nothing beats something". The legend formula lives in `ZPBStorage.stats.legend` (titles×120 + ladder + wins×2 + undefeated×30). The brag URL falls back to the Pages home on file:// and localhost — never a local path. The batteries seed-doctor the playoffs (`driveToReview` + the seeds patch) because the instant CPU draft never reaches the field — battery concern, not product.

## The batteries
- `w57_nodecheck.js` (14/14 scripts parse) · `w57_storage.js` (9/9: the rig's 25 checks, the 247KB bench, the showcase smoke, boot-with-module) · `w57_mobile.js` (46/46: 430/390/320/280 + 320×640, 280×560, 500×420 — the ten laws measured live, the cinematics pack, the name-break laws, the showcase on a phone) · `w57_live.js` (9/9: the linescore byte-identical to w56, BEGIN PLAYOFFS on the real review, the porun→storm handoff with both overlays present) · `w57_sweep.js` (22/22: every page × 390/320/280, zero pan, zero errors).

## Files in this lane
- `notes/` prompts, corrections, worklog, the per-wave INTAKE LEDGERS + BUILD REPORTS (W57-INTAKE-LEDGER.md, W57-BUILD-REPORT.md are current)
- `builds/` the wave HTML files (NOT product builds; pins in START-OF-CHAT §4)
- `tools/` the verify suites + the generator pattern (`zpb_w57.py` + `payload_*.txt` is the pattern to copy) + the storage payloads
- `deliveries/` the style guide and playbook + the Claude handoff chain
- `inbox/20261101-2323-zai-storage-phase0.md` — the Phase 0 plan (branch root `inbox/`, the Architect reads it there)
- Not copied (still on `main`): evidence screenshots and the 67 MB duplicate package `z-post-blue-full-handoff-2026-10-25/`
