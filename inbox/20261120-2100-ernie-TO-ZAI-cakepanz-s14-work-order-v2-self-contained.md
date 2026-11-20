SPEAKER: ERNIE | ROLE: Kilo seat (advisor) | TASK: TO Z.ai — the S14 continuation work order, rewritten from the four seats' S14 drafts (hy4 2038 · pickle 2045 + 2034 erratum · porca 2040 · ernie 2030). SELF-CONTAINED: it assumes you have read NONE of those drafts. Hand it to Z.ai verbatim. | DATE: 2026-11-20T21:00Z
FOR: P-317 / P-287 / P-316 / P-319 · the Architect (Claude) · MUSE (council record) · the Owner (relay)
REVIEW-OF: your S13 delivery `67-cakepanz-13-2026-11-20/` + the five-seat S13 review round + pickle's `2034` erratum (the decisive correction: the ring's "restyle only" premise is false — see §3.2)

=====================================================================
PROMPT FOR Z.AI — BEGIN
=====================================================================

# S14 WORK ORDER — 67 Cakepanz (67-cakepanz-14)

**Read this whole document before you touch a file.** It is self-contained: it does not assume you
have read any earlier draft or any other seat's notes. Where it cites a file, the file is named and
its content is summarized; where it cites a fact, the fact is stated. If a step depends on something
you cannot see, it is not a step — tell the Owner.

---

## 0 · BOOT AND PROVE YOUR BASELINE (before anything else)

1. **Orient** exactly as your `START-OF-CHAT-ZAI.md` §2 says: fetch, confirm your branch/tip, and read
   the current council docs from their live refs (not a stale local copy). macOS `/tmp` is a symlink —
   use a real `/private/var/folders/...` path for scratch files.
2. **Your baseline is the S13 bytes at engine pin `408410477`** (69 TypeScript files). Prove it before
   anything else:
   - From the tree root: `node cakepanz-4/tools/verify-package.mjs .` → `445 OK / 0 FAILED /
     0 missing (445 entries)` + `converse clean — the tree carries no unlisted file`, exit 0.
   - `git archive 408410477 colors/src` vs `cakepanz-4/src/engine` → 69 files each, `diff -rq` clean.
   - `git diff 408410477 <Claude's head> -- colors/src` → **0 bytes** (the engine is already
     byte-current; there is NO engine re-sync to do).
   - If any of these fails, **STOP** and report. Do not build on an unproven tree.
3. **Do NOT re-run the 13b falsifier.** It is CLOSED (see §2). Read the receipts.

---

## 1 · WHAT THE COUNCIL FOUND IN S13 — the verdict is `improved`

Your S13 **engineering is real and independently reproduced.** Do not redo any of it:
- Package `445 OK / 0 FAILED / 0 missing`, converse clean, exit 0.
- Engine **430/430** · node **35/35** · board **16/0** · slot **28/0** · visual **17/0** · shell
  **48/0** · slice **29/0/10/3** · contrast **2/0** · viewport **45/0** · golden-seam **MATCH**
  (`e8fed8ab7ca1493b7dd20298fa2e85947188bed7ecc1d6f865b187ead1e024e8`) · a clean rebuild
  reproduces `index-CoyTk5bV.css` / `index-Bymoqk0d.js`.
- The four prior-round fixes are real and lawed: **D2/W12, R2/W13, b36/N35, L22**.
- The converse check is live and proven (planted-extra fixture). The c11 "diff" re-host defect and the
  GNU-patch auto-reverse hazard are documented with a reconstruction recipe. The handoff package shape
  is right.

The delivery carries **one behavioural defect, several documentation/accuracy defects, and one
correctness gap in the ring law** — all listed below. Four independent reviewers and three
meta-reviewers converged; there is no dissent on substance. The verdict is `improved`, not `ok`.

---

## 2 · SETTLED — do not reopen

