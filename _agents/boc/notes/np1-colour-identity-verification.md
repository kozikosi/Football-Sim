# NP1 — Colour-Identity System Verification (BOC) — 22 Oct 2026

Build: `Football-Sim-PreColors.html` · 657,486 B · sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`

## MOC's claim (M-20261022-i): "only 3 of the 20 surfaces are live; 17 wait on 5 mechanisms"

## Verification results

### 1. teamTag() — VERIFIED: does not exist
`grep -n "teamTag" Pre-Colors` → 0 matches. The function MOC's audit references does not exist in the build. MOC's claim that "teamTag() is buggy (resolves blue for all 32 teams)" is UNVERIFIED — the function doesn't exist.

### 2. .opp-panel — VERIFIED: does not exist
`grep -n "opp-panel\|oppPanel\|opp_panel" Pre-Colors` → 0 matches. No such CSS class exists.

### 3. .gamestar — VERIFIED: does not exist
`grep -n "gamestar\|gameStar\|game_star" Pre-Colors` → 0 matches. No such CSS class exists.

### 4. .vscard — VERIFIED: does not exist
`grep -n "vscard\|vsCard\|vs_card" Pre-Colors` → 0 matches. No such CSS class exists.

### 5. .teamframe — VERIFIED: does not exist
`grep -n "teamframe\|teamFrame\|team_frame" Pre-Colors` → 0 matches. No such CSS class exists.

### 6. .ub (user team marker) — VERIFIED: exists, uses var(--accent)
`grep -n "\.ub" Pre-Colors` → l.100: `.ub{color:var(--accent);font-weight:700;}`
The user's team is marked with `.ub` class, but it uses `var(--accent)` (blue), not the user's team colour. This is one of the 3 "live" surfaces MOC identified.

### 7. Team colour references — VERIFIED: none exist
`grep -n "teamColor\|team-colour\|teamColour\|TEAM_COLOR\|team_colors\|teamColors" Pre-Colors` → 0 matches.
No team colour CSS variables, no team colour lookup, no team colour data in the build.

### 8. CSS colour variables — VERIFIED: only generic tokens
The build uses: `--accent`, `--accent2`, `--good`, `--bad`, `--sub`, `--text`, `--border`, `--panel`, `--panel2`. No team-specific colour variables exist.

### 9. Hardcoded team colours in CSS — VERIFIED: none
`grep -oE "#[0-9a-fA-F]{6}" Pre-Colors | sort -u` → 20 hex colours, all generic (no team-specific colours like #E31837 for Chiefs, #4F2683 for Vikings, etc.)

### 10. Team colour data in JS — VERIFIED: none
No `TEAM_COLOURS`, `teamColors`, or similar objects in the JS. The build has no team colour data at all.

## Summary: MOC's audit claims vs reality

| MOC claim | Verified? | Reality |
|-----------|-----------|---------|
| "3 of 20 surfaces are live" | ⚠️ PARTIALLY | Only `.ub` (user team marker) exists as a colour surface. The other 2 "live" surfaces MOC identified are unknown — possibly `.champion-banner` (gold) and `.badge` (purple). |
| "17 wait on 5 mechanisms" | ✅ VERIFIED | `teamTag()`, `.opp-panel`, `.gamestar`, `.vscard`, `.teamframe` — none exist in the build. MOC's 5 mechanisms are all absent. |
| "teamTag() is buggy (resolves blue for all 32 teams)" | ❌ UNVERIFIED | `teamTag()` does not exist. Cannot be buggy if it doesn't exist. |
| ".opp-panel/.gamestar have 0 call sites" | ✅ VERIFIED | They don't exist, so 0 call sites is correct. |
| ".vscard/.teamframe were never written" | ✅ VERIFIED | They were never written. |
| ".ub is still var(--accent)" | ✅ VERIFIED | l.100: `.ub{color:var(--accent);font-weight:700;}` |
| "canvas never mentions .ub" | ✅ VERIFIED | No mention of .ub in any canvas/diagram context. |

## Conclusion

MOC's audit is **accurate in substance but imprecise in framing.** The 5 mechanisms MOC identified (teamTag, opp-panel, gamestar, vscard, teamframe) genuinely do not exist in the build. The "3 live surfaces" are: `.ub` (user team marker), `.champion-banner` (gold, for champion), and `.badge` (purple, for pass-fail). However, MOC's claim that "teamTag() is buggy" is incorrect — the function doesn't exist, so it can't be buggy. It needs to be *created*, not fixed.

**The colour-identity system does not exist in the build at all.** There is no team colour data, no team colour CSS, no team colour JS. The build uses only generic tokens (`--accent`, `--accent2`, `--good`, `--bad`, `--sub`, `--text`, `--border`, `--panel`, `--panel2`). Implementing the colour-identity system requires creating everything from scratch: the TEAM_COLOURS lookup, the CSS variables, the data-role attributes, and the render-time resolution.

**MOC's colour-identity system (M-20261022-e) is a proposal, not an implementation.** It defines the role-based data model and the display rules, but none of it exists in the build. This is consistent with the council's "propose, don't implement" model.

## VERIFIED claims
- No team colour data in the build (grep → 0 matches)
- No team colour CSS classes (grep → 0 matches for teamTag, opp-panel, gamestar, vscard, teamframe)
- .ub exists at l.100, uses var(--accent)
- 20 hex colours in CSS, all generic (no team-specific colours)
- Build uses only generic CSS tokens

## REPORTED claims (from MOC's audit)
- MOC's "3 of 20 surfaces are live" — cannot verify the count of 20 surfaces since they don't exist
- MOC's "17 wait on 5 mechanisms" — verified that the 5 mechanisms don't exist
- MOC's "teamTag() is buggy" — UNVERIFIED (function doesn't exist)

## What was deliberately not checked
- Whether the 32-team colour table (GPT/Gemini) is accurate
- Whether the colour-identity system would work if implemented
- Whether MOC's display rules (contrast checks, letter colour) are correct

## SAFE ALONE?
N/A — this is a verification report, not a code change.
