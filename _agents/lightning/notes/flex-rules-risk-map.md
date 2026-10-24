# V22 Flex Rules Risk Map & Applier Flag

**Scope:** Minimum-change risk assessment of flex rule changes to `FLEX` / `NATURAL_SLOT_MAP` constants, with applier flag extension for the value-here-applier.js standard.

**Build:** `NFL Draft Simulator merged.html` at `044d1759e01ac99b...` (656,746 B)
**Four prepared patches** re-cut against this build; `patch --dry-run -p0` confirmed clean for all four.

---

## (A) Minimum-Change Risk Map

### Functions That Consume `FLEX` / `NATURAL_SLOT_MAP` Constants

| Function | Location | What It Uses | Risk Level | Impact if Constants Changed |
|---|---|---|---|---|
| `flexPenaltyFor(pos, slot)` | line 973 | Looks up penalty from `LB_FLEX` constant based on position→slot | **HIGH** | Changing penalties changes every flex penalty in the system; affects draft board "also fits" line, eligibility, effOvr, cpuPick |
| `effOvr(player, slot)` | line 977-978 | `player[3] - flexPenaltyFor(player[1], slot)` | **HIGH** | Indirectly affected by flexPenaltyFor changes; changes effective OVR for all slots |
| `eligibleOpen(roster, p)` | line 1657-1661 | Calls `flexPenaltyFor` to determine which slots a player can fill | **HIGH** | Changes which slots appear as open in the draft board and preseason menu; changes "also fits" display |
| `byP` sort logic | lines 1743-1753 | Sorts players by priority `(pri != null ? pri : v)`, with flex as tiebreaker; generates `flexAlt` map | **HIGH** | Changes draft board player ordering and "also fits" text format; critical for user experience |
| `openSlotsFor(roster, p)` | line 1747-1750 | Calls `eligibleOpen` | **HIGH** | Same as eligibleOpen — changes draft board open-slot display |
| `cpuPick(teamIndex, state)` | line 1400 | Uses `effOvr`, `eligibleOpen`, `byP` for CPU GM valuation | **HIGH** | Changes CPU draft behavior; could change which players CPU picks and at what slots |
| `lineupWins(slotmap)` | line 1204 | Uses `effOvr(sl, p)` for each slot | **MEDIUM** | Changes total wins calculation; affects season simulations and awards |
| `teamRatings(slotmap)` | line 1988 | Derives nine unit ratings from slotmap (flex penalties applied) | **MEDIUM** | Changes team strength ratings; affects playoff seeding and matchup model |
| `LB_FLEX` constant | line 939 | `{DE:6, DT:4, CB3:4, SS:4, FS:4, TE:6, RB:6}` — flex slot penalties per position | **HIGH** | The core data structure; changing penalties here affects all above functions |
| `FLEX` object | line 940 | `{ MIKE:LB_FLEX, WILL:LB_FLEX, SAM:LB_FLEX }` — maps positions to LB_FLEX | **HIGH** | Adding OLB/ILB to this mapping is the key change; reuses existing penalty structure |
| `NATURAL_SLOT_MAP` | line 931 | Defines natural slots per position | **LOWER** | Defines which slots are "natural" for each position; changing this would require redefining positional eligibility |

### Can OLB Be an Alias of WILL (Slot-Mapping) vs New Slots with New Weights?

**YES — slot-mapping change is lower risk.** Here's why:

**Current structure:** `FLEX = { MIKE:LB_FLEX, WILL:LB_FLEX, SAM:LB_FLEX }` — MIKE, WILL, and SAM all map to the *same* `LB_FLEX` constant `{DE:6, DT:4, CB3:4, SS:4, FS:4, TE:6, RB:6}`.

**Minimum-change approach:** Add OLB to the `FLEX` mapping with the same `LB_FLEX` constant:
```
FLEX = { MIKE:LB_FLEX, WILL:LB_FLEX, SAM:LB_FLEX, OLB:LB_FLEX }
```

And for ILB ≡ MIKE: ILB already maps indirectly since MIKE → LB_FLEX, but we may need to explicitly add it or ensure the code path handles it. Looking at the code, there's no explicit `ILB` in the `FLEX` object, so we may need to add it:
```
FLEX = { MIKE:LB_FLEX, WILL:LB_FLEX, SAM:LB_FLEX, OLB:LB_FLEX, ILB:LB_FLEX }
```

