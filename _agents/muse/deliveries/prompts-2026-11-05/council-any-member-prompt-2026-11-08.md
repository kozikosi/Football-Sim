# Council prompt — any member (help Z.ai and Claude) — 2026-11-08

**From:** MUSE, High Councillor
**To:** any council member (the Owner sends this to whoever he picks)
**Tone:** Direct — the council tone. This is a work call. But it is an invitation, not an order: take the top item you can do, or any item on the list that fits what you can run.

---

## The boot (do this first)

You are [Name]. This chat is open in your worktree. Run: `git fetch origin && git show origin/council/muse:_agents/START-HERE.md` and follow it exactly. Do nothing else first.

## The mission

Z.ai is building 67 Cakepanz (the whole Colors UI, slice by slice) and Claude is finishing the engine (the math, the guard passes, the contract work). Both are moving. What they need from the council is what only the council can give: independent reviews and verification.

A review you can do beats new work in the same tier — and right now, reviews are the bottleneck. Z.ai cannot start Slice 2 until Slice 1 is reviewed. Claude's guard passes need independent verification. The live wave (w85) has zero council reviews. Your review is what unblocks the builders.

## The work — take the top item you can do

Fourteen new items were filed 2026-11-08 (P-285..P-298) to help Z.ai and Claude. Take the top one you can run, or any one on the list that fits what you can do. The full text of each is in `_agents/PRIORITIES.md` (live table, P-285..P-298).

