# Prompt for Z.ai — continue Cakepanz work after S13 (`67-cakepanz-13-2026-11-20`)

**Prepared by:** iceman (council seat, advisor) on `council/iceman` · **Date:** 2026-11-20  
**Purpose:** a long, thorough continuation prompt/brief for Z.ai (High Councillor, Executor of Z-post-blue and 67 Cakepanz).  
**How to use:** paste or attach this document as the tasking context for Z.ai’s next chat. Treat every factual claim below as labeled (**VERIFIED** = checked by iceman in the S13 tree/docs on 2026-11-20; **REPORTED** = stated by S13 receipts/reports/logs, not independently re-run by iceman; **INFERRED**; **UNKNOWN**). Re-verify before relying on any REPORTED number in a new receipt.

---

## 0) Role, bounds, and non-negotiables (restate and obey)

- **Identity/seat:** Z.ai, Executor of **Z-post-blue** (single-file HTML waves) and **67 Cakepanz** (parallel Colors UI track). High Councillor below Architect (Claude), above advisors. Sandbox reads GitHub over public HTTPS but cannot push; work reaches GitHub as a **zip handed to the Owner** for relay. (REPORTED by `START-OF-CHAT-ZAI.md` in S13.)
- **Owner’s words are law, verbatim.** Intake first (list every ask, map each, flag interpretations). **The Architect owns the engine — do not touch it.** Cakepanz consumes a frozen snapshot (five-path fence moves together at re-pin). Ratings are Owner’s alone. Basketball deferred. No ring build until the Architect rules the C′1 contract (A/B/hybrid). No governance-file edits outside your own delivery/inbox materials as appropriate to your lane rules.
- **Receipt law:** every claim carries command + raw stdout tail + exit code at the final state. A gate passed without output pasted is not a gate. A number not measured is REPORTED and named. If state changes, rewrite the receipt (raw stdout of the tool at final state).
- **Packaging/delivery:** never `git push` from sandbox (no creds) — local work + zip. Finish all requested work before responding (one response/zip) unless blocked (name blocker plainly). Never claim delivery without a pushed commit or a download link. Network commands with timeout, ≤2 attempts, never hang silently. Sandbox paths are not Owner paths.
- **Do not invent work beyond directives;** if idle, take top OPEN queue item in your domain and run full pipeline. Innovate within guardrails (better way to build = build it and show reasoning), but do not move bounds (no engine edits, no ratings, no re-pitch rejected features, etc.).
- **Never edit other seats’ lanes/Claude’s files/council queue/another seat’s branch.**

---

## 1) Baseline — S13 end state (`67-cakepanz-13-2026-11-20`, 2026-11-20)

### 1.1 What this package is (VERIFIED in tree)
- **Package root:** `67-cakepanz-13-2026-11-20/` — 451 files, ~18 MB, no `node_modules`/`.git`; includes `cakepanz-4/` (full app/source/batteries/scripts/tools/data/dist/receipts/deliverables/inbox), top-level `README.md`, `START-OF-CHAT-ZAI.md` (§2 rewritten for post-S13), `ACCEPTANCE-RECEIPTS.txt`, `CHECKSUMS.txt` (448 entries), `bulletin/20261120-1820-zai.md`. `dist/single.html` present (~521 KB). `cakepanz-4/CHECKSUMS.txt` 445 entries.
- **Key S13 artifacts (VERIFIED present):** `cakepanz-4/deliverables/sitting-report-s13-2026-11-20.md`, `SLICE-STATUS-2026-11-20.md`, `ACCEPTANCE-p316-slice3-2026-11-20.md`, `HANDOFF-SNAPSHOT-2026-11-20.md`, `DISPATCHASYNC-WIRING.md`, `MERGE-MANIFEST.md`, `CUTOVER-CHECKLIST.md`, `CUTOVER-ONE-PAGER.md`, `ROLLBACK.md`, `batteries/seam-golden.json`, `scripts/golden-seam.mjs`, `scripts/viewport-matrix.mjs`, `VERIFY-§25-append.txt`, `deliverables/receipts/partH-s13/falsify-board-13b-final.log`, `deliverables/receipts/viewport-matrix-latest.json`, `inbox/20261120-1814-zai-T8-c10-hosts-READY.md`.

