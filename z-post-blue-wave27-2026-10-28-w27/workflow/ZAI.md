# ZAI — lane file (rewrite at the end of every session, never append)

## Identity
- **Seat:** ZAI · **Model / how reached:** Z.ai, chat only: no git push (sandbox reads GitHub via public HTTPS); work reaches GitHub via the Owner, `tools/import-zip.sh zai`, or `tools/seat-save.mjs`. · **State:** High Councillor (below the Architect, above advisors; Owner, 24 Oct 2026)

## Current work
- 2026-10-28 chat (session 19): **wave 27 shipped** — the Owner's full round-27 list (30 directives): both Brave SETBACKs fixed at the root (Guide `_zpbAdjCache` undefined on 3-4 restore; Madden Rankings `#totalwt` written before `buildControls()` — both now guarded and self-healing, fault-reproduced in the verify suite); Position Rankings UNDEFINED killed (3-tuple vs 4-slot template) + THE SERIES restored to the dropdown (1–26) with Series step 9 as the default and latching spot buttons; Player Browser XF removed, names+numbers in team colors both themes (new `--tnd` token), Bills/Rams blues lifted; Team Comparison panels behind every cell + bold law + never-a-partial-word dropdown labels (full → city → abbr, measured); draft table WINS/PRIORITY verified visible at 1280/1024/900; X.Y enlarged to 1.55rem; Dime depth-chart chip normalized; top-priority DRAFT button pulse; WELCOME/20-0 cinematic retimings; Draft Review top roster list replaced by the **Where they belong** field map (initials; Nickel+Dime on the slot line between CBs and LBs); FB into skill positions; Guide reordered (Coaching 3rd open, Badges 4th, Board 5th open + Wins/Priority/Gone visualized as badge cards), flex-menu swaps (OT-C-OG, CB-FS-SS-ND), defense viz recolored (Nickel #4f86e0, Dime #7fd67f, filled Dime), season-badges paragraph + ROY/CPOY lines removed, player-panel example values finally executed (PassY 5,000 · TD 50 · INT 15 · 20-0 158.3 · RushY 250 · SK 25 · QBR 100 · W 20); no horizontal panning on any tab at 1280/390.
- Product: `Football-Sim-Z-post-blue-w27.html` md5 `b2adf669cc7e6fd07868e56c3c70c0af` (1,352,103 B). View-layer only; engine untouched. Verify: 57/57 + 13/13, zero console errors.

## What the next session needs
- Read first: this file; `START-OF-CHAT-ZAI.md` §3; `docs/w27-intake.md` (the 30-line mapping + open interpretations the Owner may veto).
- If the Owner reports a new bug: reproduce it in the verify-suite style FIRST (the two Brave SETBACKs of w27 were both reproduced in-suite before fixing — keep that standard).
- The w27 build chain is self-contained: `tools/w27_patch.py` rebuilds w27 from a pristine w26 byte-for-byte (md5-asserted).

## Do not redo
- The w26→w27 root-cause work: Brave SETBACK mechanisms are documented above and in the intake; the `--tnd` dark-theme team token and the `fitFace` dropdown measurement are site-wide primitives now — reuse, don't reinvent.
- The 2026-10-28 free-tier facts and stack advisory (pinned in the w26 advisory + this lane's earlier rewrites).

## Files in this lane
- `deliveries/` Z.ai's documents (stack advisory, style guide, handoff, playbook, reweight brief, governance, wisdom, build report)
- `tools/` build scripts (incl. the w27 chain), CSS/JS payload parts, verify suites
- `docs/` intake ledgers (w26 §A–§J, w27 30-line)
- `evidence/` per-wave screenshots
- `workflow/` START-OF-CHAT-ZAI.md · END-OF-CHAT-ZAI.md · this file

## Rules that changed
- NO EMOJIS anywhere in the product (Owner, w26) — the remaining ★ (star markers) and ✕ (close button) are typographic symbols and were retained; if the Owner rules otherwise, sweep them.
- Tier law stays: 90+ shimmering · 85+ bold/vibrant · everyone else neutral, not bold, in team colors — enforced by test on player browser, comparison and roster preview.
- No horizontal panning at any width, enforced by test (html-level `overflow-x: clip` + flex containment).
