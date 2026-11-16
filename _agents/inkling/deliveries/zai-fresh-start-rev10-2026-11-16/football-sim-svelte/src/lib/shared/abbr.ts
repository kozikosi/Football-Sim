// Slice 4 — presentation-only maps (no engine data invented; display shaping lives in the UI per the
// view-model rule "plain JSON out; names map at the mapper").
// abbr: the NFL tricodes (the w88 feed shows compact abbr chips — the badge format needs the short form).
// Source: the league's own names → their standard tricodes, one row per team, checked against league.ts.
import type { TeamDef } from '../engine/sports/nfl/engine/league.ts';

const ABBR: Readonly<Record<string, string>> = {
  'Arizona Cardinals': 'ARI', 'Atlanta Falcons': 'ATL', 'Baltimore Ravens': 'BAL', 'Buffalo Bills': 'BUF',
  'Carolina Panthers': 'CAR', 'Chicago Bears': 'CHI', 'Cincinnati Bengals': 'CIN', 'Cleveland Browns': 'CLE',
  'Dallas Cowboys': 'DAL', 'Denver Broncos': 'DEN', 'Detroit Lions': 'DET', 'Green Bay Packers': 'GB',
  'Houston Texans': 'HOU', 'Indianapolis Colts': 'IND', 'Jacksonville Jaguars': 'JAX', 'Kansas City Chiefs': 'KC',
  'Las Vegas Raiders': 'LV', 'Los Angeles Chargers': 'LAC', 'Los Angeles Rams': 'LAR', 'Miami Dolphins': 'MIA',
  'Minnesota Vikings': 'MIN', 'New England Patriots': 'NE', 'New Orleans Saints': 'NO', 'NY Giants': 'NYG',
  'NY Jets': 'NYJ', 'Philadelphia Eagles': 'PHI', 'Pittsburgh Steelers': 'PIT', 'San Francisco 49ers': 'SF',
  'Seattle Seahawks': 'SEA', 'Tampa Bay Buccaneers': 'TB', 'Tennessee Titans': 'TEN', 'Washington Commanders': 'WAS',
};

export const abbrOf = (name: string): string => ABBR[name] ?? name.slice(0, 3).toUpperCase();
export const abbrMapFor = (teams: readonly TeamDef[]): Record<string, string> =>
  Object.fromEntries(teams.map((t) => [t.name, abbrOf(t.name)]));
