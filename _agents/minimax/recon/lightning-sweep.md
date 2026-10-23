# W2 Forensic Sweep — Lightning's E2E run artifacts

**Seat:** MiniMax (S-1900-1999) · **Work package:** W2 · **Mode:** read-only forensic sweep
**Sweep window:** 2026-10-21T00:17Z → 2026-10-21T00:30Z (local -1000: 14:17 → 14:30 on 2026-10-20)
**Host:** macOS (darwin), user `kosi`, single volume
**Mandate:** locate Lightning's actual E2E run artifacts; if unrecoverable, record that fact and reconstruct nothing from another member's report or from memory.

---

## 0. Bottom line

| Question                                                        | Answer                                                                                                                                                                                                                                                                                        | Label        |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Is there a **second, distinct** E2E run record on this machine? | **YES** — a fully trace-attested earlier run exists at `/Users/kosi/test-results/` (2026-10-20T22:16:40.761Z → 22:18:38Z), plus a third run that completed during this sweep (2026-10-21T00:21:15.904Z).                                                                                      | **VERIFIED** |
| Is that second run **Lightning's**?                             | **UNKNOWN.** No artifact on this machine (path, file, log, commit, metadata field) attributes any run to the name "Lightning". Run A is the only _unattributed_ earlier run record and is therefore the **candidate**, but attribution is not established by the evidence.                    | **UNKNOWN**  |
| Does the second run have a `result.json`?                       | **No.** Run A has **no JSON run record at all** — only a raw `.trace`, a `.network`, 1,212 screencast frames and a Playwright `error-context.md` marking a **FAILED** run.                                                                                                                    | **VERIFIED** |
| Did the known run's artifacts survive?                          | **Partly.** `result.json`, the spec copy and the schema survive in `_agents/moc/evidence/…` and in two `/private/tmp` staging dirs; the **project's `test-results/e2e-1792537022298/` directory was deleted during this sweep** by a new Playwright run's automatic output-directory cleanup. | **VERIFIED** |

Evidence labels used throughout: **VERIFIED** (reproduced from the files) · **REPORTED** (someone says so; not reproducible by me) · **INFERRED** (reasoned, basis stated) · **UNKNOWN** (evidence does not settle it).

---

## 1. The known run, as a baseline (VERIFIED)

```
$ ls -la "test-results/"                      # at 14:19–14:20 local
-rw-r--r--  1 kosi  staff    45 Oct 20 12:57 .last-run.json
drwxr-xr-x  3 kosi  staff    96 Oct 20 12:57 e2e-1792537022083
drwxr-xr-x 32 kosi  staff  1024 Oct 20 13:11 e2e-1792537022298
```

| Item                              | Value                                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Run dir                           | `test-results/e2e-1792537022298/` (name = epoch-ms of run start, 2026-10-20T22:57:02.298Z)                               |
| `result.json`                     | 14,128 B · mtime **2026-10-20 13:14:57 -1000** · birth 12:57:52 -1000                                                    |
| `result.json` sha256              | `d64a5f9bb3ab6e7b0b97277beb3afdf8858950be1c3b8434a5e2d46426288396`                                                       |
| `runAtUtc` (inside JSON)          | `2026-10-20T22:57:02.298Z`                                                                                               |
| `gitRef` / `gitCommit`            | `merge/v20-donor` / `ff8c05ae0ef89e9030faa991a942d1c611f891bd`                                                           |
| `artifactPath` / `artifactSha256` | `/Users/kosi/Desktop/Football Sim/merged.html` / `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd`      |
| Trace                             | `trace/trace-1792537070181.zip` 65,863,244 B · sha256 `05354b056a43095d0605cee8e292756e9bfbdc5a3c40e74880ed32573d84bc92` |
| PNGs                              | 26 (`viewport-*`, `startup-*`, `draft-results-*`, `100-season-report-*`)                                                 |
| `.last-run.json`                  | `{"status":"passed","failedTests":[]}` (45 B, mtime 12:57:52) — contradicts the record's own `status: "PARTIAL"`         |
| Also in the dir                   | `test-script.spec.js` (17,184 B, mtime 13:11:28), `OPENCHAMBER-E2E-RESULT.schema.json` (5,364 B, mtime 13:11:43)         |

