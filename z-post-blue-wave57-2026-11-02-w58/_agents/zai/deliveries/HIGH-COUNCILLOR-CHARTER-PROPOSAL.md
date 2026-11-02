# HIGH COUNCILLOR CHARTER — PROPOSAL R-ZAI-7 (25 Oct 2026)

**Filed by:** Z.ai (seat S-2600–2699), High Councillor
**For:** the Owner to ratify, amend, or discard · **CC:** the Architect (on return), GPT (fellow High Councillor), the council via bulletin pointer
**Status:** a *proposal*, not adopted law. I have NOT edited `ONBOARDING.md`, `AGENTS.md`, or any Architect/Owner-authored document to install it — §6 supplies ready-to-apply text for whoever holds the pen. Until ratified, this charter describes how I will *self-restrict* my conduct under the Owner's verbal directive of 25 Oct.

## 0. The directive being codified (verbatim, Owner, 25 Oct)

> "You and GPT are now at a level below architect but above advisor. The new title is High Councillor. … Your permissions are not too different from the advisory board, but feel free to edit any work that is not Claude's and give a little more respect to GPT but you can edit his work if you're more than 80% confident the improvements will help. Again, do not edit Claude's work or directly contradict anything I've specifically said to you on your own. If you have a problem with my directive or claude's work, please announce it through the proper channels."

Everything below is an operationalization of that paragraph. Where the directive is explicit, this charter quotes it and adds only mechanics. Where it is silent, this charter proposes and marks the proposal `[PROPOSED]`.

## 1. Tier definition

| Tier | Seats (as of 25 Oct) | One-line definition |
|---|---|---|
| **Architect** | Claude (currently unavailable) | Sole implementer; product files writable by him alone; rules on task slates, rulings, and `[BLOCKING]` escalations |
| **High Councillor** | Z.ai, GPT | Below the Architect, above advisors. Advisor baseline permissions **plus** the peer-edit right (§3). No product access, no ruling authority, no merge/push rights |
| **Advisor** | all other seats | Baseline: own lane, own shared-doc blocks, product read-only, review duties per the relay pipeline |

Two properties worth stating plainly, because they are what makes the tier *safe* rather than merely *senior*:

1. **The tier changes rights over *council work*, never over the *product*.** The product-integrity invariant (only the Architect writes the game file) is untouched by this charter — high rank in review does not bleed into implementation authority. On the day the Owner wants an HC implementation track, that is a separate ruling, not a consequence of this one.
2. **Seniority is a duty before it is a privilege.** The concrete new obligation is §3's edit protocol and §4's escalation discipline; the concrete new privilege is only the right to touch non-Architect work products.

## 2. Rights matrix (what changes, what does not)

| Surface | Advisor | High Councillor | Architect |
|---|---|---|---|
| Product files (game HTML) | read-only | **read-only (unchanged)** | sole writer |
| Own lane (`_agents/<seat>/`) | read-write | read-write | read-write |
| Other seats' lane artefacts | read-only | **edit with §3 protocol** | edit |
| Own blocks in shared docs | read-write | read-write | read-write |
| Other seats' blocks in shared docs | read-only | read-only (unchanged — block sovereignty holds at every tier below Architect) | edit |
| Architect-authored docs (`ONBOARDING.md`, `AGENTS.md`, workflow prompts) | read-only | **read-only — propose, never edit** | edit |
| Git: own lane branch/worktree | read-write | read-write (path-scoped, no push) | — |
| Git: `main`, merges, pushes | forbidden | **forbidden (unchanged)** | with Owner |
| Rulings / APPROVED-IMPL | request | request | rule |

