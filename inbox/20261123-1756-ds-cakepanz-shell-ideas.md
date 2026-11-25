SPEAKER: ds | ROLE: council review seat | TASK: the next Cakepanz shell round — implications and ranked ideas | DATE: 2026-11-23T17:56Z

# Cakepanz / 76 Pancakes — the shell after the S15 close-out

**FOR:** Owner / Architect / Z.ai. **STATUS:** proposal — nothing here is built. Every item is shell-only unless marked **engine**; no engine file is touched by this document. **BASIS:** the `zai-s17-closeout-2026-11-23` bytes (seal 370/0, fence 69/69, build reproducible) and the review beside this file (`inbox/20261123-1756-ds-zai-s17-closeout-review.md`).

## The one-sentence implication

The close-out proves the **bytes** are trustworthy; the next round has to prove the **experience** is. The tests are green on the properties they measure (state, tokens, no horizontal scroll), while the phone board is unreadable, the "top three" is 4–45 rows, and the sort control is three screens below the thing it sorts. The shell's next leap is not more features; it is making the board behave like a decision surface on a phone and a desktop, and making its signals mean one thing.

Five consequences worth stating plainly:

1. **The engine/UI contract is missing one field.** The shell parses the display string to extend the top three because the VM strips the raw sort key (`draftBoard.ts:61`). That is why 45 rows can be "tied". The additive fix is `rawSort` in the VM; until it lands, the honest shell caps at three. This is the highest-value engine change for the shell and it is small.
2. **The board is the product, and its controls are below it.** Sort/undo/seed sit after 60 rows; the user changes the board's meaning, then is left at the bottom of the new order. The interaction hierarchy is inverted. A sticky board toolbar is a bigger UX win than any visual polish.
3. **The phone is not a narrow desktop.** The 390 grid is 42 px of name and 34 px of team with `overflow-wrap: anywhere`; the screenshot shows "Jorda/n Love". A phone board needs a card, a collapsed needs row, and a full-width Draft action. No-h-scroll is the floor, not the goal.
4. **Accessibility is structural now.** The numeric `aria-label`s were fixed, but the result is a 15-word accessible name ("TOPBrock Purdy … 7% gone odds") and 216 tab stops before the sort. The next a11y work is a concise name, one method disclosure, and a roving-tabindex grid — not more labels.
5. **The guardrails need to measure the experience.** The top-three law is checked at a fresh pick 1; the 390 law checks document scroll width; the contrast law blesses three known AA holes. A small layout/a11y battery with the measurements in the review is the highest-leverage test change.

---

## Ranked ideas (Owner value ÷ effort)

| # | Idea | Effort | Value | Engine? | Risk |
|---|---|---|---|---|---|
| 1 | **Top three means three** — cap + tie count + `rawSort` door | 0.5 d | Very high | interim no; permanent yes | Low |
| 2 | **The board as a decision table** — fixed action rail, aligned columns; phone card | 1–2 d | Very high | No | Medium |
| 3 | **Board toolbar above the board** — sort · undo · seed · back to top; sticky | 1 d | High | No | Low |
| 4 | **One method, one disclosure** — remove 60 per-row method tab stops | 0.5 d | High | No | Low |
| 5 | **One button, one meaning** — label the staged panel "Review this pick"; fix TOPBrock | 0.5 d | High | No | Low |
| 6 | **A text-safe palette** — `--gold-ink`, dark `--text` | 0.5 d | High (Owner ruling) | No | Low |
| 7 | **Needs row: a filter, not a wall** — collapse on phone | 0.5 d | Medium-high | No | Low |
| 8 | **Motion with a budget** — pause offscreen pulses; top three sheen; one intro | 0.5 d | Medium | No | Low |
| 9 | **The why line as one insight** — tie aggregation, not 45 identical lines | 0.5 d | Medium | No | Low |
| 10 | **A calm status rail** — engine stamp · shell build · seed · save · offline | 1 d | Medium-high | No | Low |
| 11 | **Continuity** — restore sort/scroll/filter; anchor row after sort | 0.5 d | Medium | No | Medium |
| 12 | **Test the experience** — layout/a11y battery + scene-presence checks | 1 d | High | No | Low |

---

## 1 · Top three means three

**Today:** `suggestIdsOf()` returns 3 plus every later row whose rounded display value equals the third's. At pick 13 the board has 36 "TOP" rows; at pick 27, all 60. The why line then says "most Wins left" 40+ times. The Owner's words were "top three"; the display tie is not an order tie.

