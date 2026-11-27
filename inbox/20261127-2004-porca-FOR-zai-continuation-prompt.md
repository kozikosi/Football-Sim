SPEAKER: porca | ROLE: council seat (reviewer / handoff drafter) | TASK: Owner 2026-11-27 request — review other seats' work and draft Z.ai's continuation prompt | DATE: 2026-11-27T20:04Z
FOR: Owner 2026-11-27 request · Z.ai continuation · Wave B gate restoration → slices 3–5 handover (seam neutrality P-368 context)
STATUS: **DRAFT PROMPT ONLY.** No product, engine, pin, governance, queue or tooling bytes changed by this filing; no build made; porca assigns no seat. The Owner may paste this to Z.ai verbatim or edit it.

# Z.ai — continuation brief (Owner-relayed; drafted from porca's 27 Nov review)

You are picking up the 25 November `zai-s17-continuation-2026-11-25` folder, not your pushed `council/zai` branch. Read this whole brief before editing anything. Every fact below carries a label: **VERIFIED** (a command was run and its receipt is named), **REPORTED** (someone else said it), **INFERRED** (reasoned), **UNKNOWN** (not checked). Do not turn a REPORTED or INFERRED line into a green claim.

## 0. Authority and lanes (read first)

- Only the Architect (Claude) writes `Football-Sim-*.html` / the engine. You build the Cakepanz/UI shell on the frozen engine pin `408410477`; never edit `colors/src/{core,sports,platform}` or anything under your `src/engine/` copy to make a UI or gate pass. If a task needs an engine byte, **stop and report**; do not "fix" it locally (`architect/engine-and-seats:claude/NOW.md`, lines 7–11, VERIFIED).
- Work nominally comes from the live queue on `origin/council/muse` via `node tools/council.mjs next` (v11). This brief is an Owner-directed continuation of an in-flight handover, not a seat assignment; file each deliverable in `inbox/` on your own branch and let the Architect pick it up.
- Commit and push required; one inbox file per item; add by path; never force-push; never touch another seat's worktree or the shared tree. Network hygiene: `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 …`, at most twice; if it still fails, `node tools/preserve.mjs snapshot` and give the Owner exact numbered terminal steps (VERIFIED from AGENTS.md §4).
- Do not deploy, publish, connect Cloudflare, create repos, or claim acceptance. Owner + Architect own those.

## 1. What I reviewed before writing this (receipts you can re-run)

### 1.1 Claude / Architect — `origin/architect/engine-and-seats` tip `1681d3a36` (VERIFIED)
- `claude/NOW.md` is dated **25 Nov** and says: ship 76 Pancakes; multisport parked; repo `kozikosi/76pancakes` (MIT, lowercase identifiers, "76 Pancakes" in user-facing docs); **no player data in the public repo, but stats do show on the site** (dataset is a deploy-time asset); work order v8 revised = top-3 one-click draft kept, pulse on every Draft button, top-three sheen + `.cp-top`, why copy kept, ring removed, no engine bytes; Waiting-on = "Z.ai slices 3–5 done" → runbook → ONE stats-fields commit (`playerLines`, `pickOverall`; `e8fed8ab` must hold in the old repo) → `test:ui` → CI chromium (T7). Do not treat `NOW.md` as current after its date: the tip has newer commits.
- Latest commit `1681d3a36` (T3, 27 Nov) closes account-sync gaps: deletes sent/remembered, delete-made-elsewhere removes only unchanged copy, newer server copy wins on unchanged local, history/restore/stats/share calls, jittered backoff; two bugs fixed (partial account switch uploaded unadopted saves; save during pull could be overwritten). Its receipt says colors **523/523**, tsc 89, build, server sqlite **40 pass / 3 skipped**, D1 **43/43**, mutants client **22/22** and server **9/9**, `core/sports/platform` unchanged. It explicitly says **"No independent review yet."** Treat that as REPORTED-by-author, not Verifier-certified.
- `claude/cutover-rehearsal-2026-11-25.md` (commit `b482289be`) says build/test PASS (colors 486/486, server 37/37 at that source), 501 of 744 tracked files cross to the new repo, 243 stay, 12 hidden, and **8 files hold 3+ sampled player names — needs an Owner decision before any push**. Do not assume that decision has been made.
- Architect's `claude/zai-work-order-v8-2026-11-21.md` is the standing UI brief; if you have not applied its revised items, do that before adding new screens.

