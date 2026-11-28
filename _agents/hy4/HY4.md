# HY4 — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** HY4 · **Model / how reached:** Hy4 flash / OpenChamber · **State:** advisor (no core status claimed).
- **Admitted:** 2026-11-18 by the Owner (`tools/admit-seat.sh`). Not retired.
- **Role:** propose, test, review, dissent, measure. No veto; the Architect decides. Never assign work to a named seat; the queue is one ranked list on `origin/council/muse`.
- **Worktree:** `/Users/kosi/Desktop/wt/hy4` · **branch:** `council/hy4` · **merge-base with base:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e`.
- **Repo:** `/Users/kosi/Desktop/Football Sim/.git` (git-common-dir verified). The shared tree is read-only for all seats.

## Current work (session end 2026-11-27T20:04Z — cross-seat review + long Z.ai prompt; HEAD `a0c520901f`)
- **Mirrors pushed for council visibility** (Owner requests, one per sitting):
  - `zai-s17-closeout-2026-11-24/` @ `873a9f742` — 781 files, 26 MB, byte-identical (`diff -rq` exit 0 excluding node_modules/.git/.DS_Store).
  - `zai-s17-continuation-2026-11-25/` @ `3cd405cfa6` — 840 files, 26 MB, flat tree, `diff -rq` exit 0. I regenerated one doc inside the mirror to prove a finding, then restored it byte-identically.
  - Both mirrors are read-only; do not edit them. Prior mirrors in the tree: `zai-s17-closeout-2026-11-23/`, `67-cakepanz-13/14/15-WIP/`.
- **Reviews filed** (all `VERDICT`-bearing, independent — I authored none of the reviewed work):
  - `inbox/20261125-0020-hy4-zai-s17-continuation-review.md` — ok on code; found N1 (SHELL-STATUS said acceptance COMPLETE while receipt ended mid-13b) and N2 (README/ZAI said node-battery.log refreshed to 37/37 while it was 23/23). Both were genuinely closed by Z.ai's next sitting.
  - `inbox/20261126-0147-hy4-zai-s17-continuation-waveA-waveB-review.md` — Wave A green; Wave B tree not acceptable: stray `SHA256SUMS` breaks the seal, green generated prose over 8 RED claims, dist mismatch, node 35/37, Wave B battery parse error + 6/12 laws failing (real Arizona Cardinals contrast regression).
  - `inbox/20261127-2004-hy4-TO-ZAI-long-continuation-prompt.md` (+ `-SHORT-` pointer) — long self-contained DRAFT ORDER (needs Owner/Architect relay) integrating Pickle's D1–D8, exact fixes, the gate, a fresh independent Verifier, the landed/proven matrix and ranked next-wave ideas.
- **Exact fixes filed** — `inbox/20261126-0225-hy4-TO-ZAI-exact-fixes-for-WaveB-blockers.md`: copy-ready patches for every Wave B blocker. **VERIFIED:** six stale node-battery pins replaced with attribute-tolerant regexes in a throwaway copy → `37 tests / 37 pass / 0 fail` on Node v26.13.0. This resolved Pickle's D3 "UNKNOWN" (not a Node-version issue; Glyph also measured 37/37 at pre-Wave-B bytes).
- **Brainstorm filings** — `inbox/20261125-0020-hy4-cakepanz-s17-implications-and-ideas.md` (12 ideas) and `inbox/20261126-0147-hy4-cakepanz-s17-waveB-implications-and-ideas.md` (12 ideas): stale-pin immune laws, deterministic epoch from attestation hash, one atomic close-out commit, inert-URL whitelist, 32-team contrast gate, real domHooks single-source, attest every generated artifact, statusVM precedence, readable provenance, heat-strip→play-call card, seam golden as drift alarm, tent as portfolio artifact.
- **Cross-seat review (this session)**: Claude's tip `1681d3a363` — T1 dataset-as-deploy-asset (Z.ai ask: fetch-then-import, remove `?raw`, empty-state receipt), T2 clean-repo rehearsal (8 files hold 3+ player names — Owner decision before first push), T3 sync gaps closed (new `SyncApi`: stats/history/restore/shares/delete/notifyRemoved; gates colors 523/523, tsc 89, D1 43/43, mutants 22/22+9/9; no independent review). `NOW.md`: ship-first, multisport parked, engine is Claude's, deploy only after Owner "go"; T6 flags for Z.ai (title "20-0"→"76 Pancakes", stale `ENGINE_PIN`, CI pin-watch `65673a0`, `?raw`). Pickle's D1–D8 draft order `council/pickle@inbox/20261127-0320-…` (not relayed) and Glyph's review `council/glyph@81e61a62c5` (37/37 pre-Wave-B, 8 UX ideas) were read and folded into the prompt.

## What the next session needs
1. Read this file → `inbox/20261127-2004-hy4-TO-ZAI-long-continuation-prompt.md` → the two review filings above. If the Owner relays the draft order, review Z.ai's next delivery against it; otherwise take the next line from the live queue.
2. **Watch** whether Z.ai closes D1–D8, runs the gate, and requests a fresh independent Verifier at final sealed bytes. Pickle's D3 UNKNOWN is resolved (stale pins); do not reopen it.
3. **Owed:** one fresh independent Verifier for the Wave B fixes — not Z.ai, not Pickle, not me, not a pre-fix reviewer. Gate PASS is not product acceptance; Owner decides cutover.
4. **Claude-side open:** 8 name-bearing files in the clean-repo rehearsal need an Owner decision before first push; CF account/subdomain/repo/OAuth are Owner-only; nothing deploys before "go".

## Open questions (not mine to decide)
- Relay Pickle's D1–D8 order? Recommended yes via the Owner.
- Node pin 26.13.0? Recommended yes (measured 37/37 there).
- Push `council/zai` or cite mirror `8ccf53783` + `9fb6fcbc…`? Recommended cite until credentials exist.
- Dev-only or player-facing provenance at cutover? Recommended dev-only until Owner rules.
- T1 dataset wiring / T3 sync API: plan only until Owner/Architect signal.

## Standing context (in force — do not reopen)
- Owner rulings: brand 76 Pancakes, "20-0" is the season record; repo `76pancakes` (lowercase identifiers); stats on the deployed site, data files not in the public repo; offline is hard; no faces/scouting/full-GM; no paid API/CDN.
- Engine pin `408410477` (69 TS files, five-path fence); never edit `src/engine/**` to match a UI; model-first weights from `slotWins20`; flex 97-rule D-picks table. R-13 CLOSED (Owner 2026-11-19, Vite 8); migration plan FILED, not applied — no Vite bump before cutover.
- Delivery gate: a pushed commit hash or a download link is delivery; a sandbox path is not. No force-push, no stash, `git add -- <paths>`, 60 s stall flags, own branch only.
- Claims: VERIFIED (ran it, receipt in text) / REPORTED (another seat's receipt, cited) / INFERRED / UNKNOWN. "Done" needs a command and its output. Generated files are never hand-edited; regenerate and reseal.
- Finishing a sitting: update this file, one bulletin entry with `FACT:`/`PRIORITY+:` lines, commit, push `council/hy4`, `node tools/preserve.mjs check`.

## Files in this lane
- `_agents/hy4/HY4.md` — this file.
- `_agents/hy4/evidence/f20-child-log-4671.log` — F20 child log with `FAIL L13` (`67c0fd38…`).
- `inbox/20261127-2004-hy4-TO-ZAI-long-continuation-prompt.md` + `-SHORT-` pointer — long continuation order for Z.ai (DRAFT, needs relay).
- `inbox/20261126-0225-hy4-TO-ZAI-exact-fixes-for-WaveB-blockers.md` — exact patches, six verified pin fixes.
- `inbox/20261126-0147-hy4-zai-s17-continuation-waveA-waveB-review.md` + `-implications-and-ideas.md` — review + 12 ideas.
- `inbox/20261125-0020-hy4-zai-s17-continuation-review.md` + `-cakepanz-s17-implications-and-ideas.md` — earlier review + 12 ideas.
- `zai-s17-continuation-2026-11-25/`, `zai-s17-closeout-continuation-2026-11-24/`, `zai-s17-closeout-2026-11-23/`, `67-cakepanz-13/14/15-WIP/` — read-only delivery mirrors; do not edit.
- Bulletins: `20261127-2004`, `20261126-0147`, `20261125-0020`, `20261123-1733`, plus the long earlier history on this branch.
