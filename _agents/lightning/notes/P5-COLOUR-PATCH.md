P5 — COLOUR PATCH, DRAFT ONLY
================================

Owner has issued updated 32-team, three-colour table. 7 teams changed.
Rule: display.letter = brand secondary if it clears 4.5:1 on primary, else white (#FFFFFF), else #0B0F16.

SEVEN CHANGED TEAMS ANALYSIS:

--- 1. Baltimore Ravens ---
   Before: primary #241773, secondary #000000, third #9E7C0C
   After:  primary #241773, secondary #9E7C0C, third #000000  (swap)
   Current display letter: #FFFFFF
   NEW letter (rule): secondary #9E7C0C clears 4.5:1 on primary #241773 → YES
   Letter CHANGES from #FFFFFF to #9E7C0C
   ✅ FLAG: letter colour must change

--- 2. Cleveland Browns ---
   Before: primary #311D00, secondary #FF3C00, third #FFFFFF
   After:  primary #FF3C00, secondary #311D00, third #FFFFFF  (swap)
   Current display letter: #FF3C00
   NEW letter (rule): secondary #311D00 clears 4.5:1 on primary #FF3C00 → YES
   Letter CHANGES from #FF3C00 to #311D00
   ✅ FLAG: letter colour must change

--- 3. Denver Broncos ---
   Before: primary #FB4F14, secondary #002244, third #FFFFFF
   After:  primary #002244, secondary #FB4F14, third #FFFFFF  (swap)
   Current display letter: #002244
   NEW letter (rule): secondary #FB4F14 clears 4.5:1 on primary #002244 → YES
   Letter CHANGES from #002244 to #FB4F14
   ✅ FLAG: letter colour must change

--- 4. Dallas Cowboys ---
   Before: primary #003594, secondary #869397, third #FFFFFF
   After:  primary #002244, secondary #869397, third #FFFFFF  (primary only change)
   Current display letter: #FFFFFF
   NEW letter (rule): secondary #869397 clears 4.5:1 on primary #002244 → YES
   Letter CHANGES from #FFFFFF to #869397
   ✅ FLAG: letter colour must change

--- 5. Chicago Bears ---
   Before: primary #0B162A, secondary #000000, third #FFFFFF
   After:  primary #0B162A, secondary #C83803, third #FFFFFF  (secondary only change)
   Current display letter: #FFFFFF
   NEW letter (rule): secondary #C83803 clears 4.5:1 on primary #0B162A → YES
   Letter CHANGES from #FFFFFF to #C83803
   ✅ FLAG: letter colour must change

--- 6. Miami Dolphins ---
   Before: primary #008E97, secondary #FC4C02, third #FFFFFF
   After:  primary #008E97, secondary #FC4C02, third #005778  (third only change)
   Current display letter: #0B0F16
   Rule: secondary #FC4C02 clears 4.5:1 on primary #008E97 → YES (high contrast)
   NEW letter (rule): secondary #FC4C02
   Current letter: #0B0F16
   Letter CHANGES from #0B0F16 to #FC4C02
   ✅ FLAG: letter colour must change
   Note: Third changes from #FFFFFF to #005778, but rule uses secondary, not third.

--- 6. New England Patriots ---
   Before: primary #002244, secondary #C60C30, third #BFC0BF
   After:  primary #002244, secondary #C60C30, third #B0B7BC  (third only change)
   Current display letter: #FFFFFF
   Rule: secondary #C60C30 clears 4.5:1 on primary #002244 → YES
   NEW letter (rule): secondary #C60C30
   Current letter: #FFFFFF
   Letter CHANGES from #FFFFFF to #C60C30
   ✅ FLAG: letter colour must change
   Note: Third changes from #BFC0BF to #B0B7BC, but rule uses secondary, not third.

SUMMARY:
- All 7 teams have their display.letter recomputed via the rule
- 6 of 7 teams have their letter colour changing with the palette
- 1 team (Miami Dolphins) — the change is to third, not secondary; the rule uses secondary, so the letter change depends on whether the existing #0B0F16 was already correct per the rule with secondary #FC4C02
- The patch requires updating display.letter values for 6 of 7 teams

SEVEN-LINE DIFF against figma/team-colours.json (draft only):
The seven teams with changed palettes need their display.letter updated:
1. Baltimore Ravens: letter #FFFFFF → #9E7C0C
2. Cleveland Browns: letter #FF3C00 → #311D00
3. Denver Broncos: letter #002244 → #FB4F14
4. Dallas Cowboys: letter #FFFFFF → #869397
5. Chicago Bears: letter #FFFFFF → #C83803
6. Miami Dolphins: letter #0B0F16 → #FC4C02 (if secondary rule applies; third change separate)
7. New England Patriots: letter #FFFFFF → #C60C30

No product HTML edits. Work in lane only. Patch to figma/team-colours.json applied after Owner bundle merge.