### 1.2 Z.ai — delivered 25 Nov folder (all VERIFIED in `inbox/20261126-0146-porca-zai-s17-continuation-2026-11-25-review.md`)
- Published verbatim by porca at `council/porca` commit `4850bb2d9a8a2c91cb29e29bc1e82d63249e31fc` (840 files, 26 MB, no `node_modules/`; only added file is `PUBLICATION-NOTE-porca.md`). `shasum -a 256 -c SHA256SUMS-2026-11-25.txt` → **839 lines OK**, exit 0. Clean-room control (publisher note removed, space-free path) gave the same RED set, so the failures are yours, not publication artifacts.
- Verdict: **REGRESSED at the delivered bytes.** Full claims gate `25 OK · 8 RED · 0 skipped`, exit 1. Earlier "31 OK · 0 RED" was REPORTED true at Wave A bytes and is false here. Wave B is honestly PARTIAL — but PARTIAL must be measured at final bytes, not asserted.
- What still holds: engine fence against `408410477` is clean (`git archive 408410477 colors/src | tar -x -C "$T"; diff -rq "$T/colors/src" zai-s17-continuation-2026-11-25/src/engine` → exit 0, 69 files each side); acceptance seal hash `d536d63f…` matches `receipt-attestation.json` and there is exactly one `ACCEPTANCE RUN COMPLETE — every step exit 0` marker; Wave A receipts (430/430 engine, 37/37 node, 24/0 board, 28/0 slot, 18/0 visual, 41 side-by-side captures / 0 fallback) still pass their rows.
- Source-path caveat: `node scripts/check-claims.mjs` run from `/Users/kosi/Desktop/Football Sim/…` fails ENOENT because `new URL('..', import.meta.url).pathname` keeps `%20`. Run the gate from a space-free path, or fix the checker to use `fileURLToPath` — your call, but say which you did.
- Your pushed `council/zai` tip is `25e3b2f99` (1 Nov, w55). I read `/Users/kosi/Desktop/wt/zai` read-only at 03:27Z: clean, at that tip, **0 unpushed commits** — the 25 Nov continuation is not on the branch. If another local branch holds the 7 commits you previously reported as unpushed (REPORTED), push it with the limits in §0; otherwise the Desktop folder plus our publication are the only copies.

### 1.3 Other seats (brief)
- My P-160 review (`inbox/20261127-0327-porca-P-160-review.md`) found that the season-review rework targets Z-post-blue strings already recorded LIVE at `origin/main:z-core/11-worklog/WORKLOG-SHARED.md:338`, not Pre-Colors. **Do not use that rework as a template for Wave B retargeting** — fresh anchors and exact bytes matter more than prose.
- B1–B6 ideas are filed at `inbox/20261126-0146-porca-cakepanz-waveb-next-wave.md`; they are proposals, not accepted scope.

## 2. The blocking defect: eight REDs at the final delivered bytes (all VERIFIED)

Fix these **before** any demo or handover, in this order. Do not hand-edit generated text to make a row green; regenerate it.

1. `seal-count`: seal lines **401 ≠ 385** expected in `claims.json`.
2. `seal-verifies`: `node tools/verify-package.mjs .` → `401 OK / 0 FAILED / 0 missing` plus `EXTRA (not in CHECKSUMS.txt): SHA256SUMS-2026-11-25.txt`, exit 1. The checker's `SKIP`/`isMetaLayer` (lines 69–78) omits `SHA256SUMS-*`. A checksum file cannot list itself, so this is unpassable by construction until you either extend the skip set to cover `SHA256SUMS-*` or remove the file. Choose deliberately and state why; do not silently delete evidence. (In porca's published copy my publisher note is a second, disclosed EXTRA; do not treat that as your defect.)
3. `dist-in-seal-and-status`: claim pins `dist/assets/index-BHOhZuA_.css` + `index-Cb5sVPrX.js`; shipped dist is `index-CpxM29ri.css` + `index-BTZyEL9n.js`. Update to the actual final hashed names.
4. `status-freshness-agrees`: visual/slot latest receipts carry dist hash `8144ae6c…`; the final dist walk is `3f053afd…`. A later Wave B build replaced `dist/` after the browser receipts were taken.
5. `freshness-map`: 8 drifted inputs (e.g. `SHELL-STATUS.md`, `README.md`, `ZAI.md`, `deliveries/zai-s15-closeout-handover-2026-11-21.md` citing `src/App.svelte` / `visual-battery-latest.json` / `claims.json`). `gen-freshness.mjs` was not re-run after edits.
6. `state-blocks-fresh`: generated blocks are stamped `2026-11-25T06:54:35Z` and print 30 OK / 0 RED; this row follows rows 1–5 and cannot go green first.
7. `waveb-battery`: `deliveries/receipts/waveb-battery.log` ends in `SyntaxError: Unexpected identifier 'as'` at `batteries/waveB.node.battery.mjs:57`: `for (const field of ['ovr', 'wins', 'priority', 'gone'] as const) {`. `scripts/node-port-register.mjs` redirects the engine import; it strips no TypeScript. Minimal repair proposal: delete `as const` on that line (plain array iterates identically and the checker never mutates the list). **Do not** change the same token inside the *string fixture* at `batteries/node.battery.mjs:485`.
8. `offline-tent`: the checker threw ENOENT on `deliveries/receipts/offline-tent.json`. `npm run battery:offline` is wired in `package.json` and `batteries/offline.battery.mjs` exists, but no receipt was produced. Offline is a hard requirement (AGENTS.md §2), so the offline promise is UNTESTED, not passing.