`test-results/e2e-1792537022083/` contained **only an empty `trace/` sub-directory and no `result.json`** — a second attempt that produced no record. (VERIFIED)

---

## 2. THE SECOND RUN — Run A, at `/Users/kosi/test-results/` (VERIFIED)

This is the discovery of the sweep. It is **not** in the project, and it is not in any `test-results` folder the council had been looking at.

```
$ find /Users -xdev \( -name node_modules -o -name '.git' -o -name Library -o -name '.Trash' \) -prune \
    -o -type d \( -name 'test-results' -o -name 'playwright-report' -o -name 'blob-report' -o -name '.playwright*' \) -print
/Users/kosi/Desktop/Football Sim/test-results
/Users/kosi/test-results
/Users/kosi/test-results/.playwright-artifacts-0
```

### 2.1 Run identity (VERIFIED)

| Field               | Value                                                                                                                                  | Source                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Run id (trace id)   | `689961270647219b10142b8a0a3d7cd5`                                                                                                     | trace filename + `trace.trace` internal records                                           |
| Page ref            | `page@3e62c00e81b4c9ff585bb754bb419530`                                                                                                | `.network` `resource-snapshot.pageref`                                                    |
| **Start (UTC)**     | **2026-10-20T22:16:40.761Z**                                                                                                           | `context-options.wallTime = 1792534600761` (embedded, mtime-independent)                  |
| **End (UTC)**       | **2026-10-20T22:18:38Z**                                                                                                               | last screencast frame epoch-ms `1792534714820` = 22:18:34.820Z; trace mtime 22:18:38.214Z |
| Local window        | 12:16:40 → 12:18:38 -1000                                                                                                              | `stat`                                                                                    |
| Output root         | `/Users/kosi/test-results/` — **birth 2026-10-20 12:16:39 -1000**, mtime 12:18:38 -1000                                                | `stat`                                                                                    |
| Runner              | Playwright **1.64.1**, chromium, viewport 1280×720, darwin, locale en-US, `trace: 'on-first-retry'` semantics                          | `context-options`                                                                         |
| Target URL          | `file:///Users/kosi/Desktop/Football%20Sim/merged.html`                                                                                | `before`/`goto` record + `.network`                                                       |
| Artifact under test | sha256 `40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd` (657,486 B) — **byte-identical to the known run's artifact** | trace `resources/` copy                                                                   |
| Test                | `tests/openchamber-e2e.spec.js` → **"OpenChamber E2E Suite - Full Flow"** at **line 156:1**                                            | `error-context.md`                                                                        |
| Outcome             | **FAILED** — `Error: Channel closed` / `browserContext.close: Target page, context or browser has been closed` (`TargetClosedError`)   | `error-context.md` + terminal `after` record                                              |

### 2.2 Complete artifact inventory (VERIFIED)

```
$ find /Users/kosi/test-results -type f ! -name '*.jpeg' -exec stat -f "%z bytes | mtime=%Sm | birth=%SB | %N" -t "%Y-%m-%d %H:%M:%S %z" {} \;
1201 bytes   | mtime=2026-10-20 12:16:40 -1000 | birth=2026-10-20 12:16:40 -1000 | .../traces/689961270647219b10142b8a0a3d7cd5.network
657486 bytes | mtime=2026-10-20 12:16:40 -1000 | birth=2026-10-20 12:16:40 -1000 | .../traces/resources/d2363e7c680072241837f18d8af193d4c89f57c3.html
6171034 bytes| mtime=2026-10-20 12:18:38 -1000 | birth=2026-10-20 12:16:40 -1000 | .../traces/689961270647219b10142b8a0a3d7cd5.trace
439 bytes    | mtime=2026-10-20 12:18:38 -1000 | birth=2026-10-20 12:18:38 -1000 | .../tests-openchamber-e2e-OpenChamber-E2E-Suite---Full-Flow/error-context.md
```

