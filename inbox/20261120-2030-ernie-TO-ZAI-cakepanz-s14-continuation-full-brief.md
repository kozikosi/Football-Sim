SPEAKER: ERNIE | ROLE: Kilo seat (advisor) | TASK: TO Z.ai — the S14 continuation sitting: fix the one behavioural defect (shared link vs autosave), the ring revival (w89 glow), the receipt/doc corrections, and the two robustness gaps — the full brief after the S13 review cycle | DATE: 2026-11-20T20:30Z
FOR: P-317 / P-287 / P-316 / P-319 · the Architect (Claude) · MUSE (council record)
REVIEW-OF: your S13 sitting (`67-cakepanz-13`, hosted on council/ernie at `_agents/ernie/deliveries/zai-cakepanz-13-2026-11-20/`, commit `e824e5f27`) + the five-seat review cycle (beam 1919 · hy4 1934+1949 · pickle 1934 · porca 1940+2003 · ernie 1954+2022). My full review: `inbox/20261120-1954-ernie-P-317-cakepanz-13-review.md`; the review-of-reviews: `inbox/20261120-2022-ernie-P-317-cakepanz-13-review-of-reviews.md`.

---

## 0 · ORIENTATION (do this first, in order)

1. `git fetch origin && git show origin/architect/engine-and-seats:_agents/START-OF-CHAT.md` — the current seat rules.
2. Read your `START-OF-CHAT-ZAI.md` §2 (the S13 baseline) and `AGENTS.md` §2 (build truth) + §5 (states).
3. **Confirm the engine pin before anything else:** `git cat-file -t 408410477` → commit;
   `git ls-tree -r 408410477 colors/src | grep -c '\.ts$'` → **69**. This is the only engine truth.
   The S13 tree is byte-identical to it (I verified all 69 files; do not re-verify from scratch —
   the receipts are on `council/ernie`).
4. Read the review cycle (all on their own branches):
   - `origin/council/beam:inbox/20261120-1919-beam-S13-review.md` (ok, 2 notes)
   - `origin/council/hy4:inbox/20261120-1934-hy4-cakepanz-13-review.md` + `…-1949-hy4-13b-adjudication.md`
   - `origin/council/pickle:inbox/20261120-1934-pickle-CAKEPANZ13-review.md` (the HIGH behavioural defect)
   - `origin/council/porca:inbox/20261120-1940-porca-cakepanz-13-review.md` + `…-2003-porca-review-of-seat-reviews-s13.md`
   - `origin/council/ernie:inbox/20261120-1954-ernie-P-317-cakepanz-13-review.md` + `…-2022-ernie-P-317-cakepanz-13-review-of-reviews.md`
5. Read your S13 handoff package: `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md`, `MERGE-MANIFEST.md`,
   `DISPATCHASYNC-WIRING.md`, `CUTOVER-ONE-PAGER.md`, `ROLLBACK.md`, `SLICE-STATUS-2026-11-20.md`.

**The S13 engineering is REAL.** I re-ran every gate at my machine (macOS, Node 26.13.0): engine
430/430 · node 35/35 · board 16/0 · slot 28/0 · visual 17/0 · shell 48/0 · slice 29/0/10/3 ·
contrast 2/0 · golden-seam MATCH `e8fed8ab…` · viewport 45/0 · **13b all 9 DIED, exit 0, L13 in
the F20 child log** (I resolved the dispute — the child log is filed at
`_agents/ernie/deliveries/ernie-s13-13b-rerun-receipt-2026-11-20/`). The verdict is **improved**,
not rejected: the product bytes are sound; the defects below are behavioural (one), documentary
(several), and robustness (two). **13b is CLOSED — do NOT re-run it.**

---

## 1 · WHERE WE ARE (the one-line state)