The most user-visible consequence: `seam-card.json` — read by both the gate and the dev-gated Seam Card chip — says `sealCount: 385`, `claims.total: 31`, `distHash: 8144ae6c…`, while the tree says 401 / 33 rows with 8 RED / `3f053afd…`. Its `pin: 408410477` and `stampCanary: match` are still correct, so a chip rendering only those two fields looks healthy while three numbers lie (INFERRED from VERIFIED fields). Treat this as the primary honesty defect, not a cosmetic one.

## 3. Ordered continuation (do not skip gates)

### Step A — Push and preserve the current work (blocking for everything else)
1. From your own worktree only: `git status --short`; `git add -- <paths>`; commit; `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 push origin council/zai`; verify with `git ls-remote origin refs/heads/council/zai` and give the hash. No force-push, no `git add -A`, no stash.
2. If the 25 Nov folder is still only on the Desktop, publish it yourself to your branch with a `PUBLICATION-NOTE-zai.md` declaring exactly what you added; do not claim changed bytes are unchanged.

### Step B — Restore the gate at final bytes
1. Repair the Wave B battery (§2.7) and run `npm run battery:waveb`; require the `# WAVE B · N pass · 0 fail` banner in the receipt.
2. Run `npm run battery:offline` and produce `deliveries/receipts/offline-tent.json` from the real run. Read `scripts/check-claims.mjs` for the exact required field names; the receipt must bind the **final** `distHash`, show boot/draft/restore succeeded, and show `externalRequests` empty. Never type the receipt by hand.
3. Make a final `dist/` (if anything changed), settle the `SHA256SUMS-*` / `verify-package` meta-layer question (§2.2), and update the pinned dist names and seal count in `claims.json` to the measured values.
4. Re-run the browser batteries whose receipts feed freshness — at minimum `npm run battery:visual`, `npm run battery:slot`, and `npm run battery:board` / `npm run battery:node` if their inputs changed — so their latest files carry the final dist hash.
5. Regenerate in a loop until clean: `node scripts/gen-freshness.mjs`, `node scripts/gen-state-block.mjs`, `node scripts/gen-seam-card.mjs`, `node scripts/gen-claims-index.mjs`, `node scripts/gen-cutover-proof.mjs` (and re-run `gen-freshness.mjs` afterward if a generator changed a freshness input). Then run `node scripts/check-claims.mjs` (full) and `node tools/verify-package.mjs .`; require `0 RED` and exit 0 for both. Add a claim that `seam-card.json`'s seal/claim-count/distHash equal the live gate values, so a green chip cannot be manufactured independently of a green gate.
6. Only after every other byte is final, re-run acceptance/attestation (`node scripts/attest.mjs` and the sealed steps it drives). Verify `shasum -a 256 ACCEPTANCE-RECEIPTS.txt` equals `receipt-attestation.json`'s `log_sha256` and that there is exactly one `ACCEPTANCE RUN COMPLETE — every step exit 0` marker. Never hand-edit the sealed log.
7. Re-check the engine fence: `git archive 408410477 colors/src | tar -x -C "$T"; diff -rq "$T/colors/src" <your-folder>/src/engine` → exit 0, 0 diff lines. Report the byte count and hash of the exact folder you certified.
8. Obtain a **fresh independent Verifier** — a seat that authored none of the folder or its fixes. Porca's review is an integrity/claims seat review and cannot certify it (porca authored the publisher note).

### Step C — Finish slices 3–5 and hand over to the Architect (this unblocks Architect T7)
Deliver one static `dist/` plus `SHA256SUMS.txt` at final bytes, and a handover doc with: commit hash and SHA256; the named laws the batteries enforce (and any retired law, with reason); side-by-side captures against w89; 390 px no-horizontal-scroll receipt; `file://` boot with zero external requests and zero console errors; the engine-fence receipt from Step B7; and an explicit `PARTIAL`/`DONE` list. The Architect's `NOW.md` says T7 waits on exactly this. Do not merge into `colors/`, do not change the engine, do not deploy.

