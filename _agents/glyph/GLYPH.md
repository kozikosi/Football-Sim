# GLYPH — council seat (lane / self-booting handover)

**Path:** `/Users/kosi/Desktop/wt/glyph`  
**Branch:** `council/glyph`  
**Role:** verifier/reviewer/organizer (advisory). No product-file, governance, queue, protected-constant, or other-seat edits. Never force-push; never stash.

## BOOT — read this first, every session (do not re-derive anything)

1. `git fetch -q origin` then run START-HERE §1 step 0 (refresh governance docs from `origin/council/muse`): check `git status --porcelain -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md`, checkout the four from muse if clean, confirm `git diff --cached --stat` lists only those four before committing.
2. Read this file to the end — it is the handover: measured facts, open items, what not to redo.
3. Read your own open/canonical documents (already in worktree; do not ask for a list): `ls _agents/glyph/*.md _agents/glyph/inbox 2>/dev/null` (canonical stable handoff `HANDOFF.md`; latest immutable session records in inbox). If behind branch: `git fetch -q origin && git checkout origin/council/glyph -- _agents/glyph/`
4. Live queue: `git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs && node ./.council_tool.mjs next` (delete tool before push). Take next action you can complete with receipts.

Nothing else is needed to resume.

## Current snapshot (2026-11-14T16:27Z, glyph)
- **Tip:** `origin/council/glyph@56817d6f18d3ebe78f7fe3a5641d3f21ba24ba4a` (clean, pushed, verified).
- **Governance synced (this session):** four docs match `origin/council/muse@59181af82d101875495ec2fe9a9a95e93336932d` — `AGENTS.md` `64768b89ad9cbde4bf60c822efa5d3ba7b52ae28ca70699a4f665222b2dc3764`, `PROJECT-KNOWLEDGE.md` `39427f19fb802980cc5166ecd4443aa2f95b08b991329babde8319fd0aff9b4d`, `_agents/START-HERE.md` `daf5abf4b0c4fa67dc4b70bcad4da588a5270c9c26a2e2653f77c4d15052926e`, `_agents/START-OF-CHAT.md` `589b4b84e1b46bb83c5319a9d0780de3791c3a8c4657a77b2fa1ce319aca030f`. Known MUSE-owned doc defects remain unpatched — do not edit governance files.
- **Pushed this session (glyph-owned):** `a033c942` P-162..P-165 review; `f2f14c09` z-open-wave-v3 delivery (256 files, `_agents/glyph/deliveries/z-open-wave-v3/`); `88cde033` wave-v3 review; `d3271ff1` zai-recovery-2026-11-14 (22 files, `_agents/glyph/deliveries/zai-recovery-2026-11-14/`); `56817d6f` recovery review.
- **Z.ai wave v3 (VERIFIED):** `diff -rq` parity clean at import; manifest sampled hashes OK (255 entries/256 files). Errata `receipts/errata-reissued-table.json` W1 `19.81/40.13/10.38/9.73`, D-32R cold/warm/gc `1.04/0.66/0.67`, W4 season `335.3/339.9/349.9/341.5` p95 `0.075–0.079`, save bytes `187078/187079`. A1 `referenceRecordSha=e62e79f4471f2e9a0c25f7748f1db74760ff51a4c1ea12b0dc9aefa885374900`, 1024 picks. Phase I per-arm run/record hashes identical (`crossArmRecordIdentical:true`, `crossArmDomTextIdentical:false`); Phase C boot/save/reload ok (135836 bytes, picks 127); Phase D 1921 rows, mobile 390 `horizontalScrollDelta:0`, tap 44px. Tier-2 noisy (run1 advantage, run2 ~ties). Gaps: no standalone `receipts/a3.json`, no raw `tier2-run*.json`/analysis scripts.
- **Z.ai recovery (VERIFIED):** MANIFEST 20/20 sha256 match; `receipts/a3.json` present (`verdict "chromium-identical; other engines: see status"`, `comparison {chromium:true, firefox:null, webkit:null}`, `bundleBytes 82060`, hashes per receipt). Firefox/WebKit launcher-missing (not executed). Scripts present incl `vendor-digest.mjs` (portable algorithm, hardcoded roots as shipped). tier2 analyses + errata table byte-identical to wave-v3 copies. Inkling publication/review on `origin/council/inkling` (REPORTED) corroborated against glyph bytes.
- **Digest/ratification boundaries (REPORTED, carry forward):** vendor digest `432a1701…` root-dependent over `colors@d3bd81d2` (112 files); 57-file subset `4c3c8f17…`; `753997ba` unresolved, `cd298e99` withdrawn. UX-3 measured failing spec (~p95 64ms vs 50ms), SAVE-1 write-median UNKNOWN/not in BENCH-1, a3 chromium-only ceiling.
- **Architect state (VERIFIED):** `origin/architect/engine-and-seats@036401335b71c1bd5f2ad2f8d7bb2cdfe5c5b683` docs-only — plan v3, reply-to-ernie-v3, cross-side-stars-design, NOW. Owner/Ernie rulings 2026-11-14 relayed (TS port after S1/S2, league scale, Title Odds post-cutover pitch, chunked envelope, version honesty provenance, @types/node+Node24, no new gates/de-gated report-not-fail, P-318 same-seed old-vs-new+suite before merge, reconcile 1921 board rows, playoff HFA 5.57 vs 1.78 hands off until strength-controlled, workflow push possible per history).
- **Prompts drafted in chat (not filed as artifacts this session):** Claude plan-v3 continuation, Z.ai continuation (67 Cakepanz/framework/v3 follow-ups), absent-council/Pickle review+brainstorm — incorporate Owner/Ernie/Beam/Inkling context as provided.

## Open gaps / next useful actions
- File/commit prompt artifacts if requested (`inbox/` on `council/glyph`).
- Independent verification/review of Z.ai P-316/P-317/P-319/P-324 work or corrections (P-346 REV4 checksums/C2 D4-field/Part D, P-341 ledger) when landed; reproduce vendor digest from declared root if needed.
- Queue reviews/work by `node tools/council.mjs next` (live muse); P-318/P-342/P-344/P-345-adjacent evidence reviews as receipts appear.
- Carry forward unresolved: pool count ledger (1941/1953/1921), UX-3/SAVE-1 write-median measurement gaps, multi-engine a3 if feasible, raw tier2 inputs if shipped later.

## Standing rules
- Byte-check everything: VERIFIED = `ref@sha + path + command + hash/output`.
- Own branch/inbox only; add by path; commit+push; never force-push/stash; no product/governance/queue/shared/other-seat edits. Only Architect edits product.
- Work from live queue on `origin/council/muse`; three different-seat confirmations = REVIEWED ✓✓✓.
- Nothing delivered until pushed commit (hash) or download link.

## Session close
Update `GLYPH.md` (+ `HANDOFF.md`/dated inbox record as needed); `git add -- <paths>`; commit; `git push origin council/glyph`; verify with `git ls-remote`.
