# Claude prompt — chat 2 (rewritten from scratch, 2026-11-05)

Send after chat 1 lands (P-262 + tsconfig). If this chat times out, the slice landing (item 2) can split off into its own chat.

```
Continue.

Chat 1 landed (P-262 + tsconfig). This chat is the w74 rulings + the Draft Board slice + the BUILD-1+2 patch review.

1. Rule on the w74 rulings list — 8 items, not 9 (the semantics are settled; see below). Record each ruling in the repo (one line each), reporting the hash.
   - Settled by the Owner (do not re-litigate): "skilled" means a drafter who selects within the top 30 players ranked by priority (Wins/Priority, not raw OVR) in every draft round. It defines a class (always-#1 to always-#30); the calibration targets (90% playoffs, ~35% Super Bowl, 25% title, P(20-0) ≈ 1–2%) apply to the AVERAGE skilled drafter. The term "top30" is retired — use "skilled" everywhere. Record the definition + the middle-range point in the repo, and rename the policy identifier in code when landing the Lab work.
   - F1: appstate.ts is the only AppState (the store.ts draft-era pair is dead — confirm and remove/rename).
   - F11 / DatasetLoader: the empty-state + import path vs a fictional-with-warning fallback, constrained by the real-names ruling. And the Owner's reframing (Q5): the synthetic dev pool is NOT dev-only and NOT test data — it is a fake in the repo so a public-repo reader sees fake ratings. The slice boots via the DatasetLoader's no-dataset state (manual import), not via devPool.
   - F14 / F15 / F16: the hydration gaps (the rule never assigns roster/statsRecorded/userResults; `htd?? 0` in fromWeekPayload is a silent repair — make htd/atd required, delete the coalesce; the week-kind season-over boundary — the app converts at season end, week kind never stores a finished season, the reducer rejects nextWeek > 22 as corrupt).
   - F6: SaveStatus carries `key`.
   - worldSeed? + deviceId? additive fields. And P-254 is APPROVED (Owner): per-slot last-write-wins on the WHOLE save, never a field merge; the losing lineage kept on disk as a rung-back; a fork resolved as "keep both" at the slot level. Implement the mechanics (field name, mint location, rung-back storage).
   - src/platform/ as the home of storage + a11y glue.
   - SW strategy: stale-while-revalidate (Z.ai's w74/06 diagnosis — network-first navigations failed offline; `Vary: Origin` broke Cache.match — fixed with `ignoreVary: true`).
   - Also rule: re-pin CALIBRATION-TARGETS to 90/35/25 + P(20-0) 1–2% (the parity reference band is 3.07 ± 0.35 — a REFERENCE, not the engine target; the engine target is higher than NFL, derived by the Lab); F2 stats-payload home; G-VM1…11 pattern freeze; G-SW1, G-FLOOR1 (floor = ENGINE_LABEL major `nfl1`); FeedEvent union + N2/N3 shareable contracts freeze; the 07 items (package scripts, contract:check second direction, svelte-check); the 08 items (P-251 diffs, P-257 wording, apply the P-258 delete patch, DATASET.md structure); envelope-freeze mechanics (tag-name convention, manifest location).
   - Seed-share (Q2): keep the code, but the UX is profile-stored seeds — clicking a stored seed pops the feature up. NOT shareable at end of season like the brag share. The worldSeed envelope field is yours.
   - Best-value finding (MUSE, N=1000, VERIFIED): always-#1-by-priority = 89.5% playoffs / 33.0% SB / 21.6% title — IDENTICAL to greedy on every metric. Reason (draft.ts:140): greedy sorts by Wins and takes #1, OVR only as a tiebreak. The "naive best-OVR" label is WRONG; the policy that takes best OVR is `favorites`. The three Lab policies are best-value/greedy, skilled-average, favorites. Correct the labels when landing the Lab work.
   - P-263 cluster (open): the N=100 evidence splits 2 vs 3 — VL + a MUSE run reproduce the ASK exactly (38/3); OR/VLOC/Beam get 53/11. The N=300 anchor (47%/6%) needs re-examination. Slot handling is the prime suspect. Do not tune against either cluster; the council's Q10 reproduction covers it.
   - Naming (Q9): convert Colors naming to 76 / Pancakes / both where it makes sense. The product is "76 Pancakes" (banner "76"). The `colors/` directory and internal names are yours to convert where it makes sense — not a blanket rename of existing code.
2. Land the Draft Board slice draft (w74/05; review against item 1's rulings; 23.9 KB gzip, 2/2 Playwright; G-VM1…11 flags). Push, report the hash.
3. Review the BUILD-1+2 patch file (`inbox/20261104-0430-muse-BUILD-1-2-patch.md` + `_agents/muse/deliveries/council-discussion-reasons.patch` on council/muse — it exists; the cited commit c385cb12 is empty and must not be cited as the implementation) and apply or reject it.
4. Do not run the digest unless the work touches the queue.

Heads-up (not a task this chat): the old-shell deletion is APPROVED (Owner), timed at cutover, anchored on the LATEST wave before 76 Pancakes is finished (not w70), with an archive tag. Do not delete anything in this chat.
```
