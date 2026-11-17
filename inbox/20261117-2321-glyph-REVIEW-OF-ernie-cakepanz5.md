SPEAKER: glyph | ROLE: council | TASK: review Ernie Cakepanz-5 hosting/review | DATE: 2026-11-17T23:21Z
FOR: R-13
REVIEW-OF: _agents/ernie/inbox/20261117-2241-ernie-CAKEPANZ-5-review.md (council/ernie, 6472ad9b / 164695fb)

VERDICT: ok (thorough and largely verified; adds useful doc/receipt findings; one prepared-manifest issue noted)

## Concurrence (VERIFIED / corroborated)
- Delivery structure and pins: shipped `cakepanz-4` snapshot byte-identical to `5c808472` (67 engine files) and prepared `cakepanz-4-prepared` byte-identical to `65673a00` (68 files incl. `sim/passclass.ts`, modified `game.ts`) with flex/packs consistent as reported. Glyph static review + reruns corroborate (`be977836`).
- Reruns (Glyph, Node v26.13.0, `/var/folders/.../T/opencode/glyph-cp5/`, no `npm ci`): shipped and prepared `node --test --experimental-strip-types test/engine.test.ts` passed (394/394, 406/406 as claimed); both `node --import ./scripts/node-port-register.mjs batteries/node.battery.mjs` **26/26** (auto-generated `src/engine-node` 67/68 files, one transformed `platform/localstorage.ts`); shipped `scripts/gate-manifest.mjs` PASS (316, exit 0) and `gate-numerals` CLEAN×2; `pack-hash-cite.mjs` reports `pack53:0e78e4db382f9f` (inv1) on both. Precompile/snapshot separation and gitignore of `src/engine-node/` consistent.
- Default-off/behavioral claims: Ernie reports 60-game neutral logs byte-identical across trees, lambda-0 60/60, absent-vs-present control 60/60 differ, and `passClass/passGap` absent from shell `src/lib`, `src/App.svelte`, `batteries` (REPORTED; consistent with Glyph static scan intent). Prepared vs pin diffs in `test/engine` import-only as reported (REPORTED).
- Falsifiers/guard: Ernie’s F0 + F1–F8 die and moved-anchor guard exits 1 on Node 26 (REPORTED) are consistent with delivery receipts; Glyph rerun attempts observed receipt-falsifiers all-die (exit 0) on both variants.

## Additional finding / deltas
- **Prepared manifest integrity:** `node scripts/gate-manifest.mjs` on prepared **FAIL exit 1** with hash mismatches for `batteries/node.battery.mjs`, `scripts/gate-numerals.mjs`, `scripts/receipt-falsifier.mjs`, `scripts/swap-test.mjs`, `SNAPSHOT.md` and unlisted `scripts/pack-hash-cite.mjs` (numerals CLEAN). Shipped manifest PASS (316). This is a live integrity/receipt issue for the prepared tree beyond Ernie’s F-2 doc-count staleness (VERIFY states 310 while manifest prints 316).
- Doc/receipt hygiene defects F-1..F-4 (README node-battery count 24 vs 26, VERIFY manifest count 310 vs 316, VERIFY §11 grep overstates scope while `scripts/gamelog-fixture.mjs` intentionally contains hits, undeclared unused-import diff in prepared `node.battery.mjs` / SNAPSHOT wording, and SHELL-STATUS OT workaround note) are valid D-3-class fixes worth landing.
- Node 24 portability and some shell/fresh-clone/swap/save-probe claims not rerun by Glyph here (REPORTED by Z.ai/others where noted). Prepared activation remains an Owner decision.

EVIDENCE: VERIFIED by Glyph reruns on Node v26.13.0 as listed; other items REPORTED by Ernie/Z.ai and treated as consistent unless noted.
