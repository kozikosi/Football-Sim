SPEAKER: MUSE | ROLE: Council Advisor | DATE: 2026-11-02T06:07:00Z

# Proposed new priorities from the storage-architecture discussion (owner-requested)

KG asked me to draft new work requests for council members based on the storage wave discussion (1 Nov 2026). Per protocol I am not editing PRIORITIES.md — these are `PRIORITY+` proposals for the Owner/Architect to add. Suggested IDs continue the sequence (P-207+).

---

PRIORITY+: P-207 | P1 | Review the Architect's storage contract for Z.ai | why: Claude published `inbox/20261101-2100-architect-to-zai-storage-contract.md` (+ assessment `inbox/20261101-2000-architect-storage-assessment.md` and three owner notes) on branch `architect/engine-and-seats`. The whole wave builds on this contract — envelope shape, facade API, versioning, the "do not touch" list. It needs the standard three-review chain before Z.ai's Phase 0 plan locks against it. Reviewers: fetch the branch read-only, check the envelope against the owner's locked decisions (per-week preview, frozen player snapshots, global stats keyed by franchise), and flag anything missing or over-constrained.

PRIORITY+: P-208 | P1 | Lock the v1 career stat list (~8-10 stats) | why: The council debated stats for two rounds but never produced the final list with definitions. Needed before Z.ai's stats spec. For each stat: exact definition, update trigger (elimination per owner's new rule), display home, data required, per-team provenance. Candidate set from the discussion: Super Bowl wins (count + teams), undefeated seasons, best playoff run, runner-up finishes, first Super Bowl (team/year), longest win streak, draft steals, best draft class, most-drafted players, franchise legend (with formula). Must pass the "earned" filter and the display-home rule. Cut list is settled (no blowouts, no vanity counters).

PRIORITY+: P-209 | P2 | Brag share text and behavior spec | why: Small, independent, well-defined. Owner: "The user shouldn't be exporting anything... You could create a copy and paste sharable with a link to the project and uh 'I went x-y. Can you go 20-0?'" and "it's not a seed challenge. it's a brag share." Deliverable: exact text template, the deployed game URL (never file:// or localhost, no parameters, no encoded state), clipboard + confirmation toast behavior, fallback when clipboard is unavailable. No save data in the share, ever.

PRIORITY+: P-210 | P2 | Verify storage origin and browser behavior risks | why: Claude's assessment §B4 flags these as INFERRED, not verified: (1) localStorage/IndexedDB belong to the origin — moving hosts/domains loses all saves; (2) file:// behavior differs per browser; (3) Safari may evict script-written storage after ~7 days without a visit. Z.ai's question #1 depends on answers. Deliverable: measurements with browser versions and dates — does storage survive file:// in Chrome/Firefox/Safari? Does Safari actually evict? What exactly happens on a host change? Tables, not opinions.

---

Notes for the Owner:
- P-207 is the highest leverage: if the contract has a hole, Z.ai's Phase 0 plan inherits it. Suggest it goes first.
- P-208 unblocks Z.ai's stats spec (§7 Q3 of the locked prompt).
- P-209 and P-210 are independent and can run in parallel with the above.
- The stable-ID crosswalk review (Claude's E1) will need a priority once `data/player-ids.csv` exists — "nothing can infer same player after a rename," so it needs a human eye. Suggest creating that item when Claude pushes the file rather than now.
