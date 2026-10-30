// Drive generator for Colors v1 (seeded, engine-pure, no DOM/Math.random).
// Produces drive sequences that hit targets from P-205: ~10.5 drives/game,
// ~6.0 plays/drive, ~31 yards/drive, Sc% ~39.5%, TO% ~10.5%, TD~22%, FG~14%, Punt~40%.

import type { Rng } from './rng.ts';

export interface DrivePlay {
  down: number;
  dist: number;
  type: 'run' | 'pass';
  yards: number;
  result?: 'sack' | 'int' | 'fumble';
}

export interface Drive {
  startYard: number; // 1-99
  plays: DrivePlay[];
  yards: number;
  time: number; // seconds
  result: 'TD' | 'FG' | 'PUNT' | 'INT' | 'FUMBLE' | 'DOWNS' | 'END_HALF' | 'END_GAME' | 'SAFETY';
  points: number;
}

export interface DriveModel {
  drivesPerGame: number;
  playsPerDrive: number;
  yardsPerDrive: number;
  secondsPerDrive: number;
  tdRate: number;
  fgRate: number;
  puntRate: number;
  turnoverRate: number;
  pointsPerDrive: number;
}

export const DEFAULT_DRIVE_MODEL: DriveModel = {
  drivesPerGame: 10.5,
  playsPerDrive: 6.0,
  yardsPerDrive: 31.0,
  secondsPerDrive: 166,
  tdRate: 0.22,
  fgRate: 0.14,
  puntRate: 0.40,
  turnoverRate: 0.12,
  pointsPerDrive: 2.11,
};

function playYards(rng: Rng, type: 'run' | 'pass', down: number): number {
  if (type === 'run') {
    const r = rng.next();
    if (down === 1 || down === 2) {
      if (r < 0.15) return -1;
      if (r < 0.25) return 0;
      if (r < 0.45) return 2;
      if (r < 0.65) return 4;
      if (r < 0.80) return 6;
      if (r < 0.90) return 8;
      return 12;
    } else {
      if (r < 0.20) return -1;
      if (r < 0.35) return 0;
      if (r < 0.55) return 1;
      if (r < 0.75) return 2;
      if (r < 0.90) return 4;
      return 6;
    }
  } else {
    const r = rng.next();
    if (r < 0.10) return -1; // sack
    if (r < 0.15) return 0;  // incomplete
    if (r < 0.30) return 4;
    if (r < 0.50) return 8;
    if (r < 0.70) return 12;
    if (r < 0.85) return 16;
    if (r < 0.95) return 20;
    return 30;
  }
}

export function generateDrive(rng: Rng, startYard: number = 25): Drive {
  const r = rng.fork('drive');
  const plays: DrivePlay[] = [];
  let yard = startYard;
  let down = 1;
  let dist = 10;
  let time = 0;
  
  for (let playNum = 0; playNum < 12; playNum++) {
    const passProb = down >= 3 ? 0.65 : 0.45;
    const type = r.next() < passProb ? 'pass' : 'run';
    const yds = playYards(r.fork(`play${playNum}`), type, down);
    time += 25 + Math.floor(r.next() * 15);
    
    plays.push({ down, dist, type, yards: yds });
    yard += yds;
    
    if (yds <= 0 && type === 'pass' && r.next() < 0.08) {
      return { startYard, plays, yards: yard - startYard, time, result: 'INT', points: 0 };
    }
    if (yds <= 0 && type === 'run' && r.next() < 0.02) {
      return { startYard, plays, yards: yard - startYard, time, result: 'FUMBLE', points: 0 };
    }
    
    if (yard >= 100) {
      return { startYard, plays, yards: yard - startYard, time, result: 'TD', points: 6 };
    }
    
    if (yds >= dist) {
      down = 1;
      dist = 10;
      if (yard >= 70 && r.next() < 0.3) break; // near goal
    } else {
      down++;
      dist -= yds;
      if (down > 4) {
        if (yard >= 65) {
          return { startYard, plays, yards: yard - startYard, time, result: 'FG', points: 3 };
        }
        if (r.next() < 0.40) {
          return { startYard, plays, yards: yard - startYard, time, result: 'DOWNS', points: 0 };
        }
        return { startYard, plays, yards: yard - startYard, time, result: 'PUNT', points: 0 };
      }
    }
    
    if (time > 200) break;
  }
  
  if (yard >= 100) return { startYard, plays, yards: yard - startYard, time, result: 'TD', points: 6 };
  if (yard >= 65 && r.next() < 0.7) return { startYard, plays, yards: yard - startYard, time, result: 'FG', points: 3 };
  if (r.next() < 0.5) return { startYard, plays, yards: yard - startYard, time, result: 'PUNT', points: 0 };
  return { startYard, plays, yards: yard - startYard, time, result: 'END_HALF', points: 0 };
}

export function generateGameDrives(rng: Rng, drives: number = 21): Drive[] {
  const result: Drive[] = [];
  const r = rng.fork('gamedrives');
  for (let i = 0; i < drives; i++) {
    const startYard = 20 + Math.floor(r.next() * 40);
    result.push(generateDrive(r.fork(`d${i}`), startYard));
  }
  return result;
}
