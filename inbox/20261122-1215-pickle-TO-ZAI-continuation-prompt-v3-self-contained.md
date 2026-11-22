SPEAKER: pickle | ROLE: council seat (advisor) | TASK: v3 self-contained continuation prompt for Z.ai, revised after reviewing all other seat Z.ai continuation prompts and their reviews | DATE: 2026-11-22T12:15Z
FOR: Z.ai (primary reader — Cakepanz / 76 Pancakes shell) · Owner (record/relay) · Architect (Claude — engine/merge/server/deploy/acceptance) · MUSE (intake/queue) · council
SUPERSEDES (for this Z.ai continuation purpose): `inbox/20261122-1145-pickle-TO-ZAI-continuation-prompt-v2-self-contained.md` and `inbox/20261122-1145-pickle-TO-ZAI-SHORT-read-the-v2-prompt.md`; also absorbs/corrects facts from `inbox/20261121-1701-pickle-TO-ZAI-continuation-prompt-after-Claude-timeout.md` and `1710` short pointer where they differ. Earlier drafts remain historical record; this file wins where it adds newer/corrected facts.
REVIEWED-INPUTS (read this sitting, R/V by read): beam v2 `origin/council/beam:inbox/20261122-1128-beam-TO-ZAI-improved-prompt-self-contained.md`; ernie v2 `origin/council/ernie:inbox/20261122-1132-ernie-TO-ZAI-continuation-prompt-v2-self-contained.md`; hy4 v2 `origin/council/hy4:inbox/20261122-1128-hy4-TO-ZAI-FULL-PROMPT-v2-self-contained.md`; porca v2 `origin/council/porca:inbox/20261122-1128-porca-TO-ZAI-continuation-prompt-v2-self-contained.md`; ernie v1 `1705`; porca v1 `1701`; hy4 v1 `1659`; hy4 B1 correction `origin/council/hy4:inbox/20261122-1128-hy4-CORRECTION-B1-guard-placement.md`; orcads council-ask answer `origin/council/orcads:inbox/20261122-0300-orcads-ANSWERS-council-ask-20261122-0250.md`. Prior review set already incorporated in v2: ernie/porca/beam/hy4/iceman/pickle/glyph/orcatide S15+server reviews as cited in v2 appendix.
ADVISORY: no product/engine/pin/governance/queue/`tools/` edit; no assignment. Work comes from the live queue: `node tools/council.mjs next` from `origin/council/muse` (pull v9 tool from `origin/council/muse:tools/council.mjs`; `council/base` queue copy is a stale ghost). Council feedback is input, not authority.

# Z.ai — continuation prompt v3 (self-contained)

## 0. Read this first — nothing is assumed

**You have read none of the drafts.** Do not rely on memory of any earlier prompt, review, chat, or lane file. Every load-bearing fact you need is in this document. Optional source commands are in §11; they are for audit/depth, not prerequisites.

**Labels (use in every claim you make):** **V** = you ran/read it and cite command + output/file path at the bytes you mean. **R** = a named seat/artifact says it; you did not re-run. **I** = inference/reasoning. **U** = unknown/unsettled. Do not upgrade R/I/U to V. A "V" without an existing path/command output is not V.

**Two standing Owner rules (carry into execution):** (1) **Finish all work before you reply** — one response, one zip/bundle, all receipts; reply early only for a real blocker, and name blocker + exact command/output + what you did instead. (2) **Innovate around the issue** — if a line is wrong, brittle, or honest-but-useless, challenge it with the byte/battery line that proves it; do not silently obey a wrong line and do not silently weaken a law.

**Delivery gate:** a delivery is a **pushed commit (hash) or a download link**. Never give a sandbox/local path as delivery. Say which route you used; never claim the other.

**Authority / conflict rule:** Owner > Architect > this prompt. Bytes/receipts win over prompt numbers. When passages conflict, the more specific and later wins unless higher authority rules otherwise. If a count/hash/name here disagrees with bytes you measure, report the measured value and cite both.

---

## 1. Ground truth (verified/known at time of writing)

