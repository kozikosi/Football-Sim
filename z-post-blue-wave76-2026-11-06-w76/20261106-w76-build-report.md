# W76 BUILD REPORT — the Owner's command-center round, both decided vetoes, M6

**Base:** the latest wave with a product HTML on gh-pages, verified by listing = **w75** · md5 `9f990ab74fb0acba9e55b82395e60647` · 1,826,882 B (re-verified from the branch before the first patch)
**Product:** `Football-Sim-Z-post-blue-w76.html` · **md5 `4f363452a4ad33709244ca08d4ab3b00`** · **1,830,164 B** (+3,282)
**Method:** `tools/w76/zpb_w76.py` (R1–R9 + the appended w76 CSS block + post-checks; asserted exact replacements, regenerated from the pristine base on every fix, never hand-edited) — the `zpb_w75.py` pattern carried forward.
**Measured first:** the drafted-pool median probed on the live page before anything moved — the all-database median is 76 only AFTER the K/P compression at load (the static literal computes 77); the normally-drafted pool = the top `TOTAL_ROUNDS×32` = 1,024 of the 1,188 POS_SLOT_MAP-eligible players, spanning OVR 71–99, median **77**; the picker's flex chips measured `NATURAL | NATURAL | … | −4 | −6` before the change; the site root font is 21 px, so the subtitle law is measured relative (sec 12.6 px < subtitle 16.8 px < title 19.32 px).

## What shipped (the Owner's six asks, U1–U6)

1. **U1 — the section-A header text is gone.** "EVERY ROOM BELOW A B · BEST TO WORST" no longer renders; the room cards stand alone. The no-rooms twin ("EVERY ROOM AT A B OR BETTER") was not in the Owner's quote and keeps standing (flagged in the ledger).
2. **U2 — the line text is gone.** "THE LINE IS THE AVERAGE SEASON (76) · BELOW 80 OVR · KICKER OR HIGHER ON THE WIN MATH" no longer renders. The three rules it named (the average-season line, below-80 OVR, kicker-or-higher) still run in the cut math — only the printed label retired.
3. **U3 — "Cutdown Day" is a centered Cinzel Decorative subtitle.** New `.zpb-fx-cdtitle`: centered, Cinzel Decorative, 0.8 rem (16.8 px at the site's 21 px root — above the retired section line's 12.6 px, under the panel title's 19.32 px), the title ink in both themes. Rendered in the Owner's own casing ("Cutdown Day" — his other quotes matched the page caps exactly, this one reads as chosen; flagged).
4. **U4 — the footer asks for the 20-0.** "PRIORITIZE THESE POSITIONS NEXT DRAFT TO GO **20-0**" — the 20-0 wrapped in `.zpb-fx-goshine`: the fxshine sweep (220 % gradient, 5.5 s) riding the user's pack ink (`--zrb` light / `--zrd` dark, color-mix highlights), background-clip text, static under reduced motion. The panel carries the team vars already, so it rides every team's color with zero JS.
5. **U5 — the delta is retired.** The "−N vs his XX OVR" span (incl. the ±0 form) is gone from every card — it was the only carrier (veto (c)'s "any other card showing it" holds). The dead `.zpb-fx-gapnum` CSS rule retired with it; the unused `delta` computation removed.
6. **U6 — both numbers on every cutdown card.** The OVR rides a badge built from the position badge's own class (`zpb-fx-pos`) — same size structurally, measured equal (13.02 px on both) — sitting beside the position badge in the header; the season rating keeps its number slot with the label renamed PERFORMANCE → SEASON RATING, and the number steps down from 1.18 rem to 0.72 rem (15.12 px — about the badge size, the same size family).

## The vetoes

- **Veto (a) — APPLIED.** The lineup slot-picker chip reads just `−10` — the penalty alone, no word FLEX; NATURAL keeps its word. What it did: the DRAFT-HIM-INTO picker (the fills dropdown's popup) now contrasts the natural slot (NATURAL) against the flex cost (−N) with one fewer word per flex row — the w75 fills chip already read `x (-y)`, so this was the second and LAST FLEX surface in the product; the word FLEX now appears only where the feature explains itself ("YOU CAN FLEX", the flex explainer, the FLEX table). Battery V17 probes the picker live and asserts every chip matches `NATURAL` or `−N` exactly.
- **Veto (c) — APPLIED, three parts.** (1) The translation door stands as shipped (the backend `_rating` math untouched). (2) The delta is gone from every visible card (U5). (3) The median is the **normally-drafted pool's**: `PLAYERS.filter(POS_SLOT_MAP)` sorted by OVR, the top `TOTAL_ROUNDS×32` = 1,024 picks — the players a draft actually takes; the 50s (and the compressed K/P tail) never enter the median. **Produced once** as a stored derived value (`window.__zpbMedOvr` — computed at first need, cached; the battery proves the value survives a full draft boot unchanged). Measured: **77** (the old all-database line was 76 — every displayed rating shifts exactly one point up). The why-box scale line is reworded to match ("the drafted pool's median OVR — and every season is measured against that line").
- **Veto (b) — HELD.** The 40 %-of-games floor and the TRUE OVR test keep standing as shipped in w75. Not applied until the Owner calls it (Muse's context note recorded: the floor does real work, `r.gp` is tracked).

## The one the battery caught

w75's scale explainer ("THE PERFORMANCE SCALE · an average season reads N — …") was inserted into `whyBoxHTML` — but a later runtime override replaces `whyBoxHTML` with the tiles version, and the recap generator that calls it is itself retired from the live shell. The line never rendered; no battery asserted it, so it slipped. w76: the line now also rides the live override (reworded to the drafted pool, no shortfall wording), the battery asserts the generator output is truthful and no live surface carries the retired wording — and the dead-generator state is flagged for the council (give the line a live home or delete the retired assembly at cutover).

## Proof (measured, not guessed)

| suite | result |
|---|---|
| w76 battery (`verify_w76.js`, V0–V17) | **84 pass / 0 fail** — V0 the drafted-pool median (= the independent recomputation; 77 vs the old 76; produced once, the cache surviving a draft boot) · the full chip law · the filled chip · the fills column really read now (20 cells, no FLEX) · V17 the picker chips all `NATURAL`/`−N` · the phone laws at 390 · BACK TO bars · the preseason page · SIM SEASON = the family · the linescore border · the scale centered on 77 · DRAFT COMMAND CENTER U1–U6 (the headers gone, the subtitle measured, the footer + the shimmer, the badges equal, the rating about the badge size, the delta gone, the CUT badge fading, the dot law 0, no pan) · the explainer truthful · the 0.60 preset light/dark · the round cinematics · the 32-row ladder · the pregame cards light/dark · zero page errors |
| w69 owner suite (re-pointed) | **33 pass / 0 fail** |
| w69 dropdown sweep (re-pointed) | **14 pass / 0 fail** |
| w68 names (re-pointed) | **14 pass / 0 fail** |
| w67 teams (re-pointed) | **8 pass / 0 fail** |
| **total** | **153 pass · 0 fail · zero page errors** |

Every script block node-checked (25 unique), per-style-block quote-parity gated, md5 pinned. Screenshots: `shots/` — the command center (the new round), chips desktop + 390, the preseason plain headers, the 32-row ladder, the wild-card round card.

## M6 (the non-product half of the wave)

`w74-docs-m6/` — 11 files at their gh-pages paths, 27 asserted edits, `M6-CHANGES.md` (the line-level manifest) + `w74-m6.patch` (the unified diff against the current gh-pages bytes). The full read lives in the answers doc.
