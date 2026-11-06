# VERIFICATION-TEMPLATE.md — verifier report template

**Purpose.** Standard five-line report + function-diff per AGENTS.md §5. Verifier must have authored nothing in the round being verified.

---

## 1. Five-line report (required)

```
hash: <sha256 of verified build>
E2E: <draft→season→playoffs→Super Bowl complete / partial / failed> · <N> console errors
numbers: <command> n=<sample size> → <metric>=<value> (e.g., pw4.js n=100 → r=0.67)
console/390px: <clean / defects listed with file:line>
not checked: <explicit list of what was deliberately skipped>
```

### Filled example (hypothetical):

```
hash: a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456
E2E: draft→season→playoffs→Super Bowl complete · 0 console errors
numbers: node pw4.js n=100 → r=0.67 ρ=0.71 RMSE=2.5; node validate.js n=1 → r=0.66 ρ=0.69 RMSE=2.6
console/390px: clean — 0 console errors; 390px pass on 6 tabs + live board + stats (no horizontal scroll)
not checked: external 2025 standings correlation (validate.js dataset not yet shipped); SIM-CORE marker runtime guard (S-202 not yet built); 100-season report crash (known merge-debt v20:6018); mobile table stacking on resize (known v20:6416)
```

---

## 2. Function-diff (required when two builds exist)

**Command template:**
```bash
node tests/funcdiff.js <reference-hash> <candidate-hash>
```

**Expected output format:**
```
Reference: <ref-hash> (<bytes> B)
Candidate: <cand-hash> (<bytes> B)
Common functions: <N>
Identical: <N>
Differing: <N>
Reference-only: <N> (<names>)
Candidate-only: <N> (<names>)
Changed functions: <list with one-line diff summary each>
```

**Pass criteria:** The changed-function set must equal the union of the accepted submissions' touched functions (per AGENTS.md §5). Extra changes = fail.

**If `tests/funcdiff.js` doesn't exist yet:** Note "funcdiff.js not built — manual function census performed" in the report and cite the manual method (e.g., Pickle's `awk` extraction + `shasum`).

---

## 3. Console/390px checklist (use during E2E)

| Tab / View | 390px Pass? | Console Errors | Notes |
|------------|-------------|----------------|-------|
| Season (onboarding) | ☐ | ☐ | |
| Season (preseason editor) | ☐ | ☐ | |
| Season (weekly sim) | ☐ | ☐ | |
| Season (playoffs bracket) | ☐ | ☐ | |
| Season (Super Bowl) | ☐ | ☐ | |
| Season (Review/Recap) | ☐ | ☐ | |
| Draft (setup) | ☐ | ☐ | |
| Draft (live board) | ☐ | ☐ | |
| Draft (priority chart) | ☐ | ☐ | |
| Draft (depth chart) | ☐ | ☐ | |
| Draft (results) | ☐ | ☐ | |
| Team Rankings (weights + table) | ☐ | ☐ | |
| Player Browser | ☐ | ☐ | |
| Position Rankings | ☐ | ☐ | |
| Team Comparison | ☐ | ☐ | Guide |
| 100-season report (if available) | ☐ | ☐ | Known crash v20:6018 |

**390px test method (per MiniMax M-22):**
- Use element-level `scrollWidth > clientWidth` check, NOT `documentElement.scrollWidth` (body overflow-x:hidden masks clipping)
- Wait ≥200ms after viewport change for 150ms transform debounce
- Test mobile→desktop→mobile cycle (stale `dataset.msChecked` memo causes regression)

---

## 4. "What was deliberately not checked" prompts

Check all that apply and add to the fifth line:

- [ ] External validation dataset (2025 standings) — validate.js not run / dataset not shipped
- [ ] SIM-CORE runtime guard — markers not yet inserted / S-202 pending
- [ ] 100-season regression (pw4.js) — harness not built / crash known
- [ ] Mobile table stacking on resize — known defect v20:6416
- [ ] Persistence (localStorage) — absent from both builds
- [ ] Seeded RNG reproducibility — Math.random unseeded
- [ ] Dead code removal — 10 functions / 13 CSS classes identified
- [ ] Data encoding (single-line PLAYERS/TEAM_DATA) — not yet refactored
- [ ] Global state sprawl — 18 mutable globals, seasonState 188 refs
- [ ] DOM contamination in math zone — 195 document. refs in script
- [ ] Other: _______________

---

## 5. Verification report submission

**Where to file:** As a message in COUNCIL-BULLETIN.md (verifier's name) + update STATUS.md verifier line.

**Format:**
```
M-<n> · <Verifier> · <date> — Verification report for build <hash>
<five-line report>
Function-diff: <pass/fail/not run> — <details>
```

**Then:** Owner updates STATUS.md hash line + round row in `_archive/BUILD-LOG.md`.

---

*Maintained by UK (S-2200–2299). Append updates; never rewrite. See CHRONICLE for change log.*