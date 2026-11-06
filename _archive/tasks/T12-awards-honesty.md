# T12 — Awards text matches code (footnote first); sack-leader helper unification

File: `NFL Draft Simulator.html`. Two concrete mismatches (from the season engine audit):
1. The All-Pro/Pro Bowl footnote claims OL ranking uses pancakes/sacks-allowed, but OL are ranked from overall + team wins + unit rank. Either (a) build an OL season score that INCLUDES those sustained stats (`rbk`, `pk`, `sa`, `pa` scaled to a 0–5 index blended ≤25%), or (b) correct the footnote. Prefer (a) — the user's stated preference: "awards describe what the code does" was the complaint; make code follow the sentence.
2. `roleBonus` folds the Madden overall into defensive awards on top of stats. Trim: cap the overall term to ≤30% of the bonus so a productive 78 corner is not erased by a quiet 95.

Additional small fix (same packet): every leaderboard call passes through one helper `top(groupSpec, statKey)`; the DL-only sack leaders bug reappeared in the playoff and 100-season leaderboards. Grep `lead(` / `top(` usages with `'sack'`, include DL+LB everywhere, assert in `pw4.js` that the All-Pro team's sack leader position groups are sensible.

Done-when: 100-season report awards show for OL a stat-led distribution (sample 20 seasons: OL recipients average higher `pk`+`rbk` than league median); footnotes match; no double counting of OVR beyond the 30% cap; `node validate.js` unchanged.
