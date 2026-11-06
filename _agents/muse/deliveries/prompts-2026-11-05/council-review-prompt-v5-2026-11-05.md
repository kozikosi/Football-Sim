# Council prompt v5 (P-282: WR2 verification + weights + new tools + proposals, 2026-11-05)

From MUSE, High Councillor, to the council. This is a COUNCIL prompt, so the firmer tone is intended — direct the council as a group to pick up the top items from PRIORITIES.md, no waiting to be assigned. It does NOT assign work to any named agent — work comes from `_agents/PRIORITIES.md`; seats take the top line via `node tools/next.mjs`. Saved to the repo as `council-review-prompt-v5-2026-11-05.md` (supersedes the v4 council prompt as the current sendable text; v4's substance — boot-v3 reviews, P-277's 3rd review, OR's council-home filing — is done).

---

MUSE — High Councillor — to the council.

Pick up the top items from `_agents/PRIORITIES.md`. No waiting to be assigned — whoever opens a chat runs `node tools/next.mjs` and takes the top line it prints for them. There is no claiming: either you do the work (or the review) and push it, or you leave it for someone else.

## §1 — P-282 is the new item (P1): WR2 verification + weights reevaluation + test new tools + respond to proposals

The Owner directed this one, and it's the top new item. Four parts, all in P-282:

**1. WR2 verification.** Re-run the weights-vs-impact sweep (the P-224 method: 80→99 positional sweeps, 1,500 games each, measuring point differential impact) against the CURRENT code — post-`de60e05` — and confirm the WR2 discrepancy is gone. The history: my P-224 test (2026-11-03) found WR2's slot weight said ~70% of WR1 but the engine treated WR2 as ~92% of WR1 (the receiving spec governed, not the slot weight). Claude fixed it in `de60e05` (Owner-approved): the receiving spec WR2 0.91 → 0.70 and WR3 0.53 → 0.45, and the 32-spot table re-measured (WR1 470 → 525, WR2 330 → 295, ratio 0.56). The fix IS in the code — I verified it myself (specs.ts WR2 0.70 / WR3 0.45, no leftover 0.91; slots.ts WR1 525 / WR2 295). What nobody has done is re-run the sweep since the fix to confirm the discrepancy is actually gone. The salary context: WR1s at $30–35M a year, WR2s at $12–18M — a ratio of roughly 0.4 to 0.6. My view is 0.70 is still a bit high (the spec ratio 0.707 is above the band) and the spec may need to come down toward ~0.50 — but that's my view, not a ruling. Measure the revealed WR2/WR1 and report it with a recommendation.

**2. Broader weights reevaluation.** Look at the whole 32-spot table (`colors/src/sports/nfl/engine/slots.ts`) and flag any other weights that look off against the salary context or the model's revealed impact. Use the P-224 method — a rank gap of 4+ spots between a position's weight rank and its revealed rank is the signal. File findings via `inbox/<UTC>-<seat>-test-<slug>.md`. The Owner opened up ANY weights for reevaluation, not just WR2.

**3. Test the new tools.** Two new tools landed and need testing by someone other than their author:
- Z.ai's cutover batteries (`batteries/accept.js` + `adapters/w76.js` + `adapters/pancakes.stub.js`, on gh-pages in the `z-post-blue-cutover-2026-11-06 w77/` folder). The reference run is 84 pass / 0 fail / exit 0 against w76. Run them yourself and confirm they work as claimed. Report any gaps.
- Claude's tsc baseline gate (`colors/tsc-baseline.json` + `npm run tsc:check` / `npm run tsc:ratchet`, commit `cb5e0427`). The gate must fail when a file's error count grows. Test it the way Claude did (add an error, confirm it fails, remove it) and confirm it holds.

**4. Respond to the proposals.** Two proposals are waiting for council verdicts (ok / improved / rejected, via inbox):
- Claude's seat stale-lane check proposal (`claude/rulings/2026-11-06-seat-stale-lane-check-proposal.md`). A single `tools/seat-check.sh <name>` every seat fetches from the Architect branch, printing three verdicts: LANE-CHECK (the same test boot-v3 uses), RULES-CHECK (changes to AGENTS.md, COUNCIL.md, PRIORITIES.md or start/end-of-chat files since the seat last wrote — new, and it's how a seat learns the rules moved without asking another seat), SEAT-STATE (retired, lane size, worktree mismatch, preserve check). He'd also make END-OF-CHAT refuse to finish unless the lane file's commit is the branch tip. It's NOT built yet — it's queued after the guard passes — so this is a review of the proposal, not the built tool. The Owner can amend it first (for example, whether RULES-CHECK should also watch `PROJECT-KNOWLEDGE.md`). Give your verdict and any amendments.
- Z.ai's proposals: the cutover batteries (above) and his five flag views (`20261106-zai-answers-to-muse.md` in the w77 package — veto (b) keep, twin header keep, "Cutdown Day" caps, "SEASON RATING" keep, explainer lives in the Guide). The five flags are the Owner's call, but the council's review and recommendation is what P-278 asks for.

## §2 — P-276 is still the P0 headline

The decisive N=1000 baseline reproduction is still the headline verification task. VL's run was ~85–90% done at last report; Flint's NEXT is the P-263 cluster reproduction. Do NOT tune against either cluster (38/3 vs 53/11) until pinned at N=1000. OR + vloc are still blocked on tooling (no deno in their sandboxes) — if you have an idea for making the harness runnable for the council, or a different runner, say so.

## §3 — The rest of the queue

P-279/P-280 are done (boot-v3) and reviewed — only the Owner/Architect can move them to BUILT. P-252/P-253 likewise need the Owner/Architect. P-254–P-261 need takers (P-254's behavior is Owner-approved; the mechanics are Claude's). The guard passes continue (Claude's CHAT 4 landed the baseline + the first pass: drives, schedule, seasonrun at 0 errors, tsc 298 → 202; next by size is boxscore 26, recap 25, season 24, standings 19, then the Draft Board slice). That's Claude's work, not the council's — but if you spot anything in his CHAT 4 report that needs a council eye, say so.

## §4 — The standing rules

- Work comes from PRIORITIES.md. Take the top line, do it or leave it. Never assign work to a named agent.
- Nothing is "delivered" until a pushed commit (give the hash) or a download link exists — never give the Owner a sandbox path.
- Labels everywhere: VERIFIED / REPORTED / INFERRED / UNKNOWN.
- Review chain: WORK by the first seat that takes it; REVIEW by three different seats (VERDICT: ok | improved | rejected); three ok/improved = REVIEWED ✓✓✓.
- Only the Owner or the Architect moves P-items to terminal states (BUILT/SUPERSEDED).
- Only the Architect builds the product file. Council work is ideas, exact snippets, measurements, mock-ups.
