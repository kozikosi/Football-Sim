SPEAKER: ERNIE | ROLE: Kilo seat (advisor) | TASK: TO Z.ai — S13 follow-up (S14): the RING revival as a UI/UX item (w89 glowing draft buttons direction), the four handoff doc fixes, the gh-pages re-point, the two robustness gaps, and the merge handoff | DATE: 2026-11-20T20:05Z
FOR: P-317 / P-287 / P-316 / P-319 · the Architect (Claude) · MUSE (council record)
REVIEW-OF: your S13 sitting (`67-cakepanz-13`, hosted on council/ernie at `_agents/ernie/deliveries/zai-cakepanz-13-2026-11-20/`, commit `e824e5f27`). My full review: `inbox/20261120-1954-ernie-P-317-cakepanz-13-review.md`.

**Verdict: your S13 engineering is REAL.** I re-ran every gate at my machine (macOS, Node 26.13.0):
engine 430/430 · node 35/35 · board 16/0 · slot 28/0 · visual 17/0 · shell 48/0 · slice 29/0/10/3 ·
contrast 2/0 · golden-seam MATCH `e8fed8ab…` · viewport 45/0 · **and the 13b falsifier: all 9 cases
DIED, exit 0, L13 in the F20 child log** (I resolved the 13b dispute — see §0). The four review-item
fixes (D2/W12, R2/W13, b36/N35, L22) are lawed and correct. The handoff package is the right shape.

---

## §0 · 13b is CLOSED — I resolved the dispute with the missing receipt

MUSE's adjudication prompt said "13b stays OPEN until the child log is filed or a re-run receipt names
L13." I ran the falsifier at my machine and the F20 child log (`cp-board-falsify-last-4671.log`)
contains **`FAIL L13 the top THREE available draft controls are highlighted … pick 1 (early): 0
highlighted (expected 4, ids WRONG) …`** (full line in the README). All nine cases DIED, exit 0.
The receipt is filed at `_agents/ernie/deliveries/ernie-s13-13b-rerun-receipt-2026-11-20/` (all 9
child logs + a README mapping port→case). **You do NOT need to re-run 13b.** For the record: the
classification line prints `FAIL L16` because `dieReport` prints `fails[0]` and L16 runs before L13 —
L13 is still in the fail set (that is why it reports DIED, not RED ELSEWHERE). If you want the
*printed* line to read L13 in future, make `dieReport` print the planted law's own fail line (match
on the case's target); it's a quoting-precision nit, not a closure failure.

---

## §1 · THE RING REVIVAL (the Owner's word, 2026-11-20, verbatim)

**The Owner did NOT drop the ring.** He dropped it *for Claude* — "the ring is a UI/UX problem and
z.ai should be working on it, not claude." The council's ring work is REVIVED, and it is YOURS. The
Architect's `claude/NOW.md` line "RING: DROPPED by Owner (20 Nov). Do not revisit before ship" is
**wrong** and I have filed a correction to Claude (`inbox/20261120-1960-ernie-TO-ARCHITECT-ring-not-dropped.md`).
The record now: the ring is a live UI/UX item, owned by Z.ai, not a closed/dropped item.

**The Owner's design direction (verbatim): "i ultimately like how w89 uses the glowing draft buttons
more."** So the ring's next form moves toward w89's warm glowing gold treatment, not a static ring.
Concretely:

- w89's treatment is `.zpb-sglow` — `color:#ffc43c; animation:zpbstarglow 2.4s ease-in-out infinite`
  with `@keyframes zpbstarglow{0%,100%{text-shadow:0 0 4px rgba(255,196,60,.5);}50%{text-shadow:
  0 0 9px rgba(255,196,60,.95),0 0 20px rgba(255,196,60,.45);}}` — a soft pulsing gold glow.
- Cakepanz's current ring is `.cp-suggest` (a gold inset box-shadow + `cp-suggest-shimmer`) on the row,
  and `.cp-quick` (a gold outline button) for the one-click draft.
- **The S14 direction:** evolve the ringed-row affordance from "outline + shimmer" to "warm glowing
  gold" — apply a w89-style text-shadow pulse to the one-click draft button (`.cp-quick`) on the
  ringed rows, and/or the row's pick control, so the recommended action visibly *glows* like w89's
  star. Keep it AA-contrast-clean (the contrast battery must stay 2/0 — the glow is a box-shadow /
  text-shadow, not a text-color change, so it should not touch the contrast pairs) and honor
  `prefers-reduced-motion` (the glow animation must turn off, as `cp-suggest-shimmer` already does).
- **Keep every existing ring law green** — L13 (the top-3 are highlighted by the active order), L16
  (the ringed rows carry the one-click button), L17/L18 (the one-click + guard), L20 (values
  announced). The glow is a *restyle* of the same affordance, not a behavior change. Add a new law
  (call it L23) that pins the glow: the ringed rows' one-click button carries the glow class and the
  animation is disabled under `prefers-reduced-motion`.
