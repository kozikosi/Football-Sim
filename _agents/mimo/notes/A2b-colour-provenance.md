# A2b — Colour provenance: make the disagreement legible and countable

SPEAKER: MIMO | ROLE: Council analyst | TASK: A2b colour provenance | DATE: 2026-10-22
Anchor: `_agents/pickle/builds/Football-Sim-PreColors.html` `40233d6be00e987c…` (657,486 B) — colour data is not in the product file; this is a data-layer audit. Read-only. HOLD §7 respected.

## What Claude asked for

> No tool traces team colours to a named source.

The registry holds 32 teams × 3 values with a source and a status. This note turns it into a table a reviewer can act on. **Choosing the authoritative source is the Owner's decision, not mine** — my job is to make the disagreement legible and countable.

## Command

`node -e '…'` parsing three files: `_agents/moc/receipts/palette-registry.json`, `_agents/moc/receipts/palette-reconciliation.md`, `figma/team-colours.json`. Full per-team table at `_agents/mimo/notes/A2b-colour-provenance-table.md`.

## Findings — all VERIFIED

### 1. The registry's source is one blanket pair, cited 96× — no team is individually sourced

96 brand slots (32 × 3). Distinct `source_url` values across all 96: **exactly two**, each repeated 96×:
- `https://github.com/jimniels/teamcolors` — 96×
- `https://www.profootballnetwork.com/nfl-team-color-codes-…` — 96×

**Slots whose URL mentions the team name: 0 / 96.** This is the concrete form of Claude's ask: every team cites the same two generic reference guides, so **no value is traced to a team-specific document** (no team brand book, no NFL published spec, no team media guide). 192 URLs total, all accounted for by the two above.

### 2. Statuses are NOT all `reference_unverified` — one premise in the brief is wrong

The brief said "every status is `reference_unverified`." Measured across the 96 brand slots:

| source_type | count |
|---|---|
| `reference_unverified` | 62 |
| `reference_conflict` | 34 |
| **total** | **96** |

So a third of the registry already self-flags a conflict. (All 96 `source_url` non-empty; 0 empty. The separate `display_colors` object is `build_shipped`.)

### 3. "24 of 32 secondaries disagree" — second premise is wrong; the 24 is whole-palette, not secondary

Comparing the GPT column to the Gemini column in `palette-reconciliation.md`:

| comparison | agree | disagree |
|---|---|---|
| **primary** | 26 | 6 |
| **secondary** | **26** | **6** |
| tertiary | 10 | 22 |
| **full 3-value palette** | **8** | **24** |

The **24-of-32** figure is the **full-palette** disagreement, driven almost entirely by the **tertiary** slot (22 disagreements). **Secondaries alone disagree on only 6 of 32:**
`Baltimore Ravens · Houston Texans · Indianapolis Colts · Jacksonville Jaguars · New York Jets · Pittsburgh Steelers`

The 8 teams where GPT and Gemini agree on all three: `Arizona Cardinals · Atlanta Falcons · Carolina Panthers · Detroit Lions · New England Patriots · Philadelphia Eagles · Seattle Seahawks · Tennessee Titans`.

### 4. The "GPT table" is itself two artifacts that disagree — a hidden third variant

`figma/team-colours.json` (whose `_meta.source` names the GPT table) vs the **GPT column** in the reconciliation — matched **30 / 32**. Two mismatches:

| team | `figma/team-colours.json` | recon GPT column |
|---|---|---|
| Chicago Bears | `#0B162A #000000 #FFFFFF` | `#0B162A #C83803 #FFFFFF` |
| New England Patriots | `#002244 #C60C30 #BFC0BF` | `#002244 #C60C30 #B0B7BC` |

So there are **three** distinct value-sets in circulation (build, GPT-file, recon-GPT-column, Gemini) — not the clean two the brief implies. Any "the two references agree" claim inherits this ambiguity on Bears and Patriots.

## What a single authoritative source would have to be

Per the Owner's acceptance criteria (*every HEX has a source URL and a verification status*), a **verified** entry needs a source that is **team-specific and citable to a stable document**, not one of the two blanket guides. Concretely, in descending authority:

1. **The team's own brand/style guide** (the club's published PDF or brand page) — strongest; names Pantone/HEX directly.
2. **NFL.com team page or the league's published colour specification** — secondary; league-hosted, stable.
3. **A team media guide / game-notes colour sheet** — acceptable; team-authored.
4. The two current references (`jimniels/teamcolors`, Pro Football Network) — **corroborating only**, never sole source, because they are the ones that disagree with each other.

A `verified` status would then mean: **one team-specific URL + the value matches it + a second reference does not contradict it.** A `conflict` status means two sources disagree and the Owner must pick. **Which reference becomes the brand source, and whether white may ever be the visible edge, are the Owner's calls — not mine.**

## Corrections to the brief

1. "Every status is `reference_unverified`" → **62 unverified + 34 conflict.**
2. "Disagree on 24 of 32 secondaries" → **24 of 32 is the full palette; secondaries disagree on 6 of 32.**
3. Implied two clean source tables → **`figma/team-colours.json` and the recon GPT column disagree on Bears and Patriots** (third variant exists).

No product edit, no protected constant, no renumbering, no bulletin trim. Table file: `A2b-colour-provenance-table.md`.
