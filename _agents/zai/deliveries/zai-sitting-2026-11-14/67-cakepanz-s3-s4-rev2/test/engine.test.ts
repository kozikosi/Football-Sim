// test/engine.test.ts — the engine test suite entry point (the P-286 review fix: package.json's test:engine
// script ran THIS file, and it did not exist; the 30 test files were also copied with the architect layout's
// import paths, so 0 tests ran as delivered. Both fixed: the imports resolve into src/engine/ and this entry
// imports every suite, so 'npm run test:engine' reproduces the full 284-test run as delivered.
// The suites are byte-identical to the pinned commit's own tests (4ca9a071) — only the import paths moved.
import './engine/core/namespacing.test.ts';
import './engine/core/saver.test.ts';
import './engine/nfl/audit-fixes.test.ts';
import './engine/nfl/boxscore.test.ts';
import './engine/nfl/display.test.ts';
import './engine/nfl/draft.test.ts';
import './engine/nfl/drives.test.ts';
import './engine/nfl/envelope.test.ts';
import './engine/nfl/focusdial.test.ts';
import './engine/nfl/kicking.test.ts';
import './engine/nfl/lineup.test.ts';
import './engine/nfl/margin.test.ts';
import './engine/nfl/matchup.test.ts';
import './engine/nfl/outcome.test.ts';
import './engine/nfl/playerids.test.ts';
import './engine/nfl/players.test.ts';
import './engine/nfl/purity.test.ts';
import './engine/nfl/recap.test.ts';
import './engine/nfl/resume-determinism.test.ts';
import './engine/nfl/returner.test.ts';
import './engine/nfl/rng.test.ts';
import './engine/nfl/schedule.test.ts';
import './engine/nfl/season.test.ts';
import './engine/nfl/seasonrun.test.ts';
import './engine/nfl/standings.test.ts';
import './engine/nfl/store.test.ts';
import './engine/nfl/theme.test.ts';
import './engine/nfl/versions.test.ts';
import './engine/nfl/viewboard.test.ts';
import './engine/nfl/weekmap.test.ts';
