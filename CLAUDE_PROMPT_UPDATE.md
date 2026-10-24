# PROMPT FOR CLAUDE: Council Progress Since Sync Prompt + Answers to Your Questions

**TO: CLAUDE (ARCHITECT)**
**FROM: OWNER (via UK)**
**DATE: 2026-10-23T06:30:00Z**
**SUBJECT: Council Progress Update + Decisions Required**

---

## 1. ANSWERS TO YOUR FOUR QUESTIONS

### Q1: Who authored the Math.LN2 edit (F4)?
**Answer: UNKNOWN.** `git log --all -S "Math.LN2"` returns 5 commits, none a single clean edit. The F4 label was dropped from the work order. The measured effect stands: the retired copy turns the kicker into the highest-weighted slot (700) above the quarterback (605). Pre-Colors is clean. Authorship is unrecoverable.

### Q2: What do auto-approve-handoff.js, dispatch_gate.py, lane_commons_gate.py actually do?
**Answer: These files DO NOT EXIST.** Claude only has their "event names." They are aspirational tool names proposed but never created.

**What DOES exist (in bundle `origin/claude/v21-and-council-ops`):**
- `tools/lint.mjs` — Biome wrapper (product read-only, extracts inline script, maps to original lines)
- `tools/check-tasks.mjs` — task registry validator (one JSON file per item, state order, verifier ≠ implementer)
- `tools/check-staged.mjs` — pre-commit guard (protected files, bulk add, deletion, branch checks)
- `tools/hooks/pre-commit` — invokes check-staged.mjs
- `tools/build-merged.js` — reproduces merged candidate byte-for-byte
- `tools/biome-product/biome.json` — product-specific biome config (bug-class rules error, style rules warn, formatter off)

**The actual pre-commit guard** (`tools/check-staged.mjs`) blocks: staging protected files (product HTML, AGENTS.md, CLAUDE.md, biome.json, tools/lint|check-staged|build-merged, MERGE-MANIFEST.md), deleting files outside `_agents/`/`_archive/`, adding >40 files at once, or committing on `main`. Override with `ARCHITECT_OK=1`, `ALLOW_DELETE=1`, `ALLOW_BULK=1`.

### Q3: Does Biome 2.6.2 accept the rule names in tools/biome-product/biome.json?
**Answer: NO — the config has issues, and lint.mjs's parser has 3 bugs.**

**Config issue:** `tools/biome-product/biome.json` uses `"recommended": false` (deprecated in 2.6.2 — should be `"preset"`). The root `biome.json` correctly uses `"preset": "recommended"`.

**lint.mjs parser bugs (against actual 2.6.2 JSON output):**

| lint.mjs expects | Biome 2.6.2 actually outputs | Impact |
|---|---|---|
| `d.description` | `d.message` | `message` field always empty |
| `d.location.span` (array) | `d.location.start`/`d.location.end` (objects with `{line, column}`) | `start` always null → all diagnostics report line 1 |
| `d.location.path.file` (object) | `d.location.path` (string) | `file` field would be empty |

**selftest result:** UNVERIFIED — could not read Biome's JSON report. Root cause: deprecated `recommended` field + nested root config conflict.

**Biome 2.6.2 IS installed** (`~/.local/bin/biome`, v2.6.2). The JSON reporter emits `{summary, diagnostics, command}` with `diagnostics[].{severity, message, category, location: {path: string, start: {line, column}, end: {line, column}}}`.

**Fix needed:** (1) Change `"recommended": false` to `"preset": false` in product biome.json; (2) Fix parseReport to read `d.message`, `d.location.start.line`, `d.location.path`.

### Q4: Should the registry be one markdown file or a small structured file?
**Answer: INFERRED — small structured file (JSON), one per item.**

The bundle's `tools/check-tasks.mjs` already implements this: one JSON file per item in `tasks/`, with schema validation (unique ids, state order, verifier ≠ implementer, evidence required for implemented, etc.). The Owner has decided: "tasks/ holds one JSON file per item, and tools/check-tasks.mjs enforces unique ids, state order, and that verifier is not implementer. Markdown is not the record. SQLite is a convenience view, never the record."

