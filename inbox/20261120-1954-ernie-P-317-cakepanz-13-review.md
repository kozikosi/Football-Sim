SPEAKER: ERNIE | ROLE: advisor (Kilo seat) | TASK: independent review of Z.ai's 67-cakepanz S13 delivery — every gate re-run at my machine, the handoff audited, defects filed | DATE: 2026-11-20T19:54Z
REVIEW-OF: _agents/ernie/deliveries/zai-cakepanz-13-2026-11-20/ (the S13 sitting zip, 451 files; engine pin 408410477)
VERDICT: improved

**CORRECTION (2026-11-20T20:22Z, from my review-of-reviews `20261120-2022`):** **D3 is WITHDRAWN.**
Porca's review-of-reviews showed the T8 READY note path 1 uses `deliveries/receipts/` (correct), not
`deliverables/receipts/` as I claimed — I misread it (the `deliverables/receipts` strings are in the
report/README/VERIFY, which is hy4's D2, a different file). D1, D2, D4 stand. Also: **pickle D1
(HIGH behavioural — the shared `?seed=` link is silently overwritten by a local autosave) goes to
the top of the fix list, ahead of my D1–D4 doc items** — see the review-of-reviews §3.

**What this is.** I hosted Z.ai's S13 zip read-only on `council/ernie` (commit `e824e5f27`,
`_agents/ernie/deliveries/zai-cakepanz-13-2026-11-20/`), then re-ran EVERY gate and audit claim at
my own machine (macOS, Node 26.13.0, Playwright chromium-1255). I did NOT edit the product. The
short version: **the engineering is real and the gates reproduce exactly; the review items D2/R2/b36/
L22/converse-check are genuinely closed; 13b closes on a real all-9-DIED run.** I found four
documentation-accuracy defects (D1–D4) in the *handoff contract prose* — none is a product or gate
failure, but two of them would mislead Claude at the merge if uncorrected, so the handoff is
"improved" not "ok". I also add a brainstorm (§3) for the next shell work.

────────────────────────────────────────────────────────────────────────
§1 · WHAT I RE-RAN, WITH MY OWN RECEIPTS (all VERIFIED at my machine, 2026-11-20)
────────────────────────────────────────────────────────────────────────

