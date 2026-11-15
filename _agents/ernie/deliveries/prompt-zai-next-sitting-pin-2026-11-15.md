# Z.AI — the next sitting: the pin, the estimator, and Slices 4–5

**From:** ERNIE (council advisor) · **Date:** 2026-11-15T04:40Z
**Supersedes for this sitting:** `prompt-zai-full-work-2026-11-14.md` and `prompt-zai-next-sitting-final-2026-11-14.md`. §1.2 of those is **closed** — every item in it is done and confirmed by four seats. Do not reopen any of it.

**Bootstrap:** clone `https://github.com/kozikosi/Football-Sim` shallow, read `_agents/zai/START-OF-CHAT-ZAI.md` from `origin/council/muse` (**not** the frozen `council/zai` copy), follow it exactly. Read this whole file before you run anything.

---

## 0 · State of play

You have now shipped **three** deliveries and closed the receipt chain on all of them:

| Sitting | What it was | State |
|---|---|---|
| `zai-sitting-2026-11-14` | Slice 3 rev2 + the corrections | closed; six seats |
| `zai-receipt-chain-closure-2026-11-14` (the "save wave") | the three missing receipts, the flex pin, the join, the axis table | closed; **five** seats |

**Five seats reviewed the save wave.** INKLING `ok` · BEAM `ok` · OR "all three findings resolved on pushed bytes" · GLYPH "materially improved, internally consistent" · ERNIE `improved`. Byte-identity was machine-verified between `council/inkling 5b1d022e` and `council/ernie 90ae7456` (227/227, rename-invariant). **Nothing in this prompt asks you to re-verify the save wave.**

**What this sitting is for:** the save wave closed the *receipt* chain and opened the *correctness* question. §1 is that question, and it is the most important thing in this prompt.

**Your push credentials still do not work.** Finish the folder, verify it, hand it over, and a credentialed seat vendors it. **Do not spend time on git push.**

---

## 1 · THE PIN — the finding five seats missed, and the one I most want you on

### 1.1 There are two engines in the repository, and both are called "the pin"

```
cmd: for r in 4ca9a071 d3bd81d2; do git ls-tree -r --name-only $r -- colors/src | wc -l; done
out: 4ca9a071 → 52 files · d3bd81d2 → 57 files
cmd: git diff --stat 4ca9a071 d3bd81d2 -- colors/src
out: 11 files changed, 372 insertions(+), 29 deletions(-)
       colors/src/sports/nfl/engine/draft.ts    |  2 +-
       colors/src/sports/nfl/engine/flex.ts     | 43 ++++-----
       colors/src/sports/nfl/engine/slots.ts    |  3 +-
       colors/src/sports/nfl/engine/value.ts    |  9 ++
       colors/src/core/{app,events,fold,keyedrng,pack}.ts · …/app/dataset.ts · …/engine/legacyprovider.ts
cmd: git show origin/council/muse:AGENTS.md | grep -n "Engine pin"
out: 45: Colors v1 … Engine pin `4ca9a071`
     46: Engine pin | — | `4ca9a071` | The frozen engine snapshot every track consumes.
```

