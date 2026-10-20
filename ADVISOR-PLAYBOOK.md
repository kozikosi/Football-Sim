# ADVISOR-PLAYBOOK.md — quick reference for council advisors

**Purpose.** A 2–3 page cheat-sheet for common operations. Read ONBOARDING.md first for the joining ritual; this is the daily reference.

---

## 1. Writing a submission (SUBMISSIONS.md)

**Format (self-contained — Claude sees only what the user pastes):**
```
### S-<ID> — Title (type: assessment|improvement|question)
- **Proposed:** <date> · **By:** <name> · **Applies to build:** <sha256> (<bytes> B, per STATUS.md)

**Problem:** One paragraph.

**Proposal:** What to change, with exact code if product change.

**Blast radius:** What else calls this / could regress.

**Evidence:** Command + sample size + code path. Numbers without these = prose (mark as such).

**Checked:** `node --check` result, simulation run, or "untested".

**Status:** pending
```

**Key rules (from SUBMISSIONS.md §11):**
- Use your ID block (UK = S-2200–2299)
- Quote exact current code being replaced, then full replacement
- One topic per entry
- Never edit another agent's section

---

## 2. Function extraction + hashing (for funcdiff / math-gate)

```bash
# Extract a single function by name (whole function, handles nested)
awk '/^function cpuPick\(\)/,/^}$/' "NFL Draft Simulator v20 Claude.html" | shasum -a 256

# Or for arrow functions / const
awk '/const cpuPick = \(\) => \{/,/^};/' "NFL Draft Simulator v20 Claude.html" | shasum -a 256

# Count Math.random occurrences vs lines
grep -c "Math.random()" file.html          # occurrences
grep -n "Math.random()" file.html | wc -l  # lines
```

**Pickle's method (Round-2/3):** `awk`-function-extract + `shasum` on v20 vs donor — produces byte-identical hashes for 8/8 protected functions.

---

## 3. Filing a question (QUESTIONS-FOR-THE-ARCHITECT.md)

**Placement:** Append your own `## <YourName>'s questions` block before the ANSWERS section.

**Numbering:** `Q-<YourName>-1`, `Q-<YourName>-2`…

**Tags (required):**
- `[BLOCKING]` — needed before merge/round can proceed
- `[NOW]` — needed before Round 1 dispatch
- `[LATER]` — post-merge
- `[OPEN]` — whenever Architect gets to it

**Example:**
```
### 1 — Merge resolution `[BLOCKING]`
- **Q-UK-1** `[BLOCKING]` The DS keep-oracle shows 14 differing functions. Which parent for each?
```

---

## 4. Reading CHRONICLE.md (tracing decisions)

- **Format:** `YYYY-MM-DD <session> · <what happened> · <evidence>`
- **Find build hash for a claim:** Search for the session + date; the evidence column has the `shasum` command
- **Trace a ruling:** Search CHRONICLE for "Owner · R<n>" or "Architect" — rulings are recorded verbatim-pointer style
- **Line numbers without hash = rumour** (G2 discipline)

---

## 5. Verification checklist (AGENTS.md §5)

When assigned as verifier (authored nothing in the round):

| Step | Command / Action | Pass Criteria |
|------|------------------|---------------|
| 1. Syntax | `node --check <extracted-script.js>` | No errors |
| 2. E2E | Open HTML in browser → full draft (32 teams, 26 rounds) → 17-week season → playoffs → Super Bowl | Completes, 0 console errors |
| 3. 390px | DevTools device toolbar → 390px width → navigate all tabs (Season, Draft, Rankings, Browser, Comparison, Guide) | No horizontal scroll, no overflow |
| 4. Console | DevTools Console tab during E2E | Clean (only expected logs) |
| 5. Report | Write 5-line report + function-diff (if two builds) | See VERIFICATION-TEMPLATE.md |

---

## 6. Mirror sync (when editing shared docs)

```bash
# After editing any of the 9 default docs:
sh tools/sync-mirrors.sh --check

# Default set: AGENTS.md, STATUS.md, COLLECTIVE-PROMPT.md, ONBOARDING.md,
# CHRONICLE.md, COUNCIL-BULLETIN.md, QUESTIONS-FOR-THE-ARCHITECT.md,
# GOVERNANCE-ROUNDTABLE.md, SUBMISSIONS.md
```

**Rule:** The session that edits a shared doc runs sync in the same pass (bulletin M-11 Baton section).

---

## 7. Evidence vocabulary (non-negotiable)

| Word | When to use |
|------|-------------|
| *reported* | Another session's message says X; you haven't run the command |
| *inferred* | You deduced X from evidence but didn't measure directly |
| *unverified* | You have no evidence at all — pure speculation |
| *measured* | You ran the command; cite command + output + sample size |

**Never** state a number without its unit (lines / occurrences / files / bytes). DS M-11 vs Pickle M-9 disagreed for an afternoon over `grep -c` vs `grep -o \| wc -l`.

---

## 8. Quick commands reference

| Task | Command |
|------|---------|
| v20 hash + size | `shasum -a 256 "NFL Draft Simulator v20 Claude.html" && wc -c "NFL Draft Simulator v20 Claude.html"` |
| donor hash + size | `shasum -a 256 "NFL Draft Simulator.html" && wc -c "NFL Draft Simulator.html"` |
| SIM-CORE markers | `grep -c "SIM-CORE-START" "NFL Draft Simulator v20 Claude.html"` |
| localStorage check | `grep -c "localStorage" "NFL Draft Simulator v20 Claude.html"` |
| Function census | `grep -c "^function " "NFL Draft Simulator v20 Claude.html"` |
| DOM refs in script | `sed -n '448,6435p' "NFL Draft Simulator v20 Claude.html" \| grep -c "document\."` |

---

## 9. Protected constants (never change without Owner approval)

`DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC` coefficients, `PLAN_K`, `RATING_SPECS`

---

## 10. Critical invariants (never break)

1. `modelWeights()` = inverse of `slotWinsPerOvr()` (700 scale derived, QB=700)
2. CPU draft replacement floor = 76 OVR (`rlow` in `cpuPick`)
3. `effOvr(player, slot)` used everywhere (draft board, lineup, season, game sim)
4. User + CPU both use `optimalLineup()` (Hungarian, flex-aware)
5. Game plans independent: offense/defense chosen separately, scored vs *expected* opponent plan
6. `POINTS_PER_WIN = 32.5` · `SEASON_RECORD_CAPS` at real NFL records
7. NFL tiebreakers in `sortStandings()` (H2H → div → conf → point diff)

---

*Maintained by UK (S-2200–2299). Append updates; never rewrite. See CHRONICLE for change log.*