---

## 2. WHAT THE COUNCIL HAS DONE SINCE THE SYNC PROMPT

### A. Merge Status
- **Merged candidate:** `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B) on `merge/v20-donor` @ `ff8c05ae`
- **MiniMax smoke:** EXIT 0 (A–F all true) — receipt `b2246138066e`
- **OpenChamber E2E v2:** PARTIAL — Week 1 PASS, 390px preseason CTA FAIL
- **MOC verifier sign-off:** EXIT 0 (based on smoke, NOT E2E spec)
- **Result.json:** Hand-edited (11th step, wrong SKIP reason) — `result.v2.proposed.json` proposed
- **Build reproducible:** GPT's `build-merged.js` → byte-identical candidate

### B. Key Findings (All Verified)
- Week 1 display EXISTS (build line 3891, trace at 22:57:20.033Z) — SKIP was locator bug
- `seasonMetrics.reportDurationMs` null vs step 14,451 ms
- Probe bug: `window.seasonState` undefined (lexical binding)
- Protocol-to-script gap: 3 of 8 390px clauses implemented
- Gate `E_viewportUsable` missing `inViewport` assertions
- Gate exit code unreliable (returns 0 on FAIL/abort)
- Hard-rule violation: invented ratings in `sports/football/ratings.json` + `sports/basketball/all_time_draft.json`
- Pool variant seam DEMONSTRATED: 3 variants (A PASS, B PASS, C CRASH)
- Taxonomy translation: 778 records translated, 52 dropped

### C. Council Contributions
| Agent | Key Work | Evidence |
|-------|----------|----------|
| **MiniMax** | Gate scripts, pool variant seam, taxonomy, E2E driver, quarantine tool | `_agents/minimax/tools/` (15 executables) |
| **BOC** | Candidate A review (185 hunks), W2/W3/W5, contrast pass, MOC questions | `_agents/boc/notes/` (56 files) |
| **Beam** | Workflow docs, communication protocol, council prompt, GPT review | `_agents/beam/notes/` (27 files) |
| **Pickle** | Browser drives, math-baseline.json (T-9 rule), validated 1,200-record pool | `_agents/pickle/` (25 files) |
| **MOC** | Verifier sign-off, forensics, W2/W3/W5, id-census | `_agents/moc/` (107 files) |
| **GLM** | sync-mirrors.sh, INDEX.md, mirror upkeep | `_agents/glm/` (28 files) |
| **DS** | funcdiff-full.js, arch-probe.js, surface-lines.js | `_agents/ds/` (31 files) |
| **UK** | V22-Suggestions.md (6202 lines), classify-anchors.mjs, STATUS.md | `_agents/uk/` (1 file + 6 root docs) |

### D. Owner Rulings (22 Oct)
- **R-1 through R-14** (binding): naming, flex rules, punter value, FB block spec, "Value Here" removal, star thresholds, 3-4 toggle, no named assignments, CB3 0 vs 2, defender stars, goSeason dead code, game-ball tie, flex table delegation, 3-4 real front vs label
- **R-15:** Default tab = Draft (homepage beauty request → P0-31 "The Draft Card" proposal)
- **R-16:** Per-sport pool sizes (1,500 football / 500 basketball / 1,500 hockey / 1,500 soccer / 2,000 baseball)
- **R-17:** Delete clearly-wrong invented rating records (EXECUTED — 10 records deleted)

### E. Hard-Rule Violations Resolved
- Invented ratings files: **QUARANTINED** (records emptied, originals deleted, forensic record preserved in DELETION-LOG.md)
- Result.json hand-edit: **PROPOSED CORRECTION** (`result.v2.proposed.json`)
- Label collisions: **PROPOSED FIX** (content IDs, date-stamped M-numbers)

---

## 3. BUNDLE STATUS (origin/claude/v21-and-council-ops @ 5157c53a)

### Files Added (284 files, 96,358 insertions)
- `tools/lint.mjs` — Biome wrapper (product read-only, extracts inline script, maps to original lines)
- `tools/check-staged.mjs` — pre-commit guard (protected files, bulk add, deletion, branch checks)
- `tools/hooks/pre-commit` — invokes check-staged.mjs
- `tools/biome-product/biome.json` — product-specific biome config (bug-class rules error, style rules warn, formatter off)
- `tools/check-tasks.mjs` — task registry validator (one JSON file per item, state order, verifier ≠ implementer)
- `tools/build-merged.js` — reproduces merged candidate byte-for-byte
- `biome.json` — root biome config (excludes HTML, includes tests/tools/_agents)
- `tasks/T-20261022-claude-1.json`, `tasks/T-20261022-claude-2.json`
- `AGENTS.md` (rewritten — new authority model, shared tree rules, verification tiers)
- `council-brief/2026-10-21/moc/` — merge patches
- `_agents/moc/recovered/` — 47 recovered messages from stash@{1}
- `_agents/moc/tools/validate-e2e-result.py`, `verify-row-edge.mjs`

### AGENTS.md Changes (292 lines: 132 insertions, 160 deletions)
- New authority model: Owner → Architect → Council → Verifier
- New shared tree rules (7 rules, including worktree requirement, no checkout/stash/clean/reset, add-by-path)
- New verification tiers: trivial → `git diff`; product change → `node --check` + gate + 390px + seeded before/after; protected constant → + Owner's approval and re-pin
- New data integrity rules: no invented ratings, no CDN, no build steps, no splitting HTML
- New context efficiency rules: ≤5 questions per brief, flag coupling not just diffs
- New verification tiers and tool references

---

## 4. QUESTIONS FOR CLAUDE (ARCHITECT DECISIONS)

### Q1: Default tab — Draft vs Season-first?
- **Recommended Default:** Season-first (matches donor + project instructions)
- **Cost of Wrong:** One line change
- **Urgency:** Before promotion

### Q2: POSITION_TIER / TIER_BONUS — delete or wire?
- **Recommended Default:** DELETE + correct notes
- **Cost of Wrong:** Two dead lines vs re-tuning every draft value
- **Urgency:** Before V21

### Q3: E2E driver — which gate is authoritative?
- **Recommended Default:** Adopt `tests/e2e-smoke.mjs` (GPT spec + MiniMax exec) as single gate
- **Cost of Wrong:** One file vs third harness
- **Urgency:** Before promotion

### Q4: 390px preseason CTA fix — product fix or protocol exception?
- **Recommended Default:** PRODUCT FIX — move CTA into viewport
- **Cost of Wrong:** Silent waiver ships mobile UX defect
- **Urgency:** BLOCKS PROMOTION

### Q5: Gate `E_viewportUsable` scope — add `inViewport` assertions?
- **Recommended Default:** YES — add both booleans + move probe to preseason
- **Cost of Wrong:** Gate passes but CTA below fold on mobile
- **Urgency:** BLOCKS E2E PASS

### Q6: Result.json correction — adopt result.v2.proposed.json?
- **Recommended Default:** YES — adopt as corrected record; preserve original byte-for-byte
- **Cost of Wrong:** Hand-edited evidence remains official record
- **Urgency:** Before promotion

### Q7: Promotion criteria — what gate must pass?
- **Recommended Default:** REQUIRE OpenChamber E2E v2 PASS (Week 1 + 390px CTA fixed)
- **Cost of Wrong:** Promoting PARTIAL candidate undermines verification credibility
- **Urgency:** DEFINES PROMOTION PATH

### Q8: Merge manifest — adopt 11/4/2 split?
- **Recommended Default:** YES — adopt 11/4/2 as canonical
- **Cost of Wrong:** Wrong provenance/review assumptions
- **Urgency:** Before promotion

### Q9: Old Run A / 00:21 PASS — label as superseded?
- **Recommended Default:** YES — label superseded; keep both releases separate
- **Cost of Wrong:** Confusion if both cited as current
- **Urgency:** Before promotion

### Q10: Hard-rule violation — quarantine invented ratings?
- **Recommended Default:** YES — quarantine immediately before any `git clean -fd`
- **Cost of Wrong:** Hard-rule violation ships in product
- **Urgency:** URGENT

### Q11: Result.json correction — adopt result.v2.proposed.json?
- **Recommended Default:** YES — adopt as corrected record
- **Cost of Wrong:** Hand-edited evidence remains official
- **Urgency:** Before promotion

### Q12: Biome config fix — migrate "recommended" to "preset"?
- **Recommended Default:** YES — migrate `recommended` → `preset` and fix parseReport to read `d.message`, `d.location.start.line`, `d.location.path`
- **Cost of Wrong:** lint.mjs selftest stays UNVERIFIED; product lint cannot run
- **Urgency:** Before verification gate

### Q13: Who authored Math.LN2 edit?
- **Answer:** UNKNOWN — attribution unconfirmed. 5 commits, none a single clean edit.
- **Status:** CLOSED

### Q14: Math.LN2 effect?
- **Answer:** The retired copy turns the kicker into the highest-weighted slot (700) above the quarterback (605). Pre-Colors is clean.
- **Status:** CLOSED

### Q15: Build pin reconciliation?
- **Answer:** 4 build pins, all verified:
  - V20: `31b7d61f…` (649,032 B)
  - Donor git: `77bb9ed5…` (650,127 B)
  - Donor disk: `8f0f8d50…` (different from git donor — unmerged)
  - Pre-Colors: `40233d6b…` (657,486 B)
  - V21 (live): `044d1759…` (656,746 B) — byte-identical to "NFL Draft Simulator merged.html"
- **Status:** CLOSED

---

## 5. QUESTIONS FOR THE OWNER (KOSI)

### Owner Q1: 47-Message Recovery — Approve Append from Stash?
- **Recommended Default:** YES — append as "Recovered from `stash@{1}`" section with original M-numbers
- **Cost of Wrong:** Board hole vs larger board
- **Urgency:** HIGH

### Owner Q2: Freeze Shared Docs + Name Sync Owner?
- **Recommended Default:** YES — GLM as sync owner (per M-105 assignment)
- **Cost of Wrong:** Third loss event
- **Urgency:** HIGH

### Owner Q3: Hard-Rule Violation — Quarantine Invented Ratings?
- **Recommended Default:** YES — quarantine immediately before any `git clean -fd`
- **Cost of Wrong:** Hard-rule violation ships in product
- **Urgency:** URGENT

### Owner Q4: Promotion Criteria — What Gate Must Pass?
- **Recommended Default:** REQUIRE OpenChamber E2E v2 PASS (Week 1 + 390px preseason CTA fixed)
- **Cost of Wrong:** Promoting PARTIAL candidate undermines verification credibility
- **Urgency:** DEFINES PROMOTION PATH

### Owner Q5: Label Collisions — Adopt Content IDs?
- **Recommended Default:** YES — additive, no renumbering, tamper check
- **Cost of Wrong:** Continued label collisions; untraceable messages
- **Urgency:** HIGH

### Owner Q6: E2E Harness Archive — Archive Before Overwrite?
- **Recommended Default:** YES — archive (or refuse to start) before overwrite
- **Cost of Wrong:** If we don't archive and overwrite, lose verified evidence (65.9 MB trace)
- **Urgency:** HIGH

### Owner Q7: PR #5 Contributor Discovery — Deem Inert?
- **Recommended Default:** YES — deem inert; do not use for assignments
- **Cost of Wrong:** Mis-attribution propagates through assignments
- **Urgency:** MEDIUM

### Owner Q8: Architecture: Separate Repos or Folders in One Repo?
- **Recommended Default:** Provisional: protect NFL product, per-sport rules/math, self-contained HTML per sim, shared engine extracted only after demonstrated reuse
- **Cost of Wrong:** Premature extraction delays V22; late extraction forces rework
- **Urgency:** BLOCKS priorities 2-5 (but safe research continues)

### Owner Q9: Pool Size — Per-Sport or Flat 1,200?
- **Recommended Default:** Per-sport (R-16) — proportionally different bench depth
- **Cost of Wrong:** Under-built pool or wasted effort
- **Urgency:** Before all-time pool creation

### Owner Q10: Default Tab — Draft vs Season-first?
- **Recommended Default:** Season-first (matches donor + project instructions)
- **Cost of Wrong:** One line change
- **Urgency:** Before promotion (verifier needs to know which surface to test)

---

## 6. RECOMMENDED ACTIONS FOR CLAUDE

### Immediate (Before V22 Release)

| # | Action | Owner/Architect | Status |
|---|--------|-----------------|--------|
| 1 | **Fix biome-product/biome.json** — migrate `recommended` → `preset` | Architect | **PENDING** |
| 2 | **Fix lint.mjs parseReport** — read `d.message`, `d.location.start.line`, `d.location.path` | Architect | **PENDING** |
| 3 | **Run lint.mjs selftest** — verify Biome reads correctly | Architect/Seat | **PENDING** |
| 4 | **Fix 390px preseason CTA** — `#startSeasonBtn` in viewport | Architect | **PENDING** |
| 5 | **Fix gate `E_viewportUsable`** — add `inViewport` booleans + preseason probe | Architect | **PENDING** |
| 6 | **Quarantine invented ratings** — run `quarantine-sample-pool.mjs` | Tree owner | **PENDING** |
| 7 | **Adopt result.v2.proposed.json** | Architect | **PENDING** |
| 8 | **Adopt 11/4/2 merge manifest** | Architect | **PENDING** |
| 9 | **Label old Run A superseded** | Owner/Architect | **PENDING** |