### 1.2 Engine/pin and merge framing (REPORTED by S13 handoff/docs; auditable)
- **Pin:** `408410477` on `architect/engine-and-seats` (commit), **69 TS engine files**, byte-identical to `ee3b6e1` over `colors/src` (`git diff` empty), all 69 snapshot files byte-compared this sitting with zero mismatches; five-path fence identical (`src/engine/`, `tools/mathlab/flex.json`, `test/engine/`, `test/engine.test.ts`, `data/packs/*.json`). Carried suite at those bytes: **430/430** (REPORTED). Precompile: 69 files generated (1 transformed: `platform/localstorage.ts`).
- **Reframing:** engine frozen and current at pin while deployed tree historically 57 files — “no engine re-sync to design; deploy closes the 69-file tree; Claude merges UI around the pinned engine.” (REPORTED)
- **Duplicate-engine deletion planned post-merge** after `cmp` proves byte equality (per `MERGE-MANIFEST`/one-pager). **Do not create a second engine copy.**

### 1.3 Gates and measurements (REPORTED by S13 receipts/report; not re-run by iceman)
- **Final-bytes gates:** engine **430/430**; node **35/35** (+N34 seam golden, +N35 b36 anchor); board **16/0** (+L22); slot **28/0**; visual **17/0** (+W12, +W13); shell **48/0**; slice **29/0/10/3**; contrast **2/0**. Viewport matrix **45/45** (390/768/1280 × 15 surfaces), **0 overflow, 0 console/page errors**. Both gate checks PASS/CLEAN per report.
- **13b falsifier:** run 1 exposed real defect — staged-path legs (L19–L22) crashed dead-ring mutant before L13 (crash-before-L13 class), fixed with same skip-loud ring-present guard; fixed battery green on clean bytes. **Run 2 (final):** all **9 cases DIED, exit 0**, **F20 DIED with FAIL L13 named** (strict form) — receipt `deliverables/receipts/partH-s13/falsify-board-13b-final.log`. **REPORTED.**
- **Composite (`bash scripts/acceptance-run.sh`):** report states it ran end-to-end at final bytes and regenerated `ACCEPTANCE-RECEIPTS.txt`, but **at packaging time** the composite’s incremental record showed first 15 steps green while its own 13b pass (steps 13b–17) was still running; standalone run-2 closes 13b. **Action:** reconcile/collect finished composite tail and file into VERIFY §26 if not already complete in the tree you ship.
- **Reconstruction recipe (corrected):** c9 full + c10 diff set applied **once** (c11 diffs byte-identical re-host of c10 — applying both reverses first) + c11 whole files + c12 whole files + five-path re-pin. Documented in `START-OF-CHAT-ZAI.md` §2 and sitting report.

### 1.4 What S13 closed/added (VERIFIED by spot-checks + REPORTED)
- **Laws/fixes:** **W12** (restore shareability: `loadDraft` → `writeSeedToUrl`, URL seed == store seed after reload-restore), **W13** (“New draft · new seed” clears `?seed=` pin; explicit replay untouched), **N35** (b36 payload anchor rejects malformed prefixed codes; valid forms parse), **L22** (staged Confirm double-click/null guard, 380 ms window), **N34** (seam golden `batteries/seam-golden.json` via `scripts/golden-seam.mjs` — VM→JSON map for boardVM/goneOdds/lineupFor at fixed seed). **VERIFIED present in code/batteries/scripts.**
- **Verifier:** converse check added (walks tree, fails on `EXTRA` not in `CHECKSUMS.txt`, exit 1; “converse clean” on pass) — **VERIFIED** in `tools/verify-package.mjs`. Planted-extra proof receipted per report (**REPORTED**).
- **Docs/ops:** README defects fixed (13b wording, verify path, md5sum wording, pin line), SHELL-STATUS regenerated, SNAPSHOT/VERIFY §25 updated, gh-pages repoint re-verified end-to-end on fresh extract (277/286 → dry-run clean → 286/286, tests-only) (**REPORTED**), T8 marked **READY** with exact paths/md5/relay procedure and STOP rule (**REPORTED/VERIFIED note present**).
- **Slices:** Phase A audit — every slice BUILT with named laws re-run green; slice 3 acceptance closed; slice 4/5 acceptance rows supplied; P-319 audited as architectural (engine owns display; golden pins data export) — **REPORTED** in `SLICE-STATUS`.

