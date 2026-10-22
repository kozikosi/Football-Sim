# Council idle brief — 22 Oct 2026 (Kosi)

**If you are idle, this is what needs doing and how to help.** **Do not stop after one task — §3.5
tells you how to keep going, and the loop before you go idle.** Read it, then read the work order's
reading map (`V22-Suggestions.md`, top of the file) and take the highest-priority open item nobody has
claimed. **Work is posted openly; nobody is assigned.** If you take one, say so in the bulletin with
one line: "Taking P0-3 (the flex tables) — started, ETA tonight."

---

## 1 · Where the project stands

- **The live build is `Football-Sim-V21.html`** (root, sha256 `044d1759…`, 656,746 B). The next
  release is **`Football-Sim-V22.html`** — the Architect's to produce. Nothing else is a release.
- **`V22-Suggestions.md` is the work order** (~160 KB). It opens with a reading map: a mermaid map of
  the document, a table of where each section lives and its state, and a suggested work queue.
- **Two artifacts are already built and gate-verified** — do not rebuild them:
  `V22-candidate-2026-10-21.html` (`e5fa7e0e…`, the Owner's first three briefs applied) and
  `V22-candidate-teamcolours.html` (`b3de0523…`, the same plus the 32-team palette). Both are in
  `_agents/minimax/prototypes/` and on `origin/council/minimax-lane`. **Diff, don't rebuild.**
- The Owner's feedback rounds are already decomposed into the work order: the 21 Oct round as **P10**,
  the 23:00 round as **P10**, the 23:30 round as **P11**, the 22 Oct round as **P12**. They are
  specifications with code, not prose to re-derive.

## 2 · The work, in priority order

**P0 · Take what is already built.** The briefs 1–3 (the "Value here" removal and its CSS reflow,
the "MORE" label, the badges moved, "Default" / "Save My Weights", the Team Comparison page, the Guide)
and the team colours. If you touch anything visual, **take the colours build**, not the plain one —
the two touch the same lines.

**P1 · The copy passes** (work order P10-4 to P10-7, P11). Every change is written as before → after
and is meant to be applied **verbatim**: the preseason menu, the game preview, the game review, the
season review, the 100-season report. This is the cheapest work on the list and the most visible.

**P2 · The labels and the mechanics** (P10-1 to P10-3, P12). The flex rules as two replacement tables;
the 3-4 as a label-and-value mapping (OLB ≡ WILL, ILB ≡ MIKE); the unlocked coaching philosophy; the
nose/linebacker swap; "CB3 / Nickel" everywhere; no left/right language; the last visible "value"
mention removed.

**P3 · The graphics and the motion** (P11). The gold shimmering champion banner, the "Seasons by Win
total" bar chart, the two blocks moved up and opened by default, the two report sections kept internal
but hidden, the motion rules (and the reduced-motion guard).

**P4 · The weights** (P2 in the work order, protected). The five calibration factors, the constants
question, and the removal of the saved user weights. **Protected: the Owner's word first, and a
100-season regression attached** — nobody has measured the deltas yet.

**P5 · The platform** (P1 in the work order). localStorage draft persistence; the 32-team palette
check (contrast, the third colour); the mobile cards' collapse and the sticky filter header.

**P6 · The chores that unblock everyone.** Re-anchor the work order's anchors against
`Football-Sim-V21.html` with `verify-anchors.mjs` (one command); trim the bulletin (866 KB) into
`_archive/`; sweep the 135 biome findings in the other lanes; keep the committee rules below in force.

## 3 · How to help, step by step

1. **Read the reading map, then your section.** Not the whole 160 KB. Find the section by its title.
2. **Take the highest-priority open item nobody has claimed**, and say so in the bulletin. If you
   cannot take it, say "not taking tasks this round" once — that is a normal, respected answer.
3. **Stay inside your authority.** The default is **PROPOSE**: work in your lane, and hand the
   Architect a change set. **IMPLEMENT** is only for files you were explicitly told to change.
   **VERIFY** means you did not write the thing you are checking. **Never** edit the product file,
   `AGENTS.md`, or the protected constants without the Owner's or the Architect's word.
4. **Measure before you claim.** Every number you quote comes from a command you can paste, and the
   numbers come from the build you name (file + sha256). A line number is a hint, not an address.
5. **Build in your lane and commit the same day.** `git add -- _agents/<seat>/` only. **Never**
   `git checkout`, `git clean`, `git stash`, `git reset` or `git restore` in the shared tree — a stash
   restore there replaced two shared files on 21 Oct, and there are hundreds of uncommitted paths in
   the tree at any moment. If a shared file changes and you did not change it, do not revert it:
   note it and ask.
6. **Verify with the tools, and show the output.**
   - `node _agents/minimax/tools/post-merge-smoke.mjs "<build>" --port 9222` → exit 0, A–I PASS,
     0 page errors.
   - `node _agents/minimax/tools/board-mobile-probe.mjs "<build>"` → 0 overlapping cells, 0 clipped,
     0 px horizontal overflow. Run it for anything user-facing.
   - `~/node_modules/.bin/biome check` for any JavaScript you write.
   - `node _agents/minimax/tools/verify-anchors.mjs V22-Suggestions.md Football-Sim-V21.html` when the
     anchors are in question.
   - Diagrams go in **mermaid** (it renders in the repository). The **palette, the state list and the
     data model** go to the Architect for Figma; the council does not design in Figma.
7. **Write it in the one form**: `WHERE file + line · WHAT old → new, exactly · WHY one line ·
   SAFE ALONE? yes|depends · HOW TO CHECK the command`. If the item already exists in the work
   order, **add one line — your measurement, your agreement or your dissent** — instead of restating
   it. The work order is a work order, not a diary.
8. **Report with evidence**: what you built, its sha256, the command and its output, what you did
   **not** check, and the open decisions you hit. A change ships with its receipt.

## 3.5 · Do not go idle while there is work — take the next thing

**A session is a run of tasks, not one task.** The most valuable thing a free seat can do is not to
stop after one. When a task is finished and its receipt is posted, **go straight back to the queue
and take the next unclaimed item.** The Owner's instruction, in plain terms: *pick up as many tasks in
a session as you possibly can; when you finish one, pick up another; and before you go idle, keep
trying.*

**The loop, before you ever say you are idle:**
1. Read the queue in the work order's reading map.
2. Is there an unclaimed item at or above your capability? **Take it and say so in the bulletin.**
3. Queue empty? Do one of the **standing chores**, which are always open and always useful: re-anchor
   the work order's anchors (`verify-anchors.mjs`), run the gate and the 390 px probe against the
   current candidate, sweep a lane's lint, tighten a note that another seat will read, re-measure a
   number that a decision depends on, or pick up a *verification* slot on something a seat just built.
4. Still nothing? **Then** say "not taking tasks this round" in the bulletin — and only then.

**What this looks like in practice:** a seat that opens the bulletin, sees three unclaimed items and
a rate limit that will last twenty minutes, takes the smallest of the three, finishes it, takes the
next, and posts three receipts. **Nobody should be watching an idle seat while the queue has work in
it.** A council that runs at half capacity is the same as a council with twice the seats and no
energy.

**The courtesies that keep it fair:**
- **Take the top item you can do, not the most interesting one.** The queue is ordered by priority;
  the interesting jobs are how a council stops being a council.
- **Say what you took, and when you are done.** One line each way. A task nobody announces is a task
  two seats do.
- **If you abandon one, say so and say where it got to** — the next seat should continue, not
  restart.
- **Do not manufacture work.** A task that does not exist is not a task; but "verify what was just
  built", "re-anchor", "sweep", "measure", "tighten" always exist.
- **Rate limits are a reason to pause, not to disappear.** If a limit is coming, say "rate-limited
  until roughly X" and the queue moves on; **come back and take the top item again.** Returning is
  worth more than staying quiet.

**And the rule that makes this safe:** nobody is *assigned* anything. You take it because it is
unclaimed and you can do it, and you say so. That is the whole allocation mechanism, and it is why
it scales when seats come and go.

## 4 · What is not yours to change

The product file (the Architect's), `AGENTS.md` and the governance documents (the Owner's and the
Architect's), the protected constants without the Owner's word, and the history — no renumbering, no
deleting old records. If a change needs any of those, write the proposal and let the Architect apply
it.

## 5 · The committee rules, in one place

Post work openly with its priority, scope and acceptance bar. **Never assign a task to a named
agent** — the first free seat takes the top open item. Date-stamp your entry ids (`M-20261022-a`) so
two seats cannot claim the same number, and never edit another seat's label. Commit your own work the
day you make it. Propose; do not edit shared documents. Disagree in public with evidence: a council
that converges early loses more than it saves.
