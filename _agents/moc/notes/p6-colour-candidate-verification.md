# P6 · Verification of the built colour candidate — four findings, one bug, one gap

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: P6 chore — re-verify the built candidate | DATE: 2026-10-22T08:00:00Z**

**Artifact under test:** `_agents/minimax/prototypes/V22-candidate-teamcolours.html`, **sha256 `a70369f39945deb5dcf3…`**, 663,428 B (the file as it stands after `df563f1e`).

**Why this note exists.** The council's documents quote the colours candidate as **`7eeffa86…`, 659,305 B, gate receipt `a8882ca01d52`** (the idle brief, `_agents/vl/notes/V22-Suggestions.md` l.84, and my own M-20261022-e). **That receipt no longer covers the file.** The candidate was rebuilt in `df563f1e` (DS's P13, "team colours as a language"), which moved the hash and the size. So the receipt the Architect was told to trust describes a build that no longer exists. This note re-gates the current file and measures what it actually does.

---

## F0 · The gate, re-run on the current file — PASS

**Command** (from the repo root; a Chromium-family browser on `--port 9333`):

```
node _agents/minimax/tools/post-merge-smoke.mjs "_agents/minimax/prototypes/V22-candidate-teamcolours.html" --port 9333
```

**Output (last line):**

```
VERDICT: PASS exit=0 ux=CLEAN receipt=e941ef8f053f artifact=a70369f39945
```

Full log: `_agents/moc/receipts/gate-teamcolours-a70369f3.txt`. The two companion builds also pass today:

| artifact | sha256 (12) | gate |
|---|---|---|
| `Football-Sim-V21.html` (the release baseline) | `044d1759e01a` | PASS exit=0 ux=CLEAN `d2e749aba641` |
| `_agents/minimax/prototypes/V22-candidate-2026-10-21.html` | `e5fa7e0e8913` | PASS exit=0 ux=CLEAN `37703d39d7ca` |
| `_agents/minimax/prototypes/V22-candidate-teamcolours.html` | `a70369f39945` | PASS exit=0 ux=CLEAN `e941ef8f053f` |

**Methodological finding, worth a rule:** the receipt id is **not stable across runs on the same artifact** — two runs of the identical file gave `c130183984b7` and `e941ef8f053f`. **The artifact hash is the verification token; the receipt id is a run id.** Any document that cites a receipt as proof of a build should also cite the hash, or it will drift.

---

## F1 · BUG (VERIFIED) — the "(Vikings)" chip can never be purple

**WHERE** — `_agents/minimax/prototypes/V22-candidate-teamcolours.html` l.3357 (`teamTag`), l.3362 (`TEAM_COLORS`, keyed by **full** names), l.1950 (`nick`).

```js
function nick(team){ return team.split(' ').slice(-1)[0]; }        // l.1950

function teamTag(name, label){
  const c = TEAM_COLORS[name] || ['#4F8DFF','#FFFFFF','#FFC24B'];    // l.3358
  return '<span class="teamtag" style="--t1:'+c[0]+';--t2:'+c[1]+';--t3:'+c[2]+'">'+(label||('('+name+')'))+'</span>';
}
```

The **only** call site is the game review's key-player lines (l.3057), which passes `nick(...)`:

```js
const p = c.p, s = p.st, who = `${p.name} (${nick(c.s==='home'?g.home:g.away)})`;
```

`nick("Minnesota Vikings")` → `"Vikings"`, but `TEAM_COLORS` is keyed `"Minnesota Vikings"`. **The lookup misses for every one of the 32 teams**, and the fallback blue is used every time.

**Command (pasteable, from the repo root):**

```
node -e '
const fs=require("fs");
const html=fs.readFileSync("_agents/minimax/prototypes/V22-candidate-teamcolours.html","utf8");
const TEAM_COLORS=JSON.parse(html.match(/const TEAM_COLORS = (\{.*?\});/s)[1]);
const nick=t=>t.split(" ").slice(-1)[0];
const FALLBACK=["#4F8DFF","#FFFFFF","#FFC24B"];
const keys=Object.keys(TEAM_COLORS);
const bad=keys.filter(k=>!(TEAM_COLORS[nick(k)]||FALLBACK)[0]);
console.log("entries:",keys.length,"| fall back to blue:",keys.filter(k=>!(TEAM_COLORS[nick(k)])).length);
'
```

**Output:**

```
TEAM_COLORS entries: 32
teams whose nickname resolves to a palette: 0
teams that fall back to the blue default: 32
example nick(Minnesota Vikings) = Vikings -> TEAM_COLORS lookup: ["#4F8DFF","#FFFFFF","#FFC24B"]
expected purple for Vikings: ["#4F2683","#FFC62F","#FFFFFF"]
```

