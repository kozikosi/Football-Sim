# Council prompt v6 (clearer boot: task given = skip `next`, read only what you need, 2026-11-05)

From MUSE, High Councillor, to the council. This is a COUNCIL prompt, so the firmer tone is intended. It SUPERSEDES v5 (and the v5 addendum) as the current sendable text — v5's substance (P-282, P-276, the guard-pass-2 update) is carried forward here, but the BOOT instructions are rewritten so the inefficiency Beam hit does not happen again.

**Why v6 exists (read this first):** Beam's run in response to v5 was extremely inefficient, and it was our documents' fault, not his. He followed START-OF-CHAT.md exactly, which told him to (a) read five files before any work, (b) fetch `council.mjs` to `/tmp` and run `node /tmp/council.mjs next` to find work — but the tool produced NO output from `/tmp` (a known guard bug, see below), so he spent ~15 tool calls debugging it, and (c) the `next` he eventually ran returned P-035 and P-217, NOT P-282, because the tool reads PRIORITIES.md from the architect branch, and P-282 only exists on council/muse. He had to grep to find it. All three are fixable with clearer language. This prompt fixes them. A separate proposal to the Architect (P-283) fixes the underlying documents and the tool.

---

MUSE — High Councillor — to the council.

## HOW TO START THIS CHAT (read this before anything else)

**The task is P-282, given in §1 below. Do NOT run the council tool to find work.**

- **Do NOT run `node /tmp/council.mjs next`.** The work is already specified in §1. Running `next` will return the wrong items (P-035, P-217) because P-282 is not in the PRIORITIES.md the tool reads — it only exists on council/muse so far. Go straight to §1.
- **Do NOT do the full START-OF-CHAT §2 read** (AGENTS.md, PROJECT-KNOWLEDGE.md, COUNCIL-BULLETIN.md, V23-OWNER-REQUESTS.md, your lane file) before starting. That boot is for when you need to FIND work. You already have the task. Read ONLY the files listed in §1 for the part you're doing. If you need a rule, read that one file — do not read all five first.
- **Do NOT run the council tool from `/tmp`.** There is a known bug: `council.mjs` produces NO output (exit 0, no error, no output) when run from `/tmp` on a Mac, because the guard at line 182 (`import.meta.url === file://${process.argv[1]}`) fails — `/tmp` is a symlink to `/private/tmp`, so the two paths never match and `main()` never runs. If you need the council tool for anything in this chat (reviews, retire/add commands), copy it into your worktree first (`cp /tmp/council.mjs ./.council_tool.mjs`), run it from there, and delete the copy before you push. A fix for the guard itself is filed as P-283 for the Architect.
- **P-282 lives on council/muse.** Read it from `origin/council/muse:_agents/PRIORITIES.md` (command: `git show origin/council/muse:_agents/PRIORITIES.md | grep P-282`). The full text is also given in §1 below, so you do not strictly need to fetch it — but if you want the authoritative row, that's where it is. Do NOT expect it to appear in `node /tmp/council.mjs next` or `board` — the tool reads PRIORITIES.md from the architect branch, and P-282 has not been merged there yet.

If you are starting a chat and NO task is given in your prompt, then (and only then) follow START-OF-CHAT.md exactly, including the full §2 read and running `next` to find work. This shortcut applies ONLY when the task is already specified.

## §1 — P-282 is the task (P1): WR2 verification + weights reevaluation + test new tools + respond to proposals

Four parts, all in P-282. Take them in order, or take the one you can do well — but do not re-derive the task from the tool. The task is here.

**1. WR2 verification.** Re-run the weights-vs-impact sweep (the P-224 method: 80→99 positional sweeps, 1,500 games each, measuring point differential impact) against the CURRENT code — post-`de60e05` — and confirm the WR2 discrepancy is gone. The history: my P-224 test (2026-11-03) found WR2's slot weight said ~70% of WR1 but the engine treated WR2 as ~92% of WR1 (the receiving spec governed, not the slot weight). Claude fixed it in `de60e05` (Owner-approved): the receiving spec WR2 0.91 → 0.70 and WR3 0.53 → 0.45, and the 32-spot table re-measured (WR1 470 → 525, WR2 330 → 295, ratio 0.56). The fix IS in the code — I verified it myself (specs.ts WR2 0.70 / WR3 0.45, no leftover 0.91; slots.ts WR1 525 / WR2 295). What nobody has done is re-run the sweep since the fix to confirm the discrepancy is actually gone. The salary context: WR1s at $30–35M a year, WR2s at $12–18M — a ratio of roughly 0.4 to 0.6. My view is 0.70 is still a bit high (the spec ratio 0.707 is above the band) and the spec may need to come down toward ~0.50 — but that's my view, not a ruling. Measure the revealed WR2/WR1 and report it with a recommendation.
  - Files you need for this part: `colors/src/sports/nfl/engine/specs.ts` (the receiving spec), `colors/src/sports/nfl/engine/slots.ts` (the 32-spot table), `colors/src/sports/nfl/engine/value.ts` (how the weights are derived), and the P-224 method (in `bulletin/20261103-0100-muse.md` + the inbox P-224 filing). Read ONLY these. Do not read the full boot docs for this part.

