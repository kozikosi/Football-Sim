SPEAKER: porca | ROLE: advisor | TASK: rewrite my S14 prompt for Z.ai as a self-contained document, after reviewing every seat's draft | DATE: 2026-11-20T21:15Z
FOR: Owner / MUSE to relay to Z.ai. I do not send prompts to seats and assign nobody.
STATUS: **council prompt input, not accepted scope and not an Owner ruling.** Hand the block between the delimiters to Z.ai verbatim.
SUPERSEDES: my `inbox/20261120-2040-porca-PROMPT-zai-s14-continuation.md`. That draft carried a blocking false premise (§4 said the ring's behaviour was settled and this was "restyle only"). This version corrects it and is self-contained.
REVIEW-OF (all read fresh from their refs this session): beam `inbox/20261120-beam-council-help-prompt.md` · ernie `2005`, `2030`, `2100` · glyph `20261117-0433` · hy4 `2038` · pickle `2034`, `2041`, `2042`, `2045` · vl `20261117-1953` · porca `2040` (mine) · iceman `67-cakepanz-13-2026-11-20/ICEMAN-REVIEW-CONTINUATION.md` (read via pickle 2041 §3).

## Note to the Owner / MUSE (not part of the Z.ai prompt)

What I changed and why:
1. **Removed the false premise.** Contract B is a target, not shipped; the L13 oracle is tautological; the glow goes last. This came from pickle's `2034` erratum and `2042`/`2045`, verified against the S13 bytes. Three S14 drafts had it wrong. My own `2040` was one of them; this file supersedes it.
2. **Made it genuinely self-contained.** Every fact is stated in the document; nothing depends on another seat's filing. Where a file is named, it is named so Z.ai can re-check, not so it must go read a draft first. I also added a glossary (§13) that defines every code, because the source drafts assumed the reader knew D2/W12/L13/c12/T8/Contract A/B and dozens more.
2b. **Resolved a contradiction inherited by all four source drafts** (found by an independent read-only review and verified against the delivered bytes). They all say both "expose `rawSort` on `BoardRowVM`" and "all 69 engine files byte-identical." But `BoardRowVM` and `key()` are IN the frozen engine file `src/engine/sports/nfl/view/draftBoard.ts:19,53` — so `rawSort` cannot be added there without breaking the pin. §6.2–6.3 now route that field to the Architect as a §5 patch proposal and keep the shell fix pin-safe. The rows are already sorted by raw `key()` at `draftBoard.ts:54`; the shell's actual defect is the lossy **tie-extension** parse at `DraftBoard.svelte:76`. A second review caught a deeper coupling all drafts missed: you also cannot fix L13's oracle to read raw values while the component still parses display strings (it would fail on tie cases). The prompt now keeps oracle + component **paired** and files their corrected diff together with the engine proposal, rather than pretending either can be fixed alone.
3. **Added the delivery reality** that the older drafts (glyph/vl) carried and the newer ones dropped: Z.ai's normal route is a zip with a verified hash and a download link, not a sandbox path.
4. **Added an anti-citation-drift rule.** The round's recurring defect was line numbers and counts copied from peers (`:201` vs `:203`, four vs five pin lines). The prompt now says the bytes win over the prompt's numbers.
5. **Added a verbatim replacement paragraph** for the composite overclaim, so Z.ai does not have to open another seat's file to get the exact wording.
6. **Kept the genuine scope question explicit** rather than hiding it in a conditional: the Owner named the glow; the Contract B correctness work is correctness work, not a scope expansion.

=====================================================================
PROMPT FOR Z.AI — BEGIN
=====================================================================

# S14 WORK ORDER — 67 Cakepanz (67-cakepanz-14)

**Read the whole document before you touch a file.** It is self-contained: it does not assume you have read any earlier draft, any other seat's notes, or this round's chat. Every fact you need is stated here. Where a command or a line number is given, it is a pointer for you to re-check against the bytes you actually hold — **if a number in this document disagrees with the file, the file wins, and you should say so in your bulletin.** A step that depends on something you cannot see is not a step; tell the Owner what is missing. **Interpretation rule for this document:** where two passages appear to conflict, the more specific and later passage wins; if they cannot be reconciled, stop and ask rather than guessing — do not quietly pick one.

## 0 · Boot, prove the baseline, then read your own record

1. **Orient** as your own `START-OF-CHAT-ZAI.md` §2 says (it ships in the delivered tree): fetch, confirm which tree/zip you are holding, and read the current council docs from their live refs on `origin/council/muse` — not a stale local copy. macOS `/tmp` is a symlink; use a real `/private/var/folders/...` path for scratch files.
2. **Two trees, do not confuse them.** `colors/` on the Architect's branch `architect/engine-and-seats` is HIS tree (the single-sourced engine + the product). `cakepanz-4/` is the root folder inside the delivered S13 zip — that is YOUR tree, the one you edit. All relative paths below (except the explicit `colors/` ones) are inside `cakepanz-4/`.
3. **Your baseline is the S13 bytes at engine pin `408410477` (69 TypeScript files).** Prove it before anything else:
   - From your tree root: `node tools/verify-package.mjs .` → `445 OK / 0 FAILED / 0 missing (445 entries)` plus `converse clean — the tree carries no unlisted file`, exit 0.
   - `git archive 408410477 colors/src` versus your `src/engine` → 69 files each, `diff -rq` clean.
   - `git diff 408410477 architect/engine-and-seats -- colors/src` → **0 bytes** (fetch that branch read-only; do not check it out or edit it). The engine is already byte-current; there is no engine re-sync to do.
   - If any of these fails, **STOP** and report. Do not build on an unproven tree.
4. **Read your own shipped record** (all inside your tree): `deliverables/sitting-report-s13-2026-11-20.md`, `ACCEPTANCE-RECEIPTS.txt`, `CHECKSUMS.txt`, `SLICE-STATUS-2026-11-20.md`, `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md`, `MERGE-MANIFEST.md`.
5. **Do NOT re-run the 13b falsifier.** It is CLOSED (§3). Read the receipts.

## 1 · Where we are, in one paragraph

The product is **76 Pancakes** (Owner, final). The framework is **Svelte 5 + Vite**. Claude (Architect) owns the engine and `colors/` and is the only writer of `Football-Sim-*.html`. You own the `67-cakepanz/` UI shell and the **S14 package/handoff** (build the zip, hash it, document it). You do **not** make a site live: the gh-pages make-live step belongs to the Owner/Beam. Multisport is **parked** — "OWNER FINAL: ship 76 Pancakes" stands. Your S13 delivery was reviewed by five seats; the verdict is **improved**: the engineering is real, the receipts reproduce, and the remaining work is one behavioural defect, a set of receipt-accuracy defects, and a ring correctness gap. On the last council record the deployed gh-pages `67-cakepanz/` was an earlier slice set (slices 1–2); the S14 package closes that gap. Verify the live state if you need it, report it as `REPORTED`, and do not assert it as a fact you own.

## 2 · What the council found in S13 — do not redo the engineering

Five seats independently reproduced all of this. Treat it as established:
- Package integrity **445 OK / 0 FAILED / 0 missing**, converse clean, exit 0.
- Engine **430/430** · node **35/35** · board **16/0** · slot **28/0** · visual **17/0** · shell **48/0** · slice **29/0/10/3** · contrast **2/0** · viewport **45/0** · golden seam **MATCH** (`e8fed8ab7ca1493b7dd20298fa2e85947188bed7ecc1d6f865b187ead1e024e8`). A clean rebuild reproduces `index-CoyTk5bV.css` / `index-Bymoqk0d.js`.
- The four prior-round fixes are real and lawed: **D2/W12, R2/W13, b36/N35, L22**.
- The converse check is live and proven with the planted-extra fixture. The c11 "diff" re-host defect (a byte-identical re-host of c10 that GNU patch auto-reverses) and its reconstruction recipe are documented in the sitting report and the handoff snapshot named in §0.4. The handoff package has the right shape.

Five seats reviewed S13 (four filed full gate re-runs, one filed the behavioural-probe fix); three of them also filed second-order reviews of their peers' reviews. They converged on the remaining list below. There is no dissent on substance.

## 3 · Settled facts — do not reopen (the ring is NOT one of them; see §6)

- **13b is CLOSED, double-sourced.** The classifier at `scripts/falsify-board.mjs:203` is `dead = v.fails.some(f => f.includes('L13 '))`, and the printer at `:90` emits `DIED` only when that is true. The final log's F20 line reads `DIED — FAIL L16` only because `dieReport` prints `fails[0]` and L16 runs before L13; L13 is in the failure set, which is why the case died. The byte-identical F20 child log is at `origin/council/hy4:_agents/hy4/evidence/f20-child-log-4671.log` (sha256 `67c0fd387721f322c717a6bc34187b5c6d63c4b13bb9cdcb65757eef9cd7cb05`); the independent re-run of all nine cases is at `origin/council/ernie:_agents/ernie/deliveries/ernie-s13-13b-rerun-receipt-2026-11-20/` (README plus ports 4665–4673). **Do not re-run it. Do file child logs with future falsifier runs.**
- **The T8 READY note's path is already correct** — `deliveries/receipts/slice1-battery.json` at line 9 of `20261120-1814-zai-T8-c10-hosts-READY.md`. An earlier claim that it said `deliverables/` was withdrawn by the reviewer who made it (see `origin/council/pickle:inbox/20261120-2034-pickle-ERRATUM-contractB-ring-law.md` for the correction practice). **Do not "fix" it.** The 48/1 versus 49/49 tension on one host is a prepared-restore versus slice-repair distinction for the Owner/Beam, not your task.
- **T8 is READY, not blocked.** The repair file is 6,418 B, md5 `0a2869538a706e7e6ea864664b7e5c9f`. Copy the pinned bytes — never regenerate them, because `slice1-battery.json` is run-variant and a regenerated receipt cannot satisfy a pinned md5.
- **The five-voice Contract B label is correct.** Do not re-litigate Contract A versus B. B is the *target* (§6); what was wrong was the claim that it had already shipped.
- **Multisport parked is final.** No plan-M reviews, no sport-two pick, no council wait.

## 4 · P0 — fix the behavioural defect before any S14 feature

**The shareable-link / autosave collision** breaks the headline shareable-link feature. It is the only behavioural defect in the round and was confirmed from the bytes by four seats.

**Trace** (all in `src/App.svelte`):
- `:108` calls `void hydrateBoot()` unconditionally on boot.
- `:231` `async function hydrateBoot()` calls `loadDraft(...)` whenever an autosave exists.
- `:200` `loadDraft()` calls `writeSeedToUrl(rec.seed)` at `:204`.

So an explicit `?seed=B` in a shared link is silently overwritten by a stale autosave (seed A). The visitor lands on their own old draft with 43 stale picks and the URL is rewritten to hide the link. W12/W13 prove "URL seed equals store seed" only in a **fresh** session (`startAt()` clears localStorage at `:58`; W6/W8 clear it again at `:113`, `:124`). **No law covers "explicit link + existing autosave."**

**Reproduction already on record:** with an autosave at `a3f2` (seed `470990`, one pick), opening `?dev=1&seed=k1x9` in the same browser context produced `{"seed":470990,"url":"b36:a3f2","screen":"board","picks":43}`, zero page errors — `RESULT: DEFECT`. The correct seed `k1x9` is `935613`.

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

The **same-seed exception is load-bearing.** The naive `if (has('seed')) return;` **breaks W9** (measured: 16 pass / 1 fail). Do not substitute it.

**New law W14:** start at seed A, make a pick, open `?seed=B` in the same context, START, assert `store.record.seed === B`, `url === 'b36:'+B.toString(36)`, and the visible "shared link opened; your local save is untouched" notice. **Also assert the inverse** — a reload with the same seed still restores (the existing S29 law) — so the W9 exception cannot be dropped. Prove it in a real browser, then re-run the full visual battery and report the 17 existing laws green plus W14 (state the exact count you observe) with W9, W12, W13, W14 green. Falsify W14 by name with a filed child log.

## 5 · P1 — handoff, receipt and tooling accuracy (no product bytes change)

One of these changes what Claude does at the merge. Do them all before the handoff.

1. **MERGE-BLOCKER — the test entry is generated, not pin-identical.** `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md` §1 item 4 (line 29, hash at line 105) calls `test/engine.test.ts` a pin-identical fence file. **Pin `408410477` has no `colors/test/engine.test.ts`** — `git ls-tree -r 408410477 colors/test` gives 52 files under `core/` and `nfl/`, no entry file. Your `test/engine.test.ts` is a 51-line generated import wrapper from `scripts/sync_engine_tests.py`. `MERGE-MANIFEST.md:23,42-43` tells Claude to `cmp` it — a dead end. Reword fence #4 and MERGE-MANIFEST §1 to: *"the suite ENTRY is GENERATED by `sync_engine_tests.py` from the pin's `colors/test/**`; the merge REGENERATES it — it is not a pin-identical file to compare."* Compare only `colors/src/**` (69/69) and the frozen data packs under `data/`, which are byte-identical.
2. **Re-pointed, not identical.** The same files call `test/engine/**` "byte-identical". `test/engine/core/kernel.test.ts:3` imports `../../../src/engine/core/…`. Say "re-pointed (import paths rewritten; logic byte-identical)".
3. **The composite did not run END-TO-END.** `ACCEPTANCE-RECEIPTS.txt` (md5 `50f338e6…`, matching CHECKSUMS.txt) has 13 headers but only 12 `EXIT_CODE=0`; it ends at `$ node scripts/shell-falsifier.mjs` with no output, and steps 13b–17 are absent. Report §1.8 and §9 are correct ("still running at packaging time"); §1.8b and §8 overclaim. Replace the latter with this exact text:

   > the composite was cut at step 13; steps 1–12 carry `EXIT_CODE=0`; the 13b verdict is the standalone `deliveries/receipts/partH-s13/falsify-board-13b-final.log` (ALL NINE CASES DIED, `FALSIFIER EXIT: 0`); file steps 13b–17 into VERIFY §26 when the tail exists.

   The standalone log closes 13b; the composite does not re-run it.
4. **Receipt path citations.** In `deliverables/sitting-report-s13-2026-11-20.md`, lines 98/160/191, plus README:7 and `VERIFY-§25-append.txt:38`, cite `deliverables/receipts/partH-s13/…`. The tree has only `deliveries/receipts/…` (CHECKSUMS.txt carries the real path). Fix those citations. This is a different file from the correct T8 note — do not conflate them.
5. **F20 receipt ergonomics.** The shipped log prints `DIED — FAIL L16 …` because `dieReport` prints `fails[0]`; L13 is in the fail set and the child log names it. Optionally change `dieReport` to print the planted-law line (`fails.find(f => f.includes(LAW + ' ')) ?? fails[0]`) so the grep dispute cannot recur. **Cosmetic — do not re-run 13b.**
6. **Stale §9.** Report §9 item 1 tells the next sitting to re-read the run-2 verdict ("if F20 … DIED — 13b is CLOSED, otherwise OPEN"). §1/§5 already declared it CLOSED. Replace with: *"record steps 13b–17 from the finished composite into §26 when the tail exists; 13b is already CLOSED on the named-law DIED (§5.2)."*
7. **Broken cross-reference and duplicated prose.** §8's "see §1.8b below" points at a block headed `8b.` inside §1; "run after the falsifier's final verdict" is printed twice at `:222–223`; `:88` reads `RUN 2 (the final receipt): RUN 2 (the fixed bytes, the final receipt):`. Fix all three.
8. **Wrong numeric example.** `src/lib/port/seedCode.ts:15` says `a3f2 = 511,086`. Actually `parseInt('a3f2',36) === 470990` and `(511086).toString(36) === 'aycu'`. Correct to `a3f2 = 470,990 · k1x9 = 935,613`.
9. **Verifier SKIP set.** `tools/verify-package.mjs:47` skips only `{CHECKSUMS.txt, PACKAGE-DELIVERY-RECEIPT.txt}`. Add `node_modules/` and `src/engine-node/` so a built tree does not trip the converse check with spurious EXTRA files (one seat generated a 70-file `src/engine-node/` merely by running the engine suite inside a mirror).
10. **Stale-server guard in standalone batteries.** The falsifier has the served-hash check; standalone batteries trust `CP_PORT`. One seat saw 6/10 turn into 16/0 after a stale preview server on `:4179`. Port the served-hash readiness guard from `scripts/falsify-board.mjs` into the standalone battery scripts under `batteries/`.
11. **Battery hygiene.** Extract one `ringPresentGuard()` helper in the board battery and have every ring-dependent law (L16, L17, L18, L19, L22) call it — each new law reintroduced its own unguarded `.cp-suggest` locator and the crash-before-L13 class. Consider asserting `history.replaceState` call counts in W12/W13 so a double-write is caught.

After edits, prove the cleanup with:

```
grep -rniE 'FAIL +L13|deliverables/receipts|END-TO-END|511,086|engine.test.ts' <tree>
```

Show that remaining hits are corrected prose or explicitly labelled REPORTED child-log references.

## 6 · P2 — the ring revival (corrected order; the glow is LAST)

### 6.1 The Owner's word, verbatim

> "i should clarify that i dropped the ring for claude because the ring is an ui/ux problem and z.ai should be working on it, not claude. we can revive the council's work on the ring -- i ultimately like how w89 uses the glwoing draft buttons more -- in your next prompt to z.ai"

Read literally: the ring was dropped **for Claude only** — it was never engine work. The council's ring work is **revived and it is yours**. The visual target is **w89's glowing draft buttons**. Multisport stays parked. Claude's `NOW.md` line "RING: DROPPED … Do not revisit before ship" is right for his lane and wrong in scope; that is his file — report it, do not edit it.

### 6.2 Critical correction — the behaviour consensus is a TARGET, not a shipped fact

Earlier notes (including three filed S14 prompts) said "the five-voice Contract B consensus stands; do not change ring behaviour; this is a restyle only." **That inference is false**, and it changes the order of work. Contract B is the right thing to *build*; it is not a description of S13.

Verified from the S13 bytes — re-check these yourself:

```
grep -n "No ring work" deliverables/sitting-report-s13-2026-11-20.md        # :168 "No ring work, no multisport, no Contract B"
grep -n "rawSort\|suggestions" src/engine/sports/nfl/view/draftBoard.ts     # no matches
grep -n "replace(/\[^0-9" src/lib/components/DraftBoard.svelte              # :76 lossy display parse
sed -n '60,70p' batteries/board.battery.mjs                                # vmVals(): same lossy parse
sed -n '275,295p' batteries/board.battery.mjs                              # L13 expected from vmVals()
grep -rn -i "display.parse\|no.*parse\|lossy" batteries/                   # no no-display-parse law
```

Precisely stated: **L13's oracle is the same lossy display parse the component uses.** It therefore certifies the *display-rounded* ordering, not the raw ordering. On the clean S13 build this is not hypothetical: the mutant's F20 child log records `expected 60` at pick 27, meaning the clean build rings **all 60 remaining rows** and L13 still passes because the oracle expects 60. Conversely, a *correct* raw-value implementation can FAIL L13 when rounded display values tie differently. The law must change with the component.

The five voices on Contract B are real (Beam, PORCA, HY4ORCA, ORCATIDE and an earlier pickle voice; `suggestions` deferred). **Do not re-litigate A versus B.** Contract B means: `rawSort: number` on `BoardRowVM`, sourced from the engine's `key()` — the raw numeric order key the view currently discards — with the shell ranking on `r.rawSort`.

**A pin boundary you must respect (this is the one place the council drafts disagreed with the bytes).** `BoardRowVM` and `key()` are defined in `src/engine/sports/nfl/view/draftBoard.ts` — a **frozen engine file** (one of the 69 pinned at `408410477`). You therefore **cannot** add `rawSort` to `BoardRowVM` yourself: `git diff 408410477 -- src/engine` must stay empty, and §0 requires all 69 files byte-identical. Two actions follow, and you do both:
- **In the engine (Claude's file, your proposal):** file an exact §5 patch proposal in your inbox for the Architect to apply — WHERE (anchor `export interface BoardRowVM {` in `draftBoard.ts`), old → new (add `rawSort: number` to the interface; in `boardVM()` set it from `key()` for each row before the `_w`/`_p` strip at `:61`), WHY, SAFE ALONE?, HOW TO CHECK. Do **not** edit `colors/` or your `src/engine/**`. The Architect integrates it into the pin and the next snapshot consumes it; say plainly that Contract B's engine half is **BLOCKED on the Architect** until then.
- **In the shell (your file, do it now):** note that `boardVM()` already sorts rows by raw `key()` at `draftBoard.ts:54` and returns them in that order, but strips the `_w`/`_p` numeric fields at `:61` — so the shell receives correct *order* but no raw *values*. The shell's real defect is at `DraftBoard.svelte:76`: `const val = ... Number(String(x[vm.sort]).replace(/[^0-9.\-]/g, ''))` re-parses the **rendered display string** to decide which rows tie with the third. Since display strings round, that tie decision is the part that can go wrong. Do this pin-safe split: (i) select the **primary top three by array position** in the already-sorted `rows` (no text parse at all) — this is a full, correct fix you can land now; (ii) the **tie extension past three** genuinely needs the raw value, so make it consume `rawSort` when the Architect lands it, and until then leave the tie extension unchanged but labelled `INTERIM — display-rounded, awaiting rawSort` in the receipt and the handoff doc. Do not claim the tie path is fixed before `rawSort` exists, and do not write a no-display-parse law that your own interim path violates — scope that law to the primary ordering now and add the tie extension to it when `rawSort` lands. Keep the intended behaviour: top three by active order, one-click draft, ties extend past three only on a genuine raw-order tie.

### 6.3 Do this in this order

1. **Land the Contract B shell half now; file the engine half as a §5 proposal.** Do the split described above. Do not silently edit a frozen engine file, and do not claim Contract B is fully landed while its `rawSort` field is still blocked on the Architect — label it `BLOCKED (engine half)` in your bulletin and in the handoff doc.
2. **Fix L13's oracle — but only together with the component, so the law and the tree cannot contradict each other.** L13's oracle and the tie-extension code must change **in the same commit**: until `rawSort` lands, keep BOTH the component's tie parse and the oracle's expected-value derivation as they are (green today), and label L13 with the same string as the tie path: `INTERIM — display-rounded, awaiting rawSort` (use this exact string in every place). In that same §5 proposal you file for the engine change, include the **exact paired diff** for (a) `batteries/board.battery.mjs` L13's `expected` to derive from the raw value independently, and (b) the component's tie extension to consume `rawSort`. When — and only when — the Architect lands `rawSort` and you apply both halves together, falsify the corrected L13 by name: a mutant that restores the display parse must make **L13 DIE** with a child log filed. **Never ship a raw-valued oracle against a display-valued component** — that is the exact mismatch that makes L13 fail on tie cases, and it would fail your own tree. This is why items 1 and 2 are one coupled unit, not two independent fixes.
3. **Add the no-display-parse law — scope it to the primary ordering now.** The council proposed "no ring code may derive ordering from rendered text or `.cp-suggest` DOM nodes"; that is the right end state, but your INTERIM tie path (6.2) still reads rounded display text, so a blanket law would fail your own build. Land it now as **"the primary top-three selection derives order only from the VM's raw sort field or the pre-sorted row order — never from rendered text or `.cp-suggest` nodes."** Falsify that named law by name. When the Architect's `rawSort` lands and you remove the interim display parse, widen the law to the blanket wording and re-falsify it. Do not write a law your own tree violates.
4. **Then, and only then, port the w89 glow.** Verified bytes from `origin/gh-pages:Football-Sim-Z-post-blue-w89.html`:
   - `:381` `:root{ --glow:rgba(79,140,255,.28); --gold:#ffc43c; }`
   - `:12849` `@keyframes zpbBtnPulse{0%,100%{filter:brightness(1.14) saturate(1.04);}50%{filter:brightness(1.3) saturate(1.12);box-shadow:0 0 16px var(--glow,rgba(217,169,76,.35));}}`
   - `:12853` `button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}`
   - The W66 comment above it: *every Draft button breathes (the top-3 law goes site-wide); the top three graduate from the pulse to the progression treatment — filled in the drafting team's gradient with the sheen sweep, exactly like PLAY THE X / SEASON REVIEW; hero buttons keep the sheen and drop the pulse.*
   - `:948` `@media (prefers-reduced-motion: reduce){.zpb-sglow{animation:none;}}` — the pulse needs the same guard.
   - A second treatment also exists in w89: `.zpb-sglow{color:#ffc43c;...}` with `zpbstarglow` text-shadow keyframes. `#ffc43c` is exactly the value of w89's `--gold` token; **in your shell write that colour as the existing `--gold`/`--gold2` custom property, not a new hex literal** — locate it in your tree with `grep -rn -- '--gold' src/`. Reconcile both treatments against the actual bytes and use what is really there; do not invent a third. The glow effect itself is box-shadow/text-shadow; a text-colour change is allowed only if the rendered pair still passes contrast — **re-run contrast and keep it 2/0 after porting.** Keep **390 px no horizontal scroll**, **0 console/page errors**, and **L13 (on the interim paired oracle), L16–L22 green**.
5. **Add L23**, pinning the w89 pulse/glow class you actually ported (the `zpbBtnPulse` animation on the one-click Draft buttons, plus the `prefers-reduced-motion` disable from `:948`) on ringed buttons. Falsify L23 by name.
6. **Explain the ring — one plain line per ringed row.** Inside the existing row, add a short reason from the *same* VM — "best value at {slot}", "fills your thinnest need", "most Wins left" — derived from `slotWins20` plus the needs row (the `NeedsRow` of open slots above the board, component `src/lib/components/NeedsRow.svelte`). This is a text line in the row you already render, **not a new board column** — uniform-board law L12 and the "same board for all picks" ruling still hold. Zero new engine data; never parse display text or `.cp-suggest` nodes. This is what makes the glow mean something.
7. **Persist the ring.** Store `suggestIds[]` in the save record so a restored draft shows the same three, auditable against stored data rather than recomputed state. This pairs with P0: the revival is credible only if the link opens the same draft *and* the same advice.

### 6.4 Deferred unless the Owner widens "revive"

Keyboard-first pick (`j`/`k` or ↑/↓ to move focus, `Enter` to draft, `u` to undo) and a "Copy draft link" button with a `file://` fallback are convergent across seats but not in the Owner's named direction. They appear again as P3 ideas in §7; that list is **not this sitting's scope** — do not execute P3 items unless the Owner widens the ask.

**If the Owner narrows "revive" to the visual glow alone, say so explicitly in your bulletin and leave items 6.3.1–6.3.3 filed as named OPEN work. Do not silently pass a tautological law.**

### 6.5 Do not

Redesign ring behaviour beyond Contract B; re-litigate A versus B; add board columns (uniform-board law L12 and the Owner's "same board for all picks" ruling are load-bearing); let a glow degrade a contrast pair (a token-colour change is fine only if contrast still passes 2/0 — see 6.3.4); or edit `colors/` or `src/engine/**` for any of this. The one exception to "do not touch the engine" is the §5 *proposal* (text in your inbox), never an edit.

## 7 · P3 — if there is room after P0–P2 (input, not scope)

Choose a small set; receipt each with a named law. The consolidated shortlist:
1. **Seam golden as a standing cross-tree canary:** publish the canonical seam golden JSON (the fixture whose hash is `e8fed8ab…`, shipped in your tree under `deliveries/` — find it with `grep -rln e8fed8ab deliveries/`) as a test in Claude's `colors/` suite so every engine commit asserts its own output — the first gate of cutover. (That test file is Claude's; you supply the golden.)
2. **Two-tree diff harness:** a `TREE_ROOT` env var so the same law suite runs against cakepanz and `colors/`, emitting a side-by-side pass table.
3. **Copy-draft-link with a pin stamp:** `?seed=b36:…&pin=408410477`; on mismatch show "this draft was built on engine X; current engine is Y — results may differ" instead of replaying silently.
4. **State-based one-shot latch** keyed on staged `(id, slot)` instead of the 380 ms `confirmPick()` timer.
5. **Empty/error/stale-save states** for every screen, with the stale-save state comparing the record's engine pin to the current pin.
6. **Theme tokens, not hex:** move `DraftBoard.svelte .cp-go` colours (`#c9a24b`/`#b3766a`/`#2c1e0c`) to `--gold`/`--gold2`.
7. **Feed OT game-ball row** — one row, one source, keeping regulation/OT separation.
8. **Offline-first law:** fail on any `request` event across a full draft+season run of `dist/single.html` from `file://`.
9. **Content-addressed delivery:** `recipe.json` (parent delivery hashes + operations) plus `reconstruct.mjs`, verified against CHECKSUMS.txt.
10. **Receipts with provenance:** `tree_git_sha`, `artifact_sha256`, stdout hash, checked at commit time; law-coverage counters printed by every battery and asserted by every falsifier; one shared guard library used by batteries and falsifiers alike; `--seed`/`CP_SEED` on every battery so receipts are byte-stable; a seam golden that also pins display formatting (`fmt(engineValue)`).

MUSE may queue these. None is required for S14.

## 8 · Proof standard (non-negotiable)

- Every change: **target build + sha256 · WHERE (anchor string, not a line number) · old → new · WHY · SAFE ALONE? · HOW TO CHECK (command + expected output)**. A patch or applier must fail loudly on an anchor mismatch.
- Every new behaviour gets a **named law**; every named law is **falsified by name** — a mutant kills it, the receipt names it, and the child log is filed.
- Label every claim **VERIFIED / REPORTED / INFERRED / UNKNOWN**. "I believe it works" is not a receipt. No before/after outcomes from unseeded runs.
- No factual data invented, estimated or silently corrected (`AGENTS.md` §7). The `a3f2` value in §5.8 is a comment fix, not a data change.
- **The bytes win over this document.** Re-read every cited line, count and hash before relying on it; report any disagreement instead of silently adjusting the evidence to fit the prompt.
- Re-run the full gate set at your **final bytes**: engine 430/430 · node 35/35 (+W14) · board 16/0 (+ the scoped no-display-parse law and L23; L13 green on the **interim paired oracle**, its corrected paired version filed in the §5 proposal) · visual 17 existing laws green + W14 (report the exact count you observe, e.g. 18/0) · slot 28/0 · shell 48/0 · slice 29/0/10/3 · contrast 2/0 · viewport 45/0 · golden MATCH · both gates PASS/CLEAN · falsifiers by name with child logs.

## 9 · Governance — report, do not edit

- The live pin is `408410477`. Five stale lines still say `d3bd81d2`: `origin/council/muse:AGENTS.md` **44, 45, 46, 73** and `PROJECT-KNOWLEDGE.md` **18**. The flex-count wording there has been corrected to 99 (it had read 97; an earlier deployed-tree patch also carried 107 — all are the same fix landing in different files). **Do not re-file it and do not change any flex number yourself** — flex is protected. MUSE owns these files.
- No verbatim Owner note exists under `_agents/owner-notes/` on `council/muse`. MUSE must intake the §6.1 quote into the intake ledger (`_agents/V23-OWNER-NOTES-INTAKE-LEDGER.md`). Report the gap; do not edit it.
- The Architect's `NOW.md` (in his `architect/engine-and-seats` tree, branch ref `architect/engine-and-seats:NOW.md`) has three staleness lines: one says React stays listed until cutover while another says removed; one says re-sync the snapshot to `colors/src` head while the diff is 0 bytes; one is the ring scope in §6.1. Name them in your bulletin; that file is his.
- A gh-pages re-point patch exists (tests-only import paths; the flex count in that patch reads 99) but is not applied to the deployed tree. Applying it is a deploy step for the Owner/Beam. Do not force-push; the prior tip is the rollback.

## 10 · Definition of done / delivery

1. `node tools/verify-package.mjs .` from your tree root → 445+ OK / 0 FAILED / 0 missing, converse clean, exit 0, after regenerating CHECKSUMS.txt for the new bytes.
2. P0: real-browser W14 probe in both directions, then the full visual battery with W9/W12/W13/W14 green.
3. P2: Contract B **shell half** landed with the pin-safe primary-order fix; tie extension and L13 oracle both labelled `INTERIM — display-rounded, awaiting rawSort` and left paired (not claimed fixed); engine half **and the paired L13/component corrected diff** filed as a §5 proposal and labelled `BLOCKED (engine half)`; the scoped no-display-parse law and L23 falsified by name with child logs; glow green against contrast 2/0 and 390 px.
4. Engine untouched: all 69 `src/engine/**` files still byte-identical to `408410477`; `git diff 408410477 -- src/engine` empty, and `git diff 408410477 architect/engine-and-seats -- colors/src` empty.
5. All P1 corrections applied and the cleanup grep shown.
6. Regenerate CHECKSUMS.txt, MANIFEST.txt, SNAPSHOT.md, SHELL-STATUS.md, VERIFY §26, the README S14 banner, and `START-OF-CHAT-ZAI.md` §2. Write one bulletin entry with the tree hash and the exact commands you ran.
7. Produce `67-cakepanz-14-<date>.zip` (full tree at the pin plus paperwork). **Deliver it the way your environment supports:** hand the Owner a download link and the zip's sha256 — a sandbox path alone is not delivery. If you have push credentials for `council/zai`, also push and quote `git ls-remote`. Give network git commands a 60 s stall limit and at most two attempts; if they fail, say so and give the exact numbered steps instead of hanging.
8. State plainly what you did NOT do. **Do not make-live** — the Owner/Beam execute that step. Do not force-push, do not stash, do not create a "merged"/"final"/dated copy in the root.

## 11 · One scope question I cannot answer for you

The Owner named the **glow**. He did not say whether "revive the ring" also includes the Contract B correctness work or only the visual restyle. Treat items 6.3.1–6.3.3 as correctness work and keep them filed either way; do the glow as named. If the Owner narrows the scope, follow §6.4. Do not stop the whole sitting waiting for this answer — proceed on everything it does not block, state the assumption in one line, and flag the question in your bulletin.

## 12 · Explicitly NOT in scope

Engine edits, pin moves, ratings, second sport, product HTML by a seat, governance or queue edits, "candidate build" or dated root copies, force-push, invented data, re-running 13b, "fixing" the T8 note path, re-litigating A versus B, make-live, the post-Colors plan (parked until Colors ships), and treating a gate PASS as product acceptance. The Architect is the only product writer; you own this shell.

## 13 · Glossary (so this document needs no other source)

- **Seats / trees:** "Architect" = Claude, sole writer of the product and owner of `colors/`. "You" = Z.ai, owner of the `67-cakepanz/` shell. **cakepanz-4** = the folder inside your S13 zip; all shell paths are relative to it. **pin `408410477`** = the frozen engine snapshot your shell consumes. **cutover** = the one deliberate merge of Claude's engine tree and the completed Colors v1 product, done by the Architect when Colors v1 is fully functioning; not by a seat.
- **Named reviews/laws:** the paired IDs **D2/W12, R2/W13, b36/N35, L22** are the four fixes that shipped in S13 (each is a review finding paired with the battery law that landed it); **W12/W13** are the URL↔store-seed laws, **W6/W8/W9** earlier autosave/restore laws. **W14** = the new shareable-link law you add here; **S29** = the existing law that a reload with the same seed still restores the autosave. **L12** = uniform-board law (same board for all picks); **L13** = the top-three ring law; **L16–L22** = the existing ring-dependent laws; **L23** = the new glow law. A "law" is a named assertion in the board/visual battery; "falsify law X by name" means a mutant must make that named law fail and the receipt must name it.
- **Rounds/IDs:** c10, c11, c12, S13, S14 = successive council review rounds and the cakepanz sitting numbers (S13 = the sitting just shipped; S14 = this work order). **T8** = the four-host slice-battery repair; its READY note and repair file are named in §3. **F20** = the falsifier case whose child log closed 13b; **13b** = the board-falsifier dispute, CLOSED. **c12/S13 deploy** = the earlier deployment that was planned to bring the live site up to S13 slices; whether it actually went live is a deploy/Owner matter you neither own nor assert. Your S14 job is the package, not make-live.
- **Contracts/targets:** **Contract A** = an earlier, withdrawn ring proposal that added a `suggestions` field to the VM. **Contract B** = the agreed target: raw numeric sort on the VM, `suggestions` deferred (§6.2). **rawSort** = that raw order key. **W89** = the latest Z-post-blue single-file build (`Football-Sim-Z-post-blue-w89.html` on `origin/gh-pages`) whose glowing draft buttons are the ring's visual target; **W66** = the earlier wave whose comment describes the glow treatment. **slotWins20** = the engine's measured Wins impact per slot (the source for plain-language ring reasons).
- **Receipts:** **gates PASS/CLEAN** = `npm run distfile` (the build gate that writes `dist/` and checks it) passes and `node tools/verify-package.mjs .` reports converse clean. **golden seam MATCH** = the shell's engine-facing view matches the canonical seam hash `e8fed8ab…`. **"§5 patch proposal"** means the exact-change form defined in `AGENTS.md` §5 of the council rules (target + sha · WHERE anchor · old→new · WHY · SAFE ALONE? · HOW TO CHECK), filed as a file in your own `inbox/` — **not** §5 of this document (which is the P1 handoff list) and not an edit to another seat's tree.

=====================================================================
PROMPT FOR Z.AI — END
=====================================================================

— porca (advisor). This is a rewrite of my own `2040` prompt after reviewing every seat's draft. Every fact in it came from a receipt filed in this round; where a number came from another seat's machine it is stated as such or is presented as a pointer to re-check. No product, engine, pin, governance or other seat's file was edited to produce it.
