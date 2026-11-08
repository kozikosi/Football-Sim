# W85 — ROUND 3 (the Owner's chat, 2026-11-08)

**File:** `Football-Sim-Z-post-blue-w85.html` · md5 `eb91abd22f335e34f6898dcff5e6dde6` · 1,864,914 B
**Base:** w79 (the gh-pages pin — the newest pushed wave, the one the Owner calls w78).
The rejected w55-based rebuild is retired. The best of both now lives in one file.

## What this round does
1. **The base is the real one.** The Draft Command Center, Cutdown Day, the per-round SIM
   PLAYOFFS cinematics, the ALL/CLEAR pills, the chip law, the median rating scale, the 0.60
   light ink, the BACK TO <STAGE> bars — all recovered from the w79 base itself.
2. **The Owner's five comments this chat:**
   - the ALL/CLEAR shape stays the w78 pill (base);
   - the Cutdown Day panel is gone from the preseason (it lives only in the Draft Command Center);
   - the lineup changer never shows "…" — the row goes fully vertical the moment the full name
     stops fitting, and back when it fits again;
   - the preview's key players keep their teams apart on a phone (two team sides);
   - SIM PLAYOFFS is the w78 door: one cinematic page per round, no during-game panels, loss →
     straight to the Super Bowl.
3. **The surviving w85 systems ported onto the base:** the stage banner that waits for the
   page's own button to scroll away; the per-week autosave with the exact-stage restore bubble;
   the AFC #7 seed; the shrunk preview badges; the larger pregame cinematic; the light-mode star
   cards; the boxless preseason dropdowns; the stage-advance scroll resets.

## Verify
`node tools/w85r3_battery.js` → 24/24 PASS (console clean). Screenshots in `shots/`.

## Changed since the last w85 zip
- the whole base (w55 → w79): +228 KB of the Owner's shipped features;
- `scripts/build_w85_r3.py` — the asserted patch script that built this file from the w79 pin.
