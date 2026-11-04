# UPDATE README — wave 55 · the phone pass

**File:** `Football-Sim-Z-post-blue-w55.html` · md5 `49161f118e587701f1d639346e22d4d2` · 1,592,738 bytes
**Baseline:** your w54 (md5 `512d1885…`). Nothing else changed — one generator, ten fixes, every battery green.

## What you asked for → what shipped

1. **Draft cards on mobile — two lines.** The card that read "TOP / Josh Allen / QB / crest / 99 / +3.7 / +1.0 / 99% / Draft" collapses to: line 1 **TOP Josh Allen — 99 — [Draft]**, line 2 the quiet stat line (pos · crest · wins · priority · gone · fills). 117px → 71px per card. The Cards view rows lose the bar and read name / one line.
2. **The Dime is changeable.** On the preseason page and the LINEUP AND FLEXES panel, DIME now carries the exact same picker as every slot — staging, APPLY THE CHANGES, UNDO all apply to it.
3. **Small localStorage.** Your tab is remembered (`zpb:tab`, the same family as the theme). Refresh and you land back where you were (the five tool tabs; the SIMULATOR tab is the home default). Season state itself stays in memory — say the word if you want a full season save and it becomes its own wave.
4. **The box score is one table again.** The generic phone law was splitting it into two labelled panels with the quarters running down the side; on a phone it now renders exactly the desktop shape — quarters across, two team rows, compact.
5. **No side scroll on the preview or review page.** The real cause was found and killed (the page was sizing itself to the widest star-card pair, ~530px → a 221px pan at 390px). Both pages measure 0px of document pan at 390px and 320px.
6. **The season in badges — the honors land first.** The HONORS EARNED cards sit at the top of the rail and now take the first beats, so the blank stage is gone; the one-second pace and the whole cascade are untouched.
7. **Key players — the rating never bunches the badge.** One card per line on phones; names never break mid-word.
8. **The Super Bowl champion name centers.** The crest stacks above the centered wordmark on phones (both the winner storm and the banner).
9. **"(whole corps)" is gone** from the receiving line of both unit report cards (the all-receivers numbers stay).
10. **Tested wider:** a 320px battery leg (a narrower phone than any earlier wave), zero page errors everywhere, and the desktop is untouched — the box score is pixel-identical to your w54.

## Folder map
- `Football-Sim-Z-post-blue-w55.html` — the product
- `CHECKSUMS.txt` — md5s
- `notes/W55-INTAKE-LEDGER.md` — your words verbatim, item by item, + the interpretations flagged for veto
- `notes/W55-BUILD-REPORT.md` — the full fix table, the proofs, the standing-law sweep
- `tools/` — the generator (`zpb_w55.py`) + the batteries (`w55_nodecheck`, `w55_mobile`, `w55_live`, the evidence probes)
- `shots/` — the evidence screenshots
- `_agents/zai/` — the refreshed lane: START-OF-CHAT (REV 15, §3 rewritten), ZAI.md (rewritten), END-OF-CHAT
