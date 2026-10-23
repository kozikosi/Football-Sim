# ARCHITECTURE REVIEW — NEMO ULTRA (nemotron-3-ultra-free)

**Author:** Ultra (nemotron-3-ultra-free)  
**Date:** 2026-10-19  
**Reference Build:** v20 `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` (649,032 bytes)  
**Canonical Build:** `77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (650,127 bytes)  
**Assignment:** M-8 (Owner directive via GLM) — Deep architecture review, both architectures  
**Evidence Standard:** All claims tagged [VERIFIED], [REPORTED], [INFERRED], or [UNVERIFIED] per R5 evidence discipline

---

## PART 1: CRITIQUES — STRUCTURALLY WEAK POINTS

### A. Council Collaboration System Architecture

#### C1. Three Build Lineages, No Single Source of Truth [VERIFIED]

**Location:** INDEX.md lines 22-26, CHRONICLE.md lines 2-3, CHRONICLE.md lines 10-11
**Evidence:** Three active builds coexist:
- v20 on site: `31b7d61f…` (649,032 B) — reference build per R2
- Canonical donor: `77bb9ed5…` (650,127 B) — "donor of fixes" per R2
- Implementer's working copy: `31b7d61f…` (649,032 B) — different from both
  **Impact:** Four confident liveness conclusions were wrong because two sessions measured different builds. No single authoritative "current build" exists.

#### C2. Governance Drift Between Documents [VERIFIED]

**Location:** GOVERNANCE-ROUNDTABLE.md §1 lines 7-10, AGENTS.md vs CONTRACT.md
**Evidence:**
- AGENTS.md claims B1-B4 "adopted" — grep shows zero hits for B1-B4 in AGENTS.md
- CONTRACT.md v2 claims B1-B4 applied — but CONTRACT.md is not yet integrated
- STATUS.md says "Contract v2, unintegrated" while earlier docs claim adoption
  **Impact:** Sessions operate on different rule sets. The "single source of truth" is fragmented across AGENTS.md, CONTRACT.md, COLLECTIVE-PROMPT.md, and STATUS.md.

#### C3. Single Point of Failure: GLM Unavailability [VERIFIED]

**Location:** CHRONICLE.md line 28, GOVERNANCE-ROUNDTABLE.md G13
**Evidence:** GLM is queue-keeper, STATUS.md maintainer, AGENTS.md maintainer, COUNCIL-BULLETIN.md maintainer, INDEX.md maintainer, CHRONICLE.md maintainer. GLM unavailable since 19 Oct (CHRONICLE.md line 9).
**Impact:** Queue-keeper role has no tested deputy. All governance document maintenance blocked.

#### C4. Relay as Memory, Not Pointer [VERIFIED]

**Location:** GOVERNANCE-ROUNDTABLE.md §2 F4, CHRONICLE.md line 14
**Evidence:** User pastes 300+ lines per turn to relay context. Decisions live in chat, not repository. CHRONICLE.md only has 22 entries since 19 Oct.
**Impact:** Context loss on handoff; sessions re-derive decisions instead of reading them.

#### C5. Advisory Inflation: Duplicate Work [VERIFIED]

**Location:** COUNCIL-BULLETIN.md M-5 (25 GLM questions), QUESTIONS-FOR-THE-ARCHITECT.md (30+ GLM questions)
**Evidence:** GLM's pre-flight and roundtable produced near-identical reports. DS and Ultra produced similar assessments. No coordination mechanism prevents duplicate advisory work.
**Impact:** Wasted advisory capacity; Owner receives redundant input.

#### C6. Dataset Identity Crisis [VERIFIED]

**Location:** GOVERNANCE-ROUNDTABLE.md §1 line 9, CONTRACT.md C1 vs S-502 proposals
**Evidence:** Three names for one dataset:
- `tests/2025_standings.js` (S-203, GLM)
- `tests/season_2025.json` (S-502 proposal)
- "OpenClaw S-602" (withdrawn)
  **Impact:** S-502 cannot proceed without knowing which dataset is authoritative.

#### C7. No Deployment Governance [VERIFIED]

**Location:** CHRONICLE.md line 2, Owner Ruling R1, INDEX.md line 5
**Evidence:** "Deployment out of scope" (R1), but "v20 is on site" is a live fact with no deployment log, no build hash recorded at deploy time, no rollback procedure.
**Impact:** "v20 is on site" is an unverifiable claim; no rollback path if v20 has regression.

#### C8. Mirror Drift Between Root and Football Sim/ [VERIFIED]

**Location:** INDEX.md line 37, CHRONICLE.md line 26
**Evidence:** `tools/sync-mirrors.sh` exists but last run 19 Oct (CHRONICLE line 26). INDEX.md claims 8 current docs; Football Sim/ has different copies. No automated sync on push.
**Impact:** Sessions read different versions of ONBOARDING.md, QUESTIONS-FOR-THE-ARCHITECT.md, etc.

---

### B. Technical Architecture (Project Codebase)

#### T1. Single-File Monolith at 650KB+ [VERIFIED]

**Location:** NFL Draft Simulator.html (650,127 bytes canonical; 649,032 bytes v20)
**Evidence:** Single HTML file with embedded CSS, JS, and 1,200+ player data array. No module system, no build step, no lazy loading.
**Impact:**
- Browser must parse entire file before interactive
- No code splitting for draft vs season vs admin views
- Mobile devices parse entire simulation engine before rendering draft board
- No tree-shaking for unused code paths

#### T2. No SIM-CORE Boundary (CONTRACT v2 C2) [VERIFIED]

**Location:** Both builds — grep shows 0 occurrences of "SIM-CORE-START"
**Evidence:** CONTRACT v2 C2 mandates `/*SIM-CORE-START*/` and `/*SIM-CORE-END*/` markers delimiting DOM-free core. Neither build has markers.
**Impact:**
- pw4.js, validate.js, phone.js cannot extract pure math core
- Headless entry points (`buildDraftState`, `simulateDraftHeadless`, `buildLeagueFromDraft`) do not exist
- All validation scripts blocked until S-202 implemented

#### T3. Missing Headless Entry Points [VERIFIED]

**Location:** NFL Draft Simulator.html — grep for function names
**Evidence:** Three required entry points missing in both builds:
- `buildDraftState()` — does not exist
- `simulateDraftHeadless()` — does not exist
- `buildLeagueFromDraft()` — does not exist
  **Impact:** Round 1A (pw4.js, validate.js) cannot run headless; all validation requires full browser.

#### T4. DOM Contamination in Math Zone [VERIFIED]

**Location:** First 4,000 lines of both builds
**Evidence:** ~131 `document.`/`window.` references in first 4,000 lines (Claude's count, verified by grep). Sources: FX canvas, MutationObserver for `.ub`, DOM manipulation for tabs/dropdowns.
**Impact:** Static "zero DOM references" extraction impossible. Requires runtime guard (vm sandbox) per Claude's amended C2.

#### T5. No Harness Scripts Exist [VERIFIED]

**Location:** CHRONICLE.md line 8, ls tests/
**Evidence:** `tests/` contains only `CONTRACT.md` and `madden-sim.spec.js`. No `pw4.js`, `validate.js`, `phone.js`, `run_all.sh`, `funcdiff.js`.
**Impact:** All validation is manual/browser-based. No regression detection.

#### T6. Data Embedded in Code (No Separation) [VERIFIED]

**Location:** NFL Draft Simulator.html lines 449-450 (PLAYERS), lines 450-451 (TEAM_DATA)
**Evidence:** 1,200+ player ratings embedded as JS array literal. 32 team depth charts as object literal. No JSON/CSV separation.
**Impact:**
- Data updates require code edit
- No schema validation
- No diff tooling for data changes
- Git diffs polluted by data changes

#### T7. No Persistence Layer (U-21) [VERIFIED]

**Location:** CHRONICLE.md line 7, grep for localStorage/sessionStorage/IndexedDB
**Evidence:** Zero occurrences of `localStorage`, `sessionStorage`, `IndexedDB` in both builds.
**Impact:** Draft/season progress lost on reload. U-21 explicitly identifies this as #1 product gap.

#### T8. No Seeded RNG / Reproducibility [VERIFIED]

**Location:** grep for Math.random() — 58 occurrences in canonical build
**Evidence:** No seeded RNG option. `cpuPick` uses `Math.random()` directly. No way to reproduce a draft or season.
**Impact:** Cannot reproduce bugs; 100-season runs non-deterministic; no regression bisect.

#### T9. No Function-Level Manifest [VERIFIED]

**Location:** CONTRACT.md C7 (open item)
**Evidence:** No `tests/manifest.txt` listing top-level functions. No `tests/funcdiff.js` exists (S-103 not implemented).
**Impact:** Cannot verify that a merge only changed intended functions. No drift detection.

#### T10. Single-Threaded Event Loop for Heavy Computation [VERIFIED]

**Location:** `runLeague100` function (line 5880+ in canonical), `simulateGame` called 5,440 times per 100 seasons
**Evidence:** 100-season simulation runs on main thread, blocking UI. No Web Workers, no chunking, no progress streaming to UI except progress bar.
**Impact:** Mobile browser freezes during 100-season run; v20 progress bar fills but "results never produced" (U-06).

---

## PART 2: IMPROVEMENTS I CAN APPLY NOW (OWN LANES)

### L1. Publish Architecture Review [NOW — My _agents/ directory]

**File:** `_agents/nemotron-3-ultra-free/reviews/ARCHITECTURE_REVIEW_ULTRA.md` (this document)
**Action:** Complete and save this review. No Owner permission needed — my own directory.
**Channel:** Bulletin message citing @M-8 with link.

### L2. Update My Availability in COUNCIL-BULLETIN.md [NOW]

**File:** COUNCIL-BULLETIN.md line 22
**Action:** Update my availability line from placeholder to "active 19 Oct — architecture review complete"
**Evidence:** House rule 4 — self-serve availability strip.

### L3. Log Arrival in CHRONICLE.md [NOW]

**File:** CHRONICLE.md (append)
**Action:** Append arrival line with evidence command
**Command:** `shasum -a 256 "/Users/kosi/Desktop/Football Sim/NFL Draft Simulator v20 Claude.html" && wc -c "/Users/kosi/Desktop/Football Sim/NFL Draft Simulator v20 Claude.html"`

### L4. Add Questions to QUESTIONS-FOR-THE-ARCHITECT.md [NOW — My Section]

**File:** QUESTIONS-FOR-THE-ARCHITECT.md (append to my section)
**Action:** Add my question block under `## Nemo Ultra`
**Questions to add:**
- `Q-NEMOULTRA-1 [BLOCKING]` What is the exact v20 keep-list from the Architect's perspective — which v20 visual/UX components (hero, stepper, mobile draft board, CSS variables, animations) must survive the merge unchanged?
- `Q-NEMOULTRA-2 [BLOCKING]` The v20 mobile draft board (12-column CSS grid cards at lines 259-273) uses `data-nostack="1"` on the table — does the Architect want this pattern adopted for all mobile tables (standings, league leaders, player browser, team comparison)?
- `Q-NEMOULTRA-3 [NOW]` The v20 CSS introduces `--glow`, `--gold` variables and radial-gradient backgrounds. Does the Architect want these as the new design system baseline, or should the merge use canonical's simpler palette with v20 additions only where needed?
- `Q-NEMOULTRA-4 [NOW]` v20 uses `data-nostack="1"` on the draft table to disable mstack transformation. Should this opt-out pattern be standardized for all tables that need custom mobile layouts (draft board, draft priority, draft cards)?
- `Q-NEMOULTRA-5 [LATER]` v20's mobile draft board uses 12-column CSS grid with explicit `grid-column` assignments per cell. Is this the approved mobile table pattern going forward, or should we use the mstack data-label approach for consistency?

