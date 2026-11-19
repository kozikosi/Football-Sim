# ORCAINK — lane file (rewrite every session, never append)

## Identity
- **Seat:** ORCAINK · **Model / how reached:** ORCAINK / OpenCode (Orca harness) · **State:** advisor
- **ID block:** (none yet — files as orcaink) · **First seen:** 2026-11-18
- **Strengths shown so far (evidence, not claims):** re-running verification at delivered bytes (c9: gate red ×2 reproduced then fixed by inkling; c10: delta-overlay red ×2 reproduced then pinpointed; boot-target + CHECKSUMS↔MANIFEST + md5 roundtrip + per-file hash checks across two packages); law-level reading (H5 receipt: draftBoard strips `_w`/`_p` at the VM export); byte-level cite-checks; the two delivery-integrity findings this track now carries twice in a row.

## Current work — session 2026-11-19 (part 3: cakepanz-10)
- **Landed `67-cakepanz-10-2026-11-19`** @ `2eefc4cf5` (52 files, 1.8 MB, byte-identical to the Owner's Desktop folder; md5 49/49 OK; pushed — public readability, the Owner's order).
- **The close-out package review** `inbox/20261119-0907-orcaink-cakepanz-10-delivery-review.md` — **VERDICT: close-out engineering correct at final bytes; delivery integrity two fixes short of publishable.** My receipts: gate-manifest **PASS 314 / PASS 319** (my own runs) + boot-target ×2; gate-numerals **CLEAN ×3**; CHECKSUMS==MANIFEST ×2; START ×3 `5e5ed7c9…`; `.gitignore` `f27658cc…` ×2; dist split measured (`76de5658…` 527,162 B unreleased / `670d4c08…` 527,177 B); item-5 preflights byte-exact vs the recipe; k1 = 18×0 ends COMPLETE (read); cite-check 0 unresolved (read, one opaque line). Findings: **F1** the zero-deletion delta breaks the post-apply gate (`index-CfihcvG2.css` + `index-DI9hx1dJ.js`, exit 1 → rm → PASS 314; fix: post-apply gate or DEL: list); **F2** both SHELL-STATUS + the build-report still claim "dist byte-identical at 670d4c08…" (false at close-out bytes — one sentence per file); **F3** the `.gitignore` fix doesn't settle public distribution (GitHub push does; zip still unfixable without a re-zip); **F4** cite-check's unnamed L7b zero + tool absent from the package; **F5** item-5 HEAD `2dff30b57` = parent of architect tip `560b8364f`; numbers unread (Claude's read); **F6** "85/15 Svelte" directionally right, F1 never run, keep R-13 as the duel; **F7** the relay channel is the riskiest component — GitHub push = the delivery default; **F8** Part 0 accept/strike word gates everything downstream.
- **Twelve innovation proposals** (§5 of the review): law-mapping into Colors v1 (§I) · delivery-trio `tools/verify-delivery.mjs` (§II) · `?seed=` store seam (§III, the linchpin) · tie-band the ≥3 suggestion ring (§IV) · `<ProvBadge>` provenance component (§V) · boot-contract keep-laws (§VI) · one-name tokens (§VII) · saves export/import (§VIII) · goldens + axe blocking laws (§IX) · engine-asks register (§X) · Cakepanz as Colors proving ground (§XI) · retire the zip / git-tag deliveries (§XII).
- Bulletin `bulletin/20261119-0920-orcaink.md`.

## Blocked / waiting on
- **Owner — the three words:** (1) Part 0 accept/strike (gates: the delivered artifact's identity, the re-zip, the tab labels, Q1–Q6, Slice 3); (2) the four tab labels (GPT's copy gate stands; w89 inventory first); (3) the distribution call (bless this GitHub folder as canonical — recommended — or re-zip). Plus the two AA contrast holes (light gold2, dark rose-ink) and the `?seed=` word.
- **Architect —** item-5 JSONs after confirming Item-6 (`560b8364f`, λ-Lab) is measurement-neutral for the recipe; the law-mapping doc; the `?seed=` seam; the concrete D1/D2 note for Colors v1; the two stale dist lines (F2); the delivery-trio tool.
- **MUSE —** re-file START-OF-CHAT-ZAI.md from `5e5ed7c9…` (×3 identical; never from a quoted sha); consider the delivery-trio + "if it isn't pushed it doesn't exist" rule.

## What the next session needs
- **Read the review first** (`inbox/20261119-0907-orcaink-cakepanz-10-delivery-review.md`); §6 names what I did not run (batteries/composite/probes — re-run them if `npm ci` is in reach).
- **Do not redo:** the landing, the gate re-runs, the delta-overlay reproduction, the item-5 byte checks (all receipted in the review).

## Live files this lane
- `67-cakepanz-10-2026-11-19/` (the delivery @ `2eefc4cf5`) · `67-cakepanz-9-2026-11-19/` (c9 @ `a01de746`) · `67-cakepanz-8.1-2026-11-18/` · `ORCAINK.md` · `BOOT.md` · `receipts/g8-manifest-fresh-extract-receipt-2026-11-19.txt`

## Role / Worktree
general advisor. Advisor level: propose, test, dissent, measure. No product edits; no protected constants. Path `/Users/kosi/Desktop/wt/orcaink` · Branch `council/orcaink` · merge-base `origin/council/base`: `864a6aa1`.
