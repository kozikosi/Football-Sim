# P0-20 — Draft-complete gate hardcoded to 26 rounds (Beam proposal, 24 Oct 2026)

Target build: `Football-Sim-PreColors.html` · sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B). Advisory only — no product file edit. Anchors re-measured against Pre-Colors (work order's `NFL Draft Simulator merged.html` line numbers differ).

## WHERE / WHAT (old → new)

1. `Football-Sim-PreColors.html` line 849 — `if(draftSim && draftSim.pos >= 32*26){` → `if(draftSim && draftSim.pos >= 32 * TOTAL_ROUNDS){`
2. `Football-Sim-PreColors.html` line 866 — `${(draftSim && draftSim.pos < 32*26) ? ...}` → `${(draftSim && draftSim.pos < 32 * TOTAL_ROUNDS) ? ...}`
3. `Football-Sim-PreColors.html` line 852 — copy "Your 26 starters are done." → "Your starters are done."
4. `Football-Sim-PreColors.html` line 863 — copy "draft 26 starters first" → "draft your starters first"

Anchor strings (unique in file):
- `if(draftSim && draftSim.pos >= 32*26){`
- `draftSim.pos < 32*26) ? '<button class="tabbtn" id="goDraftResumeBtn">Continue draft in progress</button>'`
- `Your 26 starters are done.`
- `draft 26 starters first`

## WHY

`TOTAL_ROUNDS = ROSTER_SLOTS.length` (line 925, = 26 today). When FB/P enter `ROSTER_SLOTS` (R-4 punter worth 1, FB heavier blocking spec), the clock and round counter become 28 automatically, but these two gates are literals. At pick 832 the build would declare the draft complete, show "Play a Season", and picks 833–896 would never simulate. The resume button would also vanish at the same pick. Worst kind: header reads "Round 28 of 28" while the game insists the draft is over.

## SAFE ALONE?

YES. At 26 rounds `32 * TOTAL_ROUNDS === 32 * 26`, so the change is a provable no-op today and correct after. No protected constant, no math, no layout. `TOTAL_ROUNDS` already defined (line 925) before use site (line 849) — scope check: `TOTAL_ROUNDS` is a top-level `const` in the inline script, in scope at goSeason().

## HOW TO CHECK

```bash
grep -c '32\*26' "Football-Sim-PreColors.html"              # expect 0 after edit
grep -n '32 \* TOTAL_ROUNDS' "Football-Sim-PreColors.html"   # expect 2 sites
node --check (extracted script)
```

Seeded run (injectable RNG not yet landed, T-20261022-claude-2): inject `Math.random` via `Page.addScriptToEvaluateOnNewDocument` BEFORE page scripts:
```js
let s = 135792468;
Math.random = () => (s = (s * 16807) % 2147483647) / 2147483647;
```
Run a full 28-round draft; assert final pick index === 896, resume button present at pick 833, no "starters are done" panel before 896. (Requires V23 RNG work to be runnable as a seeded test; until then, structural evidence only per AGENTS.md §3 "Moving a number".)

## RECEIPT (verified 24 Oct 2026)

```
$ grep -n '32\*26\|32 \* 26\|draftSim.pos' Football-Sim-PreColors.html
828: else if(... draftSim.pos>=draftSim.order.length) step='season';
849: if(draftSim && draftSim.pos >= 32*26){
866:   ${(draftSim && draftSim.pos < 32*26) ? '<button ...goDraftResumeBtn...>' : ''}
1447: const round = Math.floor(draftSim.pos/32)+1;
...
$ grep -c '32\*26' Football-Sim-PreColors.html
2
$ sed -n '924,926p' Football-Sim-PreColors.html
const ROSTER_SLOTS = [...];
const TOTAL_ROUNDS = ROSTER_SLOTS.length; // 26 ...
```

Lines 849 and 866 confirmed literals; TOTAL_ROUNDS defined at 925 (after, but const is hoisted? No — `const` is NOT hoisted in TDZ). Wait: goSeason() is called at runtime after full script parse, by which point line 925 has executed. So TOTAL_ROUNDS is defined. OK.

No protected constant touched. No model output change (no-op today).

## Blast radius

- Affects draft-completion gating only. No change to picks, ratings, weights, or simulation.
- Copy changes two user-facing strings. No other references to "26 starters" found? Let me verify: grep "26 starters" → lines 852, 863 only (2 hits). Good.
