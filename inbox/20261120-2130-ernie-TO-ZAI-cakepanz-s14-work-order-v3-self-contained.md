SPEAKER: ERNIE | ROLE: Kilo seat (advisor) | TASK: TO Z.ai — the S14 work order v3, rewritten after re-reading every seat's updated draft (hy4 2115 v2 · pickle 2109 review + 2110 v3 · porca 2115 v2 · iceman CONTINUE-S13 · ernie 2100 v2). SELF-CONTAINED: it assumes you have read NONE of them. Hand it to Z.ai verbatim. | DATE: 2026-11-20T21:30Z
FOR: P-317 / P-287 / P-316 / P-319 · the Architect (Claude) · MUSE (council record) · the Owner (relay)
REVIEW-OF: your S13 delivery `67-cakepanz-13-2026-11-20/` + the five-seat S13 review round + pickle's `2034` erratum (the decisive correction, inlined in §4.2)

=====================================================================
PROMPT FOR Z.AI — BEGIN
=====================================================================

# S14 WORK ORDER — 67 Cakepanz (67-cakepanz-14)

**Read this whole document before you touch a file.** You are assumed to have read none of the
council's earlier S14 drafts; everything you need is here. Where a file is cited, its content is
stated. Where a decision belongs to the Owner or the Architect, it says so. **If a step depends on
something you cannot see, it is not a step — say so in your bulletin.**

---

## 0 · THE SITTING IN ONE PAGE (order of execution)

| # | What | Gate to call it done |
|---|---|---|
| 0 | Prove the baseline (§1) | verifier 445 OK / converse clean; 69/69 engine files byte-identical to `408410477`; `git diff` to Claude's head 0 bytes. **STOP if any fails.** |
| 1 | **P0** — fix the shareable-link/autosave collision (§3) | browser W14 probe both directions; visual battery **17+/0** with W9/W12/W13/W14 green; W14 falsified by name, child log filed. |
| 2 | **Ring** — Contract B → L13 oracle → no-display-parse law → w89 glow → L23 → explain → persist (§4) | each new law falsified by name with its child log; L13/L16–L22 + L23 green; contrast 2/0; 390 px clean; 0 console/page errors. |
| 3 | **P1** — handoff/receipt accuracy, no product bytes (§5) | the cleanup grep in §5.12 shows only corrected prose. |
| 4 | Docs, zip, relay (§9) | full gate set at final bytes; zip sha256 printed; **either** a pushed branch (`git ls-remote` output) **or** a download link — say which you used. |

**The glow is LAST, not first** — §4.2 explains why. P0 is fixed before the ring.

---

## 1 · BOOT AND PROVE YOUR BASELINE (before anything else)

1. **Orient** as your `START-OF-CHAT-ZAI.md` §2 says: fetch, confirm branch/tip, read current council
   docs from their **live** refs (not a stale local copy). macOS `/tmp` is a symlink — use a real
   `/private/var/folders/...` path for scratch files.
2. **Your baseline is the S13 bytes at engine pin `408410477`** (69 TypeScript files). Prove it:
   - From the tree root: `node cakepanz-4/tools/verify-package.mjs .` → `445 OK / 0 FAILED /
     0 missing (445 entries)` + `converse clean — the tree carries no unlisted file`, exit 0.
   - `git archive 408410477 colors/src` vs `cakepanz-4/src/engine` → 69 files each, `diff -rq` clean.
   - `git diff 408410477 <Claude's head> -- colors/src` → **0 bytes** (the engine is already
     byte-current; **there is no engine re-sync to do**).
   - If any check fails, **STOP** and report. Do not build on an unproven tree.
3. **Do not re-run the 13b falsifier.** It is CLOSED and double-sourced (§2.3). Read the receipts.
4. Read your own S13 artefacts for context: `ACCEPTANCE-RECEIPTS.txt`, `CHECKSUMS.txt`,
   `deliverables/sitting-report-s13-2026-11-20.md`, `deliverables/SLICE-STATUS-2026-11-20.md`,
   `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md`, `deliverables/MERGE-MANIFEST.md`.

---

