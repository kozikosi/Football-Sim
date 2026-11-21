SPEAKER: ERNIE | ROLE: advisor (council seat) | TASK: what cakepanz-14 implies, and how to make the shell a better home for Claude's engine — ideas, each with an anchor and a way to check | DATE: 2026-11-21T03:10Z
FOR: P-317 (cakepanz / shell) · P-287 (shell UX)

This is not a review and not a work order. It is what I think the S14 tree *means* for the product,
and the smallest set of changes that would make the shell better rather than busier. Every claim
below is anchored to a file I read in the delivered tree; nothing here needs an engine byte.

## 0 · What the tree proves (the assets to build on)

1. **The shell can be trusted.** `batteries/` are executable law, `scripts/falsify-board.mjs` kills
   mutants by name, `tools/verify-package.mjs` is portable, `golden-seam.mjs` pins the VM→JSON map at
   `e8fed8ab…`. I re-planted a mutant myself and the battery died by name (`FAIL L25`). That is a
   verification culture most products never reach — it is the shell's real moat, not the styling.
2. **The shell is genuinely offline.** `dist/single.html` (523.7 KB) boots from `file://` with zero
   external refs, zero blocked requests, both Cinzel faces inlined as `data:font/woff2;base64`. On a
   Cloudflare deploy that is not a constraint — it is a *second artifact* the product can ship.
3. **The engine's vocabulary is wider than the UI uses.** `seam.ts` re-exports `stamps`, `drift`,
   `engineVersion`, `sha256Hex`, `teamIdentity`, `planWhy`, `adviseLineup`, `fit`, `valueOf`,
   `optimalLineup` — and the screens use only some. `teamIdentity` reaches `feedVM.ts:84,172`;
   `stamps`/`drift` reach **nothing** in the UI. That gap is the opportunity.
4. **The board's numbers are already labelled** (`Model Value` provenance line, `gone%` method via
   `aria-describedby`, per-cell `aria-label` that announces the value). The label discipline exists;
   it just stops at the screen edge.

## 1 · P0 — make the shell's claims about *itself* true (small, high value)

These are the D4/D5 class from my review, generalized: the UI says things the bytes do not support.

**1a. One build stamp, derived, shown, and tested.** Today `App.svelte:83` hard-codes
`67-cakepanz@d3bd81d2` (the *previous* pin) and stamps it into every save, so `Saves.svelte:80`
warns "this save came from build 67-cakepanz@d3bd81d2 (running: nfl1.1ac56c28928eff)" for a save
the running build just wrote. Replace with one function:
```ts
// src/lib/port/buildStamp.ts
export const shellStamp = () => `${SHELL_NAME}@${SHELL_SHA}`;          // injected at build (vite define)
export const fullStamp  = () => `${shellStamp()} · engine ${engineVersion()}`;   // the engine's OWN stamp
```
Use it in `metaNow()` and on Complete/Guide/Share. Then add the law that would have caught it:
`N36 the envelope's engineVersion equals the running engineVersion() (a save written by this build is
never reported as foreign)`. Check: `npm run battery:node` 36/36; my probe
(`ernie-cakepanz-14-rerun-receipts-2026-11-21/04-stale-engine-pin.txt`) is the red version.

**1b. The share notice must not lie (D4).** `hydrateBoot()` returns early on a differing seed and
shows "your local save is untouched" — true, until the visitor presses START and `autosaveDraftNow()`
overwrites it (`App.svelte:228-236`). One line makes the promise true, using machinery that already
exists (`saveDraftSlot` is exported from `port/savesApp.ts` and already used by `Saves.svelte`):
```ts
// in hydrateBoot(), before returning on the link-wins path:
await saveDraftSlot('A', r.draft.record, metaNow(), new Date());   // park the local save where the user can load it
```
and add a "Load my saved draft" button to the notice bar. Check: extend W14 with a third direction
(link → START → Saves → Load draft → back to the original seed); the law must fail if the park is
removed (mutant: delete the `saveDraftSlot` line → W14c dies).

**1c. One packaging policy (D1).** `regen-manifest.mjs` writes sha256 into `CHECKSUMS.txt`;
`verify-package.mjs` parses md5. Merge them: one `tools/package.mjs verify|write` that owns the
manifest, both gates call it, one digest. Until then the composite cannot close. This is the only
P0 that blocks the *delivery*, not the product.

## 2 · P1 — spend the engine's vocabulary on the user (the shell's real job)

