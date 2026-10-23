# P5 · The palette's contrast table — the check nobody had run, and it changes three rules

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: P5 · the palette check | DATE: 2026-10-22T11:45:00Z**

**Why this exists.** Canvas rule 6 asks for a contrast check and a dark-mode check on every palette before it ships, and the Owner's brief lists "the palette check" as a P5 item. **Nobody had run it.** Here it is, measured on the candidate's own emitted palette and the app's own theme values.

**Method.** The palette was read from the build's own CSS — the 32 rules `[data-team="…"] { --t1/--t2/--t3 }` — and the theme values from the build's own `:root` blocks:

- **light** — page `#f4f6fa`, panel `#ffffff`, panel2 `#eef1f6`, text `#161b22`
- **dark** — page `#0b0e14`, panel `#141922`, panel2 `#1b2230`, text `#e8ecf3`

Ratios are WCAG 2.x relative luminance. **Full table for all 32 teams: `_agents/moc/receipts/palette-contrast.md`.**

**The thresholds used:** an **edge** needs ≥1.5 against its background; **text** needs ≥4.5; a **chip's fill** wants ≥3.0 against the panel.

## 1 · The finding that changes a rule: the white secondary is invisible on the light panel

| measure | light panel | dark panel |
|---|---|---|
| **secondary** vs panel, under 3.0 | **20 of 32** | 8 of 32 |
| **primary** vs panel, under 3.0 | 1 of 32 | **23 of 32** |
| **primary** as text on the panel, under 4.5 | **29 of 32** | 8 of 32 |

Three consequences, each of them a rule change:

**R1 · The tri-colour stripe's middle stop carries no contrast on the light theme.** The Chiefs' stripe is `#E31837 → #FFFFFF → #FFB81C`; on a white panel the **white stop has a ratio of exactly 1.00** — it is not a colour, it is the absence of one. That is true for **20 of 32 teams** (every team whose secondary is white or near-white: Cardinals, Falcons, Ravens, Colts, Chiefs, Jets…). The stripe still *reads*, because the gradient blends the two saturated neighbours — but **nothing may rely on the secondary stop to be visible on its own**, and a design that puts white between red and gold is white-on-white in the middle.

**R2 · Nine teams' primary is invisible as an edge on the dark theme.** Raiders `#101820` (1.02), Saints `#101820` (1.02), Bears `#0B162A` (1.03), Texans `#03202F` (1.05), Browns `#311D00` (1.10), Patriots `#002244` (1.10) — and three more below 1.5. On the dark panel those edges **do not exist**. The canvas's rule 5 says *"the accent colour is the risky one — some teams' thirds are muddy (browns, reds); a neutral fallback beats a muddy accent"*. The measurement says the risk is **larger and in the other direction**: it is the **dark** primaries on the **dark** theme, and their **secondary is exactly the light colour that would work** (Raiders `#A5ACAF`, Bears `#FBC026`, Texans `#A71930`).

**So the rule becomes: on the dark theme, if the primary's contrast against the panel is below 1.5, the edge takes the team's secondary — and only then a neutral.**

**R3 · A team colour is almost never a text colour on the light panel.** **29 of 32 primaries fail 4.5:1 against the light panel.** The candidate's chip rule is `.teamtag{color:var(--t1);background:color-mix(in srgb,var(--t1) 12%,transparent);…}` — the chip's *text* is the team's colour on a near-white panel, which fails WCAG AA for 29 teams. **A chip should read as: the team's colour as the fill or the edge, the app's `--text` as the text.** The chip keeps the identity (the tint, the border) and the words stay legible.

## 2 · What this does *not* say

- **It does not say the palette is wrong.** It says the palette is **role-dependent**: the same hex is good as an edge in one theme and invisible in the other.
- **It does not block the colours.** **26 of 32 primaries are strong edges on the light panel, and 24 of 32 are strong text colours on the dark panel** — with the dark theme's failure and the light theme's failure landing on *different* teams.
- **It says the *rule* must be role-aware and theme-aware**, which is precisely what the colour-identity system (M-20261022-e) already says about *which* colour; this note says *which value of the three* a given role may use.

## 3 · The rule, in one form, for the Architect

> A surface asks for a **role** (`you | opponent | gold | neutral`) and the build resolves it to **one of the three team values** (`primary | secondary | tertiary`) using the theme:
> **edge** → primary, or the secondary when the primary is under 1.5 against the panel (the dark teams on the dark theme); **chip fill / stripe** → primary and tertiary, with the secondary as a blend stop, never as a lone mark; **text** → the app's `--text`, with the team's colour carried by the chip's tint and border; **gold** stays gold and never carries a team's identity.

**That is a token-level decision, and it is the one place the role layer earns its keep** — it is why `tone` is a role and not a hex.

## 4 · What I did not check

- **I did not check the chips' *rendered* contrast** (a 12 % tint of a colour is not the colour) — the numbers here are for the raw hex against the panel.
- **I did not check the app's other surfaces** (the 100-season chart's fills, the bracket's connectors, the award gold) against these numbers.
- **I did not verify the palette's provenance** — still unsourced; this note says nothing about whether the hexes are right, only about where they can be used.
- **I did not open a browser** — the ratios are computed from the build's own hexes and theme values, not measured on screen.
- **I did not implement any of the three rules** — they are the Architect's, and the palette is unsourced until the Owner rules on its source.

**Receipt:** `_agents/moc/receipts/palette-contrast.md` — all 32 teams, both themes, primary/secondary/tertiary against panel and as text.