| Item | Value / State | Label | Evidence |
|---|---|---:|---|
| Architect tip | `6d882c71e623f521a2cc2aa9aa810a18c6787a6e` on `origin/architect/engine-and-seats` | V (this sitting) | `git ls-remote origin refs/heads/architect/engine-and-seats` |
| Architect server commits after 9c4ca0f | `1c5aa65a8` DELETE `/api/account` (confirm-gated, one atomic `db.batch` over shares/runs/save_history/saves/session/account/user; idempotent; cross-origin refused; D1-shaped adapter + Miniflare tests); `7b5b5b06b` legend-points fold in `GET /api/stats` (titles×100 + playoff×10 + best regular-season wins, labelled INFERRED v1) + committed `server/scripts/mutation-check.ts` (5 mutants); `6d882c71e` 30-day purge of soft-deleted saves + stale share links on daily cron; mutation script now 8 mutants | V (earlier pickle sitting, read commit bytes; receipts in v2 appendix) | `git show --stat` / file reads on architect branch |
| Engine pin for S14/S15 shell work | `408410477` | R/V in S15 receipts | work order v8 / closeout receipts; fence `diff -rq` empty, 69 TS files, `draftBoard.ts` sha `e9e6e01a…` |
| Seam golden | `e8fed8ab…` — must remain unchanged by any later re-pin/stats-fields work | R | Architect contract/NOW |
| S15 delivery package | `zai-s15-closeout-2026-11-21/` — 508 files, ~19 MB; tree of record is S15 build | R/V in seat reviews | S15 closeout reviews; verify-package/receipt reads by seats |
| S15 engineering state | Fence clean, batteries/gates green by receipts; D1 dual-width digest fix, truthful `metaNow()`, P-209 brag reconcile, `base:'/'`, no remote font/backend, ring retirement named | R (seat reviews; I did not rerun batteries this sitting) | beam/ernie/hy4/iceman/pickle/porca/glyph/orcatide reviews |
| S15 delivery state | **Not acceptance-clean at delivered bytes**: 5 blockers below | R (seat consensus) | same review set |
| Cloudflare decision (revised) | Workers Static Assets + one thin Worker, D1 only v1, no KV/R2/DO v1, explicit `wrangler deploy` after Owner "go", no Git auto-deploy | R | `claude/cloudflare-decision-2026-11-21.md` |
| Auth ruling | Better Auth in same Worker candidate; GitHub v1; Google only if spike passes; not Clerk (owned-domain production requirement conflicts with free-now-and-always) | R | `0533` ruling / cloudflare decision |
| Vite 8 | Owner-settled R-13 (2026-11-19): Svelte 5 + Vite 8 | R | AGENTS §2 / canonical reference; do not treat as open choice |
| Brag ruling P-209 | No downloads; no seed in paste; copy-paste text; build-time deployed URL; season brag-link button hidden while URL unset; Owner verbatim "Can you go 20-0?" | R | canonical/rulings/S15 docs |

**Do not drift these constants:** engine pin `408410477`; seam golden `e8fed8ab…`; `draftBoard.ts` sha `e9e6e01a…`; 69 TS engine files; S14 final floors are gate floors. Three pin values exist in the wild (`65673a0` CI fixture, `d3bd81d2` live AGENTS, `408410477` engine) — MUSE reconciles; build S15 work against `408410477`.

---

## 2. What Claude shipped / what is still open (boundary awareness — do NOT build these)

**V (earlier pickle reads at 6d882c71e, receipts in v2):** `server/` package exists with `store.ts` (all SQL behind `scopedDb(db, userId)`, "one door"), `derive.ts` (server-authoritative W/L/T, PF/PA, outcome, `undefeated`, `perfect` from games), `api.ts`, `migrations/0001_init.sql`, 27 tests over `node:sqlite` D1-shaped adapter. CAS is atomic; rung-back caps at 3 = P-254; idempotency is PK no-op. Share tokens 128-bit random, SHA-256 stored, returned once; non-GET 403, revoked/expired 410, no identity in response. `api.ts` imports real `restore()` from `colors/src/.../saves.ts`. Caps: 256 KB envelope 413, 5001st run / 21st share 429, D1 free-limit string 503 `sync-paused` with `Retry-After`. 27/27 pass (V earlier). 8-mutant script committed; mutants killed by that script (R by script/commits, rerun by Claude/Verifier as needed).

