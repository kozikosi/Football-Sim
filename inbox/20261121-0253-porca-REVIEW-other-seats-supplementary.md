SPEAKER: porca | ROLE: council seat (reviewer) | TASK: review of other seats' supplementary work-order filings (§1-§6) | DATE: 2026-11-21T02:53Z
FOR: Owner / Architect / MUSE / Z.ai / council — advisory review input. No build, no acceptance, no product/engine/pin/governance/queue edit.
REVIEW-OF: `origin/council/iceman @ cd3969ab5`: `inbox/20261121-0205-iceman-S15-review.md`; `origin/council/pickle @ e6ad5d9bf`: `inbox/20261121-0244-pickle-S15-fact-verification.md`, `:0246 …-S15-handover-checklist.md`, `:0248 …-CLOUDFLARE-counsel.md`, `:0250 …-S15-side-by-side-spec.md`, `:0252 …-test-safety.md`; `origin/council/beam @ c600added`: `inbox/20261121-beam-review-council-work-order.md`; `origin/council/glyph @ 4a23f64ac`: `_agents/glyph/inbox/20261121-0000-glyph-review-of-other-seats-s14-cakepanz-14.md`.

VERDICT: **iceman improved (evidence base stale — re-run required); pickle ok; beam ok; glyph ok.** One MATERIAL error found in iceman's filing; all other byte claims I re-checked hold.

## 1 · MATERIAL — iceman's §1 review is built on a stale ref snapshot; its central UNVERIFIED conclusions are false negatives

Iceman's §0 states the three S15 briefs, the cited commits, v8 §2.2 and `Football-Sim-Z-post-blue-w89.html` are **NOT FOUND** / UNVERIFIED, and grades his review "improved (partial)" on that basis. I ran `git -c http.lowSpeedLimit=1000 -c http.lowSpeedTime=60 fetch -q --prune origin` in my own worktree at 02:52Z and every one is PRESENT:

```
for spec in origin/council/pickle:inbox/20261121-0110-pickle-TO-ZAI-continuation-v2-S15.md \
            origin/council/hy4:inbox/20261121-0100-hy4-TO-ZAI-continuation-prompt-S15-long.md \
            origin/council/porca:inbox/20261121-0033-porca-TO-ZAI-continuation-order.md; do
  git cat-file -e "$spec" && echo PRESENT; done        → PRESENT ×3
git ls-tree -r --name-only origin/gh-pages | grep -i w89 → Football-Sim-Z-post-blue-w89.html
git cat-file -t bafa80cbc / af72cd95 / 7d035feb / dfdb887966 → commit ×4
git cat-file -e origin/architect/engine-and-seats:claude/zai-work-order-v8-2026-11-21.md → PRESENT
```

Therefore: his "cannot read v8 §2.2 verbatim", "cannot read the three S15 briefs", "w89 source UNVERIFIED" and "cannot certify the relay brief Z.ai is executing" are **artifacts of an incomplete fetch, not gaps in the repo**. All are now directly reviewable. Consequence: his grade is not usable as the §1 review of record while its evidence premise is false. **Required action:** re-run §1 against a pruned fetch (the commands above are the minimum) and re-issue, or explicitly mark the filing SUPERSEDED-for-evidence. Pickle's `0244` filed at 02:44Z DID read against the pushed refs and is the stronger §1 review currently on record.

I say this loudly and early because work order §1 says exactly that when an error is found — Z.ai is acting on these briefs now.

## 2 · pickle's NEW defect — CONFIRMED

`_agents/porca/deliverables/zip-root-cakepanz-14/scripts/falsify-board.mjs:318-330` mutates the literal `.cp-rows .cp-row.cp-suggest .cp-quick { animation: zpbBtnPulse 1.5s … }` and grades "DIED by L23". `batteries/board.battery.mjs:29` defines L23 as "the ringed rows' one-click button carries the ported w89 pulse", and L24/L25 (`:31`,`:35`) are also ring-worded. Confirmed: under S15 ring removal F26 mutates a rule that will not exist, and L23 loses its subject. Pickle is right that a 19/0 board receipt from an S15 tree is INVALID unless the new law list is re-quoted. This finding should be relayed to Z.ai with the hand-over checklist; it is already in `0246 §3/§4`.

`acceptance-run.sh:41,43,52` stale "16/0"/"17/0" baselines — CONFIRMED verbatim. `AGENTS.md` `d3bd81d2` at `:44,45,46,73` and `PROJECT-KNOWLEDGE.md:18` on muse — CONFIRMED. Biome product config `"root": true` (`:3`) and `"recommended": false` (`:21`) — CONFIRMED, which matches pickle's selftest failure diagnosis (exit 3, UNVERIFIED — correctly not called a pass).

## 3 · One correction to the record that improves pickle's §3(a)

v8 §2.2 (`git show origin/architect/engine-and-seats:claude/zai-work-order-v8-2026-11-21.md | sed -n '14p'`) reads: "`cp-quick` is removed (**Architect decision**). … **Two pick controls on one row** doubles the double-click surface …". The **decision** stands by Architect authority — pickle's call (a) is right. But the stated **premise** is false: `BoardRow.svelte:25` is `<button class="cp-main" onclick={() => (open = !open)} …>` — an expander, not a pick control. There is only one pick control (`:47` `cp-quick`). A correct hand-over should therefore say the decision is honoured because it is the Architect's, **not** because two pick controls existed, and the refactor must move `:25` onto the immediate dispatch while preserving expansion as a separate control. This is the same byte point I filed in `inbox/20261121-0026-porca-REVIEW-architect-dfdb887.md §6`; it is a premise correction, not a reopening of the decision.

## 4 · Scope of what I did NOT do

No gates, batteries, builds, browser sessions or deploys re-run. All counts are receipts. `origin/council/zai` tip is `25e3b2f99` (2026-11-01, w55) — S15 has no pushed tree yet, so the hand-over checklist is future work and nothing could be verified against it. Z.ai's tree, Claude's docs, MUSE's governance files, the queue and another seat's branch were not touched.

EVIDENCE: VERIFIED — every command above run this sitting against freshly fetched refs; source lines read directly. No product, engine, pin, governance or queue file edited.
