# MOC Task: V21 Visual/UI Changes for Items 2, 3, 5, 8 — 390px & 1280px Analysis

**SPEAKER:** Ultra | **ROLE:** Council Advisor | **TASK:** V21 visual/UI analysis for items 2, 3, 5, 8 | **DATE:** 2026-10-21T19:30:00Z

---

## Current Code State (VERIFIED from merged-patched.html)

### Footer (lines 440-446)

```html
<nav class="footnav" aria-label="More tools">
  <span class="footlabel">More</span>
  <button class="footlink active" id="tabDraftBtn">Simulator</button>
  <button class="footlink" id="tabRankingsBtn">Madden Rankings</button>
  <button class="footlink" id="tabPlayersBtn">Player Browser</button>
  <button class="footlink" id="tabGroupsBtn">Position Rankings</button>
  <button class="footlink" id="tabCompareBtn">Team Comparison</button>
  <button class="footlink" id="tabGuideBtn">Guide</button>
</nav>
```
CSS: `.footnav` centered pill, `flex-wrap:wrap`, `border-radius:999px` (desktop), `border-radius:16px` (mobile @580px). `.footlabel` = "More" label.

### Weights Buttons (line 549)

```html
<button class="resetbtn" id="modelWBtn" style="margin-right:6px;">Use model weights</button>
<button class="resetbtn" id="personalWBtn">Back to my weights</button>
```
Both `.resetbtn` (blue gradient pill, l.247-248). No inert/active state differentiation currently.

### Badges (lines 625-631)

Badges rendered inside team rows in rankings table:
```javascript
let badges = "";
if (syn.runBadge) badges += `<span class="badge badge-run">Can't Run</span>`;
if (syn.passBadge) badges += `<span class="badge badge-pass">Weak D</span>`;
if (syn.passGameBadge)
	badges += `<span class="badge badge-passfail">Can't Pass</span>`;
```
Rendered inside team cell: `<td><div class="team">${row.team}${badges}</div>...`

### Player Browser (lines 721-815)

Full list rendered, no pagination/cap. `renderPlayers()` outputs all filtered players.

---

## Analysis for Each Task

---

### (a) Footer Pill WITHOUT "MORE" Label

#### Current State (VERIFIED)

```html
<nav class="footnav" aria-label="More tools">
  <span class="footlabel">More</span>
  <button class="footlink active" id="tabDraftBtn">Simulator</button>
  <button class="footlink" id="tabRankingsBtn">Madden Rankings</button>
  <button class="footlink" id="tabPlayersBtn">Player Browser</button>
  <button class="footlink" id="tabGroupsBtn">Position Rankings</button>
  <button class="footlink" id="tabCompareBtn">Team Comparison</button>
  <button class="footlink" id="tabGuideBtn">Guide</button>
