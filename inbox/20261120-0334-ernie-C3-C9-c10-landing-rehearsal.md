SPEAKER: ERNIE | ROLE: council advisor (MUSE co-delegate) | TASK: C3 + C9 — rehearse the c10 repair and audit the package before the Owner lands it | DATE: 2026-11-20T03:34Z

FOR: the Owner (the landing), the council
VERDICT: **safe to land** — inkling and orcaink go 48 OK/1 FAILED → **49 OK/0 FAILED, 52 files** with one file; pickle is already 49/49.

All work in `/tmp` scratch trees. No host branch was touched. macOS `md5 -q`; the loop is the receipt.

---

## 1 · The rehearsal (C3)

```
Z=/Users/kosi/Desktop/wt/ernie
REPAIR=$Z/_agents/ernie/deliveries/z-post-blue-docs-update-2026-11-19-v3-sitting/deliverables/repair/slice1-battery.json
for seat in inkling orcaink pickle:
  git -C $Z archive origin/council/$seat <c10 path> | tar -x -C /tmp/c10-rehearsal/$seat
  # count + md5 every CHECKSUMS entry, before
  # copy $REPAIR -> <c10>/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
  # count + md5 every CHECKSU entry, after
```

| host | files before | before | after | files after | repair md5 |
|---|---|---|---|---|---|
| `origin/council/inkling` | 51 | **48 OK / 1 FAILED** | **49 OK / 0 FAILED** | 52 | `0a2869538a706e7e6ea864664b7e5c9f` |
| `origin/council/orcaink` | 51 | **48 OK / 1 FAILED** | **49 OK / 0 FAILED** | 52 | `0a2869538a706e7e6ea864664b7e5c9f` |
| `origin/council/pickle` (control) | 52 | 49 OK / 0 FAILED | 49 OK / 0 FAILED (file already present) | 52 | `0a2869538a706e7e6ea864664b7e5c9f` |

The single FAILED entry on inkling/orcaink is exactly
`_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json`, the manifest's 49th entry. The repair file's md5 equals that entry (`0a286953…`), so the copy is the manifest's own bytes — no manifest regeneration is needed.

**The Owner's three commands** (from the repo root, after the zip is in place):

```
cp <zip>/deliverables/repair/slice1-battery.json \
   <c10>/_agents/pickle/deliveries/zai-cakepanz-9-2026-11-19/cakepanz-4/deliveries/receipts/slice1-battery.json
cd <c10> && md5sum -c CHECKSUMS.txt | tail -1     # expect: 49 OK, 0 FAILED (macOS: the loop above)
find <c10> -type f | wc -l                        # expect: 52
```

## 2 · The audit (C9)

| host | files | CHECKSUMS entries | OK / FAILED | `slice1-battery.json` | nested c9 present |
|---|---|---|---|---|---|
| pickle | 52 | 49 | 49 / 0 | yes (6,418 B) | yes |
| inkling | 51 | 49 | 48 / 1 | **missing** | yes |
| orcaink | 51 | 49 | 48 / 1 | **missing** | yes |

**The two trees inside the c10 package are different on purpose.** In the nested c9 tree (`…/zai-cakepanz-9-2026-11-19/cakepanz-4` and `cakepanz-4-prepared`) the dist is `76de5658…` / 527,162 B in `cakepanz-4` and **no prepared dist exists**; in pickle's standalone hosted c9 both trees are `670d4c08…` / 527,177 B. That is the Part-0 history vs the working bytes, not a defect — do not "fix" it by copying one over the other.

**Go / no-go:** **safe to land.** Both hosts reach 49/49 with the one file; the control is already there; no manifest change is required.

## 3 · What I did not do
- I did not commit to any host or push anything. Scratch only.
- I did not run the c10 battery (that needs the build tree, not the package).
- The `.gitignore`/zip-parity finding from an earlier sitting is unaffected by this repair (it is about a different file), but the audit above is the authority for *this* landing.