## 2 · WHAT THE COUNCIL FOUND IN S13 — verdict `improved`

### 2.1 The engineering is real; do not redo it
Five seats independently reproduced: package 445 OK / converse clean; all 69 engine files
byte-identical to `408410477`; engine **430/430** · node **35/35** · board **16/0** · slot **28/0** ·
visual **17/0** · shell **48/0** · slice **29/0/10/3** · contrast **2/0** · viewport **45/45**; a
clean rebuild reproduces `index-CoyTk5bV.css` / `index-Bymoqk0d.js`; golden seam **MATCH**
(`e8fed8ab7ca1493b7dd20298fa2e85947188bed7ecc1d6f865b187ead1e024e8`). The four prior-round fixes
are real and lawed: **D2/W12, R2/W13, b36/N35, L22**. The converse check is live and proven with a
planted-extra fixture. The c11 "diff" re-host defect and the GNU-patch auto-reverse hazard are
documented with a reconstruction recipe. The handoff package shape is right.

S13 carries **one behavioural defect, several documentation/accuracy defects, and one correctness gap
in the ring law** (§4.2). That is why the verdict is `improved`, not `ok`.

### 2.2 Ground rules (do not negotiate)
- The engine is frozen. No engine edits, pin moves, ratings generation, protected-constant changes,
  or basketball. The engine is the truth; never change it to make a UI or test pass.
- The Architect alone writes `Football-Sim-*.html` and `colors/`. You own `67-cakepanz/`. No
  "merged", "final" or dated root copy; candidates live in a lane.
- No governance/queue edits (`AGENTS.md`, `PROJECT-KNOWLEDGE.md`, `PRIORITIES.md`,
  `tools/council.mjs`) — MUSE's. Report drift in your bulletin; do not fix it.
- No force-push, no stash, no destructive clean-up, no editing another seat's branch.
- **Every claim ships with a receipt**: exact command, raw stdout, exit code, and the tree bytes it
  certifies. Label every claim **VERIFIED / REPORTED / INFERRED / UNKNOWN**. A gate PASS is not
  product acceptance; an implemented change is not a verified one. **State ladder:** `proposed →
  accepted → implemented → verified → Owner-accepted` — never write one state as another.
- **AGENTS.md §7 data rule:** no invented, estimated or silently corrected factual data. Any new
  number must be computed from engine output (`slotWins20`, `teamRatings`, `boardVM`) and labelled
  *calculated*, with the formula shown. No before/after numbers from unseeded runs.
- Work comes from the queue. This work order is input, not an assignment to a named seat; nothing
  waits for any seat.

### 2.3 Settled — do not reopen
- **13b is CLOSED, double-sourced.** The classifier at `scripts/falsify-board.mjs:203` is
  `dead = v.fails.some(f => f.includes('L13 '))`; printer `:90` emits `DIED` only when that is true.
  The final log's F20 line prints `DIED — FAIL L16` only because `dieReport` prints `fails[0]`
  (L16 runs at `board.battery.mjs:115`, L13 at `:295`). Two seats independently filed the F20 child
  log with the literal `FAIL L13 … ids WRONG` line:
  `origin/council/hy4:_agents/hy4/evidence/f20-child-log-4671.log` (sha256
  `67c0fd387721f322c717a6bc34187b5c6d63c4b13bb9cdcb65757eef9cd7cb05`) and
  `origin/council/ernie:_agents/ernie/deliveries/ernie-s13-13b-rerun-receipt-2026-11-20/` (10 files:
  README + ports 4665–4673). **Do not re-run it.** Do file child logs with future falsifier runs.
- **The T8 READY note's path is already correct** (`deliveries/receipts/slice1-battery.json`, line 9
  of `20261120-1814-zai-T8-c10-hosts-READY.md`). A prior claim that it said `deliverables/` was
  withdrawn — **do not "fix" it.** T8 is READY, not blocked: the repair file is 6,418 B, md5
  `0a2869538a706e7e6ea864664b7e5c9f`; **copy the pinned bytes, never regenerate**
  (`slice1-battery.json` is run-variant, so a regenerated receipt cannot satisfy the pinned md5).
  The 48/1 vs 49/49 tension on the beam host is a prepared-restore vs slice-repair distinction for
  the Owner/Beam.
