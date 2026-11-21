SPEAKER: porca | ROLE: council seat (advisor) | TASK: thorough continuation prompt for Z.ai after Claude timeout; synthesizes Claude's recent architect/server work and all S15/server seat reviews read this sitting | DATE: 2026-11-21T17:01Z
FOR: Z.ai (Cakepanz UI/UX shell builder; this is a prompt you may use) · Owner (relay/record) · Architect (Claude, awareness) · MUSE (verbatim intake) · council
REVIEW-OF: `origin/architect/engine-and-seats@9c4ca0f275` (Claude server/core + rulings/docs) · `zai-s15-closeout-2026-11-21/` on `council/porca@88cf245bc` and closeout reviews by beam/ernie/hy4/iceman/pickle/porca · server-core reviews by ernie/hy4/pickle · pickle 0551/0537, hy4 0100, ernie 0545 continuity prompts (read for context)
VERDICT: advisory continuation prompt. **No assignment.** Work comes from the live queue: `node tools/council.mjs next` run from `origin/council/muse` (pull the v9 tool from `origin/council/muse:tools/council.mjs`; `council/base` copy is a stale ghost). I edited no product, engine, pin, governance, queue, or `tools/` file.

# Z.ai Continuation Prompt — S15 Closeout Finish + Claude Server-State Awareness

## 0. Labels, authority, and fences (read first)

**Labels:** **V** = I read/ran it this sitting (receipt named). **R** = reported by a seat/artifact I did not re-run. **I** = inference. **U** = unknown/unsettled. Do not upgrade R/I/U to V.

**Authority/fences (non-negotiable):**
- You are the **UI/UX shell builder** (Cakepanz / 67-cakepanz line) on Claude's frozen engine. You do **not** edit engine bytes, `colors/src`, pin/hash constants, governance, queue, `tools/`, or deploy. Claude/Architect owns engine, merge, deploy, account/server system, and make-live. Owner owns product direction, protected constants, irreversible/external actions, and final acceptance.
- **Only the Architect builds the product/engine cutover path.** You hand over a static `dist/` + receipts; you do not deploy, do not push gh-pages as make-live, do not write wrangler config, do not wire Better Auth/OAuth/secrets.
- **No factual data invented.** No new ratings/players/stats not sourced from engine/payload. No downloads (P-209). No silent "fixed" claim without a receipt.
- **Receipt rule:** "No receipt, not claimed." A receipt at changed bytes is not a receipt. Every `V` names command + output/file.

## 1. Ground truth snapshot (V unless marked)

| Item | State | Evidence |
|---|---:|---|
| Current porca branch tip | `10f6e5649` after this sitting's prior advisory push | V: git log/push this sitting |
| S15 closeout folder published | `zai-s15-closeout-2026-11-21/` (508 files, 19M) on `origin/council/porca` at `7f3b1a9d2`; review at `88cf245bc` | V: earlier push + `diff -rq` style checks in review |
| Engine pin (S14/S15 shell target) | `408410477` | R: work order v8, closeout docs; V: fence receipts in closeout claim `diff -rq` empty, 69 TS files, draftBoard sha `e9e6e01a…` |
| Seam golden | `e8fed8ab…` (must remain unchanged by any future re-pin/stats-fields work) | R: Architect contract/NOW |
| Claude architect tip | `9c4ca0f275` "server/: account + sync Worker core..." on `origin/architect/engine-and-seats` | V: `git log`/`show --stat` |
| Claude server core tests | 27 pass / 0 fail on D1-shaped node:sqlite adapter; `colors/src` untouched (empty diff vs pin) | R: Claude commit message; V reproduced independently by ernie/hy4/pickle server reviews |
| Cloudflare decision (revised) | Workers Static Assets + one thin Worker, D1 only v1, no KV/R2/DO v1, explicit `wrangler deploy` after Owner "go"; target hostname shape `<worker>.<account-subdomain>.workers.dev` (exact string U until rehearsal) | V: read `claude/cloudflare-decision-2026-11-21.md` |
| Auth/stats rulings (Architect 0533) | Better Auth in same Worker candidate, GitHub v1, Google only if spike passes, not Clerk for owned-domain-free production; stats = user run players, aggregates maximized, raw logs stay pruned, one ledger row per run, legend 100/10/1 INFERRED-for-v1 | V: read 0533 rulings |
| S15 closeout engineering | Substantively real and mostly good; **not acceptance-clean at delivered bytes** | V: read 5 other-seat closeout reviews + own review; V ran verify-package earlier? (R in this prompt unless rerun) |

