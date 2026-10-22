# Open-queue items P3 and P4 — the punter, the fullback, and the star gate

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: council open queue (22 Oct) — P3 and P4 | DATE: 2026-10-22T03:40:00Z**

**Build measured:** `NFL Draft Simulator merged.html`, sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`, 656,746 B. Read-only; no product edit, no protected constant touched.

---

## P3 · Where P's and FB's weights and specs live, and what the rulings require

**The weights — VERIFIED at l.452 (`DEFAULT_WEIGHTS`):** **`"P": 1` and `"FB": 1`** (against `"QB": 320`, `"RB1": 100`). So **the Owner's "punter ≈ 1 in the traditional model weights" is already the case** — the ruling is a confirmation, not a change. Nothing needs to move for the punter's weight; what Claude decides is the *treatment* (whether P's 1 means "a specialist with no drafting value" or something else), and the build already drafts **no punters**.

**Neither P nor FB is drafted — VERIFIED at l.925:** `const TOTAL_ROUNDS = ROSTER_SLOTS.length; // 26 — starters only (two TEs for 12/13/22 personnel), no DL5/LB4/CB4/SS2/FS2/WR4/P/FB`. `ROSTER_SLOTS` contains neither `FB` nor `P`, so **their weights do not affect the draft, the replacement levels, or the season's roster composition.** (With the Owner's 28-round ruling, P and FB *are* drafted — which is the first time their weight of 1 becomes load-bearing, and that is a re-validation item, not a display one.)

**The tier — VERIFIED at l.983:** `_POSITION_TIER = {… K:5, P:5, FB:5}` — the model already ranks P and FB at the **lowest tier (5)**, below the specialists' neighbours and far below QB (1). The Owner's "edge is one position" ruling sits in the same table, where `LEDG` and `REDG` are both tier 2 ✔ consistent with P1's finding.

**The block spec — this is the real work, and it is a model change.** The only mention of `FB` in the script outside the data is **l.2432**, a comment on the rushing split ("*~15% goes to depth backs, FB, WR sweeps"). **There is no per-position block spec today**: a fullback's blocking is valued through the **`ol` unit** (run blocking), and a running back's through the **`rb` unit**. So the Owner's ruling — *"FB gets a much heavier block spec than a RB — not the `rb` unit"* — requires **a per-position blocking contribution for the fullback** (or routing FB's blocking to the `ol` unit with an FB-specific weight), which is a change to how `teamRatings` composes the nine unit ratings.

**What that costs (INFERRED from the structure, not measured):** the unit ratings are the spine of the matchup model, so a per-position block contribution is not a constant — it needs a way for `teamRatings` to see *which* player holds the FB slot, and a way for the **CPU's valuation** (`slotWins`, `replacementLevels`) to price a fullback. It therefore lands with the flex/base work (P0-17 / P0-16), not with a copy edit, and it needs the same re-validation as the weight change: the draft board, the 100-season report, and the real-2025 check.

**Answer to the queue item: P is already 1 in the weights and already tier 5, and is not drafted; FB is also 1 and tier 5 and is not drafted; the *block spec* does not exist as a per-position thing at all — it is the `ol` unit — so the Owner's ruling is a model change with a re-validation, not a number to type.**

## P4 · The star-selection logic, today and after

**Today's gate — VERIFIED at l.3031**, inside `starsParagraph(g, blow)` (l.3027):

```js
d[s].players.filter(p => p.impact >= 1.0 && !p.slot.startsWith('OT') && !p.slot.startsWith('OG') && p.slot !== 'C')
```

then **top 2 per side, top 4 overall** (l.3034, `cand.slice(0,4)`).

So today there is **no yardage threshold and no QB-specific rule at all** — the only filter is a **composite impact score ≥ 1.0**, with the offensive line excluded (C excluded explicitly, OT/OG by prefix; the defensive line, linebackers and defensive backs are **included**).

**What the Owner's thresholds change (INFERRED — the data is already there):**
- **60 rushing yards for all players** → a per-player gate on `s.rushYds >= 60` for the rushing positions, and a 60-yard analogue for the receiving group (the Owner's wording is "60 yards **rushing** for all players"; the receiving equivalent is his earlier "at least 60 yards" rule, so the sensible reading is **60 yards of the player's own production**).
- **QBs need ≥300 passing yards and a 3:1 TD:INT** → `s.passYds >= 300 && s.passTD >= 3 * s.int` (the 3:1 as a ratio; a QB with 0 interceptions and 3 touchdowns qualifies).
- Both thresholds **replace** the `impact >= 1.0` gate rather than adding to it, and **the data needed is already in the stat line**: the QB branch (l.3041) already prints `s.cmp, s.att, s.passYds, s.passTD` and interceptions, and the RB branch (l.3042) already prints `s.rushYds, s.car, s.rushTD` — so **no new plumbing is needed; the change is one filter at l.3031** plus the per-group thresholds.
- **One judgement call for Claude:** whether the old `impact >= 1.0` still acts as a floor for the non-QB groups (so a 60-yard player with a poor impact still qualifies) or is dropped entirely for them. The Owner's "reserve these spaces for +90 rating performances" suggests **the impact floor stays as a secondary filter** for the non-QB groups, and the QB gate is the new one. Worth stating explicitly, because it is the difference between a big Stars list and a short one.

**Answer to the queue item: today's gate is `impact >= 1.0` (top 2 per side, 4 total, offensive line excluded); the 60-yard and QB 300-yard/3:1 rules replace it, and every number they need is already in the stat line, so the change is a filter, not a pipeline.**

## What I did not check

- The **defensive** stars (the 60-yard rule is written for offensive production; what a defender needs to qualify is unstated — a real gap in the ruling, and worth asking the Owner);
- whether `impact` is available for every player or only the ones that reach this filter;
- the **game-ball** selection (the Owner's other ruling) — a separate path from `starsParagraph`, and I did not trace it;
- the effect of the new thresholds on a **real** game (no simulation was run; the thresholds' behaviour is INFERRED from the code, not observed).
