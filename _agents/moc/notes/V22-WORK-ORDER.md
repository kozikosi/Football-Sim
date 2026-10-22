# V22 WORK ORDER — everything the Owner has asked for, in the order to do it

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: store the Owner's V22 directives as a durable work order | DATE: 2026-10-22T01:30:00Z**

**This is the "save this list for yourself" document.** It is the Owner's V22 directives, ordered, with the status of each and the authority behind it. The detail — exact old→new strings, line numbers, code — lives in `V22-Suggestions.md` (the council's change set) and in each seat's notes under `_agents/*/notes/`. **Nothing here is a new ruling: the Owner's words are the source of truth; this is the index and the order.**

---

## 0 · Tooling access — the Owner's question, answered plainly

| tool | my access | evidence |
|---|---|---|
| **biome** | **YES** — 2.6.2 | `node_modules/.bin/biome` and `/Users/kosi/.local/bin/biome`; `npx biome check` over V21's extracted script returned **72 errors / 55 warnings**, dominated by `noAssignInExpressions` and `useIterableCallbackReturn` (the house idiom). The house rules are settled in `_agents/moc/notes/run_all-reconciliation.md` and BOC's `biome-house-rules.md`: those two **off**, `noTemplateCurlyInString` **on**, plus `noUnusedVariables`, `noUnusedImports`, `noUndeclaredVariables`, `useConst`, `noVar`, `noParameterAssign`, `noDuplicateObjectKeys`, `noSelfAssign`; **never** the formatter over the product, TypeScript-only rules, or rules that flag the single-file HTML product wholesale. **One config cannot serve both** — strict for the council's tooling, lenient (or `--skip`) for the product's extracted script. |
| **mermaid** | **YES** — GitHub renders it | Mermaid diagrams are in `V22-Suggestions.md` (the maps, the colour flow, the gate flow) and in my notes. Use them for: the **reading order**, the **priority/dependency map**, the **motion system**, the **colour flow**, and the **release gate**. |
| **figma** | **NO** — not available to me | There is no Figma tool in my tool set (the OpenChamber catalog exposes the GitHub connector and the session/project tools; no Figma connector is registered, and no Figma file is reachable from this session). **I cannot write into Figma, read designs, or pull Figma screenshots.** The council can work from a written palette + CSS variables instead, which is what the team-colour spec does. **The Owner should not wait on a Figma dependency for the V22 graphics work.** |

---

## P0 · Mechanics (the Owner's rulings; Claude implements)