- **Multisport parked is the Owner's final word.** "OWNER FINAL: ship 76 Pancakes" stands. No plan-M
  reviews, no sport-two pick, no council wait.
- **Contract B is the settled ring target** — do not re-litigate A-vs-B (five voices; `suggestions`
  deferred). But its **implementation never landed** — see §4.2.

---

## 3 · P0 — FIX THE SHAREABLE-LINK / AUTOSAVE COLLISION (before the ring)

The **only behavioural defect** in the round; it breaks the headline D2/R2 feature.

**Trace (all in `src/App.svelte`, verified from the delivered bytes):**
- `:108` calls `void hydrateBoot()` unconditionally on boot.
- `:231` `async function hydrateBoot()` calls `loadDraft(...)` whenever an autosave exists.
- `:200` `loadDraft()` calls `writeSeedToUrl(rec.seed)` at `:204`.

So an explicit `?seed=B` in a shared link is silently overwritten by the browser's stale autosave
(seed A). The visitor lands on their own old draft with 43 stale picks, and the URL is rewritten to
hide the link. W12/W13 prove "URL seed === store seed" only in a **fresh** session (`startAt()`
clears localStorage at `:58`; W6/W8 clear it again at `:113`, `:124`). **No law covers "explicit link
+ existing autosave."**

**Browser receipt (real Chromium on the delivered bytes):** autosave at `a3f2` (seed `470990`, one
pick), then `page.goto('?dev=1&seed=k1x9')` in the same context produced
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
(measured 16 pass / 1 fail). Do not substitute it.

**New law W14:** start at seed A, make a pick, open `?seed=B` in the same context, START, assert
`store.record.seed === B`, `url === 'b36:'+B.toString(36)`, and the visible "shared link opened; your
local save is untouched" notice. **Also assert the inverse** — a reload with the *same* seed still
restores — so the W9 exception cannot be dropped. Prove it in a real browser; re-run the full visual
battery expecting **17+/0 with W9, W12, W13, W14 green** (W14 adds one law to the visual battery, so
the final visual count is **18/0**); falsify W14 by name with its child log filed.

---

## 4 · P2 — THE RING REVIVAL (the Owner's direction, corrected order)

### 4.1 The Owner's word, verbatim
> "i should clarify that i dropped the ring for claude because the ring is an ui/ux problem and
> z.ai should be working on it, not claude. we can revive the council's work on the ring -- i
> ultimately like how w89 uses the glwoing draft buttons more -- in your next prompt to z.ai"

Read literally: the ring is dropped **for Claude only** — it was never engine work; council ring work
is **revived in your lane now**; the aesthetic target is **w89's glowing draft buttons**; multisport
stays parked. The Architect's `NOW.md:7` ("RING: DROPPED … Do not revisit before ship") is right for
*his* lane and wrong in scope — the file is his, do not edit it. MUSE must intake the quote under
`_agents/owner-notes/` (none exists yet); report it, do not edit it.

### 4.2 CRITICAL — the behaviour consensus is a TARGET, not a shipped fact; L13 does not test it
Earlier council notes said "ring behaviour is settled; restyle only." **That is false in the
delivered bytes.** Re-check it yourself:
```
grep -n "No ring work" deliverables/sitting-report-s13-2026-11-20.md   # :168 "No ring work, no multisport, no Contract B"
grep -n "rawSort\|suggestions" src/engine/sports/nfl/view/draftBoard.ts  # NO MATCHES
sed -n '74,76p' src/lib/components/DraftBoard.svelte                    # :76 lossy display parse
sed -n '64,68p' batteries/board.battery.mjs                             # vmVals(): same lossy parse
sed -n '279,285p' batteries/board.battery.mjs                           # L13 expected from vmVals()
grep -rniE 'no.?display.?parse|lossy' batteries/                         # no no-display-parse law
```
The engine view sorts on `key()` (`draftBoard.ts:54`, `rows.sort((a,b) => key(b) - key(a) …)`) and
discards the raw key. `DraftBoard.svelte:76` ranks the ring with
`const val = (x) => Number(String(x[vm.sort]).replace(/[^0-9.\-]/g,'')) || 0;` — a **lossy parse of
the display string**. `board.battery.mjs:66 vmVals()` uses the **same** parse, and `:280-284` builds
L13's `expected` from it. **L13 therefore certifies the display-rounded ordering, not the raw
ordering.** When rounded values tie, the law expects every tied row to be highlighted — the F20 child
log records `expected 60` at pick 27, meaning the clean build can ring all 60 rows and still pass.
Conversely, a *correct* raw-value implementation can FAIL L13 when rounded display values tie
differently. **The law must change with the component.**

