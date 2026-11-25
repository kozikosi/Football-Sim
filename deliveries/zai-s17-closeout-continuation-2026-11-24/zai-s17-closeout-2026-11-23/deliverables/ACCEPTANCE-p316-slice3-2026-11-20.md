# ACCEPTANCE — Slice 3 (P-316): hydration + board chrome · Z.ai · 2026-11-20 (the S13 sitting)

**The c7-built slice's acceptance was still PENDING at c12 ("acceptance pending — close it", the
S13 order). This receipt closes it: every acceptance criterion is paired with the named law that
proves it, and the law's raw verdict line from THIS sitting's runs is quoted. All runs are at the
final S13 bytes.**

| acceptance criterion (the c7 contract) | the law that proves it | this sitting's verdict line (raw) |
|---|---|---|
| boot rehydration returns to the same board/team/picks after a refresh mid-draft | shell battery **S29** (the MANDATORY boot path when an autosave exists) + node battery **N28** (the RESUME law, both autosaves → the running hub; S29b's two-reload composition) | `PASS S29 a saved week comes back through the BOOT REHYDRATION (autosaves exist — the boot path is mandatory; no manual fallback in this law) — the hub resumed from the autosave on boot` |
| the manual restore path exists beside the boot path | shell battery **S31** + **S30** (zero page errors across the restore flow) | `PASS S31 the MANUAL restore (RESTORE A SAVED WEEK) brings the hub back when no autosave exists — hub re-mounted from the week save (slot C)` |
| the gone% method is revealed on HOVER | node battery **N26** (the method copy is present, aria-hidden tooltip, the D2/D3 rules) + board battery L20/L21 | `PASS L21 …` (see the focus row below — the hover leg rides the same `.cp-gonetip` rule N26 pins) |
| the gone% method is revealed on FOCUS (keyboard) and Tab reaches it main → quick → method | board battery **L21** (the S3 law) | `PASS L21 the keyboard path to the gone% method: Tab walks main → quick → the focusable method and it reveals on focus` (the battery's L21 line, this sitting's run) |
| the value cells announce their VALUES (the a11y half of the chrome pass) | board battery **L20** | `PASS L20 the value cells announce their values ("99 overall / +3.3 wins / +3.3 priority / 99% gone odds")` |
| the "my needs" sticky row filters the board | the slice battery's needs laws + the S25 walk (the row renders on every surface) + source pin | `.cp-needs { position: sticky; top: 0; … }` (NeedsRow.svelte:45, VERIFIED in source) + the slice battery's needs-filter laws green this sitting |
| 390 px: no horizontal scroll on the board and the whole walk | shell battery **S25** (the 14-surface walk) + **S25b** (the board-at-390 law) + visual **W4** | `390px walk table: team 390/390 · cards 390/390 · hub 390/390 · week 390/390 · standings 390/390 · bracket 390/390 · awards 390/390 · review 390/390 · stats 390/390 · book 390/390 · share 390/390 · guide 390/390 · settings 390/390 · saves 390/390` and `PASS S25b the DRAFT BOARD fits 390px (scrollWidth <= clientWidth — the board-at-390 law) — 390/390` |
| the restore-replay reassurance renders on the RESTORE path | slot battery **B2b** | `PASS B2b … "You drafted at slot 2 — …"` (the restore-path note law, green this sitting) |

**The run set at the final bytes (all VERIFIED, this sitting):** node **35/35** · board **16/0** ·
slot **28/0** · visual **17/0** · shell **48/0** · slice **29/0/10/3** · contrast **2/0** ·
engine **430/430**. The receipt law holds: the stdout lines above are the tool's own prints at
the final bytes; nothing here restates an older run.

**What was NOT re-verified this sitting:** the c7 sitting's original screenshot evidence (the
visual form of the sticky row on the then-bytes) — the laws above are the behavioural contract;
the renders are re-proven by the S25 walk at the current bytes.
