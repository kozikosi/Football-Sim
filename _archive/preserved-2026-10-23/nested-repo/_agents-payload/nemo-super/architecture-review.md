# Nemo Super architecture review — response to M-8 (19 Oct)

**Scope.** Both architectures: (a) council collaboration system; (b) project technical architecture as advisory critique. Evidence tags per M-8: command output / reported / inferred / unverified. Reference build v20 `31b7d61f…` (Owner ruling R2); donor `77bb9ed5…` read and verified this session (`shasum -a 256` = `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f`, 650,127 B). English only.

---

## (1) Critiques — structurally weak

### Council collaboration system

**C1 — No enforcement of the arrival evidence gate.** Open membership (bulletin house rule 6, M-6) requires a CHRONICLE.md arrival line "with one command as evidence," but nothing checks that the cited build hash matches the file actually read. A session can log "read v20" while measuring `77bb9ed5…`, and no subsequent clause catches it. G2 (identity header) exists in the roundtable draft but is not yet binding; it is the only thing preventing a repeat of this week's two-lineage dispute. Inferred from INDEX.md house rule 6 and CHRONICLE.md format; not yet tested against an actual joiner.

**C2 — Availability strip has no heartbeat.** A session can write "on duty" and never act; nothing marks it dormant automatically. The roundtable draft (§19) proposes a two-round dormancy rule, and G19 covers admission/dormancy, but neither is in force yet (no §7 entries). Reported from reading COUNCIL-BULLETIN.md availability strip and GOVERNANCE-ROUNDTABLE.md §8/G19.

**C3 — Stale-entry risk in SUBMISSIONS.md.** Entries are filed against a build hash (S-300/S-301 cite `77bb9ed5…`), but R2 re-based the reference on v20 `31b7d61f…`. An entry that measures `77bb9ed5` line numbers now measures the donor, not the reference. No mechanism flags an entry as stale when the reference build changes. Reported from SUBMISSIONS.md entries and STATUS.md R2 ruling.

**C4 — §7 decision log is owner-only and empty.** GOVERNANCE-ROUNDTABLE.md §7 is marked "Owner only" with one header row and no entries. Until §7 fills, nothing in the roundtable is binding (§1 says so). Reported from reading §7.

**C5 — Two documents both called "the plan" survive in spirit.** AGENTS.md contains protocol + invariants + testing checklist; GOVERNANCE-ROUNDTABLE.md §3 contains a draft constitution with 22 clauses. Overlap (G2/G3 headers, strike rules, verification) is not yet de-duplicated. INDEX.md lists both as current. Reported from reading INDEX.md, AGENTS.md, and the roundtable.

### Technical architecture (advisory critique — no code changes proposed here)

**T1 — Single-file monolith blocks testability.** `NFL Draft Simulator v20 Claude.html` (649,032 B) contains PLAYERS, TEAM_DATA, DEFAULT_WEIGHTS, all math, and all UI in one inline `<script>`. `grep -c "SIM-CORE-START"` = 0 in both builds (verified by GLM this session, CHRONICLE line 31). No DOM-free entry point exists: `startDraft2()` reads the form at line 1401–1403 before building state; `finishDraft2()` ends in render. S-202's marker plan cannot enclose pure math without moving ~40 UI functions out of the data block. Inferred from reading AGENTS.md Core Math table and grepping both builds; not yet tested against an actual extraction attempt.

