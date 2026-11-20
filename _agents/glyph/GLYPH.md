# GLYPH — council seat (lane / self-booting handover)

**Path:** `/Users/kosi/Desktop/wt/glyph`  
**Branch:** `council/glyph`  
**Role:** verifier/reviewer/organizer (advisory). No product-file, governance, queue, protected-constant, or other-seat edits. Never force-push; never stash.  
**Identity:** glyph (not retired; `_agents/RETIRED.txt` checked 2026-11-20).  
**git common dir:** `/Users/kosi/Desktop/Football Sim/.git`  
**merge-base (HEAD, origin/council/base):** `864a6aa12689a9ef579fb1a2fb6c07a1c6bd2c0e` (VERIFIED 2026-11-20).  
**Pushed tip (this session end):** `ba86f5b2c5cd6ffc11e940f7f62cf52eb145549e` (VERIFIED by `git ls-remote origin refs/heads/council/glyph` 2026-11-20).

## BOOT — read this first, every session
1. `git fetch -q origin` then START-HERE §1 Step 0 (refresh governance docs from `origin/council/muse`): `git status --porcelain -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md` must be clean, then `git checkout origin/council/muse -- AGENTS.md PROJECT-KNOWLEDGE.md _agents/START-HERE.md _agents/START-OF-CHAT.md`; confirm staged diff lists only those four. Until run, treat governance docs as REPORTED. Do not run `sync-base.sh`.
2. Read this file to the end and `ls _agents/glyph/*.md _agents/glyph/inbox 2>/dev/null`. If behind: `git fetch -q origin && git checkout origin/council/glyph -- _agents/glyph/`
3. Live queue/tool/docs on `origin/council/muse`: `git fetch -q origin && git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs && node ./.council_tool.mjs next` (delete temp tool before push).
4. `node tools/preserve.mjs check`.

## Current state (session end 2026-11-20T15:52Z, glyph)
- **Worktree:** `/Users/kosi/Desktop/wt/glyph`, branch `council/glyph`, clean at session end (this commit will be session-end state).
- **This session (VERIFIED, pushed):** `ba86f5b2c` — published Desktop `/Users/kosi/Desktop/Football Sim/zai-cakepanz-12-2026-11-20` to `_agents/glyph/deliveries/zai-cakepanz-12-2026-11-20/` (37 files, 376K; `diff -rq` exit 0, CHECKSUMS 36/36 OK, T4 no-self-entry; root README verify path mismatches packaged layout — verifier at `cakepanz-4-changed/tools/verify-package.mjs`) plus review `_agents/glyph/inbox/20261120-1810-glyph-zai-cakepanz-12-2026-11-20-review-and-ideas.md` and bulletin `bulletin/20261120-1815-glyph.md`.
- **zai-cakepanz-12 review highlights (REPORTED by package receipts/docs, inspected):** fix-round delta at engine pin `408410477` — T2 seed `b36:` parsed first + R2 widened draw (100k–9,999,999) + URL write-back (round-trip 0 failures; old 700/9000 mis-replay), T1 D-2 stale-server guard + F20 battery hardening (crash/vacuous root cause addressed but full 9-case “F20 … DIED — FAIL L13” rerun and final composite OPEN), T4 portable `verify-package.mjs`/no-self-entry, T3 gh-pages repoint 277/286→286/286 receipted for relay, T6/T7 a11y+one-click guard/status+restore note+768px band, T5 C25 corrections filed, T8 c10 hosts 48/1/51/49 blocked on run-variant repair bytes (refusal verified). Reported final batteries: board 15/0, slot 28/0, visual 15/0, node 33/33, slice 29/0/10/3, contrast 2/0 (not re-run by glyph).
- **Previously pushed this lane (recent):** `41173131e` repaired c10 package (prepared dist + doc-fix/manifests, root 49/49); `41ea2fa46` published/reviewed `zip-root-cakepanz-10`.

## What next session needs
1. Refresh governance from `origin/council/muse`, then `node ./.council_tool.mjs next` (temp tool, delete before push) and take highest-value review/work (queue currently shows NEEDS-REVIEW items e.g. P-166–P-171 etc.; glyph has not filed reviews for them).
2. If asked to follow up zai-cakepanz-12: track/open items — hardened falsifier full rerun + closing acceptance composite at final bytes, gh-pages relay application of repoint, c10 repair-byte relay from Owner zip root (exact 6418 B / md5 `0a286953…`, stop-on-mismatch), MUSE/INKLING C25 integration, Architect ruling on ring Contract B.
3. Keep cakepanz/UI-UX ideas advisory (seed/replay provenance, Contract-B explainability, flow-level a11y/focus/live status, deterministic receipts, acceptance observability, contrast closure) — do not edit engine/product/governance/queue/shared files.

## Open questions / blockers
- No glyph-lane blocker. OPEN/Owner-Architect-gated: 13b closure + final composite for cakepanz-12, gh-pages repoint landing, c10 repair-byte relay, C25 integration, ring contract ruling, contrast AA policy/fixes, Part 0 confirmation/plan-M sport-two as previously noted. Glyph cannot push gh-pages, apply others’ hosts, or rule/edit engine.

## Live files (glyph-owned, pushed)
- Inbox: `_agents/glyph/inbox/20261120-1810-glyph-zai-cakepanz-12-2026-11-20-review-and-ideas.md`, plus prior reviews (e.g. `20261120-0450-glyph-zip-root-cakepanz-10-review-and-ux-innovation.md`, `20261120-0349-glyph-C27-item6-passgap-note.md`, `20261120-0410-glyph-C27-followup-not-done-receipts.md`, `20261120-0326-glyph-c3-c10-repair-rehearsal.md`, `20261120-0326-glyph-c9-c10-landing-audit.md`, `20261120-0333-glyph-c4-doc-fix-landing-simulation.md`, `20261120-0343-glyph-C14-landing-wording-fix.md`, etc.).
- Bulletins: `bulletin/20261120-1815-glyph.md`, `bulletin/20261120-1820-glyph-end.md` (this session end), plus prior `20261120-*` entries.
- Deliveries (present): `_agents/glyph/deliveries/zai-cakepanz-12-2026-11-20/`, `_agents/glyph/deliveries/zip-root-cakepanz-10/`, `_agents/glyph/deliveries/67-cakepanz-10-2026-11-19/` (repaired), `_agents/glyph/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/`, `_agents/glyph/deliveries/67-cakepanz-9-2026-11-19/`, `_agents/glyph/deliveries/67-cakepanz-8.1-2026-11-18/`, `_agents/glyph/deliveries/67-cakepanz-8-2026-11-18/`, `_agents/glyph/deliveries/67-cakepanz-7-2026-11-18/`.
- Lane: `_agents/glyph/GLYPH.md`.

## Standing rules
- Byte-check everything: VERIFIED = `ref@sha + path + command + hash/output`. Receipts are raw stdout; label REPORTED/INFERRED/UNKNOWN.
- Own branch/inbox only; add by path; commit+push; never force-push/stash; no product/governance/queue/shared/other-seat edits.
- Work from live queue/docs on `origin/council/muse`; three different-seat confirmations = REVIEWED ✓✓✓.
- Nothing delivered until pushed commit (hash) or download link.
