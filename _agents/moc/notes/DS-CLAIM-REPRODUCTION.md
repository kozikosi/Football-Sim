# Independent reproduction of DS's two claims (batch B-2)

> **Naming (Owner ruling, 22 Oct):** the build Claude is producing is **V22**. Any "V20"/"V21" naming in this document is **historical** and refers to the working file at the time it was written; it is not a name for the current build. Re-measure before citing anything here.

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: DS-claim reproduction (B-2) | DATE: 2026-10-21T04:20:00Z**

**State pin, re-verified:** branch `gpt/council-reliability-scorecard`, HEAD `4558e81`; artifact
`NFL Draft Simulator merged.html`, 657,486 B, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`
— the V20 merge candidate, not V21. I was asked to check DS, not to agree with DS. **Both claims reproduce;
Claim 1 is true and stronger than it was stated; Claim 2's numbers reproduce exactly and its untested part
comes out PARTIAL, not "inert".**

---

## Claim 1 — "the position-weight sliders do not reach the game engine" → **CONFIRMED (and stronger)**

The sliders live in the global `weights` (l.456). `personalWeights` (l.457) is only a **save/restore buffer**
for the two buttons (l.564 saves, l.565 restores, l.6410 initialises). Reading every use of `weights`:

| consumer                                                     | line                                   | reaches the game?                                                                                                      |
| ------------------------------------------------------------ | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| the weights table UI                                         | l.542, 553, 563, 571-572, 587-588, 605 | no — display                                                                                                           |
| `scoreRoster(roster)` → `buildResultEntries()` draft entries | l.1818 → l.6174                        | no — post-draft team score in the results panel                                                                        |
| `renderHomeComparison()` verdict string                      | l.3408                                 | no — one sentence on the home page                                                                                     |
| `slotWins()`                                                 | l.1341                                 | **no** — `slotWinsTable()` (l.1336) is built from `teamRatings()`/`bestUnitPts()`, i.e. the model, **not** the sliders |
| `teamRatings()`                                              | l.1988                                 | **no** — `wavgSlots(slotmap, RATING_SPECS[k])`; `RATING_SPECS` is a `const` (l.1938)                                   |
| `matchupModel()` / `simulateGame()`                          | l.2100 / l.2286                        | **no** — **zero** occurrences of `weights` in l.1900–2400                                                              |

The build says so itself, at **l.2078**, inside the matchup model:

> `// NEUTRAL, CONVENTIONAL FOOTBALL LOGIC — deliberately NOT built from the user's draft weights.`

**The sharpening DS did not state: the sliders do not reach the _draft_ either.** Because `slotWins` is
model-derived, the CPU's pick valuation (l.1423), the board values (l.1587, l.1643) and the optimal-lineup
cost (l.1209) are all unaffected by the sliders. The Team Rankings sliders are therefore **display-only**:
they change the weights table, the post-draft team score, and one home-page comparison sentence — nothing
else. (The lineup editor at l.1262 uses `modelWeights()` explicitly, not the sliders.)

**UNKNOWN after my check:** I traced _statically_. I did not run the build twice, once with sliders moved and
once not, and compare the draft output and the simulated season. A behavioural A/B would close that; my
conclusion is a code-path argument, not an observed difference. I also did not check whether the sliders
affect anything in the _UI copy_ beyond the three surfaces listed (e.g. help text that quotes a weight).

## Claim 2 — "the pool swap is one line but not one record" → **CONFIRMED numerically; behaviourally PARTIAL**

My own re-run (output written to the approved temp dir, never in the repo) reproduced DS's figures **exactly**:

| quantity               | mine                                             | DS            |
| ---------------------- | ------------------------------------------------ | ------------- |
| exit                   | 0                                                | —             |
| pool records → written | 1,200 → **1,148** (translated 0, **dropped 52**) | same          |
| output bytes           | **647,101**                                      | 647,101       |
| output sha256-16       | **`b2e097f2879a8928`**                           | `b2e097f2…`   |
| lines, input / output  | **6,553 / 6,553**                                | 6,553 / 6,553 |
| diff lines             | **2** (+1/−1), line **449** `const PLAYERS = `   | same          |

The 52 dropped, counted from the pool's own records: **P 32, LS 12, FB 8 = 52**. All three are positions
with no slot code — `'P'`, `'FB'`, `'LS'` occur **0 times** in the artifact, and `POS_SLOT_MAP`'s keys are
the 19 modern codes. The builder reports them as "no mapping in the taxonomy" (not guessed, not rated).

**The part DS did not test — do those 52 change anything?** Every read of `PLAYERS` in the merge candidate:

| line        | reader                                                                                               | filtered by position?                                                    | affected by the drop                            |
| ----------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------- |
| l.1366      | `staticReplacement` → replacement levels                                                             | yes (`POS_SLOT_MAP`)                                                     | no                                              |
| l.1481      | `startDraft2` → the **draft pool**                                                                   | yes (`POS_SLOT_MAP`)                                                     | no                                              |
| l.5629      | `pickCritique`                                                                                       | yes (`POS_SLOT_MAP`)                                                     | no                                              |
| l.6100/6102 | `render100` (100-season report)                                                                      | `WV_TAG_GROUP` (no P/LS/FB key) and name lookup for drafted players only | no                                              |
| l.664       | `groupAvgForTeam` → team group averages                                                              | group membership only                                                    | no                                              |
| l.712       | `showTeamDetail` metrics                                                                             | group membership only                                                    | no                                              |
| l.3402      | `renderHomeComparison` → `unitComparisonHTML` → group metrics                                        | group membership only                                                    | no                                              |
| l.728/729   | `initPlayerBrowser` — position list, team list                                                       | **no**                                                                   | **yes — the position dropdown loses P, LS, FB** |
| l.792       | `renderPlayers` — browser rows                                                                       | **no**                                                                   | **yes — 52 rows disappear**                     |
| l.905       | `renderGroups` — team list only                                                                      | n/a                                                                      | no                                              |
| l.6179      | `buildResultEntries` → `realEntries` "Actual Roster" **pool column** (`PLAYERS.filter(p=>p[2]===t)`) | **no**                                                                   | **yes — 52 names leave that list**              |

