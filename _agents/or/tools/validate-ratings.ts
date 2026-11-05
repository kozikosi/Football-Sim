#!/usr/bin/env node
import * as fs from 'node:fs';
import * as crypto from 'node:crypto';

const POSES = ['QB', 'HB', 'FB', 'WR', 'TE', 'LT', 'RT', 'LG', 'RG', 'C', 'DT', 'LEDG', 'REDG', 'MIKE', 'WILL', 'SAM', 'CB', 'SS', 'FS', 'K', 'P', 'LS'];
const TEAMS = [
  'Buffalo Bills', 'Miami Dolphins', 'New England Patriots', 'NY Jets',
  'Baltimore Ravens', 'Cincinnati Bengals', 'Cleveland Browns', 'Pittsburgh Steelers',
  'Houston Texans', 'Indianapolis Colts', 'Jacksonville Jaguars', 'Tennessee Titans',
  'Denver Broncos', 'Kansas City Chiefs', 'Las Vegas Raiders', 'Los Angeles Chargers',
  'Dallas Cowboys', 'NY Giants', 'Philadelphia Eagles', 'Washington Commanders',
  'Chicago Bears', 'Detroit Lions', 'Green Bay Packers', 'Minnesota Vikings',
  'Atlanta Falcons', 'Carolina Panthers', 'New Orleans Saints', 'Tampa Bay Buccaneers',
  'Arizona Cardinals', 'Los Angeles Rams', 'San Francisco 49ers', 'Seattle Seahawks',
  'Free Agent',
];
const HEADER = 'name,pos,team,ovr,spd,str';
const LINE_RE = /^(.*),([A-Z]+),([^,]+),(\d+),(\d+),(\d+)$/;
const OVR_MIN = 40, OVR_MAX = 99, SPD_MIN = 0, SPD_MAX = 99, STR_MIN = 0, STR_MAX = 99;

interface Finding { line: number; code: string; msg: string }

function sha256File(path: string): string {
  return crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex');
}

function validate(path: string): { findings: Finding[]; lines: string[]; hash: string } {
  const findings: Finding[] = [];
  const raw = fs.readFileSync(path, 'utf8');
  const lines = raw.split(/\r?\n/);
  const hash = sha256File(path);

  if (lines.length === 0 || lines[0].trim() !== HEADER) {
    findings.push({ line: 1, code: 'HEADER', msg: `expected header "${HEADER}", got "${lines[0] ?? ''}"` });
    return { findings, lines, hash };
  }

  const seen = new Set<string>();
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const lineNo = i + 1;
    if (line.trim().length === 0) continue;
    const m = LINE_RE.exec(line);
    if (!m) {
      findings.push({ line: lineNo, code: 'PARSE', msg: `line does not match name,pos,team,ovr,spd,str: "${line}"` });
      continue;
    }
    const [, name, pos, team, ovrS, spdS, strS] = m;
    if (name.includes(',')) {
      findings.push({ line: lineNo, code: 'NAME_COMMA', msg: `name contains a comma: "${name}" — the parser will split it wrong` });
    }
    if (!POSES.includes(pos)) findings.push({ line: lineNo, code: 'BAD_POS', msg: `unknown position "${pos}" (known: ${POSES.join(',')})` });
    const ovr = +ovrS, spd = +spdS, str = +strS;
    if (!Number.isInteger(ovr) || ovr < OVR_MIN || ovr > OVR_MAX)
      findings.push({ line: lineNo, code: 'OVR_RANGE', msg: `ovr ${ovrS} outside ${OVR_MIN}-${OVR_MAX}` });
    if (!Number.isInteger(spd) || spd < SPD_MIN || spd > SPD_MAX)
      findings.push({ line: lineNo, code: 'SPD_RANGE', msg: `spd ${spdS} outside ${SPD_MIN}-${SPD_MAX}` });
    if (!Number.isInteger(str) || str < STR_MIN || str > STR_MAX)
      findings.push({ line: lineNo, code: 'STR_RANGE', msg: `str ${strS} outside ${STR_MIN}-${STR_MAX}` });
    if (!TEAMS.includes(team)) findings.push({ line: lineNo, code: 'BAD_TEAM', msg: `team "${team}" is not a known NFL team or "Free Agent"` });
    const id = `${name}|${pos}|${team}`;
    if (seen.has(id)) findings.push({ line: lineNo, code: 'DUP_ID', msg: `duplicate player id "${id}" — buildPool throws on this` });
    else seen.add(id);
  }
  return { findings, lines, hash };
}

function main() {
  const args = process.argv.slice(2);
  const json = args.includes('--json');
  const files = args.filter((a) => !a.startsWith('--'));
  if (files.length < 1) {
    console.error('usage: node colors/tools/validate-ratings.ts <ratings.csv> [freeagents.csv] [--json]');
    process.exit(2);
  }
  let allFindings: Finding[] = [];
  let allHashes: { file: string; sha256: string; rows: number }[] = [];
  let exitCode = 0;
  for (const f of files) {
    if (!fs.existsSync(f)) {
      console.error(`file not found: ${f}`);
      exitCode = 1;
      continue;
    }
    const { findings, lines, hash } = validate(f);
    allFindings.push(...findings);
    allHashes.push({ file: f, sha256: hash, rows: Math.max(0, lines.length - 1) });
    if (findings.length) exitCode = 1;
  }
  if (files.length > 1) {
    const ids = new Map<string, string[]>();
    for (const f of files) {
      const raw = fs.readFileSync(f, 'utf8');
      const linesArr = raw.split(/\r?\n/);
      for (let i = 1; i < linesArr.length; i++) {
        const line = linesArr[i];
        const m = LINE_RE.exec(line);
        if (!m) continue;
        const id = `${m[1]}|${m[2]}|${m[3]}`;
        if (!ids.has(id)) ids.set(id, []);
        ids.get(id)!.push(f);
      }
    }
    for (const [id, files2] of ids) {
      if (files2.length > 1) {
        allFindings.push({ line: 0, code: 'DUP_CROSS_FILE', msg: `id "${id}" appears in ${files2.join(' and ')}` });
        exitCode = 1;
      }
    }
  }
  if (json) {
    process.stdout.write(JSON.stringify({ hashes: allHashes, findings: allFindings, exitCode }, null, 2) + '\n');
  } else {
    for (const h of allHashes) console.log(`${h.file}: ${h.rows} rows, sha256 ${h.sha256}`);
    if (allFindings.length === 0) console.log('OK - no findings');
    else {
      for (const f of allFindings) console.log(`  [${f.code}] ${f.line ? 'line ' + f.line + ': ' : ''}${f.msg}`);
    }
  }
  process.exit(exitCode);
}

main();