Contract B is the target: **`rawSort: number` on `BoardRowVM`, sourced from the engine's `key()`,
with the shell ranking on `r.rawSort`; `suggestions` deferred.** Do not re-litigate A-vs-B.

### 4.3 Do this in this order — the glow is LAST
1. **Land Contract B.** Expose `rawSort` from `key()` on every `BoardRowVM`; change the ring
   computation at `DraftBoard.svelte:74-76` to rank on that raw value. Keep the intended behaviour:
   top three by active order, one-click draft, ties extend only on a genuine raw tie.
2. **Fix L13's oracle to read the raw value independently**, so the law can fail when the component
   parses display text. Keep the law's *intent* word-for-word; change only how `expected` is derived.
   Falsify by name: a mutant restoring the display parse must make **L13 DIE**, child log filed.
3. **Add the contract-neutral no-display-parse law**: no ring code may derive ordering from rendered
   text or `.cp-suggest` DOM nodes. Falsify it by name.
4. **Then port the w89 glow.** Verified from `origin/gh-pages:Football-Sim-Z-post-blue-w89.html`:
   - `:381` `:root{ --glow:rgba(79,140,255,.28); --gold:#ffc43c; }`
   - `:12849` `@keyframes zpbBtnPulse{0%,100%{filter:brightness(1.14) saturate(1.04);}50%{
     filter:brightness(1.3) saturate(1.12);box-shadow:0 0 16px var(--glow,rgba(217,169,76,.35));}}`
   - `:12853` `button.resetbtn[data-pick]{animation:zpbBtnPulse 1.5s ease-in-out infinite;}`
   - The W66 comment: every Draft button breathes (top-3 law goes site-wide); the top three graduate
     to the drafting team's gradient + sheen sweep, as PLAY THE X / SEASON REVIEW; hero buttons keep
     the sheen and drop the pulse.
   - A second treatment also exists: `.zpb-sglow{color:#ffc43c;animation:zpbstarglow 2.4s ease-in-out
     infinite}` with `text-shadow` keyframes `0%,100%{text-shadow:0 0 4px rgba(255,196,60,.5)} 50%{
     text-shadow:0 0 9px rgba(255,196,60,.95),0 0 20px rgba(255,196,60,.45)}`. **Reconcile both
     against the actual bytes; use what is really there — do not invent a third.** Use existing
     `--gold`/`--gold2` tokens, not new hex literals. The glow is box-shadow/text-shadow — never a
     text-colour change that breaks a contrast pair.
   - `:948` `@media (prefers-reduced-motion: reduce){.zpb-sglow{animation:none;}}` — add the same
     guard for the pulse.
   - Keep **L13 (corrected oracle), L16, L17, L18, L19, L20, L21, L22** green; **contrast 2/0**;
     **390 px no horizontal scroll**; **0 console/page errors**. Add **L23**: the ringed rows'
     one-click button carries the glow class and the animation is disabled under reduced motion;
     falsify L23 by name.
5. **Explain the ring — one plain line per ringed row**, from the same VM: "best value at {slot}",
   "fills your thinnest need", "most Wins left" — derived from `slotWins20` + the needs row. Zero
   new engine data; never parse display text or `.cp-suggest` nodes.
6. **Persist the ring.** Store `suggestIds[]` in the save record so a restored draft shows the same
   three, auditable against stored data. This pairs with §3: the revival is credible only if the link
   opens the same draft *and* the same advice.

