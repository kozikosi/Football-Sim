# UX — player browser pagination + clickable homepage header

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: capture the Owner's 22 Oct UX feedback as a proposal | DATE: 2026-10-22T19:10:00Z**

**Owner's words:** *"Again, it takes way too long to scroll to the bottom of the page on the player browser. Only 15 names should be visible so it is quick to get to the header… But I think that whatever header appears in V23, it needs to be clickable (at least somewhere quite obvious on it) and takes you back to the homepage."*

## 1 · Problem A — player browser renders all 1,200 rows at once

**WHERE** (Pre-Colors `40233d6b…`): the Player Browser tab, `initPlayerBrowser()` at l.720 and its render path (search for the `tbody`/`innerHTML` build in that section; the table has no paging). All 1,200 `PLAYERS` rows are in the DOM, so scrolling to the footer/nav takes a long time on phone.

**WHAT** (proposed, old → new): render **15 rows per page** with a small prev/next + page indicator above and below the table; keep sort and filters unchanged; keep the header visible. Default sort stays `ovr` desc.

**WHY:** scroll depth on a phone; the footer tools (`footnav`) sit below the table.

**SAFE ALONE?** Yes — UI only, no math, no protected constants.

**HOW TO CHECK:** `node _agents/minimax/tools/cdp-phone-check.mjs` (or manual at 390 px) — scroll to the footer in < 1 s; table shows exactly 15 rows; sort still works; no console errors.

## 2 · Problem B — header is not clickable

**WHERE:** `<header class="hero">` (l.317) in Pre-Colors; it carries the title and the "drafting-as" frame but no link.

**WHAT:** make at least one obvious region of the header a link to the homepage (Season view, the default tab). Preferred: the title and the drafting-as badge both act as "go home".

**WHY:** the Owner asks for obvious "back to homepage" affordance; currently the only way is the bottom nav.

**SAFE ALONE?** Yes.

**HOW TO CHECK:** click the header from any tab → lands on the Season tab; keyboard focusable; 390 px no overflow.

## 3 · Open design decision — the header itself

The Owner is open to a **complete rework** ("especially considering some of the tools you have available now" — Figma is now connected). Two options to put to him:

- **Option 1 (keep, patch):** keep the current `.hero` header, add the click target, light polish. Cheapest; preserves the existing visual language.
- **Option 2 (rework in Figma):** design a new shared header component in Figma (palette from the new authoritative table, role-based colours), then port it. Cost: one Figma file + one pass; benefit: a header that carries the new colour system instead of `var(--accent)`.

**My recommendation:** Option 1 now (fixes the click + pagination in the next build), Option 2 as a separate Figma-driven item (P3 of the work queue) so it does not block V23. If the Owner wants beauty first, Option 2 first — but then pagination waits.

## 4 · What I did not do

No product edit, no Figma file, no branch. This is a proposal; the Architect implements. The Owner's decision on header (Option 1 vs 2) is the only thing blocking.