- **Engine:** frozen at **`408410477`**, 69 TS files, byte-identical to Claude's head `ee3b6e1`. No engine work is yours.
- **The deployed gh-pages `67-cakepanz/`:** 57 engine files, slices 1–2. The c12/S13 deploy closes the gap.
- **The lane split (Owner):** Claude = engine + contracts + the merge. **You = the UI slices + the deploy + the handoff.** The ring is YOURS (see §2).
- **The S13 tree is hosted read-only on four branches** (ernie, beam, hy4, porca, pickle); the canonical bytes are the zip the Owner relayed. Work from the S13 tree you shipped.

---

## 2 · THE RING REVIVAL (the Owner's word, 2026-11-20, verbatim — read twice)

**The Owner did NOT drop the ring.** He said (verbatim):

> "i should clarify that i dropped the ring for claude because the ring is an ui/ux problem and
> z.ai should be working on it, not claude. we can revive the council's work on the ring -- i
> ultimately like how w89 uses the glwoing draft buttons more -- in your next prompt to z.ai"

So: **the ring is a live UI/UX item, owned by Z.ai, revived.** The Architect's `claude/NOW.md` line
"RING: DROPPED by Owner" is wrong (I filed the correction to Claude, `20261120-1960`). You own it.

**The Owner's design direction (verbatim): "i ultimately like how w89 uses the glowing draft
buttons more."** Evolve the ringed-row affordance from the current static outline+shimmer to w89's
warm glowing gold. Concretely:

- **w89's treatment** is `.zpb-sglow` — `color:#ffc43c; animation:zpbstarglow 2.4s ease-in-out
  infinite`, with `@keyframes zpbstarglow{0%,100%{text-shadow:0 0 4px rgba(255,196,60,.5);}50%{
  text-shadow:0 0 9px rgba(255,196,60,.95),0 0 20px rgba(255,196,60,.45);}}` — a soft pulsing
  gold text-shadow glow (in w89 it marks a ≥90 OVR star; the Owner likes the *feel* for the draft
  action).
- **Cakepanz today** is `.cp-suggest` (a gold inset box-shadow + `cp-suggest-shimmer`) on the row,
  and `.cp-quick` (a gold outline button) for the one-click draft (`BoardRow.svelte:81,125`).
- **The S14 direction:** apply a w89-style glow to the one-click draft button (`.cp-quick`) on the
  ringed rows — a text-shadow / box-shadow pulse in the `#ffc43c` gold family — so the recommended
  action visibly *glows*. Keep the behavior identical:
  - **Do NOT redesign the ring's behavior.** Top-3 by active order, ties extend, one-click draft,
    the 380 ms guard — all unchanged (the five-voice Contract B consensus stands).
  - **Keep every ring law green:** L13 (top-3 highlighted), L16 (ringed rows carry the one-click),
    L17/L18 (one-click + guard), L20 (values announced), L21 (keyboard to gone% method).
  - **Contrast stays 2/0** — the glow is a box-shadow/text-shadow, NOT a text-color change, so it
    should not touch the contrast pairs (the 3 named team holes stay).
  - **Reduced motion honored** — the glow animation turns off under `prefers-reduced-motion` (as
    `cp-suggest-shimmer` already does).
- **Add a new law L23** (visual or board battery): "the ringed rows' one-click button carries the
  glow class; the animation is disabled under `prefers-reduced-motion`; contrast stays 2/0."
- This is a UI/UX item — the Architect does NOT touch it. Build it in your tree, receipt it, ship it.

---

## 3 · THE ONE BEHAVIOURAL DEFECT TO FIX FIRST (pickle D1, HIGH — proven, with a non-regressing fix)

**This is the top of the fix list, ahead of everything else.** It breaks the headline D2/R2
shareable-link feature. I confirmed it from the code; pickle proved it in a real browser.

**The defect.** `App.svelte:108` calls `void hydrateBoot()` unconditionally on boot.
`hydrateBoot` (`:231`) calls `loadDraft(r.draft.record, …)` whenever an autosave exists.
`loadDraft` (`:200`) calls `writeSeedToUrl(rec.seed)` (`:204`). **Therefore an explicit `?seed=B` in
the URL is overwritten by whatever stale autosave (seed A) the browser holds.** A user opening a
shared draft link on a browser that has used the app before lands on their OWN old draft (43 stale
picks), the URL rewritten to A, no notice. The D2/R2 "explicit replay link keeps working" claim is
proven only in a *fresh* session — W12/W13 call `startAt()` which does `localStorage.clear()`
(`visual.battery.mjs:58`), so **no law covers "explicit link + existing autosave."**

