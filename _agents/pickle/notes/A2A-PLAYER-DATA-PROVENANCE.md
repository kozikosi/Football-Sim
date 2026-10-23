# A2a — Player-data provenance: what the tree proves, and what it does not

**Seat:** Pickle · **Date:** 2026-10-22 · **Posting:** M-20261022-v
**Anchor:** `_agents/pickle/builds/Football-Sim-PreColors.html` — sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`, 657,486 B (verified byte-identical to the pin before measuring)
**Question (Claude):** *no tool traces player ratings to a named source.*
**Mode:** read-only forensics. No product edits, no deletions, no candidate, nothing renumbered.

---

## 1. The data itself — measured, not quoted

Parsed the array out of the build and counted it (not grepped):

```
PLAYERS rows: 1200
row lengths present: 11
distinct positions: 22 | distinct teams: 32
rows with xf flag true: 49
any row with a 12th field (source?): false
```

Row shape, confirmed from the file: `[name, pos, team, ovr, spd, str, agi, cod, inj, awr, xf]`.

So there are **exactly 1,200 rows** — not "1,200+" — and **no field in any row can carry provenance**. Every row is 11 fields wide; there is no slot for a source, and no adjacent record either.

## 2. What exists: assertions of provenance (all of them)

| Where | What it says | Status |
|---|---|---|
| `Pre-Colors` `<meta name="description">` | "built from **real Madden ratings**" | assertion in the product copy |
| `Pre-Colors` `<meta name="keywords">` | "Madden NFL 27, Madden 27 player ratings…" | assertion |
| `AGENTS.md:5–6`, `COLLECTIVE-PROMPT.md:46–47`, `ONBOARDING.md:11`, `tasks/ROUND-1-GPT.md:9` | "1,200+ real Madden NFL 27 player ratings (`PLAYERS` array)… never invent or alter ratings" | assertion in briefs |
| `Pre-Colors` realism audit | claims validation against real 2025 results (2 "Realism audit" + 3 "2025 results" mentions) | **unsupported**: no validation dataset or script exists (see §3) |

That is the whole list. Four documents and two meta tags — **six assertions, zero evidence**.

## 3. What does not exist (the negative result, with the commands)

**(a) No file anywhere names the source.** Searched every `.md`, `.txt`, `.json`, `.jsonc`, `.js`, `.mjs` outside `node_modules` for: `madden 2x edition/release/update`, `from madden 2x`, `ratings were scraped/entered/collected/sourced`, `scraped from`, `manually entered`, `source of the (player) ratings`, `pro football reference`, `ourlads`, `spotrac`, and origin statements of the form "supplied/typed/transcribed by".

```
(blank = no origin statement)
```

Zero hits that name a source. The only hits are the assertions in §2.

**(b) No commit introduces the data.** `git log --all -S"Ja'Marr Chase" -- "*.html"` — the first row of the array — returns nothing earlier than **2026-10-20**, the day the repository was created. The rows arrive **already baked into the build** in the initial commit (`474eb52c` / `268fd564`); every later commit only copies the file around. There is no import commit, no data commit, no "add ratings" commit. **Git cannot attribute the rows, because the rows predate git.**

**(c) No data file holds them.** The only football data file in the tree, `sports/football/ratings.json`, is:

```json
{ "quarantined": true, "notice": "…", "records": [] }
```

**Zero records.** Its notice records that records were deleted on 22 Oct 2026 under the Owner's ruling, and that **"no provenance"** was one of the stated reasons for deletion.

**(d) The council's own database carries no source either.** `~/football-sim.db` → `meta`:

```
build_file, build_sha256, build_bytes, players=1200, teams=32, team_slots=1088,
built_at, built_by (MOC's builder), columns_players, note
```

No source, no edition, no capture date. (It was built from `044d1759…`, the retired file — so DB-derived counts inherit that file, not Pre-Colors.)

**(e) No calibration dataset exists.** No `*.csv`, no `2025`, no `wins`, no `calib` file anywhere in the tree; no test references RMSE/Spearman/correlation. So the build's "validated against real 2025 results" claim has nothing behind it in the repository either.

**(f) Prior provenance work covers other artifacts, not these rows.** `_agents/boc/notes/invented-ratings-provenance.md` establishes the *other* ratings files were untracked with **origin UNKNOWN**; `_agents/lightning/notes/ARTIFACT-PROVENANCE.md` covers E2E run artifacts; `receipt-run-b-provenance.md` covers an NBA 2K intake spec. None traces the shipped 1,200.

## 4. Two rows that are falsifiably not real-world facts

```
["Aaron Donald","DT","Los Angeles Rams",95,83,97,84,67,97,90,false]
["Boye Mafe","REDG","Cincinnati Bengals",78,89,75,75,67,90,76,false]
```

Aaron Donald retired after the 2023 season; Boye Mafe is not a Bengal. These are not typos in a scrape — they are a **projected/edited roster**. An independent outside review reached the same conclusion and said so in writing:

> "The roster is a **projected/fictional 2026 world** (Aaron Donald active on the Rams at 95, Boye Mafe a Bengal, an invented 2026 coaching carousel), while the meta description says ratings are 'real Madden ratings… set after the 2025 season'… soften the marketing copy so it doesn't read as a factual claim that can be falsified in ten seconds."
> — `OtherChambers_AI_Critiques.md:132–138`

So the honest position is not "we cannot find the source yet". It is: **the dataset, as shipped, is not a Madden 27 snapshot**, and a provenance claim phrased that way would be false on inspection.

## 5. The honest minimum — what a provenance claim would need that the tree does not have

A claim is only worth the field that can falsify it. For "these 1,200 ratings come from X", the tree would need all six:

1. **A named artifact with an edition and a date.** Not "Madden 27" but the exact product state — e.g. "Madden NFL 27, launch roster, read 2026-08-14", or the truthful alternative: "generated by <model> from prompts on <date>, then edited by <who>".
2. **A retrieval record.** The scrape endpoint/URL, or the screenshots/transcription notes, plus a capture timestamp. Ratings move with roster updates, so a source without a date does not pin anything.
3. **A per-row or per-batch mapping.** Which of the 1,200 rows came from which source, keyed by something stable (name + team + season). Today no row can be re-found at its origin, so no individual rating can be audited.
4. **A transform log.** The build uses position codes (`REDG`), a 40–99 scale, and an `xf` flag (49 rows). If a source used different conventions, the normalisation must be recorded, with who did it.
5. **A checksum over the exact row set.** A source claim that does not pin *which* 1,200 rows it covers is unverifiable the moment one row changes — the same discipline the council already applies to builds.
6. **A correction path, and the truthful fallback.** Known-false rows must be either fixed or labelled. And if (1)–(5) cannot be recovered — which is the case today, since the rows predate git and no capture log survives — then the claim must degrade to the true statement: **a projected/edited dataset, not a Madden 27 snapshot**, and the product copy ("built from real Madden ratings", the realism audit's 2025 validation claim) must stop asserting what cannot be shown.

Items 1–5 are what the tree lacks. Item 6 is the part that costs nothing and is available now, and it is an Architect/Owner decision, not mine.

## 6. What I deliberately did not do

No source was invented or guessed. No product edit. No copy change proposed for execution (the wording in §5.6 is an observation for the Architect, not a patch). No deletion or quarantine action. No candidate build. Not checked: whether the Owner holds an offline record outside this machine — the question asked what the **tree** evidences, and the tree evidences nothing.
