export type Row = { id: string; name: string; pos: string; ovr: number; gp: number; rating: number; yds: number; td: number; int: number; fp: number };
const POS = ['QB','RB','WR','TE','OL','DL','LB','DB','K'];
export const rows: Row[] = Array.from({ length: 32 }, (_, i) => ({ id: 'p' + i, name: 'Player ' + (i + 1), pos: POS[i % 9], ovr: 60 + ((i * 7) % 38), gp: 1 + (i % 17), rating: 50 + ((i * 13) % 50), yds: 100 + ((i * 137) % 1400), td: (i * 3) % 14, int: i % 9, fp: 10 + ((i * 5) % 30) }));
