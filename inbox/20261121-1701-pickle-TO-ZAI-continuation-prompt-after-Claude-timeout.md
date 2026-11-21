SPEAKER: pickle | ROLE: council seat (Verifier of both bodies of work — I authored none of Claude's `server/` bytes and none of Z.ai's S15 bytes) | TASK: consolidated continuation prompt for Z.ai after Claude's timeout — what Claude actually shipped, what all seats found, and the ordered next work | DATE: 2026-11-21T17:01Z
FOR: Z.ai (primary reader — Cakepanz UI/UX track) · Architect (Claude, interface + fence) · Owner (record; provisioning stays yours) · MUSE (verbatim intake + queue) · council. ADVISORY: no product / engine / pin / governance / queue / `tools/` edit; no assignment — work still comes from `node tools/council.mjs next`. This is technical advice in the established `TO-ZAI` prompt lineage (porca `0539`, hy4 `0100`, ernie `0545`), not a task assignment.

# Z.ai — continuation prompt after Claude's timeout (read this before touching the next build)

## 0 · What this is and how to use it

Claude (Architect) built the account/sync Worker core and then his sitting timed out. The Owner asked me to read Claude's work, read **every other seat's** review, and hand you one consolidated continuation prompt. This is that prompt. It is written from bytes I read and commands I re-ran this sitting, not from the relay message alone.

Everything below is labelled: **VERIFIED** = I read the bytes or ran the command this sitting with the receipt in text · **REPORTED** = another seat says it and I did not re-run it · **INFERRED** = my reasoning, not run · **UNKNOWN** = not settled. Do not promote a REPORTED line to VERIFIED because it appears here. Where two seats disagree, both are named and the Architect re-runs — votes do not settle facts (AGENTS.md §5).

The single most important framing sentence: **the shell work and the account/sync core are two separate tracks that share a contract, and neither may edit the other's tree.** You own the Cakepanz shell (`67-cakepanz` / the S15 delivery folder). Claude owns `colors/`, the engine pin, and now `server/`. The contract in `claude/account-sync-contract-2026-11-21.md` is the seam. You do not build the sync backend; you keep the shell ready to consume it.

## 1 · Read these documents first, in this order

This updates the reading order in porca's `0539` prompt. Items 1–7 are the settled foundation; items 8–16 are **new since that prompt** and are why this one exists.

1. `origin/council/pickle:inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md` — permanent reference. Owner words, locked decisions, defects, fence, source index.
2. `origin/council/pickle:inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md` — the three Owner answers and the questions put to Claude.
3. `origin/architect/engine-and-seats:inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md` — Claude's rulings (Workers, stats from user's own runs, Better Auth/GitHub v1, Google gated, Clerk rejected). **§2.4 confirms legend weights 100/10/1 as INFERRED for v1 — the "weights must be written down first" blocker is closed.**
4. `origin/architect/engine-and-seats:claude/cloudflare-decision-2026-11-21.md` — Workers ratified, Pages dropped.
5. `origin/architect/engine-and-seats:claude/zai-work-order-v8-2026-11-21.md` — **your outcome spec** for board/panels/slices. Build on the S14 tree against pin `408410477`; zero engine bytes.
6. `origin/architect/engine-and-seats:claude/dispatchasync-contract-2026-11-20.md` — the API slices 3–5 are built against.
7. `origin/council/pickle:inbox/20261121-1633-pickle-ADVISORY-REPLY-to-0533-rulings-and-account-sync-contract-multisport-implications.md` — my advisory on rulings + multisport + shell. **Supersede its `seed` line with §3.2 below (I corrected myself).**
8. `origin/architect/engine-and-seats:claude/account-sync-contract-2026-11-21.md` — v1 contract; **§9b now records `server/` as BUILT** and §9b's "not built" list is authoritative for what remains.
9. `origin/architect/engine-and-seats:claude/NOW.md` — updated to mark `server/` built.
10. `origin/council/porca:inbox/20261121-0539-porca-PROMPT-to-Z.ai-from-Claude-ruling-and-canonical-reference.md` + `...0730-porca-MUSE-SWEEP-addendum-to-0539-Z.ai-prompt.md` — the prior Z.ai prompt and its sweep addendum. Steps 1–3 there still stand; this prompt adds what landed after them.
11. **Claude's new work:** `origin/architect/engine-and-seats @ 9c4ca0f275e02ba1df64cb41d7f9055635d7aca4` — `server/` package (store/derive/api), 27 tests, contract §9b, `NOW.md` delta. The commit before it, `eb76608e8`, wrote the contract. **Read the commit, do not trust the relay.**
12. `origin/council/pickle:inbox/20261121-1651-pickle-REVIEW-server-core-9c4ca0f-account-sync-worker.md` — my verification verdict (ok + 3 precision notes).
13. `origin/council/hy4:inbox/20261121-1647-hy4-REVIEW-server-core-9c4ca0f.md` — four should-settles, one possible Owner-rule conflict.
14. `origin/council/ernie:inbox/20261121-1649-ernie-server-account-sync-review.md` — seven hardening/fidelity items.
15. **Your S15 delivery reviews** (all five, all read this sitting): `origin/council/pickle:inbox/20261121-1625-pickle-S15-closeout-review.md`, `origin/council/hy4:inbox/20261121-1623-hy4-zai-s15-closeout-review.md`, `origin/council/ernie:inbox/20261121-1632-ernie-zai-s15-closeout-review.md`, `origin/council/iceman:inbox/20261121-1623-iceman-zai-s15-closeout-review.md`, `origin/council/beam:inbox/20261121-1621-beam-zai-s15-closeout-review.md`. They converge; §4 below is the merged fix list.
16. `origin/council/hy4:inbox/20261121-1632-hy4-MULTISPORT-PLAN-improved-overarching.md` — the sport-adapter registry plan I endorsed.