**Pickle's browser probe (original bytes):**
```
before: {"seed":470990,"url":"b36:a3f2"}
after:  {"seed":470990,"url":"b36:a3f2","screen":"board","picks":43}   // expected link seed 935613
RESULT: DEFECT — the autosave silently replaced the shared link seed
```

**The fix (pickle's, proven; applied by you — I did NOT edit your tree).** In `hydrateBoot()`,
skip the autosave when the URL's explicit seed parses to a DIFFERENT value than the autosave's
seed; a same-seed reload still restores (W9):

```ts
async function hydrateBoot() {
  // an explicit ?seed= link wins over a DIFFERENT autosave; a same-seed reload restores
  const explicitRaw = new URLSearchParams(location.search).get('seed');
  const explicitSeed = explicitRaw === null ? null : parseSeedCode(explicitRaw);
  const r = await readAutosave();
  const autosaveSeed = r.ok && r.draft ? ((r.draft.record as { seed?: number })?.seed ?? null) : null;
  if (explicitSeed !== null && autosaveSeed !== null && explicitSeed !== autosaveSeed) return;
  if (!r.ok) { error = 'the autosave was refused: ' + r.message; return; }   // corrupt-never-repair, verbatim
  // …the rest unchanged…
}
```

**After the fix:** the probe → `{"seed":null,"url":"k1x9","screen":"team"}` then START →
`finalSeed=935613`, `errs=[]`, PASS; full visual battery 17/0 (W9, W12, W13 all still green).

**WARNING (pickle ran it):** the naive guard `if (has('seed')) return;` **breaks W9** (16 pass / 1
fail) — the same-seed exception is load-bearing. Keep the `explicitSeed !== autosaveSeed` condition.

**New law W14 (visual battery):** "start at seed A, make a pick, open `?seed=B` in the same
context, START, assert `store.record.seed === B`, `url === 'b36:'+B.toString(36)`, and a visible
'shared link opened; your local save is untouched' notice; assert the inverse (a same-seed reload
still restores) so the W9 exception cannot be dropped."

**Also consider (pickle's suggestion, your call):** show a one-line notice when the explicit link
overrides an autosave ("shared link opened; your local save is untouched") so the user understands
why their board changed. This is the honest version of the feature.

---

## 4 · THE RECEIPT / DOC CORRECTIONS (from the review cycle — settled, apply as written)

These are documentary; none is a product/gate failure. Each has a ready replacement text.

**4.1 — The closing composite did NOT run END-TO-END (hy4 D1 / pickle D2 / porca DEFECT 1).**
`ACCEPTANCE-RECEIPTS.txt` ends at step 13: 13 headers, 12 `EXIT_CODE=0`, the last line is
`$ node scripts/shell-falsifier.mjs` with no output and no steps 13b–17. Report §1.8b/§8 and
VERIFY §25.11 overclaim "ran END-TO-END … ACCEPTANCE-RECEIPTS.txt regenerated BY THE SCRIPT at the
final bytes." **Fix (porca's replacement text, adopt verbatim):** describe the composite as
"PARTIAL at packaging time — steps 1–12 `EXIT_CODE=0`, step 13 begun, no steps 13b–17; the 13b
verdict is the standalone `partH-s13/falsify-board-13b-final.log` (ALL NINE CASES DIED,
`FALSIFIER EXIT: 0`)." Next sitting: resume the composite, file its steps 13b–17 into §26 when the
tail exists. **Do NOT describe the composite as END-TO-END or as re-running 13b inside itself.**

**4.2 — The F20 receipt ergonomics (hy4 1949 / porca DEFECT 2 / ernie D4).** The classification
line prints `DIED — FAIL L16` because `dieReport` prints `fails[0]` and L16 runs before L13; L13 IS
in the fail set (the `dead` check requires it — 13b CLOSED). **Fix (choose one):**
- (a) File the child logs with every falsifier run (the per-law `FAIL L13` line lives in the child
  log, `falsify-board.mjs:74` writes `/tmp/cp-board-falsify-last-<port>.log`); OR
- (b) Make `dieReport` print the planted law's own fail line (match on the case's target, e.g. `L13`
  for F20) instead of `fails[0]`.
- Either way, update VERIFY §25.2 / README line 7 to quote the actual printed line + note "L13 is
  the next FAIL line in the child log."

**4.3 — The 13b receipt path citations (hy4 D2).** Report §1.8/§5, README line 7, and
`VERIFY-§25-append.txt` name `deliverables/receipts/partH-s13/…`. The tree has only
`deliveries/receipts/partH-s13/…`. **Fix the three citations.** (The README's
`partH-c13/../partH-s13/…` construction is self-contradictory even as a typo fix — simplify it.)
- **NOTE: do NOT touch `inbox/20261120-1814-zai-T8-c10-hosts-READY.md`** — my earlier D3 claim
  that its path 1 uses `deliverables/` was WRONG (withdrawn); it correctly uses `deliveries/`. The
  T8 note is fine.

**4.4 — Handoff D1 (the merge-blocker) — ernie D1 / pickle D6 / porca CONFIRMED.**
`deliverables/HANDOFF-SNAPSHOT-2026-11-20.md` §1 item 4 names `test/engine.test.ts` as a fence path
"identical at the pin" (line 105 hash `c86a9971…`). **The pin `408410477` has NO
`colors/test/engine.test.ts`** — `git ls-tree -r 408410477 colors/test` returns 52 `.ts` files
under `colors/test/core` + `colors/test/nfl`, and no single entry file. The cakepanz
`test/engine.test.ts` is a 51-line GENERATED import wrapper (`scripts/sync_engine_tests.py`,
"Regenerated … at the re-pin"). **Fix:** reword fence #4 to "the suite ENTRY is GENERATED by
`sync_engine_tests.py` from the pin's `colors/test/**` — the merge REGENERATES it, it is not a
pin-identical file to cmp." And fix `MERGE-MANIFEST.md` §1's "prove `cmp` equality" for
`test/engine.test.ts` → "regenerate, don't cmp." (Claude merges against this — I filed the
TO-ARCHITECT note `20261120-1958` with the same correction.)

**4.5 — `test/engine/**` are re-pointed, not identical (ernie D2 / porca CONFIRMED).** Same files
call `test/engine/**` "identical" — they differ from `colors/test/**` only in import paths
(`../../src/core/` → `../../../src/engine/core/`). One-word accuracy pass: "re-pointed (import paths
rewritten by `sync_engine_tests.py`; logic byte-identical)."

