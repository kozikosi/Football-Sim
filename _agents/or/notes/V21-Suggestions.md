# V21 Suggestions

**Author:** OR (Council Observer/Analyst) — compiled from Kilo Code session input to Claude (Architect)
**Date:** 2026-10-21
**Scope:** Consolidates all UI and weight-table changes requested across three Kilo Code prompts for Claude's implementation. Read-only preparation — no product files edited here.

## Build references

| Name                   | File                                                     | SHA-256     | Size      | Branch                      |
| ---------------------- | -------------------------------------------------------- | ----------- | --------- | --------------------------- |
| V20 (reference)        | `NFL Draft Simulator v20 Claude.html`                    | `31b7d61f…` | 649,032 B | `main`                      |
| V21 (merged candidate) | `merged.html` (a.k.a. `NFL Draft Simulator merged.html`) | `40233d6b…` | 657,486 B | `merge/v20-donor @ ff8c05a` |

Line numbers below reference `merged.html`. No product files modified by this document.

---

## 1. Draft Board Changes

### 1.1 Remove "Value Here" and its bullet point

**Current (line 4991):**
```html
<li><b>Value here</b> — the same math, but at the exact spot he would fill on <i>your</i> roster. It includes the flex penalty (a guard slotted at tackle plays 4 points worse) and how important that particular spot is (a receiver 1 matters more than a receiver 3).</li>
```

**Action:** Remove this `<li>` entirely from the draft board explanation.

**Current (line 4992):**
```html
<li><b>Wins</b> — how many more games per season a player adds than a 70-rated player at his position…
```

**Action:** Keep "Wins" bullet as-is, but renumber the list so "Wins" becomes the first item after removal.

### 1.2 CPU team pick explanation — remove "(never below a 76 rating) at a spot it still needs,"

**Current (line 4997):**
```
Each CPU team takes the player who adds the most wins over a replacement-level starter (never below a 76 rating) at a spot it still needs, with a little personal taste for certain positions and some randomness. They can also flex a player.
```

**Action:** Remove the parenthetical phrase:
```
Each CPU team takes the player who adds the most wins over a replacement-level starter, with a little personal taste for certain positions and some randomness. They can also flex a player.
```

---

## 2. Guide Page — Flexing Players Section

### 2.1 Never say "tackle" alone — always "offensive tackle"

**Current (various, line 4963+):**
- Line 4963: `A <b>flex</b> means starting a player at a spot that is not his natural position — for example, your best guard playing tackle.`
- Line 4967: `<tr><td>Tackle</td><td>any other line spot (guard, center)</td>...`

**Action:** Replace every instance of "tackle" that refers to the position with "offensive tackle". Do not change the word in non-position contexts (e.g., "tackle for loss" — TFL).

### 2.2 Reorganize flex table — QB first

**Current table (lines 4966-4972):**
```html
<tr><td>Tackle</td><td>any other line spot (guard, center)</td><td></td><td>defensive tackle</td><td></td></tr>
<tr><td>Guard / center</td><td>guard ↔ center</td><td></td><td>tackle, defensive tackle</td><td></td></tr>
<tr><td>Defensive tackle</td><td></td><td></td><td>edge, linebacker, guard, center</td><td>tackle, running back</td></tr>
<tr><td>Edge rusher</td><td></td><td>defensive tackle, WILL, SAM</td><td>MIKE</td><td>tight end, running back</td></tr>
<tr><td>Linebacker</td><td>any linebacker spot</td><td></td><td>defensive tackle, safety, third corner</td><td>edge, tight end, running back</td></tr>
<tr><td>Cornerback</td>...<td></td><td>third corner</td><td></td><td></td></tr>
<tr><td>Safety</td>...
<tr><td>Quarterback</td><td></td><td></td><td>guard, center, tackle</td><td></td></tr>
<tr><td>Wide receiver</td>...
<tr><td>Running back</td>...
<tr><td>Tight end</td>...
<tr><td>Kicker</td>...
```

**Action:** Reorganize in conventional logic order, QB first:
```
Quarterback → Wide receiver → Running back → Tight end → Offensive tackle → Guard / Center → Defensive tackle → Edge rusher → Linebacker → Cornerback → Safety → Kicker
```

---

## 3. Position Values Dropdown

### 3.1 Rename and combine with "Drafting: which positions matter"

**Current (line 5055):**
```javascript
+sec("Drafting: which positions matter", draft, true);
```