**Reviews (the bottleneck — do these first):**
- **P-285 (P1) — Review the current live wave (w85), and each new wave as it lands (w86 next).** w85 is live with ZERO council reviews. Verify the Owner's five Nov 8 comments, re-run Z.ai's battery claims independently (24/24, 28/28), run the w77 battery (84 assertions) against w85, and check the file identity.
- **P-286 (P1) — Review 67 Cakepanz Slice 1 (Draft Board).** When Z.ai ships Slice 1: run the w77 battery against his build via his adapter, verify the engine snapshot is frozen at the pinned commit (4ca9a071 — spot-check the files, don't trust the README), check the slice against the contract and the w85 reference. Z.ai is blocked on this review.
- **P-287 (P1) — Review 67 Cakepanz Slices 2–5 as they land.** Same pattern as P-286 for Team Select/Season/Standings, hydration/FeedEvent, N3 feed, N2 shareables.
- **P-288 (P1) — Review/verify Claude's guard passes (continuing) + FITTED-label test + Q4 parameter diff.** Independently verify each guard pass with the seeded-hash check (the Beam/VL pattern from guard pass 2). Don't just confirm the commit exists — run the check.

**Verification (the evidence the builders and the Owner need):**
- **P-289 (P1) — Verify the model-first lab program.** T1 ladder, holdout law, triangulation, Kicker FG-model audit. Reproduce each independently. A flag is a finding, not an error to fit away.
- **P-290 (P2) — Reconcile the three open verification discrepancies + the DS margin-histogram defect.** The 112-game hash (68aecdac… vs 27a09e70…), the test count (284 vs 286), the tsc-baseline file count (20 vs 24) — close them. Plus the margin histogram that sums to 95.76%.
- **P-293 (P1) — Model-first weights finalization.** The salary table is dead (Owner, 2026-11-08). Build the ONE measured table for the 32 slots from the engine's raw curves + triangulation. This replaces P-284's salary-table method.
- **P-294 (P1) — Flex re-derivation under model-first.** The Nov 7 experiment assumed the dead salary weights. Review Z.ai's theta pricing grid and produce the evidence for the Owner's flex pick. Do NOT touch flex.json / FLEX / slots.ts / design.json — the HOLD stands.

**Tooling (remove blockers):**
- **P-291 (P2) — Tree-comparison harness.** Run the same w77 battery against both trees (Colors and 67 Cakepanz) and diff the results per assertion. This is what lets the Architect decide what ships at cutover, on evidence.
- **P-292 (P2) — Unblock the deno gap.** OR and vloc can't run the Lab (no deno). Verify Z.ai's Node Lab runner when it lands and confirm they can run the Lab through it — or propose the workaround. Don't leave them blocked silently.

**CI, cutover, and the rest:**
- **P-295 (P2) — CI-gate verification (N=100).** When Z.ai drafts the CI workflows, verify they run and actually gate (a bad build must FAIL). This is the "who runs the test every night" answer made real.
- **P-296 (P2) — Cutover readiness checklist.** Branch inventory, open-P-row snapshot, inbox/bulletin move plan (reconcile Pickle's narrower split vs VL/OR's broader move), verification receipt. Ready for the Architect at cutover. Don't move anything yourself.
- **P-297 (P2) — N1 exhibit help.** Draft the exhibit content (the story, timeline, archive links). Z.ai has it as optional; take it or help him.
- **P-298 (P2) — Page-background fix verification.** When Claude lands the two page-background constants (#fdf2f6 light / #1e1119 dark) + contrast floors, verify them for all 32 teams × 2 themes. Measure, don't trust the claim.

## The existing queue — these still need takers

- **P-276 (P0) — the headline.** Verify Z.ai's w75 reproduction (M14) and resolve the two-cluster split. The decisive N=1000 baseline repro is still in flight (VL). This is the most important open verification in the project.
- **P-282 (P1) — needs two more reviews** for REVIEWED ✓✓✓ (Beam's is one). Largely superseded by model-first, but the review bar matters for the record.
- **P-254..P-261 (P1/P2) — need takers.** Envelope sync conflict rule (P-254, behavior Owner-approved), drafter policies (P-255), golden-file seed test (P-256), queue measurement fix (P-257), legacy.ts deletion (P-258), w73 contract findings F1–F10 (P-259/P-260), DATA-LICENSE.md (P-261).
- **P-250 / P-255 / P-263** — calibration (targets, policies, the skilled-policy discrepancy). The P-263 inbox protocol draft needs both corrections (new targets + skilled rename + cluster reopened) when it lands.

## How to work

- Take the top item from PRIORITIES.md via `node tools/next.mjs`, or take any item on the list above that you can run. Don't wait to be assigned — the queue is the assignment. Nothing waits for a particular seat, ever.
- **Reviews:** three different seats, `VERDICT: ok | improved | rejected`, filed as `inbox/<UTC>-<seat>-<ID>-review.md`. No seat reviews the same item twice. More than three reviews are fine.
- **Labels:** VERIFIED / REPORTED / INFERRED / UNKNOWN on every claim. Verify before you claim. A claim you didn't check is REPORTED, not VERIFIED.
- **Only the Architect edits the product.** Council work is ideas, exact snippets, measurements, mock-ups. Never touch the product file, the protected constants, or another seat's branch.
- **Delivery gate:** nothing is delivered until a pushed commit (give the hash) or a download link exists. Never give the Owner a sandbox path.
- **If you find a blocker** (no deno, no tool, a contract gap, a missing file), say so in your filing and propose the workaround — don't go silent. A blocked seat that reports the block is helping; a silent seat is a stall.
- **If you see work that needs doing that isn't on the list,** file it as a P-item proposal (or do it and file the result). Bring your ideas — the Owner wants the council's initiative, not just its output. If an idea touches something outside your lane (the engine, the brand, the Owner's decisions), propose it through inbox instead of building it.

## What's most needed right now (in order)

1. **P-285** — review w85 (live, zero reviews).
2. **P-286** — review 67 Cakepanz Slice 1 when it lands (Z.ai is blocked on it).
3. **P-276** — finish the N=1000 baseline repro (the P0 headline).
4. **P-282** — two more reviews to close it.
5. **P-289 / P-293** — verify model-first and finalize the measured table.
6. **P-254..P-261** — take any of these; they've been waiting.

## Note on the queue

PRIORITIES.md was at the push size limit (128,962 bytes, only 182 bytes of headroom — no new item could be added). The 88 terminal rows (SUPERSEDED / BUILT) were moved verbatim to `_agents/PRIORITIES-ARCHIVE.md` on 2026-11-08 so the queue can grow again. Nothing was deleted; the history is in the archive file. The 14 new items (P-285..P-298) are in the live table. The RETIRED section in PRIORITIES.md still holds the most recent terminal rows.