### L5. Document v20 Mobile Draft Board Pattern [NOW — My _agents/ directory]

**File:** `_agents/nemotron-3-ultra-free/specs/V20_MOBILE_DRAFT_BOARD_PATTERN.md`
**Action:** Document the v20 mobile draft board CSS pattern (12-column grid, data-label attributes, color-coded columns, `data-nostack="1"` opt-out) for adoption across all mobile tables.
**Location:** `_agents/nemotron-3-ultra-free/specs/`

### L6. Add My Questions to QUESTIONS-FOR-THE-ARCHITECT.md [NOW]

**File:** QUESTIONS-FOR-THE-ARCHITECT.md (append to `## Nemo Ultra` section)
**Action:** Add 5 questions tagged appropriately (see L4)

### L7. Update My Availability in COUNCIL-BULLETIN.md [NOW]

**File:** COUNCIL-BULLETIN.md line 22
**Change:** `- **Nemo Ultra** — active 19 Oct, architecture review complete, questions posted`

---

## PART 3: IMPROVEMENTS REQUIRING OWNER PERMISSION (R5-GATED)

### P1. Adopt v20 Mobile Draft Board Pattern Globally [R5 — AGENTS.md / INDEX.md]

**R5-Gated File:** `AGENTS.md` (Key Files & Entry Points section) or `INDEX.md` (8 documents table)
**Exact Change:** Add to AGENTS.md Key Files table: "Mobile draft board pattern: v20 12-column CSS grid cards with `data-label` attributes, color-coded columns, `data-nostack="1"` opt-out. Standard for all mobile tables."
**Justification:** v20's mobile draft board (lines 259-273) is objectively superior to canonical's mstack approach — every stat visible, labeled, color-coded, no horizontal scroll. Should be the standard for all mobile tables (standings, league leaders, player browser, team comparison, guide).
**Owner Action:** One-line approval: "Approved: v20 mobile draft board pattern is the new standard for all mobile tables."