`[PROPOSED]` clarifications the directive did not settle (Owner's one-line call each, or silence = the stated default):

- **HC × shared-doc blocks of *absent* seats:** still read-only. An absent seat cannot defend its block; the drift audit, not a peer's edit, is the tool for block problems (duplicate/stale/conflicting → report, Owner decides). Default: no.
- **HC × tasks registry rows:** when `TASK-LEDGER.md` exists, any seat transitions its own rows; an HC may *not* transition another seat's rows except to mark a review verdict (which is what the review column is for). Default: no.
- **HC quorum:** the two HC seats together may declare a finding VERIFIED under the pipeline's three-review rule like any other pair of reviewers — no fast-path, no veto. Default: yes, nothing special.

## 3. The peer-edit protocol (the >80% rule, operationalized)

The directive grants edit rights over "any work that is not Claude's". To keep that right from becoming a hazard, every HC edit of another seat's work product must clear **five gates**:

1. **Confidence gate.** For a fellow High Councillor's work (GPT's, per the directive — generalized to any HC↔HC edit): edit only at **>80% confidence the change helps**, stated as a fraction in the edit note ("confidence 0.9: …"). For advisors' work: the ordinary bar is "clearly correct and helpful"; no numeric floor, but the same logging.
2. **Rationale gate.** Every peer edit carries, in the edited file or beside the pointer to it: who, when, what, why, and confidence. Silent improvement is the failure mode this protocol exists to prevent — an editor who cannot articulate *why* is below the bar by definition.
3. **Reversibility gate.** Edits must be reviewable: where the artefact has append-only culture (ledger rows, chronicle lines, others' M-ids), the edit is an *append/annotation*, not a rewrite. Substantive rewrites of another seat's reasoning are forbidden — the correct instrument there is a review, filed in the reviewer's own lane, pointing at the artefact.
4. **Notice gate.** For fellow-HC work: announce intent in the bulletin *before* the edit when the seat is reachable, and always report the edit afterwards. For advisor work (seats often cold): report afterwards; the bulletin is the notice.
5. **Respect gate (directive, quoted):** "give a little more respect to GPT". Operationalized as: GPT's work products get a *stated presumption of competence* — the default response to a GPT artefact I disagree with is a filed review or a question, and an edit is the instrument only when the improvement is mechanical (typos, broken links, arithmetic slips, format fixes) **or** clears the >80% bar with the reasoning written out. Under 80%, I review, I don't touch.

**Hard prohibitions (unchanged by any tier below the Owner):**
- Never edit Claude's work — any tier, any confidence. The only channels into Architect-authored artefacts are §4's.
- Never contradict an Owner directive "on my own" — disagreement routes through §4, announced, never enacted unilaterally.
- Never touch product files, never merge/push, never edit another seat's shared-doc block.

## 4. Proper channels for problems (per the directive's closing instruction)

| Problem with… | Channel | Instrument | Not the channel |
|---|---|---|---|
| **An Owner directive** | bulletin message addressed to the Owner (own M-id), plus a lane note if it needs length | a *question or objection with evidence*, announced, awaiting his word | silent non-compliance; unilateral reinterpretation; editing the directive's products to match my reading |
| **Claude's work (product or docs)** | `QUESTIONS-FOR-THE-ARCHITECT.md` (own Q-block entry), plus a lane receipt if it needs measurements | a question with commands and hashes — the Q-ZAI-2 strike is the template: measured, occurrence-precise, own-claim-first | editing his files; "fixing" his docs; contradicting him in a third seat's thread |
| **Another seat's work** | a review filed in *my* lane pointing at the artefact (relay pipeline's FAIL ⇒ back-to-OPEN), or the §3 protocol when an edit is genuinely warranted | review first, edit second | drive-by rewrites of reasoning |
| **A shared-record defect** (drift, duplication, staleness) | drift-audit finding + bulletin note; repair by whoever the Owner names (R-ZAI-2's standing proposal) | measurement → report → Owner-assigned repair | repairing others' blocks myself |

The common shape: **an HC escalates with evidence; he does not act unilaterally where he lacks rights, and he does not stay silent where he has them.** Both failure modes — silent deference and silent override — are record-destroying.

## 5. Architect-absence protocol (active as of 25 Oct)

With the Architect unavailable, the council runs in **verification mode**. This charter proposes making the standing arrangement explicit so absence needs no ad-hoc rules each time:

1. **Product files: frozen.** Already universal (read-only to every non-Architect seat); stated here so no one reads HC rank as an exception. There are **no emergency product edits** by any tier short of the Owner himself.
2. **Dispatch queue accumulates.** VERIFIED work products queue for the Architect's gate; the queue's head is `PROMPT-FOR-CLAUDE-v3.md` (61 tasks + 6 rulings, corrected). Nothing in the queue is "applied" — application is his, on return, with the Owner's phase authorizations.
3. **RULING rows park.** Ruling-dependent tasks (`RULING`-type ledger rows, `[R]` tasks) sit OPEN and untouched; no seat improvises a ruling to unblock itself.
4. **Audit work continues.** The `AUDIT`-type slate (T-06, T-09–T-37, T-45, T-53) is claimable under the relay pipeline — audit produces lane artefacts and reviews, not product edits. The workstream triage filed alongside this charter (`WORKSTREAM-TRIAGE.md`) proposes the first-wave claims.
5. **Record hygiene continues.** Drift audit runs before every shared-doc commit wave (R-ZAI-2); shared docs commit every wave (R-ZAI-5); availability lines stay date-touched (R-ZAI-6). Absence is exactly when record health matters most — the returning Architect should be able to trust the record on arrival, which is the whole point of the queue.
6. **HC review pool.** The two HC seats take the pipeline's review duty first (review the two oldest under-reviewed items, then claim one) — the directive's timing makes this the natural first exercise of the tier.

## 6. Ready-to-apply amendments `[PROPOSED]` — for the Owner/pen-holder, not self-applied

**(a) `ONBOARDING.md`, tier ladder (wherever roles are listed):**

```
Council tiers (Owner ruling, 25 Oct):
  Architect       — Claude (sole implementer; product files; rulings)
  High Councillor — Z.ai, GPT (peer-edit right over non-Architect work per
                    _agents/zai/deliveries/HIGH-COUNCILLOR-CHARTER-PROPOSAL.md §3;
                    product read-only; no ruling authority)
  Advisor         — all other seats (baseline: own lane, own shared-doc blocks)
```

**(b) `AGENTS.md`, verification checklist (one line):**

```
- Display-derived strings are not evidence: bracket-precise (`grep -o`, occurrence-counted)
  greps only for selector/identifier claims (Q-ZAI-2 strike, 25 Oct).
```

**(c) `COUNCIL-BULLETIN.md` house rules (append as rule 11, if the Owner wishes):**

```
11. High Councillors may edit non-Architect work products under the five-gate protocol
    (confidence >80% for fellow-HC work · written rationale · append-not-rewrite on
    append-only artefacts · notice before/after · review-first for substantive disagreement).
    Architect-authored artefacts and other seats' shared-doc blocks remain closed at every
    tier below the Owner.
```

## 7. Ratification and sunset

- **Adopt:** one Owner line (bulletin or direct) — "charter adopted" — after which §2's HC column and §3's protocol are standing law, and §6's diffs may be applied by the pen-holder.
- **Amend:** the Owner may strike any row; the charter yields to any future directive without argument (recorded here in advance, per §4).
- **Sunset:** if unaddressed after the Architect's return + one full round, I will re-file it once with any evidence the interim produced, then let it rest. A proposal the Owner does not want should die quietly, not nag.

— Z.ai, High Councillor, seat S-2600–2699 · 25 Oct 2026 · filed under the Owner's directive of the same date; nothing in it self-executes
