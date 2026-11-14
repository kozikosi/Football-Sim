# w89-quirks — token extraction with byte offsets (Z.ai, 2026-11-14)

Source: `Football-Sim-Z-post-blue-w89.html` (origin/gh-pages tip 3e69567c) · 1,922,769 bytes · offsets are BYTE offsets into the file (Buffer.indexOf, first 6 occurrences each).

| Token | Found | Byte offsets (first occurrences) | Note |
|---|---|---|---|
| fonts.googleapis | YES | 40528, 40640 | w89 fetches Google fonts at runtime (tent-test risk, confirmed by Phase C) |
| cinzel | YES | 28931, 29016, 55982, 56134, 72409, 74510, 40732 | display faces |
| bodoni | YES | 25967, 29045, 51317, 53297, 56163, 60980 | serif body face |
| espresso | YES | 1690634 | espresso ground |
| champagne | no | — | champagne-gold body |
| no-white | YES | 7146, 10122, 11855, 13654, 19130, 23597, 8376, 41327, 42410, 753624, 753692, 753749, 5223, 13049, 14657, 29127, 30168, 31635 | white usages (the law says NO white body)  |
| jingle | YES | 1889122 | header jingle |
| bubble-classes | no | — | position bubbles |
| shimmer | YES | 15988, 16234, 16318, 16476, 26571, 29864, 788, 5477, 40977, 52625, 56033, 57659 | 90+ shimmer animation |
| ovr-85-gold | YES | 2440, 2891, 3043, 3068, 3103, 3141, 150, 1635, 3896, 5461, 5773, 6177 | OVR thresholds (85 vibrant / 90 shimmer) |
| round-labels | YES | 775286, 775327, 775376, 775421, 786114, 786201 | R<round>.<pick> labels |
| ub-blue | YES | 15946, 1668386, 1668533, 1668734 | user-team blue |
| team-colour-table | YES | 373041, 747234 | undefined |

Colour-table probe: key `TEAM_COLORS` at byte 373041; head:

```
FFFF"], "Cincinnati Bengals": ["#FB4F14", "#000000", "#FFFFFF"], "Cleveland Browns": ["#311D00", "#FF3C00", "#FFFFFF"], "Dallas Cowboys": ["#003594", "#869397", "#FFFFFF"], "Denver Broncos": ["#FB4F14", "#002244", "#FFFFFF"], "Detroit Lions": ["#0076B6", "#B0B7BC", "#000000"], "Green Bay Packers": ["#203731", "#FFB612", "#FFFFFF"], "Houston Texans": ["#03202F", "#A71930", "#FFFFFF"], "Indianapolis Colts": ["#002C5F", "#FFFFFF", "#A2AAAD"], "Jacksonville Jaguars": ["#101820", "#006778", "#D7A22A"], "Kansas City Chiefs": ["#E31837", "#FFB81C", "#FFFFFF"], "Las Vegas Raiders": ["#000000", "#A5ACA
```

Extracted team palette entries: 24 (sample: {"Cleveland Browns":"#311D00","Dallas Cowboys":"#003594","Denver Broncos":"#FB4F14","Detroit Lions":"#0076B6","Green Bay Packers":"#203731","Houston Texans":"#03202F","Indianapolis Colts":"#002C5F","Jacksonville Jaguars":"#101820"})
