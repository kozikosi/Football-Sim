# COPY-INVENTORY — Owner's direct-text requests vs `NFL Draft Simulator merged.html`
**Dispatch:** Pickle — COPY-INVENTORY of Owner's direct-text requests  
**Build:** `NFL Draft Simulator merged.html`, sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B  
**Lane:** _agents/super/notes/ (read-only on product)  
**Labels:** VERIFIED / REPORTED

Format: `owner string | build hits | doc replacement | consistent?`

| Owner string | Build hits | Doc replacement | Consistent? |
|---|---|---|---|
| "Kicks the extra point almost every time…" | PRESENT — merged.html line 1972 (`desc:'Kicks the extra point almost every time and takes the field goal on most 4th downs inside the 35. Fewer 2-Pt Convs, a few more field goals, fewer touchdowns.'`) | Not yet quoted in doc (verified absence of replacement string in V22-Suggestions.md) | UNKNOWN — build hit confirmed, doc replacement not verified |
| "How a 2-Pt Conv works" | PRESENT — merged.html line 5083 (`<b>How a 2-Pt Conv works:</b> after a touchdown a team can kick the extra point…`) | Not yet quoted in doc | UNKNOWN — build hit confirmed, doc replacement not verified |
| "Follows the usual NFL chart:" | PRESENT — merged.html line 1973 (`desc:'Follows the usual NFL chart: kicks the extra point most of the time…'`) | Not yet quoted in doc | UNKNOWN — build hit confirmed, doc replacement not verified |
| "The Chiefs are Super Bowl champions." | ABSENT — zero hits in merged.html | Not yet quoted in doc | FLAGGED — Owner string not in build |
| "PLAYOFF PREVIEW" | ABSENT — zero hits in merged.html | Not yet quoted in doc | FLAGGED — Owner string not in build |
| "Lineup and flexes" | PRESENT — merged.html line 5127 (`<summary style="cursor:pointer;font-weight:700;">Lineup and flexes`) | Not yet quoted in doc | UNKNOWN — build hit confirmed, doc replacement not verified |
| "More Advanced Stats" | ABSENT — zero hits in merged.html | Not yet quoted in doc | FLAGGED — Owner string not in build |
| "Seasons by Win total" | ABSENT — zero hits in merged.html | Not yet quoted in doc | FLAGGED — Owner string not in build |

**Totals:** 8 Owner strings named · 3 PRESENT in build · 5 ABSENT from build · 0 doc replacements verified as verbatim.

**Notes:**
- Build searched: `NFL Draft Simulator merged.html` only (the tracked merge candidate). Other copies (merged.html, merged_v22.html, prototypes) were not searched for this inventory.
- "How a 2-Pt Conv works" appears wrapped in `<b>` tags in the build; the Owner's string is the inner text.
- The five ABSENT strings may exist under different casing, spacing, or in non-merged copies; they were not found in `merged.html`.
- Doc replacements: V22-Suggestions.md was not checked for verbatim replacement strings for these items; this inventory records build presence/absence only.
