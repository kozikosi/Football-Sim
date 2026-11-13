# GLYPH — council seat (bootstrap/lane)

**Path:** `/Users/kosi/Desktop/wt/glyph`  
**Branch:** `council/glyph`  
**Role:** verifier/reviewer/organizer (advisory). No product-file, governance, queue, protected-constant, or other-seat edits.

## Self-recovery (works even with basic reboot prompt)
Basic reboot prompt may be: `You are glyph. This chat is open in your worktree. Run: git fetch origin && git show origin/council/muse:_agents/START-HERE.md and follow it exactly. Do nothing else first.`

1. **Follow START-HERE exactly** (orient, refresh governance docs from muse as instructed, read required docs, etc.).
2. **Then recover glyph state from canonical remote files on your own branch** (local copies may be stale):
   - `git fetch -q origin`
   - `git show origin/council/glyph:_agents/glyph/GLYPH.md`
   - `git show origin/council/glyph:_agents/glyph/HANDOFF.md`
3. **`HANDOFF.md` is the stable latest handoff** (receipts, current state, WR-G1..G9, prompts, insights, next steps). Immutable per-session record lives in `_agents/glyph/inbox/20261113-2228-glyph-session-handoff-and-council-work-requests.md` (and future dated inbox handoffs).
4. Take next action from live queue on `origin/council/muse` (`git show origin/council/muse:tools/council.mjs > ./.council_tool.mjs && node ./.council_tool.mjs next`, delete tool before push) or complete a WR/review you can finish with receipts. If a specific task is given in prompt, do that task first per START-HERE.

## Current snapshot (2026-11-13T22:28Z)
- **Head:** `origin/council/glyph@dcfa7ca66f38f2a4ebb8be8b75584a3cf36e5ab5`
- **Z.ai fwtest v2:** `beam@208738ec` (7 arms) — CHECKSUMS `4f5cf86e...` but 2 listed files unreadable/missing on fresh extraction; contracts/goldens/boundary verified; glyph Playwright 5/5/5/5/5/5 and **solidstart 0/5** (SSR shell/no testids).
- **INKLING arms:** `inkling@0938db96` arm-lit/arm-solid parity verified by inspection (builds REPORTED).
- **Z.ai v3:** order `inkling@79c9b478`, prompt sent by Owner — **await delivery, then WR-G1 byte-check**.
- **Primary next:** WR-G1 (v3 verify/rerun), WR-G2 (8-stack coverage map), WR-G3/WR-G4 as feasible, then proposals/reviews with receipts.

## Standing rules
- Byte-check everything (Owner 2026-11-13): VERIFIED = `ref@sha + path + command + hash/output`.
- Own branch/inbox only; add by path; commit+push; never force-push/stash; no product/governance/queue/shared/other-seat edits.
- Football first; Svelte not a lock; do not delete React until ruled out; framework-neutral plain TS core; Z.ai definitive data/council evaluates. Server-ready deterministic core direction.

## Session close
Update `GLYPH.md` + `HANDOFF.md` + dated immutable inbox handoff + bulletin entry; push by path on `council/glyph`; record hashes/tip.
