# V22-ARITHMETIC-TRUTH.md — ARITHMETIC TRUTH slice (batch V22-READY-1)

SPEAKER: Pickle | ROLE: Council reviewer (S-800–899) | BATCH: V22-READY-1 (Owner-ordered, DS coordinating) | DATE: 2026-10-22

**Document:** `V22-Suggestions.md`, sha256 `f1a0ca8334b33ffb8605c1e416b30a…`, 2,263 lines (restructuring in progress — cited by **heading text**, never line number, per the batch rule).
**Pinned build:** `NFL Draft Simulator merged.html`, sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`, 656,746 B. Read-only: no product file, protected constant, or other lane edited; `V22-Suggestions.md` not edited.

---

## Verdict table — every quantity in the slice

| Quantity | What the doc says (heading) | What the build actually contains | Command run | Verdict |
|---|---|---|---|---|
| **Build hash** | `044d1759…`, 656,746 B (pinned everywhere) | hash `044d1759…`, size 656,746 | `shasum -a 256`; `stat -f %z` | **CORRECT** |
| **Doc hash** | batch header says `f1a0ca83…`, 2,263 lines | hash `f1a0ca8334b3…`, 2,263 lines | `shasum -a 256 V22-Suggestions.md`; `wc -l` | **CORRECT** |
| **Rounds today** | "Round 2 of 26" implied (P0-12) | `ROSTER_SLOTS.length` = **26**; `TOTAL_ROUNDS = ROSTER_SLOTS.length` | parse `ROSTER_SLOTS` + `TOTAL_ROUNDS` | **CORRECT** |
| **Rounds under the FB/P ruling** | "Owner confirmed 28 rounds" (P1-12) | 28 is **not** in this build (no FB, no P in `ROSTER_SLOTS`) — it is the *ruled future* state | `grep 'FB'`/`'P'` in `ROSTER_SLOTS` → False | **CORRECT (future state, correctly labelled as a ruling)** |
| **Pick total today** | "overall 46 of **832**" (P0-12, quoted output); "832 picks" (Appendix A evidence) | 32 × 26 = **832** (derived, not a literal) | `python3 32*26`; `grep -c 832` → 0 (derived) | **CORRECT** |
| **Pick total under 28 rounds** | "28 rounds" stated (P1-12); **896 stated nowhere** | 32 × 28 = **896** | `python3 32*28` | **AMBIGUOUS — see A** |
| **864 picks** | 32 × 27 — the batch lists "864/896" to sweep | 32 × 27 = **864**, but **the doc does not state 864 anywhere** | `grep -nE '864'` → 0 hits | **NOT IN DOC** (nothing to verify) |
| **Draftable pool today** | "cells 1,148→0" (P0-1) | **1,148** (1,200 − 32 P − 8 FB − 12 LS) | `PLAYERS` histogram | **CORRECT (as a today-state)** |
| **Draftable pool under FB/P** | "1,188" appears in earlier briefs; **not found in the current doc** | **1,188** (1,200 − 12 LS) | histogram | **CORRECT (number); NOT IN CURRENT DOC** |
| **The 52-drop** | "52 dropped" (earlier briefs/DS/BOC); not found in current doc body | 32 P + 8 FB + 12 LS = **52** today; **12** under the ruling | histogram | **CORRECT; see B for the tool behaviour** |
| **FB/P supply — HB** | not restated in current doc (was HB 89 in earlier rounds) | **HB 89** | `PLAYERS` histogram | **CORRECT** |
| **FB/P supply — FB** | (same) | **FB 8** | histogram | **CORRECT** |
| **FB/P supply — TE** | (same) | **TE 53** | histogram | **CORRECT** |
| **FB/P supply — K** | (same) | **K 32** | histogram | **CORRECT** |
| **FB/P supply — P** | (same) | **P 32** | histogram | **CORRECT** |
| **SAM scarcity** | "5 records for 32 teams (**27-player deficit**)" (P1-11) | SAM = **5** records; 5 for 32 slots | histogram | **CORRECT** |
| **Hardcoded 32×26 gates** | doc says "overall 46 of 832" is display text to enlarge (P0-12) | **2 literal `32*26` sites exist** — and they are **control-flow gates**, not display | `grep -c '32\*26'` → 2 | **WRONG — see C (the doc treats this as display only)** |
| **Record caps** | slice names "the record caps" | `SEASON_RECORD_CAPS` = `passYds:5400, rushYds:2060, recYds:1930, sack:21, dint:10, rec:140` | parse `SEASON_RECORD_CAPS` | **CORRECT — see D** |
| **Flex counts** | slice names "the flex counts" | `FLEX` has **11 keys** (`LT,LG,DT,REDG,MIKE,CB,SS,FS,WR,TE,HB`); `WV_SLOT_GROUP` has **26** (all slots) | parse both | **CORRECT (my M-421 correction stands: MOC's "19" was wrong)** |
| **−5 current-player adjustment** | "−5 adjustment NOT approved" (P1-14, P2-3) | not a build constant (a proposed pool rule) | grep → no `−5` constant | **CORRECT (correctly marked not-approved)** |
| **All-time pool 1,500–2,000** | "1,500–2,000 candidates" (P1-14) | not in build (proposed intake) | grep | **CORRECT (proposed, not a build fact)** |

---

## A · The one quantity the doc states twice — RESOLVED as a live inconsistency

**The pick total is stated at two different values in the document, and the second is missing:**

- **832** — stated twice as *quoted build output* ("overall 46 of 832", P0-12, two occurrences) and once as evidence ("832 picks", Appendix A). VERIFIED against today's build: 32 × 26 = 832.
- **896** — the correct total **after** the ruled 28 rounds, and it appears **nowhere in the document** (`grep '896'` → 0 hits in the doc body).

**Verdict: AMBIGUOUS / STALE-BY-OMISSION.** The doc quotes 832 (today) correctly, but for a change whose headline is "28 rounds", it never states the resulting **896**. A reader applying the FB/P change has no in-document statement of the new total. **Not resolved by guessing** — I flag it: the doc should state **896** wherever it speaks of the post-ruling draft. (My M-414 carries the arithmetic: 32 × 28 = 896, and 896 / 32 = 28 per team, confirmed structurally.)

**Second live inconsistency, same family:** the doc's P0-12 quotes the clock string as **"Round 2 of 26, Pick 14 (overall 46 of 832)"** — but this string **does not exist verbatim in the build** (`grep` → 0). The build *composes* it: `` `You're on the clock — Round ${round} of ${TOTAL_ROUNDS}, Pick ${pickInRound} (overall ${…})` ``. So the doc is quoting **rendered output**, not source. That is **not drift**, but it means a find-and-replace on that quoted string would **fail** — a Claude applying "bigger text size" to that line must edit the template, not search the literal. Flagged so it is not mistaken for a stale anchor.

