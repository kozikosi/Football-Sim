# W61 INTAKE LEDGER — the Owner's words, verbatim, item by item

Wave 61 (the Owner's count) · received 2026-11-03 (HST) · four directives in one message.
**BASELINE GAP (flagged):** the Owner's w60 bytes are NOT reachable from the sandbox —
`council/zai` tops out at w55, `council/vl` at w58 (`Football-Sim-Z-post-blue-w58.html`,
md5 `7d1e07ddb8b23ef6f03968a8fe26d6cc`, 1,661,434 bytes). The build therefore stands on the
w58 bytes; w59/w60 deltas are unknown. Every w61 replacement asserts its exact anchor text
and fails loudly on any other baseline — if the Owner sends the w60 file, the SAME generator
re-runs against it and the wave re-ships with no re-derivation.

## A · The four directives

> "The where your players line up is perfect in full size window but the players fold on top of each strangely when the window is super small. I really don't want you to alter the positions of the players because it took us a long time to get it looking right on desktop. I think maybe the whole panel should just disappear if the window size can't let the 5 offensive linemen be on the same line. It just becomes confusing and inaccurate after that. Can you implement that so that it appears just like it normally does if the window size is big enough but if the window size is too small the enter where your players line up panel disappears? We would still keep the player cards below the same."
- **Zero desktop change** — the stations (`--x` laws, the w29/w30/w33/w37 placement) are untouched; no position moves.
- The panel = the `WHERE YOUR PLAYERS LINE UP?` block: the h4 + the `zpbBelongMapHTML` field map inside one `.panel` (the YOUR ROSTER tab, `renderYourRosterTab`), plus the same h4+map pair in the expandable row detail (`fillDetail` — the draft pick wears the field, w27/w36).
- The map's widest row is the line-of-scrimmage row: 10 cells (WR4 WR1 TE1 OT1 OG1 C OG2 OT2 WR3 WR2 — the five OL in the middle). The row is flex `nowrap`, so a too-narrow window makes the cells collide ("fold on top of each") — the fold breaks the formation's truth.
- Fix: a single media-query kill — below the measured width where the row can no longer hold the five OL on one line, the whole panel `display:none`. The player cards below (YOUR FULL DEPTH CHART, `zpbDepthZonesHTML`) stay exactly as they are.
- Interpretation (veto flag 1): the threshold is measured on the live page (cell-box collision test at descending widths), not guessed — and it rounds UP to a clean breakpoint so the last visible state is still a clean one.

> "Also there is a weird glitch where my SAM Von Miller is written in bold red (playing as the KC Chiefs) instead of the black that everyone else is written in. I would prefer if you change the black and that red to a more natural color that still fits in the team's theme, the 0.50 color is probably best."
- Root cause on the w58 bytes: the depth-zone rows (`zpb-dz`, YOUR FULL DEPTH CHART) carry `zpbRowVars`, which sets `--tA2` to the team's halfway ink — but the plain name span `.zpb-dz-name` has NO color rule (it inherits the page's near-black), while an 85+ name adds `.zpb-vib`, whose generic rule paints `var(--tA2)` + `font-weight:800`. On the Chiefs that halfway ink reads red: Von Miller bold red, everyone else black.
- Fix (the Owner's law): BOTH inks become "the 0.50 color" — the team's halfway ink `txM` (light) / `txd` (dark) — the exact one-ink law the draft cards already wear (w42/w43/w56: `--nm`/`--nmS` light, `--nmd`/`--nmSd` dark). The 85+ name keeps its BOLD (the tier law); only the tint retires. The 90+ shimmer is untouched.
- Interpretation (veto flag 2): scoped to the depth-zone player cards (the surface he named — the cards below the map). The draft board cards, the field map's own ink law and every other surface already carry their own laws and are not touched.

> "The 'Can you go 20-0?' also folds weirdly underneath 'NEW DRAFT' AND '100 SEASONS' ON A SUPER SMALL WINDOW. I WOULD PREFER IT BE ON IT'S OWN LINE ABOVE EVERYTHING (RIGHT BELOW THE MOVING 20-0 HEADER) IN THE CASE OF WINDOW SIZE COMPRESSION."
- Root cause: the review header row (`renderDraftResults`) is a flex `space-between` — left `#zpbDraftOps` (NEW DRAFT, and 100 SEASONS appends INTO the same span), right the `Can you go 20-0?` tagline. On a super small window the wrap drops the tagline UNDER the buttons.
- Fix: below the measured fold width the row goes `column-reverse` — the tagline (last in DOM) paints FIRST: its own full-width line, directly under the moving 20-0 marquee header, above NEW DRAFT / 100 SEASONS. Full-size windows: byte-identical layout.
- Interpretation (veto flag 3): "above everything" = above the NEW DRAFT/100 SEASONS row on THAT screen (the review page). The home hero's tagline already sits above its buttons and is not touched.

> "In general keep testing and auditing yourself and all of my rules to make sure everything looks as good on mobile as possible."
- The standing audit: the w61 battery re-runs the phone sweep (430/390/360/320/280), the desktop live check (1280 — the review header and the linescore must stay unchanged), nodecheck, and the storage rig; new evidence shots for every law this wave.

> "I haven't tested your storage features yet but please continue to improve them and follow any updated guidance."
- The standing guidance (the Phase 0 plan, §6 + the w58 NEXT ACTION): the screen wiring WAITS for the Architect's E2 envelope types (then E3's week API, E1's pids, E5's version stamps). No wiring this wave — the guidance is followed, not overridden.
- The honest improvements available now: re-run the 25-check fault rig green on the new bytes, re-verify the ?storage=1 walkthrough on the phone widths (320/280), and fix anything the audit catches.

## B · The build contract

- Baseline: `Football-Sim-Z-post-blue-w58.html` md5 `7d1e07ddb8b23ef6f03968a8fe26d6cc` (newest reachable; see the flag above).
- Generator: `tools/zpb_w61.py` — asserted exact replacements + post-checks; re-runs clean from the pristine baseline on every iteration.
- Batteries: `tools/w61_nodecheck.js` · `tools/w61_mobile.js` · `tools/w61_live.js` · the w57 storage rig re-run (`tools/w61_storage.js`).
- Delivery: `z-post-blue-wave61-2026-11-03-w61.zip` — the product, CHECKSUMS, this ledger, the build report, the tools, the shots, the refreshed lane docs.
