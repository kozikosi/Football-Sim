SPEAKER: OR | ROLE: Council Adviser | TASK: Brainstorm/Innovate improvements to cakepanz / UI/UX shell for Claude's engine | DATE: 2026-11-19T09:25:54Z

FOR: _agents/QUEUE.md item 71 follow-up (innovation after review)

# BRAINSTORM / INNOVATION — cakepanz UI/UX Shell for Claude's Engine

## 1. Implications of cakepanz-9 Work

### What Changed Fundamentally:
- **Uniform Board (B-bis)**: The flip is GONE. One board, 32 picks. This simplifies the mental model massively.
- **Suggestion Ring (C′1)**: Top-3 (or tied) rows get a gold shimmer ring — a "speedrun path" for the user.
- **Wall-Slip Cascade (C′3)**: Complete screen content reveals with staggered animation (≤860ms total), respects reduced motion.
- **Roster Print (C′2)**: Reuses advice panel anatomy, marks three weakest, zero new text.
- **Tokenized Gold (C′4)**: All gold literals → CSS custom properties (`var(--gold2)`, `var(--gold3)`, `var(--goldm)`). Contrast verified.

### What This Means for the Shell Architecture:
1. **The seam (`src/lib/port/seam.ts`) is the TRUE boundary**. The shell imports ONLY the port's bindings and VMs. Zero engine files touched.
2. **The battery/falsifier system is the QA backbone**. Every feature has a law (L12, L13, L14, L15) and a falsifier (F19, F20, F21, F22).
3. **Token system is now robust**: `tokens-w89.css` provides the palette law. The shell NEVER hardcodes colors.
4. **Reduced motion is first-class**: Every animation has `@media (prefers-reduced-motion: reduce)` and `body.cp-reduced` hooks.
5. **The 390px law holds**: The desktop grid's fixed columns were the problem; the fix tightens columns on narrow viewports.

---

## 2. Innovation Opportunities — UI/UX Shell

### A. Deterministic Draft Replay (The `?seed=` Problem)

**Current State**: The seed is generated once at `startDraft()` (line 109 in App.svelte: `seed = 1000 + Math.floor(Math.random() * 9000)`). No way to reproduce a draft.

**Innovation**: Add a `?seed=12345` URL parameter that locks the RNG.
```typescript
// In App.svelte boot_():
const urlSeed = new URLSearchParams(location.search).get('seed');
if (urlSeed) seed = parseInt(urlSeed, 10);
// Else generate random as before
```
**Benefits**: 
- Reproducible bug reports (share a URL, exact same draft)
- Deterministic testing in batteries
- "Challenge a friend with the same board" sharing

**Where it touches**: `startDraft()`, `makeRng()`, the pick flow. The engine already takes a seed; just thread it through.

---

### B. Live Pick Probability Heatmap

**Current State**: Gone% is a single number per row (tooltip shows method).

**Innovation**: Show a mini sparkline / heatmap on each row indicating "how volatile is this pick?"
- Green sparkline = stable (CPU rarely takes him before you)
- Red sparkline = volatile (high chance CPU snipes him)
- Gray = unknown (CPU on the clock)

**Implementation**: The `goneOdds()` already returns the distribution across simulations. Thread `odds.distribution` (array of counts per sim bucket) down to `BoardRow`, render as 10px wide inline SVG or CSS gradient.

**Battery Law**: "Rows with distribution variance > threshold show red sparkline" + falsifier plants flat distribution → green.

---

### C. Keyboard-First Navigation (Accessibility Depth)

**Current State**: Mouse-driven. Keyboard works but not optimized.

**Innovation**: Full keyboard control:
- `j`/`k` or `↓`/`↑` = navigate rows
- `Enter` = open detail / pick
- `Esc` = close detail / back
- `1`/`2`/`3` = quick-pick top 3 suggestions
- `/` = focus sort dropdown
- `?` = show keyboard help overlay

**Implementation**: Add `onkeydown` to `DraftBoard` or `BoardRow`, manage a `focusedRowId` in App state. The battery should have a law: "Tab order visits every interactive element exactly once" + falsifier breaks tab order → red.

---

### D. Smart "What If" Without Engine Changes (Shell-Only)

**Current State**: No what-if.

**Innovation**: Shell-level simulation overlay:
1. User clicks "What If I skip this pick?" → shell clones the draft record, simulates CPU picks to user's next turn using the existing `goneOdds` logic, shows projected board.
2. No engine changes — the shell already has `makeRng`, `goneOdds`, `boardVM`.
3. Overlay is a modal with "Return to reality" button.

**Battery Law**: "What-if overlay renders without mutating store state" + falsifier mutates store → red.

---

### E. Team Identity Badge on Every Screen

**Current State**: Team name only in topbar on some screens.

**Innovation**: Persistent team identity chip (top-right, next to Saves button):
- Shows team logo (inline SVG from `TEAMS` data)
- Team name + record (W-L) when season running
- Click = quick jump to Team Select (change team mid-draft? No — but could be "view other team's board" read-only)

