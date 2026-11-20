# ORCAMAN — lane file (rewrite whole file at end of every session; never append)

## Identity
- **Seat:** ORCAMAN · **Model / how reached:** ORCAMAN / API · **State:** advisor
- **ID block:** n/a · **First seen:** 2026-11-19
- **Strengths shown so far (evidence, not claims):** 2026-11-20 session (council/orcaman, commits 5c03f9260..a519b048a, all pushed/verified): C23 proposal (smoke `tabGuideBtn` stale), C31 errata, reviews of Porca C12, Glyph C14, Glyph C27, Ernie C13 (B2, independent re-run receipts), orcads C24 (B1), orcads C29 (B5), and A3 C8b third-seat confirm — all as inbox files with VERIFIED/REPORTED labeling and command receipts where run.

## Current work
- **Claimed / in progress:** none.
- **Done this session (2026-11-20, council sitting v2→v4 context):**
  - Start-of-chat followed (read live `origin/council/muse:_agents/START-HERE.md`; Step 0 governance-doc refresh done locally; `pwd` `/Users/kosi/Desktop/wt/orcaman`, branch `council/orcaman`, Pre-Colors sha256 first16 `40233d6be00e987c` VERIFIED).
  - `inbox/20261120-0342-orcaman-C23-smoke-tabGuideBtn-stale.md` (5c03f9260): proposed DOM-presence filtering for stale `tabGuideBtn` in `tools/post-merge-smoke.mjs:421` (VERIFIED anchors/grep; REPORTED V23 Guide removal).
  - `inbox/20261120-0349-orcaman-C31-zai-order-errata.md` (1f39ae073): errata for `06d89724d` pickSlot intro (VERIFIED), `-p5`/cwd (REPORTED settled C4), D18 citation vs "ruling 4" (VERIFIED on architect ref), missing-vs-failed wording (REPORTED settled C3/C9).
  - `inbox/20261120-0352-orcaman-C12-review.md` (b2b0d9b27): REVIEW of Porca C12 ring adjudication — VERDICT ok (verified `draftBoard.ts` anchors, cakepanz-9 `DraftBoard.svelte`/`board.battery.mjs` filter+parse/tautology concerns; B-over-A-as-proposed filter argument sound).
  - `inbox/20261120-0353-orcaman-C14-review.md` (f28ef408c): REVIEW of Glyph C14 landing wording — VERDICT ok (verified prompt/0334 line inconsistencies; cwd-qualified patch wording improvement).
  - `inbox/20261120-0358-orcaman-C27-review.md` (2a33ce6fa): REVIEW of Glyph C27 item-6 vs passGap — VERDICT ok (verified NOW.md, passgap report, `drive.ts` tilt; scale vs unit-conversion reconciled, λ=0 unchanged).
  - `inbox/20261120-0403-orcaman-B2-C13-review.md` (7b441e62d): REVIEW of Ernie C13 landing script — VERDICT ok; independently re-ran on fresh inkling/orcaink/pickle archives (macOS): 48/1/51→49/0/52, idempotent, refusals exit 2, repair 6418B/md5 `0a286953…`/sha256 `3e6476de…`; Linux path UNKNOWN.
  - `inbox/20261120-0405-orcaman-A3-c8b-week-gap-confirm.md` (2182d67cb): A3 third-seat confirm — Q7 blanket "week reader passes" refined: no-snapshot assertion catches plain week readers unless absent-snapshot aliased to fixture week; loaded `week:6` catches that alias gap (logic verified against shipped test at 408410477).
  - `inbox/20261120-0407-orcaman-B1-C24-review.md` (ade6847b4): REVIEW of orcads C24 Part 0 provenance — VERDICT ok (spot-checked owner-notes/NOW absence and OWNER-INTAKE A5/A11 REPORTED/UNKNOWN labeling).
  - `inbox/20261120-0408-orcaman-B5-C29-review.md` (a519b048a): REVIEW of orcads C29 pin reconciliation — VERDICT ok (verified gh-pages README still `4ca9a071`, re-pin `66096fb13` touched engine not README, ancestry d3bd81d2→5c808472/65673a00).
- **Blocked / waiting on:** nothing owned by me. v4 items needing further seats/reviews or Owner/Architect/MUSE/Z.ai actions remain per `origin/council/muse:_agents/QUEUE.md` and sitting orders (not assigned).

## What the next session needs
- **Read first:** `git fetch -q origin && git show origin/council/muse:_agents/START-HERE.md` (Step 0 refresh governance docs first); `origin/council/muse:_agents/QUEUE.md` or `node tools/council.mjs next` (via fetched tool per START-HERE) for current ranked work; latest sitting/order context on `council/pickle`/`council/ernie` if continuing that thread.
- **Open questions (≤5):**
  1. C23 (my filing) still needs 2 more independent reviews (B4 in v4) — any seat can take.
  2. B2 C13 now has Beam review + orcaman review; confirm if v4 needs 1 more or is satisfied by seat count.
  3. B1/B5 C24/C29: orcads+vlorca filed C24 and hy4orca/orcaman reviewed aspects; orcads filed C29 with hy4orca/orcaman reviews — verify remaining review counts against v4 table before redoing.
  4. A3 text/fixture fix (week:6 + broader Q7 hardening) is a proposal for Architect/Z.ai battery — not integrated by orcaman.
  5. Governance docs in this worktree are locally refreshed (unstaged from Step 0) — next session should re-run Step 0 from `origin/council/muse` rather than relying on local state.
- **Do not redo:** C23/C31 filings and reviews listed above (all pushed to `origin/council/orcaman`, commits verified by `git ls-remote` during session); Ernie C13 script re-run receipts in `inbox/20261120-0403-orcaman-B2-C13-review.md`; A3 logic-confirm in `inbox/20261120-0405-orcaman-A3-c8b-week-gap-confirm.md`.

## Files in this lane (live)
- `_agents/orcaman/ORCAMAN.md` — this lane file (rewritten 2026-11-20 end of session)

## Session inbox files (committed/pushed this session)
- `inbox/20261120-0342-orcaman-C23-smoke-tabGuideBtn-stale.md`
- `inbox/20261120-0349-orcaman-C31-zai-order-errata.md`
- `inbox/20261120-0352-orcaman-C12-review.md`
- `inbox/20261120-0353-orcaman-C14-review.md`
- `inbox/20261120-0358-orcaman-C27-review.md`
- `inbox/20261120-0403-orcaman-B2-C13-review.md`
- `inbox/20261120-0405-orcaman-A3-c8b-week-gap-confirm.md`
- `inbox/20261120-0407-orcaman-B1-C24-review.md`
- `inbox/20261120-0408-orcaman-B5-C29-review.md`

## Worktree / branch / base
- **Worktree:** `/Users/kosi/Desktop/wt/orcaman`
- **Branch:** `council/orcaman` @ `a519b048a1e09e3a73ba66cf4056e13f6e7087dc` (HEAD at session end before this end-of-chat commit; pushed/verified)
- **Merge-base:** `git merge-base HEAD origin/council/base` = `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`

## Role
General advisor. Propose, test, dissent, measure. No product/engine/pin/governance edits; push only `council/orcaman`.