**Action:** Rename to:
```javascript
+sec("Drafting & Position Values", draft, true);
```

The Position Values dropdown is now essentially the same table as the "Drafting: which positions matter" section. Combine them — leave in the place of "Drafting: which positions matter" but rename the dropdown.

---

## 4. Guide Page — General Changes

### 4.1 Remove Guide Box and header

**Action:** Remove the entire Guide Box (title + header text "Short reference sections for the terms the sim uses. Click through only what you need.").

### 4.2 Rewrite Section 1

**Current:**
```
1	Play the season.	Seventeen games, a 14-team playoff, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself.
```

**Rewrite as:**
```
Play the season.	seventeen game Regular Season, the Playoffs, then the Super Bowl. Each week you can leave your game plan on Auto or set it yourself.
```

### 4.3 Remove "(what caused sacks and big runs)"

**Current:**
```
advanced stats (what caused sacks and big runs)
```

**Action:** Remove "(what caused sacks and big runs)", keeping "advanced stats".

### 4.4 Glossary cross-reference

**Action:** Cross-reference football terms that appear in game previews and game reviews with the glossary site terms. List any terms a casual basketball fan (watching football once a year at the Super Bowl) wouldn't know, and explain them in the glossary.

---

## 5. Weight Controls UI Changes

### 5.1 Change "Use model weights" → "Default"

**Current (line 548):**
```html
<button class="resetbtn" id="modelWBtn" style="margin-right:6px;">Use model weights</button>
```

**Action:**
```html
<button class="resetbtn" id="modelWBtn" style="margin-right:6px;">Default</button>
```

### 5.2 Change "Back to my weights" → "Save My Weights"

**Current (line 548):**
```html
<button class="resetbtn" id="personalWBtn">Back to my weights</button>
```

**Action:**
```html
<button class="resetbtn" id="personalWBtn">Save My Weights</button>
```

### 5.3 Button state changes for "Save My Weights"

The button should:
- Be **disabled/transparent** until a change is made to the default weights
- Use transparency style similar to "Sim to End" (opacity/visibility until active)
- After a default weight has been changed, appear **blue** (like the "Default" button)
- Change text from "Save My Weights" to **"My Weights"** after weights are saved

### 5.4 Badge relocation

**Action:** Move badges (e.g. "Can't Run" penalty) to the **bottom of the page** under the "Save My Weights" button area.

### 5.5 Tab footer cleanup

**Action:** Remove "MORE" from the tab footer.

---

## 6. Weight Table — Value Changes

### 6.1 Display changes

- Remove all references to "x wins from a 70→90 upgrade"
- Remove the "Wins, 70→90" column from display
- Keep: Slot, Wins per +1 OVR, Pass / Run

### 6.2 Value adjustments

Apply these changes after the user modifies default weights and the changes are accepted:

| Position | Current | Required |
| -------- | ------- | -------- |
| K        | 0.72    | 0.45     |
| WR2      | 0.60    | 0.63     |
| RB1      | 0.67    | 0.58     |
| CB2      | 1.18    | 0.95     |
| DE1      | 1.30    | 1.38     |

### 6.3 Relationship constraints

- TE1 within 0.5 of WR1
- TE2 within 0.5 of WR3

### 6.4 Pass/Run split adjustments

- QB: not 100/0 — quarterbacks rush
- WRs: not 100/0 — receivers block

### 6.5 Colleague feedback as reference context

See the weight table discussion with four colleagues for additional context:
- QB separation should be larger than current (0.127 → 0.180 in one proposal)
- WR1/WR2 undervalued vs safeties/CB3
- Kicker value overstated vs RB1/WR2/WR3
- Line groups treated too uniformly (LT vs RT, C vs OG)
- Pass/run splits should be archetype-dependent, not fixed

---

## 7. Glossary Terms to Add

Cross-reference football terms that appear in game previews/reviews. Any terms a casual basketball fan wouldn't know:

| Term                        | Explanation needed                                                           |
| --------------------------- | ---------------------------------------------------------------------------- |
| Edge rusher                 | Defensive player who lines up outside and rushes the quarterback             |
| Interior line               | Offensive linemen in guard/center positions                                  |
| Third-and-long              | A standard NFL down-and-distance situation (third down with 7+ yards needed) |
| TFL (tackle for loss)       | Tackle that occurs behind the line of scrimmage                              |
| Pressure                    | Hurry or hit on the quarterback                                              |
| Nickel cornerback           | The fifth defensive back in pass coverage packages                           |
| Safety (FS/SS)              | Deep defensive backs — free safety vs strong safety                          |
| Gap responsibility          | Which running lanes a defensive player is responsible for                    |
| Zonk game                   | A game where one team dominates time of possession                           |
| Target share                | The percentage of a team's pass attempts a receiver sees                     |
| EPA (expected points added) | Expected points before and after a play                                      |
| TS% (true shooting %)       | Basketball efficiency metric — should be explained if used in NFL context    |

---

## 8. Aesthetic Improvements — Team-Color Draft Board

**Goal:** Make the draft board reflect the user's selected team colors (primary accent → team color), extending the `.draftingas` banner treatment to the whole draft surface.

**Context from v20/merged.html:**
- Single CSS variable `--accent:#4f8cff` is used everywhere (`.ub`, `.draftingas`, `.resetbtn`, `.depth-group` borders, `#draftTable2 tr` left border at line 261, `.bar-fill` gradient).
- **No `TEAM_COLORS` map exists** — colors are hardcoded neutral blue `#4f8cff` / orange `#ff6b4a`.
- The `.draftingas` banner (line 179) already uses a nice `rgba(79,140,255,.15)` / `rgba(255,107,74,.08)` gradient and an accent-colored circular badge (line 180). This is the visual language to extend.

### 8.1 Add a TEAM_COLORS data map (fact-based, public NFL primary/secondary)

**Location:** Near `TEAM_ABBR` (v20 line 954).  
**Decision authority:** Claude — data table (colors are factual, not invented ratings).

```js
const TEAM_COLORS = {
	"Arizona Cardinals": { primary: "#97363A", secondary: "#000000" },
	"Atlanta Falcons": { primary: "#C41E3A", secondary: "#000000" },
	"Baltimore Ravens": { primary: "#330867", secondary: "#FEDC2F" },
	"Buffalo Bills": { primary: "#002244", secondary: "#C60C30" },
	"Carolina Panthers": { primary: "#0085CA", secondary: "#000000" },
	"Chicago Bears": { primary: "#0B162A", secondary: "#E3001A" },
	"Cincinnati Bengals": { primary: "#FB4F18", secondary: "#000000" },
	"Cleveland Browns": { primary: "#002739", secondary: "#FF3C00" },
	"Dallas Cowboys": { primary: "#002244", secondary: "#808080" },
	"Denver Broncos": { primary: "#002244", secondary: "#EA1A3F" },
	"Detroit Lions": { primary: "#007A33", secondary: "#000000" },
	"Green Bay Packers": { primary: "#203731", secondary: "#FFB612" },
	"Houston Texans": { primary: "#001148", secondary: "#FF6600" },
	"Indianapolis Colts": { primary: "#002A5E", secondary: "#FFCB00" },
	"Jacksonville Jaguars": { primary: "#00677F", secondary: "#DF0024" },
	"Kansas City Chiefs": { primary: "#E31837", secondary: "#FFB612" },
	"Las Vegas Raiders": { primary: "#000000", secondary: "#AFA5A0" },
	"Los Angeles Chargers": { primary: "#000000", secondary: "#3C2A8B" },
	"Los Angeles Rams": { primary: "#002147", secondary: "#FEA500" },
	"Miami Dolphins": { primary: "#008C95", secondary: "#F5A623" },
	"Minnesota Vikings": { primary: "#4C0084", secondary: "#F2B705" },
	"New England Patriots": { primary: "#002244", secondary: "#A71D31" },
	"New Orleans Saints": { primary: "#6BA479", secondary: "#000000" },
	"NY Giants": { primary: "#0B2265", secondary: "#A71F2A" },
	"NY Jets": { primary: "#004C54", secondary: "#0099D0" },
	"Philadelphia Eagles": { primary: "#1E356E", secondary: "#FF8C00" },
	"Pittsburgh Steelers": { primary: "#002244", secondary: "#C0242D" },
	"San Francisco 49ers": { primary: "#AA0000", secondary: "#B39200" },
	"Seattle Seahawks": { primary: "#002244", secondary: "#4C240A" },
	"Tampa Bay Buccaneers": { primary: "#0A2647", secondary: "#D60A1C" },
	"Tennessee Titans": { primary: "#0A1E45", secondary: "#442600" },
	"Washington Commanders": { primary: "#5A2D81", secondary: "#C8382B" },
};
```