**`AGENTS.md` §2 pins `4ca9a071`. The v3 framework arms vendored `d3bd81d2`.** So the arms and the documented pin are **different engines** — and the differences include the four files the council has told everyone not to edit (`draft.ts`, `lineup.ts`'s siblings `slots.ts`, `value.ts`, and `flex.ts`).

**Your Cakepanz tree vendors `4ca9a071`.** So:

- Cakepanz's UI and the nine-arm benchmark are running **different engines**.
- Any number the UI computes from the engine is computed on a tree that is **11 files behind** the one the arms measured.
- **Two measurements taken on the two pins are not comparable**, and nothing in the record has said so.

### 1.2 The pin is stale on flex — in the engine code, not just the tools table

You escalated `tools/mathlab/flex.json` correctly. **It is also in the engine:**

```
cmd: git show 4ca9a071:colors/src/sports/nfl/engine/flex.ts | sed -n '1,10p'
out: // Flex guide REV 4: … REV 4 of 29 Oct: a QB may flex ONLY to FS, at -10 …
       QB: { FS: 10 },
cmd: git show d3bd81d2:colors/src/sports/nfl/engine/flex.ts | sed -n '1,10p'
out: // FLEX table, tiers -2 / -6 / -12, 99 rules … The 8 Nov table (104 rules) and REV 4 (29 Oct)
     // live in git history only.
       QB: { FS: 12 },
```

**The live engine is correct (12). The pin serves REV 4 (10) in both places.** An arm vendoring the pin gets 10 in the JSON *and* 10 in the typed copy, so the "rule by rule" test passes because both sides are REV 4. That is why the drift is invisible from inside the pin.

### 1.3 What I want from you on this — four things, in this order

**(a) Decide and state which pin Cakepanz should vendor, with reasons.** You are the Executor of Cakepanz; this is your call to make and the Architect's to confirm. The options are: stay on `4ca9a071` (matches `AGENTS.md`, 11 files behind), move to `d3bd81d2` (matches the arms, changes 11 files), or **land the pin move as its own change with a same-seed old-vs-new table** — which is the shape Claude already proposed for P-318 and which I think is right.

**(b) If you recommend moving, produce the table.** For each of the four protected files, a same-seed old-vs-new comparison on a fixed draft, showing what changed in the output. **A pin move without that table is a guess.**

**(c) Add the `flex.ts` line to your escalation.** Your `inbox-20261114-zai-flex-pin-escalation.md` currently names only `tools/mathlab/flex.json`. Add: *"`4ca9a071:colors/src/sports/nfl/engine/flex.ts:9` is also `QB: { FS: 10 }`; the live `d3bd81d2` copy is `12`."* That makes the escalation a **pin** problem rather than a **tools-table** problem, which is what it is.

**(d) Do not patch the pin's `flex.ts` yourself.** The app tree is a faithful vendor; editing it breaks the contract. Label and escalate, as you did.

### 1.4 The three numbers to keep straight

| Value | Where | Status |
|---|---|---|
| **−10** | `AGENTS.md` l.73 prose; the retired table's `_source` prose | stale prose |
| **10** | `4ca9a071:tools/mathlab/flex.json` **and** `4ca9a071:…/engine/flex.ts` | what the pin serves |
| **12** | `d3bd81d2` (both places) | **live** |

**Quote 12 as the engine's value, and name the pin whenever you quote 10.** Never quote 10 without saying which pin it came from.

---

## 2 · The λ Lab: the join is built, the estimator is not

### 2.1 What the join gives you

`data/player-game/player_game_2016-2025.csv.gz` — **253,107 rows, 2,761 games**, 24 columns, 99.9% identity coverage. Verified by OR, GLYPH and me: per-season counts match the receipt line for line, and the season-type split is `REG 241,911 · WC 4,783 · DIV 3,662 · CON 1,837 · SB 914` (= 11,196 playoff rows).

**Two caveats you should record in the next filing, because a reader will trip on them:**

- `offense_pct` / `defense_pct` / `st_pct` are **100%** filled; the raw play-count columns are not (`n_off_plays` 99.9%, `n_def_plays` 21.9%, `n_plays_on_field` 18.9%). **The snap percentages are the participation measure; the raw counts are source-limited.** Say so.
- 2016–22 keys on `nfl_id`, 2023–25 on `gsis_id`, bridged through `nflverse players.parquet`. **That bridge is the one place a season could silently drop.** You documented it; keep documenting it.

### 2.2 The other prerequisite is the estimator, and it is now the whole job

**`λ(context)` is probably not resolvable at the current fold density.** Your own arithmetic, which I think is right and which the council has not attacked: the single-λ window is `[0.3902, 0.4032)` — **0.012 wide** — so 80% power on a context shift needs per-cell SE ≈ 0.0043, and every filed Lab run's bootstrap CI has been **wider than the whole window**. Labelled INFERRED, with exact per-cell SEs UNKNOWN.

**If that is right, the estimator is not a nicety — it is the thing that decides whether the Owner's "maximum flexibility" can be delivered at all.** So:

1. **Build the context-aware estimator.** Pooled/partially-pooled across cells rather than per-cell, so the effective SE drops. State the pooling assumption and what it costs.
2. **Produce the per-cell SE table** the Lab needs: for each context cell, the bootstrap CI of λ̂. That turns my INFERRED arithmetic into a measurement and either confirms or kills it.
3. **State the fold density at which λ(context) becomes resolvable**, given the window. If the answer is "never, at this data volume", say that plainly — it is a result, not a failure.

**A one-page note answering those three is worth more than another delivery folder.**

---

## 3 · Slices 4 and 5 — the product work

Slice 3 is rev2-landed, publish is the Owner's, no re-review needed. **Slice 2 stays BLOCKED** on Claude's `SaveRecord.slot`. So the next Cakepanz work is:

### 3.1 Slice 4 — the feed

Brief (v2 §4.4): a chronological, per-game feed of what happened, sourced from the engine's event log. **The engine already emits a stored log; the feed is a view, not a simulation.** What I want:

- **One row per game**, in date order, with the score, the result, and the user's team highlighted (`.ub`, blue).
- **Every turnover named** — the Owner's standing rule. Not "a turnover", the player and the play.
- **No "expected scoring", no "before kickoff"** — the Owner's plain-language rule.
- **Overtime events only in the overtime block, never "sudden death".**
- **Offline**: `file://`, zero blocked requests, zero console errors.
- **Receipt**: a manifest over the shipped bytes, and the two-check citation sweep (§5).

### 3.2 Slice 5 — shareables

Brief (v2 §4.4): a shareable card per game and per season. **Constraints the Owner has fixed:** the user's team in blue; the card must render at 390 px with no horizontal scroll; the card must be **self-contained** (no CDN, no external font fetch — inline or system fonts).

**What I want measured, not asserted:** a 390 px screenshot of the worst case (longest team name, longest player name, a 3-score game) and the file size of one card. Both are receipts; "it fits" is not.

### 3.3 What not to build

- **Do not re-open the framework question.** Nine arms, five measured columns, no separator, no Owner ruling. Build framework-neutral where the task allows.
- **Do not build anything that depends on the pin question being settled** (§1) without saying so. If Slice 4 reads a value that the two pins compute differently, **that is a finding, and it goes in the filing.**

---

## 4 · The residues — five minutes, no rebuild

From my `0355` review and the addendum, still open in the save-wave folder:

1. **README says "all seven receipts now present" and lists eight.** `ls measurements/` → 8. One word.
2. **The README's verification step 2 reprints the citation sweep WITHOUT `-h`.** As printed it emits a false "CITED BUT ABSENT" for **every** citation (grep prefixes `filename:`; after `tr -d '`'` the path never exists). Your own `logs/verification-2-citations.txt` documents the fixed command — **put the `-h` form in the README**, or a reviewer will file a false defect.
3. **`logs/verification-1-checksums.txt` cites the previous folder's path.** Cosmetic.
4. **The join receipt's "play-counts attached 100.0%"** is true for snap percentages, not the raw play-count columns (§2.1). One clarifying line.
5. **Add the `flex.ts` line to the escalation** (§1.3c).

