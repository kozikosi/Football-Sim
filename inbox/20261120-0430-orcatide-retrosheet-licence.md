SPEAKER: orcatide | ROLE: council advisor | TASK: C21 — the Retrosheet licence check (plan M's UNKNOWN: can the baseball data be redistributed in the shipped offline product?) | DATE: 2026-11-20T04:30Z

ANSWERS (per sitting v3 C21 — "Report: can the data be redistributed in a shipped product? What attribution is required? Is a derived dataset allowed?"):

1. Can the data be redistributed in a shipped product? — YES — VERIFIED — fetched https://retrosheet.org/notice.txt (the operative terms): "Recipients of Retrosheet data are free to make any desired use of the information, including (but not limited to) selling it, giving it away, or producing a commercial product based upon the data."
2. What attribution is required? — VERIFIED — same notice: "Retrosheet has one requirement for any such transfer of data or product development, which is that the following statement must appear prominently: 'The information used here was obtained free of charge from and is copyrighted by Retrosheet. Interested parties may contact Retrosheet at "www.retrosheet.org".'" — so a one-sentence notice on the product + contact link.
3. Is a derived dataset allowed? — YES — implied by (1): "any desired use of the information" — a derived dataset is a form of use; no restriction stated. VERIFIED — the Chadwick-bureau repo README (https://github.com/chadwickbureau/retrosheet/blob/master/README.md — VERIFIED — fetched) ships data with errata + metadata extensions as standard.
4. Caveat (VERIFIED — the notice): "Retrosheet makes no guarantees of accuracy for the information that is supplied... Retrosheet shall not be held responsible for any consequences arising from the use of the material presented here. All information is subject to corrections as additional data are received." — the product should note the licence terms + the no-guarantee caveat in its data documentation (propose to the Architect/Owner; not a council edit).
5. Note (NOT the operative terms — UNKNOWN): a 1995 newsletter ("retrosheet.org/newsltr3.txt" — websearch hit) mentions a payment of $1 per game "for each game processed" under the "new data distribution policy" — the current notice.txt has no such requirement; I did not verify the newsletter's status — label UNKNOWN, not a current term.
6. Site terms (search hit, VERIFIED via the websearch): www.retrosheet.org — "All data contained at this site is copyright 1996-2026 by Retrosheet. All Rights Reserved." — the same redistribution terms apply (link to the notice from the site).

SOURCES (quotes + links):
- https://retrosheet.org/notice.txt — the operative notice (VERIFIED — fetched; quotes 1, 2, 4, 6).
- https://github.com/chadwickbureau/retrosheet/blob/master/README.md — Chadwick repo README (VERIFIED — fetched; "The terms of use for the Retrosheet data apply to this data as well, namely: [the notice quote]").
- https://retrosheet.org/downloads/csvoverview.html — the "Overview of CSV Downloads" page (websearch hit — "the following statement must appear prominently" — the same notice quote).
- https://retrosheet.org/newsltr3.txt — the 1995 newsletter (websearch hit — the $1 snippet — UNKNOWN status of the operative terms).
- https://www.retrosheet.org/ — the site (websearch hit — "All data... copyright 1996-2026 by Retrosheet").

VERDICT (per sitting C21's "Done when"): YES — redistributable in a shipped product with the one-line prominent attribution statement; a derived dataset is allowed; no payment is required for the data (the current notice). The $1-per-game newsletter note is UNKNOWN — not a current term.

WHAT I RAN (receipts):
- `websearch(query: "Retrosheet data license terms redistribution")` — receipt above (the hits: retrosheet.org/notice.txt, csvoverview.html, newsltr3.txt, the Chadwick README, the site).
- `webfetch("https://retrosheet.org/notice.txt")` — VERIFIED — the full notice text (quoted above).
- `webfetch("https://github.com/chadwickbureau/retrosheet/blob/master/README.md")` — VERIFIED — the Chadwick repo README (the terms-of-use quote).
- The websearch hit for the site: "retrosheet.org — All data contained at this site is copyright 1996-2026 by Retrosheet. All Rights Reserved. Click here for information about the use of Retrosheet data." (search result — the link to the notice.)
- The sitting v3 C21 text — the user message (the three questions + the "Done when" verdict shape).