```

#### 390px Analysis (VERIFIED via CSS)

- `.footnav` at mobile: `border-radius:16px`, `flex-wrap:wrap`, `gap:4px`, `padding:8px 10px`
- `.footlabel`: `font-size:0.68rem`, `margin:0 6px 0 8px`
- `.footlink`: `font-size:0.74rem`, `padding:5px 10px`, `border-radius:999px`

**Without "MORE" label:**
- Pill width reduces by ~40px (label + margins)
- 6 buttons still fit at 390px with `flex-wrap:wrap` (2-3 per row)
- Pill remains centered (`justify-content:center`)
- `aria-label="More tools"` becomes misleading — should change to `aria-label="Navigation"` or similar

#### 1280px Analysis

- All 6 buttons fit on single row comfortably
- Label removal saves ~60px horizontal space
- Pill remains centered, balanced

#### Judgment

| Aspect                        | Assessment                                                           |
| ----------------------------- | -------------------------------------------------------------------- |
| **Still reads as nav?**       | ✅ Yes — 6 labeled buttons clearly indicate navigation               |
| **aria-label change needed?** | **YES** — `aria-label="More tools"` → `aria-label="Main navigation"` |
| **390px balance**             | ✅ Pill shrinks gracefully; 2-3 buttons per row                      |
| **1280px balance**            | ✅ Single row, centered, spacious                                    |

**Shipped Change:** Remove `<span class="footlabel">More</span>`, update `aria-label="Main navigation"`

---

### (b) Weights Buttons — Two States

#### Current State (VERIFIED)

```html
<button class="resetbtn" id="modelWBtn" style="margin-right:6px;">Use model weights</button>
<button class="resetbtn" id="personalWBtn">Back to my weights</button>
```
Both use `.resetbtn` (blue gradient, l.247-248):
```css
.resetbtn {
	background: linear-gradient(90deg, var(--accent), #6aa6ff);
	border-radius: 999px;
	font-weight: 700;
	box-shadow: 0 6px 18px var(--glow);
}
.resetbtn:hover {
	opacity: 1;
	transform: translateY(-1px);
	box-shadow: 0 10px 24px var(--glow);
}
```

#### Required States (Owner Directive)

| Button                               | Inert (Default)                        | Active (After Change)     |
| ------------------------------------ | -------------------------------------- | ------------------------- |
| **modelWBtn** ("Default")            | Blue/active (default)                  | Blue/active               |
| **personalWBtn** ("Save My Weights") | **Transparent/inert** (like `.tabbtn`) | Blue/active (`.resetbtn`) |

#### Transparent/Inert Style (like `.tabbtn` / "Sim to End")

```css
.tabbtn {
	background: var(--panel);
	color: var(--sub);
	border: 1px solid var(--border);
	border-radius: 8px;
	padding: 8px 16px;
	font-size: 0.78rem;
	cursor: pointer;
}
.tabbtn:hover {
	background: var(--panel2);
}
```

#### Required Implementation

```javascript
// State tracking
let weightsDirty = false;

function updateWeightButtons() {
	const modelBtn = document.getElementById("modelWBtn");
	const personalBtn = document.getElementById("personalWBtn");

	// Model weights button: always blue/active
	modelBtn.className = "resetbtn";
	modelBtn.textContent = "Default";

	// Personal weights button: conditional
	if (weightsDirty) {
		personalBtn.className = "resetbtn";
		personalBtn.textContent = "My Weights";
		personalBtn.disabled = false;
	} else {
		personalBtn.className = "tabbtn"; // Transparent/inert
		personalBtn.textContent = "Save My Weights";
		personalBtn.disabled = true; // Or just visually inert
	}
}
```

#### Measurements (1280px & 390px)

| State                   | Button   | Size (est.) | Contrast vs Panel        | Notes                                             |
| ----------------------- | -------- | ----------- | ------------------------ | ------------------------------------------------- |
| **Default (Blue)**      | Both     | ~120×40px   | High (white on gradient) | ✅ Clear primary action                           |
| **Inert (Transparent)** | Personal | ~120×40px   | Low (sub text on panel)  | ⚠️ **Risk**: Disabled+transparent may look broken |
| **Active (Blue)**       | Personal | ~120×40px   | High                     | ✅ Clear                                          |

#### Judgment

| Aspect                                | Assessment                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------- |
| **Transparent + disabled confusing?** | **YES** — Grayed-out button next to bright blue one looks broken/unavailable    |
| **Owner's "Sim to End" reference**    | `.tabbtn` styling works but needs clear visual distinction from disabled state  |
| **Better approach**                   | **Don't disable** — keep clickable but show "No changes to save" toast on click |

**Recommended Implementation:**
```css
/* Inert state — visible but subdued */
.resetbtn.inert {
	background: var(--panel);
	color: var(--sub);
	border: 1px solid var(--border);
	box-shadow: none;
}
.resetbtn.inert:hover {
	background: var(--panel2);
}
```

---

### (c) Badges Moved to Bottom Strip

#### Current State (VERIFIED)

Badges render **inside team rows** in rankings table (line 632):
```html
<td><div class="team">${row.team}${badges}</div><div class="narr">${narr}...</div></td>
```
Badges: `.badge-run` (Can't Run), `.badge-pass` (Weak D), `.badge-passfail` (Can't Pass)

#### Proposed: Move to Bottom Strip

```html
<div class="badge-strip" style="display:flex;flex-wrap:wrap;gap:6px;padding:12px;justify-content:center;">
  <!-- All badges from all 32 teams -->
</div>
```

#### 390px Analysis

| Aspect           | Current (In-row)           | Proposed (Bottom Strip)                         |
| ---------------- | -------------------------- | ----------------------------------------------- |
| **Context**      | ✅ Badge next to team name | ❌ **Lost** — badge floats without team context |
| **Space**        | Fits in row                | Strip wraps at 390px (3-4 badges/row)           |
| **Scannability** | ✅ Per-team                | ❌ **Lost** — must mentally map badge→team      |

#### 1280px Analysis

- Strip fits horizontally (32 teams × 0-3 badges)
- But **context loss is severe** — "Can't Run" badge no longer attached to team

#### Judgment

| Aspect             | Assessment                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **Context loss**   | **SEVERE** — Badge meaning tied to team (e.g., "Can't Run" = team's run game weak)                                       |
| **UX-truth issue** | Chip that sat next to team name now floats without its team                                                              |
| **Recommendation** | **Don't move** — or if moved, must include team name on each badge: `<span class="badge badge-run">KC: Can't Run</span>` |

**Recommendation:** **Don't move badges** — context loss is severe. If Owner insists, format as "TEAM: Badge" in strip.

---

### (d) Player Browser Capped at ~15 on Desktop

#### Current State (VERIFIED)

- Full list rendered (1,200+ players)
- No pagination/cap
- Filters: search, position checkboxes, team dropdown, column sort

#### Owner Directive

> "Player browser: ~15 players visible on desktop. Footer tabs always visible at bottom."

#### Implementation Options

| Approach               | Desktop                               | Mobile        | Effort |
| ---------------------- | ------------------------------------- | ------------- | ------ |
| **CSS-only cap**       | `max-height: 600px; overflow-y: auto` | Native scroll | Low    |
| **"Show more" button** | Load 15, button loads +15             | Same          | Medium |
| **Pagination**         | Page 1 of N                           | Page 1 of N   | Medium |
| **Virtual scroll**     | Smooth                                | Smooth        | High   |

#### Recommendation: **"Show More" Button**

```javascript
let visibleCount = 15;
function renderPlayers() {
	// ... existing filter/sort logic ...
	const displayRows = rows.slice(0, visibleCount);
	// ... render displayRows ...

	// Show more button
	if (rows.length > visibleCount) {
		h += `<button class="tabbtn" id="showMoreBtn" style="width:100%;margin-top:12px;">
      Show ${Math.min(15, rows.length - visibleCount)} more (${rows.length - visibleCount} remaining)
    </button>`;
	}
	body.innerHTML = h;

	document.getElementById("showMoreBtn")?.addEventListener("click", () => {
		visibleCount += 15;
		renderPlayers();
	});
}
```

#### 390px vs 1280px

| Viewport   | Visible  | Behavior                     |
| ---------- | -------- | ---------------------------- |
| **1280px** | ~15 rows | "Show more" button at bottom |
| **390px**  | ~15 rows | Same; button full-width      |

**Footer tabs always visible** — already fixed position at bottom.

---

## Summary of Judgments

| Task                    | Decision                                                       | Key Rationale                                                             |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **(a) Footer "MORE"**   | Remove label; `aria-label="Main navigation"`                   | Still reads as nav; pill balances at 390px                                |
| **(b) Weights buttons** | Two states: Default=blue, Personal=inert `.tabbtn` until dirty | Transparent+disabled confusing; use inert `.tabbtn` class, not `disabled` |
| **(c) Badges**          | **Don't move** — context loss severe                           | If forced: format as "TEAM: Badge"                                        |
| **(d) Player Browser**  | Cap at 15 with "Show more" button                              | Simple, works both viewports                                              |

---

## What I Did Not Check

| Item                                                 | Reason                       |
| ---------------------------------------------------- | ---------------------------- |
| Focus/hover states for new button styles             | Requires interactive testing |
| Screen reader announcements for button state changes | Needs a11y testing           |
| Keyboard navigation for "Show more"                  | Not tested                   |
| Badge strip at 1280px with team names                | Not mocked up                |
| Animation/transition for button state changes        | Not specified                |
| Player browser filter persistence with "Show more"   | Logic needs verification     |

---

**Deliverable:** `_agents/nemotron-3-ultra-free/notes/v21-visual-items-2-3-5-8.md`

**SPEAKER: Ultra | ROLE: Council Advisor | TASK: V21 visual items 2,3,5,8 analysis | DATE: 2026-10-21T20:00:00Z**
