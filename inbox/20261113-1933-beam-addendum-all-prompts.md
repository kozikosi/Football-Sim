SPEAKER: beam | ROLE: council | TASK: addendum to all three prompts (Owner directives 2026-11-13) | DATE: 2026-11-13T19:33Z
FOR: ALL

## Addendum — Owner directives received 2026-11-13 (apply to all three prompts)

This addendum supplements the three prompts filed earlier today:
- Claude: `inbox/20261113-1907-beam-prompt-for-claude.md`
- Z.ai (long): `inbox/20261113-1908-beam-prompt-for-zai-long.md`
- Council (long): `inbox/20261113-1909-beam-prompt-for-council-long.md`

### New directives (use Owner's words verbatim where noted)

**1. Cross-side stars (verbatim details):**
- (a) Penalty threshold: -6 or less in a position on the other side of the ball.
- (b) No cross-side use outside clutch or overtime windows.
- (c) Yes, visual indicator.
- (d) Text should read "2-WAY" (Owner's preference: "yes but maybe just '2-WAY'").
- Example: "a top wide receiver coming in to defend a hail mary at the end of the game and getting an interception."
- Design note: `inbox/20261113-1928-beam-cross-side-stars-design.md`

**2. "You should try building."**
Beam (and any seat that can) should start helping with building. The framework test is a good start. Read-only verification commands (grep, git show, sha256sum, node --check) are the minimum. If you can run npm builds, do so and report results.

**3. Claude will more literally merge ideally but can rewrite if he prefers and it makes sense.**
Cakepanz is barely in Svelte — it's mostly TypeScript. Should be easy to refactor to whatever framework wins. The merge is Claude's call on timing and method.

**4. All seats can read the GitHub so prepare them equally as a "go read this" type prompt.**
The prompts are filed in the repo. Seats can read them via `git show origin/council/beam:<path>`. Each prompt should start with a "go read this" pointer.

**5. Use the Owner's words verbatim where it makes sense.**
Directives, rulings, and feature descriptions should use the Owner's exact words. Summarize where appropriate (e.g., technical details, CI plans).

**6. "Full wave. No clock."**
Run the full wave of tests (all 8 frameworks) without time limits. No clock constraints on the test runs.

**7. "Am I missing a combination of the tools already mentioned that I should have considered as well?"**
Additional framework candidates beyond the 8 already listed: Astro (islands architecture, multi-framework), Qwik (resumability), Remix (React meta-framework), Angular (enterprise), Lit (web components), HTMX (hypermedia-driven), Alpine.js (lightweight reactivity). The 8 listed cover the main contenders; these are "if you want more." Testing/build tools not yet mentioned: Vitest, Jest, Cypress, Testing Library, Storybook, Lighthouse, axe (accessibility), esbuild, Rollup, Turbopack, Rspack.

**8. "Quiet arrangement."**
Set up testing quietly without disrupting the repo or development flow. Tests should run in CI, not locally. They should not block development. Low noise — only fail on real issues.

**9. Cross-side stars design note filed.**
`inbox/20261113-1928-beam-cross-side-stars-design.md` — full design with trigger conditions, visual indicator, example, implementation notes.

**10. 12 static-to-fluctuating items filed (with clarification).**
`inbox/20261113-1930-beam-12-static-to-fluctuating-items.md` — all 12 items can fluctuate, but OVR and flex prices should be static to the user. The underlying math can be more flexible. Form drifts ±5 during the season.

**11. Fluctuating dial position filed.**
`inbox/20261113-1932-beam-fluctuating-dial-position.md` — static binary is not open for discussion. Dial must fluctuate. λ is a context-dependent function. OVR and flex prices static to user; underlying math fluctuates.

**12. A3 plays ledger corrections filed.**
`inbox/20261113-1925-beam-A3-plays-ledger-corrections.md` — 5 corrections, apply-ready. Council/Architect to review and apply.

**13. A4 lambda E3 corrected filing filed.**
`inbox/20261113-1926-beam-A4-lambda-E3-corrected.md` — one sentence fix. Council/Architect to review and apply.

**14. .nvmrc value: most recent version (24).**
Confirmed. Z.ai verified on 24.22.2. Pin to 24.

**15. A3 + A4: make notes to everyone and ask them.**
Filed as corrections. Council and Architect to review and apply. If any correction is wrong, file a dissent with the receipt.

**16. "Do you feel like i didn't answer any questions you had or still have?"**
Answers captured: Q3 (run tests) = yes. Q4 (CI scope) = minimal first, expand later, with strong backbone plan. Q5 (byte-check) = (c) both. Q1/Q2 = were meant for Inkling, not answered. Q8/Q9/Q10 = clarified above. Q12 = b94ee6d1 was sent (yes). Q7 = send the 12 items again (done). Q14 = approve the 12 items (filed). Q15 = dial must fluctuate (filed). Q16 = when Claude is ready (deferred). Q17 = apply A3/A4 (filed). Q18 = same (filed). Q19 = most recent version (24, confirmed).

### What I'll do next
1. Run read-only verification commands (byte-check) on my own filings and the repo.
2. Re-verify all claims in the three prompts.
3. File the cross-side stars design note (done: 20261113-1928).
4. File the 12 items with clarification (done: 20261113-1930).
5. File the fluctuating dial position (done: 20261113-1932).
6. File A3 corrections (done: 20261113-1925).
7. File A4 E3 corrected (done: 20261113-1926).

EVIDENCE: VERIFIED (Owner directives, 2026-11-13, relayed to Beam in chat).