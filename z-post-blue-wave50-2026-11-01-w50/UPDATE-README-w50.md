# UPDATE-README — wave 50 (the Owner's round-50: the black retires, the panel follows the franchise)

Delivered 2026-11-01 · the product: `Football-Sim-Z-post-blue-w50.html` ·
md5 `babc5dc1c50f5b6253a9ee4919138cae` · 1,558,490 chars · base: the w49 bytes (md5 `6bf627b0…`).

## 1 · No black text anywhere — the 0.50 ink rules

The audit walked every page in both themes and read every rendered text color. The culprit was
one token: the light base ink `#54303f` — a near-black plum — painting 2,744 texts (the
rankings' team names and scores, the AVG OVR numbers, the titles, the tables).

- **The site's own light ink is now the 0.50 selection**: `#8e5566`, the halfway mix of the old
  plum and the rose crayola, 5.27:1 on the pink page — computed with the exact halfway law the
  team inks obey (clamp, chroma floor, 5:1 floor).
- **The Madden rankings rows never wore team vars at all** — they do now: the team name and the
  score ride each row's halfway ink (txM light / txd dark), so the Rams row reads Rams blue, the
  Chiefs row reads Chiefs red, both themes. The badges keep their own colors; the rank keeps its
  gold.
- **The AVG OVR column on the Position Rankings** joins its row — the number reads the team's
  halfway ink, never the plum.
- What remains dark-on-light anywhere is only the `--ongold` pair on gold-backed buttons and the
  formation-diagram chips — the DRAFT button's own contrast pair, the look he loves, untouched.

## 2 · The anchor panel changes with every team's theme — the rose gold stays the default

Each rankings row now feeds its ANCHOR chip the franchise's own frame: fill = a whisper of the
team hue at L 0.93 (barely not white — his rose law carried into every palette), border = a step
deeper at L 0.80, ink = the team's 0.50 halfway selection (txM / txMd). The Chiefs row wears a
pale red-gold, the Raiders a whisper of silver-red, the Rams a pale blue. The delicate rose gold
he approved stays as the chip's fallback frame wherever no team context exists — the "homepage
version" he told me to keep is the fallback, byte-identical (border #e2bfae · fill #f9ece4 ·
ink #6b4634; dark plum untouched). The 90+ names still shimmer inside the chips (30 of 32).

## 3 · DIME sits directly below NICKEL on the same defense depth chart

The lineup editor's defense column carried NO DIME row — the list ended at NICKEL, which is why
DIME read as "somewhere off of the rest of the list". The defense group now ends with a DIME row
(slot · resolved player · OVR, tier classes included) directly under the nickel — in 4-3 AND in
the staged 3-4. The draft board's DIME row also stops looking detached: it wears the same
zpb-trow paint and the same neutral row vars as every sibling. Measured everywhere: the field
map (DIME l 336 under NICKEL l 339 — his w47 stack, intact), the Full Depth Chart (both rows at
l 652), the draft roster depth list (adjacent), the editor (adjacent, same column ±2px).

## 4 · The names appear twice at the same exact time

TE3 had a station on the field map but no card — his name appeared once while every other name
appeared twice. TE3 joins the breakdown cards (a private copy of the groups — the weights panel
never sees it). Verified on a real draft, keyed by slot: **every one of the 28 stations now has
a card twin carrying the SAME --beat and the SAME computed animation-delay** (cine + beat×1s —
the w46/w47 one-second-per-beat clock, byte-identical rules).

## 5 · The 4-3/3-4 toggle does something again

The w47 staging only flipped a button and lit APPLY — the rows never moved, so the toggle read
as dead. Now the staged flip repaints every live lineup editor AT ONCE: the labels read
NT / OLB1 / ILB1 / ILB2 / OLB2 and the defense rows reorder (OLB1 falls in between DL5 and
ILB1) — via a non-mutating label snapshot (`zpbLabelsFor`), an explicit-formation
`zpbOrderSlots`, and `zpbRerenderLineupEditors` wired through the editor's own handle. APPLY THE
CHANGES (1) still commits the base; REVERT CHANGES still returns the 4-3. Measured: stage →
labels change; revert → DT1/MIKE back; apply → ZPB34 true, labels hold.

## 6 · The neutral words on the during-game screen are a neutral cream

The root cause was found by rule-walk: the replay's own `.zpb-replay span/div{color:inherit}`
law (specificity 0,2,1) outranks any plain class rule — so the game time and the quarter marks
had been drinking the team takeover's ink all along. A new takeover-proof token `--zcream`
(light #53382b · dark cream #f2e7d5) plus a scoped `!important` rule puts the game time, the
quarter marks, the quarter chip and the TO/INT/FF boxes on the neutral cream — in both themes,
takeover or not. Team abbreviations, player names and the scoring badges keep their team colors.

## 7 · The season-review badges carry dots, not dashes

The badge renderer now converts every digit-dash-digit to a middle dot at the single render
point: RECORD **10·7**, the big-win score **45·23**, the marquee **27·15**, the worst loss
**10·33**, the pain record — all of them. A full rendered season verified twice: 30 badges,
dots on every record and score, **zero** digit-dash-digit anywhere on the badges.

## Nothing else moved

The shimmer cascade stands (the w45/46 sweep, the comparison's pale↔mid strip, the champion
exceptions), the halfway inks, the tier law, the theme default, the depth-chart beats, the
mobile law — spot-held by the regression battery below.

## Verify

- `w50_live.js` **29/29** — the inks (A1–A4, both themes), the per-team chips + the rose
  fallback (A2a–A2d), the AVG OVR law (A3), the editor's DIME row below NICKEL + aligned
  (C1–C4), the toggle's stage/revert/apply (E0–E5), the map↔card twins on one clock
  (D1–D2), the cream words (F1–F3), the badge dots (G1–G3), zero page errors (H1).
- `w50_nodecheck` **11/11** · `w48_nodecheck` on w50 **11/11** — every script block parses.
- `w50_domcheck` **10/10** — the separate-element surfaces (browser + position rankings incl.
  The Series), both themes.
- `w47_map_check` on w50 **4/4** — DIME under NICKEL with real coordinates; the during-game
  abbreviations wear their halfway ink.
- `w50_audit_shimmer` **32/34** (the 2 fails are the w49 rose-FRAME asserts his round-50
  retires — the panel follows the team now; the shimmer law itself is 100%) ·
  `w48_audit_shimmer` on w50 **28/34** (the 6 fails are the w48-era chip asserts w49/w50
  superseded) · `w48_live` on w50 **14/20** (6 chip asserts likewise) · `w46_live` on w50
  **26/29** (3 chip-frame asserts) · `w47_live` on w50 **45/53** (6 superseded + 2 known
  environment flakes, both proven green by `w47_map_check` on the same bytes) · `w49_live`
  on w50 **16/20** (the 4 fails are exactly the rose-frame asserts his round-50 retires).
- Mobile: `w49_mobile` on w50 **3/3** (390px, no overflow, the chips still sweep) ·
  `w48_mobile` PASS.
- Pixel evidence (`w50_shots.js` / `w50_shots2.js`): rankings light + dark (team inks + themed
  chips), position rankings light (the AVG OVR column), the editor in 4-3 and staged 3-4
  (NICKEL→DIME, the 3-4 order, APPLY (1)), the season review.

Screenshots in `_agents/zai/notes/evidence/` · the chain and suites in `_agents/zai/tools/`.
§veto candidates live in `notes/W50-INTAKE-LEDGER.md`.