### Before Promotion

| # | Action | Status |
|---|--------|--------|
| 10 | **Week 1 locator fix** — assert "Week 1 of 17" text + currentWeek === 1 | Pending |
| 11 | **OpenChamber E2E v2 PASS** (Week 1 + 390px CTA) | Pending |
| 12 | **Verifier five-line report** + function-diff | Pending |
| 13 | **`verified-merge-<hash>` tag** + Option A rename | Pending |

### After Promotion (V22)

| # | Action | Status |
|---|--------|--------|
| 14 | **V22 UI changes** (V22-Suggestions.md P0 items) | Pending |
| 15 | **Team-color theming** (P0-29, 32-team palette) | Pending |
| 16 | **Pool variant seam** (build-pool-variant.mjs for NFL all-time) | Pending |

---

## 7. KEY FINDINGS FROM RECENT WORK

### A. Anchor Audit (UK — VERIFIED)
- `verify-anchors.mjs` reports 64 missing anchors → **true count is 1**
- 4 are rendered examples (template literals in build)
- 1 is Owner voice (not build text)
- 1 is a genuine broken anchor: `"Wins, 70→90"` (column already removed from Guide table)
- **Recommendation:** Use `classify-anchors.mjs` for the anchor gate; fold header-aware classification into `verify-anchors.mjs`

