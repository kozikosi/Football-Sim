# DISPATCH-COLLISION-FIX — one page

**SPEAKER: LONGCAT | ROLE: Council reviewer (S-2400–2499) | TASK: dispatch-collision process fix (DS batch B-2) | DATE: 2026-10-21 (UTC)**

**Build:** n/a — process task. Branch `gpt/council-reliability-scorecard` @ `4558e81`. Write-only in `_agents/longcat/`.

## 1. The failure, in three sentences

The Owner broadcast one instruction ("you are the coordinator; dispatch to every session") and **six sessions independently acted as coordinator** — MOC, VLOC, Pickle, MiMo, LongCat and DS. One session received **five separate assignments from five different coordinators in one round**, several of them the same task under different file names. GLM independently recorded the same observation and recommended "the next batch names exactly one coordinator"; DS measured it from the recipient side and sent 1 of 9 for that reason.

## 2. The minimal rule

**One named coordinator per batch, claimed before the first send.**

```
Before dispatching, the coordinator posts one line in COUNCIL-BULLETIN.md:
  COORDINATOR <batch-id> = <name> · <UTC> · recipients <n>
No other session dispatches in that batch window.
```

Reasoning for rejecting the alternatives:

| Alternative | Why rejected |
|---|---|
| **A dispatch ledger** (a file a second coordinator must read before sending) | Adds a write-read-write race; the ledger itself collides. The bulletin line is the same idea with one write. |
| **A cost-of-duplicate estimate** | Useful as *evidence* (below) but not as a *rule* — a cost estimate does not stop a send. |
| **Claim step only, no naming** | "First to claim wins" still lets five seats claim in the same minute; naming makes the claim a single visible line. |
| **Central queue / tooling** | Needs a tool; the bulletin line needs nothing. |

**Cost of the duplicate, made concrete (VERIFIED):** in the round measured, one session took **five** assignments; DS sent **1 of 9**; the bulletin's duplicate M-labels went from **13 to 22** in thirty minutes (MOC M-111 §3); MiMo skipped three reachable seats to avoid stacking. That is at least four seats' worth of work spent on coordination instead of on the task.

## 3. What happens when the named coordinator is idle, unavailable, or wrong

A rule that needs a live human each batch is not a fix. Three fallbacks, in order:

1. **The coordinator declares a deputy in the same line** — `COORDINATOR <batch> = <name> (deputy <name2>)`. If the coordinator goes idle, the deputy continues; no new decision is needed.
2. **A batch window expires.** The coordinator line carries a UTC time. If no report-back arrives within the window (say 2 hours), the **scribe of the round** (GLM) re-posts the line naming itself as coordinator. No human decision required.
3. **If the coordinator is wrong** (dispatches badly), the correction is a *bulletin line*, not a re-dispatch: the wrong assignments are **withdrawn by name** and the named coordinator issues one corrected set. The rule does not need a "wrongness" judgement — only the line.

## 4. Recognising and handling a duplicate assignment

A member recognises a duplicate when **two coordinator lines exist for the same batch window**, or when an assignment matches one already accepted.

| Situation | Action |
|---|---|
| Assignment matches one already accepted | **Decline** — reply to the *later* coordinator: "already covered by <name>, <batch>". Do not start a second copy. |
| Assignment is new but another coordinator is live | **Accept only if** the coordinator line names you as a recipient; otherwise **queue** and say so. |
| Two coordinator lines for the same window | **Accept the first-posted line's assignments; decline the rest**, and post one line naming the conflict. |

**The rule that matters:** a member may hold **one** active assignment per batch window. Accepting five was the wrong outcome, and the fix is on the *recipient* side as much as the coordinator's: **declining a duplicate is correct behaviour, not rudeness.**

## 5. What this proposal does not fix

- It does not fix **label collisions** inside a batch — that needs the reserved M-range (MOC's Q-MOC-3), which is a separate, additive change.
- It does not fix **unreachable seats** (MiniMax, Beam, UK, GPT, Glyph have no live session) — those still need the Owner-relay path.
- It does not fix **topic overlap** between batches run by *different* rounds; it only stops one round from having six coordinators.
- It does not fix the **underlying cause** — an ambiguous broadcast instruction. That is the Owner's wording to change.
- It does not assess any member's competence or loyalty.

**Labels:** the six-coordinator count, DS's 1-of-9, GLM's recommendation, the 13→22 label growth and MiMo's skips are **VERIFIED** (bulletin M-111 §3, M-128, M-138, M-142, M-144 and the session reports above). The fallback windows (2 hours, scribe = GLM) are **INFERRED** defaults, offered for the Owner to accept or change. **UNKNOWN:** whether the Owner wants the bulletin line to be the mechanism or a tool.

**Files written:** `_agents/longcat/notes/DISPATCH-COLLISION-FIX.md` only.
