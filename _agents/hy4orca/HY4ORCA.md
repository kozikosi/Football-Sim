# HY4ORCA — lane file (rewrite at end of every session, never append)

## Identity
- **Seat:** HY4ORCA · **Model / how reached:** HY4ORCA / API · **State:** advisor
- **Admitted:** 2026-11-19 by the Owner. Role: propose, test, review, dissent, measure. Core status is the Owner's call after 3 verified items.
- **Worktree:** `/Users/kosi/Desktop/wt/hy4orca` · **Branch:** `council/hy4orca` · **`git merge-base HEAD origin/council/base`:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`

## Current work (2026-11-20 session, branch tip at end: see final bulletin)
All 14 files below are committed and pushed on `council/hy4orca`; none touched the product, engine, pins, governance, or another seat's file.

- **A1 pin-watch (v3):** VERIFIED exit 0 self-test (8/8 fixtures) and exit 0 live check at pin `40841047756db…` (69 engine files, byte-identical). Correction: no `pin-watch` npm scripts exist; tool is `node tools/pin-watch.mjs`.
- **C12 (self) → A1 synthesis (v4):** three filings conflicted; synthesis rules **Contract B (`rawSort` from `key()`)**, defers `suggestions` (zero current consumers; my own A+rawSort created two disagreeing sets), and states a re-pin is required for ALL contracts because `BoardRowVM` lives in `colors/src/…/draftBoard.ts`.
- **Reviews filed:** C29 (ok — pin bytes are `d3bd81d2`; v3 §1.3's pin split wrong), C23 (improved — fix does not change exit code; DOM filter loses falsifier), C27 (improved — ~2–3% vs ~1–2% conflict), C24 (improved — ERNIE bulletin FACT lines are a second relay), A2 Q7 (ok — week 5/week 6 mirror; residual season/packHash hole), B2 C13 (improved — all receipts reproduced, 52-file count not asserted), C17 (improved — a11y target is `.cp-gonetip`, not `.cp-fits`), C21 (improved — Retrosheet commercial use allowed with prominent credit), C14 (improved — patch levels run, FIX-NOTES:93 wrong, hash-replace scope narrowed), B7 (ok — framework arithmetic re-derived), B6 (improved — ECharts REPORTED not UNVERIFIED; pin PrimeVue 4.5.5).

## Live files (all on council/hy4orca)
- `inbox/20261120-0342-hy4orca-C12-ring-fix-adjudication.md`
- `inbox/20261120-0350-hy4orca-A1-pin-watch-selftest.md`
- `inbox/20261120-0353-hy4orca-C29-review.md`
- `inbox/20261120-0353-hy4orca-C23-review.md`
- `inbox/20261120-0354-hy4orca-C27-review.md`
- `inbox/20261120-0354-hy4orca-C24-review.md`
- `inbox/20261120-0355-hy4orca-A2-review.md`
- `inbox/20261120-0359-hy4orca-A1-C12-synthesis.md`
- `inbox/20261120-0403-hy4orca-B2-C13-script-review.md`
- `inbox/20261120-0404-hy4orca-C17-review.md`
- `inbox/20261120-0405-hy4orca-C21-review.md`
- `inbox/20261120-0406-hy4orca-C14-review.md`
- `inbox/20261120-0407-hy4orca-B7-review.md`
- `inbox/20261120-0407-hy4orca-B6-review.md`
- `bulletin/20261120-*.md` — one per session step (all pushed).

## What the next session needs
- **Read first:** (1) `inbox/20261120-0359-hy4orca-A1-C12-synthesis.md` — the ring ruling and its corrections; (2) the live order on `origin/council/pickle:_agents/pickle/deliveries/council-sitting-order-2026-11-20-v4-pickle.md` for what is still open; (3) this lane file's review list above, to avoid re-reviewing the same items.
- **Open questions:** Architect still owes the S1/ring ruling and plan-M nits; Owner owes c10 + doc-fix landings, four ALL-CAPS tabs, Part 0 word, sport two; Z.ai's v4 status UNKNOWN at this tip.
- **Do not redo (receipts on my branch):** A1 pin-watch (exit 0/0), C12 adjudication/synthesis, C29 pin bytes, C13 script dry-runs, C14 patch `-p1`/`-p5`/`-p1` exit codes, C17 anchor, C21 licence fetch, Q7 week mirror, C1–C11, four gates, c10 rehearsals, passGap. A seat may not review the same item twice.

## Role reminder
Advisor: propose in `inbox/`, never edit the product/engine/pins/governance or another seat's file. Push only `council/hy4orca`, never force-push. End every chat with one bulletin line.
