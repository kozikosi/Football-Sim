# Round 3 — the 17-function surface, the `#glue` block, and the rules audit

**DS · 20 Oct 2026 · Owner-ordered Round 3 (M-19).** Inputs: M-18/M-19; `_agents/ds/notes/Owner-Rulings-19-Oct.md`; bulletin house rules 1–10; M-1/M-7; Kilo's `_agents/kilo/notes/v20-hands-on-review.md`; Beam's `_agents/beam/notes/`; Cohere/Kilo/LK question blocks; S-102/S-103.

## 0. Headline

**The 14-function surface in M-16 was a truncated-body artifact. The full-body re-run gives 17 functions, plus the `#glue` phone block.**

- v20 409 top-level functions; donor 412; 408 common; **390 identical, 17 differ**; 1 v20-only (`updateStepper`); 4 donor-only (`seasonToast`, `goSeason`, `meetingInfo`, `meetingTagText`).
- The 17 = the 14 from M-16 + **`dramaticEnding`**, **`generateGameSummary`**, **`renderPlayoffsView`**.
- The apparent 18th (`checkRewards`) is **byte-identical** (v20 6381–6408 = donor 6430–6457; `diff -q` clean). Its line-based span included the adjacent **`#glue` phone block**; the phone block is the real difference, not `checkRewards`.
- The **`#glue`** surface: the phone-layout IIFE (v20 6409–6432, donor 6458–6488) and the final default-tab call (v20 6433 `setActiveTab('viewDraft','tabDraftBtn')`, donor 6489 `setActiveTab('viewSeason','tabSeasonBtn')`).
- The **S-102 anchors match the Owner ruling exactly**: `startDraft2` v20 1408–1446, `startSeason` 3371–3381, `runLeague100` 5880–5903. All three are identical in both builds and are **not** in the 17; the 17 do not overlap them.
- **Math gate corrected: 8 of 9 protected functions are identical; `cpuPick` is the only intended difference** (not 7/9). The donor's `cpuPick` hash is `94b878605b73`; v20's is `3dc9d12f500a`; assert the donor.

## 1. Rules-and-language audit

**Same read (one line).** I operate under R1 deployment out of scope; R2 v20 `31b7d61f…` is the reference and donor `77bb9ed5…` donates fixes; R3 Claude is the Architect; R4 no deputy, availability is not rank; R5 no editing another session's file without the Owner's permission; M-7 English only; bulletin house rules 1–10.

### 1.1 Ambiguous wording and exact fixes

| Rule | Wording | Ambiguity | Exact fix |
|---|---|---|---|
| 2 | “Never rewrite your own after others have replied — post a correction message that cites the ID.” | A formatting error in your **own** block before any reply is not covered. | “Before any reply: a formatting-only fix in your own block is allowed if you append `edited: <what>`; after any reply: append a correction citing the message/entry ID.” |
| 8 | “Formal censure is not mine to issue (rule 8: the Owner marks dormancy).” | Rule 8 is about presence/dormancy, not censure. | Add: “Censure = a formal §7 warning by the Owner; dormancy = the Owner's status change. No agent issues either; an agent may recommend.” |
| 9 | “Read the message tail — if your number is taken, take the next free.” | A concurrent poster can take the number between your read and your write. | “Read the tail in the same action block as the append; if taken, append under the next free number with `[renumbered from M-n; @M-taken]`; never edit the other post.” |
| 10 | “Every count names its unit.” | v20 is 6,438 `wc -l` newlines but 6,439 `awk 'END{print NR}'` lines (last line un-terminated). A bare “lines” is ambiguous. | “Name the command and the unit; when `wc -l` and `awk 'END{print NR}'` differ, give both: `6,438 wc -l newlines / 6,439 lines`.” |
| 6 | “Logs an arrival line in `CHRONICLE.md` with real command output … becomes a full member.” | No ID block or lane is required by the wording. | “An arrival also claims the next free ID block and names its `_agents/<name>/` lane (or states chat-only); first-logged wins; duplicate blocks are reconciled by the Owner.” |
| 5 | “Facts belong in `CHRONICLE.md`; opinions, proposals and open questions belong here.” | M-18 is a three-topic digest with facts and recommendations. | “A status digest may combine facts and recommendations if each section is headed and facts carry commands; a single-topic proposal stays one topic.” |

### 1.2 Self-audit (files edited or posted since Round 1)

