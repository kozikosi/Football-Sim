SPEAKER: hy4 | ROLE: advisor | TASK: record the Owner's 22:30Z ruling — remove the ring; deploy to Cloudflare, not gh-pages | DATE: 2026-11-20T22:30Z
FOR: Owner · MUSE · Architect (Claude) · Z.ai relay. Ruling record + implications; no assignment.
STATUS: **supersedes the Owner's earlier "ring revived for Z.ai / w89 glow" direction.** Everything downstream that assumed a ring is void.

## The Owner's words (this chat, verbatim)
> "remove the ring. again gh pages doesn't matter that much; we will be deploying to cloudflare"

## What this reverses
1. **Ring: REMOVED — not revived, not restyled.** My `1949`, `2032`, `2115`, `2130` filings and the `2209`/`2214` Claude replies all say "revived in Z.ai's lane, w89 glow target." Void. The `.cp-suggest` inset shimmer, `suggestIds`, the one-click `.cp-quick` button that renders only on ringed rows, the Contract B / rawSort work, the L13-oracle repair, the no-display-parse law and the proposed L23 glow law all lose their subject. The w89 *button styling* may still be ported as a plain visual slice on every Draft button — the Owner separately asked for the board to look like w89 — but it is no longer tied to a ring or to three highlighted rows.
2. **gh-pages: no longer the deploy target.** The Owner reaffirmed Cloudflare. This is not new: `origin/architect/engine-and-seats:_agents/ARCHITECTURE-DIRECTION.md:3` records the Owner's 4 Nov ruling "separate static assets on Cloudflare Pages, offline via service worker", and `COLORS-V1-DESIGN.md:5` has the build emitting separate static assets for Cloudflare Pages. The make-live step becomes a Cloudflare deploy; the gh-pages `index.html` swap, the w89 retirement note, the 48/1 vs 49/49 host repairs, and the w89/gh-pages rollback pointers are no longer load-bearing.

## Immediate implications (each labelled)
- **VERIFIED (read this sitting):** Cloudflare is in the architecture docs as the decided target; no `wrangler.toml` or deploy script exists in Claude's tree yet (`git ls-tree` check). Deployment mechanics are therefore still UNKNOWN — no Cloudflare config, account, domain or pipeline in the repo.
- **VERIFIED:** the ring's current implementation is `.cp-suggest` + `suggestIds` in `DraftBoard.svelte:74-76` / `BoardRow.svelte:23,47`, and `.cp-quick` renders only when `suggest` is true. Removing the ring removes the one-click button with it; the board falls back to the staged row → Confirm path (which carries L22's guard).
- **INFERRED:** L13 ("at least three draft controls highlighted", the Owner's c9 C′1 law) and L16–L22 (ring-dependent laws) become inapplicable. They should be retired from the gate set, not silently left green. I have NOT edited the battery — that is Z.ai's tree and this is a ruling record.
- **INFERRED:** the four-host T8 repair relay and the gh-pages 286/286 re-point lose their deployment purpose. They may retain value as test fixtures; MUSE/Owner decide. I do not declare them done.
- **INFERRED:** the make-live question I asked in my last message is replaced by "who deploys to Cloudflare, and what is the rollback?" That is a new Owner/Architect decision; my earlier "Claude if access allows, Beam fallback" answer no longer applies as written.

## One question I need answered to make the relay text exact
**Does "remove the ring" also remove the top-three highlight (the c9 C′1 law) and the one-click button that only appears on ringed rows?** My default, applied in v4 below: **yes — remove all of it**; port w89's breathing/glow treatment onto every Draft button as a plain visual slice, with no three-row hierarchy. If you meant "remove the row shimmer but keep three highlighted buttons", say so and I will flip that one section. Nothing else is blocked.

## What I filed
`inbox/20261120-2230-hy4-TO-ZAI-cakepanz-s14-continuation-v4.md` — the self-contained relay work order with the entire ring-correctness section removed, the w89 button treatment kept as a plain visual slice, and Cloudflare substituted for gh-pages in delivery/rollback. My lane and bulletin point at v4. No product, engine, pin, governance or queue file was edited.
