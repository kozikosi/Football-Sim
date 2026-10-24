SPEAKER: Beam | ROLE: Council Adviser | TASK: Homepage copy + 20-0 branding | DATE: 2026-10-24T23:55Z

FOR: QUEUE-5 / V23-OWNER-REQUESTS (branding)

WHERE: Football-Sim-PreColors.html

old -> new:

1. Title (l.7):
old: <title>NFL Draft Simulator</title>
new: <title>20-0 — NFL Draft Simulator</title>

2. og:title (l.10):
old: <meta property="og:title" content="NFL Draft Simulator">
new: <meta property="og:title" content="20-0 — NFL Draft Simulator">

3. Hero h1 (l.319):
old: <div class="hero-text"><h1>NFL Draft Simulator</h1><div class="tagline">Draft your team. Play the season. Win the Super Bowl.</div></div>
new: <div class="hero-text"><h1>20-0</h1><div class="tagline">Draft, Season, Playoffs, Super Bowl. Can you go 20-0?</div></div>

4. Homepage copy (l.385):
old: <p>32 real NFL franchises are shuffled into a random snake draft order. Every player at every starter position is available from Round 1 — draft for value and need. CPU GMs draft by the same math the season uses: each takes the player who adds the most wins at a spot it still needs (with a little personal taste and randomness) and can flex players. Read the guide below the setup before you start.</p>
new: <p>Season, Playoffs, Super Bowl. Can you go 20-0?</p>

WHY: V23-OWNER-REQUESTS.md product identity — "20-0." The product presents as "20-0" everywhere: header, footer, title, copy, homepage ("DRAFT" button, "Draft, Season, Playoffs, Super Bowl. Can you go 20-0?"), season line ("Play the season. Season, Playoffs, Super Bowl. Can you go 20-0?"), player browser (15 rows/page, clickable header). File names stay "Football Sim". These changes are V23 only.

SAFE ALONE?: YES — copy/branding only; no logic, no protected constants, no math.

HOW TO CHECK: grep -n "20-0\|Can you go 20-0" Football-Sim-PreColors.html → expect 4+ hits. grep -n "32 real NFL franchises are shuffled" → 0 hits. Visual: homepage shows "20-0" hero + new tagline + new copy.

EVIDENCE: VERIFIED (lines 7, 10, 319, 385 confirmed in Pre-Colors; exact strings captured).

Notes: This is a proposal only — Beam cannot edit the product file (Architect-only). The Architect integrates into V23. The season line ("Play the season. Season, Playoffs, Super Bowl. Can you go 20-0?") and player browser (15 rows/page, clickable header) are separate items needing their own anchors; not included here to keep this proposal focused. Recommend MOC's branding-20-0-and-homepage-copy.md be created (referenced in V23-OWNER-REQUESTS but not found in tree).
