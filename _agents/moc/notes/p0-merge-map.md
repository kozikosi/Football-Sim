# P0 · The merge map — one file to merge, four hunks of colour work, 52 lines

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: P0 · "take what is already built" — the merge map for the two candidates | DATE: 2026-10-22T12:20:00Z**

**Why this note exists.** The idle brief says *"take what is already built … do not rebuild them"* and *"Diff, don't rebuild."* Nobody had published the **diff**: what each candidate contains, how much they overlap, and what the Architect actually has to apply to produce V22. **Here it is, measured.**

**The three files, and their hashes.**

| file | sha256 | bytes | role |
|---|---|---|---|
| `Football-Sim-V21.html` | `044d1759e01a…` | 656,746 | the release baseline — the Architect's merge base |
| `_agents/minimax/prototypes/V22-candidate-2026-10-21.html` | `e5fa7e0e8913…` | 660,046 | **candidate A** — the Owner's first three briefs applied |
| `_agents/minimax/prototypes/V22-candidate-teamcolours.html` | `e2b0ea855358…` (committed) / working tree `ef25b892…` | 662,436 | **candidate C** — A + the team-colour frame |

## 1 · The headline: C is a strict superset of A — merge C, not A

```
$ diff -u Football-Sim-V21.html A   →  185 hunks
$ diff -u Football-Sim-V21.html C   →  186 hunks
$ diff -u A C                        →  4 hunks,  +47 lines,  −5 lines
```

**All 185 of A's hunks are inside C.** C is A plus **exactly four changes**. So:

- **the candidates do not conflict with each other** — there is no merge to reconcile between them;
- **the Architect does not need both** — merging A and then C's four hunks is the same artifact as merging C;
- and the whole colour system, as built, is **47 added lines and 5 changed lines.** It is not a rewrite. It is a **patch**.

## 2 · The four hunks, in full — this is the whole colour work

**Hunk 1 — the palette (A l.1 → C l.1, +35/−1).** The 32 per-team CSS rules are emitted at the top of the stylesheet, one per team, plus a comment line and one change to the `:root` line (the `--team1/2/3` defaults):

```css
/* each team can carry its own colours */
[data-team="Arizona Cardinals"]{--t1:#97233F;--t2:#FFFFFF;--t3:#000000;}
[data-team="Atlanta Falcons"]{--t1:#A71930;--t2:#FFFFFF;--t3:#000000;}
… 30 more …
```

**Hunk 2 — the consumption rule (A l.45 → C l.79, +8/−0).** The one rule that reads `--t1`, and it is aimed at the **standings**:

```css
.user-row[data-team] {
  border-left: 3px solid var(--t1);
  background: color-mix(in srgb, var(--t1) 7%, transparent);
  color: var(--t1);
}
```
…plus three more lines (the `.conf-AFC` / `.conf-NFC` conference headings and the team chip).

**Hunk 3 — the board rows get their team (A l.1774 → C l.1816, +1/−1).**

```js
- h += `<tr><td class="dc-name">${topTag(r)}${r.p[0]}</td>…
+ h += `<tr data-team="${r.p[2]}"><td class="dc-name">${topTag(r)}${r.p[0]}</td>…
```

**Hunk 4 — the standings rows and the conference headings (A l.3826 → C l.3868, +2/−2).**

```js
- html += `<div><h3 style="margin:0 0 8px;">${conf}</h3>`;
+ html += `<div><h3 class="conf-${conf}" style="margin:0 0 8px;">${conf}</h3>`;
- …`<tr class="${r.team===user?'user-row':''}">…
+ …`<tr class="${r.team===user?'user-row':''}" data-team="${r.team}">…
```

## 3 · What this says about the board (S2) — and it corrects a claim

**Hunk 3 puts `data-team` on every draft-board row, and hunk 2's rule consumes `--t1` on `.user-row[data-team]` — the *standings* row, not the board row.** So the board's rows now **carry** their team's colour and **nothing reads it there**: the board's `.dc-name` edge is still the generic `--accent`.

That is exactly what I measured in M-20261022-j (`var(--t1` → 0 in the committed blob `e2b0ea85`; the desktop edge rule gone), and this diff says **why**: **the colour work wired the standings and the conference headings, and left the board's edge unwired.** The data half of S2 is done; the consumption half is one rule away.

**So the merge map has one open line in it:** add the board's edge rule next to the standings' one, reading the same variables:

```css
#draftTable2 tbody tr td.dc-name{box-shadow:inset 3px 0 0 var(--t1, var(--team1));padding-left:8px;}
```

(plus the mobile rule at C l.297, `border-left:4px solid var(--t1, var(--team1))` — see M-20261022-j for the browser proof that the cascade needs no JS).

## 4 · The merge, stated as the Architect would want it

1. **Start from `Football-Sim-V21.html`** (`044d1759…`) — the merge base, unchanged.
2. **Apply candidate C wholesale** (or A + the four hunks above; they are identical artifacts).
3. **Add the board's edge rule** (one line, §3) and, if wanted, the `teamTag()` lookup fix (M-20261022-f) and the `.opp-panel` / `.gamestar` call sites (M-20261022-f) — **all three are inside the files C already touches, so they are all in the same merge.**
4. **Re-gate the merged file and quote its hash.** The colour work's own receipt (`e2b0ea855358`, gate PASS) covers the *candidate*, not the merged V22.

**One caveat, and it matters: the candidate's working tree is ahead of its committed blob** (`ef25b892…` vs `e2b0ea85…`) — MiniMax was still editing it while I measured. **The four hunks above are measured against the working tree.** Take the working-tree version once it is committed and re-gate it; the committed blob does not contain hunk 2's consumption rule.

## 5 · What I did not check

- **I did not review the 185 hunks of A individually** — they are the Owner's first three briefs, applied by MiniMax and gate-verified; this note is about the **merge shape**, not the content of each brief.
- **I did not verify A's 185 hunks against the work order's P0 items** — that is a copy-compliance check, not a merge check, and it is still open.
- **I did not apply anything.** The product file is the Architect's; I produced no patch file, only this map.
- **I did not re-gate the working-tree candidate** — it was being written while I measured; the receipt quoted for it is the *committed* blob's.
- **I did not diff the candidates against the working file** — because the working file is byte-identical to the baseline (`044d1759…`), so that diff would be the same diff.

**Commands (pasteable):**

```
diff -u Football-Sim-V21.html _agents/minimax/prototypes/V22-candidate-2026-10-21.html | grep -c '^@@'   # 185
diff -u _agents/minimax/prototypes/V22-candidate-2026-10-21.html _agents/minimax/prototypes/V22-candidate-teamcolours.html | grep -c '^@@'  # 4
```
