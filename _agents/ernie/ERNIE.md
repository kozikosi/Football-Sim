# ERNIE — lane file (rewritten each session; never append)

## BOOT — read this first, every session (do not re-derive anything)

1. `git fetch -q origin`, then the **step-0** checkout from `START-HERE` §1 (the four governance docs).
2. Read this file to the end. It is the handover: what is measured, what is open, what not to redo.
3. Then take the next item from the live queue.

## Identity
- **Seat:** ERNIE · **Model / how reached:** ERNIE / API (kilo gateway) · **State:** advisor (admitted by the Owner 2026-11-13); **MUSE co-delegate** (Owner grant 2026-11-18 03:35Z, with Inkling).
- **Good at:** taking a claim apart with a command, and reporting my own refutations.
- **Standing rule:** four lines per claim (cwd · exact command · ref+sha · output). VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim. "No signal" is a result.
- **Worktree:** `/Users/kosi/Desktop/wt/ernie` · **branch:** `council/ernie` · **merge-base with `origin/council/base`:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e` · **pushed tip this session:** `bcbe8faa2`

## Current state (2026-11-19T22:45Z, session end)
- **Nothing in progress.** Worktree clean; everything committed and pushed; ending per START-OF-CHAT §3.

### What I did this session (6 sittings)
1. **Hosted + reviewed Z.ai's item-6 sitting relay** → `inbox/20261119-2039-ernie-item6-sitting-review.md`. Verdict **improved**. Hosted at `_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-item6-sitting/` (`34d68061b`, 14 files, md5 13/13).
2. **Reviewed the other seats' reviews** (Beam/Pickle/Orcaink/VL/OR + Beam's test results + Beam's review of me) → `inbox/20261119-2105-ernie-review-of-seat-reviews.md`. Nine findings G1–G9.
3. **Innovation notes v2** → `inbox/20261119-2055-ernie-cakepanz-shell-innovation-v2.md`.
4. **Replied to Claude on Plan v4** (`80eb432`) → `inbox/20261119-2115-ernie-TO-ARCHITECT-plan-v4-review.md`.
5. **Wrote the next sitting order v3.0 for Z.ai** → `deliveries/zai-next-sitting-prompt-2026-11-19.md` (290 lines).
6. **Ran the vapor-mode experiment** → `_agents/ernie/deliveries/vapor-mode-experiment-2026-11-19/RESULTS.txt`.
7. **Verified Claude's `deb6275`** → `inbox/20261119-2152-ernie-TO-ARCHITECT-deb6275-verification.md`. All four claims VERIFIED, nothing to correct.

### The facts that matter most going forward

**D1 is CLOSED — three independent derivations agreed.** The canonical c10 package is intact: `…/zai-cakepanz-10-2026-11-19/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json`, **6,418 B, md5 `0a2869538a706e7e6ea864664b7e5c9f`** (= CHECKSUMS.txt:18). `council/inkling` and `council/orcaink` are 51 files / **48 OK**; `council/pickle` is 52 files / **49 OK**. **Fix = add that one file at the manifest's own path. Do NOT re-cut the zip, do NOT regenerate the manifests.**

**ORCAINK'S F1 — I reproduced it, the best engineering finding of the round.** The c10 package is a **zero-deletion delta**; a naive unzip-over the c9 tree leaves 4 dist assets where the c10 MANIFEST names 2 → `gate-manifest` FAIL (unlisted ×2). Second consecutive round with this class (c9: missing `.gitignore`; c10: stale dist assets). **Law: `package-delivery.sh` must apply its own delta to a scratch copy of the PREVIOUS artifact and run both gates there.**

**VAPOR MODE IS FALSIFIED — do not re-open.** Same surface: Svelte 5.58 **13,154 B gz** · Vue 3.6.0-rc.15 vdom **26,294** · Vue **VAPOR 31,498** (+19.8% vs vdom, **2.39× Svelte**). The 5 KB falsifier registered 2026-11-15 is exceeded by 17 KB. Vapor engaged genuinely (`__vapor:!0`, `gc()`, `ss()`, zero `createVNode`/`createBlock`) but 99.3% of the bundle is the vapor runtime. **The trap: plugin-level `vapor: true` silently does nothing (byte-identical output); only the per-file `<script setup vapor>` marker engages.** Vapor's real value was always runtime DOM elimination, not bundle size — a per-page lever for a *measured* perf problem, post-v1.1, not a framework argument.

**MY CORRECTED F2 — the complete diagnostic (see G1).** `fee5c2fd8` is a **dangling commit** (parent `77501b15` on no ref) carrying a tree-identical c10 package (`0d046220…`). Ancestry fails *because* of that, and always would. **Presence → `git ls-tree`; provenance → ancestry; a dangling commit's ancestry proves nothing about a ref.** Pickle's shallow-history hypothesis was false (no `.git/shallow`; `17d602720` = complete 11-commit history rooted `9dda473be`).

**CLAUDE'S `deb6275` — VERIFIED, nothing to correct.** Pairing range is **+3% to +26%** (his four like-for-like ratios: +16/+26/+3/+13%; I withdrew my earlier +29%). Throughput header now factually accurate (pack `params.lambda = 0.0`; `throughput.ts` does not override it, unlike `crn-efficiency.ts` which sets `lambda: 1`). 421/421 tests + tsc 89/89 hold (I re-ran; he didn't). Scope: 3 files, all his, no `src/`, no pins.

**THE VITE RECONCILIATION IS ONE TREE, not three.** Laggard: `67-cakepanz/package.json` (gh-pages) + c10's `cakepanz-4/package.json` = `vite ^7.3.6` / `plugin-svelte ^6.2.1`. **ALREADY on the decided pair:** rev10 arms `^8.3.0`/`^7.2.0`; Architect `colors/` `^8.3.6`/`^7.3.1`. Move vite + plugin **together** (Node ≥ 22.12 is the floor).

**HIS λ PREMISE IS CORRECT.** `game.ts:87` = `tilt(base, pc.theta, pc.lambda, opts.passGap ?? 0)` — one scalar `passGap` per game, both offenses alike. So item-6 measures *tilt strength*, not λ; the per-offense gap ratings track is the only path to λ. All three sources agree (recipe line 48, tool header, Z.ai's refusal to interpret).

**ITEM-6 HAS LANDED and is platform-independent.** My re-run of both 20k arms matched Z.ai's Linux/Node-24 bytes on macOS/Node-26 — all four hashes + both stdout tables `diff`-identical. Files: `_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-item6-sitting/deliveries/item6/` (`6e9168ec…`, `513b9130…`). The `edd56bf1` wording fix is provably output-neutral.

**THE C′1 RING IS A LIVE BUG, unfixed.** 60/60 rows ringed at pick 27 (measured twice: mine + Beam endorsed); L13 passes because it rebuilds its expectation with the component's own rounded parse (`board.battery.mjs:90-98`), while the engine sorts on raw 1e-9 (`draft.ts:98`) and the VM strips it at export (`draftBoard.ts:61`). **One-line fix (rank on the raw key) — but product changes are the Architect's.**

**PART 0 IS ACCEPTED (Owner, 2026-11-19).** Working bytes `76de5658…` (527,162 B) are the release candidate; the two GitHub folders stand as artifact paths; **no re-cut zip**. Measured diff (delivered `670d4c08…` 527,177 B vs working): `keepWeek` 0→2 · `cp-gonehow` 0→2 · `aria-hidden` 0→1 · `:focus` 1→0 · `.cp-gonetip` `width:200px` + a `.cp-main:focus` leg → `width:min(240px,calc(100vw - 32px))` with no focus leg.

**THE FRAMEWORK IS DECIDED: Svelte 5 + Vite 8** (Owner, 2026-11-19, final; R-13 closed; live on `council/muse`). React out, dependency removal queued for cutover. Do not re-litigate; a doc saying "50/50" is history.

**THE LIVE DIRECTIVE (Owner, 2026-11-18T22:31Z, verbatim in `_agents/owner-notes/2026-11-18-owner-note-sim-values-after-ship.txt`):** *"I don't want you or claude or the council to spend too much more time trying to get the sim values to line up super aligned with the historical data. i would rather we get the engine overall finished and then you can tinker with values and historical accuracy after we have shipped."* → **per-metric historical alignment is PARKED until after ship.**

**THE OWNER'S RULINGS THIS SESSION (2026-11-19 evening):** Part 0 **accept** · distribution = **folders, no re-cut** · **"guide z.ai to fix the solution himself with his own intuition"** (so the doc-line wording is Z.ai's, not mine) · **w89's layout is better than the current cakepanz shell** (a product signal not yet in the queue — I could not measure it; §7.2 of Z.ai's order asks him to, structure only) · **Vue arm: retire** (archive, not delete — it holds a full engine copy, the M1–M5 portability evidence) · **"consider adding vapor mode to individual pages in the future if it would help"** (recorded as post-v1.1).

## What the next session needs
1. **Read `deliveries/zai-next-sitting-prompt-2026-11-19.md` first** — it is the live order for Z.ai and it carries the Owner's two rulings. If Z.ai's zip comes back, review it against §9/§10 of that order.
2. **The w89-vs-cakepanz layout comparison is the highest-value open question.** The Owner prefers w89's layout; I cannot measure it (no browser). If a seat with a browser reports it, that may redirect the shell more than any single law.
3. **The C′1 ring fix is one line and still unfixed** — but it is the Architect's to make, not mine.
4. **B1 (`?seed=`) is the highest-leverage shell item** — precondition for deterministic battery runs *and* for Pickle's L1 (paired what-if, the best product idea in the round).

## 1 · What not to redo
- **Do not re-run item-5 or item-6.** Both done, receipted, platform-independent. Item-5: GLM stays OFF, λ 0 (within 1.6% of the pools node on every metric, both packs). Item-6: hashes in §0 above.
- **Do not re-cut the c10 zip** and **do not regenerate the c10 manifests.** The package is intact; two hosts need one file added.
- **Do not re-run the vapor experiment.** Settled; receipts in the lane.
- **Do not re-derive the pairing arithmetic.** +3% to +26%; `crn-efficiency.ts` is deterministic (1.98 at s=1 yards, every N).
- **Do not measure the C′1 ring a fourth time.** Two measurements exist (mine + Beam's endorsement). It is a product fix, not a measurement gap.
- **Do not edit `src/`, `dist/`, pins, the engine, or the framework decision.** My lane edits docs and inbox only.
- **Do not touch other seats' lanes** — report the finding instead.

## 2 · What is genuinely open
1. **The w89-vs-cakepanz layout question** — Owner signal, unmeasured, potentially redirects the shell.
2. **The C′1 ring one-line fix** — Architect's product change.
3. **The L13 tautology (generalizable)** — a law that recomputes its expectation with the code under test inherits its bugs. Same class as P-365's gone% law. Fix: derive expectations from the engine, not the DOM.
4. **Orcaink's delivery law (now a class)** — `package-delivery.sh` applies its own delta to a scratch copy of the previous artifact and runs both gates there.
5. **The packaging gap** — the c10 `cakepanz-4/` ships no `package.json` and no `src/lib/port/`, so its own battery cannot run from the package. UPDATE-README should name the overlay tree.
6. **The vite reconciliation is ONE tree** — `67-cakepanz/package.json` (gh-pages) + c10's `cakepanz-4/package.json`. Architect's cutover task.
7. **B1 (`?seed=`)** — the shell's `App.svelte:109` is `seed = 1000 + Math.floor(Math.random() * 9000)`, session-local. Precondition for L1 and for deterministic batteries.
8. **The four sim-layer survivors** — PARKED by the 22:31Z directive.
9. **P-333** — VL's `DT→ILB = 6` is the only surviving lever; PARKED for calibration, harness live.
10. **PROJECT-KNOWLEDGE.md antiquation** — still deferred; coordinate with Inkling (co-custodian).

## 3 · Live files (mine)
- **THIS SESSION'S SITTING ORDER (read first):** `deliveries/zai-next-sitting-prompt-2026-11-19.md` (v3.0, 290 lines).
- **THIS SESSION'S VERIFICATION OF CLAUDE:** `inbox/20261119-2152-ernie-TO-ARCHITECT-deb6275-verification.md` (all four claims VERIFIED).
- **THIS SESSION'S SITTING-ORDER PREDECESSOR:** `inbox/20261119-2115-ernie-TO-ARCHITECT-plan-v4-review.md` (the `80eb432` review that produced the `deb6275` corrections).
- **THIS SESSION'S SEAT-REVIEW REVIEW:** `inbox/20261119-2105-ernie-review-of-seat-reviews.md` (G1–G9; **G1 is the corrected, complete F2**).
- **THIS SESSION'S ITEM-6 REVIEW:** `inbox/20261119-2039-ernie-item6-sitting-review.md` (F1–F6).
- **THIS SESSION'S INNOVATION NOTES:** `inbox/20261119-2055-ernie-cakepanz-shell-innovation-v2.md`.
- **VAPOR RECEIPTS:** `_agents/ernie/deliveries/vapor-mode-experiment-2026-11-19/RESULTS.txt` (with reproduction steps and the plugin-vs-per-file trap).
- **HOSTED DELIVERY:** `_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-item6-sitting/` (`34d68061b`, 14 files, md5-verified).
- **Bulletins this session:** `20261119-2100`, `20261119-2110`, `20261119-2120`, `20261119-2145`, `20261119-2155`.
- **Prior handoff plan (still relevant):** `inbox/20261119-0351-ernie-handoff-plan-definitive.md`.

## 4 · Method notes worth keeping
- **Prove package presence with the TREE, not ancestry.** `git merge-base --is-ancestor` answers "was this commit pushed", not "is this path there". For a relay-imported package the pushing commit may be nowhere on any ref while the tree is on several. Use `git ls-tree <ref>:<dir>/`.
- **A dangling commit's ancestry proves nothing about a ref.** Check `git cat-file -p <sha>` for the parent and test whether the parent is on any ref. `fee5c2fd8`'s parent `77501b15` is on none — that is *why* ancestry failed.
- **To find a file across every ref and hash each distinct blob:** `for r in $(git for-each-ref --format='%(refname)' refs/remotes/origin | grep council/); do git ls-tree -r "$r" | grep '<path>'; done` then `git cat-file -p <blob> | md5 -q`. Distinct blobs with identical outcomes = the unseeded seam.
- **`md5 -c` is silent on macOS** (`/sbin/md5` prints nothing and exits 0 even on failure). Use `while read -r h p; do [ "$(md5 -q "$p")" = "$h" ] || echo "FAIL $p"; done < CHECKSUMS.txt`. Z.ai's "48 OK / 1 FAILED" came from `md5sum`, which behaves correctly.
- **A battery that recomputes its expectation with the code under test cannot catch a bug in it.** L13 and P-365's gone% law are both this shape.
- **A gate count is a checksum of the tree** (re-confirmed): cakepanz-10 shipped `313` → `314` the moment `.gitignore` was restored. Off-by-one ⇒ look for a missing dotfile first.
- **"Neutral" is ambiguous: always check whether the pass-class node is active.** `loadPassClass(pack)` carries the pack's own `lambda` (0 in both shipped packs), so "λ = 0" does NOT mean "no GLM" — the class marginal is replaced before the tilt. Prove it: run 200 paired games with and without `passClass`; if every game differs, the GLM is active.
- **Same-metric ratios only, when quoting a "X% more" claim.** Dividing one metric's factor by another's manufactures a number (yards 3.6 ÷ points 2.2 = "+64%"). That is exactly how the plan's "+15–60%" arose.
- **The Architect's tools are outside tsc scope** (`colors/tsconfig.json:29` excludes `tools`), so "tsc 89/89" is not a check on `tools/*.ts`.
- **Tests need the WHOLE repo.** `tools/mathlab/flex.json` and `tools/mathlab/witness.mjs` are read by two suites; a partial extract gives 382 tests / 2 fail. Full extract = 421/0.
- **Vapor's trap:** plugin-level `vapor: true` silently does nothing (byte-identical output hash). Only `<script setup vapor>` engages. Check for `__vapor:!0` in the emitted chunk before trusting a number.
- **The Vue arm holds a full engine copy** (6,157 lines, `src/engine/sports/nfl/…`) — that is its only value beyond the bake-off, and why it should be archived rather than deleted.

## 5 · Pending (not mine)
- `/Users/kosi/Desktop/Football Sim` (gh-pages, 20,251 dirty) — Owner's tree, not mine to touch.
- Unsaved work in other seats' worktrees (flint 452 dirty, ds 15, dsd 2, beam 1, boc 1, architect-colors 1 detached) — report only.

## 6 · Session end state (2026-11-19T22:45Z)
- Worktree clean; `council/ernie` pushed; tip `bcbe8faa2` (VERIFIED by `git ls-remote`).
- **Re-rook audit (inkling's A–G): partially executed, unchanged from prior sessions.** A verified · B verified · C incomplete (2,416 unique hex tokens collected; classification not finished) · D/E not run.