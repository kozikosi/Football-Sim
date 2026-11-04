# w68 Debt Inventory — v2a (behavioral pass, first tranche)

**Seat:** ZAI (executor) · **Date:** 2026-11-05 · **Anchor swept:** w70 artifact (w68 lineage; w70 = w69 + six UI fixes, md5 `79c4a934…`)
**Status:** v2a = instrument built + first evidence banked. v2b (screen-by-screen walkthrough at depth) and v2c (per-wave diff w34→w70) scheduled below.

## 0. New instrument: the storage dump harness (`scripts/w71_storage_dump.js`)

Boots the artifact headless (Playwright chromium), snapshots **all** `localStorage` keys with
value SHAPE (parsed top-level keys/types, not just sizes) at each step, maps visible buttons
per step (flow map), and greps the artifact statically for envelope-field usage. Zero console
errors while driving. This is also the **Architect's P0 dependency** (his Q12 table: "real w68
dumps … depends on: Z.ai dump") — delivered with this wave.

### What v2a already established (VERIFIED this pass)

1. **Fresh boot writes ZERO localStorage keys.** All persistence is lazy. Consequence for the
   rebuild: no boot-order storage races to port; the old shell's first write is user-triggered.
2. **Keys written by trivial UI** (captured with shape): `zpb:theme` = `"dark"` (string, len 4)
   via `themeToggleBtn`; `zpb:tab` = `viewId + '|' + btnId` (string). Both single-purpose.
3. **The envelope law is static and strict** (`ZPBStorage`, artifact lines ~14990+):
   `validEnvelope(e)` requires exactly `kind ∈ {draft,week,season}`, integer `schemaVersion ≥ 1`,
   non-empty string `engineVersion`, string `dataVersion`, `slot ∈ {A,B,C}`, ISO-parseable
   `savedAt`, `payload` present. Typed load result: `ok | empty | corrupt | newer-version |
   unavailable`. **No `sport` field** — matches VL's verified migration note (copy verbatim +
   add `sport:"nfl"`).
4. **The live autosave envelope literal** (w65 law, present in w70):
   `{ kind:'week', schemaVersion:1, engineVersion:'zpb-w65', dataVersion:'1', slot:'A',
      savedAt:<ISO>, payload:{ zpbRestore:2, seasonState, draft:{rosters…} } }`
   — debounced 700 ms off a seasonState signature (`phase|currentWeek|size`), and **only when
   a season is in progress**. A draft alone never triggers it.
5. **Slot keys are dynamic**: prefix `'zpb:st:'` + `slot:A|B|C` + optional `:bak|:tmp|:del`
   (quota pruning protects completed-season slots, stats, profile; refuses rather than evict
   protected bytes). Plus `zpb:st:profile|settings|stats|stats:applied`, `zpb:storage` probe,
   `zpbPlayerProfiles`, `zpb:base34`, `zpb:theme`, `zpb:tab`.
6. **This closes the Architect's Q4 open item** ("[U] whether Z.ai's current slot value is
   already an envelope"): **YES — by construction**, every write routes through `validEnvelope`.
   His golden-migration tests can build instances from the literal in (4); a populated slot
   dump from a real playthrough remains a nice-to-have (harness ready; see §3).

### Boot screen flow map (first row of the behavioral matrix, worked example)

Buttons visible at boot (VERIFIED): `themeToggleBtn` · `modelWBtn` · `personalWBtn` ·
`zpbMyWBtn` · `posBtn` · `startDraftBtn` · `speedSlowBtn` · `speedInstantBtn` · `undoPickBtn` ·
`simToEndBtn` · `rosterPickBtn` · `rosterDepthBtn` · `tabDraftBtn` · `tabRankingsBtn` ·
`tabPlayersBtn` · `tabGroupsBtn` · `tabCompareBtn` · `tabGuideBtn`.
Note: draft sim controls (`undo/sim to end`) are present pre-draft — worth a disabled-state
check in v2b (are they inert or active before a draft starts?).

## 1. The instrument for v2b: screen × state matrix

Each cell = one behavioral observation (screenshot + DOM/storage/console snapshot). Screens
from the tab bar + season-flow screens the waves built:

| # | Screen | Empty/first-run | Populated | Error path | 390 px | Dark + light |
|---|---|---|---|---|---|---|
| 1 | Draft simulator (boot) | ✅ done in v2a | flow-gated | — | v2b | v2b |
| 2 | Madden rankings tab | v2b | v2b | — | v2b | v2b |
| 3 | Player browser tab | v2b | v2b | — | v2b | v2b |
| 4 | Position rankings tab | v2b | v2b | — | v2b | v2b |
| 5 | Team comparison tab | v2b | v2b | — | v2b | v2b |
| 6 | Guide tab | v2b | v2b | — | v2b | v2b |
| 7 | Preseason page (sections 2/3 dropdowns) | v2b | v2b | — | v2b | v2b |
| 8 | Lineup map | v2b | v2b | — | v2b | v2b (w70 ink fix lives here) |
| 9 | Draft review cards | v2b | v2b | — | v2b | v2b (tier law lives here) |
| 10 | Game day / recap | v2b | v2b | — | v2b | v2b |
| 11 | Standings / bracket / awards | v2b | v2b | — | v2b | v2b |
| 12 | Season review / 100-season / 20-0 end | v2b | v2b | — | v2b | v2b (w70 pill fix lives here) |
| 13 | Storage failure paths (quota/refuse, corrupt slot, newer-version) | v2b synth | — | v2b synth | n/a | n/a |

Error-path cells are best done synthetically (inject corrupt JSON into `zpb:st:slot:A` before
boot; fill storage to quota) — the typed load result (`corrupt/newer-version/unavailable`)
makes each path observable. That is exactly the golden-dump material the Architect's migration
tests need.

## 2. v2c: per-wave diff review w34 → w70 (accidental-feature hunt)

Method: for each wave pair, `git`/zip diff summary + targeted ripgrep on the surviving artifact
for the wave's documented changes vs. undocumented survivors (the `ZPB34` layer question, the
depth-chart narrow-width overflow, tab-restore edge case from v1's REPORTED list). Output: each
v1 REPORTED item promoted to VERIFIED or retired, and a "port / drop / decide" tag per item.

## 3. Handoff notes

- **To the Architect:** the dump directory (`inbox/w71-storage-dump/`) + §0 above satisfy the
  P0 "Z.ai dump" dependency to first-instance quality. If you want a populated slot instance,
  two options: (a) Owner runs one real draft+week on any device and exports `zpb:st:slot:A`
  (the harness prints instructions), or (b) I drive the deeper flow headlessly next session
  (draft → begin season → sim one week → autosave fires). Say which you want.
- **To the Owner:** nothing here blocks anything. v2b/v2c are my background lanes while
  Claude's contracts land; matrix cells will land in batches with screenshots.
