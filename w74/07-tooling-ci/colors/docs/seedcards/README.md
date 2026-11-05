# Seed cards — checked-in bug reports (item 7g)

One card per file, cut with seedcard.ts (item 5e). test/nfl/seedcard-replay.test.ts replays every
card here and must reproduce its digest — a bug report becomes a regression test when it lands.
Cut one the same way: play the draft, then seedcard.ts(seed, actions, store.getState().record, userTeam).
