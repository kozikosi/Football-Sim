SPEAKER: MUSE | ROLE: Council Advisor | TASK: P-001-P-006 review for Claude | DATE: 2026-11-01T09:10Z
FOR: P-001, P-002, P-003, P-004, P-005, P-006 (all P0, Owner's 23-24 Oct V23 requests)
REVIEW-OF: the items themselves (no WORK files exist in inbox for any of them)
VERDICT: SUPERSEDED — all six are stale relative to the shipped w52 product. Details below.
WHY: Claude's Colors v1 merge (engine under Z.ai's shell) must follow the CURRENT law —
the w52 product + intake ledgers (rounds 1-52) — not these 23-24 Oct items. Four are
fulfilled-or-superseded by shipped waves; two directly contradict current law.

PER-ITEM FINDINGS (evidence: Football-Sim-Z-post-blue-w52.html, md5 40613b81de26b5ed9c67bdcc0637ac6f):

P-001 Homepage (moving 20-0 header, DRAFT button, floating selectors, footer, guide fade)
  STATUS: SUPERSEDED. The fifth wave (Owner): home page keeps NO text but the wordmark —
  every other piece lives on the Guide; tiny lowercase "see guide for details" hint above
  the footer. The 24 Oct spec's floating selectors / guide panel / step line describe a
  homepage that no longer exists. Claude should take w52's home as the spec.

P-002 Brand 20-0 in header, footer, <title>, every copy occurrence
  STATUS: PARTIALLY SUPERSEDED. Header/title/copy: still law. Footer: the 20-0 was
  REMOVED from the footer by the Owner's third wave ("it stays in the title, header
  marquee and copy"). The item as written ("in header, footer") is wrong on the footer.

P-003 Theme tokens (rose/gold/white, light+dark, contrast table)
  STATUS: SUPERSEDED. The spec is no longer "Beam's rose-gold-white-dark prototype" —
  it is the shipped w52 token system (cascade-resolved, incl. the w50 halfway-ink law:
  light --text is #8e5566). Lifted verbatim into amused as framework-free data
  (apps/web/src/lib/design/tokens.ts, 3 tests pass). Claude should reference the w52
  <style id="zpbtheme"> + the w49/w50 override sheets, not the prototype.

P-004 Team theming (chosen team's 3 hexes transform the app)
  STATUS: FULFILLED in w52 — do not re-derive. ZPB_TEAM_COLORS (the Owner's 22 Oct table)
  + zpbPackFor (accessible tone math, halfway inks) is the implementation, lifted into
  amused and verified var-by-var (2,624 values, 0 mismatches). Known open item: the pack
  still measures the retired cream paper (Z.ai confirmed: fix rides the Owner's round).

P-005 Draft board clean-up (no 'Value here', 'Flex x (-y)', etc.)
  STATUS: FULFILLED in w52. 'Value here': 0 occurrences. 'Fits as'/'also fits': 0.
  The Flex label ships as `Flex ${slot} (-${pen})` (verified in the board template).
  The Cooper DeJean FS-flex glitch the item asks about is moot under the REV 4 flex
  guide (QB-only-FS at -10; ENGINE-MATH-SPEC).

P-006 Player browser (15 per page, sticky filters, ...)
  STATUS: SUPERSEDED + CONTRADICTS current law. "15 per page" is not the law: the pager
  UI is hidden (`.pagbtn,.paginfo{display:none !important}` — "removals safety: no stray
  pager") and emptied at render (`pager.innerHTML=''`). The REV 13 handoff's "all 1,200
  players in one scrollable panel" is the direction. Claude should NOT build "15 per page".

RECOMMENDATION FOR CLAUDE:
  Treat P-001-P-006 as HISTORICAL. The Colors v1 shell spec is the w52 product
  (md5 40613b81…) + the intake ledgers, not these items. Suggested PRIORITIES.md
  housekeeping (Owner/Architect to approve): mark P-001-P-006 SUPERSEDED-BY-W52, or
  consolidate into one line "w52 shell is the UI spec (see intake ledgers 1-52)".
  I did not edit PRIORITIES.md — re-ranking is Owner/Architect only.

HOW TO CHECK: grep the w52 file for the quoted strings above; compare against
  _agents/zai/deliveries/COPY-PASTE-KIT-w52.md and the w50/w52 intake ledgers.
EVIDENCE: VERIFIED — all counts above are from the shipped w52 bytes, 2026-11-01.
