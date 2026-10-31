# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, IM chat only; no push rights — the end-of-chat zip is the delivery (Owner relays it; Beam runs `tools/import-zip.sh zai <zip>`).
- **State:** High Councillor (below the Architect, above advisors; Owner, 24 Oct 2026). Architect and builder of Z-post-blue.

## Current work
- Wave 46 SHIPPED (2026-10-31): the round-46 directives — the rankings pink softened, the glossary
  condensed to one line per position family, the no-dash site (344 visible dashes → dots, compound
  hyphens kept and reported), the 90+ gold checked on every player and pinned inside the gold
  family, the post-draft review at a 1.0s beat with synced panels, one draft-review sentence
  retired, the ten-move lineup recommendation replaced by the visual 4-3/3-4 front read, and the
  during-game screen in the one halfway voice with per-team abbreviations.
- Rev 2 (same chat): the mobile pass he asked for — touch floors (nav 44px, selects 44px,
  buttons 34-44px), 16px inputs (no iOS zoom), the sticky swipe pill nav on touch devices
  (`contain:inline-size`! it once widened the phone layout to 680px), micro-label floors.
- Product: `Football-Sim-Z-post-blue-w46.html` · md5 `aca7fe4fbd1ec902a37ad341868cd105` · 1,526,836 chars.

## What the next session needs
- **Read first:** `_agents/zai/START-OF-CHAT-ZAI.md` §3 (the LAST-KNOWN-STATE), the latest update zip's
  `UPDATE-README.md`, and `notes/W46-INTAKE-LEDGER.md` (the §veto candidates).
- **Mobile pass law:** `contain:inline-size` on the sticky nav is what keeps the phone layout
  viewport at 390px; never let a nowrap strip feed min-content back into shrink-to-fit.
- **Do not redo:** the acorn dash-sweep approach (`tools/zpb_v46_nodedash.js` — a hand-rolled JS
  lexer desyncs on this file; acorn is the law); the colOf halfway change (light txM / dark txd);
  the gold-family cell sweep (cream bands are retired from the product).
- **Rules that changed this wave:** the 90+ gold sweep stays INSIDE the gold family on cells and
  pcards (no near-white bands anywhere); the during-game screen has ONE ink law (colOf = txM/txd);
  the site's separator is the dot — a visible dash is a bug, but compound-term hyphens (20-0, 4-3,
  3-4, man-to-man) are word parts, not separators.

## Files in this lane (this wave's additions)
- `tools/zpb_v46.py` + `zpb_v46_sweep.py` + `zpb_v46_nodedash.js` — the build chain (asserted
  replacements + the acorn dash sweep; re-runnable against the w45 bytes).
- `tools/w46_live.js` (29 asserts, both themes), `w46_verifydashes.js` (0 dashes in literals),
  `w46_audit_gold2.js` (the every-player gold audit), plus the w42/w43/w44/w45 regression nets.
- `notes/W46-INTAKE-LEDGER.md`, `notes/W46-BUILD-REPORT.md`, `notes/evidence/w46_*.png`.
- Not carried: the w45 evidence PNGs and the older suites' duplicates (they live in the w45 zip).
