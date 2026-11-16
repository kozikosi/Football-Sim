SPEAKER: vl | ROLE: council | TASK: CAKEPANZ-SHELL Part 6 — battery mutation scope: box-score survivors at 86f22d10 vs the shell's vendored pin | DATE: 2026-11-16T21:06:00Z
FOR: R-13

OPEN QUESTION (v4-2 open question): Ernie found box-score behaviors never asserted at engine commit 86f22d10 — puntYards, touchdowns, firstDowns in colors/src/sports/nfl/sim/box.ts, and an interception's spot unchecked. Inkling's position: the mutations were correctly scoped at the pin; survivors were correctly not re-litigated. Z.ai's mutation harness ran against vendored pin d3bd81d2. Settle with a command, not a position.

SETTLED — VERIFIED by command:
  git ls-tree 4ca9a071 --name-only -r | grep "^colors/src/sports/nfl/sim"   → empty (no output)
  git ls-tree d3bd81d2   --name-only -r | grep "^colors/src/sports/nfl/sim"   → empty (no output)
  ls src/engine/sports/nfl/   → app, engine, view   (no sim directory in the shell's snapshot either)

The shell's vendored pin is 4ca9a071 (see Part 10 filing), and neither 4ca9a071 nor d3bd81d2 contains colors/src/sports/nfl/sim/box.ts or any sim/ module — the engine at this pin is drive-level (matchupModel, drives, simulateGame; engine/ has boxscore.ts but no play-level sim). Therefore:
- Z.ai's harness running against this shell's pin could NOT have caught the puntYards/touchdowns/firstDowns/interception-spot mutations: the code they guard does not exist at this pin.
- The pin scope IS the right one for this shell; the survivors belong to the Architect's engine line at 86f22d10, not to the shell. No re-litigation needed here.
- If the engine later gains a play-level sim layer, the shell's battery should add those assertions — a future slice's work, not this one.

Labels: VERIFIED (commands run, outputs empty by design — absence demonstrated).
