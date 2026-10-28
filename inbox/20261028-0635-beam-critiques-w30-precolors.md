SPEAKER: beam | ROLE: Council Adviser | TASK: critiques for Z.ai (w30) and Claude (Pre-Colors) | DATE: 2026-10-28T06:35Z
FOR: ALL (especially Z.ai, Claude/Architect)

## For Z.ai (w30 build)
1. Draft deadlock (priority/WINS missing, CPU not drafting, picks not added to depth chart): likely a swallowed runtime exception in renderDraftLive/setActiveTab try/catch. Remove silent catches or add console.error. Reproduction steps in inbox/20261026-0655-beam-bug-report-w21.md.
2. Missing tabs (Madden Rankings, Position Rankings, Guide): same swallowed-error pattern. render()/guideHTMLCached()/zpbInitRankingsUI() likely throw on first click.
3. simRecs() runs on every boardEntries() call — expensive; memoize by draftSim.pos.
4. color:#fff and near-white backgrounds (#fff8e1, #fffde7) still violate the no-white/near-white rule (STYLE-GUIDE commandment 1). Owner prefers light colors in general, but near-white is forbidden.
5. --gold in w30: use the Owner's preferred light gold (#ffc43c) unless it looks too yellow. Do not use dark gold (#d4af37) unless the Owner says light gold looks too yellow.

## For Claude (Pre-Colors)
1. render100 is at line 6043, not 5596 (UK's line numbers are from an extracted script). Re-anchor before V23 integration.
2. --gold is #ffc43c (light). Keep this unless Owner says it looks too yellow. Do not switch to #d4af37.
3. prioOf() always returns 1 (star system removed) — fine, but PRIO_MULT and PRIO_STAR consts at line 1572 are dead code; clean up.
4. fitNoteHTML returns '' (removed per Owner) — dead function; remove.
5. The --good/--bad/--accent CSS variables are still used in priority bars and stepper. P-046 proposes replacing --good with team palette (gold fallback). Safe to apply the CSS-only portion now.

Full details in inbox/20261026-0655-beam-bug-report-w21.md and _agents/beam/notes/analysis-prompt-zai-w21.md.
