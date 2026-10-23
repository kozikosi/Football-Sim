# TOOLS.md — everything the council and the Architect can run, in one page

*Written by MiniMax, 22 Oct 2026. Every command below is plain Node or plain shell — **no install, no
network, no secrets.** If a command is not in this file, it does not exist.*

## 1 · Verify a build (run these after every change)
```sh
node _agents/minimax/tools/post-merge-smoke.mjs "<build.html>" --port 9222   # the gate
node _agents/minimax/tools/board-mobile-probe.mjs "<build.html>"            # the 390 px board layout
node _agents/minimax/tools/board-columns-probe.mjs "<build.html>"           # the board's columns
node _agents/minimax/tools/v22-probe.mjs "<build.html>"                     # everything at once
```
| Tool | What it proves | The pass mark |
|---|---|---|
| `post-merge-smoke.mjs` | a draft runs, a season runs, the playoffs run, the console is clean, the primary action is visible | **exit 0, A–I PASS, 0 page errors** (also mirrored at `tests/e2e-smoke.mjs`) |
| `board-mobile-probe.mjs` | the board's layout at 390 px | **0 overlapping cells, 0 clipped cells, 0 px horizontal overflow** |
| `board-columns-probe.mjs` | which columns the board renders and whether they are populated | the header labels and the first row's cells |
| `v22-probe.mjs` | the guide, the board, the Team Comparison, the weights panel, the guide panel, the sort dropdown, in one pass | the printed report |
| `owner-brief-probe.mjs` | the first brief's behaviour (the button state machine, the panel order, the footer, the sort label) | the printed report |
| `owner-brief2-probe.mjs` | the second brief's behaviour (the Team Comparison page and the guide) | the printed report |

## 2 · Check the work order against a build
```sh
node _agents/minimax/tools/verify-anchors.mjs V22-Suggestions.md Football-Sim-V21.html
```
Takes every quoted string in the work order and looks for it in the build: the old strings that must
be there, the new strings that must not be. It is the one command that makes the document's line
numbers unnecessary.

## 3 · Build (the council's builders — re-runnable, every anchor asserted)
```sh
node _agents/minimax/tools/build-owner-brief-variant.mjs  <base> <out>   # brief 1: the board, the weights panel
node _agents/minimax/tools/build-owner-brief2-variant.mjs <base> <out>   # brief 2: the Team Comparison, the guide
node _agents/minimax/tools/build-owner-brief3-variant.mjs <base> <out>   # brief 3: the guide's flex table, the merged section
node _agents/minimax/tools/build-team-colours.mjs      <base> <out>   # the 32-team palette, the rows, the contrast rule
```
**One known gap:** the team-colour builder's row-template edit does not yet reproduce the artifact's
row line, so **the artifact is the authority** for that line until it is fixed.

## 4 · See it
```sh
node _agents/minimax/tools/shot-teamcolours.mjs "<build>" _agents/minimax/shots "Kansas City Chiefs"
```
Writes a PNG of the draft board in a team's colours.

## 5 · Lint, format, diagram
```sh
~/node_modules/.bin/biome check            # the repo's house rules (BOC's, adopted 22 Oct)
~/node_modules/.bin/biome check --write    # and format to the repo's style
```
**mermaid** diagrams render in the repository — a ` ```mermaid ` block in any `.md` file is a diagram.
Use it for flows, not for decoration.

## 6 · Figma (the Architect and the council, 22 Oct)
| Route | State |
|---|---|
| `figma` — remote `https://mcp.figma.com/mcp` | **enabled** in `~/.config/kilo/kilo.jsonc`; the server answers; **it needs the Owner's Figma sign-in (OAuth)** — the raw handshake returns 401 until then |
| `figma-desktop` — `http://127.0.0.1:3845/mcp` | Figma.app is installed and running; **nothing listens on 3845** — Dev Mode → "Enable desktop MCP server" must be on, and `"figma-desktop"` is `enabled: false` in `.kilo/kilo.jsonc` |
| permissions | `figma_get_*` → allow (read), `figma_*` → ask (write) |
| **tools bind at session start** | the `figma_*` tools appear in a **new seat**, not in a running one |
| **the hand-off is already written** | `figma/tokens.json` (96 Tokens Studio tokens, import straight into Figma) and `figma/team-colours.json` (the 32 teams: brand values, derived display values, the source, the status, the usage rule) |

**What Figma is for here:** settling the visual system — the draft board in three team colours, the
season review's card grammar, the review's typography. **What it is not for:** the palette, the state
list, the per-surface rules and the tokens are already written and versioned.

## 7 · The council's channel and the record
```sh
sh tools/sync-mirrors.sh COUNCIL-BULLETIN.md CHRONICLE.md   # refresh the mirror
```
The **bulletin** is the council's channel (a message per contribution, date-stamped ids so two seats
cannot claim the same number); the **chronicle** is the durable fact log; the **work order**
(`V22-Suggestions.md`) is the single change list, and the **built-work table** in it is the only
authority on what exists and what has been measured.

## 8 · The artifacts that are already built and gate-verified
| Artifact | What it is | sha256 | Gate |
|---|---|---|---|
| `V22-candidate-2026-10-21.html` | the Owner's first three briefs applied | (see the work order's built-work table) | — |
| `V22-candidate-teamcolours.html` | the same + the team colours, the per-row NFL colours, the contrast-derived letters | `d15f6535f9e1…` | exit 0, A–I PASS, receipt `a08837cbdfce` |
| `Football-Sim-V21.html` | **the live build** (root) | `044d1759e01ac99b…` | the Architect's |
