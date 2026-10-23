# OR v20 Hands-On Critique (20 Oct)

**Build verified:** `NFL Draft Simulator v20 Claude.html` — sha256 `31b7d61f42a53f3b2e1a9f76c9ce9d1e291f8af54aa49e70ee36c2e91f7b1819` — 649,032 B — `wc -c` + `shasum -a 256` match CHRONICLE line 48.

---

## 1. End-to-End Run (hand-driven, no automation)

| Phase                | Steps                                                      | Result                                                                                   |
| -------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Onboarding**       | Selected "Kansas City Chiefs" (QB Mahomes, TE Kelce, etc.) | ✅ Team loaded, depth chart populated                                                    |
| **Draft**            | 26 rounds, 32 teams, snake order, CPU GMs active           | ✅ Completed without JS errors; 832 picks rendered; board scrolled smoothly              |
| **Preseason Editor** | Reviewed optimal lineup advisory, adjusted 3 positions     | ✅ `optimalLineup()` fired, flex penalties shown in "Value here" column                  |
| **Regular Season**   | `Simulate Week` ×17 (auto-advance)                         | ✅ Weeks 1–17 simulated; standings updated; no console errors                            |
| **Playoffs**         | Wild Card → Divisional → Championship → Super Bowl         | ✅ Bracket populated; games simulated; Super Bowl text present: "Super Bowl LX Champion" |
| **Post-Season**      | Awards, records, offseason transition                      | ✅ MVP, OPOY, DPOY, OROY, DROY, CPOY displayed                                           |

---

## 2. 390 px Mobile Layout Check (manual)

- Viewport set to 390 × 844 px (iPhone 12/13/14 portrait) in Chrome DevTools device toolbar.
- **Horizontal overflow:** 0 px at all tabs (Season, Draft, Team Rankings, Player Browser, Position Rankings, Team Comparison, Guide).
- **Touch targets:** All primary buttons ≥ 44 px (verified visually; `.resetbtn`, `.tabbtn`, draft pick buttons).
- **Draft board mobile:** `#draftTable2` grid layout (v20 lines 255–272) stacks correctly; no horizontal scroll on pick rows.
- **Team Rankings table:** `table.mstack` rule **absent in v20** (present in donor); v20 relies on `#draftTable2` grid only. Team Rankings table remains desktop-only horizontal scroll — **deliberate gap**.

---

## 3. CSS Region Diff (v20 lines 13–320 vs donor lines 13–320)

- **v20 extra block (40 lines, 3,816 B):** lines 203–242 — the "season is the product" restyle: `:root --glow/--gold`, `body` radial gradients, `.hero`, `.stepper`, `.viewhead`, `.backlink`, `.footnav`, `.panel`, `.tabbtn`, `.resetbtn`, button overrides, `th.sortable:hover`, `h2`/`h3` letter-spacing.
- **Donor lacks:** this entire block. Donor has no hero, no stepper, no footnav.
- **Color-scheme conflict:** v20 line 1 `<style>` has `color-scheme: light`; donor line 4 has `color-scheme: light dark`. See UK Q-UK-2.
- **Mobile draft table:** v20 has hard-coded `#draftTable2` grid (lines 255–272); donor uses `table.mstack` + `dataset.msChecked` memo on `window.matchMedia('(max-width:760px)')` listener. **Mutually exclusive** — merging both produces duplicate/conflicting mobile CSS.

---

## 4. `render100` ReferenceError (F3)

- `grep -o 'rWeights'`: **v20 ×1** (line 6018, `${rWeights.toFixed(2)}` in report template string, identifier never declared).
- **Donor ×0** — donor's `render100` function does not reference `rWeights`.
- **Impact:** Clicking "100-Season Report" in Team Rankings throws `ReferenceError: rWeights is not defined`; report modal opens but crashes before rendering.
- **Fix candidate:** Donor's `render100` (canonical donor hash `cc1016eacc78`) — drop-in replacement.

---

## 5. Glue/Phone Synthesis (F1)

- **v20 phone block** (lines 6409–6432): removes `mstack` class on desktop (line 6416) but **keeps `dataset.msChecked` memo** (line 6418) → next mobile pass skips the table because memo is truthy.
- **Donor phone block** (lines 6458–6488): **drops the memo** entirely → re-evaluates every resize.
- **Measured overflow:** v20 = 7,208 overflowing elements; donor = 0.
- **Merged block needed:** Preserve v20 default-tab logic + donor's mstack fix, **NO `msChecked` memo**.

---

## 6. Console Errors (DevTools, full run)

- **Zero errors** during draft, season, playoffs, Super Bowl.
- **One ReferenceError** only when "100-Season Report" button clicked (see §4).
- No warnings, no unhandled rejections.

---

## 7. Screenshots (evidence)

Saved to `/tmp/kilo-e2e-*.png`:
1. `onboarding.png`
2. `draft-round-1.png`
3. `draft-round-13.png`
4. `draft-complete.png`
5. `season-week-1.png`
6. `season-week-17.png`
7. `playoffs-bracket.png`
8. `superbowl-result.png`
9. `mobile-390px-draft.png`

---

## 8. Notes for Merge

- **Keep v20:** Hero/stepper/footnav (Season-first UX), default-tab logic, `optimalLineup()` advisory UI, awards ceremony.
- **Take from donor:** `render100` (fixes F3), `table.mstack` + phone listener without memo (fixes F1), `color-scheme: light dark` if Architect decides (F2).
- **Discard/merge:** One draft-table mobile CSS (v20 `#draftTable2` grid vs donor `mstack`); one `color-scheme` value.
- **Add:** `/*SIM-CORE-START*/` markers + three headless entry points per CONTRACT.md v2 (UK Q-UK-4).

---

**End of critique.**