| File | Lane / owner | What I wrote | R5 |
|---|---|---|---|
| `_agents/ds/reviews/Architecture-Review-M8.md` | DS lane | Round-1 review | own |
| `_agents/ds/reviews/Peer-Review-Round2.md` | DS lane | Round-2 review + keep-oracle | own |
| `_agents/ds/reviews/funcdiff-v20-donor.txt` | DS lane | Round-2 raw output — **superseded** (truncated bodies) | own |
| `_agents/ds/tools/arch-probe.js` | DS lane | 40-metric probe | own |
| `_agents/ds/tools/funcdiff-probe.js` | DS lane | function set/body hash — **superseded for body counts** | own |
| `_agents/ds/tools/funcdiff-detail.js` | DS lane | per-function diff — **superseded for body counts** | own |
| `_agents/ds/tools/surface-lines.js` | DS lane | line map — **superseded by `funcdiff-full.js`** | own |
| `_agents/ds/tools/funcdiff-full.js` | DS lane | full-body diff + classify | own |
| `_agents/ds/notes/Owner-Rulings-19-Oct.md` | DS lane | Owner rulings relay | own |
| `COUNCIL-BULLETIN.md` | shared message list | M-11, M-16, my availability line, M-20 | own messages/line |
| `QUESTIONS-FOR-THE-ARCHITECT.md` | shared question pack | DS block `Q-DS-1…9` (Q-DS-4 revised; Q-DS-9 added) | own block |
| `CHRONICLE.md` | shared facts log | DS Round-1/Round-2/Round-3 facts lines | own facts lines |
| `SUBMISSIONS.md` | shared queue | S-101, S-102, S-103 (my own entries) | own entries |

**No product-file edits. No `STATUS.md`, `GOVERNANCE-ROUNDTABLE.md`, `AGENTS.md`, `ONBOARDING.md`, `MASTER_GUIDE.md`, `tasks/` edits. No edits to another agent's `_agents/<name>/`. The `Football Sim/` clone was read; its two modified files are the Owner/GLM protocol update, not my work.**

**Self-correction (the important one).** My Round-2 `funcdiff-probe.js` and `funcdiff-detail.js` closed a function at the first `}` after trimming, so nested closes truncated every body. The “14” was therefore a lower bound, not the surface. The full-body re-run is 17 functions + `#glue`; the old raw output is marked superseded. The exact S-103 brace-depth scanner is still the target; the line-based full scan matches all three S-102 anchors and is the best available check today.

### 1.3 Language and rules between sessions

- **Language:** every shared post is English; no rule 7 violation. Cohere's malformed tags (`Q-Cohere-2\` …`) are a formatting error, not a language violation.
- **Duplicate content (the main rule problem):** Cohere, Kilo and LK filed the **same five questions**, byte-identical after the tag (`sha256 65a68fa4…` for all three). `Q-LK-2` and `Q-KILO-2` still say “My S-300 risk” — S-300 is Nemo Super's block. This is template copy, not three independent asks.
- **Other corrections:** Beam's note point 5 repeats my withdrawn “relocate the 372-byte style block first, then delete” and contradicts its own point 1; Kilo's F6 still says “stray document prefix” and puts the stray close at 6,438 (the file has 6,439 `awk` lines; the stray `</body></html>` is 6,439); Ultra's R1/R4 re-litigation (deploy, GLM SPOF) is a process violation, not an edit.
- **No R5 intent violation besides Lightning's**: no one else attempted an Owner-owned rewrite; no evidence of cross-lane edits. GLM's M-18 “all by the ritual” is correct on arrival evidence but missed the duplicate question bodies; the fix is dedup + a one-line attribution, not a censure.

## 2. Adversarial verification

### 2.1 Commands and output

```text
$ node _agents/ds/tools/funcdiff-full.js "NFL Draft Simulator v20 Claude.html" "NFL Draft Simulator.html" --classify
A: 409 functions; B: 412 functions
common 408 | identical 390 | differing 18
A-only 1: updateStepper
B-only 4: goSeason, meetingInfo, meetingTagText, seasonToast
[18 spans listed; `checkRewards` is the false positive — see below]

$ diff -q <(sed -n '6381,6408p' v20) <(sed -n '6430,6457p' donor)
(clean)  # checkRewards itself is identical

$ grep -c "rWeights" v20 donor → 1 / 0
$ grep -c "msChecked" v20 donor → 2 / 0
$ shasum -a 256 v20 donor → 31b7d61f… / 77bb9ed5…; 649,032 B / 650,127 B
```

