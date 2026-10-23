# V22 number reconciliation — every stale number and hash, line by line

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: DS's assignment (routed to my lane) | DATE: 2026-10-21T20:40:00Z**

**Build under test:** `NFL Draft Simulator merged.html`, sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`, **656,746 B** — the **working-tree** file; **no commit carries that hash** (every branch tip holds `40233d6be00e987c…`, 657,486 B). Scratch copies: `merged.html` `e1ac8184a601cc8b…` (656,750 B), `merged_v22.html` `4178a69b3e3a60a5…` (656,727 B). **A V20 build is never described as V21.**

**Measured in the current build (CDP, the live page):** `PLAYERS.length` = **1,200** · `ROSTER_SLOTS.length` = **26** (neither `FB` nor `P` is a draft slot: `indexOf` = −1 for both) · `Object.keys(FLEX).length` = **19** · board in the default filter after a draft starts: **1,125 rows, 9,000 fit cells, 5,625 score cells**.

---

## 1 · Every "832" — and the three that are not pick totals

| line | what it is | action |
|---|---|---|
| **378, 422, 450** | `(v20:4832)` — a **line reference into the v20 build** where "expected scoring" sits. "832" here is a *substring* of 4832, not a pick count. | **KEEP all three.** Changing them would break the v20 references. Flag them in the document's own note so a reader does not read them as pick totals. |
| **507** | the verifier sign-off receipt: *"gate exit 0 (negative control v20 exit 1): 832 picks, 272 games, 0 console/page errors…"* — a **historical measurement of a run against the 26-round build**. | **KEEP 832**, and anchor it: name the build it measured (`40233d6b…` or whichever the receipt names) and the date. It is a record of what was run, not a statement about the current build. |
| **1168, 1187** | the Owner's quoted UI string *"You're on the clock — Round 2 of 26, Pick 14 (overall 46 of 832)"* — the **target** is a bigger font on that line. | **REPLACE in the target form** with *"Round 2 of 28, Pick 14 (overall 46 of 896)"*, and keep today's string only as a struck-through quotation of the current screen. The "26"/"832" in it are consequences of the 28-round ruling, not of the font. |

**"896" appears 0 times** — the document never states the new total, and it should (§4). **"28 rounds" appears once, at l.388**, and is correct there.

## 2 · "1,148" and "1,188" — neither is a build constant, and that is the real finding

| line | what it is | action |
|---|---|---|
| **113** | my own evidence note: *"MOC verified: headers 10→9, cells 1,148→0, console 0, node --check PASS"* — the count of **"Value here" cells in the pre-change build**, i.e. the evidence for item 1 of the V22 change set. | **KEEP 1,148** — it describes the build *as it was*, which is exactly what a verification note must do. Add the build hash it was measured on. |
| **507** | the same gate receipt: *"…832 picks, 272 games, 0 console/page errors, 0 viewport offenders. Corrections: 37"* with **1,188 draftable**. | **KEEP 1,188** and anchor it to the build and the filter state it was measured in. |

**The finding that matters more than the swap: neither number is a property of the build.** The board's row count depends on the **filter state** — measured now in the current build: **1,125 rows** in the default filter, 9,000 fit cells, 5,625 score cells; my earlier run on the pre-change build measured 1,148 "Value here" cells in *that* build's filter state. So "1,148" and "1,188" are **counts under a filter, of one column, on a particular build** — three variables at once. **Swapping one for the other would make the document no more true.** The fix is to replace both with **deterministic** measures the build can be asked for, and to keep the historical counts only inside the receipts, where a date and a hash already sit beside them:

| what to write instead | where it comes from | value now |
|---|---|---|
| players in the pool | `PLAYERS.length` | **1,200** |
| draft slots per team | `ROSTER_SLOTS.length` | **26** → **28** after the FB/P ruling |
| total picks | rounds × 32 | **832** → **896** |
| players per pick | pool ÷ picks | 1,200 ÷ 896 = **1.34** (was 1,200 ÷ 832 = 1.44) |
| flex rules (rows) | `Object.keys(FLEX).length` | **19** |

**So: no line changes 1,148 → 1,188.** Both lines keep their number; what they need is the build hash and the filter state, and the document needs the deterministic table above so a reader has something that does not move with a filter.

## 3 · Every "40233d6b" — prose, not a pin

| line | what it is | action |
|---|---|---|
| **10, 2081** | my own notes: *"every branch tip holds `40233d6b…`"* — the reason the pin is not fetchable. | **KEEP.** They are the evidence for the pin question. |
| **2192** | MiniMax's cold-read note: *"`40233d6b…` (657,486 B) — 740 bytes different"*. | **KEEP.** |
| (a fourth occurrence sits inside the same paragraph) | — | **KEEP.** |

**No line pins `40233d6b` as the build under test.** The pin is `044d1759…` at lines **10, 19, 73, 506, 2081, 2188, 2190** — seven occurrences, all consistent, all naming the working-tree file. The pin's **replacement is the Owner's decision**: either the committed `40233d6b…` (657,486 B) becomes the build and the seven lines change, or the working-tree file is committed and the pin stays. **The document must not be changed to either until the Owner rules** — but it must say, at the pin, that the pinned file is not fetchable, which it now does.

## 4 · The other numbers that move because of the Owner's rulings

1. **The pick total: 832 → 896** (28 rounds × 32). It appears in the on-the-clock string (l.1168, l.1187) and is **absent** as a stated total — add it once, near the draft-board description, as "28 rounds, 896 picks".
2. **The rounds in the same string: 26 → 28.**
3. **The draft slots: 26 → 28** (FB and P added). The build does **not** have them yet (`indexOf('FB')` = −1, `indexOf('P')` = −1), so this is a change to make, not a number to re-word.
4. **The players-per-pick ratio** — 1.44 → **1.34** (1,200 players over 896 picks).
5. **The flex matrix's cell count does not change.** `FLEX` has **19 keys** in the current build; FB and P are specialists with **no flex cost** (the Owner's ruling, the same precedent as SAM), so they add **no matrix cells** — but they do add two **open spots** per team, which is what moves the draft length. Any "the flex chart has N cells" line stays at N, with the reason stated.
6. **FB and P need consumers in `teamRatings`** (the nine unit ratings) — already open at l.388, and it is the *reason* the flex matrix is unchanged while the picks total moves.
7. **The 272 games** in the receipt (l.507) is a **season** figure and does not move with the draft length. **The 37 corrections** are a count of fixes applied to that run — keep.

## 5 · The one gate that catches this class of error for good

**A document⟷build linter.** A script (no new package; node core only) that reads `V22-Suggestions.md`, extracts every **number-with-a-unit** claim, and asserts each against the build it names — failing with the **document line number**:

| claim pattern | asserted against the build | rule |
|---|---|---|
| `sha256 \`[0-9a-f]{64}\`` | the named file's own `shasum -a 256` | the hash must match the file it names, **and** the file must be either committed or explicitly labelled a working-tree file |
| `NNN,NNN B` (a size) | the named file's own size | a size next to a hash must agree with it |
| `NNN picks` / `NNN rounds` | `ROSTER_SLOTS.length × 32` (rounds) and the build's own draft length | the document may not state a total the build contradicts |
| `NNN players` / `pool` | `PLAYERS.length` | — |
| `the flex chart has N cells` / `N flex rules` | `Object.keys(FLEX).length` and the pairs actually in the map | — |
| `NNN draftable` / `NNN cells` | **may not be asserted** — a filter-dependent count | the linter requires such a number to name its **build and its filter state**, or it is a failure |

**And the one-line rule for the document itself:** *a number that depends on a filter or on a moment in time is not a build fact — it belongs in a receipt, with its date and hash, and never in the instruction lines.* That single sentence removes the whole class: 1,148, 1,188, 1,125 and 832-in-a-receipt all become receipts, and the instruction lines carry only the deterministic numbers (1,200 · 26→28 slots · 896 picks · 19 flex rules).

**What I did not check:** the receipt at l.507 — which build and filter state it measured — because the receipt's own text does not say; **DS should read the receipt file** (`_agents/moc/evidence/e2e-2026-10-20T225702Z/`) and anchor it. I did not re-measure the board under the filter state that produced 1,148 (the build it was measured on, `40233d6b…`, is not in the tree any more), so **1,148 is a figure I can only vouch for by its receipt, not by re-measurement** — it should stay labelled as such.
