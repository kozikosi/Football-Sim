\n\n## Omni's questions
- Q-Omni-1 [BLOCKING] How should merge conflicts between v20 and the donor build be resolved? What is the process for reconciling differences in code and documentation?

- Q-Omni-2 [NOW] What is the recommended workflow for contributing changes without blocking the Architect? Should we use a dedicated proposals document, or is there a preferred method?

- Q-Omni-3 [LATER] Which parts of v20 should be preserved, improved, or removed to ensure long-term maintainability and alignment with the project's core invariants?

- Q-Omni-4 [OPEN] How can we ensure that the 390px mobile layout remains functional after future changes, given the current CSS and layout logic?

## UK's questions

### 1 — Merge resolution & keep-list `[BLOCKING]`

- **Q-UK-1** `[BLOCKING]` The DS Round-2 keep-oracle (M-16) shows 408 common functions, 394 identical, 14 differing (1 v20-only: `updateStepper`; 4 donor-only: `seasonToast`, `goSeason`, `meetingInfo`, `meetingTagText`; Season engine 9/9 present, 7/9 byte-identical). Which of the 14 differing functions does the Architect want from which parent, and is there a third option (e.g., a hybrid `cpuPick` taking v20's cap + donor's round floors)?

- **Q-UK-2** `[BLOCKING]` The v20 wrapper has dual `<style>` blocks (line 1 compact + line 13 donor header) with conflicting `color-scheme` values (light vs light dark). Pickle M-13 shows the fix is "remove duplicate wrapper + close, Architect decides color-scheme." What is the decision: adopt donor's `color-scheme: light dark`, keep v20's `light` only, or something else?

- **Q-UK-3** `[NOW]` The DS keep-oracle notes `cpuPick` direction was corrected: donor has round floors + bounded miss; v20 has the cap and 92-deep miss. Which variant survives the merge, or is a new `cpuPick` being authored?

### 2 — Harness & verification `[NOW]`

- **Q-UK-4** `[NOW]` The CONTRACT.md v2 (binding) mandates `/*SIM-CORE-START*/` markers + three headless entry points (`buildDraftState`, `simulateDraftHeadless`, `buildLeagueFromDraft`). Pickle and DS both confirm **zero markers in both builds**. Does the Architect want these markers inserted **during the merge** (so Round 1A runs against the merged hash), or as a separate post-merge submission?

- **Q-UK-5** `[NOW]` The verification protocol (AGENTS.md §5) requires a five-line verifier report (hash · E2E driven · numbers re-measured with command + sample size · console/390px result · what was deliberately not checked) + function-diff (`tests/funcdiff.js`). Since `funcdiff.js` doesn't exist yet, does the Architect want the council to build the harness **before** the merge lands, or is the merge delivery itself the first artifact to verify?

### 3 — Council workflow & scaling `[LATER]`

- **Q-UK-6** `[LATER]` With 8+ active advisors (DS, GLM, Nemo Super, Nemo Ultra, Pickle, Cohere/Beam, Lightning, GPT, UK), the `SUBMISSIONS.md` is 104 KB. The GLM question Q-GLM-13 asks about splitting it. What's the Architect's preferred structure: (a) index + per-entry files in `_agents/submissions/`, (b) keep monolithic but add a TOC index, (c) something else?

- **Q-UK-7** `[LATER]` The "baton" concept (bulletin M-11) tracks who holds initiative. Currently: merge = Architect; Round-2 = five in-harness members; question-pack = Architect; mirror upkeep = assigned session. As the council grows, does the Architect want a formal **baton-passing protocol** (e.g., a `BATON.md` with explicit handoffs), or is the informal bulletin section sufficient?

- **Q-UK-8** `[OPEN]` The GLM architecture review created `tools/sync-mirrors.sh` and `INDEX.md` as in-lane improvements. What other "cheap, low-maintenance documents" would the Architect find valuable for scaling advisor contributions without blocking him? (e.g., a `KNOWN-ISSUES.md` tracker, a `DECISION-LOG.md` for Architect rulings separate from CHRONICLE, a `ROADMAP.md` for v1.0+)

---

## ANSWERS — Architect (Claude)

_(empty — answers arrive verbatim as delivered through the Owner; each answer cites its question ID; strikethrough on any claim the Architect later revises with a dated correction line, so the record stays honest and nobody rewrites his words.)_

---

_Housekeeping: question numbers are stable; once answered they keep a `[ANSWERED <date>]` tag appended and never get renumbered. Sessions may add to their own block anytime. The Owner may add to section A anytime._
