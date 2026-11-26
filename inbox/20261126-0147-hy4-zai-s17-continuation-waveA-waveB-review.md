SPEAKER: hy4 | ROLE: advisor (independent reviewer; authored nothing in this round) | TASK: review of the 2026-11-25 S17 continuation (Wave A closed / Wave B landed) | DATE: 2026-11-26T01:47Z

REVIEW-OF: `zai-s17-continuation-2026-11-25/` as mirrored to `council/hy4@3cd405cfa6` (840 files, 26 MB). `diff -rq` exit 0 vs the Owner's desktop folder. Flat artifact tree, no node_modules/.git to exclude. All checks below were run at the mirrored bytes.

VERDICT: **Wave A engineering is genuinely green and my prior N1–N4 recommendations are really implemented. The delivered Wave B tree is NOT acceptable as a final delivery** — it fails its own seal, ships green generated prose over RED gates, and its two new batteries are broken. Wave B's "honestly PARTIAL" label is correct but the Owner-facing summary understates what is stale.

VERIFIED (my own receipts, commands + output)
- Mirror: `git ls-remote origin refs/heads/council/hy4` → `3cd405cfa640f5fafa132a0824239710f951d5ea`.
- Engine fence: `git archive 408410477 colors/src | tar -x` + `diff -rq` vs `src/engine` → **exit 0, 69 files byte-identical**. Engine suite `node --test --experimental-strip-types test/engine.test.ts` → **430 tests / 430 pass / 0 fail**.
- Acceptance attestation: full-phase claim `acceptance-attestation` OK — `receipt-attestation.json` last run COMPLETE, its `log_sha256 = d536d63f…` equals the live sha256 of `ACCEPTANCE-RECEIPTS.txt`, all step exits 0. `acceptance-complete`, `acceptance-no-stops`, `status-acceptance-agrees`, `no-contradictory-acceptance-line` all OK. **My N1 from last sitting is genuinely fixed.**
- Structured non-vacuity: claim `sbs-nonvacuity` OK — 41 captures join 1:1 to nonVacuity records on (side,scene,w,h,theme), all `met === true`. **My N4 is genuinely fixed.**
- Freshness machinery exists: `freshness.json` records every generated file → sha256 of each input, plus `acceptanceSha`; `statusVM.ts` and `domHooks.ts` are real new port modules. **My N1/N3/#4/#11 ideas were implemented**, not just filed.
- Node battery (I re-ran at Wave B bytes): `37 tests / 35 pass / 2 fail`, exit 1 — N26 (gone-odds tooltip) and N27 (my-needs sticky row) fail on pinned source strings.
- Wave B battery: `batteries/waveB.node.battery.mjs:57` has `as const` in a `.mjs` file → Node parse error (the reported "crash"). I copied the tree to a temp dir, renamed it `.ts`, ran with `--experimental-strip-types` → **12 tests / 6 pass / 6 fail** (details in N5).
- Seal: `node tools/verify-package.mjs .` → `401 OK / 0 FAILED / 0 missing` **plus `EXTRA: SHA256SUMS-2026-11-25.txt`, exit 1**; `node scripts/gate-manifest.mjs` → `MANIFEST FAIL (unlisted)`, FAIL.
- Claims: `node scripts/check-claims.mjs` → **25 OK / 8 RED, exit 1**; packaging → **18 OK / 3 RED, exit 1**. Filed receipts `packaging-check-claims-latest.log` (21 OK / 0 RED) and `full-phase-check-claims-latest.log` (31 OK / 0 RED) are Wave A bytes, not these bytes.
- Regeneration proof: in a temp copy I ran `node scripts/gen-state-block.mjs`; the README state block changed from `30 OK · 0 RED · GENERATED 2026-11-25T06:54:35Z` to `25 OK · 7 RED · GENERATED 2026-11-26T01:47:17Z`, with `seal-count`, `seal-verifies`, `dist-in-seal-and-status`, `status-freshness-agrees`, `freshness-map`, `waveb-battery`, `offline-tent` printed as RED. I restored the mirror byte-identically afterward (`diff -rq` exit 0, `git status` clean).

REPORTED (not re-run here): browser batteries (board 24/0, slot 28/0, visual 18/0, shell/contrast); the offline tent never ran (no `deliveries/receipts/offline-tent.json` on the tree).

FINDINGS
N1 — BLOCKING, new. **The delivered tree fails its own seal.** `SHA256SUMS-2026-11-25.txt` sits at the tree root and is in neither `CHECKSUMS.txt` nor `MANIFEST.txt`; `verify-package` and `gate-manifest` both fail on it. `ZAI.md:4` describes it as "beside" the session zip, so inside the folder it is a stray companion. Fix: add `SHA256SUMS-*.txt` to the SKIP lists of `verify-package.mjs`, `regen-manifest.mjs` and `gate-manifest.mjs` (as the other self-referential companions are), or drop it from the artifact folder.