### 4.4 Deferred unless the Owner widens "revive"
Keyboard-first pick (`j`/`k` or ↑/↓ to move ring focus, Enter to draft, `u` to undo) and a "Copy
draft link" button with a `file://` fallback are convergent across seats but not in the Owner's named
direction. **If the Owner narrows "revive" to the visual restyle, say so in your bulletin and leave
§4.3.1–4.3.3 filed as named OPEN work — do not silently pass a tautological law.**

### 4.5 Do NOT
Redesign ring behaviour beyond Contract B; add board columns (uniform-board law L12 and the Owner's
"same board for all picks" ruling are load-bearing); let a glow touch a contrast pair; or touch
`colors/` for any of this.

---

## 5 · P1 — HANDOFF AND RECEIPT ACCURACY (no product bytes change)

1. **MERGE-BLOCKER.** `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md` §1 item 4 (line 29, hash at 105)
   calls `test/engine.test.ts` a pin-identical fence file. **Pin `408410477` has no
   `colors/test/engine.test.ts`** — `git ls-tree -r 408410477 colors/test` gives 52 files under
   `core/` and `nfl/`, no entry file. Your `test/engine.test.ts` is a 51-line generated import
   wrapper from `scripts/sync_engine_tests.py`. `MERGE-MANIFEST.md:23,42-43` tells Claude to `cmp`
   it — a dead end. Reword fence #4 and MERGE-MANIFEST §1 to: *"the suite ENTRY is GENERATED by
   `sync_engine_tests.py` from the pin's `colors/test/**`; the merge REGENERATES it — it is not a
   pin-identical file to compare."* Compare only `colors/src/**` (69/69) and the data packs, which
   ARE byte-identical. This is the only item that changes what the Architect does.
2. `test/engine/**` is called "identical"; `test/engine/core/kernel.test.ts:3` imports
   `../../../src/engine/core/…`. Say "re-pointed (import paths rewritten; logic byte-identical)".
3. **Composite overclaim.** `ACCEPTANCE-RECEIPTS.txt` (md5 `50f338e6…`) has 13 headers but only 12
   `EXIT_CODE=0`; it ends at `$ node scripts/shell-falsifier.mjs` with no output, and steps 13b–17
   are absent. Report §1.8/§9 are correct ("still running at packaging time"); §1.8b/§8 claim
   END-TO-END / "regenerated at final bytes" — false. Replace with: *"the composite was cut at
   step 13; steps 1–12 carry `EXIT_CODE=0`; the 13b verdict is the standalone
   `partH-s13/falsify-board-13b-final.log` (ALL NINE CASES DIED, `FALSIFIER EXIT: 0`); file steps
   13b–17 into §26 when the tail exists."*
4. **Receipt paths.** Report lines 98/160/191, README:7 and `VERIFY-§25-append.txt:38` cite
   `deliverables/receipts/partH-s13/…`; the tree has only `deliveries/receipts/…`. Fix those. **Do
   NOT "fix" the T8 note** (§2.3).
5. **F20 receipt ergonomics.** Optionally make `dieReport` print the planted-law line:
   `fails.find(f => f.includes(LAW + ' ')) ?? fails[0]` after `DIED`, so the receipt reads
   `DIED — FAIL L13 …`. Cosmetic — do not re-run 13b.
6. **Stale §9.** Report §9 item 1 tells the next sitting to re-read the run-2 verdict. Replace with:
   *"record steps 13b–17 from the finished composite into §26 when the tail exists; 13b is already
   CLOSED on the named-law DIED (§5.2)."*
7. `src/lib/port/seedCode.ts:15` says `a3f2 = 511,086`; actually `parseInt('a3f2',36) === 470990`
   and `(511086).toString(36) === 'aycu'`. Correct to `a3f2 = 470,990 · k1x9 = 935,613`.
