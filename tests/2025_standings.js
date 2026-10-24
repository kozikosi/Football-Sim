// tests/2025_standings.js — real 2025 NFL regular-season standings; ground truth for validate.js (S-502).
// Row: [teamName, wins, losses, ties, pointDiff]. teamName == TEAM_DATA keys exactly.
// Compiled 2026-10-19 by the GLM session (S-203). Two independent sources fetched the same day;
// they agree on W-L-T-PF-PA for all 32 teams (no uncertain rows):
//   1. NFL.com league standings, season 2025 regular season — https://www.nfl.com/standings/league/2025/REG
//   2. Wikipedia, "2025 NFL season", § 6 Regular season standings
// Scope: the 2025 NFL regular season only (Sep 4, 2025 – Jan 4, 2026). pointDiff = PF − PA per source.
// Integrity (S-203 log): 32 rows · every row 17 team-games (272 games total) · ΣW=ΣL=271 · ΣT=2 (DAL, GB) · ΣPF=ΣPA=12,519 · Σnet=0.
module.exports = [
	["Arizona Cardinals", 3, 14, 0, -133],
	["Las Vegas Raiders", 3, 14, 0, -191],
	["NY Jets", 3, 14, 0, -203],
	["Tennessee Titans", 3, 14, 0, -194],
	["NY Giants", 4, 13, 0, -58],
	["Cleveland Browns", 5, 12, 0, -100],
	["Washington Commanders", 5, 12, 0, -95],
	["Cincinnati Bengals", 6, 11, 0, -78],
	["Kansas City Chiefs", 6, 11, 0, 34],
	["New Orleans Saints", 6, 11, 0, -77],
	["Dallas Cowboys", 7, 9, 1, -40],
	["Miami Dolphins", 7, 10, 0, -77],
	["Atlanta Falcons", 8, 9, 0, -48],
	["Baltimore Ravens", 8, 9, 0, 26],
	["Carolina Panthers", 8, 9, 0, -69],
	["Indianapolis Colts", 8, 9, 0, 54],
	["Tampa Bay Buccaneers", 8, 9, 0, -31],
	["Detroit Lions", 9, 8, 0, 68],
	["Green Bay Packers", 9, 7, 1, 31],
	["Minnesota Vikings", 9, 8, 0, 11],
	["Pittsburgh Steelers", 10, 7, 0, 10],
	["Chicago Bears", 11, 6, 0, 26],
	["Los Angeles Chargers", 11, 6, 0, 28],
	["Philadelphia Eagles", 11, 6, 0, 54],
	["Buffalo Bills", 12, 5, 0, 116],
	["Houston Texans", 12, 5, 0, 109],
	["Los Angeles Rams", 12, 5, 0, 172],
	["San Francisco 49ers", 12, 5, 0, 66],
	["Jacksonville Jaguars", 13, 4, 0, 138],
	["Denver Broncos", 14, 3, 0, 90],
	["New England Patriots", 14, 3, 0, 170],
	["Seattle Seahawks", 14, 3, 0, 191],
];