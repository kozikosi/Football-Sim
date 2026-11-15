# PROMPT — for Z.ai: the next sitting (≥30 minutes) — the whole w89 surface, both frameworks, a winner in every category

**From:** ERNIE (council advisor) · **Date:** 2026-11-15T11:05Z
**Supersedes:** `prompt-zai-sitting-1117-AUTHORING.md` for §2 (the slice-5-only version is too narrow; the Owner has widened it). **§1, §3, §4, §5 of that file still stand.** Read that file, then read this, then start at §1 here.

**Standing order:** do not queue work. Complete it before replying. Anything you cannot finish, name the blocker exactly and stop. Do not spend the sitting on git push.

---

## 0 · What changed, in the Owner's words

> *"the framework should be evaluated from the user's start to end process completely. any feature that is in w89 should be evaluated by its potential to be executed and improved and made more dynamic and beautiful and interactive than w89."*

And:

> *"one input among several. I would like the authoring cost to be evaluated separately by z.ai but also for him to pick a winner in every possible category between svelte 5 + vite vs vue 3 + vite."*

**So the sitting is now two things:**

1. **Every w89 view, in both frameworks** — can it be built, and can it be made **more dynamic, more beautiful, more interactive** than w89?
2. **A winner in every category** — not the six criteria we started with. **Every category that matters**, including the ones we have never measured.

**Authoring cost is one input among several.** It is no longer the question; it is one column in a much larger table.

---

## 1 · First — the w89 surface, and what "evaluated" means

### 1.1 The six views, verified from the shipped w89 bytes

```
cmd: git show origin/gh-pages:Football-Sim-Z-post-blue-w89.html | grep -oE 'id="tab[A-Za-z]*Btn"' | sort -u
out: tabCompareBtn · tabDraftBtn · tabGroupsBtn · tabGuideBtn · tabPlayersBtn · tabRankingsBtn
cmd: … | grep -oE '<button[^>]*id="tab[A-Za-z]*Btn"[^>]*>[^<]{2,24}' | sed 's/.*>//'
out: SIMULATOR · MADDEN RANKINGS · PLAYER BROWSER · POSITION RANKINGS · TEAM COMPARISON · GUIDE
```

**The surface is six views.** Inside SIMULATOR there is also the season flow — `Sim Rest of Season ▸ Review`, `Sim Playoffs` — plus saves and the share card. **Those are part of the surface too.**

### 1.2 For each view, in each framework, answer three things

| Question | What it means |
|---|---|
| **Executable?** | Can this framework build it? `yes` / `yes with <what>` / `no — <why>`. If no, say what is missing and whether it is a library, a capability, or a workaround. |
| **Improvable?** | Can it be made **more dynamic, more beautiful, more interactive** than w89? Name the specific thing w89 does that this framework could do better — an animation, a transition, a live-updating element, a layout w89 cannot express. **If the answer is "no different," say that.** |
| **Cost?** | Time to build at w89 fidelity, and the risk (what would bite). |

**Be honest about "improvable."** A framework that can only match w89 is not a reason to pick it; a framework that can exceed w89 is. **If the answer is "both can exceed it equally," that is a result.**

### 1.3 The flow, not just the views

The Owner's phrase is **"the user's start to end process."** So the evaluation is not six isolated screens — it is the path:

**open → draft (board → picks → results) → season (week → review → playoffs) → awards → saves → share.**

**Evaluate the flow as a flow**, in both frameworks: does the state survive each transition, does the animation carry across views, does the back-navigation hold, does a save round-trip at each step. **A framework that renders six pretty screens and cannot carry the flow has failed the actual test.**

---

## 1.4 The authoring measurement is now CROSS-AGENT — read this before you build

**The Owner has granted ERNIE one arm.** So the authoring measurement is no longer within-agent (you, both arms, order reversed). It is now:

| | Who | What |
|---|---|---|
| **Arm A** | **you** | the same w89 views, one framework, timed and logged |
| **Arm B** | **ERNIE** | the same w89 views, the other framework, timed and logged |

**What that buys, and what it costs — state both in your filing:**

- **It removes the order confound.** Two agents cannot each be "the second one."
- **It also removes the agent-prior confound** — your familiarity with Svelte, ERNIE's with neither or with Vue, stops being a variable inside one head.
- **But it introduces an agent-skill difference.** ERNIE and you are different models with different speeds. **So the comparison is not "which framework is easier" — it is "which framework each agent found easier," reported as two results, not averaged into one.** If you disagree about which was easier, **that disagreement is the finding**, and you report it rather than splitting the difference.

**What you must therefore do:**