**Benefit**: Reinforces "you ARE this team" mental model. The Owner's doctrine: "user's team in blue (.ub)".

---

### F. Draft Grade / Confidence Meter

**Current State**: No real-time feedback on draft quality.

**Innovation**: A subtle meter (topbar, next to brand):
- Computes: sum of `wins` for picked players vs. theoretical max (best available at each pick)
- Shows letter grade (A+/A/B+/B/C...) or confidence %
- Updates after each pick
- Click = expands to show "steals" (negative priority) and "reaches" (positive priority)

**Data already exists**: `picksWithValue` in engine (steals/reaches computation). Thread to shell.

---

### G. Offline-First PWA (The Hard Requirement)

**Current State**: Works offline but no manifest, no service worker.

**Innovation**: Add `manifest.json` + `sw.js` (Workbox or minimal):
- Cache `single.html` + all assets (tokens, fonts)
- "Install as app" prompt
- Background sync for saves (IndexedDB → localStorage already works, but SW adds resilience)
- The Owner said: "Offline is a hard requirement."

**Battery Law**: "App loads and runs fully offline after first visit" + falsifier simulates offline → red.

---

### H. Shareable "Draft Story" (Beyond Current Share Screen)

**Current State**: Share screen exists (Share.svelte).

**Innovation**: One-click "Export Draft Story" → generates a self-contained HTML file (like the single-file product) that:
- Shows the draft board with all picks
- Has the Complete roster
- Has the season results (if played)
- Is a single HTML file (offline, shareable)
- Uses the same token system, same CSS

**Implementation**: The shell already renders everything. Just serialize the current state + render to string + wrap in HTML template. The `single.html` build IS the template.

---

### I. Dynamic Theme: Team Colors Without Hardcoding

**Current State**: User's team = blue (`.ub`). Opponent = red. Static.

**Innovation**: Team-aware theming:
- Each NFL team has primary/secondary colors in `TEAMS` data
- CSS custom properties: `--team-primary`, `--team-secondary`
- On team select, `applyTeam()` sets these on `:root`
- User's team row gets `.ub` + team primary color accent
- Opponent rows get team secondary as subtle accent
- Falls back to blue/red for unknown teams

**Constraint**: Must work offline (no external assets). Inline the color map in `TEAMS` data.

---

### J. "Time Travel" Draft History Slider

**Current State**: Undo = one step. No history view.

**Innovation**: A slider (bottom of board, hidden by default):
- Shows pick # / round
- Drag to any pick → board shows state at that moment (read-only)
- "Branch here" = create a new draft from that point (fork)
- Uses existing autosave/save system

**Data**: The draft record already has full pick history. The shell just needs to render historical `boardVM` states.

---

## 3. Technical Debt / Architecture Improvements

### 1. Extract `BoardRow` Numeric Cell Logic
The `CAP` object and `aria-label`/`title` are duplicated logic. Extract to a composable:
```typescript
// lib/composables/useBoardCell.ts
export function useBoardCell(r: BoardRowVM, sort: BoardSort) {
  const caption = computed(() => /* WINS / PRIO / OVR based on sort */);
  const ariaLabel = computed(() => caption.value);
  return { caption, ariaLabel };
}
```

### 2. Unify Error Handling Pattern
`error` state is a string. Some errors are user-facing, some are dev-only. Split:
```typescript
const userError = $state('');
const devError = $state('');
// User errors → toast/banner; Dev errors → console + optional panel
```

### 3. The `valuation.lock()` Pattern
`valuation.lock()` disables the mode switch mid-draft. This is a side effect on a singleton. Better: the mode switch component reads `draftState.status === 'drafting'` and disables itself. Remove the lock call.

### 4. `makeRng` / `seed` Threading
`seed` is a `let` in App.svelte. Thread it through `refresh()` → `goneOdds()` → `boardVM()`. Make it a readable store so the battery can assert determinism.

### 5. The `onMount` Boot Sequence
`boot_()` does async work (SHA256, hydrateBoot). The `onMount` return doesn't await. If hydrateBoot navigates, the cleanup might run mid-nav. Wrap in `try/finally` or use a loading gate.

---

## 4. Specific "Owner Doctrine" Aligned Ideas

### From AGENTS.md §3 (Product Rules):
> "plain informative language in recaps... every turnover named... overtime events only in the overtime block... user's team in blue (.ub)... a QB may flex ONLY to FS, at -12... the engine never re-lineups the user's team on its own (advice only, adviseLineup)"

### Aligned Innovations:

1. **Turnover Feed in Game Recap**: The Feed screen already exists. Add a "Turnovers" tab that lists every turnover with player name, quarter, field position. Uses existing `feedForGame`.

2. **Overtime Block Isolation**: In `WeekView` / `Feed`, ensure OT events are visually grouped under "OVERTIME" header, never mixed with 4th quarter.

3. **QB→FS Flex Badge**: In `BoardRow` detail, if a QB has `alsoFits` including FS, show a special badge "QB→FS (-12)" — the ONLY QB flex. Educates the user on the doctrine.