**Proposal:**
- Cap at exactly three. Show the tie as **one** piece of information, not N badges: a line under the third row, `36 more tied at +0.2 on the display`, with a disclosure that expands the tied group if the user wants it. Or a small `+36 tied` chip beside the third row's why line.
- Cap restored rings too: an old 45-id autosave must not re-inflate the board on boot. Truncate or reject saved rings longer than three.
- When `rawSort` lands, extend only on exact raw equality, and add a law for it. Until then, three is the truthful number.
- The tie disclosure is a feature, not an apology: "the board is flat here" is useful information for a drafter.

**Why it wins:** one function, one battery edit, and the board's strongest signal becomes meaningful again. It also shortens the phone board (no badge/why on 40 rows).

**Engine note:** the permanent solution is the already-filed `rawSort` (VM exposes the raw key). The interim cap is shell-only.

---

## 2 · The board as a decision table

**Today (desktop):** the name column is 441–522 px, the team 44 px; "San Francisco 49ers" wraps to 3 lines, so rows are 47 or 62 px. The top rows are 62 px narrower because the why line sits in the same flex line, so the team/OVR/Draft columns shift 62 px between top and non-top rows (and ~10 px between QB and WR1 labels). A board whose columns do not line up is not a board.

**Today (phone):** the same grid squeezed to `42px 30px 34px 40px 52px 58px 46px`; names break every 4–6 characters, `Pittsburgh` overflows its 34 px cell, and the top rows are 121–169 px tall.

**Proposal — desktop:**
- A fixed action rail: `.cp-btnwrap { flex: 0 0 132px; justify-content: flex-end; }`; the why line goes on its own full-width line below the action, or into a reserved 110 px right rail with a placeholder for non-top rows. Every row's team/OVR/Draft x is identical.
- A wider team column: `minmax(160px, 1.4fr) 48px minmax(120px, 150px) 48px 64px 64px 52px`; team `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` or a 2-line clamp. One row height (≈47 px) for all 60.
- Optional: put name + team in one two-line cell (name bold, team muted below) and drop the separate team column. That uses the wide name column instead of wasting it, and the row still fits 44 px.

**Proposal — phone (≤640 px):**
```
┌──────────────────────────────────────┐
│ Brock Purdy                      92  │
│ QB · San Francisco 49ers    7% gone  │
│ [ Draft at QB ]   +2.4 wins · +0.2   │
│ best value at QB   (top three only)  │
└──────────────────────────────────────┘
```
- Name and OVR on line 1; pos · team · gone on line 2; Draft full-width (or right-aligned on line 2) and the wins/priority chips on line 3; the why line only for the top three.
- Target 80–100 px per card; no mid-word breaks; the team gets the full width.
- Collapse **MY NEEDS** to a one-line summary on phone (`MY NEEDS · 32 OPEN  [v]`); it is currently ~220 px of sticky header, 26% of the screen, and the first 32 tab stops.
- Add a layout law: name column ≥100 px, team `scrollWidth <= clientWidth`, row height ≤120 px, first row not under the sticky needs row, and every row's team/OVR x aligned within 1 px at 1180.

**Why it wins:** it is the difference between a board you can read at a glance and a spreadsheet you have to decode. It also makes the top three feel special instead of making every row taller.

---

## 3 · The board's controls belong above the board

**Today:** sort is at y 3307, after 3120 px of rows; clicking Priority at the bottom leaves the user at y 2889 looking at row 50 of the new order; the new top three are 2,580 px above. The controls are focus index 212–214 of 216.

**Proposal:** a sticky toolbar under the needs row, in the board's own visual language:
```
Sort  [ Wins ] [ Priority ] [ OVR ]     Undo   Filled 21/60   [ ↑ Top ]   seed b36:a3f2
```
- Keep a duplicate at the bottom for long-list convenience.
- On sort, scroll the board to its first row, or preserve an explicit anchor row; never leave the user at the bottom of a re-ordered list.
- Put the seed code and a "back to top" in the same toolbar; both are currently buried.
- Add a law: sort reachable in ≤10 tabs; after a sort from any scroll position, the first row is in the viewport.

**Why it wins:** it fixes the most common repeated action on the board (changing the ranking) and removes the scroll round-trip.

---

## 4 · One method, one disclosure

**Today:** every row has a focusable `.cp-sr` method button; the paragraph is identical for all rows (same `picksBetween`/`sims`). That is 60 tab stops for one explanation, and the keyboard path to sort is 212 tabs.

