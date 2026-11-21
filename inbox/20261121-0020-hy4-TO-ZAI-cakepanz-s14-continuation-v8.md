SPEAKER: hy4 | ROLE: advisor | TASK: relay text for the Owner to send Z.ai — S14 continuation v8 (board design settled) | DATE: 2026-11-21T00:20Z
FOR: Owner to relay to Z.ai. Self-contained work-order update; no assignment of a named seat, no product edits by me.

**STATUS: v8 supersedes v7 and every earlier draft for the board design. The Owner has answered the five open questions verbatim (`inbox/20261121-0020-hy4-OWNER-ANSWERS-five-questions-verbatim.md`). Do not build from v7's "remove all" board section.**

## 1 · What the Owner said (verbatim; governs)

> 1.. top three highlight should be present in the button like w89
> 2. the little descpriton of the top 3 choices of why the user would select that player
> 3. w89 the buttons glow and there is a separte "top" badge
> 4. i need to know further context and claude should decide
> 5. i need more context and claude should decide

## 2 · The board design, now settled

- **Ring: removed as a row construct.** Delete the `.cp-suggest` inset shimmer, the row-level highlight, `suggestIds[]` persistence and the ring's saved state. The row itself becomes flat again (and the "too boxy" restyle applies to panels generally).
- **Top three: KEPT, on the button.** The highlight lives in the Draft button, w89-style. Re-check w89 bytes before porting: `top3` sheen class `zpb-ctabig` on the button at `:6430` (W66 Owner note), shimmer on `tr.zpb-top3 button.slotdraft` at `:1749-1750`, reduced-motion guard at `:1807`, `zpbBtnPulse` at `:12849`/`:12853`. Top three are the first three array positions of the engine-sorted rows — array position, never rendered text.
- **A separate "TOP" badge.** w89 `const topTag = … '<span class="toptag" title="One of your top three priorities right now">TOP</span>'` at `:6432`, rendered in the name cell at `:6488` while the button sits in the button cell of the same top-3 row. Badge and glow are distinct: glow = button treatment, TOP = badge marking the three. The badge stays dynamic gold, never green (standing Owner style rule).
- **Why descriptions: top three only.** "why the user would select that player" — model the presentation on w89's `zpb-whychip` at `:9840` (plan text, percentage, `the math's pick` for rank 0, `−X.X pts vs. best` for the others). Source every value from the cakepanz VM (`whyFor`/engine data). **Never parse rendered text; never invent a number the VM does not carry** — where the VM lacks w89's delta/percentage, use the existing VM-derived `whyFor` copy and say so in the receipt rather than fabricating a value.
- **Glow on the buttons.** Port w89's button glow/pulse as a visual treatment on the existing Draft buttons (structure and reduced-motion guard verbatim from w89; `--glow` rides house tokens `color-mix(in srgb, var(--goldm) 28%, transparent)`, no new hex literal). Do not copy w89's remote Google Fonts link — offline is hard; Cinzel is already inlined in `tokens-w89.css:21-30,83-95`. Body copy stays system sans.

## 3 · Acceptance bar (unchanged from v7)

Near-exact w89 fidelity, not "directionally similar" — the Owner's 22:45Z ruling. Acceptance is a **filed side-by-side comparison** against live w89 at 390 and 1180, light and dark, plus named falsifiable laws for type parity, surface parity and the top-three/why-line behaviour. The mockup is direction only and explicitly not complete. Keep the engine fence exactly as-is: pin `408410477`, 69 files, `diff -rq` clean; no `src/engine/**`, `colors/`, ratings, pin or protected-constant edits.

## 4 · Behaviour and receipts that stand from S14 (keep, do not redo)

- P0 shareable-link/autosave fix + W14 (explicit `?seed=` wins over a different autosave; same-seed reload restores; corrupt-never-repair). Re-check the law at final bytes: because the Draft button survives, `batteries/visual.battery.mjs:292`'s `.cp-quick` selector may still work — do **not** assume pickle's F8 re-point is needed, measure it.
- The whole P1 receipt-accuracy set (`verify-package` SKIP dirs, `fresh-server.mjs`, planted-law printing, receipt paths, PARTIAL-composite honesty).
- Falsifier discipline: every mutant DIED by name, child logs filed. Replace ring-specific laws (L13/L16–L25, F20/F24/F25/F26) with named laws for the new design: TOP badge exactly on the three array-position rows; glow/pulse on those buttons with reduced-motion; why-lines on exactly those three with VM-sourced copy; no-law-derives-from-rendered-text. Re-falsify each; re-state battery counts **from the bytes** — never copy 19/0/18/0.
- Handoff sheets must carry the newly measured numbers: `CUTOVER-CHECKLIST.md:20/22`, `CUTOVER-ONE-PAGER.md:31/33`, `SLICE-STATUS.md:16/18/20`, `acceptance-run.sh:41/43`, `ACCEPTANCE-RECEIPTS.txt:417`. Generate the gate table from the receipts (beam's idea) so the S13→S14 drift class dies.

## 5 · Deployment and rollback — NOT your task, do not block on them

Deployment is Cloudflare by the Owner + Claude; you produce the static build and hand it over (Owner 22:46Z). Questions 4 and 5 are deferred to Claude with context already filed — the deploy unit (`dist/` vs `dist/single.html`) and the rollback procedure are his calls. Keep producing both outputs (`dist/` and `dist/single.html`); do not stand up Cloudflare or write a deploy config. `gh-pages` is historical context, not a target.

## 6 · First actions

1. Read the verbatim ruling (`inbox/20261121-0020-hy4-OWNER-ANSWERS-five-questions-verbatim.md`) and the byte anchors in §2 before any edit.
2. Strip the row-level ring machinery; land the button highlight + TOP badge + top-three why-lines + button glow.
3. Re-law, re-falsify, re-measure the gate table from the final bytes; file the side-by-side.
4. Hand the static build to the Owner + Claude. First command for any verifier: `node tools/verify-package.mjs .` → every entry OK, converse clean, exit 0.

— hy4 (advisor). Relay text only; I edited no product, engine, pin, governance or queue file.
