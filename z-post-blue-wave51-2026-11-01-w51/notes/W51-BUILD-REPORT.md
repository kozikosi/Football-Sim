# W51 BUILD REPORT — what changed, file by file, and how it was proven

Product: `Football-Sim-Z-post-blue-w51.html` · md5 `e40732a235aa621002bc268c59b36bd0` ·
1,571,506 bytes · base: the w50 bytes (md5 `babc5dc1c50f5b6253a9ee4919138cae`).

## The diffs (in file order)

| # | Surface | The change |
|---|---------|-----------|
| 1 | Replay CSS (`.zpb-rep-qchip`, `.zpb-rep-q`, `.zrl-t`) | The cream set narrows — the quarter chip and the quarter marks read `var(--text)`; only `.zrl-t` keeps `--zcream` |
| 2 | Replay `!important` law (the w50 block's tail) | The scoped cream rule pins `.zpb-replay .zrl-t` ALONE |
| 3 | Replay JS (`showEvent` TO/INT/FF) | `_cream` retires; `_toC = _offC` — the TO box reads the calling team, the INT and FF boxes read `_winC` (the interceptor / the forcing defense) |
| 4 | Replay JS (the score lines) | `.zrl-play` carries `style="color:_cl"` — the play words ride the offense |
| 5 | Both `clockOf` composers + the block stamp + the two drive-chart composers | The clock renders the middle dot (1Q 12·34, 4Q 0·00) |
| 6 | Both field maps (`zpbFieldMapHTML` + the player map) | `xrow([['NICKEL',…,-3],['DIME',…,3]])` — ONE station row, the dime mirrored right; the stale w47 comments retire |
| 7 | `#startDraftBtn` | `color:var(--text)` + the cream halo; the w51 block adds the takeover inks `--tTxM`/`--tTxMd` |
| 8 | The franchise pack (the vars builder + `ZPB_TOKEN_KEYS`) | New tokens `--tTxM` (txM) / `--tTxMd` (txMd) ride every takeover |
| 9 | The gold pill group rule | `#simSeasonBtn` leaves the group; `#nextWeekBtn,#nextRoundBtn,#zrepGo,#zpbRestGo,#goDraftResumeBtn,.zpb-sbfin-go,.zpb-goldcta` join it (+ the hover keeper for the class forms) |
| 10 | The old replay's dynamic Continue | `className = 'resetbtn zpb-goldcta'` |
| 11 | `--zshim` (the w43 block) | Light reads `--goldm` (#ad7f2e); dark keeps `--gold3` (#8a5f18), both paths |
| 12 | The fx gate (his named message) | `'NO. 1 SEED · FIRST-ROUND BYE!'` — ALL CAPS + the dot |
| 13 | The Position Rankings' group count line | `most valuable spots · ` — the colon retires at source |
| 14 | The intro builder (the JS) | `stageDeco` (two beams, the rays, seven embers — playoffs only, the beams fed `--beamA/--beamB` from each team's pack), the ring div, the flash's camera pop (`zpb-intro-ring.go` + `zpb-po-beat`), the per-player schedule `for(let b=0;b<Math.max(1,cnt);b++) setTimeout(flash, pairDelay(b))` |
| 15 | `<style id="zpb-w51-css">` (new block) | The takeover DRAFT inks, the star velvet (color-mix on `--zrb`), the beams/rays/embers/ring/heartbeat CSS, the vignette, the +16px title with the ◆ diamonds, the reduced-motion guard |
| 16 | `<script id="zpb-w51-js">` (new block) | THE DOT LAW — the boot sweep + the queuing mutation observer over text nodes and the three spoken attributes |

## The prove

- `w51_live.js` 25/25 (zero page errors) — the per-round asserts in `UPDATE-README-w51.md §Verify`.
- `w51_colon_live.js` — 0 displayed colons/semicolons at the prose-heaviest states, 0 page errors.
- The regression record: `w50_live` 28/29 (F3 retired by his words), `w50_nodecheck` 12/12,
  `w50_domcheck` 10/10, `w50_mobile` 3/3, `w47_map_check` 3/4 (the stack-under assert retired;
  the same geo proves the one-row law).
- The evidence shots: `notes/evidence/w51-*.png` (6 surfaces, both themes).

## §veto candidates for the next session

1. The w50 battery's F3 (quarter marks cream) is retired by the Owner's round-51 words — correct
   behavior, do not "fix".
2. The w47 map check's "the DIME stacks right under the NICKEL" assert is retired by the same
   words — the map twins share ONE row now; the depth chart and the editor keep the stacked rows
   (his round-50 law, untouched, C1–C4 still green).
3. `--zcream` survives but its jurisdiction is now `.zrl-t` alone — do not widen it back.
4. The SB intro's five-beat flash cadence (w39) is superseded by the per-key-player law — the
   flash count equals the key player count.
