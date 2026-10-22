# P6 · Re-anchor the work order against `Football-Sim-V21.html` — the receipt

**SPEAKER: MOC | ROLE: Council reviewer (S-2500–2599) | TASK: council idle brief, P6 (the chores that unblock everyone) | DATE: 2026-10-22T05:00:00Z**

**Claimed:** P6 · re-anchor the work order's anchors against `Football-Sim-V21.html` with `verify-anchors.mjs` — **started and done**, receipt below. (The other P6 chores — trimming the bulletin into `_archive/`, and the biome sweep in the other lanes — are open.)

**The instrument:** `node _agents/minimax/tools/verify-anchors.mjs V22-Suggestions.md Football-Sim-V21.html`

**The build it ran against (VERIFIED):** `Football-Sim-V21.html` — sha256 `044d1759e01ac99b222602a995b01806c997d00c44693b0f7a9df94a6524ff48`, 656,746 B.
**The two built candidates (do not rebuild — diff them):** `V22-candidate-2026-10-21.html` `e5fa7e0e89136809…` 660,046 B and `V22-candidate-teamcolours.html` `7eeffa861536508e…` 659,305 B, both in `_agents/minimax/prototypes/` and on `origin/council/minimax-lane`. *(Note: the colours candidate now hashes `7eeffa86…`, not the `b3de0523…` the brief quotes — the brief's hash is stale, which is itself a small instance of the class of error the tool exists to catch.)*

## What the check says

| bucket | what it found |
|---|---|
| **line references** | **94**, the highest **5,894**; the build has **6,554 lines** — so every reference is in range and **none points past the end of the file** ✔ |
| **OLD strings that only partly match** (near misses — check the wording) | l.977 `[A · Coaching philosophy and aggressiveness]` "Your Strongest Units" · l.1059 `[F · Regular season review]` "More Advanced Stats" · l.1079 `[G · Playoffs and champions]` "Seasons by Win total" |
| **NEW strings already in the build** (these changes are already applied) | l.1467 "had ripped off" · l.1715 "Reading the draft board" · l.1765 "Ratings shown are effective ratings…" · l.1925 "advanced stats" · l.2819 "third corner" and "also fits:" |
| **missing** | a longer list, ending at l.1473 "about +2.2 points on the scoreboard." (and 17 more) |

## The triage that matters — and it is a change to the tool, not to the document

**Reading the buckets, most of the "already applied" hits are false positives, and they are all quotations.** The work order quotes the Owner's words and the current build's words inside its entries — "had ripped off" is the sentence the Owner wants **removed**, "Ratings shown are effective ratings…" is the string he wants **removed**, "third corner" and "also fits:" are the **old** forms being replaced. The tool pairs an old→new pair and asks "is the new string already in the build?" — but in an entry whose *purpose* is to **remove** a string, the quoted string is the **old** one, and it is in the build precisely because it has not been removed yet. **So a removal entry reads as "already applied" when it is in fact entirely unapplied.**

**What that means for the council, and it is the actionable part:**
1. **The "already applied" bucket cannot be read as a work list as it stands.** It is mostly quoted text. The reliable signal is the **OLD-string bucket**: an OLD string that is **not** in the build means the change is already applied; an OLD string that **is** in the build means it is still to do.
2. **The tool should distinguish the two kinds of entry** — a **replacement** (old → new) and a **removal** (old → gone) — and only report "already applied" for a replacement whose new string is present, or a removal whose old string is **absent**. Until it does, the council should read the near-misses and the OLD bucket by hand.
3. **The three near misses are real wording drift, not false positives**: "Your Strongest Units" (l.977), "More Advanced Stats" (l.1059) and "Seasons by Win total" (l.1079) are in the work order with a form that does not match the build's. Two of them are **Owner's own strings that he has since changed** — the Owner's latest brief says the section is now **"Advanced Stats"**, not "More Advanced Stats", and the chart is "Seasons by Win total" (still). So the work order carries a **superseded** label; the correction is to the document, not the build.
4. **The 94 line references are all in range** against `Football-Sim-V21.html` — the anchors do not need re-numbering against the *release* artifact. They will need re-checking **after** the V22 build lands, because that build's line count will differ.

**What I did not check:** the 94 references one by one (the tool checks existence and content, not that each points at the *right* line); the "missing" bucket in full (it is 20 lines long and the tail was shown); and the same check against the two **built candidates** rather than the release artifact — which is the check that would actually tell us how much of the work order is already applied in the candidates, and it is the obvious next command for whoever takes the next P6 chore.
