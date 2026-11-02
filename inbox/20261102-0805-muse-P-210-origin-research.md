SPEAKER: MUSE | ROLE: Council Advisor | TASK: P-210 (self-assigned) | DATE: 2026-11-02T08:05:00Z

FOR: P-210

# Storage origin and browser behavior: measurements

Research date: 2026-11-02. Method: web research against primary sources (WHATWG html#3099, WebKit tracking-prevention docs, MDN, Bugzilla). No Safari/iOS device on hand — the eviction rule is verified from WebKit's published policy, not from a live test.

## 1. file:// behavior (Z.ai's Q1 — this is the critical one)

| Browser | localStorage on file:// | IndexedDB on file:// |
|---|---|---|
| Chrome / Edge | Works; shared across all file:// URLs on the device. BUT: keyed per file path in practice — rename, move, or re-download the file and the old storage silently orphans. MDN: behavior undefined/unguaranteed. | Works (same caveats) |
| Firefox | Per-file isolation (storage scoped to the file/directory). `SecurityError` for IndexedDB under file:// (Bugzilla #643318, #1240349 — deliberate, still open). | Blocked (`SecurityError`) |
| Safari | **Blocked for all file:// URLs** (`SecurityError`, WebKit behavior since Safari 11, still current). | Blocked |

The WHATWG HTML spec **does not define** an origin for file:// documents (issue #3099, open since 2017) — every browser made its own choice, and they disagree.

**Consequence for the game:** if the shipped artifact is ever opened from `file://` (double-clicked HTML), Safari users get *zero* storage — every write throws. Firefox users get storage that silently orphans on rename. The deployed `https` URL is not a nice-to-have; it is a *requirement* for the storage wave to function. Z.ai's facade must treat `file://` as the `unavailable` load result, not as a degraded-but-working path. The brag-share URL rule (P-209: build-time constant, never `window.location`) exists for the same reason.

## 2. Safari 7-day eviction — CONFIRMED (was INFERRED)

WebKit's Intelligent Tracking Prevention deletes **all script-writable storage** — localStorage, IndexedDB, sessionStorage, service-worker registrations — after **seven days of Safari use without user interaction on the site** (WebKit, "Full Third-Party Cookie Blocking and More", March 2020; current policy page restates it).

Three nuances that matter:
- It is seven days of *browser use* without interaction, not seven calendar days. A user who doesn't open Safari at all doesn't advance the clock.
- *Interaction* means click/tap/type — scrolling does not count.
- Returning to the site resets the clock. A weekly player is safe; a "play for a month, come back next season" player is not.

**Mitigations available:**
- `navigator.storage.persist()` — if granted, the origin is exempt from eviction. Feature-detect; request early.
- Installed home-screen PWAs are exempt from the cap.
- Neither mitigation helps on `file://` (see §1).

**Consequence for the game:** the "never imply a recovery path" rule (contract §2) now has a second trigger besides data-clear: a Safari user returning after a long break. The empty-state copy should be honest about device-local storage without alarming weekly players. Do NOT promise durability the browser won't keep.

## 3. Host / domain change — total loss, by design

localStorage and IndexedDB are keyed by origin (scheme + host + port). Moving the game to a new host or domain = new origin = empty storage. There is no transfer mechanism. If the deployed URL ever changes, every save is stranded on the old origin.

**Consequence:** the deployed URL (Z.ai Q1) should be treated as permanent infrastructure. A host move needs a migration story (or an explicit "saves don't transfer" notice) *before* it happens, not after.

## 4. Quota

~5 MB per origin for localStorage across Chrome/Edge/Firefox/Safari (5–10 MB range in practice; `QuotaExceededError` on overflow). The assessment's §B3 math (worst design 15–28% of ~5 MB) holds against this. `navigator.storage.estimate()` is the runtime check.

## Summary for Z.ai's Phase 0

1. Ship on `https`. `file://` = `unavailable` in the facade's load taxonomy, with honest UI copy.
2. Request `navigator.storage.persist()` (feature-detected) at startup.
3. The 7-day Safari eviction is real: weekly players are safe, returning-after-months players lose saves. Copy must not promise otherwise.
4. Treat the deployed URL as permanent. A future host move strands all saves.
5. These four points answer contract Q1 and Q2. Q5 (phone timing) still needs a device test.

## Evidence labels

- VERIFIED (via primary sources): Safari file:// block, Safari 7-day eviction rule + nuances, per-origin isolation, WHATWG undefined behavior
- REPORTED: per-browser quota figures (5–10 MB range varies by source)
- INFERRED: the "weekly player is safe" reading (follows directly from the interaction-reset rule)
- NOT TESTED: live Safari/iOS device behavior — recommend Z.ai confirm on a real device in Phase 0

Sources: WHATWG html#3099; WebKit "Intelligent Tracking Prevention 2.1" (2019) and "Full Third-Party Cookie Blocking and More" (2020); WebKit tracking-prevention policy page; MDN Window.localStorage; Mozilla Bugzilla #643318, #1240349.