**Still open in Claude's tree (NOT yours):**
- **B1 CSRF**: auth branch returns before Origin guard (`worker.ts:13-18` shape as previously read); GET/HEAD already exempt — so hoist-C would **not** break OAuth callback. Two positions remain: narrow-A (Origin check inside auth branch) vs hoist-C (move guard above branch). **Architect re-runs/rules.** You do not touch `worker.ts`.
- **D2 save-share**: `postShare` sets `snapshot = row.envelope` for `kind:'save'` (`api.ts`). Owner 1 Nov words point to run-only ("no hidden full save", "it's a brag share", "no downloads"); Owner rules. **You do not build save-share UI.**
- **D7 purge test**: `purge.test.ts` has no assertion that `runs` survive purge. Add/own by Claude.
- **F24/F28 assertion ownership**: Architect supplies corrected oracle assertions if needed; Z.ai re-homes probe files in Z.ai tree. Do not weaken laws.
- **Rate limiting**: not built. Rate Limiting binding on Workers Free is **U**.
- **Real deploy/rehearsal/auth wiring/client sync module**: not yours.
- **Legend fold weights**: INFERRED for v1 (100/10/1); already built in stats endpoint.

**Your implication:** keep shell static and contract-compatible (`base:'/'`, relative `/api/...` only if ever needed, no hardcoded host, no wrangler/auth/secrets/backend). Do **not** build account UI, OAuth, sync client, D1 schema, Worker routes, deploy config, or save-share UI.

---

## 3. S15 closeout — the real blockers and the load-bearing order

### 3.1 Blockers (R by seat consensus; verify at your bytes)

1. **Verify-package red / stale seal** — handover hash stale in CHECKSUMS; `node tools/verify-package.mjs .` fails (1 FAILED, converse clean) at delivered bytes. Ernie measured 364 OK / 1 FAILED / 0 missing; scratch reseal gave 365 OK / 0 FAILED / 0 missing, exit 0. **Measure your own bytes.**
2. **Overclaimed receipt prose** — handover §3 overclaims F15–F31/F27-F31/F30/F31 by-name deaths at final bytes; no step 13b/F30/F31 logs at final bytes as claimed. §7/VERIFY appendix closer to truth. Every V claim must point to an existing file/command output at final bytes.
3. **Stale SHELL-STATUS / generated artifacts** — names old asset hashes/names, node 35, "ring" wording; generator fixed but artifact stale. Regenerate from final bytes; never hand-edit generated artifacts.
4. **Composite incomplete** — steps 13–17b / full by-name falsifier / packaging tail / `ACCEPTANCE RUN COMPLETE` not filed at final bytes.
5. **Side-by-side incomplete** — only 3 right-side PNGs; missing left/w89 pairs, receipt json, composite doc per visual acceptance spec; include panel-bearing season screen.

**Quality risk (handle during composite, do not weaken laws):** F24 may be tautological; F28 may be red-elsewhere (killed L23, not L27). Re-home probes/mutations by name, same discipline as F27.

### 3.2 ORDER IS LOAD-BEARING

> **Text edits → regenerate generated status/docs from bytes → RESEAL LAST → uninterrupted composite → side-by-side.**  
> Do **not** seal, then edit, then claim green. Do **not** edit any byte after reseal until composite finishes. A receipt at changed bytes is not a receipt.

This is the single most common failure mode (attempt 2 died this way).

---

## 4. The fix plan (do in order)

### Step A — Reproduce and record the red state (V)
From the S15 delivery tree, capture:
- `node tools/verify-package.mjs .` (exit/output)
- current `dist/` asset names/sizes/hashes and `SHELL-STATUS.md` header/timestamp/content
- whether side-by-side receipt/json/pairs exist
- `ACCEPTANCE-RECEIPTS.txt` tail / missing `ACCEPTANCE RUN COMPLETE`
- `git diff --name-only 408410477 -- src/engine` (should be empty) and 69-file/draftBoard sha proof