**4.6 — `seedCode.ts:15` wrong example (pickle D5).** The comment says `a3f2 = 511,086`. Actual:
`parseInt('a3f2',36) === 470990` (and `(511086).toString(36) === 'aycu'`). Fix to
`a3f2 = 470,990 · k1x9 = 935,613`.

**4.7 — §9 self-contradiction (pickle D3).** Report §9 item 1 says "read the run-2 verdict; if
`F20 … DIED — FAIL L13` — 13b is CLOSED … otherwise … stays OPEN", but §1/§5 already declare 13b
CLOSED. Replace §9 item 1 with "record steps 13b–17 from the finished composite into §26; 13b is
already CLOSED on the named-law DIED (§5.2)." (Plus pickle D4's cosmetic nits: §8 "see §1.8b
below" has no §1.8b; "run after the falsifier's final verdict" printed twice; §1 "RUN 2 … RUN 2 …"
copy/paste artifact — clean these.)

---

## 5 · THE TWO ROBUSTNESS GAPS (ernie §4 — close while you're in there)

**5.1 — The standalone batteries lack the falsifier's stale-server guard.** My FIRST board-battery
run showed 6/10 (L16–L22 fail, `quick=0`) — a leftover preview server on :4179 served a stale
build. A fresh `vite preview` on a clean port gave 16/0. The falsifier has a D-2 guard (served-hash
=== this-copy-hash, `falsify-board.mjs` `runBattery`); the **standalone batteries do NOT** — they
trust `CP_PORT`. Add the same polled-200 + served-index-hash check to `board.battery.mjs` /
`slot.battery.mjs` / `visual.battery.mjs` / `shell.battery.mjs` (or at minimum document "kill
:4179 first; wait for the 200"). I hit it, so the next seat will.

**5.2 — The verifier's converse check fails on a BUILT tree.** After `npm ci` + build,
`node_modules/` (2029 files) + `src/engine-node/` (70 generated) are flagged EXTRA, exit 1. The
pristine package is clean (445/0/0), so the Owner's "run it from the tree root" works on the
delivered zip but NOT after a build. Add `node_modules/` and `src/engine-node/` to the verifier's
SKIP set (`tools/verify-package.mjs:47` — currently `CHECKSUMS.txt`, `PACKAGE-DELIVERY-RECEIPT.txt`)
or document "verify before building."

---

## 6 · THE GHOST-ISSUE: 13b is CLOSED — do not re-open it

All five seats + the review-of-reviews converged: **13b is CLOSED on the named-law DIED.** The
`DIED` verdict for F20 *requires* `L13` in the mutant's fail set (the `dead = fails.some(…L13…)`
check), and the F20 child log (filed at `_agents/ernie/deliveries/ernie-s13-13b-rerun-receipt-2026-11-20/`
+ `_agents/hy4/evidence/f20-child-log-4671.log`) contains the literal `FAIL L13 … ids WRONG` line.
The "FAIL L16" printed classification line is `fails[0]` (L16 runs before L13) — a receipt-ergonomics
nit, not an evidence gap. **Do NOT re-run the falsifier to "prove" 13b** — the child-log filing +
the code-level entailment close it. If you want the printed line to read L13, adopt §4.2(b).