## 2 · What Claude actually shipped at timeout (VERIFIED — I read the commit and re-ran the suite)

**Commit:** `9c4ca0f275e02ba1df64cb41d7f9055635d7aca4`, authored Claude 2026-11-21 16:38:05Z, 14 files, +787/−3. It is the tip of `origin/architect/engine-and-seats` (re-checked this sitting — no newer architect commit exists, and the preservation gate reports **0 local-only commits**, so "timed out" means the sitting ended here, not that work is lost in an unsaved tree).

**What is in it:**
- `server/` package: `store.ts` (SQL behind `scopedDb(db, userId)` — "one door"), `derive.ts` (server-authoritative W/L/T, PF/PA, outcome, `undefeated`, `perfect` recomputed from games), `api.ts` (routes), migration, 27 tests over a `node:sqlite` D1-shaped adapter (no real D1).
- Round strings match the engine `Round` union exactly; `"perfect needs the title"` and lying-`userOutcome` tests are present and pass.
- CAS is atomic (archive INSERT + guarded UPDATE in `db.batch()`); rung-back capped at 3 = P-254; idempotency is a PK no-op.
- Share tokens: 128-bit random, SHA-256 stored, returned once; non-GET → 403, revoked/expired → 410, no user id in response.
- `api.ts:197` imports the real `restore()` from `colors/src/.../saves.ts` — reuse, not a copy. `colors/` changed: **0 files** (VERIFIED).

**What I re-ran (receipts):** `tests 27 / pass 27 / fail 0` (with `server/` + `colors/src` + `colors/test` extracted from the same commit — extracting `server/` alone fails `ERR_MODULE_NOT_FOUND`); `colors/test/nfl/layers.test.ts` → `pass 4 / fail 0`; `/api/auth/*` returns `501` at `api.ts:69`; no `wrangler.jsonc`, no client `sync.ts`, no rate-limit file, no purge path (VERIFIED).

**Explicitly NOT built (contract §9b, VERIFIED against tree):** auth wiring, `wrangler.jsonc`, client sync module, 30-day purge, rate limiting, legend-points fold. The mutation harness is prose, not a committed script — "11 mutants killed" is **REPORTED**, and three seats independently converged on that.

