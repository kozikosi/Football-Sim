SPEAKER: orcads | ROLE: council advisor | TASK: UX/UI innovation for the 67 Cakepanz shell over the frozen engine — implications of the S17 continuation sitting | DATE: 2026-11-26T02:10Z

FOR: (Owner-requested; no QUEUE item — this is design input, not a build)
RELATED: `inbox/20261126-0156-orcads-S17c-continuation-review.md` (the defect review; findings R1–R12)
MOCK-UP: `_agents/orcads/mockups/cakepanz-board-390.html` (static, < 10 KB, no external refs — the proposed phone board)
EVIDENCE: screenshots named below are the package's own captures at `deliveries/zai-s17-continuation-2026-11-25/shots/side-by-side/`; measurements are mine (Playwright/DOM and colour math, commands in the review §2). Ideas are labelled IDEA.

---

## 1. What this sitting implies (the part that matters more than the defects)

**1.1 The shell has crossed from "screens" to "claims", and that is the real asset.** Wave A turned the delivery into a machine-checked claim list with an attestation over the receipt. Whatever happens to Wave B, that machinery is the most valuable thing in the tree: it can say *no*. The implication for the product is bigger than for the process — this app can prove its own numbers (engine pin, golden VM, gone-odds replay). No other football sim can. That should be a visible, quiet product feature, not only a dev card (see 4.1).

**1.2 Wave B's "honest confidence" precedent should become a design law.** `decisionVM.pickConfidence` refuses to invent a numeric delta because the engine only ships display-rounded wins until `rawSort` lands. That instinct — *the UI may not out-run the engine* — is exactly the Owner's "no invented data" rule applied to interaction design. Write it down as a shell law: **a UI surface may only show a number the engine already computes, in the unit the engine computes it.** It would have prevented the tint receipt measuring a panel it does not paint (R8) and the provenance line promising a touch path that does not exist (R10/§4.10).

**1.3 The registry is the fix for the recurring "stale driver" class, and it is half-built.** `domHooks.ts` exists; the board and offline batteries still inline selectors (W3 fails). Every review round has found the same bug — a driver clicking the wrong control or asserting on a rotted string (2026-11-23: `tr.teamrow`; today: `button:has-text("START")`, `aria-label$=" wins"`). Finishing the registry converts a recurring review finding into a one-line rename. That is the highest-leverage process change available to the shell.

**1.4 Offline is not yet a property of the shipped artifact — it is a property of a dev flag.** `dist/single.html` boots offline with **zero external requests** (verified), but only after a dataset import, and the tent battery has never passed. Until the public build has a first-run path that works from `file://` with no CSV (or the CSV is embedded), "offline" is a claim about `?dev=1`. The Owner has to make one product call; §4.14 recommends the default.

**1.5 The shell is the portable part.** Claude owns the engine; the shell's value is that it encodes the Owner's rulings as runnable laws (uniform row, one Draft button, top-3 treatment, no white text, 390 px fit). If the cutover is Claude's tree + a shell, this law suite is what makes the shell safe to move — that is an argument for finishing the registry and the claims, not for adding screens.

---

## 2. Defects to fix before any new feature (the board is the product)

These are in the review as R-findings; repeated here with the UX fix, because they change the first impression more than any new idea.

**U1 · phone row (P0, defect).** `right-s2-board-top3-390x844-dark.png`: names split mid-word (`DeVon ta Smith`, `Trent Willia ms`, `Will Ander son Jr`, `Davan te Adam s`), the team abbr collides with OVR (`Philadelphia82`), and `Draft at …` wraps to its own centred line — so each player is a two-line block and ~6 players fit where 12 should.
*Cause:* the mobile grid's `1fr` name cell lacks `min-width: 0`, so the browser breaks words instead of ellipsising; the button is a flex child that wraps at 390.
*Fix:* two-line row — line 1: `name` (nowrap, ellipsis, `min-width:0`) + `pos` + team abbr; line 2: the four numbers as a compact chip group; the Draft control becomes a right-aligned 44 px icon + slot label, never a second line. Mock-up: `_agents/orcads/mockups/cakepanz-board-390.html`.

**U2 · needs wall (P0, defect).** `MY NEEDS · 32 OPEN` occupies ~300 of 844 px before the first player. Collapse to one line (`MY NEEDS · 32 OPEN` + the 3 highest-value needs + `ALL`), expandable in place; keep it sticky. The 32 chips are a filter, not a dashboard.

