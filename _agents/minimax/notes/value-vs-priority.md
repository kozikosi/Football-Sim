# Value vs priority in the current math — what actually differs

**SPEAKER: MiniMax | ROLE: council reviewer (S-1900–1999) | TASK: Owner's question on the draft-board math | DATE: 2026-10-21T16:00:00Z**
Measured on `NFL Draft Simulator v20 Claude.html` (`31b7d61f…`, 649,032 B). Line references are to
that build.

## The one-line answer

> **Value is what a player is worth; priority is what it costs you to wait for him.**
> Value is a static, slot-relative measurement of wins; priority is a dynamic, roster-relative
> *scarcity* number, and it is the only one of the two that changes as the draft runs.

## Where each comes from

| | **Wins** / **Value here** | **Priority** |
|---|---|---|
| code | `slotWinsTable()` v20:1294 → `slotWins()` :1309 → `modelWeights()` :459 | `simRecs()` v20:1549 → `mkEntry()` :1590 |
| what is computed | for every slot and every OVR 50–100, the **wins added** by a player of that rating in that slot: the sim's own unit model is re-run with that slot upgraded from OVR 80, and the change in the team's best unit points is divided by 17 points per win | **Value here** (`e.v`) **minus** `later[g]` — the best value still available in that position group at your next pick, averaged over **twelve replays** of the computer teams' picks between now and your turn (`const trials = [], N = 12`) |
| baseline | Wins: a **70-rated player at his position** · Value here: the **replacement-level starter** in that exact slot (never below 76) | the twelve-future expectation |
| flex | Value here **includes** the flex penalty (a guard at tackle plays 4 points worse) and how important that spot is (WR1 > WR3) | inherits it through Value here |
| frame | the **player** and the slot | **you**, your roster, the remaining board, your next pick |
| static? | **Yes** — the guide is explicit: Wins is *"the same number for everyone with that position and rating, on every team and at every point in the draft"* | **No** — *"Priority changes as your roster fills and as the board thins"* |
| can be negative? | No — wins are ≥ 0 | **Yes** — near-zero or negative means waiting is free or better |
| the user's stars | do not touch the maths | multiply the **ranking** only (★★ 1.5×, ★ 1×, ☆ 0.5×) |

## The CPU picks on the value half only

`cpuPick()` (v20:1368) scores each candidate for each slot the team still needs:
`w = slotWins(player at slot) − slotWins(replacement starter at slot)`, then
`v = w * cpuBias(team, group) * noise + 0.002 * OVR`; it can "miss" and take a player a few spots
down its own board, and it falls back to the best player left for any open slot.
**There is no scarcity term, because a CPU team has no next turn** — the "what will still be there"
term only exists on the human's board.

## Why the distinction earns its keep

* A player can have a **smaller Wins and a larger Priority** — the guide's own example: if the best
  edge rushers will still be there at your next pick but the elite linebackers will not, the
  linebacker outranks them on priority despite a smaller Wins number.
* A player can have a **negative priority** — waiting for him is free or better, and taking him now
  may be a mistake. The board is a *decision* tool, not a ranking of goodness.
* **Wins is the clean, comparable number** — identical across teams, across time, and computable for
  any pool. That is the one that belongs in "the statistics that explain Wins".

## For the NBA (the Owner's question 3)

* The **Wins** analogue is well defined: *wins added over a 70-rated player at his position, computed
  by the NBA's own matchup model*. It is the same shape as football's and it is computable for any
  pool, which is what makes it the metric to publish.
* **Priority has no free NBA analogue** — it needs a "what will still be there" simulation, and at
  30 teams × 10 rounds the scarcity shape is nothing like 32 × 26: with 300 slots filled from a
  ~500-player pool the last rounds are thin and "waiting" is often wrong. Whether the NBA board shows
  priority at all, and if so with what horizon, is a design question for the Architect.
