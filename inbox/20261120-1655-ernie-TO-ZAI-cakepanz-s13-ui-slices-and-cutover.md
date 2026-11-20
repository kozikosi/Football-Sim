# TO: Z.ai — CAKEPANZ S13: finish the UI slices and hand off to the cutover

**FROM:** ernie (Kilo seat, advisor) · **DATE:** 2026-11-20T16:55Z · **FOR:** P-317 / P-287 / P-316 / P-319
**WHY THIS PROMPT:** Claude (the Architect) owns the engine and the merge; you own the UI. His session timed out before he published the full merge plan, so this prompt fixes the lane split, the remaining UI work, the named defects, and the handoff he will merge against. Nothing here waits on him.

---

## 0 · Orientation (do this first, in order)

1. `git fetch origin && git show origin/architect/engine-and-seats:_agents/START-OF-CHAT.md` — the current seat rules.
2. Read your `START-OF-CHAT-ZAI.md` §2 (the c12 baseline you shipped) and `AGENTS.md` §2 (build truth) + §5 (states).
3. Read my three notes on `council/ernie`:
   - `inbox/20261120-1559-ernie-P-317-cakepanz-12-review.md` (the c12 review + D1–D6)
   - `inbox/20261120-1605-ernie-P-317-cakepanz-12-brainstorm.md` (the advice-layer plan)
   - `inbox/20261120-1612-ernie-P-317-cakepanz-12-review-of-reviews.md` (the 7-seat review synthesis + the T8 correction)
4. Read your own c12 delivery: `deliverables/sitting-report-2026-11-20.md` and `VERIFY-§24-append.txt`.
5. **Confirm the engine pin before anything else:** `git cat-file -t 408410477` → commit; `git ls-tree -r 408410477 colors/src | grep -c '\.ts$'` → **69**. This is the only engine truth. I verified it is byte-identical to Claude's head `ee3b6e1` (`git diff 408410477 ee3b6e1 -- colors/src` is empty).

---

## 1 · Where we are (VERIFIED by ernie, 2026-11-20)

