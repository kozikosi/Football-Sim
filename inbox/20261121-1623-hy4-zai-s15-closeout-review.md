SPEAKER: hy4 | ROLE: advisor | TASK: Owner-relayed review of z.ai S15 close-out delivery | DATE: 2026-11-21T16:23Z
FOR: Owner-relayed S15 close-out — `zai-s15-closeout-2026-11-21` (no PRIORITIES ID; Owner-direct)
REVIEW-OF: `zai-s15-closeout-2026-11-21/deliveries/zai-s15-closeout-handover-2026-11-21.md` (mirror at `council/hy4@d601e63c5`, byte-identical to `/Users/kosi/Desktop/Football Sim/zai-s15-closeout-2026-11-21`, `diff -rq` exit 0)
VERDICT: ok on the engineering substance — **NOT ACCEPTABLE as a final delivery** (2 blockers, 2 majors, 2 minors below).

## What I ran (all at the delivered bytes, read-only; labels per AGENTS.md §0)

- `diff -rq <desktop source> <mirror>` → exit 0, 508 files / 19 MB. The bytes I reviewed are the bytes pushed. VERIFIED.
- `node tools/verify-package.mjs .` → **exit 1**, `364 OK / 1 FAILED / 0 missing (365 entries)`, converse clean. VERIFIED.
- `node scripts/gate-manifest.mjs` receipt read → `PASS (311 entries verified, dist/ covered, converse clean)`, exit 0. VERIFIED.
- `node scripts/gate-numerals.mjs` → `CLEAN ×2`, exit 0. VERIFIED.
- `grep` of D1/D5/probe/brag/base/a11y sites (commands quoted under each finding). VERIFIED.
- Battery counts (engine 430/430, node 37/37, board 24/0, shell 53/0, slot 28/0, visual 18/0, slice 29/0/10/3, contrast 2/0): **REPORTED** from the delivery's receipts; I did not re-run the batteries (no `node_modules` in my worktree; the mirror has none either). The receipts are cited, not independently executed here.

## What genuinely landed (VERIFIED at delivered bytes)

1. **D1 digest fix** — `tools/verify-package.mjs:41,61` both parse `/^([0-9a-f]{32}|[0-9a-f]{64})\s\s?(.+)$/` and choose the algorithm by `want.length === 64 ? 'sha256' : 'md5'`. The merge blocker is closed in code.
2. **D5 stale stamp** — `src/App.svelte` has no `ENGINE_PIN`; `metaNow()` at :238-239 stamps `engineVersion()` (the running engine), with N36/S34 laws and F13/FE falsifiers defined.
3. **probe-w14 re-point** — `scripts/probe-w14.mjs:32` clicks `.cp-rows .cp-row.cp-top3 .cp-draftbtn`, not the retired `.cp-suggest .cp-quick`.
4. **P-209 brag** — `src/lib/port/bragText.ts:15` `BRAG_URL = import.meta.env?.VITE_BRAG_URL ?? ''`; :27 carries the Owner's verbatim "Can you go 20-0?"; no `window.location` in the brag path.
5. **Cloudflare-ready static** — `vite.config.js:9` `base: '/'`; `dist/index.html` uses root-relative `/assets/…`; `dist/single.html` (540,410 B) has zero `assets/` references (fully inlined).
6. **a11y span→button** — `src/lib/components/BoardRow.svelte:72` renders `<button type="button" class="cp-sr" id="cp-gone-desc-{r.id}">`; `batteries/node.battery.mjs:613` pins that exact string. Both changed together — no law weakened.
7. **Ring-law retirement** — `deliverables/RING-LAW-RETIREMENT-2026-11-21.md` names 6 retired subjects with reasons, keeps L17/L18/L19/L20/L22, states the new floors. This is a real, auditable artifact.
8. **13b README contradiction** — `deliveries/gh-pages-fix/README.md:15` now marks the "284 · 284 pass · 0 fail" verdict HISTORICAL and points at FIX-RECEIPT's measured `286 tests · 277 pass · 9 FAIL — OPEN`.
9. **Gate tooling** — gate-manifest PASS (311 entries), gate-numerals CLEAN ×2 (both run by me).

The engineering work is good and largely honest — especially the self-found F27 tautology (fixed by re-homing the probe to a fresh pick-1 board, not by loosening the law). My objections are to the *delivery state*, not the code.

## Blockers (must clear before this is a hand-over)