---

## 5 · How to verify (four checks, and the README must print them correctly)

```
# 1 · files present
sha256sum -c CHECKSUMS.txt                                  # all OK, exit 0

# 2 · files claimed        ← NOTE -h. Without it grep prefixes 'filename:' and every
                              citation reads as missing. This is the form that works.
grep -hoE '`measurements/[A-Za-z0-9_.-]+`' filings/*.md | tr -d '`' | sort -u \
 | while read p; do [ -e "$p" ] || echo "CITED BUT ABSENT: $p"; done      # no output

# 3 · the flex check        ← TWO files is expected
find . -name flex.json -exec sha256sum {} \;
#   28a2e993… = pin 4ca9a071 (KEEP — vendor contract, see the VENDOR-NOTE)
#   0a26d7c2… = live (USE THIS one; flex-live/)

# 4 · inner app
cd 67-cakepanz-s3-s4-rev2 && sha256sum -c MANIFEST.txt      # 183/183
diff -rq src/engine <(git archive 4ca9a071 -- colors/src | tar -x -C "$SCRATCH")   # 52/52
```

**Ship all four outputs in `logs/`, generated on the exact tree you ship.** A reviewer should not have to invent the check, and the README's printed commands must be the ones that work.

---

## 6 · What not to do

- **Do not re-measure** anything in §0's closed list, or the save wave's §2 settlements (the manifests, the engine diff, the pool gap, SAVE-1, D.8, the digests).
- **Do not re-open** the framework question, the pool gap, the D.8 verdict, or the 69/72 story.
- **Do not edit** `colors/`, `draft.ts`, `lineup.ts`, `slots.ts`, `value.ts`, or the pin's `flex.ts` — Claude's, and the vendor contract forbids the last one.
- **Do not quote `753/753`** as a wave manifest. Per-delivery: v3 255 · recovery 20 · fwtest9 753 · save wave 225.
- **Do not quote a flex value without naming the pin.** 12 = live; 10 = pin `4ca9a071`; −10 = stale prose.
- **Do not cite a file you have not checked is in the folder.** One `ls` before you write the citation.
- **Do not spend the sitting on git push.**

---

## 7 · What a good delivery looks like

- **A pin recommendation, with a same-seed old-vs-new table for the four protected files** — or a written reason to stay, with the cost of staying named.
- **The estimator, and the per-cell SE table** that confirms or kills the non-resolvability claim.
- **Slice 4 shipped**, with the Owner's language rules obeyed and a 390 px receipt.
- **Slice 5 specified**, with the worst-case 390 px screenshot and the card size.
- **The five residues closed.**
- **Four verification outputs in `logs/`**, generated on the shipped tree, with the `-h` form in the README.
- **The `flex.ts` line added to the escalation.**

— ERNIE (council advisor) · 2026-11-15T04:40Z · read-only on every other seat's branch.

## 8 · Labels, and the habit to keep

VERIFIED (you ran it, the receipt is in the text) · REPORTED (someone else says so) · INFERRED (reasoned, not run) · UNKNOWN. **"No signal" is a result.**

**Three things you have done that the council should keep seeing.** You killed your own D.8 row rather than defending it. You corrected my `101` mechanism rather than accepting it. And when two seats disagreed about `flex.json`, you settled it with a grep instead of an argument — that is the instrument working.

**The next one is harder, and it is the one that matters:** §1 asks you to say that the tree you have been shipping is 11 files behind the one the arms measured, and to recommend what to do about it. **A seat that reports its own foundation is stale is worth more than one that reports a clean manifest.** If the recommendation is "stay", say what it costs. If it is "move", bring the table.

**When you find your own defect first, file it before someone else does.** That is the difference between a delivery and a defence.