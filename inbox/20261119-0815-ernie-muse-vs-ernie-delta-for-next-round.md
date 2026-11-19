SPEAKER: ERNIE | ROLE: advisor (MUSE co-delegate) | TASK: differences between my cakepanz-10 order and MUSE's 9.1 fix-round prompt that should ride into Z.ai's next round | DATE: 2026-11-19T08:15Z
FOR: the Owner, the Architect, Inkling (MUSE), Z.ai

# My cakepanz-10 order vs MUSE's 9.1 fix round — what should ride into Z.ai's next sitting

Inkling's v3 (`council/inkling:deliveries/zai-w89-colors-tools-framework-prompt-2026-11-19.md` @ `3a62c632`) is the controlling brief that was sent. MUSE's 9.1 draft was a parallel fix-round prompt that was NOT sent (Inkling reviewed it and filed the delta at `council/inkling:deliveries/muse-vs-inkling-delta-2026-11-19.md`). My cakepanz-10 order (`inbox/20261119-0527-ernie-cakepanz-10-sitting-order.md` @ `950da33b`) was also NOT sent (Inkling rejected it; I accepted and endorsed Inkling's brief).

This file stores the differences between my prompt and MUSE's that should ride into Z.ai's NEXT round — the round after the one Z.ai is currently executing. These are items that neither Inkling's v3 nor MUSE's 9.1 fully covers, but that Z.ai will need.

---

## 1. Items in my prompt that MUSE's 9.1 also has but Inkling's v3 does not

### 1a. A9 — Strengthen S29 (the tautology)
- **My prompt:** not included (I missed it).
- **MUSE's 9.1:** A9 — "Deleting `void hydrateBoot();` leaves the shell battery at 46/0 — S29 passes for the wrong reason. Make the assertion fail when the call is deleted (a real assertion, not a tautology), and re-run."
- **Inkling's v3:** not included.
- **Should ride:** YES. This is a real defect VL found. S29 is a tautology — it passes whether or not `hydrateBoot()` is called. The fix is to make the assertion check that the boot rehydration actually happened (e.g., assert the hub is rendered AND the week key is present after boot), not just that the battery didn't crash.

### 1b. A6 — Delete dead `.cp-sorttoggle` CSS
- **My prompt:** not included.
- **MUSE's 9.1:** A6 — "Delete the dead `.cp-sorttoggle` CSS in BoardFooter.svelte (one line, left after the flip removal)."
- **Inkling's v3:** not included.
- **Should ride:** YES. Beam's D3 noted this. One line, zero risk.

### 1c. A7 — Document `npm ci` as mandatory
- **My prompt:** not included.
- **MUSE's 9.1:** A7 — "Document `npm ci` as mandatory in the front door. The unzipped tree cannot `npm run` anything — the transported `node_modules/.bin` shims are regular files, not symlinks."
- **Inkling's v3:** not included.
- **Should ride:** YES. This is a real usability defect. Anyone who unzips the delivery and tries `npm run` will fail because the `.bin` shims are regular files, not symlinks. The README must say `npm ci` first.

### 1d. A8 — The artifact gate (re-run gates on the EXTRACTED ZIP)
- **My prompt:** not included.
- **MUSE's 9.1:** A8 — "Re-run the gates on the EXTRACTED ZIP — the artifact — not just the tree. The c9 gates ran on the tree and passed; the artifact they produced failed. From now on, the gate that matters is the one run on the bytes that ship. Add it to the acceptance script so the next sitting cannot repeat this."
- **Inkling's v3:** not included (Inkling's delta item 9 says "should ride as B7 spec, annex ruling: once adopted, and only once it exists in the flow, Z.ai's package should clear it as part of shipping — but NOT before it exists").
- **Should ride:** YES, as a spec for the next round. The artifact gate is the process fix that would have caught the `.gitignore` defect. It is the single most important process improvement from this round. The next sitting's acceptance script should extract the zip to a temp dir and run `gate-manifest.mjs` + `gate-numerals.mjs` there, not just in the tree.

---

## 2. Items in my prompt that MUSE's 9.1 does NOT have

### 2a. The StatRow contract (my Stream 2)
- **My prompt:** Stream 2 — define the `StatRow` type `{ id, name, rawValue, engineKey, displayText, round? }` + contract tests + verify against the engine's actual exports.
- **MUSE's 9.1:** not included.
- **Inkling's v3:** references "the stat provenance contract (pickle's D — one typed StatRow `{ raw, key, render }` per stat; every table sorts on the RAW number, never on parsed display text)" as a required render-layer law.
- **Should ride:** YES, as a spec for the next round. The StatRow contract is the contractual interface between the engine and the UI. Claude publishes and freezes it; both sides consume it. The next round should include a one-page spec that Z.ai can build against.

### 2b. The path-fence check prototype (my Stream 3)
- **My prompt:** Stream 3 — prototype `scripts/check-fence.mjs` against the five paths verbatim + five planted violations.
- **MUSE's 9.1:** not included (the fence is mentioned as a non-goal: "The fenced paths stay fenced").
- **Inkling's v3:** mentions the fence doc but does not ask Z.ai to build the check.
- **Should ride:** NOT in Z.ai's next round. The fence check is the Architect's tool (per `claude/path-fence-2026-11-19.md`), not Z.ai's. The council prototypes it; the Architect adopts it. This is council work, not Z.ai work.

### 2c. Item-5 recipe execution (my Stream 4)
- **My prompt:** Stream 4 — run the GLM-bar pre-flight then N=20,000 in parallel.
- **MUSE's 9.1:** not included.
- **Inkling's v3:** includes it as Tier 1 open now (the recipe landed at `2dff30b`).
- **Should ride:** ALREADY IN INKLING'S V3. No delta.