**2. Broader weights reevaluation.** Look at the whole 32-spot table (`colors/src/sports/nfl/engine/slots.ts`) and flag any other weights that look off against the salary context or the model's revealed impact. Use the P-224 method — a rank gap of 4+ spots between a position's weight rank and its revealed rank is the signal. File findings via `inbox/<UTC>-<seat>-test-<slug>.md`. The Owner opened up ANY weights for reevaluation, not just WR2.

**3. Test the new tools.** Two new tools landed and need testing by someone other than their author:
- Z.ai's cutover batteries (`batteries/accept.js` + `adapters/w76.js` + `adapters/pancakes.stub.js`, on gh-pages in the `z-post-blue-cutover-2026-11-06 w77/` folder). The reference run is 84 pass / 0 fail / exit 0 against w76. Run them yourself and confirm they work as claimed. Report any gaps.
- Claude's tsc baseline gate (`colors/tsc-baseline.json` + `npm run tsc:check` / `npm run tsc:ratchet`, commit `cb5e0427`) AND guard pass 2 (`568e6c04` — boxscore clean, tsc now 202 → 176, 284 tests pass, verified by Claude with 112 seeded games, result + box JSON sha256 identical). The gate must fail when a file's error count grows. Test it the way Claude did (add an error, confirm it fails, remove it) and confirm it holds. If you want a concrete verification, re-run Claude's 112-game check (8 seeds × 7 matchups × regular/playoff, via `test/nfl/fixture.ts` `play`) and confirm the hashes match.

**4. Respond to the proposals.** Two proposals are waiting for council verdicts (ok / improved / rejected, via inbox):
- Claude's seat stale-lane check proposal (`claude/rulings/2026-11-06-seat-stale-lane-check-proposal.md`). A single `tools/seat-check.sh <name>` every seat fetches from the Architect branch, printing three verdicts: LANE-CHECK (the same test boot-v3 uses), RULES-CHECK (changes to AGENTS.md, COUNCIL.md, PRIORITIES.md or start/end-of-chat files since the seat last wrote — new, and it's how a seat learns the rules moved without asking another seat), SEAT-STATE (retired, lane size, worktree mismatch, preserve check). He'd also make END-OF-CHAT refuse to finish unless the lane file's commit is the branch tip. It's NOT built yet — it's queued after the guard passes — so this is a review of the proposal, not the built tool. The Owner can amend it first (for example, whether RULES-CHECK should also watch `PROJECT-KNOWLEDGE.md`). Give your verdict and any amendments.
- Z.ai's proposals: the cutover batteries (above) and his five flag views (`20261106-zai-answers-to-muse.md` in the w77 package — veto (b) keep, twin header keep, "Cutdown Day" caps, "SEASON RATING" keep, explainer lives in the Guide). The five flags are the Owner's call, but the council's review and recommendation is what P-278 asks for.

## §2 — P-276 is still the P0 headline

The decisive N=1000 baseline reproduction is still the headline verification task. VL's run was ~85–90% done at last report; Flint's NEXT is the P-263 cluster reproduction. Do NOT tune against either cluster (38/3 vs 53/11) until pinned at N=1000. OR + vloc are still blocked on tooling (no deno in their sandboxes) — if you have an idea for making the harness runnable for the council, or a different runner, say so. (Z.ai has been asked to build a Lab harness runner as his top priority — see the Z.ai lab-tools prompt v6 — so this blocker may clear from his side.)

## §3 — The rest of the queue (and the guard-pass update)

P-279/P-280 are done (boot-v3) and reviewed — only the Owner/Architect can move them to BUILT. P-252/P-253 likewise need the Owner/Architect. P-254–P-261 need takers (P-254's behavior is Owner-approved; the mechanics are Claude's). The guard passes continue (Claude's CHAT 4 landed the baseline + guard pass 1: drives, schedule, seasonrun at 0 errors, tsc 298 → 202; guard pass 2 landed boxscore clean, tsc 202 → 176). Next by size: recap 25, season 24, standings 19, draft 17, core/hungarian 15, lineup 14, then the rest (≤11 each). Then the Draft Board slice against `appstate.ts` + `DraftStoreState`. Then building `tools/seat-check.sh`. That's Claude's work, not the council's — but if you spot anything in his reports that needs a council eye, say so.

## §4 — The standing rules

- Work comes from PRIORITIES.md. Take the top line, do it or leave it. Never assign work to a named agent. (Exception, stated above: when the task is already specified in your prompt — as P-282 is here — go straight to it. Do not run `next` to re-find it.)
- Nothing is "delivered" until a pushed commit (give the hash) or a download link exists — never give the Owner a sandbox path.
- Labels everywhere: VERIFIED / REPORTED / INFERRED / UNKNOWN.
- Review chain: WORK by the first seat that takes it; REVIEW by three different seats (VERDICT: ok | improved | rejected); three ok/improved = REVIEWED ✓✓✓.
- Only the Owner or the Architect moves P-items to terminal states (BUILT/SUPERSEDED).
- Only the Architect builds the product file. Council work is ideas, exact snippets, measurements, mock-ups.