**U3 · no column headers (P1, defect).** `92 · +2.4 · +0.2 · 7%` have no visible labels anywhere on the board. Add a sticky header row on the same grid (OVR / WINS / PRIO / GONE%), with the sort affordance on the header rather than a separate menu. This also removes the need for the `title`-only field names.

**U4 · team names (P1, defect).** Team-column wrapping makes every row a different height. Use the 2–3 letter abbr with the full name in `title` and the team colour as a left rule — the Owner's table already has the colours.

**U5 · Team Select has no identity (P1, defect).** `right-s1-teamselect`: 32 identical text pills, no logos, no colour. The 32-team colour table is already imported by `tokens.ts`; the logos exist on `main`/gh-pages. A crest + a 4 px team-colour underline turns a list into a draft.

**U6 · duplicated provenance copy (P2).** The `Every number … Model Value` sentence appears in the topbar and again in the Team Select panel; `Round 1 · Pick 21 overall 21 of 1024` twice on the board. Once each.

**U7 · a11y regression (P1).** Adding `— provenance in the tooltip` to every value cell's `aria-label` makes a 60-row board read that phrase **240 times**, and `title` + `aria-label` on the same span double-announces on some stacks. Keep the value in the name (`"92 overall"`), put the nudge in one place per row, and make the provenance a *describedby target* (the pattern `.cp-gone-desc` already uses) instead of four labels.

**U8 · `SWEEK 1` (P3, REPORTED).** The hub's big week label renders as `SWEEK 1` in `right-s4` and `right-s5`. Not found as a literal in `src/` — needs a DOM text check, not a grep. Whatever the cause, it is on the first season screen.

---

## 3. What the screens are missing (before new features)

1. **A recommended pick.** The board marks 3–4 top rows with `TOP` + a sheen and shows `best value at QB` in 9 px at the right edge. There is no single, legible answer to "who should I take?" — which is the only question a new player has.
2. **A reason in the user's language.** `suggestWhy` exists; it reads as a technical note. One sentence per recommendation ("2.4 wins now; the next best QB is likely gone before your pick") is the difference between a spreadsheet and a coach.
3. **A sense of the run.** Gone% is a column. Nobody reads a column of probabilities and infers "three players I want will be gone before my next pick".
4. **A season after the draft.** The hub is half-empty (`right-s4`: content ends at ~450 of 950 px), the 22-week strip is 22 identical pills with no results on them, and the only action is a button labelled `PLAY THE WEEK`.
5. **A face on the team.** No crest, no colour, no stadium — nothing that says "these are your Bears".

---

## 4. Innovations, ranked by impact ÷ effort (each is IDEA unless marked)

**4.1 The Pick Card — one recommendation, out loud (P0, high impact, ~1 component).**
Replace the 3–4 `TOP` tags with: the top recommendation as a full-width card above the board (name, pos, team crest, OVR, `+2.4 wins`, gone% with the phrase "likely gone before your next pick"), the reason line, and ONE `Draft` button. Rows below stay uniform; the top three keep the sheen as a secondary cue. This uses only VMs that already exist (`boardVM`, `goneOdds`, `suggestWhy`). It answers the only question a new player asks, and it makes the Owner's "model-first" doctrine visible instead of implied.
*Why now:* Wave B already built `decisionVM.pickConfidence` — the card is where that output belongs, instead of a chip.

**4.2 "Gone before you pick" ribbon (P1, medium).** A single line under the header: `Before your next pick: 3 of your top 10 are likely gone` + the three names as small chips. The engine already computed it; the shell never said it. This is the emotional core of a draft and it fits in 40 px.

