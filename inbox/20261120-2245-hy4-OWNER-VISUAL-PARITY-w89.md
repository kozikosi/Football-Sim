SPEAKER: hy4 | ROLE: advisor | TASK: record the Owner's final visual directive — near-exact w89 fidelity, Cinzel and everything | DATE: 2026-11-20T22:45Z
FOR: Owner · MUSE · Architect (Claude) · Z.ai relay. Ruling record; no assignment.
STATUS: raises the visual bar in `...-2239-hy4-OWNER-FEEDBACK-board-aesthetic.md` from "richer/closer to w89" to near-exact fidelity. Both stand; this one governs where they differ.

## The Owner's words (this chat, verbatim)
> "ultimately i need you to tell zai to make cakepanz look **almost exactly like w89 with Cinzel and everything**; you can preserve your mockup as an example of the direction of change but **that's still not complete**."

## What this rules
1. **Acceptance bar = near-exact w89 fidelity, not "directionally similar".** The mockup is explicitly a direction example only and is **not complete**; v6 §6.5 requires a filed side-by-side visual comparison against the live w89 build and three named falsifiable laws (type parity, surface parity, why-line).
2. **Cinzel and everything means the full type system, not just a font swap.** Verified this sitting: cakepanz **already inlines** Cinzel 700/900 and Cinzel Decorative 700/900 as base64 (`tokens-w89.css:21-30,83-95`, offline-safe), with `--font-display`/`--font-ui`/`--font-body` at `:64-66`. w89's roles: Cinzel Decorative 900 on DRAFT and hero buttons (`:700-702`, `:911`, `:932`, `:1058`, `:1155-1160`), group headers (`:342-343`); Cinzel 700 on badges/tabs (`:307`, `:755`, `:1203`). Body copy stays system sans in both (w89 `:113`, cakepanz `:174`) — do not Cinzel-ify body text. Do not add w89's remote Google Fonts link (`:478`) — offline is hard.
3. **Full surface vocabulary** — gradient/glass cards (`:248`), liquid-metal buttons + shimmer (`:409-410`, `:700-714`, `:753-755`), glow/glass tokens (`:492/:511/:532/:552`, `:569/:582`), radial glow orbs (`:609/:612`), team-colour tag gradients (`:905-906`), sheen/CTA treatment (`:713-714`, `:922-923`, `:1168-1169`, `:1752`), gold token (`:381`), reduced-motion guard (`:948`). All exact anchors are in v6 §6.3.

## What stays from earlier rulings
Ring removed (L13/L16–L22 retired); why lines kept on every row from the same VM; P0 D1/W14; P1 accuracy; Cloudflare-ready static build handed to the Owner + Claude, who deploy. Deployment/rollback remain theirs.

## What I filed
`inbox/20261120-2245-hy4-TO-ZAI-cakepanz-s14-continuation-v6.md` — supersedes v5 and all earlier drafts. Lane and bulletin updated. No product, engine, pin, governance or queue file edited.

— hy4
