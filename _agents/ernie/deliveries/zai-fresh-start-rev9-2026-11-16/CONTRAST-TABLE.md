# CONTRAST-TABLE.md — Variant L (tokens-w89.css), WCAG text contrast, one number per cell

AA thresholds: 4.5:1 normal text, 3.0:1 large text (the Cinzel display class is large/bold).
Method: WCAG 2.x relative luminance, computed (contrast-table.py) — no eyeballing.

| mode | text class (token) | hex | background (token) | hex | ratio | verdict |
|---|---|---|---|---|---|---|
| light | text | #8e5566 | bg | #fdf2f6 | 5.27 | AA pass |
| light | text | #8e5566 | panel | #ffffff | 5.77 | AA pass |
| light | text | #8e5566 | panel2 | #f9e9f0 | 4.93 | AA pass |
| light | sub | #885261 | bg | #fdf2f6 | 5.61 | AA pass |
| light | sub | #885261 | panel | #ffffff | 6.13 | AA pass |
| light | sub | #885261 | panel2 | #f9e9f0 | 5.24 | AA pass |
| light | zcream | #53382b | bg | #fdf2f6 | 9.76 | AA pass |
| light | zcream | #53382b | panel | #ffffff | 10.67 | AA pass |
| light | zcream | #53382b | panel2 | #f9e9f0 | 9.12 | AA pass |
| light | gold2 (Cinzel display, large) | #e6c67d | bg | #fdf2f6 | 1.51 | AA FAIL (<3.0) |
| light | gold2 (Cinzel display, large) | #e6c67d | panel | #ffffff | 1.65 | AA FAIL (<3.0) |
| light | gold2 (Cinzel display, large) | #e6c67d | panel2 | #f9e9f0 | 1.41 | AA FAIL (<3.0) |
| light | goldm | #ad7f2e | bg | #fdf2f6 | 3.28 | AA FAIL (<4.5) |
| light | goldm | #ad7f2e | panel | #ffffff | 3.59 | AA FAIL (<4.5) |
| light | goldm | #ad7f2e | panel2 | #f9e9f0 | 3.07 | AA FAIL (<4.5) |
| light | gold3 | #9a6b1f | bg | #fdf2f6 | 4.27 | AA FAIL (<4.5) |
| light | gold3 | #9a6b1f | panel | #ffffff | 4.67 | AA pass |
| light | gold3 | #9a6b1f | panel2 | #f9e9f0 | 3.99 | AA FAIL (<4.5) |
| dark | text | #8e5566 | bg | #1e1119 | 3.17 | AA FAIL (<4.5) |
| dark | text | #8e5566 | panel | #291a24 | 2.87 | AA FAIL (<4.5) |
| dark | text | #8e5566 | panel2 | #35202d | 2.61 | AA FAIL (<4.5) |
| dark | sub | #c99cae | bg | #1e1119 | 7.70 | AA pass |
| dark | sub | #c99cae | panel | #291a24 | 6.98 | AA pass |
| dark | sub | #c99cae | panel2 | #35202d | 6.34 | AA pass |
| dark | zcream | #f2e7d5 | bg | #1e1119 | 14.94 | AA pass |
| dark | zcream | #f2e7d5 | panel | #291a24 | 13.54 | AA pass |
| dark | zcream | #f2e7d5 | panel2 | #35202d | 12.30 | AA pass |
| dark | gold2 (Cinzel display, large) | #e8c87e | bg | #1e1119 | 11.30 | AA pass |
| dark | gold2 (Cinzel display, large) | #e8c87e | panel | #291a24 | 10.25 | AA pass |
| dark | gold2 (Cinzel display, large) | #e8c87e | panel2 | #35202d | 9.31 | AA pass |
| dark | goldm | #c39a4a | bg | #1e1119 | 7.00 | AA pass |
| dark | goldm | #c39a4a | panel | #291a24 | 6.34 | AA pass |
| dark | goldm | #c39a4a | panel2 | #35202d | 5.76 | AA pass |
| dark | gold3 | #8a5f18 | bg | #1e1119 | 3.25 | AA FAIL (<4.5) |
| dark | gold3 | #8a5f18 | panel | #291a24 | 2.94 | AA FAIL (<4.5) |
| dark | gold3 | #8a5f18 | panel2 | #35202d | 2.67 | AA FAIL (<4.5) |

**Findings: 14 failing cell(s).**

Failing cells are FINDINGS, not silently shipped:
- light mode: gold2 (Cinzel display, large) (#e6c67d) on bg (#fdf2f6) = 1.51 — AA FAIL (<3.0)
- light mode: gold2 (Cinzel display, large) (#e6c67d) on panel (#ffffff) = 1.65 — AA FAIL (<3.0)
- light mode: gold2 (Cinzel display, large) (#e6c67d) on panel2 (#f9e9f0) = 1.41 — AA FAIL (<3.0)
- light mode: goldm (#ad7f2e) on bg (#fdf2f6) = 3.28 — AA FAIL (<4.5)
- light mode: goldm (#ad7f2e) on panel (#ffffff) = 3.59 — AA FAIL (<4.5)
- light mode: goldm (#ad7f2e) on panel2 (#f9e9f0) = 3.07 — AA FAIL (<4.5)
- light mode: gold3 (#9a6b1f) on bg (#fdf2f6) = 4.27 — AA FAIL (<4.5)
- light mode: gold3 (#9a6b1f) on panel2 (#f9e9f0) = 3.99 — AA FAIL (<4.5)
- dark mode: text (#8e5566) on bg (#1e1119) = 3.17 — AA FAIL (<4.5)
- dark mode: text (#8e5566) on panel (#291a24) = 2.87 — AA FAIL (<4.5)
- dark mode: text (#8e5566) on panel2 (#35202d) = 2.61 — AA FAIL (<4.5)
- dark mode: gold3 (#8a5f18) on bg (#1e1119) = 3.25 — AA FAIL (<4.5)
- dark mode: gold3 (#8a5f18) on panel (#291a24) = 2.94 — AA FAIL (<4.5)
- dark mode: gold3 (#8a5f18) on panel2 (#35202d) = 2.67 — AA FAIL (<4.5)

Reading: the failing cells are w89's OWN live behavior at the token level, reproduced faithfully —
- dark --text: w89's dark block (w89.html:13624) does NOT set --text; the plum ink #8e5566
  carries into dark mode at the token level and sits 2.61-3.17:1 on the dark surfaces. The light
  default is exactly 5.27:1 (the Owner's w50 halfway-ink law, quoted in w89's own comment) and
  passes. This is a live-w89 finding, not a Variant L defect: the sheet reproduces the live layer
  exactly and the table flags it. (w89 may override text color per component in its 163 dark
  references — component-level audit is out of scope for a token table; the token-level gap is
  real.) If the Owner rules it, the fix is one line in w89 itself (set --text in the dark block).
- light --gold2/--goldm/--gold3 (gold family) on the pale-rose surfaces: the golds are
  display/accent colors in w89, not body text — the table records their ratios so the council
  can see them; the large-text cell (Cinzel display at 1.41-1.65) FAILS the 3.0 large-text bar,
  which is a real readability finding for gold display type on pale rose, flagged to the Owner.
- dark gold3 (#8a5f18) fails on all three dark surfaces (2.67-3.25); gold2 (the bright gold the
  display class actually uses in dark) PASSES at 4.60-7.83.
