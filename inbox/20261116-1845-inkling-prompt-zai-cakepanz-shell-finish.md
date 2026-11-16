SPEAKER: inkling | TASK: Draft — the 67 Cakepanz finish prompt for Z.ai | DATE: 2026-11-16T18:45Z
FOR: framework comparison (Owner ruling R-13 — the fresh-start/Cakepanz UI track; no P-row)

FOR Z.AI — finish the 67 Cakepanz shell: everything the Architect's engine needs, and everything a finished product needs, with **TypeScript-neutral building until handoff**.

Where this starts: slices 1–5 shipped (Draft Board · Team Select · hydration + board chrome · the drive-level feed · the brag shareable + seed card), delivered as zips and reviewed; the tree consumes a byte-identical engine snapshot and never edits it. The w89 live wave (pale-rose light default + its dark variant, Cinzel, ZPB team colors + `data-zpbteam`, **no `--tc`**) is the owner's fixed visual law. The 2026-11-15 re-pin moved the tree to `d3bd81d2` (gh-pages `66096fb1`); at any later re-pin the pin moves again by an explicit act, and the shell follows the same rule.

**The Owner's standing ruling (this prompt's frame; do not reinterpret):** TypeScript-neutral until the last second. The framework is UNDECIDED (vue vs svelte — Owner's to rule, probably on feel at cutover); no Cakepanz work after slice 5 may hard-require either. Build in TypeScript as far as possible; keep the framework surface as thin as the build allows. The framework question lands once, finally, at handoff.

## The job in one paragraph

Complete the **67 Cakepanz UI/UX shell** — every remaining screen of the full 76 Pancakes product experience, with every state of every screen — so that when the Architect's engine is done, his engine drops into a **perfect UI shell** rather than a UI half-built around a specific framework. The shell must render complete offline (hard requirement), be single-file buildable, and honour the w89 look law (the badge format and the colors the Owner loves — w88's grammar is canonical). Everything you build after slice 5 consumes the engine only through plain TypeScript seams; the merge must be a mechanical re-vendor + battery re-run, not a rewrite.

## Ground truth (all verified this sitting or receipted; do not re-litigate)

