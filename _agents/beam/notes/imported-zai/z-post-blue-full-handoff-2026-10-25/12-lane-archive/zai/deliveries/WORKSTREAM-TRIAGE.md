# WORKSTREAM TRIAGE — claimable work while the Architect is away (25 Oct 2026)

**Filed by:** Z.ai (seat S-2600–2699), High Councillor
**Feeds:** the v3 dispatch (`../notes/PROMPT-FOR-CLAUDE-v3.md`), the ledger seed (`TASK-LEDGER-SEED.md`), the charter's absence protocol (`HIGH-COUNCILLOR-CHARTER-PROPOSAL.md` §5)
**Status:** proposal. Triage authority is the Owner's and the Architect's; this document only makes adoption a one-line call instead of a mapping exercise. Rows are keyed 1:1 to the v3 slate / ledger seed — if the ledger is bootstrapped, this table collapses into its `Owner` column and dies as a separate artefact (never two registries).

## 1. Ground rules (restated from charter §5 — nothing new)

- **`RULING` rows park.** Ruling-dependent tasks wait for the Architect; no seat improvises a ruling.
- **`IMPL` rows are BLOCKED-GATE.** Implementation candidates wait for the Architect's gate + the Owner's phase authorization, exactly as the v2/v3 slates already say ("await APPROVED-IMPL"). Absence changes nothing here.
- **`AUDIT` rows are claimable now.** Audit produces lane artefacts + reviews, never product edits. This is the council's entire legal workload during absence — and it is real work: the audit slate is what makes the eventual implementation wave fast and safe.
- **Review duty first.** Pipeline protocol: review the two oldest under-reviewed items, then claim one new task. The two HC seats take this duty first (charter §5.6).

## 2. Claim policy by slate group

| Slate group | Rows | Type | Claim policy during absence | Notes |
|---|---|---|---|---|
| P0 Foundation | T-01–T-05, T-07 | IMPL | **BLOCKED-GATE** | Harness work the Owner will likely pre-authorize first; prepare by review, not by pre-implementation |
| P0 Foundation | T-06 | A→R | **CLAIMABLE (feeds Ruling 1)** | Superset verification of `V22-candidate-teamcolours.html` vs baseline — the single most decision-relevant audit open right now; pure diff + hash work, no product writes |
| P0 Foundation | T-08 | IMPL | **HALF-DONE** | Ledger side is this seed (`TASK-LEDGER-SEED.md`); taxonomy + 13-field template wording can be drafted in-lane for the Architect's ratification |
| P1-INTEL | T-09–T-37 | AUDIT | **CLAIMABLE (pool)** | 29 investigation tasks, one artefact each; see §3 for proposed seed claims |
| P1-REL | T-38–T-47, T-49, T-50 | IMPL | **BLOCKED-GATE** | T-45 (profiling) inside this range is the exception → claimable |
| P1-REL | T-45 | AUDIT | **CLAIMABLE** | Profiling suite precedes any optimization by standing rule; its measurements will be waiting for the gate |
| P1-REL | T-48 | IMPL | **BLOCKED-GATE** | Mobile CTA; 390px evidence already exists in MOC's receipts |
| P1-REL | T-51 | — | **STRUCK** | Moot (correction receipt); retained for numbering only |
| P2 | T-52, T-54 | R→I / R | **PARKED (rulings)** | Colour convention + surface order |
| P2 | T-53 | AUDIT | **CLAIMABLE** | 32-team contrast matrix; pairs naturally with T-06's colour-candidate read |
| P2 | T-55–T-61 | IMPL | **BLOCKED-GATE** | Shell/data hygiene; T-58's line-split has an in-lane evidence trail already |

Net: **32 of 61 rows are legally actionable during absence** (T-06, T-08-half, T-09–T-37, T-45, T-53) — none of which can drift into product territory. That is the headline the Owner needs for a go/no-go on "council, work".

## 3. Proposed seed claims (first wave, verification mode)

Ordered so that each artefact either feeds a ruling or de-risks the first implementation wave:

1. **T-06 — colour-candidate superset verification** → feeds Ruling 1 (V22 base). Two seats ideal (proposer + verifier, model C shape). I will claim this one if no other seat takes it within the first wave.
2. **T-13 — `simulateGame` (L2286) dependency graph** → groundwork for T-14's reconciliation battery; the largest single concentration of verified line-number claims in the slate.
3. **T-27 — caps audit** → `PER_GAME_CAP` / `SEASON_RECORD_CAPS` vs game-sum consistency; a known Owner-sensitive area where measured numbers beat opinions.
4. **T-31 — `sortStandings` (L3258) tiebreak audit** → comparator incoherence has been asserted by two reviewers independently; a constructed-cycles repro would make it VERIFIED.

**HC review pool (me + GPT):** while seed claims run, the two HC seats exercise the pipeline's review duty against the *existing* backlog of under-reviewed council artefacts (my own v2→v3 lineage is the first item — reviewed by GPT, ideally, since self-review has a demonstrated failure mode in this lane). Reviews are filed in the reviewer's lane; verdicts land in the ledger's review column once it exists.

## 4. Honest limits of this triage

- **Seat availability is unknown beyond my own.** 16 of 21 availability-strip lines were stale as of yesterday's audit (finding A5); I cannot tell who is actually reachable, so §3 proposes *claims*, not *assignees*. The one-message date-touch pass (R-ZAI-6) converts this table into real assignments.
- **No row is assigned to a named seat by my authority.** The ledger's `Owner` column stays `—` until a seat claims in the bulletin or the Owner assigns; this document proposes the menu, not the seating.
- **Priority inside the claimable pool is mine, not ruled.** If the Owner or the returning Architect wants a different first wave, the seed claims reorder without ceremony — that is what "claim policy" vs "assignment" means here.

— Z.ai, High Councillor, seat S-2600–2699 · 25 Oct 2026
