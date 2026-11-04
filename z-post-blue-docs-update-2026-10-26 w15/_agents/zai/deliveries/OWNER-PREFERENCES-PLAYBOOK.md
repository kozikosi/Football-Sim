# OWNER PREFERENCES PLAYBOOK — how to work with the Owner of Z-post-blue

**From:** Z.ai, High Councillor (seat S-2600–2699) · 2026-10-25 · REV 1
**For:** Claude (Architect), DS, and every future councilmember. Required reading before you touch the sim's UI, copy, math, or the Owner's workflow.
**Pair with:** `STYLE-GUIDE-Z-POST-BLUE.md` (the design rules) and `HANDOFF-FOR-CLAUDE.md` (the work state). This file is about the *person* and the *process*.

---

## Who the Owner is, in practice

1. **He is an art director, not a bug reporter.** His feedback mixes copy rewrites ("IN DA CLUTCH"), motion design (slow fades, no drift), layout (mirror the matchup panel), information design (delete methodology paragraphs), and math honesty (integers, real FB/P wins). Treat every bullet as a design ruling with the same weight as code.
2. **He gives rulings, not debates.** When he says "'FINE' → 'OK'", the correct response is `OK`, shipped and verified — not a proposal. Where something is genuinely impossible or hard (logo brightness), say so once, honestly, then do your best attempt anyway.
3. **He tests on desktop, alone, end-to-end** — draft → season → playoffs → Super Bowl → replay → awards → 100-season sim. He experiences the build as a *player*. Latency, missing animations, or a missing Player-of-the-Game register to him as broken features, not cosmetic nits.
4. **He wants the artifact before the ceremony.** His most-repeated process instruction, verbatim: *"Before you do anything else, give me a link to download the latest version."* Ship link → then talk.
5. **He tracks his lists.** He reads his own feedback round-by-round and remembers what was dropped. Round 3 items 14–23 were lost in transit for two rounds — he noticed the pattern of silently-vanished items. Never let an item disappear; every item is shipped, explicitly deferred with a reason, or asked about.

## His most important, most repeated ideas

| # | Idea | What it means in practice |
|---|------|---------------------------|
| 1 | **Integers only** | Zero decimals on screen. Weights ≤ 1000, last digit 0 (5 only if it earns it). Totals, not per-game averages. |
| 2 | **No white text** | All text derives from team palette or the site's fixed non-white set. Includes dropdowns, summaries, badges, footers. |
| 3 | **Palette-driven UI** | Selected team's colors flow into every control, chip, border, score. No neutral defaults. |
| 4 | **One shimmer** | A single reusable team-colored shimmer sweep marks everything celebratory. Reuse it; don't invent new effects. |
| 5 | **Graphical, not tabular** | Cards, bars, bubbles, logos. Tables are a last resort and must be integer + palette. |
| 6 | **Explanations live in the Guide** | The in-site Guide (with Glossary) is the only home for methodology. Inline paragraphs get deleted on sight. |
| 7 | **His exact words win** | He renames labels himself (`Costly Miss`, `OK`, `SIM PLAYOFFS`, `Play the x`, `IN DA CLUTCH`). Copy them verbatim; never polish them. |
| 8 | **Cinematic pacing** | Slow cross-fades (~4.2 s), floaty spacing, no horizontal rules, 5 s / 30 s / 60 s intro cinematics (regular / playoffs / Super Bowl). |
| 9 | **Mirrored symmetry** | Two-team layouts mirror: right team's border on the right edge, right-aligned content. |
| 10 | **Guaranteed moments** | Every game has a shimmering Player of the Game; every win has a shimmering verdict + star. These may never be missing. |
| 11 | **Honest math** | Modeled wins must be real for all 28 slots (FB, Punter included). No display-only fakes, no undefined strings, no phantom labels. |
| 12 | **"20-0" identity** | The perfect-season branding (`Try AGAIN TO GO 20-0?`, full-bleed 20-0 bar) is part of the product's soul. Keep it, all-caps, palette-colored. |

## How to run a round of his feedback (the process that works)

1. **Intake with numbers.** Turn his message into a numbered item list the same day. Every item gets an ID; nothing ships from memory. (This is the lesson of Round 3 §14–23.)
2. **Classify before building.** `RULING` (do exactly as said) / `QUESTION` (he asked) / `DEFER` (say so explicitly). Rulings do not get re-designed.
3. **Ship in waves, verify before he sees it.** One wave = a batch of items implemented + headless verify suite + screenshots + a fresh download link. He should never be your test harness.
4. **Report per item, tersely.** "Item 14 → shipped" beats prose. He reads lists; he skips essays.
5. **Deliver where he can reach it.** Only the chat-download folder is reachable by him. Never reference sandbox-only paths (`desktop/wt/zai`, `/home/z/...`) as if they were on his machine — that failure cost us a whole round (25 Oct).
6. **When stuck, surface it fast.** If a command has hung or a fix isn't landing after two attempts, say so and switch strategy (package + instructions + retry later). Twenty silent minutes on one command is the anti-pattern he explicitly called out.
7. **Write rulings down.** Every new Owner ruling goes into the Style Guide / do-not-regress ledger the same wave, so the next councilmember inherits the law, not folklore.

## Standing anti-patterns (things the Owner has already rejected once)

- Decimal stats, per-game rates, "+16.0 vs league" style captions.
- Methodology/explanation paragraphs inside panels ("Skill and defensive players are ranked by…" — deleted).
- White text, default green/red accents, em-dash Roman-numeral ceremony.
- Label drift animations, popping transitions, horizontal rules as separators.
- "FINAL · 29–34 / You win / Turnovers…" footers — replaced by colored score + shimmering verdict.
- "(0.6 wins left)" value captions — replaced by `OK` / `Costly Miss`.
- Sandbox paths presented as his paths. Download link first, always.

## The one-line version

> Ship him a working, tested, integer-pure, white-text-free, palette-driven, shimmering, graphical build with a download link **first**, log every one of his numbered items, use his exact words, and never let a ruling silently disappear.

— Z.ai · `_agents/zai/deliveries/OWNER-PREFERENCES-PLAYBOOK.md`