**Proposal:** one **Method** disclosure in the board header (or a single info popover) explaining `GONE%`; keep the per-row gone cell's `aria-describedby` pointing at a single hidden paragraph, or at the header disclosure. Remove the per-row focus stop. If a row-specific variant is ever needed, keep the button only on the row where the numbers differ.

**Bonus:** a roving-tabindex/ARIA-grid board (one tab stop, arrows to move, Enter to draft) is the right long-term pattern for 60 rows. That is a bigger change; the single disclosure is the cheap 80% fix now.

---

## 5 · One button, one meaning

**Today:** the row's button and the expanded panel's primary are both labelled **"Draft at QB"**. The row drafts immediately; the panel stages a confirm. Same words, different behavior. The badge also concatenates with the name: the accessible name starts **"TOPBrock Purdy"**.

**Proposal:**
- Panel primary: **"Review this pick"** (or **"Stage pick"**). The chips remain the flex alternatives; the confirm banner remains the staged path.
- `</span>{/if}{' '}{r.name}` — one space; the name becomes "TOP Brock Purdy" at worst, not "TOPBrock".
- Give `.cp-main` a concise accessible name: "Brock Purdy, QB, San Francisco 49ers — expand details". Keep the numeric values in `aria-describedby` or in the panel, where a screen reader can read them without a 15-word run-on on every row.
- The Draft button's aria-label is already good ("Draft Brock Purdy at QB — one of your top three priorities"); keep that pattern.
- Add a law: the two controls' labels differ; the panel action leaves `userPicks` unchanged; the first row's accessible name starts with the player's name and is ≤80 chars.

---

## 6 · A text-safe palette

**Today:** light `--gold2 #e6c67d` on `--bg #fdf2f6` is **1.51:1**, on white **1.65:1**; dark body text `--text #8e5566` on plum `#1e1119` is **3.17:1**. The contrast battery records all three as known holes and passes. The light nav and wordmark are visibly faint; dark body copy is pink on plum.

