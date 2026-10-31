// The league: 32 teams in 8 divisions (the NFL's real alignment; names match data/madden27-ratings.csv).
export type Conf = 'AFC' | 'NFC';
export type Div = 'East' | 'North' | 'South' | 'West';
export const DIVS: readonly Div[] = ['East', 'North', 'South', 'West'];
export interface TeamDef { name: string; conf: Conf; div: Div }
const t = (conf: Conf, div: Div, names: string[]): TeamDef[] => names.map((name) => ({ name, conf, div }));
export const TEAMS: readonly TeamDef[] = [
  ...t('AFC', 'East', ['Buffalo Bills', 'Miami Dolphins', 'New England Patriots', 'NY Jets']),
  ...t('AFC', 'North', ['Baltimore Ravens', 'Cincinnati Bengals', 'Cleveland Browns', 'Pittsburgh Steelers']),
  ...t('AFC', 'South', ['Houston Texans', 'Indianapolis Colts', 'Jacksonville Jaguars', 'Tennessee Titans']),
  ...t('AFC', 'West', ['Denver Broncos', 'Kansas City Chiefs', 'Las Vegas Raiders', 'Los Angeles Chargers']),
  ...t('NFC', 'East', ['Dallas Cowboys', 'NY Giants', 'Philadelphia Eagles', 'Washington Commanders']),
  ...t('NFC', 'North', ['Chicago Bears', 'Detroit Lions', 'Green Bay Packers', 'Minnesota Vikings']),
  ...t('NFC', 'South', ['Atlanta Falcons', 'Carolina Panthers', 'New Orleans Saints', 'Tampa Bay Buccaneers']),
  ...t('NFC', 'West', ['Arizona Cardinals', 'Los Angeles Rams', 'San Francisco 49ers', 'Seattle Seahawks']),
];
export const TEAM_BY_NAME: Readonly<Record<string, TeamDef>> = Object.fromEntries(TEAMS.map((x) => [x.name, x]));
export function divisionTeams(conf: Conf, div: Div): string[] { return TEAMS.filter((x) => x.conf === conf && x.div === div).map((x) => x.name); }
