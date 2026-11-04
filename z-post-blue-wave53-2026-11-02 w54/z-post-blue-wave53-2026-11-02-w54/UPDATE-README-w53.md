# UPDATE-README-w53 — the mobile pass, shipped whole

Product: `Football-Sim-Z-post-blue-w53.html` · md5 `512d1885ac0a69120bedcaf8e9041f2b` · 1,586,055 bytes
Base: the w52 bytes `40613b81…` (1,585,036 B). Received 2026-11-02 · your session mandate:
review everything · run a lot of tests · optimize for mobile · isolate the engine seam for Claude.

Nothing you can see changed. Everything your thumb feels did.

## What the session did

**W1 · Reviewed everything.** Bootstrapped exactly per START-OF-CHAT REV 13; re-verified the
§4 anchors by hash (w52 `40613b81…` ✓ · w51 `e40732a2…` ✓); read the w52 ledger, build report,
update README and the style guide before touching anything.

**W2 · Ran a lot of tests.** All six standing batteries against the UNTOUCHED w52 first —
12/12 · 10/10 · 30/30 · 25/25 · 5/5 · 64/64, zero pageerrors — then a NEW wide probe written
this wave (`tools/w53_mobile_probe.js`): every view (home, draft, players, rankings, groups,
compare, guide) at 320 / 360 / 390 / 430 px, measuring document overflow, tap-target sizes,
sub-12px fonts and clipped elements. On w52 it scored 31/32 — the one FAIL was real.

**W3 · The mobile pass (three moves, +1,019 bytes — the smallest wave ever):**

- **WM1 · The touch polish.** No text inflation on rotate · no grey tap flash (the site paints
  its own states) · no double-tap zoom delay on the controls. Desktop-invisible.
- **WM2 · The thumb floor table completes.** Your 38px floor table forgot two controls: the
  player browser's All-Positions button (was 31px — an older block still said 30) and the
  floating Draft-as/Draft-pick selectors (36px). Both join the table's own 38px floor; the
  guide's bare accordion rows grow a 40px thumb row. Phones only.
- **WM4 · The rankings page stops panning sideways at 320px.** Root-caused layer by layer:
  the nowrap team rows feed a 306px intrinsic minimum up through the panel, the layout, the
  view, into the site container — which then overflows the smallest phones by 6px. `min-width:0`
  does NOT cut that feed (measured); the footnav's own w43 cure does: `contain:inline-size`.
  Safety-probed first (zero positioned descendants to re-anchor). The team rows now scroll
  inside the panel exactly like the draft tables always have. This respects your w43 law —
  small windows may still pan when something genuinely cannot compress; on this page something
  always can now.

**W4 · The Claude seam (your "isolate more code or instructions").**
`CLAUDE-HANDOFF/HANDOFF-TO-CLAUDE-w53.md` renews the w36 handoff for the w52/w53 series: every
engine contract re-verified in the actual bytes (all 39 functions, each exactly once), the new
flag contract, the look-gate law, the soft spots, the battery map. Plus
`CLAUDE-HANDOFF/engine-seam.json` — the same contract machine-readable for his tooling.

## Verify (this wave's proof)

- `tools/w53_nodecheck.js` — 12/12 · every script block parses.
- `tools/w53_syncbattery.js` — 10/10 · the M1 one-clock sync law intact.
- `tools/w53_live.js` — 30/30 · every w52 law intact on the new bytes (the clock ink, the
  badges, the champions, the bars, the SB flow, the bracket @, the unit report).
- `tools/w51reg_live.js` — 25/25 · every standing law intact (the draft inks, the dot law, the
  map twins, the continue pill, the beneficiary colors, the shimmer cascade).
- `tools/w53_evidence.js` — 64/64 · all 32 teams × both themes.
- `tools/w53_mobile.js` — 5/5 · the 390px battery.
- `tools/w53_mobile_probe.js` — **32/32** · every view × 320/360/390/430 · zero document
  overflow · zero pageerrors (w52 scores 31/32 on the same probe — the gap is the WM4 fix).
- Product: md5 `512d1885ac0a69120bedcaf8e9041f2b` · 1,586,055 bytes.

## Flagged for your ruling (P2 proposals only — nothing was changed)

1. The 9–11.8px micro-labels (ANCHOR/LEAK · the WR/QB position chips · the compare position
   letters · the team cell) — a phone-only +0.5–1px lift would help tired eyes; your design,
   your call.
2. Boot reads ~3.2s cold in the headless harness — within tolerance; the safe lever (if you
   ever want faster) is trimming duplicate payload CSS, never deferring the engine.

## Standing-law notes for the next session

1. The w53 additions ride UNDER the standing laws — the compress-first containment on the
   rankings panels is now part of the mobile law: any panel added to `#viewRankings .layout`
   needs `min-width:0;contain:inline-size` or the 6px pan returns.
2. The thumb floor table is the single source of phone tap heights: add new controls to the
   ≤760px block, never to the older 600px-era sweep (that drift is what this wave repaired).
3. The w50/w51/w52 laws (the draft inks, the continue pill, the map twins, the beneficiary
   colors, the dot law, the clock ink, the one-clock sync) verified intact — never re-widen.
