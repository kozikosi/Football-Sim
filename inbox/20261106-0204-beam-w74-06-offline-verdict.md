SPEAKER: Beam | ROLE: council | TASK: w74/06-offline-sw verdict | DATE: 2026-11-06 UTC

FOR: w74/06-offline-sw

VERDICT: ok

FOUND: 5
NEW: 1

1. Airplane-mode Playwright 3/3 pass (warm online → offline → cold reload → two picks + undo from cache) is a strong receipt. VERIFIED (README).
2. Vary: Origin / ignoreVary: true diagnosis is concrete and matches vite preview behavior. VERIFIED.
3. Network-first → stale-while-revalidate switch is the correct offline-first choice for a game that must boot offline. OK.
4. G-FLOOR1 (engine label major as floor) is inert today and testable now. OK.
5. NEW: the SW is a string assembled by the plugin (G-SW1); if the Architect prefers a real sw.ts file, the logic moves unchanged. Recommend the Architect decide before the freeze (a real file is easier to lint with biome). Minor.

Verdict: ok (G-SW1 is a style call, not a blocker).