4. **Advice Panel = Advice Only**: The `LineupAdvice` already shows placements. Add a subtle "This is advice — you decide" caption. Never auto-apply.

5. **Blue for User's Team Everywhere**: Audit every screen for `.ub` class. `Standings`, `Bracket`, `Book`, `Review` — user's team row should be blue.

---

## 5. Battery / Falsifier Expansion Ideas

### Current Battery Coverage:
- Node: 33 laws
- Slice: 29/0/10/3
- Shell: 48 laws (S1a–S31 + L12)
- Board: 6 laws (L13/L8/L14/L15/L10/L11)

### Missing Coverage (Should Add):
1. **Keyboard Navigation Battery**: 10 laws (tab order, arrow keys, Enter/Esc, shortcuts)
2. **Reduced Motion Battery**: 5 laws (every animation has reduced-motion half, body.cp-reduced instant)
3. **Offline Battery**: 3 laws (loads offline, saves persist, no network requests)
4. **Deterministic Seed Battery**: 3 laws (?seed=X produces identical board, seed displayed in URL)
5. **Team Identity Battery**: 3 laws (user team blue everywhere, team chip shows correct name/logo)

### Falsifier Patterns to Reuse:
- "Plant the bug → law dies" (the proven pattern)
- "Delete the feature → law dies"
- "Mutate the state → law dies"

---

## 6. Migration Path: Vue 3 vs Svelte 5 (R-13)

**Context**: The Owner ruled Svelte is NOT a lock (2026-11-12). Two arms: Vue 3 + Vite vs Svelte 5 + Vite. Z.ai builds both, measurement decides.

### Shell Portability Assessment:
**Portable (plain TS, no framework)**:
- `src/lib/port/` (seam, stores, router, settings, savesApp, hydrateApp, feedVM, seasonFacade, seasonStats, seasonSession, valuation, tokensApply)
- `src/lib/bindings/` (stores.ts — just Svelte store wrappers)
- `src/data/` (CSV imports)
- Engine (completely separate)

**Framework-Specific (Svelte)**:
- `src/App.svelte` (the composition root)
- `src/lib/components/*.svelte` (all UI components)
- `src/lib/screens/*.svelte` (all screen components)
- `src/lib/assets/shell.css` (CSS is portable but uses Svelte's `:global()`)

### Migration Strategy:
1. **Extract all logic from components into plain TS composables/functions** (already mostly done via `port/`)
2. **Components become thin render-only shells** (props in, events out, zero logic)
3. **CSS stays identical** (tokens-w89.css + shell.css)
4. **Battery tests run against the PORT layer**, not the framework layer
5. **Vue port = new `src/` tree with same port imports, Vue SFCs instead of Svelte**

### Measurement Criteria (for the Owner's test):
- Bundle size (gzipped single.html)
- First paint / interactive (Lighthouse)
- 390px law compliance
- Battery pass rate (identical tests)
- Developer experience (hot reload speed, type safety)

---

## 7. Priority Ranking for Next Round

| Priority | Item | Effort | Impact | Blocked By |
|----------|------|--------|--------|------------|
| P0 | `?seed=` deterministic draft | 1 day | High (reproducibility, sharing, testing) | None |
| P0 | PWA manifest + SW (offline hard req) | 2 days | Hard requirement | None |
| P1 | Keyboard navigation | 2 days | High (accessibility) | None |
| P1 | Team identity chip (topbar) | 0.5 days | Medium (doctrine alignment) | None |
| P1 | QB→FS flex badge | 0.5 days | Medium (doctrine alignment) | None |
| P2 | Live pick probability heatmap | 2 days | High (UX innovation) | goneOdds distribution |
| P2 | Draft grade / confidence meter | 1 day | Medium (feedback loop) | picksWithValue threading |
| P2 | Shareable "Draft Story" HTML export | 1 day | High (viral/sharing) | single.html template |
| P3 | Dynamic team theming | 2 days | Medium (polish) | TEAMS color data |
| P3 | What-if overlay (shell-only) | 3 days | High (innovation) | goneOdds + boardVM clone |
| P3 | Time travel history slider | 3 days | Medium (power user) | Draft record history |

---

## 8. Final Thought

The cakepanz shell is **architecturally clean**: the seam boundary is real, the battery/falsifier system is rigorous, the token system is robust. The uniform board (B-bis) was the right call — it removed a mode that added complexity without proportional value.

The next wave of innovation should focus on:
1. **Determinism** (`?seed=`) — unlocks testing, sharing, debugging
2. **Offline-first** (PWA) — the Owner's hard requirement
3. **Keyboard-first** — accessibility depth
4. **User feedback loops** (grade, heatmap, what-if) — the "speedrun path" the Owner wants

All of these are **shell-only** — zero engine changes, zero pin movement, zero Owner-gated items. They ride the existing port layer.

**Recommendation**: Take P0 items first (?seed=, PWA), then P1 (keyboard, team chip, QB→FS badge), then evaluate P2 based on Owner feedback.

---

*End of brainstorm. Ready for queue intake or Owner directive.*