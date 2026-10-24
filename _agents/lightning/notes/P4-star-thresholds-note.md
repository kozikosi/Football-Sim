## P4 Star-Thresholds Verification — V22 Open Queue

**Item P3 (actually P4 per Owner ruling 22 Oct):** star-selection logic:
- 60 rushing yards for all players
- QBs need >=300 yards and 3:1 TD:INT

**Build inspected:** `NFL Draft Simulator merged.html` sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48` (656,746 B, V22)

**Code inspection findings** (VERIFIED via code analysis, no edits):
- `starsParagraph(g, blow)` function (line ~3027 in minified build):
  - RB mention: `s.rushYds>=20` triggers rushing yards report (NOT 60)
  - QB output: passYds, passTD, int displayed; `s.rushYds>=20` triggers rushing mention (NOT 300 or 3:1 ratio)
  - WR/TE: `s.recYds>=30` triggers reception report
- `fragSeasonStars(F)` function (line ~5595 in minified build):
  - Uses `teamPlayerStats(F.user)`, filters by `PRIMARY_SLOTS`, sorts by rating
  - No 60-yd or 300-yd/3:1 TD:INT gates found
- `PRIMARY_SLOTS = new Set(['QB','RB1','WR1','WR2','TE1','DE1','DE2','DT1','DT2','MIKE','WILL','CB1','CB2','SS','FS'])` — line ~1
- `impact>=1.0` filter used for game recap stars

**Ruling spec vs current build:**
- Ruling: 60 rush yds for all players; QB >=300 yds + 3:1 TD:INT
- Current: rushYds>=20 for RB mentions; no 300-yd or 3:1 TD:INT gate
- **Differential: thresholds not implemented in current build**

**No product edits.** Verification via code inspection only. Hash + line references cited. Claim: VERIFIED — state of code inspected against owner ruling spec.

**Lane:** `_agents/lightning/` only. No shared document edits beyond CHRONICLE.md entry and bulletin post.
