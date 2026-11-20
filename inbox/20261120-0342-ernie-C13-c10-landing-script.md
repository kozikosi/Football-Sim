SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: C13 — turn the three c10 rehearsals into one idempotent landing script | DATE: 2026-11-20T03:42Z

FOR: the Owner (the landing), MUSE (proposing it for `tools/`)
VERDICT: **ok** — the script takes inkling/orcaink from 48 OK / 1 missing to **49 OK / 0 missing / 52 files**, is idempotent, and refuses a wrong repair or a wrong root.

The script is at `_agents/ernie/deliveries/tools/land-c10-repair.sh` (my lane; MUSE may move it to `tools/`). It writes only inside the package root it is given.

---

## 1 · What it does

```
usage: sh land-c10-repair.sh <c10-package-root> <repair-file>
exit 0 = 49 OK / 0 missing / 52 files (or already there)
exit 2 = refused (not a c10 package, or the repair is not the manifest's bytes)
exit 3 = the after-state is not 49/49 (prints the counts)
```

1. Verifies the repair file is **6,418 B / md5 `0a2869538a706e7e6ea864664b7e5c9f`** (refuses otherwise).
2. Verifies `CHECKSUMS.txt` line 18 names `…/cakepanz-4/deliveries/receipts/slice1-battery.json` with that md5 (refuses otherwise).
3. Prints the before counts.
4. If the target exists and matches, prints "already present: no change" and exits 0.
5. Otherwise `mkdir -p` + `cp`, prints the after counts, and exits 3 unless **all entries are OK and none are missing**.

## 2 · Receipts (fresh `git archive` per host, macOS, `/tmp`)

**Happy path and idempotence:**

```
===== inkling =====
--- run 1
before: 48 OK / 1 missing / 51 files (entries 49)
after: 49 OK / 0 missing / 52 files (entries 49)
applied: _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
OK: 49/49, missing 0, files 52
exit=0
--- run 2 (idempotence)
before: 49 OK / 0 missing / 52 files (entries 49)
after: 49 OK / 0 missing / 52 files (entries 49)
already present: no change
exit=0
===== orcaink =====
--- run 1
before: 48 OK / 1 missing / 51 files (entries 49)
after: 49 OK / 0 missing / 52 files (entries 49)
applied: _agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
OK: 49/49, missing 0, files 52
exit=0
--- run 2 (idempotence)
before: 49 OK / 0 missing / 52 files (entries 49)
after: 49 OK / 0 missing / 52 files (entries 49)
already present: no change
exit=0
===== pickle =====
--- run 1
before: 49 OK / 0 missing / 52 files (entries 49)
after: 49 OK / 0 missing / 52 files (entries 49)
already present: no change
exit=0
```

**Refusals:**

```
--- refusal 1: a truncated repair (6,000 B) ---
REFUSE: repair file is 6000 B / 7aec562e4352eeab8640a255501802d4, expected 6418 B / 0a2869538a706e7e6ea864664b7e5c9f
exit=2
--- refusal 2: not a c10 package (the c9 tree, no CHECKSUMS.txt) ---
REFUSE: no CHECKSUMS.txt in /tmp/c13-test/c9/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19 (not a c10 package)
exit=2
```

The second refusal was a real bug found by the test: the first version let `sed` fail and exited 1. The guard (`[ -f "$root/CHECKSUMS.txt" ]`) was added and the test re-run — both refusals now exit 2 with a message.

## 3 · The Owner's one-liner

```
sh land-c10-repair.sh <c10-package-root> \
   <zip>/deliverables/repair/slice1-battery.json
```

on inkling and on orcaink. Expected: `49/49, missing 0, files 52`, exit 0. A second run is a no-op.

## 4 · What I did not do
- I did not commit to any host; every run was on a `git archive` scratch copy.
- I did not test on Linux (the `md5`/`md5sum` branch is written but untested here); a Linux seat should run the same three commands.
- I did not move the script into `tools/` — that is MUSE's call.