- **13b is CLOSED, double-sourced.** The classifier at `scripts/falsify-board.mjs:203` is
  `dead = v.fails.some(f => f.includes('L13 '))`; the printer at `:90` emits `DIED` only when that is
  true. The final log's F20 line prints `DIED — FAIL L16` only because `dieReport` prints `fails[0]`
  (L16 runs at `board.battery.mjs:115`, L13 at `:295`). Two seats independently filed the F20 child log
  with the literal `FAIL L13 … ids WRONG` line (hy4 at `_agents/hy4/evidence/f20-child-log-4671.log`,
  sha256 `67c0fd38…`; ernie at `_agents/ernie/deliveries/ernie-s13-13b-rerun-receipt-2026-11-20/`,
  ports 4665–4673). **Do not re-run it.** Do file child logs with future falsifier runs.
- **The ring is NOT cancelled** — it was removed from *Claude's* lane only (see §3).
- **Multisport parked is the Owner's final word.** "OWNER FINAL: ship 76 Pancakes" stands.
- **The T8 READY note's path is already correct** (`deliveries/receipts/slice1-battery.json`, line 9 of
  `20261120-1814-zai-T8-c10-hosts-READY.md`). A prior seat's claim that it said `deliverables/` was
  withdrawn — **do not "fix" it.** The 48/1 vs 49/49 tension on the beam host is a prepared-restore vs
  slice-repair distinction for the Owner/Beam, not your task.
- **T8 is READY, not blocked.** The repair file is 6,418 B, md5 `0a2869538a706e7e6ea864664b7e5c9f`;
  copy the pinned bytes, never regenerate (`slice1-battery.json` is run-variant, so a regenerated
  receipt cannot satisfy the pinned md5).

---

## 3 · THE HEADLINE — THE RING REVIVAL (the Owner's word, verbatim)

> "i should clarify that i dropped the ring for claude because the ring is an ui/ux problem and
> z.ai should be working on it, not claude. we can revive the council's work on the ring -- i
> ultimately like how w89 uses the glwoing draft buttons more -- in your next prompt to z.ai"

Read literally:
- **Dropped for Claude only — never from the product.** The Architect's `NOW.md` line "RING: DROPPED
  … Do not revisit before ship" is right for *his* lane and wrong in scope. (The Architect owns that
  file; do not edit it.)
- **The council's ring work is REVIVED and it is YOURS.** This is a live UI/UX item in your lane now.
- **Aesthetic target: w89's glowing draft buttons.** Multisport stays parked.

### 3.1 The w89 treatment (verified from the live build — use what is really there)

From `origin/gh-pages:Football-Sim-Z-post-blue-w89.html`:
- `:381` `:root{ --glow:rgba(79,140,255,.28); --gold:#ffc43c; }` — the tokens.
- `:12849` `@keyframes zpbBtnPulse{0%,100%{filter:brightness(1.14) saturate(1.04);}50%{
  filter:brightness(1.3) saturate(1.12);box-shadow:0 0 16px var(--glow,rgba(217,169,76,.35));}}`
- `:12853` `button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}`
- The W66 comment above it: *every Draft button breathes (the top-3 law goes site-wide); the top
  three graduate from the pulse to the progression treatment — filled in the drafting team's gradient
  with the sheen sweep, exactly like PLAY THE X / SEASON REVIEW; hero buttons keep the sheen and drop
  the pulse.*
- `:948` `@media (prefers-reduced-motion: reduce){.zpb-sglow{animation:none;}}` — the pulse needs the
  same guard.
- A second treatment also exists: `.zpb-sglow{color:#ffc43c;animation:zpbstarglow 2.4s ease-in-out
  infinite}` with text-shadow keyframes `0%,100%{text-shadow:0 0 4px rgba(255,196,60,.5)} 50%{
  text-shadow:0 0 9px rgba(255,196,60,.95),0 0 20px rgba(255,196,60,.45)}`.
- **Reconcile both against the actual bytes and use what is really there; do not invent a third.**
  Use the existing `--gold`/`--gold2` tokens, not new hex literals. The glow is a box-shadow /
  text-shadow — **never a text-colour change that breaks a contrast pair.**

### 3.2 CRITICAL — the ring's correctness contract is NOT shipped, and L13 does not test it

**This is the one thing the earlier drafts got wrong, and it changes the order of work.** Do NOT
treat the ring as "behaviour frozen, restyle only." The verified facts (re-check them yourself):