## B · The 52-drop — CORRECT today, and the tool self-corrects

`1,200 − 32 P − 8 FB − 12 LS = 52 dropped` today; `1,200 − 12 LS = 1,188 / 12 dropped` under the ruling. **VERIFIED.** The drop is **emergent** from `NATURAL_SLOT_MAP` + taxonomy, not a hardcoded filter (my M-414, BOC's TRAP-PLAIN). So the "trap" is a **documentation stale-count**, not a product risk — the tool writes 1,188 and drops 12 by itself once FB/P constants are carried. The current doc no longer states 52 or 1,148 as a *forward* claim (1,148 survives only as the P0-1 prototype receipt "1,148→0"), so there is nothing stale to fix in the doc body on this point.

## C · WRONG — the doc treats the `32*26` as display only, but it is a control gate

The slice asks for "832 vs 896". The doc's only 832 references are **display** (the clock string) or **evidence** (verifier receipt). But the build holds **2 literal `32*26` sites**, and both are **control-flow**, not display:

- **l.849** — the `goSeason()` draft-complete check: at 28 rounds the build would declare the draft done at **pick 832**, and **the last 64 picks never sim**.
- **l.866** — the "Continue draft in progress" button: it would vanish at pick 832, removing the only resume path.

**Verdict: WRONG (incomplete) — the doc frames the 26→28 change as copy, and does not flag these two gates.** This is the single most important line-item in the FB/P spec (my M-414, finding 3). Recommended doc text: the two gates must become `32 * TOTAL_ROUNDS`; only the strings at l.5002/5058 and l.850/868 are cosmetic.

## D · Record caps — CORRECT and untouched by the ruling

`SEASON_RECORD_CAPS = {passYds:5400, rushYds:2060, recYds:1930, sack:21, dint:10, rec:140}` (VERIFIED by parse). These are real-NFL single-season records and are **invariant** under the FB/P change — a 28th round does not move a per-player cap. The doc does not propose changing them; **CORRECT as-is**, nothing to flag.

---

## Cross-checks and tags

- **VERIFIED:** build hash/size, doc hash/size, 26 rounds today, `TOTAL_ROUNDS` derivation, 832, 1,148, 1,188, all six FB/P supply figures (HB 89 / FB 8 / TE 53 / K 32 / P 32 / LS 12), SAM 5-for-32, 2× `32*26` sites, record caps, FLEX 11 / WV_SLOT_GROUP 26, `SEASON_RECORD_CAPS` contents.
- **REPORTED:** the doc's "28 rounds" is the Owner's ruling (P1-12); the −5 and 1,500–2,000 pool figures are *proposals* the doc itself marks not-approved — I did not treat them as build facts.
- **AMBIGUOUS / UNRESOLVED (not guessed):** the doc **states no post-ruling pick total** — 896 is absent while 832 is quoted; and the P0-12 clock string is *rendered output*, not a source literal, so it cannot be found-and-replaced.
- **NOT IN DOC (nothing to verify):** 864 (32 × 27) — the batch asked me to sweep it, but the current document never states it.
- **Not checked:** I did not run the product in a browser; I did not re-verify the season stage beyond the two `32*26` gates; I did not sweep the NBA side or the record-cap *text* in the Guide (only the constant). No product file, protected constant, or other lane was edited.