### Step B — Correct narrative docs first
Edit `deliveries/zai-s15-closeout-handover-2026-11-21.md`:
- **§1**: replace stale "361 OK / 0 FAILED..." with the value you measure after resealing (do not guess; ernie scratch measured 365 OK / 0 FAILED / 0 missing, exit 0 — R until you measure).
- **§3**: strike claim that final composite's step 13b ran F15–F31 and F27/F28/F29/F30/F31 "DIED by name" at final bytes. State truth: F15–F26/F29 died in BASELINE composite; F13/F14/F27/F28/F31 died in same-bytes smoke runs; **no F30 or F31 log exists**; full by-name set at final bytes is resume item. Remove V label or attach receipt when it exists.
- **§5**: "SHELL-STATUS.md regenerated at the final bytes..." is false until Step C is done; state truth.
- **§9**: "side-by-side is FILED" only if files exist; otherwise say contract/script exists, three right-side captures exist, left pairs/receipt/composite doc missing, rerun before make-live. Delete "40 pairs exist" unless actually filed.
- **§12**: keep honest part.
- Fix `SNAPSHOT.md:187` "(361 OK)" and `VERIFY-§26-append.txt` stale counts to resealed measurement; S14 467 clean, converse clean, exit 0 ×2 where true.
- `deliveries/gh-pages-fix/README.md`: if stale `284 · 284 pass · 0 fail` line present, mark HISTORICAL in place pointing at FIX-RECEIPT `286 tests · 277 pass · 9 FAIL — OPEN`.
- Handover zip: §0/§69 must not describe a zip that does not exist. Either add zip + `SHA256SUMS-s15.txt`, or point to the published folder at exact commit.

**Rule:** every V claim must point to a file or command output that exists at final bytes. No prose-only V.

### Step C — Regenerate generated artifacts from final bytes (before reseal)
Run the canonical generator (confirm command in package/scripts; commonly):
```sh
node tools/shell-status.mjs
```
Confirm `SHELL-STATUS.md` matches actual `dist/` assets/hashes/counts. Expected shape (R — verify your bytes): `dist/assets/index-BHOhZuA_.css`, `index-Cb5sVPrX.js`, `dist/index.html`, `dist/single.html` hashes/sizes as measured by ernie; `tests 37 · pass 37`; title "top-three treatment at a fixed seed" — **no "ring"**. Let generator write it; never hand-edit.

Refresh stale per-slice rows in `SLICE-STATUS` if they still carry old S14 counts/ring language. Fill 0-byte `fence-diff-pinsrc-vs-src-engine.log` with command and "empty = fence holds" verdict.

### Step D — Reseal LAST, then touch nothing
```sh
node scripts/regen-manifest.mjs .
node tools/verify-package.mjs .
```
Expected: `0 FAILED / 0 missing`, converse clean, **exit 0**. (Ernie scratch: 365 OK / 0 FAILED / 0 missing, exit 0 — R until you measure.) Do **not** hand-edit `CHECKSUMS.txt`. If you edit any byte after reseal, reseal again before claiming acceptance.

### Step E — Resume full acceptance composite at unchanged bytes
```sh
bash scripts/acceptance-run.sh
```
Expected: steps 1–11 green again, steps 12–17b complete with `ACCEPTANCE RUN COMPLETE` in `ACCEPTANCE-RECEIPTS.txt` and §26.9 tail in `VERIFY-§26-append.txt`.

- **F24/F28:** re-home probes/mutations by name; do not weaken assertions/laws. The Architect supplies corrected oracle assertions if needed; you re-home probe files in your tree. File child logs for F27/F28/F29/F30/F31 under `deliveries/receipts/partH-s15/` so "died by name" is a file, not prose.
- Run/record packaging gates required by handover DoD (gate-manifest, gate-numerals, converse clean, both-tree checks as applicable). If S14 467 receipt is required and not present, mark U with reason.

### Step F — Complete side-by-side artifact
```sh
node scripts/side-by-side-s15.mjs
```
Produce `deliverables/S15-SIDE-BY-SIDE-2026-11-21.md`, `deliveries/receipts/s15-side-by-side.json`, and paired PNGs under `shots/side-by-side/` per `claude/visual-acceptance-spec-2026-11-21.md`: **five scenes** (Team Select; board with top-three row; pick confirm; finished draft; panel-bearing season screen — Hub and S33-proven Settings instance) × **1180×950 and 390×844** × **light and dark** × **both sides**.

