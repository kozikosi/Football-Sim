SPEAKER: porca | ROLE: council seat (relay, not author) | TASK: file the in-chat supplementary work order so council can `git show` it | DATE: 2026-11-21T02:54Z
FOR: all council seats / Architect / MUSE — provenance copy. The order below is reproduced verbatim from the in-chat message received this session, attributed there to "Owner (via pickle, council seat)". Porca did not author or amend it. If pickle or the Owner files the authoritative copy on `council/pickle`, that copy governs; this one exists only so reviewers can cite a pushed path and commit.

---

COUNCIL SUPPLEMENTARY WORK ORDER — while Z.ai builds S15 (21 Nov 2026)

FROM: Owner. FOR: all council seats. Self-contained — read only this and the named files. Nobody is assigned to anything: whoever opens a chat runs node tools/council.mjs next (v9+, from origin/council/muse) and takes work; later seats REVIEW it. A review you can do beats new work in the same tier. Three ok/improved reviews by three different seats (not the author) make an item REVIEWED ✓✓✓.

0 · State of the world (verified — so you can work without reconstituting the last chat)

• Z.ai is building S15 from my self-contained brief council/pickle:inbox/20261121-0110-pickle-TO-ZAI-continuation-v2-S15.md; it governs where work order v8 conflicts with it. Engine pin 408410477 frozen; zero engine-byte diff; no product/engine/pin/governance/queue file may be edited by a seat.
• The Architect's last push is dfdb887966a61ce8cbffa1d9ec0a107e55fea4a0 (parent 7d8d71c); his following sitting timed out with no artifact — no newer commit on any remote ref, both architect worktrees clean/stale. Do not wait for him. His four docs (claude/NOW.md, cutover-runbook, dispatchasync-contract, zai-work-order-v8) are on that tip, read-only to you.
• S14's shell is already complete: slices 1-5 and s6-s12 BUILT (deliverables/SLICE-STATUS-2026-11-20.md). The composite is PARTIAL at step 13b (VERIFY-§26-append.txt:§26.5); Z.ai completes it.
• Cloudflare is the deploy target (gh-pages retired). How to deploy is the Architect's decision with council input — that is our main open lane. The account does not exist yet; the Owner provisions it.
• Live governance, queue and tool are on origin/council/muse, not council/base. Do a step-0 refresh. Labels: VERIFIED (you ran it) · REPORTED · INFERRED · UNKNOWN.

1 · Highest value now — REVIEW the relay brief Z.ai is executing

REVIEW-OF: council/pickle @ bafa80cbc: inbox/20261121-0110-pickle-TO-ZAI-continuation-v2-S15.md. Also in scope: hy4's council/hy4 @ af72cd95: inbox/20261121-0100-hy4-TO-ZAI-continuation-prompt-S15-long.md and porca's council/porca @ 7d035feb: inbox/20261121-0033-porca-TO-ZAI-continuation-order.md.

Check every byte claim against the repo, not the prose: the w89 pulse lines (origin/gh-pages:Football-Sim-Z-post-blue-w89.html:12849-12855 and :1749-1750, :6430, :6432), BoardRow.svelte:25/:47, DraftBoard.svelte:116, shell.css:181, the six visual.battery.mjs selectors (:98,:175,:199,:206,:230,:292), the two shell.battery.mjs LOAD calls (:66,:175), the S14 gate receipts and the PARTIAL composite. Then test the three calls I made, since Z.ai is acting on them:

1. "cp-quick is removed (Architect decision) stands" — read v8 §2.2 verbatim. Is the decision-vs-premise split correct?
2. "suggestIds[] keep as default" — does removing it actually risk W14/restore, or is it redundant once derived from array positions?
3. "rawSort label is Claude's" — is that the right refusal to pick WITHDRAWN vs REOPENED?

File inbox/<UTC>-<seat>-S15-review.md with REVIEW-OF:, VERDICT: ok | improved | rejected, commands and outputs, and the improved text in full if you change anything. If you find an error, say so loudly and early — Z.ai is already working. Do not edit my file or his tree.

2 · Hand-over verification checklist (a tool, not an opinion)

When Z.ai says "slices done", a Verifier must be able to check the hand-over in minutes. File a self-contained checklist as an inbox snippet with exact commands and expected outputs for:

• pushed hash on council/zai (or zip + sha256 if no push credentials);
• node tools/verify-package.mjs . → every entry OK, converse clean, exit 0, at final bytes; CHECKSUMS regenerated;
• git diff --name-only 408410477 <tip> -- colors/src → empty; 69 engine files byte-identical;
• battery counts at or above S14 floors (engine 430/430 · node 35/35 · board 19/0 · visual 18/0 · slot 28/0 · shell 48/0 · slice 29/0/10/3 · contrast 2/0 · viewport 45/45 · golden MATCH), with the named laws that must appear, not just totals;
• falsifier set: every mutant DIES by its named law with child logs under deliveries/receipts/partH-<next>/;
• composite: bash scripts/acceptance-run.sh reaches "ACCEPTANCE RUN COMPLETE" with steps 13b-17 recorded;
• dist/ and dist/single.html and the zip, each with sha256;
• W14 both directions; L-ERR both halves; no console errors across START → 3 picks → UNDO → reload/LOAD → finish;
• a one-page note naming the new selectors (Draft button, TOP badge, why line).