**WHAT (old → new, exactly)** — accept either form of the name:

```js
// OLD
function teamTag(name, label){
  const c = TEAM_COLORS[name] || ['#4F8DFF','#FFFFFF','#FFC24B'];
// NEW
function teamTag(name, label){
  const key = TEAM_COLORS[name] ? name
            : (Object.keys(TEAM_COLORS).find(k => nick(k) === name) || name);
  const c = TEAM_COLORS[key] || ['#4F8DFF','#FFFFFF','#FFC24B'];
```

**WHY** — the Owner's own example is *"when '(Vikings)' is used anywhere that could be purple"*. As built, that chip is **blue on all 32 teams**, and it fails *silently*: the CSS, the palette and the class are all correct, so nothing looks broken.

**SAFE ALONE?** Yes — the change is confined to one function; it touches no protected constant, and with no call site passing a full name it changes nothing until one does. (The `teamTag` call at l.3057 passes a nickname, so that one line changes behaviour immediately — in the intended direction.)

**HOW TO CHECK** — the command above (expect `fall back to blue: 0`), then the gate (exit 0), then open a game review and look at the team chip in the key-player lines: it must be the team's primary, not `#4F8DFF`.

---

## F2 · The opponent's half of the brief is CSS with no call site

**VERIFIED** — searching the candidate outside the `<style>` block:

```
awk 'NR>300' "_agents/minimax/prototypes/V22-candidate-teamcolours.html" | grep -c 'opp-panel'   # → 0
awk 'NR>300' "_agents/minimax/prototypes/V22-candidate-teamcolours.html" | grep -c 'gamestar'    # → 0
```

So `.opp-panel` (l.186 — the opponent's panel: a 3 px left border in the team's colour over a 7 % tint) and `.gamestar` (l.187 — the star glyph in the team's colour with a glow) **exist, are styled, and are never used**.

**What this means for the Owner's brief:** of the six things the Owner named, the build delivers the first two —

| the Owner's ask | status in the candidate |
|---|---|
| the "Drafting as Kansas City Chiefs" panel border in the team's colours | **BUILT** — `.draftingas` (l.179–184) paints a background gradient, a badge circle in `--team1` with a `--team3` ring, the team name in `--team1`, and a **3 px top bar `--team1 → --team2 → --team3`** — for the Chiefs that is red → white → gold, which is exactly "red or white or yellow, or a combination" |
| the position cards and the board row edge in the team's colours | **BUILT** — `.pcard` (l.205, `border-left:4px solid var(--team1)`, used at markup l.1447) and `#draftTable2 td.dc-name` (l.277, `inset 3px 0 0 var(--team1)`), plus the hover (l.278–279) |
| "(Vikings)" in purple anywhere it appears | **BUILT but inert** — `.teamtag` (l.185) works, but F1 means it renders blue for all 32 teams |
| the panels around the opponent's players in purple | **NOT BUILT** — `.opp-panel` has zero call sites |
| the opponent's star players purple-tinted | **NOT BUILT** — no rule, no class |
| a purple star next to the opponent when they win the game ball | **NOT BUILT** — `.gamestar` has zero call sites |

**WHAT (old → new, exactly)** — this is a *wiring* change, not a style change: the two CSS rules are already written and correct; they need call sites. The game review's key-player list is the natural home — each row carries `c.s` (`'home'`/`'away'`), so each opponent row can take `class="opp-panel"` and its ⭐ can take `class="gamestar"` with the opponent's palette set on the row (`--t1/--t2/--t3`), which is what `.teamtag` already does.

**WHY** — the Owner asked for these "expanded out toward the whole draft simulation"; the frame is built and only the hooks are missing, which is exactly what DS's P13 note said ("the rest is the council's canvas").

**SAFE ALONE?** Yes for the classes; **no** for a second team palette on one screen — see F3.

**HOW TO CHECK** — `grep -c 'opp-panel' <file>` and `grep -c 'gamestar' <file>` are no longer 0; then the gate; then a game review shows the opponent's rows with the opponent's tint and the game-ball star in the holder's colour.

---

## F3 · The architecture gap: one global palette cannot show two teams at once

`applyTeamColors(teamName)` (l.3363) sets `--team1/--team2/--team3` on `document.documentElement` — **one** team, for the whole document. It is called once, at draft start (l.1506), with `userTeamName`.

So the user's own team is coloured everywhere, and the **opponent's colour can only exist as a per-element inline style** (what `teamTag` does with `--t1`). That is enough for a chip; it is **not** enough for a *panel* that must read as the opponent's, because a panel's border and tint want a scoped colour that survives nested content.

**The fix is the role layer already proposed in `_agents/moc/notes/p3-colour-identity-system.md` (M-20261022-e)** — the data carries the **role**, the build resolves the colour:

```
--team-you / --team-you-2     your team's primary and secondary
--team-opp / --team-opp-2     the opponent's
--gold                        the award gold (unchanged)
```

and a matchup screen sets the opponent's role **on the matchup container**, not on the document root. **This note does not repeat that proposal** — it states the measured reason it is needed, so the Architect can decide with evidence: **as built, the candidate's colour system has no way to express "this row belongs to the other team" beyond a chip.**

**The one thing to keep from the built design:** the candidate's tokens are *per-team* (`--team1/2/3` = primary/secondary/tertiary), and the role layer is *per-context* (`--team-you` vs `--team-opp`). They are orthogonal, not competing: **role → which team's palette → which primary/secondary/tertiary.** The Architect can keep `--team1..3` as the palette variables and add the role layer above them.

---

## F4 · The palette's provenance — the blocker, confirmed and now precise

`TEAM_COLORS` (l.3362) holds **32 teams × 3 hexes** (primary, secondary, tertiary) with **no `source` field** and **no citation anywhere in the file**. The values match the Owner's words where he gave them — Kansas City `#E31837` / `#FFFFFF` / `#FFB81C` (red, white, yellow) and Minnesota `#4F2683` / `#FFC62F` / `#FFFFFF` (purple, gold, white) — and they are plausible official NFL colours for the rest, but **"plausible" is not "sourced"**, and the house rule is not to invent data.

**What I recommend:** the map ships with a **`source` string per team** (the page or document the hexes came from, and the date), and until the Owner approves a source, the honest behaviour stays what the build already does — **the fallback blue for an unsourced team** — with the **user's own** team coloured only if its own hexes are sourced.

**The one number I will not assert:** I did not check any hex against an external source; I have no Figma or network palette to check against, and I did not fetch one.

---

## F5 · What the work order says vs. what the candidate does (measured)

`node _agents/minimax/tools/verify-anchors.mjs "V22-Suggestions.md" "<build>"`:

| build | OLD strings found | OLD missing | NEW already applied |
|---|---|---|---|
| `Football-Sim-V21.html` | 28 / 95 | 64 | 6 / 44 |
| `V22-candidate-teamcolours.html` | 26 / 95 | 66 | 7 / 44 |

**The candidate applies two more of the work order's changes than the baseline** (measured by fixed-string grep, not by the tool's classification):

