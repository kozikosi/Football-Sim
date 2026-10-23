# HOW TO CHECK audit — V22-Suggestions.md

**SPEAKER: DS | DATE: 2026-10-21 | Build under audit: `044d1759e01ac99b…`**
**Document state: 2,264 lines · sha256 `f1a0ca8334b33ffb…` (after the P1 de-duplication, 40 → 28)**

## The headline

**Zero of 186 change items carry a `HOW TO CHECK` line.**

The document defines the form at l.2025 — `### The one form every change line uses` — and then never uses it. The single `HOW TO CHECK` string in the whole file is that definition.

Checks do exist, but as **three disconnected tables** that no item points at:

| Table | Lines | Rows | What it covers |
|---|---|---|---|
| Feature verification | 36–43 | 8 | whole features, not individual edits |
| Risk assessment | 53–59 | 7 | severity, not verification |
| Post-edit checklist | 474–479 | 6 | whole-build gates |

So Claude can read what to change and what the build should feel like, and cannot tell for any single edit whether he did it. 36 P0 items — every product-changing one — are in that gap.

## The five weakest, by risk of Claude shipping the wrong build

### 1. P0-17 — the flex-rules overhaul
The highest-risk item in the document: it edits `FLEX`, which `AGENTS.md` protects, on the Owner's explicit instruction. There is no check, and a single wrong cell is invisible — the build still runs and still looks right.
**One-line check:**
```bash
node -e 'const s=require("fs").readFileSync(process.argv[1],"utf8");
const m=s.match(/const FLEX\s*=\s*(\{[\s\S]*?\n\};)/);
const F=new Function("return "+m[1].replace(/;\s*$/,""))();
for(const [pos,t] of Object.entries(F)) for(const [slot,p] of Object.entries(t)) console.log(pos,slot,p);' "NFL Draft Simulator merged.html" | sort
```
**Expected:** exactly the Owner's matrix, one line per position→slot, and no line for a pair he did not rule.

### 2. P0-16 — the 3-4 / 4-3 base
Two front sevens that must both be selectable, with `OLB1/ILB1/ILB2/OLB2` in one and `MIKE/WILL/SAM` in the other. If the slot codes change, the pool's legal codes change with them — the same mechanism that produced the 52-record drop.
**One-line check:**
```bash
node -e '...print ROSTER_SLOTS and both base orderings...'
```
**Expected:** each base 7 front-seven slots; `OLB≡WILL` and `ILB≡MIKE` resolve to the same valuation; the pool's `legalCodes` contains every slot code either base uses.

### 3. Appendix D — `DEFAULT_WEIGHTS`
Protected. The risk table already flags it HIGH, and the document gives no way to confirm the weights still produce the same league.
**One-line check:** the seeded A/B already proven on this build — install a seeded `Math.random` via `Page.addScriptToEvaluateOnNewDocument` **before** the page scripts, seed `135792468`, drive the same clicks, compare the 32 team scores and their order.
**Expected:** identical scores, identical order. Any drift means a weight moved.

### 4. P0-1 — "Value Here" out of the visual board
Prototyped and verified once (seeded A/B: headers 10→9, cells 1,148→0, Wins/Priority/final draft bit-identical). No check survives in the document.
**One-line check:**
```bash
grep -c 'Value Here' "NFL Draft Simulator merged.html"    # expect 0 in visible strings
grep -c 'dc-val' "NFL Draft Simulator merged.html"        # expect 0
```
**Expected:** zero visible occurrences; `r.v` still computed and still sorting; the board's header count is 9 and the Priority column is populated.

### 5. P0-15 — coaching philosophy unlocked all season
A gating change: the control must stay editable after Week 1. A vibe check ("still editable") passes on a build that re-locks at Week 2.
**One-line check:** simulate to Week 2, then assert the philosophy control's `disabled` is false and its change handler still fires; then to Week 10 and assert the same.
**Expected:** editable at every week; the description text matches the Owner's rewrite.

## The fix the document needs

One line per change item, in the house form, and nothing else:

```
HOW TO CHECK: <command> → <expected>
```
or
```
HOW TO CHECK: human visual pass, 390 px and 1280 px, light and dark — <what the reviewer looks for>
```

The three tables stay as release gates; they are not a substitute for a per-item check. Until every P0 has one, "done" means "Claude says so".

## What DS did not check

- Whether the three tables agree with each other (they were written at different times).
- Whether any check elsewhere in the tree already covers these items — the suites were read by MOC, not re-read here.
- The document's own line numbers against the current build; they were read against `40233d6b` and the build has moved twice.
