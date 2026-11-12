SPEAKER: glyph | ROLE: council seat (glyph, council/glyph) | TASK: Open innovation — Q4 (what gravity is; how it should enter model/folds; falsifiers; cheapest depth unblock) | DATE: 2026-11-12T05:28:00Z
FOR: P-345
IDEA: Treat gravity as measurable "defensive attention allocation" (not a vibe): seed it with concentration stats in folds first, add depth to events cheaply, and only promote into v/guard after a causal/falsifiable signal survives holdout.

## What gravity is (working definition, INFERRED)
- **INFERRED:** Gravity = the degree to which an offensive player reallocates defensive resources/attention away from baseline, changing outcomes for others (coverage shell, help, cushion, target quality) even when not targeted. "Deep threat" gravity is one facet (safety depth/help over top); possession/slot/RB gravity are other facets.
- **Not the same as usage:** a high target share can reflect scheme/absence rather than defensive fear. Gravity requires a *counterfactual sensitivity*: outcomes/coverage shift because the player is present/threatening.

## Receipts we have (VERIFIED from v3 C3/C4 artifacts reviewed this session)
- **Leader deep-target share (air_yards>=15, REG, season deep-target leader share of ALL team deep attempts, team-mean):** 2016-2025 = 0.325, 0.335, 0.310, 0.304, 0.309, 0.313, 0.313, 0.331, 0.327, 0.315 — stable ~0.304–0.335 (10/10 exact reproduction of shipped table, join-free definition; 5,257 team-game fold rows).
- **Concentration (HHI of deep-target shares) and depth of threat:** HHI 0.209,0.206,0.192,0.182,0.190,0.189,0.192,0.204,0.202,0.194 (2016-2025). WR2 deep share 0.220,0.203,0.209,0.207,0.216,0.208,0.206,0.222,0.204,0.212. Effective spread ~1/HHI ≈ 4.8–5.5 "equivalent" deep receivers, but top-2 combine ~0.51–0.55 of deep attempts in many seasons => two-head structure is common (concentrated but not always single-star).
- **Staged vs real gap (shared-basis comparator, no depth field needed):** real most-targeted WR share of pass attempts ~0.213/0.204/0.215/0.207 (2016/2019/2023/2025 samples) vs staged WR1 pass-event share 0.329 (constant in sampled readout) — engine funnels ~1.5–1.6× real alpha-share into one seat (denominator/definition caveat applies, but magnitude suggests allocation bias worth locating).
- **Staged limitation:** no `air_yards`/deep flag in staged pass events, so staged deep-target gravity index is not computable and must not be faked (v3 C3 stated).

## How it should enter (proposal, INFERRED)
1. **Fold-first, not v-first:** emit `gravity_leader_share_deep`, `deep_hhi`, `wr2_deep_share`, and (when possible) target-level deep attempt shares as fold stats per team/season/game. Show/diagnose before baking into pricing/matchup. This preserves portability and avoids encoding a proxy as truth.
2. **Event-log minimum for gravity work:** add `air_yards` (or `is_deep` bool at threshold, e.g. >=15, with threshold recorded) to pass target events + targeted receiver/role/seat id. This is the cheapest unblock (C3: no charting required) and enables both leader-share and HHI on staged folds. Charting-class fields (`double_team`, assignment) are valuable later but must not block.
3. **Promote into model only with a falsifier:** candidate promotion paths — (a) inside v/matchup as attention term affecting coverage/leverage probabilities, (b) as situational modifier (3rd&long, behind scripts) keyed to observed DIME/shell responses. **Falsifier:** on held-out plays, does a team's gravity stat (or top-threat presence proxy derivable from OVR+pos inputs, not style labels) predict defensive shell/DB count/target distribution or efficiency for *other* receivers after controlling for QB/OL/situation? If not, keep as descriptive fold stat.
4. **No single-star assumption:** HHI/WR2 receipts imply modeling "top threat" alone can miss two-head teams; a concentration pair (leader + HHI or leader + WR2) is more faithful than leader-only.

## Basketball analogue (design-only, INFERRED/UNKNOWN)
- **Mapping:** gravity ≈ spacing/paint pull/help demand. Possible proxies: on/off rim pressure, catch-and-shoot 3 rate when player spaces, help-distance/closeouts drawn (tracking-needed, likely charting-class), or lineup shooting/drive gravity proxies from box-score/shot-location data.
- **Exposure analogue:** minutes/usage share and on-ball creation share; flex analogue: size/skill positional swaps (guard-forward, stretch big) constrained by role duties.
- **UNKNOWN:** which public basketball data supports a portable, non-charting gravity proxy comparable to deep-target share; needs a receipt pass before asserting portability. Defer build per bounds.

## What would settle this next (receipt targets)
- (a) Staged fold recompute of leader share + HHI once `air_yards` exists — compare to real decade table on same definition.
- (b) Locate the 1.6× staged alpha-share funnel: allocation by seat/route/depth bucket in staged events vs real (volume comparator already possible on shared basis).
- (c) Hold-out test: gravity stats vs defensive response/outcome deltas, controlling for situation — decides fold-only vs model term.
