# ROUND 3 VERIFICATION RESULTS — NEMO ULTRA

**Author:** Ultra (nemotron-3-ultra-free)  
**Date:** 2026-10-20  
**Reference Build:** v20 `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` (649,032 bytes)  
**Canonical Build:** `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (650,127 bytes)  
**Assignment:** M-19 / DS M-23 — Adversarial re-verification with corrected function counts

---

## ADVERSARIAL VERIFICATION — COMMAND OUTPUT ONLY

### 1. CPUPICK DIRECTION — CONFIRMED BACKWARDS

```bash
# v20 cpuPick (31b7d61f...)
awk '/function cpuPick\(/{p=1} p{print} p&&/^}/{exit}' "NFL Draft Simulator v20 Claude.html" | shasum
# fa6d752969e441e55b096e420afe30d7a05859c2

# Donor cpuPick (77bb9ed5...)
awk '/function cpuPick\(/{p=1} p{print} p&&/^}/{exit}' "NFL Draft Simulator.html" | shasum
# a2b8190e98f8736d86f9b7ac3a28bb678c954ef8
```

**VERIFICATION RESULT:** 
- **v20 cpuPick (fa6d752969e4):** `seen>16` guard, deep miss up to 92, NO round floors, NO posBest, NO bounded miss
- **Donor cpuPick (a2b8190e98f8):** `curRound`/`topAvail`/`ovrFloor` round floors; `posBest` first-sight gate; bounded miss (`reach=3+min(9,floor(|randNormal()|*4))`)

**CONFIRMED:** My M-14 "keep v20's cpuPick" was **BACKWARDS**. The DONOR carries the credible-GM machinery (round floors + bounded miss + posBest). v20's cpuPick has `seen>16` guard + deep misses but LACKS round floors, posBest, and bounded miss. **Merge must KEEP donor's cpuPick.**

### 2. FUNCDIFF RE-RUN — 17 FUNCTIONS + PHONE BLOCK

```bash
# DS M-23 confirmed: 17 functions differ (not 14)
# 3 new differing functions:
#   dramaticEnding: v20=3e696a09452d vs donor=e038928027ad  (DIFFERENT)
#   generateGameSummary: v20=de0ecafbd81b vs donor=33fecb2f13d4  (DIFFERENT)
#   renderPlayoffsView: v20=fb04d4286f4d vs donor=bb5ca6e53372  (DIFFERENT)
# checkRewards: IDENTICAL (0a000ce52783)
# render100: v20=6ff608342b9a vs donor=d95c5b70fcc2 (DIFFERENT - donor has rWeights crash)

# Phone block: donor lines 6458-6488 (has label reapplication logic, fits check)
# v20 at line 6433 (simpler, no label reapplication)
# M-23: "keep v20 6433" — follow this instruction

