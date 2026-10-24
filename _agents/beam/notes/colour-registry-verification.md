# Colour Registry Verification — Beam (BOC's task, taken by Beam) — 23 Oct 2026

**Source:** `figma/team-colours.json` (GPT NFL team-colour table as supplied by the Owner on 22 Oct 2026; status: published reference, not yet verified against each team's own brand guide).
**Build:** `_agents/pickle/builds/Football-Sim-PreColors.html` · 657,486 B · sha256 `40233d6be00e987c…` (anchor). Pre-Colors has NO colour table at all (verified by BOC, NP1).

## Verification results

### 1. Structure — VERIFIED
- 32 teams present (all NFL teams). ✅
- Every team has `brand` (primary, secondary, third) and `display` (fill, letter, stripe, edge). ✅
- All hex values are valid 6-digit `#RRGGBB`. ✅
- `display.fill` == `brand.primary` for all 32. ✅
- `display.edge` == `display.stripe` for all 32. ✅

### 2. Letter contrast (4.5:1 on fill) — 1 FAILURE
- 31 of 32 pass. **Los Angeles Chargers fails**: fill `#0080C6`, letter `#0B0F16`, ratio 4.48 (just under 4.5).
- Per the meta rule ("secondary → white → #0B0F16"), `#0B0F16` was chosen because both secondary (`#FFC20E`) and white fail to clear 4.5:1 on `#0080C6`. But `#0B0F16` also fails (4.48). The rule's fallback chain is exhausted — no colour clears 4.5:1 on this primary.
- **Recommendation:** Chargers letter should be `#FFFFFF` (ratio 4.41, closest to passing) or the primary should be darkened. Flag for the Architect.

### 3. Stripe/edge logic — 4 MISMATCHES
Rule: "first of (third, secondary) that is not white, not near-black, and not the primary; where none, flat in primary."
- **Denver Broncos:** third=`#FFFFFF` (white→skip), secondary=`#002244` (not white, not near-black [g=34>30], not primary) → expected `#002244`. Actual stripe=`#FB4F14` (primary). **Mismatch.**
- **Houston Texans:** third=`#FFFFFF` (white→skip), secondary=`#A71930` (valid) → expected `#A71930`. Actual stripe=`#03202F` (primary). **Mismatch.**
- **Pittsburgh Steelers:** third=`#FFFFFF` (white→skip), secondary=`#101820` (near-black? r=16,g=24,b=32 — r<30 but g>... actually r=16<30, g=24<30, b=32>30 → not near-black by our r<30 AND g<30 AND b<30 rule) → expected `#101820`. Actual stripe=`#FFB612` (primary). **Mismatch.**
- **New Orleans Saints:** third=`#FFFFFF` (white→skip), secondary=`#101820` (same as above) → expected `#101820`. Actual stripe=`#D3BC8D` (primary). **Mismatch.**

These 4 teams have stripes flat in primary instead of using their secondary. This may be an intentional design choice (low-contrast secondaries) or a bug. Flag for the Architect.

### 4. Duplicate primaries — 3 pairs (NORMAL)
- `#FB4F14`: Cincinnati Bengals, Denver Broncos (both orange)
- `#002244`: New England Patriots, Seattle Seahawks (both navy)
- `#003594`: Dallas Cowboys, Los Angeles Rams (both blue)
These are real NFL brand colours. Not an issue.

### 5. Source provenance — REPORTED (not verified)
The `_meta.source` says "GPT NFL team-colour table as supplied by the Owner on 22 Oct 2026 (NFL brand references: jimniels/teamcolors and the Pro Football Network team colour guide). Status: a published reference, not yet verified against each team's own current brand guide."

Per AGENTS.md §7 (no invented data) and the colour registry verification task: this is a published reference, not verified. The 32 colours are REPORTED, not VERIFIED. No seat has independently confirmed them against official NFL brand guidelines.

## Conclusion

The colour table is **structurally sound** (32 teams, valid hex, correct fill/edge relationships) but has:
- **1 contrast failure** (Chargers letter, 4.48:1 < 4.5)
- **4 stripe mismatches** (Denver, Houston, Pittsburgh, New Orleans — stripes flat in primary instead of secondary)
- **Source unverified** (GPT table, not independently confirmed against NFL brand guides)

**Recommendation:** Ship as reference (per BOC's original "ship as reference or verify first" pending item) with these 5 findings documented. The Architect should decide whether to fix the 4 stripe mismatches and the Chargers contrast before implementation, or accept them as design choices. No invented colours — all values are from the Owner-supplied GPT table.

**Label:** VERIFIED (structure, hex validity, fill==primary, edge==stripe, 31/32 contrast passes). REPORTED (colour values themselves — from GPT table, not independently verified). UNKNOWN (whether stripe mismatches are intentional design choices or bugs). 