**4.3 Needs × value mini-map (P1, medium; Wave B's heat strip, finished).** `decisionVM.heatStrip()` is implemented and passing (W5) but not visible in any captured board state. Put it under the collapsed needs line: 32 cells, tone = need × gone-risk, click = filter. It replaces the chip wall with a glanceable instrument.

**4.4 A phone board that behaves like a phone (P0, see U1).** Two-line rows, sticky header, collapsed needs, 12 players per screen instead of 6. The mock-up is in my lane; it is plain HTML/CSS, no new dependency, and it keeps the Owner's 390 px no-horizontal-scroll law by construction.

**4.5 Team Select as a draft board, not a menu (P1).** 8 division panels → 32 crest buttons with the team colour as a left rule, the current pick slot shown as a chip on the team, and the "Draft as …" control naming the slot. This is also where the Owner's `20-0?` shimmer belongs (once, on the primary action).

**4.6 "Explain this number" drawer (P1, high leverage for the interview story).** One key (`E` / long-press / a small `i` on the selected cell) opens a side drawer that shows, for the number under the cursor: the VM function, the engine pin, the inputs, the rounding, and the golden value for a fixed seed. Wave B's `numProvenance.ts` already produces every string. As a tooltip it is invisible; as a drawer it is a *demonstrable* answer to "how do you know this is right?" — which is the whole reason this repo exists. It also removes the 240-phrase a11y problem (U7) by moving the explanation off the row.

**4.7 The season as a schedule, not a strip of numbers (P1, medium).** Replace the 22 identical week pills with a 4-row mini-schedule: `W` cards coloured W/L, the opponent crest, the score when played, the current week enlarged, and the division standing beside it. The dead 500 px on the hub becomes the season's story. Reuse `StandingsVMw` and the feed VM — no new math.

**4.8 Replay comparison (P2).** The seed code (`b36:…`) already reproduces a board. Add "share this exact draft" → the recipient opens the same board and can draft their own 32 picks; a post-draft view overlays both drafts ("you took X, the engine had Y"). Zero server, seed + pick list in the URL. This is the socially shareable artefact the current share (a text brag) is not.

**4.9 A performance budget for the row (P2).** 60 rows × 4 provenance closures re-run per render. Memoise `provenanceFor` by `(field, value, pin, tie)` and attach `content-visibility: auto` to rows (Wave B tried content-visibility — finish it). Target: keep the first pick's board under 100 ms on a mid phone.

**4.10 Make the pace clamp do one cinematic (P2).** `pace.ts` clamps 0.5–2.0 and honours reduced motion. Use it for the one place a pause is worth it: the post-draft `Can you go 20-0?` reveal (the Owner's 30–60 s window), not the per-pick flow. One cinematic, skippable, information-preserving.

**4.11 A single status line (P2).** `statusVM` derives `{phase,label,tone,action,why}` once. Use it as the *only* status surface: one line under the topbar with the one action. Today the same state is implied by the chip, the nav, the panel headings and the buttons; four statements of one fact is where inconsistency lives.

**4.12 The team takeover, scoped to the chip (P1 — the Wave B idea, made safe).** The tint is a good instinct and fails only where it is used as a text background (R8: all 32 teams < 4.5:1 in light mode). Keep the tint for the selected-team chip, the panel's top border and the primary button's hover, never behind gold text. Measured alternative if text must sit on it: paper ink on the tint = 7.17:1 (AZ).

**4.13 A searchable board (P3).** 60 rows on screen, 1,024 picks in the draft: the "search" control exists but is far right and unlabelled. Make it a `/`-focusable input with a live result count; it is the difference between a list and a tool.

**4.14 Offline: one product decision, one default (P1, needs the Owner).**
Recommendation: **ship a small built-in sample roster (a documented subset, labelled as a sample) so the public single-file boot lands on Team Select with real numbers offline; keep the full CSV import as the "use your own ratings" path.** A tent-in-the-woods user cannot download a CSV. If data visibility at cutover forbids any embedded ratings, then the first-run screen must say so *and* offer the import in one tap from `file://` (a `<input type=file>` works offline), and the tent test must assert that path. Either way, the tent battery has to test the public default, not `?dev=1`.

---

## 5. What not to do (the anti-list, so the next wave stays small)

- **Do not add another tooltip.** Wave B's provenance is a good idea delivered as four hover-only titles per row; the fix is a drawer (§4.6), not a fifth tooltip.
- **Do not put a number on screen the engine does not compute.** `rawSort` is an engine ask (already filed as a §5 proposal); until it lands, the honest chip stays wordy — and that is the right call.
- **Do not grow the nav.** 14 tabs is already two rows on a phone; move TEAM → DRAFT → SEASON into a stepper and put the rest behind one `MORE`.
- **Do not let a wave land after its seal.** The one structural guard in the review (§5.7, `attestation-covers-tree`) makes the failure mode impossible rather than remembered.

## 6. Ranked shortlist for the next sitting

1. R1–R8 fixes from the review (an hour) + one composite → the Verifier. **Nothing new until the tree is green at its own bytes** (the Owner's own rule: "PASS is not acceptance" cuts both ways).
2. U1/U2/U3 (the phone board) — the primary device, and the change with the largest visible gain.
3. §4.1 Pick Card + §4.2 gone ribbon (one component, one line — the decision surface the board is missing).
4. §4.5 Team Select crests + colour (identity before features).
5. §4.6 provenance drawer (turns the strongest idea in the tree into something a person can see).
6. Everything else in §4 when the first five are measured.
