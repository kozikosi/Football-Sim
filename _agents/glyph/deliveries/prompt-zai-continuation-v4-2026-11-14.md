# Z.AI — continuation prompt v4: post-sitting closeout, Cakepanz publish path, and next builds
**From:** glyph (council seat), relayed by the Owner · **Date:** 2026-11-14 · **Version:** 4
**Read order:** this file is a full, current prompt. It supersedes the practical “what to do next” state of Ernie v2 (`origin/council/ernie:218bbafa`, `_agents/ernie/deliveries/prompt-zai-continuation-v2-2026-11-14.md`) and v3 delta (`_agents/ernie/deliveries/prompt-zai-continuation-v3-2026-11-14.md`, `18f344f5`→`c817f5c4`) by incorporating them and the 2026-11-14 sitting results. Read v2/v3 if you need the original rationale; **follow this file for current actions and facts**.

**Read this whole file before you run anything.**

---

## 0 · Orientation
1. `git fetch -q origin` then the step-0 checkout in `START-HERE` §1 (four governance docs from `origin/council/muse`).
2. Read `AGENTS.md` §1–§5 and `_agents/README.md`. Nothing here overrides them.
3. **Push credentials do not work** for your seat (expected). Build in your sandbox, then **hand the Owner the folder + `MANIFEST.txt` (+ zip if convenient)**. A credentialed seat will vendor it byte-exact. Do not try to fix git auth; do not re-clone.
4. **Wave:** w89 is live per prior verified refs (`origin/gh-pages` tip `3e69567c`, "Publish w89 as live index" — REPORTED from earlier reviews; confirm with `git log --oneline origin/gh-pages -5` if reachable). If newer, state it and work from the live wave.
5. **Engine/framework boundaries (standing):** Architect (Claude) owns engine/product file. You own shell/UI/measurements/proposals. Do **not** edit `colors/`, `draft.ts`, `lineup.ts`, `slots.ts`, `value.ts` (P-318 not landed). No ratings generation. Basketball deferred. Framework ruling OPEN (Svelte not a lock) — keep work framework-neutral where possible; if you see a major advantage in Svelte or Vue, argue with a receipt, do not pick silently. Offline is a hard requirement.
6. **Continuation v3 §12 is still a placeholder** as of this prompt: DS/Pickle/GLM continuation-deltas/axis prompts have not been appended in-repo that I can verify. Do not wait for §12 to start core work. If the Owner relays their answers later, incorporate them and include a `CONTINUATION-DELTAS` section in your delivery.

---

## 1 · Delivered / closed — do not redo (cite, don’t re-measure)

### 1.1 Prior deliveries on remotes (VERIFIED by multiple seats)
- `zai-open-wave-v3-2026-11-14` — 256 files, MANIFEST **255/255** (`_agents/ernie/deliveries/...` @ `council/ernie` `ddddd600`; also glyph delivery copies reviewed). Receipt-rich; offline/determinism claims supported by packaged receipts.
- `zai-recovery-2026-11-14` — 22 files, MANIFEST **20/20** (`d190e192` ernie; root `council/inkling` `e79e7693`; `_agents/glyph/deliveries/` `d3271ff1`). Closes artifact gaps (standalone `receipts/a3.json`, scripts incl digest/driver scripts, errata remeasure). a3 = **chromium-identical; Firefox/WebKit UNKNOWN** (launchers missing) — do not cite multi-engine evidence.
- `zai-fwtest10-2026-11-14` @ `council/ernie` `309caced` — DS byte-check VERDICT `improved` (44/44 manifest, core claims held; 3 corrections required — see §4).

### 1.2 Digests, pool, errata (settled)
- **Vendor digests (algorithm of record: your `vendor-digest.mjs`; root-dependent):** `432a1701…195e272d` (112, root `colors/` @ `d3bd81d2`, LF-normalised) · `753997ba…0ba08aa0b` (57, root `colors/`) · `4c3c8f17…511e428923` (57, root `<arm>/src-bench/engine` / `colors/src`) · `fef700c7…a31191fcb` (103 @ `4ca9a071`). `cd298e99` dead. **Always state root and file set with any digest.**
- **LF/CRLF rule (v3 §0):** digest is over the **LF-normalised checkout** of `colors/` @ `d3bd81d2`. Same 112 files CRLF-converted yield `7af5279953be55d74bfcf656bb6c48b08cf44c18661ba72d83e3e6d1e8c29072` (not a tree mismatch). Add this sentence to digest prose and `vendor-digest.mjs` header in your next delivery.
- **Pool gap CLOSED:** 1,941 ratings + 12 FA = **1,953**; LS filtered in both load paths → draftable/board **1,921** = 1,953 − 32 LS. Correct, not a bug.
- **D.8 recorded-dead:** raw playoff HFA (5.57 vs 1.78) does not survive strength control — do **not** cite it as a playoff finding; base HFA ~+1.8–2.0 pts is what survives.
- **Errata re-adjudication stands** (40 samples 10+10+20; run-1 tail host event). Quote per-delivery counts (v3+recovery = 255/20), never aggregate “753/753” as a wave manifest.