**2a. A provenance panel instead of scattered labels.** One `?` in the top bar opening
`<dialog>` with: shell stamp + sha · engine stamp (`nfl1.<hash53>`) · data stamp (`dataVersion`) ·
dataset hash · the golden-seam sha · the pin. All of it is already computed:
`stamps()`/`drift()`/`engineVersion()` are in `seam.ts`, and `sha256Hex` too. This is the single
feature that makes "every number here is real" checkable by a *user*, not just by a council seat.
Check: a node law that the panel's engine stamp === `engineVersion()`; a board law that the panel
opens and closes with Escape returning focus.

**2b. A decision card on the on-clock row (replace "highlight = hint").** The ring asks the user to
infer *why* three rows glow. The engine can say it: for the current board, show one line above the
rows — "Best value: <name> (+2.4 wins at FS) · Best need: <name> (fills FS, −6 flex) · Your board
ranks <name> first". Sources: `boardVM` rows (`wins`, `priority`, `slotLabel`), `fit(role,dest).penalty`
for the flex cost, and the existing `needsSelected` filter. If the Owner's ruling is to drop the ring,
this is the replacement that keeps the *information* and drops the *decoration*.
Check: a board law (the card names exactly the row `rows[0]` under every sort; zero hard-coded
strings), plus the L24 no-display-parse rule extended to the card.

**2c. Keyboard-first, because the board is a data tool.** A `Cmd/Ctrl-K` palette: "Draft the best
value at <slot>", "Jump to <player>", "Sort by <key>", "Undo". The engine gives you everything the
palette needs (`boardVM`, `fit`, `SLOT_IDS`); the L21 tab-order law becomes a fallback rather than
the only path. Check: a board law (open with the shortcut, Escape returns focus, every action lands
exactly one pick, no page errors). This is also the cheapest accessibility win in the tree.

**2d. Touch targets as a law, not a hope.** At 768 the quick button measures 188×30; at 390 it goes
full-basis. Nothing asserts ≥44 px. One line in the visual battery (`quick.height >= 44` at 390 and
at 768) prevents the most common mobile defect in dense sports UI.

**2e. The season hub should speak the same language as the board.** `teamIdentity(H.ratings, lg)` is
already computed in `feedVM.ts`; the Hub could read "this team is run-heavy, thin at LB, best on
early downs" from the engine's own plan instead of a generic summary. This is the biggest *thinness*
in the shell (the board is excellent, the season chrome is not) and it needs no new engine data.

## 3 · P2 — two structural bets worth the sitting

**3a. Make the offline single file a first-class artifact.** `dist/single.html` is already produced
and already offline-clean. Ship it as `/app.html` on Cloudflare Pages next to the normal build, and
put a "Download the offline edition" link on Complete/Share. Then add the trust feature nobody has:
a client-side **verify** box — paste a sha256, the page hashes the file it is running
(`crypto.subtle.digest('SHA-256', …)` over its own `document.documentElement.outerHTML` is unreliable;
hash the *downloaded* file instead) and says match / no-match against the stamp in §2a. A sim that
ships its own verification is a different product category.

**3b. Save lineage, not just save slots.** Envelopes already carry `saveId`, `createdAt`,
`saveRevision`, `engineVersion` (`hydrateApp.ts:25`). Surface them: "this board is rev 21, saved
03:06, from build X, derived from <parent saveId>". Shared drafts then carry their history, which is
what makes a *shared* sim trustworthy — and it turns D4's collision from data loss into a visible
branch.

## 4 · P3 — process ideas that cost nothing

- **A pin-drift law in the product, not only in CI:** Complete already prints `engine {engineVersion()}`;
  add a node law that this string equals `SNAPSHOT.md`'s pin hash (`d3bd81d2`-class bugs become red).
- **A stale-string lint:** `grep -rn "d3bd81d2" src/ dist/` must be empty. The whole D5 class dies
  with one line in `gate-numerals.mjs`.
- **One `tools/package.mjs`** (see 1c) and a `release.json` per build
  `{pin, shellSha, distSha, goldenSha, builtAt, node}` — the schema I would hand the Architect for
  `claude/releases.md`.
- **The hand-over checklist as a seat tool**, not a one-off: I filed the runnable version at
  `inbox/20261121-0305-ernie-P-317-handover-verification-checklist.md`; any seat can run it against
  the next zip in ~15 minutes.

## 5 · Guardrails I kept

No engine bytes, no pin, no ratings, no new data, no `colors/` edits, no product HTML edits — this is
advice only. I deliberately did **not** re-pitch the four rejected features (What-If alternate
history, deterministic multiplayer, 20-0 roguelike, cross-era pools), and I did not touch the ring
question beyond noting that the Owner's two rulings are in tension (my review, D7). If only one thing
is taken from this file: **make the shell's self-claims executable** (§1) — the product already has
the laws, the stamps and the hashes; it just does not assert them about itself.

— ERNIE (advisor; signs as ERNIE, never as another seat)