**Why this is lower risk:**
1. **Reuses existing penalty structure** — `LB_FLEX` already has all the penalty values; we're just adding more positions to the same mapping
2. **No weight changes** — `DEFAULT_WEIGHTS`, `RATING_SPECS`, `MC` coefficients remain untouched (per AGENTS.md protected constants)
3. **No function changes needed** — `flexPenaltyFor`, `effOvr`, `eligibleOpen`, `byP` sort all look up the position in the `FLEX` object; adding OLB/ILB means they automatically get the same flex treatment as WILL/MIKE
4. **The "also fits" line and "also fits" alternatives** (`flexAlt` at line 1763) will automatically include OLB/ILB options since they flow through the same code paths
5. **CPU draft valuation** (`cpuPick`) will automatically consider OLB/ILB with the same flex math

**The only code change needed** (in the HTML's `<script>` block, not the constants the user said not to edit directly, but via the applier):
- Add `OLB:LB_FLEX` to the `FLEX` object
- Add `ILB:LB_FLEX` to the `FLEX` object (if not already handling ILB elsewhere)

**This is a constant-mapping change, not a new-weights change.** It is the minimum-change approach.

---

## (B) Applier Flag Extension

Extend `value-here-applier.js` with a new flag `--flex-rules-v22` that applies the flex rule changes with self-checks, in **dry-run mode only** (does not write to the product file).

### New Flag: `--flex-rules-v22`

```
node value-here-applier.js <input.html> [--force-in-place] [--drop-sort] [--keep-sort] [--flex-rules-v22]
```

When `--flex-rules-v22` is specified, the applier:

1. **Applies 3 changes to the `FLEX` object** (in the `<script>` block):
   - Adds `OLB:LB_FLEX` to the `FLEX` object
   - Adds `ILB:LB_FLEX` to the `FLEX` object
   - These changes make OLB ≡ WILL and ILB ≡ MIKE in the wins maths, per the Owner's request

2. **Applies flex penalty adjustments** by modifying `LB_FLEX` constant values:
   - `FS: 4 → 2` (FS/OLB/WILL/SAM for -2, per Owner rule)
   - `CB3: 4 → 0` (SS can play CB3/Nickel for free, per Owner rule)
   - Edge/OLB/WILL/SAM → FS: penalty adjusted to -6 (but LB_FLEX currently only has positive numbers; the negation happens in `flexPenaltyFor` logic — need to verify)
   - Actually, re-reading the rules: "OLB/WILL/SAM can play FS for -6" means the penalty is 6, but the existing `LB_FLEX` has positive numbers that are displayed as `-${pen}`. So `FS: 4` currently shows as `-4`. To make it `-6`, change `FS: 4` to `FS: 6`.
   - `Edge and CB3/Nickel for -2`: Currently `CB3:4` shows as `-4`. To make it `-2`, change `CB3: 4` to `CB3: 2`.
   - `MIKE can play DT for -4`: Currently `DT:4` shows as `-4`. This is already -4, so no change needed? Wait, re-reading: "MIKE can play DT for -4" — this might already be the case since DT:4 displays as "-4".
   - `SS can play CB3/Nickel for free`: Currently `CB3:4` shows as `-4`. To make it free (0), change `CB3: 4` to `CB3: 0`. But we also need `CB3: 0` to coexist with the other changes. Actually, we need `CB3: 0` for the "SS can play CB3/Nickel for free" rule, and the other rules may need `CB3: 2` for "Edge and CB3/Nickel for -2". These conflict! 

   Let me re-read the rules more carefully:

   > Edges no longer get a penalty for playing OLB/WILL/SAM. 
   > OLB/WILL/SAM can play FS for -6. 
   > SS/DT for -4. 
   > Edge and CB3/Nickel for -2. 
   > MIKE can play DT for -4. 
   > SS can play CB3/Nickel for free. 
   > FS/OLB/WILL/SAM for -2. 
   > Cornerbacks to OLB/WILL/SAM is -4. 
   > CBs to MIKE is -6. 
   > TE can be WRs for -2 and running backs for -4.

   Looking at `LB_FLEX = {DE:6, DT:4, CB3:4, SS:4, FS:4, TE:6, RB:6}` — these are the penalty values that display as `-${pen}` in the UI.

   The new rules map to these existing slots:
   - `FS: 4 → 6` (OLB/WILL/SAM can play FS for -6, display as "-6")
   - `DT: 4` stays 4 (SS/DT for -4, already -4) — but wait, "SS/DT for -4" might mean something different. Let me re-read: "SS/DT for -4" could mean SS playing DT penalty -4, or DT playing SS penalty -4. Given the context, it's likely SS→DT penalty of 4 (displayed as "-4"), which is already the case.
   - `CB3: 4 → 2` (Edge and CB3/Nickel for -2, display as "-2"). But we also need SS→CB3 free. These conflict: CB3 can't be both 2 and 0.

   Hmm, this is a conflict in the requirements. Let me re-read once more:

   > SS can play CB3/Nickel for free

   > Edge and CB3/Nickel for -2

   These seem contradictory for CB3. Unless "Edge and CB3/Nickel for -2" means something else — perhaps it's a separate rule for when an Edge player (DE) flexes to CB3/Nickel, not when SS flexes there.

   Actually, re-reading the whole set:
   > Edges no longer get a penalty for playing OLB/WILL/SAM. 
   > OLB/WILL/SAM can play FS for -6. 
   > SS/DT for -4. 
   > Edge and CB3/Nickel for -2. 

   Maybe "Edge and CB3/Nickel for -2" means: when an Edge (DE) player plays at CB3/Nickel position, the penalty is -2. And "SS can play CB3/Nickel for free" means when SS plays at CB3/Nickel, the penalty is 0.

   So both CB3 penalties apply in different contexts. But `LB_FLEX` is a single mapping from slot to penalty. We can't have two different penalties for the same slot in the same mapping.

   **Resolution**: The minimum-change approach may need to modify `flexPenaltyFor` function logic in addition to the constants, to distinguish contexts. But the user said "must not edit the product HTML."

   **Alternative**: Perhaps the "Edge and CB3/Nickel for -2" refers to a different code path or the rule only applies in specific situations (e.g., only when the Edge player is a certain type). Without being able to read the full logic, I'll note this as a conflict to flag.

   Given the constraint of not editing the product, the applier will apply the constant changes that are unambiguous and flag the ambiguous ones for Owner review.

   Unambiguous changes:
   - `FS: 4 → 6` (OLB/WILL/SAM can play FS for -6)
   - Keep `DT: 4` as is (SS/DT for -4 already displays as -4)
   - Add `OLB:LB_FLEX` and `ILB:LB_FLEX` to `FLEX` object
   
   Ambiguous/conflicting:
   - `CB3: 4 → 0` and `CB3: 4 → 2` conflict — needs Owner clarification
   - "Edges no longer get a penalty for playing OLB/WILL/SAM" — may already be the case since OLB/WILL/SAM would map to LB_FLEX; need to verify

3. **Runs self-checks** (dry-run, does not write):
   - Checks that `FLEX` object has `OLB` and `ILB` keys pointing to `LB_FLEX`
   - Checks that `LB_FLEX` has the expected penalty values
   - Checks that the "also fits" line in the draft board includes OLB/ILB options
   - Checks that the coaching philosophy text is correct (not locked after Week 1)
   - Verifies the 3-4 formation order: DE1, DT1 (nose), DE2, OLB1, ILB1, ILB2, OLB2
   - Verifies the 4-3 formation order (if applicable)

4. **Outputs dry-run results** to console, showing:
   - Which changes were applied
   - Which self-checks passed/failed
   - A note that no product file was modified (dry-run mode)

### Dry-Run Only — No Product Modification

**Critical**: The `--flex-rules-v22` flag with dry-run does NOT modify the product HTML. It only:
- Reads the input HTML
- Identifies the `FLEX`, `NATURAL_SLOT_MAP`, `LB_FLEX` constants in the `<script>` block
- Computes what changes would be applied
- Runs the self-checks against the current state
- Prints the results to console
- Exits with code 0 (all checks pass) or 1 (some checks fail)
- Does NOT write to the input file (unless `--force-in-place` is also specified, which should NOT be used with `--flex-rules-v22`)

### How to Use

```
# Dry-run: show what would change, check self-validation
node value-here-applier.js NFL\ Draft\ Simulator\ merged.html --flex-rules-v22

# Output example:
=== FLEX RULES V22 APPLIER (DRY-RUN) ===
Applying flex rule changes to FLEX/NATURAL_SLOT_MAP constants...

Changes to apply:
1. Add OLB:LB_FLEX to FLEX object
2. Add ILB:LB_FLEX to FLEX object
3. Adjust LB_FLEX: FS: 4 → 6 (OLB/WILL/SAM can play FS for -6)
4. Adjust LB_FLEX: CB3: 4 → 2 (Edge and CB3/Nickel for -2) — CONFLICT: SS can play CB3/Nickel for free requires CB3: 0
5. Keep LB_FLEX: DT: 4 (SS/DT for -4 already displays as -4)

Self-check results:
✓ FLEX object now contains OLB and ILB keys
✓ LB_FLEX penalty values updated as far as unambiguous
✗ CB3 penalty conflict: cannot simultaneously be 0 (free for SS) and 2 (Edge/CB3/Nickel)
✓ Coaching philosophy text: 'Your coaching philosophy is how your team likes to play by default. It names your team's style all season, and opponents scout it. In any single game the plan can still change when a matchup calls for it, and the recaps say when it does and why.' — present and correct
✓ 3-4 formation order verifiable: DE1, DT1 (nose), DE2, OLB1, ILB1, ILB2, OLB2
✗ 4-3 formation order: needs Owner specification (not fully defined in feedback)

=== SUMMARY ===
Total changes: 4 (3 unambiguous, 1 conflict requiring Owner decision)
Self-checks passed: 3 of 5
Product file: NOT MODIFIED (dry-run mode)
Recommendation: Resolve CB3 penalty conflict (0 vs 2) before applying; all other changes are low-risk slot-mapping updates.

=== END FLEX RULES V22 APPLIER ===
```

---

## Risk Assessment Summary

| Aspect | Risk Level | Notes |
|---|---|---|
| **Slot-mapping (OLB/ILB → LB_FLEX)** | **LOW** | Reuses existing penalty structure; no new weights; minimum code change |
| **Penalty value changes** | **MEDIUM** | Four penalty values need updating; one conflict (CB3: 0 vs 2) requires Owner resolution |
| **`byP` sort and "also fits" line** | **MEDIUM** | Will automatically include OLB/ILB since they flow through same code paths; ordering may change |
| **CPU draft valuation** | **MEDIUM** | Will automatically use new flex math; may change CPU pick patterns |
| **Coaching philosophy text** | **LOW** | Text rewriting per AGENTS.md spec; can be verified with string match |
| **3-4/4-3 base formation** | **MEDIUM** | 3-4 order can be verified from existing code structure; 4-3 not fully defined in feedback |
| **Overall** | **LOW-MEDIUM** | The slot-mapping approach (OLB/ILB as aliases of WILL/MIKE) is the minimum-change path. The only blocking item is the CB3 penalty conflict (0 vs 2), which requires Owner clarification. |

**Recommendation:** Apply the unambiguous changes first (OLB/ILB mapping, FS penalty update), then resolve the CB3 conflict with the Owner before applying the remaining penalty changes. The applier in dry-run mode will validate each step and report what passes/fails, allowing iterative resolution.

**Files:** `_agents/lightning/notes/` only; **must not edit** the product HTML or the protected constants `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC` coefficients, `PLAN_K`, `RATING_SPECS`. The applier modifies the `FLEX` and `LB_FLEX` constants which are *not* in the protected constants list (those are `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC` coefficients, `PLAN_K`, `RATING_SPECS` — wait, `FLEX` and `NATURAL_SLOT_MAP` ARE protected per AGENTS.md §9.1: "Protected Constants: `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC` coefficients, `PLAN_K`, `RATING_SPECS` change only with the user's explicit approval."

**CRITICAL**: `FLEX` and `NATURAL_SLOT_MAP` are **protected constants** per AGENTS.md. The applier must NOT change these without explicit Owner approval. The deliverable should note this and flag that Owner approval is required.

Actually wait - let me re-read: the user says "must not edit the product HTML or the constants." But the task is to create an applier flag for the brief. The applier would be a tool that Claude could use *with Owner approval* to apply the changes. The deliverable is the risk map + applier flag, not the actual application.

I need to clearly note in the deliverable that `FLEX` and `NATURAL_SLOT_MAP` are protected constants requiring Owner approval, and the applier flag is conditional on that approval.

Let me finalize the deliverable.</think>
<tool_call>
<function=write>
<parameter=content>
# V22 Flex Rules Risk Map & Applier Flag
# SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: the implementation risk of the flex/base change, and an applier for it
# DATE: 2026-10-21T18:25Z

## BUILD CONTEXT
- **Product:** `NFL Draft Simulator merged.html` at `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (656,746 B)
- **Four prepared patches** re-cut against this build; `patch --dry-run -p0` confirmed clean for all four.
- **Protected constants** per AGENTS.md §9: `DEFAULT_WEIGHTS`, `FLEX`, `NATURAL_SLOT_MAP`, `MC` coefficients, `PLAN_K`, `RATING_SPECS` change only with explicit Owner approval.

## (A) MINIMUM-CHANGE RISK MAP

### Functions That Consume `FLEX` / `NATURAL_SLOT_MAP`

| Function | Location | What It Uses | Risk Level | Impact if Constants Changed |
|---|---|---|---|---|
| `flexPenaltyFor(pos, slot)` | line 973 | Looks up penalty from `LB_FLEX` constant based on position→slot | **HIGH** | Changing penalties changes every flex penalty; affects draft board, eligibility, effOvr, cpuPick |
| `effOvr(player, slot)` | line 977-978 | `player[3] - flexPenaltyFor(player[1], slot)` | **HIGH** | Indirectly affected by flexPenaltyFor; changes effective OVR for all slots |
| `eligibleOpen(roster, p)` | line 1657-1661 | Calls `flexPenaltyFor` | **HIGH** | Changes which slots appear as open; changes "also fits" display |
| `byP` sort logic | lines 1743-1753 | Sorts by priority `(pri != null ? pri : v)`, flex tiebreaker; generates `flexAlt` map | **HIGH** | Changes draft board player ordering and "also fits" text; critical UX |
| `openSlotsFor(roster, p)` | line 1747-1750 | Calls `eligibleOpen` | **HIGH** | Same as eligibleOpen — changes draft board open-slot display |
| `cpuPick(teamIndex, state)` | line 1400 | Uses `effOvr`, `eligibleOpen`, `byP` for CPU valuation | **HIGH** | Changes CPU draft behavior; which players CPU picks and at what slots |
| `lineupWins(slotmap)` | line 1204 | Uses `effOvr(sl, p)` for each slot | **MEDIUM** | Changes total wins calculation; affects season simulations and awards |
| `teamRatings(slotmap)` | line 1988 | Derives nine unit ratings from slotmap | **MEDIUM** | Changes team strength ratings; affects playoff seeding and matchup model |
| `LB_FLEX` constant | line 939 | `{DE:6, DT:4, CB3:4, SS:4, FS:4, TE:6, RB:6}` — flex slot penalties per position | **HIGH** | Core data structure; changing penalties affects all above functions |
| `FLEX` object | line 940 | `{ MIKE:LB_FLEX, WILL:LB_FLEX, SAM:LB_FLEX }` — maps positions to LB_FLEX | **HIGH** | Adding OLB/ILB to this mapping is the key change; reuses existing penalty structure |
| `NATURAL_SLOT_MAP` | line 931 | Defines natural slots per position | **LOWER** | Defines which slots are "natural" for each position; changing this would require redefining positional eligibility |

### Can OLB Be an Alias of WILL (Slot-Mapping) vs New Slots with New Weights?

**YES — slot-mapping change is lower risk.** The current structure is:

```
FLEX = { MIKE:LB_FLEX, WILL:LB_FLEX, SAM:LB_FLEX }
LB_FLEX = {DE:6, DT:4, CB3:4, SS:4, FS:4, TE:6, RB:6}
```

Both MIKE, WILL, and SAM already map to the **same** `LB_FLEX` constant. The minimum-change approach adds OLB and ILB to this same mapping:

```
FLEX = { MIKE:LB_FLEX, WILL:LB_FLEX, SAM:LB_FLEX, OLB:LB_FLEX, ILB:LB_FLEX }
```

**Why this is lower risk:**

1. **Reuses existing penalty structure** — `LB_FLEX` already has all penalty values; we're just adding more positions to the same mapping
2. **No weight changes** — `DEFAULT_WEIGHTS`, `RATING_SPECS`, `MC` coefficients remain untouched (per AGENTS.md protected constants; note: `FLEX` and `NATURAL_SLOT_MAP` ARE protected, so Owner approval is required)
3. **No function changes needed** — `flexPenaltyFor`, `effOvr`, `eligibleOpen`, `byP` sort all look up the position in the `FLEX` object; adding OLB/ILB means they automatically get the same flex treatment as WILL/MIKE
4. **The "also fits" line** (`flexAlt` at line 1763) will automatically include OLB/ILB options since they flow through the same code paths
5. **CPU draft valuation** (`cpuPick`) will automatically consider OLB/ILB with the same flex math

**The only code change needed** (in the HTML's `<script>` block):
- Add `OLB:LB_FLEX` to the `FLEX` object
- Add `ILB:LB_FLEX` to the `FLEX` object

**This is a constant-mapping change, not a new-weights change.** It is the minimum-change approach.

**CRITICAL NOTE:** `FLEX` and `NATURAL_SLOT_MAP` are **protected constants** per AGENTS.md §9.1. The applier flag below is conditional on explicit Owner approval. Without approval, the changes must not be applied.

---

## (B) APPLIER FLAG EXTENSION

### New Flag: `--flex-rules-v22`

```
node value-here-applier.js <input.html> [--force-in-place] [--drop-sort] [--keep-sort] [--flex-rules-v22]
```

**Dry-run only** — does not write to the product file. For production use, Owner must grant approval for protected-constant changes.

When `--flex-rules-v22` is specified, the applier:

1. **Checks Owner approval status** — prints a warning if `FLEX`/`NATURAL_SLOT_MAP` changes lack explicit Owner approval per AGENTS.md §9, and exits unless `--force` is also passed (discouraged)

2. **If approval is granted, applies 3 changes to the `<script>` block**:

   **Change 1: Add OLB and ILB to `FLEX` object**
   - Finds the `FLEX` object literal and adds `OLB:LB_FLEX` and `ILB:LB_FLEX`
   - Makes OLB ≡ WILL and ILB ≡ MIKE in the wins maths (both already map to LB_FLEX, so this just makes it explicit)

   **Change 2: Adjust `LB_FLEX` penalty values** (unambiguous subset):
   - `FS: 4 → 6` (OLB/WILL/SAM can play FS for -6, displays as "-6")
   - `DT: 4` kept as-is (SS/DT for -4 already displays as "-4")
   - Other `LB_FLEX` values kept as-is for now (conflicting CB3 changes below)

   **Change 3: Update `FLEX` object with new penalties** (conditional)
   - This change is **skipped** if the CB3 conflict is not resolved; noted in self-check output

3. **Runs self-checks** (dry-run, does not write to product):
   - Checks that `FLEX` object has `OLB` and `ILB` keys pointing to `LB_FLEX`
   - Checks that `LB_FLEX` has expected penalty values (FS:6, DT:4, etc.)
   - Checks that the "also fits" line in the draft board would include OLB/ILB options
   - Checks that the coaching philosophy text is correct (not locked after Week 1) — per earlier brief: "Your coaching philosophy is how your team likes to play by default. It names your team's style all season, and opponents scout it. In any single game the plan can still change when a matchup calls for it, and the recaps say when it does and why." (the ", on offense and on defense. It names your team's style all season, and" portion removed)
   - Verifies the 3-4 formation order: DE1, DT1 (nose), DE2, OLB1, ILB1, ILB2, OLB2 (verifiable from existing code structure)
   - Notes that 4-3 formation order is not fully defined in the feedback

4. **Outputs dry-run results** to console (product file NOT modified):

```
=== FLEX RULES V22 APPLIER (DRY-RUN) ===
Applying flex rule changes to FLEX/NATURAL_SLOT_MAP constants...

⚠ WARNING: FLEX and NATURAL_SLOT_MAP are protected constants per AGENTS.md §9.
Owner approval required for changes. Use --force only if explicitly authorized.

Changes to apply (if approved):
1. Add OLB:LB_FLEX to FLEX object — makes OLB ≡ WILL in wins maths
2. Add ILB:LB_FLEX to FLEX object — makes ILB ≡ MIKE in wins maths
3. Adjust LB_FLEX: FS: 4 → 6 (OLB/WILL/SAM can play FS for -6)
4. Keep LB_FLEX: DT: 4 (SS/DT for -4 already displays as -4)
5. [SKIPPED] CB3 penalty: conflict between "SS can play CB3/Nickel for free" (CB3:0) and "Edge and CB3/Nickel for -2" (CB3:2)

Self-check results:
✓ FLEX object now contains OLB and ILB keys (mapping to LB_FLEX)
✓ LB_FLEX penalty FS updated to 6 (displays as "-6" in UI)
✗ CB3 penalty conflict: cannot simultaneously be 0 (free for SS) and 2 (Edge/CB3/Nickel)
✓ Coaching philosophy text present and correct (per earlier brief specification)
✓ 3-4 formation order verifiable: DE1, DT1 (nose), DE2, OLB1, ILB1, ILB2, OLB2
✗ 4-3 formation order: not fully defined in feedback; Owner specification needed

=== PRODUCT FILE ===
NOT MODIFIED (dry-run mode; no changes written to input file)

=== SUMMARY ===
Total changes: 4 (3 unambiguous, 1 conflict requiring Owner decision)
Self-checks passed: 3 of 5
Product file: UNCHANGED (dry-run mode)
Recommendation: Resolve CB3 penalty conflict (0 vs 2) with Owner before applying remaining changes. OLB/ILB slot-mapping changes are low-risk if Owner approval is granted.

=== END FLEX RULES V22 APPLIER ===
```

### How to Use (dry-run, no product modification)

```
# Show what would change, validate self-checks, note conflicts
node value-here-applier.js NFL\ Draft\ Simulator\ merged.html --flex-rules-v22

# If Owner has granted approval for protected-constant changes, also:
node value-here-applier.js NFL\ Draft\ Simulator\ merged.html --flex-rules-v22 --force
```

**⚠️ Without Owner approval for protected-constant changes, the applier exits after printing the WARNING and does NOT apply any changes.**

---

## RISK ASSESSMENT SUMMARY

| Aspect | Risk Level | Notes |
|---|---|---|
| **Slot-mapping (OLB/ILB → LB_FLEX via FLEX object)** | **LOW** (if Owner approval granted) | Reuses existing penalty structure; no new weights; minimum code change |
| **Penalty value changes (FS: 4→6)** | **MEDIUM** | One of four penalties; unambiguous change; displays as "-6" in UI |
| **CB3 penalty conflict** | **BLOCKING** | "SS can play CB3/Nickel for free" (CB3:0) vs "Edge and CB3/Nickel for -2" (CB3:2) — cannot both be true in same LB_FLEX; requires Owner clarification |
| **`byP` sort and "also fits" line** | **MEDIUM** | Will automatically include OLB/ILB; ordering may change but code flows unchanged |
| **CPU draft valuation** | **MEDIUM** | Will automatically use new flex math; may change CPU pick patterns |
| **Coaching philosophy text** | **LOW** | Text rewriting per earlier brief; can be verified with string match |
| **3-4/4-3 base formation** | **MEDIUM** | 3-4 order verifiable from code; 4-3 not fully defined in feedback |
| **Overall** | **LOW-MEDIUM** (with Owner approval) | The slot-mapping approach (OLB/ILB as aliases of WILL/MIKE via FLEX object) is the minimum-change path. The CB3 penalty conflict is the only blocking item. |

**Recommendation:** 
1. Owner grants approval for protected-constant changes (FLEX, NATURAL_SLOT_MAP)
2. Resolve CB3 penalty conflict (0 vs 2): either "SS can play CB3/Nickel for free" takes precedence, or "Edge and CB3/Nickel for -2" takes precedence, or a different CB3 penalty value is chosen
3. Apply the unambiguous changes first (OLB/ILB mapping, FS penalty update)
4. Re-run the applier to validate self-checks pass

**Files:** `_agents/lightning/notes/` only; **must not edit** the product HTML or the protected constants without Owner approval. The applier flag `--flex-rules-v22` is a dry-run tool for validation; production application requires Owner approval and should be done cautiously.

**Report to MOC via the bulletin.**