# COLOUR PATCH — 7-LINE TEAM COLOURS INSERTION
**Target:** `_agents/pickle/builds/Football-Sim-PreColors.html` (sha256 `40233d6b…`, 657,486 B)
**Patch:** `_agents/ultra/patches/team-colours-7-line.patch`
**Applied Against:** `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (Pre-Colors anchor)

---

## The Hunk (7 lines + hook)

```diff
--- a/_agents/pickle/builds/Football-Sim-PreColors.html
+++ b/_agents/pickle/builds/Football-Sim-PreColors.html
@@ -1006,6 +1006,14 @@
 };
 function divisionOfTeam(team){ return Object.keys(NFL_DIVISIONS).find(d=>NFL_DIVISIONS[d].includes(team)); }
 function conferenceOfTeam(team){ const d = divisionOfTeam(team); return CONFERENCES.AFC.includes(d) ? 'AFC' : 'NFC'; }
 function divisionRivals(team){ const d = divisionOfTeam(team); return NFL_DIVISIONS[d].filter(t=>t!==team); }
 
+/* ==== TEAM COLOURS (32 teams, 3 colours each) ==== */
+const TEAM_COLORS = {
+  "AFC East": {"Buffalo Bills":["#00338D","#C60C30","#FFFFFF"],"Miami Dolphins":["#008E97","#FC4C02","#FFFFFF"],"New England Patriots":["#002244","#C60C30","#BFC0BF"],"New York Jets":["#125740","#FFFFFF","#000000"]},
+  "AFC North": {"Baltimore Ravens":["#241773","#000000","#9E7C0C"],"Cincinnati Bengals":["#FB4F14","#000000","#FFFFFF"],"Cleveland Browns":["#311D00","#FF3C00","#FFFFFF"],"Pittsburgh Steelers":["#FFB612","#101820","#FFFFFF"]},
+  "AFC South": {"Houston Texans":["#03202F","#A71930","#FFFFFF"],"Indianapolis Colts":["#002C5F","#FFFFFF","#A2AAAD"],"Jacksonville Jaguars":["#101820","#006778","#D7A22A"],"Tennessee Titans":["#0C2340","#4B92DB","#C8102E"]},
+  "AFC West": {"Denver Broncos":["#FB4F14","#002244","#FFFFFF"],"Kansas City Chiefs":["#E31837","#FFB81C","#FFFFFF"],"Las Vegas Raiders":["#000000","#A5ACAF","#FFFFFF"],"Los Angeles Chargers":["#0080C6","#FFC20E","#FFFFFF"]},
+  "NFC East": {"Dallas Cowboys":["#002244","#869397","#FFFFFF"],"New York Giants":["#0B2265","#A71930","#A5ACAF"],"Philadelphia Eagles":["#004C54","#A5ACAF","#000000"],"Washington Commanders":["#5A1414","#FFB612","#FFFFFF"]},
+  "NFC North": {"Chicago Bears":["#0B162A","#C83803","#FFFFFF"],"Detroit Lions":["#0076B6","#B0B7BC","#000000"],"Green Bay Packers":["#203731","#FFB612","#FFFFFF"],"Minnesota Vikings":["#4F2683","#FFC62F","#FFFFFF"]},
+  "NFC South": {"Atlanta Falcons":["#A71930","#000000","#A5ACAF"],"Carolina Panthers":["#0085CA","#101820","#BFC0BF"],"New Orleans Saints":["#D3BC8D","#101820","#FFFFFF"],"Tampa Bay Buccaneers":["#D50A0A","#34302B","#FF7900"]},
+  "NFC West": {"Arizona Cardinals":["#97233F","#000000","#FFB612"],"Los Angeles Rams":["#003594","#FFD100","#FFFFFF"],"San Francisco 49ers":["#AA0000","#B3995D","#FFFFFF"],"Seattle Seahawks":["#002244","#69BE28","#A5ACAF"]},
+};
+function teamColour(team, idx){ const c = TEAM_COLORS[team] || ['#4F8DFF','#FFFFFF','#FFC24B']; return c[idx]||c[0]; }
+
 function pairKey(a,b){ return a<b ? a+'|'+b : b+'|'+a; }
 function shuffleArr(arr){ const a=arr.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
```

---

## Verification

```bash
# 1. Apply patch to a copy
cp _agents/pickle/builds/Football-Sim-PreColors.html /tmp/test-precolors.html
patch -p1 < _agents/ultra/patches/team-colours-7-line.patch /tmp/test-precolors.html
# Expected: exit code 0

# 2. Verify TEAM_COLORS exists
grep -c "const TEAM_COLORS" /tmp/test-precolors.html
# Expected: 1

# 3. Verify accessor exists
grep -c "teamColour" /tmp/test-precolors.html
# Expected: 1

# 4. Verify fallback preserved
grep "4F8DFF" /tmp/test-precolors.html
# Expected: fallback colour present

# 5. Verify patch applies cleanly
patch --dry-run -p1 < _agents/ultra/patches/team-colours-7-line.patch
# Expected: success
```

---

## Provenance

| Team | Primary | Secondary | Tertiary | Source |
|------|---------|-----------|----------|--------|
| All 32 teams | As listed in patch | As listed | As listed | **UNSOURCED** — values are a design choice; no team brand guide URLs attached. Candidate `V22-candidate-teamcolours.html` (7eeffa86…) carries same values without citation. Owner's 22 Oct ruling: "Need sourced data with URLs before shipping." |

**Note:** The 32-team palette in this patch matches `V22-candidate-teamcolours.html` (sha256 `7eeffa86…`, gate receipt `a8882ca01d52`). No values have been changed from that candidate. The provenance is **unsourced** per Owner's 22 Oct ruling — keep white in brand palette, solve visibility in rendering layer.

---

## CSS Variable Changes Required (Separate from 7-line patch)

The following CSS variable changes are **NOT included in the 7-line patch** (counted separately):

1. **Draft board header** — change border from `var(--accent)` to `var(--team-primary)`
2. **Position cards** — add `border-left: 4px solid var(--team-primary)`
3. **Team comparison headers** — use `var(--team-primary)` / `var(--team-secondary)`
4. **Badges/buttons** — use `var(--team-accent)` (tertiary)
5. **Scrollbars** — `var(--team-tertiary)`

These are separate from the 7-line data insertion and require CSS changes in the `<style>` block.

---

## Verification Command

```bash
# Apply and verify
cd /Users/kosi/Desktop/Football\ Sim
cp _agents/pickle/builds/Football-Sim-PreColors.html /tmp/test-precolors.html
patch -p1 < _agents/ultra/patches/team-colours-7-line.patch /tmp/test-precolors.html
echo "Exit code: $?"
grep -c "const TEAM_COLORS" /tmp/test-precolors.html
grep -c "teamColour" /tmp/test-precolors.html
```

Expected output:
```
patching file ...
Exit code: 0
1
1
```
