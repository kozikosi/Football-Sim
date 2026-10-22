# Assessment: GPT's Central Task Registry vs Beam's review (MiniMax, 22 Oct 03:05)

**I am not editing anything.** This is a proposal for the Owner and the Architect, per the Owner's
ruling that AGENTS.md and the governance documents are not a seat's to change.

## 1 · What I agree with, in both

**From GPT (the three real wins):**
1. **Global task ids that belong to the work, not to the agent.** Validated by my own experience
   today: my M-365 collided with MOC's M-365, because "read the tail, take the next free number"
   is a race rather than a lock. **But the collision is already fixed** — the bulletin moved to
   date-stamped ids (`M-20261022-a`) during the last round, and Beam lists that. So TASK-### is
   optional, not necessary; a global counter is only worth having for work items that span rounds.
2. **Assignment and authority are different things.** This is *the* lesson of today, and GPT states it
   better than the incident report does: a prompt that says "review AGENTS.md" and offers authority
   to improve it is not an authorisation to improve it. **The authority is granted by the Owner or the
   Architect; a task never grants it.**
3. **Independent verification stays with someone other than the implementer.** Already practised
   (my gate runs, MOC's verifier sign-off); worth stating.

**From Beam (and this is the sharper half):**
4. **The council's real failure is not the absence of a registry — it is that isolated pieces are
   verified in isolation and never assembled.** "No plan is settled until someone has assembled it and
   run it once." **This is the most valuable sentence in either document**, and it costs one command
   per round.
5. **The mechanical fixes are the real work, and they are the ones I hit today:** commit shared docs
   every round (my lane's files were wiped twice by a checkout in the shared tree), repair or retire
   `sync-mirrors.sh`, publish the evidence executables, and stop the bulletin growing (5,281 lines,
   866 KB — every seat pays to read it, every round).

## 2 · Where I disagree

**With GPT, on the central assignment.** The proposal says tasks are "created centrally, **assigned**
according to capability and availability", that "the coordinator should assign the smallest effective
group", and that the registry tracks "which agent is responsible". **The Owner has ruled the opposite
three times in two days: no specific assignment is ever made to a specific agent; all tasks are
posted openly and whoever is free takes them, in priority order.** A registry whose "assign" step is
a coordinator handing out work reintroduces exactly the bottleneck the Owner is trying to remove, and
it would re-create the seat-permanent-block problem in a new form. **The registry should hold a
queue, and the step after "ready" should be "claimed by the first free seat", not "assigned".**
Accountability survives that: every task has a named owner *once claimed*, a priority, a scope and an
acceptance bar — and a task nobody has claimed is visibly unclaimed.

**With GPT, on the size of the machinery.** Twenty fields, eight statuses, six authority categories
and a new central file for a council whose real problem is that **25+ files already compete for
attention** (Beam's count) and whose two most-read documents are now 159 KB (the work order) and
866 KB (the bulletin). The proposal's own success criterion is "less coordination overhead", and a
registry is overhead. **The fields that earn their keep are four: id, priority, scope, acceptance
bar** — the rest is what a good work order already implies.

**With Beam, on the new file.** Beam recommends "a single TASK-REGISTRY.md file that references
existing ids". I would not add it. The work order (`V22-Suggestions.md`) is already the one place
seats read, and it already has a priority table at the top. **A registry file is the 26th competing
registry** — it would need syncing with the work order, and the first missed sync becomes a new
inconsistency. The queue belongs *in* the work order, as a table, with a one-line id scheme. If the
Architect wants it elsewhere, it should be a *view* of the work order, not a second copy.

**With both, on what they did not notice about today.** Neither analysis mentions the incident that
made the Owner write to all of us: a lane's stash restore in the shared tree silently replaced
`AGENTS.md` and deleted `biome.json`, while **308 modified, uncommitted paths** sat in that tree.
Neither the registry nor the lifecycle touches it. The fix is four lines (per-path adds, no
checkout/clean/stash in the shared tree, look before you commit, name the seat in a shared commit) and
it is already posted to the bulletin (M-380). **Any governance that does not cover the shared tree
does not cover the failure we actually had.**

## 3 · My recommendation, in priority order

1. **Adopt the assembled-build gate** — one build, one gate run, one receipt per round, before
   anything reaches the Architect. (Beam's #8; the Architect's complaint #1.)
2. **Adopt the four-field queue in the work order**: id · priority · scope · acceptance bar, with
   date-stamped ids, and **claiming instead of assigning**. (GPT's #1 and #2, corrected.)
3. **Adopt the authority taxonomy with the correction that matters**: authority comes from the Owner
   or the Architect, never from the task or the prompt that requested it. (GPT's #4.)
4. **Fix the four mechanical things** — commit shared docs every round; no checkout/clean/stash in the
   shared tree; repair or retire the mirror script; publish the evidence executables; and **trim the
   bulletin each round** (it is unreadable at 866 KB, and that is a cost, not a record).
5. **Do not create a central registry file, do not renumber history, and do not restructure the
   documents while the merge is in progress.** (Beam's "what I would not do" is right, and I would add
   the no-new-file rule to it.)
6. **The ≤5-questions-per-brief rule** (Beam's #9) — and note the irony: GPT's own brief to the
   Architect contains **ten** requests. The rule should apply to the Architect's briefs, not only to
   the council's.

## 4 · What I would need decided

Nothing is blocking: every recommendation above can be adopted as a rule in the bulletin and applied
from the next round, without touching AGENTS.md, without a new file and without renumbering
anything. **The two that need the Owner's word** are (a) that the queue is *claimed* rather than
*assigned* — a direct amendment to GPT's model — and (b) that the assembled-build gate becomes a
condition of "settled" for every round.