### 1.3 Sitting 2026-11-14 (vendored + reviewed)
Vendored on `origin/council/glyph:5beafd85` at `_agents/glyph/deliveries/zai-sitting-2026-11-14/` (210 files, ~2.3M). Glyph byte review: `inbox/20261114-1840-glyph-zai-sitting-2026-11-14-review.md` (`9d671ff4`, VERDICT `improved`).
- **VERIFIED:** root `CHECKSUMS.txt` 209/209 OK; `67-cakepanz-s3-s4-rev2/MANIFEST.txt` 183/183 OK; `flex-live/tools/mathlab/flex.json` sha256 `0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6`, 99 leaves, tiers `{0:23,2:10,6:43,12:23}`, `QB->FS 12`, 17 source roles.
- **Cakepanz s3-s4-rev2 (REPORTED by filings, manifests present):** engine pin `4ca9a071` byte-identical pre/post, engine tests 284/0, clean build, live battery 61/0/10 loud/3 defer; three 10-Nov review doc fixes applied (slice3 README law count, checksums regenerated on final bytes, title). **Slices 3+4 remain to be published to gh-pages** by Owner/credentialed seat (live tree still slices 1–2). P-317 blocked.
- **SAVE-1 CLOSED (node-side, receipt authoritative):** `measurements/save1-write-median.txt` — serialize median **0.889 ms**, p95 **1.133 ms**, mean 0.949 ms, n=201, envelope **128,937 chars**, serialize+write(Map) 0.893 ms (node v24.22.3, pin `4ca9a071`, Map/no browser localStorage). Filing prose stated 0.922 ms — treat receipt as source of truth in future refs.
- **P-324/w88:** audit filing claims NEW Wins table/order present in w88/w89 (32/32), no stray weight numbers in position displays (score-panel group toggles are separate pre-existing labelled table). REPORTED/receipt-backed.
- **Pool study, D.8 strength control, closure items, fwtest10-corrections, v3 experiments:** filings/scripts present and checksummed as listed.
- **Known sitting gaps (VERIFIED):** (1) README says “seven inbox-format filings” but **9** exist. (2) Referenced measurement outputs missing from folder/checksums: `measurements/distfile-boot.json` (cited by `inbox-20261114-zai-v3-experiments.md`) and `measurements/d8-strength-control-output.txt` (cited by `inbox-20261114-zai-d8-strength-control.md`) though scripts/filings exist. (3) Minor SAVE-1 prose vs receipt variance above.

---

## 2 · Closeout — do these in your next delivery
1. **Ship missing receipts:** include `distfile-boot.json` and `d8-strength-control-output.txt` (or rerun and ship corrected receipts) so filings’ claims are fully checkable from bytes. Align SAVE-1 prose to the measurement file if you restate it.
2. **Future packaging hygiene:** fix README filing count if you repackage; in any future re-packaging of earlier waves apply v3 §1 corrections where applicable (RECOVERY-NOTE parenthetical 20 entries; exclude `dist/dist/` duplicates so arm/file counts are truthful). Originals on remotes are not to be rewritten silently — file corrections/notes.
3. **“Two-sentence how to verify”** in every delivery README (command + expected result) — v3 §7.4.

---

## 3 · Priority queue (what to do next)
Work in this order unless the Owner directs otherwise. Budget for the fact that **no CI gate will catch regressions for you** (v2: two red tests de-gated).

### P1 — 67 Cakepanz Slice 3 publish readiness (P-316)
- Rev2 is re-verified and historically reviewed improved×3; your sitting applied the three doc fixes. **You cannot push gh-pages.** Deliver a publish-ready `67-cakepanz-s3-s4-rev2/` (or current rev) with MANIFEST/checksums and a one-paragraph relay note: exact folder to publish under `67-cakepanz/`, expected verify commands (`sha256sum -c MANIFEST.txt` 183/183; engine pin diff 52/52 vs `4ca9a071`; `npm run test:engine` 284/0; battery 61/0/10/3 as applicable). State clearly that gh-pages publish is Owner/credentialed-seat action.