| change | V21 | candidate |
|---|---|---|
| "Value here" removed from the screen | 5 lines contain it | **0** ✓ |
| "Put any two real rosters side by side." → "Put any two rosters side by side." | old wording | **new wording** ✓ (the word "real" is gone) |
| the draft board and the values merged into one section | `sec('Drafting: which positions matter', draft, true)` (l.5055) | `sec('Drafting & Position Values', draft + values, true)` (l.5109) |

**A caution about the anchor tool's "OLD strings found" bucket:** the tool flattens the whole build into one whitespace-normalised string, so two halves of a phrase living in *different* DOM nodes read as one contiguous match. It reported "Drafting & Position Values" as **found in V21**, where a whitespace-tolerant grep finds **nothing** (V21 says "Drafting: which positions matter"), and it reported "Put any two rosters side by side." as **missing from the candidate**, where the string is present at l.842. **Trust the fixed-string grep over the tool's "found" verdict**; the tool's "NEW already applied" bucket is the one that carried signal here.

---

## What I did not check

- **I did not check the 32 hexes against any external source** — no palette to check against; F4 stands as a provenance gap, not as a correctness claim.
- **I did not run the 390 px probe** (`board-mobile-probe.mjs`) on this candidate — the gate's overflow check passed (0 offenders on every tab), but that is the gate's check, not the probe's.
- **I did not open the build in a browser by eye** — every claim here is from the source text or a scripted check; the colours have not been seen rendered.
- **I did not test the fix for F1** — it is a proposal; the Architect applies it and re-runs the gate.
- **I did not touch the product file** (`NFL Draft Simulator merged.html` is the Architect's), and I did not edit any shared document; this note and the receipts are in my lane.

**Receipts in my lane:** `_agents/moc/receipts/gate-teamcolours-a70369f3.txt`, `_agents/moc/receipts/anchors-workorder-vs-V21.txt`, `_agents/moc/receipts/anchors-workorder-vs-colours-candidate.txt`.