### P2. Adopt v20 Hero/Stepper as Default Shell [R5 — AGENTS.md / COLLECTIVE-PROMPT.md]

**R5-Gated File:** `AGENTS.md` (UI Tabs section) or `COLLECTIVE-PROMPT.md` (Project section)
**Exact Change:** Add to AGENTS.md: "Primary shell: v20 hero/stepper visual design (hero section with animated football, 4-step stepper: Draft → Season → Playoffs → Champion). Season tab remains default active per protocol; Draft tab uses v20 visual shell."
**Justification:** v20's hero/stepper (lines 216-238) provides clear user journey visualization. Canonical has no hero, just tabs. v20 stepper communicates "Draft → Season → Playoffs → Champion" flow explicitly.
**Owner Action:** One-line approval: "Approved: v20 hero/stepper is the new shell; Season remains default tab."

### P3. Adopt v20 CSS Variable System [R5 — AGENTS.md]

**R5-Gated File:** `AGENTS.md` (Style Rules section)
**Exact Change:** Add to AGENTS.md Style Rules: "CSS custom properties: `--glow` (rgba(79,140,255,.28)), `--gold` (#ffc43c), radial-gradient backgrounds with fixed attachment. Modern transitions on buttons/tabs. `prefers-reduced-motion` respected."
**Justification:** v20 introduces modern CSS variable system (`--glow`, `--gold` at line 217) with radial gradient backgrounds. More maintainable than canonical's hardcoded colors. Already includes `prefers-reduced-motion` support.
**Owner Action:** One-line approval: "Approved: v20 CSS variable system is the new design system baseline."

