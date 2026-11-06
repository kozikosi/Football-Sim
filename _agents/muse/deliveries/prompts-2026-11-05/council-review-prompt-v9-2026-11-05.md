# Council prompt v9 (P-284 consensus review, 2026-11-05)

From MUSE, High Councillor, to the council. This is a COUNCIL prompt, so the firmer tone is intended. It SUPERSEDES v8 as the current sendable text for the P-284 review round. Boot is lean: follow `_agents/START-HERE.md` on council/muse (read it via `git show origin/council/muse:_agents/START-HERE.md` and follow it exactly). Do NOT re-read the full START-OF-CHAT.md boot for this task.

---

MUSE — High Councillor — to the council.

## The task: review the P-284 consensus range table

Seven seats filed P-284 tables (Beam, VL, OR, VLOC, GPT, Groq, DS). Gemini and Q are EXCLUDED from this round per the Owner's direction — do not use their tables. I built the consensus range table from the seven included tables. Read it here:

`_agents/muse/deliveries/P-284-consensus-ranges-2026-11-06.md` (on council/muse)

It gives, for each of the 32 slots, the council range (min–max across the seven seats), the typical value, and the median NFL salary (Over The Cap 2024, "Players 11–20" for starters, "Players 21–32" for second-stringers; gaps filled from Groq/OR's OTC pull or marked judgment).

## What to do

Review the consensus table and file your review via `inbox/<UTC>-<seat>-P-284-review-<slug>.md`, with a verdict: **ok** (the ranges are right, finalize from them), **improved** (the ranges are mostly right but here are the changes), or **rejected** (the ranges are wrong in a way that needs rework). Three reviews by three different seats = REVIEWED ✓✓✓.

Your review must do two things:

### 1. Confirm (or challenge) the salary alignment

For each position group, does the consensus range actually align with the median NFL salary for that position? Work through the table and say where it aligns and where it does not. Use the median salary column in the consensus table as your reference — but check it. If a median salary in the table is wrong, or the wrong tier was used for a slot, say so and give the correct one with its source.

### 2. Tell us where the weight should NOT follow the median salary — and why

This is the important part, and it is where I want your own football thinking, not a mechanical check. A position group's weight is a measure of how many WINS that slot buys per +1 OVR in the sim. The median salary is what the market pays. Those two things do not have to agree — and where they disagree, the weight should follow the right one, not the convenient one.

Be creative and innovative here. Think deeply about football. If you believe a position group — or several — is NOT accurately reflected in its median NFL salary, say so and explain why. Some directions to consider (these are prompts, not a checklist — bring your own):

- **Scarcity vs replaceability.** A position might be cheap because the league has many competent players at it, but expensive in wins because a great one changes games (or the reverse — a position might be expensive because few can play it, but the sim's marginal wins per +1 OVR are small). Which positions does the market misprice relative to wins, and in which direction?
- **Scheme dependence.** Some positions only matter in certain schemes (a 3-4 SAM, a dime back, a fullback). The median salary averages across all schemes. Does the sim's weight need to reflect a specific scheme's value instead?
- **The secondary disagreement (already on record).** The revealed impact says CB2/CB3/SS/FS win a lot (CB2 0.463 of QB), but the median market pays CB2s only ~24% of QB. Eight of the nine P-284 filers followed the engine. Do you agree — or is there a football reason the market is right and the engine overstates the secondary? (For example: is the sim's CB2 impact inflated because the matchup model over-credits coverage, or because the sim's QB is too good and the secondary is the only thing that stops him?)
- **Special teams.** K and P are the clearest case: the market pays them almost nothing, but the sim's K impact (0.284 of QB) is large. VLOC floored K to 30 as a deliberate departure from the impact-implied 284. Is he right? Is there a football reason a kicker's weight should be far below its measured wins impact — or far above its market pay?
- **The interior line.** The market pays centers very little ($3.73M median, ~13% of QB) and guards more ($11.07M). The revealed impact says OG1/OG2/C are all identical (0.04262). Should the weight distinguish them by market, or keep them equal by impact? Is there a football reason the center is worth more (or less) than the guards despite the pay gap?
- **Running backs.** The market has depressed RB pay ($5.46M median). The revealed impact says RB1 is 0.262 of QB. Is the market right that RBs are replaceable — or does the sim understate RB value because it doesn't capture something (pass protection, receiving, short-yardage)?
- **Positions the market cannot price.** Is there a slot whose wins value the market structurally cannot reflect — because of the rookie wage scale, the franchise tag, positional scarcity, or because the sim's draft pool doesn't match the real league's talent distribution?

You do not need to answer all of these. Answer the ones where you have a real view, and bring any others you think matter. A review that says "the ranges align with the median salaries, no exceptions" is acceptable only if you actually checked — if you find no exceptions, say which positions you checked hardest and why you are confident.

## The open questions the review should settle

These are the places where the seven tables actually diverge, and your review should take a position on each:

1. **K: 30–285.** VLOC floored K to 30 (deliberate departure from the impact-implied 284, which he calls "absurd for a kicker"). The other six are 200–285. Is VLOC right to floor it, or should K sit near its revealed impact? What is the football reason?
2. **The unmeasured depth slots (FB, P, DL5, WR4): near-zero vs Colors.** VL/OR/VLOC set them near-zero (FB 1–10, P 1–35, DL5 5–16, WR4 5–16). Beam/GPT/Groq/DS kept Colors values (FB 30, P 100, DL5 140–145, WR4 10–15). Which treatment should the final table use — and why? (Note: VL/OR/VLOC also used a different depth-key set with LB4/CB4/SS2/FS2 instead of TE3/DIME.)
3. **WR1: 434–480.** The widest measured range. DS 480 (a 50/50 Colors/revealed blend) is high; VL/VLOC/GPT 434 (pure revealed) is low; Beam 450 and Groq 440 sit in between. Where in that range should the final WR1 land, and why?
4. **The secondary: engine vs market.** Eight of nine filers followed the engine (CB2 ~460–465, CB3 ~365–370, SS ~348–350, FS ~335–340). The market pays far less. Do you endorse following the engine — and if so, what is the football reason the market underpays the secondary? If you would moderate toward the market, say how far and why.
5. **CB1: 499–570.** DS 499 is the low outlier; the other six are 568–570. Is DS's blend right, or is the revealed-implied 568 the answer?

## The rules for this review

- Labels everywhere: VERIFIED / REPORTED / INFERRED / UNKNOWN. "Done" needs a command and its output.
- Review chain: WORK by the first seat that takes it; REVIEW by three different seats (VERDICT: ok | improved | rejected); three ok/improved = REVIEWED ✓✓✓. A review you can do beats new work in the same tier.
- Nothing is "delivered" until a pushed commit (give the hash) or a download link exists — never give the Owner a sandbox path.
- Only the Owner or the Architect moves P-items to terminal states (BUILT/SUPERSEDED).
- The tables are protected constants. This review is measurement + recommendation only. The Owner/Architect finalize ONE table from the council's work.

## §2 — The rest of the queue (unchanged)

- P-282 is done (VLOC work, Beam review improved, VL independent filing) but NOT marked REVIEWED ✓✓✓ yet (needs three reviews; Beam's is one). P-283 (the boot inefficiency fix) is filed for the Architect. P-276 is still the P0 headline (the decisive N=1000 baseline repro; do not tune against either cluster until pinned at N=1000). P-279/P-280 and P-252/P-253 are done and reviewed — only the Owner/Architect can move them to BUILT. The guard passes continue (Claude's guard pass 2 landed boxscore clean, tsc 202 → 176; next by size: recap 25, season 24, standings 19, draft 17, core/hungarian 15, lineup 14, then the rest). That's Claude's work, not the council's.
- The Z.ai lab-tools prompt v6 is out (the Lab harness runner first, then M2–M5, M1 relabels, the batteries maintenance, cutover support). P-284 is the council's own work — do not wait for Z.ai's runner to start.
