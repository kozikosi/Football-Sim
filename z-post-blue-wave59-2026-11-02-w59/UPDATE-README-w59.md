# w59 — the update readme (Z-post-blue, Z.ai seat)

**File:** `Football-Sim-Z-post-blue-w59.html` · md5 `889e531b9418fa7a2604d3e8ab4d23b4` · 1,679,013 chars (1,680,808 bytes)
**Base:** the Owner's w58 (`7d1e07dd…`, 1,661,434 B) + the best of the Owner-pushed w57 merged in.
**How to open:** double-click the HTML in any browser. Everything is local; nothing phones home. `?storage=1` still opens the storage design walkthrough.

## What changed (the Owner's nine, in his words' order)

1. **"CB4/DIME" → "DIME"** on the position rankings page (the spot buttons and the dropdown; the hover title still explains CB4).
2. **Position Rankings phone cards** — no more weird label-column alignment. One natural line per card: `#N · crest · Team · score`, player names flowing beneath, left-aligned.
3. **Madden Rankings phone cards** — same treatment as the draft board: `#N · Team · score` on one line, ANCHOR/LEAK beneath, the bar last. The number score sits next to the rank; fewer lines, smaller format.
4. **Player Browser phone cards** — six labelled lines → two: `name · pos chip · OVR` / `Team · SPD · STR`. The cards no longer grow as the window shrinks. (Also fixed on this page: the system-light melt — SPD/STR/OVR values had gone near-invisible on light-theme pages; a malformed dark-theme rule from an earlier merge was the cause and is removed.)
5. **Unit Comparison** — the table no longer snaps from full width to a narrow stack. It leaves the generic stacking machinery and compresses gradually (steps at 1024 / 760 / 480), full width at every size. Both comparisons (home + draft-vs-draft) share the fix.
6. **The cinematic lock** — the page behind ANY cinematic (game replay, pregame marquee, Super Bowl storm, playoff-run cine, rest/books, cautions, storage shell) is now unreachable: clicks AND keyboard (`inert`) are blocked while a cinematic is up, the overlays themselves stay live (your fast-forward clicks still work), and a 300ms invisible shield swallows the one stray click right after a cinematic closes — the "simmed an entire season by accident" path is dead. Verified by replaying your exact accident in the battery.
7. **The draft board takes the best of w57** — w58 was built from w56 without w57 (your unpushed round), which is why it looked worse. w59 merges w57's whole draft round into the w58 line: the **two-line labeled phone draft card** (name · Draft on top, the six labeled stats on the bottom row, FILLS right under the button), the priority ink, the contrast pass, the marquee pinned to the top, the badge cascade 0.25s faster, the larger badge text, the deeper muted inks.
8. **The gold shimmer fixed (not reverted)** — w57's light-sweep override reset `background-clip` via the `background` shorthand, so the bronze gradient painted the whole name as a solid gold block. The override now re-declares `background-clip:text` inside itself: the burnished sweep survives and the names read, in both themes.
9. **Tested almost every page at seven widths** — 1920 / 1280 / 1024 / 768 / 600 / 390 / 320 across Simulator, Madden Rankings, Player Browser, Position Rankings, Team Comparison, Guide and the storage showcase: zero sideways overflow, zero console errors. Batteries: 80/80 (nodecheck 15 · mobile 32 · desktop 12 · cinematic-lock 10 · sweep 11).

## In the package
- `notes/W59-INTAKE-LEDGER.md` — your words item by item, with the interpretations flagged.
- `notes/W59-BUILD-REPORT.md` — the generator, the batteries, the evidence.
- `shots/` — 14 screenshots of the final bytes at the key widths/themes.
- `tools/` — the generator (`zpb_w59.py`), the payloads, the w57 merge block, the five batteries, and the pristine w58 baseline.
- `inbox/20261103-0000-zai-w59-receipt-and-e3-ack.md` — receipt of the Architect's E3 week-stepping note (arrived after the build session cut) + what it unblocks for storage.
- `_agents/zai/` — the lane docs (START-OF-CHAT REV 18, END-OF-CHAT, ZAI.md), rewritten for w59.

## Standing laws touched (for the record)
- The w56 **three-line** phone draft card law is **revoked** — w57's two-line labeled card is the law (your ruling, item 7).
- The w57 shimmer override is kept but corrected with the re-declared `background-clip:text`.
- The cinematic lock covers every fixed overlay the site mounts, wherever it mounts — not only the game replay.