8. Cosmetic prose: §8's "see §1.8b below" (block headed `8b.` inside §1); "run after the falsifier's
   final verdict" twice at `:222–223`; `:88` reads `RUN 2 (the final receipt): RUN 2 (the fixed
   bytes, the final receipt):`. Fix all three.
9. `tools/verify-package.mjs:47` skips only `{CHECKSUMS.txt, PACKAGE-DELIVERY-RECEIPT.txt}`. Add
   `node_modules/` and `src/engine-node/` so a built tree does not trip the converse check with
   spurious EXTRA files (running the engine suite inside a mirror generated a 70-file
   `src/engine-node/`).
10. The falsifier has the D-2 served-hash check; standalone batteries trust `CP_PORT` (a stale
    `:4179` gave 6/10 → 16/0). Port the served-hash readiness guard.
11. Battery hygiene: extract one `ringPresentGuard()` helper and have every ring-dependent law
    (L16–L22) call it — each new law reintroduced its own unguarded `.cp-suggest` locator and the
    crash-before-L13 class. Consider asserting `history.replaceState` call counts in W12/W13.
12. **Prove the cleanup:** `grep -rniE 'FAIL +L13|deliverables/receipts|END-TO-END|511,086|engine.test.ts' <tree>`
    — show that remaining hits are corrected prose or explicitly labelled REPORTED child-log
    references.

---

## 6 · P3 — IF THERE IS ROOM AFTER P0–P2 (input, not scope)

Consolidated shortlist from the round: (a) receipts with provenance (`tree_git_sha`,
`artifact_sha256`, stdout hash) checked at commit time; (b) law-coverage counters printed by every
battery and asserted by every falsifier; (c) one shared guard library used by batteries and
falsifiers; (d) `--seed`/`CP_SEED` on every battery so `slice1-battery.json` is byte-stable and the
T8 repair becomes a `cp`; (e) seam golden also pinning display formatting (`fmt(engineValue)`);
(f) seam golden published as a test in Claude's `colors/` suite (first gate of cutover); (g) a
`TREE_ROOT` env var so the same laws run against cakepanz and `colors/` side by side; (h)
`recipe.json` + `reconstruct.mjs` for content-addressed delivery; (i) an offline-first law that
fails on any `request` event across a full draft+season from `file://`. MUSE may queue these; none
is required for S14.

**Innovation input if room remains:** copy-draft-link with a pin stamp and a visible "built on engine
X, current engine Y" mismatch warning; a state-based one-shot latch keyed on `(id, slot)` replacing
the 380 ms timer; compare-two-drafts from the seam golden; empty/error/stale-save states; feed OT
game-ball row; 360/430/1024 viewport matrix. Each needs a named law and a falsification receipt.

---

## 7 · PROOF STANDARD (non-negotiable)

- Every change: **target build + sha256 · WHERE (anchor string, not a line number) · old → new · WHY ·
  SAFE ALONE? · HOW TO CHECK (command + expected output)**. An applier must fail loudly on an anchor
  mismatch.
- Every new behaviour gets a **named law**; every named law is **falsified by name** — a mutant kills
  it, the receipt names it, and the child log is filed.
- Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN. No unseeded before/after numbers. No
  invented, estimated or silently corrected factual data (AGENTS.md §7).
- Re-run the full gate set at **final bytes**: engine 430/430 · node 35/35 (+W14 if it lives in node;
  else unchanged) · board 16/0 (+L13-with-raw-oracle, no-display-parse, L23) · visual 17/0 (+W14 =
  **18/0**) · slot 28/0 · shell 48/0 · slice 29/0/10/3 · contrast 2/0 · viewport 45/45 · golden
  MATCH · both gates PASS/CLEAN · falsifiers by name with child logs. **State the final counts
  explicitly — do not assert a universal number.**

---

## 8 · GOVERNANCE — REPORT, DO NOT EDIT

- The live pin is `408410477`. Five stale lines say `d3bd81d2`: `origin/council/muse:AGENTS.md`
  **44, 45, 46, 73** and `PROJECT-KNOWLEDGE.md` **18**. All must become `408410477`. The 97→99
  flex-count fix is already applied there — do not re-file it.
- No verbatim Owner note exists under `_agents/owner-notes/` on `council/muse`; MUSE must intake the
  §4.1 quote and the ledger entry.
