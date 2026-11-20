SPEAKER: pickle | ROLE: council seat (advisor; Verifier of the S13 review round) | TASK: record the Owner's 2026-11-20T22:4xZ product rulings verbatim and their consequences for the S14 relay | DATE: 2026-11-20T22:46Z
FOR: Owner, MUSE (verbatim intake + ledger), Architect (Claude), Z.ai. Council record only — no product, engine, pin, governance or queue file was edited.

## The Owner's words, verbatim (2026-11-20, this chat)

> "remove the ring. again gh pages doesn't matter that much; we will be deploying to cloudflare. the panels are still too boxy in cakepanz and not as colorful or brautiful as w89. i do like the small descriptions of why each player we should keep those. claude and i deploy to cloudflre"

(Spelling preserved — "brautiful", "cloudflre".) Earlier in the same exchange, on the same four questions:

> "2.. claude or z.ai. i wanted claude to do it but he hits his limits quickly. is this a token intensive activity?"
> "1..i want the draft button to look like w89. a ring is also fine but in general i'd like the draft board to look more like w89. i need to see them side by side if you can show me"
> "3. why wouldn't we add it?"
> "4. i need you to provide me full context here"

## Four rulings, stated plainly

1. **Ring: removed.** No revival. This supersedes the Owner's earlier "we can revive the council's work on the ring … i ultimately like how w89 uses the glowing draft buttons more" as the S14 scope. The whole Contract B / rawSort / L13-ring / paired-interim-oracle / one-click quick-draft / ring-persistence / ring-explanation chain is withdrawn as S14 work. It is not deferred and not renamed — removed.
2. **Deployment: Cloudflare, by Claude + Owner.** gh-pages is no longer the target, so the make-live/gh-pages question (hy4orca's open item, runbook §5, work order §8) is closed: Claude and the Owner deploy to Cloudflare; Z.ai does not deploy or make anything live. VERIFIED in the tree: no Cloudflare config exists yet — no `wrangler.toml`, `_redirects`, `_headers` or `functions/` on `council/muse` or `architect/engine-and-seats` (stack-audit deliverable §17, 12 Nov). Cloudflare Pages static hosting is the recorded intended target; standing it up is a Claude+Owner task, not Z.ai's.
3. **Panels: restyle to w89.** "Too boxy" and "not as colorful or beautiful as w89" is a direct visual direction for Z.ai's cakepanz shell. Concretely (VERIFIABLE from the bytes): w89 `.panel` at `:625` is `background:var(--glass)` (`rgba(255,255,255,.58)`), `border:1px solid var(--glassbd)`, `border-radius:22px`, `box-shadow:var(--shadow)` (`0 10px 34px rgba(163,113,84,.10)`), plus `backdrop-filter:blur(14px) saturate(1.2)`. c12 `.cp-panel` in `src/lib/assets/shell.css:80` is `background:var(--panel); border:1px solid var(--hairline); border-radius:var(--r-md)` where `--r-md:8px` (`tokens-w89.css:69`), and has no shadow and no blur. Seven more `var(--r-md)` panel/card uses in `shell.css`. That 8px-flat-vs-22px-glass gap is the boxiness. w89 colour tokens already exist in the product (`:492–503`, `:532–543`); c12's `tokens-w89.css` has no `--glass`/`--glassbd`/`--shadow` at all — they must be added there, in both light and dark roots.
4. **Keep the per-player descriptions.** "I do like the small descriptions of why each player we should keep those." Anchors to preserve verbatim through the restyle: `BoardRow.svelte:14–20` (`CAP` captions + `method(oddsMeta)`), `:39` (`.cp-gonetip`), `:53` (`.cp-sr`), `:56` (`.cp-fitlbl` "Fills …"), `:61` (`.cp-gonehow`), and the w89 counterpart `td.dc-fills .narr` (`:433`, `:1145`, generated at `:6484`). These are explanatory copy, not decoration — they stay.

## Knock-on consequences, stated so no seat relays stale scope

- **v6 §3 is withdrawn in full.** No `rawSort` on the frozen `BoardRowVM` (pin `408410477`, `draftBoard.ts:19/53/61`), no `BLOCKED (engine half)` proposal, no `INTERIM — display-rounded, awaiting rawSort` labels, no L13 paired-oracle work, no L23 pulse law, no `suggestIds[]` persistence, no ring "explain" line, no `cp-suggest`/`cp-quick` one-click wiring. The pin stays byte-identical for a different reason: there is simply no engine change to make.
- **v2 reply to Claude's "incoming §5 proposal" heads-up is withdrawn.** Do not tell Claude to expect a rawSort proposal. The frozen engine is untouched.
- **The w89 button look is NOT withdrawn.** The Owner's earlier "i want the draft button to look like w89" stands: port the w89 CTA treatment (`#startDraftBtn` `:700–740`, liquid-metal gradient, sheen, cream halo) to the cakepanz draft buttons as a *visual* treatment on the existing controls — decoupled from the ring, which is gone. w89's W66 site-wide button pulse does not need a ring.
- **Playwright stands.** "Why wouldn't we add it?" was answered from the bytes: `colors/tools/make-golden-matchup.cjs:5` already `require('playwright')` while `colors/package.json` omits it; AGENTS.md protects constants, not devDependencies; add it to `colors/` with a regenerated lockfile and a version receipt. This is Claude's tree at merge, not Z.ai's.
- **What the Owner did not rule on:** nothing here changes the S13 verdict (`improved`), D1 seed fix (P0), the 445/0 baseline, the golden seam hash `e8fed8ab…`, or the protected constants. Multisport stays parked.

## One interpretation I made explicit (reversible; correct me if wrong)

"Remove the ring" is read as: remove the top-three suggestion highlight, the one-click `cp-quick` draft button that rode on `suggest`, and every law that tests them (L13, L16 plus whichever of L18/L19/L21/L22 are ring-dependent — Z.ai to verify from the bytes and report the exact board-battery count he observes, not a copied one). The capitalised `CAP`/`method`/`Fills` copy stays. The w89 glow is a button style, not a ring, so it stays. If "remove the ring" also meant "no w89 button glow", say so and I will retract that line; nothing has been built on it.

## MUSE action requested (not done by me — not my file)

Intake the four verbatim quotes above into `_agents/owner-notes/` and `_agents/V23-OWNER-NOTES-INTAKE-LEDGER.md`; record ring=REMOVED, Cloudflare+Claude/Owner deploy, panel restyle, keep-descriptions. Mark the earlier "revive the ring" note superseded by this one, do not delete it. Fix any stale `d3bd81d2` pin lines to `408410477` under your standing custodian permission — separate from this ruling.

— pickle (council seat; Verifier of the S13 review round)
