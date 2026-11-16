SPEAKER: glyph | ROLE: council | TASK: Cakepanz blocked pieces + proposed unblock paths (Part 4) | DATE: 2026-11-16T21:04Z
FOR: P-317

# Blockers and unblock proposals (Cakepanz shell)

## 1. Team Select must include draft position (slot 1–32) — P-317 (VERIFIED gap)

**Requirement (Owner/prompt):** user picks team AND draft position (slot 1–32) on the same Team Select screen, same look.

**Current state (VERIFIED):**
- Deployed `src/lib/screens/TeamSelect.svelte`: team buttons only; `start()` calls `onstart(chosenIndex)` with team index only.
- Deployed `src/App.svelte`: `startDraft(teamIndex)` generates random seed, sets `userTeam`, dispatches `START { seed, userTeam }` (no slot/order).
- Deployed engine app store (`src/engine/sports/nfl/app/store.ts`): `START` action type is `{ seed: number; userTeam: number }`; no custom order field.
- Engine draft core supports custom order: `newDraft(players, rng, cfg, order = snakeOrder())` (VERIFIED in `src/engine/sports/nfl/engine/draft.ts`). So engine capability exists; app/store wiring does not.

**Blocked on:** Architect store/save contract changes (as prompt states). Z.ai cannot edit `colors/` or engine snapshot semantics safely without §5 integration.

**What Z.ai can build now (PROPOSAL, reversible):**
- Add slot picker UI (1–32) to Team Select, same visual treatment as team selection; compute/display resulting pick context preview if possible via pure helper (no engine mutation).
- Define a **save/restore contract extension** in shell types/docs: e.g. `draftSlot: number` (1–32) and/or explicit `order: number[]` persisted alongside `seed,userTeam`. Mark as `STAND-IN contract pending Architect`.
- Thread chosen slot through shell-facing start API: `onstart({ teamIndex, draftSlot })` and store in UI state; when calling current store, document that slot cannot yet affect engine order until store lands (clearly labeled limitation) — **or** if a safe local adapter workaround is possible without editing snapshot engine files, implement behind seam and label it (risky; prefer explicit blocker note).
- Add battery/probe cases for slot selection UI and persistence shape (even if engine-order effect is deferred).

**What Architect must build (PROPOSAL, §5 target):**
- Extend store `START`/`LOAD`/`SaveRecord` to accept and persist `draftSlot` or `order`.
- On START, construct order so chosen `userTeam` is at chosen slot (and remaining 31 fill snake/default rest as specified) and pass to `newDraft` / `restoreDraft`.
- On LOAD, replay using persisted order/slot so log remains valid (`restoreDraft` currently validates `k.team === st.order[st.pos]`).
- Tests: restore determinism with custom slot, save/load round-trip, illegal slot rejected.

**How to tell it failed:** loaded save places user on wrong pick, throws "pick is out of order", or UI shows slot different from restored draft.

## 2. Pin/documentation contradiction (VERIFIED)

**Issue:** gh-pages README states pin `4ca9a071` while engine snapshot was re-pinned to `d3bd81d2` content (`66096fb1`). Merge/readiness docs (SNAPSHOT/MERGE-README/MERGE-GUIDE/SHELL-STATUS) absent on gh-pages.
**Blocked on:** Z.ai publishing accurate handoff docs + correcting README in delivered tree.
**Unblock now:** generate per-file sha256 manifest of `src/engine/**`, record `git log -1` receipt, and pin declaration in SNAPSHOT.md; treat README as stale until corrected.

## 3. Merge-cone artifacts not evidenced in deployed tree (VERIFIED absence)

**Issue:** M4/M5/handoff docs not found on gh-pages; M1 likely fails (direct engine imports). s5 delivery may improve but unverified in this seat.
**Blocked on:** Z.ai refactor + receipts.
**Unblock now:** implement adapter, produce grep/swap/sha receipts, write handoff docs per prompt Step 3.

## 4. Deployed gh-pages may lag behind latest deliveries (INFERRED)

**Issue:** gh-pages `src/lib` shows slice-2-era structure; s5 exists on `council/inkling` with richer modules per README/tree.
**Blocked on:** Owner/relay/deploy step (Z.ai cannot push gh-pages).
**Unblock now:** Z.ai should state canonical "latest" artifact (zip/commit) in delivery note; reviewers should target that artifact, not assume gh-pages is current.

## 5. Runtime/battery verification not reproducible from this seat (environmental)

**Issue:** I cannot run Playwright/battery/build here to verify 75/0/10/3, file://, 390px claims.
**Blocked on:** runnable environment + delivered tree.
**Unblock:** any verifying seat reruns with full stdout/exit codes and falsifiers; Z.ai includes VERIFY.txt commands.

## Summary table

| Blocker | Owner | Status | Next concrete action |
|---|---|---|---|
| Draft slot 1–32 in store/save | Architect | OPEN | Specify+implement store START/LOAD/SaveRecord order support; Z.ai builds UI+contract docs now |
| Pin/docs stale or missing | Z.ai (docs) + Owner relay | OPEN | Correct README, add SNAPSHOT/MERGE docs with hashes/receipts |
| One-door seam/refactor | Z.ai | OPEN | Adapter + M1 grep zero outside adapter + M3 swap receipt |
| Deployment lag vs s5 | Owner/Z.ai relay | UNKNOWN | Identify canonical delivery hash/zip; deploy when ready |
| Independent verification | Council seats with harness | OPEN | Rerun battery/gates/file:///390px and file reviews |

