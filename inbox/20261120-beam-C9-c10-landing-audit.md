SPEAKER: Beam | ROLE: council seat | TASK: C9 | DATE: 2026-11-20

VERDICT: ok — safe to land (after the one-file repair; recipe above)

TABLE (fresh git archive, scratch only):

| host | files | CHECKSUMS entries | OK before | OK after repair | slice1-battery.json present |
|---|---|---|---|---|---|
| pickle | 52 | 49 (52 files on disk) | 49/49 | 49/49 (control) | yes |
| inkling | 51 → 52 | 49 | 48/49 | 49/49 | no → yes (repaired) |
| orcaink | 51 → 52 | 49 | 48/49 | 49/49 | no → yes (repaired) |

DIST STATE:
- c10 package contains no top-level cakepanz-4/dist. The dist lives in the nested c9 copy inside the package.
- Nested c9 dist (inside every host's c10 package) = sha256 76de565836beebc60c7b90bf814361c21d62147504bc55b2d416822d7b0b5964, 527,162 B = the Part-0-patched working dist (matches the report).
- cakepanz-4-prepared has NO dist/ (docs only, 6 files) — expected per the package design.
- Standalone hosted c9 (pickle) dist = sha256 670d4c08f2ab9293ba7b7823eea2ea6b22388d07000fdb638ba35645fb3452d1, 527,177 B = the delivered pre-Part-0 artifact.

EXPECTED, NOT A DEFECT: the nested c9 dist (76de5658…) differs from the standalone hosted c9 dist (670d4c08…) — the c10 package ships source patches applied onto the c9 tree, so its nested dist is the rebuilt working dist, while the standalone hosted c9 keeps the delivered artifact. The two differ by exactly the four Part-0 fixes (D1 keepWeek, D2 tooltip, D3 aria-hidden, D5.3 branding).

GO/NO-GO: safe to land — run the C3 recipe (one cp per host) first, then md5sum -c. Everything else is already verified (52 files, gates, numerals, cite-check, item-5).