- Your S13 sitting report says (line 168): **"No ring work, no multisport, no Contract B."**
- `grep -n "rawSort\|suggestions" cakepanz-4/src/engine/sports/nfl/view/draftBoard.ts` → **no matches.**
  Neither `rawSort` nor `suggestions` is on `BoardRowVM`; the engine view sorts on `key()`
  (`draftBoard.ts:54 rows.sort((a,b) => key(b) - key(a) …)`) and discards the raw key.
- `src/lib/components/DraftBoard.svelte:76` computes the ring with a **lossy display parse**:
  `const val = (x: BoardRowVM) => Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, '')) || 0;`
- `batteries/board.battery.mjs:66` `vmVals()` uses the **same** lossy parse, and `:280-284` builds
  L13's `expected` from `vmVals()`. **So L13 compares the DOM ring against the same rounded display
  string the component used — it is tautological with respect to raw ordering.** The F20 child log's
  `expected 60` at pick 27 confirms the law blesses the degenerate all-rows-ringed outcome. A
  *correct* raw-value implementation can FAIL L13 when rounded display values tie differently.
- There is **no no-display-parse law** in the S13 batteries.

**The settled council position is Contract B** (five voices: Beam, PORCA, HY4ORCA, ORCATIDE, and an
earlier pickle voice; `suggestions` deferred): **`rawSort: number` on `BoardRowVM`, sourced from the
engine's `key()`, and the shell ranks on `r.rawSort`.** Do not re-litigate A-vs-B — B is the target.

### 3.3 Do this, in this order (the glow is LAST, not first)

1. **Land Contract B.** Expose `rawSort` from `key()` on every `BoardRowVM`; change the shell's ring
   computation at `DraftBoard.svelte:74-76` to rank on that raw value instead of parsing display
   text. Keep the intended behaviour: top three by active order, one-click draft, ties extend past
   three only on a genuine raw-order tie.
2. **Fix L13's oracle to read the raw value independently**, so the law can fail when the component
   parses a display string. Keep L13's *intent* word-for-word; change only how `expected` is derived.
   Add a falsification receipt: a mutant that restores the display parse must make **L13 DIE by
   name**, with the child log filed.
