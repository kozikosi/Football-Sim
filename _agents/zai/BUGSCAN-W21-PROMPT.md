You are Z.ai, High Councillor of Z-post-blue. Bootstrap yourself: clone https://github.com/kozikosi/Football-Sim shallow and read _agents/zai/START-OF-CHAT-ZAI.md from origin/council/zai (fallback: origin/main:z-core/_agents/zai/…), follow it exactly.

CONTEXT
The Owner is seeing persistent bugs appear across different versions of Football-Sim-Z-post-blue-w21.html. This file is located in "/Users/kosi/Desktop/Football Sim/" and has also been pushed to your branch. They want a full analysis of the codebase to find potential bugs BEFORE they describe the specific issues they're experiencing. 

OBJECTIVE
Perform a thorough, evidence-based analysis of the entire project with a focus on Football-Sim-Z-post-blue-w21.html. Do NOT make any fixes at this time. Your only job is to find, trace, and document potential bugs. 


SCOPE TO ANALYZE
1. Football-Sim-Z-post-blue-w21.html in its entirety (read the whole file, do not skim)
2. Related Z-post-blue files (previous waves, builds, tools under _agents/zai/, z-core/)
3. Football-Sim-PreColors.html as a known-good baseline for comparison
4. Any shared JS/CSS, utilities, or state management used by the Z-post-blue build
5. council/zai branch history to see recent changes leading up to w21


PRIORITY SUSPECTS TO VERIFY
Explicitly verify or disprove each of the following. For any that are plausible, trace their full call chain with line numbers. 

1. DRAFT BOARD DISAPPEARING ON TAB/VIEW SWITCHES (SEV: HIGH)
   - Inspect setActiveTab(viewId, btnId). Does it do anything to restore #draftLive, #draftSetup, or #draftFinalResults when switching back to viewDraft? 
   - Trace every call to setActiveTab while draftSim exists and is in-progress (specifically while draftSim.awaitingUser is true).
   - Check if #draftLive's inline style="display:none" can persist after a tab switch with no code path to set it back to "block".
   - Check renderDraftLive() - does it assume #draftLive is visible, or does it force visibility anywhere?

2. TIMER/RACE CONDITIONS IN SLOW MODE (SEV: HIGH)
   - Audit every usage of slowTimer (setTimeout/clearTimeout assignments and nullings). Pay specific attention to stepSlow(), processUntilUserTurn(), simToEnd(), startDraft2(), and finishDraft2().
   - Find cases where an old timeout can fire after startDraft2(), startNewDraftFlow(), or a new draft has been initialized (a timeout firing against a stale draftSim).
   - Check if finishDraft2() or view changes cancel all pending timeouts.

3. STATE RESET ORDER CAN HIDE THE BOARD (SEV: HIGH)
   - Trace startDraft2(), finishDraft2(), and startNewDraftFlow() in order. What is the exact display state set for #draftLive, #draftSetup, and #draftFinalResults in each?
   - Can finishDraft2() be called twice (e.g by a timer and manually)? Can draftSim be non-null while #draftLive is display:none with no restoration path?
   - Is there any early return inside finishDraft2() that could skip unhiding/restoring the correct panel?

4. DOM REBUILDS ORPHANING LISTENERS (SEV: MED-HIGH)
   - Inspect renderDraftBoard2(), renderDraftLive(), and renderDraftRoster2(). Do any of them use innerHTML to rebuild elements that have direct addEventListener bindings attached to them?
   - Are event handlers using delegation, or are they bound to nodes that get recreated on each render?
   - Look for getElementById calls inside render paths that could return null after a rebuild and silently fail.

5. CSS/DOM VISIBILITY CONFLICTS (SEV: MED)
   - Check for conflicts between .view { display:none; } / .view.active { display:block; } and inline styles on #draftLive, #draftSetup, and #draftFinalResults.
   - Look for CSS rules that specifically target #draftLive or its children that could affect computed display at certain breakpoints (e.g 390px).
   - See if visibility can become desynced between class-based and inline-style based toggles.


MANDATORY GREP TARGETS
Run and include the results for the following in your report:
```bash
grep -n "#draftLive" "/Users/kosi/Desktop/Football Sim/Football-Sim-Z-post-blue-w21.html"
grep -n "slowTimer" "/Users/kosi/Desktop/Football Sim/Football-Sim-Z-post-blue-w21.html"
grep -n "function setActiveTab" "/Users/kosi/Desktop/Football Sim/Football-Sim-Z-post-blue-w21.html"
grep -n "finishDraft2" "/Users/kosi/Desktop/Football Sim/Football-Sim-Z-post-blue-w21.html"
grep -n "startNewDraftFlow" "/Users/kosi/Desktop/Football Sim/Football-Sim-Z-post-blue-w21.html"
grep -n "processUntilUserTurn\|stepSlow\|simToEnd\|startDraft2" "/Users/kosi/Desktop/Football Sim/Football-Sim-Z-post-blue-w21.html"
grep -n "renderDraftLive\|renderDraftBoard2\|renderDraftRoster2" "/Users/kosi/Desktop/Football Sim/Football-Sim-Z-post-blue-w21.html"
```


OUTPUT REQUIREMENTS
Create a new file at: _agents/zai/BUGSCAN-w21-preflight-<YYYYMMDD-HHMM>.md

Structure it EXACTLY as follows:
- EXECUTIVE SUMMARY (2-4 sentences, high level findings only)
- FILES ANALYZED (list every file read with path, approximate size, and sha256 if possible)
- SUSPECT VERIFICATION (Go through suspects 1-5 in order. For each: Status (CONFIRMED / DISPROVEN / INCONCLUSIVE), SEV, Location (file + function + line numbers), Evidence (exact code snippets and grep results), Call chain (how it could be reached), Repro idea (concrete steps to trigger it))
- TOP SUSPECTS (Condense your confirmed/inconclusive items to the top 3 highest risk with the above details)
- DETAILED FINDINGS (All other potential bugs found using the same format)
- COMPARISON TO PRE-COLORS (Specific regressions noticed, if any)
- RACE CONDITIONS/TIMERS (Full inventory of setTimeout/setInterval, all assignments to slowTimer, and whether they are cleared in every relevant path)
- CSS/DOM VISIBILITY CONCERNS (Inline styles vs classes, specificity, z-index, and anything that could hide entire panels)
- QUESTIONS FOR OWNER (Only ask questions if there is something you cannot determine from the code alone)
- QUICK VERIFICATION COMMANDS (Grep/node commands that could be run to confirm or disprove each confirmed suspect)


RULES
- ANALYSIS ONLY. Do not edit, patch, or refactor any files.
- Be evidence based. Every suspected bug MUST have concrete evidence from the code (line numbers, function names, or exact strings).
- Label your claims as VERIFIED / REPORTED / INFERRED / UNKNOWN.
- Do not guess at fixes. Only state hypotheses, call chains, and what to check.
- Read the ENTIRE w21 file before forming conclusions. Take your time.
- Explicitly confirm or disprove the 5 priority suspects above. Do not omit them.
- Be exhaustive. The Owner wants to know if you can find these bugs on your own, so leave no obvious footguns unexamined.

START NOW. Begin by reading Football-Sim-Z-post-blue-w21.html in full, run the mandatory greps, build a map of the draft/tab/timer/state flows, compare against Pre-Colors, and then write the report to the specified path. Do not ask clarifying questions at the start, just begin the analysis.