- `screencast/` — **1,212 JPEGs**, 12:16:40 → 12:18:37, filenames carry epoch-ms (e.g. `page@3e62c00e…-1792534602398.jpeg`).
- Total tree: **48 MB**, 1,216 files.
- **No `result.json`. No PNG screenshots. No zipped trace.** — the only machine-readable "record" is the raw Playwright trace plus the failure context.

### 2.3 sha256 of Run A artifacts (VERIFIED)

```
0c033dd715baf4371aa364f11a85902ac2a8350e1afed33745fc2eb08a77df7e  .../689961270647219b10142b8a0a3d7cd5.trace
d53de090d65833b71065d1061838105d43ca3ac1cd23b4cb2a88460653af3f26  .../689961270647219b10142b8a0a3d7cd5.network
40233d6be00e987c472cf6b1126b0ab7f11c123006277466bd23391b308795fd  .../resources/d2363e7c680072241837f18d8af193d4c89f57c3.html
```

### 2.4 What Run A actually did (VERIFIED — from the trace's own call log)

Extracted from the 1,670-line trace file by counting `before` records:

| API call             | count  |
| -------------------- | ------ |
| `waitForTimeout`     | 18     |
| `screenshot`         | **14** |
| `setViewportSize`    | 12     |
| `evaluateExpression` | 11     |
| `expect`             | 6      |
| `click`              | 6      |
| `emulateMedia`       | 4      |
| `textContent`        | 3      |
| `goto`               | 1      |
| `title`              | 1      |
| `isVisible`          | 1      |

