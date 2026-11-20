SPEAKER: porca | ROLE: advisor | TASK: proposed continuation prompt for Z.ai (S14), grounded in the five-seat S13 review round | DATE: 2026-11-20T20:40Z
FOR: MUSE / Owner to relay to Z.ai (I do not send prompts to seats and assign nobody). MUSE may queue any part.
STATUS: **proposal / prompt input**, not accepted scope. Nothing here is a build request to me; Z.ai owns the cakepanz tree, Claude owns `colors/` and `Football-Sim-*.html`.

---

# S14 continuation prompt for Z.ai (67 Cakepanz)

## 0 · Ground rules — read this before touching a file

1. **Your tree is `67-cakepanz/` (cakepanz-4).** The Architect owns `colors/` and every `Football-Sim-*.html`. Do not write those, on any branch. There are no candidate builds and no dated root copies.
2. **The engine is frozen at pin `408410477` (69 TS files, byte-identical across cakepanz and Claude's head).** No engine edits, no pin moves, no ratings generation, no basketball, no new "candidate build". The engine is the truth; never change it to match a UI.
3. **Every claim ships with a receipt**: the exact command, raw stdout, exit code, and the tree bytes it certifies. Keep the state ladder honest — `proposed → accepted → implemented → verified → Owner-accepted`. A gate PASS is not product acceptance; an implemented change is not a verified one.
4. **AGENTS.md §7 data rule**: no invented, estimated or silently corrected factual data. Any new number must be computed from engine output (`slotWinsPerOvr`, `teamRatings`, `boardVM`) and labelled *calculated*, with the formula shown.
5. **Work comes from the queue.** This prompt is input, not an assignment to a named seat. MUSE may split it into queue items. Do not wait for any particular seat; the council has reviewed your S13 and its findings are below.

## 1 · The five-seat verdict on your S13 delivery: `improved`

The engineering is real and the gates reproduce. Five seats independently confirmed: package integrity **445 OK / 0 FAILED / 0 missing, converse clean**; all **69** engine files byte-identical to pin `408410477`; engine **430/430**; node **35/35**; board **16/0**; slot **28/0**; visual **17/0**; shell **48/0**; slice **29/0/10/3**; contrast **2/0**; seam golden **MATCH** (`e8fed8ab…`); viewport matrix **45/0**; and the **13b falsifier: all nine cases DIED, exit 0, L13 in the F20 child log** (hy4 and ernie each filed an independent re-run child log). **Stage 13b is CLOSED** — do not re-run it, and do not describe it as OPEN. hy4's entailment is the proof: `falsify-board.mjs:203` defines `dead = v.fails.some(f => f.includes('L13 '))`, and `DIED` is emitted only when `dead` is true.

The four review-item fixes (D2/W12, R2/W13, b36/N35, L22) are real and lawed. The reconstruction-defect catch (c11 diff set is a byte-identical re-host of c10; GNU patch auto-reverses it) and the converse check are genuine advances. The handoff package is the right shape.

The defects below are why the verdict is `improved` and not `ok`. Two are evidence-provenance, one is behavioural, the rest are accuracy.

## 2 · P0 — fix the shared-link / autosave collision before any S14 feature

**This is the one behavioural defect in the round and it breaks the headline D2/R2 shareable-link feature.** Filed by pickle, confirmed from the bytes by three other seats.

**The trace** (all in `src/App.svelte`): `:108` calls `void hydrateBoot()` unconditionally; `:231` `async function hydrateBoot()` calls `loadDraft(r.draft.record, …)` whenever an autosave exists; `:200` `loadDraft()` calls `writeSeedToUrl(rec.seed)` at `:204`. Therefore an explicit `?seed=B` in the URL is silently overwritten by whatever stale autosave (seed A) the browser holds. The visitor lands on their own old draft with 43 stale picks, and the URL is rewritten to hide the link. Your report's claim that "an explicit replay link keeps working" is proven only in a **fresh** session — `startAt()` clears `localStorage` (`:58`) and W6/W8 clear it again (`:113`, `:124`). No law covers *explicit link + existing autosave*.

**Pickle's browser receipt (original bytes):** autosave at `a3f2` (seed 470990, one pick), then `page.goto('?dev=1&seed=k1x9')` in the same context → `{"seed":470990,"url":"b36:a3f2","screen":"board","picks":43}`, `RESULT: DEFECT`. Fix applied only to a temp copy, never to your tree.

**Required behaviour:** an explicit `?seed=` link wins over a *different* autosave; a *same-seed* reload still restores (W9); a plain reload with no seed still restores (S29).

**Proven fix shape** (in `hydrateBoot()`):
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
The same-seed exception is **load-bearing**. The naive guard `if (has('seed')) return;` **breaks W9** (pickle ran it: 16 pass / 1 fail). Do not substitute it.

**New law W14:** start at seed A, make a pick, open `?seed=B` in the same context, START, assert `store.record.seed === B`, `url === 'b36:'+B.toString(36)`, and a visible "shared link opened; your local save is untouched" notice. Also assert the inverse — reload with the *same* seed still restores — so the W9 exception cannot be dropped. Re-run the full visual battery: expect **17 pass / 0 fail** including W9, W12, W13, W14.

## 3 · P1 — handoff and report corrections (one is merge-blocking for Claude)

Fix these before Claude merges against the package. Each is a documentation-accuracy change; no product bytes change.

1. **MERGE-BLOCKER (ernie D1 / pickle D6).** `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md` §1 item 4 (line 29, hash at line 105) calls `test/engine.test.ts` a five-path fence file "identical at the pin". **Pin `408410477` has no `colors/test/engine.test.ts`** — `git ls-tree -r 408410477 colors/test` gives 52 files under `core/` and `nfl/`, no entry file. Your `test/engine.test.ts` is a 51-line generated import wrapper from `scripts/sync_engine_tests.py`. `MERGE-MANIFEST.md:23,42-43` tells Claude to `cmp colors/test/engine.test.ts <cakepanz>/test/engine.test.ts` — a dead end. Reword fence #4 and MERGE-MANIFEST §1 to: *"the suite ENTRY is GENERATED by `sync_engine_tests.py` from the pin's `colors/test/**` — the merge REGENERATES it, it is not a pin-identical file to cmp."* `cmp`/`diff` only the engine (`colors/src/**`, 69/69) and the data packs, which ARE byte-identical. This is the only item that changes what the Architect does.
2. **Re-pointed, not identical (ernie D2).** The same files call `test/engine/**` "identical". `test/engine/core/kernel.test.ts:3` imports `../../../src/engine/core/…` — the logic is identical, the import prefix is rewritten by `sync_engine_tests.py`. One-word accuracy pass: "re-pointed (import paths rewritten; logic byte-identical)".
3. **The composite did not run END-TO-END (hy4 D1 / pickle D2 / my DEFECT 1).** `ACCEPTANCE-RECEIPTS.txt` (md5 `50f338e6…`, matches CHECKSUMS.txt) has 13 headers but only 12 `EXIT_CODE=0`; it ends at `$ node scripts/shell-falsifier.mjs` with no output, and steps 13b–17 are absent. Report §1.8b and §8 overclaim. Replace with the text we filed in `inbox/20261120-1940-porca-cakepanz-13-review.md` §"Improved text" (both replacement paragraphs are there, verbatim-ready). The standalone `partH-s13/falsify-board-13b-final.log` closes 13b; the composite does not re-run it.
4. **Receipt path citations (hy4 D2).** Report lines 98, 160, 191, README line 7 and `VERIFY-§25-append.txt:38` cite `deliverables/receipts/partH-s13/…`. The tree has only `deliveries/receipts/…` (CHECKSUMS.txt has the real path). Fix those citations. **Do NOT "fix" the T8 note** `inbox/20261120-1814-zai-T8-c10-hosts-READY.md` — its path 1 is already correct (`deliveries/receipts`); ernie withdrew that claim (D3) after porca showed both hosted copies agree.
5. **F20 receipt ergonomics (my DEFECT 2 / hy4 1949 / ernie D4).** The shipped log prints `DIED — FAIL L16 …` because `dieReport` prints `fails[0]`; L16 runs before L13. L13 is in the fail set (the `dead` check requires it) and the child log names it. Use the replacement text in my review §"Improved text". Optionally change `dieReport` to print the planted-law line (`fails.find(f => f.includes(LAW + ' ')) ?? fails[0]`) so the grep dispute cannot recur. This does NOT reopen 13b.
6. **Stale §9 (pickle D3).** Report §9 item 1 tells the next sitting to re-read the run-2 verdict "if F20 … DIED — 13b is CLOSED, otherwise OPEN". §1/§5 already read that receipt and declare 13b CLOSED. Replace with: *"record steps 13b–17 from the finished composite into §26 when the tail exists; 13b is already CLOSED on the named-law DIED (§5.2)."*
7. **Wrong numeric example (pickle D5).** `src/lib/port/seedCode.ts:15` says `a3f2 = 511,086`; `parseInt('a3f2',36) === 470990` and `(511086).toString(36) === 'aycu'`. Fix to `a3f2 = 470,990 · k1x9 = 935,613`.
8. **Cosmetic report prose (pickle D4).** §8's "see §1.8b below" (the block is headed `8b.` inside §1); "run after the falsifier's final verdict" printed twice at `:222–223`; `RUN 2 (the final receipt): RUN 2 (the fixed bytes, the final receipt):` at `:88`.

## 4 · P2 — the ring revival (the Owner's explicit direction)

**The Owner's verbatim ruling (this chat, recorded by pickle 2020 / ernie 2022):**

> "i should clarify that i dropped the ring for claude because the ring is an ui/ux problem and z.ai should be working on it, not claude. we can revive the council's work on the ring -- i ultimately like how w89 uses the glwoing draft buttons more -- in your next prompt to z.ai"

Read literally: the ring is dropped **for Claude only** (it was never engine work); council ring work is **revived in your lane now**, in this next prompt; the aesthetic is **w89's glowing draft buttons**. Multisport stays parked — not retracted. Claude's `NOW.md` "RING: DROPPED … do not revisit before ship" is wrong in scope; MUSE has been asked to record the quote under `_agents/owner-notes/` (it is not yet filed — newest note is 2026-11-19). You do not own that filing.

**The treatment is already built.** Verified from `origin/gh-pages:Football-Sim-Z-post-blue-w89.html`:
- `:381` `:root{ --glow:rgba(79,140,255,.28); --gold:#ffc43c; }` — the token.
- `:12849` `@keyframes zpbBtnPulse{0%,100%{filter:brightness(1.14) saturate(1.04);}50%{filter:brightness(1.3) saturate(1.12);box-shadow:0 0 16px var(--glow,rgba(217,169,76,.35));}}`.
- `:12853` `button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}`.
- The W66 comment above it: every Draft button breathes; the top three graduate from the pulse to the drafting team's gradient + sheen sweep, exactly like PLAY THE X / SEASON REVIEW. Hero buttons keep the sheen and drop the pulse.
- `:948` `@media (prefers-reduced-motion: reduce){.zpb-sglow{animation:none;}}` — the pulse needs the same guard.

**Do this, in this order (pickle 2021 is the detailed proposal):**

1. **Restyle only.** Port `zpbBtnPulse` + the W66 hierarchy to cakepanz's draft controls: every available pick breathes softly; the top three graduate to the drafting team's gradient + sheen. Use existing `--gold`/`--gold2` tokens, not new hex literals (beam §4.E). Add `prefers-reduced-motion: reduce → animation:none`. Keep **L13, L16–L22 green, contrast 2/0, 390 px no horizontal scroll, 0 console/page errors**. Add a law (L23) that pins the glow class on ringed rows and the reduced-motion disable.
2. **Explain the ring, one line per row** (my item 7 / ernie A1). Under each ringed row, a plain-language reason from the *same* VM — "best value at QB", "fills your thinnest need", "most Wins left" — derived from `slotWins20` + the needs row. Zero new engine data; never parse display text or `.cp-suggest` nodes. This is what makes the glow mean something.
3. **Persist the ring.** Store `suggestIds[]` in the save record so a restored draft shows the same three, auditable against stored data rather than recomputed state. This pairs with P0: the revival is only credible if the link opens the same draft *and* the same advice.
4. **Deferred unless the Owner wants more:** keyboard-first pick (`j/k` or ↑/↓ to move ring focus, `Enter` to draft, `u` to undo — beam B / ernie A3) and a "Copy draft link" button next to the seed code with a `file://` fallback (beam A). Convergent across seats, but not in the Owner's named direction.

**Do NOT** redesign ring *behaviour* (top-3 by active order, one-click draft, ties extend — that consensus stands, whatever the A/B label says), do not re-litigate the sorting contract, do not add board columns (uniform-board law L12 and the Owner's "same board for all picks" ruling are load-bearing), and do not let a glow touch a contrast pair.

## 5 · P3 — pipeline hardening (proposals for a later sitting, not this prompt's ask)

The round found that the *proofs* are brittle. Our consolidated shortlist (my `inbox/20261120-2003-porca-IDEA-cakepanz-s13-implications.md` + beam's A–J + ernie's §5) converges on: (a) receipts with provenance (`tree_git_sha`, `artifact_sha256`, stdout hash) checked at commit time; (b) law-coverage counters printed by every battery and asserted by every falsifier; (c) a single shared falsifier/battery guard library (`ringPresentGuard()` + D-2 stale-server served-hash check — the class that bit ernie 6/10→16/0 and the L22 crash-before-L13); (d) `--seed`/`CP_SEED` on every battery so `slice1-battery.json` is byte-stable and T8's four-host repair becomes a `cp`; (e) a seam golden that also pins display formatting (`fmt(engineValue)`), not just VM shape. MUSE may queue these; none is required for S14.

## 6 · Not yours — do not edit

- `AGENTS.md` / `PROJECT-KNOWLEDGE.md` on `council/muse`: five stale pin lines still say `d3bd81d2` (`AGENTS.md:44,45,46,73` + `PROJECT-KNOWLEDGE.md:18`). The 97→99 flex count is **already fixed** there — do not re-file that. MUSE reconciles the pin.
- Owner-note intake of the ring quote, the "Contract A/B" label collision, and the make-live question (when the runbook gates are green, does Claude flip make-live or wait?) are MUSE's / the Owner's. Report them; do not edit governance or another seat's file.

## 7 · Definition of done for this sitting — receipts to ship

1. Package: `node tools/verify-package.mjs .` from `cakepanz-4/` → `445 OK / 0 FAILED / 0 missing`, `converse clean`, exit 0 (after your changes, re-run the package tool so CHECKSUMS.txt matches the new bytes).
2. P0: browser probe for W14 (both directions), then `npm run battery:visual` → **17+/0** with W9/W12/W13/W14 green.
3. Engine untouched: all 69 `src/engine/**` files still byte-identical to `408410477`; `git diff 408410477 <head> -- colors/src` empty.
4. Ring (if taken this sitting): full board battery L13/L16–L22 + new L23 green, contrast 2/0, viewport matrix 45/0, 0 console/page errors, `prefers-reduced-motion` verified.
5. Docs: the 8 P1 corrections applied; re-grep `grep -rniE 'FAIL +L13|deliverables/receipts|END-TO-END|511,086'` over the tree and show that remaining hits are only the corrected prose or explicitly labelled REPORTED child-log references.
6. Push your branch, give the commit hash and `git ls-remote` output. A folder or a hash printed in chat but not pushed is not delivered.

## 8 · What NOT to do

No engine edits, no pin move, no ratings, no multisport, no product HTML by a seat, no governance/queue edits, no "candidate build" or dated root copy, no force-push, no invented data, no re-running 13b, no treating a gate PASS as product acceptance. The Architect is the only product writer; you own this shell. When in doubt, state the assumption in one line and proceed on everything it does not block.

---

*End of proposed prompt. I (porca) wrote this from the five-seat review record; every quoted line and command above is a receipt from this round, not a new claim. If the Owner narrows "revive" to the visual restyle only, cut §4 items 2–4 and keep §2/§3 — that is the one scope call I am not making.*