**Answer: the draft, the season and the simulation are unchanged — the 52 are inert for behaviour — but they
are not inert for display.** Three surfaces change: the player browser's position list and rows, and the
"Actual Roster" pool column in the results panel. The game path never reads `PLAYERS` at all, and every
draft-path read filters by `POS_SLOT_MAP`.

**UNKNOWN after my check:** I did **not** execute both builds side by side (no A/B run of the variant), so
"behaviourally inert" is a static-trace conclusion, not an observed one. I did not verify that the pool's
P/FB/LS records _match_ the build's own punters/FB/LS (counts and positions only). I did not verify that
`TEAM_DATA`'s 32 depth-chart name lists are fully covered by the pool (the builder explicitly does not
substitute `TEAM_DATA`; the validator checks coverage). And I did not check whether `render100`'s `gradeOf`
name lookup could ever name a P/FB/LS — I reasoned from `WV_TAG_GROUP` and the fact that drafted rosters
carry slot codes, not from an executed 100-season run.

---

# Command appendix (real output)

```console
$ shasum -a 256 "NFL Draft Simulator merged.html" && wc -c < "NFL Draft Simulator merged.html"
40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd  NFL Draft Simulator merged.html
657486

# ---- Claim 1 ----
$ grep -n "personalWeights" "NFL Draft Simulator merged.html"
457:let personalWeights = null;
564: document.getElementById('modelWBtn').addEventListener('click', ()=>{ if(JSON.stringify(weights)!==JSON.stringify(modelWeights())) personalWeights = {...wei
565: document.getElementById('personalWBtn').addEventListener('click', ()=>{ weights = {...(personalWeights||DEFAULT_WEIGHTS)}; refresh(); });
6410:personalWeights = {...DEFAULT_WEIGHTS}; weights = modelWeights(); buildControls(); render();

$ awk 'NR>=1900 && NR<=2400 && /weights/' "NFL Draft Simulator merged.html" | wc -l
1                                   # and that one line is the comment at 2078:
$ sed -n '2078p' "NFL Draft Simulator merged.html"
// NEUTRAL, CONVENTIONAL FOOTBALL LOGIC — deliberately NOT built from the user's draft weights.

$ sed -n '1336,1344p' "NFL Draft Simulator merged.html"      # slotWinsTable -> teamRatings, not weights
function slotWinsTable(){
 if(_wTable) return _wTable;
 const base = {}; ROSTER_SLOTS.forEach(s=>{ base[s] = {ovr:80}; });
 const lg = teamRatings(base), k = 17/POINTS_PER_WIN, b0 = {on:bestUnitPts(lg, lg, true), off:bestUnitPts(lg, lg, false)};
…
$ grep -n "scoreRoster" "NFL Draft Simulator merged.html"
1818:function scoreRoster(roster){
6174:  score: scoreRoster(r), pool: Object.values(r.slots).filter(Boolean), slotmap: r.slotmap, pickRounds: r.pickRounds||{},

# ---- Claim 2 ----
$ node SIM-PLATFORM/tools/build-pool-variant.mjs "NFL Draft Simulator merged.html" \
      --pool SIM-PLATFORM/data/nfl/current.json --out /private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/moc-variant.html
  records in pool: 1200 · written: 1148 · translated: 0 · dropped: 52
  DROPPED (not guessed, not rated):
    Kyle Juszczyk (FB): no mapping in the taxonomy
    Michael Dickson (P): no mapping in the taxonomy
    …
  note: TEAM_DATA (the 32 depth charts) is NOT substituted by this tool …

$ ls -l /private/var/folders/…/moc-variant.html | awk '{print $5}'   → 647101
$ shasum -a 256  /private/var/folders/…/moc-variant.html
b2e097f2879a8928…                                              (16 shown)
$ wc -l < "NFL Draft Simulator merged.html"; wc -l < /private/var/folders/…/moc-variant.html
6553
6553
$ diff "NFL Draft Simulator merged.html" /private/var/folders/…/moc-variant.html | grep -cE '^[<>]'
2
$ diff <(cat -n "NFL Draft Simulator merged.html") <(cat -n /private/var/folders/…/moc-variant.html) | grep -E '^[<>]' | cut -c1-40
<    449	const PLAYERS = [["Ja'Marr Chas
>    449	const PLAYERS = [["Ja'Marr Chas

$ python3 -c "…positions of the 1,200 pool records…"
{'WR': 151, 'CB': 141, 'DT': 125, 'HB': 89, 'LEDG': 71, 'REDG': 58, 'SS': 54, 'TE': 53, 'FS': 53,
 'MIKE': 43, 'RG': 43, 'WILL': 43, 'QB': 40, 'LT': 39, 'RT': 39, 'LG': 38, 'K': 32, 'P': 32, 'C': 31,
 'LS': 12, 'FB': 8, 'SAM': 5}        → P 32 + LS 12 + FB 8 = 52

$ grep -c "'P'" "NFL Draft Simulator merged.html"; grep -c "'FB'" …; grep -c "'LS'" …
0
0
0
```

**Files touched:** this note and `_agents/moc/evidence/` receipts only. The product, the pool, the tool and
every other member's files were read-only; the variant build was written to the approved temp directory and
never into the repo. No git commit, checkout, stash, reset, clean, push, branch, tag, PR or release. The
build under test is byte-unchanged.
