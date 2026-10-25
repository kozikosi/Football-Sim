# Owner rulings — 22 Oct 2026: player dataset, team colours

**Recorded by:** DS · **Source:** the Owner (Kosi), relayed in session, 22 Oct 2026.
**Status:** Owner decision. Supersedes any contrary council recommendation, including the Architect's.

---

## 1 · Player dataset — frozen, not to be questioned again

The Architect proposed dropping the "real Madden ratings" and realism-audit claims until an edition and date were supplied, citing Aaron Donald (retired) and Boye Mafe as implausible for a "Madden 27 snapshot".

**Owner ruling, verbatim:** *"The original data was completely corrected. I gave it to you myself. Aaron Donald unretired before Week 1 of the 2027 season and I watched him play football this week. Please do not change the original dataset of nfl players I personally verify that is completely correct. Do not question this dataset again."*

**What this settles:**

- The 1,200 `PLAYERS` rows are **correct as they stand**. No row is edited, removed or re-rated.
- The dataset's source is **the Owner**, who verifies it personally. That is a named source — the provenance gap is closed by attestation, not by a file import.
- Aaron Donald active and Boye Mafe present are **correct for the simulated season**, which is set after the 2026 season. They are not errors and must not be "corrected".
- The council's A2a finding stands only in its narrow, factual form: *no machine-readable provenance record exists in the tree*. It does **not** license any claim that the data is wrong.

**What the Architect may still do:** attach an attribution line naming the Owner and the attestation date, and drop the specific "Madden 27 snapshot" label if it implies an edition that was never claimed. **What the Architect may not do:** alter, re-source, re-rate or re-verify any player row.

## 2 · Team colours — Owner-supplied palette, updated

The Owner previously supplied hexes to several council members and has since changed a few. The table below is the **current authoritative palette**. It replaces the `brand` triples in `figma/team-colours.json`.

Owner's note: these are recommended three-colour brand palettes, not an exact export of nflverse's first three columns; some third colours are chosen from other published team colours to avoid duplicates. Basis given: Pro Football Network and nflverse references.

**No external sourcing or citation pass is needed** — the Owner supplied and owns this data. The Architect's offer to source colours from public brand pages is declined; do not duplicate the work.

### AFC

| Team | Primary | Secondary | Third |
|---|---|---|---|
| Baltimore Ravens | `#241773` | `#9E7C0C` | `#000000` |
| Buffalo Bills | `#00338D` | `#C60C30` | `#FFFFFF` |
| Cincinnati Bengals | `#FB4F14` | `#000000` | `#FFFFFF` |
| Cleveland Browns | `#FF3C00` | `#311D00` | `#FFFFFF` |
| Denver Broncos | `#002244` | `#FB4F14` | `#FFFFFF` |
| Houston Texans | `#03202F` | `#A71930` | `#FFFFFF` |
| Indianapolis Colts | `#002C5F` | `#FFFFFF` | `#A2AAAD` |
| Jacksonville Jaguars | `#101820` | `#006778` | `#D7A22A` |
| Kansas City Chiefs | `#E31837` | `#FFB81C` | `#FFFFFF` |
| Las Vegas Raiders | `#000000` | `#A5ACAF` | `#FFFFFF` |
| Los Angeles Chargers | `#0080C6` | `#FFC20E` | `#FFFFFF` |
| Miami Dolphins | `#008E97` | `#FC4C02` | `#005778` |
| New England Patriots | `#002244` | `#C60C30` | `#B0B7BC` |
| New York Jets | `#125740` | `#FFFFFF` | `#000000` |
| Pittsburgh Steelers | `#FFB612` | `#101820` | `#FFFFFF` |
| Tennessee Titans | `#0C2340` | `#4B92DB` | `#C8102E` |

### NFC

| Team | Primary | Secondary | Third |
|---|---|---|---|
| Arizona Cardinals | `#97233F` | `#000000` | `#FFB612` |
| Atlanta Falcons | `#A71930` | `#000000` | `#A5ACAF` |
| Carolina Panthers | `#0085CA` | `#101820` | `#BFC0BF` |
| Chicago Bears | `#0B162A` | `#C83803` | `#FFFFFF` |
| Dallas Cowboys | `#002244` | `#869397` | `#FFFFFF` |
| Detroit Lions | `#0076B6` | `#B0B7BC` | `#000000` |
| Green Bay Packers | `#203731` | `#FFB612` | `#FFFFFF` |
| Los Angeles Rams | `#003594` | `#FFD100` | `#FFFFFF` |
| Minnesota Vikings | `#4F2683` | `#FFC62F` | `#FFFFFF` |
| New Orleans Saints | `#D3BC8D` | `#101820` | `#FFFFFF` |
| New York Giants | `#0B2265` | `#A71930` | `#A5ACAF` |
| Philadelphia Eagles | `#004C54` | `#A5ACAF` | `#000000` |
| San Francisco 49ers | `#AA0000` | `#B3995D` | `#FFFFFF` |
| Seattle Seahawks | `#002244` | `#69BE28` | `#A5ACAF` |
| Tampa Bay Buccaneers | `#D50A0A` | `#34302B` | `#FF7900` |
| Washington Commanders | `#5A1414` | `#FFB612` | `#FFFFFF` |

## 3 · Exactly which hexes changed

The Owner said the old version should be in the files. It is: `figma/team-colours.json` on `origin/main` (425 lines, added by the colour work). Comparing its `brand` triples against the table above:

**VERIFIED** — 25 of 32 identical, **7 changed**:

| Team | Field | Old | New |
|---|---|---|---|
| Baltimore Ravens | secondary / third | `#000000` / `#9E7C0C` | `#9E7C0C` / `#000000` (swapped) |
| Cleveland Browns | primary / secondary | `#311D00` / `#FF3C00` | `#FF3C00` / `#311D00` (swapped) |
| Denver Broncos | primary / secondary | `#FB4F14` / `#002244` | `#002244` / `#FB4F14` (swapped) |
| Dallas Cowboys | primary | `#003594` | `#002244` |
| Chicago Bears | secondary | `#000000` | `#C83803` |
| Miami Dolphins | third | `#FFFFFF` | `#005778` |
| New England Patriots | third | `#BFC0BF` | `#B0B7BC` |

Every other team is unchanged, so the update is a **seven-line patch to one file**, not a rewrite.

## 4 · Where the palette is and is not used

**VERIFIED against `_agents/pickle/builds/Football-Sim-PreColors.html` (`40233d6b…`, 657,486 B):**

- `TEAM_COLORS` — **0 occurrences**. There is no team-colour lookup table in the build.
- None of the Owner's hexes appear: `#241773`, `#9E7C0C`, `#00338D`, `#FB4F14`, `#002244`, `#0B162A`, `#97233F` → **0 each**.
- The build contains **33 distinct hex literals**, all UI chrome.

So the palette is currently **data-layer and Figma only** — `figma/team-colours.json`, `figma/tokens.json`, `_agents/minimax/prototypes/V22-candidate-teamcolours.html`. It has never been wired into the product build. This is consistent with MOC's measurement that the colour canvas is 0 of 20 live in Pre-Colors: there is nothing wired to audit.

**Implication for V23:** adopting the palette is a **new feature**, not a data correction. It needs a build task, and the seven changes above should be applied to `figma/team-colours.json` only after the bundle PR lands, so the two do not collide.

_DS end-anchor · this note scopes `_agents/ds/` only._
