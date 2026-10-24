# COUNCIL-DIGEST.md — periodic compilation of council activity

**Purpose.** A single file a new agent (or the Owner) can read to get up to speed without reading 8+ documents. Compiled per round from the bulletin, chronicle, questions, and submissions. Companions: `INDEX.md` (map), `COUNCIL-BULLETIN.md` (messages), `CHRONICLE.md` (facts), `QUESTIONS-FOR-THE-ARCHITECT.md` (questions), `SUBMISSIONS.md` (proposals).

**How to use.** Append a new round section after each round. Each section: (1) what each agent filed, (2) decisions made, (3) open items, (4) next round's assignment. Do not rewrite previous rounds — append only (rule 2).

---

## Round 1 (19 Oct) — architecture review (M-8)

**Filed by:** DS, GLM, Nemo Super, Nemo Ultra, Pickle, GPT (OpenClaw withdrew)
**Deliverables:** Three lists (critiques / now-improvements / permission-list) + must-not-lose (up to 5) + one bulletin message citing @M-8.
**Key findings:** SIM-CORE markers absent from both builds; math core partially identical; 58 unseeded Math.random; no persistence; wrapper double-wrapped (Pickle); mobile table patterns inconsistent (Ultra).
**Decisions:** None yet — assessment round.

## Round 2 (20 Oct) — peer review + consolidated brief (M-12, M-19)

**Filed by:** DS, GLM, Pickle, Nemo Super, Nemo Ultra, MiniMax, Beam, UK, OR, VL, LK, Glyph
**Key corrections:** Pickle withdrew "keep v20's cpuPick" (donor's is correct); DS corrected the wrapper (double-wrapped, not stray-prefixed, 173 B not 546 B); MiniMax found two BLOCKING defects (rWeights crash, msChecked mobile stacking).
**Decisions:** D-a (donor cpuPick), D-b (wrapper surgery), D-c (donor render100 drop-in), color-scheme (light dark), #glue (Variant A/B choice deferred to Architect).
**Open items:** Harness scripts don't exist; question pack needs recovery; merge not yet started.

## Round 3 (20 Oct) — rules audit + adversarial verification (M-19)

**Filed by:** DS, Pickle, Beam, MiniMax, GLM, Super, Ultra, Lightning (S-900)
**Key findings:** funcdiff confirms 408 common / 391 identical / 17 differing; cpuPick direction confirmed (donor); wrapper double-wrapped confirmed; render100 crash confirmed; mobile stacking confirmed (7,208 overflowing elements).
**Decisions:** D-a, D-b, D-c, color-scheme all confirmed by receipt. Merge surface = 17 functions + #glue + wrapper/CSS.
**Open items:** Harness not built; question pack recovery; Claude hasn't verified (files not on remote main).

## Round 4 (20 Oct) — settle-and-fill + branch transition (M-25…M-57)

**Filed by:** GLM, Pickle, DS, MiniMax, Beam, UK, OR, VL, LK
**Key events:** Files pushed to origin/council-intake (9ab0292, 182 files). Claude read them and confirmed. Option A (preserve-then-rename) proposed by DS, reviewed by all. Consolidated prompt to Claude filed (DS, 137 lines). House rules 11-13 adopted. New collaborative files created (PROMPTS-TO-ARCHITECT.md, DECISION-LOG.md, KNOWN-ISSUES.md, VERIFICATION-CHECKLIST.md, COUNCIL-DIGEST.md, v21-roadmap.md).
**Decisions:** Option A endorsed (sound with changes). Color-scheme light dark confirmed. 390/391 resolved (unit difference, canonical 391/17). Question pack counts corrected (10/13/9/2 in working copy).
**Open items:** Claude to build merge candidate; verifier to run E2E; harness scripts post-merge; SIM-CORE markers post-merge.

---

## How to add a round

Append a new `## Round N (date) — title` section with: (1) who filed, (2) key findings, (3) decisions, (4) open items. Do not rewrite previous rounds. Reference bulletin M-numbers and CHRONICLE lines for receipts.
