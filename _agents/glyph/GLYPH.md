# GLYPH — council seat (lane / self-booting handover)

**Path:** `/Users/kosi/Desktop/wt/glyph`  
**Branch:** `council/glyph`  
**Role:** verifier/reviewer/organizer (advisory). No product-file, governance, queue, protected-constant, or other-seat edits. Never force-push; never stash.  
**Identity:** glyph (not retired; `_agents/RETIRED.txt` checked 2026-11-20).  
**git common dir:** `/Users/kosi/Desktop/Football Sim/.git`  
**merge-base (HEAD, origin/council/base):** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e` (VERIFIED 2026-11-20).  
**Last pushed tip before this session-end commit:** `da760500d1b558f7d93c59cb0e1d01e846194951` (VERIFIED by ls-remote 2026-11-20T04:10Z).

## BOOT — read this first, every session
1. `git fetch -q origin` then START-HERE §1 Step 0 (refresh governance docs from `origin/council/muse`): `git status --porcelain -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md` must be clean, then `git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md`; confirm staged diff lists only those four. Until run, treat governance docs as REPORTED. Do not run `sync-base.sh`.
2. Read this file to the end and `ls _agents/glyph/*.md _agents/glyph/inbox 2>/dev/null`. If behind: `git fetch -q origin && git checkout origin/council/glyph -- _agents/glyph/`
3. Live queue/tool/docs on `origin/council/muse`: `git fetch -q origin && git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs && node ./.council_tool.mjs next` (delete temp tool before push).
4. `node tools/preserve.mjs check`.

## Current state (session end 2026-11-20T04:21Z, glyph)
- **Worktree:** `/Users/kosi/Desktop/wt/glyph`, branch `council/glyph`.
- **This session (VERIFIED, pushed):**
  - `14672ff9b` — published `_agents/glyph/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/` (23 files; `diff -rq` clean vs `/Users/kosi/Desktop/Football Sim/z-post-blue-docs-update-2026-11-19-v3-sitting`; `md5sum -c CHECKSUMS.txt` 22/22 OK; repair 6418 B md5 `0a286953…` sha256 `3e6476de…`) and `inbox/20261119-2251-glyph-z-post-blue-docs-update-2026-11-19-v3-sitting-review-and-ideas.md`.
  - `098724434` — session-end lane/bulletin update (`bulletin/20261120-0229-glyph.md`).
  - `cea924cbe` — `inbox/20261120-0326-glyph-c3-c10-repair-rehearsal.md` (inkling/orcaink 51f/48 OK/1 missing → 52f/49 OK/0 failed; pickle 52/49 OK; repair md5/sha as above) and `inbox/20261120-0326-glyph-c9-c10-landing-audit.md` (nested c9 in c10 slim 35f, dist `76de5658…`/527162 B; standalone hosted c9 5104f, dists `670d4c08…`/527177 B equal; safe to land one-file repair).
  - `faa8f1915` — `inbox/20261120-0333-glyph-c4-doc-fix-landing-simulation.md` (hosted-c9 diff md5 `e55f35a…`; before md5s `222372b8/29cecad3/4d723c41`, dists `670d4c08…` 527177 B equal; apply `patch -p1` from extract root containing `_agents/` exit 0 [subtree-root `-p5` ok, `-p1` fails], after md5s match FIX-NOTES §6 `08f30249/aba2f58a/ad1e0a96`; inkling/orcaink own c9 copies byte-true at before md5s + same dists → leave alone).
  - `d6f2d769b` — `inbox/20261120-0343-glyph-C14-landing-wording-fix.md` (proposals: missing-vs-failed/failed-hash wording for v1 prompt + Ernie 0334, cwd-qualified hosted-c9 patch note; no literal `560b8364f/06d89724d` found in scanned v1/zai prompts) + `bulletin/20261120-0344-glyph.md`.
  - `91399cc98` — `inbox/20261120-0349-glyph-C27-item6-passgap-note.md` (item-6 s=±0.25→~±4% vs passgap typical |s|~0.15–0.17, λ~6.9 unit conversion, product λ=0/glm off => s=0 today; receipts from `origin/architect/engine-and-seats@408410477`) + `bulletin/20261120-0350-glyph.md`.
  - `da760500d` — `inbox/20261120-0410-glyph-C27-followup-not-done-receipts.md` (reviewed beam/ernie/orcaman/hy4orca C27; accepted hy4orca correction that 0349 “~1–2%” clause unsupported — typical interpolation ~2.5% [~2.4–2.7%], N=2000 lambda-axis probes ~2.2–2.7% from 0.25/0.5 anchors across packs; passgap reruns 2016-25/16-22/23-25 with known 3rd-decimal caveat pattern, theta/pack audit, architect/local runtime passGap inventory) + `bulletin/20261120-0410-glyph.md`.
- **Other-seat refs reviewed/read (REPORTED remote state):** Ernie v3 reviews/C3-C9/C14-adjacent, Pickle v3 reviews/P-287/P-345, beam/ernie/orcaman/hy4orca C27, beam/orcaman C14; v3 prompt chain on ernie (v1/v2/v3). Architect tip checked earlier `da0cf927e` (S3/S4 + item-6 decision; 427/427 tsc 89/89 REPORTED).
- **Preserved locally this session-end commit:** untracked lane deliveries added for preservation — `_agents/glyph/deliveries/67-cakepanz-8-2026-11-18/`, `_agents/glyph/deliveries/67-cakepanz-8.1-2026-11-18/`.

## What next session needs
1. **Default:** refresh governance from `origin/council/muse`, run `node ./.council_tool.mjs next` (temp tool), take highest-value review/work (C12–C34/A/B/D items still open per v3/v4 orders, or `REVIEW:`/third-seat confirmations where useful). Do not duplicate settled checks without stated reason.
2. **C27 correction (glyph-owned, optional):** apply proposed wording fix to `inbox/20261120-0349-glyph-C27-item6-passgap-note.md` to remove unsupported “~1–2%” clause and align with §follow-up receipts, if no reviewer objects.
3. **v3-sitting/landing carry-forward:** if Owner/relay lands c10 repair/doc-fixes, apply atomically per byte-state incl. manifest hash lines (FIX-NOTES/REMEDY); carry D1/D2/F1 corrections noted in reviews.
4. **Cakepanz/engine-adjacent (Architect-gated):** `?seed` seam, non-tautological suggestion invariant/raw key export (`draftBoard.ts` strips `_w/_p`), a11y/slot-picker/one-click per specs/laws, cutover checklist items — propose/review, do not edit product/engine.

## Open questions / blockers
- No active blockers. Owner actions remain: c10/doc-fix landings + md5/hash-line updates as applicable, hosted-c9 policy, four ALL-CAPS tabs, ring export shape, Part 0 confirmation, gh-pages fix per orders.
- Passgap rerun used Beam nflverse parquets not hash-verified against manifest/datacheck in this session (receipts consistent with reported caveat). Lambda-axis probes were N<=2000 (directional), not full N=20k.

## Live files (glyph-owned, pushed unless noted)
- Inbox: `inbox/20261119-2251-glyph-z-post-blue-docs-update-2026-11-19-v3-sitting-review-and-ideas.md`, `inbox/20261119-0904-glyph-cakepanz-10-review.md`, `inbox/20261120-0326-glyph-c3-c10-repair-rehearsal.md`, `inbox/20261120-0326-glyph-c9-c10-landing-audit.md`, `inbox/20261120-0333-glyph-c4-doc-fix-landing-simulation.md`, `inbox/20261120-0343-glyph-C14-landing-wording-fix.md`, `inbox/20261120-0349-glyph-C27-item6-passgap-note.md`, `inbox/20261120-0410-glyph-C27-followup-not-done-receipts.md`.
- Bulletins: `bulletin/20261120-0229-glyph.md`, `bulletin/20261120-0344-glyph.md`, `bulletin/20261120-0350-glyph.md`, `bulletin/20261120-0410-glyph.md`, plus this session-end bulletin (added in final commit).
- Deliveries: `_agents/glyph/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/` (23), `_agents/glyph/deliveries/67-cakepanz-10-2026-11-19/`, `_agents/glyph/deliveries/67-cakepanz-9-2026-11-19/`, `_agents/glyph/deliveries/67-cakepanz-8-2026-11-18/`, `_agents/glyph/deliveries/67-cakepanz-8.1-2026-11-18/`, `_agents/glyph/deliveries/67-cakepanz-7-2026-11-18/` (as present in lane).
- Lane: `_agents/glyph/GLYPH.md` (this file).

## Local pending
- None after this session-end commit (only the two previously-untracked cakepanz-8/8.1 delivery dirs were pending in this worktree; added for preservation).

## Standing rules
- Byte-check everything: VERIFIED = `ref@sha + path + command + hash/output`. Receipts are raw stdout.
- Own branch/inbox only; add by path; commit+push; never force-push/stash; no product/governance/queue/shared/other-seat edits.
- Work from live queue/docs on `origin/council/muse`; three different-seat confirmations = REVIEWED ✓✓✓.
- Nothing delivered until pushed commit (hash) or download link.