### Step D — Close the v8 and T1 asks still outstanding
- Work order v8 revised: top-3 one-click draft, pulse on every Draft button, top-three sheen + `.cp-top`, why copy kept, ring removed. If any item is missing, implement it in your shell with fresh receipts; if it is already present, cite the file and receipt rather than redoing it.
- T1 (relayed by the Architect, 25 Nov): boot fetch of `/dataset/madden27.csv`; on 200, hand the text to the existing user-CSV import (`colors/src/sports/nfl/app/dataset.ts` path A, same validation); on 404, the `no-dataset` empty state with upload control; **no `?raw` CSV import anywhere**. No player data committed to the public repo. If the deploy asset is not yours to create, file the exact shell-side change and stop.
- T6 flags: page title/header should say **76 Pancakes** ("20-0" is the season record, not the product name); `src/App.svelte` still has a stale `ENGINE_PIN`; CI pin-watch should use content hashes; Playwright is pinned at 1.65.1 — do not change `package.json`/lockfile to get around a blocked chromium download; report UNKNOWN instead.

### Step E — Next-screen ideas (proposals only; pick, do not swallow all six)
From `inbox/20261126-0146-porca-cakepanz-waveb-next-wave.md`, ranked by porca:
1. **B1 byte-latched Seam Card** — add generated `treeSha`; if it differs from the running build's embedded hash, render `UNKNOWN · generated before the last edit` with **no numeric fields**. This directly repairs the green lie above. Highest leverage.
2. **B2 epistemic ladder** — MEASURED / INTERIM / UNKNOWN for every displayed number; INTERIM shows no numeric delta, one sentence naming what is missing; UNKNOWN shows neither. State comes from VM metadata, never inferred by a component.
3. **B5 offline chip** — show `Offline · no network used` only when the tent receipt's `distHash` equals the shipped hash and `externalRequests` is empty; otherwise `Offline · unverified`.
4. **B3 agency rail** — "Whose pick was that?" tint sliver + VM-sourced "user pick"/"CPU pick" line + tap-to-filter; colour only from the Owner's 32-team table; never infer agency from colour.
5. **B4 coach's tape** — three frames (*call → matchup edge → turnover/game ball*) from VM events already present; if the VM has no edge field, say UNKNOWN, never invent causation; every turnover named, overtime only in its block.
6. **B6 decision rail** — one focusable rail over `domHooks`/`statusVM`, arrow keys, one spoken line per pick, reduced-motion heat strip, one registry for all `data-status-*`.
Guard for all: Svelte 5 `$derived.by` over immutable VM data, no `document` access in `src/lib` (P-368 seam neutrality), no default-green fallback, no invented data (AGENTS.md §7). File each as an `IDEA:` inbox note; nothing is accepted until the Architect rules.

## 4. Anti-goals (hard stops)
- No engine byte, protected constant, pin, governance file, queue or tool owned by MUSE/Architect changes under this brief.
- No "green" prose at bytes you have not re-measured; no quoting generated state blocks as a verdict; no weakening a law to make a claim pass.
- No invented player/rating/team/stat data; no hand-typed receipts; no removing a failing artifact merely to reduce a RED count.
- No force-push, no stash, no work in the shared tree or another seat's worktree, no assigning another seat to do your work.
- No deploy/publish/Owner-level decision (CF account, repo creation, "go") taken by you.

## 5. Definition of done for this sitting
Post in one `bulletin/<UTC>-zai.md`, with commands and outputs, and push `council/zai`:
- the pushed commit hash and `git ls-remote` confirmation;
- `check-claims` full and packaging rows both `0 RED`, exit 0, at the **final** folder hash;
- `verify-package` exit 0 with the meta-layer decision explained;
- Wave B and offline battery banners/receipts, including `offline-tent.json`'s final `distHash` and empty `externalRequests`;
- regenerated freshness/state blocks/seam card/claims index/cutover proof with timestamps and the measured seal count, claim count and dist hash;
- resealed acceptance log hash and attestation match;
- engine-fence `diff -rq` result;
- slices 3–5 handover file name and hash, with the Architect T7 items listed DONE/PARTIAL;
- the v8/T1/T6 status line; and
- one next-screen IDEA with the open question below answered in your own words.

## 6. One question for you (unchanged, still open)
**When you picture the next Cakepanz screen you'll actually show someone, what's the moment you wish it handled better?**
