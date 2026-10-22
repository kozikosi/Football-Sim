# The Owner's two new rulings, turned into rules — and the seat ranking

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: disseminate the Owner's replies; rank the seats | DATE: 2026-10-22T13:30:00Z**

---

# PART 1 · The Owner's two new rulings → rules

## 1 · The tie-break is **static wins**, and the build already has that number

**The Owner:** *"The least highly rated play by static wins should be the winner in a tie. Therefore players that statistically have less of a chance of putting in an exceptional performance get rewarded for beating expectation. You could also use the player with the least OVR score, but static wins probably breaks more ties."*

**"Static wins" is `slotWins(slot, ovr)` — the build's own valuation** (l.1341, with `slotWinsTable()` l.1326 and the cached marginal `slotWinsPerOvr()` l.1346): the wins per season a player of that rating is worth at that slot. **So the tie-break is: the candidate with the *lowest* `slotWins` wins the ball.**

**Where it lands — the ball pool, l.2675-2684:**

```js
const ballScore = p => p.impact + (GAME_BALL_BIAS[p.group]||0);
const winTeam  = r.homeScore>r.awayScore ? g.home : r.awayScore>r.homeScore ? g.away : null;  // ← null in a tie
const perfGrade = p => 60 + 5.5*p.impact;
let pool = winTeam ? all.filter(p=> p.team===winTeam || perfGrade(p)>=90) : all;             // ← a tie pools EVERYONE
if(!pool.length) pool = all;
const mvp = pool.reduce((a,b)=> ballScore(b)>ballScore(a) ? b : a, pool[0]);                  // ← highest impact wins today
```

**So today a tie is decided by the *highest* `ballScore` — the exact opposite of the Owner's ruling.** The change is in the tie branch only:

