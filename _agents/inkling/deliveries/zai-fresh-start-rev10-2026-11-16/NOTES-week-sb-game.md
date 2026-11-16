# NOTES-week-sb-game.md — the one known cross-arm text divergence (Rev 9 Part E)

Seat: Z.ai · 2026-11-16 · surfaces: `football-sim-vue/probes/battery-vue.json` vs
`football-sim-svelte/probes/battery-svelte.json`, check `week-sb-game` (detail field, both from this
sitting's runs, exit 0 each). **Nothing ships against this finding except this note** — the
proposal below is NOT merged into either repo's render path until the Owner says so.

## The divergence (byte-level, from this sitting's batteries)

- Vue renders/collects: `ATL22@30HOUSuper Bowl` (21 chars)
- Svelte renders/collects: `ATL22 @ 30HOU Super Bowl` (24 chars)
- Delta: 3 bytes = the two inter-element spaces (` @ ` vs `@`, ` ` before `Super Bowl`) — exactly the
  whitespace BETWEEN the interpolated text nodes; every text glyph is identical.

## The exact cause in each compiler

- **Svelte 5** keeps single spaces between elements: its template compiler emits text nodes that
  preserve the literal whitespace the author wrote between interpolations (`{g.as}` and the next
  element). Svelte 5's compiler only collapses whitespace where the template ASKS for it
  (`{@html …}` aside, whitespace-preserving is the documented default; per Svelte docs, "Svelte
  preserves whitespace as written, with limited exception handling around element boundaries").
- **Vue 3** condenses inter-element whitespace: the template compiler (with the default
  `whitespace: 'condense'` option, documented in the Vue 3 compiler options) removes whitespace-only
  text nodes BETWEEN elements and condenses runs to nothing when they contain a newline; spaces that
  separate interpolations across element boundaries disappear.

Winner-table row (per each framework's OWN documentation): **Svelte wins this cell** — its
whitespace-preservation matches what the author wrote; Vue's condense mode silently rewrites the
text content. The battery check passes in BOTH arms (it is an `includes` check over abbrs and
scores, not an exact string), so the divergence is invisible to the gate — which is exactly why it
is documented here rather than fixed silently.

## The proposal (Owner decides; not merged)

**scoreLine in the shared layer**: move the game-line rendering into a shared helper
(`scoreLine(g: WeekGameVM): string` in `src/shared/weekVM.ts`, both arms byte-identical) that builds
the string explicitly — `${g.homeAbbr} ${g.hs} @ ${g.as} ${g.awayAbbr}` — and have BOTH components
render `{scoreLine(g)}` as ONE interpolation. One text node, no inter-element whitespace for either
compiler to have an opinion about; the arms render byte-identical text by construction, the battery
could then assert the EXACT string, and the fidelity pin gains a text-level pin next to the
node-count pin. Cost: one helper + 2 call-site edits per arm; the week-sb-game check's detail strings
become identical. **Alternative (also acceptable): keep the one-word rendering difference documented
here** — the divergence is cosmetic, the gate tolerates it, and nothing seeded moves.
**Recommendation: take the shared helper when the Owner next opens the render path for any other
reason; do not open the render path for this alone.**

## Winner-table row (citing the sections)

| cell | Vue 3 (compilerOptions.whitespace: 'condense', Vue 3 docs — API reference, application config) | Svelte 5 (whitespace handling, svelte compiler docs) |
|---|---|---|
| inter-element text | CONDENSED (whitespace-only nodes between elements dropped/condensed) | PRESERVED (single spaces kept as written) |
| this divergence | cause | correct-per-own-docs behavior |
