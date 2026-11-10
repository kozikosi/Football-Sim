# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, chat only; sandbox can read GitHub (public HTTPS) but **cannot push** — work reaches the branch via the Owner (or Beam: `tools/import-zip.sh zai <zip>` → `_agents/zai/imports/…`) or `tools/seat-save.mjs`. · **State:** **High Councillor** (below the Architect, above advisors; Owner, 24 Oct 2026)
- **First seen:** 2026-10-24 · **Strengths shown (evidence):** Z-post-blue builder (w1–w88 headless-verified waves); style guide + Owner playbook; FB/Punter math (REWEIGHT-BRIEF §7b); the w74 type-checker contract (colors/tsconfig.json, 4a).

## Current work
- **w88 SHIPPED (2026-11-10):** the position values wear WINS. Base w87 gh-pages (`bffdccac…`, 1,900,033 B) → `Football-Sim-Z-post-blue-w88.html` (1,904,952 B · md5 `2f7a4654bff000e4b2365e0bd6fd1e3f`), unpushed (sandbox) — ships in `z-post-blue-docs-update-2026-11-10.zip`.
- The NEW measurement (localWins20: local slope ±5 around CSV pool centers, ×20) was re-measured on the Colors engine at snapshot `4ca9a071` before building: **all 32 slots reproduce the §2 table to one decimal**; harness cross-checked against MUSE's OLD values (SAM 0.2630 / CB1 1.0563 / WR3 0.2470).
- **WR3 question resolved with numbers:** PreColors and Colors genuinely differ (rec-spec share 16.3% vs 5.6%; MC/defPredict/run-cap knobs) — on the engine of record (Colors `4ca9a071`) WR3 does not move (0.2470 → 0.2470). PreColors' "95 → 120" reproduces only as a ratio rebase (116.5 → snap 120). P-325 cross-check note filed in the report.
- The ±10 direct span **collapses back to the old secant** (SAM 0.2630, RB2 0.2468, TE2 0.3702 = slotWins20 exactly) — slope×20 at ±5 is the honest local measurement; do not "simplify" to a 20-OVR difference.

## What the next session needs
- **Read first:** `_agents/zai/deliveries/ZAI-w88-build-and-verification-2026-11-10.md` (verification + build + method notes); `_agents/muse/deliveries/prompts-2026-11-05/zai-slice3-2026-11-09.md` on `council/muse` (Slice 3 / P-316 — read, NOT started; runs parallel to w-series, consumes engine snapshot `4ca9a071`, no flex-value changes).
- **Build chain:** w88 is the newest product; patch via asserted exact replacements (`tools/build_w88.py` pattern), verify with `tools/verify_w88.mjs` (21 checks) + a real-browser pass (0 console errors).
- **Display law now:** Wins everywhere a position value shows (one decimal, unit on the row, meaning in the hover); `ZPB_SLOTS_W` stays the model's internal law (engine calibration reads it — never display it again).

## Do not redo
- The §2 Wins table re-measurement (verified, see the report §1); the WR3/SAM/CB1 cross-engine measurement (report §2); the CB4=DIME mapping (w34 label law — CB4 carries the Colors DIME value).
- The baseline identity, the line-3 selector correction, the w87 "recalculated table" order (superseded by w88's Wins order).

## Files in this lane
- `deliveries/ZAI-w88-build-and-verification-2026-11-10.md` — this chat's verification + build report
- `tools/` — verify_wins.mjs, precolors_check.mjs, cb4_check.mjs (measurement harnesses); build_w88.py (asserted patcher); verify_w88.mjs (21-check suite)
- `evidence/` — w88-guide.png, w88-buttons.png (browser evidence)
- Not copied (still on `main`): evidence screenshots and the 67 MB duplicate package `z-post-blue-full-handoff-2026-10-25/`

## Rules that changed
- None this chat. Standing: never `git push` (§5 rule 8); every chat ends with the zip; intake-ledger first when the Owner directs.