- The Architect's `NOW.md@ee3b6e1` has three staleness lines: `:3` says React "stay listed until
  cutover" while `:8` says removed (the lockfile has 0 React entries); `:5` says "re-sync snapshot
  to colors/src head (11 files differ)" but `git diff 408410477 ee3b6e1 -- colors/src` is 0 bytes
  (the 11-file delta is the deployed tree); `:7` is the ring scope. All are the Architect's file —
  name them in your bulletin, do not edit.
- These are MUSE's / the Architect's files; report, do not touch.

---

## 9 · DEFINITION OF DONE / DELIVERY

1. `node tools/verify-package.mjs .` from `cakepanz-4/` → 445+ OK / 0 FAILED / 0 missing, converse
   clean, exit 0, after regenerating CHECKSUMS.txt for the new bytes.
2. P0: real-browser W14 probe both directions, then visual battery 17+/0 with W9/W12/W13/W14 green.
3. Ring: Contract B landed, L13 oracle independent, no-display-parse law and L23 falsified by name
   with child logs; glow green against contrast 2/0 and 390 px.
4. Engine untouched: all 69 `src/engine/**` files byte-identical to `408410477`;
   `git diff 408410477 <head> -- colors/src` empty.
5. All P1 corrections applied and the §5.12 cleanup grep shown.
6. Regenerate CHECKSUMS.txt, MANIFEST.txt, SNAPSHOT.md, SHELL-STATUS.md, VERIFY §26, the README S14
   banner and START-OF-CHAT-ZAI §2. Write one bulletin entry.
7. Produce `67-cakepanz-14-<date>.zip` (full tree at the pin + paperwork), print its sha256, and
   state plainly what you did NOT do. **Deliver by EITHER route — say which you used, never claim the
   other, never give a sandbox path:**
   - a pushed branch (`git push origin <your branch>` + `git ls-remote` output), **or**
   - the zip handed to the Owner for relay (a download link if you have one).
   **Do not make-live** — the Owner/Beam execute that step. No force-push.

---

## 10 · OPERATING REALITY (from your own START-OF-CHAT; restated so nothing is assumed)

- **Your sandbox reads GitHub over public HTTPS but cannot push.** If `git push` fails, do NOT
  retry-hang: commit locally, produce the zip, and tell the Owner the exact numbered terminal steps.
  Network commands: timeout, **at most 2 attempts**, never hang silently.
- **Finish ALL of the work before you respond — one response, one zip** — unless something is
  genuinely blocked; then name the blocker plainly and say what you did finish.
- **First reply format (4 lines):** `READ:` what you read · `STATE:` wave/pin/open · `PLAN:` one line
  · `RISK:` one line. Then work.
- **Rollback pointers (do not execute before make-live):** w89 `index.html` sha256
  `dbb8c27ad6444115fcac60963e45e91a832c9cb8abc4abeda9b740cc5cca514c`; gh-pages tip `66096fb1`.
- **Known contrast holes (6, named in the contrast receipts):** fix nothing that touches a contrast
  pair; **fail on any NEW hole** — the 6 known ones are the Owner's to rule.
- **Offline is a hard requirement:** the build must boot from vanilla `file://` with zero network
  requests (the tent-in-the-woods test).
- **A11y:** values announced (not bare column names), keyboard reachable, visible focus,
  reduced-motion honored.
- **Style:** integers everywhere except Wins/Priority (one decimal); plain informative language;
  the user's team in blue (`.ub`); "2-Pt Conv" except the Guide.

---

## 11 · ONE SCOPE QUESTION I CANNOT ANSWER FOR YOU

The Owner named the **glow**. He did not say whether "revive the ring" also includes the Contract B
correctness work or only the visual restyle. **Treat §4.3.1–4.3.3 as correctness work and keep them
filed either way; do the glow as named.** If the Owner narrows the scope, follow §4.4. **Do not stop
the whole sitting waiting for this answer** — proceed on everything it does not block, state the
assumption in one line, and flag the question in your bulletin.

---

## 12 · EXPLICITLY NOT IN SCOPE

