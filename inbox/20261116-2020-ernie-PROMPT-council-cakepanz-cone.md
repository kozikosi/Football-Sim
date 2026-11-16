SPEAKER: ernie | ROLE: council advisor | TASK: a self-contained work order for the council — help make the 67 Cakepanz shell a real merge cone | DATE: 2026-11-16T20:20Z
FOR: framework comparison (R-13)

PRIORITY+: Council verification of the Cakepanz merge cone — independent of the builder, adversarial by design.

> Draft prompt for the Owner to hand over. Not an assignment by me; work still comes from the queue, and **no seat edits Z.ai's tree** — the council verifies, measures and files.

---

# PROMPT — Council · "prove the shell can receive the engine"

## What this is
Z.ai is finishing the **67 Cakepanz** shell (slices 3-5) so that moving to a new engine snapshot is **replacing one directory**. The builder cannot verify his own seam — he knows where the seams are. That is what the council is for: try to break the claim, and measure what "mergeable" costs.

The shell: `67-cakepanz/` on `origin/gh-pages`, Svelte 5, engine pinned as a verbatim snapshot in `src/engine/`. Slices 1-2 (Draft Board, Team Select) done; 3-5 open.

## The claims to attack (each item: the attack, the evidence, the verdict)
Take any item you can do. A verdict of **improved / ok / credible** with your reasoning is the deliverable; a **refutation** with a command is worth more.

**1 · The one-door claim.** *Claim:* no screen imports the engine directly. *Attack:* `grep -rn "engine" src/lib --include=*.svelte`, then read the adapter and check whether any screen reaches *around* it (a type-only import, a re-export, a `$lib` alias). *Verdict:* does the claim hold, and how many lines of app code touch engine types (the number Z.ai must publish as M5)?

**2 · The swap test, independently.** *Attack:* check out the shell, copy `src/engine/` from a *different* engine commit, `npm ci && npm run build && npm run battery`. *Report:* build result, battery result, and `diff -rq` outside `src/engine/`. If the battery fails, name the law — that is the seam's real width.

**3 · Mutation-test the shell's battery.** This is the highest-value item. *Attack:* for each law in `batteries/*.battery.mjs`, break the thing it guards and show the law dies. Last round, twelve 1b tests were all killed by their mutations but **four wrong behaviours survived every test** — `puntYards`, `touchdowns`, `firstDowns` never asserted, and an interception's spot unchecked. *Report:* the survivors by name. A law that stays green when its guard is broken is a tautology.

**4 · The non-functional laws, measured.** Offline (`file://`, zero network), singlefile output, 390 px with no horizontal scroll, zero console errors on every screen in both the empty and dev states. *Report:* the command and its output per law; a failure verbatim.

**5 · Data integrity.** *Attack:* can any number on any screen be produced without the engine? Look for hard-coded flex costs, generated ratings, a stand-in table, or a label that does not travel with its number. *Report:* each hit with file and line, or a clean bill with the grep you used.

**6 · The pin.** *Claim:* `README.md` says `4ca9a071`; `AGENTS.md` says `d3bd81d2`. *Report:* which commit `src/engine/` actually carries, and which document is stale. A shell whose README names the wrong pin cannot be re-pinned safely.

**7 · The style laws.** Plain informative language, no "expected scoring" or "before kickoff"; every turnover named; "2-Pt Conv" except in the Guide; the user's team in blue; no periods in DRAFT / SEASON / PLAYOFFS / SUPER BOWL. *Report:* violations with the string and its location.

**8 · The weight of the shell.** *Measure:* node counts per screen, against the fresh-start arms' 871/457/470/125/221/39. *Report:* the table. A shell that costs 3× the DOM for the same information is a finding even if every law passes.

**9 · The cutover checklist for the Architect.** Write the one page Claude will read before he merges: what "perfect shell" means, as a numbered list of checks with the command for each. *Verdict:* would you sign it?

## How to work
- **Read-only on Z.ai's tree.** Never edit it, never push to it, never "fix" what you find. File it.
- One file per item: `_agents/<seat>/inbox/<UTC>-<seat>-cakepanz-<item>.md`, first line `SPEAKER: <seat> | ROLE: <role> | TASK: <task> | DATE: <UTC>`, then `FOR: framework comparison (R-13)`.
- Label every claim **VERIFIED** (you ran it, the receipt is in the text) / **REPORTED** / **INFERRED** / **UNKNOWN**.
- If one command fails you, **the failure is the answer** — paste it verbatim. A reply that reports only green gates is incomplete.
- Push after every finished file.

## What the council gets out of it
Not a verdict on Vue vs Svelte — that is the Owner's, and it is not what this work is for. What this produces is the **merge cone's acceptance evidence**: a list of checks the Architect can run in order, each with a known-good output, so that "the engine drops in" is a procedure rather than a hope. If the shell passes, the framework question gets cheaper, because the last framework-bound asset stops being a rewrite.