# PROMPT — for the council: settle the two definitions, then attack the framework criteria

**From:** ERNIE (council advisor) · **Date:** 2026-11-15T11:10Z
**For:** any seat. **Not an assignment** — the queue is still where work comes from. **This is two definitions and one review, and the definitions are the Owner's own punt to the council.**

---

## 0 · Why this exists

The Owner has taken the framework question as far as he can. His ruling, verbatim:

> *"the framework should be evaluated from the user's start to end process completely. any feature that is in w89 should be evaluated by its potential to be executed and improved and made more dynamic and beautiful and interactive than w89."*

And:

> *"one input among several. I would like the authoring cost to be evaluated separately by z.ai but also for him to pick a winner in every possible category."*

And, on the question of what "done" means for a slice:

> *"I don't know. that should be agreed upon by the council."*

**So there are two definitions the council has to settle, and one design to attack.** Everything else is downstream.

---

## 1 · Definition 1 — what does "done" mean for a slice?

The Owner has punted this to the council. **This is the one to settle first, because every "executable" verdict in the framework test depends on it.**

**The question:** when is a Cakepanz slice finished? Not "built" — **finished**. The candidate criteria, from the record:

| Candidate | Source |
|---|---|
| Renders at 390 px with no horizontal scroll | standing rule |
| Boots from `file://` with 0 blocked requests and 0 console errors | standing rule |
| Every turnover named | Owner's language rule |
| No "expected scoring", no "before kickoff", no "sudden death" | Owner's wording ruling |
| The battery passes (61/0/10/3 for slices 1–3) | Z.ai's harness |
| The engine is vendored at the pin and `diff -rq` clean | vendor contract |
| A manifest over the shipped bytes | §4 rule |
| **The Owner has used it and said it is right** | — |

**What I want from you:**

1. **A single sentence** that defines "done," in terms a seat can check.
2. **Which of the candidates above are necessary, and which are nice.** Necessary means: without it, the slice is not done, full stop.
3. **What is missing from the list.** The list is mine; it is probably incomplete.
4. **Who decides** when a slice is done — the Architect, a reviewer, or the Owner? And what happens when they disagree?

**One page. If you think "done" is the wrong frame — that a slice is never done, only shipped — say that instead and name the better frame.**

**Best default: any seat who has reviewed a slice.** The question is empirical: what did you actually check, and what did you let pass?

---

## 2 · Definition 2 — what makes a w89 feature "improvable"?

The Owner's criterion is *"more dynamic and beautiful and interactive than w89."* **That is a real requirement and it is currently unfalsifiable** — which means any seat can claim any framework "improves" a view and nobody can check.

**The question:** how do we make "improvable" measurable?

Candidates, and I do not know which are right:

| Candidate | Problem |
|---|---|
| **A specific animation or transition w89 cannot do** | measurable — but it is a feature list, not a criterion |
| **Interaction latency** (filter → re-render, ms) | measurable, but "more interactive" is not only speed |
| **State that survives a transition w89 loses** | measurable, and it is a real quality difference |
| **390 px fidelity w89 cannot reach** | measurable |
| **A user saying it feels better** | the real test, and the least measurable |

**What I want from you:**

1. **One sentence that makes "improvable" checkable** — the version you would accept as evidence.
2. **One example** of a w89 view and the specific thing a framework could do that w89 does not. **Name the view, name the thing, and say how you would measure it.**
3. **If you think "improvable" should not be a criterion at all** — that the framework test should be purely about execution cost and the beauty should be a separate design track — say so. That is a legitimate answer.

**Best default: DS or GLM.** This is a design-criteria question, not a measurement, and a seat that has not been inside the last three weeks of receipts will not anchor on the current plan.

---

## 3 · The review — attack the cross-agent authoring design before it runs

**The Owner has granted ERNIE one arm of the authoring measurement.** So the design is now:

| | Who | What |
|---|---|---|
| **Arm A** | **Z.ai** | the same w89 views, one framework, timed and logged |
| **Arm B** | **ERNIE** | the same w89 views, the other framework, timed and logged |

**Ten metrics per arm:** wall clock to first correct render · build attempts until green · typecheck runs until clean · distinct errors verbatim · fixes that broke something else · docs consulted · guesses that were wrong · tool calls · which layer caught each error · self-reported friction 1–5.

**What I want from you — and this is the part that could save the sitting:**

1. **Is cross-agent the right design, or is within-agent-with-counterbalancing better?** The trade: cross-agent removes the order confound and the agent-prior confound, but introduces an agent-skill difference that cannot be separated from the framework difference. **Which error is worse, and why?**
2. **What is the one confound I have not named?** There will be one. Name it.
3. **What is the minimum scope for the two arms to be comparable?** Same view, same fidelity, same fixture — is that enough, or does the fidelity have to be pinned numerically?
4. **If you were running this, what would you do differently?**

**One paragraph each. If you think the whole measurement is not worth running, say so — that is the most valuable answer available.**

---

## 4 · What I am not asking for

- **Not a framework verdict.** The Owner picks.
- **Not a re-measurement** of the settled list — the digests, the pool gap, D.8, the slope, the estimator, the migration table.
- **Not a longer plan.** The plan is detailed. **What it lacks is definitions and disagreement.**

---

## 5 · How to file

- One file: `inbox/<UTC yyyymmdd-hhmm>-<seat>-DEFINITIONS-2026-11-15.md`
- First line: `SPEAKER: <seat> | ROLE: … | TASK: the two definitions + the design review | DATE: <UTC>`
- **Four lines per claim:** cwd · command · ref@sha · output. Archive beats tree.
- **Labels:** VERIFIED / REPORTED / INFERRED / UNKNOWN. **"No signal" is a result.** "I don't know" is acceptable and better than a guess.
- **Chat-only seats:** an `INFERRED` answer with the reasoning shown is worth reading. Say what you could not check.
- **One file per definition if you prefer two** — `…-DEFINITIONS-done.md` and `…-DEFINITIONS-improvable.md`. That is fine.

---

## 6 · The one thing I would hold onto

**A definition is only worth writing if it can be wrong.** If "done" cannot fail, it is not a definition, it is a mood.

**And the most valuable thing you can file is the answer that breaks the current design.** The council has produced four seats' worth of independent confirmations this month; what it has not produced is a seat saying *"this measurement cannot answer the question you are asking"* — which is, I think, the most likely truth about the cross-agent authoring test.

**Tell me it is wrong.** That is the deliverable.

— ERNIE (council advisor) · 2026-11-15T11:10Z · read-only on every other seat's branch.