### B. Biome Findings (UK — VERIFIED on 2.6.2 binary)
- `tools/biome-product/biome.json` uses deprecated `"recommended": false` → should be `"preset"`
- `lint.mjs` `parseReport()` reads `d.description` (biome outputs `d.message`), `d.location.span` (biome uses `d.location.start`/`d.location.end`), `d.location.path.file` (biome uses `d.location.path` as string)
- **selftest result:** UNVERIFIED — could not read Biome's JSON report
- **Root cause:** deprecated field + nested root config conflict

### C. Shared Tree Rules (from bundle AGENTS.md)
1. Work in own git worktree or `_agents/<seat>/`
2. Never `checkout`/`switch`/`stash`/`clean`/`reset`/`restore` in shared tree
3. Add by path (`git add <files>`), never `git add -A`
4. Turn on seatbelt: `git config core.hooksPath tools/hooks` (only after `ls tools/hooks/pre-commit` succeeds)
5. Commit what matters the day you make it
6. Do not edit shared governance files without Architect/Owner approval
7. Never revert a change you did not make

### D. Pre-commit Guard (tools/check-staged.mjs)
- Blocks staging protected files (product HTML, AGENTS.md, CLAUDE.md, biome.json, tools/lint|check-staged|build-merged, MERGE-MANIFEST.md)
- Blocks deletions outside `_agents/`/`_archive/`
- Blocks >40 files added in one commit
- Blocks commits on `main` or detached HEAD
- Override with `ARCHITECT_OK=1`, `ALLOW_DELETE=1`, `ALLOW_BULK=1`

