SPEAKER: pickle | ROLE: council seat (advisor; Verifier of the S13 review round) | TASK: file the Owner's 2026-11-21T00:1xZ answers on top-three, the why-copy, w89 buttons, rollback and visual acceptance; they refine the 22:46Z "remove the ring" ruling | DATE: 2026-11-21T00:18Z
FOR: Owner, MUSE (verbatim intake + ledger), Architect (Claude), Z.ai. Council record only — no product, engine, pin, governance or queue file was edited.

## The Owner's words, verbatim (this chat, 2026-11-21T00:1xZ)

Opening line, then the five answers "out of order":

> "1.4. yes"
> "1.. top three highlight should be present in the button like w89"
> "2. the little descpriton of the top 3 choices of why the user would select that player"
> "3. w89 the buttons glow and there is a separte "top" badge"
> "4. i need to know further context and claude should decide"
> "5. i need more context and claude should decide"

(Spelling preserved — "descpriton", "separte".)

## What these answer, mapped to the questions actually put

The four questions I put to the Owner were: (1) which "small descriptions of why each player", (2) does "remove the ring" kill the top-three highlight and one-click button, (3) rollback Plan A vs B, (4) show a side-by-side before sign-off. The five numbered answers above map to those plus the two questions I put to Claude (rollback, visual-acceptance wording):

| # | Owner answer | Question it answers | Ruling |
|---|---|---|---|
| — | "1.4. yes" | my Q1 and Q4 | Keep the descriptions (Q1); yes, show the side-by-side (Q4) |
| 1 | "top three highlight should be present in the button like w89" | my Q2 | **Top-three highlight stays.** Not removed. Expressed in the button, w89-style |
| 2 | "the little description of the top 3 choices of why the user would select that player" | my Q1 | **Keep the small "why" copy, scoped to the top 3** — the reason to select that player |
| 3 | "w89 the buttons glow and there is a separte 'top' badge" | my Q2 / Claude's visual question | Visual language: **glowing Draft button + a separate "top" badge**. A badge, not a ring |
| 4 | "i need to know further context and claude should decide" | my Q3 / Claude's Q1 (rollback) | **Claude decides rollback.** Stays UNKNOWN on the Owner's side; I do not pick A or B |
| 5 | "i need more context and claude should decide" | Claude's Q2 (visual acceptance wording) | **Claude decides the acceptance wording.** hy4's side-by-side bar vs measurable anchors is Claude's call |

## The one thing this overturns — stated so no seat relays it stale

In `inbox/20261120-2246-pickle-OWNER-RULINGS-remove-ring-cloudflare-panels.md` §32 I read "remove the ring" as removing the top-three suggestion highlight, the one-click `cp-quick` draft button and every law that tests them. **That reading is WRONG and is withdrawn.** The Owner has now answered that exact question: the top-three highlight stays, in the button, like w89. Do not tell Z.ai to delete the top-three signal or the top-three "why" copy. The ring *visual* (the row shimmer/inset on the suggestion) is still removed; what is removed is the ring, not the top-three meaning.

The rest of the 22:46Z ruling stands unchanged: Cloudflare deploy by Claude + Owner (not gh-pages, not Z.ai); panels restyled toward w89; Playwright in `colors/` devDependencies; the Capitalised `CAP`/`method`/`Fills` explanatory copy preserved.

## Exact anchors in the S14 tree of record (read this session, not re-run gates)

Hosted tree: `_agents/pickle/deliverables/67-cakepanz-14-2026-11-20/cakepanz-4/` on `council/pickle` (md5 anchors in its `CHECKSUMS.txt`).

- `src/lib/components/BoardRow.svelte:42–53` — the `{#if suggest}` block: the row's comment still says "ONE click drafts a ringed row"; the `<button class="cp-quick">Draft {r.name} at {r.slotLabel}</button>` at `:47`; the `{#if why}<span class="cp-why">{why}</span>{/if}` at `:52`. This is the block the Owner's answers 1–3 govern: keep the top-three signal and its why-copy, move the highlight into the button (glow + "top" badge), drop the ring language.
- `src/lib/components/BoardRow.svelte:8` and `:132` — comments describing the "gold ring on the row's pick control" / "suggestion ring". Stale once the ring is gone; Z.ai to reword, not to delete the highlight.
- `src/lib/assets/shell.css` — no `.cp-top`/badge class exists; `cp-topbar`/`cp-topbtns` at `:25`/`:63` are layout, not the "top" badge. A new badge element/class is needed.
- The older ring-independent copy the Owner's earlier "small descriptions" could also have meant (`method(oddsMeta)`, `.cp-gonetip` at `:39`, `.cp-sr` at `:53`, `.cp-fitlbl` "Fills …", `.cp-gonehow`) stays either way — its preservation was never in dispute.

## What is NOT decided by these answers

- **The separate one-click `cp-quick` path.** The Owner says the top-three highlight lives in the button, like w89; that is a visual treatment on the Draft button. The answers do not explicitly say whether the extra one-click `cp-quick` button remains as a convenience. I am not deciding it; Claude may, and should say so in the work order.
- **Rollback** (Plan A dashboard vs Plan B pinned artifact) — Claude's call per answer 4; my earlier recommendation of Plan B stands as input only, not a ruling.
- **Visual-acceptance wording** (hy4's filed side-by-side bar vs the glass/radius/contrast anchors) — Claude's call per answer 5.
- **Side-by-side**: answer "yes" is an ask to be *shown* Cakepanz vs live w89. I cannot produce that alone — it needs the built tree and the live w89 reference. Filed as an action for Claude/Z.ai; nothing was fabricated or screenshotted by me.

## Verification status of this filing

The verbatim text above is from this chat (the Owner's own message). The anchors in §"Exact anchors" were read from the hosted S14 tree with `sed`/`grep` in this session (REPORTED as read, not a gate). No battery, build, gate, engine or hash check was run for this ruling. Nothing in the product was edited.

— pickle (council seat; Verifier of the S13 review round)
