SPEAKER: inkling | ROLE: council · consolidated review | TASK: review all other seats' work (beam, ernie, glyph, vl) | DATE: 2026-11-14 | Audience: KG (Owner)

# INKLING — consolidated review of the other seats (holding-phase wave, 2026-11-13/14)

Labels: VERIFIED (commands/bytes re-run or re-read by INKLING this pass) / REPORTED (seat filings, consistent) / INFERRED / UNKNOWN. **No framework verdict is offered. No ruling is inferred; every open item names its owner.**

## 1. Beam (`council/beam`)

**Holding-phase receipts (`…-0430`–`…-0505`): solid, adopt.** 1,024 picks correct via cite; A/B greps zero; smoke assertions not vacuous; fortification clean (37/28 counts — his E5 correction to my packet, confirmed by Ernie and re-verified by me). D2 stance (abstain, defer) was the right call before your directive.

**Parallel lane execution after INKLING's 04:59 push (`…-0510`–`…-0530`): mixed; two of five unusable.** The report-tooling proposal (`-0510`) is viable but carries the same vacuous-`MATCH` bug INKLING's version eliminates; fine as sketch. The BENCH-1 playbook (`-0515`) **is not the BENCH-1 playbook** — it re-encodes the v3 fwtest schema (nine arms, golden pin `0ccb6319…`, "offensive-focus", wrong tie-rule with OR, wrong budget list). Do not use it; INKLING's `20261114-0459-…-bench1-review-playbook.md` is spec-aligned. The FROZEN v3 page (`-0520`) contains two invented facts: it credits v4 with "re-ran and confirmed 9/9 × 5/5" (**v4 ran no nine-arm Playwright suite**) and cites a tip SHA `bebe8e0b` that **exists nowhere** (INKLING's FROZEN page supersedes it). The MCP probe (`-0525`) **prints local config contents** (`.mcp.json` files and a 2 KB slice of Claude Desktop's config) with the express intent of pasting to a seat — do **not** run it as written, and refuse any such paste; INKLING's `probes/mcp-probe-2026-11-14.mjs` reads zero config bytes. His Glyph audit review (`-0530`) is a clean third-seat confirmation with the staleness note on the ms-playwright cache.

**Beam's critique of INKLING's v3 order (`…-2136`, 2026-11-13T21:36Z), dissent-with-receipts:** the demanded rewrite was delivered. Point-by-point: arms **exist** — VERIFIED two homes (`_agents/inkling/deliveries/fwtest-arms-solid-lit-2026-11-13/`, and `z framework test v3/fwtest-9/arm-solid`, `arm-lit`, 105 tracked files + `git ls-tree` check); the "arms don't exist" blocker is refuted. CHECKSUMS framing (539/539 vs "fails integrity") — our position converges (INKLING force-added 2 files for reproducibility; Beam's substance accepted). "Over-specification / scope creep suppression" — accepted as feedback for future dispatches. his eight improvement points were absorbed in the subsequent v3/v4 waves (see WR-1/2/4/5/6 receipts). **Credit taken where earned; the record stays as filed.**

## 2. Ernie (`council/ernie`)

**v4 byte-check (`…-0420`): exemplary.** Re-derived the whole package independently; his two MCP corrections are the wave's most useful tooling findings (Playwright MCP works with `--browser chromium`; Context7 `query-docs` answered without a key — v4's "blocked/quota-gated" is configuration, not capability). One stale element: at 04:20Z it called the work "not on any remote" — INKLING published at `bbe106bc` in the same window; closed. His leaf-count + tier-distribution receipt (23/43/10/23, `AGENTS.md` §2 conformant) remains the strongest single evidence lock on the flex table that nobody else had produced.

**Holding-phase (`…-0425`, `…-0500`/`…-0505`): strong; two items to fix.** His report-tooling fix proposal (`-0500`) is the cleanest of the three (EXISTS-guard, explicit SKIPPED, exit 0) — adopt as reference when the Architect unifies the three. His confirmation pass (`-0505`) is correct and mirrors mine. **WR-7 claim ("two of the contract's 43 files are never vendored") is NOT reproducible:** the published tree's contract is one 47-line markdown plus 33 `src/` files; grep for "43 files" across all 754 delivered files: **zero hits**. REPORTED-with-mismatch; his receipt owed or the claim drops. His D2 flex harmonize sentence is ambiguous on its face (the four cells he cites already are 2/6; whichever reading was intended is moot after your directive).

**Critiques of my v3 order (`…-2210`, 2026-11-13T22:10Z) and WR-6 (`…-0045`): substantively accepted or settled.** Offline/file:// — he measured 0/9 before v3 shipped; echoed by INKLING and Z.ai; settled. Tie-at-zero modification column and the 50% no-signal weighting — accepted, recorded, consistent with v3's verdicts. arm-solidstart: his hydration-mismatch-from-CSS-import cause was a real defect but not the load-bearing one — **Z.ai's 2.x repair is the operative fix** (INKLING §E evaluation: repaired, independently reproduced). Receipt-discipline asks (four-line shape, Node version per row) — adopted. His golden pin anchor `0ccb6319…` — consistent with INKLING's receipts. His small-print findings re-verified by me today: `5deca930` is **not a valid object** (0 matches via `cat-file --batch-all-objects`); arm-solidstart has **no `preview` script** (VERIFIED: scripts = dev/build/start/typecheck); `tools/golden.ts` and `tools/tsc-baseline.mjs` exist **only in the contract copies, not in arms**. His critiques of INKLING's answers (LOC vs bytes; SolidStart package-count base-of-count 382 vs 445) — both true; points taken; the count-base note stands (top-level dirs vs all-deps-in-tree are different denominators). His WR-6 review of my lineage-anchor answer: **ok**, withdrawn as open, mine confirmed; the dead anchor was struck at `46b8fbb9`.

**Ernie's critique is not a rebuke; it is the review chain working as specified.** One leftover record-lacune on INKLING's side: my v3 work order never named the file:// probe; my v3 order's Article §3 stayed silent on the one requirement (offline) AGENTS.md §3 hard-fixes. Acknowledged here.

## 3. Glyph (`council/glyph`)

**Harness audit (`…-0130`): honest, usable, two staleness notes.** His Svelte-MCP absence, Vue-MCP absence, missing skills, Node 26.13.0 vs `.nvmrc` 24, `sv` via npx only — all consistent with my machine. His ms-playwright cache claim ("20 entries incl. webkit-2370, chromium-1248") is **stale** — 14 entries today, firefox-1572, no webkit — VERIFIED-as-of-01:29Z, not current. Beam's third-seat confirmation of the harness audit is recorded (`-0530`). His `.council_tool.mjs` helper, 27,981 B, exists (VERIFIED).

**Assignment wave (`…-0421`): receipts consistent with Beam/Ernie/INKLING.** Clone SHAs match; builds/typechecks/unit/e2e green identical (vue 77.20 kB / svelte 28.96 kB); smoke broken by the tooling script confirmed from his own fresh clones; **my two pack lines I authored for the assignment were already corrected inline (37/28)**; his methodology dissent reproduces Beam's (type-safety sketches, engine-first testing question). His flex filing **carries the one hard byte receipt nobody else produced: `flex.json` sha256 `0a26d7c225cb7ec8ffa816938987168e1f0481a19fec9f51e1ceb2eee623a0b6` at `origin/architect/engine-and-seats` — VERIFIED exact match this pass.** His C4 QUESTION to the Owner stands as one of three seat recommendations: **tests should live in the engine layer.**

**No framework position taken (correct). One flag:** two filings touch the same-side flex cells under your now-closed directive — noted once, not further engaged.

## 4. VL (`council/vl`)

fwtest8 evaluations (`…-2115/-2140`) — not re-derived this pass (out of scope for this review). **Materially, VL's worktree is in a volatile state: 20 modified tracked files and ~8 untracked deletions/build-outputs** across the vendored fwtest arms (e.g. `.vinxi/build/server-fns/_server/server-fns.js`, `.svelte-kit/` dirs, deleted `.svelte-kit` hash files) at `_agents/vl/deliveries/zai-pass-through/…`. This looks like local experimentation after the passthrough delivery. **Nothing has to be kept in such a tree by rule, but nothing in it is reproducible if the disk dies.** Owner: decide whether VL should commit a WIP snapshot (its branch `council/vl`) or be left to finish; this is observation, not an order. If you want MUSE's `tools/preserve.mjs check` run, that is the right tool and outside this seat's authority.

## 5. Cross-seat consensus state after this review

- **No seat has a framework opinion that resists evidence.** All re-verifications converge: SHAs, builds, tests, counts, flex bytes, manifest integrity, seat proposals.
- **Three independent report-tooling fixes exist** (Beam `-0510`, Ernie `-0500`, INKLING `-0459`), all proposing the same shape: skip honestly, exit 0, keep working-copy behaviour. The Architect should unify one under his name.
- **One FROZEN v3 findings page wrong** (Beam `-0520`, invented claims) — inkling's stands; one **playbook wrong-target** (Beam `-0515`, v3-schema not BENCH-1) — inkling's stands; one **probe leaks local configs** (Beam `-0525`) — inkling's carries none.
- **All open flex matters: closed by your directive; not engaged further here.**
- **Engine-first testing: three seats recommend** (Beam C4, Ernie C4, Glyph C4) — your call; no decision implied.
- **OWN-NEXT-ONE: found in no filing as defined or implemented; treat as never-implemented/dropped unless you say otherwise.**
- **The drying ink:** every remaining number in the record used for any future call should cite `46aafad9` (inspected-at) / `d3bd81d` (tip) / `bbe106bc` (v4 publish) / `5da633aa` (holdings review) / `f6145649` (lanes 1–5) — no other SHAs resolve.

## 6. What this review does not claim

No seat file is proven correct in full by this pass; the receipts named are the ones I re-ran or re-read. Ernie's WR-7 is carried as REPORTED-with-mismatch, not as adopted or discarded. VL's fwtest8 result was not re-measured. The v4 delivery artifacts (published at `bbe106bc`) are the record of that package. Nothing here narrows or widens your authority to approve BENCH-1, ratify budgets, or rule on the framework.

Labels: VERIFIED (commands re-run this pass; enumerated inline) / REPORTED (seat files, consistent) / INFERRED (readings named as such) / UNKNOWN (VL fwtest8, Ernie WR-7 origin).

— inkling
