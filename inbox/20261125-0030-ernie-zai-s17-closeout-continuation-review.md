SPEAKER: ERNIE | ROLE: advisor / independent reviewer | TASK: review zai-s17-closeout-continuation-2026-11-24 | DATE: 2026-11-25T00:30Z

REVIEW-OF: zai-s17-closeout-continuation-2026-11-24 (hosted read-only at `_agents/ernie/deliveries/zai-s17-closeout-continuation-2026-11-24/`, commit 9bf0225b7)
VERDICT: ok

## What this is
Z.ai's 2026-11-24 review-consolidation sitting: the five consolidated findings from the 2026-11-23
five-seat review (ernie F1–F5, hy4, orcads F2–F4, porca, pickle) closed at the delivered bytes, plus
the R-13/Vite-8 receipt plan FILED (no dependency change). The acceptance composite is an HONEST WIP
(steps 1–16 EXIT_CODE=0, stopped mid-13b on the sitting's time budget) — not a hidden gap.

## What I ran (every verdict below is a command at my machine, node v26.13.0)
- **Host fidelity:** `rsync -a --exclude=node_modules` then a per-file md5 loop over the artifact's own
  `CHECKSUMS.txt` (grep -v node_modules) → **OK=779 FAILED=0 MISSING=0**. The copy is byte-faithful;
  node_modules (2008 files, ~88 MB) is excluded and reconstructible via `npm ci` (documented in HOST-NOTE).
- **verify-package.mjs** → `374 OK / 0 FAILED / 0 missing (374 entries)` + `converse clean` + **exit 0**.
  Seal grew 370→374 exactly as claims.json states (+claims.json, +check-claims.mjs, +README-S17-PACKAGE-NOTE.md, +R-13 filing).
- **check-claims.mjs --phase packaging** → **20 OK · 0 RED · 5 skipped** (matches Z.ai's claim verbatim).
- **check-claims.mjs --phase full** → **23 OK · 2 RED**. The 2 RED are `acceptance-complete` (no COMPLETE
  marker) and `node-battery-receipt` (final-byte receipt not yet refreshed). This is the gate being REAL,
  not vacuous: it correctly fails the genuinely-incomplete full-phase preconditions. (defect-free; the
  redness is the honest WIP, already disclosed.)
- **dist vs SHELL-STATUS:** `shasum -a 256` on all four shipped bytes → css `753997b6…`, js `edc51cd0…`,
  index `3edb5c6f…`, single `3e3b837b…` — **4/4 exact match** to SHELL-STATUS.md.
- **engine suite (independent):** `node --test --experimental-strip-types test/engine.test.ts` →
  `tests 430 · pass 430 · fail 0`. Engine-node stamp: 69 files, `sourceSha256 b4d6a7c9…`, pin 408410477.
- **node battery (independent):** `node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs`
  → `tests 37 · pass 37 · fail 0`.
- **side-by-side receipt (independent, raw-text):** `captures.length=41`; `"met": true` ×**82** (41×2, the
  double-statement); `FALLBACK` ×**0**; `matrix = {wanted:40, captured:41, missing:[], complete:true}`;
  orphan `new-only-s5-panel-settings-1180x950-light.png` present.
- **non-vacuity is IN CODE, not a label:** `scripts/side-by-side-s15.mjs:47-57` — `shot()` carries
  `vac={expected,met,detail}`; an unmet marker prints `FALLBACK — …` in the receipt AND the doc cell and
  pushes a note; `met=false` is never silent. The s1–s5 markers assert real DOM (`store picks>=1`,
  `screen==='complete'`, `.cp-panel` present, etc.).
- **acceptance state:** `ACCEPTANCE-RECEIPTS.txt` has 16× `EXIT_CODE=0`, **0** `ACCEPTANCE RUN COMPLETE`,
  **0** `EXIT_CODE=[1-9]` — killed mid-run, not failed. Honest.

## The five findings — closed at these bytes (VERIFIED)
- **F1 stale boot docs → CLOSED.** `boot-docs-current` + `start-doc-current` OK; ZAI.md / START §2 carry
  the 2026-11-24 state; older blocks demoted HISTORICAL.
- **F2 LEFT s1–s3 capture gap → CLOSED.** 41 captures, matrix complete, 0 fallbacks, 82 met-markers, markers
  in code; the old `tr.teamrow` boot-state click is gone (real `#draftSlotSelect`+`#startDraftBtn` re-drive).
- **F3 SHELL-STATUS "STALE" labels → CLOSED.** `freshness-content-based` + `no-bare-stale-flag` OK; batteries
  emit `distHash`, content FRESH/UNKNOWN, no bare clock-age STALE.
- **F4 README top block → CLOSED.** Rewritten; lineage note `README-S17-PACKAGE-NOTE.md` filed (porca/pickle).
- **F5 ratings CSV present → ADDRESSED (Owner's to rule).** The data-sensitivity note is filed; the cutover
  manifest must exclude `data/nfl/*.csv` by default. Correctly NOT auto-decided.
- Plus orcads-F2 (claims.json + check-claims, real), orcads-F4 (orphan renamed), hy4 (zip claim RETRACTED in
  hand-over, verified by `no-stale-zip-claim`/`no-zip-file-claim-active`), R-13 plan filed (no dep change).

## Weakest point / what is NOT done (not defects — disclosed WIP)
- The acceptance composite is **incomplete** (13b board falsifiers F15–F31 in flight). The "full" phase is
  honestly 2-RED until `bash scripts/acceptance-run.sh` is relaunched at these bytes and the node-battery
  receipt refreshed. Until then the package is a verified WIP, not a COMPLETE acceptance.
- **A fresh independent Verifier is still owed** (not Z.ai, not a pre-fix reviewer). I am a pre-fix reviewer
  (I filed the S17 review), so my "ok" does NOT discharge that requirement.
- contrast 2/0 is REPORTED (SHELL-STATUS), not re-run by me (needs the browser/Playwright).
- node_modules excluded from the host (by design); the 2008 node_modules checksum lines are the only
  unverifiable lines here — everything a reader needs is present and byte-identical.

## Bottom line
The corrections are real, in code, and independently reproduced at my machine: 779/779 host, 374/0/0 seal,
20/0 packaging claims, 23/2 full (honest), 4/4 dist, 430/430 engine, 37/37 node, 41/82/0 side-by-side.
No law weakened; engine/pin bytes untouched. **ok** — the next session relaunches the composite, then a
fresh Verifier, then the cutover (M-0, ratings ruling, `GH`/`gh`).