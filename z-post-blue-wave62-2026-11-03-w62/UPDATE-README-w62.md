# UPDATE README — wave 62 · the merge wave (best of w58/w59/w60 + w61)

**File:** `Football-Sim-Z-post-blue-w62.html` · md5 `468e6883d4e18afb07eab6a08862b972` · 1,694,748 bytes
**Baseline:** the w60 bytes (`bc841fb9…`, your gh-pages push — the newest line on GitHub). The w61 fixes (built by a session that could only see w58) were extracted as an exact patch and applied whole. **The two lines are one line now.**

## The merge, with receipts

- **Proof A — nothing invented:** the same 4-replacement patch, run against the pristine w58 bytes, reproduces your shipped w61 **byte-for-byte** (md5 `5b0f1ef3…`). The patch IS the w61 delta — every w62 anchor asserts, and the dry-run proves the merge adds exactly w61's changes and nothing else.
- **Proof B — nothing dropped:** 12 cargo markers from the w59/w60 line assert aboard after the merge — the cinematic inert lock, the corrected shimmer clip, the `zpbNameFit` name ladder, the w60 CSS/JS payloads, the advance rail, the fluid unit table, the face-off intro rows, the RUN IT BACK footer pair, the no-ellipsis carrier group, w59's phone draft card, the storage showcase door.

## What rides in w62 (the union)

1. **From w61 — the formation floor.** WHERE YOUR PLAYERS LINE UP? retires whole at ≤740px (the w37 wrap seam — measured, the only width where a folded formation can never show). The roster-tab panel AND the draft-pick detail map both step aside; **no position moved** (the w29 clamp and the w37 wrap rules assert-untouched); YOUR FULL DEPTH CHART stays below, exactly as it was.
2. **From w61 — the one-ink depth cards.** The black and the 85+ red tint both retire: every name on YOUR FULL DEPTH CHART reads the team's 0.50 halfway ink (`--nm` light / `--nmd` dark), Von Miller keeps his bold as the 85+ law says, the 90+ keep the shimmer. Your KC SAM row reads exactly like every other row.
3. **From w61 — the tagline that leads.** Below 429px (the measured fold onset) "Can you go 20-0?" paints its own full-width line directly under the moving 20-0 marquee, above NEW DRAFT / 100 SEASONS. Above 429px the row is untouched.
4. **From w60 — the name ladder** (`zpbNameFit`: full → vertical → LAST NAME → INITIALS, JR. never a last name), **no '…' anywhere**, **words never split**, **the fluid unit comparison** (display:table, fixed layout, 25/50/25 — full width at every size), **the face-off pregame rows**, **BEGIN PLAYOFFS shimmers / SIM PLAYOFFS is a ghost**, **the exit law** (Skip → Continue only), **RUN IT BACK · SAME ROSTER / NEW DRAFT**, **the advance rail**.
5. **From w59 — the cinematic lock** (clicks AND keyboard blocked behind every cinematic, the 300ms stray-click shield), **the phone cards** (rankings/browser/draft), **DIME**, **the corrected gold shimmer**.
6. **From w58 — the storage module** and everything beneath, untouched.

## The standing audit — 84/84 on the shipped bytes

- `w62_nodecheck` **16/16** (every inline script parses)
- `w62_mobile` **41/41** — 280/320/360/390/430/700/740: the map steps aside, the 32 depth cards stay, no sideways scroll, the tagline leads ≤429 / shares ≥430, the inks asserted light AND dark against the rows' own vars, the detail map obeys the same floor, the storage walkthrough holds 390/320/280, **zero page errors**
- `w62_live` **7/7** — 1280: the review row byte-for-byte its old shape, the map on with the **five OL on one line**, zero name collisions
- `w62_storage` **7/7** — the module surface, the 25-check fault rig green inside the real page, the bench (0.4+0.4 ms at checkpoint cost), the showcase smoke
- `w62_sweep` **13/13** — Simulator / Madden / Browser / Position Rankings / Team Comparison / Guide × 1920/1280/1024/768/600/390/320 + the storage showcase: zero pan, zero '…', the rail silent on the footer pages

## Storage — the guidance followed

No wiring this wave, exactly as the standing guidance requires: the Phase 0 plan §6 gates the wiring commit on the Architect's E2 envelope types (and the E3 ack adds E3b's RunState↔WeekPayload mapping + E1's stable pids). What could honestly be done was: the whole module re-proven on the merged bytes (the 25-check fault rig, the bench, the `?storage=1` walkthrough at 1280 + 390/320/280).

## In the package

- `Football-Sim-Z-post-blue-w62.html` — the product (also loose in the download area)
- `CHECKSUMS.txt` — the md5s
- `notes/W62-INTAKE-LEDGER.md` — your words verbatim, item by item, the interpretations flagged
- `notes/W62-BUILD-REPORT.md` — the merge proofs, the fix table, the batteries
- `tools/` — the generator (`zpb_w62.py`, with Proof A/B built in) and the five batteries
- `shots/` — the evidence (320 the tagline leads · 440 the row unchanged · 1280 the one-ink cards · 1280 the map present · the storage showcase)
- `_agents/zai/` — the refreshed lane: START-OF-CHAT REV 19 (§3 rewritten), ZAI.md, END-OF-CHAT

## Thresholds, so you can veto with numbers

- **740px** — the formation floor (the w37 seam). One number in one rule if the map should linger lower.
- **429px** — the tagline floor (fold onset measured 420; 430 holds).
- The three w61 veto flags carry over unchanged (floor / ink scope / tagline row) — each is a one-line patch to `tools/zpb_w62.py` + a rebuild.