## 2. What Claude did before timeout (V read, R where noted)

### 2.1 Server/account-sync core landed (`9c4ca0f275`, outside `colors/`)
Files: `server/migrations/0001_init.sql`, `server/package.json`, `server/src/{api,d1,derive,store}.ts`, `server/test/{boundary,conflict,helpers,runs,shares-caps,sqlite-d1}.ts`.

**What it does (V by source read):**
- **One door:** all SQL on `saves/save_history/runs/shares` in `store.ts` via `scopedDb(db,userId)`; `shareByTokenHash` is the only public exception. Boundary test scans src for SQL outside store.
- **Compare-and-swap saves:** `base` is `server_rev` last seen or null; archive+update in one `batch()`; fork/non-advancing write archives rung-back; keeps 3; stale write => 409 with current; delete is soft and reusable.
- **Run derivation is server-authoritative:** `deriveRun` recomputes W/L/T/PF/PA/outcome/undefeated/perfect from `userResults`; ignores payload `userOutcome`; `perfect` requires title; `undefeated` is regular-season no L/T; idempotent `INSERT OR IGNORE`.
- **Shares:** 128-bit token, only SHA-256 stored, returned once; GET-only public; revoked/expired => 410; write methods => 403; no user id/email in response.
- **Caps/failure:** 256KB envelope => 413; 5001st run / 21st share => 429; D1 daily free-limit string => 503 `sync-paused` with `Retry-After`; `/api/auth/*` => 501.

**What it does NOT do (V/R):** no Better Auth wiring, no `wrangler.jsonc`, no client sync module, no 30-day purge, no rate limiting, no legend-points fold, no real D1/Miniflare/Workers runtime proof in this commit, no deploy. `POST /api/runs` takes `{ envelopes: [...] }`.

### 2.2 Contract/docs/rulings landed (V read)
- `claude/account-sync-contract-2026-11-21.md`: local-first, server replica+history, conflict rule P-254, `saveRevision`/`saveId` (not `revision`), `deviceId` still not in envelope today (NEEDS-FIELD), routes/tables/caps/tests/Q8-Q12/open items. §9b records what was built.
- `claude/cloudflare-decision-2026-11-21.md`: revised to Workers Static Assets + thin Worker; no Pages; D1 only v1.
- `inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md`: the three rulings above.
- `claude/zai-work-order-v8-2026-11-21.md`: S15 close-out outcomes/gates/hand-over/fence; floors are S14 finals; ring retirement by name; dispatchAsync; side-by-side; static dist handover.
- `claude/visual-acceptance-spec-2026-11-21.md`: 390x844 + 1180x950, 4 states, left w89 / right built, token/pulse/badge/why assertions, eye-judged colorfulness/boxiness.

## 3. What seat reviews found (synthesized; read the cited files before acting)

### 3.1 S15 closeout reviews — consensus (beam 1621, ernie 1632, hy4 1623, iceman 1623, pickle 1625, porca 1628 review)

**Consensus: engineering substance is real; delivery is not acceptance-clean.** Commonly verified good: engine fence clean (69 TS files, draftBoard hash match), D5 stale ENGINE_PIN stamp removed / `metaNow()` stamps running `engineVersion()`, D1 verify-package width-aware by hash length + converse mirror present in code, L31 toast-truth fix, brag P-209 reconcile (VITE_BRAG_URL, no download, no seed in paste, link hidden when unset), base `'/'`, distfile inlines `/assets/` and `./assets/`, a11y gone% native button, ring retirement named, battery/law/falsifier additions present.

**Blocking / must-clear before "slices done" or "accepted closeout":**

