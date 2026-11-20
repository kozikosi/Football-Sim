SPEAKER: hy4 | ROLE: advisor | TASK: TO Z.ai — S14 continuation prompt (hand this to Z.ai verbatim) | DATE: 2026-11-20T20:38Z
FOR: P-317 / P-287 / P-316 / P-319 · the Architect (Claude) · MUSE (council record)
REVIEW-OF: your S13 delivery `67-cakepanz-13-2026-11-20/` (mirrored read-only on `council/hy4`) · the four seats' S13 reviews and the three meta-reviews · hy4 `20261120-2032` · the Owner's ring ruling in this chat

=====================================================================
PROMPT FOR Z.AI — BEGIN
=====================================================================

# S14 WORK ORDER — the ring revival, the behavioural fix, and the receipt-accuracy round

## 0 · Boot and read first (do this before any build)

1. Fetch and orient exactly as your START-OF-CHAT-ZAI §2 says. Your baseline is the S13 bytes at engine pin **`408410477`** (69 TS files). Verify before anything else:
   - `node cakepanz-4/tools/verify-package.mjs .` from the tree root → `445 OK / 0 FAILED / 0 missing` + `converse clean`, exit 0.
   - `git archive 408410477 colors/src` vs `cakepanz-4/src/engine` → 69 files each, `diff -rq` exit 0. If either fails, STOP — you are not on the S13 bytes.
2. Read, in this order (all on their own branches, fetch fresh):
   - `origin/council/beam:inbox/20261120-1919-beam-S13-review.md` (verdict + ideas A–J)
   - `origin/council/pickle:inbox/20261120-1934-pickle-CAKEPANZ13-review.md` and `...-1935-...-shell-innovation.md` and `...-2020-pickle-REVIEW-of-seat-reviews-s13.md` and `...-2021-pickle-IDEA-ring-revival-for-zai.md`
   - `origin/council/porca:inbox/20261120-1940-porca-cakepanz-13-review.md` and `...-2003-porca-review-of-seat-reviews-s13.md`
   - `origin/council/ernie:inbox/20261120-1954-ernie-P-317-cakepanz-13-review.md`, `...-1958-...-handoff-D1-test-entry-correction.md`, `...-1960-ernie-TO-ARCHITECT-ring-not-dropped.md`, `...-2005-ernie-TO-ZAI-cakepanz-s14-ring-revival-and-s13-followup.md`, `...-2008-ernie-P-317-13b-adjudication-L13-child-log.md`, `...-2022-ernie-P-317-cakepanz-13-review-of-reviews.md`, `...-1959-ernie-P-287-cakepanz-shell-ux-brainstorm.md`
   - `origin/council/hy4:inbox/20261120-1934-hy4-cakepanz-13-review.md`, `...-1934-hy4-cakepanz-13-ideas.md`, `...-1949-hy4-13b-adjudication.md`, `...-2032-hy4-review-of-seat-reviews-s13.md`
   - Your own S13 sitting report and `SLICE-STATUS-2026-11-20.md`.
3. Do not re-run the 13b falsifier. It is CLOSED (see §2). Read the receipts instead.

## 1 · Verdict on S13 (what the council actually found)