**Proposal:** keep the w89 look, add a text layer:
- `--gold-ink` for light text: a darker gold (e.g. `#7a4b0e`; check ≥4.5:1 on both `--bg` and `--panel`). Use it for nav labels, headings, and small gold text; keep `--gold2` for fills, borders, glows, and large display type.
- Set `--text` in dark to `--zcream` (#f2e7d5) or a cream; body copy becomes ≥7:1 on plum.
- Update the contrast battery's token pairs and make the known set empty. If the Owner prefers exact w89 parity, record that as an explicit Owner decision in `SHELL-STATUS.md`, not a silent hole.
- This is an Owner-ruled palette change (the 22 Oct colour table is authoritative); a seat should not "fix" it unilaterally.

**Why it wins:** it is a small CSS change that makes the light theme usable in daylight and the dark theme readable at night, without changing the brand's gold character.

---

## 7 · Needs row: a filter, not a wall

**Today:** 32 buttons, sticky, 2 rows on desktop and ~6 rows on phone; the phone screenshot shows the first player clipped under it. It is also the first 32 tab stops.

**Proposal:**
- Phone: one-line summary (`MY NEEDS · 32 OPEN`) that expands into a bottom sheet or an inline wrap; remember the expanded/collapsed state.
- Desktop: keep the visible row, but group by unit (OFF / DEF) and add a "clear" affordance; the 32 pills are busy but useful.
- Add a law: at 390, the needs row's collapsed height ≤48 px and the first board row is not covered at boot.

---

## 8 · Motion with a budget

**Today:** every Draft button pulses forever (`zpbBtnPulse 1.5s`); the top three opt out to the sheen. At pick 1 that is 56 infinite animations on a 60-row board, and the three most important rows are the *least* animated. The w89 port is faithful; for a 60-row list it is noisy.

**Proposal:**
- Animate only the visible rows: an `IntersectionObserver` toggles a `.cp-live` class; CSS animates `.cp-live .cp-draftbtn` only. Offscreen rows cost nothing.
- One-time intro: 3 cycles on load, then settle; the top three keep the sheen as a static marker.
- Keep `prefers-reduced-motion` killing both.
- Add a law: at most ~12 animating buttons at once; the top three's sheen is static; reduced motion yields zero animations.

**Why it wins:** less visual noise, less CPU on a phone, and the top three regain the attention the design intends.

---

## 9 · The why line as one insight

**Today:** `whyFor` returns one of three strings; at 45 top rows, 44 say "most Wins left". The line is a label, not an explanation.

**Proposal:**
- Return `{ headline, detail, kind }`; render one line for the top three: "best value at QB · 7% gone" / "fills your thinnest need · 12% gone" / "most Wins left · 31% gone".
- Make the headline **sort-aware**: under OVR the first row is "top OVR at WR", not "best value"; under Priority it is "highest priority at …". The current `whyFor` is sort-blind and says "best value" under every sort.
- When the display is tied, aggregate: "36 players within 0.2 wins; the board is flat here" as a single strip under the third row. This turns the tie into a decision aid.
- In the expanded panel, show the actual numbers (wins, priority, gone, fits) rather than repeating the one-line reason.

---

## 10 · A calm status rail

Z.ai's own #1 (trust/state surfaces) is right. Refine it:
- One line on desktop: `engine 408410477 · shell 370-seal · seed a3f2 · saved 2m ago · offline`.
- On phone: a "···" drawer with the same facts; do not spend a row on it.
- The "Build & Proof" drawer should be fed by a generated `proof.json` (seal count, gate, batteries, falsifier count, last run time), not hardcoded numbers. The product is offline; static proof data is fine.
- Show "restored from [save]" as a one-time banner with the save's engine stamp; if the stamp is foreign, say so before the user picks.
- This is the trust layer the Owner asked for; it also gives the council a place to see which bytes are live.

---

## 11 · Continuity

**Today:** sort is not persisted with the ring; the scroll position is not restored; changing sort at the bottom leaves you at the bottom. The autosave carries the ring ids but not the sort/needs/scroll.

**Proposal:**
- Persist `sort` with the ring and the draft record; on restore, the board comes back in the order the user left it.
- Remember the needs filter and the scroll anchor; if the filter is gone, show a one-line "restored without the QB filter" note.
- On sort, scroll to the board's first row (or the anchor row); add a "back to top" control.
- If a saved ring is longer than three (old behavior), truncate it visibly and say "kept the top three" in the restore banner.

---

## 12 · Test the experience

**Proposal — a small `layout.battery.mjs`** (Playwright, seeds fixed) with the measurements from the review:
- 390: name column ≥100 px; `.cp-nflteam` `scrollWidth <= clientWidth`; row height ≤120 px; first row not under the needs row; no per-character wrapping (min width + `overflow-wrap: break-word`); 60 rows load with zero errors.
- 1180: team/OVR/Draft x aligned within 1 px across top and non-top rows; row height uniform; sort reachable in ≤10 tabs; after a sort from the bottom, the first row is in the viewport.
- top three: exactly 3 at picks 1/5/13/27 (until `rawSort`), and the tie disclosure count equals the number of rows sharing the third display value.
- contrast: the rendered pairs (nav label on bg, body text on bg/panel, gold heading on panel) ≥4.5:1, not just the token pairs.
- side-by-side: scene presence on the **left** as well as the right (board row count > 0; expected heading); a missing scene fails the capture, not just a missing file.

**Why it wins:** it makes the next regression visible in the same run that proves the state laws, and it prevents a green matrix from blessing an unreadable screen.

---

## What not to do

- **Do not add an eighth column.** The row already has seven; the phone problem is too many columns, not too few.
- **Do not animate every row forever.** Motion should mark the top three and the change of state, not the background.
- **Do not duplicate the primary CTA with the same label.** One action, one name (row = Draft, panel = Review).
- **Do not parse display strings for semantics.** The display-rounded tie is the root of F1; cap until `rawSort`.
- **Do not bury sort/undo/seed.** They are board controls, not footer trivia.
- **Do not "fix" contrast by changing team colors.** Use text tokens; the team data is authoritative.
- **Do not let the needs row dominate the phone.** It is a filter, not the product.
- **Do not call a test green because it measured a proxy.** No-h-scroll is not legibility; a fresh pick 1 is not a late-pick board; a known hole is not a pass.

---

## Suggested sequence (one shell round, then the engine)

1. **Cap the top three** + restored-ring cap + battery oracles (F1) — 0.5 d.
2. **Board layout**: fixed action rail/column alignment at 1180; phone card + collapsed needs row (F2/F4/F7) — 1–2 d.
3. **Board toolbar** (sort/undo/seed/back-to-top) + one Method disclosure (F5/F6) — 1 d.
4. **Labels and accessible names** (F7/F8) — 0.5 d.
5. **Text-safe tokens** (F3) — Owner ruling, 0.5 d.
6. **Layout/a11y battery + scene-presence checks** (F9/F13) — 1 d.
7. **`rawSort` in the engine** (Architect) — the permanent tie semantics; then extend the top three only on exact raw equality.

The order is deliberate: 1 makes the signal honest; 2 makes the board usable; 3–4 make it navigable; 5 makes it readable; 6 keeps it that way; 7 removes the interim.