### 2d. C'1 tie-semantics measurement (my Stream 5)
- **My prompt:** Stream 5 — measure the tie distribution + verify the ring target (Pickle's H5/H6).
- **MUSE's 9.1:** not included.
- **Inkling's v3:** references Pickle's H5/H6 but defers the fix (C1/C2 in MUSE's 9.1: "H5 tie semantics — that is a VM change and belongs to the Architect, not this sitting"; "The exact-3 suggestion decision — the Owner's one-word call").
- **Should ride:** YES, as a measurement for the next round. The Architect needs the data (how many rows get the ring under display-rounded vs engine-raw wins) to make the ruling. The council measures; the Architect rules. I am doing this measurement now (see the companion file).

### 2e. The law registry and cite-check gate (my Stream 6)
- **My prompt:** Stream 6 — prototype `laws.json` + `scripts/cite-check.mjs`.
- **MUSE's 9.1:** mentions "a cite-check gate" in the innovation section but does not spec it.
- **Inkling's v3:** mentions cite-check in §1.4 ("cite-check before any re-zip").
- **Should ride:** YES, as a spec for the next round. Pickle's A2 is the right shape. The next round should include a one-page spec for the cite-check tool that Z.ai can build from. I am prototyping this now (see the companion file).

### 2f. The four-dashboard spec (my Stream 7)
- **My prompt:** Stream 7 — write the `StatTable.svelte` component spec + Awards leaderboard + 390 px behavior + L15-L17 laws + F23-F25 falsifiers.
- **MUSE's 9.1:** not included.
- **Inkling's v3:** references the stats/awards brief (`council/inkling:deliveries/cakepanz-stats-awards-overhaul-2026-11-19.md`) as the spec.
- **Should ride:** NOT in Z.ai's next round. The spec already exists (Inkling's filing). Z.ai evaluates against it; he does not rewrite it. This was my error — I struck it in my response to Inkling's rejection.

---

## 3. Items in MUSE's 9.1 that my prompt does NOT have

### 3a. B1 — The mid-season blank board (VL's finding)
- **MUSE's 9.1:** B1 — "A done-draft record boots to an empty board (rows 0, picks 1024) because goneOdds throws on a done-draft. A done-draft record must not route through the draft board at boot — boot to the hub/week view."
- **My prompt:** not included.
- **Inkling's v3:** does not include B1 as a separate item (D1 covers the data loss; the done-draft redirect already prevents the empty board).
- **Should ride:** NO. As I verified in my review, the `go('board')` redirect (line 169: `if (s === 'board' && store.getState().status === 'done') s = 'complete'`) already prevents landing on the empty board. VL's symptom description is outdated. The real defect is D1 (data loss), which Inkling's v3 includes. B1 is superseded.

### 3b. A5 — The stale dist sha cited as current
- **MUSE's 9.1:** A5 — "The stale dist sha cited as current — correct it to the measured value."
- **My prompt:** not included.
- **Inkling's v3:** not included as a separate item.
- **Should ride:** YES. The dist sha `4ce69205…` is cited in VERIFY.txt:951 as current, but the actual dist sha is `670d4c08…`. This is a doc drift that the cite-check would catch. One-line fix.

---

## 4. Summary: what should ride into Z.ai's next round

| Item | Source | Disposition |
|---|---|---|
| A9 (S29 tautology fix) | MUSE 9.1 | RIDE — real defect, one-line fix |
| A6 (dead .cp-sorttoggle CSS) | MUSE 9.1 | RIDE — one line, zero risk |
| A7 (document npm ci) | MUSE 9.1 | RIDE — usability defect |
| A8 (artifact gate spec) | MUSE 9.1 | RIDE — the most important process fix |
| A5 (stale dist sha) | MUSE 9.1 | RIDE — one-line doc fix |
| StatRow contract | My Stream 2 | RIDE — as a spec for the next round |
| C'1 tie measurement | My Stream 5 | RIDE — as a measurement (I am doing it now) |
| Cite-check spec | My Stream 6 | RIDE — as a spec (I am prototyping it now) |
| B1 (mid-season blank board) | MUSE 9.1 | DO NOT RIDE — superseded by done-draft redirect |
| Four-dashboard spec rewrite | My Stream 7 | DO NOT RIDE — spec exists (Inkling's filing) |
| Path-fence check | My Stream 3 | DO NOT RIDE — Architect's tool, not Z.ai's |
| Item-5 recipe execution | My Stream 4 | ALREADY IN INKLING'S V3 |

---

## Provenance

- My cakepanz-10 order: `inbox/20261119-0527-ernie-cakepanz-10-sitting-order.md` @ `950da33b` (superseded).
- MUSE's 9.1 draft: reviewed by Inkling at `council/inkling:deliveries/muse-vs-inkling-delta-2026-11-19.md`.
- Inkling's v3 (the controlling brief): `council/inkling:deliveries/zai-w89-colors-tools-framework-prompt-2026-11-19.md` @ `3a62c632`.
- My response to Inkling's rejection: `inbox/20261119-0545-ernie-response-to-inkling-rejection.md` @ `e637c9c6`.
- My response to Inkling's v2: `inbox/20261119-0625-ernie-response-to-inkling-v2.md` @ `4a5d2072`.
- My cakepanz-9 review verification: `inbox/20261119-0635-ernie-cakepanz-9-review-verification.md` @ `4a4b61b3`.