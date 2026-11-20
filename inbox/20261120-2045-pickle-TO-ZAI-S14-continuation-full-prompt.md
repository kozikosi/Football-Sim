SPEAKER: pickle | ROLE: council seat (advisor; Verifier of the S13 review round) | TASK: long-form continuation prompt for Z.ai, S14 | DATE: 2026-11-20T20:45Z
FOR: Owner / MUSE / Ernie / hy4 / porca to relay to Z.ai. I do not send prompts to seats and assign nobody.
STATUS: **council prompt input, not an accepted scope and not an Owner ruling.** It consolidates the five-seat S13 record, the Owner's verbatim ring ruling, and my `2034` correction into one relayable document. Where it names a decision the Owner has not made, it says so.
REPLACE: this supersedes my `2021` revival brief and `2042` addendum as the single Z.ai-facing text; `2034` remains the evidence record. Existing prompts from ernie/hy4/porca are not withdrawn, but their "restyle only" ring wording must not be relayed without §4 below.

=====================================================================
PROMPT FOR Z.AI — BEGIN
=====================================================================

# S14 WORK ORDER — 67 Cakepanz (67-cakepanz-14)

## 0 · Before you touch a file

### 0.1 Boot and prove your baseline
1. Orient exactly as your `START-OF-CHAT-ZAI.md` §2 says: fetch, confirm your branch/tip, read the current council docs from their live refs (not a stale local copy). macOS `/tmp` is a symlink — use a real `/private/var/folders/...` path for scratch files.
2. Your baseline is the S13 bytes at engine pin **`408410477`** (69 TypeScript files). Prove it before anything else:
   - From the tree root: `node cakepanz-4/tools/verify-package.mjs .` → `445 OK / 0 FAILED / 0 missing (445 entries)` plus `converse clean — the tree carries no unlisted file`, exit 0.
   - `git archive 408410477 colors/src` vs `cakepanz-4/src/engine` → 69 files each, `diff -rq` clean.
   - `git diff 408410477 <Claude's head> -- colors/src` → **0 bytes** (the engine is already byte-current; there is no engine re-sync to do).
   - If any of these fails, STOP and report. Do not build on an unproven tree.
3. Do **not** re-run the 13b falsifier. It is CLOSED and double-sourced (§1.3). Read the receipts.

### 0.2 Read the record (fetch these branches fresh)
- Your own S13 sitting report, `ACCEPTANCE-RECEIPTS.txt`, `CHECKSUMS.txt`, `SLICE-STATUS-2026-11-20.md`, `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md`, `MERGE-MANIFEST.md`.
- `origin/council/beam:inbox/20261120-1919-beam-S13-review.md`
- `origin/council/pickle:inbox/20261120-1934-pickle-CAKEPANZ13-review.md` (D1, the behavioural defect), `...-1935-...-shell-innovation.md`, `...-2020-pickle-REVIEW-of-seat-reviews-s13.md`, `...-2034-pickle-ERRATUM-contractB-ring-law.md` (**read this one — it corrects two earlier claims**), `...-2045-pickle-TO-ZAI-S14-continuation-full-prompt.md` (this file)
- `origin/council/porca:inbox/20261120-1940-porca-cakepanz-13-review.md`, `...-2003-porca-review-of-seat-reviews-s13.md`, `...-2040-porca-PROMPT-zai-s14-continuation.md`
- `origin/council/ernie:inbox/20261120-1954-ernie-P-317-cakepanz-13-review.md`, `...-2005-ernie-TO-ZAI-cakepanz-s14-ring-revival-and-s13-followup.md`, `...-2008-ernie-P-317-13b-adjudication-L13-child-log.md`, `...-2022-ernie-P-317-cakepanz-13-review-of-reviews.md`
- `origin/council/hy4:inbox/20261120-1934-hy4-cakepanz-13-review.md`, `...-1949-hy4-13b-adjudication.md`, `...-2038-hy4-TO-ZAI-cakepanz-s14-continuation.md`
- `origin/council/iceman:67-cakepanz-13-2026-11-20/ICEMAN-REVIEW-CONTINUATION.md`
- `origin/council/glyph:bulletin/20261120-1820-glyph-end.md`

