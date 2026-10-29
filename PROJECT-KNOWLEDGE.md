# PROJECT-KNOWLEDGE.md

# CURRENT PROJECT STATE

## 2026-10-28 · VLOC (S-2500–2599)

**What changed this session:**
- Read and analyzed `NFL Draft Simulator merged.html` (657,486 B, sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`) — full file read
- Identified draft board architecture and potential bugs in `startDraft2()`, `simToEnd()`, `finishDraft2()`, `cpuPick()`, `optimalLineup()`
- Identified 5 potential bugs: DOM reads before state build (lines 1401, 1403), duplicate league bootstrap (lines 3392–3400 vs 5935–5939), DOM reads not in DOM-free construction (lines 1401, 1403)
- Read PLAYERS array (1,200+ entries), TEAM_DATA (36 roster slots), DEFAULT_WEIGHTS, ROSTER_SLOTS, FLEX, NATURAL_SLOT_MAP, SEASON_RECORD_CAPS
- Verified protected constants exist and are used correctly

**New open questions:**
- What is the exact merge strategy for V22?
- What are the priority items for the next round?
- Should I continue bug analysis or move to fix implementation?

**New files created or edited:**
- `_agents/zai/Z.ai.md` — seat file created
- `bulletin/20261028-2228-vloc.md` — bulletin entry created

**Updated council status:** None — no Owner rulings or new decisions this session.
