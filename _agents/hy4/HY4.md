# HY4 — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** HY4 · **Model / how reached:** HY4 / API (OpenChamber) · **State:** advisor
- **Admitted:** 2026-11-18 by the Owner (`tools/admit-seat.sh`). Not retired.
- **Role:** propose, test, review, dissent, measure. Core status is the Owner's call after 3 verified items.
- **Worktree:** `/Users/kosi/Desktop/wt/hy4` · **branch:** `council/hy4` · **merge-base with base:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`

## Current work
- **Done 2026-11-18 (first session):** mirrored the Owner's `67-cakepanz-8-2026-11-18/` delivery (869 committed files, 35 MB) onto `council/hy4` at `581e63a9` so anyone can read it; reviewed it thoroughly and pushed `inbox/20261118-2005-hy4-cakepanz-8-review.md` (VERDICT: improved) plus `inbox/20261118-2005-hy4-cakepanz-8-ideas.md` at `fc92351d`.
- **Review receipts (re-run by me, not just read):** pins 5c808472/65673a00 byte-identical; flex 99 rules {0:17,2:17,6:42,12:23}; engine 394/394 + 406/406; node battery 33/33; shell 47/0; slice 29/0/10/3; late 6/6; falsifiers F0–F12 + F13 all DIED; dist `single.html` sha `1529a003…e737` byte-reproducible on rebuild; gate PASS (314).
- **Finding:** simple late-draft row's `<button>` toggles `aria-expanded` but renders no detail — dead affordance and an inaccurate "one click away" claim. Full improved `BoardRow.svelte` and a proposed L7 law are in the review file.
- **Claimed / in progress:** none · **Blocked / waiting on:** nothing for this work; the Owner/Architect hold the open decisions.

## What the next session needs
- **Read first:** (1) the two inbox files named above; (2) `67-cakepanz-8-2026-11-18/WHAT-CHANGED.md` + `README-DELIVERY.md` in this branch; (3) `AGENTS.md` §5 (review chain, states, one-writer rule).
- **Open questions:** (a) calmer second half of the draft vs. a first-time-player-readable shell — the question I ended the ideas file on; (b) fix the 10-pick flip threshold or leave it (Owner); (c) does MUSE want a PRIORITIES row for the improved component?
- **Do not redo:** every receipt in the review file was re-run this session; do not re-measure the pins, hashes, census, gates or batteries unless the delivery changes. Do not re-run the slice battery without restoring `batteries/slice1-battery.json` afterwards (it rewrites last-run output).

## Files in this lane
- `_agents/hy4/HY4.md` — this file (only live lane artifact).
- `inbox/20261118-2005-hy4-cakepanz-8-review.md` — review, VERDICT improved, with improved component.
- `inbox/20261118-2005-hy4-cakepanz-8-ideas.md` — ranked shell UX improvements (Tier 1–3).
- `bulletin/20261118-2008-hy4.md` — this session's board entry.
- `67-cakepanz-8-2026-11-18/` — read-only mirror of the Owner's delivery (do not edit; it is Z.ai's work).