Your S13 **engineering is real and verified** by multiple seats: verify-package 445 OK / converse clean; engine 430/430; node 35/35; board 16/0; slot 28/0; visual 17/0; shell 48/0; slice 29/0/10/3; contrast 2/0; viewport 45/45; golden-seam MATCH; the four review-item fixes (D2/W12, R2/W13, b36/N35, L22) are lawed and correct. The converse check (hy4's c12 finding) is adopted and proven with the planted-extra fixture. The reconstruction recipe for the c11-diff re-host defect is documented. The handoff package is the right shape. **Do not redo any of it.**

The delivery carries **documentation and one behavioural defect**, all listed below. Four independent reviewers and three meta-reviewers converged on this list; there is no dissent on substance.

## 2 · Settled — do not reopen

- **13b is CLOSED.** The filed final log's F20 line reads `DIED — FAIL L16`; the `dead` classifier at `scripts/falsify-board.mjs:203` is `v.fails.some(f => f.includes('L13 '))` and the printer at `:90` emits `DIED` only when that is true, so `DIED` entails L13 was in the mutant's failure set. The `FAIL L16` print is only `fails[0]` (L16 runs at `board.battery.mjs:115`, L13 at `:295`). Ernie re-ran the full falsifier independently — all 9 cases DIED, exit 0 — and filed all nine child logs at `origin/council/ernie:_agents/ernie/deliveries/ernie-s13-13b-rerun-receipt-2026-11-20/`. The F20 child log (port 4671) contains `FAIL L13 the top THREE … pick 1 (early): 0 highlighted (expected 4, ids WRONG) …`. hy4 filed a byte-identical copy at `origin/council/hy4:_agents/hy4/evidence/f20-child-log-4671.log` (sha256 `67c0fd387721f322c717a6bc34187b5c6d63c4b13bb9cdcb65757eef9cd7cb05`). No further 13b work is required.
- **The ring is NOT cancelled** — see §3. It was removed from Claude's lane only.
- **Multisport parked is the Owner's final word.** "OWNER FINAL: ship 76 Pancakes" stands.
- **The T8 READY note's path is already correct** (`deliveries/receipts/slice1-battery.json` at line 9 of `20261120-1814-zai-T8-c10-hosts-READY.md`). Ernie withdrew his D3 — do not "fix" it. The 48/1 vs 49/49 tension on the beam host is a prepared-restore vs slice-repair distinction for the Owner/Beam to reconcile, not your task.

## 3 · THE HEADLINE — the ring revival (the Owner's word, verbatim)

The Owner wrote in this chat:

> "i should clarify that i dropped the ring for claude because the ring is an ui/ux problem and z.ai should be working on it, not claude. we can revive the council's work on the ring -- i ultimately like how w89 uses the glwoing draft buttons more -- in your next prompt to z.ai"

Read that precisely:
- **Dropped for Claude, not from the product.** The Architect's `NOW.md` line "RING: DROPPED … Do not revisit before ship" is wrong in scope (Ernie filed the correction; the file is the Architect's — do not edit it).
- **The council's ring work is REVIVED and it is YOURS.** This is a live UI/UX item in your lane now. The five-voice Contract B / C′1 consensus on ring *behaviour* stands; only the *visual* moves.
- **Design direction: w89's glowing draft buttons.** Two seats measured the live `w89` build; verify their exact selectors from the bytes before coding:
  - Pickle: `git show origin/gh-pages:Football-Sim-Z-post-blue-w89.html` → line 12849 `@keyframes zpbBtnPulse{…box-shadow:0 0 16px var(--glow,rgba(217,169,76,.35));}`, line 12853 `button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}`, W66 comment ("every Draft button breathes; the top-3 graduate from the pulse to the team-gradient + sheen treatment"), token `--gold:#ffc43c` at :381, reduced-motion guard for the star glow at :948.
  - Ernie: `.zpb-sglow` — `color:#ffc43c; animation:zpbstarglow 2.4s ease-in-out infinite`, keyframes `0%,100%{text-shadow:0 0 4px rgba(255,196,60,.5)} 50%{text-shadow:0 0 9px rgba(255,196,60,.95),0 0 20px rgba(255,196,60,.45)}`.
  - Reconcile those two reads against the actual w89 bytes and use the one that is really there. Do not invent a third treatment.
- **Implementation shape:** evolve the ringed-row affordance from "outline + shimmer" (`.cp-suggest` / `.cp-quick`) toward that warm glowing gold. Keep it AA-contrast-clean (glow is box-shadow/text-shadow, not a text-colour change — the contrast battery must stay 2/0) and honour `prefers-reduced-motion` (the glow must switch off, as `cp-suggest-shimmer` already does).
- **Keep every ring law green:** L13 (top-3 highlighted by active order), L16 (ringed rows carry the one-click button), L17 (undo + non-ringed expand + keyboard), L18 (double-activation guard), L19 (banner disarm), L20 (values announced), L21 (gone% method keyboard), L22 (staged Confirm guard). Add **L23** pinning the glow: the ringed rows' one-click button carries the glow class, and the animation is disabled under reduced motion. **Do not change ring behaviour** — top-3 by active order, one-click draft, ties extend. This is a restyle only.

## 4 · Priority-ordered fix list (consensus — do them in this order)

### P0 — HIGH, behavioural: the shareable-link collision (pickle D1 + new law W14)
This breaks the headline D2/R2 feature and it is the only behavioural defect in the round.
- **Cause (verified from bytes):** `src/App.svelte:108` calls `void hydrateBoot()` unconditionally on boot; `hydrateBoot` at `:231` calls `loadDraft` whenever an autosave exists; `loadDraft` at `:200` calls `writeSeedToUrl(rec.seed)` at `:204`. So an explicit `?seed=B` in a shared link is overwritten by a stale autosave seed A — the user lands on their OWN old draft, the URL is rewritten to A, with no notice. W12/W13 prove this only in a fresh session (`startAt()` clears localStorage); no law covers "explicit link + existing autosave."
- **Fix (verified correct and non-regressing):** skip the autosave ONLY when an explicit seed exists AND differs from the autosave seed — `explicitSeed !== null && autosaveSeed !== null && explicitSeed !== autosaveSeed`. Same-seed reload → `explicitSeed === autosaveSeed` → restores (W9 holds); plain reload with no seed → `explicitSeed === null` → restores (S29 holds). The naive `if (has('seed')) return;` breaks W9 (16/1) — the same-seed exception is load-bearing.
- **Law W14:** "start at seed A, make a pick, open `?seed=B` in the same context, START, assert `record.seed === B`, `url === 'b36:'+B.toString(36)`, and a visible 'shared link opened; your local save is untouched' notice; also assert the inverse (same-seed reload still restores) so the W9 exception cannot be dropped." Prove it in a real browser as pickle did.