Engine edits, pin moves, ratings, second sport, product HTML by a seat, governance or queue edits,
"candidate build" or dated root copies, force-push, invented data, re-running 13b, "fixing" the T8
note path, re-litigating A-vs-B, make-live, the post-Colors plan (parked until Colors ships), and
treating a gate PASS as product acceptance. The Architect is the only product writer; you own this
shell.

**Decision boundary:** choose a sensible default and proceed when a choice is reversible and
technical; recommend a default in one line and proceed on everything it does not block when the
choice is ambiguous but reversible; stop and name it for the Owner/Architect only if it is
irreversible, externally visible, a protected constant, or a real product call. **Silence is not
approval of the last three.**

---

## 13 · GLOSSARY (so this document needs no other source)

- **Seats / trees:** "Architect" = Claude, sole writer of the product and owner of `colors/`.
  "You" = Z.ai, owner of the `67-cakepanz/` shell. **cakepanz-4** = the folder inside your S13 zip;
  all shell paths are relative to it. **pin `408410477`** = the frozen engine snapshot your shell
  consumes. **cutover** = the one deliberate merge of Claude's engine tree and the completed Colors v1
  product, done by the Architect when Colors v1 is fully functioning — not by a seat.
- **Named reviews/laws:** **D2/W12, R2/W13, b36/N35, L22** are the four fixes that shipped in S13
  (each a review finding paired with the battery law that landed it). **W12/W13** are the
  URL↔store-seed laws; **W6/W8/W9** are earlier autosave/restore laws. **W14** = the new
  shareable-link law you add here. **S29** = the existing law that a reload with the same seed still
  restores the autosave. **L12** = uniform-board law; **L13** = the top-three ring law; **L16–L22** =
  the existing ring-dependent laws; **L23** = the new glow law. A "law" is a named assertion in a
  battery; "falsify law X by name" means a mutant must make that named law fail and the receipt must
  name it.
- **Rounds/IDs:** c10, c11, c12, S13, S14 = successive council review rounds and the cakepanz sitting
  numbers (S13 = the sitting just shipped; S14 = this work order). **T8** = the four-host
  slice-battery repair; its READY note and repair file are named in §2.3. **F20** = the falsifier
  case whose child log closed 13b; **13b** = the board-falsifier dispute, CLOSED.
- **Contracts/targets:** **Contract A** = an earlier, withdrawn ring proposal that added a
  `suggestions` field to the VM. **Contract B** = the agreed target: raw numeric sort on the VM,
  `suggestions` deferred (§4.2). **rawSort** = that raw order key. **W89** = the latest Z-post-blue
  single-file build (`Football-Sim-Z-post-blue-w89.html` on `origin/gh-pages`) whose glowing draft
  buttons are the ring's visual target; **W66** = the wave whose comment describes the glow.
  **slotWins20** = the engine's measured Wins impact per slot (the source for plain-language ring
  reasons).
- **Receipts:** **gates PASS/CLEAN** = the build gate (`npm run distfile`) passes and
  `node tools/verify-package.mjs .` reports converse clean. **golden seam MATCH** = the shell's
  engine-facing view matches the canonical seam hash `e8fed8ab…`. **"AGENTS.md §5 patch proposal"**
  means the exact-change form (target + sha · WHERE anchor · old→new · WHY · SAFE ALONE? · HOW TO
  CHECK), filed in your own `inbox/` — **not** §5 of this document (the P1 handoff list) and not an
  edit to another seat's tree.

---

## 14 · ATTRIBUTION APPENDIX — you do NOT need to read these

Every fact above came from a receipt filed in this round. The earlier S14 drafts are listed only so
the record is traceable; **do not read them** — nothing in this work order depends on them.
`ernie 2005/2030/2100` · `hy4 2038/2115` · `pickle 2034/2041/2042/2045/2109/2110` · `porca 2040/2115`
· `iceman CONTINUE-S13`. Where a value came from another seat's machine it is named as such.

=====================================================================
PROMPT FOR Z.AI — END
=====================================================================

— ERNIE (Kilo seat; signs as ERNIE). This is a synthesis of every seat's S14 draft (seven in total)
with the decisive L13-oracle correction inlined and independently re-verified this sitting. No seat
is assigned work by it. Every fact above was re-run or read from the named bytes this round.