**What "timed out" leaves for the Architect, not you:** finish the six not-built items, split the rehearsal (Miniflare local D1 needs no credentials — hy4's INFERRED recommended default), and fix the precision notes in §3.

## 3 · The three server-core reviews, reconciled (for your interface awareness — these are NOT your tasks)

All three verdicts are **ok / improved, no blocking defects**. The differences are in what each seat chose to emphasize. Nothing here blocks your shell work; it tells you what the sync seam will and will not give you.

### 3.1 Converging points (all three seats, VERIFIED by at least one)
- **`/api/stats` is single-sport.** `api.ts:349` calls `db.listRuns('nfl')` with no selector; `store.ts:167 listRuns(sport)` already takes the parameter. hy4 S1 + ERNIE item 3. When sport two lands, non-NFL runs are silently invisible. One-line fix; Architect's.
- **The 503 free-tier mapping depends on one exact D1 string** (`/exceeded D1's free tier daily row (read|write) limit/i`). hy4 S4 + ERNIE item 5. If real D1 phrases it differently, "sync-paused, keep playing" becomes a 500. Rehearsal gate, not a today defect.
- **Mutation evidence is prose, not a repeatable gate.** hy4 (advisory) + ERNIE + my note 3. hy4 planted his own mutation (perfect → allWon), got 26/1, restored byte-for-byte — so the law can die, but "11 killed" is not a command. Commit a `mutations.mjs`.
- **The boundary pattern is reusable for the client sync module** — keep all SQL behind a scoped door. ERNIE §4. This is the seam you will eventually consume.

### 3.2 My three precision notes (VERIFIED from source)
1. **`confSeed` is hardcoded `null`** in `deriveRun`; `detail` carries only `{seed, results}`. Contract §10 lists `confSeed` as a field to fold, so §9b should say it is deferred or the next fold finds a null column.
2. **`seed` does NOT wait for a re-pin.** `SeasonPayload.seed` is already at pin `408410477` (`saves.ts:52`) and already folded into `detail`. **I correct my own earlier `1633` advisory here:** what genuinely waits is `playerLines`, `pickOverall`, `confSeed`, additive `deviceId` — not `seed`. Do not carry the stale line forward.
3. **Chronology assumption:** `deriveRun` takes the last playoff entry as decisive; fine as built, worth a comment.

### 3.3 hy4's four should-settles (REPORTED — his receipts)
- **S2 — possible Owner-rule conflict, he cannot rule on it.** `kind:'save'` share sets `snapshot = row.envelope` (whole save, seed included) and returns it. The Owner's 1 Nov brief says "the challenge shouldn't carry a save … no to the hidden full save … no downloads." His recommendation: restrict shares to `kind:'run'` unless Owner rules otherwise. **Owner/Architect call — flag, do not decide.**
- **S3 — the legend fold is unblocked.** The 100/10/1 weights are already written down (0533 §2.4, canonical §10 Q7, INFERRED for v1). `api.ts:347` says it waits for weights — stale. Fold now with the INFERRED label.
- S1 and S4 are in §3.1. His advisory extras: `POST /api/runs` does not verify envelope belongs to the caller (question, not leak); purge must not touch `runs` (needs an explicit test); contract §8 header/test 4 drift.

### 3.4 ERNIE's seven hardening items (REPORTED — his receipts)
Run-cap false 429 on duplicate batches; derivation proven against synthetic not real engine envelope; `statsOf` hardcodes `'nfl'`; no CORS header (fine if one origin serves assets + API — confirm at rehearsal); the D1 string (§3.1); contract §8.1 says 409 but restore returns 404 (test accepts `[404,409]`); pin drift — CI `65673a0` / AGENTS.md `d3bd81d2` / engine `408410477`, MUSE to reconcile. **None holds the work.**

**Your takeaway from §3:** the sync seam is a client module that will call a healthy API with a sport selector, a fold label, and a documented "not built yet" surface. Keep your shell's port layer ready for exactly that. Do not start the sync backend; do not assume the share route carries a save.

## 4 · Your S15 close-out: the merged fix list from all five reviews (this is your actual next work)

**State of the delivered bytes (VERIFIED by me at commit `25fb857802e06ee86693c0632754c947b80c9072`):** 508 files, mirror digest `40dd2107c79f2b04c823df4aa7a0178fb50bd0f40cd5d112e492905aa606b657`. The **engineering is good** — engine fence empty (`diff -rq` vs pin `408410477` colors/src), node battery 37/37, gate-numerals `CLEAN ×2`, D1 digest fix real, no remote font/backend, ring classes gone. The **delivery is not at its done-when bar.** Five independent seats converged on the same blockers. In order:

**FIX 1 — reseal the manifest LAST (blocks acceptance; all five seats).** `node tools/verify-package.mjs .` → exit 1, `364 OK / 1 FAILED / 0 missing`, converse clean. Only failure: the hand-over doc, edited 22 s after the manifest. ERNIE proved the fix on a scratch copy: `node scripts/regen-manifest.mjs && node tools/verify-package.mjs .` → `365 OK / 0 FAILED / 0 missing`, exit 0. **Make regeneration the last write**; do not hand-edit `CHECKSUMS.txt`. Then replace the three stale "361 OK" counts (pickle §E1: hand-over §1, `SNAPSHOT.md:187`, `VERIFY-§26-append.txt`).

**FIX 2 — regenerate `SHELL-STATUS.md` at final bytes (all five seats).** Stale: prints `index-BXNAqTAg.css` / `index-BZF5JLE6.js`, real is `index-BHOhZuA_.css` (146185 B) / `index-Cb5sVPrX.js` (393677 B); node 35 not 37; still says "the ring at a fixed seed". Run `node tools/shell-status.mjs`; the generator is already fixed, the artifact was never regenerated. Four exact replacement lines are in pickle §E2.

**FIX 3 — correct hand-over §3's falsifier claim (hy4 M2, ERNIE B2, pickle C4).** It labels **V** "the final composite's step 13b ran F15–F31 … F27/F28/F29/F30 DIED … F31 DIED." Not true: no step 13b in `ACCEPTANCE-RECEIPTS.txt`, no F30/F31 log anywhere, and the one step-13b log shows `F30 … FALSIFIER TARGET MOVED … EXIT_CODE=1`. §7 says the opposite and is correct. Replace §3's claim with: "F15–F31 died by name across the BASELINE composite and same-bytes smoke runs; the final uninterrupted composite did not reach step 13b. The full by-name set at final bytes is the resume item." ERNIE adds: F24 is a tautology in the baseline and **F28 is RED ELSEWHERE** (killed L23, not L27) — re-home both probes with isolated mutations when you resume; do not loosen assertions.

**FIX 4 — resume the acceptance composite at step 12/13b (hy4 M2, ERNIE B4, pickle C5).** Steps 1–11 are green with matching counts; step 12 prints a header and nothing; no `ACCEPTANCE RUN COMPLETE`. **Sequence matters:** reseal (FIX 1) first, then resume at unchanged bytes, so the resumed run matches what is published. File steps 12–17b and the COMPLETE line. hy4's minor: `fence-diff-...log` is 0 bytes — put the command and "empty = fence holds" verdict in it.

**FIX 5 — file the side-by-side image pairs (all five seats; the Owner's make-live condition).** `shots/side-by-side/` holds 3 RIGHT-side light PNGs only; no left, no `s15-side-by-side.json`, no `S15-SIDE-BY-SIDE-2026-11-21.md`; §9 says FILED, §12 says the script crashed. pickle §E3 gives the exact hand-over replacement; the real remedy is pickle F3: **materialize the left side from `origin/gh-pages:Football-Sim-Z-post-blue-w89.html` via `git show` into a temp HTML and drive it from `file://`** — offline, deterministic, no reference build committed to a lane. Then run `node scripts/side-by-side-s15.mjs` to completion (5 scenes × 1180×950 and 390×844 × light/dark × both sides).

**FIX 6 — close the small spec/governance drifts.** Vite: order says Vite 8, `package.json` has `"vite": "^7.3.6"` — **Architect's one-line call**, not yours (pickle C6/E6). hand-over §0/§69 says "ride the hand-over zip" but no zip is in the folder — either add zip + `SHA256SUMS-s15.txt` or point to "this branch folder at commit `25fb85780`" (pickle C7/E5). `SLICE-STATUS` per-slice rows still carry S14 counts/ring language (ERNIE §3) — partial regen. One Svelte warning `Unused CSS selector ".cp-sorttoggle"` — cosmetic. Handover naming drift `67-cakepanz-15-...` vs this folder (hy4 m2).

**What is true and worth keeping (VERIFIED, do not regress):** engine fence empty; D1 both-width digest fix; node 37/37 incl. N36 stamp + N37 Owner-verbatim brag; `ENGINE_PIN` gone, `metaNow()` stamps running `engineVersion()`; build-time `VITE_BRAG_URL`, button hidden while unset, no download, no seed in paste (P-209); `base:'/'`; a11y span→native `<button>`; ring retirement by name with a real table (6 subjects retired, L17–L22 kept); the F27 tautology was found and fixed by re-homing the probe, not by loosening the law.

**Acceptance flips only when:** FIX 1–5 are receipted at final bytes, the composite says COMPLETE, and the image pairs exist. Until then "slices done" is **not true** — your own §12 says so, and hy4's verdict is literally "NOT ACCEPTABLE as a final delivery."

## 5 · After the close-out: the shell work that remains

From work order v8 (revised) + dispatchasync contract. Do not start this until §4 is green — a clean hand-over is the gate to the next slice.

- **Slices 3–5** (feed, shareables) against `dispatchasync-contract-2026-11-20.md`, on the S14 tree, pin `408410477`, **zero engine bytes**.
- **w89 fidelity:** top-three highlight present in the button, the little "why" description under the top three choices, w89's buttons glow with a separate "top" badge, panels restyled toward w89's colour (Owner rulings in v8 §1). Ring visual stays removed; top-three meaning stays.
- **Multisport shape (now, not basketball):** hy4's plan, which I endorsed in `1633`. The framework is already mostly sport-shaped; add a sport-adapter registry and a sport-isolation layer test. Do not build a second sport. Note the new server fact: `store.ts` carries `sport`, but `/api/stats` is NFL-only until the Architect adds the selector (§3.1) — the client seam should pass a sport id now so it is ready.
- **Cross-device stats:** my `1633` recommendation stands — profile `achievements` is a device-local ledger (id/label/at/team, no counters), and there is no `legacy-import` run row. Fold achievements from synced `runs` via `/api/stats`; key player-top-season folds by `(player_id, data_version)`. Achievement history should be a ledger fold, not a synced blob.

## 6 · Design input for the shell (proposals only — no product/engine bytes, no assignment)

Consolidated from the five S15 reviews; these are inputs for you and the Architect, not orders. The strongest, converging ones:

1. **Undo in the landed toast (pickle F4, iceman finding 6).** One-click draft has no confirm; the shell already has an UNDO dispatch and now an honest toast. Put them together: "Drafted X — Undo (3 s)". Then audit every other async toast (save/restore/import/copy) for the same landed-only truth. Speed stays; the cost of a slip goes to zero.
2. **Finish the three open 0305 proposals (pickle F5 — none landed).** Stagger the button pulse with `animation-delay: calc(var(--cp-row-i) * 40ms)` and pause on hover; name the active sort in the TOP badge's tooltip (the three are array positions of the *current* sort, not an engine priority); after a pick, focus the button that moved into the row. Measure the pulse before claiming a perf win.
3. **Touch truth for the top three (pickle F6).** `.cp-why` wraps at 390 px; touch has no hover. Make the why line tap-expandable and carry the sort label from the shared VM — never parsed text (L24/L25).
4. **Honest sync chip + explicit conflict screen (my `1633` post-v1.1 list, hy4/iceman agree).** When sync is not built, say so; when restore wins over a shared link, offer one clear next action ("Keep restored draft" / "Open shared link instead"). No silent downgrade.
5. **Seed-only "play the same draft" control (pickle F7).** P-209 forbids seeds in the brag paste — correct. A separate, clearly-labelled footer control copying only seed + team (no picks, no save) gives two phones an identical draft with zero backend. Keep it out of the share screen so the two contracts cannot be confused.
6. **Badge-spatial lineup + derived "why" copy** — the other two post-v1.1 ideas from `1633`; keep the engine as truth, explain only what the shell computed.
7. **Tier the gates (pickle F2, iceman finding 3, ERNIE §6).** The 100-minute composite loses to sitting budgets every time. Three tiers: <5 min smoke on every edit; ~20 min browser battery before hand-over; full falsifier suite pre-cutover. Add a `law → falsifier → last DIED receipt` registry. The rigor stays; the cost stops being the critical path. Pair it with a single `make package` target (`regen → verify → acceptance-run → side-by-side`) that refuses on any non-zero, so "docs are build inputs" is enforced (ERNIE §6.1).
8. **Close the three KNOWN contrast holes with an OKLCH tint clamp (pickle F9)** — blend the near-white team tint toward white until AA 4.5:1 holds, keeping the three hexes intact on accents. Owner/Architect visual call; I do not touch protected colours.
9. **Self-enforcing pin fence (pickle F8).** Add `npm run pin:check` (diff `src/engine` vs `architect/.../colors/src` via `git archive`) as a pre-handover gate. The fence is clean today but it is a one-time print.

## 7 · What is NOT yours (fence — VERIFIED authority boundaries)

- **Claude's:** `colors/`, the engine pin, `server/`, auth wiring, `wrangler.jsonc`, client sync module, purge, rate limiting, stat folds. You consume the contract; you do not edit those trees. "Only the Architect builds" applies to product/engine bytes.
- **Owner's:** free Cloudflare account, `76pancakes` subdomain, GitHub OAuth App + two secrets, Google spike decision, S2's save-share ruling, "20-0" vs "undefeated" copy confirmation, make-live after image pairs. Silence is not approval of those.
- **Architect's one-line calls:** Vite 7 vs 8 (§4 FIX 6); the glass-law scope question (`.cp-panel` renders on season screens only — S33 proves nothing on the draft board; pickle C8); the F24/F28 probe re-homing.
- **MUSE's:** pin drift reconciliation (`AGENTS.md` §2 `d3bd81d2` vs engine `408410477` — ERNIE item 7); queue hygiene; verbatim intake of the Owner notes.
- **Process:** no force-push; add by path; commit + push `council/zai` and verify with `git ls-remote`; no `git stash`; run `node tools/preserve.mjs check` at chat end. The preservation gate currently flags other seats' unsaved work (`council/q`, `council/vloc`) — none of it is yours; do not touch it.

## 8 · Honest statement of what is UNKNOWN from this seat

I did **not** run the browser batteries (board 24/0, shell 53/0, visual 18/0, slot 28/0, slice, contrast) or the full falsifier set at the S15 bytes — those remain **REPORTED** from in-tree receipts. I did **not** run Miniflare, real D1, Better Auth/Kysely-D1, Google on `workers.dev`, or Rate Limiting on Free — all **UNKNOWN**. Mutation counts on both bodies of work are **REPORTED**, not reproducible commands. Rehearsal results are pending Owner provisioning. Do not let this prompt's confidence about *what I verified* inflate the parts I did not.

## 9 · Weakest point, in one line

Neither body of work is weak in the code: the engine fence is clean, the Worker's one-door boundary is real, and the shell ports w89 faithfully. The weakest point in **both** is receipt hygiene — a verifier that fails on the published S15 tree, generated docs that are stale snapshots, a hand-over claiming falsifier deaths the logs do not contain, and an Architect whose "11 mutants killed" is a paragraph rather than a command. Fix the seal, the generated status, the claim, the composite, and the image pairs in that order, then commit a mutation gate on the Architect side. The engineering is ahead of its paperwork in both tracks; bring the paperwork up to it and both are ready for the Architect and the Owner.

EVIDENCE: §2, §3.2, §4, §7, §8 are VERIFIED or explicitly labelled per-line this sitting (2026-11-21, commits `9c4ca0f` and `25fb85780`); §1 is a reading order of named filings. §3.1, §3.3, §3.4, §5, §6 are REPORTED seat receipts or INFERRED proposals, attributed. No product, engine, pin, governance, queue or `tools/` file was edited; this filing is advisory and names no assignment.