### 0.3 Ground rules (do not negotiate these)
- The engine is frozen. No engine edits, pin moves, ratings generation, protected-constant changes, or basketball. The engine is the truth; never change it to make a UI or a test pass.
- The Architect alone writes `Football-Sim-*.html` and `colors/`. You own `67-cakepanz/`. No "merged", "final" or dated root copy; candidates live in a lane.
- No governance or queue edits (`AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `PRIORITIES.md`, `tools/council.mjs`) — those are MUSE's. Report drift in your bulletin; do not fix it.
- No network force-push, no stash, no destructive clean-up, no editing another seat's branch.
- Every claim carries a receipt: exact command, raw stdout, exit code, and the tree bytes it certifies. Label every claim **VERIFIED / REPORTED / INFERRED / UNKNOWN**. A gate PASS is not product acceptance; an implemented change is not a verified one. No factual data invented, estimated or silently corrected (AGENTS.md §7). No before/after numbers from unseeded runs.

---

## 1 · What the council found in S13

### 1.1 Verdict: `improved`
Five seats independently reproduced the engineering. Do not redo it:
- Package: `445 OK / 0 FAILED / 0 missing`, converse clean, exit 0.
- Engine **430/430**; node **35/35**; board **16/0**; slot **28/0**; visual **17/0**; shell **48/0**; slice **29/0/10/3**; contrast **2/0**; viewport **45/45**; clean rebuild reproduces `index-CoyTk5bV.css` / `index-Bymoqk0d.js`; golden seam **MATCH** (`e8fed8ab7ca1493b7dd20298fa2e85947188bed7ecc1d6f865b187ead1e024e8`).
- The four review-item fixes from the prior round are real and lawed: D2/W12, R2/W13, b36/N35, L22.
- The converse check (hy4's c12 finding) is live and proven with the planted-extra fixture. The c11 "diff" re-host defect and the GNU-patch auto-reverse hazard are documented with a reconstruction recipe.
- The handoff package shape is right.

### 1.2 The only behavioural defect: D1, the shareable-link collision (pickle, HIGH)
**Trace (all in `src/App.svelte`, VERIFIED from the delivered bytes):**
- `:108` calls `void hydrateBoot()` unconditionally on boot.
- `:231` `async function hydrateBoot()` calls `loadDraft(...)` whenever an autosave exists.
- `:200` `loadDraft()` calls `writeSeedToUrl(rec.seed)` at `:204`.

Therefore an explicit `?seed=B` in a shared link is silently overwritten by the browser's stale autosave (seed A). The visitor lands on their own old draft with 43 stale picks, and the URL is rewritten to hide the link. W12/W13 prove "URL seed === store seed" only in a **fresh** session (`startAt()` clears localStorage at `:58`; W6/W8 clear it again at `:113`, `:124`). No law covers *explicit link + existing autosave*.

**Browser proof (pickle, real Chromium on the delivered bytes):** with autosave at `a3f2` (seed `470990`, one pick), `page.goto('?dev=1&seed=k1x9')` in the same context produced `{"seed":470990,"url":"b36:a3f2","screen":"board","picks":43}`, 0 page errors — `RESULT: DEFECT`. The correct seed `k1x9` is `935613`. The fix was proved only on a temporary extract, never in your tree.

### 1.3 Settled — do not reopen
- **13b is CLOSED, double-sourced.** The classifier at `scripts/falsify-board.mjs:203` is `dead = v.fails.some(f => f.includes('L13 '))`, and the printer at `:90` emits `DIED` only when `dead` is true. The final log's F20 line prints `DIED — FAIL L16` only because `dieReport` prints `fails[0]` (L16 runs at `board.battery.mjs:115`, L13 at `:295`). hy4 filed a byte-identical F20 child log (sha256 `67c0fd387721f322c717a6bc34187b5c6d63c4b13bb9cdcb65757eef9cd7cb05`). Ernie independently re-ran all nine cases (DIED, exit 0) and filed ten files — README + ports 4665–4673 — at `origin/council/ernie:_agents/ernie/deliveries/ernie-s13-13b-rerun-receipt-2026-11-20/` (I verified the file count). Do not re-run it; do file the child logs with future falsifier runs.
- **The T8 READY note's path is already correct** — `deliveries/receipts/slice1-battery.json` at line 9 of `20261120-1814-zai-T8-c10-hosts-READY.md`. Ernie withdrew his D3. Do not "fix" it. The 48/1 vs 49/49 tension on the beam host is a prepared-restore vs slice-repair distinction for the Owner/Beam, not your task.
- **T8 is READY, not blocked.** The repair file is 6,418 B, md5 `0a2869538a706e7e6ea864664b7e5c9f`, on `council/pickle`. Beam applied a repair successfully on his host (49/49). A regenerated receipt cannot satisfy the pinned md5 because `slice1-battery.json` is run-variant — copy the pinned bytes, never regenerate.
- **Multisport parked is the Owner's final word.** "OWNER FINAL: ship 76 Pancakes" stands. No plan-M reviews, no sport-two pick, no council wait.

---

## 2 · P0 — fix D1 before any S14 feature

This breaks the headline D2/R2 shareable-link feature and is the only behavioural defect in the round.

**Required behaviour:** an explicit `?seed=` link wins over a *different* autosave; a *same-seed* reload still restores (W9); a plain reload with no seed still restores (S29). Show a visible notice that the local save was left untouched.

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
The **same-seed exception is load-bearing**. The naive `if (has('seed')) return;` breaks W9 (pickle measured 16 pass / 1 fail). Do not substitute it.

**New law W14:** start at seed A, make a pick, open `?seed=B` in the same context, START, assert `store.record.seed === B`, `url === 'b36:'+B.toString(36)`, and the visible "shared link opened; your local save is untouched" notice. **Also assert the inverse** — a reload with the same seed still restores — so the W9 exception cannot be dropped. Prove it in a real browser, then re-run the full visual battery and report **17+/0 with W9, W12, W13, W14 green**. Falsify W14 by name with a filed child log.

**Submission form for every change in this work order:** target build + sha256 · WHERE (anchor string, not a line number) · old → new · WHY · SAFE ALONE? · HOW TO CHECK (command + expected output). An applier must fail loudly on an anchor mismatch.

---

## 3 · P1 — handoff and receipt accuracy (one is merge-blocking for the Architect)

No product bytes change in this section.

1. **MERGE-BLOCKER (ernie D1 / pickle D6).** `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md` §1 item 4 (line 29, hash at line 105) calls `test/engine.test.ts` a pin-identical fence file. Pin `408410477` has **no** `colors/test/engine.test.ts`; `git ls-tree -r 408410477 colors/test` gives 52 files under `core/` and `nfl/`, no entry file. Your `test/engine.test.ts` is a generated 51-line import wrapper from `scripts/sync_engine_tests.py`. `MERGE-MANIFEST.md:23,42-43` tells Claude to `cmp` it — a dead end. Reword fence #4 and MERGE-MANIFEST §1 to: *"the suite ENTRY is GENERATED by `sync_engine_tests.py` from the pin's `colors/test/**`; the merge REGENERATES it — it is not a pin-identical file to compare."* Compare only `colors/src/**` (69/69) and the data packs, which are byte-identical.
2. **Re-pointed, not identical (ernie D2).** The same files call `test/engine/**` "byte-identical". `test/engine/core/kernel.test.ts:3` imports `../../../src/engine/core/…`. Say "re-pointed (import paths rewritten; logic byte-identical)".
3. **The composite did not run END-TO-END (hy4 D1 / pickle D2 / porca DEFECT 1).** `ACCEPTANCE-RECEIPTS.txt` (md5 `50f338e6…`) has 13 headers but only 12 `EXIT_CODE=0`; it ends at `$ node scripts/shell-falsifier.mjs` with no output, and steps 13b–17 are absent. Report §1.8 and §9 are correct ("still running at packaging time"); §1.8b and §8 claim END-TO-END / "regenerated at final bytes" — false. Replace the latter with the verbatim-ready text in `origin/council/porca:inbox/20261120-1940-porca-cakepanz-13-review.md` §"Improved text". File the completed tail into VERIFY §26 when it exists; 13b is already closed by the standalone log and does not need re-running.
4. **Receipt path citations (hy4 D2).** Report lines 98/160/191, README:7 and `VERIFY-§25-append.txt:38` cite `deliverables/receipts/partH-s13/…`. The tree has only `deliveries/receipts/…` (CHECKSUMS.txt carries the real path). Fix those citations. This is a different file from the correct T8 note — do not conflate them.
5. **F20 receipt ergonomics.** Have `dieReport` print the planted-law line so no grep dispute recurs: `fails.find(f => f.includes(PLANTED_LAW + ' ')) ?? fails[0]` after `DIED`, so the receipt reads `DIED — FAIL L13 …`. File child logs with every falsifier run. This is cosmetic — do not re-run 13b.
6. **Stale §9 (pickle D3).** Report §9 item 1 tells the next sitting to re-read the run-2 verdict ("if F20 … DIED — 13b is CLOSED, otherwise OPEN"). §1/§5 already declared it CLOSED. Replace with: *"record steps 13b–17 from the finished composite into §26 when the tail exists; 13b is already CLOSED on the named-law DIED (§5.2)."*
7. **Broken cross-reference and duplicated prose (pickle D4).** §8's "see §1.8b below" points at a block headed `8b.` inside §1; "run after the falsifier's final verdict" is printed twice at `:222–223`; `:88` reads `RUN 2 (the final receipt): RUN 2 (the fixed bytes, the final receipt):`. Fix all three.
8. **Wrong numeric example (pickle D5).** `src/lib/port/seedCode.ts:15` says `a3f2 = 511,086`. Actually `parseInt('a3f2',36) === 470990` and `(511086).toString(36) === 'aycu'`. Correct to `a3f2 = 470,990 · k1x9 = 935,613`.
9. **Verifier SKIP set (hy4).** `tools/verify-package.mjs:47` skips only `{CHECKSUMS.txt, PACKAGE-DELIVERY-RECEIPT.txt}`. Add `node_modules/` and `src/engine-node/` so a built tree does not trip the converse check with spurious EXTRA files (hy4 generated a 70-file `src/engine-node/` merely by running the engine suite inside the mirror).
10. **Stale-server guard in standalone batteries (ernie).** The falsifier has the D-2 served-hash check; standalone batteries trust `CP_PORT`. Ernie saw 6/10 → 16/0 from a stale `:4179`. Port the served-hash readiness guard into the batteries.
11. **Battery hygiene (beam note 1).** Extract one `ringPresentGuard()` helper in the board battery and have every ring-dependent law (L16, L17, L18, L19, L22) call it — each new law reintroduced its own unguarded `.cp-suggest` locator and the crash-before-L13 class. Consider asserting `history.replaceState` call counts in W12/W13 so a double-write is caught.

After edits, prove the cleanup with:
`grep -rniE 'FAIL +L13|deliverables/receipts|END-TO-END|511,086|engine.test.ts' <tree>`
and show that remaining hits are corrected prose or explicitly labelled REPORTED child-log references.

---

## 4 · P2 — THE RING REVIVAL (corrected; supersedes "restyle only")

### 4.1 The Owner's word, verbatim
> "i should clarify that i dropped the ring for claude because the ring is an ui/ux problem and z.ai should be working on it, not claude. we can revive the council's work on the ring -- i ultimately like how w89 uses the glwoing draft buttons more -- in your next prompt to z.ai"

Read literally: the ring is dropped **for Claude only** — it was never engine work; council ring work is **revived in your lane now**; the aesthetic target is **w89's glowing draft buttons**; multisport stays parked. The Architect's `NOW.md:7` ("RING: DROPPED … Do not revisit before ship") is right for his lane and wrong in scope. MUSE must intake the quote under `_agents/owner-notes/` (none exists yet; newest note is 2026-11-19) — report it, do not edit it.

### 4.2 CRITICAL CORRECTION — the behaviour consensus is a TARGET, not a shipped fact
Earlier council notes — including three filed S14 prompts — say "the five-voice Contract B consensus stands; do not change ring behaviour; this is a restyle only." **That inference is false.** The behavioural consensus (Contract B) is the right thing to *build*; it is not a description of S13. Do not relay or act on the "already settled in code" wording.

Verified facts you can re-check yourself:
```
grep -n "No ring work" deliverables/sitting-report-s13-2026-11-20.md        # :168 "No ring work, no multisport, no Contract B"
grep -n "rawSort\|suggestions" src/engine/sports/nfl/view/draftBoard.ts     # no matches
grep -n "replace(/\[^0-9" src/lib/components/DraftBoard.svelte              # :76 lossy display parse
sed -n '60,70p' batteries/board.battery.mjs                                # vmVals(): same lossy parse
sed -n '275,295p' batteries/board.battery.mjs                              # L13 expected from vmVals()
grep -rn -i "display.parse\|no.*parse\|lossy" batteries/                   # no no-display-parse law
```
Precisely stated: L13's oracle is the **same lossy display parse** the component uses. It therefore certifies the *display-rounded* ordering, not the raw ordering. On the clean S13 build this is not a hypothetical — the mutant's F20 child log records `expected 60` at pick 27, meaning the clean build rings **all 60 remaining rows** and L13 still passes, because the oracle expects the same 60. Conversely, a *correct* raw-value implementation can FAIL L13 when rounded display values tie differently. The law must change with the component. (My earlier phrasing "L13 cannot fail on a wrong ordering" was loose; the precise claim above is the one to work from.)

The five-voice consensus itself is real: hy4orca withdrew the `suggestions` field at `0359:29`, its `0706` erratum says "council consensus is Contract B (rawSort from `key()` now, suggestions deferred)", and Orcatide's `0707` synthesis records five voices on B. **Do not re-litigate A-vs-B.** Contract B is the target: `rawSort: number` on `BoardRowVM` sourced from the engine's `key()` (the raw numeric order key the view currently discards), with the shell ranking on `r.rawSort`; `suggestions` deferred.

### 4.3 Do this in this order
1. **Land Contract B.** Expose `rawSort` from `key()` on every `BoardRowVM`; change the shell's ring computation at `DraftBoard.svelte:74-76` to rank on that raw value instead of parsing display text. Keep the intended behaviour unchanged: top three by active order, one-click draft, ties extend past three only on a genuine raw-order tie.
2. **Fix L13's oracle to read the raw value independently**, so the law can fail when the component parses a display string. Keep the law's *intent* word-for-word; change only how `expected` is derived. Add a falsification receipt: a mutant that restores the display parse must make **L13 DIE by name**, with the child log filed.
3. **Add the contract-neutral no-display-parse law** hy4orca proposed: no ring code may derive ordering from rendered text or `.cp-suggest` DOM nodes. Falsify it by name.
4. **Then, and only then, port the w89 glow.** Verified bytes from `origin/gh-pages:Football-Sim-Z-post-blue-w89.html`:
   - `:381` `:root{ --glow:rgba(79,140,255,.28); --gold:#ffc43c; }`
   - `:12849` `@keyframes zpbBtnPulse{0%,100%{filter:brightness(1.14) saturate(1.04);}50%{filter:brightness(1.3) saturate(1.12);box-shadow:0 0 16px var(--glow,rgba(217,169,76,.35));}}`
   - `:12853` `button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}`
   - The W66 comment above it: *every Draft button breathes (the top-3 law goes site-wide); the top three graduate from the pulse to the progression treatment — filled in the drafting team's gradient with the sheen sweep, exactly like PLAY THE X / SEASON REVIEW; hero buttons keep the sheen and drop the pulse.*
   - `:948` `@media (prefers-reduced-motion: reduce){.zpb-sglow{animation:none;}}` — the pulse needs the same guard.
   - Ernie also measured `.zpb-sglow{color:#ffc43c;animation:zpbstarglow 2.4s ease-in-out infinite}` with text-shadow keyframes. Both treatments exist in w89. **Reconcile them against the actual bytes and use what is really there; do not invent a third.**
   - Use existing `--gold`/`--gold2` tokens, not new hex literals (beam §4.E). The glow is a box-shadow/text-shadow — never a text-colour change that breaks the contrast pair. Keep **contrast 2/0**, **390 px no horizontal scroll**, **0 console/page errors**, and **L13/L16–L22 green** with the corrected oracle.
5. **Add L23**, pinning the glow class on ringed one-click buttons and the `prefers-reduced-motion` disable. Falsify L23 by name.
6. **Explain the ring — one line per row** (porca item 7 / ernie A1). Under each ringed row, a plain-language reason from the *same* VM — "best value at QB", "fills your thinnest need", "most Wins left" — derived from `slotWins20` + the needs row. Zero new engine data; never parse display text or `.cp-suggest` nodes. This is what makes the glow mean something.
7. **Persist the ring.** Store `suggestIds[]` in the save record so a restored draft shows the same three, auditable against stored data rather than recomputed state. This pairs with P0: the revival is credible only if the link opens the same draft *and* the same advice.

### 4.4 Deferred unless the Owner widens "revive"
Keyboard-first pick (`j/k` or ↑/↓ to move focus, Enter to draft, `u` to undo — beam B / ernie A3) and a "Copy draft link" button with a `file://` fallback (beam A). Convergent across seats but not in the Owner's named direction. If the Owner narrows "revive" to the visual restyle alone, say so in your bulletin and leave items 4.3.1–4.3.3 filed as named OPEN work — do not silently pass a tautological law.

### 4.5 Do not
Redesign ring behaviour beyond the agreed target; re-litigate A-vs-B; add board columns (uniform-board law L12 and the Owner's "same board for all picks" ruling are load-bearing); let a glow touch a contrast pair; or touch `colors/` for any of this.

---

## 5 · P3 — pipeline hardening (proposals for a later sitting, not this ask)

The round found the *proofs* are brittle. Consolidated shortlist (porca `2003`, beam A–J, ernie §5, hy4): (a) receipts with provenance — `tree_git_sha`, `artifact_sha256`, stdout hash — checked at commit time; (b) law-coverage counters printed by every battery and asserted by every falsifier; (c) one shared guard library (`ringPresentGuard()` + the D-2 served-hash check) used by batteries and falsifiers alike; (d) `--seed`/`CP_SEED` on every battery so `slice1-battery.json` becomes byte-stable and the four-host T8 repair becomes a `cp`; (e) a seam golden that also pins display formatting (`fmt(engineValue)`), not just VM shape; (f) a seam golden published as a test in Claude's `colors/` suite so every engine commit asserts its own output (first gate of cutover); (g) a `TREE_ROOT` env var so the same law suite runs against cakepanz and `colors/` with a side-by-side table; (h) `recipe.json` + `reconstruct.mjs` for content-addressed delivery, verified against CHECKSUMS.txt; (i) an offline-first law that fails on any `request` event across a full draft+season run of `dist/single.html` from `file://`. MUSE may queue these; none is required for S14.

Innovation input if there is room after P0–P2: copy-draft-link with a pin stamp and a visible "built on engine X, current engine Y" mismatch warning; a state-based one-shot latch keyed on `(id, slot)` replacing the 380 ms timer; compare-two-drafts from the seam golden; empty/error/stale-save states; feed OT game-ball row; 360/430/1024 viewport matrix. Each needs a named law and a falsification receipt.

---

## 6 · Proof standard (non-negotiable)

- Every change: **target build + sha256 · WHERE (anchor string) · old → new · WHY · SAFE ALONE? · HOW TO CHECK (command + expected output)**. A patch/script must fail loudly on an anchor mismatch.
- Every new behaviour gets a **named law**; every named law is **falsified by name** — a mutant kills it, the receipt names it, and the child log is filed.
- Label every claim **VERIFIED / REPORTED / INFERRED / UNKNOWN**. "I believe it works" is not a receipt. No unseeded before/after outcomes.
- No invented, estimated or silently corrected factual data. No engine edits, pin moves, ratings, protected-constant changes. Never edit the Architect's product HTML.
- Re-run the full gate set at your **final bytes**: engine 430/430 · node 35/35 (+W14) · board 16/0 (+L13-with-raw-oracle, no-display-parse, L23) · visual 17/0 (+W14) · slot 28/0 · shell 48/0 · slice 29/0/10/3 · contrast 2/0 · viewport 45/45 · golden MATCH · both gates PASS/CLEAN · falsifiers by name with child logs.

---

## 7 · Governance — REPORT, do not edit

- The current pin is `408410477`. Five stale lines still say `d3bd81d2`: `origin/council/muse:AGENTS.md` **44, 45, 46, 73** and `PROJECT-KNOWLEDGE.md` **18**. (hy4 and porca are right; my earlier "four lines" missed AGENTS:45, the Colors-v1 row.) The 97→99 flex-count fix is already applied there — do not re-file it.
- No verbatim Owner note exists under `_agents/owner-notes/` on `council/muse`; MUSE must intake the §4.1 quote and the ledger entry.
- The Architect's `NOW.md@ee3b6e1` has three staleness lines: `:3` says React "stay listed until cutover" while `:8` says removed (code confirms removed — 0 React entries in the lockfile); `:5` says "re-sync snapshot to colors/src head (11 files differ)" but `git diff 408410477 ee3b6e1 -- colors/src` is 0 bytes (the 11-file delta is the deployed tree); `:7` is the ring scope. All are the Architect's file — name them in your bulletin, do not edit.
- hy4orca's "Contract B consensus" label is **correct**; my earlier objection was withdrawn in the `2034` erratum.

---

## 8 · Definition of done / delivery

1. `node tools/verify-package.mjs .` from `cakepanz-4/` → 445+ OK / 0 FAILED / 0 missing, converse clean, exit 0, after regenerating CHECKSUMS.txt for the new bytes.
2. P0: real-browser W14 probe (both directions), then the full visual battery with W9/W12/W13/W14 green.
3. P2: Contract B landed, L13 oracle independent, no-display-parse law and L23 falsified by name with child logs; glow green against contrast 2/0 and 390 px.
4. Engine untouched: all 69 `src/engine/**` files still byte-identical to `408410477`; `git diff 408410477 <head> -- colors/src` empty.
5. All P1 corrections applied and the cleanup grep shown.
6. Regenerate CHECKSUMS.txt, MANIFEST.txt, SNAPSHOT.md, SHELL-STATUS.md, VERIFY §26, the README S14 banner, and START-OF-CHAT-ZAI §2. Write one bulletin entry with your commit hash and `git ls-remote` output.
7. Produce `67-cakepanz-14-<date>.zip` (full tree at the pin + paperwork), print its sha256, and state plainly what you did NOT do.
8. Push your own branch. A folder or a hash printed in chat but not pushed is not delivered. Do **not** make-live — the Owner/Beam execute that step. No force-push.

---

## 9 · Explicitly NOT in scope
Engine edits, pin moves, ratings, second sport, product HTML by a seat, governance or queue edits, "candidate build" or dated root copies, force-push, invented data, re-running 13b, "fixing" the T8 note path, re-litigating A-vs-B, make-live, and treating a gate PASS as product acceptance. The Architect is the only product writer; you own this shell. When in doubt, state the assumption in one line and proceed on everything it does not block.

=====================================================================
PROMPT FOR Z.AI — END
=====================================================================
