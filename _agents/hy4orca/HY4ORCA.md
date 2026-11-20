# HY4ORCA — lane file (rewrite at end of every session, never append)

## Identity
- **Seat:** HY4ORCA · **Model / how reached:** HY4ORCA / API · **State:** advisor
- **Admitted:** 2026-11-19 by the Owner. Role: propose, test, review, dissent, measure. Core status is the Owner's call after 3 verified items.
- **Worktree:** `/Users/kosi/Desktop/wt/hy4orca` · **Branch:** `council/hy4orca` · **`git merge-base HEAD origin/council/base`:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`
- **State at session end:** worktree clean (preserve check OK), branch pushed and verified by `ls-remote`.

## Current work (2026-11-20 session)
Owner task: push the desktop folder `zip-root-cakepanz-10` (Z.ai's 67 Cakepanz 11 sitting delivery) to my branch, review it thoroughly, push the review, and brainstorm improvements to cakepanz / the UI-UX shell. Two later MUSE relays added corrections to work I had filed; I verified and corrected them.

### Delivered
- **Package pushed** at `_agents/hy4orca/zip-root-cakepanz-10/` (41 files, 424 KB) in two commits (24 + 17 — seatbelt refuses >40-file commits): `8c0d2c61a` core, `b0861af93` diffs. Integrity re-checked with node crypto: 40/40 real files byte-intact; the lone bad entry is the `CHECKSUMS.txt` self-line (`d41d8cd…` = md5 of the empty string). NOTE: the delivery's quick-verify command `md5 -c` is a silent no-op on macOS — do NOT cite it as proof (see erratum).
- **Review filed** `inbox/20261120-0448-hy4orca-cakepanz11-review.md` — VERDICT **improved**, five VERIFIED findings (F1 stage-summary contradicts itself and START; F2 receipts file ends at the 13b command with no stdout/exit; F3 SHELL-STATUS.md says the slot receipt is absent though the zip ships it 27/0/0; F4 six contrast holes cited to a JSON holding only three; F5 team 0 mislabelled "the Bears"). Withdrew a prospective L13 finding after reading the carried law — its 37/60 sets are genuine ties.
- **Ideas filed** `inbox/20261120-0450-hy4orca-cakepanz-shell-ideas.md` — 7 proposals: typed advice channel + no-display-parse law; P-337 progressive disclosure; shareable challenge link; WCAG palette doctor; shared served-hash falsifier guard; RUN-STATE.json; SportAdapter seam law. Point 1 is a FUTURE advice-envelope pattern, not a vote to build Contract A now.
- **Erratum filed** `inbox/20261120-0706-hy4orca-cakepanz11-erratum.md` + a CORRECTION block appended to the review: (a) RETRACTED my "`md5 -c` exit 0 = integrity proof" line — on macOS it exits 0 on a tampered tree with 0 bytes output; (b) ADDED F6 — base-36 all-digit seed codes replay a different seed (decimal branch first), re-run 1000..9999 → exactly 700/9000 failures (1296 → "100" → 100); (c) CLARIFIED my ring position is Contract B, matching my C12 synthesis.
- **Repo facts re-verified:** pin `408410477` is an ancestor of architect tip, docs-only 2 files +65, 10 `pickSlot` hits in store.ts; flex 99 rules 17/17/42/23; P-317 row at `origin/council/muse:_agents/QUEUE.md:190`; shell-falsifier has the D-2 stale-server guard, falsify-board does not; NOW.md was 16 lines at first check.

## What the next session needs
- **Read first:** (1) `inbox/20261120-0706-hy4orca-cakepanz11-erratum.md` (corrects my earlier review — do not cite its `md5 -c` line); (2) `inbox/20261120-0448-hy4orca-cakepanz11-review.md`; (3) `inbox/20261120-0359-hy4orca-A1-C12-synthesis.md` for the Contract B ruling.
- **Open questions:** Architect owes Contract B confirmation, NOW.md trim (now 17), red-suite/PIN_ENGINE/Q7 answers, and the plan-M additions; Owner owes palette ruling on six AA holes, Part 0 confirmation, sport-two pick, c10/doc landings. Z.ai's open item: falsify-board stale-server guard; plus the cakepanz-12 v2 fix round (F20, S1 seed round-trip, packaging, docs, a11y D2, one-click safety, seed range).
- **Do not redo (receipts on my branch):** A1 pin-watch, C12 synthesis, C29/C23/C27/C24/A2/B2-C13/C17/C21/C14/B7/B6 reviews, cakepanz-11 review + ideas + erratum. A seat may not review the same item twice.
- **Orientation:** live order is Pickle v4; `node /tmp/council.mjs next` (v11 from muse) currently surfaces old P0 Guide/season reviews (P-143 etc.). Nothing in the last three relays assigned work to this seat.

## Live files (all on council/hy4orca)
- 14 files from the 20 Nov review/verification session (`inbox/20261120-*`, earlier).
- `_agents/hy4orca/zip-root-cakepanz-10/` — the pushed Z.ai package (41 files).
- `inbox/20261120-0448-hy4orca-cakepanz11-review.md` (+ CORRECTION block), `inbox/20261120-0450-hy4orca-cakepanz-shell-ideas.md`, `inbox/20261120-0706-hy4orca-cakepanz11-erratum.md`.
- `bulletin/20261120-0449-hy4orca.md` and `bulletin/20261120-0706-hy4orca.md` — one per session step.

## Role reminder
Advisor: propose in `inbox/`, never edit the product/engine/pins/governance or another seat's file. Push only `council/hy4orca`, never force-push. End every chat with one bulletin line.
