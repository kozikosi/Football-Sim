# UPDATE README — wave 56 · the labeled card, the centered panel, the vertical tree

**File:** `Football-Sim-Z-post-blue-w56.html` · md5 `42af55f794180910f1f9086fe0c68a3d` · 1,600,958 bytes
**Baseline:** my w55 (md5 `49161f11…`). One generator, six fixes + one found-and-fixed ink bug, every battery green.

## What you asked for → what shipped

1. **The DIME bracket is gone.** The draft page's depth chart painted the team wash around the empty DIME row (the bracket you saw) while every other empty slot sat clean — the row's paint now waits for a dime player exactly like every sibling. Position under NICKEL untouched; a filled Dime wears the same row paint as the rest.
2. **The draft card's stats are labeled, and OVR never stacks the Priority.** The labels are back on the phone card (POS · TEAM · WINS · GONE · PRIORITY · FILLS) and the card reads in three lines: **name · OVR 99 · [Draft]** / **pos · team · wins · gone** / **priority · fills**. The OVR chip and the Priority value share no column and no row anymore. While probing I found the OVR number itself had been washing out on silver-ink teams (the number vanished into its own chip) — the values now wear the same ink as the player's name, in both themes.
3. **The 20-0 stage on the draft review is compressed and leads the page.** The near-half-screen stage (354px on a phone) is now a 139px banner; HOW YOUR DRAFT RANKS sits 8px under it instead of a full screen down. The home page's hero stage keeps its cinematic height.
4. **The Super Bowl panel's top team name centers.** The desktop "names hold their sides" rule was out-ranking the phone centering (a specificity fight — both carried !important); the phone now wins, and WASHINGTON COMMANDERS on top wraps centered under its crest instead of hanging right.
5. **The playoff bracket is a vertical tree on phones.** Same panels, same text, new shape: Wild Card (AFC, then NFC) → Divisional → Championships → Super Bowl, reading top-down; paired rounds sit two cards side by side, the championships and the Super Bowl center under their headers, the Super Bowl keeps its gold border. The desktop tree is untouched.
6. **The draft pick grades are cards + badges.** The squeezed 29-row table is gone: one card per starting spot — the slot chip, the big letter-grade badge, the player's name (90+ shimmer, 85+ burn), and the OVR / round / rank badges under it. Two cards a row on a phone, seven on a desktop screen. Same data, nothing added or dropped.
7. **Extra mobile testing.** A new sweep walked every page at 390px and 320px (home, rankings, compare, guide, draft, review, Super Bowl) hunting side-pan and wide children — zero everywhere; a 430px large-phone leg joined the battery; the desktop box score is pixel-identical to w55.

## Folder map
- `Football-Sim-Z-post-blue-w56.html` — the product
- `CHECKSUMS.txt` — md5s
- `notes/W56-INTAKE-LEDGER.md` — your words verbatim, item by item, + the interpretations flagged for veto
- `notes/W56-BUILD-REPORT.md` — the full fix table, the proofs, the standing-law sweep
- `tools/` — the generator (`zpb_w56.py`) + the batteries (`w56_nodecheck`, `w56_mobile`, `w56_live`, `w56_d4cmp`, `w56_sweep`, the pre-fix `w56_probe`)
- `shots/` — the evidence screenshots (before: `p1..p6`; after: `evidence-*`)
- `_agents/zai/` — the refreshed lane: START-OF-CHAT (REV 16, §3 rewritten), ZAI.md (rewritten), END-OF-CHAT