### 1.5 Fix-round crosswalk (Ernie c12 prompt Items 1–8) — status entering this sitting
(Assessed by iceman against S13 artifacts; treat as **REPORTED/partially VERIFIED** and re-confirm on your working bytes.)
- **Item 1 P0 seed round-trip (PORCA S1): addressed** (prefixed `b36:`, N35, W10 wide/legacy 0-failure coverage, W6 prefixed display, URL write-backs).
- **Item 2 P0 F20/13b: addressed** (D-2 stale-server guard in `falsify-board.mjs`, crash-before-L13 fixed, run 2 all DIED incl. F20 FAIL L13 named) — confirm composite tail provenance.
- **Item 3 P0 packaging md5/checksums: substantially addressed** (no self-entry, portable node verify in `package-delivery.sh`, converse check) — explicit tamper-proof transcript for the exact Item-3 path not separately surfaced in read; consider capturing if useful.
- **Item 4 P1 docs/13b stdout: largely addressed** (README/SHELL-STATUS/VERIFY/receipts reconciled; §26 tail follow-up noted).
- **Item 5 P1 a11y D2+S3: addressed in code/laws as reported** (value-inclusive aria-labels, gone% described/focus-revealed per L20/L21); independent AT audit still valuable.
- **Item 6 P1 one-click safety R1+S2: addressed** (380 ms guards, confirm/disarm, L16/L18/L19/L22).
- **Item 7 P1 restore copy S4: addressed** (B2b restore-path reassurance).
- **Item 8 P1 seeds R2+S5: addressed** (W12/W13, widened draw evidenced, W11 768px).

### 1.6 Other seats’ reviews/context already integrated or noted
- **Z.ai T7 seat-notes review** (in-package): `ok` on Pickle/Ernie passGap, Pickle S1 seam, Pickle plan-M; useful additions (stale-copy consumer/provenance, future invariance law for advice/ring under snapshot, pre-commit acceptance bands for post-cutover fit, precise tilt paths). No build changes.
- **C′1 ring request** (in-package): raw keys stripped in view / ring computed from parsed display strings; recommends `suggestions { ids, rankedBy, cutoffRaw, reason }` export (or `rawSort` + view tie-walk). **Architect ruling pending — do not build ring fix pre-emptively.**
- **hy4/Ernie/Pickle findings reflected in S13:** converse check, b36 anchor, restore shareability, new-seed affordance, 13b hardening, doc/packaging corrections (as named in report).

---

## 2) What remains open (by dependency)

### 2.1 Z.ai-actionable now (within bounds)
1. **Provenance closure — composite tail / §26:** read `cakepanz-4/ACCEPTANCE-RECEIPTS.txt` tail and any completed composite logs; if steps 13b–17 are now complete at final bytes, capture the finished raw stdout block and file/update VERIFY §26 (or the appropriate verify section) so the tree’s canonical receipt record is unambiguous. Do not invent a green — only record what the tools produced.
2. **Receipt hygiene (optional but valuable):** if any S13 fix lacks a crisp standalone proof (e.g. Item-3-style tamper demo for the packaging path you actually ship), produce a small, reproducible receipt (scratch copy, tamper byte → named failure/non-zero; pristine → pass) and include it.
3. **Pre-relay verification bundle for Owner:** prepare a short, numbered relay checklist in-delivery (or update existing) that cross-references exact artifact paths, expected outcomes, and STOP conditions for: (a) S13 tree landing + `node tools/verify-package.mjs .` converse clean, (b) gh-pages test re-point (tests-only patch, dry-run clean, 286/286) if/where applicable, (c) T8 host repair using `inbox/20261120-1814-zai-T8-c10-hosts-READY.md` (md5 `0a2869538a706e7e6ea864664b7e5c9f`, 49/49, STOP on miss). **Do not claim relay executed.**
4. **UI/UX shell hardening and innovation proposals (safe, engine-truthful):** produce concrete, receipted improvements or option packs that stay inside bounds — e.g. accessibility/contrast remediation proposals (the 6 known AA holes are named in contrast receipts; Owner rules fixes), keyboard/SR/focus polish with tests, 390/768/1280 resilience, clearer provenance/seed/engine-pin stamps in UI copy where already surfaced, share/restore clarity, reduced-motion consistency, performance-minded rendering (virtualization/memoization plans with measurements) — **no engine changes, no invented data, no ring semantics change before ruling, no ratings**. Prefer attaching static mockups (≤10 KB HTML) or measured diffs + battery/law additions.
5. **Merge-readiness aids for Architect:** keep `HANDOFF-SNAPSHOT`, `DISPATCHASYNC-WIRING`, `MERGE-MANIFEST`, `CUTOVER-CHECKLIST`, `CUTOVER-ONE-PAGER`, `ROLLBACK` consistent with final bytes; if you regenerate any, re-receipt. Highlight the 4 `dispatchAsync` call sites and the “pending written contract” dependency plainly.
6. **If the Owner gives new directives:** intake verbatim, map, build, verify, zip — in that order.

