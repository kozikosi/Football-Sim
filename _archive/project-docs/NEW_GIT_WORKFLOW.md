NEW WORKFLOW DESIGN — Direct Git Access for Claude
================================================================================

STATUS: Published to Git for all agents and Claude review (19 October 2026).
This document replaces the previous copy-paste workflow (Claude → User → OpenChamber)
with a direct Git access model. All agents can now read the referenced files from the
GitHub repository directly.

---

## MOTIVATION

Previously, the workflow required:
1. Agent proposes in SUBMISSIONS.md
2. User copies Claude's decisions verbatim from chat to SUBMISSIONS.md
3. User pastes files/building artifacts to Claude
4. User verifies and promotes candidate to product file

**This is no longer necessary.** Claude can read files directly from the GitHub
repository. The build `77bb9ed5` (650,127 bytes) and all associated documents
(STATUS.md, SUBMISSIONS.md, CONTRACT.md, and the HTML file itself) are available
on GitHub at `https://github.com/kozikosi/Football-Sim/tree/main`.

---

## NEW WORKFLOW — Direct Git Access Model

### Step 1: Agent Files Submission to Git
Any agent session may post their submission directly to the GitHub repo. The file
should be named `LIGHTNING_SUBMISSION.md` (or appropriate name for the agent's ID block)
and placed in the `Football Sim/` directory (the git checkout).

**Example commit:**
```
git add LIGHTNING_SUBMISSION.md
git commit -m "S-900 <brief title>"
git push origin main
```

The file is now visible on GitHub at:
`https://github.com/kozikosi/Football-Sim/tree/main/LIGHTNING_SUBMISSION.md`

### Step 2: Claude Reads from Git Directly
Claude can now read the following documents directly from GitHub without the user
needing to paste them:

- `STATUS.md` — Current build hash, roles, pending submissions
- `SUBMISSIONS.md` — Proposals queue with all entries
- `CONTRACT.md` — Contract v2 amendments and exit codes
- `NEW_WORKFLOW_ROUND1.md` — Round 1 pre-dispatch adjudication rules
- `INTEGRATION_AUDIT_LIGHTNING.md` — Independent audit findings
- `LIGHTNING_SUBMISSION.md` — Any agent's submission
- `NFL Draft Simulator.html` — The build file (650,127 bytes, SHA-256 77bb9ed5...)
- Any other project documents

**Claude can browse GitHub, read file contents, and reference line numbers just as
if the files were pasted to him in chat.**

### Step 3: User Updates STATUS.md (Minimal)
The user still needs to perform one action: update the build hash in STATUS.md after
verification. Per the existing rules, the verifying session files a five-line report
updating only the `BUILD <sha256>` line.

### Step 4: Promotion
Once verified, the promoter (user) promotes the candidate:
- Moves old build to `_archive/`
- Records round row in `_archive/BUILD-LOG.md`
- Bumps hash in STATUS.md

---

⚠️ **IMPORTANT: Claude cannot perform ANY of these three actions himself.**

**1. Claude's final accept/defer/reject decisions (recorded in SUBMISSIONS.md):**
   Claude CANNOT record his own decisions in SUBMISSIONS.md. Per the project governance,
   the user must paste Claude's decisions verbatim into SUBMISSIONS.md. Claude delivers
   candidate builds, but the user is responsible for recording his accept/defer/reject
   decisions under the appropriate submission IDs. Without user paste, SUBMISSIONS.md
   cannot be updated.

**2. Verification five-line report:**
   Claude CANNOT file the verification five-line report. Per STATUS.md, "The verifying
   session files a five-line report (adopted 19 Oct, from DS): build hash · what was
   driven end-to-end · numbers re-measured (command + sample size) · console/390px result
   · what was deliberately not checked." This is filed by the verifier session (a read-only
   role), not by Claude. The user (or a verifier session) must file this report.

**3. New submissions not yet pushed to Git:**
   Claude CANNOT read submissions that have not been pushed to the GitHub repo. Per the
   new workflow, any submission not yet committed to the Git repo must be pasted to Claude
   by the user. Once a submission is pushed to Git (committed and pushed), Claude can then
   read it directly from GitHub. But until that push occurs, the user must paste the
   submission content to Claude.

---

### Step 1: Agent Files Submission to Git
Any agent session may post their submission directly to the GitHub repo. The file
should be named `LIGHTNING_SUBMISSION.md` (or appropriate name for the agent's ID block)
and placed in the `Football Sim/` directory (the git checkout).

**Example commit:**
```
git add LIGHTNING_SUBMISSION.md
git commit -m "S-900 <brief title>"
git push origin main
```

The file is now visible on GitHub at:
`https://github.com/kozikosi/Football-Sim/tree/main/LIGHTNING_SUBMISSION.md`

### Step 2: Claude Reads from Git Directly
Claude can now read the following documents directly from GitHub without the user
needing to paste them:

- `STATUS.md` — Current build hash, roles, pending submissions
- `SUBMISSIONS.md` — Proposals queue with all entries
- `CONTRACT.md` — Contract v2 amendments and exit codes
- `NEW_WORKFLOW_ROUND1.md` — Round 1 pre-dispatch adjudication rules
- `INTEGRATION_AUDIT_LIGHTNING.md` — Independent audit findings
- `LIGHTNING_SUBMISSION.md` — Any agent's submission
- `NFL Draft Simulator.html` — The build file (650,127 bytes, SHA-256 77bb9ed5...)
- Any other project documents

**Claude can browse GitHub, read file contents, and reference line numbers just as
if the files were pasted to him in chat.**

### Step 1: Agent Files Submission to Git
(Again - duplicate step for emphasis)

Any agent session may post their submission directly to the GitHub repo. The file
should be named `LIGHTNING_SUBMISSION.md` (or appropriate name for the agent's ID block)
and placed in the `Football Sim/` directory (the git checkout).

**Example commit:**
```
git add LIGHTNING_SUBMISSION.md
git commit -m "S-900 <brief title>"
git push origin main
```

The file is now visible on GitHub at:
`https://github.com/kozikosi/Football-Sim/tree/main/LIGHTNING_SUBMISSION.md`

---

## OtherChambers — AI Code Critiques from External Sessions

(Content about external AI session feedback)

---

## Governance and Next Steps

(Governance info)

---
