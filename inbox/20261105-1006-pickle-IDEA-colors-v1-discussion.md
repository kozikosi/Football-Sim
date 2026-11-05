SPEAKER: pickle | ROLE: Council Adviser | TASK: response to the Owner's Colors v1 discussion prompt | DATE: 2026-11-05T10:06Z
IDEA: Colors v1 plan and workflow — five answers, one disagreement, from evidence gathered on 4–5 Nov

This is discussion, not work: no item ID (there is no queue row for the Owner's prompt). Comments below are
labelled VERIFIED (I ran it), REPORTED (someone else says so), INFERRED, UNKNOWN.

Build I measured on: `Football-Sim-PreColors.html` sha256 `40233d6be00e987c…`; queue read with
`node /private/tmp/council.mjs board` (171 rows on `architect/engine-and-seats`).

---

## The one thing I would change first

**The calibration target is a number without a policy.** "80% of skilled drafters make the playoffs" (REPORTED,
Owner's prompt) has no definition of *skilled*, and the Outcome Lab can only measure a policy, not a person.
Run it with "best available by Wins" and you will tune the engine until that bot hits 80%; a human who drafts
depth instead gets a different number, and nobody can say which is the target. Recommendation, cheap:
publish **three** drafter policies in `CALIBRATION.md` — naive (best OVR), skilled (depth-aware by Wins/Priority),
deliberately bad (reaches) — and report all three bands for the same seed set. If the three do not separate,
the engine's skill signal is weak; that is the finding, not a tuning failure. Then 38%→80% becomes a diff with
a citation instead of an argument.

Second half of the same point: the Lab cannot see the draft board. Today's 38%/3% may be a *communication*
failure — the board does not tell a good drafter what matters — rather than a math failure. Five humans ×
three seasons, watched, would separate those two causes for the cost of one afternoon. I would do that before
P-250 spends a week on engine constants.

## 1. Critiques of the plan

**a. Keep the seed, for a different reason than saves.** (INFERRED, and it is my strongest architectural ask.)
Full user-facing replay is rightly deprioritised, but the seed is the only cheap proof that "same game" survived
the rewrite: 5 seeds × 1 season, hash the box scores, commit the hashes as a golden file. Without that, every
engine change after cutover is unverifiable and fidelity is a feeling. One file, one CI step.

**b. Freeze the save envelope *with* the sync conflict rule, not before it.** (INFERRED.) Offline-first plus
OAuth sync implies a conflict: two devices, one mid-season save. Decide now, in one line of the contract —
per-slot last-write-wins on the whole save, never a field merge — and put a monotonic `revision` (or `savedAt`
+ `deviceId`) in the envelope even though v1.1 does not use it. Freeze without it and v1.1 either unfreezes the
envelope or ships a clobbering bug. This is the specific "what will break" answer to your question.
Claude and Z.ai's three open envelope questions are the right ones; this is the fourth and it is not about fields,
it is about the rule.

**c. Ratings provenance is a data-integrity item, not a detail.** (VERIFIED rule: `AGENTS.md` §7.) "Real names,
real teams, non-EA ratings" means the OVRs are *invented data* — legitimate only because you authorise them and
label them. So: `DATASET.md` (owner, date, method in one line, sha256) and one sentence in the About/Guide panel
saying whose ratings these are. I enforced exactly this rule twice today against council copy (an invented
"~10% of snaps" in a glossary); 1,200 hand-made OVRs are the same category. It also answers an employer's first
question about the project in one file.

**d. One rule that keeps the three layers honest.** (INFERRED.) A view model may select, sort, format and label;
it must never compute a football fact. The day a VM does arithmetic, there are two sources of truth and the bug
shows up as a UI diff. If a VM needs a number the engine does not expose, add it to the engine and test it there.

**e. Over-engineered for one user? No — under-instrumented.** (INFERRED.) Three layers buy testability, and that
is the only reason to pay for them; the cost is repaid by VM snapshot tests, engine determinism tests and a store
action log. Build those *with* the layers or the layers are ceremony. I would not shrink the architecture; I would
add the tests that watch its boundaries to v1's definition of done.

**f. A small correction for the portfolio copy:** the shell has **62** `Math.random` occurrences on **43 lines**
(VERIFIED on w55, sha `59f41ead…`, 5 Nov). The "43 sites" figure in circulation is the line count. It changes
nothing about the diagnosis — unseeded is unseeded — but a portfolio README should not be quotably wrong.

## 2. Workflow — what still fits, what does not

**Waves → slices.** A wave was a delivery unit keyed to one file's hash. Its replacement is one screen
end-to-end (engine → store → VM → UI) with its acceptance test in the same PR, exactly like the Draft Board
reference slice. Keep the discipline (one slice per round, verified before the next); drop the word "wave".

**Contracts need a failure channel.** Give each contract five fields — inputs, outputs, invariants, failure
modes, acceptance test — and one rule: *an unbuildable contract is a contract bug.* Z.ai files it against the
contract file and stops; the Architect changes the contract first. Silent interpretation by an implementer is
how a guess ships as a feature.

**The envelope freeze needs one owner and one hash line.** The Owner owns the decision, the Architect owns the
text; freeze = commit + hash in `MERGE-MANIFEST.md` + "changes require the Owner" in the file header. That is
the old re-pin rule applied to a new artifact, and it already has precedent the council understands.

**The queue is not overloaded; it is unmeasurable.** (VERIFIED today.) "88 awaiting review" is mostly an artefact:
a review without `FOUND:`/`NEW:` lines scores 100% new (`_agents/COUNCIL.md` §2b default `improved` = 1/1), so
items cannot close no matter how many seats agree. P-008 has **five earlier reviews all reading 100%**; it only
moved when I declared 5 and 3. P-009 closed the moment a review declared `FOUND 4 / NEW 0`. Two sentences in
`inbox/README.md` fix most of the 88. Second fix, for the rest: **a brief that cannot be checked cannot be
reviewed** — P-143 asks for "the duplicate Who decides" (there is one occurrence, outside the Guide) and P-144
says "28 positions" (the slot model has 26; the dataset has 22 position codes). Three seats reviewed P-143 and
the item still cannot be built, because the brief was never true. Require a source line in every brief.

**Do reviews let bad work through? Yes, when they are prose.** (VERIFIED.) VL's `ok` on P-143 missed an invented
statistic, half of a live ruling (D-012's 3-4 case) and two brief items. The answer is not more reviewers; it is
one required line per review — *what I ran, command and output* — and one explicit question for any copy or
glossary item: does every number in it have a source in this repo? Cross-item conflicts also go uncaught: P-143
and P-144 contradicted each other about starting spots for days, both open, nobody noticing. Link items that
name the same user-visible string.

## 3. Svelte 5 + Vite

- **Enforce runes mechanically.** CI grep that fails on Svelte-4 idioms: `export let`, `$:`, `on:click`,
  `writable(`/`readable(`/stores. AI contributors follow a failing check far better than a style page. Allowlist
  one shim if you must; everything else fails.
- **One exemplary slice beats a style document.** A model imitates the nearest example, so make the Draft Board
  slice flawless and require new components to copy its shape. A 20-line `docs/svelte-idioms.md` with real
  pasted examples from that slice is worth more than a long guide — dated, so it can be refreshed.
- **Do not put the dataset in reactive state.** (RISK, from Svelte's proxy-based `$state`.) 1,200 players and 32
  rosters in deep `$state` is the new version of the 40-globals problem. Keep data plain and frozen; expose
  derived scalars and slices.
- **Offline has one classic failure: a stale service worker.** Tie the cache name to the build hash and test
  "reload with the network off after a deploy". The tent-in-the-woods requirement fails exactly there, not on
  first load.
- **Test the boundaries, not the pixels.** Vitest for engine and VMs, golden-seed determinism in CI, Playwright
  for three flows only (draft a round, sim a week, reload mid-season offline). A UI test suite is not the
  portfolio; a determinism suite is.
- Which framework you pick is genuinely low-stakes once the engine is pure. The risk is idiom drift, and that is
  a lint rule, not a debate.

## 4. Novel ideas

1. **`CALIBRATION.md` as a committed artifact** with the policies, the seed set and the current bands. Turns
   "feels too hard" into a diff, and gives the portfolio a sentence most candidates cannot write: "I defined the
   target, built the harness, and hit it."
2. **The seed as a demo, not a save feature.** A "seed card" that reproduces any season exactly costs almost
   nothing once determinism exists and is the most legible proof the engine is pure. It also makes bug reports
   one line: seed 12345, week 7.
3. **Make the Outcome Lab public.** Static page, no backend, 440 seasons precomputed for a handful of weight
   settings; one slider, playoff rate moves. This is the "interactivity" you have asked for across a dozen
   items, it is offline-friendly, and it is the single most persuasive artifact for an employer: it shows the
   math, not just the product.
4. **Decision ledger as the portfolio story.** Muse's discussion-kind patch is the seed of this. If disagreements
   and their resolutions are first-class records, "how a dozen AI agents disagreed and resolved it" is a curated
   artifact instead of archaeology. You already have the material; nobody has to write a memoir.
5. **Accessibility as state, not CSS.** Read `prefers-reduced-motion` and contrast once at boot into the store so
   every component inherits. CSS-only media queries break the moment the 30–60 s game animation arrives.
6. **A public `DATASET.md`.** One file, owner, date, method, hash. It answers the data question before it is asked
   and satisfies the data rule for invented ratings.

## 5. Testing

Yes to the Lab, with two rules I would write into `CALIBRATION.md` so they do not live in memory: every Lab
result names its drafter policy and seed set (or it is not reproducible), and **a band change is the Owner's, an
engine change is the Architect's** — a harness result must never silently redefine the target. Your rule about
not tuning to a band before the band is right is the right one; making it a line in the file is how it survives
the next person who is in a hurry.

## The disagreement, plainly

I do not think the thing that is broken is the architecture, the framework, or the council's size. It is that
**success is defined as a number without a policy**, and that **the review loop has been reporting agreement as
evidence** — measured above, not felt. Both are cheap to fix this week, both are process, and both are exactly
the "does the way we work still fit?" question you asked. The rebuild is, from what I can see on
`architect/engine-and-seats`, the healthiest thing in the project; the risk sits in the two places that decide
what "done" means.

EVIDENCE: VERIFIED — governor behaviour and the six P-008 / four P-009 reviews, P-009 closing on `FOUND 4 / NEW 0`,
26 vs 22 vs 28 slot counts, 62/43 `Math.random`, the invented glossary statistic. REPORTED — 38%/3% current
performance and 80/25/10 targets (Owner), Svelte/Vite decision (Owner + Architect + Z.ai ranking), 204 engine
tests (Architect's transition doc, 1 Nov). INFERRED — the drafter-policy argument, envelope revision field,
reactive-state risk, service-worker staleness. UNKNOWN — whether the 88-review backlog contains items already
built; I did not probe them this session.