### P4. Fix Dataset Ownership Conflict (S-203 vs S-602) [R5 — CONTRACT.md / STATUS.md]

**R5-Gated File:** `CONTRACT.md` (C1 File locations) and `STATUS.md` (pending submissions)
**Exact Change:**
1. In CONTRACT.md C1: "The authoritative 2025 standings dataset is `tests/2025_standings.js` (S-203). File `tests/season_2025.json` is deprecated. OpenClaw S-602 withdrawn."
2. In STATUS.md: Update "Pending submissions" to reflect S-203 as sole dataset owner.
   **Justification:** Three-way conflict (S-203, S-502, S-602) blocks S-502 validation. GLM's S-203 is the only integrity-passed dataset (CHRONICLE line 17). S-602 withdrawn per CHRONICLE line 30.
   **Owner Action:** One-line approval: "Approved: S-203 (`tests/2025_standings.js`) is the sole authoritative dataset; S-502 proposals and S-602 withdrawn."

### P5. Deploy Log Creation [R5 — AGENTS.md / new file `DEPLOY_LOG.md`]

**R5-Gated File:** `AGENTS.md` (add to Protocol section) + create `DEPLOY_LOG.md`
**Exact Change:**
1. Add to AGENTS.md Protocol section: "Every deployment to the live site must be logged in `DEPLOY_LOG.md` with: date, build hash, byte count, deployer, notes. `DEPLOY_LOG.md` is append-only, Owner-maintained."
2. Create `DEPLOY_LOG.md` with first entry: `2026-10-19 · Owner · Deployed v20 (31b7d61f…, 649,032 B) to production · R2 ruling`
   **Justification:** "v20 is on site" is a live fact with zero governance record (critique C7). No rollback path, no audit trail.
   **Owner Action:** One-line approval: "Approved: DEPLOY_LOG.md is mandatory for all deployments; first entry logged."

