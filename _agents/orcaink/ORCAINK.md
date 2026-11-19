# ORCAINK — lane file (rewrite every session, never append)

## Identity
- **Seat:** ORCAINK · **Model / how reached:** ORCAINK / OpenCode (Orca harness) · **State:** advisor
- **ID block:** (none yet — files as orcaink) · **First seen:** 2026-11-18
- **Strengths shown so far (evidence, not claims):** re-running verification at delivered bytes (8.1 grid, P-143/P-144); cite-check prototests (found 0-byte `h17`, unreceipted shas); reviews with byte-level receipts.

## Current work
- **Done 2026-11-19 (this sitting):** sitting notes (`inbox/20261119-0240-…`, `1d604378`); session-end lane+bulletin (`8c84423f`); GPT-review + verbatim lane copy + fresh-extract receipt (`d0a1791e`); handoff record `inbox/20261119-0334-orcaink-zai-handoff-process.md` (`c78d92ea`).
- **GPT review verdicts:** pins/cite-check/numerals-override (exit 1 under `CP_PIN=65673a00`) — endorse all his findings plus mine (h17 0 B, unreceipted shas, `§21.8:869` 1529a003 unsuperseded). gate-manifest verified URL-rooted (`import.meta.url`), fresh extracts PASS 314/319 — VL's FAIL does not reproduce and wrong-cwd was never the cause. Divergence tip counts **13 main-side / 45 base-side** (no merge-base) — the merge plan must use these, not root-1/1. Framework 65/35 vs GPT 70/30 — same direction; GPT's uniform-board A/B experiment is the right decider (and cheaper on the Svelte side because of the ruling). Tools: GPT's order endorsed modulo one confession (I dropped axe-core — he's right on both goldens #1 and axe #2); chart libs stay out until a per-week series exists; canvas share card preferred over html-to-image (ordering only).
- **Sitting status:** sitting notes from all seats are due-to-consolidate by MUSE; the Architect owns the A·D/A·E fix sitting (one commit, both trees, gate-numerals exit 0 → then sign-off).

## Blocked / waiting on
- Owner — P-158 threshold; P-144 pick (nothing pickable until VL resubmits); gh-pages fix placement; re-pin 65673a00 activation + MERGE-GUIDE pin fix (this sitting: the gate override FAIL is the blocker for "clean"); R-13 sequencing; hy4 flag.
- Architect — A·D/A·E fix sitting (numerals override + receipt hygiene + §21.8 superseded marker); snake ruling; P-143; cutover merge plan seeded by 13/45; tag transition-row #11 historical.
- MUSE — sitting consolidation within 48 h.

## What the next session needs
- **Read first:** `inbox/20261119-0333-orcaink-gpt-cakepanz-9-expanded-review.md`; the sitting notes; the lane receipts.
- **Do not redo:** the 8.1 grid (this sitting re-ran all CLI legs); the gate-manifest tie-break (receipt filed); the snake probe; GPT's expanded note (lane copy is byte-matched).
- **Open:** fix-then-verify the numerals override; h17 + two shas re-filed; transition-row #11 historical-only marker; the framework A/B decision (defer-or-run).

## Files in this lane
- `67-cakepanz-8.1-2026-11-18/` — the delivered package as landed (byte-identical to Desktop source).
- `2026-11-19-gpt-cakepanz-9-expanded-notes.md` — verbatim copy of GPT's expanded position (Owner's paste, byte-matched).
- `receipts/g8-manifest-fresh-extract-receipt-2026-11-19.txt` — fresh-extract provenance.
- `ORCAINK.md` — this file. `BOOT.md` — the opening check.

## Role
general advisor. Advisor level: propose, test, dissent, measure.

## Worktree / branch
- Path `/Users/kosi/Desktop/wt/orcaink` · Branch `council/orcaink` · merge-base vs `origin/council/base`: `864a6aa1`.
