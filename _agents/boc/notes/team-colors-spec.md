# Team Colors on Draft Board — BOC (MOC request) — 21 Oct 2026

Read-only spec for Claude. No product edits by BOC. No invented colors.

## What makes the Draft Header look good (the recipe to follow)

`.draftingas` (l.180):
- `background: linear-gradient(90deg, rgba(79,140,255,0.15), rgba(255,107,74,0.08))` — tinted gradient (accent blue → accent2 orange at low opacity)
- `border: 1px solid var(--accent)` — accent-colored border
- `.badge-mono { background: var(--accent); color: #fff; }` — accent-filled circle
- `.das-text b { color: var(--accent); }` — accent-colored bold team name

The recipe: **gradient background (primary → secondary at 15%/8% opacity) + primary border + primary-filled badge + primary bold text.** Team colors must follow this same recipe with the user's team's primary/secondary colors swapped in for --accent/--accent2.

## Mechanism

### 1. TEAM_COLORS map (32 teams → primary/secondary/tertiary)

```
const TEAM_COLORS = {
  'Kansas City Chiefs': { primary: '#E31837', secondary: '#FFB81C', tertiary: '#000000' },
  'Seattle Seahawks':   { primary: '#002244', secondary: '#69BE28', tertiary: '#A5ACAF' },
  // ... 30 more
};
```
**Source of colors:** NOT invented by BOC. MiMo is verifying the data question. Recommended source: official NFL team brand guidelines or a verified public dataset (e.g., teamcolorcodes.com, or the NFL's own style guide). BOC does not have a verified 32-team color source and will not fabricate one. If MiMo's check finds a clean source, use it; otherwise, Claude must source them.

### 2. CSS variables set on the draft container

When the user's team is selected (draft start, l.1486), set:
```
const tc = TEAM_COLORS[userTeamName] || { primary: '#4f8cff', secondary: '#ff6b4a', tertiary: '#2a3142' };
document.getElementById('draftLive').style.setProperty('--team-primary', tc.primary);
document.getElementById('draftLive').style.setProperty('--team-secondary', tc.secondary);
document.getElementById('draftLive').style.setProperty('--team-tertiary', tc.tertiary);
```
Default (no team / casino): fall back to `--accent` (#4f8cff) and `--accent2` (#ff6b4a).

### 3. Elements that consume the team colors

- `.draftingas` (l.180): gradient `linear-gradient(90deg, primary 15%, secondary 8%)`, border `1px solid primary`, badge-mono background primary, das-text b color primary.
- Draft board header (thead, l.426 area): background tinted with primary at low opacity.
- Position cards (`.pcard`, l.1720): left border accent in primary.
- OVR chip (`.dc-ovr`): text color primary.
- Roster panel (l.1775, `draftRosterTotal`): accent color primary.
- Roster depth rows (l.1287, `.slotname`): accent color primary.
- Footer tabs (`.footnav`, l.239): border/accent primary (optional — may be too much; Claude decides).

### 4. How the user's team overrides the default

At draft start (l.1486), after `userTeamName` is resolved, set the CSS variables on `#draftLive`. All downstream elements inherit. When the user changes teams (new draft), re-set.

### 5. Degrade when no color

If `TEAM_COLORS[userTeamName]` is undefined, fall back to `{ primary: 'var(--accent)', secondary: 'var(--accent2)', tertiary: 'var(--border)' }`. No visual change from current behavior.

## What BOC did not check

- MiMo's data question: where the 32-team hex colors come from (verified source). BOC will not invent colors.
- Whether the draft board's position cards, roster panel, and footer tabs should ALL adopt team colors or only the drafting-as box (Owner said "anywhere else you can add beauty" — recommend starting with the drafting-as box + draft board header + position cards, and letting Claude decide the rest).
- Figma setup: Owner mentioned Figma access may need more setup. BOC does not have Figma configured; this is a tooling question for the Owner.
- Whether team colors should persist across the season view (currently only draft view has the drafting-as box).

## Verification needed

- Visual: drafting-as box, draft board header, position cards render in team colors.
- Fallback: unknown team renders in default blue/orange.
- No console errors. node --check on extracted script.


---

## MOC's pipeline recommendation (21 Oct, endorsed)

The product is a single file opened from `file://`, so the palette **cannot be fetched at runtime**. The JSON is the *source* (version-controlled, lintable by biome, schema-checked) and is **inlined into the HTML** by a small script at build time. Runtime fallback to the neutral accent (`--accent` #4f8cff / `--accent2` #ff6b4a) when a team has no colour or the palette is absent. Every colour needs a **provenance** field; no team may get an unsourced colour. The Chiefs' red-and-white and the Seahawks' blue-and-green are the test cases.

Biome's realistic contribution: validate the CSS (biome 2.x parses CSS), the palette JSON (schema and consistency), and the theme script — not design itself. Figma's realistic use: visual reference for the colour tokens (so the Owner sees the palette before it ships), not the source of truth for code. The council can proceed without Figma, because a written palette plus CSS variables is enough.

Prioritised beauty improvements (MOC's order, endorsed by BOC):
(a) Draft board team colours — tinted gradient, accent border, filled badge, accented name (BOC's recipe).
(b) Position cards — same palette on the left bar, plus the collapsed mobile row.
(c) Guide — the merged 'Drafting & Position Values' section needs sub-headings and a table of contents or it will not be readable.
(d) Team Comparison — colour the two teams' columns and let the Offense/Defense break be the visual hinge.
