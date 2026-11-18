# 67 Cakepanz — cakepanz-8.1 (2026-11-18) — the review-closure round; ONE zip, ONE response

**Verdict:** the cakepanz-8 review is CLOSED in this zip. The five user-facing findings the seats
converged on are fixed in both trees (the dead simple-row toggle now renders the flex chips and the
OVR/priority fitlbl one click away; the completing pick hands the screen to Complete instead of the stale
"it is not your pick" board; the FULL BOARD choice persists in the settings model and survives a reload;
syncFromHash rides go() so the hash door converges on Complete; the simple row's number tracks the active
sort with a caption) — and the delivery is honest at its own final bytes for the first time: the numerals
gate runs CLEAN, the acceptance script completes end-to-end, and every quoted hash/count is the tool's
own print, re-measured and tabled in VERIFY §22. The c8 README-DELIVERY is kept beside this file as
README-DELIVERY-c8.md.

- **The pins did not move.** Shipped `cakepanz-4/` at **5c808472** (67 files), prepared
  `cakepanz-4-prepared/` at **65673a00** (68 files, PREPARED — NOT ACTIVATED, the Owner's word).
  Both `src/engine` snapshots re-verified byte-identical to `git archive` of their pins at the final bytes
  (h22); the engine delta between the trees is exactly `sim/game.ts` + `sim/passclass.ts`; flex census
  99 rules {"0":17,"2":17,"6":42,"12":23} | SS>NICKEL=0 FB>TE=2 FB>RB=2 C>OG=6 OG>C=2 QB>FS=12, sha 76c02c65…6a6a, cmp vs BOTH pins exit 0. Zero engine files touched; the one port
  exception is `settings.ts`' additive `fullBoard` field. The gh-pages fix is STILL NOT PLACED; the GLM
  stays OFF; Block C is NOT STARTED (it opens only when this zip passes its gate).
- **Suites at the final state (the tools' own prints):** engine **394** shipped / **406**
  prepared (exit 0); node battery **33/33** both trees; shell battery **47/0** shipped ·
  **47/0** prepared (S1a–S31); slice battery **29/0/10/3** / **29/0/10/3**; late battery **9/9** shipped ·
  **9/9** prepared (L1–L9 — the 8.1 laws L7 the one-click detail, L8 the last pick lands on Complete
  through the real UI, L9 the mode choice survives a reload).
- **Falsifiers:** receipt falsifier **F0–F12 ALL DIED** (h8); shell falsifier **FA/FB/FC ALL DIED** (h9);
  falsify-late **F0-late clean 9/9 + F13–F16 ALL DIED** (h10b — L1 dies under the always-on plant, L7 under
  the re-planted dead toggle, L8 without the completing-pick handoff, L9 without the reload-restore).
- **A2's mutation receipt (re-run, shipped tree):** with `void hydrateBoot();` deleted and rebuilt —
  **46 pass · 1 fail (S29 red)**; restored and rebuilt — **47 pass · 0 fail** (h18 + h5).
- **Gates:** shipped regen **314 entries** → `gate-manifest: PASS (314 entries verified, dist/ covered,
  converse clean)` ×2; prepared regen **319 entries** → PASS (319) ×2 (h20 ×4). **`gate-numerals.mjs`
  → CLEAN ×2, both trees** (h21 ×4, h23 ×4 post-sweep — and inside the fresh-clone composite: m1 steps 12–13).
  This is the receipt that was FALSE at the cakepanz-8 bytes (the delivery contradicted itself at its own
  final bytes); §5.1's one-word fix is pasted in VERIFY §22.1.
- **dist/:** rebuilt in both trees at the 8.1 code state; the two dists are byte-identical to each other
  (`diff -rq` exit 0, h17); `dist/single.html` sha256 **4ce69205b72a8f33bdb6015ec95c3abf317748730c22000eb1bdd592e507057a** — the c8 sha 1529a003…e737 is
  superseded by this round's code edits (marked in place in MERGE-README and the c8 README below).
- **The composite contract (L10) — the round's ONE open item, honestly flagged:** the fresh-clone
  composite (npm ci → precompile → node → engine → distfile → slice → late → shell → regen → gates →
  numerals ×2) ends green in one uninterrupted run (m1-fresh-clone-composite-final.log); the per-tree
  `bash scripts/acceptance-run.sh` was STARTED at the final bytes but could not complete inside this
  sitting's time budget — the next sitting finishes it at these bytes (k1/k2 in receipts/partH-c8-1/,
  then ACCEPTANCE-RECEIPTS.txt is regenerated). Until then the order's §5.2 pointer fallback rides:
  each tree's ACCEPTANCE-RECEIPTS.txt carries the honest pointer at its top (the c7-era record kept
  below it; nothing red or self-contradicting ships).
- **VERIFY.txt §22 (new, both trees):** §22.1 the numerals receipts, §22.2 the citation audit (every
  quoted sha and count with the tool that printed it — the 5.7 law), §22.3 the transitions matrix
  (eleven screen-flipping transitions; row 6's direct-loadDraft leg is NAMED and flagged for the next
  round per §5.9), §22.4 the absence-law audit pointer. `WHAT-CHANGED.md` at the package root carries one
  entry per ordered item (4.1–4.8, 5.1–5.9, Block 3) with anchors, before/after, receipt names, and the
  drift notes (F13's anchor, the 5.4 shell-count re-quote, the 5.6 option taken, the caption set).
- **START-OF-CHAT-ZAI.md** (package root + both trees) — byte-identical ×3 (sha256 8ef3b18df08f098957e925e184f2abae0ea06d2d369e4f3d09d663ffae381b48), §2
  rewritten for this sitting (the file's own §6 rule). **The three copies CHANGED this round — MUSE is
  told explicitly here, per the order's §7: MUSE re-files the updated file on `council/muse`.**
- Push nothing: this zip is the delivery; the Owner places it. The zip's sha256 is reported to the Owner
  in the chat reply (a package cannot carry its own zip hash — the SELF_REF rule's logic).