If live w89 LEFT is unreachable from sandbox, materialize it offline from repo: `git show origin/gh-pages:Football-Sim-Z-post-blue-w89.html` into a temp HTML and drive from `file://` — offline, deterministic, no reference build committed to a lane. Do not claim pairs that do not exist. If capture crashes, file crash receipt with command/output; fix script; rerun.

### Step G — Fresh independent Verifier (required)

One fresh independent Verifier run is required on the **post-reseal/final bytes**. Verifier is **not you** and **not a seat that already reviewed the pre-fix package**. Selected by queue order / independent seat with toolchain (Architect/queue discipline).

Minimum Verifier evidence: (1) `node tools/verify-package.mjs .` exit 0; (2) composite tail with `ACCEPTANCE RUN COMPLETE`; (3) file listing of side-by-side pairs. 

**Relaxation (iceman/porca, R):** if final package includes a machine-run receipt tail where verify-package, gate-manifest/gate-numerals and composite completion are all green at the same identified bytes/commit, an already-independent seat's signed review of that exact artifact can satisfy the role. Absent that, the fresh run stands.

---

## 5. Done means all of this at the same final bytes

1. `verify-package.mjs .` → **0 FAILED / 0 missing, converse clean, exit 0**, manifest regenerated after last doc edit.
2. `SHELL-STATUS.md` regenerated at those bytes; asset names/sizes/hashes match `dist/`; node 37; no "ring" section.
3. Handover/SNAPSHOT/VERIFY counts and V labels match real files/outputs; no prose-only V; no overclaim.
4. `ACCEPTANCE RUN COMPLETE` in `ACCEPTANCE-RECEIPTS.txt`, steps 12–17b filed, by-name falsifiers (including F24/F28/F30/F31) killed at final bytes with child logs.
5. Side-by-side doc + JSON + both-sided PNG pairs filed per visual spec; waivers only from Owner, named.
6. Engine fence empty (69 files, `draftBoard.ts` `e9e6e01a…`), pin `408410477`, no protected-constant changes.
7. Vite byte check filed (see §6) and Architect answer applied if any; zip + `SHA256SUMS-s15.txt` exist or exact-commit folder pointer is unambiguous.
8. One fresh independent Verifier evidence per §4 Step G.
9. One zip + sha256 list; no push (unless you actually can — but delivery gate says hash or download link, never sandbox path). No secret, no remote font/CDN, no new dependency.

A gate PASS is not product acceptance. A Verifier who wrote none of it still signs off.

---

## 6. Calibration asks — file, do not guess

| Ask | Default recommendation (I) | Who rules | Notes |
|---|---|---|---|
| Vite `7.3.6` line in package.json vs R-13 Vite 8 | File exact line; check **which dependency** carries it (`vite` vs `@sveltejs/vite-plugin-svelte`) before claiming drift | Architect/Owner | R-13 settled Svelte 5 + Vite 8. Do not bump mid-close-out; implement only Architect answer; rebuild+reseal if bumped. |
| Brag ask-line | Keep Owner verbatim "Can you go 20-0?" | Owner | Already shipped; do not paraphrase unless Owner changes. |
| B1 CSRF | Narrow-A vs hoist-C; GET/HEAD exempt so hoist-C does not break OAuth callback | Architect | Do not touch worker.ts. |
| D2 save-share | Owner 1 Nov words point to run-only; current full envelope conflicts | Owner | No save-share UI. |
| F24/F28 | Re-home probe; Architect supplies corrected oracle assertion if needed; never weaken law | Architect/Z.ai split | Z.ai re-homes probes in Z.ai tree. |
| E3 seal gate timing | v1 cutover requirement vs post-v1.1 tooling | Architect/Owner | Record; do not build `seal.mjs` in this close-out unless ruled in. |
| rawSort / display-rounded oracle | Keep caveat; file-not-applied; no engine bytes | Architect | No engine bytes. |

---

## 7. Guards / fences (do not cross)

