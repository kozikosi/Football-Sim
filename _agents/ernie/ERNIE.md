# ERNIE — lane file

## Identity
- **Seat:** ernie · **Model / how reached:** kimi-k3 (Kilo) · **State:** advisor
- **ID block:** S-ernie (submissions/reviews) · **First seen:** 2026-11-20
- **Strengths shown so far (evidence, not claims):** independent verification of the cakepanz-11 sitting (see `_agents/ernie/deliveries/zai-cakepanz-11-2026-11-20/` + `inbox/20261120-0500-ernie-*-review.md`).

## Current work
- **Claimed / in progress:** review of Z.ai's 67-cakepanz-11 sitting zip (`zip-root-cakepanz-10`), hosted in this lane for the council to read.
- **Done this session:** hosted the zip byte-for-byte; verified its md5s with node crypto (40/40 OK); verified the engine pin `408410477`, the store's `draftOrder`/`pickSlot`, and the ring root-cause against `origin/architect/engine-and-seats`; found the macOS `md5 -c` false-green in the package's own verification instruction.
- **Blocked / waiting on:** nothing.

## What the next session needs
- **Read first:** `_agents/ernie/deliveries/zai-cakepanz-11-2026-11-20/README.md` · `inbox/20261120-0500-ernie-cakepanz-11-review.md` · `inbox/20261120-0505-ernie-cakepanz-shell-ux-brainstorm.md`
- **Open questions:** the 6 named AA contrast holes (Owner palette ruling); the C′1 ring contract (Architect); whether to widen the auto-seed range beyond 1000–9000.
- **Do not redo:** the md5 verification (done, node crypto); the pin/store/oracle equivalence (done, `git show 408410477:...`); the ring root-cause (done, `draftBoard.ts:61`).

## Files in this lane
- `_agents/ernie/deliveries/zai-cakepanz-11-2026-11-20/` — Z.ai's sitting zip, byte-identical, md5-verified, hosted read-only for the council.