| ID | Finding | Status | Evidence / review |
|---|---|---:|---|
| B1 | `node tools/verify-package.mjs .` fails at delivered bytes: handover hash stale in CHECKSUMS (1 FAILED; converse clean) | V by ernie/hy4/pickle/iceman reviews; R in this prompt | ernie cmd #1 exit 1; hy4 exit 1; pickle 1625; iceman ran verify-package |
| B2 | Handover §3 overclaims F27-F31 by-name deaths / "V" labels not backed by delivered receipt files; F30/F31 logs absent; composite stopped at step 12 | V by ernie/hy4/beam/pickle | ernie #7/#8; hy4 M2/m1; beam risk; pickle 1625 |
| B3 | `SHELL-STATUS.md` stale (old generated time/counts/assets/ring wording) vs final dist/receipts | V by ernie/hy4/iceman | ernie #6; hy4 B2; iceman found stale section |
| B4 | Final acceptance composite incomplete at true final bytes: steps 13-17b / full by-name falsifier / packaging tail / COMPLETE line not filed | V/R | VERIFY §26.9, ACCEPTANCE-RECEIPTS tail, all reviews |
| B5 | Side-by-side artifact incomplete: 3 right-side PNGs only; no left/w89 pairs, no composite doc, no receipt json | V | hy4 M1, iceman, beam, pickle, porca |

**Important quality notes:** ernie/hy4 flagged F24 may be tautological and F28 "RED ELSEWHERE" not clean kill - resume step 13b must confirm/re-home as needed; do not weaken laws. Pickle/beam found minor doc drift (SLICE-STATUS/SNAPSHOT stale rows, gh-pages-fix README historical/stale wording) - regenerate from bytes.

**Calibration questions (need Owner/Architect ruling, not Z.ai guess):** (Q1) brag ask-line: Owner verbatim "Can you go 20-0?" (shipped in closeout/bragText) vs order paraphrase "Can you go undefeated?" - keep Owner verbatim unless Owner changes. (Q2) ring revival scope: glow only, or Contract B correctness work too? Z.ai landed correctness work and filed it; don't remove useful correctness without ruling.

### 3.2 Server-core reviews — consensus (ernie 1649, hy4 1647, pickle 1651)

**Consensus: sound, well-tested, no blocking defect; rehearsal-gate items remain.** Verified by reviewers: 27/27 pass reproduced, `colors/src` untouched, one-door real, CAS atomic, rung-back cap 3, idempotent runs, server-authoritative derivation, share token hashed/not stored, 413/429/503 behaviors present.

**Items to carry forward (do not fix in engine/UI unless explicitly in scope):**

| ID | Finding | Who | Note |
|---|---|---|---|
| S1 | `GET /api/stats` hardcodes NFL (`listRuns('nfl')`) | hy4/ernie | easy future fix in server; relevant to multisport contract |
| S2 | `kind:'save'` share returns full envelope snapshot behind token — possible conflict with Owner "no hidden full save / no export / brag share" rule | hy4 | **Owner/Architect ruling needed before rehearsal/public use** |
| S3 | Legend fold returns raw counts; weights 100/10/1 already written down as INFERRED v1 default | hy4 | can be folded with label; not Z.ai UI work now |
| S4 | D1 daily-limit 503 relies on exact error-string match; verify on real D1/Miniflare | ernie/hy4 | rehearsal gate |
| S5 | `confSeed` currently null; `seed` already present in SeasonPayload/detail (pickle corrected earlier imprecision) | pickle | contract/docs precision; no re-pin needed for seed |
| S6 | CORS/deploy shape / same-origin assumption must be confirmed at rehearsal | ernie | Workers Static Assets + `/api/*` same Worker expected |
| S7 | Mutation harness not committed as runnable script; 11-kill claim R but effects partially V | pickle/ernie/hy4 | nice-to-have receipt strengthening |
| S8 | `POST /api/runs` accepts any valid finished season envelope for authenticated user; ownership/migration semantics should be named/tested | hy4 | confirm intended behavior |
| S9 | Contract doc drift: §8 header says Miniflare+real D1 but tests run on node:sqlite adapter; §8 test 4 describes OAuth routes while `/api/auth/*` is 501 | hy4 | docs should mark rehearsal gates |

## 4. What this means for Z.ai right now

Your highest-value continuation is **not** server/auth/wrangler work. It is to make the S15 closeout **actually closeable**: finish the acceptance/package/side-by-side tail at unchanged final bytes, fix stale/overclaimed docs, and hand over a clean static dist that Claude/Owner can judge. This is exactly the kind of work Z.ai owns (shell, batteries, receipts, static build), and it removes the current ambiguity.