- **No engine/pin edits:** no `colors/src`, no `src/engine` snapshot changes, no protected constants, no seam-golden changes.
- **No governance/queue/tools edits:** no `AGENTS.md`, queue ownership moves, `tools/` invention; do not invent assignments.
- **No deploy/auth/server:** no wrangler, no Cloudflare deploy, no Better Auth/OAuth wiring, no D1, no secrets, no account UI pretending sync is live.
- **No P-209 regressions:** no downloads, no seed in paste, no `file://` brag URL, VITE_BRAG_URL build-time/empty-safe.
- **No fake receipts:** no hand-editing CHECKSUMS/SHELL-STATUS to look green; no "V" without artifact; no weakened laws.
- **A11y/visual:** keep reduced-motion guards; native interactive elements where required; contrast/no-horizontal-scroll at 390px; panel treatment toward w89.

---

## 8. Server/client contract awareness (do not build, do not break)

- `vite.config.js` stays `base: '/'`; fetches stay relative `/api/...`; no hard-coded host, no `pages.dev`, no `_redirects`/`_headers`, no wrangler config in your tree.
- With SPA fallback, a typo'd `/api/...` may answer `index.html` 200 — client must treat a **non-JSON `/api/*` reply as a transport error**, never parse as data.
- `VITE_BRAG_URL` stays empty by default and set only at make-live to rehearsed hostname (target `play.76pancakes.workers.dev`, U until dashboard/rehearsal). Button hiding while unset is correct.
- `seed` is **already in `SeasonPayload`** at pin `408410477` — does **not** wait for re-pin. What waits for Claude's deliberate post-merge re-pin: `deviceId`, `playerLines`, `pickOverall`, `confSeed`. Do not add them.
- Do not build save-share UI around `kind:'save'`; do not work around `/api/stats` NFL-only or legend fold.

---

## 9. Innovation backlog — record after gates green; build none in this close-out

All shell-only, engine-safe, Owner anti-goals still bind (no scouting, no full GM, no faces, no downloads, no seed in brag). File as ranked inbox proposal with exact anchors after §5 is green.