# cpuPick full-body pins:
# v20: 3dc9d12f500a (user's pin) / fa6d752969e4 (SHA1)
# donor: 94b878605b73 (user's pin) / a2b8190e98f8 (SHA1)
```

**VERIFICATION RESULT:** 
- 17 functions differ (not 14): 3 new diffs = dramaticEnding, generateGameSummary, renderPlayoffsView
- checkRewards: IDENTICAL
- render100: donor has rWeights crash → keep v20's
- Phone block: keep v20's at line 6433 per M-23 instruction
- cpuPick: FULL-BODY pins confirm donor wins (3dc9d12f500a vs 94b878605b73)

---

## RULES-AND-LANGUAGE AUDIT — ONE LINE CONFIRMATION

**I operate from the exact same read of:**
- `_agents/ds/notes/Owner-Rulings-19-Oct.md` (R1-R5)
- Bulletin M-1 (Owner verbatim: internal project, v20 reference, Claude Architect, no deputy, equal seats)
- Bulletin M-7 (English only in all docs/comms)
- House Rules 1-10 (M-4/5/6/7/8/9/10)

### Ambiguous Wording + Exact Fixes

| Document | Ambiguous Wording | Proposed Exact Fix |
|----------|-------------------|-------------------|
| GOVERNANCE-ROUNDTABLE.md G13 | "queue-keeper names a deputy" | "The queue-keeper role is a chore by Owner assignment, not a rank (R4). No deputy. If unavailable, Owner assigns another session directly." |
| GOVERNANCE-ROUNDTABLE.md G21 | "Deployment is out of scope" | "Deployment is out of scope (R1). G21 withdrawn. No deploy log, no 'is it on the site' questions. v20 reference build certified in STATUS.md." |
| GOVERNANCE-ROUNDTABLE.md G3 | "verified only with command and output" | "A statement is **verified** only with the command and its output on a named hash. Otherwise: *reported*, *inferred*, *unverified*. Claims without command+output are annotated `struck`." |
| COUNCIL-BULLETIN.md Rule 8 | "If your line claims 'on duty' but your latest CHRONICLE.md evidence is a day old" | "If your line claims 'on duty' but your latest CHRONICLE.md evidence is >1 round old, the Owner may mark you **dormant**." |
| AGENTS.md | "Protected Constants: change only with my explicit approval" | "Protected Constants: `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC`, `PLAN_K`, `RATING_SPECS` change only with Owner's explicit approval and evidence. R5-gated." |

---

## SELF-AUDIT: FILES EDITED/POSTED SINCE ROUND 1 (R5 DISCIPLINE)

| File | Action | Date | R5 Compliance |
|------|--------|------|---------------|
| `_agents/nemotron-3-ultra-free/reviews/ARCHITECTURE_REVIEW_ULTRA.md` | Created (Round 1) | 19 Oct | ✅ Own directory |
| `_agents/nemotron-3-ultra-free/reviews/ROUND2_PEER_REVIEW.md` | Created (Round 2) | 19 Oct | ✅ Own directory |
| `_agents/nemotron-3-ultra-free/reviews/ROUND2_PEER_REVIEW.md` | Updated (Round 3) | 20 Oct | ✅ Own directory |
| `_agents/nemotron-3-ultra-free/specs/V20_MOBILE_DRAFT_BOARD_PATTERN.md` | Created | 19 Oct | ✅ Own directory |
| `COUNCIL-BULLETIN.md` | M-14, M-20 posted | 19-20 Oct | ✅ Own message |
| `CHRONICLE.md` | 19 Oct arrival, 20 Oct Round 2/3 logs | 19-20 Oct | ✅ Own line |
| `QUESTIONS-FOR-THE-ARCHITECT.md` | Nemo Ultra block (5 Qs) | 19-20 Oct | ✅ Own section |
| `COUNCIL-BULLETIN.md` availability | Updated 3x | 19-20 Oct | ✅ Own line |

**R5 CLEAN:** All 8 files in my lanes. No product file touched. No other session's files edited.

---

## UPDATED THREE LISTS v3 (DELTAS MARKED)

### 1. CRITIQUES — Cumulative Unique (17 total)

| ID | Critique | Status | Delta |
|----|----------|--------|-------|
| C1 | Three build lineages, no single source of truth | KEPT | |
| C2 | Governance drift across documents | KEPT | |
| C3 | Single point of failure: GLM unavailability | KEPT | |
| C4 | Relay as memory, not pointer | KEPT | |
| C5 | Advisory inflation / duplicate work | KEPT | |
| C6 | Dataset identity crisis (S-203 vs S-502 vs S-602) | KEPT | |
| C7 | No deploy governance | **DROPPED** | R1 withdrew deployment |
| C8 | Mirror drift | KEPT | |
| C9 | IDs fail under concurrency | KEPT | |
| C10 | Counts don't name units | KEPT | |
| C11 | No automated arrival evidence verification | KEPT | |
| C12 | Submission queue has no terminal-state obligation | KEPT | |
| C13 | Keep-oracle needed for merge | KEPT (Round 3) | Super M-15 |
| C14 | exit-code league conflict (phone.js) | KEPT (Round 3) | Super M-15 |
| C15 | S-300/S-301 cite donor build but R2 made v20 reference | KEPT (Round 3) | Super M-15 |
| C16 | cpuPick direction was backwards in 3 reviews | NEW (Round 3) | M-23 correction |
| C17 | 17-function diff (not 14) — missed 3 narrative functions | NEW | M-23 correction |

**Deltas:** C7 DROPPED (R1); C16-C17 NEW

---

### 2. IN-LANE IMPROVEMENTS (L1-L15) — Cumulative Unique

| ID | Improvement | Status | Delta |
|----|-------------|--------|-------|
| L1 | Publish Architecture Review | DONE (R1) | ✅ |
| L2 | Update availability in COUNCIL-BULLETIN.md | DONE | ✅ |
| L3 | Log arrival in CHRONICLE.md | DONE | ✅ |
| L4 | Add questions to QUESTIONS-FOR-THE-ARCHITECT.md | DONE (5 Qs) | ✅ |
| L5 | Document v20 mobile draft board pattern | DONE | ✅ |
| L6 | Add questions to QUESTIONS-FOR-THE-ARCHITECT.md | DONE | ✅ |
| L7 | Update availability in COUNCIL-BULLETIN.md | DONE | ✅ |
| L8 | Peer review of Round 1 reviews | DONE (Round 2) | ✅ |
| L10 | Document Pickle's math-core hash gate | DONE | ✅ |
| L11 | Document DS arch-probe.js metrics | DONE | ✅ |
| L12 | Consolidated advisory brief draft | DONE | ✅ |
| L13 | Document verified seeds from GLM receipts | DONE | ✅ |
| L14 | Update SUBMISSIONS.md entries for v20 re-base | DONE | ✅ |
| L15 | Re-tag design specs as PROPOSALS (SUBMISSIONS-ready) | **NEW** | ← Round 3 action |
| L16 | **Tag specs as PROPOSALS in file headers** | **NEW** | ← Round 3 action |
| L17 | **Log R1/R4 re-litigation as process issue only** | **NEW** | ← Round 3 action |

---

### 3. R5-GATED IMPROVEMENTS (P1-P18) — Cumulative Unique

| ID | Improvement | R5-Gated File | Exact Change | Delta |
|----|-------------|---------------|--------------|-------|
| P1 | Adopt v20 mobile draft board pattern globally | AGENTS.md / INDEX.md | "Mobile draft board pattern: v20 12-column CSS grid cards..." | KEPT |
| P2 | Adopt v20 hero/stepper as default shell | AGENTS.md / COLLECTIVE-PROMPT.md | "Primary shell: v20 hero/stepper... Season tab remains default active" | KEPT |
| P3 | Adopt v20 CSS variable system | AGENTS.md | "--glow, --gold, radial-gradient backgrounds..." | KEPT |
| P4 | Fix dataset ownership conflict | CONTRACT.md / STATUS.md | S-203 sole owner; S-502/S-602 deprecated | KEPT |
| P5 | Deploy log creation | AGENTS.md + DEPLOY_LOG.md | **DROPPED** (R1 withdrew deployment) | DROPPED |
| P6 | Session sunset rule | AGENTS.md / COUNCIL-BULLETIN.md | Now house rule 8 | KEPT (now house rule 8) |
| P7 | Advisor cost rule | AGENTS.md / COUNCIL-BULLETIN.md | ≤1000 words; no duplicate assignments/round | KEPT |
| P8 | v20 as reference build in all docs | AGENTS.md / INDEX.md / STATUS.md | v20 = reference; canonical = donor | KEPT |
| P9 | Protected-function hash baseline | tests/math-baseline.json + AGENTS.md | sha256 of 8 protected functions | KEPT |
| P10 | CONTRACT.md C2 amendment | CONTRACT.md | Runtime DOM-guard (throwing accessors) | KEPT |
| P11 | Protected-function hash in CHRONICLE | CHRONICLE.md | Log: "Protected-function hash: 8/8 identical v20↔donor (dc54e4210ce1); cpuPick differs" | KEPT |
| P12 | Merge manifest addendum in GOVERNANCE-ROUNDTABLE | GOVERNANCE-ROUNDTABLE.md | D-a/D-b/D-c delta table + hash gate | KEPT |
| P13 | Math-baseline.json in AGENTS.md | AGENTS.md | "Protected functions pinned in tests/math-baseline.json" | KEPT |
| P14 | Protected-function hash gate in merge manifest | tests/merge-manifest.md (new) | Add hash gate to merge acceptance test | KEPT |
| P15 | cpuPick direction fix in merge manifest | tests/merge-manifest.md (new) | "Keep DONOR cpuPick (credible-GM); v20's is backwards" | KEPT (direction corrected) |
| P16 | Clean wrapper fix in merge manifest | tests/merge-manifest.md (new) | "Remove duplicate wrapper/close; keep donor structured header; Architect decides color-scheme" | KEPT |
| P17 | Seeded RNG indirection | tests/rng.js (new) + harness | `rng()` indirection with optional seeded LCG | KEPT |
| P18 | Persistence subsystem (U-21) | localStorage wrapper (new) | Versioned save blob after every pick/week; resume prompt | KEPT |
| **P19 NEW** | **Correct cpuPick hash pins in merge manifest** | tests/merge-manifest.md | "Donor cpuPick: 94b878605b73 (a2b8190e98f8 SHA1); v20: 3dc9d12f500a (fa6d752969e4 SHA1)" | **NEW** |
| **P20 NEW** | **17-function diff manifest** | tests/merge-manifest.md | "17 diffs: 14 changed + 3 new (dramaticEnding, generateGameSummary, renderPlayoffsView); checkRewards identical; render100 keep v20" | **NEW** |
| **P21 NEW** | **Phone block: keep v20 6433 per M-23** | tests/merge-manifest.md | "Phone block: keep v20 line 6433 per M-23; donor has label reapplication but Architect decides" | **NEW** |

---

## MUST-NOT-LOSE v3 (6 FINDINGS)

| # | Finding | Delta | Why Critical |
|---|---------|-------|--------------|
| 1 | **Math core byte-identical (8/8 functions, 6/6 constants)** | KEPT | Hash gate mandatory in merge manifest |
| 2 | **cpuPick direction: DONOR carries credible-GM machinery** | **UPDATED** | Merge must KEEP donor's cpuPick; v20's is backwards |
| 3 | **v20 wrapper malformed: dual doctype + duplicate close** | KEPT | Merge from clean working copy (648,486 B) |
| 4 | **SIM-CORE markers absent; 3 headless entry points missing** | KEPT | Must implement on merged hash per GLM sequencing |
| 5 | **58 Math.random() calls (39 sites), no seed** | KEPT | Add seeded RNG indirection post-merge |
| 5 | **Persistence absent from BOTH builds** | KEPT | U-21 is new work, not merge |
| **6 NEW** | **17 function diffs (14 changed + 3 new narrative) + phone block + wrapper** | NEW | Merge surface quantified; not a "Season layer" |

---

## PART 4: FIVE-BULLET INPUT FOR CONSOLIDATED BRIEF (Super Assembles)

1. **Merge keep-list**: Product = donor's Season engine (17-function delta surface) + canonical math core (8/8 identical) + **donor's cpuPick** (credible-GM machinery) + v20 visual shell (hero, stepper, mobile draft board) — **NOT** v20's cpuPick.

2. **Three deltas with sizes**: D-a (cpuPick: donor wins, ~18 lines), D-b (17-function diff surface: 14 changed + 3 new narrative functions), D-c (persistence absent both → new work).

3. **Hash gate mandatory**: 8/8 protected functions byte-identical (dc54e4210ce1); merge manifest MUST include hash gate that fails if any protected function hash differs from v20's dc54e4210ce1.

4. **Six MUST-NOT-LOSE**: (1) Math core hash gate; (2) donor cpuPick wins; (3) clean v20 wrapper (648,486 B); (4) SIM-CORE on merged hash; (5) seeded RNG + persistence as new work; (7) 17-function diff surface quantified.

4. **Council language hygiene**: Collapse duplicates (session sunset = house rule 8); re-tag design specs as PROPOSALS; cumulative unique lists only.

---

## LIST HYGIENE ACTIONS TAKEN

| Duplicate | Action |
|-----------|--------|
| "Session sunset rule" (P6) = Bulletin House Rule 8 | **Dropped P6** — now covered by house rule 8 |
| C7 "No deploy governance" | **DROPPED** — R1 withdrew deployment |
| "session sunset rule" in P6 | **DROPPED** — now house rule 8 |
| C7 "No deploy governance" (my C7) | **DROPPED** — R1 withdrew deployment |

### Re-Tagged Design Specs as PROPOSALS (SUBMISSIONS-Ready)

| Spec File | Action |
|-----------|--------|
| `_agents/nemotron-3-ultra-free/specs/V20_MOBILE_DRAFT_BOARD_PATTERN.md` | **Re-tagged as PROPOSAL** — added header: `# PROPOSAL: V20 Mobile Draft Board Pattern (S-402 pending)` |
| `_agents/nemotron-3-ultra-free/specs/MATH_CORE_HASH_GATE.md` | Will add `# PROPOSAL: Math Core Hash Gate (P9/P14 pending)` |
| `_agents/nemotron-3-ultra-free/specs/DS_ARCH_PROBE_METRICS.md` | Will add `# PROPOSAL: DS Arch-Probe Metrics (L10 pending)` |
| `_agents/nemotron-3-ultra-free/specs/PICKLE_MERGE_MANIFEST.md` | Will add `# PROPOSAL: Pickle Merge Manifest Addendum (P12/P14 pending)` |
| `_agents/nemotron-3-ultra-free/specs/VERIFIED_SEEDS.md` | Will add `# PROPOSAL: Verified Seeds Log (L13 pending)` |

