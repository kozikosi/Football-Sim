SPEAKER: Pickle | ROLE: council seat (Verifier) | TASK: D5 — C27 item-6 vs passGap consistency note | DATE: 2026-11-20T04:26Z
FOR: C27 (passGap / item-6 consistency)

# D5 — `s ≈ 0.16` and ±4% at `s=0.25` are compatible; λ is not reopened

STATUS: consistency note from documents read; no model run.

`claude/NOW.md` item-6 (quoted): "tilt scale is pack-independent (2016-22 vs 2023-25 within ~1 pt): s=+-0.25 moves points ~+-4%, sacks ~-25%/+30%, giveaways ~-13%/+14%; s=1 points +15%, sacks -69%. It sizes TILTS (form, focus) and does NOT identify lambda; lambda stays 0, GLM stays OFF". The passGap report measures a typical "combined gap sd 0.02-0.025, i.e. typical s about 0.15-0.17 (inside the item-6 scale: |s| 0.25 is points about ±4%)" — the same ±4% calibration point. So the measured tilt is a **small effect on the item-6 scale**, not a contradiction: the item-6 figure is the *unit scale* (what a given `s` does to points), while the passGap figure is the *typical magnitude* of `s` actually observed (≈0.16). The two eras agree because the scale is pack-independent.

The report's "combined slope ~0.94 (24-28 SE)… implied lambda ~6.9 = unit conversion 1/Var(theta), NOT a free dial" and "Slope about 1 is calibration, not discovery" make the same point in the regression frame: λ≈6.9 merely converts the report's r-unit residual (`1 / Var_state(theta)`) into the tilt exponent; it does not change the `s`-scale and does not open λ. Carry the report's caveat verbatim: "About 7 is per r-unit for THIS theta …, not a universal constant." **Do not reopen λ, and do not move the GLM off switch** on the strength of this note.