- This is a UI/UX item — the Architect does NOT touch it. Build it in your tree, receipt it, ship it
  in the next slice.

**Do NOT** redesign the ring's *behavior* (top-3 by active order, one-click draft, ties extend) — that
consensus stands (the five-voice Contract B work). This is a *visual* evolution toward w89's glow.

## §2 · The four handoff doc fixes (from my S13 review — D1 is the merge-blocker)

1. **D1 (merge-blocker):** `deliverables/HANDOFF-SNAPSHOT-2026-11-20.md` §1 item 4 names
   `test/engine.test.ts` as a fence path "identical at the pin" (line 105 hash `c86a9971…`). **The
   pin `408410477` has NO `colors/test/engine.test.ts`** — `git ls-tree -r 408410477 colors/test`
   returns 52 `.ts` files under `colors/test/core` + `colors/test/nfl`, and no single entry file. The
   cakepanz `test/engine.test.ts` is a 51-line GENERATED import wrapper (`scripts/sync_engine_tests.py`,
   "Regenerated … at the re-pin"). **Fix:** reword fence #4 to "the suite ENTRY is GENERATED by
   `sync_engine_tests.py` from the pin's `colors/test/**` — the merge REGENERATES it, it is not a
   pin-identical file to cmp." And fix `MERGE-MANIFEST.md` §1's "prove `cmp` equality" for
   `test/engine.test.ts` → "regenerate, don't cmp."
2. **D2:** same files call `test/engine/**` "identical" — they are RE-POINTED (import paths rewritten
   by `sync_engine_tests.py`; logic byte-identical). One-word accuracy pass.
3. **D3:** `inbox/20261120-1814-zai-T8-c10-hosts-READY.md` path 1 says `deliverables/receipts/…` but
   the tree uses **`deliveries/receipts/…`** (I verified both byte copies exist, md5 `0a2869…`; path
   2's `deliverables/` is correct). Fix path 1.
4. **D4 (cosmetic):** VERIFY §25.2 quotes "F20 DIED — FAIL L13" but the log's printed line is
   "FAIL L16" (L13 is in the child log). Either file my re-run receipt as the L13 evidence (done) or
   quote the actual line + note L13 is the next FAIL.

## §3 · The gh-pages re-point (waiting on the Owner / you)

Your S13 re-verified 277→286. The patch `claude/patches/cakepanz-test-repoint-2026-11-20.patch`
(Claude's, 12 KB, tests-only, flex 107→99) exists on `architect/engine-and-seats` and is dry-run
clean but **NOT applied to gh-pages**. This is the relay: the Owner (or you, at the deploy) applies
it to `67-cakepanz/` on gh-pages → expect 286/286. Do not force-push; the prior tip is the rollback.

## §4 · Two robustness gaps I hit (worth closing while you're in there)

1. **The standalone batteries lack the falsifier's stale-server guard.** My FIRST board-battery run
   showed 6/10 (L16–L22 fail, `quick=0`) — a leftover preview server on :4179 served a stale build.
   A fresh `vite preview` on a clean port gave 16/0. The falsifier has a D-2 guard (served-hash ===
   this-copy-hash); the **standalone batteries do NOT** — they trust `CP_PORT`. Add the same
   polled-200 + served-index-hash check to `board.battery.mjs` / `slot` / `visual` / `shell` (or at
   least document "kill :4179 first; wait for the 200"). I hit it, so the next seat will.
2. **The verifier's converse check fails on a BUILT tree.** After `npm ci` + build, `node_modules/`
   (2029 files) + `src/engine-node/` (70 generated) are flagged EXTRA, exit 1. The pristine package
   is clean (445/0/0), so the Owner's "run it from the tree root" works on the delivered zip but NOT
   after a build. Add `node_modules/` and `src/engine-node/` to the verifier's SKIP set (or document
   "verify before building"). Minor.

## §5 · The merge handoff (Claude's to execute; your package is ready)

D1 is the only thing to fix before Claude merges (regenerate `test/engine.test.ts`, don't cmp it).
The `dispatchAsync` wiring call sites (App.svelte:148/178/184/208) are exact, `dispatchAsync` exists
at store.ts:147, and the golden must match through the `colors/` paths — all correct. The remaining
UI slices (4/5 acceptance rows, slice 3 receipt) are all BUILT and lawed; the season shell s6–s12 is
BUILT. Nothing is outstanding on your side except the ring restyle (§1) and the four doc fixes (§2).

## §6 · What NOT to do
No engine edits (pin `408410477`, 69 files, byte-identical — keep it). No ratings. No multisport.
No ring behavior redesign (visual restyle only, per §1). No governance-file edits. Do not apply the
gh-pages patch to the deployed tree without the Owner's go (it is a deploy, not a build).

— ERNIE (Kilo seat; signs as ERNIE, never as another seat). Every "VERIFIED" above is my own command
+ output at my machine, 2026-11-20; "REPORTED" is named as such.