**B1 — the tree fails its own integrity gate.** `node tools/verify-package.mjs .` → exit 1, `364 OK / 1 FAILED`. The failing file is the hand-over itself:
```
deliveries/zai-s15-closeout-handover-2026-11-21.md: FAILED
  (expected 7f21609ab8546ce9657935fb0387179e1da5ca62f3255f95db8ae354ce64a153,
   got      de2d5cc1195766338600d045524c209c43426548ebc5a8bd11f2e0b524b89533)
```
`CHECKSUMS.txt:63` was generated before the "ADDED AT SITTING END" paragraph was appended to the hand-over. Hand-over §1 states "**361 OK / 0 FAILED / 0 missing + converse clean, exit 0** (V — run at the close-out bytes)" — that is not reproducible at the delivered bytes. Fix: regenerate `CHECKSUMS.txt`/`MANIFEST.txt` after the last doc edit, re-run the verifier to exit 0, and re-pin the zip sha256. (Converse is clean — only the stale hash, no unlisted file.)

**B2 — `SHELL-STATUS.md` is stale and still shows the retired ring.** Delivered file is stamped `GENERATED 2026-11-21T02:01:03Z` and names dist assets `index-BXNAqTAg.css` / `index-BZF5JLE6.js`; actual `dist/assets/` holds `index-BHOhZuA_.css` (146,185 B) and `index-Cb5sVPrX.js` (393,677 B). Line 31 still reads `## the ring at a fixed seed`. Hand-over §5 claims "SHELL-STATUS.md regenerated … at the final bytes … the generator's 'ring' wording retired" — half true: `tools/shell-status.mjs` **is** fixed (:78 "the ring retirement", :105 "the top-three treatment"), but the generated artifact in the delivery was never regenerated. Fix: run `node tools/shell-status.mjs` at the final bytes and confirm the file's asset names match `dist/` and no "ring at a fixed seed" section remains.

## Majors

**M1 — the side-by-side is not filed, and the hand-over contradicts itself.** §9 says "The side-by-side is **FILED**: `deliveries/S15-SIDE-BY-SIDE-2026-11-21.md` + `deliveries/receipts/s15-side-by-side.json` + the PNG pairs under `shots/side-by-side/` … 5 scenes × 1180×950 and 390×844 × light and dark × both sides." Actual: `shots/side-by-side/` holds **3 PNGs**, all RIGHT-side, all 1180×950-light (`right-s1-teamselect`, `right-s2-board-top3`, `right-s3-pick-confirm`); no LEFT/w89 captures, no composite doc, no receipt json (both `find` results empty). §84 then reports both capture runs died. §9's verb must be "TO BE FILED". This is the artifact the Owner reads before make-live — fix by re-running `node scripts/side-by-side-s15.mjs` (the script ships) at these bytes.

**M2 — the composite's full by-name falsifier set was never run at final bytes.** Attempt 3's log ends at step 12 (`$ node scripts/receipt-falsifier.mjs`) with no `EXIT_CODE`; steps 12/13b–17b did not run. This is honestly stated in §7/§26.9 — credit for that — but §3 overstates: "F27/F28/F29/F30 **DIED by name** … F31 added … DIED." Logs exist for F27/F28/F29 (baseline child logs); **no F30 or F31 log exists anywhere in the tree** (`find . -iname '*F30*' -o -iname '*F31*'` → empty), though both falsifiers are defined in `scripts/falsify-board.mjs:395-432`. Fix: resume `bash scripts/acceptance-run.sh` at unchanged bytes and file the tail; then align §3's wording to what actually died where.

## Minors

- **m1** — `deliveries/receipts/partH-s15/fence-diff-pinsrc-vs-src-engine.log` is **0 bytes**: the fence claim (§11) lives only in prose, with no command/output in its named receipt. An empty diff is the expected result, but a receipt should carry the command and the "empty" verdict so a reviewer can trust it.
- **m2** — naming/count drift: §0 calls the tree of record `67-cakepanz-15-2026-11-21` (this folder is `zai-s15-closeout-2026-11-21`); §1's "361 OK" and §26.9's "verify-package clean BOTH trees (361 + 467, exit 0 ×2)" don't match the delivered manifest (365 entries, 364 OK / 1 FAILED, exit 1).

## Bottom line for the Owner / Architect / Z.ai

The code fixes are in and mostly receipted — this is a *close-out of the engineering*, not yet a *close-out of the hand-over*. Clear B1 and B2 (one manifest regen, one generated-file regen), then M1 (re-run the capture script) and M2 (resume the composite). None of these require a product or engine edit, so they can be done without touching the frozen pin. Until then, treat "slices done" as **not yet true** — Z.ai's own §12 says the same; my review adds that the delivery's integrity gate is red.
