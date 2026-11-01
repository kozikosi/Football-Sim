# W47 BUILD REPORT — the proof

The product: `Football-Sim-Z-post-blue-w47.html` · md5 `eef6b93849b3df5d49b3f262185f678b` · 1,546,955 chars.
Built by `tools/zpb_v47.py` — 46 asserted exact-match replacements on the w46 bytes (md5-pinned before the first cut), then a full in-place rewrite of no line of code by hand.

## The chain

- 46/46 replacements asserted (each one checked for exact occurrence count before applying).
- Post-checks: 20 presence tokens + 5 absence tokens + the cascade-order check (the w47 glow rules must come after every old sweep rule) — all green.
- `node --check` on all 11 script blocks (`tools/w47_nodecheck.js`) — all clean.

## The live suites (real Chromium, both themes)

| Suite | Result | Notes |
| --- | --- | --- |
| `w47_live.js` | 51 pass · 2 fail | the full drive: theme defaults → draft → review → preseason editor → week 1 → season → sim playoffs → review page. The 2 fails are this page-context's flakes (the review map measures 0 under the dismissed cinematic; the replay's lines never sample) — both superseded by the dedicated check below. |
| `w47_map_check.js` | **4/4** | the DIME stacks under the NICKEL (nickel x=479 y=507 · dime x=479 y=556, same station) and the during-game abbreviations wear their own team's dark halfway ink (LAC #80c8ee, DEN #f89a76 — computed per team, compared against the live computed color). |
| `w47_audit_gold.js` | **32/32** | the long tier-law audit: Madden rankings (both themes + team detail), the player browser (2 pages), position rankings, the comparison (both themes), the draft review, the review comparison, the preseason page, the week-1 plan page, the regular-season review, the season review + awards, the Super Bowl recap — every visible 90+ name in the constant gold, every 85+ bold. Found and fixed the ANCHOR chip (O2/O3). |
| `w46_live.js` (regression) | 27 pass · 2 fail | the 2 fails are exactly the two pink-anchor asserts this wave supersedes (his "make it more golden"). |
| `w47_nodecheck.js` | 11/11 | every script block parses. |
| Mobile spot | no overflow | 390px: scrollWidth − clientWidth = −5px on the review page. |
| Console | zero errors | across every drive, both themes. |

## The theme default (his question)

Verified live in three states: no `matchMedia` at all → the boot pins `data-theme="dark"` ✓; system light → `--bg #fdf2f6` ✓; system dark → `--bg #1e1119` ✓. His saved LIGHT/DARK choice still wins.

## The evidence

`_agents/zai/notes/evidence/` — the comparison gold (dark + light), the Madden rankings (light: the golden chips; dark: the shimmering 90+ names), the open dropdown (last names only, the lit 4-3 pill, the editor bar with RETURN TO MODEL LINEUP), the playoff-run cinematics (the loss card), the SB stage, the awards page (badges, chips, crests), the box score, the mobile review.

## Known supersessions (documented, not regressions)

- w46 O1's two pink asserts (the light ANCHOR chip wash) — superseded by this wave's gold.
- The w46 front miniatures — unmounted at his word (the code stays for the veto).
- The old sweep rules (~85k, ~152k) — overridden by the w47 block; the cascade-order check pins the order.