### 2.2 Owner-relay / Owner-action (Z.ai prepares, cannot execute)
- **T8:** apply repair bytes on 4 hosts per READY note → expect 49/49, STOP on miss (REPORTED ready; relay pending).
- **gh-pages test re-point:** apply `claude/patches/cakepanz-test-repoint-2026-11-20.patch` to `67-cakepanz/` → expect 286/286 (REPORTED re-verified on fresh extract).
- **Land S13 tree** as deployed `67-cakepanz/` (69-file deploy closes c12 re-sync) and run verifier on hosted bytes.
- **Make-live:** Owner’s call only. Rollback restore points (REPORTED): w89 `index.html` sha256 `dbb8c27ad6444115fcac60963e45e91a832c9cb8abc4abeda9b740cc5cca514c`, gh-pages tip `66096fb1` at time of S13 notes — do not execute early; subpath relays must not touch w89 root files before make-live.

### 2.3 Architect-dependent
- Publish **written `dispatchAsync` shell contract** (diff against `DISPATCHASYNC-WIRING.md`: `App.svelte` START/PICK/UNDO/LOAD call sites; S13 notes one `await` each and W12 must keep passing).
- **Merge** Z.ai UI into `colors/` per handoff (seam `../../engine/…` re-point once lib sits under `colors/src/lib/`; M1/M1b grep laws unchanged in intent). **Golden MUST MATCH** through `colors/` paths; delete duplicate engine copies only after proven equality.
- **Cutover battery** (the 3 DEFER items needing both trees).
- **Rule C′1 ring contract** (and export raw/advice shape) before any ring implementation.

### 2.4 Owner decisions
- Relay sequencing and make-live timing.
- Sport-two/post-cutover direction per recorded rulings (plan-M review noted baseball recommendation vs recorded basketball line — Owner picks as applicable; do not assume).
- Any palette/contrast fixes for the 6 named holes, and acceptance of UX changes beyond shipped behavior.

### 2.5 Explicitly not your task / do not do
- No engine edits, no pin moves, no ratings, no `Football-Sim-*.html`, no AGENTS/CLAUDE/queue/chronicle/governance edits.
- No ring build, no multisport implementation, no Contract B work, no make-live.
- No c10 re-cut, no passGap re-run, no fourth ring measurement (prior fix-round constraints; still sensible unless Owner directs otherwise).
- No `git push`, no force-push, no stash.

---

## 3) Recommended next-sitting plan for Z.ai (prioritized, concrete)

> Choose the highest-value items the Owner/directives allow. For each item: state intent, make the smallest correct change, add/adjust a law or receipt where behavior is asserted, and capture raw output at final bytes.

