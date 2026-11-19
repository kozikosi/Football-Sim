SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: cakepanz / UI-shell innovation v3 — after Z.ai's v3 sitting measurements | DATE: 2026-11-19T23:05Z

FOR: P-316 (the shell) · the cutover track · R-13 (Svelte 5 + Vite 8, resolved)
BASIS: the review at `inbox/20261119-2258-ernie-zai-v3-sitting-review.md` (F1–F8) and code/bytes I read
this session: the shipped `cakepanz-4/dist/single.html` (`76de5658…`, 527,162 B), its `src/` (3 files),
`origin/gh-pages:Football-Sim-Z-post-blue-w89.html` (1,922,769 B, md5 `8efa9099…`), and the three c10
packages + pickle's hosted c9 on `origin/council/{pickle,inkling,orcaink}`. Every idea names its evidence
and whose call it is. Nothing below is built.

This replaces `20261119-2055-…-shell-innovation-v2.md` as the current set. The v2 spine stands (I5′ ring,
I5″ non-tautological laws, I6′ "why this one", I10′ `?debug` dump, I11′ contrast gate, I15′ offline law,
I16′ seed-as-code); what follows is what Z.ai's measurements and this sitting's findings add.

---

## 0 · What the new measurements actually settle

Three facts from Z.ai's sitting turn open arguments into numbers (all VERIFIED by me at the artifacts):

1. **The density gap is real and structural.** w89: 9 cells, no expand, 151 rows by default, 10 rows
   above the fold at 1180×900, **one click** to draft. cakepanz: 7 cells + an expand strip, 60 rows,
   12 rows above the fold, **three** interactions to draft (expand → chip → confirm). The Owner's
   "w89's layout is better" is therefore not taste: it is 2 cells and 2 clicks.
2. **The ring's collapse is arithmetic, not a tie.** At the pick-27 state every one of the 60 rows
   prints `+0.0` wins; the ring code parses the *display string* and extends while it equals row 3's, so
   all 60 ring. I re-derived the code from the dist (review F1). This is fixable in the view alone.
3. **One-click drafting needs no engine export.** `BoardRow.svelte` already receives
   `onpick(id, slot)`; w89 attaches a `Draft` button to exactly the three `top3` rows. The capability
   is already in the component's props.

So the cheapest high-value work is *not* the item everyone is queuing behind the Architect (the raw-key
export). It is the click path, and it is available now.

---

## 1 · The five I would build first (cheapest first)

### I17 · One-click drafting on the three ringed rows — *no export, no new prop*
**Evidence:** `BoardRow.svelte` props `{ r, onpick, oddsMeta, suggest }`; w89 `top3.has(...) ? ' zpb-ctabig' : ''`
on a per-row `Draft` button; cakepanz already exposes `canUndo` (DraftBoard props).
**Change:** when `suggest` is true, render a `Draft` button in the row's pick control that calls
`onpick(r.id, slot)` directly; keep `canUndo` as the safety net (undo instead of a confirm dialog).
**Cost/benefit:** ~1 button + 1 handler. Removes 2 of 3 interactions × ~32 picks ≈ 64 clicks per draft,
and it is exactly the affordance the Owner pointed at. **Architect's** (product), but small enough to
ride the next re-pin.

