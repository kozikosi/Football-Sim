# S-202 SIM-CORE Markers Implementation Guide

## Purpose

Guide for adding /_SIM-CORE-START_/ ... /_SIM-CORE-END_/ markers to `NFL Draft Simulator.html` and moving three behavior-preserving functions into the SIM-CORE. This is Round 1 entry item S-202, and it is the **foundation for everything else** in Round 1A (S-202 → S-203 → S-103 → S-102 → S-301).

## Effective Build

`77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f` (650,127 bytes)

## Marker Placement

Add the following marker pairs around the SIM-CORE code section in `NFL Draft Simulator.html`. The markers are HTML comments that identify the SIM-CORE boundary for `pw4.js`, `run_all.sh`, and other extraction tools.

### Marker Format

```html
/* SIM-CORE-START */
/* SIM-CORE-END */
```

### Placement in NFL Draft Simulator.html

Insert the markers as follows (exact line numbers may vary depending on build version):
1. **Find the existing DOM-free code section** that contains the draft simulation logic
2. **Insert `/* SIM-CORE-START */`** on the line immediately **before** the first function/logic line of the SIM-CORE section
3. **Insert `/* SIM-CORE-END */`** on the line immediately **after** the last function/logic line of the SIM-CORE section

### Three Functions to Move into Core

The following three functions should be **behavior-preserving moves** — their logic is unchanged, but they are relocated within the SIM-CORE boundary:

| Function Name           | Purpose                                                  | Current Location               | New Location                                              |
| ----------------------- | -------------------------------------------------------- | ------------------------------ | --------------------------------------------------------- |
| `buildDraftState`       | Builds the draft state from player data and team rosters | Outside SIM-CORE (in UI layer) | **Inside** `/* SIM-CORE-START */ ... /* SIM-CORE-END */`  |
| `simulateDraftHeadless` | Headless draft simulation (no UI rendering)              | Outside SIM-CORE               | **Inside** `/* SIM-CORE-START */ ... /* SIM-CORE-END */`  |
| `buildLeagueFromDraft`  | Builds league standings/results from draft results       | Outside SIM-CORE               | **Inside** `/* SIM-CORE-START */ ... /* SIM-CORE-END */** |

### Implementation Steps

1. **Locate the SIM-CORE section** in `NFL Draft Simulator.html`
   - Search for DOM-free draft simulation code
   - Identify the start and end of the core logic block

2. **Insert markers:**

   ```html
   /* SIM-CORE-START */
   [first line of SIM-CORE logic]
   ...
   [last line of SIM-CORE logic]
   /* SIM-CORE-END */
   ```

3. **Move the three functions:**
   - Cut `buildDraftState` from its current location
   - Paste it inside the `/* SIM-CORE-START */ ... /* SIM-CORE-END */` block
   - Cut `simulateDraftHeadless` from its current location
   - Paste it inside the `/* SIM-CORE-START */ ... /* SIM-CORE-END */` block
   - Cut `buildLeagueFromDraft` from its current location
   - Paste it inside the `/* SIM-CORE-START */ ... /* SIM-CORE-END */` block

4. **Verify behavior preservation:**
   - Run `node --check` on the modified HTML extraction
   - Run a full draft → season → playoffs simulation
   - Compare outputs before and after marker placement to ensure no behavioral changes

### Verification

After marker placement, verify:

| Check                         | Method                       | Expected                                            |
| ----------------------------- | ---------------------------- | --------------------------------------------------- |
| `pw4.js` can extract core     | Run `node tests/pw4.js`      | No DOMAccessError; core extracted successfully      |
| `run_all.sh` can extract core | Run `bash tests/run_all.sh`  | All 30/32/34 test paths pass                        |
| No behavioral changes         | Full season sim before/after | Identical results (within floating-point tolerance) |
| Three functions moved         | Code diff                    | Three functions relocated; logic unchanged          |

### Dependency Chain

S-202 (SIM-CORE markers) is the **first item** in the Round 1A dependency chain:

```
S-202 → S-203 → S-103 → S-102 → S-301
```

Without S-202 markers, `pw4.js` and `run_all.sh` cannot extract the core, and no statistical claims can be made. S-202 must be certified before any other Round 1A items can be dispatched.

### On Git

This guide is published on Git for all agents and Claude to read:
- **File:** `S-202_SIM-CORE_MARKERS_GUIDE.md`
- **Commit:** f579713 (or latest on main)
- **Readable by:** Claude directly from GitHub (no paste required)
- **Related:**
  - `NEW_WORKFLOW_ROUND1.md` — S-202 is the first item in the 1A chain
  - `INTEGRATION_AUDIT_LIGHTNING.md` — Audit Risk #1 (SIM-CORE extraction) relates to this
  - `NEW_GIT_WORKFLOW.md` — Claude can read this guide from Git

### Quick Reference Checklist

- [ ] Markers inserted: `/* SIM-CORE-START */` and `/* SIM-CORE-END */`
- [ ] Three functions moved: `buildDraftState`, `simulateDraftHeadless`, `buildLeagueFromDraft`
- [ ] `node --check` clean on extracted script block
- [ ] Full draft → season → playoffs simulation passes
- [ ] S-202 certified — Round 1A can proceed to S-203

---

_This guide is effective upon publication on Git. S-202 certification is required before Round 1A dispatch. The markers and function moves are behavior-preserving — no logic changes, only relocation within the SIM-CORE boundary._
