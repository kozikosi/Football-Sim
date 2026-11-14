SPEAKER: glyph | ROLE: seat (work/design) | TASK: P-337 — Late-round draft seamlessness (simple decisions after round 10) | DATE: 2026-11-14T05:25Z
FOR: P-337

# P-337: Late-round draft seamlessness — UX + presentation design

**Owner direction (VERIFIED):** "We want the user to really enjoy the first ten rounds of the draft and be able to make simple decisions in the second half, not have to do complex math or planning to make a decent roster." First 10 rounds = deep fun; second half seamless. UX/engine-presentation question (not a flex-pricing change).

## Design goals
- Rounds 1–10: preserve full depth (flex prices, Wins/value, tradeoffs, gravity context where relevant) — "gm-minded sickos" experimentation.
- Rounds 11+ (second half): one-glance, low-cognition picks that still produce a decent roster.

## Proposal

### 1) Mode switch at round boundary (configurable)
- Default boundary: **after round 10** (`currentRound > 10`) enter **Simple mode** for recommendations/UI density; allow toggle "Show full detail" for power users (does not remove simplicity default).
- Banner/state: subtle indicator "Late rounds — simple picks" (plain language).

### 2) Board presentation (Simple mode)
- **Single primary sort:** "Best for your team" — one number per player: `Team Fit Score` (integer) combining roster need, effective OVR at best legal slot (including 0-cost dual-position fits), and flex penalty already baked in; hide intermediate components by default.
- **One-click action:** prominent `Draft best` / `Fill need` button that selects top recommendation (with confirm if desired).
- **Reduced columns:** show Name, Pos (incl. dual badges), OVR, Fit Score, Need tag; collapse/hide: detailed flex-price breakdowns, multi-metric comparison tables, marginal Wins math.
- **Need clarity:** highlight top 1–2 remaining roster holes ("Need: CB", "Need: OG") with best available at each as a single chip.

### 3) Flex/lineup advice presentation
- **No complex planning:** do not show "if you take X now you can flex Y in round 28" chains. Show only: "Fits [slot] now" or "Flex to [slot] (−N)" as a short label when relevant; prefer players who are natural fits (penalty 0) in late rounds in ranking tie-breaks.
- **Auto-assign preview:** on hover/select, show "Projected slot: SAM" (one slot), not full lineup recompute explanation.

### 4) Recommendation logic (presentation layer, INFERRED)
- Rank by: (1) fills an empty/weak starting or key depth slot, (2) highest `effectiveOvr` for that slot, (3) dual-position flexibility bonus (small, integer tie-break), (4) raw OVR. Expose only final rank/score.
- Ensure "decent roster": guarantee algorithm never suggests leaving a required slot unfilled when a legal player exists (respect emergency fallback rules silently).

### 5) What stays available
- Player card/details on demand (tap/expand) for users who want depth.
- Full detail toggle restores rounds 1–10 style.

## Non-goals
- No change to flex pricing, engine math, or draft order.
- No forced auto-pick unless user clicks.

## Acceptance checks (for implementation review)
- After round 10, default view shows single score + one-click best pick; no multi-step planning UI.
- Rounds 1–10 unchanged in depth by default.
- Mobile/390px: controls remain reachable; labels plain.

Labels: VERIFIED (Owner intent). INFERRED (specific UI mechanics/scoring formula). No engine changes.