### P1 — Slice 2 revision spec now; build only when unblocked (P-317, P-315)
- **BLOCKED on Architect store change:** user must pick **team + draft position (1–32)** on Team Select; `START`/`SaveRecord` must accept/persist slot and `newDraft` custom order (restore must not throw “pick is out of order”). As of 2026-11-14 this was unlanded at architect tip (REPORTED from sitting filing) — verify current state before acting.
- **Now:** write/update the exact spec (files, store contract, restore, seed/order interaction, a11y, UX). Mark every assumed line **INFERRED** where contract unlanded. **Do not merge UI against an unlanded store contract.**
- **When landed:** implement picker, pass slot through `START`, then P-315 deep check — draft several rounds as chosen team (**early-pick and late-pick**) confirming on-clock slots, roster placement, CPU picks around user, mode lock across draft. **Receipt per round.**

### P1 — Dynamic engine / axis (c) leverage (P-345)
- **Player-game join for axis (c)** (key-player presence) — highest leverage; also feeds λ estimation. Build/measure what the data supports; file receipts.
- Read Owner rulings verbatim: `origin/council/muse:_agents/owner-notes/2026-11-11-fluctuating-dial-and-dynamic-engine-verbatim.txt` and `...-dynamic-engine-verdicts-verbatim.txt`.
- File an **axis-list comparison**: your D.1–D.9/PD.1–PD.7 vs Claude’s 8 and GLM’s 6 — where you differ, what is measurable with 2016–2025 pbp/participation/snaps, and gaps. No new P-IDs (use `PRIORITY+:`/inbox).
- **Rulings/constraints:** 0.20-vs-0.40 binary dead; flex prices **REJECTED as fluctuation** (stay consistent); calibration targets static; **no injuries ever**; **no per-player clutch ratings**; OVR static display (form ±5–6 underneath, arrows/reset rules per prior rulings); draft slot value MOOT; slot values matchup-aware approved; gravity/double-teams approved (surface in Advanced Stats); clutch visuals (final 5:00 + OT) named to you — propose/design with receipts, do not ship engine changes. D.8 playoff HFA stays strength-controlled/recorded-dead unless re-run with control and reported honestly.

### P2 — fwtest10/v4 corrections for any future/updated delivery (v3 §8, DS improved)
Your numbers were right but logs/labels had hazards — fix in next relevant delivery:
1. **C5b “101” leaves:** live table is 99 (tiers 23/43/10/23, sha `0a26d7c2…`). 101 = 99 + 2 non-rule top-level nodes (`_source`/`roles` counted, or `roles`/`flex` as container nodes depending on walker) — reproduce mechanism and correct log line/script; never summarize as 101.
2. **C-engine-suite log:** include summary count (`tests 323 / pass 323 / fail 0`) with exit/wall, not just `exit=0 wall=52s`.
3. **Retired flex hazard:** never quote or ship `tools/mathlab/flex.json` from a delivery branch unlabelled — `council/ernie` carries RETIRED REV 4 (`28a2e993…`, 107 leaves, QB→FS -10). Prefer ship/cite live `0a26d7c2…` (99) or explicitly label which copy and point to live ref. **Never implement AGENTS line 73 “QB…FS at -10 (REV 4)”** — stale; live table governs.

### P2 — Complete v3 §7 experiment receipts
1. **dist-file boot from `file://` with network blocked, timed:** first paint, board interactivity, pick-reveal/animation behavior at 390 px under CPU throttle (e.g. 6×) — report degradation honestly (finding, not just pass/fail). **Ship the JSON/receipt** (missing from sitting).
2. **CRLF digest self-receipt:** run your own `vendor-digest.mjs` (or equivalent) on deliberately CRLF-converted copy, confirm `7af52799…`, and add the LF-normalised sentence to digest section/script header.
3. Pool draft contribution study — done (filed); only extend if Owner asks (e.g. custom pick budgets).
4. “How to verify” written before build — include in README.

### P2 — P-324 (w88 Wins)
Verified landed in w88/w89 per sitting audit (REPORTED). Revisit only if Owner requests changes. If touched, read MUSE NEW P-321 table (per-position local slope ±5, pool centres, slope×20; **±10 trap reproduces old slotWins20** for moved slots) — `_agents/muse/deliveries/prompts-2026-11-05/zai-w88-wins-2026-11-09.md` on `council/muse`.

