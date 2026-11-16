# Macro prompt — what matters most next? (FOR: P-333)

**What this is.** You are one of three seats (Pickle, DS, GLM) receiving the same prompt. The Owner wants three independent macro judgments — not a specific task, but your honest assessment of what matters most. Answer in your own words. Do not coordinate with the other two seats; KG will merge the three answers.

**The current state (so you can answer cold).**
- The engine (Claude, Architect): the 1c pack builder landed (Phase 1 pools baked to a pack, TS sim reproduces the Python lab within 1% on all 11 metrics, ~3,900 games/s). Suite 378/378, type ratchet 89/89, production build passes. A framework-free dev page builds and shows one real-pack game. Claude's next work: the remaining nodes one at a time on the pack, then re-measuring the Z.ai migration table; and baking the current-era product pack from 2023–2025 data. The CI gate is still advisory (continue-on-error); KG ruled to flip it to a real gate when Claude is ready.
- The 4-3/3-4 formation gap: the 4-3 roster loses 2500 in 3-4, the 3-4 roster loses 1800 in 4-3, gap 700 table / ~720 measured = 0.09 wins a season. KG rejected every re-pricing option (Inkling, Ernie, Beam, VL, Glyph) because they violate the principles that determine the rest of the table. The flex table's prices are guidelines, but the principles behind them (destination weight, athletic distance, the DIME trio at 12, the FB exception, the cross-side floor) are not to be violated by ad hoc changes. The council is now working on two directions: (A) a principled formula that derives prices from the same logic and closes the gap, and (B) the structural side — Ernie's real-roster bias (28 teams better in 4-3, 3 in 3-4, mean +1144 units), which re-pricing cannot close below ~947 because real rosters are 4-3-shaped. KG likes the 0/2/6/12 tier structure and does not want a new tier (a penalty of 4).
- The Cakepanz shell (Z.ai's parallel UI track): the shell exists in slices 1–5, engine pinned at d3bd81d2. A verification round is drafted but unsent. The deployed tree was RED on its own engine suite (277 pass / 9 fail) because a re-pin moved the engine but not the test expectations. The Team Select slot blocker is one persisted field (the draft payload has no slot). Z.ai Rev 10 is REVIEWED (3 of 3).
- Open decisions for KG: 11 rulings from the Cakepanz round (shell of record, pin, visual law, labels, etc.), the gap pick (once the council reports on the principled formula + structural side), and the real-roster bias follow-up.

**Your job — three questions.**
1. What is the single most important problem to solve next, and why? (Not the most urgent task — the problem whose solution unlocks the most.)
2. What concrete next step would you take about it? (One step, specific enough to act on.)
3. Is there anything we are doing — or about to do — that is a waste of effort, or pointed in the wrong direction? Name it and say why.

**Filing.** Write your answer in your `inbox/` as a filing labeled FOR: P-333, and push it. Push after every finished file. Answer in your own words; do not read the other two seats' answers before filing yours (KG merges them).

**Innovation.** Think around the issue, not just inside it. If you see a direction nobody has named, name it. The prompt tells you what to assess, not how to think.
