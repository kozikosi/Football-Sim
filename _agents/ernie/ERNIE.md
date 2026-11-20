# ERNIE — lane file (rewritten each session; never append)

## BOOT — read this first, every session (do not re-derive anything)

1. `git fetch -q origin`, then the **step-0** checkout from `START-HERE` §1 (the four governance docs).
2. Read this file to the end. It is the handover: what is measured, what is open, what not to redo.
3. Then take the next item from the live queue.

## Identity
- **Seat:** ERNIE · **Model / how reached:** ERNIE / API (kilo gateway) · **State:** advisor (admitted by the Owner 2026-11-13); **MUSE co-delegate** (Owner grant 2026-11-18 03:35Z, with Inkling).
- **Good at:** taking a claim apart with a command, and reporting my own refutations.
- **Standing rule:** four lines per claim (cwd · exact command · ref+sha · output). VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim. "No signal" is a result.
- **Worktree:** `/Users/kosi/Desktop/wt/ernie` · **branch:** `council/ernie` · **merge-base with `origin/council/base`:** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e` · **pushed tip this session:** see §6.

## Current state (2026-11-19T23:15Z, session end)
- **Nothing in progress.** Worktree clean; everything committed and pushed; ending per START-OF-CHAT §3.

### What I did this session (this chat)
1. **Hosted Z.ai's v3 sitting relay verbatim** → `_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/` (23 files, 213,471 B; CHECKSUMS 22/22 OK by my own `md5 -q` loop).
2. **Reviewed it against the artifacts** → `inbox/20261119-2258-ernie-zai-v3-sitting-review.md`. Verdict **improved**; findings F1–F8; every byte-level claim reproduced.
3. **Shell innovation v3** → `inbox/20261119-2305-ernie-cakepanz-shell-innovation-v3.md` (I17–I29).
4. Bulletin `20261119-2315-ernie.md`; this lane rewritten.
5. **Reviewed the three new seat reviews** (Pickle P-287, Pickle P-345, Beam cakepanz-10) → `inbox/20261119-2342-ernie-review-of-seat-reviews-v3.md`. Pickle's D1 + D2 and R1 all reproduce; Beam's headline check does not; my F1 is withdrawn in the review file and here.
6. **Verified Claude's `da0cf927`** (S3 snapshot + S4 async twins) → `inbox/20261120-0145-ernie-da0cf927-verification.md`: 427/427 and tsc 89/89 reproduce at the pushed bytes (421/421 at the parent); one risk (F1: `dispatchAsync`'s chain is poisoned by a throwing subscriber). Re-verified the fix `92f87f7e`: 428/428, tsc 89/89, and the new test **dies without the fix** (14 pass / 1 fail).
7. **Reproduced the passGap study `ed16fd8f` from public data** → `inbox/20261120-0215-ernie-passgap-verification.md`: every headline number reproduced (187,644 dropbacks, 320 team-seasons; split-half 0.539/0.364; slopes 0.966/0.869/0.939; λ 6.89 / 6.83 / 7.13). Three caveats: λ is θ-dependent (θ chosen, not fitted), split-half is schedule-fixed (year-to-year 0.448/0.206 is the transferable number), and the reading rule is self-reported (same commit as the results).

### What I did in the earlier sittings today (still relevant)
- Reviewed Z.ai's **item-6** relay (`inbox/20261119-2039-…-item6-sitting-review.md`, improved, F1–F6) and the other seats' reviews of it (G1–G9).
- **Innovation v2** (`inbox/20261119-2055-…-cakepanz-shell-innovation-v2.md`) — the spine the v3 note extends.
- Replied to Claude on Plan v4 `80eb432`; **verified Claude's `deb6275`** (all four claims VERIFIED).
- Wrote **Z.ai's v3.0 sitting order** (`deliveries/zai-next-sitting-prompt-2026-11-19.md`, 290 lines) — the order this sitting's relay answers.
- Ran the **vapor-mode experiment** (`_agents/ernie/deliveries/vapor-mode-experiment-2026-11-19/RESULTS.txt`).

## The facts that matter most going forward

**Z.ai's v3 sitting is BYTE-CLEAN (VERIFIED by me, 2026-11-19T23:00Z).** Everything I could reach from this worktree reproduced: the c10 repair (path, 6,418 B, `0a286953…`, sha256 `3e6476de…`, == CHECKSUMS.txt:18 on all three hosts; inkling/orcaink have no `deliveries/` dir there; the c9 decoy is 6,423 B / `333c588a…`), all six doc before/after md5s (**both diffs apply with `patch -p1` and reproduce the delivered files byte-for-byte**), both dist hashes and sizes, all five Part-0 differences, D5.3, `App.svelte:54/109`, `aria-describedby` 0, and the w89 top-3 construction. **No invented number found.**

**THE RING MECHANISM, AT THE BYTES (VERIFIED — my extract from `cakepanz-4/dist/single.html`):**
`const T = y => Number(String(y[e.vm.sort]).replace(/[^0-9.\-]/g,"")) || 0;` then ring = first 3 ids, extended `for(F=3; F<C.length && T(C[F])===y; F++)` where `y=T(C[2])`. So the ring extends while the **parsed display string** equals row 3's. If every row prints `+0.0`, `T()` returns 0 for all → the whole board rings. **The `|| 0` also means any non-numeric sort parses to 0 for every row** → deterministic collapse, not just a rounding tie. Fix shape: one generic raw sort key, or the engine returns `suggest: string[]`. **Not `raw:{wins,priority}`** (my F2).

**F1 — MY ERROR, WITHDRAWN (corrected 23:38Z).** I claimed the ring's citation (`DraftBoard.svelte`'s `suggestIds`) existed on no branch. It exists: `origin/council/pickle:_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/DraftBoard.svelte`, 77 lines — `suggestIds` at :38, the parse `Number(String(x[vm.sort]).replace(/[^0-9.\-]/g,''))` at :40, `suggest={suggestIds.has(r.id)}` at :64. I had checked only gh-pages' 40-line copy and the c10 package's 3-file `src/`. **Z.ai's citation is exact.** The dist extract below is corroboration, not a workaround. Method note: "not on the branch I checked" ≠ "not on any branch" — sweep `council/{pickle,inkling,orcaink}` for c9 trees before a negative claim.

**ONE-CLICK DRAFTING NEEDS NO ENGINE EXPORT (F3 — the cheapest product win).** `BoardRow.svelte` already takes `onpick(id, slot)`; `canUndo` already exists; w89 attaches a `Draft` button to exactly its three `top3` rows (`zpb-ctabig`). Z.ai's next-five orders this behind the C′1 export; it should be **ahead** of it. ~32 picks × 2 saved clicks ≈ 64 interactions per draft. **Pickle's P-345 S4 improves my shape:** a player can fit several slots (flex chips), so put the slot on the button — "Draft <name> at QB1" — and keep `undo()` (`App.svelte:151`, already dispatches UNDO + autosaves) visible.

**PICKLE P-287 (two real defects, both reproduced by me).** **D1:** `FIX-NOTES.md` §5's `patch -p1` shortcut is wrong — from the c9 subtree root it fails (`No file found`, exit 1); `patch -p5` works, or run `-p1` from the c10 package root. **D2:** Z.ai's §10.2 misclassifies pickle's hosted c9 — I measured **both** its trees at `670d4c08…` / 527,177 B, so the sentence is **true there**; the `76de5658…` belongs to the c10 package's *nested* copy, which additionally has **no prepared dist at all**. So three byte-true copies exist; Z.ai fixed one and reported two — a policy inconsistency, not a byte error. **R1:** the precise root cause is `draftBoard.ts:61` — `rows.slice(0,limit).map(({_w,_p,...r}) => r)` strips the raw values before the VM ships; `:53` sorts on them (`sort==='ovr'?Number(r.ovr):sort==='priority'?r._p:r._w`), i.e. **generic over the sort key** — which is why the fix must be a generic raw key (or Pickle's `suggestions` contract), not `raw:{wins,priority}`.

**PICKLE P-345 S1 (the best statement of the fix in the round).** Return `suggestions: { ids, rankedBy, cutoffRaw, reason }` from the engine view (`view/draftBoard.ts`) through `port/seam.ts` (`:15` re-exports `boardVM`, `:160` `EnginePort`), so the component renders a fact instead of re-deriving a ranking. It closes the class (reach/value/awards/why-hints), not the instance. His S2 (`suggestions.length===3 || all within ε of the third`, derived from raw values) and Beam's I1 (StatRow `{raw,key,render}`) are the same law as my I29.

**BEAM's headline check does not reproduce.** At his cited commit `9ba6156ac`, `67-cakepanz-10-2026-11-19/` holds **51 files / 49 CHECKSUMS entries / 48 OK / 1 FAILED** — the failure is `slice1-battery.json`, the very file D1 is about. His "52 files, 52/52 OK" is Pickle's c10 count (52 files), not his tree. His k1 receipt (18 × EXIT_CODE=0), gate-manifest (314), gate-numerals (CLEAN ×2 both invocations) and cite-check all **verify**. His I4 is wrong: `shell.battery.mjs:129` asserts S22 (`body.classList.contains('cp-reduced')`) and `board.battery.mjs:185–193` samples `animationName`. His F4 over-reads: w89 does carry "Season stats"/"Playoff stats"/"Your Players"/"League Leaders" — only the ALL-CAPS casing is new.

**CLAUDE'S `da0cf927` — VERIFIED at the pushed bytes (01:45Z).** 6 files, +156/−16: `claude/NOW.md`, new `colors/src/core/snapshot.ts`, `app/store.ts`, `app/selectors.ts`, 2 tests. **No engine, no protected constant, no pin, no package.json** — react/react-dom still listed, `vite ^8.3.6` unchanged. **427/427** (421/421 at the parent `deb6275fa`; +6 = the new tests) and **tsc 89/89** (89 errors, 16 files, zero per-file drift vs `tsc-baseline.json`). S3 is sport-free (imports only `./events.ts` + `./hash.ts`), hashes `snap53:` over `canonicalText`, drops zero form at build, deep-freezes. S4 is additive (`dispatch` body unchanged): `dispatchAsync` serialises through a promise chain, yields a macrotask, resolves with the post-action state; `selectBoardAsync` returns `{pending:false, vm}` deep-equal to `selectBoard`. **Risk F1:** "never rejects" is conditional — the catch calls `set()` (subscriber notification) outside any try, so one throwing subscriber rejects `run`, and `chain = run` keeps it → **every later `dispatchAsync` on that store rejects immediately**. One-line fix: `chain = run.catch(() => {})`. No test covers it.
**ITEM-6 TILT (re-derived from both packs):** s=±0.25 → points ±4.2%, sacks −24.4/−24.9% and +30.6/+30.2%, giveaways ∓13.8/13.2%; s=1 → points +14.8/+15.2%, sacks −68.8%. Packs differ by ≤0.6 pt. The tool runs with `lambdaOverride: 1` — it sizes TILTS, it does not identify λ; λ stays 0, GLM off. Item-6 JSONs are on `council/beam` (15 files on mine too), **0 on inkling**, and byte-identical to my hosted copies.

**PASSGAP `ed16fd8f` — INDEPENDENTLY REPRODUCED FROM PUBLIC DATA (02:15Z).** I fetched nflverse pbp 2016-2025 (206 MB) and ran the pushed tool: 187,644 dropback plays, 320 team-seasons, offense split-half 0.539 (null p95 0.134), defense 0.364 (0.146), year-to-year 0.448/0.206, slopes 0.966/0.869/**0.939 ± 0.033**, λ **6.89 ± 0.24** (2016-22 6.83 ± 0.28; 2023-25 7.13 ± 0.47). λ = slope/mean Var(θ) with mean Var 0.1364 — the report's arithmetic is internally exact. **Caveats:** λ is θ-dependent (θ=[0.3,−0.2,−1,−0.6] is chosen, not fitted — scale θ by c and λ moves 1/c²); the SE is sampling-only (excludes the first-order tilt approximation and θ uncertainty); split-half by game parity holds the schedule fixed, so the **year-to-year** number is the transferable one; clustering is offense-only, so the defense SE may be understated (11.6 SE, so no effect on the conclusion); the reading rule first appears in git in the same commit as the results (self-reported). **Product stays λ=0, GLM off — correct: the tilt exists but the ratings→gap mapping is unmeasured.** The post-cutover spec is now "match the measured distribution (mean 0, sd ≈ 0.024) and 0.45/0.2 persistence", not "guess a mapping".

**D1 is CLOSED — three independent derivations agreed.** Canonical c10 package intact: 6,418 B / md5 `0a2869538a706e7e6ea864664b7e5c9f` (= CHECKSUMS.txt:18). `council/inkling` and `council/orcaink` are 51 files / 48 OK; `council/pickle` is 52 / 49 OK. **Fix = add that one file at the manifest's own path. Do NOT re-cut the zip, do NOT regenerate the manifests.**

**ORCAINK'S F1 + THIS SITTING = the delivery law, third instance.** The c10 package is a zero-deletion delta; a naive unzip-over the c9 tree leaves 4 dist assets where the MANIFEST names 2; and the nested `slice1-battery.json` was dropped by the import. Law: `package-delivery.sh` applies its own delta to a scratch copy of the PREVIOUS artifact, runs both gates, compares entry counts, refuses on mismatch. **Three rounds, three manual catches — make it a script.**

**THE THREE STALE DOC LINES ARE FIXED AS FILES, not applied.** Z.ai delivered both byte-states (c10 packages `fd04f140…`/`1ac601c4…`/`8be4d21b…` → `5d877d57…`/`e8137dc3…`/`75c69dbd…`; pickle's hosted c9 `222372b8…`/`29cecad3…`/`4d723c41…` → `08f30249…`/`aba2f58a…`/`ad1e0a96…`) plus two diffs and three replacement md5 lines in `FIX-NOTES.md` §6. Whoever applies them must update the three CHECKSUMS md5 lines in the same action. Inkling's and orcaink's own c9 copies carry the same sentence **true at their own bytes** — reported, not edited.

**VAPOR MODE IS FALSIFIED — do not re-open.** Svelte 5.58 **13,154 B gz** · Vue vdom **26,294** · Vue vapor **31,498** (+19.8% vs vdom, **2.39× Svelte**). Plugin-level `vapor: true` silently does nothing; only `<script setup vapor>` engages.

**CLAUDE'S `deb6275` — VERIFIED, nothing to correct.** Pairing **+3% to +26%**; throughput header now accurate (`pack params.lambda = 0.0`; `throughput.ts` does not override, `crn-efficiency.ts` does); 421/421 tests + tsc 89/89 hold.

**THE FRAMEWORK IS DECIDED: Svelte 5 + Vite 8** (Owner, 2026-11-19, final; R-13 closed). React out. The vite reconciliation is **ONE tree**: `67-cakepanz/package.json` (gh-pages) + c10's `cakepanz-4/package.json` = `vite ^7.3.6` / `plugin-svelte ^6.2.1`; rev10 arms and `colors/` are already on the decided pair (`vite ^8` + `plugin-svelte ^7`; Node ≥ 22.12).

**PART 0 IS ACCEPTED (Owner, 2026-11-19).** Working bytes `76de5658…` (527,162 B) are the release candidate; the delivered `670d4c08…` (527,177 B) is pre-Part-0 history; **no re-cut zip**. Measured diff: keepWeek 0→2 · cp-gonehow 0→2 · tooltip `width:200px` + `:focus` leg → `width:min(240px,calc(100vw - 32px))`, no focus leg · aria-hidden 0→1 · `:focus` 1→0 · D5.3 `cp-track` span gone.

**THE LIVE DIRECTIVE (Owner, 2026-11-18T22:31Z):** per-metric historical alignment is **PARKED until after ship**. Don't spend the council's time tuning sim values to history now.

**THE OWNER'S RULINGS (2026-11-19 evening):** Part 0 **accept** · distribution = **folders, no re-cut** · "guide z.ai to fix it himself with his own intuition" · **w89's layout is better than the current cakepanz shell** (now measured structurally by Z.ai: 9 cells vs 7, 1 click vs 3, 6 tabs vs 14-button rail, 151 rows vs 60; cakepanz is 3.6× smaller) · Vue arm **retire** (archive, not delete — it holds a full engine copy) · vapor **per-page, post-v1.1**.

## What the next session needs
1. **The ring fix is the Architect's, and the cheapest product win is NOT it.** Order: `?seed=` → one-click drafting on ringed rows (with the slot on the button, Pickle S4) → C′1. The fix shape to adopt is **Pickle P-345 S1** (`suggestions` contract from the engine view), not `raw:{wins,priority}`. All in `inbox/20261119-2305-…-innovation-v3.md` and `inbox/20261119-2342-…-review-of-seat-reviews-v3.md`.
2. **The C′1 law must be non-tautological** (I29): assert the ring against the engine's own raw-key sort, never against the DOM's printed strings. L13 currently rebuilds its expectation with the same rounded parse.
3. **SHELL-STATUS as a build output** (I22) is the structural fix for the stale-doc class; it also resolves the manifest/hash tension (F5).
4. **File the lane-trio hosting proposal with MUSE** (I24): `origin/council/muse:_agents/zai/` holds only START-OF-CHAT, so "END-OF-CHAT unchanged" is unverifiable from GitHub.
5. **The delivery law needs to be a script** (three instances now).

## 1 · What not to redo
- **Do not re-run item-5 or item-6.** Both done, receipted, platform-independent. Item 6's tilt numbers are re-derived: s=±0.25 → points ±4%, sacks −25%/+30%, giveaways −13%/+14%; s=1 → points +15%, sacks −69%; both packs within 0.6 pt.
- **Do not re-cut the c10 zip** and **do not regenerate the c10 manifests.**
- **Do not re-run the vapor experiment.** Settled.
- **Do not re-derive the pairing arithmetic.** +3% to +26%.
- **Do not measure the C′1 ring a fourth time.** Three measurements exist (mine, Beam's, Z.ai's live 27-pick run). It is a product fix, not a measurement gap.
- **Do not edit `src/`, `dist/`, pins, the engine, or the framework decision.** My lane edits docs and inbox only.
- **Do not touch other seats' lanes** — report the finding instead.

## 2 · What is genuinely open
1. The **C′1 raw-key export** (Architect) — one generic raw sort key, or `suggest: string[]`.
2. **One-click drafting** on the ringed rows — needs no export.
3. **`?seed=` as a visible shareable code** — precondition for deterministic batteries and paired what-if.
4. **The L13 tautology (generalizable)** — a law that recomputes its expectation with the code under test inherits its bugs.
5. **Orcaink's delivery law** — now three instances; should be a script.
6. **The packaging gap** — c10 `cakepanz-4/` ships 3 src files and no `package.json`, so its battery cannot run from the package.
7. **The vite reconciliation** — ONE tree, Architect's cutover task.
8. **The four sim-layer survivors** — PARKED by the 22:31Z directive.
9. **P-333** — VL's `DT→ILB = 6` is the only surviving lever; PARKED for calibration.
10. **PROJECT-KNOWLEDGE.md antiquation** — deferred; coordinate with Inkling (co-custodian).

## 3 · Live files (mine)
- **THIS SESSION'S REVIEW:** `inbox/20261119-2258-ernie-zai-v3-sitting-review.md` (F1–F8, verdict improved).
- **THIS SESSION'S INNOVATION v3:** `inbox/20261119-2305-ernie-cakepanz-shell-innovation-v3.md` (I17–I29).
- **THIS SESSION'S REVIEW-OF-REVIEWS:** `inbox/20261119-2342-ernie-review-of-seat-reviews-v3.md` (Pickle P-287/P-345, Beam; my F1 correction is in `20261119-2258-…-review.md` §5).
- **THIS SESSION'S da0cf927 VERIFICATION:** `inbox/20261120-0145-ernie-da0cf927-verification.md` (427/427 + 89/89 reproduced; F1 risk on `dispatchAsync` — fixed and re-verified in `92f87f7e`, 428/428).
- **THIS SESSION'S passGap REPRODUCTION:** `inbox/20261120-0215-ernie-passgap-verification.md` (every headline number re-derived from public nflverse data).
- **NEXT Z.AI SITTING ORDER:** `deliveries/zai-next-sitting-prompt-2026-11-20.md` (T1 P-317 slot picker — unblocked, store side landed; T2 one-click drafting; T3 `?seed=`; T4 D3 a11y; T5 seeded visual battery; T6 tooling; T7 review; T8 ring request).
- **HOSTED RELAY (verbatim):** `_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/`.
- **THE ORDER Z.ai ANSWERED:** `deliveries/zai-next-sitting-prompt-2026-11-19.md` (v3.0, 290 lines).
- **Prior:** `inbox/20261119-2152-…-deb6275-verification.md` · `inbox/20261119-2105-…-review-of-seat-reviews.md` (G1–G9) · `inbox/20261119-2055-…-innovation-v2.md` · `inbox/20261119-2039-…-item6-sitting-review.md`.
- **VAPOR RECEIPTS:** `_agents/ernie/deliveries/vapor-mode-experiment-2026-11-19/RESULTS.txt`.

## 4 · Method notes worth keeping
- **Prove package presence with the TREE, not ancestry.** `git merge-base --is-ancestor` answers "was this pushed", not "is this path there". Use `git ls-tree <ref>:<dir>/`.
- **A dangling commit's ancestry proves nothing about a ref** (`fee5c2fd8`, parent on no ref).
- **`md5 -c` is silent on macOS** — use `while read -r h p; do [ "$(md5 -q "$p")" = "$h" ] || echo "FAIL $p"; done < CHECKSUMS.txt`.
- **A battery that recomputes its expectation with the code under test cannot catch a bug in it** (L13, P-365).
- **A gate count is a checksum of the tree** (cakepanz-10: 313 → 314 when `.gitignore` was restored). Off-by-one ⇒ look for a missing dotfile.
- **"Neutral" is ambiguous: check whether the pass-class node is active** (`loadPassClass` carries the pack's `lambda`, 0 in both shipped packs).
- **Same-metric ratios only** when quoting "X% more".
- **The Architect's tools are outside tsc scope** (`colors/tsconfig.json:29` excludes `tools`).
- **Tests need the WHOLE repo** — a partial extract gives 382/2 fail; full = 421/0.
- **Vapor's trap:** plugin-level `vapor:true` is a no-op; check for `__vapor:!0` before trusting a number.
- **A cited path must be looked up on EVERY ref that could carry it.** I called Z.ai's `DraftBoard.svelte`/`suggestIds` citation nonexistent after checking only gh-pages and the c10 package — it is on `council/pickle`'s c9 tree (`…/zai-cakepanz-9-2026-11-19/cakepanz-4/src/lib/components/DraftBoard.svelte:38`). For a negative claim, sweep `council/{pickle,inkling,orcaink}` first; "not on the branch I checked" ≠ "not on any branch".
- **THE `colors/` LAYOUT TRAP (hit 2026-11-20, caused a false 408/413).** `colors/test/**` reads data as `new URL('../../../data/packs/…', import.meta.url)` → from `colors/test/nfl/` that is **`<root>/data`**. Extract the WHOLE repo (`colors/` + `data/` + `tools/` at one root) and run `cd colors && npm test`. Flattening `colors/` into the root silently reads `/tmp/data` — and this machine has a **stale `/tmp/data` from 16 Nov** with the old pack (`pack53:0b60973944ae13`). Always `ls` the path the test resolves before believing a failure.
- **To run tsc without a full install:** `node <other-tree>/node_modules/typescript/bin/tsc --noEmit -p tsconfig.json --pretty false`, then compare per-file counts to `tsc-baseline.json` (that IS the ratchet).
- **The relay leaves no git history for "unchanged" claims.** Host the trio on muse if you want them checkable.

## 5 · Pending (not mine)
- `/Users/kosi/Desktop/Football Sim` (gh-pages, 20,251 dirty) — Owner's tree, not mine to touch.
- Unsaved work in other seats' worktrees (flint 452, q 1831, glyph 276, collective/hallowed-shell/slime-galley snapshots) — report only, never touch.

## 6 · Session end state (2026-11-20T02:40Z)
- Worktree clean after this session's commit; `council/ernie` pushed (tip recorded in the commit).
- **Re-rook audit (inkling's A–G): unchanged from prior sessions.** A verified · B verified · C incomplete (2,416 unique hex tokens collected; classification not finished) · D/E not run.