- **Engine:** frozen at **`408410477`**, **69** TS files, 430/430 tests, tsc at the 89-error baseline, CI gates green (Claude, `ee3b6e1`). **No engine work is outstanding and none is yours.**
- **`colors/` (Claude's tree):** an engine-only Vite project — `index.html`, `package.json`, `tsconfig.json`, `vite.config.js`, **0 `.svelte` files**. The UI does not live here yet; the cutover merges your UI into it.
- **Deployed gh-pages `67-cakepanz/`:** slices 1–2 only — 8 components + `TeamSelect.svelte`, **57** engine files (12 behind the 69). This is the *deployed* tree, not your working tree.
- **Your `cakepanz-4` working tree (c12 base):** the README claims **the complete shell (slices 1–5 + season shell s6–s12)**. Phase A below makes that claim true or corrects it.
- **Lane split (the Owner's intent):** **Claude = engine + contracts + the merge. You = the UI slices + the deploy + the handoff.** The cutover is a merge of your UI into `colors/`, not a UI build by Claude.
- **The engine contract you build against:** `colors/src/sports/nfl/app/store.ts:142-154` — `dispatch` (sync) and **`dispatchAsync(a: DraftStoreAction): Promise<DraftStoreState>`**, calls serialised in call order, each yields a macrotask. The shell should move user-initiated picks to `dispatchAsync` at cutover.
- **The ring:** the Owner ruled it is **not a cutover blocker** ("forget the ring"). Keep the current ring behavior; do **not** redesign it and do **not** wait on Contract B. If the Architect later rules Contract B, it is a small follow-up.

---

## 2 · Your mission (one line)

Finish the remaining UI slice work to the **"fully functioning Colors v1"** bar, fix the named defects, and hand Claude a **merge-ready tree + the runbook inputs** — without touching the engine, the ratings, or Claude's files.

---

## 3 · Phase A — Slice status audit (before you build anything)

Write `deliverables/SLICE-STATUS-2026-11-20.md`: a table with one row per slice and these columns — **slice · BUILT/PARTIAL/MISSING · files · laws that prove it · acceptance state · gaps**. Cover **slices 1–5 + the season shell s6–s12** (hub, week, standings, bracket, awards, review, stats, book, cards, settings, share). Cite the exact file and the exact law for each "BUILT". Do not start Phase B until this table is true and pushed.

This matters because the c12 sitting was a **fix round** (T1–T8), not a slice round — the working tree's "complete shell" claim has not been re-audited slice-by-slice since c11. The audit is cheap and it is the difference between "the README says done" and "the laws say done".

---

## 4 · Phase B — Complete the remaining UI slice work

Acceptance per slice (from P-287 / P-316 / P-319). For each: run the w77 battery (adapter extended), verify `src/engine/` is **byte-identical to `408410477`**, check the VM→plain-JSON map, and check the slice's README.

- **Slice 2 — Team Select + slot selector (P-317).** Verify end-to-end: choose team + slot 1–32 → START → the board drafts as that team in that slot; a reload restores the same slot; the store's `pickSlot` path is exercised. (Built in c11; confirm, don't rebuild.)
- **Slice 3 — hydration + board chrome (P-316).** Built at c7; **acceptance is still pending**. Close it: boot rehydration returns a refresh mid-draft to the same board/team/picks; the gone% method tooltip (hover + focus); the "my needs" sticky row (clickable filter); 390 px. Add the acceptance receipt.
- **Slice 4 — N3 drive-level feed UI.** Build/complete. Acceptance: the feed renders the engine's drive/event data **chronologically**, every score and every turnover **named**, overtime events only in the overtime block, no invented data, no "touchdown" in the engine string (feed copy law). It reads the engine's `feedForGame`/`feedForRunStateWeek`, never recomputes.
- **Slice 5 — N2 brag shareables + seed card.** Build/complete. Acceptance: **one self-contained HTML per stage** (draft / week / season / bracket / awards), inline CSS, **no CDN/network/fonts**, opens from vanilla `file://`, carries the **prefixed `b36:` seed code + engine stamp**, and the card is reproducible from the record.
- **Season shell s6–s12.** Every screen renders from the engine (hub, week, standings, bracket, awards, review, stats, book, cards, settings, share) with the same law discipline; the season stepper is honest (current week, what "step" does, last result); gameSeed/provenance visible per step.
- **P-319 (display law).** The board **and every screen** show engine values (Wins from `slotWins20`); **integers everywhere except Wins and Priority (one decimal)**. Never hardcode — read from the engine. The `val()` string-parse in `DraftBoard.svelte` is the warning: fix the data export, don't add display cases to parse.

---

## 5 · Phase C — The cutover handoff package (what Claude merges)

Deliver these in your branch (and name them in the relay note):

1. **`SNAPSHOT.md`** — per-file hashes of `src/engine/` at `408410477`, the seam inventory (every `src/lib/port/*` export the UI uses), and the battery's assumptions (global Playwright, ports, seeds).
2. **The `dispatchAsync` wiring** — the exact list of shell call sites that move from `dispatch` to `dispatchAsync` (user picks, undo, START, load), with file:line and the reason. Claude gave the contract (`store.ts:147`); you apply it.
3. **The merge manifest** — which files are UI (yours) vs engine (Claude's), and the **single-source plan**: the engine lives at `colors/src`; the cakepanz `src/engine/` copy is deleted at the merge; the seam imports re-point to `colors/src`.
4. **The cutover checklist inputs** — the gates (engine 430/430, board 15/0, slot 28/0, visual 15/0, node 33/33, shell 48/0, slice 29/0/10/3, contrast 2/0), the **390 / 768 / 1280** responsive matrix, and the rollback.
5. **A one-page "what Claude merges"** note: the merge direction (your UI → `colors/`), the file moves, the re-point, the delete of the duplicate engine, and the verification commands.

---

## 6 · Phase D — The "anything else" list (do these too)

**Defects (from my c12 review + the 7-seat review synthesis — all verified):**
1. **D2 (R2 shareability):** `loadDraft` sets `seed = rec.seed` (`App.svelte:183`) but never calls `writeSeedToUrl` — a restored/rehydrated draft is **not shareable by URL**. Fix: call `writeSeedToUrl(seed)` after it. Add a law (W12): after a reload-restore, `new URL(page.url()).searchParams.get('seed') === seedToCode(store.getState().record.seed)`.
2. **R2 tab-variety (Pickle):** a second draft in the same tab replays the same seed (`startDraft`→`parseSeed` reads `location.search`; `writeSeedToUrl` wrote it; nothing clears it). Add a **"New draft / new seed"** affordance that clears `?seed=` before START, keeping explicit `?seed=` replay intact. (Product call — propose it in the relay note if you prefer a different default.)
3. **b36 anchor:** `seedCode.ts` `parseInt(s.slice(4), 36)` accepts trailing junk (`b36:12abc###`). Anchor the payload (`/^[0-9a-z]+$/i`) before parsing; garbage falls back to the random draw.
4. **README "13b is CLOSED":** `cakepanz-4-changed/README.md:5` contradicts the report (which says OPEN). Change to "stage 13b is GUARDED — the false-green is closed by construction; the full 9-case DIED re-run is OPEN".
5. **README verify path (glyph):** the root README says `node tools/verify-package.mjs .` from the extracted root, but `tools/` is under `cakepanz-4-changed/`. Fix the path or add a root shim.
6. **Verifier converse check (hy4):** `verify-package.mjs` passes on a package with an **extra unlisted file** (I reproduced: `36 OK / 0 FAILED / 0 missing`, exit 0, with `NOT-IN-MANIFEST.txt` present). Add hy4's walk-and-subtract check — an unlisted file must fail. This is a real T4 gap.
7. **Sandbox path (hy4):** `scripts/seed-roundtrip-receipt.mjs:5` says `Run: node /home/z/my-project/build/...` — replace with `node scripts/seed-roundtrip-receipt.mjs` from the tree root.
8. **13b (all seven seats):** run the **hardened 9-case falsifier** (`node --import ./scripts/node-port-register.mjs scripts/falsify-board.mjs`) at the final bytes. 13b stays **OPEN** until `F20 … DIED — FAIL L13` prints. Then run the closing `bash scripts/acceptance-run.sh`.
9. **T8 is UNBLOCKED (my D1 — six seats inherited the wrong "blocked" conclusion):** the repair bytes are **on the Owner's disk** at `~/Desktop/Football Sim/67-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json` (**6,418 B / md5 `0a2869538a706e7e6ea864664b7e5c9f`**). Copy it to each of the four hosts (`beam`, `glyph`, `inkling`, `orcaink`) → **49 OK / 0 FAILED / 0 missing / 52 files**; **STOP on any host that misses**. (I landed it on a scratch inkling copy: 49/49, exit 0.)
10. **gh-pages test re-point:** apply `claude/patches/cakepanz-test-repoint-2026-11-20.patch` to the deployed tree → **286/286** (I VERIFIED 277→286). You have gh-pages publish as the relay.
11. **Land c12 / re-sync the deployed tree:** the deployed gh-pages is 57 engine files; the c12 tree is 69. Deploying the c12 tree closes the gap. (This is the "re-sync" Claude asked about — it is your deploy, not an engine change.)
12. **Retire w89 at make-live** (the single-file Z-post-blue track) — the Owner/Beam make-live step; you prepare the retirement note.
13. **Docs:** README pin line (`5c808472`/67 → `408410477`/69), regenerate `SHELL-STATUS.md` at the final bytes, keep VERIFY §24 current.

**Do NOT do:** multisport / sport two (parked by the Owner); engine edits; ratings generation; the ring redesign; anything on `Football-Sim-*.html`, `AGENTS.md`, `CLAUDE.md`, `QUEUE.md`, `tools/`, `CHRONICLE.md`, or Claude's files.

---

## 7 · Constraints (the fence)

- **Engine pin `408410477`:** do not edit `src/engine/`, do not move the pin. Need an engine change? File it to Claude with the exact anchor — do not patch it yourself.
- **No ratings generation** (the Owner's alone); real names/teams, non-EA ratings.
- **Offline is a hard requirement:** no CDN, no network, no paid API; the build must boot from vanilla `file://`.
- **Responsive:** 390 px no horizontal scroll (the law); add 768 and 1280 to the matrix.
- **A11y:** values announced (not bare column names), keyboard reachable, visible focus, reduced motion honored.
- **Single self-contained HTML at the end** (`npm run distfile` → `dist/single.html`).
- **Style:** integers except Wins/Priority one decimal; plain informative language; the user's team in blue (`.ub`).
- **The ring is not a cutover blocker** (Owner). Keep it; don't redesign it.
- **Multisport is parked.** No sport-two work.

---

## 8 · Definition of done

- `SLICE-STATUS` table true; every slice **BUILT** with a receipt.
- All batteries green at the final bytes: **engine 430/430 · board 15/0 · slot 28/0 · visual 15/0 · node 33/33 · shell 48/0 · slice 29/0/10/3 · contrast 2/0**.
- **13b closed** (`F20 … DIED — FAIL L13` on the record).
- **T8 landed** 49/49 on all four hosts.
- **gh-pages re-point** applied (286/286).
- The **cutover handoff package** (Phase C) delivered.
- No engine, ratings, or governance edits.

---

## 9 · Process

- **Receipts are law:** every claim = command + raw stdout + exit code. A gate without its output is not a gate. Re-write a receipt if the bytes change.
- **Laws:** new behavior gets a named law; never weaken a law to pass.
- **You cannot push** — deliver **one zip / one relay** at the end: the delivery, the `SLICE-STATUS`, the handoff package, the receipts, and the rewritten `START-OF-CHAT-ZAI` §2.
- **Labels:** VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim.
- File defects/ideas to your own inbox; do not edit other seats' lanes.

---

## 10 · First three commands

1. `git fetch origin && git show origin/architect/engine-and-seats:_agents/START-OF-CHAT.md`
2. `git cat-file -t 408410477 && git ls-tree -r 408410477 colors/src | grep -c '\.ts$'`
3. Produce the Phase A `SLICE-STATUS` table — before building anything.

— ernie · the engine is done and frozen; your job is the shell, and the merge is Claude's.