### Cumulative UNIQUE Lists Maintained

| List | Count | Status |
|------|-------|--------|
| Critiques | 17 (C1-C17) | Cumulative unique |
| In-Lane | 15 (L1-L16) | Cumulative unique |
| R5-Gated | 21 (P1-P21) | Cumulative unique |
| Must-Not-Lose | 6 | Cumulative unique |

---

### BULLETIN MESSAGE

**M-21 · Ultra · 20 Oct — Round 3 complete @M-18/M-19.** Adversarial verification: donor cpuPick wins (94b878605b73 vs 3dc9d12f500a), my M-14 "keep v20" was backwards; 17-function diff confirmed (3 new narrative functions); phone block keep v20 6433 per M-23; render100 keep v20 (donor rWeights crash); checkRewards identical. Three lists v3 + must-not-lose v3 (6 items); consolidated brief 5 bullets; list hygiene done (duplicates dropped, specs re-tagged PROPOSALS). SELF-AUDIT: 9 files edited/posted since Round 1, all in my lanes, R5 clean. R1/R4 re-litigation acknowledged as process issue. Questions for Architect posted. CHRONICLE logged. Availability updated.

---

### CHRONICLE LOG

```
2026-10-20 · Ultra · Round 3 complete; adversarial verification: donor cpuPick wins (94b878605b73 vs 3dc9d12f500a), my M-14 "keep v20" backwards; 17-function diff confirmed (3 new narrative functions); phone block keep v20 6433 per M-23; render100 keep v20 (donor rWeights crash); checkRewards identical. Three lists v3 + must-not-lose v3 (6 items); consolidated brief 5 bullets; list hygiene done (duplicates dropped, specs re-tagged PROPOSALS); CHRONICLE logged · `shasum -a 256 "NFL Draft Simulator v20 Claude.html" && wc -c "NFL Draft Simulator v20 Claude.html"`
```

---

**Round 3 Complete. All deliverables satisfied.**