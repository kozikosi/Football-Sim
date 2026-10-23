SPEAKER: GLM | ROLE: Scribe · GLM lane | TASK: durability check of the Owner's stored directives (the three prompts relayed 22 Oct) — what both stores already hold, and the three rows missing from both | DATE: 2026-10-22T00:52Z

**Pins (measured, each with its tool and time):*
- `V22-Suggestions.md` — sha256 `50d95b588f983208…`, 2,354 lines, measured `shasum -a 256` 2026-10-22T00:36Z. Churned twice more this hour before that measurement +62 lines; heading names below are authoritative, line refs are hints.
- `NFL Draft Simulator merged.html` — sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`, 656,746 B, measured 2026-10-22T00:36Z. Claude's AGENTS.md rewrite did NOT touch the product; my earlier FB/P + P0-20 line anchors still measure true (ROSTER_SLOTS 924, TOTAL_ROUNDS 925, NATURAL_SLOT_MAP 931, FLEX 940, the two `32*26` gates 849/866 — `grep -n` receipt 00:36Z).
- `AGENTS.md` — NOT pinned; it took three consecutive edits this evening (two-modes → coordination manual → hash-pin warning + STATUS.md target). Claude's file, Claude's churn.
- `_agents/moc/notes/V22-WORK-ORDER.md` — 80 lines, committed as HEAD `59fecf6e` ("MOC: the V22 work order — every Owner directive, ordered, with status and authority"). Read freely (MOC's lane is read-only to me).

## 1 · What the three prompts are

(A) and (B) are the Owner's council-architecture audits, addressed to Claude, with AGENTS.md authority — Claude implemented them; the file's new coordination manual, date-stamped banner ids, hash-pin warnings, lane-commit discipline and suggestions-not-assignments queue are the visible outcome. Not my slice; receipts verified where checkable.

(C) is "Other tasks to save to the v22workorder": the Owner's verbatim directives (flex numbers, 3-4, philosophy unlock, preseason-menu copy, Stars rules, the preview and review rows, the season-review/100-season rows, motion/graphics, the champions-gold banner, button placement, realism-audit removal…), closing with **"Store all these changes but don't work on them yet. Do the following first:" — the paste ends there; the continuation never reached me.**

## 2 · Durability check — the dump vs BOTH stores

One durable store exists: MOC's work order (the Owner's "V22workorder" reference — located; my first find missed it because the glob lacked the hyphen). The Suggestions doc mirrors the same material in longer form. Row-by-row: everything in the dump maps to an existing canonical home — flex numbers (P0-17 / MOC P0-A / the P10-1 diff superset), 3-4 + OLB≡WILL/ILB≡MIKE + nickel rule (P0-16 + P0-17 tail + P0-26 + P0-B), philosophy unlock + description (P0-15/P0-25/P0-C, with the known copy conflict), "Third corner"→"CB3 / Nickel" (P0-17 + P0-D), RB-fallback + Auto-paragraph removals + "the model tries" + field-goal/balanced/aggressive strings + dropdown size (MOC P1 + P0-25, exact before→after), Stars rules incl. ≥60 yds/90+-slots/glittering/internal rating (P0-18 + MOC P3), every preview and review row (P0-18 fixes 1–9 + MOC P1, incl. blocked-XP glitch, turnovers score-summary, own paragraph, dropdown-hidden, game-ball ∈ Key Players), season-review/100-season/playoff rows (P0-19 + MOC P2 + P10-12..24 [NEW] — banner 3 s + land/shimmer, conference charts, bracket, awards gold, draft-critique removal, click-only "What separated", "x Sacked" pattern, Advanced-Stats rename/condense/click-gate, more advanced stats that say why you did well or poorly, summary graphical rows, closing-line, Why-better-or-worse, bye preview, Lineup-not-top, playoff-preview excitement, champions exclamation, button blue near top, win-total alignment, players-average + Award patterns higher, realism audit removed-but-stored), and MORE motion/graphics + the FINAL champions banner gold-theme-and-shimmer (P10-16/17 [NEW]; "gold theme" hits at the J-section and 1831/1997). VERIFIED by grep against both stores at the pins above.

**Held open, already filed by me:** the philosophy-copy contradiction (P10-MERGE §2-2), the "59 Sacked"/"59x Sacked" slip (§2-4), the "2-Pt Conversion" literal (§2-3), and the flex two-readings scoping request (§2-1) — MOC's work order's P4 also carries the two-readings item, so the Owner line lands either way.

## 3 · The three rows missing from BOTH stores — captured verbatim, house form, unnumbered (one numbering is the compiler's)

> **The "Selected:" composite plan line — UI only**
> WHERE: the plan-selected summary line on the draft/preseason pages ("Selected: Balanced offense with two tight ends (12 personnel, balanced) · Nickel defense focused on the pass (Nickel · pass-defense)").
> WHAT: redesign as two labelled containers (offense · defense; chips or boxes), the text unchanged inside.
> WHY: Owner verbatim: "Just improve the ui of this. It's ugly as is."
> SAFE ALONE?: YES (presentation; no numbers).
> HOW TO CHECK: renders on both pages; 390 px probe clean.

> **Your strongest units / your weakest units — side by side or indented**
> WHERE: the Auto/setup explainer block, immediately after "The model tries…" paragraph.
> WHAT: "Your strongest units…" and "The weakest…" get real indentation — or render as two columns side by side where width allows (stack at 390 px).
> WHY: Owner verbatim: "Create some indentation or something for Your Strongest Units and Your weakest units. Maybe these can appear side by side if it makes sense?"
> SAFE ALONE?: YES.
> HOW TO CHECK: both widths; no overlap/clipping at 390 px.

> **The top-3 setups become three cards**
> WHERE: same block, below the two units rows.
> WHAT: the top three (+0.01 / +0.00 / +0.14 example values) each in their own distinct, beautiful area — not one sentence.
> WHY: Owner verbatim: "The top 3 should also appear in 3 distinct beautiful ui designed areas, not as one sentence."
> SAFE ALONE?: YES — but lands with the two rows above (same block), and the values must come straight from the model (no padding invented).
> HOW TO CHECK: three cards visible with the identical values the current sentence prints.

## 4 · Locations and ownership decisions for the compiler

- The durable store = `_agents/moc/notes/V22-WORK-ORDER.md` (MOC's lane). The three rows above are missing from it AND from the Suggestions doc — the compile step (Claude → DS applies → MOC arbitrates) lifts them into the P2 graphical section wherever the compiler assigns home. I do not edit MOC's lane or the shared work order; this note is the store until then.
- MOC's tooling table answers for HIS seat (biome YES via `~/.local/bin/biome` + node_modules, mermaid YES via GitHub rendering, **figma NO — "no Figma tool in my tool set (the OpenCha…")**. The Owner's Figma retry is per-seat; Claude's answer to the Owner stands alone as the only Figma-capable check. My P10-MERGE's Figma hand-off entry (palette + state list + the two frame asks) is the right hand-off shape for that imbalance.
- `tests/funcdiff.js` is NAMED in AGENTS.md's Verification Requirements but does not exist (ls receipt 00:36Z); the working prototype lives at `_agents/glm/tests/funcdiff.js` (built + verified earlier). Either it gets recreated at the named path or AGENTS.md loses the name — Claude's call; flagged in the bulletin.

## 5 · The cut-off instruction

The Owner's paste ends at "Do the following first:" — the remainder is UNKNOWN to every seat I can see. Until it arrives: hold all of part-the-dump as stored-not-worked (the Owner's own instruction) and do not let anyone "start" it by accidental pickup. The bulletin carries this flag.

## Not checked

1. Claude's final audit report texts from prompts (A)/(B) — his deliverable, not relayed to me.
2. P10-16's body verbatim for the gold/shimmer strings (heading + grep hits only).
3. Whether any seat's briefing already lifted the three rows into a SUBMISSIONS.md section — grep of SUBMISSIONS.md not run this turn (the store check above covers the two canonical stores; SUBMISSIONS is proposal-layer, compiler reads both anyway).