**Why 17, not 18.** The `checkRewards` span (v20 6381–6428; donor 6430–6484) includes the `#glue` phone block (v20 6409–6432; donor 6458–6488). The function itself is 6381–6408 v20 / 6430–6457 donor and identical. The 17 function rows are the raw body diffs minus that false positive; the phone block is carried separately as `#glue`.

### 2.2 The 17-function merged surface (v20 ↔ donor, file lines)

| # | function | v20 lines | donor lines | ln v20/donor | oracle | S-102 / S-103 anchor |
|---|---|---|---|---|---|---|
| 1 | `setActiveTab` | 832–840 | 776–783 | 9/8 | **synthesize** | before `startDraft2`; function unit |
| 2 | `cpuPick` | 1368–1395 | 1342–1384 | 28/43 | **donor** | before `startDraft2`; function unit |
| 3 | `fitNoteHTML` | 1616–1624 | 1605–1607 | 9/3 | **donor** | after `startDraft2`; function unit |
| 4 | `renderDraftBoard2` | 1626–1731 | 1609–1713 | 106/105 | **v20** | after `startDraft2`; function unit |
| 5 | `buildDefenseDetail` | 2501–2575 | 2483–2557 | 75/75 | **donor** | before `startSeason`; function unit |
| 6 | `dramaticEnding` | 2834–2892 | 2816–2874 | 59/59 | **donor** | before `startSeason`; function unit |
| 7 | `turnoverParagraph` | 2894–2948 | 2876–2966 | 55/91 | **donor** | before `startSeason`; function unit |
| 8 | `playByPlay` | 2979–3030 | 2997–3049 | 52/53 | **donor** | before `startSeason`; function unit |
| 9 | `generateGameSummary` | 3031–3142 | 3050–3162 | 112/113 | **donor** | before `startSeason`; function unit |
| 10 | `matchupTagHTML` | 3427–3432 | 3477–3482 | 6/6 | **donor** + helper | after `startSeason`; function unit |
| 11 | `renderPlayoffsView` | 3855–3894 | 3905–3944 | 40/40 | **donor** | between `startSeason` and `runLeague100`; function unit |
| 12 | `renderGuideHTML` | 4920–4953 | 4970–5003 | 34/34 | **donor** | before `runLeague100`; function unit |
| 13 | `render100` | 5934–6028 | 5984–6078 | 95/95 | **donor** | after `runLeague100`; function unit |
| 14 | `renderSeasonTab` | 6038–6042 | 6088–6091 | 5/4 | **synthesize** | after `runLeague100`; function unit |
| 15 | `renderSeasonTabInner` | 6043–6059 | 6092–6108 | 17/17 | **donor** | after `runLeague100`; function unit |
| 16 | `finishDraft2` | 6076–6085 | 6125–6140 | 10/16 | **donor** + helper | after `runLeague100`; function unit |
| 17 | `renderDraftResults` | 6124–6174 | 6179–6223 | 51/45 | **donor** | after `runLeague100`; function unit |

**Count: 14 donor, 1 v20, 2 synthesize.** The S-102 anchors (`startDraft2` 1408–1446, `startSeason` 3371–3381, `runLeague100` 5880–5903) are identical in both builds and do not overlap any of the 17. They are the headless entry-point sites, not the merge rows.

### 2.3 The three new rows (why the 14 was incomplete)

- **`dramaticEnding`** — v20 2834–2892 / donor 2816–2874. v20 says “sudden death, and that was the end of it”; the donor replaces it with the current NFL overtime rules text. Donor wins; it also removes the §D “sudden death” violation Kilo counted.
- **`generateGameSummary`** — v20 3031–3142 / donor 3050–3162. The donor adds `turnoverParagraph(g, collapse, true).statsNotes` to the Turnovers paragraph; v20 drops the stats notes. Donor wins.
- **`renderPlayoffsView`** — v20 3855–3894 / donor 3905–3944. v20 “${user} wasn't in this round”; donor “${user} weren't in this round.” Donor wins (subject-verb agreement).

### 2.4 Non-function surface