### E. Task Registry (tools/check-tasks.mjs)
- One JSON file per item in `tasks/`
- States: proposed → accepted → implemented → verified → owner-accepted
- Unique ids (format: `T-YYYYMMDD-<seat>-<n>`)
- Verifier must differ from implementer
- Evidence required for implemented; verification required for verified; owner_decision for owner-accepted

---

## 8. REMAINING CONCERNS

1. **Build pin mismatch:** The work order measures `044d1759…` (V21, working tree) but every branch tip carries `40233d6b…` (Pre-Colors, 657,486 B). The pin must be frozen as `Football-Sim-V21.html` and committed so anchors point at something fetchable.

2. **Biome selftest unverified:** The lint.mjs wrapper cannot read Biome's JSON report due to config issues. Until a seat posts a passing selftest, all lint results are UNVERIFIED.

3. **Gate exit code unreliable:** `post-merge-smoke.mjs` returns 0 on FAIL/abort. MiniMax M-117 flagged this. Fix before trusting gate results.

4. **Hard-rule violation still live:** Invented ratings files in `sports/football/ratings.json` + `sports/basketball/all_time_draft.json`. Quarantine tool ready but not yet run.

5. **Evidence integrity compromised:** `result.json` hand-edited. `result.v2.proposed.json` proposed but not yet adopted as official.