1. **Orient & reconstruct/validate (if starting from scratch):** follow `START-OF-CHAT-ZAI.md` §2 recipe and prior receipts; reproduce gates at your baseline bytes before changes (record outputs). Confirm pin/engine identity as documented.
2. **Close the “composite tail / §26” provenance gap:** collect finished `acceptance-run.sh` tail or rerun the composite to completion at final bytes (if environment/time allows) and publish the complete receipt set; update VERIFY section accordingly. Label clearly if rerun vs original tail.
3. **Tighten relay readiness:** emit/update a one-page relay checklist + artifact index (paths, hashes/md5s as known, expected pass lines, STOP rules) covering S13 landing, verify-package converse clean, T8, gh-pages repoint, rollback pointers. Keep claims REPORTED where you did not execute on hosts.
4. **Targeted UX/a11y hardening (law-backed):** pick 1–3 high-leverage, low-risk improvements (e.g. strengthen SR announcements/focus order around ring/gone%/confirm/restore, 390px edge cases, reduced-motion consistency, visible “saved/shareable seed+pin” provenance cues) and back each with a named battery/probe law + before/after evidence. Avoid contrast-palette changes unless Owner rules; you may measure and propose options.
5. **Contrast remediation prep (advisory):** generate a measured options note/mock for the 6 known AA holes (team inks + token pairs) with proposed token values and expected ratios — for Owner decision — without silently changing shipped theme tokens unless directed.
6. **Merge-support artifacts:** if any source paths/counts changed, refresh manifests/hash tables/golden ONLY when justified (golden regenerates only on deliberate re-pin/change with receipted diff) and keep wiring docs exact.
7. **Package & handoff:** regenerate CHECKSUMS/manifests as required, run `node tools/verify-package.mjs .` (expect converse clean, all OK), `unzip -t` clean, include updated `START-OF-CHAT-ZAI.md` §2, intake ledger, build report, VERIFY updates, and all raw receipts. One zip, one response.

---

## 4) Verification checklist (run at final bytes; paste outputs)

- `npm ci` (clean lock) → exit 0
- `npm run test:engine` → expected 430/430 at pin 408410477 (REPORTED baseline)
- `node scripts/precompile-engine.mjs` (or project’s precompile step) → engine-node generated/consistent
- `npm run battery:node` (or equivalent under `--import ./scripts/node-port-register.mjs`) → expected 35/35 baseline
- `node --import ./scripts/node-port-register.mjs batteries/contrast.battery.mjs` → 2/0 baseline (known holes named)
- `npm run build` / `npm run distfile` + preview as batteries require
- Browser batteries: board/slot/visual/shell/slice as applicable (baseline 16/0, 28/0, 17/0, 48/0, 29/0/10/3) — include any new laws you add
- `node --import ./scripts/node-port-register.mjs scripts/viewport-matrix.mjs` → 45/45, 0 errors baseline
- `node --import ./scripts/node-port-register.mjs scripts/golden-seam.mjs` → MATCH (unless deliberate, receipted regeneration)
- Falsifiers (receipt/shell/board-slot as in tree) and `bash scripts/acceptance-run.sh` if run — raw stdout, exit codes
- `node tools/verify-package.mjs .` (tree root with CHECKSUMS) → every entry OK, converse clean, exit 0
- `unzip -t <zip>` clean; report zip sha256 in chat reply

*(Adjust counts only if you intentionally and correctly change laws; explain every delta.)*

---

## 5) Required first reply format (4 lines, then work)

```
READ : START-OF-CHAT-ZAI.md §2 · <anything else actually read>
STATE: wave <N> · <what is live> · <what is open>
PLAN : <what you will do this chat, one line>
```

Then execute the plan to completion (or state blocker), verify, and deliver one zip with updated §2, intake, receipts, and build report.

---

## 6) Notes carried forward (do not lose)

- **13b:** treat run-2 named-law DIED receipt as closure evidence; ensure composite/provenance trail is unambiguous in shipped docs.
- **T8:** READY, not blocked (paths/md5/STOP documented) — relay executes; do not claim landed.
- **gh-pages repoint:** tests-only, re-verified 277/286 → 286/286 on fresh extract — relay executes.
- **DispatchAsync:** 4 call sites named; Architect’s written contract pending; keep W12 passing.
- **Ring:** C′1 request filed; no pre-emptive build; prefer advice-export semantics with snapshot invariance when ruled.
- **Contrast:** 3 team-ink + 3 token AA holes known/pre-existing (Owner to fix) — fail on NEW holes.
- **Rollback:** w89 restore points documented; no early make-live actions.

**End of prompt.**