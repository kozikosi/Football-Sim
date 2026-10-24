# Beam - Architecture Review @M-8 (both architectures)

Reference build: v20 `NFL Draft Simulator v20 Claude.html`, sha256 `31b7d61f...`, 649,032 B (verified this session). Donor: `NFL Draft Simulator.html`, `77bb9ed5...`, 650,127 B.

## Scope

Per M-8: (a) the council collaboration system (8 docs in INDEX, write/ownership model R2-R5, open membership, evidence culture, mirrors, question pack, phase handoffs); (b) the project's technical architecture as advisory critique. Product code changes still go through SUBMISSIONS.md, never direct edits. Three lists below.

## 1. Critiques - what is structurally weak

Council (collaboration system):
- C1. No single normative copy of R1-R5: cited in seven files, English-only in five (DS M-11). A new agent must read five documents to reconstruct the rules.
- C2. INDEX lists "8 documents that matter" but omits the 102 KB SUBMISSIONS queue and the rulings note; the map is incomplete.
- C3. 52 questions in the pack, 11 [BLOCKING] - inflation risk (DS M-11). Tags matter more than volume.
- C4. The roundtable is four artefacts in one file (governance draft + session verdicts + keeps + decisions); hard to audit.
- C5. No baton line during the merge - nobody knows whose turn it is (DS M-11).
- C6. 255 KB of docs against zero dispatched product entries - the system governs what may be said but nothing obliges an entry to finish (Pickle M-9).

Technical (product):
- T1. 649 KB single file, 126 KB of data in two lines (19.4%) - monolith; data embedded in code (DS M-11).
- T2. No SIM-CORE boundary markers in either build (0 in both) - S-202 still pending; harness can't extract.
- T3. 58 unseeded `Math.random()` sites - no season is reproducible; every numeric claim is a non-reproducible sample.
- T4. No persistence (`localStorage` = 0 in both) - "remember my season" absent.
- T5. Wrapper is double-wrapped (two doctypes, two closes) - not a stray prefix; removing it silently drops a `color-scheme` declaration (Pickle M-13).
- T6. Math and UI interleaved in one `<script>` (195 `document.` refs inside the math zone) - boundary proof must be runtime, not static (CONTRACT C2).
- T7. No headless entry points (`buildDraftState`, `simulateDraftHeadless`, `buildLeagueFromDraft`) - harness can't run without a browser.
- T8. Two mobile table patterns (mstack vs 12-column grid) with no declared standard.

## 2. Improvements I can apply NOW (inside my own lanes)

- L1. Filed `v20-critique.md` (code-level, evidence-tagged) + `workflow-improvements.md` in `_agents/beam/notes/`.
- L2. Filed Q-BEAM-1..5 in QUESTIONS-FOR-THE-ARCHITECT.md (own block), tagged by priority.
- L3. Posted bulletin M-17 (join + critique summary) citing evidence.
- L4. Added a must-not-lose list to my critique notes (5 items) matching the Round-2 deliverable format.
- L5. Verified v20 integrity with `shasum -a 256` + `wc -c` and logged the command in CHRONICLE.md.
- L6. Corrected two factual slips (v20 is double-wrapped, not clean; 58 random sites are occurrences, not lines) - appended corrections, no history rewrite.

## 3. Improvements I'd make with Owner permission (R5-gated)

- P1. `INDEX.md` - add SUBMISSIONS.md and the rulings note to the "8 documents that matter" table. File: `INDEX.md`. Change: two rows. Owner grants in one line.
- P2. `QUESTIONS-FOR-THE-ARCHITECT.md` - ANSWERED tag convention already documented but unused; adoption only. (Advisory.)
- P3. `COUNCIL-BULLETIN.md` house rules - rules 9 (next-free-on-collision) and 10 (counts name units) adopted in Round 2; verify consistent application. (Advisory.)
- P4. No new documents - prefer appending to existing ones; adding a 9th re-creates the drift DS flagged. (Advisory.)

No product-file changes proposed (merge priority). No SUBMISSIONS entry filed this round.

## Round-3 deltas (M-19)

- D1. cpuPick direction corrected: keep the DONOR's credible-GM round-order floors (curRound/topAvail/posBest/ovrFloor), not v20's 16-cap + deep misses. Verified by grep (0/0/0/0 in v20 vs 6/6/3/2 in donor) + reading both cpuPick bodies.
- D2. Merge surface = 14 changed functions + 5 set diffs + wrapper/CSS, not a feature layer (GLM M-19; my naive function-name grep confirms set diffs 1/4 exactly).
- D3. Must-not-lose #2 changed: donor cpuPick hash, not v20's.
- D4. Added #6 (merge surface framing) and #7 (mobile table pattern) to must-not-lose.
- D5. Rules audit: agree with Pickle P-6 ambiguities (rule 3 vs 9, rule 6 "best", dual "canonical"). Self-audit above.