State the failure action for each check. File it; do not run it against a build that does not exist yet. Propose it as a PRIORITY+: line in your bulletin if MUSE needs a queue row.

3 · Cloudflare "how" — counsel the Architect, do not deploy

The Owner delegated the decision to Claude + council. Council input already on record: hy4's council/hy4:inbox/20261121-0040-hy4-OWNER-CLOUDFLARE-DECISION-BRIEF-and-Claude-parallel-work.md recommends Pages + explicit Direct Upload (wrangler pages deploy dist, checked-in wrangler.toml with no secrets, token outside the repo) over Git integration (auto-deploy would publish before the side-by-side and gate receipts, making the "go" trigger unenforceable) and over Workers static assets (no gain, different rollback screen). ENDORSE, REFUTE, or IMPROVE it from primary sources. Deliverable: one inbox filing with the exact commands, the rollback path, preview/domain/retention facts, and what must stay UNKNOWN until the Owner provisions the account. Label every external fact as REPORTED with its source. Do not create a Cloudflare account, config, or deploy script in the repo.

4 · Side-by-side acceptance spec (so it can be filed the moment a build exists)

The Owner requires a filed side-by-side against live w89 at 390×844 and 1180×950, light and dark: Team Select, board with a top-three row, pick confirm, finished draft. "Directionally similar" is a FAIL. File an exact recipe: the four URL/state setups, how to reach each screen, the screenshots to capture, the token assertions (glass --glass/--glassbd/--shadow, 22 px radii, Cinzel inlined and offline, gold not drifting orange, no blue panels), and a pass/fail rule per screen. No images in lanes; name paths only. I coordinate the actual filing when a built tree exists — do not attempt it from S14 alone.

5 · Test-only safety work (safe while the engine pin is frozen)

• P-033 is already REVIEWED: tools/post-merge-smoke.mjs:421 still lists tabGuideBtn for the removed Guide tab. Verify a corrected TAB list and post the Biome selftest commands and verbatim output on a machine that has Biome (if Biome is absent, say UNVERIFIED, not pass).
• Propose a D13 purity test over core/view/app and a pin-watch CI gate that fails if 408410477 drifts. Test files only — no engine bytes, no product HTML.
• Propose the schema for claude/releases.md (deployment id/URL, dist/ sha256, zip sha, golden seam e8fed8ab…, source commit, date). It is Claude's file; deliver a snippet in your inbox, do not create it.

6 · MUSE hygiene — propose, do not edit

MUSE owns council infrastructure under standing Owner permission. File findings in your bulletin entry for MUSE to integrate:

• The live AGENTS.md still pins d3bd81d2 while every tree and Claude doc uses 408410477 — five lines (AGENTS.md:44,45,46,73, PROJECT-KNOWLEDGE.md:18).
• The four verbatim Owner rulings from this round (top-three stays / why copy stays; Cloudflare decision delegated; remove-ring-and-panels; the five direct answers filed by hy4 at 20261121-0020-hy4-OWNER-ANSWERS-five-questions-verbatim.md) need intake into _agents/owner-notes/ and V23-OWNER-NOTES-INTAKE-LEDGER.md.
• beam's S14 review is wrong-tree and should be withdrawn from the review chain; scripts/acceptance-run.sh:52 carries a stale "16/0" baseline line (that one is in Z.ai's tree — relay it to him, do not edit it).

7 · Hard fence

Do not rebuild slices 1-5; do not edit the product HTML, colors/, engine files, protected constants, the pin, AGENTS.md/CLAUDE.md/biome.json, tools/, QUEUE.md, CHRONICLE.md, another seat's lane or inbox, or any of Claude's claude/ docs. Do not apply the rawSort engine-half proposal (inbox/20261120-2218-zai-S14-proposal-rawSort-engine-half.md) — the engine is frozen. Do not weaken a law to make a test pass. Do not deploy, touch gh-pages, or make-live. No images in lanes, no dated/merged/final copies in the root, no force-push, no stash. Commit and push your own council/<seat> branch and verify with git ls-remote; run node tools/preserve.mjs check at clean-up. Other seats' dirty worktrees are not yours to touch.

8 · If Z.ai finishes while you work

Stop speculative work. Verify the hand-over using the §2 checklist, then the Architect merges and runs gates 1-10; the Owner decides make-live after seeing the side-by-side. Report facts; the Architect decides what to do with them.

9 · Provenance

All §0 facts were VERIFIED this round from git ls-remote, git fetch --prune, the live council.mjs on origin/council/muse, and byte reads of the S14 tree, origin/gh-pages and origin/architect/engine-and-seats. This order is advisory input from pickle (council seat); the Owner may amend it. No product, engine, pin, governance or queue file was edited to write it.

— Owner (via pickle, council seat)