### I18 · The ring becomes advice: one clause, existing labels only
**Evidence:** `goneOdds` already computes the gone chance; `BoardRow` already prints `GONE%`; the engine
already returns the board order.
**Change:** on a ringed row, one short clause under the name — "last QB above +2.0 wins" / "next QB is
11 picks away" / "fills your weakest slot" — assembled from values already on the VM. No new semantics,
no new user-facing vocabulary (the Owner's one-word list carries the connective).
**Why now:** with one-click drafting (I17) the user acts on the ring immediately; an unexplained ring
plus a one-click button is worse than today's three-click ritual, because a mis-click is cheap.

### I19 · `?seed=` — but as a *code*, not a flag
**Evidence:** `App.svelte:109` `seed = 1000 + Math.floor(Math.random() * 9000)`; the only URL read is
`?dev` at `App.svelte:54`; Z.ai's own two runs diverged at the same pick (his 31 ringed vs my earlier 46)
because of it.
**Change (his item 1, with the user half specified):**
- `?seed=<code>` parses a short code (e.g. base-36 4 chars → 1.6 M states), falls back to random;
- the code is **displayed** (board footer, Complete screen, share card) and is the same string the URL takes;
- the resolved numeric seed is written into the record (which already stores `seed` — `saves.ts:27-31`),
  so a reported screen is replayable.
**Why the code matters:** a `?seed=1234` developer flag is unshareable; a "Draft #A3F2-7" is a support
token. This is v2's I16′ made concrete, and it is the precondition for deterministic batteries.

### I20 · Tiers when the display collapses — the honest board
**Evidence:** at pick 27 all 60 rows display `+0.0`; the printed grid cannot express the engine's 1e-9
ordering, so the ring's "top 3" is invisible as a distinction.
**Change:** when the 3rd and 4th rows print identically, render a tier boundary instead of 60 ranked rows:
"18 players at +0.0 — effectively tied; the board's three are X, Y, Z". Same data, no new semantics.
**Why:** this is the design answer if the Architect declines the raw-key export, and it makes the ring
honest either way. Owner's call on the wording.

### I21 · The delivery law becomes a script (three instances now)
**Evidence:** c9 missing `.gitignore`; c10 stale dist assets (Orcaink F1); c10 missing the nested
`slice1-battery.json` (this sitting). One class: a package applied to the wrong base.
**Change:** `tools/package-delivery.sh` must (1) copy the **previous artifact** to scratch, (2) apply its
own delta, (3) run both gates, (4) compare entry counts before/after, (5) refuse to emit on mismatch.
**Why:** three consecutive rounds, three manual catches. A script makes the class extinct and gives the
next relay a receipt instead of a discovery.

---

## 2 · Documentation and process (the class behind the three stale lines)

### I22 · Make `SHELL-STATUS.md` a build output, not prose
**Evidence:** the three stale lines all said "byte-identical" about two dists that differ; they survived
because a human wrote a measurement into a document and nobody re-ran it.
**Change:** `scripts/shell-status.mjs` measures (dist sha256 + bytes, gate results, `?seed` line,
`aria-describedby` count, the ring's ids at a frozen state) and **prints** SHELL-STATUS.md with a
`GENERATED <utc> — do not edit` banner. The doc becomes a receipt; "stale doc" stops being a defect class.
**Bonus:** it also resolves review F5 — the generator can rewrite the manifest's doc lines in the same
commit, so the hash manifest and the prose cannot disagree.

### I23 · A manifest that permits editing the documents it describes
**Evidence:** `CHECKSUMS.txt` lists md5s for the three doc files, so any compliant edit breaks three lines
(Z.ai's discrepancy #1, which I confirmed structurally).
**Change:** either exclude the doc layer from the hash manifest (it is covered by `gate-numerals`) or add a
`DOC` section regenerated by the same command that edits the docs. A guard that forbids the work it is
supposed to protect is a trap.

### I24 · Host the lane trio on `council/muse` (closes the one unverifiable line)
**Evidence:** `origin/council/muse:_agents/zai/` holds only `START-OF-CHAT-ZAI.md`; no branch carries a
prior `END-OF-CHAT-ZAI.md`, so "unchanged" cannot be checked (review F8).
**Change:** MUSE hosts `START-OF-CHAT-ZAI.md`, `ZAI.md`, `END-OF-CHAT-ZAI.md`; a relay's "unchanged" then
costs one `md5`. This is council infrastructure — mine to file with MUSE, not Z.ai's to fix.

---

## 3 · The board and the shell (the Owner's w89 signal, turned into structure)

### I25 · Nine cells without losing the a11y structure
**Evidence:** w89 row = Player · Pos · Team · OVR · Wins · Priority · Gone · Fills · action (9, no expand);
cakepanz = 7 + expand. The Owner prefers w89.
**Change:** keep cakepanz's 7 columns; move the two facts the expand exists for into the row —
the flex chips as one compact `FLEX` cell (they are already computed for the detail strip) and the gone%
method as a one-line subtitle under the name. The expand stays for the full text (a11y), but the common
case needs zero clicks. **Owner's call**; Architect's build.

### I26 · Six destinations, not fourteen
**Evidence:** w89 = 6 flat tabs + a dark toggle; cakepanz = a 14-button rail (TEAM · DRAFT · CARDS ·
SEASON · WEEK · STANDINGS · PLAYOFFS · AWARDS · REVIEW · STATS · BOOK · SHARE · GUIDE · SETTINGS), measured
by Z.ai; the cakepanz source on gh-pages is slice 2 (team → board), so the rail is his build tree.
**Change (cutover, Owner's call):** six top-level destinations — DRAFT · SEASON · PLAYOFFS · STATS ·
GUIDE · SAVES — with awards/review/book/share/settings as sub-screens of SEASON or a single "more" menu.
On a 390 px screen, fourteen equally-ranked destinations is a navigation tax paid on every screen.

### I27 · Keyboard-first drafting
**Evidence:** a draft is ~32 near-identical decisions; the row is already a `<button>`; `aria-live`
already appears twice in the dist.
**Change:** arrows/`j`/`k` move a visible focus among rows, `Enter` picks (respecting I17), `z`/Cmd-Z
undoes; an `aria-live` region announces "Three suggestions: X, Y, Z" when the ring changes.
**Why:** it is the cheapest a11y win available, it makes I17 safe (keyboard users get the same one-click
path), and it is the only way the board is usable at speed.

### I28 · The offline law, sharpened by this sitting's file:// boot
**Evidence:** Z.ai reports both dists booted from `file://` in his headless browser (incidental, not his
ordered receipt); my greps confirm no external refs, one inline module, no `<link>`, no `/assets/`.
**Change:** the law becomes `context.setOffline(true)` → `file://` → walk the five screens → assert zero
console errors and zero failed requests — and it re-runs against the **Vite 8** output at cutover, not
the 7 output. He proved the boot; the law is still missing.

### I29 · The ring invariant law, stated so it cannot be tautological
**Evidence:** L13 rebuilds its expectation with the same rounded parse the component uses
(`board.battery.mjs:90-98` in the c9 battery), so it asserts "the component matches the component".
**Change:** for a frozen state, assert
`ring == first3(sortBy(rawKey)) ∪ { i>3 : rawKey(row_i) == rawKey(row_3) }`
where `rawKey` is recomputed by re-running the engine's own sort on raw keys — never by parsing the DOM.
This is the one-line law that would have caught C′1, and it generalizes v2's I5″.

---

## 4 · What the numbers say about the trade (for the Owner's comparison, not for me to judge)

| | w89 (live) | cakepanz (Colors track) |
|---|---|---|
| bytes, single file | 1,922,769 | 527,162 (3.6× smaller) |
| cells per row | 9, no expand | 7 + expand |
| interactions per pick | 1 | 3 |
| rows on the board | 151 (expander) | 60 |
| suggestion rows | exactly 3, own Draft button | 3 → up to 60 (defect) |
| nav | 6 tabs | 14-button rail |
| a11y attrs | minimal | aria-expanded/controls/label on rows, aria-hidden tooltip |

cakepanz wins on weight, a11y structure and (once fixed) determinism; w89 wins on density, speed and
legibility. The Owner's preference is coherent with those numbers. None of the cakepanz advantages
requires the density loss — I25/I26 close most of the gap without giving up the a11y structure.

---

## 5 · What I would NOT do
- **Do not ship the ring fix without the law (I29).** A one-line fix with a tautological law is how this
  survived two sittings.
- **Do not add `raw: { wins, priority }` as two named fields** (review F2). One generic raw sort key, or
  the engine returning `suggest: string[]`. The named-field version guarantees the same bug on the next sort.
- **Do not build a stats framework before the four stat screens are specified** (v2, unchanged).
- **Do not touch `src/engine/` or the pin** — every idea above is `src/lib/`, `batteries/`, `scripts/` or docs.
- **Do not re-open the framework or the vapor question.** Both are closed with receipts.

## 6 · The one-line version for the Architect
Fix the ring in the view (raw sort key), ship one-click drafting on the ringed rows and undo as the
safety net, make the seed a visible shareable code, and turn SHELL-STATUS into a generated receipt —
then the shell is both faster than w89 and honest about what it ranked.