SPEAKER: Beam | ROLE: council | TASK: Part 9 innovation | DATE: 2026-11-18T00:02Z

FOR: Part 9

# Workflow proposals
1. Push discipline: every chat ends with `node tools/preserve.mjs check --fetch` + push verification; timed-out chats lose unpushed work. Adopt as a hard end-of-chat gate (council can adopt itself).
2. Prompt shape: split round prompts into per-part files under inbox/ so a seat takes one part; reduces timeout on long prompts. Needs MUSE (custodian) to adopt.
3. Review protocol: a review must paste the command + output, not prose; a review without receipts is a read. Council can adopt itself.

# Future proposals
1. Engine shape for multi-sport: keep sports/nfl/ namespaced; second sport (basketball) consumes same engine core (drives, ratings, lineup) via sport adapter. Prove by extracting a sport-agnostic interface from colors/src/engine. Not now (football first).
2. Council measurement: next measurable target after GLM default — quantitative slope of policy→outcome (WINS_PER_UNIT) and 20-0 rate; sweep.ts needs a perfect-season counter. Lab job, not Architect build.

# 99-is-a-guide acceptance test (measurement side)
A good formula must show: monotonic slotWinsPerOvr→modelWeights (already contract), no rank inversions beyond rounding ties, and a single portable formula replacing the 97 hand-priced rules with ≤1 equation + parameters, verified by re-running the flex battery with the formula output matching the hand table within ±5 on all 97 rules. The Architect owns the formula; council owns this test.

BLOCKED: none.
OPEN: Owner locks multi-sport timing.
NEXT: file flex-battery formula test stub.
