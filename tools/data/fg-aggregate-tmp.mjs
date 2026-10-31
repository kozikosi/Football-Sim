const seasons = {
  '2020': [
    { team: 'ATL', FGM: 38, Att: 40, fg: [0,0, 11,11, 12,11, 9,8, 8,8, 0,0], long: 54 },
    { team: 'MIA', FGM: 36, Att: 39, fg: [1,1, 8,8, 7,7, 14,12, 9,8, 0,0], long: 56 },
    { team: 'DAL', FGM: 34, Att: 41, fg: [1,1, 5,5, 13,13, 13,12, 8,3, 1,0], long: 59 },
    { team: 'LV', FGM: 33, Att: 35, fg: [0,0, 18,18, 8,8, 5,3, 4,4, 0,0], long: 54 },
    { team: 'IND', FGM: 32, Att: 37, fg: [0,0, 10,10, 13,12, 11,9, 3,1, 0,0], long: 53 },
    { team: 'NYG', FGM: 31, Att: 32, fg: [0,0, 4,4, 13,13, 9,9, 6,5, 0,0], long: 55 },
    { team: 'CHI', FGM: 30, Att: 32, fg: [0,0, 9,9, 10,10, 10,9, 10,9, 3,2, 0,0], long: 55 },
    { team: 'CAR', FGM: 29, Att: 36, fg: [0,0, 12,11, 10,10, 8,7, 4,1, 2,0], long: 56 },
    { team: 'BUF', FGM: 28, Att: 34, fg: [1,1, 9,9, 9,6, 9,8, 5,4, 1,0], long: 58 },
    { team: 'DEN', FGM: 28, Att: 35, fg: [0,0, 6,6, 5,4, 8,8, 14,10, 2,0], long: 58 },
    { team: 'TB', FGM: 28, Att: 31, fg: [1,1, 10,10, 9,9, 9,7, 2,1, 0,0], long: 50 },
    { team: 'CIN', FGM: 27, Att: 34, fg: [0,0, 3,3, 15,13, 10,8, 6,3, 0,0], long: 55 },
    { team: 'HOU', FGM: 27, Att: 31, fg: [0,0, 8,8, 9,9, 8,6, 6,4, 0,0], long: 54 },
    { team: 'WAS', FGM: 27, Att: 34, fg: [0,0, 5,5, 8,7, 17,13, 4,2, 0,0], long: 51 },
    { team: 'BAL', FGM: 26, Att: 29, fg: [0,0, 8,8, 7,6, 9,9, 4,3, 1,0], long: 55 },
    { team: 'NE', FGM: 26, Att: 28, fg: [0,0, 6,6, 7,7, 12,11, 3,2, 0,0], long: 51 },
    { team: 'KC', FGM: 25, Att: 27, fg: [2,2, 7,7, 9,9, 5,3, 4,4, 0,0], long: 58 },
    { team: 'LA', FGM: 24, Att: 30, fg: [0,0, 7,6, 11,10, 10,7, 2,1, 0,0], long: 51 },
    { team: 'LAC', FGM: 24, Att: 33, fg: [0,0, 8,8, 6,6, 13,8, 6,2, 0,0], long: 53 },
    { team: 'SEA', FGM: 24, Att: 24, fg: [0,0, 2,2, 7,7, 13,13, 1,1, 1,1], long: 61 },
    { team: 'NO', FGM: 23, Att: 28, fg: [0,0, 6,5, 10,10, 9,7, 3,1, 0,0], long: 53 },
    { team: 'ARI', FGM: 23, Att: 30, fg: [0,0, 5,5, 7,6, 15,10, 3,2, 0,0], long: 56 },
    { team: 'PIT', FGM: 23, Att: 24, fg: [0,0, 6,6, 7,7, 10,9, 1,1, 0,0], long: 59 },
    { team: 'SF', FGM: 22, Att: 26, fg: [0,0, 3,3, 8,7, 11,10, 4,2, 0,0], long: 52 },
    { team: 'DET', FGM: 21, Att: 28, fg: [0,0, 4,4, 7,7, 7,4, 10,6, 0,0], long: 59 },
    { team: 'NYJ', FGM: 21, Att: 28, fg: [0,0, 7,6, 10,9, 6,3, 5,3, 0,0], long: 55 },
    { team: 'TEN', FGM: 20, Att: 28, fg: [0,0, 3,2, 6,5, 11,6, 8,7, 0,0], long: 55 },
    { team: 'CLE', FGM: 19, Att: 24, fg: [0,0, 5,5, 6,4, 12,10, 0,0, 1,0], long: 46 },
    { team: 'JAX', FGM: 18, Att: 25, fg: [0,0, 5,4, 7,6, 4,2, 8,6, 1,0], long: 59 },
    { team: 'GB', FGM: 16, Att: 16, fg: [1,1, 1,1, 5,5, 5,5, 4,4, 0,0], long: 57 },
  ],
  '2021': [
    { team: 'LV', FGM: 40, Att: 43, fg: [0,0, 11,10, 12,12, 13,12, 7,6, 0,0], long: 56 },
    { team: 'NE', FGM: 36, Att: 39, fg: [0,0, 9,9, 11,11, 11,11, 8,5, 0,0], long: 53 },
    { team: 'PIT', FGM: 36, Att: 40, fg: [0,0, 9,9, 9,8, 13,11, 9,8, 0,0], long: 56 },
    { team: 'BAL', FGM: 35, Att: 37, fg: [0,0, 7,7, 9,9, 15,13, 5,5, 1,1], long: 66 },
    { team: 'MIN', FGM: 33, Att: 38, fg: [0,0, 8,8, 12,11, 9,7, 9,7, 0,0], long: 55 },
    { team: 'LAR', FGM: 32, Att: 34, fg: [0,0, 6,6, 15,15, 8,7, 5,4, 0,0], long: 55 },
    { team: 'PHI', FGM: 30, Att: 33, fg: [0,0, 7,7, 10,10, 13,10, 3,3, 0,0], long: 58 },
    { team: 'ARI', FGM: 30, Att: 37, fg: [0,0, 11,11, 11,9, 5,3, 7,6, 3,1], long: 62 },
    { team: 'CIN', FGM: 29, Att: 34, fg: [0,0, 5,5, 9,9, 9,6, 11,9, 0,0], long: 58 },
    { team: 'DAL', FGM: 29, Att: 35, fg: [0,0, 5,5, 16,15, 9,7, 4,2, 1,0], long: 56 },
    { team: 'IND', FGM: 29, Att: 35, fg: [0,0, 7,7, 11,9, 15,13, 2,0, 0,0], long: 48 },
    { team: 'NYG', FGM: 29, Att: 33, fg: [0,0, 5,5, 13,12, 5,5, 10,7, 0,0], long: 55 },
    { team: 'BUF', FGM: 28, Att: 32, fg: [0,0, 15,15, 8,7, 5,4, 4,2, 0,0], long: 57 },
    { team: 'KC', FGM: 28, Att: 32, fg: [0,0, 3,3, 14,13, 6,5, 9,7, 0,0], long: 56 },
    { team: 'WAS', FGM: 28, Att: 32, fg: [0,0, 10,10, 5,5, 14,10, 4,3, 0,0], long: 58 },
    { team: 'ATL', FGM: 27, Att: 29, fg: [0,0, 8,8, 9,9, 7,6, 5,4, 0,0], long: 54 },
    { team: 'SF', FGM: 27, Att: 32, fg: [0,0, 7,7, 6,6, 13,9, 6,5, 0,0], long: 56 },
    { team: 'CAR', FGM: 26, Att: 29, fg: [0,0, 10,10, 3,3, 11,10, 5,3, 0,0], long: 57 },
    { team: 'CHI', FGM: 26, Att: 30, fg: [0,0, 10,10, 5,5, 13,11, 1,0, 1,0], long: 47 },
    { team: 'DEN', FGM: 26, Att: 31, fg: [0,0, 8,7, 6,6, 8,8, 8,4, 1,1], long: 61 },
    { team: 'DET', FGM: 26, Att: 30, fg: [0,0, 4,4, 11,11, 12,10, 3,1, 0,0], long: 52 },
    { team: 'TEN', FGM: 26, Att: 32, fg: [0,0, 5,5, 12,12, 14,8, 1,1, 0,0], long: 51 },
    { team: 'GB', FGM: 25, Att: 34, fg: [0,0, 9,9, 13,9, 8,4, 4,3, 0,0], long: 54 },
    { team: 'NO', FGM: 25, Att: 30, fg: [0,0, 8,8, 13,11, 5,5, 4,1, 0,0], long: 52 },
    { team: 'LAC', FGM: 24, Att: 27, fg: [1,1, 8,8, 6,6, 9,8, 3,1, 0,0], long: 50 },
    { team: 'MIA', FGM: 23, Att: 31, fg: [0,0, 6,6, 9,7, 10,8, 6,2, 0,0], long: 51 },
    { team: 'HOU', FGM: 21, Att: 27, fg: [0,0, 7,7, 5,5, 6,3, 8,5, 1,1], long: 61 },
    { team: 'JAX', FGM: 21, Att: 27, fg: [0,0, 7,7, 7,7, 5,3, 8,4, 0,0], long: 56 },
    { team: 'NYJ', FGM: 21, Att: 27, fg: [0,0, 8,8, 8,8, 8,5, 4,1, 0,0], long: 51 },
    { team: 'SEA', FGM: 17, Att: 23, fg: [0,0, 2,2, 11,9, 5,3, 5,3, 0,0], long: 53 },
    { team: 'CLE', FGM: 16, Att: 22, fg: [0,0, 3,3, 5,5, 10,4, 4,4, 0,0], long: 57 },
  ],
};

