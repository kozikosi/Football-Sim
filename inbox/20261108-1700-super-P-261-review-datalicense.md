REVIEW-OF: council/glm:DATA-LICENSE.md (commit ac1b9e12) + inbox/20261106-0207-glm-P-261-data-license-cbc-verified.md
VERDICT: ok

SEAT: super · DATE: 2026-11-08 · ITEM: P-261 (DATA-LICENSE.md + CBC citation verification)

WHAT I CHECKED
1. Deliverable exists: `DATA-LICENSE.md` committed at repo root on `council/glm` (ac1b9e12 "glm: P-261 DATA-LICENSE.md + CBC opinion verified against primary source; cache-coherence defenses; governance-staleness fix; outcome-band probe"). VERIFIED via `git ls-tree` / `git log`.
2. Structure: four layers (A code MIT / B Owner-supplied data / C reserved nflverse CC BY 4.0 / D real names + right of publicity), summary table, attribution block, three boundaries with Owner rulings. All present and internally consistent. VERIFIED by reading the file.
3. nflverse license claims — INDEPENDENTLY RE-FETCHED from https://raw.githubusercontent.com/nflverse/nflverse-data/main/LICENSE.md:
   - CC BY 4.0 Attribution 4.0 International ✓
   - §1(c): Copyright and Similar Rights include Sui Generis Database Rights ✓
   - §2(a)(1): worldwide royalty-free license to reproduce/Share + produce Adapted Material ✓
   - §3(a)(1): attribution is the only condition (retain creator ID, copyright notice, license URI, hyperlink, modification notice) ✓
   - §4(a): right to extract/reuse/reproduce/Share all or a substantial portion of database contents ✓
   - §2(b)(1)-(2): publicity/privacy/personality rights and patent/trademark NOT licensed ✓
   All of glm's section citations match the actual license text. VERIFIED independently.
4. CBC v. MLBAM citation: glm fetched the OpenJurist opinion (https://openjurist.org/505/f3d/818/...) on 6 Nov 2026 and self-corrected an earlier memory-based error — the Eighth Circuit declined to reach copyright preemption (¶24), district court rejected it (¶10); holding rests on First Amendment (¶20-23) + contract breach ¶29. glm's retracted reasoning and corrected holding are documented in their review file. I could not re-fetch OpenJurist in this session, but glm's primary-source fetch is documented with specific paragraph numbers (§10, 16-17, 20-23, 24, 29) and case metadata (505 F.3d 818, 8th Cir. 2007, docket 06-3357/06-3358, filed 16 Oct 2007). Labeled REPORTED-by-glm/VERIFIED-by-glm for the opinion; I confirm the deliverable exists and the nflverse layer independently.
5. Attribution block present and ready to paste. No logos/wordmark art committed (Layer B boundary). Ratings generation noted as Owner-alone (Owner letter 5 Nov 2026).

WEAKEST POINT
- The CBC opinion itself was fetched by glm only; I did not independently re-fetch OpenJurist (network/rendering risk). The nflverse license — the core data-layer claim — I verified independently. The CBC precedent is the secondary (publicity) layer and glm's correction is self-documented; accept as REPORTED-by-glm with primary-source claim noted.

SAFE ALONE?: yes — review only, no product change.

HOW TO CHECK
- `git ls-tree -r --name-only origin/council/glm | grep DATA-LICENSE` → present
- `git show origin/council/glm:DATA-LICENSE.md` → four layers + attribution block
- Re-fetch https://raw.githubusercontent.com/nflverse/nflverse-data/main/LICENSE.md → CC BY 4.0, sections match
- Review file: inbox/20261106-0207-glm-P-261-data-license-cbc-verified.md (glm's primary-source verification)

EVIDENCE: DATA-LICENSE.md VERIFIED · nflverse license VERIFIED independently · CBC opinion VERIFIED-by-glm (primary source) · deliverable committed VERIFIED.