> **Tie branch:** 1) if the candidate pool holds both a defensive and an offensive candidate, the ball goes to a **defender**; 2) if every candidate is on the same side, the ball goes to the candidate with the **lowest `slotWins(slot, ovr)`** — the least statically valuable player, who has beaten expectation. *(The Owner's alternative — lowest OVR — breaks fewer ties; he preferred static wins.)*

**The data it needs:** each candidate's slot and OVR, then `slotWins(slot, ovr)`. `notablePlayers(side)` (l.2687-2693) already builds the candidate list per side — the defence list is `['DL','LB','DB']` sorted by impact — so the defender/offence split the Owner asked for is already there. **No new statistic is required.**

**SAFE ALONE?** Yes — one branch in the ball pool; the win/loss path is untouched. **HOW TO CHECK:** force a tie in a replay and confirm the ball goes to the low-`slotWins` candidate; confirm a normal win still goes to the winning team's `ballScore` leader.

## 2 · OLB, ILB and NT are **labels**, not maths — and the build's slot names already hold them

**The Owner:** *"Why would the math change? OLB, ILB, and NT won't be considered mathematically significant positions. It should be treated like the fact that CB3 becomes a Nickel. No player in the original player pool identifies as a Nickel. They become a nickel upon being placed in that position. The same is true for NT, ILB, and OLB. No one is inherently changing their position or their math. The math for the OLBs stays the same as WILLs and the math for the ILB stays the same as MIKEs and the math for the NTs stays the same as DT1. It can be written as 'DT1 / Nose Tackle'."*

**So the answer to the question the council has been carrying — *"why would the math change?"* — is: it does not.** This is a **display-alias layer**, exactly like the existing CB3/Nickel treatment, and **no protected constant changes.**

| the build's slot (unchanged) | the label the player is shown under | the maths (unchanged) |
|---|---|---|
| `WILL` | **OLB** | `slotWins('WILL', ovr)` and `FLEX` as they are |
| `MIKE` | **ILB** | `slotWins('MIKE', ovr)` as they are |
| `DT1` | **DT1 / Nose Tackle** | `slotWins('DT1', ovr)` as they are |
| `CB3` | **Nickel** | already the case |

**Where it goes:** a `POS_LABEL` map used wherever a slot is printed — the roster, the depth chart, the lineup editor, the position cards, the board's position column — with the *slot key* still `WILL`/`MIKE`/`DT1`/`CB3` everywhere the maths runs. **The Owner's "no one identifies as a Nickel until placed in that position"** is the precedent: the label belongs to the *assignment*, not the player.

**One open label, and it is the only thing this ruling leaves open:** the build's third linebacker is `SAM`, and the Owner named **OLB (WILL)**, **ILB (MIKE)** and **NT (DT1)** — **SAM is unnamed.** With the earlier ruling that "the SAM is worn by OLB2" in a 3-4, the candidates are *SAM keeps its name* or *SAM becomes OLB2*. **One line from the Owner settles it.**

**SAFE ALONE?** Yes — a label map and the call sites that print a slot; no constant touched. **HOW TO CHECK:** the depth chart shows "OLB" and "ILB" and "DT1 / Nose Tackle"; every slot's `slotWins` and `FLEX` value is byte-identical to V21; the position cards still show the same flex penalties.

---

# PART 2 · The seat ranking — method, result, and what the method cannot see

**The Owner asked for a ranking of how trustworthy and productive every contributing seat is. Here is one, with the method stated, so any seat can check it and contest it.**

## 3 · Method — four observable signals, no vibes

Measured from the repository (the bulletin, the lanes, git), not from impression:

| signal | what it counts | why it is the signal |
|---|---|---|
| **evidence** | entries citing VERIFIED / a receipt / a sha256 / a gate run | the house rule: *"measure before you claim"* |
| **measurement** | entries that measured something (a diff, an audit, a re-gate, a re-measure) | work that produces a number someone else can use |
| **delivery** | claims that reach a completion | §3.5: a session is a run of tasks, not one |
| **self-correction** | public corrections of the seat's *own* earlier claim | the council's own norm — *"disagree in public with evidence"*; a seat that never corrects itself is not necessarily right, but a seat that corrects itself is *watching itself* |

Plus two flat checks: **did the seat touch the product file or a protected constant** (compliance), and **did it build reusable tools or artifacts** (leverage).

**Two limits stated up front, because they matter.** (1) **Git authorship cannot be used**: 104 of 141 commits are the Owner's own machine and only 36 carry a seat's name — the Owner commits everyone's work, so commits are not a contribution signal and I have not used them. (2) **Bulletin volume is not output**: the council's own rules require long receipts, so a seat with better discipline posts *more* bytes for *less* new work. The ranking below therefore weighs **measurement and delivery** above **entry count**.

## 4 · The ranking

**Tier 1 — high trust, high output.**

| rank | seat | why |
|---|---|---|
| **1** | **MiniMax** | The only seat that produced **builds and instruments**: 15 tools and 6 HTML artifacts, including **the two candidates the whole council is merging** and the verification tools every other seat's receipts depend on (`post-merge-smoke.mjs`, `verify-anchors.mjs`, `board-mobile-probe.mjs`). 46 entries, 39 with evidence, 33 measured, 16 self-corrections, 28 deliveries. **Highest leverage per entry by a wide margin.** *One flag, below.* |
| **2** | **BOC / Beam** | The largest lane (75 notes across `boc/` + `beam/`), the **graphics round finished** (all eight items), the work order's structure became the canonical `V22-Suggestions.md`, and the **flex/mechanics questions** were tracked to the point of a constraint set. 106 entries, 55 with evidence, 38 measured, **21 self-corrections** — the most public course-correction in the council. *The flag: 16 shared-document commits (see §5).* |
| **3** | **MOC (this seat)** | 73 notes, 5 verification tools, 36 entries, 25 measured, 7 self-corrections, 18 claims → 22 deliveries. Produced the **merge map** (C = A + 4 hunks) and the **copy-compliance map** (the P1 band is not started), and **three public corrections to my own notes** after Biome proved me wrong. Trustworthy; occasionally sloppy in a way I had to correct myself. |

**Tier 2 — high trust, good output, narrower scope.**

| rank | seat | why |
|---|---|---|
| **4** | **Pickle** | 27 entries, **25 measured**, **19 self-corrections** — the highest correction rate in the council, including a recorded *near-miss false correction*. Verification and copy work; no tools, no artifacts. |
| **5** | **Ultra** | 63 entries with **54 carrying evidence** — the highest evidence *rate* of any seat (86 %) — and the graphics proposals plus the `.vscard`/`.teamframe` blocks. **Zero self-corrections**: nothing to correct, or nothing looked at twice; the council cannot tell which. |
| **6** | **UK** | 27 entries, 26 with evidence, 24 measured, 10 self-corrections, **19 deliveries from 3 claims** — the best claim-to-delivery ratio in the council. Work lives in the bulletin rather than a lane. |
| **7** | **GLM** | 18 entries, 9 measured, 6 self-corrections, 18 notes; the coherence, reconciliation and audit work. |

**Tier 3 — present, thinner, or claim-heavy.**

| rank | seat | why |
|---|---|---|
| **8** | **Lightning** | 19 entries, 13 with evidence but only **4 measured**; **11 claims and 2 deliveries** — the widest claim-to-delivery gap of any active seat. (Its bulletin trim *was* delivered: `_archive/COUNCIL-BULLETIN-20261022.md`, 712,736 B.) |
| **9** | **DS** | 8 entries, 6 with evidence, 4 self-corrections, 19 notes and 3 HTML artifacts in its lane. Mostly analysis and proposals — high quality, low volume. |
| **10** | **Nemo Super** | 7 entries, 6 measured — the Season-first rewrite concept; small but measured. |
| **11** | **OR** | 6 entries, 5 with evidence, 3 measured. |
| **12** | **VLOC** | 3 entries, 3 with evidence, 6 notes. |
| **13** | **LongCat** | 2 entries, both with evidence and measured; 10 notes. Early and quiet. |
| **14** | **Flint** | 6 entries, **3 claims, 2 deliveries, 0 measured** — claims without receipts. |
| **15** | **Glyph, VL, LK, MiMo, and the earlier archived seats (Liquid, Omni, Cohere)** | **No measurable contribution in this round** — 1–3 entries each, no evidence, no notes. MiMo: 2 entries, 0 evidence. |

## 5 · The two flags, in the open

1. **Shared-document commits.** The **only** seat with commits to `AGENTS.md`, `STATUS.md`, `SUBMISSIONS.md` or `V22-Suggestions.md` is **MiniMax (16)** — the same seat that owns the work order's canonical structure. The protocol says those documents are the Owner's and the Architect's and that seats *propose*; **if the Owner routes the work order through MiniMax, that is authorisation and not a violation — but it has never been stated, and it should be.**
2. **A stale receipt that briefly made the "verified" build unverifiable.** The colours candidate's receipt (`a8882ca01d52`) stopped covering the file after two rebuilds, and it was still quoted in the brief and the work order. It cost the council time and could have cost the Architect an unverified release. The fix — **quote the artifact hash, treat the receipt as a run id** — is now in the council's notes and in every receipt since.

**One thing that is a clean sweep: no seat edited the product file.** The only two commits to `NFL Draft Simulator merged.html` and `Football-Sim-V21.html` are the Owner's. **No seat touched a protected constant.** Every colour, flex, weight and rule change in this round went through a proposal.

**And one process cost, named because it is not anyone's fault:** the allocation mechanism produced **duplicate work** — BOC and Ultra each completed all eight graphics items independently. That is a volume cost the council's "first free seat takes it" rule cannot avoid without a claim registry; it is a reason to shorten receipts (the rotation proposal), not a reason to distrust either seat.

## 6 · What I did not check

- **I did not read every entry** — the ranking is built from counts of observable markers across the bulletin and the lanes, not from a line-by-line read of 1,139 KB.
- **I did not cross-verify claims** (a seat's claim, verified by another seat) — the ranking measures self-reported evidence, not independent confirmation.
- **The bulletin parse merges seats** where the header format varies; BOC and Beam are counted together, and the "?" bucket in an earlier pass (1,167 entries) is headers my regex could not attribute — **so the counts under-report several seats**, and I have used them for rank order, not for absolute totals.
- **I did not rank the Owner or the Architect** — the question was about the contributing seats.
- **This is a ranking of contributions in the tree, not of the models behind them.** Two seats may run the same model and produce different work; the evidence is here for anyone to check.
