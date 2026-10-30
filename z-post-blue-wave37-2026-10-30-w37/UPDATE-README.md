# UPDATE — Z-post-blue w37 (2026-10-30)

## What this package is
The complete wave-37 build of the single-file product, plus Z.ai's lane (ledger, build report, tools, evidence).

## The file that matters
`Football-Sim-Z-post-blue-w37.html` — md5 `8625e4ff02dc7d5e1245711b6d74c8af` (1,461,211 B). Verify against `CHECKSUMS.txt`.
Built on the w36 bytes (`d0e06392e359ec0dd95caf95a918852d`, CHECKSUMS-verified before the first cut) — no reconciliation needed this round.

## What changed since w36 (the Owner's round-37 directives, verbatim-mapped)
1. **Gone% never reads 100** — the display caps at 99% (one choke point behind the board column and both preview surfaces; the model's numbers are untouched).
2. **The Draft Review players wait for the cinematic** — the cards and the map's bubbles hold until the opening cinematic starts fading out (~6.9 s); any later render releases them at once.
3. **WR4 to the other side of WR1** — the left flank, `--x:-6.2` (the mirror of WR2's +5); every other station untouched. A clamp keeps a flank bubble from ever hanging off the row, and phones fall back to wrapped rows.
4. **Gorden reads at nickel** — two cures: the nickel station now RESOLVES its player (a `zpbNickelOf` beside the w27 dime resolver — the lookup read a `NICKEL` key no roster carries), and the bubble ink is computed against the REAL bubble paint for BOTH themes (the team-color takeover remaps `--rose` per franchise; the light ink and the dark ink ride the bubble together, so a theme flip never needs a rebuild). The legend's position names lift to the bright gold in dark mode.
5. **The season cinematics cover first** — the veil starts OPAQUE on its first paint (the preview beneath is revealed by the fade-OUT, never shown before it). One rule cures the SEASON OPENER, every rivalry line, and every playoff round opener.
6. **The intro names spread around the middle panel** — each team's best on the top and the bottom, the others on opposite sides; every name owns a station, the font steps down until a long name fits its lane. No more stacking on one spot.
7. **The center panel runs wider** — 640px (was 560) and the play text WRAPS: the `[xY]` badge can never become `[…]`, mobile included.
8. **The YES door leads** — YES above Cancel (the flex orders swapped; the same shape in the caution dialog).
9. **The regular awards are rows again** — the w19 horizontal format restored (the w32 grid was crushing them into towers); the playoff panels keep their own format.
10. **The honors lead the season review** — the HONORS EARNED zone is the FIRST zone of the rail, and the review's celebrations (confetti, the made-the-playoffs word, the wins word) wait for the honors to land. The books overlay already ran the honors-first law — untouched.
11. **The playoff rewards wait for the final whistle** — a celebration never fires over a cinematic; it queues and drains at the replay's end (the w32 streak law, extended to every reward).
12. **Skip shows the whole game report** — every remaining play lands instantly, the last drives and blocks included, and the final reads the TRUE score. The 0-0 partial is gone.
13. **The Season Review button leads the champion page** — top right, above the banner.
14. **The unit report card lines are text again** — the old metric-board bar rule (a 3px block) was eating the tiles' text lines; the reset wins the cascade.

## Verify
- `tools/w37_verify.js` **132 PASS / 0 FAIL** (five consecutive greens) · `tools/w37_stress.js` **57-62 PASS / 0 FAIL** (six runs: four seeded — 2031, 777, 424242, 2026 — two random) · live Chromium probe **all green** · phone pass **all green** (overflow 0px on five views) · **11** evidence shots in `_agents/zai/notes/evidence/`.

## Interpretations awaiting the Owner's veto
See `_agents/zai/notes/W37-INTAKE-LEDGER.md` §Interpretations (thirteen items).
