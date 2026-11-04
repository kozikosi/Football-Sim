# W67 UPDATE README — the Owner's nine UI items

**File:** `Football-Sim-Z-post-blue-w67.html` · md5 `ecf2b295b97739b88e7f60068b588b84` · 1,786,217 bytes
**Base:** the w66 bytes (`41d2cb10…`), built through a five-step asserted chain (every step pins the previous md5; rebuilt from the pristine baseline on every fix).

## What changed, item by item (the Owner's words → the landing)

1. **The two homepage dropdown bubbles are the same size.** One fixed box for both — 260px wide, 46px tall (bigger than either old default, as asked). The team face keeps the measured fit law: full name → city → abbreviation, never clipped, never a second line ("Washington Commanders" reads WASHINGTON, short names read in full). Tests: all 32 selections × desktop/mid/phone widths — the two bubbles measure equal width AND height after every single selection.

2. **The player browser stops flashing.** The cause was real: the phone stacker counted the infinite-scroll sentinel row (colspan=6) as ONE cell, so the stacked browser "fit with one column" and un-stacked itself, then re-stacked 150ms later — forever. The stacker now counts colspan-aware, and the browser table is marked never-stack: it keeps **the smaller, narrower panel** at every width, with a horizontal scroll so the SPD column is never silently cut. Reproduced before the fix (the flip fired every ~150ms at phone widths while idle), verified gone after.

3. **The Series subtitle on two lines** — exactly as written:
   `RANKING BY THE 7 MOST VALUABLE POSITIONS`
   `QB + CB1 + DE1 + CB2 + WR1 + DE2 + OT1`
   (the number tracks the series length; the old one-line "spots" face is gone).

4. **The FILLS dropdown in dark mode** — the closed button's text rode the light halfway ink (a dark navy for the Panthers). It now reads the same 0.50 **neutral** dropdown ink the popup options wear; dark-mode Panthers measure 11.77:1 (every one of the 32 teams ≥4.5:1 in dark, ≥4.0:1 in light).

5. **The player cards' pace.** First, the answer you asked for: **"The season in badges" runs at 0.6 seconds per badge** (each badge's delay = beat × 0.6s − 0.25s head start). Since you like that pace, the cards now ride **0.6 seconds per card** instead of 0.8 — and the "where your team lines up" map and the depth rows ride the exact same clock, so nothing drifts. The old 0.3s card beat and the stray 1s map beat (the source of the "erratic" feel) are retired.

6. **The Jaguars in dark mode — and every team tested.** The star cards on the pregame stage sit on a dark backdrop in BOTH themes, but their text rode light-tuned team inks (the Jaguars' teal, the Bills' navy — invisible). The stage now reads the **0.50 neutral halfway ink with the team tint**, and the 90+ shimmer sweeps that ink to cream instead of the light accent. The review's Key Players titles and shimmer rows swap to the dark-tuned ink in dark mode, and the **matchup-math bars** fill with the dark-tuned ink in dark (the Jaguars' bar: 7.57:1 against its track). Measured: 32 teams × light AND dark, on all four surfaces.

7. **The third key player vs the skip button.** The pregame stage now **ends at the footer** — the cinematic measures the footer's height at mount and stops the stage above it (the w66 top clamp's mirror), and at short windows the crests/title/gaps compress so all three face-off rows fit fully above the line. Swept at 800×640, 761×700, 900×640, 1000×620, 1120×600 and 390×844: no row clipped, nothing over the skip button or the bottom line.

8. **SIM SEASON / SIM GAME sit next to 100 SEASONS.** The upper line was `space-between`, which floated the sim doors mid-panel. It is now one left-aligned cluster — NEW DRAFT · 100 SEASONS · SIM GAME · SIM SEASON · BACK TO SEASON shoulder to shoulder (10px gaps, one height — the 100-SEASONS door wears the SIM GAME size), with the "Can you go 20-0?" line keeping the far right.

9. **SIM PLAYOFFS vs BEGIN PLAYOFFS on the review page.** SIM PLAYOFFS left the big-button law (the same retirement SIM SEASON made in w65). Measured on the live page: BEGIN PLAYOFFS 216×50 @16px — the big filled pill; SIM PLAYOFFS 126×40 @12.8px — clearly smaller, as you asked.

## Verification
- 23 inline script blocks · SYNTAX OK
- w67_owner: 40 pass / 0 fail (run twice) — the clocks, the two-liner, the cluster, the clearance sweep, the dark star inks, the bars, the review buttons, the bubbles
- w67_teams: 8 pass / 0 fail — the fills dropdown, the star meta ink, the kp-title, the matchup bars: 32 teams × light and dark, contrast-measured
- the flash probe: the browser holds ONE panel size at 500/620/740/761 with zero flips
- zero page errors through two full simulated seasons

## In the package
`Football-Sim-Z-post-blue-w67.html` · `UPDATE-README-w67.md` (this file) · `CHECKSUMS.txt` · `notes/W67-INTAKE-LEDGER.md` (your words, verbatim) · `notes/W67-BUILD-REPORT.md` (the full proof) · `tools/` (the chain + the batteries) · `shots/` (the evidence) · `_agents/zai/` (START-OF-CHAT REV 23 · ZAI.md · END-OF-CHAT)
