# Open-queue items P1 and P2, and the evidence on the naming conflict

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: council open queue (22 Oct) — P1 and P2, plus the naming evidence | DATE: 2026-10-22T03:00:00Z**

**Build measured:** `NFL Draft Simulator merged.html`, sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`, 656,746 B. Read-only; nothing in the product was touched, and **no file was created or renamed** (the naming conflict is live — see §3).

---

## P1 · LEDG/REDG feed no left/right decision anywhere — **VERIFIED, with one asymmetry worth naming**

**Command:** `grep -c "LEDG\|REDG" "NFL Draft Simulator merged.html"` → **8**. All 8 are **data**, not rules: l.449 (`PLAYERS` position codes), l.455 (`GROUP_DEFS`), l.934 and l.944 (the two maps that could have branched).

**The two maps, side by side (VERIFIED by reading them):**

```
NATURAL_SLOT_MAP:  REDG:['DE1','DE2'],  LEDG:['DE1','DE2']      <- byte-identical
FLEX:               REDG:{DT:2,MIKE:4,WILL:2,SAM:2,TE:6,RB:6},
                    LEDG:{DT:2,MIKE:4,WILL:2,SAM:2,TE:6,RB:6}    <- byte-identical
```

**So no valuation, weight or flex decision branches on left-versus-right edge today** — the edge rusher's rules are the same from either side, and both edges map to the same two slots. The Owner's ruling is therefore **already satisfied for the edge**, and the change is a *label* change at most: the chart and any prose should not distinguish them.

**The one asymmetry I would still fix (INFERRED — a latent trap, not a live bug):** `FLEX` has a key **`LT` and no `RT`** (`LT -> {OG:0, C:0, DT:4}`), while `NATURAL_SLOT_MAP` has **both** `LT:['OT1','OT2']` and `RT:['OT1','OT2']`. The *values* are shared today, so both tackles behave identically — but the **rules are keyed on "left tackle"** while the slots are not. If anyone ever adds an `RT` entry, the two tackles will silently diverge. **Recommendation:** rename the flex key `LT` → `OT` (or add `RT` with the identical entry) so no rule can be left-or-right specific, and say so in the flex chart. This is a **naming/structure** change with **no numeric effect today** — VERIFIED that both tackles currently resolve through the same entry.

**Answer to the queue item: confirmed — LEDG/REDG feed no left/right decision; the only thing to change is the labels, plus closing the `LT`/`RT` key asymmetry so the property cannot regress.**

## P2 · Every visible "Value here" string, and every mathematical use of `r.v`

**Visible (5 sites — VERIFIED by `grep -n "Value here\|Value Here"`):**

| line | what it is | action |
|---|---|---|
| **426** | the board's column header `<th data-sort="value" …>Value here</th>` | remove the cell (the prepared patch does) |
| **1766** | the board row's `<td class="score dc-val" data-label="Value here">${wavg(r.v)}</td>` — the `data-label` is the **visible** word on the phone layout | remove the cell (the prepared patch does) |
| **4991** | the Guide bullet `<li><b>Value here</b> — the same math, but at the exact spot he would fill on <i>your</i> roster…` | **delete the bullet** — never reword it into a second "Priority" bullet |
| **4992** | the Guide's Priority bullet: `<li><b>Priority</b> — **Value here** minus the best you could expect to still find…` | reword to "the value at the spot he would fill on your roster, minus…" |
| **5056** | the Guide section title `Reading the draft board (Wins, Value here, Priority, Gone, stars)` | retitle (and, per the Owner's later ruling, drop the column list) |

**Mathematical (stays — VERIFIED, these read `r.v` in JavaScript, never the DOM):** the Priority computation (l.1639) · the best-natural comparison and the group best (l.1588) · the value sort key (l.1677) · the bar's width and its clamp (l.1690, l.1696, l.1726, l.1730) · the flex value tag and the "also fits" alternative (l.1713–1714, l.1763).

**Answer to the queue item: five visible strings, all removable; nine mathematical uses, all in code and all staying.** The prepared patch (`council-brief/2026-10-21/moc/value-here-keepsort.patch`) removes the two board sites and the two Guide sites and the title; a final sweep after it lands should confirm **zero** visible occurrences of the phrase anywhere — including the position cards and the recap text, which the sweep must check because neither is in the prepared patch's grep set.

## 3 · The naming conflict — evidence, and the one-line resolution

**The conflict as broadcast:** the Owner ruled hours ago that the build Claude is producing **is V22** and must not be called V21; and now that "the best version of the full html **now**" should be renamed `Football-Sim-V21.html`, with the next build called `Football-Sim-V22.html`.

**My reading (INFERRED, from the Owner's own sequence):** the two statements describe **two different artifacts** and are reconcilable —
- **today's state of the full app** (what the Owner is leaving behind) → frozen as **`Football-Sim-V21.html`**;
- **the build Claude produces from the working file** (all the V22 changes) → **`Football-Sim-V22.html`**.

**The mechanical hazard that decides *how* it is done (VERIFIED):** the working file **is** today's state *and* the input to the V22 build — it is the same file, uncommitted, whose hash moves as patches land. A **rename** would break every patch reference, the build pin, and the five prepared patches; the only safe freeze is a **copy**, which yields a stable hash for the V21 artifact while the working file continues toward V22.

**Recommendation to the Owner and the Architect, one line:** *have Claude write `Football-Sim-V21.html` as a frozen copy of the working file's current state (sha256 `044d1759…`, 656,746 B), and name the deliverable `Football-Sim-V22.html`.* Nothing else needs renaming, and the three scratch copies (`merged.html`, `merged_v22.html`, `merged-patched.html`) should be deleted or ignored, since they are the "mess of versions" the Owner is describing — they are untracked and have different bytes from the same name.

**I have not created or renamed anything** — the product file is Claude-only, the broadcast flagged the conflict, and a wrong create here would be a second version in the mess rather than a fix for it.