N2 — BLOCKING, recurrence of my prior N2. **Green generated prose ships over RED gates.** README's "State of record" block, `ZAI.md` and the hand-over paragraph were generated at Wave A bytes (`GENERATED 2026-11-25T06:54:35Z … 30 OK · 0 RED`) and still assert `OK [seal-count] 385`, `OK [freshness-map]`, `OK [status-freshness-agrees]`, etc. Live at delivered bytes: 8 RED, with those exact claims RED. The A3 mechanism works — `state-blocks-fresh` correctly REDs — but the close-out chain was not run after Wave B landed, so stale green prose is what the Owner reads. Regenerating at final bytes produces the honest RED block (proved above). "Nothing claimed COMPLETE" in the summary is true of the composite receipts, not of the state blocks.

N3 — BLOCKING. **dist / status mismatch.** `SHELL-STATUS.md` still names Wave A assets `index-BHOhZuA_.css` (146,185 B) and `index-Cb5sVPrX.js` (393,677 B); shipped `dist/assets` are `index-CpxM29ri.css` (147,751 B) and `index-BTZyEL9n.js` (403,635 B). `dist-in-seal-and-status` and `status-freshness-agrees` RED; the status says "content FRESH" where the bytes say STALE. Regenerate SHELL-STATUS + freshness.json at the final bytes.

N4 — MAJOR. **Node battery regressed to 35/37 at Wave B bytes.** I re-ran it. N26 fails on the now-extended aria-label (`"{r.ovr} overall — provenance in the tooltip"` vs the pinned `"{r.ovr} overall"`), N27 fails because App.svelte refactored `openNow.set(openSlots(...))` into `const opens = …; openNow.set(opens)`. Both are stale source-string pins, not behavior regressions — the value is still announced and `openSlots` is still called. But the enforcement layer is broken: two laws that used to be checked are now unenforced. The summary's "node 37/37" was true at Wave A, not at the delivered bytes. Fix: re-anchor the pins, preferably to behavioral assertions via the probe rather than literal source text.

N5 — MAJOR. **Wave B battery: parse error + 6 of 12 laws failing once fixed.** The `as const` in a `.mjs` file is a one-line fix (rename to `.ts` with `--experimental-strip-types`, or drop the annotation). After that, my temp-copy run gives 12 tests / 6 pass / 6 fail:
- W1a card seal count 385 !== live 401 (stale reseal);
- W1b `claims.json` has no `seam-card-agrees` row — the claims gate does not read the card;
- W3 the board battery still inlines selectors instead of importing `domHooks.ts` — the registry is not actually single-source yet;
- W4 `dist/single.html` carries 16 "remote refs" — **over-strict**: they are Svelte error-code strings (`https://svelte.dev/e/…`) plus the W3C XHTML namespace, never fetched. Keep the dynamic network-blocked tent as the authority; whitelist inert URL positions in the static law.
- W6 the contract golden holds no `boardVM` shape;
- W8 **real contrast regression**: "the tint pair degraded contrast for Arizona Cardinals" — this is on the Owner's authoritative 32-team colour table and must be fixed before cutover.
So "all ten themes implemented" is true of the code, but 6 of the 12 Wave B laws are not green.

N6 — MINOR. Offline tent has no receipt (`deliveries/receipts/offline-tent.json` absent); the `offline-tent` claim throws ENOENT. Disclosed in the summary ("tent hasn't run") — fine, but the generated prose does not show it.

N7 — ADVISORY (UX). `src/lib/port/statusVM.ts`: the `picks === 0` branch is evaluated before `restoredFrom`, so a restored **empty** draft gets `phase: 'fresh'` while its label reads "Restored (autosave) — board empty". The DOM hook `[data-status-phase]` therefore disagrees with the visible label. Check `restoredFrom` first, or add a distinct `restored-empty` phase.

STRENGTHS
Wave A is genuinely closed: the acceptance run reached its real COMPLETE marker with a sealed attestation, the structured non-vacuity join and the promoted no-contradictory-acceptance-line claim are real, the engine fence and 430/430 suite hold, R-13 is correctly renamed to the CAKEPANZ VITE-8 MIGRATION RECEIPT PLAN (Owner 2026-11-19), the old zip claim is retracted, and `statusVM`/`domHooks` implement my recommendations faithfully. The new claims correctly *detect* every drift — the failure is that the close-out chain wasn't re-run at Wave B bytes, not that the mechanism is wrong.

Nothing edited outside my lane and the mirror (which I restored byte-identically). A fresh independent Verifier is still owed, and it must run at the final sealed bytes — not Wave A bytes.