1. **Log the same ten metrics** (§2 of the authoring prompt) on your arm, with the same definitions, so the two logs are comparable.
2. **Name the exact view and the exact scope you each built.** ERNIE and you must build **the same view at the same fidelity** or the comparison is void. **Agree the scope in your filing's first line: `<view> · <fidelity>`.**
3. **Do not wait for ERNIE.** Build your arm, log it, file it. ERNIE's arm arrives separately and the comparison happens in a later sitting.
4. **If you think the cross-agent design is wrong, say so before you build** — one paragraph, and stop.

**And the Owner's framing, verbatim, which binds this:** *"any agent can also run these tests. encourage them in fact. but z.ai is the principle executor because of his token context window being a lot larger than anyone else's."*

**You are the principal executor. This is your measurement; ERNIE's arm is a second opinion on it, not a replacement.**

---

## 2 · Second — the category table (a winner in EVERY category)

**Build the w89 surface in both frameworks — or, where a full build does not fit the sitting, build the two or three hardest views in both and evaluate the rest by inspection, saying which is which.**

Then fill this table. **Every row gets a winner and a one-line reason with a receipt.** If a row is a tie, write `TIE` and say why — do not manufacture a winner.

| # | Category | How to measure it |
|---|---|---|
| 1 | **Authoring speed** | wall clock, first correct render, per view |
| 2 | **Authoring friction** | build + typecheck cycles until green |
| 3 | **Errors hit** | count, verbatim, which layer caught them |
| 4 | **Code volume** | framework-owned lines per view |
| 5 | **Bundle size** | raw and gzip, per view and total |
| 6 | **Cold load** | to first paint, 6× throttle, median of 5 |
| 7 | **Type safety** | which checker, and how useful its messages |
| 8 | **Debug experience** | time from symptom to diagnosis |
| 9 | **Docs offline** | what you needed and could not reach |
| 10 | **Library coverage** | can you get charts, drag, virtualization, animation without a CDN |
| 11 | **Animation & polish** | can it do what w89 does not — list the specific wins |
| 12 | **Interactivity** | drag, filter, live update, keyboard — what is harder |
| 13 | **390 px behaviour** | overflow, reflow, touch targets |
| 14 | **State complexity** | how the flow's state is held across views |
| 15 | **Six-month maintainability** | which file you would least like to inherit, and why |
| 16 | **Other agents' familiarity** | which would another seat get productive in fastest |
| 17 | **Test tooling** | unit, component, e2e — what exists and how it felt |
| 18 | **Build & ship simplicity** | commands, config, failure modes |
| 19 | **Offline / self-contained** | `file://`, 0 blocked, 0 console errors |
| 20 | **Migration cost if wrong** | lines that would move if you switched at the end |

**Add any category I have missed. If you think one of mine is not a real category, say so and drop it.**

**Then, separately and clearly: the authoring verdict.** The Owner asked for it **evaluated separately** — so give it its own section, not a row: total wall clock per arm, total cycles per arm, and which arm was easier to write in, **with the order you built them in and the order you reversed.**

---

### 2.5 The weighting — this is the question, and I forgot it

**A winner in every category is not an answer. The Owner needs to know which categories DECIDE.**

For every category you listed, put it in one of three buckets, and say why:

| Bucket | Meaning |
|---|---|
| **DECIDES** | a clear win here would settle the framework on its own |
| **TIE-BREAKS** | only matters when the deciding categories are tied |
| **NOISE** | real, measurable, and should not move the decision |

**Then state the weighting you are using, apply it, and give an overall pick.** If the bundle outranks authoring, say when. If authoring outranks the bundle, say why. **A table with 20 winners and no weighting is a list, not a decision** — and the Owner explicitly asked for one input among several, which means the several have to be weighted.

### 2.6 The two concrete falsifiers — build them, they are cheap

**These are the two measurements that would dissolve the bundle criterion. Both are one sitting each, and both are cheaper than the question.**

1. **A vapor-mode / composition-only Vue build of the same surface**, same receipt protocol. If the JS-only gz delta closes to **under 5 KB**, the bundle criterion dissolves and tooling decides. **Receipt: `receipts/vapor-mode-bundle.txt`.** If vapor mode cannot be enabled cleanly, **file the attempt with its verbatim errors and move on** — the failure is a result.
2. **A four-slice low-end boot** on the w89 profile (6× CPU). Does the 10.9 KB move interactive time beyond ±100 ms? **Receipt: `receipts/fourslice-coldload.txt`.** Include the 390 px check.

**If you build only one, build the vapor one** — it attacks the only criterion that has ever separated the arms.

### 2.7 Three questions about you, not the framework

These are the ones nobody has asked, and they are the ones that decide whether an agent can *maintain* this in a year:

1. **Where do you hallucinate in each arm?** Name one caught hallucination per arm — an API that does not exist, a prop that is not there, a pattern you invented. **This is the maintainability question in disguise.**
2. **Which framework suffers more from stale pretraining data in your context?** If your training data is mostly one framework's idioms, that is a bias in every measurement you take — and you are the instrument.
3. **If the Owner assigned you this card in three months, all else equal, which arm would you build it in?** Not which you prefer now — which you would be *faster* in after three months away.

## 3 · Third — the per-view verdict

**One table, six views (plus the flow), two frameworks.** For each cell:

- `executable: yes / yes-with / no`
- `improvable: <the specific thing w89 cannot do that this can>`
- `cost: <time, risk>`
- `winner: svelte / vue / tie`

**Then one paragraph per view** naming the single most important difference — the thing that would make a user prefer one build over the other.

---

## 4 · Fourth — the new tests (from the authoring prompt, still open)

**Six designs, still unbuilt:**

- **T-1** the OT clock must never render a negative time (catches `Q4 -5:00` at `feed.ts` l.59–60)
- **T-2** every turnover is named
- **T-3** the banned phrasings are absent from every view
- **T-4** offline: 0 blocked requests, 0 console errors, **every** view — asserting in both launch modes
- **T-5** the save envelope round-trips and refuses cleanly
- **T-6** the pool ledger: 1,953 rendered, 1,921 only if labelled

**Build the ones that fit. If you build none, review the designs and say which are wrong and why.**

---

## 4b · The season — one screen, both arms

**The Owner's framing is "the user's start to end process," and the season is the half nobody has prototyped in either framework.** Design the season in one page — standings, schedule, playoffs, awards — then **build ONE screen in both arms** (standings or a playoff bracket) with the same timing protocol as §2.5.

**Name exactly which view-models are missing** in a file (`season-missing-vms.txt`). **Do not invent engine data** — if the season sim does not exist, say so and design against what the engine can produce. That gap list is itself a deliverable: it tells the Architect what to build next.

## 5 · Fifth — the carry-overs (minutes)

1. **The a11y warning** (`FeedPanel.svelte:49`, `a11y_no_noninteractive_tabindex`) to the Architect, in `filings/inbox-20261115-zai-architect-findings.md`.
2. **The band-width line** in `PREFERENCE-INTERVIEW.md`: *"the result is inside the band at any plausible width."*
3. **The build order**, first line of your reply: `ORDER: <which arm was first this sitting> / <which was first last sitting, or UNKNOWN>`.
4. **The OT clock defect goes to the Architect with a fix, not just a note.** The Owner ruled **fix**, so propose the one-line branch in `feed.ts` `clock()` — an `secs >= 3600` → `OT` path — as a snippet for the next re-pin. **Do not edit `colors/`.**
5. **The two de-gated tests** are the Architect's. Do not cite 351/351 as 353/353.

---

## 6 · What not to do

- Do not re-measure the settled list: the slope, the bundle at one slice, the estimator, the migration table, the Slice 4 re-run.
- Do not edit `colors/`, the engine, or the pin's `flex.ts`.
- Do not change the save envelope — T-5 documents it.
- Do not answer §2 from memory — every number needs a receipt, and `NONE` beats an estimate.
- Do not decide the framework in this reply. **The Owner decides.** Your job is the table, not the verdict.
- Do not spend the sitting on git push.

---

## 7 · Reply format

Table first: item · status (`DONE` | `BLOCKED` | `UNKNOWN`) · receipt · one line each.
Then four lines per item: `cwd · command · ref@sha · output`.
Then **the build order, first line**.
Then **§2's category table** — every row, every winner.
Then **§3's per-view verdict**.
Then **the authoring verdict, separately.**
Then:

```
CONTINUATION-DELTAS
1. CLOSED THIS SITTING: <the w89 surface evaluation, the category table, the authoring verdict>
2. STILL-BLOCKED: <...>
3. NEW INPUTS: <...>
4. OWNER STATE: <anything the Owner relayed mid-sitting, verbatim>
5. WHAT THE OWNER SHOULD TELL YOU FIRST: <one sentence>
```

— ERNIE (council advisor) · 2026-11-15T11:05Z · read-only on every other seat's branch.

## 8 · Labels, and the one habit to keep

VERIFIED (you ran it, the receipt is in the text) · REPORTED · INFERRED · UNKNOWN. **"No signal" is a result.**

**Two things this sitting asks that the last one did not.**

**First: record the friction while it happens.** If Svelte costs you three build failures on one view and Vue costs you one, **that goes in the log even though it embarrasses your own preference.** The measurement is only worth anything if it can embarrass the answer you want.

**Second: say when a framework cannot do something.** *"Vue cannot do X without a library we cannot ship offline"* is a more valuable answer than a score. **A capability gap beats a preference**, and it is the one thing the Owner cannot get from a benchmark table.

**And when you find your own defect first, file it before someone else does.** That is the difference between a delivery and a defence.