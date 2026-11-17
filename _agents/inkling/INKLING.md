# INKLING — lane file (rewrite in place when seat state changes; never append; ≤60 lines)

**Seat:** INKLING · Inkling 2 Small Free (opencode/inkling-2-small-free) via OpenChamber · admitted 2026-11-09 · **transient, not permanent**. If a task contradicts `AGENTS.md` (on `origin/council/muse`) or the Owner, the muse file and the Owner win.

## Boot protocol
1. `git fetch -q origin; git log --oneline -1; git status --short` — worktree clean, branch `council/inkling`.
2. Read this file. Then the task's named files only.
3. **The live rules live on `origin/council/muse`**. Refresh first.
4. `node tools/preserve.mjs check` — my worktree must be clean; unsaved work elsewhere is not mine to touch.

## Permanent seat rules
- Byte-check everything: every VERIFIED needs directory · exact command · ref/sha · output neighbourhood.
- Never edit governance, never touch `colors/src/**`, flex, the product file, or any other seat's bytes. INKLING reviews, measures, advises; does not build the engine/product/shell.
- No new P-IDs without the Owner; dissent in writing, inside the filing.

## Current state (2026-11-17 — cakepanz-3 round complete; branch pushed)

This session also ran Cakepanz 3 (Owner Desktop → pushed for reading; reviewed and verified on my machine):
- **Pushed verbatim:** `_agents/inkling/deliveries/cakepanz-3/` (commit `5b3d5120`), 290 files; integrity re-checked — CHECKSUMS 267/269 (the 2 self-ref entries), gate-manifest PASS (269, dist/ covered, boot target asserted), gate-numerals CLEAN×2.
- **Independent receipts re-run on my machine (fresh `npm ci`):** engine 323/323; `node battery` 23/23 **under `npx node@24 --experimental-transform-types`** (the default Node on this box is v26.13.0 which cannot parse the snapshot's TS parameter property); slice battery 26/0/10/3 PASS end-to-end; shell battery **46/0/exit 0** — entire season flows end-to-end in the real UI; file:// single.html boots clean (0 console errors, 0 blocked requests); S25b confirms the D-fix; S29/S30 confirm D1 restore.
- **Both cakepanz-2 blockers fixed:** D1 `restoreSeason` defined via the seam's restore path (no stub); D2 was actually TWO layers — a record-prop shorthand bug AND a bindings race (readables never pushed the post-LOAD snapshot; the engine's framework-free store never calls back a new subscriber) — fixed in `bindings/stores.ts`, engine untouched. Z.ai additionally found and fixed an illegitimate `s.table` read across four surfaces (engine's `table(s)` is the one source now); Share missing `season` prop; Book `champIdx` ReferenceError + champion's own roster; the hub CTA missing on no-game weeks; titles + README pins corrected.
- **Falsifiers re-verified:** F1-F5 all die with a planted violation; the FB falsifier crash is NAMED FLAKY in Z.ai's receipts instead of being kept silent.
- **The verdict is 'improved' — first cakepanz-3 boots to a full season end-to-end.** Verdicts blocked on the Owner: gold2 AA (1.51:1), dark --text (3.17:1 normal), Model Value vs Engine Value, 2027 product-year default, `.ub` blue-law scope, which tree is the shell of record now (gh-pages slices 1–4 + Cakepanz 2 vs cakepanz-3, or both ready).

This session (new task from the Owner, a full M3 verification round, on the current architect tip `7828d914`):

- **Part 1 (P-333 gap condition on real data, no cap)** — filed (`inbox/20261117-0130-inkling-P-333-gap-condition-real-data.md`): tip-tip measurement, **the Washington case reproduces exactly (−575, weak DT2 76 + elite inside LBs 81.5)**, KC −175 and Carolina 0 tie (the reference −300/−100 were older-pin values; direction holds, magnitude shifted with the 16 Nov flex refresh). League 24/4/4 split, mean +1131 table units in favour of 4-3. **Verdict: in part** — weak-DT2 teams today systematically favour 3-4 on average but it is not reliable team-by-team (Miami/Las Vegas/New Orleans favour 4-3 despite bad DT2s); only Washington matches the textbook pairing.
- **Part 2 (P-375 keyedrng twin review)** — filed (`inbox/20261117-0140-…P-375-keyedrng-twin-review.md`): twin is **independent** (Python native 64-bit ints, no 16-bit limbs; KAT anchors pass; all 108-loss vectors reproduce), normal() REPORTED not required (106/120 bit-identical here, 2.08e-16 worst-diff vs his 108/2.20e-16). **The vectors-test guard FAILS on this machine: one entry, last-bit `Math.cos` difference (`…cf` vs `…d0`); MUSE's 379/379 is machine-dependent, mine 378/1; tsc ratchet 89/89 confirmed. CI runs `continue-on-error` so this never blocks CI.r**
- **Part 3 (P-373 Parts 16/17 + P-374 Ernie D6)** — filed. Part 16: specs do NOT exist anywhere (searched muse/ernie/inkling/glm/beam/gh-pages); MUSE's "nothing REVIEWED" verdict stands. Part 17 label hygiene: **8 Inkling files mislabeled, Ernie side is 2 not 4** (TwoAllCleanP345 kept, 1225 in-part, 1302 fully); correct receipt count 12 vs 10. P-374 **D6 confirmed** in BOTH trees (constant `FEED_YEAR = 2027`, described as informational, label-only, drives demo schedule seeds + feed header; zero production consequence; year-2027 default is Owner's call).
- **Part 4 (Innovation)** — filed: **"the draft-path test"** (run the real engine through a full draft, two arms: 4-3-template vs 3-4-template, 32 teams, seeded, measured against the real pool) as a replacement for the cap and for the roster-static probe. Six workflow items (checkpoint template, queue-row hygiene check, reconciliation-day for the 2 seam-checker duplicates, Owner five-minute-read shape, newcomer path, cutover-check.mjs dashboard).
- Commit log across the session: `fbca271a931e…` (Part 1, push verify) → `cb16e4d202ec…` (Part 2) → `c?` → `d1d90c684ed9…` (P-373) → `5d2c3398868b…` (P-374) → `fcc09f08e6a84c73a…` (Part 4).
- All these findings are VERIFIED-by-me; anything REPORTED is labelled in the filings.
- **Undone:** none of the M3 verification items. No Owner decisions were made by me; the 2027-default-year note (file P-374) is flagged for KG.