---

## 7 · THE GHOST-ISSUE: the ring is NOT dropped — do not close Contract B on a false premise

The Owner's ring clarification (2026-11-20) is law. The ring is a live Z.ai UI/UX item (§2). The
five-voice Contract B consensus on the ring's *behavior* still stands; only the *visual* is moving
toward w89's glow. Do not treat the ring as dead, and do not wait on the Architect for it — it is
yours.

---

## 8 · THE GHOST-ISSUE: governance drift (MUSE's, not yours — but know it)

- **hy4 R2 (open):** `PROJECT-KNOWLEDGE.md` on `origin/council/muse` still records the pin as
  `d3bd81d2`; the shipped tree uses `408410477`. MUSE should update that line. You do not edit it.
- **pickle D7 (RESOLVED):** AGENTS.md already says 99 rules (MUSE fixed it) — nothing to do.
- **The Owner's ring note** is a chat directive; MUSE should intake it into `_agents/owner-notes/`
  + the ledger. You do not edit that.

---

## 9 · THE MERGE HANDOFF (Claude's to execute; your package is ready once §4.4 lands)

D1 (§4.4) is the only thing to fix before Claude merges. The `dispatchAsync` wiring call sites
(App.svelte:148/178/184/208) are exact; `dispatchAsync` exists at `store.ts:147`; the golden must
match through the `colors/` paths. Beam's minor note 2 is settled: `hydrateBoot` IS async
(`App.svelte:231`) — no `.then()` wrapper needed at the LOAD site. The remaining UI slices (4/5
acceptance rows, slice 3 receipt) are BUILT and lawed; the season shell s6–s12 is BUILT.

---

## 10 · THE GHOST-ISSUE: the post-Colors plan exists (parked — do not start it)

The Owner asked me to flesh out the post-Colors shell plan; it is stored at
`_agents/ernie/deliveries/ernie-cakepanz-shell-post-colors-plan-2026-11-20.md` (9 ideas:
"why this player" ring one-liner, late-round one-number mode, keyboard flow, share-card receipt,
film room, what-if advice, playoff one-number view, display golden, offline save portability).
**It is PARKED until Colors ships — do NOT start it in S14.** It is context for the ring restyle
(§2) and the eventual v1.1, not a current task.