**T2 — Data and math are not separable.** PLAYERS (1,200+ entries) and TEAM_DATA (32 teams) live in the same script block as `matchupModel()` and `optimalLineup()`. A VM-isolated harness cannot see player data without also pulling DOM-dependent UI code (`buildControls` calls `document.getElementById` at line 459; 110 of 181 DOM references sit between the data block and line 3942 per DS's measurement). Static "zero `document.`" assertion on the slice is unsatisfiable; DS's S-102 amendment (runtime guard) is the correct fix. Inferred from reading the HTML structure and DS's S-102 amendment record.

**T3 — Lineage opacity across three builds.** v20 (649,032 B, `31b7d61f…`) is the Owner-designated merge base; canonical `77bb9ed5…` (650,127 B) is the donor; `Football Sim/index.html` (602,710 B, `5217dad1…`) is neither. No deploy log exists; `Football Sim/` clone tracks only `(8)` and `(9) (OC)`. A merge cannot produce a manifest until "which file is real" is settled per-file. Verified via `shasum`, `wc -c`, `find`, `git ls-files` in this session.

**T4 — No harness scripts exist.** `tests/` contains only `CONTRACT.md` v2 and `madden-sim.spec.js`. pw4.js, validate.js, phone.js, run_all.sh, funcdiff.js are named but absent (verified by `ls tests/`). CONTRACT v2 is binding but unimplementable until S-202's markers land. Verified by directory listing.

---

## (2) Improvements I can apply NOW (my own lanes)

**N1 — Long-form review (this file).** Written to `_agents/nemo-super/notes/architecture-review.md`, per M-8 ("long-form review → _agents/<your-name>/ + ONE bulletin message citing @M-8"). One bulletin message will follow in COUNCIL-BULLETIN.md.

**N2 — Update my availability line.** Done in COUNCIL-BULLETIN.md: "on duty 19 Oct (M-8 architecture review in progress); build read `77bb9ed5…a39f`, 650,127 B; reference for this review is v20 `31b7d61f…` per R2 · ID block S-300–399". Own lane, own line (bulletin rule 4).

**N3 — Log my arrival evidence in CHRONICLE.md.** Open membership (house rule 6) requires a CHRONICLE arrival line with one command as evidence. I will append: `2026-10-19 · Nemo Super · joined council, ID block S-300–399, read build `77bb9ed5…`via shasum (650,127 B), read v20`31b7d61f…` via shasum (649,032 B), wrote M-8 architecture review to _agents/nemo-super/notes/architecture-review.md · this session`. One line, append-only.

**N4 — File my architectural questions in QUESTIONS-FOR-THE-ARCHITECT.md.** My own block `## Nemo Super's questions`, tagged [BLOCKING]/[NOW]/[LATER]/[OPEN]. Questions I intend to file:
- Q-NemoSuper-1 [NOW]: Does the merged build keep `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS` byte-identical, or does the merge reset them to one parent's values? (BLOCKING — S-301's mobile thresholds and S-300's invariant critique depend on this.)
- Q-NemoSuper-2 [NOW]: Which build's `teamRatings()` and `slotWinsTable()` survive the merge? My S-300 risk (c) measures `modelWeights()` ↔ `slotWinsPerOvr()` inverse on `77bb9ed5`; if the merge picks v20's copy, my cited line numbers (1342, 1268, 1283, 1288) may not apply.
- Q-NemoSuper-3 [LATER]: What is the acceptance test for "playtest U-12 distributions from draftSim.log" without a headless season path? S-102's M11 measures round-1 OVR, gap-to-best-remaining, bottom-tier picks from `draftSim.log`, but `draftSim.log` only exists after a live draft; no headless path exists yet in either build.

**N5 — Re-base my SUBMISSIONS.md entries or file amendments.** S-300/S-301 cite `77bb9ed5…`; under R2 the reference is v20. Append-never-rewrite means I file an amendment entry (S-303) noting the re-base, rather than editing S-300/S-301. I have not yet written S-303; this list is my notice of intent.

**N6 — Align my S-301 phone.js exit-code amendment with CONTRACT v2.** Contract v2 (applied to `tests/CONTRACT.md`) says phone.js → exit 1 findings / exit 4 usage. My S-301 amendment said exit 2 = usage/parse error (hard build failure). Entry-wins rule (C4) means my entry governs phone.js, but the contract was already applied as v2. I should align: findings → 1, usage/parse error → 4, missing file → 4 per C1. This is a clarification, not a change of intent.

---

## (3) Improvements with Owner permission (R5-gated files)

**R1 — `AGENTS.md` Key Files pointer (line 111).** Current: "`NFL Draft Simulator v20 Claude.html` — the v20 reference build… `NFL Draft Simulator.html` … is the donor of fixes…". This is correct post-R2 but the surrounding text still references the old "Canonical app" structure in places (line 110 lists AGENTS.md first in the protocol layer; fine). The exact change: re-order so `STATUS.md` (build hash + roles + parked decisions) is listed before `AGENTS.md` since STATUS.md now carries the reference hash per R2. Also add `CHRONICLE.md` and `COUNCIL-BULLETIN.md` to the Key Files list (they are protocol-layer per INDEX.md but missing from AGENTS.md's list). Owner assignment per edit (R4); I propose the exact text, Owner grants one line.

**R2 — `tests/CONTRACT.md` exit-code alignment with my S-301 amendment.** C4 currently: phone.js → 1 findings / 4 usage (contract v2 applied). My S-301 amendment originally said exit 2 = usage/parse error (hard build failure). The contract supersedes: findings → 1, usage/parse → 4, missing file → 4. I propose amending my S-301 entry text to match, filed as a new SUBMISSIONS entry (append-never-rewrite), Owner-assigned edit to SUBMISSIONS.md (my own section — I own it, no R5 needed for that part; the contract text itself is Owner-assigned per edit).

**R3 — `GOVERNANCE-ROUNDTABLE.md` §7 decision log.** Currently empty (header row only). Once the Owner records decisions, §7 fills. My proposed exact change: none to the text; I simply will not treat §8 verdicts as binding until §7 has entries. If the Owner wants me to draft §7 entries from the roundtable discussion, that is an Owner assignment per edit (R4).

**R4 — `CHRONICLE.md` arrival line for myself.** Open membership house rule 6 requires logging arrival with one command as evidence. I have not yet done this. The exact line: `2026-10-19 · Nemo Super · joined council, ID block S-300–399, read build 77bb9ed5… (650,127 B) and v20 31b7d61f… (649,032 B) via shasum, wrote M-8 architecture review to _agents/nemo-super/notes/architecture-review.md · this session`. Append-only; I own this line (it is my arrival evidence). No Owner permission needed to append my own line, but the rule exists; I include it here for completeness.

**R5 — `SUBMISSIONS.md` amendment S-303 (re-base on v20).** S-300/S-301 cite `77bb9ed5…`; under R2 the operative reference is v20 `31b7d61f…`. I propose filing S-303: "Re-base S-300/S-301 evidence citations from 77bb9ed5… to v20 31b7d61f…; no change to proposals, only to the build hash they measure." My own section in SUBMISSIONS.md — I own it, no R5 gate for my own section. Append-never-rewrite: new entry, not edit.

---

## Questions for the Architect (QUESTIONS-FOR-THE-ARCHITECT.md, my own block)

- Q-NemoSuper-1 [NOW]: Does the merged build keep `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS` byte-identical, or reset to one parent? BLOCKING — S-301 mobile thresholds and S-300 invariant critique depend on this.
- Q-NemoSuper-2 [NOW]: Which build's `teamRatings()`/`slotWinsTable()` survive the merge? My cited line numbers (cpuPick 1342, slotWinsTable 1268, slotWins 1283, slotWinsPerOvr 1288 on `77bb9ed5`) may not apply to v20.
- Q-NemoSuper-3 [LATER]: Acceptance test for U-12 draft distributions from `draftSim.log` without a headless season path? S-102's M11 measures from `draftSim.log`, which only exists after a live draft; no headless path exists in either build.

---

## Availability line (updated in COUNCIL-BULLETIN.md)

"Nemo Super — on duty 19 Oct (M-8 architecture review in progress); build read `77bb9ed5…a39f`, 650,127 B; reference for this review is v20 `31b7d61f…` per R2 · ID block S-300–399"

I will next log my CHRONICLE.md arrival line and post the single bulletin message citing @M-8.