Run A therefore took **14 screenshots** and made **6 clicks / 6 assertions** before the browser died. (INFERRED, basis stated: the 12 `setViewportSize` calls are consistent with 6 checkpoints × 2 viewports — desktop + 390px — matching the E2E protocol's viewport pattern; the run is consistent with an _incomplete_ pass that crashed mid-flow.)

### 2.5 How Run A was launched (partly UNKNOWN)

- VERIFIED: the Playwright install used was **at the home directory** — `/Users/kosi/node_modules/playwright` + `playwright-core` + `/Users/kosi/package.json` (all Oct 18 17:23) with `/Users/kosi/playwright.config.js` (`testDir: './tests'`, `reporter: 'html'`, `trace: 'on-first-retry'`, projects chromium/firefox/webkit). The stack of Run A's `TargetClosedError` points into `/Users/kosi/node_modules/playwright-core/li…`.
- VERIFIED: the project's own `node_modules/` + `package.json` were created at **12:17:00 -1000 (22:17:00Z) — i.e. _during_ Run A**, and that project-local install is what produced the later runs' output inside the project.
- VERIFIED: `/Users/kosi/tests/` contains **only** `example.spec.js` (mtime Oct 18 17:23; the directory mtime has not changed since), so the spec was **not** staged in the home `tests/` folder when Run A executed.
- **UNKNOWN:** the exact invocation that placed the spec in scope while writing its output to `/Users/kosi/test-results/`. The surviving artifacts do not record the command line. The home `playwright.config.js` is the only `playwright.config*` on the whole disk (`find /Users /tmp /private/tmp -name 'playwright.config*'` → 1 hit).
- VERIFIED (spec lineage): the spec's test declaration **moved** between Run A and Run B — Run A's `error-context.md` cites **line 156** and the title _"OpenChamber E2E Suite - Full Flow"_, whereas the current project spec has the test at **line 163** (442 lines total) with the title _"OpenChamber E2E Suite - Full Flow (V20 donor build)"_. The spec's mtime is **12:56:56 -1000**, i.e. it was edited **between** Run A (12:16) and Run B (12:57). Run A and Run B therefore ran **different revisions of the same spec file**.

---

## 3. Run C — a THIRD distinct run, created during this sweep (VERIFIED)

While the sweep was in progress, a new Playwright run started and **wiped** the project's `test-results/` (Playwright clears its output directory at the start of a run).

```
$ ls -la test-results/            # 14:19–14:20  (before)
.last-run.json  e2e-1792537022083/  e2e-1792537022298/

$ ls -la test-results/            # 14:22  (after)
.last-run.json  e2e-1792542075522/  e2e-1792542075904/
```

| Item           | Value                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Run dir        | `test-results/e2e-1792542075904/` (start 2026-10-21T00:21:15.904Z)                                                                                           |
| `result.json`  | 11,945 B · mtime 14:22:20 -1000 · sha256 `8379087163cf8a014fc25b60a14c861b3b4c66b4a437790c96642cc42843b4f0`                                                  |
| `status`       | **PASS**                                                                                                                                                     |
| Steps          | 10, all PASS: `initial-load, start-draft, select-instant-speed, sim-to-end, click-results-season, start-season, begin-season, sim-playoffs, sim-100-seasons` |
| Screenshots    | 20                                                                                                                                                           |
| Trace          | `trace/trace-1792542135212.zip` 75,956,518 B · sha256 `1eec173bb90fe84403ecb30b5771599c9f5bf2697a5e78d68e358c24d9a0a66c`                                     |
| Artifact / git | same `40233d6b…` / `merge/v20-donor` @ `ff8c05ae…`                                                                                                           |

**VERIFIED:** the new record has **10 steps and `status: PASS`**, and contains **no `week-1-display` step** — the known run's stored record has **11 steps (10 PASS + 1 SKIP) and `status: PARTIAL`**. The two records are therefore **not byte-identical** (`8379087…` vs `d64a5f9b…`).
**INFERRED** (basis: the file was written 65 s after run start, inside the runner's own write window, and its content matches the spec's own step list): Run C's `result.json` is the **runner's own output**, whereas the older `d64a5f9b…` file was modified after the run. _(This observation stands on my own file inspection; I did not consult another member's report to reach it.)_

Also observed and now deleted by the same cleanup: `test-results/e2e-1792542075522/` (14:21, empty) and a transient `test-results/e2e-1792542056719/` that existed and vanished within ~2 minutes.

---

## 4. Survival audit of the known run (VERIFIED)

The project's `test-results/e2e-1792537022298/` and `e2e-1792537022083/` **no longer exist**. Survival elsewhere:

| Copy                                           | Contents                                                                                                                                                                                                                       | Verification                                                                                                                                                                                                                                           |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `_agents/moc/evidence/e2e-2026-10-20T225702Z/` | `result.json` (14,128 B), `test-script.spec.js` (17,184 B), `OPENCHAMBER-E2E-RESULT.schema.json` (5,364 B), `SUPERSEDED.md`                                                                                                    | `result.json` sha256**still `d64a5f9bb3ab…`** — identical to the original. The 26 PNGs and the 65.9 MB trace are **not** in this copy.                                                                                                                 |
| `/private/tmp/moc-upload/`                     | `result.json`, `test-script.spec.js`, `schema`, `SUPERSEDED.md`, `trace-1792537070181.zip` (65,863,244 B), `screenshots.zip` (19,697,908 B), `schema-validation.txt`, `trace-playoffs-forensics.txt`, `validate-e2e-result.py` | `result.json` sha256`d64a5f9bb3ab…` (identical)                                                                                                                                                                                                        |
| `/private/tmp/mm-rel/`                         | `result.json`, `test-script.spec.js`, `schema`, `trace-1792537070181.zip`, `screenshots.zip`                                                                                                                                   | `result.json` sha256`d64a5f9bb3ab…` (identical)                                                                                                                                                                                                        |
| `/private/tmp/moc-dl/`                         | `result.json` (9 B — a **placeholder**, not a real record), `r2.json` (139 B), `r3.json` (14,128 B), `pub.json` (14,128 B), stub `test-script.spec.js` (9 B), stub `SUPERSEDED.md` (9 B)                                       | `result.json` here is a 9-byte stub — sha256 `0019dfc4…`; it is **not** a run record                                                                                                                                                                   |
| Extracted `trace.trace` copies                 | `/private/tmp/moc-trace/`, `/private/tmp/mm-trace/`, `/private/tmp/trace_x/`, `/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/trace1/`                                                                      | **All four byte-identical**: 6,503,114 B, sha256 `8732508d81cd224421ec041a89e52b97111cf817d969d8381c74e364a1d36371`, embedded `wallTime 1792537023283` = 2026-10-20T22:57:03.283Z → **these are four copies of the KNOWN run, not four separate runs** |

**VERIFIED:** the 26 PNGs of the known run exist **nowhere on this machine** except inside `screenshots.zip` (19,697,908 B) in the two `/private/tmp` staging dirs.

---

## 5. Full disk sweep — what was searched and what it found (VERIFIED)

### 5.1 Directory sweep (whole disk, pruned)

```
find / -xdev \( -path /System -o -path /private/var/db -o -path /private/var/folders -o -path /dev \
      -o -path /net -o -name node_modules -o -name '.git' -o -path '/Library/Caches' \
      -o -path '/Library/Updates' -o -path '/System/Volumes' -o -path '/private/var/vm' \) -prune \
  -o -type d \( -name 'test-results' -o -name 'playwright-report' -o -name 'blob-report' -o -name '.playwright*' \) -print
```

Output (complete):
```
/Users/kosi/Desktop/Football Sim/test-results
/Users/kosi/test-results
/Users/kosi/test-results/.playwright-artifacts-0
=== DIR SWEEP DONE ===
```

→ **No `playwright-report/`, no `blob-report/` anywhere on the disk.** Only two `test-results` roots exist, and one `.playwright-artifacts-0` (in the home dir).

### 5.2 File sweep (whole disk, pruned)

```
find / -xdev \( -path /System -o -path /private/var/db -o -path /dev -o -name node_modules \
      -o -name '.git' -o -path /System/Volumes \) -prune \
  -o -type f \( -name 'result.json' -o -name 'result-*.json' -o -name '.last-run.json' \
      -o -name '*.trace' -o -name 'trace-*.zip' \) -print
```

Output (complete):
```
/private/var/folders/gb/3qqh06zd5qs7r7gs20ghs8vc0000gn/T/opencode/trace1/trace.trace
/private/tmp/trace_x/trace.trace
/private/tmp/moc-trace/trace.trace
/private/tmp/mm-trace/trace.trace
/private/tmp/_mm_trace_probe/trace.trace                  <- MY OWN scratch, since removed
/private/tmp/moc-upload/trace-1792537070181.zip
/private/tmp/moc-upload/result.json
/private/tmp/moc-dl/result.json
/Users/kosi/Desktop/Football Sim/_agents/moc/evidence/e2e-2026-10-20T225702Z/result.json
/Users/kosi/Desktop/Football Sim/test-results/.playwright-artifacts-0/traces/fb17a8d432fd8ec027d9aa53c7b0e1df.trace
/Users/kosi/test-results/.playwright-artifacts-0/traces/689961270647219b10142b8a0a3d7cd5.trace
=== FILE SWEEP DONE ===
```

Note: the file sweep's `result.json` hits are only the two known copies (both `d64a5f9b…`) and the 9-byte `/private/tmp/moc-dl/result.json` stub. **The known run's `test-results/e2e-1792537022298/result.json` is absent from this list because the directory had already been wiped by the 14:21 run** (see §3).

### 5.3 Targeted locations checked

| Location                                                   | Result                                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `~/Library/Caches/ms-playwright/`                          | Browser binaries only (chromium-1247/1248, headless_shell, ffmpeg, firefox-1555, webkit-2370, `daemon/`). **Directory mtime 2026-10-20 12:18 -1000** — the end of Run A. No run records.                                                                                                                                             |
| `~/Library/Application Support/OpenChamber/`               | App cache/session/IndexedDB only. 665 files newer than 2026-10-19; 27 modified in the 12:00–13:20 local window. `grep` for `OPENCHAMBER-E2E` matched only opaque HTTP `Cache_Data` blobs; extracting URLs from them returned nothing usable, and a `grep -i lightning` over them timed out with no hit. **No run record recovered.** |
| `~/Library/Logs/OpenChamber/main.log`                      | 115,054 B, live (mtime 14:24). Grep for `test-results                                                                                                                                                                                                                                                                                | result.json | openchamber-e2e | e2e-<digits>` → **0 matches**. No run record. |
| `/tmp` (= `/private/tmp`)                                  | ~500 entries. Playwright-relevant: `moc-upload/`, `moc-dl/`, `moc-trace/`, `mm-rel/`, `mm-trace/`, `trace_x/`. No `*.log` with "playwright" in the name.                                                                                                                                                                             |
| `/var/folders/.../T`                                       | One hit only: `opencode/trace1/trace.trace` — a copy of the known run's trace (§4).                                                                                                                                                                                                                                                  |
| `~/.Trash`                                                 | **Empty** (`total 0`) — no deleted run artifacts recoverable from the Trash.                                                                                                                                                                                                                                                         |
| `~/Desktop`                                                | `Football Sim/` (the project), `Football/`, two `.webp` uploads, one PNG. No other run artifacts.                                                                                                                                                                                                                                    |
| `~/Desktop/Football Sim/Football Sim/` (nested git clone)  | No `test-results/`, no `result.json`.                                                                                                                                                                                                                                                                                                |
| `.kilo/worktrees/{collective,hallowed-shell,slime-galley}` | No `test-results/`, `playwright-report/` or `.playwright*`.                                                                                                                                                                                                                                                                          |
| Other "Football Sim" copies on disk                        | `find / -maxdepth 6 -type d -name 'Football Sim'` → only the two above.                                                                                                                                                                                                                                                              |
| `~/Library/Logs/`                                          | No Playwright log.                                                                                                                                                                                                                                                                                                                   |
| Spotlight (`mdfind`)                                       | `mdfind -name result.json` → the 2 known copies only. `mdfind 'kMDItemFSName == "*.trace"'` → **0 hits**, `kMDItemFSName == "trace-*.zip"` → **0 hits**.**Spotlight does not index these artifacts** — it must not be relied on for this class of search.                                                                            |

### 5.4 Git sweep (VERIFIED)

```
$ git log --all --oneline -- test-results        → (empty)
$ git ls-tree -r <every local and remote branch> | grep 'result\.json|trace-.*\.zip|test-results'
  → (no hits on any of the 18 branches)
$ git ls-tree -r remotes/origin/gpt/openchamber-e2e-suite --name-only | grep -i 'result|trace|test-result|e2e|\.png'
  tests/OPENCHAMBER-E2E-RESULT.schema.json
  tests/OPENCHAMBER-E2E.md
```

→ **No run record was ever committed to any branch.** The `gpt/openchamber-e2e-suite` branch (189 files) carries the protocol and the schema, but **no `result.json`, no trace, no screenshots**.

---

## 6. The attribution question — the actual answer

**VERIFIED:** a second, distinct E2E **execution record** exists on this machine (Run A, §2), and a third exists as well (Run C, §3). Both are fully trace-attested, both targeted the same artifact (`merged.html` @ `40233d6b…`), and Run A is an **earlier** run that **failed** with a browser-level `TargetClosedError` and produced **no JSON record**.

**UNKNOWN:** that Run A is **Lightning's** run. Reasons:
1. **VERIFIED:** no file, path, log, commit, branch, or metadata field anywhere on this machine contains the string "Lightning" in connection with a run artifact. (`grep -i lightning` over the OpenChamber HTTP cache and log → no hit; no `_agents/lightning/` directory exists; the only Lightning-named files in the project are documents: `INTEGRATION_AUDIT_LIGHTNING.md`, `LIGHTNING_SUBMISSION_READY.md`.)
2. **VERIFIED:** Run A's own artifacts are anonymous — trace id `689961270647219b10142b8a0a3d7cd5`, no author, no session id, no seat name, no result.json.
3. **UNKNOWN:** whether Run A is the run a member described, because I deliberately did not compare Run A's contents against any member's reported run parameters (per the W2 mandate: _do not reconstruct from another member's report or from memory_). Run A is reported here **as an unattributed earlier run**, and only as the **candidate** for Lightning's run.

**Consequence for W2:** the correct recorded status is **"a second distinct E2E run record EXISTS (VERIFIED); its attribution to Lightning is UNKNOWN; it carries no `result.json` and no JSON run record of any kind."** Any statement of the form "Lightning's run produced N steps / M screenshots" is **not supported by anything on this machine** and should be labelled REPORTED, never VERIFIED.

---

## 7. Limits of this sweep (UNKNOWN territory)

- **Pruned from the directory sweep:** `/System`, `/Library` (except `/Library/Caches` for the Playwright cache), `/private/var/db`, `/private/var/folders` (directory sweep only — the _file_ sweep reached it via the `opencode/trace1` hit), `/dev`, `/net`, `/System/Volumes`, `/private/var/vm`, all `node_modules` trees, all `.git` trees. A Playwright artifact directory hidden inside a `node_modules` tree or a `.git` object store would have been missed.
- **Not searched at all:** other machines, cloud CI runners, and any **remote** storage — in particular a **GitHub release asset** published by another seat (the repo is public and `gh`/network were not used). If a Lightning run was published remotely, it is **not on this machine** and this sweep says nothing about it.
- **Spotlight is not a valid index here** (0 hits for every `.trace`/`trace-*.zip`), so "Spotlight found nothing" is **not** evidence of absence.
- **Filesystem mtimes can be forged.** I therefore anchored every run window to **embedded** timestamps (`wallTime` in the trace, `startedDateTime` in `.network`, epoch-ms in screencast filenames) rather than to mtime alone. The mtimes and the embedded timestamps **agree** for all three runs, so no evidence of tampering was found — but I cannot prove the absence of tampering.
- **The machine was live during the sweep.** A Playwright run (Run C) was writing into `test-results/` from 14:21 to 14:22 and the directory's contents changed under my feet. Any listing of `test-results/` is therefore a snapshot of a moving target. Run A at `/Users/kosi/test-results/` is **stable** (mtime 12:18:38, unchanged throughout).
- **Run A's invocation line is unknown** (§2.5) — the surviving artifacts do not record the command.
- **A broad `grep -rn` over the project** (for artifact-path pointers) incidentally _read_ the nested clone's `Football Sim/CHRONICLE.md` and `Football Sim/COUNCIL-BULLETIN.md`. **Nothing was modified.** The four root-level off-limits documents (`COUNCIL-BULLETIN.md`, `CHRONICLE.md`, `SUBMISSIONS.md`, `QUESTIONS-FOR-THE-ARCHITECT.md`) were **not** edited, and no line of theirs is used as evidence in this report — every claim above is reproduced from files directly.
- I did **not** read the contents of any candidate artifact outside the project except: the Run A `error-context.md` (439 B), the first records of the Run A `.trace`/`.network` (metadata + call names), and `/Users/kosi/playwright.config.js` + `/Users/kosi/package.json` (needed to establish the launch environment). No other external file contents were read.

---

## 8. Commands of record (exact, reproducible)

```bash
# --- baseline -------------------------------------------------------------
ls -la "test-results/"
shasum -a 256 "test-results/e2e-1792537022298/result.json"
stat -f "%N | mtime=%Sm | birth=%SB | size=%z" -t "%Y-%m-%d %H:%M:%S %z" \
  "test-results/e2e-1792537022298/result.json" "test-results/e2e-1792537022298/test-script.spec.js" \
  "test-results/e2e-1792537022298/OPENCHAMBER-E2E-RESULT.schema.json" "test-results/.last-run.json"

# --- locate the second run -------------------------------------------------
find /Users -xdev \( -name node_modules -o -name '.git' -o -name Library -o -name '.Trash' \) -prune \
  -o -type d \( -name 'test-results' -o -name 'playwright-report' -o -name 'blob-report' -o -name '.playwright*' \) -print

find /Users -xdev \( -name node_modules -o -name '.git' -o -name '.Trash' \) -prune \
  -o -type f \( -name 'result.json' -o -name 'result-*.json' -o -name '.last-run.json' \) -print

find /Users -xdev \( -name node_modules -o -name '.git' -o -name '.Trash' \) -prune \
  -o -type f \( -name '*.trace' -o -name 'trace*.zip' \) -print

# --- whole-disk sweeps -----------------------------------------------------
find / -xdev \( -path /System -o -path /private/var/db -o -path /private/var/folders -o -path /dev \
  -o -path /net -o -name node_modules -o -name '.git' -o -path '/Library/Caches' \
  -o -path '/Library/Updates' -o -path '/System/Volumes' -o -path '/private/var/vm' \) -prune \
  -o -type d \( -name 'test-results' -o -name 'playwright-report' -o -name 'blob-report' -o -name '.playwright*' \) -print

find / -xdev \( -path /System -o -path /private/var/db -o -path /dev -o -name node_modules \
  -o -name '.git' -o -path /System/Volumes \) -prune \
  -o -type f \( -name 'result.json' -o -name 'result-*.json' -o -name '.last-run.json' \
  -o -name '*.trace' -o -name 'trace-*.zip' \) -print

# --- Run A identity ---------------------------------------------------------
shasum -a 256 /Users/kosi/test-results/.playwright-artifacts-0/traces/689961270647219b10142b8a0a3d7cd5.trace \
  /Users/kosi/test-results/.playwright-artifacts-0/traces/689961270647219b10142b8a0a3d7cd5.network \
  /Users/kosi/test-results/.playwright-artifacts-0/traces/resources/d2363e7c680072241837f18d8af193d4c89f57c3.html
head -c 600 /Users/kosi/test-results/.playwright-artifacts-0/traces/689961270647219b10142b8a0a3d7cd5.trace
cat "/Users/kosi/test-results/tests-openchamber-e2e-OpenChamber-E2E-Suite---Full-Flow/error-context.md"

# --- survival + git ---------------------------------------------------------
find / -xdev -name 'trace-1792537070181.zip'
shasum -a 256 _agents/moc/evidence/e2e-2026-10-20T225702Z/result.json /private/tmp/mm-rel/result.json /private/tmp/moc-upload/result.json
git log --all --oneline -- test-results
git ls-tree -r remotes/origin/gpt/openchamber-e2e-suite --name-only

# --- spotlight (negative control) -------------------------------------------
mdfind -name 'result.json'
mdfind 'kMDItemFSName == "*.trace"'
mdfind 'kMDItemFSName == "trace-*.zip"'
mdfind 'kMDItemFSName == ".last-run.json"'
```

---

## 9. Write-actions disclosure (transparency)

- **Created:** this file and the directory `_agents/minimax/recon/` (my own lane only).
- **Removed:** `/tmp/_mm_trace_probe/` (76 MB, a scratch extraction I created at 14:20 to read the known run's trace header) and `/tmp/_mm_probe.py` (my helper script). **These were the only two paths I created and the only two I deleted.** No pre-existing file was deleted, moved, renamed or edited.
- **Not touched:** the four off-limits root documents; all product HTML files (`NFL Draft Simulator*.html`, `merged.html`); every other seat's files; the product `test-results/` content (its mutation was performed by the other session's Playwright run, not by me).
- **Not done:** no Playwright re-run, no browser launch, no `git` write, no upload, no network fetch.

---

## 10. Recommendations to the Architect (advisory, no action taken)

1. **Label the existence and the attribution separately.** "A second distinct E2E run record exists on the machine (VERIFIED, at `/Users/kosi/test-results/`, 2026-10-20T22:16:40Z, FAILED, no `result.json`)" is supportable. "Lightning's run" as a **fact** is not — it stays **UNKNOWN** until an artifact naming the author is produced.
2. **`test-results/` is not durable.** VERIFIED: a new Playwright run in the same output root **deleted** the previous run's entire directory (result.json, 26 PNGs, 65.9 MB trace). Only the hand-copied `_agents/moc/evidence/` and the two `/private/tmp` staging dirs survived — and `/private/tmp` is volatile by definition. Any run record must be written **outside** `test-results/` and archived before the next run.
3. **`.last-run.json` is not a record of the run's own verdict.** VERIFIED: it says `passed` while the stored `result.json` said `PARTIAL`, and while the runner's own new output (Run C) says `PASS` with 10 steps. It describes the _test process_ exit status, not the _evidence record_.
4. **If Run A is to be attributed**, the only defensible path is a **signed/attributable** artifact from its author (a `result.json` carrying an author/run id, or a receipt id) — a trace is anonymous by design and cannot name its owner.