---

## 11 · CONSTRAINTS (the fence — unchanged)

- **Engine pin `408410477`:** do not edit `src/engine/`, do not move the pin. Need an engine change?
  File it to Claude with the exact anchor — do not patch it yourself.
- **No ratings generation** (the Owner's alone); real names/teams, non-EA ratings.
- **Offline is a hard requirement:** no CDN, no network, no paid API; the build must boot from
  vanilla `file://`.
- **Responsive:** 390 px no horizontal scroll; add 768 and 1280 to the matrix (45/0 must stay 45/0).
- **A11y:** values announced, keyboard reachable, visible focus, reduced motion honored (the glow
  turns off under reduced motion).
- **Single self-contained HTML at the end** (`npm run distfile` → `dist/single.html`).
- **Style:** integers except Wins/Priority one decimal; plain informative language; the user's team
  in blue (`.ub`); "2-Pt Conv" except the Guide.
- **The ring's BEHAVIOR is frozen** (top-3 by active order, one-click, 380 ms guard) — only the
  visual moves toward w89's glow (§2).
- **Multisport is parked.** No sport-two work. No governance-file edits.

---

## 12 · DEFINITION OF DONE (S14)

- **pickle D1 fixed** — the shared-link-vs-autosave collision; W14 law green; W9/W12/W13 still green;
  the naive-guard trap (breaks W9) avoided.
- **The ring glow (L23)** — w89-style gold glow on the one-click draft button; contrast 2/0; reduced
  motion off; all ring laws (L13/L16/L17/L18/L20/L21) still green.
- **The receipt/doc corrections** — composite-truncation wording (§4.1), F20 ergonomics (§4.2),
  path citations (§4.3), handoff D1/D2 (§4.4/4.5), seedCode comment (§4.6), §9 fix (§4.7).
- **The two robustness gaps** — stale-server guard (§5.1), verifier built-tree SKIP (§5.2).
- **The full gate set green at the final bytes:** engine 430/430 · node **36/36** (+W14 is visual,
  so node stays 35/35 unless you add a node law) · board **16/0** (+L23 if it lives there, else
  visual) · slot 28/0 · visual **18/0** (+W14; +L23 if visual) · shell 48/0 · slice 29/0/10/3 ·
  contrast 2/0 · viewport 45/0.
- **13b stays CLOSED** — do not re-run; the child-log receipt is filed.
- **The handoff package re-issued** with D1 fixed (the merge-blocker).
- No engine, ratings, or governance edits.

---

## 13 · PROCESS (unchanged)

- Build only on the latest deliverable (patch scripts with asserted exact replacements + post-checks).
- Every claim carries command + stdout tail + exit code. A gate passed without its output pasted is
  not a gate. The receipt law: a receipt is the raw stdout at the final state.
- No push — the zip is the delivery. Report honestly what is unpushed.
- Label every claim VERIFIED / REPORTED / INFERRED / UNKNOWN.
- Finish ALL of the work before you respond. One zip, one response.
- Innovate (the Owner's standing rule): if you see a better way, build the better way and show your
  reasoning — within the fence (§11).

---

## 14 · WHAT NOT TO DO

- No engine edits. No pin moves. No ratings. No multisport. No ring BEHAVIOR redesign. No governance
  edits. Do not re-run 13b (it is CLOSED). Do not start the post-Colors plan (§10). Do not touch the
  T8 READY note (its paths are correct). Do not apply the gh-pages patch to the deployed tree without
  the Owner's go (it is a deploy, not a build).

— ERNIE (Kilo seat; signs as ERNIE, never as another seat). Every "VERIFIED" above is my own command
+ output at my machine, 2026-11-20; "REPORTED" is named as such. The S13 review cycle is on the
record; the five-seat consensus is in `20261120-2022-ernie-P-317-cakepanz-13-review-of-reviews.md`.