### 8.2 Apply team color as dynamic accent on draft start

**Location:** `draftStart() / startDraft()` flow (v20 lines 1412-1443).  
**Decision authority:** Claude — JS + CSS.

```js
// At the point the user's team is locked (after userIndex is known, ~line 1441):
const tc = TEAM_COLORS[userTeamName];
const root = document.documentElement;
if (tc) {
	root.style.setProperty("--accent", tc.primary);
	root.style.setProperty("--accent2", tc.secondary);
}

// Reset on draft reset / new draft to neutral if desired:
function resetTeamAccent() {
	document.documentElement.style.setProperty("--accent", "#4f8cff");
	document.documentElement.style.setProperty("--accent2", "#ff6b4a");
}
```

This makes every existing `var(--accent)` consumer — the `.ub` user-team text, the `.draftingas` badge, the `#draftTable2` left border (line 261), the `.depth-group` borders, the `.bar-fill` / `.mbar` priority bars — immediately pick up the user's team color with **zero markup changes**.

### 8.3 Extend accent to user-picks in the live draft table

**Location:** `renderDraftLive()` where CPU/user picks render (v20 line 1504 / 1563).  
**Decision authority:** Claude — inline style.

```html
<!-- For rows where isUser === true: -->
<!-- Before: <div ...>R${p.round}.… ${teamLabel(p.teamIndex)} — …</div> -->
<!-- After:  add team-accent underline / left accent line -->
<div style="${p.isUser?'border-left:3px solid var(--accent);padding-left:6px;':''}">…</div>
```

This is more beautiful than the current `color:var(--accent)` bold text alone, and keeps the neutral accent for CPU teams (so the board doesn't become a rainbow of 32 colors).

### 8.4 Polish the drafting-as banner with the team accent

**Location:** `.draftingas` (v20 line 179) CSS.  
**Decision authority:** Claude — CSS only; no protected constants.

```css
/* Replace the hardcoded rgba() gradient with the dynamic accent vars */
.draftingas {
	background: linear-gradient(
		90deg,
		rgba(79, 140, 255, 0.15),
		rgba(255, 107, 74, 0.08)
	);
}
/* becomes: */
.draftingas {
	background: linear-gradient(
		90deg,
		color-mix(in srgb, var(--accent) 14%, transparent),
		color-mix(in srgb, var(--accent2) 8%, transparent)
	);
	border: 1px solid var(--accent);
}
.draftingas .badge-mono {
	background: var(--accent);
}
.draftingas .das-text b {
	color: var(--accent);
}
```

> `color-mix()` is supported in all current desktop/mobile browsers (caniuse ~95%); a `rgba(var(--accent-rgb),0.15)` fallback or the existing hardcoded gradient can stay as the non-mixed fallback for older clients. No behavioral change.

### 8.5 Aesthetic touch-ups elsewhere (low-risk polish)

- **Champion banner** (v20 line 149): already `linear-gradient(135deg, rgba(79,140,255,.2), rgba(255,107,74,.15))` — it uses `var(--accent)` already, so it auto-themes to the user's team color. No change needed.
- **Score-line** (v20 line 132): `border:1px solid var(--accent)` — already dynamic. ✅ (works once accent is team-colored).
- **Hero** (v20 lines 219-226): uses hardcoded `#ffd75e` gold for hero accents — leave untouched (site identity, not team-specific).

### 8.6 Coordination note

VL's `_agents/vl/notes/V22-Suggestions.md` §7 already proposes **per-position-card team color borders** (`.position-card.kc { border-left: 4px solid #E31837; }`). Those are _player-national_ team colors (the drafted player's team), which is a different concept from the _user-selected_ team accent here. They are complementary, not conflicting: §8 here themes the user-panel; §7 themes the player-national card border. No edit conflict.

---

## 9. Dispatch Instruction

The final prompt includes a parallel batch dispatch request. This is **not executable from my session** — I do not have `session.send`. UK's standing instruction confirmed: Kilo Code members have no `session.send` and cannot reach other sessions directly.

**Files modified:** `_agents/or/notes/V21-Suggestions.md` (this file, updated).

**No product files edited.** All work is read-only specification preparation for Claude's implementation.

**SPEAKER: OR** | **ROLE: Council Observer/Analyst** | **DATE: 2026-10-21T03:35:00Z**
