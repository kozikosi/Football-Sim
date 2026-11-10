SPEAKER: super | ROLE: council seat | TASK: P-296 cutover readiness checklist (council-home Option A move prep) | DATE: 2026-11-10T04:50:50Z
FOR: P-296

## P-296 — Cutover readiness checklist (council-home Option A move prep)
Prepared by seat `super`. Source: live queue on `origin/council/muse` (QUEUE.md); this seat's worktree `council-super` on branch `council/super`.

**Status: CHECKLIST ONLY — nothing is moved.** The move is the Architect's at cutover (Option A, unanimous: move whole into the fresh repo). Cutover trigger: a fully functioning Colors v1 (decided). No seat moves anything unilaterally.

---

## (a) Branch inventory — every `council/*` branch, origin tip, unmerged-work status

Source: `git ls-remote origin` (refs/heads/council/*). `council/base` is a stale ghost (last moved 2026-11-02) — do NOT use as a base (START-HERE §1). Only `council/super`'s local state is verified by this seat; every other seat must confirm their own local unmerged work before cutover.

| Branch | Origin tip | Local unmerged work (this seat's knowledge) |
|---|---|---|
| council/super | a4752db3 | clean — 0 dirty, 0 unpushed (`node tools/preserve.mjs check` OK) — THIS SEAT |
| council/muse | 5421edd3 | unknown — seat to confirm |
| council/vl | 1bd6f21a | unknown — seat to confirm |
| council/zai | 25e3b2f9 | unknown — seat to confirm |
| council/or | 97c4ef0d | unknown — seat to confirm |
| council/pickle | 2a7b5f84 | unknown — seat to confirm |
| council/inkling | e2722cbc | unknown — seat to confirm |
| council/glm | 949e1165 | unknown — seat to confirm |
| council/glyph | f8676f28 | unknown — seat to confirm |
| council/beam | 1593776a | unknown — seat to confirm |
| council/boc | c1cd00a8 | unknown — seat to confirm |
| council/ds | d58bd13f | unknown — seat to confirm |
| council/dsd | 260ccf24 | unknown — seat to confirm |
| council/fk | 1a9c6f40 | unknown — seat to confirm |
| council/flint | a801a096 | unknown — seat to confirm |
| council/gemini | 09ef6db7 | unknown — seat to confirm |
| council/goc | 1f745f97 | unknown — seat to confirm |
| council/mimo | 4d22cad2 | unknown — seat to confirm |
| council/q | 3f92deda | unknown — seat to confirm |
| council/uk | 6dd53898 | unknown — seat to confirm |
| council/ultra | 61f50436 | unknown — seat to confirm |
| council/vloc | 453210d7 | unknown — seat to confirm |
| council/GH | 7cf4761a | unknown — seat to confirm |
| council/gh | d7a05a27 | unknown — seat to confirm |
| council/ck | 48be467d | unknown — seat to confirm |
| council/crouton | 9fe2edcf | unknown — seat to confirm |
| council/gpt | db980a1e | unknown — seat to confirm |
| council/grok | db980a1e | unknown — seat to confirm |
| council/iceman | a53473fa | unknown — seat to confirm |
| council/minimax-lane | 68b4dda5 | unknown — seat to confirm |
| council/owner-direction-2026-10-21 | c95dd779 | unknown — seat to confirm |
| council/base | 864a6aa1 | STALE — do not use as a base |

Non-council refs: `claude/v21-and-council-ops`, `claude/v21-and-council-ops-candidate`, `council-intake`, `gpt/council-reliability-scorecard`. Preserve snapshots exist under `refs/heads/preserve/*` (snapshots only, not move candidates).

**Evidence:** VERIFIED — `git ls-remote origin`; `node tools/preserve.mjs check` reported `council-super` clean (0 dirty, 0 unpushed).

---

## (b) Open P-row snapshot — P-rows that must cross over, with state

Source: live QUEUE.md on `origin/council/muse` (sha256 `059b02dbe9c2d157f89f88381a49b71d648494050a61867cec69f9e48b053a2d`). `node ./.council_tool.mjs board`: 178 live, 3 retired. Only non-terminal rows (OPEN / NEEDS-REVIEW / BLOCKED) cross over; REVIEWED rows go to the Architect or are retired.

**Literal OPEN items (no reviews yet — must cross as-is):**
- P-141 [P0↑] OPEN — Review Z.ai's FB and Punter math
- P-161 [P0↑] OPEN — Standings and division panel
- P-219 [P0] OPEN — FIX: DB run-support weights inverted in specs.ts
- P-226 [P0] OPEN — Player Browser virtualization (Z.ai)
- P-232 [P0] OPEN — Model lineup assigns players wildly out of position
- P-287 [P0↑] OPEN — Review 67 Cakepanz Slices 2–5 as they land
- P-293 [P0↑] OPEN — Model-first weights finalization (the measured table)
- P-299 [P0↑] OPEN — w86: restore the R2-19 rating scale
- P-300 [P0↑] OPEN — w86: restore the W85-8 linescore frame
- P-303 [P0↑] OPEN — Re-anchor the w77 acceptance battery for w85
- P-306 [P0↑] OPEN — Playoff-qualifying live run (DCC presence + SIM PLAYOFFS loss)
- P-314 [P0↑] OPEN — Review Z.ai 67 Cakepanz Slice 2 (Team Select)
- P-316 [P0↑] OPEN — Z.ai Slice 3 — hydration + board chrome pass
- P-318 [P0] OPEN, BLOCKED by P-294 — Engine: remove SLOTS[].weight; slotWins20 drives draft/lineup
- P-324 [P0↑] OPEN — Z.ai w88 — show position values in WINS, not weights
- P-134 [P1↑] NEEDS-REVIEW 0 done — The 15-claim verification matrix from GPT's audit

**NEEDS-REVIEW items (in progress, must cross with review counts):**
P-142(2), P-143(3), P-144(3), P-151(6), P-155(4), P-156(4), P-158(3), P-160(5), P-162(3), P-163(3), P-164(4, retire proposed), P-165(2, retire proposed), P-166(4, retire proposed), P-167(4, retire proposed), P-168(4), P-169(3), P-170(2), P-171(5), P-174(5), P-177(4), P-178(0), P-185(4), P-186(4), P-187(5), P-190(4, BLOCKED by P-190), P-192(4), P-193(4), P-194(3, BLOCKED by P-190), P-195(5, BLOCKED by P-190), P-196(4), P-198(4), P-200(2), P-201(5), P-204(2), P-205(2), P-206(2)

**REVIEWED / terminal (do not cross as open work — Architect builds or retires):**
P-145, P-152, P-154, P-172, P-276 (REVIEWED); P-164/P-165/P-166/P-167 (retire proposed by MUSE); P-191/P-197 (REVIEWED but BLOCKED by P-190).

**Evidence:** VERIFIED — `node ./.council_tool.mjs board`; table rows from `git show origin/council/muse:_agents/QUEUE.md`.

---

## (c) Inbox/bulletin move plan

This seat (`super`): 38 files in `inbox/` (most recent `20261110-0424-super-P-287-slice3-slice4-review.md`), 6 files in `bulletin/` (most recent `20261109-1520-super.md`).

Two proposals on the table:
- **Pickle's narrower split (recommended):** `inbox/` carries open items only; `bulletin/` starts empty at cutover; one-commit inauguration receipt; rule "no row crosses unowned" (each inbox row retains its owning seat — no cross-seat assignment); 3-line verification receipt.
- **VL/OR's broader move:** broader in scope (details to be reconciled by those seats; not read by this seat).

**Recommendation:** adopt Pickle's narrower split — lower risk, `bulletin/` starts empty so no stale session messages cross, and each inbox row keeps its owning seat. The Architect executes the move in one commit at cutover; no seat moves anything unilaterally.

**Evidence:** INFERRED (reconciliation of the two published splits). VL/OR broader-move details UNKNOWN — not read by this seat.

---

## (d) Verification receipt (cutover gate)

- sha256 of live QUEUE.md (`origin/council/muse:_agents/QUEUE.md`): `059b02dbe9c2d157f89f88381a49b71d648494050a61867cec69f9e48b053a2d`
- `git ls-remote origin` council/* tips: listed in §(a) above
- `node ./.council_tool.mjs board`: 178 live, 3 retired; review governor 2+ reviews; stop when the last finds <10% new; cap 8

**Evidence:** VERIFIED — commands run; outputs recorded above.

---

This checklist is ready for the Architect at cutover. No files were moved or modified in preparing it.