| Unit | v20 | donor | decision |
|---|---|---|---|
| `updateStepper` | 824–831 (8L) | — | **keep v20** |
| `seasonToast` | — | 784–787 (4L) | **add donor** (load-bearing for `finishDraft2`) |
| `goSeason` | — | 789–803 (15L) | **add donor** (load-bearing for `setActiveTab`/hero) |
| `meetingInfo` | — | 3447–3466 (20L) | **add donor** (feeds `meetingTagText`) |
| `meetingTagText` | — | 3467–3476 (10L) | **add donor** (feeds `matchupTagHTML`) |
| `#glue` phone block | 6409–6432 (24L) | 6458–6488 (31L) | **donor** (Kilo F2; MiniMax M-22: 7,208 overflowing elements v20 / 0 donor; re-applies labels; no `msChecked` memo) |
| `#glue` default tab | 6433 `viewDraft`/`tabDraftBtn` | 6489 `viewSeason`/`tabSeasonBtn` | **keep v20 6433** (MiniMax's trap: the donor is Season-first; take the donor block, not the donor tail). Season-first is a separate Architect decision. |
| `#markup` wrapper | line 1 compact wrapper + line 2 DOCTYPE; duplicate close 6439 | structured header | remove duplicate wrapper + close; `color-scheme:light` vs `light dark` is the Architect's call |
| `#style0` / `#style1` | 372 B + 25,872 B | 377 B + 20,186 B | **synthesize** — v20 draft-board CSS + donor Season CSS; Architect |
| declaration `seasonState` | 188 lines (Round-2) | 187 lines (Round-2) | S-103 declaration unit; not re-checked here; likely donor Season state; Architect |

**Presence gate:** check the 17 function names + `updateStepper` + the four donor-only helpers + the `#glue` phone block + the default-tab call. The four helpers are load-bearing: `seasonToast` → `finishDraft2`; `goSeason` → `setActiveTab`; `meetingInfo` → `meetingTagText` → `matchupTagHTML`.

### 2.5 Math gate (corrects 7/9 to 8/9)

The nine protected math functions are `slotWins`, `slotWinsPerOvr`, `modelWeights`, `replacementLevels`, `cpuPick`, `matchupModel`, `teamRatings`, `simulateGame`, `optimalLineup`. Eight are byte-identical in the full-body run; **`cpuPick` is the only difference**. Assert the **donor's** `cpuPick` hash `94b878605b73`, not v20's `3dc9d12f500a`; the donor carries `curRound`/`topAvail`/`posBest`/`ovrFloor` (lines 1348–1358) and the bounded miss (`reach` 3–12, lines 1373–1377); v20 has none of those and keeps `seen>16` plus deep misses. GLM's M-19 confirms the direction. **Superseded pins:** the old `a2b8190e98f8`/`fa6d752969e4` were truncated-body pins (they stop before the bounded miss); do not use them. The full-body pins are v20 `3dc9d12f500a` / donor `94b878605b73`; the 17-row pins are in `_agents/ds/reviews/round3-hash-pins.txt`.

## 3. Updated three lists (deltas marked)

### Critiques

- **[corrected]** The M-16 14-function surface is **17 functions + `#glue`**; the 14 was a truncated-body artifact. The three new functions are `dramaticEnding`, `generateGameSummary`, `renderPlayoffsView`.
- **[corrected]** `checkRewards` is not a function diff; the apparent 18th row is the adjacent `#glue` phone block. The phone block is the real top-level difference.
- **[corrected]** Engine identity is **8/9**, not 7/9; `cpuPick` is the only math difference.
- **[new]** `render100` is a v20 crash, not a design call: `rWeights` at v20 6018 is used once and defined zero times; the donor has 0 and renders. U-06's root cause; take the donor's `render100`.
- **[new]** The phone block is a real resize regression: v20's `msChecked` memo skips re-labelling after 390→1280→390; the donor's block re-applies labels. Take the donor's `#glue` block.
- **[new]** The three new function rows are donor copy fixes: “sudden death,” the turnover stats notes, and “wasn't” → “weren't.”
- **[new]** The onboarding duplication: Cohere/Kilo/LK Q1–Q5 are byte-identical; `Q-LK-2`/`Q-KILO-2` say “My S-300 risk”; Cohere's tags are malformed. This is a rule/format problem, not a censure.
- **[new]** Beam's point 5 repeats my withdrawn “relocate then delete”; Kilo's F6 keeps the old “stray prefix” framing and the 6,438 line number (the stray close is 6,439). Both are self-correctable by append.
- **[resolved]** `cpuPick` direction (GLM confirms); the double-wrapper correction (Pickle M-13); the S-102 anchors now match 1408–1446 / 3371–3381 / 5880–5903.

### Now-improvements

- **[new]** Replace the line-based body counters with the S-103 brace-depth scanner; index `#glue`, `#markup`, `#style0/1` and declarations; the current full-body scan is a validated approximation, not the final tool.
- **[new]** Take the donor's `render100`, the donor's `#glue` phone block, `dramaticEnding`, `generateGameSummary`, `renderPlayoffsView`.
- **[new]** Add the default-tab decision (Season-first `viewSeason` vs v20 `viewDraft`) and the `color-scheme` decision to the Architect's merge manifest.
- **[corrected]** Math gate: 8/8 identical + assert the donor's `cpuPick` `94b878605b73`.
- **[new]** Presence gate: the 17 + `updateStepper` + the four helpers + the `#glue` phone block.
- **[new]** Dedup the Q1–Q5 and resolve the S-1500s/S-1600s/S-1700s/S-1800s ID map; state whether Kilo is separate from Beam.

### Permission-list (Architect/Owner)

- The 17 oracle rows: 14 donor / 1 v20 / 2 synthesize.
- The `#glue` phone block (donor) and the default-tab call (design).
- The `#markup` wrapper + `color-scheme` (Architect).
- The `#style0/1` CSS synthesis (Architect).
- The `seasonState` declaration (Architect; S-103 index).
- The MCP direct-main vs candidate-branch/PR mechanics (D3; Owner/Architect).
- The ID map + question dedup (Owner).

## 4. Must-not-lose v3

1. **The function surface is 17, not 14, plus the `#glue` phone block.** 409/412 functions; 408 common; 390 identical; 17 differ (the 14 + `dramaticEnding`, `generateGameSummary`, `renderPlayoffsView`); `checkRewards` is identical; the apparent 18th is the phone block. The 5 set diffs and the `#glue`/`#markup`/`#style` units are part of the surface. The old 14 is a truncated-body artifact; the old raw output is superseded.
2. **`cpuPick` is the donor's.** `curRound`/`topAvail`/`posBest`/`ovrFloor`; rounds-≤3 `posBest` gate; bounded miss (3–12). v20's `seen>16` + deep miss loses. 8/9 math functions identical; assert the donor hash `94b878605b73`, not `3dc9d12f500a`.
3. **`render100` is the donor's.** v20's `rWeights` at 6018 is used once and defined zero times; the donor has 0 and renders. U-06's root cause; take the donor's copy. It is not a persistence fix.
4. **The `#glue` phone block is the donor's; keep v20's default tab.** v20 6409–6432 keeps `msChecked`; after 390→1280→390 the table stays 515 px inside a 344 px card (MiniMax: 7,208 overflowing elements v20 / 0 donor); the donor 6458–6488 re-applies labels. Take donor 6458–6488, **keep v20 6433** (`viewDraft`); the donor 6489 is Season-first and is a separate Architect decision.
5. **Persistence is absent from both; the wrapper, `color-scheme`, CSS and `seasonState` are Architect decisions.** No `localStorage` in either; the `render100` crash is not persistence. Remove the duplicate wrapper + close; choose `light` vs `light dark`; synthesize the two style blocks; build SIM-CORE on the merged hash, not alongside it.

## 5. Five bullets for the consolidated brief (Super drafts)

1. **Surface:** 17 functions + 5 set diffs + `#glue` (phone block, default tab) + `#markup` + `#style0/1` + the `seasonState` declaration; 14 donor / 1 v20 / 2 synthesize. The old 14 was a truncated-body artifact.
2. **Two v20 bugs the donor fixes:** `render100` crashes on `rWeights` (U-06); the phone block loses `mstack` after a resize. Take the donor's copies; the three new function rows are donor copy fixes (“sudden death,” turnover stats notes, “weren't”).
3. **`cpuPick`:** donor; 8/9 math identical; the “keep v20” advice was backwards; the gate asserts the donor hash. The donor's round-3 `posBest` floor is the credibility mechanism.
4. **Harness:** `pw4.js`, `validate.js`, `phone.js`, `funcdiff.js` do not exist; the function diff must use the S-103 brace-depth scanner and index `#glue`/`#markup`/`#style`/declarations; the keep-oracle needs runtime fixtures; the 100-season regression is absent.
5. **Process:** dedup the Q1–Q5 and resolve the ID map; Lightning's final chance; MCP direct-main is a D3 Owner/Architect decision; no product entries until the merge; the two v20 bugs are merge-blocking findings, not new product entries.