| # | the directive | status |
|---|---|---|
| 1 | **The coaching philosophy and aggressiveness must not lock after Week 1** ("Why? These should be available all season long") + the description changed to match | specified (BOC); the lock's code located; **the maths of mid-season change is a Claude call** |
| 2 | **A 3-4 / 4-3 base** the user picks on the draft or preseason page. 3-4 order: DE1, DT1 (Nose Tackle), DE2, OLB1, ILB1, ILB2, OLB2. **OLB is treated exactly as WILL and ILB exactly as MIKE** in the wins maths, explained on the Guide and in the preseason menu, including the base-dependent substitution — **The substitution is base-dependent, and the council's earlier mapping was wrong.** **4-3:** CB3/Nickel on → **SAM (LB3) off**. **3-4:** CB3/Nickel on → **nose tackle (DT1) off**, and all four linebackers stay on the field. Underneath: the 3-4 **replaces one defensive tackle with a second inside linebacker**, so the converted slot is **DT2 → ILB2** (worth MIKE) and the SAM role is worn by **OLB2** (worth WILL). The earlier council mapping (SAM→ILB2, DT2→OLB2) had those **swapped** and is **superseded**. **Never write "LB3/SAM comes off" without naming the base** — in a 3-4 there is no SAM to come off. | specified (Pickle, MiniMax); **BLOCKING ambiguity**: the flex rules are two different tables in the Owner's words — an *edge* at a linebacker slot with the penalty waived, versus a *linebacker* at safety — and the **CB3 interaction cannot be computed** until the code has base-scheme awareness |
| 3 | **The flex rules**: edges no penalty at OLB/WILL/SAM · OLB/WILL/SAM → FS −6, SS/DT −4, Edge and CB3/Nickel −2 · MIKE → DT −4, SS −2 · SS → CB3/Nickel free, FS/OLB/WILL/SAM −2 · CB → OLB/WILL/SAM −4, CB → MIKE −6 · TE → WR −2, TE → RB −4 · **anything not mentioned keeps its current rule**. The chart is **redesigned in the draft-roster order** | specified (Pickle: the table as old→new; MiniMax: the code) · **PROTECTED CONSTANTS** (`FLEX`, `NATURAL_SLOT_MAP`, the slot list) — the Owner's instruction is the approval, Claude's hands implement it |
| 4 | **FB and P are draft-board slots; 28 rounds = 896 picks**; no flex cost for either (the SAM precedent) | ruled (Owner #12); **not in the build** (`ROSTER_SLOTS` is 26, no `FB`/`P`); open: whether they need consumers in `teamRatings` |
| 5 | **"Third corner" → "CB3 / Nickel"** in the Guide | trivial copy; specified |
| 6 | **The RB −6 / −8 fallback text removed from the preseason menu** | trivial copy; specified |

**The order, and why (the dependency audit, `_agents/moc/notes/DEPENDENCY-ORDER-AUDIT.md`):** P1-10 (SIM-CORE markers + headless entry points) → P1-12 (FB/P slots) → **P0-17** (flex rules) → **P0-16** (the base) and **P0-12** (the board's "also fits" line); **P0-1** before P0-12 (one row template, two edits); **P0-5 with P0-7** (they contradict each other — one Owner ruling); P1-11 (SAM scarcity) is a pool ruling that does not gate the code but re-measures it.

## P1 · The copy (plain, none of it "expected scoring")

| # | the directive | status |
|---|---|---|
| 7 | The philosophy description: remove *", on offense and on defense. It names your team's style all season, and"*, capitalise **O**pponents | copy; specified |
| 8 | **"Why we recommend Auto."** removed completely; the model paragraph becomes **"the model tries…"**; one of the two "the label stays the same all season…" sentences removed; "a few more field goals" → **"fewer field goals"**; "Follows the usual NFL chart:" → **"Balanced Approach:"**; its ending → "and goes for it on 4th & short when in opponent's territory" (**the maths to be verified — LongCat/DS**); Aggressive → "More 2-Pt Conversions, More touchdowns, Fewer field goals, and a few more failed 4th downs." with the smaller follow-on; "How a 2-Pt Conv works" → **"Conversion"** | copy; specified; the 4th-down maths **unverified** |
| 9 | The **game preview**: the team name after "run defense"/"secondary" — "(Chiefs)"/"(Vikings)"; "Under center for the x is Matthew Stafford (99) against the y's Geno Smith (74)."; the "All eyes will be on … Christian Gonzalez" sentence **fixed** (a defender is not what the opposing defence game-plans around); **every "+x points a game" phrase removed** except the overall line, which becomes **"+3.3 points"**; em-dashes → **periods**; defensive labels → "Nickel · Pass Protection" / "Nickel · Run Defense" / "Nickel" with **no subtitle parentheticals**; the lineups **directly below** the game plan, then matchup, then scouting report | copy + layout; specified |
| 10 | The **game review**: starts at **"1st Quarter"**; the opening recap and "had ripped off…" removed; quarters as 1st/2nd/3rd/4th; the blocked-extra-point glitch → a field goal; box-score style lines ("Rushing TD · D'Andre Swift (Chiefs 7-0)"); "Turnovers: Chiefs 1 - 0 Vikings" then "Jaylon Johnson interception (4th Q)"; offensive players need **≥60 yards**; the slots are reserved for **90+ rating performances** (the rating used internally, never shown); "Stars of the game:" → an **actual star**; the "how it was decided" point phrases removed, the first number "+3.3", "and" → "but" if possible, **no sacks is not poor** (1-2 mid, 3+ exceptional); "The Chiefs move to 1-0…" its own paragraph; the review's "Game plans:" **hidden in a dropdown**; the **game ball must always be in the Key Players chart** | copy + logic; specified |
| 11 | The **season review prose**: the draft critique loses "Early picks that are worth little to winning matter most…"; **"What separated the playoff teams" is left but never mentioned and click-only**, with **no description of what separated the playoff teams anywhere**; "Sacked 59x" → **"59x Sacked"**; "More Advanced Stats" → **"Advanced Stats"**; the "Advanced stats: what really produced sacks and runs" note **highly condensed** and visible only under Coverage Sacks / Offensive Line; the "cost the Chiefs roughly 0.7 points a game" phrasing removed; the "roster also asked 2 starters to play out of position…" sentence removed; a **better closing line** (playoff push or redraft) | copy; specified |
| 12 | **Hide "Realism audit & league-wide records" and "Does the model predict real results?"** from the user, but **store the information internally** | specified (VLOC) — and the *first title may not exist verbatim* in the build; the nearest block must be identified |

## P2 · The graphical direction (one sentence says it, the rest is graphic)

| # | the directive | status |
|---|---|---|
| 13 | **More motion** — graphics and text entering and leaving the screen; more ideas like the confetti and the banners; the **Champions banner** goes **gold and shimmers**; the win banner **much larger, centred, ≥3 seconds** like the conference-champions graphic, ideally landing and continuing to shimmer; the **"The Chiefs are Super Bowl champions."** line **more beautiful, at least one exclamation point** | spec'd (Ultra, Super) |
| 14 | The **season review** and the **100-season review** far more graphical (a few sentences only); the **"Seasons by Win total"** chart's **left alignment fixed** and the chart beautified; **"Your players; average season"** and the **"Award patters"** block higher up and automatically visible; the **season-review button in blue near the top** next to the 100-season simulation; the awards in **gold**, including the game-ball winner; the **playoff picture as a March Madness-style bracket** with byes and both conferences meeting in the middle; the two **conference charts** ranking the team 1-16; a **bye shows the most likely next-round matchup's preview**; **"Lineup and flexes" not at the top** in the playoffs; the **playoff preview** a lot more beautiful and exciting; the game preview/review "way more graphical", with sentences only for clutch narration, star praise and next-round hype | spec'd (GLM, MiMo, Ultra) |

## P3 · The document hygiene (this is what Claude reads first)

| # | the fix | status |
|---|---|---|
| 15 | **The reading order** — one entry block, one header, one map, one critical path; the map moves from 89% down to the front; the top 60 lines carry the build and its pin, the two facts, the canonical order, the first three actions and the dependency order | delivered: `_agents/moc/notes/V22-READING-ORDER.md` (M-423) |
| 16 | **One numbering, one meaning** — P0/P1/P2 are priorities, R1/R2/R3 are rounds; **P10 and P11 each get one meaning**; the three "P0-19: Team Comparison Page" blocks merge; the legacy P7/P8/P9 and "PART 5" are **folded into P0/P1/P2 and removed** | specified; DS merges |
| 17 | **The numbers** — 28 rounds / 896 picks stated once; the on-the-clock string corrected; 1,148 and 1,188 anchored with build + filter state, and the deterministic figures (1,200 players · 26→28 slots · 896 picks · 1.34 per pick · 19 flex rules) in the instruction lines | delivered: `_agents/moc/notes/V22-NUMBER-RECONCILE.md` |
| 18 | **The pin** — the Owner rules which artifact is the candidate; the document re-pins; the anchors re-read | **BLOCKING** — the Owner's decision |

## P4 · Only the Owner can settle

1. the **canonical build** (the pin) — *blocks everything*;
2. the **flex rules' two readings** (edge-at-linebacker vs linebacker-at-safety) and the **CB3 interaction**;
3. the **OLB/ILB alias vs new slot** shape — it changes the roster, the depth chart and the draft order;
4. **P0-5 vs P0-7** — the "My Weights" button against "forget the user weights";
5. the **NBA pool** — 539 vs 538, "Terrance" vs "Terance Mann", and the **63 players still unmatched**;
6. the **team colours' data source** — the mechanism is written down, the colours are not, and inventing them is forbidden.

---

## What the council observed about its own coordination — input for Claude's `AGENTS.md` work

This is evidence, not opinion, and it is the part only a working seat can supply:

1. **The council's own output became the bottleneck.** `V22-Suggestions.md` reached 2,263 lines with **four competing entry blocks**, **two competing P10/P11 meanings**, **three identical "P0-19: Team Comparison Page" headings** and its own map at **89% down the file**. The document grew by accretion faster than it was folded.
2. **The work duplicated.** The same "Unit Comparison Table — Remove Parentheses + Reorganize:" block appears **three times**; "Text Changes:" **six times**; the build pin appears under **nine** headings and the old hash under **five**.
3. **A shared working tree is a real hazard.** Other sessions commit and push the **same branch** while we work: my push was rejected twice in an hour ("cannot lock ref — is at 02986b02 but expected dda31df9"), and a rebase was impossible because the tree was dirty with other seats' edits. Work is lost by *other* agents' commits, not by ours.
4. **The case-insensitive filesystem caused a duplicate document.** `V22-Suggestions.md` and `V22-SUGGESTIONS.md` are one file on this disk; a document published twice under names differing only in case is how a stale copy reached Claude's read path.
5. **Dispatch by name does not survive absence.** The Owner's rule ("work should be suggested and then picked up by whoever is idle") is right, and the work pool in `_agents/moc/notes/` plus the bulletin is the mechanism that works — but a named seat that is unavailable leaves its slice **unclaimed and invisible** unless the claim is recorded in the shared board.
6. **Verification without a hash is not verification.** The council's receipts span two different builds (`40233d6b…` and the working-tree `044d1759…`), and the document's line numbers came from the first while its pin names the second — a class of error the **document⟷build linter** in the reconciliation note would have caught.
7. **The instructions that helped most were the small ones:** the pinned build hash, the change-line form (WHERE · WHAT · WHY · SAFE ALONE? · HOW TO CHECK), and "cite by heading text, never by line number" — the last one, from the Owner, stopped the document from rotting under us.
