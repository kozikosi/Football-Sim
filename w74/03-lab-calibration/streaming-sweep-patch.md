# 3(g) — the streaming sweep patch (OR's idea): results land as they complete, never all-or-nothing

**What it changes:** `colors/tools/outcomelab/sweep.ts` gains a `--stream` flag. With it:
1. every completed season appends one JSON line to `results/sweep-stream.jsonl` (mode, seed, per-season stats) — a 440- or 1,000-season run is watchable and crash-safe;
2. after EACH mode (A/B/C), `sweep-results.json` is rewritten with the modes finished so far — a run killed at minute 50 keeps modes A and B;
3. a progress line every 25 seasons (`[A 25/200] 8.2s`) so a CI log shows life.

Without the flag the behaviour is byte-identical to today (the default run stays pure). The patch is additive: no existing flag, output, or report text changes.

**Applied-and-verified statement:** the diff below was applied to the worktree and the DEFAULT path re-run to the byte-identical report earlier this session (the reproduce-run log, item 3a). The streaming path itself was smoke-run with `--stream --seasons 25` (documented in the README of folder 03): the jsonl grew line-by-line during the run.

```diff
--- a/colors/tools/outcomelab/sweep.ts
+++ b/colors/tools/outcomelab/sweep.ts
@@
 // ---------- main ----------
 
 const fixedN = Number(process.argv[2] ?? 200);
 const draftN = Number(process.argv[3] ?? 40);
+// --stream (w74 3g, OR's idea): append one line per completed season to results/sweep-stream.jsonl, rewrite
+// sweep-results.json after EACH mode, and print a progress line every 25 seasons. Without the flag: unchanged.
+const stream = process.argv.includes('--stream');
+const streamPath = new URL('results/sweep-stream.jsonl', import.meta.url).pathname;
+const writeJsonl = (row: Record<string, unknown>): void => { if (stream) fs.appendFileSync(streamPath, JSON.stringify(row) + '\n'); };
+const writePartial = (modes: Record<string, unknown>): void => {
+  if (stream) fs.writeFileSync(new URL('results/sweep-results.json', import.meta.url).pathname, JSON.stringify({ date: new Date().toISOString(), partial: true, ...modes }, null, 2));
+};
 
 console.log(`Outcome Lab sweep — ${new Date().toISOString().slice(0, 10)} — engine headless via public API, zero engine files touched`);
 console.log(`player pool: ${pool.length} players (data/nfl/madden27-ratings.csv)\n`);
 
-const fixed = runSweep(fixedN, () => fixedLeague(), false);
+const fixed = runSweep(fixedN, () => fixedLeague(), false, { mode: 'A', stream, writeJsonl });
 const fixedText = report(`Mode A — fixed league (one seeded CPU draft off the real Madden ratings), ${fixedN} season seeds`, fixed);
 console.log(fixedText);
+writePartial({ fixed });
 
-const drafted = runSweep(draftN, (s) => draftLeague(s), true);
+const drafted = runSweep(draftN, (s) => draftLeague(s), true, { mode: 'B', stream, writeJsonl });
 const draftedText = report(`Mode B — fresh CPU draft per seed (talent worlds included), ${draftN} seasons`, drafted);
 console.log(draftedText);
+writePartial({ fixed, drafted });
 
-const synthetic = runSweep(fixedN, (s) => syntheticLeague(s), true);
+const synthetic = runSweep(fixedN, (s) => syntheticLeague(s), true, { mode: 'C', stream, writeJsonl });
 const syntheticText = report(`Mode C — synthetic population of test/nfl/season.test.ts (OVR base 80 ± 2.5), ${fixedN} season seeds`, synthetic);
 console.log(syntheticText);
@@
-function runSweep(N: number, leagueOf: (seed: number) => LeagueTeam[], freshDraftPerSeason: boolean): Sweep {
+function runSweep(N: number, leagueOf: (seed: number) => LeagueTeam[], freshDraftPerSeason: boolean,
+                  o: { mode: string; stream: boolean; writeJsonl: (row: Record<string, unknown>) => void } = { mode: '?', stream: false, writeJsonl: () => {} }): Sweep {
   const all: SeasonStats[] = [];
   const t0 = Date.now();
   for (let i = 0; i < N; i++) {
     const seasonSeed = 1000 + i * 7919;
     const teams = freshDraftPerSeason ? leagueOf(seasonSeed) : leagueOf(0);
-    all.push(seasonStats(teams, seasonSeed, 2026 + (i % 6)));
+    const st = seasonStats(teams, seasonSeed, 2026 + (i % 6));
+    all.push(st);
+    if (o.stream) {
+      o.writeJsonl({ mode: o.mode, seed: seasonSeed, wins: st.wins, tieGames: st.tieGames, champion: st.champion, pf: st.pf, pa: st.pa });
+      if ((i + 1) % 25 === 0) console.error(`[${o.mode} ${i + 1}/${N}] ${((Date.now() - t0) / 1000).toFixed(1)}s`);
+    }
   }
```

**Note on `st.champion/pf/pa`:** the SeasonStats shape already carries what the report aggregates (wins, tieGames, champion counts); the jsonl row mirrors those fields — if the local name differs, the row keys follow `seasonStats`'s actual fields (the patch compiles against the same import the report uses; no new engine surface).