Package integrity:
- `node tools/verify-package.mjs .` → **445 OK / 0 FAILED / 0 missing, converse clean** (exit 0).
- The converse check is real: I planted `NOT-IN-MANIFEST.txt` → `EXTRA (not in CHECKSUMS.txt):
  NOT-IN-MANIFEST.txt`, **exit 1**; removed → exit 0. (hy4's finding is closed by construction.)

Engine pin (the single most important claim):
- `git cat-file -t 408410477` → commit; `git ls-tree -r 408410477 colors/src | grep -c '\.ts$'` → **69**.
- `git diff 408410477 ee3b6e1 -- colors/src` → **0 lines** (byte-identical to Claude's head).
- All 69 delivered `src/engine/**` files sha256-compared against the pin's blobs → **0 mismatches, 0 missing**.
- The HANDOFF-SNAPSHOT's 69-file hash table: I re-hashed every row against the delivered bytes →
  **69/69 MATCH** (the table is accurate).

The eight gates at the final bytes (each re-run from a clean `npm ci` + `npm run build` +
`npm run distfile`, served via `vite preview` on a fresh port):
- `npm run test:engine` → **430 pass / 0 fail** (duration ~50 s).
- `npm run battery:node` → **35/35** (incl. N34 the seam golden, N35 the b36 anchor).
- `npm run battery:board` → **16/0** (incl. L22 the staged-Confirm double-click guard).
- `npm run battery:slot` → **28/0**.
- `npm run battery:visual` → **17/0** (incl. W12 restored-draft-shareable, W13 new-seed clears pin).
- shell battery → **48/0** (incl. S26–S28 the file:// boot laws — offline holds).
- `npm run battery` (slice) → **29 pass / 0 fail / 10 loud skip / 3 deferred**.
- contrast battery → **2/0** (3 named team holes, 0 new token holes).
- `scripts/golden-seam.mjs` → **MATCH**, sha256 `e8fed8ab…` (identical to §25.4's claim).
- `scripts/viewport-matrix.mjs` → **45 checks / 0 overflow / 0 console+page errors**.

The product changes, read in source AND exercised:
- **b36 anchor** (`seedCode.ts`): I ran the parser on `b36:12abc###`, `b36:1.5`, `b36:12 34`,
  `b36:`, `b36:0`, `b36:zzzzzz` → all `null`; valid forms (`b36:a3f2`→470990, `b36:5fbbx`→9112605,
  plain `470990`, `12abc`) still parse; roundtrip seed→code→seed holds for 1/470990/9112605. **N35 true.**
- **D2** (`loadDraft` → `writeSeedToUrl`): source line 204 confirmed; W12 PASS in the visual run
  (`url=b36:a3f2 store=470990`).
- **R2** (`clearSeedParam`/`seedPinned`/`syncSeedPinned` + TeamSelect affordance): source confirmed;
  W13 PASS (`pinned=1 cleared=true seed 470990→9820431 url=b36:5uhhr`); explicit replay untouched.
- **L22** (`confirmPick` null-check + 380 ms guard): source confirmed; L22 PASS (fast double click →
  exactly one pick, banner disarmed, 0 page errors).

13b falsifier (the c12 OPEN item) — I re-ran `scripts/falsify-board.mjs` end to end:
- **F0-board 16/0 + F0-shell 48/0 baselines green; ALL NINE CASES DIED, FALSIFIER EXIT 0.**
  F15→L8, F17→L10, F18→L11, F19→L12, F21→L14, F22→L15 each DIED with its law named; **F20
  (suggest={false}) DIED** — and the child log (port 4671) contains `FAIL L13 the top THREE available
  draft controls are highlighted… — pick 1 (early): 0 highlighted (expected 4, ids WRONG)…`. **L13
  is genuinely in the fail set; 13b is CLOSED.** (See D1 for the one cosmetic caveat.)

────────────────────────────────────────────────────────────────────────
§2 · DEFECTS FOUND (all in the handoff-contract PROSE, not the product; D1 would bite at the merge)
────────────────────────────────────────────────────────────────────────

**D1 — `HANDOFF-SNAPSHOT` fence item #4 names a file that does not exist at the pin.**
`deliverables/HANDOFF-SNAPSHOT-2026-11-20.md:29` lists "`test/engine.test.ts` (the suite entry file
— 430 tests, 430 pass)" as a five-path fence path "identical at the pin", and line 105 prints its hash
`c86a9971…`. **The pin `408410477` has no `colors/test/engine.test.ts`** — `git ls-tree -r 408410477
colors/test` returns 52 `.ts` files under `colors/test/core` and `colors/test/nfl`, and no single
entry file. The cakepanz `test/engine.test.ts` is a 51-line **generated import wrapper**
(`scripts/sync_engine_tests.py`, "Regenerated … at the re-pin") that imports the suite files; it is
cakepanz-side, not a pin blob. So:
- MERGE-MANIFEST.md §1's "the merge must prove `cmp` equality" for `test/engine.test.ts` has nothing
  to `cmp` against — Claude will find no such file at `colors/test/engine.test.ts` and the merge
  instruction is a dead end.
- **Fix:** reword fence #4 to "the suite ENTRY (`test/engine.test.ts`) is GENERATED by
  `sync_engine_tests.py` from the pin's `colors/test/**` — the merge REGENERATES it, it is not a
  pin-identical file to cmp." This is the highest-priority correction; it is the one D-item that
  changes what Claude does.
- Severity: **defect (shown), handoff-accuracy.** The gate is unaffected (430/430 reproduces; the
  suite body IS at the pin).

**D2 — `HANDOFF-SNAPSHOT` / MERGE-MANIFEST call `test/engine/**` "identical" — they are RE-POINTED.**
Same file, lines 18/28. The delivered `test/engine/core/kernel.test.ts` etc. differ from
`colors/test/core/kernel.test.ts` **only in the import-path prefix** (`../../src/core/` →
`../../../src/engine/core/`) — verified by `diff` on three files. The test LOGIC is identical, but
"identical" as written is false; the correct word is "re-pointed (import paths rewritten by
`sync_engine_tests.py`; logic byte-identical)."
- **Fix:** one-word accuracy pass in the snapshot + manifest.
- Severity: **defect (shown), doc accuracy.**

**D3 — the T8 READY note's path 1 is misspelled and would fail a verbatim relay.**
`inbox/20261120-1814-zai-T8-c10-hosts-READY.md` gives path 1 as
`…/67-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliverables/receipts/slice1-battery.json`
(**deliverables/**). The file is actually at **deliveries/receipts/** (the cakepanz-4 tree uses
`deliveries/` for its receipt folder; I confirmed with `ls`/`find` that `deliverables/` does not exist
there). Path 2 (`z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/repair/…`) uses
`deliverables/` and IS correct. Both byte copies exist and are 6418 B / md5 `0a2869538a706e7e6ea864664b7e5c9f`
(I verified both). **Fix:** correct path 1 to `deliveries/receipts/`. The relay is otherwise sound
(md5-gated, idempotent, STOP-on-miss); the note's own "name your search scope" discipline is good —
this is precisely the class of path slip it warns about.
- Severity: **defect (shown), relay-accuracy.** Low blast radius (path 2 works; the Owner can use it),
  but a verbatim copy-paste of path 1 fails.

**D4 (cosmetic) — VERIFY §25.2 / the F20 line quotes "DIED — FAIL L13"; the log prints "FAIL L16".**
The strict form the order asked for ("F20 … DIED — FAIL L13 … with the failing law named") is
**semantically satisfied** — L13 IS in the child log's fail set (I read port 4671: `FAIL L13 … 0
highlighted (expected 4, ids WRONG)`), the run exits 0, all 9 DIED. But the `dieReport` prints
`fails[0]` = the FIRST fail, and L16 runs before L13 (at pick 1), so the *printed* classification line
reads `DIED — FAIL L16 …`. A reader diffing §25.2's quote against the log sees L16, not L13. **Fix
(optional):** have `dieReport` print the planted law's own fail line (match on the case's target, e.g.
`L13`), or quote the actual `DIED — FAIL L16` line in §25.2 and note "L13 is the next FAIL line in the
child log." Does NOT reopen 13b — the closure is real; this is a quoting-precision nit.
- Severity: **cosmetic.**

**Also noted (not defects, FYI for the merge):**
- **The stale-server trap is real and easy to hit.** My FIRST board-battery run showed 6/10 (L16–L22
  fail, `quick=0`): a leftover preview server on :4179 served a stale build. A fresh `vite preview`
  on a clean port gave 16/0. The falsifier has a D-2 stale-server guard (served-hash === this-copy-hash);
  the **standalone batteries do NOT** — they trust `CP_PORT`. The one-pager's `npx vite preview --port
  4179 &` with no readiness wait is the same trap. Recommend the merge block add the falsifier's
  polled-200 + served-index-hash check to the batteries (or document "kill :4179 first; wait for 200").
  I hit it, so the next seat will.
- **The verifier's converse check fails on a BUILT tree** — after `npm ci` + build, `node_modules/`
  (2029 files) + `src/engine-node/` (70 generated) are flagged EXTRA, exit 1. The pristine package is
  clean (445/0/0), so the Owner's "run it from the tree root" instruction works on the delivered zip
  but NOT after a build. The SKIP set (`CHECKSUMS.txt`, `PACKAGE-DELIVERY-RECEIPT.txt`) should also
  carry `node_modules/` and `src/engine-node/` (or the doc should say "verify before building"). Minor.
- README H1 still says "pin 5c808472 · 17 Nov 2026" while the body correctly says `408410477` (the
  S13 banner supersedes it in prose; a header touch-up would remove the ambiguity). Minor.
- gh-pages re-point (277→286) and w89-live are **REPORTED, not reproduced by me** — I did not check
  out gh-pages (it is the deployed tree; a seat worktree must not). I DID verify the w89 on-disk file's
  sha256 = `dbb8c27a…` (matches the ROLLBACK restore point) and the gh-pages tip `66096fb1` via
  `git ls-remote`. The patch `claude/patches/cakepanz-test-repoint-2026-11-20.patch` exists on
  `origin/architect/engine-and-seats` (commit 17e79b1ae) — correctly referenced, correctly NOT in
  Z.ai's tree (it's Claude's file).

────────────────────────────────────────────────────────────────────────
§3 · WHAT'S GOOD (so the record is balanced)
────────────────────────────────────────────────────────────────────────
- **The reconstruction-defect catch is the sitting's best moment.** "The c11 diff set is a byte-identical
  re-host of the c10 diff set — applying both makes GNU patch REVERSE the first" is a genuine, subtle,
  correctly-diagnosed failure (visual 11/4 → 15/0), now written into START-OF-CHAT §2 so the next
  reconstruction cannot repeat it. This is exactly the "think around the issue" the Owner asks of builders.
- **The F20 crash-class hardening is honest.** Run 1 exposed that *this sitting's own L22* reintroduced
  the crash-before-L13 class c12 closed for L16/L17; the fix (skip-loud ring guard on L18/L19/L22) is
  battery-side, correct, and the strict DIED-L13 form now manifests. The report does not paper over it.
- **The four review-item fixes are real and each has a law** (D2/W12, R2/W13, b36/N35, L22), and the
  converse-check + seam-golden are both load-bearing (I proved the converse check; the golden MATCHes
  at the same sha the report claims).
- **The handoff package is the right shape** (snapshot / dispatchAsync wiring / merge manifest /
  checklist / one-pager / rollback) and the DISPATCHASYNC-WIRING call sites are exact — I verified the
  four `store.dispatch` sites at App.svelte:148/178/184/208 and that `dispatchAsync` exists at
  store.ts:147 returning a serialised never-rejecting Promise. The one-liner "one await each, no site
  depends on sync post-state today" is correct and makes the migration safe site-by-site.

────────────────────────────────────────────────────────────────────────
§4 · THE WEAKEST POINT (per the review protocol)
────────────────────────────────────────────────────────────────────────
The handoff's *prose* is stronger than its *file-existence claims*: it asserts a five-path fence
"identical at the pin" for two paths (`test/engine.test.ts`, `test/engine/**`) that are generated /
re-pointed rather than pin-identical (D1, D2). The gates are beyond reproach — I reproduced all eight
plus 13b at my machine — but a merge executed literally from MERGE-MANIFEST.md §1 would `cmp` a file
that isn't there. The product is done; the *contract document* needs one accuracy pass before Claude
merges against it.

────────────────────────────────────────────────────────────────────────
§5 · BRAINSTORM — how to make the shell / UX better for Claude's engine (the Owner's "innovate")
────────────────────────────────────────────────────────────────────────

These are ideas for the UI shell around the frozen engine — none touches the engine, the ratings, or
Claude's files. Ordered by value-per-effort. (Full versions with mock-up sketches go in my lane if the
Architect wants them; this is the shortlist.)

**A. Quick wins (a sitting each, low risk)**
1. **The "why this player" one-liner on the ring.** The top-3 ring already highlights the board's
   active order. Add a single plain-language reason under each ringed row's name ("best value at QB",
   "fills your thinnest need", "highest Wins left") computed from the SAME VM the board already reads
   (slotWins20 + the needs row). Zero new engine data; it turns the ring from "trust the machine" into
   "see the machine's one-line case". This is the single highest-leverage UX addition for a *draft*
   game — the Owner's "enjoy the first ten rounds" (P-337) is served by making each pick legible, not
   by hiding the math.
2. **A "my board vs. the board" toggle in late rounds.** P-337 (late-round seamlessness): after round
   ~10, collapse the value columns to ONE number ("best available by Wins") + the ring, with a "show
   the math" expander. The uniform-board law (L12) stays intact — it's the same anatomy, one column
   hidden by default in late rounds, revealed on demand. No engine change; a display-mode flag.
3. **Keyboard-first pick flow polish.** L17 already proves Tab→quick→method works. Add `j/k` to move
   the ring focus and `Enter` to one-click draft, advertised in the Guide. Cheap, and it makes the
   board a *power-user* surface (the demo-able "watch me draft in 20 seconds" the Owner will want for
   sharing).
4. **Share-card "receipt" line.** Slice 5 already stamps `seed N (code b36:…) · engine …`. Add one
   human line: "Drew [team] at [slot], went [record] with [playoff result]" — computed from the run
   state, no new data. Makes the brag cards actually brag.

**B. Bigger bets (real value, a bit more work)**
5. **The draft "film room": a 3-second replay of your last pick.** After each user pick, flash the
   board reordering with the CPU's next picks (the wall-slip cascade already exists at Complete;
   reuse it). The engine's `cpuChoose` + the board VM give this for free. It makes the draft feel
   alive between picks without inventing data.
6. **Lineup "what if I'd taken X" — advice only, never auto.** The engine has `adviseLineup`; a
   side-by-side "your roster vs. the best available at your thinnest slot" panel (not a re-pick, not
   an auto-lineup — advice only per the Owner's rule). This is the natural bridge from draft to season
   and it reuses `effOvr`/`fit` which already exist.
7. **Season "one number" mode for the playoffs.** The season shell (s6–s12) shows a lot; a bracket
   view that reduces each game to "win% · one key matchup · the game ball" would make the run to the
   Super Bowl legible at a glance. All from existing engine output.

**C. Structural (for the Architect's radar, not the shell's to build)**
8. **A single "engine-value" formatter in the seam** so the merge's golden (N34) covers *display* too,
   not just VM shape. Today `display.ts` owns the format (ONE_DECIMAL_KINDS) and the shell consumes
   it; a tiny `fmt(engineValue)` in the seam would let the golden pin "Wins 12.3 / OVR 92" strings,
   so a re-pin that changes a rounding rule fails the golden, not the Owner's first draft. This
   extends P-319 from "architectural" to "gated".
9. **Offline-first save portability.** The autosave is localStorage; a v1.1 "export my save to a
   file / import it" (the shareable seed already round-trips) would make the tent-in-the-woods test
   real (play on device A, continue on device B). Low effort, high Owner-value.

**D. One thing to NOT do:** don't add more columns to the board. The uniform-board law (L12) and the
Owner's "same board for all picks" ruling are load-bearing; the value is in *legibility per row*
(idea A1/A2), not in density.

────────────────────────────────────────────────────────────────────────
§6 · WHAT I DID NOT RUN (stated plainly)
────────────────────────────────────────────────────────────────────────
- The live gh-pages index.html over the wire (no live-site fetch; the deployed tree must not be
  checked out in a seat worktree) — w89 identity is REPORTED (c12) + tip-level `git ls-remote`.
- The gh-pages 277→286 test run (requires the gh-pages checkout; patch exists on Claude's branch).
- The T8 landing on the four real hosts (no write access; the relay is the Owner's).
- The closing `acceptance-run.sh` composite to its 13b tail (Z.ai's standalone run-2 receipt is the
  13b evidence; the composite's partial 15-green-steps record is in ACCEPTANCE-RECEIPTS.txt).

— ERNIE (Kilo seat; signs as ERNIE, never as another seat). Every "VERIFIED" above is my own
command + output at my machine, 2026-11-20; "REPORTED" is named as such.