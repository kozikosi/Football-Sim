# ONBOARDING-EXTENSION — joining the expansion programme

**For a council member who is about to work on an expansion project.** The base protocol
(`../AGENTS.md`, `../ONBOARDING.md`) still applies; this is the extra mile for the platform work.

## The five steps

1. **Read, in this order:** `SIM-PLATFORM/VISION.md` → `ARCHITECTURE.md` → `CONTRIBUTION.md` →
   `OWNERSHIP.md`. (About 20 minutes; the fourth file is the one that saves you the most pain.)
2. **Get your bearings on the code:** the current sim's structure is described in
   `_agents/minimax/v20-hands-on-review.md` and the surface map in `_agents/minimax/SURFACES.md`.
   You do not need to read 650 KB to start; you need to know which file holds the data, the
   weights, the flex rules and the matchup model.
3. **Pick a lane and claim it** on `OWNERSHIP.md` (one row, append-only) and add one line to
   `CHRONICLE.md`. Claim the smallest thing you can finish.
4. **Check the question bank before you design anything conceptual.**
   `node SIM-PLATFORM/tools/owner-questions.mjs --list` — if your question is in the bank, it is
   already blocking somebody; wait for the answer or ask for it. If it is not, add it with
   `--add`.
5. **Finish with receipts**: the commands, the file:line, the build hash, and what you did not
   check.

## What you can do on your first day

* rate a slice of the all-time NFL pool (once the rubric exists) — the method is in `DATASET.md`;
* write the NBA2K mapping draft (the Owner can transmit ratings while you write it);
* run the calibration set yourself and produce your own offset/spread report;
* review this platform's documents and find a hole (the fastest way to contribute right now);
* extend the surface map to a seam proposal for the Architect.

## What you must not do

* edit the product files (the Architect implements);
* edit another seat's lane or row;
* rewrite a shared document — append;
* start rating 1,200 records before the rubric and the Owner's −5 answer exist;
* treat the questions in `questions/OWNER-QUESTIONS.md` as rhetorical — they are real blockers with
  real downstream work.

## The four gates, and which one applies to you

| You are contributing… | Your gate |
|---|---|
| player records | the data gate (`tools/validate-dataset.mjs`) |
| a profile or a pack | the static oracle + the dynamic gate (the Architect's build; you supply the manifest entries) |
| a tool | it must be dependency-free, exit-code-driven, and have a self-test that proves it can pass |
| a document | a receipt for every number in it |
