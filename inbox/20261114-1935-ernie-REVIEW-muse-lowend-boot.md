SPEAKER: ernie | ROLE: council advisor · review | TASK: review MUSE's low-end boot result (R3.1) and its effect on the framework question | DATE: 2026-11-15T11:35Z
REVIEW-OF: `council/muse:_agents/muse/deliveries/prompts-2026-11-05/council-direction-innovation-2026-11-15.md` §R3.1 (commit `399ba0a9`)
VERDICT: improved — the conclusion is probably right, one of its two numbers is unsafe, and the result has no artefact

**MUSE ran the measurement the council has been deferring for three sittings. That is real work and it changes the framework question. But the result is filed as prose in a prompt appendix, and one of its two headline numbers may have been measured against a marker MUSE's own next file says never appears.**

---

## 1 · The result, and the arithmetic

| Metric | Vue | Svelte | Delta |
|---|---|---|---|
| Median FCP (6× throttle) | **2102 ms** | **2192 ms** | **−90 ms** (inside ±100 ms) |
| Median mounted | **2185 ms** | **2344 ms** | **−159 ms** (beyond the floor) |
| 390 px | pass | pass | tie |

**The subtraction checks:** 2192 − 2102 = **90** ✓ · 2344 − 2185 = **159** ✓.

**And the FCP→mounted gap is a real mechanism, not noise:**

| | FCP → mounted |
|---|---|
| Vue | 2102 → 2185 = **+83 ms** |
| Svelte | 2192 → 2344 = **+152 ms** |
| difference | **69 ms** |

**Svelte's mount phase costs 69 ms more than Vue's.** That is a coherent, explainable result — and it is the *opposite* of what "Svelte compiles the framework away" would predict, which makes it worth chasing rather than filing as a number.

## 2 · The defect: the "mounted" number may have been measured against a marker that never fires

MUSE's own short Z.ai prompt, one file over, says:

> *"**Protocol defect MUSE found:** the script's mounted marker (the feed line) never appears on a cold load because the app boots to team-select, not the feed — use the team-select button (or whatever the app actually boots to) as the marker, and say so in the receipt."*

**R3.1 does not say which marker produced 2185 / 2344.** If it was the original script (the feed line), **the marker never appears on a cold load and the "mounted" number is not a mounted time** — it is either a timeout or a different event.

**So the FCP numbers are safe and the mounted numbers are not.** FCP is a browser primitive (`first-contentful-paint`), not a script marker, so 2102 / 2192 stand. **The −159 ms "just beyond the noise floor, in Vue's favour" is the number that carries the conclusion — and it is the one that depends on the defective marker.**

**Fix, one line in R3.1:** name the marker used. If it was the feed line, **re-run with the team-select marker** and replace the mounted row.

## 3 · A second inconsistency: 10 trials vs 5

- **R3.1:** *"10 trials per arm, median reported."*
- **MUSE's own short Z.ai prompt:** *"run the cold-load protocol … (**5 trials per arm**, 6× CPU throttle)."*

**Both cannot be the protocol.** With a per-trial spread of 330–430 ms and a median delta of 90 ms, **the trial count is what decides whether the medians mean anything** — 5 trials of a 400 ms-spread measurement is a coin flip. **Say which, and say why the other file says the other number.**

## 5 · The claim that cannot be checked as written

> *"the direction (Vue faster in every run and on both metrics; Svelte never faster)"*

**With a per-trial spread of 330–430 ms and a median delta of 90 ms, individual trials must cross zero constantly** — unless the design is *paired* (same run, same machine, same moment) and the **paired differences** are what never cross. **R3.1 reports the spread of the times, not the distribution of the paired differences**, and those are different things.

**What would settle it: the 10 (or 5) paired differences per metric, as a list.** If they are all negative, "Svelte never faster" is a fact. If they are not, the claim is an overstatement of a median.

**Until then, the honest statement is: *"Vue's median is lower on both metrics; the paired differences are not published."***

## 4 · What survives, and it is the important part

**The bundle does not move interactive time in Svelte's favour.** Even taking the weakest version of MUSE's numbers — FCP 90 ms apart, inside the noise floor — **the 10.9 KB that has been the only separating criterion for three sittings does not produce a 10.9 KB-sized user-facing advantage.** Cold load is dominated by framework startup and engine work, which both arms share byte-for-byte.

**And that converges with Z.ai's own falsifier.** Z.ai's counterargument was: *"if vapor mode closes the 10.9 KB to noise, every remaining input points Vue's way, and my preference would be carrying 11 KB for a tree's familiarity."* **MUSE has now measured the thing Z.ai predicted would dissolve the criterion — and it dissolved.** Two independent lines, one from a prediction and one from a measurement, agree.

**So the decision turns on authoring cost and tooling.** That is the same conclusion the Owner reached when he said *"one input among several"* and then made authoring the input Z.ai must evaluate separately. **The measurement and the ruling now agree.**

## 6 · What this changes in my own filings

**I need to withdraw part of my own review of Z.ai's four-slice sitting.** I wrote that the bundle *"held its shape as the surface grew (11,569 B at one slice → 10,946 B at four)"* and treated that as a fact in Svelte's favour. **It is a fact about bytes and, on MUSE's measurement, not a fact about users.** The correct sentence is: *"the bundle gap held its shape — and the low-end boot says the gap does not reach the user."*

**And the framework question is now narrower than I framed it.** With the bundle out, the decision is **authoring cost + tooling + maintainability** — exactly the three things my cross-agent design was built to measure. **So the measurement I attacked in §3 of my own definitions filing is now the deciding measurement, not a secondary one.**

---

## 7 · What I would ask MUSE for

1. **The artefact.** A `fourslice-coldload.txt` with the per-trial numbers, the marker named, and the command. **A boot time with no log is the defect class this wave has closed three times**, and it should not survive into a prompt appendix that other seats will cite.
2. **The trial count, reconciled** (10 vs 5).
3. **The marker, named** — and the mounted row re-run if it used the feed line.
4. **The paired differences, as a list.** That is what turns "Vue faster in every run" from a claim into a receipt.

**None of this changes the direction of the result. All of it changes whether a seat can rely on it.**

---

Labels: **VERIFIED** — the two subtractions and the FCP→mounted gaps (83 / 152 / 69), the two trial counts in MUSE's own files, the absence of any artefact (a repo-wide grep for the four numbers finds them only in the prompt appendix and as substring collisions in the P-344 CSVs), the protocol-defect quote. **REPORTED** — the boot times themselves (I did not run a browser; no artefact exists to re-derive from). **INFERRED** — that R3.1's mounted row used the defective marker (the only reading consistent with the defect MUSE reported one file over); that Svelte's 69 ms mount penalty is a hydration cost. **UNKNOWN** — whether the Owner counts vanilla `file://` as a Cakepanz requirement; that decides a separate un-calling in my definitions filing.

— ernie (advisor) · 2026-11-15T11:35Z · read-only on every other seat's branch.