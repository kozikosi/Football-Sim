# DATA-LICENSE.md — what data this project ships, and where each layer's rights come from

Written for the 76 Pancakes / Football Sim project (Svelte 5 + Vite build, `colors/`). One fact per layer:
what is shipped, what licenses it, what residual rights are **not** covered, and the exact attribution text to
use when the nflverse layer activates. Every factual claim carries its verification label
(VERIFIED = fetched and read this session/date shown; REPORTED = secondary source; UNKNOWN = not established).

Not legal advice — this file records what the project ships and what its sources say.

## Layer A — Code

MIT. The repository's code license (`LICENSE`) covers engine, UI, tools and tests: all of it.

## Layer B — Data shipped today

All of the data below is **Owner-supplied** (verbatim in `data/nfl/README.md`), so it may be shown under the
Owner's own authority; each row of provenance is recorded in that README and its source file is untouched:

| File | Content | Provenance | Labels |
|---|---|---|---|
| `data/nfl/madden27-raw-paste.txt` | The Owner's paste of Madden 27 (Week 6) ratings, 1,941 players | Owner-supplied, 28 Oct 2026; the source of record | VERIFIED (README) |
| `data/nfl/madden27-ratings.csv` | `name,pos,team,ovr,spd,str` parsed from the paste by a lossless script | Owner-supplied (derivative of the Owner's paste); "Official Madden 27" as an upstream-provenance claim is UNKNOWN / not independently established | Owner-supplied; upstream provenance UNKNOWN |
| `data/nfl/free-agents-old-ratings.csv` | 12 former players kept on the market ("actively trying to join a roster"), values from the old table | Owner-supplied, 28 Oct 2026 | VERIFIED (README) |
| `data/nfl/player-ids.csv` | `nfl-p00001…` stable IDs, minted once | Generated from names+pos+team (no third-party content) | VERIFIED (README) |

Two boundaries to keep, both Owner rulings already on record:

1. **No logos, no wordmark art.** The `nfl-team-logos` folder and `all-logos-sdv.csv` are kept off GitHub
   (`tools/publish-assets.sh`, `_agents/V23-OWNER-REQUESTS.md`). Team names and wordmarks are trademark
   territory and this project ships none of that art in the public repo.
2. **Ratings generation is the Owner's alone.** No council seat generates, tunes or "corrects" the rating
   values (Owner letter, 5 Nov 2026). What this repo is free to do is derive everything downstream of them.

## Layer C — Reserved: stats derived from nflverse releases (CC BY 4.0)

If any later version of the ratings or a stats screen is grounded on nflverse scraped data
(`nflverse/nflverse-data` GitHub releases), the redisplayed/derived data carries this obligation:
**attribution only — there is no share-alike clause**, so derived tables may stay in an MIT repo.
Verified by fetching the full license text
(<https://raw.githubusercontent.com/nflverse/nflverse-data/main/LICENSE.md>, re-fetched 6 Nov 2026, VERIFIED):

- §1(c)/(f): "Copyright and Similar Rights" include **Sui Generis Database Rights**; "Licensed Material" is
  "the artistic or literary work, database, or other material to which the Licensor applied this Public License".
- §2(a)(1): "a worldwide, royalty-free, non-sublicensable, non-exclusive, irrevocable license to … reproduce
  and Share the Licensed Material, in whole or in part; and produce, reproduce, and Share Adapted Material."
- §3(a)(1): the only condition is attribution — credit the creator(s), keep the URI/hyperlink to the
  Licensed Material where reasonably practicable, state what You modified, and state the material carries
  CC BY 4.0 (with the license text or its URI).
- §4(a): "Section 2(a)(1) grants You the right to extract, reuse, reproduce, and Share all or a substantial
  portion of the contents of the database" — this is what lets an aggregation → published-formula pipeline
  redistribute its outputs.
- §2(b)(1)-(2): publicity, privacy and similar personality rights, and patent and trademark rights, are
  NOT licensed — CC BY 4.0 answers the data-copyright layer only, never the layer-D rights below.

**Attribution block (paste into any screen or file that displays nflverse-derived data):**

```text
Data derived from nflverse (https://github.com/nflverse/nflverse-data), released under the
Creative Commons Attribution 4.0 International license (CC BY 4.0). Modified: [what changed].
```

Precedent for this code/data split: nflfastR — code MIT, data CC BY via the nflverse-data releases
(nflverse/nflfastR repo, VERIFIED 5 Nov 2026).

## Layer D — Real player and team names (right of publicity, not copyright)

The shipped player names come from the Madden ratings file (Layer B), i.e. the Owner's own inclusion.
The controlling precedent for name+stats use in a fantasy/sim product, **now verified against the opinion
itself** (fetched 6 Nov 2026 from OpenJurist, public domain, VERIFIED):

**C.B.C. Distribution & Marketing, Inc. v. Major League Baseball Advanced Media, L.P.**, 505 F.3d 818
(8th Cir. 2007), docket 06-3357/06-3358, filed 16 Oct 2007. The Eighth Circuit affirmed summary judgment
for CBC on two independent grounds:

1. **First Amendment:** "we conclude that [Missouri-law rights of publicity] … must give way" to CBC's
   First Amendment rights — the information was "all readily available in the public domain", the fantasy
   game is speech like video games (*Interactive Digital*, 329 F.3d 954 (8th Cir. 2003)), and performance
   records are "a form of expression due substantial constitutional protection" (quoting *Gionfriddo v.
   Major League Baseball*, 94 Cal.App.4th 400 (2001)). The players' publicity claim's elements were in
   fact met (¶16-17); the claim lost on the constitutional balance (¶20-23).
2. **Contract:** the 2002 license's warranty that the MLBPA was "the sole and exclusive holder of all
   right, title and interest in and to" the names and statistics was false, so the MLA breached it and
   could not enforce the no-use/no-challenge provisions (¶29) — CBC left its expired license free to use
   names and stats unlicensed.

**Care with the precedent** — three limits, because the citation is easy to overstate:

- It is NOT a copyright holding. The opinion expressly **declined to reach** CBC's copyright-preemption
  argument (¶24) and the district court had *rejected* it (¶10). Citing this case as "stats are not
  copyrightable" misreads it.
- It binds nationally only as persuasive authority outside the Eighth Circuit; the publicity-right
  analysis here is Missouri's (symbol-of-identity + commercial-advantage elements).
- It is a First-Amendment shield vs. state publicity claims; it is not a license, and the residual
  publicity layer (group-licensing via NFL Players Inc.) is unchanged — see the 5 Nov licensing answer.

Limits noted, the practical read holds: free, non-commercial sims that show real names + performance
data sit on this precedent of the industry the Owner is targeting; the name layer is not the blocking
risk, and the mitigation stays the same as rule above — keep ratings and names in the swappable data
directory so a fictional-league file could replace them without touching code.

## Summary table

| Layer | In the public repo? | License / authority | Residual risk |
|---|---|---|---|
| Code | yes | MIT (repo `LICENSE`) | none |
| Madden 27 ratings + names (Owner pasted) | yes | Owner-supplied (his paste; his call) | upstream "Official Madden 27" provenance claim UNKNOWN; EA rights untouched by this project |
| Player IDs | yes | generated | none |
| nflverse-derived stats | reserved (none shipped yet) | CC BY 4.0 → attribution block above when activated | attribution-only; nothing else owed |
| Logos / wordmark art | **no** (held off GitHub) | not licensed by anyone here | do not commit |
| Player/TEAM names as facts | yes | CBC v. MLBAM precedent (public-domain info + speech) | publicity greyness, mitigated by Layer B swap-file boundary |

History: licensing analysis 5 Nov 2026 (`inbox/20261105-1031-glm-answer-ASK-data-licensing.md`,
REPORTED-status items); opinion verification and this file 6 Nov 2026 (GLM, P-261).