function aggregate(seasons) {
  const buckets = { '1-19': [0,0], '20-29': [0,0], '30-39': [0,0], '40-49': [0,0], '50-59': [0,0], '60+': [0,0] };
  let fgm = 0, att = 0, longMade = 0, longAtt = 0;
  for (const s of seasons) {
    for (let i = 0; i < 6; i++) {
      buckets[['1-19','20-29','30-39','40-49','50-59','60+'][i]][0] += s.fg[i*2]; buckets[['1-19','20-29','30-39','40-49','50-59','60+'][i]][1] += s.fg[i*2+1];
    }
    fgm += s.FGM; att += s.Att; longMade += s.long === null ? 0 : s.fg[10]; longAtt += 0;
    // for long bucket, we only have some teams with makes/atts for 60+; use per-season sums
  }
  // For simplicity, recompute long bucket from data pattern: fg[10] and fg[11] are makes/atts for 60+
  const longMadeAll = seasons.reduce((a,s)=>a+s.fg[10],0);
  const longAttAll = seasons.reduce((a,s)=>a+s.fg[11],0);
  const totAtt = seasons.reduce((a,s)=>a+s.Att,0);
  const fgAll = seasons.reduce((a,s)=>a+s.FGM,0);
  const fgPct = fgAll/totAtt*100;
  return { buckets, fgAll, totAtt, fgPct, longMadeAll, longAttAll };
}

for (const [yr, data] of Object.entries(seasons)) {
  const agg = aggregate(data);
  console.log(yr, JSON.stringify(agg));
}
