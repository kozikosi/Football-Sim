# ULTRA PROMPT — Round 1 Pre-Dispatch Review and v20 Analysis

STATUS: Ultra has been sent a comprehensive update on the Round 1 workflow redesign
and the v20 vs canonical build analysis. This prompt designates Ultra as the agent
who will review and provide suggestions on the new workflow and build assessment.

--- BUILD IDENTITY AND WORKFLOW CHANGES ---
1. BUILD VERIFICATION: The authoritative build is 77bb9ed59ffa22949a8d71b62d8aa370deafd225bfaa3a3144ca9ce50421a39f (650,127 bytes). This was confirmed through direct SHA-256 verification.

2. CLAUDE'S ACCESS: Claude can now read the following documents directly from GitHub
   (no copy-paste required):
   - STATUS.md — Build hash, roles, pending submissions
   - SUBMISSIONS.md — Proposals queue with all entries
   - CONTRACT.md — Contract v2, exit codes, baseline procedure
   - NEW_WORKFLOW_ROUND1.md — Round 1 pre-dispatch adjudication rules
   - INTEGRATION_AUDIT_LIGHTNING.md — Independent audit findings
   - LIGHTNING_SUBMISSION.md — Any agent's submission
   - NFL Draft Simulator.html — The 650,127-byte build file
   - NEW_GIT_WORKFLOW.md — Direct Git access workflow (PUBLISHED)

3. WORKFLOW CHANGES: The copy-paste workflow between Claude → User → OpenChamber is
   obsolete. Claude can read files directly from the GitHub repository. The user's role
   is reduced to: (a) pushing new content to Git, (b) updating STATUS.md hash after
   verification, (c) recording Claude's decisions in SUBMISSIONS.md.

4. INTEGRATION AUDIT CORRECTION: Risk #5 (council liveness claims vs code reality) was
   downgraded from MEDIUM to LOW. Claude confirmed that on 77bb9ed5, the council's
   fixes for 'sudden death', 'went the distance', and footer 'MORE' ARE present. The
   earlier audit incorrectly compared against v20, not 77bb9ed5.

5. V20 vs CANONICAL BUILD ANALYSIS: A thorough comparison was completed. The v20 has
   a beautiful modern visual design (hero section, stepper, mobile draft board, CSS
   theming) but lacks the Season engine, SIM-CORE markers, and headless entry points
   required by the protocol. The canonical build has the engine but lacks the modern
   visual design. Neither is a superset of the other.

   KEY FINDINGS:
   - v20 lacks: Season tab, SIM-CORE markers, headless entry points, Season engine
   - Canonical lacks v20's: Hero section, stepper progress, mobile 12-column draft
     board CSS, gradient backgrounds, rounded buttons with animations
   - RECOMMENDED: Adopt v20's visual design + port canonical's Season engine + add
     SIM-CORE markers in S-202

--- WHAT THIS MEANS FOR ULTRA ---

Your Role in Round 1:
- You can now read all protocol documents directly from GitHub
- Your suggestions can be posted to Git and Claude will read them
- The 8 pre-implementation actions for Claude still apply
- Risk assessments have been corrected (see point #4 above)
- You can publish suggestions following the workflow in NEW_GIT_WORKFLOW.md

--- IMMEDIATE ACTIONS ---
1. Review NEW_GIT_WORKFLOW.md on Git to understand the new workflow
2. Review INTEGRATION_AUDIT_LIGHTNING.md for the corrected findings
3. Review the v20 vs canonical analysis above
4. Decide on your submission topic for Round 1
5. Post your submission to Git following the workflow design
6. Your submission will be readable by Claude directly from Git

--- SUGGESTION TOPICS ---

You may submit on any of these topics:
- Visual design improvements (adopting v20's hero/stepper/mobile draft board)
- SIM-CORE marker implementation (S-202)
- Season engine enhancements
- Dataset format specifications (S-502/S-203)
- Exit code matrix configuration
- Baseline bootstrap procedure
- Any other Round 1 concern

--- HOW TO POST YOUR SUGGESTION ---
1. Create a markdown file named LIGHTNING_SUBMISSION.md (or your assigned ID block)
2. Write your suggestions using the SUBMISSIONS.md entry format
3. Commit and push to GitHub:
   git add LIGHTNING_SUBMISSION.md
   git commit -m 'S-<id> <brief title>'
   git push origin main
4. Claude will read your submission directly from GitHub

--- CONTACT ---

If you have questions about the workflow or need clarification, refer to:
- NEW_GIT_WORKFLOW.md on Git (full workflow design)
- INTEGRATION_AUDIT_LIGHTNING.md (audit findings, corrected)
- STATUS.md (current build state: 77bb9ed5...)
- COLLECTIVE-PROMPT.md (standing system prompt)

Your prompt has been designed to inform you of all updates and ensure you can
participate in Round 1 using the new Git-direct access model. All documents are
available for your review on GitHub.
