# What changed in Part 0 — the plain-language note for the Owner

Date: 2026-11-19 · Seat: Z.ai · English only · no hashes in the bullets; the hash footnote is at
the bottom. All four fixes are in the working dist now; you accepted them (Part 0 — ACCEPTED).

- **Draft picks survive a refresh (D1, keepWeek).** Before: if you refreshed the page while a draft
  was running, the app came back but dropped your week autosave, so a saved season could be lost
  from the hub. Now: a second reload keeps the hub AND the week autosave — you land where you left
  off, and the law that pins this (S29b) has a probe receipt: three boots in a row all keep the hub
  and the week key.

- **The "gone%" explanation is reachable on a phone (D2, the tooltip).** Before: the little tooltip
  that explains how the GONE% odds were computed was a fixed 200–240 px box that stuck out past a
  390 px phone screen, and it also popped open when you tabbed through with a keyboard and refused
  to close — the dead CSS made the in-page explanation unreachable. Now: the tooltip clamps to the
  screen (never wider than the phone minus a margin), the keyboard-focus leg is gone, and the same
  explanation moved into the flow of the row itself, so the method text is always reachable. Probe
  receipt: on a 390 px screen every chip's touch point resolves to the chip and the page does not
  scroll sideways.

- **Screen readers read the row once (D3, aria-hidden).** Before: the odds tooltip was invisible to
  the eye when closed but still announced to assistive tech, so a row could be read twice — once as
  the row, once as the hidden tooltip. Now: the hidden tooltip is marked aria-hidden, so the row's
  own name is the only thing announced. (One gap is recorded for later: nothing yet ties the row to
  its detail panel with aria-describedby — measured 0 in the shipped source.)

- **The header carries ONE product name (D5.3, branding).** Before: the header carried two names —
  the product brand and the builders' track label — two identities on one line. Now: the header
  says "76 Pancakes" and nothing else; the track span and its orphaned CSS rule are deleted. The
  source states it plainly: the user-facing brand is 76 Pancakes.

What did NOT change: the engine, the pin, the ratings, the battery counts (33/33, 48/0, 6/6,
29/0/10/3 — the two battery laws were re-anchored to the new tooltip behavior, same counts), and
the live site (nothing shipped; w89 is still the live wave until Colors / 76 Pancakes merges).

Footnote (the two builds, so no document contradicts itself): the patched working dist is
`76de565836beebc60c7b90bf814361c21d62147504bc55b2d416822d7b0b5964` (527,162 B) — your accepted
release candidate. The delivered artifact `670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1`
(527,177 B) is the pre-Part-0 build, kept as history. The two are NOT byte-identical: the working
dist carries exactly the four fixes above, measured this sitting (keepWeek 0→2, cp-gonehow 0→2,
the tooltip clamp + focus-leg removal, aria-hidden 0→1).