### P0 — the merge-blocker you must publish (ernie D1 / pickle D6)
- Handoff fence #4 names `test/engine.test.ts` as pin-identical. The pin has no such file (`git ls-tree -r 408410477 colors/test` → 0 `engine.test.ts`); `MERGE-MANIFEST.md:23,42-43` tells Claude to `cmp` it. The file in cakepanz is a GENERATED wrapper. Change the handoff to "regenerate via `sync_engine_tests.py`, never `cmp`." Ernie filed the Architect-facing note; you own the handoff wording.
- Also change the `test/engine/**` claim from "byte-identical" to "re-pointed (import paths)" — `test/engine/core/kernel.test.ts:3` imports `../../../src/engine/core/…`.

### P1 — receipt and citation accuracy
1. **Composite overclaim.** Delivered `ACCEPTANCE-RECEIPTS.txt` has 13 headers, 12 `EXIT_CODE=0`, ends at `$ node scripts/shell-falsifier.mjs` with no steps 13b–17. Report §1.8 and §9 say "still running at packaging time" (correct), but §1.8b and §8 claim END-TO-END / "regenerated at final bytes" (false). Fix the latter; file the completed tail into VERIFY §26 when it exists. Use the replacement text in the four reviews.
2. **Receipt paths.** Report/README/VERIFY cite `deliverables/receipts/partH-s13/falsify-board-13b-final.log`; the file lives at `deliveries/receipts/partH-s13/…` (`deliverables/receipts/` does not exist). Fix all citations (report:98/160/191, README:7, VERIFY:38). This is hy4's D2 — a different file from the correct T8 note.
3. **F20 receipt ergonomics.** File the child logs with every falsifier run (not just the final log). Make `dieReport` print the planted-law line, e.g. `fails.find(f => f.includes(PLANTED_LAW + ' ')) ?? fails[0]` after `DIED`, so the receipt says `DIED — FAIL L13 …` and no grep dispute is possible. This is cosmetic — do not re-run 13b.
4. **seedCode.ts:15** comment says `a3f2 = 511,086`; the real value is **470,990** (`parseInt('a3f2',36) === 470990`; `(511086).toString(36) === 'aycu'`). Fix the comment.
5. **Verifier SKIP set** (`tools/verify-package.mjs:47`) is only `{CHECKSUMS.txt, PACKAGE-DELIVERY-RECEIPT.txt}`. Add `node_modules/` and `src/engine-node/` so a built tree does not fail the converse check with spurious EXTRA files. (hy4 hit exactly this: running the engine suite generated a 70-file `src/engine-node/` inside the mirror.)
6. **Stale-server guard in standalone batteries.** The falsifier has the D-2 served-hash check; the standalone batteries trust `CP_PORT`. Ernie hit 6/10 → 16/0 on a stale :4179. Port the guard.
7. **Battery hygiene (Beam note 1).** Extract one `ringPresentGuard()` helper in the board battery that every ring-dependent law (L16, L17, L18, L19, L22) calls — each new law added its own unguarded `.cp-suggest` locator and reintroduced the crash-before-L13 class. Consider asserting on `history.replaceState` call count in W12/W13 so a future double-write is caught.
8. **Governance drift — REPORT, do not edit.** The live pin is `d3bd81d2` at **five** lines: `origin/council/muse:AGENTS.md` 44/45/46/73 and `PROJECT-KNOWLEDGE.md` 18 (Pickle found four; hy4 verified the fifth at AGENTS:45 — the Colors-v1 row). All must become `408410477`. The flex count is already 99 in AGENTS.md. Also: no verbatim Owner note exists under `_agents/owner-notes/` on `council/muse` — MUSE must intake the ring quote in §3 into the note + ledger. These are MUSE's files; name them in your bulletin, do not touch them.

## 5 · Innovation — input, not scope

Choose a SMALL set; receipt each with a named law. Ranked across the four seats' brainstorm lists:

1. **Seam golden as a standing cross-tree canary (hy4).** N34 currently snapshots the frozen pin inside cakepanz. Publish the same canonical JSON as a test in Claude's `colors/` engine suite so every engine commit asserts its own output against the golden — the merge then cannot silently break the shell. First gate of cutover.
2. **Two-tree diff harness (hy4).** Run the same law suite against cakepanz and `colors/` via a `TREE_ROOT` env var, emitting a side-by-side pass table. The cutover checklist already notes the slice battery's 3 DEFER items need both trees.
3. **Copy-draft-link button (Beam A) + deterministic replay (Beam G).** One click next to the seed code to copy `location.href`, with a `file://` fallback. Stamp the pin into the link (`?seed=b36:…&pin=408410477`) and on mismatch show "this draft was built on engine X; current engine is Y — results may differ" instead of silently replaying. The honest version of "shareable draft."
4. **Keyboard-first draft (Beam B).** ↑/↓ move the staged row, Enter confirms, `u` undoes, 1–9 jump to the nth available row; the top-3 ring is the default focus target. Reuse L22's guard; add a law that keyboard confirm lands exactly one pick.
5. **State-based one-shot latch (hy4 R1).** `confirmPick()` uses a 380 ms timer. Replace with a latch keyed on the staged `(id, slot)` — one dispatch per staged item, re-staging makes a new latch. Removes both the dropped-fast-second-pick and the slow-double-click window.
6. **Compare two drafts (Beam C).** The seam golden already serialises boardVM; a second serialisation at another seed gives a pick-by-pick divergence view for free.
7. **Empty/error/stale-save states (Beam D).** "No draft yet" pointing at Team Select; "draft failed to load" from `state.error`; "stale save" when the record's engine pin differs from the current pin. The last matters most at cutover.
8. **Theme tokens, not hex (Beam E).** `DraftBoard.svelte .cp-go` uses `#c9a24b`/`#b3766a`/`#2c1e0c`; move to `--gold`/`--gold2` tokens so palette changes land in one place.
9. **Feed OT game-ball row (Beam F).** Extend the engine's existing regulation/OT separation with a game-ball highlight — one row, one source.
10. **Offline-first law (hy4 #8 / Beam J).** The tent-in-the-woods requirement is hard but unmeasured. Fail on any `request` event (CDN, font, telemetry) across a full draft+season run of `dist/single.html` from `file://`.
11. **Content-addressed delivery recipe (hy4 #9).** The c10/c11 diff re-host cost you a whole reconstruction. Ship `recipe.json` (parent delivery hashes + operations) plus `reconstruct.mjs` verified against CHECKSUMS.txt.

## 6 · Proof standard (non-negotiable)

- Every change: **target build + sha256 · WHERE (anchor string, not a line) · old → new · WHY · SAFE ALONE? · HOW TO CHECK (command + expected output)**. A patch/script must fail loudly if its anchor does not match.
- Every new behaviour gets a **named law**, and every named law gets **falsified** by name (a mutant that kills it must make it DIE, with the planted law named in the receipt). File the child logs.
- Label every claim **VERIFIED / REPORTED / INFERRED / UNKNOWN**. "I believe it works" is not a receipt. Do not publish before/after outcomes from unseeded runs.
- No factual data invented, estimated or silently corrected (AGENTS.md §7). No engine edits, no pin moves, no ratings — the pin is byte-verified and the engine is the truth. Never edit the product HTML of the Architect's tree.
- Re-run the full gate set at your final bytes: engine 430/430 · node 35/35 (+W14, L23) · board 16/0 (+L23) · visual 17/0 (+W14) · slot 28/0 · shell 48/0 · slice 29/0/10/3 · contrast 2/0 · viewport 45/45 · golden MATCH · both gates PASS/CLEAN · falsifiers by name.
- Regenerate CHECKSUMS.txt, MANIFEST.txt, SNAPSHOT.md, SHELL-STATUS.md, VERIFY §26, the README S14 banner, START-OF-CHAT-ZAI §2, one bulletin entry, and hand a full-tree zip with its sha256.

## 7 · Deliverable and handoff

Produce `67-cakepanz-14-<date>.zip` (full tree at the pin + paperwork), verify `node tools/verify-package.mjs .` → 445+ OK / converse clean, exit 0, print the zip sha256, and state plainly what you did NOT do. The relay (Owner/Beam) lands it. Do not make-live; do not push others' branches; do not create a "merged"/"final" copy in the root.

## 8 · What is explicitly NOT in scope

No engine edits, pin moves, ratings, second sport, or Contract B behaviour change. No governance file edits (MUSE's). No Architect file edits. No re-run of 13b. No "fix" of the T8 note path. No force-push. The ring is a restyle in YOUR lane, not a Claude task and not a cancellation.

=====================================================================
PROMPT FOR Z.AI — END
=====================================================================

— hy4 (advisor). Every fact above was re-run or read from the named bytes this sitting; where a value came from another seat's machine it is named as such.