## What the next session needs
1. `git fetch -q origin; git log --oneline -3; git status --short` + `node tools/preserve.mjs check`.
2. Read `bulletin/20261117-0210-inkling.md` (this round's ledger). The five filings above are the live state; don't re-read the older round.
3. Queue: `node .council_tool.mjs next` (v9 from `origin/council/muse`). A review you can do beats new work in the same tier.
4. **Open rulings blocked on the Owner, if they land:** the 2027 product-year default (P-374), palette/gold2/`--text` rulings, Engine Value vs Model Value wording, shell-of-record (which tree ships), Option B DIME legs (carried over), ideal-vs-real equality, the two seam gates reconciliation, whether Z.ai's v5 fix pass lands (FOR: R-13 prompt filed as `20261117-0205-inkling-prompt-zai-cakepanz-fix-and-continue.md`; Owner to relay it to Z.ai).
5. **Do NOT re-litigate** the cap ruling, the flex table rulings, the pin facts (gh-pages/s5), the 67-cakepanz-2 review findings (D1/D2). Prove it fresh every time; measurement > position.

## Where this worktree is
Path: `/Users/kosi/Desktop/wt/inkling` · branch `council/inkling` · merge-base with base `1b91f50e` · HEAD = pushed branch tip.

## Transition discipline
Wave state lives in wave directories and is expected to die with the wave. Rewrite this file wholesale on seat-state change; never grow it.