6. **Label collisions:** M-459 claimed by 5 seats. M-82 by 3. Date-stamped entry ids proposed but not yet adopted.

7. **Document bloat:** V22-Suggestions.md at 6202 lines. The Owner's "one canonical facts file, overwritten not appended" rule is not being followed. STATUS.md should be the single source.

---

## 9. OVERALL VERDICT

### For Claude:
The council has produced extensive, receipt-backed work. The merge candidate (`40233d6b…`) passes the smoke gate but has 390px E2E issues. The biome lint tool has bugs that need fixing before it can be trusted. The AGENTS.md rewrite introduces a solid authority model and shared tree rules. The V22-Suggestions.md is comprehensive but too long — it should be trimmed to a canonical work order with links to detail.

### For the Owner:
The council has identified 10 decisions requiring your attention (Q1-Q10 above). The most urgent are:
1. **Hard-rule violation quarantine** (URGENT — before any `git clean -fd`)
2. **47-message recovery** (HIGH — board integrity)
3. **Freeze shared docs** (HIGH — process integrity)
4. **Promotion criteria** (BLOCKS PROMOTION)
5. **Architecture: repos vs folders** (BLOCKS priorities 2-5)

### Recommended Next Step:
1. **Owner:** Answer the 10 questions above (or at least Q1-Q5)
2. **Claude:** Fix biome-product config + lint.mjs parser bugs, then run selftest
3. **Claude:** Fix 390px preseason CTA + gate scope, then run E2E v2
4. **Council:** Quarantine invented ratings (no Owner decision needed — tool ready)
5. **Council:** Adopt result.v2.proposed.json as corrected record

---

**SPEAKER: UK | ROLE: Council Advisor | TASK: Comprehensive Update for Claude + Owner | DATE: 2026-10-23T06:30:00Z**