- Slices 1–5 exist and work; the trees are byte-identical where they claim to be.
- The Owner has fixed the visual law: pale-rose light `--bg:#fdf2f6`, dark `#1e1119`; Cinzel (inline base64, offline, no CDN — w89's own violation to avoid, not to imitate); ZPB_TEAM_COLORS (22 Oct table); `[data-zpbteam]` remap; `--zcream` never tinted; **no `--tc` anywhere in the shell's final look**; user's team carries `.ub`; the 32-team palette table is the only team palette; the gone% and flex stay the engine's own form.
- Display rule: **integers everywhere on the site**; only Wins and Priority may print one decimal (Owner, 2026-11-09). No ratings are ever generated here.
- Plain informative recaps: no "expected scoring", every turnover named, overtime events only in the OT block, never "sudden death"; "2-Pt Conv" except in the Guide; no injuries anywhere, ever; HLT/stiffness laws for image actions (all weekly screens/shareables reuse the existing anatomy).
- The v1 union: `yards: null` — never invent a yard figure; the UI renders plays and time only.
- **The engine is the Architect's.** You never edit `colors/src`, `flex.json`, `flex.ts`, slots, ratings, or protected constants; proposals go as §5 filings for him to integrate; you never re-pin on your own initiative; you never push a gh-pages wave; you never generate ratings.
- Your sandbox cannot push to GitHub; each slice ships as a zip to the Owner (who relays it), with the receipts inside.

## The remaining work — first, you must propose, the Owner approves the plan, then you build

Nothing below is built until the Owner signs the slice plan you return. Proposed starting inventory (revise it with reasons, do not pad it):

1. **Team Select revision (P-317, draft-position slot picker)** — blocked on the Architect's START slot support landing; you prepare the UI side against that contract (selector component, slot→START wiring, restore path) so it lands the moment his part does. Do not build around the blocker — keep the screen else as is.
2. **The Draft completion state** — the handoff from draft into the season; the "your draft is complete" framing, the onward CTA, the provenance stamp shape (seed · gameSeed), the states (partial/complete) the reducer already implies.
3. **The season hub** — where each week lives at a glance: standings through week N, the schedule grid, the games played so far, the current week's CTA; a "restore slot" entry if applicable; the states (not started / in progress / finished).
4. **The week view** — the per-week game cards for the whole league and the user's match prominently; final-score reveal mechanics consistent with the feed; the states.
5. **Standings & Playoff picture** — division tables, playoff seeding, bracket states (wild card → Divisional → Conference → Super Bowl), the champion banner state on completion.
6. **Awards** — regular-season awards and playoff awards on the review grammar (winner, line, one-line `team {wins}` tie-break phrasing; integers except Wins/Priority; 90+ shimmer where the w89 law applies).
7. **Season Review** — the post-game/post-season review screen in the w89 review grammar (integer chips; plain informative lines; no "expected scoring"; the Super Bowl review prominent; the conclusion of the run).
8. **The Guide** — the "How this works" surface: the honest statement of what the engine does (draft valuation, flex costs, models, replay), written plain, integers, no promises; the rules the user can lean on; reduced-motion respected.
9. **The shareable per stage** — extend slice 5's brag/seed to the season and to stages beyond the week brag (season brag exists; the bracket brag; the awards brag); each must carry its provenance and export cleanly at the pin's own engine path.
10. **The states, everywhere** — loading / empty / no-save / corrupt-save / newer-build / reduced-motion / offline / file:// for EVERY screen in the finished shell. Nothing is "covered by the battery" unless each state is receipted.

Each slice you propose carries its deliverable, its receipt set, and its review protocol before you start it — never after.

## The TypeScript-neutral discipline (the load-bearing rules)

- **Everything below the render layer is plain TypeScript in `src/lib/**`** — state stores, VM adapters, tokens, fixtures, fixtures+scripts, the battery's node-side core. You may keep Svelte 5 as the *render* layer of THIS tree (it is what it is), but NO Svelte-specific patterns (runes, svelte:gestures, svelte-only lifecycle tricks) may leak into VM/data code; every such file must be mechanically re-usable under an ordinary TS runtime or a different framework with zero changes.
- **No new framework-specific dependencies, period.** The existing tree's dependencies stay as pinned.
- **The engine is consumed byte-identical to the pin** — not forked, not patched, not "almost pinned". The snapshot stays what it is; the note in the handoff names the engine path for every file the shell calls.
- **Every new seam the shell relies on is registered in the handoff note** — VM name · the engine file that backs it · that file's sha256 · callers. If a VM cannot be pinned to a file, it doesn't ship in the "perfect shell".
- **Fixtures before builds:** every screen renders from a node-side fixture generated from the engine's own path (like the season fixture league) so CI can render the whole shell without launching the browser; the engine is needed only to re-verify, never to render-test.
- **No `.ts` file with framework imports may claim a re-usable status in the seam inventory.**
- **The battery splits node-side (portable, framework-blind) from render-side (Playwright per screen)** — the node-side suite must be able to run in ANY framework with zero changes; if it can't, that's a defect.

## The handoff deliverable (what "perfect UI/UX shell" means — Owner-verifiable)

When you are done, the Owner can hand the Architect a single note saying: *"engine, ready to merge."* That note contains, at minimum:
1. the **seam inventory** — every screen, every store/VM it reads, the engine file + sha256 it binds to;
2. the **state coverage matrix** — every screen × every state, with its battery receipt;
3. the **fixture suite** — node-side renders of every screen without a browser;
4. the **battery** — green end-to-end on this pin, including each acceptance screen in reduced-motion mode;
5. the **cutover runbook** — the exact steps the Architect follows on merge day: re-vendor `colors/src` at the new pin (or re-apply the pin move by act), re-run the battery, re-pin, ship; plus what to do if any one step fails (file it, don't route around it);
6. the **merge-readiness verdict** — your own statement, one line per screen, of what is perfect, what is good enough, what needs one more pass before the handoff — and the honest list of what you do not know.
No euphemisms in that last item. The Owner has to rule on it.

## Anti-scope (explicit)

- No framework-specific cleverness outside the render layer — "Svelte does it better" or "Vue does it better" statements in review notes are irrelevant until the Owner rules the final framework (he hasn't; the neutrality ruling governs).
- No invented palettes, values, teams, ratings, or ratings-generation code anywhere.
- No w89/gh-pages edits, wave pushes, or derivative waves from this work.
- No new specifications decided by you alone — propose, the Owner rules.
- No "merging with fresh-start arms" — those are separate trees and separate comparisons; do not port from them without a ruling.
- No test deletions to make a gate green — the gate would rather fail; report it instead.

## The slices, in outline (yours to propose, the Owner's to approve)

Each slice ships as one zip with: builds-on-this-tree proof (`npm run build`), the battery, the fixture updates, the seam-inventory delta, and the README addition. Proposed order (reason about it; the Owner may re-order): finish the states sweep on slices 1–5 (gaps found) → slice 6 Team-Select/P-317 UI (post-Architect) → slice 7 season hub + week views → slice 8 standings/bracket/Super Bowl → slice 9 awards → slice 10 season review → slice 11 guide → slice 12 the merge rehearsal + cutover note → fixture marshal + final battery. Every slice in that list carries its own acceptance screen and its own receipts; none waits for a wrapper the engine hasn't shipped.

If at any point the Architect's engine lands mid-slice, note it, carry on the current slice to the end, and re-verify at yours next slice boundary — never squash two slices' work into one mid-flight.

Warm-up required before any code: read `_agents/inkling/deliveries/67-cakepanz-s5/README.md` (this is the current state), then `notes/INTAKE-LEDGER-*.md`, then this prompt's owner note — and the `w88 look` subsection — then propose your slice plan as a note for the Owner's ruling. Nothing is built before he signs it.

**First reply structure (four lines, then propose):**
```
READ : this prompt's owner note · the current tree's README + INTAKE LEDGERs · w88 grammar
STATE: pin <name> · slices 1–5 done · framework undecided (TS-neutral) · engine = Claude's
PLAN : <your slice-plan proposal in one line>
RISKS: <what could bite, in one line>
```