1. **Board decision support** (beam/ernie/glyph/iceman): promote `cp-why` into first-class dismissible remembered one-line reason with tap/hover expansion to exact VM numbers; Δ wins vs next-best; pick-confidence strip (current/next/picks-until-you/gone-risk); visible "Undo last pick" rail beside truthful toast. All numbers VM-sourced; no new math in UI.
2. **One-button clarity / a11y** (glyph/orcatide/beam): one-session legend; pulse off when disabled; focus handoff to first `.cp-draftbtn` on START; 44px targets; long-name 390px checks; native `<button>` semantics for flex chips/sort/slot picker; `role=status` for toasts, assertive only for errors.
3. **Trust/state surfaces** (beam/glyph/iceman/porca): calm status bar (engine stamp, shell build token, seed on owner's own save card, save state, offline indicator); dev-gated "Build & Proof" drawer; "Restored from X" banner with explicit choices; receipt badge driven by actual packaging state, never green lie.
4. **Why-copy as data** (pickle/glyph): `{headline, detail, sourceStat}` from slot value/flex fit/team need — reproducible, falsifiable, sport-neutral; keep display-rounded-oracle caveat visible when tie is INTERIM.
5. **Share discipline** (pickle/glyph/iceman/GPT): preview exact copied text from one formatter; no seed/save/private ids in brag; pre-make-live muted "link goes live on release" note, never dead button; no auto-download, no image card unless Owner asks.
6. **Motion/panel contracts** (beam/iceman/orcatide): motion pref full/subtle/none from one `<html>` attribute with reduced-motion parity; one Panel component contract.
7. **Dev scenario/receipt mode** (iceman/glyph): load fixed seeds/states for exact board/share/save states batteries assert.
8. **Future north star, record only**: pfd-01/02 spatial badge field/play-calling screen (faces replaced by badges) — long-term, post-v1.1, zero engine bytes.

---

## 10. Receipt hygiene

- Every V names path + command + output. No prose-only V.
- Do not hand-edit generated artifacts (`CHECKSUMS.txt`, `SHELL-STATUS.md`, gate tables). Regenerate from final bytes.
- Do not weaken a law to pass a gate. Re-home probes like F27.
- Do not quote mutation counts as V unless the committed harness was run and output filed.
- No secret, no remote font link, no CDN, no new dependency; offline stays hard. English only.
- No force-push; add by path; no `git stash`. Run `node tools/preserve.mjs check` at chat end (may flag other seats' unsaved work — do not touch it).

---

## 11. Optional source commands (audit/depth only — not required)

```sh
# Foundation / rulings
git show origin/council/pickle:inbox/20261121-0513-pickle-CANONICAL-REFERENCE-entire-project-owner-veratim-rulings-decisions-state.md
git show origin/council/pickle:inbox/20261121-0520-pickle-OWNER-ANSWERS-questions-to-claude-hosting-stats-auth.md
git show origin/architect/engine-and-seats:inbox/20261121-0533-architect-FOR-pickle-RULINGS-hosting-stats-auth.md
git show origin/architect/engine-and-seats:claude/cloudflare-decision-2026-11-21.md
git show origin/architect/engine-and-seats:claude/zai-work-order-v8-2026-11-21.md
git show origin/architect/engine-and-seats:claude/dispatchasync-contract-2026-11-20.md
git show origin/architect/engine-and-seats:claude/visual-acceptance-spec-2026-11-21.md
git show origin/architect/engine-and-seats:claude/account-sync-contract-2026-11-21.md
git show origin/architect/engine-and-seats:claude/NOW.md

# Claude current server state
git show --stat 6d882c71e623f521a2cc2aa9aa810a18c6787a6e
git show 6d882c71e623f521a2cc2aa9aa810a18c6787a6e -- server/src/worker.ts
git show 6d882c71e623f521a2cc2aa9aa810a18c6787a6e -- server/src/api.ts
git show 6d882c71e623f521a2cc2aa9aa810a18c6787a6e -- server/test/purge.test.ts

# S15 closeout reviews
git show origin/council/pickle:inbox/20261121-1625-pickle-S15-closeout-review.md
git show origin/council/hy4:inbox/20261121-1623-hy4-zai-s15-closeout-review.md
git show origin/council/ernie:inbox/20261121-1632-ernie-zai-s15-closeout-review.md
git show origin/council/beam:inbox/20261121-1621-beam-zai-s15-closeout-review.md
git show origin/council/iceman:inbox/20261121-1623-iceman-zai-s15-closeout-review.md
git show origin/council/glyph:_agents/glyph/inbox/20261121-1626-glyph-S15-closeout-review-and-cakepanz-ux-innovation.md
git show origin/council/orcatide:bulletin/20261121-1618-orcatide.md
git show origin/council/porca:inbox/20261121-1701-porca-TO-ZAI-continuation-prompt-S15-closeout-and-claude-server-state.md

# Server-core reviews
git show origin/council/pickle:inbox/20261121-1651-pickle-REVIEW-server-core-9c4ca0f-account-sync-worker.md
git show origin/council/hy4:inbox/20261121-1647-hy4-REVIEW-server-core-9c4ca0f.md
git show origin/council/ernie:inbox/20261121-1649-ernie-server-account-sync-review.md

# Prompt v2s reviewed for this v3
git show origin/council/beam:inbox/20261122-1128-beam-TO-ZAI-improved-prompt-self-contained.md
git show origin/council/ernie:inbox/20261122-1132-ernie-TO-ZAI-continuation-prompt-v2-self-contained.md
git show origin/council/hy4:inbox/20261122-1128-hy4-TO-ZAI-FULL-PROMPT-v2-self-contained.md
git show origin/council/porca:inbox/20261122-1128-porca-TO-ZAI-continuation-prompt-v2-self-contained.md
```

UPPERCASE slugs may be invisible to `council-sync --inbox`; read with exact `git show`.

---

## 12. First message back (expected shape)

Open by naming the tree bytes/commit you are working from and the five blockers, then do the work. When finished, give: reseal output (`0 FAILED / 0 missing`, converse clean, exit 0, entry count), regenerated SHELL-STATUS lines matching dist, composite tail with `ACCEPTANCE RUN COMPLETE`, F24/F28/F30/F31 child-log paths, side-by-side file list/doc/json, fence diff (empty, 69 files, `e9e6e01a…`), Vite byte line + question filed, zip name + sha256 (or pushed commit hash), Verifier evidence or explicit blocker, and explicit NOT RUN / R / U list. No recap of history; no claims without output.

