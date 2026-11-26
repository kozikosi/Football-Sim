# ORCADS — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ORCADS · **Model / how reached:** ORCADS / API · **State:** advisor
- **First seen:** 2026-11-19 (admitted by the Owner) · **Sessions:** 2026-11-20 (v2: C29, C24), 2026-11-20 (v3: A1, A2), 2026-11-22 (council ask 0250), 2026-11-22 (76Pancakes cutover ask), 2026-11-23 (S17 relay + review), 2026-11-25/26 (S17c relay + review + Cakepanz UX innovation)
- **Strengths shown so far (evidence, not claims):** pin/ancestry forensics (C29, A1 — `git ls-tree` blob joins, `merge-base`, pin-watch runs); running a delivery's own laws against its shipped bytes rather than reading its receipts (A2; S17 430/430 + 37/37 + 370/370; S17c 430/430, 53/53 shell, and the 6/12 Wave B failure the author's crash had masked); repo-wide provenance search (C24); UX measurement from the delivery's own screenshots + a static mock-up.
- **Worktree:** `/Users/kosi/Desktop/wt/orcads` · **Branch:** `council/orcads` · **Base:** `origin/council/base` · **merge-base:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`

## Current work
- **State:** session closed clean. Worktree clean, 0 stashes, 0 local-only commits (my preserve row `0 0 OK`; the gate's non-zero exit is other seats' dirty trees).
- **Done this session (2026-11-25/26, commit `210672361` + the review commit):**
  - `deliveries/zai-s17-continuation-2026-11-25/` + `deliveries/RELAY-NOTES.md` — the S17 continuation package relayed at the Owner's request (836 files, 19 MB; `data/packs/` excluded, byte-identical to `408410477:data/packs/*`). Not runnable as-is: restore the four packs before `test:engine`/`verify-package`.
  - `inbox/20261126-0156-orcads-S17c-continuation-review.md` — **the review.** Twelve findings, all with the command that shows them. Central: the package is two trees in one — the generated state block says `30 OK · 0 RED` (06:54Z) over a tree that moved at 21:15–21:19Z; at the shipped bytes `check-claims` is **25 OK / 8 RED** (packaging **18 OK / 3 RED**), `verify-package` exits 1 on one EXTRA file, and Wave B's own battery dies on `as const` (after the one-line fix: **6/12 fail**). Wave A holds and closes my 2026-11-23 F2/F3/F4. §5 carries drop-in diffs for every failing pin, the tint fix, the offline-tent selector fix, and a new `attestation-covers-tree` claim.
  - `inbox/20261126-0210-orcads-cakepanz-ux-innovation.md` — the Owner's UX ask: implications of the sitting (claims as product asset, "the UI may not out-run the engine", finish the hook registry, offline is a dev-flag property), the 8 visible defects (phone row breaks words, needs wall, no column headers, no team crests, 240× "provenance in the tooltip" in the a11y tree, `SWEEK 1`), and 14 ranked innovations (Pick Card, gone-ribbon, needs×value mini-map, crests, provenance drawer, schedule instead of week pills, replay comparison, anchored-light tint).
  - `_agents/orcads/mockups/cakepanz-board-390.html` — static mock-up (≤10 KB, no external refs) of the proposed phone board: collapsed needs, gone-ribbon, sticky header, two-line row with number chips, 44 px draft control. 6 players where the shipped board fits 3.
  - `bulletin/20261126-0230-orcads.md` — the `FACT:` lines.
- **Done 2026-11-23:** the closeout relay + review (`inbox/20261123-1735-orcads-S17-closeout-review.md`; F1 Vite line vs R-13, F2 overruled RED verifier → now closed, F3 clock-rule STALE → now closed, F4 41-capture orphan → now closed, F5 retired ring laws, F6 my relay); U1–U9 UX set.
- **Done 2026-11-22:** `inbox/20261122-1731-orcads-76pancakes-cutover-ask.md`; `inbox/20261122-1116-orcads-council-ask-20261122-0250.md`.
- **Done 2026-11-20:** C29 snapshot pin, C24 provenance, A1 pin-watch, A2 Q7 adversarial.
- **Blocked / waiting on:** C15/C16/C22 need the c10 app tree; A3 (C8b confirm) must be a different seat.

## What the next session needs
- **Read first:** (1) my two inbox files from this session — the review's §5 is the actionable surface; (2) `origin/council/muse:_agents/QUEUE.md` via `node tools/council.mjs next`; (3) `deliveries/RELAY-NOTES.md` before running anything in the relay.
- **Open questions (ranked by what they unblock):**
  1. **Owner: offline default (§4.14)** — embed a labelled sample roster so `file://` lands on Team Select, or keep the CSV import as first run? The tent test cannot go green until this is decided, and it is the Owner's hard requirement.
  2. **Architect/Z.ai:** does Wave B get the pin re-point (review §5.1–5.3) in the same commit, or is the wave withdrawn and re-landed? Nothing else in the package can be verified until the three red batteries are honest again.
  3. **Owner/Architect:** the light-mode takeover tint — anchored to the chip/border (my recommendation) or gold→paper ink? Either is one line; leaving it as shipped ships a 32-team AA failure.
  4. Still open from 2026-11-23: the Vite line vs R-13; who re-runs a verifier on the new claim list; the five gh-pages pin lines; `better-auth` Origin behaviour; where the c10 zip is.
- **Do not redo:** the S17c engine 430, the shell 53, the `verify-package` 401/0/0 + EXTRA, the claims 25/8 and 18/3, the waveb 6/12-after-fix, the offline-tent reproduction, the tint contrast numbers, the dist byte-identity rebuild, the side-by-side vacuity check, or the 2026-11-23 engine/seal loop. All are in the two inbox files with raw output.
- **Next best for this seat:** review Wave B's re-land at the repaired bytes (the natural next review); otherwise a QUEUE item from `council.mjs next`.

## Files in this lane
- `_agents/orcads/ORCADS.md` — this file.
- `_agents/orcads/mockups/cakepanz-board-390.html` — the phone-board mock-up (static, < 10 KB).
- `inbox/` — nine files: C29, C24, A1, A2, council ask 0250, cutover ask, S17 closeout review, S17c continuation review, Cakepanz UX innovation.
- `deliveries/zai-s17-continuation-2026-11-25/` and `deliveries/zai-s17-closeout-2026-11-23/` + `deliveries/RELAY-NOTES.md` — the relayed packages (not my authorship; the notes say so).
- `bulletin/` — one entry per session.

## Role
General advisor. Admitted by the Owner on 2026-11-19. Advisor level: propose, test, dissent, measure. Core status is the Owner's call; ten pushed items, all measurements or reviews.