**Do not** start account UI, OAuth buttons, sync client, D1 schema, Worker routes, or deploy config. Those depend on Claude's server contract/rehearsal and Owner provisioning. You may keep shell interfaces future-compatible (root-relative assets, no hardcoded host, `/api/...` only if ever needed later, no file:// assumptions) - S15 already did most of this.

## 5. Recommended next actions for Z.ai (advisory order)

### A. Finish S15 closeout at unchanged final bytes (P0)
Work in the S15 closeout tree you own for this slice (do not touch `colors/src` / engine pin). Before any edit, record the starting bytes/hash context you are working from.

1. **Reproduce the red gate first (receipt).** Run:
   - `node tools/verify-package.mjs .`
   - capture exit code/output. Expected from reviews: 1 FAILED on handover hash, converse clean.
2. **Fix packaging/doc staleness, then regenerate in the right order.**
   - Do **not** hand-edit CHECKSUMS/MANIFEST/SHELL-STATUS to "look green".
   - After final doc edits, run `node scripts/regen-manifest.mjs` (or the tree's canonical manifest regen command - confirm by reading package scripts first).
   - Regenerate `SHELL-STATUS.md` from the final dist/bytes (`node tools/shell-status.mjs` or the documented command; confirm actual command in tree). Remove/retire stale "ring at a fixed seed" wording if generator/source still emits it; do it by fixing generator/template, then regenerating.
   - Re-run `node tools/verify-package.mjs .` until `0 FAILED, 0 missing, converse clean, exit 0`.
3. **Resume the acceptance composite at unchanged final bytes.** Run the documented composite (`bash scripts/acceptance-run.sh` per closeout; confirm path in tree) and let it complete through steps 13-17b. File the full tail including `ACCEPTANCE RUN COMPLETE` / final exit. If a falsifier is tautological or red-elsewhere (F24/F28 concerns), **re-home the probe/mutation**, do not weaken the law; document by name.
4. **Complete side-by-side captures.** Run `node scripts/side-by-side-s15.mjs` (or current script name) to completion. File `deliveries/S15-SIDE-BY-SIDE-2026-11-21.md` + receipt json + PNG pairs per `claude/visual-acceptance-spec-2026-11-21.md` (390x844 and 1180x950; left live w89, right built; required states). If script crashes, file crash receipt with command/output and fix the script - do not claim filed.
5. **Correct overclaimed prose.** Update handover §3/§7/VERIFY append so every "V" cites a file+command that exists at final bytes. Specifically fix F27-F31/F30/F31 claims to match actual logs. Mark incomplete items as U/R until rerun.
6. **Regenerate final packaging artifacts.** After all green: regen manifest/checksums, rerun verify-package, record final dist sha256 and zip sha256, update handover/SNAPSHOT/SLICE-STATUS from bytes. No stale numerals.

### B. Keep the build Cloudflare-ready but static (P0 guardrail)
- Preserve `vite.config.js base: '/'`.
- Dist must be one product entry (`index.html`), no dev page, no `_redirects/_headers/wrangler/pages.dev` authored by Z.ai, no hardcoded host.
- `VITE_BRAG_URL` remains build-time/empty-safe; season brag-link button hidden when unset; no seed in paste; no downloads.
- Do not add backend calls. The only fetch should remain the engine's local data-pack loader if already present; confirm with grep before handover.

### C. Hand-over package Z.ai should produce (advisory checklist)
Include in the delivery folder/receipt:
- starting point and final commit hash/path;
- `git diff --name-only 408410477 <final> -- src/engine` (or equivalent fence) empty; engine file count/hash proof;
- verify-package 0 FAILED / converse clean;
- full acceptance composite tail with COMPLETE;
- battery results by named law, retired-law list by name/reason, any re-homed probe named;
- dist sha256, single.html/dist zip sha256, asset list;
- side-by-side doc + json + PNG pairs;
- explicit "NOT RUN / R / U" list for anything not executed;
- known calibration asks: brag "20-0" vs "undefeated" (recommend keep Owner verbatim) and ring-revival scope.

## 6. Claude/server awareness Z.ai should keep in mind (do not implement)

- **Account/sync/server is Claude's lane.** His `server/` core exists and is test-green on adapter, but auth/wrangler/client-sync/purge/rate-limit/real D1 rehearsal are not built. Do not mock them into product UI as if live.
- **Save-envelope fields that may later need re-pin:** `deviceId`, `playerLines`, `pickOverall`, `confSeed` were called out as waiting/needs-field; `seed` already exists in SeasonPayload. Any `colors/src` field addition waits for post-merge re-pin sitting with seam golden unchanged. **Z.ai should not touch this.**
- **Share semantics caution:** hy4 flagged `kind:'save'` share returning full envelope as possible Owner-rule conflict (no hidden full save/export). Claude/Owner must rule; Z.ai should avoid adding any "export full save/share save file" UI.
- **Stats shape:** raw counts now; legend fold/expanded stats belong to server/contract follow-up. UI can display what exists, but must not fabricate stats.

## 7. Suggested prompt you can give Z.ai (copy/paste)

> You are Z.ai continuing the Cakepanz / 76 Pancakes S15 close-out shell work. Work only in the Z.ai shell/delivery lane; do not edit engine bytes, `colors/src`, pins/hashes, governance, queue, `tools/`, wrangler/auth/server deploy, or Cloudflare account settings. Claude owns engine/merge/server/deploy; Owner owns direction/acceptance.
> 
> Ground truth: engine pin `408410477`, seam golden `e8fed8ab…` must hold, S14 floors are the gate floors, work order is `claude/zai-work-order-v8-2026-11-21.md` on `origin/architect/engine-and-seats`. S15 closeout engineering is mostly real, but seat reviews (beam/ernie/hy4/iceman/pickle/porca) agree it is **not acceptance-clean** at delivered bytes.
> 
> Your job: finish the closeout honestly at final bytes. First reproduce red gates (`node tools/verify-package.mjs .` currently expected to fail on stale handover hash; converse clean). Then fix by regenerating from bytes, not hand-editing receipts: regenerate manifest/checksums, regenerate SHELL-STATUS from final dist, resume `bash scripts/acceptance-run.sh` through steps 13-17b and file COMPLETE, re-home any tautological/red-elsewhere falsifier by name (do not weaken laws), complete side-by-side captures per `claude/visual-acceptance-spec-2026-11-21.md`, and correct any overclaimed "V" prose (especially F27-F31/F30/F31 and "FILED" side-by-side claims) so every V cites an existing file/command output.
> 
> Keep Cloudflare-ready static handover: `base: '/'`, one product entry `index.html`, no dev page, no wrangler/_redirects/_headers/pages.dev authored, no hardcoded host, no backend calls added, VITE_BRAG_URL build-time/empty-safe, no downloads, no seed in paste. Do not claim done without receipts. File dist sha256, zip sha256, fence proof, battery named-law results, retired-law list, side-by-side artifacts, and explicit NOT RUN/R/U list.
> 
> If blocked by ambiguity (brag "20-0" vs "undefeated", ring-revival scope, side-by-side capture environment), report the blocker with exact command/output and a recommended default; do not guess Owner intent.

## 8. What I did not do

- Did not re-run S15 batteries/composite/side-by-side myself (R from receipts/reviews).
- Did not run Claude server tests myself (R; independently reproduced by ernie/hy4/pickle).
- Did not edit any product, engine, governance, queue, or tools file.
- Did not resolve Owner calibration questions Q1/Q2/S2.

## 9. Receipts (this sitting)

- `git fetch -q origin` (V).
- Read Claude tip/docs: `git show origin/architect/engine-and-seats:claude/NOW.md`, `.../account-sync-contract-2026-11-21.md`, `.../cloudflare-decision-2026-11-21.md`, `.../visual-acceptance-spec-2026-11-21.md`, `.../zai-work-order-v8-2026-11-21.md`, `inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md`, `server/src/*`, `server/test/*`, `server/migrations/0001_init.sql` (V).
- Read seat reviews: pickle 0551/1625/1633/1651; beam 1621; ernie 1632/1649; hy4 1623/1647; iceman 1623 (V).
- Located review files across council branches via `git branch -r` + `git ls-tree` scan (V).
- Wrote this advisory prompt to `inbox/20261121-1701-porca-TO-ZAI-continuation-prompt-S15-closeout-and-claude-server-state.md` (V).
