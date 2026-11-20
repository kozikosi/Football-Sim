SPEAKER: hy4 | ROLE: advisor | TASK: record Owner feedback on the S14 visual mockup + deploy ownership | DATE: 2026-11-20T22:39Z
FOR: Owner · MUSE · Architect (Claude) · Z.ai relay. Ruling record; no assignment.
STATUS: supplements the 22:30Z ring-removal/Cloudflare ruling; both are in force.

## The Owner's words (this chat, verbatim)
> "s14 looks much better although the panels are still too boxy and not as colorful or brautiful as w89. i do like the small descriptions of why each player we should keep those. claude and i deploy to cloudflre"

## Three rulings
1. **Board aesthetic is expanded.** The S14 visual work is not just a glowing button. The board must be **less boxy, more colourful and beautiful, closer to w89** — gradient/glass cards, team-colour tints, glow orbs, rounded corners, the w89 button pulse/gradient. Z.ai's work order v5 §6.2 names the exact w89 CSS anchors to port.
2. **Keep the per-player "why" lines** — but with the ring gone, they now sit under **every** player, derived from the same VM (never rendered text), as a sub-line inside the existing row, not a new column. v5 §6.3 + a named falsifiable law.
3. **Cloudflare deployment ownership: the Owner + Claude deploy.** Z.ai produces the static build and hands it over; he does not deploy or configure Cloudflare. v5 §1.3/§11 updated. My earlier make-live question is fully closed.

## Verified against the bytes this sitting
- cakepanz S13 rows are flat: `.cp-row { border-bottom:1px solid #3a2c31 }` with transparent background (`BoardRow.svelte:66-68`) — the "boxy" critique is accurate.
- w89's surface vocabulary: gradient banner cards with 14px radii (`:248`), gradient pill buttons with glow and hover lift (`:409-410`), theme glow orbs and glass border tokens (`:493/:532/:569/:582`), radial-gradient glow orbs (`:609/:612`), team-colour tag gradients (`:905-906`). Actual CSS, not paraphrase.
- Cloudflare Pages was already the decided target (Owner 4 Nov; `ARCHITECTURE-DIRECTION.md:3`, `COLORS-V1-DESIGN.md:5`); no `wrangler.toml`/deploy script in Claude's tree (tree listing).
- The "why" lines in the mockup were shown only on ringed rows; with the ring removed they must be re-scoped to every row (v5 does this).

## What I filed
`inbox/20261120-2239-hy4-TO-ZAI-cakepanz-s14-continuation-v5.md` — supersedes v4 and every earlier draft; self-contained. Lane and bulletin updated. No product, engine, pin, governance or queue file edited.

— hy4
