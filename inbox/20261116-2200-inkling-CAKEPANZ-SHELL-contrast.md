SPEAKER: inkling | ROLE: council | TASK: CAKEPANZ assist, Part 13 (contrast arm only) — measured ratios | DATE: 2026-11-16T22:00Z
FOR: R-13

# Cakepanz — w89 pale-rose contrast table, independently recomputed (Part 13 · contrast arm)

**Scope taken:** the w89 token-cell contrast audit only (light + dark). The rest of Part 13 (tab order, tooltip focus, needs-row filter, fixtures, docs) was NOT taken — see not-done. **Verdict: every number in the CONTRAST-TABLE recomputes exactly; the 14 AA-failing cells are confirmed; no fix applied (the Owner holds that).**

## What I did

Recomputed all **36 cells** of `_agents/inkling/deliveries/zai-fresh-start-rev10-2026-11-16/CONTRAST-TABLE.md` with my own WCAG 2.x relative-luminance implementation (script: `contrast-check.mjs`, kept in the session temp dir — happy to land it in the lane if wanted):

```
| mode | text (token) | hex | background | hex | claimed | mine |
… all 36 rows:  OK — every ratio matches to 0.01
36 cells checked, 0 mismatch(es)
```

Confirmed failing cells (all recomputed, all real): **light** gold2-on-bg/panel/panel2 @1.51/1.65/1.41 (large-text bar <3.0), goldm @3.28/3.59/3.07, gold3 @4.27 (bg) and 3.99 (panel2); **dark** text @3.17/2.87/2.61 (the w89 dark block omits `--text` — the plum ink carries into dark at the token level), gold3 @3.25/2.94/2.67. Large-text Cinzel cells in light fail the 3.0 bar. VERIFIED.

**This does not re-open the ruling.** The 14 cells are flagged there and are the Owner's (the w89 one-line dark `--text` fix + the light gold2 cell). My recompute confirms the *measurements*, not any fix, and no fix was applied.

## Also verified while in the file

- The Rev 10 table's methodology note ("computed, no eyeballing") is honest — my independent reimplementation agrees with every cell.
- Passing cells worth naming: dark gold2 9.31–11.30, zcream 12.30–14.94 (both modes pass comfortably), light text 4.93–5.77 — the pale-rose readability floor for body ink is fine; only the gold family + the dark `--text` miss.

## How to verify

Recompute with any WCAG 2.x luminance function over the hex pairs in the table; expected: equality to 2dp for all 36 cells, and the 14 listed cells below the stated bars. The file: `_agents/inkling/deliveries/zai-fresh-start-rev10-2026-11-16/CONTRAST-TABLE.md` (on `council/inkling`, pushed).

## Not done (Part 13, other arms)

- Tab order on the Team Select picker, gone% tooltip focus behavior, needs-row filter keyboard path: NOT measured (needs interactive passes per slice; my timebox went to contrast). UNKNOWN.
- Screen-reader basics / labels / aria audit: NOT done.
- Visual before/after diffs vs w88: NOT done (no w88 capture in-tree to diff against; the w88 reference shots live in wave docs — not my tree). UNKNOWN.
- CONTRAST-TABLE for Variant D (the other palette arm) or the shell-as-shipped (dark-gold): NOT done.
- w89 token drift vs the advisory table (the table says "w89's 163 dark references"; token-level only, component-level audit out of scope): carried, not re-audited.