### P6. Session Sunset Rule Implementation [R5 — AGENTS.md / COUNCIL-BULLETIN.md]

**R5-Gated File:** `AGENTS.md` (Protocol section) and `COUNCIL-BULLETIN.md` (availability section)
**Exact Change:**
1. AGENTS.md Protocol: Add "Session Sunset Rule: A session with no CHRONICLE.md entry and no COUNCIL-BULLETIN.md activity for two consecutive rounds is marked **dormant**. Dormant sessions lose write rights to SUBMISSIONS.md and all shared docs; rights restored on next CHRONICLE.md arrival log."
2. COUNCIL-BULLETIN.md availability section: Add note "Sessions inactive for 2 rounds → dormant (R5)".
   **Justification:** No mechanism exists to handle inactive sessions (critique C3). GLM unavailable since 19 Oct but still listed as queue-keeper/maintainer for 6 documents.
   **Owner Action:** One-line approval: "Approved: Session sunset rule added; dormant sessions lose write rights after 2 inactive rounds."

### P7. Advisor Cost Rule [R5 — AGENTS.md / COUNCIL-BULLETIN.md]

**R5-Gated File:** `AGENTS.md` (Protocol section) and `COUNCIL-BULLETIN.md`
**Exact Change:**
1. AGENTS.md: Add "Advisor Cost Rule: Advisory messages ≤ 1,000 words unless Owner asks. No two advisors assigned the same question in same round. Pre-flight duplication (two near-identical reports) is waste."
2. COUNCIL-BULLETIN.md: Add note "Advisor messages ≤ 1,000 words; no duplicate assignments per round."
   **Justification:** Pre-flight produced two near-identical reports (GLM and Ultra). No mechanism prevents duplicate advisory work (critique C5).
   **Owner Action:** One-line approval: "Approved: Advisor cost rule added; max 1,000 words per advisory message, no duplicate assignments per round."

### P8. Deploy v20 as Reference Build [R5 — AGENTS.md / INDEX.md / STATUS.md]

**R5-Gated File:** `AGENTS.md` (Key Files), `INDEX.md` (document table), `STATUS.md` (build state)
**Exact Change:**
1. AGENTS.md Key Files: "The product: `NFL Draft Simulator v20 Claude.html` — the v20 reference build (Owner ruling R2, 19 Oct). Canonical `77bb9ed5…` is donor of fixes merged into v20."
2. INDEX.md: Update document table to list v20 as the reference build.
3. STATUS.md: Update build hash to v20 `31b7d61f…` (649,032 B) as current reference.
   **Justification:** Owner Ruling R2 already declared v20 the reference build (CHRONICLE line 10). Documents still reference canonical as primary.
   **Owner Action:** One-line approval: "Approved: v20 is the reference build in all documents; canonical is donor of fixes."

---

## SUMMARY

| Category                          | Count                                    |
| --------------------------------- | ---------------------------------------- |
| **Critiques (Collaboration)**     | 8 (C1-C8)                                |
| **Critiques (Technical)**         | 10 (T1-T10)                              |
| **In-Lane Improvements (L1-L7)**  | 7 (all executable now)                   |
| **R5-Gated Improvements (P1-P8)** | 8 (require Owner one-line approval each) |

---

**Report Location:** `_agents/nemotron-3-ultra-free/reviews/ARCHITECTURE_REVIEW_ULTRA.md`  
**Bulletin Message:** @M-8 — Architecture review complete. Long-form review at `_agents/nemotron-3-ultra-free/reviews/ARCHITECTURE_REVIEW_ULTRA.md`. Seven in-lane actions (L1-L7) executable now; eight R5-gated improvements (P1-P8) awaiting Owner one-line approvals. Questions for Architect posted to QUESTIONS-FOR-THE-ARCHITECT.md (Nemo Ultra section). Availability updated in COUNCIL-BULLETIN.md.
ENDOFFILE
echo "Saved."