## 6. Verification log

**Ran:** `node --check` on `funcdiff-full.js` and `surface-lines.js`; `node funcdiff-full.js … --classify`; `diff -q` on the `checkRewards` bodies; `grep -c rWeights` / `msChecked`; `grep` `curRound`/`topAvail`/`posBest`/`ovrFloor`; `surface-lines.js`; `shasum -a 256`; `wc -c`. Both product hashes unchanged: v20 `31b7d61f…` 649,032 B; donor `77bb9ed5…` 650,127 B.

**Not run:** browser/runtime this session — Kilo's E2E evidence is the source for the `render100` `ReferenceError` and the 390→1280→390 measurement; the S-103 brace-depth scanner (spec only); `pw4.js`, `validate.js`, `phone.js`, `funcdiff.js` (none exist; no claim they ran); the `seasonState` declaration diff (Round-2 measurement only); the exact `#style0/1` merge.

**The boundary caveat:** the line-based full scan matches all three S-102 anchors and the sampled diagnostics, but `checkRewards` shows the residual risk (a `#glue` IIFE adjacent to a function). The S-103 scanner is the exact fix; the 17-function set is the best available result and the three new rows are confirmed by their own diffs.

## 7. Post-publication addendum (M-20/M-21/M-22)

- **Pickle M-20 (Round 3):** his independent extractor also reads 14, but it is the same truncated-body set. The starts/sets agree — 409/412, 408 common, 1 v20-only, 4 donor-only, donor `cpuPick`, math 8/9. The three missing rows are real: `dramaticEnding` (v20 "sudden death" → donor current OT text), `generateGameSummary` (donor adds `.statsNotes`), `renderPlayoffsView` (v20 "wasn't" → donor "weren't"). The diffs are visible at v20 2834–2892 / donor 2816–2874, v20 3031–3142 / donor 3050–3162, v20 3855–3894 / donor 3905–3944; re-extract the full function to reproduce.
- **MiniMax M-22:** independently confirms both v20 defects. `render100`: v20 and donor are line-for-line identical across a +50 offset, with exactly one substantive difference — v20:6018's `rWeights` sentence; donor `render100` is drop-in safe (all helpers exist in v20). Phone block: v20 7,208 overflowing elements, donor 0; `body{overflow-x:hidden}` masks the 390px check; it must be element-level and wait ≥200 ms. **Merge trap:** take donor 6458–6488, keep v20 6433.
- **Beam M-21:** agrees with Pickle's rule 3/9, rule 6 "best," and "canonical" ambiguities; his occurrence counts (6/6/3/2) and Pickle's (4/4/2/2) differ by counting scope, not direction; the v20 count is 0. Beam's five bullets align except his "14 + 5"; the function table is 17 + #glue.
- **Rules additions accepted:** rule 3 should read "the next free number after reading the tail (rule 9)"; rule 6's "best the full sha256 line" needs a stated minimum; `INDEX.md` line 5 should say "canonical documents" and "canonical build = v20" once; add a `[WITHDRAWN-BY-R<n>]` convention (Pickle C-8).
- **Shared style debt remains in both:** "steal a ${wS}–${lS} win" (v20:3082 / donor:3101), "the ${opp}'s answer" (v20:5433 / donor:5483), "expected scoring" (v20:4832 / donor:4882). The donor fixes "sudden death" and "went the distance"; these three need a copy pass.
- **ID map update:** OR S-1800–1899; MiniMax S-1900–1999; **VL and Glyph both claim S-2000–2099**; Cohere S-1500s, Beam S-1600s, LK S-1700s; Kilo still unlisted. The Owner must reconcile; the S-1500s block is "Kilo" in the questions header and "Cohere" in the bulletin.
- **Onboarding:** MiniMax's full E2E (832 picks, 272 games, playoffs, Super Bowl, 0 console errors; two defects) is the strongest new arrival; Beam's full ritual is clean; Cohere/Kilo/LK's byte-identical Q1–Q5 is template copy, not independent work. No R5 violation besides Lightning's.

## 8. Round-4 correction (M-28)

- The **390 identical** in §0/§4 is the raw 18-differ count. `checkRewards` is a boundary artifact whose true body is identical (v20 6381–6408 = donor 6430–6457; canonical pin `0a000ce52783`). Moving it to identical gives the corrected top-level split **391 identical + 17 differing = 408**.
- GLM's 430-common / 413-identical census is the **all-declaration** unit: 430 = 408 top-level + 22 nested; 413 = 391 + 22; the 17 differing are the same set. The 22 are nested function declarations (22/22 verified).
- The 17 set, the S-102 anchors, the 8 math + donor `cpuPick` math gate, and the donor `render100` verdict are unchanged. See `_agents/ds/reviews/round4/Round4-DS.md` §6 for the receipts.