3. **Add the contract-neutral no-display-parse law** (hy4orca's): no ring code may derive ordering
   from rendered text or `.cp-suggest` DOM nodes. Falsify it by name.
4. **Then, and only then, port the w89 glow** (§3.1) onto the ringed-row one-click draft button:
   - Keep every ring law green: **L13 (corrected oracle), L16, L17, L18, L19, L20, L21, L22**.
   - **Contrast stays 2/0** (the glow is box-shadow/text-shadow, not a text-colour change).
   - **`prefers-reduced-motion` disables the glow** (as `cp-suggest-shimmer` already does).
   - **390 px no horizontal scroll; 0 console/page errors.**
   - **Add L23**: the ringed rows' one-click button carries the glow class, and the animation is
     disabled under reduced motion. Falsify L23 by name.
5. **Explain the ring — one plain line per ringed row** (from the *same* VM, never parsed text):
   "best value at {slot}", "fills your thinnest need", "most Wins left" — derived from `slotWins20` +
   the needs row. Zero new engine data. This is what makes the glow mean something.
6. **Persist the ring.** Store `suggestIds[]` in the save record so a restored draft shows the same
   three, auditable against stored data rather than recomputed state. (Pairs with §4: the revival is
   credible only if the link opens the same draft *and* the same advice.)

### 3.4 Deferred unless the Owner widens "revive"
Keyboard-first pick (`j`/`k` or ↑/↓ to move ring focus, `Enter` to draft, `u` to undo) and a
"Copy draft link" button with a `file://` fallback are convergent across seats but NOT in the Owner's
named direction. If the Owner narrows "revive" to the visual restyle, say so in your bulletin and
leave §3.3.1–3.3.3 filed as named OPEN work — **do not silently pass a tautological law.**

### 3.5 Do NOT
Redesign ring behaviour beyond Contract B; re-litigate A-vs-B; add board columns (uniform-board law
L12 and the Owner's "same board for all picks" ruling are load-bearing); let a glow touch a contrast
pair; or touch `colors/` for any of this.

---

## 4 · P0 — FIX THE BEHAVIOURAL DEFECT (do this before §3)

**The shareable-link / autosave collision (pickle D1, HIGH).** It breaks the headline D2/R2 feature
and is the only behavioural defect in the round. Confirmed from the bytes by four seats.

**The trace** (all in `src/App.svelte`, VERIFIED from the delivered bytes):
- `:108` calls `void hydrateBoot()` unconditionally on boot.
- `:231` `async function hydrateBoot()` calls `loadDraft(...)` whenever an autosave exists.
- `:200` `loadDraft()` calls `writeSeedToUrl(rec.seed)` at `:204`.

Therefore an explicit `?seed=B` in a shared link is silently overwritten by the browser's stale
autosave (seed A). The visitor lands on their own old draft with 43 stale picks, and the URL is
rewritten to hide the link. W12/W13 prove "URL seed === store seed" only in a **fresh** session
(`startAt()` clears localStorage at `:58`; W6/W8 clear it again at `:113`, `:124`). **No law covers
"explicit link + existing autosave."**

**Browser proof (pickle, real Chromium on the delivered bytes):** autosave at `a3f2` (seed `470990`,
one pick), then `page.goto('?dev=1&seed=k1x9')` in the same context produced
`{"seed":470990,"url":"b36:a3f2","screen":"board","picks":43}`, 0 page errors — `RESULT: DEFECT`.
The correct seed `k1x9` is `935613`. The fix was proved only on a temporary extract, never in your
tree.

**Required behaviour:** an explicit `?seed=` link wins over a *different* autosave; a *same-seed*
reload still restores (W9); a plain reload with no seed still restores (S29). Show a visible notice
that the local save was left untouched.

**Proven fix shape, inside `hydrateBoot()`:**
```ts
async function hydrateBoot() {
  // an explicit ?seed= link wins over a DIFFERENT autosave; a same-seed reload restores
  const explicitRaw = new URLSearchParams(location.search).get('seed');
  const explicitSeed = explicitRaw === null ? null : parseSeedCode(explicitRaw);
  const r = await readAutosave();
  const autosaveSeed = r.ok && r.draft ? ((r.draft.record as { seed?: number })?.seed ?? null) : null;
  if (explicitSeed !== null && autosaveSeed !== null && explicitSeed !== autosaveSeed) return;
  if (!r.ok) { error = 'the autosave was refused: ' + r.message; return; }
  if (r.draft) loadDraft(r.draft.record, r.draft.lineage, { keepWeek: !!r.week });
  // …week resume unchanged…
}
```
The **same-seed exception is load-bearing.** The naive guard `if (has('seed')) return;` **breaks W9**
(pickle measured 16 pass / 1 fail). Do not substitute it.

**New law W14:** start at seed A, make a pick, open `?seed=B` in the same context, START, assert
`store.record.seed === B`, `url === 'b36:'+B.toString(36)`, and the visible "shared link opened; your
local save is untouched" notice. **Also assert the inverse** — a reload with the *same* seed still
restores — so the W9 exception cannot be dropped. Prove it in a real browser, then re-run the full
visual battery: expect **17+/0 with W9, W12, W13, W14 green**. Falsify W14 by name with a filed child
log.

---

## 5 · P1 — HANDOFF AND RECEIPT ACCURACY (one is merge-blocking for Claude)

No product bytes change in this section.

1. **MERGE-BLOCKER (ernie D1 / pickle D6).** `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md` §1 item 4
   (line 29, hash at line 105) calls `test/engine.test.ts` a pin-identical fence file. **Pin
   `408410477` has no `colors/test/engine.test.ts`** — `git ls-tree -r 408410477 colors/test` gives 52
   files under `core/` and `nfl/`, no entry file. Your `test/engine.test.ts` is a 51-line generated
   import wrapper from `scripts/sync_engine_tests.py`. `MERGE-MANIFEST.md:23,42-43` tells Claude to
   `cmp` it — a dead end. Reword fence #4 and MERGE-MANIFEST §1 to: *"the suite ENTRY is GENERATED by
   `sync_engine_tests.py` from the pin's `colors/test/**`; the merge REGENERATES it — it is not a
   pin-identical file to compare."* Compare only `colors/src/**` (69/69) and the data packs, which ARE
   byte-identical.
2. **Re-pointed, not identical (ernie D2).** The same files call `test/engine/**` "identical".
   `test/engine/core/kernel.test.ts:3` imports `../../../src/engine/core/…`. Say "re-pointed (import
   paths rewritten; logic byte-identical)".
3. **The composite did not run END-TO-END (hy4 D1 / pickle D2 / porca DEFECT 1).**
   `ACCEPTANCE-RECEIPTS.txt` (md5 `50f338e6…`) has 13 headers but only 12 `EXIT_CODE=0`; it ends at
   `$ node scripts/shell-falsifier.mjs` with no output, and steps 13b–17 are absent. Report §1.8 and
   §9 are correct ("still running at packaging time"); §1.8b and §8 claim END-TO-END / "regenerated at
   final bytes" — false. Replace the latter with: *"the composite was cut at step 13; steps 1–12 carry
   `EXIT_CODE=0`; the 13b verdict is the standalone `partH-s13/falsify-board-13b-final.log` (ALL NINE
   CASES DIED, `FALSIFIER EXIT: 0`); file steps 13b–17 into §26 when the tail exists."*
4. **Receipt path citations (hy4 D2).** Report lines 98/160/191, README:7 and `VERIFY-§25-append.txt:38`
   cite `deliverables/receipts/partH-s13/…`. The tree has only `deliveries/receipts/…` (CHECKSUMS.txt
   carries the real path). Fix those citations. **Do NOT "fix" the T8 note** (its path is already
   correct — see §2).
5. **F20 receipt ergonomics (hy4 1949 / porca DEFECT 2 / ernie D4).** The shipped log prints
   `DIED — FAIL L16 …` because `dieReport` prints `fails[0]`; L13 is in the fail set (the `dead` check
   requires it) and the child log names it. Optionally change `dieReport` to print the planted-law line
   (`fails.find(f => f.includes(LAW + ' ')) ?? fails[0]`) so the grep dispute cannot recur. This is
   cosmetic — do not re-run 13b.
6. **Stale §9 (pickle D3).** Report §9 item 1 tells the next sitting to re-read the run-2 verdict
   ("if F20 … DIED — 13b is CLOSED, otherwise OPEN"). §1/§5 already declared it CLOSED. Replace with:
   *"record steps 13b–17 from the finished composite into §26 when the tail exists; 13b is already
   CLOSED on the named-law DIED (§5.2)."*
7. **Wrong numeric example (pickle D5).** `src/lib/port/seedCode.ts:15` says `a3f2 = 511,086`.
   Actually `parseInt('a3f2',36) === 470990` and `(511086).toString(36) === 'aycu'`. Correct to
   `a3f2 = 470,990 · k1x9 = 935,613`.
8. **Cosmetic prose (pickle D4).** §8's "see §1.8b below" (the block is headed `8b.` inside §1);
   "run after the falsifier's final verdict" printed twice at `:222–223`; `:88` reads `RUN 2 (the final
   receipt): RUN 2 (the fixed bytes, the final receipt):`. Fix all three.
9. **Verifier SKIP set (hy4).** `tools/verify-package.mjs:47` skips only `{CHECKSUMS.txt,
   PACKAGE-DELIVERY-RECEIPT.txt}`. Add `node_modules/` and `src/engine-node/` so a built tree does not
   trip the converse check with spurious EXTRA files (hy4 generated a 70-file `src/engine-node/` merely
   by running the engine suite inside the mirror).
10. **Stale-server guard in standalone batteries (ernie).** The falsifier has the D-2 served-hash
    check; standalone batteries trust `CP_PORT`. ernie saw 6/10 → 16/0 from a stale `:4179`. Port the
    served-hash readiness guard into the batteries.
11. **Battery hygiene (beam note 1).** Extract one `ringPresentGuard()` helper in the board battery
    and have every ring-dependent law (L16, L17, L18, L19, L22) call it — each new law reintroduced
    its own unguarded `.cp-suggest` locator and the crash-before-L13 class. Consider asserting
    `history.replaceState` call counts in W12/W13 so a double-write is caught.

After edits, prove the cleanup with
`grep -rniE 'FAIL +L13|deliverables/receipts|END-TO-END|511,086|engine.test.ts' <tree>`
and show that remaining hits are corrected prose or explicitly labelled REPORTED child-log references.

---

## 6 · PROOF STANDARD (non-negotiable)

- Every change: **target build + sha256 · WHERE (anchor string, not a line number) · old → new · WHY ·
  SAFE ALONE? · HOW TO CHECK (command + expected output)**. A patch/script must fail loudly if its
  anchor does not match.
- Every new behaviour gets a **named law**, and every named law is **falsified by name** — a mutant
  kills it, the receipt names it, and the child log is filed.
- Label every claim **VERIFIED / REPORTED / INFERRED / UNKNOWN**. "I believe it works" is not a
  receipt. Do not publish before/after outcomes from unseeded runs.
- No invented, estimated or silently corrected factual data (AGENTS.md §7). No engine edits, pin moves,
  ratings, protected-constant changes. Never edit the Architect's product HTML.
- Re-run the full gate set at your **final bytes**: engine 430/430 · node 35/35 (+W14) · board 16/0
  (+L13-with-raw-oracle, no-display-parse, L23) · visual 17/0 (+W14) · slot 28/0 · shell 48/0 ·
  slice 29/0/10/3 · contrast 2/0 · viewport 45/0 · golden MATCH · both gates PASS/CLEAN · falsifiers
  by name with child logs.

---

## 7 · GOVERNANCE — REPORT, do not edit

- The live pin is `408410477`. Five stale lines still say `d3bd81d2`: `origin/council/muse:AGENTS.md`
  **44, 45, 46, 73** and `PROJECT-KNOWLEDGE.md` **18**. All must become `408410477`. (The 97→99
  flex-count fix is already applied there — do not re-file it.)
- No verbatim Owner note exists under `_agents/owner-notes/` on `council/muse`; MUSE must intake the
  §3 quote and the ledger entry.
- These are MUSE's files; name them in your bulletin, do not touch them.

---

## 8 · DEFINITION OF DONE / DELIVERY

1. `node tools/verify-package.mjs .` from `cakepanz-4/` → 445+ OK / 0 FAILED / 0 missing, converse
   clean, exit 0, after regenerating CHECKSUMS.txt for the new bytes.
2. P0: real-browser W14 probe (both directions), then the full visual battery with
   W9/W12/W13/W14 green.
3. P2: Contract B landed, L13's oracle independent, no-display-parse law and L23 falsified by name
   with child logs; glow green against contrast 2/0 and 390 px.
4. Engine untouched: all 69 `src/engine/**` files still byte-identical to `408410477`;
   `git diff 408410477 <head> -- colors/src` empty.
5. All P1 corrections applied and the cleanup grep shown.
6. Regenerate CHECKSUMS.txt, MANIFEST.txt, SNAPSHOT.md, SHELL-STATUS.md, VERIFY §26, the README S14
   banner, and START-OF-CHAT-ZAI §2. Write one bulletin entry with your commit hash and `git ls-remote`
   output.
7. Produce `67-cakepanz-14-<date>.zip` (full tree at the pin + paperwork), print its sha256, and state
   plainly what you did NOT do. Push your own branch — a folder or hash printed in chat but not pushed
   is not delivered. **Do not make-live** — the Owner/Beam execute that step. No force-push.

---

## 9 · EXPLICITLY NOT IN SCOPE

No engine edits, pin moves, ratings, second sport, product HTML by a seat, governance or queue edits,
"candidate build" or dated root copies, force-push, invented data, re-running 13b, "fixing" the T8 note
path, re-litigating A-vs-B, make-live, or treating a gate PASS as product acceptance. The Architect is
the only product writer; you own this shell. When in doubt, state the assumption in one line and
proceed on everything it does not block.

=====================================================================
PROMPT FOR Z.AI — END
=====================================================================

— ERNIE (Kilo seat; signs as ERNIE). Every fact above was re-run or read from the named bytes this
round; where a value came from another seat's machine it is named as such. This prompt is
self-contained: it assumes the reader has read none of the earlier drafts.