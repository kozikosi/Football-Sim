# Council prompt v7 (P-284: finalize ONE weights table, 2026-11-05)

From MUSE, High Councillor, to the council. This is a COUNCIL prompt, so the firmer tone is intended. It SUPERSEDES v6 as the current sendable text — v6's substance (P-282, P-276, the guard-pass-2 update, the boot-efficiency language) is carried forward here, but the top item is now P-284. Boot is lean: follow `_agents/START-HERE.md` on council/muse (read it via `git show origin/council/muse:_agents/START-HERE.md` and follow it exactly). Do NOT re-read the full START-OF-CHAT.md boot for this task — START-HERE.md is the lean version, and it already has the task-given shortcut, the worktree-not-/tmp tool rule, and the PRIORITIES.md visibility note.

---

MUSE — High Councillor — to the council.

## The task is P-284 (P1): finalize ONE weights table

The Owner directed this one: "We all need to finalize a table so that there isn't disagreement about which weight table to search for." Take P-284 from `_agents/PRIORITIES.md` (it is on council/muse; read it with `git show origin/council/muse:_agents/PRIORITIES.md | grep P-284`). Whoever opens a chat takes the top line via `node tools/next.mjs` and does it, or leaves it for someone else. No waiting to be assigned, and never assign work to a named agent — this is a group call, not a named assignment.

## Why this exists

There are currently FOUR different numbers for the same position, and the council disagrees about which one is "the" table. That disagreement is what P-284 closes:

1. **DEFAULT_WEIGHTS** (shipped product, Pre-Colors — the Owner's protected table): e.g. WR1 60, WR2 40, ratio 0.667.
2. **modelWeights()** (the draft board's quantisation of revealed impact): e.g. WR1 305, WR2 165, ratio 0.541.
3. **Colors slots.ts** (new engine): e.g. WR1 525, WR2 295, ratio 0.562.
4. **The REVEALED impact itself** (slotWinsPerOvr, measured by the sweep): e.g. WR1 0.05517, WR2 0.03003 wins per +1 OVR, ratio 0.544.

The revealed ratio is what ends up as WINS — it is measured from the matchup model (bump a slot's OVR, see how many wins that buys). The spec ratio (RATING_SPECS.rec WR2/WR1 = 0.707) is a model parameter, not a wins ratio. Do not present the spec ratio as a position's worth.

## What to do (every seat that takes this item)

Run the weights-vs-impact sweep on **ALL 32 positions** — not just WR2. The method is the P-224 method: `tools/mathlab/lab.js "table"` on the Pre-Colors product (or the equivalent against the Colors engine). VLOC's P-282 filing (`inbox/20261106-102807-vloc-P-282-weights-verification.md`) is the reference method; Beam's P-282 review (`inbox/20261106-1035-beam-P-282-review.md`) is the reference verification. Read those two files first — they show exactly how to run it and what the output looks like.

For EACH of the 32 slots, report:
- The revealed impact (slotWinsPerOvr, wins per +1 OVR).
- The revealed rank, the weight rank (from DEFAULT_WEIGHTS), and the gap.
- Whether it flags (|gap| ≥ 4 is the signal).

Compare the revealed impact against the salary context: WR1s $30–35M/yr, WR2s $12–18M/yr (ratio 0.4–0.6); QB $55–60M; edge/CB/DT $20–35M; OL/LB/S $10–20M; RB depressed $8–12M; TE $10–15M; K $4–6M; P $3–5M.

File your result via `inbox/<UTC>-<seat>-P-284-<slug>.md`, with:
- The full 32-position revealed table + flags.
- A RECOMMENDATION for the FINAL table: which single table should be "the" weights table, and what changes (if any) it needs. Say explicitly which table you recommend and why.

## What is already on record (do not re-litigate WR2 alone)

The WR2 split is already measured and argued. Do not spend this item re-doing WR2 — do all 32 positions, and let the WR2 recommendation ride with the rest:

- The revealed WR2/WR1 is **0.544** (VLOC + Beam both measured it, VERIFIED) — inside the 0.4–0.6 salary band.
- **VLOC + Beam recommend:** bring DEFAULT_WEIGHTS (0.667) and rec WR2 (0.707) down toward ~0.54–0.56, so the three tables agree with the revealed 0.544.
- **VL recommends:** HOLD spec WR2 at 0.70 and do NOT cut yet — the Colors table (0.562) is already in-band, and cutting the spec would push WR2 below its revealed table value with no reliable impact evidence (his P-224-style probe was below the noise floor; the dedicated P-224 sweep tool doesn't exist yet).
- The broader table already has 14 flags (|gap|≥4) from VLOC's P-282 Part 2 — largest: WR1 underweighted (gap −15), DT2 overweighted (gap +13). Your sweep should reproduce or correct those.

## The rules for this item

- The tables are protected constants (DEFAULT_WEIGHTS, RATING_SPECS, and the modelWeights() quantisation contract). Any change needs Owner approval (P-013 governs) and a MERGE-MANIFEST.md re-pin in the same commit. **No seat edits a table unilaterally.** This item is measurement + recommendation only. The Owner/Architect finalize the table from the council's recommendations.
- Labels everywhere: VERIFIED / REPORTED / INFERRED / UNKNOWN. "Done" needs a command and its output.
- Review chain: WORK by the first seat that takes it; REVIEW by three different seats (VERDICT: ok | improved | rejected); three ok/improved = REVIEWED ✓✓✓. A review you can do beats new work in the same tier.
- Nothing is "delivered" until a pushed commit (give the hash) or a download link exists — never give the Owner a sandbox path.
- Only the Owner or the Architect moves P-items to terminal states (BUILT/SUPERSEDED).

## §2 — The rest of the queue (unchanged from v6)

- P-282 is done (VLOC work, Beam review improved, VL independent filing) but NOT marked REVIEWED ✓✓✓ yet (needs three reviews; Beam's is one). P-283 (the boot inefficiency fix) is filed for the Architect. P-276 is still the P0 headline (the decisive N=1000 baseline repro; do not tune against either cluster until pinned at N=1000). P-279/P-280 and P-252/P-253 are done and reviewed — only the Owner/Architect can move them to BUILT. The guard passes continue (Claude's guard pass 2 landed boxscore clean, tsc 202 → 176; next by size: recap 25, season 24, standings 19, draft 17, core/hungarian 15, lineup 14, then the rest). That's Claude's work, not the council's.
- The Z.ai lab-tools prompt v6 is out (the Lab harness runner first, then M2–M5, M1 relabels, the batteries maintenance, cutover support). The WR2 verification in P-282 is the council's work; Z.ai's harness runner would enable it, but P-284 is the council's own sweep — do not wait for Z.ai's runner to start.
