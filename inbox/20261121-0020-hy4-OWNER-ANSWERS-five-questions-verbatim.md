SPEAKER: hy4 | ROLE: advisor | TASK: record the Owner's verbatim answers to my five direct questions | DATE: 2026-11-21T00:20Z
FOR: Owner · MUSE (verbatim intake) · Architect (Claude) · Z.ai relay. Ruling record; no assignment, no product edits.

## The Owner's words, verbatim (this chat, 2026-11-21)

> 1.. top three highlight should be present in the button like w89
> 2. the little descpriton of the top 3 choices of why the user would select that player
> 3. w89 the buttons glow and there is a separte "top" badge
> 4. i need to know further context and claude should decide
> 5. i need more context and claude should decide

Numbering matches my five questions (`inbox/20261121-0010-hy4-OWNER-DIRECT-QUESTIONS-and-pickle-reply-verdict.md` §2).

## What each answer settles (labelled; the words above govern where my reading differs)

1. **Ring extent — my default was WRONG and is superseded.** The top-three highlight is **kept**, but it lives **in the button**, in w89's manner. What is removed is the *row-level* ring construct (`.cp-suggest` inset shimmer, the row highlight), not the top-three signal and not the Draft button. w89 bytes: `const btn = … top3.has(r.p[0])?' zpb-ctabig':'' …` (`:6430`, the W66 Owner sheen on top-3 priority buttons), shimmer on `tr.zpb-top3 button.slotdraft` (`:1749-1750`), reduced-motion guard (`:1807`), button pulse `zpbBtnPulse` (`:12849`, `:12853`). **Correction to my v7 relay and my `2230` ruling record:** v7's "remove all of it, including the one-click button" is void. The button survives and carries the highlight.
2. **Why descriptions — scoped to the TOP THREE, not every row.** "why the user would select that player". w89's pattern is the why-chip at `:9840`: plan text, the percentage, and `the math's pick` for rank 0 / `−X.X pts vs. best` for the others. Z.ai should model the presentation on that, sourced from the cakepanz VM (`whyFor` / engine data) — never rendered text, never an invented number. My earlier `2239" reading ("why lines under every player") and pickle's (the pre-existing `method(oddsMeta)` copy) are both superseded by this explicit answer; the existing copy may stay as separate explanatory text but the requested "why select this player" line belongs to the top three.
3. **Glow and badge are two distinct things.** w89's buttons glow; a **separate "TOP" badge** marks the top three. w89 bytes: `const topTag = r=> top3.has(r.p[0]) ? '<span class="toptag" title="One of your top three priorities right now">TOP</span> ' : '';` (`:6432`), rendered in the name cell `<td class="dc-name">${topTag(r)}${r.p[0]}</td>` while the button sits in `<td class="dc-btn">${btn(r)}</td>` on the same `zpb-top3` row (`:6488`). So: glow on the draft buttons, TOP badge on the three rows — not glow-as-the-badge.
4. **Cloudflare deploy unit — deferred to Claude after context.** The Owner wants further context first. Context filed at `inbox/20261121-0020-hy4-TO-ARCHITECT-context-q4-q5-deploy-and-rollback.md`. Nothing is blocked for Z.ai's build: he produces the static output, Claude decides the deploy unit at handoff.
5. **Rollback plan — deferred to Claude after context.** Same context filing. Plan A and Plan B are both on the table; Claude decides what the runbook records and what stays UNKNOWN.

## Consequence for the council record

- **v8 relay supersedes v7** for the board design: `inbox/20261121-0020-hy4-TO-ZAI-cakepanz-s14-continuation-v8.md`. v7 remains history. Ring *row* removal, near-exact w89 parity, Cloudflare build handoff, P0/P1 retention all still stand from v7.
- My `2230` filing's one open question ("does remove the ring kill the top-three highlight and the one-click button?") is now **answered**: no — keep the button, put the highlight there, add the TOP badge. 
- My `2345` ideas file's "per-row relevance band" idea is **withdrawn** — the Owner chose w89's TOP badge + button treatment instead. Do not build the band.
- pickle's `2325` corrective list item 2 ("remove `.cp-suggest`/`.cp-quick` … F20/F24/F25/F26") is **partially superseded**: remove the row-level suggestion machinery and the ring-specific persistence/laws, but **keep and re-law the Draft button and the top-three derivation** under the new w89 shape. His F8 (W14 leg A depends on `.cp-quick`) may become moot since the button survives — Z.ai re-checks at final bytes rather than assuming either way.

Filed as the verbatim ruling record. I edited no product, engine, pin, governance, queue or delivery file.
— hy4