### P3 — Slices 4 and 5 (later; briefs now)
- **Slice 4 (feed):** engine `FeedEvent` union (drive-level), what you’d mock, what you’d refuse to ship.
- **Slice 5 (shareables):** `receipts/brag-card.html` is a working self-contained offline card (fonts embedded) — strong head start; document in slice README. Do not start ahead of P1/P2 items above.

---

## 4 · Measurement, manifest, and record discipline (apply every delivery)
1. **Four lines per key claim:** cwd · exact command · ref@sha · output (exit codes/counts/hashes). “Exit 0” alone is not a receipt.
2. **Archive beats tree:** `git archive <ref> -- <path> | tar -x -C $SCRATCH`. Never a moving checkout.
3. **Labels:** VERIFIED (you ran it, receipt in text) / REPORTED / INFERRED / UNKNOWN. “No signal” is a result.
4. **Manifest rule:** generate AFTER last byte-changing step, on the exact tree being committed, file list from `git ls-files` (or committed-tree equivalent). If manifest lists a file the tree cannot contain (gitignored generated artefacts), say so in one line or exclude it. Never quote a built-tree verification as a committed-tree property without that note. Hash committed/blob bytes as appropriate.
5. **No rankings/winners/eliminations** (frameworks, seats, approaches). No re-opening framework question. No presenting UX-1/2/3 as framework findings (engine-bound).
6. **A digest without root+file-set is not a receipt.** Recompute hashes from bytes before citing manifests.
7. **Withdraw your own errors in writing** in the delivery (you did this well in recovery note).
8. **Exclude `dist/dist/` duplicates** in packaging; quote per-delivery manifest counts.
9. **No new P-IDs.** Propose via inbox/`PRIORITY+:` (queue is MUSE’s).

---

## 5 · What not to do
- No engine/`colors/` edits; no `draft.ts,lineup.ts,slots.ts,value.ts` until P-318.
- No injuries (ever), no per-player clutch ratings, no flex-price fluctuation, no dynamic calibration targets.
- No basketball/platform-UI/simulation-designer now. No ratings generation.
- No re-measuring settled items (goldens, contract identity, four digests/roots, manifest identities, pool-gap arithmetic) except to close explicitly stated gaps with receipts.
- No flex number quoted from a delivery tree unless it is the live table `0a26d7c2…` (99) and labelled; never implement REV 4 -10.
- No 753/753 aggregate manifest claim.

---

## 6 · Delivery shape (required)
```
SPEAKER: zai | ROLE: executor | TASK: <task> | DATE: <UTC>
FOR: <P-id or topic>
PIN: <engine pin(s)> · BASE: <commit/branch/ref> · ENV: <node, os, browser if used>

VERIFIED:
- cwd: ...
  cmd: ...
  ref: ...
  out: ...

REPORTED:
- <claim + source + why not re-run>

INFERRED / UNKNOWN:
- <as needed>

FINDINGS / IDEAS:
- <numbered, specific, falsifiable where possible>

FILES:
- <paths added, seat-owned only>
- MANIFEST.txt (sha256, generated after last byte-changing step, on committed tree/file list)
- README: two-sentence "how to verify" (command -> expected result)

CONTINUATION-DELTAS (for prompt-zai-continuation-v3 §12 / next prompt update):
1. STALE ITEMS: <anything now closed/answered by this delivery, with receipt>
2. STILL-BLOCKED: <e.g. P-317 store contract, gh-pages publish creds>
3. NEW INPUTS FOR Z.AI: <pointers if any>
4. Z.AI-INTERRUPTION/STATE: <what is done vs UNKNOWN; do not speculate>
5. WHAT THE OWNER SHOULD TELL HIM FIRST: <one sentence>
```
Hand the Owner one folder + `MANIFEST.txt` (+ zip). Nothing is “delivered” without a verifiable handoff and hashes.

---

## 7 · One-sentence unblocker for the Owner to tell Z.ai
“Start with §2 closeout receipts (ship missing `distfile-boot.json` and `d8-strength-control-output.txt`, align SAVE-1 prose to the receipt) and §3 P1 work (publish-ready Slice 3 rev2 relay note + P-317 spec marked INFERRED where unlanded + axis-(c) join/comparison), following the manifest/LF-digest/flex-`0a26d7c2` rules in this prompt.”

— glyph (council seat) · 2026-11-14 · based on Ernie v2/v3, verified zai-sitting-2026-11-14 bytes on `origin/council/glyph`, and council rules as of this sitting.
