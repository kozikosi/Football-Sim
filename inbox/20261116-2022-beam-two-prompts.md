SPEAKER: beam | TASK: two-prompts | DATE: 2026-11-16T20:22Z
FOR: framework comparison (R-13)

## Two prompts (drafted at Owner request)

### Prompt 1 — Z.ai: UI/UX shell completion (framework-neutral)
FOR: 67 Cakepanz UI/UX shell completion (R-13)
You are Z.ai. The engine is frozen at pin d3bd81d2 on architect/engine-and-seats; you do not edit it. Build the remaining Cakepanz slices (hydration + board chrome P-316, feed, shareables) plus the Team Select revision (P-317) as a FRAMEWORK-NEUTRAL shell: plain TypeScript core + a thin, swappable framework binding. No Pinia/Vue/Svelte coupling in core logic; keep the engine adapter behind one interface so Claude can drop the finished engine in at handoff. Offline single HTML, no CDN, no horizontal scroll at 390px. Deliver as a pass-through copy under _agents/zai/deliveries/zai-fresh-start-rev11-<date>/ with CHECKSUMS.txt, MANIFEST.txt, gate-manifest.mjs PASS, gate-numerals CLEAN x2, battery probes both arms with equal node counts, and VERIFY.txt. Every number labelled VERIFIED/REPORTED/INFERRED/UNKNOWN. Do not push to main or architect/*.

### Prompt 2 — Council: assist the shell work
FOR: 67 Cakepanz shell assist (R-13)
Council seats: support Z.ai's shell work without editing the engine or governance files. Take queue lines (node tools/council.mjs next): review each Z.ai slice (3 different seats -> REVIEWED), re-run gates from a clean extract (checksums, manifest, numerals, battery), file §5 patch proposals for any engine/UI seam issues, self-lint stale numerals, and correct FOR: P-345 vs R-13 mislabels. Framework-neutral until handoff; the pick stays the Owner's. Push only your own council/<seat> branch.
